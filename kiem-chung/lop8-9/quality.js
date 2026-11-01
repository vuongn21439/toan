/* Kiểm tra chất lượng nội dung lớp 8, 9: độ đa dạng của từng dạng bài và lỗi trình bày (dấu trừ, lũy thừa, chuỗi lạ). */
const path=require('path'),L=require('./load.js')(path.join(__dirname,'..','..'));
const {T,H}=L,N=+process.argv[2]||1500,pref=process.argv.slice(3);
const TAGS=/<\/?(b|span|sup|sub|i|u|br|em|small|svg|path|text|rect|circle|line|polygon)\b[^>]*>/g,
 strip=s=>String(s).replace(TAGS,''),
 frac=s=>String(s).replace(/<span class="fr"><b>([^<]*)<\/b><b>([^<]*)<\/b><\/span>/g,'⟦$1⁄$2⟧');   /* phân thức: giữ nguyên ranh giới để không nhầm hệ số */
const lowVar=[],fmt={};let total=0;
const flag=(k,t,s)=>{(fmt[t]=fmt[t]||new Map()).set(k,(fmt[t].get(k)||0)+1);if(!fmt[t+'_ex'])fmt[t+'_ex']=new Map();if(!fmt[t+'_ex'].has(k))fmt[t+'_ex'].set(k,s.slice(0,140))};
for(const t of T){if(t.gr<8||(pref.length&&!pref.some(p=>t.id.startsWith(p))))continue;
  for(const [lv,pool] of [['g',t.g],['h',t.h]])pool.forEach(fn=>{const seen=new Set();let key='?';
    for(let i=0;i<N;i++){const q=fn();key=q.k;seen.add(q.q);total++;
      const parts=[['q',q.q],['e',q.e],['a',q.inp?'':q.a],...q.w.map(w=>['w',w])];
      for(const [pt,txt] of parts){const raw=strip(frac(txt)),h=strip(H(txt));
        if(/(^|[\s(=;,])-\d/.test(raw)&&pt!='a')flag(key,'dấu trừ ASCII trước số',raw);
        if(/\^/.test(h))flag(key,'còn dấu ^ sau H()',h);
        if(/<[A-Za-z\/!]/.test(raw))flag(key,'dấu < dính liền chữ (trình duyệt sẽ hiểu là thẻ HTML)',raw);
        if(/undefined|NaN|\[object|\$\{|Infinity|null/.test(raw))flag(key,'chuỗi lạ',raw);
        if(/\s{2,}/.test(raw.replace(/\n/g,' ')))flag(key,'khoảng trắng thừa',raw);
        if(/[+−]\s*[+−]\s*\d|\+\s*−|−\s*\+|−\s*−/.test(raw))flag(key,'hai dấu liền nhau',raw);
        if(/\b0x\b|\b1x\b|\b1y\b|\+ 0\b|− 0\b/.test(raw)&&pt!='e')flag(key,'hệ số 0/1 thừa',raw)}}
    if(seen.size<25)lowVar.push(`${key}(${seen.size})`)})}
console.log(`Đã sinh ${total} câu.`);
console.log('Dạng bài ít biến thể (<25 câu khác nhau trong '+N+' lần):',lowVar.length?lowVar.join(' '):'không có');
for(const k of Object.keys(fmt).filter(k=>!k.endsWith('_ex'))){console.log('\n⚠',k);for(const [d,c] of fmt[k])console.log('  ',d,'×'+c,'→',fmt[k+'_ex'].get(d))}
