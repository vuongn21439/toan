/* Oracle độc lập cho các dạng bài lớp 8 bổ sung từ "Chuyên đề cơ bản Toán 8 KNTT tập 1" (mã dt2.*, hd2.*, tg2.*, th2.*, tk2.*).
   Mỗi oracle TỰ ĐỌC LẠI đề (và cả hình SVG) rồi tính bằng cách khác với lúc sinh câu hỏi, không dùng tham-số của bộ sinh.
   Trả về chuỗi đáp án đúng hoặc true/false (nhận (tham-số, câu-hỏi)). Với thử ngược MUTATE=1, hàm nhận {...q, a: đáp án nhiễu} nên chỉ được dựa vào q.a, không dựa vào q.w. */
const {parse,same,strip,ng,gcd}=require('./expr.js');
module.exports=L=>{
const O={},T=q=>strip(q.q).replace(/\s+/g,' '),svgs=q=>(q.f||'').match(/<svg[\s\S]*?<\/svg>/g)||[],
 nums=s=>(s.match(/\d+/g)||[]).map(Number),
 P2=(q,fn)=>same(parse(q.a),fn),
 pa=s=>parse(s),
 /* đơn thức x, y, z: {c, e:[x,y,z]} */
 pm=s=>{s=strip(s).replace(/−/g,'-').replace(/\s/g,'');const m=s.match(/^(-?)(\d*)((?:[xyz](?:\^\d+)?)*)$/);if(!m)return null;
  const e=[0,0,0];(m[3].match(/[xyz](?:\^\d+)?/g)||[]).forEach(t=>{e['xyz'.indexOf(t[0])]+=t.length>1?+t.slice(2):1});
  return{c:(m[1]?-1:1)*(m[2]===''?1:+m[2]),e}},
 sameE=(a,b)=>a.e.every((k,i)=>k==b.e[i]),
 /* đa thức x, y: danh sách {c, a, b} theo từng hạng tử (không gộp) */
 terms=s=>{s=strip(s).replace(/−/g,'-').replace(/\s/g,'');return(s.match(/[+-]?[^+-]+/g)||[]).map(t=>{const m=t.match(/^([+-]?)(\d*)(x(?:\^(\d+))?)?(y(?:\^(\d+))?)?$/);if(!m)throw new Error('hạng tử lạ '+t);
  return{c:(m[1]=='-'?-1:1)*(m[2]===''?1:+m[2]),a:m[3]?(m[4]?+m[4]:1):0,b:m[5]?(m[6]?+m[6]:1):0}})},
 reduce=ts=>{const m=new Map();ts.forEach(t=>{const k=t.a+','+t.b;m.set(k,(m.get(k)||0)+t.c)});return[...m].filter(([,c])=>c).map(([k,c])=>({c,a:+k.split(',')[0],b:+k.split(',')[1]}))},
 deg=ts=>Math.max(...ts.map(t=>t.a+t.b)),
 evT=(ts,x,y)=>ts.reduce((s,t)=>s+t.c*x**t.a*y**t.b,0),
 /* biểu thức số học thuần: 76^2 − 24^2, 2·37·13 … */
 calc=s=>Function('return '+strip(s).replace(/−/g,'-').replace(/·/g,'*').replace(/\^/g,'**'))(),
 cst=(s,xs=[3,7,-2,11])=>{const f=parse(s),v=xs.map(x=>f(x,0));return v.every(t=>Math.abs(t-v[0])<1e-6)?v[0]:null},
 ds=v=>String(v).replace('.',',');

/* ================= ĐA THỨC ================= */
const facs=q=>{const m=T(q).match(/\(([^()]*)\)·\(([^()]*)\)/);return[pm(m[1]),pm(m[2])]};
O['dt2.tich_don']=(p,q)=>{const [A,B]=facs(q),r=pm(q.a);if(!r)return false;return r.c==A.c*B.c&&r.e.every((k,i)=>k==A.e[i]+B.e[i])};
O['dt2.he_so_bac']=(p,q)=>{const [A,B]=facs(q),c=A.c*B.c,d=A.e.reduce((s,k,i)=>s+k+B.e[i],0);return String(/hệ số/.test(T(q))?c:d)};
const MONO=s=>{s=strip(s).replace(/−/g,'-').replace(/\s/g,'');return/^-?(\d+(\/\d+)?)?([xyz](\^\d+)?)*$/.test(s)&&s!==''&&s!=='-'};
O['dt2.la_don_thuc']=(p,q)=>/KHÔNG/.test(T(q))?!MONO(q.a):MONO(q.a);
O['dt2.dong_dang']=(p,q)=>{const X=pm(T(q).match(/với đơn thức ([^?]+)\?/)[1]),r=pm(q.a);return !!r&&r.c!=0&&sameE(X,r)};
O['dt2.cong_dd']=(p,q)=>P2(q,pa(T(q).replace('Tính:','')));
O['dt2.dem_dong_dang']=(p,q)=>{const m=T(q).match(/với đơn thức (\S+)\? Các đơn thức: (.*)\.$/),X=pm(m[1]);return String(m[2].split(/;\s*/).map(pm).filter(t=>t&&sameE(t,X)).length)};
O['dt2.thu_gon_bac']=(p,q)=>String(deg(reduce(terms(T(q).match(/A = (.*)$/)[1]))));
O['dt2.cong_ba']=(p,q)=>{const t=T(q),m=t.match(/A = (.*), B = (.*) và C = (.*)\. Tính A ([+−]) B ([+−]) C\./),[A,B,C]=[1,2,3].map(i=>pa(m[i])),s1=m[4]=='+'?1:-1,s2=m[5]=='+'?1:-1;return P2(q,(x,y)=>A(x,y)+s1*B(x,y)+s2*C(x,y))};
O['dt2.tim_A']=(p,q)=>{const t=T(q).replace(/^Tìm đa thức A, biết /,'').replace(/\.$/,''),Af=pa(q.a);let m;
 if(m=t.match(/^A \+ \((.*)\) = (.*)$/)){const B=pa(m[1]),C=pa(m[2]);return same((x,y)=>Af(x,y)+B(x,y),C)}
 if(m=t.match(/^A − \((.*)\) = (.*)$/)){const B=pa(m[1]),C=pa(m[2]);return same((x,y)=>Af(x,y)-B(x,y),C)}
 m=t.match(/^\((.*)\) − A = (.*)$/);const B=pa(m[1]),C=pa(m[2]);return same((x,y)=>B(x,y)-Af(x,y),C)};
O['dt2.nhan_hai_bien']=(p,q)=>{const m=T(q).match(/Khai triển: \((.*?)\)\((.*)\)$/),A=pa(m[1]),B=pa(m[2]);return P2(q,(x,y)=>A(x,y)*B(x,y))};
O['dt2.thu_gon_gtri']=(p,q)=>{const m=T(q).match(/B = (.*) tại x = (−?\d+); y = (−?\d+)/);return String(evT(terms(m[1]),+m[2].replace('−','-'),+m[3].replace('−','-')))};
O['dt2.rut_gon_nhan']=(p,q)=>{const E=pa(T(q).match(/A = (.*)\.$/)[1]);return P2(q,x=>E(x,0))};
O['dt2.tim_B']=(p,q)=>{const m=T(q).match(/\(([^()]*)\) : B = (.*)\.$/),A=pm(m[1]),C=pm(m[2]),B=pm(q.a);return !!B&&B.c*C.c==A.c&&B.e.every((k,i)=>k+C.e[i]==A.e[i])};
O['dt2.du_chia']=(p,q)=>{const t=T(q),m=t.match(/a chia (\d+) dư (\d+), b chia \d+ dư (\d+)\. Tìm số dư của phép chia (.*) cho/),M0=+m[1],r1=+m[2],r2=+m[3],ex=m[4],
 f=ex=='a + b'?(a,b)=>a+b:ex=='a·b'?(a,b)=>a*b:ex=='a^2'?(a,b)=>a*a:(a,b)=>a*a+b*b,s=new Set();
 for(let k=0;k<8;k++)for(let l=0;l<8;l++)s.add(f(M0*k+r1,M0*l+r2)%M0);return s.size==1?String([...s][0]):false};
O['dt2.gt_dac_biet']=(p,q)=>{const m=T(q).match(/A = (.*) tại x = (\d+)\./);return String(Math.round(pa(m[1])(+m[2],0)))};
O['dt2.khong_phu_thuoc']=(p,q)=>{const v=cst(T(q).match(/A = (.*) có giá trị/)[1]);return v==null?false:String(Math.round(v))};
O['dt2.tim_x_nhan']=(p,q)=>{const m=T(q).match(/Tìm x, biết (.*) = (−?\d+)\./),f=pa(m[1]),k=+m[2].replace('−','-'),r=[];for(let x=-300;x<=300;x++)if(Math.abs(f(x,0)-k)<1e-9)r.push(x);return r.length==1?String(r[0]):false};
O['dt2.he_so_tich3']=(p,q)=>{const t=T(q),ns=[...t.match(/Khai triển (.*)\. Hệ số/)[1].matchAll(/\(x ([+−]) (\d+)\)/g)].map(m=>(m[1]=='+'?1:-1)*+m[2]);let c=[1];
 ns.forEach(n=>{const r=Array(c.length+1).fill(0);c.forEach((v,i)=>{r[i+1]+=v;r[i]+=v*n});c=r});return String(/Hệ số của x\^2/.test(t)?c[2]:c[1])};
O['dt2.bac_tich']=(p,q)=>{const m=T(q).match(/P = \((.*?)\)\((.*?)\) \(sau/),A=terms(m[1]),B=terms(m[2]),pr=reduce(A.flatMap(s=>B.map(t=>({c:s.c*t.c,a:s.a+t.a,b:s.b+t.b}))));return String(deg(pr))};

/* ================= HẰNG ĐẲNG THỨC ================= */
O['hd2.bp_hai_bien']=(p,q)=>{const F=pa(T(q).match(/\((.*)\)\^2$/)[1]);return P2(q,(x,y)=>F(x,y)**2)};
O['hd2.hieu_bp_hai_bien']=(p,q)=>{const m=T(q).match(/Khai triển: \((.*?)\)\((.*)\)$/),A=pa(m[1]),B=pa(m[2]);return P2(q,(x,y)=>A(x,y)*B(x,y))};
O['hd2.rut_gon_hd']=(p,q)=>{const E=pa(T(q).replace('Rút gọn biểu thức: ',''));return P2(q,(x,y)=>E(x,0))};
const afterPoly=(q,re)=>pa(T(q).match(re)[1]);
O['hd2.viet_bp']=(p,q)=>{const E=afterPoly(q,/đa thức (.*?) (?:thành nhân tử|dưới dạng)/);return P2(q,(x,y)=>E(x,0))};
O['hd2.viet_lp']=(p,q)=>{const E=afterPoly(q,/đa thức (.*?) dưới dạng/);return P2(q,(x,y)=>E(x,0))};
O['hd2.lp_hai_bien']=(p,q)=>{const F=pa(T(q).match(/\((.*)\)\^3$/)[1]);return P2(q,(x,y)=>F(x,y)**3)};
O['hd2.pt_ntc_2']=(p,q)=>{const E=afterPoly(q,/chung\): (.*)$/);return P2(q,(x,y)=>E(x,y))};
O['hd2.pt_ntc_ngoac']=(p,q)=>{const E=afterPoly(q,/nhân tử: (.*)$/);return P2(q,(x,y)=>E(x,0))};
O['hd2.pt_nhom']=(p,q)=>{const E=afterPoly(q,/hạng tử\): (.*)$/);return P2(q,(x,y)=>E(x,y))};
O['hd2.tinh_nhanh_2']=(p,q)=>String(calc(T(q).replace('Tính nhanh: ','')));
O['hd2.pt_tich']=(p,q)=>{const t=T(q);if(/Tổng các nghiệm/.test(t)){const f=pa(t.match(/phương trình (.*) = 0/)[1]),r=[];for(let x=-100;x<=100;x++)if(Math.abs(f(x,0))<1e-9)r.push(x);return String(r.reduce((a,b)=>a+b,0))}
 const f=pa(t.match(/phương trình (.*) = 0/)[1]),r=[];for(let x=-100;x<=100;x++)if(Math.abs(f(x,0))<1e-9)r.push(x);return String(/dương/.test(t)?Math.max(...r.filter(v=>v>0)):Math.max(...r))};
