/* Oracle độc lập cho các dạng bài lớp 8 bổ sung từ "Chuyên đề cơ bản Toán 8 KNTT tập 2" (v14):
   mã pt2.* (phân thức), ptr2.* (phương trình), hsn.* (hàm số), xs2.* (xác suất), dd2.* / py2.* (đồng dạng, Pythagore), hc2.* (hình chóp).
   Mỗi oracle TỰ ĐỌC LẠI đề (và cả hình SVG) đang hiển thị rồi tính bằng cách khác với lúc sinh câu hỏi, không dùng tham-số của bộ sinh.
   Trả về chuỗi đáp án đúng hoặc true/false (nhận (tham-số, câu-hỏi)). Với thử ngược MUTATE=1, hàm nhận {...q, a: đáp án nhiễu}
   nên chỉ được dựa vào q.a, không dựa vào q.w. */
const {parse,same,strip,gcd,rv}=require('./expr.js');
module.exports=L=>{
const O={},T=q=>strip(q.q).replace(/\s+/g,' '),svgs=q=>(q.f||'').match(/<svg[\s\S]*?<\/svg>/g)||[],
 num=s=>{s=strip(s).replace(/−/g,'-').replace(/,/g,'.').replace(/\s/g,'');if(/\//.test(s)){const [a,b]=s.split('/');return +a/+b}return +s},
 /* phân thức hiển thị dạng ((n)/(d)): tách tử và mẫu (chuỗi) */
 FRX=s=>{const m=s.match(/^\(\((.*?)\)\/\((.*)\)\)$/);return m?[m[1],m[2]]:null},
 fx=(s)=>parse(s),
 ex=s=>parse(s.replace(/:/g,'/')),
 /* ===== đa thức một biến qua nội suy (cho kiểm tra tối giản, mẫu chung) ===== */
 EPS=1e-6,
 poly=f=>{const N=8,xs=[...Array(N)].map((_,i)=>i-3),A=xs.map(x=>[...Array(N)].map((_,j)=>x**j).concat(f(x,0)));
  for(let i=0;i<N;i++){let p=i;for(let r=i+1;r<N;r++)if(Math.abs(A[r][i])>Math.abs(A[p][i]))p=r;[A[i],A[p]]=[A[p],A[i]];
   for(let r=0;r<N;r++)if(r!=i){const k=A[r][i]/A[i][i];for(let c=i;c<=N;c++)A[r][c]-=k*A[i][c]}}
  const c=A.map((r,i)=>r[N]/r[i]);while(c.length>1&&Math.abs(c[c.length-1])<EPS)c.pop();return c},
 pdeg=c=>c.length-1,
 pdiv=(a,b)=>{a=[...a];const q=Array(Math.max(1,a.length-b.length+1)).fill(0);
  for(let i=a.length-b.length;i>=0;i--){const k=a[i+b.length-1]/b[b.length-1];q[i]=k;for(let j=0;j<b.length;j++)a[i+j]-=k*b[j]}
  const r=a.slice(0,Math.max(1,b.length-1));while(r.length>1&&Math.abs(r[r.length-1])<EPS)r.pop();return[q,r]},
 pzero=c=>c.every(v=>Math.abs(v)<EPS),
 pgcd=(a,b)=>{while(!pzero(b)){const r=pdiv(a,b)[1];a=b;b=r}return a},
 reduced=(n,d)=>pdeg(pgcd(poly(parse(n)),poly(parse(d))))<=0,
 cont=c=>c.reduce((g,v)=>gcd(g,Math.round(Math.abs(v))),0),
 lcm=(a,b)=>a/gcd(a,b)*b,
 roots=(f,lo=-60,hi=60,den=60)=>{const r=[];for(let k=lo*den;k<=hi*den;k++){const x=k/den;if(Math.abs(f(x,0))<1e-9)r.push(x)}return r},
 sameSet=(a,b)=>a.length==b.length&&a.every((v,i)=>Math.abs(v-b[i])<1e-9);

/* ================= PHÂN THỨC ================= */
O['pt2.la_pt']=(p,q)=>{const a=strip(q.a),bad=/√/.test(a)||/\(0\)\)$/.test(a);return /KHÔNG/.test(T(q))?bad:!bad};
O['pt2.dk_nhan_tu']=(p,q)=>{const m=T(q).match(/phân thức \(\(([^/]*)\)\/\((.*)\)\) là$/),f=parse(m[2]),r=roots(f,-15,15,60).sort((a,b)=>a-b),
 got=/mọi x/.test(q.a)?[]:[...strip(q.a).replace(/−/g,'-').matchAll(/x ≠ (-?\d+(?:\/\d+)?)/g)].map(v=>num(v[1])).sort((a,b)=>a-b);return sameSet(r,got)};
O['pt2.gia_tri']=(p,q)=>{const m=T(q).match(/phân thức \(\(([^/]*)\)\/\((.*)\)\) tại (.*?)\. \(Nhập/),x=+m[3].match(/x = (−?\d+)/)[1].replace('−','-'),y=m[3].includes('y')?+m[3].match(/y = (−?\d+)/)[1].replace('−','-'):0,
 d=parse(m[2])(x,y);if(Math.abs(d)<1e-9)return false;return Math.abs(parse(m[1])(x,y)/d-num(q.a))<1e-9};
O['pt2.gt_khong_xd']=(p,q)=>{const m=T(q).match(/[Pp]hân thức \(\(([^/]*)\)\/\((.*)\)\) không xác định/);return Math.abs(parse(m[2])(num(q.a),0))<1e-9};
O['pt2.gt_bang_k']=(p,q)=>{const m=T(q).match(/phân thức \(\(([^/]*)\)\/\((.*)\)\) có giá trị bằng (−?\d+)\./),x=num(q.a),d=parse(m[2])(x,0);
 return Math.abs(d)>1e-9&&Math.abs(parse(m[1])(x,0)/d-num(m[3]))<1e-9};
O['pt2.pt_bang_0']=(p,q)=>{const m=T(q).match(/phân thức \(\(([^/]*)\)\/\((.*)\)\) có giá trị bằng 0/),N=parse(m[1]),D=parse(m[2]),
 r=roots((x)=>Math.abs(D(x,0))<1e-9?1:N(x,0),-60,60,1).sort((a,b)=>a-b),
 got=/Không có/.test(q.a)?[]:[...strip(q.a).replace(/−/g,'-').matchAll(/x = (-?\d+)/g)].map(v=>+v[1]).sort((a,b)=>a-b);return sameSet(r,got)};
O['pt2.cap_bang_nhau']=(p,q)=>{const cross=(a,b,c,d)=>same((x)=>parse(a)(x)*parse(d)(x),(x)=>parse(c)(x)*parse(b)(x));
 if(/^Phân thức nào/.test(T(q))){const P=T(q).match(/bằng phân thức \(\((.*?)\)\/\((.*?)\)\)\?/),A=FRX(strip(q.a));return cross(P[1],P[2],A[0],A[1])}
 const m=strip(q.a).match(/^\(\((.*?)\)\/\((.*?)\)\) = \(\((.*?)\)\/\((.*?)\)\)$/);return cross(m[1],m[2],m[3],m[4])};
O['pt2.tim_da_thuc']=(p,q)=>{const m=T(q).match(/biết \(\((.*?)\)\/\((.*?)\)\) = \(\(A\)\/\((.*?)\)\)\./),A=parse(q.a),n=parse(m[1]),d=parse(m[2]),dr=parse(m[3]);
 return same((x)=>n(x)*dr(x),(x)=>A(x)*d(x))};
const fracEq=(q,exprRe)=>{const e=T(q).match(exprRe)[1],A=FRX(strip(q.a))||[strip(q.a),'1'],f=ex(e);return{f,A,g:parse('(('+A[0]+')/('+A[1]+'))')}};
O['pt2.rut_gon_ntc']=(p,q)=>{const {f,A,g}=fracEq(q,/phân thức (.*?) \(với/);return same(f,g)&&reduced(A[0],A[1])};
O['pt2.rut_gon_doi_dau']=(p,q)=>{const f=ex(T(q).match(/phân thức (.*?) \(với/)[1]),v=[3.3,5.7,-2.2,7.9,11.1].map(x=>f(x,0));return v.every(t=>Math.abs(t-v[0])<1e-9)&&Math.abs(v[0]-num(q.a))<1e-9};
O['pt2.rut_gon_hd']=(p,q)=>{const {f,A,g}=fracEq(q,/phân thức (.*?) \(với/);return same(f,g)&&(/y/.test(q.q+q.a)||reduced(A[0],A[1]))};
O['pt2.mtc']=(p,q)=>{const m=T(q).match(/hai phân thức \(\(1\)\/\((.*?)\)\) và \(\(1\)\/\((.*?)\)\) là$/),A=poly(parse(m[1])),B=poly(parse(m[2])),Mt=poly(parse(q.a));
 if(!pzero(pdiv(Mt,A)[1])||!pzero(pdiv(Mt,B)[1]))return false;
 const dg=pdeg(pgcd(A,B));if(pdeg(Mt)!=pdeg(A)+pdeg(B)-dg)return false;
 return Math.abs(Math.abs(Mt[Mt.length-1])-lcm(cont(A),cont(B)))<1e-6};
const expr1=re=>(p,q)=>{const {f,A,g}=fracEq(q,re);return same(f,g)&&(!FRX(strip(q.a))||/y/.test(q.q)||reduced(A[0],A[1]))};
O['pt2.cong_cung_mau']=(p,q)=>{const f=ex(T(q).match(/^Tính: (.*?) \(với/)[1]),g=parse(q.a);return same(f,g)};
O['pt2.cong_doi_dau']=expr1(/^Tính: (.*?) \(với/);
O['pt2.cong_khac_mau']=expr1(/^Tính: (.*?) \(với/);
O['pt2.cong_mau_binh']=expr1(/^Tính: (.*?) \(với/);
O['pt2.nhan']=expr1(/^Tính: (.*?) \(với/);
O['pt2.chia']=expr1(/^Tính: (.*?) \(với/);
O['pt2.cong_3']=expr1(/^Tính: (.*?) \(với/);
O['pt2.chia_hai_bien']=(p,q)=>{const {f,A,g}=fracEq(q,/^Tính: (.*?) \(với/);return same(f,g)};
O['pt2.nghich_dao']=(p,q)=>{const t=T(q),m=t.match(/của phân thức \(\((.*?)\)\/\((.*?)\)\)/),Pf=parse('(('+m[1]+')/('+m[2]+'))'),A=parse(q.a);
 return /đối/.test(t)?same((x)=>A(x)+Pf(x),()=>0):same((x)=>A(x)*Pf(x),()=>1)};
O['pt2.bt_thoi_gian']=(p,q)=>{const t=T(q);
 if(/vòi nước/.test(t)){const S=+t.match(/trong (\d+) giờ là/)[1];return same(parse(q.a),(x)=>S/x)}
 if(/ca nô/.test(t)){const c=+t.match(/dòng nước là (\d+) km/)[1],m=t.match(/xuôi dòng (\d+) km, sau đó đi ngược dòng (\d+) km/);return same(parse(q.a),(x)=>+m[1]/(x+c)+ +m[2]/(x-c))}
 if(q.inp){const S=+t.match(/quãng đường (\d+) km/)[1],v=+t.match(/v = (\d+)/)[1];return String(S/v)}
 const S=+t.match(/quãng đường (\d+) km/)[1];return same(parse(q.a),(x)=>S/x)};
O['pt2.bt_hang']=(p,q)=>{const f=ex(T(q).match(/^Biểu thức P = (.*?) có giá trị không đổi/)[1]),v=[3.3,5.7,-2.2,7.9,11.1,-9.4].map(x=>f(x,0));
 return v.every(t=>Math.abs(t-v[0])<1e-9)&&Math.abs(v[0]-num(q.a))<1e-9};
O['pt2.nguyen_dem2']=(p,q)=>{const t=T(q),m=t.match(/phân thức \(\((.*?)\)\/\((.*?)\)\)/),f=parse(m[1]),g=parse(m[2]),r=[];
 for(let x=-500;x<=500;x++){const d=g(x,0);if(!d)continue;const v=f(x,0)/d;if(Math.abs(v-Math.round(v))<1e-9)r.push(x)}
 return String(/Có bao nhiêu/.test(t)?r.length:/lớn nhất/.test(t)?Math.max(...r):Math.min(...r))};


/* ================= PHƯƠNG TRÌNH BẬC NHẤT ================= */
const sides=s=>{const m=s.match(/^(.*?) = (.*)$/);return[ex(m[1]),ex(m[2])]},
 root1=(f,g)=>{const h=x=>f(x,0)-g(x,0),a=h(1)-h(0);return a?-h(0)/a:NaN},
 gm=(t,re)=>{const m=t.match(re);if(!m)throw new Error('không đọc được đề: '+re);return m},
 nn=(t,re)=>+gm(t,re)[1],
 r6=v=>String(+(+v).toFixed(6));
O['ptr2.nhan_dang']=(p,q)=>{const a=strip(q.a),bad=/x\^2|y|\)\/\(|^0x/.test(a);return /KHÔNG/.test(T(q))?bad:!bad};
const solveEq=(re)=>(p,q)=>{const m=gm(T(q),re),[f,g]=sides(m[1]);return Math.abs(num(q.a)-root1(f,g))<1e-9};
O['ptr2.giai_ngoac']=solveEq(/phương trình (.*) là$/);
O['ptr2.mau_so']=solveEq(/phương trình (.*) là$/);
O['ptr2.mau_nang']=solveEq(/Giải phương trình (.*)\. \(Nhập/);
O['ptr2.tich_he_so']=(p,q)=>{const f=ex(gm(T(q),/phương trình (.*) = 0 là bao nhiêu/)[1]),r=roots(f,-20,20,60);return r.length==2&&Math.abs(r[0]+r[1]-num(q.a))<1e-9};
O['ptr2.nghiem_m']=(p,q)=>{const m=gm(T(q),/Phương trình (.*) = (.*) nhận x = (−?\d+) làm nghiệm/),f=ex(m[1].replace(/m/g,'y')),g=ex(m[2].replace(/m/g,'y')),x0=num(m[3]),mm=num(q.a);
 return Math.abs(f(x0,mm)-g(x0,mm))<1e-9};
O['ptr2.gap_nhau']=(p,q)=>{const t=T(q),D=nn(t,/cách nhau (\d+) km/),v=[...t.matchAll(/vận tốc (\d+) km\/h/g)].map(v=>+v[1]),h=(t.match(/trước xe thứ hai từ B (\d+) giờ/)||[0,0])[1];
 return r6((D+v[1]*h)/(v[0]+v[1]))};
O['ptr2.nang_suat']=(p,q)=>{const t=T(q),a=nn(t,/dự định mỗi ngày làm (\d+) sản phẩm/),b=nn(t,/mỗi ngày tổ làm được (\d+) sản phẩm nên/),d=nn(t,/sớm hơn kế hoạch (\d+) ngày/),e=nn(t,/thêm được (\d+) sản phẩm/);return r6(a*(b*d+e)/(b-a))};
O['ptr2.lai_suat']=(p,q)=>{const t=T(q),S=nn(t,/đầu tư (\d+) triệu/),r1=nn(t,/trái phiếu với lãi suất (\d+)%/),r2=nn(t,/tiết kiệm với lãi suất (\d+)%/),L=nn(t,/tiền lãi là (\d+) triệu/);return r6((100*L-r2*S)/(r1-r2))};
O['ptr2.giam_hai_lan']=(p,q)=>{const t=T(q),d1=nn(t,/giảm (\d+)% so với/),d2=nn(t,/giảm thêm (\d+)%/),F=nn(t,/phải trả (\d+) nghìn/);return r6(F/((1-d1/100)*(1-d2/100)))};
O['ptr2.nhiet_do']=(p,q)=>{const t=T(q),m=gm(t,/Nhiệt độ (−?\d+) °(C|F)/),v=+m[1].replace('−','-');return r6(m[2]=='C'?1.8*v+32:(v-32)/1.8)};
O['ptr2.tuoi_tong']=(p,q)=>{const t=T(q),k=nn(t,/gấp (\d+) lần/),n=nn(t,/Sau (\d+) năm/),Tt=nn(t,/hai bố con là (\d+) tuổi/);return r6((Tt-2*n)/(k+1))};
O['ptr2.hcn_tang']=(p,q)=>{const t=T(q),d=nn(t,/hơn chiều rộng (\d+) m/),a=nn(t,/thêm (\d+) m thì/),S=nn(t,/tăng thêm (\d+) m²/);return r6((S-a*(d+a))/(2*a))};
O['ptr2.hai_lop']=(p,q)=>{const t=T(q),s=nn(t,/có tất cả (\d+) học sinh/),a=nn(t,/lớp 8A góp (\d+) quyển/),b=nn(t,/lớp 8B góp (\d+) quyển/),Y=nn(t,/góp được (\d+) quyển/);return r6((Y-b*s)/(a-b))};
O['ptr2.quang_duong_v']=(p,q)=>{const t=T(q),v=[...t.matchAll(/vận tốc (\d+) km\/h/g)].map(v=>+v[1]),m=nn(t,/thời gian đi (\d+) phút/);return r6((m/60)/(1/v[0]-1/v[1]))};
O['ptr2.xuoi_nguoc']=(p,q)=>{const t=T(q),t1=nn(t,/hết (\d+) giờ và/),t2=nn(t,/về A hết (\d+) giờ/),c=nn(t,/dòng nước là (\d+) km/),v=c*(t1+t2)/(t2-t1);return r6((v+c)*t1)};
O['ptr2.so_hai_chu_so']=(p,q)=>{const t=T(q),s=nn(t,/tổng hai chữ số bằng (\d+)/),dd=nn(t,/lớn hơn số ban đầu (\d+) đơn vị/),k=dd/9,a=(s-k)/2;return r6(10*a+a+k)};


/* ================= HÀM SỐ BẬC NHẤT ================= */
const sl=f=>({a:f(1,0)-f(0,0),b:f(0,0)}),                    /* hệ số góc, tung độ gốc của hàm một biến x */
 pts=t=>[...t.matchAll(/\((−?\d+); (−?\d+)\)/g)].map(m=>[+m[1].replace('−','-'),+m[2].replace('−','-')]),
 rhs=s=>ex(s.replace(/^y = /,''));
O['hsn.gia_tri_ham']=(p,q)=>{const t=T(q),f=ex(gm(t,/f\(x\) = (.*?)\. Tính/)[1]),v=[...gm(t,/Tính (.*)\.$/)[1].matchAll(/f\((−?\d+)\)/g)].map(m=>f(+m[1].replace('−','-'),0));
 return r6(/ − f/.test(t)?v[0]-v[1]:v.length==2?v[0]+v[1]:v[0])};
O['hsn.bang_hs']=(p,q)=>{const t=T(q),ps=pts(t),rep=ps.some((a,i)=>ps.some((b,j)=>i!=j&&a[0]==b[0]&&a[1]!=b[1])),a=q.a;
 if(/^Có, vì mỗi giá trị/.test(a))return !rep;if(/^Không, vì có một giá trị của x ứng với hai/.test(a))return rep;return false};
O['hsn.doi_xung']=(p,q)=>{const t=T(q),[[x,y]]=pts(t),[r]=pts(q.a),e=/trục hoành/.test(t)?[x,-y]:/trục tung/.test(t)?[-x,y]:[-x,-y];return r[0]==e[0]&&r[1]==e[1]};
O['hsn.he_so_ab']=(p,q)=>{const t=T(q),f=rhs(gm(t,/hàm số (y = .*?)\. (?:Tung|Hệ)/)[1]),{a,b}=sl(f);return r6(/Tung độ gốc/.test(t)?b:a)};
O['hsn.dk_bac_nhat_m']=(p,q)=>{const e=gm(T(q),/Hàm số y = (.*) là hàm số bậc nhất/)[1].replace(/m/g,'y'),f=ex(e),c=y=>f(1,y)-f(0,y),r=-c(0)/(c(1)-c(0)),m=strip(q.a).match(/^m ≠ (.*)$/);return !!m&&Math.abs(num(m[1])-r)<1e-9};
O['hsn.qua_diem_m']=(p,q)=>{const t=T(q),f=ex(gm(t,/hàm số y = (.*) đi qua điểm/)[1].replace(/m/g,'y')),[[x0,y0]]=pts(t);return Math.abs(f(x0,num(q.a))-y0)<1e-9};
O['hsn.cat_truc_m']=(p,q)=>{const t=T(q),f=ex(gm(t,/Cho hàm số y = (.*)\. Tìm m/)[1].replace(/m/g,'y')),mm=num(q.a),h=t.match(/hoành độ (−?\d+)/),k=t.match(/tung độ (−?\d+)/);
 return h?Math.abs(f(num(h[1]),mm))<1e-9:Math.abs(f(0,mm)-num(k[1]))<1e-9};
O['hsn.cuoc_dt']=(p,q)=>{const t=T(q),A=nn(t,/cố định (\d+) đồng/),B=nn(t,/và (\d+) đồng cho mỗi phút/);
 if(/Công thức tính y/.test(t))return strip(q.a)==`y = ${B}x + ${A}`;
 if(/gọi \d+ phút/.test(t))return r6(A+B*nn(t,/gọi (\d+) phút/));return r6((nn(t,/tất cả (\d+) đồng/)-A)/B)};
O['hsn.goc_ox']=(p,q)=>{const f=rhs(gm(T(q),/Đường thẳng (y = .*?) tạo/)[1]);return f(1,0)-f(0,0)>0?'nhọn':'tù'};
O['hsn.so_sanh_goc']=(p,q)=>{const t=T(q),L=[...t.matchAll(/d(\d): (y = .*?)(?:;|\. )/g)].map(m=>{const s=sl(rhs(m[2]));return{i:m[1],ang:Math.atan(s.a)+(s.a<0?Math.PI:0)}}),
 big=/lớn nhất/.test(t),best=L.reduce((u,v)=>(big?v.ang>u.ang:v.ang<u.ang)?v:u);return 'd'+best.i};
O['hsn.giao_truc']=(p,q)=>{const f=rhs(gm(T(q),/Đường thẳng (y = .*?) cắt/)[1]),m=strip(q.a).match(/^\((.*); (.*)\)$/);return Math.abs(num(m[2]))<1e-12&&Math.abs(f(num(m[1]),0))<1e-9};
O['hsn.he_so_goc_2diem']=(p,q)=>{const [[x1,y1],[x2,y2]]=pts(T(q));return Math.abs((y2-y1)/(x2-x1)-num(q.a))<1e-9};
O['hsn.doc_do_thi']=(p,q)=>{const m=gm(q.f,/class="ln" d="M([-\d.]+) ([-\d.]+)L([-\d.]+) ([-\d.]+)"/),X=v=>(+v-120)/18,Y=v=>(75-v)/18,x1=X(m[1]),y1=Y(m[2]),x2=X(m[3]),y2=Y(m[4]),a=(y2-y1)/(x2-x1),b=y1-a*x1,f=rhs(strip(q.a));
 return Math.abs(sl(f).a-a)<0.05&&Math.abs(sl(f).b-b)<0.05};
O['hsn.dt_tam_giac_hai_dt']=(p,q)=>{const t=T(q),L=[...t.matchAll(/d[₁₂]: (y = .*?)(?: và | cắt nhau)/g)].map(m=>sl(rhs(m[1]))),[l1,l2]=L,mx=(l2.b-l1.b)/(l1.a-l2.a),my=l1.a*mx+l1.b,xa=-l1.b/l1.a,xb=-l2.b/l2.a;
 return r6(Math.abs(xa-xb)*Math.abs(my)/2)};
O['hsn.dong_quy']=(p,q)=>{const t=T(q),L=[...t.matchAll(/d[₁₂]: (y = .*?);/g)].map(m=>sl(rhs(m[1]))),[l1,l2]=L,mx=(l2.b-l1.b)/(l1.a-l2.a),my=l1.a*mx+l1.b,e=num(gm(t,/d₃: y = mx ([−+]) (\d+)\./)[1]+gm(t,/d₃: y = mx ([−+]) (\d+)\./)[2]);
 return r6((my-e)/mx)};
O['hsn.cuoc_so_sanh']=(p,q)=>{const t=T(q),a1=nn(t,/A tính phí mở cửa (\d+) nghìn/),b1=nn(t,/và (\d+) nghìn đồng cho mỗi kilômét\. Hãng taxi B/),a2=nn(t,/B tính phí mở cửa (\d+) nghìn/),b2=nn(t,/và (\d+) nghìn đồng cho mỗi kilômét\. (?:Quãng|Với)/),x=(a2-a1)/(b1-b2);
 return r6(/nhỏ nhất/.test(t)?Math.floor(x)+1:x)};
O['hsn.song_song_qua_diem']=(p,q)=>{const t=T(q),[[x0,y0]]=pts(t),g=sl(rhs(gm(t,/đường thẳng (y = .*?) có phương trình/)[1])),f=sl(rhs(strip(q.a)));
 return Math.abs(f.a-g.a)<1e-9&&Math.abs(f.b-g.b)>1e-9&&Math.abs(f.a*x0+f.b-y0)<1e-9};


/* ================= XÁC SUẤT ================= */
const isP2=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d==0)return false;return true},
 predN=t=>{let m;if(/số chẵn/.test(t))return n=>n%2==0;if(/số lẻ/.test(t))return n=>n%2==1;if(m=t.match(/chia hết cho (\d+)/))return n=>n%+m[1]==0;
  if(/nguyên tố/.test(t))return isP2;if(/chính phương/.test(t))return n=>Math.round(Math.sqrt(n))**2==n;if(m=t.match(/tận cùng bằng (\d)/))return n=>n%10==+m[1];throw new Error('không hiểu điều kiện: '+t)},
 frac=(q,k,n)=>Math.abs(num(q.a)-k/n)<1e-12;
O['xs2.liet_ke_kq']=(p,q)=>{const t=T(q),L=[...gm(t,/cụm từ "(.*?)"/)[1].replace(/ /g,'')],v=L.filter(c=>'AEIOU'.includes(c)).length;
 if(/Có bao nhiêu kết quả có thể/.test(t))return String(L.length);if(/thuận lợi/.test(t))return String(v);return frac(q,v,L.length)};
const thẻ=t=>{const lo=nn(t,/từ (\d+) đến/),hi=nn(t,/đến (\d+)\./),f=predN(gm(t,/số ghi trên thẻ (.*?)"/)[1]);let k=0;for(let n=lo;n<=hi;n++)if(f(n))k++;return[k,hi-lo+1]};
O['xs2.dem_the']=(p,q)=>String(thẻ(T(q))[0]);
O['xs2.xs_so']=(p,q)=>{const [k,n]=thẻ(T(q));return frac(q,k,n)};
O['xs2.vong_quay']=(p,q)=>{const t=T(q),secs=[...q.f.matchAll(/class="sec" d="[^"]*" style="fill:(#[0-9a-f]{6})/g)].map(m=>m[1]),nums=[...q.f.matchAll(/<text[^>]*>(\d+)<\/text>/g)].map(m=>+m[1]),n=nn(t,/có (\d+) hình quạt/);
 if(secs.length!=n||nums.length!=n||nums.some((v,i)=>v!=i+1))return false;
 const m=t.match(/hình quạt màu (đỏ|xanh|vàng)\./);if(m){const c={'đỏ':'#ff6b6b','xanh':'#54a0ff','vàng':'#feca57'}[m[1]];return frac(q,secs.filter(x=>x==c).length,n)}
 const k=nn(t,/chia hết cho (\d+)\./);return frac(q,nums.filter(v=>v%k==0).length,n)};
O['xs2.hai_xx_tich']=(p,q)=>{const e=gm(T(q),/biến cố "(.*?)"/)[1],f=[[/tích hai số chấm là số lẻ/,(a,b)=>a*b%2==1],[/tích hai số chấm là số chẵn/,(a,b)=>a*b%2==0],[/tích hai số chấm bằng 12/,(a,b)=>a*b==12],[/tích hai số chấm lớn hơn 20/,(a,b)=>a*b>20],
 [/hiệu của số chấm lớn trừ số chấm nhỏ bằng 2/,(a,b)=>Math.max(a,b)-Math.min(a,b)==2],[/giống nhau/,(a,b)=>a==b],[/gấp đôi/,(a,b)=>a==2*b],[/tổng hai số chấm chia hết cho 3/,(a,b)=>(a+b)%3==0]].find(r=>r[0].test(e))[1];
 let k=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(f(a,b))k++;return frac(q,k,36)};
O['xs2.hai_bi_chon']=(p,q)=>{const t=T(q),n=nn(t,/có (\d+) viên bi/),e=gm(t,/biến cố "(.*?)"/)[1],f=[[/tổng hai số .* là số chẵn/,(a,b)=>(a+b)%2==0],[/tích hai số .* là số lẻ/,(a,b)=>a*b%2==1],[/ít nhất một viên bi ghi số chẵn/,(a,b)=>a%2==0||b%2==0],[/liên tiếp/,(a,b)=>Math.abs(a-b)==1],[/tổng hai số .* lớn hơn 5/,(a,b)=>a+b>5]].find(r=>r[0].test(e))[1];
 let k=0,tot=0;for(let a=1;a<=n;a++)for(let b=a+1;b<=n;b++){tot++;if(f(a,b))k++}return frac(q,k,tot)};
O['xs2.tan_suat_bang']=(p,q)=>{const t=T(q),c=[...t.matchAll(/mặt (\d): (\d+) lần/g)].map(m=>+m[2]),N=c.reduce((a,b)=>a+b,0),e=gm(t,/biến cố "(.*?)"/)[1],
 faces=/số chấm lẻ/.test(e)?[1,3,5]:/lớn hơn 4/.test(e)?[5,6]:/số chấm chẵn/.test(e)?[2,4,6]:/mặt 6 chấm/.test(e)?[6]:/không lớn hơn 2/.test(e)?[1,2]:null;
 return frac(q,faces.reduce((s,f)=>s+c[f-1],0),N)};
O['xs2.uoc_luong']=(p,q)=>{const t=T(q);return r6(nn(t,/sản xuất (\d+) sản phẩm/)*nn(t,/thấy có (\d+) sản phẩm/)/nn(t,/ngẫu nhiên (\d+) sản phẩm/))};
O['xs2.chon_hai_ban']=(p,q)=>{const t=T(q),a=nn(t,/(\d+) bạn nam/),b=nn(t,/(\d+) bạn nữ/),P=[...Array(a).fill('n'),...Array(b).fill('u')];let k=0,tot=0;
 for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){tot++;const x=P[i]+P[j];if(/một bạn nam và một bạn nữ/.test(t)?x=='nu'||x=='un':/cùng giới/.test(t)?P[i]==P[j]:x=='uu')k++}return frac(q,k,tot)};
O['xs2.ba_xuc_xac']=(p,q)=>{const s=nn(T(q),/bằng (\d+)"/);let k=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let c=1;c<=6;c++)if(a+b+c==s)k++;return frac(q,k,216)};
O['xs2.ghep_so']=(p,q)=>{const t=T(q),dg=gm(t,/chữ số ([\d, ]+), lập/)[1].split(', ').map(Number),e=gm(t,/số được chọn (.*?)\. \(Nhập/)[1],
 f=/lớn hơn (\d+)/.test(e)?n=>n>+e.match(/lớn hơn (\d+)/)[1]:predN(e);let k=0,tot=0;for(const a of dg)for(const b of dg)if(a!=b){tot++;if(f(10*a+b))k++}return frac(q,k,tot)};
O['xs2.hai_lan_hoan_lai']=(p,q)=>{const t=T(q),r=nn(t,/có (\d+) viên bi đỏ/),b=nn(t,/và (\d+) viên bi xanh/),B=[...Array(r).fill(0),...Array(b).fill(1)],same=/cùng màu/.test(t);let k=0;
 for(const x of B)for(const y of B)if((x==y)==same)k++;return frac(q,k,B.length**2)};


/* ================= HÌNH HỌC ================= */
O['dd2.ky_hieu']=(p,q)=>{const m=gm(T(q),/ΔABC ∽ Δ(\w{3})/)[1],f=c=>m['ABC'.indexOf(c)],a=strip(q.a);
 let r=a.match(/^∠(\w) = ∠(\w)$/);if(r)return f(r[1])==r[2];
 r=a.match(/^\(\((\w\w)\)\/\((\w\w)\)\) = \(\((\w\w)\)\/\((\w\w)\)\)$/);if(!r)return false;
 const img=s=>[f(s[0]),f(s[1])].sort().join(''),srt=s=>[...s].sort().join('');
 return img(r[1])==srt(r[2])&&img(r[3])==srt(r[4])&&srt(r[1])!=srt(r[3])};
O['dd2.tinh_canh']=(p,q)=>{const t=T(q),AB=nn(t,/AB = (\d+) cm/),BC=nn(t,/BC = (\d+) cm/),CA=nn(t,/CA = (\d+) cm/),MN=nn(t,/MN = (\d+) cm/),k=MN/AB;
 return r6(/chu vi tam giác MNP/.test(t)?k*(AB+BC+CA):/độ dài NP/.test(t)?k*BC:k*CA)};
O['dd2.dien_tich_ti_so']=(p,q)=>{const t=T(q),m=gm(t,/k = (\d+)\/(\d+)/),k=+m[1]/+m[2];
 return r6(/diện tích tam giác DEF bằng (\d+)/.test(t)?nn(t,/diện tích tam giác DEF bằng (\d+)/)*k*k:nn(t,/chu vi tam giác DEF bằng (\d+)/)*k)};
O['dd2.kiem_tra_ccc']=(p,q)=>{const t=T(q),s1=[nn(t,/AB = (\d+) cm/),nn(t,/BC = (\d+) cm/),nn(t,/CA = (\d+) cm/)],s2=[nn(t,/DE = (\d+) cm/),nn(t,/EF = (\d+) cm/),nn(t,/FD = (\d+) cm/)],
 prop=(a,b)=>a[0]*b[1]==a[1]*b[0]&&a[0]*b[2]==a[2]*b[0],ps=s=>[...s].sort((x,y)=>x-y),a=strip(q.a);
 const simSorted=prop(ps(s1),ps(s2)),sim=prop(s1,s2);if(simSorted!=sim)return false;   /* đề không được để hai tam giác đồng dạng theo thứ tự cạnh khác */
 if(a=='Không đồng dạng')return !sim;const m=a.match(/^Đồng dạng, tỉ số (\d+)(?:\/(\d+))?$/);return sim&&!!m&&Math.abs(+m[1]/(m[2]?+m[2]:1)-s1[0]/s2[0])<1e-12};
O['dd2.goc_ddang']=(p,q)=>{const t=T(q),m=gm(t,/∠(\w) = (\d+)° và ∠(\w) = (\d+)°\. Tính số đo ∠(\w)/),ask=m[5],giv=[[m[1],+m[2]],[m[3],+m[4]]];
 const idx=c=>'ABC'.includes(c)?'ABC'.indexOf(c):'DEF'.indexOf(c),known={};giv.forEach(([c,v])=>known[idx(c)]=v);const kk=idx(ask);
 if(Object.keys(known).length<2||known[kk]!==undefined)return false;return r6(180-Object.values(known).reduce((a,b)=>a+b,0))};
O['dd2.truong_hop']=(p,q)=>{const t=T(q),a=strip(q.a),[A,B]=gm(t,/^(Tam giác ABC có .*?); (tam giác DEF có .*?)\./).slice(1),
 num2=s=>[...s.matchAll(/(\d+) cm/g)].map(m=>+m[1]);let exp;
 if(/BC = /.test(A)&&/EF = /.test(B)){const x=num2(A),y=num2(B);exp=x[0]*y[1]==x[1]*y[0]&&x[0]*y[2]==x[2]*y[0]?'c.c.c':'none'}
 else if(/AB = .*AC = .*∠(\w)/.test(A)){const aa=A.match(/∠(\w) = (\d+)°/),bb=B.match(/∠(\w) = (\d+)°/),x=num2(A),y=num2(B);
  exp=aa[1]=='A'&&bb[1]=='D'&&aa[2]==bb[2]&&x[0]*y[1]==x[1]*y[0]?'c.g.c':'none'}
 else{const aa=[...A.matchAll(/∠(\w) = (\d+)°/g)],bb=[...B.matchAll(/∠(\w) = (\d+)°/g)];exp=aa.length==2&&bb.length==2&&aa[0][2]==bb[0][2]&&aa[1][2]==bb[1][2]?'g.g':'none'}
 const got=/c\.c\.c/.test(a)?'c.c.c':/c\.g\.c/.test(a)?'c.g.c':/g\.g/.test(a)?'g.g':'none';return got==exp};
O['dd2.cao_ah']=(p,q)=>{const t=T(q),AB=nn(t,/AB = (\d+) cm/),AC=nn(t,/AC = (\d+) cm/),A=[0,0],B=[AB,0],C=[0,AC],d=[C[0]-B[0],C[1]-B[1]],tt=((A[0]-B[0])*d[0]+(A[1]-B[1])*d[1])/(d[0]**2+d[1]**2),
 H=[B[0]+tt*d[0],B[1]+tt*d[1]],D=(P,Q)=>Math.hypot(P[0]-Q[0],P[1]-Q[1]);return r6(/độ dài AH/.test(t)?D(A,H):/độ dài BH/.test(t)?D(B,H):D(C,H))};
O['dd2.ban_do']=(p,q)=>{const t=T(q),N=nn(t,/tỉ lệ 1 : (\d+)/);
 if(/Khoảng cách thực tế/.test(t))return r6(nn(t,/hai thành phố là (\d+) cm/)*N/100000);
 return r6(+gm(t,/cách nhau (\d+(?:,\d+)?) km/)[1].replace(',','.')*100000/N)};
O['dd2.hieu_dien_tich']=(p,q)=>{const t=T(q),m=gm(t,/k = (\d+)\/(\d+)/),k=+m[1]/+m[2],D=nn(t,/là (\d+) cm²/);return r6(D/(1-k*k))};
O['dd2.hieu_chu_vi']=(p,q)=>{const t=T(q),m=gm(t,/tỉ số đồng dạng (\d+)\/(\d+)/),k=+m[1]/+m[2],D=nn(t,/nhỏ (\d+) cm/);return r6(D*k/(k-1))};
const lab=(f,x,y)=>(f.match(new RegExp('<text x="'+x+'" y="'+y+'"[^>]*>(.*?)</text>'))||[])[1];
O['py2.hinh_tim_x']=(p,q)=>{const AB=lab(q.f,130,136),AC=lab(q.f,42,76),BC=lab(q.f,142,64),v=s=>s=='x'?null:+s.replace(' cm','');
 const [a,b,c]=[v(AB),v(AC),v(BC)];if([a,b,c].filter(z=>z===null).length!=1)return false;
 return r6(c===null?Math.hypot(a,b):a===null?Math.sqrt(c*c-b*b):Math.sqrt(c*c-a*a))};
O['py2.dao_goc']=(p,q)=>{const t=T(q),AB=nn(t,/AB = (\d+) cm/),BC=nn(t,/BC = (\d+) cm/),CA=nn(t,/CA = (\d+) cm/),a=strip(q.a);
 let exp='none';if(AB*AB+CA*CA==BC*BC)exp='A';else if(AB*AB+BC*BC==CA*CA)exp='B';else if(BC*BC+CA*CA==AB*AB)exp='C';
 const m=a.match(/vuông tại (\w)$/);return exp=='none'?/không phải/.test(a):!!m&&m[1]==exp};
O['py2.tam_giac_deu']=(p,q)=>{const t=T(q),a=nn(t,/cạnh (\d+) cm/),h=a*Math.sqrt(3)/2,exp=/đường cao/.test(t)?h:a*h/2,v=rv(strip(q.a).replace(/ cm²?$/,''));return Math.abs(v-exp)<1e-9};
O['py2.hcn_cheo']=(p,q)=>{const t=T(q),w=nn(t,/AB = (\d+) cm/),c=nn(t,/AC = (\d+) cm/),o=Math.sqrt(c*c-w*w);return r6(/chu vi/.test(t)?2*(w+o):w*o)};
O['py2.ah_ba_canh']=(p,q)=>{const t=T(q),a=nn(t,/AB = (\d+) cm/),b=nn(t,/AC = (\d+) cm/),c=nn(t,/BC = (\d+) cm/),s=(a+b+c)/2,S=Math.sqrt(s*(s-a)*(s-b)*(s-c));return r6(2*S/c)};
const tr=(a,b)=>Math.sqrt(a*a-b*b);
O['hc2.sxq_tg']=(p,q)=>{const t=T(q),a=nn(t,/AB = (\d+) cm/),b=nn(t,/SA = (\d+) cm/),d=tr(b,a/2);return r6(1.5*a*d)};
O['hc2.v_tg']=(p,q)=>{const t=T(q);return r6(nn(t,/BC = (\d+) cm/)*nn(t,/AK = (\d+) cm/)/2*nn(t,/chóp là (\d+) cm/)/3)};
O['hc2.v_tu_giac']=(p,q)=>{const t=T(q),a=nn(t,/cạnh đáy (\d+) cm/),d=nn(t,/SM = (\d+) cm/);return r6(a*a*tr(d,a/2)/3)};
O['hc2.stp_tu_giac']=(p,q)=>{const t=T(q),a=nn(t,/cạnh đáy (\d+) cm/),b=nn(t,/cạnh bên (\d+) cm/);return r6(2*a*tr(b,a/2)+a*a)};
O['hc2.tim_a_sxq']=(p,q)=>{const t=T(q);return r6(nn(t,/bằng (\d+) cm²/)/(2*nn(t,/trung đoạn bằng (\d+) cm/)))};
O['hc2.leu_chi_phi']=(p,q)=>{const t=T(q);return r6(2*nn(t,/cạnh đáy (\d+) m/)*nn(t,/trung đoạn (\d+) m/)*nn(t,/giá vải (\d+) nghìn/))};
O['hc2.dung_tich_lit']=(p,q)=>{const t=T(q);return r6(nn(t,/cạnh đáy (\d+) dm/)**2*nn(t,/chiều cao (\d+) dm/)/3)};
O['hc2.tim_h_tg']=(p,q)=>{const t=T(q);return r6(3*nn(t,/thể tích (\d+) cm³/)/nn(t,/đáy ABC bằng (\d+) cm²/))};
O['hc2.cao_tu_canh_ben']=(p,q)=>{const t=T(q),a=nn(t,/cạnh đáy (\d+) cm/),b=nn(t,/cạnh bên (\d+) cm/);return r6(Math.sqrt(b*b-a*a/2))};
O['hc2.ti_so_the_tich']=(p,q)=>{const t=T(q),V=nn(t,/thể tích (\d+) cm³/),k=nn(t,/gấp (\d+) lần/);return r6(/cạnh đáy dài gấp/.test(t)?k*k*V:k*V)};

O.__helpers={num,T,svgs,FRX,ex,poly,reduced,roots,sameSet};
return O};
