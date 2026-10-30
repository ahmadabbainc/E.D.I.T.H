// Voiceover.  node tts.mjs <video-name>|--all
// Order: Google Gemini TTS (few requests, pauses split into scenes)  ->  free Edge neural voice (exact word timing)  ->  fail (render stays silent).
// Writes videos/<name>/voice.wav + timings.json (+ words.json when exact word times are known).
// Env: GEMINI_API_KEY, GEMINI_VOICE (Kore | edge:en-US-AndrewNeural | ...), GEMINI_TTS_MODEL (optional)
import fs from 'fs'; import path from 'path'; import crypto from 'crypto'; import {spawnSync} from 'child_process'; import {pathToFileURL} from 'url';
import {ttsModels,modelNames} from './gemini.mjs'; import {segment} from './segment.mjs';
const KEY=process.env.GEMINI_API_KEY||'', RATE=24000, PAD=0.3;
const REQ=process.env.GEMINI_VOICE||'Kore', EDGE_ONLY=REQ.startsWith('edge:'), VOICE=EDGE_ONLY?'Kore':REQ, EDGE_VOICE=EDGE_ONLY?REQ.slice(5):'en-US-AndrewNeural';
const fail=m=>{console.log('::error::'+String(m).replace(/\s+/g,' ').slice(0,500));process.exit(1)};
process.on('uncaughtException',e=>fail(e.message)); process.on('unhandledRejection',e=>fail(e&&e.message||e));
const args=process.argv.slice(2), all=args.includes('--all');
const names=all?fs.readdirSync('videos').filter(n=>fs.existsSync(`videos/${n}/video.js`)):args.filter(a=>!a.startsWith('--'));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let MODELS=null, MODEL, waited=0;

