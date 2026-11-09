/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 2" — Chương VI: Phân thức đại số (bài 21–24)
   Chủ đề l8pt (mã pt2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles8c.js */
(()=>{const {add,addH,gn,M,Iq,fh,fr,fq,fd,lin,ng,PL}=G8H,{norm,mul,pad,neg,sub,str}=PL,
{nzc,pk,sx,px,qd,FR,same,near,subs,val,ords,sg,uq,mut}=G8X,
two=(u,v)=>{[u,v]=[u,v].sort((p,q)=>p-q);return `x ≠ ${ng(u)} và x ≠ ${ng(v)}`},
ab=Math.abs,
lc=(a,b)=>a/gcd(a,b)*b,
c1=v=>v>1?''+v:'',          /* hệ số đứng trước: 1 thì bỏ */
rx=c=>c?`${ng(c)} − x`:'−x',  /* c − x */
X2=a=>qd(a,-a);             /* x^2 − a^2 */

/* ================= CƠ BẢN ================= */
add('l8pt',
gn('pt2.la_pt',()=>{const a=R(2,9),b=R(1,9),c=R(2,5),t=R(0,1),
 OK=[[fh(`x + ${b}`,`x − ${a}`),'tử và mẫu đều là đa thức, mẫu khác 0'],[fh(`${a}`,`x^2 + ${b}`),'tử và mẫu đều là đa thức, mẫu khác 0'],[fh('x^2 − y^2',`${c}x + y`),'tử và mẫu đều là đa thức, mẫu khác 0'],[fh(`${a}x`,`${a+c}`),'tử là đa thức, mẫu là số khác 0'],[`x^2 − ${a}x + ${b}`,'là đa thức, mà mỗi đa thức là một phân thức (mẫu bằng 1)']],
 NO=[[fh(`x + ${b}`,'0'),'mẫu bằng 0'],[fh('√x',`x + ${b}`),'tử chứa √x, không phải đa thức'],[fh(`x − ${a}`,`√x + ${b}`),'mẫu chứa √x, không phải đa thức'],[fh(`${a}`,`√(x − ${b})`),'mẫu chứa căn của biến, không phải đa thức'],[fh(`x^2 + ${a}`,'0'),'mẫu bằng 0']],
 ok=sh(OK),no=sh(NO),ans=t?ok[0]:no[0],ws=t?no.slice(0,3):ok.slice(0,3);
 return[M(`Biểu thức nào sau đây ${t?'là':'KHÔNG phải là'} phân thức đại số?`,ans[0],ws.map(w=>w[0]),
  [`Phân thức đại số là biểu thức có dạng ${fh('A','B')}, trong đó A, B là các đa thức và B khác đa thức 0. Mỗi đa thức cũng là một phân thức.`,
   `Xét từng biểu thức: ${sh([ans,...ws]).map(([e,r])=>`${e} (${r})`).join('; ')}.`],'',String),[t]]}),
gn('pt2.dk_nhan_tu',()=>{const t=R(0,3),nu=P(['1','3','x + 1','x − 2','2x']);let den,ans,wr,st;
 if(t==0){const a=nzc(7);let b=nzc(7);while(a+b==0)b=nzc(7);
  den=px(a)+px(-b);ans=two(a,-b);wr=[`x ≠ ${ng(a)}`,`x ≠ ${ng(-b)}`,two(-a,b),two(a,b),two(-a,-b)];
  st=[`Mẫu thức phải khác 0: ${den} ≠ 0.`,`Tích khác 0 khi cả hai thừa số đều khác 0: ${sx(a)} ≠ 0 và ${sx(-b)} ≠ 0.`,`Suy ra x ≠ ${ng(a)} và x ≠ ${ng(-b)}.`]}
 else if(t==1){const A=R(2,5);let B=nzc(9);while(gcd(A,Math.abs(B))!=1)B=nzc(9);
  den=lin(A,B);ans=`x ≠ ${fq(-B,A)}`;wr=[`x ≠ ${fq(B,A)}`,`x ≠ ${ng(-B)}`,`x ≠ ${ng(B)}`,`x ≠ ${fq(-A,B)}`,`x ≠ ${fq(A,B)}`];
  st=[`Mẫu thức phải khác 0: ${den} ≠ 0.`,`Chuyển vế: ${A}x ≠ ${ng(-B)}.`,`Chia hai vế cho ${A}: x ≠ ${fq(-B,A)}.`]}
 else if(t==2){const r1=nzc(7);let r2=nzc(7);while(r1==r2)r2=nzc(7);
  den=str(qd(r1,r2));ans=two(r1,r2);wr=[two(-r1,-r2),`x ≠ ${ng(r1)}`,`x ≠ ${ng(r2)}`,`x ≠ ${ng(r1+r2)}`,`x ≠ ${ng(r1*r2)}`,two(r1,-r2)];
  st=[`Mẫu thức phải khác 0: ${den} ≠ 0.`,`Phân tích thành nhân tử: ${den} = ${px(r1)}${px(r2)}.`,`Cả hai thừa số phải khác 0, nên x ≠ ${ng(r1)} và x ≠ ${ng(r2)}.`]}
 else{const c=P([1,4,9,16,25]),k=Math.sqrt(c),a=nzc(7);
  den=`(x^2 + ${c})${px(a)}`;ans=`x ≠ ${ng(a)}`;
  wr=[`x ≠ ${ng(a)}, x ≠ ${k} và x ≠ ${ng(-k)}`,`x ≠ ${ng(a)} và x ≠ ${k}`,`x ≠ ${ng(a)} và x ≠ ${ng(-k)}`,`x ≠ ${ng(a)} và x ≠ ${ng(-a)}`,`x ≠ ${ng(-a)}`];
  st=[`Mẫu thức phải khác 0: ${den} ≠ 0.`,`Thừa số x^2 + ${c} luôn lớn hơn 0 (vì x^2 ≥ 0) nên không bao giờ bằng 0.`,`Chỉ cần ${sx(a)} ≠ 0, tức là x ≠ ${ng(a)}.`]}
 return[M(`Điều kiện xác định của phân thức ${fh(nu,den)} là`,ans,wr,st,'',String),[t]]}),
gn('pt2.gia_tri',()=>{const t=R(0,2);let N,D,x0=nzc(4),y0=0;
 if(t==0){N=pk(nzc(6),nzc(5));D=pk(nzc(6),nzc(3))}
 else if(t==1){N=pk(nzc(6),nzc(4),nzc(3));D=R(0,1)?pk(nzc(6),nzc(3)):qd(nzc(4),nzc(4))}
 else{y0=nzc(4);N=norm([[nzc(3),2,0],[nzc(4),0,1]]);D=norm([[1,1,0],[nzc(3),0,1]])}
 const n=PL.ev(N,x0,y0),d=PL.ev(D,x0,y0);if(!d||Math.abs(n)>150||Math.abs(d)>150)throw 0;
 const lab=t==2?`x = ${ng(x0)}, y = ${ng(y0)}`:`x = ${ng(x0)}`;
 return[Iq(`Tính giá trị của phân thức ${FR(N,D)} tại ${lab}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(n,d),
  [`Điều kiện xác định: mẫu thức phải khác 0. Tại ${lab}, mẫu thức = ${subs(D,x0,y0)} = ${ng(d)}, khác 0 nên phân thức xác định.`,
   `Tử thức = ${subs(N,x0,y0)} = ${ng(n)}.`,`Giá trị của phân thức là ${val(n,d)}.`]),[t]]}),
gn('pt2.gt_khong_xd',()=>{const a=nzc(7),s=nzc(7),t=R(0,3),k=R(2,4);if(s==a)throw 0;
 const den=[sx(a),lin(k,-k*a),`(x^2 + 1)${px(a)}`,`${px(a)}${px(a)}`][t],
 pool=uq([s,-a,a+1,a-1,2*a,0,s+1].filter(v=>v!=a));
 return[M(`Phân thức ${fh(sx(s),den)} không xác định tại giá trị nào của x trong các giá trị sau?`,a,pool,
  [`Phân thức không xác định khi mẫu thức bằng 0.`,`Giải ${den} = 0: ${t==1?`${k}${px(a)} = 0`:t==2?`x^2 + 1 luôn dương nên chỉ có ${sx(a)} = 0`:`${sx(a)} = 0`}, suy ra x = ${ng(a)}.`,
   `Tại x = ${ng(s)} thì tử bằng 0 nhưng mẫu vẫn khác 0, nên phân thức vẫn xác định (giá trị bằng 0).`],'',ng),[a,s,t]]}),
gn('pt2.gt_bang_k',()=>{const a=nzc(6),b=nzc(6),k=P([2,3,4,-1,-2,-3]);if(a+b==0)throw 0;
 const n=k*b+a,d=k-1;
 return[Iq(`Tìm x để phân thức ${fh(lin(1,a),lin(1,-b))} có giá trị bằng ${ng(k)}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(n,d),
  [`Điều kiện xác định: ${lin(1,-b)} ≠ 0, tức x ≠ ${ng(b)}.`,`Cho phân thức bằng ${ng(k)} rồi nhân hai vế với ${lin(1,-b)}: ${lin(1,a)} = ${ng(k)}(${lin(1,-b)}).`,
   `Khai triển: ${lin(1,a)} = ${lin(k,-k*b)}. Chuyển vế: ${ng(1-k)}x = ${ng(-n)}.`,`Do đó x = ${val(-n,1-k)}, thỏa điều kiện x ≠ ${ng(b)}.`]),[a,b,k]]}),
gn('pt2.pt_bang_0',()=>{const [p,q,s]=sh([-5,-4,-3,-2,-1,0,1,2,3,4,5]).slice(0,3),N=qd(p,q),D=qd(p,s),
 S=v=>`x = ${ng(v)}`;
 return[M(`Tìm x để phân thức ${FR(N,D)} có giá trị bằng 0.`,S(q),[S(p),`${S(p)} hoặc ${S(q)}`,S(s),`${S(q)} hoặc ${S(s)}`,'Không có giá trị nào của x'],
  [`Điều kiện xác định: mẫu ${str(D)} = ${px(p)}${px(s)} ≠ 0, tức x ≠ ${ng(p)} và x ≠ ${ng(s)}.`,
   `Phân thức bằng 0 khi tử bằng 0: ${str(N)} = ${px(p)}${px(q)} = 0, suy ra x = ${ng(p)} hoặc x = ${ng(q)}.`,
   `Đối chiếu điều kiện: x = ${ng(p)} làm mẫu bằng 0 nên bị loại; x = ${ng(q)} thỏa mãn.`],'',String),[p,q,s]]}),
gn('pt2.cap_bang_nhau',()=>{const t=R(0,1),a=nzc(5);let b=nzc(5);while(a==b)b=nzc(5);
 const n=pk(a,1),d=pk(b,1),MS=sh([[pk(0,1),'x'],[pk(1,1),'x + 1'],[pk(2),'2'],[pk(3),'3'],[pk(-1,1),'x − 1'],[pk(2,1),'x + 2']]),
 big=m=>[mul(n,m),mul(d,m)],
 tw=([N,Dn])=>{const c=[...sh(mut(N)).map(v=>[v,Dn]),...sh(mut(Dn)).map(v=>[N,v])].filter(([u,w])=>u.length&&w.length&&!same(u,w,n,d));return c[0]},
 [N0,D0]=big(MS[0][0]),bad=MS.slice(1,4).map(m=>tw(big(m[0])));
 if(bad.some(v=>!v))throw 0;
 return t==0?
  [M(`Phân thức nào sau đây bằng phân thức ${FR(n,d)}?`,FR(N0,D0),bad.map(([u,w])=>FR(u,w)),
   [`Hai phân thức bằng nhau khi nhân (hoặc chia) cả tử và mẫu với cùng một đa thức khác 0.`,
    `Nhân cả tử và mẫu của ${FR(n,d)} với ${MS[0][1]}: tử = (${str(n)})·${MS[0][0].length>1?`(${MS[0][1]})`:MS[0][1]} = ${str(N0)}, mẫu = (${str(d)})·${MS[0][0].length>1?`(${MS[0][1]})`:MS[0][1]} = ${str(D0)}.`,
    `Vậy phân thức bằng ${FR(n,d)} là ${FR(N0,D0)}.`],'',String),[0]]:
  [M(`Cặp phân thức nào sau đây bằng nhau?`,`${FR(n,d)} = ${FR(N0,D0)}`,bad.map(([u,w])=>`${FR(n,d)} = ${FR(u,w)}`),
   [`Hai phân thức ${fh('A','B')} và ${fh('C','D')} bằng nhau khi A·D = B·C (nhân chéo).`,
    `Với cặp đúng: (${str(n)})·(${str(D0)}) = ${str(mul(n,D0))} và (${str(d)})·(${str(N0)}) = ${str(mul(d,N0))}, hai kết quả bằng nhau.`,
    `Với các cặp còn lại, hai tích nhân chéo cho kết quả khác nhau nên chúng không bằng nhau.`],'',String),[1]]}),
gn('pt2.tim_da_thuc',()=>{const t=R(0,2);
 if(t==2){const c=nzc(6);let e=nzc(6);while(e==c)e=nzc(6);
  return[M(`Tìm đa thức A, biết ${fh(rx(c),rx(e))} = ${fh('A',sx(e))}.`,sx(c),[rx(c),sx(-c),sx(-e),`${ng(-c)} − x`,rx(e)].map(v=>v==sx(c)?null:v).filter(Boolean),
   [`Đổi dấu cả tử và mẫu của phân thức (được một phân thức bằng phân thức đã cho): ${fh(rx(c),rx(e))} = ${fh(`−(${rx(c)})`,`−(${rx(e)})`)}.`,
    `Ta có −(${rx(c)}) = ${sx(c)} và −(${rx(e)}) = ${sx(e)}, nên ${fh(rx(c),rx(e))} = ${fh(sx(c),sx(e))}.`,`Mẫu của vế phải là ${sx(e)} nên A = ${sx(c)}.`],'',String),[2]]}
 const a=nzc(5),b=nzc(5),n=pk(a,1),d=pk(b,1);if(a==b)throw 0;const m=P([[pk(0,1),'x'],[pk(1,1),'x + 1'],[pk(-1,1),'x − 1'],[pk(2),'2'],[pk(3),'3']]),
 N=mul(n,m[0]),D=mul(d,m[0]);
 if(t==0)return[M(`Tìm đa thức A, biết ${FR(n,d)} = ${fh('A',str(D))}.`,str(N),uq([str(n),str(D),str(sub(N,d)),...mut(N).slice(0,4).map(v=>str(v))]),
  [`Mẫu ở vế trái là ${str(d)}, mẫu ở vế phải là ${str(D)} = (${str(d)})·${m[1].includes(' ')?`(${m[1]})`:m[1]}.`,`Vậy đã nhân cả tử và mẫu với ${m[1]}, nên A = (${str(n)})·${m[1].includes(' ')?`(${m[1]})`:m[1]} = ${str(N)}.`],'',String),[0]];
 return[M(`Tìm đa thức A, biết ${FR(N,D)} = ${fh('A',str(d))}.`,str(n),uq([str(N),str(D),str(neg(n)),...mut(n).slice(0,4).map(v=>str(v))]),
  [`Phân tích: ${str(N)} = (${str(n)})·${m[1].includes(' ')?`(${m[1]})`:m[1]} và ${str(D)} = (${str(d)})·${m[1].includes(' ')?`(${m[1]})`:m[1]}.`,`Chia cả tử và mẫu cho nhân tử chung ${m[1]}: ${FR(N,D)} = ${FR(n,d)}.`,`Mẫu vế phải là ${str(d)} nên A = ${str(n)}.`],'',String),[1]]}),
gn('pt2.rut_gon_ntc',()=>{const k=R(1,2),m=R(1,4),n=R(1,4),p=nzc(5),q=nzc(5);if(p==q)throw 0;
 const g=gcd(m,n),m1=m/g,n1=n/g,F=k==1?'x':'x^2',Fp=pk(...Array(k).fill(0),1),
 N=mul(mul([[m,0,0]],Fp),pk(p,1)),D=mul(mul([[n,0,0]],Fp),pk(q,1)),aN=mul([[m1,0,0]],pk(p,1)),aD=mul([[n1,0,0]],pk(q,1));
 return[M(`Rút gọn phân thức ${FR(N,D)} (với điều kiện xác định) ta được`,FR(aN,aD),near(aN,aD),
  [`Phân tích tử và mẫu thành nhân tử: tử = ${c1(m)}${F}${px(-p)}, mẫu = ${c1(n)}${F}${px(-q)}.`,
   `Nhân tử chung của tử và mẫu là ${c1(g)}${F}.`,`Chia cả tử và mẫu cho ${c1(g)}${F}: ${FR(aN,aD)}.`],'',String),[m,n,k,p,q]]}),
gn('pt2.rut_gon_doi_dau',()=>{const m=R(2,9),n=R(2,9),a=nzc(7),g=gcd(m,n);
 return[Iq(`Rút gọn phân thức ${fh(`${m}x(${ng(a)} − x)`,`${n}x${px(a)}`)} (với điều kiện xác định) ta được số nào? (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(-m,n),
  [`Hai nhân tử ${ng(a)} − x và ${sx(a)} là hai biểu thức đối nhau: ${ng(a)} − x = −${px(a)}.`,
   `Viết lại phân thức: ${fh(`−${m}x${px(a)}`,`${n}x${px(a)}`)}.`,`Chia cả tử và mẫu cho nhân tử chung ${c1(g)}x${px(a)}: được ${fq(-m,n)}.`]),[m,n,a]]}),
gn('pt2.rut_gon_hd',()=>{const a=R(1,6),m=R(2,5),t=R(0,4),
 T=[
  {n:pk(-(a*a*a),0,0,1),d:X2(a),an:pk(a*a,a,1),ad:pk(a,1),e:[`${str(pk(-(a*a*a),0,0,1))} = ${px(a)}(${str(pk(a*a,a,1))}) (hằng đẳng thức hiệu hai lập phương)`,`${str(X2(a))} = ${px(a)}${px(-a)}`],cm:px(a)},
  {n:pk((a*a*a),0,0,1),d:X2(a),an:pk(a*a,-a,1),ad:pk(-a,1),e:[`${str(pk((a*a*a),0,0,1))} = ${px(-a)}(${str(pk(a*a,-a,1))}) (hằng đẳng thức tổng hai lập phương)`,`${str(X2(a))} = ${px(a)}${px(-a)}`],cm:px(-a)},
  {n:norm([[1,2,0],[-1,0,2]]),d:norm([[1,2,0],[-2,1,1],[1,0,2]]),an:norm([[1,1,0],[1,0,1]]),ad:norm([[1,1,0],[-1,0,1]]),e:['x^2 − y^2 = (x − y)(x + y)','x^2 − 2xy + y^2 = (x − y)^2'],cm:'(x − y)'},
  {n:norm([[m,1,0],[m,0,1]]),d:norm([[1,2,0],[-1,0,2]]),an:[[m,0,0]],ad:norm([[1,1,0],[-1,0,1]]),e:[`${m}x + ${m}y = ${m}(x + y)`,'x^2 − y^2 = (x − y)(x + y)'],cm:'(x + y)'},
  {n:pk(a*a,2*a,1),d:X2(a),an:pk(a,1),ad:pk(-a,1),e:[`${str(pk(a*a,2*a,1))} = ${px(-a)}^2`,`${str(X2(a))} = ${px(a)}${px(-a)}`],cm:px(-a)}][t],
 {n,d,an,ad,e,cm}=T,w=near(an,ad);
 return[M(`Rút gọn phân thức ${FR(n,d)} (với điều kiện xác định) ta được`,FR(an,ad),w,
  [`Phân tích tử và mẫu thành nhân tử: ${e[0]}; ${e[1]}.`,`Nhân tử chung của tử và mẫu là ${cm}.`,`Chia cả tử và mẫu cho ${cm}: ${FR(an,ad)}.`],'',String),[t,a,m]]}),
gn('pt2.mtc',()=>{const c=R(0,1),k1=R(1,6),k2=R(1,6),a=nzc(5);let b=nzc(5);if(a==b||a+b==0)throw 0;
 const L=lc(k1,k2),F=c?'x':'',Fp=c?pk(0,1):pk(1),A=mul(mul([[k1,0,0]],Fp),pk(-a,1)),B=mul(mul([[k2,0,0]],Fp),pk(-b,1)),
 mt=(K,f,r1,r2)=>`${c1(K)}${f}${r1}${r2}`;
 return[M(`Mẫu thức chung đơn giản nhất của hai phân thức ${fh('1',str(A))} và ${fh('1',str(B))} là`,mt(L,F,px(a),px(b)),
  uq([mt(L,c?'x^2':'x',px(a),px(b)),mt(L*2,F,px(a),px(b)),mt(L,F,px(a),''),mt(L,F,px(-a),px(-b)),mt(L,F,'',px(b)),mt(1,F,px(a),px(b))]).filter(v=>v!=mt(L,F,px(a),px(b))),
  [`Phân tích các mẫu thành nhân tử: ${k1==1&&!c?`${str(A)} đã là nhân tử`:`${str(A)} = ${c1(k1)}${F}${px(a)}`}; ${k2==1&&!c?`${str(B)} đã là nhân tử`:`${str(B)} = ${c1(k2)}${F}${px(b)}`}.`,
   `Hệ số: BCNN(${k1}, ${k2}) = ${L}. Phần biến: lấy mỗi nhân tử với số mũ lớn nhất, gồm ${c?'x, ':''}${px(a)} và ${px(b)}.`,`Mẫu thức chung: ${mt(L,F,px(a),px(b))}.`],'',String),[k1,k2,a,b,c]]}),
gn('pt2.cong_cung_mau',()=>{const q=nzc(5),t=nzc(5),u=nzc(5),sb=R(0,1);if(q==t)throw 0;
 const v=sb?u-(q+t):q+t-u,w=sb?-q*t:q*t,N1=pk(0,u,1),N2=pk(w,v),D=lin(1,q),ans=pk(t,1),
 R2=sb?sub(N1,N2):pad(N1,N2);
 const neg2=N2[0][0]<0,op=(sb?-1:1)*(neg2?-1:1)>0?'+':'−',N2s=neg2?str(neg(N2)):str(N2);
 return[M(`Tính: ${fh(str(N1),D)} ${op} ${fh(N2s,D)} (với điều kiện xác định). Kết quả rút gọn là`,str(ans),
  uq([str(pk(q,1)),str(pk(-t,1)),str(pk(t+1,1)),str(pk(t-1,1)),str(pk(-q,1)),str(pk(t+q,1))]).filter(s=>s!=str(ans)),
  [`Hai phân thức có cùng mẫu ${D} nên ${op=='−'?'trừ':'cộng'} các tử thức, giữ nguyên mẫu.`,
   `Tử thức: (${str(N1)}) ${op} (${N2s}) = ${str(R2)}.`,`Phân tích tử: ${str(R2)} = ${px(-q)}${px(-t)}, rồi chia cả tử và mẫu cho ${D}: kết quả là ${str(ans)}.`],'',String),[q,t,u,sb]]}),
gn('pt2.cong_doi_dau',()=>{const c=nzc(5),a=nzc(4),b=nzc(6),d=nzc(4),e=nzc(6),sb=R(0,1),A1=sb?a+d:a-d,B1=sb?b+e:b-e;
 if(!A1&&!B1)throw 0;if(A1*c+B1==0)throw 0;
 const n=pk(B1,A1),D=pk(-c,1);
 const dn=d<0,dd=dn?-d:d,ee=dn?-e:e,op2=(sb?-1:1)*(dn?-1:1)>0?'+':'−';
 return[M(`Tính: ${fh(lin(a,b),sx(c))} ${op2} ${fh(lin(dd,ee),`${ng(c)} − x`)} (với điều kiện xác định). Kết quả là`,FR(n,D),near(n,D),
  [`Hai mẫu ${sx(c)} và ${ng(c)} − x là hai biểu thức đối nhau: ${ng(c)} − x = −(${sx(c)}).`,
   op2=='−'?`Phép trừ cho phân thức có mẫu ${ng(c)} − x chính là phép cộng phân thức có mẫu ${sx(c)}: ${fh(lin(a,b),sx(c))} + ${fh(lin(dd,ee),sx(c))}.`:`Đổi dấu mẫu của phân thức thứ hai: ${fh(lin(dd,ee),`${ng(c)} − x`)} = ${fh(lin(-dd,-ee),sx(c))}.`,
   `Cộng hai tử thức, giữ mẫu ${sx(c)}: (${lin(a,b)}) + (${op2=='−'?lin(dd,ee):lin(-dd,-ee)}) = ${str(n)}.`],'',String),[c,a,b,d,e,sb]]}),
gn('pt2.cong_khac_mau',()=>{const p=R(1,5),q=R(1,5),a=nzc(5),b=nzc(5),s=P([1,-1]);if(a+b==0)throw 0;
 const num=pk(p*b-s*q*a,p+s*q);if(!num.length)throw 0;
 const den=px(a)+px(-b),cand=uq([fh(str(pk(p*b+s*q*a,p+s*q)),den),
  fh(str(pk(p*a+s*q*b,p+s*q)),den),fh(str(pk(p*b-s*q*a,p-s*q)),den),fh(`${p+s*q}`,lin(2,b-a)),fh(str(pk(p*b+s*q*a,p-s*q)),den),fh(str(pk(-(p*b-s*q*a),p+s*q)),den)]);
 const ans=fh(str(num),den);
 return[M(`Tính: ${fh(p,sx(a))} ${s>0?'+':'−'} ${fh(q,lin(1,b))} (với điều kiện xác định). Kết quả là`,ans,cand.filter(v=>v!=ans),
  [`Mẫu thức chung là ${den}.`,`Quy đồng: ${fh(p,sx(a))} = ${fh(`${c1(p)}(${lin(1,b)})`,den)} và ${fh(q,lin(1,b))} = ${fh(`${c1(q)}(${sx(a)})`,den)}.`,
   `Tử thức: ${c1(p)}(${lin(1,b)}) ${s>0?'+':'−'} ${c1(q)}(${sx(a)}) = ${str(num)}.`,`Kết quả: ${ans} (tử và mẫu không còn nhân tử chung).`],'',String),[p,q,a,b,s]]}),
gn('pt2.cong_mau_binh',()=>{const A=R(1,4),a=R(1,6),t=R(0,1),
 ans=fh(`${A}`,t?lin(1,a):sx(a));
 return[M(`Tính: ${t?fh(A,sx(a)):fh(A,lin(1,a))} ${t?'−':'+'} ${fh(2*a*A,str(X2(a)))} (với điều kiện xác định). Kết quả rút gọn là`,ans,
  [fh(`${A}`,t?sx(a):lin(1,a)),fh(`${2*A}`,t?lin(1,a):sx(a)),fh(`${A}`,str(X2(a))),fh(`${A*a}`,t?lin(1,a):sx(a)),fh(`${A+2*a*A}`,str(X2(a)))].filter(v=>v!=ans),
  [`Ta có ${str(X2(a))} = ${px(a)}${px(-a)}, nên mẫu thức chung là ${str(X2(a))}.`,
   `Quy đồng: ${t?fh(A,sx(a)):fh(A,lin(1,a))} = ${fh(`${c1(A)}${t?px(-a):px(a)}`,str(X2(a)))}.`,
   `Tử thức: ${c1(A)}${t?px(-a):px(a)} ${t?'−':'+'} ${2*a*A} = ${str(mul([[A,0,0]],t?pk(-a,1):pk(a,1)))}${A>1?` = ${A}${t?px(a):px(-a)}`:''}.`,`Chia cả tử và mẫu cho nhân tử chung ${t?px(a):px(-a)} ta được ${ans}.`],'',String),[A,a,t]]}),
gn('pt2.nhan',()=>{const t=R(0,1);
 if(t==0){const a=R(1,6);let b=R(1,6);if(a==b)throw 0;
  const an=pk(b,1),ad=pk(-a,1);
  return[M(`Tính: ${fh(lin(1,a),lin(1,-b))} · ${fh(str(X2(b)),str(X2(a)))} (với điều kiện xác định). Kết quả là`,FR(an,ad),near(an,ad),
   [`Nhân tử với tử, mẫu với mẫu rồi phân tích thành nhân tử: ${str(X2(b))} = ${px(b)}${px(-b)} và ${str(X2(a))} = ${px(a)}${px(-a)}.`,
    `Phân thức tích là ${fh(`${px(-a)}${px(b)}${px(-b)}`,`${px(b)}${px(a)}${px(-a)}`)}.`,`Chia cả tử và mẫu cho nhân tử chung ${px(-a)}${px(b)}: được ${FR(an,ad)}.`],'',String),[0,a,b]]}
 const a=R(1,6),m=R(1,6),n=R(2,6);if(gcd(m,n)!=1)throw 0;
 const ans=fh(`${c1(m)}x(x − ${a})`,n);
 return[M(`Tính: ${fh(str(X2(a)),`${n}x`)} · ${fh(`${c1(m)}x^2`,lin(1,a))} (với điều kiện xác định). Kết quả là`,ans,
  [fh(`${c1(m)}x(x + ${a})`,n),fh(`${c1(m)}(x − ${a})`,n),fh(`${c1(m)}x^2(x − ${a})`,n),fh(`${n}x(x − ${a})`,m),fh(`x(x − ${a})`,n)].filter(v=>v!=ans),
  [`Phân tích: ${str(X2(a))} = ${px(a)}${px(-a)}.`,`Nhân tử với tử, mẫu với mẫu: ${fh(`${px(a)}${px(-a)}·${c1(m)}x^2`,`${n}x·${px(-a)}`)}.`,`Chia cả tử và mẫu cho nhân tử chung x${px(-a)}: được ${ans}.`],'',String),[1,a,m,n]]}),
gn('pt2.chia',()=>{const a=R(1,6),m=R(1,6),n=R(1,6);if(gcd(m,n)!=1)throw 0;
 const den=`${c1(n)}x${px(-a)}`,ans=fh(`${m}`,den);
 return[M(`Tính: ${fh(`${c1(m)}x`,str(X2(a)))} : ${fh(`${c1(n)}x^2`,sx(a))} (với điều kiện xác định). Kết quả là`,ans,
  [fh(`${m}`,`${c1(n)}x${px(a)}`),fh(`${c1(n)}x${px(-a)}`,`${m}`),fh(`${c1(m)}x`,den),fh(`${m}`,`${c1(n)}x^2${px(-a)}`),fh(`${m}`,`${c1(n)}${px(-a)}`)].filter(v=>v!=ans),
  [`Chia cho một phân thức là nhân với phân thức nghịch đảo: ${fh(`${c1(m)}x`,str(X2(a)))} · ${fh(sx(a),`${c1(n)}x^2`)}.`,
   `Phân tích ${str(X2(a))} = ${px(a)}${px(-a)} rồi nhân: ${fh(`${c1(m)}x${px(a)}`,`${c1(n)}x^2${px(a)}${px(-a)}`)}.`,`Chia cả tử và mẫu cho x${px(a)}: được ${ans}.`],'',String),[m,n,a]]}),
gn('pt2.nghich_dao',()=>{const t=R(0,1),n=pk(nzc(5),nzc(3)),d=R(0,1)?pk(nzc(5),nzc(3)):pk(nzc(5),nzc(3),nzc(2));
 const ans=t?FR(neg(n),d):FR(d,n),ws=t?near(neg(n),d):near(d,n);if(ws.length<3)throw 0;
 return[M(t?`Phân thức đối của phân thức ${FR(n,d)} là`:`Phân thức nghịch đảo của phân thức ${FR(n,d)} (tử thức khác 0) là`,ans,ws,
  t?[`Phân thức đối của ${fh('A','B')} là ${fh('−A','B')} (đổi dấu tử, giữ nguyên mẫu).`,`Với tử A = ${str(n)}, đổi dấu cả đa thức: −A = ${str(neg(n))}.`,`Phân thức đối là ${ans}.`]:
  [`Phân thức nghịch đảo của ${fh('A','B')} là ${fh('B','A')} (đảo tử và mẫu, với A khác 0).`,`Ở đây A = ${str(n)}, B = ${str(d)}.`,`Phân thức nghịch đảo là ${ans}.`],'',String),[t]]}),
gn('pt2.bt_thoi_gian',()=>{const t=R(0,3);
 if(t==0&&R(0,1)){const S=P([2,3,4,5,6,8,10,12]);
  return[M(`Một vòi nước chảy riêng một mình thì đầy bể sau x giờ. Biểu thức biểu thị phần bể mà vòi chảy được trong ${S} giờ là`,fh(S,'x'),[fh('x',S),`${S}x`,fh(`${S} + x`,S),fh(`${S}`,`x − ${S}`)],
   [`Mỗi giờ vòi chảy được ${fh(1,'x')} bể (vì x giờ đầy 1 bể).`,`Trong ${S} giờ vòi chảy được ${S} · ${fh(1,'x')} = ${fh(S,'x')} bể.`],'',String),[0,S,1]]}
 if(t==0){const S=P([60,90,120,150,180,240,300]);
  return[M(`Một ô tô chạy với vận tốc trung bình x (km/h). Biểu thức biểu thị thời gian (giờ) ô tô đi hết quãng đường ${S} km là`,fh(S,'x'),[fh('x',S),fh(`${S}x`,'1'),fh(`${S} + x`,'2'),fh(`${S}`,`${S} + x`)],
   [`Thời gian = quãng đường : vận tốc.`,`Quãng đường là ${S} km, vận tốc là x km/h nên thời gian là ${S} : x giờ.`],'',String),[0,S,0]]}
 if(t==1){const [S,v]=P([[120,60],[150,60],[180,40],[90,60],[240,80],[100,40],[270,60],[210,60]]);
  return[Iq(`Một ô tô đi quãng đường ${S} km với vận tốc trung bình v (km/h). Thời gian đi là ${fh(S,'v')} giờ. Với v = ${v} thì ô tô đi hết quãng đường trong bao nhiêu giờ?`,S/v,
   [`Thay v = ${v} vào biểu thức thời gian: ${S} : ${v}.`,`${S} : ${v} = ${fd(S/v)} (giờ).`]),[1,S,v]]}
 const c=R(2,5),d1=R(10,30),d2=t==2?d1:d1+R(2,12),x2=X2(c),
 num=pk(c*(d2-d1),d1+d2),ans=fh(str(num),str(x2));
 const wr=[fh(str(pk(c*(d1-d2),d1+d2)),str(x2)),fh(str(pk(c*(d2-d1),d1+d2)),lin(2,0)),fh(str(pk(d1+d2)),str(x2)),fh(str(num),str(pk(c*c,0,1))),fh(str(pk(c*(d2+d1),d1+d2)),str(x2)),fh(str(pk(0,d1+d2)),`2x`)].filter(v=>v!=ans);
 return[M(`Một ca nô có vận tốc riêng x (km/h) (với x lớn hơn ${c}), vận tốc dòng nước là ${c} km/h. Ca nô đi xuôi dòng ${d1} km, sau đó đi ngược dòng ${d2} km. Biểu thức biểu thị tổng thời gian chuyển động (giờ) là`,ans,wr,
  [`Vận tốc xuôi dòng là x + ${c} (km/h), vận tốc ngược dòng là x − ${c} (km/h).`,`Thời gian xuôi dòng: ${fh(d1,lin(1,c))} giờ; thời gian ngược dòng: ${fh(d2,sx(c))} giờ.`,
   `Quy đồng với mẫu chung ${str(x2)}: tử thức = ${d1}(${sx(c)}) + ${d2}(${lin(1,c)}) = ${str(num)}.`,`Tổng thời gian là ${ans} (giờ).`],'',String),[t,c,d1,d2]]}));

/* ================= NÂNG CAO ================= */
addH('l8pt',
gn('pt2.bt_hang',()=>{const a=R(1,5),m=R(1,4),k=R(2,8),dv=R(0,1),v=2*a*m;
 const body=`(${fh(m,sx(a))} − ${fh(m,lin(1,a))})`,
 sec=dv?fh(k,str(X2(a))):fh(str(X2(a)),k);
 return[Iq(`Biểu thức P = ${body} ${dv?':':'·'} ${sec} có giá trị không đổi (với x ≠ ±${a}). Tìm giá trị đó. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(v,k),
  [`Quy đồng trong ngoặc, mẫu chung ${str(X2(a))}: ${fh(m,sx(a))} − ${fh(m,lin(1,a))} = ${fh(`${c1(m)}(${lin(1,a)}) − ${c1(m)}(${sx(a)})`,str(X2(a)))} = ${fh(v,str(X2(a)))}.`,
   dv?`Chia cho một phân thức là nhân với phân thức nghịch đảo: ${fh(v,str(X2(a)))} · ${fh(str(X2(a)),k)}.`:`Nhân hai phân thức: ${fh(v,str(X2(a)))} · ${fh(str(X2(a)),k)}.`,
   `Rút gọn ${str(X2(a))} ở tử và mẫu: P = ${val(v,k)}.`]),[a,m,k,dv]]}),
gn('pt2.nguyen_dem2',()=>{const p=R(2,5),a=nzc(5),q=nzc(9),N=p*a+q,t=R(0,2);if(N==0||Math.abs(N)>60||Math.abs(N)<4)throw 0;
 const A=Math.abs(N),tau=ords(A),n=2*tau,ask=t==0?`Có bao nhiêu số nguyên x để phân thức ${fh(lin(p,q),sx(a))} nhận giá trị là số nguyên?`:t==1?`Tìm giá trị nguyên lớn nhất của x để phân thức ${fh(lin(p,q),sx(a))} nhận giá trị là số nguyên.`:`Tìm giá trị nguyên nhỏ nhất của x để phân thức ${fh(lin(p,q),sx(a))} nhận giá trị là số nguyên.`;
 return[Iq(ask,t==0?n:t==1?a+A:a-A,
  [`Chia tử cho mẫu: ${fh(lin(p,q),sx(a))} = ${p} ${N<0?'−':'+'} ${fh(String(ab(N)),sx(a))}. Phân thức nguyên khi ${fh(ng(N),sx(a))} nguyên, tức ${sx(a)} là ước nguyên của ${ng(N)}.`,
   `Các ước nguyên của ${ng(N)}: ${A} có ${tau} ước dương nên có ${n} ước nguyên (cả dương và âm). Ước lớn nhất là ${A}, nhỏ nhất là −${A}.`,
   t==0?`Mỗi ước cho đúng một giá trị x = ${ng(a)} + ước, nên có ${n} giá trị nguyên của x.`:t==1?`x lớn nhất khi ${sx(a)} = ${A}, tức x = ${ng(a)} + ${A} = ${ng(a+A)}.`:`x nhỏ nhất khi ${sx(a)} = −${A}, tức x = ${ng(a)} − ${A} = ${ng(a-A)}.`]),[p,a,q,t]]}),
gn('pt2.cong_3',()=>{const a=R(1,5),p=R(1,5),q=R(1,5),r=R(1,6),s2=P([1,-1]),s3=P([1,-1]);
 const num=pk(a*(p-s2*q)+s3*r,p+s2*q);if(!num.length||2*p*a+s3*r==0||-2*s2*q*a+s3*r==0)throw 0;
 const D=X2(a),ans=FR(num,D);
 return[M(`Tính: ${fh(p,sx(a))} ${s2>0?'+':'−'} ${fh(q,lin(1,a))} ${s3>0?'+':'−'} ${fh(r,str(D))} (với điều kiện xác định). Kết quả là`,ans,near(num,D),
  [`Ta có ${str(D)} = ${px(a)}${px(-a)} nên mẫu thức chung là ${str(D)}.`,
   `Quy đồng: tử thức = ${c1(p)}(${lin(1,a)}) ${s2>0?'+':'−'} ${c1(q)}(${sx(a)}) ${s3>0?'+':'−'} ${r}.`,
   `Khai triển và gộp: ${str(pk(p*a,p))} ${s2>0?'+':'−'} (${str(pk(-q*a,q))}) ${s3>0?'+':'−'} ${r} = ${str(num)}.`,`Kết quả: ${ans}.`],'',String),[a,p,q,r,s2,s3]]}),
gn('pt2.chia_hai_bien',()=>{const a=R(2,9),b=R(1,9);if(gcd(a,b)!=1)throw 0;
 const ans=fh(`${c1(b)}x(x − y)`,a),den=`${c1(b)}x^2y`;
 return[M(`Tính: ${fh('x^2 − y^2',`${a}xy`)} : ${fh('x + y',den)} (với điều kiện xác định). Kết quả là`,ans,
  [fh(`${c1(b)}x(x + y)`,a),fh('(x − y)(x + y)^2',`${a*b}x^3y^2`),fh(`${c1(b)}xy(x − y)`,a),fh(`${a}`,`${c1(b)}x(x − y)`),fh(`${c1(b)}x(x − y)`,`${a}x`)].filter(v=>v!=ans),
  [`Chia cho một phân thức là nhân với phân thức nghịch đảo: ${fh('x^2 − y^2',`${a}xy`)} · ${fh(den,'x + y')}.`,
   `Phân tích x^2 − y^2 = (x − y)(x + y), rồi nhân: ${fh(`(x − y)(x + y)·${den}`,`${a}xy(x + y)`)}.`,`Chia cả tử và mẫu cho xy(x + y): ${ans}.`],'',String),[a,b]]}));
})();
