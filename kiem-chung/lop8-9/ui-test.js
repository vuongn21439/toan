/* Kiểm thử tích hợp giao diện bằng jsdom: nạp index.html (script nhúng trực tiếp), rồi chơi thử mọi chủ đề lớp 8, 9.
   Cài một lần:  cd /tmp && mkdir jt && cd jt && npm i jsdom   ·   Chạy:  node kiem-chung/lop8-9/ui-test.js [/đường/dẫn/tới/jsdom] */
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
(async()=>{
  await wait(300);
  const T=ev('T'),GRADES=ev('GRADES');
  const GL=(process.env.GRADES||'8,9').split(',').map(Number);
  for(const g of GL){
    w.setGr(g);
    const body=w.document.body.dataset.gr,ts=ev('gT()');
    if(body!=String(g))errs.push('data-gr sai khi chọn lớp '+g);
    if(ts.length!==GRADES[g].groups.flatMap(x=>x[1]).length)errs.push('gT() lớp '+g+' sai số chủ đề');
    let seen=0;
    GRADES[g].groups.forEach((grp,gi)=>{ev(`GI=${gi}`);w.home('learn');const t0=txt();grp[1].forEach(id=>{const t=ts.find(x=>x.id==id);if(!t)errs.push('thiếu chủ đề '+id);else if(t0.includes(t.n))seen++;else errs.push('trang chủ lớp '+g+' (nhóm '+grp[0]+') thiếu chủ đề '+t.n)})});
    if(seen!==ts.length)errs.push('lớp '+g+': chỉ thấy '+seen+'/'+ts.length+' chủ đề trên trang chủ');
    for(const t of ts){
      try{w.intro(t.id);if(!txt().includes(t.n))errs.push('intro thiếu tên '+t.id);
        ev(`D.b['${t.id}']=2`); /* mở khóa phần nâng cao */
        for(let r=0;r<3;r++){playRound(t.id,'b','mix');playRound(t.id,'h','mix')}
      }catch(e){errs.push(`lỗi chơi ${t.id}: ${e.message}`)}
    }
    for(const ex of ['ex1','ex2','ex3','all']){ /* thi thử */
      try{GO(ex,'b');let S=ev('S');for(let i=0;i<S.q.length;i++){S=ev('S');const q=S.q[S.i];if(q.inp){const inp=w.document.getElementById('in');inp.value=String(q.a).replace(/^-/,'−').replace(/\.(\d)/,',$1');w.saveInp(inp.value)}else w.pickExam(S.o.indexOf(q.a));if(i<S.q.length-1)w.examNext()}
        w.submitExam();const res=w.document.getElementById('app').innerHTML;if(!res.includes('class="res"')&&!res.includes('res'))errs.push('không có màn kết quả '+ex);
        if(ev('S.ok')!==ev('S.q.length'))errs.push(`thi thử ${ex} lớp ${g}: trả lời toàn đúng nhưng S.ok=${ev('S.ok')}/${ev('S.q.length')}`)}catch(e){errs.push(`lỗi thi thử ${ex} lớp ${g}: ${e.message}`)}
    }
    try{ev("D[dcK()]=null");GO('daily','b');const S=ev('S');if(S.q.length!==5)errs.push('thử thách ngày lớp '+g+' không đủ 5 câu');const n1=S.q.map(q=>q.q).join('|');w.submitExam();GO('daily','b');}catch(e){errs.push('lỗi thử thách ngày lớp '+g+': '+e.message)}
    /* đề ngày phải cố định trong cùng một ngày và khác giữa các lớp */
    const d1=ev('dailyQs()').map(q=>q.q).join('|'),d2=ev('dailyQs()').map(q=>q.q).join('|');if(d1!==d2)errs.push('đề ngày lớp '+g+' không cố định trong ngày');
    ev(`D.dcKey_${g}=dailyQs().map(q=>q.q).join('|')`);
  }
  if(GL.length>1)for(let i=0;i<GL.length;i++)for(let j=i+1;j<GL.length;j++)if(ev(`D.dcKey_${GL[i]}`)===ev(`D.dcKey_${GL[j]}`))errs.push(`đề ngày lớp ${GL[i]} và lớp ${GL[j]} trùng nhau`);
  /* màn chọn lớp và lưu/khôi phục */
  try{w.pickGrade();const h=w.document.getElementById('app').innerHTML;for(const g of [6,7,8,9])if(!h.includes('Lớp '+g))errs.push('màn chọn lớp thiếu Lớp '+g)}catch(e){errs.push('lỗi pickGrade: '+e.message)}
  ev("D.gr=9;save()");const ls=JSON.parse(w.localStorage.getItem(Object.keys(w.localStorage).find(k=>/t6|toan|thcs/i.test(k))||'x')||'{}');
  console.log(`Đã chơi ${plays} lượt (mỗi lượt 10 câu), ${qn} câu · ${figs} câu có hình · ${inps} câu nhập đáp án · ${wrongShown} lần hiện "Vì sao em chọn chưa đúng"`);
  console.log('Lớp lưu trong localStorage:',ls.gr);
  if(errs.length){console.log('LỖI ('+errs.length+'):');errs.slice(0,25).forEach(e=>console.log(' -',e));process.exit(1)}
  console.log('✓ Không có lỗi chạy nào.');process.exit(0)})();
