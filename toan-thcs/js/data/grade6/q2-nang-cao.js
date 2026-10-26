/* LỚP 6: Dạng nâng cao (nhập đáp án), hình minh họa — lời giải từng bước */
/* ===== NÂNG CAO: câu nhập đáp án (inp), hình minh họa (f) ===== */
const lc=(a,b)=>a/gcd(a,b)*b,
I=(q,a,e,f)=>({q,a:''+a,w:[],e,inp:1,f}),
F=(o,f)=>(o.f=f,o),
HA=(id,...f)=>{const t=T.find(t=>t.id==id);t.h=(t.h||[]).concat(f)},
rc=(a,b,u='cm')=>{const w=150,h=Math.max(36,Math.min(90,w*b/a));return `<svg viewBox="0 0 240 150" class="fg"><rect x="45" y="15" width="${w}" height="${h}"/><text x="120" y="${h+38}" text-anchor="middle">${a} ${u}</text><text x="38" y="${20+h/2}" text-anchor="end">${b} ${u}</text></svg>`},
an=x=>{const r=x*Math.PI/180,c=Math.cos(r),s=Math.sin(r);return `<svg viewBox="0 0 240 130" class="fg"><path d="M120 115H225M120 115L${120+100*c} ${115-100*s}M155 115A35 35 0 0 0 ${120+35*c} ${115-35*s}"/><text x="${120+58*Math.cos(r/2)}" y="${118-58*Math.sin(r/2)}" text-anchor="middle">${x}°</text></svg>`},
nl=v=>{let s='<path d="M20 60H220"/>';for(let i=-10;i<=10;i++)s+=`<path d="M${120+i*9} ${i%5?55:50}v${i%5?10:20}"/>`+(i%5?'':`<text x="${120+i*9}" y="92" text-anchor="middle">${iz(i)}</text>`);return `<svg viewBox="0 0 240 110" class="fg">${s}<circle cx="${120+v*9}" cy="60" r="6" fill="#ef476f"/><text x="${120+v*9}" y="38" text-anchor="middle">A</text></svg>`};
HA('nat',
()=>{const n=R(10,60);return I(`Tính nhanh: 1 + 2 + 3 + … + ${n} = ?`,n*(n+1)/2,`Bước 1: Công thức tổng các số tự nhiên từ 1 đến n là n × (n + 1) : 2.\nBước 2: Tổng = ${n} × ${n+1} : 2 = ${n*(n+1)/2}.`)},
()=>{const f=R(2,9),d=R(2,5),k=R(10,30);return I(`Dãy ${f}; ${f+d}; ${f+2*d}; …; ${f+d*(k-1)} có bao nhiêu số hạng?`,k,`Bước 1: Đây là dãy số cách đều với khoảng cách ${d}.\nBước 2: Số số hạng = (số cuối − số đầu) : khoảng cách + 1 = ${d*(k-1)} : ${d} + 1 = ${k}.`)},
()=>{const a=R(3,20),b=R(2,9),c=R(2,15);return I(`Tìm x biết: (x − ${a}) : ${b} = ${c}`,c*b+a,`Bước 1: Nhân cả hai vế với ${b}: x − ${a} = ${c} × ${b} = ${c*b}.\nBước 2: Cộng ${a} vào cả hai vế: x = ${c*b} + ${a} = ${c*b+a}.`)});
HA('pow',
()=>{const a=P([2,3,7,8,9]),n=R(10,60);let r=1;for(let i=0;i<n;i++)r=r*a%10;return Z(`Chữ số tận cùng của ${a}^${n} là:`,''+r,sh([0,1,2,3,4,5,6,7,8,9]).map(String),`Bước 1: Chữ số tận cùng của lũy thừa lặp lại theo chu kỳ.\nBước 2: Xét chu kỳ chữ số tận cùng của các lũy thừa của ${a}.\nBước 3: Chia ${n} cho độ dài chu kỳ, xét số dư để tìm chữ số tương ứng → ${r}.`)},
()=>{const a=P([2,3,5]),n=R(3,7);return I(`Tìm n biết ${a}^n = ${a**n}`,n,`Bước 1: Phân tích vế phải: ${a**n} = ${a}^${n}.\nBước 2: Hai lũy thừa cùng cơ số bằng nhau khi số mũ bằng nhau → n = ${n}.`)},
()=>{const a=R(2,5),m=R(2,4),n=R(2,4);return I(`(${a}^${m})^${n} = ${a}^?`,m*n,`Bước 1: Quy tắc lũy thừa của lũy thừa: giữ nguyên cơ số, nhân hai số mũ.\nBước 2: (${a}^${m})^${n} = ${a}^(${m}×${n}) = ${a}^${m*n}.`)});
HA('div',
()=>{const k=R(3,9),m=k*R(8,30)+R(0,k-1);return I(`Có bao nhiêu số tự nhiên từ 1 đến ${m} chia hết cho ${k}?`,Math.floor(m/k),`Bước 1: Các số chia hết cho ${k} trong khoảng 1 đến ${m} là: ${k}, ${2*k}, …\nBước 2: Số lượng = phần nguyên của ${m} : ${k} = ${Math.floor(m/k)}.`)},
()=>{const [a,b]=cop(2,9),p=a*b;return I(`Số tự nhiên nhỏ nhất có ba chữ số chia hết cho cả ${a} và ${b} là:`,Math.ceil(100/p)*p,`Bước 1: Vì ${a} và ${b} nguyên tố cùng nhau nên số cần tìm phải chia hết cho ${a}×${b} = ${p}.\nBước 2: Tìm bội nhỏ nhất của ${p} từ 100 trở lên → ${Math.ceil(100/p)*p}.`)});
HA('gcd',
()=>{const [a,b,c]=P([[4,6,10],[6,8,12],[5,6,15],[4,9,12],[8,12,18],[3,10,15]]);return I(`BCNN(${a}; ${b}; ${c}) = ?`,lc(lc(a,b),c),`Bước 1: Phân tích mỗi số ra thừa số nguyên tố.\nBước 2: Lấy tất cả các thừa số với số mũ lớn nhất xuất hiện.\nBước 3: Nhân lại → BCNN = ${lc(lc(a,b),c)}.`)},
()=>{const [a,b]=P([[4,6],[6,8],[5,6],[8,12],[9,12]]),r=R(1,3);return I(`Số tự nhiên nhỏ nhất lớn hơn ${r} mà chia cho ${a} và ${b} đều dư ${r} là:`,lc(a,b)+r,`Bước 1: Số đó trừ ${r} sẽ chia hết cho cả ${a} và ${b}.\nBước 2: Số đó − ${r} = BCNN(${a}; ${b}) = ${lc(a,b)}.\nBước 3: Số cần tìm = ${lc(a,b)} + ${r}.`)});
HA('ub',()=>{const a=R(1,4),b=R(1,3);return I(`Số ${2**a*3**b} = 2^${a} · 3^${b} có bao nhiêu ước?`,(a+1)*(b+1),`Bước 1: Nếu n = p^a · q^b (p, q nguyên tố) thì số ước của n = (a+1)×(b+1).\nBước 2: Số ước = (${a}+1)×(${b}+1) = ${(a+1)*(b+1)}.`)});
HA('int',
()=>{const a=R(3,12),b=a+R(1,8);return I(`Tổng tất cả các số nguyên x thỏa mãn ${iz(-a)} ≤ x ≤ ${b} là:`,(b-a)*(a+b+1)/2,`Bước 1: Các số từ ${iz(-a)} đến ${b}.\nBước 2: Các cặp số đối nhau triệt tiêu (tổng 0), còn lại tổng từ ${a+1} đến ${b}.\nBước 3: Tính tổng còn lại.`)},
()=>{const n=R(3,12);return I(`Có bao nhiêu số nguyên x thỏa mãn |x| &lt; ${n}?`,2*n-1,`Bước 1: |x| < ${n} nghĩa là −${n} < x < ${n}.\nBước 2: Các số nguyên: ${iz(1-n)}, …, −1, 0, 1, …, ${n-1}.\nBước 3: Đếm được ${2*n-1} số (nhớ đếm cả 0).`)},
()=>{const x=R(2,9),y=R(2,9),z=R(2,9);return I(`Tính: (−${x})² − ${y} × ${z}`,x*x-y*z,`Bước 1: (−${x})² = ${x} × ${x} = ${x*x} (bình phương luôn dương).\nBước 2: Nhân trước: ${y} × ${z} = ${y*z}.\nBước 3: ${x*x} − ${y*z} = ${x*x-y*z}.`)},
()=>{const v=R(-9,9);return F(Q('Điểm A trên trục số biểu diễn số nguyên nào?',iz(v),nums(v,1).map(iz),`Bước 1: Nhìn vị trí điểm A trên trục số.\nBước 2: Đếm số vạch từ 0 đến A; bên trái 0 là số âm, bên phải là số dương → ${iz(v)}.`),nl(v))});
HA('frac',
()=>{const [a,b]=cop(2,7),[c,d]=cop(2,9);return I(`Tính (rút gọn): ${a}/${b} + ${c}/${d}`,fs(a*d+b*c,b*d),`Bước 1: Quy đồng mẫu số về ${b*d}.\nBước 2: Cộng các tử: ${a*d} + ${b*c} = ${a*d+b*c}.\nBước 3: Rút gọn phân số ${a*d+b*c}/${b*d} → ${fs(a*d+b*c,b*d)}.`)},
()=>{const b=R(2,6),a=R(1,b-1),k=R(2,9);return I(`${a}/${b} của một số bằng ${a*k}. Số đó là:`,b*k,`Bước 1: ${a}/${b} của số cần tìm = ${a*k}.\nBước 2: Số đó = ${a*k} : (${a}/${b}) = ${a*k} × (${b}/${a}) = ${b*k}.`)},
()=>{const [a,b]=cop(2,9);return I(`Vòi A chảy đầy bể trong ${a} giờ, vòi B trong ${b} giờ. Mở cả hai vòi thì mỗi giờ chảy được mấy phần bể?`,fs(a+b,a*b),`Bước 1: Mỗi giờ vòi A chảy 1/${a} bể, vòi B chảy 1/${b} bể.\nBước 2: Cả hai vòi: 1/${a} + 1/${b} = (${b}+${a})/(${a}×${b}) = ${fs(a+b,a*b)}.`)});
HA('dec',
()=>{const x=R(11,99),y=R(11,99);return I(`Tính: ${dc(x)} × ${dc(y)}`,x*y/100,`Bước 1: Nhân như số tự nhiên (bỏ dấu phẩy tạm): ${x} × ${y} = ${x*y}.\nBước 2: Tổng số chữ số phần thập phân của hai thừa số là 2 → đặt dấu phẩy cách 2 chữ số từ phải sang trái.`)},
()=>{const x=R(11,99);return I(`Tính nhanh: ${dc(x)} × 25 × 4`,x*10,`Bước 1: 25 × 4 = 100.\nBước 2: Nhân với 100 là dời dấu phẩy sang phải 2 chữ số → ${dc(x)} × 100 = ${x*10}.`)});
HA('pct',
()=>{const r=P([10,20,25,50]),p=20*R(5,20);return I(`Sau khi tăng ${r}%, giá một món hàng là ${p*(100+r)/100} nghìn đồng. Giá ban đầu là (nghìn đồng):`,p,`Bước 1: Giá mới ứng với ${100+r}% giá ban đầu.\nBước 2: Giá ban đầu = ${p*(100+r)/100} : ${100+r} × 100 = ${p}.`)},
()=>{const b=P([8,16,40,80]),a=R(1,b-1);return I(`Tỉ số phần trăm của ${a} và ${b} là bao nhiêu %?`,a*100/b,`Bước 1: Tỉ số phần trăm = (số này : số kia) × 100%.\nBước 2: ${a} : ${b} × 100% = ${a*100/b}%.`)});
HA('geo',
()=>{const b=R(6,12),a=R(b+3,22),c=R(2,b-2);return I(`Mảnh vườn hình chữ nhật dài ${a} m, rộng ${b} m, có một cái ao hình vuông cạnh ${c} m. Diện tích đất còn lại là (m²):`,a*b-c*c,`Bước 1: Diện tích vườn = ${a} × ${b} = ${a*b} m².\nBước 2: Diện tích ao = ${c} × ${c} = ${c*c} m².\nBước 3: Đất còn lại = ${a*b} − ${c*c} = ${a*b-c*c} m².`,rc(a,b,'m'))},
()=>{const d=2*R(2,8),e=2*R(2,9);return I(`Hình thoi có diện tích ${d*e/2} cm², một đường chéo dài ${d} cm. Đường chéo còn lại dài (cm):`,e,`Bước 1: Diện tích hình thoi = (d₁ × d₂) : 2.\nBước 2: d₂ = 2 × diện tích : d₁ = 2 × ${d*e/2} : ${d} = ${e} cm.`)},
()=>{const w=R(3,12),l=w+R(1,8);return I(`Hình chữ nhật có chu vi ${2*(l+w)} cm, chiều dài hơn chiều rộng ${l-w} cm. Diện tích là (cm²):`,l*w,`Bước 1: Nửa chu vi = dài + rộng = ${l+w}.\nBước 2: Rộng = (${l+w} − ${l-w}) : 2 = ${w}; dài = ${l}.\nBước 3: Diện tích = ${l} × ${w} = ${l*w} cm².`)});
HA('line',
()=>{const k=R(3,5),n=k+R(2,4);return I(`Cho ${n} điểm, trong đó có đúng ${k} điểm thẳng hàng, ngoài ra không có ba điểm nào thẳng hàng. Vẽ các đường thẳng qua từng cặp điểm. Có bao nhiêu đường thẳng?`,n*(n-1)/2-k*(k-1)/2+1,`Bước 1: Nếu không có điểm thẳng hàng: số đường = ${n}×(${n}-1)/2.\nBước 2: Có ${k} điểm thẳng hàng → bị đếm thừa ${k}×(${k}-1)/2 đường, phải trừ đi.\nBước 3: Cộng lại 1 đường chứa ${k} điểm đó → kết quả ${n*(n-1)/2-k*(k-1)/2+1}.`)},
()=>{const a=2*R(20,85);return I(`Ot là tia phân giác của góc xOy = ${a}°. Số đo góc xOt là (độ):`,a/2,`Bước 1: Tia phân giác chia góc thành hai góc bằng nhau.\nBước 2: xOt = ${a}° : 2 = ${a/2}°.`,an(a))});
HA('word',
()=>{const k=R(2,5),y=R(4,20);return I(`Hiệu hai số là ${(k-1)*y}, số lớn gấp ${k} lần số bé. Số lớn là:`,k*y,`Bước 1: Gọi số bé là 1 phần, số lớn là ${k} phần → hiệu = ${k}-1 phần.\nBước 2: Mỗi phần = ${(k-1)*y} : ${k-1} = ${y}.\nBước 3: Số lớn = ${k} × ${y} = ${k*y}.`)},
()=>{const a=R(3,9)*5,b=R(3,9)*5,t=R(2,6);return I(`Hai xe khởi hành cùng lúc từ A và B, đi ngược chiều với vận tốc ${a} km/h và ${b} km/h. Quãng đường AB dài ${(a+b)*t} km. Sau mấy giờ hai xe gặp nhau?`,t,`Bước 1: Hai xe đi ngược chiều → vận tốc tiếp cận = ${a} + ${b} = ${a+b} km/h.\nBước 2: Thời gian gặp nhau = quãng đường : tổng vận tốc = ${(a+b)*t} : ${a+b} = ${t} giờ.`)},
()=>{const g=R(5,20),c=R(3,12);return I(`Vừa gà vừa chó có ${g+c} con và ${2*g+4*c} chân. Số chó là:`,c,`Bước 1: Giả sử tất cả ${g+c} con đều là gà → có ${2*(g+c)} chân.\nBước 2: Thực tế có ${2*g+4*c} chân, thừa ${2*c} chân.\nBước 3: Mỗi chó hơn gà 2 chân → số chó = ${2*c} : 2 = ${c}.`)});
HA('stat',()=>{const n=P([20,25,40,50]),s=R(3,n/2-1);return I(`Tung đồng xu ${n} lần, mặt sấp xuất hiện ${s} lần. Xác suất thực nghiệm xuất hiện mặt ngửa tính theo % là:`,(n-s)*100/n,`Bước 1: Mặt ngửa xuất hiện ${n-s} lần.\nBước 2: Xác suất thực nghiệm = ${n-s} : ${n} × 100% = ${(n-s)*100/n}%.`)});
HA('sym',()=>Q('Hình nào có cả trục đối xứng và tâm đối xứng?','hình chữ nhật',['tam giác đều','hình thang cân','hình bình hành'],`Bước 1: Hình chữ nhật có 2 trục đối xứng và có tâm đối xứng.\nBước 2: Hình bình hành chỉ có tâm đối xứng (không có trục); tam giác đều và hình thang cân có trục nhưng không có tâm đối xứng.`));
