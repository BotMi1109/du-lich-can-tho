/*MỞ / ĐÓNG TIMELINE*/
const tourCards = document.querySelectorAll(".tour-card");
// mở timeline
tourCards.forEach(card => {
  const detailBtn = card.querySelector(".btn-detail");

  if (detailBtn) {
    detailBtn.addEventListener("click", () => {
      const targetId = card.dataset.target;
      const targetTimeline = document.getElementById(targetId);
      // ẩn tất cả timeline
      document.querySelectorAll(".timeline")
        .forEach(t => t.classList.add("timeline-hidden"));
      // hiện timeline chọn
      if (targetTimeline) {
        targetTimeline.classList.remove("timeline-hidden");
        targetTimeline.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
// đặt tour
const bookBtn = card.querySelector(".btn-book");
if (bookBtn) {
  bookBtn.addEventListener("click", () => {
    // mở modal đặt tour
    document.getElementById("bookingModal").classList.remove("timeline-hidden");
  });
}
});
/*ĐÓNG TIMELINE*/
document.querySelectorAll(".btn-close-timeline").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".timeline").classList.add("timeline-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
/*TÌM KIẾM + LỌC*/
const searchInput = document.getElementById("search");
const durationFilter = document.getElementById("durationFilter");
const filterBtn = document.getElementById("filterBtn");

function filterTours() {
  const keyword = searchInput.value.toLowerCase();
  const duration = durationFilter.value;

  tourCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    const cardDuration = card.dataset.duration; // FIX QUAN TRỌNG

    const matchKeyword =
      keyword === "" || card.textContent.toLowerCase().includes(keyword);

    const matchDuration =
      duration === "" || cardDuration === duration;

    card.style.display = (matchKeyword && matchDuration) ? "block" : "none";
  });
  // đóng timeline khi filter
  document.querySelectorAll(".timeline")
    .forEach(t => t.classList.add("timeline-hidden"));
}
// event
filterBtn.addEventListener("click", filterTours);
searchInput.addEventListener("input", filterTours);
durationFilter.addEventListener("change", filterTours);
/*SẮP XẾP GIÁ*/
const sortFilter = document.getElementById("sortFilter");

if (sortFilter) {
  sortFilter.addEventListener("change", () => {
    const value = sortFilter.value;
    const container = document.querySelector(".tour-preview");
    const cards = Array.from(container.querySelectorAll(".tour-card"));

    if (!value) return;

    cards.sort((a, b) => {
      const priceA = Number(a.dataset.price || 0);
      const priceB = Number(b.dataset.price || 0);

      return value === "priceAsc"
        ? priceA - priceB
        : priceB - priceA;
    });

    cards.forEach(card => container.appendChild(card));
  });
}
/*BACK TO TOP*/
const backToTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display =
    window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
/*ĐÓNG MODAL*/
const bookingModal = document.getElementById("bookingModal");
const closeBtn = bookingModal.querySelector(".close");
// nút X đóng modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    bookingModal.classList.add("timeline-hidden");
  });
}
// click ra ngoài nội dung modal cũng đóng
bookingModal.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.classList.add("timeline-hidden");
  }
});
// xử lý form đặt tour
document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  alert(`Cảm ơn ${name}! Chúng tôi sẽ liên hệ qua ${email} hoặc ${phone}.`);
  // đóng modal sau khi submit
  bookingModal.classList.add("timeline-hidden");
  e.target.reset();
});
