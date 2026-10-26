// Oracle độc lập (vét cạn) cho lô 1 lớp 6
const pm=(a,n,m)=>{let r=1n;a=BigInt(a)%BigInt(m);n=BigInt(n);m=BigInt(m);while(n>0n){if(n&1n)r=r*a%m;a=a*a%m;n>>=1n}return Number(r)};
module.exports={
 'nat.quyluat':([t,sq])=>{
   if(t==0){const df=sq.slice(1).map((v,i)=>v-sq[i]);for(let i=1;i<df.length;i++)if(df[i]-df[i-1]!=1)throw new Error('seq0');return sq[4]+df[3]+1}
   if(t==1){for(let i=1;i<5;i++)if(sq[i]!=2*sq[i-1]+1)throw new Error('seq1');return 2*sq[4]+1}
   if(t==2){const k=sq[0]-1;for(let i=0;i<5;i++)if(sq[i]!=(i+1)**2+k)throw new Error('seq2');return 36+k}
   if(t==3){const r=sq[1]/sq[0];for(let i=1;i<5;i++)if(sq[i]!=sq[i-1]*r)throw new Error('seq3');return sq[4]*r}
   for(let i=2;i<5;i++)if(sq[i]!=sq[i-1]+sq[i-2])throw new Error('seq4');return sq[3]+sq[4]},
 'nat.sosanhtich':([m,d,sw])=>{let X=(m-d)*(m+d),Y=m*m;const A=sw?Y:X,B=sw?X:Y;return A<B?'A < B':A>B?'A > B':'A = B'},
 'nat.chiadu':([t,x,y,z])=>{if(t==0)return x*y+z;/* t==1: N,q,r → d */for(let d=z+1;d<x;d++)if(Math.floor(x/d)==y&&x%d==z)return d;throw new Error('nod')},
 'nat.trang':([n])=>{let T=0;for(let i=1;i<=n;i++)T+=String(i).length;return n},
 'nat.chuso_k':([k])=>{let s='';for(let i=1;s.length<k;i++)s+=i;return s[k-1]},
 'nat.dem_chia':([m,b,dg])=>{let c=0;for(let v=10**(dg-1);v<10**dg;v++)if(v%m==0&&v%10==b)c++;return c},
 'nat.tongday':([a,d,n])=>{let s=0;for(let i=0;i<n;i++)s+=a+i*d;return s},
 'nat.timx_ngoac':([N,a,b,c])=>{for(let x=0;x<500;x++){const inner=a-(2*x-b);if(inner>0&&N%inner==0&&N/inner==c)return x}throw new Error('nox')},
 'nat.chinhphuong4':([k])=>{const A=k*(k+1)*(k+2)*(k+3)+1,r=Math.round(Math.sqrt(A));if(r*r!=A)throw new Error('not sq');return r},
 'pow.dang':(p)=>{const b=p[0];let v;if(p[1]==0)v=p[2].reduce((s,e)=>s*BigInt(b)**BigInt(e),1n);else v=BigInt(p[2])**BigInt(p[3])*BigInt(p[4])**BigInt(p[5]);let e=0;while(v>1n){if(v%BigInt(b))throw new Error('notpow');v/=BigInt(b);e++}return e},
 'pow.cmp_mu':([a,m,b,n])=>{const A=BigInt(a)**BigInt(m),B=BigInt(b)**BigInt(n);return A>B?'A > B':A<B?'A < B':'A = B'},
 'pow.cmp_trunggian':([A,sw],q)=>{const ev=x=>x.split('+').map(t=>t.trim()).reduce((s,t)=>{const[a,b]=t.split('^');return s+BigInt(a)**BigInt(b)},0n);const m=q.q.match(/A = (.+) và B = (.+)\./);const va=ev(m[1]),vb=ev(m[2]);return va>vb?'A > B':'A < B'},
 'pow.tancung2':([n])=>String(pm(7,n,100)).padStart(2,'0'),
 'pow.tancung_tong':([a,m,b,n,su])=>{const x=pm(a,m,10),y=pm(b,n,10);return String(su?(x+y)%10:(x*y)%10)},
 'pow.rutgon':([a,m,p,u,v])=>{const N=BigInt(a)**BigInt(m)*BigInt(u+v),D=BigInt(a)**BigInt(p)*BigInt(u+v);if(N%D!=0n)throw new Error('notint');return Number(N/D)},
 'pow.timx':([b,t,val])=>{const f=[x=>b**x*(1+b+b*b),x=>b**x*(1+b),x=>b**(x+1)-b**x][t];const r=[];for(let x=0;x<30;x++)if(f(x)==val)r.push(x);if(r.length!=1)throw new Error('nonunique');return r[0]},
 'set.dem_buoc':([a,d,z])=>{let c=0;for(let v=a;v<=z;v+=d)c++;return c},
 'set.venn':([a,b,C,N,t])=>{const U=a+b-C;return t==0?U:t==1?N-U:a-C},
 'set.con_chua':([n,t])=>{// vét cạn tập con
   let c=0;for(let mask=0;mask<(1<<n);mask++){const has=i=>(mask>>i)&1;if(t==0&&has(0))c++;else if(t==1&&mask!=0)c++;else if(t==2&&has(0)&&has(1))c++;else if(t==3&&!has(0)&&!has(1))c++}return c},
};
for(const k of Object.keys(module.exports))if(module.exports[k]===null)delete module.exports[k];
