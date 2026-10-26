/* ===== Pháo giấy: 90 hạt tái sử dụng (object pool), chỉ chạy rAF khi còn hạt đang bay ===== */
window.Confetti=(()=>{
 const N=90,cols=['#ffd25e','#35e0a1','#ff5d73','#7a5cff','#4cc9ff','#ff8ad8'],P=[],
 still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 let cv,cx,W=0,H=0,raf=0,last=0;
 const size=()=>{const d=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0)},
 init=()=>{cv=document.createElement('canvas');cv.id='fx';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);cx=cv.getContext('2d');
  for(let i=0;i<N;i++)P.push({l:0,x:0,y:0,vx:0,vy:0,r:0,vr:0,w:0,h:0,c:''});size();addEventListener('resize',size)},
 step=t=>{const dt=Math.min((t-last)/1000||.016,.05);last=t;cx.clearRect(0,0,W,H);let alive=0;
  for(const p of P){if(p.l<=0)continue;p.l-=dt;p.vy+=900*dt;p.vx*=1-1.2*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;
   if(p.l<=0||p.y>H+20){p.l=0;continue}
   alive++;cx.save();cx.globalAlpha=Math.min(1,p.l*2);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()}
  raf=alive?requestAnimationFrame(step):0;if(!alive)cx.clearRect(0,0,W,H)};
 return{burst(x,y,n=40){if(still)return;if(!cv)init();let k=0;
  for(const p of P){if(k>=n)break;if(p.l>0)continue;
   const a=-Math.PI/2+(Math.random()-.5)*2.2,v=380+Math.random()*520;
   p.l=1.4+Math.random()*.9;p.x=x;p.y=y;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;p.r=Math.random()*6;p.vr=(Math.random()-.5)*14;p.w=6+Math.random()*6;p.h=p.w*.6;p.c=cols[k++%cols.length]}
  if(!raf){last=performance.now();raf=requestAnimationFrame(step)}}}
})();
