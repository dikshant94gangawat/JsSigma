/* ============================================
   WEYBRIDGE EYE CLINIC - JavaScript Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    function handleNavbarScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // ============================================
    // ACTIVE NAVIGATION LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    function highlightActiveNav() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);
    
    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .testimonial-card, .about-feature, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateCounters() {
        if (statsAnimated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (!target) return;
            
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    if (target > 1000) {
                        stat.textContent = Math.floor(current).toLocaleString() + '+';
                    } else if (target < 100) {
                        stat.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target > 1000) {
                        stat.textContent = target.toLocaleString() + '+';
                    } else if (target === 98) {
                        stat.textContent = target + '%';
                    } else {
                        stat.textContent = target + '+';
                    }
                }
            };
            
            updateCounter();
        });
        
        statsAnimated = true;
    }
    
    // Trigger counter animation when stats are visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStats);
    }
    
    // ============================================
    // FORM HANDLING
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#ef4444';
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
                    
                    // Reset form after delay
                    setTimeout(() => {
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        
                        // Show success message
                        showNotification('Thank you! We will contact you within 24 hours to confirm your appointment.', 'success');
                    }, 2000);
                }, 1500);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
        
        // Remove error styling on input
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#0077b6';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.style.borderColor = '#e2e8f0';
                }
            });
        });
    }
    
    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0077b6'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
            font-size: 0.9375rem;
            max-width: 400px;
        `;
        
        // Add close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            opacity: 0.8;
            transition: opacity 0.2s;
        `;
        
        closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add notification animations to document
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
        
        /* Mobile menu styles */
        @media (max-width: 992px) {
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                display: none;
                gap: 0;
            }
            
            .nav-links.active {
                display: flex;
            }
            
            .nav-links a {
                padding: 15px 20px;
                border-radius: 8px;
            }
            
            .mobile-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroImage = document.querySelector('.image-wrapper');
    
    if (heroImage && window.innerWidth > 992) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
    
    // ============================================
    // LAZY LOADING FOR IMAGES (Future Implementation)
    // ============================================
    // Placeholder for when real images are added
    const lazyImages = document.querySelectorAll('[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });
    
    // ============================================
    // SCROLL TO TOP FUNCTIONALITY
    // ============================================
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #0077b6 0%, #00a8e8 100%);
        color: white;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 119, 182, 0.3);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 119, 182, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 119, 182, 0.3)';
    });
    
    console.log('Weybridge Eye Clinic - Page Loaded Successfully');
});
