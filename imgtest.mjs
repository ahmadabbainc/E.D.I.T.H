// Spike: can the Gemini key generate detailed isometric illustrations? Writes PNGs to out/ and reports per-model results as notices.
import fs from 'fs'; import {imageModels,modelNames} from './gemini.mjs';
const KEY=process.env.GEMINI_API_KEY; if(!KEY){console.log('::error::no GEMINI_API_KEY');process.exit(1)}
const STYLE='Isometric three-quarter-view technical illustration of a single object, centred, on a plain warm cream background (#f8f4e6) with generous empty margin. Matte off-white and cream materials, thin warm-grey outlines, soft ambient shading on each face (left face lighter, right face slightly darker), rounded edges, tiny precise details (screws, vents, ports, buttons), sitting on a thin flat cream base slab with a soft shadow. Sparse bright green (#3a9a1a) accent used only on small screens or highlights. Clean vector-like linework, very high detail, no text, no people, no logos, no watermark. Object: ';
const SUBJECTS=[['satellite','an Earth-orbit communications satellite with two solar panel wings and a dish antenna'],['microwave','a countertop microwave oven with a door, control panel and turntable visible through the window'],['server','a rack server with drive bays, vents and status lights']];
fs.mkdirSync('out',{recursive:true});
const models=await imageModels(KEY); console.log('image models:',models.join(', '));
if(!models.length){console.log('::error::no image models. Available: '+(await modelNames(KEY)).slice(0,300));process.exit(1)}
const notes=[]; let made=0;
for(const [name,desc] of SUBJECTS){
  let ok=false;
  for(const m of models){
    try{
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`,{method:'POST',signal:AbortSignal.timeout(120000),headers:{'content-type':'application/json','x-goog-api-key':KEY},
        body:JSON.stringify({contents:[{parts:[{text:STYLE+desc}]}],generationConfig:{responseModalities:['TEXT','IMAGE']}})});
      const j=await r.json().catch(()=>({}));
      if(!r.ok){notes.push(`${name}/${m}: ${r.status} ${(j.error?.message||'').slice(0,140)}`);continue}
      const part=(j.candidates?.[0]?.content?.parts||[]).find(p=>p.inlineData?.data);
      if(!part){notes.push(`${name}/${m}: no image returned`);continue}
      fs.writeFileSync(`out/spike-${name}.png`,Buffer.from(part.inlineData.data,'base64')); notes.push(`${name}/${m}: OK`); ok=true; made++; break;
    }catch(e){notes.push(`${name}/${m}: ${e.message.slice(0,100)}`)}
  }
}
console.log(`::notice::image spike: ${made}/${SUBJECTS.length} made. ${notes.join(' | ').slice(0,900)}`);
process.exit(0);
