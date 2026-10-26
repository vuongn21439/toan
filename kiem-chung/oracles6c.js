// Oracle độc lập cho lô 3 lớp 6: dec, pct, geo, line, stat, word, cir, axis, sym
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),lcm=(a,b)=>a/gcd(a,b)*b;
const fdn=v=>String(+(+v).toFixed(4)).replace('.',','),pcs=v=>fdn(v)+'%';
const dnum=s=>Number(String(s).replace(',','.'));
const txt=q=>q.q.replace(/<[^>]+>/g,'');
const TBL={'hình chữ nhật (không phải hình vuông)':2,'hình thoi (không phải hình vuông)':2,'hình bình hành (không phải hình chữ nhật, hình thoi)':0,'tam giác đều':3,'hình vuông':4,'hình thang cân (không phải hình chữ nhật)':1,'tam giác cân (không đều)':1,'ngũ giác đều':5,'lục giác đều':6,'tam giác có ba cạnh khác nhau':0};
const lc=s=>s[0].toLowerCase()+s.slice(1);
module.exports={
 'dec.nhomnhan':([a,b,c])=>fdn((a*b+a*c)/100),
 'dec.dichdauphay':([t],q)=>{const X=dnum(txt(q).match(/(\d+(?:,\d+)?) đơn vị/)[1]);for(let o=1;o<=999;o++){const old=o/10,x=t==0?(old*10-old):(old-old/10);if(Math.abs(x-X)<1e-9)return fdn(old)}throw new Error('none')},
 'dec.tong_dichphay':(p,q)=>{const S=dnum(txt(q).match(/là (\d+(?:,\d+)?)\./)[1]);for(let k=1;k<=9999;k++){const sm=k/100;if(Math.abs(sm+10*sm-S)<1e-9)return fdn(10*sm)}throw new Error('none')},
 'dec.timx_thapphan':([t,x10,p10,q10],q)=>{const r=dnum(txt(q).match(/= (\d+(?:,\d+)?)$/)[1]);const S=(t==0?p10+q10:p10-q10)/10;return fdn(r/S)},
 'pct.tanggiam':([p])=>{const f=100*(1+p/100)*(1-p/100);return `giảm ${Math.round(100-f)}%`},
 'pct.honkem':([t,p])=>t==0?pcs((100-p)/p*100):pcs(100/p*100),
 'pct.nongdo':([m,p,q])=>{const salt=m*p/100;for(let w=0;w<=5000;w++)if(Math.abs(salt/(m+w)-q/100)<1e-12)return w;throw new Error('none')},
 'pct.laikep':([V,p,n])=>{const num=BigInt(V)*BigInt(100+p)**BigInt(n),den=100n**BigInt(n);return fdn(Number(num)/Number(den))},
 'geo.hinhthang':([t,a,b,h],q)=>{if(t==0)return fdn((a+b)*h/2);const S=dnum(txt(q).match(/diện tích (\d+(?:,\d+)?) cm²/)[1]);for(let x=1;x<=300;x++)if((x+b)*h/2==S)return x;throw new Error('none')},
 'geo.hcn_tang':([a,d1,c,d2])=>{const r=[];for(let L=1;L<=300;L++)for(let W=1;W<=300;W++)if(a*W==d1&&c*L==d2)r.push(L*W);if(r.length!=1)throw new Error('n '+r);return r[0]},
 'geo.vuon_k':([k,P])=>{for(let W=1;W<=300;W++)if(2*(k*W+W)==P)return k*W*W;throw new Error('none')},
 'geo.cat_goc':([L,W,c])=>{const V=[[0,0],[L,0],[L,W],[c,W],[c,W-c],[0,W-c]];let s=0;for(let i=0;i<V.length;i++){const a=V[i],b=V[(i+1)%V.length];s+=Math.hypot(a[0]-b[0],a[1]-b[1])}return Math.round(s)},
 'line.dem_tia':([t,n])=>{if(t==0){const S=new Set();for(let i=0;i<n;i++)for(const d of[-1,1])S.add(i+','+d);return S.size}let c=0;for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(i!=j)c++;return c},
 'line.mn_ac':([L])=>{let v=null;for(let ab=1;ab<L;ab++){const M=ab/2,N=ab+(L-ab)/2,mn=N-M;if(v===null)v=mn;else if(Math.abs(v-mn)>1e-9)throw new Error('varies')}return fdn(v)},
 'line.goc_giao':([n])=>{let c=0;for(let a=0;a<2*n;a++)for(let b=a+1;b<2*n;b++)if(b-a!=n)c++;return c},
 'line.goc_phangiac':([al,be])=>{for(let xz=0;xz<=al;xz++)if(xz+(al-xz)==al&&xz-(al-xz)==be)return xz;throw new Error('none')},
 'line.goc_mon':([th])=>{let v=null;for(let a=1;a<th;a++){const m=a/2+(th-a)/2;if(v===null)v=m;else if(Math.abs(v-m)>1e-9)throw new Error('varies')}return fdn(v)},
 'stat.tbc':([S4,T])=>{for(let x=0;x<=10;x++)if((S4+x)/5==T)return x;throw new Error('none')},
 'stat.xs_themvao':([a,b,n])=>{for(let k=0;k<=500;k++)if(a*n==a+b+k)return k;throw new Error('none')},
 'word.tuoi':([S,k,n])=>{const r=[];for(let c=k+1;c<=80;c++){const M=S-c;if(M-k==n*(c-k))r.push(c)}if(r.length!=1)throw new Error('n '+r);return r[0]},
 'word.tbvt':([v1,v2])=>{const s=v1*v2;return fdn(2*s/(s/v1+s/v2))},
 'word.voi':([a,t])=>{for(let b=1;b<=2000;b++)if(b*(a-t)==t*a)return b;throw new Error('none')},
 'word.cay_vong':([t,P,d])=>{let c=0;if(t==0){for(let x=0;x<P;x+=d)c++}else if(t==1){for(let x=0;x<=P;x+=d)c++}else{for(let x=d;x<P;x+=d)c++}return c},
 'word.tong_tiso':([a,b,S,t])=>{for(let x=1;x<S;x++){const y=S-x;if(x*b==y*a)return fdn(t==0?y:y-x)}throw new Error('none')},
 'cir.vanhkhuyen':([R1,r])=>fdn(314*(R1*R1-r*r)/100),
 'cir.nuahinhtron':([r,t])=>t==0?fdn((314*r+200*r)/100):fdn(314*r*r/200),
 'axis.hinh_truc':([s,k],q)=>{const key=lc(q.a);if(TBL[key]!=k)throw new Error('ans k');for(const w of q.w)if(TBL[lc(w)]==k)throw new Error('wrong has same k: '+w);return q.a},
 'sym.thetich_tang':([t,k])=>{const a=1,b=k;return t==0?(b**3)/(a**3):(6*b*b)/(6*a*a)},
 'sym.bexep':([a,b,c,p,q])=>{const V=BigInt(a*b*c),num=V*1000n*BigInt(q-p);if(num%BigInt(q))throw new Error('frac');return fdn(Number(num/BigInt(q)))},
};
