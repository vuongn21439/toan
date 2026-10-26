// Oracle độc lập (vét cạn) cho lô 2 lớp 6: div, gcd, ub, int, frac
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),lcm=(a,b)=>a/gcd(a,b)*b,M='−',sg=n=>n<0?M+(-n):String(n);
const num=s=>Number(String(s).replace(/<[^>]+>/g,'').replace(M,'-'));
const bg=(a,b)=>b?bg(b,a%b):(a<0n?-a:a);
const sumFr=ts=>{let n=0n,d=1n;for(const[a,b]of ts){n=n*BigInt(b)+BigInt(a)*d;d=d*BigInt(b);const g=bg(n,d);n/=g;d/=g}return d==1n?String(n):`${n}/${d}`};
const divs=n=>{const r=[];for(let d=1;d<=n;d++)if(n%d==0)r.push(d);return r};
const dg=[1,2,3,4,5,6,7,8,9];
const CM=[
 [2,(a,b)=>(10*a+b)+(10*b+a),()=>true],
 [2,(a,b)=>(10*a+b)-(10*b+a),(a,b)=>a>b],
 [3,(a,b,c)=>Number(`${a}${b}${c}${a}${b}${c}`),()=>true],
 [2,(a,b)=>Number(`${a}${a}${a}${b}${b}${b}`),()=>true],
 [3,(a,b,c)=>Number(`${a}${b}${c}`)-Number(`${c}${b}${a}`),(a,b,c)=>a>c],
 [2,(a,b)=>Number(`${a}${b}${a}${b}`),()=>true]];
