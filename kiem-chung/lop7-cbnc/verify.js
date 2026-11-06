/* Kiểm chứng các dạng câu lớp 7 bổ sung từ "Cơ bản và nâng cao Toán 7 tập 1 – Đại số" (cbnc-sht.js, cbnc-sth.js, cbnc-tlt.js).
   Dùng:  node kiem-chung/lop7-cbnc/verify.js 500            (500 lần mỗi dạng)
          node kiem-chung/lop7-cbnc/verify.js 500 sth. tlt.   (chỉ các mã bắt đầu bằng sth. hoặc tlt.)
   Mỗi câu được kiểm:
   1) cấu trúc: đủ 4 đáp án khác nhau, ≥ 2 bước giải, không NaN/undefined, không còn dấu "-" thường trước số âm;
   2) ĐÁP ÁN: oracle độc lập tự đọc lại ĐỀ BÀI HIỂN THỊ (không dùng tham số của bộ sinh), tính lại bằng cách khác
      (vét cạn, BigInt, chia dài, giải hệ…) rồi chấm TỪNG đáp án: đáp án đúng phải đúng, 3 đáp án nhiễu phải sai;
   3) không có hai đáp án cùng giá trị (ví dụ 1/2 và 2/4);
   4) hiển thị: thẻ HTML đóng mở đủ, không sót ^, không số thập phân dùng dấu chấm, không "+ −", "1x", …  */
const fs=require('fs'),path=require('path'),load=require('../lop8-9/load.js');
const root=path.join(__dirname,'..','..'),c=load(root),H=c.H,N=+process.argv[2]||300,only=process.argv.slice(3);

/* ---------- phân số chính xác (số nguyên nhỏ) ---------- */
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),fr=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return[n/g,d/g]},
 add=(a,b)=>fr(a[0]*b[1]+b[0]*a[1],a[1]*b[1]),sub=(a,b)=>fr(a[0]*b[1]-b[0]*a[1],a[1]*b[1]),mul=(a,b)=>fr(a[0]*b[0],a[1]*b[1]),
 eq=(a,b)=>a&&b&&a[0]==b[0]&&a[1]==b[1],lt=(a,b)=>a[0]*b[1]<b[0]*a[1],ab=a=>[Math.abs(a[0]),a[1]];
function pn(s){s=String(s).trim().replace(/−/g,'-').replace(/^\((.*)\)$/,'$1').replace(/,/g,'.');
 let m=s.match(/^(-?\d+)\/(\d+)$/);if(m)return fr(+m[1],+m[2]);
 m=s.match(/^(-?)(\d+)(?:\.(\d+))?$/);if(m){const dd=m[3]||'';return fr((m[1]?-1:1)*(+(m[2]+dd)),10**dd.length)}return null}
const I=s=>pn(s)&&pn(s)[1]==1?pn(s)[0]:NaN;
/* đề bài dạng văn bản: phân số fh → {tử}/{mẫu}, <sup> → ^, bỏ thẻ, − → - */
const plain=s=>String(s).replace(/<span class="fr"><b>([^<]*)<\/b><b>([^<]*)<\/b><\/span>/g,'{$1}/{$2}').replace(/<sup>([^<]*)<\/sup>/g,'^$1').replace(/<br>/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,'').replace(/−/g,'-');
const tokens=s=>(s.match(/-?\d+(?:\/\d+)?/g)||[]).map(pn);

