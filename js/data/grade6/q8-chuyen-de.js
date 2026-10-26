/* LỚP 6 · v5 (phần 2) — Chia hết, ước & bội, số nguyên, phân số: dạng bài theo tuyển tập chuyên đề bồi dưỡng HSG Toán 6.
   Đáp án nhiễu = lỗi hay gặp (kèm lý do), lời giải từng bước. Mã câu q.k + tham số q.p dùng cho tools/verify.js. */
(()=>{
const {mc,sol,gen,ov,fd,ng,c2,lcm}=BK,fh=G7H.fh,
 divs=n=>{const r=[];for(let d=1;d<=n;d++)if(n%d==0)r.push(d);return r},
 tau=n=>divs(n).length,
 mixed=(n,d)=>{const w=Math.floor(n/d),r=n%d;return r==0?`${w}`:w==0?fs(r,d):`${w} ${fs(r,d)}`};

/* ================= CHIA HẾT & SỐ NGUYÊN TỐ ================= */
A('div',
/* a chia m dư r1, b chia m dư r2: số dư của tổng/tích */
gen('div.soduA',()=>{
 const m=R(5,9),r1=R(1,m-1),r2=R(1,m-1),su=R(0,1),rem=(su?r1+r2:r1*r2)%m,raw=su?r1+r2:r1*r2,w=[];
 if(raw>=m)w.push([raw,'chưa lấy số dư của kết quả cho '+m]);
 w.push([(su?r1*r2:r1+r2)%m,su?'nhân thay vì cộng':'cộng thay vì nhân'],[Math.abs(r1-r2)%m,'lấy hiệu hai số dư'],...sh([...Array(m).keys()]));
 const e=sol([`Viết a = ${m}k + ${r1} và b = ${m}l + ${r2} (k, l là số tự nhiên).`,su?`a + b = ${m}(k + l) + (${r1} + ${r2}) = ${m}(k + l) + ${r1+r2}.`:`a × b = ${m}(…) + ${r1} × ${r2} = ${m}(…) + ${r1*r2} (các tích có chứa ${m} đều chia hết cho ${m}).`,`${raw} chia ${m} dư ${rem}${raw>=m?` (${raw} = ${m} × ${Math.floor(raw/m)} + ${rem})`:''}.`],`số dư là ${rem}.`,`Sau khi tính ${su?'tổng':'tích'} các số dư, phải chia tiếp cho ${m} lấy số dư.`);
 return[mc(`Số a chia cho ${m} dư ${r1}, số b chia cho ${m} dư ${r2}. Khi chia ${su?'a + b':'a × b'} cho ${m} thì dư bao nhiêu?`,rem,w,e),[m,r1,r2,su]]})
);

HA('div',
/* Chứng minh chia hết dạng số có chữ số (CĐ4 dạng 1) */
gen('div.cm_ab',()=>{
 const F=[
  {ctx:`${ov('ab')} + ${ov('ba')}`,n:2,f:(a,b)=>10*a+b+10*b+a,c:()=>true,ok:[11],bad:[9,10,5,4],st:[`${ov('ab')} = 10a + b và ${ov('ba')} = 10b + a.`,`Tổng = (10a + b) + (10b + a) = 11a + 11b = 11 × (a + b).`,`Tổng có thừa số 11 với mọi chữ số a, b.`]},
  {ctx:`${ov('ab')} − ${ov('ba')} (với a > b)`,n:2,f:(a,b)=>(10*a+b)-(10*b+a),c:(a,b)=>a>b,ok:[9],bad:[11,10,5,6],st:[`${ov('ab')} = 10a + b và ${ov('ba')} = 10b + a.`,`Hiệu = (10a + b) − (10b + a) = 9a − 9b = 9 × (a − b).`,`Hiệu có thừa số 9 với mọi a > b.`]},
  {ctx:`${ov('abcabc')}`,n:3,f:(a,b,c)=>(100*a+10*b+c)*1001,c:()=>true,ok:[7,11,13],bad:[17,19,23,5,9],st:[`${ov('abcabc')} = ${ov('abc')} × 1000 + ${ov('abc')} = ${ov('abc')} × 1001.`,`Phân tích 1001 = 7 × 11 × 13.`,`Vậy ${ov('abcabc')} = ${ov('abc')} × 7 × 11 × 13 chia hết cho cả 7, 11 và 13.`]},
  {ctx:`${ov('aaabbb')}`,n:2,f:(a,b)=>111000*a+111*b,c:()=>true,ok:[37],bad:[7,11,13,27],st:[`${ov('aaabbb')} = a × 111000 + b × 111 = 111 × (1000a + b).`,`Phân tích 111 = 3 × 37.`,`Vậy ${ov('aaabbb')} = 3 × 37 × (1000a + b) chia hết cho 37.`]},
  {ctx:`${ov('abc')} − ${ov('cba')} (với a > c)`,n:3,f:(a,b,c)=>(100*a+10*b+c)-(100*c+10*b+a),c:(a,b,c)=>a>c,ok:[99],bad:[100,101,98,90],st:[`${ov('abc')} = 100a + 10b + c và ${ov('cba')} = 100c + 10b + a.`,`Hiệu = (100a + 10b + c) − (100c + 10b + a) = 99a − 99c = 99 × (a − c).`,`Hiệu có thừa số 99 với mọi a > c.`]},
  {ctx:`${ov('abab')}`,n:2,f:(a,b)=>1010*a+101*b,c:()=>true,ok:[101],bad:[9,11,7,13],st:[`${ov('abab')} = a × 1010 + b × 101 = 101 × (10a + b).`,`Hay ${ov('abab')} = 101 × ${ov('ab')}.`,`Vậy ${ov('abab')} luôn chia hết cho 101.`]}],
  idx=R(0,F.length-1),it=F[idx],ans=P(it.ok),dg=[1,2,3,4,5,6,7,8,9],
  ex=d=>{for(const a of dg)for(const b of dg)for(const c of(it.n==3?dg:[0])){if(!it.c(a,b,c))continue;const v=it.f(a,b,c);if(v%d!=0)return it.n==3?`ví dụ a = ${a}, b = ${b}, c = ${c} cho ${v}, không chia hết cho ${d}`:`ví dụ a = ${a}, b = ${b} cho ${v}, không chia hết cho ${d}`}return null},
  w=sh(it.bad).map(d=>ex(d)?[d,ex(d)]:null).filter(Boolean),
  vars=it.n==3?'a, b, c':'a, b';
 const e=sol(it.st,`${it.ctx} luôn chia hết cho ${ans}.`,'Một số khác trong các đáp án chỉ chia hết trong vài trường hợp cụ thể (thử với các chữ số khác nhau), không đúng với mọi chữ số.');
 return[mc(`Với ${vars} là các chữ số khác 0, số ${it.ctx} luôn chia hết cho số nào sau đây?`,ans,w,e),[idx,ans]]}),

/* Tích k số tự nhiên liên tiếp */
gen('div.lientiep',()=>{
 const k=R(2,5),fa=[1,1,2,6,24,120][k],bad={2:[3,4,5,6],3:[4,9,12,8,18],4:[16,48,36,32,72],5:[180,240,720,600,144]}[k];
 const why={2:`Trong 2 số liên tiếp luôn có một số chẵn nên tích chia hết cho 2.`,3:`Trong 3 số liên tiếp luôn có một số chia hết cho 2 và một số chia hết cho 3. Vì ƯCLN(2; 3) = 1 nên tích chia hết cho 2 × 3 = 6.`,4:`Trong 4 số liên tiếp có hai số chẵn liên tiếp: một số chia hết cho 4, số kia chia hết cho 2, nên tích chia hết cho 8. Lại có một số chia hết cho 3. Vì ƯCLN(8; 3) = 1 nên tích chia hết cho 8 × 3 = 24.`,5:`Trong 5 số liên tiếp có một số chia hết cho 5, một số chia hết cho 3 và ít nhất hai số chẵn (một số trong đó chia hết cho 4) nên tích chia hết cho 5 × 3 × 8 = 120 (các thừa số 5, 3, 8 đôi một nguyên tố cùng nhau).`}[k],
  ex=Array.from({length:k},(_,i)=>i+1).join(' × ');
 const e=sol([`Thử với ${k} số nhỏ nhất: ${ex} = ${fa}. Vậy số cần tìm phải là ước của ${fa}.`,why,`Các thừa số đó đôi một nguyên tố cùng nhau nên tích chia hết cho ${fa}.`],`tích ${k} số tự nhiên liên tiếp luôn chia hết cho ${fa}.`,`Một số không là ước của ${fa} thì không thể luôn là ước của tích (thử với ${ex}).`);
 return[mc(`Tích của ${k} số tự nhiên liên tiếp luôn chia hết cho số nào sau đây?`,fa,bad.filter(d=>fa%d!=0).map(d=>[d,`ví dụ ${ex} = ${fa} không chia hết cho ${d}`]),e),[k]]}),

/* p, p+a, p+2a cùng là số nguyên tố */
gen('div.nt_p',()=>{
 const a=P([2,4,8,10,14,20]),isp=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true},
  fails=p=>{const x=[p,p+a,p+2*a].find(v=>!isp(v));return x},
  w=[2,5,7,11,13,17].filter(p=>fails(p)!==undefined).map(p=>{const x=fails(p);const lbl=x==p?`${p}`:x==p+a?`${p} + ${a} = ${x}`:`${p} + ${2*a} = ${x}`;return[p,`${lbl} không phải là số nguyên tố`]});
 const e=sol([`Xét số dư của p, p + ${a}, p + ${2*a} khi chia cho 3. Vì ${a} không chia hết cho 3 nên ba số này có ba số dư khác nhau 0; 1; 2 (theo một thứ tự nào đó).`,`Do đó trong ba số có đúng một số chia hết cho 3. Số nguyên tố chia hết cho 3 chỉ có thể là 3.`,`Hai số p + ${a} và p + ${2*a} đều lớn hơn 3, nên số chia hết cho 3 chính là p, tức p = 3.`,`Thử lại: 3; ${3+a}; ${3+2*a} đều là số nguyên tố.`],`p = 3.`,`Đừng chỉ thử vài giá trị nhỏ: phải chứng tỏ đó là giá trị duy nhất.`);
 return[mc(`Tìm số nguyên tố p sao cho p + ${a} và p + ${2*a} cũng là số nguyên tố.`,3,w,e),[a]]}),

/* A = p·x·y + p·z·w chắc chắn chia hết cho p (CĐ5 số nguyên tố, hợp số) */
gen('div.uocA',()=>{
 const p=P([7,11,13,17]),x=R(2,12),y=R(2,12),z=R(2,12),t=R(2,12),Aa=p*x*y+p*z*t,
  w=[2,3,5,7,11,13,17,19,23,29,31].filter(d=>d!=p&&Aa%d!=0).slice(0,8).map(d=>[d,`A chia cho ${d} dư ${Aa%d}`]);
 const e=sol([`A = ${p} × ${x} × ${y} + ${p} × ${z} × ${t}: hai số hạng đều có thừa số ${p}.`,`Đặt ${p} làm thừa số chung: A = ${p} × (${x} × ${y} + ${z} × ${t}) = ${p} × ${x*y+z*t}.`,`Vậy A chia hết cho ${p}; vì ${x*y+z*t} > 1 nên A còn có ước khác 1 và A, tức là hợp số.`],`${p} là ước của A (A = ${Aa}).`,`Chỉ cần đặt thừa số chung, không cần tính A trước.`);
 return[mc(`Cho A = ${p} × ${x} × ${y} + ${p} × ${z} × ${t}. Số nào sau đây chắc chắn là ước của A?`,p,w,e),[p,x,y,z,t]]})
);

/* ================= ƯCLN – BCNN ================= */
A('gcd',
/* ƯCLN × BCNN = tích hai số */
gen('gcd.tichuoc',()=>{
 let u,v;do{u=R(2,9);v=R(2,9)}while(u>=v||gcd(u,v)!=1);const g=R(2,9),sw=R(0,1),a=g*(sw?v:u),b=g*(sw?u:v),m=g*u*v;
 const e=sol([`Với hai số a, b bất kì: ƯCLN(a; b) × BCNN(a; b) = a × b.`,`Tích hai số = ${g} × ${m} = ${g*m}.`,`Số còn lại = ${g*m} : ${a} = ${b}.`],`số còn lại là ${b}.`,`Lấy BCNN chia cho số đã biết (${m} : ${a}) chưa ra số cần tìm vì còn thiếu ƯCLN.`);
 return[mc(`Hai số tự nhiên có ƯCLN bằng ${g} và BCNN bằng ${m}. Biết một số là ${a}, số còn lại là:`,b,[[m/a,'lấy BCNN chia số đã biết, quên nhân với ƯCLN'],[g*m,'đó là tích hai số, chưa chia cho số đã biết'],[m-a,'lấy hiệu thay vì dùng tích'],[b+g,'cộng thêm ƯCLN']],e),[g,m,a]]}),

/* Số học sinh xếp hàng trong một khoảng */
gen('gcd.xephang',()=>{
 let D,L,ans,lo,hi,mult;
 do{D=sh([2,3,4,5,6,8,9,10,12]).slice(0,R(2,3));L=D.reduce((a,b)=>lcm(a,b));ans=L*R(1,Math.floor(150/L)||1);lo=ans-R(3,Math.max(4,L-4));hi=lo+R(Math.floor(L/2)+1,L-1);mult=[];for(let v=lo;v<=hi;v++)if(v%L==0)mult.push(v)}while(L<12||L>60||ans<30||mult.length!=1||lo<10||ans>200||!D.every(d=>D.every(e=>d==e||e%d!=0)));
 D.sort((a,b)=>a-b);
 const cand=[];for(let v=lo;v<=hi;v++){if(v==ans)continue;const g=D.filter(d=>v%d==0),n=D.filter(d=>v%d!=0);if(g.length)cand.push([v,`${v} chia hết cho ${g.join(', ')} nhưng không chia hết cho ${n.join(', ')}`])}
 [ans-L,ans+L].filter(v=>v>0).forEach(v=>cand.push([v,`${v} là bội chung nhưng nằm ngoài khoảng ${lo} đến ${hi}`]));
 const e=sol([`Xếp hàng ${D.join(', ')} đều vừa đủ nên số học sinh là bội chung của ${D.join(', ')}.`,`BCNN(${D.join('; ')}) = ${L}. Bội chung là các số: ${L}; ${2*L}; ${3*L}; …`,`Chọn bội chung nằm trong khoảng từ ${lo} đến ${hi}: đó là ${ans}.`],`có ${ans} học sinh.`,`Phải chia hết cho CẢ ${D.length} số, không chỉ một vài số.`);
 return[mc(`Số học sinh khối 6 của một trường trong khoảng từ ${lo} đến ${hi}. Khi xếp hàng ${D.join(', hàng ')} đều vừa đủ (không thừa, không thiếu ai). Số học sinh là:`,ans,cand,e),[D,lo,hi]]})
);

HA('gcd',
/* Số tự nhiên chia d1 dư d1−c, chia d2 dư d2−c, … */
gen('gcd.dukhacnhau',()=>{
 const c=R(1,3);let D,L;do{D=sh([4,5,6,8,9,10,12,15]).slice(0,R(3,4)).sort((a,b)=>a-b);L=D.reduce((a,b)=>lcm(a,b))}while(L==D.reduce((a,b)=>a*b)||L>400||L<=c);
 const rs=D.map(d=>d-c),ans=L-c,prod=D.reduce((a,b)=>a*b);
 const e=sol([`Số cần tìm n chia ${D.map((d,i)=>`${d} dư ${rs[i]}`).join('; ')}: ở mỗi phép chia, số dư kém số chia đúng ${c} đơn vị.`,`Mỗi phép chia có n = (số chia) × (thương) + (số chia) − ${c}, nên n + ${c} = (số chia) × (thương + 1). Vậy n + ${c} chia hết cho cả ${D.join(', ')}.`,`n + ${c} là bội chung của ${D.join(', ')}; n nhỏ nhất thì n + ${c} = BCNN(${D.join('; ')}) = ${L}.`,`n = ${L} − ${c} = ${ans}.`],`số cần tìm là ${ans}.`,`Phải trừ ${c} ở bước cuối; nếu cộng ${c} sẽ không ra số dư như đề.`);
 return[mc(`Tìm số tự nhiên nhỏ nhất (khác 0) chia cho ${D.join('; ')} lần lượt dư ${rs.join('; ')}.`,ans,[[L,`quên trừ ${c}`],[L+c,`cộng ${c} thay vì trừ`],[prod-c,'dùng tích các số chia thay vì BCNN'],[2*L-c,'lấy bội chung thứ hai, chưa phải số nhỏ nhất']],e),[D,c]]}),

/* Ba bạn cùng trực */
gen('gcd.lichtruc3',()=>{
 let x,y,z,L;do{[x,y,z]=sh([4,5,6,8,9,10,12,14,15]).slice(0,3);L=lcm(lcm(x,y),z)}while(L==x*y*z||L>360||L<=lcm(x,y)||L<=lcm(y,z)||L<=lcm(x,z));
 const L12=lcm(x,y);
 const e=sol([`Cả ba cùng trực lại sau số ngày là bội chung của ${x}, ${y} và ${z}.`,`Cần ít nhất nên tìm BCNN(${x}; ${y}; ${z}).`,`BCNN(${x}; ${y}) = ${L12}; BCNN(${L12}; ${z}) = ${L}.`],`sau ${L} ngày.`,`BCNN(${x}; ${y}) = ${L12} mới là lần An và Bình cùng trực, chưa có Chi.`);
 return[mc(`An, Bình, Chi cứ ${x}, ${y}, ${z} ngày trực nhật một lần. Hôm nay cả ba bạn cùng trực. Sau ít nhất bao nhiêu ngày thì cả ba lại cùng trực?`,L,[[L12,'mới có An và Bình cùng trực'],[x*y*z,'lấy tích thay vì BCNN'],[x+y+z,'lấy tổng'],[lcm(y,z),'mới có Bình và Chi cùng trực']],e),[x,y,z]]})
);
A('gcd',
/* Chia quà thành nhiều phần nhất */
gen('gcd.chiaqua',()=>{
 let u,v;do{u=R(2,9);v=R(2,9)}while(u==v||gcd(u,v)!=1);const g=R(2,8),a=g*u,b=g*v,ans=`${u} bút, ${v} vở`;
 const e=sol([`Số phần quà phải là ước chung của ${a} và ${b} (chia hết cả hai loại).`,`Nhiều phần nhất nên số phần = ƯCLN(${a}; ${b}) = ${g}.`,`Mỗi phần có ${a} : ${g} = ${u} bút và ${b} : ${g} = ${v} vở.`],`mỗi phần có ${u} bút, ${v} vở (chia được ${g} phần).`,`${g} là số phần quà, không phải số bút hay số vở trong mỗi phần.`);
 const w=[[`${v} bút, ${u} vở`,'đảo số bút và số vở'],[`${g} bút, ${g} vở`,'nhầm số phần quà với số bút, vở trong mỗi phần']];
 [2,3].filter(k=>g%k==0).forEach(k=>w.push([`${k*u} bút, ${k*v} vở`,`chỉ chia được ${g/k} phần, chưa phải nhiều phần nhất`]));
 w.push([`${a} bút, ${b} vở`,'không chia: mỗi phần giữ nguyên cả số bút và số vở']);
 return[mc(`Có ${a} cái bút và ${b} quyển vở. Chia đều thành các phần quà giống nhau (không thừa) với số phần nhiều nhất. Mỗi phần quà có:`,ans,w,e,String),[a,b]]})
);

/* ================= ƯỚC & BỘI ================= */
HA('ub',
/* Số ước của n = 2^a · 3^b · 5^c */
gen('ub.soUoc',()=>{
 const a=R(1,4),b=R(1,3),c=R(1,2),t=R(0,3),fm=`2^${a} · 3^${b} · 5${c>1?'^'+c:''}`;let q,ans,w,e;
 const T=(a+1)*(b+1)*(c+1);
 if(t==0){q=`Số n = ${fm} có bao nhiêu ước tự nhiên?`;ans=T;
  e=sol([`Nếu n = p<sup>x</sup> · q<sup>y</sup> · r<sup>z</sup> (p, q, r nguyên tố) thì số ước của n là (x + 1)(y + 1)(z + 1).`,`Số mũ của 2, 3, 5 lần lượt là ${a}, ${b}, ${c}.`,`Số ước = (${a} + 1)(${b} + 1)(${c} + 1) = ${a+1} × ${b+1} × ${c+1} = ${T}.`],`n có ${T} ước.`,`Mỗi số mũ phải cộng thêm 1 (vì thừa số có thể xuất hiện 0, 1, …, mũ lần).`);
  w=[[a*b*c,'quên cộng 1 vào các số mũ'],[a+b+c+1,'cộng các số mũ thay vì nhân'],[(a+1)*(b+1),'bỏ sót thừa số nguyên tố 5']]}
 else if(t==1){q=`Số n = ${fm} có bao nhiêu ước tự nhiên là số lẻ?`;ans=(b+1)*(c+1);
  e=sol([`Ước lẻ của n không chứa thừa số 2: chỉ gồm các thừa số 3 và 5.`,`Chọn số mũ của 3: có ${b+1} cách (0, 1, …, ${b}); chọn số mũ của 5: có ${c+1} cách.`,`Số ước lẻ = ${b+1} × ${c+1} = ${ans}.`],`có ${ans} ước lẻ.`,`Đếm cả thừa số 2 (${T} ước) là đếm cả ước chẵn.`);
  w=[[T,'đếm cả ước chẵn'],[a*(b+1)*(c+1),'đó là số ước chẵn'],[b*c,'quên cộng 1 vào các số mũ']]}
 else if(t==2){q=`Số n = ${fm} có bao nhiêu ước tự nhiên là số chẵn?`;ans=a*(b+1)*(c+1);
  e=sol([`Ước chẵn phải chứa thừa số 2: số mũ của 2 ${a==1?'chỉ có thể là 1':`là 1, 2, …, ${a}`} (không được là 0): có ${a} cách chọn.`,`Số mũ của 3 có ${b+1} cách chọn, số mũ của 5 có ${c+1} cách chọn.`,`Số ước chẵn = ${a} × ${b+1} × ${c+1} = ${ans}.`,`Kiểm tra bằng cách khác: số ước chẵn = tổng số ước − số ước lẻ = ${T} − ${(b+1)*(c+1)} = ${ans}.`],`có ${ans} ước chẵn.`,`Số mũ của 2 phải ≥ 1 (không được bằng 0) vì ước chẵn phải chia hết cho 2.`);
  w=[[T,'đếm cả ước lẻ'],[(b+1)*(c+1),'đó là số ước lẻ'],[a*b*c,'quên cộng 1 vào các số mũ']]}
 else{q=`Số n = ${fm} có bao nhiêu ước tự nhiên chia hết cho 3?`;ans=(a+1)*b*(c+1);
  e=sol([`Ước chia hết cho 3 phải chứa thừa số 3: số mũ của 3 ${b==1?'chỉ có thể là 1':`là 1, 2, …, ${b}`} (không được là 0): có ${b} cách.`,`Số mũ của 2 có ${a+1} cách, số mũ của 5 có ${c+1} cách.`,`Số ước chia hết cho 3 = ${a+1} × ${b} × ${c+1} = ${ans}.`,`Kiểm tra bằng cách khác: tổng số ước ${T} trừ số ước không chia hết cho 3 là ${(a+1)*(c+1)} → ${T} − ${(a+1)*(c+1)} = ${ans}.`],`có ${ans} ước chia hết cho 3.`,`Số mũ của 3 phải ≥ 1 (không được bằng 0) vì ước đó phải chia hết cho 3.`);
  w=[[T,'đếm cả ước không chia hết cho 3'],[(a+1)*(c+1),'đó là số ước KHÔNG chia hết cho 3'],[a*b*c,'quên cộng 1 vào các số mũ']]}
 return[mc(q,ans,w,e),[a,b,c,t]]}),

/* Tổng các ước của p^a · q^b */
gen('ub.tongUoc',()=>{
 const[p,qq]=P([[2,3],[2,5],[3,5],[2,7]]),a=R(1,3),b=R(1,2),n=p**a*qq**b,s1=Array.from({length:a+1},(_,i)=>p**i),s2=Array.from({length:b+1},(_,i)=>qq**i),S1=s1.reduce((x,y)=>x+y),S2=s2.reduce((x,y)=>x+y),S=S1*S2;
 const e=sol([`Phân tích: n = ${p}^${a} · ${qq}^${b} = ${n}.`,`Mỗi ước của n có dạng ${p}^i · ${qq}^j (0 ≤ i ≤ ${a}, 0 ≤ j ≤ ${b}). Tổng các ước = (${s1.join(' + ')}) × (${s2.join(' + ')}).`,`= ${S1} × ${S2} = ${S}.`],`tổng các ước là ${S}.`,`Phải NHÂN hai tổng, không cộng; và tính cả ước 1 và chính n.`);
 return[mc(`Tổng tất cả các ước tự nhiên của số ${n} = ${p}^${a} · ${qq}^${b} là:`,S,[[S1+S2,'cộng hai tổng thay vì nhân'],[n+1,'chỉ cộng ước 1 và chính n'],[tau(n),'đó là số ước, không phải tổng các ước'],[S-n,'quên cộng ước là chính n']],e),[n]]}),

/* Có bao nhiêu số tự nhiên n để (n + a) chia hết cho (n + b) */
gen('ub.n_chia_het',()=>{
 const b=R(2,4),k=P([6,8,10,12,15,18,20,24,30]),a=b+k,ds=divs(k).filter(d=>d>=b),ns=ds.map(d=>d-b);
 const e=sol([`(n + ${a}) − (n + ${b}) = ${k}. Nếu (n + ${b}) là ước của (n + ${a}) thì (n + ${b}) là ước của ${k}.`,`Ư(${k}) = {${divs(k).join('; ')}}.`,`n là số tự nhiên nên n + ${b} ≥ ${b}. Các ước thỏa mãn: ${ds.join('; ')} → n = ${ns.join('; ')}.`,`Thử lại: mỗi giá trị n trên cho (n + ${a}) chia hết cho (n + ${b}).`],`có ${ds.length} giá trị của n.`,`Phải loại các ước nhỏ hơn ${b} (làm n âm), không phải ước nào của ${k} cũng cho n là số tự nhiên.`);
 return[mc(`Có bao nhiêu số tự nhiên n để (n + ${a}) chia hết cho (n + ${b})?`,ds.length,[[divs(k).length,`đếm cả các ước nhỏ hơn ${b} (cho n âm)`],[ds.length+1,'đếm thừa 1 ước'],[ds.length-1,'bỏ sót một ước']],e),[a,b]]})
);

/* ================= SỐ NGUYÊN ================= */
A('int',
/* Bỏ ngoặc rồi tính */
gen('int.bongoac',()=>{
 const x=R(5,30),y=R(2,20),z=R(2,20),u=R(2,20),v=R(2,20),ans=x-(y-z)+(u-v);
 const e=sol([`Ngoặc thứ nhất có dấu "−" đứng trước: bỏ ngoặc phải ĐỔI DẤU mọi số hạng trong ngoặc: −(${y} − ${z}) = −${y} + ${z}.`,`Ngoặc thứ hai có dấu "+" đứng trước: bỏ ngoặc giữ nguyên dấu: +(${u} − ${v}) = +${u} − ${v}.`,`Biểu thức = ${x} − ${y} + ${z} + ${u} − ${v}.`,`Tính từ trái sang phải: ${ng(x-y)} ${z>=0?'+':''} ${z} = ${ng(x-y+z)}; ${ng(x-y+z)} + ${u} = ${ng(x-y+z+u)}; ${ng(x-y+z+u)} − ${v} = ${ng(ans)}.`],`${ng(ans)}.`,`Dấu "−" trước ngoặc đổi dấu mọi số hạng; dấu "+" trước ngoặc thì giữ nguyên.`);
 return[mc(`Bỏ ngoặc rồi tính: ${x} − (${y} − ${z}) + (${u} − ${v})`,ans,[[x-y-z+u-v,'bỏ ngoặc thứ nhất mà không đổi dấu số hạng trong ngoặc'],[x-y+z-u+v,'đổi dấu cả ngoặc có dấu "+" đứng trước'],[x+y-z+u-v,'coi dấu "−" trước ngoặc như dấu "+" (giữ nguyên dấu trong ngoặc)']],e),[x,y,z,u,v]]}),

/* (x − a)(x + b) = 0 */
gen('int.tich0',()=>{
 let a=R(1,9),b=R(1,9);while(a==b)b=R(1,9);
 const ans=`x = ${a} hoặc x = ${ng(-b)}`;
 const e=sol([`Một tích bằng 0 khi có ít nhất một thừa số bằng 0.`,`x − ${a} = 0 ⟹ x = ${a}.`,`x + ${b} = 0 ⟹ x = ${ng(-b)}.`],`${ans}.`,`Chuyển vế phải đổi dấu: x + ${b} = 0 cho x = −${b}, không phải ${b}.`);
 return[mc(`Tìm các số nguyên x, biết: (x − ${a})(x + ${b}) = 0`,ans,[[`x = ${ng(-a)} hoặc x = ${b}`,'đổi dấu cả hai nghiệm'],[`x = ${a} hoặc x = ${b}`,`quên đổi dấu ở thừa số thứ hai (x + ${b} = 0 cho x = −${b})`],[`x = ${ng(-a)} hoặc x = ${ng(-b)}`,`quên đổi dấu ở thừa số thứ nhất (x − ${a} = 0 cho x = ${a})`]],e,String),[a,b]]})
);

HA('int',
/* 1 − 2 + 3 − 4 + … */
gen('int.tongxen',()=>{
 const N=R(10,99),ev=N%2==0,ans=ev?-N/2:(N+1)/2,tail=ev?`+ ${N-1} − ${N}`:`− ${N-1} + ${N}`;
 const e=sol([`Ghép các số hạng liên tiếp thành từng cặp (1 − 2), (3 − 4), …; mỗi cặp bằng −1.`,ev?`Có ${N} số hạng (chẵn) nên ghép được đúng ${N/2} cặp: (1 − 2), (3 − 4), …, (${N-1} − ${N}).`:`Có ${N} số hạng (lẻ) nên ghép được ${(N-1)/2} cặp (1 − 2), …, (${N-2} − ${N-1}); còn lẻ số hạng cuối +${N}.`,ev?`Tổng = ${N/2} × (−1) = ${ng(-N/2)}.`:`Tổng = ${(N-1)/2} × (−1) + ${N} = ${ng(-(N-1)/2)} + ${N} = ${(N+1)/2}.`],`S = ${ng(ans)}.`,`Hãy xem số số hạng là chẵn hay lẻ trước khi ghép cặp: số hạng cuối cùng mang dấu ${ev?'trừ':'cộng'}.`);
 const w=ev?[[N/2,'sai dấu: mỗi cặp bằng −1 chứ không phải +1'],[-N/2+1,'đếm thiếu một cặp'],[-N/2-1,'đếm thừa một cặp']]:[[-(N+1)/2,'sai dấu của kết quả'],[-(N-1)/2,`quên số hạng cuối +${N}`],[(N-1)/2,'quên dấu "−" của các cặp']];
 return[mc(`Tính S = 1 − 2 + 3 − 4 + … ${tail}`,ans,w,e),[N]]}),

/* |x − a| = b hoặc |x + a| = b */
gen('int.abs_x',()=>{
 const a=R(1,12),b=R(1,12),plus=R(0,1),c=plus?-a:a,s1=c+b,s2=c-b,hi=Math.max(s1,s2),lo=Math.min(s1,s2),ans=`x = ${ng(hi)} hoặc x = ${ng(lo)}`;
 const E=plus?`|x + ${a}|`:`|x − ${a}|`;
 const e=sol([`|A| = ${b} (với ${b} > 0) nên A = ${b} hoặc A = −${b}.`,plus?`x + ${a} = ${b} ⟹ x = ${b} − ${a} = ${ng(b-a)};  x + ${a} = −${b} ⟹ x = −${b} − ${a} = ${ng(-b-a)}.`:`x − ${a} = ${b} ⟹ x = ${b} + ${a} = ${a+b};  x − ${a} = −${b} ⟹ x = −${b} + ${a} = ${ng(a-b)}.`,`Thử lại cả hai giá trị vào đề bài đều đúng.`],`${ans}.`,`Phương trình giá trị tuyệt đối bằng một số dương có HAI nghiệm.`);
 return[mc(`Tìm các số nguyên x, biết ${E} = ${b}.`,ans,[[`chỉ x = ${ng(hi)}`,'bỏ sót trường hợp biểu thức bằng số đối'],[`chỉ x = ${ng(lo)}`,'bỏ sót trường hợp biểu thức bằng chính số đó'],[`x = ${ng(-hi)} hoặc x = ${ng(-lo)}`,'đổi dấu cả hai nghiệm'],[`x = ${ng(b)} hoặc x = ${ng(-b)}`,`quên chuyển ${a} sang vế phải`]],e,String),[a,b,plus]]}),

/* Số nguyên n để (n + a) chia hết cho (n + b) */
gen('int.uoc_n',()=>{
 const b=R(1,6),k=P([4,6,8,9,10,12,15,16,18]),a=b+k,all=divs(k).flatMap(d=>[d,-d]).sort((x,y)=>x-y);
 const e=sol([`(n + ${a}) − (n + ${b}) = ${k}, nên (n + ${b}) phải là ước nguyên của ${k}.`,`Các ước nguyên của ${k}: ${all.map(ng).join('; ')} (có ${all.length} ước, gồm ${all.length/2} ước dương và ${all.length/2} ước âm).`,`Mỗi ước cho đúng một giá trị n = ước − ${b}, nên có ${all.length} giá trị của n.`],`có ${all.length} số nguyên n.`,`n là số NGUYÊN nên phải lấy cả các ước âm; chỉ lấy ước dương sẽ ra ${all.length/2}.`);
 return[mc(`Có bao nhiêu số nguyên n để (n + ${a}) chia hết cho (n + ${b})?`,all.length,[[all.length/2,'chỉ đếm ước dương, quên ước âm'],[all.length-1,'bỏ sót một ước'],[all.length+2,'đếm thừa']],e),[a,b]]}),

/* Giá trị nhỏ nhất/lớn nhất; tổng giá trị tuyệt đối bằng 0 */
gen('int.min_abs',()=>{
 const t=R(0,2),a=R(1,9),c=R(1,9),b=R(1,9);let q,ans,w,e;
 if(t==0){q=`Giá trị nhỏ nhất của biểu thức A = |x − ${a}| + ${c} là:`;ans=c;
  e=sol([`Giá trị tuyệt đối luôn không âm: |x − ${a}| ≥ 0 với mọi x.`,`Do đó A = |x − ${a}| + ${c} ≥ 0 + ${c} = ${c}.`,`Dấu "=" xảy ra khi |x − ${a}| = 0, tức x = ${a}.`],`giá trị nhỏ nhất của A là ${c} (khi x = ${a}).`,`Giá trị nhỏ nhất đạt được khi x = ${a}; đừng lấy ${a} làm giá trị của A.`);
  w=[[a+c,'cộng cả a vào kết quả'],[a,'nhầm giá trị của x với giá trị nhỏ nhất của A'],[0,'quên số hạng +'+c]]}
 else if(t==1){q=`Giá trị lớn nhất của biểu thức B = ${a+c} − |x + ${b}| là:`;ans=a+c;
  e=sol([`|x + ${b}| ≥ 0 với mọi x, nên −|x + ${b}| ≤ 0.`,`Do đó B = ${a+c} − |x + ${b}| ≤ ${a+c} − 0 = ${a+c}.`,`Dấu "=" xảy ra khi |x + ${b}| = 0, tức x = ${ng(-b)}.`],`giá trị lớn nhất của B là ${a+c} (khi x = ${ng(-b)}).`,`Trừ một số không âm thì kết quả KHÔNG lớn hơn ${a+c}.`);
  w=[[0,'nhầm với giá trị nhỏ nhất của |x + '+b+'|'],[a+c+b,'cộng thêm '+b],[a+c-b,'trừ '+b],[-b,'nhầm giá trị của x với giá trị lớn nhất của B']]}
 else{q=`Cho |x − ${a}| + |y + ${b}| = 0. Giá trị của x + y là:`;ans=a-b;
  e=sol([`|x − ${a}| ≥ 0 và |y + ${b}| ≥ 0 với mọi x, y.`,`Tổng hai số không âm bằng 0 khi cả hai số đều bằng 0: |x − ${a}| = 0 và |y + ${b}| = 0.`,`Suy ra x = ${a} và y = ${ng(-b)}.`,`x + y = ${a} + (${ng(-b)}) = ${ng(a-b)}.`],`x + y = ${ng(a-b)}.`,`y + ${b} = 0 cho y = −${b} (số âm), đừng lấy y = ${b}.`);
  w=[[a+b,'lấy y = '+b+' thay vì −'+b],[b-a,'đảo dấu kết quả'],[-a-b,'lấy x = −'+a+' và y = −'+b]]}
 return[mc(q,ans,w,e),[t,a,b,c]]})
);

/* ================= PHÂN SỐ ================= */
A('frac',
/* Cộng hai hỗn số khác mẫu */
gen('frac.honso',()=>{
 let c,f;do{c=R(2,6);f=R(2,6)}while(c==f);
 const a=R(1,5),d=R(1,5),b=R(1,c-1),e2=R(1,f-1),L=lcm(c,f),n1=b*(L/c),n2=e2*(L/f),tot=(a+d)*L+n1+n2,ans=mixed(tot,L),carry=n1+n2>=L;
 const e=sol([`Quy đồng phần phân số về mẫu chung ${L}: ${b}/${c} = ${n1}/${L}; ${e2}/${f} = ${n2}/${L}.`,`Cộng phần nguyên: ${a} + ${d} = ${a+d}. Cộng phần phân số: ${n1}/${L} + ${n2}/${L} = ${n1+n2}/${L}.`,carry?`Phần phân số ${n1+n2}/${L} ≥ 1 nên đổi: ${n1+n2}/${L} = ${mixed(n1+n2,L)}, rồi cộng vào phần nguyên.`:`Phần phân số ${n1+n2}/${L} < 1 nên giữ nguyên.`,`Kết quả: ${ans}.`],`${ans}.`,`Không cộng tử với tử, mẫu với mẫu (${b}/${c} + ${e2}/${f} ≠ ${b+e2}/${c+f}).`);
 const w=[[`${a+d} ${b+e2}/${c+f}`,'cộng tử với tử, mẫu với mẫu'],[`${a+d}`,'bỏ qua phần phân số']];
 if(carry)w.push([`${a+d} ${n1+n2}/${L}`,'không đổi phần phân số ≥ 1 sang phần nguyên']);
 if(n1!=n2)w.push([`${a+d} ${fs(Math.abs(n1-n2),L)}`,'trừ hai phần phân số thay vì cộng']);
 w.push([`${a+d+1} ${fs(n1+n2,L)}`,'cộng thừa 1 vào phần nguyên']);
 return[mc(`Tính: ${a} ${b}/${c} + ${d} ${e2}/${f}`,ans,w,e,String),[a,b,c,d,e2,f]]})

);

HA('frac',
/* Tổng 1/(k(k+1)) + … + 1/(m(m+1)) */
gen('frac.tong_dayso',()=>{
 const k=R(1,4),m=R(k+3,k+12),ans=fs(m+1-k,k*(m+1)),terms=[k,k+1,k+2].map(i=>fh(1,`${i}·${i+1}`)).join(' + ')+' + … + '+fh(1,`${m}·${m+1}`);
 const e=sol([`Mỗi số hạng tách được: ${fh(1,'n·(n + 1)')} = ${fh(1,'n')} − ${fh(1,'n + 1')}. Ví dụ ${fh(1,`${k}·${k+1}`)} = ${fh(1,k)} − ${fh(1,k+1)}.`,`Cộng lại: S = (${fh(1,k)} − ${fh(1,k+1)}) + (${fh(1,k+1)} − ${fh(1,k+2)}) + … + (${fh(1,m)} − ${fh(1,m+1)}).`,`Các phân số ở giữa triệt tiêu từng đôi, còn lại S = ${fh(1,k)} − ${fh(1,m+1)}.`,`S = ${fs(m+1-k,k*(m+1))} (quy đồng: ${fh(m+1,k*(m+1))} − ${fh(k,k*(m+1))}).`],`S = ${ans}.`,`Số hạng đầu là 1/${k}, số hạng cuối bị trừ là 1/${m+1} (không phải 1/${m}).`);
 const w=[[fs(m-k,k*m),`kết thúc ở ${fh(1,m)} thay vì ${fh(1,m+1)}`],[fs(1,m+1),`chỉ lấy phân số cuối`],[fs(m+1,k*(m+2)),'quy đồng sai'],[fs(m+2-k,k*(m+2)),'đếm thừa một số hạng']];
 return[mc(`Tính: ${terms}`,ans,w,e,String),[k,m]]}),

/* Tổng s/(a(a+s)) + … */
gen('frac.tong_dayso2',()=>{
 const s=P([2,3,4,5]),a0=R(1,3),n=R(4,12),last=a0+(n-1)*s,tot=a0+n*s,ans=fs(n*s,a0*tot),terms=[0,1,2].map(i=>fh(s,`${a0+i*s}·${a0+(i+1)*s}`)).join(' + ')+' + … + '+fh(s,`${last}·${last+s}`);
 const e=sol([`Hai thừa số ở mẫu hơn kém ${s}, tử số cũng là ${s}, nên tách được: ${fh(s,'a·(a + '+s+')')} = ${fh(1,'a')} − ${fh(1,'a + '+s)}.`,`Ví dụ ${fh(s,`${a0}·${a0+s}`)} = ${fh(1,a0)} − ${fh(1,a0+s)}.`,`Cộng lại các phân số ở giữa triệt tiêu, còn ${fh(1,a0)} − ${fh(1,tot)}.`,`= ${fh(tot,a0*tot)} − ${fh(a0,a0*tot)} = ${ans}.`],`tổng = ${ans}.`,`Phải kiểm tra tử số bằng đúng hiệu hai thừa số ở mẫu (${s}); nếu không thì phải đưa thêm hệ số.`);
 return[mc(`Tính: ${terms}`,ans,[[fs(1,a0)+'',`quên trừ phân số cuối ${fh(1,tot)}`],[fs(tot-a0-s,a0*(tot-s)),`kết thúc ở ${fh(1,last)} thay vì ${fh(1,tot)}`],[fs(n,a0*tot),`quên nhân ${s} (đã gộp nhầm tử số)`],[fs(n*s,tot),'bỏ thừa số '+a0+' ở mẫu']],e,String),[s,a0,n]]}),

/* Học sinh vắng mặt (CĐ10 dạng 5) */
gen('frac.loivan1',()=>{
 const p=R(4,12),tot=p*(p+1);
 const e=sol([`Lúc đầu số vắng bằng ${fh(1,p)} số có mặt, nên số vắng bằng ${fh(1,p+1)} số học sinh cả lớp (vắng : cả lớp = 1 : ${p+1}).`,`Thêm 1 bạn nghỉ nữa: số vắng bằng ${fh(1,p-1)} số có mặt, tức bằng ${fh(1,p)} số học sinh cả lớp.`,`1 học sinh ứng với ${fh(1,p)} − ${fh(1,p+1)} = ${fh(1,p*(p+1))} số học sinh cả lớp.`,`Số học sinh cả lớp = 1 : ${fh(1,p*(p+1))} = ${tot}.`],`lớp có ${tot} học sinh.`,`Phải đổi các tỉ số "so với số có mặt" về tỉ số "so với cả lớp" (vì số có mặt thay đổi khi có thêm bạn nghỉ).`);
 return[mc(`Trong một buổi học, số học sinh vắng mặt bằng ${fh(1,p)} số học sinh có mặt. Nếu có thêm 1 bạn nghỉ học nữa thì số học sinh vắng mặt bằng ${fh(1,p-1)} số học sinh có mặt. Lớp có bao nhiêu học sinh?`,tot,[[p*p,'đó là số học sinh có mặt lúc đầu'],[p*(p-1),'so sánh trực tiếp với số có mặt, chưa đổi về cả lớp'],[(p+1)*(p+2),'dịch lệch một nấc tỉ số'],[tot-1,'trừ nhầm 1 bạn']],e),[p]]}),

/* Đọc sách 3 ngày (làm ngược) */
gen('frac.loivan2',()=>{
 const t=R(15,45),a=2*R(1,5),b=R(2,9),T=6*t,c=2*t-a/2-b;
 if(c<5)throw new Error('c');
 const R1=4*t-a;
 const e=sol([`Ngày 3 đọc nốt ${c} trang, nên sau ngày 2 còn lại ${c} trang.`,`Ngày 2 đọc ${fh(1,2)} số trang còn lại và thêm ${b} trang: ${c} + ${b} = ${c+b} trang là ${fh(1,2)} số trang còn lại sau ngày 1. Số trang còn lại sau ngày 1 = ${c+b} × 2 = ${R1}.`,`Ngày 1 đọc ${fh(1,3)} số trang và thêm ${a} trang, nên ${fh(2,3)} số trang của sách = ${R1} + ${a} = ${R1+a}.`,`Số trang cả cuốn = ${R1+a} : ${fh(2,3)} = ${T}.`],`cuốn sách có ${T} trang.`,`Làm ngược từ cuối: nhớ cộng (không trừ) các số trang "thêm" khi lùi lại.`);
 return[mc(`Bạn An đọc một cuốn sách trong 3 ngày. Ngày thứ nhất đọc ${fh(1,3)} số trang và thêm ${a} trang; ngày thứ hai đọc ${fh(1,2)} số trang còn lại và thêm ${b} trang; ngày thứ ba đọc nốt ${c} trang. Cuốn sách có bao nhiêu trang?`,T,[[(2*c+a)*3/2,`quên số trang "thêm ${b}" của ngày 2`],[R1*3/2,`quên số trang "thêm ${a}" của ngày 1`],[R1+a,`đó mới là ${fh(2,3)} số trang của sách`],[(2*(c-b)+a)*3/2,`trừ ${b} thay vì cộng khi lùi lại`]],e),[a,b,c]]}),

/* So sánh bằng phần bù / phần thừa */
gen('frac.sosanh_trunggian',()=>{
 const cons=R(0,2)==0,imp=!cons&&R(0,2)==0;let a,b,x=R(1,9);
 if(cons){const N=R(100,2999);a=N;b=N+1;x=1}else if(!imp){b=R(15,99);a=R(5,b-4)}else{b=R(10,60);a=b+R(3,30)}
 const sw=R(0,1),[xn,xd]=sw?[a+x,b+x]:[a,b],[yn,yd]=sw?[a,b]:[a+x,b+x],rel=xn*yd>yn*xd?'A > B':'A < B',opp=rel=='A > B'?'A < B':'A > B',P1=`${a}/${b}`,P2=`${a+x}/${b+x}`;
 const e=imp?sol([`Cả hai phân số đều lớn hơn 1 (tử lớn hơn mẫu). Xét "phần thừa" so với 1: ${P1} − 1 = ${fh(a-b,b)}; ${P2} − 1 = ${fh(a-b,b+x)}.`,`Hai phần thừa có cùng tử ${a-b}; mẫu ${b} < ${b+x} nên ${fh(a-b,b)} > ${fh(a-b,b+x)}.`,`Phần thừa của ${P1} lớn hơn nên ${P1} > ${P2}.`,`Đối chiếu với đề: A = ${xn}/${xd}, B = ${yn}/${yd} nên ${rel}.`],`${rel}.`,`Thêm cùng một số vào cả tử và mẫu của phân số lớn hơn 1 làm phân số GIẢM (tiến gần về 1).`)
  :sol([`Cả hai phân số đều nhỏ hơn 1 (tử nhỏ hơn mẫu). Xét "phần bù" đến 1: 1 − ${P1} = ${fh(b-a,b)}; 1 − ${P2} = ${fh(b-a,b+x)}.`,`Hai phần bù có cùng tử ${b-a}; mẫu ${b} < ${b+x} nên ${fh(b-a,b)} > ${fh(b-a,b+x)}.`,`Phần bù của ${P1} lớn hơn nên ${P1} < ${P2}.`,`Đối chiếu với đề: A = ${xn}/${xd}, B = ${yn}/${yd} nên ${rel}.`],`${rel}.`,`Thêm cùng một số vào cả tử và mẫu của phân số nhỏ hơn 1 làm phân số TĂNG (tiến gần về 1).`);
 return[mc(`So sánh A = ${xn}/${xd} và B = ${yn}/${yd}.`,rel,[[opp,imp?'nhầm chiều: với phân số lớn hơn 1, thêm cùng một số vào tử và mẫu làm giá trị GIẢM':'nhầm chiều: với phân số nhỏ hơn 1, thêm cùng một số vào tử và mẫu làm giá trị TĂNG'],['A = B',`nhân chéo: ${a}×${b+x} = ${a*(b+x)} khác ${a+x}×${b} = ${(a+x)*b}, nên hai phân số không bằng nhau`],['Không so sánh được','so sánh được bằng "phần bù" (hoặc "phần thừa") so với 1']],e,String),[a,b,x,sw]]}),

/* ƯCLN(an+b; cn+d): phân số luôn tối giản / ước nguyên tố chung */
gen('frac.toigian',()=>{
 const t=R(0,1),pr=t==0?1:P([2,3,5,7]);let a,b,c,d,k=0;
 do{a=R(2,9);b=R(1,9);c=R(2,9);d=R(1,9);k++}while(Math.abs(a*d-b*c)!=pr&&k<4000);
 if(Math.abs(a*d-b*c)!=pr)throw new Error('nf');
 const ex=n=>`${a*n+b}/${c*n+d}`,F=fh(`${a}n + ${b}`,`${c}n + ${d}`),sg=a*d-b*c,
  cm=[`Gọi k là một ước chung của (${a}n + ${b}) và (${c}n + ${d}).`,`Khi đó k chia hết ${c}(${a}n + ${b}) = ${a*c}n + ${b*c} và ${a}(${c}n + ${d}) = ${a*c}n + ${a*d}.`,`Hiệu hai số này là ${a*d} − ${b*c} = ${ng(sg)} cũng chia hết cho k, nên ${t==0?'k = 1':`k là ước của ${pr}`}.`];
 if(t==0){
  const e=sol([...cm,`ƯCLN = 1 với mọi số tự nhiên n, nên phân số luôn tối giản.`],`phân số ${a}n + ${b} trên ${c}n + ${d} luôn tối giản.`,`Thử vài giá trị n (ví dụ n = 0 cho ${ex(0)}, n = 1 cho ${ex(1)}) chỉ gợi ý, chưa chứng minh được "với mọi n".`);
  return[mc(`Với mọi số tự nhiên n, phân số ${F} có tính chất nào sau đây?`,'Luôn là phân số tối giản',[['Chỉ tối giản khi n là số chẵn',`thử n = 1 (lẻ): ${ex(1)} vẫn tối giản`],['Chỉ tối giản khi n là số lẻ',`thử n = 0 (chẵn): ${ex(0)} vẫn tối giản`],['Luôn rút gọn được cho một số lớn hơn 1',`thử n = 0: ${ex(0)} đã tối giản`]],e,String),[t,a,b,c,d]]}
 const e=sol([...cm,`Vì ${pr} là số nguyên tố nên ước nguyên tố chung (nếu có) chỉ có thể là ${pr}.`],`ước nguyên tố chung chỉ có thể là ${pr}.`,`Ước chung của hai số cũng là ước của mọi tổ hợp của chúng; ở đây tổ hợp đó cho hằng số ${pr}.`);
 return[mc(`Cho phân số ${F} với n là số tự nhiên. Nếu phân số này rút gọn được thì ước nguyên tố chung của tử và mẫu chỉ có thể là số nào?`,pr,[2,3,5,7,11,13].filter(x=>x!=pr).map(x=>[x,`${x} không là ước của ${pr}, mà ước chung phải là ước của ${pr}`]),e),[t,a,b,c,d]]})

);
})();
