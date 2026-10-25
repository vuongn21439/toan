/* LỚP 6: Dạng nâng cao (nhập đáp án), hình minh họa */
/* ===== NÂNG CAO: câu nhập đáp án (inp), hình minh họa (f) ===== */
const lc=(a,b)=>a/gcd(a,b)*b,
I=(q,a,e,f)=>({q,a:''+a,w:[],e,inp:1,f}),
F=(o,f)=>(o.f=f,o),
HA=(id,...f)=>{const t=T.find(t=>t.id==id);t.h=(t.h||[]).concat(f)},
rc=(a,b,u='cm')=>{const w=150,h=Math.max(36,Math.min(90,w*b/a));return `<svg viewBox="0 0 240 150" class="fg"><rect x="45" y="15" width="${w}" height="${h}"/><text x="120" y="${h+38}" text-anchor="middle">${a} ${u}</text><text x="38" y="${20+h/2}" text-anchor="end">${b} ${u}</text></svg>`},
an=x=>{const r=x*Math.PI/180,c=Math.cos(r),s=Math.sin(r);return `<svg viewBox="0 0 240 130" class="fg"><path d="M120 115H225M120 115L${120+100*c} ${115-100*s}M155 115A35 35 0 0 0 ${120+35*c} ${115-35*s}"/><text x="${120+58*Math.cos(r/2)}" y="${118-58*Math.sin(r/2)}" text-anchor="middle">${x}°</text></svg>`},
nl=v=>{let s='<path d="M20 60H220"/>';for(let i=-10;i<=10;i++)s+=`<path d="M${120+i*9} ${i%5?55:50}v${i%5?10:20}"/>`+(i%5?'':`<text x="${120+i*9}" y="92" text-anchor="middle">${iz(i)}</text>`);return `<svg viewBox="0 0 240 110" class="fg">${s}<circle cx="${120+v*9}" cy="60" r="6" fill="#ef476f"/><text x="${120+v*9}" y="38" text-anchor="middle">A</text></svg>`};
HA('nat',
()=>{const n=R(10,60);return I(`Tính nhanh: 1 + 2 + 3 + … + ${n} = ?`,n*(n+1)/2,`Tổng = số cuối × (số cuối + 1) : 2 = ${n} × ${n+1} : 2.`)},
()=>{const f=R(2,9),d=R(2,5),k=R(10,30);return I(`Dãy ${f}; ${f+d}; ${f+2*d}; …; ${f+d*(k-1)} có bao nhiêu số hạng?`,k,`Số số hạng = (số cuối − số đầu) : khoảng cách + 1 = ${d*(k-1)} : ${d} + 1.`)},
()=>{const a=R(3,20),b=R(2,9),c=R(2,15);return I(`Tìm x biết: (x − ${a}) : ${b} = ${c}`,c*b+a,`x − ${a} = ${c} × ${b} = ${c*b}, nên x = ${c*b} + ${a}.`)});
HA('pow',
()=>{const a=P([2,3,7,8,9]),n=R(10,60);let r=1;for(let i=0;i<n;i++)r=r*a%10;return Z(`Chữ số tận cùng của ${a}^${n} là:`,''+r,sh([0,1,2,3,4,5,6,7,8,9]).map(String),`Chữ số tận cùng của lũy thừa lặp theo chu kỳ; chia ${n} cho chu kỳ rồi xét số dư.`)},
()=>{const a=P([2,3,5]),n=R(3,7);return I(`Tìm n biết ${a}^n = ${a**n}`,n,`Phân tích ${a**n} = ${a}^${n}, rồi so sánh số mũ.`)},
()=>{const a=R(2,5),m=R(2,4),n=R(2,4);return I(`(${a}^${m})^${n} = ${a}^?`,m*n,'Lũy thừa của lũy thừa: giữ cơ số, nhân hai số mũ.')});
HA('div',
()=>{const k=R(3,9),m=k*R(8,30)+R(0,k-1);return I(`Có bao nhiêu số tự nhiên từ 1 đến ${m} chia hết cho ${k}?`,Math.floor(m/k),`Lấy ${m} : ${k}, lấy phần nguyên.`)},
()=>{const [a,b]=cop(2,9),p=a*b;return I(`Số tự nhiên nhỏ nhất có ba chữ số chia hết cho cả ${a} và ${b} là:`,Math.ceil(100/p)*p,`${a} và ${b} nguyên tố cùng nhau nên cần chia hết cho ${p}: tìm bội đầu tiên của ${p} từ 100 trở lên.`)});
HA('gcd',
()=>{const [a,b,c]=P([[4,6,10],[6,8,12],[5,6,15],[4,9,12],[8,12,18],[3,10,15]]);return I(`BCNN(${a}; ${b}; ${c}) = ?`,lc(lc(a,b),c),'Phân tích từng số ra thừa số nguyên tố, lấy mọi thừa số với số mũ lớn nhất.')},
()=>{const [a,b]=P([[4,6],[6,8],[5,6],[8,12],[9,12]]),r=R(1,3);return I(`Số tự nhiên nhỏ nhất lớn hơn ${r} mà chia cho ${a} và ${b} đều dư ${r} là:`,lc(a,b)+r,`Số đó trừ ${r} chia hết cho cả ${a} và ${b}: BCNN(${a}; ${b}) + ${r}.`)});
HA('ub',()=>{const a=R(1,4),b=R(1,3);return I(`Số ${2**a*3**b} = 2^${a} · 3^${b} có bao nhiêu ước?`,(a+1)*(b+1),`Số ước = (${a} + 1) × (${b} + 1).`)});
HA('int',
()=>{const a=R(3,12),b=a+R(1,8);return I(`Tổng tất cả các số nguyên x thỏa mãn ${iz(-a)} ≤ x ≤ ${b} là:`,(b-a)*(a+b+1)/2,`Các cặp số đối triệt tiêu nhau, còn lại tổng từ ${a+1} đến ${b}.`)},
()=>{const n=R(3,12);return I(`Có bao nhiêu số nguyên x thỏa mãn |x| &lt; ${n}?`,2*n-1,`x chạy từ ${iz(1-n)} đến ${n-1}, nhớ đếm cả số 0.`)},
()=>{const x=R(2,9),y=R(2,9),z=R(2,9);return I(`Tính: (−${x})² − ${y} × ${z}`,x*x-y*z,`(−${x})² = ${x*x} (dương); nhân trước rồi trừ.`)},
()=>{const v=R(-9,9);return F(Q('Điểm A trên trục số biểu diễn số nguyên nào?',iz(v),nums(v,1).map(iz),'Đếm số vạch từ 0 đến A; bên trái 0 là số âm.'),nl(v))});
HA('frac',
()=>{const [a,b]=cop(2,7),[c,d]=cop(2,9);return I(`Tính (rút gọn): ${a}/${b} + ${c}/${d}`,fs(a*d+b*c,b*d),'Quy đồng mẫu số, cộng các tử, cuối cùng rút gọn.')},
()=>{const b=R(2,6),a=R(1,b-1),k=R(2,9);return I(`${a}/${b} của một số bằng ${a*k}. Số đó là:`,b*k,`Số đó = ${a*k} : ${a}/${b} = ${a*k} × ${b}/${a}.`)},
()=>{const [a,b]=cop(2,9);return I(`Vòi A chảy đầy bể trong ${a} giờ, vòi B trong ${b} giờ. Mở cả hai vòi thì mỗi giờ chảy được mấy phần bể?`,fs(a+b,a*b),`Mỗi giờ: 1/${a} + 1/${b} = ${a+b}/${a*b}.`)});
HA('dec',
()=>{const x=R(11,99),y=R(11,99);return I(`Tính: ${dc(x)} × ${dc(y)}`,x*y/100,'Nhân như số tự nhiên, rồi đặt dấu phẩy sao cho phần thập phân có tổng số chữ số của hai thừa số.')},
()=>{const x=R(11,99);return I(`Tính nhanh: ${dc(x)} × 25 × 4`,x*10,'25 × 4 = 100; nhân với 100 là dời dấu phẩy sang phải 2 chữ số.')});
HA('pct',
()=>{const r=P([10,20,25,50]),p=20*R(5,20);return I(`Sau khi tăng ${r}%, giá một món hàng là ${p*(100+r)/100} nghìn đồng. Giá ban đầu là (nghìn đồng):`,p,`Giá mới ứng với ${100+r}% giá ban đầu: ${p*(100+r)/100} : ${100+r} × 100.`)},
()=>{const b=P([8,16,40,80]),a=R(1,b-1);return I(`Tỉ số phần trăm của ${a} và ${b} là bao nhiêu %?`,a*100/b,`${a} : ${b} × 100%.`)});
HA('geo',
()=>{const b=R(6,12),a=R(b+3,22),c=R(2,b-2);return I(`Mảnh vườn hình chữ nhật dài ${a} m, rộng ${b} m, có một cái ao hình vuông cạnh ${c} m. Diện tích đất còn lại là (m²):`,a*b-c*c,'Diện tích đất = diện tích vườn − diện tích ao.',rc(a,b,'m'))},
()=>{const d=2*R(2,8),e=2*R(2,9);return I(`Hình thoi có diện tích ${d*e/2} cm², một đường chéo dài ${d} cm. Đường chéo còn lại dài (cm):`,e,'S = d₁ × d₂ : 2 nên d₂ = 2 × S : d₁.')},
()=>{const w=R(3,12),l=w+R(1,8);return I(`Hình chữ nhật có chu vi ${2*(l+w)} cm, chiều dài hơn chiều rộng ${l-w} cm. Diện tích là (cm²):`,l*w,`Nửa chu vi = ${l+w}; rộng = (${l+w} − ${l-w}) : 2 = ${w}; dài = ${l}.`)});
HA('line',
()=>{const k=R(3,5),n=k+R(2,4);return I(`Cho ${n} điểm, trong đó có đúng ${k} điểm thẳng hàng, ngoài ra không có ba điểm nào thẳng hàng. Vẽ các đường thẳng qua từng cặp điểm. Có bao nhiêu đường thẳng?`,n*(n-1)/2-k*(k-1)/2+1,`Tính như không có điểm thẳng hàng, bớt ${k*(k-1)/2} đường bị đếm thừa, cộng 1 đường chứa ${k} điểm.`)},
()=>{const a=2*R(20,85);return I(`Ot là tia phân giác của góc xOy = ${a}°. Số đo góc xOt là (độ):`,a/2,'Tia phân giác chia góc thành hai góc bằng nhau.',an(a))});
HA('word',
()=>{const k=R(2,5),y=R(4,20);return I(`Hiệu hai số là ${(k-1)*y}, số lớn gấp ${k} lần số bé. Số lớn là:`,k*y,`Hiệu ứng với ${k-1} phần bằng nhau, mỗi phần ${y}.`)},
()=>{const a=R(3,9)*5,b=R(3,9)*5,t=R(2,6);return I(`Hai xe khởi hành cùng lúc từ A và B, đi ngược chiều với vận tốc ${a} km/h và ${b} km/h. Quãng đường AB dài ${(a+b)*t} km. Sau mấy giờ hai xe gặp nhau?`,t,`Thời gian gặp nhau = quãng đường : tổng vận tốc = ${(a+b)*t} : ${a+b}.`)},
()=>{const g=R(5,20),c=R(3,12);return I(`Vừa gà vừa chó có ${g+c} con và ${2*g+4*c} chân. Số chó là:`,c,`Giả sử tất cả là gà: ${2*(g+c)} chân, thiếu ${2*c} chân; mỗi chó hơn gà 2 chân nên số chó = ${2*c} : 2.`)});
HA('stat',()=>{const n=P([20,25,40,50]),s=R(3,n/2-1);return I(`Tung đồng xu ${n} lần, mặt sấp xuất hiện ${s} lần. Xác suất thực nghiệm xuất hiện mặt ngửa tính theo % là:`,(n-s)*100/n,`Mặt ngửa xuất hiện ${n-s} lần: ${n-s} : ${n} × 100%.`)});
HA('sym',()=>Q('Hình nào có cả trục đối xứng và tâm đối xứng?','hình chữ nhật',['tam giác đều','hình thang cân','hình bình hành'],'Hình chữ nhật có 2 trục và tâm đối xứng; hình bình hành chỉ có tâm đối xứng.'));
