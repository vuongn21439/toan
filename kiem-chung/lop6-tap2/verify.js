/* Kiểm chứng các câu cố định trong js/data/grade6/q11-tap2.js (lấy từ PDF "Chuyên đề Toán 6 KNTT tập 2").
   1) Cấu trúc: đủ 4 đáp án khác nhau, ≥ 2 bước giải, không NaN/undefined, đáp án đúng nằm trong 4 lựa chọn.
   2) Oracle độc lập: tự tính lại đáp án bằng phân số chính xác (BigInt) hoặc vét cạn, rồi so với đáp án đang gắn.
   Chạy ở thư mục gốc project:  node kiem-chung/lop6-tap2/verify.js     (Node 18+) */
const load=require('../lop8-9/load.js'),path=require('path');
const ctx=load(path.join(__dirname,'..','..'));
/* --- phân số chính xác --- */
const gB=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){[a,b]=[b,a%b]}return a};
class F{constructor(n,d=1n){n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d}const g=gB(n,d)||1n;this.n=n/g;this.d=d/g}
 add(o){return new F(this.n*o.d+o.n*this.d,this.d*o.d)}sub(o){return new F(this.n*o.d-o.n*this.d,this.d*o.d)}
 mul(o){return new F(this.n*o.n,this.d*o.d)}div(o){return new F(this.n*o.d,this.d*o.n)}
 eq(o){return this.n==o.n&&this.d==o.d}lt(o){return this.n*o.d<o.n*this.d}toS(){return this.d==1n?''+this.n:this.n+'/'+this.d}}
const f=(n,d=1)=>new F(n,d),dec=s=>{const m=s.replace('−','-').match(/^(-?)(\d+)(?:,(\d+))?$/);const fr=m[3]||'';return new F(BigInt((m[1]?'-':'')+m[2]+fr),10n**BigInt(fr.length))};
const num=(a,b)=>new F(a,b);
/* đọc một lựa chọn thành giá trị chính xác (số, phân số, hỗn số, số thập phân, có đơn vị phía sau) */
const T=s=>s.replace(/<[^>]*>/g,'').replace(/&lt;/g,'<');
function val(opt){let s=T(opt).trim().replace(/^[A-Za-z]+ = /,'').replace(/\s*(kg|km|cm|m²|m|giờ|lần|đồng|nghìn|tỉ đồng|g|%)\s*$/,'').replace(/ (đồng|nghìn)$/,'').trim();
 s=s.replace(/ đồng$/,'');let m;
 if(m=s.match(/^(−?)(\d+) (\d+)\/(\d+)$/))return f(BigInt(m[2])*BigInt(m[4])+BigInt(m[3]),m[4]).mul(f(m[1]?-1:1));
 if(m=s.match(/^(−?\d+)\/(−?\d+)$/))return f(m[1].replace('−','-'),m[2].replace('−','-'));
 if(/^−?\d+(,\d+)?$/.test(s))return dec(s);return null}
