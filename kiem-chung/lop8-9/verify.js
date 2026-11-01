/* Kiểm chứng tự động câu hỏi lớp 8 và lớp 9.
   Chạy:  node kiem-chung/lop8-9/verify.js [số-lần-mỗi-dạng=300] [mã-chủ-đề-hoặc-tiền-tố ...]
   Mỗi dạng bài (gen('mã', …)) được chạy nhiều lần; kiểm tra:
   1) cấu trúc: đủ 4 đáp án khác nhau (hoặc câu nhập đáp án), đáp án đúng nằm trong các lựa chọn, không NaN/undefined,
      lời giải có ≥ 2 bước (hoặc ≥ 2 câu), nhiễu có lý do (nếu có) nằm trong đúng các lựa chọn;
   2) ĐÚNG SAI: so với oracle độc lập trong oracles8.js / oracles9.js (khóa = mã dạng bài). Oracle nhận (tham-số, câu-hỏi)
      và trả về chuỗi đáp án đúng (so sánh với q.a) hoặc true/false. Dạng chưa có oracle chỉ bị kiểm cấu trúc. */
const path=require('path'),L=require('./load.js')(path.join(__dirname,'..','..'));
const N=+process.argv[2]||300,pref=process.argv.slice(3);
const {T,ctx}=L;
let oracles={};
for(const f of ['oracles8.js','oracles9.js']){try{Object.assign(oracles,require('./'+f)(L))}catch(e){if(e.code!='MODULE_NOT_FOUND')throw e}}
const strip=s=>String(s).replace(/<[^>]+>/g,''),nrm=s=>strip(s).replace(/−/g,'-').replace(/\s/g,'');
const mut={};let gens=0,fail=0,noOracle=[],seenKeys=new Set(),checked=0;
const bad=(k,msg,q)=>{fail++;if(fail<=40)console.log('✗',k,msg,q?('\n   '+strip(q.q).slice(0,160)+'\n   đáp án: '+strip(q.a)+(q.w?'  | nhiễu: '+q.w.map(strip).join(' ; '):'')):'')};
for(const t of T){
  if(t.gr<8)continue;
  if(pref.length&&!pref.some(p=>t.id.startsWith(p)))continue;
  for(const [lv,pool] of [['g',t.g],['h',t.h]]){
    pool.forEach((fn,idx)=>{gens++;let key=null;
      for(let i=0;i<N;i++){
        let q;try{q=fn()}catch(e){bad(t.id+'/'+lv+idx,'ném lỗi '+e.message);break}
        key=q.k||('?'+t.id+lv+idx);
        if(q.k=='fallback'){bad(key,'rơi vào fallback (gen thất bại 14 lần)');break}
        const all=[q.a,...(q.w||[])].map(String);
        if(!q.q||/NaN|undefined|Infinity|null/.test(q.q+all.join('|')+q.e)){bad(key,'có NaN/undefined',q);break}
        if(q.inp){if(String(q.a)===''||q.w.length){bad(key,'câu nhập sai cấu trúc',q);break}}
        else{if(all.length!=4||new Set(all).size!=4){bad(key,'không đủ 4 đáp án khác nhau',q);break}
          if(q.x)for(const k2 in q.x)if(!q.w.includes(k2)||k2==q.a){bad(key,'lý do gắn sai đáp án',q);break}}
        const steps=(q.e.match(/Bước \d/g)||[]).length;if(steps<2&&q.e.split('\n').length<2){bad(key,'lời giải quá ngắn (<2 bước)',q);break}
        if(oracles[key]){checked++;let r;try{r=oracles[key](q.p,q)}catch(e){bad(key,'oracle ném lỗi '+e.message,q);break}
          if(r===false||(typeof r=='string'&&nrm(r)!==nrm(q.a))){bad(key,'SAI ĐÁP ÁN, oracle='+(typeof r=='string'?strip(r):r),q);break}
          /* thử ngược: đưa một đáp án nhiễu vào oracle, oracle PHẢI nói sai (trừ khi nhiễu tương đương đáp án đúng) */
          if(process.env.MUTATE&&q.w&&q.w.length){const w=q.w[i%q.w.length];let r2;try{r2=oracles[key](q.p,{...q,a:w})}catch(e){r2=false}
            const pass=r2===true||(typeof r2=='string'&&nrm(r2)===nrm(w));if(pass){mut[key]=(mut[key]||0)+1}}}
      }
      if(key&&!key.startsWith('?')){seenKeys.add(key);if(!oracles[key])noOracle.push(key)}
      else if(key)noOracle.push(key);
    })}}
console.log(`\nDạng bài đã chạy: ${gens} × ${N} lần · có oracle: ${gens-noOracle.length} · KHÔNG đúng: ${fail}`);
if(noOracle.length)console.log('Chưa có oracle ('+noOracle.length+'): '+noOracle.join(' '));
if(process.env.MUTATE){const m=Object.entries(mut);console.log('Oracle bị lọt (nhiễu được oracle chấp nhận): '+(m.length?m.map(([k,v])=>k+'×'+v).join(' '):'không có'))}
process.exit(fail?1:0);