const allVals=([n,f,c])=>{const r=[];for(const a of dg)for(const b of dg)for(const cc of(n==3?dg:[0]))if(c(a,b,cc))r.push(f(a,b,cc));return r};
module.exports={
 'div.soduA':([m,r1,r2,su])=>{let v=null;for(let k=0;k<8;k++)for(let l=0;l<8;l++){const a=m*k+r1,b=m*l+r2,r=(su?a+b:a*b)%m;if(v===null)v=r;else if(v!==r)throw new Error('varies')}return v},
 'div.cm_ab':([i,ans],q)=>{const vals=allVals(CM[i]);if(vals.some(v=>v%ans))throw new Error('ans not always divisor');for(const w of q.w){if(vals.every(v=>v%num(w)==0))throw new Error('wrong option is also correct: '+w)}return ans},
 'div.lientiep':([k],q)=>{let g=0;for(let n=1;n<=400;n++){let p=1;for(let i=0;i<k;i++)p*=n+i;g=gcd(g,p)}for(const w of q.w)if(g%num(w)==0)throw new Error('wrong also divisor '+w);return g},
 'div.nt_p':([a])=>{const ip=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true};const r=[];for(let p=2;p<500;p++)if(ip(p)&&ip(p+a)&&ip(p+2*a))r.push(p);if(r.length!=1)throw new Error('sols '+r);return r[0]},
 'div.uocA':([p,x,y,z,t],q)=>{const A=p*x*y+p*z*t;if(A%p)throw new Error('p∤A');for(const w of q.w)if(A%num(w)==0)throw new Error('wrong divides A '+w);return p},
 'gcd.tichuoc':([g,m,a])=>{let r=[];for(let b=1;b<=2000;b++)if(gcd(a,b)==g&&lcm(a,b)==m)r.push(b);if(r.length!=1)throw new Error('b '+r);return r[0]},
 'gcd.xephang':([D,lo,hi])=>{const r=[];for(let v=lo;v<=hi;v++)if(D.every(d=>v%d==0))r.push(v);if(r.length!=1)throw new Error('n '+r);return r[0]},
 'gcd.dukhacnhau':([D,c])=>{for(let n=1;n<1e6;n++)if(D.every(d=>n%d==d-c))return n;throw new Error('none')},
 'gcd.lichtruc3':([x,y,z])=>{for(let t=1;;t++)if(t%x==0&&t%y==0&&t%z==0)return t},
 'gcd.chiaqua':([a,b])=>{let best=1;for(let k=1;k<=Math.min(a,b);k++)if(a%k==0&&b%k==0)best=k;return `${a/best} bút, ${b/best} vở`},
 'ub.soUoc':([a,b,c,t])=>{const n=2**a*3**b*5**c;let cnt=0;for(let d=1;d<=n;d++)if(n%d==0&&(t==0||(t==1&&d%2==1)||(t==2&&d%2==0)||(t==3&&d%3==0)))cnt++;return cnt},
 'ub.tongUoc':([n])=>divs(n).reduce((s,d)=>s+d,0),
 'ub.n_chia_het':([a,b])=>{let c=0;for(let n=0;n<=300;n++)if((n+a)%(n+b)==0)c++;return c},
 'int.bongoac':([x,y,z,u,v])=>sg(x-(y-z)+(u-v)),
 'int.tich0':([a,b])=>{const r=[];for(let x=-60;x<=60;x++)if((x-a)*(x+b)==0)r.push(x);r.sort((p,q)=>q-p);return r.map(v=>`x = ${sg(v)}`).join(' hoặc ')},
 'int.tongxen':([N])=>{let s=0;for(let i=1;i<=N;i++)s+=i%2?i:-i;return sg(s)},
 'int.abs_x':([a,b,plus])=>{const r=[];for(let x=-200;x<=200;x++)if(Math.abs(plus?x+a:x-a)==b)r.push(x);r.sort((p,q)=>q-p);return r.map(v=>`x = ${sg(v)}`).join(' hoặc ')},
 'int.uoc_n':([a,b])=>{let c=0;for(let n=-400;n<=400;n++)if(n+b!=0&&(n+a)%(n+b)==0)c++;return c},
 'int.min_abs':([t,a,b,c])=>{let best=null;for(let x=-80;x<=80;x++){if(t==0){const v=Math.abs(x-a)+c;if(best===null||v<best)best=v}else if(t==1){const v=a+c-Math.abs(x+b);if(best===null||v>best)best=v}}
   if(t==2){const r=[];for(let x=-30;x<=30;x++)for(let y=-30;y<=30;y++)if(Math.abs(x-a)+Math.abs(y+b)==0)r.push(x+y);if(r.length!=1)throw new Error('xy');return sg(r[0])}return sg(best)},
 'frac.honso':([a,b,c,d,e,f])=>{const s=sumFr([[a,1],[b,c],[d,1],[e,f]]);if(!s.includes('/'))return s;const[n,dn]=s.split('/').map(Number),w=Math.floor(n/dn),r=n%dn,g=gcd(r,dn);return w?`${w} ${r/g}/${dn/g}`:`${r/g}/${dn/g}`},
 'frac.tong_dayso':([k,m])=>{const t=[];for(let i=k;i<=m;i++)t.push([1,i*(i+1)]);return sumFr(t)},
 'frac.tong_dayso2':([s,a0,n])=>{const t=[];for(let i=0;i<n;i++){const x=a0+i*s;t.push([s,x*(x+s)])}return sumFr(t)},
 'frac.loivan1':([p])=>{const r=[];for(let T=2;T<=600;T++)for(let A=1;A<T;A++)if(A*p==T-A&&(A+1)*(p-1)==T-A-1)r.push(T);if(r.length!=1)throw new Error('T '+r);return r[0]},
 'frac.loivan2':([a,b,c])=>{const r=[];for(let T=3;T<=3000;T+=3){const d1=T/3+a,r1=T-d1;if(r1<=0||r1%2)continue;const d2=r1/2+b,r2=r1-d2;if(r2==c)r.push(T)}if(r.length!=1)throw new Error('T '+r);return r[0]},
 'frac.sosanh_trunggian':(p,q)=>{const m=q.q.replace(/<[^>]+>/g,'').match(/A = (\d+)\/(\d+) và B = (\d+)\/(\d+)/);const[xn,xd,yn,yd]=m.slice(1).map(BigInt);return xn*yd>yn*xd?'A > B':xn*yd<yn*xd?'A < B':'A = B'},
 'frac.toigian':([t,a,b,c,d])=>{if(t==0){for(let n=0;n<=3000;n++)if(gcd(a*n+b,c*n+d)!=1)throw new Error('not coprime n='+n);return 'Luôn là phân số tối giản'}
   const pr=Math.abs(a*d-b*c),S=new Set();for(let n=0;n<=5000;n++){let g=gcd(a*n+b,c*n+d);for(let p=2;p<=g;p++)if(g%p==0){S.add(p);while(g%p==0)g/=p}}
   for(const p of S)if(p!=pr)throw new Error('other prime '+p);return pr},
};
