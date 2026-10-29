// node render.mjs browser-engines        -> out/browser-engines.mp4
// Frame-by-frame: seek(t) -> JPEG screenshot -> piped straight into ONE ffmpeg encode.
import {chromium} from 'playwright'; import {spawn} from 'child_process'; import fs from 'fs'; import {serve} from './serve.mjs';
const args=process.argv.slice(2); const all=args.includes('--all');
const names=all?fs.readdirSync('videos').filter(n=>fs.existsSync(`videos/${n}/video.js`)):args.filter(a=>!a.startsWith('--'));
if(!names.length){console.error('usage: node render.mjs <video-name> | --all');process.exit(1)}
fs.mkdirSync('out',{recursive:true});
const server=await serve(5199); const browser=await chromium.launch();
for(const name of names){
  const page=await browser.newPage({viewport:{width:576,height:1024}});
  page.on('pageerror',e=>{console.error(e);process.exit(1)});
  await page.goto(`http://localhost:5199/studio.html?v=${name}&render`); await page.waitForFunction(()=>window.TOTAL);
  await page.evaluate(()=>document.fonts.ready);
  const {total,fps}=await page.evaluate(()=>({total:TOTAL,fps:FPS})); const n=Math.ceil(total*fps);
  const dir=`videos/${name}`; const audio=['voice.mp3','voice.wav','voice.m4a'].map(f=>`${dir}/${f}`).find(fs.existsSync);
  const music=['music.mp3','music.wav'].map(f=>`${dir}/${f}`).find(fs.existsSync);
  const tmp=`out/${name}.tmp.mp4`, ff=['-y','-v','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-'];
  if(audio)ff.push('-i',audio); if(music)ff.push('-stream_loop','-1','-i',music);
  if(audio&&music)ff.push('-filter_complex','[2:a]volume=0.12[m];[1:a][m]amix=inputs=2:duration=first[a]','-map','0:v','-map','[a]');
  else if(audio||music)ff.push('-map','0:v','-map','1:a','-af','volume='+(audio?1:0.5));
  ff.push('-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r',String(fps),'-c:a','aac','-b:a','160k','-t',String(total),'-movflags','+faststart',tmp);
  const p=spawn('ffmpeg',ff,{stdio:['pipe','inherit','inherit']});
  for(let i=0;i<n;i++){
    await page.evaluate(t=>seek(t),i/fps);
    const buf=await page.screenshot({type:'jpeg',quality:92});
    if(!p.stdin.write(buf))await new Promise(r=>p.stdin.once('drain',r));
    if(i%60===0)process.stdout.write(`\r${name}: ${i}/${n}`);
  }
  p.stdin.end(); const code=await new Promise(r=>p.on('close',r));
  if(code!==0){console.error('ffmpeg failed');process.exit(1)}
  fs.renameSync(tmp,`out/${name}.mp4`); console.log(`\r${name}: done -> out/${name}.mp4 (${total.toFixed(1)}s)`);
  await page.close();
}
await browser.close(); server.close();
