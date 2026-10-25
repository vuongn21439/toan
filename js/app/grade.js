/* Chọn lớp (6 hoặc 7): mọi mục Học, Ôn tập, Thi thử, Thử thách chỉ lấy chủ đề của lớp đang chọn. Bảng xếp hạng XP dùng chung. */
const gT=()=>T.filter(t=>(t.gr||6)==D.gr),
gStat=g=>{const L=T.filter(t=>(t.gr||6)==g);return[L.reduce((a,t)=>a+(D.b[t.id]||0)+(t.h?D.b[t.id+'h']||0:0),0),L.reduce((a,t)=>a+3+(t.h?3:0),0),L.length]},
gradeSwitch=()=>{const g=GRADES[D.gr],[s,m]=gStat(D.gr);return `<button class="gb" onclick="pickGrade()" aria-label="Đang học ${g.label}. Bấm để đổi lớp"><span class="ge">${g.e}</span><span class="gt"><b>${g.label}</b><small>${g.tag}</small></span><span class="gs">⭐ ${s}/${m}<i>Đổi lớp ›</i></span></button>`};
function setGr(g){D.gr=g==7?7:6;D.gp=1;save();GI=0;applyGr();home('learn')}
function pickGrade(){
 app.innerHTML=`<div class="top">${D.gp?'<button class="x" aria-label="Về trang chủ" onclick="home()">←</button>':''}</div><h2 class="gh">Em học lớp mấy?</h2><p class="sub gsub">Mỗi lớp có bài học, đề ôn, đề thi thử và thử thách riêng. Điểm XP và bảng xếp hạng dùng chung.</p>${[6,7].map(g=>{const G=GRADES[g],[s,m,n]=gStat(g);return `<button class="gc g${g}${D.gp&&D.gr==g?' on':''}" onclick="setGr(${g})"><span class="gi">${G.e}</span><b>${G.label}</b><em>${G.tag}</em><small>${n} chủ đề · ${G.sub}</small><u style="--p:${Math.round(100*s/m)}"></u><span class="gp">⭐ ${s}/${m} sao${D.gp&&D.gr==g?' · đang học':''}</span></button>`}).join('')}`;
 Snd.music('home');gx('tint','#7a5cff');scrollTo(0,0)}
