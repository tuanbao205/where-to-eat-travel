# TÀI LIỆU YÊU CẦU HỆ THỐNG (SRS)
## Đi Đâu Ăn Gì – Travel Recommendation & Trip Planning

---

## 1. Tổng quan hệ thống

### 1.1. Tên hệ thống
**Đi Đâu Ăn Gì – Travel Recommendation & Trip Planning**

Website hỗ trợ khách du lịch tìm kiếm địa điểm ăn uống phù hợp và xây dựng lộ trình tham quan dựa trên địa điểm, nhu cầu, ngân sách, khoảng cách, thời gian và kiểu chuyến đi.

---

## 2. Mục đích hệ thống

### 2.1. Mục đích tổng quát
Hệ thống được xây dựng nhằm giải quyết vấn đề: **Người dùng đang ở một địa điểm nhưng không biết ăn gì, đi đâu và nên di chuyển theo lộ trình nào.**

Hệ thống cung cấp 2 nhu cầu chính:

#### Chức năng 1 – Ăn gì gần đây?
Cho phép người dùng:
- Xác định/chọn khu vực đang ở.
- Nhập món ăn hoặc nhu cầu ăn uống.
- Chọn mức giá.
- Chọn phạm vi khoảng cách.
- Tìm kiếm các quán phù hợp.
- Xem thông tin địa điểm.
- Xem vị trí và đường đi.

#### Chức năng 2 – Lên lộ trình
Cho phép người dùng:
- Chọn điểm đến.
- Chọn khoảng thời gian chuyến đi.
- Chọn kiểu chuyến đi theo phạm vi sản phẩm.
- Hệ thống xây dựng lộ trình.
- Sắp xếp các điểm đến.
- Hiển thị thời gian và khoảng cách.
- Hiển thị lộ trình trên bản đồ.

---

## 3. Mục tiêu nghiệp vụ

| Mục tiêu | Mô tả |
| :--- | :--- |
| **M1** | Giúp người dùng nhanh chóng tìm được địa điểm ăn uống phù hợp |
| **M2** | Giảm thời gian tìm kiếm quán ăn/địa điểm |
| **M3** | Đề xuất địa điểm dựa trên nhu cầu thực tế của người dùng |
| **M4** | Giúp người dùng biến danh sách điểm đến thành một lộ trình |
| **M5** | Cung cấp thông tin khoảng cách/thời gian để người dùng dễ quyết định |
| **M6** | Tạo trải nghiệm du lịch đơn giản từ bước tìm kiếm $\rightarrow$ lựa chọn $\rightarrow$ di chuyển |

---

## 4. Actor của hệ thống

### 4.1. Tổng quan Actor & Use Case
| Actor | Nhóm chức năng chính |
| :--- | :--- |
| **Visitor** | Tất cả chức năng nghiệp vụ chính |
| **Location Service** | Lấy vị trí người dùng |
| **Place/Data Provider** | Cung cấp dữ liệu địa điểm |
| **Map/Routing Service** | Bản đồ, khoảng cách, route |
| **System** | Ranking, recommendation, tạo/sắp xếp itinerary |

### 4.2. Chi tiết các actor chính
| Actor ID | Actor | Loại Actor | Vai trò | Chức năng / Quyền chính |
| :--- | :--- | :--- | :--- | :--- |
| **ACT-01** | Khách du lịch / Visitor | Người dùng chính | Sử dụng website để tìm kiếm địa điểm ăn uống, khám phá điểm đến và xây dựng lộ trình du lịch | • Xem trang chủ<br>• Tìm quán ăn<br>• Nhập tiêu chí tìm kiếm<br>• Xem kết quả<br>• Xem thông tin địa điểm<br>• Xem điểm đến<br>• Tạo lộ trình<br>• Xem bản đồ / đường đi |
| **ACT-02** | Map / Location Service | Hệ thống bên ngoài (External System) | Cung cấp dữ liệu vị trí, bản đồ và thông tin phục vụ tính toán lộ trình | • Xác định vị trí<br>• Cung cấp tọa độ<br>• Tính khoảng cách<br>• Tính thời gian di chuyển<br>• Cung cấp route<br>• Hiển thị / cung cấp dữ liệu bản đồ |
| **ACT-03** | Place / Data Provider | Hệ thống bên ngoài (External System) | Cung cấp dữ liệu về quán ăn, địa điểm du lịch và các thông tin liên quan | • Cung cấp danh sách địa điểm<br>• Tên địa điểm, Địa chỉ, Category<br>• Rating, Mức giá, Giờ mở cửa, Hình ảnh |

---

## 5. Cấu trúc hệ thống

```text
ĐI ĐÂU ĂN GÌ
├── 01. Trang chủ
├── 02. Ăn gì
│   ├── Tìm kiếm
│   ├── Bộ lọc
│   ├── Kết quả tìm kiếm
│   └── Chi tiết quán
├── 03. Lộ trình
│   ├── Thiết lập lộ trình
│   ├── Tạo lộ trình
│   └── Kết quả lộ trình
├── 04. Điểm đến
│   ├── Danh sách điểm đến
│   └── Chi tiết điểm đến
└── 05. Bản đồ / Route
    └── Hiển thị đường đi
```

---

## 6. Danh sách các màn hình

| Screen ID | Màn hình | Mục đích |
| :--- | :--- | :--- |
| **SCR-01** | Trang chủ | Entry point của hệ thống |
| **SCR-02** | Tìm quán | Nhập nhu cầu ăn uống |
| **SCR-03** | Kết quả tìm quán | Hiển thị các quán phù hợp |
| **SCR-04** | Chi tiết quán | Xem thông tin quán |
| **SCR-05** | Thiết lập lộ trình | Nhập thông tin chuyến đi |
| **SCR-06** | Kết quả lộ trình | Hiển thị itinerary |
| **SCR-07** | Danh sách điểm đến | Khám phá địa điểm |
| **SCR-08** | Chi tiết điểm đến | Xem thông tin điểm đến |
| **SCR-09** | Bản đồ / Route | Hiển thị vị trí và đường đi |

---

## 7. Danh sách Use Case