/* ---------- giải hình vuông kì diệu bằng khử Gauss từ hình SVG ---------- */
function magic(f){
 const cells={};let tgt=-1;const re=/<text x="(\d+)" y="(\d+)"[^>]*>([^<]*)<\/text>/g;let m;
 while((m=re.exec(f))){const col=Math.floor((+m[1]-48)/48),row=Math.floor((+m[2]-6)/48),i=row*3+col;if(m[3]=='x')tgt=i;else cells[i]=pn(m[3])}
 const rows=[],L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
 L.forEach(l=>{const r=Array(11).fill(0).map(()=>[0,1]);l.forEach(i=>r[i]=[1,1]);r[9]=[-1,1];rows.push(r)});
 Object.keys(cells).forEach(i=>{const r=Array(11).fill(0).map(()=>[0,1]);r[i]=[1,1];r[10]=cells[i];rows.push(r)});
 let piv=0;const pc=[];
 for(let col=0;col<10&&piv<rows.length;col++){let p=-1;for(let r=piv;r<rows.length;r++)if(rows[r][col][0]!=0){p=r;break}if(p<0)continue;
  [rows[piv],rows[p]]=[rows[p],rows[piv]];const d=rows[piv][col];rows[piv]=rows[piv].map(x=>fr(x[0]*d[1],x[1]*d[0]));
  for(let r=0;r<rows.length;r++)if(r!=piv&&rows[r][col][0]!=0){const k=rows[r][col];rows[r]=rows[r].map((x,j)=>sub(x,mul(k,rows[piv][j])))}
  pc.push(col);piv++}
 for(let r=piv;r<rows.length;r++)if(rows[r][10][0]!=0)return{bad:'hệ mâu thuẫn'};
 const ri=pc.indexOf(tgt);if(ri<0)return{bad:'ô x không xác định được'};
 for(let j=0;j<10;j++)if(j!=tgt&&rows[ri][j][0]!=0)return{bad:'ô x phụ thuộc ẩn khác (chưa đủ dữ kiện)'};
 return{val:rows[ri][10],cells,tgt}}

/* ---------- chia dài ---------- */
const digits=(n,d,len)=>{let r=((n%d)+d)%d,s='';for(let i=0;i<len;i++){r*=10;s+=Math.floor(r/d);r%=d}return s};
const terminates=(n,d)=>{let r=n%d;const seen=new Set();while(r&&!seen.has(r)){seen.add(r);r=(r*10)%d}return r==0};
const floorQ=f=>Math.floor(f[0]/f[1]);
const POS={'hàng đơn vị':0,'hàng phần mười':1,'hàng phần trăm':2,'hàng phần nghìn':3,'hàng chục':-1,'hàng trăm':-2,'hàng nghìn':-3};
const roundQ=(v,k)=>{const s=k>=0?mul(v,[10**k,1]):mul(v,[1,10**-k]);const r=Math.floor((2*s[0]+s[1])/(2*s[1]));return k>=0?fr(r,10**k):fr(r*10**-k,1)};

/* ---------- oracle: (đề dạng văn bản, đáp án cần chấm, câu hỏi) → true nếu đáp án ĐÚNG ---------- */
const O={};
O['sht.nam_giua']=(st,o)=>{const m=st.match(/giữa (\S+) và (\S+)\?/),A=pn(m[1]),B=pn(m[2]),X=pn(o);return lt(A,X)&&lt(X,B)};
O['sht.cong_ba_so']=(st,o)=>{const m=st.match(/Tính: (\S+) \+ (\S+) - (\S+)$/);return eq(sub(add(pn(m[1]),pn(m[2])),pn(m[3])),pn(o))};
O['sht.hop_ly']=(st,o)=>{const m=st.match(/lý: (\S+) × (\S+) \+ (\S+) × (\S+)$/);return eq(add(mul(pn(m[1]),pn(m[2])),mul(pn(m[3]),pn(m[4]))),pn(o))};
O['sht.tim_so_mu']=(st,o)=>{const m=st.match(/biết: (\d+)\^n · (\d+)\^(\d+) = (\d+)\^(\d+)/),n=BigInt(I(o));return BigInt(m[1])**n*BigInt(m[2])**BigInt(m[3])==BigInt(m[4])**BigInt(m[5])};
O['sht.timx_hai_buoc']=(st,o)=>{const m=st.match(/\(x ([+-]) (\S+)\) × (\S+) = (\S+)$/),a=pn(m[2]),X=pn(o);return eq(mul(m[1]=='+'?add(X,a):sub(X,a),pn(m[3])),pn(m[4]))};
O['sht.abs_tinh']=(st,o)=>{const m=st.match(/\|(\S+?)\| ([+-]) \|(\S+?)\| ([+-]) \|(\S+?)\|$/),t=(s,x)=>s=='+'?x:[-x[0],x[1]];
 return eq(add(add(ab(pn(m[1])),t(m[2],ab(pn(m[3])))),t(m[4],ab(pn(m[5])))),pn(o))};
