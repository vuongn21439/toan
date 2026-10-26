/* LỚP 6 · v5 (phần 3) — Số thập phân, phần trăm, hình học, điểm–đoạn–góc, thống kê, toán đố, đường tròn, đối xứng, hình học trực quan.
   Dạng bài lấy từ tuyển tập chuyên đề bồi dưỡng HSG Toán 6; đáp án nhiễu = lỗi hay gặp (kèm lý do); lời giải từng bước.
   q.k + q.p dùng cho tools/verify.js. */
(()=>{
const {mc,sol,gen,ov,fd,ng,c2,lcm}=BK,fh=G7H.fh,pc=v=>fd(v)+'%',
 mcd=(q,a,w,e)=>mc(q,a,w,e,fd),mcp=(q,a,w,e)=>mc(q,a,w,e,pc);

/* ================= SỐ THẬP PHÂN ================= */
A('dec',
/* a×b + a×c với b + c tròn chục */
gen('dec.nhomnhan',()=>{
 const S=P([1,10,100]);let a10,b10,c10;
 do{a10=R(12,98)}while(a10%10==0);
 b10=S==1?R(1,9):S==10?R(11,89):R(101,899);if(b10%10==0)b10++;c10=S*10-b10;
 const a=a10/10,b=b10/10,c=c10/10,ans=a*S,e=sol([`Hai tích có thừa số chung ${fd(a)}: a × b + a × c = a × (b + c).`,`b + c = ${fd(b)} + ${fd(c)} = ${S}.`,`Kết quả = ${fd(a)} × ${S} = ${fd(ans)}.`],`${fd(ans)}.`,S==1?'Nhân với 1 thì giữ nguyên số; đừng nhân từng tích rồi cộng.':`Nhân với ${S} thì dịch dấu phẩy sang phải ${Math.log10(S)} chữ số; đừng nhân từng tích rồi cộng.`);
 return[mcd(`Tính nhanh: ${fd(a)} × ${fd(b)} + ${fd(a)} × ${fd(c)}`,ans,[[ans*10,'dịch dấu phẩy thừa một chữ số'],[ans/10,'dịch dấu phẩy thiếu một chữ số'],[a*b,'chỉ tính một tích'],[a+S,'cộng thay vì nhân']],e),[a10,b10,c10]]}),

/* Dịch dấu phẩy 1 chữ số */
gen('dec.dichdauphay',()=>{
 const t=R(0,1);let o;do{o=R(11,99)}while(o%10==0);
 const old=o/10,X=t==0?9*old:old*0.9,Xs=fd(X);
 const e=t==0?sol([`Dịch dấu phẩy sang phải 1 chữ số tức là nhân số đó với 10. Gọi số cũ là a thì số mới là 10 × a.`,`Số mới hơn số cũ ${Xs}: 10 × a − a = ${Xs}, tức 9 × a = ${Xs}.`,`a = ${Xs} : 9 = ${fd(old)}.`,`Thử lại: ${fd(old*10)} − ${fd(old)} = ${Xs}.`],`số cũ là ${fd(old)}.`,`Hiệu của 10a và a là 9a (không phải 10a hay 11a).`)
  :sol([`Dịch dấu phẩy sang trái 1 chữ số tức là chia số đó cho 10. Gọi số cũ là a thì số mới là a : 10 = 0,1 × a.`,`Số mới kém số cũ ${Xs}: a − 0,1 × a = ${Xs}, tức 0,9 × a = ${Xs}.`,`a = ${Xs} : 0,9 = ${fd(old)}.`,`Thử lại: ${fd(old)} − ${fd(old/10)} = ${Xs}.`],`số cũ là ${fd(old)}.`,`a − 0,1a = 0,9a: chia cho 0,9 chứ không chia cho 9.`);
 const w=t==0?[[X/10,'chia cho 10 thay vì 9'],[old*10,'đó là số mới (sau khi dịch dấu phẩy)'],[old/10,'dịch dấu phẩy nhầm sang trái']]:[[old/10,'chia cho 9 thay vì 0,9 (kết quả cũng chính là số mới)'],[X,'nhầm hiệu là số cũ'],[old*10,'dịch dấu phẩy nhầm sang phải']];
 return[mcd(t==0?`Khi dịch dấu phẩy của một số thập phân sang phải một chữ số thì ta được số mới lớn hơn số cũ ${Xs} đơn vị. Số cũ là:`:`Khi dịch dấu phẩy của một số thập phân sang trái một chữ số thì ta được số mới kém số cũ ${Xs} đơn vị. Số cũ là:`,old,w,e),[t,o]]})
);

HA('dec',
/* Hai số: dịch dấu phẩy số lớn thì được số bé */
gen('dec.tong_dichphay',()=>{
 let k;do{k=R(11,99)}while(k%10==0);
 const small=k/100,big=k/10,S=11*k/100;
 const e=sol([`Dịch dấu phẩy của số lớn sang trái 1 chữ số thì được số bé, nên số lớn = 10 × số bé.`,`Tổng = số bé + 10 × số bé = 11 × số bé = ${fd(S)}.`,`Số bé = ${fd(S)} : 11 = ${fd(small)}.`,`Số lớn = 10 × ${fd(small)} = ${fd(big)}.`],`số lớn là ${fd(big)}.`,`Chia đôi tổng chỉ đúng khi hai số bằng nhau; ở đây số lớn gấp 10 lần số bé.`);
 return[mcd(`Tổng của hai số thập phân là ${fd(S)}. Nếu dịch dấu phẩy của số lớn sang trái một chữ số thì ta được số bé. Số lớn là:`,big,[[small,'đó là số bé'],[S/2,'chia đôi tổng: hai số không bằng nhau'],[S/10,'lấy tổng chia 10'],[k,'dịch dấu phẩy sai: gấp 10 lần số lớn']],e),[k]]}),

/* x × p ± x × q = r */
gen('dec.timx_thapphan',()=>{
 const t=R(0,1);let x10;do{x10=R(12,98)}while(x10%10==0);
 let p10,q10,S;
 if(t==0){S=P([1,10]);p10=S==1?R(1,9):R(11,89);if(p10%10==0)p10++;q10=S*10-p10}
 else{S=P([1,2,5,10]);q10=R(11,89);if(q10%10==0)q10++;p10=q10+S*10}
 const x=x10/10,p=p10/10,q=q10/10,r=x*S,op=t==0?'+':'−',
  e=sol([`Đặt x làm thừa số chung: x × ${fd(p)} ${op} x × ${fd(q)} = x × (${fd(p)} ${op} ${fd(q)}).`,`${fd(p)} ${op} ${fd(q)} = ${S}, nên x × ${S} = ${fd(r)}.`,`x = ${fd(r)} : ${S} = ${fd(x)}.`],`x = ${fd(x)}.`,`Phải nhóm hệ số trước, không chia ${fd(r)} cho từng hệ số riêng lẻ.`);
 return[mcd(`Tìm x, biết: x × ${fd(p)} ${op} x × ${fd(q)} = ${fd(r)}`,x,[[r/p,'chỉ chia cho hệ số thứ nhất'],[r/q,'chỉ chia cho hệ số thứ hai'],[r*S,'nhân thay vì chia'],[r-S,'trừ thay vì chia']],e),[t,x10,p10,q10]]})
);

/* ================= PHẦN TRĂM ================= */
A('pct',
/* Tăng p% rồi giảm p% */
gen('pct.tanggiam',()=>{
 const p=P([10,20,30,40,50]),k=p*p/100,
  e=sol([`Giả sử giá ban đầu là 100.`,`Sau khi tăng ${p}%: 100 + ${p} = ${100+p}.`,`Giảm ${p}% của giá mới: ${100+p} × ${p}% = ${(100+p)*p/100}, nên giá cuối = ${100+p} − ${(100+p)*p/100} = ${100-k}.`,`So với giá ban đầu (100) giá cuối ${100-k} giảm ${k}%.`],`giá giảm ${k}%.`,`Hai lần tính phần trăm có cơ sở khác nhau (100 và ${100+p}) nên không triệt tiêu nhau.`);
 return[mc(`Giá một mặt hàng tăng ${p}%, sau đó lại giảm ${p}% (tính trên giá đã tăng). So với giá ban đầu, giá cuối cùng:`,`giảm ${k}%`,[['không đổi',`tăng rồi giảm cùng ${p}% không triệt tiêu vì cơ sở tính khác nhau`],[`giảm ${p}%`,`nhầm cơ sở: lần giảm tính trên giá đã tăng chứ không phải giá gốc`],[`tăng ${k}%`,'nhầm chiều thay đổi']],e,String),[p]]}),

/* A bằng p% B → B hơn A bao nhiêu %? */
gen('pct.honkem',()=>{
 const p=P([80,25,20,40,10]),t=R(0,1),ans=t==0?10000/p-100:10000/p,
  e=t==0?sol([`Coi số B là 100 phần thì số A là ${p} phần.`,`B hơn A: 100 − ${p} = ${100-p} (phần).`,`So với A: ${100-p} : ${p} = ${fd((100-p)/p)} = ${pc(ans)}.`],`B hơn A ${pc(ans)}.`,`Phải so với A (số được so sánh), không phải so với B: ${100-p}% là A kém B.`)
  :sol([`A bằng ${p}% của B nghĩa là A = ${fd(p/100)} × B.`,`B : A = 100 : ${p} = ${fd(100/p)}.`,`Vậy B bằng ${fd(100/p)} × 100% = ${pc(ans)} của A.`],`B bằng ${pc(ans)} của A.`,`Khi đổi vai trò của A và B thì số được lấy làm cơ sở (100%) cũng đổi theo.`);
 return[mcp(t==0?`Số A bằng ${p}% của số B. Hỏi số B lớn hơn số A bao nhiêu phần trăm của A?`:`Số A bằng ${p}% của số B. Hỏi số B bằng bao nhiêu phần trăm của số A?`,ans,t==0?[[100-p,'so sánh với B thay vì A'],[10000/p,'đó là B bằng bao nhiêu % của A, chưa trừ 100%'],[p,'đó là A bằng bao nhiêu % của B']]:[[100-p,'nhầm với B hơn A (hay A kém B)'],[10000/p-100,'đó là B hơn A bao nhiêu %, chưa cộng 100%'],[p,'đó là A bằng bao nhiêu % của B']],e),[t,p]]})
);

HA('pct',
/* Pha loãng dung dịch */
gen('pct.nongdo',()=>{
 let s,p,q,m,tot;
 do{s=P([5,10,12,15,20,24,30,40,45,60]);p=P([10,12,15,20,25,30,40]);q=P([5,6,8,10,12,15,20]);m=s*100/p;tot=s*100/q}while(!Number.isInteger(m)||!Number.isInteger(tot)||q>=p||m<50||tot>1200);
 const add=tot-m,e=sol([`Khối lượng muối trong ${m} g dung dịch ${p}% là ${m} × ${p}% = ${s} g. Thêm nước thì lượng muối này không đổi.`,`Dung dịch ${q}% chứa ${s} g muối thì khối lượng dung dịch mới là ${s} : ${q}% = ${tot} g.`,`Lượng nước cần thêm = ${tot} − ${m} = ${add} g.`],`cần thêm ${add} g nước.`,`${tot} g là khối lượng cả dung dịch mới, phải trừ đi ${m} g dung dịch đã có.`);
 return[mc(`Có ${m} g dung dịch muối nồng độ ${p}%. Cần thêm bao nhiêu gam nước để được dung dịch muối nồng độ ${q}%?`,add,[[tot,'đó là khối lượng dung dịch mới, chưa trừ phần đã có'],[s,'đó là khối lượng muối'],[m*(p-q)/100,'nhân khối lượng với hiệu hai nồng độ'],[m,'thêm lượng nước bằng khối lượng dung dịch']],e,fd),[m,p,q]]}),

/* Lãi kép */
gen('pct.laikep',()=>{
 const p=P([5,10,20]),n=p==5?2:P([2,3]),V=P([100,200,500]),tot=V*Math.pow(1+p/100,n),simple=V*(1+n*p/100),
  e=sol([`Lãi kép: cuối mỗi năm, tiền lãi được cộng vào vốn để năm sau tính lãi tiếp.`,...Array.from({length:n},(_,i)=>{const a=V*Math.pow(1+p/100,i),b=V*Math.pow(1+p/100,i+1);return `Năm ${i+1}: ${fd(a)} × ${100+p}% = ${fd(b)} (triệu đồng).`})],`sau ${n} năm có ${fd(tot)} triệu đồng.`,`Lãi đơn (chỉ tính lãi trên vốn ban đầu) cho ${fd(simple)} triệu, thấp hơn lãi kép.`);
 return[mcd(`Gửi ${V} triệu đồng vào ngân hàng với lãi suất ${p}%/năm theo thể thức lãi kép (tiền lãi cuối mỗi năm được cộng vào vốn). Sau ${n} năm, cả vốn lẫn lãi là (triệu đồng):`,tot,[[simple,'tính lãi đơn: lãi các năm sau không tính trên tiền lãi'],[V*n*p/100,'đó mới chỉ là tiền lãi (lãi đơn), chưa cộng vốn'],[V*Math.pow(1+p/100,n-1),'tính thiếu một năm']],e),[V,p,n]]})
);

/* ================= HÌNH PHẲNG ================= */
A('geo',
/* Hình thang */
gen('geo.hinhthang',()=>{
 let a,b,h;do{a=R(8,24);b=R(3,a-2);h=R(4,16)}while((a+b)*h%2);
 const S=(a+b)*h/2,t=R(0,1),
  e=t==0?sol([`Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2.`,`Tổng hai đáy = ${a} + ${b} = ${a+b}.`,`S = ${a+b} × ${h} : 2 = ${S}.`],`${S} cm².`,`Đừng quên chia cho 2 và dùng chiều cao (đường vuông góc với đáy), không phải cạnh bên.`)
  :sol([`S = (đáy lớn + đáy bé) × chiều cao : 2, nên tổng hai đáy = 2 × S : chiều cao.`,`Tổng hai đáy = 2 × ${S} : ${h} = ${a+b}.`,`Đáy lớn = ${a+b} − ${b} = ${a}.`],`đáy lớn dài ${a} cm.`,`2 × S : h là TỔNG hai đáy; phải trừ đáy bé mới ra đáy lớn.`);
 return[t==0?mc(`Hình thang có đáy lớn ${a} cm, đáy bé ${b} cm, chiều cao ${h} cm. Diện tích là (cm²):`,S,[[(a+b)*h,'quên chia cho 2'],[a*h/2,'chỉ dùng một đáy'],[a*b*h/2,'nhân hai đáy thay vì cộng'],[(a+b)/2+h,'cộng thay vì nhân']],e,fd):mc(`Hình thang có diện tích ${S} cm², chiều cao ${h} cm, đáy bé ${b} cm. Đáy lớn dài (cm):`,a,[[a+b,'đó là tổng hai đáy, chưa trừ đáy bé'],[S/h-b,'quên nhân 2 (dùng S : h thay vì 2S : h)'],[S/h,'nhầm S : h là đáy lớn'],[(2*S-b)/h,'trừ đáy bé trước khi chia chiều cao']],e,fd),[t,a,b,h]]})
);

HA('geo',
/* Tăng chiều dài / chiều rộng → diện tích tăng */
gen('geo.hcn_tang',()=>{
 let L,W;do{L=R(8,30);W=R(4,28)}while(L==W);
 const a=P([2,3,4,5]),c=P([2,3,4,5]),d1=a*W,d2=c*L,S=L*W,
  e=sol([`Tăng chiều dài thêm ${a} m (giữ nguyên chiều rộng) thì diện tích tăng thêm một hình chữ nhật kích thước ${a} m × (chiều rộng): ${a} × chiều rộng = ${d1}.`,`Chiều rộng = ${d1} : ${a} = ${W} m.`,`Tương tự, tăng chiều rộng thêm ${c} m thì diện tích tăng ${c} × chiều dài = ${d2}, nên chiều dài = ${d2} : ${c} = ${L} m.`,`Diện tích ban đầu = ${L} × ${W} = ${S} m².`],`${S} m².`,`Phần diện tích tăng thêm không phải diện tích ban đầu; cần tìm từng kích thước trước.`);
 return[mc(`Một hình chữ nhật. Nếu tăng chiều dài thêm ${a} m (giữ nguyên chiều rộng) thì diện tích tăng thêm ${d1} m². Nếu tăng chiều rộng thêm ${c} m (giữ nguyên chiều dài) thì diện tích tăng thêm ${d2} m². Diện tích hình chữ nhật ban đầu là (m²):`,S,[[(L+a)*(W+c),'tính diện tích hình đã tăng cả hai kích thước'],[d1+d2,'cộng hai phần diện tích tăng thêm'],[S+d1,'diện tích sau khi chỉ tăng chiều dài'],[S+d2,'diện tích sau khi chỉ tăng chiều rộng']],e),[a,d1,c,d2]]}),

/* HCN: dài gấp k lần rộng, biết chu vi */
gen('geo.vuon_k',()=>{
 const W=R(4,20),k=P([2,3,4]),L=k*W,Pm=2*(L+W),S=L*W,
  e=sol([`Nửa chu vi = ${Pm} : 2 = ${Pm/2} m = chiều dài + chiều rộng.`,`Chiều dài gấp ${k} lần chiều rộng nên nửa chu vi gồm ${k+1} phần bằng nhau: chiều rộng = ${Pm/2} : ${k+1} = ${W} m.`,`Chiều dài = ${k} × ${W} = ${L} m.`,`Diện tích = ${L} × ${W} = ${S} m².`],`${S} m².`,`Chu vi gồm 2 lần (dài + rộng), nên phải chia đôi trước khi chia thành ${k+1} phần.`);
 return[mc(`Một mảnh vườn hình chữ nhật có chiều dài gấp ${k} lần chiều rộng và chu vi ${Pm} m. Diện tích mảnh vườn là (m²):`,S,[[(Pm/4)**2,'coi mảnh vườn là hình vuông'],[2*S,'nhân đôi diện tích'],[(k+1)*W*W,`coi chiều dài chỉ hơn chiều rộng một đơn vị phần (${k+1} phần)`],[Pm/2*W,'lấy nửa chu vi nhân chiều rộng']],e),[k,Pm]]}),

/* Cắt góc một hình vuông */
gen('geo.cat_goc',()=>{
 const W=R(8,20),L=W+R(2,12),c=R(2,W-3),per=2*(L+W),
  e=sol([`Hình còn lại là hình chữ L. Hai cạnh của phần cắt bỏ nằm trên hai cạnh của hình chữ nhật ban đầu, đồng thời xuất hiện hai cạnh mới bằng ${c} cm.`,`Phần bị mất trên biên: ${c} + ${c} = ${2*c} cm. Phần biên mới thêm vào: ${c} + ${c} = ${2*c} cm.`,`Hai phần này bằng nhau nên chu vi không đổi: 2 × (${L} + ${W}) = ${per} cm.`],`${per} cm.`,`Diện tích thay đổi nhưng chu vi thì không: cắt bỏ một góc vuông không làm chu vi giảm.`);
 return[mc(`Từ một tấm bìa hình chữ nhật dài ${L} cm, rộng ${W} cm, người ta cắt bỏ một hình vuông cạnh ${c} cm ở một góc. Chu vi phần bìa còn lại là (cm):`,per,[[per-2*c,'trừ hai cạnh bị cắt mà quên cộng hai cạnh mới'],[per-4*c,'trừ cả bốn cạnh của hình vuông bị cắt'],[per+2*c,'cộng hai cạnh mới mà quên trừ hai cạnh bị mất'],[L*W-c*c,'đó là diện tích phần còn lại']],e),[L,W,c]]})
);

/* ================= ĐIỂM, ĐOẠN, GÓC ================= */
A('line',
/* Đếm tia */
gen('line.dem_tia',()=>{
 const t=R(0,1),n=R(4,12),ans=t==0?2*n:n*(n-1),
  e=t==0?sol([`Mỗi điểm trên đường thẳng chia đường thẳng thành hai tia đối nhau có gốc là điểm đó.`,`Vậy mỗi điểm cho 2 tia gốc tại điểm đó.`,`Với ${n} điểm có ${n} × 2 = ${2*n} tia.`],`${2*n} tia.`,`Đừng nhầm với số đoạn thẳng ${n*(n-1)/2} (mỗi đoạn có hai đầu mút).`)
  :sol([`Một tia xác định bởi gốc và một điểm khác nằm trên tia. Từ mỗi điểm làm gốc, vẽ tia đi qua ${n-1} điểm còn lại: ${n-1} tia.`,`Không có ba điểm thẳng hàng nên các tia này đều khác nhau.`,`Với ${n} điểm gốc: ${n} × ${n-1} = ${n*(n-1)} tia.`],`${n*(n-1)} tia.`,`Tia AB và tia BA là hai tia khác nhau (khác gốc), nên không chia 2 như khi đếm đoạn thẳng.`);
 return[mc(t==0?`Trên đường thẳng xy lấy ${n} điểm phân biệt. Có bao nhiêu tia nằm trên đường thẳng xy và có gốc là một trong ${n} điểm đó?`:`Cho ${n} điểm phân biệt, không có ba điểm nào thẳng hàng. Vẽ các tia có gốc là một trong ${n} điểm đó và đi qua một điểm khác trong số đó. Có tất cả bao nhiêu tia?`,ans,t==0?[[n,'mỗi điểm chỉ cho một tia'],[n*(n-1)/2,'đó là số đoạn thẳng'],[2*n-2,'bỏ hai tia ngoài cùng']]:[[n*(n-1)/2,'đó là số đoạn thẳng (mỗi cặp điểm cho hai tia chứ không phải một)'],[2*n,'đó là số tia nếu các điểm thẳng hàng'],[n*n,'đếm cả tia từ một điểm qua chính nó']],e),[t,n]]}),

/* M, N trung điểm AB, BC → MN = AC/2 */
gen('line.mn_ac',()=>{
 const L=2*R(6,30),
  e=sol([`M là trung điểm của AB nên MB = AB : 2. N là trung điểm của BC nên BN = BC : 2.`,`B nằm giữa A và C nên M, B, N thẳng hàng theo thứ tự đó, và MN = MB + BN.`,`MN = AB : 2 + BC : 2 = (AB + BC) : 2 = AC : 2 = ${L} : 2 = ${L/2} (cm).`],`MN = ${L/2} cm.`,`Không cần biết vị trí của B: MN luôn bằng một nửa AC.`);
 return[mc(`Cho đoạn thẳng AC dài ${L} cm. B là một điểm nằm giữa A và C. M là trung điểm của AB, N là trung điểm của BC. Độ dài MN là (cm):`,L/2,[[L,'nhầm MN = AC'],[L/3,'chia ba'],[L/4,'chia đôi hai lần'],[L/2+2,'cộng thêm không có cơ sở']],e,fd),[L]]})
);

HA('line',
/* Số góc khi n đường thẳng đồng quy */
gen('line.goc_giao',()=>{
 const n=R(3,7),ans=2*n*(n-1),
  e=sol([`${n} đường thẳng cắt nhau tại O tạo ra ${2*n} tia chung gốc O.`,`Mỗi cặp tia (không đối nhau) tạo một góc. Số cặp tia: ${2*n} × ${2*n-1} : 2 = ${n*(2*n-1)}.`,`Trừ các cặp tia đối nhau (tạo góc bẹt): có ${n} cặp. Số góc = ${n*(2*n-1)} − ${n} = ${ans}.`],`${ans} góc.`,`Đề yêu cầu không kể góc bẹt nên phải trừ ${n} cặp tia đối nhau.`);
 return[mc(`Cho ${n} đường thẳng phân biệt cùng đi qua điểm O. Có bao nhiêu góc có đỉnh O (không kể góc bẹt)?`,ans,[[n*(2*n-1),'đếm cả các góc bẹt'],[n*(n-1),'chỉ đếm một nửa số góc'],[2*n,'đó là số tia'],[n*(n-1)/2,'đó là số cặp đường thẳng']],e),[n]]}),

/* xOz − zOy = β */
gen('line.goc_phangiac',()=>{
 const al=2*R(25,85),be=2*R(3,Math.floor(al/2)-4),xz=(al+be)/2,zy=(al-be)/2,
  e=sol([`Tia Oz nằm giữa Ox và Oy nên xOz + zOy = xOy = ${al}°.`,`Đề cho xOz − zOy = ${be}°.`,`Cộng hai đẳng thức: 2 × xOz = ${al} + ${be} = ${al+be}, nên xOz = ${xz}°.`,`Thử lại: zOy = ${al} − ${xz} = ${zy}°; ${xz} − ${zy} = ${be}.`],`xOz = ${xz}°.`,`${zy}° mới là zOy (góc nhỏ hơn); xOz là góc lớn hơn.`);
 return[mc(`Cho góc xOy = ${al}°. Tia Oz nằm giữa hai tia Ox, Oy sao cho góc xOz lớn hơn góc zOy là ${be}°. Số đo góc xOz là (độ):`,xz,[[zy,'đó là góc zOy (góc nhỏ hơn)'],[al/2,'coi Oz là tia phân giác'],[al-be,'lấy hiệu thay vì giải hệ'],[al+be,'cộng thay vì chia đôi']],e),[al,be]]}),

/* Hai góc kề, hai tia phân giác */
gen('line.goc_mon',()=>{
 const th=P([60,80,100,120,140,150,160,170,90]),
  e=sol([`Gọi xOy = a và yOz = b. Oy nằm giữa Ox, Oz nên a + b = xOz = ${th}°.`,`Om là phân giác của xOy: yOm = a : 2. On là phân giác của yOz: yOn = b : 2.`,`Om, On nằm hai phía của Oy nên mOn = yOm + yOn = (a + b) : 2 = ${th} : 2 = ${th/2}°.`],`mOn = ${th/2}°.`,`Kết quả không phụ thuộc vào a, b riêng lẻ: luôn bằng nửa xOz.`);
 return[mc(`Cho hai góc kề xOy và yOz (tia Oy nằm giữa hai tia Ox, Oz) và xOz = ${th}°. Om là tia phân giác của góc xOy, On là tia phân giác của góc yOz. Số đo góc mOn là (độ):`,th/2,[[th,'nhầm mOn = xOz'],[th/4,'chia đôi hai lần'],[th/3,'chia ba'],[th/2+10,'cộng thêm không có cơ sở']],e,fd),[th]]})
);

/* ================= THỐNG KÊ & XÁC SUẤT ================= */
HA('stat',
/* Trung bình cộng: điểm bài cuối */
gen('stat.tbc',()=>{
 let S4,T,x;do{S4=R(22,36);T=P([7,8,9]);x=5*T-S4}while(x<4||x>10||S4%4==0);
 const m=S4/4,
  e=sol([`Tổng điểm 4 bài đầu = ${fd(m)} × 4 = ${S4}.`,`Muốn trung bình 5 bài là ${T} thì tổng điểm 5 bài = ${T} × 5 = ${5*T}.`,`Điểm bài thứ năm = ${5*T} − ${S4} = ${x}.`],`bài thứ năm cần ${x} điểm.`,`Phải dùng tổng điểm (không dùng trung bình) khi thêm một bài mới.`);
 return[mc(`Bạn Lan có 4 bài kiểm tra với điểm trung bình là ${fd(m)}. Hỏi bài kiểm tra thứ năm Lan cần được bao nhiêu điểm để điểm trung bình của 5 bài là ${T}?`,x,[[T,'nhầm điểm bài thứ năm bằng điểm trung bình mong muốn'],[5*T,'đó là tổng điểm 5 bài'],[x-1,'trừ nhầm 1'],[x+1,'cộng nhầm 1']],e),[S4,T]]}),

/* Thêm bi xanh để xác suất giảm còn 1/n */
gen('stat.xs_themvao',()=>{
 const a=R(3,8),n=P([2,3,4]),b=R(1,(n-1)*a-1),k=(n-1)*a-b,
  e=sol([`Xác suất lấy bi đỏ bằng ${fh(1,n)} nghĩa là số bi đỏ bằng ${fh(1,n)} tổng số bi.`,`Tổng số bi lúc đó = ${a} × ${n} = ${n*a} (viên).`,`Số bi hiện có = ${a} + ${b} = ${a+b}.`,`Số bi xanh cần thêm = ${n*a} − ${a+b} = ${k}.`],`cần thêm ${k} viên bi xanh.`,`Thêm bi xanh làm tổng số bi tăng nhưng số bi đỏ vẫn giữ nguyên ${a}.`);
 return[mc(`Trong hộp có ${a} viên bi đỏ và ${b} viên bi xanh (cùng kích thước). Cần bỏ thêm bao nhiêu viên bi xanh vào hộp để xác suất lấy được viên bi đỏ bằng ${fh(1,n)}?`,k,[[n*a,'đó là tổng số bi sau khi thêm'],[(n-1)*a,'quên trừ số bi xanh có sẵn'],[n*a-b,'quên trừ số bi đỏ'],[k+1,'cộng nhầm 1']],e),[a,b,n]]})
);

/* ================= TOÁN ĐỐ ================= */
HA('word',
/* Tuổi: tổng hiện nay và quan hệ cách đây k năm */
gen('word.tuoi',()=>{
 let c,k,n,M;do{c=R(9,15);k=R(2,Math.min(c-1,7));n=P([4,5,6,7]);M=n*(c-k)+k}while(M>52||M-c<20);
 const S=M+c,
  e=sol([`Cách đây ${k} năm, mỗi người trẻ hơn ${k} tuổi nên tổng số tuổi hai người khi đó = ${S} − 2 × ${k} = ${S-2*k}.`,`Lúc đó tuổi mẹ gấp ${n} lần tuổi con, nên tổng gồm ${n+1} phần: tuổi con khi đó = ${S-2*k} : ${n+1} = ${c-k}.`,`Tuổi con hiện nay = ${c-k} + ${k} = ${c}.`,`Thử lại: mẹ hiện ${M} tuổi, cách đây ${k} năm mẹ ${M-k}, con ${c-k}, và ${M-k} = ${n} × ${c-k}.`],`con hiện nay ${c} tuổi.`,`Cách đây ${k} năm cả hai đều trẻ hơn ${k} tuổi: tổng giảm 2 × ${k}, không phải ${k}.`);
 return[mc(`Hiện nay tổng số tuổi của hai mẹ con là ${S}. Cách đây ${k} năm, tuổi mẹ gấp ${n} lần tuổi con. Tuổi con hiện nay là:`,c,[[S/(n+1),`chia tổng hiện nay theo tỉ số ${n} : 1, quên rằng tỉ số đó chỉ đúng cách đây ${k} năm`],[c-k,`đó là tuổi con cách đây ${k} năm`],[M,'đó là tuổi mẹ hiện nay'],[(S-k)/(n+1)+k,`trừ ${k} (chứ không phải 2 × ${k}) khi lùi về quá khứ`]],e,fd),[S,k,n]]}),

/* Vận tốc trung bình cả đi lẫn về */
gen('word.tbvt',()=>{
 const [v1,v2]=P([[40,60],[30,60],[20,30],[60,90],[24,40],[12,20],[30,45],[50,75],[10,15],[40,24]]),s=lcm(v1,v2),t1=s/v1,t2=s/v2,vtb=2*s/(t1+t2),
  e=sol([`Gọi quãng đường AB là s. Chọn s = ${s} km (bội chung của ${v1} và ${v2}) cho dễ tính.`,`Thời gian đi: ${s} : ${v1} = ${t1} giờ. Thời gian về: ${s} : ${v2} = ${t2} giờ.`,`Cả đi lẫn về: quãng đường = 2 × ${s} = ${2*s} km, thời gian = ${t1} + ${t2} = ${t1+t2} giờ.`,`Vận tốc trung bình = ${2*s} : ${t1+t2} = ${vtb} km/h.`],`vận tốc trung bình là ${vtb} km/h.`,`Vận tốc trung bình = tổng quãng đường : tổng thời gian, không phải trung bình cộng hai vận tốc.`);
 return[mc(`Một ô tô đi từ A đến B với vận tốc ${v1} km/h, rồi quay về A với vận tốc ${v2} km/h (cùng một con đường). Vận tốc trung bình của ô tô trên cả quãng đường đi và về là (km/h):`,vtb,[[(v1+v2)/2,'lấy trung bình cộng hai vận tốc, trong khi thời gian đi mỗi chặng khác nhau'],[v1*v2/(v1+v2),'quên nhân 2 quãng đường (đi và về)'],[Math.abs(v1-v2),'lấy hiệu hai vận tốc'],[Math.min(v1,v2),'lấy vận tốc nhỏ hơn']],e,fd),[v1,v2]]}),

/* Hai vòi: tìm vòi còn lại */
gen('word.voi',()=>{
 let a,t;do{a=R(6,30);t=R(2,a-1)}while((t*a)%(a-t)||t*a/(a-t)==a);
 const b=t*a/(a-t),
  e=sol([`Mỗi giờ vòi A chảy được ${fh(1,a)} bể; cả hai vòi cùng chảy được ${fh(1,t)} bể.`,`Mỗi giờ vòi B chảy được ${fh(1,t)} − ${fh(1,a)} = ${fh(a-t,t*a)} bể.`,`Vòi B chảy một mình đầy bể sau ${t*a} : ${a-t} = ${b} giờ.`],`vòi B cần ${b} giờ.`,`Cộng hai thời gian hay trừ thời gian đều sai: phải cộng/trừ phần bể chảy được trong 1 giờ.`);
 return[mc(`Vòi A chảy một mình đầy bể trong ${a} giờ. Nếu mở cả hai vòi A và B thì sau ${t} giờ đầy bể. Hỏi vòi B chảy một mình thì sau bao nhiêu giờ đầy bể?`,b,[[a-t,'lấy hiệu hai thời gian'],[a+t,'cộng hai thời gian'],[a*t,'nhân hai thời gian'],[b*2,'nhân đôi kết quả']],e),[a,t]]})
);

A('word',
/* Trồng cây: vòng kín / đường thẳng */
gen('word.cay_vong',()=>{
 const d=P([2,3,4,5,6]),n=R(8,30),Pm=d*n,t=P([0,1,2]),
  cfg=[{q:`Người ta trồng cây xung quanh một cái hồ có chu vi ${Pm} m, các cây cách đều nhau ${d} m. Cần tất cả bao nhiêu cây?`,a:n,e:`Đường vòng kín: khoảng cách đầu cũng là khoảng cách cuối nên số cây bằng số khoảng cách = ${Pm} : ${d} = ${n}.`,w:[[n+1,'tính như trồng trên đường thẳng, trồng cả hai đầu'],[n-1,'bỏ bớt một cây'],[2*n,'nhân đôi số cây']]},
   {q:`Người ta trồng cây dọc một con đường thẳng dài ${Pm} m, các cây cách đều nhau ${d} m, trồng ở cả hai đầu đường. Cần tất cả bao nhiêu cây?`,a:n+1,e:`Số khoảng cách = ${Pm} : ${d} = ${n}. Đường thẳng trồng cả hai đầu: số cây = số khoảng cách + 1 = ${n+1}.`,w:[[n,'quên cây ở một đầu'],[n-1,'bỏ cả hai cây ở hai đầu'],[2*n,'nhân đôi số khoảng cách']]},
   {q:`Người ta trồng cây dọc một con đường thẳng dài ${Pm} m, các cây cách đều nhau ${d} m, không trồng ở hai đầu đường. Cần tất cả bao nhiêu cây?`,a:n-1,e:`Số khoảng cách = ${Pm} : ${d} = ${n}. Không trồng ở hai đầu: số cây = số khoảng cách − 1 = ${n-1}.`,w:[[n,'đếm cả một đầu'],[n+1,'đếm cả hai đầu'],[2*n-2,'nhân đôi số cây']]}][t],
  e=sol([`Số khoảng cách giữa hai cây liên tiếp = ${Pm} : ${d} = ${n}.`,cfg.e],`${cfg.a} cây.`,'Số cây phụ thuộc hình dạng đường trồng: vòng kín, thẳng có/không trồng hai đầu.');
 return[mc(cfg.q,cfg.a,cfg.w,e),[t,Pm,d]]}),

/* Tổng và tỉ số */
gen('word.tong_tiso',()=>{
 let a,b;do{a=R(1,7);b=R(2,9)}while(a>=b||gcd(a,b)!=1);
 const k=R(3,15),S=k*(a+b),t=R(0,1),ans=t==0?k*b:k*(b-a),
  e=sol([`Tỉ số của số bé và số lớn là ${fh(a,b)}: số bé gồm ${a} phần, số lớn gồm ${b} phần như nhau.`,`Tổng số phần = ${a} + ${b} = ${a+b} (phần). Giá trị một phần = ${S} : ${a+b} = ${k}.`,t==0?`Số lớn = ${k} × ${b} = ${k*b}.`:`Số lớn = ${k*b}, số bé = ${k*a}; hiệu = ${k*b} − ${k*a} = ${k*(b-a)}.`],t==0?`số lớn là ${k*b}.`:`hiệu hai số là ${k*(b-a)}.`,`Phải chia tổng cho TỔNG SỐ PHẦN (${a+b}), không chia cho ${b}.`);
 return[mc(t==0?`Tổng của hai số là ${S}. Tỉ số của số bé và số lớn là ${fh(a,b)}. Số lớn là:`:`Tổng của hai số là ${S}. Tỉ số của số bé và số lớn là ${fh(a,b)}. Hiệu của hai số là:`,ans,t==0?[[k*a,'đó là số bé'],[k,'đó là giá trị một phần'],[S*b/(a+b+1),'chia cho số phần thiếu hoặc thừa'],[k*(b-a),'đó là hiệu hai số']]:[[k*b,'đó là số lớn'],[k*a,'đó là số bé'],[k,'đó là giá trị một phần'],[S-k*(b-a),'trừ nhầm hiệu khỏi tổng']],e,fd),[a,b,S,t]]})
);

/* ================= ĐƯỜNG TRÒN ================= */
HA('cir',
/* Hình vành khuyên */
gen('cir.vanhkhuyen',()=>{
 const R1=R(6,20),r=R(2,R1-2),S=3.14*(R1*R1-r*r),
  e=sol([`Diện tích hình vành khuyên = diện tích hình tròn lớn − diện tích hình tròn nhỏ.`,`S = 3,14 × ${R1}² − 3,14 × ${r}² = 3,14 × (${R1*R1} − ${r*r}).`,`= 3,14 × ${R1*R1-r*r} = ${fd(S)} (cm²).`],`${fd(S)} cm².`,`R² − r² khác (R − r)²: phải bình phương từng bán kính trước khi trừ.`);
 return[mcd(`Một hình vành khuyên có bán kính ngoài ${R1} cm và bán kính trong ${r} cm. Lấy π = 3,14. Diện tích hình vành khuyên là (cm²):`,S,[[3.14*(R1-r)**2,'bình phương hiệu hai bán kính thay vì hiệu hai bình phương'],[3.14*R1*R1,'đó là diện tích hình tròn lớn'],[3.14*(R1+r)**2,'bình phương tổng hai bán kính'],[2*3.14*(R1-r),'nhầm với chu vi']],e),[R1,r]]}),

/* Nửa hình tròn */
gen('cir.nuahinhtron',()=>{
 const r=R(4,15),t=R(0,1),ans=t==0?3.14*r+2*r:3.14*r*r/2,
  e=t==0?sol([`Chu vi nửa hình tròn gồm cung nửa đường tròn và đường kính.`,`Cung nửa đường tròn = 3,14 × ${r} = ${fd(3.14*r)} (cm) (nửa của 2 × 3,14 × ${r}).`,`Đường kính = 2 × ${r} = ${2*r} (cm). Chu vi = ${fd(3.14*r)} + ${2*r} = ${fd(ans)} (cm).`],`${fd(ans)} cm.`,`Chu vi nửa hình tròn phải cộng cả đường kính (đoạn thẳng bao quanh phần dưới).`)
  :sol([`Diện tích nửa hình tròn = nửa diện tích hình tròn.`,`Diện tích hình tròn = 3,14 × ${r} × ${r} = ${fd(3.14*r*r)} (cm²).`,`Diện tích nửa hình tròn = ${fd(3.14*r*r)} : 2 = ${fd(ans)} (cm²).`],`${fd(ans)} cm².`,`Chia 2 sau khi tính diện tích hình tròn (3,14 × r × r), không chia đôi bán kính.`);
 return[mcd(t==0?`Một nửa hình tròn bán kính ${r} cm (hình giới hạn bởi cung nửa đường tròn và đường kính). Lấy π = 3,14. Chu vi nửa hình tròn là (cm):`:`Một nửa hình tròn bán kính ${r} cm. Lấy π = 3,14. Diện tích nửa hình tròn là (cm²):`,ans,t==0?[[3.14*r,'chỉ tính cung tròn, quên đường kính'],[2*3.14*r+2*r,'tính cả đường tròn (chu vi hình tròn) cộng đường kính'],[3.14*r+r,'cộng bán kính thay vì đường kính']]:[[3.14*r*r,'quên chia đôi'],[3.14*r*r/4,'chia cho 4'],[3.14*r,'nhầm với công thức chu vi']],e),[r,t]]})
);

/* ================= TÍNH ĐỐI XỨNG ================= */
A('axis',
gen('axis.hinh_truc',()=>{
 const S=[['hình chữ nhật (không phải hình vuông)',2],['hình thoi (không phải hình vuông)',2],['hình bình hành (không phải hình chữ nhật, hình thoi)',0],['tam giác đều',3],['hình vuông',4],['hình thang cân (không phải hình chữ nhật)',1],['tam giác cân (không đều)',1],['ngũ giác đều',5],['lục giác đều',6],['tam giác có ba cạnh khác nhau',0]],
  [s,k]=P(S),others=sh(S.filter(([n,kk])=>kk!=k)).slice(0,3),
  e=sol([`Trục đối xứng là đường thẳng chia hình thành hai phần chồng khít khi gấp theo đường đó.`,`${s[0].toUpperCase()+s.slice(1)} có ${k} trục đối xứng${k==0?' (không có trục nào)':''}.`,`Các hình còn lại: ${others.map(([n,kk])=>`${n} có ${kk}`).join('; ')} trục đối xứng.`],`đáp án: ${s}.`,`Hình bình hành thường KHÔNG có trục đối xứng; hình chữ nhật và hình thoi có đúng 2 trục.`);
 return[mc(`Hình nào sau đây có đúng ${k} trục đối xứng?`,s[0].toUpperCase()+s.slice(1),others.map(([n,kk])=>[n[0].toUpperCase()+n.slice(1),`${n} có ${kk} trục đối xứng, không phải ${k}`]),e,String),[s,k]]})
);

/* ================= HÌNH HỌC TRỰC QUAN ================= */
HA('sym',
gen('sym.thetich_tang',()=>{
 const t=R(0,1),k=P([2,3,4,5]),ans=t==0?k**3:k**2,
  e=t==0?sol([`Gọi cạnh ban đầu là a thì thể tích ban đầu là a × a × a.`,`Cạnh mới là ${k}a nên thể tích mới = ${k}a × ${k}a × ${k}a = ${k**3} × a × a × a.`,`Thể tích tăng ${k**3} lần.`],`thể tích tăng ${k**3} lần.`,`Thể tích có 3 chiều nên tăng k³ lần (không phải k lần hay k² lần).`)
  :sol([`Diện tích toàn phần ban đầu là 6 × a × a (6 mặt hình vuông cạnh a).`,`Cạnh mới ${k}a nên diện tích toàn phần mới = 6 × ${k}a × ${k}a = ${k**2} × (6 × a × a).`,`Diện tích toàn phần tăng ${k**2} lần.`],`diện tích toàn phần tăng ${k**2} lần.`,`Diện tích có 2 chiều nên tăng k² lần (k³ là của thể tích).`);
 return[mc(t==0?`Một hình lập phương có độ dài cạnh tăng lên ${k} lần. Thể tích của nó tăng lên bao nhiêu lần?`:`Một hình lập phương có độ dài cạnh tăng lên ${k} lần. Diện tích toàn phần của nó tăng lên bao nhiêu lần?`,ans,t==0?[[k,'chỉ tăng theo một chiều'],[k**2,'đó là tỉ lệ tăng diện tích'],[3*k,'nhân 3 lần số lần tăng cạnh']]:[[k,'chỉ tăng theo một chiều'],[k**3,'đó là tỉ lệ tăng thể tích'],[2*k,'nhân đôi số lần tăng cạnh']],e),[t,k]]}),

gen('sym.bexep',()=>{
 let a,b,c,pq;
 do{a=R(3,8);b=R(2,6);c=R(2,4);pq=P([[1,2],[3,5],[2,3],[3,4],[1,4],[4,5]])}while(a==b||b==c||!Number.isInteger(a*b*c*(pq[1]-pq[0])*1000/pq[1]));
 const [p,q]=pq,V=a*b*c,need=V*(q-p)/q*1000,have=V*p/q*1000,
  e=sol([`Thể tích bể = ${a} × ${b} × ${c} = ${V} m³.`,`Phần chưa có nước = 1 − ${fh(p,q)} = ${fh(q-p,q)} chiều cao, tương ứng ${fh(q-p,q)} thể tích: ${V} × ${fh(q-p,q)} = ${fd(V*(q-p)/q)} m³.`,`Đổi ra lít: ${fd(V*(q-p)/q)} × 1 000 = ${need} lít.`],`cần đổ thêm ${need} lít.`,`1 m³ = 1 000 lít (không phải 100 lít); và phải lấy phần CHƯA có nước.`);
 return[mc(`Một bể nước hình hộp chữ nhật có chiều dài ${a} m, chiều rộng ${b} m, chiều cao ${c} m. Hiện bể đang chứa nước đến ${fh(p,q)} chiều cao của bể. Cần đổ thêm bao nhiêu lít nước để đầy bể? (1 m³ = 1 000 lít)`,need,[[have,'đó là lượng nước hiện có'],[V*(q-p)/q,'chưa đổi từ m³ sang lít'],[V*1000,'đó là thể tích cả bể'],[need/10,'đổi nhầm 1 m³ = 100 lít']],e,fd),[a,b,c,p,q]]})
);
})();
