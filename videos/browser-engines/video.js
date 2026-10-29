// A VIDEO = a list of scenes. Each scene: what is SAID (karaoke caption) + ITEMS that animate in.
// Coordinates are pixels on a 576x1024 canvas. (288,400) is roughly the centre of the picture area.
const dot=(c,l='')=>`<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="${c}"/><circle cx="20" cy="20" r="7" fill="#fff"/>${l}</svg>`;
const ICON={chromium:dot('#2f7be5'),edge:dot('#18a5a5'),opera:dot('#e0343c'),brave:dot('#f26a2e'),samsung:dot('#6a5ae0'),
  safari:dot('#3aa0f0'),firefox:dot('#f0782b'),google:`<svg viewBox="0 0 40 40"><text x="20" y="29" font-size="30" font-weight="800" text-anchor="middle" fill="#4285f4" font-family="Inter">G</text></svg>`};
const spokes=[['edge',-150,110],['opera',-80,150],['brave',0,160],['samsung',80,150],['chrome2',150,110]];
const hub=(s)=>[ // reusable: returns items for the Chromium hub with 5 spokes
  {id:'hub',type:'card',html:ICON.chromium,size:104,x:288,y:300,at:0.1,float:3,keep:s},
  ...['edge','opera','brave','samsung'].map((k,i)=>[{id:k,type:'card',html:ICON[k],size:60,x:[150,225,351,426][i],y:[420,470,470,420][i],at:0.4+i*.12,keep:s},
     {type:'line',from:'hub',toId:k,at:0.5+i*.12,enter:'draw',keep:s}]).flat()];

export default {
  width:576,height:1024,fps:30,
  scenes:[
    { say:"Want to build a new web browser?", min:2.2,
      items:[{id:'q',type:'text',text:'?',size:220,x:288,y:360,color:'var(--accent)',at:0.2,enter:'pop'},
             {type:'label',text:'Browser',sub:'the app you are using right now',x:288,y:540,at:0.8,enter:'rise'}]},
    { say:"Chrome, Edge, Opera, Brave and Samsung Internet", min:3.2, items:[...hub(true),
      {type:'label',text:'Chromium',sub:'open source, from Google',x:288,y:190,at:0.2,enter:'rise',keep:true},
      {type:'line',from:'hub',toId:'hub',x1:288,y1:210,x2:288,y2:250,enter:'draw'}]},
    { clear:true, say:"Only Safari and Firefox use a different engine, the part that draws the page.", min:4,
      items:[{id:'saf',type:'card',html:ICON.safari,size:70,x:150,y:700,at:.2},
             {id:'ff',type:'card',html:ICON.firefox,size:70,x:426,y:700,at:.5},
             {type:'pill',text:'WebKit',x:150,y:760,at:.9,enter:'rise'},{type:'pill',text:'Gecko',x:426,y:760,at:1.2,enter:'rise'}]},
    { clear:true, say:"About half a billion dollars a year, from Google.", min:3.4,
      items:[{id:'g',type:'card',html:ICON.google,size:80,x:140,y:360,at:.1},
             {id:'ff2',type:'card',html:ICON.firefox,size:90,x:430,y:520,at:.2},
             {type:'label',text:'≈ $500M',sub:'a year, from Google',x:430,y:420,at:.7,enter:'rise'},
             {id:'coin',type:'card',html:'$',size:34,x:140,y:420,at:.9,
              to:[{at:0,dur:0,x:140,y:420},{at:.2,dur:2.2,x:395,y:520,ease:'inOut'}]}]},
    { clear:true, say:"All of that is thirty five million lines of code.", min:3.6, camera:{from:{x:288,y:512,z:1},to:{x:288,y:470,z:1.25}},
      items:[...[0,1,2,3,4,5,6,7].map(i=>({type:'box3d',w:150,d:150,h:14,x:200,y:540-i*16,at:.2+i*.1,enter:'rise'})),
             ...[0,1,2,3,4].map(i=>({type:'box3d',w:150,d:150,h:14,x:360,y:570-i*16,at:.5+i*.1,enter:'rise'})),
             {type:'label',text:'35,000,000+',sub:'lines of code',x:200,y:260,at:1.4,enter:'pop'}]},
    { clear:true, say:"Follow Geek Explained for more.", min:2.6,
      items:[{type:'card',html:'<svg viewBox="0 0 40 40"><path d="M20 4 36 34H4z" fill="#2a8a00"/></svg>',size:110,x:288,y:380,at:.1},
             {type:'text',text:'Follow',size:38,x:288,y:500,at:.5,enter:'rise'},
             {type:'pill',text:'+ Follow',x:288,y:580,at:.9,enter:'pop',style:{background:'var(--accent)',color:'#fff'}}]},
  ]
};
