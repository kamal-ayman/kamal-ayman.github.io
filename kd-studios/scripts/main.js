/* ===================================================
   KD STUDIOS - PRODUCTION RUNTIME (V4 ULTIMATE)
   Stable. Performant. Minimal.
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Adaptive Navbar & Mesh Gradient Logic
    const navbar = document.querySelector('#navbar');
    const ball1 = document.querySelector('.ball-1');
    const ball2 = document.querySelector('.ball-2');

    const onScroll = () => {
        const threshold = window.innerHeight * 0.1;
        if (window.scrollY > threshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (ball1) ball1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        if (ball2) ball2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial check

    // 2. High-Performance Reveal System
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Mathematical Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = 84;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Accessibility: Update focus
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // 4. Magnetic Buttons Interaction
    const magneticBtns = document.querySelectorAll('.btn-pro');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.4}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 5. Console Identity
    console.log(
        '%c KD STUDIOS %c ULTIMATE V4 %c',
        'background: #7c4dff; color: #fff; border-radius: 3px 0 0 3px; padding: 2px 5px; font-weight: bold;',
        'background: #000; color: #fff; border-radius: 0 3px 3px 0; padding: 2px 5px;',
        'background: transparent'
    );
});
