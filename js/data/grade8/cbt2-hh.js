/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 2" — Chương IX: Tam giác đồng dạng (bài 33–37), Chương X: Một số hình khối (bài 38–39)
   Chủ đề l8dd (mã dd2.*), l8py (mã py2.*), l8hc (mã hc2.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Hình: rt (tam giác vuông, có nhãn độ dài) và pyr (hình chóp tứ giác đều) của G8H.
   Kiểm chứng: kiem-chung/lop8-9/oracles8c.js */
(()=>{const {add,addH,gn,M,Iq,fh,fq,fr,fd,fdr,ng,rad,rt,pyr,fg}=G8H,{uq,val}=G8X,
TRI=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]],
tri=(kmax=3)=>{const t=P(TRI),k=R(1,Math.max(1,Math.min(kmax,Math.floor(30/t[2]))));return t.map(v=>v*k)},
okTri=(a,b,c)=>a+b>c&&a+c>b&&b+c>a,
LET=['A','B','C'];

/* ================= TAM GIÁC ĐỒNG DẠNG ================= */
add('l8dd',
gn('dd2.ky_hieu',()=>{const L2=P([['M','N','P'],['D','E','F'],['X','Y','Z'],['P','Q','R'],['H','K','L']]),T2=sh([0,1,2]).map(i=>L2[i]),f=c=>T2[LET.indexOf(c)],
 pairs=[['A','B'],['B','C'],['C','A']],sd=p=>p[0]+p[1],s2=p=>f(p[0])+f(p[1]),TRUE=[],FALSE=[];
 LET.forEach(X=>{TRUE.push(`∠${X} = ∠${f(X)}`);LET.forEach(Y=>{if(Y!=X)FALSE.push(`∠${X} = ∠${f(Y)}`)})});
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)if(i!=j){TRUE.push(`${fh(sd(pairs[i]),s2(pairs[i]))} = ${fh(sd(pairs[j]),s2(pairs[j]))}`);
  for(let r=0;r<3;r++)if(r!=j)FALSE.push(`${fh(sd(pairs[i]),s2(pairs[i]))} = ${fh(sd(pairs[j]),s2(pairs[r]))}`)}
 const a=P(TRUE),w=uq(sh(FALSE)).slice(0,3);if(w.length<3)throw 0;
 return[M(`Cho ΔABC ∽ Δ${T2.join('')} (mỗi tam giác có ba góc đôi một khác nhau). Khẳng định nào sau đây đúng?`,a,w,
  [`ΔABC ∽ Δ${T2.join('')} viết theo thứ tự các đỉnh tương ứng: ${LET.map(c=>`${c} ứng với ${f(c)}`).join('; ')}.`,
   `Các góc tương ứng bằng nhau: ${LET.map(c=>`∠${c} = ∠${f(c)}`).join('; ')}.`,
   `Các cạnh tương ứng tỉ lệ: ${fh('AB',f('A')+f('B'))} = ${fh('BC',f('B')+f('C'))} = ${fh('CA',f('C')+f('A'))}. Khẳng định đúng là ${a}.`],'',String),[T2.join('')]]}),
gn('dd2.tinh_canh',()=>{const p=R(1,6),q=R(2,5);if(p==q||gcd(p,q)!=1)throw 0;let x,y,z,g=0;do{x=R(2,6);y=R(2,6);z=R(2,6);g++}while(!okTri(x,y,z)&&g<50);if(g>=50)throw 0;
 const t=R(0,2),tg=['NP','PM','chu vi tam giác MNP'][t],ans=t==0?p*y:t==1?p*z:p*(x+y+z);
 return[Iq(`Cho ΔABC ∽ ΔMNP (A ứng với M, B ứng với N, C ứng với P) có AB = ${q*x} cm, BC = ${q*y} cm, CA = ${q*z} cm và MN = ${p*x} cm. Tính ${t==2?tg:'độ dài '+tg} (đơn vị: cm).`,ans,
  [`Hai tam giác đồng dạng nên các cạnh tương ứng tỉ lệ: ${fh('MN','AB')} = ${fh('NP','BC')} = ${fh('PM','CA')}.`,
   `Tỉ số đồng dạng: ${fh('MN','AB')} = ${fh(p*x,q*x)} = ${fq(p,q)}.`,
   t==0?`NP = BC · ${fq(p,q)} = ${q*y} · ${fq(p,q)} = ${p*y} (cm).`:t==1?`PM = CA · ${fq(p,q)} = ${q*z} · ${fq(p,q)} = ${p*z} (cm).`:`NP = ${p*y} cm, PM = ${p*z} cm, MN = ${p*x} cm nên chu vi tam giác MNP = ${p*x} + ${p*y} + ${p*z} = ${ans} (cm).`]),[p,q,x,y,z,t]]}),
gn('dd2.dien_tich_ti_so',()=>{const p=R(1,5),q=R(2,6);if(p==q||gcd(p,q)!=1)throw 0;const t=R(0,1),m=R(2,9);
 if(t==0){const S=q*q*m;return[Iq(`ΔABC ∽ ΔDEF với tỉ số đồng dạng k = ${p}/${q} (tức là AB : DE = ${p} : ${q}). Biết diện tích tam giác DEF bằng ${S} cm². Tính diện tích tam giác ABC (cm²).`,p*p*m,
  [`Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng: ${fh('S_ABC','S_DEF')} = k² = (${fq(p,q)})² = ${fq(p*p,q*q)}.`,`S_ABC = ${S} · ${fq(p*p,q*q)} = ${p*p*m} (cm²).`]),[0,p,q,m]]}
 const P2=q*m;return[Iq(`ΔABC ∽ ΔDEF với tỉ số đồng dạng k = ${p}/${q} (tức là AB : DE = ${p} : ${q}). Biết chu vi tam giác DEF bằng ${P2} cm. Tính chu vi tam giác ABC (cm).`,p*m,
  [`Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng: ${fh('P_ABC','P_DEF')} = k = ${fq(p,q)}.`,`P_ABC = ${P2} · ${fq(p,q)} = ${p*m} (cm).`]),[1,p,q,m]]}),
gn('dd2.kiem_tra_ccc',()=>{const p=R(1,5),q=R(2,5);if(p==q||gcd(p,q)!=1)throw 0;let x,y,z,g=0;do{x=R(2,6);y=R(2,6);z=R(2,6);g++}while((!okTri(x,y,z)||x==y||y==z||x==z)&&g<80);if(g>=80)throw 0;
 const sim=R(0,1),d=[p*x,p*y,p*z];if(!sim){const i=R(0,2);d[i]+=P([1,-1])}if(!okTri(...d))throw 0;
 if(!sim){const s1=[q*x,q*y,q*z].sort((m,n)=>m-n),s2=[...d].sort((m,n)=>m-n);if(s1[0]*s2[1]==s1[1]*s2[0]&&s1[0]*s2[2]==s1[2]*s2[0])throw 0}   /* không để hai tam giác đồng dạng theo thứ tự cạnh khác */
 const rs=(a,b)=>b==1?`${a}`:`${a}/${b}`,ok=`Đồng dạng, tỉ số ${rs(q,p)}`,no='Không đồng dạng',ans=sim?ok:no,
 good=(n,d)=>gcd(n,d)==1&&n!=d&&n*p!=q*d,   /* tỉ số nhiễu: tối giản, khác 1, khác q/p */
 more=[[p,q],[q+1,p],[q,p+1],[q+p,p],[q,q+p],[q+1,p+1]].filter(([n,d])=>good(n,d)).map(([n,d])=>`Đồng dạng, tỉ số ${rs(n,d)}`);if(more.length<2)throw 0;
 w=sim?[no,more[0],more[1]]:[ok,more[0],more[1]];
 return[M(`Tam giác ABC có AB = ${q*x} cm, BC = ${q*y} cm, CA = ${q*z} cm; tam giác DEF có DE = ${d[0]} cm, EF = ${d[1]} cm, FD = ${d[2]} cm. Hai tam giác ABC và DEF có đồng dạng với nhau không? Nếu có thì tỉ số AB : DE bằng bao nhiêu?`,ans,w,
  [`Xét các tỉ số các cạnh tương ứng: ${fh('AB','DE')} = ${fh(q*x,d[0])}; ${fh('BC','EF')} = ${fh(q*y,d[1])}; ${fh('CA','FD')} = ${fh(q*z,d[2])}.`,
   sim?`Ba tỉ số đều bằng ${fq(q,p)}, nên ΔABC ∽ ΔDEF (trường hợp cạnh – cạnh – cạnh) với tỉ số ${rs(q,p)}.`:`Ba tỉ số này không bằng nhau, nên hai tam giác không đồng dạng theo trường hợp cạnh – cạnh – cạnh.`,`Vậy đáp án là: ${ans}.`],'',String),[p,q,sim]]}),
gn('dd2.goc_ddang',()=>{const [i,j,k]=sh([0,1,2]),al=R(30,80),be=R(30,80);if(al+be>150)throw 0;const T1=['A','B','C'],T2=['D','E','F'],r=180-al-be;
 return[Iq(`Cho ΔABC ∽ ΔDEF (A ứng với D, B ứng với E, C ứng với F). Biết ∠${T1[i]} = ${al}° và ∠${T2[j]} = ${be}°. Tính số đo ∠${T2[k]} (độ).`,r,
  [`Hai tam giác đồng dạng nên các góc tương ứng bằng nhau: ∠${T2[i]} = ∠${T1[i]} = ${al}° và ∠${T1[j]} = ∠${T2[j]} = ${be}°.`,
   `Tổng ba góc của một tam giác bằng 180°, nên ∠${T2[k]} = 180° − ∠${T2[i]} − ∠${T2[j]} = 180° − ${al}° − ${be}°.`,`∠${T2[k]} = ${r}°.`]),[i,j,al,be]]}),
gn('dd2.truong_hop',()=>{const t=R(0,3),x=R(3,6),y=R(3,6),z=R(3,6),k=R(2,3),al=R(40,80),be=R(40,80);if(t==0&&!okTri(x,y,z))throw 0;if(x==y)throw 0;
 const C1='Trường hợp cạnh – cạnh – cạnh (c.c.c)',C2='Trường hợp cạnh – góc – cạnh (c.g.c)',C3='Trường hợp góc – góc (g.g)',C4='Chưa đủ điều kiện để kết luận hai tam giác đồng dạng';
 const D=[`Tam giác ABC có AB = ${x} cm, BC = ${y} cm, CA = ${z} cm; tam giác DEF có DE = ${k*x} cm, EF = ${k*y} cm, FD = ${k*z} cm.`,
  `Tam giác ABC có AB = ${x} cm, AC = ${y} cm, ∠A = ${al}°; tam giác DEF có DE = ${k*x} cm, DF = ${k*y} cm, ∠D = ${al}°.`,
  `Tam giác ABC có ∠A = ${al}°, ∠B = ${be}°; tam giác DEF có ∠D = ${al}°, ∠E = ${be}°.`,
  `Tam giác ABC có AB = ${x} cm, AC = ${y} cm, ∠B = ${al}°; tam giác DEF có DE = ${k*x} cm, DF = ${k*y} cm, ∠E = ${al}°.`][t],ans=[C1,C2,C3,C4][t];
 return[M(`${D} Có thể kết luận hai tam giác đồng dạng theo trường hợp nào?`,ans,[C1,C2,C3,C4].filter(v=>v!=ans),
  [`Đối chiếu dữ kiện với các trường hợp đồng dạng: c.c.c (ba cặp cạnh tỉ lệ), c.g.c (hai cặp cạnh tỉ lệ và góc xen giữa bằng nhau), g.g (hai cặp góc bằng nhau).`,
   [`Các cạnh tương ứng: ${fh('AB','DE')} = ${fh('BC','EF')} = ${fh('CA','FD')} = ${fq(1,k)}, tỉ lệ ba cặp cạnh nên đồng dạng theo trường hợp c.c.c.`,
    `Hai cặp cạnh tỉ lệ: ${fh('AB','DE')} = ${fh('AC','DF')} = ${fq(1,k)} và góc xen giữa hai cạnh đó bằng nhau (∠A = ∠D), nên đồng dạng theo trường hợp c.g.c.`,
    `Hai góc của tam giác này lần lượt bằng hai góc của tam giác kia (∠A = ∠D, ∠B = ∠E), nên đồng dạng theo trường hợp g.g.`,
    `Hai cặp cạnh tỉ lệ nhưng góc đã cho (∠B = ∠E) không phải góc xen giữa hai cạnh AB, AC (góc xen giữa là ∠A và ∠D). Do đó chưa đủ điều kiện để kết luận.`][t]],'',String),[t]]}),
gn('dd2.cao_ah',()=>{const k=R(1,6),sw=R(0,1),AB=sw?4*k:3*k,AC=sw?3*k:4*k,BC=5*k,t=R(0,2),
 v=[AB*AC/BC,AB*AB/BC,AC*AC/BC][t],nm=['AH','BH','CH'][t];
 return[Iq(`Cho tam giác ABC vuông tại A có AB = ${AB} cm, AC = ${AC} cm. Kẻ đường cao AH (H thuộc BC). Tính độ dài ${nm} (cm). (Nhập số thập phân nếu cần.)`,v,
  [`Theo định lí Pythagore: BC² = AB² + AC² = ${AB}² + ${AC}² = ${BC*BC}, suy ra BC = ${BC} cm.`,
   `Hai tam giác vuông HBA và ABC có chung góc B nên ΔHBA ∽ ΔABC (g.g). Suy ra ${fh('BH','AB')} = ${fh('AB','BC')} = ${fh('HA','AC')}.`,
   t==0?`AH = ${fh('AB·AC','BC')} = ${fh(`${AB}·${AC}`,BC)} = ${fd(v)} (cm).`:t==1?`BH = ${fh('AB²','BC')} = ${fh(`${AB}²`,BC)} = ${fd(v)} (cm).`:`Tương tự, ΔHCA ∽ ΔACB nên CH = ${fh('AC²','BC')} = ${fh(`${AC}²`,BC)} = ${fd(v)} (cm).`]),[AB,AC,t]]}),
gn('dd2.ban_do',()=>{const N=P([50000,100000,200000,500000,1000000]),d=R(2,18),km=d*N/100000,t=R(0,1);
 return t==0?[Iq(`Trên một bản đồ có tỉ lệ 1 : ${N}, khoảng cách giữa hai thành phố là ${d} cm. Khoảng cách thực tế giữa hai thành phố đó là bao nhiêu kilômét? (Nhập số thập phân nếu cần.)`,km,
  [`Bản đồ tỉ lệ 1 : ${N} nghĩa là 1 cm trên bản đồ ứng với ${N} cm ngoài thực tế (hình trên bản đồ đồng dạng với hình thực tế).`,`Khoảng cách thực tế: ${d} · ${N} = ${d*N} (cm) = ${fd(d*N/100000)} (km), vì 1 km = 100 000 cm.`]),[0,N,d]]:
  [Iq(`Trên một bản đồ có tỉ lệ 1 : ${N}, hai thành phố cách nhau ${fd(km)} km ngoài thực tế. Khoảng cách giữa hai thành phố đó trên bản đồ là bao nhiêu xentimét?`,d,
  [`Đổi ${fd(km)} km = ${fd(km*100000)} cm.`,`Bản đồ tỉ lệ 1 : ${N} nên khoảng cách trên bản đồ là ${fd(km*100000)} : ${N} = ${d} (cm).`]),[1,N,d]]}));

