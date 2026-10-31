// node generate.mjs "How DNS works" [--seconds 60] [--slug my-slug] [--mock file.json]
// Topic -> AI writes the scene JSON -> validate -> lint layout -> auto-repair -> videos/<slug>/video.js
// Needs GEMINI_API_KEY (default) or ANTHROPIC_API_KEY (better scripts, used first if present).
import fs from 'fs'; import {lint} from './lint.mjs'; import {KIT_NAMES} from './engine/kit.js'; import {ISO_NAMES} from './engine/iso-assets.js'; import {textModels,modelNames} from './gemini.mjs'; import {resolveAll,labelFallback} from './icons.mjs'; import {shots} from './iconshots.mjs';
const argv=process.argv.slice(2); const flag=(n,d)=>{const i=argv.indexOf('--'+n);return i>=0?argv[i+1]:d};
const topic=argv.find((a,i)=>!a.startsWith('--')&&!(argv[i-1]||'').startsWith('--'))||''; if(!topic){console.error('usage: node generate.mjs "topic"');process.exit(1)}
const seconds=Math.max(20,Math.min(150,+flag('seconds',60))), nScenes=Math.round(seconds/3.6);
let iconSecs=0,iconReport=[],usedModel=process.env.ANTHROPIC_API_KEY?'claude':'';const T0=Date.now();
const fail=m=>{console.log('::error::'+String(m).replace(/\s+/g,' ').slice(0,500));process.exit(1)};
process.on('uncaughtException',e=>fail(e.message)); process.on('unhandledRejection',e=>fail(e&&e.message||e));

