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
    js/data/grade6/         câu hỏi lớp 6 (nội dung cũ) + q7/q8/q9-chuyen-de.js (v5: 74 dạng bài chuyên đề mới)
    js/data/grade7/         câu hỏi lớp 7: helpers, topics, algebra, geometry, statistics + chuyen-de-1/2.js (v5: 37 dạng mới)
    js/data/bank/helpers.js BK (v5): bộ dựng câu hỏi có đáp án nhiễu kèm lý do + lời giải từng bước
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
- `sw.js` (`thcs-v4`): danh sách file lưu offline tự đọc từ `index.html`, nên thêm file script mới chỉ cần khai báo trong `index.html`. Các file `.js`/`.css` và trang chính luôn ưu tiên bản mới khi có mạng (quá 6 giây hoặc mất mạng thì dùng bản đã lưu). Muốn ép máy học sinh tải lại toàn bộ thì đổi `V`.
- Thử thách hằng ngày và đề thi theo lớp đang chọn; lớp 6 giữ nguyên đề ngày như trước.
- **Chế độ thi thử & thử thách ngày (v2)**: đếm giờ (8 phút / 5 câu, 25 phút / 15 câu), chọn đáp án không hiện đúng/sai ngay, có nút Câu trước/Câu tiếp, phải **Nộp bài** mới chấm điểm và hiện lời giải. Luyện tập (tab Học, Ôn tập) vẫn feedback ngay như cũ.

- **Phòng thi (v4)** – code ở `js/app/exam.js`: đồng hồ tính theo mốc giờ kết thúc (khóa màn hình không đứng giờ), tự lưu bài làm dở (`t6x` trong localStorage) để làm tiếp, bản đồ câu hỏi, đánh dấu xem lại, vuốt đổi câu, hộp thoại tự vẽ thay `confirm()`, màn **Xem lại bài & lời giải** sau khi nộp, gợi ý chủ đề cần luyện. Làm bài dưới 3 giây/câu thì không tính XP. Lịch sử thử thách 7 ngày (`dh`) và kết quả thi gần đây (`mh`) chỉ lưu trên máy, **không** đồng bộ nên không cần đổi `firestore.rules`.

## Ngân hàng chuyên đề (v5)
Bổ sung **111 dạng câu hỏi mới** (74 lớp 6, 37 lớp 7) lấy ý tưởng từ hai tài liệu bồi dưỡng HSG Toán 6 và Toán 7. Mỗi dạng là một hàm sinh số ngẫu nhiên nên không bao giờ hết đề.
Câu mới nằm trong cùng các chủ đề cũ (lớp 6 và lớp 7 vẫn tách riêng): dạng dễ vào mức **Cơ bản**, dạng khó vào mức **Nâng cao**.

Mỗi câu có:
- **3 đáp án nhiễu là lỗi học sinh hay mắc** (quên đổi dấu, nhầm công thức, bỏ sót trường hợp…), mỗi nhiễu kèm một dòng lý do.
- **Lời giải từng bước** (Bước 1, 2, …), phần ✅ Kết luận và ⚠️ Dễ nhầm.
- **Hình vẽ SVG** ở các câu cần quan sát (hai đường thẳng song song bị cắt, trung tuyến – trọng tâm, biểu đồ đoạn thẳng).
- **“Vì sao đáp án em chọn chưa đúng?”**: khi chọn nhầm một đáp án nhiễu, khung phản hồi (tab Học/Ôn tập) và màn Xem lại bài (thi thử, thử thách ngày) hiện ngay lý do. Code ở `pick()/rs()` trong `js/app/game.js`, `exReview()` trong `js/app/exam.js`, kiểu `.why` trong `css/style.css`.

Viết thêm một dạng mới (file `js/data/bank/helpers.js` có sẵn `mc`, `sol`, `gen`):

    gen('gcd.vi_du', ()=>{
      const a=R(2,9), b=R(2,9), s=a+b;
      const e=sol([`Cộng hai số: ${a} + ${b} = ${s}.`], `${s}.`, `Đừng nhân thay vì cộng.`);
      return [mc(`Tính ${a} + ${b}`, s, [[a*b,'nhân thay vì cộng'],[s+1,'cộng nhầm'],[Math.abs(a-b),'trừ thay vì cộng']], e), [a,b]];
    })
    // đặt trong A('mã-chủ-đề', …) / HA(…) (lớp 6) hoặc G7H.add / G7H.addH (lớp 7)

### Kiểm chứng tự động (thư mục `kiem-chung/`, không cần đưa lên hosting)
Mỗi dạng mới được chạy hàng trăm lần và so đáp án với một **oracle độc lập** (vét cạn/BigInt), đồng thời kiểm tra: đủ 4 đáp án khác nhau, ≥ 2 bước giải, đáp án xuất hiện trong lời giải, không có `NaN/undefined`. Chạy:

    cd kiem-chung && node verify.js ../toan-thcs 500     # cần Node 18+
    # kết quả: "Generators mới: 111  sai đáp án: 0"; mẫu câu hỏi ghi ở samples.txt

Thêm dạng mới thì thêm oracle vào `oracles*.js` (khóa = mã câu `gen('mã', …)`, hàm nhận `(tham-số, câu-hỏi)` và trả về đáp án đúng).
