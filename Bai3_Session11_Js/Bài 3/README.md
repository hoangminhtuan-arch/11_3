# Phân tích Trade-off: Các Hình Thức Khai Báo Hàm Trong JavaScript

## 1. Bảng So Sánh Chi Tiết (Trade-off)

| Tiêu chuẩn | Function Declaration (Khai báo hàm truyền thống) | Function Expression (Biểu thức hàm) | Arrow Function (Hàm mũi tên `=>`) |
| :--- | :--- | :--- | :--- |
| **Cơ chế Hoisting** | Được nâng lên đầu phạm vi (có thể gọi hàm trước khi dòng định nghĩa xuất hiện). | Không được nâng (bắt buộc phải định nghĩa xong mới được gọi). | Không được nâng (bắt buộc phải định nghĩa xong mới được gọi). |
| **Cú pháp** | Dài, bắt buộc dùng từ khóa `function`. | Gán hàm vào một biến (vd: `const fn = function() {}`). | Rất ngắn gọn, hỗ trợ trả về ngầm định (implicit return). |
| **Con trỏ `this`** | Động (phụ thuộc vào đối tượng gọi hàm, bị thay đổi theo ngữ cảnh). | Động (phụ thuộc vào đối tượng gọi hàm). | Kế thừa từ ngữ cảnh bao ngoài (Lexical `this`), không tự tạo `this`. |
| **Khuyến nghị chuẩn** | Dùng cho các hàm tiện ích toàn cục (Utility functions). | Dùng khi cần truyền hàm ẩn danh. | **Khuyến nghị chuẩn ES6+** dùng cho hầu hết mọi logic dự án. |

## 2. Minh Họa Cơ Chế Hoisting Bằng Mã Nguồn

Dưới đây là mã nguồn minh họa sự khác biệt khi cố tình gọi hàm trước khi chúng được định nghĩa.

```javascript
// ==========================================
// 1. Function Declaration (Được Hoisting)
// ==========================================
console.log(turnOnLight()); // CHẠY THÀNH CÔNG: Trình duyệt in ra "Đèn đã bật!"

function turnOnLight() {
  return "Đèn đã bật!";
}

// ==========================================
// 2. Function Expression (KHÔNG được Hoisting)
// ==========================================
// console.log(turnOffLight()); // SẼ BÁO LỖI VÀ CHẾT CHƯƠNG TRÌNH: Cannot access 'turnOffLight' before initialization

const turnOffLight = function() {
  return "Đèn đã tắt!";
};

// ==========================================
// 3. Arrow Function (KHÔNG được Hoisting)
// ==========================================
// console.log(setACPower()); // SẼ BÁO LỖI VÀ CHẾT CHƯƠNG TRÌNH: Cannot access 'setACPower' before initialization

const setACPower = () => "Đã chỉnh công suất điều hòa!";
```

## 3. Quy Chuẩn Đề Xuất Cho Dự Án Smart Home IoT

Để đảm bảo mã nguồn trong dự án Smart Home IoT đồng nhất, dễ đọc, dễ bảo trì và hạn chế tối đa các lỗi ngầm, quy chuẩn viết hàm được đề xuất như sau:

1. **Sử dụng Arrow Function (`=>`) làm chuẩn mặc định trên toàn dự án:** 
   - Áp dụng cho >90% các tác vụ trong dự án (CRUD thiết bị, lọc dữ liệu, tính toán, xử lý sự kiện, callback...).
   - *Lý do:* Cú pháp cực kỳ tinh gọn. Nó triệt tiêu hoàn toàn các lỗi sai lệch con trỏ `this` kinh điển khi viết callback xử lý tín hiệu phần cứng IoT. Ngoài ra, việc nó từ chối Hoisting ép buộc đội ngũ lập trình viên phải khai báo biến/hàm theo thứ tự từ trên xuống dưới (định nghĩa xong mới được gọi), tránh mã nguồn trở thành mớ bòng bong (spaghetti code).
2. **Sử dụng Function Declaration cho các Tiện ích Toàn cục (Global Utility / Helper):**
   - Áp dụng cho các hàm Helper đứng độc lập như: hàm parse/định dạng thời gian, hàm xử lý chuỗi dùng chung ở mọi nơi.
   - *Lý do:* Tận dụng cơ chế Hoisting để đẩy/gom nhóm tất cả các khai báo hàm tiện ích lặt vặt xuống dưới cùng của File (hoặc file riêng biệt), nhường không gian ở đầu File cho cấu trúc luồng logic chính của chương trình.
3. **Tuyệt đối tránh sử dụng Function Expression truyền thống:**
   - Trong quá trình phát triển mới theo chuẩn ES6+, thay vì gán hàm `function` vô danh vào biến, ta nên thay thế bằng cú pháp Arrow Function.
