(() => {
    const form = document.querySelector('#register-form');
    const fullnameInput = document.querySelector('#fullname');
    const emailInput = document.querySelector('#email');
    const phoneInput = document.querySelector('#phone');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirm-password');
    const termsInput = document.querySelector('#terms');
    const toggleButtons = document.querySelectorAll('[data-password-toggle]');
    const submitButton = document.querySelector('.register-form__submit');
    const submitText = document.querySelector('.register-form__submit-text');
    const toast = document.querySelector('[data-toast]');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const messages = {
        fullname: 'Họ và tên phải có tối thiểu 2 ký tự.',
        email: 'Vui lòng nhập email hợp lệ.',
        phone: 'Số điện thoại phải gồm đúng 10 chữ số.',
        password: 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.',
        confirmPassword: 'Mật khẩu xác nhận không khớp.',
        terms: 'Bạn phải đồng ý với Điều khoản sử dụng.'
    };

    const getErrorElement = (input) => document.querySelector(`#${input.id}-error`);

    const setError = (input, message) => {
        const errorElement = getErrorElement(input);
        input.classList.add('is-error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
    };

    const clearError = (input) => {
        const errorElement = getErrorElement(input);
        input.classList.remove('is-error');
        input.removeAttribute('aria-invalid');
        errorElement.textContent = '';
    };

    const setCheckboxError = (message) => {
        termsInput.setAttribute('aria-invalid', 'true');
        document.querySelector('#terms-error').textContent = message;
    };

    const clearCheckboxError = () => {
        termsInput.removeAttribute('aria-invalid');
        document.querySelector('#terms-error').textContent = '';
    };

    const validateFullname = () => {
        if (fullnameInput.value.trim().length < 2) {
            setError(fullnameInput, messages.fullname);
            return false;
        }

        clearError(fullnameInput);
        return true;
    };

    const validateEmail = () => {
        if (!emailPattern.test(emailInput.value.trim())) {
            setError(emailInput, messages.email);
            return false;
        }

        clearError(emailInput);
        return true;
    };

    const validatePhone = () => {
        if (!/^\d{10}$/.test(phoneInput.value.trim())) {
            setError(phoneInput, messages.phone);
            return false;
        }

        clearError(phoneInput);
        return true;
    };

    const validatePassword = () => {
        if (!passwordPattern.test(passwordInput.value)) {
            setError(passwordInput, messages.password);
            return false;
        }

        clearError(passwordInput);
        return true;
    };

    const validateConfirmPassword = () => {
        if (confirmPasswordInput.value === '' || confirmPasswordInput.value !== passwordInput.value) {
            setError(confirmPasswordInput, messages.confirmPassword);
            return false;
        }

        clearError(confirmPasswordInput);
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

    const setLoading = (isLoading) => {
        submitButton.classList.toggle('is-loading', isLoading);
        submitButton.disabled = isLoading;
        submitText.textContent = isLoading ? 'Đang tạo tài khoản...' : 'ĐĂNG KÝ';
    };

    const showToast = () => {
        toast.classList.add('is-visible');
    };

    const saveRegisterInfo = () => {
        localStorage.setItem('canthoRegisterFullname', fullnameInput.value.trim());
        localStorage.setItem('canthoRegisterEmail', emailInput.value.trim());
    };

    const validateFieldWhenFilled = (input, validator) => {
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                clearError(input);
                return;
            }

            validator();
        });
    };

    validateFieldWhenFilled(fullnameInput, validateFullname);
    validateFieldWhenFilled(emailInput, validateEmail);

    phoneInput.addEventListener('input', () => {
        // Keep phone entry numeric while the user types or pastes text.
        phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);

        if (phoneInput.value.trim() === '') {
            clearError(phoneInput);
            return;
        }

        validatePhone();
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value === '') {
            clearError(passwordInput);
        } else {
            validatePassword();
        }

        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });

    confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value === '') {
            clearError(confirmPasswordInput);
            return;
        }

        validateConfirmPassword();
    });

    termsInput.addEventListener('change', () => {
        if (termsInput.checked) {
            clearCheckboxError();
        }
    });

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const input = document.querySelector(`#${button.dataset.passwordToggle}`);
            const icon = button.querySelector('i');
            const isPasswordVisible = input.type === 'text';

            input.type = isPasswordVisible ? 'password' : 'text';
            button.setAttribute('aria-label', isPasswordVisible ? 'Hiện mật khẩu' : 'Ẩn mật khẩu');
            icon.classList.toggle('fa-eye', isPasswordVisible);
            icon.classList.toggle('fa-eye-slash', !isPasswordVisible);
            input.focus();
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isValid = [
            validateFullname(),
            validateEmail(),
            validatePhone(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms()
        ].every(Boolean);

        if (!isValid) {
            return;
        }

        saveRegisterInfo();
        setLoading(true);

        window.setTimeout(() => {
            showToast();
        }, 500);

        window.setTimeout(() => {
            setLoading(false);
            window.location.href = 'login.html';
        }, 1500);
    });
})();
