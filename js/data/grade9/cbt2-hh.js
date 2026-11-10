/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì II (KNTT)" — góc nội tiếp, tứ giác nội tiếp, đường tròn ngoại tiếp – nội tiếp (l9dt2, mã tg.* và nt.*)
   và hình trụ, hình nón, hình cầu (l9kg, mã kg3.*) (v16). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Hình vẽ đường tròn dựng từ số đo cung thật, nên hình khớp với số liệu của đề. Kiểm chứng: kiem-chung/lop8-9/oracles9c.js */
(()=>{const {add,addH,gn,M,Iq,fg,fh,fq,fr,fd,cf,ng,rad,sv,tx,dot,rt}=G8H,{F,nzc,ab}=G9X,
dg=v=>`${v}°`,
/* ---- hình vẽ: đường tròn (O) bán kính 58 tại (120, 76); P = {tên: góc (độ, ngược chiều kim đồng hồ từ trục Ox)}; L = các đoạn nối ---- */
CX=120,CY=76,CR=58,
xy=d=>[CX+CR*Math.cos(d*Math.PI/180),CY-CR*Math.sin(d*Math.PI/180)],
f1=v=>(+v).toFixed(1),
lb=(n,d)=>{const x=CX+(CR+13)*Math.cos(d*Math.PI/180),y=CY-(CR+13)*Math.sin(d*Math.PI/180);return tx(f1(x),f1(y+5),n,'middle',13)},
Olab=(P,L)=>{const an=L.filter(([a,b])=>a=='O'||b=='O').map(([a,b])=>P[a=='O'?b:a]).sort((x,y)=>x-y);let bd=-1,mid=-90;
 for(let i=0;i<an.length;i++){const a0=an[i],a1=i+1<an.length?an[i+1]:an[0]+360,g=a1-a0;if(g>bd){bd=g;mid=(a0+a1)/2}}
 const x=CX+15*Math.cos(mid*Math.PI/180),y=CY-15*Math.sin(mid*Math.PI/180);return tx(f1(x),f1(y+5),'O','middle',13)},
circ=(P,L,o={})=>{const q={};for(const k in P)q[k]=xy(P[k]);if(o.O)q.O=[CX,CY];
 const ln=L.map(([a,b])=>`M${f1(q[a][0])} ${f1(q[a][1])}L${f1(q[b][0])} ${f1(q[b][1])}`).join('');
 return sv(`<path d="M${CX-CR} ${CY}a${CR} ${CR} 0 1 0 ${2*CR} 0a${CR} ${CR} 0 1 0 ${-2*CR} 0"/><path d="${ln}"/>${o.O?`${dot(CX,CY)}${Olab(P,L)}`:''}${Object.keys(P).map(k=>dot(f1(q[k][0]),f1(q[k][1]))+lb(k,P[k])).join('')}`)},
uq=a=>[...new Set(a)];

/* ================= ĐƯỜNG TRÒN: GÓC NỘI TIẾP, TỨ GIÁC NỘI TIẾP: CƠ BẢN ================= */
add('l9dt2',
gn('tg.cung_chan',()=>{const al=R(20,80),k=R(0,1),Pt={A:270-al,B:270+al,C:78},L=[['C','A'],['C','B']];
 if(k==0){Pt.D=116;L.push(['D','A'],['D','B'])}else L.push(['O','A'],['O','B']);
 const w0=k==0?[2*al,180-al,Math.max(10,90-al)]:[al,180-2*al,360-2*al,al+90];
 return[fg(M(`Các điểm A, B, C${k==0?', D':''} cùng thuộc đường tròn (O) như hình vẽ, biết ∠ACB = ${dg(al)}. Số đo ${k==0?'∠ADB':'∠AOB'} là`,dg(k==0?al:2*al),uq(w0).filter(v=>v!=(k==0?al:2*al)).map(dg),
  k==0?[`∠ACB và ∠ADB là hai góc nội tiếp cùng chắn cung AB.`,`Hai góc nội tiếp cùng chắn một cung thì bằng nhau.`,`Vậy ∠ADB = ∠ACB = ${dg(al)}.`]
  :[`∠ACB là góc nội tiếp, ∠AOB là góc ở tâm, cùng chắn cung AB.`,`Góc ở tâm có số đo gấp đôi góc nội tiếp cùng chắn một cung: ∠AOB = 2·∠ACB.`,`∠AOB = 2·${al}° = ${dg(2*al)}.`],'',String),circ(Pt,L,{O:k==1})),[al,k]]}),

gn('tg.cung_nho_lon',()=>{const n=2*R(30,80),k=R(0,1),h=n/2;
 return[M(`Cho đường tròn (O) và hai điểm A, B thuộc đường tròn sao cho cung nhỏ AB có số đo ${dg(n)}. ${k==0?'Điểm C thuộc cung lớn AB. Số đo ∠ACB là':'Điểm D thuộc cung nhỏ AB. Số đo ∠ADB là'}`,dg(k==0?h:180-h),uq([n,h,180-h,k==0?180-n:360-n].filter(v=>v!=(k==0?h:180-h))).map(dg).concat([dg(h+10)]).slice(0,4),
  k==0?[`Góc nội tiếp có số đo bằng nửa số đo cung bị chắn. C thuộc cung lớn nên ∠ACB chắn cung nhỏ AB.`,`∠ACB = ${n}° : 2 = ${dg(h)}.`]
  :[`Tứ giác ACBD nội tiếp (với C thuộc cung lớn AB) nên hai góc đối ∠ACB và ∠ADB có tổng bằng 180°.`,`∠ACB = ${n}° : 2 = ${dg(h)}.`,`∠ADB = 180° − ${dg(h)} = ${dg(180-h)}.`],'',String),[n,k]]}),

gn('tg.tu_giac_goc',()=>{let arcs=null;
 for(let i=0;i<200&&!arcs;i++){const a=[R(5,14),R(5,14),R(5,14)].map(v=>v*10),w=360-a[0]-a[1]-a[2];if(w>=50&&w<=140)arcs=[...a,w]}
 if(!arcs)throw 0;const [x,y,z,w]=arcs,ang=[(y+z)/2,(z+w)/2,(w+x)/2,(x+y)/2],ask=R(2,3),A0=R(0,359),Pt={A:A0,B:A0-x,C:A0-x-y,D:A0-x-y-z};
 if(new Set(Object.values(Pt).map(v=>((v%360)+360)%360)).size<4)throw 0;
 return[fg(Iq(`Tứ giác ABCD nội tiếp đường tròn (O) như hình vẽ, biết ∠A = ${dg(ang[0])} và ∠B = ${dg(ang[1])}. Tính số đo ∠${'ABCD'[ask]} (đơn vị: độ).`,ang[ask],
  [`Tứ giác nội tiếp có tổng hai góc đối bằng 180°.`,ask==2?`∠C đối với ∠A nên ∠C = 180° − ∠A = 180° − ${dg(ang[0])} = ${dg(ang[2])}.`:`∠D đối với ∠B nên ∠D = 180° − ∠B = 180° − ${dg(ang[1])} = ${dg(ang[3])}.`],'',dg(ang[ask])),circ(Pt,[['A','B'],['B','C'],['C','D'],['D','A']])),[arcs,ask]]}),

gn('tg.nhan_biet_goc',()=>{const a=R(6,13)*10,b=R(6,13)*10,f=(c,d)=>`∠C = ${dg(c)}; ∠D = ${dg(d)}`,A=f(180-a,180-b);
 const W=uq([f(180-b,180-a),f(a,b),f(b,a),f(180-a,b),f(a,180-b)]).filter(v=>v!=A).slice(0,3);
 if(W.length<3)throw 0;
 return[M(`Tứ giác ABCD có ∠A = ${dg(a)} và ∠B = ${dg(b)}. Tứ giác ABCD nội tiếp được đường tròn khi`,A,W,
  [`Tứ giác nội tiếp được đường tròn khi tổng hai góc đối bằng 180°: ∠A + ∠C = 180° và ∠B + ∠D = 180°.`,`∠C = 180° − ∠A = 180° − ${dg(a)} = ${dg(180-a)}.`,`∠D = 180° − ∠B = 180° − ${dg(b)} = ${dg(180-b)}.`],'',String),[a,b]]}),

gn('tg.tam_nt',()=>{const t=R(0,6),L=P([['A','B','C'],['M','N','P'],['D','E','F'],['X','Y','Z']]),[a,b,c]=L;let q,ans,W,st;
 if(t==0){q='Tâm đường tròn ngoại tiếp một tam giác là giao điểm của ba đường nào?';ans='ba đường trung trực';W=['ba đường phân giác','ba đường cao','ba đường trung tuyến'];st=['Đường tròn ngoại tiếp tam giác đi qua ba đỉnh nên tâm cách đều ba đỉnh.','Điểm cách đều hai đỉnh nằm trên đường trung trực của cạnh nối hai đỉnh đó.','Vậy tâm là giao điểm của ba đường trung trực.']}
 else if(t==1){q='Tâm đường tròn nội tiếp một tam giác là giao điểm của ba đường nào?';ans='ba đường phân giác trong';W=['ba đường trung trực','ba đường cao','ba đường trung tuyến'];st=['Đường tròn nội tiếp tam giác tiếp xúc với ba cạnh nên tâm cách đều ba cạnh.','Điểm cách đều hai cạnh của một góc nằm trên đường phân giác của góc đó.','Vậy tâm là giao điểm của ba đường phân giác trong.']}
 else if(t==2){q=`Tam giác ${a}${b}${c} vuông tại ${a}. Tâm đường tròn ngoại tiếp tam giác ${a}${b}${c} là`;ans=`trung điểm của cạnh ${b}${c}`;W=[`đỉnh ${a}`,`trung điểm của cạnh ${a}${b}`,`giao điểm ba đường phân giác`];st=[`Tam giác vuông nội tiếp đường tròn có cạnh huyền là đường kính.`,`Cạnh huyền là ${b}${c} nên tâm là trung điểm của ${b}${c}.`]}
 else if(t==3){q=`Tam giác ${a}${b}${c} có một góc tù. Tâm đường tròn ngoại tiếp tam giác đó nằm`;ans='ngoài tam giác';W=['trong tam giác','trên một cạnh của tam giác','tại một đỉnh của tam giác'];st=['Tâm đường tròn ngoại tiếp là giao điểm ba đường trung trực.','Tam giác nhọn: tâm nằm trong tam giác; tam giác vuông: tâm là trung điểm cạnh huyền; tam giác tù: tâm nằm ngoài tam giác.']}
 else if(t==4){q=`Tam giác ${a}${b}${c} đều. Phát biểu nào sau đây đúng?`;ans='Tâm đường tròn ngoại tiếp và tâm đường tròn nội tiếp là cùng một điểm';W=['Tâm đường tròn ngoại tiếp nằm ngoài tam giác','Tâm đường tròn nội tiếp nằm trên một cạnh','Bán kính đường tròn nội tiếp bằng bán kính đường tròn ngoại tiếp'];st=['Trong tam giác đều, đường trung trực, đường phân giác, đường cao, đường trung tuyến ứng với mỗi cạnh trùng nhau.','Vì vậy giao điểm của ba đường trung trực và giao điểm của ba đường phân giác là cùng một điểm.','Bán kính đường tròn ngoại tiếp bằng 2 lần bán kính đường tròn nội tiếp nên hai bán kính không bằng nhau.']}
 else{const tr=P([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10]]),m=R(1,3),s=tr.map(v=>v*m),kind=R(0,2);let x,y,z;
  if(kind==0){[x,y,z]=s}else if(kind==1){x=s[0];y=s[1];z=s[2]+R(1,3)}else{x=s[0];y=s[1];z=Math.max(1,s[2]-R(1,3));if(x+y<=z||x+z<=y||y+z<=x)throw 0}
  const o=[x,y,z].sort((p,q)=>p-q);if(o[0]+o[1]<=o[2])throw 0;const d=o[0]**2+o[1]**2-o[2]**2,kd=d==0?0:d>0?1:2;
  const hyp=o[2],pos=[x,y,z].indexOf(hyp);
  q=`Tam giác ${a}${b}${c} có ${a}${b} = ${x} cm, ${b}${c} = ${y} cm, ${c}${a} = ${z} cm. Tâm đường tròn ngoại tiếp tam giác đó nằm`;
  const side=[`${a}${b}`,`${b}${c}`,`${c}${a}`][[x,y,z].indexOf(o[2])];
  ans=kd==0?`trên cạnh ${side} (là trung điểm cạnh ${side})`.replace(' (là trung điểm cạnh '+side+')',', tại trung điểm của '+side):kd==1?'trong tam giác':'ngoài tam giác';
  W=['trong tam giác','ngoài tam giác',`tại trung điểm của ${side}`,'tại một đỉnh của tam giác'].filter(v=>v!=ans&&!(kd==0&&v==`tại trung điểm của ${side}`)).slice(0,3);
  if(kd==0&&W.length<3)W.push('trên đường cao của tam giác');
  st=[`Sắp xếp ba cạnh: ${o.join(' < ').replace(/ < /g,' ≤ ')}. Cạnh lớn nhất là ${o[2]} cm.`,`Tính ${o[0]}^2 + ${o[1]}^2 = ${o[0]**2+o[1]**2} và ${o[2]}^2 = ${o[2]**2}.`,
   kd==0?`Hai giá trị bằng nhau nên tam giác vuông, cạnh huyền ${side}. Tâm đường tròn ngoại tiếp là trung điểm cạnh huyền.`:kd==1?`${o[0]**2+o[1]**2} > ${o[2]**2} nên tam giác nhọn, tâm đường tròn ngoại tiếp nằm trong tam giác.`:`${o[0]**2+o[1]**2} < ${o[2]**2} nên tam giác tù, tâm đường tròn ngoại tiếp nằm ngoài tam giác.`];
  if(kd==0)ans=`tại trung điểm của ${side}`;}
 return[M(q,ans,W,st,'',String),[t]]}),

gn('nt.deu_r',()=>{const k=R(2,12),t=R(0,2),a=6*k;
 if(t==0)return[M(`Tam giác đều có cạnh ${a} cm. Bán kính đường tròn ngoại tiếp tam giác đó là (cm)`,rad(2*k,3),uq([rad(k,3),rad(3*k,3),`${2*k}`,rad(4*k,3)]).filter(v=>v!=rad(2*k,3)),
  [`Trong tam giác đều cạnh a, bán kính đường tròn ngoại tiếp là R = ${fh('a√3',3)}.`,`Với a = ${a}: R = ${fh(`${a}√3`,3)} = ${rad(2*k,3)} (cm).`],'',String),[k,t]];
 if(t==1)return[M(`Tam giác đều có cạnh ${a} cm. Bán kính đường tròn nội tiếp tam giác đó là (cm)`,rad(k,3),uq([rad(2*k,3),rad(3*k,3),`${k}`,rad(4*k,3)]).filter(v=>v!=rad(k,3)),
  [`Trong tam giác đều cạnh a, bán kính đường tròn nội tiếp là r = ${fh('a√3',6)}.`,`Với a = ${a}: r = ${fh(`${a}√3`,6)} = ${rad(k,3)} (cm).`],'',String),[k,t]];
 return[Iq(`Tam giác đều ABC nội tiếp đường tròn bán kính ${rad(2*k,3)} cm. Tính độ dài cạnh của tam giác (cm).`,a,
  [`Trong tam giác đều cạnh a, bán kính đường tròn ngoại tiếp là R = ${fh('a√3',3)}, suy ra a = R√3.`,`Với R = ${rad(2*k,3)}: a = ${rad(2*k,3)}·√3 = ${2*k}·3 = ${a} (cm).`],'',`${a} cm`),[k,t]]}),

gn('nt.hv_R',()=>{const t=R(0,1);
 if(t==0){const h=R(2,15),a=2*h;return[M(`Hình vuông có cạnh ${a} cm nội tiếp đường tròn (O). Bán kính của đường tròn (O) là (cm)`,rad(h,2),uq([`${h}`,rad(a,2),rad(h,3),`${a}`]).filter(v=>v!=rad(h,2)),
  [`Đường chéo của hình vuông cạnh a là a√2, và là đường kính của đường tròn ngoại tiếp.`,`Đường kính = ${a}√2 nên bán kính R = ${fh(`${a}√2`,2)} = ${rad(h,2)} (cm).`],'',String),[h,t]]}
 const R0=R(2,15);return[M(`Hình vuông nội tiếp đường tròn (O) có bán kính ${R0} cm. Cạnh của hình vuông là (cm)`,rad(R0,2),uq([`${R0}`,rad(2*R0,2),rad(R0,3),`${2*R0}`]).filter(v=>v!=rad(R0,2)),
  [`Đường chéo của hình vuông là đường kính của đường tròn: ${2*R0} cm.`,`Gọi cạnh là a thì a√2 = ${2*R0}, suy ra a = ${fh(2*R0,'√2')} = ${rad(R0,2)} (cm).`],'',String),[R0,t]]}),

gn('nt.vuong_R',()=>{const tr=P([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]),m=tr[2]>20?1:R(1,4),[a,b,c]=tr.map(v=>v*m),k=R(0,2);
 const nm=['bán kính','đường kính','chu vi'][k],ans=[c/2,c,c][k];
 return[Iq(`Tam giác ABC vuông tại A có AB = ${a} cm, AC = ${b} cm. ${k==2?'Chu vi đường tròn ngoại tiếp tam giác ABC là kπ cm. Tìm k.':`Tính ${nm} đường tròn ngoại tiếp tam giác ABC (cm).`}`,ans,
  [`Tính cạnh huyền: BC = √(${a}^2 + ${b}^2) = √${a*a+b*b} = ${c} (cm).`,`Tam giác vuông nội tiếp đường tròn có cạnh huyền là đường kính nên đường kính = BC = ${c} cm, bán kính R = ${c} : 2 = ${fd(c/2)} cm.`,k==0?`Vậy bán kính là ${fd(c/2)} cm.`:k==1?`Vậy đường kính là ${c} cm.`:`Chu vi = 2πR = 2π·${fd(c/2)} = ${c}π (cm).`],'',k==2?`k = ${c}`:`${fd(ans)} cm`),[a,b,c,k]]}));

/* ================= ĐƯỜNG TRÒN: NÂNG CAO ================= */
addH('l9dt2',
gn('tg.goc_tam_giac_nt',()=>{let A,B,C;for(let i=0;i<200;i++){A=R(4,8)*10;B=R(4,8)*10;C=180-A-B;if(C>=30&&C<=80)break;C=null}
 if(!C)throw 0;const k=R(0,2),Pt={A:90,B:90+2*C,C:90+2*C+2*A},ask=['∠AOB','∠BOC','∠COA'][k],ans=[2*C,2*A,2*B][k],opp=['C','A','B'][k],g=[C,A,B][k];
 return[fg(Iq(`Tam giác ABC nhọn nội tiếp đường tròn (O) có ∠A = ${dg(A)} và ∠B = ${dg(B)}. Tính số đo ${ask} (đơn vị: độ).`,ans,
  [`Tổng ba góc của tam giác bằng 180° nên ∠C = 180° − ${A}° − ${B}° = ${dg(C)}.`,`${ask} là góc ở tâm, cùng chắn cung với góc nội tiếp ∠${opp}.`,`${ask} = 2·∠${opp} = 2·${g}° = ${dg(ans)}.`],'',dg(ans)),circ(Pt,[['A','B'],['B','C'],['C','A'],['O','A'],['O','B'],['O','C']],{O:true})),[A,B,k]]}),

gn('tg.ti_le_doi',()=>{const s=P([5,6,9,10,12,15,18,20]),p=P([1,2,3,4,5,7,8,9,11,13,14,16,17,19]);let q;
 for(let i=0;i<60;i++){const pp=R(1,s-1);if(pp!=s-pp&&gcd(pp,s)==1&&(180*pp)%s==0){q=[pp,s-pp];break}}
 if(!q)throw 0;const [u,v]=q,a=180*u/s,c=180*v/s,big=R(0,1);
 return[Iq(`Tứ giác ABCD nội tiếp được đường tròn, có ∠A : ∠C = ${u} : ${v}. Tính số đo góc ${big?'lớn hơn':'nhỏ hơn'} trong hai góc ∠A và ∠C (độ).`,big?Math.max(a,c):Math.min(a,c),
  [`Tứ giác nội tiếp nên ∠A + ∠C = 180°.`,`Gọi ∠A = ${u}k, ∠C = ${v}k, ta có ${u}k + ${v}k = 180°, tức ${s}k = 180°, suy ra k = ${180/s}°.`,`∠A = ${u}·${180/s}° = ${dg(a)}; ∠C = ${v}·${180/s}° = ${dg(c)}.`,`Góc ${big?'lớn hơn':'nhỏ hơn'} là ${dg(big?Math.max(a,c):Math.min(a,c))}.`],'',dg(big?Math.max(a,c):Math.min(a,c))),[u,v,big]]}),

gn('tg.mo_hinh',()=>{const S=P([['A','B','C','D','E','H'],['M','N','P','D','E','H'],['X','Y','Z','D','E','H'],['A','B','C','K','L','H']]),[a,b,c,d,e,h]=S,t=R(0,6);let q,ans,W,st;
 const base=`Cho tam giác ${a}${b}${c} nhọn có hai đường cao ${a}${d} và ${b}${e} cắt nhau tại ${h} (${d} thuộc ${b}${c}, ${e} thuộc ${a}${c}).`;
 if(t==0){q=`${base} Tứ giác ${a}${b}${d}${e} nội tiếp được đường tròn có đường kính là`;ans=`${a}${b}`;W=[`${d}${e}`,`${c}${h}`,`${a}${h}`];st=[`Ta có ∠${a}${d}${b} = 90° (vì ${a}${d} ⊥ ${b}${c}) và ∠${a}${e}${b} = 90° (vì ${b}${e} ⊥ ${a}${c}).`,`Hai đỉnh ${d}, ${e} cùng nhìn đoạn ${a}${b} dưới một góc vuông nên ${d}, ${e} thuộc đường tròn đường kính ${a}${b}.`,`Vậy tứ giác ${a}${b}${d}${e} nội tiếp đường tròn đường kính ${a}${b}.`]}
 else if(t==1){q=`${base} Tứ giác ${c}${d}${h}${e} nội tiếp được đường tròn có đường kính là`;ans=`${c}${h}`;W=[`${d}${e}`,`${a}${b}`,`${c}${d}`];st=[`Ta có ∠${c}${d}${h} = 90° và ∠${c}${e}${h} = 90°.`,`Hai góc đối ∠${c}${d}${h} và ∠${c}${e}${h} có tổng bằng 180° nên tứ giác ${c}${d}${h}${e} nội tiếp.`,`Đường tròn đó có đường kính là ${c}${h} (vì ${d}, ${e} cùng nhìn ${c}${h} dưới góc vuông).`]}
 else if(t==2){q=`${base} Hai góc nào sau đây bằng nhau (vì tứ giác ${a}${b}${d}${e} nội tiếp)?`;ans=`∠${a}${d}${e} và ∠${a}${b}${e}`;W=[`∠${a}${d}${e} và ∠${b}${a}${d}`,`∠${a}${b}${d} và ∠${b}${a}${e}`,`∠${d}${a}${e} và ∠${a}${d}${b}`];st=[`Tứ giác ${a}${b}${d}${e} nội tiếp.`,`∠${a}${d}${e} và ∠${a}${b}${e} cùng nhìn cạnh ${a}${e} (hai đỉnh ${d}, ${b} cùng phía đối với ${a}${e}).`,`Hai góc nội tiếp cùng chắn cung ${a}${e} nên ∠${a}${d}${e} = ∠${a}${b}${e}.`]}
 else if(t==3){q=`Cho đường tròn (O) đường kính ${a}${b}, điểm ${c} thuộc (O) (${c} khác ${a}, ${b}). Gọi ${d} là chân đường vuông góc hạ từ ${c} xuống ${a}${b}. Số đo ∠${a}${c}${b} là`;ans='90°';W=['60°','45°','180°'];st=[`${a}${b} là đường kính của (O) và ${c} thuộc (O).`,`Góc nội tiếp chắn nửa đường tròn là góc vuông nên ∠${a}${c}${b} = 90°.`]}
 else if(t==5){const al=R(20,70);q=`Cho đường tròn (O) đường kính ${a}${b}, điểm ${c} thuộc (O) (${c} khác ${a}, ${b}) sao cho ∠${c}${a}${b} = ${dg(al)}. Số đo ∠${c}${b}${a} là`;ans=dg(90-al);W=uq([dg(al),dg(180-al),dg(90+al),dg(2*al)]).filter(v=>v!=ans).slice(0,3);st=[`${a}${b} là đường kính nên ∠${a}${c}${b} = 90° (góc nội tiếp chắn nửa đường tròn).`,`Trong tam giác ${a}${b}${c} vuông tại ${c}: ∠${c}${b}${a} = 90° − ∠${c}${a}${b} = 90° − ${dg(al)} = ${dg(90-al)}.`]}
 else if(t==6){const be=R(5,12)*10;q=`Tứ giác ${a}${b}${c}${d} nội tiếp đường tròn và có ∠${a}${b}${c} = ${dg(be)}. Số đo góc ngoài của tứ giác tại đỉnh ${d} (kề bù với ∠${a}${d}${c}) là`;ans=dg(be);W=uq([dg(180-be),dg(2*be),dg(be+10),dg(90-be%90)]).filter(v=>v!=ans).slice(0,3);st=[`Tứ giác nội tiếp nên ∠${a}${b}${c} + ∠${a}${d}${c} = 180°, suy ra ∠${a}${d}${c} = 180° − ${dg(be)} = ${dg(180-be)}.`,`Góc ngoài tại ${d} kề bù với ∠${a}${d}${c} nên bằng 180° − ${dg(180-be)} = ${dg(be)}.`,`Vậy góc ngoài tại một đỉnh của tứ giác nội tiếp bằng góc trong của đỉnh đối diện.`]}
 else{q=`Tứ giác ${a}${b}${c}${d} có ∠${a}${b}${c} + ∠${a}${d}${c} = 180°. Khẳng định nào sau đây đúng?`;ans=`Tứ giác ${a}${b}${c}${d} nội tiếp được đường tròn`;W=[`${a}${b}${c}${d} là hình bình hành`,`${a}${b}${c}${d} là hình thoi`,`${a}${b} song song với ${c}${d}`];st=[`∠${a}${b}${c} và ∠${a}${d}${c} là hai góc đối của tứ giác.`,`Tứ giác có tổng hai góc đối bằng 180° thì nội tiếp được đường tròn.`]}
 return[M(q,ans,W,st,'',String),[t]]}),

gn('nt.dt_ngoai',()=>{const tr=P([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]),m=tr[2]>20?1:R(1,4),[a,b,c]=tr.map(v=>v*m),k=R(0,1),v=k==0?c*c/4:c;
 return[Iq(`Tam giác ABC vuông tại A có AB = ${a} cm, AC = ${b} cm. ${k==0?'Diện tích hình tròn ngoại tiếp tam giác ABC là kπ cm². Tìm k.':'Chu vi hình tròn ngoại tiếp tam giác ABC là kπ cm. Tìm k.'}`,v,
  [`BC = √(${a}^2 + ${b}^2) = ${c} cm. Tam giác vuông nên bán kính đường tròn ngoại tiếp R = BC : 2 = ${fd(c/2)} cm.`,k==0?`Diện tích hình tròn = πR^2 = π·${fd(c/2)}^2 = ${fd(v)}π (cm²).`:`Chu vi = 2πR = 2π·${fd(c/2)} = ${c}π (cm).`],'',`k = ${fd(v)}`),[a,b,k]]}),

gn('nt.deu_cao',()=>{const m=R(2,14),h=3*m,t=R(0,1);
 return[Iq(`Tam giác đều có đường cao bằng ${h} cm. Tính bán kính đường tròn ${t?'nội tiếp':'ngoại tiếp'} tam giác đó (cm).`,t?m:2*m,
  [`Trong tam giác đều, tâm đường tròn ngoại tiếp và nội tiếp trùng với trọng tâm G, nên G chia mỗi đường cao theo tỉ lệ 2 : 1 (kể từ đỉnh).`,`Bán kính đường tròn ngoại tiếp R = ${fh(2,3)}·${h} = ${2*m} cm; bán kính đường tròn nội tiếp r = ${fh(1,3)}·${h} = ${m} cm.`],'',`${t?m:2*m} cm`),[m,t]]}));

/* ================= HÌNH TRỤ, HÌNH NÓN, HÌNH CẦU: CƠ BẢN ================= */
const TR=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15],[12,16,20],[7,24,25]];
add('l9kg',
gn('kg3.quay_hcn',()=>{const a=R(3,12),b=R(3,12);if(a==b)throw 0;const t=R(0,1),rr=t==0?b:a,hh=t==0?a:b,side=t==0?'AB':'AD',f=(r,h)=>`${r} cm và ${h} cm`,A=f(rr,hh);
 return[M(`Quay hình chữ nhật ABCD có AB = ${a} cm, AD = ${b} cm một vòng quanh cạnh ${side}, ta được một hình trụ. Bán kính đáy và chiều cao của hình trụ lần lượt là`,A,uq([f(hh,rr),f(a+b,rr),f(rr,a+b),f(rr,rr+hh)]).filter(v=>v!=A),
  [`Cạnh ${side} là trục quay nên chính là chiều cao của hình trụ: h = ${hh} cm.`,`Cạnh vuông góc với trục quay (${t==0?'AD':'AB'}) vạch nên đường tròn đáy, nên bán kính đáy r = ${rr} cm.`],'',String),[a,b,t]]}),

gn('kg3.quay_hcn_tinh',()=>{const r=R(2,9),h=R(2,10),k=R(0,2),a=r,b=h;
 const nm=['diện tích xung quanh','diện tích toàn phần','thể tích'][k],ans=[2*r*h,2*r*(r+h),r*r*h][k],un=k==2?'cm³':'cm²';
 return[Iq(`Quay hình chữ nhật ABCD có AB = ${h} cm, AD = ${r} cm một vòng quanh cạnh AB, ta được một hình trụ. ${nm[0].toUpperCase()+nm.slice(1)} của hình trụ là kπ ${un}. Tìm k.`,ans,
  [`Trục quay là AB nên chiều cao h = AB = ${h} cm và bán kính đáy r = AD = ${r} cm.`,
   k==0?`S_xq = 2πrh = 2π·${r}·${h} = ${2*r*h}π (cm²).`:k==1?`S_tp = 2πr(r + h) = 2π·${r}·(${r} + ${h}) = ${2*r*(r+h)}π (cm²).`:`V = πr^2h = π·${r}^2·${h} = ${r*r*h}π (cm³).`],'',`k = ${ans}`),[r,h,k]]}),

gn('kg3.quay_tam_giac',()=>{let f=null;
 for(let i=0;i<100&&!f;i++){const tr=P(TR),m=tr[2]>20?1:R(1,2),s=tr.map(v=>v*m),sw=R(0,1),r=sw?s[1]:s[0],h=sw?s[0]:s[1],l=s[2],k=R(0,2);
  const ans=[l,r*l,r*r*h/3][k];if(Number.isInteger(ans)&&k<3)f={r,h,l,k,ans,sw}}
 if(!f)throw 0;const {r,h,l,k,ans,sw}=f,ax=sw?'AB':'AC',nm=['độ dài đường sinh (cm)','diện tích xung quanh (kπ cm², tìm k)','thể tích (kπ cm³, tìm k)'][k];
 const s={AB:`${sw?h:r}`,AC:`${sw?r:h}`,BC:''};
 return[fg(Iq(`Tam giác ABC vuông tại A có AB = ${sw?h:r} cm, AC = ${sw?r:h} cm. Quay tam giác ABC một vòng quanh cạnh ${ax}, ta được một hình nón. Tính ${nm}.`,ans,
  [`Quay quanh cạnh ${ax} nên chiều cao h = ${ax} = ${h} cm, bán kính đáy r = ${sw?'AC':'AB'} = ${r} cm.`,`Đường sinh là cạnh huyền BC = √(${r}^2 + ${h}^2) = ${l} cm.`,
   k==0?`Vậy đường sinh dài ${l} cm.`:k==1?`S_xq = πrl = π·${r}·${l} = ${r*l}π (cm²).`:`V = ${fh(1,3)}πr^2h = ${fh(1,3)}π·${r}^2·${h} = ${ans}π (cm³).`],'',k==0?`${l} cm`:`k = ${ans}`),rt(s)),[r,h,k]]}),

gn('kg3.non_stp',()=>{const tr=P(TR),m=tr[2]>20?1:R(1,4),[r,h,l]=tr.map(v=>v*m),sw=R(0,1),rr=sw?h:r,hh=sw?r:h,ans=rr*(rr+l);
 return[Iq(`Hình nón có bán kính đáy ${rr} cm và chiều cao ${hh} cm. Diện tích toàn phần của hình nón là kπ cm². Tìm k.`,ans,
  [`Đường sinh l = √(${rr}^2 + ${hh}^2) = ${l} cm.`,`Diện tích toàn phần S_tp = πrl + πr^2 = πr(l + r).`,`S_tp = π·${rr}·(${l} + ${rr}) = ${ans}π (cm²).`],'',`k = ${ans}`),[rr,hh]]}),

gn('kg3.cau_dk',()=>{const t=R(0,1),R0=t?P([3,6,9,12,15,18,21,24,27,30]):R(2,20),d=2*R0;
 return[Iq(`Một hình cầu có đường kính ${d} cm. ${t?'Thể tích':'Diện tích mặt cầu'} của hình cầu là kπ ${t?'cm³':'cm²'}. Tìm k.`,t?4*R0**3/3:4*R0*R0,
  [`Bán kính R = ${d} : 2 = ${R0} cm.`,t?`V = ${fh(4,3)}πR^3 = ${fh(4,3)}π·${R0}^3 = ${fh(4,3)}π·${R0**3} = ${4*R0**3/3}π (cm³).`:`S = 4πR^2 = 4π·${R0}^2 = ${4*R0*R0}π (cm²).`],'',`k = ${t?4*R0**3/3:4*R0*R0}`),[R0,t]]}),

gn('kg3.cau_tu_S',()=>{const R0=R(2,20),k=R(0,1),m=P([3,6,9,12,15,18,21]);
 if(k==0)return[Iq(`Một mặt cầu có diện tích ${4*R0*R0}π cm². Tính bán kính của mặt cầu (cm).`,R0,[`Diện tích mặt cầu S = 4πR^2 nên 4πR^2 = ${4*R0*R0}π.`,`Suy ra R^2 = ${R0*R0}, vì R > 0 nên R = ${R0} (cm).`],'',`${R0} cm`),[R0,k]];
 return[Iq(`Một mặt cầu có diện tích ${4*m*m}π cm². Thể tích của hình cầu đó là kπ cm³. Tìm k.`,4*m**3/3,[`Từ 4πR^2 = ${4*m*m}π suy ra R^2 = ${m*m}, nên R = ${m} cm.`,`V = ${fh(4,3)}πR^3 = ${fh(4,3)}π·${m**3} = ${4*m**3/3}π (cm³).`],'',`k = ${4*m**3/3}`),[m,k]]}),

gn('kg3.lit',()=>{const r=R(2,8),h=R(5,20),V=Math.round(314*r*r*h)/100,t=R(0,1);
 return[Iq(`Một chiếc thùng hình trụ có bán kính đáy ${r} dm và chiều cao ${h} dm. Lấy π ≈ 3,14. Thùng đó chứa được tối đa bao nhiêu lít nước? (1 dm³ = 1 lít)`,V,
  [`Thể tích thùng: V = πr^2h ≈ 3,14·${r}^2·${h}.`,`${r}^2 = ${r*r} nên V ≈ 3,14·${r*r}·${h} = 3,14·${r*r*h} = ${fd(V)} (dm³).`,`Vì 1 dm³ = 1 lít nên thùng chứa được ${fd(V)} lít.`],'',`${fd(V)} lít`),[r,h]]}));