addH('l8dd',
gn('dd2.hieu_dien_tich',()=>{const q=R(2,7),p=P([...Array(q-1)].map((_,i)=>i+1).filter(v=>gcd(v,q)==1)),m=R(2,8),S=q*q*m,Dd=m*(q*q-p*p);
 return[Iq(`ΔA′B′C′ ∽ ΔABC với tỉ số đồng dạng k = ${p}/${q} (k nhỏ hơn 1). Biết diện tích tam giác ABC hơn diện tích tam giác A′B′C′ là ${Dd} cm². Tính diện tích tam giác ABC (cm²).`,S,
  [`Tỉ số diện tích bằng k² = (${fq(p,q)})² = ${fq(p*p,q*q)}, nên S_A′B′C′ = ${fq(p*p,q*q)} · S_ABC.`,
   `Hiệu diện tích: S_ABC − S_A′B′C′ = S_ABC · (1 − ${fq(p*p,q*q)}) = S_ABC · ${fq(q*q-p*p,q*q)} = ${Dd}.`,`Suy ra S_ABC = ${Dd} : ${fq(q*q-p*p,q*q)} = ${Dd} · ${fq(q*q,q*q-p*p)} = ${S} (cm²).`]),[p,q,m]]}),
gn('dd2.hieu_chu_vi',()=>{const p=R(3,8),q=P([...Array(p-1)].map((_,i)=>i+1).filter(v=>gcd(v,p)==1)),m=R(2,9),Pb=p*m,Ps=q*m;
 return[Iq(`Hai tam giác đồng dạng có tỉ số đồng dạng ${p}/${q} (tam giác lớn so với tam giác nhỏ). Chu vi tam giác lớn hơn chu vi tam giác nhỏ ${Pb-Ps} cm. Tính chu vi tam giác lớn (cm).`,Pb,
  [`Tỉ số chu vi bằng tỉ số đồng dạng: ${fh('P_lớn','P_nhỏ')} = ${fq(p,q)}, nên P_lớn = ${fq(p,q)} · P_nhỏ.`,`P_lớn − P_nhỏ = ${Pb-Ps}, tức là P_nhỏ · (${fq(p,q)} − 1) = ${Pb-Ps}, hay P_nhỏ · ${fq(p-q,q)} = ${Pb-Ps}.`,
   `Suy ra P_nhỏ = ${Pb-Ps} · ${fq(q,p-q)} = ${Ps} (cm), và P_lớn = ${Ps} · ${fq(p,q)} = ${Pb} (cm).`]),[p,q,m]]}));