O['sht.so_nguyen_giua']=(st,o)=>{const m=st.match(/thỏa mãn (\S+) < x < (\S+)\?/),A=pn(m[1]),B=pn(m[2]);let n=0;for(let x=-300;x<=300;x++)if(lt(A,[x,1])&&lt([x,1],B))n++;return n==I(o)};
O['sht.tien_con_lai']=(st,o)=>{const m=st.match(/tiêu (\d+)\/(\d+) số tiền đó.*tiêu (\d+)\/(\d+) số tiền còn lại thì còn (\d+) nghìn/),M=I(o);if(!(M>0))return false;
 const r1=sub([M,1],mul([M,1],[+m[1],+m[2]])),r2=sub(r1,mul(r1,[+m[3],+m[4]]));return eq(r2,[+m[5],1])};
const magicO=(st,o,q)=>{const r=magic(q.f);if(r.bad)throw new Error(r.bad);
 if(/3 × 3/.test(q.q)){const fig=new Set(Object.values(r.cells).map(v=>v[0]));const rest=q.q.replace(/^.*\(xem hình\)\. /,'');
  for(const t of (plain(rest).match(/-?\d+/g)||[]))if(!fig.has(+t))throw new Error('số '+t+' trong đề không có trong hình')}
 return eq(r.val,pn(o))};
O['sht.vuong_ki_dieu']=magicO;O['sht.vuong_ki_dieu_nc']=magicO;
const poly=s=>{s=s.replace(/ /g,'');const t=s.match(/[+-]?[^+-]+/g),r=[0,0,0];t.forEach(z=>{const sg=z[0]=='-'?-1:1;z=z.replace(/^[+-]/,'');
 if(/x\^2$/.test(z))r[2]+=sg*(z=='x^2'?1:+z.replace('x^2',''));else if(/x$/.test(z))r[1]+=sg*(z=='x'?1:+z.replace('x',''));else r[0]+=sg*+z});return r};
O['sht.thay_so']=(st,o)=>{const m=st.match(/Cho x = (\S+)\. Tính giá trị của biểu thức A = (.*)\.$/),x=pn(m[1]),p=poly(m[2]);
 return eq(add(add(mul([p[2],1],mul(x,x)),mul([p[1],1],x)),[p[0],1]),pn(o))};
O['sht.phan_bu']=(st,o)=>{const L=(st.match(/\d+\/\d+/g)||[]).slice().sort(),P=o.split(' < ').map(pn),S2=o.split(' < ').sort();if(JSON.stringify(L)!=JSON.stringify(S2))return false;return lt(P[0],P[1])&&lt(P[1],P[2])};
const linf=s=>{s=s.replace(/−/g,'-').replace(/ /g,'');let m=s.match(/^(-?\d*)x(?:([+-]\d+))?$/);if(m)return x=>(m[1]==''?1:m[1]=='-'?-1:+m[1])*x+(m[2]?+m[2]:0);m=s.match(/^-?\d+$/);return()=>+s};
O['sht.rutgon_abs']=(st,o)=>{const m=st.match(/Với (.*?), rút gọn biểu thức A = \|x(?: ([+-]) (\d+))?\| \+ \|x(?: ([+-]) (\d+))?\|/),a=!m[2]?0:m[2]=='-'?+m[3]:-m[3],b=!m[4]?0:m[4]=='-'?+m[5]:-m[5],f=x=>Math.abs(x-a)+Math.abs(x-b);let xs;
 if(/^(\S+) < x < (\S+)$/.test(m[1])){const[p,q]=m[1].split(' < x < ').map(Number);xs=[1,2,3].map(i=>p+(q-p)*i/4)}else if(/^x ≥/.test(m[1])){const p=+m[1].replace('x ≥ ','');xs=[p,p+1,p+7.5]}else{const p=+m[1].replace('x < ','');xs=[p-1,p-5.5,p-9]}
 const g=linf(o);return xs.every(x=>Math.abs(g(x)-f(x))<1e-9)};
