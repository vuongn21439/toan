/* Oracle độc lập cho lớp 8: khóa = mã dạng bài gn('mã', …); hàm nhận (tham-số q.p, câu-hỏi q), trả về chuỗi đáp án đúng hoặc true/false */
const {parse,same,strip,ev,ng,gcd}=require('./expr.js');
module.exports=L=>{
const fd2=v=>String(+(+v).toFixed(6)).replace('.',',');
const O={},fr=(n,d)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return d/g==1?''+n/g:n/g+'/'+d/g},
 P2=(q,fn)=>same(parse(q.a),fn),                        /* đáp án (dạng biểu thức) phải bằng fn tại mọi điểm thử */
 pw=(c,a,b)=>(x,y)=>c*x**a*y**b;

/* ---------- ĐA THỨC ---------- */
O['dt.bac_don']=p=>String(p[1]+p[2]);
O['dt.bac_da']=([A])=>String(Math.max(...A.map(t=>t[1]+t[2])));
O['dt.cong']=([A,B],q)=>P2(q,(x,y)=>ev(A,x,y)+ev(B,x,y));
O['dt.tru']=([A,B],q)=>P2(q,(x,y)=>ev(A,x,y)-ev(B,x,y));
O['dt.nhan_dt']=([m,A],q)=>P2(q,(x,y)=>ev([m],x,y)*ev(A,x,y));
O['dt.nhan_hai']=([p,q0,r,s],q)=>P2(q,x=>(p*x+q0)*(r*x+s));
O['dt.chia_dt']=([c1,a,b,c2,e,f],q)=>P2(q,(x,y)=>(c1*x**a*y**b)/(c2*x**e*y**f));
O['dt.chia_da']=([N,m],q)=>P2(q,(x,y)=>ev(N,x,y)/ev([m],x,y));
O['dt.gtri']=([A,x,y])=>String(ev(A,x,y));
O['dt.he_so']=([a,b,c,k])=>{const A=[a,1],B=[c,b,1],R=[0,0,0,0];A.forEach((u,i)=>B.forEach((v,j)=>R[i+j]+=u*v));return String(R[[2,1,0][k]])};
O['dt.chia_cubic']=([N,a],q)=>{const f=parse(q.a);return same((x)=>(x-a)*f(x),x=>ev(N,x))};
O['dt.chia_het']=([c,a,k])=>{for(let t=-60;t<=60;t++)if(c*c+t*c-k===0)return String(t);return false};
O['dt.du']=([pol,r])=>String(ev(pol,r));

/* ---------- HẰNG ĐẲNG THỨC ---------- */
O['hd.bp']=([a,b,s],q)=>P2(q,x=>(a*x+s*b)**2);
O['hd.hieu_bp']=([a,b],q)=>P2(q,x=>(a*x-b)*(a*x+b));
O['hd.pt_hieu']=([a,b],q)=>P2(q,x=>a*a*x*x-b*b);
O['hd.lp']=([a,s],q)=>P2(q,x=>(x+s*a)**3);
O['hd.tong_lp']=([a,s],q)=>P2(q,x=>x**3+s*a**3);
O['hd.dien']=([p,q0])=>String(q0*q0);
O['hd.nhanh']=([b,d,t])=>String(t==0?(b+d)*(b+d):t==1?(b-d)*(b-d):(b+d)*(b-d));
O['hd.chung']=([g,m,n])=>{const G=gcd(g*m,g*n),a=g*m/G,b=g*n/G; return `${G}x(${a==1?'x':a+'x'} − ${b})`};
O['hd.gtri']=([a,n,s])=>{const x=n-s*a;return String(x*x+2*s*a*x+a*a)};
O['hd.tong_bp']=([t,sv,p])=>{ /* tìm x, y thực (hoặc phức qua công thức) không cần: kiểm bằng nghiệm của t² − S·t + P khi có nghiệm thực, ngược lại dùng đồng nhất thức */
  const S=t==0?sv:sv,disc=sv*sv-4*p;if(disc>=0){const r=Math.sqrt(disc);let x,y;if(t==0){x=(sv+r)/2;y=(sv-r)/2}else{y=(-sv+r)/2;x=y+sv;if(Math.abs(x*y-p)>1e-6){y=(-sv-r)/2;x=y+sv}}
    if(Math.abs(x*y-p)>1e-6)return String(t==0?sv*sv-2*p:sv*sv+2*p);return String(Math.round(x*x+y*y))}return String(t==0?sv*sv-2*p:sv*sv+2*p)};
