# Đi Đâu Ăn Gì

Frontend React + TypeScript dùng Google Places API (New) để tìm nhà hàng, quán cà phê và điểm tham quan; Google Maps hiển thị bản đồ và marker tương ứng.

## Cấu hình Google Maps Platform

1. Tạo hoặc chọn một project trong Google Cloud Console, liên kết billing account và bật **Maps JavaScript API** cùng **Places API (New)**.
2. Tạo API key cho website. Hạn chế key theo HTTP referrer (ví dụ `http://localhost:5173/*` khi phát triển và domain website khi publish) và chỉ cho phép hai API kể trên.
3. Sao chép `.env.example` thành `.env.local`, sau đó đặt key vào `VITE_GOOGLE_MAPS_API_KEY`. Không commit `.env.local`.
4. Khởi động lại Vite sau khi sửa biến môi trường.
5. Với website production, tạo Google Map ID trong Cloud Console và đặt `VITE_GOOGLE_MAP_ID` trong `.env.local`. Nếu bỏ trống, bản đồ dùng `DEMO_MAP_ID` để tiện phát triển.

```sh
npm install
npm run dev
```

Vite đưa mọi biến `VITE_*` vào mã chạy ở trình duyệt. Vì vậy khóa này **không phải bí mật**: giới hạn theo domain/API, cấu hình quota và tạo ngân sách/cảnh báo billing trước khi chia sẻ website. Google Maps Platform tính phí theo SKU và mức sử dụng; trường ảnh, giá và giờ mở cửa có thể làm thay đổi SKU. Giá từ Places là mức giá tương đối do Google phân loại, không phải giá món chính xác. Nearby Search trả tối đa 20 kết quả mỗi truy vấn. Ứng dụng không lưu cache nội dung Places.

Google Maps/Places có điều khoản và yêu cầu attribution riêng; nội dung Places trên kết quả được trình bày cùng bản đồ Google Maps. Khi có ảnh, attribution tác giả do API trả về được giữ hiển thị. Trước khi publish, website cần có Terms of Use và Privacy Policy công khai theo yêu cầu của Google Maps Platform.