### Nhóm A – Homepage
| UC ID | Use Case | Actor |
| :--- | :--- | :--- |
| **UC-01** | Truy cập trang chủ | Visitor |
| **UC-02** | Điều hướng chức năng Ăn gì | Visitor |
| **UC-03** | Điều hướng chức năng Lộ trình | Visitor |
| **UC-04** | Xem danh sách điểm đến | Visitor |
| **UC-05** | Khám phá ngay | Visitor |

### Nhóm B – Tìm kiếm đồ ăn
| UC ID | Use Case | Actor |
| :--- | :--- | :--- |
| **UC-06** | Chọn khu vực tìm kiếm | Visitor |
| **UC-07** | Nhập nhu cầu ăn uống | Visitor |
| **UC-08** | Chọn mức giá | Visitor |
| **UC-09** | Chọn khoảng cách | Visitor |
| **UC-10** | Tìm quán phù hợp | Visitor |
| **UC-11** | Xem danh sách quán | Visitor |
| **UC-12** | Lọc kết quả tìm kiếm | Visitor |
| **UC-13** | Sắp xếp kết quả | Visitor |
| **UC-14** | Xem chi tiết quán | Visitor |
| **UC-15** | Xem vị trí quán trên bản đồ | Visitor |
| **UC-16** | Xem đường đi đến quán | Visitor |

### Nhóm C – Lộ trình
| UC ID | Use Case | Actor |
| :--- | :--- | :--- |
| **UC-17** | Chọn điểm đến | Visitor |
| **UC-18** | Chọn thời gian chuyến đi | Visitor |
| **UC-19** | Chọn kiểu chuyến | Visitor |
| **UC-20** | Tạo lộ trình | Visitor |
| **UC-21** | Tự động sắp xếp điểm đến | System |
| **UC-22** | Tính khoảng cách giữa các điểm | System |
| **UC-23** | Tính thời gian di chuyển | System |
| **UC-24** | Xem lịch trình | Visitor |
| **UC-25** | Xem lộ trình trên bản đồ | Visitor |
| **UC-26** | Xem chi tiết từng chặng | Visitor |

### Nhóm D – Điểm đến
| UC ID | Use Case | Actor |
| :--- | :--- | :--- |
| **UC-27** | Xem danh sách điểm đến | Visitor |
| **UC-28** | Lọc điểm đến theo khu vực | Visitor |
| **UC-29** | Chọn điểm đến | Visitor |
| **UC-30** | Xem chi tiết điểm đến | Visitor |
| **UC-31** | Từ điểm đến tạo lộ trình | Visitor |

### Nhóm E – Location / Map
| UC ID | Use Case | Actor |
| :--- | :--- | :--- |
| **UC-32** | Xác định vị trí hiện tại | Visitor, Location Service |
| **UC-33** | Chọn vị trí thủ công | Visitor |
| **UC-34** | Hiển thị vị trí trên bản đồ | System, Map Service |
| **UC-35** | Tính khoảng cách | System, Map Service |
| **UC-36** | Tính route | System, Map Service |
| **UC-37** | Hiển thị route | System, Map Service |

---

## 8. Đặc tả Use Case

---

### A. NHÓM HOMEPAGE

#### UC-01: Truy cập trang chủ
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-01 |
| **Tên Use Case** | Truy cập trang chủ |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép người dùng truy cập website và xem các chức năng chính của hệ thống. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | Người dùng truy cập URL của website. |
| **Tiền điều kiện** | Website đang hoạt động và có thể truy cập. |
| **Hậu điều kiện** | Trang chủ được hiển thị đầy đủ. |
| **Luồng chính** | 1. User truy cập website<br>2. System tải trang chủ<br>3. Hiển thị Header<br>4. Hiển thị Hero<br>5. Hiển thị 2 chế độ: "Ăn gì" & "Lộ trình"<br>6. Hiển thị các điểm đến<br>7. Hiển thị Footer |
| **Luồng thay thế** | Nếu user truy cập từ một link chức năng cụ thể, system có thể điều hướng trực tiếp tới màn hình tương ứng. |
| **Luồng ngoại lệ** | Website không thể tải $\rightarrow$ hiển thị lỗi;<br>API dữ liệu lỗi $\rightarrow$ hiển thị nội dung mặc định/placeholder. |
| **Quy tắc nghiệp vụ** | - Trang chủ phải có khả năng truy cập mà không yêu cầu đăng nhập.<br>- Các chức năng chính phải có điểm truy cập rõ ràng. |

#### UC-02: Điều hướng chức năng Ăn gì
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-02 |
| **Tên Use Case** | Điều hướng chức năng Ăn gì |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép người dùng chuyển tới chức năng tìm quán ăn. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User click menu "Ăn gì" hoặc tab "Ăn gì gần đây?". |
| **Tiền điều kiện** | User đang ở website. |
| **Hậu điều kiện** | Màn hình tìm quán được hiển thị. |
| **Luồng chính** | 1. User click "Ăn gì"<br>2. System xác định route<br>3. Chuyển tới màn hình tìm quán<br>4. Hiển thị các tiêu chí tìm kiếm. |
| **Luồng thay thế** | User click CTA "Tìm quán" từ Homepage $\rightarrow$ đi tới cùng màn hình. |
| **Luồng ngoại lệ** | Route không tồn tại $\rightarrow$ hiển thị trang lỗi/404. |
| **Quy tắc nghiệp vụ** | Không yêu cầu đăng nhập để sử dụng chức năng tìm quán. |

#### UC-03: Điều hướng chức năng Lộ trình
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-03 |
| **Tên Use Case** | Điều hướng chức năng Lộ trình |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép người dùng truy cập chức năng xây dựng lộ trình. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User click "Lộ trình" hoặc tab "Lên lộ trình". |
| **Tiền điều kiện** | User đang ở website. |
| **Hậu điều kiện** | Màn hình thiết lập lộ trình được hiển thị. |
| **Luồng chính** | 1. User click "Lộ trình"<br>2. System chuyển tới màn hình thiết lập<br>3. Hiển thị các trường điểm đến, thời gian và kiểu chuyến. |
| **Luồng thay thế** | User đi từ một điểm đến cụ thể $\rightarrow$ system có thể pre-fill điểm đến. |
| **Luồng ngoại lệ** | Không thể tải màn hình $\rightarrow$ hiển thị lỗi. |
| **Quy tắc nghiệp vụ** | Không yêu cầu đăng nhập ở phạm vi prototype hiện tại. |

