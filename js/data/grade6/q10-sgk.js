/* LỚP 6 · v6 (phần 4) — Bổ sung theo tài liệu "Chuyên đề học tập Toán 6" (Lê Minh Kha, chương trình mới): tập hợp, số tự nhiên, chia hết,
   số nguyên, hình phẳng, tính đối xứng. Ưu tiên các chủ đề còn ít dạng: ước & bội, ƯCLN – BCNN, tính đối xứng.
   Mỗi câu: 3 đáp án nhiễu là lỗi hay gặp (kèm lý do hiện ở "Vì sao đáp án em chọn chưa đúng?") + lời giải từng bước.
   q.k + q.p dùng cho kiem-chung/lop6-sgk/verify.js. */
(()=>{
const {mc,sol,gen,ov,fd,ng,lcm}=BK,
 st=a=>'{'+a.map(ng).join('; ')+'}',
 pf=n=>{const m=new Map();for(let p=2;p*p<=n;p++)while(n%p==0){m.set(p,(m.get(p)||0)+1);n/=p}if(n>1)m.set(n,(m.get(n)||0)+1);return m},
 fx=m=>m.size?[...m].sort((a,b)=>a[0]-b[0]).map(([p,e])=>e>1?`${p}^${e}`:`${p}`).join(' × '):'1',
 divs=n=>{const r=[];for(let d=1;d<=n;d++)if(n%d==0)r.push(d);return r},
 cm=v=>fd(v)+' cm', cm2=v=>fd(v)+' cm²',
 gcd3=(a,b,c)=>gcd(gcd(a,b),c), lcm3=(a,b,c)=>lcm(lcm(a,b),c),
 addEx=(u,v)=>{const s=u+v,au=Math.abs(u),av=Math.abs(v);
  if(s==0)return `Hai số đối nhau nên tổng bằng 0.`;
  if(u==0||v==0)return `Cộng với 0 thì giữ nguyên: ${pa(u)} + ${pa(v)} = ${ng(s)}.`;
  if((u<0)==(v<0))return `Hai số cùng dấu ${u<0?'âm':'dương'}: cộng hai giá trị tuyệt đối ${au} + ${av} = ${au+av}, rồi giữ dấu chung: ${ng(s)}.`;
  return `Hai số khác dấu: lấy giá trị tuyệt đối lớn trừ giá trị tuyệt đối bé: ${Math.max(au,av)} − ${Math.min(au,av)} = ${Math.abs(s)}, rồi lấy dấu của số có giá trị tuyệt đối lớn hơn (${pa(au>av?u:v)}): kết quả ${ng(s)}.`};

/* ================= TẬP HỢP ================= */
A('set',
gen('set.thuoc',()=>{
 const pl=sh([2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]),a=pl.slice(0,4).sort((x,y)=>x-y),o=pl[4],e0=P(a),e1=P(a.filter(x=>x!=e0)),
 e=sol([`Ký hiệu ∈ đọc là “thuộc”, ∉ đọc là “không thuộc”; chúng chỉ dùng giữa một phần tử và một tập hợp.`,`Các phần tử của A là ${a.join('; ')}.`,`${e0} có trong A nên viết ${e0} ∈ A là đúng.`],`${e0} ∈ A.`,`Không viết {${e0}} ∈ A vì {${e0}} là một tập hợp, không phải một phần tử.`);
 return[mc(`Cho tập hợp A = ${st(a)}. Cách viết nào sau đây đúng?`,`${e0} ∈ A`,[[`${o} ∈ A`,`${o} không có trong A nên không thể viết ${o} ∈ A`],[`${e1} ∉ A`,`${e1} là một phần tử của A nên phải viết ${e1} ∈ A`],[`{${e0}} ∈ A`,`{${e0}} là một tập hợp, không phải một phần tử; ký hiệu ∈ chỉ dùng cho phần tử`]],e),[a,e0]]}),

gen('set.dem_phantu',()=>{
 const a=R(3,40),b=a+R(4,25),t=R(0,3),L=t==1||t==3,Rr=t>=2,lo=L?a+1:a,hi=Rr?b-1:b,n=hi-lo+1,
 e=sol([`Các số tự nhiên x thỏa mãn điều kiện là ${lo}; ${lo+1}; …; ${hi}.`,`Số phần tử = (số lớn nhất − số nhỏ nhất) + 1 = (${hi} − ${lo}) + 1 = ${n}.`],`${n} phần tử.`,`Phải cộng thêm 1 vì đếm cả hai đầu; và để ý dấu &lt; hay ≤ ở mỗi đầu: dấu &lt; thì không lấy số đó.`);
 return[mc(`Tập hợp A = {x ∈ ℕ | ${a} ${L?'&lt;':'≤'} x ${Rr?'&lt;':'≤'} ${b}} có bao nhiêu phần tử?`,n,[[b-a,'chỉ lấy hiệu hai đầu mút, quên cộng 1'],[n+1,'đếm thừa một số không thuộc tập hợp'],[n-1,'bỏ sót một phần tử']],e),[a,b,t]]}),

gen('set.chu_cai',()=>{
 const W=['HOC SINH','TOAN HOC','THANH HOA','NHA TRANG','BAC NINH','HAI PHONG','HOC HANH','MA TRAN','DA NANG','HA NOI','LAM SON','VIET NAM','CAN THO'],
 ok=W.filter(w=>{const l=[...w].filter(c=>c!=' ');return l.length>new Set(l).size}),w=P(ok),l=[...w].filter(c=>c!=' '),u=[...new Set(l)],
 e=sol([`Liệt kê các chữ cái của từ “${w}”: ${l.join(', ')}.`,`Trong một tập hợp, mỗi phần tử chỉ viết một lần nên chữ cái lặp lại chỉ tính một lần.`,`Các phần tử khác nhau là ${u.join('; ')}: có ${u.length} phần tử.`],`${u.length} phần tử.`,`Không đếm dấu cách và không đếm lặp các chữ cái giống nhau.`);
 return[mc(`Gọi X là tập hợp các chữ cái trong từ “${w}”. Tập hợp X có bao nhiêu phần tử?`,u.length,[[l.length,'đếm cả các chữ cái lặp lại, trong khi mỗi phần tử chỉ viết một lần'],[l.length+1,'đếm cả dấu cách và các chữ cái lặp lại'],[u.length-1,'bỏ sót một chữ cái']],e),[w]]})
);
HA('set',
gen('set.dem_boi',()=>{
 const k=R(3,9),a=R(10,60),b=a+k*R(5,12)+R(0,k-1),m1=Math.ceil(a/k)*k,m2=Math.floor(b/k)*k,n=(m2-m1)/k+1,
 e=sol([`Số nhỏ nhất chia hết cho ${k} mà không nhỏ hơn ${a} là ${m1}; số lớn nhất chia hết cho ${k} mà không lớn hơn ${b} là ${m2}.`,`Các số đó cách đều nhau ${k} đơn vị nên số phần tử = (${m2} − ${m1}) : ${k} + 1 = ${n}.`],`${n} phần tử.`,`Nhớ cộng 1, và đầu mút chỉ tính khi nó chia hết cho ${k}.`);
 return[mc(`Tập hợp A gồm các số tự nhiên x chia hết cho ${k} và thỏa mãn ${a} ≤ x ≤ ${b}. A có bao nhiêu phần tử?`,n,[[Math.floor((b-a)/k),'lấy (b − a) : k, quên cộng 1 và chưa xét đầu mút'],[n+1,'đếm thừa một số'],[n-1,'bỏ sót một số']],e),[k,a,b]]})
);

/* ================= SỐ TỰ NHIÊN ================= */
A('nat',
gen('nat.chuso',()=>{
 const d=sh([1,2,3,4,5,6,7,8,9]).slice(0,5),n=+d.join(''),idx=R(0,4),pos=4-idx,dg=d[idx],names=['hàng đơn vị','hàng chục','hàng trăm','hàng nghìn','hàng chục nghìn'],v=dg*10**pos,
 e=sol([`Đánh số hàng từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn.`,`Trong số ${n}, chữ số ${dg} đứng ở ${names[pos]}.`,`Giá trị của nó là ${dg} × ${10**pos} = ${v}.`],`${v}.`,`Giá trị của một chữ số phụ thuộc vào hàng mà nó đứng, không chỉ là chính chữ số đó.`);
 return[mc(`Trong số ${n}, chữ số ${dg} có giá trị là:`,v,[[dg,'chỉ lấy chữ số mà quên nhân với giá trị của hàng'],[dg*10**(pos+1),'nhầm sang hàng cao hơn một bậc'],[pos>0?dg*10**(pos-1):dg*10,pos>0?'nhầm sang hàng thấp hơn một bậc':'nhầm sang hàng chục']],e),[n,dg]]}),

gen('nat.la_ma',()=>{
 const n=P([4,9,14,19,24,29,34,39]),r=rom(n),V={I:1,V:5,X:10},add=[...r].reduce((s,c)=>s+V[c],0),
 e=sol([`Giá trị các chữ số La Mã: I = 1, V = 5, X = 10.`,`Số nhỏ đứng trước số lớn (IV, IX) thì lấy số lớn trừ số nhỏ: ${n%10==4?'IV = 5 − 1 = 4':'IX = 10 − 1 = 9'}.`,`${r} = ${n-n%10} + ${n%10} = ${n}.`],`${n}.`,`Chỉ có I đứng bên trái V hoặc X mới phải trừ; cộng tất cả các chữ số là sai.`);
 return[mc(`Số La Mã ${r} có giá trị bằng:`,n,[[add,'cộng cả I vào V (hoặc X); I đứng trước thì phải trừ đi 1'],[n+10,'đọc nhầm thêm một chữ X'],[n+5,'đọc thêm một chữ V']],e),[n]]}),

gen('nat.xe_cho',()=>{
 const b=P([20,25,30,35,40,45,50]),q=R(2,9),r=R(1,b-1),a=b*q+r,
 e=sol([`Chia ${a} cho ${b}: ${a} = ${b} × ${q} + ${r}, được ${q} xe đầy và còn dư ${r} học sinh.`,`${r} học sinh còn lại vẫn phải đi xe nên cần thêm 1 xe.`,`Số xe cần ít nhất là ${q} + 1 = ${q+1}.`],`${q+1} xe.`,`Phép chia có dư mà vẫn còn người thì phải cộng thêm một xe, không bỏ phần dư.`);
 return[mc(`Có ${a} học sinh đi tham quan, mỗi xe ô tô chở tối đa ${b} học sinh. Cần ít nhất bao nhiêu xe để chở hết?`,q+1,[[q,`bỏ phần dư: còn ${r} học sinh chưa có xe`],[q+2,'thừa một xe, không phải ít nhất'],[r,'lấy số dư làm số xe']],e),[a,b]]}),

gen('nat.nhom_cong',()=>{
 const s1=P([100,200,500]),s2=P([100,1000]),a=R(11,s1-11),b=R(11,s2-11),c=s1-a,d=s2-b,o=sh([a,b,c,d]),ans=s1+s2,
 e=sol([`Tìm các cặp số có tổng tròn: ${a} + ${c} = ${s1} và ${b} + ${d} = ${s2}.`,`Nhóm lại: (${a} + ${c}) + (${b} + ${d}) = ${s1} + ${s2}.`,`Kết quả: ${ans}.`],`${ans}.`,`Nhóm các số có tổng tròn trăm/nghìn trước rồi mới cộng, đỡ nhầm hàng.`);
 return[mc(`Tính nhanh: ${o.join(' + ')}`,ans,[[ans+10,'cộng nhầm hàng chục'],[ans-10,'cộng nhầm hàng chục'],[ans+100,'cộng nhầm hàng trăm']],e),[a,b,c,d]]}),

gen('nat.nhom_nhan',()=>{
 const [p,q]=P([[25,4],[125,8],[50,2],[20,5],[250,4],[5,2]]),x=R(12,99),pr=p*q,o=sh([p,x,q]),ans=pr*x,
 e=sol([`Hai thừa số ${p} và ${q} nhân nhau được số tròn: ${p} × ${q} = ${pr}.`,`Đổi chỗ, kết hợp: (${p} × ${q}) × ${x} = ${pr} × ${x}.`,`Kết quả: ${ans}.`],`${ans}.`,`Nhân với ${pr} thì viết thêm ${String(pr).length-1} chữ số 0 vào bên phải (sau khi nhân ${x}).`);
 return[mc(`Tính nhanh: ${o.join(' × ')}`,ans,[[ans*10,'thừa một chữ số 0'],[ans/10,'thiếu một chữ số 0'],[pr+x,'cộng thay vì nhân']],e),[p,q,x]]}),

gen('nat.timx4',()=>{
 const t=R(0,3),a=R(11,60),b=R(11,60);let q,ans,w,s;
 if(t==0){q=`x − ${a} = ${b}`;ans=a+b;w=[[Math.abs(a-b),'trừ thay vì cộng'],[a*b,'nhân thay vì cộng'],[b,'nhầm vế phải là x']];s=[`x là số bị trừ, ${a} là số trừ, ${b} là hiệu.`,`Số bị trừ = hiệu + số trừ.`,`x = ${b} + ${a} = ${ans}.`]}
 else if(t==1){const A2=a+b;q=`${A2} − x = ${b}`;ans=a;w=[[A2+b,'cộng thay vì trừ'],[b,'nhầm vế phải là x'],[A2*b,'nhân thay vì trừ']];s=[`${A2} là số bị trừ, x là số trừ, ${b} là hiệu.`,`Số trừ = số bị trừ − hiệu.`,`x = ${A2} − ${b} = ${ans}.`]}
 else if(t==2){const k=R(2,9),B=R(3,12);q=`${k*B} : x = ${k}`;ans=B;w=[[k*B*k,'nhân thay vì chia'],[k*B-k,'trừ thay vì chia'],[k,'nhầm vế phải là x']];s=[`${k*B} là số bị chia, x là số chia, ${k} là thương.`,`Số chia = số bị chia : thương.`,`x = ${k*B} : ${k} = ${ans}.`]}
 else{const k=R(3,12),B=R(3,12);q=`x : ${k} = ${B}`;ans=k*B;w=[[k+B,'cộng thay vì nhân'],[B,'nhầm vế phải là x'],[k*B-k,'trừ thay vì nhân']];s=[`x là số bị chia, ${k} là số chia, ${B} là thương.`,`Số bị chia = thương × số chia.`,`x = ${B} × ${k} = ${ans}.`]}
 return[mc(`Tìm số tự nhiên x, biết: ${q}`,ans,w,sol(s,`x = ${ans}.`,`Xác định x là số bị trừ, số trừ, số bị chia hay số chia rồi mới chọn phép tính ngược.`)),[t,a,b]]}),

gen('nat.thutu',()=>{
 const t=R(0,2);let s,v,w,st2;
 if(t==0){const A1=R(10,40),B=R(2,9),C=R(2,9),E=R(2,6),D=E*R(2,9);s=`${A1} + ${B} × ${C} − ${D} : ${E}`;v=A1+B*C-D/E;
  w=[[(A1+B)*C-D/E,'cộng trước khi nhân'],[A1+B*C-D*E,'đổi phép chia thành phép nhân'],((A1+B*C-D)%E==0?[(A1+B*C-D)/E,'trừ trước khi chia: phép chia phải làm trước phép trừ']:[A1+B*C-D,'bỏ sót phép chia'])];
  st2=[`Nhân, chia trước: ${B} × ${C} = ${B*C} và ${D} : ${E} = ${D/E}.`,`Biểu thức thành ${A1} + ${B*C} − ${D/E}.`,`Cộng, trừ từ trái sang phải: ${A1+B*C} − ${D/E} = ${v}.`]}
 else if(t==1){const A1=R(2,9),B=R(3,20),C=R(3,20),D=R(5,Math.min(30,A1*(B+C)-1));s=`${A1} × (${B} + ${C}) − ${D}`;v=A1*(B+C)-D;
  w=[[A1*B+C-D,'chỉ nhân A với số hạng đầu trong ngoặc'],[A1*(B+C)+D,'tính nhầm dấu trừ thành dấu cộng'],[A1+B+C-D,'đổi phép nhân thành phép cộng']];
  st2=[`Tính trong ngoặc trước: ${B} + ${C} = ${B+C}.`,`Nhân: ${A1} × ${B+C} = ${A1*(B+C)}.`,`Trừ: ${A1*(B+C)} − ${D} = ${v}.`]}
 else{const A1=R(5,30),B=R(2,5),C=R(2,9);s=`${A1} + ${B}^2 × ${C}`;v=A1+B*B*C;
  w=[[A1+B*2*C,'nhân cơ số với số mũ thay vì nhân hai thừa số '+B],[(A1+B*B)*C,'cộng trước khi nhân'],[(A1+B)**2*C,'bình phương cả tổng '+A1+' + '+B]];
  st2=[`Lũy thừa trước: ${B}^2 = ${B*B}.`,`Nhân: ${B*B} × ${C} = ${B*B*C}.`,`Cộng: ${A1} + ${B*B*C} = ${v}.`]}
 return[mc(`Tính: ${s}`,v,w,sol(st2,`${v}.`,`Thứ tự: ngoặc → lũy thừa → nhân, chia → cộng, trừ.`)),[t,s]]})
);
HA('nat',
gen('nat.khacnhau',()=>{
 const k=R(3,6),mn=R(0,1);let a,w,e;
 if(mn){a=+('10'+'23456789'.slice(0,k-2));w=[[10**(k-1),`đó là số nhỏ nhất có ${k} chữ số nhưng các chữ số chưa khác nhau`],[+'123456789'.slice(0,k),'chưa dùng chữ số 0; chữ số 0 được đứng sau chữ số đầu tiên'],[a+1,'các chữ số khác nhau nhưng chưa phải số nhỏ nhất']];
  e=sol([`Chữ số hàng cao nhất phải khác 0 và nhỏ nhất: chọn 1.`,`Các hàng sau chọn chữ số nhỏ nhất còn lại và chưa dùng: 0, rồi 2, 3, …`,`Ta được số ${a}.`],`${a}.`,`Chữ số 0 không được đứng đầu nhưng vẫn dùng được ở các hàng sau.`)}
 else{a=+'9876543210'.slice(0,k);const s=String(a);w=[[10**k-1,'các chữ số chưa khác nhau'],[+(s.slice(0,k-2)+s[k-1]+s[k-2]),'đổi chỗ hai chữ số cuối làm số nhỏ đi'],[+(s.slice(0,k-1)+(+s[k-1]-1)),'chọn chữ số cuối chưa lớn nhất']];
  e=sol([`Muốn số lớn nhất thì ở các hàng từ cao xuống thấp chọn chữ số lớn nhất còn lại.`,`Chọn lần lượt 9, 8, 7, … (mỗi chữ số dùng một lần) cho ${k} hàng.`,`Ta được số ${a}.`],`${a}.`,`99…9 có chữ số lặp lại nên không thỏa “khác nhau”.`)}
 return[mc(`Số tự nhiên ${mn?'nhỏ nhất':'lớn nhất'} có ${k} chữ số khác nhau là:`,a,w,e),[k,mn]]}),

gen('nat.dem_so',()=>{
 const t=R(0,1);
 if(t==0){const k=R(2,4),n=9*10**(k-1),e=sol([`Số nhỏ nhất có ${k} chữ số là ${10**(k-1)}, số lớn nhất là ${10**k-1}.`,`Số các số = (${10**k-1} − ${10**(k-1)}) + 1 = ${n}.`],`${n} số.`,`Chữ số đầu tiên chỉ có 9 cách chọn (1 đến 9), các hàng sau có 10 cách.`);
  return[mc(`Có bao nhiêu số tự nhiên có ${k} chữ số?`,n,[[10**k,'đếm cả những số có ít hơn '+k+' chữ số'],[9*10**k,'nhầm số mũ'],[10**(k-1),'chỉ đếm các số có chữ số đầu là 1']],e),[t,k]]}
 const n=R(100,300),ans=189+3*(n-99),e=sol([`Từ 1 đến 9: 9 số, mỗi số 1 chữ số, dùng 9 chữ số.`,`Từ 10 đến 99: 90 số, mỗi số 2 chữ số, dùng 180 chữ số.`,`Từ 100 đến ${n}: ${n-99} số, mỗi số 3 chữ số, dùng ${3*(n-99)} chữ số.`,`Tổng: 9 + 180 + ${3*(n-99)} = ${ans}.`],`${ans} chữ số.`,`Các số có số chữ số khác nhau thì phải đếm riêng từng nhóm.`);
 return[mc(`Để viết các số tự nhiên liên tiếp từ 1 đến ${n} cần dùng bao nhiêu chữ số?`,ans,[[3*n,'coi mọi số đều có 3 chữ số'],[189+3*(n-100),'đếm thiếu một số có 3 chữ số'],[198+3*(n-99),'coi các số từ 1 đến 9 cũng có 2 chữ số']],e),[t,n]]})
);

/* ================= LŨY THỪA ================= */
A('pow',
gen('pow.viet_gon',()=>{
 let a,n;do{a=R(2,9);n=R(3,6)}while(a==n);
 const e=sol([`Đếm số thừa số giống nhau: có ${n} thừa số ${a}.`,`Tích của ${n} thừa số ${a} viết là ${a}^${n}, trong đó ${a} là cơ số, ${n} là số mũ.`],`${a}^${n}.`,`Cơ số là số được nhân lặp lại, số mũ là số lần lặp lại; ${a}^${n} khác ${a} × ${n}.`);
 return[mc(`Viết gọn bằng một lũy thừa: ${Array(n).fill(a).join(' × ')}`,`${a}^${n}`,[[`${n}^${a}`,'đổi chỗ cơ số và số mũ'],[`${a} × ${n}`,'đó là phép nhân, không phải lũy thừa'],[`${a}^${n-1}`,'đếm thiếu một thừa số']],e),[a,n]]}),

gen('pow.giatri_tong',()=>{
 let a,b,m,n;do{a=R(2,6);b=R(2,6);m=R(2,4);n=R(2,4)}while(a==b||m==n);
 const v=a**m+b**n,e=sol([`Tính từng lũy thừa: ${a}^${m} = ${a**m} và ${b}^${n} = ${b**n}.`,`Cộng hai kết quả: ${a**m} + ${b**n} = ${v}.`],`${v}.`,`Lũy thừa a^n là nhân n thừa số a, không phải a × n.`);
 return[mc(`Tính: ${a}^${m} + ${b}^${n}`,v,[[a*m+b*n,'nhân cơ số với số mũ thay vì nhân nhiều thừa số'],[a**n+b**m,'đổi chỗ các số mũ'],[a**m*b**n,'nhân thay vì cộng']],e),[a,m,b,n]]}),

gen('pow.cung_coso',()=>{
 const a=R(2,9),m=R(2,6),n=R(2,6),p=R(1,m+n-2),r=m+n-p,
 e=sol([`Nhân cùng cơ số: cộng số mũ: ${a}^${m} × ${a}^${n} = ${a}^${m+n}.`,`Chia cùng cơ số: trừ số mũ: ${a}^${m+n} : ${a}^${p} = ${a}^${m+n-p}.`],`${a}^${r}.`,`Nhân thì cộng số mũ, chia thì trừ số mũ; cơ số giữ nguyên.`);
 return[mc(`Viết kết quả dưới dạng một lũy thừa: ${a}^${m} × ${a}^${n} : ${a}^${p}`,`${a}^${r}`,[[`${a}^${m+n+p}`,'cộng cả số mũ của phép chia'],[`${a}^${m+n}`,'bỏ qua phép chia'],[`${a}^${m*n-p}`,'nhân hai số mũ thay vì cộng']],e),[a,m,n,p]]})
);
HA('pow',
gen('pow.max4',()=>{
 let it;for(let t=0;t<200;t++){const s=new Set(),L=[];while(L.length<4){const a=R(2,9),n=R(2,6),v=a**n;if(v>200000||s.has(v))continue;s.add(v);L.push([a,n,v])}
  it=L;const mx=Math.max(...L.map(x=>x[2]));if(L.filter(x=>x[2]==mx).length==1)break}
 const mx=it.reduce((x,y)=>y[2]>x[2]?y:x),ba=Math.max(...it.map(x=>x[0])),be=Math.max(...it.map(x=>x[1])),
 sx=x=>`${x[0]}^${x[1]}`,
 e=sol([`Tính giá trị từng lũy thừa: ${it.map(x=>`${sx(x)} = ${x[2]}`).join('; ')}.`,`So sánh các giá trị: lớn nhất là ${mx[2]}.`],`${sx(mx)}.`,`Không đoán theo cơ số lớn nhất hay số mũ lớn nhất; phải tính (hoặc so sánh) giá trị.`);
 const w=it.filter(x=>x!=mx).map(x=>[sx(x),x[0]==ba?'chỉ nhìn cơ số lớn nhất':x[1]==be?'chỉ nhìn số mũ lớn nhất':'giá trị nhỏ hơn giá trị lớn nhất']);
 return[mc(`Số nào sau đây lớn nhất?`,sx(mx),w,e),[it.map(x=>x[0]),it.map(x=>x[1])]]})
);

/* ================= CHIA HẾT, SỐ NGUYÊN TỐ ================= */
A('div',
gen('div.tong_chiahet',()=>{
 const k=R(3,9),mul=()=>k*R(2,12),non=()=>{const r=R(1,k-1);return[k*R(2,12)+r,r]},
 g=[mul(),mul()],a1=[mul(),non()[0]],a2=[non()[0],mul()];let c;
 do{const[x,r1]=non(),[y,r2]=non();c=[x,y,(r1+r2)%k]}while(c[2]==0);
 const T=x=>`${x[0]} + ${x[1]}`,
 e=sol([`Tính chất: nếu mọi số hạng đều chia hết cho ${k} thì tổng chia hết cho ${k}.`,`${g[0]} = ${k} × ${g[0]/k} và ${g[1]} = ${k} × ${g[1]/k}, cả hai đều chia hết cho ${k}.`,`Vậy ${T(g)} chia hết cho ${k}, không cần tính tổng.`],`${T(g)}.`,`Nếu chỉ một số hạng chia hết cho ${k} (số còn lại không) thì tổng không chia hết cho ${k}.`);
 return[mc(`Không thực hiện phép tính, tổng nào sau đây chia hết cho ${k}?`,T(g),[[T(a1),`chỉ có một số hạng chia hết cho ${k}, số hạng còn lại thì không nên tổng không chia hết`],[T(a2),`chỉ có một số hạng chia hết cho ${k}, số hạng còn lại thì không nên tổng không chia hết`],[T(c),`cả hai số hạng đều không chia hết cho ${k} và tổng chia ${k} dư ${c[2]}`]],e),[k]]}),

gen('div.dauhieu9',()=>{
 let a,b;do{a=R(1,9);b=R(0,9)}while((a+b)%9==0);
 const x=(9-(a+b)%9)%9,r=(a+b)%9,o3=[0,1,2,3,4,5,6,7,8,9].filter(d=>d!=x&&(a+b+d)%3==0),
 e=sol([`Một số chia hết cho 9 khi tổng các chữ số chia hết cho 9.`,`Tổng các chữ số: ${a} + ${b} + x = ${a+b} + x.`,`${a+b} + x chia hết cho 9 và x là chữ số (0 đến 9) nên ${a+b} + x = ${a+b+x}, suy ra x = ${x}.`],`x = ${x}.`,`Phải chọn x để tổng chia hết cho 9, không chỉ chia hết cho 3.`);
 return[mc(`Thay chữ số thích hợp cho x để số ${ov(`${a}${b}x`)} chia hết cho 9. Chữ số x là:`,x,[[r,'lấy luôn số dư của '+(a+b)+' khi chia 9; phải lấy số bù để tổng chia hết cho 9'],[o3[0],`tổng các chữ số là ${a+b+o3[0]}, mới chia hết cho 3 chứ chưa chia hết cho 9`],[o3[1],`tổng các chữ số là ${a+b+o3[1]}, mới chia hết cho 3 chứ chưa chia hết cho 9`],[(x+1)%10,'chọn gần đúng, tổng chưa chia hết cho 9']],e),[a,b]]}),

gen('div.nguyento_dem',()=>{
 const lo=R(10,50),hi=lo+R(10,20),ps=[],od=[];for(let i=lo;i<=hi;i++){if(isP(i))ps.push(i);if(i%2)od.push(i)}
 if(ps.length<2)throw 0;
 const e=sol([`Số nguyên tố là số lớn hơn 1 chỉ có hai ước là 1 và chính nó. Loại các số chẵn lớn hơn 2 và các số chia hết cho 3, 5, 7.`,`Các số nguyên tố từ ${lo} đến ${hi}: ${ps.join('; ')}.`,`Có ${ps.length} số.`],`${ps.length} số.`,`Số lẻ chưa chắc là số nguyên tố (ví dụ 9, 15, 21, 25, 27, 35, 49…).`);
 return[mc(`Có bao nhiêu số nguyên tố trong khoảng từ ${lo} đến ${hi} (kể cả hai đầu mút)?`,ps.length,[[od.length,'đếm tất cả các số lẻ'],[ps.length+1,'coi thêm một hợp số lẻ là số nguyên tố'],[ps.length-1,'bỏ sót một số nguyên tố']],e),[lo,hi]]}),

gen('div.phantich',()=>{
 let m,n;do{m=new Map();[2,3,5,7].forEach(p=>{const e0=P([0,0,1,2,3]);if(e0)m.set(p,e0)});n=[...m].reduce((s,[p,e0])=>s*p**e0,1)}while(m.size<2||![...m.values()].some(e0=>e0>=2)||n>2000);
 const f=fx(m),ps=[...m.keys()],p1=P(ps),mm=(fn)=>{const c=new Map(m);fn(c);return fx(c)},
 pe=P([...m].filter(([p,e0])=>e0>=2)),q2=P(ps.filter(p=>p!=pe[0])),
 w1=mm(c=>{const e0=c.get(p1)-1;e0?c.set(p1,e0):c.delete(p1)}),
 w2=[...m].sort((x,y)=>x[0]-y[0]).map(([p,e0])=>p==pe[0]?`${p**e0}`:(e0>1?`${p}^${e0}`:`${p}`)).join(' × '),
 w3=mm(c=>c.set(q2,c.get(q2)+1)),
 e=sol([`Chia ${n} cho các số nguyên tố nhỏ dần (2, 3, 5, 7, …) đến khi được thương 1.`,`Các thừa số nguyên tố thu được: ${[...m].sort((x,y)=>x[0]-y[0]).map(([p,e0])=>Array(e0).fill(p).join(' × ')).join(' × ')}.`,`Viết gọn bằng lũy thừa: ${n} = ${f}.`],`${n} = ${f}.`,`Các thừa số phải đều là số nguyên tố; thừa số như 4, 6, 8, 9 chưa phải số nguyên tố.`);
 return[mc(`Phân tích số ${n} ra thừa số nguyên tố:`,f,[[w1,`thiếu một thừa số ${p1}, tích không bằng ${n}`],[w2,`${pe[0]**pe[1]} không phải số nguyên tố nên chưa phân tích xong`],[w3,`thừa một thừa số ${q2}, tích không bằng ${n}`]],e),[n]]})
);
HA('div',
gen('div.dauhieu23',()=>{
 const a=R(1,9),b=R(0,9),ev=[0,2,4,6,8],ok=ev.filter(d=>(a+b+d)%3==0),x=Math.max(...ok),odd3=[1,3,5,7,9].filter(d=>(a+b+d)%3==0),
 e=sol([`Chia hết cho 2: chữ số tận cùng x là chữ số chẵn (0, 2, 4, 6, 8).`,`Chia hết cho 3: tổng các chữ số ${a} + ${b} + x chia hết cho 3.`,`Trong các chữ số chẵn, những chữ số thỏa tổng chia hết cho 3 là ${ok.join('; ')}; lớn nhất là ${x}.`],`x = ${x}.`,`Phải thỏa mãn đồng thời cả hai dấu hiệu, không chỉ một dấu hiệu.`);
 const w=[];if(x!=8)w.push([8,`8 là chữ số chẵn lớn nhất nhưng tổng các chữ số là ${a+b+8}, chưa chia hết cho 3`]);
 if(odd3.length)w.push([Math.max(...odd3),`tổng các chữ số chia hết cho 3 nhưng ${Math.max(...odd3)} là chữ số lẻ nên số không chia hết cho 2`]);
 w.push([Math.min(...ok),ok.length>1?'chia hết cho 2 và 3 nhưng chưa phải chữ số lớn nhất':'chọn nhầm chữ số khác']);
 return[mc(`Tìm chữ số x lớn nhất để số ${ov(`${a}${b}x`)} chia hết cho cả 2 và 3.`,x,w,e),[a,b]]}),

gen('div.nhonhat_chiahet',()=>{
 const k=R(3,4),m=P([7,12,13,15,18,24,36,45]),lo=10**(k-1),ans=Math.ceil(lo/m)*m,
 e=sol([`Số nhỏ nhất có ${k} chữ số là ${lo}.`,`Chia ${lo} cho ${m}: ${lo} = ${m} × ${Math.floor(lo/m)} + ${lo%m} nên ${lo} chưa chia hết cho ${m}.`,`Bội của ${m} nhỏ nhất không nhỏ hơn ${lo} là ${m} × ${Math.ceil(lo/m)} = ${ans}.`],`${ans}.`,`Bội liền trước ${ans-m} chỉ có ${k-1} chữ số nên không thỏa.`);
 return[mc(`Số tự nhiên nhỏ nhất có ${k} chữ số chia hết cho ${m} là:`,ans,[[lo,`đó là số nhỏ nhất có ${k} chữ số nhưng chưa chia hết cho ${m}`],[ans-m,`số này chỉ có ${k-1} chữ số`],[ans+m,'chia hết cho '+m+' nhưng chưa phải số nhỏ nhất']],e),[k,m]]})
);

/* ================= ƯỚC & BỘI ================= */
A('ub',
gen('ub.liet_ke_uoc',()=>{
 const n=P([12,18,20,24,28,30,36,40,42,45,48]),d=divs(n),miss=P(d.slice(1,-1)),bad=P([...Array(n).keys()].filter(x=>x>1&&x<n&&n%x)),
 pr=d.filter(x=>x*x<=n).map(x=>`${x} × ${n/x}`).join('; '),
 e=sol([`Ước của ${n} là các số tự nhiên chia hết ${n}. Tìm các cặp số nhân lại bằng ${n}: ${pr}.`,`Liệt kê theo thứ tự tăng dần các số trong các cặp đó.`],`Ư(${n}) = ${st(d)}.`,`${n} luôn là ước của chính nó và 1 là ước của mọi số; số 0 không phải ước của số nào.`);
 return[mc(`Tập hợp Ư(${n}) là:`,st(d),[[st(d.filter(x=>x!=n)),`thiếu ${n}: mọi số tự nhiên khác 0 đều là ước của chính nó`],[st(d.filter(x=>x!=miss)),`bỏ sót ước ${miss} (${n} : ${miss} = ${n/miss})`],[st([...d,bad].sort((x,y)=>x-y)),`${bad} không phải ước vì ${n} không chia hết cho ${bad}`],[st([0,...d]),'0 không phải là ước của số nào']],e),[n]]}),

gen('ub.boi_liet_ke',()=>{
 const a=R(3,9),c=R(4,6),b=a*c+R(1,a-1),ms=Array.from({length:c+1},(_,i)=>a*i),
 e=sol([`Bội của ${a} có dạng ${a} × k với k = 0, 1, 2, 3, …`,`Lần lượt: ${ms.map((v,i)=>`${a} × ${i} = ${v}`).join('; ')}.`,`Số tiếp theo ${a*(c+1)} không nhỏ hơn ${b} nên dừng ở ${a*c}.`],`${st(ms)}.`,`0 là bội của mọi số tự nhiên khác 0, đừng bỏ sót.`);
 return[mc(`Tập hợp các bội của ${a} nhỏ hơn ${b} là:`,st(ms),[[st(ms.slice(1)),'quên số 0, 0 là bội của mọi số khác 0'],[st([...ms,a*(c+1)]),`lấy thừa ${a*(c+1)}, số này không nhỏ hơn ${b}`],[st(ms.slice(0,-1)),`bỏ sót bội ${a*c} (vẫn nhỏ hơn ${b})`],[st(divs(a)),'nhầm bội với ước']],e),[a,b]]})
);
HA('ub',
gen('ub.x_uoc',()=>{
 const n=P([24,30,36,40,42,48,60]),d=divs(n),m=P(d.slice(1,-2)),res=d.filter(x=>x>m),
 e=sol([`Liệt kê Ư(${n}) = ${st(d)}.`,`Chọn các ước thỏa x &gt; ${m} (lớn hơn hẳn ${m}, không lấy ${m}).`,`Được ${st(res)}.`],`x ∈ ${st(res)}.`,`Dấu &gt; thì không lấy đầu mút ${m}.`);
 return[mc(`Tìm tập hợp các số tự nhiên x, biết x ∈ Ư(${n}) và x &gt; ${m}.`,st(res),[[st(d.filter(x=>x>=m)),`x &gt; ${m} nên không được lấy x = ${m}`],[st(d),'chưa lọc theo điều kiện x &gt; '+m],[st(res.slice(0,-1)),`bỏ sót ước lớn nhất ${n}`]],e),[n,m]]}),

gen('ub.x_nhonhat',()=>{
 let a,m;do{a=R(10,60);m=R(5,12)}while(a%m==0);
 const x=m-a%m,
 e=sol([`Chia ${a} cho ${m}: ${a} = ${m} × ${Math.floor(a/m)} + ${a%m}, dư ${a%m}.`,`Muốn ${a} + x chia hết cho ${m} thì x phải bù phần dư: x = ${m} − ${a%m} = ${x}.`,`Thử lại: ${a} + ${x} = ${a+x} = ${m} × ${(a+x)/m}.`],`x = ${x}.`,`Lấy số dư làm x là sai; phải lấy phần còn thiếu để đủ một nhóm ${m}.`);
 return[mc(`Tìm số tự nhiên x nhỏ nhất khác 0 sao cho ${a} + x chia hết cho ${m}.`,x,[[a%m,'lấy luôn số dư; số bù mới đúng'],[m,'x = '+m+' chia hết nhưng chưa phải số nhỏ nhất'],[x+m,'chia hết nhưng chưa phải số nhỏ nhất']],e),[a,m]]})
);

/* ================= ƯCLN – BCNN ================= */
A('gcd',
gen('gcd.ucln_hai',()=>{
 const g=P([2,3,4,5,6,7,8,9,10,12,15]),[p,q]=cop(2,9),a=g*p,b=g*q,L=a*b/g,
 half=pf(g).size?[...pf(g).keys()][0]:g,
 e=sol([`Phân tích: ${a} = ${fx(pf(a))}; ${b} = ${fx(pf(b))}.`,`Chọn các thừa số nguyên tố chung, mỗi thừa số lấy số mũ nhỏ nhất.`,`ƯCLN(${a}; ${b}) = ${fx(pf(g))}${pf(g).size>1||[...pf(g).values()][0]>1?` = ${g}`:''}.`],`${g}.`,`BCNN lấy mọi thừa số với số mũ lớn nhất; ƯCLN chỉ lấy thừa số chung với số mũ nhỏ nhất.`);
 return[mc(`Tìm ƯCLN(${a}; ${b}).`,g,[[L,'đó là BCNN, không phải ƯCLN'],[g/half,'là một ước chung nhưng chưa phải ước chung lớn nhất'],[Math.abs(a-b),'lấy hiệu hai số thay vì tìm ƯCLN']],e),[a,b]]}),

gen('gcd.bcnn_hai',()=>{
 const g=P([2,3,4,5,6,7,8,9,10,12]),[p,q]=cop(2,8),a=g*p,b=g*q,L=a*b/g,
 e=sol([`Phân tích: ${a} = ${fx(pf(a))}; ${b} = ${fx(pf(b))}.`,`Chọn tất cả thừa số nguyên tố (chung và riêng), mỗi thừa số lấy số mũ lớn nhất.`,`BCNN(${a}; ${b}) = ${fx(pf(L))} = ${L}.`],`${L}.`,`Tích hai số ${a*b} là một bội chung nhưng chưa nhỏ nhất khi hai số có ước chung lớn hơn 1.`);
 return[mc(`Tìm BCNN(${a}; ${b}).`,L,[[a*b,`${a} × ${b} chỉ là một bội chung, chưa chia cho ƯCLN`],[g,'đó là ƯCLN, không phải BCNN'],[L*2,'là một bội chung nhưng chưa nhỏ nhất']],e),[a,b]]}),

gen('gcd.cung_xuatben',()=>{
 let a,b;do{a=P([6,8,9,10,12,15,18,20,24,30]);b=P([6,8,9,10,12,15,18,20,24,30])}while(a==b||gcd(a,b)==1);
 const L=lcm(a,b),
 e=sol([`Hai xe lại cùng xuất bến sau một số phút chia hết cho cả ${a} và ${b}, tức là một bội chung của ${a} và ${b}.`,`Cần lần sớm nhất nên tìm BCNN(${a}; ${b}) = ${L}.`],`${L} phút.`,`“Ít nhất” cùng lúc ⇒ BCNN, không phải ƯCLN hay tích hai số.`);
 return[mc(`Hai xe buýt cùng rời bến lúc 6 giờ sáng. Xe thứ nhất cứ ${a} phút có một chuyến, xe thứ hai cứ ${b} phút có một chuyến. Sau ít nhất bao nhiêu phút thì hai xe lại cùng rời bến?`,L,[[gcd(a,b),'đó là ƯCLN'],[a*b,'đó là tích hai số, không phải bội chung nhỏ nhất'],[a+b,'cộng hai khoảng thời gian']],e),[a,b]]}),

gen('gcd.cungnhau',()=>{
 const good=P([[8,15],[9,28],[14,25],[16,21],[10,27],[12,35],[18,25],[20,33],[22,45],[24,35]]),bads=sh([[6,15],[8,12],[14,21],[18,24],[20,30],[9,15],[16,24],[10,25],[12,18],[21,35],[22,33],[26,39]]).slice(0,3),
 T=x=>`${x[0]} và ${x[1]}`,
 e=sol([`Hai số nguyên tố cùng nhau khi ƯCLN của chúng bằng 1.`,`ƯCLN(${good[0]}; ${good[1]}) = 1, các cặp còn lại đều có ước chung lớn hơn 1.`],`${T(good)}.`,`Hai số nguyên tố cùng nhau không nhất thiết phải là số nguyên tố (ví dụ 8 và 15).`);
 return[mc(`Cặp số nào sau đây nguyên tố cùng nhau?`,T(good),bads.map(x=>[T(x),`ƯCLN(${x[0]}; ${x[1]}) = ${gcd(x[0],x[1])}, khác 1`]),e),[good,bads]]}),

gen('gcd.rutgon',()=>{
 const g=P([4,6,8,9,10,12,14,15]),[p,q]=cop(2,9),pp=Math.min(p,q),qq=Math.max(p,q),a=g*pp,b=g*qq,d=pf(g).keys().next().value,
 e=sol([`ƯCLN(${a}; ${b}) = ${g} (${a} = ${g} × ${pp}, ${b} = ${g} × ${qq}).`,`Chia cả tử và mẫu cho ƯCLN: ${a} : ${g} = ${pp}; ${b} : ${g} = ${qq}.`],`${pp}/${qq}.`,`Phải chia cho ƯCLN để phân số tối giản; chia cho một ước chung nhỏ hơn thì còn rút gọn tiếp được.`);
 return[mc(`Rút gọn phân số ${a}/${b} về phân số tối giản:`,`${pp}/${qq}`,[[`${a/d}/${b/d}`,`chỉ chia cho ước chung ${d}, chưa chia cho ƯCLN nên chưa tối giản`],[`${qq}/${pp}`,'đảo ngược tử và mẫu'],[`${a-g}/${b-g}`,'trừ cả tử và mẫu cho '+g+' thay vì chia']],e),[a,b]]})
);
HA('gcd',
gen('gcd.ucln3',()=>{
 let G,a,b,c;do{G=P([2,3,4,5,6,7,8,9,12]);a=G*R(2,9);b=G*R(2,9);c=G*R(2,9)}while(gcd(a,b)==G||gcd3(a,b,c)!=G||new Set([a,b,c]).size<3);
 const e=sol([`Phân tích: ${a} = ${fx(pf(a))}; ${b} = ${fx(pf(b))}; ${c} = ${fx(pf(c))}.`,`Lấy các thừa số nguyên tố chung của cả ba số, mỗi thừa số có số mũ nhỏ nhất.`,`ƯCLN(${a}; ${b}; ${c}) = ${G}.`],`${G}.`,`Phải xét cả ba số: ƯCLN của hai số đầu chưa chắc là ước của số thứ ba.`);
 return[mc(`Tìm ƯCLN(${a}; ${b}; ${c}).`,G,[[gcd(a,b),'chỉ tìm ƯCLN của hai số đầu, bỏ qua số thứ ba'],[Math.min(a,b,c),'lấy số nhỏ nhất, mà nó chưa chắc là ước của hai số còn lại'],[lcm3(a,b,c),'đó là BCNN']],e),[a,b,c]]}),

gen('gcd.bcnn3',()=>{
 let a,b,c;do{a=R(2,15);b=R(2,15);c=R(2,15)}while(new Set([a,b,c]).size<3||lcm(a,b)==lcm3(a,b,c)||lcm3(a,b,c)>400);
 const L=lcm3(a,b,c),
 e=sol([`Phân tích: ${a} = ${fx(pf(a))}; ${b} = ${fx(pf(b))}; ${c} = ${fx(pf(c))}.`,`Lấy tất cả thừa số nguyên tố của ba số, mỗi thừa số lấy số mũ lớn nhất.`,`BCNN(${a}; ${b}; ${c}) = ${fx(pf(L))} = ${L}.`],`${L}.`,`BCNN của ba số phải chia hết cho cả ba số; tích ba số thường lớn hơn nhiều.`);
 return[mc(`Tìm BCNN(${a}; ${b}; ${c}).`,L,[[lcm(a,b),'chỉ tìm BCNN của hai số đầu, bỏ qua số thứ ba'],[a*b*c,'tích ba số, không phải bội chung nhỏ nhất'],[gcd3(a,b,c),'đó là ƯCLN']],e),[a,b,c]]}),

gen('gcd.lat_gach',()=>{
 const g=P([20,25,30,40,45,50,60]),[p,q]=cop(2,9),A1=g*p,B1=g*q,n=p*q,
 e=sol([`Cạnh viên gạch vuông phải là ước chung của ${A1} và ${B1}; cạnh lớn nhất nên là ƯCLN(${A1}; ${B1}) = ${g} cm.`,`Theo chiều dài cần ${A1} : ${g} = ${p} viên; theo chiều rộng cần ${B1} : ${g} = ${q} viên.`,`Số viên gạch = ${p} × ${q} = ${n}.`],`${n} viên.`,`Phải nhân số viên theo hai chiều, không cộng.`);
 return[mc(`Nền nhà hình chữ nhật dài ${A1} cm, rộng ${B1} cm được lát kín bằng các viên gạch hình vuông có cạnh lớn nhất (không cắt viên nào). Cần bao nhiêu viên gạch?`,n,[[g,'đó là độ dài cạnh viên gạch (cm)'],[p+q,'cộng số viên theo hai chiều thay vì nhân'],[A1*B1/g,'chia diện tích nền cho cạnh gạch, không phải cho diện tích một viên']],e),[A1,B1]]})
);
/* ================= SỐ NGUYÊN ================= */
A('int',
gen('int.cong_tru',()=>{
 let p,q;do{p=nz()*R(1,3);q=nz()*R(1,3)}while(p+q==0||p-q==0);
 const op=P(['+','−']),ans=op=='+'?p+q:p-q,alt=op=='+'?p-q:p+q,ab=Math.abs(p)+Math.abs(q)==Math.abs(ans)?Math.abs(Math.abs(p)-Math.abs(q)):Math.abs(p)+Math.abs(q),
 s=op=='+'?[`Hai số hạng là ${iz(p)} và ${pa(q)}: ${(p<0)==(q<0)?'cùng dấu':'khác dấu'}.`,addEx(p,q)]:[`Trừ một số là cộng với số đối của nó: ${iz(p)} − ${pa(q)} = ${iz(p)} + ${pa(-q)}.`,addEx(p,-q)],
 e=sol(s,`${ng(ans)}.`,op=='+'?`Cộng hai số khác dấu là lấy hiệu hai giá trị tuyệt đối, dấu theo số có giá trị tuyệt đối lớn hơn.`:`Trừ đi số âm thì thành cộng với số dương; đừng bỏ qua dấu của số trừ.`);
 return[mc(`Tính: ${iz(p)} ${op} ${pa(q)}`,ans,[[alt,op=='+'?'nhầm phép cộng thành phép trừ':'không đổi dấu số trừ: trừ một số là cộng với số đối của nó'],[-ans,'sai dấu của kết quả'],[ab,'tính theo giá trị tuyệt đối, bỏ qua dấu']],e),[p,op,q]]}),

gen('int.bo_ngoac',()=>{
 let a=R(10,60),b=R(5,40),c;do{c=R(5,40)}while(c==b);
 const s1=P([1,-1]),s2=P([1,-1]),x1=s1*b,x2=s2*c,ans=a-(x1+x2),
 inner=`${s1<0?'−':''}${b} ${s2<0?'−':'+'} ${c}`,
 e=sol([`Trước ngoặc có dấu −, khi bỏ ngoặc phải đổi dấu tất cả các số hạng trong ngoặc.`,`${s1<0?'−'+b:'+'+b} đổi thành ${s1<0?'+'+b:'−'+b}; ${s2<0?'−'+c:'+'+c} đổi thành ${s2<0?'+'+c:'−'+c}.`,`${a} ${s1<0?'+':'−'} ${b} ${s2<0?'+':'−'} ${c} = ${ng(ans)}.`],`${ng(ans)}.`,`Dấu − trước ngoặc đổi dấu mọi số hạng trong ngoặc, không chỉ số hạng đầu.`);
 return[mc(`Tính: ${a} − (${inner})`,ans,[[a+x1+x2,'bỏ ngoặc mà không đổi dấu số hạng nào'],[a-x1+x2,'chỉ đổi dấu số hạng đầu tiên trong ngoặc'],[a+x1-x2,'chỉ đổi dấu số hạng thứ hai trong ngoặc']],e),[a,s1,b,s2,c]]}),

gen('int.nhan',()=>{
 const nf=R(2,3),f=[];while(f.length<nf)f.push(nz()*R(1,2));
 const prod=f.reduce((x,y)=>x*y,1),neg=f.filter(v=>v<0).length,sum=f.reduce((x,y)=>x+y,0),
 e=sol([`Đếm số thừa số âm: có ${neg} thừa số âm.`,`${neg%2?'Số thừa số âm lẻ nên tích mang dấu −':'Số thừa số âm chẵn (hoặc không có) nên tích mang dấu +'}.`,`Nhân các giá trị tuyệt đối: ${f.map(Math.abs).join(' × ')} = ${Math.abs(prod)}, vậy tích là ${ng(prod)}.`],`${ng(prod)}.`,`Hai số âm nhân nhau ra số dương; tích có số thừa số âm lẻ thì âm.`);
 return[mc(`Tính: ${f.map(pa).join(' × ')}`,prod,[[-prod,`có ${neg} thừa số âm nên tích phải ${neg%2?'âm':'dương'}`],[sum,'cộng thay vì nhân']],e),[f]]}),

gen('int.abs_tinh',()=>{
 let x,y;do{x=nz()*R(1,3);y=nz()*R(1,3)}while(x==y||x+y==0);
 const t=R(0,2),Ax=Math.abs(x),Ay=Math.abs(y);let q,ans,w,s;
 if(t==0){q=`|${iz(x)}| + |${iz(y)}|`;ans=Ax+Ay;w=[[x+y,'bỏ dấu giá trị tuyệt đối rồi cộng'],[-ans,'giá trị tuyệt đối không bao giờ âm'],[Math.abs(x+y),'lấy giá trị tuyệt đối của tổng']];s=[`|${iz(x)}| = ${Ax} và |${iz(y)}| = ${Ay}.`,`${Ax} + ${Ay} = ${ans}.`]}
 else if(t==1){q=`|${iz(x)}| − |${iz(y)}|`;ans=Ax-Ay;w=[[x-y,'bỏ dấu giá trị tuyệt đối rồi trừ'],[Ay-Ax,'đảo thứ tự phép trừ'],[Ax+Ay,'cộng thay vì trừ']];s=[`|${iz(x)}| = ${Ax} và |${iz(y)}| = ${Ay}.`,`${Ax} − ${Ay} = ${ans}.`]}
 else{q=`|${iz(x)} + ${pa(y)}|`;ans=Math.abs(x+y);w=[[Ax+Ay,'lấy giá trị tuyệt đối từng số rồi cộng'],[x+y,'quên lấy giá trị tuyệt đối của kết quả'],[Math.abs(x-y),'trừ thay vì cộng']];s=[`Tính trong dấu giá trị tuyệt đối: ${iz(x)} + ${pa(y)} = ${ng(x+y)}.`,`|${ng(x+y)}| = ${ans}.`]}
 return[mc(`Tính: ${q}`,ans,w,sol(s,`${ng(ans)}.`,`Giá trị tuyệt đối của một số luôn không âm; với biểu thức bên trong phải tính xong rồi mới lấy giá trị tuyệt đối.`)),[t,x,y]]}),

gen('int.sapxep',()=>{
 let v;do{const s=new Set();v=[];while(v.length<5){const x=R(-15,15);if(!s.has(x)){s.add(x);v.push(x)}}}while(v.filter(x=>x<0).length<2||v.filter(x=>x>=0).length<1||new Set(v.map(Math.abs)).size<5);
 const asc=[...v].sort((a,b)=>a-b),desc=[...asc].reverse(),byabs=[...v].sort((a,b)=>Math.abs(a)-Math.abs(b)),
 neg=v.filter(x=>x<0).sort((a,b)=>Math.abs(a)-Math.abs(b)),pos=v.filter(x=>x>=0).sort((a,b)=>a-b),mixed=[...neg,...pos],
 j=a=>a.map(ng).join('; '),sw=(()=>{const c=[...asc],i=R(0,3);[c[i],c[i+1]]=[c[i+1],c[i]];return c})(),
 e=sol([`Số âm nhỏ hơn 0 và nhỏ hơn mọi số dương.`,`Trong hai số âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn: ${asc.filter(x=>x<0).map(ng).join(' &lt; ')}.`,`Sắp xếp tăng dần: ${asc.map(ng).join(' &lt; ')}.`],`${j(asc)}.`,`Số âm càng xa 0 càng nhỏ: −9 &lt; −2.`);
 return[mc(`Sắp xếp các số ${j(v)} theo thứ tự tăng dần:`,j(asc),[[j(desc),'đó là thứ tự giảm dần'],[j(byabs),'sắp theo giá trị tuyệt đối, bỏ qua dấu'],[j(mixed),'trong các số âm, số có giá trị tuyệt đối lớn hơn phải nhỏ hơn'],[j(sw),'đổi chỗ hai số liền nhau']],e),[v]]}),

gen('int.timx_ct',()=>{
 let p=nz()*R(1,3),q=nz()*R(1,5);const t=R(0,2);let s,ans,w,st3;
 if(t==0){s=`x + ${pa(p)} = ${iz(q)}`;ans=q-p;w=[[q+p,'chuyển vế mà không đổi dấu'],[p-q,'đảo vị trí hai số khi trừ'],[-(q-p),'sai dấu kết quả']];st3=[`x là số hạng chưa biết: x = tổng − số hạng đã biết.`,`x = ${iz(q)} − ${pa(p)}.`,`x = ${ng(ans)}.`]}
 else if(t==1){s=`x − ${pa(p)} = ${iz(q)}`;ans=q+p;w=[[q-p,'chuyển vế mà không đổi dấu'],[p-q,'đảo vị trí hai số'],[-(q+p),'sai dấu kết quả']];st3=[`x là số bị trừ: x = hiệu + số trừ.`,`x = ${iz(q)} + ${pa(p)}.`,`x = ${ng(ans)}.`]}
 else{s=`${iz(p)} − x = ${iz(q)}`;ans=p-q;w=[[q-p,'nhầm vai trò số bị trừ và hiệu'],[p+q,'cộng thay vì trừ'],[-(p-q),'sai dấu kết quả']];st3=[`x là số trừ: x = số bị trừ − hiệu.`,`x = ${iz(p)} − ${pa(q)}.`,`x = ${ng(ans)}.`]}
 return[mc(`Tìm số nguyên x, biết: ${s}`,ans,w,sol(st3,`x = ${ng(ans)}.`,`Xác định x là số hạng, số bị trừ hay số trừ, rồi tính cẩn thận dấu khi trừ số âm.`)),[t,p,q]]})
);
HA('int',
gen('int.tong_lientiep',()=>{
 let a,b;do{a=R(3,15);b=R(3,15)}while(a==b);
 const S=Array.from({length:a+b+1},(_,i)=>i-a).reduce((x,y)=>x+y,0),big=b>a?b:-a,lo=Math.min(a,b)+1,hi=Math.max(a,b),
 e=sol([`Các số nguyên từ ${iz(-a)} đến ${b} gồm cả số 0.`,`Từng cặp số đối nhau (−1 và 1, −2 và 2, …, −${Math.min(a,b)} và ${Math.min(a,b)}) có tổng bằng 0, nên triệt tiêu.`,`Còn lại các số ${b>a?'':'âm '}từ ${b>a?lo:iz(-lo)} đến ${b>a?hi:iz(-hi)}: tổng = ${ng(S)}.`],`${ng(S)}.`,`Đừng vội kết luận tổng bằng 0: các số ở phía đầu mút dài hơn không có số đối để triệt tiêu.`);
 return[mc(`Tính tổng tất cả các số nguyên x thỏa mãn ${iz(-a)} ≤ x ≤ ${b}.`,S,[[0,'tưởng mọi cặp số đối triệt tiêu hết; còn dư các số ở đầu mút dài hơn'],[-S,'sai dấu của phần còn lại'],[S-big,'bỏ sót số ở đầu mút']],e),[a,b]]}),

gen('int.uoc_Z',()=>{
 const n=P([6,8,10,12,14,15,18,20,24,28,30]),t=divs(n).length,
 e=sol([`Ước dương của ${n}: ${st(divs(n))}, có ${t} ước.`,`Mỗi ước dương có một ước âm đối của nó (vì ${n} cũng chia hết cho số đối).`,`Số ước trong ℤ = 2 × ${t} = ${2*t}.`],`${2*t} ước.`,`Trong ℤ, ước của n gồm cả ước dương và ước âm: Ư(${n}) = {±1; …; ±${n}}.`);
 return[mc(`Số ${n} có bao nhiêu ước trong tập hợp các số nguyên ℤ?`,2*t,[[t,'chỉ đếm ước dương; mỗi ước dương còn có một ước âm đối của nó'],[2*t-2,`bỏ sót hai ước ${n} và −${n}`],[2*t+2,'đếm thừa hai ước không có thật']],e),[n]]})
);

/* ================= HÌNH PHẲNG: CHU VI – DIỆN TÍCH ================= */
A('geo',
gen('geo.tamgiac_deu',()=>{
 const t=R(0,1),a=R(3,20);
 if(t==0)return[mc(`Tam giác đều có cạnh ${a} cm. Chu vi của tam giác là:`,3*a,[[4*a,'nhân 4 như hình vuông'],[2*a,'chỉ tính hai cạnh'],[a*a,'bình phương cạnh thay vì nhân 3']],sol([`Tam giác đều có ba cạnh bằng nhau.`,`Chu vi = 3 × cạnh = 3 × ${a} = ${3*a} (cm).`],`${3*a} cm.`,`Chu vi là tổng độ dài các cạnh; tam giác có 3 cạnh (khác hình vuông có 4 cạnh).`),cm),[t,a]];
 const P3=3*a;return[mc(`Tam giác đều có chu vi ${P3} cm. Độ dài mỗi cạnh là:`,a,[[P3/4,'chia 4 như hình vuông'],[P3*3,'nhân thay vì chia'],[P3/2,'chia 2 thay vì chia 3']],sol([`Chu vi tam giác đều = 3 × cạnh.`,`Cạnh = chu vi : 3 = ${P3} : 3 = ${a} (cm).`],`${a} cm.`,`Có 3 cạnh bằng nhau nên chia cho 3.`),cm),[t,a]]}),

gen('geo.hinhvuong',()=>{
 const t=R(0,2),a=R(3,15);
 if(t==0)return[mc(`Hình vuông cạnh ${a} cm. Diện tích hình vuông là:`,a*a,[[4*a,'đó là chu vi, không phải diện tích'],[2*a,'nhân đôi cạnh'],[a*a*a,'nhân ba lần cạnh']],sol([`Diện tích hình vuông = cạnh × cạnh.`,`S = ${a} × ${a} = ${a*a} (cm²).`],`${a*a} cm².`,`Diện tích tính bằng cm² (hai chiều), chu vi tính bằng cm.`),cm2),[t,a]];
 if(t==1){const P4=4*a;return[mc(`Hình vuông có chu vi ${P4} cm. Diện tích hình vuông là:`,a*a,[[a,'đó là độ dài cạnh, chưa bình phương'],[(P4/2)**2,'chia 2 thay vì chia 4 để tìm cạnh'],[P4,'lấy luôn chu vi làm diện tích']],sol([`Cạnh = chu vi : 4 = ${P4} : 4 = ${a} (cm).`,`Diện tích = cạnh × cạnh = ${a} × ${a} = ${a*a} (cm²).`],`${a*a} cm².`,`Phải tìm cạnh trước rồi mới tính diện tích.`),cm2),[t,a]]}
 return[mc(`Hình vuông có diện tích ${a*a} cm². Chu vi hình vuông là:`,4*a,[[a,'đó là độ dài cạnh, chưa nhân 4'],[a*a*4,'nhân 4 với diện tích'],[2*a,'nhân 2 như hình chữ nhật']],sol([`Cạnh × cạnh = ${a*a} nên cạnh = ${a} cm (vì ${a} × ${a} = ${a*a}).`,`Chu vi = 4 × cạnh = 4 × ${a} = ${4*a} (cm).`],`${4*a} cm.`,`Từ diện tích tìm cạnh bằng căn bậc hai (ở đây là số nhân với chính nó).`),cm),[t,a]]}),

gen('geo.hcn_tim',()=>{
 const t=R(0,1);let a,b;do{a=R(5,20);b=R(2,a-1)}while(a==b);
 if(t==0){const S=a*b;return[mc(`Hình chữ nhật có diện tích ${S} cm² và chiều dài ${a} cm. Chu vi hình chữ nhật là:`,2*(a+b),[[a+b,'quên nhân 2 (đó là nửa chu vi)'],[b,'chỉ tìm chiều rộng, chưa tính chu vi'],[2*a+b,'chỉ nhân 2 với chiều dài']],sol([`Chiều rộng = diện tích : chiều dài = ${S} : ${a} = ${b} (cm).`,`Chu vi = (dài + rộng) × 2 = (${a} + ${b}) × 2 = ${2*(a+b)} (cm).`],`${2*(a+b)} cm.`,`Chu vi = (dài + rộng) × 2, không phải dài + rộng.`),cm),[t,a,b]]}
 const P2=2*(a+b);return[mc(`Hình chữ nhật có chu vi ${P2} cm và chiều rộng ${b} cm. Diện tích hình chữ nhật là:`,a*b,[[a,'chỉ tìm chiều dài, chưa tính diện tích'],[(P2-b)*b,'lấy chu vi trừ chiều rộng một lần thay vì nửa chu vi'],[P2*b,'nhân chu vi với chiều rộng']],sol([`Nửa chu vi = ${P2} : 2 = ${a+b} (cm).`,`Chiều dài = nửa chu vi − chiều rộng = ${a+b} − ${b} = ${a} (cm).`,`Diện tích = dài × rộng = ${a} × ${b} = ${a*b} (cm²).`],`${a*b} cm².`,`Chiều dài + chiều rộng = chu vi : 2.`),cm2),[t,a,b]]}),

gen('geo.thoi',()=>{
 const t=R(0,2);
 if(t==0){let d1,d2;do{d1=R(4,20);d2=R(3,16)}while(d1==d2||(d1*d2)%2);return[mc(`Hình thoi có hai đường chéo dài ${d1} cm và ${d2} cm. Diện tích hình thoi là:`,d1*d2/2,[[d1*d2,'quên chia 2'],[d1+d2,'cộng hai đường chéo'],[(d1+d2)*2,'tính như chu vi hình chữ nhật']],sol([`Diện tích hình thoi = tích hai đường chéo chia 2.`,`S = ${d1} × ${d2} : 2 = ${d1*d2/2} (cm²).`],`${d1*d2/2} cm².`,`Đừng quên chia 2 (hình thoi bằng nửa hình chữ nhật có hai kích thước là hai đường chéo).`),cm2),[t,d1,d2]]}
 if(t==1){const d1=R(4,16),d2=R(3,14),S=d1*d2/2;if(!Number.isInteger(S))throw 0;return[mc(`Hình thoi có diện tích ${S} cm² và một đường chéo dài ${d1} cm. Đường chéo còn lại dài:`,d2,[[S/d1,'quên nhân 2: phải lấy (diện tích × 2) : đường chéo đã biết'],[S*d1,'nhân thay vì chia'],[2*S+d1,'cộng thay vì chia']],sol([`S = d₁ × d₂ : 2 nên d₁ × d₂ = 2 × S = ${2*S}.`,`d₂ = ${2*S} : ${d1} = ${d2} (cm).`],`${d2} cm.`,`Nhớ nhân diện tích với 2 trước khi chia cho đường chéo đã biết.`),cm),[t,d1,d2]]}
 const a=R(3,15);return[mc(`Hình thoi có cạnh ${a} cm. Chu vi hình thoi là:`,4*a,[[2*a,'nhân 2 như hình chữ nhật'],[a*a,'bình phương cạnh: diện tích hình vuông'],[a+4,'cộng thay vì nhân']],sol([`Hình thoi có bốn cạnh bằng nhau.`,`Chu vi = 4 × cạnh = 4 × ${a} = ${4*a} (cm).`],`${4*a} cm.`,`Hình thoi có 4 cạnh bằng nhau nên chu vi = 4 × cạnh.`),cm),[t,a]]}),

gen('geo.binhhanh',()=>{
 const t=R(0,2);let a=R(5,20),h=R(3,12),b=a+R(1,6);
 if(t==0)return[mc(`Hình bình hành có cạnh đáy ${a} cm và chiều cao ${h} cm. Diện tích là:`,a*h,[[a*h/2,'chia 2 như diện tích tam giác'],[2*(a+h),'tính như chu vi hình chữ nhật'],[a+h,'cộng thay vì nhân']],sol([`Diện tích hình bình hành = cạnh đáy × chiều cao (tương ứng).`,`S = ${a} × ${h} = ${a*h} (cm²).`],`${a*h} cm².`,`Chiều cao là đoạn vuông góc với đáy, không phải cạnh bên.`),cm2),[t,a,h]];
 if(t==1)return[mc(`Hình bình hành có diện tích ${a*h} cm² và cạnh đáy ${a} cm. Chiều cao tương ứng là:`,h,[[2*a*h/a,'nhân đôi diện tích như khi tìm chiều cao tam giác'],[a*h*a,'nhân thay vì chia'],[a*h-a,'trừ thay vì chia']],sol([`S = đáy × cao nên cao = S : đáy.`,`Chiều cao = ${a*h} : ${a} = ${h} (cm).`],`${h} cm.`,`Hình bình hành không có “:2” trong công thức diện tích, khác tam giác.`),cm),[t,a,h]];
 return[mc(`Hình bình hành có hai cạnh kề dài ${a} cm và ${b} cm, chiều cao ứng với cạnh ${a} cm là ${h} cm. Chu vi là:`,2*(a+b),[[a+b,'quên nhân 2 (đó là nửa chu vi)'],[a*h,'đó là diện tích, không phải chu vi'],[2*a+b,'chỉ nhân đôi một cạnh']],sol([`Hình bình hành có các cạnh đối bằng nhau.`,`Chu vi = (${a} + ${b}) × 2 = ${2*(a+b)} (cm); chiều cao không dùng để tính chu vi.`],`${2*(a+b)} cm.`,`Chu vi chỉ phụ thuộc độ dài các cạnh; chiều cao dùng để tính diện tích.`),cm),[t,a,b,h]]})
);
HA('geo',
gen('geo.hinhthang_h',()=>{
 let a,b,h;do{a=R(4,14);b=a+R(2,8);h=R(3,12)}while(((a+b)*h)%2);
 const S=(a+b)*h/2,
 e=sol([`Diện tích hình thang S = (đáy lớn + đáy bé) × chiều cao : 2.`,`Suy ra chiều cao = 2 × S : (đáy lớn + đáy bé) = 2 × ${S} : (${b} + ${a}) = ${2*S} : ${a+b}.`,`Chiều cao = ${h} cm.`],`${h} cm.`,`Công thức có “:2”; khi tìm chiều cao phải nhân diện tích với 2.`);
 return[mc(`Hình thang có diện tích ${S} cm², hai đáy dài ${a} cm và ${b} cm. Chiều cao của hình thang là:`,h,[[S/(a+b),'quên nhân 2: phải lấy 2 × S : (tổng hai đáy)'],[2*S/a,'chỉ dùng một đáy, chưa cộng hai đáy'],[2*S*(a+b),'nhân thay vì chia']],e,cm),[a,b,h]]}),

gen('geo.L',()=>{
 const t=R(0,1),a=R(8,20),b=R(2,a-3);
 if(t==0)return[mc(`Từ một tấm bìa hình vuông cạnh ${a} cm, người ta cắt bỏ ở một góc một hình vuông cạnh ${b} cm. Chu vi phần bìa còn lại là:`,4*a,[[4*a-2*b,'bớt hai đoạn b nhưng quên cộng hai cạnh mới tạo ra'],[4*a+2*b,'thêm hai cạnh mới nhưng quên bớt hai đoạn đã cắt'],[4*a+4*b,'cộng cả chu vi hình vuông nhỏ']],sol([`Cắt góc làm mất đi hai đoạn dài ${b} cm ở hai cạnh của hình vuông lớn.`,`Nhưng lại tạo ra hai cạnh mới, mỗi cạnh dài ${b} cm, nên chu vi không đổi.`,`Chu vi = chu vi hình vuông lớn = 4 × ${a} = ${4*a} (cm).`],`${4*a} cm.`,`Cắt bỏ một hình vuông ở góc thì chu vi không đổi (hai đoạn mất đi được bù bằng hai đoạn mới).`),cm),[t,a,b]];
 return[mc(`Từ một tấm bìa hình vuông cạnh ${a} cm, người ta cắt bỏ ở một góc một hình vuông cạnh ${b} cm. Diện tích phần bìa còn lại là:`,a*a-b*b,[[(a-b)**2,'phần còn lại không phải hình vuông cạnh a − b'],[a*a+b*b,'cộng thay vì trừ'],[a*a-b,'trừ cạnh thay vì trừ diện tích']],sol([`Diện tích hình vuông lớn: ${a} × ${a} = ${a*a} (cm²).`,`Diện tích hình vuông bị cắt: ${b} × ${b} = ${b*b} (cm²).`,`Phần còn lại: ${a*a} − ${b*b} = ${a*a-b*b} (cm²).`],`${a*a-b*b} cm².`,`Trừ diện tích với diện tích, không trừ cạnh.`),cm2),[t,a,b]]}),

gen('geo.lat_nen',()=>{
 const c=P([20,25,40,50]),a=P([4,6,8,10,12]),b=P([4,6,8,10,12].filter(x=>x!=a)),na=a*100/c,nb=b*100/c,n=na*nb,
 e=sol([`Đổi đơn vị: ${a} m = ${a*100} cm, ${b} m = ${b*100} cm.`,`Theo chiều dài xếp được ${a*100} : ${c} = ${na} viên; theo chiều rộng xếp được ${b*100} : ${c} = ${nb} viên.`,`Số viên gạch = ${na} × ${nb} = ${n}.`],`${n} viên.`,`Phải đổi cùng đơn vị (cm hoặc m) trước khi chia.`);
 return[mc(`Nền nhà hình chữ nhật dài ${a} m, rộng ${b} m được lát kín bằng các viên gạch hình vuông cạnh ${c} cm. Cần bao nhiêu viên gạch (không tính hao hụt)?`,n,[[a*b,'đó là diện tích nền theo m², chưa chia cho diện tích một viên'],[na+nb,'cộng số viên hai chiều thay vì nhân'],[a*b*10000/c,'chia diện tích nền (cm²) cho cạnh viên gạch, không phải diện tích viên gạch']],e),[a,b,c]]})
);

/* ================= TÍNH ĐỐI XỨNG ================= */
A('axis',
gen('axis.dem_truc',()=>{
 const TB=[
  ['hình vuông',4,'Hình vuông có 4 trục đối xứng: 2 đường chéo và 2 đường nối trung điểm các cạnh đối.',{2:'chỉ tính hai đường chéo, còn thiếu hai đường nối trung điểm các cạnh đối',1:'chỉ tính một trục'}],
  ['hình chữ nhật (không phải hình vuông)',2,'Hình chữ nhật có 2 trục đối xứng: hai đường nối trung điểm các cạnh đối. Đường chéo không phải trục đối xứng.',{4:'nhầm hai đường chéo là trục đối xứng (đường chéo chỉ là trục khi là hình vuông)',1:'chỉ tính một trục'}],
  ['hình thoi (không phải hình vuông)',2,'Hình thoi có 2 trục đối xứng là hai đường chéo.',{4:'nhầm với hình vuông',1:'chỉ tính một đường chéo'}],
  ['tam giác đều',3,'Tam giác đều có 3 trục đối xứng: mỗi đường đi qua một đỉnh và trung điểm cạnh đối diện.',{1:'nhầm với tam giác cân',6:'tính mỗi trục hai lần'}],
  ['tam giác cân (không phải tam giác đều)',1,'Tam giác cân có 1 trục đối xứng: đường cao hạ từ đỉnh xuống đáy.',{3:'nhầm với tam giác đều',2:'nhầm hai đường cao còn lại là trục'}],
  ['hình bình hành (không phải hình chữ nhật, hình thoi)',0,'Hình bình hành thông thường không có trục đối xứng (nó chỉ có tâm đối xứng).',{2:'nhầm hai đường chéo là trục đối xứng',4:'nhầm với hình vuông'}],
  ['hình thang cân',1,'Hình thang cân có 1 trục đối xứng: đường thẳng đi qua trung điểm hai đáy.',{2:'nhầm hai đường chéo là trục đối xứng',0:'nhầm với hình thang thường'}],
  ['ngũ giác đều',5,'Ngũ giác đều có 5 trục đối xứng: mỗi trục đi qua một đỉnh và trung điểm cạnh đối diện.',{1:'chỉ tính một trục',10:'tính mỗi trục hai lần'}],
  ['lục giác đều',6,'Lục giác đều có 6 trục đối xứng: 3 trục đi qua các cặp đỉnh đối và 3 trục đi qua trung điểm các cặp cạnh đối.',{3:'chỉ tính các trục qua đỉnh',12:'tính mỗi trục hai lần'}],
  ['đoạn thẳng',2,'Đoạn thẳng có 2 trục đối xứng: đường thẳng chứa nó và đường trung trực của nó.',{1:'chỉ tính đường trung trực',0:'nhầm là không có trục'}],
  ['hình tròn','Vô số','Hình tròn có vô số trục đối xứng: mọi đường kính đều là trục.',{1:'chỉ tính một đường kính',2:'chỉ tính hai đường kính vuông góc',4:'chỉ tính bốn đường'}]],
 it=P(TB),ans=String(it[1]),pool=[0,1,2,3,4,5,6,'Vô số'].filter(v=>String(v)!=ans),
 w=pool.map(v=>[String(v),it[3][v]]),
 e=sol([`Gấp hình theo từng đường thẳng và xem hai nửa có trùng khít không.`,it[2]],`${ans}${it[1]=='Vô số'?'':' trục'}.`,`Trục đối xứng là đường thẳng chia hình thành hai phần chồng khít khi gấp lại.`);
 return[mc(`${it[0][0].toUpperCase()+it[0].slice(1)} có bao nhiêu trục đối xứng?`,ans,w,e),[it[0]]]}),

gen('axis.chu_cai',()=>{
 const ONE=['A','M','T','U','V','Y','B','C','D','E','K'],TWO=['H','X'],NONE=['F','G','J','L','N','P','Q','R','S','Z'],t=R(0,2),
 lab=['đúng một trục đối xứng','đúng hai trục đối xứng','không có trục đối xứng nào'],G=[ONE,TWO,NONE],
 ca=P(G[t]),og=[0,1,2].filter(i=>i!=t),gi=c=>G.findIndex(g=>g.includes(c)),w1=P(G[og[0]]),w2=P(G[og[1]]);let w3;do{w3=P(G[P(og)])}while(w3==w1||w3==w2);
 const w=[w1,w2,w3].map(c=>[c,`chữ ${c} có ${lab[gi(c)]}`]);
 const why={0:'chữ có trục đứng (A, M, T, U, V, Y) hoặc trục ngang (B, C, D, E, K) nhưng không có cả hai',1:'H và X có cả trục đứng lẫn trục ngang',2:'các chữ F, G, J, L, N, P, Q, R, S, Z đều không gấp được thành hai nửa trùng nhau'},
 e=sol([`Xét chữ cái in hoa kiểu không chân (A, B, C, …): gấp theo trục đứng hoặc trục ngang xem hai nửa có trùng khít không.`,`Chữ ${ca} có ${lab[t]}.`,`${why[t][0].toUpperCase()+why[t].slice(1)}.`],`${ca}.`,`Hai nửa phải trùng khít khi gấp; chữ có thể gấp theo trục đứng hoặc trục ngang.`);
 return[mc(`Chữ cái in hoa nào sau đây có ${lab[t]}? (kiểu chữ không chân)`,ca,w,e),[t,ca]]}),

gen('axis.tamdx',()=>{
 const Y=[['hình bình hành','tâm đối xứng là giao điểm hai đường chéo'],['hình chữ nhật','tâm đối xứng là giao điểm hai đường chéo'],['hình thoi','tâm đối xứng là giao điểm hai đường chéo'],['hình vuông','tâm đối xứng là giao điểm hai đường chéo'],['hình tròn','tâm đối xứng là tâm của hình tròn'],['đoạn thẳng','tâm đối xứng là trung điểm của đoạn thẳng'],['lục giác đều','tâm đối xứng là tâm của lục giác đều']],
 N=[['tam giác đều','xoay 180° quanh bất kì điểm nào đều không trùng với chính nó'],['tam giác cân','xoay 180° quanh bất kì điểm nào đều không trùng với chính nó'],['hình thang cân','xoay 180° quanh bất kì điểm nào đều không trùng với chính nó'],['ngũ giác đều','xoay 180° quanh bất kì điểm nào đều không trùng với chính nó'],['tam giác vuông','xoay 180° quanh bất kì điểm nào đều không trùng với chính nó']],
 pos=R(0,1),good=P(pos?N:Y),bad=sh(pos?Y:N).slice(0,3),
 e=sol([`Hình có tâm đối xứng O khi quay 180° quanh O thì hình trùng khít với chính nó.`,pos?`${good[0][0].toUpperCase()+good[0].slice(1)}: ${good[1]}, nên không có tâm đối xứng.`:`${good[0][0].toUpperCase()+good[0].slice(1)} có ${good[1]}.`],`${good[0]}.`,`Tam giác (đều, cân, vuông) và hình thang cân không có tâm đối xứng.`);
 return[mc(pos?`Hình nào sau đây KHÔNG có tâm đối xứng?`:`Hình nào sau đây có tâm đối xứng?`,good[0],bad.map(b=>[b[0],pos?`${b[0]} có ${b[1]}`:`${b[0]}: ${b[1]}`]),e),[pos,good[0]]]}),

gen('axis.tam_vitri',()=>{
 const sh1=P(['hình chữ nhật ABCD','hình thoi ABCD','hình bình hành ABCD','hình vuông ABCD']),ans='giao điểm của hai đường chéo AC và BD',
 e=sol([`${sh1[0].toUpperCase()+sh1.slice(1)} biến thành chính nó khi quay 180° quanh giao điểm hai đường chéo.`,`Giao điểm O của AC và BD là trung điểm của mỗi đường chéo, nên A đối xứng với C và B đối xứng với D qua O.`],`${ans}.`,`Tâm đối xứng không phải là đỉnh hay trung điểm cạnh.`);
 return[mc(`Tâm đối xứng của ${sh1} là:`,ans,[['trung điểm của cạnh AB','trung điểm một cạnh không là tâm đối xứng'],['đỉnh A','một đỉnh không là tâm đối xứng'],['trung điểm của cạnh BC','trung điểm một cạnh không là tâm đối xứng']],e),[sh1]]})
);
HA('axis',
gen('axis.dx_trucso',()=>{
 let a,m;do{a=R(-10,10);m=R(-10,10)}while(a==m||m==0||a==0||2*m-a==-a);
 const r=2*m-a,
 e=sol([`A′ đối xứng với A qua M nghĩa là M là trung điểm của AA′.`,`Khoảng cách từ A đến M là ${Math.abs(m-a)}; điểm A′ nằm bên kia M cùng khoảng cách đó.`,`Tọa độ A′ = 2 × ${iz(m)} − ${pa(a)} = ${ng(r)}.`],`${ng(r)}.`,`Đối xứng qua điểm M (khác gốc O) thì không phải là lấy số đối.`);
 return[mc(`Trên trục số, điểm A biểu diễn số ${iz(a)}, điểm M biểu diễn số ${iz(m)}. Điểm A′ đối xứng với A qua M biểu diễn số:`,r,[[m-a,'lấy hiệu, chưa nhân đôi: M là trung điểm của AA′'],[-a,'đó là điểm đối xứng với A qua gốc O, không phải qua M'],[a-2*m,'sai dấu của kết quả']],e),[a,m]]})
);


})();