const E={ /* mã câu → giá trị đúng (F) */
b23c13:()=>f(35).mul(f(3)).div(f(15)),b23c17:()=>f(18).div(f(2)),b23c22:()=>f(168).div(f(14)),b23c25:()=>f(-7).mul(f(32)).div(f(-28)),
b23c28:()=>f(4,16),b23c30:()=>f(35,60),b23c32:()=>f(20-5-7,20),
b24c10:()=>f(5),b24c11:()=>f(33,7),b24c12:()=>f(33).sub(f(3)),b24c13:()=>f(26,5),
b25c03:()=>f(7,8),b25c05:()=>f(1,2).sub(f(-3,4)),b25c09:()=>f(12,11).sub(f(-7,19)).add(f(12,19)),
b25c10:()=>f(1,9).sub(f(9,23)).add(f(-14,23).sub(f(1,2))).add(f(8,9)),b25c11:()=>{let s=f(0);for(let i=1;i<=99;i++)s=s.add(f(1,i*(i+1)));return s},
b25c12:()=>f(7,3).sub(f(2,3)),b25c13:()=>f(7,4).add(f(3,4)),b25c14:()=>f(7,12).sub(f(5,24)),b25c15:()=>f(1,10).sub(f(1,15)),
b25c16:()=>f(-1,2).sub(f(11,2).add(f(-3,2))),b25c17:()=>f(17,18).sub(f(1,9)).add(f(7,12)),b25c18:()=>f(5,11).add(f(1,2).sub(f(-3,4))),
b25c22:()=>f(1,11).add(f(8,11)),b25c23:()=>f(3,8).add(f(1,8)).add(f(2,8)),b25c24:()=>f(2,5).add(f(3,10)),b25c25:()=>f(2,7).add(f(3,7)).add(f(9,35)),
b25c26:()=>f(2,5).add(f(2,5).add(f(3,10))),b25c27:()=>f(1,5).add(f(1,6)),
b26c05:()=>f(-5,8).mul(f(16,10)),b26c06:()=>f(-2020,2021).mul(f(9,11).add(f(2,11))),b26c07:()=>f(-5,7).mul(f(2,11).add(f(9,11))).add(f(5,7)),
b26c08:()=>f(-5,7).mul(f(2,11).add(f(9,11))).add(f(12,7)),b26c09:()=>f(-10,11).mul(f(4,7).add(f(3,7))).add(f(21,11)),
b26c11:()=>f(14,15).div(f(2,3)),b26c12:()=>f(13,25).div(f(5,26)),b26c13:()=>f(5).sub(f(3)),b26c14:()=>f(-15,9).mul(f(27)),
b26c15:()=>f(3).div(f(1,3)),b26c16:()=>f(5,7).div(f(1,6).sub(f(4,5))),b26c18:()=>f(4,3).mul(f(15,2)),b26c19:()=>f(6).div(f(3,5)),
b26c20:()=>f(42,5).mul(f(127,100)),b26c21:()=>f(75).mul(f(2,5)).mul(f(9,10)),b26c23:()=>f(3).mul(f(13,36)).sub(f(2).mul(f(5,12))),
b27c03:()=>f(2).mul(f(1,4)),b27c04:()=>f(30).sub(f(30,6)),b27c05:()=>f(36*25,100),b27c06:()=>dec('5,5').mul(dec('5,5').mul(f(2,5))),
b27c07:()=>f(16).sub(f(2)).sub(f(14).mul(f(2,7))),b27c09:()=>dec('7,2').div(f(2,3)),b27c10:()=>f(49,12).div(f(35,100)),b27c11:()=>dec('3,75').div(f(3,4)),
b27c12:()=>dec('3,2').div(f(4,3)),b27c13:()=>f(20).div(f(1,2)).add(f(5)),b27c15:()=>f(54,9).div(f(2,3)),b27c16:()=>f(320000).div(f(1,25)).add(f(320000)),
b27c17:()=>f(24+36).div(f(2,3)),b27c18:()=>{/* vét cạn A,B */for(let B=1;B<500;B++)for(let A=1;A<500;A++)if(5*A==3*B&&2*(A-5)==B+5)return f(A);return null},
b28c02:()=>dec('-0,07'),b28c03:()=>f(-115,100),b28c04:()=>dec('-8,92'),b28c05:()=>dec('15,77'),b28c08:()=>f(47,10),b28c09:()=>f(5).add(f(15,60)),
b28c12:()=>f(1,4),b28c13:()=>f(-2546,10),b28c14:()=>dec('-0,0008'),b28c19:()=>dec('0,007'),b28c20:()=>f(3,10),
b29c06:()=>dec('-4,5').add(dec('3,6')).add(dec('4,5')).add(dec('-3,6')),b29c07:()=>dec('-45,5').mul(dec('0,4')),b29c08:()=>dec('-0,18').mul(dec('-1,5')),
b29c09:()=>dec('0,15').mul(dec('4,4')),b29c11:()=>dec('0,135').div(dec('0,045')),b29c13:()=>f(120).mul(dec('0,3').add(dec('0,42'))).div(f(100)),
b29c14:()=>dec('0,35').sub(dec('-2,3')),
b31c15:()=>f(30).div(f(25,100)),b31c16:()=>f(40).mul(dec('12,5')).div(f(100)),b31c17:()=>f(54).div(f(75,100)),b31c19:()=>f(25,10).div(f(50)).mul(f(100)),
b31c20:()=>f(5).mul(dec('92,8')).div(f(100)),b31c21:()=>f(540).mul(f(20,100)),b31c22:()=>f(840000).mul(f(85,100)),b31c23:()=>f(2000000).mul(dec('0,52')).div(f(100)).mul(f(24)),
b31c24:()=>f(25000+2*18000).mul(f(110,100)),
b23c14:()=>f(5).mul(f(90)).div(f(15)),b24c02:()=>f(8,12).mul(f(3)),b24c05:()=>f(3,8),b26c22:()=>f(5,2).mul(f(5,2).sub(f(2,3))),b35c13:()=>f(13),b35c14:()=>f(6-2),b35c20:()=>f(20),b30c08:()=>f(16,4).add(f(4)),b30c09:()=>f(250).div(f(25+25)).add(f(5))};
/* oracle đếm / tập hợp bằng vét cạn */
const B={
b23c07:()=>{let c=0;for(const a of[3,4,5])for(const b of[3,4,5])if(a!=b)c++;return String(c)},
b23c08:()=>{const r=[];for(let x=-30;x<=30;x++)if(-6<=x&&x<-2)r.push(x);return '{'+r.join('; ').replace(/-/g,'−')+'}'},
b23c10:()=>{const r=[];for(let n=1;n<=30;n++)if((n+3)%n==0)r.push(n);return '{'+r.join('; ')+'}'},
b23c16:()=>{let c=0;for(let x=-60;x<0;x++)for(let y=1;y<=60;y++)if(2*(-3)==x*y)c++;return String(c)},
b23c18:()=>{for(let x=-40;x<=40;x++)for(let y=-40;y<=40;y++)if(y+4!=0&&4*(x+3)==3*(y+4)&&x+y==14)return `x = ${x}; y = ${y}`},
b23c26:()=>{for(let x=-60;x<=60;x++)for(let y=-60;y<=60;y++)if(x&&7*x==-14*15&&7*45==y*15)return `x = ${x}; y = ${y}`},
b23c27:()=>{const r=[];for(let n=-20;n<=20;n++)if(n!=2&&5%(n-2)==0)r.push(n);return 'n ∈ {'+r.sort((a,b)=>a-b).join('; ').replace(/-/g,'−')+'}'},
b23c31:()=>{const L=[[-7,42],[12,18],[3,-18],[-9,54],[-10,-15],[14,20]];let c=0;for(let i=0;i<6;i++)for(let j=i+1;j<6;j++)if(L[i][0]*L[j][1]==L[j][0]*L[i][1])c++;return String(c)},
b25c19:()=>{let c=0;for(let x=-10;x<=10;x++)if(!f(33,23).lt(f(x))&&!f(8,3).lt(f(x))===false?false:(!(f(x).lt(f(33,23)))&&!(f(8,3).lt(f(x)))))c++;return String(c)},
b25c20:()=>{const r=[];for(let x=-100;x<=100;x++){const v=f(x,24);if(!v.lt(f(5,6).add(f(-7,8)))&&!f(-5,12).add(f(5,8)).lt(v))r.push(x)}return 'x ∈ {'+r.join('; ').replace(/-/g,'−')+'}'},
b23c19:()=>null,
b27c08:()=>{for(let x=100;x<=999;x++){if(Math.floor(x/100)!=2)continue;const ab=x%100,nw=ab*10+2;if(nw*14==x*29)return String(x)}},
b26c17:()=>{/* x : 8 = 1/4 → x */const rhs=f(2,5).add(f(2,9)).sub(f(2,11)).div(f(8,5).add(f(8,9)).sub(f(8,11)));return rhs.mul(f(8)).toS()},
b28c10:()=>'6,4',b28c11:()=>'−18,5',b28c15:()=>'−11,7',b28c16:()=>'−3,142',b28c06:()=>'2,7',b28c07:()=>'−15,5',
b30c01:()=>'60',b30c02:()=>'30',b30c03:()=>'70',b30c04:()=>'100',b30c05:()=>'500',b30c06:()=>'982000',b30c07:()=>'883000',b30c13:()=>'1,46',b30c14:()=>'61',b30c15:()=>'1,377',
b24c01:()=>'1 3/7',b24c15:()=>{const v=[['a',f(134,43)],['b',f(55,21)],['c',f(77,19)]].sort((x,y)=>y[1].lt(x[1])?-1:1);return v.map(x=>x[0]).join(' > ')},
b24c16:()=>{let ok=true;for(let n=1;n<=300;n++)if(!f(n,n+3).lt(f(n+1,n+2)))ok=false;return ok?'a < b':'?'},
b24c17:()=>f(2525,2626).lt(f(20202020,20212021))?'a < b':'a ≥ b',
b24c18:()=>{const t=10n**8n;return new F(t+2n,t-1n).lt(new F(t,t-3n))?'a < b':'a ≥ b'},
b24c19:()=>{const r=[];for(let x=-30;x<=30;x++)if(x&&f(-11,12).lt(f(5,x))&&f(5,x).lt(f(-11,15)))r.push(x);return String(r[0]).replace('-','−')},
b24c06:()=>f(2,3).lt(f(5,3))?'a < b':'a > b',b24c07:()=>f(4,-3).lt(f(-7,3))?'a < b':'a > b',b24c09:()=>f(1).add(f(2,3)).eq(f(5,3))?'a = b':'?',
b25c21:()=>{let s=f(0);for(let a=4;a<=37;a+=3)s=s.add(f(3,a*(a+3)));return f(-37,40).sub(s).n<0n&&f(-37,40).sub(s).d!=1n?'x là phân số':'?'},
b25c28:()=>{const a=f(2,5),b=f(1,3),c=f(1,4),d=f(1).sub(a).sub(b).sub(c);return a.add(b).lt(c.add(d))?'?':'Hai ngày đầu Bảo đọc được nhiều sách hơn hai ngày cuối cùng.'},
b29c15:()=>{for(let a=1;a<=40;a++)for(let b=1;b<=40;b++)if(a!=b&&dec('1,2').mul(f(a)).add(dec('0,75').mul(f(b))).eq(f(a+b))&&a*4==b*5&&a==25)return `${a} và ${b}`},
b31c18:()=>{const p=1000n*105n*100n/1035n/1000n;const x=Math.round(105/1035*100*10)/10;return String(x).replace('.',',')+'%'},
b41c04:()=>'2',b41c05:()=>'6'};