#### UC-04: Xem danh sách điểm đến
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-04 |
| **Tên Use Case** | Xem danh sách điểm đến |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép người dùng khám phá các điểm đến được hệ thống giới thiệu. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User click "Điểm đến" hoặc khu vực điểm đến trên Homepage. |
| **Tiền điều kiện** | Có dữ liệu điểm đến. |
| **Hậu điều kiện** | Danh sách điểm đến được hiển thị. |
| **Luồng chính** | 1. User mở "Điểm đến"<br>2. System lấy dữ liệu<br>3. Hiển thị danh sách<br>4. User có thể chọn một điểm đến. |
| **Luồng thay thế** | Dữ liệu được cache $\rightarrow$ hiển thị dữ liệu cache. |
| **Luồng ngoại lệ** | Không có dữ liệu $\rightarrow$ Empty State. |
| **Quy tắc nghiệp vụ** | Chỉ hiển thị các điểm đến được cấu hình/được phép hiển thị. |

#### UC-05: Khám phá ngay
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-05 |
| **Tên Use Case** | Khám phá ngay |
| **Tác nhân** | Visitor |
| **Mô tả** | Điểm vào nhanh giúp người dùng bắt đầu trải nghiệm khám phá. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User click "Khám phá ngay". |
| **Tiền điều kiện** | User đang ở Homepage. |
| **Hậu điều kiện** | User được đưa tới chức năng khám phá phù hợp. |
| **Luồng chính** | 1. User click CTA<br>2. System xác định flow<br>3. Chuyển tới màn hình khám phá/tìm kiếm. |
| **Luồng thay thế** | System hiển thị lựa chọn "Ăn gì" / "Lên lộ trình" nếu chưa xác định nhu cầu. |
| **Luồng ngoại lệ** | Không xác định được route $\rightarrow$ hiển thị lỗi. |
| **Quy tắc nghiệp vụ** | TBD: Khách hàng cần xác nhận CTA này dẫn trực tiếp tới Ăn gì, Lộ trình hay màn hình lựa chọn. |

---

### B. NHÓM TÌM KIẾM ĐỒ ĂN

#### UC-06: Chọn khu vực tìm kiếm
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-06 |
| **Tên Use Case** | Chọn khu vực tìm kiếm |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép người dùng xác định khu vực muốn tìm quán. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User mở chức năng Ăn gì. |
| **Tiền điều kiện** | Có danh sách khu vực hoặc cơ chế chọn vị trí. |
| **Hậu điều kiện** | Khu vực được lưu vào tiêu chí tìm kiếm. |
| **Luồng chính** | 1. User mở trường khu vực<br>2. System hiển thị khu vực<br>3. User chọn<br>4. System cập nhật khu vực. |
| **Luồng thay thế** | User chọn vị trí hiện tại nếu hệ thống hỗ trợ GPS. |
| **Luồng ngoại lệ** | Không xác định được vị trí $\rightarrow$ cho phép chọn thủ công. |
| **Quy tắc nghiệp vụ** | Một phiên tìm kiếm phải có khu vực/điểm tham chiếu để thực hiện tìm kiếm địa điểm. |

#### UC-07: Nhập nhu cầu ăn uống
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-07 |
| **Tên Use Case** | Nhập nhu cầu ăn uống |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user nhập món ăn hoặc nhu cầu muốn tìm. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User focus vào trường tìm kiếm món ăn. |
| **Tiền điều kiện** | Màn hình tìm kiếm được mở. |
| **Hậu điều kiện** | Từ khóa được ghi nhận. |
| **Luồng chính** | 1. User nhập từ khóa<br>2. System nhận dữ liệu<br>3. Chuẩn hóa từ khóa<br>4. Lưu vào search criteria. |
| **Luồng thay thế** | User chọn suggestion/category có sẵn. |
| **Luồng ngoại lệ** | Nhập ký tự không hợp lệ $\rightarrow$ yêu cầu nhập lại. |
| **Quy tắc nghiệp vụ** | Khi người dùng không nhập gì hệ thống tự động đề xuất tất cả các món theo các trường còn lại. |

#### UC-08: Chọn mức giá
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-08 |
| **Tên Use Case** | Chọn mức giá |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user xác định khoảng ngân sách cho việc ăn uống. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User mở bộ lọc mức giá. |
| **Tiền điều kiện** | Có cấu hình khoảng giá. |
| **Hậu điều kiện** | Mức giá được chọn và dùng cho tìm kiếm. |
| **Luồng chính** | 1. User điền mức giá từ $\rightarrow$ đến<br>2. System lưu lựa chọn. |
| **Luồng thay thế** | User giữ mặc định "Mọi mức giá". |
| **Luồng ngoại lệ** | Không có cấu hình giá $\rightarrow$ sử dụng Mọi mức giá. |
| **Quy tắc nghiệp vụ** | $\text{Mức giá từ} \le \text{Mức giá đến}$. |

#### UC-09: Chọn khoảng cách
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-09 |
| **Tên Use Case** | Chọn khoảng cách |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user giới hạn phạm vi tìm kiếm địa điểm. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User mở bộ lọc khoảng cách. |
| **Tiền điều kiện** | Đã có khu vực/vị trí tham chiếu. |
| **Hậu điều kiện** | Khoảng cách được lưu. |
| **Luồng chính** | 1. User mở khoảng cách<br>2. Chọn bán kính<br>3. System lưu giá trị<br>4. Dùng làm điều kiện tìm kiếm. |
| **Luồng thay thế** | User sử dụng giá trị mặc định. |
| **Luồng ngoại lệ** | Không xác định được vị trí $\rightarrow$ yêu cầu chọn khu vực thủ công. |
| **Quy tắc nghiệp vụ** | Khoảng cách được tính dựa trên điểm tham chiếu đã chọn. |

