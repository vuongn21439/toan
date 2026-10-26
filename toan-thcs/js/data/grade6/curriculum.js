/* LỚP 6: Khung chương trình lớp 6: nhóm chủ đề (PH) và số thứ tự chủ đề (CD) */
/* ===== v3: PHỦ ĐỦ 9 CHỦ ĐỀ CT GDPT 2018 (thêm câu hỏi, gom nhóm theo Phần) ===== */
const xl=(a,b,s=1)=>'{'+Array.from({length:Math.floor((b-a)/s)+1},(_,i)=>a+i*s).join('; ')+'}',
ft=x=>String(+x.toFixed(4)).replace('.',','),
xw=(a,k=3)=>sh(a).slice(0,k),
tly=n=>[...Array(Math.floor(n/5)).fill('|||||'),...(n%5?['|'.repeat(n%5)]:[])].join(' '),
CD={nat:1,pow:1,set:1,div:2,ub:2,gcd:2,int:3,frac:4,dec:5,pct:5,sym:6,geo:6,cir:6,axis:7,line:8,stat:9},
PH=[['Phần I: Số học & Đại số',['nat','pow','set','div','ub','gcd','int','frac','dec','pct']],['Phần II: Hình học & Đo lường',['sym','geo','cir','axis','line']],['Phần III: Thống kê & Xác suất',['stat']],['Tổng hợp',['word']]];
