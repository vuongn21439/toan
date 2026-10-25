/* LỚP 7: hàm dùng chung cho nội dung (phân số, đa thức, biểu đồ). Gói trong G7H để không đụng tên với lớp 6 */
const G7H=(()=>{
 /* fr: phân số tối giản dạng 'a/b' (dấu - thường, dùng làm đáp án nhập); fq: như fr nhưng dấu − đẹp để hiển thị */
 const fr=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(Math.abs(n),d)||1;return d/g==1?''+n/g:n/g+'/'+d/g},
 fq=(n,d=1)=>fr(n,d).replace('-','−'),
 fh=(n,d)=>`<span class="fr"><b>${n}</b><b>${d}</b></span>`,   /* phân số có chữ, ví dụ x/6 */
 add=(id,...f)=>T.find(t=>t.id==id).g.push(...f),
 addH=(id,...f)=>T.find(t=>t.id==id).h.push(...f),
 /* ps: đa thức từ mảng hệ số c[i] của x^i, ví dụ [5,-2,0,3] → 3x^3 − 2x + 5 */
 ps=(c,v='x')=>{let s='';for(let i=c.length-1;i>=0;i--){const a=c[i];if(!a)continue;const m=Math.abs(a),t=i?(m==1?'':m)+v+(i>1?'^'+i:''):''+m;s+=(s?(a<0?' − ':' + '):(a<0?'−':''))+t}return s||'0'},
 PAL=['#ff6b81','#feca57','#1dd1a1','#54a0ff'],
 /* biểu đồ hình quạt tròn: v = phần trăm (tổng 100), l = tên từng phần. Dùng style để thắng luật .fg path/rect trong CSS */
 pie=(v,l)=>{let a=-Math.PI/2,s='';v.forEach((x,i)=>{const b=a+x/50*Math.PI,p=t=>[58+52*Math.cos(t),75+52*Math.sin(t)].map(z=>z.toFixed(1)).join(' ');
  s+=`<path d="M58 75L${p(a)}A52 52 0 ${x>50?1:0} 1 ${p(b)}Z" style="fill:${PAL[i]};stroke:#0e1033;stroke-width:1.5"/><rect x="120" y="${22+i*30}" width="12" height="12" style="fill:${PAL[i]};stroke:none"/><text x="138" y="${33+i*30}" style="font-size:12px">${l[i]} ${x}%</text>`;a=b});
  return `<svg viewBox="0 0 240 150" class="fg">${s}</svg>`},
 /* biểu đồ đoạn thẳng: v = giá trị, l = nhãn trục ngang */
 lch=(v,l)=>{const m=Math.max(...v)*1.2,n=v.length,pt=v.map((x,i)=>[34+i*(188/(n-1)),118-92*x/m]);
  return `<svg viewBox="0 0 240 150" class="fg"><path d="M26 10V118H232"/><polyline points="${pt.map(p=>p.map(z=>z.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="#feca57" stroke-width="2.5"/>${pt.map((p,i)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#feca57"/><text x="${p[0].toFixed(1)}" y="${(p[1]-7).toFixed(1)}" text-anchor="middle" style="font-size:11px">${v[i]}</text><text x="${p[0].toFixed(1)}" y="134" text-anchor="middle" style="font-size:11px">${l[i]}</text>`).join('')}</svg>`};
 return{fr,fq,fh,add,addH,ps,pie,lch}
})();
