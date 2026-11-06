/* LỚP 7 · bổ sung từ tài liệu "Cơ bản và nâng cao Toán 7 tập 1 – Đại số": hàm dùng chung (nạp sau chuyen-de-2.js)
   - Fr/fadd/fsub/fmul/fdiv: phân số chính xác [tử, mẫu] đã tối giản, mẫu > 0
   - S(f): chuỗi phân số có dấu − đẹp (ví dụ "−3/4"); pr(f): thêm ngoặc khi âm
   - lin(a): chuỗi "x − a" / "x + a"
   - svgMagic: hình vuông kì diệu 3 × 3 (ô cần tìm ghi x)
   - bd/rnd/isqrt: số thập phân chính xác bằng BigInt (làm tròn, chữ số thập phân) */
const G7X=(()=>{
 const Fr=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(Math.abs(n),d)||1;return[n/g,d/g]},
 fadd=(a,b)=>Fr(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),
 neg=f=>[-f[0],f[1]],
 fsub=(a,b)=>fadd(a,neg(b)),
 fmul=(a,b)=>Fr(a[0]*b[0],a[1]*b[1]),
 fdiv=(a,b)=>Fr(a[0]*b[1],a[1]*b[0]),
 cmp=(a,b)=>a[0]*b[1]-b[0]*a[1],
 S=f=>G7H.fq(f[0],f[1]),
 pr=f=>f[0]<0?'('+S(f)+')':S(f),
 ab=f=>[Math.abs(f[0]),f[1]],
 lin=a=>a==0?'x':a>0?`x − ${a}`:`x + ${-a}`,
 /* chuỗi "|x − a|" */
 av=a=>`|${lin(a)}|`,
 /* phân tích chuỗi phân số "−3/4", "5", "−2" thành [tử, mẫu] (dùng cho kiểm chứng) */
 pf=s=>{s=String(s).replace(/−/g,'-').trim();const m=s.match(/^(-?\d+)(?:\/(\d+))?$/);return m?Fr(+m[1],m[2]?+m[2]:1):null},
 /* BigInt: số thập phân kiểu Việt từ số nguyên n đã nhân 10^k */
 bd=(n,k)=>{const ng=n<0n;let s=(ng?-n:n).toString();if(k>0){s=s.padStart(k+1,'0');s=s.slice(0,-k)+','+s.slice(-k)}return(ng?'−':'')+s},
 /* làm tròn nửa lên số a/b ≥ 0 đến k chữ số thập phân; trả về BigInt đã nhân 10^k */
 rnd=(a,b,k)=>{a=BigInt(a);b=BigInt(b);const t=10n**BigInt(k);return(2n*a*t+b)/(2n*b)},
 isqrt=n=>{n=BigInt(n);if(n<2n)return n;let x=BigInt(Math.floor(Math.sqrt(Number(n))));while(x*x>n)x--;while((x+1n)*(x+1n)<=n)x++;return x},
 /* hình vuông kì diệu: cells = 9 giá trị (null = ô trống), hl = chỉ số ô cần tìm (ghi x) */
 svgMagic=(cells,hl)=>{
  const x0=48,y0=6,w=48,n=v=>String(v).replace('-','−');let s=`<rect x="${x0}" y="${y0}" width="${3*w}" height="${3*w}"/><path d="M${x0+w} ${y0}V${y0+3*w}M${x0+2*w} ${y0}V${y0+3*w}M${x0} ${y0+w}H${x0+3*w}M${x0} ${y0+2*w}H${x0+3*w}"/>`;
  cells.forEach((v,i)=>{const cx=x0+(i%3)*w+w/2,cy=y0+Math.floor(i/3)*w+w/2+6,rx=x0+(i%3)*w+3,ry=y0+Math.floor(i/3)*w+3;
   if(i==hl)s+=`<rect x="${rx}" y="${ry}" width="${w-6}" height="${w-6}" style="fill:rgba(255,210,94,.3);stroke:none"/><text x="${cx}" y="${cy}" text-anchor="middle" style="font-size:20px">x</text>`;
   else if(v!=null)s+=`<text x="${cx}" y="${cy}" text-anchor="middle" style="font-size:17px">${n(v)}</text>`});
  return`<svg viewBox="0 0 240 156" class="fg">${s}</svg>`},
 /* dãy số nguyên lo..hi (tối đa 14 số, quá dài thì rút gọn bằng "…") */
 rng=(lo,hi)=>{const a=[];for(let i=lo;i<=hi;i++)a.push(i);const f=v=>String(v).replace('-','−');return a.length<=14?a.map(f).join('; '):a.slice(0,5).map(f).join('; ')+'; …; '+a.slice(-3).map(f).join('; ')},
 /* chuẩn hóa dấu trừ: "-3" ở đầu số (sau khoảng trắng, dấu mở ngoặc, =, :, ;, ,) đổi thành "−3" */
 fx=s=>String(s).replace(/(^|[\s(=:;,>])-(?=\d)/g,'$1−'),
 /* gen của bộ bổ sung: như BK.gen nhưng chuẩn hóa dấu trừ trong đề và lời giải */
 gen=(k,fn)=>BK.gen(k,()=>{const r=fn(),q=Array.isArray(r)?r[0]:r;if(q&&q.q){q.q=fx(q.q);q.e=fx(q.e)}return r});
 return{Fr,fadd,fsub,fmul,fdiv,neg,cmp,S,pr,ab,lin,av,pf,bd,rnd,isqrt,svgMagic,rng,fx,gen}
})();
