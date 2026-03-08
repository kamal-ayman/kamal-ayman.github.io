/**
 * Portfolio Application - Professional Modular Architecture
 * IIFE-based module system for maximum compatibility
 */
(function () {
    'use strict';

    // ═══════════════════════════════════════════
    // DATA LAYER - Pure content/configuration
    // ═══════════════════════════════════════════

    const Data = {
        typingWords: [
            'Flutter Developer',
            'Mobile App Expert',
            'UI/UX Enthusiast',
            'Open Source Creator'
        ],

        skills: [
            {
                category: 'Mobile Development',
                icon: 'fas fa-mobile-alt',
                tags: ['Flutter', 'Dart', 'Android (Kotlin)', 'Swift (iOS)']
            },
            {
                category: 'Backend & Database',
                icon: 'fas fa-server',
                tags: ['Firebase', 'REST APIs', 'GraphQL', 'SQLite', 'Hive', 'Supabase']
            },
            {
                category: 'Tools & Practices',
                icon: 'fas fa-cogs',
                tags: ['Git & GitHub', 'CI/CD', 'Clean Architecture', 'TDD', 'Figma', 'Jira']
            }
        ],

        packages: [
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
                stats: { likes: '⭐ New', points: '140', popularity: '100%' },
                links: {
                    pubDev: 'https://pub.dev/packages/hydro_glass_nav_bar',
                    github: 'https://github.com/kamal-ayman/hydro_glass_nav_bar'
                },
                isNew: true
            }
        ],

        projects: [
            {
                id: 'bakasa-coptic',
                title: 'Bakasa Coptic',
                category: 'Mobile Game',
                description: 'An immersive social deduction party game. Find the impostor, outsmart your friends, and dominate game sessions with customized rules and themes.',
                image: 'pages/kd-studios/pages/coptic-bakasa/assets/images/1.png',
                technologies: ['Flutter', 'Dart', 'Firebase', 'Game Design'],
                links: {
                    demo: 'pages/kd-studios/pages/coptic-bakasa/index.html',
                    github: 'https://play.google.com/store/apps/details?id=com.kdstudios.coptic_bakasa'
                },
                featured: true
            }
        ]
    };

    // ═══════════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════════

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const getEl = (id) => document.getElementById(id);
    const on = (el, ev, fn) => { if (el) el.addEventListener(ev, fn); };

    // ═══════════════════════════════════════════
    // MODULE: Theme
    // ═══════════════════════════════════════════

    const ThemeModule = {
        toggleBtn: null,
        theme: 'dark',

        init() {
            this.toggleBtn = getEl('theme-toggle');

            const saved = localStorage.getItem('theme');
            if (saved) {
                this.theme = saved;
            } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                this.theme = 'light';
            }

            if (this.theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            }

            this.updateIcon();
            on(this.toggleBtn, 'click', (e) => this.toggleTheme(e));
        },

        toggleTheme(event) {
            const newTheme = this.theme === 'dark' ? 'light' : 'dark';

            if (!document.startViewTransition) {
                this.applyTheme(newTheme);
                return;
            }

            const x = event.clientX;
            const y = event.clientY;
            const endRadius = Math.hypot(
                Math.max(x, innerWidth - x),
                Math.max(y, innerHeight - y)
            );

            const transition = document.startViewTransition(() => {
                this.applyTheme(newTheme);
            });

            transition.ready.then(() => {
                document.documentElement.animate(
                    {
                        clipPath: [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${endRadius}px at ${x}px ${y}px)`
                        ],
                    },
                    {
                        duration: 500,
                        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                        pseudoElement: '::view-transition-new(root)',
                    }
                );
            });
        },

        applyTheme(newTheme) {
            this.theme = newTheme;
            if (newTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', newTheme);
            this.updateIcon();
        },

        updateIcon() {
            if (!this.toggleBtn) return;
            const icon = this.toggleBtn.querySelector('i');
            if (!icon) return;

            this.toggleBtn.classList.add('animate');
            setTimeout(() => this.toggleBtn.classList.remove('animate'), 500);
            icon.className = this.theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    // ═══════════════════════════════════════════
    // MODULE: Navigation
    // ═══════════════════════════════════════════

    const NavigationModule = {
        navbar: null,
        hamburger: null,
        navLinks: null,
        sections: null,
        navLinksAll: null,
        backToTop: null,

        init() {
            this.navbar = getEl('navbar');
            this.hamburger = getEl('hamburger');
            this.navLinks = getEl('nav-links');
            this.sections = $$('section[id]');
            this.navLinksAll = $$('.nav-link');
            this.backToTop = getEl('back-to-top');

            this.bindEvents();
        },

        bindEvents() {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                }, 10);
            });

            on(this.hamburger, 'click', () => this.toggleMobileMenu());

            this.navLinksAll.forEach(link => {
                on(link, 'click', () => this.closeMobileMenu());
            });

            $$('a[href^="#"]').forEach(anchor => {
                on(anchor, 'click', (e) => this.handleSmoothScroll(e));
            });

            on(document, 'keydown', (e) => {
                if (e.key === 'Escape') this.closeMobileMenu();
            });

            on(document, 'click', (e) => {
                if (this.navLinks?.classList.contains('active')) {
                    if (!this.navLinks.contains(e.target) && !this.hamburger.contains(e.target)) {
                        this.closeMobileMenu();
                    }
                }
            });
        },

        handleScroll() {
            const scrollY = window.scrollY;
            if (this.navbar) this.navbar.classList.toggle('scrolled', scrollY > 50);
            if (this.backToTop) this.backToTop.classList.toggle('visible', scrollY > 500);
            this.updateActiveLink();
        },

        updateActiveLink() {
            const scrollY = window.scrollY + 200;
            this.sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollY >= top && scrollY < top + height) {
                    this.navLinksAll.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },

        toggleMobileMenu() {
            const isActive = this.hamburger.classList.toggle('active');
            this.navLinks.classList.toggle('active');
            this.hamburger.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        },

        closeMobileMenu() {
            this.hamburger?.classList.remove('active');
            this.navLinks?.classList.remove('active');
            this.hamburger?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        },

        handleSmoothScroll(e) {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = getEl(targetId.substring(1));
            if (target) {
                const navHeight = this.navbar?.offsetHeight || 0;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        }
    };

    // ═══════════════════════════════════════════
    // MODULE: Hero (Typing, Particles, 3D Image)
    // ═══════════════════════════════════════════

    const HeroModule = {
        typedText: null,
        words: Data.typingWords,
        wordIndex: 0,
        charIndex: 0,
        isDeleting: false,
        typeSpeed: 100,

        init() {
            this.initTypingEffect();
            this.initParticles();
        },

        initTypingEffect() {
            this.typedText = getEl('typed-text');
            if (this.typedText) this.type();
        },

        type() {
            const currentWord = this.words[this.wordIndex];

            if (this.isDeleting) {
                this.charIndex--;
                this.typeSpeed = 40;
            } else {
                this.charIndex++;
                this.typeSpeed = 80;
            }

            this.typedText.textContent = currentWord.substring(0, this.charIndex);

            if (!this.isDeleting && this.charIndex === currentWord.length) {
                this.isDeleting = true;
                this.typeSpeed = 2500;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.wordIndex = (this.wordIndex + 1) % this.words.length;
                this.typeSpeed = 400;
            }

            setTimeout(() => this.type(), this.typeSpeed);
        },

        initParticles() {
            const container = getEl('particles');
            if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const createParticle = () => {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const size = Math.random() * 6 + 2;
                const duration = Math.random() * 15 + 15;
                const delay = Math.random() * 5;

                Object.assign(particle.style, {
                    width: `${size}px`, height: `${size}px`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    opacity: Math.random() * 0.3 + 0.1
                });
                container.appendChild(particle);
                setTimeout(() => particle.remove(), (duration + delay) * 1000);
            };

            const count = window.innerWidth > 768 ? 15 : 8;
            for (let i = 0; i < count; i++) setTimeout(createParticle, i * 300);
            setInterval(createParticle, 2000);
        },

        initImageInteraction() {
            const wrapper = $('.image-wrapper');
            if (!wrapper) return;

            const state = { rotateX: 0, rotateY: 0, targetRotateX: 0, targetRotateY: 0, mouseX: 0, mouseY: 0, keyX: 0, keyY: 0 };
            const config = { sensitivity: 20, lerpFactor: 0.1, keyStep: 5 };

            document.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                state.mouseX = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))) * config.sensitivity;
                state.mouseY = -Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))) * config.sensitivity;
            });

            document.addEventListener('keydown', (e) => {
                if (window.scrollY > window.innerHeight * 0.8) return;
                switch (e.key) {
                    case 'ArrowUp': state.keyY = Math.min(state.keyY + config.keyStep, config.sensitivity); e.preventDefault(); break;
                    case 'ArrowDown': state.keyY = Math.max(state.keyY - config.keyStep, -config.sensitivity); e.preventDefault(); break;
                    case 'ArrowLeft': state.keyX = Math.max(state.keyX - config.keyStep, -config.sensitivity); e.preventDefault(); break;
                    case 'ArrowRight': state.keyX = Math.min(state.keyX + config.keyStep, config.sensitivity); e.preventDefault(); break;
                    case 'Escape': state.keyX = 0; state.keyY = 0; break;
                }
            });

            const animate = () => {
                state.targetRotateY = Math.max(-config.sensitivity, Math.min(config.sensitivity, state.mouseX + state.keyX));
                state.targetRotateX = Math.max(-config.sensitivity, Math.min(config.sensitivity, state.mouseY + state.keyY));
                state.rotateX += (state.targetRotateX - state.rotateX) * config.lerpFactor;
                state.rotateY += (state.targetRotateY - state.rotateY) * config.lerpFactor;
                wrapper.style.transform = `perspective(1000px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                wrapper.style.filter = `brightness(${100 + (state.rotateY / 2)}%) contrast(1.05)`;
                requestAnimationFrame(animate);
            };
            animate();
        }
    };

    // ═══════════════════════════════════════════
    // MODULE: Skills Renderer
    // ═══════════════════════════════════════════

    const SkillsModule = {
        init() {
            const container = getEl('skills-grid');
            if (!container) return;

            container.innerHTML = Data.skills.map(skill => `
                <article class="skill-category">
                    <h3><i class="${skill.icon}"></i>${skill.category}</h3>
                    <div class="skill-tags">
                        ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                    </div>
                </article>
            `).join('');
        }
    };

    // ═══════════════════════════════════════════
    // MODULE: Projects Renderer
    // ═══════════════════════════════════════════

    const ProjectsModule = {
        init() {
            const container = getEl('projects-grid');
            if (!container) return;

            if (Data.projects.length === 0) {
                container.innerHTML = `<div class="packages-empty" style="grid-column: 1 / -1;"><i class="fas fa-rocket"></i><p>Coming soon!</p></div>`;
                return;
            }

            const sorted = [...Data.projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            container.innerHTML = sorted.map(p => {
                const tags = p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');
                const img = p.image || `https://via.placeholder.com/600x400/4ecca3/0a0a0f?text=${encodeURIComponent(p.title)}`;

                // Dynamic button labels and icons
                const demoLabel = p.links.demo.includes('google.com') ? 'Play Store' : 'View Demo';
                const demoIcon = p.links.demo.includes('google.com') ? 'fab fa-google-play' : 'fas fa-external-link-alt';

                const githubLabel = p.links.github.includes('play.google.com') ? 'Play Store' : 'View Code';
                const githubIcon = p.links.github.includes('github.com') ? 'fab fa-github' : 'fas fa-rocket';

                return `
                    <article class="project-card ${p.featured ? 'featured' : ''}" data-project-id="${p.id}">
                        <div class="project-image">
                            <img src="${img}" alt="${p.title}" loading="lazy">
                            <div class="project-overlay">
                                ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" class="btn btn-primary"><i class="${demoIcon}"></i> ${demoLabel}</a>` : ''}
                                ${p.links.github ? `<a href="${p.links.github}" target="_blank" class="btn btn-ghost"><i class="${githubIcon}"></i> ${githubLabel}</a>` : ''}
                            </div>
                        </div>
                        <div class="project-content">
                            <span class="project-category"><i class="fas fa-folder"></i>${p.category}</span>
                            <h3 class="project-title">${p.title}</h3>
                            <p class="project-description">${p.description}</p>
                            <div class="project-tech">${tags}</div>
                        </div>
                    </article>`;
            }).join('');
        }
    };

    // ═══════════════════════════════════════════
    // MODULE: Packages Renderer
    // ═══════════════════════════════════════════

    const PackagesModule = {
        init() {
            const container = getEl('packages-grid');
            if (!container) return;

            if (Data.packages.length === 0) {
                container.innerHTML = `<div class="packages-empty"><i class="fas fa-box-open"></i><p>No packages published yet.</p></div>`;
                return;
            }

            container.innerHTML = Data.packages.map(pkg => this.renderCard(pkg)).join('');
            this.initTiltEffect();
        },

        renderCard(pkg) {
            const features = pkg.features.slice(0, 5).map(f => `<span class="package-feature"><i class="fas fa-check"></i>${f}</span>`).join('');
            return `
                <article class="package-card" data-package-id="${pkg.id}">
                    ${pkg.isNew ? '<div class="package-new-badge">NEW</div>' : ''}
                    <div class="package-card-header">
                        <div class="package-header-content">
                            <div class="package-icon-wrapper"><i class="fas fa-cubes"></i></div>
                            <div class="package-badges"><span class="package-version">v${pkg.version}</span><span class="package-platform">${pkg.platform}</span></div>
                        </div>
                    </div>
                    <div class="package-card-body">
                        <h3 class="package-name">${pkg.name}</h3>
                        <p class="package-description">${pkg.description}</p>
                        <div class="package-features">${features}</div>
                        <div class="package-stats">
                            <div class="package-stat"><i class="fas fa-thumbs-up"></i><span>${pkg.stats.likes}</span></div>
                            <div class="package-stat"><i class="fas fa-chart-line"></i><span>${pkg.stats.points}</span>pts</div>
                            <div class="package-stat"><i class="fas fa-fire"></i><span>${pkg.stats.popularity}</span></div>
                        </div>
                    </div>
                    <div class="package-card-footer">
                        <a href="${pkg.links.pubDev}" target="_blank" rel="noopener noreferrer" class="package-link primary">pub.dev</a>
                        <a href="${pkg.links.github}" target="_blank" rel="noopener noreferrer" class="package-link secondary">GitHub</a>
                    </div>
                </article>`;
        },

        initTiltEffect() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            $$('.package-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    card.style.transform = `perspective(1000px) rotateX(${-y / 25}deg) rotateY(${x / 25}deg) translateY(-10px) scale(1.02)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
                });
            });
        }
    };

    // ═══════════════════════════════════════════
    // MODULE: Section Animations
    // ═══════════════════════════════════════════

    const AnimationsModule = {
        observer: null,

        init() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                this.showAll();
                return;
            }
            this.initObserver();
            this.observeElements();
            this.initCounters();
        },

        showAll() {
            $$('.skill-category, .project-card, .package-card').forEach(el => el.classList.add('animate-in'));
            $$('.stat-number').forEach(s => s.textContent = s.dataset.target);
        },

        initObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        },

        observeElements() {
            $$('.skill-category, .project-card, .package-card').forEach((el, i) => {
                el.style.transitionDelay = `${(i % 3) * 0.1}s`;
                this.observer.observe(el);
            });
        },

        initCounters() {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0, rootMargin: '0px 0px 100px 0px' });

            $$('.stat-number').forEach(s => {
                const rect = s.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    this.animateCounter(s);
                } else {
                    counterObserver.observe(s);
                }
            });
        },

        animateCounter(el) {
            if (el.classList.contains('animated')) return;
            el.classList.add('animated');
            const target = parseInt(el.dataset.target);
            if (target === 0) return;

            const duration = 2000;
            const start = performance.now();
            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 4);
                el.textContent = Math.round(ease * target);
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
    };

    // ═══════════════════════════════════════════
    // APP BOOTSTRAP
    // ═══════════════════════════════════════════

    document.addEventListener('DOMContentLoaded', () => {
        console.log('🚀 Portfolio Initializing...');

        // Core
        ThemeModule.init();
        NavigationModule.init();

        // Features
        HeroModule.init();
        SkillsModule.init();
        ProjectsModule.init();
        PackagesModule.init();

        // Animations (must come after renderers)
        AnimationsModule.init();

        console.log('✅ System ready.');
    });

})();
