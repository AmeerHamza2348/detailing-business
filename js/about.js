// Prestige Car Detailing - About Page JavaScript
// Animated statistics and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize about page functionality
    initAnimatedStatistics();
    initTeamInteractions();
    initScrollAnimations();

    console.log('About page functionality initialized');
});

// Animated Statistics Counter
function initAnimatedStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');

    // Configuration for each statistic
    const statConfig = {
        1000: { duration: 2000, suffix: '+' },
        5: { duration: 1500, suffix: '+' },
        4.9: { duration: 1800, suffix: '/5', decimal: true }
    };

    // Create intersection observer for statistics
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const targetValue = parseFloat(statElement.getAttribute('data-target'));
                const config = statConfig[targetValue];

                if (config && !statElement.classList.contains('animated')) {
                    animateNumber(statElement, targetValue, config);
                    statElement.classList.add('animated');
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all stat numbers
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Animate number counting
function animateNumber(element, target, config) {
    const startTime = performance.now();
    const startValue = 0;
    const duration = config.duration;

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (target - startValue) * easeOutQuart;

        // Format the number based on configuration
        let formattedValue;
        if (config.decimal) {
            formattedValue = currentValue.toFixed(1);
        } else {
            formattedValue = Math.floor(currentValue).toLocaleString();
        }

        // Update the element content
        element.textContent = formattedValue;

        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Add suffix when animation completes
            if (config.suffix) {
                element.textContent = formattedValue + config.suffix;
            }
        }
    }

    // Start the animation
    requestAnimationFrame(updateNumber);
}

// Team Member Interactions
function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        const image = member.querySelector('.member-image');
        const overlay = member.querySelector('.member-overlay');
        const socialLinks = member.querySelectorAll('.social-links a');

        // Enhanced hover effects
        image.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });

        image.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(10px)';
        });

        // Social link interactions
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Click to view more info (optional enhancement)
        image.addEventListener('click', function() {
            const memberName = member.querySelector('h3').textContent;
            const memberTitle = member.querySelector('.member-title').textContent;
            const memberBio = member.querySelector('.member-bio').textContent;

            // You could expand this to open a modal with more details
            console.log(`Team member clicked: ${memberName} - ${memberTitle}`);
        });
    });
}

// Enhanced scroll animations for about page
function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        animateElementsOnScroll();
        return;
    }

    // Enhanced observer with staggered animations
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');

                    // Special handling for value cards
                    if (entry.target.classList.contains('value-card')) {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.opacity = '1';
                    }

                    // Special handling for expertise items
                    if (entry.target.classList.contains('expertise-item')) {
                        animateExpertiseItem(entry.target);
                    }
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe various elements with different delays
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el, index) => {
        // Add staggered delays
        if (el.classList.contains('stagger-item')) {
            el.dataset.delay = (index * 150) + 'ms';
        }
        enhancedObserver.observe(el);
    });
}

// Animate expertise items with special effects
function animateExpertiseItem(item) {
    const number = item.querySelector('.expertise-number');
    const text = item.querySelector('.expertise-text');

    // Animate the number first
    if (number) {
        number.style.transform = 'scale(1.2)';
        number.style.color = 'var(--metallic-gold)';

        setTimeout(() => {
            number.style.transform = 'scale(1)';
            number.style.color = 'var(--text-primary)';
        }, 300);
    }

    // Then animate the text
    if (text) {
        text.style.transform = 'translateX(20px)';
        text.style.opacity = '0';

        setTimeout(() => {
            text.style.transform = 'translateX(0)';
            text.style.opacity = '1';
        }, 200);
    }
}

// Fallback animation for older browsers
function animateElementsOnScroll() {
    const animateElements = document.querySelectorAll('.animate-on-scroll, .stagger-item');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        animateElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
}

