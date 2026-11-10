/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì II (KNTT)" — tần số, tần số tương đối, ghép nhóm, biểu đồ (l9tk, mã tk3.*)
   và phép thử, không gian mẫu, xác suất (l9xs, mã xs3.*) (v16). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Kiểm chứng: kiem-chung/lop8-9/oracles9c.js */
(()=>{const {add,addH,gn,M,Iq,fg,fh,fq,fr,fd,cf,ng,comb,bar1,hist,pc}=G8H,{F,nzc,ab}=G9X,
gp=a=>`[${a};${a+10})`,                       /* nhóm [a;a+10) */
cnt=(L,v)=>L.filter(x=>x==v).length,
pct=(f,N)=>f*100/N,
PCT=v=>fd(+v.toFixed(2))+'%',
join=L=>L.join('; ');

/* ================= THỐNG KÊ: CƠ BẢN ================= */
add('l9tk',
gn('tk3.dem_mau',()=>{const N=P([16,20,25]),vals=[5,6,7,8,9,10],L=[];
 for(let i=0;i<N;i++)L.push(P(vals.slice(0,5).concat(vals.slice(1))));
 const k=R(0,3),v=P(vals),ge=P([7,8,9]),f=cnt(L,v),mx=Math.max(...vals.map(x=>cnt(L,x))),modes=vals.filter(x=>cnt(L,x)==mx);
 const tb=vals.filter(x=>cnt(L,x)).map(x=>`điểm ${x}: ${cnt(L,x)} lần`).join('; ');
 if(k==3&&modes.length>1)throw 0;
 const st1=`Đếm số lần xuất hiện của từng giá trị trong mẫu: ${tb}. (Tổng ${N} giá trị.)`;
 if(k==0)return[Iq(`Điểm kiểm tra của ${N} học sinh: ${join(L)}. Có bao nhiêu học sinh được điểm ${v}?`,f,[st1,`Tần số của giá trị ${v} là ${f}.`],'',`${f} học sinh`),[k]];
 if(k==1)return[Iq(`Điểm kiểm tra của ${N} học sinh: ${join(L)}. Tính tần số tương đối của giá trị ${v} (đơn vị: %, nhập số thập phân nếu cần).`,+pct(f,N).toFixed(4),[st1,`Tần số của giá trị ${v} là ${f}.`,`Tần số tương đối = ${fh(f,N)}·100% = ${fd(+pct(f,N).toFixed(2))}%.`],'',`${fd(+pct(f,N).toFixed(2))}%`),[k]];
 if(k==2){const c=vals.filter(x=>x>=ge).reduce((s,x)=>s+cnt(L,x),0);
  return[Iq(`Điểm kiểm tra của ${N} học sinh: ${join(L)}. Có bao nhiêu học sinh được từ ${ge} điểm trở lên?`,c,[st1,`Các điểm từ ${ge} trở lên: ${vals.filter(x=>x>=ge).map(x=>`${x} (${cnt(L,x)} lần)`).join('; ')}.`,`Cộng lại: ${vals.filter(x=>x>=ge).map(x=>cnt(L,x)).join(' + ')} = ${c}.`],'',`${c} học sinh`),[k]]}
 const o=vals.filter(x=>x!=modes[0]).map(x=>'điểm '+x);
 return[M(`Điểm kiểm tra của ${N} học sinh: ${join(L)}. Giá trị nào có tần số lớn nhất?`,`điểm ${modes[0]}`,o.slice(0,5),[st1,`Tần số lớn nhất là ${mx}, ứng với điểm ${modes[0]}.`],'',String),[k]]}),

gn('tk3.tstd_bang',()=>{const N=P([20,25,50,100]),vals=[5,6,7,8,9],step=100/N;let f;
 for(let i=0;i<50;i++){const c=[...Array(5)].map(()=>R(1,Math.floor(N/3)));const sum=c.reduce((a,b)=>a+b,0);if(sum<N){c[R(0,4)]+=N-sum;f=c;break}}
 if(!f||f.reduce((a,b)=>a+b,0)!=N||f.some(x=>x<=0))throw 0;
 const i=R(0,4),p=f[i]*step;
 return[M(`Bảng tần số điểm kiểm tra của ${N} học sinh: ${vals.map((v,j)=>`điểm ${v} có ${f[j]} học sinh`).join('; ')}. Tần số tương đối của điểm ${vals[i]} là`,PCT(p),[PCT(f[i]),PCT(100-p),PCT(p+5),PCT(f[i]*step*2)],
  [`Tổng số học sinh là ${f.join(' + ')} = ${N}.`,`Tần số tương đối = ${fh('tần số','tổng số học sinh')}·100%.`,`Với điểm ${vals[i]}: ${fh(f[i],N)}·100% = ${PCT(p)}.`],'',String),[N,f,i]]}),

gn('tk3.tstd_thieu',()=>{const k=sh([5,10,15,20,25,30]).slice(0,4),x=100-k.reduce((a,b)=>a+b,0);if(x<5)throw 0;
 const vals=[5,6,7,8,9],pos=R(0,4),arr=[...k];arr.splice(pos,0,x);
 return[Iq(`Bảng tần số tương đối điểm kiểm tra của một lớp: ${vals.map((v,j)=>`điểm ${v}: ${j==pos?'x':arr[j]}%`).join('; ')}. Tìm x.`,x,
  [`Tổng các tần số tương đối bằng 100%.`,`Ta có ${k.join(' + ')} + x = 100, tức ${k.reduce((a,b)=>a+b,0)} + x = 100.`,`Suy ra x = 100 − ${k.reduce((a,b)=>a+b,0)} = ${x}.`],'',`x = ${x}`),[k,x]]}),

gn('tk3.nhom_dem',()=>{const a0=P([140,150,160]),N=15,L=[];for(let i=0;i<N;i++)L.push(a0+R(0,39));
 const g=R(0,3),lo=a0+10*g,f=L.filter(x=>x>=lo&&x<lo+10).length;if(f==0)throw 0;
 const S=L.slice().sort((p,q)=>p-q),inG=S.filter(x=>x>=lo&&x<lo+10);
 return[Iq(`Chiều cao (cm) của ${N} học sinh: ${join(L)}. Chia số liệu thành các nhóm [${a0};${a0+10}), [${a0+10};${a0+20}), [${a0+20};${a0+30}), [${a0+30};${a0+40}). Có bao nhiêu học sinh thuộc nhóm ${gp(lo)}?`,f,
  [`Nhóm ${gp(lo)} gồm các giá trị x thỏa ${lo} ≤ x < ${lo+10} (lấy ${lo}, không lấy ${lo+10}).`,`Các giá trị thuộc nhóm: ${inG.join('; ')}.`,`Có ${f} giá trị nên tần số của nhóm là ${f}.`],'',`${f} học sinh`),[a0,g]]}),

gn('tk3.so_nhom',()=>{const w=P([2,5,10]),s=w*R(3,10),k=R(3,7),mn=s+R(0,w-1),mx=s+w*(k-1)+R(0,w-1),n=Math.floor((mx-s)/w)+1;
 const ex=[n+1,n-1,n+2,Math.ceil((mx-mn)/w)].filter(v=>v!=n&&v>0);
 return[M(`Số liệu về cân nặng (kg) của một nhóm học sinh có giá trị nhỏ nhất là ${mn} và lớn nhất là ${mx}. Người ta chia thành các nhóm có độ rộng ${w} dạng [${s}; ${s+w}), [${s+w}; ${s+2*w}), ... Cần ít nhất bao nhiêu nhóm để chứa hết các số liệu?`,n,[...new Set(ex)].slice(0,3),
  [`Các nhóm bắt đầu từ ${s}: nhóm thứ k là [${s}+${w}(k−1); ${s}+${w}k).`,`Giá trị lớn nhất ${mx} nằm trong nhóm thứ ${n}: [${s+w*(n-1)}; ${s+w*n}).`,`Do đó cần ${n} nhóm (tính từ nhóm chứa ${s} đến nhóm chứa ${mx}).`],'',String),[w,s,k]]}),

gn('tk3.tstd_nhom_bang',()=>{const N=P([20,25,50,100]),step=100/N,a0=P([140,150,160]);let f;
 for(let i=0;i<60;i++){const c=[R(1,N/2),R(1,N/2),R(1,N/2)],sum=c[0]+c[1]+c[2];if(sum<N){f=[...c,N-sum];break}}
 if(!f||f.some(x=>x<=0))throw 0;const i=R(0,3),p=f[i]*step;
 return[M(`Bảng tần số ghép nhóm chiều cao của ${N} học sinh: ${f.map((v,j)=>`${gp(a0+10*j)}: ${v}`).join('; ')}. Tần số tương đối của nhóm ${gp(a0+10*i)} là`,PCT(p),[PCT(f[i]),PCT(100-p),PCT(p+10),PCT(f[i]*step*2)],
  [`Tổng số học sinh là ${f.join(' + ')} = ${N}.`,`Tần số tương đối của nhóm ${gp(a0+10*i)} là ${fh(f[i],N)}·100% = ${PCT(p)}.`],'',String),[N,f,i]]}),

gn('tk3.cot_doc',()=>{const C=P([{t:'điểm kiểm tra của một lớp',lb:[6,7,8,9,10],q:v=>`Có bao nhiêu học sinh được điểm ${v}?`,o:'học sinh',ax:'điểm'},{t:'số quyển sách mỗi học sinh đã đọc trong một tháng',lb:[1,2,3,4,5],q:v=>`Có bao nhiêu học sinh đọc ${v} quyển sách?`,o:'học sinh',ax:'số quyển'},{t:'số bàn thắng một đội bóng ghi được trong mỗi trận',lb:[0,1,2,3,4],q:v=>`Có bao nhiêu trận đội bóng ghi được ${v} bàn thắng?`,o:'trận đấu',ax:'số bàn thắng'}]),vals=C.lb;let f,N;
 for(let t=0;t<400;t++){f=vals.map(()=>R(2,12));N=f.reduce((a,b)=>a+b,0);if([20,25,40,50].includes(N))break;f=null}
 if(!f)throw 0;const i=R(0,4),k=R(0,2),fig=bar1(f,vals.map(String)),head=`Biểu đồ cột cho biết tần số của ${C.t} (trục ngang: ${C.ax}, đầu mỗi cột ghi số ${C.o}).`;
 if(k==0)return[fg(Iq(`${head} ${C.q(vals[i])}`,f[i],[`Đọc số ghi trên đầu cột ứng với giá trị ${vals[i]}.`,`Cột này ghi ${f[i]} nên có ${f[i]} ${C.o} ứng với giá trị ${vals[i]}.`],'',`${f[i]} ${C.o}`),fig),[k]];
 if(k==1)return[fg(Iq(`${head} Có tất cả bao nhiêu ${C.o} được thống kê?`,N,[`Đọc số ${C.o} ở từng cột: ${f.join('; ')}.`,`Tổng bằng tổng các tần số: ${f.join(' + ')} = ${N}.`],'',`${N} ${C.o}`),fig),[k]];
 const p=pct(f[i],N);
 return[fg(Iq(`${head} Tính tần số tương đối của giá trị ${vals[i]} (đơn vị: %, nhập số thập phân nếu cần).`,+p.toFixed(4),[`Đọc các tần số: ${f.join('; ')}. Tổng số ${C.o} là ${f.join(' + ')} = ${N}.`,`Tần số của giá trị ${vals[i]} là ${f[i]}.`,`Tần số tương đối = ${fh(f[i],N)}·100% = ${fd(+p.toFixed(2))}%.`],'',`${fd(+p.toFixed(2))}%`),fig),[k]]}));

/* ================= THỐNG KÊ: NÂNG CAO ================= */
addH('l9tk',
gn('tk3.hist_tu_n',()=>{const a0=P([140,150,160]),N=P([20,40,60,80,100,200]);let pcs=null;
 for(let i=0;i<100&&!pcs;i++){const c=[R(1,9),R(1,9),R(1,9)].map(v=>v*5),s=c[0]+c[1]+c[2];if(s<100)pcs=[...c,100-s]}
 if(!pcs||pcs[3]%5)throw 0;const L=pcs.map((_,i)=>gp(a0+10*i)),k=R(1,3),sum=pcs.slice(k).reduce((a,b)=>a+b,0),ans=N*sum/100;
 return[fg(Iq(`Biểu đồ tần số tương đối ghép nhóm cho biết chiều cao của ${N} học sinh. Có bao nhiêu học sinh cao từ ${a0+10*k} cm trở lên?`,ans,
  [`Các nhóm có chiều cao từ ${a0+10*k} cm trở lên: ${L.slice(k).join('; ')}.`,`Tổng tần số tương đối của các nhóm này: ${pcs.slice(k).join('% + ')}% = ${sum}%.`,`Số học sinh = ${N}·${sum}% = ${ans}.`],'',`${ans} học sinh`),hist(pcs,L)),[a0,N,k]]}),

gn('tk3.nhom_thieu_tstd',()=>{const N=P([40,50,100,200]),a0=P([140,150,160]);let f=null;
 for(let i=0;i<100&&!f;i++){const c=[R(1,N/4),R(1,N/4),R(1,N/4)],s=c[0]+c[1]+c[2];if(s<N-2)f=[...c,N-s]}
 if(!f)throw 0;const miss=R(0,3),known=f.filter((_,j)=>j!=miss),sk=known.reduce((a,b)=>a+b,0),p=f[miss]*100/N;
 return[Iq(`Bảng tần số ghép nhóm chiều cao của ${N} học sinh có bốn nhóm: ${f.map((v,j)=>`${gp(a0+10*j)}: ${j==miss?'x':v}`).join('; ')}. Tìm tần số tương đối của nhóm ${gp(a0+10*miss)} (đơn vị: %, nhập số thập phân nếu cần).`,+p.toFixed(1),
  [`Tổng các tần số bằng số học sinh: ${known.join(' + ')} + x = ${N}.`,`Suy ra x = ${N} − ${sk} = ${f[miss]}.`,`Tần số tương đối của nhóm ${gp(a0+10*miss)} là ${fh(f[miss],N)}·100% = ${fd(+p.toFixed(1))}%.`],'',`${fd(+p.toFixed(1))}%`),[N,f,miss]]}),

gn('tk3.so_sanh_nhom',()=>{const a0=P([140,150,160]),N=P([40,50,100]);let f=null;
 for(let i=0;i<100&&!f;i++){const c=[R(3,N/2-3),R(3,N/2-3),R(3,N/2-3)],s=c[0]+c[1]+c[2];if(s<N-3)f=[...c,N-s]}
 if(!f)throw 0;const a=R(0,3);let b=R(0,3);if(a==b)throw 0;const d=f[a]-f[b],dp=d*100/N;
 return[Iq(`Bảng tần số ghép nhóm chiều cao của ${N} học sinh: ${f.map((v,j)=>`${gp(a0+10*j)}: ${v}`).join('; ')}. Tần số tương đối của nhóm ${gp(a0+10*a)} lớn hơn tần số tương đối của nhóm ${gp(a0+10*b)} bao nhiêu phần trăm? (đơn vị: %; nhập số thập phân nếu cần)`,+dp.toFixed(1),
  [`Tần số tương đối của nhóm ${gp(a0+10*a)}: ${fh(f[a],N)}·100% = ${fd(+(f[a]*100/N).toFixed(2))}%.`,`Tần số tương đối của nhóm ${gp(a0+10*b)}: ${fh(f[b],N)}·100% = ${fd(+(f[b]*100/N).toFixed(2))}%.`,`Hiệu: ${fd(+(f[a]*100/N).toFixed(2))}% − ${fd(+(f[b]*100/N).toFixed(2))}% = ${ng(+dp.toFixed(1)).replace('.',',')}%.`],'',`${fd(+dp.toFixed(1))}%`),[N,f,a,b]]}));

/* ================= XÁC SUẤT: CƠ BẢN ================= */
const FQ=(n,d)=>fq(n,d),
xx=(n)=>{const o=[];for(let i=1;i<=n;i++)for(let j=1;j<=n;j++)o.push([i,j]);return o},
isP=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true};
/* hai con xúc xắc n mặt (n = 4 hoặc 6): chọn ngẫu nhiên một biến cố, đếm kết quả thuận lợi theo từng giá trị của con thứ nhất */
const EVD=n=>{const sm=R(3,2*n-1),m=R(1,n),d=R(1,n-2),p=R(4,n*(n-1));return[
 [`tổng số chấm bằng ${sm}`,(a,b)=>a+b==sm],[`tổng số chấm nhỏ hơn ${sm}`,(a,b)=>a+b<sm],[`tổng số chấm lớn hơn hoặc bằng ${sm+1}`,(a,b)=>a+b>=sm+1],
 [`tích số chấm lớn hơn hoặc bằng ${p}`,(a,b)=>a*b>=p],['hai mặt có số chấm bằng nhau',(a,b)=>a==b],['hai mặt có số chấm khác nhau',(a,b)=>a!=b],
 ['tổng số chấm là số chẵn',(a,b)=>(a+b)%2==0],['tích số chấm là số lẻ',(a,b)=>a*b%2==1],['tích số chấm là số chẵn',(a,b)=>a*b%2==0],
 [`ít nhất một con xúc xắc có ${m} chấm`,(a,b)=>a==m||b==m],[`số chấm lớn nhất trong hai con bằng ${m}`,(a,b)=>Math.max(a,b)==m],[`số chấm nhỏ nhất trong hai con bằng ${m}`,(a,b)=>Math.min(a,b)==m],
 [`hiệu hai số chấm (số lớn trừ số nhỏ) bằng ${d}`,(a,b)=>Math.abs(a-b)==d],['tổng số chấm là số nguyên tố',(a,b)=>isP(a+b)],['số chấm của con thứ nhất lớn hơn số chấm của con thứ hai',(a,b)=>a>b]]},
XX=n=>{const [desc,pr]=P(EVD(n)),T=n*n,cnt1=[...Array(n)].map((_,i)=>{let c=0;for(let b=1;b<=n;b++)if(pr(i+1,b))c++;return c}),f=cnt1.reduce((a,b)=>a+b,0);
 if(f==0||f==T)throw 0;
 const face=n==4?'xúc xắc 4 mặt cân đối, đồng chất, các mặt ghi số 1; 2; 3; 4':'xúc xắc 6 mặt cân đối, đồng chất';
 return[M(`Tung đồng thời hai con ${face}. Xác suất của biến cố "${desc}" là`,FQ(f,T),[FQ(f+1,T),FQ(f-1,T),FQ(T-f,T),FQ(f,T/2),FQ(f+2,T)].filter(v=>v!=FQ(f,T)&&f-1>=0).slice(0,5),
  [`Mỗi con xúc xắc có ${n} kết quả nên không gian mẫu có ${n}·${n} = ${T} phần tử (a; b) đồng khả năng, với a, b là số chấm của hai con.`,`Đếm số kết quả thuận lợi theo số chấm a của con thứ nhất: ${cnt1.map((c,i)=>`a = ${i+1}: ${c}`).join('; ')}.`,`Số kết quả thuận lợi là ${cnt1.join(' + ')} = ${f}.`,`Xác suất = ${fh(f,T)}${FQ(f,T)==f+'/'+T?'':` = ${FQ(f,T)}`}.`],'',String),[n,f]]};

add('l9xs',
gn('xs3.kgm_rut',()=>{const n=R(3,12),t=R(0,3);
 const L=[[`Một hộp có ${n} quả bóng đánh số từ 1 đến ${n}. Lấy ngẫu nhiên lần lượt hai quả bóng, quả thứ nhất lấy ra không trả lại hộp. Số phần tử của không gian mẫu là`,n*(n-1),[`Mỗi kết quả là một cặp (a; b) có thứ tự với a ≠ b.`,`Quả thứ nhất có ${n} cách chọn, quả thứ hai có ${n-1} cách chọn.`,`Số phần tử của không gian mẫu: ${n}·${n-1} = ${n*(n-1)}.`]],
  [`Một hộp có ${n} quả bóng đánh số từ 1 đến ${n}. Lấy ngẫu nhiên lần lượt hai quả bóng, quả thứ nhất được trả lại hộp trước khi lấy quả thứ hai. Số phần tử của không gian mẫu là`,n*n,[`Mỗi kết quả là một cặp (a; b) có thứ tự, a có thể bằng b.`,`Mỗi lần lấy đều có ${n} cách chọn.`,`Số phần tử của không gian mẫu: ${n}·${n} = ${n*n}.`]],
  [`Một hộp có ${n} quả bóng đánh số từ 1 đến ${n}. Lấy ngẫu nhiên đồng thời hai quả bóng. Số kết quả có thể xảy ra là`,n*(n-1)/2,[`Lấy đồng thời hai quả nên không phân biệt thứ tự: cặp {a; b} và {b; a} là một.`,`Số cách chọn: ${fh(`${n}·${n-1}`,2)} = ${n*(n-1)/2}.`,`Số phần tử của không gian mẫu là ${n*(n-1)/2}.`]],
  [`Tung đồng thời ${n>6?4:n-1} đồng xu cân đối. Số phần tử của không gian mẫu là`,2**(n>6?4:n-1),[`Mỗi đồng xu có 2 kết quả (sấp hoặc ngửa).`,`Với ${n>6?4:n-1} đồng xu, số kết quả là ${Array(n>6?4:n-1).fill(2).join('·')} = ${2**(n>6?4:n-1)}.`,`Số phần tử của không gian mẫu là ${2**(n>6?4:n-1)}.`]]][t],a=L[1];
 return[M(L[0],a,[a+1,a-1,a*2,a+n].filter(v=>v!=a&&v>0).slice(0,4),L[2],'',String),[n,t]]}),

gn('xs3.xx4mat',()=>XX(4)),
gn('xs3.xx6mat',()=>XX(6)),

gn('xs3.vong_quay',()=>{const n=P([8,10,12,15,20]),k=R(0,4);let f,desc;
 const S=[...Array(n)].map((_,i)=>i+1);
 if(k==0){f=S.filter(isP).length;desc='số nguyên tố'}
 else if(k==1){const m=P([3,4,5]);f=S.filter(x=>x%m==0).length;desc=`bội của ${m}`}
 else if(k==2){const m=P([3,4]);f=S.filter(x=>x%m==1).length;desc=`số chia ${m} dư 1`}
 else if(k==3){f=S.filter(x=>Math.sqrt(x)%1==0).length;desc='số chính phương'}
 else{const m=R(2,n-2);f=S.filter(x=>x>m).length;desc=`số lớn hơn ${m}`}
 if(f==0)throw 0;
 return[M(`Một vòng quay có ${n} ô bằng nhau được đánh số từ 1 đến ${n}. Quay vòng quay một lần, kim chỉ ngẫu nhiên vào một ô. Xác suất để kim chỉ vào ô ghi ${desc} là`,FQ(f,n),[FQ(f+1,n),FQ(f,n+1),FQ(n-f,n),FQ(f-1,n)].filter(v=>v!=FQ(f,n)&&!/^-|−/.test(v)).slice(0,5),
  [`Có ${n} ô đồng khả năng nên không gian mẫu có ${n} phần tử.`,`Các ô thuận lợi (${desc}): ${S.filter(x=>k==0?isP(x):k==1?x%(+desc.match(/\d+/)[0])==0:k==2?x%(+desc.match(/\d+/)[0])==1:k==3?Math.sqrt(x)%1==0:x>+desc.match(/\d+/)[0]).join('; ')}. Có ${f} ô.`,`Xác suất = ${fh(f,n)}${FQ(f,n)==f+'/'+n?'':` = ${FQ(f,n)}`}.`],'',String),[n,k,f]]}),

gn('xs3.hai_tui',()=>{const A=sh([2,3,5,7,8]).slice(0,3).sort((a,b)=>a-b),B=sh([2,3,5,7,8]).slice(0,3).sort((a,b)=>a-b),k=R(0,3);let f,desc;
 const O=[];A.forEach(a=>B.forEach(b=>O.push([a,b])));
 if(k==0){f=O.filter(([a,b])=>(a+b)%2==0).length;desc='tổng hai số là số chẵn'}
 else if(k==1){f=O.filter(([a,b])=>a==b).length;desc='hai số ghi trên hai thẻ bằng nhau'}
 else if(k==2){f=O.filter(([a,b])=>a*b%2==1).length;desc='tích hai số là số lẻ'}
 else{const s=P([8,9,10]);f=O.filter(([a,b])=>a+b>=s).length;desc=`tổng hai số lớn hơn hoặc bằng ${s}`}
 if(f==0)throw 0;
 const chk=([a,b])=>k==0?(a+b)%2==0:k==1?a==b:k==2?a*b%2==1:a+b>=+desc.match(/\d+/)[0];
 return[M(`Hai túi I và II, túi I có 3 tấm thẻ ghi các số ${A.join('; ')}, túi II có 3 tấm thẻ ghi các số ${B.join('; ')}. Rút ngẫu nhiên từ mỗi túi một tấm thẻ. Xác suất để ${desc} là`,FQ(f,9),[FQ(f+1,9),FQ(9-f,9),FQ(f,6),FQ(f,3)].filter(v=>v!=FQ(f,9)).slice(0,5),
  [`Mỗi túi có 3 cách rút nên không gian mẫu có 3·3 = 9 kết quả (a; b) đồng khả năng, với a là số ở túi I, b là số ở túi II.`,`Các kết quả thuận lợi: ${O.filter(chk).map(([a,b])=>`(${a}; ${b})`).join(', ')}. Có ${f} kết quả.`,`Xác suất = ${fh(f,9)}${FQ(f,9)==f+'/9'?'':` = ${FQ(f,9)}`}.`],'',String),[A,B,k]]}),

gn('xs3.mau_bi',()=>{const d=R(2,8),x=R(2,8),v=R(1,6),N=d+x+v,k=R(0,2),col=['đỏ','xanh','vàng'],cnts=[d,x,v],i=R(0,2);let f,desc;
 if(k==0){f=cnts[i];desc=`viên bi màu ${col[i]}`}else if(k==1){f=N-cnts[i];desc=`viên bi không phải màu ${col[i]}`}else{const j=(i+1)%3;f=cnts[i]+cnts[j];desc=`viên bi màu ${col[i]} hoặc màu ${col[j]}`}
 return[M(`Một túi đựng ${d} viên bi đỏ, ${x} viên bi xanh và ${v} viên bi vàng, các viên bi có cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi từ túi. Xác suất để lấy được ${desc} là`,FQ(f,N),[FQ(f+1,N),FQ(f,N-1),FQ(N-f,N),FQ(f,N+1)].filter(v=>v!=FQ(f,N)).slice(0,5),
  [`Túi có ${d} + ${x} + ${v} = ${N} viên bi nên không gian mẫu có ${N} phần tử đồng khả năng.`,`Số kết quả thuận lợi cho "${desc}" là ${f}.`,`Xác suất = ${fh(f,N)}${FQ(f,N)==f+'/'+N?'':` = ${FQ(f,N)}`}.`],'',String),[d,x,v,k]]}));

/* ================= XÁC SUẤT: NÂNG CAO ================= */
addH('l9xs',
gn('xs3.xep_hang',()=>{const n=R(4,9),k=R(0,4);let f,tot=1,desc,how;for(let i=2;i<=n;i++)tot*=i;
 if(k==0){f=2*tot/n;desc='hai bạn An và Bình đứng cạnh nhau';how=`Coi An và Bình là một "nhóm": xếp ${n-1} phần tử có ${n-1}! = ${tot/n} cách, và trong nhóm có 2 cách đổi chỗ. Số kết quả thuận lợi là 2·${tot/n} = ${f}.`}
 else if(k==1){f=tot/n;desc='bạn An đứng ở đầu hàng';how=`An đứng đầu hàng thì ${n-1} bạn còn lại xếp tùy ý: ${n-1}! = ${f} cách.`}
 else if(k==2){f=2*tot/(n*(n-1));desc='hai bạn An và Bình đứng ở hai đầu hàng';how=`Chọn An và Bình đứng hai đầu: 2 cách; ${n-2} bạn còn lại xếp ở giữa: ${n-2}! = ${tot/(n*(n-1))} cách. Số kết quả thuận lợi là 2·${tot/(n*(n-1))} = ${f}.`}
 else if(k==3){f=tot-2*tot/n;desc='hai bạn An và Bình không đứng cạnh nhau';how=`Số cách xếp An và Bình đứng cạnh nhau là 2·${n-1}! = ${2*tot/n}. Số cách xếp không đứng cạnh nhau là ${tot} − ${2*tot/n} = ${f}.`}
 else{f=2*tot/n;desc='bạn An đứng ở một trong hai đầu hàng';how=`An đứng ở đầu hàng hoặc cuối hàng: 2 cách; ${n-1} bạn còn lại xếp tùy ý: ${n-1}! = ${tot/n} cách. Số kết quả thuận lợi là 2·${tot/n} = ${f}.`}
 return[Iq(`Xếp ngẫu nhiên ${n} bạn học sinh (trong đó có An và Bình) thành một hàng ngang. Tính xác suất để ${desc}. (Nhập phân số a/b tối giản.)`,fr(f,tot),
  [`Số cách xếp ${n} bạn thành một hàng là ${n}! = ${tot}, đó là số phần tử của không gian mẫu.`,how,`Xác suất = ${fh(f,tot)} = ${FQ(f,tot)}.`],'',FQ(f,tot)),[n,k]]}),

gn('xs3.hai_the_cung_luc',()=>{const n=P([8,9,10,11,12]),k=R(0,2),S=[...Array(n)].map((_,i)=>i+1),pr=[];
 for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)pr.push([S[i],S[j]]);
 let f,desc;
 if(k==0){f=pr.filter(([a,b])=>(a+b)%2==0).length;desc='tổng hai số trên hai thẻ là số chẵn'}
 else if(k==1){f=pr.filter(([a,b])=>a*b%2==0).length;desc='tích hai số trên hai thẻ là số chẵn'}
 else{const s=R(5,n+2);f=pr.filter(([a,b])=>a+b==s).length;desc=`tổng hai số trên hai thẻ bằng ${s}`;if(f==0)throw 0}
 const tot=n*(n-1)/2,ev=S.filter(x=>x%2==0).length,od=n-ev;
 return[Iq(`Một hộp có ${n} tấm thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên đồng thời hai tấm thẻ. Tính xác suất để ${desc}. (Nhập phân số a/b tối giản.)`,fr(f,tot),
  [`Rút đồng thời hai thẻ nên không phân biệt thứ tự: không gian mẫu có ${fh(`${n}·${n-1}`,2)} = ${tot} phần tử.`,
   k==0?`Tổng chẵn khi hai số cùng chẵn hoặc cùng lẻ. Có ${ev} thẻ chẵn và ${od} thẻ lẻ: ${fh(`${ev}·${ev-1}`,2)} + ${fh(`${od}·${od-1}`,2)} = ${ev*(ev-1)/2+od*(od-1)/2}.`:k==1?`Tích chẵn khi có ít nhất một thẻ chẵn. Tích lẻ khi cả hai thẻ lẻ: ${fh(`${od}·${od-1}`,2)} = ${od*(od-1)/2} cách, nên số cách tích chẵn là ${tot} − ${od*(od-1)/2} = ${f}.`:`Các cặp có tổng bằng ${desc.match(/\d+/)[0]}: ${pr.filter(([a,b])=>a+b==+desc.match(/\d+/)[0]).map(([a,b])=>`{${a}; ${b}}`).join(', ')}. Có ${f} cặp.`,
   `Xác suất = ${fh(f,tot)} = ${FQ(f,tot)}.`],'',FQ(f,tot)),[n,k]]}),

gn('xs3.khong_hoan_lai',()=>{const a=R(2,6),b=R(2,7),N=a+b,k=R(0,2);let f,desc;
 if(k==0){f=a*(a-1);desc='cả hai viên đều màu đỏ'}else if(k==1){f=b*(b-1);desc='cả hai viên đều màu xanh'}else{f=2*a*b;desc='hai viên khác màu'}
 if(f==0)throw 0;const tot=N*(N-1);
 return[Iq(`Một túi có ${a} viên bi đỏ và ${b} viên bi xanh có cùng kích thước. Lấy ngẫu nhiên lần lượt hai viên bi, viên thứ nhất không được trả lại túi. Tính xác suất để ${desc}. (Nhập phân số a/b tối giản.)`,fr(f,tot),
  [`Viên thứ nhất có ${N} cách lấy, viên thứ hai có ${N-1} cách lấy nên không gian mẫu có ${N}·${N-1} = ${tot} kết quả.`,
   k==2?`Hai viên khác màu: (đỏ rồi xanh) có ${a}·${b} cách, (xanh rồi đỏ) có ${b}·${a} cách. Tổng cộng ${f} kết quả thuận lợi.`:`Số kết quả thuận lợi: ${k==0?`${a}·${a-1}`:`${b}·${b-1}`} = ${f}.`,
   `Xác suất = ${fh(f,tot)} = ${FQ(f,tot)}.`],'',FQ(f,tot)),[a,b,k]]}),

gn('xs3.so_hai_chu_so',()=>{const k=R(0,7);let f,desc;const S=[];for(let i=10;i<=99;i++)S.push(i);
 if(k==0){const m=P([5,6,7,8,9,11]);f=S.filter(x=>x%m==0).length;desc=`chia hết cho ${m}`}
 else if(k==1){f=S.filter(x=>Math.floor(x/10)==x%10).length;desc='có hai chữ số giống nhau'}
 else if(k==2){f=S.filter(x=>isP(x)).length;desc='là số nguyên tố'}
 else if(k==3){f=S.filter(x=>Math.floor(x/10)+x%10==9).length;desc='có tổng hai chữ số bằng 9'}
 else if(k==4){f=S.filter(x=>Math.floor(x/10)*(x%10)==0).length;desc='có tích hai chữ số bằng 0'}
 else if(k==5){const s=R(3,12);f=S.filter(x=>Math.floor(x/10)+x%10==s).length;desc=`có tổng hai chữ số bằng ${s}`}
 else if(k==6){const u=R(0,9);f=S.filter(x=>x%10==u).length;desc=`có chữ số hàng đơn vị bằng ${u}`}
 else{f=S.filter(x=>Math.floor(x/10)>x%10).length;desc='có chữ số hàng chục lớn hơn chữ số hàng đơn vị'}
 if(f==0)throw 0;
 return[Iq(`Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất để số được chọn ${desc}. (Nhập phân số a/b tối giản.)`,fr(f,90),
  [`Có 90 số tự nhiên có hai chữ số (từ 10 đến 99), đó là số phần tử của không gian mẫu.`,`Số các số thuận lợi cho biến cố (${desc}) là ${f}.`,`Xác suất = ${fh(f,90)} = ${FQ(f,90)}.`],'',FQ(f,90)),[k,f]]}),

gn('xs3.it_nhat',()=>{const t=R(0,1);
 if(t==0){const n=R(3,5),tot=2**n;return[Iq(`Tung ${n} đồng xu cân đối. Tính xác suất để có ít nhất một đồng xu xuất hiện mặt sấp. (Nhập phân số a/b tối giản.)`,fr(tot-1,tot),
  [`Mỗi đồng xu có 2 kết quả nên không gian mẫu có 2^${n} = ${tot} phần tử.`,`Biến cố đối: "không có đồng xu nào sấp" (tất cả đều ngửa), chỉ có 1 kết quả.`,`Xác suất của biến cố đối là ${fh(1,tot)}, nên xác suất cần tìm là 1 − ${fh(1,tot)} = ${FQ(tot-1,tot)}.`],'',FQ(tot-1,tot)),[t]]}
 const a=R(3,7),b=R(2,6),N=a+b,tot=N*(N-1)/2,f=tot-a*(a-1)/2;
 return[Iq(`Một túi có ${a} viên bi đỏ và ${b} viên bi xanh có cùng kích thước. Lấy ngẫu nhiên đồng thời hai viên bi. Tính xác suất để có ít nhất một viên bi xanh. (Nhập phân số a/b tối giản.)`,fr(f,tot),
  [`Không gian mẫu có ${fh(`${N}·${N-1}`,2)} = ${tot} phần tử.`,`Biến cố đối: "cả hai viên đều đỏ", có ${fh(`${a}·${a-1}`,2)} = ${a*(a-1)/2} kết quả; xác suất là ${FQ(a*(a-1)/2,tot)}.`,`Xác suất cần tìm là 1 − ${FQ(a*(a-1)/2,tot)} = ${FQ(f,tot)}.`],'',FQ(f,tot)),[t]]}));
})();
