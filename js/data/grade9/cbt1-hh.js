/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì I (KNTT)" — Chương IV: tỉ số lượng giác, Chương V: đường tròn, cung tròn (v15)
   Chủ đề l9htl (mã lg.*), l9dt1 và l9dt2 (mã dc.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles9b.js */
(()=>{const {add,addH,gn,M,Iq,fh,fq,fr,fd,lin,cf,ng,rad,tp}=G8H,{rat,sg,nzc,ab}=G9X,
TR=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]],
nz=(k,m)=>m==1?`${k}`:rad(k,m);       /* k√m, m = 1 thì chỉ viết k */

/* ================= TỈ SỐ LƯỢNG GIÁC: CƠ BẢN ================= */
add('l9htl',
gn('lg.bieu_thuc',()=>{const ang=sh([...Array(88)].map((_,i)=>i+1)),n=R(2,3),L=[];
 const mk=[a=>({t:`sin^2 ${a}° + cos^2 ${a}°`,v:1,e:`sin² ${a}° + cos² ${a}° = 1`}),
  a=>({t:`tan ${a}°·cot ${a}°`,v:1,e:`tan ${a}°·cot ${a}° = 1`}),
  a=>({t:`sin ${a}° − cos ${90-a}°`,v:0,e:`sin ${a}° = cos ${90-a}° (hai góc phụ nhau) nên sin ${a}° − cos ${90-a}° = 0`}),
  a=>({t:`tan ${a}°·tan ${90-a}°`,v:1,e:`tan ${90-a}° = cot ${a}° nên tan ${a}°·tan ${90-a}° = tan ${a}°·cot ${a}° = 1`}),
  a=>({t:`sin^2 ${a}° + sin^2 ${90-a}°`,v:1,e:`sin ${90-a}° = cos ${a}° nên sin² ${a}° + sin² ${90-a}° = sin² ${a}° + cos² ${a}° = 1`})];
 for(const k of sh([0,1,2,3,4]).slice(0,n))L.push(mk[k](ang.pop()));
 const v=L.reduce((s,x)=>s+x.v,0);
 return[Iq(`Tính giá trị biểu thức A = ${L.map(x=>x.t).join(' + ')}.`,v,
  [`Dùng các hệ thức: sin² α + cos² α = 1; tan α·cot α = 1; sin α = cos(90° − α); tan α = cot(90° − α).`,
   `Tính từng nhóm: ${L.map(x=>x.e).join('; ')}.`,
   `Vậy A = ${L.map(x=>x.v).join(' + ')} = ${v}.`],'',`A = ${v}`),[L.map(x=>x.t)]]}),

gn('lg.lon_nhat',()=>{const big=R(0,1),A=sh([...Array(17)].map((_,i)=>5*(i+1))),L=[];
 while(L.length<4&&A.length){const a=A.pop(),f=P(['sin','cos']),s=f=='sin'?a:90-a;if(L.every(x=>Math.abs(x.s-s)>=4))L.push({f,a,s,n:`${f} ${a}°`})}
 if(L.length<4)throw 0;const best=[...L].sort((x,y)=>big?y.s-x.s:x.s-y.s)[0];
 return[M(`Trong các số ${L.map(x=>x.n).join('; ')}, số nào ${big?'lớn nhất':'nhỏ nhất'}?`,best.n,L.filter(x=>x!=best).map(x=>x.n),
  [`Đổi tất cả về sin bằng công thức cos α = sin(90° − α): ${L.map(x=>x.f=='sin'?`${x.n}`:`${x.n} = sin ${x.s}°`).join('; ')}.`,
   `Với góc nhọn, góc càng lớn thì sin càng lớn. Các góc là ${L.map(x=>x.s+'°').join('; ')}, nên số ${big?'lớn nhất':'nhỏ nhất'} ứng với góc ${best.s}°, tức ${best.n}.`],'',String),[L.map(x=>x.n),big]]}),

gn('lg.canh_goc_db',()=>{const B=P([30,45,60]),k=R(2,9),ask=P(['AC','AB']),m=B==45?2:ask=='AC'?(B==30?1:3):(B==30?3:1),
 half=B!=45&&m==1,ans=B==45?nz(k,2):half?`${k}`:nz(k,3);
 const val=(kk,r)=>r==1?`${kk}`:rad(kk,r),pool=[val(k,1),val(k,2),val(k,3),val(2*k,1),val(2*k,3),val(2*k,2)].filter(v=>v!=ans);
 const fn=ask=='AC'?'sin':'cos',sv={30:{sin:'1/2',cos:'√3/2'},45:{sin:'√2/2',cos:'√2/2'},60:{sin:'√3/2',cos:'1/2'}}[B][fn];
 return[M(`Tam giác ABC vuông tại A có BC = ${2*k} cm và ∠B = ${B}°. Độ dài ${ask} là (cm)`,ans,pool.slice(0,5),
  [`Trong tam giác ABC vuông tại A: ${ask=='AC'?'sin B = AC : BC':'cos B = AB : BC'}, nên ${ask} = BC·${fn} ${B}°.`,
   `Với B = ${B}° ta có ${fn} ${B}° = ${sv}.`,
   `Do đó ${ask} = ${2*k}·${sv} = ${ans} (cm).`],'',String),[B,k,ask]]}),

gn('lg.tan_cho_truoc',()=>{const [p,q]=P([[3,4],[4,3],[5,12],[12,5],[3,2],[2,3],[5,3],[3,5]]),t=R(2,9),s=q*t,h=p*t;
 return[Iq(`Tại một thời điểm, tia nắng mặt trời tạo với mặt đất góc α có tan α = ${fh(p,q)}. Một cái cây có bóng trên mặt đất dài ${s} m. Chiều cao của cây là bao nhiêu mét?`,h,
  [`Cây vuông góc với mặt đất nên cây, bóng cây và tia nắng tạo thành tam giác vuông; góc α đối diện với cây.`,
   `tan α = chiều cao : độ dài bóng, nên chiều cao = ${s}·tan α = ${s}·${fh(p,q)}.`,
   `Tính: ${s}·${p} : ${q} = ${h} (m).`],'',`${h} m`),[p,q,s]]}),

gn('lg.biet_mot_tsln',()=>{const [o,a,h]=P(TR),giv=P(['sin','cos','tan']),ask=P(['sin','cos','tan','cot'].filter(x=>x!=giv)),
 V={sin:[o,h],cos:[a,h],tan:[o,a],cot:[a,o]},nm={sin:'đối',cos:'kề',tan:'đối',cot:'kề'},
 g=V[giv],pool=[[o,h],[a,h],[o,a],[a,o],[h,o],[h,a]].map(v=>fq(v[0],v[1])),ans=fq(...V[ask]);
 return[M(`Cho góc nhọn α có ${giv} α = ${fh(g[0],g[1])}. Giá trị của ${ask} α là`,ans,pool.filter(v=>v!=ans&&v!=fq(...g)),
  [giv=='tan'?`Xét tam giác vuông có góc nhọn α, cạnh đối bằng ${o}, cạnh kề bằng ${a} (tỉ lệ). Cạnh huyền = √(${o}² + ${a}²) = √${o*o+a*a} = ${h}.`
   :`Xét tam giác vuông có góc nhọn α với ${giv=='sin'?`cạnh đối = ${o}, cạnh huyền = ${h}`:`cạnh kề = ${a}, cạnh huyền = ${h}`} (tỉ lệ). Cạnh còn lại = √(${h}² − ${giv=='sin'?o:a}²) = ${giv=='sin'?a:o}.`,
   `Vậy cạnh đối = ${o}, cạnh kề = ${a}, cạnh huyền = ${h}.`,
   `${ask} α = ${{sin:'đối : huyền',cos:'kề : huyền',tan:'đối : kề',cot:'kề : đối'}[ask]} = ${fh(V[ask][0],V[ask][1])}${fq(...V[ask])==V[ask][0]+'/'+V[ask][1]?'':` = ${ans}`}.`],'',String),[giv,ask,o,a,h]]}));

/* ================= TỈ SỐ LƯỢNG GIÁC: NÂNG CAO ================= */
addH('l9htl',
gn('lg.ti_so_tan',()=>{const [p,q]=cop(1,9),m=R(1,4),n=nzc(4),r=R(1,4),s=nzc(4),Dn=r*p+s*q,Nm=m*p+n*q;if(Dn==0)throw 0;
 const ex=(x,y)=>`${x==1?'':x}sin α ${sg(y)} ${ab(y)==1?'':ab(y)}cos α`;
 return[Iq(`Cho góc nhọn α có tan α = ${fh(p,q)}. Tính giá trị biểu thức A = ${fh(ex(m,n),ex(r,s))}. (Nhập số nguyên hoặc phân số a/b tối giản.)`,fr(Nm,Dn),
  [`Vì α nhọn nên cos α > 0. Chia cả tử và mẫu của A cho cos α, dùng sin α : cos α = tan α: A = ${fh(`${m==1?'':m}tan α ${sg(n)} ${ab(n)}`,`${r==1?'':r}tan α ${sg(s)} ${ab(s)}`)}.`,
   `Thay tan α = ${fh(p,q)}: tử số = ${m}·${fh(p,q)} ${sg(n)} ${ab(n)} = ${fq(Nm,q)}; mẫu số = ${r==1?'':r+'·'}${fh(p,q)} ${sg(s)} ${ab(s)} = ${fq(Dn,q)}.`,
   `Chia hai phân số: A = ${fq(Nm,q)} : ${fq(Dn,q)} = ${fq(Nm,Dn)}.`],'',fq(Nm,Dn)),[p,q,m,n,r,s]]}),

gn('lg.dien_tich_sin',()=>{let a,b;do{a=R(3,14);b=R(3,14)}while((a*b)%4);const B=P([30,45,60]),m=B==30?1:B==45?2:3,c=a*b/4,ans=nz(c,m),sn={30:'1/2',45:'√2/2',60:'√3/2'}[B];
 return[M(`Tam giác ABC có AB = ${a} cm, AC = ${b} cm và ∠A = ${B}°. Diện tích tam giác ABC là (cm²)`,ans,[...new Set([`${a*b/2}`,nz(c,3),nz(c,2),nz(a*b/2,m==1?3:m),`${c}`])].filter(v=>v!=ans),
  [`Kẻ đường cao BH xuống AC: BH = AB·sin A = ${a}·sin ${B}°. Diện tích S = ${fh(1,2)}·AC·BH = ${fh(1,2)}·AB·AC·sin A.`,
   `Với A = ${B}° ta có sin ${B}° = ${sn}.`,
   `S = ${fh(1,2)}·${a}·${b}·${sn} = ${ans} (cm²).`],'',String),[a,b,B]]}));

/* ================= ĐƯỜNG TRÒN: ĐỘ DÀI CUNG, DIỆN TÍCH QUẠT, VÀNH KHUYÊN, VỊ TRÍ ================= */
const ARC=[[20,9],[30,6],[36,5],[40,9],[45,4],[60,3],[72,5],[90,2],[120,3],[135,4],[150,6],[180,1]],  /* [n°, R chia hết cho] để R·n/180 là số nguyên */
SEC=[[90,2],[180,2],[60,6],[120,3],[45,4],[30,6],[40,3],[72,5]],                                     /* R²·n/360 là số nguyên khi R chia hết cho số này */
pi=(c,u)=>`${c}π ${u}`,uniq=a=>[...new Set(a)];

add('l9dt1',
gn('dc.dai_cung',()=>{const [n,st]=P(ARC),R0=st*R(1,Math.max(1,Math.floor(24/st))),c=R0*n/180;
 return[M(`Tính độ dài cung ${n}° của đường tròn có bán kính ${R0} cm.`,pi(c,'cm'),uniq([2*c,R0,c+1,c+R0,n]).filter(v=>v!=c&&v>0).map(v=>pi(v,'cm')),
  [`Độ dài cung n° của đường tròn bán kính R là l = ${fh('πRn',180)}.`,
   `Thay R = ${R0}, n = ${n}: l = ${fh(`π·${R0}·${n}`,180)} = ${fh(`${R0*n}π`,180)}.`,
   `Rút gọn: l = ${c}π (cm).`],'',String),[n,R0]]}),

gn('dc.dien_quat',()=>{const [n,st]=P(SEC),R0=st*R(1,Math.max(1,Math.floor(24/st))),c=R0*R0*n/360;if(!Number.isInteger(c))throw 0;
 return[M(`Tính diện tích hình quạt tròn có số đo cung ${n}° của đường tròn bán kính ${R0} cm.`,pi(c,'cm²'),uniq([2*c,4*c,c+R0,R0*R0,c+1]).filter(v=>v!=c&&v>0).map(v=>pi(v,'cm²')),
  [`Diện tích hình quạt tròn bán kính R, cung n° là S = ${fh('πR²n',360)}.`,
   `Thay R = ${R0}, n = ${n}: S = ${fh(`π·${R0*R0}·${n}`,360)} = ${fh(`${R0*R0*n}π`,360)}.`,
   `Rút gọn: S = ${c}π (cm²).`],'',String),[n,R0]]}),

gn('dc.hinh_vanh',()=>{const r=R(1,12),Rr=r+R(1,9),c=Rr*Rr-r*r;
 return[M(`Hình vành khuyên được giới hạn bởi hai đường tròn đồng tâm có bán kính ${Rr} cm và ${r} cm. Diện tích hình vành khuyên là`,pi(c,'cm²'),uniq([(Rr-r)**2,Rr*Rr+r*r,Rr-r,Rr+r,c+1]).filter(v=>v!=c).map(v=>pi(v,'cm²')),
  [`Diện tích hình vành khuyên bằng hiệu diện tích hai hình tròn: S = πR² − πr² = π(R² − r²).`,
   `Thay R = ${Rr}, r = ${r}: S = π(${Rr*Rr} − ${r*r}).`,`Vậy S = ${c}π (cm²).`],'',String),[Rr,r]]}));

addH('l9dt1',
gn('dc.d_nguyen',()=>{const r=R(2,9),Rr=r+R(1,8),t=R(0,1),c=2*r-1,S=c*Rr;
 return[Iq(t==0?`Hai đường tròn (O; ${Rr} cm) và (O′; ${r} cm) cắt nhau. Hỏi khoảng cách OO′ (đơn vị cm) có thể nhận bao nhiêu giá trị nguyên?`:`Hai đường tròn (O; ${Rr} cm) và (O′; ${r} cm) cắt nhau. Tính tổng các giá trị nguyên có thể có của khoảng cách OO′ (đơn vị cm).`,t==0?c:S,
  [`Hai đường tròn (R > r) cắt nhau khi R − r < OO′ < R + r, tức ${Rr-r} < OO′ < ${Rr+r}.`,
   `Các giá trị nguyên của OO′ là ${Rr-r+1}; ${Rr-r+2}; ...; ${Rr+r-1}, có ${Rr+r-1} − ${Rr-r+1} + 1 = ${c} giá trị.`,
   t==0?`Vậy OO′ nhận ${c} giá trị nguyên.`:`Các giá trị đối xứng quanh ${Rr}, mỗi cặp có tổng ${2*Rr}; tổng là ${c}·${Rr} = ${S}.`],'',String(t==0?c:S)),[Rr,r,t]]}),

gn('dc.tt_goc60',()=>{const r=R(2,12),ask=P(['OM','MA','chu vi']),ans=ask=='OM'?`${2*r}`:ask=='MA'?nz(r,3):nz(3*r,3),
 pool=[`${2*r}`,nz(r,3),nz(3*r,3),`${r}`,`${3*r}`,nz(2*r,3),nz(r,2)].filter(v=>v!=ans);
 return[M(`Từ điểm M nằm ngoài đường tròn (O; ${r} cm) kẻ hai tiếp tuyến MA, MB (A, B là các tiếp điểm) sao cho ∠AMB = 60°. ${ask=='OM'?'Độ dài OM là':ask=='MA'?'Độ dài MA là':'Chu vi tam giác MAB là'} (cm)`,ans,pool.slice(0,6),
  [`MO là tia phân giác của ∠AMB nên ∠AMO = 30°. Tam giác OAM vuông tại A (tiếp tuyến vuông góc bán kính) nên OA = OM·sin 30° = ${fh('OM',2)}, suy ra OM = ${2*r}.`,
   `MA = √(OM² − OA²) = √(${4*r*r} − ${r*r}) = √${3*r*r} = ${nz(r,3)}.`,
   ask=='chu vi'?`Tam giác MAB cân tại M (MA = MB) có ∠M = 60° nên là tam giác đều. Chu vi = 3·MA = ${nz(3*r,3)}.`:`Vậy ${ask=='OM'?`OM = ${2*r}`:`MA = ${nz(r,3)}`} (cm).`],'',String),[r,ask]]}),

gn('dc.tim_R_cung',()=>{const [n,st]=P(ARC),R0=st*R(1,Math.max(1,Math.floor(24/st))),c=R0*n/180;
 return[Iq(`Một cung tròn có số đo ${n}° và độ dài ${c}π cm. Tính bán kính của đường tròn chứa cung đó (cm).`,R0,
  [`Dùng công thức độ dài cung l = ${fh('πRn',180)}, suy ra R = ${fh('180·l',`πn`)}.`,
   `Thay l = ${c}π, n = ${n}: R = ${fh(`180·${c}π`,`π·${n}`)} = ${fh(180*c,n)}.`,`Vậy R = ${R0} cm.`],'',`${R0} cm`),[n,c]]}));

/* ================= GÓC Ở TÂM, SỐ ĐO CUNG, ĐƯỜNG TRÒN NGOẠI TIẾP ================= */
add('l9dt2',
gn('dc.cung_lon',()=>{const t=R(0,1),a=R(20,170),D=v=>`${v}°`;
 return[M(t==0?`Cho đường tròn (O) và góc ở tâm ∠AOB = ${a}° (0° < ∠AOB < 180°). Số đo cung lớn AB là`:`Cung lớn AB của đường tròn (O) có số đo ${360-a}°. Số đo góc ở tâm ∠AOB (chắn cung nhỏ AB) là`,t==0?D(360-a):D(a),
  uniq(t==0?[a,180-a,360-2*a,180+a]:[360-a,180-a,(360-a)/2,2*a]).filter(v=>v!=(t==0?360-a:a)&&v>0&&Number.isInteger(v)).map(D),
  t==0?[`Số đo cung nhỏ AB bằng số đo góc ở tâm ∠AOB = ${a}°.`,`Cung lớn AB và cung nhỏ AB hợp thành cả đường tròn (360°) nên sđ cung lớn AB = 360° − ${a}° = ${360-a}°.`]
  :[`Cung nhỏ AB và cung lớn AB hợp thành cả đường tròn nên sđ cung nhỏ AB = 360° − ${360-a}° = ${a}°.`,`Số đo góc ở tâm bằng số đo cung nhỏ bị chắn nên ∠AOB = ${a}°.`],'',String),[t,a]]}),

gn('dc.cong_cung',()=>{const t=R(0,1);let q,v,st;
 if(t==0){const y=R(20,80),x=y+R(20,90);v=x-y;
  q=`Điểm C nằm trên cung nhỏ AB của đường tròn (O). Biết số đo cung AB bằng ${x}° và số đo cung AC bằng ${y}°. Tính số đo cung CB (độ).`;
  st=[`Vì C nằm trên cung nhỏ AB nên sđ cung AB = sđ cung AC + sđ cung CB.`,`Suy ra sđ cung CB = ${x}° − ${y}° = ${v}°.`]}
 else{const x=R(60,150),y=R(60,150);if(x+y>=330)throw 0;v=360-x-y;
  q=`Ba điểm A, B, C chia đường tròn (O) thành ba cung AB, BC, CA. Biết số đo cung AB bằng ${x}° và số đo cung BC bằng ${y}°. Tính số đo cung CA (độ).`;
  st=[`Ba cung AB, BC, CA hợp thành cả đường tròn nên có tổng số đo bằng 360°.`,`Suy ra sđ cung CA = 360° − ${x}° − ${y}° = ${v}°.`]}
 return[Iq(q,v,st,'',`${v}°`),[t]]}),

gn('dc.hcn_noi_tiep',()=>{const [a,b,c]=tp(5,3);const sw=R(0,1);
 return[Iq(`Hình chữ nhật ABCD có AB = ${sw?b:a} cm, BC = ${sw?a:b} cm. Bốn đỉnh A, B, C, D cùng nằm trên một đường tròn. Tính bán kính của đường tròn đó (cm).`,c/2,
  [`Hai đường chéo AC và BD của hình chữ nhật cắt nhau tại O, ta có OA = OB = OC = OD nên A, B, C, D cùng nằm trên đường tròn tâm O, đường kính AC.`,
   `Tam giác ABC vuông tại B: AC² = AB² + BC² = ${a*a} + ${b*b} = ${c*c}, suy ra AC = ${c} cm.`,
   `Bán kính R = AC : 2 = ${fd(c/2)} (cm).`],'',`${fd(c/2)} cm`),[a,b,c]]}));

addH('l9dt2',
gn('dc.tg_deu',()=>{const k=R(1,12),a=6*k,h=3*k;
 return[M(`Tam giác đều ABC có cạnh ${a} cm nội tiếp đường tròn (O; R). Bán kính R bằng (cm)`,nz(2*k,3),[nz(3*k,3),nz(k,3),`${3*k}`,nz(a,3),nz(4*k,3)],
  [`Đường cao của tam giác đều cạnh a là ${fh('a√3',2)} = ${fh(`${a}√3`,2)} = ${nz(h,3)} cm.`,
   `Tâm O của đường tròn ngoại tiếp là trọng tâm tam giác nên R = OA = ${fh(2,3)} đường cao.`,
   `R = ${fh(2,3)}·${nz(h,3)} = ${nz(2*k,3)} (cm).`],'',String),[k]]}));
})();
