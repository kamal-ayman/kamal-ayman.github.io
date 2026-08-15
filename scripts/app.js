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
            'Software Engineer',
            'Mobile App Developer',
            'Flutter Developer',
            'Android & iOS Developer'
        ],

        skills: [
            {
                category: 'Mobile Development',
                icon: 'fas fa-mobile-alt',
                tags: ['Flutter', 'Dart', 'Android', 'iOS', 'State Management (Provider, Riverpod, BLoC, GetX)', 'Responsive & Adaptive UI', 'App Store & Google Play Deployment', 'Performance Profiling & Optimization']
            },
            {
                category: 'Architecture & Practices',
                icon: 'fas fa-drafting-compass',
                tags: ['Clean Architecture', 'MVVM', 'SOLID Principles', 'Design Patterns', 'RESTful API Integration', 'Agile/Scrum', 'Code Review']
            },
            {
                category: 'Backend & Cloud Integration',
                icon: 'fas fa-cloud',
                tags: ['Firebase', 'Authentication', 'Push Notifications', 'Payment Gateway Integration', 'Maps SDK', 'Localization (i18n)', 'Remote APIs']
            },
            {
                category: 'Tools & DevOps',
                icon: 'fas fa-tools',
                tags: ['Git', 'GitHub', 'Postman', 'Fastlane', 'Codemagic', 'GitHub Actions (CI/CD)', 'Android Studio', 'Xcode', 'VS Code']
            },
            {
                category: 'Programming Languages',
                icon: 'fas fa-code',
                tags: ['Dart', 'Swift', 'Kotlin', 'Java', 'C#', 'C++', 'Python']
            },
            {
                category: 'Testing, Quality & AI',
                icon: 'fas fa-brain',
                tags: ['Unit Testing', 'Widget Testing', 'Debugging & Crash Analysis', 'AI-Assisted Development (Claude / Claude Code, ChatGPT, GitHub Copilot, Cursor)']
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
                id: 'nacd-admission',
                title: 'NACD Admission App',
                category: 'Government / Education',
                client: 'Freelance for BlackStone eIT',
                description: 'Built a student registration, admission, and testing platform from scratch for the National Academy for Childhood Development (NACD), a UAE Government entity under the Abu Dhabi Early Childhood Authority. Managed the project from architecture through client collaboration to release.',
                features: [
                    'Student registration & admission workflow',
                    'Online tests and document upload',
                    'Application tracking & real-time status notifications',
                    'REST API integration'
                ],
                metrics: '2.8K+ downloads (Google Play)',
                links: {
                    appStore: 'https://apps.apple.com/ae/app/القبول-في-nacd/id6745439273',
                    googlePlay: 'https://play.google.com/store/apps/details?id=ae.ac.nacd'
                },
                featured: true,
                icon: 'fas fa-graduation-cap',
                logo: 'assets/apps/logos/nacd.png',
                mockup: 'assets/apps/mockups/nacd.webp',
                gradientStart: '#10b981',
                gradientEnd: '#06b6d4',
                technologies: ['Flutter', 'Dart', 'REST API', 'App Release']
            },
            {
                id: 'mawajeeb-platform',
                title: 'Mawajeeb Platform',
                category: 'Food Delivery & Restaurant Management',
                client: 'Nerdware',
                description: 'Developed customer and restaurant applications from scratch, covering the full order lifecycle for a food delivery platform. Worked closely with designers and backend developers.',
                features: [
                    'Authentication & Restaurant management dashboard',
                    'Order management & Menu management',
                    'Push notifications & Third-party API integration'
                ],
                links: {
                    customerIos: 'https://apps.apple.com/eg/app/mawajeeb-مواچيب/id6752831356',
                    customerAndroid: 'https://play.google.com/store/apps/details?id=com.nerdware.eg.mawajeeb_user',
                    restaurantIos: 'https://apps.apple.com/eg/app/mawajeeb-restaurant/id6752826045',
                    restaurantAndroid: 'https://play.google.com/store/apps/details?id=com.nerdware.eg.mawajeeb_restaurant'
                },
                featured: true,
                icon: 'fas fa-utensils',
                logo: 'assets/apps/logos/mawajeeb.png',
                mockup: 'assets/apps/mockups/mawajeeb.webp',
                gradientStart: '#f97316',
                gradientEnd: '#ef4444',
                technologies: ['Flutter', 'Dart', 'REST API', 'Push Notifications']
            },
            {
                id: 'clash',
                title: 'Clash',
                category: 'Fintech / Digital Wallet / Super-App',
                client: 'Freelance for Fadaa Marketing',
                description: 'Delivered an all-in-one digital lifestyle app combining a secure digital wallet with shopping, entertainment, and news. Built as a super-app covering multiple product surfaces in one codebase, featuring bank-level encryption and offline capability.',
                features: [
                    'Digital wallet: secure transfers, multiple payment methods, real-time tracking',
                    'Shopping: integrated marketplace, secure checkout, order tracking, wishlist',
                    'Entertainment & News: games, interactive content, rewards, personalized feed',
                    'In-app chat, customer support, and 24/7 help',
                    'Multi-language support, offline capability, bank-level encryption'
                ],
                links: {
                    googlePlay: 'https://play.google.com/store/apps/details?id=com.fadaamarketing.clash'
                },
                featured: true,
                icon: 'fas fa-wallet',
                logo: 'assets/apps/logos/clash.png',
                mockup: 'assets/apps/mockups/clash.webp',
                gradientStart: '#a855f7',
                gradientEnd: '#3b82f6',
                technologies: ['Flutter', 'Super-App', 'Encryption', 'Real-time Chat']
            },
            {
                id: 'imprint-platform',
                title: 'Imprint Platform',
                category: 'Printing, Delivery & Operations',
                client: 'Nerdware',
                description: 'Built customer and delivery applications from scratch for a print-on-demand and delivery operations platform. Managed REST API integrations and implemented the operational dispatch logic.',
                features: [
                    'Authentication & Notifications',
                    'Delivery workflow and dispatch logic',
                    'REST API integration'
                ],
                metrics: '200+ downloads on Android',
                links: {
                    customerIos: 'https://apps.apple.com/ae/app/imprint-print-delivery-more/id6751331570',
                    customerAndroid: 'https://play.google.com/store/apps/details?id=com.nerdware.eg.imprint',
                    deliveryIos: 'https://apps.apple.com/ae/app/imprint-delivery/id6751771592',
                    deliveryAndroid: 'https://play.google.com/store/apps/details?id=com.nerdware.eg.imprint_delivery'
                },
                featured: false,
                icon: 'fas fa-print',
                logo: 'assets/apps/logos/imprint.png',
                mockup: 'assets/apps/mockups/imprint.webp',
                gradientStart: '#06b6d4',
                gradientEnd: '#3b82f6',
                technologies: ['Flutter', 'Dart', 'Operations', 'Dispatch Logic']
            },
            {
                id: 'omar-haridy',
                title: 'Omar Haridy',
                category: 'Legal Services',
                client: 'Nerdware',
                description: 'Developed a legal services app from scratch, including case tracking and client booking for a legal practice. Handled user authentication, booking workflows, and secure document upload.',
                features: [
                    'Authentication & Case management',
                    'File management & Client booking',
                    'User profiles & REST API integration'
                ],
                links: {
                    googlePlay: 'https://play.google.com/store/apps/details?id=com.nerdware.eg.omar_haridy'
                },
                featured: false,
                icon: 'fas fa-balance-scale',
                logo: 'assets/apps/logos/omarharidy.png',
                mockup: 'assets/apps/mockups/omarharidy.webp',
                gradientStart: '#eab308',
                gradientEnd: '#f97316',
                technologies: ['Flutter', 'Dart', 'Case Tracking', 'Booking API']
            },
            {
                id: 'coptic-bakasa',
                title: 'Coptic Bakasa',
                category: 'Social Game',
                description: 'Developed and published a complete multiplayer social game independently, including all game logic and backend.',
                features: [
                    'Firebase-powered real-time multiplayer game flow',
                    'Full game design and development'
                ],
                links: {
                    googlePlay: 'https://play.google.com/store/apps/details?id=com.kdstudios.coptic_bakasa'
                },
                featured: false,
                icon: 'fas fa-gamepad',
                logo: 'assets/apps/logos/copticbakasa.png',
                mockup: 'assets/apps/mockups/copticbakasa.webp',
                gradientStart: '#22c55e',
                gradientEnd: '#10b981',
                technologies: ['Flutter', 'Dart', 'Firebase Realtime', 'Game Logic']
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
        init() {
            // Force light mode theme
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
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
            this.initImageInteraction();
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
            // Skills section removed
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
                
                // Helper to render multiple custom action buttons
                const renderButtons = (links) => {
                    if (!links || Object.keys(links).length === 0) return '';
                    const linkConfig = {
                        appStore: { label: 'App Store', icon: 'fab fa-apple', class: 'btn-primary' },
                        googlePlay: { label: 'Google Play', icon: 'fab fa-google-play', class: 'btn-primary' },
                        customerIos: { label: 'Customer (iOS)', icon: 'fab fa-apple', class: 'btn-primary' },
                        customerAndroid: { label: 'Customer (Android)', icon: 'fab fa-google-play', class: 'btn-primary' },
                        restaurantIos: { label: 'Restaurant (iOS)', icon: 'fab fa-apple', class: 'btn-secondary' },
                        restaurantAndroid: { label: 'Restaurant (Android)', icon: 'fab fa-google-play', class: 'btn-secondary' },
                        deliveryIos: { label: 'Delivery (iOS)', icon: 'fab fa-apple', class: 'btn-secondary' },
                        deliveryAndroid: { label: 'Delivery (Android)', icon: 'fab fa-google-play', class: 'btn-secondary' },
                        orgSite: { label: 'Official Site', icon: 'fas fa-globe', class: 'btn-ghost' }
                    };

                    return Object.entries(links)
                        .map(([key, url]) => {
                            const conf = linkConfig[key] || { label: 'Link', icon: 'fas fa-external-link-alt', class: 'btn-ghost' };
                            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn ${conf.class}"><i class="${conf.icon}"></i> ${conf.label}</a>`;
                        })
                        .join('');
                };

                const featuresList = p.features && p.features.length > 0
                    ? `<ul class="project-features-list">
                           ${p.features.map(f => `<li><i class="fas fa-check-circle"></i> <span>${f}</span></li>`).join('')}
                       </ul>`
                    : '';

                const metricsBadge = p.metrics
                    ? `<div class="project-metrics-badge"><i class="fas fa-arrow-circle-down"></i> <span>${p.metrics}</span></div>`
                    : '';

                const clientInfo = p.client
                    ? `<span class="project-client"><i class="fas fa-user-tie"></i> ${p.client}</span>`
                    : '';

                // Build CSS mockup based on app type (Desktop vs Mobile phone mockup)
                let mockupHtml = '';
                const gradientStart = p.gradientStart || 'var(--color-brand-primary)';
                const gradientEnd = p.gradientEnd || 'var(--color-brand-secondary)';
                
                if (p.isDesktop) {
                    mockupHtml = `
                        <div class="desktop-mockup-wrapper">
                            <div class="desktop-frame">
                                <div class="desktop-header">
                                    <span class="desktop-dot red"></span>
                                    <span class="desktop-dot yellow"></span>
                                    <span class="desktop-dot green"></span>
                                    <div class="desktop-address-bar">saintdidymus.school</div>
                                </div>
                                <div class="desktop-screen" style="background: linear-gradient(135deg, ${gradientStart}33 0%, ${gradientEnd}11 100%)">
                                    ${p.mockup ? `<img src="${p.mockup}" class="desktop-screenshot" alt="${p.title}" loading="lazy">` : `
                                    <div class="desktop-app-body">
                                        <div class="phone-app-icon-wrapper" style="color: ${gradientStart}">
                                            <i class="${p.icon}"></i>
                                        </div>
                                        <h4 class="phone-app-name">${p.title}</h4>
                                        <span class="phone-app-category">${p.category}</span>
                                        <div class="desktop-dashboard-preview">
                                            <div class="dash-bar"></div>
                                            <div class="dash-bar short"></div>
                                        </div>
                                    </div>
                                    `}
                                </div>
                            </div>
                        </div>`;
                } else {
                    mockupHtml = `
                        <div class="phone-mockup-wrapper">
                            <div class="phone-frame">
                                <div class="phone-speaker"></div>
                                <div class="phone-screen" style="background: linear-gradient(135deg, ${gradientStart}33 0%, ${gradientEnd}11 100%)">
                                    <div class="phone-app-header">
                                        <span class="phone-app-time">9:41</span>
                                        <div class="phone-app-battery"><i class="fas fa-battery-three-quarters"></i></div>
                                    </div>
                                    ${p.mockup ? `<img src="${p.mockup}" class="phone-screenshot" alt="${p.title}" loading="lazy">` : `
                                    <div class="phone-app-body">
                                        <div class="phone-app-icon-wrapper" style="color: ${gradientStart}">
                                            <i class="${p.icon}"></i>
                                        </div>
                                        <h4 class="phone-app-name">${p.title}</h4>
                                        <span class="phone-app-category">${p.category}</span>
                                        <div class="phone-app-preview-cards">
                                            <div class="preview-card-item"></div>
                                            <div class="preview-card-item short"></div>
                                        </div>
                                    </div>
                                    `}
                                </div>
                                <div class="phone-home-indicator"></div>
                            </div>
                        </div>`;
                }

                const logoHtml = p.logo 
                    ? `<img src="${p.logo}" class="project-logo" alt="${p.title} Logo">` 
                    : `<div class="project-logo-fallback"><i class="${p.icon}"></i></div>`;

                return `
                    <article class="project-card ${p.featured ? 'featured' : ''}" data-project-id="${p.id}">
                        <div class="project-visual">
                            ${mockupHtml}
                        </div>
                        <div class="project-content">
                            <div class="project-header-info">
                                ${logoHtml}
                                <div class="project-meta-details">
                                    <span class="project-category"><i class="fas fa-folder"></i>${p.category}</span>
                                    ${clientInfo}
                                </div>
                            </div>
                            <h3 class="project-title">${p.title}</h3>
                            <p class="project-description">${p.description}</p>
                            
                            ${featuresList}
                            
                            <div class="project-footer-meta">
                                <div class="project-tech">${tags}</div>
                                ${metricsBadge}
                            </div>
                            
                            <div class="project-buttons">
                                ${renderButtons(p.links)}
                            </div>
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
            $$('.skill-category, .project-card, .package-card, .timeline-item, .education-card, .context-card').forEach(el => el.classList.add('animate-in'));
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
            $$('.skill-category, .project-card, .package-card, .timeline-item, .education-card, .context-card').forEach((el, i) => {
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
        ProjectsModule.init();
        PackagesModule.init();

        // Animations (must come after renderers)
        AnimationsModule.init();

        console.log('✅ System ready.');
    });

})();
