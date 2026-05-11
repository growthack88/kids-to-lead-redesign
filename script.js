// =====================================================
//   KIDS TO LEAD - INTERACTIVE JAVASCRIPT
//   Modern, Smooth, Conversion-Optimized Interactions
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Initialize all interactive features
    initCounters();
    initTestimonialSlider();
    initCountdownTimer();
    initFAQAccordion();
    initSmoothScrolling();
    initNavbarEffects();
    initFloatingElements();
});

// =====================================================
//   COUNTER ANIMATIONS
// =====================================================

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for 1 second at 60fps
    const suffix = element.nextElementSibling?.classList.contains('stat-suffix') 
                   ? element.nextElementSibling.textContent 
                   : '';
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            if (target > 1000) {
                element.textContent = Math.ceil(current).toLocaleString();
            } else {
                element.textContent = Math.ceil(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// =====================================================
//   TESTIMONIAL SLIDER
// =====================================================

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function initTestimonialSlider() {
    // Auto-rotate testimonials
    setInterval(() => {
        nextTestimonial();
    }, 6000);
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    // Activate current dot
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}

function prevTestimonial() {
    const prev = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
    showTestimonial(prev);
}

function currentTestimonialHandler(index) {
    showTestimonial(index - 1); // Convert to 0-based index
}

// Make functions globally available
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.currentTestimonial = currentTestimonialHandler;

// =====================================================
//   COUNTDOWN TIMER
// =====================================================

function initCountdownTimer() {
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Timer expired - reset for another 24 hours
            const newEndTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            initCountdownTimer();
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    };
    
    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// =====================================================
//   FAQ ACCORDION
// =====================================================

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Make toggleFAQ globally available for onclick handlers
window.toggleFAQ = function(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
};

// =====================================================
//   SMOOTH SCROLLING
// =====================================================

function initSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to order section function
    window.scrollToOrder = function() {
        const orderSection = document.getElementById('order');
        if (orderSection) {
            const offsetTop = orderSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    // Order now function
    window.orderNow = function() {
        // Add ordering logic here (redirect to payment, show modal, etc.)
        alert('🎉 جاري تحويلك لصفحة الدفع الآمن...');
        
        // Example: redirect to payment page
        // window.open('https://your-payment-link.com', '_blank');
        
        // Example: show WhatsApp message
        const message = encodeURIComponent('مرحباً! أريد طلب كتاب "وصفة طفل جاهز للمستقبل" 📚');
        const whatsappUrl = `https://wa.me/201001234567?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };
}

// =====================================================
//   NAVBAR EFFECTS
// =====================================================

function initNavbarEffects() {
    const navbar = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// =====================================================
//   FLOATING ELEMENTS ANIMATION
// =====================================================

function initFloatingElements() {
    // Create floating particles
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particles = [];
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary bounce
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            
            // Update position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// =====================================================
//   PROGRESSIVE ENHANCEMENT
// =====================================================

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Add button ripple effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple animation CSS if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .btn {
                    position: relative;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// =====================================================
//   PERFORMANCE OPTIMIZATIONS
// =====================================================

// Debounce scroll events
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

// Optimize scroll performance
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// =====================================================
//   ACCESSIBILITY ENHANCEMENTS
// =====================================================

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Handle testimonial navigation with arrow keys
    if (e.key === 'ArrowLeft' && document.activeElement.closest('.testimonials')) {
        prevTestimonial();
    } else if (e.key === 'ArrowRight' && document.activeElement.closest('.testimonials')) {
        nextTestimonial();
    }
    
    // Handle FAQ navigation with Enter/Space
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('faq-question')) {
        e.preventDefault();
        toggleFAQ(e.target);
    }
});

// Add focus management
document.addEventListener('focusin', function(e) {
    if (e.target.matches('.btn, .nav-link, .faq-question')) {
        e.target.style.outline = '2px solid var(--primary-color)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('.btn, .nav-link, .faq-question')) {
        e.target.style.outline = 'none';
    }
});

// =====================================================
//   ERROR HANDLING & FALLBACKS
// =====================================================

window.addEventListener('error', function(e) {
    console.warn('Script error handled:', e.message);
    // Graceful degradation - remove problematic animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.removeAttribute('data-aos');
    });
});

// Fallback for browsers without Intersection Observer
if (!window.IntersectionObserver) {
    // Simple fallback - trigger all counters after a delay
    setTimeout(() => {
        document.querySelectorAll('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            counter.textContent = target.toLocaleString();
        });
    }, 2000);
}

// Console message for developers
console.log(`
🎨 Kids to Lead - Modern Landing Page
✨ Built with love and modern web technologies
🚀 Optimized for conversion and performance
📧 Contact: info@kidstolead.com
`);

// Export functions for testing (if in development)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateCounter,
        showTestimonial,
        toggleFAQ
    };
}