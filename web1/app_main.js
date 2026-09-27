let rawData = [];

async function loadData() {
    const statusDiv = document.getElementById('status');
    const searchInput = document.getElementById('searchInput');
    const totalBox = document.getElementById('totalBox');
    
    statusDiv.textContent = 'Đang tải dữ liệu...';

    try {
        const res = await fetch('/api/tacke');
        const data = await res.json();

        if (data.ok === 1) {
            statusDiv.textContent = '';
            searchInput.style.display = 'block';
            totalBox.style.display = 'flex';

            // Dữ liệu từ API + thêm thành viên riêng của NgocLinh để tạo điểm nhấn
            rawData = [
                ...data.dssv,
                { name: "Minh Anh", money: 650 },
                { name: "Hoàng Nam", money: 820 }
            ];

            renderList(rawData);
        }
    } catch (err) {
        statusDiv.textContent = 'Lỗi kết nối API!';
    }
}

function renderList(list) {
    const resultDiv = document.getElementById('result');
    let htmlContent = '';
    let total = 0;

    list.forEach(item => {
        total += Number(item.money);
        htmlContent += `<div class="item"><span class="name">${item.name}</span><span class="money">${item.money} VNĐ</span></div>`;
    });

    resultDiv.innerHTML = htmlContent;
    document.getElementById('totalMoney').textContent = total + ' VNĐ';
}

function filterData() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = rawData.filter(item => item.name.toLowerCase().includes(keyword));
    renderList(filtered);
}
