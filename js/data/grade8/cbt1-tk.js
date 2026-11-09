/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 1" — Chương 5: Dữ liệu và biểu đồ
   Chủ đề l8tk. Mã dạng bài: tk2.*  ·  Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Kiểm chứng: kiem-chung/lop8-9/oracles8b.js */
(()=>{const {add,addH,gn,M,Iq,fg,ng,sv,tx,pie,lch,bar2}=G8H,
/* biểu đồ tranh: rows[i] = số biểu tượng của hàng i, tính theo bội của 0,5 (nửa biểu tượng vẽ bằng nửa hình tròn); lab = tên hàng */
tranh=(rows,lab,u)=>sv(`${rows.map((v,i)=>{const y=24+i*28,full=Math.floor(v),half=v-full>0;
  return tx(46,y+5,lab[i],'end',13)+[...Array(full)].map((_,j)=>`<circle cx="${62+j*24}" cy="${y}" r="9" style="fill:#54a0ff;stroke:none"/>`).join('')+(half?`<path d="M${62+full*24} ${y-9}A9 9 0 0 0 ${62+full*24} ${y+9}Z" style="fill:#54a0ff;stroke:none"/>`:'')}).join('')}<circle cx="22" cy="140" r="6" style="fill:#54a0ff;stroke:none"/>${tx(34,145,'= '+u+' học sinh','start',12)}`),
cut=(n=4)=>{let v;do{v=[];let r=100;for(let i=0;i<n-1;i++){const x=5*R(1,Math.floor((r-5*(n-1-i))/5));v.push(x);r-=x}v.push(r)}while(v.some(x=>x<5));return v},
LS=['Chiều cao của các bạn trong tổ (cm)','Cân nặng của các thành viên trong gia đình (kg)','Thời gian chạy 100 m của các bạn (giây)','Nhiệt độ không khí trung bình mỗi ngày (°C)','Quãng đường từ nhà đến trường của các bạn (km)'],
RR=['Số học sinh của mỗi lớp trong khối 8','Số bút trong hộp bút của mỗi bạn','Số đôi giày của các thành viên trong gia đình','Số sản phẩm bán được mỗi ngày của một cửa hàng','Số lần vi phạm nội quy của từng lớp trong tuần'],
KT=['Tên các hãng điện thoại','Màu sắc yêu thích của các bạn','Tên các môn học em đang học','Quê quán của các bạn trong lớp','Tên các loài chim'],
KO=['Xếp loại học lực (Giỏi, Khá, Trung bình, Yếu)','Mức độ hài lòng (Rất hài lòng, Hài lòng, Bình thường, Không hài lòng)','Hạng huy chương (Vàng, Bạc, Đồng)','Cỡ áo (S, M, L, XL)','Xếp loại hạnh kiểm (Tốt, Khá, Đạt, Chưa đạt)'],
TT=['Lập phiếu hỏi rồi phát cho các bạn trong lớp trả lời','Phỏng vấn trực tiếp từng bạn về môn học yêu thích','Quan sát và đếm số xe đạp trong nhà xe của trường','Dùng thước đo chiều cao của từng bạn trong tổ','Gieo xúc xắc nhiều lần rồi ghi lại kết quả'],
GT=['Tra cứu số liệu dân số trên trang web của Tổng cục Thống kê','Đọc báo để lấy số liệu về giá xăng trong một tuần','Xem dự báo thời tiết 7 ngày tới trên internet','Tìm thông tin về các hãng xe máy trong một tạp chí','Lấy số liệu về diện tích các tỉnh trong sách Địa lí'];

/* ================= CƠ BẢN ================= */
add('l8tk',
gn('tk2.truc_tiep',()=>{const dir=R(0,1),ans=P(dir?TT:GT),ws=sh(dir?GT:TT).slice(0,3),nm=dir?'trực tiếp':'gián tiếp';
 return[M(`Cách thu thập dữ liệu nào sau đây là thu thập dữ liệu ${nm}?`,ans,ws,
  [`Thu thập trực tiếp là thu thập qua quan sát, làm thí nghiệm, lập bảng hỏi, phỏng vấn…; thu thập gián tiếp là lấy dữ liệu từ nguồn có sẵn như sách, báo, internet…`,
   `Cách “${ans}” ${dir?'là tự mình quan sát, đo, hỏi hoặc thử nghiệm để có dữ liệu':'là lấy dữ liệu từ nguồn có sẵn (sách, báo, internet)'} nên là thu thập ${nm}.`],'',String),[dir,ans]]}),
gn('tk2.roi_rac_lien_tuc',()=>{const lt=R(0,1),ans=P(lt?LS:RR),ws=sh(lt?RR:LS).slice(0,3),nm=lt?'liên tục':'rời rạc';
 return[M(`Dữ liệu nào sau đây là số liệu ${nm}?`,ans,ws,
  [`Số liệu liên tục có thể nhận giá trị tuỳ ý trong một khoảng (như chiều cao, cân nặng, nhiệt độ, thời gian…); số liệu rời rạc là số đếm được từng đơn vị (số học sinh, số sản phẩm…).`,
   `“${ans}” ${lt?'có thể nhận giá trị bất kì trong một khoảng, kể cả số thập phân':'là số đếm, chỉ nhận các giá trị 0, 1, 2, … và không có giá trị ở giữa'} nên là số liệu ${nm}.`],'',String),[lt,ans]]}),
gn('tk2.phan_loai3',()=>{const C=[['Dữ liệu không là số, không thể sắp thứ tự',KT],['Dữ liệu không là số, có thể sắp thứ tự',KO],['Số liệu rời rạc',RR],['Số liệu liên tục',LS]],k=R(0,3),item=P(C[k][1]),ans=C[k][0];
 return[M(`Dữ liệu “${item}” thuộc loại nào sau đây?`,ans,C.filter((_,i)=>i!=k).map(c=>c[0]),
  [`Trước hết xem dữ liệu có phải là số hay không. Nếu không là số thì xem có thể sắp xếp theo thứ tự hay không; nếu là số thì xem có phải là số đếm được (rời rạc) hay đo được (liên tục).`,
   [`“${item}” không phải là số và các giá trị không có thứ tự hơn kém.`,`“${item}” không phải là số nhưng các giá trị có thể sắp theo thứ tự (cao – thấp).`,`“${item}” là số đếm được từng đơn vị.`,`“${item}” là số đo, nhận giá trị tuỳ ý trong một khoảng.`][k]],'',String),[k,item]]}),
gn('tk2.bd_tranh',()=>{const u=P([10,20,30,40]),lab=['8A','8B','8C','8D'],rows=lab.map(()=>R(2,13)/2),t=R(0,2),tot=rows.reduce((a,b)=>a+b,0),
 st=`Đọc số biểu tượng ở mỗi hàng: ${lab.map((l,i)=>`lớp ${l}: ${String(rows[i]).replace('.',',')}`).join('; ')}.`;
 if(t==0)return[fg(Iq(`Biểu đồ tranh cho biết số học sinh giỏi của bốn lớp 8A, 8B, 8C, 8D (mỗi hình tròn ứng với ${u} học sinh, nửa hình tròn ứng với ${u/2} học sinh). Tổng số học sinh giỏi của bốn lớp là bao nhiêu?`,tot*u,
  [st,`Tổng số biểu tượng là ${rows.map(v=>String(v).replace('.',',')).join(' + ')} = ${String(tot).replace('.',',')}.`,`Mỗi biểu tượng ứng với ${u} học sinh nên tổng số học sinh giỏi là ${String(tot).replace('.',',')}·${u} = ${tot*u}.`]),tranh(rows,lab,u)),[t,rows,u]];
 const i=R(0,3);if(t==1)return[fg(Iq(`Biểu đồ tranh cho biết số học sinh giỏi của bốn lớp 8A, 8B, 8C, 8D (mỗi hình tròn ứng với ${u} học sinh, nửa hình tròn ứng với ${u/2} học sinh). Lớp ${lab[i]} có bao nhiêu học sinh giỏi?`,rows[i]*u,
  [st,`Lớp ${lab[i]} có ${String(rows[i]).replace('.',',')} biểu tượng, mỗi biểu tượng ứng với ${u} học sinh.`,`Số học sinh giỏi của lớp ${lab[i]} là ${String(rows[i]).replace('.',',')}·${u} = ${rows[i]*u}.`]),tranh(rows,lab,u)),[t,rows,u,i]];
 let j;do j=R(0,3);while(j==i||rows[i]==rows[j]);const hi=rows[i]>rows[j]?i:j,lo=hi==i?j:i;
 return[fg(Iq(`Biểu đồ tranh cho biết số học sinh giỏi của bốn lớp 8A, 8B, 8C, 8D (mỗi hình tròn ứng với ${u} học sinh, nửa hình tròn ứng với ${u/2} học sinh). Lớp ${lab[hi]} có nhiều hơn lớp ${lab[lo]} bao nhiêu học sinh giỏi?`,(rows[hi]-rows[lo])*u,
  [st,`Lớp ${lab[hi]} có ${String(rows[hi]).replace('.',',')} biểu tượng, lớp ${lab[lo]} có ${String(rows[lo]).replace('.',',')} biểu tượng, chênh lệch ${String(rows[hi]-rows[lo]).replace('.',',')} biểu tượng.`,`Số học sinh chênh lệch là ${String(rows[hi]-rows[lo]).replace('.',',')}·${u} = ${(rows[hi]-rows[lo])*u}.`]),tranh(rows,lab,u)),[t,rows,u,hi,lo]]}),
gn('tk2.goc_truc',()=>{const g=R(2,8)*5,d=R(1,3),k=R(2,6),b=g+d,a=g+k*d;
 return[Iq(`Một biểu đồ cột biểu diễn số học sinh nam của hai lớp, nhưng trục đứng không bắt đầu từ 0 mà bắt đầu từ ${g}. Lớp 8A có ${a} học sinh nam, lớp 8B có ${b} học sinh nam. Cột của lớp 8A cao gấp mấy lần cột của lớp 8B?`,k,
  [`Khi trục đứng bắt đầu từ ${g}, chiều cao mỗi cột tỉ lệ với (số liệu − ${g}) chứ không tỉ lệ với số liệu.`,`Cột lớp 8A cao ứng với ${a} − ${g} = ${a-g}; cột lớp 8B cao ứng với ${b} − ${g} = ${b-g}.`,`Tỉ số chiều cao hai cột là ${a-g} : ${b-g} = ${k}, nên cột 8A cao gấp ${k} lần cột 8B (trong khi số liệu thật chỉ gấp ${a}/${b} lần).`]),[g,a,b]]}),
gn('tk2.tb_doan_thang',()=>{const t=R(0,1),l=['T1','T2','T3','T4','T5'];
 if(t==0){const m=R(2,6)*5;let v;do{v=[...Array(4)].map(()=>R(m-15,m+15));v.push(5*m-v.reduce((a,b)=>a+b,0))}while(v.some(x=>x<5||x>90));
  return[fg(Iq(`Biểu đồ đoạn thẳng cho biết doanh thu (triệu đồng) của một cửa hàng trong 5 tháng đầu năm. Doanh thu trung bình mỗi tháng là bao nhiêu triệu đồng?`,m,
   [`Đọc doanh thu từng tháng: ${v.join('; ')} (triệu đồng).`,`Tổng doanh thu 5 tháng là ${v.join(' + ')} = ${5*m}.`,`Doanh thu trung bình mỗi tháng là ${5*m} : 5 = ${m} (triệu đồng).`]),lch(v,l)),[t,v]]}
 const p=P([10,20,25,50]),b0=P([20,40,60,80]),i=R(0,3);if(b0*p%100)throw 0;const nw=b0+b0*p/100;let v=[...Array(5)].map(()=>R(20,90));v[i]=b0;v[i+1]=nw;
 return[fg(Iq(`Biểu đồ đoạn thẳng cho biết doanh thu (triệu đồng) của một cửa hàng trong 5 tháng đầu năm. Doanh thu tháng ${i+2} tăng bao nhiêu phần trăm so với tháng ${i+1}?`,p,
  [`Đọc doanh thu: tháng ${i+1} là ${b0} triệu đồng, tháng ${i+2} là ${nw} triệu đồng.`,`Số tiền tăng thêm là ${nw} − ${b0} = ${nw-b0} (triệu đồng).`,`Phần trăm tăng so với tháng ${i+1} là ${nw-b0} : ${b0} · 100% = ${p}%.`]),lch(v,l)),[t,v,i]]}));

/* ================= NÂNG CAO ================= */
addH('l8tk',
gn('tk2.hai_quat',()=>{const NS=[20,40,60,100,200],n1=P(NS),n2=P(NS),p1=cut(),p2=cut(),L=['Giỏi','Khá','Trung bình','Yếu'],k=R(0,3),c1=n1*p1[k]/100,c2=n2*p2[k]/100;if(c1==c2)throw 0;
 const hi=c1>c2?'8A':'8D',lo=c1>c2?'8D':'8A',ch=Math.abs(c1-c2);
 return[fg(Iq(`Hai biểu đồ hình quạt tròn (hình trên: lớp 8A, hình dưới: lớp 8D) cho biết tỉ lệ các loại học lực học kì 1 của hai lớp. Lớp 8A có ${n1} học sinh, lớp 8D có ${n2} học sinh. Số học sinh ${L[k]} của lớp ${hi} nhiều hơn số học sinh ${L[k]} của lớp ${lo} bao nhiêu em?`,ch,
  [`Học sinh ${L[k]} của lớp 8A chiếm ${p1[k]}%, của lớp 8D chiếm ${p2[k]}%.`,`Lớp 8A: ${n1}·${p1[k]}% = ${c1} học sinh; lớp 8D: ${n2}·${p2[k]}% = ${c2} học sinh.`,`Lớp ${hi} nhiều hơn lớp ${lo}: ${Math.max(c1,c2)} − ${Math.min(c1,c2)} = ${ch} học sinh.`]),pie(p1,L)+pie(p2,L)),[n1,n2,p1,p2,k]]}),
gn('tk2.cot_kep_lop',()=>{const lab=['8A','8B','8C','8D'],nam=lab.map(()=>R(12,28)),nu=lab.map(()=>R(12,28)),df=nam.map((v,i)=>v-nu[i]);if(new Set(df).size<4)throw 0;const mx=df.indexOf(Math.max(...df));if(df[mx]<=0)throw 0;
 return[fg(M(`Biểu đồ cột kép cho biết số học sinh nam (cột xanh) và nữ (cột cam) của bốn lớp 8. Lớp nào có số học sinh nam nhiều hơn số học sinh nữ nhiều nhất?`,'Lớp '+lab[mx],lab.filter((_,i)=>i!=mx).map(l=>'Lớp '+l),
  [`Tính hiệu (nam − nữ) của từng lớp: ${lab.map((l,i)=>`lớp ${l}: ${nam[i]} − ${nu[i]} = ${ng(df[i])}`).join('; ')}.`,`Hiệu lớn nhất là ${df[mx]}, ứng với lớp ${lab[mx]}.`],'',String),bar2(nam,nu,lab,'Nam','Nữ')),[nam,nu]]}),
gn('tk2.quat_hieu',()=>{const N=P([40,60,100,200,400]),p=cut(),L=['Toán','Văn','Anh','Khác'];let i=R(0,3),j=R(0,3);while(i==j||p[i]==p[j]){i=R(0,3);j=R(0,3)}if(p[i]<p[j])[i,j]=[j,i];
 const ci=N*p[i]/100,cj=N*p[j]/100;
 return[fg(Iq(`Biểu đồ hình quạt tròn cho biết môn học yêu thích của ${N} học sinh. Số học sinh thích môn “${L[i]}” nhiều hơn số học sinh thích môn “${L[j]}” bao nhiêu em?`,ci-cj,
  [`Môn “${L[i]}” chiếm ${p[i]}%, môn “${L[j]}” chiếm ${p[j]}% tổng số ${N} học sinh.`,`Số học sinh thích môn “${L[i]}”: ${N}·${p[i]}% = ${ci}; môn “${L[j]}”: ${N}·${p[j]}% = ${cj}.`,`Chênh lệch là ${ci} − ${cj} = ${ci-cj} học sinh.`]),pie(p,L)),[N,p,i,j]]}));
})();
