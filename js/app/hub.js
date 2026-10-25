/* ===== v6: Hub 5 tab (Học · Ôn tập · Thi thử · Thử thách · Hạng) ===== */
let GR,EX; /* nhóm chủ đề + đề thi theo lớp đang học, cập nhật bởi applyGr() */
const applyGr=()=>{document.body.dataset.gr=D.gr;GR=GRADES[D.gr].groups;EX={all:0,ex1:GR[0][1],ex2:GR[1][1],ex3:GR[2][1]}},
TABS=[['learn','📚','Học'],['review','🧠','Ôn tập'],['mock','🎯','Thi thử'],['daily','⚡','Thử thách'],['rank','🏆','Hạng']],
/* XP: cấp n→n+1 cần 100+40(n−1) XP; tối đa cấp 200. XP cộng dồn tới cấp L: CX(L)=20(L−1)(L+3). Không giới hạn XP theo ngày */
MAXL=200,CX=L=>20*(L-1)*(L+3),
XQ={b:8,h:14,m:10,mock:12,daily:12},
lvOf=x=>{let L=1;while(L<MAXL&&x>=CX(L+1))L++;return L},
dk=()=>{const t=new Date(Date.now()+252e5);return t.getUTCFullYear()*1e4+(t.getUTCMonth()+1)*100+t.getUTCDate()},
mk=id=>T.some(t=>t.id==id)?D.lv:id=='smart'?'m':id=='daily'?'daily':'mock',
nq=id=>id=='daily'?5:id in EX?15:id=='smart'?12:10,
dcK=()=>D.gr==7?'dc7':'dc', /* thử thách ngày lưu riêng từng lớp: dc = lớp 6 (giữ tên cũ), dc7 = lớp 7 */
dcDone=()=>D[dcK()]&&D[dcK()].k==dk(),
seeded=(seed,f)=>{const r=Math.random;let a=seed>>>0;Math.random=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};try{return f()}finally{Math.random=r}},
/* Đề thử thách: seed theo ngày nên mọi bạn cùng một đề; 5 chủ đề khác nhau, 2 câu cuối lấy mức nâng cao */
dailyQs=()=>seeded(dk()+(D.gr==7?5e8:0),()=>{const qs=[],s=new Set();for(const id of sh(gT().map(t=>t.id))){if(qs.length>=5)break;const tp=T.find(t=>t.id==id),q=P(qs.length>=3&&tp.h?tp.h:tp.g)();if(!s.has(q.q)&&(q.inp||q.w.length>=3)){s.add(q.q);q.t=tp.id;qs.push(q)}}return qs}),
bar=()=>{const L=lvOf(D.xp),a=CX(L),b=CX(L+1),mx=L>=MAXL,p=mx?100:Math.round((D.xp-a)/(b-a)*100),ds=[new Date().toDateString(),new Date(Date.now()-864e5).toDateString()].includes(D.day)?D.st||0:0;
 return `<div class="sn-a"><button class="chip" onclick="Snd.menu()" aria-label="Cài đặt âm thanh"><span class="sn-i">${Snd.icon()}</span> Âm thanh</button></div><div class="hero"><div class="ring" style="--p:${p}"><div><b${L>99?' style="font-size:17px"':''}>${L}</b></div></div><div class="hx"><div class="xl"><b>✨ ${D.xp} XP</b><span>${mx?'Cấp tối đa 👑':'còn '+(b-D.xp)+' XP lên cấp'}</span></div><div class="xb"><u style="width:${p}%"></u></div></div><span class="chip">🔥 ${ds}</span></div>`},
tcard=t=>{const b=D.b[t.id]||0,a=D.acc[t.id];return `<button class="tc" style="--c:${t.c};--ci:${ink(t.c)}" onclick="intro('${t.id}')"><span class="ic">${t.e}</span><b class="nm">${t.n}</b><small>${[0,1,2].map(k=>`<i${k<b?' class="on"':''}>★</i>`).join('')}<em>${t.h?(unl(t.id)?'🔥'+(D.b[t.id+'h']||0)+'★':'🔒'):''}${a?' '+Math.round(100*a[0]/a[1])+'%':''}</em></small></button>`},
tabLearn=()=>`${insCard()}${gradeSwitch()}<div class="seg">${GR.map((g,i)=>`<button class="${GI==i?'on':''}" onclick="GI=${i};home()">${g[0]}</button>`).join('')}</div><div class="grid">${GR[GI][1].map(i=>tcard(T.find(t=>t.id==i))).join('')}</div>`,
rw=t=>{const a=D.acc[t.id],p=Math.round(100*a[0]/a[1]);return `<button class="rw" style="--c:${t.c}" onclick="intro('${t.id}')"><span class="ic">${t.e}</span><b>${t.n}</b><u style="--p:${p}"></u><em>${p}%</em></button>`},
tabReview=()=>{const w=gT().filter(t=>D.acc[t.id]&&D.acc[t.id][1]>=5).sort((x,y)=>D.acc[x.id][0]/D.acc[x.id][1]-D.acc[y.id][0]/D.acc[y.id][1]).slice(0,4);
 return `${gradeSwitch()}<button class="big" onclick="go('smart','m')">🧠 Ôn thông minh ${GRADES[D.gr].label}<small>12 câu · ưu tiên phần em hay sai · ${XQ.m} XP/câu</small></button><h3 class="ph">Cần luyện thêm</h3>${w.length?w.map(rw).join(''):`<p class="hint">Làm vài bài ở tab Học (${GRADES[D.gr].label}), mình sẽ gợi ý phần em hay sai ở đây.</p>`}`},
tabMock=()=>`${gradeSwitch()}<button class="big" onclick="go('all','m')">🎯 Đề tổng hợp ${GRADES[D.gr].label}<small>15 câu · mọi chủ đề của lớp · ${XQ.mock} XP/câu</small></button>${GR.map((g,i)=>`<button class="big alt" onclick="go('ex${i+1}','m')">${g[0]}<small>Đề 15 câu riêng phần này</small></button>`).join('')}<p class="hint">Làm bao nhiêu đề cũng được.</p>`,
tabDaily=()=>{const dn=dcDone();return `${gradeSwitch()}<div class="card soft"><div class="cap">⚡</div><h2>Thử thách ${GRADES[D.gr].label}</h2><p class="sub">5 câu, mọi bạn ${GRADES[D.gr].label.toLowerCase()} cùng một đề. ${XQ.daily} XP/câu, đúng cả 5 câu thưởng thêm 20 XP.</p>${dn?`<div class="xpc">Hôm nay: ${D[dcK()].ok}/5 ✅</div>`:''}</div>`+(dn?`<button class="big alt" onclick="start('daily',dailyQs())">🔁 Làm lại cho vui<small>Không tính XP</small></button><p class="hint">Ngày mai có đề mới. Quay lại để giữ chuỗi ngày 🔥</p>`:`<button class="big" onclick="start('daily')">Bắt đầu thử thách 🚀</button>`)},
tabRank=()=>(U?meChip():`<div class="card soft"><div class="cap">🏆</div><p class="sub">Đăng nhập để lưu điểm và lên bảng xếp hạng.</p></div><button class="big" onclick="loginScreen()">Đăng nhập</button>`)+insRow()+'<p class="hint">🏆 Bảng xếp hạng XP dùng chung cho cả Lớp 6 và Lớp 7.</p>';
applyGr();
let TAB=TABS.some(x=>x[0]==new URLSearchParams(location.search).get('tab'))?new URLSearchParams(location.search).get('tab'):'learn',GI=0;
