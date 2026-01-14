/* ============================================
   WEYBRIDGE EYE CLINIC - INTERACTIVE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Add scrolled class style dynamically
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            
            // Add mobile menu styles if not exists
            if (!document.getElementById('mobile-menu-styles')) {
                const mobileStyles = document.createElement('style');
                mobileStyles.id = 'mobile-menu-styles';
                mobileStyles.textContent = `
                    .mobile-menu-btn.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    .mobile-menu-btn.active span:nth-child(2) {
                        opacity: 0;
                    }
                    .mobile-menu-btn.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -6px);
                    }
                    @media (max-width: 992px) {
                        .nav-links.mobile-open {
                            display: flex !important;
                            flex-direction: column;
                            position: absolute;
                            top: 100%;
                            left: 0;
                            right: 0;
                            background: white;
                            padding: 1rem;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                            gap: 0;
                        }
                        .nav-links.mobile-open li {
                            width: 100%;
                        }
                        .nav-links.mobile-open a {
                            display: block;
                            padding: 0.75rem 1rem;
                            border-bottom: 1px solid #f1f5f9;
                        }
                    }
                `;
                document.head.appendChild(mobileStyles);
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                }
                
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // ============================================
    // ANIMATED COUNTER FOR STATS
    // ============================================
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                    // Add plus sign for larger numbers
                    if (target >= 1000) {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                }
            };
            
            updateCounter();
        });
    }
    
    function checkCountersInView() {
        if (countersAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                countersAnimated = true;
                animateCounters();
            }
        }
    }
    
    window.addEventListener('scroll', checkCountersInView);
    checkCountersInView(); // Check on load

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');
    
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', handleBackToTop);
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // FORM HANDLING
    // ============================================
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });
            
            // Check consent
            const consentCheckbox = document.getElementById('consent');
            if (!consentCheckbox.checked) {
                isValid = false;
                alert('Please consent to being contacted about your enquiry.');
                return;
            }
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
                
                console.log('Form submitted:', data);
            }
        });
        
        // Remove error styling on input
        bookingForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        });
    }

    // ============================================
    // TESTIMONIAL SLIDER
    // ============================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentSlide = 0;
    
    function updateTestimonialSlider() {
        // Only run on mobile
        if (window.innerWidth > 992) return;
        
        testimonialCards.forEach((card, index) => {
            if (index === currentSlide) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-rotate testimonials on mobile
    function autoRotateTestimonials() {
        if (window.innerWidth <= 992) {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            updateTestimonialSlider();
        }
    }
    
    // Click on dots to change slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateTestimonialSlider();
        });
    });
    
    // Set interval for auto-rotation
    setInterval(autoRotateTestimonials, 5000);
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            testimonialCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            updateTestimonialSlider();
        }
    });

    // ============================================
    // SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    // ============================================
    const animatedElements = document.querySelectorAll(
        '.service-card, .team-card, .why-item, .feature, .about-content, .about-images'
    );
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Add class to elements
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // SERVICE CARDS STAGGER ANIMATION
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // ============================================
    // VIDEO PLACEHOLDER INTERACTION
    // ============================================
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would open a video modal
            alert('Video player would open here. This is a demo placeholder.');
        });
    }

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    function handleParallax() {
        if (window.innerWidth < 992) return;
        
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled < heroHeight) {
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }
    }
    
    window.addEventListener('scroll', handleParallax);

    // ============================================
    // INITIALIZE
    // ============================================
    console.log('Weybridge Eye Clinic website initialized');
    
    // Initial call to set active navigation
    highlightNavigation();
    handleNavbarScroll();
    handleBackToTop();
});
