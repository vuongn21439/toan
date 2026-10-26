// Oracle độc lập cho lớp 7 phần 2: l7gdt, l7tgb, l7qht, l7hk, l7bd, l7xs
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const fdn=v=>String(+(+v).toFixed(4)).replace('.',',');
const fqq=(n,d)=>{const g=gcd(n,d);n/=g;d/=g;return d==1?String(n):`${n}/${d}`};
const prime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i==0)return false;return true};
module.exports={
 'gdt.tim_x_song2':([t,p,q,r,s])=>{const sol=[];for(let x=1;x<=300;x++){const a=p*x+q,b=r*x+s;if(t==1?a+b==180:a==b)sol.push(x)}if(sol.length!=1)throw new Error('sols '+sol);return sol[0]},
 /* mô hình nhãn góc: tại mỗi giao điểm 4 góc 1..4 (1 phải-trên, 2 trái-trên, 3 trái-dưới, 4 phải-dưới) */
 'gdt.dem_cap':([t])=>{
  const L=[1,2,3,4],side={1:'R',2:'L',3:'L',4:'R'},inA=i=>i==3||i==4,inB=i=>i==1||i==2;let c=0;
  if(t==0){for(const i of L)for(const j of L)if(i==j)c++;return c}                       // đồng vị: cùng chỉ số
  if(t==1||t==2){for(const i of L)for(const j of L)if(inA(i)&&inB(j)&&((side[i]!=side[j])==(t==1)))c++;return c}
  if(t==3)return 2*L.length;
  if(t==4){for(let k=0;k<2;k++)for(const i of L)if(i<=2)c++;return c}                    // đối đỉnh: (1,3),(2,4)
  for(let k=0;k<2;k++)for(const i of L)c++;return c},                                    // kề bù: 4 cặp liên tiếp mỗi điểm
 'gdt.n_duong_cat':([n])=>{let c=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)c+=2;return c},
 'tgb.dieu_kien_bang':([t,A,B,C,D,E,F])=>t==0?`∠${A} = ∠${D}`:`${B}${C} = ${E}${F}`,
 'tgb.can_goc':([t,al])=>{let base=null,apex=null;for(let u=1;u<90;u++){const z=180-2*u;if(u==al)base=`${al}° và ${z}°`;if(z==al)apex=`${u}° và ${u}°`}
  return t==0?`${base} hoặc ${apex}`:apex},
 'tgb.goc_ngoai_tong':([xa,xb])=>xa+xb-180,
 'qht.sapxep_goc':([a,b,c])=>{const AB=a,BC=b,CA=c,ang={A:Math.acos((AB*AB+CA*CA-BC*BC)/(2*AB*CA)),B:Math.acos((AB*AB+BC*BC-CA*CA)/(2*AB*BC)),C:Math.acos((BC*BC+CA*CA-AB*AB)/(2*BC*CA))};
  return Object.keys(ang).sort((u,v)=>ang[u]-ang[v]).map(v=>'∠'+v).join(' < ')},
 'qht.dem_tamgiac':([n])=>{const S=new Set();for(let a=1;a<n;a++)for(let b=1;b<n;b++){const c=n-a-b;if(c<1)continue;if(a+b>c&&b+c>a&&a+c>b)S.add([a,b,c].sort((x,y)=>x-y).join(','))}return S.size},
 'qht.trungtuyen_tong':([am,bn,cp])=>fdn((am+bn+cp)*2/3),
 'qht.chuvi_cuc_tri':([a,b,t])=>{const ps=[];for(let c=1;c<=200;c++)if(c>Math.abs(a-b)&&c<a+b)ps.push(a+b+c);return t==0?Math.max(...ps):Math.min(...ps)},
 'hk.lang_tru_dem':([t,n])=>{const V=new Set(),E=new Set();for(let i=0;i<n;i++)for(const l of[0,1]){V.add(i+','+l);const j=(i+1)%n,e1=[i+','+l,j+','+l].sort().join('-');E.add(e1)}
  for(let i=0;i<n;i++)E.add([i+',0',i+',1'].sort().join('-'));
  const F=2+n; return t==0?E.size:t==1?V.size:F},
 'hk.nuoc_dang':([a,b,V])=>fdn(V/(a*b)),
 'hk.cat_goc_khoi':([a,b,c,k])=>{const f=(x,y,z)=>x>=0&&y>=0&&z>=0&&x<a&&y<b&&z<c&&!(x<k&&y<k&&z<k);let s=0;
  for(let x=0;x<a;x++)for(let y=0;y<b;y++)for(let z=0;z<c;z++)if(f(x,y,z))for(const[dx,dy,dz]of[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]])if(!f(x+dx,y+dy,z+dz))s++;return s},
 'hk.thetich_thoi':([d1,d2,h])=>{const P=[[d1/2,0],[0,d2/2],[-d1/2,0],[0,-d2/2]];let s=0;for(let i=0;i<4;i++){const[x1,y1]=P[i],[x2,y2]=P[(i+1)%4];s+=x1*y2-x2*y1}return fdn(Math.abs(s)/2*h)},
 'bd.pie_goc4':([a0,a1,a2])=>fdn((360-a0-a1-a2)/3.6)+'%',
 'bd.tbc_tanso':([xs,ns])=>{let S=0,N=0;xs.forEach((x,i)=>{S+=x*ns[i];N+=ns[i]});return fdn(Math.round(S/N*10)/10)},
 'bd.lch_phantram':([v2,v3])=>fdn((v3-v2)/v2*100)+'%',
 'xs.tanso_thucnghiem':n=>{let N=0,ev=0;n.forEach((x,i)=>{N+=x;if((i+1)%2==0)ev+=x});return fqq(ev,N)},
 'xs.hai_xucxac':([idx])=>{const P=[(a,b)=>a==b,(a,b)=>!!(a%2&&b%2),(a,b)=>Math.max(a,b)==6,(a,b)=>prime(a+b),(a,b)=>Math.min(a,b)>1,(a,b)=>a+b<5][idx];let c=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(P(a,b))c++;return fqq(c,36)},
 'xs.rut_the':([n,t])=>{let c=0,T=0;for(let i=1;i<=n;i++)for(let j=i+1;j<=n;j++){T++;if(t==0?(i+j)%2==0:(i*j)%2==1)c++}return fqq(c,T)},
};
