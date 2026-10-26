/* ===== FIREBASE: đăng nhập (khách/Google), đặt tên không trùng, bảng xếp hạng ===== */
let U=null,ct,lbc={t:0,n:0,r:[]};
const $=id=>document.getElementById(id),
esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),
/* Chuẩn hoá tên để so trùng: bỏ dấu, bỏ khoảng trắng/ký tự lạ, không phân biệt hoa thường */
nk=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9]/g,''),
shell=h=>{app.innerHTML=`<header><h1>Toán Vui Vẻ</h1><p>Luyện đủ chương trình Toán lớp 6 và lớp 7, từ cơ bản đến nâng cao</p></header>${h}`;scrollTo(0,0)},
et=e=>{if(e&&e.code=='auth/popup-closed-by-user')return'';console.warn('[Firebase]',e);return e&&e.code=='auth/network-request-failed'?'Mạng đang yếu, em thử lại nhé!':'Ôi, chưa vào được rồi. Em thử lại nhé!'},
meChip=()=>U?`<div class="me"><div class="av">${esc([...U.name][0].toUpperCase())}</div><b>${esc(U.name)}${U.guest?' <small>(khách)</small>':''}</b><button onclick="lb()">🏆 Xếp hạng</button>${U.guest?'<button onclick="linkAcc()">Liên Kết TK</button>':''}</div><div id="mini"></div>`:'',
rows=r=>r.map((p,i)=>`<div class="lbr${U&&p.id==U.uid?' me1':''}${i<3?' t'+(i+1):''}"><span class="rk">${['🥇','🥈','🥉'][i]||i+1}</span><span class="nm">${esc(p.name)}</span><span class="xp">${p.xp|0} XP</span></div>`).join('')||'<p class="hint">Chưa có ai trên bảng. Em hãy là người đầu tiên!</p>';

const getTop=async n=>{if(Date.now()-lbc.t<45e3&&lbc.n>=n)return lbc.r.slice(0,n);const r=await FB.top(n);lbc={t:Date.now(),n,r};return r};
function loginScreen(m=''){shell(`<div class="card soft"><div class="cap">🎓</div><h2>Chào mừng em!</h2><p class="sub">Đăng nhập để lưu điểm và lên bảng xếp hạng.</p></div><button class="gbtn" onclick="doLogin('google')"><svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>Đăng nhập bằng Google</button><button class="big alt" onclick="doLogin('guest')">👤 Chơi với tư cách khách</button><p class="msg no" id="msg">${esc(m)}</p>`)}
async function doLogin(k){const m=$('msg');m.className='msg';m.textContent='Đang đăng nhập…';try{await FB.login(k)}catch(e){m.className='msg no';m.textContent=et(e)}}

function nameScreen(){shell(`<div class="card"><h2>Đặt tên hiển thị</h2><p class="sub">Tên phải <b>không trùng</b> với bạn khác (2–16 ký tự).</p></div><input id="nn" maxlength="16" autocomplete="off" placeholder="Ví dụ: Minh Khoa" oninput="chkName()"><p class="msg" id="msg"></p><button class="big" id="go" onclick="claim()" disabled>Vào game 🚀</button><button class="big alt" onclick="FB.logout()">← Đổi tài khoản</button>`);$('nn').focus()}
const cl=()=>$('nn').value.trim().replace(/\s+/g,' ');
/* Kiểm tra trùng tên khi gõ (debounce 400ms, bỏ kết quả cũ nếu đã gõ tiếp) */
function chkName(){const v=cl(),m=$('msg'),b=$('go');b.disabled=true;clearTimeout(ct);m.className='msg';
 if(nk(v).length<2){m.textContent=v?'Tên hơi ngắn, cần ít nhất 2 chữ cái/số':'';return}
 m.textContent='Đang kiểm tra…';
 ct=setTimeout(async()=>{try{const ok=await FB.free(nk(v));if(!$('nn')||cl()!==v)return;m.className='msg '+(ok?'ok':'no');m.textContent=ok?'✅ Tên này dùng được!':'❌ Tên đã có người dùng, chọn tên khác';b.disabled=!ok}catch(e){m.className='msg no';m.textContent=et(e)}},400)}
/* Chốt tên bằng transaction ở server: hai người bấm cùng lúc thì chỉ một người được */
async function claim(){const v=cl(),b=$('go'),m=$('msg');b.disabled=true;m.className='msg';m.textContent='Đang lưu…';try{await FB.claim(v,nk(v))}catch(e){m.className='msg no';m.textContent=e.message=='taken'?'❌ Vừa có bạn lấy mất tên này, chọn tên khác nhé':et(e);b.disabled=false}}

/* ===== Đồng bộ tiến độ giữa các máy (Firestore: progress/{uid}) =====
   Gộp theo nguyên tắc "bên nào tiến xa hơn thì giữ": sao = lớn nhất, độ chính xác = bên nhiều lượt hơn,
   thử thách ngày = ngày mới hơn, chuỗi ngày = bên có ngày chơi mới hơn. */
