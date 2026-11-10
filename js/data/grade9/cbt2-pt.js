/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì II (KNTT)" — phương trình bậc hai một ẩn, định lý Viète, phương trình chứa ẩn ở mẫu (v16)
   Chủ đề l9ptb2 (mã pb2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles9c.js */
(()=>{const {add,addH,gn,M,Iq,fh,fq,fr,fd,lin,cf,ng,PL}=G8H,{F,xp,tm,sg,nzc,ab}=G9X,
q2=(a,b,c)=>PL.str(PL.norm([[a,2],[b,1],[c,0]])),            /* ax² + bx + c */
qm=(a,b,c)=>PL.str(PL.norm([[a,2],[b,1],[c,0]]),'m'),        /* am² + bm + c */
SQF=[2,3,5,6,7,10,11,13],
isq=n=>n>=0&&Number.isInteger(Math.sqrt(n)),
neg=v=>F.nf([-v[0],v[1]]),
par=v=>(v[0]<0||v[1]!=1)?`(${F.s(v)})`:F.s(v),                /* phân số hoặc số âm đặt trong ngoặc khi thay số */
rl=l=>[...l].sort((p,q)=>p[0]/p[1]-q[0]/q[1]).map(r=>`x = ${fq(r[0],r[1])}`).join('; '),   /* danh sách nghiệm [tử, mẫu] tăng dần */
cn=v=>ab(v)==1?'':ab(v),
/* nghiệm dạng (p ± k√d)/a: trả về cặp chuỗi */
sr=(p,k,d,a)=>{const rt=(k==1?'':k)+'√'+d,pl=p?`${ng(p)} + ${rt}`:rt,mi=p?`${ng(p)} − ${rt}`:'−'+rt;return a==1?[pl,mi]:[fh(pl,a),fh(mi,a)]},
xs2=(p,k,d,a)=>{const[u,v]=sr(p,k,d,a);return `x = ${u}; x = ${v}`};

/* ================= PHƯƠNG TRÌNH BẬC HAI: CƠ BẢN ================= */
add('l9ptb2',
gn('pb2.nhan_biet',()=>{const mk=()=>{const t=R(0,5),a=nzc(5),b=nzc(8),c=nzc(9),k=R(2,6);
 return[[`${q2(a,R(-6,6),c)} = 0`,1,'có dạng ax^2 + bx + c = 0 với a ≠ 0'],[`${cf(a)}x^2 = ${ng(c)}`,1,'đưa được về dạng ax^2 + c = 0 với a ≠ 0'],[`${lin(a,b)} = 0`,0,'là phương trình bậc nhất'],[`x^3${tm(b,'x')}${tm(c)} = 0`,0,'chứa x^3 nên là phương trình bậc ba'],[`x^2 + ${fh(k,'x')}${tm(c)} = 0`,0,'có x ở mẫu'],[`x^2${tm(b,'x')}${tm(c)} = x^2 + ${k}`,0,'sau khi chuyển vế, x^2 triệt tiêu nên là phương trình bậc nhất']][t]},
 L=[mk(),mk(),mk(),mk()],n=L.filter(x=>x[1]).length;
 if(new Set(L.map(x=>x[0])).size<4)throw 0;
 return[M(`Cho các phương trình: ${L.map((x,i)=>`(${i+1}) ${x[0]}`).join('; ')}. Có bao nhiêu phương trình là phương trình bậc hai một ẩn?`,n,[0,1,2,3,4].filter(v=>v!=n),
  [`Phương trình bậc hai một ẩn x có dạng ax^2 + bx + c = 0 với a ≠ 0.`,...L.map((x,i)=>`(${i+1}) ${x[0]}: ${x[1]?'là phương trình bậc hai, ':'không phải, '}${x[2]}.`),`Có ${n} phương trình bậc hai một ẩn.`],'',String),[L.map(x=>x[0])]]}),

gn('pb2.dk_bac_hai',()=>{const t=R(0,2),r=nzc(7),k=R(2,4),b=nzc(8),c=nzc(8),
 A=t==0?lin(1,-r,'m'):t==1?lin(k,-k*r,'m'):lin(-1,r,'m');
 return[M(`Phương trình (${A})x^2${tm(b,'x')}${tm(c)} = 0 (m là tham số) là phương trình bậc hai một ẩn x khi`,`m ≠ ${ng(r)}`,[`m = ${ng(r)}`,`m ≠ ${ng(-r)}`,`m > ${ng(r)}`,`m < ${ng(r)}`],
  [`Phương trình ax^2 + bx + c = 0 là bậc hai khi a ≠ 0.`,`Ở đây hệ số của x^2 là a = ${A}, nên cần ${A} ≠ 0.`,`${A} = 0 khi m = ${ng(r)}. Vậy m ≠ ${ng(r)}.`],'',String),[t,r]]}),

gn('pb2.thu_gon',()=>{let f=null;
 for(let i=0;i<300&&!f;i++){const a=P([1,1,2,3]),b1=nzc(6),d=P(SQF),c=(b1*b1-d)/a;if(Number.isInteger(c)&&c)f={a,b1,d,c}}
 if(!f)throw 0;const {a,b1,d,c}=f,p=-b1,A=xs2(p,1,d,a);
 return[M(`Giải phương trình ${q2(a,2*b1,c)} = 0 bằng công thức nghiệm thu gọn.`,A,[xs2(-p,1,d,a),xs2(p,2,d,a),xs2(p,1,d,a+1),xs2(-p,1,d,a+1)].filter(x=>x!=A),
  [`Phương trình có a = ${a}, b = ${ng(2*b1)} nên b′ = ${ng(b1)}, c = ${ng(c)}.`,`Δ′ = b′^2 − ac = ${pa(b1)}^2 − ${a}·${pa(c)} = ${d} > 0 nên phương trình có hai nghiệm phân biệt.`,`x = ${a==1?'−b′ ± √Δ′':fh('−b′ ± √Δ′','a')} = ${a==1?`${ng(-b1)} ± √${d}`:fh(`${ng(-b1)} ± √${d}`,a)}.`,`Hai nghiệm: ${A}.`],'',String),[a,b1,c]]}),

gn('pb2.viet_cap',()=>{const a=R(1,4),b=nzc(9),c=nzc(9),D=b*b-4*a*c;if(D<=0)throw 0;
 const S=F.nf([-b,a]),Pp=F.nf([c,a]),f=(s,p)=>`x₁ + x₂ = ${F.s(s)}; x₁x₂ = ${F.s(p)}`;
 return[M(`Gọi x₁, x₂ là hai nghiệm của phương trình ${q2(a,b,c)} = 0. Không giải phương trình, ta có`,f(S,Pp),[f(neg(S),Pp),f(S,neg(Pp)),f(neg(S),neg(Pp))],
  [`Δ = ${pa(b)}^2 − 4·${a}·${pa(c)} = ${D} > 0 nên phương trình có hai nghiệm phân biệt x₁, x₂.`,`Theo hệ thức Viète: x₁ + x₂ = ${fh('−b','a')} = ${F.s(S)}.`,`x₁x₂ = ${fh('c','a')} = ${F.s(Pp)}.`],'',String),[a,b,c]]}),

gn('pb2.nham_abc',()=>{const t=R(0,1),a=P([R(2,60),R(100,2999)]),c0=R(1,P([60,2999])),c=P([c0,-c0]);if(c0==a)throw 0;
 const b=t==0?-(a+c):a+c;if(!b)throw 0;
 const x1=t==0?[1,1]:[-1,1],x2=F.nf([t==0?c:-c,a]),inv=F.nf([a,t==0?c:-c]);if(x2[0]==x1[0]&&x2[1]==x1[1])throw 0;
 const A=rl([x1,x2]),W=[rl([neg(x1),neg(x2)]),rl([x1,inv]),rl([neg(x1),x2]),rl([x1,neg(x2)])].filter(x=>x!=A);
 return[M(`Không tính biệt thức Δ, hãy nhẩm nghiệm của phương trình ${q2(a,b,c)} = 0.`,A,W,
  [t==0?`Ta có a + b + c = ${a} + ${pa(b)} + ${pa(c)} = 0.`:`Ta có a − b + c = ${a} − ${pa(b)} + ${pa(c)} = 0.`,
   t==0?`Do đó phương trình có hai nghiệm x₁ = 1 và x₂ = ${fh('c','a')}.`:`Do đó phương trình có hai nghiệm x₁ = −1 và x₂ = ${fh('−c','a')}.`,
   `Tính x₂ = ${F.s(x2)}. Vậy ${A}.`],'',String),[a,b,c]]}),

gn('pb2.lap_tong_tich',()=>{const u=nzc(8),v=nzc(8),S=u+v,Pp=u*v;if(!S||u==v)throw 0;
 const A=`${q2(1,-S,Pp)} = 0`;
 return[M(`Hai số có tổng bằng ${ng(S)} và tích bằng ${ng(Pp)} là hai nghiệm của phương trình nào sau đây?`,A,[`${q2(1,S,Pp)} = 0`,`${q2(1,-S,-Pp)} = 0`,`${q2(1,S,-Pp)} = 0`],
  [`Hai số u, v có tổng S = u + v và tích P = uv là hai nghiệm của phương trình x^2 − Sx + P = 0.`,`Ở đây S = ${ng(S)}, P = ${ng(Pp)}.`,`Phương trình cần tìm: x^2 − (${ng(S)})x + (${ng(Pp)}) = 0, tức ${A}.`],'',String),[S,Pp]]}),

gn('pb2.hai_so_uv',()=>{const u=R(-9,8),v=R(u+1,9),S=u+v,Pp=u*v;if(!Pp||!S)throw 0;
 const f=(p,q)=>{[p,q]=[p,q].sort((x,y)=>x-y);return `u = ${ng(p)}; v = ${ng(q)}`},A=f(u,v);
 return[M(`Tìm hai số u và v (u < v), biết u + v = ${ng(S)} và uv = ${ng(Pp)}.`,A,[f(-u,-v),f(u+1,v-1),f(u-1,v+1),f(u+2,v-2)].filter(x=>x!=A),
  [`u và v là hai nghiệm của phương trình x^2 − Sx + P = 0, tức ${q2(1,-S,Pp)} = 0.`,`Δ = ${pa(-S)}^2 − 4·${pa(Pp)} = ${S*S-4*Pp} = ${Math.sqrt(S*S-4*Pp)}^2.`,`Hai nghiệm là ${ng(u)} và ${ng(v)}; vì u < v nên u = ${ng(u)}, v = ${ng(v)}.`],'',String),[u,v]]}),

gn('pb2.nghiem_con_lai',()=>{const t=R(0,1);
 if(t==0){const S=R(3,12),r=R(-4,9),o=S-r;if(r==o)throw 0;
  return[Iq(`Biết phương trình x^2${tm(-S,'x')} + m = 0 có một nghiệm bằng ${ng(r)}. Tìm nghiệm còn lại.`,o,[`Gọi nghiệm còn lại là x₂, theo Viète: x₁ + x₂ = ${S}.`,`Với x₁ = ${ng(r)} ta có x₂ = ${S} − ${pa(r)} = ${ng(o)}.`],'',`x = ${ng(o)}`),[t]]}
 const r=nzc(6),o=nzc(8),c=r*o;if(r==o)throw 0;
 return[Iq(`Biết phương trình x^2 + mx${tm(c)} = 0 có một nghiệm bằng ${ng(r)}. Tìm nghiệm còn lại.`,o,[`Gọi nghiệm còn lại là x₂, theo Viète: x₁x₂ = ${fh('c','a')} = ${ng(c)}.`,`Với x₁ = ${ng(r)} ta có x₂ = ${ng(c)} : ${pa(r)} = ${ng(o)}.`],'',`x = ${ng(o)}`),[t]]}));

/* ================= PHƯƠNG TRÌNH BẬC HAI, ĐỊNH LÝ VIÈTE: NÂNG CAO ================= */
/* các biểu thức đối xứng: t = đề, m = biến đổi, tp = theo S, P, f = giá trị (S, P là phân số [tử, mẫu]) */
const kk=v=>ab(v)==1?'':ab(v)+'·',
 EXP=()=>{const k=R(1,4)*P([1,-1]),c=nzc(5),p=R(2,3),q=nzc(2);return[
 {t:'x₁^2 + x₂^2',m:'(x₁ + x₂)^2 − 2x₁x₂',tp:'S^2 − 2P',f:(S,Q)=>F.sub(F.mul(S,S),F.mul([2,1],Q))},
 {t:'x₁^3 + x₂^3',m:'(x₁ + x₂)^3 − 3x₁x₂(x₁ + x₂)',tp:'S^3 − 3·P·S',f:(S,Q)=>F.sub(F.mul(S,F.mul(S,S)),F.mul([3,1],F.mul(Q,S)))},
 {t:'(x₁ − x₂)^2',m:'(x₁ + x₂)^2 − 4x₁x₂',tp:'S^2 − 4P',f:(S,Q)=>F.sub(F.mul(S,S),F.mul([4,1],Q))},
 {t:`${fh(1,'x₁')} + ${fh(1,'x₂')}`,m:fh('x₁ + x₂','x₁x₂'),tp:'S : P',f:(S,Q)=>F.div(S,Q)},
 {t:`${fh('x₁','x₂')} + ${fh('x₂','x₁')}`,m:fh('x₁^2 + x₂^2','x₁x₂'),tp:'(S^2 − 2P) : P',f:(S,Q)=>F.div(F.sub(F.mul(S,S),F.mul([2,1],Q)),Q)},
 {t:'x₁^2x₂ + x₁x₂^2',m:'x₁x₂(x₁ + x₂)',tp:'P·S',f:(S,Q)=>F.mul(Q,S)},
 {t:`(x₁ ${sg(k)} ${ab(k)})(x₂ ${sg(k)} ${ab(k)})`,m:`x₁x₂ ${sg(k)} ${ab(k)}(x₁ + x₂) + ${k*k}`,tp:`P ${sg(k)} ${kk(k)}S + ${k*k}`,f:(S,Q)=>F.add(F.add(Q,F.mul([k,1],S)),[k*k,1])},
 {t:`x₁^2 + x₂^2 ${sg(c)} ${cn(c)}x₁x₂`,m:`(x₁ + x₂)^2 ${c-2?`${sg(c-2)} ${cn(c-2)}x₁x₂`:''}`.trim(),tp:`S^2 ${c-2?`${sg(c-2)} ${kk(c-2)}P`:''}`.trim(),f:(S,Q)=>F.add(F.mul(S,S),F.mul([c-2,1],Q))},
 {t:'x₁^4 + x₂^4',m:'(x₁^2 + x₂^2)^2 − 2(x₁x₂)^2',tp:'(S^2 − 2P)^2 − 2P^2',f:(S,Q)=>{const w=F.sub(F.mul(S,S),F.mul([2,1],Q));return F.sub(F.mul(w,w),F.mul([2,1],F.mul(Q,Q)))}},
 {t:`(${p}x₁ ${sg(q)} ${ab(q)})(${p}x₂ ${sg(q)} ${ab(q)})`,m:`${p*p}x₁x₂ ${sg(p*q)} ${ab(p*q)}(x₁ + x₂) + ${q*q}`,tp:`${p*p}P ${sg(p*q)} ${ab(p*q)}·S + ${q*q}`,f:(S,Q)=>F.add(F.add(F.mul([p*p,1],Q),F.mul([p*q,1],S)),[q*q,1])}]};
addH('l9ptb2',
gn('pb2.dx_bt',()=>{const a=P([1,1,1,2,3]),b=nzc(9),c=nzc(9),D=b*b-4*a*c;if(D<=0)throw 0;
 const E=P(EXP()),S=F.nf([-b,a]),Q=F.nf([c,a]),val=E.f(S,Q),sub=E.tp.replace(/S/g,par(S)).replace(/P/g,par(Q)),non=val[1]!=1;
 return[Iq(`Gọi x₁, x₂ là hai nghiệm của phương trình ${q2(a,b,c)} = 0. Không giải phương trình, tính giá trị biểu thức A = ${E.t}.${non?' (Nhập số nguyên hoặc phân số a/b tối giản.)':''}`,F.sa(val),
  [`Δ = ${pa(b)}^2 − 4·${a}·${pa(c)} = ${D} > 0 nên phương trình có hai nghiệm phân biệt x₁, x₂.`,`Theo Viète: S = x₁ + x₂ = ${F.s(S)}; P = x₁x₂ = ${F.s(Q)}.`,`Biến đổi: A = ${E.m} = ${E.tp}.`,`Thay S = ${F.s(S)}, P = ${F.s(Q)}: A = ${sub} = ${F.s(val)}.`],'',`A = ${F.s(val)}`),[a,b,c]]}),

gn('pb2.viet_m_tong',()=>{const p=P([-3,-2,-1,1,2,3]),m1=R(-6,6),m2=-4*p-m1;if(m1==m2)throw 0;
 let q=null;for(let i=0;i<80&&q==null;i++){const qq=R(-9,9),d1=2*p*m1+p*p-qq,d2=2*p*m2+p*p-qq;if(d1>0&&d2<0)q=qq}
 if(q==null)throw 0;
 const k=2*m1*m1+8*p*m1+4*p*p-2*q,t=F.nf([q-p*p,2*p]),dl=m=>2*p*m+p*p-q;
 return[Iq(`Cho phương trình x^2 − 2(${lin(1,p,'m')})x + m^2${tm(q)} = 0 (m là tham số). Tìm giá trị của m để phương trình có hai nghiệm x₁, x₂ thỏa mãn x₁^2 + x₂^2 = ${k}.`,m1,
  [`Δ′ = (${lin(1,p,'m')})^2 − (m^2${tm(q)}) = ${lin(2*p,p*p-q,'m')}. Phương trình có nghiệm khi Δ′ ≥ 0, tức m ${p>0?'≥':'≤'} ${F.s(t)}.`,
   `Theo Viète: x₁ + x₂ = 2(${lin(1,p,'m')}); x₁x₂ = m^2${tm(q)}.`,
   `x₁^2 + x₂^2 = (x₁ + x₂)^2 − 2x₁x₂ = 4(${lin(1,p,'m')})^2 − 2(m^2${tm(q)}) = ${qm(2,8*p,4*p*p-2*q)}.`,
   `Từ ${qm(2,8*p,4*p*p-2*q)} = ${k} ta có ${qm(2,8*p,4*p*p-2*q-k)} = 0, tức ${qm(1,4*p,m1*m2)} = 0. Giải ra m = ${ng(Math.min(m1,m2))} hoặc m = ${ng(Math.max(m1,m2))}.`,
   `Kiểm tra điều kiện: m = ${ng(m1)} thì Δ′ = ${ng(dl(m1))} > 0 (nhận); m = ${ng(m2)} thì Δ′ = ${ng(dl(m2))} < 0 (loại).`],'',`m = ${ng(m1)}`),[p,q,m1]]}),

gn('pb2.he_thuc',()=>{const t=R(0,1),th=nzc(6);let r1,r2,cond,sol;
 if(t==0){const k=P([2,3,4,-2,-3]),u=nzc(3);r1=k*u;r2=u;cond=`x₁ = ${cf(k)}x₂`;sol=[`Thay x₁ = ${cf(k)}x₂ vào x₁ + x₂ = S: ${ng(k+1)}x₂ = ${ng(r1+r2)}, suy ra x₂ = ${ng(r2)} và x₁ = ${ng(r1)}.`]}
 else{const k=P([2,3,-2,-3,-1]);r1=R(-6,6);r2=R(-6,6);if(r1==r2)throw 0;const c=r1+k*r2;cond=`x₁ ${sg(k)} ${cn(k)}x₂ = ${ng(c)}`;
  sol=[`Trừ vế theo vế hai phương trình x₁ + ${pa(k)}x₂ = ${ng(c)} và x₁ + x₂ = ${ng(r1+r2)}: ${cf(k-1)}x₂ = ${ng(c-r1-r2)}, suy ra x₂ = ${ng(r2)}.`,`Từ x₁ + x₂ = ${ng(r1+r2)} ta được x₁ = ${ng(r1)}.`]}
 const S=r1+r2;if(!S)throw 0;const m=r1*r2-th;
 return[Iq(`Cho phương trình x^2${tm(-S,'x')} + ${lin(1,th,'m')} = 0 (m là tham số) có hai nghiệm x₁, x₂. Tìm m để ${cond}.`,m,
  [`Theo Viète: x₁ + x₂ = S = ${ng(S)}; x₁x₂ = ${lin(1,th,'m')}.`,...sol,`Do đó x₁x₂ = ${pa(r1)}·${pa(r2)} = ${ng(r1*r2)}, nên ${lin(1,th,'m')} = ${ng(r1*r2)}, suy ra m = ${ng(m)}.`,`Kiểm tra: Δ = ${pa(S)}^2 − 4·${pa(r1*r2)} = ${S*S-4*r1*r2} = ${pa(r1-r2)}^2 > 0 nên phương trình có hai nghiệm phân biệt.`],'',`m = ${ng(m)}`),[t,m]]}),

gn('pb2.dau_nghiem',()=>{const s=nzc(4),t=nzc(6),k=R(0,3),eq=`x^2${tm(-2*s,'x')} + ${lin(1,t,'m')} = 0`,hi=s*s-t,lo=-t;
 let what,ans,W,st;
 if(k==0){what='hai nghiệm trái dấu';ans=`m < ${ng(lo)}`;W=[`m > ${ng(lo)}`,`m < ${ng(hi)}`,`${ng(lo)} < m < ${ng(hi)}`];st=[`Hai nghiệm trái dấu khi x₁x₂ < 0 (khi đó Δ′ > 0 nên không cần xét thêm).`,`x₁x₂ = ${lin(1,t,'m')} < 0 ⟺ m < ${ng(lo)}.`]}
 else if(k==1){what='hai nghiệm cùng dấu';ans=`${ng(lo)} < m ≤ ${ng(hi)}`;W=[`${ng(lo)} < m < ${ng(hi)}`,`m > ${ng(lo)}`,`m ≤ ${ng(hi)}`];st=[`Hai nghiệm cùng dấu khi Δ′ ≥ 0 và x₁x₂ > 0.`,`Δ′ = ${pa(s)}^2 − (${lin(1,t,'m')}) = ${ng(hi)} − m ≥ 0 ⟺ m ≤ ${ng(hi)}.`,`x₁x₂ = ${lin(1,t,'m')} > 0 ⟺ m > ${ng(lo)}.`,`Kết hợp: ${ans}.`]}
 else{what=s>0?'hai nghiệm dương phân biệt':'hai nghiệm âm phân biệt';ans=`${ng(lo)} < m < ${ng(hi)}`;W=[`${ng(lo)} < m ≤ ${ng(hi)}`,`m > ${ng(lo)}`,`m < ${ng(hi)}`];
  st=[`Cần Δ′ > 0, x₁x₂ > 0 và x₁ + x₂ ${s>0?'> 0':'< 0'}.`,`Δ′ = ${pa(s)}^2 − (${lin(1,t,'m')}) = ${ng(hi)} − m > 0 ⟺ m < ${ng(hi)}.`,`x₁ + x₂ = ${ng(2*s)} ${s>0?'> 0':'< 0'} (luôn đúng); x₁x₂ = ${lin(1,t,'m')} > 0 ⟺ m > ${ng(lo)}.`,`Kết hợp: ${ans}.`]}
 if(ab(hi)==ab(lo)&&hi==lo)throw 0;
 return[M(`Tìm m để phương trình ${eq} có ${what}.`,ans,W,st,'',String),[s,t,k]]}),

gn('pb2.delta_m',()=>{const p=nzc(4),q=R(-6,6),k=R(0,3),t=F.nf([q-p*p,2*p]);if(k==3&&t[0]==0)throw 0;
 const OP=['>','<','≥','≤'],lab=o=>`m ${o} ${F.s(t)}`,eq=`x^2 − 2(${lin(1,p,'m')})x + m^2${tm(q)} = 0`,dl=lin(2*p,p*p-q,'m'),
 pos=p>0?'>':'<',pe=p>0?'≥':'≤',ng_=p>0?'<':'>',rule=['Δ′ > 0','Δ′ ≥ 0','Δ′ < 0','Δ′ = 0'][k],op=rule.split(' ')[1],
 verb=['có hai nghiệm phân biệt','có nghiệm','vô nghiệm','có nghiệm kép'][k];let ans,W;
 if(k==0){ans=lab(pos);W=OP.filter(o=>o!=pos).map(lab)}else if(k==1){ans=lab(pe);W=OP.filter(o=>o!=pe).map(lab)}
 else if(k==2){ans=lab(ng_);W=OP.filter(o=>o!=ng_).map(lab)}else{ans=`m = ${F.s(t)}`;W=[`m = ${F.s(neg(t))}`,`m = ${F.s(F.mul(t,[2,1]))}`,`m = ${F.s(F.add(t,[1,1]))}`]}
 return[M(`Tìm m để phương trình ${eq} ${verb}.`,ans,W,
  [`Phương trình có a = 1, b′ = −(${lin(1,p,'m')}), c = m^2${tm(q)}.`,`Δ′ = (${lin(1,p,'m')})^2 − (m^2${tm(q)}) = ${dl}.`,
   `Phương trình ${verb} khi ${rule}, tức ${dl} ${op} 0.`,
   `${cf(2*p)}m ${op} ${ng(q-p*p)}. Chia hai vế cho ${ng(2*p)}${p<0&&k!=3?' (số âm nên đổi chiều bất đẳng thức)':''}: ${ans}.`],'',String),[p,q,k]]}),

gn('pb2.tuyet_doi',()=>{const sc=R(0,2),lam=nzc(4),c1=nzc(4),c2=nzc(4);let a,b,c,D,S,Q,f=null;
 for(let i=0;i<400&&!f;i++){a=P([1,1,2]);b=nzc(9);c=nzc(9);D=b*b-4*a*c;S=F.nf([-b,a]);Q=F.nf([c,a]);
  if(D>0&&(sc==0?Q[0]<0:sc==1?Q[0]>0&&S[0]>0:Q[0]>0&&S[0]<0))f=1}
 if(!f)throw 0;
 const c3=sc==2?lam+c1:lam-c1,c4=sc==0?lam+c2:sc==1?lam-c2:lam+c2,T=[[c1,'|x₁|'],[c2,'|x₂|'],[c3,'x₁'],[c4,'x₂']].filter(x=>x[0]);
 if(T.length<3)throw 0;
 const ex=T.map(([k,s],i)=>(i?(k<0?' − ':' + '):(k<0?'−':''))+cn(k)+s).join(''),val=F.mul([lam,1],S),
  sgn=['|x₁| = x₁ và |x₂| = −x₂','|x₁| = x₁ và |x₂| = x₂','|x₁| = −x₁ và |x₂| = −x₂'][sc],
  why=['x₁x₂ = '+F.s(Q)+' < 0 nên hai nghiệm trái dấu; vì x₁ > x₂ nên x₁ > 0 > x₂','x₁x₂ = '+F.s(Q)+' > 0 và x₁ + x₂ = '+F.s(S)+' > 0 nên hai nghiệm cùng dương','x₁x₂ = '+F.s(Q)+' > 0 và x₁ + x₂ = '+F.s(S)+' < 0 nên hai nghiệm cùng âm'][sc],
  non=val[1]!=1,s1=sc==2?'(−x₁)':'x₁',s2=sc==1?'x₂':'(−x₂)',exSub=[[c1,s1],[c2,s2],[c3,'x₁'],[c4,'x₂']].filter(x=>x[0]).map(([k,sy],i)=>(i?(k<0?' − ':' + '):(k<0?'−':''))+cn(k)+sy).join('');
 return[Iq(`Cho phương trình ${q2(a,b,c)} = 0 có hai nghiệm x₁, x₂ với x₁ > x₂. Tính giá trị biểu thức T = ${ex}.${non?' (Nhập số nguyên hoặc phân số a/b tối giản.)':''}`,F.sa(val),
  [`Δ = ${pa(b)}^2 − 4·${a}·${pa(c)} = ${D} > 0. Theo Viète: x₁ + x₂ = ${F.s(S)}; x₁x₂ = ${F.s(Q)}.`,`Xét dấu: ${why}, do đó ${sgn}.`,`Bỏ dấu giá trị tuyệt đối: T = ${exSub} = ${lam==1?'x₁ + x₂':`${cf(lam)}x₁ ${sg(lam)} ${cn(lam)}x₂ = ${cf(lam)}(x₁ + x₂)`}.`,`Thay x₁ + x₂ = ${F.s(S)}: T = ${ng(lam)}·${par(S)} = ${F.s(val)}.`],'',`T = ${F.s(val)}`),[sc,lam]]}),

gn('pb2.ct_can',()=>{const t=R(0,1);let S,k,ans,e,why;
 if(t==0){const tt=R(3,9);k=R(1,Math.floor((tt*tt-1)/4));S=tt*tt-2*k;ans=tt;e=`√x₁ + √x₂`;
  why=[`A > 0 và A^2 = x₁ + x₂ + 2√(x₁x₂) = ${S} + 2√${k*k} = ${S} + 2·${k} = ${tt*tt}.`,`Vì A > 0 nên A = √${tt*tt} = ${tt}.`]}
 else{const u=R(1,6);k=R(1,12);S=u*u+2*k;ans=u;e=`√x₁ − √x₂`;
  why=[`Vì x₁ > x₂ > 0 nên B > 0 và B^2 = x₁ + x₂ − 2√(x₁x₂) = ${S} − 2√${k*k} = ${S} − 2·${k} = ${u*u}.`,`Vì B > 0 nên B = √${u*u} = ${u}.`]}
 const nm=t==0?'A':'B';
 return[Iq(`Cho phương trình x^2 − ${S}x + ${k*k} = 0 có hai nghiệm dương${t==0?'':' phân biệt'} x₁, x₂${t==0?'':' với x₁ > x₂'}. Tính giá trị biểu thức ${nm} = ${e}.`,ans,
  [`Theo Viète: x₁ + x₂ = ${S}; x₁x₂ = ${k*k}, suy ra √(x₁x₂) = ${k}.`,...why],'',`${nm} = ${ans}`),[t,S,k]]}),

gn('pb2.min_tong_bp',()=>{let f=null;
 for(let i=0;i<400&&!f;i++){const p=nzc(3),c=P([-4,-3,-2,-1,1,2,3,4]),d=R(-8,8),X=c*c-4*p*c+4*d;if(X<0)f={p,c,d,X}}
 if(!f)throw 0;const {p,c,d,X}=f,B=8*p-2*c,C=4*p*p-2*d,h=F.nf([4*p-c,4]),mstar=F.nf([c-4*p,4]),mn=F.sub([C,1],[(4*p-c)*(4*p-c),4]),askM=R(0,1),hs=h[0]==0?'m':`(m ${sg(h[0])} ${F.s([ab(h[0]),h[1]])})`;
 return[Iq(`Cho phương trình x^2 − 2(${lin(1,p,'m')})x${tm(c,'m')}${tm(d)} = 0 (m là tham số) luôn có hai nghiệm x₁, x₂. ${askM?'Tìm giá trị của m để A = x₁^2 + x₂^2 có giá trị nhỏ nhất.':'Tìm giá trị nhỏ nhất của A = x₁^2 + x₂^2.'} (Nhập số nguyên hoặc phân số a/b tối giản.)`,F.sa(askM?mstar:mn),
  [`Δ′ = (${lin(1,p,'m')})^2 − (${lin(c,d,'m')}) = ${qm(1,2*p-c,p*p-d)}. Tam thức này có Δ = ${pa(2*p-c)}^2 − 4·${pa(p*p-d)} = ${ng(X)} < 0 nên Δ′ > 0 với mọi m.`,
   `Theo Viète: x₁ + x₂ = 2(${lin(1,p,'m')}); x₁x₂ = ${lin(c,d,'m')}.`,
   `A = (x₁ + x₂)^2 − 2x₁x₂ = 4(${lin(1,p,'m')})^2 − 2(${lin(c,d,'m')}) = ${qm(4,B,C)}.`,
   `Hoàn thiện bình phương: A = 4${hs}^2 + ${F.s(mn)}.`,
   `Vì 4${hs}^2 ≥ 0 nên A ≥ ${F.s(mn)}; dấu "=" xảy ra khi m = ${F.s(mstar)}.`],'',askM?`m = ${F.s(mstar)}`:`A nhỏ nhất bằng ${F.s(mn)}`),[p,c,d]]}),

gn('pb2.mau_hai_phan',()=>{let f=null;
 for(let i=0;i<6000&&!f;i++){const u=R(-5,5),v=R(-5,5),a=nzc(6),b=nzc(6),c=P([1,2,3,4,-1,-2,-3]);if(u==v)continue;
  const A=c,B=-(c*(u+v)+a+b),C=c*u*v+a*v+b*u,D=B*B-4*A*C;if(D<=0||!isq(D))continue;
  const s=Math.sqrt(D),r1=F.nf([-B-s,2*A]),r2=F.nf([-B+s,2*A]);if(Math.abs(r1[1])>12||Math.abs(r2[1])>12)continue;f={u,v,a,b,c,A,B,C,D,s,r1,r2}}
 if(!f)throw 0;const {u,v,a,b,c,A,B,C,D,s,r1,r2}=f,
 ans=rl([r1,r2]),W=[rl([r1]),rl([r2]),rl([neg(r1),neg(r2)]),rl([[u,1],[v,1]])].filter(x=>x!=ans);
 return[M(`Giải phương trình ${fh(ng(a),xp(-u))} ${sg(b)} ${fh(ab(b),xp(-v))} = ${ng(c)}.`,ans,W,
  [`Điều kiện xác định: ${G9X.two(u,v)}.`,
   `Nhân hai vế với (${xp(-u)})(${xp(-v)}) để khử mẫu: ${cf(a)}(${xp(-v)}) ${sg(b)} ${cn(b)}(${xp(-u)}) = ${cf(c)}(${xp(-u)})(${xp(-v)}).`,
   `Khai triển và thu gọn, ta được ${q2(A,B,C)} = 0.`,
   `Δ = ${pa(B)}^2 − 4·${pa(A)}·${pa(C)} = ${D} = ${s}^2 nên phương trình có hai nghiệm x = ${F.s(r1)} và x = ${F.s(r2)}.`,
   `Cả hai nghiệm đều thỏa điều kiện xác định. Vậy ${ans}.`],'',String),[u,v,a,b,c]]}),

gn('pb2.mau_loai',()=>{const u=nzc(7),w=nzc(7);if(u==w)throw 0;const c=P([0,0,nzc(4),nzc(4),u-w]);if(c==0&&R(0,1))throw 0;
 const r=w+c,num=`x^2${tm(-(u+w),'x')}${tm(u*w)}`,none=r==u,
 A=none?'Phương trình vô nghiệm':`x = ${ng(r)}`,
 W=none?[`x = ${ng(u)}`,rl([[u,1],[w,1]]),`x = ${ng(w)}`]:[`x = ${ng(u)}`,rl([[u,1],[r,1]]),'Phương trình vô nghiệm'];
 return[M(`Giải phương trình ${fh(num,xp(-u))} = ${ng(c)}.`,A,W,
  [`Điều kiện xác định: x ≠ ${ng(u)}.`,`Phân tích tử số: ${num} = (${xp(-u)})(${xp(-w)}).`,
   c==0?`Phương trình trở thành (${xp(-u)})(${xp(-w)}) = 0, nên x = ${ng(u)} hoặc x = ${ng(w)}.`:`Nhân hai vế với (${xp(-u)}): (${xp(-u)})(${xp(-w)}) = ${cf(c)}(${xp(-u)}), tức ${none?`(${xp(-u)})^2 = 0, nên x = ${ng(u)}`:`(${xp(-u)})(${xp(-r)}) = 0, nên x = ${ng(u)} hoặc x = ${ng(r)}`}.`,
   `Đối chiếu điều kiện: x = ${ng(u)} bị loại.${none?' Không còn nghiệm nào nên phương trình vô nghiệm.':` Vậy ${A}.`}`],'',String),[u,w,c]]}));
})();
