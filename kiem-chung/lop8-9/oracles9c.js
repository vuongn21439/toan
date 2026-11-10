/* Oracle độc lập cho các dạng bài lớp 9 bổ sung từ "Tài liệu học thêm Toán 9 – Học kì II (KNTT)" (v16):
   hs3.* (hàm số y = ax², parabol), pb2.* (phương trình bậc hai, Viète, ẩn ở mẫu), lp.* (giải toán bằng cách lập phương trình),
   tk3.* (tần số, ghép nhóm, biểu đồ), xs3.* (xác suất), tg.* / nt.* (góc nội tiếp, tứ giác nội tiếp, đường tròn ngoại – nội tiếp),
   kg3.* (hình trụ, hình nón, hình cầu).
   Mỗi oracle TỰ ĐỌC LẠI đề đang hiển thị (và hình SVG nếu có), rồi GIẢI BẰNG CÁCH KHÁC: dò nghiệm bằng máy, thử trực tiếp từng
   giá trị của tham số, liệt kê toàn bộ kết quả của phép thử, dựng hình bằng tọa độ... Không dùng tham-số của bộ sinh, không dùng q.w.
   Trả về chuỗi đáp án đúng hoặc true/false. Với thử ngược MUTATE=1, hàm nhận {...q, a: đáp án nhiễu} nên chỉ dựa vào q.a. */
