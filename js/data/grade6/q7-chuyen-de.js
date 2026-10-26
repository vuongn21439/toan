/* LỚP 6 · v5 — bộ câu hỏi mới theo "Tuyển tập chuyên đề bồi dưỡng HSG Toán 6".
   Mỗi câu: số liệu ngẫu nhiên, 3 đáp án nhiễu là LỖI HAY GẶP (kèm lý do hiện khi chọn nhầm), lời giải từng bước.
   Nạp vào g (cơ bản) bằng A(...) và h (nâng cao) bằng HA(...). Mã câu (q.k) và tham số (q.p) dùng cho tools/verify.js. */
(()=>{
const {mc,sol,gen,ov,fd,ng,c2,lcm}=BK,
 pm=(a,n,m)=>{let r=1;a%=m;while(n>0){if(n&1)r=r*a%m;a=a*a%m;n>>=1}return r},
 fh=G7H.fh,
 two=v=>String(v).padStart(2,'0');

/* ================= SỐ TỰ NHIÊN ================= */
A('nat',
/* Dãy số theo quy luật (CĐ Số tự nhiên) */
gen('nat.quyluat',()=>{
 const t=R(0,4);let sq,nx,e,w;
 if(t==0){const a=R(1,6),d=R(1,3);sq=[a];for(let i=0;i<4;i++)sq.push(sq[i]+d+i);nx=sq[4]+d+4;
  e=sol([`Tính hiệu hai số liên tiếp: ${[1,2,3,4].map(i=>`${sq[i]} − ${sq[i-1]} = ${sq[i]-sq[i-1]}`).join('; ')}.`,`Các hiệu tăng dần ${d}; ${d+1}; ${d+2}; ${d+3} (mỗi lần thêm 1), nên hiệu tiếp theo là ${d+4}.`,`Số cần tìm = ${sq[4]} + ${d+4} = ${nx}.`],`${nx}`,`Giữ nguyên hiệu cuối là ${d+3} (không tăng thêm 1) sẽ ra ${sq[4]+d+3}.`);
  w=[[sq[4]+d+3,'giữ nguyên hiệu cuối, chưa tăng thêm 1'],[sq[4]+d,'chỉ nhìn hiệu đầu tiên'],[sq[4]+d+5,'tăng hiệu thêm 2 thay vì 1']]}
 else if(t==1){const a=R(1,4);sq=[a];for(let i=0;i<4;i++)sq.push(2*sq[i]+1);nx=2*sq[4]+1;
  e=sol([`Thử xem số sau liên hệ số trước thế nào: ${sq[1]} = 2 × ${sq[0]} + 1; ${sq[2]} = 2 × ${sq[1]} + 1; …`,`Quy luật: mỗi số bằng 2 lần số liền trước cộng 1.`,`Số cần tìm = 2 × ${sq[4]} + 1 = ${nx}.`],`${nx}`,`Dãy này không cách đều: các hiệu ${sq[1]-sq[0]}; ${sq[2]-sq[1]}; ${sq[3]-sq[2]}; … tăng gấp đôi.`);
  w=[[sq[4]+(sq[4]-sq[3]),'coi dãy là cách đều'],[2*sq[4],'quên cộng 1'],[2*sq[4]+2,'cộng 2 thay vì 1']]}
 else if(t==2){const k=R(1,4);sq=[1,2,3,4,5].map(n=>n*n+k);nx=36+k;
  e=sol([`Viết từng số dưới dạng bình phương cộng ${k}: ${sq.map((v,i)=>`${v} = ${i+1}² + ${k}`).join('; ')}.`,`Số hạng thứ n là n² + ${k}.`,`Số hạng thứ 6 là 6² + ${k} = 36 + ${k} = ${nx}.`],`${nx}`,`Các hiệu ${sq[1]-sq[0]}; ${sq[2]-sq[1]}; ${sq[3]-sq[2]}; ${sq[4]-sq[3]} không đổi mà tăng dần 2 đơn vị mỗi lần.`);
  w=[[sq[4]+9,'coi hiệu không đổi (như lần trước)'],[sq[4]+13,'tăng hiệu thêm 4 mỗi lần'],[35+k,'lấy 5×7 + ' + k]]}
 else if(t==3){const a=R(2,4),r=R(2,3);sq=[a];for(let i=0;i<4;i++)sq.push(sq[i]*r);nx=sq[4]*r;
  e=sol([`Lấy số sau chia số trước: ${sq[1]} : ${sq[0]} = ${r}; ${sq[2]} : ${sq[1]} = ${r}; … đều bằng ${r}.`,`Quy luật: mỗi số gấp ${r} lần số liền trước.`,`Số cần tìm = ${sq[4]} × ${r} = ${nx}.`],`${nx}`,`Dãy nhân: không dùng hiệu hai số liền kề để dự đoán.`);
  w=[[sq[4]+(sq[4]-sq[3]),'coi dãy là cách đều'],[sq[4]+r,`cộng ${r} thay vì nhân ${r}`],[sq[4]*r*r,`nhân thừa một lần (×${r*r})`]]}
 else{const a=R(1,4),b=R(1,4);sq=[a,b];for(let i=2;i<5;i++)sq.push(sq[i-1]+sq[i-2]);nx=sq[4]+sq[3];
  e=sol([`Thử cộng hai số liên tiếp: ${sq[0]} + ${sq[1]} = ${sq[2]}; ${sq[1]} + ${sq[2]} = ${sq[3]}; ${sq[2]} + ${sq[3]} = ${sq[4]}.`,`Quy luật: từ số thứ ba, mỗi số bằng tổng hai số đứng ngay trước nó.`,`Số cần tìm = ${sq[3]} + ${sq[4]} = ${nx}.`],`${nx}`,`Chỉ cộng số cuối với chính nó (${sq[4]} + ${sq[4]} = ${2*sq[4]}) là sai quy luật.`);
  w=[[2*sq[4],'nhân đôi số cuối'],[sq[4]+(sq[4]-sq[3]),'coi dãy là cách đều'],[nx+1,'cộng thừa 1']]}
 return[mc(`Tìm số hạng tiếp theo của dãy: ${sq.join('; ')}; …`,nx,w,e),[t,sq]]}),

/* So sánh hai tích không cần tính (CĐ Số tự nhiên) */
gen('nat.sosanhtich',()=>{
 const m=R(20,99),d=R(1,6),sw=R(0,1),X=`${m-d} × ${m+d}`,Y=`${m} × ${m}`,tr=(m-d)*(m+d)<m*m,
  A=sw?Y:X,B=sw?X:Y,ans=sw?'A > B':'A < B',rv=sw?'A < B':'A > B';
 const e=sol([`Hai tích đều có tổng hai thừa số bằng ${2*m} (${m-d} + ${m+d} = ${m} + ${m} = ${2*m}).`,`Tách: ${m} × ${m} = ${m-d} × ${m} + ${d} × ${m}.`,`Tách: ${m-d} × ${m+d} = ${m-d} × ${m} + ${m-d} × ${d}.`,`Hai vế có chung ${m-d} × ${m}; còn lại ${d} × ${m} = ${d*m} lớn hơn ${m-d} × ${d} = ${(m-d)*d}.`,`Vậy ${m} × ${m} = ${m*m} lớn hơn ${m-d} × ${m+d} = ${(m-d)*(m+d)} đúng ${d*d} đơn vị.`],`${ans} (tích hai số có tổng không đổi thì lớn nhất khi hai số bằng nhau).`,`Hai tích có cùng tổng các thừa số chưa chắc bằng nhau.`);
 return[mc(`So sánh A = ${A} và B = ${B} (không cần tính ra kết quả):`,ans,[[rv,'ngược chiều: hai thừa số càng gần nhau thì tích càng LỚN'],['A = B','cùng tổng hai thừa số nhưng tích không bằng nhau'],['Không so sánh được','có thể so sánh bằng cách tách tích, không cần tính cả hai']],e,String),[m,d,sw]]}),

/* Phép chia có dư */
gen('nat.chiadu',()=>{
 const d=R(7,25),qq=R(6,19),r=R(1,d-1),N=d*qq+r,ask=R(0,1);
 if(ask==0){
  const e=sol([`Trong phép chia có dư: số bị chia = số chia × thương + số dư.`,`Số bị chia = ${d} × ${qq} + ${r}.`,`${d} × ${qq} = ${d*qq}, cộng ${r} được ${N}.`],`số bị chia là ${N}.`,`Phải cộng thêm số dư. ${d} × ${qq} = ${d*qq} mới là phần chia hết.`);
  return[mc(`Trong một phép chia có dư, số chia là ${d}, thương là ${qq}, số dư là ${r}. Số bị chia là:`,N,[[d*qq,'quên cộng số dư'],[d*qq-r,'trừ số dư thay vì cộng'],[d*qq+r+r,'cộng số dư hai lần']],e),[0,d,qq,r]]}
 const e=sol([`Số bị chia = số chia × thương + số dư, nên số chia × thương = ${N} − ${r} = ${N-r}.`,`Số chia = ${N-r} : ${qq} = ${d}.`,`Thử lại: ${d} × ${qq} + ${r} = ${N} đúng.`],`số chia là ${d}.`,`Nhớ trừ số dư ${r} trước khi chia cho thương.`);
 return[mc(`Trong một phép chia có dư, số bị chia là ${N}, thương là ${qq}, số dư là ${r}. Số chia là:`,d,[[qq,'nhầm thương với số chia'],[Math.ceil(N/qq),`chia cả ${N} (chưa trừ số dư) rồi làm tròn lên`],[N-r-qq,'lấy hiệu thay vì chia']],e),[1,N,qq,r]]}),
/* Rút gọn cách nói: số hạng bị trừ trong dãy */
);

HA('nat',
/* Đánh số trang sách (CĐ2: đếm số) */
gen('nat.trang',()=>{
 const tw=R(0,3)==0;let n,T,e,w;
 if(tw){n=R(30,99);T=9+2*(n-9);
  e=sol([`Trang 1 đến 9: 9 trang × 1 chữ số = 9 chữ số.`,`Số chữ số còn lại dành cho các trang có 2 chữ số: ${T} − 9 = ${T-9}.`,`Số trang có 2 chữ số: ${T-9} : 2 = ${n-9}.`,`Tổng số trang: 9 + ${n-9} = ${n}.`],`cuốn sách có ${n} trang.`,`Quên 9 trang đầu (chỉ có 1 chữ số) sẽ ra ${n-9}.`);
  w=[[n-9,'mới đếm các trang 2 chữ số, quên 9 trang đầu'],[Math.ceil(T/2),'coi mọi trang đều có 2 chữ số'],[n+1,'cộng 10 thay vì 9 trang đầu']]}
 else{n=R(120,999);T=9+180+3*(n-99);
  e=sol([`Trang 1 đến 9: 9 trang × 1 chữ số = 9 chữ số.`,`Trang 10 đến 99: 90 trang × 2 chữ số = 180 chữ số.`,`Đã dùng 9 + 180 = 189 chữ số, còn lại ${T} − 189 = ${T-189} chữ số cho các trang có 3 chữ số.`,`Số trang có 3 chữ số: ${T-189} : 3 = ${n-99}.`,`Tổng số trang: 99 + ${n-99} = ${n}.`],`cuốn sách có ${n} trang.`,`Quên cộng 99 trang đầu sẽ ra ${n-99}; cộng 100 thay vì 99 sẽ ra ${n+1}.`);
  w=[[n-99,'mới đếm các trang 3 chữ số'],[T/3,'coi mọi trang đều có 3 chữ số'],[n+1,'cộng 100 thay vì 99 trang đầu']]}
 return[mc(`Để đánh số trang một cuốn sách (bắt đầu từ trang 1), người ta phải viết tất cả ${T} chữ số. Cuốn sách có bao nhiêu trang?`,n,w,e),[n]]}),

/* Chữ số thứ k của dãy 123456789101112… */
gen('nat.chuso_k',()=>{
 const k=R(200,1100);let s='';for(let i=1;s.length<k+3;i++)s+=i;
 const m=k-189,idx=Math.ceil(m/3),num=99+idx,pos=m-3*(idx-1),d=String(num)[pos-1],c=[];
 [0,1,2].forEach(i=>{if(i!=pos-1)c.push([String(num)[i],`là chữ số thứ ${i+1} của ${num}, chưa đúng vị trí`])});
 [num-1,num+1].forEach(v=>c.push([String(v)[pos-1],`là chữ số thứ ${pos} của ${v}, nhầm sang số bên cạnh`]));
 const e=sol([`Có 9 số có 1 chữ số → 9 chữ số; có 90 số có 2 chữ số → 180 chữ số. Tổng cộng 189 chữ số.`,`Chữ số thứ ${k} nằm trong các số có 3 chữ số, là chữ số thứ ${k} − 189 = ${m} kể từ số 100.`,`Mỗi số chiếm 3 chữ số: ${m} = 3 × ${idx-1} + ${pos}. Đã viết trọn ${idx-1} số (100; 101; …; ${98+idx}).`,`Chữ số cần tìm là chữ số thứ ${pos} của số tiếp theo là ${num}.`],`chữ số thứ ${k} là ${d}.`,`Đếm lệch 1 vị trí sẽ lấy nhầm chữ số của số ${num-1} hoặc ${num+1}.`);
 return[mc(`Viết liên tiếp các số tự nhiên từ 1 để được dãy chữ số 123456789101112… Chữ số thứ ${k} của dãy là chữ số nào?`,d,[...c,...'0123456789'.split('')],e,String),[k]]}),

/* Đếm số có k chữ số chia hết cho m và tận cùng bằng b */
gen('nat.dem_chia',()=>{
 const m=P([3,7,9,11,13]),b=R(0,9),dg=R(3,4),lo=10**(dg-1),hi=10**dg-1,st=10*m;let f=null,l=null;
 for(let v=lo;v<=hi;v++)if(v%10==b&&v%m==0){if(f===null)f=v;l=v}
 const cnt=(l-f)/st+1,allm=Math.floor(hi/m)-Math.floor((lo-1)/m),allb=9*10**(dg-2);
 const e=sol([`Số cần đếm vừa chia hết cho ${m}, vừa tận cùng bằng ${b}. Hai số liền nhau thỏa mãn cách nhau 10 × ${m} = ${st} (vì chia hết cho ${m} và có cùng chữ số tận cùng).`,`Số nhỏ nhất có ${dg} chữ số thỏa mãn: ${f}. Số lớn nhất: ${l}.`,`Đây là dãy cách đều với khoảng cách ${st}: ${f}; ${f+st}; …; ${l}.`,`Số số hạng = (${l} − ${f}) : ${st} + 1 = ${(l-f)/st} + 1 = ${cnt}.`],`có ${cnt} số.`,`Đếm số số hạng của dãy cách đều phải cộng thêm 1: (${l} − ${f}) : ${st} = ${(l-f)/st} mới là số khoảng.`);
 return[mc(`Có bao nhiêu số tự nhiên có ${dg} chữ số, chia hết cho ${m} và có chữ số tận cùng bằng ${b}?`,cnt,[[cnt-1,'quên cộng 1 khi đếm số số hạng'],[allm,`đếm mọi bội của ${m}, bỏ điều kiện tận cùng`],[allb,`đếm mọi số tận cùng ${b}, bỏ điều kiện chia hết`],[(l-f)/m+1,`lấy khoảng cách ${m} thay vì ${st}`]],e),[m,b,dg]]}),

/* Tổng dãy số cách đều a + (a+d) + … + z */
gen('nat.tongday',()=>{
 const n=R(12,60),a=R(1,15),d=R(2,8),z=a+(n-1)*d,S=n*(a+z)/2,w=[];
 if(Number.isInteger((n-1)*(a+z)/2))w.push([(n-1)*(a+z)/2,'đếm thiếu 1 số hạng (quên cộng 1)']);
 if(Number.isInteger((n+1)*(a+z)/2))w.push([(n+1)*(a+z)/2,'đếm thừa 1 số hạng']);
 w.push([n*(a+z),'quên chia cho 2']);
 const e=sol([`Hai số liền nhau hơn kém ${d}, đây là dãy cách đều.`,`Số số hạng = (${z} − ${a}) : ${d} + 1 = ${n-1} + 1 = ${n}.`,`Ghép cặp đầu với cuối: ${a} + ${z} = ${a+z}; có ${n} số hạng nên tổng = (${a+z} × ${n}) : 2.`,`${a+z} × ${n} = ${n*(a+z)}; chia 2 được ${S}.`],`S = ${S}.`,`Số số hạng = (số cuối − số đầu) : khoảng cách + 1, đừng quên "+ 1" và ":2".`);
 return[mc(`Tính tổng S = ${a} + ${a+d} + ${a+2*d} + … + ${z} (các số hạng cách đều ${d} đơn vị).`,S,w,e),[a,d,n]]}),

/* Tìm x: N : [a − (2x − b)] = c */
gen('nat.timx_ngoac',()=>{
 const N=P([360,420,480,540,600,720,840,900]),cs=[2,3,4,5,6,8,9,10,12,15,18,20,30].filter(c=>N%c==0),c=P(cs),D=N/c,x=R(7,30),b=P([2,4,6]),a=D+2*x-b,w=[[2*x,'quên chia 2 ở bước cuối (đó mới là 2x)'],[(a-D)/2,`quên cộng ${b} khi chuyển vế`]];
 if(Number.isInteger((a-D-b)/2)&&(a-D-b)/2>0)w.push([(a-D-b)/2,`sai dấu khi chuyển ${b} (phải cộng, không trừ)`]);
 if(Number.isInteger((D-a+b)/2)&&(D-a+b)/2>0)w.push([(D-a+b)/2,'đảo vế khi trừ (lấy bé trừ lớn)']);
 const e=sol([`Số chia = ${N} : ${c} = ${D}: ngoặc vuông [${a} − (2x − ${b})] = ${D}.`,`Số trừ = số bị trừ − hiệu: (2x − ${b}) = ${a} − ${D} = ${a-D}.`,`2x = ${a-D} + ${b} = ${a-D+b}.`,`x = ${a-D+b} : 2 = ${x}.`],`x = ${x}.`,`Giải từ ngoài vào trong. Thử lại: ${a} − (2×${x} − ${b}) = ${a} − ${2*x-b} = ${D}; ${N} : ${D} = ${c} đúng.`);
 return[mc(`Tìm số tự nhiên x, biết: ${N} : [${a} − (2x − ${b})] = ${c}`,x,w,e),[N,a,b,c]]}),

/* n(n+1)(n+2)(n+3)+1 là số chính phương (CĐ9) */
gen('nat.chinhphuong4',()=>{
 const k=R(2,9),Aa=k*(k+1)*(k+2)*(k+3)+1,m=k*k+3*k+1;
 const e=sol([`Với n = ${k}: A = ${k}×${k+1}×${k+2}×${k+3} + 1 = ${Aa-1} + 1 = ${Aa}.`,`Ghép thừa số đầu với cuối, hai thừa số giữa với nhau: ${k}×${k+3} = ${k*(k+3)} và ${k+1}×${k+2} = ${(k+1)*(k+2)}. Hai tích này hơn kém 2.`,`Đặt t = ${k*(k+3)}: A = t × (t + 2) + 1 = t² + 2t + 1 = (t + 1)².`,`Vậy A = (${k*(k+3)} + 1)² = ${m}².`],`A = ${m}² = ${Aa}.`,`Quên số 1 cuối sẽ lấy ${k*(k+3)}; lấy tích hai thừa số giữa sẽ ra ${(k+1)*(k+2)}.`);
 return[mc(`Cho A = n(n+1)(n+2)(n+3) + 1. Với n = ${k}, A bằng bình phương của số tự nhiên nào?`,m,[[k*(k+3),'lấy tích hai thừa số ngoài, quên cộng 1'],[(k+1)*(k+2),'lấy tích hai thừa số giữa'],[k*k+3*k-1,'trừ 1 thay vì cộng 1']],e),[k]]})
);

/* ================= LŨY THỪA ================= */
A('pow',
/* Viết tích thành lũy thừa của cơ số 2 hoặc 3 */
gen('pow.dang',()=>{
 const b=P([2,3]),t=R(0,1);let q,E,e,w,ex0,u1,p1x,v1,p2x;
 if(t==0){const ex=sh(b==2?[2,3,4,5]:[2,3,4]).slice(0,3),nums=ex.map(v=>b**v);E=ex[0]+ex[1]+ex[2];ex0=ex;
  q=`Viết tích ${nums.join(' × ')} dưới dạng lũy thừa của ${b}: ${b}^?`;
  e=sol([`Viết từng thừa số dưới dạng lũy thừa của ${b}: ${nums.map((v,i)=>`${v} = ${b}^${ex[i]}`).join('; ')}.`,`Nhân các lũy thừa cùng cơ số: giữ cơ số, cộng các số mũ.`,`Số mũ: ${ex.join(' + ')} = ${E}.`],`tích bằng ${b}^${E}.`,`Nhân cùng cơ số thì CỘNG số mũ, không nhân số mũ.`);
  w=[[ex[0]*ex[1]*ex[2],'nhân các số mũ thay vì cộng'],[E-1,'cộng thiếu 1'],[E+1,'cộng thừa 1'],[nums.reduce((s,v)=>s+v,0),'cộng các thừa số']]}
 else{const p1=R(2,4),p2=R(2,3),e1=2,e2=3,bb=b==2?[4,8]:[9,27],u=bb[0],v=bb[1],ex1=p1*e1,ex2=p2*e2;E=ex1+ex2;u1=u;p1x=p1;v1=v;p2x=p2;
  q=`Viết ${u}^${p1} × ${v}^${p2} dưới dạng lũy thừa của ${b}: ${b}^?`;
  e=sol([`${u} = ${b}^${e1} nên ${u}^${p1} = (${b}^${e1})^${p1} = ${b}^${ex1} (lũy thừa của lũy thừa: nhân số mũ).`,`${v} = ${b}^${e2} nên ${v}^${p2} = (${b}^${e2})^${p2} = ${b}^${ex2}.`,`Nhân cùng cơ số: ${b}^${ex1} × ${b}^${ex2} = ${b}^${E} (cộng số mũ).`],`kết quả là ${b}^${E}.`,`Lũy thừa của lũy thừa thì NHÂN số mũ, nhân hai lũy thừa cùng cơ số thì CỘNG số mũ.`);
  w=[[p1+p2,'bỏ qua việc đổi cơ số về cùng một cơ số'],[p1*p2+e1*e2,'nhân số mũ ở bước cộng'],[ex1*ex2,'nhân hai số mũ'],[e1*p1+e2*p2+1,'cộng thừa 1']]}
 return[mc(q,E,w,e),t==0?[b,0,ex0]:[b,1,u1,p1x,v1,p2x]]})
);

HA('pow',
/* So sánh a^m và b^n: đưa về cùng số mũ */
gen('pow.cmp_mu',()=>{
 let a,b,p,q;do{a=R(2,9);b=R(2,9);p=R(2,6);q=R(2,6)}while(a==b||p==q||gcd(p,q)!=1||a**p==b**q||(a==4&&b==2)||(a==2&&b==4));
 const g=P([10,20,25,30,50,100]),m=p*g,n=q*g,X=a**p,Y=b**q,ans=X>Y?'A > B':'A < B',rv=X>Y?'A < B':'A > B',naive=a>b?'A > B':'A < B';
 const e=sol([`Hai số mũ ${m} và ${n} cùng chia hết cho ${g}: ${m} = ${p} × ${g}; ${n} = ${q} × ${g}.`,`A = ${a}^${m} = (${a}^${p})^${g} = ${X}^${g};  B = ${b}^${n} = (${b}^${q})^${g} = ${Y}^${g}.`,`Hai lũy thừa cùng số mũ ${g}: cơ số lớn hơn thì lũy thừa lớn hơn. Ta có ${X} ${X>Y?'>':'<'} ${Y}.`],`${ans}.`,`Số mũ khác nhau thì không thể so sánh trực tiếp hai cơ số ${a} và ${b}.`);
 const w=[['A = B','nhầm: sau khi đưa về cùng số mũ vẫn phải so sánh hai cơ số mới'],['Không so sánh được','đưa về cùng số mũ là so sánh được']];
 w.push(naive!=ans?[naive,`chỉ nhìn cơ số ${a} và ${b}, quên số mũ khác nhau`]:[rv,'ngược chiều (cơ số lớn hơn thì lũy thừa lớn hơn)']);
 return[mc(`So sánh A = ${a}^${m} và B = ${b}^${n}.`,ans,w,e,String),[a,m,b,n]]}),

/* So sánh qua lũy thừa trung gian (CĐ3 dạng 1–2) */
gen('pow.cmp_trunggian',()=>{
 const n=R(1000,2025),IT=[
  {A:'2^91',B:'5^35',a:()=>2n**91n,b:()=>5n**35n,st:[`2^91 > 2^90 = (2^5)^18 = 32^18.`,`5^35 < 5^36 = (5^2)^18 = 25^18.`,`Vì 32^18 > 25^18 nên 2^91 > 32^18 > 25^18 > 5^35.`]},
  {A:'3^21',B:'2^31',a:()=>3n**21n,b:()=>2n**31n,st:[`3^21 = 3 × 3^20 = 3 × (3^2)^10 = 3 × 9^10.`,`2^31 = 2 × 2^30 = 2 × (2^3)^10 = 2 × 8^10.`,`Vì 3 > 2 và 9^10 > 8^10 nên 3 × 9^10 > 2 × 8^10, tức 3^21 > 2^31.`]},
  {A:'2^100',B:'10^30',a:()=>2n**100n,b:()=>10n**30n,st:[`2^100 = (2^10)^10 = 1024^10.`,`10^30 = (10^3)^10 = 1000^10.`,`Vì 1024 > 1000 nên 1024^10 > 1000^10, tức 2^100 > 10^30.`]},
  {A:'9^8',B:'8^9',a:()=>9n**8n,b:()=>8n**9n,st:[`9^8 < 10^8 = (10^2)^4 = 100^4 = 100 × 100^3.`,`8^9 = (8^3)^3 = 512^3 > 500^3 = (5 × 100)^3 = 125 × 100^3.`,`Vì 100 × 100^3 < 125 × 100^3 nên 9^8 < 8^9.`]},
  {A:'17^14',B:'31^11',a:()=>17n**14n,b:()=>31n**11n,st:[`17^14 > 16^14 = (2^4)^14 = 2^56.`,`31^11 < 32^11 = (2^5)^11 = 2^55.`,`Vì 2^56 > 2^55 nên 17^14 > 2^56 > 2^55 > 31^11.`]},
  {A:`${n}^10 + ${n}^9`,B:`${n+1}^10`,a:()=>BigInt(n)**10n+BigInt(n)**9n,b:()=>BigInt(n+1)**10n,st:[`A = ${n}^10 + ${n}^9 = ${n}^9 × (${n} + 1) = ${n}^9 × ${n+1}.`,`B = ${n+1}^10 = ${n+1}^9 × ${n+1}.`,`Hai tích có chung thừa số ${n+1}; vì ${n}^9 < ${n+1}^9 nên A < B.`]}],
  it=P(IT),sw=R(0,1),X=sw?it.B:it.A,Y=sw?it.A:it.B,va=it.a(),vb=it.b(),rel=(sw?vb>va:va>vb)?'A > B':'A < B',rv=rel=='A > B'?'A < B':'A > B';
 const e=sol(it.st,`${rel}.`,`Không thể so sánh bằng cách "nhìn" cơ số hay số mũ: phải bắc cầu qua một lũy thừa trung gian cùng cơ số hoặc cùng số mũ.`);
 return[mc(`So sánh A = ${X} và B = ${Y}.`,rel,[[rv,'ngược chiều: chưa bắc cầu qua lũy thừa trung gian'],['A = B','hai lũy thừa khác cơ số, khác số mũ không thể bằng nhau'],['Không so sánh được','có thể bắc cầu qua lũy thừa trung gian']],e,String),[it.A,sw]]}),

/* Hai chữ số tận cùng của 7^n */
gen('pow.tancung2',()=>{
 const n=R(14,2026),r=n%4,k=(n-r)/4,ends={0:'01',1:'07',2:'49',3:'43'},ans=ends[r];
 const why={0:`đúng khi số mũ chia hết cho 4`,1:'đúng khi số mũ chia 4 dư 1',2:'đúng khi số mũ chia 4 dư 2',3:'đúng khi số mũ chia 4 dư 3'};
 const e=sol([`Tính vài lũy thừa đầu: 7^1 = 07; 7^2 = 49; 7^3 = 343 (tận cùng 43); 7^4 = 2401 (tận cùng 01).`,`7^4 tận cùng 01 nên (7^4)^k cũng tận cùng 01 (01 × 01 = 01).`,`Ta có ${n} = 4 × ${k} + ${r}, nên 7^${n} = (7^4)^${k} × 7^${r}.`,r==0?`7^${n} = (7^4)^${k} có hai chữ số tận cùng là 01.`:`Hai chữ số tận cùng của 7^${n} chính là của 7^${r}, tức ${ans}.`],`hai chữ số tận cùng là ${ans}.`,`Hai chữ số tận cùng của 7^n lặp lại theo chu kì 4: 07; 49; 43; 01 (ứng với số mũ chia 4 dư 1; 2; 3; 0).`);
 return[mc(`Hai chữ số tận cùng của 7^${n} là:`,ans,Object.keys(ends).filter(i=>i!=r).map(i=>[ends[i],`${ends[i]} ${why[i]}`]),e,String),[n]]}),

/* Chữ số tận cùng của a^m + b^n hoặc a^m × b^n */
gen('pow.tancung_tong',()=>{
 const CY={2:[2,4,8,6],3:[3,9,7,1],4:[4,6],7:[7,9,3,1],8:[8,4,2,6],9:[9,1]},bs=Object.keys(CY).map(Number);
 let a=P(bs),b=P(bs);while(b==a)b=P(bs);
 const m=R(11,99),n=R(11,99),su=R(0,1),la=pm(a,m,10),lb=pm(b,n,10),ans=(su?la+lb:la*lb)%10,
  ca=CY[a],cb=CY[b],ia=m%ca.length,ib=n%cb.length,wa=ca[ia%ca.length],wb=cb[ib%cb.length];
 const e=sol([`Chữ số tận cùng của ${a}^k lặp theo chu kì: ${ca.join('; ')} (chu kì ${ca.length}).`,`${m} chia ${ca.length} dư ${m%ca.length}${m%ca.length?'':' (chia hết)'}, nên ${a}^${m} tận cùng bằng ${la}.`,`Chữ số tận cùng của ${b}^k lặp theo chu kì: ${cb.join('; ')} (chu kì ${cb.length}). ${n} chia ${cb.length} dư ${n%cb.length}${n%cb.length?'':' (chia hết)'}, nên ${b}^${n} tận cùng bằng ${lb}.`,su?`Tổng có chữ số tận cùng là chữ số tận cùng của ${la} + ${lb} = ${la+lb}, tức ${ans}.`:`Tích có chữ số tận cùng là chữ số tận cùng của ${la} × ${lb} = ${la*lb}, tức ${ans}.`],`chữ số tận cùng là ${ans}.`,`Khi số mũ chia hết cho chu kì, lấy PHẦN TỬ CUỐI của chu kì (ví dụ 2^4 tận cùng 6), không lấy phần tử đầu.`);
 const w=[[(su?(a+b):(a*b))%10,'dùng chữ số tận cùng của cơ số, bỏ qua số mũ'],[(su?la*lb:la+lb)%10,su?'nhân thay vì cộng':'cộng thay vì nhân'],[((su?wa+wb:wa*wb))%10,'lệch chu kì khi số mũ chia hết cho chu kì'],...sh([0,1,2,3,4,5,6,7,8,9])];
 return[mc(`Chữ số tận cùng của ${a}^${m} ${su?'+':'×'} ${b}^${n} là:`,ans,w,e),[a,m,b,n,su]]}),

/* Rút gọn biểu thức lũy thừa (CĐ6 dạng 1) */
gen('pow.rutgon',()=>{
 const a=P([2,3,5]),t=R(1,3),p=R(2,6),m=p+t,u=R(2,30);let v=R(2,30);while(v==u)v=R(2,30);
 const Nn=`${a}^${m}·${u} + ${a}^${m}·${v}`,Dd=`${a}^${p}·${u+v}`,val=a**t;
 const e=sol([`Tử số: đặt thừa số chung ${a}^${m}: ${a}^${m}·${u} + ${a}^${m}·${v} = ${a}^${m} × (${u} + ${v}) = ${a}^${m} × ${u+v}.`,`Mẫu số là ${a}^${p} × ${u+v}.`,`Chia tử cho mẫu: (${a}^${m} × ${u+v}) : (${a}^${p} × ${u+v}) = ${a}^${m} : ${a}^${p}.`,`Chia hai lũy thừa cùng cơ số: trừ số mũ: ${a}^${m-p} = ${val}.`],`giá trị bằng ${val}.`,`Đặt thừa số chung trước, đừng tính từng lũy thừa lớn.`);
 return[mc(`Tính giá trị biểu thức: ${fh(Nn,Dd)}`,val,[[a**(t+1),'cộng thêm 1 vào hiệu số mũ'],[a**(t-1),'trừ thừa 1 ở số mũ'],[a**t*(u+v),`quên rút gọn thừa số ${u+v}`],[a**m,'chỉ lấy số mũ của tử']],e),[a,m,p,u,v]]}),

/* Tìm x trong phương trình mũ */
gen('pow.timx',()=>{
 const b=P([2,3,5]),x=R(2,6),t=R(0,2);let q,val,fac;
 if(t==0){fac=1+b+b*b;val=b**x*fac;q=`${b}^x + ${b}^(x+1) + ${b}^(x+2) = ${val}`}
 else if(t==1){fac=1+b;val=b**x*fac;q=`${b}^x + ${b}^(x+1) = ${val}`}
 else{fac=b-1;val=b**x*fac;q=`${b}^(x+1) − ${b}^x = ${val}`}
 const sup=s=>s.replace(/\^\(x\+(\d)\)/g,'<sup>x+$1</sup>').replace(/\^x/g,'<sup>x</sup>');
 const steps=t==0?[`Đặt ${b}^x làm thừa số chung: ${b}^x × (1 + ${b} + ${b*b}) = ${b}^x × ${fac}.`,`${b}^x × ${fac} = ${val}, nên ${b}^x = ${val} : ${fac} = ${b**x}.`,`${b**x} = ${b}^${x} nên x = ${x}.`]
  :t==1?[`Đặt ${b}^x làm thừa số chung: ${b}^x × (1 + ${b}) = ${b}^x × ${fac}.`,`${b}^x × ${fac} = ${val}, nên ${b}^x = ${val} : ${fac} = ${b**x}.`,`${b**x} = ${b}^${x} nên x = ${x}.`]
  :[`Viết ${b}^(x+1) = ${b}^x × ${b}, nên vế trái = ${b}^x × ${b} − ${b}^x = ${b}^x × (${b} − 1) = ${b}^x × ${fac}.`,`${b}^x × ${fac} = ${val}, nên ${b}^x = ${val} : ${fac} = ${b**x}.`,`${b**x} = ${b}^${x} nên x = ${x}.`];
 const e=sol(steps.map(sup),`x = ${x}.`,`${b**x} là giá trị của ${b}^x, chưa phải x.`);
 return[mc(`Tìm số tự nhiên x, biết: ${sup(q)}`,x,[[b**x,`đó mới là giá trị ${b}^x, chưa phải số mũ x`],[x+1,'nhầm x với số mũ của số hạng thứ hai (x + 1)'],[t==0?x+2:x-1,t==0?'nhầm x với số mũ của số hạng cuối (x + 2)':'trừ thừa 1 khi so sánh số mũ']],e),[b,t,val]]})
);

/* ================= TẬP HỢP ================= */
A('set',
/* Số phần tử của tập hợp các số cách đều */
gen('set.dem_buoc',()=>{
 const d=R(2,7),a=R(1,12),n=R(8,40),z=a+(n-1)*d;
 const e=sol([`Các phần tử cách đều nhau ${d} đơn vị: ${a}; ${a+d}; ${a+2*d}; …; ${z}.`,`Số phần tử = (số cuối − số đầu) : khoảng cách + 1.`,`(${z} − ${a}) : ${d} + 1 = ${n-1} + 1 = ${n}.`],`tập hợp có ${n} phần tử.`,`Đếm số khoảng cách (${n-1}) chưa phải số phần tử; phải cộng thêm 1.`);
 return[mc(`Tập hợp A = {${a}; ${a+d}; ${a+2*d}; …; ${z}} (các phần tử cách đều nhau ${d} đơn vị) có bao nhiêu phần tử?`,n,[[n-1,'quên cộng 1'],[z-a+1,`coi khoảng cách là 1 thay vì ${d}`],[n+1,'cộng thừa 1']],e),[a,d,z]]})
);

HA('set',
/* Hai tập hợp giao nhau (Venn) */
gen('set.venn',()=>{
 const C=R(3,10),a=C+R(4,14),b=C+R(4,14),U=a+b-C,N=U+R(0,8),t=R(0,2);let q,ans,w,e;
 const base=`Lớp 6A có ${N} học sinh; ${a} em thích bóng đá, ${b} em thích bóng rổ, trong đó ${C} em thích cả hai môn. `;
 if(t==0){q=base+'Có bao nhiêu em thích ít nhất một trong hai môn?';ans=U;
  e=sol([`Hai nhóm có ${C} em được đếm hai lần (nằm trong cả hai nhóm).`,`Số em thích ít nhất một môn = ${a} + ${b} − ${C}.`,`= ${a+b} − ${C} = ${U}.`],`${U} em.`,`Cộng thẳng ${a} + ${b} = ${a+b} sẽ đếm trùng ${C} em hai lần.`);
  w=[[a+b,'cộng thẳng, đếm trùng nhóm thích cả hai'],[a+b-2*C,'trừ phần chung hai lần'],[a+b+C,'cộng cả phần chung']]}
 else if(t==1){q=base+'Có bao nhiêu em không thích môn nào trong hai môn đó?';ans=N-U;
  e=sol([`Số em thích ít nhất một môn = ${a} + ${b} − ${C} = ${U} (trừ ${C} em đếm hai lần).`,`Số em không thích môn nào = tổng số học sinh − số em thích ít nhất một môn.`,`= ${N} − ${U} = ${N-U}.`],`${N-U} em.`,`Phải trừ phần chung ${C} trước, nếu không sẽ ra ${N-(a+b)} (có thể âm).`);
  w=[...(N-a-b>=0?[[N-a-b,'quên cộng lại phần chung bị trừ hai lần']]:[]),[N-a-b+2*C,'cộng lại phần chung hai lần'],[N-U+C,'trừ thiếu phần chung'],[N-a,'chỉ trừ nhóm thích bóng đá']]}
 else{q=base+'Có bao nhiêu em CHỈ thích bóng đá (không thích bóng rổ)?';ans=a-C;
  e=sol([`Nhóm thích bóng đá gồm ${a} em, trong đó ${C} em thích cả hai môn.`,`Những em chỉ thích bóng đá = ${a} − ${C} = ${a-C}.`],`${a-C} em.`,`Đáp ${a} là tính cả các em thích bóng rổ.`);
  w=[[a,'tính luôn cả nhóm thích cả hai môn'],[b-C,'nhầm sang nhóm chỉ thích bóng rổ'],[U-C,'tính số em thích đúng một trong hai môn']]}
 return[mc(q,ans,w,e),[a,b,C,N,t]]}),

/* Đếm tập con có điều kiện */
gen('set.con_chua',()=>{
 const n=R(4,8),t=R(0,3),s=['a','b','c','d','e','g','h','k'].slice(0,n);let q,ans,w,e;
 if(t==0){q=`Tập hợp A = {${s.join('; ')}} có ${n} phần tử. Có bao nhiêu tập hợp con của A chứa phần tử a?`;ans=2**(n-1);
  e=sol([`Phần tử a đã được chọn sẵn. Mỗi phần tử trong ${n-1} phần tử còn lại có 2 lựa chọn: thuộc hoặc không thuộc tập con.`,`Số tập con chứa a = 2^${n-1} = ${2**(n-1)}.`,`Kiểm tra: tổng số tập con 2^${n} = ${2**n} chia đều thành hai nhóm: chứa a và không chứa a.`],`${ans} tập con.`,`2^${n} = ${2**n} là tổng số tập con (kể cả không chứa a).`);
  w=[[2**n,'đếm cả các tập con không chứa a'],[n-1,'chỉ đếm số phần tử còn lại'],[2**(n-1)-1,'trừ nhầm tập rỗng (tập rỗng không chứa a nên không bị đếm)']]}
 else if(t==1){q=`Tập hợp A có ${n} phần tử. Có bao nhiêu tập hợp con KHÁC rỗng của A?`;ans=2**n-1;
  e=sol([`Tổng số tập con của A là 2^${n} = ${2**n} (mỗi phần tử thuộc hoặc không thuộc tập con).`,`Trong đó có đúng 1 tập rỗng.`,`Số tập con khác rỗng = ${2**n} − 1 = ${2**n-1}.`],`${ans} tập con.`,`Quên trừ tập rỗng sẽ ra ${2**n}.`);
  w=[[2**n,'quên loại tập rỗng'],[2**n-2,'loại cả tập A (A vẫn là tập con khác rỗng)'],[2**(n-1),'chia đôi sai']]}
 else if(t==2){q=`Tập hợp A = {${s.join('; ')}} có ${n} phần tử. Có bao nhiêu tập hợp con của A chứa cả hai phần tử a và b?`;ans=2**(n-2);
  e=sol([`Hai phần tử a và b đã được chọn sẵn.`,`Mỗi phần tử trong ${n-2} phần tử còn lại có 2 lựa chọn: thuộc hoặc không thuộc tập con.`,`Số tập con = 2^${n-2} = ${2**(n-2)}.`],`${ans} tập con.`,`Mỗi phần tử đã bị ép phải chọn thì không còn "2 lựa chọn" nữa.`);
  w=[[2**(n-1),'chỉ cố định một phần tử'],[2**(n-2)*2,'không loại phần tử đã chọn sẵn'],[2*(n-2),'nhầm với phép nhân hai số']]}
 else{q=`Tập hợp A = {${s.join('; ')}} có ${n} phần tử. Có bao nhiêu tập hợp con của A KHÔNG chứa phần tử a và KHÔNG chứa phần tử b?`;ans=2**(n-2);
  e=sol([`Loại hẳn hai phần tử a và b: còn lại ${n-2} phần tử có thể dùng.`,`Mỗi phần tử còn lại có 2 lựa chọn: thuộc hoặc không thuộc tập con.`,`Số tập con = 2^${n-2} = ${2**(n-2)} (bao gồm cả tập rỗng).`],`${ans} tập con.`,`Tập rỗng cũng là một tập con thỏa mãn điều kiện.`);
  w=[[2**(n-2)-1,'loại nhầm tập rỗng'],[2**(n-1),'chỉ loại một phần tử'],[2**n-4,'trừ nhầm 4 tập con']]}
 return[mc(q,ans,w,e),[n,t]]})
);
})();
