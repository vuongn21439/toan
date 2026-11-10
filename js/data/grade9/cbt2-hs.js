/* LỚP 9 · bổ sung từ "Tài liệu học thêm Toán 9 – Học kì II (KNTT)" — hàm số y = ax² và đồ thị, tương giao parabol – đường thẳng (v16)
   Chủ đề l9hsb2 (mã hs3.*). Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề. Kiểm chứng: kiem-chung/lop8-9/oracles9c.js */
(()=>{const {add,addH,gn,M,Iq,fg,fh,fq,fr,fd,lin,cf,ng,PL,sv,tx,dot}=G8H,{F,nzc,ab}=G9X,
q2=(a,b,c)=>PL.str(PL.norm([[a,2],[b,1],[c,0]])),
fn=a=>`y = ${cf(a)}x^2`,            /* y = ax² (a = ±1 thì không viết số 1) */
/* hình parabol y = ax² đi qua A(px; a·px²), nhìn từ trục tọa độ */
par=(a,px)=>{const q=a*px*px,up=a>0,ox=120,oy=up?122:30,sy=76/ab(q),X=Math.min(3.6,Math.sqrt(100/(sy*ab(a)))),pts=[];
 for(let x=-X;x<=X+1e-9;x+=.1)pts.push(`${(ox+26*x).toFixed(1)} ${(oy-sy*a*x*x).toFixed(1)}`);
 const ax=ox+26*px,ay=oy-76*Math.sign(q);
 return sv(`<path d="M10 ${oy}H230M${ox} 8V142"/><path d="M${pts.join('L')}" style="stroke:#54a0ff"/><path d="M${ax} ${ay}V${oy}M${ax} ${ay}H${ox}" stroke-dasharray="4 3"/>${dot(ax,ay)}${tx(ox-8,oy+(up?14:-6),'O','end')}${tx(228,oy+(up?-6:14),'x','end')}${tx(ox+9,16,'y','start')}${tx(ax+(px>0?-6:6),ay+(up?-8:16),`A(${ng(px)}; ${ng(q)})`,px>0?'end':'start',12)}`)};

/* ================= HÀM SỐ y = ax²: CƠ BẢN ================= */
add('l9hsb2',
gn('hs3.nhan_dang',()=>{const mk=()=>{const t=R(0,5),a=nzc(5),k=R(2,6),b=nzc(5),c=nzc(6);
 return[[`y = ${cf(a)}x^2`,1,`có dạng ax^2 với a = ${ng(a)}`],[`y = ${cf(k)}x`,0,'là hàm số bậc nhất (không có x^2)'],[`y = ${cf(b)}x^2 ${c<0?'−':'+'} ${ab(c)}`,0,'có thêm hạng tử tự do'],[`y = ${fh(k,'x')}`,0,'có x ở mẫu'],[`y = ${cf(b)}x^3`,0,'là hàm số bậc ba'],[`y = ${cf(a)}x^2 ${k%2?'+':'−'} ${cf(k)}x`,0,'có thêm hạng tử chứa x'],[`y = ${fh(k,'x^2')}`,0,'có x^2 ở mẫu']][t]},
 L=[mk(),mk(),mk(),mk()],n=L.filter(x=>x[1]).length,cnt=sh([0,1,2,3,4]);
 if(new Set(L.map(x=>x[0])).size<4)throw 0;
 return[M(`Cho các hàm số: ${L.map((x,i)=>`(${i+1}) ${x[0]}`).join('; ')}. Có bao nhiêu hàm số có dạng y = ax^2 (a ≠ 0)?`,n,[0,1,2,3,4].filter(v=>v!=n),
  [`Hàm số có dạng y = ax^2 (a ≠ 0) khi y bằng một số khác 0 nhân với x^2 và không có hạng tử nào khác.`,...L.map((x,i)=>`(${i+1}) ${x[0]}: ${x[1]?'đúng dạng, ':'không phải dạng y = ax^2, '}${x[2]}.`),`Có ${n} hàm số có dạng y = ax^2.`],'',String),[L.map(x=>x[0])]]}),

gn('hs3.he_so_a',()=>{const t=R(0,2),s=P([1,-1]);let a,disp;
 if(t==0){const[p,q]=P([[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5]]);a=[s*p,q];disp=`y = ${s<0?'−':''}${fh(p,q)}x^2`}
 else if(t==1){const q=R(2,6);a=[s,q];disp=`y = ${s<0?'−':''}${fh('x^2',q)}`}
 else{const k=R(2,9);a=[s*k,1];disp=`y = ${s<0?'−':''}${k}x^2`}
 const A=fq(a[0],a[1]),neg=fq(-a[0],a[1]),inv=a[0]==0?'':fq(a[1],a[0]);
 return[M(`Hàm số ${disp} có hệ số a bằng`,A,[neg,inv,fq(a[0]+1,a[1]),fq(a[0],a[1]+1),fq(a[1],1)].filter(v=>v!=A),
  [`Viết hàm số về dạng y = ax^2 và đối chiếu: ${disp}.`,`Hệ số đứng trước x^2 chính là a, nên a = ${A}.`],'',String),[a]]}),

gn('hs3.ct_thuc_te',()=>{const t=R(0,5),m2=P([2,4,6,8,10,12]),v=R(2,8);
 if(t==0){const k=P([2,3,4,5,6,8,10]),s=+(4.9*k*k).toFixed(4);
  return[Iq(`Quãng đường s (mét) của một vật rơi tự do sau t giây được tính bởi công thức s = 4,9t^2. Tính quãng đường vật rơi được sau ${k} giây (đơn vị: mét).`,s,[`Thay t = ${k} vào công thức: s = 4,9·${k}^2.`,`Vì ${k}^2 = ${k*k} nên s = 4,9·${k*k} = ${fd(s)} (m).`],'',`${fd(s)} m`),[t]]}
 if(t==1){const k=P([2,3,4,5,6,8,10]),s=+(4.9*k*k).toFixed(4);
  return[Iq(`Một vật rơi tự do theo công thức s = 4,9t^2 (s: mét, t: giây). Vật rơi được ${fd(s)} m thì mất bao nhiêu giây?`,k,[`Thay s = ${fd(s)} vào công thức: 4,9t^2 = ${fd(s)}.`,`Suy ra t^2 = ${fd(s)} : 4,9 = ${k*k}.`,`Vì t > 0 nên t = √${k*k} = ${k} (giây).`],'',`${k} giây`),[t]]}
 if(t==2){const r=R(2,12),S=Math.round(314*r*r)/100;
  return[Iq(`Diện tích hình tròn bán kính r (mét) là S = 3,14r^2 (m^2). Tính diện tích hình tròn có bán kính ${r} m (đơn vị: m^2).`,S,[`Thay r = ${r} vào công thức: S = 3,14·${r}^2.`,`Vì ${r}^2 = ${r*r} nên S = 3,14·${r*r} = ${fd(S)} (m^2).`],'',`${fd(S)} m^2`),[t]]}
 if(t==3){const r=R(2,12),S=Math.round(314*r*r)/100;
  return[Iq(`Một hình tròn có diện tích ${fd(S)} m^2. Dùng công thức S = 3,14r^2, tính bán kính r của hình tròn (mét).`,r,[`Thay S = ${fd(S)}: 3,14r^2 = ${fd(S)}.`,`Suy ra r^2 = ${fd(S)} : 3,14 = ${r*r}.`,`Vì r > 0 nên r = √${r*r} = ${r} (m).`],'',`${r} m`),[t]]}
 const c=m2/2;
 if(t==4)return[Iq(`Động năng W (jun) của vật khối lượng ${m2} kg chuyển động với tốc độ v (m/s) là W = ${fh(1,2)}·m·v^2. Tính động năng của vật khi v = ${v} m/s.`,c*v*v,[`Với m = ${m2}: W = ${fh(1,2)}·${m2}·v^2 = ${c}v^2.`,`Thay v = ${v}: W = ${c}·${v}^2 = ${c}·${v*v} = ${c*v*v} (J).`],'',`${c*v*v} J`),[t]];
 return[Iq(`Động năng W (jun) của vật khối lượng ${m2} kg chuyển động với tốc độ v (m/s) là W = ${fh(1,2)}·m·v^2. Vật có động năng ${c*v*v} J thì tốc độ của nó là bao nhiêu m/s?`,v,[`Với m = ${m2}: W = ${fh(1,2)}·${m2}·v^2 = ${c}v^2.`,`Từ ${c}v^2 = ${c*v*v} suy ra v^2 = ${v*v}.`,`Vì v > 0 nên v = √${v*v} = ${v} (m/s).`],'',`${v} m/s`),[t]]}),

gn('hs3.chop',()=>{const k=R(2,9),h=3*k,t=R(0,2),a0=R(3,15),V0=k*a0*a0;
 const base=`Một hình chóp tứ giác đều có đáy là hình vuông cạnh a (cm), chiều cao h (cm); thể tích V = ${fh(1,3)}·a^2·h.`;
 if(t==0)return[M(`${base} Với h = ${h} cm, công thức tính thể tích V theo a là`,`V = ${cf(k)}a^2`,[`V = ${h}a^2`,`V = ${cf(k)}a`,`V = ${k+1}a^2`,`V = ${fh(k,9)}a^2`].filter(x=>x!=`V = ${cf(k)}a^2`),
  [`Thay h = ${h} vào V = ${fh(1,3)}·a^2·h.`,`V = ${fh(1,3)}·a^2·${h} = ${cf(k)}a^2.`],'',String),[t]];
 if(t==1)return[Iq(`${base} Với h = ${h} cm, tính thể tích hình chóp khi cạnh đáy a = ${a0} cm (đơn vị: cm^3).`,V0,[`Thay h = ${h}: V = ${fh(1,3)}·a^2·${h} = ${cf(k)}a^2.`,`Với a = ${a0}: V = ${k}·${a0}^2 = ${k}·${a0*a0} = ${V0} (cm^3).`],'',`${V0} cm^3`),[t]];
 return[Iq(`${base} Một hình chóp như vậy có chiều cao ${h} cm và thể tích ${V0} cm^3. Tính độ dài cạnh đáy a (cm).`,a0,[`Thay h = ${h}: V = ${fh(1,3)}·a^2·${h} = ${cf(k)}a^2.`,`Từ ${cf(k)}a^2 = ${V0} suy ra a^2 = ${a0*a0}.`,`Vì a > 0 nên a = √${a0*a0} = ${a0} (cm).`],'',`${a0} cm`),[t]]}),

gn('hs3.bang_suy',()=>{const a=nzc(4),p=P([1,2,3,4]),s=P([1,-1]),A=[s*p,a*p*p],r=P([1,2,3,4,5,6].filter(v=>v!=p))*P([1,-1]),m=a*r*r;
 return[Iq(`Đồ thị hàm số y = ax^2 đi qua điểm A(${ng(A[0])}; ${ng(A[1])}). Điểm B(${ng(r)}; m) cũng thuộc đồ thị hàm số đó. Tìm m.`,m,
  [`Vì A thuộc đồ thị nên ${ng(A[1])} = a·${pa(A[0])}^2 = ${p*p}a, suy ra a = ${ng(a)}.`,`Hàm số là y = ${cf(a)}x^2.`,`B thuộc đồ thị nên m = ${ng(a)}·${pa(r)}^2 = ${ng(a)}·${r*r} = ${ng(m)}.`],'',`m = ${ng(m)}`),[a]]}),

gn('hs3.so_sanh',()=>{const a=nzc(3),u=nzc(5),v=nzc(5);if(u==v)throw 0;
 const fu=a*u*u,fv=a*v*v,rel=fu>fv?'>':fu<fv?'<':'=',O=['>','<','='],lab=o=>`y(${ng(u)}) ${o} y(${ng(v)})`;
 return[M(`Cho hàm số y = ${cf(a)}x^2. So sánh y(${ng(u)}) và y(${ng(v)}), ta được`,lab(rel),[...O.filter(o=>o!=rel).map(lab),'Không so sánh được'],
  [`Tính y(${ng(u)}) = ${ng(a)}·${pa(u)}^2 = ${ng(a)}·${u*u} = ${ng(fu)}.`,`Tính y(${ng(v)}) = ${ng(a)}·${pa(v)}^2 = ${ng(a)}·${v*v} = ${ng(fv)}.`,`Vì ${ng(fu)} ${rel} ${ng(fv)} nên ${lab(rel)}.`],'',String),[a,u,v]]}),

gn('hs3.so_giao',()=>{const t=R(0,2),a=P([1,-1,2,-2,3]),b=nzc(6);let c,D;
 for(let i=0;i<300;i++){c=R(-12,12);D=b*b+4*a*c;if(t==0&&D<0||t==1&&D==0||t==2&&D>0)break;c=null}
 if(c==null)throw 0;
 const n=D<0?0:D==0?1:2,txt=k=>['Không có giao điểm','Có đúng 1 giao điểm','Có đúng 2 giao điểm'][k];
 return[M(`Số giao điểm của parabol (P): y = ${cf(a)}x^2 và đường thẳng (d): y = ${lin(b,c)} là`,txt(n),[...[0,1,2].filter(k=>k!=n).map(txt),'Có vô số giao điểm'],
  [`Phương trình hoành độ giao điểm: ${cf(a)}x^2 = ${lin(b,c)}, tức ${q2(a,-b,-c)} = 0.`,`Δ = ${pa(-b)}^2 − 4·${pa(a)}·${pa(-c)} = ${ng(D)}.`,`${D<0?'Δ < 0 nên phương trình vô nghiệm':D==0?'Δ = 0 nên phương trình có nghiệm kép':'Δ > 0 nên phương trình có hai nghiệm phân biệt'}, do đó (P) và (d) ${txt(n).toLowerCase()}.`],'',String),[a,b,c]]}),

gn('hs3.toa_do_giao',()=>{const a=P([1,-1,2,-2]),r1=R(-5,4),r2=R(r1+1,5);
 const b=a*(r1+r2),c=-a*r1*r2,pt=(x,y)=>`(${ng(x)}; ${ng(y)})`,ans=(x,y)=>`${pt(x[0],a*x[0]*x[0])} và ${pt(x[1],a*x[1]*x[1])}`,
 A=ans([r1,r2]),W=[ans([-r1,-r2].sort((p,q)=>p-q)),`${pt(r1,a*r1)} và ${pt(r2,a*r2)}`,`${pt(r1,-a*r1*r1)} và ${pt(r2,-a*r2*r2)}`,`${pt(r1,r1*r1)} và ${pt(r2,r2*r2)}`].filter(x=>x!=A);
 return[M(`Tìm tọa độ các giao điểm của parabol (P): y = ${cf(a)}x^2 và đường thẳng (d): y = ${lin(b,c)}.`,A,W,
  [`Phương trình hoành độ giao điểm: ${cf(a)}x^2 = ${lin(b,c)}, tức ${q2(a,-b,-c)} = 0.`,`Giải phương trình: x = ${ng(r1)} hoặc x = ${ng(r2)}.`,`Thay vào y = ${cf(a)}x^2: x = ${ng(r1)} thì y = ${ng(a*r1*r1)}; x = ${ng(r2)} thì y = ${ng(a*r2*r2)}.`],'',String),[a,r1,r2]]}),

gn('hs3.nhan_dang_do_thi',()=>{const a=P([1,-1,2,-2,3,-3,4,-4]),px=P([1,2])*P([1,-1]),q=a*px*px,A=fn(a),
 W=[fn(-a),fn(q),px*px==1?fn(a+1):fn(Math.round(q/ab(px)))].filter(x=>x!=A&&x!='y = 0x^2');
 if(new Set(W).size<3)W.push(fn(a>0?a+2:a-2));
 return[fg(M(`Parabol trong hình có đỉnh O, trục đối xứng là trục Oy và đi qua điểm A(${ng(px)}; ${ng(q)}). Đó là đồ thị của hàm số`,A,[...new Set(W)],
  [`Parabol nằm ${a>0?'phía trên':'phía dưới'} trục hoành nên a ${a>0?'> 0':'< 0'}.`,`A thuộc đồ thị nên ${ng(q)} = a·${pa(px)}^2 = ${px*px==1?'':px*px}a, suy ra a = ${ng(a)}.`,`Vậy hàm số là ${A}.`],'',String),par(a,px)),[a,px]]}));

/* ================= HÀM SỐ y = ax²: NÂNG CAO ================= */
addH('l9hsb2',
gn('hs3.tiep_xuc_m',()=>{const a=P([1,-1,2,-2]),b=P([-6,-4,-2,2,4,6,-3,3,5,-5]),k=R(0,2),t=F.nf([-b*b,4*a]),T=F.s(t),Tn=F.s(F.nf([-t[0],t[1]]));
 const OP=['>','<','≥','≤'],lab=o=>`m ${o} ${T}`,Dpos=a>0?'>':'<',Dneg=a>0?'<':'>';
 let ans,W,what;
 if(k==0){what='cắt (P) tại hai điểm phân biệt';ans=lab(Dpos);W=OP.filter(o=>o!=Dpos).map(lab)}
 else if(k==1){what='không có điểm chung với (P)';ans=lab(Dneg);W=OP.filter(o=>o!=Dneg).map(lab)}
 else{what='tiếp xúc với (P)';ans=`m = ${T}`;W=[`m = ${Tn}`,`m = ${F.s(F.mul(t,[2,1]))}`,`m = ${F.s(F.add(t,[1,1]))}`]}
 return[M(`Cho parabol (P): y = ${cf(a)}x^2 và đường thẳng (d): y = ${cf(b)}x + m. Tìm m để (d) ${what}.`,ans,W,
  [`Phương trình hoành độ giao điểm: ${cf(a)}x^2 = ${cf(b)}x + m, tức ${q2(a,-b,0)} − m = 0.`,`Δ = ${pa(-b)}^2 − 4·${pa(a)}·(−m) = ${b*b} ${a>0?'+':'−'} ${4*ab(a)}m.`,
   k==2?`(d) tiếp xúc (P) khi Δ = 0, tức ${b*b} ${a>0?'+':'−'} ${4*ab(a)}m = 0, suy ra m = ${T}.`
   :`${k==0?'Hai điểm phân biệt':'Không có điểm chung'} khi Δ ${k==0?'> 0':'< 0'}, tức ${b*b} ${a>0?'+':'−'} ${4*ab(a)}m ${k==0?'> 0':'< 0'}.`+(k<2?` Giải ra ${ans}${a<0?' (chia hai vế cho số âm nên đổi chiều bất đẳng thức)':''}.`:'')],'',String),[a,b,k]]}),

gn('hs3.dien_tich_giao',()=>{const a=P([1,2,-1]),r1=P([-4,-3,-2,-1,1,2]),r2=R(r1+1,5);if(r2==0||r1>=r2)throw 0;
 const b=a*(r1+r2),c=-a*r1*r2,y1=a*r1*r1,y2=a*r2*r2,w=r1*y2-r2*y1,area=ab(w)/2;
 return[Iq(`Parabol (P): y = ${cf(a)}x^2 cắt đường thẳng (d): y = ${lin(b,c)} tại hai điểm A, B. Tính diện tích tam giác OAB (O là gốc tọa độ, đơn vị diện tích).`,area,
  [`Phương trình hoành độ giao điểm ${q2(a,-b,-c)} = 0 có hai nghiệm x = ${ng(r1)} và x = ${ng(r2)}.`,`Tung độ tương ứng (thay vào y = ${cf(a)}x^2): A(${ng(r1)}; ${ng(y1)}), B(${ng(r2)}; ${ng(y2)}).`,`Với A(x₁; y₁), B(x₂; y₂), diện tích tam giác OAB là S = ${fh(1,2)}·|x₁y₂ − x₂y₁|.`,`S = ${fh(1,2)}·|${pa(r1)}·${pa(y2)} − ${pa(r2)}·${pa(y1)}| = ${fh(1,2)}·${ab(w)} = ${fd(area)}.`],'',`${fd(area)}`),[a,r1,r2]]}));
})();
