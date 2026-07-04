(() => {
    const form = document.querySelector('#login-form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const rememberInput = document.querySelector('#remember');
    const toggleButton = document.querySelector('[data-password-toggle]');
    const submitButton = document.querySelector('.login-form__submit');
    const submitText = document.querySelector('.login-form__submit-text');
    const toast = document.querySelector('[data-toast]');

    const storageKey = 'canthoLoginEmail';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const messages = {
        email: 'Vui lòng nhập email hợp lệ.',
        password: 'Mật khẩu phải có tối thiểu 6 ký tự.'
    };

    const setError = (input, message) => {
        const errorElement = document.querySelector(`#${input.id}-error`);
        input.classList.add('is-error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
    };

    const clearError = (input) => {
        const errorElement = document.querySelector(`#${input.id}-error`);
        input.classList.remove('is-error');
        input.removeAttribute('aria-invalid');
        errorElement.textContent = '';
    };

    const validateEmail = () => {
        const isValid = emailPattern.test(emailInput.value.trim());

        if (!isValid) {
            setError(emailInput, messages.email);
            return false;
        }

        clearError(emailInput);
        return true;
    };

    const validatePassword = () => {
        const isValid = passwordInput.value.trim().length >= 6;

        if (!isValid) {
            setError(passwordInput, messages.password);
            return false;
        }

        clearError(passwordInput);
        return true;
    };

    const setLoading = (isLoading) => {
        submitButton.classList.toggle('is-loading', isLoading);
        submitButton.disabled = isLoading;
        submitText.textContent = isLoading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP';
    };

    const showToast = () => {
        toast.classList.add('is-visible');
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

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '') {
            validateEmail();
        } else {
            clearError(emailInput);
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim() !== '') {
            validatePassword();
        } else {
            clearError(passwordInput);
        }
    });

    rememberInput.addEventListener('change', syncRememberedEmail);

    toggleButton.addEventListener('click', () => {
        const isPasswordVisible = passwordInput.type === 'text';
        const icon = toggleButton.querySelector('i');

        passwordInput.type = isPasswordVisible ? 'password' : 'text';
        toggleButton.setAttribute('aria-label', isPasswordVisible ? 'Hiện mật khẩu' : 'Ẩn mật khẩu');
        icon.classList.toggle('fa-eye', isPasswordVisible);
        icon.classList.toggle('fa-eye-slash', !isPasswordVisible);
        passwordInput.focus();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        syncRememberedEmail();
        setLoading(true);

        window.setTimeout(() => {
            showToast();
        }, 500);

        window.setTimeout(() => {
            setLoading(false);
            window.location.href = '../index.html';
        }, 1500);
    });

    fillRememberedEmail();
})();
