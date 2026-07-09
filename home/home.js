(() => {
  const slides = document.querySelectorAll(".home-slide");

  if (!slides.length) {
    return;
  }

  let currentSlideIndex = 0;
  const slideIntervalTime = 3000;

  const showNextSlide = () => {
    slides[currentSlideIndex].classList.remove("active");
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add("active");
  };

  window.setInterval(showNextSlide, slideIntervalTime);
})();