/* ================= HÌNH TRỤ, HÌNH NÓN, HÌNH CẦU: NÂNG CAO ================= */
addH('l9kg',
gn('kg3.tru_tim_r',()=>{const r=R(2,10),h=R(2,10),ask=R(0,1);
 return[Iq(`Một hình trụ có diện tích xung quanh bằng ${2*r*h}π cm² và ${ask?`bán kính đáy bằng ${r} cm. Tính chiều cao của hình trụ`:`chiều cao bằng ${h} cm. Tính bán kính đáy của hình trụ`} (cm).`,ask?h:r,
  [`Diện tích xung quanh của hình trụ: S_xq = 2πrh.`,ask?`Thay số: 2π·${r}·h = ${2*r*h}π, tức ${2*r}h = ${2*r*h}.`:`Thay số: 2π·r·${h} = ${2*r*h}π, tức ${2*h}r = ${2*r*h}.`,ask?`Suy ra h = ${2*r*h} : ${2*r} = ${h} (cm).`:`Suy ra r = ${2*r*h} : ${2*h} = ${r} (cm).`],'',`${ask?h:r} cm`),[r,h,ask]]}),

gn('kg3.non_h_tu_V',()=>{let f=null;for(let i=0;i<200&&!f;i++){const r=R(2,9),h=R(2,15),V=r*r*h/3;if(Number.isInteger(V))f={r,h,V}}
 if(!f)throw 0;const {r,h,V}=f,ask=R(0,1);
 return[Iq(`Một hình nón có thể tích ${V}π cm³ và ${ask?`chiều cao ${h} cm. Tính bán kính đáy`:`bán kính đáy ${r} cm. Tính chiều cao`} của hình nón (cm).`,ask?r:h,
  [`Thể tích hình nón V = ${fh(1,3)}πr^2h.`,ask?`Thay số: ${fh(1,3)}π·r^2·${h} = ${V}π, suy ra r^2 = ${3*V} : ${h} = ${r*r}.`:`Thay số: ${fh(1,3)}π·${r}^2·h = ${V}π, suy ra h = ${3*V} : ${r*r} = ${h}.`,ask?`Vì r > 0 nên r = √${r*r} = ${r} (cm).`:`Vậy chiều cao h = ${h} cm.`],'',`${ask?r:h} cm`),[r,h,ask]]}),

gn('kg3.non_h_bang_r',()=>{const m=P([1,2,3]),r=m==3?R(2,12):P([3,6,9,12,15]),V=m*r**3/3,ask=R(0,1),cof=m==3?'':fh(m,3);
 return[Iq(`Một hình nón có chiều cao ${m==1?'bằng':'gấp '+m+' lần'} bán kính đáy và có thể tích ${V}π cm³. Tính ${ask?'chiều cao':'bán kính đáy'} của hình nón (cm).`,ask?m*r:r,
  [`Gọi r (cm) là bán kính đáy, khi đó chiều cao là h = ${m==1?'r':m+'r'}.`,`V = ${fh(1,3)}πr^2h = ${fh(1,3)}π·r^2·${m==1?'r':m+'r'} = ${cof}πr^3.`,`Từ ${cof}πr^3 = ${V}π suy ra r^3 = ${r**3}, nên r = ${r} cm.`,ask?`Chiều cao h = ${m==1?'r':m+'r'} = ${m*r} (cm).`:`Vậy bán kính đáy là ${r} cm.`],'',`${ask?m*r:r} cm`),[m,r,ask]]}),

gn('kg3.tru_gap',()=>{const a=R(2,6),b=R(2,6),t=R(0,1);
 const ans=t==0?fr(a*a,b):fr(a,b*b);
 return[Iq(t==0?`Một hình trụ có bán kính đáy tăng ${a} lần và chiều cao giảm ${b} lần. Thể tích của hình trụ mới bằng bao nhiêu lần thể tích hình trụ ban đầu? (Nhập số nguyên hoặc phân số a/b tối giản.)`:`Một hình trụ có bán kính đáy giảm ${b} lần và chiều cao tăng ${a} lần. Thể tích của hình trụ mới bằng bao nhiêu lần thể tích hình trụ ban đầu? (Nhập số nguyên hoặc phân số a/b tối giản.)`,ans,
  [`Hình trụ ban đầu: V = πr^2h.`,t==0?`Hình trụ mới có bán kính ${a}r, chiều cao ${fh('h',b)}: V′ = π(${a}r)^2·${fh('h',b)} = ${fh(`${a*a}πr^2h`,b)}.`:`Hình trụ mới có bán kính ${fh('r',b)}, chiều cao ${a}h: V′ = π(${fh('r',b)})^2·${a}h = ${fh(`${a}πr^2h`,b*b)}.`,`Vậy V′ = ${fq(t==0?a*a:a,t==0?b:b*b)} V.`],'',ans),[a,b,t]]}),

gn('kg3.archimedes',()=>{const R0=R(2,12),k=R(0,2);
 const q=['Thể tích hình cầu bằng bao nhiêu phần thể tích hình trụ?','Diện tích mặt cầu bằng bao nhiêu phần diện tích toàn phần của hình trụ?','Diện tích mặt cầu bằng bao nhiêu lần diện tích xung quanh của hình trụ?'][k],
  ans=['2/3','2/3','1'][k];
 return[Iq(`Một hình cầu có bán kính ${R0} cm nội tiếp trong một hình trụ (hình trụ có bán kính đáy ${R0} cm và chiều cao ${2*R0} cm). ${q} (Nhập số nguyên hoặc phân số a/b tối giản.)`,ans,
  [`Hình cầu: V = ${fh(4,3)}πR^3, S = 4πR^2. Hình trụ: r = R, h = 2R.`,k==0?`V_trụ = πR^2·2R = 2πR^3. Tỉ số V_cầu : V_trụ = ${fh('4πR^3',3)} : 2πR^3 = ${fh(2,3)}.`:k==1?`S_tp của trụ = 2πR·2R + 2πR^2 = 6πR^2. Tỉ số S_cầu : S_tp = 4πR^2 : 6πR^2 = ${fh(2,3)}.`:`S_xq của trụ = 2πR·2R = 4πR^2. Tỉ số S_cầu : S_xq = 4πR^2 : 4πR^2 = 1.`],'',ans),[R0,k]]}),

gn('kg3.do_nuoc',()=>{let f=null;
 for(let i=0;i<500&&!f;i++){const r=R(3,12),h=R(3,15),Rc=R(2,9),V=r*r*h,h2=V/(3*Rc*Rc);if(Number.isInteger(h2)&&h2>=2&&h2<=30&&Rc<r+3)f={r,h,Rc,h2}}
 if(!f)throw 0;const {r,h,Rc,h2}=f;
 return[Iq(`Một cốc hình nón có bán kính đáy ${r} cm, chiều cao ${h} cm đang chứa đầy nước. Đổ toàn bộ nước đó sang một bình hình trụ có bán kính đáy ${Rc} cm. Mực nước trong bình hình trụ cao bao nhiêu xentimét?`,h2,
  [`Thể tích nước trong cốc hình nón: V = ${fh(1,3)}π·${r}^2·${h} = ${r*r*h/3}π (cm³).`,`Gọi x (cm) là mực nước trong bình trụ: V = π·${Rc}^2·x = ${Rc*Rc}πx.`,`Hai thể tích bằng nhau nên ${Rc*Rc}πx = ${r*r*h/3}π, suy ra x = ${r*r*h/3} : ${Rc*Rc} = ${h2} (cm).`],'',`${h2} cm`),[r,h,Rc]]}),

gn('kg3.khoi_go',()=>{let f=null;for(let i=0;i<200&&!f;i++){const r=R(2,9),h=R(3,15);if((r*r*h)%3==0)f={r,h}}
 if(!f)throw 0;const {r,h}=f,V=2*r*r*h/3;
 return[Iq(`Một khối gỗ hình trụ có bán kính đáy ${r} cm, chiều cao ${h} cm được gọt thành một khối hình nón có cùng đáy và cùng chiều cao với khối trụ. Thể tích phần gỗ bị gọt đi là kπ cm³. Tìm k.`,V,
  [`Thể tích khối trụ: V₁ = πr^2h = π·${r}^2·${h} = ${r*r*h}π (cm³).`,`Thể tích khối nón: V₂ = ${fh(1,3)}πr^2h = ${fh(1,3)}·${r*r*h}π = ${r*r*h/3}π (cm³).`,`Thể tích phần gỗ bị gọt đi: V₁ − V₂ = ${r*r*h}π − ${r*r*h/3}π = ${V}π (cm³).`],'',`k = ${V}`),[r,h]]}));
})();