/* ================= PYTHAGORE ================= */
add('l8py',
gn('py2.hinh_tim_x',()=>{const [a,b,c]=tri(3),sw=R(0,1),AB=sw?a:b,AC=sw?b:a,u=R(0,2),lab=v=>`${v} cm`,ans=[AB,AC,c][u];
 const s={AB:u==0?'x':lab(AB),AC:u==1?'x':lab(AC),BC:u==2?'x':lab(c)};
 return[fg(Iq(`Cho tam giác ABC vuông tại A với các độ dài như trong hình. Tìm x (đơn vị: cm).`,ans,
  [`Tam giác ABC vuông tại A nên cạnh huyền là BC. Theo định lí Pythagore: BC² = AB² + AC².`,
   u==2?`x² = ${AB}² + ${AC}² = ${AB*AB} + ${AC*AC} = ${c*c}, suy ra x = ${c}.`:u==0?`${c}² = x² + ${AC}², suy ra x² = ${c*c} − ${AC*AC} = ${AB*AB}, nên x = ${AB}.`:`${c}² = ${AB}² + x², suy ra x² = ${c*c} − ${AB*AB} = ${AC*AC}, nên x = ${AC}.`,`Vậy x = ${ans} cm.`]),rt(s)),[a,b,c,u]]}),
gn('py2.dao_goc',()=>{const [a,b,c]=tri(3),ri=R(0,3),V=['A','B','C'];let s=[a,b,c];
 if(ri==3){const i=R(0,2);s[i]+=P([1,-1])}
 const pos=sh([0,1,2]),len=[0,0,0];pos.forEach((p,i)=>len[p]=s[i]);   /* len[0]=BC, len[1]=CA, len[2]=AB */
 const BC=len[0],CA=len[1],AB=len[2],sq=[BC*BC,CA*CA,AB*AB],mx=Math.max(...sq),others=sq.reduce((x,y)=>x+y,0)-mx,right=mx==others,vi=right?sq.indexOf(mx):-1;
 if(!okTri(BC,CA,AB))throw 0;if(!right&&ri<3)throw 0;if(right&&ri==3)throw 0;
 const O=['Tam giác ABC vuông tại A','Tam giác ABC vuông tại B','Tam giác ABC vuông tại C','Tam giác ABC không phải là tam giác vuông'],ans=right?O[vi]:O[3];
 return[M(`Tam giác ABC có AB = ${AB} cm, BC = ${BC} cm, CA = ${CA} cm. Khẳng định nào sau đây đúng?`,ans,O.filter(v=>v!=ans),
  [`Dùng định lí Pythagore đảo: tam giác có bình phương một cạnh bằng tổng bình phương hai cạnh còn lại thì là tam giác vuông, cạnh đó là cạnh huyền.`,
   `Cạnh dài nhất là ${['BC','CA','AB'][sq.indexOf(mx)]} = ${Math.sqrt(mx)} cm: bình phương là ${mx}. Tổng bình phương hai cạnh còn lại: ${others}.`,
   right?`Vì ${mx} = ${others} nên tam giác vuông, góc vuông đối diện cạnh huyền ${['BC','CA','AB'][vi]}, tức là vuông tại ${V[vi]}.`:`Vì ${mx} ≠ ${others} nên tam giác ABC không vuông.`],'',String),[AB,BC,CA]]}),
gn('py2.tam_giac_deu',()=>{const k=R(1,9),t=R(0,1),a=2*k,h=rad(k,3),S=rad(k*k,3);
 return t==0?[M(`Tam giác đều ABC có cạnh ${a} cm. Độ dài đường cao AH là`,`${h} cm`,[`${rad(a,3)} cm`,`${rad(k,2)} cm`,`${a} cm`,`${k} cm`],
  [`Trong tam giác đều, đường cao AH cũng là đường trung tuyến nên H là trung điểm BC, BH = ${k} cm.`,`Tam giác AHB vuông tại H: AH² = AB² − BH² = ${a}² − ${k}² = ${a*a-k*k}.`,`AH = √${a*a-k*k} = ${h} cm.`],'',String),[0,k]]:
  [M(`Tam giác đều ABC có cạnh ${a} cm. Diện tích tam giác ABC là`,`${S} cm²`,[`${rad(2*k*k,3)} cm²`,`${rad(k*k,2)} cm²`,`${k*k} cm²`,`${rad(k,3)} cm²`],
  [`Gọi H là trung điểm BC thì AH ⊥ BC và BH = ${k} cm. Tam giác AHB vuông tại H: AH² = ${a}² − ${k}² = ${a*a-k*k}, nên AH = ${h} cm.`,`Diện tích tam giác ABC = ${fq(1,2)} · BC · AH = ${fq(1,2)} · ${a} · ${h} = ${S} cm².`],'',String),[1,k]]}),
gn('py2.hcn_cheo',()=>{const [a,b,c]=tri(4),sw=R(0,1),w=sw?a:b,t=R(0,1),other=sw?b:a;
 return[Iq(`Hình chữ nhật ABCD có AB = ${w} cm và đường chéo AC = ${c} cm. Tính ${t?'chu vi':'diện tích'} hình chữ nhật ABCD (${t?'cm':'cm²'}).`,t?2*(w+other):w*other,
  [`Tam giác ABC vuông tại B nên BC² = AC² − AB² = ${c}² − ${w}² = ${c*c-w*w}, suy ra BC = ${other} cm.`,t?`Chu vi = 2 · (AB + BC) = 2 · (${w} + ${other}) = ${2*(w+other)} (cm).`:`Diện tích = AB · BC = ${w} · ${other} = ${w*other} (cm²).`]),[w,c,t]]}));
