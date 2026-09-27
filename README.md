# WEB DÙNG COOKIE ĐỂ LOGIN VÀ DUY TRÌ LOGINED - NGOCLINH PROJECT

Logic cho web đơn giản này làm ngay trên lớp cho 59kmt (Thực hiện bởi: Nguyễn Thị Ngọc Linh): 
- Sử dụng docker compose để triển khai các service, xem chi tiết tại [docker-compose.yml](./docker-compose.yml)
- Code web chỉ sử dụng html + js : sử dụng AI để Gen code ngay trên lớp (có sửa đổi bổ sung giao diện cá nhân, tìm kiếm và tính tổng tiền)
- Backend sử dụng nodered để truy vấn SQL tới MariaDB trả về json
- Cấu hình nodered bắt buộc đăng nhập tại file `./nodered/settings.js`, chuỗi hash lấy tại [tool này](https://tms.tnut.edu.vn/pw.php)
- Web server sử dụng nginx
- Cấu hình nginx tại file `./nginx/nginx.conf` để điều hướng root tới thư mục `./html`, điều hướng `/api/` tới `nodered:1880`
- Sử dụng MariaDB làm cơ sở dữ liệu
- Sử dụng phpMyAdmin làm công cụ để quản trị MariaDB: tạo table, trường dữ liệu, nhập dữ liệu demo,...
- Dùng cloudflare tunnel để web truy cập online qua domain (cần domain xịn trước đó để cấu hình router ánh xạ sub-domain tới nginx)

# Kết quả:
- Đã đăng nhập được bằng uid + pwd theo database
- Chưa đăng nhập thì ko xem đc thông tin mật
- Duy trì đăng nhập : Sau khi đã đăng nhập thì các lần sau xem đc thông tin mật ngay mà ko phải đăng nhập lại
- Dùng trình duyệt ẩn danh truy cập trực tiếp url mật cũng ko xem được thông tin mật
- Giao diện người dùng (`./html/index.html` và `./html/app_main.js`) cá nhân hóa cho NgocLinh, tự động gọi API `/api/tacke`, hiển thị danh sách sinh viên, lọc tên và tự động tính tổng tiền.

# Chú ý: 
- Repo này ko dành cho sv nghỉ học, sv nghỉ học sẽ ko biết triển khai database như nào với project này!
- Các thao tác cài đặt thư viện trên nodered cũng không được mô tả trên file này, chỉ sv nghe giảng mới biết !
- Mọi thắc mắc vui lòng gửi vào nhóm zalo của lớp với tinh thần học hỏi và xây dựng!

---

# HƯỚNG DẪN SỬ DỤNG DOCKER

## 1. Hệ điều hành nào dùng được docker ?
  - Windows 11 pro: cài đặt docker desktop
  - Giả lập Linux:
    + WSL (có sẵn trên Windows 11 pro): Cài Ubuntu OS
    + HyperV (có sẵn trên Windows 11 pro): Cài Ubuntu OS
    + VirtualBox : Cài đặt Ubuntu OS
    + VMWare : Cài đặt Ubuntu OS
  - Cài Ubuntu OS trên máy thật
  - VPS cài sẵn Ubuntu
  - Pi3 | Pi4 | Pi5 : Cài đặt Debian OS

## 2. Các bước cài đặt:
  - Docker desktop trên windows: https://www.docker.com/products/docker-desktop/
  - Ubuntu: 

# 1. Cập nhật hệ thống và cài đặt gói phụ thuộc
sudo apt update
sudo apt install -y ca-certificates curl gnupg

# 2. Thêm khóa GPG chính thức của Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 3. Thêm kho lưu trữ (repository) Docker vào nguồn APT
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Cập nhật APT và cài đặt Docker Compose
sudo apt update
sudo apt install -y docker-compose-plugin


## 3. Mẫu cấu trúc file docker-compose.yml tham khảo:
1. Tạo thư mục làm việc (nên trùng tên với repo trên github)
2. Tạo file docker-compose.yml chứa các service cần thiết (Xem file thực tế đang vận hành của dự án tại ./docker-compose.yml)
 
### Cấu trúc cú pháp mẫu:
services:
  # 1. Tên dịch vụ (do bạn tự đặt)
  web_app:
    image: nginx:alpine                  
    container_name: my_web_container     
    restart: always                      
    ports:
      - "8080:80"                        
    environment:
      - NODE_ENV=production              
    volumes:
      - ./html:/usr/share/nginx/html     
      - app_data:/var/log/nginx          
    networks:
      - my_network                       
    depends_on:
      - database                         

  # 2. Dịch vụ thứ hai (ví dụ: Database)
  database:
    build:                              
      context: ./db_folder
      dockerfile: Dockerfile
    environment:
      POSTGRES_PASSWORD: secret_password
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - my_network

# Quy hoạch Volume chung cho các container
volumes:
  app_data:
  db_data:

# Quy hoạch Mạng nội bộ giúp các container giao tiếp qua tên dịch vụ
networks:
  my_network:
    driver: bridge