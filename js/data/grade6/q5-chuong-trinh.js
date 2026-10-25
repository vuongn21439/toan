/* LỚP 6: Đổi tên cho khớp chương trình, bổ sung theo từng chủ đề CĐ1–CĐ9 */
/* Đổi tên cho khớp chương trình + bổ sung mẹo */
T.find(t=>t.id=='pct').n='Tỉ số & phần trăm';T.find(t=>t.id=='geo').n='Chu vi & diện tích';
T.find(t=>t.id=='pct').tip+=' Tỉ số của a và b là a : b, viết dạng phân số tối giản.';
T.find(t=>t.id=='dec').tip+=' Ước lượng: làm tròn từng số rồi mới tính.';

/* CĐ7: Tính đối xứng (tách riêng khỏi Hình học trực quan) */
T.push({id:'axis',n:'Tính đối xứng',e:'🦋',c:'#e84393',tip:'Trục đối xứng: gấp theo đường đó thì hai nửa trùng khít. Tâm đối xứng: quay nửa vòng (180°) quanh tâm thì hình trùng với chính nó. Đa giác đều n cạnh có n trục đối xứng.',g:[
()=>{const c=P(['A','H','M','T','U','V','W','Y','O','X','I']);return Q('Chữ cái in hoa nào có trục đối xứng?',c,xw(['F','G','J','L','N','P','R','S','Z','Q']),`Gấp đôi chữ ${c} theo một đường thích hợp thì hai nửa trùng khít.`)},
()=>{const c=P(['H','I','N','O','S','X','Z']);return Q('Chữ cái in hoa nào có tâm đối xứng?',c,xw(['A','B','C','D','E','K','M','P','R','T','U','V','W','Y']),`Xoay chữ ${c} nửa vòng quanh tâm thì chữ trùng khít với chính nó.`)},
()=>{const [n,c]=P([['tam giác cân (không đều)','1'],['ngũ giác đều','5'],['hình tròn','vô số'],['hình thang cân','1'],['hình vuông','4'],['hình chữ nhật (không vuông)','2']]);return Q(`${n[0].toUpperCase()+n.slice(1)} có bao nhiêu trục đối xứng?`,c,xw(['1','2','3','4','5','6','vô số'].filter(v=>v!=c)),'Hình tròn có vô số trục (mọi đường kính); đa giác đều n cạnh có n trục.')},
()=>Q('Vật nào sau đây có trục đối xứng?',P(['cánh bướm','bông tuyết','mặt đồng hồ tròn']),['tờ giấy bị vò nát','đám mây','vết mực loang'],'Vật có trục đối xứng khi gấp theo một đường thì hai nửa trùng khít.'),
()=>P([Q('Hình nào có tâm đối xứng nhưng KHÔNG có trục đối xứng?','hình bình hành (không phải chữ nhật, thoi)',['hình chữ nhật','hình thoi','hình tròn'],'Hình bình hành thường chỉ có tâm đối xứng là giao điểm hai đường chéo.'),Q('Hình nào có trục đối xứng nhưng KHÔNG có tâm đối xứng?','tam giác đều',['hình chữ nhật','hình vuông','hình tròn'],'Tam giác đều có 3 trục đối xứng nhưng quay nửa vòng thì không trùng với chính nó.')]),
()=>{const a=R(1,9)*P([1,-1]);return N(`Trên trục số, điểm A biểu diễn số ${iz(a)}. Điểm B đối xứng với A qua gốc O. B biểu diễn số:`,-a,'Hai điểm đối xứng qua O biểu diễn hai số đối nhau.',iz,1)},
()=>{const m=R(-5,5),a=m+R(1,6);return N(`Trên trục số, điểm A biểu diễn ${iz(a)}, điểm M biểu diễn ${iz(m)}. Điểm B đối xứng với A qua M biểu diễn số:`,2*m-a,`M là trung điểm AB nên B = 2 × M − A = 2 × ${pa(m)} − ${pa(a)}.`,iz,1)}],h:[
()=>{const n=R(5,12);return I(`Đa giác đều ${n} cạnh có bao nhiêu trục đối xứng?`,n,'Đa giác đều n cạnh có đúng n trục đối xứng.')},
()=>{const L=xw(['A','F','H','M','N','P','S','T','Z','X'],6);return I(`Trong các chữ cái in hoa ${L.join(', ')}, có bao nhiêu chữ có trục đối xứng?`,L.filter(x=>'AHMTX'.includes(x)).length,'Các chữ có trục đối xứng: A, H, M, T, X; còn F, N, P, S, Z thì không.')},
()=>{const k=R(2,9),t=R(2,9);return I(`Hình thoi có hai đường chéo (cũng là hai trục đối xứng) dài ${2*k} cm và ${2*t} cm, cắt nhau tại tâm O. Độ dài OA (A là đỉnh trên đường chéo ${2*k} cm) là (cm):`,k,'Tâm đối xứng O là trung điểm của mỗi đường chéo.')}]});

