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
        this.initImageInteraction();
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
    },

    /**
     * Initialize interactive image controls (Mouse + Keyboard)
     */
    initImageInteraction() {
        const wrapper = document.querySelector('.image-wrapper');
        if (!wrapper) return;

        // State for physics-based animation
        const state = {
            mouseX: 0,
            mouseY: 0,
            rotateX: 0,
            rotateY: 0,
            targetRotateX: 0,
            targetRotateY: 0,
            keyX: 0,
            keyY: 0
        };

        // Configuration
        const config = {
            sensitivity: 20, // Max rotation in degrees
            lerpFactor: 0.1,  // Smoothing factor (0.1 = smooth, 1 = instant)
            keyStep: 5        // Degrees per key press
        };

        // Mouse Move Handler
        document.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from center (normalized -1 to 1)
            let percentX = (e.clientX - centerX) / (window.innerWidth / 2);
            let percentY = (e.clientY - centerY) / (window.innerHeight / 2);

            // Clamp percentages to prevent extreme rotation when mouse leaves window
            percentX = Math.max(-1, Math.min(1, percentX));
            percentY = Math.max(-1, Math.min(1, percentY));

            // Target rotation (Mouse effect)
            state.mouseX = percentX * config.sensitivity;
            state.mouseY = -percentY * config.sensitivity;
        });

        // Keyboard Handler
        document.addEventListener('keydown', (e) => {
            // Only capture keys if user is at the top of the page (Hero Section)
            if (window.scrollY > window.innerHeight * 0.8) return;

            switch (e.key) {
                case 'ArrowUp':
                    state.keyY = Math.min(state.keyY + config.keyStep, config.sensitivity);
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    state.keyY = Math.max(state.keyY - config.keyStep, -config.sensitivity);
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    state.keyX = Math.max(state.keyX - config.keyStep, -config.sensitivity);
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    state.keyX = Math.min(state.keyX + config.keyStep, config.sensitivity);
                    e.preventDefault();
                    break;
                case 'Escape':
                    state.keyX = 0;
                    state.keyY = 0;
                    break;
            }
        });

        // Animation Loop (Physics)
        const animate = () => {
            // Combine mouse and keyboard inputs
            let targetY = state.mouseX + state.keyX;
            let targetX = state.mouseY + state.keyY;

            // Clamp total rotation to restrictions
            state.targetRotateY = Math.max(-config.sensitivity, Math.min(config.sensitivity, targetY));
            state.targetRotateX = Math.max(-config.sensitivity, Math.min(config.sensitivity, targetX));

            // Smooth interpolation (Lerp)
            state.rotateX += (state.targetRotateX - state.rotateX) * config.lerpFactor;
            state.rotateY += (state.targetRotateY - state.rotateY) * config.lerpFactor;

            // Apply transform
            // perspective is important for 3D effect
            wrapper.style.transform = `
                perspective(1000px)
                rotateX(${state.rotateX}deg)
                rotateY(${state.rotateY}deg)
                scale3d(1.02, 1.02, 1.02)
            `;

            // Add dynamic light reflection (Glance effect) - Enhanced contrast
            wrapper.style.filter = `brightness(${100 + (state.rotateY / 2)}%) contrast(1.05)`;

            requestAnimationFrame(animate);
        };

        // Start loop
        animate();

        // Add cursor style to indicate interactivity
        wrapper.style.cursor = 'grab';
        wrapper.setAttribute('title', 'Use arrow keys or mouse to rotate');

        // Add active grabbing cursor on mousedown
        wrapper.addEventListener('mousedown', () => wrapper.style.cursor = 'grabbing');
        wrapper.addEventListener('mouseup', () => wrapper.style.cursor = 'grab');
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    HeroController.init();
});
