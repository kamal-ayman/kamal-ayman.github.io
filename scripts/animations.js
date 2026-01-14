/**
 * Animations Controller
 * Handles scroll-triggered animations for skills, counters, and reveal effects
 */

const AnimationsController = {
    init() {
        this.initSkillBars();
        this.initCounters();
        this.initScrollReveal();
    },

    initSkillBars() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.getElementById('skills');

        if (!skillsSection || skillProgressBars.length === 0) return;

        const animateSkillBars = () => {
            skillProgressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            });
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
    },

    initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const aboutSection = document.getElementById('about');

        if (!aboutSection || statNumbers.length === 0) return;

        const animateCounters = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };

                updateCounter();
            });
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(aboutSection);
    },

    initScrollReveal() {
        const revealElements = document.querySelectorAll('.skill-category');

        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            revealObserver.observe(el);
        });
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    AnimationsController.init();
});
