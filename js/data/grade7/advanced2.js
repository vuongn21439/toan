/* LỚP 7: BỒI DƯỠNG HSG — tập 2 (thêm đa dạng). Dùng ()=>{return...} nhất quán. */
(()=>{const {fr,fq,fh,add,addH,ps}=G7H,
 rt=()=>{let a,b;do{b=R(2,9);a=nz()}while(gcd(Math.abs(a),b)!=1);return[a,b]},
 br=(a,b)=>a<0?'('+fq(a,b)+')':fq(a,b),
 kf=()=>{let v;do v=R(-6,6);while(!v);return v},
 rp=d=>{const c=[];for(let i=0;i<=d;i++)c.push(i==0||i==d||R(0,2)?kf():0);return c},
 ev=(c,x)=>c.reduceRight((s,a)=>s*x+a,0);

addH('l7sht',
 ()=>{const a=R(2,9),b=R(2,9),x=R(2,9);return I(`Tìm x: ${a}(x + ${b}) − ${b}(x − ${a}) = ${2*a*b}. x = ?`,x,`Rút gọn: (${a}−${b})x + ${2*a*b} = ${2*a*b} → x = ${x}.`,iz,1)},
 ()=>{const[a,b]=rt(),n=R(2,4);return I(`Tính: (${br(a,b)})^${n} × (${br(b,a)})^${n}`,1,`Nhân từng cặp: (${fq(a,b)}×${fq(b,a)})^${n} = 1.`)},
 ()=>{const[a,b]=rt(),[c,d]=rt();return I(`Tìm x: x : ${br(a,b)} = ${br(c,d)}. x = ? (rút gọn)`,fr(a*c,b*d),`x = ${fq(c,d)}×${fq(a,b)} = ${fq(a*c,b*d)}.`)},
 ()=>{const n=R(2,5);return I(`Tính: (−1)^${2*n} + (−1)^${2*n+1}`,0,'Số mũ chẵn cho +1, số mũ lẻ cho −1: 1+(−1)=0.')}
);
add('l7sht',
 ()=>{const[a,b]=rt();return Z(`Nhân tử ${br(a,b)} với 2, chia mẫu cho 2. Giá trị phân số:`,`gấp 4 lần`,['không đổi','gấp 2 lần','giảm 2 lần'],'Tử ×2, mẫu ÷2 → giá trị ×4.')},
 ()=>{const[a,b]=rt();return Z(`Số đối và số nghịch đảo của ${br(a,b)}:`,'khác nhau',['bằng nhau','cùng bằng 0','luôn dương'],'Số đối = −a/b, số nghịch đảo = b/a; hai số khác nhau.')}
);

addH('l7sth',
 ()=>{const a=R(2,6),b=R(2,6);return I(`Tìm x>0: x² = ${(a*b)*(a*b)}. x = ?`,a*b,`x = √${(a*b)*(a*b)} = ${a*b}.`)},
 ()=>{const a=R(2,9);return I(`Tìm x: √x = ${a}. x = ?`,a*a,`x = ${a}² = ${a*a}.`)},
 ()=>{const n=R(2,5);return I(`Tính: √${n*n}×√${n*n}×√${n*n}`,n**3,`Mỗi căn = ${n}; tích = ${n}³.`)}
);
add('l7sth',
 ()=>{const a=R(11,30);const f=Math.floor(Math.sqrt(a));return Z(`√${a} nằm giữa hai số tự nhiên liên tiếp nào?`,`${f} và ${f+1}`,['10 và 11','1 và 2',`${f-1} và ${f}`],`${f}²=${f*f} < ${a} < ${(f+1)*(f+1)}=(f+1)².`)},
 ()=>{return Z('Số nào KHÔNG phải số vô tỉ?','√9',['√2','√3','π'],'√9=3 là số hữu tỉ; √2, √3, π là số vô tỉ.')}
);

addH('l7tlt',
 ()=>{const[a,b,c]=P([[1,2,3],[2,3,4],[1,3,5],[2,3,5]]),k=R(2,8);return I(`Biết x/${a}=y/${b}=z/${c} và x+y+z=${(a+b+c)*k}. Tính x+y−z.`,(a+b-c)*k,`Mỗi phần=${k}; x+y−z=(${a}+${b}−${c})×${k}.`)},
 ()=>{const[a,b]=P([[2,3],[3,5],[4,5],[3,4]]),k=R(2,6);return I(`Hai số có tỉ số ${a}/${b}, tổng=${(a+b)*k}. Số bé hơn là:`,Math.min(a,b)*k,`Mỗi phần=${k}; số bé=min(${a},${b})×${k}.`)},
 ()=>{const k=R(2,5),t=R(2,6);return I(`3 máy cày làm xong đồng ruộng trong ${t} ngày. ${k} máy cày làm xong trong mấy ngày? (làm tròn 1 chữ số)`,Math.round(3*t/k*10)/10,`Khối lượng không đổi: 3×${t}=${k}×x → x=${Math.round(3*t/k*10)/10}.`)}
);
add('l7tlt',
 ()=>{const a=R(2,9),b=R(2,9);return Z(`Từ ${a}·x=${b}·y (x,y≠0), suy ra tỉ lệ thức nào ĐÚNG?`,`x/${b}=y/${a}`,[`x/${a}=y/${b}`,`x/y=${a}/${b}`,`x·y=${a*b}`],'Tích ngoại=tích trung: x·a=y·b ⇔ x/b=y/a.')},
 ()=>{const k=R(2,4),x=R(3,10);return N(`y tỉ lệ thuận với x theo hệ số k=${k}. Khi y=${k*x} thì x bằng:`,x,'y=k·x → x=y:k.')}
);

addH('l7dt',
 ()=>{const c=rp(3);const s=c.reduce((a,b)=>a+b,0);return I(`Cho P(x)=${ps(c)}. Tổng các hệ số của P(x) là:`,s,'Tổng các hệ số = P(1).',iz,1)},
 ()=>{const a=R(2,6),b=R(2,6);return I(`Nghiệm dương của đa thức ${a}x²−${a*b*b} là:`,b,`${a}x²=${a*b*b} → x²=${b*b} → x=${b}.`)},
 ()=>{const c=rp(2),x=P([-2,-1,1,2]);return I(`Cho P(x)=${ps(c)}. P(${iz(x)})=?`,ev(c,x),`Thay x=${iz(x)} vào P(x).`,iz,1)}
);
add('l7dt',
 ()=>{const c=rp(3);return Z(`Hạng tử tự do của đa thức ${ps(c)} là:`,''+c[0],[''+c[c.length-1],''+(c[0]+1),''+(c[0]-1)],'Hạng tử tự do là hạng tử không chứa biến.')},
 ()=>{const a=R(2,5),b=R(2,5);return Z(`Đa thức ${a}x−${a*b} có nghiệm là:`,''+b,[''+a,''+(a*b),''+(b+1)],`${a}x=${a*b} → x=${b}.`)}
);

addH('l7gdt',
 ()=>{const h=R(10,40);return I(`Tia Ot là phân giác của góc xOy=${2*h}°. Góc yOt bằng (độ):`,h,'Phân giác chia góc thành hai phần bằng nhau.')},
 ()=>{const a=R(20,70);return I(`Hai góc so le trong bằng nhau, một góc=${a}°. Góc đồng vị với nó bằng (độ):`,a,'Khi hai đường thẳng song song: góc so le trong bằng nhau, góc đồng vị cũng bằng nhau.')},
 ()=>{const n=R(3,6);return I(`Có ${n} tia chung gốc O, trong đó có đúng một cặp tia đối nhau. Có bao nhiêu góc bẹt?`,1,'Chỉ có đúng một cặp tia đối nhau tạo thành một góc bẹt 180°.')}
);
add('l7gdt',
 ()=>{const a=P([35,50,65,80,100,115,130,145]);return N(`Hai góc kề bù, một góc ${a}°. Góc đối đỉnh của góc còn lại bằng (độ):`,a,'Góc đối đỉnh luôn bằng góc ban đầu.')},
 ()=>{return Z('Hai đường phân giác của hai góc kề bù tạo với nhau một góc bằng:','90°',['45°','60°','180°'],'Hai góc kề bù tổng 180°, mỗi phân giác chia một nửa → tổng hai nửa=90°.')}
);

addH('l7tgb',
 ()=>{const a=R(20,50);return I(`Tam giác vuông có một góc nhọn ${a}°. Góc nhọn còn lại (độ):`,90-a,'Hai góc nhọn trong tam giác vuông cộng lại=90°.')},
 ()=>{const b=R(30,60);return I(`Tam giác cân tại A có góc B=${b}°. Góc A (độ):`,180-2*b,'Góc C=góc B; góc A=180°−2×'+b+'°.')},
 ()=>{const a=R(3,8);return I(`Tam giác đều cạnh ${a} cm. Chu vi (cm):`,3*a,'Tam giác đều ba cạnh bằng nhau: chu vi=3×'+a+'.')},
 ()=>{const a=P([30,35,40,45,50,55,60]),b=P([30,35,40,45,50,55,60]);return I(`Tam giác ABC có góc A=${a}°, góc B=${b}°. Góc ngoài tại C (độ):`,a+b,'Góc ngoài tại C=tổng hai góc trong không kề=A+B.')},
 ()=>{const a=R(3,8);return I(`Tam giác vuông cân tại A có cạnh góc vuông=${a} cm. Cạnh huyền BC xấp xỉ (làm tròn, √2≈1,4):`,Math.round(a*1.4),`Cạnh huyền=cạnh×√2≈${a}×1,4≈${Math.round(a*1.4)} cm.`)}
);
add('l7tgb',
 ()=>{const a=P([30,40,50,60,70]),b=P([30,40,50,60,70]);return N(`Tam giác ABC có góc A=${a}°, góc B=${b}°. Góc C (độ):`,180-a-b,'Tổng ba góc=180°.')},
 ()=>{const a=R(3,9);return N(`Tam giác cân tại A có AB=${a} cm, góc A=60°. Chu vi (cm):`,3*a,'Tam giác cân có một góc 60° là tam giác đều.')}
);

addH('l7qht',
 ()=>{const m=R(3,12)*3;return I(`G là trọng tâm tam giác ABC, AG=${2*m/3} cm. Trung tuyến AM dài (cm):`,m,'AG=2/3 AM → AM=AG×3/2.')},
 ()=>{const x=R(4,10),y=R(x+1,12);return I(`Tam giác có hai cạnh ${x} cm và ${y} cm. Cạnh thứ ba lớn nhất (số nguyên, cm):`,x+y-1,`Cạnh thứ ba < ${x+y}; số nguyên lớn nhất=${x+y-1}.`)},
 ()=>{return Z('Trong tam giác ABC, góc A > góc B > góc C. Cạnh lớn nhất là:','BC',['AC','AB','Ba cạnh bằng nhau'],'Cạnh lớn nhất đối diện góc lớn nhất: góc A đối diện cạnh BC.')}
);
add('l7qht',
 ()=>{return Z('Giao điểm của ba đường cao trong tam giác là:','Trực tâm',['Trọng tâm','Điểm cách đều ba cạnh','Điểm cách đều ba đỉnh'],'Ba đường cao đồng quy tại trực tâm; trung tuyến tại trọng tâm; phân giác tại điểm cách đều ba cạnh; trung trực tại điểm cách đều ba đỉnh.')},
 ()=>{const x=R(3,9),y=R(3,9);return N(`Tam giác có hai cạnh ${x} cm và ${y} cm. Cạnh thứ ba nhỏ nhất (nguyên, cm):`,Math.abs(x-y)+1,`Cạnh thứ ba > |${x}−${y}|=${Math.abs(x-y)}; số nguyên nhỏ nhất=${Math.abs(x-y)+1}.`)}
);

addH('l7hk',
 ()=>{const a=R(2,6);return I(`Hình lập phương có diện tích xung quanh=${4*a*a} cm². Cạnh (cm):`,a,'S_xq lập phương=4a² → a='+a+'.')},
 ()=>{const a=R(3,8),b=R(3,8),c=R(3,8);return I(`Hình hộp chữ nhật có V=${a*b*c} cm³, đáy ${a}×${b} cm. Chiều cao (cm):`,c,'c=V:(a×b).')},
 ()=>{const k=R(2,3);return I(`Tăng chiều cao hình hộp lên ${k} lần (giữ nguyên đáy) thì thể tích tăng lên bao nhiêu lần?`,k,'V=S_đáy×chiều cao, nên tăng chiều cao '+k+' lần thì V tăng '+k+' lần.')},
 ()=>{const n=R(3,6);return I(`Lăng trụ đứng đáy ${n} giác có bao nhiêu cạnh?`,3*n,`Đáy ${n} cạnh, hai đáy ${2*n}, mặt bên ${n}; tổng ${3*n}.`)}
);
add('l7hk',
 ()=>{const a=R(2,7);return N(`Hình lập phương cạnh ${a} cm. Diện tích toàn phần (cm²):`,6*a*a,'6 mặt vuông: 6×a².')},
 ()=>{const a=R(2,6),b=R(2,6),c=R(2,6);return N(`Hình hộp chữ nhật ${a}×${b}×${c} cm. Thể tích (cm³):`,a*b*c,'V=a×b×c.')}
);

addH('l7bd',
 ()=>{const L=Array.from({length:6},()=>R(2,9));const s=L.reduce((a,b)=>a+b,0);return I(`Dãy số liệu: ${L.join('; ')}. Tổng các giá trị là:`,s,'Cộng tất cả các giá trị lại.')},
 ()=>{const L=Array.from({length:6},()=>R(3,9));const mn=Math.min(...L);return I(`Dãy số liệu: ${L.join('; ')}. Giá trị nhỏ nhất là:`,mn,'So sánh các giá trị, tìm số bé nhất.')}
);
add('l7bd',
 ()=>{const p=R(10,40);return N(`Một phần chiếm ${p}% trên biểu đồ hình quạt tròn. Góc ở tâm (độ):`,p*3.6,'360°×p%=p×3,6.')},
 ()=>{const L=Array.from({length:6},()=>R(3,8));const x=P(L),k=L.filter(v=>v==x).length;return N(`Dãy: ${L.join('; ')}. Tần số của giá trị ${x} là:`,k,'Đếm số lần xuất hiện.')}
);

addH('l7xs',
 ()=>{const n=R(3,6);return I(`Hộp có ${n} thẻ đánh số 1→${n}. Rút ngẫu nhiên 2 thẻ cùng lúc. Có bao nhiêu kết quả?`,n*(n-1)/2,`Chọn 2 trong ${n} thẻ (không xét thứ tự): ${n}×${n-1}:2.`)},
 ()=>{const a=R(2,5),b=R(2,5);return I(`Hộp có ${a} bi đỏ, ${b} bi xanh. Rút 1 bi. Xác suất được bi đỏ (rút gọn):`,fr(a,a+b),`${a}/${a+b}=${fq(a,a+b)}.`)},
 ()=>{const k=R(2,3);return I(`Gieo một con xúc xắc ${k} lần. Có bao nhiêu kết quả có thể xảy ra?`,6**k,`Mỗi lần có 6 kết quả: 6^${k}=${6**k}.`)}
);
add('l7xs',
 ()=>{const[t,s]=P([['chia hết cho 2',[2,4,6]],['nhỏ hơn 4',[1,2,3]],['lớn hơn 2 và nhỏ hơn 6',[3,4,5]]]);return Z(`Gieo xúc xắc. Xác suất xuất hiện mặt ${t} là:`,fq(s.length,6),['1/2','1/3','1/6'].filter(x=>x!=fq(s.length,6)),`Có ${s.length} kết quả thuận lợi trong 6.`)},
 ()=>{return Z('Xác suất của biến cố ngẫu nhiên luôn nằm trong khoảng:','Từ 0 đến 1',['Nhỏ hơn 0','Lớn hơn 1','Chỉ bằng 0 hoặc 1'],'Xác suất=số thuận lợi:tổng số kết quả, luôn từ 0 đến 1.')}
);
})();