const {parse,strip,gcd,rv}=require('./expr.js');
module.exports=L=>{
const O={},
 T=q=>strip(q.q).replace(/−/g,'-').replace(/(\d),(\d)/g,'$1.$2').replace(/\s+/g,' ').trim(),
 A=q=>strip(q.a).replace(/−/g,'-').replace(/(\d),(\d)/g,'$1.$2').replace(/\s+/g,' ').trim(),
 close=(a,b,e=1e-6)=>Math.abs(a-b)<=e*Math.max(1,Math.abs(b)),
 /* giá trị số của một chuỗi: số, phân số a/b, hoặc biểu thức có căn */
 val=s=>{s=strip(s).replace(/−/g,'-').replace(/(\d),(\d)/g,'$1.$2').replace(/[°%π]|cm²|cm³|cm|dm|giờ|km\/h|m\/s|\s*lít|\s*học sinh/g,'').trim();return rv(s)},
 first=s=>{const m=String(s).match(/-?\d+(?:\.\d+)?(?:\/\d+)?/);if(!m)return NaN;return m[0].includes('/')?+m[0].split('/')[0]/+m[0].split('/')[1]:+m[0]},
 sub=s=>s.replace(/x₁/g,'x').replace(/x₂/g,'y'),
 /* phương trình "vế trái = vế phải" (có thể có tham số m → y) thành hàm f(x, y) = trái − phải */
 eqf=(s,mp)=>{s=s.replace(/−/g,'-');if(mp)s=s.replace(/m/g,'y');const[l,r]=s.split('=').map(t=>t.trim()),f=parse(l),g=r===undefined||r===''?()=>0:parse(r);return(x,y)=>f(x,y)-g(x,y)},
 coef=(f,y=0)=>{const c=f(0,y),p=f(1,y),n=f(-1,y);return[(p+n)/2-c,(p-n)/2,c]},
 rts=(a,b,c)=>{const D=b*b-4*a*c;if(D<-1e-12)return[];const s=Math.sqrt(Math.max(D,0));return D<1e-12?[-b/(2*a)]:[(-b-s)/(2*a),(-b+s)/(2*a)].sort((x,y)=>x-y)},
 /* danh sách "x = ...; x = ..." → các giá trị số */
 xlist=q=>/vô nghiệm/.test(A(q))?[]:A(q).split(';').map(t=>val(t.replace(/^\s*x\s*=\s*/,''))).sort((p,q)=>p-q),
 sameSet=(a,b)=>a.length==b.length&&a.every((v,i)=>close(v,b[i],1e-6)),
 /* điều kiện của m ở dạng "m > a", "a < m ≤ b", "m = a" */
 cond=(s,m)=>{s=s.replace(/−/g,'-').replace(/\s/g,'');let r;
  if(r=s.match(/^m(<|>|≤|≥|=)(-?[\d.\/]+)$/)){const c=val(r[2]);return r[1]=='<'?m<c:r[1]=='>'?m>c:r[1]=='≤'?m<=c+1e-12:r[1]=='≥'?m>=c-1e-12:Math.abs(m-c)<1e-12}
  if(r=s.match(/^(-?[\d.\/]+)(<|≤)m(<|≤)(-?[\d.\/]+)$/)){const a=val(r[1]),b=val(r[4]);return(r[2]=='<'?m>a:m>=a-1e-12)&&(r[3]=='<'?m<b:m<=b+1e-12)}
  throw new Error('điều kiện lạ: '+s)},
 grid=(lo,hi,st)=>{const r=[];for(let m=lo;m<=hi+1e-9;m+=st)r.push(+m.toFixed(6));return r},
 R2=n=>Math.round(n),
 gc=(a,b)=>b?gc(b,a%b):Math.abs(a),
 reduceStr=(n,d)=>{const g=gc(n,d)||1;n/=g;d/=g;if(d<0){n=-n;d=-d}return d==1?String(n):`${n}/${d}`};

/* ================= HÀM SỐ y = ax² : hs3.* ================= */
O['hs3.nhan_dang']=(p,q)=>{const t=T(q).match(/Cho các hàm số: (.*)\. Có bao nhiêu/)[1].replace(/^\(1\) /,''),items=t.split(/; \(\d\) /);let n=0;
 for(const it of items){const g=parse(it.replace(/^y = /,'')),c=g(1);if(Math.abs(c)>1e-9&&[2,3,-1,.5,-2.5].every(x=>{const v=g(x);return isFinite(v)&&Math.abs(v-c*x*x)<1e-9}))n++}
 return String(n)};
O['hs3.he_so_a']=(p,q)=>{const g=parse(T(q).match(/Hàm số y = (.*) có hệ số a bằng/)[1]);return close(g(1),val(A(q)))&&close(g(3),9*g(1))};
O['hs3.ct_thuc_te']=(p,q)=>{const t=T(q);let v,m;
 if(m=t.match(/s = 4\.9t\^2.*sau (\d+) giây/))v=4.9*m[1]**2;
 else if(m=t.match(/Vật rơi được ([\d.]+) m thì/))v=Math.sqrt(m[1]/4.9);
 else if(m=t.match(/S = 3\.14r\^2.*bán kính (\d+) m/))v=3.14*m[1]**2;
 else if(m=t.match(/diện tích ([\d.]+) m\^2\. Dùng công thức S = 3\.14r\^2/))v=Math.sqrt(m[1]/3.14);
 else if(m=t.match(/khối lượng (\d+) kg.*Tính động năng của vật khi v = (\d+) m\/s/))v=.5*m[1]*m[2]**2;
 else if(m=t.match(/khối lượng (\d+) kg.*động năng ([\d.]+) J thì tốc độ/))v=Math.sqrt(2*m[2]/m[1]);
 else throw new Error('đề lạ: '+t);
 return close(first(A(q)),v,1e-9)};
O['hs3.chop']=(p,q)=>{const t=T(q),h=+t.match(/h = (\d+) cm|chiều cao (\d+) cm/).slice(1).find(Boolean);
 if(/công thức tính thể tích V theo a/.test(t)){const g=parse(A(q).replace(/^V = /,'').replace(/a/g,'x'));return[2,5,7].every(x=>close(g(x),h/3*x*x))}
 if(/tính thể tích hình chóp/.test(t)){const a=+t.match(/a = (\d+) cm/)[1];return close(first(A(q)),h/3*a*a,1e-9)}
 const V=+t.match(/thể tích (\d+) cm\^3/)[1];return close(first(A(q)),Math.sqrt(3*V/h),1e-9)};
O['hs3.bang_suy']=(p,q)=>{const m=T(q).match(/A\((-?\d+); (-?\d+)\).*B\((-?\d+); m\)/),a=m[2]/m[1]**2;return close(first(A(q)),a*m[3]**2,1e-9)};
O['hs3.so_sanh']=(p,q)=>{const t=T(q),a=parse(t.match(/y = (.*?)\. So sánh/)[1]),m=t.match(/So sánh y\((-?\d+)\) và y\((-?\d+)\)/),fu=a(+m[1]),fv=a(+m[2]),rel=fu>fv?'>':fu<fv?'<':'=';
 return A(q)==`y(${m[1]}) ${rel} y(${m[2]})`};
O['hs3.so_giao']=(p,q)=>{const t=T(q),m=t.match(/\(P\): y = (.*?) và đường thẳng \(d\): y = (.*?) là/),f1=parse(m[1]),f2=parse(m[2]),f=(x)=>f1(x)-f2(x);
 const c=f(0),a=(f(1)+f(-1))/2-c,b=(f(1)-f(-1))/2,D=b*b-4*a*c,n=D<-1e-9?0:Math.abs(D)<1e-9?1:2;
 return A(q)==['Không có giao điểm','Có đúng 1 giao điểm','Có đúng 2 giao điểm'][n]};
O['hs3.toa_do_giao']=(p,q)=>{const t=T(q),m=t.match(/\(P\): y = (.*?) và đường thẳng \(d\): y = (.*?)\.$/),f1=parse(m[1]),f2=parse(m[2]),f=x=>f1(x)-f2(x);
 const c=f(0),a=(f(1)+f(-1))/2-c,b=(f(1)-f(-1))/2,r=rts(a,b,c),pts=[...A(q).matchAll(/\((-?\d+); (-?\d+)\)/g)].map(x=>[+x[1],+x[2]]);
 return pts.length==2&&sameSet(pts.map(x=>x[0]).sort((u,v)=>u-v),r)&&pts.every(([x,y])=>Math.abs(f1(x)-y)<1e-9&&Math.abs(f2(x)-y)<1e-9)};
O['hs3.nhan_dang_do_thi']=(p,q)=>{const m=T(q).match(/đi qua điểm A\((-?\d+); (-?\d+)\)/),a=m[2]/m[1]**2,g=parse(A(q).replace(/^y = /,''));return close(g(1),a)&&close(g(3),9*a)&&!/\^3|\//.test(A(q))};
O['hs3.tiep_xuc_m']=(p,q)=>{const t=T(q),m=t.match(/\(P\): y = (.*?) và đường thẳng \(d\): y = (.*?) \+ m\./),a=parse(m[1])(1),b=parse(m[2])(1),
 kind=/tiếp xúc/.test(t)?2:/không có điểm chung/.test(t)?1:0,D=mm=>b*b+4*a*mm;
 if(kind==2){const mm=val(A(q).replace(/^m = /,''));return Math.abs(D(mm))<1e-9}
 const a0=A(q),thr=val(a0.replace(/^m\s*[<>≤≥]\s*/,''));
 return[...grid(-40,40,.125),thr-.001,thr+.001,thr].every(mm=>cond(a0,mm)==(kind==0?D(mm)>1e-9:D(mm)<-1e-9))};
O['hs3.dien_tich_giao']=(p,q)=>{const t=T(q),m=t.match(/\(P\): y = (.*?) cắt đường thẳng \(d\): y = (.*?) tại/),f1=parse(m[1]),f2=parse(m[2]),f=x=>f1(x)-f2(x),
 c=f(0),a=(f(1)+f(-1))/2-c,b=(f(1)-f(-1))/2,[x1,x2]=rts(a,b,c);return close(first(A(q)),Math.abs(x1*f1(x2)-x2*f1(x1))/2,1e-9)};

/* ================= PHƯƠNG TRÌNH BẬC HAI : pb2.* ================= */
O['pb2.nhan_biet']=(p,q)=>{const t=T(q).match(/Cho các phương trình: (.*)\. Có bao nhiêu/)[1].replace(/^\(1\) /,''),items=t.split(/; \(\d\) /);let n=0;
 for(const it of items){const g=eqf(it),f=x=>g(x,0),d2=f(3)-2*f(2)+f(1),d2b=f(4)-2*f(3)+f(2),d3=f(5)-3*f(4)+3*f(3)-f(2);if(isFinite(d2)&&Math.abs(d2)>1e-9&&Math.abs(d2-d2b)<1e-9&&Math.abs(d3)<1e-9)n++}
 return String(n)};
O['pb2.dk_bac_hai']=(p,q)=>{const t=T(q),a=eqf(t.match(/Phương trình \((.*?)\)x\^2/)[1]+' = 0',true),bad=grid(-40,40,.25).filter(m=>Math.abs(a(0,m))<1e-9);
 return bad.length==1&&A(q)==`m ≠ ${String(bad[0]).replace('-','-')}`.replace('-','-')};
O['pb2.thu_gon']=(p,q)=>{const e=T(q).match(/Giải phương trình (.*?) = 0 bằng/)[1],[a,b,c]=coef(eqf(e+' = 0')),r=rts(a,b,c),got=A(q).split(';').map(t=>val(t.replace(/^\s*x\s*=\s*/,''))).sort((u,v)=>u-v);
 return sameSet(got,r)&&b%2==0};
O['pb2.viet_cap']=(p,q)=>{const e=T(q).match(/phương trình (.*?) = 0\./)[1],[a,b,c]=coef(eqf(e+' = 0')),D=b*b-4*a*c,m=A(q).match(/x₁ \+ x₂ = (.*?); x₁x₂ = (.*)$/);
 const r=rts(a,b,c);return D>0&&close(val(m[1]),r[0]+r[1])&&close(val(m[2]),r[0]*r[1])};
O['pb2.nham_abc']=(p,q)=>{const e=T(q).match(/phương trình (.*?) = 0\./)[1],[a,b,c]=coef(eqf(e+' = 0'));return sameSet(xlist(q),rts(a,b,c))};
O['pb2.lap_tong_tich']=(p,q)=>{const m=T(q).match(/tổng bằng (-?\d+) và tích bằng (-?\d+)/),[a,b,c]=coef(eqf(A(q)));const r=rts(a,b,c);
 return r.length==2&&close(r[0]+r[1],+m[1])&&close(r[0]*r[1],+m[2])&&Math.abs(a-1)<1e-9};
O['pb2.hai_so_uv']=(p,q)=>{const m=T(q).match(/u \+ v = (-?\d+) và uv = (-?\d+)/),g=A(q).match(/u = (-?\d+); v = (-?\d+)/),u=+g[1],v=+g[2];return u<v&&u+v==+m[1]&&u*v==+m[2]};
O['pb2.nghiem_con_lai']=(p,q)=>{const t=T(q),m=t.match(/phương trình (.*?) = 0 có một nghiệm bằng (-?\d+)/),f=eqf(m[1]+' = 0',true),r=+m[2],o=first(A(q));
 if(/mx/.test(m[1])){const[a,b,c]=coef(f,0);return close(o,c/r)&&Math.abs(f(r,-(r*r+c)/r))<1e-9&&Math.abs(f(o,-(r*r+c)/r))<1e-9}
 const b=(f(1,0)-f(-1,0))/2;return close(o,-b-r)&&Math.abs(f(o,-(o*o+b*o)))<1e-9&&Math.abs(f(r,-(r*r+b*r)))<1e-9};
O['pb2.dx_bt']=(p,q)=>{const t=T(q),e=t.match(/phương trình (.*?) = 0\./)[1],[a,b,c]=coef(eqf(e+' = 0')),r=rts(a,b,c),ex=t.match(/biểu thức A = (.*?)\.(?: \(Nhập|$)/)[1];
 if(r.length!=2)return false;const g=parse(sub(ex));const v1=g(r[0],r[1]),v2=g(r[1],r[0]);return close(v1,v2,1e-9)&&close(val(A(q)),v1,1e-9)};
O['pb2.viet_m_tong']=(p,q)=>{const t=T(q),e=t.match(/phương trình (.*?) = 0 \(m là tham số\)/)[1],f=eqf(e+' = 0',true),k=+t.match(/x₁\^2 \+ x₂\^2 = (\d+)/)[1],ok=[];
 for(const m of grid(-90,90,.25)){const[a,b,c]=coef(f,m),r=rts(a,b,c);if(r.length==2&&Math.abs(r[0]**2+r[1]**2-k)<1e-7)ok.push(m)}
 return ok.length==1&&close(first(A(q)),ok[0],1e-9)};
O['pb2.he_thuc']=(p,q)=>{const t=T(q),m=t.match(/Cho phương trình (.*?) = 0 \(m là tham số\) có hai nghiệm x₁, x₂\. Tìm m để (.*)\.$/),f=eqf(m[1]+' = 0',true),g=eqf(sub(m[2]),false),ok=[];
 for(const mm of grid(-90,90,.25)){const[a,b,c]=coef(f,mm),r=rts(a,b,c);if(r.length==2&&(Math.abs(g(r[0],r[1]))<1e-9||Math.abs(g(r[1],r[0]))<1e-9))ok.push(mm)}
 return ok.length==1&&close(first(A(q)),ok[0],1e-9)};
O['pb2.dau_nghiem']=(p,q)=>{const t=T(q),m=t.match(/Tìm m để phương trình (.*?) = 0 có (hai nghiệm [^.]*)\./),f=eqf(m[1]+' = 0',true),kind=m[2],a0=A(q);
 return grid(-45,45,.25).every(mm=>{const[a,b,c]=coef(f,mm),r=rts(a,b,c);let tr;
  if(/trái dấu/.test(kind))tr=r.length==2&&r[0]*r[1]<0;else if(/cùng dấu/.test(kind))tr=r.length>=1&&(r.length==2?r[0]*r[1]>0:r[0]!=0);
  else if(/dương phân biệt/.test(kind))tr=r.length==2&&r[0]>0;else tr=r.length==2&&r[1]<0;
  return cond(a0,mm)==tr})};
O['pb2.delta_m']=(p,q)=>{const t=T(q),m=t.match(/Tìm m để phương trình (.*?) = 0 (có hai nghiệm phân biệt|có nghiệm kép|vô nghiệm|có nghiệm)\./),f=eqf(m[1]+' = 0',true),a0=A(q);
 const D=mm=>{const[a,b,c]=coef(f,mm);return b*b-4*a*c};
 if(m[2]=='có nghiệm kép'){return Math.abs(D(val(a0.replace(/^m = /,''))))<1e-9}
 const thr=val(a0.replace(/^m\s*[<>≤≥]\s*/,'')),tr=d=>m[2]=='có hai nghiệm phân biệt'?d>1e-9:m[2]=='vô nghiệm'?d<-1e-9:d>=-1e-9;
 return[...grid(-40,40,.125),thr-.0005,thr+.0005].every(mm=>cond(a0,mm)==tr(D(mm)))&&cond(a0,thr)==tr(D(thr))};
O['pb2.tuyet_doi']=(p,q)=>{const t=T(q),e=t.match(/phương trình (.*?) = 0 có hai nghiệm/)[1],[a,b,c]=coef(eqf(e+' = 0')),r=rts(a,b,c);if(r.length!=2)return false;
 let ex=t.match(/T = (.*?)\.(?: \(Nhập|$)/)[1];const X=r[1],Y=r[0];ex=sub(ex).replace(/\|x\|/g,'abs(X)').replace(/\|y\|/g,'abs(Y)').replace(/x/g,'(X)').replace(/y/g,'(Y)').replace(/(\d)(abs|\()/g,'$1*$2').replace(/\)(abs|\()/g,')*$1').replace(/\|/g,'');
 const abs=Math.abs,v=Function('abs','X','Y','return '+ex)(abs,X,Y);return close(val(A(q)),v,1e-9)};
O['pb2.ct_can']=(p,q)=>{const t=T(q),e=t.match(/phương trình (.*?) = 0 có hai nghiệm dương/)[1],[a,b,c]=coef(eqf(e+' = 0')),r=rts(a,b,c);if(r.length!=2||r[0]<=0)return false;
 const diff=/√x₁ - √x₂/.test(t);return close(first(A(q)),diff?Math.sqrt(r[1])-Math.sqrt(r[0]):Math.sqrt(r[0])+Math.sqrt(r[1]),1e-9)};
O['pb2.min_tong_bp']=(p,q)=>{const t=T(q),e=t.match(/phương trình (.*?) = 0 \(m là tham số\)/)[1],f=eqf(e+' = 0',true),askM=/giá trị của m/.test(t);
 const A2=mm=>{const[a,b,c]=coef(f,mm),r=rts(a,b,c);if(r.length!=2)return NaN;return r[0]**2+r[1]**2};
 for(const mm of grid(-30,30,.5))if(!(A2(mm)>=0))return false;
 let lo=-300,hi=300;for(let i=0;i<200;i++){const m1=lo+(hi-lo)/3,m2=hi-(hi-lo)/3;if(A2(m1)<A2(m2))hi=m2;else lo=m1}
 const mm=(lo+hi)/2;return close(first(A(q)),askM?mm:A2(mm),1e-6)};
/* phương trình chứa ẩn ở mẫu: thông qua nhân với các mẫu rồi nội suy đa thức bậc hai, loại giá trị làm mẫu bằng 0 */
const denPts=s=>[...s.matchAll(/\/\((x[^()]*)\)\)/g)].map(m=>{const d=parse(m[1]);return-d(0)/(d(1)-d(0))}),
 frac=(s)=>{const[l,r]=s.split('=').map(u=>u.trim());return[parse(l),parse(r)]};
O['pb2.mau_hai_phan']=(p,q)=>{const t=T(q).match(/Giải phương trình (.*)\.$/)[1].replace(/\s/g,''),[fl,fr]=frac(t),pts=[...new Set(denPts(strip(q.q).replace(/−/g,'-').replace(/\s/g,'')))];
 if(pts.length!=2)return false;const h=x=>(fl(x)-fr(x))*pts.reduce((s,u)=>s*(x-u),1),x0=10,h0=h(x0),h1=h(x0+1),h2=h(x0+2),a=(h2-2*h1+h0)/2,b=h1-h0-a*(2*x0+1),c=h0-a*x0*x0-b*x0;
 const r=rts(a,b,c).filter(x=>!pts.some(u=>Math.abs(x-u)<1e-9)),got=xlist(q);return sameSet(got,r)&&r.every(x=>Math.abs(fl(x)-fr(x))<1e-6)};
O['pb2.mau_loai']=(p,q)=>{const t=T(q).match(/Giải phương trình (.*)\.$/)[1].replace(/\s/g,''),[fl,fr]=frac(t),pts=denPts(strip(q.q).replace(/−/g,'-').replace(/\s/g,''));
 if(pts.length!=1)return false;const u=pts[0],h=x=>(fl(x)-fr(x))*(x-u),x0=10,h0=h(x0),h1=h(x0+1),h2=h(x0+2),a=(h2-2*h1+h0)/2,b=h1-h0-a*(2*x0+1),c=h0-a*x0*x0-b*x0;
 const r=rts(a,b,c).filter(x=>Math.abs(x-u)>1e-9),got=xlist(q);return sameSet(got,r)};

/* ================= LẬP PHƯƠNG TRÌNH : lp.* ================= */
const scan=(f,lo=1,hi=600)=>{const r=[];for(let x=lo;x<=hi;x++)if(Math.abs(f(x))<1e-9)r.push(x);return r},
 tgian=s=>{let m;if(m=s.match(/(\d+) giờ (\d+) phút/))return +m[1]+m[2]/60;if(m=s.match(/(\d+) phút/))return m[1]/60;return +s.match(/(\d+(?:\.\d+)?) giờ/)[1]};
O['lp.chon_pt']=(p,q)=>{const t=T(q);let xs,m;
 if(m=t.match(/chiều dài hơn chiều rộng (\d+) m và có diện tích (\d+) m\^2/))xs=scan(x=>x*(x+ +m[1])-m[2]);
 else if(m=t.match(/AB dài (\d+) km.*thêm (\d+) km\/h thì đến B sớm hơn (\d+) giờ/))xs=scan(x=>m[1]/x-m[1]/(x+ +m[2])-m[3]);
 else if(m=t.match(/làm (\d+) chiếc áo.*thêm (\d+) chiếc.*sớm hơn (\d+) ngày/))xs=scan(x=>m[1]/x-m[1]/(x+ +m[2])-m[3]);
 else if(m=t.match(/Tổng bình phương của hai số tự nhiên liên tiếp bằng (\d+)/))xs=scan(x=>x*x+(x+1)**2-m[1]);
 else throw new Error('đề lạ: '+t);
 if(xs.length!=1)return false;const[a,b,c]=coef(eqf(A(q)));const r=rts(a,b,c).filter(x=>x>0);
 return Math.abs(a*xs[0]**2+b*xs[0]+c)<1e-9&&r.length==1&&Math.abs(r[0]-xs[0])<1e-9};
O['lp.hcn_hon_kem']=(p,q)=>{const t=T(q),m=t.match(/hơn chiều rộng (\d+) m và có diện tích (\d+) m\^2/),w=scan(x=>x*(x+ +m[1])-m[2]);if(w.length!=1)return false;
 const x=w[0],d=+m[1],v=/Tính chiều rộng/.test(t)?x:/Tính chiều dài/.test(t)?x+d:2*(2*x+d);return close(first(A(q)),v,1e-9)};
O['lp.chu_vi_dien_tich']=(p,q)=>{const m=T(q).match(/chu vi (\d+) m và diện tích (\d+) m\^2/),r=[];for(let w=1;w<400;w++)for(let l=w;l<400;l++)if(2*(w+l)==+m[1]&&w*l==+m[2])r.push(l);return r.length==1&&close(first(A(q)),r[0],1e-9)};
O['lp.so_tu_nhien']=(p,q)=>{const t=T(q),S=+t.match(/bằng (\d+)\./)[1],k=/liên tiếp/.test(t)&&/chẵn|lẻ/.test(t)?2:1,par=/chẵn/.test(t)?0:/lẻ/.test(t)?1:-1,r=[];
 for(let n=0;n<400;n++)if((par<0||n%2==par)&&n*n+(n+k)**2==S)r.push(n);return r.length==1&&close(first(A(q)),/Tìm số lớn/.test(t)?r[0]+k:r[0],1e-9)};
O['lp.tam_giac_vuong']=(p,q)=>{const t=T(q),m=t.match(/cạnh huyền dài (\d+) cm, hai cạnh góc vuông hơn kém nhau (\d+) cm/),r=scan(x=>x*x+(x+ +m[2])**2-m[1]**2);if(r.length!=1)return false;
 const a=r[0],b=a+ +m[2],c=+m[1],v=/diện tích/.test(t)?a*b/2:/chu vi/.test(t)?a+b+c:b;return close(first(A(q)),v,1e-9)};
O['lp.hcn_thay_doi']=(p,q)=>{const t=T(q),m=t.match(/diện tích (\d+) m\^2\. Nếu tăng chiều rộng thêm (\d+) m và giảm chiều dài (\d+) m/),S=+m[1],a=+m[2],b=+m[3],r=[];
 for(let w=1;w<=S;w++)if(S%w==0&&Math.abs((w+a)*(S/w-b)-S)<1e-9)r.push(w);return r.length==1&&close(first(A(q)),/Tính chiều rộng/.test(t)?r[0]:S/r[0],1e-9)};
O['lp.chuyen_dong']=(p,q)=>{const t=T(q),m=t.match(/dài (\d+) km/),S=+m[1],d=+t.match(/(\d+) km\/h/)[1],tt=tgian(t.match(/(?:sớm hơn|nhiều hơn thời gian đi) (.*?)\./)[1]),dir0=/tăng vận tốc/.test(t);
 const r=scan(x=>dir0?S/x-S/(x+d)-tt:(x>d?S/(x-d)-S/x-tt:1),1,800);return r.length==1&&close(first(A(q)),r[0],1e-9)};
O['lp.dong_nuoc']=(p,q)=>{const m=T(q).match(/xuôi dòng (\d+) km.*hết tổng cộng (\d+) giờ.*dòng nước là (\d+) km\/h/),S=+m[1],Tt=+m[2],w=+m[3];
 const r=scan(x=>x>w?S/(x+w)+S/(x-w)-Tt:1,1,800);return r.length==1&&close(first(A(q)),r[0],1e-9)};
O['lp.nang_suat']=(p,q)=>{const m=T(q).match(/phải \S+ (\d+) .*?thêm (\d+) .*?sớm hơn kế hoạch (\d+) ngày/),N=+m[1],a=+m[2],d=+m[3];
 const r=scan(x=>N/x-N/(x+a)-d,1,2000);return r.length==1&&close(first(A(q)),r[0],1e-9)};
O['lp.hai_voi']=(p,q)=>{const t=T(q),m=t.match(/thì sau (\d+) giờ/),T0=+m[1],d=+t.match(/nhanh hơn \S+ thứ hai (\d+) giờ/)[1],r=[];
 for(let a=1;a<=600;a++)for(let b=a+1;b<=600;b++)if(b-a==d&&Math.abs(1/a+1/b-1/T0)<1e-12)r.push([a,b]);
 return r.length==1&&close(first(A(q)),/Hỏi \S+ thứ nhất/.test(t)?r[0][0]:r[0][1],1e-9)};
O['lp.chia_deu']=(p,q)=>{const m=T(q).match(/chia đều (\d+) .*?Nếu bớt đi (\d+) .*?nhận thêm (\d+) /),N=+m[1],c=+m[2],e=+m[3],r=scan(x=>x>c?N/(x-c)-N/x-e:1,1,1000);return r.length==1&&close(first(A(q)),r[0],1e-9)};
O['lp.giam_gia_kep']=(p,q)=>{const t=T(q);let m,dec=false;
 if(m=t.match(/ban đầu là (\d+) nghìn đồng, sau hai lần giảm còn (\d+) nghìn đồng/))dec=true;
 else if(!(m=t.match(/gửi tiết kiệm (\d+) triệu đồng.*?là (\d+) triệu đồng/)))m=t.match(/năm 2024 là (\d+) người, đến năm 2026 là (\d+) người/);
 const A0=+m[1],A2=+m[2],r=[];for(let x=1;x<=(dec?99:300);x++){const f=dec?(1-x/100):(1+x/100);if(Math.abs(A0*f*f-A2)<1e-6)r.push(x)}
 return r.length==1&&close(first(A(q)),r[0],1e-9)};

/* ================= THỐNG KÊ : tk3.* ================= */
const pctOf=(f,N)=>f*100/N,pv=s=>first(strip(s).replace(/−/g,'-').replace(/(\d),(\d)/g,'$1.$2')),
 svgTexts=f=>[...String(f).matchAll(/<text[^>]*>(.*?)<\/text>/g)].map(m=>m[1]),svgRects=f=>[...String(f).matchAll(/<rect[^>]*height="([\d.]+)"/g)].map(m=>+m[1]);
O['tk3.dem_mau']=(p,q)=>{const t=T(q),L0=t.match(/học sinh: (.*?)\. (?:Có|Tính|Giá)/)[1].split('; ').map(Number),N=L0.length,cnt=v=>L0.filter(x=>x==v).length;let v;
 if(/Giá trị nào có tần số lớn nhất/.test(t)){const mx=Math.max(...[5,6,7,8,9,10].map(cnt)),ms=[5,6,7,8,9,10].filter(x=>cnt(x)==mx);return ms.length==1&&A(q)==`điểm ${ms[0]}`}
 if(/được điểm (\d+)\?/.test(t))v=cnt(+t.match(/được điểm (\d+)\?/)[1]);
 else if(/từ (\d+) điểm trở lên/.test(t)){const g=+t.match(/từ (\d+) điểm/)[1];v=L0.filter(x=>x>=g).length}
 else v=pctOf(cnt(+t.match(/giá trị (\d+) /)[1]),N);
 return close(first(A(q)),v,1e-9)};
O['tk3.tstd_bang']=(p,q)=>{const t=T(q),es=[...t.matchAll(/điểm (\d+) có (\d+) học sinh/g)].map(m=>[+m[1],+m[2]]),N=+t.match(/của (\d+) học sinh/)[1],v=+t.match(/tương đối của điểm (\d+) là/)[1];
 return es.reduce((s,e)=>s+e[1],0)==N&&close(pv(A(q)),pctOf(es.find(e=>e[0]==v)[1],N),1e-9)};
O['tk3.tstd_thieu']=(p,q)=>{const es=[...T(q).matchAll(/điểm \d+: (x|\d+)%/g)].map(m=>m[1]);const s=es.filter(x=>x!='x').reduce((a,b)=>a+ +b,0);return es.filter(x=>x=='x').length==1&&close(first(A(q)),100-s,1e-9)};
O['tk3.nhom_dem']=(p,q)=>{const t=T(q),L0=t.match(/học sinh: (.*?)\. Chia/)[1].split('; ').map(Number),g=t.match(/thuộc nhóm \[(\d+);(\d+)\)/);return close(first(A(q)),L0.filter(x=>x>=+g[1]&&x<+g[2]).length,1e-9)};
O['tk3.so_nhom']=(p,q)=>{const m=T(q).match(/nhỏ nhất là (\d+) và lớn nhất là (\d+).*độ rộng (\d+) dạng \[(\d+);/),mn=+m[1],mx=+m[2],w=+m[3],s=+m[4];if(mn<s)return false;let k=0;while(s+k*w<=mx)k++;return close(first(A(q)),k,1e-9)};
O['tk3.tstd_nhom_bang']=(p,q)=>{const t=T(q),es=[...t.matchAll(/\[(\d+);(\d+)\): (\d+)/g)].map(m=>[+m[1],+m[3]]),N=+t.match(/của (\d+) học sinh/)[1],g=+t.match(/nhóm \[(\d+);\d+\) là/)[1];
 return es.reduce((s,e)=>s+e[1],0)==N&&close(pv(A(q)),pctOf(es.find(e=>e[0]==g)[1],N),1e-9)};
O['tk3.cot_doc']=(p,q)=>{const tx=svgTexts(q.f),vals=[],h=svgRects(q.f);for(let i=0;i<tx.length;i+=2)vals.push(+tx[i]);const t=T(q);
 if(h.length!=vals.length||!h.every((x,i)=>Math.abs(x/vals[i]-h[0]/vals[0])<1e-6))return false;const N=vals.reduce((a,b)=>a+b,0),cats=[];for(let i=1;i<tx.length;i+=2)cats.push(+tx[i]);
 if(/tất cả bao nhiêu/.test(t))return close(first(A(q)),N,1e-9);
 if(/tần số tương đối của giá trị (\d+)/.test(t)){const v=+t.match(/tương đối của giá trị (\d+)/)[1];return close(pv(A(q)),pctOf(vals[cats.indexOf(v)],N),1e-9)}
 const v=+t.match(/(?:được điểm|đọc|ghi được) (\d+)/)[1];return close(first(A(q)),vals[cats.indexOf(v)],1e-9)};
O['tk3.hist_tu_n']=(p,q)=>{const t=T(q),tx=svgTexts(q.f),h=svgRects(q.f),pcs=[],lb=[];for(let i=0;i<tx.length;i+=2){pcs.push(parseFloat(tx[i]));lb.push(+tx[i+1].match(/\[(\d+);/)[1])}
 if(!h.every((x,i)=>Math.abs(x/pcs[i]-h[0]/pcs[0])<1e-6)||Math.abs(pcs.reduce((a,b)=>a+b,0)-100)>1e-9)return false;
 const N=+t.match(/của (\d+) học sinh/)[1],g=+t.match(/cao từ (\d+) cm/)[1];return close(first(A(q)),N*pcs.filter((_,i)=>lb[i]>=g).reduce((a,b)=>a+b,0)/100,1e-9)};
O['tk3.nhom_thieu_tstd']=(p,q)=>{const t=T(q),N=+t.match(/của (\d+) học sinh/)[1],es=[...t.matchAll(/\[(\d+);(\d+)\): (x|\d+)/g)].map(m=>[+m[1],m[3]]),sk=es.filter(e=>e[1]!='x').reduce((a,e)=>a+ +e[1],0),x=N-sk,g=+t.match(/nhóm \[(\d+);\d+\) \(đơn vị/)[1];
 return es.find(e=>e[1]=='x')[0]==g&&close(first(A(q)),Math.round(pctOf(x,N)*10)/10,1e-9)};
O['tk3.so_sanh_nhom']=(p,q)=>{const t=T(q),N=+t.match(/của (\d+) học sinh/)[1],es=Object.fromEntries([...t.matchAll(/\[(\d+);(\d+)\): (\d+)/g)].map(m=>[m[1],+m[3]])),m=t.match(/nhóm \[(\d+);\d+\) lớn hơn tần số tương đối của nhóm \[(\d+);/);
 return close(first(A(q)),pctOf(es[m[1]],N)-pctOf(es[m[2]],N),1e-9)};

/* ================= XÁC SUẤT : xs3.* ================= */
const fq2=(f,n)=>reduceStr(f,n),isPr=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true},
 sameFrac=(q,f,n)=>{const a=A(q);return a==fq2(f,n)};
O['xs3.kgm_rut']=(p,q)=>{const t=T(q);let v;
 if(/Tung đồng thời (\d+) đồng xu/.test(t))v=2**+t.match(/(\d+) đồng xu/)[1];
 else{const n=+t.match(/có (\d+) quả bóng/)[1];if(/không trả lại/.test(t)){/* đếm các cặp có thứ tự khác nhau */let c=0;for(let a=1;a<=n;a++)for(let b=1;b<=n;b++)if(a!=b)c++;v=c}
  else if(/được trả lại/.test(t))v=n*n;else{let c=0;for(let a=1;a<=n;a++)for(let b=a+1;b<=n;b++)c++;v=c}}
 return A(q)==String(v)};
const dicePred=(d,n)=>{let m;
 if(m=d.match(/^tổng số chấm bằng (\d+)$/))return(a,b)=>a+b==+m[1];
 if(m=d.match(/^tổng số chấm nhỏ hơn (\d+)$/))return(a,b)=>a+b<+m[1];
 if(m=d.match(/^tổng số chấm lớn hơn hoặc bằng (\d+)$/))return(a,b)=>a+b>=+m[1];
 if(m=d.match(/^tích số chấm lớn hơn hoặc bằng (\d+)$/))return(a,b)=>a*b>=+m[1];
 if(d=='hai mặt có số chấm bằng nhau')return(a,b)=>a==b;if(d=='hai mặt có số chấm khác nhau')return(a,b)=>a!=b;
 if(d=='tổng số chấm là số chẵn')return(a,b)=>(a+b)%2==0;if(d=='tích số chấm là số lẻ')return(a,b)=>(a*b)%2==1;if(d=='tích số chấm là số chẵn')return(a,b)=>(a*b)%2==0;
 if(m=d.match(/^ít nhất một con xúc xắc có (\d+) chấm$/))return(a,b)=>a==+m[1]||b==+m[1];
 if(m=d.match(/^số chấm lớn nhất trong hai con bằng (\d+)$/))return(a,b)=>Math.max(a,b)==+m[1];
 if(m=d.match(/^số chấm nhỏ nhất trong hai con bằng (\d+)$/))return(a,b)=>Math.min(a,b)==+m[1];
 if(m=d.match(/^hiệu hai số chấm \(số lớn trừ số nhỏ\) bằng (\d+)$/))return(a,b)=>Math.abs(a-b)==+m[1];
 if(d=='tổng số chấm là số nguyên tố')return(a,b)=>isPr(a+b);
 if(d=='số chấm của con thứ nhất lớn hơn số chấm của con thứ hai')return(a,b)=>a>b;
 throw new Error('biến cố lạ: '+d)};
const diceOr=n=>(p,q)=>{const t=T(q),d=t.match(/biến cố "(.*)" là/)[1],pr=dicePred(d,n);if(!new RegExp(`${n} mặt`).test(t))return false;let f=0;for(let a=1;a<=n;a++)for(let b=1;b<=n;b++)if(pr(a,b))f++;return A(q)==fq2(f,n*n)};
O['xs3.xx4mat']=diceOr(4);O['xs3.xx6mat']=diceOr(6);
O['xs3.vong_quay']=(p,q)=>{const t=T(q),n=+t.match(/có (\d+) ô/)[1],d=t.match(/ô ghi (.*) là$/)[1];let pr,m;
 if(d=='số nguyên tố')pr=isPr;else if(m=d.match(/^bội của (\d+)$/))pr=x=>x%+m[1]==0;else if(m=d.match(/^số chia (\d+) dư 1$/))pr=x=>x%+m[1]==1;
 else if(d=='số chính phương')pr=x=>Number.isInteger(Math.sqrt(x));else if(m=d.match(/^số lớn hơn (\d+)$/))pr=x=>x>+m[1];else throw new Error('lạ '+d);
 let f=0;for(let x=1;x<=n;x++)if(pr(x))f++;return A(q)==fq2(f,n)};
O['xs3.hai_tui']=(p,q)=>{const t=T(q),m=t.match(/túi I có 3 tấm thẻ ghi các số (.*?), túi II có 3 tấm thẻ ghi các số (.*?)\. Rút/),Aa=m[1].split('; ').map(Number),Bb=m[2].split('; ').map(Number),d=t.match(/Xác suất để (.*) là$/)[1];let pr,k;
 if(d=='tổng hai số là số chẵn')pr=(a,b)=>(a+b)%2==0;else if(d=='hai số ghi trên hai thẻ bằng nhau')pr=(a,b)=>a==b;else if(d=='tích hai số là số lẻ')pr=(a,b)=>a*b%2==1;
 else if(k=d.match(/lớn hơn hoặc bằng (\d+)/))pr=(a,b)=>a+b>=+k[1];else throw new Error('lạ '+d);
 let f=0;for(const a of Aa)for(const b of Bb)if(pr(a,b))f++;return A(q)==fq2(f,9)};
O['xs3.mau_bi']=(p,q)=>{const t=T(q),m=t.match(/đựng (\d+) viên bi đỏ, (\d+) viên bi xanh và (\d+) viên bi vàng/),c={đỏ:+m[1],xanh:+m[2],vàng:+m[3]},N=c.đỏ+c.xanh+c.vàng,d=t.match(/lấy được (.*) là$/)[1];let f,k;
 if(k=d.match(/^viên bi màu (\S+)$/))f=c[k[1]];else if(k=d.match(/^viên bi không phải màu (\S+)$/))f=N-c[k[1]];else if(k=d.match(/^viên bi màu (\S+) hoặc màu (\S+)$/))f=c[k[1]]+c[k[2]];else throw new Error('lạ '+d);
 return A(q)==fq2(f,N)};
O['xs3.xep_hang']=(p,q)=>{const t=T(q),n=+t.match(/Xếp ngẫu nhiên (\d+) bạn/)[1],d=t.match(/để (.*)\. \(Nhập/)[1];let f=0,tot=0;
 for(let a=0;a<n;a++)for(let b=0;b<n;b++){if(a==b)continue;tot++;let ok;
  if(d=='hai bạn An và Bình đứng cạnh nhau')ok=Math.abs(a-b)==1;else if(d=='bạn An đứng ở đầu hàng')ok=a==0;else if(d=='hai bạn An và Bình đứng ở hai đầu hàng')ok=(a==0&&b==n-1)||(a==n-1&&b==0);
  else if(d=='hai bạn An và Bình không đứng cạnh nhau')ok=Math.abs(a-b)!=1;else if(d=='bạn An đứng ở một trong hai đầu hàng')ok=a==0||a==n-1;else throw new Error('lạ '+d);if(ok)f++}
 return A(q)==fq2(f,tot)};
O['xs3.hai_the_cung_luc']=(p,q)=>{const t=T(q),n=+t.match(/đánh số từ 1 đến (\d+)/)[1],d=t.match(/để (.*)\. \(Nhập/)[1];let f=0,tot=0,m;
 for(let a=1;a<=n;a++)for(let b=a+1;b<=n;b++){tot++;let ok;if(d=='tổng hai số trên hai thẻ là số chẵn')ok=(a+b)%2==0;else if(d=='tích hai số trên hai thẻ là số chẵn')ok=(a*b)%2==0;
  else if(m=d.match(/bằng (\d+)$/))ok=a+b==+m[1];else throw new Error('lạ '+d);if(ok)f++}
 return A(q)==fq2(f,tot)};
O['xs3.khong_hoan_lai']=(p,q)=>{const t=T(q),m=t.match(/có (\d+) viên bi đỏ và (\d+) viên bi xanh/),a=+m[1],b=+m[2],balls=[...Array(a).fill('d'),...Array(b).fill('x')],d=t.match(/để (.*)\. \(Nhập/)[1];let f=0,tot=0;
 for(let i=0;i<balls.length;i++)for(let j=0;j<balls.length;j++){if(i==j)continue;tot++;const u=balls[i],v=balls[j];if(d=='cả hai viên đều màu đỏ'?u=='d'&&v=='d':d=='cả hai viên đều màu xanh'?u=='x'&&v=='x':u!=v)f++}
 return A(q)==fq2(f,tot)};
O['xs3.so_hai_chu_so']=(p,q)=>{const d=T(q).match(/số được chọn (.*)\. \(Nhập/)[1];let f=0,m;
 for(let x=10;x<=99;x++){const h=Math.floor(x/10),u=x%10;let ok;
  if(m=d.match(/^chia hết cho (\d+)$/))ok=x%+m[1]==0;else if(d=='có hai chữ số giống nhau')ok=h==u;else if(d=='là số nguyên tố')ok=isPr(x);
  else if(m=d.match(/^có tổng hai chữ số bằng (\d+)$/))ok=h+u==+m[1];else if(d=='có tích hai chữ số bằng 0')ok=h*u==0;
  else if(m=d.match(/^có chữ số hàng đơn vị bằng (\d+)$/))ok=u==+m[1];else if(d=='có chữ số hàng chục lớn hơn chữ số hàng đơn vị')ok=h>u;else throw new Error('lạ '+d);if(ok)f++}
 return A(q)==fq2(f,90)};
O['xs3.it_nhat']=(p,q)=>{const t=T(q);let f,tot;
 if(/Tung (\d+) đồng xu/.test(t)){const n=+t.match(/Tung (\d+) đồng xu/)[1];tot=2**n;f=0;for(let k=1;k<tot;k++)f++;f=tot-1}
 else{const m=t.match(/có (\d+) viên bi đỏ và (\d+) viên bi xanh/),a=+m[1],b=+m[2],ball=[...Array(a).fill(0),...Array(b).fill(1)];f=0;tot=0;
  for(let i=0;i<ball.length;i++)for(let j=i+1;j<ball.length;j++){tot++;if(ball[i]||ball[j])f++}}
 return A(q)==fq2(f,tot)};

/* ================= ĐƯỜNG TRÒN : tg.* / nt.* ================= */
const D2R=Math.PI/180;
O['tg.cung_chan']=(p,q)=>{const t=T(q),al=+t.match(/∠ACB = (\d+)°/)[1],v=parseFloat(A(q));/* kiểm cả hình: đọc toạ độ các điểm trên SVG và tính góc */
 const pts=[...String(q.f).matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map(m=>[+m[1],+m[2]]);
 const lab=[...String(q.f).matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>([A-DO])<\/text>/g)].map(m=>m[3]);
 const P={};lab.forEach((n,i)=>P[n]=pts[i]);
 const ang=(a,b,c)=>{const u=[P[a][0]-P[b][0],P[a][1]-P[b][1]],w=[P[c][0]-P[b][0],P[c][1]-P[b][1]];return Math.acos((u[0]*w[0]+u[1]*w[1])/Math.hypot(...u)/Math.hypot(...w))/D2R};
 const want=/∠AOB/.test(t)?2*al:al;if(Math.abs(ang('A','C','B')-al)>1.5)return false;
 if(/∠AOB/.test(t)&&Math.abs(ang('A','O','B')-2*al)>1.5)return false;if(/∠ADB/.test(t)&&P.D&&Math.abs(ang('A','D','B')-al)>1.5)return false;
 return v==want};
O['tg.cung_nho_lon']=(p,q)=>{const t=T(q),n=+t.match(/số đo (\d+)°/)[1];return parseFloat(A(q))==(/Điểm C thuộc cung lớn/.test(t)?n/2:180-n/2)};
O['tg.tu_giac_goc']=(p,q)=>{const t=T(q),m=t.match(/∠A = (\d+)° và ∠B = (\d+)°\. Tính số đo ∠(C|D)/),a=+m[1],b=+m[2];
 /* kiểm hình: các cung tạo bởi 4 đỉnh trên đường tròn cho đúng góc A, B */
 const pts=[...String(q.f).matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map(x=>[+x[1],+x[2]]),lab=[...String(q.f).matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>([A-D])<\/text>/g)].map(x=>x[3]),P={};lab.forEach((n,i)=>P[n]=pts[i]);
 const ang=(x,y,z)=>{const u=[P[x][0]-P[y][0],P[x][1]-P[y][1]],w=[P[z][0]-P[y][0],P[z][1]-P[y][1]];return Math.acos((u[0]*w[0]+u[1]*w[1])/Math.hypot(...u)/Math.hypot(...w))/D2R};
 if(Math.abs(ang('B','A','D')-a)>1.5||Math.abs(ang('A','B','C')-b)>1.5)return false;
 const want=m[3]=='C'?ang('B','C','D'):ang('C','D','A');return Math.abs(want-parseFloat(A(q)))<1.5&&parseFloat(A(q))==(m[3]=='C'?180-a:180-b)};
O['tg.nhan_biet_goc']=(p,q)=>{const m=T(q).match(/∠A = (\d+)° và ∠B = (\d+)°/),g=A(q).match(/∠C = (\d+)°; ∠D = (\d+)°/);return+m[1]+ +g[1]==180&&+m[2]+ +g[2]==180};
O['tg.tam_nt']=(p,q)=>{const t=T(q),a=A(q);let m;
 if(/ngoại tiếp một tam giác là giao điểm/.test(t))return/trung trực/.test(a);
 if(/nội tiếp một tam giác là giao điểm/.test(t))return/phân giác/.test(a);
 if(m=t.match(/Tam giác (\w)(\w)(\w) vuông tại (\w)\. Tâm/)){const[,x,y,z,r]=m,o=[x,y,z].filter(c=>c!=r);return a==`trung điểm của cạnh ${o.join('')}`}
 if(/có một góc tù/.test(t))return a=='ngoài tam giác';
 if(/đều\. Phát biểu/.test(t))return a=='Tâm đường tròn ngoại tiếp và tâm đường tròn nội tiếp là cùng một điểm';
 if(m=t.match(/Tam giác (\w)(\w)(\w) có \w\w = (\d+) cm, \w\w = (\d+) cm, \w\w = (\d+) cm/)){const s=[+m[4],+m[5],+m[6]],nm=[m[1]+m[2],m[2]+m[3],m[3]+m[1]],mx=Math.max(...s),i=s.indexOf(mx),o=s.filter((_,j)=>j!=i),d=o[0]**2+o[1]**2-mx*mx;
  return a==(Math.abs(d)<1e-9?`tại trung điểm của ${nm[i]}`:d>0?'trong tam giác':'ngoài tam giác')}
 throw new Error('đề lạ: '+t)};
O['nt.deu_r']=(p,q)=>{const t=T(q);let m;
 if(m=t.match(/cạnh (\d+) cm\. Bán kính đường tròn ngoại tiếp/))return close(rv(A(q)),+m[1]/Math.sqrt(3),1e-9);
 if(m=t.match(/cạnh (\d+) cm\. Bán kính đường tròn nội tiếp/))return close(rv(A(q)),+m[1]/(2*Math.sqrt(3)),1e-9);
 m=t.match(/bán kính (.*?) cm\. Tính độ dài cạnh/);return close(first(A(q)),rv(m[1])*Math.sqrt(3),1e-9)};
O['nt.hv_R']=(p,q)=>{const t=T(q);let m;
 if(m=t.match(/cạnh (\d+) cm nội tiếp/))return close(rv(A(q)),+m[1]/Math.sqrt(2),1e-9);
 m=t.match(/bán kính (\d+) cm\. Cạnh/);return close(rv(A(q)),+m[1]*Math.sqrt(2),1e-9)};
O['nt.vuong_R']=(p,q)=>{const t=T(q),m=t.match(/AB = (\d+) cm, AC = (\d+) cm/),c=Math.hypot(+m[1],+m[2]);return close(first(A(q)),/Chu vi/.test(t)?c:/Tính đường kính/.test(t)?c:c/2,1e-9)};
O['tg.goc_tam_giac_nt']=(p,q)=>{const t=T(q),m=t.match(/∠A = (\d+)° và ∠B = (\d+)°\. Tính số đo (∠\w+)/),A0=+m[1],B0=+m[2],C0=180-A0-B0;
 const pts=[...String(q.f).matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map(x=>[+x[1],+x[2]]),lab=[...String(q.f).matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>([ABCO])<\/text>/g)].map(x=>x[3]),P={};lab.forEach((n,i)=>P[n]=pts[i]);
 const ang=(x,y,z)=>{const u=[P[x][0]-P[y][0],P[x][1]-P[y][1]],w=[P[z][0]-P[y][0],P[z][1]-P[y][1]];return Math.acos((u[0]*w[0]+u[1]*w[1])/Math.hypot(...u)/Math.hypot(...w))/D2R};
 if(Math.abs(ang('B','A','C')-A0)>1.5||Math.abs(ang('A','B','C')-B0)>1.5||C0<=0)return false;
 const g=m[3],v=g=='∠AOB'?ang('A','O','B'):g=='∠BOC'?ang('B','O','C'):ang('C','O','A');return Math.abs(v-parseFloat(A(q)))<1.5&&parseFloat(A(q))==({'∠AOB':2*C0,'∠BOC':2*A0,'∠COA':2*B0})[g]};
O['tg.ti_le_doi']=(p,q)=>{const t=T(q),m=t.match(/∠A : ∠C = (\d+) : (\d+)/),u=+m[1],v=+m[2],k=180/(u+v),a=u*k,c=v*k;return parseFloat(A(q))==(/lớn hơn/.test(t)?Math.max(a,c):Math.min(a,c))&&Math.abs(a+c-180)<1e-9};
/* dựng tam giác nhọn ABC bằng tọa độ, tìm chân đường cao D, E và trực tâm H rồi kiểm tra các khẳng định hình học trên số */
const orth=()=>{const Pt={A:[0,0],B:[10,0],C:[3.2,7.9]},foot=(P0,Q0,R0)=>{const d=[R0[0]-Q0[0],R0[1]-Q0[1]],t=((P0[0]-Q0[0])*d[0]+(P0[1]-Q0[1])*d[1])/(d[0]**2+d[1]**2);return[Q0[0]+t*d[0],Q0[1]+t*d[1]]};return Pt};
O['tg.mo_hinh']=(p,q)=>{const t=T(q),a=A(q);let m;
 if(m=t.match(/Cho tam giác (\w)(\w)(\w) nhọn có hai đường cao (\w)(\w) và (\w)(\w) cắt nhau tại (\w) \(\w thuộc \w\w, \w thuộc \w\w\)\. (.*)$/)){
  const[,a1,b1,c1,,d1,,e1,h1]=m,rest=m[9],Pt={[a1]:[0,0],[b1]:[10,0],[c1]:[3.2,7.9]},sub=(P0,Q0,R0)=>{const d=[R0[0]-Q0[0],R0[1]-Q0[1]],tt=((P0[0]-Q0[0])*d[0]+(P0[1]-Q0[1])*d[1])/(d[0]**2+d[1]**2);return[Q0[0]+tt*d[0],Q0[1]+tt*d[1]]};
  Pt[d1]=sub(Pt[a1],Pt[b1],Pt[c1]);Pt[e1]=sub(Pt[b1],Pt[a1],Pt[c1]);
  /* H = giao AD và BE */const A0=Pt[a1],D0=Pt[d1],B0=Pt[b1],E0=Pt[e1],den=(A0[0]-D0[0])*(B0[1]-E0[1])-(A0[1]-D0[1])*(B0[0]-E0[0]),
   px=((A0[0]*D0[1]-A0[1]*D0[0])*(B0[0]-E0[0])-(A0[0]-D0[0])*(B0[0]*E0[1]-B0[1]*E0[0]))/den,py=((A0[0]*D0[1]-A0[1]*D0[0])*(B0[1]-E0[1])-(A0[1]-D0[1])*(B0[0]*E0[1]-B0[1]*E0[0]))/den;Pt[h1]=[px,py];
  const ang=(x,y,z)=>{const u=[Pt[x][0]-Pt[y][0],Pt[x][1]-Pt[y][1]],w=[Pt[z][0]-Pt[y][0],Pt[z][1]-Pt[y][1]];return Math.acos((u[0]*w[0]+u[1]*w[1])/Math.hypot(...u)/Math.hypot(...w))/D2R},
   onCircle=(e1_,e2_,pts)=>{const c=[(Pt[e1_][0]+Pt[e2_][0])/2,(Pt[e1_][1]+Pt[e2_][1])/2],r=Math.hypot(Pt[e1_][0]-Pt[e2_][0],Pt[e1_][1]-Pt[e2_][1])/2;return pts.every(x=>Math.abs(Math.hypot(Pt[x][0]-c[0],Pt[x][1]-c[1])-r)<1e-6)};
  if(/có đường kính là/.test(rest)){const quad=rest.match(/Tứ giác (\w{4}) nội tiếp/)[1],dia=a;return dia.length==2&&onCircle(dia[0],dia[1],quad.split(''))&&!['A','B','C'].every(()=>false)}
  if(/Hai góc nào sau đây bằng nhau/.test(rest)){const g=a.match(/∠(\w)(\w)(\w) và ∠(\w)(\w)(\w)/);return Math.abs(ang(g[1],g[2],g[3])-ang(g[4],g[5],g[6]))<1e-6}
 }
 if(m=t.match(/∠\w\w\w = 90°|Số đo ∠(\w)(\w)(\w) là$/)&&/đường kính (\w)(\w), điểm (\w) thuộc \(O\) \(\w khác \w, \w\)\. Gọi/.test(t))return a=='90°';
 if(m=t.match(/sao cho ∠(\w)(\w)(\w) = (\d+)°\. Số đo ∠(\w)(\w)(\w) là/))return parseFloat(a)==90-+m[4];
 if(m=t.match(/có ∠\w\w\w = (\d+)°\. Số đo góc ngoài/))return parseFloat(a)==+m[1];
 if(/có ∠\w\w\w \+ ∠\w\w\w = 180°\. Khẳng định/.test(t))return/nội tiếp được đường tròn/.test(a);
 throw new Error('đề lạ: '+t)};
O['nt.dt_ngoai']=(p,q)=>{const t=T(q),m=t.match(/AB = (\d+) cm, AC = (\d+) cm/),c=Math.hypot(+m[1],+m[2]);return close(first(A(q)),/Diện tích/.test(t)?c*c/4:c,1e-9)};
O['nt.deu_cao']=(p,q)=>{const t=T(q),h=+t.match(/đường cao bằng (\d+) cm/)[1],a=h/Math.sin(60*D2R),R0=a/Math.sqrt(3),r=a/(2*Math.sqrt(3));return close(first(A(q)),/nội tiếp/.test(t)?r:R0,1e-9)};

/* ================= HÌNH TRỤ, NÓN, CẦU : kg3.* ================= */
O['kg3.quay_hcn']=(p,q)=>{const t=T(q),m=t.match(/AB = (\d+) cm, AD = (\d+) cm.*quanh cạnh (AB|AD)/),ab=+m[1],ad=+m[2],h=m[3]=='AB'?ab:ad,r=m[3]=='AB'?ad:ab;return A(q)==`${r} cm và ${h} cm`};
O['kg3.quay_hcn_tinh']=(p,q)=>{const t=T(q),m=t.match(/AB = (\d+) cm, AD = (\d+) cm/),h=+m[1],r=+m[2],v=/xung quanh/.test(t)?2*r*h:/toàn phần/.test(t)?2*r*(r+h):r*r*h;return close(first(A(q)),v,1e-9)};
O['kg3.quay_tam_giac']=(p,q)=>{const t=T(q),m=t.match(/AB = (\d+) cm, AC = (\d+) cm.*quanh cạnh (AB|AC)/),ab=+m[1],ac=+m[2],h=m[3]=='AB'?ab:ac,r=m[3]=='AB'?ac:ab,l=Math.hypot(r,h);
 const v=/đường sinh/.test(t)?l:/xung quanh/.test(t)?r*l:r*r*h/3;
 const tx=svgTexts(q.f);if(tx.includes(String(Math.round(l)))&&!/đường sinh/.test(t)&&false)return false;
 return close(first(A(q)),v,1e-9)&&Number.isInteger(v)};
O['kg3.non_stp']=(p,q)=>{const m=T(q).match(/bán kính đáy (\d+) cm và chiều cao (\d+) cm/),r=+m[1],l=Math.hypot(r,+m[2]);return close(first(A(q)),r*(r+l),1e-9)};
O['kg3.cau_dk']=(p,q)=>{const t=T(q),d=+t.match(/đường kính (\d+) cm/)[1],R0=d/2;return close(first(A(q)),/Thể tích/.test(t)?4*R0**3/3:4*R0*R0,1e-9)};
O['kg3.cau_tu_S']=(p,q)=>{const t=T(q),S=+t.match(/diện tích (\d+)π cm/)[1],R0=Math.sqrt(S/4);return close(first(A(q)),/Tính bán kính/.test(t)?R0:4*R0**3/3,1e-9)};
O['kg3.lit']=(p,q)=>{const m=T(q).match(/bán kính đáy (\d+) dm và chiều cao (\d+) dm/);return close(first(A(q)),3.14*m[1]*m[1]*m[2],1e-9)};
O['kg3.tru_tim_r']=(p,q)=>{const t=T(q),S=+t.match(/xung quanh bằng (\d+)π cm/)[1],m=t.match(/bán kính đáy bằng (\d+) cm/),m2=t.match(/chiều cao bằng (\d+) cm/);
 return close(first(A(q)),m?S/(2*+m[1]):S/(2*+m2[1]),1e-9)};
O['kg3.non_h_tu_V']=(p,q)=>{const t=T(q),V=+t.match(/thể tích (\d+)π cm/)[1],h=t.match(/chiều cao (\d+) cm/),r=t.match(/bán kính đáy (\d+) cm/);
 return close(first(A(q)),h?Math.sqrt(3*V/+h[1]):3*V/(r[1]*r[1]),1e-9)};
O['kg3.non_h_bang_r']=(p,q)=>{const t=T(q),m=t.match(/chiều cao (bằng|gấp (\d+) lần) bán kính đáy và có thể tích (\d+)π cm/),k=m[1]=='bằng'?1:+m[2],V=+m[3];
 const r=Math.cbrt(3*V/k);return close(first(A(q)),/Tính chiều cao/.test(t)?k*r:r,1e-9)&&Number.isInteger(Math.round(r*1e6)/1e6)};
O['kg3.tru_gap']=(p,q)=>{const t=T(q),a=+t.match(/tăng (\d+) lần/)[1],b=+t.match(/giảm (\d+) lần/)[1],ratio=/bán kính đáy tăng/.test(t)?a*a/b:a/(b*b);return A(q)==reduceStr(/bán kính đáy tăng/.test(t)?a*a:a,/bán kính đáy tăng/.test(t)?b:b*b)&&close(val(A(q)),ratio,1e-9)};
O['kg3.archimedes']=(p,q)=>{const t=T(q),R0=+t.match(/bán kính (\d+) cm nội tiếp/)[1],h=2*R0,Vc=4/3*Math.PI*R0**3,Vt=Math.PI*R0*R0*h,Sc=4*Math.PI*R0*R0,Stp=2*Math.PI*R0*(R0+h),Sxq=2*Math.PI*R0*h;
 const v=/Thể tích hình cầu/.test(t)?Vc/Vt:/toàn phần/.test(t)?Sc/Stp:Sc/Sxq;return close(val(A(q)),v,1e-9)};
O['kg3.do_nuoc']=(p,q)=>{const m=T(q).match(/bán kính đáy (\d+) cm, chiều cao (\d+) cm.*bình hình trụ có bán kính đáy (\d+) cm/),V=Math.PI*m[1]*m[1]*m[2]/3;return close(first(A(q)),V/(Math.PI*m[3]*m[3]),1e-9)};
O['kg3.khoi_go']=(p,q)=>{const m=T(q).match(/bán kính đáy (\d+) cm, chiều cao (\d+) cm/),r=+m[1],h=+m[2];return close(first(A(q)),(Math.PI*r*r*h-Math.PI*r*r*h/3)/Math.PI,1e-9)};
return O};
