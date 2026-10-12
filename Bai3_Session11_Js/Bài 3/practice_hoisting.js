console.log("--- MINH HỌA CƠ CHẾ HOISTING ---");

console.log("1. Gọi Function Declaration (Hàm truyền thống) TRƯỚC KHI định nghĩa:");
console.log("Kết quả:", turnOnLight()); 

function turnOnLight() {
  return "Đèn đã bật!";
}

try {
  console.log("\n2. Gọi Function Expression (Biểu thức hàm) TRƯỚC KHI định nghĩa:");
  turnOffLight();
} catch (error) {
  console.log("-> LỖI BẮT ĐƯỢC: " + error.message);
  console.log("-> Giải thích: Hàm gán vào biến 'const' không được nâng (Hoisting), phải định nghĩa trước mới được gọi.");
}

const turnOffLight = function() {
  return "Đèn đã tắt!";
};

try {
  console.log("\n3. Gọi Arrow Function (Hàm mũi tên) TRƯỚC KHI định nghĩa:");
  setACPower();
} catch (error) {
  console.log("-> LỖI BẮT ĐƯỢC: " + error.message);
  console.log("-> Giải thích: Tương tự như trên, Arrow Function không được nâng.");
}

const setACPower = () => {
  return "Đã chỉnh công suất điều hòa!";
};

console.log("\n--- CHƯƠNG TRÌNH ĐÃ VƯỢT QUA LỖI VÀ KẾT THÚC BÌNH THƯỜNG ---");
