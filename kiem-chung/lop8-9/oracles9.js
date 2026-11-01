/* Oracle độc lập cho lớp 9 (xem verify.js) */
const {parse,same,strip,ev,ng,gcd,rv}=require('./expr.js');
module.exports=L=>{
const O={},fd2=v=>String(+(+v).toFixed(6)).replace('.',','),close=(a,b)=>Math.abs(a-b)<1e-7*Math.max(1,Math.abs(b)),
 frs=(n,d)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;n/=g;d/=g;return d==1?String(n):`${n}/${d}`},
 pts=a=>{const m=strip(a).replace(/−/g,'-').match(/\((-?\d+); (-?\d+)\)/);return m?[+m[1],+m[2]]:null},
 intRoots=(f,lo=-200,hi=200)=>{const r=[];for(let x=lo;x<=hi;x++)if(f(x)===0)r.push(x);return r},
 pair=(a,b)=>{const [p,q]=[a,b].sort((m,n)=>m-n);return `x = ${ng(p)}; x = ${ng(q)}`};

/* ---------- CĂN THỨC ---------- */
O['can.cbhsh']=([s,t])=>{let r=-1;for(let x=0;x<=60;x++)if(x*x===s*s)r=x;return t==0?String(r):`±${r}`};
O['can.cbba']=([k])=>{for(let x=-10;x<=10;x++)if(x**3===k**3)return ng(x);return false};
O['can.dkxd']=([a,t])=>{const ok=x=>a*x-a*t>=0,xs=[...Array(101)].map((_,i)=>i-50).filter(ok);return xs.includes(t)&&xs.every(x=>x>=t)?`x ≥ ${ng(t)}`:xs.includes(t)&&xs.every(x=>x<=t)?`x ≤ ${ng(t)}`:false};
O['can.ra_ngoai']=([k,m],q)=>close(rv(q.a),Math.sqrt(k*k*m))&&new RegExp('^'+k+'√'+m+'$').test(strip(q.a));
O['can.cong_tru']=([n,s2,s3],q)=>close(rv(q.a),Math.sqrt(n[0])+s2*Math.sqrt(n[1])+s3*Math.sqrt(n[2]));
O['can.nhan']=([m,u,v])=>String(Math.round(Math.sqrt(m*u*u)*Math.sqrt(m*v*v)));
O['can.so_sanh']=([lab,big])=>{const v=lab.map(rv),i=big?v.indexOf(Math.max(...v)):v.indexOf(Math.min(...v));return lab[i]};
O['can.truc_can']=([a,b],q)=>close(rv(q.a),a/Math.sqrt(b))&&!/\//.test(strip(q.a));
O['can.lien_hop']=(p)=>{const t=p[0];if(t==0){const [,a,b]=p;return String(Math.round((Math.sqrt(a)+Math.sqrt(b))*(Math.sqrt(a)-Math.sqrt(b))))}if(t==1){const [,k,m]=p;return String(Math.round((k+Math.sqrt(m))**2+(k-Math.sqrt(m))**2))}const [,a]=p;return String(Math.round((Math.sqrt(a)+1)**2-2*Math.sqrt(a)))};
O['can.truc_can2']=([a,b,c],q)=>close(rv(q.a),a/(Math.sqrt(b)-Math.sqrt(c)));
O['can.denest']=([u,v],q)=>close(rv(q.a),Math.sqrt(u+v+2*Math.sqrt(u*v)))&&new RegExp('^√'+u+'\\+√'+v+'$').test(strip(q.a).replace(/\s/g,''));
O['can.min']=([k,c])=>{let b=Infinity;for(let t=0;t<=30;t+=.01)b=Math.min(b,t*t-2*k*t+c);return String(Math.round(b*1e4)/1e4)};
O['can.pt']=([a,b,c])=>{const r=intRoots(x=>(a*x+b>=0&&a*x+b===c*c)?0:1,-300,300);return r.length==1?String(r[0]):false};
O['can.can3_ra']=([k,m],q)=>close(rv(q.a),Math.cbrt(k**3*m))&&new RegExp('^'+k+'∛'+m+'$').test(strip(q.a));
O['can.abs']=([a,lt],q)=>{if(/\|/.test(q.a))return false;const f=parse(strip(q.a).replace(/\|x\|/g,'x'));const xs=lt?[a-.5,a-3,a-9]:[a+.5,a+3,a+9];return xs.every(x=>close(f(x),Math.abs(x-a)))};

