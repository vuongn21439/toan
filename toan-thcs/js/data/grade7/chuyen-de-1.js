/* LỚP 7 · v5 (phần 1) — Số hữu tỉ, số thực, tỉ lệ thức & đại lượng tỉ lệ, đa thức một biến.
   Dạng bài lấy từ tuyển tập chuyên đề bồi dưỡng HSG Toán 7 (phép tính, tìm x, trị tuyệt đối, tỉ lệ thức, đa thức).
   Đáp án nhiễu = lỗi hay gặp (kèm lý do); lời giải từng bước. q.k + q.p dùng cho tools/verify.js. */
(()=>{
const {mc,sol,gen,ov,fd,ng,c2,lcm}=BK,fh=G7H.fh,fq=G7H.fq,add=G7H.add,addH=G7H.addH,
 Fr=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(Math.abs(n),d)||1;return[n/g,d/g]},
 fa=(a,b)=>Fr(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),
 fz=f=>fq(f[0],f[1]),
 lin=a=>a==0?'x':a>0?`x − ${a}`:`x + ${-a}`,
 shf=(n,d)=>{const f=Fr(n,d);return f[1]==1?String(f[0]):fh(f[0],f[1])},
 sgn=v=>v<0?'−':'+';

/* ================= SỐ HỮU TỈ ================= */
add('l7sht',
/* Sắp xếp ba số hữu tỉ âm */
gen('sht.sosanh',()=>{
 const pool=[3,4,5,6,8,10,12],key=x=>x[0]+'/'+x[1];let f;
 do{f=Array.from({length:3},()=>{const d=P(pool);return Fr(R(1,d-1),d)})}while(new Set(f.map(key)).size<3||new Set(f.map(x=>x[1])).size<2);
 const L=f.reduce((a,x)=>lcm(a,x[1]),1),mag=x=>x[0]*(L/x[1]),asc=[...f].sort((a,b)=>mag(b)-mag(a)),
  show=arr=>arr.map(x=>fq(-x[0],x[1])).join(' < '),sw=(arr,i)=>{const r=[...arr];[r[i],r[i+1]]=[r[i+1],r[i]];return r},
  e=sol([`Quy đồng mẫu số về ${L}: ${f.map(x=>`−${x[0]}/${x[1]} = −${mag(x)}/${L}`).join('; ')}.`,`Cùng mẫu dương ${L}, số nào có tử nhỏ hơn thì nhỏ hơn: ${asc.map(x=>'−'+mag(x)).join(' < ')}.`,`Sắp xếp tăng dần: ${show(asc)}.`],`${show(asc)}.`,`Với số âm, giá trị tuyệt đối càng LỚN thì số càng NHỎ.`);
 return[mc(`Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần: ${f.map(x=>fq(-x[0],x[1])).join('; ')}`,show(asc),[[show([...asc].reverse()),'xếp theo giá trị tuyệt đối tăng dần, quên rằng với số âm thì ngược lại'],[show(sw(asc,0)),'đổi chỗ hai số đứng cạnh nhau do quy đồng sai'],[show(sw(asc,1)),'đổi chỗ hai số đứng cạnh nhau do quy đồng sai']],e,String),f]})
);

addH('l7sht',
/* Tổng 1/(1·3) + 1/(3·5) + … */
gen('sht.tong_day',()=>{
 const n=R(5,15),ans=fq(n,2*n+1),terms=`${fh(1,'1·3')} + ${fh(1,'3·5')} + ${fh(1,'5·7')} + … + ${fh(1,`${2*n-1}·${2*n+1}`)}`,
  e=sol([`Mỗi số hạng tách được: ${fh(1,'(2k − 1)(2k + 1)')} = ${fh(1,2)} × (${fh(1,'2k − 1')} − ${fh(1,'2k + 1')}). Ví dụ ${fh(1,'1·3')} = ${fh(1,2)} × (1 − ${fh(1,3)}).`,`A = ${fh(1,2)} × [(1 − ${fh(1,3)}) + (${fh(1,3)} − ${fh(1,5)}) + … + (${fh(1,2*n-1)} − ${fh(1,2*n+1)})].`,`Các phân số ở giữa triệt tiêu, còn A = ${fh(1,2)} × (1 − ${fh(1,2*n+1)}) = ${fh(1,2)} × ${fh(2*n,2*n+1)}.`,`A = ${ans}.`],`A = ${ans}.`,`Đừng quên nhân với ${fh(1,2)} (vì hai thừa số ở mẫu hơn kém 2, không phải 1).`);
 return[mc(`Tính: ${terms}`,ans,[[fq(2*n,2*n+1),'quên nhân với một nửa'],[fq(1,2),'chỉ giữ lại số hạng 1 và bỏ phần trừ cuối'],[fq(n,2*n-1),'nhầm mẫu của số hạng cuối'],[fq(n,n+1),'nhầm hệ số (dùng tách 1/n − 1/(n+1))']],e,String),[n]]}),

/* (a^m · b^n) : c^k với cơ số hợp */
gen('sht.luythua_tich',()=>{
 const[x,y]=P([[2,3],[2,5],[3,5],[2,7],[3,7]]);let m,n,k,e1,e2;
 do{m=R(2,5);n=R(2,5);k=R(2,9);e1=2*m-k;e2=2*n-k}while(!e1||!e2||e1==e2||m==n||Math.abs(e1)>5||Math.abs(e2)>5||Math.abs(e1)+Math.abs(e2)>7);
 const val=(a,b)=>{const num=(a>0?x**a:1)*(b>0?y**b:1),den=(a<0?x**-a:1)*(b<0?y**-b:1);return fq(num,den)},
  pw=(b,ee)=>ee>0?`${b}^${ee}`:fh(1,`${b}^${-ee}`),ans=val(e1,e2),
  e=sol([`Viết các cơ số dưới dạng lũy thừa của ${x} và ${y}: ${x*x} = ${x}^2; ${y*y} = ${y}^2; ${x*y} = ${x}·${y}.`,`Tử = (${x}^2)^${m} · (${y}^2)^${n} = ${x}^${2*m} · ${y}^${2*n}. Mẫu = (${x}·${y})^${k} = ${x}^${k} · ${y}^${k}.`,`Chia các lũy thừa cùng cơ số (trừ số mũ): ${x}^${2*m} : ${x}^${k} = ${pw(x,e1)}; ${y}^${2*n} : ${y}^${k} = ${pw(y,e2)}.`,`Kết quả: ${pw(x,e1)} · ${pw(y,e2)} = ${ans}.`],`${ans}.`,`(a^m)^n = a^(m·n): phải NHÂN số mũ khi lũy thừa của lũy thừa.`);
 return[mc(`Tính: (${x*x}^${m} · ${y*y}^${n}) : ${x*y}^${k}`,ans,[[val(m-k,n-k),`coi ${x*x}^${m} = ${x}^${m} và ${y*y}^${n} = ${y}^${n} (quên nhân đôi số mũ)`],[val(-e1,e2),'đổi dấu số mũ của một cơ số'],[val(e2,e1),'đảo số mũ giữa hai cơ số']],e,String),[x,y,m,n,k]]}),

/* |x ± a/b| = c/d */
gen('sht.abs_x',()=>{
 const pool=[2,3,4,5,6],b=P(pool),d=P(pool),a=R(1,2*b),c=R(1,2*d),plus=R(0,1),
  base=Fr(plus?-a:a,b),cd=Fr(c,d),h=fa(base,cd),l=fa(base,Fr(-c,d)),
  [hi,lo]=h[0]/h[1]>=l[0]/l[1]?[h,l]:[l,h],str=(u,v)=>`x = ${fz(u)} hoặc x = ${fz(v)}`,ans=str(hi,lo),
  nb=Fr(-base[0],base[1]),hh=fa(nb,cd),ll=fa(nb,Fr(-c,d)),[h2,l2]=hh[0]/hh[1]>=ll[0]/ll[1]?[hh,ll]:[ll,hh],
  E=`|x ${plus?'+':'−'} ${shf(a,b)}| = ${shf(c,d)}`,
  e=sol([`|A| = ${fq(c,d)} (số dương) nên A = ${fq(c,d)} hoặc A = ${fq(-c,d)}.`,`x ${plus?'+':'−'} ${fq(a,b)} = ${fq(c,d)} ⟹ x = ${fz(h)}.`,`x ${plus?'+':'−'} ${fq(a,b)} = ${fq(-c,d)} ⟹ x = ${fz(l)}.`],`${ans}.`,`Phương trình |A| = số dương có HAI nghiệm; nhớ đổi dấu khi chuyển ${fq(a,b)} sang vế phải.`);
 return[mc(`Tìm x, biết: ${E}`,ans,[[`chỉ x = ${fz(hi)}`,'bỏ sót trường hợp biểu thức bằng số đối'],[`chỉ x = ${fz(lo)}`,'bỏ sót trường hợp biểu thức bằng chính số đó'],[str(h2,l2),'quên đổi dấu khi chuyển phân số sang vế phải'],[`x = ${fq(c,d)} hoặc x = ${fq(-c,d)}`,'quên chuyển phân số còn lại sang vế phải']],e,String),[a,b,c,d,plus]]}),

/* GTNN của |x − a| + |x − b| */
gen('sht.min_hai_abs',()=>{
 let a,b;do{a=R(-9,9);b=R(-9,9)}while(a==b||Math.abs(a-b)<2);
 const lo=Math.min(a,b),hi=Math.max(a,b),ans=hi-lo,
  e=sol([`Với mọi x: |${lin(lo)}| + |${lin(hi)}| = |${lin(lo)}| + |${hi>=0?hi:'−'+(-hi)} − x| ≥ |(${lin(lo)}) + (${hi<0?'−'+(-hi):hi} − x)|.`,`Tổng trong dấu giá trị tuyệt đối = ${hi} − (${lo}) = ${ans}, nên A ≥ ${ans}.`,`Dấu "=" xảy ra khi (${lin(lo)}) và (${hi<0?'−'+(-hi):hi} − x) cùng dấu, tức khi ${lo} ≤ x ≤ ${hi}. Vậy giá trị nhỏ nhất của A là ${ans}.`],`giá trị nhỏ nhất là ${ans}.`,`Hai trị tuyệt đối không thể cùng bằng 0 vì x không thể vừa bằng ${a} vừa bằng ${b}.`);
 return[mc(`Giá trị nhỏ nhất của biểu thức A = |${lin(a)}| + |${lin(b)}| là:`,ans,[[Math.abs(a)+Math.abs(b),'cộng giá trị tuyệt đối của hai số a và b'],[0,'cho rằng hai trị tuyệt đối cùng bằng 0 được'],[Math.abs(a+b),'lấy |a + b| thay vì |a − b|'],[2*ans,'nhân đôi kết quả']],e),[a,b]]})
);

/* ================= SỐ THỰC ================= */
add('l7sth',
/* So sánh a√b và c√d */
gen('sth.sosanh_can',()=>{
 let a,b,c,d;do{a=R(2,6);c=R(2,6);b=P([2,3,5,6,7]);d=P([2,3,5,6,7])}while(a*a*b==c*c*d||Math.abs(a*a*b-c*c*d)<3);
 const A=`${a}√${b}`,B=`${c}√${d}`,l=a*a*b,r=c*c*d,rel=l>r?'>':'<',opp=l>r?'<':'>',ans=`${A} ${rel} ${B}`,
  e=sol([`Cả hai số đều dương nên so sánh bình phương của chúng.`,`(${A})² = ${a}² × ${b} = ${a*a} × ${b} = ${l}; (${B})² = ${c}² × ${d} = ${c*c} × ${d} = ${r}.`,`${l} ${rel} ${r} nên ${ans}.`],`${ans}.`,`Đưa thừa số vào trong căn phải bình phương: ${a}√${b} = √(${a}² × ${b}) = √${l}.`);
 return[mc(`So sánh hai số ${A} và ${B}.`,ans,[[`${A} ${opp} ${B}`,'đảo chiều bất đẳng thức'],[`${A} = ${B}`,`hai bình phương ${l} và ${r} khác nhau`],['Không so sánh được','so sánh được bằng cách bình phương hai vế (hoặc đưa thừa số vào trong căn)']],e,String),[a,b,c,d]]})
);

addH('l7sth',
/* Đếm số n thỏa mãn a < √n < b */
gen('sth.dem_so',()=>{
 const a=R(1,6),b=a+R(2,5),ans=b*b-a*a-1,
  e=sol([`a < √n < b với a, b > 0 tương đương a² < n < b².`,`Ở đây ${a*a} < n < ${b*b}, nên n lấy các giá trị nguyên từ ${a*a+1} đến ${b*b-1}.`,`Số giá trị = ${b*b-1} − ${a*a+1} + 1 = ${ans}.`],`có ${ans} số nguyên n.`,`Dấu "<" ở hai đầu nên phải loại ${a*a} và ${b*b}; không đếm ${b*b-a*a} số.`);
 return[mc(`Có bao nhiêu số nguyên n thỏa mãn ${a} < √n < ${b}?`,ans,[[b*b-a*a,'đếm cả một đầu mút (hoặc quên trừ 1)'],[b*b-a*a+1,'đếm cả hai đầu mút'],[b-a-1,'đếm số nguyên giữa a và b thay vì giữa a² và b²'],[b-a,'đếm số nguyên từ a đến b']],e),[a,b]]}),

/* Rút gọn √(k²·m) */
gen('sth.rutgon_can',()=>{
 const m=P([2,3,5,6,7,10]),k=R(2,9),n=k*k*m,ans=`${k}√${m}`,
  e=sol([`Phân tích ${n} = ${k*k} × ${m} = ${k}² × ${m} (${m} không còn thừa số chính phương).`,`√${n} = √(${k}² × ${m}) = √(${k}²) × √${m}.`,`= ${k}√${m}.`],`√${n} = ${ans}.`,`Lấy ${k} (không phải ${k*k}) ra ngoài dấu căn vì √(${k}²) = ${k}.`);
 return[mc(`Rút gọn: √${n}`,ans,[[`${k*k}√${m}`,`đưa ${k*k} ra ngoài dấu căn mà quên lấy căn`],[`${m}√${k}`,'đảo hệ số và số dưới dấu căn'],[`${k}√${k*m}`,`chỉ rút một nhân tử ${k} ra ngoài, quên chia số dưới căn`]],e,String),[n]]}),

/* √(px + q) = r */
gen('sth.timx_can',()=>{
 let p,q,r,x;do{p=P([1,2,3,4,5]);q=R(1,9);r=R(2,9);x=(r*r-q)/p}while(!Number.isInteger(x)||x<=0);
 const e=sol([`Điều kiện: ${p==1?'':p}x + ${q} ≥ 0. Bình phương hai vế (vế phải ${r} > 0): ${p==1?'':p}x + ${q} = ${r}² = ${r*r}.`,`${p==1?'':p}x = ${r*r} − ${q} = ${r*r-q}.`,`x = ${r*r-q} : ${p} = ${x}.`,`Thử lại: √(${p}×${x} + ${q}) = √${r*r} = ${r} đúng.`],`x = ${x}.`,`Phải bình phương cả hai vế rồi mới chuyển vế; và thử lại nghiệm.`);
 return[mc(`Tìm x, biết: √(${p==1?'':p}x + ${q}) = ${r}`,x,[[r*r,'quên chuyển +'+q+' sang vế phải'],[(r-q)/p,'quên bình phương (đã bỏ dấu căn mà không bình phương vế phải)'],[(r*r+q)/p,'cộng '+q+' thay vì trừ khi chuyển vế'],[r*r-q,'quên chia cho '+p]],e,fd),[p,q,r]]})
);

/* ================= TỈ LỆ THỨC & ĐẠI LƯỢNG TỈ LỆ ================= */
addH('l7tlt',
/* x/a = y/b, y/c = z/d và x+y+z = S */
gen('tlt.xyz_chain',()=>{
 let a,b,c,d,L;do{a=R(2,9);b=R(2,9);c=R(2,9);d=R(2,9);L=lcm(b,c)}while(b==c||L>36);
 let px=a*L/b,py=L,pz=d*L/c;const g=gcd(gcd(px,py),pz);px/=g;py/=g;pz/=g;if(new Set([px,py,pz]).size<3)throw new Error('degenerate');
 const T=px+py+pz,k=R(2,9),S=k*T,
  e=sol([`Làm cho giá trị của y ở hai tỉ lệ thức bằng nhau: BCNN(${b}; ${c}) = ${L}.`,`${fh('x',a)} = ${fh('y',b)} ⟹ ${fh('x',a*L/b)} = ${fh('y',L)};  ${fh('y',c)} = ${fh('z',d)} ⟹ ${fh('y',L)} = ${fh('z',d*L/c)}.`,`Vậy x : y : z = ${a*L/b} : ${L} : ${d*L/c}${g>1?` = ${px} : ${py} : ${pz}`:''}. Áp dụng tính chất dãy tỉ số bằng nhau: ${fh('x',px)} = ${fh('y',py)} = ${fh('z',pz)} = ${fh('x + y + z',px+py+pz)} = ${fh(S,T)} = ${k}.`,`z = ${pz} × ${k} = ${pz*k}.`],`z = ${pz*k}.`,`Không được ghép thẳng x : y : z = ${a} : ${b} : ${d}: giá trị của y trong hai tỉ lệ thức phải bằng nhau trước.`);
 return[mc(`Cho ${fh('x',a)} = ${fh('y',b)} và ${fh('y',c)} = ${fh('z',d)}, biết x + y + z = ${S}. Giá trị của z là:`,pz*k,[[S*d/(a+b+d),`ghép thẳng ${a} : ${b} : ${d} mà chưa làm cho y bằng nhau`],[k,'đó là giá trị của một phần'],[pz,'đó là số phần của z, chưa nhân với giá trị một phần'],[py*k,'đó là giá trị của y']],e,fd),[a,b,c,d,S]]}),

/* x/a = y/b, xy = P */
gen('tlt.xy_tich',()=>{
 let a,b;do{a=R(2,7);b=R(2,7)}while(a==b);
 const t=R(2,9),Pp=a*b*t*t,x=a*t,y=b*t,
  e=sol([`Đặt ${fh('x',a)} = ${fh('y',b)} = t. Khi đó x = ${a}t và y = ${b}t.`,`x · y = ${a}t × ${b}t = ${a*b}t² = ${Pp}, nên t² = ${Pp} : ${a*b} = ${t*t}.`,`x, y dương nên t > 0, suy ra t = ${t}.`,`x = ${a} × ${t} = ${x}.`],`x = ${x}.`,`t² = ${t*t} cho t = ${t} (số dương), không phải t = ${t*t}.`);
 return[mc(`Cho hai số dương x, y thỏa mãn ${fh('x',a)} = ${fh('y',b)} và x · y = ${Pp}. Giá trị của x là:`,x,[[Pp/a,'chia tích cho hệ số tỉ lệ a'],[t,'đó là giá trị của t (hệ số tỉ lệ chung), chưa nhân với '+a],[y,'đó là giá trị của y'],[t*t*a,'dùng t² thay vì t']],e),[a,b,Pp]]}),

/* Tỉ lệ nghịch: thêm người giữa chừng */
gen('tlt.tln_nguoi',()=>{
 let N,D,d0,m,rem,days;
 do{N=P([6,8,10,12,15,20]);D=R(10,24);d0=R(3,D-4);m=R(2,10);rem=N*(D-d0);days=rem/(N+m)}while(!Number.isInteger(days)||days<2);
 const e=sol([`Toàn bộ công việc cần ${N} × ${D} = ${N*D} (công).`,`Sau ${d0} ngày đã làm được ${N} × ${d0} = ${N*d0} công, còn lại ${N*D} − ${N*d0} = ${rem} công.`,`Số người lúc sau: ${N} + ${m} = ${N+m}. Số ngày cần thêm = ${rem} : ${N+m} = ${days}.`],`cần thêm ${days} ngày.`,`Chỉ còn ${rem} công (không phải cả ${N*D} công) phải chia cho số người mới.`);
 return[mc(`Một nhóm ${N} công nhân làm xong một công việc trong ${D} ngày (năng suất mỗi người như nhau). Sau khi làm được ${d0} ngày, nhóm được bổ sung thêm ${m} công nhân (cùng năng suất). Hỏi cần thêm bao nhiêu ngày nữa để hoàn thành công việc?`,days,[[D-d0,'bỏ qua số người được bổ sung'],[d0+days,'đó là tổng số ngày làm việc, chưa trừ phần đã làm'],[N*D/(N+m)-d0,'tính như thể số người mới làm từ đầu'],[days+1,'cộng nhầm 1']],e,fd),[N,D,d0,m]]}),

/* Ba đội máy: số máy tỉ lệ nghịch với số ngày */
gen('tlt.tln_may',()=>{
 const[d1,d2,d3]=P([[3,5,6],[2,3,6],[3,4,6],[4,6,12],[2,4,5],[3,6,9],[4,5,10],[2,5,10]]),L=lcm(lcm(d1,d2),d3),p1=L/d1,p2=L/d2,p3=L/d3,k=R(2,8),D=k*(p1-p3),tot=k*(p1+p2+p3),
  e=sol([`Cùng một khối lượng công việc: số máy tỉ lệ nghịch với số ngày hoàn thành.`,`Số máy tỉ lệ với ${fh(1,d1)} : ${fh(1,d2)} : ${fh(1,d3)} = ${p1} : ${p2} : ${p3} (nhân cả ba số với BCNN(${d1}; ${d2}; ${d3}) = ${L}).`,`Hiệu số máy đội I và đội III ứng với ${p1} − ${p3} = ${p1-p3} phần, nên giá trị một phần = ${D} : ${p1-p3} = ${k}.`,`Tổng số máy = (${p1} + ${p2} + ${p3}) × ${k} = ${p1+p2+p3} × ${k} = ${tot}.`],`ba đội có tất cả ${tot} máy.`,`Ít ngày hơn thì cần NHIỀU máy hơn: tỉ lệ nghịch, không phải tỉ lệ thuận với ${d1} : ${d2} : ${d3}.`);
 return[mc(`Ba đội máy cày cùng cày trên ba cánh đồng có diện tích như nhau. Đội I hoàn thành trong ${d1} ngày, đội II trong ${d2} ngày, đội III trong ${d3} ngày. Biết đội I có nhiều hơn đội III ${D} máy (năng suất mỗi máy như nhau). Tổng số máy của ba đội là:`,tot,[[D*(d1+d2+d3)/(d3-d1),`coi số máy tỉ lệ thuận với số ngày (${d1} : ${d2} : ${d3})`],[p1+p2+p3,'đó là tổng số phần, chưa nhân với giá trị một phần'],[k*p1,'đó là số máy của đội I'],[D*(p1+p2+p3)/p1,'chia hiệu cho số phần của đội I thay vì hiệu số phần']],e,fd),[d1,d2,d3,D]]})
);

/* ================= ĐA THỨC ================= */
add('l7dt',
/* Hệ số của x^j trong tích hai đa thức */
gen('dt.he_so_tich',()=>{
 let a,b,c,d,e0;do{a=P([1,2,3,-1,-2,-3]);b=R(-5,5);c=R(-4,4);d=R(-5,5);e0=R(-5,5)}while(!b||!c||!d||!e0);
 const co=[b*e0,a*e0+b*d,a*d+b*c,a*c],j=P([1,2]),ans=co[j],[t1,t2]=j==2?[a*d,b*c]:[a*e0,b*d],
  A1=G7H.ps([b,a]),B1=G7H.ps([e0,d,c]),
  tl=j==2?[`(${a==1?'':a==-1?'−':a}x) · (${d}x) = ${t1}x² và (${b}) · (${c}x²) = ${t2}x²`]:[`(${a==1?'':a==-1?'−':a}x) · (${e0}) = ${t1}x và (${b}) · (${d}x) = ${t2}x`],
  e=sol([`Nhân từng hạng tử của đa thức thứ nhất với từng hạng tử của đa thức thứ hai.`,`Các tích cho hạng tử chứa x^${j}: ${tl[0]}.`,`Cộng các hệ số: ${t1} + (${t2}) = ${ans}.`],`hệ số của x^${j} là ${ans}.`,`Phải cộng ĐỦ các tích cùng bậc, kể cả dấu âm.`);
 return[mc(`Hệ số của x^${j} trong tích (${A1})(${B1}) là:`,ans,[[t1,`chỉ lấy một trong hai tích cho x^${j}`],[t2,`chỉ lấy một trong hai tích cho x^${j}`],[Math.abs(t1)+Math.abs(t2),'cộng giá trị tuyệt đối, bỏ qua dấu'],[co[j+1],`lấy nhầm hệ số của x^${j+1}`],[co[j-1],`lấy nhầm hệ số của x^${j-1}`]],e),[a,b,c,d,e0,j]]})
);

addH('l7dt',
/* Số nghiệm thực của đa thức đã phân tích */
gen('dt.so_nghiem',()=>{
 const t=R(0,2),a=R(2,6),b=a+R(1,4),q=R(1,9),pp=R(1,9);let E,ans,w,e;
 if(t==0){E=`(x − ${pp})(x^2 + ${q})`;ans=1;w=[[3,'tính cả hai nghiệm của x² + '+q+' = 0'],[2,'cho mỗi nhân tử đúng một nghiệm'],[0,'bỏ sót nghiệm x = '+pp+' của nhân tử bậc nhất']];
  e=sol([`Đa thức bằng 0 khi một trong các nhân tử bằng 0.`,`x − ${pp} = 0 cho x = ${pp}.`,`x² + ${q} = 0 ⟺ x² = −${q}: vô nghiệm vì x² ≥ 0 với mọi x.`],`có đúng 1 nghiệm.`,`x² + ${q} luôn dương nên không bao giờ bằng 0.`)}
 else if(t==1){E=`(x^2 − ${a*a})(x^2 + ${q})`;ans=2;w=[[4,'tính cả hai nghiệm của x² + '+q+' = 0'],[1,'quên nghiệm âm: x² = '+a*a+' cho x = ±'+a],[3,'đếm thừa một nghiệm']];
  e=sol([`x² − ${a*a} = 0 ⟺ x² = ${a*a} ⟺ x = ${a} hoặc x = −${a}: hai nghiệm.`,`x² + ${q} = 0 ⟺ x² = −${q}: vô nghiệm.`,`Vậy đa thức có đúng 2 nghiệm thực.`],`có đúng 2 nghiệm.`,`x² = ${a*a} luôn cho hai nghiệm đối nhau.`)}
 else{E=`(x^2 − ${a*a})(x^2 − ${b*b})`;ans=4;w=[[2,'chỉ lấy hai nghiệm dương'],[3,'đếm thiếu một nghiệm'],[1,'cho mỗi nhân tử một nghiệm']];
  e=sol([`x² − ${a*a} = 0 cho x = ±${a}: hai nghiệm.`,`x² − ${b*b} = 0 cho x = ±${b}: hai nghiệm.`,`${a} ≠ ${b} nên bốn nghiệm ${a}; −${a}; ${b}; −${b} khác nhau.`],`có đúng 4 nghiệm.`,`Mỗi nhân tử x² − k² cho hai nghiệm đối nhau.`)}
 return[mc(`Đa thức P(x) = ${E} có bao nhiêu nghiệm thực?`,ans,w,e),[t,pp,a,b,q]]}),

/* Tìm a để chia hết cho x − k */
gen('dt.chia_het_tim_a',()=>{
 const k=P([2,3]);let a,b;do{a=R(-6,6);b=R(-6,6)}while(!a||!b);
 const c=-(k**3+a*k*k+b*k),w3=(k**3+b*k-c)/(k*k),
  e=sol([`P(x) chia hết cho (x − ${k}) khi và chỉ khi x = ${k} là nghiệm của P(x), tức P(${k}) = 0.`,`P(${k}) = ${k}³ + a·${k}² ${sgn(b)} ${Math.abs(b)}·${k} ${sgn(c)} ${Math.abs(c)} = ${k**3} + ${k*k}a ${sgn(b*k)} ${Math.abs(b*k)} ${sgn(c)} ${Math.abs(c)} = 0.`,`${k*k}a = ${-(k**3+b*k+c)}, nên a = ${-(k**3+b*k+c)} : ${k*k} = ${a}.`],`a = ${a}.`,`Chuyển vế phải đổi dấu: ${k*k}a = −(${k**3+b*k+c}).`),
  w=[[-a,'quên đổi dấu khi chuyển vế'],[a*k,`chia cho ${k} thay vì ${k*k}`]];if(Number.isInteger(w3))w.push([w3,`dùng nghiệm x = −${k} (nhầm dấu của x − ${k})`]);
 return[mc(`Tìm số nguyên a để đa thức P(x) = x^3 + ax^2 ${sgn(b)} ${Math.abs(b)}x ${sgn(c)} ${Math.abs(c)} chia hết cho x − ${k}.`,a,w,e),[k,b,c]]}),

/* Xác định a, b khi biết P(1), P(2) */
gen('dt.xac_dinh_ab',()=>{
 let a,b;do{a=R(-6,6);b=R(-6,6)}while(!a||!b||a==b||a==-b);
 const m=1+a+b,n=4+2*a+b,str=(u,v)=>`a = ${ng(u)}, b = ${ng(v)}`,
  e=sol([`P(1) = 1 + a + b = ${m} ⟹ a + b = ${m-1}.`,`P(2) = 4 + 2a + b = ${n} ⟹ 2a + b = ${n-4}.`,`Trừ hai đẳng thức: (2a + b) − (a + b) = ${n-4} − ${m-1}, tức a = ${a}.`,`b = ${m-1} − (${a}) = ${b}.`],`${str(a,b)}.`,`Thử lại: P(1) = 1 + ${a} + ${b} = ${m}; P(2) = 4 + ${2*a} + ${b} = ${n}.`);
 return[mc(`Cho đa thức P(x) = x^2 + ax + b. Biết P(1) = ${m} và P(2) = ${n}. Giá trị của a và b là:`,str(a,b),[[str(b,a),'đảo vai trò của a và b'],[str(-a,b),'sai dấu của a'],[str(a,-b),'sai dấu của b']],e,String),[m,n]]})
);
})();