/* CĐ1: cách ghi số, tính chất phép tính, tập hợp con */
A('nat',
()=>{const n=R(1000,9999),p=R(0,3);return Z(`Chữ số hàng ${['đơn vị','chục','trăm','nghìn'][p]} của số ${n} là:`,''+(Math.floor(n/10**p)%10),xw([0,1,2,3,4,5,6,7,8,9],9).map(String),'Các hàng: đơn vị, chục, trăm, nghìn đếm từ phải sang trái.')},
()=>{const n=R(100,9999),b=R(0,1);return N(`Số tự nhiên liền ${b?'sau':'trước'} của ${n} là:`,b?n+1:n-1,'Liền trước kém 1 đơn vị, liền sau hơn 1 đơn vị.')},
()=>{const a=R(1,9),b=R(0,9),c=R(0,9),d=R(0,9);return Z(`Số gồm ${a} nghìn, ${b} trăm, ${c} chục, ${d} đơn vị là:`,''+(a*1000+b*100+c*10+d),[d*1000+c*100+b*10+a,a*100+b*10+c+d,a*1000+b*100+c*10+d+10,a*10000+b*100+c*10+d].map(String),'Viết lần lượt các chữ số theo hàng từ nghìn đến đơn vị.')},
()=>{const a=R(11,80),b=R(11,89);return N(`Tính nhanh: ${a} + ${b} + ${100-b}`,a+100,`Nhóm ${b} + ${100-b} = 100 rồi cộng ${a}.`)},
()=>{const x=R(2,15),a=R(2,9),b=R(1,20);return N(`Tìm x biết: ${a} × x + ${b} = ${a*x+b}`,x,`${a} × x = ${a*x+b} − ${b} = ${a*x}, nên x = ${x}.`)},
()=>{const a=R(2,9),b=R(2,9),d=R(2,6),k=R(1,Math.min(9,a*b));return N(`Tính: ${a} × ${b} − ${k*d} : ${d}`,a*b-k,`Nhân chia trước: ${k*d} : ${d} = ${k}, rồi trừ.`)});
A('set',
()=>{const B=xw([1,2,3,4,5,6,7,8,9],5).sort((x,y)=>x-y),x=B[4];return Q(`Cho A = {${B.slice(0,3).join('; ')}}, B = {${B.join('; ')}}. Khẳng định đúng là:`,'A ⊂ B',['B ⊂ A','A = B',`${x} ∈ A`],`Mọi phần tử của A đều thuộc B nên A ⊂ B; ${x} ∈ B nhưng ∉ A.`)},
()=>{const n=P([8,10,12,14]);return Q(`Liệt kê tập hợp các số tự nhiên chẵn nhỏ hơn ${n}:`,xl(0,n-2,2),[xl(2,n-2,2),xl(0,n,2),xl(1,n-1,2)],`Số chẵn bắt đầu từ 0, tăng dần 2 đơn vị và phải nhỏ hơn ${n}.`)},
()=>N('Tập hợp C = {x ∈ ℕ | x &lt; 0} có bao nhiêu phần tử?',0,'Không có số tự nhiên nào nhỏ hơn 0 nên C = ∅ (tập rỗng).'));

