/* Toán Vui Vẻ (Toán THCS): cho phép mở lại khi mất mạng. Đổi V mỗi khi muốn ép máy học sinh tải bản mới. */
const V='thcs-v2',SHELL=['./', 'index.html', 'manifest.webmanifest', 'css/style.css', 'js/core/helpers.js', 'js/data/grade6/topics.js', 'js/data/grade6/q1-co-ban.js', 'js/data/grade6/q2-nang-cao.js', 'js/data/grade6/q3-hinh-ve.js', 'js/data/grade6/q4-bo-sung.js', 'js/data/grade6/curriculum.js', 'js/data/grade6/q5-chuong-trinh.js', 'js/data/grade6/q6-boi-duong.js', 'js/data/grade7/helpers.js', 'js/data/grade7/topics.js', 'js/data/grade7/algebra.js', 'js/data/grade7/geometry.js', 'js/data/grade7/statistics.js', 'js/data/grade7/advanced.js', 'js/data/grade7/advanced2.js', 'js/data/grades.js', 'js/audio/sound.js', 'js/app/state.js', 'js/app/hub.js', 'js/app/grade.js', 'js/app/install.js', 'js/app/game.js', 'js/app/account.js', 'js/app/boot.js', 'js/fx/confetti.js', 'js/fx/background3d.js', 'js/firebase/firebase.js', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png', 'assets/icons/apple-touch-icon.png'],
HOSTS=['fonts.googleapis.com','fonts.gstatic.com','cdn.jsdelivr.net','www.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!='GET')return;
 if(u.origin!=location.origin&&!HOSTS.includes(u.hostname))return; /* Firestore, đăng nhập: luôn đi thẳng ra mạng */
 if(u.origin==location.origin&&/\.(js|css)$/.test(u.pathname)){ /* mã nguồn: ưu tiên bản mới, mất mạng thì dùng bản đã lưu (tránh lẫn bản cũ/mới giữa các file) */
  e.respondWith(fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r)));return}
 if(r.mode=='navigate'){ /* mở app: ưu tiên bản mới nhất, mất mạng thì dùng bản đã lưu */
  e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put('index.html',y));return x}).catch(()=>caches.match('index.html').then(x=>x||caches.match('./'))));return}
 e.respondWith(caches.match(r).then(hit=>{ /* ảnh, font, thư viện: dùng bản đã lưu, âm thầm cập nhật nền */
  const net=fetch(r).then(x=>{if(x.ok||x.type=='opaque'){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>hit||Response.error());
  return hit||net}))});
