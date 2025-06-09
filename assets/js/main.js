/*
   Descomplica Agência - JavaScript Principal
   Desenvolvido por Manus AI
*/

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hidden');
            }, 500);
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialItems.length > 0 && testimonialDots.length > 0) {
        // Show first testimonial by default
        testimonialItems[0].style.display = 'block';
        testimonialDots[0].classList.add('active');
        
        // Handle dot clicks
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Hide all testimonials
                testimonialItems.forEach(item => {
                    item.style.display = 'none';
                });
                
                // Remove active class from all dots
                testimonialDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Show selected testimonial and activate dot
                testimonialItems[index].style.display = 'block';
                this.classList.add('active');
            });
        });
        
        // Auto-rotate testimonials
        let currentIndex = 0;
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            
            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.style.display = 'none';
            });
            
            // Remove active class from all dots
            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show next testimonial and activate dot
            testimonialItems[currentIndex].style.display = 'block';
            testimonialDots[currentIndex].classList.add('active');
        }, 5000);
    }

    // Scroll reveal animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Form validation
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.querySelector('#name');
            const emailInput = document.querySelector('#email');
            const messageInput = document.querySelector('#message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Por favor, digite seu nome');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Por favor, digite seu email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Por favor, digite um email válido');
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Por favor, digite sua mensagem');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                
                setTimeout(function() {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                    
                    contactForm.appendChild(successMessage);
                    
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    let start = 0;
                    const increment = target / (duration / 16);
                    
                    const timer = setInterval(() => {
                        start += increment;
                        entry.target.textContent = Math.floor(start);
                        
                        if (start >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        }
                    }, 16);
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});