/* CĐ2: tính chất chia hết, dấu hiệu 9, hợp số, ước chung, ƯCLN/BCNN đặc biệt */
A('div',
()=>{const m=R(3,9),k=()=>m*R(2,9),n=()=>m*R(2,9)+1;return Z(`Không tính kết quả, tổng nào chia hết cho ${m}?`,`${k()} + ${k()}`,[`${k()} + ${n()}`,`${n()} + ${k()}`,`${n()} + ${n()}`],`Hai số hạng cùng chia hết cho ${m} thì tổng chia hết cho ${m}; có một số hạng không chia hết thì tổng không chia hết.`)},
()=>{const w=new Set();while(w.size<3)w.add(9*R(12,110)+R(1,8));return Q('Số nào chia hết cho 9?',''+9*R(12,110),[...w].map(String),'Một số chia hết cho 9 khi tổng các chữ số của nó chia hết cho 9.')},
()=>{const a=sh([21,27,33,39,49,51,57,63,77,91]),b=sh([11,13,17,19,23,29,31,37,41,43]);return Q('Số nào là hợp số?',''+a[0],b.slice(0,3).map(String),'Hợp số có nhiều hơn hai ước (ngoài 1 và chính nó còn có ước khác).')},
()=>{const c=10*R(5,99)+P([2,4,6,8]);return Q('Số nào chia hết cho 2 nhưng không chia hết cho 5?',''+c,[10*R(5,99),10*R(5,99)+5,10*R(5,99)+P([1,3,7,9])].map(String),'Chia hết cho 2: tận cùng chẵn; không chia hết cho 5: tận cùng khác 0 và 5.')},
()=>Q('Số nguyên tố chẵn duy nhất là:','2',['0','4','6'],'Mọi số chẵn lớn hơn 2 đều có ước 2 nên là hợp số.'));
A('ub',
()=>{const n=P([12,18,20,28,30,45,50,60,63,84]);return N(`Số ${n} có bao nhiêu ước nguyên tố?`,[2,3,5,7].filter(p=>n%p==0).length,'Phân tích ra thừa số nguyên tố rồi đếm các số nguyên tố khác nhau.')},
()=>{const m=R(3,9),L=R(30,60);return N(`Có bao nhiêu bội của ${m} nhỏ hơn ${L} (kể cả số 0)?`,Math.floor((L-1)/m)+1,`Các bội: 0; ${m}; ${2*m}; … không vượt quá ${L-1}.`)},
()=>{const g=P([2,3,4,5,6]),a=g*R(2,6),b=g*R(7,12);return Q(`Số nào là ước chung của ${a} và ${b}?`,''+g,xw([...Array(12).keys()].filter(i=>i>1&&(a%i||b%i))).map(String),`${g} chia hết cả ${a} và ${b}.`)});
A('gcd',
()=>{const b=R(3,12),a=b*R(2,9);return N(`ƯCLN(${a}; ${b}) = ? (${a} chia hết cho ${b})`,b,`${a} chia hết cho ${b} nên ƯCLN là số nhỏ hơn: ${b}.`)},
()=>{const b=R(3,12),a=b*R(2,9);return N(`BCNN(${a}; ${b}) = ? (${a} chia hết cho ${b})`,a,`${a} chia hết cho ${b} nên BCNN là số lớn hơn: ${a}.`)},
()=>{const g=R(2,9),[x,y]=cop(2,8);return N(`Cắt tấm bìa hình chữ nhật ${g*x} cm × ${g*y} cm thành các hình vuông bằng nhau, không thừa. Cạnh hình vuông lớn nhất là (cm):`,g,`Cạnh lớn nhất = ƯCLN(${g*x}; ${g*y}) = ${g}.`)});

