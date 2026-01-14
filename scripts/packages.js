/**
 * Packages Section - Animation Controller
 * Handles scroll-triggered animations and interactive effects for package cards
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

// ===== PACKAGES RENDERER =====
class PackagesRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.packages = packagesData;
    }

    /**
     * Renders a single package card
     */
    renderPackageCard(pkg) {
        const featuresHtml = pkg.features
            .slice(0, 5)
            .map(feature => `
                <span class="package-feature">
                    <i class="fas fa-check-circle"></i>
                    ${feature}
                </span>
            `).join('');

        return `
            <article class="package-card" data-package-id="${pkg.id}">
                ${pkg.isNew ? '<div class="package-coming-soon">NEW</div>' : ''}
                
                <div class="package-card-header">
                    <div class="package-header-content">
                        <div class="package-icon-wrapper">
                            <i class="fas fa-cubes"></i>
                        </div>
                        <div class="package-badges">
                            <span class="package-version">v${pkg.version}</span>
                            <span class="package-platform">
                                <i class="fab fa-flutter"></i>
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
                            <span class="package-stat-label">points</span>
                        </div>
                        <div class="package-stat">
                            <i class="fas fa-fire"></i>
                            <span class="package-stat-value">${pkg.stats.popularity}</span>
                            <span class="package-stat-label">popular</span>
                        </div>
                    </div>
                </div>
                
                <div class="package-card-footer">
                    <a href="${pkg.links.pubDev}" target="_blank" rel="noopener noreferrer" class="package-link primary">
                        <i class="fas fa-external-link-alt"></i>
                        pub.dev
                    </a>
                    <a href="${pkg.links.github}" target="_blank" rel="noopener noreferrer" class="package-link secondary">
                        <i class="fab fa-github"></i>
                        GitHub
                    </a>
                </div>
            </article>
        `;
    }

    /**
     * Renders all packages to the container
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

        // Initialize animations after rendering
        this.initAnimations();
    }

    /**
     * Initializes scroll-triggered animations
     */
    initAnimations() {
        const cards = this.container.querySelectorAll('.package-card');

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            animationObserver.observe(card);
        });
    }
}

// ===== PACKAGES ANIMATION CONTROLLER =====
class PackagesAnimationController {
    constructor() {
        this.packagesSection = document.getElementById('packages');
        this.initTiltEffect();
        this.initHoverEffects();
    }

    /**
     * Adds subtle 3D tilt effect on hover
     */
    initTiltEffect() {
        const cards = document.querySelectorAll('.package-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;

                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px) 
                    scale(1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }

    /**
     * Adds ripple effect on click
     */
    initHoverEffects() {
        const links = document.querySelectorAll('.package-link');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');

                const rect = link.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);

                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

                link.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Render packages
    const renderer = new PackagesRenderer('packages-grid');
    renderer.render();

    // Initialize animations (after a small delay to ensure cards are rendered)
    setTimeout(() => {
        new PackagesAnimationController();
    }, 100);
});

// ===== EXPORT FOR POTENTIAL MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PackagesRenderer, PackagesAnimationController, packagesData };
}
