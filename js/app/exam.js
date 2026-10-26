/* ===== v4: Phòng thi (Thi thử + Thử thách ngày) =====
   - Đồng hồ tính theo MỐC GIỜ KẾT THÚC (S.end) nên khóa màn hình / chuyển app không "đứng giờ" được
   - Bài đang làm tự lưu (localStorage 't6x'): tắt trình duyệt, điện thoại tự kill tab vẫn làm tiếp được
   - Bản đồ câu hỏi, đánh dấu xem lại, vuốt trái/phải, hộp thoại tự vẽ (không dùng confirm() vì
     trình duyệt trong Zalo/Messenger hay chặn)
   - Sau khi nộp: kết quả + phần nên luyện + xem lại từng câu kèm lời giải */
const EXK='t6x',
gid=i=>document.getElementById(i),
exEsc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
exBuzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}},
exLeft=()=>Math.max(0,Math.ceil((S.end-Date.now())/1000)),
exStreak=()=>[new Date().toDateString(),new Date(Date.now()-864e5).toDateString()].includes(D.day)?D.st||0:0,
/* còn bao lâu tới 0h giờ Việt Nam (đổi đề thử thách) */
exNextIn=()=>{const ms=864e5-((Date.now()+252e5)%864e5);return Math.floor(ms/36e5)+' giờ '+Math.floor(ms%36e5/6e4)+' phút'},
/* dải 7 ngày gần nhất của thử thách (lịch sử D.dh chỉ lưu trên máy này, không đồng bộ) */
exWeek=()=>{const h=D.dh||{},dd=D[dcK()],o=[];for(let i=6;i>=0;i--){const t=new Date(Date.now()+252e5-i*864e5),k=t.getUTCFullYear()*1e4+(t.getUTCMonth()+1)*100+t.getUTCDate();let v=h[D.gr+':'+k];if(v==null&&dd&&dd.k==k)v=dd.ok;
 o.push(`<div class="dd${i==0?' today':''}${v!=null?' ok':''}"><small>${['CN','T2','T3','T4','T5','T6','T7'][t.getUTCDay()]}</small><b>${v!=null?v:i==0?'⚡':'·'}</b></div>`)}return o.join('')};

/* ---------- lưu / khôi phục bài đang làm ---------- */
function persistExam(){try{if(!S||!S.exam||S.done){localStorage.removeItem(EXK);return}
 localStorage.setItem(EXK,JSON.stringify({id:S.id,q:S.q,i:S.i,ans:S.ans,flag:S.flag,end:S.end,t0:S.t0,day:S.day,gr:S.gr,m:S.m,k:S.k}))}catch(e){}}
let _pt=0;const exPersistSoon=()=>{clearTimeout(_pt);_pt=setTimeout(persistExam,400)};
function exSaved(){try{const s=JSON.parse(localStorage.getItem(EXK)||'null');
 if(s&&typeof s.id=='string'&&Array.isArray(s.q)&&s.q.length&&Array.isArray(s.ans)&&s.ans.length==s.q.length&&s.end>0&&s.t0>0)return s}catch(e){}return null}
function resumeBar(){const s=exSaved();if(!s)return'';const l=Math.max(0,Math.ceil((s.end-Date.now())/1000)),n=s.ans.filter(a=>a!==null).length;
 return `<div class="resume"><div><b>${s.id=='daily'?'⚡ Thử thách ngày':'🎯 Bài thi thử'} đang làm dở</b><small>${n}/${s.q.length} câu · ${l?'còn '+fmtTime(l):'đã hết giờ'}</small></div><button class="chip go" onclick="resumeExam()">${l?'Làm tiếp':'Xem kết quả'}</button><button class="chip" aria-label="Bỏ bài đang làm dở" onclick="dropExam()">✕</button></div>`}
function resumeExam(){const s=exSaved();if(!s)return;
 if(s.gr&&s.gr!=D.gr){D.gr=s.gr==7?7:6;save();applyGr()}
 S={id:s.id,q:s.q,i:Math.min(Math.max(s.i|0,0),s.q.length-1),ok:0,bad:[],rev:false,m:s.m,k:s.k,cb:0,exam:true,ans:s.ans,
  flag:Array.isArray(s.flag)&&s.flag.length==s.q.length?s.flag:s.q.map(()=>false),end:s.end,t0:s.t0,day:s.day,gr:s.gr,tok:0};
 Snd.music('quiz',{k:s.id=='daily'?5:3});
 if(exLeft()<=0){submitExam(true);return}
 showExam();startExamTimer()}
