/* LỚP 7 · v5 (phần 2) — Góc & đường thẳng song song, tam giác, quan hệ trong tam giác, hình hộp & lăng trụ, dữ liệu, xác suất.
   Dạng bài lấy từ tuyển tập chuyên đề bồi dưỡng HSG Toán 7 (hình học, đếm, xác suất). Có hình SVG cho các câu cần quan sát.
   Đáp án nhiễu = lỗi hay gặp (kèm lý do); lời giải từng bước. q.k + q.p dùng cho tools/verify.js. */
(()=>{
const {mc,sol,gen,ov,fd,ng,c2,lcm}=BK,fh=G7H.fh,fq=G7H.fq,add=G7H.add,addH=G7H.addH,
 sgn=v=>v<0?'−':'+',
 co=k=>k==1?'':k,
 lin=(c,k)=>`${co(c)}x ${sgn(k)} ${Math.abs(k)}`,
 /* chỉ giữ đáp án nhiễu dạng số có tối đa 1 chữ số thập phân (tránh 27,2727…) */
 ni=w=>w.filter(([v])=>typeof v!='number'||Math.abs(v*10-Math.round(v*10))<1e-9),
 /* hình quạt tô màu: tâm (cx,cy), bán kính r, từ góc a1 đến a2 (độ, ngược chiều kim đồng hồ) */
 sec=(cx,cy,r,a1,a2,col)=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy-r*Math.sin(a*Math.PI/180)].map(v=>v.toFixed(1)).join(' ');
  return `<path d="M${cx} ${cy}L${p(a1)}A${r} ${r} 0 ${(a2-a1)>180?1:0} 0 ${p(a2)}Z" style="fill:${col};fill-opacity:.6;stroke:none"/>`},
 /* nhãn đặt cạnh hình quạt: tự chọn phía để không đè lên đường thẳng */
 lab=(cx,cy,a1,a2,t)=>{const m=(a1+a2)/2*Math.PI/180,c=Math.cos(m),an=c>.3?'start':c<-.3?'end':'middle';
  return `<text x="${(cx+26*c).toFixed(1)}" y="${(cy-26*Math.sin(m)+4).toFixed(1)}" text-anchor="${an}" style="font-size:11px">${t}</text>`},
 /* hai đường thẳng a ∥ b bị cắt bởi c; kind: 'sole' | 'cungphia' | 'dongvi'; t1, t2: nhãn hai góc */
 par2=(kind,t1,t2)=>{const A=[100,45],B=[140,105],th=123.69,dn=-56.31,
  [sa,sb]={sole:[[180,303.69],[0,th]],cungphia:[[dn,0],[0,th]],dongvi:[[0,th],[0,th]]}[kind];
  return `<svg viewBox="0 0 240 150" class="fg"><path d="M12 45H228"/><path d="M12 105H228"/><path d="M80 15L160 135"/>${sec(A[0],A[1],20,sa[0],sa[1],'#feca57')}${sec(B[0],B[1],20,sb[0],sb[1],'#1dd1a1')}${lab(A[0],A[1],sa[0],sa[1],t1)}${lab(B[0],B[1],sb[0],sb[1],t2)}<text x="226" y="38" style="font-size:12px">a</text><text x="226" y="98" style="font-size:12px">b</text><text x="62" y="20" style="font-size:12px">c</text></svg>`},
 /* tam giác với ba trung tuyến và trọng tâm G */
 tri=()=>`<svg viewBox="0 0 240 150" class="fg"><path d="M120 14L32 128H208Z"/><path d="M120 14L120 128"/><path d="M32 128L164 71"/><path d="M208 128L76 71"/><circle cx="120" cy="90" r="3" style="fill:#feca57;stroke:none"/><text x="120" y="10" text-anchor="middle" style="font-size:12px">A</text><text x="22" y="138" style="font-size:12px">B</text><text x="212" y="138" style="font-size:12px">C</text><text x="120" y="142" text-anchor="middle" style="font-size:12px">M</text><text x="172" y="68" style="font-size:12px">N</text><text x="62" y="68" style="font-size:12px">P</text><text x="126" y="86" style="font-size:12px">G</text></svg>`;

