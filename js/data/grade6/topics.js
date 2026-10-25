/* LỚP 6: danh sách chủ đề (id, tên, màu, mẹo học, bộ câu hỏi cơ bản g) */
const T=[
{id:'nat',n:'Số tự nhiên',e:'🔢',c:'#ff7675',tip:'Nhân chia trước, cộng trừ sau. Có ngoặc thì tính trong ngoặc trước. Tập ℕ bắt đầu từ 0.',g:[
()=>{const a=R(10,50),b=R(2,9),c=R(2,9);return N(`Tính: ${a} + ${b} × ${c}`,a+b*c,`Nhân trước: ${b} × ${c} = ${b*c}, rồi cộng ${a}.`)},
()=>{const a=R(20,60),b=R(2,19),c=R(2,9);return N(`Tính: (${a} − ${b}) × ${c}`,(a-b)*c,`Làm trong ngoặc trước: ${a} − ${b} = ${a-b}.`)},
()=>{const n=R(4,9);return N(`Tập hợp A = {x ∈ ℕ | x &lt; ${n}} có bao nhiêu phần tử?`,n,`ℕ bắt đầu từ 0 nên A = {0; 1; …; ${n-1}} có ${n} phần tử.`)},
()=>{const a=R(10,90),b=a+R(10,90);return N(`Tìm x biết: x + ${a} = ${b}`,b-a,`x = ${b} − ${a} = ${b-a}.`)},
()=>{const n=R(4,29);return Q(`Số ${n} viết bằng số La Mã là:`,rom(n),[n+1,n-1,n+2].map(rom),'Nhớ: I = 1, V = 5, X = 10. Số nhỏ đứng bên trái thì trừ, bên phải thì cộng.')}]},
{id:'pow',n:'Lũy thừa',e:'🚀',c:'#fdcb6e',tip:'a^n là tích của n thừa số a. Nhân cùng cơ số: giữ cơ số, cộng số mũ. Chia cùng cơ số: trừ số mũ.',g:[
()=>{const a=R(2,5),n=R(2,4);return N(`Tính: ${a}^${n}`,a**n,`${a}^${n} là tích của ${n} thừa số ${a}.`)},
()=>{const a=R(2,9),m=R(2,6),n=R(2,6);return N(`${a}^${m} · ${a}^${n} = ${a}<sup>?</sup>`,m+n,'Nhân cùng cơ số: giữ cơ số, cộng hai số mũ.')},
()=>{const a=R(2,9),n=R(2,5),m=n+R(1,5);return N(`${a}^${m} : ${a}^${n} = ${a}<sup>?</sup>`,m-n,'Chia cùng cơ số: giữ cơ số, trừ hai số mũ.')}]},
{id:'div',n:'Chia hết & nguyên tố',e:'🧩',c:'#00b894',tip:'Chia hết cho 2: tận cùng chẵn. Cho 5: tận cùng 0 hoặc 5. Cho 3 (hoặc 9): tổng các chữ số chia hết cho 3 (hoặc 9).',g:[
()=>{const w=new Set();while(w.size<3)w.add(3*R(34,330)+P([1,2]));return Q('Số nào sau đây chia hết cho 3?',''+3*R(34,330),[...w].map(String),'Một số chia hết cho 3 khi tổng các chữ số của nó chia hết cho 3.')},
()=>{const w=new Set();while(w.size<3)w.add(10*R(5,99)+R(1,9));return Q('Số nào chia hết cho cả 2 và 5?',''+10*R(5,99),[...w].map(String),'Chia hết cho cả 2 và 5 thì chữ số tận cùng phải là 0.')},
()=>{const a=sh([11,13,17,19,23,29,31,37,41,43,47]),b=sh([21,27,33,39,49,51,57,63,77,91]);return Q('Số nào là số nguyên tố?',''+a[0],b.slice(0,3).map(String),'Số nguyên tố lớn hơn 1 và chỉ có đúng hai ước là 1 và chính nó.')}]},
{id:'gcd',n:'ƯCLN – BCNN',e:'🔗',c:'#0984e3',tip:'ƯCLN: lấy thừa số nguyên tố chung với số mũ nhỏ nhất. BCNN: lấy tất cả thừa số với số mũ lớn nhất.',g:[
()=>{const g=R(2,6),[x,y]=cop(2,7);return N(`ƯCLN(${g*x}; ${g*y}) = ?`,g,'Phân tích ra thừa số nguyên tố, lấy thừa số chung với số mũ nhỏ nhất.')},
()=>{const g=R(2,6),[x,y]=cop(2,7);return N(`BCNN(${g*x}; ${g*y}) = ?`,g*x*y,'Lấy mọi thừa số nguyên tố chung và riêng, mỗi thừa số lấy số mũ lớn nhất.')},
()=>{const g=R(2,6),[x,y]=cop(2,7);return N(`Có ${g*x} bút đỏ và ${g*y} bút xanh, chia vào các hộp sao cho mỗi hộp đều có cả hai loại với số bút mỗi loại bằng nhau. Nhiều nhất chia được mấy hộp?`,g,`Số hộp là ƯCLN(${g*x}; ${g*y}) = ${g}.`)},
()=>{const [x,y]=cop(3,9);return N(`An cứ ${x} ngày trực nhật một lần, Bình cứ ${y} ngày một lần. Hôm nay cả hai cùng trực. Sau ít nhất bao nhiêu ngày thì lại cùng trực?`,x*y,`Cần tìm BCNN(${x}; ${y}) = ${x*y}.`)}]},
{id:'int',n:'Số nguyên',e:'🌡️',c:'#6c5ce7',tip:'Cùng dấu: cộng rồi giữ dấu. Khác dấu: lấy số lớn trừ số nhỏ (bỏ dấu), dấu theo số có giá trị tuyệt đối lớn hơn.',g:[
()=>{const a=R(-20,20),b=R(-20,20);return N(`Tính: ${pa(a)} + ${pa(b)}`,a+b,'Chú ý dấu: khác dấu thì lấy số lớn trừ số nhỏ, dấu theo số lớn hơn.',iz,1)},
()=>{const a=R(-20,20),b=R(-20,20);return N(`Tính: ${pa(a)} − ${pa(b)}`,a-b,'Trừ một số bằng cộng với số đối của nó: a − b = a + (−b).',iz,1)},
()=>{const s=new Set();while(s.size<4)s.add(R(-15,15));const a=[...s],m=Math.max(...a);return Q('Số nào lớn nhất?',iz(m),a.filter(v=>v!=m).map(iz),'Mọi số âm đều nhỏ hơn 0; số âm càng gần 0 thì càng lớn.')},
()=>{const a=R(2,30);return N(`|${iz(-a)}| = ?`,a,'Giá trị tuyệt đối là khoảng cách đến 0 nên luôn không âm.')},
()=>{const a=R(2,9),b=R(1,15);return N(`Sáng nay nhiệt độ là ${iz(-a)}°C, đến trưa tăng thêm ${b}°C. Nhiệt độ buổi trưa là (°C):`,b-a,`${iz(-a)} + ${b} = ${iz(b-a)}.`,iz,1)}]},
{id:'frac',n:'Phân số',e:'🍕',c:'#e17055',tip:'Rút gọn: chia cả tử và mẫu cho ƯCLN. Cộng cùng mẫu: cộng tử, giữ nguyên mẫu. a/b của n = n : b × a.',g:[
()=>{let [x,y]=cop(1,9);if(x>y)[x,y]=[y,x];const g=R(2,6),c=`${x}/${y}`;return Q(`Rút gọn phân số ${g*x}/${g*y} được:`,c,[`${x}/${y+1}`,`${x+1}/${y}`,`${y}/${x}`,`${x}/${y+2}`].filter(s=>s!=c).slice(0,3),`Chia cả tử và mẫu cho ƯCLN = ${g}.`)},
()=>{const d=R(5,12),a=R(1,4),b=R(1,4);return Q(`Tính: ${a}/${d} + ${b}/${d}`,`${a+b}/${d}`,[`${a+b}/${2*d}`,`${a+b+1}/${d}`,`${Math.abs(a-b)+1}/${d}`],'Cùng mẫu: cộng các tử, giữ nguyên mẫu.')},
()=>{const b=R(2,6),a=R(1,b-1),k=R(2,9);return N(`${a}/${b} của ${b*k} là:`,a*k,`Chia ${b*k} cho ${b} được ${k}, rồi nhân với ${a}.`)}]},
{id:'dec',n:'Số thập phân',e:'🔟',c:'#fd79a8',tip:'Cộng trừ số thập phân: viết dấu phẩy thẳng cột. Làm tròn: nhìn chữ số ngay sau hàng cần làm tròn (từ 5 trở lên thì tăng 1).',g:[
()=>{const a=R(11,99),b=R(11,99);return N(`Tính: ${dc(a)} + ${dc(b)}`,a+b,'Viết dấu phẩy thẳng cột rồi cộng như số tự nhiên.',dc)},
()=>{const n=R(101,999);return N(`Làm tròn ${dd(n)} đến hàng phần mười:`,Math.round(n/10),'Nhìn chữ số hàng phần trăm: từ 5 trở lên thì làm tròn lên, nhỏ hơn 5 thì giữ nguyên.',dc)},
()=>{const n=R(101,999);return N(`${dd(n)} × 100 = ?`,n,'Nhân với 100: dời dấu phẩy sang phải 2 chữ số.')}]},
{id:'pct',n:'Phần trăm',e:'💯',c:'#00cec9',tip:'a% của n = n × a : 100. Tỉ số phần trăm của a và b = a : b × 100%.',g:[
()=>{const r=P([5,10,20,25,50]),n=20*R(2,10);return N(`${r}% của ${n} là bao nhiêu?`,r*n/100,`${r}% của ${n} = ${n} × ${r} : 100.`)},
()=>{const n=P([20,25,50]),a=2*R(1,Math.floor(n/2)-1);return N(`Lớp 6A có ${n} học sinh, trong đó ${a} bạn đạt loại giỏi. Tỉ số phần trăm học sinh giỏi là:`,a*100/n,`Tỉ số phần trăm = ${a} : ${n} × 100%.`,v=>v+'%')}]},
{id:'geo',n:'Hình phẳng',e:'📐',c:'#55a3ff',tip:'Chữ nhật: chu vi (a + b) × 2, diện tích a × b. Vuông: S = a². Thoi: S = d₁ × d₂ : 2. Bình hành: S = đáy × chiều cao.',g:[
()=>{const a=R(5,20),b=R(2,a-1);return N(`Hình chữ nhật dài ${a} cm, rộng ${b} cm. Chu vi là (cm):`,(a+b)*2,`Chu vi = (dài + rộng) × 2 = (${a} + ${b}) × 2.`)},
()=>{const a=R(3,15);return N(`Hình vuông cạnh ${a} cm. Diện tích là (cm²):`,a*a,'Diện tích hình vuông = cạnh × cạnh.')},
()=>{const a=R(4,20),d=2*R(2,10);return N(`Hình thoi có hai đường chéo ${a} cm và ${d} cm. Diện tích là (cm²):`,a*d/2,'Diện tích hình thoi = (đường chéo 1 × đường chéo 2) : 2.')},
()=>{const a=R(5,20),h=R(3,12);return N(`Hình bình hành có đáy ${a} cm, chiều cao ${h} cm. Diện tích là (cm²):`,a*h,'Diện tích hình bình hành = đáy × chiều cao.')}]},
{id:'line',n:'Điểm, đoạn, góc',e:'📏',c:'#a29bfe',tip:'Trung điểm chia đoạn thẳng thành hai phần bằng nhau. Hai góc kề bù có tổng 180°. Nhọn nhỏ hơn 90°, vuông 90°, tù từ 90° đến 180°, bẹt 180°.',g:[
()=>{const k=R(3,15);return N(`M là trung điểm của đoạn thẳng AB, AB = ${2*k} cm. Độ dài AM là (cm):`,k,'AM = AB : 2 vì M chia đoạn AB thành hai đoạn bằng nhau.')},
()=>{const x=5*R(4,32);return N(`Hai góc kề bù, một góc bằng ${x}°. Góc còn lại bằng (độ):`,180-x,'Hai góc kề bù có tổng bằng 180°.')},
()=>{const a=P([25,40,60,75,90,100,120,150,180]),t=a<90?'góc nhọn':a==90?'góc vuông':a<180?'góc tù':'góc bẹt';return Q(`Góc ${a}° là:`,t,['góc nhọn','góc vuông','góc tù','góc bẹt'].filter(s=>s!=t),'Nhọn nhỏ hơn 90°; vuông bằng 90°; tù từ 90° đến 180°; bẹt bằng 180°.')},
()=>{const n=R(3,7);return N(`Cho ${n} điểm, không có ba điểm nào thẳng hàng. Nối từng cặp điểm thành đoạn thẳng. Có tất cả bao nhiêu đoạn thẳng?`,n*(n-1)/2,`Mỗi điểm nối với ${n-1} điểm còn lại, mỗi đoạn bị đếm 2 lần: ${n} × ${n-1} : 2.`)}]},
{id:'stat',n:'Thống kê & xác suất',e:'📊',c:'#fab1a0',tip:'Xác suất thực nghiệm = số lần sự kiện xảy ra : tổng số lần thực hiện. Giá trị xuất hiện nhiều nhất là giá trị phổ biến nhất.',g:[
()=>{const n=P([10,20,25,50]);let s;do s=R(2,n-2);while(s*2==n);return Q(`Tung một đồng xu ${n} lần, có ${s} lần xuất hiện mặt sấp. Xác suất thực nghiệm xuất hiện mặt sấp là:`,`${s}/${n}`,[`${n-s}/${n}`,`${s}/${n-s}`,`${n}/${s}`],'Xác suất thực nghiệm = số lần xảy ra : tổng số lần thử.')},
()=>{const v=sh([5,6,7,8,9,10]).slice(0,4),a=sh([v[0],v[0],v[0],v[1],v[1],v[2],v[3]]);return Q(`Điểm kiểm tra của một nhóm bạn: ${a.join('; ')}. Điểm nào xuất hiện nhiều lần nhất?`,''+v[0],v.slice(1).map(String),'Đếm số lần xuất hiện của từng điểm rồi so sánh.')}]},
{id:'word',n:'Toán đố',e:'💡',c:'#ffb142',tip:'Đọc kỹ đề, gạch chân số liệu, xác định đề hỏi gì. Hiệu số tuổi của hai người không bao giờ thay đổi.',g:[
()=>{const y=R(10,40),x=y+2*R(2,15);return N(`Hai số có tổng bằng ${x+y} và hiệu bằng ${x-y}. Số lớn là:`,x,`Số lớn = (tổng + hiệu) : 2 = (${x+y} + ${x-y}) : 2.`)},
()=>{const v=R(3,12)*5,t=R(2,6);return N(`Một xe đi với vận tốc ${v} km/h trong ${t} giờ. Quãng đường đi được là (km):`,v*t,'Quãng đường = vận tốc × thời gian.')},
()=>{const a=R(6,12),k=R(3,4),n=R(3,10);return N(`Năm nay con ${a} tuổi, mẹ gấp ${k} lần tuổi con. Sau ${n} năm nữa, mẹ hơn con bao nhiêu tuổi?`,(k-1)*a,`Hiệu số tuổi không đổi theo thời gian: ${k*a} − ${a}.`)}]}
];