const TYPES=['iso','icon','card','label','pill','text','line','box3d','svg'], ENTER=['pop','fade','rise','left','right','draw','none'];
const SPEC=`You are a motion-graphics director writing a vertical (576x1024) explainer video as JSON. Output ONLY one JSON object, no prose, no code fences.

FORMAT
{ "title": "short catchy title", "scenes": [ { "say": "one spoken sentence", "clear": false, "remove": ["id"], "camera": {"from":{"x":288,"y":400,"z":1},"to":{"x":288,"y":400,"z":1.12}}, "items": [ ... ] } ] }
- Every scene = ONE sentence of narration ("say", 6-16 words, conversational, concrete) + the visuals that illustrate that exact sentence. One sentence, one picture, one motion.
- "clear": true wipes everything marked "keep" from earlier scenes (use it when the picture changes topic). "remove": ["id", ...] removes specific kept items.
- "camera" is optional (slow push-in on 1 in 3 scenes is nice; z between 1 and 1.2, keep x 288 and y 380-440).

ITEMS (all coordinates are the CENTRE of the item, in pixels)
- {"type":"iso","asset":"<name>","size":260-360,...}   DETAILED ISOMETRIC 3D ILLUSTRATION (the reference look). PREFER THIS whenever one of these fits: ${ISO_NAMES.join(', ')}. Optional: "screen":"browser|code|chat|dashboard|video|apps" (laptop/monitor/phone/browser show that UI), "n":1-12 (stack = sheets, machine items), "lines":["Title","line"] (document), "layout":true (browser wireframe). Use iso for the hero and key devices; use find icons for everything else.
- {"type":"icon","find":["satellite","space"],"size":100-230,"x":..,"y":..}   THE REAL THING. "find" = 1-3 search words for an icon library (200k icons: emoji, objects, devices, vehicles, animals, nature, buildings, people, tools, food, planets, symbols), most specific first, lowercase singular nouns ("satellite", "gps tower", "atomic clock", "headphones", "cell tower"). For a company/product logo use "brand":"firefox" (also "google", "chrome", "github", "openai"...).
  EVERY physical thing you mention must show that exact thing, never a stand-in (a satellite must be a satellite, not a star or a globe). If a very specific part has no common icon (e.g. magnetron), search the closest REAL thing that contains it ("microwave") or use a text label; NEVER search a word that means something different ("engine" for a magnetron gives a fire engine). Every find word must literally name the thing. Use "kit" only for abstract symbols.
- {"type":"icon","kit":"<name>",...}   hand-drawn abstract symbols ONLY: arrow, check, cross, question, bolt, wifi, lock, shield, clock, coin, code, cursor, stack, cube, rocket, heart, star.
- {"type":"card","find":[..]|"brand":".."|"kit":"<name>","size":70-110,...}   the icon inside a rounded app-style tile (best for brands/apps; "text" is not supported, use "icon" with a short word like "G" via {"type":"card","html":"<b style='font-size:40px'>G</b>"} only if needed).
- {"type":"label","text":"Title","sub":"small caption"}   boxed callout. Keep text under 22 chars, sub under 32.
- {"type":"pill","text":"Gecko","kit":"gear"}   small tag. Keep under 18 chars. "style":{"background":"#9bd400"} allowed for emphasis.
- {"type":"text","text":"35M+","size":60-200,"color":"#2a8a00"}   big number or word.
- {"type":"line","from":"idA","toId":"idB","enter":"draw","color":"#2a8a00","w":4}   connector between two items that have "id". Draws itself.
- {"type":"box3d","w":150,"d":150,"h":14,"x":..,"y":..}   isometric slab; stack several, 16px apart in y, to make a tower.
Common fields: "id" (needed for lines/removal), "at" (seconds after scene start, 0.2-2.5), "enter" (${ENTER.join('|')}; default pop), "keep":true (stay on screen in later scenes), "float":3 (gentle bobbing), and movement "to":[{"at":0.8,"dur":1.6,"x":..,"y":..,"scale":..,"opacity":..,"rot":..,"ease":"inOut"}] (animates relative to the scene start, e.g. a coin flying from A to B).
HAND-DRAWN KIT NAMES (abstract symbols): ${KIT_NAMES.join(', ')}.

LAYOUT RULES (strict, a linter checks them)
- Picture area: x 40-536, y 90-740. Never place anything lower than y 740: the caption lives at y 780-880.
- Centre of the frame is (288, 400). Items must not overlap each other (leave at least 20px between them). Labels sit 110-150px above/below the centre of the icon they describe (more for bigger icons).
- 2 to 6 items per scene. Stagger "at" by 0.3-0.5s so things build up in the order the sentence says them.
- Fill the frame like a poster, phone-sized: ONE hero icon at size 170-230 (centred around y 330-430), supporting icons 100-140, tiny accents 60-80. Big and bold beats small and busy. Labels are large text: keep label text under 16 characters and sub under 26; pills under 14 characters.
- Spread the composition over the picture area (y 100-700); do not leave the lower half of it empty.
- Scene 1 is a hook (a question or surprising fact). The last scene is a short call to action: "Follow for more ..." with a rocket or star icon and a pill "+ Follow".
- Use "keep"+ids to build diagrams across scenes (hub-and-spoke, A -> B flows), and "clear" when moving on. Vary the entrance animations. Make it feel alive: use movement "to" for flows, "float" for hero icons.
- Facts must be accurate and plain-language; explain like to a curious 14 year old.`;
const example=fs.readFileSync(new URL('./prompts/example.json',import.meta.url),'utf8');