function dropExam(sure){
 if(!sure){exSheet(`<h3>Bỏ bài đang làm dở?</h3><p class="sub">Các câu đã trả lời sẽ mất và không được tính điểm.</p><button class="big" data-f onclick="closeSheet()">Giữ lại</button><button class="big alt" onclick="dropExam(1)">Bỏ bài</button>`);return}
 closeSheet();clearExamTimer();try{localStorage.removeItem(EXK)}catch(e){}S={};home()}

/* ---------- hộp thoại dạng bottom sheet + toast ---------- */
function exSheet(h){closeSheet();const d=document.createElement('div');d.id='sh';d.className='sheet';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
 d.innerHTML=`<div class="sh-b" onclick="closeSheet()"></div><div class="sh-p">${h}</div>`;document.body.appendChild(d);
 const f=d.querySelector('[data-f]')||d.querySelector('button');f&&f.focus()}
function closeSheet(){const d=gid('sh');d&&d.remove()}
addEventListener('keydown',e=>{if(e.key=='Escape')closeSheet()});
function exToast(t){let d=gid('ts');if(!d){d=document.createElement('div');d.id='ts';d.className='toast';d.setAttribute('role','status');d.setAttribute('aria-live','polite');document.body.appendChild(d)}
 d.textContent=t;d.classList.add('on');clearTimeout(d._t);d._t=setTimeout(()=>d.classList.remove('on'),2200)}

/* ---------- đồng hồ ---------- */
let _examTimer=null,_warn=0;
function clearExamTimer(){if(_examTimer){clearInterval(_examTimer);_examTimer=null}}
function startExamTimer(){clearExamTimer();_warn=0;_examTimer=setInterval(exTick,500)}
function fmtTime(s){s=Math.max(0,s|0);const m=(s/60)|0,ss=s%60;return m+':'+(ss<10?'0':'')+ss}
function exTick(){
 const el=gid('tmr');if(!S||!S.exam||S.done||!el){clearExamTimer();return}
 const l=exLeft(),tot=Math.max(1,(S.end-S.t0)/1000),b=gid('tbf');
 el.textContent=fmtTime(l);el.classList.toggle('warn',l<=60);el.classList.toggle('danger',l<=15);
 if(b){b.style.width=l/tot*100+'%';b.parentNode.className='tbar'+(l<=15?' danger':l<=60?' warn':'')}
 if(l<=60&&_warn<1){_warn=1;exToast('⏳ Còn 1 phút!');exBuzz(120)}
 if(l<=15&&_warn<2){_warn=2;exToast('⚠️ Còn 15 giây!');exBuzz([80,60,80])}
 if(l<=0){clearExamTimer();exToast('⏰ Hết giờ! Đang nộp bài…');submitExam(true)}}
/* quay lại app thì tính giờ ngay (trình duyệt hay làm chậm setInterval khi chạy nền); rời app thì lưu bài */
document.addEventListener('visibilitychange',()=>{if(document.hidden)persistExam();else exTick()});
addEventListener('pagehide',persistExam);

/* ---------- màn làm bài ---------- */
function showExam(){
 const q=S.q[S.i],tp=T.find(x=>x.id==q.t),c=tp?tp.c:'#7a5cff';
 if(!q._opts)q._opts=sh([q.a,...q.w]); /* giữ thứ tự đáp án ổn định trong cả phiên */
 S.o=q._opts;app.style.setProperty('--c',c);app.style.setProperty('--ci',ink(c));gx('tint',c);
 const two=!q.inp&&S.o.every(v=>String(v).length<=11),ans=S.ans[S.i],done=S.ans.filter(a=>a!==null).length,last=S.i==S.q.length-1,l=exLeft(),tot=Math.max(1,(S.end-S.t0)/1000),fl=S.flag[S.i];
 app.innerHTML=`<div class="top"><button class="x" aria-label="Rời bài thi" onclick="quitExam()">✕</button>
 <button class="map" onclick="exMap()" aria-label="Mở bản đồ câu hỏi"><span>Câu ${S.i+1}/${S.q.length}</span><em>${done} đã làm ▾</em><u style="--p:${done/S.q.length*100}"></u></button>
 <span id="tmr" class="tmr${l<=60?' warn':''}${l<=15?' danger':''}" role="timer">${fmtTime(l)}</span></div>
 <div class="tbar${l<=15?' danger':l<=60?' warn':''}"><u id="tbf" style="width:${l/tot*100}%"></u></div>
 <div class="card"><div class="qh"><span class="qn">Câu ${S.i+1}</span><button class="flg${fl?' on':''}" aria-pressed="${!!fl}" onclick="exFlag()">🚩 ${fl?'Đã đánh dấu':'Đánh dấu xem lại'}</button></div><div class="q">${H(q.q)}</div>${q.f||''}</div>`+
 (q.inp?`<input id="in" autocomplete="off" enterkeyhint="next" placeholder="Nhập đáp án…" value="${exEsc(ans)}" oninput="saveInp(this.value)" onkeydown="event.key=='Enter'&&examNext()"><p class="hint">Phân số viết dạng a/b đã rút gọn; số thập phân dùng dấu phẩy. Vuốt hoặc bấm Câu trước để sửa lại.</p>`
 :`<div class="opts${two?' two':''}">${S.o.map((v,k)=>`<button class="o${ans===v?' sel':''}" onclick="pickExam(${k})"><span class="t">${H(v)}</span></button>`).join('')}</div>`)+
 `<div class="exam-nav"><button class="big alt" ${S.i===0?'disabled':''} onclick="examPrev()">← Câu trước</button>${last?`<button class="big" onclick="confirmSubmit()">Nộp bài 🏁</button>`:`<button class="big" onclick="examNext()">Câu tiếp →</button>`}</div>
 ${last?'':'<button class="lnk" onclick="confirmSubmit()">Nộp bài sớm</button>'}`;
 scrollTo(0,0);if(q.inp&&ans===null)gid('in').focus()}