/* CĐ3: số nguyên trong thực tiễn, ước/bội âm */
A('int',
()=>Q('Số nào KHÔNG phải là số nguyên?',P(['2,5','1/2','0,75','3/4']),xw([-7,0,12,-3,25,-18]).map(iz),'Số nguyên gồm các số tự nhiên và số đối của chúng; phân số, số thập phân không nguyên thì không phải.'),
()=>{const a=R(-15,15),b=R(0,1);return N(`Số nguyên liền ${b?'sau':'trước'} của ${iz(a)} là:`,b?a+1:a-1,'Liền sau lớn hơn 1 đơn vị, liền trước nhỏ hơn 1 đơn vị.',iz,1)},
()=>{const a=R(20,80),b=R(5,100);return N(`Tàu ngầm đang ở độ cao ${iz(-a)} m so với mực nước biển, rồi nổi lên ${b} m. Độ cao mới là (m):`,b-a,`${iz(-a)} + ${b} = ${iz(b-a)}.`,iz,1)},
()=>{const a=R(5,40),b=R(5,40);return N(`Tháng 1 cửa hàng lãi ${a} triệu, tháng 2 lỗ ${b} triệu (lỗ tính là số âm). Tổng kết hai tháng (triệu):`,a-b,`${a} + (${iz(-b)}) = ${iz(a-b)}.`,iz,1)},
()=>{const a=nz(),b=nz();return N(`Tính: |${iz(a)}| + |${iz(b)}|`,Math.abs(a)+Math.abs(b),'Giá trị tuyệt đối luôn không âm: cộng hai khoảng cách đến 0.',iz,1)},
()=>{const a=R(2,5),b=R(2,5),c=R(2,5);return N(`Tính: ${pa(-a)} × ${pa(-b)} × ${pa(-c)}`,-a*b*c,'Ba thừa số âm (số lẻ thừa số âm) nên tích âm.',iz,1)},
()=>{const n=P([12,18,20,24,30,36]);return Q(`Số nào là ước của ${iz(-n)}?`,iz(P([2,3,4,6].filter(d=>n%d==0))*P([1,-1])),xw([...Array(n).keys()].filter(i=>i>1&&n%i)).map(v=>iz(v*P([1,-1]))),'Ước của −n cũng là ước của n; lấy cả số dương lẫn số âm đối của chúng.')});

/* CĐ4: phân số bằng nhau, hai bài toán cơ bản, cộng khác mẫu, tối giản */
A('frac',
()=>{const [a,b]=cop(2,8),k=R(2,5);return Q('Cặp phân số nào bằng nhau?',`${a}/${b} = ${a*k}/${b*k}`,[`${a}/${b} = ${a*k}/${b*k+1}`,`${a}/${b} = ${a*k+1}/${b*k}`,`${a}/${b} = ${a+k}/${b+k}`],'Nhân (hoặc chia) cả tử và mẫu với cùng một số khác 0 thì được phân số bằng nó.')},
()=>{const b=R(2,6),a=R(1,b-1),k=R(2,9);return N(`${a}/${b} của một số là ${a*k}. Số đó là:`,b*k,`Số đó = ${a*k} : ${a}/${b} = ${a*k} × ${b}/${a} = ${b*k}.`)},
()=>{const b=R(2,6);let d;do d=R(2,6);while(d==b);const a=R(1,b-1),c=R(1,d-1);return Z(`Tính: ${a}/${b} + ${c}/${d}`,fs(a*d+c*b,b*d),[fs(a+c,b+d),fs(a+c,b*d),`${a*d+c*b}/${b+d}`],'Quy đồng mẫu số rồi cộng các tử (không cộng các mẫu), kết quả rút gọn.')},
()=>{const b=R(4,9);return Q('Phân số nào lớn hơn 1?',`${b+R(1,4)}/${b}`,xw([1,2,3,4,5,6,7,8].filter(i=>i<b)).map(n=>`${n}/${b}`),'Phân số lớn hơn 1 khi tử lớn hơn mẫu.')},
()=>{const [x,y]=cop(2,9),g=R(2,4);return Z('Phân số nào chưa là phân số tối giản?',`${g*x}/${g*y}`,[0,0,0].map(()=>{const [p,q]=cop(2,9);return `${p}/${q}`}),'Phân số tối giản khi tử và mẫu chỉ có ước chung là 1; còn lại thì rút gọn được.')},
()=>{const b=R(2,6),a=R(1,5),k=b*R(2,5);return N(`Tính: ${k} × ${a}/${b}`,k/b*a,`${k} : ${b} × ${a} = ${k/b*a}.`)});
HA('frac',
()=>{const [a,b]=cop(2,7),[c,d]=cop(2,7);return I(`Tìm x biết: x − ${a}/${b} = ${c}/${d}`,fs(a*d+c*b,b*d),'x = số trừ + hiệu: quy đồng rồi cộng, kết quả rút gọn.')},
()=>{let a,b,c,d;do{b=R(3,8);d=R(2,8);a=R(1,b-1);c=R(1,d-1)}while(a*d<=c*b||b==d);return I(`Bể có ${a}/${b} bể nước, dùng đi ${c}/${d} bể. Còn lại mấy phần bể (rút gọn)?`,fs(a*d-c*b,b*d),`${a}/${b} − ${c}/${d}: quy đồng rồi trừ các tử.`)});