/* ---------- HÀM SỐ y = ax² ---------- */
O['hs2.gtri']=([a,x0])=>ng(a*x0*x0);
O['hs2.thuoc']=([a],q)=>{const t=pts(q.a);return !!t&&t[1]===a*t[0]*t[0]};
O['hs2.tim_a']=([x0,y0])=>{const r=[];for(let a=-60;a<=60;a++)if(a*x0*x0===y0)r.push(a);return r.length==1?ng(r[0]):false};
O['hs2.tinh_chat']=([a])=>a>0?'Đồ thị nằm phía trên trục hoành, nhận gốc O làm điểm thấp nhất':'Đồ thị nằm phía dưới trục hoành, nhận gốc O làm điểm cao nhất';
O['hs2.dong_nghich']=([a,inc])=>{const incPos=a*4>a*1;return (inc?incPos:!incPos)?'x > 0':'x < 0'};
O['hs2.doi_xung']=([a,x0])=>`(${ng(-x0)}; ${ng(a*x0*x0)})`;
O['hs2.gtnn']=([a,mn])=>{const f=x=>a*x*x,hasMin=f(0)<=f(5)&&f(0)<=f(-5),hasMax=f(0)>=f(5)&&f(0)>=f(-5);return (mn?hasMin:hasMax)?'0 (đạt được khi x = 0)':'không có (hàm số không bị chặn)'};
O['hs2.thuc_te']=([t,k])=>{if(k==0)return String(5*t*t);const s=5*t*t,r=[];for(let x=1;x<=100;x++)if(5*x*x===s)r.push(x);return r.length==1?String(r[0]):false};
O['hs2.giao']=([a,b,c])=>{const r=intRoots(x=>a*x*x-(b*x+c),-300,300);return r.length==2?String(Math.max(...r)):false};
O['hs2.tam_giac']=([a,x0])=>{const A=[x0,a*x0*x0],B=[-x0,a*x0*x0];return String(Math.abs(A[0]*B[1]-A[1]*B[0])/2)};
O['hs2.gtln_doan']=([a,m,n,mx])=>{const v=[];for(let x=m;x<=n;x++)v.push(a*x*x);return String(mx?Math.max(...v):Math.min(...v))};
O['hs2.hoanh_do']=([a,y0])=>{const r=[];for(let x=1;x<=100;x++)if(a*x*x===y0)r.push(x);return r.length==1?String(r[0]):false};
O['hs2.tham_so']=([k])=>{let c=0;for(let m=-5;m<=5;m++)if(m-k>0)c++;return String(c)};