#### UC-10: Tìm quán phù hợp
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-10 |
| **Tên Use Case** | Tìm quán phù hợp |
| **Tác nhân** | Visitor |
| **Mô tả** | Tìm và đề xuất các quán đáp ứng tiêu chí người dùng. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User click "Tìm quán phù hợp". |
| **Tiền điều kiện** | Có đủ thông tin tối thiểu để tìm kiếm. |
| **Hậu điều kiện** | Danh sách quán phù hợp được trả về hoặc Empty State. |
| **Luồng chính** | 1. User nhập tiêu chí<br>2. Click tìm<br>3. System validate<br>4. Query dữ liệu<br>5. Lọc theo tiêu chí<br>6. Ranking<br>7. Hiển thị kết quả. |
| **Luồng thay thế** | User chỉ nhập một số tiêu chí $\rightarrow$ system tìm theo các tiêu chí đã nhập và default còn lại. |
| **Luồng ngoại lệ** | API lỗi/timeout $\rightarrow$ hiển thị thông báo và cho phép thử lại. |
| **Quy tắc nghiệp vụ** | Kết quả phải đáp ứng các tiêu chí tìm kiếm. Logic ranking TBD. |

#### UC-11: Xem danh sách quán
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-11 |
| **Tên Use Case** | Xem danh sách quán |
| **Tác nhân** | Visitor |
| **Mô tả** | Hiển thị các địa điểm ăn uống phù hợp với tiêu chí tìm kiếm. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | UC-10 trả về kết quả. |
| **Tiền điều kiện** | Có dữ liệu kết quả. |
| **Hậu điều kiện** | User xem được danh sách quán. |
| **Luồng chính** | 1. System nhận kết quả $\rightarrow$<br>2. Hiển thị card quán $\rightarrow$<br>3. Hiển thị thông tin tóm tắt $\rightarrow$<br>4. User chọn quán. |
| **Luồng thay thế** | Load thêm kết quả khi user scroll. |
| **Luồng ngoại lệ** | Không có kết quả $\rightarrow$ hiển thị Empty State. |
| **Quy tắc nghiệp vụ** | Thông tin tối thiểu nên gồm tên, vị trí, khoảng cách, rating và mức giá nếu dữ liệu có sẵn. |

#### UC-12: Lọc kết quả tìm kiếm
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-12 |
| **Tên Use Case** | Lọc kết quả tìm kiếm |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user thu hẹp danh sách kết quả sau khi tìm kiếm. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User thay đổi filter. |
| **Tiền điều kiện** | Đã có kết quả tìm kiếm. |
| **Hậu điều kiện** | Danh sách được cập nhật theo filter. |
| **Luồng chính** | 1. User mở filter $\rightarrow$<br>2. Chọn tiêu chí $\rightarrow$<br>3. Apply $\rightarrow$<br>4. System lọc $\rightarrow$<br>5. Hiển thị kết quả mới. |
| **Luồng thay thế** | User reset filter $\rightarrow$ quay về kết quả ban đầu. |
| **Luồng ngoại lệ** | Không còn kết quả $\rightarrow$ Empty State + đề xuất nới điều kiện. |
| **Quy tắc nghiệp vụ** | Filter phải áp dụng đồng thời với search criteria hiện tại. |

#### UC-13: Sắp xếp kết quả
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-13 |
| **Tên Use Case** | Sắp xếp kết quả |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user thay đổi thứ tự hiển thị danh sách quán. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User chọn phương thức sort. |
| **Tiền điều kiện** | Có danh sách kết quả. |
| **Hậu điều kiện** | Danh sách được sắp xếp lại. |
| **Luồng chính** | 1. User mở Sort $\rightarrow$<br>2. Chọn tiêu chí $\rightarrow$<br>3. System sort $\rightarrow$<br>4. Hiển thị lại danh sách. |
| **Luồng thay thế** | User giữ sort mặc định. |
| **Luồng ngoại lệ** | Dữ liệu thiếu trường sort $\rightarrow$ bỏ qua bản ghi hoặc áp dụng fallback. |
| **Quy tắc nghiệp vụ** | Các tiêu chí sort cần xác nhận: gần nhất, rating cao nhất, giá thấp nhất, phù hợp nhất. |

#### UC-14: Xem chi tiết quán
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-14 |
| **Tên Use Case** | Xem chi tiết quán |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user xem thông tin đầy đủ của một quán. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User click vào quán. |
| **Tiền điều kiện** | Quán tồn tại trong hệ thống. |
| **Hậu điều kiện** | Chi tiết quán được hiển thị. |
| **Luồng chính** | 1. User chọn quán $\rightarrow$<br>2. System lấy dữ liệu $\rightarrow$<br>3. Hiển thị tên, ảnh, địa chỉ, giá, rating, giờ mở cửa... $\rightarrow$<br>4. User có thể xem route. |
| **Luồng thay thế** | Một số dữ liệu không có $\rightarrow$ ẩn trường hoặc hiển thị "Chưa cập nhật". |
| **Luồng ngoại lệ** | Quán không tồn tại $\rightarrow$ 404/Not Found. |
| **Quy tắc nghiệp vụ** | Chỉ hiển thị dữ liệu hợp lệ từ nguồn dữ liệu được cấu hình. |

#### UC-15: Xem vị trí quán trên bản đồ
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-15 |
| **Tên Use Case** | Xem vị trí quán trên bản đồ |
| **Tác nhân** | Visitor, Map Service |
| **Mô tả** | Hiển thị vị trí quán trên bản đồ. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User chọn xem bản đồ. |
| **Tiền điều kiện** | Quán có tọa độ hợp lệ. |
| **Hậu điều kiện** | Vị trí quán được hiển thị trên bản đồ. |
| **Luồng chính** | 1. User click bản đồ $\rightarrow$<br>2. System lấy tọa độ $\rightarrow$<br>3. Gọi Map Service $\rightarrow$<br>4. Hiển thị marker. |
| **Luồng thay thế** | User chưa có vị trí $\rightarrow$ chỉ hiển thị marker quán. |
| **Luồng ngoại lệ** | Map Service lỗi $\rightarrow$ hiển thị địa chỉ dạng text. |
| **Quy tắc nghiệp vụ** | Tọa độ phải hợp lệ trước khi render marker. |

