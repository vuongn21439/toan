/* Danh mục lớp học: mỗi lớp có 3 nhóm chủ đề (3 tab ở mục Học, và 3 đề thi riêng ở mục Thi thử).
   Muốn thêm lớp 8: tạo js/data/grade8/, nạp trong index.html, rồi thêm mục 8 ở đây và trong js/app/grade.js. */
const GRADES={
 6:{label:'Lớp 6',e:'🧩',c:'#2f6fe0',tag:'Nền tảng vững chắc',sub:'Số học · Hình học · Thống kê',groups:[['🔢 Số học',PH[0][1]],['📐 Hình học',PH[1][1]],['📊 Thống kê',[...PH[2][1],...PH[3][1]]]]},
 7:{label:'Lớp 7',e:'🚀',c:'#ff8a3d',tag:'Lên tầm đại số và hình học',sub:'10 chương theo chương trình',groups:[['🔢 Số & Đại số',['l7sht','l7sth','l7tlt','l7dt']],['📐 Hình học',['l7gdt','l7tgb','l7qht','l7hk']],['📊 Thống kê & XS',['l7bd','l7xs']]]}};
/* Mọi chủ đề chưa gán gr đều là lớp 6 (lớp 7 đã gán gr=7). Bảng xếp hạng XP dùng chung. */
T.forEach(t=>{if(t.gr===undefined)t.gr=6});