/* CĐ5: ước lượng, đổi đơn vị, phân số ↔ thập phân, tỉ số, % */
A('dec',
()=>{const a=R(11,99),b=R(11,99);return N(`Ước lượng ${dc(a)} + ${dc(b)} bằng cách làm tròn mỗi số đến hàng đơn vị rồi cộng:`,Math.floor((a+5)/10)+Math.floor((b+5)/10),'Làm tròn từng số đến hàng đơn vị (nhìn chữ số phần mười) rồi cộng.')},
()=>{const a=R(21,98),b=R(21,98);return N(`Ước lượng ${dc(a)} × ${dc(b)} bằng cách làm tròn mỗi số đến hàng đơn vị rồi nhân:`,Math.floor((a+5)/10)*Math.floor((b+5)/10),'Làm tròn từng số đến hàng đơn vị rồi nhân hai số tròn đó.')},
()=>{const v=P([25,35,45,55,65,75,12,16,24,36]);return Z(`Viết ${dd(v)} dưới dạng phân số tối giản:`,fs(v,100),[`${v}/10`,`${v}/1000`,fs(100,v)],`${dd(v)} = ${v}/100, rồi rút gọn bằng ƯCLN.`)},
()=>{const x=R(11,99);return N(`Đổi ${dc(x)} m ra cm:`,x*10,'1 m = 100 cm: dời dấu phẩy sang phải 2 chữ số.')},
()=>{const n=R(101,999);return Z(`${dd(n)} : 10 = ?`,ft(n/1000),[ft(n/100),ft(n/10),ft(n/10000)],'Chia cho 10: dời dấu phẩy sang trái 1 chữ số.')},
()=>{const n=R(1001,9999),f=Math.floor(n/10)*10;return Z(`Làm tròn ${n} đến hàng chục:`,''+(Math.floor((n+5)/10)*10),[f,f+10,f-10,Math.floor(n/100)*100,Math.floor(n/100)*100+100].map(String),'Nhìn chữ số hàng đơn vị: từ 5 trở lên thì tăng chữ số hàng chục thêm 1.')});
A('pct',
()=>{const [x,y]=cop(2,9),g=R(2,6);return Z(`Tỉ số của ${g*x} và ${g*y} (viết dạng phân số tối giản) là:`,fs(x,y),[fs(y,x),fs(g*x,y),fs(x,g*y)],`${g*x} : ${g*y} = ${x}/${y} sau khi chia cả hai số cho ${g}.`)},
()=>{const [a,b]=P([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,10],[3,10],[7,20]]);return N(`Viết ${a}/${b} dưới dạng tỉ số phần trăm:`,a*100/b,`${a}/${b} = ${a*100/b}/100 = ${a*100/b}%.`,v=>v+'%')},
()=>{const m=P([6,12,15,30,36,45]);return N(`Tỉ số phần trăm của ${m} phút và 1 giờ là:`,m*100/60,`Đổi 1 giờ = 60 phút rồi tính ${m} : 60 × 100%.`,v=>v+'%')});
HA('pct',()=>{const a=P([40,80,200,400]),r=P([10,20,25,50]);return I(`Cửa hàng mua hàng giá ${a} nghìn đồng, bán ${a*(100+r)/100} nghìn đồng. Tiền lãi bằng bao nhiêu % giá mua?`,r,`Lãi = ${a*r/100} nghìn; ${a*r/100} : ${a} × 100% = ${r}%.`)});