O['sht.gtln_abs']=(st,o)=>{const m=st.match(/M = (.*?)(?: là:| đạt)/),ex=m[1].replace(/\|([^|]+)\|/g,'Math.abs($1)'),f=new Function('x','return '+ex),mx=/lớn/.test(st),byx=/khi x bằng/.test(st);
 let best=null,arg=[];for(let x=-60;x<=60;x++){const v=f(x);if(best===null||(mx?v>best:v<best)){best=v;arg=[x]}else if(v==best)arg.push(x)}
 if(byx){if(arg.length!=1)throw new Error('không duy nhất');return I(o)==arg[0]}return I(o)==best};
O['sht.abs_bang_abs']=(st,o)=>{const m=st.match(/\|x(?: ([+-]) (\d+))?\| = \|x(?: ([+-]) (\d+))?\|/),p=!m[1]?0:m[1]=='-'?+m[2]:-m[2],q=!m[3]?0:m[3]=='-'?+m[4]:-m[4],X=pn(o);return eq(ab(sub(X,[p,1])),ab(sub(X,[q,1])))};
O['sht.so_sanh_luy_thua']=(st,o)=>{const L=st.match(/các số: (.*) là:/)[1].split('; ').map(s=>{const[b,e]=s.split('^');return BigInt(b)**BigInt(e)}),[b,e]=o.split('^'),v=BigInt(b)**BigInt(e);return L.every(x=>v>=x)&&L.filter(x=>x==v).length==1};
O['sht.tong_cap_nhan']=(st,o)=>{const d=[...st.matchAll(/\{1\}\/\{([^}]+)\}/g)].map(z=>z[1]),r=+d[0],n=+d[d.length-1].split('^')[1];let s=[0,1];for(let i=1;i<=n;i++)s=add(s,[1,r**i]);return eq(s,pn(o))};
O['sht.tong_so_nguyen']=(st,o)=>{const m=st.match(/thỏa mãn (\S+) < x ≤ (\S+)\./),A=pn(m[1]),B=pn(m[2]);let s=0;for(let x=-300;x<=300;x++)if(lt(A,[x,1])&&!lt(B,[x,1]))s+=x;return s==I(o)};

O['sth.huu_han']=(st,o)=>{const f=pn(o);return terminates(f[0],f[1])};
O['sth.tuan_hoan_phan_so']=(st,o)=>{const m=st.match(/(0,\d*\(\d+\))/)[1].match(/^0,(\d*)\((\d+)\)$/),want=(m[1]+m[2].repeat(60)).slice(0,40),f=pn(o);return f[0]>=0&&f[0]<f[1]&&digits(f[0],f[1],40)==want};
const roundO=(st,o,v)=>{const nm=st.match(/đến (.*?), ta được/)[1];return eq(roundQ(v,POS[nm]),pn(o))};
O['sth.lam_tron']=(st,o)=>roundO(st,o,pn(st.match(/Làm tròn số (\S+) đến/)[1]));
O['sth.lam_tron_thuong']=(st,o)=>{const m=st.match(/phép tính (\d+) : (\d+) đến/);return roundO(st,o,fr(+m[1],+m[2]))};
O['sth.lam_tron_can']=(st,o)=>{const n=+st.match(/√(\d+) đến/)[1],k=POS[st.match(/đến (.*?), ta được/)[1]],x=Math.sqrt(n)*10**k;if(Math.abs(x%1-.5)<1e-6)throw new Error('gần hòa');return eq(fr(Math.round(x),10**k),pn(o))};
O['sth.can_phan_so']=(st,o)=>{let rad;const m=st.match(/√\((\d+)\/(\d+)\)/);rad=m?fr(+m[1],+m[2]):pn(st.match(/√(\d+,\d+)/)[1]);const X=pn(o);return X[0]>0&&eq(mul(X,X),rad)};
O['sth.tim_x_binh_phuong']=(st,o)=>{let roots;const a=st.match(/\(x ([+-]) (\d+)\)\^2 = (\d+)/);
 if(a){const A=a[1]=='-'?+a[2]:-a[2],k=Math.sqrt(+a[3]);if(!Number.isInteger(k))throw new Error('không chính phương');roots=[A+k,A-k].map(v=>[v,1])}
 else{const m=st.match(/x\^2 = (\d+)\/(\d+)/),p=Math.sqrt(+m[1]),q=Math.sqrt(+m[2]);if(!Number.isInteger(p)||!Number.isInteger(q))throw new Error('không chính phương');roots=[fr(p,q),fr(-p,q)]}
 const got=[...o.matchAll(/x = (\S+)/g)].map(z=>pn(z[1]));return got.length==2&&roots.every(r=>got.some(g=>eq(g,r)))&&!eq(got[0],got[1])};
