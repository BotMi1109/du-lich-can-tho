(() => {
  const form = document.querySelector("#login-form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const rememberInput = document.querySelector("#remember");
  const toggleButton = document.querySelector("[data-password-toggle]");
  const submitButton = document.querySelector(".login-form__submit");
  const submitText = document.querySelector(".login-form__submit-text");
  const toast = document.querySelector("[data-toast]");

  if (!form || !emailInput || !passwordInput || !rememberInput) {
    return;
  }

  const { clearFormError, emailPattern, initPasswordToggles, setFormError, setLoadingState, showToast } =
    window.CanThoUI;

  const storageKey = "canthoLoginEmail";
  const messages = {
    email: "Vui lòng nhập email hợp lệ.",
    password: "Mật khẩu phải có tối thiểu 6 ký tự.",
  };

  const validateEmail = () => {
    const isValid = emailPattern.test(emailInput.value.trim());

    if (!isValid) {
      setFormError(emailInput, messages.email);
      return false;
    }

    clearFormError(emailInput);
    return true;
  };

  const validatePassword = () => {
    const isValid = passwordInput.value.trim().length >= 6;

    if (!isValid) {
      setFormError(passwordInput, messages.password);
      return false;
    }

    clearFormError(passwordInput);
    return true;
  };

  const syncRememberedEmail = () => {
    if (rememberInput.checked) {
      localStorage.setItem(storageKey, emailInput.value.trim());
      return;
    }

    localStorage.removeItem(storageKey);
  };

  const fillRememberedEmail = () => {
    const rememberedEmail = localStorage.getItem(storageKey);

    if (rememberedEmail) {
      emailInput.value = rememberedEmail;
      rememberInput.checked = true;
    }
  };

  emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() !== "") {
      validateEmail();
      return;
    }

    clearFormError(emailInput);
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value.trim() !== "") {
      validatePassword();
      return;
    }

    clearFormError(passwordInput);
  });

  rememberInput.addEventListener("change", syncRememberedEmail);

  initPasswordToggles([toggleButton], () => passwordInput);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    syncRememberedEmail();
    setLoadingState(
      submitButton,
      submitText,
      true,
      "Đang đăng nhập...",
      "ĐĂNG NHẬP"
    );

    window.setTimeout(() => {
      showToast(toast);
    }, 500);

    window.setTimeout(() => {
      setLoadingState(
        submitButton,
        submitText,
        false,
        "Đang đăng nhập...",
        "ĐĂNG NHẬP"
      );
      window.location.href = "../home/index.html";
    }, 1500);
  });

  fillRememberedEmail();
})();