addH('l8py',
gn('py2.ah_ba_canh',()=>{const S=[[12,5,9],[12,5,16],[12,9,16],[12,5,35],[12,16,35],[8,6,15],[15,8,20],[15,8,36],[24,7,10],[24,7,18],[24,10,18],[24,10,32],[24,18,32],[20,15,21],[16,12,30],[9,12,40],[6,8,8]],[h,bh,ch]=P(S),AB=Math.round(Math.hypot(h,bh)),AC=Math.round(Math.hypot(h,ch)),BC=bh+ch;
 if(AB*AB!=h*h+bh*bh||AC*AC!=h*h+ch*ch)throw 0;
 return[Iq(`Tam giác ABC có AB = ${AB} cm, AC = ${AC} cm, BC = ${BC} cm. Kẻ đường cao AH (H nằm giữa B và C). Tính độ dài AH (cm).`,h,
  [`Đặt BH = x thì CH = ${BC} − x. Tam giác AHB vuông tại H: AH² = ${AB}² − x². Tam giác AHC vuông tại H: AH² = ${AC}² − (${BC} − x)².`,
   `Cho hai biểu thức bằng nhau: ${AB*AB} − x² = ${AC*AC} − (${BC*BC} − ${2*BC}x + x²), suy ra ${2*BC}x = ${AB*AB-AC*AC+BC*BC}, x = ${bh}.`,`AH² = ${AB}² − ${bh}² = ${AB*AB} − ${bh*bh} = ${h*h}, nên AH = ${h} cm.`]),[AB,AC,BC]]}));

