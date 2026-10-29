// Tiny static server: `npm run dev` then open http://localhost:5173
import http from 'http'; import fs from 'fs'; import path from 'path';
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.mp3':'audio/mpeg','.wav':'audio/wav'};
export function serve(port=5173){return new Promise(r=>{const s=http.createServer((q,res)=>{
  let p=decodeURIComponent(q.url.split('?')[0]); if(p.endsWith('/'))p+='index.html';
  const f=path.join(process.cwd(),p); if(!f.startsWith(process.cwd())||!fs.existsSync(f)){res.writeHead(404);return res.end()}
  res.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res)}).listen(port,()=>r(s))})}
if(process.argv[1].endsWith('serve.mjs')){await serve();console.log('http://localhost:5173')}
