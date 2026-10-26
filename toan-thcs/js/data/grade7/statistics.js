/* LỚP 7 · PHẦN 3: Thống kê và Xác suất (Chương V, VIII) */
(()=>{const {fr,fq,add,addH,pie,lch}=G7H,
MO=['T1','T2','T3','T4','T5'],
/* 4 phần trăm là bội của 5, tổng 100, mỗi phần từ 10% đến 45% */
pc=()=>{let v;do{v=[R(2,9),R(2,9),R(2,9)].map(x=>x*5);v.push(100-v[0]-v[1]-v[2])}while(v[3]<10||v[3]>45);return v},
LB=['Giỏi','Khá','Đạt','Chưa đạt'],FR=['Táo','Cam','Chuối','Nho'],
sr=()=>{const v=[R(20,40)];for(let i=1;i<5;i++)v.push(v[i-1]+R(5,15));return v},
QL=['Môn học yêu thích','Màu sắc yêu thích','Quê quán','Loại trái cây yêu thích','Tên thú cưng'],QT=['Chiều cao của học sinh','Số anh chị em','Điểm kiểm tra','Cân nặng','Số bạn trong lớp'];

/* ===== Chương V: Thu thập và biểu diễn dữ liệu ===== */
add('l7bd',
()=>{const v=pc(),N0=P([40,60,80,100,120,200]),i=R(0,3);return F(N(`Biểu đồ hình quạt tròn cho kết quả xếp loại của ${N0} học sinh. Có bao nhiêu học sinh loại ${LB[i]}?`,N0*v[i]/100,`Bước 1: ${v[i]}% của ${N0} học sinh.\nBước 2: = ${N0} × ${v[i]} / 100 = ${N0*v[i]/100} học sinh.`),pie(v,LB))},
()=>{let v,m;do{v=pc();m=Math.max(...v)}while(v.filter(x=>x==m).length>1);const k=v.indexOf(m);return F(Z('Trên biểu đồ hình quạt tròn, loại nào chiếm tỉ lệ cao nhất?',FR[k],FR.filter((_,i)=>i!=k),`Bước 1: So sánh các phần trăm trên biểu đồ.\nBước 2: Phần lớn nhất là ${FR[k]} với ${m}%.`),pie(v,FR))},
()=>{const p=P([5,10,15,20,25,30,40,45,50]);return N(`Trên biểu đồ hình quạt tròn, một phần chiếm ${p}% thì góc ở tâm của hình quạt đó là`,p*3.6,`Bước 1: Cả hình tròn 360° ứng với 100%.\nBước 2: ${p}% ứng với ${p} × 3,6 = ${p*3.6}°.`,x=>x+'°')},
()=>{const v=sr(),m=v.indexOf(Math.max(...v));return F(Z('Biểu đồ đoạn thẳng cho số sản phẩm bán được mỗi tháng. Tháng nào bán được nhiều nhất?',MO[m],MO.filter((_,i)=>i!=m).slice(0,3),`Bước 1: Tìm điểm (cột) cao nhất trên biểu đồ.\nBước 2: Đó là ${MO[m]} với ${v[m]} sản phẩm.`),lch(v,MO))},
()=>{const v=sr(),i=R(0,2),j=R(i+1,4);return F(N(`Biểu đồ đoạn thẳng cho số sản phẩm bán được mỗi tháng. Từ ${MO[i]} đến ${MO[j]}, số sản phẩm bán được tăng thêm bao nhiêu?`,v[j]-v[i],`Bước 1: Lấy giá trị tháng sau trừ giá trị tháng trước.\nBước 2: ${v[j]} − ${v[i]} = ${v[j]-v[i]} sản phẩm.`),lch(v,MO))},
()=>{const v=[R(20,40)],d=R(1,4);for(let i=1;i<5;i++)v.push(i==d?v[i-1]-R(3,10):v[i-1]+R(5,15));return F(Z('Biểu đồ đoạn thẳng cho số sản phẩm bán được mỗi tháng. Tháng nào giảm so với tháng liền trước?',MO[d],MO.filter((_,i)=>i!=d).slice(0,3),`Bước 1: Quan sát biểu đồ đường, tìm đoạn đi xuống.\nBước 2: Đoạn đi xuống ở ${MO[d]}: từ ${v[d-1]} xuống ${v[d]}.`),lch(v,MO))},
()=>{const q=P([0,1]),a=P(q?QT:QL);return Z(`Dữ liệu nào sau đây là ${q?'số liệu (dữ liệu là số)':'dữ liệu không phải là số'}?`,a,sh(q?QL:QT).slice(0,3),q?`${a} cho ta các giá trị là số.`:`${a} cho ta các giá trị không phải là số (tên, nhóm, màu...).`)},
()=>{const L=Array.from({length:R(8,10)},()=>R(4,8)),x=P(L),k=L.filter(v=>v==x).length;return N(`Cho dãy số liệu: ${L.join('; ')}. Tần số của giá trị ${x} là`,k,`Bước 1: Đếm số lần giá trị ${x} xuất hiện trong bảng.\nBước 2: Tần số của ${x} là ${k}.`)}
);
addH('l7bd',
()=>{const v=pc(),N0=P([40,60,80,100,200]),i=R(0,1),j=R(2,3);return F(I(`Biểu đồ hình quạt tròn cho kết quả xếp loại của ${N0} học sinh. Số học sinh loại ${LB[i]} nhiều hơn loại ${LB[j]} bao nhiêu em? (nhập số; nếu ít hơn, nhập số âm)`,N0*(v[i]-v[j])/100,`${N0}·${v[i]}/100 − ${N0}·${v[j]}/100 = ${N0*v[i]/100} − ${N0*v[j]/100} = ${N0*(v[i]-v[j])/100}.`),pie(v,LB))},
()=>{const a=P([36,72,90,108,144,180]),n=P([20,40,60,80,100,120]);return I(`Trong biểu đồ hình quạt tròn biểu diễn ${n} học sinh, hình quạt chỉ học sinh đi xe buýt có góc ở tâm ${a}°. Có bao nhiêu học sinh đi xe buýt?`,a/360*n,`Bước 1: Góc ${a}° ứng với phần ${a}/360 của tổng.\nBước 2: Số học sinh = ${a}/360 × ${n} = ${a/360*n}.`)},
()=>{const v=sr();return F(I('Biểu đồ đoạn thẳng cho số sản phẩm bán được mỗi tháng. Tổng số sản phẩm bán được trong 5 tháng là bao nhiêu?',v.reduce((a,b)=>a+b,0),`Bước 1: Cộng tất cả các giá trị trong danh sách.\nBước 2: ${v.join(' + ')} = ${v.reduce((a,b)=>a+b,0)}.`),lch(v,MO))}
);

/* ===== Chương VIII: Biến cố và xác suất ===== */
const BC={
 'Chắc chắn':['Gieo một con xúc xắc, số chấm xuất hiện nhỏ hơn 7','Mặt trời mọc ở hướng Đông','Lấy một viên bi từ hộp chỉ có bi đỏ, được viên bi màu đỏ'],
 'Không thể':['Gieo một con xúc xắc được mặt 7 chấm','Lấy một viên bi xanh từ hộp chỉ có bi đỏ','Tung một đồng xu, được cả mặt sấp lẫn mặt ngửa'],
 'Ngẫu nhiên':['Tung một đồng xu được mặt sấp','Gieo một con xúc xắc được mặt 6 chấm','Ngày mai trời mưa']},
XX=[['chẵn',[2,4,6]],['lẻ',[1,3,5]],['chia hết cho 3',[3,6]],['lớn hơn 4',[5,6]],['nhỏ hơn 3',[1,2]],['là số nguyên tố',[2,3,5]],['bằng 6',[6]]],
FQ=['1/6','1/3','1/2','2/3','5/6'];
add('l7xs',
()=>{const k=P(Object.keys(BC)),a=P(BC[k]);return Z(`Biến cố nào sau đây là biến cố ${k.toLowerCase()}?`,a,Object.keys(BC).filter(x=>x!=k).flatMap(x=>BC[x]).sort(()=>Math.random()-.5).slice(0,3),k=='Chắc chắn'?'Biến cố chắc chắn luôn xảy ra.':k=='Không thể'?'Biến cố không thể không bao giờ xảy ra.':'Biến cố ngẫu nhiên có thể xảy ra, cũng có thể không.')},
()=>{const[t,s]=P(XX),a=fq(s.length,6);return Z(`Gieo một con xúc xắc cân đối. Xác suất xuất hiện mặt có số chấm ${t} là`,a,FQ.filter(x=>x!=a),`Có ${s.length} kết quả thuận lợi (${s.join('; ')}) trong 6 kết quả đồng khả năng: ${s.length}/6 = ${a}.`)},
()=>{const a=R(2,8),b=R(2,8),c=R(2,6),T0=a+b+c,i=R(0,2),n=[a,b,c][i],col=['đỏ','xanh','vàng'][i],g=n=>fq(n,T0);return Z(`Hộp có ${a} bi đỏ, ${b} bi xanh, ${c} bi vàng (cùng kích thước). Lấy ngẫu nhiên 1 bi. Xác suất lấy được bi ${col} là`,g(n),[g(T0-n),g(n+1),fq(n,T0+1),g([a,b,c][(i+1)%3])].filter(x=>x!=g(n)),`Bước 1: Số kết quả thuận lợi = ${n}, tổng số kết quả = ${T0}.\nBước 2: Xác suất = ${n}/${T0} = ${g(n)}.`)},
()=>{const[t,v]=P([['Tung hai đồng xu',4],['Tung ba đồng xu',8],['Gieo hai con xúc xắc',36],['Tung một đồng xu và gieo một con xúc xắc',12]]);return N(`${t} một lần. Có bao nhiêu kết quả có thể xảy ra?`,v,`Bước 1: Mỗi đồng xu có 2 kết quả, mỗi xúc xắc có 6 kết quả.\nBước 2: Tổng số kết quả = nhân các số đó lại = ${v}.`)},
()=>{const n=P([10,12,15,20]),k=P([2,3,5]),c=Math.floor(n/k),a=fq(c,n);return Z(`Hộp có ${n} thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên 1 thẻ. Xác suất rút được thẻ ghi số chia hết cho ${k} là`,a,[fq(c+1,n),fq(c,n+1),fq(n-c,n),fq(k,n)].filter(x=>x!=a),`Bước 1: Đếm các số chia hết cho ${k}: có ${c} số.\nBước 2: Xác suất = ${c}/${n} = ${a}.`)},
()=>{const n=P([20,40,50,100]),k=Math.round(n*P([.3,.35,.6,.65,.7])),a=fq(k,n);return Z(`Tung đồng xu ${n} lần, được mặt sấp ${k} lần. Xác suất thực nghiệm xuất hiện mặt sấp là`,a,[fq(n-k,n),'1/2',fq(k,n+10),fq(k+1,n)].filter(x=>x!=a),`Xác suất thực nghiệm = số lần xảy ra / tổng số lần thử = ${k}/${n}${fq(k,n)!=k+'/'+n?' = '+a:''}.`)},
()=>{const[t,a]=P([['biến cố không thể','0'],['biến cố chắc chắn','1']]);return Z(`Xác suất của ${t} bằng`,a,['0','1','1/2','100'].filter(x=>x!=a),`Biến cố không thể có xác suất 0; biến cố chắc chắn có xác suất 1.`)},
()=>{const a=P(['5/4','−1/2','2','3/2','−0,2']);return Z('Giá trị nào sau đây KHÔNG thể là xác suất của một biến cố?',a,sh(['0','1/3','3/5','1','0,25','7/10']).slice(0,3),'Xác suất luôn nằm trong khoảng từ 0 đến 1.')}
);
addH('l7xs',
()=>{const a=R(2,6),b=R(a+1,12);return I(`Hộp có ${a} bi đỏ và ${b} bi xanh. Cần bỏ thêm ít nhất bao nhiêu bi đỏ để xác suất lấy được bi đỏ bằng xác suất lấy được bi xanh?`,b-a,`Hai xác suất bằng nhau khi số bi đỏ bằng số bi xanh: ${b} − ${a} = ${b-a}.`)},
()=>{const k=R(1,9);return I(`Xác suất trời mưa vào ngày mai là 0,${k}. Xác suất trời không mưa là bao nhiêu? (nhập số thập phân)`,((10-k)/10).toFixed(1),`Xác suất của biến cố đối: 1 − 0,${k} = ${((10-k)/10).toFixed(1).replace('.',',')}.`)},
()=>{const s=R(2,12),c=6-Math.abs(s-7);return I(`Gieo hai con xúc xắc cân đối. Xác suất để tổng số chấm bằng ${s} là bao nhiêu? (nhập phân số tối giản a/b)`,fr(c,36),`Có ${c} cặp có tổng ${s} trong 36 kết quả: ${c}/36 = ${fq(c,36)}.`)},
()=>{const n=P([10,15,20,30]),c=[...Array(n)].map((_,i)=>i+1).filter(isP).length;return I(`Hộp có ${n} thẻ đánh số 1 đến ${n}. Xác suất rút được thẻ ghi số nguyên tố là bao nhiêu? (nhập phân số tối giản a/b)`,fr(c,n),`Có ${c} số nguyên tố từ 1 đến ${n}: xác suất ${c}/${n} = ${fq(c,n)}.`)}
);
})();
