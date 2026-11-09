/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 2" — Chương VII: Hàm số bậc nhất (bài 27–29)
   Chủ đề l8hs (mã hsn.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Hình mặt phẳng tọa độ: 18 px / đơn vị, gốc O tại (120; 75); đường thẳng là <path class="ln"> để oracle đọc lại.
   Kiểm chứng: kiem-chung/lop8-9/oracles8c.js */
(()=>{const {add,addH,gn,M,Iq,fq,fr,fd,lin,ng,cf,PL,tx,dot,sv,fg}=G8H,{norm,str}=PL,{nzc,pk,sg,uq,val,subs}=G8X,ab=Math.abs,
U=18,OX=120,OY=75,PX=x=>+(OX+x*U).toFixed(2),PY=y=>+(OY-y*U).toFixed(2),
/* hệ trục tọa độ + đường thẳng y = ax + b (cắt vùng nhìn thấy) + hai điểm nguyên (0; b), (1; a + b) */
plane=(a,b)=>{let s=`<path d="M6 ${OY}H234M${OX} 6V144" style="stroke:#8892b0;stroke-width:1.5"/>`;
 for(let i=-6;i<=6;i++)if(i)s+=`<path d="M${PX(i)} ${OY-3}V${OY+3}" style="stroke:#8892b0"/>${tx(PX(i),OY+14,ng(i),'middle',8)}`;
 for(let i=-4;i<=4;i++)if(i)s+=`<path d="M${OX-3} ${PY(i)}H${OX+3}" style="stroke:#8892b0"/>${tx(OX-7,PY(i)+3,ng(i),'end',8)}`;
 s+=tx(OX-7,OY-6,'O','end',10)+tx(230,OY-6,'x','middle',11)+tx(OX+9,14,'y','start',11);
 const xl=Math.max(-6.4,a>0?(-4.1-b)/a:(4.1-b)/a),xr=Math.min(6.4,a>0?(4.1-b)/a:(-4.1-b)/a);
 return sv(s+`<path class="ln" d="M${PX(xl)} ${PY(a*xl+b)}L${PX(xr)} ${PY(a*xr+b)}" style="stroke:#feca57;stroke-width:2.5"/>`+dot(PX(0),PY(b))+dot(PX(1),PY(a+b)))},
yl=(a,b)=>`y = ${lin(a,b)}`,
eq1=(c,r,x,v='x')=>c==1?`${v} = ${ng(r)}`:`${cf(c)}${v} = ${ng(r)}, ${v} = ${ng(x)}`,   /* giải ax = r (không lặp "x = 2, x = 2") */
pt=(x,y)=>`(${ng(x)}; ${ng(y)})`;

/* ================= CƠ BẢN ================= */
add('l8hs',
gn('hsn.gia_tri_ham',()=>{const t=R(0,1),A=nzc(4),B=nzc(5),C=nzc(6),F=t?pk(C,B,A):pk(C,B),k=R(0,2),u=nzc(3),v=nzc(3);if(u==v)throw 0;
 const f=x=>PL.ev(F,x),ex=str(F),
 w=k==0?{q:`f(${ng(u)})`,val:f(u),st:[`Thay x = ${ng(u)} vào biểu thức: f(${ng(u)}) = ${subs(F,u)}.`,`Tính được f(${ng(u)}) = ${ng(f(u))}.`]}:
  k==1?{q:`f(${ng(u)}) + f(${ng(v)})`,val:f(u)+f(v),st:[`f(${ng(u)}) = ${subs(F,u)} = ${ng(f(u))}.`,`f(${ng(v)}) = ${subs(F,v)} = ${ng(f(v))}.`,`f(${ng(u)}) + f(${ng(v)}) = ${ng(f(u))} + ${f(v)<0?`(${ng(f(v))})`:f(v)} = ${ng(f(u)+f(v))}.`]}:
  {q:`f(${ng(u)}) − f(${ng(v)})`,val:f(u)-f(v),st:[`f(${ng(u)}) = ${subs(F,u)} = ${ng(f(u))}.`,`f(${ng(v)}) = ${subs(F,v)} = ${ng(f(v))}.`,`f(${ng(u)}) − f(${ng(v)}) = ${ng(f(u))} − ${f(v)<0?`(${ng(f(v))})`:f(v)} = ${ng(f(u)-f(v))}.`]};
 if(Math.abs(w.val)>200)throw 0;
 return[Iq(`Cho hàm số y = f(x) = ${ex}. Tính ${w.q}.`,w.val,w.st),[t,k,u,v]]}),
gn('hsn.bang_hs',()=>{const fn=R(0,1),xs=sh([1,2,3,4,5,6]).slice(0,4).sort((p,q)=>p-q);let pairs;
 if(fn){const rp=R(0,1);pairs=xs.map(x=>[x,R(1,9)]);if(rp)pairs[1][1]=pairs[0][1]}
 else{const i=R(0,2),y2=R(1,9);pairs=xs.map(x=>[x,R(1,9)]);pairs.splice(i+1,0,[pairs[i][0],pairs[i][1]+R(1,4)]);pairs.pop()}
 const ok='Có, vì mỗi giá trị của x chỉ ứng với một giá trị của y',no='Không, vì có một giá trị của x ứng với hai giá trị khác nhau của y',
 w3='Không, vì có hai giá trị khác nhau của x ứng với cùng một giá trị của y',w4='Có, vì giá trị của y luôn tăng khi x tăng',
 rep=pairs.map(p=>p[0]).find((v,i,a)=>a.indexOf(v)!=i);
 return[M(`Cho hai đại lượng x và y có các giá trị tương ứng: ${pairs.map(p=>pt(p[0],p[1])).join(', ')}. Đại lượng y có phải là hàm số của đại lượng x không?`,fn?ok:no,[fn?no:ok,w3,w4],
  [`Đại lượng y là hàm số của x nếu mỗi giá trị của x chỉ xác định đúng một giá trị của y.`,
   fn?`Các giá trị của x là ${pairs.map(p=>p[0]).join('; ')}, đều khác nhau nên mỗi giá trị x chỉ ứng với một giá trị y.`:`Giá trị x = ${rep} xuất hiện ở hai cặp với hai giá trị y khác nhau (${pairs.filter(p=>p[0]==rep).map(p=>p[1]).join(' và ')}).`,
   fn?`Vậy y là hàm số của x. (Hai giá trị khác nhau của x có thể cho cùng một giá trị của y mà vẫn là hàm số.)`:`Vậy y không phải là hàm số của x.`],'',String),[fn]]}),
gn('hsn.doi_xung',()=>{const a=nzc(6),b=nzc(6),t=R(0,2),nm=['trục hoành Ox','trục tung Oy','gốc tọa độ O'][t],r=[pt(a,-b),pt(-a,b),pt(-a,-b)][t];
 return[M(`Điểm A${pt(a,b)}. Điểm đối xứng với A qua ${nm} có tọa độ là`,r,[pt(a,-b),pt(-a,b),pt(-a,-b),pt(b,a),pt(-b,-a)].filter(v=>v!=r),
  [t==0?`Hai điểm đối xứng qua trục hoành Ox có cùng hoành độ và tung độ đối nhau.`:t==1?`Hai điểm đối xứng qua trục tung Oy có hoành độ đối nhau và cùng tung độ.`:`Hai điểm đối xứng qua gốc O có hoành độ đối nhau và tung độ đối nhau.`,
   `Từ A${pt(a,b)}, ta được điểm đối xứng là ${r}.`],'',String),[a,b,t]]}),
gn('hsn.he_so_ab',()=>{const p=nzc(4),q=nzc(4),r=nzc(6),s=nzc(8),a=p*q,b=p*r+s,ask=R(0,1);
 return[M(`Cho hàm số y = ${ng(p)}(${lin(q,r)}) ${s<0?'−':'+'} ${ab(s)}. ${ask?'Tung độ gốc b':'Hệ số góc a'} của hàm số này là`,ask?b:a,[ask?a:b,ask?p*r-s:p+q,ask?p*(r+s):a+1,ask?-b:-a,ask?b+1:a-1].filter(v=>v!=(ask?b:a)),
  [`Nhân ${ng(p)} với từng hạng tử trong ngoặc: ${ng(p)}·${pa(q)}x = ${cf(a)}x và ${ng(p)}·${pa(r)} = ${ng(p*r)}. Ta có y = ${cf(a)}x ${sg(p*r)} ${ab(p*r)} ${s<0?'−':'+'} ${ab(s)}.`,`Thu gọn: y = ${lin(a,b)}.`,
   ask?`Tung độ gốc là số hạng không chứa x: b = ${ng(b)}.`:`Hệ số góc là hệ số của x: a = ${ng(a)}.`],'',ng),[p,q,r,s,ask]]}),
gn('hsn.dk_bac_nhat_m',()=>{const a=nzc(4),b=nzc(8),c=nzc(6);let r=fq(-b,a);
 const bad=[`m = ${r}`,`m ≠ ${fq(b,a)}`,`m ≠ ${ng(b)}`,`m ≠ ${fq(a,b)}`,`m ≠ 0`].filter(v=>v!=`m ≠ ${r}`);
 return[M(`Hàm số y = (${lin(a,b,'m')})x ${c<0?'−':'+'} ${ab(c)} là hàm số bậc nhất khi và chỉ khi`,`m ≠ ${r}`,bad,
  [`Hàm số y = ax + b là hàm số bậc nhất khi hệ số a ≠ 0. Ở đây hệ số của x là ${lin(a,b,'m')}.`,`Điều kiện: ${lin(a,b,'m')} ≠ 0.`,`Chuyển vế: ${ng(a)}m ≠ ${ng(-b)}, suy ra m ≠ ${r}.`],'',String),[a,b,c]]}),
gn('hsn.qua_diem_m',()=>{const m=nzc(6),p=nzc(5),q=nzc(8),x0=nzc(4),y0=(m+p)*x0+q;
 return[Iq(`Đồ thị hàm số y = (${lin(1,p,'m')})x ${q<0?'−':'+'} ${ab(q)} đi qua điểm A${pt(x0,y0)}. Tìm m.`,m,
  [`Vì đồ thị đi qua A${pt(x0,y0)} nên khi thay x = ${ng(x0)}, y = ${ng(y0)} vào hàm số thì được đẳng thức đúng.`,`${ng(y0)} = (m ${sg(p)} ${ab(p)})·${x0<0?`(${ng(x0)})`:x0} ${q<0?'−':'+'} ${ab(q)}, suy ra (m ${sg(p)} ${ab(p)})·${x0<0?`(${ng(x0)})`:x0} = ${ng(y0-q)}.`,
   `Chia hai vế cho ${ng(x0)}: m ${sg(p)} ${ab(p)} = ${ng((y0-q)/x0)}, nên m = ${ng(m)}.`]),[m,p,q,x0]]}),
gn('hsn.cat_truc_m',()=>{const m=nzc(5),p=nzc(4),t=R(0,1);let q,r,k,h,qs;
 if(t==0){q=P([1,2,3,-1]);r=nzc(6);k=q*m+r;qs=`cắt trục tung tại điểm có tung độ ${ng(k)}`}
 else{q=P([1,2,-1,-2]);h=nzc(4);if(h+q==0)throw 0;r=-(m+p)*h-q*m;if(p*h+r==0)throw 0;qs=`cắt trục hoành tại điểm có hoành độ ${ng(h)}`}
 return[Iq(`Cho hàm số y = (${lin(1,p,'m')})x + (${lin(q,r,'m')}). Tìm m để đồ thị hàm số ${qs}.`,m,
  t==0?[`Đồ thị cắt trục tung tại điểm (0; b), nên tung độ chính là hệ số tự do: ${lin(q,r,'m')}.`,`Cho ${lin(q,r,'m')} = ${ng(k)}, suy ra ${eq1(q,k-r,m,'m')}.`]:
   [`Đồ thị cắt trục hoành tại điểm có hoành độ ${ng(h)} nên đi qua điểm (${ng(h)}; 0): thay x = ${ng(h)}, y = 0 vào hàm số.`,`0 = (m ${sg(p)} ${ab(p)})·${h<0?`(${ng(h)})`:h} + (${lin(q,r,'m')}), hay ${cf(h+q)}m ${sg(p*h+r)} ${ab(p*h+r)} = 0.`,`Suy ra ${eq1(h+q,-(p*h+r),m,'m')}.`]),[m,p,q,t]]}),
gn('hsn.cuoc_dt',()=>{const A=P([20000,25000,30000,40000]),B=P([200,300,400,500]),mn=R(20,150),T=A+B*mn,t=R(0,2);
 const intro=`Một gói cước điện thoại tính phí cố định ${A} đồng mỗi tháng và ${B} đồng cho mỗi phút gọi.`;
 if(t==0)return[Iq(`${intro} Tháng này bạn Lan gọi ${mn} phút. Hỏi bạn Lan phải trả bao nhiêu đồng?`,T,[`Số tiền y (đồng) phụ thuộc số phút gọi x theo công thức y = ${B}x + ${A}.`,`Với x = ${mn}: y = ${B}·${mn} + ${A} = ${B*mn} + ${A} = ${T} (đồng).`]),[0,A,B,mn]];
 if(t==1)return[Iq(`${intro} Tháng này bạn Lan phải trả tất cả ${T} đồng. Hỏi bạn Lan đã gọi bao nhiêu phút?`,mn,[`Gọi x là số phút gọi. Số tiền phải trả là y = ${B}x + ${A} (đồng).`,`Cho y = ${T}: ${B}x + ${A} = ${T}, suy ra ${B}x = ${T-A}.`,`Vậy x = ${mn} (phút).`]),[1,A,B,T]];
 return[M(`${intro} Gọi x là số phút gọi trong tháng và y (đồng) là số tiền phải trả. Công thức tính y theo x là`,`y = ${B}x + ${A}`,[`y = ${A}x + ${B}`,`y = ${B}x − ${A}`,`y = ${B+A}x`],[`Tiền gọi tính theo số phút: ${B}·x (đồng).`,`Cộng với phí cố định ${A} đồng mỗi tháng, ta được y = ${B}x + ${A}.`],'',String),[2,A,B]]}),
gn('hsn.goc_ox',()=>{const a=nzc(5),b=nzc(6),r=a>0?'nhọn':'tù';
 return[M(`Đường thẳng y = ${lin(a,b)} tạo với tia Ox một góc`,r,['nhọn','tù','vuông','bẹt'].filter(v=>v!=r),
  [`Đường thẳng y = ax + b tạo với tia Ox góc nhọn khi hệ số góc a dương và góc tù khi hệ số góc a âm.`,`Ở đây hệ số góc a = ${ng(a)}, ${a>0?'là số dương':'là số âm'}.`,`Vậy đường thẳng tạo với tia Ox một góc ${r}.`],'',String),[a,b]]}),
gn('hsn.so_sanh_goc',()=>{const t=R(0,1),as=sh([1,2,3,4,5,6]).slice(0,4).map(v=>t?-v:v),bs=as.map(()=>nzc(6)),
 ang=as.map(a=>Math.atan(a)+(a<0?Math.PI:0)),big=R(0,1),i=ang.indexOf(big?Math.max(...ang):Math.min(...ang));
 return[M(`Cho các đường thẳng ${as.map((a,j)=>`d${j+1}: ${yl(a,bs[j])}`).join('; ')}. Đường thẳng nào tạo với tia Ox một góc ${t?'tù':'nhọn'} ${big?'lớn nhất':'nhỏ nhất'}?`,`d${i+1}`,[1,2,3,4].map(j=>`d${j}`).filter(v=>v!=`d${i+1}`),
  [t?`Các hệ số góc đều âm nên các đường thẳng đều tạo với tia Ox góc tù. Hệ số góc càng gần 0 (giá trị tuyệt đối càng nhỏ) thì góc tù càng lớn; giá trị tuyệt đối càng lớn thì góc tù càng nhỏ.`:`Các hệ số góc đều dương nên các đường thẳng đều tạo với tia Ox góc nhọn; hệ số góc càng lớn thì góc nhọn càng lớn.`,
   `Hệ số góc: ${as.map((a,j)=>`d${j+1}: a = ${ng(a)}`).join('; ')}.`,`Chọn ${big?'góc lớn nhất':'góc nhỏ nhất'}: đường thẳng d${i+1}.`],'',String),[t,big]]}),
gn('hsn.giao_truc',()=>{const a=nzc(5),b=nzc(9),x0=fq(-b,a),r=`(${x0}; 0)`;
 return[M(`Đường thẳng y = ${lin(a,b)} cắt trục hoành tại điểm`,r,[`(${fq(b,a)}; 0)`,`(0; ${ng(b)})`,`(${fq(-a,b)}; 0)`,`(0; ${x0})`].filter(v=>v!=r),
  [`Điểm trên trục hoành có tung độ bằng 0. Cho y = 0: ${lin(a,b)} = 0.`,`Suy ra ${ng(a)}x = ${ng(-b)}, nên x = ${x0}.`,`Vậy đường thẳng cắt trục hoành tại điểm ${r}.`],'',String),[a,b]]}),
gn('hsn.he_so_goc_2diem',()=>{const x1=nzc(5),y1=nzc(6);let x2=nzc(5),y2=nzc(6);if(x2==x1||y2==y1)throw 0;
 return[Iq(`Đường thẳng y = ax + b đi qua hai điểm A${pt(x1,y1)} và B${pt(x2,y2)}. Tính hệ số góc a. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(y2-y1,x2-x1),
  [`Vì đường thẳng đi qua A và B nên ${ng(y1)} = a·${pa(x1)} + b và ${ng(y2)} = a·${pa(x2)} + b.`,`Trừ hai đẳng thức theo vế: ${ng(y2)} − ${pa(y1)} = a(${ng(x2)} − ${pa(x1)}), tức là ${ng(y2-y1)} = ${ng(x2-x1)}a.`,`Do đó a = ${val(y2-y1,x2-x1)}.`]),[x1,y1,x2,y2]]}),
gn('hsn.doc_do_thi',()=>{const a=P([-3,-2,-1,1,2,3]),b=R(-3,3);if(ab(a+b)>3)throw 0;
 const r=yl(a,b);
 return[fg(M(`Đường thẳng d vẽ trên mặt phẳng tọa độ trong hình là đồ thị của hàm số nào?`,r,uq([yl(-a,b),yl(a,-b),yl(b||2,a),yl(-a,-b),yl(a,b+1),yl(a+1,b)]).filter(v=>v!=r&&!/= 0x/.test(v)),
  [`Đường thẳng cắt trục tung tại điểm (0; ${ng(b)}) nên b = ${ng(b)}.`,`Đường thẳng đi qua điểm (1; ${ng(a+b)}). Thay vào y = ax + b: ${ng(a+b)} = a·1 + ${pa(b)}, suy ra a = ${ng(a)}.`,`Vậy hàm số là ${r}.`],'',String),plane(a,b)),[a,b]]}));

/* ================= NÂNG CAO ================= */
addH('l8hs',
gn('hsn.dt_tam_giac_hai_dt',()=>{const n=P([6,12,-6,-12,4,8,-8,10]),m=R(-4,4),dv=[];for(let d=1;d<=ab(n);d++)if(ab(n)%d==0)dv.push(d,-d);
 const a1=P(dv),a2=P(dv);if(a1==a2||a1*a2==0)throw 0;
 const b1=n-a1*m,b2=n-a2*m;if(!b1||!b2)throw 0;const x1=m-n/a1,x2=m-n/a2,S=ab(x1-x2)*ab(n)/2;if(!Number.isInteger(S)||S>80)throw 0;
 return[Iq(`Hai đường thẳng d₁: ${yl(a1,b1)} và d₂: ${yl(a2,b2)} cắt nhau tại M. Gọi A, B lần lượt là giao điểm của d₁, d₂ với trục hoành. Tính diện tích tam giác MAB (đơn vị diện tích).`,S,
  [`Hoành độ giao điểm M: ${lin(a1,b1)} = ${lin(a2,b2)}, suy ra ${eq1(a1-a2,b2-b1,m)}. Tung độ: y = ${ng(a1)}·${pa(m)} ${sg(b1)} ${ab(b1)} = ${ng(n)}. Vậy M${pt(m,n)}.`,
   `A là giao của d₁ với trục hoành: ${lin(a1,b1)} = 0 nên x = ${fq(-b1,a1)}, A(${fq(-b1,a1)}; 0). Tương tự B(${fq(-b2,a2)}; 0).`,
   `Đáy AB = |${fq(-b1,a1)} − ${pa2(fq(-b2,a2))}| = ${ng(ab(x1-x2))}; chiều cao là khoảng cách từ M đến trục hoành = |${ng(n)}| = ${ab(n)}.`,`Diện tích tam giác MAB = ${ng(ab(x1-x2))}·${ab(n)} : 2 = ${S}.`]),[a1,b1,a2,b2]]}),
gn('hsn.dong_quy',()=>{const m0=nzc(4),n0=nzc(8),a1=nzc(3),a2=nzc(3),k=nzc(4);if(a1==a2)throw 0;
 const b1=n0-a1*m0,b2=n0-a2*m0,e=n0-k*m0;if(!e)throw 0;
 return[Iq(`Cho ba đường thẳng d₁: ${yl(a1,b1)}; d₂: ${yl(a2,b2)}; d₃: y = mx ${e<0?'−':'+'} ${ab(e)}. Tìm m để ba đường thẳng đồng quy (cùng đi qua một điểm).`,k,
  [`Tìm giao điểm của d₁ và d₂: ${lin(a1,b1)} = ${lin(a2,b2)}, suy ra ${eq1(a1-a2,b2-b1,m0)}.`,`Thay x = ${ng(m0)} vào d₁: y = ${ng(n0)}. Giao điểm là M${pt(m0,n0)}.`,
   `Ba đường thẳng đồng quy khi d₃ cũng đi qua M: ${ng(n0)} = m·${pa(m0)} ${e<0?'−':'+'} ${ab(e)}, suy ra ${eq1(m0,n0-e,k,'m')}.`]),[a1,a2,k]]}),
gn('hsn.cuoc_so_sanh',()=>{const x=R(4,20),b2=R(3,8),b1=b2+R(1,5),a1=R(5,15),a2=a1+(b1-b2)*x,t=R(0,1);
 return[Iq(`Hãng taxi A tính phí mở cửa ${a1} nghìn đồng và ${b1} nghìn đồng cho mỗi kilômét. Hãng taxi B tính phí mở cửa ${a2} nghìn đồng và ${b2} nghìn đồng cho mỗi kilômét. ${t?'Quãng đường nguyên nhỏ nhất (km) để đi hãng B rẻ hơn hãng A là bao nhiêu?':'Với quãng đường bao nhiêu kilômét thì cước của hai hãng bằng nhau?'}`,t?x+1:x,
  [`Gọi x (km) là quãng đường. Cước hãng A: ${b1}x + ${a1} (nghìn đồng); cước hãng B: ${b2}x + ${a2} (nghìn đồng).`,
   `Cước bằng nhau khi ${b1}x + ${a1} = ${b2}x + ${a2}, suy ra ${b1-b2}x = ${a2-a1}, x = ${x}.`,
   t?`Quãng đường dài hơn ${x} km thì hãng A (tăng ${b1} nghìn đồng/km) đắt hơn hãng B (tăng ${b2} nghìn đồng/km), nên hãng B rẻ hơn. Số km nguyên nhỏ nhất là ${x+1}.`:`Vậy với quãng đường ${x} km thì cước hai hãng bằng nhau.`]),[a1,b1,a2,b2,t]]}),
gn('hsn.song_song_qua_diem',()=>{const a=nzc(4),c=nzc(6),x0=nzc(4),y0=nzc(8),b=y0-a*x0;if(b==c)throw 0;
 const r=yl(a,b);
 return[M(`Đường thẳng đi qua điểm A${pt(x0,y0)} và song song với đường thẳng y = ${lin(a,c)} có phương trình là`,r,uq([yl(a,c),yl(-a,b),yl(a,-b),yl(a,y0+a*x0),yl(-a,y0-a*x0)]).filter(v=>v!=r),
  [`Đường thẳng cần tìm có dạng y = a′x + b′. Song song với y = ${lin(a,c)} nên a′ = ${ng(a)} và b′ ≠ ${ng(c)}.`,`Đi qua A${pt(x0,y0)}: ${ng(y0)} = ${ng(a)}·${pa(x0)} + b′, suy ra b′ = ${ng(y0)} − ${pa(a*x0)} = ${ng(b)}.`,`Vì ${ng(b)} ≠ ${ng(c)} nên thỏa điều kiện. Phương trình: ${r}.`],'',String),[a,c,x0,y0]]}));
function pa2(s){return s.startsWith('−')?`(${s})`:s}
})();