#### UC-16: Xem đường đi đến quán
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-16 |
| **Tên Use Case** | Xem đường đi đến quán |
| **Tác nhân** | Visitor, Map/Routing Service |
| **Mô tả** | Tính và hiển thị route từ vị trí xuất phát đến quán. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User click "Chỉ đường" / "Xem đường đi". |
| **Tiền điều kiện** | Có origin và destination hợp lệ. |
| **Hậu điều kiện** | Route, khoảng cách và thời gian được hiển thị. |
| **Luồng chính** | 1. User yêu cầu route $\rightarrow$<br>2. System lấy origin $\rightarrow$<br>3. Destination = quán $\rightarrow$<br>4. Gọi Routing Service $\rightarrow$<br>5. Nhận route $\rightarrow$<br>6. Hiển thị map. |
| **Luồng thay thế** | User nhập origin thủ công. |
| **Luồng ngoại lệ** | Không tìm được route $\rightarrow$ thông báo không thể tính đường đi. |
| **Quy tắc nghiệp vụ** | Origin/destination phải có tọa độ hợp lệ. Phương tiện di chuyển TBD. |

---

### C. NHÓM LỘ TRÌNH

#### UC-17: Chọn điểm đến
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-17 |
| **Tên Use Case** | Chọn điểm đến |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user lựa chọn địa điểm muốn đưa vào chuyến đi. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User mở chức năng Lộ trình. |
| **Tiền điều kiện** | Có dữ liệu điểm đến. |
| **Hậu điều kiện** | Điểm đến được thêm vào kế hoạch. |
| **Luồng chính** | 1. User tìm/chọn điểm $\rightarrow$<br>2. System hiển thị thông tin $\rightarrow$<br>3. User xác nhận $\rightarrow$<br>4. Điểm đến được thêm vào itinerary. |
| **Luồng thay thế** | User chọn nhiều điểm. |
| **Luồng ngoại lệ** | Điểm đến không tồn tại $\rightarrow$ thông báo lỗi. |
| **Quy tắc nghiệp vụ** | Số lượng điểm tối đa TBD. |

#### UC-18: Chọn thời gian chuyến đi
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-18 |
| **Tên Use Case** | Chọn thời gian chuyến đi |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user xác định khoảng thời gian dành cho chuyến đi. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User thiết lập lộ trình. |
| **Tiền điều kiện** | Màn hình lộ trình đang mở. |
| **Hậu điều kiện** | Thời gian chuyến đi được ghi nhận. |
| **Luồng chính** | 1. User nhập/chọn thời gian $\rightarrow$<br>2. System validate $\rightarrow$<br>3. Lưu thời gian $\rightarrow$<br>4. Dùng làm input tạo itinerary. |
| **Luồng thay thế** | User chọn preset 1 ngày/2 ngày/... |
| **Luồng ngoại lệ** | Thời gian không hợp lệ $\rightarrow$ yêu cầu nhập lại. |
| **Quy tắc nghiệp vụ** | Không cho phép thời gian kết thúc trước thời gian bắt đầu. |

#### UC-19: Chọn kiểu chuyến
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-19 |
| **Tên Use Case** | Chọn kiểu chuyến |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user xác định loại hình/chế độ chuyến đi để hệ thống tạo lộ trình phù hợp. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User thiết lập lộ trình. |
| **Tiền điều kiện** | Có danh sách kiểu chuyến được cấu hình. |
| **Hậu điều kiện** | Kiểu chuyến được lưu. |
| **Luồng chính** | 1. User mở kiểu chuyến $\rightarrow$<br>2. System hiển thị options $\rightarrow$<br>3. User chọn $\rightarrow$<br>4. System lưu lựa chọn. |
| **Luồng thay thế** | User bỏ qua $\rightarrow$ system dùng default. |
| **Luồng ngoại lệ** | Không có kiểu chuyến $\rightarrow$ sử dụng cấu hình mặc định. |
| **Quy tắc nghiệp vụ** | TBD: Cần khách hàng định nghĩa "kiểu chuyến" gồm những loại nào và ảnh hưởng thế nào đến itinerary. |

#### UC-20: Tạo lộ trình
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-20 |
| **Tên Use Case** | Tạo lộ trình |
| **Tác nhân** | Visitor |
| **Mô tả** | Tạo itinerary dựa trên điểm đến, thời gian và các tiêu chí chuyến đi. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User click "Tạo lộ trình". |
| **Tiền điều kiện** | Có điểm đến và thời gian hợp lệ. |
| **Hậu điều kiện** | Một itinerary được tạo hoặc thông báo không thể tạo. |
| **Luồng chính** | 1. User nhập dữ liệu $\rightarrow$<br>2. Click tạo $\rightarrow$<br>3. System validate $\rightarrow$<br>4. Xác định các điểm $\rightarrow$<br>5. Tính khoảng cách/thời gian $\rightarrow$<br>6. Sắp xếp $\rightarrow$<br>7. Tạo itinerary $\rightarrow$<br>8. Hiển thị kết quả. |
| **Luồng thay thế** | User chỉ chọn một điểm $\rightarrow$ tạo route đơn điểm. |
| **Luồng ngoại lệ** | Không đủ thời gian/không thể tạo route $\rightarrow$ thông báo và đề xuất điều chỉnh. |
| **Quy tắc nghiệp vụ** | Itinerary phải nằm trong thời gian user cung cấp; thuật toán tối ưu TBD. |

