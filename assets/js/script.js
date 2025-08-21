// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script initialized');
    
    // Initialize all functionality
    initSlider();
    initForms();
    initModal();
    initScrollEffects();
    initTabSwitching();
});

// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (slides.length === 0) {
        console.warn('No slides found');
        return;
    }
    
    function nextSlide() {
        try {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        } catch (error) {
            console.error('Error in slider transition:', error);
        }
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    console.log(`✅ Slider initialized with ${slides.length} slides`);
}

// Form Handling
function initForms() {
    const creatorForm = document.getElementById('creatorForm');
    const fanForm = document.getElementById('fanForm');
    
    if (creatorForm) {
        creatorForm.addEventListener('submit', handleFormSubmit);
        console.log('✅ Found form #creatorForm, attaching submit handler...');
    }
    
    if (fanForm) {
        fanForm.addEventListener('submit', handleFormSubmit);
        console.log('✅ Found form #fanForm, attaching submit handler...');
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    try {
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }
        
        // Simulate form submission
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success modal
        showModal();
        
        // Clear form
        form.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Erro ao enviar formulário. Tente novamente.');
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const errorMessage = field.parentNode.querySelector('.error-message');
        
        if (!field.value.trim()) {
            if (errorMessage) {
                errorMessage.style.display = 'block';
            }
            field.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
            field.style.borderColor = '#ddd';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                if (errorMessage) {
                    errorMessage.textContent = 'Por favor, insira um email válido.';
                    errorMessage.style.display = 'block';
                }
                field.style.borderColor = '#dc2626';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('modal');
    const modalButton = document.getElementById('modalButton');
    
    if (modalButton) {
        modalButton.addEventListener('click', hideModal);
    }
    
    // Close modal on background click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
}

function showModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Tab Switching
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    try {
        // Update tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        const activeButton = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Update forms
        const forms = document.querySelectorAll('.signup-form');
        forms.forEach(form => {
            form.classList.remove('active');
        });
        
        const targetForm = document.getElementById(`${tabName}Form`);
        if (targetForm) {
            targetForm.classList.add('active');
        }
        
    } catch (error) {
        console.error('Error switching tabs:', error);
    }
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scroll to signup section
    window.scrollToSignup = function() {
        const signupSection = document.getElementById('signup');
        if (signupSection) {
            signupSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-photo');
    
    floatingElements.forEach((element, index) => {
        // Add random animation delays and durations
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 4;
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
    });
}

// Testimonials slider (if needed)
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 3) {
        // Add slider functionality for mobile
        // This would be implemented if there are many testimonials
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
    }
}

// Performance optimizations
const debouncedResize = debounce(function() {
    // Handle resize events
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // Could add fallback image here
        e.target.style.display = 'none';
    }
}, true);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://cdn.prod.website-files.com/6821a59ae3bfe30071342488/6821a59ae3bfe300713424d5_2eeb3457918bde31bfed14ed509f80b6_hero-slider-cover-8.webp',
        'https://cdn.prod.website-files.com/6821a59ae3bfe30071342488/6821a59ae3bfe300713424d4_a8205c64f42f4b831c38526cf87d0a93_hero-slider-cover-1.webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Export functions for global access
window.switchTab = switchTab;
window.scrollToSignup = scrollToSignup;
window.showModal = showModal;
window.hideModal = hideModal;

console.log('✅ All scripts loaded successfully');
