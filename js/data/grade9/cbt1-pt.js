/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì I (KNTT)" — phương trình tích, phương trình chứa ẩn ở mẫu, bất đẳng thức, bất phương trình (v15)
   Chủ đề l9pt (mã pt1.*) và l9bpt (mã bd.*, bp2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles9b.js */
(()=>{const {add,addH,gn,M,Iq,fh,fq,fd,lin,cf,ng}=G8H,{rat,F,xp,tm,sg,roots,two,nzc,ab}=G9X,
fx=r=>r?`(${xp(-r)})`:'x',        /* thừa số (x − r), r = 0 thì chỉ viết x */
OPS=['>','<','≥','≤'],REV={'>':'<','<':'>','≥':'≤','≤':'≥'};

/* ================= PHƯƠNG TRÌNH TÍCH, PHƯƠNG TRÌNH CHỨA ẨN Ở MẪU: CƠ BẢN ================= */
add('l9pt',
gn('pt1.tich_don',()=>{const a=R(1,4),c=R(1,4),b=nzc(8),d=nzc(8),r1=-b/a,r2=-d/c;if(Math.abs(r1-r2)<1e-9)throw 0;
 return[M(`Giải phương trình (${lin(a,b)})(${lin(c,d)}) = 0.`,roots([r1,r2]),[roots([-r1,-r2]),roots([-r1,r2]),roots([r1,-r2]),roots([r1+1,r2])],
  [`Phương trình tích A·B = 0 khi A = 0 hoặc B = 0.`,
   `${lin(a,b)} = 0 nên ${cf(a)}x = ${ng(-b)}, suy ra x = ${rat(r1)}.`,
   `${lin(c,d)} = 0 nên ${cf(c)}x = ${ng(-d)}, suy ra x = ${rat(r2)}.`],'',String),[a,b,c,d]]}),

gn('pt1.tich_3',()=>{const s=sh([-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]).slice(0,3).sort((p,q)=>p-q),t=R(0,2),
 v=t==0?s[0]+s[1]+s[2]:t==1?s[2]:s.filter(r=>r<0).length,
 ask=['tổng các nghiệm','nghiệm lớn nhất','số nghiệm âm'][t];
 return[Iq(`Phương trình ${s.map(fx).join('')} = 0 ${['có tổng các nghiệm bằng bao nhiêu?','có nghiệm lớn nhất bằng bao nhiêu?','có bao nhiêu nghiệm âm?'][t]}`,v,
  [`Tích bằng 0 khi có một thừa số bằng 0: ${s.map(r=>r?`${xp(-r)} = 0`:'x = 0').join(' hoặc ')}.`,
   `Suy ra các nghiệm là ${s.map(r=>`x = ${ng(r)}`).join('; ')}.`,
   t==0?`Tổng các nghiệm: ${s.map(pa).join(' + ')} = ${ng(v)}.`:t==1?`Nghiệm lớn nhất là ${ng(v)}.`:`Các nghiệm âm: ${s.filter(r=>r<0).map(ng).join('; ')||'không có'}, nên có ${v} nghiệm âm.`],'',ng(v)),[t]]}),

gn('pt1.hdt_chung',()=>{const t=R(0,1),m=R(2,9),k=nzc(7);if(t==0&&k==-2*m)throw 0;
 const eq=t==0?`x^2 − ${m*m} = ${cf(k)}(x + ${m})`:`x^2 − ${2*m}x + ${m*m} = ${cf(k)}(x − ${m})`,rs=t==0?[-m,m+k]:[m,m+k];
 return[M(`Giải phương trình ${eq}.`,roots(rs),[roots(rs.map(v=>-v)),roots([rs[0],-rs[1]]),roots([-rs[0],rs[1]]),roots([rs[0],rs[1]+1])],
  t==0?[`Chuyển vế: x² − ${m*m} − ${k<0?`(${ng(k)})`:cf(k)}(x + ${m}) = 0.`,
   `Phân tích: (x − ${m})(x + ${m}) − ${k<0?`(${ng(k)})`:cf(k)}(x + ${m}) = (x + ${m})(${xp(-m-k)}) = 0.`,
   `x + ${m} = 0 nên x = ${ng(-m)}; ${xp(-m-k)} = 0 nên x = ${ng(m+k)}.`]
  :[`Chuyển vế: x² − ${2*m}x + ${m*m} − ${k<0?`(${ng(k)})`:cf(k)}(x − ${m}) = 0, tức (x − ${m})² − ${k<0?`(${ng(k)})`:cf(k)}(x − ${m}) = 0.`,
   `Đặt nhân tử chung (x − ${m}): (x − ${m})(${xp(-m-k)}) = 0.`,
   `x − ${m} = 0 nên x = ${m}; ${xp(-m-k)} = 0 nên x = ${ng(m+k)}.`],'',String),[t,m,k]]}),

gn('pt1.nhom',()=>{const r=nzc(8),s=nzc(8);if(r==s)throw 0;const rs=[r,s];
 return[M(`Giải phương trình x^2${tm(-r,'x')}${tm(-s,'x')}${tm(r*s)} = 0.`,roots(rs),[roots([-r,-s]),roots([-r,s]),roots([r,-s]),roots([r+1,s])],
  [`Nhóm các hạng tử: (x² ${sg(-r)} ${ab(r)==1?'':ab(r)}x) ${sg(-s)} (${ab(s)==1?'':ab(s)}x ${sg(s*r)} ${ab(r*s)}) = 0.`,
   `Đặt nhân tử chung: x(${xp(-r)}) ${sg(-s)} ${ab(s)==1?'':ab(s)}(${xp(-r)}) = (${xp(-r)})(${xp(-s)}) = 0.`,
   `${xp(-r)} = 0 nên x = ${ng(r)}; ${xp(-s)} = 0 nên x = ${ng(s)}.`],'',String),[r,s]]}),

gn('pt1.bac_nhat',()=>{const a=P([2,3,4,-2,-3]),c=P([2,3,4,-2,-3]),b=nzc(6),p=nzc(5),q=nzc(5),x0=nzc(7);if(a==c)throw 0;
 const d=(a-c)*x0+a*p+b-c*q;
 return[Iq(`Giải phương trình ${ng(a)}(${xp(p)})${tm(b)} = ${ng(c)}(${xp(q)})${tm(d)}.`,x0,
  [`Khai triển hai vế: vế trái = ${lin(a,a*p+b)}, vế phải = ${lin(c,c*q+d)}.`,
   `Chuyển các hạng tử chứa x sang một vế, hằng số sang vế kia: ${cf(a-c)}x = ${ng(c*q+d)} − ${pa(a*p+b)} = ${ng(c*q+d-a*p-b)}.`,
   `Chia hai vế cho ${ng(a-c)}: x = ${ng(x0)}.`],'',`x = ${ng(x0)}`),[a,c,b,p,q,d]]}),

gn('pt1.dkxd',()=>{const a=nzc(7),b=nzc(7);if(ab(a)==ab(b))throw 0;const A=nzc(5),B=nzc(5),C=nzc(8);
 return[M(`Điều kiện xác định của phương trình ${fh(ng(A),xp(-a))} ${sg(B)} ${fh(ab(B),xp(b))} = ${ng(C)} là`,two(a,-b),[two(-a,b),two(a,b),two(-a,-b)],
  [`Phương trình có ẩn ở mẫu xác định khi mọi mẫu thức đều khác 0.`,
   `${xp(-a)} ≠ 0 nên x ≠ ${ng(a)}; ${xp(b)} ≠ 0 nên x ≠ ${ng(-b)}.`],'',String),[a,b]]}),

gn('pt1.lam_chung',()=>{const [a,b]=sh(P([[12,24],[10,15],[15,30],[20,30],[6,12],[30,60],[8,24],[10,40],[20,60],[6,3],[4,12],[20,5],[24,24],[18,9],[36,18],[16,48],[45,90],[30,15],[40,60],[28,84]])),T=a*b/(a+b),w=F.add([1,a],[1,b]);
 if(!Number.isInteger(T))throw 0;
 return[Iq(`Một người làm một mình xong công việc trong ${a} giờ, người thứ hai làm một mình xong công việc đó trong ${b} giờ. Hỏi nếu hai người cùng làm thì sau bao nhiêu giờ xong công việc?`,T,
  [`Mỗi giờ người thứ nhất làm được ${fh(1,a)} công việc, người thứ hai làm được ${fh(1,b)} công việc.`,
   `Gọi x (giờ) là thời gian làm chung. Ta có phương trình ${fh('x',a)} + ${fh('x',b)} = 1, tức x·(${fh(1,a)} + ${fh(1,b)}) = 1.`,
   `Tính ${fh(1,a)} + ${fh(1,b)} = ${F.s(w)}, nên x = 1 : ${F.s(w)} = ${T}.`],'',`${T} giờ`),[a,b]]}));

/* ================= NÂNG CAO ================= */
addH('l9pt',
gn('pt1.mau_don',()=>{const t=R(0,1),p=nzc(5);let q,st,x0;
 if(t==0){const c=nzc(4),u=nzc(5),a=c*u;x0=p+u;
  q=`Giải phương trình ${fh(ng(a),xp(-p))} = ${ng(c)}.`;
  st=[`Điều kiện xác định: ${xp(-p)} ≠ 0, tức x ≠ ${ng(p)}.`,
   `Nhân hai vế với (${xp(-p)}): ${ng(a)} = ${ng(c)}(${xp(-p)}).`,
   `Chia hai vế cho ${ng(c)}: ${xp(-p)} = ${ng(u)}, suy ra x = ${ng(x0)}. Giá trị này thỏa mãn điều kiện x ≠ ${ng(p)}.`]}
 else{const k=P([2,3,4,-1,-2,-3]);x0=nzc(6);if(x0==p)throw 0;const m=(k-1)*x0-k*p;
  q=`Giải phương trình ${fh(xp(m),xp(-p))} = ${ng(k)}.`;
  st=[`Điều kiện xác định: x ≠ ${ng(p)}.`,
   `Nhân hai vế với (${xp(-p)}): ${xp(m)} = ${ng(k)}(${xp(-p)}), tức ${xp(m)} = ${lin(k,-k*p)}.`,
   `Chuyển vế: ${ng(m+k*p)} = ${cf(k-1)}x, suy ra x = ${ng(x0)}. Giá trị này thỏa mãn điều kiện x ≠ ${ng(p)}.`]}
 return[Iq(q,x0,st,'',`x = ${ng(x0)}`),[t]]}),

gn('pt1.mau_loai',()=>{const r=nzc(6),s=nzc(6);if(r==s)throw 0;
 return[M(`Tập nghiệm của phương trình ${fh(`(${xp(-r)})(${xp(-s)})`,xp(-r))} = 0 là`,roots([s]),[roots([r,s]),roots([r]),'Phương trình vô nghiệm'],
  [`Điều kiện xác định: ${xp(-r)} ≠ 0, tức x ≠ ${ng(r)}.`,
   `Phân thức bằng 0 khi tử bằng 0: (${xp(-r)})(${xp(-s)}) = 0, suy ra x = ${ng(r)} hoặc x = ${ng(s)}.`,
   `Đối chiếu điều kiện: loại x = ${ng(r)}, nhận x = ${ng(s)}.`],'',String),[r,s]]}),

gn('pt1.mau_chung',()=>{const a=nzc(5),b=nzc(5),A=nzc(4),B=nzc(4),x0=R(-6,6);if(a==b||A+B==0||x0==a||x0==b)throw 0;
 const C=(A+B)*x0-A*b-B*a;
 return[Iq(`Giải phương trình ${fh(ng(A),xp(-a))} ${sg(B)} ${fh(ab(B),xp(-b))} = ${fh(ng(C),`(${xp(-a)})(${xp(-b)})`)}.`,x0,
  [`Điều kiện xác định: x ≠ ${ng(a)} và x ≠ ${ng(b)}.`,
   `Quy đồng rồi khử mẫu: ${ng(A)}(${xp(-b)}) ${sg(B)} ${ab(B)}(${xp(-a)}) = ${ng(C)}.`,
   `Khai triển và thu gọn: ${cf(A+B)}x ${sg(-(A*b+B*a))} ${ab(A*b+B*a)} = ${ng(C)}, suy ra ${cf(A+B)}x = ${ng(C+A*b+B*a)}.`,
   `Vậy x = ${ng(x0)}, thỏa mãn điều kiện.`],'',`x = ${ng(x0)}`),[a,b,A,B,C]]}),

gn('pt1.hai_binh',()=>{const a=R(1,4),c=R(1,4),b=nzc(6),d=nzc(6);if(a==c)throw 0;
 const x1=(d-b)/(a-c),x2=(-d-b)/(a+c);if(Math.abs(x1-x2)<1e-9)throw 0;
 return[M(`Giải phương trình (${lin(a,b)})^2 = (${lin(c,d)})^2.`,roots([x1,x2]),[roots([x1]),roots([x2]),roots([-x1,-x2]),roots([x1,-x2])],
  [`Chuyển vế và dùng hằng đẳng thức A² − B² = (A − B)(A + B): (${lin(a,b)} − (${lin(c,d)}))(${lin(a,b)} + (${lin(c,d)})) = 0.`,
   `Thu gọn: (${lin(a-c,b-d)})(${lin(a+c,b+d)}) = 0.`,
   `${lin(a-c,b-d)} = 0 nên x = ${rat(x1)}; ${lin(a+c,b+d)} = 0 nên x = ${rat(x2)}.`],'',String),[a,b,c,d]]}),

gn('pt1.so_nghiem',()=>{const s=R(1,6),r1=R(-6,6),r2=R(-6,6),set=new Set([s,-s,r1,r2]);
 return[Iq(`Phương trình (x^2 − ${s*s})${fx(r1)}${fx(r2)} = 0 có bao nhiêu nghiệm phân biệt?`,set.size,
  [`Tích bằng 0 khi một thừa số bằng 0. Phân tích x² − ${s*s} = (x − ${s})(x + ${s}).`,
   `Các nghiệm là x = ${ng(s)}, x = ${ng(-s)}, x = ${ng(r1)}, x = ${ng(r2)}.`,
   `Các giá trị khác nhau: ${[...set].sort((p,q)=>p-q).map(ng).join('; ')}. Vậy có ${set.size} nghiệm phân biệt.`],'',`${set.size} nghiệm`),[s,r1,r2]]}));

/* ================= BẤT ĐẲNG THỨC, BẤT PHƯƠNG TRÌNH ================= */
add('l9bpt',
gn('bd.dao_dau',()=>{const m=P([2,3,4,5,-1,-2,-3,-4,-5]),op=P(OPS),ans=m>0?op:REV[op],A=o=>`a ${o} b`;
 return[M(`Cho ${cf(m)}a ${op} ${cf(m)}b. Khẳng định nào sau đây đúng?`,A(ans),OPS.filter(o=>o!=ans).map(A),
  [`Chia hai vế của bất đẳng thức cho ${ng(m)}.`,
   m>0?`${ng(m)} là số dương nên giữ nguyên chiều: a ${op} b.`:`${ng(m)} là số âm nên phải đổi chiều: a ${REV[op]} b.`],'',String),[m,op]]}),

gn('bd.suy_ra',()=>{const k=P([2,3,4,5,-2,-3,-4]),n=nzc(6),m=nzc(5),op=P(['>','<']),res=k>0?op:REV[op],sd=res=='>'?1:-1,S=(o,v)=>`${lin(k,n,'a')} ${o} ${ng(v)}`;
 return[M(`Cho a ${op} ${ng(m)}. Khẳng định nào sau đây đúng?`,S(res,k*m+n),[S(REV[res],k*m+n),S(res,k*m+n+sd*ab(n)),S(res,k*m+n+sd*ab(k)),S(res,k*m+n+sd*(ab(n)+ab(k))),S(REV[res],k*m+n+sd*ab(n))],
  [`Nhân hai vế của a ${op} ${ng(m)} với ${ng(k)}: ${k>0?'giữ nguyên chiều':'đổi chiều (vì nhân với số âm)'}, ta được ${cf(k)}a ${res} ${ng(k*m)}.`,
   `Cộng hai vế với ${ng(n)} (giữ nguyên chiều): ${lin(k,n,'a')} ${res} ${ng(k*m)} ${sg(n)} ${ab(n)} = ${ng(k*m+n)}.`],'',String),[k,n,m,op]]}),

gn('bp2.mau_so',()=>{const a=nzc(3),b=nzc(3),p=nzc(6),q=nzc(6),m=R(2,6),n=R(2,6),op=P(OPS),K=n*a-m*b,Rr=m*q-n*p;if(K==0||Rr==0)throw 0;
 const o2=K>0?op:REV[op],r=Rr/K,S=(o,v)=>`x ${o} ${rat(v)}`;
 return[M(`Giải bất phương trình ${fh(lin(a,p),m)} ${op} ${fh(lin(b,q),n)}.`,S(o2,r),[S(REV[o2],r),S(o2,-r),S(REV[o2],-r),S(o2,(m*q+n*p)/K)],
  [`Nhân hai vế với ${m*n} (số dương nên giữ nguyên chiều): ${n}(${lin(a,p)}) ${op} ${m}(${lin(b,q)}).`,
   `Khai triển: ${lin(n*a,n*p)} ${op} ${lin(m*b,m*q)}. Chuyển vế: ${cf(K)}x ${op} ${ng(Rr)}.`,
   K>0?`Chia hai vế cho ${K} (số dương, giữ chiều): x ${o2} ${rat(r)}.`:`Chia hai vế cho ${ng(K)} (số âm nên đổi chiều): x ${o2} ${rat(r)}.`],'',String),[a,b,p,q,m,n,op]]}));

addH('l9bpt',
gn('bd.gtnn',()=>{const t=R(0,1),a=nzc(6),c=nzc(10),A=t==0?`x^2${tm(-2*a,'x')}${tm(c)}`:`−x^2${tm(2*a,'x')}${tm(c)}`,v=t==0?c-a*a:c+a*a;
 return[Iq(`Tìm giá trị ${t==0?'nhỏ':'lớn'} nhất của biểu thức ${t==0?'A':'B'} = ${A}.`,v,
  t==0?[`Biến đổi: A = x² ${sg(-2*a)} ${ab(2*a)}x ${sg(c)} ${ab(c)} = (${xp(-a)})² ${sg(c-a*a)} ${ab(c-a*a)}.`,
   `Vì (${xp(-a)})² ≥ 0 với mọi x nên A ≥ ${ng(v)}.`,`Dấu "=" xảy ra khi x = ${ng(a)}. Vậy giá trị nhỏ nhất của A là ${ng(v)}.`]
  :[`Biến đổi: B = −(x² ${sg(-2*a)} ${ab(2*a)}x) ${sg(c)} ${ab(c)} = −(${xp(-a)})² ${sg(c+a*a)} ${ab(c+a*a)}.`,
   `Vì −(${xp(-a)})² ≤ 0 với mọi x nên B ≤ ${ng(v)}.`,`Dấu "=" xảy ra khi x = ${ng(a)}. Vậy giá trị lớn nhất của B là ${ng(v)}.`],'',String(v).replace('-','−')),[t,a,c]]}),

gn('bd.co_si',()=>{const t=R(0,1),s=R(2,9),a=t?R(2,6):1,b=a*s*s,v=2*a*s;
 return[Iq(`Cho x > 0. Tìm giá trị nhỏ nhất của biểu thức A = ${a==1?'x':a+'x'} + ${fh(b,'x')}.`,v,
  [`Với x > 0, áp dụng bất đẳng thức Cô-si cho hai số dương ${a==1?'x':a+'x'} và ${fh(b,'x')}: A ≥ 2√(${a==1?'x':a+'x'}·${fh(b,'x')}) = 2√${a*b}.`,
   `Vì ${a*b} = ${a*s}² nên 2√${a*b} = 2·${a*s} = ${v}.`,
   `Dấu "=" xảy ra khi ${a==1?'x':a+'x'} = ${fh(b,'x')}, tức x² = ${s*s}, x = ${s} (thỏa x > 0). Vậy giá trị nhỏ nhất của A là ${v}.`],'',String(v)),[t,s,a]]}),

gn('bd.max_tich',()=>{const S=2*R(2,25),t=R(0,1),v=(S/2)**2;
 return[Iq(t==0?`Cho hai số dương a, b có a + b = ${S}. Tìm giá trị lớn nhất của tích ab.`:`Với 0 < x < ${S}, tìm giá trị lớn nhất của biểu thức A = x(${S} − x).`,v,
  t==0?[`Với a, b > 0, ta có (a − b)² ≥ 0, suy ra (a + b)² ≥ 4ab, tức ab ≤ ${fh('(a + b)^2',4)}.`,
   `Thay a + b = ${S}: ab ≤ ${fh(S*S,4)} = ${v}.`,`Dấu "=" xảy ra khi a = b = ${S/2}. Vậy giá trị lớn nhất của ab là ${v}.`]
  :[`Đặt a = x, b = ${S} − x (a, b > 0, a + b = ${S}). Khi đó A = ab.`,
   `Vì (a − b)² ≥ 0 nên 4ab ≤ (a + b)² = ${S*S}, suy ra A ≤ ${v}.`,`Dấu "=" xảy ra khi x = ${S} − x, tức x = ${S/2}. Vậy giá trị lớn nhất của A là ${v}.`],'',String(v)),[S,t]]}),

gn('bp2.kep',()=>{const a=R(1,3),b=nzc(6),lo=R(-9,0),hi=R(lo+3,lo+12),o1=P(['<','≤']),o2=P(['<','≤']);
 const L=[];for(let x=-300;x<=300;x++){const v=a*x+b;if((o1=='<'?lo<v:lo<=v)&&(o2=='<'?v<hi:v<=hi))L.push(x)}
 if(L.length<3||L.length>9)throw 0;const S=L.reduce((p,q)=>p+q,0);
 return[Iq(`Tính tổng các số nguyên x thỏa mãn ${ng(lo)} ${o1} ${lin(a,b)} ${o2} ${ng(hi)}.`,S,
  [`${b>0?`Trừ cả ba vế cho ${b}`:`Cộng cả ba vế với ${ab(b)}`}: ${ng(lo-b)} ${o1} ${cf(a)}x ${o2} ${ng(hi-b)}.`,
   a==1?`Hệ số của x bằng 1 nên ${ng(lo-b)} ${o1} x ${o2} ${ng(hi-b)}.`:`Chia cả ba vế cho ${a}: ${rat((lo-b)/a)} ${o1} x ${o2} ${rat((hi-b)/a)}.`,
   `Các số nguyên x thỏa mãn là ${L.map(ng).join('; ')}.`,
   `Tổng: ${L.map(pa).join(' + ')} = ${ng(S)}.`],'',`${ng(S)}`),[a,b,lo,hi,o1,o2]]}));
})();
