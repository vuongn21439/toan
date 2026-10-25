/* LỚP 6: BỒI DƯỠNG HSG — bổ sung câu hỏi đa dạng từ tuyển tập chuyên đề.
   Nạp vào h (nâng cao) và g (cơ bản) của các chủ đề có sẵn. */
(()=>{
const sd=n=>[...String(n)].reduce((s,c)=>s+(+c),0),
 sdt=n=>{const a=[...String(n)];return a.reduce((s,c,i)=>s+(i%2==a.length%2?+c:-(+c)),0)},
 last=(a,n)=>{let r=1;for(let i=0;i<n;i++)r=r*a%10;return r},
 dcount=n=>{let c=1;for(let p=2;p*p<=n;p++){if(n%p==0){let e=0;while(n%p==0){n/=p;e++}c*=e+1}}if(n>1)c*=2;return c};

/* TẬP HỢP (set) */
HA('set',
 ()=>{const n=R(2,5);return I(`Tập hợp A có ${n} phần tử. Số tập hợp con của A (kể cả ∅ và chính A) là:`,2**n,`Bước 1: Mỗi phần tử có 2 lựa chọn: thuộc hoặc không thuộc tập con.\nBước 2: Có ${n} phần tử → số tập con = 2^${n} = ${2**n}.`)},
 ()=>{const n=R(3,6);return I(`Tập hợp A có ${n} phần tử. Số tập hợp con có đúng 2 phần tử là:`,n*(n-1)/2,`Bước 1: Số cách chọn 2 phần tử từ ${n} phần tử.\nBước 2: = ${n} × (${n}-1) : 2 (chia 2 vì thứ tự không quan trọng).`)},
 ()=>{const a=R(5,12),b=a+R(2,6);return I(`Số phần tử của A = {x ∈ ℕ | ${a} ≤ x ≤ ${b}} là:`,b-a+1,`Bước 1: Các số từ ${a} đến ${b} gồm cả hai đầu.\nBước 2: Số lượng = ${b} − ${a} + 1 = ${b-a+1}.`)}
);
A('set',
 ()=>{const n=R(3,7);return Z(`Tập hợp A có ${n} phần tử. Số tập hợp con của A là:`,''+2**n,[2*n,2**(n-1),n*n,2**(n+1),n*n+1].map(String),'Số tập hợp con = 2^số phần tử.')},
 ()=>Q('Tập hợp nào sau đây là tập rỗng?','{x ∈ ℕ | x + 2 = 1}',['{0}','{x ∈ ℕ | x < 5}','{x ∈ ℤ | x² = 4}'],'x + 2 = 1 cho x = −1, không phải số tự nhiên.')
);

/* SỐ TỰ NHIÊN / ĐẾM SỐ (nat) */
HA('nat',
 ()=>{let a=R(2,9),b=R(2,9);while(b==a)b=R(2,9);return I(`Có bao nhiêu số tự nhiên có 2 chữ số khác nhau tạo từ ${a} và ${b}?`,2,`Bước 1: Hai chữ số khác nhau ${a} và ${b}.\nBước 2: Có 2 cách xếp: ${a}${b} và ${b}${a}.`)},
 ()=>{const a=R(2,8),d=R(2,5),n=R(4,8);return I(`Dãy: ${a}; ${a+d}; ${a+2*d}; …; số hạng thứ ${n} là:`,a+(n-1)*d,`Bước 1: Dãy cách đều: số hạng thứ k = số đầu + (k − 1) × khoảng cách.\nBước 2: Áp dụng công thức để tìm số hạng cần tìm.`)},
 ()=>{const n=R(10,30);return I(`Tổng các số tự nhiên lẻ từ 1 đến ${2*n-1} là:`,n*n,`Bước 1: Có ${n} số lẻ đầu tiên.\nBước 2: Tổng n số lẻ đầu tiên = n² = ${n}².`)},
 ()=>{const n=R(100,999);return I(`Tổng các chữ số của ${n} là:`,sd(n),`Bước 1: Tách các chữ số của ${n}.\nBước 2: Cộng các chữ số lại = ${sd(n)}.`)}
);
A('nat',
 ()=>{const n=R(100,999);return Z(`Tổng các chữ số của ${n} là:`,''+sd(n),[sd(n)+1,sd(n)-1,sd(n)+2].map(String),'Cộng ba chữ số lại.')},
 ()=>{const a=R(1,5),d=R(2,4),n=R(3,6);return N(`Số hạng thứ ${n} của dãy ${a}; ${a+d}; ${a+2*d}; … là:`,a+(n-1)*d,'Số hạng thứ k = số đầu + (k−1)×khoảng cách.')},
 ()=>{const n=R(4,20);return Z('Số nào sau đây là số chính phương?',''+n*n,sh([n*n+1,n*n-1,n*n+2,n*n-2]).map(String),'Số chính phương là bình phương của một số tự nhiên.')}
);

/* LŨY THỪA (pow) */
HA('pow',
 ()=>{const a=P([2,3,4,7,8,9]),n=R(5,30);return I(`Chữ số tận cùng của ${a}^${n} là:`,last(a,n),'Chữ số tận cùng lặp theo chu kỳ; chia số mũ cho chu kỳ rồi xét số dư.')},
 ()=>{const n=R(2,5);return I(`Tính: 1 + 2 + 2² + … + 2^${n} = ?`,2**(n+1)-1,`Bước 1: Đặt A là tổng cần tính.\nBước 2: Nhân đôi A rồi trừ A để khử các số hạng giữa → còn 2^${n+1} − 1.`)}
);
A('pow',
 ()=>{const a=P([2,3,4,7,8,9]),n=R(4,20);return Z(`Chữ số tận cùng của ${a}^${n} là:`,''+last(a,n),sh([0,1,2,3,4,5,6,7,8,9]).map(String),'Chữ số tận cùng lặp theo chu kỳ (2,3,7,8 chu kỳ 4; 4,9 chu kỳ 2).')},
 ()=>{const a=R(2,5),m=R(2,5),n=R(2,5);return N(`(${a}^${m})^${n} = ${a}^?`,m*n,'Lũy thừa của lũy thừa: nhân các số mũ.')},
 ()=>{const a=R(2,5),m=R(2,4),n=R(2,4);return Z(`So sánh ${a}^${m+n} và (${a}^${m})×(${a}^${n}):`,'Bằng nhau',['Lớn hơn','Nhỏ hơn','Không so sánh được'],'Nhân cùng cơ số: cộng số mũ, nên hai vế bằng nhau.')}
);

/* CHIA HẾT (div) */
HA('div',
 ()=>{const m=R(20,60);let c=0;for(let i=1;i<=m;i++)if(i%2==0&&i%3==0)c++;return I(`Từ 1 đến ${m}, có bao nhiêu số chia hết cho cả 2 và 3?`,c,'Chia hết cho cả 2 và 3 nghĩa là chia hết cho 6.')}
);
A('div',
 ()=>{const w=new Set();while(w.size<3)w.add(11*R(10,80)+R(1,10));return Q('Số nào chia hết cho 11?',''+11*R(10,80),[...w].map(String),'Hiệu tổng chữ số vị trí lẻ và chẵn chia hết cho 11.')},
 ()=>{const w=new Set();while(w.size<3){const n=100*R(1,9)+10*R(0,9)+R(0,9);if(n%4)w.add(n)}return Q('Số nào chia hết cho 4?',''+4*R(25,249),[...w].map(String),'Hai chữ số tận cùng tạo số chia hết cho 4.')}
);

/* ƯỚC & BCNN (ub, gcd) */
HA('ub',
 ()=>{const p=P([2,3,5]),e=R(1,4),n=p**e;return I(`Số ${n} = ${p}^${e} có bao nhiêu ước tự nhiên?`,e+1,`Bước 1: Số dạng p^e có các ước: p^0, p^1, …, p^e.\nBước 2: Có ${e}+1 = ${e+1} ước.`)},
 ()=>{const n=P([12,18,24,30,36,48,60,72]);return I(`Số ${n} có bao nhiêu ước tự nhiên?`,dcount(n),'Phân tích ra thừa số nguyên tố: số ước = tích (số mũ + 1).')}
);
HA('gcd',
 ()=>{const a=R(3,8),b=R(3,8),r=R(1,Math.min(a,b)-1);return I(`Số tự nhiên nhỏ nhất chia cho ${a} dư ${r}, chia cho ${b} cũng dư ${r} là:`,lc(a,b)+r,`Bước 1: Số cần tìm trừ ${r} chia hết cho cả ${a} và ${b}.\nBước 2: Số đó = BCNN(${a}; ${b}) + ${r}.`)}
);

/* TÌM ẨN / PHÉP TÍNH (nat, int) */
HA('nat',
 ()=>{const n=R(5,20);return I(`Tính nhanh: 2 + 4 + … + ${2*n} = ?`,n*(n+1),`Bước 1: Nhóm các cặp số đối xứng.\nBước 2: Tổng = 2 × (1+2+…+${n}) = 2 × ${n*(n+1)/2}.`)},
 ()=>{const a=R(2,9),b=R(2,9),c=R(10,50);return I(`Tìm x: ${a}×(x − ${b}) = ${a*c}. x = ?`,c+b,`Bước 1: Chuyển ${b} sang vế phải (đổi dấu).\nBước 2: x = ${c} + ${b}.`)}
);
HA('int',
 ()=>{const a=R(2,10);return I(`Tổng các số nguyên x thỏa mãn |x| ≤ ${a} là:`,0,'Các cặp số đối nhau triệt tiêu, tổng bằng 0.')},
 ()=>{const a=R(3,12),b=R(a+1,20);return I(`Có bao nhiêu số nguyên x thỏa mãn ${iz(-a)} < x < ${b}?`,a+b-1,`x chạy từ ${iz(1-a)} đến ${b-1}: có ${a+b-1} số.`,iz,1)}
);

/* PHÂN SỐ (frac) */
HA('frac',
 ()=>{const [a,b]=cop(3,9),[c,d]=cop(3,9);return I(`Tính (rút gọn): ${a}/${b} × ${c}/${d}`,fs(a*c,b*d),'Nhân tử với tử, mẫu với mẫu rồi rút gọn.')},
 ()=>{const a=R(2,6),b=R(2,6);return I(`Vòi 1 chảy đầy bể trong ${a} giờ, vòi 2 trong ${b} giờ. Cả hai cùng chảy 1 giờ được mấy phần bể? (rút gọn)`,fs(a+b,a*b),`1/${a} + 1/${b} = ${a+b}/${a*b}.`)}
);

/* TOÁN ĐỐ / CHUYỂN ĐỘNG (word) */
HA('word',
 ()=>{const v1=R(30,60),v2=v1+R(10,30),t=R(1,4);return I(`Hai xe cùng chiều, xe sau nhanh hơn ${v2-v1} km/h, cách nhau ${(v2-v1)*t} km. Sau mấy giờ gặp nhau?`,t,`Thời gian = khoảng cách : hiệu vận tốc.`)},
 ()=>{const s=R(2,8),m=R(2,8);return I(`Vừa gà vừa chó có ${s+m} con, ${2*s+4*m} chân. Số gà là:`,s,`Giả sử tất cả là chó: ${4*(s+m)} chân, thừa ${2*m}; mỗi gà ít hơn chó 2 chân → số gà = ${2*m}:2.`)},
 ()=>{const a=R(5,15),k=R(2,4);return I(`Năm nay con ${a} tuổi, mẹ gấp ${k} lần con. Hiệu số tuổi hai mẹ con là:`,(k-1)*a,`Mẹ ${k*a} tuổi, con ${a}; hiệu = ${k*a}−${a}. Hiệu số tuổi không đổi.`)}
);
A('word',
 ()=>{const v1=R(30,60),v2=R(30,60),t=R(1,4);return N(`Hai xe đi ngược chiều cách ${(v1+v2)*t} km, vận tốc ${v1} và ${v2} km/h. Sau mấy giờ gặp nhau?`,t,'Thời gian = quãng đường : tổng vận tốc.')}
);

/* ĐIỂM – ĐOẠN – GÓC (line) */
HA('line',
 ()=>{const n=R(4,8);return I(`Có ${n} tia chung gốc O, không có hai tia đối nhau. Có bao nhiêu góc đỉnh O?`,n*(n-1)/2,`Mỗi cặp tia tạo một góc: ${n}×${n-1}:2.`)},
 ()=>{const a=R(20,40),b=R(20,40);while(a+b>=90)b=R(20,40);return I(`Tam giác vuông có một góc nhọn ${a}°. Góc nhọn còn lại (độ):`,90-a,'Hai góc nhọn cộng lại = 90°.')}
);
A('line',
 ()=>{const n=R(3,7);return N(`Cho ${n} điểm, không có 3 điểm thẳng hàng. Có bao nhiêu đoạn thẳng?`,n*(n-1)/2,`Mỗi cặp điểm tạo một đoạn.`)},
 ()=>{const x=R(20,80);return N(`Hai góc kề bù, một góc ${x}°. Góc còn lại (độ):`,180-x,'Tổng hai góc kề bù = 180°.')}
);

/* HÌNH HỌC (geo, cir) */
HA('geo',
 ()=>{const a=R(3,10);return I(`Hình vuông có chu vi ${4*a} cm. Diện tích (cm²):`,a*a,`Cạnh = ${4*a}:4 = ${a}; S = cạnh².`)},
 ()=>{const a=R(4,12),b=R(3,10);return I(`Hình chữ nhật chu vi ${2*(a+b)} cm, dài hơn rộng ${a-b} cm. Diện tích (cm²):`,a*b,`Nửa chu vi = ${a+b}; rộng = (${a+b}−${a-b}):2 = ${b}; dài = ${a}.`)}
);
HA('cir',
 ()=>{const d=R(4,20);return I(`Hình tròn đường kính ${d} cm (π=3,14). Chu vi (cm):`,M(3.14*d),`C = π×d = 3,14×${d}.`)},
 ()=>{const r=R(3,10);return I(`Hình tròn bán kính ${r} cm (π=3,14). Diện tích (cm²):`,M(3.14*r*r),`S = π×r² = 3,14×${r}×${r}.`)}
);

/* THỐNG KÊ / XÁC SUẤT (stat) */
HA('stat',
 ()=>{const n=R(10,30);let c=0;for(let i=1;i<=n;i++)if(i%2==0)c++;return I(`Hộp có ${n} thẻ 1→${n}. Rút 1 thẻ. Xác suất được số chẵn (rút gọn):`,fs(c,n),`Có ${c} số chẵn trong ${n} thẻ: ${c}/${n}.`)},
 ()=>{const n=R(2,6);return I(`Gieo ${n} đồng xu. Có bao nhiêu kết quả?`,2**n,`Mỗi đồng xu 2 kết quả: 2^${n} = ${2**n}.`)}
);
A('stat',
 ()=>{const n=P([6,8,10,12]);let c=0;for(let i=1;i<=n;i++)if(i%2==0)c++;return Z(`Hộp có ${n} thẻ 1→${n}. Xác suất rút được số chẵn:`,fs(c,n),[fs(c+1,n),fs(c-1,n),fs(c,n+1),fs(c,2*n)],'Đếm số thẻ số chẵn rồi chia cho tổng số thẻ.')}
);

/* gán rõ gr=6 cho mọi chủ đề lớp 6 (lớp 7 đã có gr=7) */
T.forEach(t=>{if(t.gr===undefined)t.gr=6});
})();
