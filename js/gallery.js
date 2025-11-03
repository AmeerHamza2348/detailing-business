// Prestige Car Detailing - Gallery JavaScript
// Gallery filtering, lightbox functionality, and before/after comparisons

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery functionality
    initGalleryFilters();
    initLightbox();
    initBeforeAfterSliders();
    initLoadMore();
    initGalleryAnimations();

    console.log('Gallery functionality initialized');
});

// Gallery Filtering System
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    // Add animation
                    item.classList.add('animate-fade-in-up');
                    setTimeout(() => {
                        item.classList.remove('animate-fade-in-up');
                    }, 600);
                } else {
                    item.style.display = 'none';
                }
            });

            // Re-initialize animations for visible items
            reinitializeScrollAnimations();
        });
    });
}

// Lightbox Modal System
function initLightbox() {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxClose = document.getElementById('lightbox-close');
    const viewButtons = document.querySelectorAll('.view-btn');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');

    let currentIndex = 0;
    let galleryData = [];

    // Collect gallery data
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach((card, index) => {
        const beforeImg = card.querySelector('.before-image');
        const afterImg = card.querySelector('.after-image');
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;

        galleryData.push({
            before: beforeImg.src,
            after: afterImg.src,
            title: title,
            description: description
        });
    });

    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        const data = galleryData[index];

        document.getElementById('lightbox-before').src = data.before;
        document.getElementById('lightbox-after').src = data.after;
        document.getElementById('lightbox-title').textContent = data.title;
        document.getElementById('lightbox-description').textContent = data.description;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize comparison slider
        initLightboxComparison();
    }

    // Close lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigate to previous image
    function previousImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        openLightbox(currentIndex);
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        openLightbox(currentIndex);
    }

    // Event listeners
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', previousImage);
    nextButton.addEventListener('click', nextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const lightboxContent = lightboxModal.querySelector('.lightbox-content');

    lightboxContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightboxContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left - next image
            } else {
                previousImage(); // Swipe right - previous image
            }
        }
    }
}

// Before/After Comparison Sliders
function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.image-comparison-slider');

    sliders.forEach(slider => {
        const container = slider.parentElement;
        const beforeImg = container.querySelector('.before-image');
        const afterImg = container.querySelector('.after-image');
        const handle = slider.querySelector('.slider-handle');

        let isDragging = false;
        let currentX = 50; // Start at 50%

        function updateSlider(x) {
            const rect = container.getBoundingClientRect();
            const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));

            currentX = percentage;
            slider.style.left = percentage + '%';
            beforeImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
            afterImg.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        }

        // Mouse events
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSlider(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSlider(e.touches[0].clientX);
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Initialize slider position
        updateSlider(container.getBoundingClientRect().left + (container.offsetWidth / 2));
    });
}

// Lightbox comparison slider
function initLightboxComparison() {
    const lightboxSlider = document.getElementById('lightbox-slider');
    const container = lightboxSlider.parentElement;
    const beforeImg = document.getElementById('lightbox-before');
    const afterImg = document.getElementById('lightbox-after');
    const handle = lightboxSlider.querySelector('.slider-handle');

    let isDragging = false;
    let currentX = 50;

    function updateLightboxSlider(x) {
        const rect = container.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));

        currentX = percentage;
        lightboxSlider.style.left = percentage + '%';
        beforeImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        afterImg.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    }

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateLightboxSlider(e.clientX);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            updateLightboxSlider(e.touches[0].clientX);
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Initialize position
    updateLightboxSlider(container.getBoundingClientRect().left + (container.offsetWidth / 2));
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;

    let page = 2; // Start from page 2 since we already have initial items

    loadMoreBtn.addEventListener('click', function() {
        const button = this;
        const originalText = button.innerHTML;

        // Show loading state
        button.innerHTML = '<span class="loading"></span> Loading...';
        button.disabled = true;

        // Simulate loading more items (replace with actual API call)
        setTimeout(() => {
            const newItems = generateMoreGalleryItems(page);
            addGalleryItems(newItems);

            page++;

            // Reset button
            button.innerHTML = originalText;
            button.disabled = false;

            // If we've reached the end, hide the button
            if (page > 4) { // Simulate max 4 pages
                button.style.display = 'none';
            }

            // Re-initialize animations for new items
            reinitializeScrollAnimations();
        }, 1000);
    });
}