/* ================= GÓC & ĐƯỜNG THẲNG SONG SONG ================= */
add('l7gdt',
/* Tìm x từ hai góc tạo bởi a ∥ b và cát tuyến c */
gen('gdt.tim_x_song2',()=>{
 const t=R(0,2),kind=['sole','cungphia','dongvi'][t],nm=['so le trong','trong cùng phía','đồng vị'][t],sw=R(0,1);
 let x,p,q,r,s,a1;
 do{x=R(8,40);q=R(5,30);
  if(t==1){p=R(1,4);r=R(1,4);s=180-(p+r)*x-q}else{r=R(1,3);p=r+R(1,3);s=(p-r)*x+q}
  a1=p*x+q}while(a1<20||a1>160||Math.abs(s)>70||!s||(t==1&&!(q+s)));
 const a2=t==1?180-a1:a1,
  T=[[p,q,a1],[r,s,a2]],D=sw?[T[1],T[0]]:[T[0],T[1]],
  str=d=>`(${lin(d[0],d[1])})°`,
  e1=str(D[0]),e2=str(D[1]),
  eq=t==1?`${lin(p,q)} + ${lin(r,s)} = 180`:`${lin(D[0][0],D[0][1])} = ${lin(D[1][0],D[1][1])}`,
  e=sol([`Vì a ∥ b nên ${t==1?'hai góc trong cùng phía bù nhau (tổng bằng 180°)':`hai góc ${nm} bằng nhau`}.`,`Ta có: ${eq}.`,
   t==1?`${p+r}x ${sgn(q+s)} ${Math.abs(q+s)} = 180 ⟹ ${p+r}x = ${180-q-s} ⟹ x = ${x}.`:(p-r==1?`Chuyển vế: x = ${s-q}.`:`Chuyển vế: ${p-r}x = ${s-q} ⟹ x = ${x}.`),
   `Thử lại: ${e1} = ${D[0][2]}° và ${e2} = ${D[1][2]}°${t==1?' (tổng 180° ✓)':' (bằng nhau ✓)'}.`],`x = ${x}.`,
   t==1?'Hai góc trong cùng phía BÙ nhau (tổng 180°), không bằng nhau.':`Hai góc ${nm} BẰNG nhau (không bù nhau).`),
  ok=v=>Number.isFinite(v)&&Math.abs(v*10-Math.round(v*10))<1e-9&&v>0,w=[];
 if(t==1){if(p!=r){const v=(s-q)/(p-r);if(ok(v))w.push([v,'coi hai góc bằng nhau (nhầm với so le trong)'])}const u=(180+q+s)/(p+r);if(ok(u))w.push([u,'chuyển vế không đổi dấu'])}
 else{const v=(180-q-s)/(p+r);if(ok(v))w.push([v,'coi hai góc bù nhau (nhầm với trong cùng phía)']);const u=(s+q)/(p-r);if(ok(u))w.push([u,'chuyển vế không đổi dấu'])}
 if(t==1)w.push([180-q-s,'quên chia cho hệ số của x (p + r)']);else if(p-r>1)w.push([s-q,'quên chia cho hệ số của x sau khi chuyển vế']);
 w.push([D[0][2],'đó là số đo của một góc, chưa phải x'],[D[1][2],'đó là số đo của góc còn lại, chưa phải x']);
 const o=mc(`Cho a ∥ b và đường thẳng c cắt a, b. Hai góc ${nm} có số đo ${e1} và ${e2} (xem hình). Tìm x.`,x,w,e,fd);o.f=par2(kind,e1,e2);return[o,[t,p,q,r,s]]}),

/* Đếm các cặp góc khi một cát tuyến cắt hai đường thẳng */
gen('gdt.dem_cap',()=>{
 const t=R(0,5),Q=[
  {q:'cặp góc đồng vị',a:4,w:[[2,'chỉ đếm cặp so le trong hoặc trong cùng phía'],[8,'đó là số góc tạo thành'],[6,'đếm thừa']],e:'Ở mỗi phía của đường thẳng c có 2 cặp góc đồng vị (một cặp ở "trên", một cặp ở "dưới"): 2 × 2 = 4 cặp.'},
  {q:'cặp góc so le trong',a:2,w:[[4,'đó là số cặp góc đồng vị'],[1,'chỉ đếm một cặp'],[8,'đó là số góc tạo thành']],e:'Hai góc so le trong nằm giữa a, b và ở hai phía khác nhau của c: có đúng 2 cặp.'},
  {q:'cặp góc trong cùng phía',a:2,w:[[4,'đó là số cặp góc đồng vị'],[1,'chỉ đếm một cặp'],[8,'đó là số góc tạo thành']],e:'Hai góc trong cùng phía nằm giữa a, b và cùng một phía của c: có đúng 2 cặp (mỗi phía một cặp).'},
  {q:'góc (nhỏ hơn 180°)',a:8,w:[[4,'chỉ đếm góc ở một giao điểm'],[6,'đếm thiếu'],[16,'đếm cả góc bẹt hoặc đếm hai lần']],e:'Mỗi giao điểm tạo 4 góc; có 2 giao điểm: 2 × 4 = 8 góc.'},
  {q:'cặp góc đối đỉnh',a:4,w:[[2,'chỉ đếm ở một giao điểm'],[8,'đó là số góc tạo thành'],[6,'đếm thừa']],e:'Mỗi giao điểm có 2 cặp góc đối đỉnh; có 2 giao điểm: 2 × 2 = 4 cặp.'},
  {q:'cặp góc kề bù',a:8,w:[[4,'chỉ đếm ở một giao điểm'],[2,'nhầm với số cặp góc đối đỉnh ở một giao điểm'],[16,'đếm mỗi cặp hai lần']],e:'Mỗi giao điểm có 4 cặp góc kề bù (4 góc xếp quanh điểm, hai góc liên tiếp là kề bù); có 2 giao điểm: 2 × 4 = 8 cặp.'}][t],
  e=sol([`Đường thẳng c cắt a tại A và cắt b tại B, tạo ra 8 góc (4 góc tại mỗi giao điểm).`,Q.e],`có ${Q.a}.`,`Phân biệt rõ vị trí của từng cặp góc: so le trong, đồng vị, trong cùng phía, đối đỉnh, kề bù.`);
 return[mc(`Đường thẳng c cắt hai đường thẳng phân biệt a và b tại hai điểm khác nhau. Trong hình tạo thành có tất cả bao nhiêu ${Q.q}?`,Q.a,Q.w,e),[t]]})
);

addH('l7gdt',
/* n đường thẳng đôi một cắt nhau, không ba đường nào đồng quy */
gen('gdt.n_duong_cat',()=>{
 const n=R(4,9),pts=n*(n-1)/2,ans=n*(n-1),
  e=sol([`${n} đường thẳng đôi một cắt nhau, không có ba đường nào đồng quy: mỗi cặp đường thẳng cho một giao điểm riêng. Số giao điểm = ${n} × ${n-1} : 2 = ${pts}.`,`Tại mỗi giao điểm, hai đường thẳng cắt nhau tạo ra 2 cặp góc đối đỉnh.`,`Số cặp góc đối đỉnh = ${pts} × 2 = ${ans}.`],`có ${ans} cặp góc đối đỉnh.`,`${pts} là số giao điểm (số cặp đường thẳng), chưa phải số cặp góc đối đỉnh.`);
 return[mc(`Cho ${n} đường thẳng phân biệt, đôi một cắt nhau và không có ba đường thẳng nào đồng quy. Có tất cả bao nhiêu cặp góc đối đỉnh (không kể góc bẹt) được tạo thành?`,ans,[[pts,'đó là số giao điểm'],[4*pts,'đó là số góc tạo thành (mỗi giao điểm có 4 góc)'],[n*n,'bình phương số đường thẳng'],[3*pts,'mỗi giao điểm chỉ có 3 cặp góc đối đỉnh']],e),[n]]})
);

