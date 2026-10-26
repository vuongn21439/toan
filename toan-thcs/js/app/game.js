/* Chủ đề em hay sai (theo lớp đang học) được ưu tiên hơn */
const weak=()=>{const G=gT(),w=G.map(t=>{const a=D.acc[t.id];return a?1+3*(1-a[0]/a[1]):2.5});let r=Math.random()*w.reduce((x,y)=>x+y,0);for(let i=0;i<G.length;i++){if((r-=w[i])<=0)return G[i]}return G[0]};

/* Thời gian thi (giây): daily 5 câu 8 phút, mock 15 câu 25 phút */
const EXAM_TIME={daily:8*60,mock:25*60};

function home(t){
 if(t)TAB=t;
 clearExamTimer();
 const body={learn:tabLearn,review:tabReview,mock:tabMock,daily:tabDaily,rank:tabRank}[TAB]();
 app.innerHTML=bar()+body+`<div style="height:84px"></div><nav class="nav" aria-label="Chuyển mục">${TABS.map(([k,e,n])=>`<button class="${TAB==k?'on':''}"${TAB==k?' aria-current="page"':''} onclick="home('${k}')"><b>${e}</b>${n}${k=='daily'&&!dcDone()?'<i></i>':''}</button>`).join('')}</nav>`;
 scrollTo(0,0);
}
function intro(id){
 const t=T.find(x=>x.id==id),ok=!t.h||unl(id),bs=D.b[id]||0;
 app.innerHTML=`<div class="top"><button class="x" aria-label="Về trang chủ" onclick="home()">←</button></div>
 <div class="card soft intro" style="--c:${t.c};--ci:${ink(t.c)}"><div class="bigic">${t.e}</div><h2>${t.n}</h2><small>${t.ch||(CD[t.id]?'Chủ đề '+CD[t.id]:'Tổng hợp')}</small><div class="tip">💡 ${H(t.tip)}</div></div>
 <button class="big" onclick="go('${id}','b')">🌱 Cơ bản · 10 câu<small>${XQ.b} XP/câu${bs?' · đang '+bs+'★':''}</small></button>
 ${t.h?`<button class="big alt"${ok?'':' disabled'} onclick="go('${id}','h')">${ok?'🔥 Nâng cao · 10 câu':'🔒 Nâng cao'}<small>${ok?XQ.h+' XP/câu':'Mở khi đạt 2★ phần Cơ bản'}</small></button>`:''}`;
 gx('tint',t.c);scrollTo(0,0);
}

function isExamMode(id){return id==='daily'||id in EX||id==='all'}

function start(id,ql){
 const t=T.find(x=>x.id==id),n=nq(id);let qs=ql;
 if(!qs){if(id=='daily')qs=dailyQs();else{qs=[];const s=new Set();let k=0;while(qs.length<n&&k++<300){const pid=P(EX[id]||gT().map(y=>y.id)),tp=t||(id=='smart'?weak():T.find(x=>x.id==pid)),q=P(pool(tp))();if(!s.has(q.q)&&(q.inp||q.w.length>=3)){s.add(q.q);q.t=tp.id;qs.push(q)}}}}
 const exam=isExamMode(id)&&!ql; /* chỉ thi thử + thử thách ngày mới dùng chế độ nộp bài */
 S={id,q:qs,i:0,ok:0,bad:[],rev:!!ql,m:XQ[mk(id)],k:key(id),cb:0,exam,ans:exam?new Array(qs.length).fill(null):null};if(exam){const sec=EXAM_TIME[id==='daily'?'daily':'mock']||1500;Object.assign(S,{flag:new Array(qs.length).fill(false),t0:Date.now(),end:Date.now()+sec*1000,day:dk(),gr:D.gr,tok:0});persistExam()}
 Snd.music('quiz',{k:t?T.indexOf(t):id=='daily'?5:id=='smart'?2:3});Snd.lvl(0);Snd.sfx('start');
 if(exam){showExam();startExamTimer()}else show();
}