function exSync(){const d=S.ans.filter(a=>a!==null).length,m=document.querySelector('.map');if(m){m.querySelector('u').style.setProperty('--p',d/S.q.length*100);m.querySelector('em').textContent=d+' đã làm ▾'}}
function pickExam(k){
 if(!S.exam||S.done)return;const first=S.ans[S.i]===null,t=++S.tok,i=S.i;
 S.ans[S.i]=S.o[k];exBuzz(8);persistExam();
 document.querySelectorAll('.o').forEach((b,j)=>b.classList.toggle('sel',j===k));exSync();
 /* chỉ tự sang câu sau khi trả lời lần đầu; sửa lại đáp án thì ở yên (token chặn chạm đúp / bấm lẹ) */
 if(first&&i<S.q.length-1)setTimeout(()=>{if(S.exam&&!S.done&&S.tok===t&&S.i===i)examNext()},320)}
function saveInp(v){if(!S.exam||S.done)return;S.ans[S.i]=v.trim()||null;exPersistSoon();exSync()}
function examNext(){if(S.i<S.q.length-1){S.tok++;S.i++;persistExam();showExam()}}
function examPrev(){if(S.i>0){S.tok++;S.i--;persistExam();showExam()}}
function exGo(k){closeSheet();S.tok++;S.i=k;persistExam();showExam()}
function exFlag(){const f=S.flag[S.i]=!S.flag[S.i],b=document.querySelector('.flg');persistExam();exBuzz(8);
 if(b){b.classList.toggle('on',f);b.setAttribute('aria-pressed',f);b.textContent='🚩 '+(f?'Đã đánh dấu':'Đánh dấu xem lại')}}
/* vuốt ngang để đổi câu (chỉ khi đang ở màn làm bài và không mở hộp thoại) */
let _tx=0,_ty=0;
document.addEventListener('touchstart',e=>{const t=e.touches[0];_tx=t.clientX;_ty=t.clientY},{passive:true});
document.addEventListener('touchend',e=>{if(!S||!S.exam||S.done||gid('sh')||!gid('tmr'))return;
 const t=e.changedTouches[0],dx=t.clientX-_tx,dy=t.clientY-_ty;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.6)dx<0?examNext():examPrev()},{passive:true});