#### UC-21: Tự động sắp xếp điểm đến
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-21 |
| **Tên Use Case** | Tự động sắp xếp điểm đến |
| **Tác nhân** | System |
| **Mô tả** | Xác định thứ tự phù hợp của các điểm đến trong itinerary. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | UC-20 được thực hiện với từ 2 điểm trở lên. |
| **Tiền điều kiện** | Các điểm có tọa độ hợp lệ. |
| **Hậu điều kiện** | Danh sách điểm được sắp xếp theo logic hệ thống. |
| **Luồng chính** | 1. Nhận danh sách điểm $\rightarrow$<br>2. Lấy tọa độ $\rightarrow$<br>3. Tính khoảng cách $\rightarrow$<br>4. Đánh giá thứ tự $\rightarrow$<br>5. Trả về thứ tự tối ưu. |
| **Luồng thay thế** | User được phép tự sắp xếp nếu tính năng được hỗ trợ. |
| **Luồng ngoại lệ** | Thiếu tọa độ $\rightarrow$ không thể tối ưu điểm đó. |
| **Quy tắc nghiệp vụ** | Tiêu chí tối ưu TBD: khoảng cách, thời gian, giờ mở cửa, thời gian lưu trú... |

#### UC-22: Tính khoảng cách giữa các điểm
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-22 |
| **Tên Use Case** | Tính khoảng cách giữa các điểm |
| **Tác nhân** | System, Map/Routing Service |
| **Mô tả** | Xác định khoảng cách giữa các điểm trong itinerary. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | Hệ thống tạo hoặc cập nhật itinerary. |
| **Tiền điều kiện** | Có tọa độ origin/destination. |
| **Hậu điều kiện** | Khoảng cách được trả về. |
| **Luồng chính** | 1. System gửi tọa độ $\rightarrow$<br>2. Routing Service tính $\rightarrow$<br>3. Trả khoảng cách $\rightarrow$<br>4. System lưu kết quả. |
| **Luồng thay thế** | Sử dụng dữ liệu khoảng cách đã cache nếu còn hợp lệ. |
| **Luồng ngoại lệ** | API lỗi $\rightarrow$ retry; vẫn lỗi $\rightarrow$ không hiển thị khoảng cách. |
| **Quy tắc nghiệp vụ** | Đơn vị khoảng cách cần thống nhất, ví dụ km/m. |

#### UC-23: Tính thời gian di chuyển
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-23 |
| **Tên Use Case** | Tính thời gian di chuyển |
| **Tác nhân** | System, Map/Routing Service |
| **Mô tả** | Xác định thời gian dự kiến giữa các điểm. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | Hệ thống đã xác định route. |
| **Tiền điều kiện** | Có origin, destination và phương tiện hợp lệ. |
| **Hậu điều kiện** | Duration được trả về. |
| **Luồng chính** | 1. System gửi request $\rightarrow$<br>2. Routing Service tính $\rightarrow$<br>3. Trả duration $\rightarrow$<br>4. System đưa vào itinerary. |
| **Luồng thay thế** | Dùng duration mặc định nếu không có dữ liệu realtime. |
| **Luồng ngoại lệ** | API timeout $\rightarrow$ retry/fallback. |
| **Quy tắc nghiệp vụ** | Cách tính traffic/realtime TBD. |

#### UC-24: Xem lịch trình
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-24 |
| **Tên Use Case** | Xem lịch trình |
| **Tác nhân** | Visitor |
| **Mô tả** | Hiển thị itinerary đã được hệ thống tạo. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | UC-20 tạo lộ trình thành công. |
| **Tiền điều kiện** | Có itinerary hợp lệ. |
| **Hậu điều kiện** | User xem được toàn bộ lịch trình. |
| **Luồng chính** | 1. System trả itinerary $\rightarrow$<br>2. Hiển thị theo timeline $\rightarrow$<br>3. Hiển thị từng điểm $\rightarrow$<br>4. Hiển thị thời gian/khoảng cách $\rightarrow$<br>5. User chọn từng chặng để xem chi tiết. |
| **Luồng thay thế** | User chuyển giữa các ngày nếu itinerary nhiều ngày. |
| **Luồng ngoại lệ** | Dữ liệu itinerary thiếu $\rightarrow$ hiển thị lỗi. |
| **Quy tắc nghiệp vụ** | Lịch trình phải thể hiện đúng thứ tự các điểm đã được xác định. |

#### UC-25: Xem lộ trình trên bản đồ
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-25 |
| **Tên Use Case** | Xem lộ trình trên bản đồ |
| **Tác nhân** | Visitor, Map Service |
| **Mô tả** | Hiển thị toàn bộ itinerary dưới dạng route trên bản đồ. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User mở chế độ bản đồ. |
| **Tiền điều kiện** | Có itinerary và tọa độ. |
| **Hậu điều kiện** | Map hiển thị các điểm và route. |
| **Luồng chính** | 1. System lấy danh sách tọa độ $\rightarrow$<br>2. Gọi Map/Routing Service $\rightarrow$<br>3. Nhận route $\rightarrow$<br>4. Hiển thị marker $\rightarrow$<br>5. Nối route giữa các điểm. |
| **Luồng thay thế** | Chỉ hiển thị marker nếu route không khả dụng. |
| **Luồng ngoại lệ** | Map API lỗi $\rightarrow$ hiển thị itinerary dạng danh sách. |
| **Quy tắc nghiệp vụ** | Thứ tự marker phải tương ứng với thứ tự itinerary. |

#### UC-26: Xem chi tiết từng chặng
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-26 |
| **Tên Use Case** | Xem chi tiết từng chặng |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user xem thông tin chi tiết của từng đoạn di chuyển. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User click vào một chặng. |
| **Tiền điều kiện** | Itinerary đã được tạo. |
| **Hậu điều kiện** | Chi tiết chặng được hiển thị. |
| **Luồng chính** | 1. User chọn chặng $\rightarrow$<br>2. System lấy origin/destination $\rightarrow$<br>3. Hiển thị khoảng cách $\rightarrow$<br>4. Hiển thị thời gian $\rightarrow$<br>5. Hiển thị phương tiện/route. |
| **Luồng thay thế** | User xem route trực tiếp trên map. |
| **Luồng ngoại lệ** | Không có dữ liệu route $\rightarrow$ hiển thị thông báo. |
| **Quy tắc nghiệp vụ** | Chi tiết chặng phải nhất quán với itinerary. |

---

