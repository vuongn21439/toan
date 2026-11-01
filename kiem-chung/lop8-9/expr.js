/* Bộ phân tích biểu thức đại số độc lập (x, y; + − · / ^; ngoặc; nhân ngầm; phân thức dạng HTML fh) dùng cho oracle */
const strip=s=>String(s).replace(/<span class="fr"><b>(.*?)<\/b><b>(.*?)<\/b><\/span>/g,'(($1)/($2))').replace(/<sup>(.*?)<\/sup>/g,'^$1').replace(/<[^>]+>/g,'');
function parse(src){
  const s=strip(src).replace(/−/g,'-').replace(/[·×]/g,'*').replace(/²/g,'^2').replace(/³/g,'^3').replace(/\s+/g,'');
  const tk=s.match(/\d+(?:\.\d+)?|[xy+\-*\/^()]/g)||[];if(tk.join('')!==s)throw new Error('ký tự lạ trong biểu thức: '+src);
  let i=0;
  const peek=()=>tk[i],eat=()=>tk[i++];
  const expr=()=>{let f=term();while(peek()=='+'||peek()=='-'){const o=eat(),g=term(),h=f;f=o=='+'?(x,y)=>h(x,y)+g(x,y):(x,y)=>h(x,y)-g(x,y)}return f};
  const term=()=>{let f=unary();for(;;){const t=peek();if(t=='*'||t=='/'){eat();const g=unary(),h=f;f=t=='*'?(x,y)=>h(x,y)*g(x,y):(x,y)=>h(x,y)/g(x,y)}
    else if(t!==undefined&&(t=='x'||t=='y'||t=='('||/^\d/.test(t))){const g=unary(),h=f;f=(x,y)=>h(x,y)*g(x,y)}else break}return f};
  const unary=()=>{if(peek()=='-'){eat();const f=unary();return(x,y)=>-f(x,y)}if(peek()=='+'){eat();return unary()}return pow()};
  const pow=()=>{const b=atom();if(peek()=='^'){eat();const e=unary(),h=b;return(x,y)=>h(x,y)**e(x,y)}return b};
  const atom=()=>{const t=eat();if(t=='(' ){const f=expr();if(eat()!=')')throw new Error('thiếu )');return f}if(t=='x')return x=>x;if(t=='y')return(x,y)=>y;if(/^\d/.test(t)){const v=+t;return()=>v}throw new Error('lỗi cú pháp tại '+t+' trong '+src)};
  const f=expr();if(i<tk.length)throw new Error('thừa ký tự trong '+src);return f}
/* so sánh hai hàm tại nhiều điểm nguyên/hữu tỉ ngẫu nhiên (bỏ qua điểm làm mẫu bằng 0) */
function same(f,g,n=14){let ok=0;for(let k=0;k<n*3&&ok<n;k++){const x=Math.floor(Math.random()*21)-10+(Math.random()<.5?0:.5),y=Math.floor(Math.random()*21)-10+(Math.random()<.5?0:.5),a=f(x,y),b=g(x,y);
  if(!isFinite(a)||!isFinite(b)||Number.isNaN(a)||Number.isNaN(b))continue;ok++;if(Math.abs(a-b)>1e-6*Math.max(1,Math.abs(a),Math.abs(b)))return false}return ok>=5}
const ev=(A,x,y=0)=>A.reduce((s,[c,a,b=0])=>s+c*x**a*y**b,0),ng=v=>String(v).replace('-','−'),gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
/* giá trị số của chuỗi có căn thức: 3√2, √5 + √2, 2(√7 − √3), ∛54 ... */
function rv(src){let s=strip(src).replace(/−/g,'-').replace(/\s+/g,'');s=s.replace(/∛(\d+)/g,'Math.cbrt($1)').replace(/√(\d+)/g,'Math.sqrt($1)').replace(/(\d|\))(?=Math)/g,'$1*').replace(/(\d|\))\(/g,'$1*(');if(!/^[0-9+\-*/().Math,sqrtcb ]+$/.test(s))throw new Error('rv: '+src);return Function('return '+s)()}
module.exports={parse,same,strip,ev,ng,gcd,rv};
