// ================= JAVASCRIPT: SLIDER TỰ CHUYỂN ẢNH =================

// Lấy danh sách tất cả các thành phần có class 'slide'
const slides = document.querySelectorAll('.slide');

// Biến theo dõi vị trí slide hiện tại (Bắt đầu từ vị trí 0)
let currentSlideIndex = 0;

// Thiết lập thời gian chuyển ảnh (3000ms = 3 giây)
const slideIntervalTime = 3000;

function showNextSlide() {
    // 1. Loại bỏ class 'active' của slide hiện tại để làm ẩn nó đi
    slides[currentSlideIndex].classList.remove('active');

    // 2. Tính toán chỉ số slide tiếp theo
    // Sử dụng phép chia lấy dư (%) giúp vòng lặp quay lại 0 khi vượt qua slide cuối cùng
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;

    // 3. Thêm class 'active' vào slide kế tiếp để kích hoạt hiệu ứng hiển thị opacity
    slides[currentSlideIndex].classList.add('active');
}

// Chạy vòng lặp tự động chuyển slide theo thời gian định sẵn
setInterval(showNextSlide, slideIntervalTime);