// Add CSS for about page specific animations
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
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

    /* Story Section Styles */
    .story-grid {
        gap: var(--space-12);
        align-items: center;
    }

    .story-text {
        font-size: var(--text-lg);
        line-height: 1.8;
    }

    .story-text strong {
        color: var(--metallic-gold);
        font-weight: 600;
    }

    .image-container {
        position: relative;
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: var(--shadow-xl);
    }

    .story-img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform var(--transition-slow);
    }

    .image-container:hover .story-img {
        transform: scale(1.05);
    }

    .image-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(10, 10, 10, 0.9));
        padding: var(--space-8);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .overlay-text .year {
        font-family: var(--font-display);
        font-size: var(--text-3xl);
        color: var(--metallic-gold);
        display: block;
        margin-bottom: var(--space-2);
    }

    .overlay-text .tagline {
        font-size: var(--text-lg);
        color: var(--text-primary);
        font-weight: 500;
    }

    /* Value Cards */
    .value-card {
        text-align: center;
        padding: var(--space-10);
        transition: all var(--transition-base);
        opacity: 0;
        transform: translateY(30px);
    }

    .value-card.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    .value-icon {
        width: 80px;
        height: 80px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--space-6);
        color: var(--primary-dark);
        box-shadow: var(--shadow-gold);
        transition: transform var(--transition-base);
    }

    .value-card:hover .value-icon {
        transform: scale(1.1) rotate(5deg);
    }

    .value-card h3 {
        font-size: var(--text-2xl);
        margin-bottom: var(--space-4);
        color: var(--metallic-gold);
    }

    .value-card p {
        font-size: var(--text-lg);
        line-height: 1.6;
        color: var(--text-secondary);
    }

    /* Expertise Section */
    .expertise-item {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        padding: var(--space-8);
        background: var(--secondary-dark);
        border-radius: var(--radius-xl);
        transition: all var(--transition-base);
    }

    .expertise-item:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
        border: 1px solid rgba(212, 175, 55, 0.2);
    }

    .expertise-number {
        font-family: var(--font-display);
        font-size: var(--text-5xl);
        font-weight: 400;
        color: var(--metallic-gold);
        min-width: 120px;
        text-align: center;
        transition: all var(--transition-base);
    }

    .expertise-text h3 {
        font-size: var(--text-xl);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
    }

    .expertise-text p {
        color: var(--text-secondary);
        line-height: 1.6;
    }

    /* Team Section */
    .team-member {
        text-align: center;
        transition: transform var(--transition-base);
    }

    .team-member:hover {
        transform: translateY(-10px);
    }

    .member-image {
        position: relative;
        width: 250px;
        height: 250px;
        margin: 0 auto var(--space-6);
        border-radius: 50%;
        overflow: hidden;
        box-shadow: var(--shadow-lg);
    }

    .member-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
    }

    .member-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(212, 175, 55, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(10px);
        transition: all var(--transition-base);
    }

    .social-links {
        display: flex;
        gap: var(--space-4);
    }

    .social-links a {
        width: 45px;
        height: 45px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-dark);
        transition: all var(--transition-base);
    }

    .social-links a:hover {
        background: var(--primary-dark);
        color: var(--metallic-gold);
    }

    .member-info h3 {
        font-size: var(--text-xl);
        margin-bottom: var(--space-2);
        color: var(--text-primary);
    }

    .member-title {
        color: var(--metallic-gold);
        font-weight: 500;
        margin-bottom: var(--space-4);
        font-size: var(--text-base);
    }

    .member-bio {
        color: var(--text-secondary);
        line-height: 1.6;
    }

    /* Statistics Section */
    .stats-section {
        background: var(--gradient-dark);
    }

    .stat-item {
        text-align: center;
        padding: var(--space-8);
    }

    .stat-number {
        font-family: var(--font-display);
        font-size: var(--text-5xl);
        font-weight: 400;
        color: var(--metallic-gold);
        margin-bottom: var(--space-4);
        display: block;
        text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
    }

    .stat-label {
        font-size: var(--text-lg);
        color: var(--text-primary);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    /* Story Image Parallax Effect */
    .parallax-element {
        transform: translateZ(0);
        will-change: transform;
    }

    /* Mobile Responsive Adjustments */
    @media (max-width: 767px) {
        .story-grid {
            grid-template-columns: 1fr;
            gap: var(--space-8);
        }

        .expertise-item {
            flex-direction: column;
            text-align: center;
            gap: var(--space-4);
        }

        .expertise-number {
            min-width: auto;
            font-size: var(--text-4xl);
        }

        .member-image {
            width: 200px;
            height: 200px;
        }

        .stat-number {
            font-size: var(--text-4xl);
        }

        .value-card {
            padding: var(--space-6);
        }

        .value-icon {
            width: 60px;
            height: 60px;
        }
    }

    @media (max-width: 479px) {
        .story-text {
            font-size: var(--text-base);
        }

        .overlay-text .year {
            font-size: var(--text-2xl);
        }

        .value-card h3 {
            font-size: var(--text-xl);
        }

        .value-card p {
            font-size: var(--text-base);
        }

        .stat-number {
            font-size: var(--text-3xl);
        }

        .stat-label {
            font-size: var(--text-base);
        }
    }

    /* Loading State for Statistics */
    .stat-number:not(.animated) {
        opacity: 0.3;
    }

    .stat-number.animated {
        opacity: 1;
        transition: opacity 0.5s ease;
    }

    /* Enhanced Card Animations */
    .card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .card:hover {
        transform: translateY(-12px) rotateX(2deg);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    }

    /* Smooth Transitions */
    * {
        transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
    }
`;

document.head.appendChild(aboutStyles);