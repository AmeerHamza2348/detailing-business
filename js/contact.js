// Prestige Car Detailing - Contact Page JavaScript
// Form validation, FAQ accordion, and enhanced contact functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page functionality
    initContactForm();
    initFAQAccordion();
    initSmoothScrolling();
    initWhatsAppFloat();
    initDateValidation();
    initPhoneFormatting();

    console.log('Contact page functionality initialized');
});

// Contact Form Validation and Submission
function initContactForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');

    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 3,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (at least 3 characters, letters only)'
        },
        phone: {
            required: true,
            pattern: /^(\+92|0092|92)?[ -]*[0-9]{3}[ -]*[0-9]{7}$/,
            message: 'Please enter a valid Pakistan phone number (e.g., +92 300-1234567)'
        },
        email: {
            required: false,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        'car-model': {
            required: true,
            minLength: 3,
            message: 'Please enter your car model and year'
        },
        package: {
            required: true,
            message: 'Please select a service package'
        },
        date: {
            required: false,
            validateDate: true,
            message: 'Please select a valid future date'
        },
        message: {
            required: false,
            maxLength: 500,
            message: 'Message should not exceed 500 characters'
        }
    };

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showMessage('Please correct the errors in the form', 'error');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Simulate API call (replace with actual endpoint)
            await simulateFormSubmission(data);

            // Show success message
            showMessage('Appointment request sent successfully! We will contact you within 2-4 hours.', 'success');

            // Reset form
            form.reset();
            inputs.forEach(input => {
                input.classList.remove('focused', 'valid');
            });

        } catch (error) {
            showMessage('Failed to send request. Please try again or call us directly.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        }
    });

    // Field validation function
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = validationRules[fieldName];

        if (!rules) return true;

        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');

        // Reset validation state
        field.classList.remove('error', 'valid');
        errorElement.style.display = 'none';

        // Check if required and empty
        if (rules.required && !value) {
            showFieldError(field, errorElement, rules.message);
            return false;
        }

        // Skip other validations if field is not required and empty
        if (!rules.required && !value) {
            return true;
        }

        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            showFieldError(field, errorElement, rules.message);
            return false;
        }

        // Check maximum length
        if (rules.maxLength && value.length > rules.maxLength) {
            showFieldError(field, errorElement, rules.message);
            return false;
        }

        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            showFieldError(field, errorElement, rules.message);
            return false;
        }

        // Check date validation
        if (rules.validateDate && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                showFieldError(field, errorElement, rules.message);
                return false;
            }
        }

        // Field is valid
        field.classList.add('valid');
        return true;
    }

    function showFieldError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Simulate form submission
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (!question || !answer) return;

        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                item.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Set initial state
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease-out';
        }
    });
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"], a.smooth-scroll');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.startsWith('#') ? href : this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// WhatsApp Floating Button
function initWhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsapp-float');
    if (!whatsappFloat) return;

    // Show/hide based on scroll
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateWhatsAppVisibility() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 500) {
            whatsappFloat.classList.add('visible');
        } else {
            whatsappFloat.classList.remove('visible');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateWhatsAppVisibility);
            ticking = true;
        }
    });

    // Pulse animation periodically
    setInterval(() => {
        if (whatsappFloat.classList.contains('visible')) {
            whatsappFloat.classList.add('pulse');
            setTimeout(() => {
                whatsappFloat.classList.remove('pulse');
            }, 1000);
        }
    }, 10000);
}

// Date Validation and Enhancement
function initDateValidation() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

    // Highlight weekends
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            // Weekend selected
            this.classList.add('weekend');
        } else {
            this.classList.remove('weekend');
        }
    });
}

// Phone Number Formatting
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    // Format phone number as user types
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove all non-digits
        let formattedValue = '';

        // Handle different Pakistan number formats
        if (value.startsWith('92')) {
            // International format: +92 XXX-XXXXXXX
            if (value.length > 2) {
                formattedValue = '+92 ' + value.substring(2, 5) + '-' + value.substring(5, 12);
            } else if (value.length > 0) {
                formattedValue = '+92' + (value.length > 2 ? ' ' : '') + value.substring(2);
            }
        } else if (value.startsWith('0')) {
            // Local format: 0XXX-XXXXXXX
            if (value.length > 4) {
                formattedValue = '0' + value.substring(1, 4) + '-' + value.substring(4, 11);
            } else {
                formattedValue = value;
            }
        } else {
            // Default formatting
            if (value.length >= 4) {
                formattedValue = value.substring(0, 4) + '-' + value.substring(4, 11);
            } else {
                formattedValue = value;
            }
        }

        // Update cursor position
        const cursorPosition = this.selectionStart;
        const oldValue = e.target.value;
        e.target.value = formattedValue;

        // Restore cursor position
        const newCursorPosition = cursorPosition + (formattedValue.length - oldValue.length);
        this.setSelectionRange(newCursorPosition, newCursorPosition);
    });

    // Add placeholder examples on focus
    phoneInput.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = 'e.g., 0300-1234567 or +92 300-1234567';
        }
    });

    phoneInput.addEventListener('blur', function() {
        this.placeholder = '+92 XXX-XXXXXXX';
    });
}