/* ---------- PHƯƠNG TRÌNH BẬC HAI ---------- */
O['pb.he_so']=([a,b,c])=>`a = ${ng(a)}; b = ${ng(b)}; c = ${ng(c)}`;
O['pb.delta']=([a,b,c])=>ng(b*b-4*a*c);
O['pb.so_nghiem']=([a,b,c])=>{const vtx=c-b*b/(4*a);const s=a>0?-vtx:vtx; /* a>0: giá trị nhỏ nhất âm → 2 nghiệm */return s>1e-9?'có hai nghiệm phân biệt':Math.abs(s)<1e-9?'có nghiệm kép':'vô nghiệm'};
O['pb.giai']=(p,q)=>{const m=strip(q.q).replace(/−/g,'-').match(/Giải phương trình (.*) = 0\./);const f=parse(m[1]),r=intRoots(x=>Math.abs(f(x))<1e-9?0:1,-300,300);return r.length==2?pair(r[0],r[1]):false};
O['pb.khuyet']=([t,s])=>t==0?pair(-s,s):pair(0,s);
O['pb.viet']=([a,b,c,k])=>{const f=x=>a*x*x+b*x+c,r=intRoots(f,-300,300);if(r.length!=2)return false;return ng(k?r[0]*r[1]:r[0]+r[1])};
O['pb.nham']=([a,b,c,t])=>{const known=t==0?1:-1;if(a*known*known+b*known+c!==0)return false;const o=frs(-b-known*a,a);return `x = ${known}; x = ${o.replace(/^-/,'−')}`};
O['pb.delta_phay']=([a,bp,c])=>ng(bp*bp-a*c);
O['pb.kep']=([k])=>{const r=[];for(let m=-100;m<=300;m++)if((2*k)**2-4*m===0)r.push(m);return r.length==1?String(r[0]):false};
O['pb.hai_pb']=([k])=>`m < ${k*k}`;
O['pb.viet_tbp']=([r1,r2])=>String(r1*r1+r2*r2);
O['pb.hai_so']=([S,Pr])=>{const r=[];for(let a=-100;a<=100;a++){const b=S-a;if(a*b===Pr)r.push(Math.max(a,b))}return r.length?String(r[0]):false};
O['pb.lap']=([u,v],q)=>{const left=strip(q.a).replace(/−/g,'-').replace(/ = 0$/,''),f=parse(left);return Math.abs(f(u))<1e-9&&Math.abs(f(v))<1e-9&&Math.abs(f(2)-4-(f(1)-1)*2+f(0)-(f(0)))>=0&&Math.abs((f(1)-2*f(0)+f(-1))/2-1)<1e-9};
O['pb.thuc_te']=(p)=>{if(p[0]==0){const N=p[1]*(p[1]+1);for(let x=1;x<=100;x++)if(x*(x+1)===N)return String(x+1)}else{const [,a,b]=p,P=2*(a+b),S=a*b;for(let x=1;x<=P;x++){const y=P/2-x;if(x*y===S&&x>=y)return String(x)}}return false};
O['pb.m_nghiem']=([r,m,c])=>{const s=[];for(let t=-200;t<=200;t++)if(r*r+t*r+c===0)s.push(t);return s.length==1?String(s[0]):false};
O['pb.nghich']=([r1,r2])=>frs(r1+r2,r1*r2);