/* CĐ6: nhận biết hình, tính chất đường chéo, chu vi/diện tích thực tiễn */
A('sym',
()=>{const [q,a]=P([['Tứ giác có 4 cạnh bằng nhau và 4 góc vuông là hình gì?','hình vuông'],['Tứ giác có 4 góc vuông, hai cạnh kề không bằng nhau là hình gì?','hình chữ nhật'],['Tứ giác có 4 cạnh bằng nhau, các góc không vuông là hình gì?','hình thoi'],['Tứ giác có hai cặp cạnh đối song song và bằng nhau, không có góc vuông, các cạnh không bằng nhau là hình gì?','hình bình hành'],['Tứ giác có hai cạnh đáy song song, hai cạnh bên bằng nhau (không phải hình bình hành) là hình gì?','hình thang cân']]);return Q(q,a,xw(['hình vuông','hình chữ nhật','hình thoi','hình bình hành','hình thang cân'].filter(v=>v!=a)),'Dựa vào cạnh, góc và đường chéo để nhận biết hình.')},
()=>{const [n,a,w]=P([['hình chữ nhật','bằng nhau và cắt nhau tại trung điểm mỗi đường',['vuông góc với nhau','song song với nhau','không bằng nhau']],['hình thoi','vuông góc và cắt nhau tại trung điểm mỗi đường',['bằng nhau và song song','bằng nhau và không cắt nhau','song song với nhau']],['hình bình hành','cắt nhau tại trung điểm mỗi đường',['luôn bằng nhau','luôn vuông góc','song song với nhau']]]);return Q(`Hai đường chéo của ${n} có tính chất nào?`,a,w,`Đây là tính chất hai đường chéo của ${n}.`)},
()=>{const a=R(2,15);return N(`Hình thoi có cạnh ${a} cm. Chu vi là (cm):`,4*a,'Hình thoi có 4 cạnh bằng nhau.')},
()=>Q('Nối tâm với các đỉnh của lục giác đều thì chia nó thành mấy tam giác đều bằng nhau?','6',['3','4','8'],'Lục giác đều có 6 cạnh nên chia thành 6 tam giác đều bằng nhau.'),
()=>{const a=R(3,8),b=R(2,6);return N(`Nền nhà hình chữ nhật dài ${a} m, rộng ${b} m, lát bằng gạch hình vuông cạnh 50 cm, không cắt gạch. Cần bao nhiêu viên?`,4*a*b,`Mỗi mét lát được 2 viên: (${a} × 2) × (${b} × 2).`)});
A('geo',
()=>{const a=R(5,30),k=R(2,9);return N(`Rào quanh mảnh vườn hình vuông cạnh ${a} m, mỗi mét hàng rào tốn ${k} nghìn đồng. Tổng chi phí là (nghìn đồng):`,4*a*k,`Chu vi = ${a} × 4 = ${4*a} m; nhân với ${k}.`)},
()=>{const a=R(3,15);return N(`Hình vuông có chu vi ${4*a} cm. Diện tích là (cm²):`,a*a,`Cạnh = ${4*a} : 4 = ${a} cm; S = ${a} × ${a}.`)});

/* CĐ8: điểm, đoạn thẳng, góc */
A('line',
()=>{const a=R(2,9),b=R(2,9);return Q(`Ba điểm A, B, C thẳng hàng, AB = ${a} cm, BC = ${b} cm, AC = ${a+b} cm. Điểm nằm giữa hai điểm còn lại là:`,'B',['A','C','không có điểm nào'],'Vì AB + BC = AC nên B nằm giữa A và C.')},
()=>Q('Điểm M là trung điểm của đoạn AB khi:','M nằm giữa A, B và MA = MB',['chỉ cần MA = MB','chỉ cần M nằm giữa A và B','AM + MB = AB'],'Trung điểm vừa nằm giữa hai đầu mút, vừa cách đều hai đầu mút.'),
()=>{const n=R(3,9);return N(`Trên đường thẳng xy lấy ${n} điểm phân biệt. Có bao nhiêu đoạn thẳng có hai đầu mút là hai trong các điểm đó?`,n*(n-1)/2,`${n} × ${n-1} : 2.`)},
()=>{const x=R(2,9);return N(`M là trung điểm của AB, MB = ${x} cm. Độ dài AB là (cm):`,2*x,'AB = 2 × MB.')},
()=>{const x=P([30,45,60,90,110,135,150]),t=x<90?'góc nhọn':x==90?'góc vuông':'góc tù';return F(Q('Quan sát hình, góc đã cho là góc gì?',t,['góc nhọn','góc vuông','góc tù','góc bẹt'].filter(s=>s!=t),'Nhọn < 90°; vuông = 90°; tù từ 90° đến 180°; bẹt = 180°.'),an(x))});
HA('line',
()=>{const t=R(15,40);return I(`Cho góc xOy = ${3*t}°. Tia Oz nằm giữa Ox và Oy sao cho xOz = 2 × zOy. Số đo góc zOy là (độ):`,t,`Góc xOy gồm 3 phần bằng nhau, mỗi phần ${t}°.`,an(3*t))},
()=>{const a=2*R(2,8),b=a+2*R(1,6);return I(`Trên tia Ox lấy OA = ${a} cm, OB = ${b} cm. M là trung điểm của AB. Độ dài OM là (cm):`,(a+b)/2,'OM = OA + AM = OA + AB : 2.')});

