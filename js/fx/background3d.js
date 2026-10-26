/* ===== Nền 3D (three.js): tải trễ sau khi game đã hiện. Lỗi mạng / không có WebGL → giữ nguyên nền CSS ===== */
const cv=document.getElementById('bg'),
lowEnd=(navigator.hardwareConcurrency||4)<=4||(navigator.deviceMemory||4)<=2,
still=matchMedia('(prefers-reduced-motion:reduce)').matches,
rnd=(a,b)=>a+Math.random()*(b-a);
async function boot(){
 let T3,r;
 try{
  T3=await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js');
  r=new T3.WebGLRenderer({canvas:cv,alpha:true,antialias:false,powerPreference:'low-power'});
 }catch(e){cv.remove();return}
 await Promise.race([document.fonts&&document.fonts.ready,new Promise(s=>setTimeout(s,1200))]);
 r.setPixelRatio(Math.min(devicePixelRatio||1,lowEnd?1:1.5));
 const sc=new T3.Scene(),cam=new T3.PerspectiveCamera(50,1,.1,100),grp=new T3.Group(),TH=Math.tan(25*Math.PI/180);
 cam.position.z=16;sc.add(grp);
 const hemi=new T3.HemisphereLight(0xcfd8ff,0x2a1470,1.7),key=new T3.DirectionalLight(0xffffff,2.6);
 key.position.set(4,6,9);sc.add(hemi,key);

 /* Hình khối đa diện: dùng chung geometry/material cho nhẹ bộ nhớ */
 const geos=[new T3.IcosahedronGeometry(1,0),new T3.OctahedronGeometry(1.15,0),new T3.TetrahedronGeometry(1.25,0),new T3.DodecahedronGeometry(1,0),new T3.BoxGeometry(1.4,1.4,1.4),new T3.TorusGeometry(.8,.3,10,20),new T3.ConeGeometry(.95,1.7,4)],
 pal=[0x7a5cff,0xff5d73,0xffd25e,0x35e0a1,0x4cc9ff,0xff8ad8,0xff9f43],
 mats=pal.map(c=>new T3.MeshStandardMaterial({color:c,roughness:.5,metalness:.05,flatShading:true,transparent:true,opacity:.9})),
 NM=lowEnd?8:13,NG=lowEnd?7:12,items=[];
 const add=(o,s0,s1,glyph)=>{o.userData={s:rnd(s0,s1),x:rnd(-1.2,1.2),y:rnd(-1.2,1.2),z:rnd(-7,1),vx:rnd(-.2,.2),vy:rnd(.015,.05),rx:rnd(-.6,.6),ry:rnd(-.8,.8),ph:rnd(0,6.28),g:glyph};grp.add(o);items.push(o)};
 for(let i=0;i<NM;i++)add(new T3.Mesh(geos[i%geos.length],mats[(i*3)%mats.length]),.55,1.3,false);

 /* Kí hiệu toán học: vẽ một lần lên canvas nhỏ → texture → Sprite */
 const glyphs=['π','+','−','×','÷','=','√','%','²','∞','7','½'],gcols=['#ffd25e','#4cc9ff','#ff8ad8','#35e0a1','#ffffff'],
 gm=(ch,col)=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
  g.font='800 96px "Baloo 2",system-ui,sans-serif';g.textAlign='center';g.textBaseline='middle';g.shadowColor=col;g.shadowBlur=14;g.fillStyle='#fff';g.fillText(ch,64,68);
  const t=new T3.CanvasTexture(c);t.colorSpace=T3.SRGBColorSpace;return new T3.SpriteMaterial({map:t,color:col,transparent:true,opacity:.55,depthWrite:false})};
 for(let i=0;i<NG;i++)add(new T3.Sprite(gm(glyphs[i%glyphs.length],gcols[i%gcols.length])),1.1,2,true);

 /* Bụi sao: một draw call duy nhất */
 const NP=lowEnd?90:180,pa=new Float32Array(NP*3);
 for(let i=0;i<NP;i++){pa[i*3]=rnd(-24,24);pa[i*3+1]=rnd(-24,24);pa[i*3+2]=rnd(-14,-2)}
 const pg=new T3.BufferGeometry();pg.setAttribute('position',new T3.BufferAttribute(pa,3));
 const dust=new T3.Points(pg,new T3.PointsMaterial({color:0xffffff,size:.09,transparent:true,opacity:.55,depthWrite:false}));sc.add(dust);

 let last=0,run=false,raf=0,kick=0,bad=0,sy=0,ty=0,slow=0,tm=0;
 const col=new T3.Color(0xcfd8ff),tcol=new T3.Color(0xcfd8ff),white=new T3.Color(1,1,1);
 const update=s=>{
  tm+=s;kick*=Math.pow(.03,s);bad*=Math.pow(.02,s);sy+=(ty-sy)*Math.min(1,s*6);
  col.lerp(tcol,Math.min(1,s*3));hemi.color.copy(col);
  grp.position.y=Math.min(sy*.004,4);cam.position.x=Math.sin(tm*60)*bad*.3;
  for(const o of items){
   const d=o.userData,hy=TH*(16-d.z),hx=hy*cam.aspect;
   d.y+=d.vy*s*(1+kick*3);d.x+=d.vx*s*.1;
   if(d.y>1.25){d.y=-1.25;d.x=rnd(-1,1)}
   if(d.x>1.25)d.x=-1.25;else if(d.x<-1.25)d.x=1.25;
   o.position.set(d.x*hx,d.y*hy+Math.sin(tm*.8+d.ph)*.15,d.z);
   const k=d.s*(1+kick*.2);
   if(d.g){o.scale.set(k,k,1);o.material.rotation=Math.sin(tm*.5+d.ph)*.25}
   else{o.scale.setScalar(k);o.rotation.x+=d.rx*s*(1+kick*5);o.rotation.y+=d.ry*s*(1+kick*5)}
  }
  dust.rotation.z+=s*.01};
 const fit=()=>{r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();if(still){update(0);r.render(sc,cam)}};
 /* Giới hạn ~30fps (20fps máy yếu); nếu vẫn giật thì hạ độ phân giải, cuối cùng tắt hẳn 3D để game luôn mượt */
 const frame=t=>{raf=requestAnimationFrame(frame);const dt=t-last;if(dt<(lowEnd?45:30))return;last=t;
  if(dt>(lowEnd?90:60)){if(++slow>45){if(r.getPixelRatio()>1){r.setPixelRatio(1);fit();slow=0}else{halt();cv.style.display='none';return}}}else if(slow>0)slow--;
  update(Math.min(dt,100)/1000);r.render(sc,cam)};
 const go=()=>{if(run||still)return;run=true;last=performance.now();raf=requestAnimationFrame(frame)},
 halt=()=>{run=false;cancelAnimationFrame(raf)};
 document.addEventListener('visibilitychange',()=>document.hidden?halt():go());
 cv.addEventListener('webglcontextlost',e=>{e.preventDefault();halt();cv.style.display='none'});
 let rz=0;addEventListener('resize',()=>{cancelAnimationFrame(rz);rz=requestAnimationFrame(fit)});
 addEventListener('scroll',()=>{ty=scrollY},{passive:true});

 /* Cầu nối cho game: phản ứng đúng/sai, mừng chiến thắng, đổi sắc ánh sáng theo chủ đề */
 window.GFX={
  react(ok,combo=0){if(ok)kick=Math.min(1.8,.8+combo*.18);else bad=1},
  win(st=1){kick=1.2+st*.5},
  tint(hex){tcol.set(hex).lerp(white,.4)}
 };
 fit();update(0);r.render(sc,cam);cv.classList.add('on');go();
}
/* chờ trang vẽ xong + trình duyệt rảnh rồi mới tải three.js (~170KB gzip) */
const start=()=>(window.requestIdleCallback?requestIdleCallback(boot,{timeout:2500}):setTimeout(boot,500));
document.readyState=='complete'?start():addEventListener('load',start,{once:true});
