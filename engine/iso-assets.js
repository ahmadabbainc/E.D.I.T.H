// Library of detailed isometric objects. asset('laptop',{screen:'browser'}) -> SVG string. All original designs.
import {Sc,Plane,COL} from './iso.js';
const G=COL.green,G2=COL.green2,G3=COL.green3,LN=COL.line,INK=COL.ink,DIM=COL.dim;
const stage=(sc,w,d,pad=1.4)=>{sc.shadow(-pad,-pad,w+pad*2,d+pad*2,1.2,.085);return sc.box(-pad,-pad,-.45,w+pad*2,d+pad*2,.45,{sw:1.1})};
// screen UI is designed on a virtual 14 x 10 grid so it fits any screen shape
const hu=(pl,n)=>n/14, hv=(pl,n)=>n/10;
// ---- screen UI painter: draws inside plane pl (u,v in 0..1, v up)
function ui(pl,kind='browser',txt=''){
  const w=Math.hypot(...pl.A),h=Math.hypot(...pl.B); const P0=pl; pl={rect:P0.rect.bind(P0),dot:(u,v,r,f,s2,sw)=>P0.dot(u,v,r*Math.min(w,h)/9,f,s2,sw),poly:P0.poly.bind(P0),line:P0.line.bind(P0),text:(u,v,t,sz,o)=>P0.text(u,v,t,sz*h/10,o),A:P0.A,B:P0.B};
  pl.rect(0,0,1,1,COL.screen,LN,.8);
  const bar=(v,u0,u1,t=.28,c='#dcd8c5')=>pl.rect(u0,v,u1,v+hv(pl,t),c,'none',0);
  if(kind==='browser'||kind==='chat'||kind==='dashboard'){
    const top=hv(pl,1.5); pl.rect(0,1-top,1,1,'#ece8d6',LN,.6);
    [0.03,0.06,0.09].forEach((u,i)=>pl.dot(hu(pl,.55)+i*hu(pl,.6),1-top/2,.2,['#c9c4ae','#c9c4ae','#c9c4ae'][i]));
    pl.rect(hu(pl,2.6),1-top*.82,hu(pl,2.6)+.2,1-top*.15,'#fffefa',LN,.5);
    const ay=1-top-hv(pl,1.35); pl.rect(hu(pl,.7),ay,1-hu(pl,.7),ay+hv(pl,.95),'#fffefa',LN,.6);
    pl.dot(hu(pl,1.3),ay+hv(pl,.47),.22,G); pl.rect(hu(pl,2.2),ay+hv(pl,.4),hu(pl,2.2)+.25,ay+hv(pl,.55),'#cfcab5','none',0);
    const y0=ay-hv(pl,.6);
    if(kind==='browser'){
      pl.rect(hu(pl,.8),y0-hv(pl,1.9),.55,y0-hv(pl,.3),G2,LN,.5); pl.rect(.6,y0-hv(pl,1.9),1-hu(pl,.8),y0-hv(pl,.3),'#e9e5d3','none',0);
      for(let i=0;i<4;i++)bar(y0-hv(pl,2.5+i*.55),hu(pl,.8),.9-i*.08,.22);
      pl.rect(hu(pl,.8),.04,.34,y0-hv(pl,4.4),'#e9e5d3',LN,.4);pl.rect(.4,.04,.64,y0-hv(pl,4.4),'#e9e5d3',LN,.4);pl.rect(.7,.04,1-hu(pl,.8),y0-hv(pl,4.4),G3,LN,.4);
    }else if(kind==='chat'){
      pl.rect(.28,y0-hv(pl,2.0),.96,y0-hv(pl,.5),'#ece8d6',LN,.5);pl.text(.31,y0-hv(pl,1.5),txt||'Build me a web browser',.5,{font:'Inter,sans-serif',weight:600});
      pl.rect(.06,y0-hv(pl,4.4),.62,y0-hv(pl,2.8),'#fffefa',LN,.5);for(let i=0;i<3;i++)bar(y0-hv(pl,3.5+i*.35),.09,.5-i*.08,.2);
      pl.rect(.1,hv(pl,.8),.86,hv(pl,2.0),'#fffefa',LN,.7);pl.text(.13,hv(pl,1.2),'Ask anything',.45,{font:'Inter,sans-serif',weight:500,fill:'#9a957f'});pl.dot(.9,hv(pl,1.4),.45,INK);
      for(let i=0;i<4;i++)pl.rect(.03,y0-hv(pl,1+i*.9),.11,y0-hv(pl,.6+i*.9),'#d9d4bf','none',0);
    }else{
      for(let i=0;i<3;i++){const u=.05+i*.31;pl.rect(u,y0-hv(pl,1.9),u+.27,y0-hv(pl,.3),'#fffefa',LN,.5);pl.rect(u+.02,y0-hv(pl,1.0),u+.1+i*.03,y0-hv(pl,.75),G,'none',0);bar(y0-hv(pl,1.5),u+.02,u+.2,.2)}
      [.35,.6,.45,.8,.55,.7,.9].forEach((k,i)=>pl.rect(.08+i*.12,.06,.16+i*.12,.06+.34*k,i%2?G2:G,LN,.4));
    }
  }else if(kind==='code'){
    pl.rect(0,1-hv(pl,1.2),1,1,'#ece8d6',LN,.6);[.03,.06,.09].forEach(u=>pl.dot(u*0+hu(pl,.55)+(u-.03)/.03*hu(pl,.6),1-hv(pl,.6),.2,'#c9c4ae'));
    const L=[.5,.7,.35,.8,.6,.45,.75,.3,.65,.55];L.forEach((k,i)=>{const y=1-hv(pl,2.2+i*.78);const ind=(i%3)*.06;bar(y,.12+ind,.12+ind+k*.5,.3,i%4===0?G:i%4===2?'#b8b39d':'#dcd8c5')});
    for(let i=0;i<10;i++)pl.text(.03,1-hv(pl,2.45+i*.78),String(i+1),.28,{fill:'#bdb8a2',weight:500});
  }else if(kind==='video'){
    pl.rect(0,0,1,1,'#2b2a25',LN,.8);pl.poly([[.42,.34],[.42,.66],[.62,.5]],'#f5f1e0','none',0);pl.rect(.05,hv(pl,.9),.95,hv(pl,1.15),'#55534a','none',0);pl.rect(.05,hv(pl,.9),.4,hv(pl,1.15),G2,'none',0);
  }else if(kind==='apps'){
    for(let r=0;r<4;r++)for(let c=0;c<3;c++)pl.rect(.08+c*.31,.08+r*.22,.3+c*.31-.04,.26+r*.22,(r+c)%5===0?G2:'#e9e5d3',LN,.5);
  }
}
const ASSETS={
  laptop(sc,o){
    const W=14,D=9.5; stage(sc,W,D,1.6);
    const shell=new Plane(sc,[0,.4,.55],[W,0,0],[0,-2.2,8.2]);
    const P=(u,v)=>shell.at(u,v);
    sc.poly([P(0,0),P(1,0),P(1,1),P(0,1)],'url(#'+sc.id+'left)',LN,1.5);
    const bez=new Plane(sc,P(.018,.03),[W*.964,0,0],[0,-2.2*.94,8.2*.94]); bez.rect(0,0,1,1,'#2d2c26',LN,.8);
    const scr=new Plane(sc,bez.at(.03,.035),[...bez.A].map(x=>x*.94),[...bez.B].map(x=>x*.93)); ui(scr,o.screen||'browser',o.text);
    const b=sc.box(0,0,0,W,D,.55);
    const t=b.top; // keyboard
    t.rect(.03,.04,.97,.93,'#f1eddc',LN,.6);
    const rows=[14,14,14,13,10];
    rows.forEach((n,r)=>{const v0=.06+r*.1;for(let c=0;c<n;c++){const kw=(r===4?(c===4?.34:.055):.0615),u0=.05+(r===4?(c<4?c*.062:c===4?.31:.31+.34+(c-5)*.06):c*(.9/n));
      const kx=u0*W,ky=(v0)*D,w=(r===4&&c===4)?W*.34:W*.9/n*.82;
      sc.box(kx,ky,.55,Math.min(w,W*.9),D*.075,.14,{top:'#fffefa',left:'#eceac8'.replace('eceac8','efe9d3'),right:'#e0dcc4',sw:.7});}});
    t.rect(.32,.7,.68,.97,'#f6f2e2',LN,.7);
    b.right.rect(.06,.3,.16,.5,'#d9d4bf',LN,.5);b.right.rect(.22,.3,.32,.5,'#d9d4bf',LN,.5);
    b.left.rect(.78,.35,.9,.5,'#d9d4bf',LN,.4);
  },
  phone(sc,o){
    stage(sc,6,4,1.2);const b=sc.box(.5,1,0,5,.7,10.5,{sw:1.4});
    const f=b.left;f.rect(.05,.03,.95,.97,'#2d2c26',LN,.6);const s=new Plane(sc,f.at(.09,.06),[...f.A].map(x=>x*.82),[...f.B].map(x=>x*.88));ui(s,o.screen||'apps');
    f.dot(.5,.965,.1,'#55534a');
  },
  monitor(sc,o){
    const W=14;stage(sc,W,6,1.4);sc.box(W/2-2.5,1.5,0,5,3,.5);sc.box(W/2-.8,2.3,.5,1.6,1.2,3.3);
    const b=sc.box(0,2.2,3.8,W,.9,9,{sw:1.4});const f=b.left;f.rect(.025,.03,.975,.97,'#2d2c26',LN,.6);
    const s=new Plane(sc,f.at(.04,.06),[...f.A].map(x=>x*.92),[...f.B].map(x=>x*.88));ui(s,o.screen||'dashboard');
  },
  browser(sc,o){
    const W=15,H=10.5;stage(sc,W,3.5,1.2);const b=sc.box(0,1.2,0,W,.8,H,{sw:1.4});const f=b.left;
    ui(new Plane(sc,f.at(.015,.015),[...f.A].map(x=>x*.97),[...f.B].map(x=>x*.97)),o.screen||'browser',o.text);
    if(o.layout){const p=new Plane(sc,f.at(.04,.05),[...f.A].map(x=>x*.92),[...f.B].map(x=>x*.65));
      const d=(u0,v0,u1,v1)=>p.rect(u0,v0,u1,v1,'none',G,1.3,'stroke-dasharray="4 3"');d(0,.86,1,1);d(0,.7,1,.82);d(0,.3,1,.66);d(0,.05,.48,.26);d(.52,.05,1,.26);}
  },
  document(sc,o){
    const W=7.5,H=9.5;stage(sc,W,2.5,1.0);sc.box(-.3,.4,0,W+.6,1.6,.5,{sw:1});
    const b=sc.box(0,.9,.5,W,.5,H,{sw:1.4});const f=b.left;
    f.poly([[.78,1],[1,.8],[1,1]],'#e9e4cf',LN,1);f.poly([[.78,1],[.78,.8],[1,.8]],'#fffefa',LN,1);
    f.rect(.1,.9,.5,.935,'#d9d4bf','none',0);f.rect(.55,.9,.68,.935,'#d9d4bf','none',0);
    if(o.lines&&o.lines.length){o.lines.forEach((t,i)=>f.text(.1,.78-i*.085,t,.42,{weight:i===0?700:500}))}
    else for(let i=0;i<9;i++)f.rect(.1,.76-i*.075,.1+[.7,.5,.78,.6,.4,.72,.55,.66,.3][i]*.8,.76-i*.075+.022,i%4===1?G2:'#d9d4bf','none',0);
  },
  stack(sc,o){
    const n=o.n||9,W=9,D=6.5;stage(sc,W+3,D+2,1.6);
    for(let i=0;i<n;i++){const j=(i*37%5)/10-.2;const b=sc.box(j,j*.8,i*.72,W,D,.68,{sw:1.1});
      const l=b.left;l.rect(.04,.35,.95,.4,'#d6d1bb','none',0);
      if(i===n-1){const t=b.top;for(let k=0;k<7;k++)t.rect(.1,.12+k*.11,.1+[.8,.6,.7,.5,.75,.4,.6][k]*.7,.12+k*.11+.04,k===0?G:'#d6d1bb','none',0)}}
  },
  chip(sc,o){
    const W=17,D=12;stage(sc,W,D,1.6);const b=sc.box(0,0,0,W,D,.6,{sw:1.4});const t=b.top;
    t.rect(.04,.05,.96,.95,'#efe9d3',LN,.8);
    [[.12,.2],[.12,.75],[.85,.22],[.84,.78],[.28,.1],[.62,.88]].forEach(([u,v],i)=>{const c=sc.box(u*W-.7,v*D-.5,.6,1.5,1,.35,{sw:.9});c.top.rect(.1,.1,.9,.9,i%2?G3:'#fffefa','none',0)});
    for(let i=0;i<3;i++){t.line(.06,.3+i*.05,.34,.3+i*.05,LN,.7);t.line(.66,.3+i*.05,.94,.3+i*.05,LN,.7)}
    const c=sc.box(5.2,3.4,.6,6.6,5.2,.9,{top:'#e4f4cb',sw:1.4});const ct=c.top;
    ct.rect(.12,.14,.88,.86,'#cdea9f',LN,.8);for(let i=1;i<9;i++){ct.line(.12,.14+i*.08,.88,.14+i*.08,'#8fbf55',.7)}ct.rect(.34,.38,.66,.62,'#f3f9e6',LN,.8);
    for(let i=0;i<16;i++){b.left.dot(.08+i*.056,.28,.12,'#fffefa',LN,.6)}
  },
  server(sc,o){
    const W=9,D=8,H=12.5;stage(sc,W,D,1.5);const b=sc.box(0,0,0,W,D,H,{sw:1.4});const f=b.left;
    for(let i=0;i<5;i++){const v=.05+i*.18;f.rect(.07,v,.93,v+.14,'#f4f0df',LN,.8);f.rect(.12,v+.04,.3,v+.1,'#e4dfc9','none',0);f.dot(.78,v+.07,.18,i===1||i===3?G:'#c9c4ae',LN,.5);
      for(let k=0;k<5;k++)f.line(.4+k*.05,v+.04,.4+k*.05,v+.1,LN,.7)}
    for(let i=0;i<7;i++)b.top.line(.1,.1+i*.12,.9,.1+i*.12,LN,.8);
    for(let i=0;i<6;i++)b.right.rect(.1+i*.14,.15,.18+i*.14,.85,'#dcd7c1',LN,.5);
  },
  machine(sc,o){
    stage(sc,24,9,1.6); // conveyor
    sc.box(-1.2,2.6,0,8,4,1.1,{top:'#4a4941',sw:1.2});for(let i=0;i<8;i++)sc.box(-.8+i,2.8,1.1,.15,3.6,.05,{top:'#6a695f',sw:.4});
    const L=sc.box(6,1,0,4.5,7,5.5,{sw:1.3});L.left.rect(.2,.2,.8,.6,'#e9e5d3',LN,.6);
    const m=sc.box(9.5,.5,0,10,8,8,{sw:1.5}),f=m.left;
    for(let i=0;i<4;i++){const u=.1+i*.2;f.rect(u,.45,u+.15,.9,i===3?G3:'#f4f0df',LN,.9);f.rect(u+.025,.5,u+.125,.55,'#d9d4bf','none',0);f.line(u+.075,.62,u+.075,.8,i===3?G:LN,1.2);f.dot(u+.075,.94,.14,i===3?G:'#c9c4ae',LN,.5)}
    for(let i=0;i<6;i++)f.line(.12,.08+i*.045,.88,.08+i*.045,LN,.9);
    m.right.rect(.2,.12,.8,.48,'#2d2c26',LN,.8);for(let i=0;i<5;i++)m.right.line(.15,.55+i*.07,.85,.55+i*.07,LN,.7);
    const tp=sc.box(10.6,1.3,8,5,4.5,.9,{sw:1.2});tp.top.rect(.1,.3,.5,.7,'#e4dfc9',LN,.7);
    for(let r=1;r<4;r++)tp.top.line(.62,.5,.62+r*.0,.5,LN,.1);tp.top.dot(.78,.5,.55,'#e4dfc9',LN,.8);tp.top.dot(.78,.5,.3,'#d4cfb7',LN,.7);
    const o2=sc.box(19.8,2,0,3.6,5,1.5,{sw:1.2});o2.top.rect(.15,.15,.85,.85,'#e9e5d3',LN,.5);
  },
  database(sc,o){
    stage(sc,10,10,1.6);for(let i=0;i<3;i++){const t=sc.cyl(5,5,i*3.4,4.4,3.2);}
    for(let i=0;i<3;i++){const z=i*3.4+1.6;for(let k=0;k<3;k++){const a=Math.PI*(.15+k*.16);const x=5+Math.cos(a+.55)*4.4,y=5+Math.sin(a+.55)*4.4;sc.p(x,y,z)}}
  },
  router(sc,o){
    stage(sc,13,8,1.4);[[1.2,1.2],[10.8,1.2]].forEach(([x,y])=>{sc.box(x,y,1.6,.8,.8,7,{sw:1.1});sc.box(x-.15,y-.15,8.4,1.1,1.1,.5,{sw:1})});
    const b=sc.box(0,0,0,13,8,1.7,{sw:1.4});for(let i=0;i<5;i++)b.left.dot(.12+i*.1,.5,.2,i<2?G:'#c9c4ae',LN,.5);
    for(let i=0;i<4;i++)b.left.rect(.62+i*.085,.25,.62+i*.085+.06,.7,'#9a957f',LN,.4);b.top.rect(.2,.3,.8,.7,'#f1eddc',LN,.7);for(let i=0;i<5;i++)b.top.line(.25,.38+i*.06,.75,.38+i*.06,LN,.7);
  },
  satellite(sc,o){
    const wing=(x)=>{const w=sc.box(x,.35,2.5,8,4.3,.28,{top:'#e4f4cb',sw:1.3});const t=w.top;for(let i=1;i<8;i++)t.line(i/8,0,i/8,1,'#8fbf55',.8);for(let j=1;j<3;j++)t.line(0,j/3,1,j/3,'#8fbf55',.8);t.rect(0,0,1,1,'none',LN,.9)};
    wing(-10.5); sc.box(-2.5,2.2,2.6,2.6,.6,.3,{sw:1});
    const b=sc.box(0,0,0,5,5,6,{sw:1.5});b.left.rect(.1,.08,.9,.3,'#d9d4bf',LN,.7);b.left.dot(.5,.62,1.0,'#fffefa',LN,1);b.left.dot(.5,.62,.5,G2,LN,.8);b.right.rect(.15,.2,.85,.8,'#e0dcc4',LN,.5);for(let i=0;i<4;i++)b.right.line(.2,.3+i*.15,.8,.3+i*.15,LN,.6);
    sc.box(2.2,2.2,6,.6,.6,2,{sw:1});sc.cyl(2.5,2.5,8,1.9,.45,{top:'#fffefa'});
    sc.box(5,2.2,2.6,2.6,.6,.3,{sw:1}); wing(7.5);
  },
  solar(sc,o){
    const W=13,D=8;stage(sc,W,D+1,1.4);[[1,6.5],[W-1.4,6.5]].forEach(([x,y])=>sc.box(x,y,0,.5,.5,1.8,{sw:1}));
    [[1,.8],[W-1.4,.8]].forEach(([x,y])=>sc.box(x,y,0,.5,.5,4.8,{sw:1}));
    const p=new Plane(sc,[0,.4,5.2],[W,0,0],[0,D,-3.6]);const q=u=>p.at(u,0);
    sc.poly([p.at(0,0),p.at(1,0),p.at(1,1),p.at(0,1)],'#dfe9d2',LN,1.5);p.rect(.025,.04,.975,.96,'#cfe0bd','#6f8a56',.8);
    for(let i=1;i<8;i++)p.line(.025+i*.119,.04,.025+i*.119,.96,'#7f9a63',.8);for(let j=1;j<5;j++)p.line(.025,.04+j*.184,.975,.04+j*.184,'#7f9a63',.8);
  },
  package(sc,o){
    stage(sc,9,9,1.4);const b=sc.box(0,0,0,9,9,7,{sw:1.4});b.top.rect(.44,0,.56,1,'#e4dfc9',LN,.6);b.left.rect(.44,0,.56,1,'#d9d4bf',LN,.6);b.right.rect(.2,.2,.8,.5,'#fffefa',LN,.6);b.left.rect(.12,.12,.34,.34,'#fffefa',LN,.6);
  },
};
export const ISO_NAMES=Object.keys(ASSETS);
export function asset(name,o={}){const sc=new Sc();(ASSETS[name]||ASSETS.package)(sc,o);return sc.svg()}
