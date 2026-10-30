// Render icon SVGs to small PNGs so a vision model can check them.
import {chromium} from 'playwright';
export async function shots(svgs){
  const b=await chromium.launch(); const out=[];
  try{
    const p=await b.newPage({viewport:{width:160,height:160}});
    for(const svg of svgs){
      await p.setContent(`<body style="margin:0;background:#fff;color:#000"><div style="width:160px;height:160px;padding:10px;box-sizing:border-box">${svg.replace('<svg','<svg style="width:100%;height:100%"')}</div></body>`);
      out.push((await p.screenshot()).toString('base64'));
    }
  } finally { await b.close() }
  return out;
}
