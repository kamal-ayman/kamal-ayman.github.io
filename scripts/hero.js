/**
 * Hero Section Controller
 * Handles typing effect, particles, and loader animations
 * @module HeroController
 */

const HeroController = {
    /** @type {HTMLElement} */
    typedText: null,

    /** @type {string[]} */
    words: [
        'Flutter Developer',
        'Mobile App Expert',
        'UI/UX Enthusiast',
        'Open Source Creator'
    ],

    /** @type {number} */
    wordIndex: 0,

    /** @type {number} */
    charIndex: 0,

    /** @type {boolean} */
    isDeleting: false,

    /** @type {number} */
    typeSpeed: 100,

    /**
     * Initialize the hero controller
     */
    init() {
        this.initLoader();
        this.initTypingEffect();
        this.initParticles();
    },

    /**
     * Initialize and handle page loader
     */
    initLoader() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            if (!loader) return;

            // Minimum display time for smooth UX
            setTimeout(() => {
                loader.classList.add('hidden');

                // Remove from DOM after animation
                loader.addEventListener('transitionend', () => {
                    loader.remove();
                }, { once: true });
            }, 1200);
        });
    },

    /**
     * Initialize typing effect
     */
    initTypingEffect() {
        this.typedText = document.getElementById('typed-text');
        if (this.typedText) {
            this.type();
        }
    },

    /**
     * Type animation loop
     */
    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            // Deleting characters
            this.charIndex--;
            this.typeSpeed = 40;
        } else {
            // Typing characters
            this.charIndex++;
            this.typeSpeed = 80;
        }

        this.typedText.textContent = currentWord.substring(0, this.charIndex);

        // Check if word is complete
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            // Pause at end of word
            this.isDeleting = true;
            this.typeSpeed = 2500;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Move to next word
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            this.typeSpeed = 400;
        }

        setTimeout(() => this.type(), this.typeSpeed);
    },

    /**
     * Initialize floating particles
     */
    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const duration = Math.random() * 15 + 15;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.3 + 0.1;

            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${posX}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity: opacity
            });

            container.appendChild(particle);

            // Clean up after animation
            setTimeout(() => particle.remove(), (duration + delay) * 1000);
        };

        // Create initial batch
        const initialCount = window.innerWidth > 768 ? 15 : 8;
        for (let i = 0; i < initialCount; i++) {
            setTimeout(createParticle, i * 300);
        }

        // Continue creating particles
        setInterval(createParticle, 2000);
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    HeroController.init();
});