O['hd.tong_lp2']=([t,sv,p])=>{ /* dùng đồng nhất thức qua tổng lũy thừa Newton */
  if(t==0){const s1=sv,s2=sv*s1-2*p,s3=sv*s2-p*s1;return String(s3)}
  /* hiệu: đặt y' = −y thì x + y' = sv, x·y' = −p; x³ − y³ = x³ + y'³ */
  const s1=sv,s2=sv*s1-2*(-p),s3=sv*s2-(-p)*s1;return String(s3)};
O['hd.gtnn']=([m,c,t])=>{let best=t==0?Infinity:-Infinity;for(let x=-80;x<=80;x++){const v=t==0?x*x+2*m*x+c:-x*x+2*m*x+c;best=t==0?Math.min(best,v):Math.max(best,v)}return String(best)};
O['hd.nhom']=([k],q)=>P2(q,(x,y)=>x*x-y*y-k*x+k*y);
O['hd.tim_x']=([a,b,c])=>{const r=[];for(let x=-200;x<=200;x++)if((x+a)**2-(x-b)*(x+b)===c)r.push(x);return r.length==1?String(r[0]):false};

/* ---------- PHÂN THỨC ---------- */
const zeros=f=>{const z=[];for(let x=-100;x<=100;x++)if(f(x)===0)z.push(x);return z};
O['pt.dk1']=([m,k])=>{const z=zeros(x=>m*x-m*k);return z.length==1?'x ≠ '+ng(z[0]):false};
O['pt.dk2']=([k,t])=>{const z=zeros(t==0?x=>x*x-k*k:x=>x*x+k*x);return t==0?(z.length==2&&z.includes(k)&&z.includes(-k)?`x ≠ ${k} và x ≠ −${k}`:false):(z.length==2&&z.includes(0)&&z.includes(-k)?`x ≠ 0 và x ≠ −${k}`:false)};
O['pt.rut1']=([nu,de],q)=>same(parse(q.a),(x)=>parse(nu)(x)/parse(de)(x));
const red=a=>{const parts=[...a.matchAll(/<b>(.*?)<\/b>/g)].map(t=>t[1]);if(parts.length!=2||!/^<span/.test(a))return false;const co=parts.map(t=>+((t.match(/^\d+/)||['1'])[0])),vs=parts.map(t=>new Set(t.replace(/\^\d+/g,'').replace(/[^xy]/g,'')));return gcd(co[0],co[1])==1&&![...vs[0]].some(v=>vs[1].has(v))};
O['pt.rut2']=([c1,c2,p,q0,r,s],q)=>same(parse(q.a),(x,y)=>(c1*x**p*y**q0)/(c2*x**r*y**s))&&red(q.a);
O['pt.cong_cm']=([a,b,c,d,k,op],q)=>same(parse(q.a),x=>((a*x+b)+op*(c*x+d))/(x-k));
O['pt.cong_kcm']=([p,q0,op],q)=>same(parse(q.a),x=>p/x+op*q0/(x*x));
O['pt.nhan']=([n1,n2,d1,d2],q)=>same(parse(q.a),(x,y)=>(n1*x*x/(d1*y))*(n2*y*y/(d2*x)))&&red(q.a);
O['pt.bang_nhau']=([k],q)=>same((x)=>parse(q.a)(x)/(x*x-k*k),x=>(x+k)/(x-k));
O['pt.nguyen_dem']=([n,a])=>{let c=0;for(let x=a-n-3;x<=a+n+3;x++)if(x!==a&&n%(x-a)===0)c++;return String(c)};
O['pt.rut_gtri']=([k,n])=>fr(n*n-k*k,n*n-2*k*n+k*k);
O['pt.tong_day']=([n])=>{let num=0n,den=1n;const g=(a,b)=>b?g(b,a%b):a;for(let i=1n;i<=BigInt(n);i++){num=num*(i*(i+1n))+den;den=den*(i*(i+1n));const d=g(num,den);num/=d;den/=d}return den==1n?String(num):num+'/'+den};
O['pt.bang0']=([k,t])=>{const nu=x=>x*x-k*k,de=t==0?x=>x+k:x=>x-k,r=[];for(let x=-100;x<=100;x++)if(de(x)!==0&&nu(x)===0)r.push(x);return r.length==1?'x = '+ng(r[0]):false};
O['pt.quy_dong']=([k],q)=>same(parse(q.a),x=>1/(x-k)-1/(x+k));

