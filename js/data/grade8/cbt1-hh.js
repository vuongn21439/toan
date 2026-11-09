/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 1" — Chương 3: Tứ giác · Chương 4: Định lí Thalès
   Chủ đề l8tg (mã tg2.*) và l8th (mã th2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Kiểm chứng: kiem-chung/lop8-9/oracles8b.js */
(()=>{const {add,addH,gn,M,Iq,fg,ng,fq,deg,sv,tx,dot,thales,bis,tp}=G8H,
/* ---------- hình vẽ ---------- */
/* tam giác ABC, M và N là trung điểm của AB và AC */
dtbTri=()=>sv(`<path d="M120 14L40 128H210Z"/><path d="M80 71H165"/>${dot(80,71)}${dot(165,71)}${tx(120,10,'A')}${tx(30,142,'B')}${tx(216,142,'C')}${tx(72,75,'M','end')}${tx(173,75,'N','start')}`),
/* hình thang vuông ABCD: A và D vuông, AB // CD */
trapV=()=>sv(`<path d="M60 30H150L210 120H60Z"/><path d="M72 30V42H60M60 108H72V120"/>${tx(52,26,'A','end')}${tx(156,26,'B','start')}${tx(216,132,'C','start')}${tx(52,134,'D','end')}`),
/* hình thang cân ABCD, AB // CD, đường cao AH */
trapC=()=>sv(`<path d="M85 30H155L210 120H30Z"/><path d="M85 30V120" stroke-dasharray="4 3"/><path d="M85 108H97V120"/>${dot(85,120)}${tx(80,26,'A','end')}${tx(160,26,'B','start')}${tx(216,132,'C','start')}${tx(24,132,'D','end')}${tx(85,138,'H')}`),
/* hình thang ABCD (AB // CD), hai đường chéo cắt nhau tại O (O chia AC, BD theo tỉ lệ AB : CD = 80 : 190) */
trapO=()=>sv(`<path d="M80 30H160L215 120H25Z"/><path d="M80 30L215 120M160 30L25 120"/>${dot(120,56.7)}${tx(74,26,'A','end')}${tx(166,26,'B','start')}${tx(222,132,'C','start')}${tx(18,132,'D','end')}${tx(128,52,'O','start')}`),
/* hình thang ABCD, qua O kẻ MN // AB (M thuộc AD, N thuộc BC) */
trapMN=()=>sv(`<path d="M80 30H160L215 120H25Z"/><path d="M80 30L215 120M160 30L25 120"/><path d="M63.7 56.7H176.3" style="stroke:#feca57"/>${dot(120,56.7)}${dot(63.7,56.7)}${dot(176.3,56.7)}${tx(74,26,'A','end')}${tx(166,26,'B','start')}${tx(222,132,'C','start')}${tx(18,132,'D','end')}${tx(57,61,'M','end')}${tx(183,61,'N','start')}${tx(122,48,'O','start')}`),
/* tứ giác ABCD với trung điểm M, N, P, Q của AB, BC, CD, DA */
quadMid=()=>sv(`<path d="M40 40L170 20L215 110L70 130Z"/><path d="M105 30L192.5 65L142.5 120L55 85Z" style="stroke:#feca57"/>${tx(32,36,'A','end')}${tx(172,15,'B','start')}${tx(221,114,'C','start')}${tx(64,143,'D','end')}${tx(105,22,'M')}${tx(200,64,'N','start')}${tx(144,134,'P','start')}${tx(46,86,'Q','end')}`),
nzc=(m=6)=>{let v;do v=R(-m,m);while(!v);return v},
tri=(x,y,z)=>x+y>z&&x+z>y&&y+z>x,   /* ba cạnh lập được tam giác */
D=v=>ng(v)+'°';

/* ================= TỨ GIÁC · CƠ BẢN ================= */
add('l8tg',
gn('tg2.ti_le_goc',()=>{const L=P([[1,2,3,4],[1,2,4,5],[1,2,3,3],[1,3,5,6],[2,3,6,7],[1,2,3,6],[3,4,5,6],[1,1,2,4],[2,3,4,6],[1,3,4,4],[1,1,3,5],[2,2,3,5],[1,2,6,9],[2,3,5,8],[3,3,4,5],[2,4,5,9],[1,3,6,8]]),s=L.reduce((a,b)=>a+b,0);if(360%s)throw 0;
 const k=360/s,big=R(0,1),r=big?Math.max(...L):Math.min(...L);
 return[Iq(`Tứ giác ABCD có số đo các góc ∠A, ∠B, ∠C, ∠D tỉ lệ với ${L.join(' : ')}. Số đo góc ${big?'lớn nhất':'nhỏ nhất'} của tứ giác là bao nhiêu độ?`,k*r,
  [`Tổng bốn góc của tứ giác bằng 360°. Tổng các phần tỉ lệ là ${L.join(' + ')} = ${s} phần.`,`Mỗi phần ứng với 360° : ${s} = ${k}°.`,`Góc ${big?'lớn nhất':'nhỏ nhất'} ứng với ${r} phần, nên bằng ${r}·${k}° = ${k*r}°.`]),[L,big]]}),
gn('tg2.goc_ngoai',()=>{let A,B,C,Dd;do{A=R(55,125);B=R(55,125);C=R(55,125);Dd=360-A-B-C}while(Dd<50||Dd>130);
 const x=180-A,y=180-B,z=180-C;
 return[Iq(`Tứ giác ABCD có các góc ngoài (góc kề bù với góc của tứ giác) tại đỉnh A, B, C lần lượt bằng ${x}°, ${y}°, ${z}°. Số đo ∠D của tứ giác là bao nhiêu độ?`,Dd,
  [`Góc trong và góc ngoài tại cùng một đỉnh kề bù nên cộng lại bằng 180°. Do đó ∠A = 180° − ${x}° = ${A}°; ∠B = 180° − ${y}° = ${B}°; ∠C = 180° − ${z}° = ${C}°.`,
   `Tổng bốn góc của tứ giác bằng 360°, nên ∠D = 360° − (${A}° + ${B}° + ${C}°).`,`∠D = 360° − ${A+B+C}° = ${Dd}°.`]),[x,y,z]]}),
gn('tg2.thang_can_goc',()=>{const al=R(55,85),t=P(['A','B','C','D']),obt=R(0,1),giv=obt?'A':'D',g=obt?180-al:al,
 ask=P(['A','B','C','D'].filter(v=>v!=giv)),val={A:obt?g:180-g,B:obt?g:180-g,C:obt?180-g:g,D:obt?180-g:g}[ask],gv=g;
 const same={A:'B',B:'A',C:'D',D:'C'},sup=(u,v)=>`∠${u} + ∠${v} = 180°`;
 const D1=ask==same[giv]?`Hình thang cân có hai góc kề một đáy bằng nhau, nên ∠${ask} = ∠${giv} = ${gv}°.`:`Hai góc kề một cạnh bên của hình thang (AB // CD) bù nhau: ${sup(giv,ask)}, nên ∠${ask} = 180° − ${gv}° = ${180-gv}°.`;
 const ans=val;
 return[M(`Hình thang cân ABCD (AB // CD) có ∠${giv} = ${gv}°. Số đo ∠${ask} là`,ans,[gv,180-gv,360-2*gv,90,gv+10,gv-10],
  [`Trong hình thang cân ABCD (AB // CD), các góc ở đáy bằng nhau: ∠A = ∠B và ∠C = ∠D.`,D1,
   ask==same[giv]?`Vậy ∠${ask} = ${ans}°.`:`Vậy ∠${ask} = ${ans}°.`],'',deg),[giv,gv,ask]]}),
gn('tg2.thang_can_chu_vi',()=>{const a=R(3,12),b=a+R(2,12),c=R(Math.ceil((b-a)/2)+1,Math.ceil((b-a)/2)+9),t=R(0,1),P0=a+b+2*c;
 return[t==0?Iq(`Hình thang cân ABCD (AB // CD) có hai đáy AB = ${a} cm, CD = ${b} cm và cạnh bên AD = ${c} cm. Chu vi hình thang là bao nhiêu cm?`,P0,
   [`Hình thang cân có hai cạnh bên bằng nhau: BC = AD = ${c} cm.`,`Chu vi = AB + BC + CD + DA = ${a} + ${c} + ${b} + ${c} = ${P0} (cm).`]):
  Iq(`Hình thang cân ABCD (AB // CD) có chu vi ${P0} cm, hai đáy AB = ${a} cm và CD = ${b} cm. Độ dài cạnh bên AD là bao nhiêu cm?`,c,
   [`Hình thang cân có hai cạnh bên bằng nhau nên chu vi = AB + CD + 2·AD.`,`Suy ra 2·AD = ${P0} − ${a} − ${b} = ${2*c}, do đó AD = ${c} cm.`]),[a,b,c,t]]}),
gn('tg2.hbh_cheo',()=>{const t=R(0,2);
 if(t==0){const p=R(3,12),q=R(3,12);return[Iq(`Hình bình hành ABCD có hai đường chéo cắt nhau tại O. Biết AC = ${2*p} cm và BD = ${2*q} cm. Tính OA + OB (cm).`,p+q,
  [`Trong hình bình hành, hai đường chéo cắt nhau tại trung điểm của mỗi đường.`,`Do đó OA = AC : 2 = ${p} cm và OB = BD : 2 = ${q} cm.`,`OA + OB = ${p} + ${q} = ${p+q} (cm).`]),[0,2*p,2*q]]}
 if(t==1){const p=R(3,12),q=R(3,12);return[Iq(`Hình bình hành ABCD có hai đường chéo cắt nhau tại O. Biết OA = ${p} cm và OB = ${q} cm. Tính tổng AC + BD (cm).`,2*(p+q),
  [`Trong hình bình hành, O là trung điểm của AC và BD nên AC = 2·OA = ${2*p} cm và BD = 2·OB = ${2*q} cm.`,`AC + BD = ${2*p} + ${2*q} = ${2*(p+q)} (cm).`]),[1,p,q]]}
 const a=R(5,15),b=R(5,15);return[Iq(`Hình bình hành ABCD có chu vi ${2*(a+b)} cm và AB = ${a} cm. Độ dài cạnh AD là bao nhiêu cm?`,b,
  [`Nửa chu vi hình bình hành là AB + AD = ${2*(a+b)} : 2 = ${a+b} (cm).`,`Suy ra AD = ${a+b} − ${a} = ${b} (cm).`]),[2,a,b]]}),
gn('tg2.hcn_tt',()=>{const t=R(0,2),k=R(2,12);
 if(t==0)return[Iq(`Tam giác ABC vuông tại A có BC = ${2*k} cm. Gọi M là trung điểm của BC. Độ dài đường trung tuyến AM là bao nhiêu cm?`,k,
  [`Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.`,`Tam giác ABC vuông tại A nên cạnh huyền là BC. Vậy AM = BC : 2 = ${2*k} : 2 = ${k} (cm).`]),[0,k]];
 if(t==1)return[Iq(`Tam giác ABC vuông tại A, đường trung tuyến AM (M thuộc BC) dài ${k} cm. Độ dài cạnh huyền BC là bao nhiêu cm?`,2*k,
  [`Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.`,`Do đó BC = 2·AM = 2·${k} = ${2*k} (cm).`]),[1,k]];
 return[Iq(`Hình chữ nhật ABCD có hai đường chéo cắt nhau tại O. Biết OA = ${k} cm. Độ dài đường chéo BD là bao nhiêu cm?`,2*k,
  [`Trong hình chữ nhật, hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường nên OA = OB = OC = OD = ${k} cm.`,`BD = OB + OD = ${k} + ${k} = ${2*k} (cm).`]),[2,k]]}),
gn('tg2.tim_x_goc',()=>{const x=R(48,65),rem=360-5*x,a=R(Math.max(5,rem-60),Math.min(60,rem-5)),b=rem-a;if(b<5||b>60)throw 0;
 return[Iq(`Tứ giác ABCD có ∠A = x°, ∠B = (x + ${a})°, ∠C = 2x° và ∠D = (x + ${b})°. Tìm x.`,x,
  [`Tổng bốn góc của tứ giác bằng 360°: x + (x + ${a}) + 2x + (x + ${b}) = 360.`,`Gộp lại: 5x + ${a+b} = 360, suy ra 5x = ${360-a-b}.`,`Vậy x = ${360-a-b} : 5 = ${x}.`]),[x,a,b]]}));

/* ================= TỨ GIÁC · NÂNG CAO ================= */
addH('l8tg',
gn('tg2.phan_giac_cid',()=>{let a,b;do{a=R(60,125);b=R(60,125)}while((a+b)%2);
 return[Iq(`Tứ giác ABCD có ∠A = ${a}° và ∠B = ${b}°. Các tia phân giác của ∠C và ∠D cắt nhau tại I. Tính số đo ∠CID (độ).`,(a+b)/2,
  [`Tổng bốn góc của tứ giác bằng 360° nên ∠C + ∠D = 360° − ${a}° − ${b}° = ${360-a-b}°.`,
   `CI và DI là các tia phân giác nên ∠ICD + ∠IDC = (∠C + ∠D) : 2 = ${(360-a-b)/2}°.`,
   `Trong tam giác CID: ∠CID = 180° − ${(360-a-b)/2}° = ${(a+b)/2}°.`]),[a,b]]}),
gn('tg2.hbh_pg',()=>{const t=R(0,1);let a=R(4,10),b=R(4,10);while(a==b)b=R(4,10);
 if(t==0){if(b<a)[a,b]=[b,a];return[Iq(`Hình bình hành ABCD có AB = ${a} cm, AD = ${b} cm. Tia phân giác của ∠A cắt cạnh BC tại E. Tính độ dài EC (cm).`,b-a,
  [`AD // BC nên ∠AEB = ∠DAE (so le trong). Mà ∠DAE = ∠BAE (AE là phân giác) nên ∠AEB = ∠BAE.`,`Tam giác ABE có hai góc bằng nhau nên cân tại B: BE = AB = ${a} cm.`,`BC = AD = ${b} cm nên EC = BC − BE = ${b} − ${a} = ${b-a} (cm).`]),[0,a,b]]}
 if(a<b)[a,b]=[b,a];return[Iq(`Hình bình hành ABCD có AB = ${a} cm, AD = ${b} cm. Tia phân giác của ∠A cắt cạnh CD tại F. Tính độ dài FC (cm).`,a-b,
  [`AB // CD nên ∠AFD = ∠FAB (so le trong). Mà ∠FAB = ∠DAF (AF là phân giác) nên ∠AFD = ∠DAF.`,`Tam giác ADF có hai góc bằng nhau nên cân tại D: DF = AD = ${b} cm.`,`CD = AB = ${a} cm nên FC = CD − DF = ${a} − ${b} = ${a-b} (cm).`]),[1,a,b]]}),
gn('tg2.thang_vuong',()=>{const [u,v,r]=tp(4,3),h=P([u,v]),q=h==u?v:u,a=R(3,10),b=a+q;
 return[fg(Iq(`Hình thang vuông ABCD (∠A = ∠D = 90°, AB // CD) có AB = ${a} cm, CD = ${b} cm và AD = ${h} cm. Tính độ dài cạnh bên BC (cm).`,r,
  [`Kẻ BH vuông góc với CD (H thuộc CD). Khi đó ABHD là hình chữ nhật nên BH = AD = ${h} cm và DH = AB = ${a} cm.`,`HC = CD − DH = ${b} − ${a} = ${q} cm.`,`Tam giác BHC vuông tại H: BC^2 = BH^2 + HC^2 = ${h}^2 + ${q}^2 = ${h*h+q*q}, nên BC = ${r} cm.`]),trapV()),[a,b,h]]}),
gn('tg2.thang_can_cao',()=>{const [u,v,r]=tp(4,3),h=P([u,v]),q=h==u?v:u,a=R(3,10),b=a+2*q;
 return[fg(Iq(`Hình thang cân ABCD (AB // CD) có AB = ${a} cm, CD = ${b} cm và cạnh bên AD = BC = ${r} cm. Tính chiều cao AH của hình thang (cm), với H thuộc CD.`,h,
  [`Kẻ thêm đường cao BK (K thuộc CD). Hình thang cân nên DH = KC, và HK = AB = ${a} cm.`,`DH = (CD − AB) : 2 = (${b} − ${a}) : 2 = ${q} cm.`,`Tam giác AHD vuông tại H: AH^2 = AD^2 − DH^2 = ${r}^2 − ${q}^2 = ${r*r-q*q}, nên AH = ${h} cm.`]),trapC()),[a,b,r]]}));

/* ================= ĐỊNH LÍ THALÈS · CƠ BẢN ================= */
add('l8th',
gn('th2.dtb_canh',()=>{const k=R(3,15),t=R(0,1);
 return[fg(t==0?Iq(`Cho tam giác ABC, M và N lần lượt là trung điểm của AB và AC. Biết BC = ${2*k} cm. Tính độ dài MN (cm).`,k,
  [`MN nối trung điểm hai cạnh AB và AC nên là đường trung bình của tam giác ABC.`,`Đường trung bình song song với cạnh thứ ba và bằng nửa cạnh đó: MN = BC : 2 = ${2*k} : 2 = ${k} (cm).`]):
  Iq(`Cho tam giác ABC, M và N lần lượt là trung điểm của AB và AC. Biết MN = ${k} cm. Tính độ dài BC (cm).`,2*k,
  [`MN nối trung điểm hai cạnh AB và AC nên là đường trung bình của tam giác ABC.`,`Đường trung bình bằng nửa cạnh thứ ba nên BC = 2·MN = 2·${k} = ${2*k} (cm).`]),dtbTri()),[t,k]]}),
gn('th2.dtb_chu_vi',()=>{const t=R(0,2);
 if(t==0){let a,b,c;do{a=R(3,12)*2;b=R(3,12)*2;c=R(3,12)*2}while(!tri(a,b,c));return[Iq(`Tam giác ABC có AB = ${a} cm, BC = ${b} cm, CA = ${c} cm. Gọi D, E, F lần lượt là trung điểm của BC, CA, AB. Tính chu vi tam giác DEF (cm).`,(a+b+c)/2,
  [`DE, EF, FD là các đường trung bình của tam giác ABC nên DE = AB : 2 = ${a/2} cm; EF = BC : 2 = ${b/2} cm; FD = CA : 2 = ${c/2} cm.`,`Chu vi tam giác DEF = ${a/2} + ${b/2} + ${c/2} = ${(a+b+c)/2} (cm), bằng nửa chu vi tam giác ABC.`]),[0,a,b,c]]}
 if(t==1){const x=R(3,12),y=R(3,12),z=R(3,12);return[Iq(`Tam giác ABC có D, E, F lần lượt là trung điểm của BC, CA, AB. Biết DE = ${x} cm, EF = ${y} cm, FD = ${z} cm. Tính chu vi tam giác ABC (cm).`,2*(x+y+z),
  [`DE, EF, FD là các đường trung bình nên AB = 2·DE = ${2*x} cm; BC = 2·EF = ${2*y} cm; CA = 2·FD = ${2*z} cm.`,`Chu vi tam giác ABC = ${2*x} + ${2*y} + ${2*z} = ${2*(x+y+z)} (cm).`]),[1,x,y,z]]}
 const x=R(3,15);return[Iq(`Tam giác ABC có D, E lần lượt là trung điểm của BC và CA. Biết DE = ${x} cm. Tính độ dài cạnh AB (cm).`,2*x,
  [`DE nối trung điểm hai cạnh BC và CA nên là đường trung bình của tam giác ABC, song song với AB.`,`Do đó DE = AB : 2, suy ra AB = 2·DE = 2·${x} = ${2*x} (cm).`]),[2,x]]}),
gn('th2.thales_nc',()=>{const q=P([2,3,4,5]),p=R(1,q-1),u=R(2,4),v=R(2,5),a=q*u,m=p*u,c=q*v,an=p*v,nc=c-an;
 return[fg(Iq(`Cho tam giác ABC, M thuộc AB, N thuộc AC sao cho MN // BC. Biết AB = ${a} cm, AM = ${m} cm, AC = ${c} cm. Tính độ dài NC (cm).`,nc,
  [`MN // BC nên theo định lí Thalès: AM/AB = AN/AC, tức ${m}/${a} = AN/${c}.`,`Suy ra AN = ${m}·${c} : ${a} = ${an} (cm).`,`NC = AC − AN = ${c} − ${an} = ${nc} (cm).`]),thales()),[a,m,c]]}),
gn('th2.chia_ti_so',()=>{const p=R(1,5),q=R(1,5),k=R(2,8),a=(p+q)*k,t=R(0,1);if(p==q)throw 0;
 return[Iq(`Điểm M thuộc đoạn thẳng AB dài ${a} cm sao cho AM : MB = ${p} : ${q}. Tính độ dài ${t?'MB':'AM'} (cm).`,(t?q:p)*k,
  [`Vì AM : MB = ${p} : ${q} nên AM = ${p} phần, MB = ${q} phần và AB gồm ${p} + ${q} = ${p+q} phần bằng nhau.`,`Mỗi phần dài ${a} : ${p+q} = ${k} cm.`,`${t?'MB':'AM'} = ${t?q:p}·${k} = ${(t?q:p)*k} (cm).`]),[a,p,q,t]]}),
gn('th2.thales_hinh_thang',()=>{let r=R(1,5),s=R(1,5);while(r==s||gcd(r,s)!=1){r=R(1,5);s=R(1,5)}const u=R(2,4),v=R(2,5),a=s*u,b=r*u,oa=s*v,oc=r*v;
 return[fg(Iq(`Hình thang ABCD (AB // CD) có hai đường chéo AC, BD cắt nhau tại O. Biết AB = ${a} cm, CD = ${b} cm và OA = ${oa} cm. Tính độ dài OC (cm).`,oc,
  [`AB // CD nên theo hệ quả của định lí Thalès: OA/OC = AB/CD, tức ${oa}/OC = ${a}/${b}.`,`Suy ra OC = ${oa}·${b} : ${a} = ${oc} (cm).`]),trapO()),[a,b,oa]]}),
gn('th2.pg_tim_ac',()=>{let r,s,k,m;do{r=R(1,6);s=R(1,6);k=R(1,3);m=R(2,4)}while(r==s||gcd(r,s)!=1||!tri(r*m,s*m,k*(r+s)));const bd=r*k,dc=s*k,ab=r*m,ac=s*m;
 return[fg(Iq(`Tam giác ABC có AD là đường phân giác (D thuộc BC). Biết AB = ${ab} cm, BD = ${bd} cm, DC = ${dc} cm. Tính độ dài AC (cm).`,ac,
  [`AD là phân giác của ∠A nên AB/AC = BD/DC (tính chất đường phân giác).`,`Thay số: ${ab}/AC = ${bd}/${dc}, suy ra AC = ${ab}·${dc} : ${bd} = ${ac} (cm).`]),bis()),[ab,bd,dc]]}));

/* ================= ĐỊNH LÍ THALÈS · NÂNG CAO ================= */
addH('l8th',
gn('th2.mn_qua_O',()=>{const c=[];for(let a=2;a<=36;a++)for(let b=a+1;b<=72;b++)if((2*a*b)%(a+b)==0)c.push([a,b]);const [a,b]=P(c),mn=2*a*b/(a+b);
 return[fg(Iq(`Hình thang ABCD (AB // CD) có AB = ${a} cm, CD = ${b} cm. Hai đường chéo cắt nhau tại O. Qua O kẻ đường thẳng song song với AB, cắt AD tại M và cắt BC tại N. Tính độ dài MN (cm).`,mn,
  [`AB // CD nên OA/OC = AB/CD = ${a}/${b}, suy ra OA/AC = ${a}/${a+b}.`,`Trong tam giác ADC có MO // DC nên MO/DC = AO/AC = ${a}/${a+b}, suy ra MO = ${b}·${a} : ${a+b} = ${fq(a*b,a+b)} (cm).`,
   `Chứng minh tương tự ON = ${fq(a*b,a+b)} cm. Vậy MN = MO + ON = 2·${fq(a*b,a+b)} = ${mn} (cm).`]),trapMN()),[a,b]]}),
gn('th2.pg_hieu',()=>{let a,b,k,m;do{a=R(2,8);b=R(1,7);k=R(1,4);m=R(2,5)}while(b>=a||gcd(a,b)!=1||k>=m||!tri(a*m,b*m,k*(a+b)));
 const ab=a*m,ac=b*m,c=k*(a+b),bd=k*a,dc=k*b;
 return[fg(Iq(`Tam giác ABC có AB = ${ab} cm, AC = ${ac} cm, BC = ${c} cm. Đường phân giác AD (D thuộc BC) chia BC thành hai đoạn BD và DC. Tính BD − DC (cm).`,bd-dc,
  [`AD là phân giác nên BD/DC = AB/AC = ${ab}/${ac} = ${a}/${b}, tức BD/${a} = DC/${b}.`,`Theo tính chất dãy tỉ số bằng nhau: BD/${a} = DC/${b} = (BD + DC)/(${a} + ${b}) = ${c}/${a+b} = ${k}.`,`BD = ${a}·${k} = ${bd} cm; DC = ${b}·${k} = ${dc} cm. Vậy BD − DC = ${bd} − ${dc} = ${bd-dc} (cm).`]),bis()),[ab,ac,c]]}),
gn('th2.tu_giac_trung_diem',()=>{const p=2*R(3,12),q=2*R(3,12);
 return[fg(Iq(`Tứ giác ABCD có AC = ${p} cm, BD = ${q} cm. Gọi M, N, P, Q lần lượt là trung điểm của AB, BC, CD, DA. Tính chu vi tứ giác MNPQ (cm).`,p+q,
  [`MN là đường trung bình của tam giác ABC nên MN = AC : 2 = ${p/2} cm; tương tự PQ là đường trung bình của tam giác ACD nên PQ = AC : 2 = ${p/2} cm.`,
   `NP và QM là các đường trung bình của các tam giác BCD và ABD nên NP = QM = BD : 2 = ${q/2} cm.`,
   `Chu vi MNPQ = 2·${p/2} + 2·${q/2} = ${p} + ${q} = ${p+q} (cm).`]),quadMid()),[p,q]]}));
})();
