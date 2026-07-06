// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Navbar glass effect on scroll
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    // Add fade-up class to elements we want to animate
    const elementsToAnimate = [
        '.hero-title', 
        '.hero-subtitle', 
        '.hero-buttons',
        '.section-header',
        '.philosophy-card',
        '.service-card',
        '.profile-text',
        '.experience-card',
        '.contact-wrapper'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('fade-up');
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
    
    // 4. Parallax effect for glow orbs
    const orbs = document.querySelectorAll('.glow-orb');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;

            // Using transform to move the orbs slightly based on mouse position
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // 5. In-app browser fallback (Instagram/Facebook block external app links,
    // e.g. LinkedIn, and silently bounce the user back instead of opening them)
    const isInAppBrowser = /Instagram|FBAN|FBAV/i.test(navigator.userAgent);
    if (isInAppBrowser) {
        const toast = document.createElement('div');
        toast.className = 'inapp-toast';
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);

        let toastTimeout;
        const showToast = (message) => {
            toast.textContent = message;
            toast.classList.add('visible');
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => toast.classList.remove('visible'), 6000);
        };

        document.querySelectorAll('a.social-link[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.href;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).catch(() => {});
                }
                showToast('Enlace copiado. Ábrelo pegándolo en Safari/Chrome: Instagram no permite abrirlo directamente.');
            });
        });
    }
});
