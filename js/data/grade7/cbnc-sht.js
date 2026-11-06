/* LỚP 7 · Số hữu tỉ — bổ sung từ "Cơ bản và nâng cao Toán 7 tập 1 – Đại số" (chuyên đề 1: các phép tính trong tập hợp số hữu tỉ).
   10 dạng Cơ bản + 8 dạng Nâng cao. Mỗi dạng là một hàm sinh số ngẫu nhiên; lời giải từng bước, dễ hiểu.
   q.k + q.p dùng cho kiem-chung/lop7-cbnc/verify.js (so từng đáp án với oracle độc lập). */
(()=>{
const {mc,sol,fd,ng,lcm}=BK,gen=G7X.gen,fh=G7H.fh,add=G7H.add,addH=G7H.addH,ps=G7H.ps,
 {Fr,fadd,fsub,fmul,fdiv,neg,cmp,S,pr,ab,lin,svgMagic,rng}=G7X,
 /* loại các đáp án nhiễu có giá trị bằng đáp án đúng (tránh hai đáp án cùng giá trị) */
 wr=(arr,res)=>arr.filter(w=>cmp(w,res)!=0).map(S);

/* ================= CƠ BẢN ================= */
add('l7sht',

/* Số hữu tỉ nằm giữa hai số */
gen('sht.nam_giua',()=>{
 const ds=[2,3,4,5,6,8,9,10];let A,B;
 do{A=Fr(R(-12,12),P(ds));B=Fr(R(-12,12),P(ds))}while(cmp(A,B)>=0||cmp(fsub(B,A),[4,1])>0||(A[1]==1&&B[1]==1));
 const L=lcm(A[1],B[1]),L2=2*L,x=A[0]*L2/A[1],y=B[0]*L2/B[1],m=(x+y)/2,C=Fr(m,L2),
  D1=fsub(A,[1,P([2,3,4,5])]),D2=fadd(B,[1,P([2,3,4,5])]),
  e=sol([`Quy đồng hai số về cùng mẫu ${L2} (gấp đôi BCNN(${A[1]}; ${B[1]}) = ${L} để chắc chắn còn chỗ ở giữa): ${S(A)} = ${ng(x)}/${L2}; ${S(B)} = ${ng(y)}/${L2}.`,
   `Số nằm giữa phải có tử số lớn hơn ${ng(x)} và nhỏ hơn ${ng(y)} (mẫu vẫn là ${L2}). Chọn tử số ${ng(m)}: ${ng(m)}/${L2} = ${S(C)}.`,
   `Kiểm tra: ${S(A)} < ${S(C)} < ${S(B)}. Các đáp án còn lại đều nhỏ hơn ${S(A)}, lớn hơn ${S(B)} hoặc trùng với một đầu mút nên không nằm giữa.`],`${S(C)}.`);
 return[mc(`Số hữu tỉ nào sau đây nằm giữa ${S(A)} và ${S(B)}?`,S(C),[S(D1),S(D2),S(P([A,B])),S(fsub(A,[2,1])),S(fadd(B,[2,1]))],e),[A,B]]}),

/* a/b + c/d − e/f */
gen('sht.cong_ba_so',()=>{
 const ds=[2,3,4,5,6,8,9,10,12];let a,b,c,r;
 do{a=Fr(R(-9,9),P(ds));b=Fr(R(-9,9),P(ds));c=Fr(R(-9,9),P(ds));r=fsub(fadd(a,b),c)}
 while(a[1]==1||b[1]==1||c[1]==1||r[0]==0||r[1]>60||new Set([a[1],b[1],c[1]]).size<2);
 const L=lcm(lcm(a[1],b[1]),c[1]),x=a[0]*L/a[1],y=b[0]*L/b[1],z=c[0]*L/c[1],t=x+y-z,
  e=sol([`Mẫu số chung: BCNN(${a[1]}; ${b[1]}; ${c[1]}) = ${L}.`,
   `Quy đồng: ${S(a)} = ${ng(x)}/${L}; ${S(b)} = ${ng(y)}/${L}; ${S(c)} = ${ng(z)}/${L}.`,
   `Cộng, trừ các tử số: ${ng(x)} + ${pa(y)} − ${pa(z)} = ${ng(t)}, được ${ng(t)}/${L}.`,
   gcd(Math.abs(t),L)==1?`Phân số ${ng(t)}/${L} đã tối giản nên giữ nguyên.`:`Rút gọn: ${ng(t)}/${L} = ${S(r)}.`],`${S(r)}.`),
  dn=a[1]+b[1]-c[1],w=[fadd(fadd(a,b),c),neg(r),fsub(fsub(a,b),c),fsub(fadd(neg(a),b),c)];
 if(dn)w.push(Fr(a[0]+b[0]-c[0],dn));
 return[mc(`Tính: ${S(a)} + ${pr(b)} − ${pr(c)}`,S(r),wr(w,r),e),[a,b,c]]}),

/* Tính hợp lý: đặt thừa số chung */
gen('sht.hop_ly',()=>{
 let m,p,q,t;
 do{const d=P([3,4,5,6,7,8,9]);t=P([1,2,-1,-2,3]);m=Fr(R(-9,9),P([2,3,4,5,7]));p=Fr(R(-d+1,d-1),d);q=fsub([t,1],p)}
 while(m[0]==0||m[1]==1||p[0]==0||q[0]==0||p[1]==1||q[1]==1||cmp(p,q)==0);
 const r=fmul(m,[t,1]),
  e=sol([`Hai tích có chung thừa số ${pr(m)}, ta đặt thừa số chung ra ngoài: A = ${pr(m)} × [${pr(p)} + ${pr(q)}].`,
   `Tính trong ngoặc: ${pr(p)} + ${pr(q)} = ${t}.`,
   `A = ${pr(m)} × ${pa(t)} = ${S(r)}.`],`${S(r)}.`);
 return[mc(`Tính hợp lý: ${pr(m)} × ${pr(p)} + ${pr(m)} × ${pr(q)}`,S(r),wr([fmul(m,p),fmul(m,q),neg(r),fmul(m,fsub(p,q)),fadd(m,[t,1])],r),e),[m,p,q]]}),

/* Tìm n để các lũy thừa cùng cơ số bằng nhau */
gen('sht.tim_so_mu',()=>{
 const cfg=P([[2,[[4,2],[8,3],[16,4]]],[3,[[9,2],[27,3]]],[5,[[25,2],[125,3]]]]),b=cfg[0];let bs,s,bt,t,m,k,n;
 do{[bs,s]=P(cfg[1]);[bt,t]=P(cfg[1]);m=R(2,6);k=R(2,6);n=t*k-s*m}while(s==t||n<1||n>30);
 const e=sol([`Viết mọi lũy thừa về cơ số ${b}: ${bs} = ${b}^${s}; ${bt} = ${b}^${t}.`,
   `${bs}^${m} = (${b}^${s})^${m} = ${b}^${s*m}; ${bt}^${k} = (${b}^${t})^${k} = ${b}^${t*k}.`,
   `Phương trình thành ${b}<sup>n</sup> · ${b}^${s*m} = ${b}^${t*k}, tức ${b}<sup>n&nbsp;+&nbsp;${s*m}</sup> = ${b}^${t*k}.`,
   `Hai lũy thừa cùng cơ số ${b} bằng nhau nên số mũ bằng nhau: n + ${s*m} = ${t*k}, suy ra n = ${n}.`],`n = ${n}.`);
 return[mc(`Tìm số tự nhiên n, biết: ${b}<sup>n</sup> · ${bs}^${m} = ${bt}^${k}`,n,[t*k,t*k+s*m,s*m,t*k-m,k-m+s].filter(v=>v>0),e,fd),[b,bs,bt,m,k]]}),

/* (x ± a/b) × c/d = e/f */
gen('sht.timx_hai_buoc',()=>{
 const ds=[2,3,4,5,6,7];let X,a,c,G,E,sg;
 do{X=Fr(R(-9,9),P(ds));a=Fr(R(1,9),P(ds));c=Fr(R(-9,9),P(ds));sg=P([1,-1]);G=fadd(X,sg>0?a:neg(a));E=fmul(G,c)}
 while(c[0]==0||G[0]==0||X[0]==0||E[1]>30||Math.abs(E[0])>40||(c[1]==1&&a[1]==1&&X[1]==1));
 const aa=sg>0?a:neg(a),op=sg>0?'+':'−',op2=sg>0?'−':'+',
  e=sol([`Chia hai vế cho ${pr(c)}: x ${op} ${S(a)} = ${S(E)} : ${pr(c)}.`,
   `${S(E)} : ${pr(c)} = ${S(E)} × ${pr(Fr(c[1],c[0]))} = ${S(G)}.`,
   `x ${op} ${S(a)} = ${S(G)}, nên x = ${S(G)} ${op2} ${S(a)} = ${S(X)}.`],`x = ${S(X)}.`);
 return[mc(`Tìm x, biết: (x ${op} ${S(a)}) × ${pr(c)} = ${S(E)}`,S(X),wr([fadd(G,aa),fsub(fmul(E,c),aa),fdiv(fsub(E,aa),c),neg(X)],X),e),[sg,a,c,E]]}),

/* |p| ± |q| ± |r| */
gen('sht.abs_tinh',()=>{
 const ds=[2,3,4,5,6];let p,q,r,o1,o2,v;
 do{p=Fr(R(-9,9),P(ds));q=Fr(R(-9,9),P(ds));r=Fr(R(-9,9),P(ds));o1=P([1,-1]);o2=P([1,-1]);
  v=fadd(fadd(ab(p),fmul([o1,1],ab(q))),fmul([o2,1],ab(r)))}
 while(p[0]*q[0]*r[0]==0||[p,q,r].filter(f=>f[0]<0).length<2||[p,q,r].some(f=>f[1]==1)||v[0]==0||v[1]>40);
 const L=lcm(lcm(p[1],q[1]),r[1]),x=Math.abs(p[0])*L/p[1],y=Math.abs(q[0])*L/q[1],z=Math.abs(r[0])*L/r[1],t=x+o1*y+o2*z,s1=o1>0?'+':'−',s2=o2>0?'+':'−',
  e=sol([`Giá trị tuyệt đối của một số âm là số đối của nó: |${S(p)}| = ${S(ab(p))}; |${S(q)}| = ${S(ab(q))}; |${S(r)}| = ${S(ab(r))}.`,
   `A = ${S(ab(p))} ${s1} ${S(ab(q))} ${s2} ${S(ab(r))}. Quy đồng mẫu số ${L}: A = ${x}/${L} ${s1} ${y}/${L} ${s2} ${z}/${L}.`,
   `A = (${x} ${s1} ${y} ${s2} ${z})/${L} = ${ng(t)}/${L}${gcd(Math.abs(t),L)>1?` = ${S(v)} (rút gọn)`:' (đã tối giản)'}.`],`${S(v)}.`),
  nv=(f)=>fadd(fadd(f[0],fmul([o1,1],f[1])),fmul([o2,1],f[2]));
 return[mc(`Tính: |${S(p)}| ${s1} |${S(q)}| ${s2} |${S(r)}|`,S(v),wr([nv([p,q,r]),neg(v),fadd(fadd(ab(p),fmul([-o1,1],ab(q))),fmul([o2,1],ab(r))),fadd(fadd(ab(p),fmul([o1,1],ab(q))),fmul([-o2,1],ab(r)))],v),e),[p,q,r,o1,o2]]}),

/* Đếm số nguyên giữa hai phân số */
gen('sht.so_nguyen_giua',()=>{
 let A,B,lo,hi;
 do{A=Fr(R(-40,30),P([3,4,5,6,7]));B=Fr(R(-10,50),P([3,4,5,6,7]));lo=Math.floor(A[0]/A[1])+1;hi=Math.ceil(B[0]/B[1])-1}
 while(A[1]==1||B[1]==1||cmp(A,B)>=0||hi-lo<2||hi-lo>11);
 const n=hi-lo+1,
  e=sol([`Xác định vị trí hai số so với số nguyên: ${ng(lo-1)} < ${S(A)} < ${ng(lo)} và ${ng(hi)} < ${S(B)} < ${ng(hi+1)}.`,
   `Số nguyên x thỏa ${S(A)} < x < ${S(B)} là các số từ ${ng(lo)} đến ${ng(hi)}: ${rng(lo,hi)}.`,
   `Số giá trị = ${hi} − ${pa(lo)} + 1 = ${n}.`],`có ${n} số nguyên.`);
 return[mc(`Có bao nhiêu số nguyên x thỏa mãn ${S(A)} < x < ${S(B)}?`,n,[n-1,n+1,n+2,n-2],e,fd),[A,B]]}),

/* Bài toán tiêu tiền liên tiếp */
gen('sht.tien_con_lai',()=>{
 const[p,q]=P([[1,2],[1,3],[2,5],[1,4],[3,5],[1,5],[3,4]]),[r,s]=P([[1,2],[1,3],[1,4],[2,3],[3,4],[1,5]]),k=R(1,10),M=k*q*s,L=k*(q-p)*(s-r);
 if(M>1500)throw 0;
 const f=Fr((q-p)*(s-r),q*s),rem=fsub(fsub([1,1],[p,q]),[r,s]),
  e=sol([`Sau lần thứ nhất (tiêu ${p}/${q}), còn lại 1 − ${p}/${q} = ${q-p}/${q} số tiền ban đầu.`,
   `Lần thứ hai tiêu ${r}/${s} của số tiền còn lại, nên còn lại 1 − ${r}/${s} = ${s-r}/${s} của số tiền còn lại sau lần đầu.`,
   `Số tiền cuối cùng = ${q-p}/${q} × ${s-r}/${s} = ${S(f)} số tiền ban đầu. Số tiền này là ${L} nghìn đồng.`,
   `Số tiền ban đầu = ${L} : ${S(f)} = ${L} × ${S(Fr(f[1],f[0]))} = ${M} (nghìn đồng).`],`${M} nghìn đồng.`),
  w=[L*q/(q-p),L*s/(s-r),M*(q-p)/q,L*2,rem[0]>0?L*rem[1]/rem[0]:0].filter(v=>Number.isInteger(v)&&v>0&&v!=M);
 return[mc(`Một người có một số tiền. Lần thứ nhất tiêu ${p}/${q} số tiền đó, lần thứ hai tiêu ${r}/${s} số tiền còn lại thì còn ${L} nghìn đồng. Hỏi lúc đầu người đó có bao nhiêu nghìn đồng?`,M,w,e,fd),[p,q,r,s,L]]}),

/* Hình vuông kì diệu (cơ bản) */
gen('sht.vuong_ki_dieu',()=>{
 const c=R(-4,12),a=R(1,6),b=R(1,6);if(a==b)throw 0;
 const g=[c-b,c+a+b,c-a,c-a+b,c,c+a-b,c+a,c-a-b,c+b],T=3*c,t=R(0,3),hd=`Hình vuông kì diệu là hình vuông 3 × 3 mà tổng ba số trên mỗi hàng, mỗi cột và mỗi đường chéo đều bằng nhau (xem hình).`,
  tip=`Mẹo: trong hình vuông kì diệu 3 × 3, tổng T của mỗi hàng (cột, đường chéo) bằng 3 lần số ở ô giữa. (Vì cộng bốn tổng đi qua ô giữa được 4T = 3 × ô giữa + 3T, nên T = 3 × ô giữa.)`;
 let known,hl,x,q,steps;
 if(t==0){known=[0,4];hl=8;x=g[8];q=`Biết số ở ô giữa là ${c} và ô góc trên bên trái là ${ng(g[0])}. Tìm số x ở ô góc dưới bên phải.`;
  steps=[tip,`T = 3 × ${c} = ${T}.`,`Đường chéo chính: ${ng(g[0])} + ${pa(c)} + x = ${T}, nên x = ${T} − ${pa(g[0])} − ${pa(c)} = ${x}.`]}
 else if(t==1){known=[0,1,2,3];hl=5;x=g[5];q=`Biết hàng trên cùng gồm ${ng(g[0])}; ${ng(g[1])}; ${ng(g[2])} và ô đầu tiên của hàng giữa là ${ng(g[3])}. Tìm số x ở ô cuối cùng của hàng giữa.`;
  steps=[`Hàng trên cùng: ${ng(g[0])} + ${pa(g[1])} + ${pa(g[2])} = ${T}, vậy T = ${T}.`,`Theo mẹo: T = 3 × ô giữa, nên ô giữa = ${T} : 3 = ${c}.`,`Hàng giữa: ${ng(g[3])} + ${pa(c)} + x = ${T}, nên x = ${T} − ${pa(g[3])} − ${pa(c)} = ${x}.`]}
 else if(t==2){known=[0,3,6];hl=4;x=c;q=`Biết cột đầu tiên gồm ba số ${ng(g[0])}; ${ng(g[3])}; ${ng(g[6])}. Tìm số x ở ô giữa.`;
  steps=[`Tổng cột đầu tiên: ${ng(g[0])} + ${pa(g[3])} + ${pa(g[6])} = ${T}, vậy T = ${T}.`,tip,`Ô giữa x = T : 3 = ${T} : 3 = ${c}.`]}
 else{known=[1,7];hl=4;x=c;q=`Biết hai ô ở giữa cạnh trên và giữa cạnh dưới là ${ng(g[1])} và ${ng(g[7])}. Tìm số x ở ô giữa.`;
  steps=[`Cột giữa có ba số ${ng(g[1])}; x; ${ng(g[7])} và tổng cột giữa là T = 3x (theo mẹo).`,tip,`${ng(g[1])} + x + ${pa(g[7])} = 3x, suy ra ${ng(g[1]+g[7])} = 2x, nên x = ${ng(g[1]+g[7])} : 2 = ${c}.`]}
 const cells=g.map((v,i)=>known.includes(i)?v:null),e=sol(steps,`x = ${x}.`),
  o=mc(`${hd} ${q}`,x,[T,c,x+1,x-1,2*c,c+a],e,fd);o.f=svgMagic(cells,hl);return[o,[g,known,hl]]}),

/* Thay số vào biểu thức */
gen('sht.thay_so',()=>{
 let x,k,m,s1,s2;
 do{x=Fr(R(-6,6),P([2,3,4,5]));k=R(1,4);m=R(1,6);s1=P([1,-1]);s2=P([1,-1])}while(x[0]==0||x[1]==1);
 const sq=fmul(x,x),tx=fmul([s1*k,1],x),res=fadd(fadd(sq,tx),[s2*m,1]),
  e=sol([`Thay x = ${S(x)} vào biểu thức A = ${ps([s2*m,s1*k,1])}.`,
   `Tính từng hạng tử: x² = (${S(x)})² = ${S(sq)}; ${s1>0?'':'−'}${k==1?'':k}x = ${s1>0?'':'−'}${k} × ${pr(x)} = ${S(tx)}.`,
   `A = ${S(sq)} + ${pr(tx)} + ${pa(s2*m)}. Quy đồng mẫu số rồi cộng: A = ${S(res)}.`],`${S(res)}.`);
 return[mc(`Cho x = ${S(x)}. Tính giá trị của biểu thức A = ${ps([s2*m,s1*k,1])}.`,S(res),wr([fadd(fadd(neg(sq),tx),[s2*m,1]),fadd(fadd(sq,neg(tx)),[s2*m,1]),fadd(fadd(sq,tx),[-s2*m,1]),fadd(fadd(x,tx),[s2*m,1])],res),e),[x,k,m,s1,s2]]})
);

/* ================= NÂNG CAO ================= */
addH('l7sht',

/* Sắp xếp theo phần bù / phần hơn */
gen('sht.phan_bu',()=>{
 const k=P([1,1,2,3]),kind=P(['bu','hon']);let ns;
 do{ns=[R(10,90),R(10,90),R(10,90)].sort((a,b)=>a-b)}while(ns[1]-ns[0]<3||ns[2]-ns[1]<3||ns.some(n=>gcd(n,k)!=1));
 const mk=n=>kind=='bu'?[n,n+k]:[n+k,n],fs=ns.map(mk),asc=kind=='bu'?fs:[...fs].reverse(),str=a=>a.map(f=>`${f[0]}/${f[1]}`).join(' < '),
  sw=(a,i)=>{const r=[...a];[r[i],r[i+1]]=[r[i+1],r[i]];return r},
  sh2=sh(fs.map(f=>`${f[0]}/${f[1]}`)),
  e=kind=='bu'?sol([`Mỗi số có tử nhỏ hơn mẫu ${k} đơn vị. Tìm "phần bù" đến 1: 1 − ${fs[0][0]}/${fs[0][1]} = ${k}/${fs[0][1]}; 1 − ${fs[1][0]}/${fs[1][1]} = ${k}/${fs[1][1]}; 1 − ${fs[2][0]}/${fs[2][1]} = ${k}/${fs[2][1]}.`,
    `Các phần bù cùng tử ${k}: mẫu càng lớn thì phần bù càng nhỏ, nên ${k}/${fs[2][1]} < ${k}/${fs[1][1]} < ${k}/${fs[0][1]}.`,
    `Phần bù càng nhỏ thì số đó càng gần 1, tức càng LỚN. Vậy ${str(asc)}.`],`${str(asc)}.`)
  :sol([`Mỗi số có tử lớn hơn mẫu ${k} đơn vị. Tìm "phần hơn" so với 1: ${fs[0][0]}/${fs[0][1]} − 1 = ${k}/${fs[0][1]}; ${fs[1][0]}/${fs[1][1]} − 1 = ${k}/${fs[1][1]}; ${fs[2][0]}/${fs[2][1]} − 1 = ${k}/${fs[2][1]}.`,
    `Các phần hơn cùng tử ${k}: mẫu càng nhỏ thì phần hơn càng lớn, nên ${k}/${fs[2][1]} < ${k}/${fs[1][1]} < ${k}/${fs[0][1]}.`,
    `Phần hơn càng lớn thì số đó càng LỚN. Vậy ${str(asc)}.`],`${str(asc)}.`);
 return[mc(`Sắp xếp các số sau theo thứ tự tăng dần: ${sh2.join('; ')}`,str(asc),[str([...asc].reverse()),str(sw(asc,0)),str(sw(asc,1))],e,String),[k,kind,ns]]}),

/* Rút gọn |x − a| + |x − b| theo điều kiện của x */
gen('sht.rutgon_abs',()=>{
 let a,b;do{a=R(-8,8);b=R(-8,8)}while(a>=b);
 const t=R(0,2),cond=[`${ng(a)} < x < ${ng(b)}`,`x ≥ ${ng(b)}`,`x < ${ng(a)}`][t],
  ans=[ps([b-a]),ps([-a-b,2]),ps([a+b,-2])],
  neA=ps([a,-1]),neB=ps([b,-1]),
  sA=t==2?neA:lin(a),sB=t==0||t==2?neB:lin(b),
  why=[`Vì ${ng(a)} < x < ${ng(b)} nên x − ${pa(a)} > 0 và x − ${pa(b)} < 0.`,`Vì x ≥ ${ng(b)} > ${ng(a)} nên x − ${pa(a)} > 0 và x − ${pa(b)} ≥ 0.`,`Vì x < ${ng(a)} < ${ng(b)} nên x − ${pa(a)} < 0 và x − ${pa(b)} < 0.`][t],
  e=sol([why,`Bỏ dấu giá trị tuyệt đối (biểu thức dương giữ nguyên, biểu thức âm đổi dấu): |${lin(a)}| = ${sA}; |${lin(b)}| = ${sB}.`,
   `A = (${sA}) + (${sB}) = ${ans[t]}.`],`A = ${ans[t]}.`),
  wrongs=[ans[(t+1)%3],ans[(t+2)%3],ps([a-b]),ps([a+b,2])];
 return[mc(`Với ${cond}, rút gọn biểu thức A = |${lin(a)}| + |${lin(b)}|:`,ans[t],wrongs,e,String),[a,b,t]]}),

/* GTLN / GTNN của biểu thức chứa một dấu giá trị tuyệt đối */
gen('sht.gtln_abs',()=>{
 const a=R(-9,9),c=R(-9,9),kind=P(['max','min']),ask=P(['gt','x']);if(!c)throw 0;
 const E=kind=='max'?`${ng(c)} − |${lin(a)}|`:`|${lin(a)}| ${c<0?'−':'+'} ${Math.abs(c)}`,nm=kind=='max'?'lớn':'nhỏ',
  ineq=kind=='max'?[`Với mọi x ta có |${lin(a)}| ≥ 0, nên −|${lin(a)}| ≤ 0.`,`Suy ra ${E} ≤ ${ng(c)} − 0 = ${ng(c)}.`]:[`Với mọi x ta có |${lin(a)}| ≥ 0.`,`Suy ra ${E} ≥ 0 ${c<0?'−':'+'} ${Math.abs(c)} = ${ng(c)}.`],
  e=sol([...ineq,`Dấu "=" xảy ra khi |${lin(a)}| = 0, tức x = ${ng(a)}.`,`Vậy giá trị ${nm} nhất của biểu thức là ${ng(c)}, đạt được khi x = ${ng(a)}.`],ask=='gt'?`${ng(c)}.`:`x = ${ng(a)}.`);
 return[ask=='gt'?mc(`Giá trị ${nm} nhất của biểu thức M = ${E} là:`,c,[a,-a,c+a,c-a,-c,0],e,fd):mc(`Biểu thức M = ${E} đạt giá trị ${nm} nhất khi x bằng:`,a,[c,-a,0,-c,a+c],e,fd),[kind,ask,a,c]]}),

/* |x − p| = |x − q| */
gen('sht.abs_bang_abs',()=>{
 let p,q;do{p=R(-9,9);q=R(-9,9)}while(p==q);
 const x=Fr(p+q,2),
  e=sol([`|A| = |B| nghĩa là A = B hoặc A = −B.`,
   `Trường hợp A = B: ${lin(p)} = ${lin(q)}, bỏ x hai vế được ${ng(-p)} = ${ng(-q)}, vô lí vì ${p} ≠ ${q}. Trường hợp này vô nghiệm.`,
   `Trường hợp A = −B: ${lin(p)} = ${ps([q,-1])}, suy ra 2x = ${ng(p)} + ${pa(q)} = ${ng(p+q)}.`,
   `x = ${ng(p+q)} : 2 = ${S(x)}.`],`x = ${S(x)}.`);
 return[mc(`Tìm x, biết: |${lin(p)}| = |${lin(q)}|`,S(x),wr([Fr(p-q,2),Fr(q-p,2),Fr(p+q,1),Fr(-(p+q),2),Fr(p*q,1)],x),e),[p,q]]}),

/* Số lớn nhất trong 4 lũy thừa (đưa về cùng số mũ) */
gen('sht.so_sanh_luy_thua',()=>{
 const g=P([5,6,7,8,9,10,11,12]),pool=[[2,1,2],[2,2,4],[3,1,3],[2,3,8],[3,2,9],[5,1,5],[7,1,7],[6,1,6],[2,4,16],[10,1,10],[4,1,4],[5,2,25]];
 const it=sh(pool).slice(0,4),Bs=it.map(z=>z[2]);if(new Set(Bs).size<4)throw 0;
 const nums=it.map(z=>[z[0],z[1]*g,z[2]]),mx=nums.reduce((u,v)=>v[2]>u[2]?v:u),show=z=>`${z[0]}^${z[1]}`,
  e=sol([`Các số mũ ${nums.map(z=>z[1]).join('; ')} đều chia hết cho ${g}, nên viết mỗi số thành lũy thừa mũ ${g}.`,
   nums.map(z=>z[1]==g?`${show(z)} (đã có mũ ${g})`:`${show(z)} = (${z[0]}^${z[1]/g})^${g} = ${z[2]}^${g}`).join('; ')+'.',
   `Các lũy thừa cùng số mũ ${g}: số nào có cơ số lớn hơn thì lớn hơn. Cơ số: ${nums.map(z=>z[2]).join('; ')}. Lớn nhất là ${mx[2]}, ứng với ${show(mx)}.`],`${show(mx)}.`);
 return[mc(`Số lớn nhất trong các số: ${nums.map(show).join('; ')} là:`,show(mx),nums.filter(z=>z!==mx).map(show),e,String),[g,nums]]}),

/* 1/r + 1/r² + … + 1/rⁿ */
gen('sht.tong_cap_nhan',()=>{
 const r=P([2,3,4,5]),n=R(4,6),rn=r**n,res=Fr(rn-1,rn*(r-1)),
  t=(i)=>fh(1,i==1?r:`${r}^${i}`),A=`${t(1)} + ${t(2)} + ${t(3)} + … + ${t(n)}`,
  e=sol([`Nhân hai vế với ${r}: ${r}A = 1 + ${t(1)} + ${t(2)} + … + ${t(n-1)}.`,
   `Lấy ${r}A − A: các số hạng ở giữa triệt tiêu, còn lại ${r}A − A = 1 − ${t(n)}.`,
   `${r-1==1?'A':(r-1)+'A'} = 1 − ${fh(1,rn)} = ${fh(rn-1,rn)}, suy ra A = ${r-1==1?'':fh(rn-1,rn)+' : '+(r-1)+' = '}${S(res)}.`],`A = ${S(res)}.`);
 return[mc(`Tính: A = ${A}`,S(res),wr([Fr(rn-1,rn),Fr(1,r-1),Fr(rn-1,rn*r),Fr(rn,rn*(r-1)),fadd(res,Fr(1,rn))],res),e,String),[r,n]]}),

/* Tổng các số nguyên x thỏa A < x ≤ B */
gen('sht.tong_so_nguyen',()=>{
 let A,B,lo,hi;
 do{A=Fr(-R(2,40),P([2,3,4,5,7]));B=Fr(R(2,40),P([2,3,4,5,7]));lo=Math.floor(A[0]/A[1])+1;hi=Math.floor(B[0]/B[1])}
 while(A[1]==1||B[1]==1||hi-lo<3||hi-lo>12||lo>=0||hi<=0||hi==-lo);
 const sm=(u,v)=>(u+v)*(v-u+1)/2,tot=sm(lo,hi),m=Math.min(-lo,hi),rest=[];
 for(let i=lo;i<=hi;i++)if(Math.abs(i)>m)rest.push(i);
 const e=sol([`${ng(lo-1)} < ${S(A)} < ${ng(lo)} và ${ng(hi)} < ${S(B)} < ${ng(hi+1)}. Vì ${S(A)} < x ≤ ${S(B)} nên x là số nguyên từ ${ng(lo)} đến ${ng(hi)}.`,
   `Các số đó là: ${rng(lo,hi)}.`,
   `Các cặp số đối nhau có tổng bằng 0 (từ ${ng(-m)} đến ${m}), nên chỉ còn lại ${rest.map(ng).join('; ')}.`,
   `Tổng = ${rest.map(pa).join(' + ')} = ${tot}.`],`${tot}.`);
 return[mc(`Tính tổng tất cả các số nguyên x thỏa mãn ${S(A)} < x ≤ ${S(B)}.`,tot,[sm(lo-1,hi),sm(lo,hi+1),sm(lo+1,hi),0,hi],e,fd),[A,B]]}),

/* Hình vuông kì diệu (nâng cao): biết 3 ô, tìm một ô khác */
gen('sht.vuong_ki_dieu_nc',()=>{
 const c=R(-3,12),a=R(1,6),b=R(1,6);if(a==b)throw 0;
 const g=[c-b,c+a+b,c-a,c-a+b,c,c+a-b,c+a,c-a-b,c+b],T=3*c,known=[0,8,3],hl=P([1,2,5,6,7]),x=g[hl],
  s0=`Ô giữa bằng trung bình cộng của hai ô góc đối nhau: (${ng(g[0])} + ${pa(g[8])}) : 2 = ${c}. Tổng mỗi hàng, mỗi cột, mỗi đường chéo là T = 3 × ${c} = ${T}.`,
  sMR=`Hàng giữa: ${ng(g[3])} + ${pa(c)} + (ô cuối hàng giữa) = ${T}, nên ô cuối hàng giữa = ${T} − ${pa(g[3])} − ${pa(c)} = ${g[5]}.`,
  sTR=`Cột bên phải: (ô góc trên phải) + ${pa(g[5])} + ${pa(g[8])} = ${T}, nên ô góc trên phải = ${T} − ${pa(g[5])} − ${pa(g[8])} = ${g[2]}.`,
  sTM=`Hàng trên: ${ng(g[0])} + (ô giữa hàng trên) + ${pa(g[2])} = ${T}, nên ô giữa hàng trên = ${T} − ${pa(g[0])} − ${pa(g[2])} = ${g[1]}.`,
  sBL=`Cột bên trái: ${ng(g[0])} + ${pa(g[3])} + (ô góc dưới trái) = ${T}, nên ô góc dưới trái = ${T} − ${pa(g[0])} − ${pa(g[3])} = ${g[6]}.`,
  sBM=`Hàng dưới: ${pa(g[6])} + (ô giữa hàng dưới) + ${pa(g[8])} = ${T}, nên ô giữa hàng dưới = ${T} − ${pa(g[6])} − ${pa(g[8])} = ${g[7]}.`,
  chain={5:[sMR],2:[sMR,sTR],1:[sMR,sTR,sTM],6:[sBL],7:[sBL,sBM]}[hl],
  e=sol([s0,...chain],`x = ${x}.`),
  others=[1,2,5,6,7].filter(i=>i!=hl).map(i=>g[i]),
  o=mc(`Điền số vào hình vuông kì diệu (tổng ba số trên mỗi hàng, mỗi cột, mỗi đường chéo đều bằng nhau). Tìm số x ở ô được đánh dấu.`,x,[...others,c,T],e,fd);
 o.f=svgMagic(g.map((v,i)=>known.includes(i)?v:null),hl);return[o,[g,known,hl]]})
);
})();
