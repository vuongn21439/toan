/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 2" — Chương VII: Phương trình bậc nhất (bài 25–26)
   Chủ đề l8ptr (mã ptr2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Kiểm chứng: kiem-chung/lop8-9/oracles8c.js */
(()=>{const {add,addH,gn,M,Iq,fh,fr,fq,fd,lin,ng,cf}=G8H,{nzc,sg,uq,val}=G8X,
lc=(a,b)=>a/gcd(a,b)*b,
ab=Math.abs,ck=v=>v==1?'':''+v;

/* ================= CƠ BẢN ================= */
add('l8ptr',
gn('ptr2.nhan_dang',()=>{const a=nzc(6),b=nzc(9),c=R(2,9),t=R(0,1),
 OK=[[`${lin(a,b)} = 0`,'có dạng ax + b = 0 với a ≠ 0'],[`${lin(c+1,-b)} = 0`,'có dạng ax + b = 0 với a ≠ 0'],[`${lin(-c,b)} = 0`,'có dạng ax + b = 0 với a ≠ 0']],
 NO=[[`0x + ${c} = 0`,'hệ số a bằng 0'],[`x^2 − ${c} = 0`,'có x^2, là phương trình bậc hai'],[`${fh(1,'x')} + ${c} = 0`,'ẩn x nằm ở mẫu'],[`${ng(a)}x + y = 0`,'có hai ẩn x và y'],[`x^2 + ${c}x = 0`,'có x^2, là phương trình bậc hai']],
 ok=sh(uq(OK.map(v=>v[0]))).map(s=>OK.find(v=>v[0]==s)),no=sh(NO),ans=t?ok[0]:no[0],ws=t?no.slice(0,3):ok.slice(0,3);
 if(ok.length<3)throw 0;
 return[M(`Phương trình nào sau đây ${t?'là':'KHÔNG phải là'} phương trình bậc nhất một ẩn?`,ans[0],ws.map(w=>w[0]),
  [`Phương trình bậc nhất một ẩn có dạng ax + b = 0, trong đó a, b là các số đã cho và a ≠ 0.`,`Xét từng phương trình: ${sh([ans,...ws]).map(([e,r])=>`${e} (${r})`).join('; ')}.`],'',String),[t]]}),
gn('ptr2.giai_ngoac',()=>{const x0=nzc(8),a=R(1,6),b=R(1,6),p=nzc(6),q=nzc(6);if(a==b)throw 0;
 const c=a*(x0+p)-b*(x0+q),K=a*p-b*q,D=a-b;if(!K)throw 0;const 
 e1=(v)=>Number.isInteger(v)?v:null,
 wr=[e1((c-a*p-b*q)/D),e1((c+K)/D),e1((c-K)/(a+b)),e1((c+a*p-b*q)/D),e1(-x0),x0+1,x0-1].filter(v=>v!=null&&v!=x0);
 return[M(`Nghiệm của phương trình ${a}(${lin(1,p)}) − ${b}(${lin(1,q)}) = ${ng(c)} là`,x0,wr,
  [`Bỏ ngoặc (chú ý dấu − đứng trước ngoặc thứ hai): ${a}x ${sg(a*p)} ${ab(a*p)} − ${b}x ${sg(-b*q)} ${ab(b*q)} = ${ng(c)}.`,
   `Gộp các hạng tử đồng dạng: ${cf(D)}x ${sg(K)} ${ab(K)} = ${ng(c)}.`,`Chuyển vế: ${cf(D)}x = ${ng(c-K)}, suy ra x = ${ng(x0)}.`],'',ng),[a,b,p,q]]}),
gn('ptr2.mau_so',()=>{const a=R(2,6),b=R(2,6),p=nzc(6),q=nzc(6),s=P([1,-1]);let x0=null;
 for(let x=-12;x<=12;x++)if(((x+p)%a+a)%a==0&&((x+q)%b+b)%b==0&&x!=0){x0=x;break}
 if(x0==null||a==b)throw 0;
 const c=(x0+p)/a+s*(x0+q)/b,L=lc(a,b),k1=L/a,k2=L/b,Dn=k1+s*k2;if(!Dn||Math.abs(c)>30)throw 0;
 const w=[(L*c-k1*p-s*k2*q)/Dn,(c-k1*p-s*k2*q)/Dn,(L*c-k1*p+s*k2*q)/Dn,(L*c+k1*p+s*k2*q)/Dn,-x0,x0+1,x0-1].filter(v=>Number.isInteger(v)&&v!=x0);
 return[M(`Nghiệm của phương trình ${fh(lin(1,p),a)} ${s>0?'+':'−'} ${fh(lin(1,q),b)} = ${ng(c)} là`,x0,w,
  [`Mẫu chung là BCNN(${a}, ${b}) = ${L}. Nhân hai vế với ${L}: ${ck(k1)}(${lin(1,p)}) ${s>0?'+':'−'} ${ck(k2)}(${lin(1,q)}) = ${ng(L*c)}.`,
   `Bỏ ngoặc: ${cf(k1)}x ${sg(k1*p)} ${ab(k1*p)} ${s>0?'+':'−'} ${ck(k2)}x ${sg(s*q)} ${ab(k2*q)} = ${ng(L*c)}, hay ${cf(Dn)}x = ${ng(L*c-k1*p-s*k2*q)}.`,
   `Suy ra x = ${ng(x0)}.`],'',ng),[a,b,p,q,s]]}),
gn('ptr2.tich_he_so',()=>{const a=R(2,4),c=R(2,4),b=nzc(9),d=nzc(9);if(b*c==d*a)throw 0;
 return[Iq(`Tổng các nghiệm của phương trình (${lin(a,b)})(${lin(c,d)}) = 0 là bao nhiêu? (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(-b*c-d*a,a*c),
  [`Tích bằng 0 khi một trong hai thừa số bằng 0: ${lin(a,b)} = 0 hoặc ${lin(c,d)} = 0.`,`Giải từng phương trình: x = ${fq(-b,a)} hoặc x = ${fq(-d,c)}.`,`Tổng hai nghiệm: ${fq(-b,a)} + (${fq(-d,c)}) = ${fq(-b*c-d*a,a*c)}.`]),[a,b,c,d]]}),
gn('ptr2.nghiem_m',()=>{const a=nzc(5),c=nzc(5),x0=nzc(6),p=nzc(6),d=nzc(9);if(a==c||a*x0+p==0)throw 0;
 const m=c*x0+d-a*x0-p,u=a*x0+p;
 return[M(`Phương trình ${cf(a)}x + m ${p<0?'−':'+'} ${ab(p)} = ${cf(c)}x ${d<0?'−':'+'} ${ab(d)} nhận x = ${ng(x0)} làm nghiệm. Giá trị của m là`,m,[-m,m+1,m-1,m+x0,m-x0,c*x0+d+u],
  [`Vì x = ${ng(x0)} là nghiệm nên khi thay x = ${ng(x0)} vào, hai vế của phương trình bằng nhau.`,
   `Vế trái: ${ng(a)}·${pa(x0)} + m ${p<0?'−':'+'} ${ab(p)} = m ${sg(u)} ${ab(u)}.`,
   `Vế phải: ${ng(c)}·${pa(x0)} ${d<0?'−':'+'} ${ab(d)} = ${ng(c*x0+d)}.`,`Cho hai vế bằng nhau: m ${sg(u)} ${ab(u)} = ${ng(c*x0+d)}, suy ra m = ${ng(c*x0+d)} ${u<0?'+':'−'} ${ab(u)} = ${ng(m)}.`],'',ng),[a,c,x0,p,d]]}),
gn('ptr2.gap_nhau',()=>{const v1=P([30,40,45,50,60]),v2=P([30,40,45,50,60]),h=R(0,2),t=R(Math.max(2,h+1),6),D=v1*t+v2*(t-h);
 const intro=h?`Hai ô tô xuất phát từ hai địa điểm A và B cách nhau ${D} km, đi ngược chiều nhau để gặp nhau. Xe thứ nhất đi từ A với vận tốc ${v1} km/h, xuất phát trước xe thứ hai từ B ${h} giờ; xe thứ hai có vận tốc ${v2} km/h.`:
  `Hai ô tô xuất phát cùng lúc từ hai địa điểm A và B cách nhau ${D} km, đi ngược chiều nhau để gặp nhau. Xe thứ nhất đi từ A với vận tốc ${v1} km/h, xe thứ hai đi từ B với vận tốc ${v2} km/h.`;
 return[Iq(`${intro} Hỏi sau bao nhiêu giờ kể từ lúc xe thứ nhất xuất phát thì hai xe gặp nhau?`,t,
  [`Gọi t (giờ) là thời gian từ lúc xe thứ nhất xuất phát đến lúc hai xe gặp nhau.`,
   h?`Xe thứ nhất đi được ${v1}t (km); xe thứ hai đi sau ${h} giờ nên đi được ${v2}(t − ${h}) (km).`:`Xe thứ nhất đi được ${v1}t (km); xe thứ hai đi được ${v2}t (km).`,
   `Khi gặp nhau, tổng quãng đường hai xe đi bằng AB: ${h?`${v1}t + ${v2}(t − ${h}) = ${D}`:`${v1}t + ${v2}t = ${D}`}.`,
   `Giải: ${v1+v2}t = ${D+v2*h}, suy ra t = ${t}. Vậy sau ${t} giờ hai xe gặp nhau.`]),[v1,v2,h,t]]}),
gn('ptr2.nang_suat',()=>{const a=P([20,30,40,50]),b=a+P([5,10]),d=R(1,3),x0=Math.max(8,Math.floor(b*d/(b-a))+1),x=R(x0,x0+10),e=(b-a)*x-b*d;
 return[Iq(`Một tổ sản xuất dự định mỗi ngày làm ${a} sản phẩm. Nhưng thực tế mỗi ngày tổ làm được ${b} sản phẩm nên hoàn thành sớm hơn kế hoạch ${d} ngày và còn làm thêm được ${e} sản phẩm. Hỏi theo kế hoạch, tổ phải làm bao nhiêu sản phẩm?`,a*x,
  [`Gọi x là số ngày làm theo kế hoạch (x lớn hơn ${d}). Số sản phẩm theo kế hoạch là ${a}x.`,`Thực tế làm trong (x − ${d}) ngày, mỗi ngày ${b} sản phẩm, được ${b}(x − ${d}) sản phẩm và nhiều hơn kế hoạch ${e} sản phẩm.`,
   `Phương trình: ${b}(x − ${d}) = ${a}x + ${e}. Bỏ ngoặc: ${b}x − ${b*d} = ${a}x + ${e}, suy ra ${b-a}x = ${b*d+e}, x = ${x}.`,`Số sản phẩm theo kế hoạch: ${a}·${x} = ${a*x} (sản phẩm).`]),[a,b,d,e]]}),
gn('ptr2.lai_suat',()=>{const x=R(1,4)*100,y=R(1,4)*100,r1=R(7,10),r2=R(4,6),S=x+y,L=r1*x/100+r2*y/100;
 return[Iq(`Bác Hưng đầu tư ${S} triệu đồng vào hai khoản: mua trái phiếu với lãi suất ${r1}%/năm và gửi tiết kiệm với lãi suất ${r2}%/năm. Sau một năm, tổng tiền lãi là ${L} triệu đồng. Hỏi bác đã đầu tư bao nhiêu triệu đồng vào trái phiếu?`,x,
  [`Gọi x (triệu đồng) là số tiền mua trái phiếu (x nằm giữa 0 và ${S}). Số tiền gửi tiết kiệm là ${S} − x (triệu đồng).`,
   `Tiền lãi: trái phiếu ${r1}% · x = ${fd(r1/100)}x; tiết kiệm ${r2}% · (${S} − x) = ${fd(r2/100)}(${S} − x).`,
   `Phương trình: ${fd(r1/100)}x + ${fd(r2/100)}(${S} − x) = ${L}. Bỏ ngoặc: ${fd((r1-r2)/100)}x + ${fd(r2*S/100)} = ${L}.`,`Suy ra ${fd((r1-r2)/100)}x = ${fd(L-r2*S/100)}, nên x = ${x}. Vậy bác đầu tư ${x} triệu đồng vào trái phiếu.`]),[S,r1,r2,L]]}),
gn('ptr2.giam_hai_lan',()=>{const d1=P([10,20,25]),d2=P([10,20]),Pv=P([2000,2500,4000,5000,8000,10000,12000]),F=Pv*(100-d1)*(100-d2)/10000;if(!Number.isInteger(F))throw 0;
 return[Iq(`Một chiếc điện thoại được giảm ${d1}% so với giá niêm yết, sau đó cửa hàng giảm thêm ${d2}% trên giá đã giảm nên khách chỉ phải trả ${F} nghìn đồng. Giá niêm yết ban đầu là bao nhiêu nghìn đồng?`,Pv,
  [`Gọi x (nghìn đồng) là giá niêm yết. Sau lần giảm thứ nhất, giá còn ${100-d1}% · x = ${fd((100-d1)/100)}x.`,`Sau lần giảm thứ hai (trên giá đã giảm), giá còn ${fd((100-d1)/100)}x · ${fd((100-d2)/100)} = ${fd((100-d1)*(100-d2)/10000)}x.`,
   `Phương trình: ${fd((100-d1)*(100-d2)/10000)}x = ${F}, suy ra x = ${Pv}.`]),[d1,d2,F]]}),
gn('ptr2.nhiet_do',()=>{const C=R(-4,20)*5,t=R(0,1),F=9*C/5+32;
 return t==0?[Iq(`Công thức đổi nhiệt độ từ độ C sang độ F là F = 1,8C + 32. Nhiệt độ ${ng(C)} °C ứng với bao nhiêu °F?`,F,[`Thay C = ${ng(C)} vào công thức: F = 1,8·${C<0?`(${ng(C)})`:C} + 32.`,`1,8·${C<0?`(${ng(C)})`:C} = ${fd(1.8*C)}, nên F = ${fd(1.8*C)} + 32 = ${ng(F)} (°F).`]),[0,C]]:
  [Iq(`Công thức đổi nhiệt độ từ độ C sang độ F là F = 1,8C + 32. Nhiệt độ ${ng(F)} °F ứng với bao nhiêu °C?`,C,[`Thay F = ${ng(F)} vào công thức, ta có phương trình: 1,8C + 32 = ${ng(F)}.`,`Chuyển vế: 1,8C = ${ng(F)} − 32 = ${ng(F-32)}.`,`Suy ra C = ${ng(F-32)} : 1,8 = ${ng(C)} (°C).`]),[1,F]]}),
gn('ptr2.tuoi_tong',()=>{const k=R(3,4),x=R(8,15),n=R(5,15),T=(k+1)*x+2*n;
 return[Iq(`Hiện nay tuổi của bố gấp ${k} lần tuổi của Nam. Sau ${n} năm nữa thì tổng số tuổi của hai bố con là ${T} tuổi. Hỏi hiện nay Nam bao nhiêu tuổi?`,x,
  [`Gọi x là tuổi của Nam hiện nay (x là số dương). Tuổi của bố hiện nay là ${k}x.`,`Sau ${n} năm, tuổi Nam là x + ${n} và tuổi bố là ${k}x + ${n}.`,`Phương trình: (x + ${n}) + (${k}x + ${n}) = ${T}, hay ${k+1}x + ${2*n} = ${T}.`,`Suy ra ${k+1}x = ${T-2*n}, x = ${x}. Vậy Nam hiện nay ${x} tuổi.`]),[k,n,T]]}),
gn('ptr2.hcn_tang',()=>{const x=R(5,20),d=R(2,10),a=R(2,5),S=2*a*x+a*(d+a);
 return[Iq(`Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng ${d} m. Nếu tăng cả chiều dài và chiều rộng thêm ${a} m thì diện tích tăng thêm ${S} m². Tính chiều rộng ban đầu của mảnh vườn (m).`,x,
  [`Gọi x (m) là chiều rộng ban đầu, thì chiều dài ban đầu là x + ${d}. Diện tích ban đầu: x(x + ${d}).`,`Sau khi tăng: chiều rộng x + ${a}, chiều dài x + ${d+a}. Diện tích mới: (x + ${a})(x + ${d+a}).`,
   `Diện tích tăng thêm ${S}: (x + ${a})(x + ${d+a}) − x(x + ${d}) = ${S}. Khai triển: x^2 + ${d+2*a}x + ${a*(d+a)} − x^2 − ${d}x = ${S}, hay ${2*a}x + ${a*(d+a)} = ${S}.`,`Suy ra ${2*a}x = ${S-a*(d+a)}, x = ${x}. Vậy chiều rộng ban đầu là ${x} m.`]),[d,a,S]]}),
gn('ptr2.hai_lop',()=>{const x=R(30,45),y=R(30,45),p=R(3,5),q=R(1,2),s=x+y,Y=p*x+q*y;
 return[Iq(`Hai lớp 8A và 8B có tất cả ${s} học sinh. Trong đợt ủng hộ, mỗi học sinh lớp 8A góp ${p} quyển sách, mỗi học sinh lớp 8B góp ${q} quyển sách; cả hai lớp góp được ${Y} quyển. Hỏi lớp 8A có bao nhiêu học sinh?`,x,
  [`Gọi x là số học sinh lớp 8A (x nằm giữa 0 và ${s}). Số học sinh lớp 8B là ${s} − x.`,`Số sách lớp 8A góp: ${p}x; lớp 8B góp: ${ck(q)}(${s} − x).`,`Phương trình: ${p}x + ${ck(q)}(${s} − x) = ${Y}. Bỏ ngoặc: ${p-q}x + ${q*s} = ${Y}.`,`Suy ra ${p-q}x = ${Y-q*s}, x = ${x}. Vậy lớp 8A có ${x} học sinh.`]),[s,p,q,Y]]}));

/* ================= NÂNG CAO ================= */
addH('l8ptr',
gn('ptr2.mau_nang',()=>{const a=R(2,6),b=R(2,6),c=R(2,6),p=nzc(6),q=nzc(6),r=nzc(6),L=lc(lc(a,b),c),k1=L/a,k2=L/b,k3=L/c,K=k1-k2-k3;if(!K||a==b)throw 0;
 const R0=k3*r-k1*p+k2*q;if(Math.abs(R0)>400)throw 0;
 return[Iq(`Giải phương trình ${fh(lin(1,p),a)} − ${fh(lin(1,q),b)} = ${fh(lin(1,r),c)}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(R0,K),
  [`Mẫu chung là BCNN(${a}, ${b}, ${c}) = ${L}. Nhân hai vế với ${L}: ${ck(k1)}(${lin(1,p)}) − ${ck(k2)}(${lin(1,q)}) = ${ck(k3)}(${lin(1,r)}).`,
   `Bỏ ngoặc: ${cf(k1)}x ${sg(k1*p)} ${ab(k1*p)} − ${ck(k2)}x ${sg(-k2*q)} ${ab(k2*q)} = ${cf(k3)}x ${sg(k3*r)} ${ab(k3*r)}.`,
   `Chuyển các hạng tử chứa x sang một vế, hạng tử tự do sang vế kia: (${k1} − ${k2} − ${k3})x = ${ng(k3*r)} − ${pa(k1*p)} + ${pa(k2*q)}, hay ${cf(K)}x = ${ng(R0)}.`,`Vậy x = ${val(R0,K)}.`]),[a,b,c,p,q,r]]}),
gn('ptr2.quang_duong_v',()=>{let v1,v2,d,t,g=0;do{v1=P([30,40,45,50]);v2=P([50,60,75,80]);d=R(3,24)*10;t=60*d*(v2-v1)/(v1*v2)}while((v2<=v1||!Number.isInteger(t)||t<6||t>120)&&g++<200);
 if(g>=200)throw 0;
 return[Iq(`Một ô tô đi từ A đến B với vận tốc ${v1} km/h. Lúc về, ô tô đi với vận tốc ${v2} km/h nên thời gian về ít hơn thời gian đi ${t} phút. Tính quãng đường AB (km).`,d,
  [`Gọi x (km) là quãng đường AB. Thời gian đi: ${fh('x',v1)} giờ; thời gian về: ${fh('x',v2)} giờ.`,`${t} phút = ${fq(t,60)} giờ. Thời gian về ít hơn thời gian đi nên ${fh('x',v1)} − ${fh('x',v2)} = ${fq(t,60)}.`,
   `Nhân hai vế với ${lc(v1,v2)}: ta được ${lc(v1,v2)/v1}x − ${lc(v1,v2)/v2}x = ${fd(t/60*lc(v1,v2))}, hay ${lc(v1,v2)/v1-lc(v1,v2)/v2}x = ${fd(t/60*lc(v1,v2))}.`,`Suy ra x = ${d}. Vậy quãng đường AB dài ${d} km.`]),[v1,v2,t]]}),
gn('ptr2.xuoi_nguoc',()=>{let c,t1,t2,g=0;do{c=R(2,5);t1=R(2,6);t2=t1+R(1,3);g++}while((c*(t1+t2)%(t2-t1))&&g<200);if(g>=200)throw 0;
 const v=c*(t1+t2)/(t2-t1),d=(v+c)*t1;
 return[Iq(`Một ca nô đi xuôi dòng từ A đến B hết ${t1} giờ và đi ngược dòng từ B về A hết ${t2} giờ. Biết vận tốc dòng nước là ${c} km/h. Tính khoảng cách AB (km).`,d,
  [`Gọi x (km/h) là vận tốc riêng của ca nô (x lớn hơn ${c}). Vận tốc xuôi dòng là x + ${c}, vận tốc ngược dòng là x − ${c}.`,`Quãng đường AB không đổi: ${t1}(x + ${c}) = ${t2}(x − ${c}).`,
   `Bỏ ngoặc: ${t1}x + ${t1*c} = ${t2}x − ${t2*c}, suy ra ${t2-t1==1?'':t2-t1}x = ${c*(t1+t2)}${t2-t1==1?'':`, x = ${v}`}.`,`Khoảng cách AB = ${t1}·(${v} + ${c}) = ${d} (km).`]),[c,t1,t2]]}),
gn('ptr2.so_hai_chu_so',()=>{const a=R(1,7),b=R(a+1,9),s=a+b,dd=9*(b-a);
 return[Iq(`Một số tự nhiên có hai chữ số, tổng hai chữ số bằng ${s}. Nếu đổi chỗ hai chữ số cho nhau thì được số mới lớn hơn số ban đầu ${dd} đơn vị. Tìm số ban đầu.`,10*a+b,
  [`Gọi x là chữ số hàng chục, thì chữ số hàng đơn vị là ${s} − x. Số ban đầu là 10x + (${s} − x) = 9x + ${s}.`,`Số mới (đổi chỗ) là 10(${s} − x) + x = ${10*s} − 9x.`,
   `Số mới lớn hơn số cũ ${dd}: (${10*s} − 9x) − (9x + ${s}) = ${dd}, hay ${9*s} − 18x = ${dd}.`,`Suy ra 18x = ${9*s-dd}, x = ${a}. Chữ số hàng đơn vị là ${s} − ${a} = ${b}. Số ban đầu là ${10*a+b}.`]),[s,dd]]}));
})();
