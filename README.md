# Toán Vui Vẻ (Toán THCS)

Game luyện toán chạy trên trình duyệt/điện thoại, cài được như app (PWA), chơi được khi mất mạng.
Hiện có **Toán lớp 6** (16 chủ đề + Toán đố, giữ nguyên bản v10), **Toán lớp 7** (10 chương), **Toán lớp 8** (12 chủ đề) và **Toán lớp 9** (11 chủ đề); mỗi chủ đề có mức Cơ bản và Nâng cao.

## Chạy thử
Không mở file bằng cách bấm đúp (file:// chặn các module). Chạy máy chủ tĩnh trong thư mục này:

    python3 -m http.server 8000      # rồi mở http://localhost:8000

Khi đưa lên mạng (GitHub Pages, Firebase Hosting…) chỉ cần tải nguyên thư mục.

## Cấu trúc
    index.html              khung trang, chỉ nạp CSS và JS
    css/style.css           toàn bộ giao diện
    js/core/helpers.js      hàm dùng chung (ngẫu nhiên, tạo câu hỏi Q/N/Z, hiển thị phân số)
    js/data/grades.js       danh mục lớp: nhóm chủ đề của lớp 6, 7, 8 và 9
    js/data/grade6/         câu hỏi lớp 6 (nội dung cũ) + q7/q8/q9-chuyen-de.js (v5: 74 dạng bài chuyên đề mới)
    js/data/grade7/         câu hỏi lớp 7: helpers, topics, algebra, geometry, statistics + chuyen-de-1/2.js (v5: 37 dạng mới)
    js/data/grade8/         câu hỏi lớp 8: helpers.js (G8H, dùng chung lớp 8 và 9), topics, algebra, algebra2, geometry, geometry2, statistics
    js/data/grade9/         câu hỏi lớp 9: topics, algebra, algebra2, geometry, statistics
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

## Thêm lớp mới (ví dụ lớp 10)
1. Tạo `js/data/grade10/` (topics + câu hỏi, đặt `gr:10` cho chủ đề) và nạp trong `index.html` trước `js/data/grades.js`.
2. Thêm mục 10 vào `GRADES` trong `js/data/grades.js` (nhãn, biểu tượng, màu, 3 nhóm chủ đề).
3. Thêm 10 vào danh sách lớp ở `js/app/state.js`, `js/app/grade.js` (`setGr`, `pickGrade`) và `js/app/exam.js`.
4. `css/style.css`: thêm `body[data-gr="10"]` và `.gc.g10` (màu giao diện, màu thẻ chọn lớp).
5. Thử thách ngày: thêm `dc10` vào `DCS` trong `js/app/account.js`, thêm hệ số cho đề ngày trong `dailyQs` (`js/app/hub.js`), thêm `dc10` vào `firestore.rules`.

## Lớp 8 và lớp 9 theo chương trình (v6)
Thêm **23 chủ đề** (12 lớp 8, 11 lớp 9) theo đúng nội dung chương trình Toán mới; mỗi chủ đề có mức Cơ bản và Nâng cao,
tổng cộng **304 dạng bài** (176 cơ bản, 128 nâng cao). Mỗi dạng là một hàm sinh số ngẫu nhiên nên chơi mãi không hết đề.

### Lớp 8 (12 chủ đề, màu xanh lá)
| Phần | Chủ đề (id) | Dạng bài Cơ bản / Nâng cao | File (js/data/grade8/) |
|---|---|---|---|
| Số và Đại số | Đa thức nhiều biến: cộng, trừ, nhân, chia (`l8dt`) | 8 / 5 | algebra.js |
|  | Hằng đẳng thức đáng nhớ, phân tích đa thức thành nhân tử (`l8hd`) | 8 / 6 | algebra.js |
|  | Phân thức đại số (`l8pt`) | 8 / 5 | algebra.js |
|  | Hàm số bậc nhất và đồ thị (`l8hs`) | 8 / 5 | algebra2.js |
|  | Phương trình bậc nhất, giải toán bằng cách lập phương trình (`l8ptr`) | 8 / 5 | algebra2.js |
| Hình học và Đo lường | Hình chóp tam giác đều, tứ giác đều (`l8hc`) | 6 / 4 | geometry.js |
|  | Định lý Pythagoras (`l8py`) | 7 / 6 | geometry.js |
|  | Tứ giác: hình thang, bình hành, chữ nhật, thoi, vuông (`l8tg`) | 6 / 6 | geometry.js |
|  | Định lý Thales, đường phân giác (`l8th`) | 7 / 5 | geometry2.js |
|  | Tam giác đồng dạng (`l8dd`) | 7 / 5 | geometry2.js |
| Thống kê và Xác suất | Thu thập, biểu diễn, phân tích dữ liệu (`l8tk`) | 6 / 5 | statistics.js |
|  | Xác suất thực nghiệm và lí thuyết (`l8xs`) | 7 / 5 | statistics.js |

### Lớp 9 (11 chủ đề, màu hồng đậm)
| Phần | Chủ đề (id) | Dạng bài Cơ bản / Nâng cao | File (js/data/grade9/) |
|---|---|---|---|
| Số và Đại số | Căn bậc hai, căn bậc ba (`l9can`) | 8 / 7 | algebra.js |
|  | Hàm số y = ax² và đồ thị (`l9hsb2`) | 8 / 5 | algebra.js |
|  | Phương trình bậc hai, công thức nghiệm, hệ thức Viète (`l9ptb2`) | 8 / 8 | algebra.js |
|  | Hệ hai phương trình bậc nhất hai ẩn (`l9hpt`) | 7 / 6 | algebra2.js |
|  | Bất phương trình bậc nhất một ẩn (`l9bpt`) | 8 / 5 | algebra2.js |
| Hình học và Đo lường | Hệ thức lượng trong tam giác vuông (`l9htl`) | 9 / 6 | geometry.js |
|  | Đường tròn: vị trí, tiếp tuyến (`l9dt1`) | 8 / 5 | geometry.js |
|  | Góc với đường tròn, tứ giác nội tiếp (`l9dt2`) | 9 / 7 | geometry.js |
|  | Hình trụ, hình nón, hình cầu (`l9kg`) | 9 / 6 | geometry.js |
| Thống kê và Xác suất | Bảng tần số, tần số tương đối, ghép nhóm (`l9tk`) | 8 / 5 | statistics.js |
|  | Xác suất (quy tắc nhân, tổ hợp cơ bản) (`l9xs`) | 8 / 6 | statistics.js |

Tất cả dạng bài dùng bộ dựng ở `js/data/grade8/helpers.js` (`G8H`, dùng chung cho lớp 8 và 9):
- `gn('mã', () => [câu hỏi, tham-số])`: bọc một dạng bài, tự thử lại nếu bốc phải số không hợp lệ (không bao giờ làm sập lượt chơi), nhận cả câu trắc nghiệm lẫn câu nhập đáp án.
- `M(đề, đáp-án, [[sai, lý-do], …], [các bước giải], dễ-nhầm, định-dạng)`: trắc nghiệm 4 đáp án; mỗi đáp án nhiễu là một lỗi hay gặp kèm lý do (hiện trong "Vì sao đáp án em chọn chưa đúng?").
- `Iq(đề, đáp-án, [các bước giải], dễ-nhầm)`: câu học sinh tự nhập đáp án (số, hoặc phân số a/b tối giản).
- `PL`: đại số đa thức nhiều biến (cộng, trừ, nhân, giá trị, in ra chuỗi) dùng cho Đa thức và Hằng đẳng thức.
- Hình SVG: `thales`, `bis` (phân giác), `rt` (tam giác vuông, có đường cao), `pyr` (hình chóp), `bar1`, `bar2` (cột, cột kép), `hist` (biểu đồ tần số tương đối ghép nhóm), `nline` (trục số), cùng `pie`, `lch` của lớp 7.

Viết thêm một dạng mới (ví dụ vào `js/data/grade9/algebra.js`):

    add('l9can',
    gn('can.vi_du', ()=>{ const a=R(2,9), b=R(2,9);
      return [M(`Tính ${a} + ${b}`, a+b, [[a*b,'nhân thay vì cộng'],[Math.abs(a-b),'trừ thay vì cộng'],[a+b+1]],
              [`Cộng hai số: ${a} + ${b} = ${a+b}.`,`Kết quả ${a+b}.`], `Đừng nhân thay vì cộng.`), [a,b]] }));
    // addH('mã-chủ-đề', …) cho mức Nâng cao

### Kiểm chứng tự động lớp 8 và 9 (`kiem-chung/lop8-9/`, không cần đưa lên hosting)
Cần Node 18+. Chạy ở thư mục gốc của project:

    node kiem-chung/lop8-9/verify.js 500              # 500 lần mỗi dạng bài
    MUTATE=1 node kiem-chung/lop8-9/verify.js 500     # thêm thử ngược: đáp án nhiễu phải bị oracle loại
    node kiem-chung/lop8-9/verify.js 500 l9can l8hd   # chỉ vài chủ đề (theo tiền tố mã)
    node kiem-chung/lop8-9/quality.js 1200            # độ đa dạng + lỗi trình bày (dấu trừ, lũy thừa, "1x", …)
    node kiem-chung/lop8-9/ui-test.js                 # chơi thử cả app trong jsdom (cần: npm i jsdom)

- `verify.js` kiểm cấu trúc (đủ 4 đáp án khác nhau, lời giải ≥ 2 bước, không `NaN/undefined`) và so từng đáp án với **oracle độc lập** (`oracles8.js`, `oracles9.js`: vét cạn nghiệm, tính lại bằng công thức khác, bộ phân tích biểu thức riêng trong `expr.js`). Hiện **304/304 dạng đều có oracle, sai đáp án: 0, nhiễu lọt: 0**.
- Thêm dạng mới thì thêm oracle cùng mã (`gn('mã', …)`): hàm nhận `(tham-số, câu-hỏi)` và trả về đáp án đúng (chuỗi) hoặc `true/false`.
- `ui-test.js` nạp `index.html`, chọn lớp 8 và 9, chơi mọi chủ đề ở cả hai mức (đúng lẫn sai, kể cả gõ đáp án kiểu Việt `2,5` và `−3`), làm bài thi thử và thử thách ngày; kiểm tra đáp án đúng được chấm đúng, đáp án sai được chấm sai, không có lỗi chạy.

## Bổ sung lớp 6 theo tài liệu "Chuyên đề học tập Toán 6" (bản bổ sung q10)
File `js/data/grade6/q10-sgk.js`: **56 dạng mới** (39 Cơ bản, 17 Nâng cao) bám 5 chương của tài liệu: tập hợp, số tự nhiên, chia hết, số nguyên, hình phẳng (chu vi, diện tích), tính đối xứng.
Phân bố: Tập hợp (4), Số tự nhiên (9), Lũy thừa (4), Chia hết & nguyên tố (6), Ước & bội (4), ƯCLN – BCNN (8), Số nguyên (8), Chu vi & diện tích (8), Tính đối xứng (5).
Mỗi câu: 3 đáp án nhiễu là lỗi hay gặp (94% có lý do hiện ở "Vì sao đáp án em chọn chưa đúng?"), lời giải từng bước, mục ⚠️ Dễ nhầm.
Kiểm chứng (Node 18+, không cần build): `node kiem-chung/lop6-sgk/verify.js 500` — so từng đáp án với oracle độc lập (vét cạn / tính lại bằng cách khác). Kết quả: 56/56 dạng có oracle, 84.000 lượt thử, sai đáp án 0, nhiễu trùng đáp án đúng 0.
`sw.js` đã đổi lên `thcs-v10` để máy học sinh tải lại bản mới.

## Ghi chú kỹ thuật
- Tên lưu trữ cũ (`t6` trong localStorage, `T6_UI`, `T6_SYNC`) được **giữ nguyên** để học sinh không mất điểm, sao và tiến độ đã đồng bộ.
- `firestore.rules`: `stars` tối đa 300 (đúng bằng 100 khóa tiến độ × 3 sao của cả bốn lớp); `progress` có các trường `dc7`, `dc8`, `dc9` (thử thách ngày của lớp 7, 8, 9; `dc` vẫn là lớp 6) và số khóa `b`, `acc` được nâng lên tối đa 200. **Cần dán lại rules vào Firebase Console** thì tiến độ và thử thách ngày lớp 8, 9 mới đồng bộ được giữa các máy (nếu chưa dán, lớp 6, 7 vẫn chạy bình thường nhưng lần đồng bộ tiến độ vượt 100 khóa sẽ bị từ chối).
- Chọn lớp: lần đầu mở app hiện màn Chọn lớp (`pickGrade` trong `js/app/grade.js`), sau đó đổi lớp bằng banner ở đầu các tab Học, Ôn tập, Thi thử, Thử thách. Giao diện đổi màu theo `body[data-gr]`.
- `sw.js` (`thcs-v5`): danh sách file lưu offline tự đọc từ `index.html`, nên thêm file script mới chỉ cần khai báo trong `index.html`. Các file `.js`/`.css` và trang chính luôn ưu tiên bản mới khi có mạng (quá 6 giây hoặc mất mạng thì dùng bản đã lưu). Muốn ép máy học sinh tải lại toàn bộ thì đổi `V`.
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

## Đổi tên hiển thị (v8)
Tab **Hạng** → thẻ hồ sơ → **✏️ Đổi tên**. Tên vẫn phải không trùng; XP, sao, tiến độ giữ nguyên.
Đổi tên chạy trong một transaction (`FB.rename` ở `js/firebase/firebase.js`): giữ chỗ tên mới, nhả tên cũ, sửa `players/{uid}`.
**Bắt buộc đăng lại `firestore.rules`** (Firebase Console → Firestore → Rules → Publish), vì bản cũ cấm đổi tên và cấm xoá `names/{k}`.
Tab Hạng cũng có thêm nút **Đăng xuất** (trước đây hàm `out()` có nhưng không có nút nào gọi).

## Bổ sung lớp 6 từ "Chuyên đề Toán 6 KNTT, tập 2" (bản bổ sung q11)
File `js/data/grade6/q11-tap2.js`: **173 câu trắc nghiệm cố định** lấy từ phần BÀI TẬP TRẮC NGHIỆM của tài liệu (chương 6 Phân số, 7 Số thập phân, 8 Hình học phẳng, 9 Thống kê – xác suất), giữ nguyên đề và 4 lựa chọn. Tài liệu không kèm đáp án nên mỗi câu được giải lại, thêm **lời giải từng bước** + mục ⚠️ Dễ nhầm.
Phân bố: Phân số 103 (hỗn số, cộng trừ, nhân chia, hai bài toán về phân số), Số thập phân 37, Phần trăm 15, Điểm – đoạn – góc 11, Thống kê – xác suất 7; trong đó 31 câu ở mức Nâng cao (câu khó), còn lại ở mức Cơ bản. Thứ tự bốn đáp án được xáo mỗi lần chơi; câu có hình ô tô màu dùng SVG.
Mã câu `bNNcMM` = Bài NN, Câu MM trong tài liệu. Câu có tử/mẫu chứa chữ hoặc phép tính viết dạng `‹tử|mẫu›` trong file nguồn.
Kiểm chứng: `node kiem-chung/lop6-tap2/verify.js` (Node 18+): kiểm cấu trúc (đủ 4 đáp án khác nhau, có lời giải) và so 144/173 câu với oracle độc lập (phân số chính xác bằng BigInt, vét cạn). Kết quả: sai đáp án 0. Các câu còn lại là câu khái niệm (định nghĩa, cách đọc tên góc, …).
Một lựa chọn trong tài liệu bị trùng (câu 27 bài 23: hai đáp án giống nhau) đã được thay bằng {1; 3}. `sw.js` đã đổi lên `thcs-v11`.