/* ---------- HỆ PHƯƠNG TRÌNH ---------- */
const sat2=(t,a,b,c)=>t&&a*t[0]+b*t[1]===c;
O['hp.nghiem_pt']=([a,b,c],q)=>sat2(pts(q.a),a,b,c)&&q.w.every(w=>!sat2(pts(w),a,b,c));
O['hp.nghiem_he']=([a1,b1,c1,a2,b2,c2],q)=>{const both=t=>sat2(t,a1,b1,c1)&&sat2(t,a2,b2,c2);return both(pts(q.a))&&q.w.every(w=>!both(pts(w)))};
const solve2=(a1,b1,c1,a2,b2,c2,R=40)=>{const r=[];for(let x=-R;x<=R;x++)for(let y=-R;y<=R;y++)if(a1*x+b1*y===c1&&a2*x+b2*y===c2)r.push([x,y]);return r.length==1?r[0]:null};
O['hp.cong']=([a1,k,c1,a2,c2,ask])=>{const r=solve2(a1,k,c1,a2,-k,c2);return r?ng(r[ask?1:0]):false};
O['hp.the']=([a,b,c,d,e])=>{const r=solve2(-a,1,b,c,d,e);return r?ng(r[0]):false};
O['hp.so_nghiem']=([a1,b1,c1,a2,b2,c2])=>{const det=a1*b2-a2*b1;return det!==0?'có một nghiệm duy nhất':(a1*c2-a2*c1===0&&b1*c2-b2*c1===0)?'có vô số nghiệm':'vô nghiệm'};
O['hp.bt_gia']=([p1,q1,T1,p2,q2,T2])=>{const r=solve2(p1,q1,T1,p2,q2,T2,80);return r?String(r[0]):false};
O['hp.hcn']=(p,q)=>{const m=strip(q.q).match(/chu vi (\d+) m, chiều dài hơn chiều rộng (\d+) m/),P2=+m[1]/2,d=+m[2];for(let x=1;x<=P2;x++){const y=P2-x;if(x-y===d)return String(x)}return false};
O['hp.vo_nghiem']=([a2,b2,c2,b1,c1])=>{const r=[];for(let m=-200;m<=200;m++){const det=m*b2-a2*b1;if(det===0&&(m*c2-a2*c1)!==0)r.push(m)}return r.length==1?String(r[0]):false};
O['hp.dk']=([r,d])=>{const s=[];for(let m=-300;m<=300;m++)if(m+d===r*(m-d))s.push(m);return s.length==1?String(s[0]):false};
O['hp.chuyen_dong']=([D,t,v1,v2])=>{for(let x=1;x<=200;x++)for(let y=1;y<=x;y++)if((x+y)*t===D&&x-y===v1-v2)return String(x);return false};
O['hp.so_hai_chu_so']=([a,b])=>{const s=a+b,d=9*(b-a),r=[];for(let n=10;n<=99;n++){const u=n%10,tn=Math.floor(n/10);if(u+tn===s&&(10*u+tn)-n===d)r.push(n)}return r.length==1?String(r[0]):false};
O['hp.nghich_dao']=([x,y])=>{for(let X=1;X<=30;X++)for(let Y=1;Y<=30;Y++)if((X+Y)*(x*y)===(x+y)*(X*Y)&&(Y-X)*(x*y)===(y-x)*(X*Y))return String(X);return false};
O['hp.duong_thang']=([a,b])=>String(a*b);

/* ---------- BẤT PHƯƠNG TRÌNH ---------- */
const hold=(v,op,c)=>op=='<'?v<c:op=='>'?v>c:op=='≤'?v<=c:v>=c,
 ineq=a=>{const m=strip(a).replace(/−/g,'-').match(/^x ([<>≤≥]) (-?\d+)$/);return m?[m[1],+m[2]]:null};
O['bp.nghiem']=([a,b,op,c],q)=>hold(a*(+strip(q.a).replace(/−/g,'-'))+b,op,c)&&q.w.every(w=>!hold(a*(+strip(w).replace(/−/g,'-'))+b,op,c));
O['bp.giai']=([a,b,op,c],q)=>{const i=ineq(q.a);if(!i)return false;for(let x=-80;x<=80;x++)if(hold(a*x+b,op,c)!==hold(x,i[0],i[1]))return false;return true};
O['bp.tinh_chat']=([r,k],q)=>{const m=strip(q.a).replace(/−/g,'-').replace(/\s/g,'');const mm=m.match(/^(.+?)([<>])(.+)$/);if(!mm)return false;const ev=s=>parse(s.replace(/a/g,'x').replace(/b/g,'y'));const L=ev(mm[1]),Rr=ev(mm[3]);const pairs=r=='<'?[[1,2],[-3,4],[-7,-2],[0.5,5]]:[[2,1],[4,-3],[-2,-7],[5,0.5]];return pairs.every(([a,b])=>hold(L(a,b),mm[2],Rr(a,b)))};
O['bp.truc_so']=([a,dir,cl])=>`x ${dir=='>'?(cl?'≥':'>'):(cl?'≤':'<')} ${ng(a)}`;
O['bp.nghiem_nguyen']=([a,b,op,c])=>{let n=0;for(let x=1;x<=500;x++)if(hold(a*x+b,op,c))n++;return String(n)};
O['bp.nhieu_buoc']=([a,b,p,q,op],q2)=>{const i=ineq(q2.a);if(!i)return false;for(let x=-80;x<=80;x++)if(hold(a*(x+p),op,b*x+q)!==hold(x,i[0],i[1]))return false;return true};
O['bp.thuc_te']=([P0,v,c])=>{let n=0;while(c*(n+1)<=P0-v)n++;return String(n)};
const DICH={'lớn hơn':'>','nhỏ hơn':'<','không vượt quá':'≤','ít nhất bằng':'≥','không nhỏ hơn':'≥','tối đa bằng':'≤','không lớn hơn':'≤'};
O['bp.dich']=([ph,sy,n])=>`x ${DICH[ph]} ${ng(n)}`;
O['bp.nguyen_nn']=([m,n,p,q])=>{const num=m*q-n*p,den=n-m;return String(den>0?Math.ceil(num/den):Math.floor(num/den))};
O['bp.cuoc']=([fA,fB,gA,gB])=>{const t=(fA-fB)/(gB-gA);return String(Number.isInteger(t)?t+1:Math.ceil(t))};
O['bp.tbc']=([T,a,b])=>String(3*T-a-b);
O['bp.he_hai']=([a,b,c,d,e,f])=>{let n=0;for(let x=-150;x<=150;x++)if(a*x+b>c&&d*x+e<=f)n++;return String(n)};
O['bp.tham_so']=([x0,p,c])=>{const num=c-p*x0;return String(Math.ceil(num/x0)-1)};