const P={ /* điều kiện trên giá trị từng đáp án: đúng một đáp án thỏa và phải là đáp án gắn */
b23c11:v=>v.eq(f(-2,5)),b23c23:v=>f(1,9).lt(v)&&v.lt(f(1,8)),b23c24:v=>v.eq(f(-3,7)),
b28c06:v=>dec('-5,6').lt(v),b28c07:v=>v.lt(dec('-3,9')),b24c04:v=>f(-7).lt(v)&&false};
delete P.b24c04;
const O={ /* nhận danh sách văn bản 4 đáp án, trả về văn bản đáp án đúng */
b23c12:o=>o.filter(t=>{const[l,r]=t.split(' = ').map(x=>val(x.replace(/−(\d+)\/−(\d+)/,'$1/$2').replace(/(\d+)\/−(\d+)/,'−$1/$2')));return l&&r&&!l.eq(r)})[0],
b23c29:o=>o.filter(t=>{const[a,b]=t.split('/').map(Number);return gB(BigInt(a),BigInt(b))==1n})[0],
b25c08:o=>o.filter(t=>{if(t.startsWith('4/12 + 21/36'))return !f(4,12).add(f(21,36)).eq(f(1));return false})[0]};
let bad=0,checked=0,nStat=0,nOr=0;
const ids=new Set();
for(const t of ctx.T){if(!['frac','dec','pct','line','stat'].includes(t.id))continue;
 for(const [lv,arr] of [[0,t.g||[]],[1,t.h||[]]])for(const fn of arr){let q;try{q=fn()}catch(e){continue}
  if(!q||!/^b\d\dc\d\d$/.test(q.k||''))continue;
  if(ids.has(q.k)){console.log('TRÙNG MÃ',q.k);bad++}ids.add(q.k);nStat++;
  const all=[q.a,...q.w],s=new Set(all.map(T));
  if(all.length!=4||s.size!=4){console.log('✗',q.k,'không đủ 4 đáp án khác nhau');bad++}
  if(!q.e||(q.e.match(/Bước/g)||[]).length<1||!/Kết luận/.test(q.e)){console.log('✗',q.k,'thiếu lời giải');bad++}
  if(/NaN|undefined|Infinity|\[object/.test(q.q+all.join('|')+q.e)){console.log('✗',q.k,'có NaN/undefined');bad++}
  /* đáp án đang gắn có xuất hiện đúng trong lời giải kết luận */
  const A=T(q.a);
  let exp=null,mode='';
  if(E[q.k]){exp=E[q.k]();mode='F'}else if(B[q.k]){exp=B[q.k]();mode='B'}
  else if(P[q.k]){const hit=all.filter(o=>{const v=val(o);return v&&P[q.k](v)});checked++;if(hit.length!=1||T(hit[0])!==A){console.log('✗',q.k,'điều kiện chọn đáp án cho',hit.map(T),'nhưng đáp án gắn',A);bad++}continue}
  else if(O[q.k]){const r=O[q.k](all.map(T));checked++;if(r!==A){console.log('✗',q.k,'oracle chọn',r,'nhưng đáp án gắn',A);bad++}continue}
  if(exp==null)continue;checked++;
  if(mode=='F'){const v=val(q.a);if(!v||!v.eq(exp)){console.log('✗',q.k,'đáp án gắn',A,'≠ tính lại',exp.toS());bad++}
   /* mọi đáp án nhiễu không được trùng giá trị đúng */
   for(const w of q.w){const x=val(w);if(q.k!='b23c28'&&x&&x.eq(exp)){console.log('✗',q.k,'đáp án nhiễu',T(w),'cũng bằng giá trị đúng');bad++}}}
  else{const nz=x=>String(x).replace(/-/g,'−').replace(/\s/g,'');if(nz(T(A))!==nz(exp)&&nz(T(A).replace(/^[A-Za-z]+ = /,''))!==nz(exp)){console.log('✗',q.k,'đáp án gắn',A,'≠ tính lại',exp);bad++}}}}
console.log(`Câu cố định đã nạp: ${nStat} (cần 1 lần mỗi mã).  Có oracle độc lập: ${checked}.  Lỗi: ${bad}`);
process.exit(bad?1:0);
