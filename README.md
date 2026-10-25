# Toán Vui Vẻ (Toán THCS)

Game luyện toán chạy trên trình duyệt/điện thoại, cài được như app (PWA), chơi được khi mất mạng.
Hiện có **Toán lớp 6** (16 chủ đề + Toán đố, giữ nguyên bản v10) và **Toán lớp 7** (10 chương, mỗi chương có mức Cơ bản và Nâng cao).

## Chạy thử
Không mở file bằng cách bấm đúp (file:// chặn các module). Chạy máy chủ tĩnh trong thư mục này:

    python3 -m http.server 8000      # rồi mở http://localhost:8000

Khi đưa lên mạng (GitHub Pages, Firebase Hosting…) chỉ cần tải nguyên thư mục.

## Cấu trúc
    index.html              khung trang, chỉ nạp CSS và JS
    css/style.css           toàn bộ giao diện
    js/core/helpers.js      hàm dùng chung (ngẫu nhiên, tạo câu hỏi Q/N/Z, hiển thị phân số)
    js/data/grades.js       danh mục lớp: nhóm chủ đề của lớp 6 và lớp 7
    js/data/grade6/         câu hỏi lớp 6 (nội dung cũ, chỉ tách file)
    js/data/grade7/         câu hỏi lớp 7: helpers, topics, algebra, geometry, statistics
    js/audio/sound.js       âm thanh tổng hợp bằng WebAudio
    js/app/                 state (dữ liệu người chơi), hub (các tab), grade (chọn lớp), game (lượt chơi),
                            install (cài app), account (đăng nhập, bảng xếp hạng), boot (khởi động)
    js/fx/                  pháo giấy, nền 3D
    js/firebase/            kết nối Firebase
    assets/icons/           biểu tượng app
    sw.js, manifest.webmanifest, firestore.rules

## Lớp 7 theo chương trình
| Phần | Chương | Chủ đề (id) | File |
|---|---|---|---|
| Số và Đại số | I | Số hữu tỉ (l7sht) | algebra.js |
| | II | Số thực (l7sth) | algebra.js |
| | VI | Tỉ lệ thức, tỉ lệ thuận, tỉ lệ nghịch (l7tlt) | algebra.js |
| | VII | Đa thức một biến (l7dt) | algebra.js |
| Hình học và Đo lường | III | Góc và đường thẳng song song (l7gdt) | geometry.js |
| | IV | Tam giác bằng nhau (l7tgb) | geometry.js |
| | IX | Quan hệ trong tam giác, đường đồng quy (l7qht) | geometry.js |
| | X | Hình hộp chữ nhật, lăng trụ đứng (l7hk) | geometry.js |
| Thống kê và Xác suất | V | Thu thập và biểu diễn dữ liệu (l7bd) | statistics.js |
| | VIII | Biến cố và xác suất (l7xs) | statistics.js |

## Thêm câu hỏi
Mỗi câu hỏi là một hàm trả về câu hỏi mới (số ngẫu nhiên) nên chơi mãi không hết đề.
Trong file lớp 7, thêm vào `add('mã-chủ-đề', ...)` (mức Cơ bản) hoặc `addH('mã-chủ-đề', ...)` (mức Nâng cao):

    add('l7sth', ()=>{const s=R(2,15);return N(`Tính: √${s*s}`, s, `${s}² = ${s*s}`)});

- `N(đề, đáp án, lời giải, định dạng)`: trắc nghiệm số, tự sinh 3 đáp án nhiễu.
- `Z(đề, đáp án, [đáp án sai…], lời giải)`: trắc nghiệm tự đặt đáp án sai.
- `I(đề, đáp án, lời giải)`: học sinh tự nhập đáp án (phân số nhập dạng a/b tối giản).
- `F(câu hỏi, svg)`: gắn hình minh họa (xem `pie`, `lch` trong `grade7/helpers.js`).

## Thêm lớp 8
Tạo `js/data/grade8/`, nạp trong `index.html` trước `js/data/grades.js`, đặt `gr:8` cho chủ đề,
thêm mục 8 trong `GRADES` (`grades.js`) và nút chọn lớp trong `js/app/grade.js`.

## Ghi chú kỹ thuật
- Tên lưu trữ cũ (`t6` trong localStorage, `T6_UI`, `T6_SYNC`) được **giữ nguyên** để học sinh không mất điểm, sao và tiến độ đã đồng bộ.
- `firestore.rules`: `stars` tối đa 300; `progress` có thêm trường `dc7` (thử thách ngày của lớp 7, `dc` vẫn là lớp 6). **Cần dán lại rules vào Firebase Console** thì thử thách ngày lớp 7 mới đồng bộ được giữa các máy.
- Chọn lớp: lần đầu mở app hiện màn Chọn lớp (`pickGrade` trong `js/app/grade.js`), sau đó đổi lớp bằng banner ở đầu các tab Học, Ôn tập, Thi thử, Thử thách. Giao diện đổi màu theo `body[data-gr]`.
- `sw.js` (`thcs-v3`): danh sách file lưu offline tự đọc từ `index.html`, nên thêm file script mới chỉ cần khai báo trong `index.html`. Các file `.js`/`.css` và trang chính luôn ưu tiên bản mới khi có mạng (quá 6 giây hoặc mất mạng thì dùng bản đã lưu). Muốn ép máy học sinh tải lại toàn bộ thì đổi `V`.
- Thử thách hằng ngày và đề thi theo lớp đang chọn; lớp 6 giữ nguyên đề ngày như trước.
- **Chế độ thi thử & thử thách ngày (v2)**: đếm giờ (8 phút / 5 câu, 25 phút / 15 câu), chọn đáp án không hiện đúng/sai ngay, có nút Câu trước/Câu tiếp, phải **Nộp bài** mới chấm điểm và hiện lời giải. Luyện tập (tab Học, Ôn tập) vẫn feedback ngay như cũ.

- **Phòng thi (v4)** – code ở `js/app/exam.js`: đồng hồ tính theo mốc giờ kết thúc (khóa màn hình không đứng giờ), tự lưu bài làm dở (`t6x` trong localStorage) để làm tiếp, bản đồ câu hỏi, đánh dấu xem lại, vuốt đổi câu, hộp thoại tự vẽ thay `confirm()`, màn **Xem lại bài & lời giải** sau khi nộp, gợi ý chủ đề cần luyện. Làm bài dưới 3 giây/câu thì không tính XP. Lịch sử thử thách 7 ngày (`dh`) và kết quả thi gần đây (`mh`) chỉ lưu trên máy, **không** đồng bộ nên không cần đổi `firestore.rules`.