/* ---------- HÌNH HỌC LỚP 9 ---------- */
const rad=d=>d*Math.PI/180,rnd=v=>Math.round(v*1e6)/1e6,cmv=v=>fd2(rnd(v))+' cm',dg=v=>ng(rnd(v))+'°',
 trig=(f,a)=>f=='sin'?Math.sin(rad(a)):f=='cos'?Math.cos(rad(a)):f=='tan'?Math.tan(rad(a)):1/Math.tan(rad(a));
O['ht.tsln']=([u,v,c,ang,fn])=>{if(u*u+v*v!==c*c)return false;const opp=ang=='B'?v:u,adj=ang=='B'?u:v;return fn=='sin'?frs(opp,c):fn=='cos'?frs(adj,c):fn=='tan'?frs(opp,adj):frs(adj,opp)};
O['ht.ab2']=([BH,BC])=>{for(let x=1;x<=200;x++)if(x*x===BH*BC)return x+' cm';return false};
O['ht.ah2']=([BH,CH])=>{for(let x=1;x<=200;x++)if(x*x===BH*CH)return x+' cm';return false};
O['ht.ah_tich']=([AB,AC])=>cmv(AB*AC/Math.sqrt(AB*AB+AC*AC));
O['ht.goc_dac_biet']=([fn,ang],q)=>close(rv(q.a),trig(fn,ang));
O['ht.goc_phu']=([a])=>dg(90-a);
O['ht.giai']=([BC,b60])=>cmv(b60?BC*Math.cos(rad(60)):BC*Math.sin(rad(30)));
O['ht.thuc_te']=([t,d])=>fd2(rnd(t==0?d*Math.tan(rad(45)):t==1?2*d*Math.sin(rad(30)):2*d*Math.cos(rad(60))))+' m';
O['ht.so_sanh']=(p,q)=>{const ev=s=>{const m=strip(s).match(/(sin|cos|tan) (\d+)° ([<>]) (sin|cos|tan) (\d+)°/);const L=trig(m[1],+m[2]),Rr=trig(m[4],+m[5]);return m[3]=='<'?L<Rr:L>Rr};return ev(q.a)&&q.w.every(w=>!ev(w))};
O['ht.nghich_dao']=([x,AH])=>String(Math.round(1/Math.sqrt(1/(AH*AH)-1/(x*x))));
O['ht.dien_tich']=([BH,CH,k])=>{const BC=BH+CH,AH=Math.sqrt(BH*CH),AB=Math.sqrt(BH*BC),AC=Math.sqrt(CH*BC);return String(rnd(k?BC+AB+AC:BC*AH/2))};
O['ht.cos_sin']=([u,v,c,t])=>{if(t==0){return Math.abs(Math.sqrt(1-(u/c)**2)-v/c)<1e-9?frs(v,c):false}if(t==1){return Math.abs(u/Math.sqrt(u*u+v*v)-u/c)<1e-9?frs(u,c):false}return Math.abs(Math.sqrt(1-(v/c)**2)/(v/c)-u/v)<1e-9?frs(u,v):false};
O['ht.tong_sin']=([n],q)=>{const ts=[...strip(q.q).matchAll(/(sin|cos)\^2 (\d+)°/g)];let s=0;ts.forEach(m=>{s+=trig(m[1],+m[2])**2});return String(Math.round(s))};
O['ht.canh_tu_goc']=([c,t])=>String(Math.round(t?c/Math.cos(rad(60)):c/Math.sin(rad(30))));
O['ht.tinh_goc']=([m,t])=>String(Math.round(t==0?Math.asin(m/(2*m))*180/Math.PI:t==1?Math.atan(1)*180/Math.PI:Math.acos(m/(2*m))*180/Math.PI));
const cmp=(d,r)=>d<r?'<':d==r?'=':'>';
O['dt.day_lon']=([r])=>cmv(2*r);
O['dt.diem']=([r,d])=>d<r?'nằm trong đường tròn':d==r?'nằm trên đường tròn':'nằm ngoài đường tròn';
O['dt.dt_dtron']=([r,d])=>d<r?'cắt đường tròn tại hai điểm':d==r?'tiếp xúc với đường tròn':'không có điểm chung với đường tròn';
O['dt.hai_dtron']=([Rr,r,d])=>d>Rr+r?'ngoài nhau':d==Rr+r?'tiếp xúc ngoài':d>Rr-r&&d<Rr+r?'cắt nhau':d==Rr-r?'tiếp xúc trong':'đựng nhau';
O['dt.tt_vuong']=([R0,MA,OM])=>cmv(Math.sqrt(OM*OM-R0*R0));
O['dt.hai_tt']=([t,a,al])=>t==0?cmv(a):dg(al/2);
O['dt.day_khoang_cach']=([d,h,Rr])=>cmv(2*Math.sqrt(Rr*Rr-d*d));
const TRUEDT=['Đường kính vuông góc với một dây thì đi qua trung điểm của dây đó','Tiếp tuyến của đường tròn vuông góc với bán kính tại tiếp điểm','Trong các dây của đường tròn, đường kính là dây lớn nhất','Hai tiếp tuyến cắt nhau tại một điểm thì điểm đó cách đều hai tiếp điểm'];
O['dt.tinh_chat']=(p,q)=>TRUEDT.includes(strip(q.a))&&q.w.every(w=>!TRUEDT.includes(strip(w)));
O['dt.chu_vi_MAOB']=([R0,MA,OM])=>String(2*(R0+Math.sqrt(OM*OM-R0*R0)));
O['dt.day_chung']=([h,x,y,Rr,r])=>{const d=x+y,xx=(Rr*Rr-r*r+d*d)/(2*d);return String(rnd(2*Math.sqrt(Rr*Rr-xx*xx)))};
O['dt.goc_tt']=([al])=>String(180-al);
O['dt.so_tt']=([r,d])=>String(d<r?0:d==r?1:2);
O['dt.tx_ban_kinh']=(p,q)=>{const m=strip(q.q).match(/\(O; (\d+) cm\)[^]*?OO′ = (\d+) cm/),Rr=+m[1],d=+m[2],ext=/tiếp xúc ngoài/.test(q.q);return String(ext?d-Rr:Rr-d)};
O['gd.tam']=([a,t])=>dg(t?360-a:a);
O['gd.noi_tiep']=([t,a])=>dg(t==0?a/2:a);
O['gd.nua_dt']=([t,a])=>dg(t?90:90-a);
O['gd.tt_day']=([t,a])=>dg(t==0?a/2:a);
O['gd.dinh_trong']=([a,b])=>dg((a+b)/2);
O['gd.dinh_ngoai']=([a,b])=>dg((a-b)/2);
O['gd.tu_giac']=([a])=>dg(180-a);
O['gd.nhan_biet']=(p,q)=>['Hình chữ nhật','Hình vuông','Hình thang cân'].includes(strip(q.a))&&q.w.every(w=>!['Hình chữ nhật','Hình vuông','Hình thang cân'].includes(strip(w)));
O['gd.tam_giac_vuong']=([c])=>cmv(c/2);
O['gd.OBC']=([a])=>String(90-a);
O['gd.day_R']=([s,v])=>{const k=s=='R'?1:s=='R√2'?Math.SQRT2:Math.sqrt(3);return String(Math.round(2*Math.asin(k/2)*180/Math.PI))};
O['gd.tim_x']=([p,q,r,s])=>{const o=[];for(let x=1;x<=60;x++)if((p*x+q)+(r*x+s)===180)o.push(x);return o.length==1?String(o[0]):false};
O['gd.cung_ti_le']=([m,n,k,t])=>{const u=360/(m+n+k);return String(t?k*u/2:m*u)};
O['gd.r_noi_tiep']=([a,b,c])=>{const cc=Math.sqrt(a*a+b*b);return String(rnd((a*b/2)/((a+b+cc)/2)))};
O['gd.goc_ngoai']=([b])=>String(180-(180-b));
O['gd.ngoai2']=([g,m])=>String(2*g+m);
O['kg.tru_sxq']=([r,h])=>`${2*r*h}π cm²`;
O['kg.tru_v']=([r,h])=>`${r*r*h}π cm³`;
O['kg.non_sxq']=([r,l])=>`${r*l}π cm²`;
O['kg.non_v']=([r,h])=>`${r*r*h/3}π cm³`;
O['kg.cau_s']=([R0])=>`${4*R0*R0}π cm²`;
O['kg.cau_v']=([R0])=>`${frs(4*R0**3,3)}π cm³`;
O['kg.duong_sinh']=([r,h])=>cmv(Math.sqrt(r*r+h*h));
O['kg.quay']=([t,a,b])=>t==0?`${a*a*b}π cm³`:`${a*a*b/3}π cm³`;
O['kg.stp']=([t,r,x])=>t==0?`${2*r*(r+x)}π cm²`:`${r*(x+r)}π cm²`;
O['kg.tim_h']=([r,h])=>String(h);
O['kg.ti_le']=([t,x])=>String(t?x:3*x);
O['kg.k_lan']=([k,t])=>String(t?k**3:k*k);
O['kg.nuoc_dang']=([R0,r])=>String(rnd(4*R0**3/(3*r*r)));
O['kg.noi_tiep']=([R0])=>String(rnd(2*R0**3-4*R0**3/3));
O['kg.thuc_te']=([r,l])=>String(r*l);

