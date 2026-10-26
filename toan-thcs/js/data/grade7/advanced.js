/* LỚP 7: BỒI DƯỠNG HSG — tập 1. Nạp vào h (nâng cao) và g (cơ bản). */
(()=>{const {fr,fq,fh,add,addH,ps}=G7H,
 kf=()=>{let v;do v=R(-6,6);while(!v);return v},
 rt=()=>{let a,b;do{b=R(2,9);a=nz()}while(gcd(Math.abs(a),b)!=1);return[a,b]},
 br=(a,b)=>a<0?'('+fq(a,b)+')':fq(a,b),
 rp=d=>{const c=[];for(let i=0;i<=d;i++)c.push(i==0||i==d||R(0,2)?kf():0);return c},
 ev=(c,x)=>c.reduceRight((s,a)=>s*x+a,0);

/* SỐ HỮU TỈ */
addH('l7sht',
 ()=>{const[a,b]=rt(),[c,d]=rt();return I(`Tính hợp lý (rút gọn): ${fq(a,b)}×${fq(c,d)} + ${fq(a,b)}×(${fq(-c,d)})`,'0',`Bước 1: Đặt ${fq(a,b)} làm thừa số chung.\nBước 2: ${fq(a,b)} × (… − …) = 0.\nBước 3: Suy ra một trong hai thừa số bằng 0.`)},
 ()=>{const[a,b]=rt(),[c,d]=rt(),[e,f]=rt();return I(`Tìm x: x + ${br(a,b)} = ${br(c,d)} − ${br(e,f)}`,fr(c*b*f-a*d*f-e*b*d,b*d*f),`Bước 1: Chuyển các số hạng sang vế phải.\nBước 2: x = ${fq(c,d)} − ${fq(e,f)} − ${br(a,b)}.\nBước 3: Quy đồng mẫu ${b*d*f} rồi tính.`)},
 ()=>{const a=R(2,5),n=R(2,4);return I(`Tính: (${fq(-1,2)})^${2*n}×(−2)^${2*n}`,1,`Bước 1: Nhân từng cặp số có tích bằng 1 (hoặc −1).\nBước 2: (−1/2 × −2) = 1, lũy thừa vẫn bằng 1.`)},
 ()=>{const[a,b]=rt();return I(`Số nghịch đảo của ${br(a,b)} là (rút gọn):`,fr(b,a),`Bước 1: Hai số nghịch đảo khi tích bằng 1.\nBước 2: Nghịch đảo của a/b là b/a (với a ≠ 0).`)}
);
add('l7sht',
 ()=>{const[a,b]=rt();return Z(`Số đối của ${br(a,b)} là:`,fq(-a,b),[fq(-b,a),fq(b,a),fq(a,b)],'Số đối của x là −x: đổi dấu tử số.')},
 ()=>{let L;do{L=Array.from({length:4},rt)}while(new Set(L.map(([a,b])=>(a/b).toFixed(6))).size<4);const v=L.map(([a,b])=>a/b),k=v.indexOf(Math.min(...v)),s=L.map(([a,b])=>fq(a,b));return Z(`Số nhỏ nhất trong: ${s.join('; ')} là`,s[k],s.filter((_,i)=>i!=k),'Đổi ra số thập phân rồi so sánh; số âm luôn nhỏ hơn số dương.')}
);

/* SỐ THỰC */
addH('l7sth',
 ()=>{const a=R(2,9),b=R(2,9);return I(`Tính: √${a*a}×√${b*b}`,a*b,`Bước 1: √${a*a} = ${a} (căn không âm).\nBước 2: √${b*b} = ${b}.\nBước 3: Tích = ${a} × ${b} = ${a*b}.`)},
 ()=>{const n=R(2,20);return I(`Tìm x>0 biết x²=${n*n}. x=?`,n,`Bước 1: x = √${n*n}.\nBước 2: Căn bậc hai số học của ${n*n} là ${n}.`)},
 ()=>{const a=R(2,5);return I(`So sánh √${a*a+1} và ${a}. Số lớn hơn (nhập 1 nếu √… lớn hơn, 0 nếu ${a} lớn hơn):`,1,`Bước 1: So sánh √${a*a+1} với √${a*a} = ${a}.\nBước 2: Vì ${a*a+1} > ${a*a} nên căn lớn hơn → chọn 1.`)}
);
add('l7sth',
 ()=>{const s=R(3,15);return Z(`Căn bậc hai số học của ${s*s} là:`,''+s,[iz(-s),''+s*s,''+(s+1)],`Bước 1: Số ${s*s} có hai căn: ${s} và −${s}.\nBước 2: Căn bậc hai số học là căn không âm → ${s}.`)},
 ()=>Z('Số nào sau đây là số vô tỉ?','√2',['√4','0,25','−3/7'],'√2 là số thập phân vô hạn không tuần hoàn; các số còn lại viết được dạng phân số.')
);

/* TỈ LỆ THỨC */
addH('l7tlt',
 ()=>{const[a,b,c]=P([[1,2,3],[2,3,5],[1,3,4],[2,3,4]]),k=R(2,10);return I(`Chia ${(a+b+c)*k} thành 3 phần tỉ lệ với ${a}; ${b}; ${c}. Phần lớn nhất bằng:`,Math.max(a,b,c)*k,`Bước 1: Mỗi phần bằng ${k}.\nBước 2: Phần lớn nhất = max(${a},${b},${c}) × ${k}.`)},
 ()=>{const[a,b]=P([[5,3],[7,4],[4,3],[5,2]]),k=R(2,9);return I(`Hai số x,y có x/y=${a}/${b} và x−y=${(a-b)*k}. Tìm x.`,a*k,`Bước 1: Từ tỉ lệ thức, các tỉ số bằng nhau = ${k}.\nBước 2: x = a × ${k} = ${a*k}.`)},
 ()=>{const k=R(2,5),x1=R(2,6),x2=x1+R(1,4);return I(`Hai đại lượng tỉ lệ nghịch. Khi x=${x1} thì y=${k*x2}; khi x=${x2} thì y=?`,k*x1,`Bước 1: Tỉ lệ nghịch → tích x·y không đổi.\nBước 2: ${x1} × (${k}*${x2}) = ${x2} × y → y = ${k*x1}.`)}
);
add('l7tlt',
 ()=>{const a=R(2,9),b=R(2,9),c=R(2,9),d=R(2,9);return Z(`Tỉ lệ thức nào ĐÚNG (tích ngoại=tích trung)?`,`Bước 1: Nhân tử và mẫu với cùng một số ${c}.\nBước 2: ${a}/${b} = ${a*c}/${b*c} (phân số bằng nhau).`,[`${a}/${b}=${a+c}/${b+c}`,`${a}/${b}=${b}/${a}`,`${a}/${b}=${a*c}/${b}`],'Nhân cả tử và mẫu với cùng một số khác 0 thì được phân số bằng nhau.')}
);

/* ĐA THỨC */
addH('l7dt',
 ()=>{const c=rp(3),x=P([-3,-2,-1,1,2,3]);return I(`Cho P(x)=${ps(c)}. P(${iz(x)})=?`,ev(c,x),`Thay x=${iz(x)} vào P(x): ${iz(ev(c,x))}.`,iz,1)},
 ()=>{const m=R(2,6);let r=R(-4,4);while(!r)r=R(-4,4);return I(`Tìm nghiệm của đa thức ${ps([-m*r,m])}. Nghiệm x=?`,r,`${m}x−${m*r}=0 → x=${r}.`,iz,1)},
 ()=>{const c=rp(4);return I(`Tổng các hệ số của đa thức ${ps(c)} là:`,c.reduce((a,b)=>a+b,0),'Tổng các hệ số = P(1): thay x=1.',iz,1)},
 ()=>{const r=R(1,5),m=R(r+1,9);return I(`Đa thức P(x)=x²−${m}x+c nhận x=${r} làm nghiệm. Tìm c.`,r*(m-r),`P(${r})=0: ${r*r}−${m*r}+c=0 → c=${r*(m-r)}.`)}
);
add('l7dt',
 ()=>{const c=rp(R(2,4));return N(`Bậc của đa thức ${ps(c)} là:`,c.length-1,'Bậc là số mũ lớn nhất của biến sau khi thu gọn.')},
 ()=>{let a=R(2,5),b=R(2,5);while(a==b)b=R(2,5);return Z(`Tích ${a}x²×${b}x³ bằng:`,`${a*b}x^5`,[`${a+b}x^5`,`${a*b}x^6`,`${a*b}x^5+1`,`${a*b}x^4`],'Nhân hệ số, cộng số mũ của x: 2+3=5.')}
);

/* GÓC & ĐƯỜNG THẲNG SONG SONG */
addH('l7gdt',
 ()=>{const x=R(36,44),p=R(5,20),c=5*x+p-180;return I(`Hai góc kề bù có số đo (2x+${p})° và (3x−${c})°. Tìm x.`,x,`Tổng=180°: 5x+${p-c}=180 → x=${x}.`)},
 ()=>{const n=R(3,5);return I(`Có ${n} đường thẳng phân biệt cắt nhau tại một điểm. Có bao nhiêu cặp góc đối đỉnh?`,n*(n-1),`Mỗi cặp đường thẳng tạo 2 cặp góc đối đỉnh; có ${n*(n-1)/2} cặp đường thẳng → ${n*(n-1)} cặp.`)}
);
add('l7gdt',
 ()=>{const a=P([30,40,50,60,70,110,120,130]);return N(`Hai góc kề bù, một góc ${a}°. Góc còn lại (độ):`,180-a,'Tổng hai góc kề bù=180°.')},
 ()=>Z('Khẳng định nào ĐÚNG?','Hai góc đối đỉnh thì bằng nhau',['Hai góc kề bù thì bằng nhau','Hai góc so le trong luôn bằng nhau','Qua một điểm có hai đường thẳng song song với đường thẳng đã cho'],'Hai góc đối đỉnh (tạo bởi hai đường thẳng cắt nhau) luôn bằng nhau.')
);

/* TAM GIÁC BẰNG NHAU */
addH('l7tgb',
 ()=>{let a,b;do{a=R(30,70);b=R(30,70)}while(a+b>160);return I(`Tam giác ABC có góc A=${a}°, góc B=${b}°. Góc C (độ):`,180-a-b,'Tổng ba góc=180°.')},
 ()=>{const E=R(100,160);return I(`Tam giác cân tại A, góc ngoài tại B=${E}°. Góc A (độ):`,180-2*(180-E),`Góc B=180°−${E}°=${180-E}°=góc C; góc A=180°−2×${180-E}°.`)},
 ()=>{const[a,b,c]=P([[1,2,3],[1,1,2],[2,3,4],[1,2,2]]);return I(`Ba góc tam giác tỉ lệ với ${a}; ${b}; ${c}. Góc lớn nhất (độ):`,180/(a+b+c)*Math.max(a,b,c),`Mỗi phần=180°:${a+b+c}; góc lớn nhất ứng với phần lớn nhất.`)},
 ()=>{const p=R(2,6),q=R(2,6);return I(`ΔABC=ΔDEF, AB=(x+${p}) cm, DE=(2x−${q}) cm. Tìm x.`,p+q,`AB=DE: x+${p}=2x−${q} → x=${p+q}.`)}
);
add('l7tgb',
 ()=>{let a,b;do{a=R(30,80);b=R(30,80)}while(a+b>165);return N(`Tam giác ABC có góc A=${a}°, góc B=${b}°. Góc C (độ):`,180-a-b,'Tổng ba góc tam giác=180°.')},
 ()=>{const a=R(3,8);return N(`Tam giác cân tại A có AB=${a} cm, góc A=60°. Chu vi (cm):`,3*a,'Tam giác cân có một góc 60° là tam giác đều.')}
);

/* QUAN HỆ TRONG TAM GIÁC */
addH('l7qht',
 ()=>{const x=R(3,9),y=R(x+1,12);return I(`Có bao nhiêu số nguyên (cm) làm cạnh thứ ba của tam giác có hai cạnh ${x} cm và ${y} cm?`,2*x-1,`Cạnh thứ ba nằm giữa ${y-x} và ${x+y} (không lấy đầu): từ ${y-x+1} đến ${x+y-1}, có ${2*x-1} số.`)},
 ()=>{const g=R(2,8);return I(`G là trọng tâm tam giác ABC, M trung điểm BC, GM=${g} cm. Tính AM (cm):`,3*g,`GM=1/3 AM → AM=3×${g}=${3*g} cm.`)},
 ()=>{const a=R(2,4),b=R(2*a+1,2*a+5);return I(`Tam giác cân có hai cạnh bằng ${a} cm và ${b} cm. Tính chu vi (cm):`,2*b+a,`${a}+${a}≤${b} không lập được tam giác; hai cạnh bên phải bằng ${b}. Chu vi=2×${b}+${a}.`)}
);
add('l7qht',
 ()=>{const x=R(3,10),y=R(3,10);return N(`Tam giác có hai cạnh ${x} cm và ${y} cm. Cạnh thứ ba nhỏ nhất (nguyên, cm):`,Math.abs(x-y)+1,`Cạnh thứ ba > |${x}−${y}|=${Math.abs(x-y)}; số nguyên nhỏ nhất=${Math.abs(x-y)+1}.`)},
 ()=>Z('Bộ ba độ dài nào KHÔNG là ba cạnh của tam giác?','3 cm; 5 cm; 8 cm',['3 cm; 4 cm; 5 cm','5 cm; 6 cm; 7 cm','2 cm; 3 cm; 4 cm'],'Tổng hai cạnh phải lớn hơn cạnh còn lại: 3+5=8 (không lớn hơn).')
);

/* HÌNH HỘP & LĂNG TRỤ */
addH('l7hk',
 ()=>{const a=R(2,6);return I(`Hình lập phương có tổng độ dài các cạnh=${12*a} cm. Thể tích (cm³):`,a**3,`Có 12 cạnh, mỗi cạnh=${12*a}:12=${a} cm; V=${a}³.`)},
 ()=>{const a=R(3,8),b=R(3,8),c=R(3,8);return I(`Hình hộp chữ nhật có S_xq=${2*(a+b)*c} cm², đáy ${a}×${b} cm. Chiều cao (cm):`,c,`S_xq=2(a+b)·c → c=${2*(a+b)*c}:[2(${a}+${b})].`)},
 ()=>{const k=R(2,3);return I(`Tăng cạnh hình lập phương lên ${k} lần thì diện tích toàn phần tăng lên bao nhiêu lần?`,k*k,`S_tp=6a² nên tăng ${k}²=${k*k} lần.`)}
);
add('l7hk',
 ()=>{const a=R(2,8);return N(`Hình lập phương cạnh ${a} cm. Thể tích (cm³):`,a**3,'V=a³.')},
 ()=>{const n=R(3,5);return N(`Lăng trụ đứng đáy ${n} giác có bao nhiêu mặt bên?`,n,'Số mặt bên bằng số cạnh của đáy.')}
);

/* THỐNG KÊ */
addH('l7bd',
 ()=>{const L=Array.from({length:R(8,10)},()=>R(3,9));const s=L.reduce((a,b)=>a+b,0);return I(`Dãy số liệu: ${L.join('; ')}. Giá trị trung bình cộng (làm tròn đến hàng phần mười):`,Math.round(s/L.length*10)/10,`Trung bình=tổng:số số liệu=${s}:${L.length}.`)},
 ()=>{const L=Array.from({length:R(6,10)},()=>R(2,9));const mx=Math.max(...L);return I(`Dãy số liệu: ${L.join('; ')}. Giá trị lớn nhất là:`,mx,'So sánh các giá trị, tìm số lớn nhất.')}
);
add('l7bd',
 ()=>{const L=Array.from({length:R(6,9)},()=>R(3,8));const x=P(L),k=L.filter(v=>v==x).length;return N(`Dãy: ${L.join('; ')}. Tần số của giá trị ${x} là:`,k,'Đếm số lần xuất hiện.')}
);

/* XÁC SUẤT */
addH('l7xs',
 ()=>{const a=R(2,5),b=R(a+1,8);return I(`Hộp có ${a} bi đỏ, ${b} bi xanh. Cần thêm bao nhiêu bi đỏ để xác suất lấy bi đỏ=1/2?`,b-a,`Khi số bi đỏ=số bi xanh=${b}: cần thêm ${b}−${a}=${b-a} viên.`)},
 ()=>{const s=R(2,10);const c=6-Math.abs(s-7);return I(`Gieo hai con xúc xắc. Xác suất tổng số chấm=${s} (rút gọn a/b):`,fr(c,36),`Có ${c} cặp thuận lợi trong 36 kết quả: ${c}/36=${fq(c,36)}.`)},
 ()=>{const k=R(2,8);return I(`Xác suất trời mưa ngày mai=0,${k}. Xác suất trời không mưa (nhập số thập phân):`,((10-k)/10).toFixed(1),`Hai biến cố đối: 1−0,${k}=${((10-k)/10).toFixed(1).replace('.',',')}.`)}
);
add('l7xs',
 ()=>{const[t,s]=P([['chẵn',[2,4,6]],['lẻ',[1,3,5]],['lớn hơn 3',[4,5,6]]]);return Z(`Gieo một con xúc xắc. Xác suất xuất hiện mặt ${t} là:`,fq(s.length,6),['1/6','1/3','1/2','2/3','5/6'].filter(x=>x!=fq(s.length,6)),`Có ${s.length} kết quả thuận lợi trong 6.`)},
 ()=>Z('Biến cố nào là biến cố KHÔNG THỂ?','Gieo xúc xắc được mặt 7 chấm',['Tung đồng xu được mặt sấp','Ngày mai trời nắng','Rút thẻ số 3 từ hộp thẻ 1–10'],'Xúc xắc chỉ có 1–6 chấm nên mặt 7 chấm không bao giờ xảy ra.')
);
})();
