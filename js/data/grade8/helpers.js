/* LỚP 8 + LỚP 9 · G8H: hàm dùng chung (nạp sau grade7/helpers.js và bank/helpers.js)
   - gn(mã, hàm): như BK.gen nhưng nhận cả câu NHẬP đáp án (I). Thử lại nếu bốc số không hợp lệ, không bao giờ làm sập lượt chơi.
   - M(...): trắc nghiệm 4 đáp án, mỗi đáp án nhiễu là một lỗi hay gặp kèm lý do.  Iq(...): câu nhập đáp án.
   - PL: đại số đa thức nhiều biến (cộng, trừ, nhân, giá trị, in ra chuỗi).
   - SVG: thales, bis, rt, pyr, bar1, bar2, hist, nline. */
const G8H=(()=>{
 const {fr,fq,fh,add,addH,pie,lch}=G7H,{mc,sol,fd,ng}=BK,
 gn=(k,fn)=>()=>{
  for(let i=0;i<14;i++){try{const r=fn(),q=Array.isArray(r)?r[0]:r;
   if(q&&q.q&&(q.inp?q.a!=='':q.w&&q.w.length>=3)&&!/NaN|undefined|Infinity|null/.test(q.q+q.a+(q.w||[]).join('|')+q.e)){q.k=k;if(Array.isArray(r))q.p=r[1];return q}}catch(e){}}
  const a=R(11,49),b=R(11,49),o=Q(`Tính: ${a} + ${b}`,''+(a+b),[a+b+10,a+b-10,a+b+1].map(String),sol([`Cộng hàng đơn vị rồi hàng chục: ${a} + ${b} = ${a+b}.`],`${a+b}`));o.k='fallback';return o},
 M=(q,a,w,st,err,fmt=ng,cc)=>mc(q,a,w,sol(st,cc==null?fmt(a):cc,err),fmt),
 Iq=(q,a,st,err,cc)=>{if(typeof a=='number')a=+a.toFixed(6);return I(q,a,sol(st,cc==null?(typeof a=='number'?fd(a):ng(a)):cc,err))},
 fg=(o,f)=>(o.f=f,o),   /* gắn hình vẽ f vào câu hỏi o */
 fdr=v=>fd(+(+v).toFixed(2)),   /* hiển thị số thập phân tối đa 2 chữ số, dấu phẩy, dấu trừ − */
 deg=v=>fdr(v)+'°',cm=v=>fdr(v)+' cm',c2=v=>fdr(v)+' cm²',c3=v=>fdr(v)+' cm³',pc=v=>fdr(v)+'%',
 fe=(n,d)=>{const r=fq(n,d);return r==n+'/'+d?r:`${n}/${d} = ${r}`},   /* "n/d" hoặc "n/d = rút gọn" (không lặp lại khi đã tối giản) */
 cf=v=>v==1?'':v==-1?'−':ng(v),   /* hệ số trước biến: 1 và −1 không viết số 1 */
 /* căn thức: sqs(n) = [k, m] với √n = k√m, m không chứa thừa số chính phương; rad(k, m) in "k√m" */
 sqs=n=>{let k=1,m=n;for(let i=2;i*i<=m;i++)while(m%(i*i)==0){m/=i*i;k*=i}return[k,m]},
 rad=(k,m)=>m==1?''+k:(k==1?'':k)+'√'+m,
 /* bộ ba Pythagoras: tp(n, kmax) lấy n bộ ba đầu, nhân hệ số ngẫu nhiên 1..kmax */
 TP=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]],
 tp=(n=3,kmax=3)=>{const t=P(TP.slice(0,n)),k=t[2]>20?1:R(1,kmax);return t.map(v=>v*k)},
 comb=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return Math.round(r)},
 fact=n=>n<2?1:n*fact(n-1),
 divs=n=>{let c=0;for(let i=1;i<=n;i++)if(n%i==0)c++;return c},
 lin=(a,b,v='x')=>{const t=a==1?v:a==-1?'−'+v:a?ng(a)+v:'';return t?(b?t+(b>0?' + ':' − ')+Math.abs(b):t):ng(b)},
 /* đa thức nhiều biến: mỗi hạng tử là [hệ số, mũ x, mũ y] */
 PL=(()=>{
  const norm=t=>{const m=new Map();t.forEach(([c,a,b=0])=>{const k=a*100+b;m.set(k,(m.get(k)||0)+c)});return[...m].filter(([,c])=>c).map(([k,c])=>[c,Math.floor(k/100),k%100]).sort((p,q)=>(q[1]+q[2])-(p[1]+p[2])||q[1]-p[1])},
  mul=(A,B)=>norm(A.flatMap(([c,a,b=0])=>B.map(([d,e,f=0])=>[c*d,a+e,b+f]))),
  pad=(A,B)=>norm([...A,...B]),neg=A=>A.map(([c,a,b=0])=>[-c,a,b]),sub=(A,B)=>pad(A,neg(B)),
  ev=(A,x,y=0)=>A.reduce((s,[c,a,b=0])=>s+c*x**a*y**b,0),
  str=(A,u='x',w='y')=>A.length?A.map(([c,a,b=0],i)=>{const m=Math.abs(c),v=(a?u+(a>1?'^'+a:''):'')+(b?w+(b>1?'^'+b:''):''),t=v?(m==1?'':m)+v:''+m;return(i?(c<0?' − ':' + '):(c<0?'−':''))+t}).join(''):'0',
  dg=A=>Math.max(...A.map(([,a,b=0])=>a+b));
  return{norm,mul,pad,neg,sub,ev,str,dg}})(),
 br=A=>'('+PL.str(A)+')',
 /* các đa thức "gần đúng" (đổi hệ số hoặc dấu một hạng tử), không kèm lý do: dùng để bù cho đủ 3 đáp án nhiễu */
 pmut=A=>{const o=[];A.forEach((t,i)=>{[-1,1,2,-2].forEach(d=>{const B=A.map(x=>[...x]);B[i][0]+=d;o.push(PL.str(PL.norm(B)))});const B=A.map(x=>[...x]);B[i][0]=-B[i][0];o.push(PL.str(PL.norm(B)))});return sh(o)},
 /* ===== hình vẽ SVG (cùng kiểu .fg với lớp 6, 7) ===== */
 sv=s=>`<svg viewBox="0 0 240 150" class="fg">${s}</svg>`,
 tx=(x,y,t,a='middle',z=12)=>`<text x="${x}" y="${y}" text-anchor="${a}" style="font-size:${z}px">${t}</text>`,
 dot=(x,y)=>`<circle cx="${x}" cy="${y}" r="3" style="fill:#feca57;stroke:none"/>`,
 /* tam giác ABC, M thuộc AB, N thuộc AC, MN // BC */
 thales=(n=['A','B','C','M','N'])=>sv(`<path d="M120 14L40 128H210Z"/><path d="M84 65L160 65"/>${dot(84,65)}${dot(160,65)}${tx(120,10,n[0])}${tx(30,142,n[1])}${tx(216,142,n[2])}${tx(72,69,n[3],'end')}${tx(172,69,n[4],'start')}`),
 /* tam giác ABC với đường phân giác AD (D thuộc BC) */
 bis=()=>sv(`<path d="M70 14L30 128H215Z"/><path d="M70 14L103 128"/>${dot(103,128)}${tx(70,10,'A')}${tx(22,142,'B')}${tx(222,142,'C')}${tx(103,143,'D')}`),
 /* tam giác ABC vuông tại A; s = {AB, AC, BC} nhãn độ dài; alt = vẽ thêm đường cao AH */
 rt=(s={},alt=false)=>sv(`<path d="M50 120H210L50 26Z"/><path d="M50 108H62V120"/>${alt?`<path d="M50 120L91 50"/>${dot(91,50)}${tx(99,47,'H','start')}`:''}${tx(38,134,'A','end')}${tx(214,134,'B','start')}${tx(50,19,'C')}${s.AB?tx(130,136,s.AB):''}${s.AC?tx(42,76,s.AC,'end'):''}${s.BC?tx(142,64,s.BC,'start'):''}`),
 /* hình chóp tứ giác đều S.ABCD: đường cao SO (h) và trung đoạn SM (d) */
 pyr=()=>sv(`<path d="M28 112L128 128L212 98"/><path d="M120 14L28 112M120 14L128 128M120 14L212 98"/><path d="M28 112L112 82L212 98M120 14L112 82" stroke-dasharray="4 3"/><path d="M120 14V105" stroke-dasharray="4 3"/><path d="M120 14L170 113" style="stroke:#feca57"/>${tx(120,10,'S')}${tx(20,122,'A','end')}${tx(126,143,'B')}${tx(220,104,'C','start')}${tx(104,78,'D','end')}${tx(113,116,'O','end')}${tx(176,123,'M','start')}${tx(116,62,'h','end')}${tx(150,60,'d','start')}`),
 /* biểu đồ cột: v = giá trị, l = nhãn */
 bar1=(v,l,c='#54a0ff')=>{const m=Math.max(...v),n=v.length,w=Math.min(34,190/n),g=Math.min(46,216/n),x0=(240-g*n)/2+(g-w)/2;
  return sv(`<path d="M8 115H236"/>${v.map((x,i)=>{const h=Math.max(2,88*x/m),X=x0+i*g;return `<rect x="${X.toFixed(1)}" y="${115-h}" width="${w}" height="${h}" style="fill:${c};stroke:none"/>${tx((X+w/2).toFixed(1),(110-h).toFixed(1),x,'middle',11)}${tx((X+w/2).toFixed(1),131,l[i],'middle',11)}`}).join('')}`)},
 /* biểu đồ cột kép: hai dãy v1, v2 */
 bar2=(v1,v2,l,n1,n2)=>{const m=Math.max(...v1,...v2),n=v1.length,g=Math.min(46,216/n),w=g*.36,x0=(240-g*n)/2;
  return sv(`<path d="M8 115H236"/>${v1.map((x,i)=>{const X=x0+i*g+g*.1,h1=Math.max(2,78*x/m),h2=Math.max(2,78*v2[i]/m);return `<rect x="${X.toFixed(1)}" y="${115-h1}" width="${w.toFixed(1)}" height="${h1}" style="fill:#54a0ff;stroke:none"/><rect x="${(X+w+1).toFixed(1)}" y="${115-h2}" width="${w.toFixed(1)}" height="${h2}" style="fill:#ff9f43;stroke:none"/>${tx((X+w/2).toFixed(1),(110-h1).toFixed(1),x,'middle',10)}${tx((X+w*1.5+1).toFixed(1),(110-h2).toFixed(1),v2[i],'middle',10)}${tx((X+w).toFixed(1),131,l[i],'middle',11)}`}).join('')}<rect x="150" y="3" width="9" height="9" style="fill:#54a0ff;stroke:none"/>${tx(163,11,n1,'start',10)}<rect x="196" y="3" width="9" height="9" style="fill:#ff9f43;stroke:none"/>${tx(209,11,n2,'start',10)}`)},
 /* biểu đồ tần số tương đối ghép nhóm: các cột sát nhau; v = phần trăm, l = nhãn nhóm */
 hist=(v,l)=>{const m=Math.max(...v),n=v.length,w=Math.min(44,208/n),x0=(240-w*n)/2;
  return sv(`<path d="M${x0-6} 115H${x0+w*n+8}M${x0-6} 20V115"/>${v.map((x,i)=>{const h=Math.max(2,86*x/m),X=x0+i*w;return `<rect x="${X.toFixed(1)}" y="${115-h}" width="${w.toFixed(1)}" height="${h}" style="fill:#1dd1a1;stroke:#0e1033;stroke-width:1.5"/>${tx((X+w/2).toFixed(1),(110-h).toFixed(1),x+'%','middle',11)}${tx((X+w/2).toFixed(1),131,l[i],'middle',9)}`}).join('')}`)},
 /* trục số: chấm tại a, dir '>' hoặc '<', closed = lấy cả điểm a (chấm đặc) */
 nline=(a,dir,closed)=>{const xs=[...Array(7)].map((_,i)=>24+i*32),ray=dir=='>'?`<path d="M120 70H224" style="stroke:#feca57;stroke-width:5"/><path d="M216 63L226 70L216 77" style="stroke:#feca57;stroke-width:3"/>`:`<path d="M120 70H16" style="stroke:#feca57;stroke-width:5"/><path d="M24 63L14 70L24 77" style="stroke:#feca57;stroke-width:3"/>`;
  return sv(`<path d="M8 70H232"/>${xs.map((x,i)=>`<path d="M${x} 64V76"/>${tx(x,98,ng(a-3+i),'middle',12)}`).join('')}${ray}<circle cx="120" cy="70" r="6" style="fill:${closed?'#feca57':'#0e1033'};stroke:#feca57;stroke-width:3"/>`)};
 return{fr,fq,fh,add,addH,pie,lch,mc,sol,fd,ng,gn,M,Iq,fg,fdr,fe,cf,deg,cm,c2,c3,pc,sqs,rad,TP,tp,comb,fact,divs,lin,PL,br,pmut,sv,tx,dot,thales,bis,rt,pyr,bar1,bar2,hist,nline}
})();
