/* ===================================================
   KD STUDIOS - PRODUCTION RUNTIME (V4 ULTIMATE)
   Stable. Performant. Minimal.
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Adaptive Navbar Logic
    const navbar = document.querySelector('#navbar');
    const onScroll = () => {
        const threshold = window.innerHeight * 0.1;
        if (window.scrollY > threshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

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

    // 4. Console Identity
    console.log(
        '%c KD STUDIOS %c PRO RUNTIME V4 %c',
        'background: #7c4dff; color: #fff; border-radius: 3px 0 0 3px; padding: 2px 5px; font-weight: bold;',
        'background: #000; color: #fff; border-radius: 0 3px 3px 0; padding: 2px 5px;',
        'background: transparent'
    );
});
