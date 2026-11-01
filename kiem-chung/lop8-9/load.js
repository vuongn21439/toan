/* Nạp toàn bộ file dữ liệu câu hỏi (đúng thứ tự trong index.html, bỏ phần giao diện) vào một vm để kiểm tra.
   Dùng: const ctx=require('./load')(rootDir); ctx.T = danh sách chủ đề, ctx.GRADES ... */
const fs=require('fs'),path=require('path'),vm=require('vm');
module.exports=function(root){
  root=root||path.join(__dirname,'..','..');
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const srcs=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(s=>/^js\/(core|data)\//.test(s));
  const ctx=vm.createContext({console,Math,Date,JSON,Set,Map,Array,Object,String,Number,BigInt,parseInt,parseFloat,isFinite,isNaN,RegExp,Error});
  for(const s of srcs)vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx,{filename:s});
  /* const ở mức script không nằm trên global object: lấy ra bằng một lệnh chạy thêm */
  const get=vm.runInContext('({T,GRADES,H,chk:null,R,P,sh})',ctx);
  get.srcs=srcs;get.ctx=ctx;return get};
