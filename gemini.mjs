// Ask Google which Gemini models exist today and pick the newest suitable ones (names change often).
const BASE='https://generativelanguage.googleapis.com/v1beta';
let cache;
async function all(key){
  if(cache)return cache;
  const out=[];let tok='';
  for(let i=0;i<5;i++){
    const r=await fetch(`${BASE}/models?pageSize=200${tok?'&pageToken='+tok:''}`,{headers:{'x-goog-api-key':key}});
    if(!r.ok)throw new Error(`list models ${r.status}: ${(await r.text()).slice(0,200)}`);
    const j=await r.json();out.push(...(j.models||[]));tok=j.nextPageToken;if(!tok)break;
  }
  return cache=out.filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')).map(m=>m.name.replace(/^models\//,''));
}
const ver=n=>{const m=n.match(/(\d+)(?:\.(\d+))?/);return m?+m[1]*100+(+(m[2]||0)):0};
const rank=(a,b)=>ver(b)-ver(a)||(/flash/.test(b)?1:0)-(/flash/.test(a)?1:0)||a.length-b.length;
const rankText=(a,b)=>(/flash/.test(b)?1:0)-(/flash/.test(a)?1:0)||rank(a,b);
export async function textModels(key){
  const all_=await all(key);
  const ok=all_.filter(n=>/^gemini/.test(n)&&/(flash|pro)/.test(n)&&!/(tts|image|live|embed|audio|vision|robot|computer|lite|thinking|-exp|customtools|nano|banana|veo|imagen)/.test(n));
  const stable=ok.filter(n=>!/preview/.test(n)).sort(rankText),prev=ok.filter(n=>/preview/.test(n)).sort(rankText);
  return [...stable.slice(0,3),...prev.slice(0,2)].slice(0,5);
}
export async function ttsModels(key){
  const all_=await all(key);
  return all_.filter(n=>/tts/.test(n)).sort(rank).slice(0,4);
}
export async function modelNames(key){return (await all(key)).join(', ')}
