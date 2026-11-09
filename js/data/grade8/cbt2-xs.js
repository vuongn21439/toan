/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 2" — Chương VIII: Mở đầu về tính xác suất của biến cố (bài 30–32)
   Chủ đề l8xs (mã xs2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Vòng quay: mỗi hình quạt là <path class="sec"> có màu fill để oracle đếm lại.
   Kiểm chứng: kiem-chung/lop8-9/oracles8c.js */
(()=>{const {add,addH,gn,M,Iq,fq,fr,fd,ng,comb,sv,tx,fg}=G8H,{val,uq}=G8X,
isP=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true},
isSq=n=>Number.isInteger(Math.sqrt(n)),
PRED=[['là số chẵn',n=>n%2==0],['là số lẻ',n=>n%2==1],['chia hết cho 3',n=>n%3==0],['chia hết cho 4',n=>n%4==0],['chia hết cho 5',n=>n%5==0],['chia hết cho 6',n=>n%6==0],['chia hết cho 7',n=>n%7==0],
 ['là số nguyên tố',isP],['là số chính phương',isSq],['có chữ số tận cùng bằng 3',n=>n%10==3],['có chữ số tận cùng bằng 5',n=>n%10==5]],
VOW='AEIOU',
WORDS=['HA NOI','VIET NAM','CAN THO','LAO CAI','SON LA','HAI PHONG','HUE','BAC LIEU','YEN BAI','KON TUM','DONG THAP'],
COL=[['đỏ','#ff6b6b'],['xanh','#54a0ff'],['vàng','#feca57']];

/* ================= CƠ BẢN ================= */
add('l8xs',
gn('xs2.liet_ke_kq',()=>{const w=P(WORDS),L=[...w.replace(/ /g,'')],v=L.filter(c=>VOW.includes(c)),t=R(0,2);if(!v.length||v.length==L.length||new Set(L).size!=L.length)throw 0;   /* chỉ dùng cụm từ có các chữ cái đôi một khác nhau */
 const intro=`Chọn ngẫu nhiên một chữ cái trong cụm từ "${w}".`,lst=`Các chữ cái (không tính dấu cách): ${L.join(', ')}. Có ${L.length} chữ cái khác nhau.`;
 if(t==0)return[Iq(`${intro} Có bao nhiêu kết quả có thể?`,L.length,[lst,`Mỗi chữ cái là một kết quả có thể, nên có ${L.length} kết quả có thể.`]),[0]];
 if(t==1)return[Iq(`${intro} Có bao nhiêu kết quả thuận lợi cho biến cố "chữ cái được chọn là một nguyên âm (A, E, I, O, U)"?`,v.length,[lst,`Các nguyên âm trong đó: ${v.join(', ')}.`,`Có ${v.length} kết quả thuận lợi.`]),[1]];
 return[Iq(`${intro} Tính xác suất của biến cố "chữ cái được chọn là một nguyên âm (A, E, I, O, U)". (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(v.length,L.length),[lst,`Các nguyên âm: ${v.join(', ')}, tức là ${v.length} kết quả thuận lợi.`,`Các kết quả đồng khả năng, nên xác suất là ${val(v.length,L.length)}.`]),[2]]}),
gn('xs2.dem_the',()=>{const lo=P([1,1,1,10,5]),hi=lo+R(14,28),pr=P(PRED),ok=[];for(let n=lo;n<=hi;n++)if(pr[1](n))ok.push(n);if(ok.length<2||ok.length>12)throw 0;
 return[Iq(`Một hộp có các tấm thẻ được đánh số lần lượt từ ${lo} đến ${hi}. Rút ngẫu nhiên một tấm thẻ. Có bao nhiêu kết quả thuận lợi cho biến cố "số ghi trên thẻ ${pr[0]}"?`,ok.length,
  [`Các số từ ${lo} đến ${hi} ${pr[0]} là: ${ok.join('; ')}.`,`Đếm được ${ok.length} số, nên có ${ok.length} kết quả thuận lợi.`]),[lo,hi,pr[0]]]}),
gn('xs2.xs_so',()=>{const lo=P([1,1,1,10,5]),hi=lo+R(14,28),pr=P(PRED),ok=[];for(let n=lo;n<=hi;n++)if(pr[1](n))ok.push(n);if(ok.length<2||ok.length>12)throw 0;
 const tot=hi-lo+1;
 return[Iq(`Một hộp có các tấm thẻ được đánh số lần lượt từ ${lo} đến ${hi}. Rút ngẫu nhiên một tấm thẻ. Tính xác suất của biến cố "số ghi trên thẻ ${pr[0]}". (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(ok.length,tot),
  [`Số kết quả có thể: ${hi} − ${lo} + 1 = ${tot} (các kết quả đồng khả năng).`,`Các số ${pr[0]}: ${ok.join('; ')}, có ${ok.length} số nên có ${ok.length} kết quả thuận lợi.`,`Xác suất là ${val(ok.length,tot)}.`]),[lo,hi,pr[0]]]}),
gn('xs2.vong_quay',()=>{const n=P([6,8,10,12]),cnt=[R(1,n-2),0,0];cnt[1]=R(1,n-1-cnt[0]);cnt[2]=n-cnt[0]-cnt[1];if(cnt[2]<1)throw 0;
 const cols=sh([...COL]),lst=[];cols.forEach((c,i)=>{for(let j=0;j<cnt[i];j++)lst.push(i)});const arr=sh(lst),t=R(0,1);
 const r=62,cx=120,cy=80,P2=i=>{const a=(-90+360*i/n)*Math.PI/180;return[+(cx+r*Math.cos(a)).toFixed(2),+(cy+r*Math.sin(a)).toFixed(2)]},
 secs=arr.map((ci,i)=>{const [x1,y1]=P2(i),[x2,y2]=P2(i+1),am=(-90+360*(i+.5)/n)*Math.PI/180;
  return `<path class="sec" d="M${cx} ${cy}L${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}Z" style="fill:${cols[ci][1]};stroke:#0e1033;stroke-width:1.5"/><text x="${+(cx+42*Math.cos(am)).toFixed(1)}" y="${+(cy+42*Math.sin(am)+4).toFixed(1)}" text-anchor="middle" style="font-size:12px;font-weight:700;fill:#0e1033">${i+1}</text>`}).join(''),
 fig=sv(`${secs}<path d="M${cx} 20L${cx-7} 3H${cx+7}Z" style="fill:#ff9f43;stroke:#0e1033;stroke-width:1.5"/>`);
 if(t==0){const ci=R(0,2),name=cols[ci][0];
  return[fg(Iq(`Một vòng quay có ${n} hình quạt bằng nhau (như hình), mỗi hình quạt được đánh số từ 1 đến ${n} và tô một màu. Quay vòng quay một lần, mũi tên dừng ngẫu nhiên ở một hình quạt. Tính xác suất mũi tên dừng ở hình quạt màu ${name}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(cnt[ci],n),
   [`Có ${n} hình quạt bằng nhau nên có ${n} kết quả có thể, đồng khả năng.`,`Đếm các hình quạt màu ${name} trong hình: có ${cnt[ci]} hình quạt.`,`Xác suất là ${val(cnt[ci],n)}.`]),fig),[n,t,ci]]}
 const k=P([2,3,4]),ok=[];for(let i=1;i<=n;i++)if(i%k==0)ok.push(i);
 return[fg(Iq(`Một vòng quay có ${n} hình quạt bằng nhau (như hình), mỗi hình quạt được đánh số từ 1 đến ${n}. Quay vòng quay một lần, mũi tên dừng ngẫu nhiên ở một hình quạt. Tính xác suất mũi tên dừng ở hình quạt ghi số chia hết cho ${k}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(ok.length,n),
  [`Có ${n} hình quạt bằng nhau nên có ${n} kết quả có thể, đồng khả năng.`,`Các số từ 1 đến ${n} chia hết cho ${k}: ${ok.join('; ')}, có ${ok.length} số.`,`Xác suất là ${val(ok.length,n)}.`]),fig),[n,t,k]]}),
gn('xs2.hai_xx_tich',()=>{const E=[['tích hai số chấm là số lẻ',(a,b)=>a*b%2==1],['tích hai số chấm là số chẵn',(a,b)=>a*b%2==0],['tích hai số chấm bằng 12',(a,b)=>a*b==12],['tích hai số chấm lớn hơn 20',(a,b)=>a*b>20],
 ['hiệu của số chấm lớn trừ số chấm nhỏ bằng 2',(a,b)=>Math.abs(a-b)==2],['hai con xúc xắc có số chấm giống nhau',(a,b)=>a==b],['số chấm con thứ nhất gấp đôi số chấm con thứ hai',(a,b)=>a==2*b],['tổng hai số chấm chia hết cho 3',(a,b)=>(a+b)%3==0]],
 e=P(E),ok=[];for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(e[1](a,b))ok.push(`(${a}; ${b})`);
 return[Iq(`Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố "${e[0]}". (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(ok.length,36),
  [`Mỗi kết quả là một cặp (số chấm con thứ nhất; số chấm con thứ hai). Có 6·6 = 36 kết quả có thể, đồng khả năng.`,`Các kết quả thuận lợi: ${ok.join(', ')}. Có ${ok.length} kết quả.`,`Xác suất là ${val(ok.length,36)}.`]),[e[0]]]}),
gn('xs2.hai_bi_chon',()=>{const n=R(4,7),E=[['tổng hai số ghi trên hai viên bi là số chẵn',(a,b)=>(a+b)%2==0],['tích hai số ghi trên hai viên bi là số lẻ',(a,b)=>a*b%2==1],['có ít nhất một viên bi ghi số chẵn',(a,b)=>a%2==0||b%2==0],
 ['hai số ghi trên hai viên bi là hai số liên tiếp',(a,b)=>b-a==1],['tổng hai số ghi trên hai viên bi lớn hơn 5',(a,b)=>a+b>5]],e=P(E),ok=[];
 for(let a=1;a<=n;a++)for(let b=a+1;b<=n;b++)if(e[1](a,b))ok.push(`(${a}; ${b})`);const tot=comb(n,2);if(!ok.length||ok.length==tot)throw 0;
 return[Iq(`Một hộp có ${n} viên bi giống hệt nhau về kích thước, được đánh số từ 1 đến ${n}. Lấy ngẫu nhiên đồng thời hai viên bi từ hộp. Tính xác suất của biến cố "${e[0]}". (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(ok.length,tot),
  [`Lấy đồng thời hai viên nên không phân biệt thứ tự. Số cách chọn hai viên trong ${n} viên là ${n}·${n-1} : 2 = ${tot}, đồng khả năng.`,`Liệt kê các cặp thuận lợi: ${ok.join(', ')}. Có ${ok.length} cặp.`,`Xác suất là ${val(ok.length,tot)}.`]),[n,e[0]]]}),
gn('xs2.tan_suat_bang',()=>{const N=P([60,80,100,120]),c=[0,0,0,0,0,0],base=Math.floor(N/6);for(let i=0;i<5;i++)c[i]=base+R(-6,6);c[5]=N-c.slice(0,5).reduce((x,y)=>x+y,0);if(c.some(v=>v<4))throw 0;
 const E=[['xuất hiện mặt có số chấm lẻ',[1,3,5]],['xuất hiện mặt có số chấm lớn hơn 4',[5,6]],['xuất hiện mặt có số chấm chẵn',[2,4,6]],['xuất hiện mặt 6 chấm',[6]],['xuất hiện mặt có số chấm không lớn hơn 2',[1,2]]],e=P(E),k=e[1].reduce((s,f)=>s+c[f-1],0);
 return[Iq(`Gieo một con xúc xắc ${N} lần, kết quả thu được: ${c.map((v,i)=>`mặt ${i+1}: ${v} lần`).join('; ')}. Tính xác suất thực nghiệm của biến cố "${e[0]}". (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(k,N),
  [`Xác suất thực nghiệm = số lần biến cố xảy ra : tổng số lần gieo.`,`Biến cố xảy ra khi xuất hiện mặt ${e[1].join(', ')}: số lần là ${e[1].map(f=>c[f-1]).join(' + ')} = ${k}.`,`Xác suất thực nghiệm là ${val(k,N)}.`]),[N,e[0]]]}),
gn('xs2.uoc_luong',()=>{const n=P([50,100,200]),k=R(2,9),F=P([1000,2000,5000,10000]),x=F*k/n;if(!Number.isInteger(x))throw 0;
 return[Iq(`Kiểm tra ngẫu nhiên ${n} sản phẩm của một nhà máy, thấy có ${k} sản phẩm không đạt chất lượng. Nếu nhà máy sản xuất ${F} sản phẩm thì ước tính có khoảng bao nhiêu sản phẩm không đạt chất lượng?`,x,
  [`Xác suất thực nghiệm để một sản phẩm không đạt chất lượng là ${val(k,n)}.`,`Ước lượng số sản phẩm không đạt trong ${F} sản phẩm: ${F} · ${fq(k,n)}.`,`${F} · ${k} : ${n} = ${x}. Vậy khoảng ${x} sản phẩm không đạt chất lượng.`]),[n,k,F]]}));

/* ================= NÂNG CAO ================= */
addH('l8xs',
gn('xs2.chon_hai_ban',()=>{const a=R(3,7),b=R(3,7),t=R(0,2),tot=comb(a+b,2),k=[a*b,comb(a,2)+comb(b,2),comb(b,2)][t],
 ev=['một bạn nam và một bạn nữ','hai bạn cùng giới','hai bạn đều là nữ'][t];
 return[Iq(`Một tổ có ${a} bạn nam và ${b} bạn nữ. Chọn ngẫu nhiên hai bạn của tổ để trực nhật. Tính xác suất để chọn được ${ev}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(k,tot),
  [`Số cách chọn 2 bạn trong ${a+b} bạn: ${a+b}·${a+b-1} : 2 = ${tot} cách, đồng khả năng.`,
   t==0?`Chọn một bạn nam (${a} cách) và một bạn nữ (${b} cách): ${a}·${b} = ${k} cách.`:t==1?`Cả hai nam: ${a}·${a-1} : 2 = ${comb(a,2)} cách; cả hai nữ: ${b}·${b-1} : 2 = ${comb(b,2)} cách. Tổng ${k} cách.`:`Cả hai nữ: ${b}·${b-1} : 2 = ${k} cách.`,`Xác suất là ${val(k,tot)}.`]),[a,b,t]]}),
gn('xs2.ba_xuc_xac',()=>{const s=P([3,4,5,6,15,16,17,18]),ok=[];for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let c=1;c<=6;c++)if(a+b+c==s)ok.push(`(${a}; ${b}; ${c})`);
 return[Iq(`Gieo đồng thời ba con xúc xắc cân đối. Tính xác suất của biến cố "tổng số chấm của ba con xúc xắc bằng ${s}". (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(ok.length,216),
  [`Mỗi kết quả là bộ ba (số chấm con thứ nhất; thứ hai; thứ ba). Có 6·6·6 = 216 kết quả có thể, đồng khả năng.`,`Các bộ ba có tổng bằng ${s}: ${ok.join(', ')}. Có ${ok.length} kết quả thuận lợi.`,`Xác suất là ${val(ok.length,216)}.`]),[s]]}),
gn('xs2.ghep_so',()=>{const dg=sh([1,2,3,4,5,6]).slice(0,R(4,5)).sort((x,y)=>x-y),E=[['là số chẵn',n=>n%2==0],['là số lẻ',n=>n%2==1],['lớn hơn 30',n=>n>30],['chia hết cho 3',n=>n%3==0],['chia hết cho 5',n=>n%5==0]],e=P(E),all=[],ok=[];
 for(const a of dg)for(const b of dg)if(a!=b){const n=10*a+b;all.push(n);if(e[1](n))ok.push(n)}if(!ok.length||ok.length==all.length)throw 0;
 return[Iq(`Từ các chữ số ${dg.join(', ')}, lập các số tự nhiên có hai chữ số khác nhau. Chọn ngẫu nhiên một số trong các số lập được. Tính xác suất để số được chọn ${e[0]}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(ok.length,all.length),
  [`Chọn chữ số hàng chục (${dg.length} cách), rồi chữ số hàng đơn vị khác chữ số hàng chục (${dg.length-1} cách): ${dg.length}·${dg.length-1} = ${all.length} số, đồng khả năng.`,`Các số ${e[0]}: ${ok.join('; ')}. Có ${ok.length} số.`,`Xác suất là ${val(ok.length,all.length)}.`]),[dg.join(''),e[0]]]}),
gn('xs2.hai_lan_hoan_lai',()=>{const r=R(2,7),b=R(2,7),t=R(0,1),T=r+b,k=t==0?r*r+b*b:2*r*b;
 return[Iq(`Một hộp có ${r} viên bi đỏ và ${b} viên bi xanh, cùng kích thước. Lấy ngẫu nhiên một viên bi, ghi lại màu rồi trả viên bi vào hộp, sau đó lấy ngẫu nhiên một viên bi lần hai. Tính xác suất để hai viên bi lấy ra ${t==0?'cùng màu':'khác màu'}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(k,T*T),
  [`Vì trả bi lại nên mỗi lần lấy đều có ${T} viên trong hộp. Số kết quả có thể: ${T}·${T} = ${T*T}, đồng khả năng.`,
   t==0?`Cùng màu: cả hai đỏ (${r}·${r} = ${r*r} kết quả) hoặc cả hai xanh (${b}·${b} = ${b*b} kết quả). Tổng ${k} kết quả.`:`Khác màu: đỏ rồi xanh (${r}·${b} = ${r*b} kết quả) hoặc xanh rồi đỏ (${b}·${r} = ${r*b} kết quả). Tổng ${k} kết quả.`,`Xác suất là ${val(k,T*T)}.`]),[r,b,t]]}));
})();