/* ================= TAM GIÁC BẰNG NHAU ================= */
add('l7tgb',
/* Điều kiện bổ sung để hai tam giác bằng nhau */
gen('tgb.dieu_kien_bang',()=>{
 const[A,B,C,D,E,F]=P([['A','B','C','D','E','F'],['M','N','P','X','Y','Z'],['H','K','L','R','S','T']]),t=R(0,1),
  ang=(u,v)=>`∠${u} = ∠${v}`,sd=(a,b,c,d)=>`${a}${b} = ${c}${d}`,
  given=`${sd(A,B,D,E)} và ${sd(A,C,D,F)}`;let ans,w,st;
 if(t==0){ans=ang(A,D);
  w=[[ang(B,E),`góc ${B} không xen giữa hai cạnh ${A}${B} và ${A}${C}`],[sd(B,C,E,F),'đó là điều kiện của trường hợp cạnh-cạnh-cạnh'],[ang(C,F),`góc ${C} không xen giữa hai cạnh ${A}${B} và ${A}${C}`]];
  st=[`Trường hợp cạnh-góc-cạnh (c.g.c): hai cạnh và GÓC XEN GIỮA hai cạnh đó bằng nhau.`,`Hai cạnh đã có là ${A}${B} và ${A}${C}; góc xen giữa hai cạnh này là góc ${A} (đỉnh chung của ${A}${B} và ${A}${C}).`,`Cần thêm ${ans}.`]}
 else{ans=sd(B,C,E,F);
  w=[[ang(A,D),'đó là điều kiện của trường hợp cạnh-góc-cạnh'],[ang(B,E),'một góc bằng nhau chưa đủ để dùng c.c.c'],[ang(C,F),'một góc bằng nhau chưa đủ để dùng c.c.c']];
  st=[`Trường hợp cạnh-cạnh-cạnh (c.c.c): ba cạnh của tam giác này bằng ba cạnh của tam giác kia.`,`Đã có hai cặp cạnh bằng nhau: ${A}${B} = ${D}${E} và ${A}${C} = ${D}${F}.`,`Cần thêm cặp cạnh thứ ba: ${ans}.`]}
 const e=sol(st,`điều kiện cần thêm: ${ans}.`,`Phải đúng tên trường hợp: c.g.c cần góc xen giữa, c.c.c cần cạnh thứ ba.`);
 return[mc(`Hai tam giác ${A}${B}${C} và ${D}${E}${F} có ${given}. Cần thêm điều kiện nào để Δ${A}${B}${C} = Δ${D}${E}${F} theo trường hợp ${t==0?'cạnh-góc-cạnh (c.g.c)':'cạnh-cạnh-cạnh (c.c.c)'}?`,ans,w,e,String),[t,A,B,C,D,E,F]]})
);

addH('l7tgb',
/* Tam giác cân biết một góc */
gen('tgb.can_goc',()=>{
 const t=R(0,1);let al;
 if(t==0){do{al=2*R(10,44)}while(al==60)}else{do{al=2*R(46,80)}while(al==120)}
 const g=180-2*al,b=(180-al)/2;let ans,w,e;
 if(t==0){ans=`${al}° và ${g}° hoặc ${b}° và ${b}°`;
  w=[[`${al}° và ${g}°`,`chỉ xét trường hợp ${al}° là góc ở đáy`],[`${b}° và ${b}°`,`chỉ xét trường hợp ${al}° là góc ở đỉnh`],[`${al}° và ${180-al}°`,'coi hai góc còn lại cùng bù với góc đã cho'],[`${al}° và ${al}°`,'coi cả hai góc còn lại bằng góc đã cho']];
  e=sol([`Tam giác cân có hai góc ở đáy bằng nhau. Chưa biết ${al}° là góc ở đáy hay góc ở đỉnh nên xét hai trường hợp.`,`TH1: ${al}° là góc ở đáy. Góc đáy còn lại cũng ${al}°, góc ở đỉnh = 180° − 2 × ${al}° = ${g}°.`,`TH2: ${al}° là góc ở đỉnh. Hai góc đáy bằng nhau = (180° − ${al}°) : 2 = ${b}°.`],`hai góc còn lại là ${ans}.`,`Bỏ sót một trường hợp là lỗi hay gặp nhất của bài này.`)}
 else{ans=`${b}° và ${b}°`;
  w=[[`${al/2}° và ${al/2}°`,'chia đôi góc đã cho'],[`${180-al}° và ${180-al}°`,'lấy mỗi góc bằng phần bù của góc đã cho'],[`60° và 60°`,'nhầm với tam giác đều']];
  e=sol([`${al}° là góc tù (lớn hơn 90°). Tam giác không thể có hai góc tù (tổng hai góc đó vượt quá 180°).`,`Do hai góc đáy bằng nhau nên ${al}° không thể là góc đáy ⟹ ${al}° là góc ở đỉnh.`,`Mỗi góc đáy = (180° − ${al}°) : 2 = ${b}°.`],`hai góc còn lại là ${b}° và ${b}°.`,`Góc tù chỉ có thể là góc ở đỉnh của tam giác cân.`)}
 return[mc(`Một tam giác cân có một góc bằng ${al}°. Số đo hai góc còn lại là:`,ans,w,e,String),[t,al]]}),

/* Hai góc ngoài → góc trong thứ ba */
gen('tgb.goc_ngoai_tong',()=>{
 let A,B,C;do{A=R(35,85);B=R(35,85);C=180-A-B}while(C<25||C>110||A==B||A==C||B==C);
 const xa=180-A,xb=180-B,
  e=sol([`Góc ngoài bù với góc trong kề nó: ∠A = 180° − ${xa}° = ${A}°; ∠B = 180° − ${xb}° = ${B}°.`,`Tổng ba góc trong tam giác bằng 180° nên ∠C = 180° − ${A}° − ${B}° = ${C}°.`,`Kiểm tra bằng góc ngoài: ${xa}° + ${xb}° − 180° = ${xa+xb-180}° = ∠C.`],`∠C = ${C}°.`,`Tổng hai góc ngoài (${xa+xb}°) không phải là góc C.`);
 return[mc(`Tam giác ABC có góc ngoài tại đỉnh A bằng ${xa}° và góc ngoài tại đỉnh B bằng ${xb}°. Số đo góc C là (độ):`,C,[[xa+xb,'cộng hai góc ngoài'],[360-xa-xb,'đó là góc ngoài tại đỉnh C, không phải góc C'],[A,'đó là số đo góc A'],[B,'đó là số đo góc B']],e),[xa,xb]]})
);

