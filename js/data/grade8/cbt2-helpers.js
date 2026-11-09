/* LỚP 8 · G8X: hàm dùng chung cho các dạng bài bổ sung từ "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 2" (v14)
   (nạp sau grade8/helpers.js, trước cbt2-*.js)
   - nzc(m): số nguyên khác 0 trong [−m, m].   pk(c0, c1, …): đa thức một biến từ hệ số tăng dần.
   - sx(r) = "x − r", px(r) = "(x − r)" (r âm thì thành "+").   qd(r1, r2): đa thức (x − r1)(x − r2).
   - FR(n, d): phân thức dựng từ hai đa thức PL.   same(n1, d1, n2, d2): hai phân thức có bằng nhau không.
   - near(n, d): danh sách phân thức "gần đúng" nhưng KHÁC n/d (đáp án nhiễu, không bao giờ trùng giá trị với đáp án).
   - subs(A, x, y): chuỗi thay số vào đa thức A, ví dụ 3·(−2)^2 − (−2) + 1.
   - val(n, d): chuỗi "n/d = rút gọn" (dấu − đặt ở tử).   ords(n): số ước dương. */
const G8X=(()=>{
 const {fh,fq,PL,ng}=G8H,{norm,mul,neg,sub,str}=PL,
 nzc=(m=6)=>{let v;do v=R(-m,m);while(!v);return v},
 pk=(...c)=>norm(c.map((v,i)=>[v,i,0]).filter(t=>t[0])),
 sx=r=>r?`x ${r<0?'+':'−'} ${Math.abs(r)}`:'x',
 px=r=>r?`(${sx(r)})`:'x',
 qd=(r1,r2)=>mul(pk(-r1,1),pk(-r2,1)),
 FR=(n,d)=>fh(str(n),str(d)),
 same=(n1,d1,n2,d2)=>!sub(mul(n1,d2),mul(n2,d1)).length,
 mut=A=>{const o=[];A.forEach((t,i)=>{[-1,1,2,-2].forEach(k=>{const B=A.map(x=>[...x]);B[i][0]+=k;o.push(norm(B))});const B=A.map(x=>[...x]);B[i][0]=-B[i][0];o.push(norm(B))});return o.filter(p=>p.length)},
 near=(n,d)=>{const c=[[neg(n),d],[d,n],[n,neg(d)]];
  sh(mut(n)).filter(m=>PL.dg(m)==PL.dg(n)).slice(0,5).forEach(m=>c.push([m,d]));sh(mut(d)).filter(m=>PL.dg(m)==PL.dg(d)).slice(0,5).forEach(m=>c.push([n,m]));
  const seen=new Set(),out=[];
  sh(c).forEach(([a,b])=>{if(!a.length||!b.length||same(a,b,n,d))return;const s=FR(a,b);if(!seen.has(s)){seen.add(s);out.push(s)}});return out},
 pa=v=>v<0?'(−'+(-v)+')':''+v,
 subs=(A,x,y=0)=>A.map(([c,a,b=0],i)=>{const m=Math.abs(c),p=[];if(m!=1||(!a&&!b))p.push(m);if(a)p.push(pa(x)+(a>1?'^'+a:''));if(b)p.push(pa(y)+(b>1?'^'+b:''));
  return(i?(c<0?' − ':' + '):(c<0?'−':''))+p.join('·')}).join(''),
 val=(n,d)=>{if(d<0){n=-n;d=-d}if(d==1)return ng(n);const r=fq(n,d),u=ng(n)+'/'+d;return r==u?r:`${u} = ${r}`},
 ords=n=>{let c=0;for(let i=1;i<=n;i++)if(n%i==0)c++;return c},
 /* số nguyên a hiển thị trong biểu thức: a ± b dạng "+ 3" / "− 3" */
 sg=v=>v<0?'−':'+',
 uq=a=>[...new Set(a)];
 return{nzc,pk,sx,px,qd,FR,same,near,pa,subs,val,ords,sg,uq,mut}
})();
