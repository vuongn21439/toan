/* Toán Vui Vẻ (Toán THCS): mở lại được khi mất mạng.
   v3: danh sách file lưu offline tự đọc từ index.html (thêm/xoá file script không cần sửa tay ở đây nữa).
   Đổi V mỗi khi muốn ép máy học sinh tải bản mới. */
const V='thcs-v3',
/* file không nằm trong index.html nhưng vẫn cần khi offline (icon trong manifest) */
EXTRA=['./','index.html','manifest.webmanifest','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/icon-maskable-512.png','assets/icons/apple-touch-icon.png'],
HOSTS=['fonts.googleapis.com','fonts.gstatic.com','cdn.jsdelivr.net','www.gstatic.com'];

/* đọc index.html lấy mọi <script src> / <link href> cùng máy chủ */
async function shell(){
 let found=[];
 try{const t=await(await fetch('index.html',{cache:'reload'})).text();
  found=[...t.matchAll(/(?:src|href)="((?!https?:|\/\/|data:|#)[^"]+)"/g)].map(m=>m[1])}catch(e){}
 return[...new Set([...EXTRA,...found])]}

/* cache:'reload' để không lấy nhầm bản cũ nằm trong cache HTTP của trình duyệt (tránh lẫn file cũ/mới). Thiếu file nào thì báo lỗi cài đặt để lần sau thử lại, không cài nửa vời */
self.addEventListener('install',e=>{e.waitUntil((async()=>{
 const c=await caches.open(V),list=await shell();
 await Promise.all(list.map(u=>c.add(new Request(u,{cache:'reload'}))));
 await self.skipWaiting()})())});

self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});

/* mạng trước (để luôn có bản mới và không lẫn file). Mất mạng, máy chủ lỗi, hoặc quá 6 giây thì dùng bản đã lưu.
   Chỉ lưu khi phản hồi OK nên trang lỗi/trang đăng nhập wifi công cộng không bị lưu nhầm thành index.html */
const netFirst=(r,key)=>caches.match(key||r).then(hit=>{
 const net=fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(V).then(c=>c.put(key||r,y))}
  return x.ok||x.type=='opaqueredirect'||!hit?x:hit}); /* opaqueredirect: để trình duyệt tự chuyển hướng, đừng trả bản cũ */
 return hit?Promise.race([net,new Promise(ok=>setTimeout(ok,6000,hit))]).catch(()=>hit):net});

self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);
 if(r.method!='GET')return;
 if(u.origin!=location.origin&&!HOSTS.includes(u.hostname))return; /* Firestore, đăng nhập: luôn đi thẳng ra mạng */
 if(u.origin==location.origin&&/\.(js|css)$/.test(u.pathname)){e.respondWith(netFirst(r));return}
 if(r.mode=='navigate'){e.respondWith(netFirst(r,'index.html').catch(()=>caches.match('./')));return}
 /* ảnh, font, thư viện: dùng bản đã lưu, âm thầm cập nhật nền */
 e.respondWith(caches.match(r).then(hit=>{
  const net=fetch(r).then(x=>{if(x.ok||x.type=='opaque'){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>hit||Response.error());
  return hit||net}))});