/* ================= QUAN HỆ TRONG TAM GIÁC ================= */
add('l7qht',
/* Sắp xếp các góc theo độ dài ba cạnh */
gen('qht.sapxep_goc',()=>{
 let a,b,c;do{a=R(3,12);b=R(3,12);c=R(3,12)}while(a==b||b==c||a==c||a+b<=c||b+c<=a||a+c<=b);
 const len={AB:a,BC:b,CA:c},opp={A:'BC',B:'CA',C:'AB'},adj1={A:'AB',B:'BC',C:'CA'},adj2={A:'CA',B:'AB',C:'BC'},vs=['A','B','C'],
  ord=f=>[...vs].sort((u,v)=>f(u)-f(v)),show=o=>o.map(v=>'∠'+v).join(' < '),
  corr=ord(v=>len[opp[v]]),ans=show(corr),
  perms=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]].map(p=>p.map(i=>vs[i])),
  w=[[show([...corr].reverse()),'xếp ngược: góc đối diện cạnh lớn hơn thì lớn hơn'],
     [show(ord(v=>len[adj1[v]])),'xếp theo độ dài cạnh kề (AB, BC, CA) thay vì cạnh đối diện'],
     [show(ord(v=>len[adj2[v]])),'xếp theo độ dài cạnh kề (CA, AB, BC) thay vì cạnh đối diện'],
     ...perms.map(p=>[show(p),'không đúng thứ tự độ dài của ba cạnh đối diện'])],
  e=sol([`Trong một tam giác, góc đối diện với cạnh lớn hơn thì lớn hơn. Vì vậy phải xét CẠNH ĐỐI DIỆN với từng góc.`,
   `∠A đối diện BC = ${b} cm; ∠B đối diện CA = ${c} cm; ∠C đối diện AB = ${a} cm.`,
   `Sắp xếp độ dài cạnh đối diện từ nhỏ đến lớn: ${[...corr].map(v=>`${opp[v]} = ${len[opp[v]]}`).join(' < ')}.`,
   `Suy ra thứ tự các góc: ${ans}.`],`${ans}.`,`Góc nằm ĐỐI DIỆN với cạnh, không phải góc kề cạnh đó.`);
 return[mc(`Tam giác ABC có AB = ${a} cm, BC = ${b} cm, CA = ${c} cm. Sắp xếp ba góc của tam giác theo thứ tự từ nhỏ đến lớn:`,ans,w,e,String),[a,b,c]]})
);

addH('l7qht',
/* Đếm tam giác có chu vi cho trước */
gen('qht.dem_tamgiac',()=>{
 let n,tri,deg,ord,dg;
 do{n=R(9,16);tri=[];dg=[];deg=0;ord=0;
  for(let a=1;a<=n;a++)for(let b=a;b<=n;b++){const c=n-a-b;if(c<b)continue;if(a+b>c)tri.push([a,b,c]);else if(a+b==c)dg.push([a,b,c])}
  deg=tri.length+dg.length;
  for(const[x,y,z]of tri)ord+=(x==y&&y==z)?1:(x==y||y==z)?3:6}while(tri.length<2||!dg.length);
 const e=sol([`Gọi ba cạnh a ≤ b ≤ c có a + b + c = ${n}. Điều kiện bất đẳng thức tam giác chỉ cần kiểm tra cho cạnh lớn nhất: a + b > c.`,`Vì a + b + c = ${n} nên a + b = ${n} − c, điều kiện trở thành ${n} − c > c, tức c < ${fd(n/2)}.`,`Liệt kê các bộ (a; b; c) thỏa mãn: ${tri.map(t=>`(${t.join('; ')})`).join(', ')}.`,`Có ${tri.length} tam giác (các hoán vị của cùng một bộ ba chỉ là một tam giác).`],`có ${tri.length} tam giác.`,`Bộ có a + b = c (ví dụ (${dg[0].join('; ')})) không tạo thành tam giác vì ba điểm thẳng hàng.`);
 return[mc(`Có bao nhiêu tam giác (không kể thứ tự các cạnh) có độ dài ba cạnh là các số nguyên (cm) và chu vi bằng ${n} cm?`,tri.length,[[deg,'tính cả các bộ ba suy biến (a + b = c)'],[ord,'đếm cả các hoán vị của cùng một bộ ba'],[tri.length+1,'đếm thừa 1 bộ'],[tri.length-1,'bỏ sót 1 bộ']],e),[n]]}),

/* GA + GB + GC từ ba trung tuyến */
gen('qht.trungtuyen_tong',()=>{
 const am=3*R(3,10),bn=3*R(3,10),cp=3*R(3,10),sm=am+bn+cp,ans=2*sm/3,
  e=sol([`Trọng tâm G chia mỗi trung tuyến thành hai đoạn theo tỉ lệ 2 : 1 (kể từ đỉnh): GA = ${fh(2,3)}AM; GB = ${fh(2,3)}BN; GC = ${fh(2,3)}CP.`,`GA = ${fh(2,3)} × ${am} = ${2*am/3}; GB = ${fh(2,3)} × ${bn} = ${2*bn/3}; GC = ${fh(2,3)} × ${cp} = ${2*cp/3}.`,`GA + GB + GC = ${2*am/3} + ${2*bn/3} + ${2*cp/3} = ${ans} (cm).`],`GA + GB + GC = ${ans} cm.`,`G chia trung tuyến theo tỉ lệ 2 : 1 tính từ ĐỈNH (đoạn dài ở phía đỉnh), nên GA = ${fh(2,3)}AM, không phải ${fh(1,3)}AM.`),
  o=mc(`Cho tam giác ABC có ba đường trung tuyến AM = ${am} cm, BN = ${bn} cm, CP = ${cp} cm cắt nhau tại trọng tâm G (xem hình). Tổng GA + GB + GC bằng (cm):`,ans,ni([[sm,'cộng ba trung tuyến, quên nhân với 2/3'],[sm/3,'dùng tỉ lệ 1/3 thay vì 2/3'],[sm*2/9,'nhân với 2/3 hai lần'],[sm/2,'chia đôi tổng ba trung tuyến']]),e,fd);
 o.f=tri();return[o,[am,bn,cp]]}),

/* Chu vi lớn nhất / nhỏ nhất khi cạnh thứ ba nguyên */
gen('qht.chuvi_cuc_tri',()=>{
 let a,b;do{a=R(3,12);b=R(3,12)}while(a==b);
 const t=R(0,1),hi=Math.max(a,b),lo=Math.min(a,b),cmin=hi-lo+1,cmax=a+b-1,ans=t==0?a+b+cmax:a+b+cmin,
  e=sol([`Cạnh thứ ba c phải thỏa mãn |${a} − ${b}| < c < ${a} + ${b}, tức ${hi-lo} < c < ${a+b}.`,`c là số nguyên nên ${cmin} ≤ c ≤ ${cmax}.`,t==0?`Chu vi lớn nhất khi c lớn nhất = ${cmax}: ${a} + ${b} + ${cmax} = ${ans} (cm).`:`Chu vi nhỏ nhất khi c nhỏ nhất = ${cmin}: ${a} + ${b} + ${cmin} = ${ans} (cm).`],`chu vi ${t==0?'lớn':'nhỏ'} nhất là ${ans} cm.`,`Dấu "<" là bất đẳng thức NGẶT nên c không thể bằng ${a+b} hay ${hi-lo}.`);
 return[mc(`Một tam giác có hai cạnh dài ${a} cm và ${b} cm, cạnh thứ ba có độ dài là một số nguyên (cm). Chu vi ${t==0?'lớn':'nhỏ'} nhất của tam giác là (cm):`,ans,
  t==0?[[2*(a+b),'lấy c = a + b (dấu "=" không xảy ra trong tam giác)'],[a+b+hi,'lấy cạnh thứ ba bằng cạnh lớn hơn'],[2*(a+b)-2,'bỏ sót giá trị c = a + b − 1'],[a+b+lo,'lấy cạnh thứ ba bằng cạnh nhỏ hơn']]
   :[[a+b+hi-lo,'lấy c = |a − b| (dấu "=" không xảy ra)'],[a+b+1,'lấy c = 1'],[a+b+lo,'lấy cạnh thứ ba bằng cạnh nhỏ hơn'],[a+b+cmin+1,'bỏ sót giá trị c nhỏ nhất']],e),[a,b,t]]})
);

