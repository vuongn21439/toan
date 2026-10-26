// Kiểm chứng tự động: chạy mọi generator mới (có q.k) nhiều lần; so đáp án với oracle độc lập; lint định dạng.
const path=require('path'),fs=require('fs');
const root=path.resolve(process.argv[2]||'../toan-thcs'),N=+(process.argv[3]||400);
const L=require('./load.js')(root);
const T=L.run('T');
let oracles={};for(const f of fs.readdirSync(__dirname).filter(f=>/^oracles.*\.js$/.test(f)))Object.assign(oracles,require('./'+f));
const norm=s=>String(s).replace(/<[^>]+>/g,'').replace(/−/g,'-').replace(/\s+/g,' ').trim();
const st={},bad=[],samples={};let fb=0;
const rec=(k,f)=>{(st[k]=st[k]||{n:0,fail:0,nox:0,lint:{}});return st[k]};
for(const t of T){for(const arr of ['g','h']){(t[arr]||[]).forEach((fn,gi)=>{
  for(let i=0;i<N;i++){
    let q;try{q=fn()}catch(e){bad.push(`THROW ${t.id}.${arr}${gi}: ${e.message}`);break}
    if(!q||!q.k)continue; // chỉ kiểm câu mới
    const k=q.k,s=rec(k);s.n++;s.topic=t.id;s.lv=arr;
    const lint=m=>{s.lint[m]=(s.lint[m]||0)+1};
    if(k=='fallback'){lint('FALLBACK');continue}
    // 1. đáp án + 3 nhiễu khác nhau
    const all=[q.a,...q.w];if(q.w.length!=3||new Set(all).size!=4)lint('OPTIONS≠4 distinct');
    if(all.some(v=>v===''||v==null))lint('empty option');
    // 2. oracle
    const o=oracles[k];
    if(o){let exp;try{exp=o(q.p,q)}catch(e){lint('ORACLE_ERR '+e.message)}
      if(exp!==undefined){const ea=norm(exp).replace(/,/g,'.'),aa=norm(q.a).replace(/,/g,'.');
        if(ea!==aa){s.fail++;if(s.fail<=3)bad.push(`WRONG ${k} p=${JSON.stringify(q.p)} expected=${exp} got=${q.a}\n   Q: ${norm(q.q)}`)}}
    }else lint('NO_ORACLE');
    // 3. giải thích chứa đáp án
    const ne=norm(q.e).replace(/,/g,'.'),na=norm(q.a).replace(/,/g,'.');
    if(/^-?\d+(\.\d+)?$/.test(na)&&!ne.includes(na))lint('expl lacks answer');
    if((q.e.match(/Bước \d/g)||[]).length<2)lint('<2 steps');
    // 4. phân số vô tình (a/b) trong đề/giải
    const txt=q.q+' '+q.e+' '+all.join(' ');const fr=txt.match(/\d+\/\d+/g);if(fr){s.fr=s.fr||new Set();fr.forEach(x=>s.fr.add(x))}
    if(/\bundefined\b|NaN|\[object/.test(txt))lint('bad token');
    // 5. lý do cho nhiễu
    if(!q.x||Object.keys(q.x).length<3)s.nox++;
    if(i<2){(samples[k]=samples[k]||[]).push(q)}
  }
})}}
let tot=0,fails=0;
const rows=Object.entries(st).sort();
for(const [k,s] of rows){tot++;fails+=s.fail;
  const l=Object.entries(s.lint).map(([a,b])=>`${a}×${b}`).join(', ');
  console.log(`${s.fail?'✗':'✓'} ${k.padEnd(22)} ${s.topic}.${s.lv} n=${s.n} fail=${s.fail} noReason=${s.nox}${l?'  LINT: '+l:''}${s.fr?'  FR: '+[...s.fr].slice(0,6).join(','):''}`)}
console.log('\nGenerators mới:',tot,' sai đáp án:',fails);
bad.forEach(b=>console.log(b));
// ghi mẫu
let out='';for(const k of Object.keys(samples).sort()){for(const q of samples[k]){out+=`### ${k}\nQ: ${norm(q.q)}\n  ✔ ${norm(q.a)}\n  ✘ ${q.w.map(norm).join(' | ')}\n${q.x?'  why: '+JSON.stringify(q.x)+'\n':''}  GIẢI:\n${q.e.split('\n').map(l=>'    '+norm(l)).join('\n')}\n\n`}}
fs.writeFileSync(path.join(__dirname,'samples.txt'),out);