/* ===== CHẾ ĐỘ LUYỆN TẬP (có feedback ngay) ===== */
function show(){
 const q=S.q[S.i],tp=T.find(x=>x.id==q.t),c=tp?tp.c:'#7a5cff';S.o=sh([q.a,...q.w]);S.d=0;
 app.style.setProperty('--c',c);app.style.setProperty('--ci',ink(c));gx('tint',c);
 const two=!q.inp&&S.o.every(v=>String(v).length<=11);
 app.innerHTML=`<div class="top"><button class="x" aria-label="Thoát bài" onclick="quit()">✕</button><div class="pb" role="progressbar" aria-valuemin="0" aria-valuemax="${S.q.length}" aria-valuenow="${S.i}"><u></u></div><button class="x" aria-label="Âm thanh" onclick="Snd.menu()"><span class="sn-i">${Snd.icon()}</span></button><span class="cn">${S.i+1}/${S.q.length}</span></div>
 <div class="card"><div class="qh"><span class="qn">Câu ${S.i+1}</span>${S.cb>=2?`<span class="combo">🔥 Liên tiếp ×${S.cb}</span>`:''}</div><div class="q">${H(q.q)}</div>${q.f||''}</div>`+(q.inp?
 `<input id="in" autocomplete="off" placeholder="Nhập đáp án…" onkeydown="event.key=='Enter'&&sub()"><button class="big" onclick="sub()">Kiểm tra ✓</button><p class="hint">Phân số viết dạng a/b đã rút gọn; số thập phân dùng dấu phẩy.</p>`:
 `<div class="opts${two?' two':''}">${S.o.map((v,k)=>`<button class="o" onclick="pick(${k})"><span class="t">${H(v)}</span></button>`).join('')}</div>`)+`<div id="fb" role="status" aria-live="polite"></div>`;
 const u=app.querySelector('.pb u'),w=S.i/S.q.length*100;u.style.width=Math.max(w-100/S.q.length,0)+'%';requestAnimationFrame(()=>requestAnimationFrame(()=>{u.style.width=w+'%'}));
 scrollTo(0,0);if(q.inp)document.getElementById('in').focus();
}
function quit(){if(S.i==0&&!S.d){home();return}exSheet(`<h3>Thoát bài này?</h3><p class="sub">Tiến độ lượt chơi sẽ mất.</p><button class="big" data-f onclick="closeSheet()">Làm tiếp</button><button class="big alt" onclick="closeSheet();home()">Thoát</button>`)}
function pick(k){
 const q=S.q[S.i];if(S.d)return;
 document.querySelectorAll('.o').forEach((b,j)=>{b.disabled=true;if(S.o[j]===q.a)b.classList.add('ok');else if(j==k)b.classList.add('no')});
 rs(S.o[k]===q.a,S.o[k]);
}
function sub(){
 const v=document.getElementById('in');if(S.d||!v.value.trim())return;
 v.disabled=true;rs(chk(v.value,S.q[S.i].a));
}
function rs(ok,mine){
 const q=S.q[S.i],last=S.i==S.q.length-1;S.d=1;
 if(ok)S.ok++;else S.bad.push(q);S.cb=ok?S.cb+1:0;fx(ok,S.cb);
 if(!S.rev&&q.t){const a=D.acc[q.t]=D.acc[q.t]||[0,0];a[1]++;if(ok)a[0]++;if(a[1]>40){a[0]=Math.round(a[0]/2);a[1]=Math.round(a[1]/2)}save()}
 gx('react',ok,S.cb);if(ok&&S.cb>=3)cf('burst',innerWidth/2,innerHeight*.4,16+Math.min(S.cb,10)*3);
 const f=document.getElementById('fb');f.className='fb '+(ok?'ok':'no');
 f.innerHTML=`<h3>${ok?(S.cb>=3?'🔥 Quá đỉnh! Liên tiếp ×'+S.cb:'🎉 Chính xác!'):'💪 Chưa đúng, cùng xem nhé'}</h3>${ok?'':`<p>Đáp án đúng: <b>${fa(q.a)}</b></p>`}${!ok&&mine!=null&&q.x&&q.x[mine]?`<p class="why">🔎 <b>Vì sao đáp án em chọn chưa đúng?</b> ${H(q.x[mine].replace(/^./,c=>c.toUpperCase()))}.</p>`:''}<p>${H(q.e).replace(/\n/g,'<br>')}</p><button class="big" onclick="${last?'end()':'next()'}">${last?'Xem kết quả 🏁':'Tiếp tục'}</button>`;
 requestAnimationFrame(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'smooth'}));
}
function next(){S.i++;show()}