/* ================= HÌNH CHÓP ================= */
add('l8hc',
gn('hc2.sxq_tg',()=>{const [u,v,w]=tri(5),a=2*u,S=3*u*v;
 return[Iq(`Hình chóp tam giác đều S.ABC có cạnh đáy AB = ${a} cm và cạnh bên SA = ${w} cm. Tính diện tích xung quanh của hình chóp (cm²).`,S,
  [`Gọi M là trung điểm AB. Tam giác SAB cân tại S nên SM ⊥ AB và SM là trung đoạn của hình chóp; AM = ${u} cm.`,`Tam giác SAM vuông tại M: SM² = SA² − AM² = ${w}² − ${u}² = ${w*w-u*u}, suy ra SM = ${v} cm.`,
   `Nửa chu vi đáy: p = 3 · ${a} : 2 = ${3*u} (cm). Diện tích xung quanh: S_xq = p · d = ${3*u} · ${v} = ${S} (cm²).`]),[a,w]]}),
gn('hc2.v_tg',()=>{const a=R(3,12),ha=R(2,10),h=R(3,12);if((a*ha*h)%6)throw 0;const V=a*ha*h/6;
 return[Iq(`Hình chóp S.ABC có đáy là tam giác ABC với cạnh BC = ${a} cm và đường cao tương ứng AK = ${ha} cm. Chiều cao của hình chóp là ${h} cm. Tính thể tích hình chóp (cm³).`,V,
  [`Diện tích đáy: S = ${fq(1,2)} · BC · AK = ${fq(1,2)} · ${a} · ${ha} = ${a*ha/2} (cm²).`,`Thể tích hình chóp: V = ${fq(1,3)} · S · h = ${fq(1,3)} · ${a*ha/2} · ${h}.`,`V = ${V} (cm³).`]),[a,ha,h]]}),
gn('hc2.v_tu_giac',()=>{const [u,h,d]=tri(6),a=2*u,V=a*a*h/3;
 return[fg(Iq(`Hình chóp tứ giác đều S.ABCD có cạnh đáy ${a} cm và trung đoạn SM = ${d} cm (M là trung điểm cạnh đáy, hình vẽ minh họa). Tính thể tích hình chóp (cm³).`,V,
  [`Gọi O là tâm của đáy thì SO là chiều cao và OM = ${u} cm (bằng nửa cạnh đáy).`,`Tam giác SOM vuông tại O: SO² = SM² − OM² = ${d}² − ${u}² = ${d*d-u*u}, suy ra SO = ${h} cm.`,
   `Diện tích đáy: ${a}² = ${a*a} (cm²). Thể tích: V = ${fq(1,3)} · ${a*a} · ${h} = ${V} (cm³).`]),pyr()),[a,d]]}),
gn('hc2.stp_tu_giac',()=>{const [u,d,b]=tri(6),a=2*u,S=2*a*d+a*a;
 return[Iq(`Hình chóp tứ giác đều S.ABCD có cạnh đáy ${a} cm và cạnh bên ${b} cm. Tính diện tích toàn phần của hình chóp (cm²).`,S,
  [`Gọi M là trung điểm cạnh đáy AB. Tam giác SAB cân tại S nên SM là trung đoạn, và AM = ${u} cm.`,`SM² = SA² − AM² = ${b}² − ${u}² = ${b*b-u*u}, suy ra SM = ${d} cm.`,
   `Diện tích xung quanh: S_xq = p · d = (2 · ${a}) · ${d} = ${2*a*d} (cm²). Diện tích đáy: ${a}² = ${a*a} (cm²).`,`Diện tích toàn phần: ${2*a*d} + ${a*a} = ${S} (cm²).`]),[a,b]]}),
gn('hc2.tim_a_sxq',()=>{const a=R(3,14),d=R(4,15),S=2*a*d;if(2*d<=a)throw 0;
 return[fg(Iq(`Hình chóp tứ giác đều có trung đoạn bằng ${d} cm và diện tích xung quanh bằng ${S} cm². Tính độ dài cạnh đáy (cm).`,a,
  [`Công thức: S_xq = p · d, trong đó p là nửa chu vi đáy. Đáy là hình vuông cạnh a nên p = 2a.`,`Thay số: ${S} = 2a · ${d} = ${2*d}a.`,`Suy ra a = ${S} : ${2*d} = ${a} (cm).`]),pyr()),[a,d]]}),
gn('hc2.leu_chi_phi',()=>{const a=R(2,6),d=R(2,6),p=P([20,25,30,40,50]),S=2*a*d;if(2*d<=a)throw 0;
 return[Iq(`Một chiếc lều có dạng hình chóp tứ giác đều với cạnh đáy ${a} m và trung đoạn ${d} m. Người ta phủ vải bốn mặt bên của lều (không tính đáy), giá vải ${p} nghìn đồng/m². Tính chi phí mua vải (nghìn đồng), coi như không hao hụt.`,S*p,
  [`Diện tích vải bằng diện tích xung quanh của hình chóp: S_xq = p_đáy · d, với nửa chu vi đáy là 2 · ${a} = ${2*a} (m).`,`S_xq = ${2*a} · ${d} = ${S} (m²).`,`Chi phí: ${S} · ${p} = ${S*p} (nghìn đồng).`]),[a,d,p]]}),
gn('hc2.dung_tich_lit',()=>{const a=R(3,9),h=R(3,12);if((a*a*h)%3)throw 0;const V=a*a*h/3;
 return[Iq(`Một hộp đựng có dạng hình chóp tứ giác đều với cạnh đáy ${a} dm và chiều cao ${h} dm. Khi đổ đầy nước vào hộp thì hộp chứa được bao nhiêu lít nước? (1 dm³ = 1 lít)`,V,
  [`Diện tích đáy: ${a}² = ${a*a} (dm²).`,`Thể tích: V = ${fq(1,3)} · S · h = ${fq(1,3)} · ${a*a} · ${h} = ${V} (dm³).`,`Vì 1 dm³ = 1 lít nên hộp chứa được ${V} lít nước.`]),[a,h]]}));
