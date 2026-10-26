/* LỚP 6: Tập hợp, biểu đồ, hình vẽ, số nguyên, phân số, thập phân */
/* ===== BỔ SUNG: tập hợp, biểu đồ, hình vẽ, số nguyên, phân số, thập phân, tia/đường thẳng ===== */
const bc=(v,l)=>{const m=Math.max(...v);return `<svg viewBox="0 0 240 150" class="fg">${v.map((x,i)=>{const h=100*x/m;return `<rect x="${14+i*44}" y="${115-h}" width="32" height="${h}"/><text x="${30+i*44}" y="${110-h}" text-anchor="middle">${x}</text><text x="${30+i*44}" y="135" text-anchor="middle">${l[i]}</text>`}).join('')}<path d="M8 115H236"/></svg>`},
SH=[['tam giác đều','60,10 20,80 100,80',3],['hình vuông','30,10 90,10 90,70 30,70',4],['hình chữ nhật','15,20 105,20 105,70 15,70',2],['hình thoi','60,8 100,45 60,82 20,45',2],['hình bình hành','35,20 110,20 85,70 10,70',0],['hình thang cân','40,20 80,20 105,70 15,70',1],['lục giác đều','35,12 85,12 108,45 85,78 35,78 12,45',6]],
sp=i=>`<svg viewBox="0 0 120 90" class="fg" style="max-width:200px"><polygon points="${SH[i][1]}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
cv=()=>{const l=['6A','6B','6C','6D'],v=sh([22,25,28,30,32,35,38]).slice(0,4);return[l,v]};
T.push({id:'set',n:'Tập hợp',e:'🧺',c:'#e67e22',tip:'∈ là thuộc, ∉ là không thuộc, A ⊂ B nếu mọi phần tử của A đều thuộc B. Số phần tử của {a; a+1; …; b} là b − a + 1.',g:[
()=>{const s=sh([2,3,5,7,9,11,13,14]).slice(0,4),x=P(s),y=P([1,4,6,8,10,12].filter(v=>!s.includes(v)));return Q(`Cho A = {${s.join('; ')}}. Khẳng định nào đúng?`,`${x} ∈ A`,[`${y} ∈ A`,`${x} ∉ A`,`A có ${s.length+1} phần tử`],`Bước 1: Xem ${x} có nằm trong danh sách phần tử của A không.\nBước 2: ${x} có trong danh sách nên ${x} ∈ A; ${y} không có nên ${y} ∉ A.`)},
()=>{const a=R(1,8),b=a+R(3,9);return N(`Tập hợp B = {x ∈ ℕ | ${a} ≤ x ≤ ${b}} có bao nhiêu phần tử?`,b-a+1,`Bước 1: Tập hợp gồm các số tự nhiên từ ${a} đến ${b}.\nBước 2: Số phần tử = số cuối − số đầu + 1 = ${b} − ${a} + 1.`)},
()=>{const n=R(3,8);return Q(`Tập hợp các số tự nhiên nhỏ hơn ${n} viết là:`,`{0; 1; …; ${n-1}}`,[`{1; 2; …; ${n-1}}`,`{0; 1; …; ${n}}`,`{1; 2; …; ${n}}`],`Bước 1: Tập hợp số tự nhiên bắt đầu từ 0.\nBước 2: x < ${n} nên các phần tử là 0, 1, …, ${n-1}.`)},
()=>Q('Kí hiệu ∈ đọc là:','thuộc',['không thuộc','là tập con của','bằng'],'∈: thuộc; ∉: không thuộc; ⊂: là tập con.')],h:[
()=>{const n=R(3,6);return I(`Tập hợp A có ${n} phần tử. Số tập hợp con của A (kể cả ∅ và A) là:`,2**n,`Bước 1: Mỗi phần tử có 2 lựa chọn: thuộc hoặc không thuộc tập con.\nBước 2: Có ${n} phần tử → số tập con = 2^${n}.`)},
()=>{const a=R(10,30),c=R(5,15);return I(`Tập hợp các số tự nhiên chẵn từ ${2*a} đến ${2*(a+c)} có bao nhiêu phần tử?`,c+1,`Bước 1: Các số chẵn từ ${2*a} đến ${2*(a+c)} tạo thành dãy cách đều 2.\nBước 2: Số phần tử = (số cuối − số đầu) : 2 + 1.`)},
()=>{const a=R(10,40),b=a+R(10,40);let c=0;for(let i=a;i<=b;i++)if(i%2)c++;return I(`Cho A = {x ∈ ℕ | ${a} ≤ x ≤ ${b}}. Số phần tử lẻ của A là:`,c,'Liệt kê hoặc dùng công thức dãy cách đều 2, nhớ xét số đầu và số cuối có lẻ không.')}]});
A('sym',
()=>{const i=R(0,6);return F(Q('Hình bên là hình gì?',SH[i][0],sh(SH.filter((_,j)=>j!=i)).slice(0,3).map(x=>x[0]),'Đếm số cạnh, rồi xét cạnh và góc của hình.'),sp(i))},
()=>{const i=R(0,6);return F(N(`Hình ${SH[i][0]} bên có bao nhiêu trục đối xứng?`,SH[i][2],'Gấp hình theo trục thì hai nửa phải trùng khít.'),sp(i))});
A('stat',
()=>{const [l,v]=cv(),m=Math.max(...v);return F(Q('Biểu đồ cột cho số học sinh giỏi của mỗi lớp. Lớp nào nhiều nhất?',l[v.indexOf(m)],l.filter((_,i)=>v[i]!=m),'Cột cao nhất ứng với giá trị lớn nhất.'),bc(v,l))},
()=>{const [l,v]=cv();return F(N('Tổng số học sinh giỏi của bốn lớp theo biểu đồ là:',v.reduce((a,b)=>a+b),'Cộng giá trị trên bốn cột.'),bc(v,l))},
()=>{const k=P([2,5,10]),n=R(2,8);return N(`Biểu đồ tranh: mỗi 🍎 ứng với ${k} quả. Hàng của An có ${'🍎'.repeat(n)}. An có bao nhiêu quả?`,n*k,`Bước 1: Mỗi biểu tượng 🍎 ứng với ${k} quả.\nBước 2: Số quả = số biểu tượng × ${k}.`)},
()=>N('Gieo một con xúc xắc. Có bao nhiêu kết quả có thể xảy ra?',6,'Các mặt 1; 2; 3; 4; 5; 6.'));
HA('stat',
()=>{const l=['T1','T2','T3','T4','T5'],v=sh([12,15,18,21,24,27,30]).slice(0,5);return I('Biểu đồ cột cho doanh thu 5 tháng (triệu đồng). Tháng cao nhất hơn tháng thấp nhất bao nhiêu triệu?',Math.max(...v)-Math.min(...v),'Lấy giá trị cột cao nhất trừ cột thấp nhất.',bc(v,l))},
()=>{const n=R(2,4);return I(`Tung đồng xu ${n} lần liên tiếp. Có bao nhiêu kết quả có thể xảy ra?`,2**n,`Bước 1: Mỗi lần tung có 2 khả năng (sấp hoặc ngửa).\nBước 2: Tung ${n} lần → số kết quả = 2^${n}.`)},
()=>{const n=P([10,20,25,40]),r=R(2,n-2);return I(`Lấy bóng ngẫu nhiên (có hoàn lại) ${n} lần, được bóng đỏ ${r} lần, còn lại là bóng xanh. Xác suất thực nghiệm lấy được bóng xanh (rút gọn) là:`,fs(n-r,n),`Bước 1: Số lần lấy bóng xanh = ${n} − ${r} = ${n-r}.\nBước 2: Xác suất thực nghiệm = ${n-r} : ${n}, rồi rút gọn.`)});
A('line',
()=>Q('Hai đường thẳng phân biệt có nhiều nhất mấy điểm chung?','1',['0','2','vô số'],'Hai đường thẳng phân biệt hoặc cắt nhau tại đúng 1 điểm, hoặc song song.'),
()=>Q('Hai tia chung gốc O và cùng nằm trên một đường thẳng, về hai phía của O, là hai tia:','đối nhau',['trùng nhau','song song','vuông góc'],'Đó là định nghĩa hai tia đối nhau.'),
()=>{const a=R(3,9),k=R(2,5);return N(`A, B, C thẳng hàng, B nằm giữa A và C, AB = ${a} cm, AC = ${a+k} cm. BC bằng (cm):`,k,'BC = AC − AB.')});
HA('line',
()=>{const a=R(10,40),b=R(3,9);return I(`M là trung điểm của AB, N là trung điểm của BC (B nằm giữa A và C). AB = ${2*a} cm, BC = ${2*b} cm. Độ dài MN là (cm):`,a+b,'MN = MB + BN = AB : 2 + BC : 2.')},
()=>{const k=R(2,4);return I(`Hai góc kề bù, góc lớn gấp ${k} lần góc nhỏ. Số đo góc lớn là (độ):`,k*180/(k+1),`Tổng 180° chia thành ${k+1} phần bằng nhau; góc lớn chiếm ${k} phần.`)});
A('int',
()=>{const a=R(2,15),b=R(2,15),c=R(2,15);return N(`Bỏ ngoặc rồi tính: ${a} − (−${b} + ${c})`,a+b-c,`Dấu − trước ngoặc: đổi dấu mọi số hạng trong ngoặc, được ${a} + ${b} − ${c}.`,iz,1)},
()=>{const a=R(2,15),b=R(1,20);return N(`Tìm x biết: x − ${a} = ${iz(-b)}`,a-b,`Chuyển vế: x = ${iz(-b)} + ${a}.`,iz,1)},
()=>{const k=R(3,9),m=k*nz();return Q(`Số nào là bội của ${iz(-k)}?`,iz(m),[m+1,m+2,m-1].map(iz),'Bội của −k là các số chia hết cho k, kể cả số âm.')});
HA('int',()=>{const n=P([6,8,10,12,15]);return I(`Số ${n} có bao nhiêu ước nguyên (kể cả ước âm)?`,2*[...Array(n+1).keys()].filter(i=>i&&n%i==0).length,'Mỗi ước dương cho một ước âm đối của nó, nên số ước nguyên gấp đôi.')});
A('frac',
()=>{const [a,b]=cop(2,8),k=R(2,6);return N(`Tìm x biết ${a}/${b} = x/${b*k}`,a*k,`Mẫu nhân với ${k} nên tử cũng nhân với ${k}.`)},
()=>{const [a,b]=cop(2,8),[c,d]=cop(2,8);return N(`Quy đồng ${a}/${b} và ${c}/${d}. Mẫu số chung nhỏ nhất là:`,lc(b,d),`Mẫu chung nhỏ nhất là BCNN(${b}; ${d}).`)});
A('dec',()=>{const y=R(2,9),q=R(2,15);return N(`Tính: ${dc(y*q)} : ${dc(y)}`,q,'Nhân cả số bị chia và số chia với 10 để số chia thành số tự nhiên, rồi chia.')});
HA('dec',()=>{const t=P([100000,500000,1000000]),c=R(2,9);return I(`Trên bản đồ tỉ lệ 1 : ${t}, hai điểm cách nhau ${c} cm. Khoảng cách thật là (km):`,c*t/100000,'1 cm trên bản đồ ứng với (tỉ lệ) cm thật; đổi cm sang km bằng cách chia cho 100 000.')});
