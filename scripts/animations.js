/**
 * Animations Controller
 * Handles scroll-triggered animations for skills, counters, and reveal effects
 * @module AnimationsController
 */

const AnimationsController = {
    /** @type {IntersectionObserver} */
    observer: null,

    /**
     * Initialize all animation controllers
     */
    init() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.showAllImmediately();
            return;
        }

        this.initIntersectionObserver();
        this.observeSkillCategories();
        this.observeSkillBars();
        this.observeCounters();
        this.observeProjectCards();
    },

    /**
     * Show all animated elements immediately (for reduced motion)
     */
    showAllImmediately() {
        document.querySelectorAll('.skill-category, .project-card, .package-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.add('animate-in');
        });

        document.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.width = `${bar.dataset.progress}%`;
        });

        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.textContent = stat.dataset.target;
        });
    },

    /**
     * Initialize intersection observer
     */
    initIntersectionObserver() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
    },

    /**
     * Handle intersection events
     * @param {IntersectionObserverEntry[]} entries
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                this.observer.unobserve(entry.target);
            }
        });
    },

    /**
     * Observe skill category cards for reveal animation
     */
    observeSkillCategories() {
        document.querySelectorAll('.skill-category').forEach((category, index) => {
            category.style.transitionDelay = `${index * 0.15}s`;
            this.observer.observe(category);
        });
    },

    /**
     * Observe skill bars for progress animation
     */
    observeSkillBars() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const skillsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateSkillBars();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        skillsObserver.observe(skillsSection);
    },

    /**
     * Animate skill progress bars
     */
    animateSkillBars() {
        document.querySelectorAll('.skill-progress').forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = `${bar.dataset.progress}%`;
            }, index * 100);
        });
    },

    /**
     * Observe counter elements for animation
     */
    observeCounters() {
        const stats = document.querySelectorAll('.stat-number');

        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '0px 0px 100px 0px'
            }
        );

        stats.forEach(stat => {
            // Check if already visible on load (fallback)
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                this.animateCounter(stat);
            } else {
                counterObserver.observe(stat);
            }
        });
    },

    /**
     * Animate a single counter
     * @param {HTMLElement} statElement 
     */
    animateCounter(statElement) {
        // Prevent double animation
        if (statElement.classList.contains('animated')) return;
        statElement.classList.add('animated');

        const target = parseInt(statElement.dataset.target);
        if (target === 0) {
            statElement.textContent = '0';
            return;
        }

        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const easeOut = 1 - Math.pow(1 - progress, 4);

            // Use round to help small numbers appear sooner
            let current = Math.round(easeOut * target);

            // Boundary checks
            if (current > target) current = target;
            if (current < 0) current = 0;

            statElement.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                statElement.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    },

    /**
     * Observe project cards for reveal animation
     */
    observeProjectCards() {
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            this.observer.observe(card);
        });
    },

    /**
     * Add scroll reveal to any element
     * @param {string} selector - CSS selector for elements
     * @param {number} [staggerDelay=0.1] - Delay between each element
     */
    addScrollReveal(selector, staggerDelay = 0.1) {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}s`;
            this.observer.observe(el);
        });
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    AnimationsController.init();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationsController;
}