addH('l8hc',
gn('hc2.tim_h_tg',()=>{const S=R(2,12)*3,h=R(2,12),V=S*h/3;
 return[Iq(`Hình chóp S.ABC có thể tích ${V} cm³ và diện tích đáy ABC bằng ${S} cm². Tính chiều cao của hình chóp (cm).`,h,
  [`Công thức thể tích: V = ${fq(1,3)} · S · h, suy ra h = ${fh('3V','S')}.`,`Thay số: h = ${fh(`3 · ${V}`,S)} = ${fh(3*V,S)}.`,`h = ${h} (cm).`]),[S,h]]}),
gn('hc2.cao_tu_canh_ben',()=>{const k=R(1,9),a=4*k,b=3*k;
 return[fg(Iq(`Hình chóp tứ giác đều S.ABCD có cạnh đáy ${a} cm và cạnh bên ${b} cm. Tính chiều cao SO của hình chóp (cm), với O là tâm của đáy.`,k,
  [`Đáy ABCD là hình vuông cạnh ${a} nên đường chéo AC² = ${a}² + ${a}² = ${2*a*a}. Do O là trung điểm AC nên OA² = ${fh(2*a*a,4)} = ${a*a/2}.`,`Tam giác SOA vuông tại O: SO² = SA² − OA² = ${b}² − ${a*a/2} = ${b*b} − ${a*a/2} = ${k*k}.`,`Suy ra SO = ${k} (cm).`]),pyr()),[a,b]]}),
gn('hc2.ti_so_the_tich',()=>{const a=R(3,9),h=R(3,12),k=R(2,4),t=R(0,1);if((a*a*h)%3)throw 0;const V=a*a*h/3;
 return[Iq(t==0?`Hình chóp tứ giác đều thứ nhất có cạnh đáy ${a} cm, chiều cao ${h} cm và thể tích ${V} cm³. Hình chóp tứ giác đều thứ hai có cùng chiều cao nhưng cạnh đáy dài gấp ${k} lần. Tính thể tích hình chóp thứ hai (cm³).`:`Hình chóp tứ giác đều thứ nhất có cạnh đáy ${a} cm, chiều cao ${h} cm và thể tích ${V} cm³. Hình chóp tứ giác đều thứ hai có cùng cạnh đáy nhưng chiều cao gấp ${k} lần. Tính thể tích hình chóp thứ hai (cm³).`,t==0?k*k*V:k*V,
  t==0?[`Cạnh đáy hình thứ hai là ${k*a} cm nên diện tích đáy là ${k*a}² = ${k*k*a*a} (cm²), gấp ${k*k} lần diện tích đáy hình thứ nhất (${a*a} cm²).`,`Chiều cao không đổi (${h} cm), nên thể tích gấp ${k*k} lần: ${k*k} · ${V} = ${k*k*V} (cm³).`]:
   [`Hai hình có cùng diện tích đáy ${a*a} cm². Chiều cao hình thứ hai là ${k*h} cm.`,`Thể tích hình thứ hai: V = ${fq(1,3)} · ${a*a} · ${k*h} = ${k*V} (cm³), gấp ${k} lần thể tích hình thứ nhất.`]),[a,h,k,t]]}));
})();
