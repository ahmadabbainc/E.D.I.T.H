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
  const r=await get(`${API}/search?query=${encodeURIComponent(term)}&limit=48${prefixes.length?'&prefixes='+prefixes.join(','):''}`); if(!r)return [];
  const j=await r.json().catch(()=>({})); const want=term.toLowerCase().trim().replace(/\s+/g,'-');
  return (j.icons||[]).map((id,i)=>{const [p,n]=id.split(':');const tier=prefixes.indexOf(p);
    return {id,p,n,score:(tier<0?99:tier)*100+(n===want?-50:n.startsWith(want)?-25:n.includes(want)?-10:0)+i*0.1}}).sort((a,b)=>a.score-b.score);
}
// An icon is only accepted if its name shares a real word with the search term (no 'cannon' -> 'chemical-weapon').
const relevant=(term,name)=>{const tok=name.toLowerCase().split(/[-_\d]+/).filter(Boolean);
  const words=term.toLowerCase().split(/[\s-]+/).filter(w=>w.length>2);
  return words.some(w=>tok.includes(w)||tok.includes(w.replace(/s$/,''))||tok.some(t=>t.length>3&&w.length>3&&Math.abs(t.length-w.length)<=2&&(t.startsWith(w)||w.startsWith(t))))};
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
  const tiers=brand?[BRAND,COLORED,MONO,[]]:[COLORED,MONO,[]]; let hit=null;
  outer: for(const tier of tiers) for(const t of terms){
    const res=await search(t,tier); if(!res.length)continue;
    for(const c of res.filter(c=>relevant(t,c.n)).slice(0,3)){
      const r=await get(`${API}/${c.p}/${c.n}.svg`); if(!r)continue;
      const svg=await r.text(); if(!/^<svg/i.test(svg.trim()))continue;
      hit={id:c.id,term:t,svg:clean(svg.trim()),mono:MONO.includes(c.p)||c.p==='simple-icons'}; break outer;
    }
  }
  cache.set(key,hit); return hit;
}
// Fill item.svg for every icon/card item that has find/brand. alts = {term:[synonyms]} from the AI rescue pass.
// Returns {report, missing:[{it,terms}]}; unresolved items keep their find list.
export async function resolveAll(video,alts={}){
  const jobs=[]; for(const s of video.scenes) for(const it of s.items){
    if((it.type==='icon'||it.type==='card')&&(it.find||it.brand)&&!it.svg) jobs.push(it);
  }
  const report=[],missing=[]; let i=0;
  async function worker(){while(i<jobs.length){const it=jobs[i++];
    const base=it.brand?[it.brand,...(it.find||[])]:[...(it.find||[])];
    const extra=base.flatMap(t=>alts[String(t).toLowerCase()]||[]);
    const terms=[...base,...extra].slice(0,8); const hit=await resolveIcon(terms,{brand:!!it.brand});
    if(hit){it.svg=uniq(hit.svg,++counter); if(hit.mono)it.mono=true; report.push(`${base[0]}→${hit.id}`); delete it.find; delete it.brand}
    else{ report.push(`${base[0]}→MISSING`); missing.push({it,terms:base}) }
  }}
  await Promise.all(Array.from({length:5},worker)); return {report,missing};
}
// Last resort: show the word as a clean label instead of a wrong picture.
export function labelFallback(video){
  let n=0; for(const s of video.scenes) for(const it of s.items){
    if((it.type==='icon'||it.type==='card')&&!it.svg&&(it.find||it.brand)){
      const w=String((it.brand||it.find[0])||'').replace(/\b\w/g,c=>c.toUpperCase()).slice(0,18);
      it.type='label'; it.text=w; delete it.size; delete it.find; delete it.brand; delete it.kit; n++;
    }
  } return n;
}
