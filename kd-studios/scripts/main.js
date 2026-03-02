/* ===================================================
   KD STUDIOS - PRODUCTION RUNTIME (CONSOLIDATED)
   =================================================== */

(function () {
    "use strict";

    // --- Theme Toggle Module ---
    function initThemeToggle() {
        const themeButton = document.querySelector('#theme-toggle');
        const htmlElement = document.documentElement;
        const themeIcon = themeButton ? themeButton.querySelector('i') : null;

        const applyTheme = (isDark) => {
            if (isDark) {
                htmlElement.setAttribute('data-theme', 'dark');
                if (themeIcon) {
                    themeIcon.className = 'fas fa-sun';
                }
                localStorage.setItem('kd-theme', 'dark');
                return;
            }

            htmlElement.removeAttribute('data-theme');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
            localStorage.setItem('kd-theme', 'light');
        };

        const storedTheme = localStorage.getItem('kd-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(storedTheme === 'dark' || (!storedTheme && prefersDark));

        if (!themeButton) return;

        themeButton.addEventListener('click', () => {
            const isDarkTheme = htmlElement.getAttribute('data-theme') === 'dark';
            applyTheme(!isDarkTheme);
        });
    }

    // --- Navigation Module ---
    function initNavigation() {
        const navbar = document.querySelector('#navbar');
        const menuToggle = document.querySelector('#menu-toggle');
        const navList = document.querySelector('#primary-nav');
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));

        if (!navbar) return;

        const syncScrolledState = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };

        window.addEventListener('scroll', syncScrolledState, { passive: true });
        syncScrolledState();

        if (menuToggle && navList) {
            menuToggle.addEventListener('click', () => {
                const isOpen = navList.classList.toggle('is-open');
                menuToggle.setAttribute('aria-expanded', String(isOpen));
                menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
            });

            navLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    navList.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Open navigation');
                });
            });

            document.addEventListener('click', (event) => {
                const clickTarget = event.target;
                if (!(clickTarget instanceof Node)) return;

                if (!navbar.contains(clickTarget) && navList.classList.contains('is-open')) {
                    navList.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Open navigation');
                }
            });
        }

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    navLinks.forEach((link) => {
                        const linkTarget = link.getAttribute('href');
                        const isActive = linkTarget === `#${entry.target.id}`;
                        link.classList.toggle('active', isActive);
                    });
                });
            },
            { rootMargin: '-40% 0px -45% 0px' }
        );

        navLinks.forEach((link) => {
            const sectionId = link.getAttribute('href');
            if (!sectionId || !sectionId.startsWith('#')) return;

            const section = document.querySelector(sectionId);
            if (section) {
                sectionObserver.observe(section);
            }
        });
    }

    // --- Reveal On Scroll Module ---
    function initRevealOnScroll() {
        const revealElements = Array.from(document.querySelectorAll('.reveal'));
        if (!revealElements.length) return;

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -20px 0px'
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    // --- Smooth Scroll Module ---
    function initSmoothScroll() {
        const offset = 96;
        const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));

        anchors.forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                if (!targetId || targetId === '#') return;

                const targetSection = document.querySelector(targetId);
                if (!targetSection) return;

                event.preventDefault();
                const top = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    }

    // --- Bootstrapping Everything ---
    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initNavigation();
        initRevealOnScroll();
        initSmoothScroll();

        console.log(
            '%c KD STUDIOS %c STATUS: ELITE RUNTIME %c',
            'background: #7c4dff; color: #fff; padding: 4px 8px; font-weight: 800; border-radius: 6px 0 0 6px;',
            'background: #111; color: #fff; padding: 4px 8px; font-weight: 400; border-radius: 0 6px 6px 0;',
            'background: transparent'
        );
    });

})();
