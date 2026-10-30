// Explainer engine: a pure function  seek(t) -> pixels.  No timers, so renders are deterministic.
import {kit} from './kit.js';
const E = {
  lin:t=>t, out:t=>1-Math.pow(1-t,3), inOut:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,
  back:t=>{const c=1.70158+1;return 1+c*Math.pow(t-1,3)+1.70158*Math.pow(t-1,2)},
  spring:t=>1-Math.cos(t*Math.PI*4.5)*Math.exp(-t*6),
};
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const $=(h)=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild};

export async function load(src){
  const mod=await import(new URL(src,location.href).href+'?v='+Date.now());
  const V=mod.default; try{const r=await fetch(new URL('timings.json',new URL(src,location.href)).href);if(r.ok)V.timings=await r.json()}catch(e){}
  try{const r=await fetch(new URL('words.json',new URL(src,location.href)).href);if(r.ok)V.wordTimes=await r.json()}catch(e){}
  const stage=document.getElementById('stage');
  stage.style.width=V.width+'px';stage.style.height=V.height+'px';
  const world=document.getElementById('world'), cap=document.getElementById('cap');
  // ---------- timeline: scene start times (audio timings override estimates) ----------
  let T=0; const words=[];
  V.scenes.forEach((s,i)=>{
    s.start=T; const ws=(s.say||'').split(/\s+/).filter(Boolean);
    const est=Math.max(s.min||1.4, ws.length*0.36+0.4);
    s.dur=s.dur||(V.timings&&V.timings[i])||est; T+=s.dur;
    const tot=ws.reduce((a,w)=>a+w.length+2,0); let c=s.start+0.1;
    s.words=ws.map(w=>{const d=(w.length+2)/tot*(s.dur-0.3);const o={w,t:c};c+=d;return o});
    const wt=V.wordTimes&&V.wordTimes[i]; if(wt&&wt.length===ws.length) s.words=ws.map((w,k)=>({w,t:s.start+wt[k].t}));
  });
  V.total=T+(V.tail||0.6);
  // ---------- build elements ----------
  const items=[]; const byId={};
  V.scenes.forEach(s=>(s.items||[]).forEach(it=>{
    const el=make(it); el.classList.add('it'); it.type==='line'?world.prepend(el):world.appendChild(el);
    const o={...it,el,t0:s.start+(it.at||0),t1:it.keep?Infinity:s.start+(it.until??s.dur)+0.0,scene:s};
    items.push(o); if(it.id)byId[it.id]=o;
  }));
  V.scenes.forEach(s=>{ if(s.clear) items.forEach(o=>{ if(o.t1===Infinity && o.t0<s.start) o.t1=s.start+.3 }) });
  V.scenes.forEach(s=>(s.remove||[]).forEach(id=>{if(byId[id])byId[id].t1=s.start+(s.removeAt||0)}));
  // lines need endpoints measured after layout
  function make(it){
    const t=it.type, st=it.style||{};
    let el;
    if(t==='card'){el=$(`<div class="card">${it.html||it.svg||(it.kit?kit(it.kit):'')||it.icon||''}</div>`);const z=it.size||90;
      Object.assign(el.style,{width:z+'px',height:z+'px'});}
    else if(t==='label'){el=$(`<div class="label"><b>${it.text}</b>${it.sub?`<small>${it.sub}</small>`:''}</div>`);}
    else if(t==='icon'){const z=it.size||90;el=$(`<div class="iconbox${it.svg?' ext'+(it.mono?' mono':''):''}" style="width:${z}px;height:${z}px">${it.svg||kit(it.kit)}</div>`);}
    else if(t==='pill'){el=$(`<div class="pill">${it.kit?kit(it.kit):(it.icon||'')}${it.text}</div>`);}
    else if(t==='text'){el=$(`<div class="text" style="font-size:${it.size||40}px;color:${it.color||'var(--ink)'}">${it.text}</div>`);}
    else if(t==='svg'||t==='html'){el=$(`<div>${it.html}</div>`);}
    else if(t==='line'){el=$(`<svg width="${V.width}" height="${V.height}" style="overflow:visible"><path fill="none" stroke="${it.color||'#1d1d1b'}" stroke-width="${it.w||2}" stroke-linecap="round"/></svg>`);}
    else if(t==='box3d'){ // isometric slab: x,y = centre; w,d = footprint; h = height
      const {w=160,d=160,h=20}=it; el=$(`<div class="box3d" style="width:${w}px;height:${d}px;transform-style:preserve-3d">
       <div class="f" style="width:${w}px;height:${d}px;transform:translateZ(${h}px)"></div>
       <div class="f" style="width:${w}px;height:${h}px;top:${d}px;transform-origin:top;transform:rotateX(-90deg);background:#ece6d2"></div>
       <div class="f" style="width:${h}px;height:${d}px;left:${w}px;transform-origin:left;transform:rotateY(90deg);background:#e0d9c0"></div></div>`);}
    Object.assign(el.style,st); el.dataset.t=t; el.dataset.lbl=String(it.text||it.kit||it.id||t).slice(0,30); return el;
  }
  function center(o){const r=o.el.getBoundingClientRect?null:null;return {x:o.cx,y:o.cy}}
  function pos(o,t){ // keyframed position/scale/opacity: o.to = [{at,dur,x,y,scale,opacity,ease}]
    let x=o.x||0,y=o.y||0,sc=o.scale??1,op=o.opacity??1,rot=o.rot||0;
    for(const k of (o.to||[])){const a=o.t0+k.at,p=clamp((t-a)/(k.dur||.6)); if(t<a)break;
      const e=(E[k.ease]||E.inOut)(p);
      if(k.x!==undefined)x=x+(k.x-x)*e; if(k.y!==undefined)y=y+(k.y-y)*e;
      if(k.scale!==undefined)sc=sc+(k.scale-sc)*e; if(k.opacity!==undefined)op=op+(k.opacity-op)*e;
      if(k.rot!==undefined)rot=rot+(k.rot-rot)*e;}
    return {x,y,sc,op,rot};
  }
  // ---------- seek ----------
  function seek(t){
    for(const o of items){
      const live=t>=o.t0&&t<=o.t1; o.el.style.display=live?'block':'none'; if(!live)continue;
      const inP=clamp((t-o.t0)/(o.dur||.45)), outP=o.t1===Infinity?0:clamp((t-(o.t1-.3))/.3);
      const en=o.enter||'pop'; let a=1,s=1,dx=0,dy=0,draw=1;
      if(en==='pop'){a=clamp(inP*2);s=.4+.6*E.back(inP)}
      else if(en==='fade'){a=E.out(inP)}
      else if(en==='rise'){a=E.out(inP);dy=(1-E.out(inP))*40}
      else if(en==='left'){a=E.out(inP);dx=-(1-E.out(inP))*120}
      else if(en==='right'){a=E.out(inP);dx=(1-E.out(inP))*120}
      else if(en==='draw'){a=1;draw=E.inOut(inP)}
      else if(en==='none'){a=1}
      a*=1-outP;
      const p=pos(o,t), w=o.el.offsetWidth, h=o.el.offsetHeight;
      if(o.type==='line'){
        const A=byId[o.from],B=byId[o.toId];const pa=A?anchor(A,t):{x:o.x1,y:o.y1},pb=B?anchor(B,t):{x:o.x2,y:o.y2};
        const path=o.el.querySelector('path'); path.setAttribute('d',`M${pa.x} ${pa.y} L${pb.x} ${pb.y}`);
        const L=Math.hypot(pb.x-pa.x,pb.y-pa.y)||1; path.style.strokeDasharray=L; path.style.strokeDashoffset=L*(1-draw);
        o.el.style.opacity=a; continue;}
      o.cx=p.x;o.cy=p.y;o.w=w;o.h=h;
      const bob=o.float?Math.sin(t*2+(o.x||0))*o.float:0;
      o.el.style.opacity=a*p.op;
      const rx=o.type==='box3d'?` rotateX(60deg) rotateZ(${-45+p.rot}deg)`:` rotate(${p.rot}deg)`;
      o.el.style.transform=`translate(${p.x-w/2+dx}px,${p.y-h/2+dy+bob}px) scale(${p.sc*s})${rx}`;
    }
    // camera
    const sc=V.scenes.find(s=>t>=s.start&&t<s.start+s.dur)||V.scenes.at(-1);
    const c=sc.camera; if(c){const p=E.inOut(clamp((t-sc.start)/sc.dur));
      const z=c.from.z+(c.to.z-c.from.z)*p,cx=c.from.x+(c.to.x-c.from.x)*p,cy=c.from.y+(c.to.y-c.from.y)*p;
      world.style.transform=`translate(${V.width/2}px,${V.height/2}px) scale(${z}) translate(${-cx}px,${-cy}px)`;}
    else world.style.transform='none';
    // captions (karaoke)
    if(cap.dataset.s!=sc.start){cap.dataset.s=sc.start;
      cap.innerHTML=sc.words.map(x=>`<span class="w">${x.w}</span>`).join(' ');}
    const spans=cap.children; let any=false;
    sc.words.forEach((x,i)=>{spans[i].className='w'+(t>=x.t?' on':'')}); 
    const fin=clamp((t-sc.start)/.2),fout=clamp((sc.start+sc.dur-t)/.15);
    cap.style.opacity=Math.min(fin,fout); cap.style.transform=`translateY(${(1-fin)*12}px)`;
  }
  function anchor(o,t){const p=pos(o,t);return{x:p.x,y:p.y+(o.anchorY||0)}}
  window.seek=seek; window.TOTAL=V.total; window.FPS=V.fps||30; window.SCENES=V.scenes.map(s=>({start:s.start,dur:s.dur,say:s.say}));
  seek(0); return V;
}