/* ---------- bản đồ câu hỏi, rời bài, nộp bài ---------- */
const exPal=()=>`<div class="pal">${S.q.map((_,k)=>`<button class="pc${k==S.i?' cur':''}${S.ans[k]!==null?' done':''}${S.flag[k]?' fl':''}" onclick="exGo(${k})" aria-label="Câu ${k+1}${S.ans[k]!==null?', đã làm':', chưa làm'}${S.flag[k]?', có đánh dấu':''}">${k+1}</button>`).join('')}</div>`;
function exMap(){exSheet(`<h3>Bản đồ bài thi</h3><p class="lg"><i class="done"></i>Đã làm <i></i>Chưa làm <i class="fl"></i>Đánh dấu</p>${exPal()}<button class="big alt" data-f onclick="closeSheet()">Đóng</button>`)}
function quitExam(){exSheet(`<h3>Rời bài thi?</h3><p class="sub">Đồng hồ vẫn chạy. Còn giờ thì em quay lại làm tiếp được ở tab Thi thử / Thử thách.</p><button class="big" data-f onclick="closeSheet()">Làm tiếp</button><button class="big alt" onclick="exLeave()">Tạm rời đi</button><button class="big alt" onclick="dropExam(1)">Bỏ bài này</button>`)}
function exLeave(){persistExam();clearExamTimer();closeSheet();home()}
function confirmSubmit(){
 const un=S.ans.map((a,k)=>a===null?k+1:0).filter(Boolean),fl=S.flag.map((f,k)=>f?k+1:0).filter(Boolean);
 exSheet(`<h3>Nộp bài?</h3><p class="sub">Đã làm ${S.q.length-un.length}/${S.q.length} câu · còn ${fmtTime(exLeft())}</p>${un.length?`<p class="wn">Chưa làm: câu ${un.join(', ')}</p>`:''}${fl.length?`<p class="wn">Đánh dấu xem lại: câu ${fl.join(', ')}</p>`:''}${exPal()}<button class="big" onclick="closeSheet();submitExam(false)">Nộp bài 🏁</button><button class="big alt" data-f onclick="closeSheet()">Làm tiếp</button>`)}

/* ---------- chấm bài ---------- */
function exHist(){if(S.rev)return;const n=S.q.length;
 if(S.id=='daily'){const h=D.dh=D.dh&&typeof D.dh=='object'?D.dh:{},k=S.gr+':'+S.day;if(h[k]==null)h[k]=S.ok;
  const ks=Object.keys(h).sort();while(ks.length>30)delete h[ks.shift()]}
 else{D.mh=Array.isArray(D.mh)?D.mh:[];D.mh.unshift({id:S.id,gr:S.gr,ok:S.ok,n,sec:S.sec,at:Date.now()});D.mh.length=Math.min(D.mh.length,10)}}
function submitExam(timeout){
 if(!S||!S.exam||S.done)return;S.done=1;clearExamTimer();closeSheet();
 S.sec=Math.max(0,Math.min(Math.round((Date.now()-S.t0)/1000),Math.round((S.end-S.t0)/1000)));
 S.ok=0;S.bad=[];S.res=[];
 S.q.forEach((q,i)=>{const ua=S.ans[i];let ok=false;if(ua!==null)ok=q.inp?chk(ua,q.a):ua===q.a;S.res[i]=ok;if(ok)S.ok++;else S.bad.push(q);
  if(!S.rev&&q.t){const a=D.acc[q.t]=D.acc[q.t]||[0,0];a[1]++;if(ok)a[0]++;if(a[1]>40){a[0]=Math.round(a[0]/2);a[1]=Math.round(a[1]/2)}}});
 exHist();save();try{localStorage.removeItem(EXK)}catch(e){}
 Snd.sfx(timeout?'no':'ok');end(timeout)}

/* ---------- màn kết quả: thêm thời gian, phần nên luyện, nút xem lại (gọi từ end() của game.js) ---------- */
function exResult(timeout){
 const n=S.q.length,un=S.ans.filter(a=>a===null).length,by={};
 S.q.forEach((q,i)=>{if(!q.t)return;const b=by[q.t]=by[q.t]||[0,0];b[1]++;if(S.res[i])b[0]++});
 const weak=Object.entries(by).filter(([,b])=>b[0]<b[1]).sort((x,y)=>x[1][0]/x[1][1]-y[1][0]/y[1][1]).slice(0,3),res=app.querySelector('.res');
 res.insertAdjacentHTML('beforeend',`<div class="rmeta"><span>⏱ ${fmtTime(S.sec)}</span><span>✅ ${S.ok} đúng</span><span>❌ ${n-S.ok-un} sai</span>${un?`<span>➖ ${un} bỏ trống</span>`:''}</div>${S.fast?'<p class="nt">Em nộp quá nhanh nên lượt này chưa tính XP. Làm chậm lại một chút nhé!</p>':''}${weak.length?`<div class="wk"><small>Nên luyện thêm</small>${weak.map(([id,b])=>{const t=T.find(x=>x.id==id);return t?`<button class="chip" onclick="intro('${id}')">${t.e} ${t.n} ${b[0]}/${b[1]}</button>`:''}).join('')}</div>`:''}`);
 res.insertAdjacentHTML('afterend','<button class="big" onclick="exReview()">📖 Xem lại bài & lời giải</button>');
 S.resHTML=app.innerHTML}