O['sth.so_vo_ti']=(st,o)=>{const L=st.match(/số vô tỉ: (.*)\?/)[1].split('; ');let k=0;for(const s of L){const m=s.match(/^-?√(\d+)$/);if(m){if(!Number.isInteger(Math.sqrt(+m[1])))k++}else if(s=='π')k++;else if(!(pn(s)||/^0,\(\d+\)$/.test(s)))throw new Error('mục lạ '+s)}return k==I(o)};
O['sth.abs_can']=(st,o)=>{const m=st.match(/\|√(\d+) - (\d+)\|/),t=Math.abs(Math.sqrt(+m[1])-+m[2]),v=new Function('return '+o.replace(/−/g,'-').replace(/√(\d+)/g,'Math.sqrt($1)'))();return Math.abs(v-t)<1e-9};
O['sth.phan_nguyen']=(st,o)=>{const xs=st.match(/khi x = (.*)\.$/)[1];let f;if(xs[0]=='√')f=Math.floor(Math.sqrt(+xs.slice(1)));else f=floorQ(pn(xs));return f==I(o)};
O['sth.hinh_vuong_chu_vi']=(st,o)=>{let m=st.match(/diện tích (\d+) m²/);if(m)return 4*Math.sqrt(+m[1])==I(o);m=st.match(/chu vi (\d+) m/);return(+m[1]/4)**2==I(o)};
O['sth.chu_so_thu_n']=(st,o)=>{const m=st.match(/Viết (\d+)\/(\d+) .* thứ (\d+) /);return Number((10n**BigInt(m[3])*BigInt(m[1])/BigInt(m[2]))%10n)==I(o)};
O['sth.tong_phan_nguyen_x']=(st,o)=>{const m=st.match(/\[\{x\}\/\{(\d+)\}\] = (-?\d+)/);let s=0;for(let x=-500;x<=500;x++)if(Math.floor(x/+m[1])==+m[2])s+=x;return s==I(o)};
O['sth.tong_phan_nguyen_can']=(st,o)=>{const n=+st.match(/\[√(\d+)\], trong/)[1];let s=0;for(let i=1;i<=n;i++)s+=Math.floor(Math.sqrt(i));return s==I(o)};
O['sth.dem_nguyen_giua']=(st,o)=>{const m=st.match(/-√(\d+) < x < √(\d+)/),a=+m[1],b=+m[2];let n=0;for(let x=-30;x<=30;x++)if(x==0||(x<0&&x*x<a)||(x>0&&x*x<b))n++;return n==I(o)};
O['sth.tuan_hoan_phep_tinh']=(st,o)=>{const ex=st.match(/Tính: (.*?) \(kết quả/)[1],D=60n,T=10n**D,dec=s=>BigInt((s.repeat(70)).slice(0,60));let v;
 const m=ex.match(/^0,\((\d+)\) ([+×]) (.+)$/);const a=dec(m[1]);if(m[2]=='+'){const mm=m[3].match(/^0,\((\d+)\)$/);v=a+dec(mm[1])}else v=a*BigInt(m[3]);
 const f=pn(o),w=BigInt(f[0])*T/BigInt(f[1]);return(v>w?v-w:w-v)<=200n};

O['tlt.timx_phuc']=(st,o)=>{const m=st.match(/biết: \{(.*?)\}\/\{(.*?)\} = \{(.*?)\}\/\{(.*?)\}$/),x=I(o),e=s=>new Function('x','return '+s)(x),[n1,d1,n2,d2]=[1,2,3,4].map(i=>e(m[i]));return d1!=0&&d2!=0&&n1*d2==n2*d1};
O['tlt.lap_ti_le_thuc']=(st,o)=>{const m=o.match(/^(\d+)\/(\d+) = (\d+)\/(\d+)$/);return m[1]*m[4]!=m[2]*m[3]};
O['tlt.hai_bien_he_so']=(st,o)=>{const m=st.match(/Biết (\d+)x = (\d+)y và x ([+-]) y = (-?\d+)\. Giá trị của (\w) là:/);let r=[];
 for(let x=-400;x<=400;x++)for(let y=-400;y<=400;y++)if(m[1]*x==m[2]*y&&(m[3]=='+'?x+y:x-y)==+m[4])r.push(m[5]=='x'?x:y);return r.length==1&&r[0]==I(o)};
O['tlt.chia_lai']=(st,o)=>{const m=st.match(/^(\S+), (\S+) và (\S+) góp vốn kinh doanh lần lượt (\d+); (\d+); (\d+) triệu đồng\. Tiền lãi (\d+) triệu.*Hỏi (\S+) nhận/),i=[m[1],m[2],m[3]].indexOf(m[8]),cap=+m[4+i],tot=+m[4]+ +m[5]+ +m[6],sh=+m[7]*cap/tot;return Number.isInteger(sh)&&sh==I(o)};
O['tlt.hcn_chu_vi']=(st,o)=>{const m=st.match(/tỉ lệ với (\d+) và (\d+), chu vi bằng (\d+) cm/);const r=[];for(let x=1;x<=400;x++)for(let y=1;y<=400;y++)if(x*m[2]==y*m[1]&&2*(x+y)==+m[3])r.push(x*y);return r.length==1&&r[0]==I(o)};
O['tlt.cdong_van_toc']=(st,o)=>{let m=st.match(/vận tốc (\d+) km\/h thì mất (\d+) giờ\. Nếu ô tô đi với vận tốc (\d+) km\/h/);if(m){const t=m[1]*m[2]/m[3];return Number.isInteger(t)&&t==I(o)}
 m=st.match(/vận tốc (\d+) km\/h thì mất (\d+) giờ\. Để đến B sớm hơn (\d+) giờ/);const v=m[1]*m[2]/(m[2]-m[3]);return Number.isInteger(v)&&v==I(o)};
O['tlt.tl_thuan_am']=(st,o)=>{const m=st.match(/Khi x = (-?\d+) thì y = (-?\d+)\. Khi x = (-?\d+) thì y/),y=m[2]*m[3]/m[1];return Number.isInteger(y)&&y==I(o)};
O['tlt.dua_ve_nguyen']=(st,o)=>{const m=st.match(/Đưa tỉ số (\S+) : (\S+) về/),r=fr(...div2(pn(m[1]),pn(m[2]))),q=o.match(/^(\d+) : (\d+)$/);return +q[1]==r[0]&&+q[2]==r[1]};
const div2=(a,b)=>{const r=mul(a,[b[1],b[0]]);return r};
O['tlt.nhan_biet_dai_luong']=(st,o)=>{const P=[...st.matchAll(/\((-?\d+); (-?\d+)\)/g)].map(z=>[+z[1],+z[2]]),R1=P.every(p=>p[1]*P[0][0]==P[0][1]*p[0]),R2=P.every(p=>p[0]*p[1]==P[0][0]*P[0][1]);
 const ans=R1&&R2?'Vừa tỉ lệ thuận, vừa tỉ lệ nghịch':R1?'Tỉ lệ thuận':R2?'Tỉ lệ nghịch':'Không tỉ lệ thuận, cũng không tỉ lệ nghịch';return o==ans};
O['tlt.tong_binh_phuong']=(st,o)=>{const m=st.match(/\{x\}\/\{(\d+)\} = \{y\}\/\{(\d+)\} và x\^2 \+ y\^2 = (\d+)\. Giá trị của (x \+ y|x|y) là/),r=[];
 for(let x=1;x<=500;x++)for(let y=1;y<=500;y++)if(m[2]*x==m[1]*y&&x*x+y*y==+m[3])r.push(m[4]=='x'?x:m[4]=='y'?y:x+y);return r.length==1&&r[0]==I(o)};
O['tlt.cdong_muon']=(st,o)=>{const m=st.match(/thứ nhất là (\d+) km\/h, ô tô thứ hai là (\d+) km\/h\..*muộn hơn ô tô thứ hai (\d+) giờ/),r=[];for(let t2=1;t2<=100;t2++)if(m[1]*(t2+ +m[3])==m[2]*t2)r.push(m[2]*t2);return r.length==1&&r[0]==I(o)};
O['tlt.tln_nguoi_gio']=(st,o)=>{const m=st.match(/Nếu (\d+) người làm việc (\d+) giờ mỗi ngày thì xong .* trong (\d+) ngày\. Hỏi nếu (\d+) người .* làm việc (\d+) giờ/),d=m[1]*m[2]*m[3]/(m[4]*m[5]);return Number.isInteger(d)&&d==I(o)};
O['tlt.hieu_ti_le']=(st,o)=>{const m=st.match(/tỉ lệ với (\d+); (\d+); (\d+)\. Lớp 7A có nhiều hơn lớp 7C (\d+) học sinh/),r=[];for(let k=1;k<=600;k++)if((m[1]-m[3])*k==+m[4])r.push((+m[1]+ +m[2]+ +m[3])*k);return r.length==1&&r[0]==I(o)};
O['tlt.day_ti_so_dich']=(st,o)=>{const m=st.match(/Cho \{x ([+-]) (\d+)\}\/\{(\d+)\} = \{y ([+-]) (\d+)\}\/\{(\d+)\} = \{z ([+-]) (\d+)\}\/\{(\d+)\} và x \+ y \+ z = (-?\d+)\. Tìm (\w)\./),
 sh=(s,n)=>s=='-'?+n:-n,p=sh(m[1],m[2]),q=sh(m[4],m[5]),r=sh(m[7],m[8]),res=[];
 for(let k=-80;k<=80;k++){const x=p+m[3]*k,y=q+m[6]*k,z=r+m[9]*k;if(x+y+z==+m[10])res.push({x,y,z}[m[11]])}return res.length==1&&res[0]==I(o)};

/* ---------- kiểm tra hiển thị ---------- */
function lint(q,out){
 const items=[['đề',q.q],...[q.a,...q.w].map((v,i)=>[i?'đáp án nhiễu':'đáp án đúng',v]),['lời giải',q.e]];
 for(const[nm,raw]of items){const h=H(String(raw)).replace(/\\n/g,'<br>'),t=h.replace(/<\/?[a-zA-Z][^>]*>/g,''),p0=String(raw).replace(/<[^>]+>/g,' ');
  if(/\^/.test(h))out.push(nm+': còn dấu ^ chưa đổi thành số mũ → '+p0.slice(0,70));
  if(/NaN|undefined|Infinity|\[object|null/.test(h))out.push(nm+': có NaN/undefined → '+p0.slice(0,70));
  if(/(^|[\s(=:;,])-\d/.test(' '+t))out.push(nm+': dấu trừ thường "-" trước số → '+p0.slice(0,70));
  if(/\d\.\d/.test(p0.replace(/Bước \d\./g,'')))out.push(nm+': số thập phân dùng dấu chấm → '+p0.slice(0,70));
  if(/[+−] −|− \+|\+ \+|− −|\(\s|\s\)|\s,|\s\.\s*$|  /.test(t.replace(/\n/g,' ').replace(/\s+\.\s/g,' ')))out.push(nm+': khoảng trắng/dấu lạ → '+t.replace(/\s+/g,' ').slice(0,90));
  if(/(^|[^\d.,/])1x|(^|[^\d])0x|\b1x\^/.test(p0))out.push(nm+': hệ số 1x/0x → '+p0.slice(0,70));
  const st=[];for(const m of h.matchAll(/<(\/?)(sup|b|span|br)\b[^>]*>/g)){if(m[2]=='br')continue;if(!m[1])st.push(m[2]);else if(st.pop()!=m[2]){out.push(nm+': thẻ HTML đóng mở sai');break}}
  if(st.length)out.push(nm+': thẻ HTML chưa đóng');
  if(nm.startsWith('đáp án')&&t.replace(/\s+/g,' ').trim().length>60)out.push(nm+': quá dài ('+t.trim().length+' ký tự) → '+t.trim().slice(0,60));}
 if(!/Bước 2/.test(q.e))out.push('lời giải ít hơn 2 bước');
 if(q.f&&!/^<svg[\s\S]*<\/svg>$/.test(q.f))out.push('hình SVG không hợp lệ');
}
/* giá trị số của một đáp án (để phát hiện hai đáp án cùng giá trị) */
const val=s=>{s=String(s).replace(/−/g,'-');let m=s.match(/^(\d+) : (\d+)$/);if(m)return fr(+m[1],+m[2]);return pn(s)};

/* ---------- chạy ---------- */
const mine=new Set();for(const f of ['cbnc-sht.js','cbnc-sth.js','cbnc-tlt.js'])for(const m of fs.readFileSync(path.join(root,'js/data/grade7',f),'utf8').matchAll(/gen\('([\w.]+)'/g))mine.add(m[1]);
const gens={};for(const t of c.T.filter(t=>t.gr==7))for(const lv of['g','h'])for(const fn of t[lv]){for(let i=0;i<8;i++){const q=fn();if(q.k&&q.k!='fallback'){if(mine.has(q.k))gens[q.k]={fn,lv,t:t.id};break}}}
let bad=0,total=0;const rep=[];
for(const k of mine){if(only.length&&!only.some(p=>k.startsWith(p)))continue;const g=gens[k];
 if(!g){rep.push(`✗ ${k}: không tìm thấy bộ sinh`);bad++;continue}
 if(!O[k]){rep.push(`✗ ${k}: THIẾU oracle`);bad++;continue}
 const err={},seen=new Set();let fb=0,n=0;
 for(let i=0;i<N;i++){const q=g.fn();n++;total++;
  if(q.k=='fallback'||q.k!=k){fb++;continue}
  const E=[],all=[q.a,...q.w];seen.add(q.q);
  if(q.w.length!=3||new Set(all).size!=4)E.push('không đủ 4 đáp án khác nhau');
  const vs=all.map(val).filter(Boolean);for(let a=0;a<vs.length;a++)for(let b=a+1;b<vs.length;b++)if(eq(vs[a],vs[b]))E.push('hai đáp án cùng giá trị: '+all[a]+' và '+all[b]);
  try{const st=plain(q.q);
   if(!O[k](st,String(q.a).replace(/−/g,'-').replace(/^-/,'-'),q))E.push('ĐÁP ÁN ĐÚNG bị oracle bác: '+st.slice(0,80)+' → '+q.a);
   for(const w of q.w)if(O[k](st,String(w),q))E.push('đáp án nhiễu bị oracle cho là ĐÚNG: '+st.slice(0,80)+' → '+w)}catch(e){E.push('oracle lỗi: '+e.message+' | '+plain(q.q).slice(0,80))}
  lint(q,E);
  for(const e of E){const key=e.replace(/→.*|:.*\|.*/,'').slice(0,60);err[key]=err[key]||{c:0,ex:e};err[key].c++}}
 const ek=Object.keys(err);if(fb)ek.push('__fb');
 if(ek.length){bad++;rep.push(`✗ ${k} (${g.t}/${g.lv}): ${fb?fb+' lần rơi về câu dự phòng; ':''}`+Object.values(err).map(v=>`${v.c}× ${v.ex}`).slice(0,4).join(' || '))}
 else rep.push(`✓ ${k} (${g.t}/${g.lv}) ${n} lượt, ${seen.size} đề khác nhau`)}
console.log(rep.join('\n'));console.log(`\nDạng bài mới: ${mine.size}, lượt thử: ${total}, dạng có lỗi: ${bad}`);process.exit(bad?1:0);