/* ---------- HÀM SỐ BẬC NHẤT ---------- */
const slope=txt=>{const f=parse(txt.replace(/^y = /,''));return{m:f(1)-f(0),lin:Math.abs((f(2)-f(1))-(f(1)-f(0)))<1e-9,f}},
 pts=a=>{const m=strip(a).replace(/−/g,'-').match(/\((-?\d+); (-?\d+)\)/);return m?[+m[1],+m[2]]:null};
O['hs.nhan_dien']=(p,q)=>{try{const t=slope(q.a);return t.lin&&Math.abs(t.m)>1e-9&&!/x\^|\//.test(strip(q.a))}catch(e){return false}};
O['hs.gtri']=([a,b,x0])=>ng(a*x0+b);
O['hs.thuoc']=([a,b,x0,y0],q)=>{const t=pts(q.a);return !!t&&t[1]===a*t[0]+b};
O['hs.cat_truc']=([a,b,t,k])=>{if(k==0)return `(0; ${ng(a*0+b)})`;for(let x=-200;x<=200;x++)if(a*x+b===0)return `(${ng(x)}; 0)`;return false};
O['hs.don_dieu']=([inc],q)=>{const s=slope(q.a).m;if(!(inc?s>0:s<0))return false;return q.w.every(w=>(inc?slope(w).m<0:slope(w).m>0))};
O['hs.song_song']=([k,a,b1,b2])=>{const r=[];for(let m=-60;m<=60;m++)if(m+k===a&&b1!==b2)r.push(m);return r.length==1?ng(r[0]):false};
O['hs.goc_pt']=([x,y])=>{const t=Math.atan2(y,x);return t>0&&t<Math.PI/2?'I':t>=Math.PI/2&&t<Math.PI?'II':t<0&&t>-Math.PI/2?'IV':'III'};
O['hs.taxi']=([a,b,n])=>String(a*n+b);
O['hs.qua2diem']=([a,b,x1,y1,x2,y2,k])=>{const a2=(y2-y1)/(x2-x1),b2=y1-a2*x1;return String([a2,b2,a2+b2][k])};
O['hs.giao']=([a1,b1,a2,b2,k])=>{for(let x=-300;x<=300;x++)if(a1*x+b1===a2*x+b2)return String(k?a1*x+b1:x);return false};
O['hs.dien_tich']=([a,t])=>{const b=-a*t;return String(Math.abs(b)*Math.abs(t)/2)};
O['hs.dong_bien_m']=([k,inc,f2],q)=>{const C=m=>f2?k-m:m-k,sg=inc?1:-1;const dir=C(k+1)*sg>0&&C(k-1)*sg<0?'>':'<';return `m ${dir} ${ng(k)}`};
O['hs.thang_hang']=([a,b,x1,x2,m0,yc])=>{const y1=a*x1+b,y2=a*x2+b,r=[];for(let m=-200;m<=200;m++)if((x2-x1)*(yc-y1)-(y2-y1)*(m-x1)===0)r.push(m);return r.length==1?String(r[0]):false};

/* ---------- PHƯƠNG TRÌNH BẬC NHẤT ---------- */
const solX=f=>{const r=[];for(let x=-600;x<=600;x++)if(f(x))r.push(x);return r};
O['ptr.cb']=([a,b,x0,c])=>{const r=solX(x=>a*x+b===c);return r.length==1?'x = '+ng(r[0]):false};
O['ptr.dua_ve']=([a,p,c,d])=>{const r=solX(x=>a*(x+p)===c*x+d);return r.length==1?'x = '+ng(r[0]):false};
O['ptr.mau']=([a,b,c])=>{const r=solX(x=>b*x+a*x===c*a*b);return r.length==1?'x = '+ng(r[0]):false};
O['ptr.nghiem']=([x0],q)=>{const holds=e=>{const [l,r]=strip(e).split(' = ');return Math.abs(parse(l)(x0)-parse(r)(x0))<1e-9};return holds(q.a)&&q.w.every(w=>!holds(w))};
O['ptr.tich']=([p,q0])=>{const r=solX(x=>(x-p)*(x+q0)===0);return r.length==2&&r.includes(p)&&r.includes(-q0)?`{${ng(p)}; ${ng(-q0)}}`:false};
O['ptr.so_nghiem']=([L,Rr])=>{const f=x=>parse(L)(x)-parse(Rr)(x),m=f(1)-f(0),c0=f(0);return Math.abs(m)>1e-9?'có đúng một nghiệm':Math.abs(c0)<1e-9?'có vô số nghiệm':'vô nghiệm'};
O['ptr.tuoi']=([a,b,k,t])=>{const r=[];for(let x=0;x<=100;x++)if(a+x===k*(b+x))r.push(x);return r.length==1?String(r[0]):false};
O['ptr.cd']=([v1,t,v2,y])=>{const r=[];for(let x=0;x<=100;x+=0.25)if(Math.abs(v1*(t+x)-v2*x)<1e-9)r.push(x);return r.length==1?String(r[0]).replace('.',','):false};
O['ptr.abs']=([a,b,k])=>{const r=solX(x=>Math.abs(x-a)===b);return r.length==2?String(k?r[0]+r[1]:Math.max(...r)):false};
O['ptr.cd2']=([v1,v2,T,d])=>{const r=[];for(let x=1;x<=3000;x++)if(x*(v1+v2)===T*v1*v2)r.push(x);return r.length==1?String(r[0]):false};
O['ptr.chung']=([a,b])=>{const r=[];for(let x=1;x<=100;x++)if(x*(a+b)===a*b)r.push(x);return r.length==1?String(r[0]):false};
O['ptr.tich2']=([a,b,c])=>{const r=solX(x=>(x-a)*(x+b)-c*(x-a)===0);return r.length==2?String(r[0]+r[1]):false};
O['ptr.giam_gia']=([p,G,S])=>{const r=[];for(let g=1;g<=6000;g++)if(g*(100-p)===S*100)r.push(g);return r.length==1?String(r[0]):false};

/* ---------- HÌNH CHÓP ĐỀU ---------- */
O['hc.dem']=([n,k])=>{const V=n+1,E=n+n,F=n+1;if(V-E+F!==2)return false;return String({'mặt':F,'cạnh':E,'đỉnh':V}[k])};
O['hc.mat_ben']=([t])=>`Đáy là ${t?'hình vuông':'tam giác đều'}; các mặt bên là những tam giác cân bằng nhau`;
O['hc.sxq']=([k,a,d])=>{const per=(k?3:4)*a;return fd2(per/2*d)+' cm²'};
O['hc.v']=([a,h])=>fd2(a*a*h/3)+' cm³';
O['hc.v_tg']=([S,h])=>fd2(S*h/3)+' cm³';
O['hc.tim_h']=([a,V])=>{for(let h=1;h<=200;h++)if(a*a*h/3===V)return h+' cm';return false};
O['hc.trung_doan']=([hb,h,r,k])=>{const d=Math.sqrt(h*h+hb*hb);return String(k?4*hb*d:d)};
O['hc.tang_gap']=([k,t])=>{const V=(a,h)=>a*a*h/3,a=5,h=6,v0=V(a,h),v1=t==0?V(a*k,h):t==1?V(a,h*k):V(a*k,h*k);return String(Math.round(v1/v0))};
O['hc.tim_h2']=([hb,h,r,S])=>{const d=S/(4*hb);return String(Math.sqrt(d*d-hb*hb))};
O['hc.stp']=([a,d])=>String(2*a*d+a*a);

/* ---------- PYTHAGORAS ---------- */
O['py.huyen']=([x,y])=>fd2(Math.sqrt(x*x+y*y))+' cm';
O['py.goc_vuong']=([c,x])=>fd2(Math.sqrt(c*c-x*x))+' cm';
O['py.can']=([p,q])=>`√${p*p+q*q} cm`;
O['py.dao']=(p,q)=>{const t=s=>strip(s).split(';').map(Number).sort((a,b)=>a-b),py=v=>v[0]*v[0]+v[1]*v[1]===v[2]*v[2];return py(t(q.a))&&q.w.every(w=>!py(t(w)))};
O['py.dcheo']=(p,q)=>p[3]===1?fd2(Math.hypot(p[0],p[1]))+' cm':`${p[0]}√2 cm`;
O['py.cao_can']=([m,h,c])=>fd2(Math.sqrt(c*c-m*m))+' cm';
O['py.thang']=([d,h,l])=>fd2(Math.sqrt(l*l-d*d))+' m';
O['py.thoi']=([x,y,r,k])=>{const c=Math.hypot(x,y);return String(k?4*c:c)};
O['py.khoang_cach']=([x1,y1,x2,y2])=>String(Math.hypot(x2-x1,y2-y1));
O['py.hop']=([a,b,c])=>String(Math.sqrt(a*a+b*b+c*c));
O['py.dien_tich']=([x,y,c])=>String(x*Math.sqrt(c*c-x*x)/2);
O['py.hinh_thang']=([a,dd,h])=>String(Math.hypot(dd,h));
O['py.cay_gay']=([h,d])=>String(h+Math.hypot(h,d));

/* ---------- TỨ GIÁC ---------- */
O['tg.tong_goc']=([a,b,c])=>ng(360-a-b-c)+'°';
O['tg.hbh_goc']=([al,g])=>ng(g=='∠C'?al:180-al)+'°';
const TRUEF=['Hình chữ nhật có hai đường chéo bằng nhau','Hình thoi có hai đường chéo vuông góc với nhau','Hình bình hành có các góc đối bằng nhau','Hình thang cân có hai đường chéo bằng nhau','Hình vuông có bốn góc vuông và bốn cạnh bằng nhau'];
const DHT={'Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường':'hình bình hành','Tứ giác có hai cặp cạnh đối bằng nhau':'hình bình hành','Hình bình hành có một góc vuông':'hình chữ nhật','Hình bình hành có hai đường chéo bằng nhau':'hình chữ nhật','Hình bình hành có hai đường chéo vuông góc':'hình thoi','Hình bình hành có hai cạnh kề bằng nhau':'hình thoi','Tứ giác có bốn cạnh bằng nhau':'hình thoi','Hình chữ nhật có hai cạnh kề bằng nhau':'hình vuông','Hình thoi có một góc vuông':'hình vuông','Hình thang có hai đường chéo bằng nhau':'hình thang cân'};
O['tg.dau_hieu']=([s])=>DHT[s]||false;
O['tg.dtb']=(p)=>p[2]===1?fd2((p[0]+p[1])/2)+' cm':fd2(p[0]/2)+' cm';
O['tg.dien_tich']=(p)=>fd2(p[0]==0?p[1]*p[2]/2:p[0]==1?p[1]*p[2]:(p[1]+p[2])*p[3]/2)+' cm²';
O['tg.khang_dinh']=(p,q)=>TRUEF.includes(strip(q.a))&&q.w.every(w=>!TRUEF.includes(strip(w)));
O['tg.dtb_day']=([a,m])=>String(2*m-a);
O['tg.thoi_canh']=([x,y,r])=>String(2*Math.sqrt(r*r-x*x));
O['tg.hbh_ti_le']=([m,n,k])=>{const t=180/(m+n);return String(k?n*t:m*t)};
O['tg.dtb_pq']=([a,b])=>{const MN=(a+b)/2,MP=a/2,QN=a/2;return String(MN-MP-QN)};
O['tg.da_giac']=([n,k])=>{let c=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(j-i!=1&&!(i==0&&j==n-1))c++;return String(k?c:(n-2)*180)};
O['tg.hcn_dien_tich']=([x,y,d])=>{const s=x+y;for(let a=1;a<s;a++){const b=s-a;if(a*a+b*b===d*d)return String(a*b)}return false};

/* ---------- THALES ---------- */
const nf=v=>fd2(v)+' cm';
O['th.thales']=([AM,MB,AN,NC])=>{ /* tìm NC nguyên thỏa AM·NC = MB·AN */ for(let x=1;x<=500;x++)if(AM*x===MB*AN)return nf(x);return false};
O['th.thales2']=([AM,AB,AC])=>{for(let x=1;x<=500;x++)if(AM*AC===AB*x)return nf(x);return false};
O['th.mn_bc']=([AM,AB,BC])=>{for(let x=1;x<=500;x++)if(AM*BC===AB*x)return nf(x);return false};
O['th.dao']=([c],q)=>{const t=s=>(strip(s).match(/\d+/g)||[]).map(Number),par=v=>v[0]*v[3]===v[1]*v[2];return par(t(q.a))&&q.w.every(w=>!par(t(w)))};
O['th.phan_giac']=([AB,AC,DB])=>{for(let x=1;x<=500;x++)if(DB*AC===AB*x)return nf(x);return false};
O['th.phan_giac_bd']=([AB,AC,BC])=>{for(let x=1;x<=BC;x++)if(x*(AB+AC)===BC*AB)return nf(x);return false};
O['th.ti_so']=([x,y])=>{const g=gcd(x,10*y);return `${x/g}/${10*y/g}`.replace(/^(\d+)\/1$/,'$1')};
O['th.tim_x']=([p,q,d])=>{for(let x=1;x<=500;x++)if(x*q===p*(x+d))return String(x);return false};
O['th.ba_ss']=([AB,BC,DE])=>{for(let x=1;x<=500;x++)if(AB*x===BC*DE)return String(x);return false};
O['th.dt_pg']=([m,n,s])=>{const u=2;/* AB=m·u, AC=n·u, S_ABD=m·s: S_ACD/S_ABD = AC/AB */ for(let x=1;x<=2000;x++)if(x*m*u===m*s*n*u)return String(x);return false};
O['th.hieu_pg']=([m,n,w])=>{/* BD:DC = m:n, BD−DC=(m−n)w */ for(let k=1;k<=100;k++)if(m*k-n*k===(m-n)*w)return String((m+n)*k);return false};
O['th.chia_doan']=([p,q,w])=>String(p*q*w/q);

/* ---------- ĐỒNG DẠNG ---------- */
const frs=(a,b)=>{const g=gcd(a,b);const n=a/g,d=b/g;return d==1?String(n):`${n}/${d}`};
O['dd.ti_so']=([a,b])=>frs(a,b);
O['dd.canh']=([AB,DE,BC])=>{for(let x=1;x<=500;x++)if(AB*x===DE*BC)return nf(x);return false};
O['dd.chu_vi']=([p,q,P1])=>{for(let x=1;x<=500;x++)if(P1*q===x*p)return nf(x);return false};
O['dd.dien_tich']=([p,q,S1])=>{for(let x=1;x<=3000;x++)if(S1*q*q===x*p*p)return fd2(x)+' cm²';return false};
O['dd.truong_hop']=([s],q)=>{const ans=strip(q.a);const T={'ΔABC và ΔDEF có AB/DE = BC/EF = CA/FD.':'c.c.c','ΔABC và ΔDEF có AB/DE = AC/DF và ∠A = ∠D.':'c.g.c','ΔABC và ΔDEF có ∠A = ∠D và ∠B = ∠E.':'g.g','Hai tam giác vuông có một cặp góc nhọn bằng nhau.':'g.g','ΔABC và ΔDEF có AB/DE = AC/DF và ∠B = ∠E.':'chưa đủ','ΔABC và ΔDEF có ∠A = ∠D và AB/DE = BC/EF.':'chưa đủ'};const k=T[s];return !!k&&(k=='chưa đủ'?ans.startsWith('Chưa đủ'):ans.includes('('+k+')'))};
O['dd.bong']=([h1,s1,s2])=>{for(let h=1;h<=500;h++)if(h*s1===h1*s2)return fd2(h)+' m';return false};
O['dd.goc']=([a,b])=>String(180-a-b)+'°';
O['dd.ti_dt']=([p,q,w])=>{const k=Math.sqrt(p*p/(q*q));return String(Math.round(q*w*k))};
O['dd.cgc_tim']=([AM,AB,AC])=>{for(let x=1;x<=500;x++)if(AM*AB===AC*x)return String(x);return false};
O['dd.ht_O']=([p,q,u,w])=>{const AB=p*u,CD=q*u,OC=q*w;for(let x=1;x<=500;x++)if(x*CD===OC*AB)return String(x);return false};
O['dd.hinh_chieu']=([leg,c])=>{for(let x=1;x<=500;x++)if(x*c===leg*leg)return String(x);return false};
O['dd.dt_amn']=([p,q,w])=>{const S=q*q*w;for(let x=1;x<=5000;x++)if(x*q*q===S*p*p)return String(x);return false};

/* ---------- THỐNG KÊ & XÁC SUẤT ---------- */
const QLo=['Màu sắc yêu thích của học sinh','Tên các môn thể thao yêu thích','Loại phương tiện đến trường','Quê quán của học sinh','Món ăn yêu thích của học sinh'],QTo=['Chiều cao của học sinh','Số anh chị em ruột của một học sinh','Điểm kiểm tra môn Toán','Cân nặng của học sinh','Số giờ ngủ mỗi ngày','Số bạn trong một lớp học'];
O['tk.loai_du_lieu']=([quant],q)=>(quant?QTo:QLo).includes(strip(q.a));
O['tk.cot_doc']=([l,v,t])=>{const mx=Math.max(...v),mn=Math.min(...v);return t==0?l[v.indexOf(mx)]:t==1?String(v.reduce((a,b)=>a+b,0)):String(mx-mn)};
O['tk.quat']=([p,th,t])=>t==0?ng(Math.round(p*360/100))+'°':fd2(th*100/360)+'%';
O['tk.chon_bd']=([s])=>/nam và số học sinh nữ|Toán và môn Văn/.test(s)?'biểu đồ cột kép':/thay đổi|Theo dõi/.test(s)?'biểu đồ đoạn thẳng':/tỉ lệ phần trăm|thành phần/.test(s)?'biểu đồ hình quạt tròn':'biểu đồ cột';
O['tk.hop_li']=(p)=>{if(p.length==4){const [nm,lo,hi,b]=p;return b<lo||b>hi?ng(b):false}const [a,b2,c]=p,sm=a+b2+c;return sm==100?'Hợp lí vì tổng bằng 100%':sm>100?'Không hợp lí vì tổng lớn hơn 100%':'Không hợp lí vì tổng nhỏ hơn 100%'};
O['tk.phan_tram']=([v,T,i])=>fd2(v[i]*100/T)+'%';
O['tk.cot_kep']=([v1,v2,t,i])=>t==0?String(v2.reduce((a,b)=>a+b,0)):t==1?String(v1[i]+v2[i]):String(Math.abs(v1[i]-v2[i]));
O['tk.tang_pt']=([v1,v2])=>String((v2-v1)/v1*100);
O['tk.quat_so']=([T,d])=>String(T*d/100);
O['tk.goc_tam']=([T,a])=>String(a*360/T);
O['tk.nhan_xet']=([v])=>{let best=-1,bi=-1;for(let i=1;i<v.length;i++)if(v[i]-v[i-1]>best){best=v[i]-v[i-1];bi=i}return `Từ tháng ${bi} đến tháng ${bi+1}`};
const EVo=[x=>x%2==0,x=>[2,3,5].includes(x),x=>x%3==0,x=>x>4,x=>x<3,x=>x!=6,x=>x%2==0||x%3==0],
 XCo=[([a,b])=>a==b,([a,b])=>a=='S'||b=='S',([a,b])=>a!=b,([a,b])=>a=='S'&&b=='S',([a,b])=>a=='N'&&b=='N'],
 isP=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d==0)return false;return true};