function exBack(){if(S.resHTML){app.innerHTML=S.resHTML;scrollTo(0,0)}else home()}
function exReview(onlyBad){
 const n=S.q.length,items=S.q.map((q,i)=>{const ua=S.ans[i],ok=S.res[i];if(onlyBad&&ok)return'';
  const mine=ua===null?'<i>Bỏ trống</i>':q.inp?H(exEsc(ua)):fa(ua);
  return `<div class="rv ${ok?'ok':'no'}"><div class="rh"><b>Câu ${i+1}${S.flag[i]?' 🚩':''}</b><span>${ok?'✓ Đúng':ua===null?'➖ Bỏ trống':'✕ Sai'}</span></div><div class="q">${H(q.q)}</div>${q.f||''}<p>Em chọn: <b>${mine}</b></p>${ok?'':`<p>Đáp án đúng: <b>${fa(q.a)}</b></p>`}${!ok&&ua!==null&&!q.inp&&q.x&&q.x[ua]?`<p class="why">🔎 <b>Vì sao em chọn chưa đúng?</b> ${H(q.x[ua].replace(/^./,c=>c.toUpperCase()))}.</p>`:''}<div class="ex">${H(q.e).replace(/\n/g,'<br>')}</div></div>`}).join('');
 app.innerHTML=`<div class="top"><button class="x" aria-label="Về kết quả" onclick="exBack()">←</button><h3>Xem lại bài làm</h3></div>
 <div class="seg"><button class="${onlyBad?'':'on'}" onclick="exReview(0)">Tất cả (${n})</button><button class="${onlyBad?'on':''}" onclick="exReview(1)">Chỉ câu sai (${n-S.ok})</button></div>
 ${items||'<div class="card soft"><div class="cap">🎉</div><p>Không có câu nào sai. Em làm tốt lắm!</p></div>'}<button class="big alt" onclick="exBack()">← Về kết quả</button>`;
 scrollTo(0,0)}

/* ---------- hub: thẻ Thi thử / Thử thách ngày (hub.js gọi) ---------- */
const tabMock=()=>{const g=GRADES[D.gr],mh=(D.mh||[]).filter(r=>r.gr==D.gr).slice(0,3);
 return `${resumeBar()}${gradeSwitch()}<div class="card soft"><div class="cap">🎯</div><h2>Phòng thi ${g.label}</h2><p class="sub">Đồng hồ chạy thật, chưa hiện đúng/sai. Nộp bài xong mới chấm và xem lời giải từng câu.</p></div>
 <button class="big" onclick="go('all','m')">🎯 Đề tổng hợp<small>15 câu · 25 phút · ${XQ.mock} XP/câu</small></button>${GR.map((x,i)=>`<button class="big alt" onclick="go('ex${i+1}','m')">${x[0]}<small>15 câu · 25 phút · đề riêng phần này</small></button>`).join('')}
 ${mh.length?`<h3 class="ph">Kết quả gần đây</h3>${mh.map(r=>`<div class="hrow"><b>${r.id=='all'?'Đề tổng hợp':(GR[+r.id.slice(2)-1]||[r.id])[0]}</b><span>${(r.ok/r.n*10).toFixed(1).replace('.',',')} điểm · ${r.ok}/${r.n} câu</span><small>⏱ ${fmtTime(r.sec)}</small></div>`).join('')}`:''}
 <p class="hint">Thoát giữa chừng cũng không mất bài: đồng hồ vẫn chạy và em làm tiếp được.</p>`};
const tabDaily=()=>{const dn=dcDone(),g=GRADES[D.gr];
 return `${resumeBar()}${gradeSwitch()}<div class="card soft"><div class="cap">⚡</div><h2>Thử thách ${g.label}</h2><p class="sub">5 câu · 8 phút · mọi bạn cùng một đề hôm nay.</p><div class="dstrip">${exWeek()}</div><div class="dmeta"><span>🔥 Chuỗi ${exStreak()} ngày</span><span>${dn?'Đề mới sau '+exNextIn():XQ.daily+' XP/câu · đúng cả 5 thưởng 20 XP'}</span></div>${dn?`<div class="xpc">Hôm nay: ${D[dcK()].ok}/5 ✅</div>`:''}</div>`+
 (dn?`<button class="big alt" onclick="start('daily',dailyQs())">🔁 Làm lại cho vui<small>Có đáp án ngay · không tính XP</small></button><p class="hint">Quay lại mỗi ngày để giữ chuỗi 🔥</p>`
 :`<button class="big" onclick="start('daily')">Bắt đầu thử thách 🚀<small>Đồng hồ chạy ngay khi bấm</small></button>`)};
