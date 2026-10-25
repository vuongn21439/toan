/* LỚP 6: Câu hỏi bổ sung cho các chủ đề cơ bản */
A('nat',
()=>{const b=R(3,9),k=R(5,20),r=R(1,b-1);return N(`Phép chia ${b*k+r} : ${b} có số dư là:`,r,`${b*k+r} = ${b} × ${k} + ${r}; số dư luôn nhỏ hơn số chia.`)},
()=>{const a=R(2,9),b=R(3,12);return N(`Tìm x biết: ${a} × x = ${a*b}`,b,`x = ${a*b} : ${a}.`)},
()=>{const a=R(12,99),b=R(21,79);return N(`Tính nhanh: ${a} × ${b} + ${a} × ${100-b}`,a*100,`Đặt ${a} ra ngoài: ${a} × (${b} + ${100-b}) = ${a} × 100.`)},
()=>{const a=R(5,40),b=a+R(5,30);return N(`Tập hợp các số tự nhiên từ ${a} đến ${b} có bao nhiêu phần tử?`,b-a+1,`Số phần tử = ${b} − ${a} + 1 (nhớ đếm cả hai đầu).`)});
A('pow',
()=>{const a=R(2,9),n=R(3,6);return Z(`Viết gọn ${Array(n).fill(a).join(' × ')} dưới dạng lũy thừa:`,`${a}^${n}`,[`${a}^${n-1}`,`${a}^${n+1}`,`${n}^${a}`,`${a*n}`],`Có ${n} thừa số ${a} nên viết ${a}^${n}.`)},
()=>{const n=R(2,5);return Z(`10^${n} bằng:`,''+10**n,[10**(n-1),10**(n+1),10*n].map(String),`10^${n} là số 1 theo sau ${n} chữ số 0.`)},
()=>{const a=R(2,20),b=R(2,9);return N(`Tính: ${a} + ${b}^2`,a+b*b,`Lũy thừa trước: ${b}^2 = ${b*b}, rồi mới cộng ${a}.`)});
A('div',
()=>{let p,s;do{p=R(10,99);s=p%10+(p-p%10)/10}while(s%9==0);return N(`Thay dấu * bằng chữ số thích hợp để số ${p}* chia hết cho 9:`,9-s%9,`Tổng các chữ số phải chia hết cho 9: ${s} + * = ${s+9-s%9}.`)},
()=>{const n=R(20,60);let m=n+1;while(!isP(m))m++;return N(`Số nguyên tố nhỏ nhất lớn hơn ${n} là:`,m,`Thử lần lượt ${n+1}, ${n+2}, … đến khi gặp số chỉ có hai ước.`)});
T.push({id:'ub',n:'Ước & bội',e:'🔑',c:'#2ecc71',tip:'Ước của n là số chia hết n. Bội của n là n nhân với 0; 1; 2; … Phân tích ra thừa số nguyên tố: chia dần cho 2; 3; 5; …',g:[
()=>{const n=P([12,18,20,24,30,36,42,48]),d=[...Array(n+6).keys()].filter(i=>i>1);return Q(`Số nào là ước của ${n}?`,''+P(d.filter(i=>n%i==0&&i<n)),sh(d.filter(i=>n%i)).slice(0,3).map(String),`Ước của ${n} là các số chia hết ${n}.`)},
()=>{const d=R(3,9),s=new Set();while(s.size<3)s.add(d*R(4,15)+R(1,d-1));return Q(`Số nào là bội của ${d}?`,''+d*R(4,15),[...s].map(String),`Bội của ${d} là các số chia hết cho ${d}.`)},
()=>{const n=P([6,8,10,12,15,18,20,28]);return N(`Số ${n} có bao nhiêu ước?`,[...Array(n).keys()].filter(i=>i&&n%i==0).length+1,`Liệt kê ước theo cặp: 1 và ${n}, 2 và ${n/2}, …`)},
()=>{const L=[[12,'2^2 · 3'],[18,'2 · 3^2'],[20,'2^2 · 5'],[24,'2^3 · 3'],[30,'2 · 3 · 5'],[36,'2^2 · 3^2'],[45,'3^2 · 5'],[60,'2^2 · 3 · 5'],[72,'2^3 · 3^2'],[90,'2 · 3^2 · 5']],[n,c]=P(L);return Q(`Phân tích ${n} ra thừa số nguyên tố:`,c,sh(L.filter(x=>x[1]!=c)).slice(0,3).map(x=>x[1]),`Chia ${n} dần cho các số nguyên tố 2; 3; 5; … đến khi được 1.`)},
()=>{const [a,b]=cop(4,20);return Z('Cặp số nào nguyên tố cùng nhau?',`${a}; ${b}`,[...Array(5)].map(()=>{const g=R(2,5),[x,y]=cop(2,6);return `${g*x}; ${g*y}`}),'Hai số nguyên tố cùng nhau khi ƯCLN của chúng bằng 1.')}]});
A('int',
()=>{const a=nz(),b=nz();return N(`Tính: ${pa(a)} × ${pa(b)}`,a*b,'Cùng dấu thì tích dương, khác dấu thì tích âm.',iz,1)},
()=>{const b=nz(),c=nz();return N(`${iz(b*c)} : ${pa(b)} = ?`,c,'Chia hai số nguyên: cùng dấu được thương dương, khác dấu được thương âm.',iz,1)},
()=>{const a=R(-10,10),b=R(-15,15);return N(`Tìm số nguyên x biết: x + ${pa(a)} = ${iz(b)}`,b-a,`x = ${iz(b)} − ${pa(a)} = ${iz(b-a)}.`,iz,1)},
()=>{const a=R(10,30),b=R(5,20),c=R(1,b);return N(`Tính: ${a} − (${b} − ${c})`,a-b+c,'Bỏ ngoặc có dấu − đứng trước thì đổi dấu mọi số hạng trong ngoặc.',iz,1)},
()=>{const a=nz()*R(1,2);return N(`Số đối của ${iz(a)} là:`,-a,'Hai số đối nhau có tổng bằng 0.',iz,1)},
()=>{const a=R(1,5),b=R(1,6);return N(`Có bao nhiêu số nguyên x thỏa mãn ${iz(-a)} &lt; x &lt; ${b}?`,a+b-1,`Liệt kê x từ ${iz(-a+1)} đến ${b-1}, nhớ đếm cả số 0.`)});
A('frac',
()=>{const s=new Set(),a=[];while(a.length<4){const d=R(3,9),n=R(1,d-1),v=(n/d).toFixed(5);if(!s.has(v)){s.add(v);a.push([n,d])}}const m=a.reduce((x,y)=>x[0]*y[1]>y[0]*x[1]?x:y);return Q('Phân số nào lớn nhất?',`${m[0]}/${m[1]}`,a.filter(x=>x!==m).map(x=>`${x[0]}/${x[1]}`),'Quy đồng mẫu số (hoặc so sánh với 1/2) rồi so sánh các tử.')},
()=>{const d=R(9,13),a=R(1,4),b=R(1,4);return Z(`Tính: ${a+b}/${d} − ${b}/${d}`,`${a}/${d}`,[`${a+b+b}/${d}`,`${a}/${2*d}`,`${a+1}/${d}`,`${a}/${d+1}`],'Cùng mẫu: trừ các tử, giữ nguyên mẫu.')},
()=>{const a=R(1,5),b=R(2,7),c=R(1,5),d=R(2,7);return Z(`Tính (rút gọn): ${a}/${b} × ${c}/${d}`,fs(a*c,b*d),[fs(a*c,b+d),fs(a+c,b*d),fs(a*d,b*c),fs(a*c,b*d+1),fs(a*c+1,b*d)],'Nhân hai phân số: tử nhân tử, mẫu nhân mẫu, rồi rút gọn.')},
()=>{const a=R(1,5),b=R(2,7),c=R(1,5),d=R(2,7);return Z(`Tính (rút gọn): ${a}/${b} : ${c}/${d}`,fs(a*d,b*c),[fs(a*c,b*d),fs(b*c,a*d),fs(a+d,b+c),fs(a*d+1,b*c),fs(a*d,b*c+1)],'Chia cho một phân số: nhân với phân số nghịch đảo.')},
()=>{const w=R(1,5),[x,y]=cop(1,7),a=Math.min(x,y),b=Math.max(x,y);return Z(`Viết hỗn số ${w} ${a}/${b} dưới dạng phân số:`,`${w*b+a}/${b}`,[`${w+a}/${b}`,`${w*b+a}/${a}`,`${w*a+b}/${b}`,`${w*b+a+1}/${b}`],`Nhân phần nguyên với mẫu rồi cộng tử: ${w} × ${b} + ${a} = ${w*b+a}, giữ nguyên mẫu ${b}.`)},
()=>{const [x,y]=cop(1,9),a=Math.min(x,y),b=Math.max(x,y);return Z(`Số nghịch đảo của ${a}/${b} là:`,a==1?''+b:`${b}/${a}`,[`${a}/${b}`,`−${a}/${b}`,`${b}/${a+1}`,`${a+1}/${b}`],'Hai số nghịch đảo có tích bằng 1: đảo ngược tử và mẫu.')},
()=>{const d=R(5,12),a=R(1,4),c=a+R(1,4);return Z(`Tìm x biết: x + ${a}/${d} = ${c}/${d}`,`${c-a}/${d}`,[`${c+a}/${d}`,`${c-a}/${d+1}`,`${c-a}/${2*d}`,`${c-a+1}/${d}`],'x = số tổng − số hạng đã biết: trừ hai tử, giữ nguyên mẫu.')});
A('dec',
()=>{const a=R(30,99),b=R(11,a-1);return N(`Tính: ${dc(a)} − ${dc(b)}`,a-b,'Viết dấu phẩy thẳng cột rồi trừ như số tự nhiên.',dc)},
()=>{const a=R(11,99),b=R(2,9);return N(`Tính: ${dc(a)} × ${b}`,a*b,'Nhân như số tự nhiên, phần thập phân giữ 1 chữ số.',dc)},
()=>{const a=R(11,99),b=R(2,9);return N(`Tính: ${dc(a*b)} : ${b}`,a,'Chia như số tự nhiên, khi hạ chữ số phần thập phân thì viết dấu phẩy ở thương.',dc)},
()=>{const s=new Set();while(s.size<4)s.add(R(200,500));const a=[...s],m=Math.max(...a);return Q('Số nào lớn nhất?',dd(m),a.filter(v=>v!=m).map(dd),'So sánh phần nguyên trước, nếu bằng nhau thì so sánh từng hàng phần thập phân từ trái sang phải.')},
()=>{const b=P([2,4,5,10]),a=R(1,b-1),v=a/b,f=x=>String(+x.toFixed(3)).replace('.',',');return Z(`Viết phân số ${a}/${b} thành số thập phân:`,f(v),[v*10,v/10,v+0.1,v+0.5,v*2].map(f),`Chia tử cho mẫu: ${a} : ${b} = ${f(v)}.`)});
A('pct',
()=>{const r=P([10,20,25,50]),n=20*R(2,10);return N(`Biết ${r}% của một số là ${r*n/100}. Số đó là:`,n,`Số đó = ${r*n/100} : ${r} × 100.`)},
()=>{const r=P([10,20,25,50]),p=20*R(3,15);return N(`Một chiếc áo giá ${p} nghìn đồng, được giảm ${r}%. Giá sau khi giảm là (nghìn đồng):`,p*(100-r)/100,`Giá sau giảm = ${p} × (100 − ${r}) : 100.`)},
()=>{const r=P([20,25,40,50,60,75]);return Z(`${r}% bằng phân số tối giản nào?`,fs(r,100),[fs(r,1000),fs(r+5,100),fs(100,r),fs(r,200),fs(r,10)],`${r}% = ${r}/100, rồi rút gọn.`)});
A('geo',
()=>{const a=R(5,15),b=R(2,a-1);return N(`Hình chữ nhật có diện tích ${a*b} cm², chiều dài ${a} cm. Chiều rộng là (cm):`,b,`Chiều rộng = diện tích : chiều dài = ${a*b} : ${a}.`)},
()=>{const a=R(3,15);return N(`Hình vuông có chu vi ${4*a} cm. Cạnh hình vuông là (cm):`,a,'Chu vi hình vuông = cạnh × 4.')},
()=>{const a=R(5,20),b=R(3,15);return N(`Hình bình hành có hai cạnh kề ${a} cm và ${b} cm. Chu vi là (cm):`,2*(a+b),'Chu vi = (hai cạnh kề cộng lại) × 2.')},
()=>{const a=R(10,30),b=R(5,20),k=R(2,5);return N(`Thửa ruộng hình chữ nhật dài ${a} m, rộng ${b} m. Mỗi m² thu hoạch ${k} kg rau. Cả thửa ruộng thu được (kg):`,a*b*k,`Diện tích = ${a} × ${b}, rồi nhân với ${k}.`)});
A('line',
()=>{const a=R(3,12),b=R(3,12);return N(`B nằm giữa A và C, AB = ${a} cm, BC = ${b} cm. Độ dài AC là (cm):`,a+b,'B nằm giữa A và C thì AB + BC = AC.')},
()=>{const a=R(2,8),b=a+R(2,8);return N(`Trên tia Ox lấy OA = ${a} cm, OB = ${b} cm. Độ dài AB là (cm):`,b-a,`A nằm giữa O và B nên AB = OB − OA = ${b} − ${a}.`)},
()=>{const a=5*R(3,16),b=5*R(3,16);return N(`Tia Oz nằm giữa hai tia Ox và Oy, góc xOz = ${a}°, góc zOy = ${b}°. Số đo góc xOy là (độ):`,a+b,'Tia Oz nằm giữa Ox và Oy thì xOz + zOy = xOy.')},
()=>{const a=R(10,80);return N(`Góc xOy = 90°, tia Oz nằm giữa hai tia Ox, Oy và góc xOz = ${a}°. Số đo góc zOy là (độ):`,90-a,`zOy = xOy − xOz = 90° − ${a}°.`)},
()=>{const n=R(3,8);return N(`Qua ${n} điểm phân biệt, không có ba điểm nào thẳng hàng, vẽ các đường thẳng đi qua từng cặp điểm. Có tất cả bao nhiêu đường thẳng?`,n*(n-1)/2,`${n} × ${n-1} : 2, vì mỗi đường thẳng bị đếm hai lần.`)});
T.push({id:'sym',n:'Hình học trực quan',e:'🔷',c:'#5f27cd',tip:'Trục đối xứng: gấp đôi hình theo đường đó thì hai nửa trùng khít. Tam giác đều: 3 cạnh bằng nhau. Lục giác đều: 6 cạnh, 6 góc bằng nhau, 3 đường chéo chính.',g:[
()=>{const L=[['tam giác đều',3],['hình vuông',4],['hình chữ nhật (không vuông)',2],['hình thoi (không vuông)',2],['lục giác đều',6],['hình thang cân',1],['hình bình hành (không phải chữ nhật, thoi)',0]],[n,c]=P(L);return N(`${n[0].toUpperCase()+n.slice(1)} có bao nhiêu trục đối xứng?`,c,'Gấp hình theo trục thì hai nửa phải trùng khít nhau.')},
()=>{const a=sh(['hình chữ nhật','hình thoi','hình bình hành','hình vuông','lục giác đều','hình tròn']),b=sh(['tam giác đều','hình thang cân','tam giác cân']);return Q('Hình nào có tâm đối xứng?',a[0],b,'Có tâm đối xứng khi quay nửa vòng (180°) quanh tâm thì hình trùng với chính nó.')},
()=>Q('Hình nào KHÔNG có trục đối xứng?','hình bình hành',sh(['tam giác đều','hình vuông','hình chữ nhật','hình thoi','lục giác đều','hình thang cân']).slice(0,3),'Hình bình hành (không phải chữ nhật, thoi) không có trục đối xứng.'),
()=>{const a=R(2,15);return N(`Tam giác đều có cạnh ${a} cm. Chu vi là (cm):`,3*a,'Tam giác đều có 3 cạnh bằng nhau.')},
()=>{const a=R(2,12);return N(`Lục giác đều cạnh ${a} cm. Chu vi là (cm):`,6*a,'Lục giác đều có 6 cạnh bằng nhau.')},
()=>{const a=R(3,15);return N(`Tam giác đều có chu vi ${3*a} cm. Mỗi cạnh dài (cm):`,a,'Cạnh = chu vi : 3.')},
()=>Q('Lục giác đều có mấy đường chéo chính?','3',['2','4','6'],'Đường chéo chính nối hai đỉnh đối diện: 6 đỉnh nên có 6 : 2 = 3 đường.')]});
A('stat',
()=>{const n=P([20,30,40,60]),s=R(2,n/2-1);return Z(`Tung xúc xắc ${n} lần, mặt 6 chấm xuất hiện ${s} lần. Xác suất thực nghiệm xuất hiện mặt 6 chấm là:`,`${s}/${n}`,[`${n-s}/${n}`,`${s}/${n-s}`,`${n}/${s}`,`${s}/6`],'Xác suất thực nghiệm = số lần xảy ra : tổng số lần thực hiện.')},
()=>{const v=sh([8,9,10,11,12,13,14,15]).slice(0,4),nm=['Toán','Văn','Anh','Sử'],m=Math.max(...v);return Q(`Số bạn thích mỗi môn: ${nm.map((x,i)=>x+' '+v[i]).join('; ')}. Môn nào được yêu thích nhất?`,nm[v.indexOf(m)],nm.filter((x,i)=>v[i]!=m),'Môn có số bạn nhiều nhất (cột cao nhất) là môn được yêu thích nhất.')},
()=>{const v=sh([8,9,10,11,12,13,14,15]).slice(0,3);return N(`Số bạn thích Toán, Văn, Anh lần lượt là ${v.join('; ')}. Tổng số bạn được khảo sát là:`,v[0]+v[1]+v[2],'Cộng số bạn của các môn lại với nhau.')});
A('word',
()=>{const a=R(3,9),b=R(4,12),e=R(5,50);return N(`Mua ${a} quyển vở, mỗi quyển ${b} nghìn đồng, đưa người bán ${a*b+e} nghìn đồng. Số tiền được trả lại là (nghìn đồng):`,e,`Tiền thừa = ${a*b+e} − ${a} × ${b}.`)},
()=>{const k=R(2,4),y=R(5,20);return N(`Hai số có tổng bằng ${(k+1)*y} và số này gấp ${k} lần số kia. Số lớn là:`,k*y,`Tổng gồm ${k+1} phần bằng nhau, mỗi phần ${y}; số lớn gồm ${k} phần.`)},
()=>{const b=R(3,6),a=R(1,b-1),k=R(5,20);return N(`An đọc ${a}/${b} cuốn sách thì còn ${(b-a)*k} trang chưa đọc. Cuốn sách có tất cả bao nhiêu trang?`,b*k,`${(b-a)*k} trang ứng với ${b-a}/${b} cuốn sách, nên 1/${b} cuốn là ${k} trang.`)});
