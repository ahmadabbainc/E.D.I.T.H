// Isometric illustration engine. Pure code -> SVG strings. Same visual language as the reference:
// matte cream forms, soft face shading, thin warm-grey outlines, tiny real details, sparse green accents.
// Coordinates: x runs right-and-down, y runs left-and-down, z is up. Nearest corner = max x, max y.
const U=18, C=Math.cos(Math.PI/6), S=0.5;
export const COL={line:'#8d8772',ink:'#26251f',green:'#2f8f12',green2:'#b9e27c',green3:'#e4f4cb',paper:'#fffefa',dim:'#b9b49e',screen:'#fbfaf2'};
const vec=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]], mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];
const FACE={top:['#fffefb','#f4f0df'],left:['#f6f2e3','#e9e4cf'],right:['#e9e4cf','#d8d2ba']};
let uidn=0;
export class Sc{
  constructor(){this.o=[];this.defs=[];this.b=[1e9,1e9,-1e9,-1e9];this.id='i'+(++uidn)+'_';this.k=0;
    for(const [n,[a,b]] of Object.entries(FACE))this.defs.push(`<linearGradient id="${this.id}${n}" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`);
    this.defs.push(`<filter id="${this.id}blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>`);}
  p(x,y,z){const X=(x-y)*C*U,Y=(x+y)*S*U-z*U;const b=this.b;b[0]=Math.min(b[0],X);b[1]=Math.min(b[1],Y);b[2]=Math.max(b[2],X);b[3]=Math.max(b[3],Y);return[X,Y]}
  pts(q){return q.map(v=>this.p(...v).map(n=>n.toFixed(1)).join(',')).join(' ')}
  poly(q,fill,stroke=COL.line,sw=1.3,extra=''){this.o.push(`<polygon points="${this.pts(q)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`)}
  path(q,stroke=COL.line,sw=1.2,extra=''){this.o.push(`<polyline points="${this.pts(q)}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`)}
  shadow(x,y,w,d,grow=1.2,op=0.11){this.o.push(`<polygon points="${this.pts([[x-grow+.5,y-grow+.5,0],[x+w+grow+.9,y-grow+.5,0],[x+w+grow+.9,y+d+grow+.9,0],[x-grow+.5,y+d+grow+.9,0]])}" fill="rgba(70,58,25,${op})" filter="url(#${this.id}blur)"/>`)}
  // box with three visible faces; returns planes for detail drawing
  box(x,y,z,w,d,h,o={}){
    const g=n=>o[n]||`url(#${this.id}${n})`, sw=o.sw??1.3;
    const left=[[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]], right=[[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]], top=[[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]];
    this.poly(left,g('left'),COL.line,sw); this.poly(right,g('right'),COL.line,sw); this.poly(top,g('top'),COL.line,sw);
    if(h>0.25){this.path([[x+.12,y+d-.02,z+h],[x+w-.02,y+d-.02,z+h]],'#fff',1.1,'opacity=".9"');}
    return {top:new Plane(this,[x,y,z+h],[w,0,0],[0,d,0]),left:new Plane(this,[x,y+d,z],[w,0,0],[0,0,h]),right:new Plane(this,[x+w,y,z],[0,d,0],[0,0,h]),x,y,z,w,d,h};
  }
  // vertical cylinder (iso ellipses). cx,cy = centre on ground
  cyl(cx,cy,z,r,h,o={}){
    const n=40,arc=(zz)=>Array.from({length:n+1},(_,k)=>{const a=-Math.PI/4+k/n*Math.PI;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r,zz]});
    const lo=arc(z),hi=arc(z+h);
    this.o.push(`<polygon points="${this.pts([...lo,...hi.slice().reverse()])}" fill="url(#${this.id}left)" stroke="${COL.line}" stroke-width="1.3" stroke-linejoin="round"/>`);
    // soft shading band on the right half of the body
    const mid=Math.round(n*.55); this.o.push(`<polygon points="${this.pts([...lo.slice(mid),...hi.slice(mid).reverse()])}" fill="rgba(120,105,60,.13)" stroke="none"/>`);
    const full=Array.from({length:n},(_,k)=>{const a=k/n*Math.PI*2;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r,z+h]});
    this.poly(full,o.top||`url(#${this.id}top)`,COL.line,1.3);
    return new Plane(this,[cx-r,cy-r,z+h],[2*r,0,0],[0,2*r,0]);
  }
  text(pl,u,v,str,size,o={}){const O=vec(vec(pl.O,mul(pl.A,u)),mul(pl.B,v)),Ah=norm(pl.A),Bh=norm(pl.B);
    const pa=pr(Ah),pb=pr(Bh),[ox,oy]=this.p(...O);
    this.o.push(`<text transform="matrix(${(pa[0]/U).toFixed(4)} ${(pa[1]/U).toFixed(4)} ${(-pb[0]/U).toFixed(4)} ${(-pb[1]/U).toFixed(4)} ${ox.toFixed(1)} ${oy.toFixed(1)})" font-family="${o.font||'ui-monospace,Menlo,Consolas,monospace'}" font-size="${(size*U).toFixed(1)}" font-weight="${o.weight||600}" fill="${o.fill||COL.ink}" text-anchor="${o.anchor||'start'}">${str.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</text>`)}
  svg(pad=14){const [a,b,c,d]=this.b;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${(a-pad).toFixed(1)} ${(b-pad).toFixed(1)} ${(c-a+pad*2).toFixed(1)} ${(d-b+pad*2).toFixed(1)}" overflow="visible"><defs>${this.defs.join('')}</defs>${this.o.join('')}</svg>`}
}
const norm=a=>{const l=Math.hypot(...a)||1;return[a[0]/l,a[1]/l,a[2]/l]}, pr=a=>[(a[0]-a[1])*C*U,(a[0]+a[1])*S*U-a[2]*U];
export class Plane{
  constructor(sc,O,A,B){this.sc=sc;this.O=O;this.A=A;this.B=B}
  at(u,v){return vec(vec(this.O,mul(this.A,u)),mul(this.B,v))}
  rect(u0,v0,u1,v1,fill,stroke=COL.line,sw=1,extra=''){this.sc.poly([this.at(u0,v0),this.at(u1,v0),this.at(u1,v1),this.at(u0,v1)],fill,stroke,sw,extra)}
  line(u0,v0,u1,v1,stroke=COL.line,sw=1,extra=''){this.sc.path([this.at(u0,v0),this.at(u1,v1)],stroke,sw,extra)}
  poly(pts,fill,stroke=COL.line,sw=1){this.sc.poly(pts.map(([u,v])=>this.at(u,v)),fill,stroke,sw)}
  dot(u,v,r,fill,stroke='none',sw=0){const n=14,w=Math.hypot(...this.A),h=Math.hypot(...this.B),rr=r;this.sc.poly(Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2;return this.at(u+Math.cos(a)*rr/w,v+Math.sin(a)*rr/h)}),fill,stroke,sw)}
  text(u,v,s,size,o){this.sc.text(this,u,v,s,size,o)}
}