O['hd2.rut_gon_lp']=(p,q)=>{const v=cst(T(q).match(/A = (.*) có giá trị/)[1]);return v==null?false:String(Math.round(v))};
O['hd2.gtln']=(p,q)=>{const t=T(q);if(/nhỏ nhất tại x/.test(t)){const f=pa(t.match(/A = (.*) đạt/)[1]);let bx=0,bv=Infinity;for(let x=-80;x<=80;x+=.5){const v=f(x,0);if(v<bv-1e-9){bv=v;bx=x}}return String(bx)}
 const f=pa(t.match(/B = (.*)\.$/)[1]);let bv=-Infinity;for(let x=-80;x<=80;x+=.5)bv=Math.max(bv,f(x,0));return String(bv)};
O['hd2.chia_het_n']=(p,q)=>{const t=T(q);let f;const mA=t.match(/\(n \+ (\d+)\)\^2/),mB=t.match(/\((\d+)n \+ 1\)\^2/);
 if(mA){const a=+mA[1];f=n=>(n+a)**2-(n-a)**2}else{const a=+mB[1];f=n=>(a*n+1)**2-(a*n-1)**2}let g=0;for(let n=1;n<=60;n++)g=gcd(g,f(n));return String(g)};
O['hd2.nghich_dao']=(p,q)=>{const t=T(q),a=+t.match(/= (\d+)\./)[1],e=+t.match(/Tính x\^(\d)/)[1],x=(a+Math.sqrt(a*a-4))/2,v=x**e+x**-e;return Math.abs(v-Math.round(v))<1e-6?String(Math.round(v)):false};
O['hd2.pt_x4']=(p,q)=>{const E=afterPoly(q,/đa thức (.*?) thành nhân tử/);return P2(q,x=>E(x,0))};
O['hd2.day_bp']=(p,q)=>{const m=+T(q).match(/\+ … \+ (\d+)\^2/)[1];let s=0;for(let k=1;k<=m/2;k++)s+=(2*k)**2-(2*k-1)**2;return String(s)};

