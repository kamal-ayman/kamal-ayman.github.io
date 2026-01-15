/**
 * Navigation Controller
 * Handles navbar scroll effects, mobile menu, and active link tracking
 * @module NavigationController
 */

const NavigationController = {
    /** @type {HTMLElement} */
    navbar: null,
    /** @type {HTMLElement} */
    hamburger: null,
    /** @type {HTMLElement} */
    navLinks: null,
    /** @type {NodeListOf<HTMLElement>} */
    sections: null,
    /** @type {NodeListOf<HTMLAnchorElement>} */
    navLinksAll: null,

    /**
     * Initialize the navigation controller
     */
    init() {
        this.cacheElements();
        this.bindEvents();
    },

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('nav-links');
        this.sections = document.querySelectorAll('section[id]');
        this.navLinksAll = document.querySelectorAll('.nav-link');
        this.backToTop = document.getElementById('back-to-top');
    },

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Scroll event with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
                scrollTimeout = null;
            }, 10);
        });

        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu on link click
        this.navLinksAll.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // Close mobile menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });

        // Close mobile menu on click outside
        document.addEventListener('click', (e) => {
            if (this.navLinks?.classList.contains('active')) {
                if (!this.navLinks.contains(e.target) && !this.hamburger.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });
    },

    /**
     * Handle scroll effects
     */
    handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background on scroll
        if (this.navbar) {
            this.navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // Back to top visibility
        if (this.backToTop) {
            this.backToTop.classList.toggle('visible', scrollY > 500);
        }

        // Active section tracking
        this.updateActiveLink();
    },

    /**
     * Update active navigation link based on scroll position
     */
    updateActiveLink() {
        const scrollY = window.scrollY + 200;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const isActive = this.hamburger.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        this.hamburger.setAttribute('aria-expanded', isActive);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.hamburger?.classList.remove('active');
        this.navLinks?.classList.remove('active');
        this.hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    },

    /**
     * Handle smooth scrolling for anchor links
     * @param {Event} e - Click event
     */
    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const navHeight = this.navbar?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    NavigationController.init();
});
