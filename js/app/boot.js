const _home=home;home=t=>{if(!D.gp){pickGrade();return}_home(t);Snd.music('home');gx('tint',GRADES[D.gr].c);if(U&&$('mini'))mini()};
shell('<div class="card soft"><div class="cap">🔌</div><p>Đang kết nối…</p></div>');
/* v5: chỉ báo 'chưa kết nối' nếu em vẫn đang ở màn hình chờ; không giật màn hình khi em đã vào chơi offline */
setTimeout(()=>{const c=document.querySelector('#app .cap,.cap');if(!window.FB&&c&&c.textContent.trim()=='🔌')offline()},8000);
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