/* ================= HÌNH HỘP & LĂNG TRỤ ================= */
add('l7hk',
/* Đếm đỉnh – cạnh – mặt của lăng trụ đứng */
gen('hk.lang_tru_dem',()=>{
 const n=R(3,10),t=R(0,2),V=2*n,E=3*n,F=n+2;let q,ans,w,st;
 if(t==0){q=`Một hình lăng trụ đứng có ${F} mặt. Số cạnh của lăng trụ đó là:`;ans=E;
  w=[[3*F,'nhân 3 với số mặt, quên rằng 2 mặt đáy không phải mặt bên'],[2*n,'chỉ đếm cạnh của hai đáy, quên các cạnh bên'],[n,'đó là số cạnh của một đáy'],[3*(F-1),'chỉ trừ 1 mặt đáy thay vì 2']];
  st=[`Lăng trụ đứng có 2 mặt đáy; các mặt còn lại là mặt bên. Số mặt bên = ${F} − 2 = ${n}, nên đáy là đa giác ${n} cạnh.`,`Mỗi đáy có ${n} cạnh, ngoài ra có ${n} cạnh bên: số cạnh = ${n} + ${n} + ${n} = ${E}.`]}
 else if(t==1){q=`Một hình lăng trụ đứng có ${E} cạnh. Số đỉnh của lăng trụ đó là:`;ans=V;
  w=[[n,'đó là số đỉnh của một đáy'],[F,'đó là số mặt'],[E-2,'dùng nhầm: số đỉnh = số cạnh − 2'],[2*V,'dùng nhầm hệ thức Ơ-le: số đỉnh = số cạnh + số mặt − 2']];
  st=[`Cạnh gồm ${n} cạnh đáy trên, ${n} cạnh đáy dưới và ${n} cạnh bên (n cạnh mỗi loại): 3n = ${E} ⟹ n = ${n}.`,`Hai đáy, mỗi đáy ${n} đỉnh nên số đỉnh = 2 × ${n} = ${V}.`]}
 else{q=`Một hình lăng trụ đứng có ${V} đỉnh. Số mặt của lăng trụ đó là:`;ans=F;
  w=[[n,'chỉ đếm các mặt bên, quên 2 mặt đáy'],[V,'nhầm số mặt bằng số đỉnh'],[n+1,'chỉ tính một mặt đáy'],[V+2,'cộng 2 vào số đỉnh']];
  st=[`Hai đáy có chung số đỉnh nên mỗi đáy có ${V} : 2 = ${n} đỉnh, tức đáy là đa giác ${n} cạnh.`,`Số mặt bên = số cạnh đáy = ${n}; thêm 2 mặt đáy: ${n} + 2 = ${F}.`]}
 const e=sol([...st,`Kiểm tra bằng hệ thức Ơ-le: (số đỉnh) + (số mặt) − (số cạnh) = ${V} + ${F} − ${E} = 2 ✓.`],`${ans}.`,`Lăng trụ đứng đáy n-giác có 2n đỉnh, 3n cạnh và n + 2 mặt; đừng quên 2 mặt đáy.`);
 return[mc(q,ans,w,e),[t,n]]})
);

