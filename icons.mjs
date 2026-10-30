// Real icons for real things. The AI names the object ("satellite", brand "firefox"); we search Iconify
// (200k+ open icons) at generation time and embed the SVG, so rendering stays offline and deterministic.
const API='https://api.iconify.design';
const COLORED=['fluent-emoji-flat','noto','flat-color-icons','fluent-color','streamline-color','twemoji','emojione','openmoji'];
const MONO=['lucide','tabler','mdi'];
const BRAND=['logos','simple-icons'];
const cache=new Map();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url,tries=3){
  for(let a=0;a<tries;a++){
    try{const r=await fetch(url,{signal:AbortSignal.timeout(15000)}); if(r.ok)return r; if(r.status===404)return null; if(r.status<500&&r.status!==429)return null}catch(e){}
    await sleep(800*(a+1));
  } return null;
}
async function search(term,prefixes){
  const r=await get(`${API}/search?query=${encodeURIComponent(term)}&limit=48&prefixes=${prefixes.join(',')}`); if(!r)return [];
  const j=await r.json().catch(()=>({})); const want=term.toLowerCase().trim().replace(/\s+/g,'-');
  return (j.icons||[]).map((id,i)=>{const [p,n]=id.split(':');const tier=prefixes.indexOf(p);
    return {id,p,n,score:(tier<0?99:tier)*100+(n===want?-50:n.startsWith(want)?-25:n.includes(want)?-10:0)+i*0.1}}).sort((a,b)=>a.score-b.score);
}
const uniq=(svg,k)=>{const ids=[...svg.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]); let o=svg;
  for(const id of ids){const n=`i${k}_${id}`;o=o.split(`id="${id}"`).join(`id="${n}"`).split(`url(#${id})`).join(`url(#${n})`).split(`href="#${id}"`).join(`href="#${n}"`)}
  return o};
const clean=(svg)=>svg.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/\son\w+="[^"]*"/gi,'').replace(/<(foreignObject|iframe|image)[\s\S]*?<\/\1>/gi,'')
  .replace(/<svg([^>]*?)\swidth="[^"]*"/i,'<svg$1').replace(/<svg([^>]*?)\sheight="[^"]*"/i,'<svg$1');
let counter=0;
// terms: array of search words, most specific first. brand: true for company/product logos.
export async function resolveIcon(terms,{brand=false}={}){
  terms=(Array.isArray(terms)?terms:[terms]).map(t=>String(t||'').trim().toLowerCase()).filter(Boolean).slice(0,4);
  const key=(brand?'b:':'t:')+terms.join('|'); if(cache.has(key))return cache.get(key);
  const tiers=brand?[BRAND,COLORED,MONO]:[COLORED,MONO]; let hit=null;
  outer: for(const tier of tiers) for(const t of terms){
    const res=await search(t,tier); if(!res.length)continue;
    for(const c of res.slice(0,3)){
      const r=await get(`${API}/${c.p}/${c.n}.svg`); if(!r)continue;
      const svg=await r.text(); if(!/^<svg/i.test(svg.trim()))continue;
      hit={id:c.id,term:t,svg:clean(svg.trim()),mono:MONO.includes(c.p)||c.p==='simple-icons'}; break outer;
    }
  }
  cache.set(key,hit); return hit;
}
// Fill item.svg for every icon/card item that has find/brand. Returns a human-readable report.
export async function resolveAll(video){
  const jobs=[]; for(const s of video.scenes) for(const it of s.items){
    if((it.type==='icon'||it.type==='card')&&(it.find||it.brand)) jobs.push(it);
  }
  const report=[]; let i=0;
  async function worker(){while(i<jobs.length){const it=jobs[i++];
    const terms=it.brand?[it.brand,...(it.find||[])]:it.find; const hit=await resolveIcon(terms,{brand:!!it.brand});
    if(hit){it.svg=uniq(hit.svg,++counter); if(hit.mono)it.mono=true; report.push(`${terms[0]}→${hit.id}`)}
    else{ report.push(`${terms[0]}→MISSING`); if(!it.kit)it.kit='question' }
    delete it.find; delete it.brand;
  }}
  await Promise.all(Array.from({length:5},worker)); return report;
}
