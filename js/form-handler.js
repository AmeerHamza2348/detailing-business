// Form Handler for Prestige Car Detailing
// Handles form validation, submission, and user feedback

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');

    if (!bookingForm) {
        console.log('Booking form not found');
        return;
    }

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (2-50 characters, letters only)'
        },
        phone: {
            required: true,
            pattern: /^(\+92|0092|03)?[0-9]{2,3}[0-9]{7}$/,
            message: 'Please enter a valid Pakistan phone number (e.g., +92 XXX-XXXXXXX or 03XX-XXXXXXX)'
        },
        email: {
            required: false,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        car: {
            required: true,
            minLength: 3,
            maxLength: 100,
            message: 'Please enter your car make and model (3-100 characters)'
        },
        service: {
            required: true,
            message: 'Please select a service package'
        },
        date: {
            required: false,
            message: 'Please select a preferred date'
        },
        message: {
            required: false,
            maxLength: 500,
            message: 'Additional notes must be less than 500 characters'
        }
    };

    // Form state management
    let formState = {
        isSubmitting: false,
        formData: {},
        errors: {}
    };

    // Load saved form data from localStorage
    function loadFormData() {
        const savedData = localStorage.getItem('prestigeFormData');
        if (savedData) {
            try {
                formState.formData = JSON.parse(savedData);
                populateForm(formState.formData);
            } catch (e) {
                console.error('Error loading saved form data:', e);
            }
        }
    }

    // Save form data to localStorage
    function saveFormData() {
        const formData = new FormData(bookingForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        localStorage.setItem('prestigeFormData', JSON.stringify(data));
    }

    // Populate form with saved data
    function populateForm(data) {
        Object.keys(data).forEach(key => {
            const field = bookingForm.querySelector(`[name="${key}"]`);
            if (field && data[key]) {
                field.value = data[key];
                // Trigger change event for form enhancement
                field.dispatchEvent(new Event('input'));
            }
        });
    }

    // Validate single field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true };

        // Check if required and empty
        if (rules.required && (!value || value.trim() === '')) {
            return { isValid: false, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` };
        }

        // Skip validation if not required and empty
        if (!rules.required && (!value || value.trim() === '')) {
            return { isValid: true };
        }

        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: rules.message };
        }

        // Check maximum length
        if (rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: rules.message };
        }

        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: rules.message };
        }

        return { isValid: true };
    }

    // Format phone number as user types
    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');

        // Handle different formats
        if (value.startsWith('92')) {
            // International format: +92 XXX-XXXXXXX
            if (value.length <= 2) {
                value = '+92';
            } else if (value.length <= 5) {
                value = '+92 ' + value.slice(2);
            } else {
                value = '+92 ' + value.slice(2, 5) + '-' + value.slice(5, 12);
            }
        } else if (value.startsWith('00')) {
            // Alternative international format
            if (value.length <= 4) {
                value = '0092';
            } else if (value.length <= 7) {
                value = '0092 ' + value.slice(4);
            } else {
                value = '0092 ' + value.slice(4, 7) + '-' + value.slice(7, 14);
            }
        } else if (value.startsWith('0')) {
            // Local format: 03XX-XXXXXXX
            if (value.length <= 4) {
                value = value;
            } else {
                value = value.slice(0, 4) + '-' + value.slice(4, 11);
            }
        } else {
            // Handle other cases
            if (value.length > 0 && !value.startsWith('0') && !value.startsWith('9')) {
                value = '0' + value;
            }
            if (value.length <= 4) {
                value = value;
            } else {
                value = value.slice(0, 4) + '-' + value.slice(4, 11);
            }
        }

        input.value = value;
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const field = bookingForm.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        // Remove existing error
        removeFieldError(fieldName);

        // Add error styling
        field.classList.add('form__input--error');

        // Create error message
        const errorElement = document.createElement('div');
        errorElement.className = 'form__error';
        errorElement.textContent = message;
        errorElement.setAttribute('data-field', fieldName);

        // Insert error message
        field.parentNode.appendChild(errorElement);

        // Store error
        formState.errors[fieldName] = message;
    }

    // Remove field error
    function removeFieldError(fieldName) {
        const field = bookingForm.querySelector(`[name="${fieldName}"]`);
        if (!field) return;

        field.classList.remove('form__input--error');

        const errorElement = field.parentNode.querySelector('.form__error');
        if (errorElement) {
            errorElement.remove();
        }

        delete formState.errors[fieldName];
    }

    // Show form message
    function showFormMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = bookingForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message message message--${type}`;
        messageElement.textContent = message;

        // Insert at the top of the form
        bookingForm.insertBefore(messageElement, bookingForm.firstChild);

        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageElement.remove();
                }
            }, 5000);
        }
    }

    // Validate entire form
    function validateForm() {
        const formData = new FormData(bookingForm);
        let isValid = true;
        formState.errors = {};

        // Validate each field
        for (let [fieldName, value] of formData.entries()) {
            const validation = validateField(fieldName, value);
            if (!validation.isValid) {
                showFieldError(fieldName, validation.message);
                isValid = false;
            } else {
                removeFieldError(fieldName);
            }
        }

        return isValid;
    }

    // Handle form submission
    async function handleFormSubmit(event) {
        event.preventDefault();

        if (formState.isSubmitting) {
            console.log('Form is already being submitted');
            return;
        }

        // Validate form
        if (!validateForm()) {
            showFormMessage('Please correct the errors below and try again.', 'error');

            // Scroll to first error
            const firstErrorField = bookingForm.querySelector('.form__input--error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
            return;
        }

        // Set submitting state
        formState.isSubmitting = true;
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Submitting...';
        submitButton.disabled = true;

        try {
            // Prepare form data
            const formData = new FormData(bookingForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Add metadata
            data.submitted_at = new Date().toISOString();
            data.source = 'prestige_car_detailing_website';

            // In a real implementation, you would send this to your backend
            // For now, we'll simulate a successful submission
            console.log('Form submission data:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            showFormMessage('Thank you for your inquiry! We will contact you within 24 hours to confirm your detailing session.', 'success');

            // Clear form and localStorage
            bookingForm.reset();
            localStorage.removeItem('prestigeFormData');

            // Clear any remaining field errors
            Object.keys(formState.errors).forEach(fieldName => {
                removeFieldError(fieldName);
            });

            // Track conversion (Google Analytics, etc.)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Booking Form'
                });
            }

            console.log('Form submitted successfully');

        } catch (error) {
            console.error('Form submission error:', error);
            showFormMessage('An error occurred while submitting your request. Please try again or call us directly.', 'error');
        } finally {
            // Reset submitting state
            formState.isSubmitting = false;
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    }

    // Add event listeners
    bookingForm.addEventListener('submit', handleFormSubmit);

    // Add input validation for all fields
    const formFields = bookingForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        // Validate on blur
        field.addEventListener('blur', () => {
            const validation = validateField(field.name, field.value);
            if (!validation.isValid) {
                showFieldError(field.name, validation.message);
            } else {
                removeFieldError(field.name);
            }
        });

        // Clear error on input
        field.addEventListener('input', () => {
            if (formState.errors[field.name]) {
                removeFieldError(field.name);
            }
        });

        // Special handling for phone number formatting
        if (field.name === 'phone') {
            field.addEventListener('input', () => {
                formatPhoneNumber(field);
                saveFormData(); // Save on every input
            });
        } else {
            // Save form data on input
            field.addEventListener('input', saveFormData);
        }

        // Save form data on change
        field.addEventListener('change', saveFormData);
    });

    // Add CSS for form styles
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        .form__input--error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }

        .form__error {
            color: #ef4444;
            font-size: var(--text-sm);
            margin-top: var(--space-2);
            font-family: var(--font-primary);
            font-weight: 500;
        }

        .form-message {
            padding: var(--space-4);
            border-radius: var(--radius-md);
            margin-bottom: var(--space-6);
            text-align: center;
            font-family: var(--font-primary);
            font-weight: 500;
            animation: slideDown 0.3s ease-out;
        }

        .form-message.success {
            background: rgba(34, 197, 94, 0.2);
            color: #22c55e;
            border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .form-message.error {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .form__input:focus:invalid,
        .form__select:focus:invalid,
        .form__textarea:focus:invalid {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Loading spinner animation */
        .loading {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            border-top-color: var(--accent-color);
            animation: spin 1s linear infinite;
            margin-right: var(--space-2);
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Phone input styling */
        input[name="phone"] {
            letter-spacing: 0.05em;
        }

        /* Date input styling */
        input[type="date"] {
            color-scheme: dark;
        }

        /* Focus indicators */
        .form__input:focus,
        .form__select:focus,
        .form__textarea:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
        }

        /* Disabled state */
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }

        button:disabled:hover {
            transform: none !important;
        }
    `;
    document.head.appendChild(formStyles);

    // Set minimum date to today for date input
    const dateInput = bookingForm.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Load saved form data on page load
    loadFormData();

    console.log('Form handler initialized for Prestige Car Detailing');
});