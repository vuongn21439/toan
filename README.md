# Toán Vui Vẻ · bản v5

Game luyện Toán lớp 6 và lớp 7, chạy trên trình duyệt hoặc điện thoại (cài được như app, mất mạng vẫn chơi).

## Trong gói này
| Thư mục | Dùng để làm gì |
|---|---|
| `toan-thcs/` | **Game.** Chỉ cần đưa thư mục này lên hosting (GitHub Pages, Firebase Hosting…). |
| `kiem-chung/` | Bộ kiểm tra đáp án tự động và `samples.txt` (câu mẫu để đọc thử). Không cần đưa lên hosting. |

## Có gì mới ở v5
- **+111 dạng câu hỏi mới** lấy ý tưởng từ tài liệu HSG Toán 6 và Toán 7: 74 dạng lớp 6, 37 dạng lớp 7. Số liệu sinh ngẫu nhiên nên chơi mãi không trùng đề.
- Mỗi câu có **3 đáp án nhiễu là lỗi hay gặp** và **lời giải từng bước** (Bước 1, 2… rồi Kết luận, Dễ nhầm).
- Có **hình vẽ** ở các câu cần nhìn: hai đường thẳng song song bị cắt, trung tuyến và trọng tâm, biểu đồ đoạn thẳng.
- **"Vì sao đáp án em chọn chưa đúng?"**: chọn nhầm đáp án nhiễu là hiện ngay lý do, khi luyện tập và khi xem lại bài thi.
- Sửa lỗi: màn "Chưa vào được bảng xếp hạng" không còn bật giữa lúc em đang chơi offline.
- Điểm, sao và tiến độ cũ của học sinh được giữ nguyên.

## Chạy thử trên máy
Không mở bằng cách bấm đúp `index.html`. Mở terminal trong thư mục `toan-thcs/` và chạy:

    python3 -m http.server 8000

Rồi mở http://localhost:8000

## Đưa lên mạng
Tải nguyên thư mục `toan-thcs/` lên hosting. Phiên bản offline đã đổi sang `thcs-v4` nên máy học sinh sẽ tự tải bản mới khi có mạng.

## Kiểm tra đáp án
Cần Node 18 trở lên:

    cd kiem-chung
    node verify.js ../toan-thcs 500

Kết quả đúng sẽ có dòng `Generators mới: 111  sai đáp án: 0`.

## Muốn đọc kỹ hơn?
Xem `toan-thcs/README.md`: cấu trúc file, cách viết thêm dạng câu hỏi mới, ghi chú kỹ thuật.