async function geminiCall(text){ // returns Int16Array PCM@24k
  for(let a=0;a<8;a++){
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,{method:'POST',signal:AbortSignal.timeout(240000),
      headers:{'content-type':'application/json','x-goog-api-key':KEY},
      body:JSON.stringify({contents:[{parts:[{text}]}],generationConfig:{responseModalities:['AUDIO'],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:VOICE}}}}})});
    if(r.ok){const j=await r.json();const d=j.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;if(d){const b=Buffer.from(d,'base64');return new Int16Array(b.buffer,b.byteOffset,b.length>>1)}}
    const body=r.ok?'empty audio':await r.text();
    if(r.status===429){
      if(/PerDay|per day|daily/i.test(body)) throw new Error(`Gemini TTS daily free quota used up (${MODEL})`);
      const m=body.match(/retry in ([\d.]+)s/i)||body.match(/"retryDelay":\s*"(\d+)/); const w=Math.min(65,(m?+m[1]:20)+2);
      waited+=w; if(waited>240) throw new Error('Gemini TTS rate limited for too long'); console.log(`rate limited, waiting ${w}s`); await sleep(w*1000); continue}
    if(r.status>=500||r.ok){await sleep(3000*(a+1));continue}
    const i=MODELS.indexOf(MODEL); if(i<MODELS.length-1){console.log(`${MODEL} -> ${r.status}, trying ${MODELS[i+1]}`);MODEL=MODELS[i+1];continue}
    throw new Error(`Gemini TTS ${r.status} (${MODEL}): ${body.slice(0,250)}`);
  } throw new Error('Gemini TTS failed after retries');
}
async function geminiVoice(texts,cache){
  if(!KEY) throw new Error('no GEMINI_API_KEY');
  if(!MODELS){MODELS=process.env.GEMINI_TTS_MODEL?[process.env.GEMINI_TTS_MODEL]:await ttsModels(KEY); if(!MODELS.length)throw new Error('no Gemini TTS model. Models: '+(await modelNames(KEY)).slice(0,200)); MODEL=MODELS[0]; console.log('tts models:',MODELS.join(', '))}
  // chunk scenes so each request is ~<=130 words
  const chunks=[]; let cur=[],w=0;
  texts.forEach((t,i)=>{const n=t.split(/\s+/).length; if(cur.length&&w+n>130){chunks.push(cur);cur=[];w=0} cur.push(i);w+=n}); if(cur.length)chunks.push(cur);
  const clips=new Array(texts.length);
  for(const ch of chunks){
    const sub=ch.map(i=>texts[i]), want=sub.join(' ').split(/\s+/).length/2.6;
    const f=`${cache}/g_${crypto.createHash('md5').update(MODEL+VOICE+sub.join('|')).digest('hex')}.pcm`; let pcm;
    if(fs.existsSync(f)){const b=fs.readFileSync(f);pcm=new Int16Array(b.buffer,b.byteOffset,b.length>>1)}
    else{let best=null;
      for(let k=0;k<2;k++){const p=await geminiCall(sub.join('\n\n')), d=p.length/RATE; if(!best||d<best.length/RATE)best=p; if(d<=want*1.5+2)break; console.log(`take ${k+1}: ${d.toFixed(0)}s vs ~${want.toFixed(0)}s expected, retrying`)}
      pcm=best; fs.writeFileSync(f,Buffer.from(pcm.buffer,pcm.byteOffset,pcm.byteLength));}
    const b=segment(pcm,RATE,sub);
    ch.forEach((idx,j)=>{clips[idx]=pcm.slice(Math.round(b[j]*RATE),Math.round(b[j+1]*RATE))});
  }
  return {clips,words:null,provider:`gemini ${MODEL}`};
}
function edgeVoice(texts,dir){
  const tf=`${dir}/texts.json`; fs.writeFileSync(tf,JSON.stringify(texts));
  const py=spawnSync('python3',['edge_tts_scenes.py',tf,dir,EDGE_VOICE],{stdio:['ignore','inherit','inherit']});
  if(py.status!==0) throw new Error('edge-tts failed (is it installed? pip install edge-tts)');
  const clips=[],words=[];
  texts.forEach((t,i)=>{
    if(!t.trim()){clips.push(new Int16Array(0));words.push([]);return}
    const r=spawnSync('ffmpeg',['-v','error','-i',`${dir}/${i}.mp3`,'-f','s16le','-ar',String(RATE),'-ac','1','-'],{maxBuffer:1<<28});
    if(r.status!==0) throw new Error('ffmpeg decode failed'); clips.push(new Int16Array(r.stdout.buffer,r.stdout.byteOffset,r.stdout.length>>1));
    words.push(JSON.parse(fs.readFileSync(`${dir}/${i}.json`)).map(x=>({t:x.t,w:x.w})));
  });
  return {clips,words,provider:`edge ${EDGE_VOICE}`};
}
const wav=(pcm)=>{const h=Buffer.alloc(44);h.write('RIFF');h.writeUInt32LE(36+pcm.length,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);
  h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(RATE,24);h.writeUInt32LE(RATE*2,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(pcm.length,40);return Buffer.concat([h,pcm])};

for(const name of names){
  const dir=`videos/${name}`, cache=`${dir}/.tts`; fs.mkdirSync(`${cache}/edge`,{recursive:true});
  const V=(await import(pathToFileURL(path.resolve(dir,'video.js')).href)).default;
  const texts=V.scenes.map(s=>(s.say||'').trim()); let res,errs=[];
  if(!EDGE_ONLY){try{res=await geminiVoice(texts,cache)}catch(e){errs.push('gemini: '+e.message);console.log('gemini failed:',e.message)}}
  if(!res){try{res=edgeVoice(texts,`${cache}/edge`)}catch(e){errs.push('edge: '+e.message)}}
  if(!res) throw new Error('No voice available. '+errs.join(' | '));
  const parts=[],timings=[]; const pad=Buffer.alloc(Math.round(PAD*RATE)*2);
  res.clips.forEach(c=>{const b=Buffer.from(c.buffer,c.byteOffset,c.byteLength);parts.push(b,pad);timings.push(+((b.length+pad.length)/2/RATE).toFixed(3))});
  fs.writeFileSync(`${dir}/voice.wav`,wav(Buffer.concat(parts))); fs.writeFileSync(`${dir}/timings.json`,JSON.stringify(timings));
  if(res.words)fs.writeFileSync(`${dir}/words.json`,JSON.stringify(res.words)); else fs.rmSync(`${dir}/words.json`,{force:true});
  const tot=timings.reduce((a,b)=>a+b,0).toFixed(1);
  console.log(`${name}: ${tot}s via ${res.provider}`); console.log(`::notice::voice ${tot}s for ${timings.length} scenes via ${res.provider}${errs.length?' (fallback: '+errs.join(' | ').slice(0,200)+')':''}`);
}
