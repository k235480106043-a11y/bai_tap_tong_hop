// Chạy hàm kiểm tra Cookie ngay khi mở trang web
window.onload = function() {
    checkCookie();
};

// Hàm gửi request đăng nhập tới Node-RED
function login() {
    let uid = document.getElementById("uid").value;
    let pwd = document.getElementById("pwd").value;

    fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: uid, pwd: pwd })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Đăng nhập thành công -> Lưu Cookie sống trong 1 ngày (86400 giây)
            document.cookie = "isLogined=true; max-age=86400; path=/";
            checkCookie(); // Tải lại giao diện
        } else {
            document.getElementById("loginMsg").innerText = data.message;
        }
    })
    .catch(error => {
        console.error("Lỗi:", error);
        document.getElementById("loginMsg").innerText = "Lỗi kết nối máy chủ!";
    });
}

// Hàm kiểm tra trình duyệt có Cookie không
function checkCookie() {
    let cookies = document.cookie;
    if (cookies.includes("isLogined=true")) {
        // Nếu có Cookie -> Ẩn form login, hiện thông tin mật
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("secretSection").classList.remove("hidden");
    } else {
        // Nếu không có Cookie -> Bắt đăng nhập
        document.getElementById("loginSection").classList.remove("hidden");
        document.getElementById("secretSection").classList.add("hidden");
    }
}

// Hàm Đăng xuất
function logout() {
    // Xóa Cookie bằng cách set hạn sử dụng về 0
    document.cookie = "isLogined=; max-age=0; path=/";
    checkCookie(); // Tải lại giao diện về trang login
}