/* LỚP 6: Đường tròn, cột kép, hỗn số, thêm dạng nâng cao */
/* ===== BỔ SUNG 2: đường tròn, cột kép, hỗn số, và thêm dạng nâng cao cho mọi chương ===== */
const M=x=>Math.round(x*100)/100,f2=x=>String(M(x)).replace('.',','),
ci=(r,l)=>`<svg viewBox="0 0 240 140" class="fg"><circle cx="120" cy="70" r="55" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M120 70H175"/><text x="148" y="62" text-anchor="middle">${l}</text></svg>`,
dbc=(a,b,l)=>{const m=Math.max(...a,...b);return `<svg viewBox="0 0 240 150" class="fg">${l.map((t,i)=>{const x=20+i*54,ha=100*a[i]/m,hb=100*b[i]/m;return `<rect x="${x}" y="${115-ha}" width="20" height="${ha}"/><rect x="${x+22}" y="${115-hb}" width="20" height="${hb}" fill="currentColor" fill-opacity=".35"/><text x="${x+10}" y="${110-ha}" text-anchor="middle">${a[i]}</text><text x="${x+32}" y="${110-hb}" text-anchor="middle">${b[i]}</text><text x="${x+21}" y="135" text-anchor="middle">${t}</text>`}).join('')}<path d="M8 115H236"/></svg>`},
d2=()=>[['6A','6B','6C','6D'],sh([12,14,16,18,20,22,24,26]).slice(0,4),sh([13,15,17,19,21,23,25,27]).slice(0,4)],
cn='Biểu đồ cột kép: cột trống là số bạn nam, cột tô là số bạn nữ.';
T.push({id:'cir',n:'Đường tròn',e:'⭕',c:'#00a8a8',tip:'Đường kính d = 2 × r. Chu vi C = 2 × 3,14 × r. Diện tích hình tròn S = 3,14 × r × r.',g:[
()=>{const r=R(2,15);return F(N(`Đường tròn có bán kính ${r} cm. Đường kính là (cm):`,2*r,'Đường kính = 2 × bán kính.'),ci(r,`r = ${r} cm`))},
()=>{const r=R(2,12);return F(Z(`Lấy π = 3,14. Chu vi đường tròn bán kính ${r} cm là (cm):`,f2(6.28*r),[f2(3.14*r),f2(3.14*r*r),f2(6.28*r*r),f2(6.28*r+2)],`Bước 1: Chu vi hình tròn = 2 × π × bán kính.\nBước 2: C = 2 × 3,14 × ${r}.`),ci(r,`r = ${r} cm`))},
()=>{const r=R(3,12);return F(Z(`Lấy π = 3,14. Diện tích hình tròn bán kính ${r} cm là (cm²):`,f2(3.14*r*r),[f2(6.28*r),f2(3.14*r),f2(6.28*r*r),f2(3.14*r*r+r)],`Bước 1: Diện tích hình tròn = π × r × r.\nBước 2: S = 3,14 × ${r} × ${r}.`),ci(r,`r = ${r} cm`))},
()=>{const r=R(2,20);return N(`Hình tròn có đường kính ${2*r} cm. Bán kính là (cm):`,r,'Bán kính = đường kính : 2.')}],h:[
()=>{const r=R(2,12);return I(`Đường tròn có chu vi ${M(6.28*r)} cm (π = 3,14). Bán kính là (cm):`,r,'r = C : (2 × 3,14).')},
()=>{const r=R(2,12);return I(`Hình tròn bán kính ${r} cm (π = 3,14) có diện tích là (cm²):`,M(3.14*r*r),'S = 3,14 × r × r.')},
()=>{const r=P([25,50]);return I(`Bánh xe bán kính ${r} cm lăn 10 vòng (π = 3,14). Quãng đường đi được là (m):`,M(10*6.28*r/100),`Bước 1: Mỗi vòng xe đạp đi một chu vi = 2 × 3,14 × ${r} cm.\nBước 2: 10 vòng = 10 × chu vi, rồi đổi cm sang m.`)}]});
A('frac',
()=>{const b=R(2,9),w=R(1,5),r=R(1,b-1);return Z(`Viết ${w*b+r}/${b} thành hỗn số:`,`${w} ${r}/${b}`,[`${w+1} ${r}/${b}`,`${w} ${b-r}/${b}`,`${r} ${w}/${b}`,`${w} ${r}/${b+1}`,`${w} ${r}/${b+2}`],`Bước 1: Thực hiện phép chia ${w*b+r} : ${b}.\nBước 2: Thương = ${w}, số dư = ${r}.`)},
()=>{const s=new Set(),a=[];while(a.length<3){const d=R(3,9),n=R(1,d-1),v=(n/d).toFixed(5);if(!s.has(v)){s.add(v);a.push([n,d,n/d])}}const f=p=>p.map(x=>x[0]+'/'+x[1]).join(' &lt; '),c=f([...a].sort((x,y)=>x[2]-y[2])),ps=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]].map(p=>f(p.map(i=>a[i]))).filter(x=>x!=c);return Q('Sắp xếp các phân số theo thứ tự tăng dần:',c,ps.slice(0,3),'Quy đồng mẫu số rồi so sánh các tử, hoặc đổi sang số thập phân.')});
HA('frac',()=>{const d=R(4,9),w1=R(1,4),w2=R(1,4),a=R(1,d-1),b=R(1,d-1);return I(`Tính (kết quả là phân số rút gọn): ${w1} ${a}/${d} + ${w2} ${b}/${d}`,fs((w1+w2)*d+a+b,d),'Đổi hỗn số ra phân số rồi cộng, hoặc cộng phần nguyên và phần phân số riêng.')});
A('stat',()=>{const [l,a,b]=d2(),i=R(0,3);return F(N(`${cn} Lớp ${l[i]} có bao nhiêu bạn nữ?`,b[i],'Đọc số ghi trên cột tô của lớp đó.'),dbc(a,b,l))});
HA('stat',
()=>{const [l,a,b]=d2();return I(`${cn} Tổng số bạn nam của bốn lớp là:`,a.reduce((x,y)=>x+y),'Cộng bốn số trên các cột trống.',dbc(a,b,l))},
()=>{const [l,a,b]=d2(),i=R(0,3);return I(`${cn} Số bạn nam và nữ của lớp ${l[i]} chênh nhau bao nhiêu bạn?`,Math.abs(a[i]-b[i]),'Lấy số lớn trừ số nhỏ.',dbc(a,b,l))});
HA('nat',
()=>{const k=R(3,15);return I(`Tìm số tự nhiên x biết x² = ${k*k}`,k,`Bước 1: x² = ${k*k} = ${k}².\nBước 2: Căn bậc hai số học → x = ${k}.`)},
()=>{const a=R(2,9),b=R(2,6),c=R(20,40),d=R(5,15),e=R(1,d);return I(`Tính: ${a} + ${b} × [${c} − (${d} − ${e})]`,a+b*(c-(d-e)),'Thứ tự: ngoặc tròn, ngoặc vuông, nhân chia, rồi cộng trừ.')});
HA('pow',()=>{const a=R(2,5),m=R(2,5),n=m+R(1,5);return I(`Tìm số tự nhiên x biết ${a}^x · ${a}^${m} = ${a}^${n}`,n-m,'Nhân cùng cơ số: cộng số mũ, nên x + '+m+' = '+n+'.')});
HA('div',
()=>{const p=R(1,9);let c=0;for(let a=0;a<10;a++)if((p+a)%3==0)c++;return I(`Có bao nhiêu chữ số a để số ${p}a chia hết cho 3?`,c,`Bước 1: Một số chia hết cho 3 khi tổng các chữ số chia hết cho 3.\nBước 2: Tổng ${p} + a phải chia hết cho 3.`)},
()=>{const n=P([20,30,40,50]);let c=0;for(let i=2;i<n;i++)if(isP(i))c++;return I(`Có bao nhiêu số nguyên tố nhỏ hơn ${n}?`,c,'Liệt kê các số nguyên tố: 2; 3; 5; 7; 11; …')});
HA('ub',
()=>{const n=P([12,18,20,24,28,30]);return I(`Tổng tất cả các ước của ${n} là:`,[...Array(n+1).keys()].filter(i=>i&&n%i==0).reduce((x,y)=>x+y),'Liệt kê các ước theo cặp rồi cộng lại.')},
()=>{const [a,b]=P([[12,18],[24,36],[30,45],[18,27],[20,50]]);return I(`ƯC(${a}; ${b}) có bao nhiêu phần tử?`,[...Array(a+1).keys()].filter(i=>i&&a%i==0&&b%i==0).length,`Bước 1: Tìm ƯCLN của ${a} và ${b}.\nBước 2: Các ước chung chính là các ước của ƯCLN đó.`)});
HA('pct',
()=>{const x=P([10,20,50]),y=P([10,20,50]),p=100*R(1,10);return I(`Một món hàng giá ${p} nghìn đồng, giảm ${x}% rồi giảm tiếp ${y}% trên giá đã giảm. Giá cuối cùng là (nghìn đồng):`,p*(100-x)*(100-y)/10000,`Bước 1: Sau giảm ${x}% còn (100−${x})% giá cũ.\nBước 2: Sau giảm ${y}% nữa: lấy giá vừa rồi × (100−${y})%.`)},
()=>{const r=P([5,10,15,20]),p=20*R(1,10);return I(`Gửi ngân hàng ${p} triệu đồng, lãi ${r}% một năm. Sau 1 năm, cả vốn lẫn lãi là (triệu đồng):`,p*(100+r)/100,`Cả vốn lẫn lãi = ${p} × ${100+r}%.`)});
HA('sym',()=>{const n=R(5,10);return I(`Đa giác lồi có ${n} cạnh có bao nhiêu đường chéo?`,n*(n-3)/2,`Mỗi đỉnh nối được ${n-3} đường chéo, mỗi đường bị đếm 2 lần: ${n} × ${n-3} : 2.`)});
HA('geo',
()=>{const k=R(2,5);return I(`Tăng cạnh hình vuông lên ${k} lần thì diện tích tăng lên bao nhiêu lần?`,k*k,`Diện tích = cạnh × cạnh nên tăng ${k} × ${k} lần.`)},
()=>{const a=R(4,15),h=R(3,12);return I(`Hình bình hành có diện tích ${a*h} cm², cạnh đáy ${a} cm. Chiều cao tương ứng là (cm):`,h,'Chiều cao = diện tích : đáy.')});
HA('line',()=>{const n=R(4,8);return I(`Có ${n} tia chung gốc O, không có hai tia nào đối nhau. Có tất cả bao nhiêu góc đỉnh O?`,n*(n-1)/2,`Mỗi cặp tia tạo một góc: ${n} × ${n-1} : 2.`)});
HA('word',
()=>{const d=R(2,6),k=R(8,30);return I(`Trồng cây dọc một con đường dài ${d*k} m, cách đều nhau ${d} m, trồng cả hai đầu đường. Cần bao nhiêu cây?`,k+1,`Số cây = ${d*k} : ${d} + 1 (đếm cả hai đầu).`)},
()=>{const [a,b]=P([[3,4],[2,5],[4,5],[3,5]]),x=lc(a,b)*R(2,4);return I(`Lớp 6A có ${x} bạn, 1/${a} số bạn giỏi, 1/${b} số bạn khá, còn lại là trung bình. Số bạn trung bình là:`,x-x/a-x/b,`Số giỏi = ${x/a}, số khá = ${x/b}; trừ khỏi ${x}.`)});
A('dec',()=>{const x=R(11,99);return N(`Đổi ${dc(x)} km ra mét:`,x*100,'1 km = 1000 m: dời dấu phẩy sang phải 3 chữ số.')});
HA('dec',()=>{const n=R(1001,9999);return I(`Làm tròn ${(n/1000).toFixed(3).replace('.',',')} đến hàng phần trăm:`,Math.round(n/10)/100,'Nhìn chữ số hàng phần nghìn: từ 5 trở lên thì làm tròn lên.')});
