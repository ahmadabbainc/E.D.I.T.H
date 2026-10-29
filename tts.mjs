// Voiceover with Google Gemini TTS (Google AI Studio key).  node tts.mjs <video-name>|--all
// Reads every scene's `say`, synthesizes it (cached), writes voice.wav + timings.json next to video.js.
// Env: GEMINI_API_KEY (required), GEMINI_VOICE (default Kore), GEMINI_TTS_MODEL (default gemini-2.5-flash-preview-tts)
import {ttsModels,modelNames} from './gemini.mjs'; import fs from 'fs'; import path from 'path'; import crypto from 'crypto'; import {pathToFileURL} from 'url';
process.on('uncaughtException',e=>{console.log('::error::'+String(e.message).replace(/\s+/g,' ').slice(0,400));process.exit(1)});process.on('unhandledRejection',e=>{console.log('::error::'+String(e&&e.message||e).replace(/\s+/g,' ').slice(0,400));process.exit(1)});
const KEY=process.env.GEMINI_API_KEY; if(!KEY){console.error('GEMINI_API_KEY is not set');process.exit(1)}
const VOICE=process.env.GEMINI_VOICE||'Kore', MODELS=process.env.GEMINI_TTS_MODEL?[process.env.GEMINI_TTS_MODEL]:await ttsModels(KEY);if(!MODELS.length)throw new Error('No Gemini TTS model available. Models: '+await modelNames(KEY));console.log('tts models:',MODELS.join(', '));let MODEL=MODELS[0];
const RATE=24000, PAD=0.35, STYLE='Say in a clear, friendly, steady explainer-narrator voice: ';
const args=process.argv.slice(2), all=args.includes('--all');
const names=all?fs.readdirSync('videos').filter(n=>fs.existsSync(`videos/${n}/video.js`)):args.filter(a=>!a.startsWith('--'));
async function synth(text){
  for(let a=0;a<9;a++){
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,{method:'POST',
      headers:{'content-type':'application/json','x-goog-api-key':KEY},
      body:JSON.stringify({contents:[{parts:[{text:STYLE+text}]}],generationConfig:{responseModalities:['AUDIO'],
        speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:VOICE}}}}})});
    if(r.ok){const j=await r.json();const d=j.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;if(d)return Buffer.from(d,'base64');
      if(MODELS.indexOf(MODEL)<MODELS.length-1){MODEL=MODELS[MODELS.indexOf(MODEL)+1];console.log('no audio, trying',MODEL);continue}}
    else{
      const body=await r.text();
      if(r.status===429){const m=body.match(/retry in ([\d.]+)s/i)||body.match(/"retryDelay":\s*"(\d+)/);const w=Math.min(70,(m?+m[1]:20)+2);console.log(`rate limited, waiting ${w}s`);await new Promise(r=>setTimeout(r,w*1000));continue}
      if(r.status>=500){await new Promise(r=>setTimeout(r,4000*(a+1)));continue}
      if(MODELS.indexOf(MODEL)<MODELS.length-1){console.log(`${MODEL} -> ${r.status}, trying next model`);MODEL=MODELS[MODELS.indexOf(MODEL)+1];continue}
      throw new Error(`Gemini TTS ${r.status} (${MODEL}): ${body.slice(0,300)}`);
    }
  } throw new Error('Gemini TTS failed after retries (rate limit?)');
}
const wav=(pcm)=>{const h=Buffer.alloc(44);h.write('RIFF');h.writeUInt32LE(36+pcm.length,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);
  h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(RATE,24);h.writeUInt32LE(RATE*2,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(pcm.length,40);return Buffer.concat([h,pcm])};
for(const name of names){
  const dir=`videos/${name}`, cache=`${dir}/.tts`; fs.mkdirSync(cache,{recursive:true});
  const V=(await import(pathToFileURL(path.resolve(dir,'video.js')).href)).default;
  const parts=[], timings=[];
  for(const [i,s] of V.scenes.entries()){
    const text=(s.say||'').trim(); let pcm=Buffer.alloc(0);
    if(text){const f=`${cache}/${crypto.createHash('md5').update(VOICE+MODEL+text).digest('hex')}.pcm`;
      if(!fs.existsSync(f)){console.log(`scene ${i+1}: synthesizing`);fs.writeFileSync(f,await synth(text))}
      pcm=fs.readFileSync(f);}
    const pad=Buffer.alloc(Math.round(PAD*RATE)*2); parts.push(pcm,pad);
    timings.push(+((pcm.length+pad.length)/2/RATE).toFixed(3));
  }
  fs.writeFileSync(`${dir}/voice.wav`,wav(Buffer.concat(parts))); fs.writeFileSync(`${dir}/timings.json`,JSON.stringify(timings));
  console.log(`${name}: voice.wav + timings.json (${timings.reduce((a,b)=>a+b,0).toFixed(1)}s)`);
}