/* ================= TỨ GIÁC ================= */
O['tg2.ti_le_goc']=(p,q)=>{const t=T(q),r=t.match(/tỉ lệ với ([\d : ]+)\./)[1].split(':').map(Number),k=360/r.reduce((a,b)=>a+b,0);return String(k*(/lớn nhất/.test(t)?Math.max(...r):Math.min(...r)))};
O['tg2.goc_ngoai']=(p,q)=>{const n=nums(T(q).match(/lần lượt bằng (.*)\. Số đo/)[1]);const g=n.map(v=>180-v);return String(360-g.reduce((a,b)=>a+b,0))};
O['tg2.thang_can_goc']=(p,q)=>{const m=T(q).match(/có ∠(\w) = (\d+)°\. Số đo ∠(\w)/),g=m[1],v=+m[2],k=m[3];
 /* AB // CD: ∠A = ∠B, ∠C = ∠D, ∠A + ∠D = 180° */
 const a=(g=='A'||g=='B')?v:180-v,d=180-a,ang={A:a,B:a,C:d,D:d};return `${ang[k]}°`};
O['tg2.thang_can_chu_vi']=(p,q)=>{const t=T(q);
 if(/Chu vi hình thang là/.test(t)){const a=+t.match(/AB = (\d+)/)[1],b=+t.match(/CD = (\d+)/)[1],c=+t.match(/AD = (\d+)/)[1];if(2*c<=b-a)return false;return String(a+b+2*c)}
 const P0=+t.match(/chu vi (\d+) cm/)[1],a=+t.match(/AB = (\d+)/)[1],b=+t.match(/CD = (\d+)/)[1],c=(P0-a-b)/2;return c>(b-a)/2?String(c):false};
