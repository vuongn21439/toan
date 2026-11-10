/* Kiểm thử giao diện CHỈ cho các dạng câu mới (v16, lớp 9 học kì II: hs3/pb2/lp/tk3/xs3/tg/nt/kg3): chơi nhiều lượt đúng/sai và soi chữ hiển thị (còn ^, phân số a/b chưa dựng, undefined, NaN…).
   Cài một lần:  cd /tmp && mkdir jt && cd jt && npm i jsdom   ·   Chạy:  node kiem-chung/lop8-9/ui-test-moi9b.js [/đường/dẫn/tới/jsdom] */
const fs=require('fs'),path=require('path'),root=path.join(__dirname,'..','..');
const {JSDOM,VirtualConsole}=require(process.argv[2]||'/tmp/jt/node_modules/jsdom');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace(/<script type="module"[^>]*><\/script>/g,'').replace(/<link[^>]*>/g,'');
html=html.replace(/<script src="([^"]+)"><\/script>/g,(m,s)=>'<script>'+fs.readFileSync(path.join(root,s),'utf8').replace(/<\/script>/g,'<\\/script>')+'\n//# sourceURL='+s+'\n</script>');
const errs=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push('jsdomError: '+(e.detail&&e.detail.stack||e.message).split('\n').slice(0,3).join(' | ')));
const dom=new JSDOM(html,{runScripts:'dangerously',url:'http://localhost/',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  const ctx=new Proxy({},{get:(t,k)=>k=='canvas'?{}:()=>({addColorStop(){}}),set:()=>true});w.HTMLCanvasElement.prototype.getContext=()=>ctx;
  const mk=()=>new Proxy(function(){},{get:(t,k)=>k=='currentTime'?0:k=='state'?'running':k=='sampleRate'?44100:k=='value'?0:k==Symbol.toPrimitive?()=>0:k=='then'?undefined:mk(),apply:()=>mk(),construct:()=>mk(),set:()=>true});
  w.AudioContext=w.webkitAudioContext=function(){return mk()};
  w.scrollTo=()=>{};w.navigator.vibrate=()=>true;w.matchMedia=w.matchMedia||(()=>({matches:false,addEventListener(){},addListener(){}}));
  w.addEventListener('error',e=>errs.push('window.error: '+e.message))}});
const w=dom.window,ev=s=>w.eval(s),GO=(id,l)=>ev(`go(${JSON.stringify(id)},${JSON.stringify(l)})`),txt=()=>w.document.getElementById('app').textContent;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let plays=0,qn=0,wrongShown=0,figs=0,inps=0;
function playRound(id,lvl,mode){ /* mode: 'good' trả lời đúng, 'bad' trả lời sai, 'mix' */
  GO(id,lvl);let S=ev('S');
  for(let i=0;i<S.q.length;i++){
    S=ev('S');const q=S.q[S.i];qn++;if(q.f)figs++;
    const html=w.document.getElementById('app').innerHTML;if(!html.includes('class="q"'))throw new Error('không dựng câu hỏi: '+id);
    const right=mode=='good'||(mode=='mix'&&Math.random()<.5);
    const okBefore=ev('S.ok');
    if(q.inp){inps++;const inp=w.document.getElementById('in');inp.value=right?String(q.a).replace(/^-/,'−').replace(/\./,','):'999.5';w.sub()}
    else{const k=right?S.o.indexOf(q.a):S.o.findIndex(v=>v!==q.a);w.pick(k)}
    if(right&&ev('S.ok')!==okBefore+1)throw new Error('đáp án ĐÚNG bị chấm sai: '+id+' | '+q.q.slice(0,80)+' | a='+q.a);
    if(!right&&ev('S.ok')!==okBefore)throw new Error('đáp án SAI bị chấm đúng: '+id+' | '+q.q.slice(0,80));
    const fb=w.document.getElementById('fb').innerHTML;if(ev('D.gr')>=8?!fb.includes('Bước 1'):fb.replace(/<[^>]+>/g,'').trim().length<10)throw new Error('thiếu lời giải: '+id+' | '+q.q.slice(0,60));
    if(!right&&fb.includes('Vì sao'))wrongShown++;
    if(i<S.q.length-1)w.next();else w.end();
  }plays++}

