/**
 * app.js — Main Application Controller
 * Handles scroll-based animations and initializes all modules.
 */

const App = (() => {
    // ── Scroll Reveal via IntersectionObserver ─────────────
    function _initScrollReveal() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        document.querySelectorAll('.section-block').forEach((el) => {
            observer.observe(el);
        });
    }

    // ── Navbar Shadow on Scroll ────────────────────────────
    function _initNavScroll() {
        const nav = document.getElementById('navbar');
        if (!nav) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    nav.classList.toggle('scrolled', window.scrollY > 30);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ── Smooth Scroll to Top on Load ───────────────────────
    function _scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // ── Public API ─────────────────────────────────────────
    function init() {
        _scrollToTop();
        _initNavScroll();
        _initScrollReveal();
        I18n.init();
    }

    return { init };
})();

// ── Bootstrap ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