const PN=(x,lo,hi)=>Math.max(lo,Math.min(hi,+x||0)),
accOk=a=>Array.isArray(a)&&a[1]>0&&a[0]>=0&&a[0]<=a[1],
dcOk=d=>!!d&&d.k>0&&d.ok>=0,
dayMs=s=>{const t=Date.parse(s);return t>0?t:0},
progOf=()=>{const p={b:D.b,acc:D.acc,st:PN(D.st,0,3650)|0,day:D.day||''};if(D.dc)p.dc=D.dc;if(D.dc7)p.dc7=D.dc7;return p},
mergeProg=(a,r)=>{a=a||{};r=r||{};const o={b:{},acc:{}},A=a.b||{},R=r.b||{},Aa=a.acc||{},Ra=r.acc||{};
 for(const k of new Set([...Object.keys(A),...Object.keys(R)]))o.b[k]=Math.max(PN(A[k],0,3),PN(R[k],0,3))|0;
 for(const k of new Set([...Object.keys(Aa),...Object.keys(Ra)])){const x=Aa[k],y=Ra[k],g=accOk(x)&&(!accOk(y)||x[1]>=y[1])?x:accOk(y)?y:null;if(g)o.acc[k]=[g[0],g[1]]}
 for(const K of['dc','dc7']){const x=a[K],y=r[K],dc=dcOk(x)&&(!dcOk(y)||x.k>y.k||(x.k==y.k&&x.ok>=y.ok))?x:dcOk(y)?y:null;if(dc)o[K]={k:dc.k|0,ok:dc.ok|0}}
 const dx=dayMs(a.day),dy=dayMs(r.day),pk=dx>dy||(dx==dy&&PN(a.st,0,3650)>=PN(r.st,0,3650))?a:r;
 o.st=PN(pk.st,0,3650)|0;o.day=typeof pk.day=='string'?pk.day:'';return o},
applyProg=m=>{D.b=m.b;D.acc=m.acc;if(m.dc)D.dc=m.dc;if(m.dc7)D.dc7=m.dc7;D.st=m.st;D.day=m.day;save()};
function enter(p){
 /* Máy này đang giữ tiến độ của tài khoản khác thì bỏ đi, tránh lẫn sao/điểm giữa các tài khoản */
 if(D.uid&&D.uid!==p.uid){D.b={};D.acc={};D.xp=0;delete D.dc;delete D.dc7;delete D.st;delete D.day}
 D.uid=p.uid;U=p;D.name=p.name;D.xp=Math.max(D.xp,p.xp|0);
 applyProg(mergeProg(progOf(),p.prog));
 home();
 if(window.FB&&FB.push)FB.push(p.uid,progOf()).catch(()=>{})}
function offline(){shell(`<div class="card soft"><div class="cap">🌤️</div><h2>Chưa vào được bảng xếp hạng</h2><p>Mạng đang hơi yếu thôi. Em vẫn luyện tập bình thường nhé!</p></div><button class="big" onclick="U=null;home()">▶️ Vào chơi luôn</button><button class="big alt" onclick="location.reload()">🔄 Kết nối lại</button>`)}
async function lb(){app.innerHTML=`<div class="top"><button class="x" onclick="home()">←</button><h2 style="margin:0">🏆 Bảng xếp hạng</h2></div><div id="lbx" style="margin-top:12px"><p class="hint">Đang tải…</p></div>`;scrollTo(0,0);
 try{const r=await getTop(50);$('lbx')&&($('lbx').innerHTML=rows(r))}catch(e){$('lbx')&&($('lbx').innerHTML='<p class="hint">Không tải được bảng xếp hạng. Kiểm tra mạng rồi thử lại.</p>')}}
async function mini(){try{const r=await getTop(10),el=$('mini');if(el)el.innerHTML='<div class="mh">🏆 Top 10<button onclick="lb()">Xem top 50 ›</button></div>'+rows(r)}catch(e){}}
/* Liên kết tài khoản khách với Google: giữ nguyên uid nên điểm/sao/tên đều còn */
async function linkErr(e,quiet){
 if(!e)return;
 if(e.code=='auth/credential-already-in-use'){
  if(!confirm('Tài khoản Google này đã có tiến độ riêng rồi. Chuyển sang tài khoản Google đó nhé?\n\n⚠️ Điểm của tài khoản khách hiện tại sẽ KHÔNG được gộp sang.'))return;
  try{await FB.switchTo(e)}catch(x){alert(et(x)||'Chưa chuyển được, em thử lại nhé!')}return}
 if(quiet||e.code=='auth/cancelled-popup-request'){console.warn('[Firebase]',e);return}
 const m=et(e);if(m)alert(m)}
async function linkAcc(){if(!U||!U.guest)return;try{await FB.link()}catch(e){linkErr(e)}}
function out(){if(U&&U.guest&&!confirm('Tài khoản khách sẽ mất nếu thoát. Thoát thật không?'))return;FB.logout()}

/* Cầu nối cho module Firebase gọi vào */
window.T6_UI={out:()=>{U=null;loginScreen()},name:nameScreen,in:enter,fail:e=>{e&&console.warn('[Firebase]',e);offline()},
 merge:mergeProg,apply:m=>applyProg(mergeProg(progOf(),m)),linkErr,
 linked:()=>{if(U){U.guest=false;home();setTimeout(()=>alert('✅ Đã liên kết với Google! Tiến độ của em được lưu an toàn, đăng nhập Google trên máy khác là chơi tiếp được.'),60)}}};
