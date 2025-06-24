document.addEventListener('DOMContentLoaded', function () {
    // Form switcher
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const successMessage = document.getElementById('successMessage');

    showRegister.addEventListener('click', function () {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        showRegister.classList.add('active');
        showLogin.classList.remove('active');
    });

    showLogin.addEventListener('click', function () {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        showLogin.classList.add('active');
        showRegister.classList.remove('active');
    });

    // Password toggle functionality
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Country-City dependency
    const countrySelect = document.getElementById('userCountry');
    const citySelect = document.getElementById('userCity');

    const cities = {
        ukraine: ['Kyiv', 'Lviv', 'Kharkiv', 'Odesa', 'Dnipro'],
        moldova: ['Chisinau', 'Tiraspol', 'Balti', 'Bender', 'Cahul'],
        poland: ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw', 'Poznan']
    };

    countrySelect.addEventListener('change', function () {
        if (this.value) {
            citySelect.disabled = false;
            citySelect.innerHTML = '<option value="">Select city</option>';

            cities[this.value].forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase();
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Select city</option>';
        }
    });

    // Registration form validation
    const regForm = document.getElementById('regForm');

    regForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Validate all fields again on submit
        isValid = validateFirstName() && isValid;
        isValid = validateLastName() && isValid;
        isValid = validateEmail() && isValid;
        isValid = validatePassword() && isValid;
        isValid = validateConfirmPassword() && isValid;
        isValid = validatePhone() && isValid;
        isValid = validateBirthDate() && isValid;
        isValid = validateSex() && isValid;
        isValid = validateCountry() && isValid;
        isValid = validateCity() && isValid;

        if (isValid) {
            // Form is valid, show success message and reset form
            successMessage.style.display = 'block';
            regForm.reset();
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Select city</option>';

            // Reset all valid states
            document.querySelectorAll('#regForm input, #regForm select').forEach(el => {
                el.classList.remove('valid', 'invalid');
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

// Individual validation functions
    function validateFirstName() {
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        if (!firstName.value || firstName.value.length < 3 || firstName.value.length > 15) {
            firstName.classList.add('invalid');
            firstName.classList.remove('valid');
            firstNameError.textContent = 'First name must be between 3 and 15 characters';
            firstNameError.style.display = 'block';
            return false;
        } else {
            firstName.classList.add('valid');
            firstName.classList.remove('invalid');
            firstNameError.style.display = 'none';
            return true;
        }
    }

    function validateLastName() {
        const lastName = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        if (!lastName.value || lastName.value.length < 3 || lastName.value.length > 15) {
            lastName.classList.add('invalid');
            lastName.classList.remove('valid');
            lastNameError.textContent = 'Last name must be between 3 and 15 characters';
            lastNameError.style.display = 'block';
            return false;
        } else {
            lastName.classList.add('valid');
            lastName.classList.remove('invalid');
            lastNameError.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value || !emailRegex.test(email.value)) {
            email.classList.add('invalid');
            email.classList.remove('valid');
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            email.classList.add('valid');
            email.classList.remove('invalid');
            emailError.style.display = 'none';
            return true;
        }
    }

    function validatePassword() {
        const password = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        if (!password.value || password.value.length < 6) {
            password.classList.add('invalid');
            password.classList.remove('valid');
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordError.style.display = 'block';
            return false;
        } else {
            password.classList.add('valid');
            password.classList.remove('invalid');
            passwordError.style.display = 'none';
            return true;
        }
    }

    function validateConfirmPassword() {
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const password = document.getElementById('password').value;
        if (!confirmPassword.value || confirmPassword.value !== password) {
            confirmPassword.classList.add('invalid');
            confirmPassword.classList.remove('valid');
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.style.display = 'block';
            return false;
        } else {
            confirmPassword.classList.add('valid');
            confirmPassword.classList.remove('invalid');
            confirmPasswordError.style.display = 'none';
            return true;
        }
    }

    function validatePhone() {
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phoneRegex = /^\+380\d{9}$/;
        if (!phone.value || !phoneRegex.test(phone.value)) {
            phone.classList.add('invalid');
            phone.classList.remove('valid');
            phoneError.textContent = 'Please enter a valid Ukrainian phone number (+380XXXXXXXXX)';
            phoneError.style.display = 'block';
            return false;
        } else {
            phone.classList.add('valid');
            phone.classList.remove('invalid');
            phoneError.style.display = 'none';
            return true;
        }
    }

    function validateBirthDate() {
        const birthDate = document.getElementById('birthDate');
        const birthDateError = document.getElementById('birthDateError');
        if (!birthDate.value) {
            birthDate.classList.add('invalid');
            birthDate.classList.remove('valid');
            birthDateError.textContent = 'Please enter your birth date';
            birthDateError.style.display = 'block';
            return false;
        } else {
            const today = new Date();
            const birthDateObj = new Date(birthDate.value);
            const age = today.getFullYear() - birthDateObj.getFullYear();

            if (birthDateObj > today) {
                birthDate.classList.add('invalid');
                birthDate.classList.remove('valid');
                birthDateError.textContent = 'Birth date cannot be in the future';
                birthDateError.style.display = 'block';
                return false;
            } else if (age < 12) {
                birthDate.classList.add('invalid');
                birthDate.classList.remove('valid');
                birthDateError.textContent = 'You must be at least 12 years old to register';
                birthDateError.style.display = 'block';
                return false;
            } else {
                birthDate.classList.add('valid');
                birthDate.classList.remove('invalid');
                birthDateError.style.display = 'none';
                return true;
            }
        }
    }

    function validateSex() {
        const userSex = document.getElementById('userSex');
        const userSexError = document.getElementById('userSexError');
        if (!userSex.value) {
            userSex.classList.add('invalid');
            userSex.classList.remove('valid');
            userSexError.textContent = 'Please select your sex';
            userSexError.style.display = 'block';
            return false;
        } else {
            userSex.classList.add('valid');
            userSex.classList.remove('invalid');
            userSexError.style.display = 'none';
            return true;
        }
    }

    function validateCountry() {
        const userCountry = document.getElementById('userCountry');
        const userCountryError = document.getElementById('userCountryError');
        if (!userCountry.value) {
            userCountry.classList.add('invalid');
            userCountry.classList.remove('valid');
            userCountryError.textContent = 'Please select your country';
            userCountryError.style.display = 'block';
            return false;
        } else {
            userCountry.classList.add('valid');
            userCountry.classList.remove('invalid');
            userCountryError.style.display = 'none';
            return true;
        }
    }

    function validateCity() {
        const userCity = document.getElementById('userCity');
        const userCityError = document.getElementById('userCityError');
        if (!userCity.value) {
            userCity.classList.add('invalid');
            userCity.classList.remove('valid');
            userCityError.textContent = 'Please select your city';
            userCityError.style.display = 'block';
            return false;
        } else {
            userCity.classList.add('valid');
            userCity.classList.remove('invalid');
            userCityError.style.display = 'none';
            return true;
        }
    }

    // Login form validation
    const logForm = document.getElementById('logForm');

    logForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Username validation
        const username = document.getElementById('username');
        const usernameError = document.getElementById('usernameError');
        if (!username.value) {
            username.classList.add('invalid');
            username.classList.remove('valid');
            usernameError.textContent = 'Username is required';
            usernameError.style.display = 'block';
            isValid = false;
        } else {
            username.classList.add('valid');
            username.classList.remove('invalid');
            usernameError.style.display = 'none';
        }

        // Password validation
        const loginPassword = document.getElementById('loginPassword');
        const loginPasswordError = document.getElementById('loginPasswordError');
        if (!loginPassword.value || loginPassword.value.length < 6) {
            loginPassword.classList.add('invalid');
            loginPassword.classList.remove('valid');
            loginPasswordError.textContent = 'Password must be at least 6 characters';
            loginPasswordError.style.display = 'block';
            isValid = false;
        } else {
            loginPassword.classList.add('valid');
            loginPassword.classList.remove('invalid');
            loginPasswordError.style.display = 'none';
        }

        if (isValid) {
            // Form is valid, you can proceed with login
            alert('Login successful!');
            logForm.reset();
        }
    });
});
