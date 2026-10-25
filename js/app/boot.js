const _home=home;home=t=>{if(!D.gp){pickGrade();return}_home(t);Snd.music('home');gx('tint',GRADES[D.gr].c);if(U&&$('mini'))mini()};
shell('<div class="card soft"><div class="cap">🔌</div><p>Đang kết nối…</p></div>');
setTimeout(()=>{if(!window.FB)offline()},8000);
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
