/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì I (KNTT)" — Chương III: căn bậc hai, căn bậc ba, phép tính về căn thức, phương trình chứa căn (v15)
   Chủ đề l9can (mã cb.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles9b.js */
(()=>{const {add,addH,gn,M,Iq,fh,fq,fr,fd,lin,cf,ng,rad,sqs}=G8H,{rat,F,xp,tm,sg,roots,nzc,ab}=G9X,
SF=[2,3,5,6,7,10,11,13,14,15],       /* các số không chứa thừa số chính phương */
fx=r=>r?`(${xp(-r)})`:'x';

/* ================= CƠ BẢN ================= */
add('l9can',
gn('cb.cbh_ps',()=>{const t=R(0,1);
 if(t==0){const [a,b]=cop(2,9).sort((p,q)=>p-q);
  return[M(`Tính √(${fh(a*a,b*b)}).`,fq(a,b),[fq(a*a,b),fq(a,b*b),fq(b,a),fq(a*a,b*b)],
   [`Căn bậc hai của một phân số bằng căn của tử chia cho căn của mẫu: √(${fh('A','B')}) = ${fh('√A','√B')}.`,
    `${a*a} = ${a}² và ${b*b} = ${b}², nên √(${fh(a*a,b*b)}) = ${fh(a,b)}.`],'',String),[t,a,b]]}
 const u=R(2,9);
 return[M(`Tính √${fd(u*u/100)}.`,fd(u/10),[fd(u*u/10),fd(u/100),fd(2*u/10),fd(u*u/100+0.1)],
  [`Viết ${fd(u*u/100)} = ${fh(u*u,100)} = (${fh(u,10)})².`,`Do đó √${fd(u*u/100)} = ${fh(u,10)} = ${fd(u/10)}.`],'',String),[t,u]]}),

gn('cb.can3_tinh',()=>{const p=nzc(5),q=nzc(5),s=P([1,-1]),v=p+s*q;
 return[Iq(`Tính giá trị biểu thức ∛(${ng(p**3)}) ${s>0?'+':'−'} ∛(${ng(q**3)}).`,v,
  [`Căn bậc ba xác định với mọi số thực: ∛(${ng(p**3)}) = ${ng(p)} vì ${pa(p)}³ = ${ng(p**3)}.`,
   `∛(${ng(q**3)}) = ${ng(q)} vì ${pa(q)}³ = ${ng(q**3)}.`,
   `Vậy biểu thức bằng ${ng(p)} ${s>0?'+':'−'} ${pa(q)} = ${ng(v)}.`],'',ng(v)),[p,q,s]]}),

gn('cb.so_sanh2',()=>{const k1=R(1,6),k2=R(1,6),m1=P(SF),m2=P(SF),A=rad(k1,m1),B=rad(k2,m2),x=k1*k1*m1,y=k2*k2*m2;
 if(x==y||A==B)throw 0;const gt=x>y;
 return[M(`So sánh hai số ${A} và ${B}.`,`${A} ${gt?'>':'<'} ${B}`,[`${A} ${gt?'<':'>'} ${B}`,`${A} = ${B}`,'Không so sánh được'],
  [`Đưa thừa số vào trong dấu căn: ${A} = √(${k1}²·${m1}) = √${x}, ${B} = √(${k2}²·${m2}) = √${y}.`,
   `Vì ${x} ${gt?'>':'<'} ${y} nên √${x} ${gt?'>':'<'} √${y}, tức ${A} ${gt?'>':'<'} ${B}.`],'',String),[k1,m1,k2,m2]]}),

gn('cb.dua_vao',()=>{const k=R(2,9),m=P(SF);
 return[M(`Đưa thừa số vào trong dấu căn: ${k}√${m} =`,`√${k*k*m}`,[`√${k*m}`,`√${k*k+m}`,`√${k*m*m}`,`√${2*k*m}`],
  [`Với k > 0, ta có k = √(k²) nên ${k}√${m} = √(${k}²)·√${m}.`,`Dùng √a·√b = √(ab): ${k}√${m} = √(${k*k}·${m}) = √${k*k*m}.`],'',String),[k,m]]}),

gn('cb.khu_mau',()=>{let a,b;do{a=P(SF);b=P(SF)}while(gcd(a,b)!=1||a==b);
 return[M(`Khử mẫu của biểu thức lấy căn: √(${fh(a,b)}).`,fh('√'+a*b,b),[fh('√'+a*b,a),fh('√'+a,b),fh('√'+a*b,b*b),fh('√'+(a+b),b)],
  [`Nhân cả tử và mẫu của phân số trong căn với ${b} để mẫu thành số chính phương: √(${fh(a,b)}) = √(${fh(a*b,b*b)}).`,
   `Khai căn: √(${fh(a*b,b*b)}) = ${fh('√'+a*b,'√'+b*b)} = ${fh('√'+a*b,b)}.`],'',String),[a,b]]}),

gn('cb.khai_trien',()=>{const a=R(1,6),b=R(1,4),m=P([2,3,5,7]),s=P([1,-1]),o=s>0?'+':'−',o2=s>0?'−':'+',
 f=(p,q,op)=>`${p} ${op} ${q}√${m}`;
 return[M(`Khai triển và thu gọn (${a} ${o} ${b==1?'':b}√${m})^2.`,f(a*a+b*b*m,2*a*b,o),[`${a*a+b*b*m}`,f(a*a+b*b*m,2*a*b,o2),f(a*a+b*m,2*a*b,o),f(a*a+b*b*m,a*b,o)],
  [`Dùng hằng đẳng thức (A ${o} B)² = A² ${o} 2AB + B² với A = ${a}, B = ${b==1?'':b}√${m}.`,
   `A² = ${a*a}; 2AB = 2·${a}·${b==1?'':b}√${m} = ${2*a*b}√${m}; B² = ${b*b}·${m} = ${b*b*m}.`,
   `Kết quả: ${a*a} ${o} ${2*a*b}√${m} + ${b*b*m} = ${f(a*a+b*b*m,2*a*b,o)}.`],'',String),[a,b,m,s]]}),

gn('cb.pt_vn',()=>{const t=R(0,1),c=R(1,6),a=R(1,3),x1=R(-3,10),b=c*c-a*x1,neg=t==0;
 const vn='Phương trình vô nghiệm',X=v=>`x = ${ng(v)}`;
 return[M(`Tập nghiệm của phương trình √(${lin(a,b)}) = ${neg?'−':''}${c} là`,neg?vn:X(x1),neg?[X(x1),X(-x1),X(x1+1)]:[vn,X(-x1),X(x1+1)],
  neg?[`Căn bậc hai số học √A luôn không âm, còn vế phải bằng ${ng(-c)} là số âm.`,`Hai vế không thể bằng nhau với mọi x, nên phương trình vô nghiệm.`]
  :[`Điều kiện: ${lin(a,b)} ≥ 0. Vế phải ${c} > 0 nên bình phương hai vế: ${lin(a,b)} = ${c*c}.`,
    `${cf(a)}x = ${ng(c*c-b)}, suy ra x = ${ng(x1)}. Kiểm tra: ${lin(a,b).replace(/x/g,`(${ng(x1)})`)} = ${c*c} ≥ 0 nên nhận.`],'',String),[t,c,a,b]]}),

gn('cb.pt_d3',()=>{const a=R(1,5),c=R(1,5),x0=R(-3,8),b=nzc(8),d=(a-c)*x0+b,v=a*x0+b;if(a==c||v<0)throw 0;
 return[Iq(`Giải phương trình √(${lin(a,b)}) = √(${lin(c,d)}).`,x0,
  [`Bình phương hai vế (hai vế đều là căn bậc hai): ${lin(a,b)} = ${lin(c,d)}.`,
   `Chuyển vế: ${cf(a-c)}x = ${ng(d-b)}, suy ra x = ${ng(x0)}.`,
   `Thử lại: ${lin(a,b).replace(/x/g,`(${ng(x0)})`)} = ${v} ≥ 0 và ${lin(c,d).replace(/x/g,`(${ng(x0)})`)} = ${v} ≥ 0 nên x = ${ng(x0)} thỏa mãn.`],'',`x = ${ng(x0)}`),[a,b,c,d]]}),

gn('cb.gia_tri_bt',()=>{const a=R(1,8),b=R(1,8),s=R(1,7),n=s*s;
 return[Iq(`Tính giá trị của biểu thức A = ${fh(`√x + ${a}`,`√x + ${b}`)} khi x = ${n}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(s+a,s+b),
  [`Với x = ${n} thì √x = √${n} = ${s}.`,`Thay vào: A = ${fh(`${s} + ${a}`,`${s} + ${b}`)} = ${fh(s+a,s+b)}.`,`Rút gọn phân số: A = ${fq(s+a,s+b)}.`],'',fq(s+a,s+b)),[a,b,s]]}));

/* ================= NÂNG CAO ================= */
addH('l9can',
gn('cb.rut_gon_phan',()=>{let a,b;do{a=P(SF);b=P(SF)}while(a==b);const [k,m]=sqs(a*b),R1=rad(k,m);
 return[M(`Rút gọn biểu thức ${fh(`${a}√${b} − ${b}√${a}`,`√${a} − √${b}`)}.`,R1,[`√${a} − √${b}`,`√${a} + √${b}`,`√${a+b}`,`${a*b}`],
  [`Ở tử: ${a}√${b} = √${a}·√${a}·√${b} và ${b}√${a} = √${b}·√${b}·√${a}, nên ${a}√${b} − ${b}√${a} = √${a}·√${b}·(√${a} − √${b}).`,
   `Rút gọn nhân tử (√${a} − √${b}) ở tử và mẫu: biểu thức bằng √${a}·√${b} = √${a*b}.`,
   ...(k>1?[`Đưa thừa số ra ngoài dấu căn: √${a*b} = ${R1}.`]:[])],'',String),[a,b]]}),

gn('cb.tong_lien_hop',()=>{const p0=R(1,5),s=p0+R(2,9),m=p0*p0,n=s*s;
 return[Iq(`Tính S = ${fh(1,`√${m} + √${m+1}`)} + ${fh(1,`√${m+1} + √${m+2}`)} + ... + ${fh(1,`√${n-1} + √${n}`)}.`,s-p0,
  [`Trục căn thức từng số hạng: ${fh(1,'√k + √(k + 1)')} = √(k + 1) − √k (nhân tử và mẫu với √(k + 1) − √k, mẫu bằng 1).`,
   `Khi đó S = (√${m+1} − √${m}) + (√${m+2} − √${m+1}) + ... + (√${n} − √${n-1}); các số hạng ở giữa triệt tiêu.`,
   `S = √${n} − √${m} = ${s} − ${p0} = ${s-p0}.`],'',String(s-p0)),[s]]}),

gn('cb.pt_d2',()=>{const c=P([-3,-2,-1,1,2,3,4,5]),r1=c+R(0,5),r2=c-R(1,4),p=r1+r2-2*c,q=c*c-r1*r2;if(p==0)throw 0;
 return[Iq(`Giải phương trình √(${lin(p,q)}) = ${xp(-c)}.`,r1,
  [`Điều kiện: vế phải ${xp(-c)} ≥ 0, tức x ≥ ${ng(c)} (khi đó biểu thức dưới căn bằng bình phương nên không âm).`,
   `Bình phương hai vế: ${lin(p,q)} = (${xp(-c)})², tức x² ${sg(-(2*c+p))} ${ab(2*c+p)==1?'':ab(2*c+p)}x ${sg(c*c-q)} ${ab(c*c-q)} = 0.`,
   `Phân tích: ${fx(r1)}${fx(r2)} = 0, suy ra x = ${ng(r1)} hoặc x = ${ng(r2)}.`,
   `Đối chiếu điều kiện x ≥ ${ng(c)}: nhận x = ${ng(r1)}, loại x = ${ng(r2)}.`],'',`x = ${ng(r1)}`),[c,p,q]]}),

gn('cb.pt_d4',()=>{const t=R(0,1),a=nzc(6),k=R(1,7);
 return[M(`Giải phương trình ${t?`√(x^2 ${sg(-2*a)} ${ab(2*a)==1?'':ab(2*a)}x ${sg(a*a)} ${a*a})`:`√((${xp(-a)})^2)`} = ${k}.`,roots([a-k,a+k]),[roots([a+k]),roots([a-k]),roots([-a-k,-a+k]),roots([k])],
  [t?`Nhận xét: x² ${sg(-2*a)} ${ab(2*a)==1?'':ab(2*a)}x ${sg(a*a)} ${a*a} = (${xp(-a)})².`:`Dùng √(A²) = |A| với A = ${xp(-a)}.`,
   `Phương trình trở thành |${xp(-a)}| = ${k}, suy ra ${xp(-a)} = ${k} hoặc ${xp(-a)} = −${k}.`,
   `Giải ra x = ${ng(a+k)} hoặc x = ${ng(a-k)}.`],'',String),[t,a,k]]}),

gn('cb.pt_tich',()=>{const a=nzc(6),b=nzc(6);if(a==b)throw 0;const ok=a>b,
 ans=ok?roots([a,b]):roots([b]),vn='Phương trình vô nghiệm';
 return[M(`Giải phương trình (${xp(-a)})√(${xp(-b)}) = 0.`,ans,[roots([b]),roots([a,b]),roots([a]),vn].filter(v=>v!=ans),
  [`Điều kiện xác định: ${xp(-b)} ≥ 0, tức x ≥ ${ng(b)}.`,
   `Tích bằng 0 khi ${xp(-a)} = 0 hoặc √(${xp(-b)}) = 0, tức x = ${ng(a)} hoặc x = ${ng(b)}.`,
   ok?`Cả hai giá trị đều thỏa x ≥ ${ng(b)} (vì ${ng(a)} > ${ng(b)}), nên phương trình có hai nghiệm.`:`x = ${ng(a)} không thỏa x ≥ ${ng(b)} (vì ${ng(a)} < ${ng(b)}) nên bị loại; chỉ nhận x = ${ng(b)}.`],'',String),[a,b]]}),

gn('cb.pt_d7',()=>{const x0=R(-4,10),u=R(0,6),v=R(0,6),a=u*u-x0,b=v*v-x0,c=u+v;if(u==v||c==0||ab(a)>40||ab(b)>40)throw 0;
 const T=c*c-a-b;
 return[Iq(`Giải phương trình √(${xp(a)}) + √(${xp(b)}) = ${c}.`,x0,
  [`Điều kiện: x ≥ ${ng(-a)} và x ≥ ${ng(-b)}.`,
   `Bình phương hai vế: (${xp(a)}) + (${xp(b)}) + 2√((${xp(a)})(${xp(b)})) = ${c*c}, suy ra 2√((${xp(a)})(${xp(b)})) = ${ng(T)} − 2x.`,
   `Bình phương lần nữa (vế phải phải không âm): 4(${xp(a)})(${xp(b)}) = (${ng(T)} − 2x)². Rút gọn các hạng tử x² được ${4*c*c}x = ${ng(T*T-4*a*b)}.`,
   `Suy ra x = ${ng(x0)}. Thử lại: √${x0+a} + √${x0+b} = ${u} + ${v} = ${c}, đúng.`],'',`x = ${ng(x0)}`),[a,b,c]]}),

gn('cb.tim_x_bt',()=>{const k=P([2,3,4]),b=R(1,5),t=R(2,8),a=k*b+(k-1)*t;
 return[Iq(`Tìm x (x ≥ 0) để ${fh(`√x + ${a}`,`√x + ${b}`)} = ${k}.`,t*t,
  [`Vì √x + ${b} > 0 nên có thể nhân hai vế với (√x + ${b}): √x + ${a} = ${k}(√x + ${b}).`,
   `Khai triển: √x + ${a} = ${k}√x + ${k*b}, suy ra ${ng(1-k)}√x = ${ng(k*b-a)}, tức √x = ${t}.`,
   `Bình phương hai vế: x = ${t*t}.`],'',`x = ${t*t}`),[k,a,b]]}));
})();
