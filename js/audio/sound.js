/* ===== v7: ÂM THANH — tổng hợp bằng WebAudio, không cần file nhạc (chạy cả khi mất mạng) =====
   Nhạc nền: 3 phong cách, đổi tông theo chủ đề; đúng liên tiếp càng nhiều nhạc càng "dày" (combo ≥2 thêm nhịp, ≥3 thêm giai điệu, ≥5 lên tông).
   Hiệu ứng: bấm nút, chuyển tab, vào bài, đúng (cao dần theo combo), sai (nhẹ nhàng), sao, XP, lên cấp, fanfare kết quả. Nhạc tự nhỏ lại khi có hiệu ứng lớn. */
const Snd=(()=>{
 const num=(v,d)=>typeof v=='number'&&isFinite(v)?Math.max(0,Math.min(1,v)):d,
 cfg=()=>({sfx:D.snd!==0,mus:D.mus!==0,mv:num(D.mv,.6),sv:num(D.sv,.8),st:[0,1,2].includes(D.ms)?D.ms:0}),
 mf=m=>440*2**((m-69)/12),
 PR=[[0,[0,4,7]],[9,[0,3,7]],[5,[0,4,7]],[7,[0,4,7]]], /* C – Am – F – G */
 MA=[[7,-1,9,-1,12,-1,9,7],[9,-1,12,-1,16,-1,12,9],[12,-1,9,-1,7,-1,9,12],[14,-1,12,-1,9,7,9,-1]],
 MB=[[12,-1,14,-1,16,14,12,-1],[9,-1,12,9,7,-1,9,-1],[12,9,-1,12,14,-1,12,-1],[14,-1,12,-1,7,-1,-1,-1]],
 BPM=[104,84,92],ROOTS=[0,2,3,5,7,-2];
 let ac,out,sg,mg,tg,dk,rev,nb,timer=0,trk=null,want=null,step=0,nt=0,lvl=0,lf=0,lx=0;
 const ctx=()=>{
  if(ac)return ac;
  const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;
  try{navigator.audioSession&&(navigator.audioSession.type='playback')}catch(e){}
  ac=new A();
  const cp=ac.createDynamicsCompressor(),mk=()=>ac.createGain();
  cp.threshold.value=-16;cp.ratio.value=4;cp.attack.value=.004;cp.release.value=.2;
  out=mk();out.connect(cp);cp.connect(ac.destination);
  sg=mk();mg=mk();tg=mk();dk=mk();
  sg.connect(out);tg.connect(dk);dk.connect(mg);mg.connect(out);
  const L=ac.sampleRate*1.3|0,ir=ac.createBuffer(2,L,ac.sampleRate);
  for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*(1-i/L)**3}
  rev=ac.createConvolver();rev.buffer=ir;const w1=mk(),w2=mk(),wo=mk();w1.gain.value=.3;w2.gain.value=.18;wo.gain.value=.7;
  sg.connect(w1);w1.connect(rev);tg.connect(w2);w2.connect(rev);rev.connect(wo);wo.connect(out);
  nb=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);const nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
  ac.onstatechange=()=>sync();vols();
  return ac},
 vols=()=>{if(!ac)return;const c=cfg(),t=ac.currentTime;sg.gain.setTargetAtTime(c.sfx?c.sv*1.5:0,t,.02);mg.gain.setTargetAtTime(c.mus?c.mv*.45:0,t,.05)},
 env=(g,t,a,d,v)=>{g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d)},
 tone=(f,t,d,o={})=>{const s=ac.createOscillator(),g=ac.createGain(),a=o.a||.008;let n=g;
  s.type=o.ty||'sine';s.frequency.setValueAtTime(f,t);if(o.to)s.frequency.exponentialRampToValueAtTime(o.to,t+d);if(o.det)s.detune.value=o.det;
  env(g,t,a,d,o.v||.1);s.connect(g);
  if(o.lp){const l=ac.createBiquadFilter();l.type='lowpass';l.frequency.value=o.lp;g.connect(l);n=l}
  n.connect(o.bus||sg);s.start(t);s.stop(t+a+d+.05)},
 nse=(t,d,o={})=>{const s=ac.createBufferSource(),g=ac.createGain(),f=ac.createBiquadFilter(),a=o.a||.002;
  s.buffer=nb;f.type=o.ty||'highpass';f.frequency.setValueAtTime(o.f||6000,t);if(o.to)f.frequency.exponentialRampToValueAtTime(o.to,t+d);f.Q.value=o.q||.7;
  env(g,t,a,d,o.v||.05);s.connect(f);f.connect(g);g.connect(o.bus||sg);s.start(t,Math.random()*.4);s.stop(t+a+d+.05)},
 bell=(m,t,d,v)=>{const f=mf(m);tone(f,t,d,{v});tone(f*2.01,t,d*.5,{v:v*.35});tone(f*3.99,t,d*.2,{v:v*.12})},
 pad=(ms,t,d,v)=>ms.forEach((m,i)=>tone(mf(m),t,d,{ty:'triangle',v,a:.03,lp:2000,det:i*4-4})),
 duck=(d,lv=.4)=>{const t=ac.currentTime;dk.gain.cancelScheduledValues(t);dk.gain.setTargetAtTime(lv,t,.02);dk.gain.setTargetAtTime(1,t+d,.3)},
 SX={
  tap:t=>tone(1000,t,.05,{ty:'triangle',v:.06,to:650}),
  tab:t=>{tone(620,t,.07,{v:.07});tone(930,t+.05,.1,{v:.06})},
  next:t=>nse(t,.14,{ty:'bandpass',f:1000,to:2800,q:1.4,v:.05}),
  start:t=>{nse(t,.3,{ty:'bandpass',f:350,to:3200,q:2,v:.08,a:.06});[67,72,76].forEach((m,i)=>bell(m,t+.2+i*.07,.4,.09))},
  ok:(t,c=1)=>{const m=[72,74,76,79,81,84,86,88][Math.min(Math.max(c-1,0),7)];
   bell(m,t,.45,.12);bell(m+7,t+.09,.55,.11);
   if(c>=3){bell(m+12,t+.18,.6,.09);nse(t+.1,.3,{f:6000,v:.025})}
   if(c>=5){bell(m+16,t+.27,.7,.08);tone(110,t,.3,{v:.14,to:50});duck(.7,.5)}},
  bad:t=>{tone(311,t,.26,{ty:'triangle',v:.12,to:233,lp:900});tone(233,t+.12,.34,{ty:'triangle',v:.11,to:175,lp:800})},
  star:(t,k=0)=>{bell([79,84,88][k]||88,t,.7,.12);nse(t,.18,{f:7000,v:.03})},
  coin:t=>{tone(988,t,.08,{ty:'triangle',v:.09});tone(1319,t+.07,.3,{ty:'triangle',v:.09})},
  lvl:t=>{duck(2);[72,76,79,84,88,91].forEach((m,i)=>bell(m,t+i*.08,.7,.1));pad([60,64,67,72],t+.4,1.4,.07)},
  win:(t,s=1)=>{duck(2.4,.25);s=Math.min(s,3);const N=[[60,64,67],[60,64,67,72],[67,72,76,79,84],[60,64,67,72,76,79,84,88]][s],g=[.14,.1,.09,.075][s],e=t+N.length*g;
   N.forEach((m,i)=>bell(m,t+i*g,.7,.1+s*.01));
   if(s>=2){pad([60,64,67,72,76],e,1.6,.07);nse(e,.5,{f:5000,v:.03})}
   if(s>=3){tone(110,t,.4,{v:.2,to:45});tone(110,e,.5,{v:.18,to:45})}}
 },
 sfx=(n,...a)=>{if(!SX[n]||!cfg().sfx)return;const A=ctx();if(!A)return;const now=performance.now();if(n=='tap'&&now-lx<130)return;lx=now;try{SX[n](A.currentTime+.012,...a)}catch(e){}},
 /* nhạc nền: lưới 16 bước/ô nhịp, 8 ô nhịp (A rồi B). Lớp nhạc dày dần theo lvl (= số câu đúng liên tiếp) khi đang làm bài */
 play=(s,t)=>{
  if(!(s&15))lf=trk.q&&lvl>=5?2:0;
  const c=cfg(),st=s&15,bar=s>>4&7,ph=bar&3,[b,cs]=PR[ph],q=trk.q,sty=c.st,r=trk.root+lf,cb=b>6?b-12:b,
   hi=!q||lvl>=2,mel=sty!=2&&(!q||lvl>=3),dr=sty!=2,sd=60/(BPM[sty]+(q?8:0))/4;
  if([0,6,8,14].includes(st))tone(mf(36+r+b),t,st%8?.18:.5,{ty:'triangle',v:.17,lp:520,bus:tg});
  if(st==0)cs.forEach((i,k)=>tone(mf(60+r+cb+i),t,sd*15,{ty:'triangle',v:.045,a:.06,lp:1500,bus:tg,det:k*3-3}));
  if(hi&&!(st&1))tone(mf(72+r+cb+cs[[0,1,2,1][st>>1&3]]),t,.2,{ty:'triangle',v:.04,lp:2400,bus:tg});
  if(dr){
   if(st==0||st==8||(sty==0&&st==10))tone(130,t,.16,{v:.22,to:42,bus:tg});
   if(st==4||st==12)nse(t,.09,{ty:'bandpass',f:1900,q:1,v:q?.04:.05,bus:tg});
   if(hi&&!(st&1))nse(t,.03,{f:8500,v:.02,bus:tg})}
  if(mel&&!(st&1)){const n=(bar<4?MA:MB)[ph][st>>1];if(n>=0){tone(mf(60+r+n),t,.4,{ty:'triangle',v:.075,lp:3200,bus:tg});tone(mf(72+r+n),t,.22,{v:.022,bus:tg})}}},
 tick=()=>{try{if(!ac||!trk||ac.state!='running')return;const sd=60/(BPM[cfg().st]+(trk.q?8:0))/4;while(nt<ac.currentTime+.25){play(step,nt);nt+=sd;step++}}catch(e){}},
 run=()=>{if(timer)return;nt=ac.currentTime+.08;timer=setInterval(tick,50)},
 halt=()=>{clearInterval(timer);timer=0},
 sync=()=>{if(!ac)return;vols();if(cfg().mus&&want&&!document.hidden&&ac.state=='running'){if(!timer){trk=want;step=0;lf=0;run()}}else halt()},
 music=(name,o={})=>{
  const w={name,q:name=='quiz',root:ROOTS[(o.k|0)%6]};
  if(trk&&trk.name==name){trk.root=w.root;want=trk;return}
  want=w;if(!ac)return;
  const t=ac.currentTime;tg.gain.cancelScheduledValues(t);
  if(!timer){trk=null;tg.gain.setValueAtTime(1,t);sync();return}
  tg.gain.setTargetAtTime(0,t,.07); /* nhạc cũ nhỏ dần rồi mới vào bài mới */
  setTimeout(()=>{halt();trk=null;const n=ac.currentTime;tg.gain.cancelScheduledValues(n);tg.gain.setValueAtTime(1,n);sync()},260)},
 unlock=()=>{const a=ctx();if(!a)return;if(a.state=='running'){if(want&&!timer)sync();return}a.resume().then(()=>sync()).catch(()=>{})},
 icon=()=>{const c=cfg();return!c.mus&&!c.sfx?'🔇':'🎵'},
 SW=(k,on,t)=>`<div class="sn-r"><b>${t}</b><button class="sn-w${on?' on':''}" data-t="${k}" role="switch" aria-checked="${on}" aria-label="${t}"></button></div>`,
 menu=()=>{
  const old=document.getElementById('snd');
  if(old){old.remove();document.querySelectorAll('.sn-i').forEach(e=>e.textContent=icon());return}
  const c=cfg(),m=document.createElement('div');m.id='snd';
  m.innerHTML=`<div class="sn-b"></div><div class="sn-p" role="dialog" aria-label="Âm thanh"><div class="sn-h"><span>🎵 Âm thanh</span><button data-x aria-label="Đóng">✕</button></div>${SW('mus',c.mus,'🎶 Nhạc nền')}<input class="sn-v" type="range" min="0" max="100" value="${Math.round(c.mv*100)}" data-v="mv" aria-label="Âm lượng nhạc nền">${SW('snd',c.sfx,'🔔 Hiệu ứng âm thanh')}<input class="sn-v" type="range" min="0" max="100" value="${Math.round(c.sv*100)}" data-v="sv" aria-label="Âm lượng hiệu ứng"><div class="sn-r"><b>Phong cách nhạc</b></div><div class="sn-g">${['🎈 Vui nhộn','☕ Thư giãn','🧠 Tập trung'].map((n,i)=>`<button data-s="${i}" class="${c.st==i?'on':''}">${n}</button>`).join('')}</div></div>`;
  m.onclick=e=>{const b=e.target.closest('button');
   if(e.target.classList.contains('sn-b')||(b&&b.hasAttribute('data-x')))return menu();
   if(!b)return;
   if(b.dataset.t){const on=!b.classList.contains('on');D[b.dataset.t]=on?1:0;b.classList.toggle('on',on);b.setAttribute('aria-checked',on);save();unlock();sync();if(b.dataset.t=='snd'&&on)sfx('ok',1)}
   else if(b.dataset.s){D.ms=+b.dataset.s;save();m.querySelectorAll('[data-s]').forEach(x=>x.classList.toggle('on',x==b));unlock();sync()}};
  m.oninput=e=>{const k=e.target.dataset.v;if(!k)return;D[k]=e.target.value/100;save();vols()};
  m.onchange=e=>{if(e.target.dataset.v=='sv')sfx('ok',1)};
  document.body.appendChild(m)};
 /* trình duyệt chỉ cho phát tiếng sau khi người dùng chạm: mở khoá ở lần chạm đầu, rồi bật nhạc đang chờ */
 ['pointerdown','touchend','keydown','click'].forEach(e=>addEventListener(e,unlock,{passive:true,capture:true}));
 addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button');if(!b||b.classList.contains('o'))return;sfx(b.closest('.nav')?'tab':b.closest('.fb')?'next':'tap')});
 document.addEventListener('visibilitychange',()=>{if(!ac)return;if(document.hidden){halt();ac.suspend()}else ac.resume().then(()=>sync()).catch(()=>{})});
 return{sfx,music,menu,icon,ans:(ok,c)=>{lvl=ok?c|0:0;sfx(ok?'ok':'bad',c)},lvl:n=>{lvl=n|0},win:s=>sfx('win',s)}})();
const fx=(ok,c)=>{try{navigator.vibrate&&navigator.vibrate(ok?15:[40,40,40])}catch(e){}Snd.ans(ok,c)};