### D. NHÓM ĐIỂM ĐẾN

#### UC-27: Xem danh sách điểm đến
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-27 |
| **Tên Use Case** | Xem danh sách điểm đến |
| **Tác nhân** | Visitor |
| **Mô tả** | Hiển thị danh sách các điểm đến mà hệ thống cung cấp. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User truy cập Điểm đến. |
| **Tiền điều kiện** | Có dữ liệu điểm đến. |
| **Hậu điều kiện** | Danh sách được hiển thị. |
| **Luồng chính** | 1. User mở Điểm đến $\rightarrow$<br>2. System tải dữ liệu $\rightarrow$<br>3. Hiển thị card $\rightarrow$<br>4. User chọn điểm. |
| **Luồng thay thế** | User lọc theo khu vực. |
| **Luồng ngoại lệ** | Không có dữ liệu $\rightarrow$ Empty State. |
| **Quy tắc nghiệp vụ** | Chỉ hiển thị điểm đến đang active/published. |

#### UC-28: Lọc điểm đến theo khu vực
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-28 |
| **Tên Use Case** | Lọc điểm đến theo khu vực |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user lọc điểm đến theo khu vực địa lý. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User chọn khu vực/tag. |
| **Tiền điều kiện** | Có danh sách điểm đến. |
| **Hậu điều kiện** | Chỉ các điểm phù hợp được hiển thị. |
| **Luồng chính** | 1. User chọn khu vực $\rightarrow$<br>2. System filter $\rightarrow$<br>3. Hiển thị kết quả. |
| **Luồng thay thế** | Chọn "Tất cả". |
| **Luồng ngoại lệ** | Không có điểm phù hợp $\rightarrow$ Empty State. |
| **Quy tắc nghiệp vụ** | Một điểm đến phải được gắn ít nhất một khu vực hợp lệ. |

#### UC-29: Chọn điểm đến
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-29 |
| **Tên Use Case** | Chọn điểm đến |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user chọn một điểm đến để xem thêm thông tin hoặc tạo lộ trình. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User click card điểm đến. |
| **Tiền điều kiện** | Điểm đến tồn tại. |
| **Hậu điều kiện** | Chi tiết điểm đến được mở. |
| **Luồng chính** | 1. User click điểm $\rightarrow$<br>2. System lấy $\text{ID} \rightarrow$<br>3. Load detail $\rightarrow$<br>4. Hiển thị. |
| **Luồng thay thế** | User click CTA tạo lộ trình $\rightarrow$ chuyển trực tiếp UC-31. |
| **Luồng ngoại lệ** | Điểm không tồn tại $\rightarrow$ 404. |
| **Quy tắc nghiệp vụ** | ID điểm đến phải tồn tại và đang active. |

#### UC-30: Xem chi tiết điểm đến
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-30 |
| **Tên Use Case** | Xem chi tiết điểm đến |
| **Tác nhân** | Visitor |
| **Mô tả** | Hiển thị thông tin chi tiết của một điểm đến. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User chọn điểm đến. |
| **Tiền điều kiện** | Có dữ liệu điểm đến. |
| **Hậu điều kiện** | Detail được hiển thị. |
| **Luồng chính** | 1. Load detail $\rightarrow$<br>2. Hiển thị ảnh $\rightarrow$<br>3. Tên $\rightarrow$<br>4. Mô tả $\rightarrow$<br>5. Khu vực $\rightarrow$<br>6. Thông tin liên quan $\rightarrow$<br>7. CTA Lên lộ trình. |
| **Luồng thay thế** | Thiếu một số thông tin $\rightarrow$ hiển thị phần còn lại. |
| **Luồng ngoại lệ** | Không tìm thấy $\rightarrow$ 404. |
| **Quy tắc nghiệp vụ** | Nội dung phải lấy từ dữ liệu điểm đến đã được publish. |

#### UC-31: Từ điểm đến tạo lộ trình
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-31 |
| **Tên Use Case** | Từ điểm đến tạo lộ trình |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user sử dụng một điểm đến đã chọn làm đầu vào cho việc tạo itinerary. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | User click "Lên lộ trình" tại điểm đến. |
| **Tiền điều kiện** | Điểm đến tồn tại. |
| **Hậu điều kiện** | Màn hình tạo lộ trình được mở với điểm đến được pre-fill. |
| **Luồng chính** | 1. User chọn điểm đến $\rightarrow$<br>2. Click "Lên lộ trình" $\rightarrow$<br>3. System truyền destination $\rightarrow$<br>4. Mở màn hình itinerary $\rightarrow$<br>5. User nhập thời gian/kiểu chuyến $\rightarrow$<br>6. Tạo route. |
| **Luồng thay thế** | User thêm các điểm khác trước khi tạo. |
| **Luồng ngoại lệ** | Điểm đến không còn active $\rightarrow$ thông báo. |
| **Quy tắc nghiệp vụ** | Điểm được chọn phải là điểm đến hợp lệ trong hệ thống. |

---

### E. NHÓM LOCATION / MAP

> **Lưu ý BA:** UC-32 đến UC-37 về bản chất là các supporting/system use case, thường được gọi bên trong các UC nghiệp vụ như UC-10, UC-16, UC-20, UC-25. Không nhất thiết phải có màn hình riêng cho từng UC.

#### UC-32: Xác định vị trí hiện tại
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-32 |
| **Tên Use Case** | Xác định vị trí hiện tại |
| **Tác nhân** | Visitor, Location Service |
| **Mô tả** | Xác định vị trí hiện tại của người dùng để phục vụ tìm kiếm và route. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User chọn sử dụng vị trí hiện tại. |
| **Tiền điều kiện** | Trình duyệt hỗ trợ Geolocation và user cấp quyền nếu cần. |
| **Hậu điều kiện** | System nhận latitude/longitude. |
| **Luồng chính** | 1. User chọn vị trí hiện tại $\rightarrow$<br>2. Browser yêu cầu quyền $\rightarrow$<br>3. User cho phép $\rightarrow$<br>4. Location Service trả tọa độ $\rightarrow$<br>5. System lưu tọa độ tạm thời. |
| **Luồng thay thế** | User từ chối GPS $\rightarrow$ chuyển UC-33. |
| **Luồng ngoại lệ** | GPS timeout/không xác định được $\rightarrow$ yêu cầu chọn vị trí thủ công. |
| **Quy tắc nghiệp vụ** | Không được chặn toàn bộ chức năng nếu GPS không khả dụng; phải có phương án nhập/chọn vị trí khác. |

