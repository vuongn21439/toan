/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì I (KNTT)" — Chương I: phương trình và hệ phương trình bậc nhất hai ẩn (v15)
   Chủ đề l9hpt (mã hp2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles9b.js */
(()=>{const {add,addH,gn,M,Iq,fh,fq,fr,fd,lin,cf,ng,PL}=G8H,{rat,F,xp,tm,sg,nzc,ab}=G9X,
E=(a,b,c)=>`${PL.str([[a,1,0],[b,0,1]])} = ${ng(c)}`,        /* ax + by = c */
SYS=(e1,e2)=>`{ ${e1} ; ${e2} }`,
cm=(c,a)=>`${ng(c)} ${a>0?'−':'+'} ${ab(a)==1?'':ab(a)}x`;     /* c − ax */

/* ================= CƠ BẢN ================= */
add('l9hpt',
gn('hp2.la_pt',()=>{const a=R(2,9),b=R(2,9),c=R(1,12),t=R(0,1),
 OK=[[`${a}x + ${b}y = ${c}`,'có dạng ax + by = c với a, b khác 0'],[`${a}x − ${b}y = ${c}`,'có dạng ax + by = c với b âm'],[`${a}x = ${c}`,'có dạng ax + by = c với b = 0 và a khác 0'],[`y = ${a}x + ${b}`,'viết lại thành −ax + y = b, đúng dạng ax + by = c'],[`${a}x + ${b}y = 0`,'có dạng ax + by = c với c = 0']],
 NO=[[`${a}x^2 + ${b}y = ${c}`,'ẩn x có số mũ 2'],[`0x + 0y = ${c}`,'cả hai hệ số a, b đều bằng 0'],[`${fh(a,'x')} + ${b}y = ${c}`,'ẩn x nằm ở mẫu'],[`x + y^2 = ${c}`,'ẩn y có số mũ 2'],[`xy + x = ${c}`,'có tích hai ẩn xy']],
 ok=sh(OK),no=sh(NO),ans=t?ok[0]:no[0],ws=t?no.slice(0,3):ok.slice(0,3);
 return[M(`Phương trình nào sau đây ${t?'là':'KHÔNG phải là'} phương trình bậc nhất hai ẩn?`,ans[0],ws.map(w=>w[0]),
  [`Phương trình bậc nhất hai ẩn có dạng ax + by = c, trong đó a, b không đồng thời bằng 0; hai ẩn chỉ có số mũ 1, không nằm ở mẫu và không nhân với nhau.`,
   `Xét từng phương trình: ${sh([ans,...ws]).map(([e,r])=>`${e} (${r})`).join('; ')}.`],'',String),[t]]}),

gn('hp2.nghiem_tq',()=>{const a=nzc(5),c=nzc(9),b=P([1,-1]),s=-a*b,k=c*b,f=(u,v)=>`(x; ${lin(u,v)}) với x ∈ ℝ`;
 return[M(`Nghiệm tổng quát của phương trình ${E(a,b,c)} là`,f(s,k),[f(-s,k),f(s,-k),f(-s,-k)],
  [`Coi x là số tùy ý, chuyển vế để rút y theo x từ phương trình ${E(a,b,c)}: ${cf(b)}y = ${lin(-a,c)}.`,
   b==1?`Hệ số của y bằng 1 nên y = ${lin(s,k)}.`:`Nhân hai vế với −1 được y = ${lin(s,k)}.`,
   `Phương trình có vô số nghiệm, nghiệm tổng quát là (x; ${lin(s,k)}) với x ∈ ℝ.`],'',String),[a,b,c]]}),

gn('hp2.truc',()=>{const a=nzc(5),b=nzc(5),k=nzc(4),c=a*b*k,u=b*k,v=a*k,pts=(p,q)=>`(${ng(p)}; 0) và (0; ${ng(q)})`;
 return[M(`Đường thẳng d: ${E(a,b,c)} cắt trục hoành Ox và trục tung Oy lần lượt tại hai điểm`,pts(u,v),[pts(v,u),pts(-u,-v),pts(u,-v),pts(-u,v),pts(a,b)],
  [`Giao với trục hoành Ox: y = 0, phương trình trở thành ${cf(a)}x = ${ng(c)}, suy ra x = ${ng(u)}. Giao điểm là (${ng(u)}; 0).`,
   `Giao với trục tung Oy: x = 0, phương trình trở thành ${cf(b)}y = ${ng(c)}, suy ra y = ${ng(v)}. Giao điểm là (0; ${ng(v)}).`],'Ox: cho y = 0; Oy: cho x = 0.',String),[a,b,c]]}),

gn('hp2.the_y',()=>{const a=nzc(6),b=R(2,5),c=nzc(9),
 f=n=>`y = ${fh(n,b)}`,ans=f(cm(c,a));
 return[M(`Từ phương trình ${E(a,b,c)}, biểu thị y theo x ta được`,ans,[f(cm(c,-a)),f(lin(a,-c)),`y = ${b}(${cm(c,a)})`,`y = ${fh(cm(c,a),ab(a)==1?b+1:ab(a))}`],
  [`Chuyển hạng tử chứa x sang vế phải: ${b}y = ${cm(c,a)}.`,`Chia hai vế cho ${b}: ${ans}.`],'',String),[a,b,c]]}),

gn('hp2.tim_m',()=>{const a=nzc(5),m=nzc(5),x0=nzc(5),y0=nzc(5),c=a*x0+m*y0;
 return[Iq(`Biết cặp số (${ng(x0)}; ${ng(y0)}) là một nghiệm của phương trình ${cf(a)}x + my = ${ng(c)} (m là tham số). Tìm m.`,m,
  [`Thay x = ${ng(x0)}, y = ${ng(y0)} vào phương trình: ${ng(a)}·${pa(x0)} + m·${pa(y0)} = ${ng(c)}.`,
   `Tính: ${ng(a*x0)} ${sg(y0)} ${ab(y0)==1?'':ab(y0)}m = ${ng(c)}, tức ${cf(y0)}m = ${ng(c-a*x0)}.`,
   `Suy ra m = ${ng(m)}.`],'',`m = ${ng(m)}`),[a,c,x0,y0]]}),

gn('hp2.rut_gon',()=>{const a=P([2,3,4,-2,-3]),b=nzc(4),d=nzc(4),e=P([2,3,-2,-3]),p=nzc(4),q=nzc(4),x0=nzc(5),y0=nzc(5);
 if(a*e-b*d==0)throw 0;
 const c1=a*(x0+p)+b*y0,c2=d*x0+e*(y0+q),r1=c1-a*p,r2=c2-e*q,D=a*e-b*d,Dx=e*r1-b*r2,
 e1=`${ng(a)}(${xp(p)})${tm(b,'y')} = ${ng(c1)}`,e2=`${cf(d)}x ${sg(e)} ${ab(e)}(${xp(q,'y')}) = ${ng(c2)}`,ask=P(['x + y','x − y','2x + y']),v=ask=='x + y'?x0+y0:ask=='x − y'?x0-y0:2*x0+y0;
 return[Iq(`Giải hệ phương trình ${SYS(e1,e2)}. Tính ${ask}.`,v,
  [`Khai triển và thu gọn: ${SYS(E(a,b,r1),E(d,e,r2))}.`,
   `Khử y: nhân phương trình thứ nhất với ${ng(e)}, phương trình thứ hai với ${ng(b)} rồi trừ vế theo vế: ${ng(D)}x = ${ng(Dx)}, suy ra x = ${ng(x0)}.`,
   `Thay x = ${ng(x0)} vào phương trình thứ nhất: ${cf(b)}y = ${ng(r1-a*x0)}, suy ra y = ${ng(y0)}.`,
   `Vậy ${ask} = ${ask=='x + y'?`${ng(x0)} + ${pa(y0)}`:ask=='x − y'?`${ng(x0)} − ${pa(y0)}`:`2·${pa(x0)} + ${pa(y0)}`} = ${ng(v)}.`],'',`${ask} = ${ng(v)}`),[a,b,d,e,p,q]]}),

gn('hp2.tuoi',()=>{const t=R(0,1),ask=R(0,1);let q,x,y,st;
 if(t==0){const k=R(3,5),c=R(8,16),n=R(2,8),S=(k+1)*c+2*n;x=k*c;y=c;
  q=`Hiện nay tuổi của cha gấp ${k} lần tuổi của con. ${n} năm nữa thì tổng số tuổi của hai cha con là ${S} tuổi. Hỏi hiện nay ${ask?'con':'cha'} bao nhiêu tuổi?`;
  st=[`Gọi x, y lần lượt là tuổi cha và tuổi con hiện nay (x, y nguyên dương). Theo đề: x = ${k}y.`,
   `${n} năm nữa tuổi cha là x + ${n}, tuổi con là y + ${n}, nên (x + ${n}) + (y + ${n}) = ${S}, tức x + y = ${S-2*n}.`,
   `Thế x = ${k}y vào: ${k}y + y = ${S-2*n}, suy ra ${k+1}y = ${S-2*n}, y = ${y}. Do đó x = ${k}·${y} = ${x}.`]}
 else{const m=R(3,6),n=R(2,7),c=R(n+3,n+16),f=n+m*(c-n),S=f+c;x=f;y=c;
  q=`Hiện nay tổng số tuổi của cha và con là ${S} tuổi. ${n} năm trước, tuổi cha gấp ${m} lần tuổi con. Hỏi hiện nay ${ask?'con':'cha'} bao nhiêu tuổi?`;
  st=[`Gọi x, y lần lượt là tuổi cha và tuổi con hiện nay. Ta có x + y = ${S}.`,
   `${n} năm trước tuổi cha là x − ${n}, tuổi con là y − ${n}, nên x − ${n} = ${m}(y − ${n}), tức x − ${m}y = ${ng(n-m*n)}.`,
   `Từ x = ${S} − y thế vào: ${S} − y − ${m}y = ${ng(n-m*n)}, suy ra ${m+1}y = ${S-n+m*n}, y = ${y}. Do đó x = ${S} − ${y} = ${x}.`]}
 return[Iq(q,ask?y:x,st,'',`${ask?'con':'cha'} ${ask?y:x} tuổi`),[t]]}),

gn('hp2.kinh_te',()=>{const x=R(1,9)*100,y=R(1,9)*100,[p1,p2]=sh([5,8,10]).slice(0,2),S=x+y,Z=((100+p1)*x+(100+p2)*y)/100,ask=R(0,1),
 d=p2-p1,yy=(100*Z-(100+p1)*S)/d;
 return[Iq(`Một người mua hai loại hàng. Tổng số tiền chưa tính thuế VAT của hai loại là ${S} nghìn đồng. Thuế VAT của loại thứ nhất là ${p1}%, của loại thứ hai là ${p2}%. Tổng số tiền phải trả (đã tính VAT) là ${Z} nghìn đồng. Hỏi số tiền chưa tính thuế VAT của loại hàng thứ ${ask?'hai':'nhất'} là bao nhiêu nghìn đồng?`,ask?y:x,
  [`Gọi x, y (nghìn đồng) là số tiền chưa tính thuế của loại thứ nhất và loại thứ hai. Ta có x + y = ${S} (1).`,
   `Sau khi cộng thuế: ${fd((100+p1)/100)}x + ${fd((100+p2)/100)}y = ${Z}. Nhân hai vế với 100: ${100+p1}x + ${100+p2}y = ${100*Z} (2).`,
   `Lấy (2) trừ (1) nhân ${100+p1}: ${cf(p2-p1)}y = ${ng(100*Z-(100+p1)*S)}, suy ra y = ${y}; từ (1) có x = ${S} − ${y} = ${x}.`],'',`${ask?y:x} nghìn đồng`),[p1,p2]]}));

/* ================= NÂNG CAO ================= */
addH('l9hpt',
gn('hp2.tim_mn',()=>{const t=R(0,1),m=nzc(5),n=nzc(5),x0=nzc(4),y0=nzc(4);let q,st,c1,c2;
 if(t==0){c1=m*x0+n*y0;c2=m*x0-n*y0;
  q=`Biết cặp số (${ng(x0)}; ${ng(y0)}) là nghiệm của hệ phương trình ${SYS(`mx + ny = ${ng(c1)}`,`mx − ny = ${ng(c2)}`)}. Tính m + n.`;
  st=[`Thay x = ${ng(x0)}, y = ${ng(y0)} vào hệ, ta được hệ ẩn m, n: ${SYS(`${PL.str([[x0,1,0],[y0,0,1]],'m','n')} = ${ng(c1)}`,`${PL.str([[x0,1,0],[-y0,0,1]],'m','n')} = ${ng(c2)}`)}.`,
   `Cộng hai phương trình: ${ng(2*x0)}m = ${ng(c1+c2)}, suy ra m = ${ng(m)}.`,
   `Trừ hai phương trình: ${ng(2*y0)}n = ${ng(c1-c2)}, suy ra n = ${ng(n)}. Vậy m + n = ${ng(m)} + ${pa(n)} = ${ng(m+n)}.`]}
 else{c1=m*x0+y0;c2=x0+n*y0;
  q=`Biết cặp số (${ng(x0)}; ${ng(y0)}) là nghiệm của hệ phương trình ${SYS(`mx + y = ${ng(c1)}`,`x + ny = ${ng(c2)}`)}. Tính m + n.`;
  st=[`Thay x = ${ng(x0)}, y = ${ng(y0)} vào phương trình thứ nhất: ${cf(x0)}m${tm(y0)} = ${ng(c1)}, suy ra ${cf(x0)}m = ${ng(c1-y0)}${x0==1?'':`, m = ${ng(m)}`}.`,
   `Thay vào phương trình thứ hai: ${ng(x0)}${tm(y0,'n')} = ${ng(c2)}, suy ra ${cf(y0)}n = ${ng(c2-x0)}${y0==1?'':`, n = ${ng(n)}`}.`,
   `Vậy m + n = ${ng(m)} + ${pa(n)} = ${ng(m+n)}.`]}
 return[Iq(q,m+n,st,'',`m + n = ${ng(m+n)}`),[t]]}),

gn('hp2.duy_nhat',()=>{const a=R(1,3),t=nzc(4),c=a*t,b=nzc(6),d=nzc(6),ans=`m ≠ ${ng(t)}`;
 return[M(`Tìm m để hệ phương trình ${SYS(E(1,a,b),`mx ${sg(c)} ${ab(c)==1?'':ab(c)}y = ${ng(d)}`)} có nghiệm duy nhất.`,ans,[`m = ${ng(t)}`,`m ≠ ${ng(-t)}`,`m = ${ng(-t)}`,`m ≠ ${ng(c)}`],
  [`Hệ ${SYS('a₁x + b₁y = c₁','a₂x + b₂y = c₂')} có nghiệm duy nhất khi a₁b₂ − a₂b₁ ≠ 0.`,
   `Ở đây a₁ = 1, b₁ = ${a}, a₂ = m, b₂ = ${ng(c)}, nên điều kiện là 1·${pa(c)} − ${a}m ≠ 0.`,
   `Suy ra ${a}m ≠ ${ng(c)}, tức ${ans}.`],'',String),[a,c]]}),

gn('hp2.an_phu',()=>{const X=[1,2,3,4,5,-1,-2,-3,-4],x0=P(X),y0=P(X),a=nzc(3),b=nzc(3),d=nzc(3),e=nzc(3);
 if(a*e+b*d==0)throw 0;
 const u=[1,x0],v=[1,y0],c=F.add(F.mul([a,1],u),F.mul([b,1],v)),f=F.sub(F.mul([d,1],u),F.mul([e,1],v)),
 cu=F.div(F.add(F.mul(c,[e,1]),F.mul(f,[b,1])),[a*e+b*d,1]),cv=F.div(F.sub(c,F.mul([a,1],cu)),[b,1]),ask=R(0,1),
 lhs1=`${fh(ng(a),'x')} ${sg(b)} ${fh(ab(b),'y')} = ${F.s(c)}`,lhs2=`${fh(ng(d),'x')} ${sg(-e)} ${fh(ab(e),'y')} = ${F.s(f)}`;
 return[Iq(`Giải hệ phương trình ${SYS(lhs1,lhs2)}. Tìm ${ask?'y':'x'}.`,ask?y0:x0,
  [`Điều kiện x ≠ 0, y ≠ 0. Đặt u = ${fh(1,'x')}, v = ${fh(1,'y')}, hệ trở thành ${SYS(`${PL.str([[a,1,0],[b,0,1]],'u','v')} = ${F.s(c)}`,`${PL.str([[d,1,0],[-e,0,1]],'u','v')} = ${F.s(f)}`)}.`,
   `Nhân phương trình thứ nhất với ${ng(e)}, phương trình thứ hai với ${ng(b)} rồi cộng vế theo vế: ${ng(a*e+b*d)}u = ${F.s(F.add(F.mul(c,[e,1]),F.mul(f,[b,1])))}, suy ra u = ${F.s(cu)}.`,
   `Thay vào phương trình thứ nhất tính được v = ${F.s(cv)}.`,
   `Vì u = ${fh(1,'x')} nên x = ${ng(x0)}; vì v = ${fh(1,'y')} nên y = ${ng(y0)}. Cả hai thỏa điều kiện.`],'',`${ask?'y':'x'} = ${ng(ask?y0:x0)}`),[a,b,d,e]]}),

gn('hp2.cong_viec',()=>{const PR=[[12,24],[10,15],[15,30],[20,30],[6,12],[30,60],[8,24],[10,40],[20,60],[6,3]],[x0,y0]=sh(P(PR)),T=x0*y0/(x0+y0),p=R(2,8),q=R(2,8);
 if(p==q||!Number.isInteger(T))throw 0;
 const c=F.add([p,x0],[q,y0]);if(c[0]>=c[1])throw 0;
 const iT=[1,T],u=F.div(F.sub(c,F.mul([q,1],iT)),[p-q,1]),v=F.sub(iT,u),ask=R(0,1);
 return[Iq(`Hai vòi nước cùng chảy vào một bể không có nước thì sau ${T} giờ đầy bể. Nếu vòi thứ nhất chảy ${p} giờ, sau đó vòi thứ hai chảy ${q} giờ thì được ${F.s(c)} bể. Hỏi nếu chảy một mình, vòi thứ ${ask?'hai':'nhất'} cần bao nhiêu giờ để đầy bể?`,ask?y0:x0,
  [`Gọi x, y (giờ) là thời gian vòi thứ nhất, vòi thứ hai chảy một mình đầy bể. Mỗi giờ hai vòi chảy được ${fh(1,'x')} và ${fh(1,'y')} bể. Đặt u = ${fh(1,'x')}, v = ${fh(1,'y')}.`,
   `Chảy chung ${T} giờ đầy bể nên u + v = ${F.s(iT)} (1). Vòi thứ nhất ${p} giờ, vòi thứ hai ${q} giờ được ${F.s(c)} bể nên ${p}u + ${q}v = ${F.s(c)} (2).`,
   `Lấy (2) trừ (1) nhân ${q}: ${cf(p-q)}u = ${F.s(c)} − ${F.s(F.mul([q,1],iT))} = ${F.s(F.sub(c,F.mul([q,1],iT)))}, suy ra u = ${F.s(u)}; từ (1) có v = ${F.s(v)}.`,
   `Do đó x = ${x0} giờ, y = ${y0} giờ.`],'',`${ask?y0:x0} giờ`),[T,p,q]]}),

gn('hp2.hoa_hoc',()=>{const p=P([5,10,15,20]),qq=P([30,40,50,60]),r=R(p+5,qq-5),k=P([5,10,20]),x=k*(qq-r),y=k*(r-p),Mm=k*(qq-p),ask=R(0,1);
 if(!(r>p&&r<qq))throw 0;
 return[Iq(`Trộn dung dịch axit nồng độ ${p}% với dung dịch axit cùng loại nồng độ ${qq}% để được ${Mm} gam dung dịch axit nồng độ ${r}%. Hỏi cần dùng bao nhiêu gam dung dịch nồng độ ${ask?qq:p}%?`,ask?y:x,
  [`Gọi x, y (gam) là khối lượng dung dịch nồng độ ${p}% và ${qq}%. Khối lượng dung dịch sau khi trộn: x + y = ${Mm} (1).`,
   `Lượng axit nguyên chất được bảo toàn: ${p}%·x + ${qq}%·y = ${r}%·${Mm}. Nhân hai vế với 100: ${p}x + ${qq}y = ${r*Mm} (2).`,
   `Lấy (2) trừ (1) nhân ${p}: ${qq-p}y = ${r*Mm-p*Mm}, suy ra y = ${y}; từ (1) có x = ${Mm} − ${y} = ${x}.`],'',`${ask?y:x} gam`),[p,qq,r]]}),

gn('hp2.hcn_dtich',()=>{const a=R(3,6),b=R(1,a-1),t=R(5,9),x=a*(t-1),y=b*t,P2=2*(x+y);
 if(x<=y)throw 0;
 return[Iq(`Một mảnh vườn hình chữ nhật có chu vi ${P2} m. Nếu tăng chiều dài thêm ${a} m và giảm chiều rộng đi ${b} m thì diện tích mảnh vườn không đổi. Tính chiều dài ban đầu (m).`,x,
  [`Gọi x, y (m) là chiều dài và chiều rộng ban đầu (x > y > 0). Nửa chu vi: x + y = ${x+y} (1).`,
   `Diện tích không đổi: (x + ${a})(y − ${b}) = xy. Khai triển: xy − ${b}x + ${a}y − ${a*b} = xy, tức −${b}x + ${a}y = ${a*b} (2).`,
   `Từ (1) có y = ${x+y} − x. Thế vào (2): −${b}x + ${a}(${x+y} − x) = ${a*b}, suy ra −${a+b}x = ${ng(a*b-a*(x+y))}, x = ${x}.`],'',`${x} m`),[a,b,P2]]}),

gn('hp2.dong_nuoc',()=>{const v=R(12,30),w=R(2,5),t1=R(2,4),t2=R(2,5),A=v+w,B=v-w,ask=R(0,1);
 return[Iq(`Một ca nô đi xuôi dòng ${A*t1} km hết ${t1} giờ và đi ngược dòng ${B*t2} km hết ${t2} giờ. Tính vận tốc ${ask?'của ca nô khi nước yên lặng':'của dòng nước'} (km/h).`,ask?v:w,
  [`Gọi v là vận tốc ca nô khi nước yên lặng, w là vận tốc dòng nước (km/h, v > w > 0). Vận tốc xuôi dòng là v + w, ngược dòng là v − w.`,
   `Xuôi dòng: v + w = ${A*t1} : ${t1} = ${A}. Ngược dòng: v − w = ${B*t2} : ${t2} = ${B}.`,
   `Cộng hai vế: 2v = ${A+B}, suy ra v = ${v}. Trừ hai vế: 2w = ${A-B}, suy ra w = ${w}.`],'',`${ask?v:w} km/h`),[t1,t2]]}));
})();
