(() => {
  const form = document.querySelector("#register-form");
  const fullnameInput = document.querySelector("#fullname");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm-password");
  const termsInput = document.querySelector("#terms");
  const toggleButtons = document.querySelectorAll("[data-password-toggle]");
  const submitButton = document.querySelector(".register-form__submit");
  const submitText = document.querySelector(".register-form__submit-text");
  const toast = document.querySelector("[data-toast]");

  if (!form || !fullnameInput || !emailInput || !phoneInput || !passwordInput || !confirmPasswordInput || !termsInput) {
    return;
  }

  const { clearFormError, emailPattern, initPasswordToggles, setFormError, setLoadingState, showToast } =
    window.CanThoUI;

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const messages = {
    fullname: "Họ và tên phải có tối thiểu 2 ký tự.",
    email: "Vui lòng nhập email hợp lệ.",
    phone: "Số điện thoại phải gồm đúng 10 chữ số.",
    password: "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.",
    confirmPassword: "Mật khẩu xác nhận không khớp.",
    terms: "Bạn phải đồng ý với Điều khoản sử dụng.",
  };

  const setCheckboxError = (message) => {
    termsInput.setAttribute("aria-invalid", "true");
    document.querySelector("#terms-error").textContent = message;
  };

  const clearCheckboxError = () => {
    termsInput.removeAttribute("aria-invalid");
    document.querySelector("#terms-error").textContent = "";
  };

  const validateFullname = () => {
    if (fullnameInput.value.trim().length < 2) {
      setFormError(fullnameInput, messages.fullname);
      return false;
    }

    clearFormError(fullnameInput);
    return true;
  };

  const validateEmail = () => {
    if (!emailPattern.test(emailInput.value.trim())) {
      setFormError(emailInput, messages.email);
      return false;
    }

    clearFormError(emailInput);
    return true;
  };

  const validatePhone = () => {
    if (!/^\d{10}$/.test(phoneInput.value.trim())) {
      setFormError(phoneInput, messages.phone);
      return false;
    }

    clearFormError(phoneInput);
    return true;
  };

  const validatePassword = () => {
    if (!passwordPattern.test(passwordInput.value)) {
      setFormError(passwordInput, messages.password);
      return false;
    }

    clearFormError(passwordInput);
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPasswordInput.value === "" || confirmPasswordInput.value !== passwordInput.value) {
      setFormError(confirmPasswordInput, messages.confirmPassword);
      return false;
    }

    clearFormError(confirmPasswordInput);
    return true;
  };

  const validateTerms = () => {
    if (!termsInput.checked) {
      setCheckboxError(messages.terms);
      return false;
    }

    clearCheckboxError();
    return true;
  };

  const saveRegisterInfo = () => {
    localStorage.setItem("canthoRegisterFullname", fullnameInput.value.trim());
    localStorage.setItem("canthoRegisterEmail", emailInput.value.trim());
  };

  const validateFieldWhenFilled = (input, validator) => {
    input.addEventListener("input", () => {
      if (input.value.trim() === "") {
        clearFormError(input);
        return;
      }

      validator();
    });
  };

  validateFieldWhenFilled(fullnameInput, validateFullname);
  validateFieldWhenFilled(emailInput, validateEmail);

  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);

    if (phoneInput.value.trim() === "") {
      clearFormError(phoneInput);
      return;
    }

    validatePhone();
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value === "") {
      clearFormError(passwordInput);
    } else {
      validatePassword();
    }

    if (confirmPasswordInput.value !== "") {
      validateConfirmPassword();
    }
  });

  confirmPasswordInput.addEventListener("input", () => {
    if (confirmPasswordInput.value === "") {
      clearFormError(confirmPasswordInput);
      return;
    }

    validateConfirmPassword();
  });

  termsInput.addEventListener("change", () => {
    if (termsInput.checked) {
      clearCheckboxError();
    }
  });

  initPasswordToggles(toggleButtons, (button) =>
    document.querySelector(`#${button.dataset.passwordToggle}`)
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isValid = [
      validateFullname(),
      validateEmail(),
      validatePhone(),
      validatePassword(),
      validateConfirmPassword(),
      validateTerms(),
    ].every(Boolean);

    if (!isValid) {
      return;
    }

    saveRegisterInfo();
    setLoadingState(
      submitButton,
      submitText,
      true,
      "Đang tạo tài khoản...",
      "ĐĂNG KÝ"
    );

    window.setTimeout(() => {
      showToast(toast);
    }, 500);

    window.setTimeout(() => {
      setLoadingState(
        submitButton,
        submitText,
        false,
        "Đang tạo tài khoản...",
        "ĐĂNG KÝ"
      );
      window.location.href = "login.html";
    }, 1500);
  });
})();
