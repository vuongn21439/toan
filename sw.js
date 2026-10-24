/* Toán 6 Vui Vẻ: cho phép mở lại khi mất mạng. Đổi V mỗi khi muốn ép máy học sinh tải bản mới. */
const V='t6-v4',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'],
HOSTS=['fonts.googleapis.com','fonts.gstatic.com','cdn.jsdelivr.net','www.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!='GET')return;
 if(u.origin!=location.origin&&!HOSTS.includes(u.hostname))return; /* Firestore, đăng nhập: luôn đi thẳng ra mạng */
 if(r.mode=='navigate'){ /* mở app: ưu tiên bản mới nhất, mất mạng thì dùng bản đã lưu */
  e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put('index.html',y));return x}).catch(()=>caches.match('index.html').then(x=>x||caches.match('./'))));return}
 e.respondWith(caches.match(r).then(hit=>{ /* ảnh, font, thư viện: dùng bản đã lưu, âm thầm cập nhật nền */
  const net=fetch(r).then(x=>{if(x.ok||x.type=='opaque'){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>hit||Response.error());
  return hit||net}))});