/* ---------- THỐNG KÊ & XÁC SUẤT LỚP 9 ---------- */
const sum=a=>a.reduce((x,y)=>x+y,0),pct=v=>fd2(v)+'%',isP9=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d==0)return false;return true},
 pairsOf=(a,b)=>{const balls=[...Array(a).fill('Đ'),...Array(b).fill('X')],r=[];for(let i=0;i<balls.length;i++)for(let j=i+1;j<balls.length;j++)r.push([balls[i],balls[j]]);return r};
O['tk9.tan_so']=([L,t])=>String(L.filter(x=>x==t).length);
O['tk9.tstd']=([n,N])=>pct(n*100/N);
O['tk9.tong_tan_so']=([f])=>String(sum(f));
O['tk9.xep_nhom']=([x])=>{for(let a=100;a<=300;a+=10)if(a<=x&&x<a+10)return `[${a}; ${a+10})`;return false};
O['tk9.nhom_max']=([L,f])=>L[f.indexOf(Math.max(...f))];
O['tk9.tstd_nhom']=([n,N])=>pct(n*100/N);
O['tk9.hist_doc']=([L,pcs,k,i])=>k==0?L[pcs.indexOf(Math.max(...pcs))]:pct(pcs[i]);
O['tk9.tong_100']=([k])=>pct(100-sum(k));
O['tk9.tu_tstd']=([N,f])=>String(N*f/100);
O['tk9.cong_don']=([f,k])=>String(k?f[2]+f[3]:f[0]+f[1]);
O['tk9.thieu']=([N,f])=>String(N-sum(f));
O['tk9.hist_tong']=([N,pcs,i])=>String(N*pcs[i]/100);
O['tk9.tstd_cong']=([pcs,i])=>String(pcs[i]+pcs[i+1]);
O['xs9.kg_mau']=([k,a,b])=>String([36,a*b,a*b,8,216][k]);
O['xs9.tong2xx']=([s])=>{let c=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(a+b==s)c++;return frs(c,36)};
O['xs9.chon2']=([n])=>{let c=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)c++;return String(c)};
O['xs9.2bi']=([a,b])=>{const ps=pairsOf(a,b);return frs(ps.filter(p=>p[0]=='Đ'&&p[1]=='Đ').length,ps.length)};
O['xs9.the']=([n])=>{let c=0;for(let x=1;x<=n;x++)if(x%3==0||x%5==0)c++;return frs(c,n)};
O['xs9.doi']=([k])=>{let c=0;for(let m=0;m<2**k;m++)if(m>0)c++;return frs(c,2**k)};
O['xs9.xep']=([n,t])=>{if(t==1)return frs(1,n);let c=1;for(let i=2;i<=n;i++)c*=i;return String(c)};
O['xs9.lap_so']=([k])=>{let c=0;if(k==0){for(let a=1;a<=5;a++)for(let b=1;b<=5;b++)if(a!=b)c++}else if(k==1){for(let a=1;a<=4;a++)for(let b=0;b<=4;b++)if(a!=b)c++}else{for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let d=1;d<=6;d++)if(a!=b&&b!=d&&a!=d)c++}return String(c)};
O['xs9.do_xanh']=([a,b])=>{const ps=pairsOf(a,b);return frs(ps.filter(p=>p[0]!=p[1]).length,ps.length)};
O['xs9.cung_gioi']=([a,b])=>{const ps=pairsOf(a,b);return frs(ps.filter(p=>p[0]==p[1]).length,ps.length)};
O['xs9.hai_xx2']=([e])=>{const F=[([a,b])=>isP9(a+b),([a,b])=>(a*b)%2==0,([a,b])=>a!=b,([a,b])=>(a+b)%3==0,([a,b])=>a+b>8][e];let c=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(F([a,b]))c++;return frs(c,36)};
O['xs9.ba_xx']=([e])=>{const F=[([a,b,c])=>a==b&&b==c,([a,b,c])=>a+b+c==10,([a,b,c])=>a+b+c==5,([a,b,c])=>new Set([a,b,c]).size==2][e];let c=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)for(let d=1;d<=6;d++)if(F([a,b,d]))c++;return frs(c,216)};
O['xs9.so3']=([t])=>{const ds=[0,1,2,3,4],nums=[];for(const a of ds)for(const b of ds)for(const c of ds)if(a!=0&&a!=b&&b!=c&&a!=c)nums.push([a,b,c]);return t==0?String(nums.length):frs(nums.filter(n=>n[2]%2==0).length,nums.length)};
O['xs9.hoan_lai']=([a,b,t])=>{const balls=[...Array(a).fill('Đ'),...Array(b).fill('X')];let c=0,tot=0;for(const x of balls)for(const y of balls){tot++;if(t?x!=y:(x=='Đ'&&y=='Đ'))c++}return frs(c,tot)};
return O};
