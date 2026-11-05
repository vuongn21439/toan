/* Kiểm chứng 56 dạng mới của js/data/grade6/q10-sgk.js bằng oracle độc lập (vét cạn / tính lại bằng cách khác).
   Chạy ở thư mục gốc project:  node kiem-chung/lop6-sgk/verify.js 300      (không cần đưa lên hosting) */
const load=require('../lop8-9/load.js'),path=require('path');
const N=+process.argv[2]||300,ctx=load(path.join(__dirname,'..','..'));
const ng=v=>String(v).replace('-','−'),fdd=v=>ng(String(+(+v).toFixed(4))).replace('.',',');
const nums=s=>(s.replace(/−/g,'-').match(/-?\d+/g)||[]).map(Number);
const T=s=>s.replace(/<[^>]*>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const g=(a,b)=>b?g(b,a%b):a, isPr=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true};
const st=a=>'{'+a.map(ng).join('; ')+'}',ev=s=>Function('"use strict";return ('+s.replace(/−/g,'-').replace(/×/g,'*').replace(/:/g,'/').replace(/\^/g,'**')+')')();
const opts=q=>[q.a,...q.w],after=(q,k)=>T(q.q).split(k).slice(1).join(k).trim();
const cache={};
const O={
'set.thuoc':q=>{const A=T(q.q).match(/\{([^}]*)\}/)[1].split(';').map(s=>+s.trim());const tr=o=>{let m;if(m=o.match(/^\{\d+\} ∈ A$/))return false;if(m=o.match(/^(\d+) ∈ A$/))return A.includes(+m[1]);if(m=o.match(/^(\d+) ∉ A$/))return !A.includes(+m[1]);return false};const t=opts(q).filter(tr);return t.length==1?t[0]:'INVALID'},
'set.dem_phantu':q=>{const m=T(q.q).match(/(\d+) (≤|<) x (≤|<) (\d+)/);let c=0;for(let x=0;x<300;x++)if((m[2]=='≤'?x>=+m[1]:x>+m[1])&&(m[3]=='≤'?x<=+m[4]:x<+m[4]))c++;return String(c)},
'set.chu_cai':q=>String(new Set([...T(q.q).match(/“([^”]+)”/)[1]].filter(c=>c!=' ')).size),
'set.dem_boi':q=>{const m=T(q.q).match(/chia hết cho (\d+) và thỏa mãn (\d+) ≤ x ≤ (\d+)/);let c=0;for(let x=+m[2];x<=+m[3];x++)if(x%+m[1]==0)c++;return String(c)},
'nat.chuso':q=>{const m=T(q.q).match(/Trong số (\d+), chữ số (\d) có/);const s=m[1];return String(+m[2]*10**(s.length-1-s.indexOf(m[2])))},
'nat.la_ma':q=>{const m=T(q.q).match(/La Mã ([IVX]+) /)[1],V={I:1,V:5,X:10};let s=0;for(let i=0;i<m.length;i++)s+=V[m[i]]<(V[m[i+1]]||0)?-V[m[i]]:V[m[i]];return String(s)},
'nat.xe_cho':q=>{const[a,b]=nums(T(q.q));let k=0;while(k*b<a)k++;return String(k)},
'nat.nhom_cong':q=>String(nums(after(q,'Tính nhanh:')).reduce((x,y)=>x+y,0)),
'nat.nhom_nhan':q=>String(nums(after(q,'Tính nhanh:')).reduce((x,y)=>x*y,1)),
'nat.timx4':q=>{const s=after(q,'biết:');let m,f;if(m=s.match(/^x − (\d+) = (\d+)$/))f=x=>x-m[1]==m[2];else if(m=s.match(/^(\d+) − x = (\d+)$/))f=x=>m[1]-x==m[2];else if(m=s.match(/^(\d+) : x = (\d+)$/))f=x=>x>0&&m[1]/x==m[2];else if(m=s.match(/^x : (\d+) = (\d+)$/))f=x=>x/m[1]==m[2];const r=[];for(let x=0;x<20000;x++)if(f(x))r.push(x);return r.length==1?String(r[0]):'INVALID'},
'nat.thutu':q=>String(ev(after(q,'Tính:'))),
'nat.khacnhau':q=>{const k=+T(q.q).match(/có (\d) chữ số khác nhau/)[1],mn=/nhỏ nhất/.test(q.q),key=k+'|'+mn;if(!cache[key]){let r=null;const lo=10**(k-1),hi=10**k;for(let x=mn?lo:hi-1;mn?x<hi:x>=lo;mn?x++:x--){const s=String(x);if(new Set(s).size==k){r=x;break}}cache[key]=r}return String(cache[key])},
'nat.dem_so':q=>{const t=T(q.q);let m;if(m=t.match(/có (\d) chữ số\?/)){const k=+m[1];let c=0;for(let x=0;x<10**k;x++)if(String(x).length==k)c++;return String(c)}m=t.match(/đến (\d+) cần/);let c=0;for(let x=1;x<=+m[1];x++)c+=String(x).length;return String(c)},
'pow.viet_gon':q=>{const f=after(q,'lũy thừa:').split(' × ');return `${f[0]}^${f.length}`},
'pow.giatri_tong':q=>String(ev(after(q,'Tính:'))),
'pow.cung_coso':q=>{const m=T(q.q).match(/(\d+)\^(\d+) × \d+\^(\d+) : \d+\^(\d+)/),a=BigInt(m[1]),v=a**BigInt(m[2])*a**BigInt(m[3])/a**BigInt(m[4]);for(let e=0;e<60;e++)if(a**BigInt(e)==v)return `${m[1]}^${e}`;return 'INVALID'},
'pow.max4':q=>{const L=opts(q).map(o=>{const m=o.match(/^(\d+)\^(\d+)$/);return[o,BigInt(m[1])**BigInt(m[2])]});let b=L[0];for(const x of L)if(x[1]>b[1])b=x;return L.filter(x=>x[1]==b[1]).length==1?b[0]:'INVALID'},
'div.tong_chiahet':q=>{const k=+T(q.q).match(/chia hết cho (\d+)\?/)[1];const r=opts(q).filter(o=>{const[x,y]=o.split(' + ').map(Number);return (x+y)%k==0});return r.length==1?r[0]:'INVALID'},
'div.dauhieu9':q=>{const m=q.q.match(/overline">(\d)(\d)x</);const r=[];for(let x=0;x<10;x++)if((+m[1]*100+ +m[2]*10+x)%9==0)r.push(x);return r.length==1?String(r[0]):'INVALID'},
'div.dauhieu23':q=>{const m=q.q.match(/overline">(\d)(\d)x</);let r=-1;for(let x=0;x<10;x++)if((+m[1]*100+ +m[2]*10+x)%6==0)r=x;return String(r)},
'div.nguyento_dem':q=>{const[lo,hi]=nums(T(q.q));let c=0;for(let x=lo;x<=hi;x++)if(isPr(x))c++;return String(c)},
'div.phantich':q=>{const n=+T(q.q).match(/số (\d+) ra/)[1];const r=opts(q).filter(o=>{const f=o.split(' × ').map(t=>{const m=t.match(/^(\d+)(?:\^(\d+))?$/);return[+m[1],m[2]?+m[2]:1]});return f.every(([p])=>isPr(p))&&f.reduce((s,[p,e])=>s*p**e,1)==n});return r.length==1?r[0]:'INVALID'},
'div.nhonhat_chiahet':q=>{const m=T(q.q).match(/có (\d) chữ số chia hết cho (\d+)/);let x=10**(+m[1]-1);while(x%+m[2])x++;return String(x)},
'ub.liet_ke_uoc':q=>{const n=+T(q.q).match(/Ư\((\d+)\)/)[1],r=[];for(let d=1;d<=n;d++)if(n%d==0)r.push(d);return st(r)},
'ub.boi_liet_ke':q=>{const[a,b]=nums(T(q.q));const r=[];for(let x=0;x<b;x+=a)r.push(x);return st(r)},
'ub.x_uoc':q=>{const m=T(q.q).match(/Ư\((\d+)\) và x > (\d+)/),r=[];for(let d=1;d<=+m[1];d++)if(m[1]%d==0&&d>+m[2])r.push(d);return st(r)},
'ub.x_nhonhat':q=>{const m=T(q.q).match(/sao cho (\d+) \+ x chia hết cho (\d+)/);let x=1;while((+m[1]+x)%+m[2])x++;return String(x)},
'gcd.ucln_hai':q=>{const[a,b]=nums(T(q.q));for(let d=Math.min(a,b);d>=1;d--)if(a%d==0&&b%d==0)return String(d)},
'gcd.bcnn_hai':q=>{const[a,b]=nums(T(q.q));for(let m=Math.max(a,b);;m++)if(m%a==0&&m%b==0)return String(m)},
'gcd.cung_xuatben':q=>{const m=T(q.q).match(/cứ (\d+) phút.*cứ (\d+) phút/);for(let x=1;;x++)if(x%+m[1]==0&&x%+m[2]==0)return String(x)},
'gcd.cungnhau':q=>{const r=opts(q).filter(o=>{const[a,b]=o.split(' và ').map(Number);return g(a,b)==1});return r.length==1?r[0]:'INVALID'},
'gcd.rutgon':q=>{const m=T(q.q).match(/phân số (\d+)\/(\d+)/),d=g(+m[1],+m[2]);return `${m[1]/d}/${m[2]/d}`},
'gcd.ucln3':q=>{const v=nums(T(q.q));for(let d=Math.min(...v);d>=1;d--)if(v.every(x=>x%d==0))return String(d)},
'gcd.bcnn3':q=>{const v=nums(T(q.q));for(let m=Math.max(...v);;m++)if(v.every(x=>m%x==0))return String(m)},
'gcd.lat_gach':q=>{const m=T(q.q).match(/dài (\d+) cm, rộng (\d+) cm/);let s=Math.min(+m[1],+m[2]);while(m[1]%s||m[2]%s)s--;return String((m[1]/s)*(m[2]/s))},
'int.cong_tru':q=>ng(ev(after(q,'Tính:'))),
'int.bo_ngoac':q=>ng(ev(after(q,'Tính:'))),
'int.nhan':q=>ng(ev(after(q,'Tính:'))),
'int.abs_tinh':q=>ng(ev(after(q,'Tính:').replace(/\|([^|]+)\|/g,'Math.abs($1)'))),
'int.sapxep':q=>{const s=T(q.q).match(/số (.*) theo/)[1];return nums(s).sort((a,b)=>a-b).map(ng).join('; ')},
'int.timx_ct':q=>{const s=after(q,'biết:'),r=[];for(let x=-300;x<=300;x++){const e=s.replace(/x/g,`(${x})`).replace('=','==');if(ev(e))r.push(x)}return r.length==1?ng(r[0]):'INVALID'},
'int.tong_lientiep':q=>{const m=T(q.q).replace(/−/g,'-').match(/(-?\d+) ≤ x ≤ (\d+)/);let s=0;for(let x=+m[1];x<=+m[2];x++)s+=x;return ng(s)},
'int.uoc_Z':q=>{const n=+T(q.q).match(/Số (\d+) có/)[1];let c=0;for(let x=-n;x<=n;x++)if(x&&n%x==0)c++;return String(c)},
'geo.tamgiac_deu':q=>{const t=T(q.q),m=nums(t)[0];return /Chu vi của/.test(t)?`${fdd(3*m)} cm`:`${fdd(m/3)} cm`},
'geo.hinhvuong':q=>{const t=T(q.q),m=nums(t)[0];if(/cạnh \d+ cm\. Diện tích/.test(t))return `${fdd(m*m)} cm²`;if(/chu vi \d+ cm\. Diện tích/.test(t)){let a=0;while(4*a<m)a++;return `${fdd(a*a)} cm²`}let a=0;while(a*a<m)a++;return `${fdd(4*a)} cm`},
'geo.hcn_tim':q=>{const t=T(q.q),[x,y]=nums(t);if(/diện tích/.test(t)){const S=x,a=y;let b=0;while(a*b<S)b++;return `${fdd(2*(a+b))} cm`}const P2=x,b=y;for(let a=1;a<100;a++)if(2*(a+b)==P2)return `${fdd(a*b)} cm²`},
'geo.thoi':q=>{const t=T(q.q),v=nums(t);if(/hai đường chéo/.test(t))return `${fdd(v[0]*v[1]/2)} cm²`;if(/diện tích/.test(t)){const S=v[0],d1=v[1];for(let d2=1;d2<200;d2++)if(d1*d2/2==S)return `${fdd(d2)} cm`}return `${fdd(4*v[0])} cm`},
'geo.binhhanh':q=>{const t=T(q.q),v=nums(t);if(/Diện tích là/.test(t))return `${fdd(v[0]*v[1])} cm²`;if(/Chiều cao tương ứng/.test(t)){for(let h=1;h<200;h++)if(h*v[1]==v[0])return `${fdd(h)} cm`}return `${fdd(2*(v[0]+v[1]))} cm`},
'geo.hinhthang_h':q=>{const[S,a,b]=nums(T(q.q));for(let h=1;h<200;h++)if((a+b)*h/2==S)return `${fdd(h)} cm`},
'geo.L':q=>{const t=T(q.q),[a,b]=nums(t),pts=[[0,0],[a,0],[a,a-b],[a-b,a-b],[a-b,a],[0,a]];let per=0,ar=0;for(let i=0;i<6;i++){const p=pts[i],r=pts[(i+1)%6];per+=Math.abs(p[0]-r[0])+Math.abs(p[1]-r[1]);ar+=p[0]*r[1]-r[0]*p[1]}return /Chu vi/.test(t)?`${fdd(per)} cm`:`${fdd(Math.abs(ar)/2)} cm²`},
'geo.lat_nen':q=>{const[a,b,c]=nums(T(q.q));return String((a*100*b*100)/(c*c))},
'axis.dem_truc':q=>{const tb={'hình vuông':'4','hình chữ nhật':'2','hình thoi':'2','tam giác đều':'3','tam giác cân':'1','hình bình hành':'0','hình thang cân':'1','ngũ giác đều':'5','lục giác đều':'6','đoạn thẳng':'2','hình tròn':'Vô số'};const n=Object.keys(tb).find(k=>T(q.q).toLowerCase().startsWith(k));return tb[n]},
'axis.chu_cai':q=>{const one='AMTUVYBCDEK',two='HX',none='FGJLNPQRSZ',t=T(q.q);const set=/đúng một/.test(t)?one:/đúng hai/.test(t)?two:none;const r=opts(q).filter(c=>set.includes(c));return r.length==1?r[0]:'INVALID'},
'axis.tamdx':q=>{const Y=['hình bình hành','hình chữ nhật','hình thoi','hình vuông','hình tròn','đoạn thẳng','lục giác đều'],not=/KHÔNG/.test(q.q);const r=opts(q).filter(o=>not?!Y.includes(o):Y.includes(o));return r.length==1?r[0]:'INVALID'},
'axis.tam_vitri':q=>'giao điểm của hai đường chéo AC và BD',
'axis.dx_trucso':q=>{const[a,m]=nums(T(q.q));for(let r=-100;r<=100;r++)if((a+r)/2==m)return ng(r)}
};
const stats={},bad=[],all=[];let fb=0;
for(const t of ctx.T)if(t.gr==6)for(const arr of [t.g||[],t.h||[]])for(const f of arr){let q0;try{q0=f()}catch(e){continue}if(!q0||!O[q0.k])continue;all.push([q0.k,f])}
for(const[k,f]of all){const s=stats[k]=stats[k]||{n:0,ok:0,why:0,w:0};
 for(let i=0;i<N;i++){const q=f(),err=(m)=>{if(bad.length<40)bad.push(k+' :: '+m+' :: '+T(q.q).slice(0,110)+' => '+q.a+' | '+q.w.join(' | '))};
  s.n++;if(q.k=='fallback'){fb++;err('FALLBACK');continue}
  const o=opts(q);let good=true;
  if(new Set(o).size!=4){err('không đủ 4 đáp án khác nhau');good=false}
  if(!/Bước 2/.test(q.e)){err('lời giải < 2 bước');good=false}
  if(/NaN|undefined|Infinity/.test(q.q+o.join('|')+q.e)){err('NaN/undefined');good=false}
  if(/<(?!\/?(span|b|sup)\b)/.test(q.q+o.join('')+q.e)){err('có ký tự < thô');good=false}
  const exp=O[k](q);if(exp!==q.a){err('SAI ĐÁP ÁN: oracle='+exp);good=false}
  if(o.slice(1).includes(exp)){err('nhiễu trùng đáp án đúng');good=false}
  for(const w of q.w){s.w++;if(q.x&&q.x[w])s.why++}
  if(good)s.ok++}}
let tn=0,tok=0,tw=0,twh=0;for(const[k,s]of Object.entries(stats)){tn+=s.n;tok+=s.ok;tw+=s.w;twh+=s.why;if(s.ok!=s.n)console.log('✗',k,s.ok+'/'+s.n)}
console.log('Dạng mới có oracle:',Object.keys(stats).length,'/',Object.keys(O).length,'| lượt thử:',tn,'| đạt:',tok,'| fallback:',fb);
console.log('Nhiễu có lý do:',(100*twh/tw).toFixed(1)+'%');
if(bad.length){console.log('--- lỗi (tối đa 40) ---');bad.forEach(b=>console.log(b))}
const miss=Object.keys(O).filter(k=>!stats[k]);if(miss.length)console.log('Chưa gặp:',miss.join(', '));
process.exit(tok==tn&&!miss.length?0:1);
