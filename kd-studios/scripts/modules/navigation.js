export function initNavigation() {
    const navbar = document.querySelector('#navbar');
    const menuToggle = document.querySelector('#menu-toggle');
    const navList = document.querySelector('#primary-nav');
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));

    if (!navbar) {
        return;
    }

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
            if (!(clickTarget instanceof Node)) {
                return;
            }

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
                if (!entry.isIntersecting) {
                    return;
                }

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
        if (!sectionId || !sectionId.startsWith('#')) {
            return;
        }

        const section = document.querySelector(sectionId);
        if (section) {
            sectionObserver.observe(section);
        }
    });
}
