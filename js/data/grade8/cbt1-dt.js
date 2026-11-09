/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 1" — Chương 1: Đa thức
   Chủ đề l8dt (Đa thức nhiều biến). Mã dạng bài: dt2.*  ·  Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles8b.js */
(()=>{const {add,addH,gn,M,Iq,PL,pmut,lin,ng}=G8H,{norm,mul,pad,neg,sub,ev,str}=PL,
nzc=(m=6)=>{let v;do v=R(-m,m);while(!v);return v},
S=A=>str(norm(A)),
/* đơn thức nhiều biến x, y, z: c = hệ số (số hoặc chuỗi, ví dụ '2/5'), e = [mũ x, mũ y, mũ z] */
V=['x','y','z'],
mo=(c,e)=>{if(c===0)return'0';const v=e.map((k,i)=>k?V[i]+(k>1?'^'+k:''):'').join('');
 if(typeof c=='string')return v?c+v:c;
 return v?(c==1?'':c==-1?'−':ng(c))+v:ng(c)},
sg=v=>v<0?'−':'+',
/* đa thức hai biến x, y: n hạng tử khác nhau, bậc mỗi hạng tử không quá d */
rp=(n,d=2)=>{const s=new Set(),t=[];let g=0;while(t.length<n&&g++<80){const a=R(0,d),b=R(0,d-a);if(s.has(a+','+b))continue;s.add(a+','+b);t.push([nzc(5),a,b])}return norm(t)},
/* đa thức một biến x: n hạng tử, bậc không quá d */
rpx=(n=3,d=3)=>norm(sh([...Array(d+1).keys()]).slice(0,n).map(k=>[nzc(5),k,0])),
/* tích hai đơn thức */
pd=()=>{const c1=nzc(5),c2=nzc(5),e1=[R(1,3),R(0,3),R(0,2)],e2=[R(0,3),R(1,3),R(0,2)];
 return{c1,c2,e1,e2,c:c1*c2,e:e1.map((k,i)=>k+e2[i])}},
/* các biến có mặt trong đơn thức e (kèm chỉ số) */
vs=e=>[0,1,2].filter(i=>e[i]>0);

/* ================= CƠ BẢN ================= */
add('l8dt',
gn('dt2.tich_don',()=>{const {c1,c2,e1,e2,c,e}=pd(),ans=mo(c,e),ix=vs(e),z0=[...e1,...e2].some(k=>k==0);
 return[M(`Thu gọn đơn thức A = (${mo(c1,e1)})·(${mo(c2,e2)}). Kết quả là`,ans,
  [c1+c2?mo(c1+c2,e):null,mo(c,e1.map((k,i)=>k*e2[i])),mo(-c,e),mo(c,e.map((k,i)=>i==ix[0]?k+1:k)),e[2]>0?mo(c,[e[0],e[1],0]):null,mo(c,e.map((k,i)=>i==ix[ix.length-1]?k+1:k))].filter(v=>v!=null),
  [`Nhân các hệ số với nhau: ${ng(c1)}·${pa(c2)} = ${ng(c)}.`,
   `Nhân phần biến: cộng số mũ của cùng một biến. ${ix.map(i=>`Số mũ của ${V[i]}: ${e1[i]} + ${e2[i]} = ${e[i]}`).join('; ')}${z0?' (biến không xuất hiện thì số mũ là 0)':''}.`,
   `Đơn thức thu gọn: A = ${ans}.`],'',String),[c1,c2,e1,e2]]}),
gn('dt2.he_so_bac',()=>{const {c1,c2,e1,e2,c,e}=pd(),t=R(0,1),d=e[0]+e[1]+e[2],ans=mo(c,e);
 return[Iq(`Cho đơn thức A = (${mo(c1,e1)})·(${mo(c2,e2)}). Sau khi thu gọn, ${t?'bậc':'hệ số'} của A là bao nhiêu?`,t?d:c,
  [`Nhân các hệ số: ${ng(c1)}·${pa(c2)} = ${ng(c)}. Nhân phần biến (cộng số mũ cùng biến): ta được A = ${ans}.`,
   t?`Bậc của đơn thức là tổng các số mũ của các biến: ${vs(e).map(i=>e[i]).join(' + ')} = ${d}.`:`Hệ số là phần số đứng trước phần biến: ${ng(c)}.`]),[c1,c2,e1,e2,t]]}),
(()=>{
 const MON=['−3x^2y','5','x','7xy^3','2/5x^2y','−x^3y^2z','4y','−6','x^2y^3','9xyz','1/2xy^2'],
 NON=[['x + 5','có phép cộng'],['2x − 3y','có phép trừ'],['x^2 + y^2','có phép cộng'],['5 − xy','có phép trừ'],['x(y + 1)','chứa tổng y + 1 trong ngoặc'],['1 − y','có phép trừ'],['3/x','có biến ở mẫu'],['2x + 1','có phép cộng'],['x^2 − y','có phép trừ']];
 return gn('dt2.la_don_thuc',()=>{const t=R(0,1),m=sh(MON).slice(0,3),n=sh(NON).slice(0,3),
  q=t?`Trong các biểu thức sau, biểu thức nào KHÔNG là đơn thức?`:`Trong các biểu thức sau, biểu thức nào là đơn thức?`,
  ans=t?n[0][0]:m[0],ws=t?m.slice(0,3):n.map(x=>x[0]),all=t?[n[0],...m.slice(0,3).map(x=>[x,'là tích của số và các biến'])]:[[m[0],'là tích của số và các biến'],...n];
  return[M(q,ans,ws,[`Đơn thức là biểu thức chỉ gồm một số, một biến hoặc tích của các số và biến (không có phép cộng, phép trừ, không có biến ở mẫu).`,
   `Xét từng biểu thức: ${sh(all).map(([x,r])=>`${x}: ${r}`).join('; ')}.`],'',String),[t,ans]]})})(),
gn('dt2.dong_dang',()=>{const a=R(1,4);let b;do b=R(1,4);while(b==a);const c=nzc(7);let c2;do c2=nzc(7);while(c2==c);
 const A=mo(c,[a,b,0]),ans=mo(c2,[a,b,0]);
 return[M(`Đơn thức nào sau đây đồng dạng với đơn thức ${A}?`,ans,[mo(nzc(7),[b,a,0]),mo(nzc(7),[a+1,b,0]),mo(nzc(7),[a,b+1,0]),mo(nzc(7),[a,0,0])],
  [`Hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến.`,
   `Phần biến của ${A} là ${mo(1,[a,b,0])}. Chỉ đơn thức ${ans} có cùng phần biến này (hệ số có thể khác nhau).`],'',String),[a,b,c]]}),
gn('dt2.cong_dd',()=>{const e=[R(1,3),R(1,2),0],c1=nzc(9),c2=nzc(9),c3=nzc(9),s=c1+c2+c3;if(!s)throw 0;
 const ans=mo(s,e);
 return[M(`Tính: ${mo(c1,e)} ${sg(c2)} ${mo(Math.abs(c2),e)} ${sg(c3)} ${mo(Math.abs(c3),e)}`,ans,
  [mo(Math.abs(c1)+Math.abs(c2)+Math.abs(c3),e),mo(c1-c2-c3,e),mo(-s,e),mo(s,e.map(k=>k*3)),mo(s+1,e),mo(s-1,e)],
  [`Ba đơn thức này có cùng phần biến ${mo(1,e)} nên là các đơn thức đồng dạng.`,
   `Cộng, trừ các đơn thức đồng dạng: cộng, trừ các hệ số và giữ nguyên phần biến.`,
   `Hệ số: ${ng(c1)} ${sg(c2)} ${Math.abs(c2)} ${sg(c3)} ${Math.abs(c3)} = ${ng(s)}, nên kết quả là ${ans}.`],'',String),[e,c1,c2,c3]]}),
gn('dt2.dem_dong_dang',()=>{const a=R(1,3),b=R(0,3);if(a+b<2)throw 0;const c=nzc(6),k=R(1,3),tot=6;
 const used=new Set([a+','+b]),others=[];while(others.length<tot-k){const x=R(0,3),y=R(0,3);if(x+y<1||used.has(x+','+y))continue;used.add(x+','+y);others.push([x,y])}
 const items=sh([...Array(k)].map(()=>({s:1,c:nzc(8),e:[a,b,0]})).concat(others.map(([x,y])=>({s:0,c:nzc(8),e:[x,y,0]})))),
  A=mo(c,[a,b,0]);
 return[Iq(`Trong các đơn thức sau, có bao nhiêu đơn thức đồng dạng với đơn thức ${A}? Các đơn thức: ${items.map(t=>mo(t.c,t.e)).join('; ')}.`,k,
  [`Phần biến của ${A} là ${mo(1,[a,b,0])}. Đơn thức đồng dạng phải có cùng phần biến (các biến và số mũ giống hệt nhau).`,
   `Xét từng đơn thức: ${items.map(t=>`${mo(t.c,t.e)} ${t.s?'(đồng dạng)':'(không)'}`).join('; ')}.`,`Có ${k} đơn thức đồng dạng.`]),[a,b,k]]}),
(()=>{
 const pairs=()=>{const s=new Set(),r=[];while(r.length<4){const a=R(0,5),b=R(0,5);if(a+b<2||s.has(a+','+b))continue;s.add(a+','+b);r.push([a,b])}return r};
 return gn('dt2.thu_gon_bac',()=>{const d=p=>p[0]+p[1];let ps;do ps=pairs();while(!(Math.max(d(ps[1]),d(ps[3]))<Math.max(d(ps[0]),d(ps[2]))));
  const [p1,p2,p3,p4]=ps,c1=nzc(6),c3=nzc(6),u=nzc(6),w=nzc(6);let v;do v=nzc(6);while(u+v==0);
  const T=sh([[c1,...p1],[-c1,...p1],[u,...p2],[v,...p2],[c3,...p3],[-c3,...p3],[w,...p4]]),ans=Math.max(d(p2),d(p4)),red=norm([[u+v,...p2],[w,...p4]]),m=p=>str([[1,...p]]);
  return[Iq(`Thu gọn rồi tìm bậc của đa thức A = ${str(T)}`,ans,
   [`Nhóm các hạng tử đồng dạng và cộng các hệ số: ${m(p1)}: ${ng(c1)} + ${pa(-c1)} = 0; ${m(p3)}: ${ng(c3)} + ${pa(-c3)} = 0; ${m(p2)}: ${ng(u)} + ${pa(v)} = ${ng(u+v)}.`,
    `Đa thức thu gọn: A = ${str(red)}.`,
    `Bậc của từng hạng tử: ${red.map(t=>`${str([t])} có bậc ${t[1]+t[2]}`).join('; ')}. Bậc của đa thức là ${ans}.`],'' ),[T]]})})(),
gn('dt2.cong_ba',()=>{const A=rpx(3),B=rpx(3),C=rpx(3),s1=P([1,-1]),s2=P([1,-1]);
 let r=s1>0?pad(A,B):sub(A,B);r=s2>0?pad(r,C):sub(r,C);if(r.length<2)throw 0;
 const o=[[1,1],[1,-1],[-1,1],[-1,-1]].filter(([a,b])=>a!=s1||b!=s2).map(([a,b])=>{let x=a>0?pad(A,B):sub(A,B);x=b>0?pad(x,C):sub(x,C);return S(x)});
 return[M(`Cho A = ${str(A)}, B = ${str(B)} và C = ${str(C)}. Tính A ${sg(s1)} B ${sg(s2)} C.`,S(r),[...o,...pmut(r).slice(0,2)],
  [`Bỏ ngoặc (nhớ đổi dấu các hạng tử trong ngoặc đứng sau dấu −): A ${sg(s1)} B ${sg(s2)} C = (${str(A)}) ${sg(s1)} (${str(B)}) ${sg(s2)} (${str(C)}).`,
   `Gộp các hạng tử đồng dạng (cùng bậc) ta được kết quả ${S(r)}.`],'',String),[A,B,C,s1,s2]]}),
gn('dt2.tim_A',()=>{const A=rp(R(2,3)),B=rp(R(2,3)),t=R(0,2);
 const C=t==0?pad(A,B):t==1?sub(A,B):sub(B,A);if(!C.length||A.length<2)throw 0;
 const eq=t==0?`A + (${str(B)}) = ${str(C)}`:t==1?`A − (${str(B)}) = ${str(C)}`:`(${str(B)}) − A = ${str(C)}`,
  fm=t==0?`A = (${str(C)}) − (${str(B)})`:t==1?`A = (${str(C)}) + (${str(B)})`:`A = (${str(B)}) − (${str(C)})`;
 return[M(`Tìm đa thức A, biết ${eq}.`,S(A),[S(pad(C,B)),S(sub(C,B)),S(sub(B,C)),S(neg(A)),S(pad(B,C)),...pmut(A).slice(0,2)],
  [t==0?`A cộng B bằng C nên A bằng C trừ B.`:t==1?`A trừ B bằng C nên A bằng C cộng B (số bị trừ = hiệu + số trừ).`:`B trừ A bằng C nên A bằng B trừ C (số trừ = số bị trừ − hiệu).`,
   `${fm}. Bỏ ngoặc (đổi dấu các hạng tử trong ngoặc đứng sau dấu −), gộp các hạng tử đồng dạng: A = ${S(A)}.`],'',String),[A,B,C,t]]}),
gn('dt2.nhan_hai_bien',()=>{const p=R(1,3),q=nzc(3),f2=[[nzc(3),2,0],[nzc(3),1,1],[nzc(3),0,2]],f1=[[p,1,0],[q,0,1]],r=mul(f1,f2);if(r.length<3)throw 0;
 return[M(`Khai triển: (${str(f1)})(${str(f2)})`,str(r),[...pmut(r).slice(0,3),str(norm(mul([[p,1,0]],f2).concat(mul([[-q,0,1]],f2)))),str(norm(pad(mul([[p,1,0]],f2),[[q,1,0]])))],
  [`Nhân từng hạng tử của thừa số thứ nhất với cả thừa số thứ hai: ${p==1?'x':p+'x'}·(${str(f2)}) = ${str(mul([[p,1,0]],f2))} và ${pa(q)}y·(${str(f2)}) = ${str(mul([[q,0,1]],f2))}.`,
   `Cộng hai kết quả rồi gộp các hạng tử đồng dạng: ${str(r)}.`],'',String),[p,q,f2]]}));

/* ================= NÂNG CAO ================= */
addH('l8dt',
gn('dt2.thu_gon_gtri',()=>{const ps=[[R(2,5),R(2,4)],[R(1,4),R(2,4)],[R(1,3),R(1,3)]],s=new Set(ps.map(p=>p.join())).size;if(s<3)throw 0;
 const [p1,p2,p3]=ps,c1=nzc(5),u=nzc(5),v=nzc(5),w=nzc(5),z=nzc(5);if(u+v==0||w+z==0)throw 0;
 const T=sh([[c1,...p1],[-c1,...p1],[u,...p2],[v,...p2],[w,...p3],[z,...p3]]),red=norm([[u+v,...p2],[w+z,...p3]]),x=P([-2,-1,1,2]),y=P([-2,-1,1,2]),val=ev(red,x,y),m=p=>str([[1,...p]]);
 return[Iq(`Thu gọn rồi tính giá trị của đa thức B = ${str(T)} tại x = ${ng(x)}; y = ${ng(y)}.`,val,
  [`Thu gọn: ${m(p1)}: ${ng(c1)} + ${pa(-c1)} = 0; ${m(p2)}: ${ng(u)} + ${pa(v)} = ${ng(u+v)}; ${m(p3)}: ${ng(w)} + ${pa(z)} = ${ng(w+z)}. Vậy B = ${str(red)}.`,
   `Thay x = ${ng(x)}, y = ${ng(y)} vào từng hạng tử: ${red.map(t=>[pa(t[0]),t[1]?pa(x)+(t[1]>1?'^'+t[1]:''):'',t[2]?pa(y)+(t[2]>1?'^'+t[2]:''):''].filter(Boolean).join('·')).join(' + ')} = ${red.map(t=>pa(ev([t],x,y))).join(' + ')}.`,`Cộng các giá trị: B = ${ng(val)}.`]),[T,x,y]]}),
gn('dt2.rut_gon_nhan',()=>{const a=nzc(6),b=nzc(5),c=nzc(5),k=a-c+b,cst=b*c;if(!k)throw 0;
 const ans=lin(k,cst);
 return[M(`Rút gọn biểu thức A = x(${lin(1,a)}) − (${lin(1,-b)})(${lin(1,c)}).`,ans,[lin(a-c-b,cst),lin(a+c-b,cst),lin(k,-cst),lin(a-c-b,-cst),lin(k+1,cst),lin(k,cst+1)],
  [`Khai triển từng tích: x(${lin(1,a)}) = ${S([[1,2],[a,1]])}; (${lin(1,-b)})(${lin(1,c)}) = ${S([[1,2],[c-b,1],[-b*c,0]])}.`,
   `Trừ hai kết quả (đổi dấu mọi hạng tử của tích thứ hai): ${S([[1,2],[a,1]])} ${S([[-1,2],[b-c,1],[b*c,0]]).replace(/^−/,'− ').replace(/^(?!−)/,'+ ')}.`,
   `Các hạng tử x^2 triệt tiêu, còn lại A = ${ans}.`],'',String),[a,b,c]]}),
gn('dt2.tim_B',()=>{const cB=nzc(5),cC=nzc(5),eB=[R(0,3),R(0,2),0],eC=[R(0,2),R(0,2),0],eA=eB.map((k,i)=>k+eC[i]);if(eB[0]+eB[1]<1||eC[0]+eC[1]<1)throw 0;
 const A=mo(cB*cC,eA),B=mo(cB,eB),C=mo(cC,eC);
 return[M(`Tìm đơn thức B, biết (${A}) : B = ${C}.`,B,[mo(cB,eA.map((k,i)=>k+eC[i])),mo(-cB,eB),mo(cB*cC,eB),mo(cC,eB),mo(cB,eB.map((k,i)=>i==0?k+1:k)),mo(cB,eB.map((k,i)=>i==1?k+1:k))],
  [`Số bị chia chia cho thương ra số chia: B = (${A}) : (${C}).`,
   `Chia hệ số: ${ng(cB*cC)} : ${pa(cC)} = ${ng(cB)}. Chia phần biến (trừ số mũ cùng biến): ${vs(eA).map(i=>`${V[i]}: ${eA[i]} − ${eC[i]} = ${eB[i]}`).join('; ')}.`,
   `Vậy B = ${B}.`],'',String),[cB,cC,eB,eC]]}),
gn('dt2.du_chia',()=>{const m=P([3,4,5,6,7]),r1=R(1,m-1),r2=R(1,m-1),t=R(0,3);
 const L=['a + b','a·b','a^2','a^2 + b^2'],val=[r1+r2,r1*r2,r1*r1,r1*r1+r2*r2][t],ans=val%m,
  why=[`a + b = m(k + l) + (${r1} + ${r2}) = m(k + l) + ${r1+r2}`,`a·b = m(…) + ${r1}·${r2} = m(…) + ${r1*r2}`,`a^2 = m(…) + ${r1}^2 = m(…) + ${r1*r1}`,`a^2 + b^2 = m(…) + ${r1}^2 + ${r2}^2 = m(…) + ${r1*r1+r2*r2}`][t].replace(/m/g,m);
 return[Iq(`Cho a và b là hai số tự nhiên. Biết a chia ${m} dư ${r1}, b chia ${m} dư ${r2}. Tìm số dư của phép chia ${L[t]} cho ${m}.`,ans,
  [`Viết a = ${m}k + ${r1} và b = ${m}l + ${r2} (k, l là số tự nhiên).`,
   `Khai triển: ${why}. Phần có nhân tử ${m} thì chia hết cho ${m}.`,
   `Phần còn lại là ${val}, chia ${m} dư ${ans}.`]),[m,r1,r2,t]]}),
gn('dt2.gt_dac_biet',()=>{const D=P([4,6]),n=R(9,29),k=n+1,c=nzc(9),T=[[1,D]];for(let j=D-1;j>=1;j--)T.push([(D-j)%2?-k:k,j]);T.push([c,0]);
 return[Iq(`Tính giá trị của biểu thức A = ${str(T.map(([c0,a])=>[c0,a,0]))} tại x = ${n}.`,c-n,
  [`Vì x = ${n} nên ${k} = x + 1. Viết lại: A = x^${D} − (x + 1)x^${D-1} + (x + 1)x^${D-2} − … − (x + 1)x ${sg(c)} ${Math.abs(c)}.`,
   `Rút gọn dần từng cặp: x^${D} − (x + 1)x^${D-1} = −x^${D-1}; rồi −x^${D-1} + (x + 1)x^${D-2} = x^${D-2}; … cuối cùng được A = −x ${c<0?'−':'+'} ${Math.abs(c)}.`,
   `Thay x = ${n}: A = −${n} ${c<0?'−':'+'} ${Math.abs(c)} = ${ng(c-n)}.`]),[D,n,c]]}),
gn('dt2.khong_phu_thuoc',()=>{const t=R(0,1),a=nzc(5),b=nzc(5),c=nzc(9);
 if(t==0){if(a+b==0)throw 0;return[Iq(`Biểu thức A = (${lin(1,a)})(${lin(1,b)}) − x(${lin(1,a+b)}) ${sg(c)} ${Math.abs(c)} có giá trị không phụ thuộc vào x. Giá trị đó bằng bao nhiêu?`,a*b+c,
  [`Khai triển: (${lin(1,a)})(${lin(1,b)}) = ${S([[1,2],[a+b,1],[a*b,0]])} và x(${lin(1,a+b)}) = ${S([[1,2],[a+b,1]])}.`,
   `Trừ hai kết quả: các hạng tử chứa x triệt tiêu, còn ${ng(a*b)}. Vậy A = ${ng(a*b)} ${sg(c)} ${Math.abs(c)} = ${ng(a*b+c)}.`]),[0,a,b,c]]}
 if(a==2*b)throw 0;return[Iq(`Biểu thức A = (${lin(2,a)})(${lin(1,-b)}) − x(${lin(2,a-2*b)}) có giá trị không phụ thuộc vào x. Giá trị đó bằng bao nhiêu?`,-a*b,
  [`Khai triển: (${lin(2,a)})(${lin(1,-b)}) = ${S([[2,2],[a-2*b,1],[-a*b,0]])} và x(${lin(2,a-2*b)}) = ${S([[2,2],[a-2*b,1]])}.`,
   `Trừ hai kết quả: các hạng tử chứa x triệt tiêu, còn lại A = ${ng(-a*b)}.`]),[1,a,b,c]]}),
gn('dt2.tim_x_nhan',()=>{const a=nzc(5),b=nzc(5),c=nzc(5),d=nzc(5),m=a+b+c-d;if(!m)throw 0;const x0=nzc(6),k=m*x0+a*b+c*d;
 return[Iq(`Tìm x, biết (${lin(1,a)})(${lin(1,b)}) − (${lin(1,-c)})(${lin(1,d)}) = ${ng(k)}.`,x0,
  [`Khai triển: (${lin(1,a)})(${lin(1,b)}) = ${S([[1,2],[a+b,1],[a*b,0]])}; (${lin(1,-c)})(${lin(1,d)}) = ${S([[1,2],[d-c,1],[-c*d,0]])}.`,
   `Trừ hai vế trái (các hạng tử x^2 triệt tiêu): ${lin(m,a*b+c*d)} = ${ng(k)}.`,
   `Chuyển vế: ${ng(m)}x = ${ng(k-a*b-c*d)}, suy ra x = ${ng(x0)}.`]),[a,b,c,d,k]]}),
gn('dt2.he_so_tich3',()=>{const a=nzc(5),b=nzc(5),c=nzc(5),t=R(0,1),A=[[1,1],[a,0]],B=[[1,1],[b,0]],C=[[1,1],[c,0]],r=mul(mul(A,B),C),v=t?a*b+b*c+c*a:a+b+c;if(!v)throw 0;
 return[Iq(`Khai triển (${lin(1,a)})(${lin(1,b)})(${lin(1,c)}). Hệ số của ${t?'x':'x^2'} trong kết quả là bao nhiêu?`,v,
  [`Nhân hai thừa số đầu: (${lin(1,a)})(${lin(1,b)}) = ${S([[1,2],[a+b,1],[a*b,0]])}.`,
   `Nhân tiếp với (${lin(1,c)}): được ${str(r)}.`,`Đọc hệ số của ${t?'x':'x^2'}: ${ng(v)}.`]),[a,b,c,t]]}),
gn('dt2.bac_tich',()=>{const A=rp(3,R(2,3)),B=rp(3,R(2,3)),dA=PL.dg(A),dB=PL.dg(B),r=mul(A,B);if(PL.dg(r)!=dA+dB)throw 0;
 return[Iq(`Tìm bậc của đa thức P = (${str(A)})(${str(B)}) (sau khi khai triển và thu gọn).`,dA+dB,
  [`Bậc của thừa số thứ nhất là ${dA} (hạng tử bậc cao nhất), bậc của thừa số thứ hai là ${dB}.`,
   `Khi nhân hai đa thức, hạng tử bậc cao nhất của tích bằng tích hai hạng tử bậc cao nhất, nên bậc của tích bằng ${dA} + ${dB} = ${dA+dB}.`]),[A,B]]}));
})();
