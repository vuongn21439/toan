/* ===== Cài app lên máy: Android bấm là cài luôn · iPhone/iPad có hướng dẫn từng bước bằng hình ===== */
let DP=null,INS_BUSY=0,INS_W=null,INS_D=0,INS_T=0;
const iUA=navigator.userAgent||'',
isApp=()=>matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: fullscreen)').matches||navigator.standalone===true,
isAnd=/android/i.test(iUA),
isIOS=!isAnd&&(/iphone|ipad|ipod/i.test(iUA)||(navigator.platform=='MacIntel'&&navigator.maxTouchPoints>1&&'standalone' in navigator)),
isPad=isIOS&&!/iphone|ipod/i.test(iUA),
isMob=isAnd||isIOS||(matchMedia('(pointer:coarse)').matches&&!matchMedia('(hover:hover)').matches),
iApp=(isAnd&&/; wv\)|FBAN|FBAV|FB_IAB|Instagram|Zalo|Line\/|MicroMessenger|TikTok|musical_ly|Snapchat/i.test(iUA))||(isIOS&&!/Safari\//.test(iUA)),
isSaf=isIOS&&!iApp&&!/CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(iUA),
isChr=isAnd&&!iApp&&/Chrome\/\d/.test(iUA)&&!/EdgA|OPR\/|SamsungBrowser|MiuiBrowser|HeyTap|VivoBrowser|HuaweiBrowser|UCBrowser|Firefox|Vivaldi|Coc/i.test(iUA),
hasEv='onbeforeinstallprompt' in window||'BeforeInstallPromptEvent' in window,
insHas=()=>{try{return localStorage.getItem('t6inst')=='1'}catch(e){return false}},
canIns=()=>!isApp()&&!insHas()&&(!!DP||isMob),
hasNav=()=>!!document.querySelector('.nav'),
insRedo=()=>{if(!hasNav())return;const y=scrollY;home(TAB);scrollTo(0,y)},
insBusy=on=>document.querySelectorAll('[data-ins]').forEach(b=>{if(on){b.dataset.h=b.innerHTML;b.innerHTML='⏳ Đang chuẩn bị…';b.disabled=true}else if(b.dataset.h){b.innerHTML=b.dataset.h;b.disabled=false}}),
insWait=ms=>DP?Promise.resolve():new Promise(r=>{const t=setTimeout(()=>{INS_W=null;r()},ms);INS_W=()=>{clearTimeout(t);INS_W=null;r()}}),
insLater=()=>{D.ins=Date.now()+7*864e5;save();insRedo()},
insBtn=(c,h)=>`<button class="${c}" data-ins onclick="insNow()">${h}</button>`,
insCard=()=>canIns()&&D.xp>0&&!(D.ins>Date.now())?`<div class="ins"><img src="assets/icons/icon-192.png" alt="" width="52" height="52"><div class="tx"><b>Cài Toán THCS lên máy nhé!</b><small>Mở như app thật, chơi được cả khi mất mạng</small></div><div class="ib">${insBtn('go','📲 Cài ngay')}<button class="later" onclick="insLater()">Để sau</button></div></div>`:'',
insRow=()=>canIns()?insBtn('big alt','📲 Cài app lên máy<small>Mở nhanh từ màn hình chính, chơi cả khi mất mạng</small>'):'';
addEventListener('beforeinstallprompt',e=>{e.preventDefault();const was=canIns();DP=e;try{localStorage.removeItem('t6inst')}catch(x){}if(INS_W)INS_W();if(canIns()!=was)insRedo()});
addEventListener('appinstalled',()=>{DP=null;insDone()});
function insToast(m){
 let t=document.getElementById('tst');
 if(!t){t=document.createElement('div');t.id='tst';t.className='tst';t.setAttribute('role','status');document.body.appendChild(t)}
 t.textContent=m;t.hidden=false;clearTimeout(INS_T);INS_T=setTimeout(()=>{t.hidden=true},4500);
}
function insDone(){
 try{localStorage.setItem('t6inst','1')}catch(e){}
 if(INS_D)return;INS_D=1;setTimeout(()=>{INS_D=0},4000);
 cf('burst',innerWidth/2,innerHeight*.4,70);
 insToast('Cài xong rồi! Em ra màn hình chính tìm biểu tượng Toán THCS nhé 🎉');insRedo();
}
/* Bấm "Cài": Android/Chrome hiện hộp cài đặt luôn; chưa sẵn sàng thì chờ vài giây; không cài thẳng được thì mở hướng dẫn */
async function insNow(){
 if(INS_BUSY)return;
 if(!DP&&!isIOS&&hasEv&&performance.now()<30000){INS_BUSY=1;insBusy(1);await insWait(3000);INS_BUSY=0;insBusy(0)}
 DP?insGo():insGuide();
}
async function insGo(){
 const p=DP;DP=null;
 try{await p.prompt()}catch(e){return insGuide()}
 let r;try{r=await p.userChoice}catch(e){}
 if(r&&r.outcome=='accepted')insDone();
 else{D.ins=Date.now()+3*864e5;save();insRedo()}
}
function insChrome(){
 const s=location.protocol.slice(0,-1);
 location.href='intent://'+location.host+location.pathname+location.search+'#Intent;scheme='+s+';package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(location.href.split('#')[0])+';end';
}
async function insCopy(){
 const u=location.href.split('#')[0];let ok=0;
 try{await navigator.clipboard.writeText(u);ok=1}catch(e){
  try{const t=document.createElement('textarea');t.value=u;t.style.cssText='position:fixed;opacity:0';document.body.appendChild(t);t.select();ok=document.execCommand('copy');t.remove()}catch(x){}
 }
 insToast(ok?'Đã sao chép! Em dán vào '+(isIOS?'Safari':'Chrome')+' để mở nhé 👍':'Em bấm giữ vào thanh địa chỉ để sao chép liên kết nhé');
}
function insGuide(){
 const sv=p=>`<svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`,
 SH=sv('<path d="M12 15V3M8 7l4-4 4 4M7 11H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1"/>'),
 PL=sv('<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M12 8v8M8 12h8"/>'),
 st=(n,t,m)=>`<div class="st"><i>${n}</i><span>${t}${m?`<em class="mk">${m}</em>`:''}</span></div>`,
 chrome=c=>`<button class="${c}" onclick="insChrome()">🌐 Mở bằng Chrome<small>Cài được ngay chỉ với một chạm</small></button>`,
 copy=`<button class="big alt" onclick="insCopy()">🔗 Sao chép liên kết<small>Rồi dán vào ${isIOS?'Safari':'Chrome'} để mở</small></button>`,
 head=`<div class="top"><button class="x" aria-label="Quay lại" onclick="home()">←</button><b class="lvl">Cài lên màn hình chính</b></div>`,
 icon=`<img src="assets/icons/icon-192.png" alt="" width="84" height="84" style="border-radius:22px">`;
 let body='',after='',arrow='';
 if(isIOS){
  if(iApp)body+=`<p class="nt">Em đang mở trong một ứng dụng khác (Zalo, Facebook...). Em mở trang này bằng <b>Safari</b> trước nhé.</p>`;
  else if(!isSaf)body+=`<p class="nt">Dùng <b>Safari</b> thì cài dễ nhất nhé.</p>`;
  body+=st(1,isPad?'Bấm nút <b>Chia sẻ</b> ở góc trên của Safari':'Bấm nút <b>Chia sẻ</b> ở thanh dưới cùng của Safari<small>Chỉ thấy nút ⋯ thì bấm ⋯ rồi chọn Chia sẻ</small>',SH+'Chia sẻ')
   +st(2,'Kéo xuống, chọn <b>Thêm vào Màn hình chính</b><small>Không thấy thì kéo lên hết danh sách hoặc bấm Xem thêm</small>',PL+'Thêm vào Màn hình chính')
   +st(3,'Bấm <b>Thêm</b>. Biểu tượng Toán THCS sẽ hiện ra trên màn hình chính 🎉','<b style="color:#0a84ff">Thêm</b>');
  after=iApp?copy:'';
  if(isSaf)arrow=isPad?`<div class="pt up"><b>⬆</b>Nút Chia sẻ ở trên này</div>`:`<div class="pt dn">Thanh công cụ của Safari ở dưới này<b>⬇</b></div>`;
 }else if(iApp){
  body=`<p class="nt">Em đang mở trong một ứng dụng khác nên chưa cài được. Em mở bằng <b>Chrome</b> là cài được ngay nhé!</p>`;
  after=chrome('big')+copy;
 }else{
  body=st(1,'Bấm nút menu của trình duyệt ở góc màn hình','⋮ hoặc ≡')
   +st(2,'Chọn <b>Cài đặt ứng dụng</b> hoặc <b>Thêm vào Màn hình chính</b>',PL+'Cài đặt ứng dụng')
   +st(3,'Bấm <b>Cài đặt</b> (hoặc <b>Thêm</b>). Biểu tượng Toán THCS sẽ hiện ra trên màn hình chính 🎉','<b style="color:#0a84ff">Cài đặt</b>');
  after=isChr?'':chrome('big alt');
 }
 app.innerHTML=head+`<div class="card soft gd">${icon}<h2 style="margin-top:10px">${iApp?'Gần xong rồi!':'3 bước là xong!'}</h2>${body}${iApp?'':'<p class="hint" style="margin:12px 0 0">Đã cài rồi? Em mở Toán THCS ở màn hình chính để chơi như app thật nhé!</p>'}</div>${after}${iApp?'':'<button class="big" onclick="home()">Đã hiểu 👍</button>'}${arrow}`;
 scrollTo(0,0);
}
