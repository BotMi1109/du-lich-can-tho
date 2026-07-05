(() => {
  const getErrorElement = (input) => {
    if (!input || !input.id) {
      return null;
    }

    return document.querySelector(`#${input.id}-error`);
  };

  const setFormError = (input, message) => {
    const errorElement = getErrorElement(input);

    if (!input || !errorElement) {
      return;
    }

    input.classList.add("is-error");
    input.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
  };

  const clearFormError = (input) => {
    const errorElement = getErrorElement(input);

    if (!input || !errorElement) {
      return;
    }

    input.classList.remove("is-error");
    input.removeAttribute("aria-invalid");
    errorElement.textContent = "";
  };

  const setLoadingState = (button, textElement, isLoading, loadingText, defaultText) => {
    if (!button || !textElement) {
      return;
    }

    button.classList.toggle("is-loading", isLoading);
    button.disabled = isLoading;
    textElement.textContent = isLoading ? loadingText : defaultText;
  };

  const showToast = (toast) => {
    if (toast) {
      toast.classList.add("is-visible");
    }
  };

  const initPasswordToggles = (buttons, getInput) => {
    buttons.forEach((button) => {
      if (!button) {
        return;
      }

      button.addEventListener("click", () => {
        const input = getInput(button);

        if (!input) {
          return;
        }

        const icon = button.querySelector("i");
        const isPasswordVisible = input.type === "text";

        input.type = isPasswordVisible ? "password" : "text";
        button.setAttribute(
          "aria-label",
          isPasswordVisible ? "Hiện mật khẩu" : "Ẩn mật khẩu"
        );

        if (icon) {
          icon.classList.toggle("fa-eye", isPasswordVisible);
          icon.classList.toggle("fa-eye-slash", !isPasswordVisible);
        }

        input.focus();
      });
    });
  };

  const initBackToTop = () => {
    const backToTopButton = document.querySelector("[data-back-to-top]");

    if (!backToTopButton) {
      return;
    }

    const toggleBackToTopButton = () => {
      backToTopButton.classList.toggle(
        "button--back-to-top-visible",
        window.scrollY > 240
      );
    };

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", toggleBackToTopButton, { passive: true });
    toggleBackToTopButton();
  };

  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const selector = link.getAttribute("href");

        if (!selector || selector === "#") {
          return;
        }

        const target = document.querySelector(selector);

        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  };

  window.CanThoUI = {
    clearFormError,
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    initPasswordToggles,
    setFormError,
    setLoadingState,
    showToast,
  };

  initBackToTop();
  initSmoothAnchors();
})();
