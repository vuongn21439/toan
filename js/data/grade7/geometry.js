/* LỚP 7 · PHẦN 2: Hình học và Đo lường (Chương III, IV, IX, X) */
(()=>{const {fr,fq,fh,add,addH,ps}=G7H,
dg=v=>v+'°',cm=v=>v+' cm',
TR={'ba đường trung tuyến':'Trọng tâm','ba đường cao':'Trực tâm','ba đường phân giác':'Điểm cách đều ba cạnh','ba đường trung trực':'Điểm cách đều ba đỉnh'};

/* ===== Chương III: Góc và đường thẳng song song ===== */
const GT=['Hai góc đối đỉnh thì bằng nhau','Hai góc kề bù có tổng bằng 180°','Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau','Một đường thẳng vuông góc với một trong hai đường thẳng song song thì cũng vuông góc với đường thẳng kia','Nếu hai đường thẳng bị cắt bởi một cát tuyến có cặp góc so le trong bằng nhau thì hai đường thẳng đó song song'],
GF=['Hai góc bằng nhau thì đối đỉnh','Hai góc kề bù thì bằng nhau','Hai đường thẳng cùng vuông góc với đường thẳng thứ ba thì cắt nhau','Qua một điểm ngoài đường thẳng có hai đường thẳng song song với đường thẳng đó','Hai góc so le trong luôn bằng nhau','Hai góc trong cùng phía luôn bằng nhau'],
KG=[['so le trong',0],['đồng vị',0],['trong cùng phía',1]];
add('l7gdt',
()=>{const a=P([30,40,50,60,65,70,110,120,130,145]);return N(`Hai góc kề bù, một góc bằng ${a}°. Số đo góc còn lại là`,180-a,`Hai góc kề bù có tổng 180°: 180° − ${a}° = ${180-a}°.`,dg)},
()=>{const a=P([30,40,50,60,70,110,120,130]);return Z(`Hai đường thẳng xy và zt cắt nhau tại O, góc xOz = ${a}°. Góc đối đỉnh với nó và góc kề bù với nó lần lượt là`,`${a}° và ${180-a}°`,[`${180-a}° và ${a}°`,`${a}° và ${a}°`,`${180-a}° và ${180-a}°`],`Góc đối đỉnh bằng ${a}°; góc kề bù là 180° − ${a}° = ${180-a}°.`)},
()=>{const h=R(15,80);return N(`Tia Ot là phân giác của góc xOy = ${2*h}°. Số đo góc xOt là`,h,`Tia phân giác chia góc thành hai phần bằng nhau: ${2*h}° : 2 = ${h}°.`,dg)},
()=>{const[k,bu]=P(KG),v=P([40,50,60,70,80,100,110,120,130,140]),a=bu?180-v:v;return Z(`Cho a // b, đường thẳng c cắt a, b. Hai góc ${k} có một góc bằng ${v}°, góc còn lại bằng`,a+'°',[(bu?v:180-v)+'°',(a+10)+'°',(a-10)+'°',(a==90?100:90)+'°'],bu?'Hai góc trong cùng phía bù nhau (tổng 180°).':`Hai góc ${k} bằng nhau khi hai đường thẳng song song.`)},
()=>{const a=P(GT);return Z('Khẳng định nào sau đây đúng?',a,sh(GF).slice(0,3),'Đây là tính chất/định lí đã học; các lựa chọn còn lại sai (thiếu điều kiện hoặc sai tính chất).')}
);
addH('l7gdt',
()=>{let x,a,b,p,q,A;do{x=R(10,30);a=R(1,2);b=R(1,3);p=R(-20,20);A=a*x+p;q=180-A-b*x}while(A<20||A>160||Math.abs(q)>120);return I(`Hai góc kề bù có số đo (${ps([p,a])})° và (${ps([q,b])})°. Tìm x.`,x,`Tổng hai góc bằng 180°: ${a+b}x + ${iz(p+q)} = 180, suy ra x = ${x}.`)},
()=>{const x=R(10,40),p=R(1,20),q=p-x;return I(`Tia Ot là phân giác của góc xOy, biết xOt = (${ps([p,2])})° và tOy = (${ps([q,3])})°. Tìm x.`,x,`Hai góc bằng nhau: 2x + ${p} = 3x ${q<0?'− '+(-q):'+ '+q}, suy ra x = ${x}.`)},
()=>{const a=P([2,3,4]),b=a+R(1,2),x=R(10,35),p=R(5,30),q=p-(b-a)*x;return I(`Cho a // b, một cát tuyến cắt a, b tạo hai góc so le trong có số đo (${ps([p,a])})° và (${ps([q,b])})°. Tìm x.`,x,`Hai góc so le trong bằng nhau: ${a}x + ${p} = ${b}x ${q<0?'− '+(-q):'+ '+q}, suy ra x = ${x}.`)},
()=>{const n=R(3,6);return I(`Có ${n} đường thẳng phân biệt cùng đi qua một điểm O. Có bao nhiêu cặp góc đối đỉnh (không kể góc bẹt)?`,n*(n-1),`Mỗi cặp đường thẳng tạo 2 cặp góc đối đỉnh; có ${n*(n-1)/2} cặp đường thẳng, nên ${n*(n-1)/2}·2 = ${n*(n-1)} cặp.`)}
);

/* ===== Chương IV: Tam giác bằng nhau ===== */
const CS=[['AB = DE, BC = EF, CA = FD','c.c.c'],['AB = DE, góc B = góc E, BC = EF','c.g.c'],['góc B = góc E, BC = EF, góc C = góc F','g.c.g'],['hai tam giác vuông tại A và D, BC = EF, góc B = góc E','Cạnh huyền – góc nhọn'],['hai tam giác vuông tại A và D, AB = DE, AC = DF','Hai cạnh góc vuông'],['hai tam giác vuông tại A và D, BC = EF, AB = DE','Cạnh huyền – cạnh góc vuông']];
add('l7tgb',
()=>{let a,b;do{a=R(30,80);b=R(30,80)}while(a+b>165);return N(`Tam giác ABC có góc A = ${a}°, góc B = ${b}°. Số đo góc C là`,180-a-b,`Tổng ba góc bằng 180°: 180° − ${a}° − ${b}° = ${180-a-b}°.`,dg)},
()=>{let a,b;do{a=R(30,80);b=R(30,80)}while(a+b>165);return N(`Tam giác ABC có góc A = ${a}°, góc B = ${b}°. Góc ngoài tại đỉnh C có số đo là`,a+b,`Góc ngoài bằng tổng hai góc trong không kề với nó: ${a}° + ${b}° = ${a+b}°.`,dg)},
()=>P([0,1])?(()=>{const a=2*R(10,70);return N(`Tam giác ABC cân tại A có góc A = ${a}°. Số đo góc B là`,(180-a)/2,`Hai góc ở đáy bằng nhau: (180° − ${a}°) : 2 = ${(180-a)/2}°.`,dg)})():(()=>{const b=R(25,80);return N(`Tam giác ABC cân tại A có góc B = ${b}°. Số đo góc A là`,180-2*b,`Góc C = góc B = ${b}°, nên góc A = 180° − 2·${b}° = ${180-2*b}°.`,dg)})(),
()=>{const x=R(3,9),y=R(3,9),z=R(3,9);return P([0,1])?N(`ΔABC = ΔDEF, AB = ${x} cm, BC = ${y} cm, CA = ${z} cm. Chu vi tam giác DEF là`,x+y+z,`Hai tam giác bằng nhau thì có các cạnh tương ứng bằng nhau, chu vi cũng bằng nhau: ${x+y+z} cm.`,cm):(()=>{const a=R(30,80),b=R(30,80);return N(`ΔABC = ΔDEF, góc A = ${a}°, góc B = ${b}°. Số đo góc F là`,180-a-b,`Góc F tương ứng với góc C = 180° − ${a}° − ${b}° = ${180-a-b}°.`,dg)})()},
()=>{const[s,a]=P(CS);return Z(`Hai tam giác ABC và DEF có: ${s}. Chúng bằng nhau theo trường hợp nào?`,a,sh(CS.map(x=>x[1]).filter(x=>x!=a)).slice(0,3),`Dấu hiệu đã cho khớp với trường hợp ${a}.`)},
()=>{const l=R(3,9),m=R(2,2*l-1);return N(`Tam giác ABC cân tại A có AB = ${l} cm, BC = ${m} cm. Chu vi tam giác ABC là`,2*l+m,`AC = AB = ${l} cm nên chu vi = ${l} + ${l} + ${m} = ${2*l+m} cm.`,cm)}
);
addH('l7tgb',
()=>{const S=P([[2,1,3],[3,2,1],[1,2,3],[2,2,2]]),s=S[0]+S[1]+S[2],x=R(Math.ceil(120/s),Math.floor(240/s)),t=180-s*x,p=R(-15,15),q=R(-15,15),r=t-p-q,ts=[ps([p,S[0]]),ps([q,S[1]]),ps([r,S[2]])];return I(`Tam giác ABC có góc A = (${ts[0]})°, góc B = (${ts[1]})°, góc C = (${ts[2]})°. Tìm x.`,x,`Tổng ba góc bằng 180°: ${s}x + ${iz(t)} = 180, suy ra x = ${x}.`)},
()=>{const E=R(95,160);return I(`Tam giác ABC cân tại A có góc ngoài tại đỉnh B bằng ${E}°. Tính số đo góc A (độ).`,180-2*(180-E),`Góc B = 180° − ${E}° = ${180-E}° = góc C, nên góc A = 180° − 2·${180-E}° = ${180-2*(180-E)}°.`)},
()=>{const[a,b,c]=P([[1,2,3],[2,3,4],[3,4,5],[1,1,2],[2,3,5],[1,4,7]]);return I(`Tam giác ABC có ba góc tỉ lệ với ${a}; ${b}; ${c}. Tính số đo góc lớn nhất (độ).`,180/(a+b+c)*c,`Mỗi phần ứng với 180° : ${a+b+c} = ${180/(a+b+c)}°, góc lớn nhất = ${c}·${180/(a+b+c)}° = ${180/(a+b+c)*c}°.`)},
()=>{const p=R(2,9),q=R(2,9);return I(`ΔABC = ΔDEF, AB = (x + ${p}) cm, DE = (2x − ${q}) cm. Tìm x.`,p+q,`AB = DE nên x + ${p} = 2x − ${q}, suy ra x = ${p+q}.`)}
);

/* ===== Chương IX: Quan hệ trong tam giác, các đường đồng quy ===== */
add('l7qht',
()=>{const x=R(3,12),y=R(3,12),z=R(Math.abs(x-y)+1,x+y-1),bad=[[x,y,x+y],[x,y,x+y+R(1,3)],[x,y,x==y?x+y+4:Math.abs(x-y)]].map(t=>t.sort((a,b)=>a-b).join('; ')),good=[x,y,z].sort((a,b)=>a-b).join('; ');return Z('Bộ ba độ dài (cm) nào là ba cạnh của một tam giác?',good,bad,`Tổng hai cạnh bất kỳ phải lớn hơn cạnh còn lại: ${good} thỏa mãn; các bộ khác có tổng hai cạnh nhỏ hơn hoặc bằng cạnh lớn nhất.`)},
()=>{const x=R(3,12),y=R(3,12),big=P([0,1]);return N(`Tam giác có hai cạnh ${x} cm và ${y} cm. Độ dài cạnh thứ ba (số nguyên cm) ${big?'lớn nhất':'nhỏ nhất'} có thể là`,big?x+y-1:Math.abs(x-y)+1,`Cạnh thứ ba nằm giữa ${Math.abs(x-y)} và ${x+y}: ${big?'số nguyên lớn nhất là '+(x+y-1):'số nguyên nhỏ nhất là '+(Math.abs(x-y)+1)}.`,cm)},
()=>{let A,B,C;do{A=R(35,100);B=R(30,100);C=180-A-B}while(C<20||new Set([A,B,C]).size<3);const s={A:'BC',B:'AC',C:'AB'},v={A,B,C},big=P([0,1]),ks=Object.keys(v).sort((m,n)=>v[m]-v[n]),k=big?ks[2]:ks[0];return Z(`Tam giác ABC có góc A = ${A}°, góc B = ${B}°, góc C = ${C}°. Cạnh ${big?'lớn nhất':'nhỏ nhất'} là`,s[k],[...Object.values(s).filter(x=>x!=s[k]),'Ba cạnh bằng nhau'],`Trong một tam giác, ${big?'góc lớn nhất đối diện cạnh lớn nhất':'góc nhỏ nhất đối diện cạnh nhỏ nhất'}: góc ${k} đối diện cạnh ${s[k]}.`)},
()=>{const m=R(2,10)*3;return P([0,1])?N(`G là trọng tâm tam giác ABC, trung tuyến AM = ${m} cm. Độ dài AG là`,2*m/3,`AG = 2/3 AM = 2/3 · ${m} = ${2*m/3} cm.`,cm):N(`G là trọng tâm tam giác ABC, trung tuyến AM; GM = ${m/3} cm. Độ dài AM là`,m,`GM = 1/3 AM nên AM = 3 · ${m/3} = ${m} cm.`,cm)},
()=>{const[k,v]=P(Object.entries(TR));return Z(`Giao điểm của ${k} trong một tam giác là`,v,Object.values(TR).filter(x=>x!=v),`Giao điểm của ${k} là: ${v.toLowerCase()}.`)}
);
addH('l7qht',
()=>{const g=R(2,9);return I(`G là trọng tâm tam giác ABC, M là trung điểm BC, GM = ${g} cm. Tính AM (cm).`,3*g,`GM = 1/3 AM nên AM = 3·${g} = ${3*g} cm.`)},
()=>{const a=R(2,5),b=R(2*a,2*a+8);return I(`Tam giác cân có hai cạnh bằng ${a} cm và ${b} cm. Tính chu vi (cm).`,2*b+a,`Cạnh ${a} + ${a} ≤ ${b} nên không lập được tam giác; hai cạnh bên phải bằng ${b}. Chu vi = ${b} + ${b} + ${a} = ${2*b+a} cm.`)},
()=>{const x=R(2,9),y=R(x+1,12);return I(`Có bao nhiêu số nguyên (cm) làm độ dài cạnh thứ ba của tam giác có hai cạnh ${x} cm và ${y} cm?`,2*x-1,`Cạnh thứ ba nằm giữa ${y-x} và ${x+y} (không lấy hai đầu): từ ${y-x+1} đến ${x+y-1}, có ${2*x-1} số.`)},
()=>{const d=2*R(3,8),h=R(3,12);return I(`Tam giác ABC cân tại A, đáy BC = ${d} cm, trung tuyến AM = ${h} cm. Tính diện tích tam giác ABC (cm²).`,d*h/2,`Trong tam giác cân, trung tuyến ứng với đáy cũng là đường cao: S = 1/2 · ${d} · ${h} = ${d*h/2} cm².`)}
);

/* ===== Chương X: Hình hộp chữ nhật, lăng trụ đứng ===== */
const c3=v=>v+' cm³',c2=v=>v+' cm²',TB=[[3,4,5],[5,12,13],[6,8,10],[4,5,7],[5,6,7],[7,8,9]];
add('l7hk',
()=>{const a=R(2,9),b=R(2,9),c=R(2,9);return N(`Hình hộp chữ nhật có ba kích thước ${a} cm, ${b} cm, ${c} cm. Thể tích là`,a*b*c,`V = a·b·c = ${a}·${b}·${c} = ${a*b*c} cm³.`,c3)},
()=>{const a=R(2,9),b=R(2,9),c=R(2,9);return N(`Hình hộp chữ nhật có đáy ${a} cm × ${b} cm, chiều cao ${c} cm. Diện tích xung quanh là`,2*(a+b)*c,`S xq = 2(a + b)·c = 2·${a+b}·${c} = ${2*(a+b)*c} cm².`,c2)},
()=>{const a=R(2,8),b=R(2,8),c=R(2,8);return N(`Hình hộp chữ nhật có ba kích thước ${a} cm, ${b} cm, ${c} cm. Diện tích toàn phần là`,2*(a+b)*c+2*a*b,`S tp = 2(a + b)·c + 2ab = ${2*(a+b)*c} + ${2*a*b} = ${2*(a+b)*c+2*a*b} cm².`,c2)},
()=>{const a=R(2,9);return P([0,1])?N(`Hình lập phương cạnh ${a} cm có thể tích là`,a**3,`V = a³ = ${a}³ = ${a**3} cm³.`,c3):N(`Hình lập phương cạnh ${a} cm có diện tích toàn phần là`,6*a*a,`Có 6 mặt hình vuông: 6·${a}² = ${6*a*a} cm².`,c2)},
()=>{const[k,v]=P([['mặt',6],['đỉnh',8],['cạnh',12]]);return Z(`Hình hộp chữ nhật có bao nhiêu ${k}?`,''+v,['6','8','12','4','10'].filter(x=>x!=v).slice(0,3),'Hình hộp chữ nhật có 6 mặt, 8 đỉnh, 12 cạnh.')},
()=>{const n=R(3,6),[k,v]=P([['mặt',n+2],['đỉnh',2*n],['cạnh',3*n]]);return N(`Lăng trụ đứng có đáy là hình ${n} cạnh có bao nhiêu ${k}?`,v,`Lăng trụ đứng đáy ${n}-giác có ${n+2} mặt, ${2*n} đỉnh, ${3*n} cạnh.`)},
()=>{const p=P([2,4,6,8]),q=R(3,9),h=R(3,10);return N(`Lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông ${p} cm và ${q} cm, chiều cao ${h} cm. Thể tích là`,p*q/2*h,`Diện tích đáy = ${p}·${q}/2 = ${p*q/2} cm²; V = ${p*q/2}·${h} = ${p*q/2*h} cm³.`,c3)},
()=>{const t=P(TB),h=R(3,10),p=t[0]+t[1]+t[2];return N(`Lăng trụ đứng có đáy là tam giác với ba cạnh ${t[0]} cm, ${t[1]} cm, ${t[2]} cm, chiều cao ${h} cm. Diện tích xung quanh là`,p*h,`Chu vi đáy = ${p} cm; S xq = ${p}·${h} = ${p*h} cm².`,c2)}
);
addH('l7hk',
()=>{const a=R(2,8),b=R(2,8),c=R(2,8);return I(`Hình hộp chữ nhật có đáy ${a} cm × ${b} cm và thể tích ${a*b*c} cm³. Tính chiều cao (cm).`,c,`Chiều cao = V : (a·b) = ${a*b*c} : ${a*b} = ${c} cm.`)},
()=>{const a=R(2,9);return I(`Hình lập phương có diện tích toàn phần ${6*a*a} cm². Tính độ dài cạnh (cm).`,a,`6a² = ${6*a*a} nên a² = ${a*a}, a = ${a} cm.`)},
()=>{const k=R(2,4);return I(`Một hình lập phương có cạnh tăng lên ${k} lần. Thể tích tăng lên bao nhiêu lần?`,k**3,`V = a³ nên thể tích tăng ${k}³ = ${k**3} lần.`)},
()=>{const a=R(5,9),b=R(5,9),c=R(5,9),k=R(1,4);return I(`Từ một khối hình hộp chữ nhật ${a} × ${b} × ${c} (cm), người ta cắt bỏ một khối lập phương cạnh ${k} cm. Thể tích phần còn lại (cm³) là bao nhiêu?`,a*b*c-k**3,`${a}·${b}·${c} − ${k}³ = ${a*b*c} − ${k**3} = ${a*b*c-k**3} cm³.`)},
()=>{const B=R(6,10),b=R(2,5),hd=2*R(2,4),H=R(3,8);return I(`Lăng trụ đứng có đáy là hình thang với hai đáy ${B} cm và ${b} cm, chiều cao hình thang ${hd} cm; chiều cao lăng trụ ${H} cm. Tính thể tích (cm³).`,(B+b)*hd/2*H,`Diện tích đáy = (${B} + ${b})·${hd}/2 = ${(B+b)*hd/2} cm²; V = ${(B+b)*hd/2}·${H} = ${(B+b)*hd/2*H} cm³.`)}
);
})();