addH('l7hk',
/* Thả vật chìm trong bể */
gen('hk.nuoc_dang',()=>{
 const a=P([20,25,30,40,50]),b=P([20,30,40,50]),dh=R(1,6),V=a*b*dh,
  e=sol([`Thể tích nước dâng thêm bằng thể tích vật chìm: ${V} cm³.`,`Phần nước dâng lên là một hình hộp chữ nhật có đáy ${a} cm × ${b} cm = ${a*b} cm² và chiều cao cần tìm.`,`Chiều cao = ${V} : ${a*b} = ${dh} (cm).`],`mực nước dâng thêm ${dh} cm.`,`Phải chia cho DIỆN TÍCH ĐÁY (${a} × ${b}), không chia cho một cạnh hay chu vi.`);
 return[mc(`Một bể hình hộp chữ nhật có đáy rộng ${a} cm × ${b} cm đang chứa nước. Thả chìm hoàn toàn một khối đá có thể tích ${V} cm³ vào bể (nước không tràn ra ngoài). Mực nước trong bể dâng thêm bao nhiêu xăng-ti-mét?`,dh,ni([[V/a,`chia cho một cạnh đáy (${a} cm)`],[V/b,`chia cho một cạnh đáy (${b} cm)`],[V/(a+b),'chia cho tổng hai cạnh đáy'],[V/(2*(a+b)),'chia cho chu vi đáy'],[dh*10,'đổi nhầm sang milimét'],[dh/10,'đổi nhầm sang đề-xi-mét']]),e,fd),[a,b,V]]}),

/* Cắt bỏ khối lập phương ở một góc: diện tích toàn phần */
gen('hk.cat_goc_khoi',()=>{
 let a,b,c,k;do{a=R(6,14);b=R(6,14);c=R(6,14);k=R(2,5)}while(k>=Math.min(a,b,c));
 const S=2*(a*b+b*c+c*a),
  e=sol([`Diện tích toàn phần hình hộp ban đầu: 2 × (${a}×${b} + ${b}×${c} + ${c}×${a}) = ${S} cm².`,`Cắt bỏ khối lập phương cạnh ${k} cm ở một góc: bề mặt cũ mất 3 mặt hình vuông cạnh ${k} (3 × ${k*k} = ${3*k*k} cm²).`,`Nhưng ở chỗ cắt lại xuất hiện 3 mặt vuông mới cạnh ${k} (cũng 3 × ${k*k} = ${3*k*k} cm²). Phần mất đi và phần thêm vào bằng nhau nên diện tích toàn phần không đổi: ${S} cm².`],`${S} cm².`,`Phần bị cắt làm mất 3 mặt nhưng tạo ra 3 mặt mới bằng chúng, nên diện tích không đổi (khác với thể tích, giảm ${k*k*k} cm³).`);
 return[mc(`Từ một khối hình hộp chữ nhật có ba kích thước ${a} cm, ${b} cm, ${c} cm, người ta cắt bỏ một khối lập phương cạnh ${k} cm ở một góc. Diện tích toàn phần của phần còn lại là (cm²):`,S,[[S-3*k*k,'trừ ba mặt bị cắt mà quên cộng ba mặt mới'],[S-6*k*k,'trừ cả sáu mặt'],[S+3*k*k,'cộng ba mặt mới mà quên trừ ba mặt bị mất'],[a*b*c-k**3,'đó là thể tích phần còn lại']],e),[a,b,c,k]]}),

/* Lăng trụ đứng đáy hình thoi */
gen('hk.thetich_thoi',()=>{
 let d1,d2,h;do{d1=R(4,16);d2=R(4,16);h=R(3,12)}while(d1==d2||(d1*d2*h)%2);
 const V=d1*d2*h/2,
  e=sol([`Diện tích đáy hình thoi = (đường chéo thứ nhất × đường chéo thứ hai) : 2 = ${d1} × ${d2} : 2 = ${d1*d2/2} (cm²).`,`Thể tích lăng trụ = diện tích đáy × chiều cao = ${d1*d2/2} × ${h} = ${V} (cm³).`],`${V} cm³.`,`Đừng quên chia 2 khi tính diện tích hình thoi.`);
 return[mc(`Một lăng trụ đứng có đáy là hình thoi với hai đường chéo dài ${d1} cm và ${d2} cm, chiều cao lăng trụ là ${h} cm. Thể tích lăng trụ là (cm³):`,V,ni([[d1*d2*h,'quên chia 2 khi tính diện tích hình thoi'],[d1*d2/2,'đó là diện tích đáy, chưa nhân chiều cao'],[(d1+d2)*h,'cộng hai đường chéo thay vì nhân'],[d1*d2*h/4,'chia 4 thay vì chia 2']]),e,fd),[d1,d2,h]]})
);

/* ================= THU THẬP & BIỂU DIỄN DỮ LIỆU ================= */
add('l7bd',
/* Biểu đồ hình quạt: tìm phần trăm từ các góc ở tâm */
gen('bd.pie_goc4',()=>{
 let v;do{v=[R(2,9),R(2,9),R(2,9)].map(x=>x*5);v.push(100-v[0]-v[1]-v[2])}while(v[3]<10||v[3]>45);
 const ang=v.map(x=>x*3.6),LB=['Giỏi','Khá','Đạt','Chưa đạt'],sum3=ang[0]+ang[1]+ang[2],
  e=sol([`Cả hình tròn là 360°, tương ứng 100%, nên 1% ứng với 3,6°.`,`Tổng ba góc đã biết = ${fd(ang[0])}° + ${fd(ang[1])}° + ${fd(ang[2])}° = ${fd(sum3)}°.`,`Góc của hình quạt "${LB[3]}" = 360° − ${fd(sum3)}° = ${fd(ang[3])}°.`,`Tỉ lệ phần trăm = ${fd(ang[3])} : 3,6 = ${v[3]}%.`],`hình quạt "${LB[3]}" chiếm ${v[3]}%.`,`Đừng nhầm số đo góc (độ) với phần trăm: 1% ứng với 3,6°, không phải 1°.`);
 return[mc(`Biểu đồ hình quạt tròn thể hiện xếp loại học lực của một lớp. Các hình quạt "${LB[0]}", "${LB[1]}", "${LB[2]}" có góc ở tâm lần lượt là ${fd(ang[0])}°, ${fd(ang[1])}°, ${fd(ang[2])}°. Hình quạt "${LB[3]}" chiếm bao nhiêu phần trăm?`,v[3],[[ang[3],'đó là số đo góc ở tâm (độ), chưa đổi ra phần trăm'],[ang[3]/3,'chia cho 3 thay vì 3,6'],[v[0]+v[1]+v[2],'đó là tổng phần trăm ba hình quạt đã biết'],[ang[3]/360,'chia cho 360 mà quên nhân 100']],e,x=>fd(x)+'%'),[ang[0],ang[1],ang[2]]]})
);

