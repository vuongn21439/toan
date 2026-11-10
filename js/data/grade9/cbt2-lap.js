/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì II (KNTT)" — giải bài toán bằng cách lập phương trình bậc hai (v16)
   Chủ đề l9ptb2 (mã lp.*). Mỗi bài có đủ các bước: đặt ẩn và điều kiện, lập phương trình, giải, đối chiếu điều kiện, kết luận.
   Đáp án nhiễu không kèm lý do. Kiểm chứng: kiem-chung/lop8-9/oracles9c.js */
(()=>{const {add,addH,gn,M,Iq,fh,fq,fd,cf,ng,PL}=G8H,{F,xp,nzc,ab}=G9X,
q2=(a,b,c)=>PL.str(PL.norm([[a,2],[b,1],[c,0]])),
g3=(a,b,c)=>gcd(gcd(Math.abs(a),Math.abs(b)),Math.abs(c))||1,
red=(a,b,c)=>{const g=g3(a,b,c);return[a/g,b/g,c/g]},
eq=(a,b,c)=>{const[x,y,z]=red(a,b,c);return `${q2(x,y,z)} = 0`},     /* phương trình đã rút gọn ước chung */
lcm=(a,b)=>a/gcd(a,b)*b,
sq=n=>{const r=Math.round(Math.sqrt(n));return r*r==n?r:null},
tgian=t=>t==0.5?'30 phút':t==1.5?'1 giờ 30 phút':`${t} giờ`,
XE=['ô tô','xe máy','xe tải','xe khách'];

/* ================= LẬP PHƯƠNG TRÌNH: CƠ BẢN ================= */
add('l9ptb2',
gn('lp.chon_pt',()=>{const t=R(0,3);let txt,A,W,st;
 if(t==0){const w=R(3,20),d=R(1,9),S=w*(w+d);
  txt=`Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng ${d} m và có diện tích ${S} m^2. Gọi x (m) là chiều rộng mảnh vườn (x > 0). Phương trình nào sau đây biểu thị bài toán?`;
  A=`${q2(1,d,-S)} = 0`;W=[`${q2(1,-d,-S)} = 0`,`${q2(1,d,S)} = 0`,`${q2(1,-d,S)} = 0`];
  st=[`Chiều rộng là x (m) nên chiều dài là x + ${d} (m).`,`Diện tích bằng ${S} m^2 nên x(x + ${d}) = ${S}.`,`Khai triển và chuyển vế: x^2 + ${d}x − ${S} = 0.`]}
 else if(t==1){let v,d,tt,S;for(let i=0;i<200;i++){v=5*R(4,12);d=5*R(1,3);tt=P([1,2]);S=tt*v*(v+d)/d;if(Number.isInteger(S))break;S=null}
  if(!S)throw 0;
  txt=`Một ô tô đi quãng đường AB dài ${S} km với vận tốc dự định x (km/h). Nếu tăng vận tốc thêm ${d} km/h thì đến B sớm hơn ${tt} giờ. Phương trình nào sau đây biểu thị bài toán?`;
  A=eq(tt,tt*d,-S*d);W=[eq(tt,-tt*d,-S*d),eq(tt,tt*d,S*d),eq(tt,tt*d,-S)].filter(x=>x!=A);
  st=[`Thời gian dự định là ${fh(S,'x')} giờ; thời gian thực tế là ${fh(S,`x + ${d}`)} giờ.`,`Đến sớm hơn ${tt} giờ nên ${fh(S,'x')} − ${fh(S,`x + ${d}`)} = ${tt}.`,`Quy đồng, khử mẫu: ${S}(x + ${d}) − ${S}x = ${cf(tt)}x(x + ${d}), tức ${S*d} = ${cf(tt)}x^2 + ${tt*d}x.`,`Chuyển vế và rút gọn: ${A}.`]}
 else if(t==2){let x,a,dd,N;for(let i=0;i<200;i++){x=R(10,40);a=P([2,4,5,6,8,10]);dd=R(1,3);N=dd*x*(x+a)/a;if(Number.isInteger(N))break;N=null}
  if(!N)throw 0;
  txt=`Một xưởng may phải làm ${N} chiếc áo trong thời gian quy định. Mỗi ngày xưởng may thêm ${a} chiếc so với kế hoạch nên hoàn thành sớm hơn ${dd} ngày. Gọi x là số áo xưởng phải may mỗi ngày theo kế hoạch (x > 0). Phương trình nào sau đây biểu thị bài toán?`;
  A=eq(dd,a*dd,-N*a);W=[eq(dd,-a*dd,-N*a),eq(dd,a*dd,N*a),eq(dd,a*dd,-N)].filter(x=>x!=A);
  st=[`Thời gian theo kế hoạch là ${fh(N,'x')} ngày; thực tế mỗi ngày may x + ${a} chiếc nên thời gian là ${fh(N,`x + ${a}`)} ngày.`,`Hoàn thành sớm hơn ${dd} ngày nên ${fh(N,'x')} − ${fh(N,`x + ${a}`)} = ${dd}.`,`Quy đồng, khử mẫu: ${N}(x + ${a}) − ${N}x = ${cf(dd)}x(x + ${a}), tức ${N*a} = ${cf(dd)}x^2 + ${a*dd}x.`,`Chuyển vế và rút gọn: ${A}.`]}
 else{const n=R(3,30),S=n*n+(n+1)*(n+1);
  txt=`Tổng bình phương của hai số tự nhiên liên tiếp bằng ${S}. Gọi x là số nhỏ hơn. Phương trình nào sau đây biểu thị bài toán?`;
  A=`${q2(2,2,1-S)} = 0`;W=[`${q2(2,0,1-S)} = 0`,`${q2(2,2,-S)} = 0`,`${q2(2,-2,1-S)} = 0`];
  st=[`Số lớn hơn là x + 1.`,`Tổng bình phương bằng ${S} nên x^2 + (x + 1)^2 = ${S}.`,`Khai triển: x^2 + x^2 + 2x + 1 = ${S}, tức ${A}.`]}
 return[M(txt,A,W,st,'',String),[t]]}),

gn('lp.hcn_hon_kem',()=>{const w=R(3,25),d=R(1,12),S=w*(w+d),k=R(0,2),D=d*d+4*S,r=Math.sqrt(D);
 const nm=['chiều rộng','chiều dài','chu vi'][k],ans=[w,w+d,2*(2*w+d)][k],
 who=P(['mảnh đất','mảnh vườn','sân trường','tấm bìa']);
 return[Iq(`Một ${who} hình chữ nhật có chiều dài hơn chiều rộng ${d} m và có diện tích ${S} m^2. Tính ${nm} của ${who} (đơn vị: mét).`,ans,
  [`Gọi x (m) là chiều rộng, x > 0. Khi đó chiều dài là x + ${d} (m).`,`Diện tích bằng ${S} m^2 nên x(x + ${d}) = ${S}, tức x^2 + ${d}x − ${S} = 0.`,
   `Δ = ${d}^2 + 4·${S} = ${D} = ${r}^2 nên x = ${fh(`${ng(-d)} ± ${r}`,2)}, tức x = ${w} hoặc x = ${ng(-w-d)}.`,
   `Điều kiện x > 0 nên chỉ nhận x = ${w}. Vậy chiều rộng là ${w} m, chiều dài là ${w+d} m.`,
   ...(k==2?[`Chu vi = 2·(${w} + ${w+d}) = ${ans} (m).`]:[])],'',`${ans} m`),[w,d,k]]}),

gn('lp.chu_vi_dien_tich',()=>{const w=R(3,20),l=R(w+1,w+14),C=2*(w+l),S=w*l,p=w+l,D=p*p-4*S;
 return[Iq(`Một mảnh đất hình chữ nhật có chu vi ${C} m và diện tích ${S} m^2. Tính chiều dài của mảnh đất (đơn vị: mét).`,l,
  [`Nửa chu vi là ${C} : 2 = ${p} (m). Gọi x (m) là một kích thước, kích thước kia là ${p} − x.`,`Diện tích: x(${p} − x) = ${S}, tức x^2 − ${p}x + ${S} = 0.`,
   `Δ = ${p}^2 − 4·${S} = ${D} = ${l-w}^2 nên x = ${fh(`${p} ± ${l-w}`,2)}, tức x = ${l} hoặc x = ${w}.`,`Hai kích thước là ${l} m và ${w} m. Chiều dài là số lớn hơn nên bằng ${l} m.`],'',`${l} m`),[w,l]]}),

gn('lp.so_tu_nhien',()=>{const k=P([1,2]),lab=k==1?'hai số tự nhiên liên tiếp':P(['hai số tự nhiên chẵn liên tiếp','hai số tự nhiên lẻ liên tiếp']);
 let n=R(2,25);if(k==2){if(lab.includes('chẵn')&&n%2)n++;if(lab.includes('lẻ')&&!(n%2))n++}
 const S=n*n+(n+k)*(n+k),big=R(0,1),Dp=2*S-k*k,r=Math.sqrt(Dp);
 return[Iq(`Tổng bình phương của ${lab} bằng ${S}. Tìm số ${big?'lớn':'nhỏ'} hơn trong hai số đó.`,big?n+k:n,
  [`Gọi x là số nhỏ hơn (x là số tự nhiên). Số lớn hơn là x + ${k}.`,`Ta có x^2 + (x + ${k})^2 = ${S}, tức ${q2(2,2*k,k*k-S)} = 0.`,
   `Δ′ = ${k}^2 − 2·${pa(k*k-S)} = ${Dp} = ${r}^2 nên x = ${fh(`${ng(-k)} ± ${r}`,2)}, tức x = ${n} hoặc x = ${ng(-n-k)}.`,
   `x phải là số tự nhiên nên nhận x = ${n}. Hai số là ${n} và ${n+k}.`],'',`${big?n+k:n}`),[n,k]]}),

gn('lp.tam_giac_vuong',()=>{const tr=P([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]]),m=tr[2]>20?1:R(1,3),[a,b,c]=tr.map(v=>v*m),d=b-a,ask=R(0,2),Dp=2*c*c-d*d;
 const nm=['diện tích (cm^2)','chu vi (cm)','độ dài cạnh góc vuông lớn hơn (cm)'][ask],ans=[a*b/2,a+b+c,b][ask],un=['cm^2','cm','cm'][ask];
 return[Iq(`Một tam giác vuông có cạnh huyền dài ${c} cm, hai cạnh góc vuông hơn kém nhau ${d} cm. Tính ${nm} của tam giác đó.`,ans,
  [`Gọi x (cm) là cạnh góc vuông nhỏ, x > 0. Cạnh góc vuông còn lại là x + ${d} (cm).`,`Theo định lý Pythagore: x^2 + (x + ${d})^2 = ${c}^2, tức ${q2(2,2*d,d*d-c*c)} = 0.`,
   `Δ′ = ${d}^2 − 2·${pa(d*d-c*c)} = ${Dp} = ${a+b}^2 nên x = ${fh(`${ng(-d)} ± ${a+b}`,2)}, tức x = ${a} hoặc x = ${ng(-a-d)}.`,
   `Điều kiện x > 0 nên x = ${a}. Hai cạnh góc vuông là ${a} cm và ${b} cm.`,ask==0?`Diện tích = ${fh(1,2)}·${a}·${b} = ${a*b/2} (cm^2).`:ask==1?`Chu vi = ${a} + ${b} + ${c} = ${a+b+c} (cm).`:`Cạnh góc vuông lớn hơn dài ${b} cm.`],'',`${ans} ${un}`),[a,b,c]]}));

/* ================= LẬP PHƯƠNG TRÌNH: NÂNG CAO ================= */
addH('l9ptb2',
gn('lp.hcn_thay_doi',()=>{let f=null;
 for(let i=0;i<500&&!f;i++){const w=R(4,24),a=R(1,6),b=R(1,8),l=b*(w+a)/a;if(Number.isInteger(l)&&l>w&&l>b)f={w,a,b,l}}
 if(!f)throw 0;const {w,a,b,l}=f,S=w*l,D=(a*b)**2+4*a*b*S,r=Math.sqrt(D),x2=(-a*b-r)/(2*b),askW=R(0,1);
 return[Iq(`Một mảnh đất hình chữ nhật có diện tích ${S} m^2. Nếu tăng chiều rộng thêm ${a} m và giảm chiều dài ${b} m thì diện tích mảnh đất không đổi. Tính ${askW?'chiều rộng':'chiều dài'} ban đầu của mảnh đất (đơn vị: mét).`,askW?w:l,
  [`Gọi x (m) là chiều rộng ban đầu, x > 0. Chiều dài ban đầu là ${fh(S,'x')} (m).`,`Kích thước mới: chiều rộng x + ${a}, chiều dài ${fh(S,'x')} − ${b}. Diện tích không đổi nên (x + ${a})(${fh(S,'x')} − ${b}) = ${S}.`,
   `Khai triển: ${S} − ${cf(b)}x + ${fh(a*S,'x')} − ${a*b} = ${S}. Nhân hai vế với x rồi rút gọn: ${cf(b)}x^2 + ${a*b}x − ${a*S} = 0.`,
   `Δ = ${a*b}^2 + 4·${b}·${a*S} = ${D} = ${r}^2 nên x = ${w} (nhận) hoặc x = ${fq(-a*b-r,2*b)} (loại vì âm).`,
   `Chiều rộng ban đầu là ${w} m, chiều dài ban đầu là ${S} : ${w} = ${l} (m).`],'',`${askW?w:l} m`),[w,a,b,l]]}),

gn('lp.chuyen_dong',()=>{let f=null;const dir=R(0,1);
 for(let i=0;i<500&&!f;i++){const x=R(4,14)*5,d=5*R(1,4),t=P([0.5,1,1.5,2]),S=dir==0?t*x*(x+d)/d:t*x*(x-d)/d;if(x-d>=15&&Number.isInteger(S)&&S<=400)f={x,d,t,S}}
 if(!f)throw 0;const {x,d,t,S}=f,xe=P(XE),tg=tgian(t),A0=Math.round(2*t),[A,B,C]=red(A0,dir==0?A0*d:-A0*d,-2*S*d),Dd=B*B-4*A*C,r=Math.sqrt(Dd),y=dir==0?-(x+d):d-x;
 const txt=dir==0?`Một ${xe} dự định đi quãng đường dài ${S} km với vận tốc không đổi. Nếu tăng vận tốc thêm ${d} km/h thì sẽ đến nơi sớm hơn ${tg}. Tính vận tốc dự định của ${xe} (km/h).`
  :`Một ${xe} đi từ A đến B dài ${S} km rồi quay về A trên cùng quãng đường đó. Vận tốc lúc về nhỏ hơn vận tốc lúc đi ${d} km/h nên thời gian về nhiều hơn thời gian đi ${tg}. Tính vận tốc lúc đi của ${xe} (km/h).`;
 return[Iq(txt,x,
  [dir==0?`Gọi x (km/h) là vận tốc dự định, x > 0. Thời gian dự định là ${fh(S,'x')} giờ, thời gian thực tế là ${fh(S,`x + ${d}`)} giờ.`:`Gọi x (km/h) là vận tốc lúc đi, x > ${d}. Thời gian đi là ${fh(S,'x')} giờ, thời gian về là ${fh(S,`x − ${d}`)} giờ.`,
   dir==0?`Đến sớm hơn ${tg}${t==0.5||t==1.5?` (= ${fd(t)} giờ)`:''} nên ${fh(S,'x')} − ${fh(S,`x + ${d}`)} = ${fd(t)}.`:`Thời gian về nhiều hơn ${tg}${t==0.5||t==1.5?` (= ${fd(t)} giờ)`:''} nên ${fh(S,`x − ${d}`)} − ${fh(S,'x')} = ${fd(t)}.`,
   `Quy đồng, khử mẫu và rút gọn ta được phương trình ${q2(A,B,C)} = 0.`,
   `Δ = ${pa(B)}^2 − 4·${A}·${pa(C)} = ${Dd} = ${r}^2, giải ra x = ${x} hoặc x = ${ng(y)}.`,
   `Điều kiện ${dir==0?'x > 0':`x > ${d}`} nên loại x = ${ng(y)}. Vậy vận tốc ${dir==0?'dự định':'lúc đi'} là ${x} km/h.`],'',`${x} km/h`),[dir,x,d,t]]}),

gn('lp.dong_nuoc',()=>{let f=null;
 for(let i=0;i<800&&!f;i++){const x=R(8,28),w=R(1,x-3),k=R(1,3),S=lcm(x+w,x-w)*k;if(S<=300&&S%1==0){const T=S/(x+w)+S/(x-w);if(Number.isInteger(T)&&T<=14)f={x,w,S,T}}}
 if(!f)throw 0;const {x,w,S,T}=f,Dp=S*S+T*T*w*w,r=Math.sqrt(Dp),y=0;
 return[Iq(`Một ca nô xuôi dòng ${S} km rồi ngược dòng quay lại điểm xuất phát hết tổng cộng ${T} giờ. Biết vận tốc dòng nước là ${w} km/h. Tính vận tốc riêng của ca nô (km/h).`,x,
  [`Gọi x (km/h) là vận tốc riêng của ca nô, x > ${w}. Vận tốc xuôi dòng là x + ${w}, vận tốc ngược dòng là x − ${w}.`,`Tổng thời gian: ${fh(S,`x + ${w}`)} + ${fh(S,`x − ${w}`)} = ${T}.`,
   `Quy đồng, khử mẫu: ${S}(x − ${w}) + ${S}(x + ${w}) = ${T}(x^2 − ${w*w}), tức ${T}x^2 − ${2*S}x − ${T*w*w} = 0.`,
   `Δ′ = ${pa(-S)}^2 + ${T}·${T*w*w} = ${Dp} = ${r}^2 nên x = ${fh(`${S} ± ${r}`,T)}, tức x = ${x} hoặc x = ${fq(S-r,T)}.`,
   `Điều kiện x > ${w} nên nhận x = ${x}. Vậy vận tốc riêng của ca nô là ${x} km/h.`],'',`${x} km/h`),[x,w]]}),

gn('lp.nang_suat',()=>{let f=null;const st=P([['xưởng may','chiếc áo','may'],['phân xưởng','sản phẩm','làm'],['đội công nhân','mét mương','đào'],['đội trồng rừng','cây xanh','trồng']]);
 for(let i=0;i<600&&!f;i++){const x=R(10,40),a=P([2,4,5,6,8,10]),d=R(1,3),N=d*x*(x+a)/a;if(Number.isInteger(N)&&N<=1500)f={x,a,d,N}}
 if(!f)throw 0;const {x,a,d,N}=f,Dd=(a*d)**2+4*d*N*a,r=Math.sqrt(Dd),y=-(x+a);
 return[Iq(`Một ${st[0]} phải ${st[2]} ${N} ${st[1]} trong thời gian quy định. Do mỗi ngày ${st[2]} thêm ${a} ${st[1]} so với kế hoạch nên hoàn thành sớm hơn kế hoạch ${d} ngày. Hỏi theo kế hoạch, mỗi ngày phải ${st[2]} bao nhiêu ${st[1]}?`,x,
  [`Gọi x là số ${st[1]} phải ${st[2]} mỗi ngày theo kế hoạch (x nguyên dương). Thời gian theo kế hoạch là ${fh(N,'x')} ngày; thực tế mỗi ngày ${st[2]} x + ${a} nên thời gian là ${fh(N,`x + ${a}`)} ngày.`,
   `Sớm hơn ${d} ngày nên ${fh(N,'x')} − ${fh(N,`x + ${a}`)} = ${d}.`,`Quy đồng, khử mẫu: ${N}(x + ${a}) − ${N}x = ${d}x(x + ${a}), tức ${cf(d)}x^2 + ${a*d}x − ${N*a} = 0.`,
   `Δ = ${a*d}^2 + 4·${d}·${N*a} = ${Dd} = ${r}^2 nên x = ${x} hoặc x = ${ng(y)}.`,`x > 0 nên nhận x = ${x}. Theo kế hoạch, mỗi ngày phải ${st[2]} ${x} ${st[1]}.`],'',`${x}`),[x,a,d]]}),

gn('lp.hai_voi',()=>{const T=P([2,3,4,5,6,8,10,12]),dv=[];for(let u=1;u<T;u++)if((T*T)%u==0)dv.push(u);
 const u=P(dv),a=T+u,b=T+T*T/u,d=b-a,ask=R(0,1),
 st=P([['hai vòi nước cùng chảy vào một bể thì sau','đầy bể','vòi','chảy riêng','chảy'],['hai đội công nhân cùng làm chung một công việc thì sau','xong việc','đội','làm riêng','làm'],['hai máy bơm cùng bơm nước vào một hồ thì sau','đầy hồ','máy','bơm riêng','bơm']]),
 x=ask?a:b,bq=ask?d-2*T:-(d+2*T),cq=ask?-T*d:T*d,Dd=bq*bq-4*cq,r=sq(Dd),other=ask?2*T-d-a:d+2*T-b;
 if(r==null)throw 0;if(!ask&&other>d)throw 0;
 const txt=`Nếu ${st[0]} ${T} giờ ${st[1]}. Nếu ${st[3]} một mình thì ${st[2]} thứ nhất ${st[4]} nhanh hơn ${st[2]} thứ hai ${d} giờ. Hỏi ${st[2]} thứ ${ask?'nhất':'hai'} ${st[3]} một mình thì sau bao lâu ${st[1]}? (đơn vị: giờ)`,
  den=ask?`x + ${d}`:`x − ${d}`;
 return[Iq(txt,x,
  [ask?`Gọi x (giờ) là thời gian ${st[2]} thứ nhất ${st[3]} một mình ${st[1]}, x > 0. Thời gian ${st[2]} thứ hai là x + ${d} (giờ).`:`Gọi x (giờ) là thời gian ${st[2]} thứ hai ${st[3]} một mình ${st[1]}. Thời gian ${st[2]} thứ nhất là x − ${d} (giờ), nên x > ${d}.`,
   `Trong 1 giờ, hai ${st[2]} làm được ${fh(1,'x')} và ${fh(1,den)} (phần việc); cả hai cùng làm được ${fh(1,T)} phần việc. Ta có ${fh(1,'x')} + ${fh(1,den)} = ${fh(1,T)}.`,
   `Quy đồng, khử mẫu: ${T}(${den}) + ${T}x = x(${den}), tức ${q2(1,bq,cq)} = 0.`,
   `Δ = ${pa(bq)}^2 − 4·${pa(cq)} = ${Dd} = ${r}^2, giải ra x = ${x} hoặc x = ${ng(other)}.`,
   ask?`${other<0?'x > 0 nên loại x = '+ng(other)+'. ':''}Vậy ${st[2]} thứ nhất ${st[3]} một mình hết ${x} giờ.`:`Điều kiện x > ${d} nên loại x = ${ng(other)}. Vậy ${st[2]} thứ hai ${st[3]} một mình hết ${x} giờ.`],'',`${x} giờ`),[T,u,ask]]}),

gn('lp.chia_deu',()=>{let f=null;const it=P([['quyển vở','học sinh'],['chiếc kẹo','bạn nhỏ'],['quả cam','bạn']]);
 for(let i=0;i<600&&!f;i++){const x=R(8,40),c=P([1,2,3,4,5]),e=R(1,4),N=e*x*(x-c)/c;if(x>c+3&&Number.isInteger(N)&&N<=800)f={x,c,e,N}}
 if(!f)throw 0;const {x,c,e,N}=f,Dd=(e*c)**2+4*e*N*c,r=Math.sqrt(Dd),y=c-x;
 return[Iq(`Một nhóm ${it[1]} dự định chia đều ${N} ${it[0]}. Nếu bớt đi ${c} ${it[1]} thì mỗi bạn còn lại nhận thêm ${e} ${it[0]}. Hỏi nhóm ban đầu có bao nhiêu ${it[1]}?`,x,
  [`Gọi x là số ${it[1]} ban đầu (x nguyên, x > ${c}). Lúc đầu mỗi bạn nhận ${fh(N,'x')} ${it[0]}; sau khi bớt ${c} bạn, mỗi bạn nhận ${fh(N,`x − ${c}`)} ${it[0]}.`,
   `Mỗi bạn nhận thêm ${e} nên ${fh(N,`x − ${c}`)} − ${fh(N,'x')} = ${e}.`,`Quy đồng, khử mẫu: ${N}x − ${N}(x − ${c}) = ${cf(e)}x(x − ${c}), tức ${cf(e)}x^2 − ${e*c}x − ${N*c} = 0.`,
   `Δ = ${e*c}^2 + 4·${e}·${N*c} = ${Dd} = ${r}^2 nên x = ${x} hoặc x = ${ng(y)}.`,`Điều kiện x > ${c} nên nhận x = ${x}. Vậy nhóm ban đầu có ${x} ${it[1]}.`],'',`${x}`),[x,c,e]]}),

gn('lp.giam_gia_kep',()=>{const t=R(0,2),dec=t==0;let xs,m,n;
 if(dec){xs=P([10,20,25,30,40,50]);const g=gcd(100-xs,100);m=(100-xs)/g;n=100/g}else{xs=P([10,20,25,50]);const g=gcd(100+xs,100);m=(100+xs)/g;n=100/g}
 const k=Math.ceil(P([400,600,800,1000,1500])/(n*n))+R(0,3),u=t==2?10:1,A0=n*n*k*u,A2=m*m*k*u,rr=F.nf([m*m,n*n]),sr=F.nf([m,n]),mid=dec?F.nf([n-m,n]):F.nf([m-n,n]),sy=dec?'1 − y':'1 + y';
 const txt=t==0?`Một cửa hàng giảm giá một chiếc xe đạp hai lần liên tiếp, mỗi lần giảm x% so với giá đang bán. Giá niêm yết ban đầu là ${A0} nghìn đồng, sau hai lần giảm còn ${A2} nghìn đồng. Tìm x.`
  :t==1?`Bà An gửi tiết kiệm ${A0} triệu đồng với lãi suất x%/năm (tiền lãi được cộng vào vốn sau mỗi năm). Sau 2 năm, bà nhận được cả vốn lẫn lãi là ${A2} triệu đồng. Tìm lãi suất x.`
  :`Dân số của một thị trấn năm 2024 là ${A0} người, đến năm 2026 là ${A2} người. Biết tỉ lệ tăng dân số mỗi năm là x% như nhau. Tìm x.`;
 return[Iq(txt,xs,
  [`Đặt y = ${fh('x',100)} (${dec?'0 < y < 1':'y > 0'}). Sau mỗi ${t==0?'lần':'năm'}, ${dec?'giá còn lại':'số lượng được nhân thêm'} (${sy}) lần so với trước đó. Sau hai ${t==0?'lần':'năm'}: ${A0}(${sy})^2 = ${A2}.`,
   `Suy ra (${sy})^2 = ${F.s(rr)}.`,
   `Lấy căn bậc hai hai vế: ${sy} = ${F.s(sr)} hoặc ${sy} = −${F.s(sr)}.`,
   dec?`Với 1 − y = ${F.s(sr)} ta được y = ${F.s(mid)} (nhận). Với 1 − y = −${F.s(sr)} ta được y = ${F.s(F.add([1,1],sr))} > 1 (loại).`:`Với 1 + y = ${F.s(sr)} ta được y = ${F.s(mid)} (nhận). Với 1 + y = −${F.s(sr)} ta được y < 0 (loại).`,
   `Vậy x = 100y = ${xs}.`],'',`x = ${xs}`),[t,xs]]}));
})();