// Generate more gallery items (simulated)
function generateMoreGalleryItems(page) {
    const items = [];
    const categories = ['exterior', 'interior', 'ceramic', 'ppf'];
    const cars = [
        { name: 'Tesla Model 3', service: 'Paint Correction & Ceramic' },
        { name: 'Lexus RX350', service: 'Full Interior Detailing' },
        { name: 'Ford Mustang', service: 'Paint Protection Film' },
        { name: 'Mazda CX-5', service: 'Exterior Restoration' },
        { name: 'Hyundai Elantra', service: 'Complete Detail Package' },
        { name: 'Nissan Altima', service: 'Leather Interior Treatment' }
    ];

    for (let i = 0; i < 3; i++) {
        const carIndex = ((page - 2) * 3 + i) % cars.length;
        const categoryIndex = ((page - 2) * 3 + i) % categories.length;

        items.push({
            before: `https://picsum.photos/seed/${cars[carIndex].name.toLowerCase().replace(/\s+/g, '')}before${page}${i}/400/300.jpg`,
            after: `https://picsum.photos/seed/${cars[carIndex].name.toLowerCase().replace(/\s+/g, '')}after${page}${i}/400/300.jpg`,
            title: cars[carIndex].name,
            description: cars[carIndex].service,
            category: categories[categoryIndex]
        });
    }

    return items;
}

// Add new gallery items to the grid
function addGalleryItems(items) {
    const galleryGrid = document.getElementById('gallery-grid');
    let currentCount = galleryGrid.children.length;

    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item animate-on-scroll stagger-item';
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.setAttribute('data-index', currentCount + index);

        const serviceTag = getCategoryName(item.category);

        galleryItem.innerHTML = `
            <div class="gallery-card" data-index="${currentCount + index}">
                <div class="gallery-image-container">
                    <img src="${item.before}"
                         alt="${item.title} - Before detailing"
                         class="gallery-image before-image"
                         loading="lazy">
                    <img src="${item.after}"
                         alt="${item.title} - After detailing"
                         class="gallery-image after-image"
                         loading="lazy">
                    <div class="image-comparison-slider">
                        <div class="slider-handle">
                            <span></span>
                        </div>
                    </div>
                    <div class="gallery-overlay">
                        <button class="view-btn" aria-label="View full size">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="service-tag ${item.category}">${serviceTag}</span>
                </div>
            </div>
        `;

        galleryGrid.appendChild(galleryItem);
    });

    // Re-initialize sliders for new items
    initBeforeAfterSliders();

    // Re-initialize view buttons
    const newViewButtons = galleryGrid.querySelectorAll('.view-btn:not(.initialized)');
    newViewButtons.forEach(button => {
        button.classList.add('initialized');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = button.closest('.gallery-card');
            const index = parseInt(card.getAttribute('data-index'));
            // This would need to be integrated with the lightbox system
            // For now, we'll need to extend the galleryData array
        });
    });
}

// Get user-friendly category name
function getCategoryName(category) {
    const names = {
        'exterior': 'Exterior',
        'interior': 'Interior',
        'ceramic': 'Ceramic Coating',
        'ppf': 'Paint Protection'
    };
    return names[category] || category;
}

// Reinitialize scroll animations for new items
function reinitializeScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

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

        // Observe new animate-on-scroll elements
        const newAnimateElements = document.querySelectorAll('.animate-on-scroll:not(.visible)');
        newAnimateElements.forEach(el => fadeObserver.observe(el));
    }
}

// Gallery-specific animations
function initGalleryAnimations() {
    // Add hover effects for gallery cards
    const galleryCards = document.querySelectorAll('.gallery-card');

    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const beforeImg = this.querySelector('.before-image');
            const afterImg = this.querySelector('.after-image');

            // Subtle zoom effect
            beforeImg.style.transform = 'scale(1.05)';
            afterImg.style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            const beforeImg = this.querySelector('.before-image');
            const afterImg = this.querySelector('.after-image');

            beforeImg.style.transform = 'scale(1)';
            afterImg.style.transform = 'scale(1)';
        });
    });
}

