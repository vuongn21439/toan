/* v5 · BK: bộ dựng câu hỏi dùng chung cho lớp 6 và lớp 7 (nạp sau grade7/helpers.js, trước các file câu hỏi mới)
   - mc():  trắc nghiệm 4 đáp án. Mỗi đáp án nhiễu là một LỖI HAY GẶP, kèm lý do hiện ra khi em chọn nhầm.
            wrong = mảng; mỗi phần tử là giá trị, hoặc [giá trị, 'lý do sai'].
   - sol(): lời giải từng bước + kết luận + lưu ý lỗi dễ nhầm.
   - gen(): gắn mã câu (q.k) và tham số kiểm chứng (q.p); thử lại nếu bốc số không hợp lệ; KHÔNG BAO GIỜ ném lỗi làm sập lượt chơi. */
const BK=(()=>{
 const ng=v=>String(v).replace('-','−'),
 /* số thập phân kiểu Việt: 3,5 (bỏ số 0 thừa) */
 fd=v=>ng(String(+(+v).toFixed(4))).replace('.',','),
 ov=s=>`<span style="text-decoration:overline">${s}</span>`,
 mc=(q,a,wrong,e,fmt=ng)=>{
  const A=fmt(a),seen=new Set([A]),wr=[],pl=[],why={};
  for(const it of wrong){const[v,r]=Array.isArray(it)?it:[it];if(v==null||(typeof v=='number'&&!isFinite(v)))continue;
   const s=fmt(v);if(!s||seen.has(s)||/NaN|undefined|Infinity/.test(s))continue;seen.add(s);(r?wr:pl).push(s);if(r)why[s]=r}
  /* ưu tiên đáp án nhiễu có lý do (lỗi hay gặp); thiếu thì bù bằng đáp án không lý do, rồi số lân cận */
  const w=[...sh(wr),...sh(pl)].slice(0,3);
  if(w.length<3&&typeof a=='number')for(const d of sh([1,-1,2,-2,3,-3,5,-5,10,-10])){if(w.length>=3)break;if(a>=0&&a+d<0)continue;const s=fmt(a+d);if(!seen.has(s)){seen.add(s);w.push(s)}}
  const o=Q(q,A,w,e),x={};w.forEach(s=>{if(why[s])x[s]=why[s]});if(Object.keys(x).length)o.x=x;return o},
 sol=(steps,ans,err)=>steps.map((s,i)=>`<b>Bước ${i+1}.</b> ${s}`).join('\n')+(ans?`\n✅ <b>Kết luận:</b> ${ans}`:'')+(err?`\n⚠️ <b>Dễ nhầm:</b> ${err}`:''),
 /* gen(mã, hàm): hàm trả về câu hỏi, hoặc [câu hỏi, tham số] */
 gen=(k,fn)=>()=>{
  for(let i=0;i<12;i++){try{const r=fn(),q=Array.isArray(r)?r[0]:r;
   if(q&&q.q&&q.w&&q.w.length>=3&&!/NaN|undefined|Infinity/.test(q.q+q.a+q.w.join('|')+q.e)){q.k=k;if(Array.isArray(r))q.p=r[1];return q}}catch(e){}}
  const a=R(11,49),b=R(11,49),o=Q(`Tính: ${a} + ${b}`,''+(a+b),[a+b+10,a+b-10,a+b+1].map(String),sol([`Cộng hàng đơn vị rồi hàng chục: ${a} + ${b} = ${a+b}.`],`${a+b}`));o.k='fallback';return o},
 /* Tổ hợp chập 2, hoán vị chỉnh hợp nhỏ (dùng cho đếm) */
 c2=n=>n*(n-1)/2,
 lcm=(a,b)=>a/gcd(a,b)*b;
 return{mc,sol,gen,ov,fd,ng,c2,lcm}
})();
