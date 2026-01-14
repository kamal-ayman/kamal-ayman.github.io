/**
 * Hero Section Controller
 * Handles typing effect, particles, and loader
 */

const HeroController = {
    typedText: null,
    words: ['Flutter Developer', 'Mobile App Developer', 'UI/UX Enthusiast', 'Open Source Contributor'],
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
    typeSpeed: 100,

    init() {
        this.initLoader();
        this.initTypingEffect();
        this.initParticles();
    },

    initLoader() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
        });
    },

    initTypingEffect() {
        this.typedText = document.getElementById('typed-text');
        if (this.typedText) {
            this.type();
        }
    },

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            this.typedText.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
            this.typeSpeed = 50;
        } else {
            this.typedText.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
            this.typeSpeed = 100;
        }

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            this.isDeleting = true;
            this.typeSpeed = 2000;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            this.typeSpeed = 500;
        }

        setTimeout(() => this.type(), this.typeSpeed);
    },

    initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 10 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;

            particlesContainer.appendChild(particle);

            setTimeout(() => particle.remove(), 20000);
        };

        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 200);
        }

        // Continue creating particles
        setInterval(createParticle, 1000);
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    HeroController.init();
});