// Add CSS for gallery-specific styles
const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
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

    /* Filter Buttons */
    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: var(--space-4);
        margin-bottom: var(--space-12);
        flex-wrap: wrap;
    }

    .filter-btn {
        padding: var(--space-3) var(--space-6);
        background: transparent;
        color: var(--text-secondary);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-lg);
        cursor: pointer;
        transition: all var(--transition-base);
        font-family: var(--font-secondary);
        font-weight: 500;
        min-height: 44px;
    }

    .filter-btn:hover {
        border-color: var(--metallic-gold);
        color: var(--metallic-gold);
        transform: translateY(-2px);
    }

    .filter-btn.active {
        background: var(--gradient-primary);
        color: var(--primary-dark);
        border-color: transparent;
        box-shadow: var(--shadow-gold);
    }

    /* Gallery Styles */
    .gallery-item {
        transition: all var(--transition-base);
    }

    .gallery-card {
        position: relative;
        background: var(--secondary-dark);
        border-radius: var(--radius-xl);
        overflow: hidden;
        cursor: pointer;
        transition: all var(--transition-base);
    }

    .gallery-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-xl);
    }

    .gallery-image-container {
        position: relative;
        width: 100%;
        height: 250px;
        overflow: hidden;
    }

    .gallery-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
    }

    .after-image {
        clip-path: inset(0 50% 0 0);
    }

    .before-image {
        z-index: 1;
    }

    .after-image {
        z-index: 2;
    }

    /* Comparison Slider */
    .image-comparison-slider {
        position: absolute;
        top: 0;
        left: 50%;
        width: 3px;
        height: 100%;
        background: var(--metallic-gold);
        z-index: 3;
        cursor: ew-resize;
        transition: left 0.1s ease-out;
    }

    .slider-handle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-gold);
        cursor: ew-resize;
    }

    .slider-handle span {
        color: var(--primary-dark);
        font-weight: bold;
        font-size: 18px;
    }

    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity var(--transition-base);
        z-index: 4;
    }

    .gallery-card:hover .gallery-overlay {
        opacity: 1;
    }

    .view-btn {
        width: 50px;
        height: 50px;
        background: rgba(212, 175, 55, 0.9);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-dark);
        cursor: pointer;
        transition: all var(--transition-base);
    }

    .view-btn:hover {
        background: var(--metallic-gold);
        transform: scale(1.1);
    }

    .gallery-info {
        padding: var(--space-6);
        text-align: center;
    }

    .gallery-info h3 {
        margin-bottom: var(--space-2);
        font-size: var(--text-xl);
    }

    .gallery-info p {
        color: var(--text-secondary);
        margin-bottom: var(--space-4);
    }

    .service-tag {
        display: inline-block;
        padding: var(--space-1) var(--space-3);
        background: rgba(212, 175, 55, 0.1);
        color: var(--metallic-gold);
        border-radius: var(--radius-md);
        font-size: var(--text-xs);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    /* Lightbox Styles */
    .lightbox-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: var(--z-modal);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-base);
    }

    .lightbox-modal.active {
        opacity: 1;
        visibility: visible;
    }

    .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
    }

    .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        background: var(--secondary-dark);
        border-radius: var(--radius-2xl);
        overflow: hidden;
        box-shadow: var(--shadow-xl);
        transform: scale(0.9);
        transition: transform var(--transition-base);
        z-index: var(--z-modal);
    }

    .lightbox-modal.active .lightbox-content {
        transform: scale(1);
    }

    .lightbox-close {
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-primary);
        cursor: pointer;
        transition: all var(--transition-base);
        z-index: 10;
    }

    .lightbox-close:hover {
        background: var(--metallic-gold);
        color: var(--primary-dark);
        transform: scale(1.1);
    }

    .lightbox-image-container {
        position: relative;
        width: 800px;
        height: 600px;
        max-width: 80vw;
        max-height: 60vh;
    }

    .before-after-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .lightbox-before,
    .lightbox-after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .lightbox-after {
        clip-path: inset(0 50% 0 0);
    }

    .lightbox-comparison-slider {
        position: absolute;
        top: 0;
        left: 50%;
        width: 4px;
        height: 100%;
        background: var(--metallic-gold);
        z-index: 5;
        cursor: ew-resize;
    }

    .lightbox-comparison-slider .slider-handle {
        width: 50px;
        height: 50px;
        font-size: 24px;
    }

    .lightbox-info {
        padding: var(--space-8);
        text-align: center;
        max-width: 800px;
    }

    .lightbox-info h3 {
        margin-bottom: var(--space-2);
        font-size: var(--text-2xl);
    }

    .lightbox-info p {
        color: var(--text-secondary);
        margin-bottom: var(--space-6);
    }

    .lightbox-navigation {
        display: flex;
        justify-content: center;
        gap: var(--space-4);
    }

    .lightbox-nav-btn {
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-dark);
        cursor: pointer;
        transition: all var(--transition-base);
    }

    .lightbox-nav-btn:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-gold);
    }

    .lightbox-nav-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Load More Button */
    .load-more-btn {
        margin-top: var(--space-8);
    }

    /* Responsive Gallery */
    @media (max-width: 767px) {
        .filter-buttons {
            gap: var(--space-2);
        }

        .filter-btn {
            padding: var(--space-2) var(--space-4);
            font-size: var(--text-sm);
        }

        .gallery-grid {
            gap: var(--space-6);
        }

        .gallery-image-container {
            height: 200px;
        }

        .lightbox-image-container {
            width: 100vw;
            height: 60vh;
        }

        .lightbox-info {
            padding: var(--space-6);
        }

        .lightbox-info h3 {
            font-size: var(--text-xl);
        }
    }

    @media (max-width: 479px) {
        .gallery-grid {
            grid-template-columns: 1fr;
        }

        .slider-handle {
            width: 35px;
            height: 35px;
        }

        .lightbox-comparison-slider .slider-handle {
            width: 40px;
            height: 40px;
            font-size: 20px;
        }
    }
`;

document.head.appendChild(galleryStyles);