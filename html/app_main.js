async function loadData() {
    const statusDiv = document.getElementById('status');
    const resultDiv = document.getElementById('result');
    statusDiv.textContent = 'Đang truy vấn dữ liệu...';

    try {
        const res = await fetch('/api/tacke');
        const data = await res.json();

        if (data.ok === 1) {
            statusDiv.textContent = data.student_info;
            let htmlContent = '';
            data.dssv.forEach(item => {
                htmlContent += `<div class="item"><span><strong>${item.name}</strong></span><span style="color:#28a745; font-weight:bold;">${item.money} VNĐ</span></div>`;
            });
            resultDiv.innerHTML = htmlContent;
            resultDiv.style.display = 'block';
        }
    } catch (err) {
        statusDiv.textContent = 'Kết nối API thất bại!';
        console.error(err);
    }
}