O['tg2.hbh_cheo']=(p,q)=>{const t=T(q);
 if(/Tính OA \+ OB/.test(t))return String((+t.match(/AC = (\d+)/)[1]+ +t.match(/BD = (\d+)/)[1])/2);
 if(/tổng AC \+ BD/.test(t))return String(2*(+t.match(/OA = (\d+)/)[1]+ +t.match(/OB = (\d+)/)[1]));
 return String(+t.match(/chu vi (\d+) cm/)[1]/2-+t.match(/AB = (\d+)/)[1])};
O['tg2.hcn_tt']=(p,q)=>{const t=T(q);if(/Độ dài đường trung tuyến AM/.test(t))return String(+t.match(/BC = (\d+)/)[1]/2);if(/cạnh huyền BC/.test(t))return String(2*+t.match(/dài (\d+) cm/)[1]);return String(2*+t.match(/OA = (\d+)/)[1])};
O['tg2.tim_x_goc']=(p,q)=>{const m=T(q).match(/∠B = \(x \+ (\d+)\)°, ∠C = 2x° và ∠D = \(x \+ (\d+)\)°/);return String((360-+m[1]-+m[2])/5)};
O['tg2.phan_giac_cid']=(p,q)=>{const t=T(q),a=+t.match(/∠A = (\d+)°/)[1],b=+t.match(/∠B = (\d+)°/)[1],cd=360-a-b;return String(180-cd/2)};
O['tg2.hbh_pg']=(p,q)=>{const t=T(q),a=+t.match(/AB = (\d+)/)[1],b=+t.match(/AD = (\d+)/)[1],th=70*Math.PI/180,
 AB=[a,0],AD=[b*Math.cos(th),b*Math.sin(th)],u=[1+Math.cos(th),Math.sin(th)],B=AB,C=[AB[0]+AD[0],AD[1]],
 /* giải A + t·u = X0 + s·dir */
 solve=(X0,dir)=>{const d=u[0]*(-dir[1])-u[1]*(-dir[0]),tt=(X0[0]*(-dir[1])-X0[1]*(-dir[0]))/d,ss=(u[0]*X0[1]-u[1]*X0[0])/d;return{t:tt,s:ss}};
 if(/cắt cạnh BC tại E/.test(t)){const r=solve(B,AD);if(r.s<-1e-9||r.s>1+1e-9)return false;const E=[B[0]+r.s*AD[0],B[1]+r.s*AD[1]];return String(Math.round(Math.hypot(C[0]-E[0],C[1]-E[1])*1e6)/1e6)}
 const r=solve(AD,AB);if(r.s<-1e-9||r.s>1+1e-9)return false;const F=[AD[0]+r.s*AB[0],AD[1]+r.s*AB[1]];return String(Math.round(Math.hypot(C[0]-F[0],C[1]-F[1])*1e6)/1e6)};
