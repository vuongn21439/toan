/* LỚP 7 · Số thực — bổ sung từ "Cơ bản và nâng cao Toán 7 tập 1 – Đại số" (chuyên đề 3: số thập phân, làm tròn, căn bậc hai, số thực, phần nguyên).
   11 dạng Cơ bản + 5 dạng Nâng cao. Lời giải từng bước; số thập phân, làm tròn tính chính xác bằng BigInt (không dùng số thực dấu phẩy động). */
(()=>{
const {mc,sol,fd,ng}=BK,gen=G7X.gen,fh=G7H.fh,add=G7H.add,addH=G7H.addH,
 {Fr,fadd,fmul,neg,cmp,S,pr,lin,bd,rnd,isqrt,rng}=G7X,
 wr=(arr,res)=>arr.filter(w=>cmp(w,res)!=0).map(S),
 /* phân tích ra thừa số nguyên tố, ví dụ 12 → "2^2 · 3" */
 fac=n=>{const o=[];let m=n;for(let p=2;p*p<=m;p++){let c=0;while(m%p==0){m/=p;c++}if(c)o.push(c>1?`${p}^${c}`:`${p}`)}if(m>1)o.push(`${m}`);return o.join(' · ')||'1'},
 fin=d=>{while(d%2==0)d/=2;while(d%5==0)d/=5;return d==1},
 /* chu kì của a/b (b nguyên tố cùng nhau với 10, a < b) */
 per=(a,b)=>{let r=a%b,s='';const seen={};while(r&&!(r in seen)){seen[r]=1;r*=10;s+=Math.floor(r/b);r%=b}return s},
 fl=(a,b)=>Math.floor(a/b),
 /* bỏ các phần tử có cùng giá trị (key) */
 uniq=(a,key)=>{const s=new Set();return a.filter(z=>{const k=String(key(z));if(s.has(k))return false;s.add(k);return true})};

/* ================= CƠ BẢN ================= */
add('l7sth',

/* Phân số nào viết được thành số thập phân hữu hạn */
gen('sth.huu_han',()=>{
 const base=P([[1,2],[3,4],[7,20],[9,25],[3,8],[11,40],[13,50],[7,5],[17,20],[19,25],[1,4],[3,5],[9,8]]),m=P([1,3,3,6,7,9,12]),cor=[base[0]*m,base[1]*m],
  dens=[3,6,7,9,11,12,13,14,15,18,21,22,24,30,33,35],w=[];
 for(let t=0;w.length<3&&t<80;t++){const d=P(dens),n=R(1,d+6);if(gcd(n,d)!=1)continue;if(!w.some(z=>z[0]==n&&z[1]==d))w.push([n,d])}
 if(w.length<3)throw 0;
 let k=0;while((base[0]*10**k)%base[1])k++;
 const dec=bd(BigInt(base[0])*10n**BigInt(k)/BigInt(base[1]),k),
  line=([n,d])=>{const g=gcd(n,d),rn=n/g,rd=d/g;return`${n}/${d}${g>1?` = ${rn}/${rd}`:' (đã tối giản)'}: mẫu ${rd}${fac(rd)==String(rd)?'':' = '+fac(rd)} ⟹ ${fin(rd)?'chỉ có thừa số 2 và 5, viết được thành số thập phân hữu hạn':'có thừa số khác 2 và 5, là số thập phân vô hạn tuần hoàn'}.`},
  e=sol([`Rút gọn phân số về tối giản rồi xét mẫu: nếu mẫu chỉ có các thừa số nguyên tố 2 và 5 thì phân số viết được thành số thập phân hữu hạn; nếu có thừa số nguyên tố khác thì là số thập phân vô hạn tuần hoàn.`,
   [cor,...w].map(line).join('<br>')],`${cor[0]}/${cor[1]} = ${dec}.`);
 return[mc(`Phân số nào sau đây viết được dưới dạng số thập phân hữu hạn?`,`${cor[0]}/${cor[1]}`,w.map(z=>`${z[0]}/${z[1]}`),e,String),[cor,w]]}),

/* Viết số thập phân tuần hoàn thành phân số */
gen('sth.tuan_hoan_phan_so',()=>{
 const t=R(0,2);let txt,res,steps,w;
 if(t==0){const a=R(1,8);txt=`0,(${a})`;res=Fr(a,9);
  steps=[`Đặt x = ${txt}. Chu kì có 1 chữ số nên nhân hai vế với 10: 10x = ${a},(${a}).`,`Trừ vế theo vế: 10x − x = ${a},(${a}) − 0,(${a}) = ${a}, tức 9x = ${a}.`,`x = ${a}/9${res[1]!=9?` = ${S(res)}`:''}.`];
  w=[Fr(a,10),Fr(a,90),Fr(a,99),Fr(9,a)]}
 else if(t==1){const ab=R(5,98),s=String(ab).padStart(2,'0');txt=`0,(${s})`;res=Fr(ab,99);
  steps=[`Đặt x = ${txt}. Chu kì có 2 chữ số nên nhân hai vế với 100: 100x = ${s},(${s}).`,`Trừ vế theo vế: 100x − x = ${s},(${s}) − 0,(${s}) = ${ab}, tức 99x = ${ab}.`,`x = ${ab}/99${res[1]!=99?` = ${S(res)}`:''}.`];
  w=[Fr(ab,100),Fr(ab,90),Fr(ab,9),Fr(ab,999)]}
 else{const a=R(1,8);txt=`0,0(${a})`;res=Fr(a,90);
  steps=[`Đặt x = ${txt}. Nhân hai vế với 10 để chu kì nằm ngay sau dấu phẩy: 10x = 0,(${a}).`,`Ta có 0,(${a}) = ${a}/9 (vì 9 × 0,(${a}) = ${a}). Do đó 10x = ${a}/9.`,`x = ${a}/9 : 10 = ${a}/90${res[1]!=90?` = ${S(res)}`:''}.`];
  w=[Fr(a,9),Fr(a,99),Fr(a,100),Fr(a,10)]}
 return[mc(`Viết số thập phân vô hạn tuần hoàn ${txt} dưới dạng phân số tối giản.`,S(res),wr(w,res),sol(steps,`${txt} = ${S(res)}.`),String),[t,txt]]}),

/* Làm tròn số thập phân hoặc số nguyên lớn */
gen('sth.lam_tron',()=>{
 if(R(0,2)){ /* số thập phân, 4 chữ số sau dấu phẩy */
  const N=BigInt(R(0,99))*10000n+BigInt(R(1000,9999)),k=R(0,3),nm=['hàng đơn vị','hàng phần mười','hàng phần trăm','hàng phần nghìn'][k],
   t4=10n**BigInt(4-k),ans=rnd(N,10000,k),dig=Number((N/(t4/10n))%10n),trunc=N/t4,val=(n,kk)=>n*10n**BigInt(4-kk),eq=(n,kk)=>val(n,kk)==val(ans,k);
  const w=[[trunc,k],[ans+1n,k],[ans-1n,k]];if(k<3)w.push([rnd(N,10000,k+1),k+1]);if(k>0)w.push([rnd(N,10000,k-1),k-1]);
  const ws=uniq(w.filter(z=>z[0]>=0n&&!eq(z[0],z[1])),z=>val(z[0],z[1])).map(z=>bd(z[0],z[1]));
  const e=sol([`Làm tròn đến ${nm}: giữ lại ${k} chữ số sau dấu phẩy. Chữ số ngay sau vị trí đó là ${dig}.`,
   dig>=5?`Vì ${dig} ≥ 5 nên ta tăng chữ số cuối cùng được giữ lại thêm 1 đơn vị, rồi bỏ các chữ số còn lại.`:`Vì ${dig} < 5 nên ta giữ nguyên các chữ số đứng trước và bỏ các chữ số còn lại.`],`${bd(N,4)} ≈ ${bd(ans,k)}.`);
  return[mc(`Làm tròn số ${bd(N,4)} đến ${nm}, ta được:`,bd(ans,k),ws,e,String),['dec',String(N),k]]}
 /* số nguyên 5 chữ số: làm tròn đến chục, trăm, nghìn */
 const M=R(10000,99999),j=R(1,3),nm=['hàng chục','hàng trăm','hàng nghìn'][j-1],u=10n**BigInt(j),B=BigInt(M),ans=((B+u/2n)/u)*u,tr=(B/u)*u,
  dig=Math.floor(M/10**(j-1))%10,w=[tr,ans+u,ans-u];
 if(j<3)w.push(((B+u*5n)/(u*10n))*(u*10n));if(j>1)w.push(((B+u/20n)/(u/10n))*(u/10n));
 const ws=[...new Set(w.filter(v=>v!=ans&&v>0n).map(String))],
  e=sol([`Làm tròn đến ${nm}: giữ lại các chữ số từ ${nm} trở lên, các chữ số bên phải được thay bằng 0. Chữ số ngay bên phải ${nm} là ${dig}.`,
   dig>=5?`Vì ${dig} ≥ 5 nên tăng chữ số ở ${nm} thêm 1 đơn vị, các chữ số bên phải thay bằng 0.`:`Vì ${dig} < 5 nên giữ nguyên chữ số ở ${nm}, các chữ số bên phải thay bằng 0.`],`${M} ≈ ${ans}.`);
 return[mc(`Làm tròn số ${M} đến ${nm}, ta được:`,String(ans),ws,e,String),['int',M,j]]}),

/* Làm tròn kết quả phép chia */
gen('sth.lam_tron_thuong',()=>{
 const a=R(10,200),b=P([3,6,7,9,11,12,13,14,15,17,18,19]);if(a%b==0)throw 0;
 const k=R(1,3),nm=['hàng phần mười','hàng phần trăm','hàng phần nghìn'][k-1],ans=rnd(a,b,k),tr=BigInt(a)*10n**BigInt(k)/BigInt(b),
  show=bd(BigInt(a)*10n**4n/BigInt(b),4),dig=Number((BigInt(a)*10n**BigInt(k+1)/BigInt(b))%10n),
  eq=(n,kk)=>n*10n**BigInt(3-kk)==ans*10n**BigInt(3-k),w=[[tr,k],[ans+1n,k],[ans-1n,k]];if(k<3)w.push([rnd(a,b,k+1),k+1]);if(k>1)w.push([rnd(a,b,k-1),k-1]);
 const ws=uniq(w.filter(z=>z[0]>=0n&&!eq(z[0],z[1])),z=>z[0]*10n**BigInt(3-z[1])).map(z=>bd(z[0],z[1])),
  e=sol([`Thực hiện phép chia (đặt tính hoặc dùng máy tính) lấy nhiều chữ số thập phân: ${a} : ${b} = ${show}…`,
   `Làm tròn đến ${nm}: giữ ${k} chữ số sau dấu phẩy; chữ số ngay sau đó là ${dig}${dig>=5?', không nhỏ hơn 5 nên tăng chữ số cuối được giữ lại thêm 1':', nhỏ hơn 5 nên giữ nguyên chữ số cuối được giữ lại'}.`],`${a} : ${b} ≈ ${bd(ans,k)}.`);
 return[mc(`Làm tròn kết quả phép tính ${a} : ${b} đến ${nm}, ta được:`,bd(ans,k),ws,e,String),[a,b,k]]}),

/* Làm tròn căn bậc hai */
gen('sth.lam_tron_can',()=>{
 const n=P([2,3,5,6,7,8,10,11,12,13,15,17,19,20,21,22,23,24,26,27,28,30,31,33,35,37,40,41,43,45,47,50]),k=R(1,3),nm=['hàng phần mười','hàng phần trăm','hàng phần nghìn'][k-1],
  f=(kk)=>{const m=isqrt(BigInt(n)*10n**BigInt(2*kk));return(4n*BigInt(n)*10n**BigInt(2*kk)>=(2n*m+1n)**2n)?m+1n:m},
  ans=f(k),tr=isqrt(BigInt(n)*10n**BigInt(2*k)),show=bd(isqrt(BigInt(n)*10n**8n),4),dig=Number(isqrt(BigInt(n)*10n**BigInt(2*(k+1)))%10n),
  eq=(v,kk)=>v*10n**BigInt(3-kk)==ans*10n**BigInt(3-k),w=[[tr,k],[ans+1n,k],[ans-1n,k]];if(k<3)w.push([f(k+1),k+1]);if(k>1)w.push([f(k-1),k-1]);
 const ws=uniq(w.filter(z=>z[0]>=0n&&!eq(z[0],z[1])),z=>z[0]*10n**BigInt(3-z[1])).map(z=>bd(z[0],z[1])),
  e=sol([`Dùng máy tính: √${n} = ${show}… (số thập phân vô hạn không tuần hoàn).`,
   `Làm tròn đến ${nm}: giữ ${k} chữ số sau dấu phẩy; chữ số ngay sau đó là ${dig}${dig>=5?', không nhỏ hơn 5 nên tăng chữ số cuối được giữ lại thêm 1':', nhỏ hơn 5 nên giữ nguyên chữ số cuối được giữ lại'}.`],`√${n} ≈ ${bd(ans,k)}.`);
 return[mc(`Làm tròn số √${n} đến ${nm}, ta được:`,bd(ans,k),ws,e,String),[n,k]]}),

/* Căn bậc hai của phân số và số thập phân */
gen('sth.can_phan_so',()=>{
 if(R(0,1)){
  let p,q;do{p=R(1,12);q=R(2,12)}while(gcd(p,q)!=1||p==q);const res=Fr(p,q),
   e=sol([`Căn bậc hai của một phân số bằng căn của tử chia căn của mẫu: √(${p*p}/${q*q}) = √${p*p} / √${q*q}.`,`√${p*p} = ${p} (vì ${p}² = ${p*p}); √${q*q} = ${q} (vì ${q}² = ${q*q}).`,`Vậy √(${p*p}/${q*q}) = ${p}/${q}.`],`${p}/${q}.`);
  return[mc(`Tính: √(${p*p}/${q*q})`,S(res),wr([Fr(p*p,q*q),Fr(p,q*q),Fr(p*p,q),Fr(q,p)],res),e,String),['f',p,q]]}
 let u;const ee=R(1,2);do{u=R(2,19)}while(u%10==0);
 const rad=bd(BigInt(u*u),2*ee),den=10**(2*ee),ans=bd(BigInt(u),ee),
  e=sol([`Viết số thập phân dưới dạng phân số: ${rad} = ${u*u}/${den}.`,`√(${u*u}/${den}) = √${u*u} / √${den} = ${u}/${10**ee}.`,`${u}/${10**ee} = ${ans}.`],`${ans}.`),
  w=[rad,bd(BigInt(u),ee+1),ee>1?bd(BigInt(u),ee-1):String(u),bd(BigInt(2*u),ee+1)];
 return[mc(`Tính: √${rad}`,ans,[...new Set(w)].filter(v=>v!=ans),e,String),['d',u,ee]]}),

/* (x − a)² = k²  hoặc  x² = p²/q² */
gen('sth.tim_x_binh_phuong',()=>{
 if(R(0,1)){
  let a,k;do{a=R(-6,6);k=R(1,9)}while(!a);const A=a+k,B=a-k,s=(u,v)=>`x = ${ng(u)} hoặc x = ${ng(v)}`,
   e=sol([`(${lin(a)})² = ${k*k} = ${k}² nên ${lin(a)} = ${k} hoặc ${lin(a)} = −${k}.`,`${lin(a)} = ${k} ⟹ x = ${k} + ${pa(a)} = ${A}.`,`${lin(a)} = −${k} ⟹ x = −${k} + ${pa(a)} = ${B}.`],`${s(A,B)}.`);
  return[mc(`Tìm x, biết: (${lin(a)})^2 = ${k*k}`,s(A,B),[`chỉ x = ${ng(A)}`,`chỉ x = ${ng(B)}`,s(k-a,-k-a),s(k,-k)],e,String),['a',a,k]]}
 let p,q;do{p=R(1,9);q=R(2,10)}while(gcd(p,q)!=1||p==q);
 const e=sol([`x² = ${p*p}/${q*q} = (${p}/${q})² nên x = ${p}/${q} hoặc x = −${p}/${q}.`,`Vì (${p}/${q})² = (−${p}/${q})² = ${p*p}/${q*q}, cả hai giá trị đều thỏa.`],`x = ${p}/${q} hoặc x = −${p}/${q}.`);
 return[mc(`Tìm x, biết: x^2 = ${p*p}/${q*q}`,`x = ${p}/${q} hoặc x = −${p}/${q}`,[`chỉ x = ${p}/${q}`,`chỉ x = −${p}/${q}`,`x = ${p*p}/${q*q} hoặc x = −${p*p}/${q*q}`,`x = ${p}/${q*q} hoặc x = −${p}/${q*q}`],e,String),['q',p,q]]}),

/* Đếm số vô tỉ trong một danh sách */
gen('sth.so_vo_ti',()=>{
 const sq=[4,9,16,25,36,49,64,81,100,121,144],ns=[2,3,5,6,7,8,10,11,12,13,15,17,20],
  rat=[{t:'√'+P(sq),r:1},{t:'−√'+P(sq),r:1},{t:'0,(3)',w:'0,(3) = 1/3 là số hữu tỉ'},{t:'22/7',w:'22/7 là một phân số nên là số hữu tỉ'},{t:'3,14',w:'3,14 là số thập phân hữu hạn nên là số hữu tỉ'},{t:'−5',w:'−5 là số nguyên nên là số hữu tỉ'},{t:'0,(12)',w:'0,(12) là số thập phân vô hạn tuần hoàn nên là số hữu tỉ'},{t:'1,5',w:'1,5 = 3/2 là số hữu tỉ'}],
  irr=[...ns.map(v=>({t:'√'+v,i:v})),{t:'π',w:'π là số vô tỉ'},...ns.slice(0,6).map(v=>({t:'−√'+v,i:v}))],
  k=R(1,4),pick=[...sh(irr).slice(0,k),...sh(rat).slice(0,6-k)],list=sh(pick);
 const why=z=>z.i?`${z.t} là số vô tỉ vì ${z.i} không là số chính phương`:z.r?`${z.t} = ${z.t.startsWith('−')?'−':''}${Math.sqrt(+z.t.replace(/[^\d]/g,''))} là số hữu tỉ`:z.w,
  e=sol([`Số vô tỉ là số thập phân vô hạn không tuần hoàn (căn bậc hai của số không chính phương, π, …). Số nguyên, phân số, số thập phân hữu hạn hoặc vô hạn tuần hoàn đều là số hữu tỉ.`,
   list.map(why).join('<br>'),
   `Các số vô tỉ: ${list.filter(z=>z.i||z.w=='π là số vô tỉ').map(z=>z.t).join('; ')}. Có ${k} số vô tỉ.`],`có ${k} số vô tỉ.`);
 return[mc(`Trong các số sau có bao nhiêu số vô tỉ: ${list.map(z=>z.t).join('; ')}?`,k,[k+1,k-1,k+2,k-2,6-k].filter(v=>v>=0&&v<=6&&v!=k),e,fd),[list.map(z=>z.t)]]}),

/* Rút gọn |√a − b| */
gen('sth.abs_can',()=>{
 const a=P([2,3,5,6,7,8,10,11,12,13,14,15,17,19,20,21,22,23,24,26,27,28,29,30,32,33,34,35,37,38,39,40,41,42,43,44,45,46,47,48,50]),b=R(1,8);if(b*b==a)throw 0;
 const big=a>b*b,ans=big?`√${a} − ${b}`:`${b} − √${a}`,other=big?`${b} − √${a}`:`√${a} − ${b}`,
  e=sol([`So sánh √${a} với ${b}: ${a} ${big?'>':'<'} ${b*b} = ${b}², nên √${a} ${big?'>':'<'} ${b}.`,
   big?`Do đó √${a} − ${b} > 0, vì vậy |√${a} − ${b}| = √${a} − ${b}.`:`Do đó √${a} − ${b} < 0, vì vậy |√${a} − ${b}| = −(√${a} − ${b}) = ${b} − √${a}.`],`${ans}.`);
 return[mc(`Rút gọn: |√${a} − ${b}|`,ans,[other,`${b} + √${a}`,`−${b} − √${a}`,`√${Math.abs(a-b*b)}`],e,String),[a,b]]}),

/* Phần nguyên [x] */
gen('sth.phan_nguyen',()=>{
 const t=R(0,2);let xs,n,steps;
 if(t==0){const sg=P([1,-1]),ip=R(0,9),two=R(0,1);let dc;do{dc=two?R(11,99):R(1,9)}while(two&&dc%10==0);
  const sc=two?100:10,v=sg*(ip*sc+dc);n=Math.floor(v/sc);xs=bd(BigInt(v),two?2:1);
  steps=[`[x] là số nguyên lớn nhất không vượt quá x, tức là số nguyên n thỏa n ≤ x < n + 1.`,`Với x = ${xs}: ${ng(n)} ≤ ${xs} < ${ng(n+1)}.`]}
 else if(t==1){const b=R(2,9);let a;do{a=R(-60,60)}while(a%b==0);const g=Fr(a,b);if(g[1]==1)throw 0;n=Math.floor(a/b);xs=S(g);
  steps=[`[x] là số nguyên n thỏa n ≤ x < n + 1. Với x = ${xs}, ta tìm n sao cho n × ${g[1]} ≤ ${ng(g[0])} < (n + 1) × ${g[1]}.`,`${ng(Math.floor(g[0]/g[1])*g[1])} ≤ ${ng(g[0])} < ${ng((Math.floor(g[0]/g[1])+1)*g[1])}, nên n = ${ng(n)}, tức ${ng(n)} ≤ ${xs} < ${ng(n+1)}.`]}
 else{const m=P([2,3,5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,53]);n=Number(isqrt(BigInt(m)));xs=`√${m}`;
  steps=[`[x] là số nguyên n thỏa n ≤ x < n + 1. Với x = √${m}, ta so sánh ${m} với bình phương các số nguyên.`,`${n}² = ${n*n} < ${m} < ${(n+1)*(n+1)} = ${n+1}², nên ${n} < √${m} < ${n+1}.`]}
 return[mc(`Phần nguyên của số x, kí hiệu [x], là số nguyên lớn nhất không vượt quá x. Tìm [x] khi x = ${xs}.`,n,[n+1,n-1,n+2,-n],sol(steps,`[${xs}] = ${ng(n)}.`),fd),[t,xs]]}),

/* Hình vuông: diện tích ↔ chu vi */
gen('sth.hinh_vuong_chu_vi',()=>{
 const c=R(5,40);
 if(R(0,1)){const e=sol([`Cạnh hình vuông là căn bậc hai của diện tích: √${c*c} = ${c} (m).`,`Chu vi = 4 × cạnh = 4 × ${c} = ${4*c} (m).`],`${4*c} m.`);
  return[mc(`Một mảnh vườn hình vuông có diện tích ${c*c} m². Chu vi mảnh vườn là bao nhiêu mét?`,4*c,[2*c,c*c,c,4*c*c].filter(v=>v!=4*c),e,fd),['p',c]]}
 const e=sol([`Cạnh hình vuông = chu vi : 4 = ${4*c} : 4 = ${c} (m).`,`Diện tích = cạnh × cạnh = ${c} × ${c} = ${c*c} (m²).`],`${c*c} m².`);
 return[mc(`Một khu đất hình vuông có chu vi ${4*c} m. Diện tích khu đất là bao nhiêu mét vuông?`,c*c,[4*c,c,2*c*c,16*c].filter(v=>v!=c*c),e,fd),['s',c]]})
);

/* ================= NÂNG CAO ================= */
addH('l7sth',

/* Chữ số thập phân thứ n của phân số */
gen('sth.chu_so_thu_n',()=>{
 const f=P([[1,7],[2,7],[3,7],[4,7],[5,7],[6,7],[1,13],[2,13],[3,13],[5,13],[1,11],[3,11],[5,11],[7,11],[1,27],[4,37]]),[a,b]=f,pr0=per(a,b),p=pr0.length,n=R(20,150);
 const i=(n-1)%p,dg=pr0.split('').map(Number),ans=dg[i],r=n%p,q=Math.floor(n/p),
  cand=[...new Set([dg[(i+1)%p],dg[(i+p-1)%p],dg[0],dg[p-1],R(0,9),R(0,9),R(0,9)])].filter(v=>v!=ans),
  e=sol([`Chia ${a} cho ${b}: ${a}/${b} = 0,(${pr0}). Chu kì gồm ${p} chữ số: ${pr0}.`,`Chia ${n} cho ${p}: ${n} = ${p} × ${q} + ${r}.`,
   r==0?`Số dư bằng 0 nên chữ số thứ ${n} là chữ số cuối cùng của chu kì, đó là ${ans}.`:`Số dư là ${r} nên chữ số thứ ${n} trùng với chữ số thứ ${r} của chu kì, đó là ${ans}.`],`chữ số thứ ${n} là ${ans}.`);
 return[mc(`Viết ${a}/${b} dưới dạng số thập phân vô hạn tuần hoàn. Chữ số thập phân thứ ${n} (sau dấu phẩy) là:`,ans,cand,e,fd),[a,b,n]]}),

/* Tổng các số nguyên x thỏa [x/k] = n */
gen('sth.tong_phan_nguyen_x',()=>{
 const k=R(2,5),n=R(-4,6),lo=n*k,hi=n*k+k-1,sm=(u,v)=>(u+v)*(v-u+1)/2,tot=sm(lo,hi);if(tot==0)throw 0;
 const e=sol([`[x/${k}] = ${n} nghĩa là ${n} ≤ x/${k} < ${n+1}.`,`Nhân các vế với ${k} (số dương): ${ng(lo)} ≤ x < ${ng(lo+k)}.`,`Các số nguyên x là: ${rng(lo,hi)} (${k} số).`,`Tổng = (số đầu + số cuối) × ${k} : 2 = (${ng(lo)} + ${pa(hi)}) × ${k} : 2 = ${tot}.`],`${tot}.`);
 return[mc(`Tính tổng tất cả các số nguyên x thỏa mãn [${fh('x',k)}] = ${n}, trong đó [a] là phần nguyên của a.`,tot,[sm(lo,hi+1),sm(lo-k,lo-1),sm(lo+1,hi+1),n*k,sm(lo-1,hi-1)].filter(v=>v!=tot),e,fd),[k,n]]}),

/* [√1] + [√2] + … + [√(m²−1)] */
gen('sth.tong_phan_nguyen_can',()=>{
 const m=R(3,9),n=m*m-1;let tot=0;const lines=[];
 for(let k=1;k<m;k++){tot+=k*(2*k+1);lines.push(`[√i] = ${k} với ${k*k} ≤ i ≤ ${(k+1)*(k+1)-1} (có ${2*k+1} số)`)}
 const form=Array.from({length:m-1},(_,j)=>`${j+1} × ${2*(j+1)+1}`).join(' + '),
  e=sol([`[√i] = k khi k ≤ √i < k + 1, tức k² ≤ i < (k + 1)². Khi đó i chạy từ k² đến (k + 1)² − 1, gồm (k + 1)² − k² = 2k + 1 số.`,lines.join('<br>'),`Tổng = ${form} = ${tot}.`],`${tot}.`),
  w=[Array.from({length:m-1},(_,j)=>(j+1)*2*(j+1)).reduce((u,v)=>u+v,0),Array.from({length:m-1},(_,j)=>(j+1)*(2*(j+1)-1)).reduce((u,v)=>u+v,0),tot+m,tot-m+1,Array.from({length:m},(_,j)=>(j+1)*(2*(j+1)+1)).reduce((u,v)=>u+v,0)];
 return[mc(`Tính tổng A = [√1] + [√2] + [√3] + … + [√${n}], trong đó [a] là phần nguyên của a.`,tot,w.filter(v=>v!=tot),e,fd),[n]]}),

/* Số nguyên nằm giữa −√a và √b */
gen('sth.dem_nguyen_giua',()=>{
 const pool=[2,3,5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,53,54,55,56,57,58,59,60,61,62,63,65,66,67,68,69,70],a=P(pool),b=P(pool),fa=Number(isqrt(BigInt(a))),fb=Number(isqrt(BigInt(b))),tot=fa+fb+1,
  e=sol([`${fa}² = ${fa*fa} < ${a} < ${(fa+1)**2} = ${fa+1}², nên ${fa} < √${a} < ${fa+1}. Tương tự ${fb} < √${b} < ${fb+1}.`,
   `Các số nguyên dương x < √${b}: 1; 2; …; ${fb} (${fb} số). Các số nguyên âm x > −√${a}: −1; −2; …; −${fa} (${fa} số).`,
   `Cộng thêm số 0 (vì −√${a} < 0 < √${b}): ${fa} + ${fb} + 1 = ${tot} số.`],`có ${tot} số nguyên.`);
 return[mc(`Có bao nhiêu số nguyên x thỏa mãn −√${a} < x < √${b}?`,tot,[fa+fb,tot+1,tot-1,fa+fb+2,(fa+1)+(fb+1)+1].filter(v=>v!=tot),e,fd),[a,b]]}),

/* Phép tính với số thập phân tuần hoàn */
gen('sth.tuan_hoan_phep_tinh',()=>{
 const t=R(0,2);let expr,res,steps;
 if(t==0){const a=R(1,8),b=R(1,8);expr=`0,(${a}) + 0,(${b})`;res=Fr(a+b,9);
  steps=[`Đổi từng số: 0,(${a}) = ${a}/9; 0,(${b}) = ${b}/9 (số thập phân tuần hoàn 0,(c) với c là một chữ số bằng c/9).`,`Tổng = ${a}/9 + ${b}/9 = ${a+b}/9.`,(res[1]==9?`${a+b}/9 đã tối giản.`:`Rút gọn: ${a+b}/9 = ${S(res)}.`)]}
 else if(t==1){const ab=R(10,98),c=R(1,8),s=String(ab);expr=`0,(${s}) + 0,(${c})`;res=Fr(ab+11*c,99);
  steps=[`Đổi từng số: 0,(${s}) = ${ab}/99 (chu kì 2 chữ số); 0,(${c}) = ${c}/9.`,`Quy đồng mẫu số 99: ${c}/9 = ${11*c}/99.`,`Tổng = ${ab}/99 + ${11*c}/99 = ${ab+11*c}/99${res[1]==99?' (đã tối giản)':` = ${S(res)} (rút gọn)`}.`]}
 else{const a=R(1,8),m=R(2,8);expr=`0,(${a}) × ${m}`;res=Fr(a*m,9);
  steps=[`Đổi 0,(${a}) = ${a}/9.`,`Nhân: ${a}/9 × ${m} = ${a*m}/9.`,(res[1]==9?`${a*m}/9 đã tối giản.`:`Rút gọn: ${a*m}/9 = ${S(res)}.`)]}
 return[mc(`Tính: ${expr} (kết quả viết dưới dạng phân số tối giản hoặc số nguyên).`,S(res),wr([fadd(res,Fr(1,9)),fadd(res,Fr(-1,9)),Fr(res[0],res[1]*2),Fr(res[0],res[1]*10)],res),sol(steps,`${S(res)}.`),String),[t,expr]]})
);
})();