// Show message function (enhanced version)
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message--${type}`;

    const icon = type === 'success' ? '✓' : '⚠';
    const backgroundColor = type === 'success'
        ? 'linear-gradient(135deg, #10b981, #059669)'
        : 'linear-gradient(135deg, #ef4444, #dc2626)';

    messageEl.innerHTML = `
        <div class="message-content">
            <div class="message-icon">${icon}</div>
            <div class="message-text">${message}</div>
            <button class="message-close" aria-label="Close message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;

    // Add inline styles
    const style = document.createElement('style');
    style.textContent = `
        .message {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
            background: ${backgroundColor};
            color: white;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            transform: translateX(450px);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            overflow: hidden;
        }
        .message.show {
            transform: translateX(0);
        }
        .message-content {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            gap: 12px;
        }
        .message-icon {
            width: 24px;
            height: 24px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-weight: bold;
        }
        .message-text {
            flex: 1;
            font-weight: 500;
            line-height: 1.4;
        }
        .message-close {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 6px;
            padding: 4px;
            color: white;
            cursor: pointer;
            transition: background-color 0.2s;
            flex-shrink: 0;
        }
        .message-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 767px) {
            .message {
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-100px);
            }
            .message.show {
                transform: translateY(0);
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(messageEl);

    // Add close functionality
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.addEventListener('click', () => {
        messageEl.classList.remove('show');
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    });

    // Auto remove after 6 seconds
    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 6000);

    // Animate in
    setTimeout(() => messageEl.classList.add('show'), 10);
}

// Add CSS for contact page specific styles
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    /* Breadcrumb Styles */
    .breadcrumb {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--text-sm);
        color: var(--text-secondary);
        margin-bottom: var(--space-4);
    }

    .breadcrumb-link {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color var(--transition-fast);
    }

    .breadcrumb-link:hover {
        color: var(--metallic-gold);
    }

    .breadcrumb-separator {
        color: var(--text-secondary);
    }

    .breadcrumb-current {
        color: var(--metallic-gold);
        font-weight: 500;
    }

    /* Contact Form Styles */
    .contact-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
    }

    .form-group {
        position: relative;
        margin-bottom: var(--space-4);
    }

    .form-label {
        display: block;
        margin-bottom: var(--space-2);
        font-weight: 500;
        color: var(--text-primary);
    }

    .form-input,
    .form-select,
    .form-textarea {
        width: 100%;
        padding: var(--space-4);
        background: var(--tertiary-dark);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        color: var(--text-primary);
        font-family: inherit;
        font-size: var(--text-base);
        transition: all var(--transition-base);
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
        outline: none;
        border-color: var(--metallic-gold);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
    }

    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: #ef4444;
        background: rgba(239, 68, 68, 0.05);
    }

    .form-input.valid,
    .form-select.valid,
    .form-textarea.valid {
        border-color: #10b981;
        background: rgba(16, 185, 129, 0.05);
    }

    .form-error {
        display: none;
        color: #ef4444;
        font-size: var(--text-sm);
        margin-top: var(--space-2);
        font-weight: 500;
    }

    .form-notice {
        padding: var(--space-4);
        background: rgba(212, 175, 55, 0.1);
        border-left: 4px solid var(--metallic-gold);
        border-radius: var(--radius-md);
    }

    .btn-loading {
        display: flex;
        align-items: center;
        gap: var(--space-2);
    }

    /* Contact Info Styles */
    .contact-methods-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
    }

    .contact-method {
        display: flex;
        align-items: flex-start;
        gap: var(--space-4);
    }

    .contact-icon {
        width: 48px;
        height: 48px;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--metallic-gold);
        flex-shrink: 0;
    }

    .whatsapp-icon {
        background: #25D366;
        color: white;
    }

    .contact-details h4 {
        margin-bottom: var(--space-1);
        color: var(--text-primary);
    }

    .contact-link {
        color: var(--metallic-gold);
        text-decoration: none;
        font-weight: 500;
        font-size: var(--text-lg);
        transition: color var(--transition-fast);
    }

    .contact-link:hover {
        color: var(--metallic-blue);
    }

    .whatsapp-link {
        color: #25D366;
    }

    .whatsapp-link:hover {
        color: #128C7E;
    }

    /* Quick Actions */
    .action-buttons {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    .btn-whatsapp {
        background: #25D366;
        color: white;
        border: none;
    }

    .btn-whatsapp:hover {
        background: #128C7E;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(37, 211, 102, 0.3);
    }

    /* Location Styles */
    .location-details {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
    }

    .location-item {
        padding-bottom: var(--space-6);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .location-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .coverage-list {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-2);
        margin-top: var(--space-3);
    }

    .coverage-list li {
        position: relative;
        padding-left: var(--space-6);
        color: var(--text-secondary);
    }

    .coverage-list li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--metallic-gold);
        font-weight: bold;
    }

    .operating-hours {
        margin-top: var(--space-6);
    }

    .hours-grid {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-top: var(--space-4);
    }

    .hours-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-3);
        background: rgba(255, 255, 255, 0.05);
        border-radius: var(--radius-md);
    }

    .hours-item.emergency {
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid rgba(212, 175, 55, 0.3);
    }

    .days {
        font-weight: 500;
        color: var(--text-primary);
    }

    .time {
        color: var(--metallic-gold);
        font-weight: 600;
    }

    /* Map Styles */
    .map-container {
        position: relative;
        border-radius: var(--radius-xl);
        overflow: hidden;
        box-shadow: var(--shadow-xl);
    }

    .map-placeholder {
        position: relative;
        width: 100%;
        height: 450px;
    }

    .map-placeholder iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    .map-overlay {
        position: absolute;
        bottom: var(--space-6);
        left: var(--space-6);
        right: var(--space-6);
        background: rgba(10, 10, 10, 0.9);
        backdrop-filter: blur(10px);
        padding: var(--space-4);
        border-radius: var(--radius-md);
        border: 1px solid rgba(212, 175, 55, 0.3);
    }

    .map-info h4 {
        color: var(--metallic-gold);
        margin-bottom: var(--space-1);
    }

    .map-info p {
        color: var(--text-secondary);
        margin-bottom: var(--space-3);
    }

    /* FAQ Styles */
    .faq-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .faq-item {
        background: var(--secondary-dark);
        border-radius: var(--radius-xl);
        margin-bottom: var(--space-4);
        overflow: hidden;
        transition: all var(--transition-base);
    }

    .faq-item.active {
        background: var(--tertiary-dark);
        box-shadow: var(--shadow-lg);
    }

    .faq-question {
        width: 100%;
        padding: var(--space-6);
        background: none;
        border: none;
        color: var(--text-primary);
        font-family: var(--font-secondary);
        font-size: var(--text-lg);
        font-weight: 600;
        text-align: left;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all var(--transition-base);
    }

    .faq-question:hover {
        color: var(--metallic-gold);
    }

    .faq-icon {
        transition: transform var(--transition-base);
        flex-shrink: 0;
        margin-left: var(--space-4);
    }

    .faq-answer {
        padding: 0 var(--space-6) 0 var(--space-6);
        color: var(--text-secondary);
        line-height: 1.6;
    }

    .faq-answer ul {
        margin: var(--space-4) 0;
        padding-left: var(--space-6);
    }

    .faq-answer li {
        margin-bottom: var(--space-2);
    }

    .faq-answer strong {
        color: var(--metallic-gold);
    }

    /* WhatsApp Floating Button */
    .whatsapp-float {
        position: fixed;
        bottom: var(--space-6);
        right: var(--space-6);
        z-index: var(--z-fixed);
        opacity: 0;
        visibility: hidden;
        transform: translateY(100px);
        transition: all var(--transition-base);
    }

    .whatsapp-float.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .whatsapp-float.pulse {
        animation: whatsappPulse 1s ease-in-out;
    }

    @keyframes whatsappPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    .whatsapp-float a {
        width: 60px;
        height: 60px;
        background: #25D366;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
        transition: all var(--transition-base);
    }

    .whatsapp-float a:hover {
        transform: scale(1.1);
        box-shadow: 0 15px 40px rgba(37, 211, 102, 0.5);
    }

    /* Date Input Weekend Styling */
    .form-input.weekend {
        border-color: #f59e0b;
        background: rgba(245, 158, 11, 0.05);
    }

    /* Responsive Adjustments */
    @media (max-width: 767px) {
        .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }

        .location-grid {
            grid-template-columns: 1fr;
        }

        .coverage-list {
            grid-template-columns: 1fr;
        }

        .map-placeholder {
            height: 300px;
        }

        .whatsapp-float {
            bottom: var(--space-4);
            right: var(--space-4);
        }

        .whatsapp-float a {
            width: 50px;
            height: 50px;
        }

        .faq-question {
            font-size: var(--text-base);
            padding: var(--space-4);
        }

        .faq-answer {
            padding: 0 var(--space-4) var(--space-4) var(--space-4);
        }
    }

    @media (max-width: 479px) {
        .contact-method {
            flex-direction: column;
            text-align: center;
            gap: var(--space-3);
        }

        .contact-icon {
            margin: 0 auto;
        }

        .action-buttons {
            gap: var(--space-3);
        }

        .hours-item {
            flex-direction: column;
            text-align: center;
            gap: var(--space-1);
        }
    }
`;

document.head.appendChild(contactStyles);