/* Chế độ thi thử / thử thách ngày: xem js/app/exam.js */
function end(timeout){
 const n=S.q.length,st=S.ok>=n*.9?3:S.ok>=n*.7?2:S.ok>=n*.5?1:0,isT=T.some(t=>t.id==S.id),dly=S.id=='daily';let xp=0,up=0;
 if(!S.rev){
  const today=S.day||dk(),fast=!!S.exam&&!timeout&&(S.sec|0)<n*3;S.fast=fast; /* <3 giây/câu = bấm bừa/tool, không tính XP (vẫn tính là đã làm thử thách) */
  if(dly){if(!dcDone()){xp=fast?0:S.ok*S.m+(S.ok==n?20:0);D[dcK()]={k:today,ok:S.ok}}}
  else xp=fast?0:S.ok*S.m+(isT?Math.max(0,st-(D.b[S.k]||0))*20:0);
  const L0=lvOf(D.xp);D.xp+=xp;up=lvOf(D.xp)>L0?lvOf(D.xp):0;if(isT)D.b[S.k]=Math.max(D.b[S.k]||0,st);const d=new Date().toDateString();if(D.day!=d){D.st=(D.day==new Date(Date.now()-864e5).toDateString()?(D.st||0):0)+1;D.day=d}save();
  try{window.T6_SYNC&&window.T6_SYNC({gain:xp,name:D.name||'',xp:D.xp,stars:Object.values(D.b).reduce((a,b)=>a+b,0),streak:D.st||0,mode:S.id,level:D.lv,score:S.ok,total:n,at:Date.now(),prog:progOf()})}catch(e){}}
 const m=timeout?'⏰ Hết giờ!':(st==3?'Xuất sắc!':st==2?'Giỏi lắm!':st==1?'Khá rồi, luyện thêm nhé!':'Đừng nản, xem lại mẹo rồi thử lại nhé!');
 lbc.t=0;gx('win',st);gx('tint','#ffd25e');Snd.music('home');Snd.win(st);for(let k=0;k<st;k++)setTimeout(()=>Snd.sfx('star',k),350+k*280);if(up)setTimeout(()=>Snd.sfx('lvl'),1500);else if(xp>0)setTimeout(()=>Snd.sfx('coin'),1000);
 app.innerHTML=`<div class="card res"><div class="sc" style="--p:${Math.round(S.ok/n*100)}"><b>${(Math.round(S.ok/n*100)/10).toString().replace('.',',')}</b></div><h2>${m}</h2><div class="s">${[0,1,2].map(k=>`<i style="--k:${k}"${k<st?' class="on"':''}>★</i>`).join('')}</div>${S.rev?'':`<div class="xpc">+${xp} XP</div>`}${up?`<div class="xpc" style="display:block;width:max-content;margin:8px auto 0;background:var(--ok);color:#06352a">🎊 Lên cấp ${up}!</div>`:''}<p class="sub">Đúng ${S.ok}/${n} câu${timeout?' · hết giờ':''}</p></div>
 ${S.bad.length?`<button class="big" onclick="start('${S.id}',S.bad)">🔁 Ôn lại ${S.bad.length} câu sai</button>`:''}
 ${dly?'':`<button class="big" onclick="start('${S.id}')">🎲 Làm đề mới</button>`}
 <button class="big alt" onclick="U?lb():home()">🏆 Bảng xếp hạng</button><button class="big alt" onclick="home()">🏠 Trang chủ</button>`;
 if(S.exam)exResult(timeout);scrollTo(0,0);if(st>=2)setTimeout(()=>cf('burst',innerWidth/2,innerHeight*.32,st==3?90:55),400);
}
