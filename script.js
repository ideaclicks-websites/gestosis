
    // Smooth scroll for anchor links
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('.theme-card, .why-card, .patron-card').forEach(el => {
        observer.observe(el);
    });
// });

// ============================================
// HEADER FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header with scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    navbar.addEventListener('click', (e) => {
        if (e.target === navbar) {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Prevent scroll on mobile when menu is open
    let touchStartY = 0;
    navbar.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    navbar.addEventListener('touchmove', (e) => {
        if (navbar.scrollTop === 0 && e.touches[0].clientY > touchStartY) {
            e.preventDefault();
        }
    }, { passive: false });
});

// ================================
// ✅ TRUE PREMIUM AUTO + DRAG LOGO STRIP (NO FREEZE EVER)
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("marqueeTrack");
    if (!track) return;

    let position = 0;
    let speed = 0.3; // ✅ Slow premium speed
    let isDragging = false;
    let startX = 0;
    let lastTranslate = 0;

    function animate() {
        if (!isDragging) {
            position -= speed;
        }

        // ✅ Perfect infinite loop reset
        if (Math.abs(position) >= track.scrollWidth / 2) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    // ✅ MOUSE DRAG
    // track.addEventListener("mousedown", e => {
    //     isDragging = true;
    //     startX = e.clientX;
    //     track.style.cursor = "grabbing";
    // });

    // document.addEventListener("mousemove", e => {
    //     if (!isDragging) return;
    //     const delta = e.clientX - startX;
    //     position = lastTranslate + delta;
    // });

    // document.addEventListener("mouseup", () => {
    //     if (!isDragging) return;
    //     isDragging = false;
    //     lastTranslate = position;
    //     track.style.cursor = "grab";
    // });

    // ✅ TOUCH DRAG (NO FREEZING)
    track.addEventListener("touchstart", e => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchmove", e => {
        if (!isDragging) return;
        const delta = e.touches[0].clientX - startX;
        position = lastTranslate + delta;
    });

    track.addEventListener("touchend", () => {
        isDragging = false;
        lastTranslate = position;
    });
});