O['tg2.thang_vuong']=(p,q)=>{const t=T(q),a=+t.match(/AB = (\d+)/)[1],b=+t.match(/CD = (\d+)/)[1],h=+t.match(/AD = (\d+)/)[1],r=Math.hypot(h,b-a);return Math.abs(r-Math.round(r))<1e-9?String(Math.round(r)):false};
O['tg2.thang_can_cao']=(p,q)=>{const t=T(q),a=+t.match(/AB = (\d+)/)[1],b=+t.match(/CD = (\d+)/)[1],r=+t.match(/AD = BC = (\d+)/)[1],h=Math.sqrt(r*r-((b-a)/2)**2);return Math.abs(h-Math.round(h))<1e-9?String(Math.round(h)):false};

/* ================= ĐỊNH LÍ THALÈS ================= */
O['th2.dtb_canh']=(p,q)=>{const t=T(q);return String(/Tính độ dài MN/.test(t)?+t.match(/BC = (\d+)/)[1]/2:2*+t.match(/MN = (\d+)/)[1])};
O['th2.dtb_chu_vi']=(p,q)=>{const t=T(q);if(/chu vi tam giác DEF/.test(t)){const a=+t.match(/AB = (\d+)/)[1],b=+t.match(/BC = (\d+)/)[1],c=+t.match(/CA = (\d+)/)[1];if(!(a+b>c&&a+c>b&&b+c>a))return false;return String((a+b+c)/2)}
 if(/chu vi tam giác ABC/.test(t))return String(2*(+t.match(/DE = (\d+)/)[1]+ +t.match(/EF = (\d+)/)[1]+ +t.match(/FD = (\d+)/)[1]));return String(2*+t.match(/DE = (\d+)/)[1])};
