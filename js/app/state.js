const app=document.getElementById('app');
/* màu chữ đọc được trên nền màu chủ đề (chọn trắng hoặc tím đen, cái nào tương phản WCAG cao hơn) + cầu nối tới nền 3D / pháo giấy (không có thì bỏ qua) */
const ink=c=>{const n=parseInt(c.slice(1),16),l=[n>>16,n>>8&255,n&255].map(v=>{v/=255;return v<=.04?v/12.92:((v+.055)/1.055)**2.4}),L=.2126*l[0]+.7152*l[1]+.0722*l[2];return 1.05/(L+.05)>(L+.05)/.0622?'#fff':'#1b1740'},
gx=(m,...a)=>{try{window.GFX&&GFX[m](...a)}catch(e){}},
cf=(m,...a)=>{try{window.Confetti&&Confetti[m](...a)}catch(e){}};
let D={},S={};
try{D=JSON.parse(localStorage.getItem('t6')||'{}')}catch(e){D={}}
if(!D||typeof D!='object')D={};D.b=D.b&&typeof D.b=='object'?D.b:{};D.xp=Math.max(0,Math.min(1e6,+D.xp||0));D.acc=D.acc&&typeof D.acc=='object'?D.acc:{};for(const k in D.b)D.b[k]=Math.max(0,Math.min(3,D.b[k]|0));for(const k in D.acc){const a=D.acc[k];if(!Array.isArray(a)||!(a[1]>0)||!(a[0]>=0)||a[0]>a[1])delete D.acc[k]}
const save=()=>{try{localStorage.setItem('t6',JSON.stringify(D))}catch(e){}};

D.lv=['b','h','m'].includes(D.lv)?D.lv:'b';
D.gr=D.gr==7?7:6; /* lớp đang học: 6 hoặc 7 */
const LV={b:'🌱 Cơ bản',h:'🔥 Nâng cao',m:'🎲 Trộn'},
fa=a=>H(String(a).replace(/^-/,'−').replace(/^(−?\d+)\.(\d+)$/,'$1,$2')),
nm=s=>s.trim().replace(/\s/g,'').replace(/[−–]/g,'-').replace(',','.'),
chk=(s,a)=>{s=nm(s);return a.includes('/')?s===a:s!==''&&Math.abs(Number(s)-Number(a))<1e-9},
unl=id=>(D.b[id]||0)>=2,
pool=t=>D.lv=='h'&&t.h?t.h:D.lv=='m'?[...t.g,...(t.h&&unl(t.id)?t.h:[])]:t.g,
key=id=>id+(D.lv=='h'?'h':''),
go=(id,lv)=>{D.lv=lv;save();start(id)};
