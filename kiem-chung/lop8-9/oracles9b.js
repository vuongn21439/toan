/* Oracle độc lập cho các dạng bài lớp 9 bổ sung từ "Tài liệu học thêm Toán 9 – Học kì I (KNTT)" (v15):
   hp2.* (hệ phương trình), pt1.* (phương trình tích, ẩn ở mẫu), bd.* / bp2.* (bất đẳng thức, bất phương trình),
   cb.* (căn thức, phương trình chứa căn), lg.* (tỉ số lượng giác), dc.* (đường tròn, cung).
   Mỗi oracle TỰ ĐỌC LẠI đề đang hiển thị (không dùng tham-số của bộ sinh) rồi giải bằng cách khác: dò nghiệm bằng máy,
   thay số, tính bằng Math. Trả về chuỗi đáp án đúng hoặc true/false. Với thử ngược MUTATE=1, hàm nhận {...q, a: đáp án nhiễu}
   nên chỉ được dựa vào q.a, không dựa vào q.w hay tham số p. */
const {parse,strip,gcd,rv}=require('./expr.js');
module.exports=L=>{
const O={},T=q=>strip(q.q).replace(/−/g,'-').replace(/\s+/g,' ').trim(),
 close=(a,b,e=1e-6)=>Math.abs(a-b)<=e*Math.max(1,Math.abs(b)),
 num=s=>{s=strip(s).replace(/−/g,'-').replace(/,/g,'.').replace(/°|cm²|cm|m|giờ|km\/h|gam|nghìn đồng|tuổi|bể|π/g,'').replace(/\s/g,'');if(/\//.test(s)){const [a,b]=s.split('/');return +a/+b}return +s},
 F=s=>parse(s.replace(/−/g,'-')),
 frs=(n,d)=>{if(d<0){n=-n;d=-d}const g=gcd(Math.abs(n),d)||1;return d/g==1?String(n/g):`${n/g}/${d/g}`},
 /* nghiệm của f trên lưới k/den */
 rts=(f,den=840,lo=-60,hi=60)=>{const r=[];for(let k=lo*den;k<=hi*den;k++){const x=k/den,v=f(x,0);if(isFinite(v)&&Math.abs(v)<1e-7)r.push(x)}return r},
 ansSet=a=>strip(a).replace(/−/g,'-').split(';').map(t=>{const m=t.match(/x = (.*)$/);return m?num(m[1]):NaN}).sort((p,q)=>p-q),
 sameSet=(a,b)=>a.length==b.length&&a.every((v,i)=>Math.abs(v-b[i])<1e-6),
 setAns=(q,set)=>{const a=strip(q.a);if(/vô nghiệm/.test(a))return set.length==0;return set.length>0&&sameSet(ansSet(a),[...set].sort((p,q)=>p-q))},
 /* hai vế của một phương trình/bất phương trình: f(x) = vế trái − vế phải */
 sides=s=>{const m=s.match(/^(.*?)(≥|≤|=|>|<)(.*)$/);return[F(m[1]),m[2],F(m[3])]},
 cof=s=>s==''?1:s=='-'?-1:+s;
const TK=['x','y'];

/* ---------- Biến đổi hệ: "{ e1 ; e2 }" thành hai hàm f(x, y) = vế trái − vế phải ---------- */
const sys=t=>{const m=t.match(/\{ (.*?) ; (.*?) \}/);return m.slice(1,3).map(e=>{const [l,r]=e.split(' = ');const f=F(l),g=F(r);return(x,y)=>f(x,y)-g(x,y)})},
 grid=(f1,f2,lo=-40,hi=40)=>{const r=[];for(let x=lo;x<=hi;x++)for(let y=lo;y<=hi;y++)if(Math.abs(f1(x,y))<1e-9&&Math.abs(f2(x,y))<1e-9)r.push([x,y]);return r};

/* ================= HỆ PHƯƠNG TRÌNH hp2.* ================= */
const isLin=s=>{s=strip(s).replace(/\s/g,'');return!(/\^|xy|\/\((x|y)\)|\/x|\/y/.test(s)||/^0x\+0y/.test(s))};
O['hp2.la_pt']=(p,q)=>{const k=isLin(q.a);return /KHÔNG/.test(q.q)?!k:k};
O['hp2.nghiem_tq']=(p,q)=>{const m=T(q).match(/phương trình (.*) là$/),[l,r]=m[1].split(' = '),f=F(l),c=+r;
 const e=strip(q.a).replace(/−/g,'-').match(/^\(x; (.*)\) với x ∈ ℝ$/);if(!e)return false;const g=F(e[1]);return[-7,-2,0,1,3,8].every(x=>Math.abs(f(x,g(x))-c)<1e-9)};
O['hp2.truc']=(p,q)=>{const m=T(q).match(/d: (.*) cắt/),[l,r]=m[1].split(' = '),f=F(l),c=+r;
 const a=strip(q.a).replace(/−/g,'-').match(/^\((-?\d+); 0\) và \(0; (-?\d+)\)$/);return!!a&&Math.abs(f(+a[1],0)-c)<1e-9&&Math.abs(f(0,+a[2])-c)<1e-9};
O['hp2.the_y']=(p,q)=>{const m=T(q).match(/phương trình (.*), biểu thị/),[l,r]=m[1].split(' = '),f=F(l),c=+r;
 const e=strip(q.a).replace(/−/g,'-').match(/^y = (.*)$/);if(!e)return false;const g=F(e[1]);return[-7,-2,0,1,3,8].every(x=>Math.abs(f(x,g(x))-c)<1e-9)};
O['hp2.tim_m']=(p,q)=>{const m=T(q).match(/\((-?\d+); (-?\d+)\) là một nghiệm của phương trình (-?\d*)x \+ my = (-?\d+)/),x0=+m[1],y0=+m[2],a=cof(m[3]),c=+m[4];
 return String((c-a*x0)/y0)};
O['hp2.rut_gon']=(p,q)=>{const t=T(q),[f1,f2]=sys(t),g=grid(f1,f2);if(g.length!=1)return false;const [x,y]=g[0],k=t.match(/Tính (.*)\.$/)[1];
 return String(k=='x + y'?x+y:k=='x - y'?x-y:2*x+y)};
O['hp2.tuoi']=(p,q)=>{const t=T(q),con=/hiện nay con/.test(t);let sol=[];
 if(/năm nữa/.test(t)){const m=t.match(/gấp (\d+) lần.*?(\d+) năm nữa.*?là (\d+) tuổi/);const [k,n,S]=m.slice(1).map(Number);for(let x=1;x<150;x++)for(let y=1;y<150;y++)if(x==k*y&&x+n+y+n==S)sol.push([x,y])}
 else{const m=t.match(/là (\d+) tuổi\. (\d+) năm trước.*?gấp (\d+) lần/);const [S,n,k]=m.slice(1).map(Number);for(let x=1;x<150;x++)for(let y=n+1;y<150;y++)if(x+y==S&&x-n==k*(y-n))sol.push([x,y])}
 return sol.length==1?String(sol[0][con?1:0]):false};
O['hp2.kinh_te']=(p,q)=>{const t=T(q),m=t.match(/là (\d+) nghìn đồng\. Thuế VAT của loại thứ nhất là (\d+)%, của loại thứ hai là (\d+)%.*?là (\d+) nghìn đồng\. Hỏi/),[S,p1,p2,Z]=m.slice(1).map(Number),sol=[];
 for(let x=0;x<=S;x++){const y=S-x;if((100+p1)*x+(100+p2)*y==100*Z)sol.push([x,y])}return sol.length==1?String(sol[0][/thứ hai là bao/.test(t)||/loại hàng thứ hai/.test(t)?1:0]):false};
O['hp2.tim_mn']=(p,q)=>{const t=T(q),m=t.match(/\((-?\d+); (-?\d+)\) là nghiệm của hệ phương trình \{ (.*?) ; (.*?) \}/),x0=+m[1],y0=+m[2];
 const mk=e=>{const s=e.replace(/x/g,'\u0001').replace(/y/g,'\u0002').replace(/m/g,'x').replace(/n/g,'y').replace(/\u0001/g,`(${x0})`).replace(/\u0002/g,`(${y0})`),[l,r]=s.split(' = '),f=parse(l),g=parse(r);return(a,b)=>f(a,b)-g(a,b)},
  f1=mk(m[3]),f2=mk(m[4]),sol=[];
 for(let a=-12;a<=12;a++)for(let b=-12;b<=12;b++)if(Math.abs(f1(a,b))<1e-9&&Math.abs(f2(a,b))<1e-9)sol.push(a+b);
 return sol.length==1?String(sol[0]):false};
O['hp2.duy_nhat']=(p,q)=>{const t=T(q),m=t.match(/\{ x \+ (\d*)y = (-?\d+) ; mx ([+-]) (\d*)y = (-?\d+) \}/),a=cof(m[1]),c=(m[3]=='-'?-1:1)*cof(m[4]);
 const det=mm=>1*c-mm*a;let bad=[];for(let k=-40;k<=40;k+=.5)if(Math.abs(det(k))<1e-9)bad.push(k);if(bad.length!=1)return false;
 return strip(q.a).replace(/−/g,'-')==`m ≠ ${bad[0]}`};
O['hp2.an_phu']=(p,q)=>{const t=T(q),[f1,f2]=sys(t),ask=t.match(/Tìm (x|y)\./)[1],sol=[];
 for(let x=-12;x<=12;x++)for(let y=-12;y<=12;y++){if(!x||!y)continue;if(Math.abs(f1(x,y))<1e-9&&Math.abs(f2(x,y))<1e-9)sol.push([x,y])}
 return sol.length==1?String(sol[0][ask=='x'?0:1]):false};
O['hp2.cong_viec']=(p,q)=>{const t=T(q),m=t.match(/sau (\d+) giờ đầy bể\. Nếu vòi thứ nhất chảy (\d+) giờ, sau đó vòi thứ hai chảy (\d+) giờ thì được (\d+)\/(\d+) bể.*?vòi thứ (hai|nhất)/),[T0,pp,qq,cn,cd]=m.slice(1,6).map(Number),sol=[];
 for(let x=1;x<=300;x++)for(let y=1;y<=300;y++)if(Math.abs(1/x+1/y-1/T0)<1e-12&&Math.abs(pp/x+qq/y-cn/cd)<1e-12)sol.push([x,y]);
 return sol.length==1?String(sol[0][m[6]=='hai'?1:0]):false};
O['hp2.hoa_hoc']=(p,q)=>{const t=T(q),m=t.match(/nồng độ (\d+)% với dung dịch axit cùng loại nồng độ (\d+)% để được (\d+) gam dung dịch axit nồng độ (\d+)%\. Hỏi cần dùng bao nhiêu gam dung dịch nồng độ (\d+)%/),[a,b,Mm,r,w]=m.slice(1).map(Number),sol=[];
 for(let x=0;x<=Mm;x++){const y=Mm-x;if(a*x+b*y==r*Mm)sol.push([x,y])}return sol.length==1?String(sol[0][w==a?0:1]):false};
O['hp2.hcn_dtich']=(p,q)=>{const m=T(q).match(/chu vi (\d+) m.*?thêm (\d+) m và giảm chiều rộng đi (\d+) m/),[P,a,b]=m.slice(1).map(Number),sol=[];
 for(let x=1;x<P;x++)for(let y=1;y<x;y++)if(2*(x+y)==P&&(x+a)*(y-b)==x*y)sol.push(x);return sol.length==1?String(sol[0]):false};
O['hp2.dong_nuoc']=(p,q)=>{const m=T(q).match(/xuôi dòng (\d+) km hết (\d+) giờ và đi ngược dòng (\d+) km hết (\d+) giờ\. Tính vận tốc (của dòng nước|của ca nô)/),[s1,t1,s2,t2]=m.slice(1,5).map(Number),sol=[];
 for(let v=1;v<=100;v++)for(let w=1;w<v;w++)if(Math.abs((v+w)*t1-s1)<1e-9&&Math.abs((v-w)*t2-s2)<1e-9)sol.push([v,w]);return sol.length==1?String(sol[0][m[5]=='của ca nô'?0:1]):false};

/* ================= PHƯƠNG TRÌNH QUY VỀ BẬC NHẤT pt1.* ================= */
const eqText=t=>t.replace(/^.*?phương trình /,'').replace(/\.$/,'').replace(/ (là|có)( .*)?$/,''),
 eqF=s=>{const [l,r]=s.split(' = ');const f=F(l),g=F(r);return(x)=>f(x)-g(x)};
O['pt1.tich_don']=(p,q)=>{const f=eqF(eqText(T(q)));return setAns(q,rts(f))};
O['pt1.tich_3']=(p,q)=>{const t=T(q),f=eqF(t.match(/Phương trình (.*) = 0 /)[1]+' = 0'),r=rts(f,1);
 const v=/tổng/.test(t)?r.reduce((s,x)=>s+x,0):/lớn nhất/.test(t)?Math.max(...r):r.filter(x=>x<0).length;return String(v)};
O['pt1.hdt_chung']=(p,q)=>setAns(q,rts(eqF(eqText(T(q))),60));
O['pt1.nhom']=(p,q)=>setAns(q,rts(eqF(eqText(T(q))),1));
O['pt1.bac_nhat']=(p,q)=>{const f=eqF(eqText(T(q))),a=f(0),b=f(1)-f(0);return String(-a/b)};
O['pt1.dkxd']=(p,q)=>{const t=strip(q.q).replace(/−/g,'-'),ds=[...t.matchAll(/\(\((-?\d+)\)\/\((x[^)]*)\)\)/g)].map(m=>{const g=F(m[2]);return-g(0)/(g(1)-g(0))}).sort((a,b)=>a-b);
 return ds.length==2&&strip(q.a).replace(/−/g,'-')==`x ≠ ${ds[0]} và x ≠ ${ds[1]}`};
O['pt1.lam_chung']=(p,q)=>{const m=T(q).match(/trong (\d+) giờ, người thứ hai làm một mình xong công việc đó trong (\d+) giờ/),a=+m[1],b=+m[2];return String(Math.round(1e6/(1/a+1/b))/1e6)};
const intRoot=(f,lo=-200,hi=200)=>{const r=[];for(let x=lo;x<=hi;x++){const v=f(x);if(isFinite(v)&&Math.abs(v)<1e-9)r.push(x)}return r};
O['pt1.mau_don']=(p,q)=>{const r=intRoot(eqF(eqText(T(q))));return r.length==1?String(r[0]):false};
O['pt1.mau_chung']=(p,q)=>{const r=intRoot(eqF(eqText(T(q))));return r.length==1?String(r[0]):false};
O['pt1.mau_loai']=(p,q)=>{const e=T(q).match(/phương trình (.*) = 0 là/)[1],f=F(e);return setAns(q,rts(x=>f(x),1))};
O['pt1.hai_binh']=(p,q)=>setAns(q,rts(eqF(eqText(T(q))),840));
O['pt1.so_nghiem']=(p,q)=>{const f=eqF(T(q).match(/Phương trình (.*) = 0 có/)[1]+' = 0');return String(intRoot(f,-60,60).length)};

/* ================= BẤT ĐẲNG THỨC, BẤT PHƯƠNG TRÌNH bd.*, bp2.* ================= */
const cmpOp=(op,d)=>op=='>'?d>1e-9:op=='<'?d<-1e-9:op=='≥'?d>=-1e-9:d<=1e-9;
O['bd.dao_dau']=(p,q)=>{const m=T(q).match(/^Cho (-?\d*)a (>|<|≥|≤) (-?\d*)b\./),k=cof(m[1]),op=m[2],a=strip(q.a).match(/^a (>|<|≥|≤) b$/);if(!a)return false;
 for(let A=-3;A<=3;A+=.5)for(let B=-3;B<=3;B+=.5)if(cmpOp(op,k*A-k*B)!==cmpOp(a[1],A-B))return false;return true};
O['bd.suy_ra']=(p,q)=>{const m=T(q).match(/^Cho a (>|<) (-?\d+)\./),op=m[1],mm=+m[2],a=strip(q.a).replace(/−/g,'-').match(/^(.*) (>|<) (-?\d+)$/);if(!a)return false;
 const f=F(a[1].replace(/a/g,'x')),v=+a[3],xs=op=='>'?[mm+1e-6,mm+.01,mm+.5,mm+3,mm+40]:[mm-1e-6,mm-.01,mm-.5,mm-3,mm-40];
 return xs.every(x=>cmpOp(a[2],f(x)-v))};
O['bd.gtnn']=(p,q)=>{const t=T(q),mn=/nhỏ nhất/.test(t),f=F(t.match(/= (.*)\.$/)[1]);let b=mn?Infinity:-Infinity;for(let x=-80;x<=80;x+=.01)b=mn?Math.min(b,f(x)):Math.max(b,f(x));return close(num(q.a),b,1e-6)};
O['bd.co_si']=(p,q)=>{const f=F(T(q).match(/A = (.*)\.$/)[1]);let b=Infinity;for(let x=.01;x<=200;x+=.01)b=Math.min(b,f(x));return close(num(q.a),b,1e-5)};
O['bd.max_tich']=(p,q)=>{const S=+T(q).match(/(?:a \+ b = |0 < x < )(\d+)/)[1];let b=-Infinity;for(let x=0;x<=S;x+=.01)b=Math.max(b,x*(S-x));return close(num(q.a),b,1e-5)};
O['bp2.mau_so']=(p,q)=>{const t=T(q).replace(/^Giải bất phương trình /,'').replace(/\.$/,''),[f,op,g]=sides(t),a=strip(q.a).replace(/−/g,'-').match(/^x (>|<|≥|≤) (.*)$/);if(!a)return false;
 const r=num(a[2]);return[-9,-1,-.2,-.01,0,.01,.2,1,9].every(d=>{const x=r+d;return cmpOp(op,f(x)-g(x))===cmpOp(a[1],x-r)})};
O['bp2.kep']=(p,q)=>{const m=T(q).match(/thỏa mãn (-?\d+) (<|≤) (.*?) (<|≤) (-?\d+)\.$/),f=F(m[3]);let s=0;for(let x=-400;x<=400;x++){const v=f(x),ok=(m[2]=='<'?+m[1]<v:+m[1]<=v)&&(m[4]=='<'?v<+m[5]:v<=+m[5]);if(ok)s+=x}return String(s)};

/* ================= CĂN THỨC cb.* ================= */
const fv=(n,d)=>frs(n,d);
O['cb.cbh_ps']=(p,q)=>{const t=T(q);let v;const m=t.match(/√\(\(\((\d+)\)\/\((\d+)\)\)\)/);if(m)v=Math.sqrt(+m[1]/+m[2]);else v=Math.sqrt(+t.match(/√(\d+,\d+)/)[1].replace(',','.'));return close(num(q.a),v,1e-9)};
O['cb.can3_tinh']=(p,q)=>{const m=T(q).match(/∛\((-?\d+)\) ([+-]) ∛\((-?\d+)\)/);return String(Math.round(Math.cbrt(+m[1])+(m[2]=='-'?-1:1)*Math.cbrt(+m[3])))};
O['cb.so_sanh2']=(p,q)=>{const m=T(q).match(/^So sánh hai số (.*) và (.*)\.$/),a=strip(q.a).match(/^(.*) ([><=]) (.*)$/);if(!a||a[1]!=m[1]||a[3]!=m[2])return false;
 const x=rv(m[1]),y=rv(m[2]);return a[2]=='>'?x>y+1e-9:a[2]=='<'?x<y-1e-9:Math.abs(x-y)<1e-9};
O['cb.dua_vao']=(p,q)=>{const m=T(q).match(/: (\d+)√(\d+) =/),a=strip(q.a).match(/^√(\d+)$/);return!!a&&+a[1]==(+m[1])**2*(+m[2])};
O['cb.khu_mau']=(p,q)=>{const m=T(q).match(/√\(\(\((\d+)\)\/\((\d+)\)\)\)/),a=strip(q.a).match(/^\(\(√(\d+)\)\/\((\d+)\)\)$/);return!!a&&close(Math.sqrt(+a[1])/+a[2],Math.sqrt(+m[1]/+m[2]),1e-9)};
O['cb.khai_trien']=(p,q)=>{const m=T(q).match(/\((\d+) ([+-]) (\d*)√(\d+)\)\^2/),a=+m[1],s=m[2]=='-'?-1:1,b=m[3]==''?1:+m[3],v=(a+s*b*Math.sqrt(+m[4]))**2;return close(rv(q.a),v,1e-9)&&/√/.test(strip(q.a))};
O['cb.pt_vn']=(p,q)=>{const m=T(q).match(/√\((.*)\) = (-?\d+) là/),f=F(m[1]),c=+m[2],a=strip(q.a).replace(/−/g,'-');
 if(c<0)return a=='Phương trình vô nghiệm';const r=intRoot(x=>f(x)>=0?Math.sqrt(f(x))-c:NaN,-300,300);return r.length==1&&a==`x = ${r[0]}`};
O['cb.pt_d3']=(p,q)=>{const m=T(q).match(/√\((.*?)\) = √\((.*?)\)/),f=F(m[1]),g=F(m[2]),r=intRoot(x=>f(x)>=0&&g(x)>=0?Math.sqrt(f(x))-Math.sqrt(g(x)):NaN,-300,300);return r.length==1?String(r[0]):false};
O['cb.gia_tri_bt']=(p,q)=>{const m=T(q).match(/\(\(√x \+ (\d+)\)\/\(√x \+ (\d+)\)\) khi x = (\d+)\./),s=Math.sqrt(+m[3]);if(!Number.isInteger(s))return false;return fv(+m[1]+s,+m[2]+s)};
O['cb.rut_gon_phan']=(p,q)=>{const m=strip(q.q).replace(/−/g,'-').match(/\(\((.*?)\)\/\((.*?)\)\)/),v=rv(m[1])/rv(m[2]);return close(rv(q.a),v,1e-9)&&/^(\d*)√\d+$/.test(strip(q.a))};
O['cb.tong_lien_hop']=(p,q)=>{const t=T(q),m0=+t.match(/^Tính S = \(\(1\)\/\(√(\d+) \+/)[1],n=+t.match(/\(\(1\)\/\(√\d+ \+ √(\d+)\)\)\.$/)[1];let s=0;for(let k=m0;k<n;k++)s+=1/(Math.sqrt(k)+Math.sqrt(k+1));return close(num(q.a),s,1e-9)};
O['cb.pt_d2']=(p,q)=>{const m=T(q).match(/√\((.*)\) = (.*)\.$/),f=F(m[1]),g=F(m[2]),r=intRoot(x=>f(x)>=0&&g(x)>=0?Math.sqrt(f(x))-g(x):NaN,-300,300);return r.length==1?String(r[0]):false};
O['cb.pt_d4']=(p,q)=>{const m=T(q).match(/√\((.*)\) = (\d+)\.$/),f=F(m[1]),k=+m[2];return setAns(q,intRoot(x=>Math.sqrt(f(x))-k,-80,80))};
O['cb.pt_tich']=(p,q)=>{const m=T(q).match(/\((.*?)\)√\((.*?)\) = 0/),f=F(m[1]),g=F(m[2]);return setAns(q,intRoot(x=>g(x)>=0?f(x)*Math.sqrt(g(x)):NaN,-80,80))};
O['cb.pt_d7']=(p,q)=>{const m=T(q).match(/√\((.*?)\) \+ √\((.*?)\) = (\d+)/),f=F(m[1]),g=F(m[2]),c=+m[3],r=intRoot(x=>f(x)>=0&&g(x)>=0?Math.sqrt(f(x))+Math.sqrt(g(x))-c:NaN,-100,300);return r.length==1?String(r[0]):false};
O['cb.tim_x_bt']=(p,q)=>{const m=T(q).match(/\(\(√x \+ (\d+)\)\/\(√x \+ (\d+)\)\) = (\d+)\./),a=+m[1],b=+m[2],k=+m[3],r=[];
 for(let x=0;x<=2000;x++){const s=Math.sqrt(x);if(Math.abs((s+a)/(s+b)-k)<1e-9)r.push(x)}return r.length==1?String(r[0]):false};

/* ================= TỈ SỐ LƯỢNG GIÁC lg.* ================= */
const R2D=d=>d*Math.PI/180,tf={sin:Math.sin,cos:Math.cos,tan:Math.tan,cot:a=>1/Math.tan(a)};
O['lg.bieu_thuc']=(p,q)=>{let s=T(q).match(/A = (.*)\.$/)[1].replace(/(sin|cos|tan|cot)\^2 (\d+)°/g,'Math.pow(TF.$1(R2D($2)),2)').replace(/(sin|cos|tan|cot) (\d+)°/g,'TF.$1(R2D($2))').replace(/·/g,'*').replace(/−/g,'-');
 const v=Function('TF','R2D','return '+s)(tf,R2D);return close(num(q.a),v,1e-9)};
O['lg.lon_nhat']=(p,q)=>{const t=T(q),big=/lớn nhất/.test(t),L=[...t.match(/Trong các số (.*), số nào/)[1].split('; ')].map(x=>{const m=x.match(/(sin|cos) (\d+)°/);return[x,tf[m[1]](R2D(+m[2]))]}).sort((a,b)=>big?b[1]-a[1]:a[1]-b[1]);return L[0][0]==strip(q.a)};
O['lg.canh_goc_db']=(p,q)=>{const m=T(q).match(/BC = (\d+) cm và ∠B = (\d+)°\. Độ dài (AC|AB) là/),B=R2D(+m[2]),v=+m[1]*(m[3]=='AC'?Math.sin(B):Math.cos(B));return close(rv(q.a),v,1e-9)};
O['lg.tan_cho_truoc']=(p,q)=>{const m=T(q).match(/tan α = \(\((\d+)\)\/\((\d+)\)\).*?dài (\d+) m/);return String(Math.round(+m[3]*(+m[1])/+m[2]))};
O['lg.biet_mot_tsln']=(p,q)=>{const m=T(q).match(/có (sin|cos|tan) α = \(\((\d+)\)\/\((\d+)\)\)\. Giá trị của (sin|cos|tan|cot) α là/),r=+m[2]/+m[3];
 const al=m[1]=='sin'?Math.asin(r):m[1]=='cos'?Math.acos(r):Math.atan(r);return close(num(q.a),tf[m[4]](al),1e-9)};
O['lg.ti_so_tan']=(p,q)=>{const t=T(q),m=t.match(/tan α = \(\((\d+)\)\/\((\d+)\)\)\..*?A = \(\((.*?)\)\/\((.*?)\)\)\./),al=Math.atan(+m[1]/+m[2]),S=Math.sin(al),C=Math.cos(al);
 const ev=e=>Function('return '+e.replace(/sin α/g,`(${S})`).replace(/cos α/g,`(${C})`).replace(/(\d)\(/g,'$1*('))();return close(num(q.a),ev(m[3])/ev(m[4]),1e-9)};
O['lg.dien_tich_sin']=(p,q)=>{const m=T(q).match(/AB = (\d+) cm, AC = (\d+) cm và ∠A = (\d+)°/);return close(rv(q.a),.5*m[1]*m[2]*Math.sin(R2D(+m[3])),1e-9)};

/* ================= ĐƯỜNG TRÒN dc.* ================= */
const pic=a=>{const m=strip(a).match(/^(\d+)π cm²?$/);return m?+m[1]:NaN};
O['dc.dai_cung']=(p,q)=>{const m=T(q).match(/cung (\d+)° .*?bán kính (\d+) cm/);return pic(q.a)==+m[2]*+m[1]/180};
O['dc.dien_quat']=(p,q)=>{const m=T(q).match(/cung (\d+)° .*?bán kính (\d+) cm/);return pic(q.a)==(+m[2])**2*(+m[1])/360};
O['dc.hinh_vanh']=(p,q)=>{const m=T(q).match(/bán kính (\d+) cm và (\d+) cm/);return pic(q.a)==(+m[1])**2-(+m[2])**2};
O['dc.d_nguyen']=(p,q)=>{const t=T(q),m=t.match(/\(O; (\d+) cm\) và \(O′; (\d+) cm\)/),[A,B]=m.slice(1).map(Number),R1=Math.max(A,B),r=Math.min(A,B),L=[];for(let d=0;d<=200;d++)if(d>R1-r&&d<R1+r)L.push(d);
 return String(/tổng/.test(t)?L.reduce((s,x)=>s+x,0):L.length)};
O['dc.tt_goc60']=(p,q)=>{const t=T(q),R1=+t.match(/\(O; (\d+) cm\)/)[1],OM=R1/Math.sin(R2D(30)),MA=R1*Math.tan(R2D(60)),v=/Độ dài OM/.test(t)?OM:/Độ dài MA/.test(t)?MA:3*MA;return close(rv(q.a),v,1e-9)};
O['dc.tim_R_cung']=(p,q)=>{const m=T(q).match(/số đo (\d+)° và độ dài (\d+)π cm/);return String(180*+m[2]/+m[1])};
O['dc.cung_lon']=(p,q)=>{const t=T(q);let v;if(/Số đo cung lớn AB là/.test(t))v=360-+t.match(/∠AOB = (\d+)°/)[1];else v=360-+t.match(/có số đo (\d+)°/)[1];return String(v)===strip(q.a).replace('°','')};
O['dc.cong_cung']=(p,q)=>{const t=T(q);let v;if(/cung nhỏ AB của/.test(t)){const m=t.match(/AB bằng (\d+)° và số đo cung AC bằng (\d+)°/);v=m[1]-m[2]}else{const m=t.match(/AB bằng (\d+)° và số đo cung BC bằng (\d+)°/);v=360-m[1]-m[2]}return String(v)};
O['dc.hcn_noi_tiep']=(p,q)=>{const m=T(q).match(/AB = (\d+) cm, BC = (\d+) cm/);return close(num(q.a),Math.hypot(+m[1],+m[2])/2,1e-9)};
O['dc.tg_deu']=(p,q)=>{const m=T(q).match(/cạnh (\d+) cm/);return close(rv(q.a),+m[1]/Math.sqrt(3),1e-9)};
return O};