O['th2.thales_nc']=(p,q)=>{const t=T(q),ab=+t.match(/AB = (\d+)/)[1],am=+t.match(/AM = (\d+)/)[1],ac=+t.match(/AC = (\d+)/)[1],an=am*ac/ab;return an==Math.round(an)?String(ac-an):false};
O['th2.chia_ti_so']=(p,q)=>{const t=T(q),m=t.match(/dài (\d+) cm sao cho AM : MB = (\d+) : (\d+)\. Tính độ dài (AM|MB)/),a=+m[1],x=+m[2],y=+m[3],am=a*x/(x+y);return String(m[4]=='AM'?am:a-am)};
O['th2.thales_hinh_thang']=(p,q)=>{const t=T(q),ab=+t.match(/AB = (\d+)/)[1],cd=+t.match(/CD = (\d+)/)[1],oa=+t.match(/OA = (\d+)/)[1],oc=oa*cd/ab;return oc==Math.round(oc)?String(oc):false};
O['th2.pg_tim_ac']=(p,q)=>{const t=T(q),ab=+t.match(/AB = (\d+)/)[1],bd=+t.match(/BD = (\d+)/)[1],dc=+t.match(/DC = (\d+)/)[1],bc=bd+dc,ac=ab*dc/bd;return ac==Math.round(ac)&&ab+ac>bc&&ab+bc>ac&&ac+bc>ab?String(ac):false};
O['th2.mn_qua_O']=(p,q)=>{const t=T(q),a=+t.match(/AB = (\d+)/)[1],b=+t.match(/CD = (\d+)/)[1];
 /* dựng toạ độ: A(0,1) B(a,1) D(-7,0) C(b-7,0); O = AC ∩ BD; MN qua O song song AB */
 const A=[0,1],B=[a,1],D=[-7,0],C=[b-7,0],it=(P1,P2,P3,P4)=>{const d=(P2[0]-P1[0])*(P4[1]-P3[1])-(P2[1]-P1[1])*(P4[0]-P3[0]),s=((P3[0]-P1[0])*(P4[1]-P3[1])-(P3[1]-P1[1])*(P4[0]-P3[0]))/d;return[P1[0]+s*(P2[0]-P1[0]),P1[1]+s*(P2[1]-P1[1])]},
  O0=it(A,C,B,D),y=O0[1],on=(P1,P2)=>P1[0]+(P2[0]-P1[0])*(1-y)/(P2[1]-P1[1])*1+0,Mx=A[0]+(D[0]-A[0])*(1-y),Nx=B[0]+(C[0]-B[0])*(1-y);
 const mn=Nx-Mx;return Math.abs(mn-Math.round(mn))<1e-9?String(Math.round(mn)):false};
O['th2.pg_hieu']=(p,q)=>{const t=T(q),ab=+t.match(/AB = (\d+)/)[1],ac=+t.match(/AC = (\d+)/)[1],bc=+t.match(/BC = (\d+)/)[1];if(!(ab+ac>bc&&ab+bc>ac&&ac+bc>ab))return false;const bd=bc*ab/(ab+ac),dc=bc*ac/(ab+ac);return Math.abs(bd-Math.round(bd))<1e-9?String(bd-dc):false};
O['th2.tu_giac_trung_diem']=(p,q)=>{const t=T(q),ac=+t.match(/AC = (\d+)/)[1],bd=+t.match(/BD = (\d+)/)[1];
 /* kiểm bằng toạ độ một tứ giác bất kì có AC, BD cho trước: chu vi hình bình hành Varignon = AC + BD khi AC ⊥ BD; tổng quát MNPQ có hai cặp cạnh AC/2 và BD/2 */
 return String(2*(ac/2)+2*(bd/2))};

/* ================= THỐNG KÊ ================= */
O['tk2.truc_tiep']=(p,q)=>{const t=T(q),a=strip(q.a),direct=/Lập phiếu|Phỏng vấn|Quan sát|thước|Gieo/.test(a),ind=/Tra cứu|Đọc báo|dự báo|tạp chí|sách/.test(a);if(direct==ind)return false;return /gián tiếp\?$/.test(t)?ind:direct};
O['tk2.roi_rac_lien_tuc']=(p,q)=>{const t=T(q),a=strip(q.a),lt=/\((cm|kg|giây|°C|km)\)/.test(a);return /liên tục\?$/.test(t)?lt:!lt};
O['tk2.phan_loai3']=(p,q)=>{const item=T(q).match(/“(.*)” thuộc/)[1],lt=/\((cm|kg|giây|°C|km)\)/.test(item),rr=/^Số /.test(item),ord=/^(Xếp loại|Mức độ|Hạng|Cỡ)/.test(item),un=/^(Tên|Màu|Quê)/.test(item);
 const cat=lt?'Số liệu liên tục':rr?'Số liệu rời rạc':ord?'Dữ liệu không là số, có thể sắp thứ tự':un?'Dữ liệu không là số, không thể sắp thứ tự':null;return cat?cat:false};