O['xs.thuc_nghiem']=([n,k])=>frs(k,n);
O['xs.bi']=([c,i])=>frs(c[i],c[0]+c[1]+c[2]);
O['xs.xuc_xac']=([e])=>{let c=0;for(let x=1;x<=6;x++)if(EVo[e](x))c++;return frs(c,6)};
O['xs.the']=([n,k])=>{const f=[x=>x%2==0,x=>x%3==0,x=>x%4==0,x=>x%5==0,isP,x=>Math.round(Math.sqrt(x))**2===x][k];let c=0;for(let x=1;x<=n;x++)if(f(x))c++;return frs(c,n)};
O['xs.doi']=([p])=>fd2(1-p);
O['xs.dong_xu2']=([e])=>{let c=0;for(const a of 'SN')for(const b of 'SN')if(XCo[e]([a,b]))c++;return frs(c,4)};
O['xs.so_kq']=([k])=>String([2*2*2,2*6,6*6,2*2*6][k]);
O['xs.hai_xx']=([s,t])=>{let c=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(t?a+b>=s:a+b===s)c++;return frs(c,36)};
O['xs.them_bi']=([r,b],q)=>{const m=strip(q.q).match(/trở thành (\d+)\/(\d+)/),p=+m[1],qq=+m[2];for(let x=1;x<=300;x++)if((r+x)*qq===p*(r+b+x))return String(x);return false};
O['xs.ba_xu']=([k])=>{const Ef=[o=>o.filter(Boolean).length==2,o=>o.some(Boolean),o=>o[0]==o[1]&&o[1]==o[2],o=>o.filter(v=>!v).length==1][k];let c=0;for(let m=0;m<8;m++){const o=[m&1,(m>>1)&1,(m>>2)&1].map(v=>!!v);if(Ef(o))c++}return frs(c,8)};
O['xs.hai_chu_so']=([k])=>{const f=[x=>x%7==0,x=>Math.round(Math.sqrt(x))**2===x,x=>String(x).split('').reduce((s,d)=>s+ +d,0)==9,x=>String(x)[0]==String(x)[1]][k];let c=0;for(let x=10;x<=99;x++)if(f(x))c++;return frs(c,90)};
O['xs.tim_x']=([r,p,q])=>{for(let x=1;x<=300;x++)if(r*q===p*(r+x))return String(x);return false};
return O};