addH('l7bd',
/* Số trung bình cộng từ bảng tần số */
gen('bd.tbc_tanso',()=>{
 const xs=[5,6,7,8,9];let ns,N,S;
 do{ns=xs.map(()=>R(2,10));N=ns.reduce((a,b)=>a+b);S=ns.reduce((s,n,i)=>s+n*xs[i],0)}
 while(new Set(ns).size<4||(S*10)%N==0||(2*((S*10)%N))==N);
 const mean=Math.round(S*10/N)/10,sm=xs.reduce((a,b)=>a+b)/xs.length,mode=xs[ns.indexOf(Math.max(...ns))],
  e=sol([`Số bạn của cả lớp: ${ns.join(' + ')} = ${N}.`,`Tổng điểm = ${xs.map((x,i)=>`${x}×${ns[i]}`).join(' + ')} = ${S}.`,`Điểm trung bình = ${S} : ${N} ≈ ${fd(S/N)} ≈ ${fd(mean)} (làm tròn đến hàng phần mười).`],`điểm trung bình ≈ ${fd(mean)}.`,`Phải nhân từng giá trị với TẦN SỐ của nó rồi mới chia cho tổng số bạn (${N}), không chia cho số giá trị (5).`);
 return[mc(`Kết quả bài kiểm tra của một lớp: ${xs.map((x,i)=>`điểm ${x} có ${ns[i]} bạn`).join('; ')}. Điểm trung bình của lớp (làm tròn đến hàng phần mười) là:`,mean,[[sm,'lấy trung bình cộng các giá trị điểm, quên nhân với tần số'],[mode,'đó là mốt (giá trị có tần số lớn nhất), không phải trung bình'],[S,'đó là tổng điểm, chưa chia cho số bạn'],[Math.round(S/N),'làm tròn đến hàng đơn vị thay vì hàng phần mười']],e,fd),[xs,ns]]}),

/* Biểu đồ đoạn thẳng: tăng bao nhiêu phần trăm */
gen('bd.lch_phantram',()=>{
 let v2,pct,v3;do{v2=P([20,25,40,50,80]);pct=P([10,20,25,40,50]);v3=v2*(1+pct/100)}while(!Number.isInteger(v3));
 const v=[R(15,30),v2,v3,v3+R(-8,10),v3+R(2,14)],MO=['T1','T2','T3','T4','T5'],r1=x=>Math.round(x*10)/10,
  e=sol([`Từ biểu đồ: tháng T2 bán ${v2} sản phẩm, tháng T3 bán ${v3} sản phẩm.`,`Số sản phẩm tăng thêm = ${v3} − ${v2} = ${v3-v2}.`,`So với T2: ${v3-v2} : ${v2} = ${fd((v3-v2)/v2)} = ${pct}%.`],`T3 tăng ${pct}% so với T2.`,`Phần trăm tăng phải tính so với tháng TRƯỚC (T2), không phải tháng sau (T3).`),
  o=mc(`Biểu đồ đoạn thẳng cho số sản phẩm bán được mỗi tháng. Số sản phẩm bán được của tháng T3 tăng bao nhiêu phần trăm so với tháng T2?`,pct,[[r1((v3-v2)/v3*100),'so sánh với tháng sau (T3) thay vì tháng trước (T2)'],[v3-v2,'đó là số sản phẩm tăng thêm, chưa đổi ra phần trăm'],[100+pct,'đó là T3 bằng bao nhiêu % của T2, chưa trừ 100%'],[pct/2,'chia đôi']],e,x=>fd(x)+'%');
 o.f=G7H.lch(v,MO);return[o,[v2,v3]]})
);

/* ================= BIẾN CỐ & XÁC SUẤT ================= */
add('l7xs',
/* Bảng tần số tung xúc xắc: xác suất thực nghiệm mặt chẵn */
gen('xs.tanso_thucnghiem',()=>{
 const N=P([40,50,60,80]);let n,ev,od;
 do{const c=[];for(let i=0;i<5;i++)c.push(R(1,N-1));c.sort((a,b)=>a-b);
  n=[c[0],c[1]-c[0],c[2]-c[1],c[3]-c[2],c[4]-c[3],N-c[4]];ev=n[1]+n[3]+n[5];od=N-ev}
 while(n.some(x=>x<N/12||x>N/3)||ev==od);
 const ans=fq(ev,N),
  e=sol([`Tổng số lần gieo: ${n.join(' + ')} = ${N}.`,`Số lần xuất hiện mặt chẵn (2, 4, 6) = ${n[1]} + ${n[3]} + ${n[5]} = ${ev}.`,`Xác suất thực nghiệm = ${fh(ev,N)} = ${ans}.`],`xác suất thực nghiệm là ${ans}.`,`Xác suất thực nghiệm = số lần xảy ra : tổng số lần thử (dựa vào kết quả đã gieo, không dựa vào số mặt của xúc xắc).`);
 return[mc(`Gieo một con xúc xắc ${N} lần, kết quả như sau: ${n.map((x,i)=>`mặt ${i+1} chấm xuất hiện ${x} lần`).join('; ')}. Xác suất thực nghiệm của biến cố "mặt xuất hiện có số chấm chẵn" là:`,ans,[[fq(od,N),'đó là xác suất thực nghiệm của mặt lẻ'],[fq(1,2),'dùng xác suất lý thuyết 3/6 = 1/2 thay vì kết quả đã gieo'],[fq(Math.max(...n),N),'chỉ lấy mặt xuất hiện nhiều nhất'],[fq(ev,od),'lấy tỉ số số lần chẵn : số lần lẻ']],e,String),n]})
);

