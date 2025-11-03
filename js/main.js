// Main JavaScript for Prestige Car Detailing Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    function toggleMobileMenu() {
        navMenu.classList.toggle('nav__menu--active');
        navToggle.classList.toggle('nav__toggle--active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('nav__menu--active') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav__menu--active');
            navToggle.classList.remove('nav__toggle--active');
            document.body.style.overflow = '';
        });
    });

    // Smooth Scrolling for Navigation Links
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80; // Height of fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target !== '#') {
                smoothScroll(target);
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');

        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Header Background on Scroll
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    function updateHeaderBackground() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', () => {
        updateHeaderBackground();
        lastScrollY = window.scrollY;
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-prop__item, .service-card, .gallery__item, .testimonial, .faq__item');
    animateElements.forEach(el => observer.observe(el));

    // Gallery Lightbox (Simple Implementation)
    const galleryImages = document.querySelectorAll('.gallery__image');

    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            createLightbox(this.src, this.alt);
        });
    });

    function createLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox__content">
                <img src="${src}" alt="${alt}" class="lightbox__image">
                <button class="lightbox__close" aria-label="Close lightbox">&times;</button>
            </div>
        `;

        // Add lightbox styles
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .lightbox__content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox__image {
                width: 100%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            .lightbox__close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 40px;
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            .lightbox__close:hover {
                transform: scale(1.1);
            }
            @media (max-width: 767px) {
                .lightbox__content {
                    max-width: 95%;
                    max-height: 95%;
                }
                .lightbox__close {
                    top: -30px;
                    font-size: 30px;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(lightbox);

        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Close functionality
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.head.removeChild(style);
            }, 300);
        }

        lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }

    // Phone Number Click to Call (Mobile)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add tracking or analytics here if needed
            console.log('Phone call initiated:', this.href);
        });
    });

    // WhatsApp Integration
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add tracking or analytics here if needed
            console.log('WhatsApp chat initiated:', this.href);
        });
    });

    // Current Year for Footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Performance: Lazy Loading for Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Form Field Enhancements
    const formInputs = document.querySelectorAll('.form__input, .form__select, .form__textarea');

    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('form__group--focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('form__group--focused');
            }
        });

        // Check initial value
        if (input.value) {
            input.parentElement.classList.add('form__group--focused');
        }
    });

    // Add CSS for form enhancements
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        .form__group--focused .form__label {
            color: var(--accent-color);
            transform: translateY(-2px);
        }

        .form__group--focused .form__input,
        .form__group--focused .form__select,
        .form__group--focused .form__textarea {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        }

        .nav__menu--active {
            display: block !important;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(26, 26, 26, 0.98);
            backdrop-filter: blur(20px);
            padding: var(--space-8);
            z-index: 999;
        }

        .nav__menu--active .nav__list {
            flex-direction: column;
            gap: var(--space-6);
            align-items: center;
        }

        .nav__toggle--active .nav__toggle-line:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }

        .nav__toggle--active .nav__toggle-line:nth-child(2) {
            opacity: 0;
        }

        .nav__toggle--active .nav__toggle-line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -8px);
        }

        @media (min-width: 768px) {
            .nav__menu--active {
                position: static;
                background: transparent;
                backdrop-filter: none;
                padding: 0;
            }

            .nav__menu--active .nav__list {
                flex-direction: row;
                gap: var(--space-12);
                align-items: center;
            }
        }
    `;
    document.head.appendChild(formStyles);

    // Initialize page
    updateHeaderBackground();

    // Console log for debugging
    console.log('Prestige Car Detailing - Main JavaScript initialized');
});