/* LỚP 7 · Tỉ lệ thức, đại lượng tỉ lệ — bổ sung từ "Cơ bản và nâng cao Toán 7 tập 1 – Đại số" (chuyên đề 2, 4, 5: tỉ lệ thức, dãy tỉ số bằng nhau,
   đại lượng tỉ lệ thuận, tỉ lệ nghịch, chia tỉ lệ). 9 dạng Cơ bản + 5 dạng Nâng cao. Lời giải từng bước, dễ hiểu. */
(()=>{
const {mc,sol,fd,ng}=BK,gen=G7X.gen,fh=G7H.fh,add=G7H.add,addH=G7H.addH,
 {Fr,fdiv,cmp,S,lin,bd}=G7X,
 /* lọc đáp án nhiễu: số nguyên dương, khác đáp án, không trùng nhau */
 ni=(arr,ans)=>[...new Set(arr.filter(v=>Number.isInteger(v)&&v>0&&v!=ans))],
 /* chuỗi "x : y" của một phân số tối giản */
 ra=f=>`${f[0]} : ${f[1]}`,
 /* bỏ các tỉ số [tử, mẫu] trùng giá trị nhau */
 uq=a=>{const o=[];a.forEach(z=>{if(!o.some(y=>y[0]*z[1]==y[1]*z[0]))o.push(z)});return o},
 NM=['An','Bình','Chi','Dũng','Hà','Lan','Minh','Nam','Phúc','Quân'];

/* ================= CƠ BẢN ================= */
add('l7tlt',

/* Tìm x trong tỉ lệ thức có biểu thức ở tử hoặc mẫu */
gen('tlt.timx_phuc',()=>{
 if(R(0,1)){
  let a,b,c,d;do{a=R(-9,9);b=R(2,12);d=R(2,9);c=R(1,9)}while(!a||(b*c)%d);
  const m=b*c/d,x=m-a,nu=lin(-a),
   e=sol([`Áp dụng tính chất của tỉ lệ thức (tích ngoại bằng tích trung): (${nu}) × ${d} = ${b} × ${c}.`,`(${nu}) × ${d} = ${b*c}, nên ${nu} = ${b*c} : ${d} = ${m}.`,`x = ${m} − ${pa(a)} = ${x}.`],`x = ${x}.`);
  return[mc(`Tìm x, biết: ${fh(nu,b)} = ${fh(c,d)}`,x,[m+a,m,b*c-a,x+1,-x],e,fd),[1,a,b,c,d]]}
 let a,c,d,t,b;do{c=R(2,9);d=R(2,9);t=R(-9,9);b=R(-9,9);a=t*c/d}while(!t||!b||c==d||!Number.isInteger(a)||!a);
 const x=t+b,dn=lin(b),
  e=sol([`Áp dụng tính chất của tỉ lệ thức (tích ngoại bằng tích trung): ${a} × ${d} = ${c} × (${dn}).`,`${c} × (${dn}) = ${ng(a*d)}, nên ${dn} = ${ng(a*d)} : ${c} = ${ng(t)}.`,`x = ${ng(t)} + ${pa(b)} = ${ng(x)}.`],`x = ${ng(x)}.`);
 return[mc(`Tìm x, biết: ${fh(ng(a),dn)} = ${fh(c,d)}`,x,[t,t-b,b-t,x+1,-x],e,fd),[2,a,b,c,d]]}),

/* Lập tỉ lệ thức từ đẳng thức: tìm tỉ lệ thức SAI */
gen('tlt.lap_ti_le_thuc',()=>{
 let p,q,k,l;do{p=R(1,6);q=R(1,6);k=R(1,6);l=R(1,6)}while(p==q||k==l);
 const a=p*k,b=q*k,c=p*l,d=q*l;if(new Set([a,b,c,d]).size<4||Math.max(a,b,c,d)>40)throw 0;
 const ok=[[a,b,c,d],[a,c,b,d],[d,b,c,a],[d,c,b,a]],bad=P([[a,b,d,c],[a,d,b,c],[b,a,c,d],[a,c,d,b]]),
  str=z=>`${z[0]}/${z[1]} = ${z[2]}/${z[3]}`,
  ln=z=>`${str(z)}: ${z[0]} · ${z[3]} = ${z[0]*z[3]}; ${z[1]} · ${z[2]} = ${z[1]*z[2]} ⟹ ${z[0]*z[3]==z[1]*z[2]?'đúng':'SAI'}.`,
  e=sol([`Từ đẳng thức ${a} · ${d} = ${b} · ${c} (cùng bằng ${a*d}), một tỉ lệ thức là đúng khi tích hai số ở hai đầu bằng tích hai số ở giữa.`,[bad,...ok].map(ln).join('<br>')],`tỉ lệ thức ${str(bad)} không đúng.`);
 return[mc(`Cho đẳng thức ${a} · ${d} = ${b} · ${c}. Tỉ lệ thức nào sau đây KHÔNG đúng?`,str(bad),ok.map(str),e,String),[a,b,c,d]]}),

/* a·x = b·y và x ± y = S */
gen('tlt.hai_bien_he_so',()=>{
 let a,b;do{a=R(2,9);b=R(2,9)}while(a==b||gcd(a,b)!=1);
 const op=P(['+','−']);if(op=='−'&&b<a)[a,b]=[b,a];
 const k=R(2,9),x=b*k,y=a*k,Sv=op=='+'?x+y:x-y,ask=P(['x','y']),ans=ask=='x'?x:y,
  e=sol([`Chia cả hai vế của ${a}x = ${b}y cho ${a*b}: ${fh('x',b)} = ${fh('y',a)}.`,
   `Áp dụng tính chất dãy tỉ số bằng nhau: ${fh('x',b)} = ${fh('y',a)} = ${fh(`x ${op} y`,`${b} ${op} ${a}`)} = ${fh(Sv,op=='+'?a+b:b-a)} = ${k}.`,
   `x = ${b} × ${k} = ${x}; y = ${a} × ${k} = ${y}.`],`${ask} = ${ans}.`);
 return[mc(`Biết ${a}x = ${b}y và x ${op} y = ${Sv}. Giá trị của ${ask} là:`,ans,ni([ask=='x'?y:x,k,Sv,ask=='x'?a*k+1:b*k+1,ans+k],ans),e,fd),[a,b,op,Sv,ask]]}),

/* Chia lãi theo tỉ lệ vốn góp */
gen('tlt.chia_lai',()=>{
 let u,v,w;do{u=R(2,9);v=R(2,9);w=R(2,9)}while(new Set([u,v,w]).size<3||gcd(gcd(u,v),w)!=1);
 const g=R(2,5),a=g*u,b=g*v,c=g*w,m=R(2,12),T=m*(u+v+w),who=R(0,2),nms=sh(NM).slice(0,3),cap=[a,b,c][who],sh0=[u,v,w][who]*m,
  e=sol([`Lãi chia tỉ lệ với vốn góp: ${a} : ${b} : ${c} = ${u} : ${v} : ${w} (chia các số cho ${g}).`,
   `Tổng số phần = ${u} + ${v} + ${w} = ${u+v+w}. Mỗi phần ứng với ${T} : ${u+v+w} = ${m} (triệu đồng).`,
   `${nms[who]} góp ${cap} triệu đồng ứng với ${[u,v,w][who]} phần, nên nhận ${[u,v,w][who]} × ${m} = ${sh0} (triệu đồng).`],`${sh0} triệu đồng.`);
 return[mc(`${nms[0]}, ${nms[1]} và ${nms[2]} góp vốn kinh doanh lần lượt ${a}; ${b}; ${c} triệu đồng. Tiền lãi ${T} triệu đồng được chia tỉ lệ với số vốn đã góp. Hỏi ${nms[who]} nhận được bao nhiêu triệu đồng?`,sh0,ni([...[u,v,w].map(z=>z*m),T/3,m,cap*m,sh0+m],sh0),e,fd),[a,b,c,T,who]]}),

/* Hình chữ nhật có hai cạnh tỉ lệ và biết chu vi */
gen('tlt.hcn_chu_vi',()=>{
 let a,b;do{a=R(2,9);b=R(2,9)}while(a>=b||gcd(a,b)!=1);
 const k=R(2,9),x=a*k,y=b*k,P2=2*(a+b)*k,area=x*y,
  e=sol([`Gọi hai cạnh là x và y: ${fh('x',a)} = ${fh('y',b)}. Nửa chu vi: x + y = ${P2} : 2 = ${P2/2} (cm).`,
   `Áp dụng tính chất dãy tỉ số bằng nhau: ${fh('x',a)} = ${fh('y',b)} = ${fh('x + y',`${a} + ${b}`)} = ${fh(P2/2,a+b)} = ${k}.`,
   `x = ${a} × ${k} = ${x} (cm); y = ${b} × ${k} = ${y} (cm).`,`Diện tích = ${x} × ${y} = ${area} (cm²).`],`${area} cm².`);
 return[mc(`Một hình chữ nhật có hai cạnh tỉ lệ với ${a} và ${b}, chu vi bằng ${P2} cm. Diện tích hình chữ nhật đó là bao nhiêu cm²?`,area,ni([a*b*4*k*k,(a+b)*k,P2,a*b*k,area+k*k],area),e,fd),[a,b,P2]]}),

/* Chuyển động: vận tốc và thời gian tỉ lệ nghịch */
gen('tlt.cdong_van_toc',()=>{
 const v1=P([30,36,40,45,48,50,60]),t1=R(2,9),s=v1*t1;
 if(R(0,1)){
  const cs=[];for(let v=20;v<=120;v++)if(s%v==0&&v!=v1)cs.push(v);if(!cs.length)throw 0;const v2=P(cs),t2=s/v2,
   e=sol([`Quãng đường AB không đổi nên vận tốc và thời gian là hai đại lượng tỉ lệ nghịch: ${v1} × ${t1} = ${v2} × t.`,`Quãng đường AB = ${v1} × ${t1} = ${s} (km).`,`Thời gian khi đi với vận tốc ${v2} km/h: t = ${s} : ${v2} = ${t2} (giờ).`],`${t2} giờ.`);
  return[mc(`Một ô tô đi từ A đến B với vận tốc ${v1} km/h thì mất ${t1} giờ. Nếu ô tô đi với vận tốc ${v2} km/h thì mất bao nhiêu giờ?`,t2,ni([t1*v2/v1,t2+1,t2-1,t1,t1+(v2-v1)/10],t2),e,fd),[1,v1,t1,v2]]}
 const ds=[];for(let d=1;d<t1;d++)if(s%(t1-d)==0)ds.push(d);if(!ds.length)throw 0;const d=P(ds),t2=t1-d,v2=s/t2,
  e=sol([`Quãng đường AB không đổi nên vận tốc và thời gian là hai đại lượng tỉ lệ nghịch.`,`Quãng đường AB = ${v1} × ${t1} = ${s} (km). Thời gian mới là ${t1} − ${d} = ${t2} (giờ).`,`Vận tốc mới = ${s} : ${t2} = ${v2} (km/h).`],`${v2} km/h.`);
 return[mc(`Một ô tô đi từ A đến B với vận tốc ${v1} km/h thì mất ${t1} giờ. Để đến B sớm hơn ${d} giờ thì ô tô phải đi với vận tốc bao nhiêu km/h?`,v2,ni([s/(t1+d),v1+d,v1*d,v2+10,v1+10*d],v2),e,fd),[2,v1,t1,d]]}),

/* Tỉ lệ thuận với hệ số hoặc giá trị âm */
gen('tlt.tl_thuan_am',()=>{
 let x1,k,x2;
 do{x1=R(-9,9);k=R(-9,9);x2=R(-9,9)}while(!x1||!k||!x2||x2==x1||(k>0&&x1>0));
 const y1=k*x1,y2=k*x2,
  e=sol([`Vì y tỉ lệ thuận với x nên y = k·x, với k là hệ số tỉ lệ.`,`Khi x = ${x1} thì y = ${y1}: k = y : x = ${ng(y1)} : ${pa(x1)} = ${ng(k)}.`,`Khi x = ${x2}: y = k·x = ${pa(k)} × ${pa(x2)} = ${ng(y2)}.`],`y = ${ng(y2)}.`);
 return[mc(`Biết y tỉ lệ thuận với x. Khi x = ${x1} thì y = ${y1}. Khi x = ${x2} thì y bằng bao nhiêu?`,y2,[-y2,k,y1+(x2-x1),y1*x2,y2+k].filter(v=>v!=y2),e,fd),[x1,y1,x2]]}),

/* Đưa tỉ số về hai số nguyên tối giản */
gen('tlt.dua_ve_nguyen',()=>{
 if(R(0,1)){
  let A,B,r;do{A=Fr(R(1,9),R(2,9));B=Fr(R(1,9),R(2,9));r=fdiv(A,B)}while(A[1]==1||B[1]==1||cmp(A,B)==0||r[0]>40||r[1]>40);
  const nu=A[0]*B[1],de=A[1]*B[0],
   e=sol([`Tỉ số của hai số là phép chia: ${S(A)} : ${S(B)} = ${S(A)} × ${S(Fr(B[1],B[0]))}.`,`= ${nu}/${de}${gcd(nu,de)>1?` = ${r[0]}/${r[1]} (rút gọn)`:''}.`,`Vậy tỉ số hai số nguyên tối giản là ${ra(r)}.`],`${ra(r)}.`),
   cand=uq([[r[1],r[0]],[A[0]*B[0],A[1]*B[1]],[A[0],B[0]],[A[1],B[1]]].filter(z=>cmp(z,r)!=0&&z[1]!=0));
  return[mc(`Đưa tỉ số ${S(A)} : ${S(B)} về tỉ số của hai số nguyên (tối giản):`,ra(r),cand.map(z=>`${z[0]} : ${z[1]}`),e,String),['f',A,B]]}
 let p,q;do{p=R(1,30);q=R(1,30)}while(p==q||p%10==0||q%10==0);
 const r=Fr(p,q),g=gcd(p,q),
  e=sol([`Nhân cả hai số với 10 để bỏ dấu phẩy: ${bd(BigInt(p),1)} : ${bd(BigInt(q),1)} = ${p} : ${q}.`,g>1?`ƯCLN(${p}; ${q}) = ${g}. Chia cả hai số cho ${g}: ${p} : ${q} = ${r[0]} : ${r[1]}.`:`${p} và ${q} nguyên tố cùng nhau nên tỉ số đã tối giản: ${r[0]} : ${r[1]}.`],`${ra(r)}.`),
  cand=uq([[r[1],r[0]],[r[0],r[1]+1],[r[0]+1,r[1]],[p,q*10]].filter(z=>cmp(z,r)!=0));
 return[mc(`Đưa tỉ số ${bd(BigInt(p),1)} : ${bd(BigInt(q),1)} về tỉ số của hai số nguyên (tối giản):`,ra(r),cand.map(z=>`${z[0]} : ${z[1]}`),e,String),['d',p,q]]}),

/* Nhận biết đại lượng tỉ lệ thuận, tỉ lệ nghịch từ bảng giá trị */
gen('tlt.nhan_biet_dai_luong',()=>{
 const kind=P(['thuan','nghich','khong']);let xs,ys;
 if(kind=='thuan'){xs=sh([1,2,3,4,5,6,8,10,12]).slice(0,4).sort((u,v)=>u-v);const k=R(2,9);ys=xs.map(v=>k*v)}
 else if(kind=='nghich'){const a=P([24,30,36,40,48,60,72,120]),ds=[];for(let d=1;d<=a;d++)if(a%d==0&&d<=30)ds.push(d);xs=sh(ds).slice(0,4).sort((u,v)=>u-v);ys=xs.map(v=>a/v)}
 else{xs=sh([1,2,3,4,5,6,8,10]).slice(0,4).sort((u,v)=>u-v);const c=R(1,9),k=P([1,1,2,3]);ys=xs.map(v=>k*v+c)}
 const pairs=xs.map((v,i)=>`(${v}; ${ys[i]})`).join(', '),rt=xs.map((v,i)=>`${ys[i]}/${v}`),pd=xs.map((v,i)=>`${v} · ${ys[i]} = ${v*ys[i]}`),
  sameR=ys.every((v,i)=>v*xs[0]==ys[0]*xs[i]),sameP=xs.every((v,i)=>v*ys[i]==xs[0]*ys[0]),
  ans=sameR?'Tỉ lệ thuận':sameP?'Tỉ lệ nghịch':'Không tỉ lệ thuận, cũng không tỉ lệ nghịch',
  opts=['Tỉ lệ thuận','Tỉ lệ nghịch','Không tỉ lệ thuận, cũng không tỉ lệ nghịch','Vừa tỉ lệ thuận, vừa tỉ lệ nghịch'],
  e=sol([`Tính tỉ số y : x của từng cặp: ${rt.map(z=>z+' = '+S(Fr(...z.split('/').map(Number)))).join('; ')}.`,`Tính tích x · y của từng cặp: ${pd.join('; ')}.`,
   sameR?`Các tỉ số y : x đều bằng nhau (bằng ${ys[0]/xs[0]}) nên y tỉ lệ thuận với x.`:sameP?`Các tích x · y đều bằng nhau (bằng ${xs[0]*ys[0]}) nên y tỉ lệ nghịch với x.`:`Các tỉ số y : x không bằng nhau và các tích x · y cũng không bằng nhau, nên y không tỉ lệ thuận, cũng không tỉ lệ nghịch với x.`],`${ans}.`);
 return[mc(`Cho các cặp giá trị tương ứng (x; y) của hai đại lượng: ${pairs}. Hai đại lượng x và y liên hệ với nhau như thế nào?`,ans,opts.filter(o=>o!=ans),e,String),[xs,ys]]})
);

/* ================= NÂNG CAO ================= */
addH('l7tlt',

/* x/a = y/b và x² + y² = S */
gen('tlt.tong_binh_phuong',()=>{
 let a,b;do{a=R(2,9);b=R(2,9)}while(a==b||gcd(a,b)!=1);
 const k=R(2,9),x=a*k,y=b*k,Sv=x*x+y*y,ask=P(['x','y','x + y']),ans=ask=='x'?x:ask=='y'?y:x+y,
  e=sol([`Bình phương hai vế của ${fh('x',a)} = ${fh('y',b)}: ${fh('x^2',a*a)} = ${fh('y^2',b*b)}.`,
   `Áp dụng tính chất dãy tỉ số bằng nhau: ${fh('x^2',a*a)} = ${fh('y^2',b*b)} = ${fh('x^2 + y^2',`${a*a} + ${b*b}`)} = ${fh(Sv,a*a+b*b)} = ${k*k}.`,
   `Gọi k là giá trị chung ${fh('x',a)} = ${fh('y',b)} = k thì k² = ${k*k}. Vì x, y dương nên k > 0, suy ra k = ${k}. Do đó x = ${a} × ${k} = ${x}; y = ${b} × ${k} = ${y}.`],`${ask} = ${ans}.`);
 return[mc(`Cho x, y là hai số dương thỏa mãn ${fh('x',a)} = ${fh('y',b)} và x^2 + y^2 = ${Sv}. Giá trị của ${ask} là:`,ans,ni([x,y,x+y,a*k*k,b*k*k,k*k],ans),e,fd),[a,b,Sv,ask]]}),

/* Hai ô tô: ô tô chậm đến muộn hơn */
gen('tlt.cdong_muon',()=>{
 const[v1,v2]=P([[40,60],[30,50],[45,60],[30,45],[50,75],[60,80],[40,50],[36,48],[24,36],[20,30]]),g=gcd(v1,v2),p=v1/g,q=v2/g,m=R(1,4),d=(q-p)*m,t2=p*m,AB=v2*t2,
  e=sol([`Cùng quãng đường AB, vận tốc và thời gian là hai đại lượng tỉ lệ nghịch. Gọi t1, t2 là thời gian của ô tô thứ nhất, thứ hai: t1 : t2 = ${v2} : ${v1} = ${q} : ${p}.`,
   `${fh('t1',q)} = ${fh('t2',p)} = ${fh('t1 − t2',`${q} − ${p}`)} = ${fh(d,q-p)} = ${m}.`,
   `t2 = ${p} × ${m} = ${t2} (giờ); t1 = ${q} × ${m} = ${q*m} (giờ).`,`Quãng đường AB = ${v2} × ${t2} = ${AB} (km).`],`${AB} km.`);
 return[mc(`Hai ô tô cùng khởi hành từ A đến B. Vận tốc ô tô thứ nhất là ${v1} km/h, ô tô thứ hai là ${v2} km/h. Ô tô thứ nhất đến B muộn hơn ô tô thứ hai ${d} giờ. Quãng đường AB dài bao nhiêu km?`,AB,ni([v1*t2,v2*q*m,d*v2,d*v1,(v1+v2)*m],AB),e,fd),[v1,v2,d]]}),

/* Tỉ lệ nghịch với hai đại lượng: số người và số giờ mỗi ngày */
gen('tlt.tln_nguoi_gio',()=>{
 let m1,d1,h1,tot,m2,h2,d2;
 for(let t=0;t<200;t++){m1=P([4,5,6,8,10,12,15]);d1=P([6,8,9,10,12,15,18,20]);h1=P([4,6,8]);tot=m1*d1*h1;
  const cs=[];for(const a of [3,4,5,6,8,10,12,15,20])for(const b of [3,4,5,6,8])if(tot%(a*b)==0&&tot/(a*b)!=d1&&tot/(a*b)>=2&&tot/(a*b)<=60)cs.push([a,b]);
  if(cs.length){[m2,h2]=P(cs);d2=tot/(m2*h2);break}}
 if(!d2)throw 0;
 const e=sol([`Khối lượng công việc không đổi: tổng số giờ công = số người × số ngày × số giờ mỗi ngày.`,`Tổng số giờ công = ${m1} × ${d1} × ${h1} = ${tot} (giờ công).`,`Với ${m2} người, mỗi người làm ${h2} giờ mỗi ngày thì mỗi ngày được ${m2} × ${h2} = ${m2*h2} (giờ công), nên cần ${tot} : ${m2*h2} = ${d2} (ngày).`],`${d2} ngày.`);
 return[mc(`Nếu ${m1} người làm việc ${h1} giờ mỗi ngày thì xong một công việc trong ${d1} ngày. Hỏi nếu ${m2} người (năng suất như nhau) làm việc ${h2} giờ mỗi ngày thì xong công việc đó trong bao nhiêu ngày?`,d2,ni([m1*d1/m2,d1*h1/h2,d1,d2+1,d2-1,d1*m2/m1],d2),e,fd),[m1,d1,h1,m2,h2]]}),

/* Ba lớp có số học sinh tỉ lệ; biết hiệu */
gen('tlt.hieu_ti_le',()=>{
 const[a,b,c]=P([[9,8,7],[5,4,3],[7,6,4],[8,7,5],[6,5,3],[9,7,5],[4,3,2],[7,5,3]]),m=R(2,9),d=(a-c)*m,tot=(a+b+c)*m,
  e=sol([`Số học sinh của ba lớp tỉ lệ với ${a} : ${b} : ${c}. Lớp 7A hơn lớp 7C ứng với ${a} − ${c} = ${a-c} phần.`,`Một phần ứng với ${d} : ${a-c} = ${m} (học sinh).`,`Tổng số phần = ${a} + ${b} + ${c} = ${a+b+c}. Tổng số học sinh = ${a+b+c} × ${m} = ${tot}.`],`${tot} học sinh.`);
 return[mc(`Số học sinh của ba lớp 7A, 7B, 7C tỉ lệ với ${a}; ${b}; ${c}. Lớp 7A có nhiều hơn lớp 7C ${d} học sinh. Tổng số học sinh của ba lớp là:`,tot,ni([a*m,c*m,tot+m,tot-m,(a+b+c)*d/(a-c)+m],tot),e,fd),[a,b,c,d]]}),

/* (x − p)/u = (y − q)/v = (z − r)/w và x + y + z = S */
gen('tlt.day_ti_so_dich',()=>{
 let p,q,r,u,v,w,k;
 do{p=R(-5,5);q=R(-5,5);r=R(-5,5);u=R(2,6);v=R(2,6);w=R(2,6);k=R(2,6)}while(!p||!q||!r||new Set([u,v,w]).size<3);
 const x=p+u*k,y=q+v*k,z=r+w*k,Sv=x+y+z,P3=p+q+r,ask=P(['x','y','z']),ans={x,y,z}[ask],
  ly=lin(q).replace('x','y'),lz=lin(r).replace('x','z'),
  e=sol([`Gọi k là giá trị chung của ba tỉ số. Áp dụng tính chất dãy tỉ số bằng nhau: k = ${fh(`(${lin(p)}) + (${ly}) + (${lz})`,`${u} + ${v} + ${w}`)}.`,
   `Tử số: (${lin(p)}) + (${ly}) + (${lz}) = (x + y + z) + ${pa(-P3)} = ${ng(Sv)} + ${pa(-P3)} = ${ng(Sv-P3)}. Mẫu số: ${u} + ${v} + ${w} = ${u+v+w}.`,
   `Vậy k = ${fh(ng(Sv-P3),u+v+w)} = ${k}.`,
   ask=='x'?`${lin(p)} = ${u} × ${k} = ${u*k}, nên x = ${u*k} + ${pa(p)} = ${x}.`:ask=='y'?`${ly} = ${v} × ${k} = ${v*k}, nên y = ${v*k} + ${pa(q)} = ${y}.`:`${lz} = ${w} × ${k} = ${w*k}, nên z = ${w*k} + ${pa(r)} = ${z}.`],`${ask} = ${ans}.`),
  base={x:u*k,y:v*k,z:w*k}[ask],cst={x:p,y:q,z:r}[ask];
 return[mc(`Cho ${fh(lin(p),u)} = ${fh(ly,v)} = ${fh(lz,w)} và x + y + z = ${Sv}. Tìm ${ask}.`,ans,[base,base-cst,k,ans+k,ans-k].filter(n=>n!=ans),e,fd),[p,q,r,u,v,w,Sv,ask]]})
);
})();