#### UC-33: Chọn vị trí thủ công
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-33 |
| **Tên Use Case** | Chọn vị trí thủ công |
| **Tác nhân** | Visitor |
| **Mô tả** | Cho phép user nhập/chọn vị trí thay vì sử dụng GPS. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User chọn nhập vị trí thủ công. |
| **Tiền điều kiện** | Có giao diện nhập/chọn location. |
| **Hậu điều kiện** | Vị trí được xác định và sử dụng làm origin. |
| **Luồng chính** | 1. User nhập địa điểm $\rightarrow$<br>2. System search địa điểm $\rightarrow$<br>3. User chọn kết quả $\rightarrow$<br>4. System lấy tọa độ $\rightarrow$<br>5. Lưu origin. |
| **Luồng thay thế** | User chọn trực tiếp trên map. |
| **Luồng ngoại lệ** | Không tìm thấy địa điểm $\rightarrow$ yêu cầu nhập lại. |
| **Quy tắc nghiệp vụ** | Vị trí cuối cùng phải được chuyển đổi thành tọa độ hợp lệ trước khi dùng cho route. |

#### UC-34: Hiển thị vị trí trên bản đồ
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-34 |
| **Tên Use Case** | Hiển thị vị trí trên bản đồ |
| **Tác nhân** | System, Map Service |
| **Mô tả** | Hiển thị vị trí người dùng/địa điểm trên bản đồ. |
| **Mức độ ưu tiên** | P1 |
| **Điều kiện kích hoạt** | System có tọa độ cần hiển thị. |
| **Tiền điều kiện** | Có tọa độ hợp lệ và Map Service khả dụng. |
| **Hậu điều kiện** | Marker được hiển thị. |
| **Luồng chính** | 1. System gửi tọa độ $\rightarrow$<br>2. Map SDK load $\rightarrow$<br>3. Hiển thị map $\rightarrow$<br>4. Hiển thị marker. |
| **Luồng thay thế** | Map chưa load $\rightarrow$ hiển thị loading. |
| **Luồng ngoại lệ** | Map API lỗi $\rightarrow$ hiển thị địa chỉ dạng text. |
| **Quy tắc nghiệp vụ** | Marker phải tương ứng với tọa độ đã xác định. |

#### UC-35: Tính khoảng cách
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-35 |
| **Tên Use Case** | Tính khoảng cách |
| **Tác nhân** | System, Map/Routing Service |
| **Mô tả** | Tính khoảng cách giữa hai hoặc nhiều tọa độ. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | System cần distance cho search/routing/itinerary. |
| **Tiền điều kiện** | Origin và destination có tọa độ. |
| **Hậu điều kiện** | Khoảng cách được trả về. |
| **Luồng chính** | 1. System gửi tọa độ $\rightarrow$<br>2. Service xử lý $\rightarrow$<br>3. Trả distance $\rightarrow$<br>4. System format $\rightarrow$<br>5. Hiển thị/lưu. |
| **Luồng thay thế** | Sử dụng khoảng cách đã cache nếu hợp lệ. |
| **Luồng ngoại lệ** | Service không phản hồi $\rightarrow$ retry/fallback. |
| **Quy tắc nghiệp vụ** | Đơn vị hiển thị phải thống nhất trên toàn hệ thống. |

#### UC-36: Tính route
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-36 |
| **Tên Use Case** | Tính route |
| **Tác nhân** | System, Map/Routing Service |
| **Mô tả** | Tính tuyến đường từ origin đến destination hoặc qua nhiều điểm. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | User yêu cầu xem route hoặc system tạo itinerary. |
| **Tiền điều kiện** | Có tọa độ hợp lệ. |
| **Hậu điều kiện** | Route được trả về cho hệ thống. |
| **Luồng chính** | 1. System xác định origin/destination $\rightarrow$<br>2. Xác định travel mode $\rightarrow$<br>3. Gọi Routing API $\rightarrow$<br>4. Nhận route $\rightarrow$<br>5. Trả dữ liệu cho UI. |
| **Luồng thay thế** | Có nhiều route $\rightarrow$ system lựa chọn route theo tiêu chí cấu hình hoặc cho user lựa chọn. |
| **Luồng ngoại lệ** | Không có route $\rightarrow$ thông báo không thể tính đường. |
| **Quy tắc nghiệp vụ** | Travel mode và tiêu chí chọn route TBD. |

#### UC-37: Hiển thị route
| Trường | Đặc tả |
| :--- | :--- |
| **Mã Use Case** | UC-37 |
| **Tên Use Case** | Hiển thị route |
| **Tác nhân** | System, Map Service |
| **Mô tả** | Hiển thị tuyến đường đã tính trên bản đồ. |
| **Mức độ ưu tiên** | P0 |
| **Điều kiện kích hoạt** | UC-36 trả về route thành công. |
| **Tiền điều kiện** | Map Service hoạt động và route hợp lệ. |
| **Hậu điều kiện** | User nhìn thấy tuyến đường trên bản đồ. |
| **Luồng chính** | 1. System nhận route $\rightarrow$<br>2. Render map $\rightarrow$<br>3. Hiển thị origin $\rightarrow$<br>4. Hiển thị destination/waypoints $\rightarrow$<br>5. Vẽ route $\rightarrow$<br>6. Hiển thị distance/duration. |
| **Luồng thay thế** | Không render được polyline $\rightarrow$ hiển thị danh sách chặng và thông tin khoảng cách/thời gian. |
| **Luồng ngoại lệ** | Map lỗi $\rightarrow$ hiển thị route dạng text/list. |
| **Quy tắc nghiệp vụ** | Route hiển thị phải tương ứng với thứ tự điểm trong itinerary. |