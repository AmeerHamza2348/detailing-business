// Prestige Car Detailing - Main JavaScript
// Modern, interactive elements with smooth animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initHeaderEffects();
    initFormInteractions();
    initLazyLoading();

    console.log('Prestige Car Detailing - Initialized');
});

// Navigation System
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('mobile-active');

            navMenu.classList.toggle('mobile-active');
            navToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? '' : 'hidden';
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navMenu.classList.remove('mobile-active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link highlighting based on scroll position
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');

            if (navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('mobile-active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Effects on Scroll
function initHeaderEffects() {
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // Add scrolled class for background changes
        if (currentScrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        animateElementsOnScroll();
        return;
    }

    // Options for the observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add stagger effect for items with 'stagger-item' class
                if (entry.target.classList.contains('stagger-item')) {
                    const parent = entry.target.parentElement;
                    const siblings = parent.querySelectorAll('.stagger-item');
                    siblings.forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => fadeObserver.observe(el));

    // Observe all stagger items
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach(el => fadeObserver.observe(el));
}

// Fallback animation for older browsers
function animateElementsOnScroll() {
    const animateElements = document.querySelectorAll('.animate-on-scroll, .stagger-item');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
}

// Form Interactions
function initFormInteractions() {
    // Enhanced form inputs
    const inputs = document.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check initial value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Form validation feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });
}

// Handle form submission
function handleFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showMessage('Thank you for your inquiry! We will contact you within 24 hours.', 'success');

        // Reset form
        form.reset();

        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Remove focus classes
        form.querySelectorAll('.focused').forEach(el => el.classList.remove('focused'));
    }, 2000);
}

// Show message (success/error)
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message--${type}`;
    messageEl.innerHTML = `
        <div class="message-content">
            ${type === 'success' ? '✓' : '⚠'} ${message}
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .message {
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        .message--success {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
        }
        .message--error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
        }
        .message.show {
            transform: translateX(0);
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

    // Animate in
    setTimeout(() => messageEl.classList.add('show'), 10);

    // Auto remove after 5 seconds
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
    }, 5000);
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Add fade-in effect
                    img.classList.add('loaded');

                    // Stop observing this image
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observe all images with data-src
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
const optimizedScroll = throttle(() => {
    // Scroll-based animations that need to be performant
    updateActiveNavLink();
}, 16); // ~60fps

// Add optimized scroll listener
window.addEventListener('scroll', optimizedScroll, { passive: true });

// Parallax effect for hero section (desktop only)
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    // Only enable on desktop
    if (window.innerWidth > 1024) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, 16));
    }
}

// Initialize parallax when page loads
window.addEventListener('load', initParallax);

// Re-initialize on resize
const optimizedResize = debounce(() => {
    // Re-initialize responsive features
    initParallax();
}, 250);

window.addEventListener('resize', optimizedResize);

// Add loaded class to body for page transitions
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// CSS for page transitions
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    body.loaded {
        opacity: 1;
    }
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .stagger-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
    }
    .stagger-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(transitionStyles);