// Layout linter: renders each scene when it is fully built and reports problems an AI can fix.
// import {lint} from './lint.mjs';  const issues = await lint('my-video');   // [] = clean
import {chromium} from 'playwright'; import {serve} from './serve.mjs';
export async function lint(name,port=5411){
  const server=await serve(port), browser=await chromium.launch(), out=[];
  try{
    const page=await browser.newPage({viewport:{width:576,height:1024}});
    page.on('pageerror',e=>out.push('JS error: '+e.message));
    await page.goto(`http://localhost:${port}/studio.html?v=${name}&render`);
    await page.waitForFunction(()=>window.TOTAL,null,{timeout:15000});
    const n=await page.evaluate(()=>SCENES.length);
    for(let i=0;i<n;i++){
      const r=await page.evaluate((i)=>{
        const s=SCENES[i]; seek(s.start+Math.max(0.2,s.dur-0.2));
        const boxes=[...document.querySelectorAll('#world .it')].filter(e=>e.style.display!=='none'&&e.dataset.t!=='line'&&parseFloat(e.style.opacity||1)>0.5)
          .map(e=>{const b=e.getBoundingClientRect();return{k:e.dataset.t,l:e.dataset.lbl,x:b.left,y:b.top,r:b.right,b:b.bottom}});
        return {boxes,dur:s.dur};
      },i);
      const tag=`Scene ${i+1}`; const B=r.boxes;
      for(const b of B){
        const name=`${b.k} "${b.l}"`;
        if(b.x<12||b.r>564||b.y<12) out.push(`${tag}: ${name} is cut off by the canvas edge (x ${Math.round(b.x)}-${Math.round(b.r)}, y from ${Math.round(b.y)}); keep items inside x 30-546, y 40-740.`);
        else if(b.b>765&&b.y<890&&b.k!=='html') out.push(`${tag}: ${name} overlaps the caption zone (bottom ${Math.round(b.b)}); the picture area ends at y 740.`);
        if(b.r-b.x<2||b.b-b.y<2) out.push(`${tag}: ${name} has no visible size.`);
      }
      for(let a=0;a<B.length;a++)for(let c=a+1;c<B.length;c++){
        const p=B[a],q=B[c]; const w=Math.min(p.r,q.r)-Math.max(p.x,q.x), h=Math.min(p.b,q.b)-Math.max(p.y,q.y);
        if(w>0&&h>0){const ar=Math.min((p.r-p.x)*(p.b-p.y),(q.r-q.x)*(q.b-q.y)); if(w*h/ar>0.3) out.push(`${tag}: ${p.k} "${p.l}" overlaps ${q.k} "${q.l}" by ${Math.round(100*w*h/ar)}%; move one so they are apart.`)}
      }
      if(B.length===0) out.push(`${tag}: nothing visible at the end of the scene.`);
    }
  } finally { await browser.close(); server.close(); }
  return out;
}
if(process.argv[1].endsWith('lint.mjs')){const r=await lint(process.argv[2]);console.log(r.length?r.join('\n'):'clean');}
