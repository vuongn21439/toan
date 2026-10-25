/* LỚP 7 · PHẦN 1: Số và Đại số (Chương I, II, VI, VII) */
(()=>{const {fr,fq,fh,add,addH,ps}=G7H,
kf=()=>{let v;do v=R(-6,6);while(!v);return v},
rt=()=>{let a,b;do{b=R(2,9);a=nz()}while(gcd(Math.abs(a),b)!=1);return[a,b]},         /* số hữu tỉ a/b tối giản, khác 0 */
br=(a,b)=>a<0?'('+fq(a,b)+')':fq(a,b),
fw=(n,d)=>[fq(n+1,d),fq(n-1,d),fq(n,d+1),fq(-n,d),fq(d,n||1),fq(n+d,d)],                /* đáp án sai thường gặp */
rp=d=>{const c=[];for(let i=0;i<=d;i++)c.push(i==0||i==d||R(0,2)?kf():0);return c},   /* hệ số đa thức bậc d */
ev=(c,x)=>c.reduceRight((s,a)=>s*x+a,0),
mono=(a,e)=>a+(e==1?'x':'x^'+e);

/* ===== Chương I: Số hữu tỉ ===== */
add('l7sht',
()=>{const[a,b]=rt(),[c,d]=rt(),s=P([1,-1]),n=a*d+s*c*b,m=b*d;return Z(`Tính: ${fq(a,b)} ${s>0?'+':'−'} ${br(c,d)}`,fq(n,m),fw(n,m),`Quy đồng mẫu số ${m}: tử số = ${iz(a*d)} ${s>0?'+':'−'} ${pa(c*b)} = ${iz(n)}, được ${fq(n,m)}.`)},
()=>{const[a,b]=rt(),[c,d]=rt();return Z(`Tính: ${br(a,b)} × ${br(c,d)}`,fq(a*c,b*d),fw(a*c,b*d),`Nhân tử với tử, mẫu với mẫu rồi rút gọn: ${fq(a*c,b*d)}.`)},
()=>{const[a,b]=rt(),[c,d]=rt();return Z(`Tính: ${br(a,b)} : ${br(c,d)}`,fq(a*d,b*c),fw(a*d,b*c),`Chia là nhân với số nghịch đảo: ${fq(a,b)} × ${br(d,c)} = ${fq(a*d,b*c)}.`)},
()=>{let L;do{L=Array.from({length:4},rt)}while(new Set(L.map(([a,b])=>(a/b).toFixed(6))).size<4);const v=L.map(([a,b])=>a/b),k=v.indexOf(Math.max(...v)),s=L.map(([a,b])=>fq(a,b));return Z(`Số lớn nhất trong các số: ${s.join('; ')} là`,s[k],s.filter((_,i)=>i!=k),`Đổi ra số thập phân (làm tròn): ${v.map(x=>iz(ft(x))).join('; ')}. Số lớn nhất là ${s[k]}.`)},
()=>{const a=R(1,3),b=R(2,4),n=R(2,3),s=P([1,-1]);return Z(`Tính: (${fq(s*a,b)})^${n}`,fq((s*a)**n,b**n),[fq(-((s*a)**n),b**n),fq(a**n,b**n),fq(s*a,b),fq(s*a**n,b),fq(s*a,b**n),fq((s*a)**n,b*n),fq((s*a)**n,b),fq(s*a*n,b**n)],`Lũy thừa của phân số: lũy thừa cả tử và mẫu; số âm mũ lẻ cho kết quả âm. Kết quả ${fq((s*a)**n,b**n)}.`)},
()=>{const x=P([2,3,5,7]),m=R(2,6),n=R(2,5),k=P([0,1,2]),r=[m+n,m>n?m-n:m+n+3,m*n][k],t=['Nhân hai lũy thừa cùng cơ số: cộng số mũ.','Chia hai lũy thừa cùng cơ số: trừ số mũ.','Lũy thừa của lũy thừa: nhân số mũ.'][k],q=[`${x}^${m} · ${x}^${n}`,m>n?`${x}^${m} : ${x}^${n}`:`${x}^${m+n+3} : ${x}^${n+3}`,`(${x}^${m})^${n}`][k],e=[m+n,m>n?m-n:m,m*n][k];return Z(`Viết ${q} dưới dạng một lũy thừa:`,`${x}^${e}`,[`${x}^${e+1}`,`${x}^${e*2}`,`${x*x}^${e}`,`${x}^${Math.max(1,e-1)}`,`${x}^${e+2}`],t+` Kết quả ${x}^${e}.`)}
);
addH('l7sht',
()=>{const[a,b]=rt(),[c,d]=rt();return I(`Tìm x, biết: x + ${br(a,b)} = ${br(c,d)}`,fr(c*b-a*d,b*d),`x = ${fq(c,d)} − ${br(a,b)} = ${fq(c*b-a*d,b*d)}.`)},
()=>{const[a,b]=rt(),[c,d]=rt();return I(`Tìm x, biết: ${br(a,b)} · x = ${br(c,d)}`,fr(c*b,d*a),`x = ${fq(c,d)} : ${br(a,b)} = ${fq(c*b,d*a)}.`)},
()=>{const s=P(['0,25','0,75','0,6','0,35','1,2','0,125','0,04','2,5','0,8','1,5']),dg=s.split(',')[1].length,n=+s.replace(',','');return I(`Viết ${s} dưới dạng phân số tối giản (nhập a/b).`,fr(n,10**dg),`${s} = ${n}/${10**dg} = ${fq(n,10**dg)}.`)},
()=>{const x=P([2,3]),a=R(2,5),b=R(2,4),c=R(1,a+b-1);return I(`Tính: ${x}^${a} · ${x}^${b} : ${x}^${c}`,x**(a+b-c),`Cộng, trừ số mũ: ${x}^${a+b-c} = ${x**(a+b-c)}.`)}
);

/* ===== Chương II: Số thực ===== */
const IR=['√2','√3','√5','√7','√10','√11','π'],RA=['√4','√9','√16','√25','√36','√49','0,25','−3/7','1/3','2,5','−7','0'];
add('l7sth',
()=>{const s=R(2,20);return N(`Tính: √${s*s}`,s,`${s}² = ${s*s} nên √${s*s} = ${s}.`)},
()=>{const s=R(2,15);return Z(`Căn bậc hai số học của ${s*s} là`,''+s,[iz(-s),''+s*s,''+(s+1),''+(s-1)],`Căn bậc hai số học là căn không âm: √${s*s} = ${s}. (Số ${s*s} có hai căn bậc hai là ${s} và ${iz(-s)}.)`)},
()=>{const a=P(IR);return Z('Số nào sau đây là số vô tỉ?',a,sh(RA).slice(0,3),`${a} là số thập phân vô hạn không tuần hoàn nên là số vô tỉ. Các số còn lại viết được dạng phân số.`)},
()=>{let n,v;do{n=P([2,3,5,6,7,8,10,11,12,13,15,17,18,19,20,21,22,23]);v=Math.sqrt(n)}while(Math.abs(v*10%1-.5)<.02);const f=x=>(Math.round(x*10)/10).toFixed(1).replace('.',','),r=Math.round(v*10)/10;return Z(`Làm tròn √${n} (≈ ${v.toFixed(3).replace('.',',')}) đến hàng phần mười:`,f(r),[f(r+.1),f(r-.1),f(r+.2),f(r-.2)],`Nhìn chữ số hàng phần trăm để làm tròn lên hay xuống: ${f(r)}.`)},
()=>{let L;do{const n=P([5,6,7,8,10,11,12,13]),b=Math.sqrt(n);L=[['√'+n,b],...[-1,1,2].map(k=>{const v=Math.round((b+k*.4)*10)/10;return[String(v).replace('.',','),v]})]}while(new Set(L.map(x=>x[1].toFixed(2))).size<4);const m=L.reduce((a,b)=>b[1]>a[1]?b:a);return Z(`Số lớn nhất trong các số: ${L.map(x=>x[0]).join('; ')} là`,m[0],L.filter(x=>x!=m).map(x=>x[0]),`So sánh các giá trị gần đúng: ${L.map(x=>x[0]+' ≈ '+f2(x[1])).join('; ')}.`)},
()=>{const T=['ℕ ⊂ ℤ','ℤ ⊂ ℚ','ℚ ⊂ ℝ','√2 ∈ ℝ','−3 ∈ ℤ','π ∈ ℝ','0,5 ∈ ℚ'],F=['ℝ ⊂ ℚ','√2 ∈ ℚ','ℤ ⊂ ℕ','π ∈ ℚ','−3 ∈ ℕ','ℚ ⊂ ℤ','0,5 ∈ ℤ'],a=P(T);return Z('Khẳng định nào sau đây đúng?',a,sh(F).slice(0,3),'Quan hệ giữa các tập số: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ; số vô tỉ như √2, π chỉ thuộc ℝ.')}
);
addH('l7sth',
()=>{const p=R(2,12),q=R(2,12),r=R(2,12);return I(`Tính: √${p*p} + √${q*q} − √${r*r}`,p+q-r,`${p} + ${q} − ${r} = ${p+q-r}.`)},
()=>{const s=R(3,25);return I(`Tìm x > 0, biết x² = ${s*s}`,s,`x = √${s*s} = ${s}.`)},
()=>{const n=R(2,20),s=R(2,12);return I(`Tính: (√${n})² + √${s*s}`,n+s,`(√${n})² = ${n} và √${s*s} = ${s}, tổng ${n+s}.`)},
()=>{const v=R(10000,99999),r=Math.floor((v+50)/100)/100;return I(`Làm tròn số ${(v/1e4).toFixed(4).replace('.',',')} đến hàng phần trăm (nhập số thập phân).`,r.toFixed(2),`Chữ số hàng phần nghìn là ${Math.floor(v/10)%10}: ${Math.floor(v/10)%10>=5?'làm tròn lên':'giữ nguyên'}, được ${r.toFixed(2).replace('.',',')}.`)}
);

/* ===== Chương VI: Tỉ lệ thức và đại lượng tỉ lệ ===== */
const PR=[[3,8,4,6],[3,10,5,6],[4,10,5,8],[4,12,6,8],[5,12,6,10],[8,9,6,12],[6,7,3,14],[2,15,3,10]],   /* a·d = b·c */
DV=[2,3,4,6,8,9,12],
KD=[['Quãng đường và thời gian đi (vận tốc không đổi)',1],['Vận tốc và thời gian đi (quãng đường không đổi)',0],['Số tiền mua vở và số quyển vở (giá không đổi)',1],['Số người làm và số ngày hoàn thành (khối lượng việc không đổi)',0],['Số lít xăng dùng và quãng đường xe chạy (mức tiêu hao không đổi)',1],['Số máy bơm cùng làm và thời gian bơm đầy bể',0]];
add('l7tlt',
()=>{const x=R(2,12),a=R(2,9),m=R(2,5);return N(`Tìm x, biết: ${fh('x',a)} = ${fh(x*m,a*m)}`,x,`x = ${a}·${x*m} : ${a*m} = ${x}.`)},
()=>{const[a,d,b,c]=P(PR);return Z(`Từ đẳng thức ${a}·${d} = ${b}·${c}, ta lập được tỉ lệ thức:`,`${a}/${b} = ${c}/${d}`,[`${a}/${b} = ${d}/${c}`,`${a}/${d} = ${b}/${c}`,`${b}/${a} = ${c}/${d}`],'Từ a·d = b·c suy ra a/b = c/d (tích ngoại = tích trung).')},
()=>{let a=R(1,6),b;do b=R(1,6);while(b==a);const k=R(2,9);return N(`Biết ${fh('x',a)} = ${fh('y',b)} và x + y = ${(a+b)*k}. Tìm x.`,a*k,`${fh('x',a)} = ${fh('y',b)} = ${fh('x + y',a+b)} = ${fh((a+b)*k,a+b)} = ${k}, nên x = ${a}·${k} = ${a*k}.`)},
()=>{const k=R(2,9),x=R(2,12);return P([0,1])?N(`y tỉ lệ thuận với x theo hệ số k = ${k}. Khi x = ${x} thì y bằng`,k*x,`y = k·x = ${k}·${x} = ${k*x}.`):N(`y tỉ lệ thuận với x. Khi x = ${x} thì y = ${k*x}. Hệ số tỉ lệ k bằng`,k,`k = y : x = ${k*x} : ${x} = ${k}.`)},
()=>{const n1=R(2,6),n2=n1+R(1,6),u=R(5,20);return N(`${n1} quyển vở giá ${n1*u} nghìn đồng. Hỏi ${n2} quyển vở như thế giá bao nhiêu nghìn đồng?`,n2*u,`Giá mỗi quyển ${u} nghìn đồng (tỉ lệ thuận): ${n2}·${u} = ${n2*u}.`)},
()=>{const t=P([24,36,48,60,72]),[n1,n2]=sh(DV.filter(d=>t%d==0)).slice(0,2);return N(`${n1} công nhân làm xong một việc trong ${t/n1} ngày. Hỏi ${n2} công nhân (năng suất như nhau) làm xong trong bao nhiêu ngày?`,t/n2,`Số người và số ngày tỉ lệ nghịch: tích không đổi ${n1}·${t/n1} = ${t}, nên ${t} : ${n2} = ${t/n2} ngày.`)},
()=>{const[t,k]=P(KD);return Z(`${t}: hai đại lượng này liên hệ thế nào?`,k?'Tỉ lệ thuận':'Tỉ lệ nghịch',[k?'Tỉ lệ nghịch':'Tỉ lệ thuận','Không tỉ lệ với nhau','Vừa thuận vừa nghịch'],k?'Đại lượng này tăng thì đại lượng kia tăng theo cùng tỉ lệ.':'Đại lượng này tăng thì đại lượng kia giảm, tích hai đại lượng không đổi.')}
);
addH('l7tlt',
()=>{const[a,b,c]=P([[2,3,5],[1,2,3],[2,3,4],[3,4,5],[1,3,6]]),k=R(2,12);return I(`Chia ${(a+b+c)*k} thành ba phần tỉ lệ với ${a}; ${b}; ${c}. Phần lớn nhất bằng bao nhiêu?`,Math.max(a,b,c)*k,`Mỗi phần ứng với ${k}: phần lớn nhất = ${Math.max(a,b,c)}·${k} = ${Math.max(a,b,c)*k}.`)},
()=>{const[a,b]=P([[5,3],[7,4],[4,3],[5,2],[3,2],[7,5]]),k=R(2,9);return I(`Hai số x, y có ${fh('x','y')} = ${fh(a,b)} và x − y = ${(a-b)*k}. Tìm x.`,a*k,`${fh('x',a)} = ${fh('y',b)} = ${fh('x − y',a-b)} = ${k}, nên x = ${a*k}.`)},
()=>{const[x1,x2]=P([[2,3],[3,4],[2,5],[3,5],[4,5]]),m=R(1,6);return I(`Hai đại lượng x và y tỉ lệ nghịch. Khi x = ${x1} thì y = y₁; khi x = ${x2} thì y = y₂; biết y₁ − y₂ = ${m*(x2-x1)}. Tìm y₁.`,m*x2,`x₁·y₁ = x₂·y₂ nên y₁ : y₂ = ${x2} : ${x1}. Mỗi phần ứng với ${m}, suy ra y₁ = ${x2}·${m} = ${m*x2}.`)},
()=>{const[a,b,c]=P([[2,3,4],[1,2,3],[2,3,5],[3,4,5]]),k=R(2,8);return I(`Biết ${fh('x',a)} = ${fh('y',b)} = ${fh('z',c)} và x + y + z = ${(a+b+c)*k}. Tính z.`,c*k,`Mỗi phần ứng với ${(a+b+c)*k} : ${a+b+c} = ${k}, nên z = ${c}·${k} = ${c*k}.`)}
);

/* ===== Chương VII: Đa thức một biến ===== */
add('l7dt',
()=>{const a=R(2,5),b=R(2,5),x=P([-4,-3,-2,-1,1,2,3,4]),y=R(-4,4);return N(`Tính giá trị của ${a}x + ${b}y tại x = ${iz(x)}, y = ${iz(y)}`,a*x+b*y,`Thay số: ${a}·${pa(x)} + ${b}·${pa(y)} = ${iz(a*x+b*y)}.`,iz,true)},
()=>{const c=rp(R(2,5));return N(`Bậc của đa thức ${ps(c)} là`,c.length-1,'Bậc của đa thức là số mũ lớn nhất của biến trong đa thức đã thu gọn.')},
()=>{const c=rp(R(2,4)),k=P([0,1]);return N(`Hệ số ${k?'cao nhất':'tự do'} của đa thức ${ps(c)} là`,k?c[c.length-1]:c[0],k?'Hệ số cao nhất là hệ số của hạng tử có bậc cao nhất.':'Hệ số tự do là hạng tử không chứa biến.',iz,true)},
()=>{const p=rp(3),q=rp(3),s=p.map((v,i)=>v+q[i]),w=sh([0,1,2,3].flatMap(i=>[-2,-1,1,2].map(d=>ps(s.map((v,j)=>j==i?v+d:v)))));return Z(`Cho P(x) = ${ps(p)} và Q(x) = ${ps(q)}. Tính P(x) + Q(x).`,ps(s),w,'Cộng các hệ số của những hạng tử cùng bậc (hạng tử đồng dạng).')},
()=>{const p=rp(3),q=rp(3),s=p.map((v,i)=>v-q[i]),w=sh([0,1,2,3].flatMap(i=>[-2,-1,1,2].map(d=>ps(s.map((v,j)=>j==i?v+d:v)))));return Z(`Cho P(x) = ${ps(p)} và Q(x) = ${ps(q)}. Tính P(x) − Q(x).`,ps(s),w,'Trừ các hệ số của những hạng tử cùng bậc; chú ý đổi dấu các hạng tử của Q(x).')},
()=>{const r=R(2,9);return P([0,1])?Z(`Số nào sau đây là nghiệm của đa thức x^2 − ${r*r}?`,''+r,[''+r*r,''+2*r,''+(r+1),''+(r+3),''+(r*r+1)],`P(${r}) = ${r}² − ${r*r} = 0 nên x = ${r} là nghiệm.`):N(`Nghiệm của đa thức ${r}x − ${r*r} là`,r,`${r}x − ${r*r} = 0 nên x = ${r*r} : ${r} = ${r}.`)},
()=>{const a=R(2,6),b=R(2,6),m=R(1,4),n=R(1,4);return Z(`Tích ${mono(a,m)} · ${mono(b,n)} bằng`,mono(a*b,m+n),[mono(a+b,m+n),mono(a*b,m*n+(m*n==m+n?1:0)),mono(a*b,m+n+1),mono(a*b,Math.abs(m-n)+1)],`Nhân hệ số với hệ số, cộng số mũ của biến: ${mono(a*b,m+n)}.`)}
);
addH('l7dt',
()=>{const c=rp(3),x=P([-3,-2,-1,1,2,3]);return I(`Cho P(x) = ${ps(c)}. Tính P(${iz(x)}).`,ev(c,x),`Thay x = ${iz(x)} vào P(x) rồi tính: P(${iz(x)}) = ${iz(ev(c,x))}.`)},
()=>{const m=R(2,7),r=nz();return I(`Tìm nghiệm của đa thức ${ps([-m*r,m])}.`,r,`${ps([-m*r,m])} = 0 nên x = ${iz(m*r)} : ${m} = ${iz(r)}.`)},
()=>{const c=rp(4);return I(`Tính tổng các hệ số của đa thức ${ps(c)}.`,c.reduce((a,b)=>a+b,0),'Tổng các hệ số chính là giá trị của P(1): cộng tất cả hệ số lại.')},
()=>{const r=R(1,5),m=R(r+1,9);return I(`Đa thức P(x) = x^2 − ${m}x + c nhận x = ${r} làm nghiệm. Tìm c.`,r*(m-r),`P(${r}) = 0: ${r*r} − ${m*r} + c = 0, suy ra c = ${r*(m-r)}.`)}
);
})();