addH('l7xs',
/* Gieo hai con xúc xắc */
gen('xs.hai_xucxac',()=>{
 const ip=n=>[2,3,5,7,11].includes(n),
  PR=[
   {q:'hai con xuất hiện số chấm bằng nhau',f:(a,b)=>a==b,w:[[fq(1,36),'chỉ đếm một cặp (1; 1)'],[fq(1,3),'đếm sai: 12 kết quả'],[fq(1,12),'đếm thiếu một nửa số kết quả']]},
   {q:'tích số chấm của hai con là số lẻ',f:(a,b)=>(a*b)%2==1,w:[[fq(1,2),'chỉ xét một con xúc xắc lẻ'],[fq(3,4),'đó là xác suất tích chẵn'],[fq(1,3),'đếm sai số kết quả']]},
   {q:'ít nhất một con xuất hiện mặt 6 chấm',f:(a,b)=>a==6||b==6,w:[[fq(1,3),'cộng 1/6 + 1/6, không trừ phần trùng (6; 6)'],[fq(1,6),'chỉ xét một con xúc xắc'],[fq(5,18),'quên kết quả (6; 6)']]},
   {q:'tổng số chấm là số nguyên tố',f:(a,b)=>ip(a+b),w:[[fq(5,11),'đếm các giá trị của tổng (2 đến 12) thay vì 36 kết quả đồng khả năng'],[fq(1,2),'cho rằng một nửa số tổng là số nguyên tố'],[fq(1,3),'đếm sai số kết quả']]},
   {q:'không con nào xuất hiện mặt 1 chấm',f:(a,b)=>a!=1&&b!=1,w:[[fq(5,6),'chỉ xét một con xúc xắc'],[fq(5,18),'đếm thiếu kết quả'],[fq(11,36),'đó là xác suất có ít nhất một mặt 1 chấm']]},
   {q:'tổng số chấm nhỏ hơn 5',f:(a,b)=>a+b<5,w:[[fq(5,18),'tính cả tổng bằng 5'],[fq(1,12),'chỉ đếm tổng bằng 4'],[fq(1,9),'đếm sai số kết quả']]}],
  idx=R(0,PR.length-1),it=PR[idx];let cnt=0;const lst=[];
 for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(it.f(a,b)){cnt++;lst.push(`(${a}; ${b})`)}
 const ans=fq(cnt,36),
  e=sol([`Gieo hai con xúc xắc có 6 × 6 = 36 kết quả đồng khả năng (phân biệt thứ tự hai con).`,`Các kết quả thuận lợi cho biến cố "${it.q}": có ${cnt} kết quả${cnt<=12?`: ${lst.join(', ')}`:''}.`,`Xác suất = ${fh(cnt,36)} = ${ans}.`],`xác suất là ${ans}.`,`Phải phân biệt hai con xúc xắc: (1; 2) và (2; 1) là hai kết quả khác nhau.`);
 return[mc(`Gieo đồng thời hai con xúc xắc cân đối. Xác suất của biến cố "${it.q}" là:`,ans,it.w.filter(([v])=>v!=ans),e,String),[idx]]}),

/* Rút hai thẻ cùng lúc */
gen('xs.rut_the',()=>{
 const n=R(5,10),ev=Math.floor(n/2),od=n-ev,t=R(0,1),tot=n*(n-1)/2,fav=t==0?ev*(ev-1)/2+od*(od-1)/2:od*(od-1)/2,ans=fq(fav,tot),
  e=sol([`Rút 2 thẻ từ ${n} thẻ cùng lúc: số kết quả = ${n} × ${n-1} : 2 = ${tot}.`,t==0?`Hai thẻ có tổng chẵn khi cùng chẵn hoặc cùng lẻ. Trong ${n} thẻ có ${ev} thẻ chẵn và ${od} thẻ lẻ.`:`Tích hai thẻ lẻ khi cả hai thẻ đều lẻ. Trong ${n} thẻ có ${od} thẻ lẻ.`,t==0?`Số kết quả thuận lợi = ${ev}×${ev-1}:2 + ${od}×${od-1}:2 = ${ev*(ev-1)/2} + ${od*(od-1)/2} = ${fav}.`:`Số kết quả thuận lợi = ${od} × ${od-1} : 2 = ${fav}.`,`Xác suất = ${fh(fav,tot)} = ${ans}.`],`xác suất là ${ans}.`,`Rút cùng lúc nên (a; b) và (b; a) chỉ là MỘT kết quả: chia 2 khi đếm số cặp.`),
  k=t==0?ev:od;
 return[mc(t==0?`Hộp có ${n} thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên cùng lúc 2 thẻ. Xác suất để tổng hai số trên hai thẻ là số chẵn là:`:`Hộp có ${n} thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên cùng lúc 2 thẻ. Xác suất để tích hai số trên hai thẻ là số lẻ là:`,ans,
  [[fq(1,2),'cho rằng chẵn và lẻ ngang nhau'],
   [t==0?fq(ev*ev+od*od,n*n):fq(od*od,n*n),'coi như rút có hoàn lại'],
   [fq(k,n),`đó là xác suất để thẻ đầu tiên ${t==0?'chẵn':'lẻ'}`],
   [fq(fav,n*(n-1)),'chia cho số cách rút có thứ tự (không chia 2 ở mẫu)'],
   [fq(2*fav,tot),'đếm có thứ tự ở tử số nhưng không ở mẫu']].filter(([v])=>v!=ans),e,String),[n,t]]})
);
})();
