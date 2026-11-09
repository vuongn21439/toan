/* LỚP 8 · bổ sung từ tài liệu "Chuyên đề cơ bản Toán 8 (Kết nối tri thức) tập 1" — Chương 2: Hằng đẳng thức đáng nhớ và ứng dụng
   Chủ đề l8hd. Mã dạng bài: hd2.*  ·  Đáp án nhiễu không kèm lý do; lời giải chia từng bước.
   Kiểm chứng: kiem-chung/lop8-9/oracles8b.js */
(()=>{const {add,addH,gn,M,Iq,PL,pmut,lin,cf,ng,fh}=G8H,{norm,mul,pad,sub,str}=PL,
nzc=(m=6)=>{let v;do v=R(-m,m);while(!v);return v},
S=A=>str(norm(A)),
sg=v=>v<0?'−':'+',
l2=(p,q)=>str([[p,1,0],[q,0,1]]),         /* px + qy */
A1=(a,v='x')=>a==1?v:a+v;                  /* a·v, bỏ hệ số 1 */

/* ================= CƠ BẢN ================= */
add('l8hd',
gn('hd2.bp_hai_bien',()=>{const a=R(1,4),b=R(1,4),s=P([1,-1]),r=[[a*a,2,0],[2*a*b*s,1,1],[b*b,0,2]];
 return[M(`Khai triển: (${l2(a,s*b)})^2`,str(r),
  [str([[a*a,2,0],[b*b,0,2]]),str([[a*a,2,0],[a*b*s,1,1],[b*b,0,2]]),str([[a*a,2,0],[-2*a*b*s,1,1],[b*b,0,2]]),str([[a*a,2,0],[2*a*b*s,1,1],[-b*b,0,2]]),str([[a>1?a:a*a,2,0],[2*a*b*s,1,1],[b>1?b:b*b+1,0,2]])],
  [`Áp dụng (A ${s>0?'+':'−'} B)^2 = A^2 ${s>0?'+':'−'} 2AB + B^2 với A = ${A1(a)}, B = ${A1(b,'y')}.`,
   `A^2 = ${S([[a*a,2,0]])}; 2AB = 2·${A1(a)}·${A1(b,'y')} = ${S([[2*a*b,1,1]])}; B^2 = ${S([[b*b,0,2]])}.`,
   `Kết quả: ${str(r)}.`],'',String),[a,b,s]]}),
gn('hd2.hieu_bp_hai_bien',()=>{const a=R(1,4),b=R(1,4),f=[str([[a,1,0],[-b,0,1]]),str([[a,1,0],[b,0,1]])];if(R(0,1))f.reverse();
 return[M(`Khai triển: (${f[0]})(${f[1]})`,str([[a*a,2,0],[-b*b,0,2]]),
  [str([[a*a,2,0],[b*b,0,2]]),str([[a*a,2,0],[-2*a*b,1,1],[b*b,0,2]]),str([[a*a,2,0],[2*a*b,1,1],[b*b,0,2]]),str([[a*a,2,0],[-a*b,0,2]]),str([[a*a,2,0],[-b,0,2]]),str([[a,2,0],[-b,0,2]])],
  [`Hai thừa số có dạng (A − B)(A + B) với A = ${A1(a)}, B = ${A1(b,'y')}.`,
   `Áp dụng (A − B)(A + B) = A^2 − B^2 = ${S([[a*a,2,0]])} − ${S([[b*b,0,2]])}.`],'',String),[a,b]]}),
gn('hd2.rut_gon_hd',()=>{const t=R(0,3),a=R(1,8);let b=R(1,8);while(b==a)b=R(1,8);
 const N=v=>ng(v);
 if(t==0)return[M(`Rút gọn biểu thức: (x + ${a})^2 − (x − ${a})^2`,`${4*a}x`,[`${2*a}x`,`${4*a}x^2`,`${a*a}`,`${4*a*a}x`,`${4*a}`,`${2*a*a}`],
  [`Khai triển: (x + ${a})^2 = x^2 + ${2*a}x + ${a*a}; (x − ${a})^2 = x^2 − ${2*a}x + ${a*a}.`,`Trừ hai kết quả: x^2 và ${a*a} triệt tiêu, còn ${2*a}x − (−${2*a}x) = ${4*a}x.`],'',String),[0,a]];
 if(t==1)return[M(`Rút gọn biểu thức: (x + ${a})^2 + (x − ${a})^2 − 2x^2`,N(2*a*a),[N(a*a),N(4*a*a),`${4*a}x`,N(2*a),'0',N(4*a)],
  [`Khai triển: (x + ${a})^2 = x^2 + ${2*a}x + ${a*a}; (x − ${a})^2 = x^2 − ${2*a}x + ${a*a}.`,`Cộng hai kết quả: 2x^2 + ${2*a*a}. Trừ đi 2x^2 còn ${2*a*a}.`],'',String),[1,a]];
 if(t==2)return[M(`Rút gọn biểu thức: (x + ${a})(x − ${a}) − (x + ${b})(x − ${b})`,N(b*b-a*a),[N(a*a-b*b),N(a*a+b*b),N((a-b)*(a-b)),N(-(a+b)*(a+b)),N(b*b-a*a+1),N(a*a-b*b+2)],
  [`Dùng (A − B)(A + B) = A^2 − B^2: (x + ${a})(x − ${a}) = x^2 − ${a*a}; (x + ${b})(x − ${b}) = x^2 − ${b*b}.`,`Trừ hai kết quả: (x^2 − ${a*a}) − (x^2 − ${b*b}) = ${N(b*b-a*a)}.`],'',String),[2,a,b]];
 return[M(`Rút gọn biểu thức: (x + ${a})^2 − (x + ${b})(x − ${b}) − ${2*a}x`,N(a*a+b*b),[N(a*a-b*b),N((a+b)*(a+b)),N(2*a*b),N(b*b-a*a),N(a*a+b*b+1),N(2*a*a+b*b)],
  [`Khai triển: (x + ${a})^2 = x^2 + ${2*a}x + ${a*a}; (x + ${b})(x − ${b}) = x^2 − ${b*b}.`,`Biểu thức bằng x^2 + ${2*a}x + ${a*a} − x^2 + ${b*b} − ${2*a}x = ${a*a+b*b}.`],'',String),[3,a,b]]}),
gn('hd2.viet_bp',()=>{const a=R(1,3),b=R(1,7),s=P([1,-1]),ex=S([[a*a,2],[2*a*b*s,1],[b*b,0]]),ans=`(${lin(a,s*b)})^2`,fac=R(0,1);
 return[M(fac?`Phân tích đa thức ${ex} thành nhân tử.`:`Viết đa thức ${ex} dưới dạng bình phương của một tổng hoặc một hiệu.`,ans,
  [`(${lin(a,-s*b)})^2`,`(${lin(a*a,s*b)})^2`,`(${lin(a,s*b*b)})^2`,`(${lin(a,s*b)})(${lin(a,-s*b)})`,`(${lin(a,s*2*b)})^2`],
  [`Nhận xét: ${S([[a*a,2]])} = (${A1(a)})^2, ${b*b} = ${b}^2 và hạng tử giữa ${ng(2*a*b*s)}x = ${s<0?'−':''}2·${A1(a)}·${b}.`,
   `Dạng A^2 ${s>0?'+':'−'} 2AB + B^2 với A = ${A1(a)}, B = ${b} nên đa thức bằng (${lin(a,s*b)})^2.`],'',String),[a,b,s,fac]]}),
gn('hd2.viet_lp',()=>{const c=R(1,3),a=R(1,5),s=P([1,-1]),ex=S([[c**3,3],[3*c*c*a*s,2],[3*c*a*a,1],[s*a**3,0]]),ans=`(${lin(c,s*a)})^3`;
 return[M(`Viết đa thức ${ex} dưới dạng lập phương của một tổng hoặc một hiệu.`,ans,
  [`(${lin(c,-s*a)})^3`,`(${lin(c,s*a*a)})^3`,`(${lin(c,s*a**3)})^3`,`(${lin(c+1,s*a)})^3`,`(${lin(c,s*(a+1))})^3`],
  [`Hạng tử đầu ${S([[c**3,3]])} = (${A1(c)})^3 nên A = ${A1(c)}; hạng tử cuối ${ng(s*a**3)} = (${ng(s*a)})^3 nên B = ${a}${s<0?' (dấu −)':''}.`,
   `Kiểm tra hạng tử giữa: 3A^2B = ${3*c*c*a}x^2 và 3AB^2 = ${3*c*a*a}x, đúng với đa thức đã cho.`,
   `Vậy đa thức bằng (${lin(c,s*a)})^3.`],'',String),[c,a,s]]}),
gn('hd2.lp_hai_bien',()=>{const a=R(1,3),b=R(1,5),s=P([1,-1]),r=[[a**3,3,0],[3*a*a*b*s,2,1],[3*a*b*b,1,2],[s*b**3,0,3]];
 return[M(`Khai triển: (${l2(a,s*b)})^3`,str(r),
  [str([[a**3,3,0],[a*a*b*s,2,1],[a*b*b,1,2],[s*b**3,0,3]]),str([[a**3,3,0],[3*a*a*b*s,2,1],[3*a*b*b,1,2],[-s*b**3,0,3]]),str([[a**3,3,0],[3*a*a*b*s,2,1],[-3*a*b*b,1,2],[s*b**3,0,3]]),str([[a**3,3,0],[s*b**3,0,3]]),...pmut(r).slice(0,2)],
  [`Áp dụng (A ${s>0?'+':'−'} B)^3 = A^3 ${s>0?'+':'−'} 3A^2B + 3AB^2 ${s>0?'+':'−'} B^3 với A = ${A1(a)}, B = ${A1(b,'y')}.`,
   `A^3 = ${S([[a**3,3,0]])}; 3A^2B = ${S([[3*a*a*b,2,1]])}; 3AB^2 = ${S([[3*a*b*b,1,2]])}; B^3 = ${S([[b**3,0,3]])}.`,
   `Ghép lại với dấu thích hợp: ${str(r)}.`],'',String),[a,b,s]]}),
gn('hd2.pt_ntc_2',()=>{const g=R(2,6),[p,q]=cop(1,4),s=P([1,-1]),ex=str([[g*p,2,1],[s*g*q,1,2]]),ans=`${g}xy(${l2(p,s*q)})`;
 return[M(`Phân tích đa thức thành nhân tử (đặt nhân tử chung): ${ex}`,ans,
  [`${g}xy(${l2(p,-s*q)})`,`${g}xy(${l2(q,s*p)})`,`${g+1}xy(${l2(p,s*q)})`,`${g}x(${l2(p,s*q)})`,`${g}y(${l2(p,s*q)})`],
  [`Nhân tử chung của hệ số ${g*p} và ${g*q} là ${g}; của phần biến x^2y và xy^2 là xy. Nhân tử chung là ${g}xy.`,
   `Chia từng hạng tử cho ${g}xy: ${S([[g*p,2,1]])} : ${g}xy = ${A1(p)}; ${S([[s*g*q,1,2]])} : ${g}xy = ${ng(s*q)}y.`,
   `Vậy ${ex} = ${ans}.`],'',String),[g,p,q,s]]}),
gn('hd2.pt_ntc_ngoac',()=>{const p=R(1,4),a=nzc(5),q=nzc(8),B=`(${lin(1,a)})`,ex=`${cf(p)}x${B} ${sg(q)} ${Math.abs(q)}${B}`,ans=`${B}(${lin(p,q)})`;
 return[M(`Phân tích đa thức thành nhân tử: ${ex}`,ans,
  [`${B}(${lin(p,-q)})`,`(${lin(1,-a)})(${lin(p,q)})`,`${B}(${lin(p,q+1)})`,`${B}(${lin(p+1,q)})`],
  [`Hai hạng tử có nhân tử chung là ${B}.`,
   `Đặt ${B} làm nhân tử chung, phần còn lại trong ngoặc là ${lin(p,q)}.`,
   `Vậy ${ex} = ${ans}.`],'',String),[p,a,q]]}),
gn('hd2.pt_nhom',()=>{const p=nzc(4),a=nzc(4);if(p==a)throw 0;
 const ex=S(mul([[1,1,0],[p,0,1]],[[1,1,0],[a,0,0]])),ans=`(${l2(1,p)})(${lin(1,a)})`,gr=`x(${lin(1,a)}) ${sg(p)} ${Math.abs(p)==1?'':Math.abs(p)}y(${lin(1,a)})`;
 return[M(`Phân tích đa thức thành nhân tử (nhóm hạng tử): ${ex}`,ans,
  [`(${l2(1,-p)})(${lin(1,a)})`,`(${l2(1,p)})(${lin(1,-a)})`,`(${l2(1,a)})(${lin(1,p)})`,`(${l2(1,-p)})(${lin(1,-a)})`,`(${l2(1,p)})(${lin(1,a+1)})`],
  [`Nhóm các hạng tử có nhân tử chung: (${S([[1,2,0],[a,1,0]])}) + (${S([[p,1,1],[p*a,0,1]])}).`,
   `Đặt nhân tử chung trong từng nhóm: ${gr}.`,
   `Đặt tiếp ${lin(1,a)} làm nhân tử chung: ${ans}.`],'',String),[p,a]]}),
gn('hd2.tinh_nhanh_2',()=>{const t=R(0,2);
 if(t==0){const s=P([10,20,50,100]),a=R(Math.floor(s/2)+1,s-1),b=s-a;return[Iq(`Tính nhanh: ${a}^2 − ${b}^2`,(a-b)*s,
  [`Dùng hiệu hai bình phương: ${a}^2 − ${b}^2 = (${a} − ${b})(${a} + ${b}).`,`${a} − ${b} = ${a-b} và ${a} + ${b} = ${s}, nên kết quả là ${a-b}·${s} = ${(a-b)*s}.`]),[0,a,b]]}
 if(t==1){const s=P([10,20,50,100]),a=R(2,s-2),b=s-a;return[Iq(`Tính nhanh: ${a}^2 + 2·${a}·${b} + ${b}^2`,s*s,
  [`Biểu thức có dạng A^2 + 2AB + B^2 với A = ${a}, B = ${b}, bằng (A + B)^2.`,`A + B = ${a} + ${b} = ${s}, nên kết quả là ${s}^2 = ${s*s}.`]),[1,a,b]]}
 const d=P([10,20,50,100]),b=R(2,60),a=b+d;return[Iq(`Tính nhanh: ${a}^2 − 2·${a}·${b} + ${b}^2`,d*d,
  [`Biểu thức có dạng A^2 − 2AB + B^2 với A = ${a}, B = ${b}, bằng (A − B)^2.`,`A − B = ${a} − ${b} = ${d}, nên kết quả là ${d}^2 = ${d*d}.`]),[2,a,b]]}),
gn('hd2.pt_tich',()=>{const t=R(0,2);
 if(t==0){const k=R(2,9);return[Iq(`Tổng các nghiệm của phương trình x^2 − ${k}x = 0 là bao nhiêu?`,k,
  [`Đặt nhân tử chung: x^2 − ${k}x = x(x − ${k}) = 0.`,`Suy ra x = 0 hoặc x − ${k} = 0, tức x = 0 hoặc x = ${k}.`,`Tổng hai nghiệm là 0 + ${k} = ${k}.`]),[0,k]]}
 if(t==1){const a=R(2,12);return[Iq(`Nghiệm dương của phương trình x^2 − ${a*a} = 0 là bao nhiêu?`,a,
  [`Phân tích: x^2 − ${a*a} = (x − ${a})(x + ${a}) = 0.`,`Suy ra x = ${a} hoặc x = −${a}. Nghiệm dương là ${a}.`]),[1,a]]}
 const a=nzc(8),q=nzc(8);if(a==-q)throw 0;return[Iq(`Nghiệm lớn nhất của phương trình x(${lin(1,-a)}) ${sg(q)} ${Math.abs(q)}(${lin(1,-a)}) = 0 là bao nhiêu?`,Math.max(a,-q),
  [`Đặt nhân tử chung (${lin(1,-a)}): (${lin(1,-a)})(${lin(1,q)}) = 0.`,`Suy ra x = ${ng(a)} hoặc x = ${ng(-q)}.`,`Nghiệm lớn nhất là ${ng(Math.max(a,-q))}.`]),[2,a,q]]}));

/* ================= NÂNG CAO ================= */
addH('l8hd',
gn('hd2.rut_gon_lp',()=>{const t=R(0,2),a=R(2,10);
 if(t==0)return[Iq(`Biểu thức A = (x + ${a})(x^2 − ${a}x + ${a*a}) − (x − ${a})(x^2 + ${a}x + ${a*a}) có giá trị không phụ thuộc vào x. Giá trị đó bằng bao nhiêu?`,2*a**3,
  [`Áp dụng A^3 + B^3 = (A + B)(A^2 − AB + B^2): (x + ${a})(x^2 − ${a}x + ${a*a}) = x^3 + ${a**3}.`,`Áp dụng A^3 − B^3 = (A − B)(A^2 + AB + B^2): (x − ${a})(x^2 + ${a}x + ${a*a}) = x^3 − ${a**3}.`,`Trừ hai kết quả: (x^3 + ${a**3}) − (x^3 − ${a**3}) = ${2*a**3}.`]),[0,a]];
 if(t==1)return[Iq(`Biểu thức A = (x + ${a})^3 − (x − ${a})^3 − ${6*a}x^2 có giá trị không phụ thuộc vào x. Giá trị đó bằng bao nhiêu?`,2*a**3,
  [`Khai triển: (x + ${a})^3 = x^3 + ${3*a}x^2 + ${3*a*a}x + ${a**3}.`,`Khai triển: (x − ${a})^3 = x^3 − ${3*a}x^2 + ${3*a*a}x − ${a**3}.`,`Hiệu hai lập phương là ${6*a}x^2 + ${2*a**3}. Trừ đi ${6*a}x^2 còn ${2*a**3}.`]),[1,a]];
 return[Iq(`Biểu thức A = (x + ${a})^3 − x^3 − ${3*a}x(x + ${a}) có giá trị không phụ thuộc vào x. Giá trị đó bằng bao nhiêu?`,a**3,
  [`Khai triển: (x + ${a})^3 = x^3 + ${3*a}x^2 + ${3*a*a}x + ${a**3} và ${3*a}x(x + ${a}) = ${3*a}x^2 + ${3*a*a}x.`,`Thay vào A: x^3 + ${3*a}x^2 + ${3*a*a}x + ${a**3} − x^3 − ${3*a}x^2 − ${3*a*a}x = ${a**3}.`]),[2,a]]}),
gn('hd2.gtln',()=>{const a=nzc(7),c=nzc(15),t=R(0,1);
 if(t==0)return[Iq(`Biểu thức A = ${S([[1,2],[-2*a,1],[c,0]])} đạt giá trị nhỏ nhất tại x bằng bao nhiêu?`,a,
  [`Biến đổi: A = (${S([[1,2],[-2*a,1],[a*a,0]])}) ${sg(c-a*a)} ${Math.abs(c-a*a)} = (${lin(1,-a)})^2 ${sg(c-a*a)} ${Math.abs(c-a*a)}.`,`Vì (${lin(1,-a)})^2 ≥ 0 nên A nhỏ nhất khi (${lin(1,-a)})^2 = 0, tức x = ${ng(a)}.`]),[0,a,c]];
 return[Iq(`Tìm giá trị lớn nhất của biểu thức B = ${S([[-1,2],[2*a,1],[c,0]])}.`,a*a+c,
  [`Biến đổi: B = −(${S([[1,2],[-2*a,1],[a*a,0]])}) + ${a*a} ${sg(c)} ${Math.abs(c)} = −(${lin(1,-a)})^2 ${sg(a*a+c)} ${Math.abs(a*a+c)}.`,`Vì −(${lin(1,-a)})^2 ≤ 0 nên B ≤ ${ng(a*a+c)}, dấu "=" xảy ra khi x = ${ng(a)}.`,`Giá trị lớn nhất của B là ${ng(a*a+c)}.`]),[1,a,c]]}),
gn('hd2.chia_het_n',()=>{const t=R(0,1);
 if(t==0){const a=R(1,15);return[Iq(`Với mọi số nguyên n, biểu thức (n + ${a})^2 − (n − ${a})^2 luôn chia hết cho một số nguyên dương lớn nhất là bao nhiêu?`,4*a,
  [`Dùng hiệu hai bình phương: (n + ${a})^2 − (n − ${a})^2 = [(n + ${a}) − (n − ${a})][(n + ${a}) + (n − ${a})] = ${2*a}·2n = ${4*a}n.`,
   `${4*a}n chia hết cho ${4*a} với mọi số nguyên n.`,
   `Với n = 1, biểu thức bằng ${4*a}, nên không có số nào lớn hơn ${4*a} chia hết được mọi giá trị. Số lớn nhất là ${4*a}.`]),[0,a]]}
 const a=R(2,12);return[Iq(`Với mọi số nguyên n, biểu thức (${a}n + 1)^2 − (${a}n − 1)^2 luôn chia hết cho một số nguyên dương lớn nhất là bao nhiêu?`,4*a,
  [`Dùng hiệu hai bình phương: (${a}n + 1)^2 − (${a}n − 1)^2 = [(${a}n + 1) − (${a}n − 1)][(${a}n + 1) + (${a}n − 1)] = 2·${2*a}n = ${4*a}n.`,
   `${4*a}n chia hết cho ${4*a} với mọi số nguyên n.`,
   `Với n = 1, biểu thức bằng ${4*a}, nên không có số nào lớn hơn ${4*a} chia hết được mọi giá trị. Số lớn nhất là ${4*a}.`]),[1,a]]}),
gn('hd2.nghich_dao',()=>{const a=R(3,12),t=R(0,2),e=[2,3,4][t],v=[a*a-2,a**3-3*a,(a*a-2)**2-2][t],b=a*a-2;
 return[Iq(`Cho x + ${fh(1,'x')} = ${a}. Tính x^${e} + ${fh(1,'x^'+e)}.`,v,
  t==0?[`Bình phương hai vế: (x + ${fh(1,'x')})^2 = ${a*a}.`,`Khai triển: x^2 + 2 + ${fh(1,'x^2')} = ${a*a}.`,`Suy ra x^2 + ${fh(1,'x^2')} = ${a*a} − 2 = ${a*a-2}.`]
   :t==1?[`Lập phương hai vế: (x + ${fh(1,'x')})^3 = ${a**3}.`,`Khai triển: x^3 + 3(x + ${fh(1,'x')}) + ${fh(1,'x^3')} = ${a**3}, tức x^3 + ${fh(1,'x^3')} + ${3*a} = ${a**3}.`,`Suy ra x^3 + ${fh(1,'x^3')} = ${a**3} − ${3*a} = ${a**3-3*a}.`]
   :[`Bình phương hai vế: x^2 + 2 + ${fh(1,'x^2')} = ${a*a}, nên x^2 + ${fh(1,'x^2')} = ${b}.`,`Bình phương tiếp: (x^2 + ${fh(1,'x^2')})^2 = ${b}^2, tức x^4 + 2 + ${fh(1,'x^4')} = ${b*b}.`,`Suy ra x^4 + ${fh(1,'x^4')} = ${b*b} − 2 = ${b*b-2}.`]),[a,t]]}),
gn('hd2.pt_x4',()=>{const c=R(1,3),d=R(1,4),X=A1(c*c,'x^2'),L=lin(c,-d),Rr=lin(c,d);
 return[M(`Phân tích đa thức ${S([[c**4,4],[-(d**4),0]])} thành nhân tử.`,`(${L})(${Rr})(${X} + ${d*d})`,
  [`(${L})^2(${Rr})^2`,`(${X} − ${d*d+1})(${X} + ${d*d+1})`,`(${L})(${Rr})(${X} + ${d*d+1})`,`(${L})^4`,`(${L})(${Rr})(${X} − ${d*d})`],
  [`Viết ${S([[c**4,4],[-(d**4),0]])} = (${X})^2 − (${d*d})^2 rồi dùng A^2 − B^2 = (A − B)(A + B): (${X} − ${d*d})(${X} + ${d*d}).`,
   `Thừa số ${X} − ${d*d} = (${L})(${Rr}) tiếp tục phân tích được; thừa số ${X} + ${d*d} thì không.`,
   `Vậy ${S([[c**4,4],[-(d**4),0]])} = (${L})(${Rr})(${X} + ${d*d}).`],'',String),[c,d]]}),
gn('hd2.day_bp',()=>{const m=R(3,30),s=m*(2*m+1);
 return[Iq(`Tính S = 2^2 − 1^2 + 4^2 − 3^2 + … + ${2*m}^2 − ${2*m-1}^2.`,s,
  [`Nhóm từng cặp và dùng A^2 − B^2 = (A − B)(A + B): (2k)^2 − (2k − 1)^2 = 1·(4k − 1). Ví dụ 2^2 − 1^2 = 3; 4^2 − 3^2 = 7; 6^2 − 5^2 = 11.`,
   `Vậy S = 3 + 7 + 11 + … + ${4*m-1}, có ${m} số hạng, mỗi số hơn số liền trước 4 đơn vị.`,
   `Tổng = (số đầu + số cuối) · số số hạng : 2 = (3 + ${4*m-1})·${m} : 2 = ${s}.`]),[m]]}));
})();