O['tk2.bd_tranh']=(p,q)=>{const t=T(q),s=svgs(q)[0],u=+t.match(/ứng với (\d+) học sinh,/)[1],lab=['8A','8B','8C','8D'],rows=[0,1,2,3].map(i=>{const y=24+i*28,full=(s.match(new RegExp(`<circle cx="\\d+" cy="${y}" r="9"`,'g'))||[]).length,half=(s.match(new RegExp(`<path d="M\\d+ ${y-9}A9 9`,'g'))||[]).length;return full+half/2});
 if(/Tổng số học sinh giỏi/.test(t))return String(rows.reduce((a,b)=>a+b,0)*u);
 let m=t.match(/Lớp (8[A-D]) có bao nhiêu/);if(m)return String(rows[lab.indexOf(m[1])]*u);
 m=t.match(/Lớp (8[A-D]) có nhiều hơn lớp (8[A-D]) bao nhiêu/);return String((rows[lab.indexOf(m[1])]-rows[lab.indexOf(m[2])])*u)};
O['tk2.goc_truc']=(p,q)=>{const t=T(q),g=+t.match(/bắt đầu từ (\d+)\./)[1],a=+t.match(/8A có (\d+)/)[1],b=+t.match(/8B có (\d+)/)[1];return String((a-g)/(b-g))};
O['tk2.tb_doan_thang']=(p,q)=>{const t=T(q),v=[...svgs(q)[0].matchAll(/<text[^>]*>(\d+)<\/text>/g)].map(m=>+m[1]);if(v.length!=5)return false;
 if(/trung bình/.test(t))return String(v.reduce((a,b)=>a+b,0)/5);const m=t.match(/tháng (\d) tăng bao nhiêu phần trăm so với tháng (\d)/),b=v[+m[2]-1],n=v[+m[1]-1];return String((n-b)/b*100)};
O['tk2.hai_quat']=(p,q)=>{const t=T(q),S=svgs(q),pc=s=>[...s.matchAll(/>([^<>]*?) (\d+)%<\/text>/g)].map(m=>[m[1],+m[2]]),A=pc(S[0]),Dd=pc(S[1]),m=t.match(/Lớp 8A có (\d+) học sinh, lớp 8D có (\d+) học sinh\. Số học sinh (.*?) của lớp (8[AD]) nhiều hơn số học sinh .*? của lớp (8[AD])/),
 n1=+m[1],n2=+m[2],c1=n1*A.find(x=>x[0]==m[3])[1]/100,c2=n2*Dd.find(x=>x[0]==m[3])[1]/100,hi=m[4]=='8A'?c1:c2,lo=m[4]=='8A'?c2:c1;return String(hi-lo)};
O['tk2.cot_kep_lop']=(p,q)=>{const v=[...svgs(q)[0].matchAll(/<text[^>]*>(\d+)<\/text>/g)].map(m=>+m[1]);if(v.length!=8)return false;const df=[0,1,2,3].map(i=>v[2*i]-v[2*i+1]),mx=Math.max(...df);if(df.filter(d=>d==mx).length!=1)return false;return 'Lớp '+'8'+'ABCD'[df.indexOf(mx)]};
O['tk2.quat_hieu']=(p,q)=>{const t=T(q),N=+t.match(/của (\d+) học sinh/)[1],pc=[...svgs(q)[0].matchAll(/>([^<>]*?) (\d+)%<\/text>/g)].map(m=>[m[1],+m[2]]),m=t.match(/môn “(.*?)” nhiều hơn số học sinh thích môn “(.*?)”/),a=pc.find(x=>x[0]==m[1])[1],b=pc.find(x=>x[0]==m[2])[1];return String(N*(a-b)/100)};
return O};