/* nhận ra dạng mới theo mã k */
const NEW=/^(hs3|pb2|lp|tk3|xs3|tg|nt|kg3)\./;
function badText(t){const r=[];if(/undefined|NaN|\[object|null/.test(t))r.push('có undefined/NaN/object');if(/\^/.test(t))r.push('còn ký tự ^ chưa dựng thành số mũ');if(/\d\/\d/.test(t))r.push('còn phân số a/b chưa dựng');if(/ {2,}/.test(t.replace(/\u00a0/g,' ')))r.push('thừa khoảng trắng');if(/--|\+\s*[−-]\s*\d|−\s*−/.test(t))r.push('hai dấu liền nhau');return r}
(async()=>{
  await wait(300);
  w.setGr(9);
  const ids=['l9hsb2','l9ptb2','l9tk','l9xs','l9dt2','l9kg'];let cnt={},keys=new Set(),probs=new Map();
  for(const id of ids){
    ev(`(()=>{const t=T.find(x=>x.id==${JSON.stringify(id)});const f=p=>p.filter(fn=>{try{return /^(hs3|pb2|lp|tk3|xs3|tg|nt|kg3)\\./.test(fn().k)}catch(e){return false}});t.g=f(t.g);t.h=f(t.h)})()`);
    ev(`D.b['${id}']=2`);
    const n=ev(`T.find(x=>x.id=='${id}').g.length+T.find(x=>x.id=='${id}').h.length`);cnt[id]=n;
    for(let r=0;r<14;r++)for(const lvl of ['b','h']){
      try{GO(id,lvl);let S=ev('S');
        for(let i=0;i<S.q.length;i++){S=ev('S');const q=S.q[S.i];qn++;keys.add(q.k);
          const app=w.document.getElementById('app');
          if(!NEW.test(q.k||''))throw new Error('lẫn câu cũ: '+q.k);
          const qEl=app.querySelector('.q');if(!qEl)throw new Error('không thấy vùng đề bài: '+q.k);const t1=qEl.textContent.replace(/\s+/g,' ');
          badText(t1).forEach(p=>probs.set(q.k+' · '+p,(probs.get(q.k+' · '+p)||0)+1));
          if(q.f){figs++;if(!app.querySelector('svg.fg'))throw new Error('thiếu hình: '+q.k)}
          const right=Math.random()<.5,okB=ev('S.ok');
          if(q.inp){inps++;const inp=w.document.getElementById('in');inp.value=right?String(q.a).replace(/^-/,'−').replace(/\./,','):'999.5';w.sub()}else{const k=right?S.o.indexOf(q.a):S.o.findIndex(v=>v!==q.a);w.pick(k)}
          if(right&&ev('S.ok')!==okB+1)throw new Error('đáp án đúng bị chấm sai: '+q.k+' | a='+q.a);
          if(!right&&ev('S.ok')!==okB)throw new Error('đáp án sai bị chấm đúng: '+q.k);
          const fbEl=w.document.getElementById('fb'),fb=fbEl.textContent.replace(/\s+/g,' ');
          if(!fb.includes('Bước 1')||!fb.includes('Kết luận'))throw new Error('lời giải thiếu bước/kết luận: '+q.k);
          if(fbEl.innerHTML.includes('Vì sao'))throw new Error('hiện mục "Vì sao chọn sai" ở dạng mới: '+q.k);
          badText(fb).forEach(p=>probs.set(q.k+' · lời giải · '+p,(probs.get(q.k+' · lời giải · '+p)||0)+1));
          if(!q.inp){const ops=[...app.querySelectorAll('button')].map(b=>b.textContent).join(' | ');badText(ops).forEach(p=>probs.set(q.k+' · đáp án · '+p,(probs.get(q.k+' · đáp án · '+p)||0)+1))}
          if(i<S.q.length-1)w.next();else w.end()}
        plays++}catch(e){errs.push(`lỗi ${id}/${lvl}: ${e.message}`)}
    }
  }
  console.log(`Dạng mới theo chủ đề:`,JSON.stringify(cnt),`· đã gặp ${keys.size} dạng khác nhau`);
  console.log(`Đã chơi ${plays} lượt, ${qn} câu · ${figs} câu có hình · ${inps} câu nhập đáp án`);
  if(probs.size){console.log('CẢNH BÁO hiển thị:');[...probs].slice(0,30).forEach(([k,v])=>console.log(' -',k,'×'+v))}
  if(errs.length){console.log('LỖI ('+errs.length+'):');errs.slice(0,25).forEach(e=>console.log(' -',e));process.exit(1)}
  console.log(probs.size?'⚠ Có cảnh báo hiển thị (xem trên).':'✓ Không có lỗi chạy và không có lỗi hiển thị.');process.exit(probs.size?2:0)})();
