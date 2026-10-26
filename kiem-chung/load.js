// Nạp dữ liệu câu hỏi của game vào vm để thống kê / kiểm chứng
const vm=require('vm'),fs=require('fs'),path=require('path');
module.exports=function load(root,extraFiles=[]){
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const files=[...html.matchAll(/<script src="(js\/(?:core|data)[^"]+)"/g)].map(m=>m[1]);
  const ctx=vm.createContext({console,Math,Set,Map,Array,String,Number,Object,JSON,Date});
  for(const f of [...files,...extraFiles]){
    vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
  }
  return {ctx,files,run:s=>vm.runInContext(s,ctx)};
};
