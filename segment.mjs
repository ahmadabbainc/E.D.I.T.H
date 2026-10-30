// Split ONE long narration clip into per-sentence scenes by finding the pauses between sentences.
// pcm: Int16Array mono at `rate`; texts: the spoken sentences in order. Returns scene boundaries in seconds.
export function segment(pcm,rate,texts){
  const fr=Math.round(rate*0.01), n=Math.floor(pcm.length/fr), rms=new Float64Array(n);
  for(let i=0;i<n;i++){let s=0;for(let j=0;j<fr;j++){const v=pcm[i*fr+j]/32768;s+=v*v}rms[i]=Math.sqrt(s/fr)}
  const sorted=[...rms].sort((a,b)=>a-b), loud=sorted[Math.floor(n*0.9)]||1e-3, thr=Math.max(loud*0.07,1e-4);
  const sil=[]; let st=-1;
  for(let i=0;i<=n;i++){const q=i<n&&rms[i]<thr; if(q&&st<0)st=i; if(!q&&st>=0){if(i-st>=10)sil.push({a:st*0.01,b:i*0.01,d:(i-st)*0.01});st=-1}}
  const total=n*0.01, first=rms.findIndex(v=>v>=thr)*0.01, last=(n-1-[...rms].reverse().findIndex(v=>v>=thr))*0.01+0.01;
  const span=Math.max(0.5,last-first), chars=texts.map(t=>t.length+4), sum=chars.reduce((a,b)=>a+b,0);
  const bounds=[0]; let cum=0, prev=0;
  for(let k=0;k<texts.length-1;k++){
    cum+=chars[k]; const exp=first+span*cum/sum, win=Math.max(0.9,span/texts.length*0.38);
    let best=null,score=-1e9;
    for(const s of sil){const mid=(s.a+s.b)/2; if(Math.abs(mid-exp)>win||mid<prev+0.8)continue; const sc=s.d-0.6*Math.abs(mid-exp); if(sc>score){score=sc;best=mid}}
    let b=best??exp; if(b<prev+0.8)b=prev+0.8; bounds.push(b); prev=b;
  }
  bounds.push(total); return bounds;
}
