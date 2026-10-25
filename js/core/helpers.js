/* Hàm dùng chung: ngẫu nhiên, ước chung, định dạng số, tạo câu hỏi (Q, N, Z), hiển thị phân số/lũy thừa (H) */
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),P=a=>a[R(0,a.length-1)],
sh=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]),
gcd=(a,b)=>b?gcd(b,a%b):a,
iz=v=>String(v).replace('-','−'),
pa=v=>v<0?'(−'+(-v)+')':''+v,
dc=v=>(v/10).toFixed(1).replace('.',','),
dd=v=>(v/100).toFixed(2).replace('.',','),
rom=n=>{let s='';[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']].forEach(([v,r])=>{while(n>=v){s+=r;n-=v}});return s},
Q=(q,a,w,e)=>({q,a,w,e}),
nums=(c,z)=>{const s=new Set();let t=0;while(s.size<3&&t++<99){const v=c+P([1,2,3,4,5,10,-1,-2,-3,-4,-5,-10]);if(v!=c&&(z||v>=0))s.add(v)}return[...s]},
N=(q,c,e,f=String,z)=>Q(q,f(c),nums(c,z).map(f),e),
cop=(lo,hi)=>{let x,y;do{x=R(lo,hi);y=R(lo,hi)}while(x==y||gcd(x,y)!=1);return[x,y]},
H=s=>String(s).replace(/(\d+)\/(\d+)/g,'<span class="fr"><b>$1</b><b>$2</b></span>').replace(/\^(\d+)/g,'<sup>$1</sup>');

const fs=(a,b)=>{const g=gcd(a,b);return b/g==1?''+a/g:`${a/g}/${b/g}`},
Z=(q,c,w,e)=>Q(q,c,[...new Set(w)].filter(s=>s!=c).slice(0,3),e),
isP=n=>{for(let i=2;i*i<=n;i++)if(n%i==0)return false;return n>1},
nz=()=>{let v;do v=R(-9,9);while(!v);return v},
A=(id,...f)=>T.find(t=>t.id==id).g.push(...f);
