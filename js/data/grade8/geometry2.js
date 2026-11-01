/* LỚP 8 · PHẦN 2b: Hình học và Đo lường — định lý Thales và đường phân giác, tam giác đồng dạng. */
(()=>{const {add,addH,fr,fq,fh,gn,M,Iq,fg,ng,fd,fdr,fe,cf,cm,thales,bis,TP}=G8H,
mt=v=>fdr(v)+' m',
cp=(a,b)=>{const g=gcd(a,b);return g};

/* ================= ĐỊNH LÝ THALES ================= */
add('l8th',
gn('th.thales',()=>{const m=R(1,4),n=R(1,4),u=R(1,3),v=R(1,3);if(m==n)throw 0;const AM=m*u,MB=n*u,AN=m*v,NC=n*v;
 return[fg(M(`Cho tam giác ABC, M thuộc AB, N thuộc AC sao cho MN // BC. Biết AM = ${AM} cm, MB = ${MB} cm, AN = ${AN} cm. Độ dài NC là`,NC,[[AM*AN/MB,'đảo tỉ lệ (viết AM/MB = NC/AN)'],[AN+MB-AM,'dùng hiệu thay vì tỉ lệ'],[MB*AM/AN,'lập tỉ lệ sai: NC/MB = AM/AN'],[NC+1]],[`MN // BC nên theo định lý Thales: AM/MB = AN/NC.`,`NC = MB·AN/AM = ${fh(`${MB}·${AN}`,AM)} = ${NC} cm.`],`Đoạn nào ở tử thì đoạn tương ứng ở mẫu: AM ứng với AN, MB ứng với NC.`,cm),thales()),[AM,MB,AN,NC]]}),
gn('th.thales2',()=>{const p=R(1,4),q=p+R(1,3),u=R(1,3),v=R(1,3),AM=p*u,AB=q*u,AC=q*v,AN=p*v;
 return[fg(M(`Cho tam giác ABC, M thuộc AB, N thuộc AC sao cho MN // BC. Biết AM = ${AM} cm, AB = ${AB} cm, AC = ${AC} cm. Độ dài AN là`,AN,[[AB*AC/AM,'đảo tỉ lệ'],[AC-(AB-AM),'dùng hiệu thay vì tỉ lệ'],[AM*AB/AC,'lập tỉ lệ sai: AN/AB = AM/AC'],[AN+1]],[`MN // BC nên AM/AB = AN/AC.`,`AN = AM·AC/AB = ${fh(`${AM}·${AC}`,AB)} = ${AN} cm.`],`Tỉ số phải lập giữa các đoạn tương ứng trên hai cạnh AB và AC.`,cm),thales()),[AM,AB,AC,AN]]}),
gn('th.mn_bc',()=>{const p=R(1,4),q=p+R(1,3),u=R(1,3),w=R(1,4),AM=p*u,AB=q*u,BC=q*w,MN=p*w;
 return[fg(M(`Cho tam giác ABC, M thuộc AB, N thuộc AC sao cho MN // BC. Biết AM = ${AM} cm, AB = ${AB} cm, BC = ${BC} cm. Độ dài MN là`,MN,[[BC*AB/AM,'đảo tỉ lệ'],[BC-(AB-AM),'dùng hiệu thay vì tỉ lệ'],[AM*AB/BC,'lập tỉ lệ sai'],[MN+1]],[`MN // BC nên theo hệ quả của định lý Thales: AM/AB = MN/BC.`,`MN = BC·AM/AB = ${fh(`${BC}·${AM}`,AB)} = ${MN} cm.`],`Hệ quả: AM/AB = AN/AC = MN/BC (cả ba tỉ số bằng nhau).`,cm),thales()),[AM,AB,BC,MN]]}),
gn('th.dao',()=>{const m=R(1,4),n=R(1,4),u=R(1,3),v=R(1,3);if(m==n)throw 0;const c=[m*u,n*u,m*v,n*v],f=t=>`AM = ${t[0]}, MB = ${t[1]}, AN = ${t[2]}, NC = ${t[3]}`,ws=[[c[0],c[1],c[2],c[3]+1],[c[0],c[1],c[2]+1,c[3]],[c[0]+1,c[1],c[2],c[3]],[c[0],c[1],c[3],c[2]]].filter(t=>t[0]*t[3]!=t[1]*t[2]).slice(0,3);
 return[M(`Cho tam giác ABC, M thuộc AB, N thuộc AC. Bộ số đo (cm) nào sau đây cho MN // BC?`,f(c),ws.map(t=>[f(t),`AM/MB = ${fq(t[0],t[1])} nhưng AN/NC = ${fq(t[2],t[3])}: hai tỉ số không bằng nhau nên MN không song song với BC`]),[`Theo định lý Thales đảo: nếu AM/MB = AN/NC thì MN // BC.`,`Với ${f(c)}: AM/MB = ${fq(c[0],c[1])} = AN/NC = ${fq(c[2],c[3])}, nên MN // BC.`],`Phải so sánh hai tỉ số bằng nhau (nhân chéo hoặc rút gọn).`,String),[c]]}),
gn('th.phan_giac',()=>{const m=R(1,5),n=R(1,5),u=R(1,3),w=R(1,3);if(m==n)throw 0;const AB=m*u,AC=n*u,DB=m*w,DC=n*w;
 return[fg(M(`Tam giác ABC có AD là đường phân giác (D thuộc BC), AB = ${AB} cm, AC = ${AC} cm, DB = ${DB} cm. Độ dài DC là`,DC,[[DB*AB/AC,'đảo tỉ lệ (viết DC/DB = AB/AC)'],[DB+AC-AB,'dùng hiệu thay vì tỉ lệ'],[AC*AB/DB,'lập tỉ lệ sai giữa các đoạn'],[DC+1]],[`AD là phân giác nên DB/DC = AB/AC.`,`DC = DB·AC/AB = ${fh(`${DB}·${AC}`,AB)} = ${DC} cm.`],`DB ứng với AB (cùng phía đỉnh B), DC ứng với AC.`,cm),bis()),[AB,AC,DB,DC]]}),
gn('th.phan_giac_bd',()=>{const m=R(1,5),n=R(1,5),u=R(1,3),w=R(1,3);if(m==n)throw 0;const AB=m*u,AC=n*u,BC=(m+n)*w,BD=m*w;
 return[fg(M(`Tam giác ABC có AB = ${AB} cm, AC = ${AC} cm, BC = ${BC} cm. AD là phân giác (D thuộc BC). Độ dài BD là`,BD,[[n*w,'nhầm BD với DC'],[BC/2,'cho rằng D là trung điểm của BC'],[BC*AB/AC,'quên cộng AC vào mẫu số'],[BD+1]],[`AD là phân giác nên DB/AB = DC/AC = BC/(AB + AC) (tính chất dãy tỉ số bằng nhau).`,`BD = BC·AB/(AB + AC) = ${fh(`${BC}·${AB}`,AB+AC)} = ${BD} cm.`],`Mẫu số là AB + AC (tổng hai cạnh kề), không phải AC.`,cm),bis()),[AB,AC,BC,BD]]}),
gn('th.ti_so',()=>{const x=R(2,40),y=R(1,9);if(x==10*y)throw 0;
 return[M(`Tỉ số của hai đoạn thẳng AB = ${x} cm và CD = ${y} dm là`,fq(x,10*y),[[fq(x,y),'chưa đổi về cùng đơn vị đo'],[fq(10*x,y),'đổi đơn vị nhầm chiều (nhân thay vì chia)'],[fq(10*y,x),'viết ngược tỉ số CD / AB']],[`Hai đoạn thẳng phải cùng đơn vị: ${y} dm = ${10*y} cm.`,`Tỉ số AB / CD = ${fe(x,10*y)}.`],`Luôn đổi về cùng một đơn vị trước khi lập tỉ số.`,String),[x,y]]}));

addH('l8th',
gn('th.tim_x',()=>{const p=R(1,4),q=p+R(1,3),d=(q-p)*R(1,4),x=p*d/(q-p);
 return[fg(Iq(`Tam giác ABC có MN // BC, M thuộc AB, N thuộc AC. Biết AM = x cm, MB = (x + ${d}) cm, AN = ${p} cm, NC = ${q} cm. Tính x.`,x,[`MN // BC nên AM/MB = AN/NC, tức ${fh('x',`x + ${d}`)} = ${fq(p,q)}.`,`Nhân chéo: ${q}x = ${p}(x + ${d}) = ${p}x + ${p*d}, suy ra ${q-p}x = ${p*d} và x = ${x}.`],`Lập phương trình bằng cách nhân chéo rồi giải.`),thales()),[p,q,d,x]]}),
gn('th.ba_ss',()=>{const m=R(1,4),n=R(1,4),u=R(1,3),v=R(1,3);if(m==n)throw 0;
 return[Iq(`Ba đường thẳng a, b, c song song với nhau; hai cát tuyến cắt chúng lần lượt tại A, B, C và D, E, F. Biết AB = ${m*u} cm, BC = ${n*u} cm, DE = ${m*v} cm. Tính EF (cm).`,n*v,[`Theo định lý Thales: AB/BC = DE/EF.`,`EF = BC·DE/AB = ${fh(`${n*u}·${m*v}`,m*u)} = ${n*v} cm.`],`Các đoạn tương ứng trên hai cát tuyến tỉ lệ với nhau.`),[m*u,n*u,m*v,n*v]]}),
gn('th.dt_pg',()=>{const m=R(1,5),n=R(1,5),u=R(1,3),s=R(2,6);if(m==n)throw 0;
 return[fg(Iq(`AD là đường phân giác của tam giác ABC (D thuộc BC). Biết AB = ${m*u} cm, AC = ${n*u} cm và diện tích tam giác ABD bằng ${m*s} cm². Tính diện tích tam giác ACD (cm²).`,n*s,[`Hai tam giác ABD và ACD có cùng chiều cao hạ từ A nên S_ABD / S_ACD = BD / DC.`,`AD là phân giác nên BD/DC = AB/AC = ${fq(m,n)}. Vậy S_ACD = S_ABD·AC/AB = ${fh(`${m*s}·${n*u}`,m*u)} = ${n*s} cm².`],`Hai tam giác cùng đường cao thì diện tích tỉ lệ với đáy.`),bis()),[m,n,s]]}),
gn('th.hieu_pg',()=>{let m=R(2,6),n=R(1,m-1),w=R(1,4);if(m==n)throw 0;
 return[fg(Iq(`Tam giác ABC có AD là đường phân giác (D thuộc BC), AB : AC = ${m} : ${n} và BD − DC = ${(m-n)*w} cm. Tính độ dài BC (cm).`,(m+n)*w,[`AD là phân giác nên BD/DC = AB/AC = ${m}/${n}. Đặt BD = ${cf(m)}k, DC = ${cf(n)}k.`,`BD − DC = ${cf(m-n)}k = ${(m-n)*w} nên k = ${w}. BC = BD + DC = ${m+n}k = ${(m+n)*w} cm.`],`Đặt theo tỉ lệ rồi dùng điều kiện đã cho để tìm hệ số k.`),bis()),[m,n,w]]}),
gn('th.chia_doan',()=>{const p=R(1,4),q=p+R(1,3),w=R(2,6);
 return[fg(Iq(`Cho tam giác ABC, M thuộc AB sao cho AM = ${p}/${q} AB. Đường thẳng qua M song song với BC cắt AC tại N. Biết BC = ${q*w} cm. Tính MN (cm).`,p*w,[`MN // BC nên MN/BC = AM/AB = ${p}/${q}.`,`MN = BC·${p}/${q} = ${q*w}·${p}/${q} = ${p*w} cm.`],`Tỉ số AM/AB cũng là tỉ số của MN/BC.`),thales()),[p,q,w]]}));

/* ================= TAM GIÁC ĐỒNG DẠNG ================= */
const O1='Trường hợp cạnh – cạnh – cạnh (c.c.c)',O2='Trường hợp cạnh – góc – cạnh (c.g.c)',O3='Trường hợp góc – góc (g.g)',O4='Chưa đủ điều kiện để kết luận hai tam giác đồng dạng',
 NEED={[O1]:'ba cặp cạnh tương ứng tỉ lệ',[O2]:'hai cặp cạnh tương ứng tỉ lệ VÀ góc xen giữa bằng nhau',[O3]:'hai cặp góc tương ứng bằng nhau',[O4]:'dữ kiện đã đủ để kết luận'},
 SC=[['ΔABC và ΔDEF có AB/DE = BC/EF = CA/FD.',O1],['ΔABC và ΔDEF có AB/DE = AC/DF và ∠A = ∠D.',O2],['ΔABC và ΔDEF có ∠A = ∠D và ∠B = ∠E.',O3],['Hai tam giác vuông có một cặp góc nhọn bằng nhau.',O3],['ΔABC và ΔDEF có AB/DE = AC/DF và ∠B = ∠E.',O4],['ΔABC và ΔDEF có ∠A = ∠D và AB/DE = BC/EF.',O4]],
 PQ=[[1,2],[2,3],[3,4],[2,5],[3,5],[1,3],[4,5]];
add('l8dd',
gn('dd.ti_so',()=>{const a=R(2,12),b=R(2,12);if(a==b)throw 0;
 return[M(`ΔABC ∽ ΔDEF, biết AB = ${a} cm và DE = ${b} cm. Tỉ số đồng dạng k = AB/DE là`,fq(a,b),[[fq(b,a),'viết ngược tỉ số (DE/AB)'],[fq(a,a+b),'lấy cạnh chia cho tổng hai cạnh'],[fq(a-b>0?a-b:b-a,b)]],[`Hai tam giác đồng dạng theo tỉ số k thì mỗi cạnh của tam giác thứ nhất bằng k lần cạnh tương ứng của tam giác thứ hai.`,`k = AB/DE = ${fe(a,b)}.`],`Tỉ số đồng dạng phụ thuộc thứ tự viết hai tam giác: ΔABC ∽ ΔDEF cho k = AB/DE.`,String),[a,b]]}),
gn('dd.canh',()=>{const [p,q]=P(PQ),t=R(1,4),s=R(1,4),AB=p*t,DE=q*t,BC=p*s,EF=q*s;
 return[M(`ΔABC ∽ ΔDEF, biết AB = ${AB} cm, DE = ${DE} cm và BC = ${BC} cm. Độ dài EF là`,EF,[[BC*AB/DE,'nhân với tỉ số AB/DE thay vì chia'],[BC+DE-AB,'dùng hiệu thay vì tỉ số'],[BC*q/(p+1)],[EF+1]],[`ΔABC ∽ ΔDEF nên AB/DE = BC/EF.`,`EF = BC·DE/AB = ${fh(`${BC}·${DE}`,AB)} = ${EF} cm.`],`Cạnh nào của tam giác này thì chia cho cạnh tương ứng của tam giác kia.`,cm),[AB,DE,BC,EF]]}),
gn('dd.chu_vi',()=>{const [p,q]=P(PQ),w=R(2,8),P1=p*w,P2=q*w;
 return[M(`ΔABC ∽ ΔDEF với tỉ số đồng dạng k = AB/DE = ${p}/${q}. Chu vi ΔABC bằng ${P1} cm. Chu vi ΔDEF là`,P2,[[P1*p/q,'nhân với k thay vì chia cho k'],[P1*q*q/(p*p),'dùng bình phương tỉ số (đó là tỉ số diện tích)'],[P1+q-p,'dùng hiệu thay vì tỉ số'],[P2+2]],[`Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng: P_ABC/P_DEF = ${p}/${q}.`,`P_DEF = ${P1}·${q}/${p} = ${P2} cm.`],`Chu vi tỉ lệ k, diện tích mới tỉ lệ k².`,cm),[p,q,P1,P2]]}),
gn('dd.dien_tich',()=>{const [p,q]=P(PQ),w=R(2,6),S1=p*p*w,S2=q*q*w;
 return[M(`ΔABC ∽ ΔDEF với tỉ số đồng dạng k = AB/DE = ${p}/${q}. Diện tích ΔABC bằng ${S1} cm². Diện tích ΔDEF là`,S2,[[S1*q/p,'dùng tỉ số đồng dạng thay vì bình phương của nó'],[S1*p*p/(q*q),'dùng tỉ số nghịch đảo'],[S1+q*q-p*p,'dùng hiệu thay vì tỉ số'],[S2+3]],[`Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng: S_ABC/S_DEF = (${p}/${q})² = ${p*p}/${q*q}.`,`S_DEF = ${S1}·${q*q}/${p*p} = ${S2} cm².`],`Diện tích tỉ lệ với k², không phải k.`,G8H.c2),[p,q,S1,S2]]}),
gn('dd.truong_hop',()=>{const [s,ans]=P(SC);
 return[M(`${s} Kết luận nào đúng?`,ans,[O1,O2,O3,O4].filter(o=>o!=ans).map(o=>[o,`không đúng: ${o==O4?'dữ kiện chưa đủ nên không kết luận được theo '+'một trường hợp nào':'trường hợp này cần '+NEED[o]}`]),[`Đối chiếu dữ kiện với ba trường hợp đồng dạng của tam giác.`,`${s} ⇒ ${ans}.`],`Với c.g.c, góc phải là góc XEN GIỮA hai cặp cạnh tỉ lệ.`,String),[s,ans]]}),
gn('dd.bong',()=>{const h1=P([1,2,3]),s1=P([1,2,3,4]),k=P([4,5,6,8,10]),s2=k*s1,h2=k*h1;
 return[M(`Cùng một lúc, cọc cao ${h1} m có bóng dài ${s1} m, một cây có bóng dài ${s2} m. Chiều cao của cây là`,h2,[[h1+s2-s1,'dùng hiệu thay vì tỉ lệ'],[s2*s1/h1,'đảo tỉ lệ'],[s2/h1,'chia bóng cho chiều cao cọc'],[h2+2]],[`Tia nắng song song nên hai tam giác (cọc – bóng) và (cây – bóng) đồng dạng: chiều cao / bóng không đổi.`,`${h1}/${s1} = h/${s2} nên h = ${fh(`${h1}·${s2}`,s1)} = ${h2} m.`],`Đây là hai tam giác vuông đồng dạng theo trường hợp g.g.`,mt),[h1,s1,s2,h2]]}),
gn('dd.goc',()=>{let a,b,g;do{a=R(40,90);b=R(30,80);g=180-a-b}while(g<20||g==a||g==b||b==a);
 return[M(`ΔABC ∽ ΔDEF, biết ∠A = ${a}° và ∠E = ${b}°. Số đo ∠C là`,g,[[b,'nhầm ∠C = ∠E; thực ra ∠E tương ứng với ∠B'],[180-a,'quên trừ góc còn lại'],[a+b,'cộng hai góc thay vì lấy 180° trừ đi']],[`ΔABC ∽ ΔDEF nên các góc tương ứng bằng nhau: ∠A = ∠D, ∠B = ∠E, ∠C = ∠F. Do đó ∠B = ∠E = ${b}°.`,`∠C = 180° − ∠A − ∠B = 180° − ${a}° − ${b}° = ${g}°.`],`Xác định đúng góc tương ứng theo thứ tự đỉnh viết.`,v=>v+'°'),[a,b,g]]}));

addH('l8dd',
gn('dd.ti_dt',()=>{const [p,q]=P(PQ),w=R(2,8);
 return[Iq(`ΔABC ∽ ΔDEF, biết tỉ số diện tích S_ABC/S_DEF = ${p*p}/${q*q}. Chu vi ΔDEF bằng ${q*w} cm. Tính chu vi ΔABC (cm).`,p*w,[`Tỉ số diện tích bằng bình phương tỉ số đồng dạng nên k² = ${p*p}/${q*q}, suy ra k = ${p}/${q}.`,`Tỉ số chu vi bằng k nên P_ABC = P_DEF·k = ${q*w}·${p}/${q} = ${p*w} cm.`],`Từ tỉ số diện tích phải khai căn để có tỉ số đồng dạng.`),[p,q,w]]}),
gn('dd.cgc_tim',()=>{const p=R(1,4),q=p+R(1,3),u=R(1,4),v=R(1,4),AM=p*u,AC=q*u,AB=q*v,AN=p*v;if(AM>=AB||AN>=AC)throw 0;
 return[Iq(`Tam giác ABC có AB = ${AB} cm, AC = ${AC} cm. Lấy M thuộc AB, N thuộc AC sao cho AM = ${AM} cm và ΔAMN ∽ ΔACB. Tính AN (cm).`,AN,[`ΔAMN ∽ ΔACB (chung góc A) nên AM/AC = AN/AB.`,`AN = AM·AB/AC = ${fh(`${AM}·${AB}`,AC)} = ${AN} cm.`],`Đỉnh tương ứng: A ↔ A, M ↔ C, N ↔ B nên AM tương ứng với AC (không phải AB).`),[AM,AB,AC,AN]]}),
gn('dd.ht_O',()=>{const p=R(1,4),q=p+R(1,3),u=R(1,3),w=R(1,4);
 return[Iq(`Hình thang ABCD (AB // CD) có hai đường chéo cắt nhau tại O. Biết AB = ${p*u} cm, CD = ${q*u} cm, OC = ${q*w} cm. Tính OA (cm).`,p*w,[`AB // CD nên ΔOAB ∽ ΔOCD (g.g), suy ra OA/OC = AB/CD.`,`OA = OC·AB/CD = ${fh(`${q*w}·${p*u}`,q*u)} = ${p*w} cm.`],`Hai tam giác OAB và OCD đồng dạng vì có các góc so le trong bằng nhau.`),[p,q,u,w]]}),
gn('dd.hinh_chieu',()=>{const k=P([5,10,15]),a=3*k,b=4*k,c=5*k,f=R(0,1),leg=f?b:a,nm=f?['AC','CH']:['AB','BH'];
 return[Iq(`Tam giác ABC vuông tại A, đường cao AH, có ${nm[0]} = ${leg} cm và BC = ${c} cm. Tính ${nm[1]} (cm).`,leg*leg/c,[`ΔH${f?'CA':'BA'} ∽ ΔA${f?'CB':'BC'} (chung góc ${f?'C':'B'}, cùng có một góc vuông) nên ${nm[1]}/${nm[0]} = ${nm[0]}/BC.`,`${nm[1]} = ${nm[0]}²/BC = ${fh(`${leg}²`,c)} = ${leg*leg/c} cm.`],`Hệ thức ${nm[0]}² = ${nm[1]}·BC suy ra từ hai tam giác đồng dạng.`),[leg,c,f]]}),
gn('dd.dt_amn',()=>{const p=R(1,4),q=p+R(1,3),w=R(2,6);
 return[Iq(`Cho tam giác ABC, M thuộc AB, N thuộc AC sao cho MN // BC và AM/AB = ${p}/${q}. Diện tích tam giác ABC bằng ${q*q*w} cm². Tính diện tích tam giác AMN (cm²).`,p*p*w,[`MN // BC nên ΔAMN ∽ ΔABC theo tỉ số k = AM/AB = ${p}/${q}.`,`Tỉ số diện tích bằng k² = ${p*p}/${q*q}, nên S_AMN = ${q*q*w}·${p*p}/${q*q} = ${p*p*w} cm².`],`Diện tích tỉ lệ với bình phương tỉ số đồng dạng.`),[p,q,w]]}));
})();
