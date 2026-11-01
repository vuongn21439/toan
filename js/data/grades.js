/* Danh mục lớp học: mỗi lớp có 3 nhóm chủ đề (3 tab ở mục Học, và 3 đề thi riêng ở mục Thi thử).
   Thêm lớp mới: tạo js/data/gradeN/ (topics + câu hỏi), nạp trong index.html, thêm mục N ở đây, trong js/app/grade.js (danh sách lớp),
   css/style.css (màu body[data-gr]), js/app/hub.js (khóa thử thách ngày dcN) và account.js (DCS). */
const GRADES={
 6:{label:'Lớp 6',e:'🧩',c:'#2f6fe0',tag:'Nền tảng vững chắc',sub:'Số học · Hình học · Thống kê',groups:[['🔢 Số học',PH[0][1]],['📐 Hình học',PH[1][1]],['📊 Thống kê',[...PH[2][1],...PH[3][1]]]]},
 7:{label:'Lớp 7',e:'🚀',c:'#ff8a3d',tag:'Lên tầm đại số và hình học',sub:'10 chương theo chương trình',groups:[['🔢 Số & Đại số',['l7sht','l7sth','l7tlt','l7dt']],['📐 Hình học',['l7gdt','l7tgb','l7qht','l7hk']],['📊 Thống kê & XS',['l7bd','l7xs']]]},
 8:{label:'Lớp 8',e:'🔭',c:'#2ecc9a',tag:'Đa thức, hình học và hàm số',sub:'12 chủ đề theo chương trình',groups:[['🔢 Số & Đại số',['l8dt','l8hd','l8pt','l8hs','l8ptr']],['📐 Hình học',['l8hc','l8py','l8tg','l8th','l8dd']],['📊 Thống kê & XS',['l8tk','l8xs']]]},
 9:{label:'Lớp 9',e:'🎓',c:'#d6336c',tag:'Chặng nước rút vào lớp 10',sub:'11 chủ đề theo chương trình',groups:[['🔢 Số & Đại số',['l9can','l9hsb2','l9ptb2','l9hpt','l9bpt']],['📐 Hình học',['l9htl','l9dt1','l9dt2','l9kg']],['📊 Thống kê & XS',['l9tk','l9xs']]]}};
/* Mọi chủ đề chưa gán gr đều là lớp 6 (lớp 7, 8, 9 đã gán gr). Bảng xếp hạng XP dùng chung. */
T.forEach(t=>{if(t.gr===undefined)t.gr=6});
