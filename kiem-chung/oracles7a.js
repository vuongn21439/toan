// Oracle độc lập cho lớp 7 phần 1: l7sht, l7sth, l7tlt, l7dt
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),lcm=(a,b)=>a/gcd(a,b)*b,M='−',sg=n=>n<0?M+(-n):String(n);
const bg=(a,b)=>b?bg(b,a%b):(a<0n?-a:a);
const sumFr=ts=>{let n=0n,d=1n;for(const[a,b]of ts){n=n*BigInt(b)+BigInt(a)*d;d=d*BigInt(b);const g=bg(n,d);n/=g;d/=g}return d==1n?String(n):`${n}/${d}`};
const fqq=(n,d)=>{const g=gcd(Math.abs(n),Math.abs(d));n/=g;d/=g;if(d<0){n=-n;d=-d}return(d==1?String(n):`${n}/${d}`).replace('-',M)};
const fnum=x=>String(+(+x).toFixed(4)).replace('.',',');
module.exports={
 'sht.sosanh':f=>{const a=[...f].sort((p,q)=>(-p[0]*q[1])-(-q[0]*p[1]));return a.map(x=>fqq(-x[0],x[1])).join(' < ')},
 'sht.tong_day':([n])=>{const t=[];for(let i=1;i<=n;i++)t.push([1,(2*i-1)*(2*i+1)]);return sumFr(t)},
 'sht.luythua_tich':([x,y,m,n,k])=>{let num=BigInt(x*x)**BigInt(m)*BigInt(y*y)**BigInt(n),den=BigInt(x*y)**BigInt(k);const g=bg(num,den);num/=g;den/=g;return den==1n?String(num):`${num}/${den}`},
 'sht.abs_x':([a,b,c,d,plus])=>{const L=b*d,s=plus?1:-1,r=[];for(let k=-4000;k<=4000;k++)if(Math.abs(k+s*a*d)==c*b)r.push(k);r.sort((p,q)=>q-p);return r.map(k=>`x = ${fqq(k,L)}`).join(' hoặc ')},
 'sht.min_hai_abs':([a,b])=>{let m=1e9;for(let x=-60;x<=60;x+=0.5)m=Math.min(m,Math.abs(x-a)+Math.abs(x-b));return m},
 'sth.sosanh_can':([a,b,c,d])=>{const A=a*Math.sqrt(b),B=c*Math.sqrt(d);return `${a}√${b} ${A>B?'>':'<'} ${c}√${d}`},
 'sth.dem_so':([a,b])=>{let c=0;for(let n=0;n<=3000;n++){const s=Math.sqrt(n);if(s>a&&s<b)c++}return c},
 'sth.rutgon_can':([n])=>{let k=1;for(let i=1;i*i<=n;i++)if(n%(i*i)==0)k=i;return `${k}√${n/(k*k)}`},
 'sth.timx_can':([p,q,r])=>{const s=[];for(let x=-50;x<=2000;x++)if(p*x+q>=0&&Math.sqrt(p*x+q)===r)s.push(x);if(s.length!=1)throw new Error('sols '+s);return s[0]},
 'tlt.xyz_chain':([a,b,c,d,S])=>{const r=[];for(let y=0;y<=S;y++)for(let z=0;z<=S-y;z++){const x=S-y-z;if(x*b==a*y&&y*d==z*c)r.push(z)}if(r.length!=1)throw new Error('sols '+r);return r[0]},
 'tlt.xy_tich':([a,b,P])=>{const r=[];for(let x=1;x<=P;x++)if(P%x==0){const y=P/x;if(x*b==y*a)r.push(x)}if(r.length!=1)throw new Error('sols '+r);return r[0]},
 'tlt.tln_nguoi':([N,D,d0,m])=>{const rem=N*(D-d0);if(rem%(N+m))throw new Error('frac');return rem/(N+m)},
 'tlt.tln_may':([d1,d2,d3,D])=>{const r=[];for(let m3=1;m3<=400;m3++){const w=m3*d3;if(w%d1||w%d2)continue;const m1=w/d1,m2=w/d2;if(m1-m3==D)r.push(m1+m2+m3)}if(r.length!=1)throw new Error('sols '+r);return r[0]},
 'dt.he_so_tich':([a,b,c,d,e0,j])=>{const P=[b,a],Q=[e0,d,c],R=Array(4).fill(0);P.forEach((u,i)=>Q.forEach((v,k)=>R[i+k]+=u*v));return sg(R[j])},
 'dt.so_nghiem':([t,pp,a,b,q])=>{const f=t==0?x=>(x-pp)*(x*x+q):t==1?x=>(x*x-a*a)*(x*x+q):x=>(x*x-a*a)*(x*x-b*b);let c=0;for(let x=-80;x<=80;x++)if(f(x)==0)c++;return c},
 'dt.chia_het_tim_a':([k,b,c])=>{const r=[];for(let a=-60;a<=60;a++)if(k**3+a*k*k+b*k+c==0)r.push(a);if(r.length!=1)throw new Error('sols '+r);return sg(r[0])},
 'dt.xac_dinh_ab':([m,n])=>{const r=[];for(let a=-30;a<=30;a++)for(let b=-30;b<=30;b++)if(1+a+b==m&&4+2*a+b==n)r.push(`a = ${sg(a)}, b = ${sg(b)}`);if(r.length!=1)throw new Error('sols '+r);return r[0]},
};
