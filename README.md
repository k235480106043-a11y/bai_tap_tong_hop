# Bài tập về nhà môn Lập trình web – NgocLinh Project

**Lớp:** 59KMT
**Sinh viên thực hiện:** Nguyễn Thị Ngọc Linh

Repo này chứa bài tập về nhà môn Lập trình web do em thực hiện, gồm hai phần:

- **Bài tập 1:** triển khai các dịch vụ bằng Docker Compose và cấu hình Nginx chạy 2 website với 2 tên miền khác nhau.
- **Bài tập 2:** xây dựng API đơn giản bằng Node-RED, cấu hình Nginx để trang web dùng JavaScript gọi được API.

Mã nguồn giao diện được em dùng AI hỗ trợ sinh ban đầu trên lớp, sau đó tự chỉnh sửa và bổ sung giao diện cá nhân, chức năng tìm kiếm và tính tổng tiền.

## 1. Cấu trúc thư mục

```text
bai_tap_web/
├── docker-compose.yml     # Khai báo các dịch vụ
├── nginx/                 # Cấu hình Nginx (2 website, chuyển tiếp /api/)
├── nodered/               # Dữ liệu cấu hình Node-RED
├── web1/                  # Website 1 (Bài tập 1)
├── web2/                  # Website 2 (Bài tập 1)
├── html/                  # Trang web gọi API (Bài tập 2)
│   ├── index.html
│   └── app_main.js
├── images/                # Ảnh minh họa trong README
└── README.md
```

## 2. Bài tập 1: Triển khai dịch vụ bằng Docker Compose

Hệ thống chạy trên **Ubuntu trong WSL** (Windows 11), đã cài Docker Compose. Các dịch vụ được khai báo trong [docker-compose.yml](./docker-compose.yml):

| Dịch vụ | Vai trò |
|---|---|
| Nginx | Web server, chạy 2 website và chuyển tiếp API |
| Node-RED | Xây dựng API |
| MariaDB | Cơ sở dữ liệu |
| phpMyAdmin | Công cụ quản trị MariaDB |
| Cloudflared | Cloudflare Tunnel, đưa website ra Internet qua tên miền |

**Cấu hình Nginx chạy 2 website với 2 tên miền:** trong thư mục `./nginx`, em khai báo 2 khối `server`, mỗi khối có `server_name` riêng và trỏ `root` tới thư mục web tương ứng:

- Website 1: thư mục `./web1`, tên miền `[domain1.example.com]`
- Website 2: thư mục `./web2`, tên miền `[domain2.example.com]`

## 3. Bài tập 2: API Node-RED và trang web gọi API

### 3.1. API trên Node-RED

Flow trong Node-RED gồm 3 node nối tiếp nhau:

1. **`[get] /api/tacke`** (node `http in`): nhận yêu cầu GET từ trình duyệt.
2. **`function 1`**: tạo dữ liệu JSON cần trả về.
3. **`http`** (node `http response`): gửi kết quả JSON về cho trình duyệt.

<img width="1917" height="1078" alt="nodered" src="https://github.com/user-attachments/assets/1a8084e6-6d3e-4b76-b68f-f6309589047d" />


*Hình 1: Flow trong Node-RED (truy cập tại `localhost:1880`) gồm `http in` → `function` → `http response`, tạo ra API `/api/tacke`.*

Dữ liệu API trả về có dạng:

```json
{
  "ok": 1,
  "msg": "thành công",
  "dssv": [
    { "name": "Cốp", "money": 123 },
    { "name": "David", "money": 456 }
  ]
}
```

### 3.2. Cấu hình Nginx để gọi API

Trong cấu hình Nginx, đường dẫn `/api/` được chuyển tiếp tới Node-RED (`nodered:1880`), còn thư mục gốc trỏ tới `./html`. Nhờ đó trang web gọi API bằng đường dẫn tương đối `/api/tacke` mà không gặp lỗi CORS.

### 3.3. Trang web gọi API bằng JavaScript

Giao diện gồm `./html/index.html` và `./html/app_main.js`, có các chức năng:

- Gọi API `/api/tacke` khi bấm nút **"Lấy Dữ Liệu API"**.
- Hiển thị danh sách sinh viên kèm số tiền.
- Tìm kiếm (lọc) theo tên.
- Tự động tính dòng **Tổng cộng**.

<img width="1917" height="1078" alt="web" src="https://github.com/user-attachments/assets/6a89587e-6c76-403a-aa8f-16555094abf5" />


*Hình 2: Trang web hiển thị danh sách 5 sinh viên kèm số tiền, có ô tìm kiếm theo tên và dòng tổng cộng tự động tính (999 + 123 + 456 + 650 + 820 = 3048 VNĐ).*

## 4. Cách chạy dự án

```bash
git clone https://github.com/[ten-github]/[ten-repo].git
cd [ten-repo]
docker compose up -d
```

Sau khi chạy:

- Website: `http://localhost`
- Node-RED: `http://localhost:1880`

## 5. Lưu ý

- Repo phục vụ mục đích học tập trên lớp. Một số bước như khởi tạo cơ sở dữ liệu và cài đặt thư viện cho Node-RED không được mô tả đầy đủ ở đây vì đã được hướng dẫn trực tiếp trong buổi học.
- Mọi thắc mắc xin gửi vào nhóm Zalo của lớp với tinh thần trao đổi, học hỏi và cùng xây dựng.

---

# Phụ lục: Cài đặt Docker

## Các môi trường có thể chạy Docker

- **Windows 11 Pro:** cài Docker Desktop.
- **Máy ảo Linux:** WSL, Hyper-V, VirtualBox hoặc VMware, cài Ubuntu.
- Ubuntu cài trực tiếp trên máy thật hoặc VPS.
- Raspberry Pi 3 / 4 / 5: cài Debian.

## Cài đặt trên Ubuntu

Docker Desktop cho Windows tải tại https://www.docker.com/products/docker-desktop/. Trên Ubuntu, thực hiện lần lượt:

```bash
# 1. Cập nhật hệ thống và cài đặt các gói phụ thuộc
sudo apt update
sudo apt install -y ca-certificates curl gnupg

# 2. Thêm khóa GPG chính thức của Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 3. Thêm kho lưu trữ (repository) của Docker vào nguồn APT
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Cập nhật APT và cài đặt Docker Compose
sudo apt update
sudo apt install -y docker-compose-plugin
```