/* CĐ9: kiểm đếm, phân loại dữ liệu, biểu đồ, xác suất thực nghiệm */
A('stat',
()=>{const n=R(6,24);return N(`Bảng kiểm đếm số bạn thích màu xanh (mỗi nhóm ||||| là 5 bạn): ${tly(n)}. Số bạn thích màu xanh là:`,n,'Mỗi nhóm 5 gạch ứng với 5; cộng thêm các gạch lẻ.')},
()=>Q('Dữ liệu nào sau đây là số liệu (dữ liệu là số)?',P(['số học sinh mỗi lớp','chiều cao của các bạn (cm)','số điểm 10 của mỗi tổ']),['màu sắc yêu thích','tên các món ăn','môn học yêu thích'],'Số liệu là dữ liệu ghi bằng số; màu sắc, tên, môn học không phải số.'),
()=>Q('Bài kiểm tra chấm theo thang điểm 10 (điểm nguyên). Điểm nào KHÔNG hợp lí?',P(['11','−2','12,5']),['0','7','10'],'Điểm hợp lí phải là số nguyên từ 0 đến 10.'),
()=>{const k=P([2,5,10]),n=R(4,8),m=R(1,n-1);return N(`Biểu đồ tranh: mỗi ⭐ ứng với ${k} bạn. Tổ 1: ${'⭐'.repeat(n)}. Tổ 2: ${'⭐'.repeat(m)}. Tổ 1 nhiều hơn tổ 2 bao nhiêu bạn?`,(n-m)*k,`Hơn ${n-m} biểu tượng, mỗi biểu tượng ${k} bạn.`)},
()=>{const [l,v]=cv(),i=R(0,3),j=(i+R(1,3))%4;return F(N(`Biểu đồ cột cho số học sinh giỏi mỗi lớp. Lớp ${l[i]} và lớp ${l[j]} chênh nhau bao nhiêu học sinh?`,Math.abs(v[i]-v[j]),'Đọc hai cột rồi lấy số lớn trừ số nhỏ.'),bc(v,l))},
()=>{const [l,v]=cv(),m=Math.min(...v);return F(Q('Biểu đồ cột cho số học sinh giỏi mỗi lớp. Lớp nào ít nhất?',l[v.indexOf(m)],l.filter((_,i)=>v[i]!=m),'Cột thấp nhất ứng với giá trị nhỏ nhất.'),bc(v,l))},
()=>{const n=P([20,30,40,50]),s=R(3,n/2-1);return Z(`Gieo xúc xắc ${n} lần, mặt 6 chấm xuất hiện ${s} lần. Xác suất thực nghiệm KHÔNG xuất hiện mặt 6 chấm là:`,`${n-s}/${n}`,[`${s}/${n}`,`${n-s}/${s}`,`${s}/6`,`${n-s}/6`],`Số lần không ra mặt 6 là ${n} − ${s} = ${n-s}; chia cho tổng số lần ${n}.`)},
()=>{const n=R(5,20);return N(`Hộp có ${n} thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên một thẻ. Có bao nhiêu kết quả có thể xảy ra?`,n,'Mỗi thẻ là một kết quả có thể xảy ra.')});
HA('stat',()=>{const t=P([20,25,50]),d=R(1,t/5),a=R(1,Math.floor((t-d)/2)),b=R(1,Math.floor((t-d-a)/2)),c=t-d-a-b;return I(`Điểm kiểm tra của lớp ${t} bạn: điểm 7 có ${a} bạn, điểm 8 có ${b} bạn, điểm 9 có ${c} bạn, điểm 10 có ${d} bạn. Tỉ số phần trăm số bạn đạt điểm 10 so với cả lớp là:`,d*100/t,`${d} : ${t} × 100% = ${d*100/t}%.`)});
