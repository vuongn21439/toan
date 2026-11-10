/* LỚP 9 · G9X: hàm dùng chung cho các dạng bài bổ sung từ "Tài liệu học thêm Toán 9 – Học kì I (Kết nối tri thức)" (v15)
   (nạp sau grade8/*.js và grade9/statistics.js, trước cbt1-*.js của lớp 9)
   - rat(v): số hữu tỉ v hiển thị dạng "a/b" hoặc số nguyên (dấu −). ratA(v): bản dùng làm đáp án nhập (dấu - thường, tối giản).
   - F: số học phân số [tử, mẫu]: nf, add, sub, mul, div, s (chuỗi hiển thị), num (giá trị số).
   - xp(v, 'x'): "x + 3" / "x − 3" / "x".   tm(c, 'x'): hạng tử có dấu đứng trước, ví dụ " + 3x", " − x", "" khi c = 0.
   - roots(list): chuỗi "x = a; x = b" (tăng dần, không lặp).   two(u, v): "x ≠ u và x ≠ v" (tăng dần).
   - sg(v): "+" hoặc "−" theo dấu của v.   uq(list): bỏ phần tử lặp. */
const G9X=(()=>{
 const {fq,fr,fd,ng}=G8H,{nzc}=G8X,ab=Math.abs,
 ratN=v=>{for(let d=1;d<=60;d++){const n=Math.round(v*d);if(Math.abs(v*d-n)<1e-9)return[n,d]}return null},
 rat=v=>{const r=ratN(v);return r?fq(r[0],r[1]):fd(+v.toFixed(4))},
 ratA=v=>{const r=ratN(v);return r?fr(r[0],r[1]):String(+v.toFixed(4))},
 nf=([n,d])=>{if(d<0){n=-n;d=-d}const g=gcd(ab(n),d)||1;return[n/g,d/g]},
 F={nf,add:(a,b)=>nf([a[0]*b[1]+b[0]*a[1],a[1]*b[1]]),sub:(a,b)=>nf([a[0]*b[1]-b[0]*a[1],a[1]*b[1]]),
  mul:(a,b)=>nf([a[0]*b[0],a[1]*b[1]]),div:(a,b)=>nf([a[0]*b[1],a[1]*b[0]]),s:a=>fq(a[0],a[1]),sa:a=>fr(a[0],a[1]),num:a=>a[0]/a[1]},
 xp=(v,s='x')=>v?`${s} ${v<0?'−':'+'} ${ab(v)}`:s,
 tm=(c,v='')=>c?` ${c<0?'−':'+'} ${v&&ab(c)==1?'':ab(c)}${v}`:'',
 sg=v=>v<0?'−':'+',
 uq=a=>[...new Set(a)],
 roots=l=>[...l].sort((p,q)=>p-q).filter((v,i,a)=>!i||Math.abs(v-a[i-1])>1e-9).map(v=>'x = '+rat(v)).join('; '),
 two=(u,v)=>{[u,v]=[u,v].sort((p,q)=>p-q);return `x ≠ ${rat(u)} và x ≠ ${rat(v)}`};
 return{rat,ratN,ratA,F,xp,tm,sg,uq,roots,two,nzc,ab}
})();