const attempts=[];
async function post(url,headers,body){
  const t0=Date.now(), tag=(body.model||url.split('/models/')[1]||'').split(':')[0];
  for(let a=0;a<3;a++){
    let r; try{ r=await fetch(url,{method:'POST',signal:AbortSignal.timeout(100000),headers:{'content-type':'application/json',...headers},body:JSON.stringify(body)}) }
    catch(e){ attempts.push(`${tag}:timeout ${Math.round((Date.now()-t0)/1000)}s`); throw new Error('no answer in time: '+e.message) }
    if(r.ok){ attempts.push(`${tag}:ok ${Math.round((Date.now()-t0)/1000)}s`); return r.json() }
    const t=await r.text();
    if((r.status===429||r.status>=500)&&a<2){ await new Promise(s=>setTimeout(s,4000*(a+1))); continue }
    attempts.push(`${tag}:${r.status}`); throw new Error(`LLM ${r.status}: ${t.slice(0,300)}`);
  } throw new Error('LLM failed after retries');
}
async function ask(messages,SYS=SPEC){ // messages: [{role,content}]
  if(flag('mock')) return fs.readFileSync(flag('mock'),'utf8');
  if(process.env.ANTHROPIC_API_KEY){
    const j=await post('https://api.anthropic.com/v1/messages',{'x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},
      {model:process.env.ANTHROPIC_MODEL||'claude-sonnet-5-5',max_tokens:16000,system:SYS,messages:messages.map(m=>({role:m.role,content:typeof m.content==='string'?m.content:m.content.map(p=>p.img?{type:'image',source:{type:'base64',media_type:'image/png',data:p.img}}:{type:'text',text:p.text})}))});
    return j.content.map(c=>c.text||'').join('');
  }
  const key=process.env.GEMINI_API_KEY; if(!key) throw new Error('Set GEMINI_API_KEY (or ANTHROPIC_API_KEY) as a repository secret');
  const all=process.env.GEMINI_TEXT_MODEL?[process.env.GEMINI_TEXT_MODEL]:await textModels(key);
  if(!all.length) throw new Error('No usable Gemini text model. Available: '+await modelNames(key));
  globalThis.__bad=globalThis.__bad||new Set();
  const order=[...(globalThis.__good?[globalThis.__good]:[]),...all.filter(m=>m!==globalThis.__good&&!globalThis.__bad.has(m))];
  if(!order.length) order.push(...all);
  const attempt=async(m)=>{
    for(const think of [true,false]){ // first try with thinking switched off (much faster); some models reject that option
      try{
        const gc={responseMimeType:'application/json',temperature:0.8,maxOutputTokens:30000}; if(think)gc.thinkingConfig={thinkingBudget:0};
        const j=await post(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`,{'x-goog-api-key':key},
          {systemInstruction:{parts:[{text:SYS}]},contents:messages.map(x=>({role:x.role==='assistant'?'model':'user',parts:typeof x.content==='string'?[{text:x.content}]:x.content.map(p=>p.img?{inlineData:{mimeType:'image/png',data:p.img}}:{text:p.text})})),generationConfig:gc});
        const t=j.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('');
        if(t)return {t,m}; throw new Error('empty response');
      }catch(e){
        if(think&&/ 400/.test(e.message)&&/think/i.test(e.message))continue;
        globalThis.__bad.add(m); throw new Error(`${m}: ${e.message}`);
      }
    }
  };
  // Race the best candidates in parallel (some models hang for minutes at random); first answer wins.
  const racers=globalThis.__good?[globalThis.__good]:order.slice(0,3);
  let win; try{ win=await Promise.any(racers.map(attempt)) }
  catch(e){ const rest=order.filter(m=>!racers.includes(m)); win=null; for(const m of rest){ try{win=await attempt(m);break}catch(_){} } if(!win) throw new Error((e.errors||[e]).map(x=>x.message).join(' | ').slice(0,300)) }
  console.log('using',win.m); usedModel=win.m; globalThis.__good=win.m; return win.t;
}
const parse=t=>{t=t.trim().replace(/^```(?:json)?/i,'').replace(/```$/,'').trim();const a=t.indexOf('{'),b=t.lastIndexOf('}');return JSON.parse(t.slice(a,b+1))};
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)), num=(v,d)=>Number.isFinite(+v)?+v:d;

function normalize(v){
  if(!v||!Array.isArray(v.scenes)||!v.scenes.length) throw new Error('model returned no scenes');
  const out={title:String(v.title||topic).slice(0,80),width:576,height:1024,fps:30,scenes:[]}; const ids=new Set();
  for(const s of v.scenes){
    const sc={say:String(s.say||'').trim(),items:[]}; if(!sc.say)continue;
    if(s.clear)sc.clear=true; if(Array.isArray(s.remove))sc.remove=s.remove.map(String);
    if(s.min)sc.min=clamp(num(s.min,1.4),1,8);
    const c=s.camera; if(c&&c.from&&c.to)sc.camera={from:{x:num(c.from.x,288),y:num(c.from.y,400),z:clamp(num(c.from.z,1),.8,1.5)},to:{x:num(c.to.x,288),y:num(c.to.y,400),z:clamp(num(c.to.z,1),.8,1.5)}};
    for(const it of (s.items||[])){
      if(!TYPES.includes(it.type))continue; const o={type:it.type};
      if(it.type==='iso'){ if(!ISO_NAMES.includes(it.asset)) continue; o.asset=it.asset;
        if(['browser','chat','dashboard','code','video','apps'].includes(it.screen)) o.screen=it.screen;
        if(it.n!==undefined) o.n=clamp(num(it.n,4),1,12); if(it.layout) o.layout=true;
        if(Array.isArray(it.lines)) o.lines=it.lines.slice(0,5).map(x=>String(x).slice(0,18)); if(it.text) o.text=String(it.text).slice(0,24); }
      for(const k of ['id','kit','text','sub','color','icon']) if(it[k]!==undefined) o[k]=String(it[k]);
      if(o.kit&&!KIT_NAMES.includes(o.kit)){ if(!it.find&&!it.brand) it.find=[o.kit]; delete o.kit }
      const fl=v=>(Array.isArray(v)?v:[v]).map(x=>String(x).trim().slice(0,40)).filter(Boolean).slice(0,4);
      if(it.find) o.find=fl(it.find); if(it.brand) o.brand=String(it.brand).trim().slice(0,40);
      for(const k of ['size','w','d','h','at','float','scale','rot','opacity']) if(it[k]!==undefined) o[k]=num(it[k],undefined);
      if(it.type!=='line'){o.x=clamp(num(it.x,288),30,546);o.y=clamp(num(it.y,400),50,745)}
      else{ if(it.from)o.from=String(it.from); if(it.toId||it.to_id)o.toId=String(it.toId||it.to_id); for(const k of ['x1','y1','x2','y2','w'])if(it[k]!==undefined)o[k]=num(it[k],0)}
      if(ENTER.includes(it.enter))o.enter=it.enter; if(it.keep)o.keep=true; if(it.until!==undefined)o.until=num(it.until,2);
      if(it.style&&typeof it.style==='object'){o.style={};for(const [k,val] of Object.entries(it.style)) if(/^(background|color|border-color|opacity)$/.test(k)&&/^[#a-z0-9(),. %-]+$/i.test(String(val)))o.style[k]=String(val)}
      if(typeof it.html==='string'&&/^\s*<(svg|b|span)[\s>]/i.test(it.html)&&!/<script|\son\w+\s*=|javascript:|<iframe|<img|url\(/i.test(it.html)) o.html=it.html;
      if(Array.isArray(it.to)) o.to=it.to.filter(k=>k&&typeof k==='object').map(k=>{const r={at:num(k.at,0),dur:num(k.dur,.6)};for(const q of ['x','y','scale','opacity','rot'])if(k[q]!==undefined)r[q]=num(k[q],0);if(['lin','out','inOut','back','spring'].includes(k.ease))r.ease=k.ease;return r});
      if(o.id)ids.add(o.id); sc.items.push(o);
    }
    out.scenes.push(sc);
  }
  for(const s of out.scenes) s.items=s.items.filter(i=>i.type!=='line'||((!i.from&&i.x1!==undefined)||ids.has(i.from))&&((!i.toId&&i.x2!==undefined)||ids.has(i.toId)));
  return out;
}
async function verifyIcons(v){
  const list=[]; v.scenes.forEach(s=>s.items.forEach(it=>{ if(it.svg&&it._term&&list.length<30) list.push({it,say:s.say}) }));
  if(!list.length) return 0;
  const imgs=await shots(list.map(x=>x.it.svg));
  const parts=[{text:'Check icons for an explainer video. For each numbered icon image below, decide whether it clearly depicts the WANTED thing (an obviously fitting depiction counts; a different object does not, e.g. a fire engine is not a magnetron, an ice cube is not a metal wall). Return ONLY a JSON array like [{"i":0,"ok":true},{"i":1,"ok":false,"better":["microwave oven","radio tower"]}]. For not-ok icons, "better" lists up to 3 alternative search words for icons that WOULD really depict the wanted thing (empty array if no icon could).'}];
  list.forEach((x,i)=>{parts.push({text:`Icon ${i}: wanted "${x.it._term}"; the narration says: "${x.say}"`});parts.push({img:imgs[i]})});
  const raw=await ask([{role:'user',content:parts}],'You are a strict icon checker. Output only JSON.');
  const a=raw.indexOf('['),b=raw.lastIndexOf(']'); const arr=JSON.parse(raw.slice(a,b+1)); let bad=0;
  for(const r of arr){ const x=list[r.i]; if(!x||r.ok!==false)continue; bad++;
    const it=x.it; delete it.svg; delete it.mono; const better=(r.better||[]).map(String).slice(0,3);
    if(better.length){it.find=better}else{it.find=[it._term];it._label=true} }
  return bad;
}
const slugify=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'video';
const write=(slug,v)=>{fs.mkdirSync(`videos/${slug}`,{recursive:true});fs.writeFileSync(`videos/${slug}/video.js`,`// Generated from topic: ${JSON.stringify(topic)}\nexport default ${JSON.stringify(v,(k,x)=>k.startsWith('_')?undefined:x,1)};\n`)};

let slug=flag('slug')||slugify(topic); if(!flag('slug')){let n=2,b=slug;while(fs.existsSync(`videos/${slug}`))slug=`${b}-${n++}`}
const first=`Topic: ${topic}\nTarget length: about ${seconds} seconds = ${nScenes} scenes.\n\nHere is an example of the quality and style expected (different topic):\n${example}\n\nNow write the JSON for the topic above.`;
const messages=[{role:'user',content:first}]; let v, issues=[];
for(let round=0;round<3;round++){
  console.log(round?`repair round ${round}`:'writing script…');
  const raw=await ask(messages); messages.push({role:'assistant',content:raw});
  try{v=normalize(parse(raw))}catch(e){messages.push({role:'user',content:`That was not usable (${e.message}). Return ONLY the corrected, complete JSON object.`});continue}
  const tI=Date.now(); let {report:rep,missing}=await resolveAll(v);
  if(missing.length){ // rescue: ask the AI for synonyms that exist as icons, then search again
    try{const names=[...new Set(missing.map(m=>m.terms[0]))];
      const raw=await ask([{role:'user',content:`For each object, give 4 alternative icon search words that surely exist as an emoji or simple icon: concrete visible nouns, synonyms, a close visual stand-in or the broader category (e.g. "cannon" -> ["artillery","gun","bomb","firework"]). Return ONLY JSON like {"cannon":["artillery","gun","bomb","firework"]}. Objects: ${JSON.stringify(names)}`}],'You help find icons. Output only JSON.');
      const alts=Object.fromEntries(Object.entries(parse(raw)).map(([k,a])=>[k.toLowerCase(),(Array.isArray(a)?a:[a]).map(String).slice(0,5)]));
      const r2=await resolveAll(v,alts); rep=[...rep.filter(x=>!x.endsWith('MISSING')),...r2.report]; missing=r2.missing;
    }catch(e){console.log('icon rescue failed:',e.message)}
  }
  try{ for(let k=0;k<2;k++){ const bad=await verifyIcons(v); if(!bad)break; rep.push(`vision check replaced ${bad}`); const r3=await resolveAll(v); rep.push(...r3.report) } }
  catch(e){console.log('icon vision check skipped:',e.message.slice(0,200))}
  const lab=labelFallback(v); if(lab)rep.push(`${lab} shown as text labels`); iconReport=rep; iconSecs=Math.round((Date.now()-tI)/1000);
  write(slug,v); issues=await lint(slug);
  console.log(`${v.scenes.length} scenes, ${issues.length} layout issues`);
  if(!issues.length)break;
  if(round<2) messages.push({role:'user',content:`A layout check found these problems. Fix them by moving or resizing items, then return the COMPLETE corrected JSON object only:\n${issues.slice(0,25).join('\n')}`});
}
if(!v) fail('the model never produced valid JSON');
if(issues.length) console.log('remaining issues:\n'+issues.join('\n'));
const list=fs.existsSync('videos.json')?JSON.parse(fs.readFileSync('videos.json','utf8')):[];
fs.writeFileSync('videos.json',JSON.stringify([{slug,title:v.title,topic,created:new Date().toISOString()},...list.filter(x=>x.slug!==slug)],null,1));
console.log(`done: videos/${slug}/video.js — "${v.title}"`);
console.log(`::notice::icons (${iconSecs}s last round): ${iconReport.join(', ').slice(0,900)}`);
console.log(`::notice::llm calls: ${attempts.join(', ').slice(0,400)}`);
console.log(`::notice::script: ${v.scenes.length} scenes, ${issues.length} layout issues left, model ${usedModel||'mock'}, ${Math.round((Date.now()-T0)/1000)}s`);
if(process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT,`slug=${slug}\ntitle=${v.title.replace(/[\r\n]+/g,' ')}\n`);
process.exit(0);
