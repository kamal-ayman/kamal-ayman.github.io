/**
 * Packages Section Controller
 * Handles package data rendering and interactive effects
 * @module PackagesController
 */

// ===== PACKAGES DATA =====
const packagesData = [
    {
        id: 'hydro-glass-nav-bar',
        name: 'hydro_glass_nav_bar',
        version: '1.0.0-dev.3',
        description: 'A beautiful, Apple-style hydro glass floating navigation bar with advanced physics-based animations, draggable indicator, and expandable FAB support.',
        platform: 'Flutter',
        features: [
            'Hydro Glass Morphism',
            'Physics Animations',
            'Draggable Indicator',
            'Expandable FAB',
            'Theme Adaptive'
        ],
        stats: {
            likes: '⭐ New',
            points: '140',
            popularity: '100%'
        },
        links: {
            pubDev: 'https://pub.dev/packages/hydro_glass_nav_bar',
            github: 'https://github.com/kamal-ayman/hydro_glass_nav_bar'
        },
        isNew: true
    }
    // Add more packages here as you create them
];

/**
 * Packages Renderer Class
 */
class PackagesRenderer {
    /**
     * @param {string} containerId - ID of the container element
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.packages = packagesData;
    }

    /**
     * Render a single package card
     * @param {Object} pkg - Package data object
     * @returns {string} HTML string
     */
    renderPackageCard(pkg) {
        const featuresHtml = pkg.features
            .slice(0, 5)
            .map(feature => `
                <span class="package-feature">
                    <i class="fas fa-check"></i>
                    ${feature}
                </span>
            `).join('');

        return `
            <article class="package-card" data-package-id="${pkg.id}">
                ${pkg.isNew ? '<div class="package-new-badge">NEW</div>' : ''}
                
                <div class="package-card-header">
                    <div class="package-header-content">
                        <div class="package-icon-wrapper">
                            <i class="fas fa-cubes"></i>
                        </div>
                        <div class="package-badges">
                            <span class="package-version">v${pkg.version}</span>
                            <span class="package-platform">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" style="width:14px;height:14px;">
                                    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37l-.002-.001z"/>
                                </svg>
                                ${pkg.platform}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="package-card-body">
                    <h3 class="package-name">${pkg.name}</h3>
                    <p class="package-description">${pkg.description}</p>
                    
                    <div class="package-features">
                        ${featuresHtml}
                    </div>
                    
                    <div class="package-stats">
                        <div class="package-stat">
                            <i class="fas fa-thumbs-up"></i>
                            <span class="package-stat-value">${pkg.stats.likes}</span>
                        </div>
                        <div class="package-stat">
                            <i class="fas fa-chart-line"></i>
                            <span class="package-stat-value">${pkg.stats.points}</span>
                            <span class="package-stat-label">pts</span>
                        </div>
                        <div class="package-stat">
                            <i class="fas fa-fire"></i>
                            <span class="package-stat-value">${pkg.stats.popularity}</span>
                        </div>
                    </div>
                </div>
                
                <div class="package-card-footer">
                    <a href="${pkg.links.pubDev}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="package-link primary">
                        <i class="fas fa-external-link-alt"></i>
                        pub.dev
                    </a>
                    <a href="${pkg.links.github}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="package-link secondary">
                        <i class="fab fa-github"></i>
                        GitHub
                    </a>
                </div>
            </article>
        `;
    }

    /**
     * Render all packages
     */
    render() {
        if (!this.container) {
            console.warn('Packages container not found');
            return;
        }

        if (this.packages.length === 0) {
            this.container.innerHTML = `
                <div class="packages-empty">
                    <i class="fas fa-box-open"></i>
                    <p>No packages published yet. Stay tuned!</p>
                </div>
            `;
            return;
        }

        const packagesHtml = this.packages
            .map(pkg => this.renderPackageCard(pkg))
            .join('');

        this.container.innerHTML = packagesHtml;

        // Initialize animations after render
        this.initAnimations();
    }

    /**
     * Initialize scroll-triggered animations
     */
    initAnimations() {
        const cards = this.container.querySelectorAll('.package-card');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        cards.forEach(card => observer.observe(card));
    }
}

/**
 * Packages Animation Controller
 * Handles interactive effects for package cards
 */
class PackagesAnimationController {
    constructor() {
        this.initTiltEffect();
    }

    /**
     * Add subtle 3D tilt effect on hover
     */
    initTiltEffect() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const cards = document.querySelectorAll('.package-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });
    }

    /**
     * Handle tilt effect on mouse move
     * @param {MouseEvent} e - Mouse event
     * @param {HTMLElement} card - Card element
     */
    handleTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-10px) 
            scale(1.02)
        `;
    }

    /**
     * Reset tilt effect on mouse leave
     * @param {HTMLElement} card - Card element
     */
    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Render packages
    const renderer = new PackagesRenderer('packages-grid');
    renderer.render();

    // Initialize animations after a small delay
    setTimeout(() => {
        new PackagesAnimationController();
    }, 100);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PackagesRenderer, PackagesAnimationController, packagesData };
}
