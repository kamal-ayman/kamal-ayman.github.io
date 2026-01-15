/**
 * Projects Section Controller
 * Handles project data rendering and animations
 * @module ProjectsController
 */

// ===== PROJECTS DATA =====
const projectsData = [
    {
        id: 'hydro-glass-nav-bar',
        title: 'Hydro Glass Nav Bar',
        category: 'Flutter Package',
        description: 'A beautiful, Apple-style hydro glass floating navigation bar with advanced physics-based animations and theme-adaptive design.',
        image: 'https://raw.githubusercontent.com/kamal-ayman/hydro_glass_nav_bar/main/assets/preview.gif',
        technologies: ['Flutter', 'Dart', 'Animation', 'Physics'],
        links: {
            demo: 'https://pub.dev/packages/hydro_glass_nav_bar',
            github: 'https://github.com/kamal-ayman/hydro_glass_nav_bar'
        },
        featured: false
    }
    // Add more projects here
];

/**
 * Projects Renderer Class
 */
class ProjectsRenderer {
    /**
     * @param {string} containerId - ID of the container element
     */
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.projects = projectsData;
    }

    /**
     * Render a single project card
     * @param {Object} project - Project data object
     * @returns {string} HTML string
     */
    renderProjectCard(project) {
        const techTags = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        const featuredClass = project.featured ? 'featured' : '';

        // Use placeholder if no image
        const imageUrl = project.image || this.generatePlaceholder(project.title);

        return `
            <article class="project-card ${featuredClass}" data-project-id="${project.id}">
                <div class="project-image">
                    <img src="${imageUrl}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        ${project.links.demo ? `
                            <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                                <i class="fas fa-external-link-alt"></i>
                                View Live
                            </a>
                        ` : ''}
                        ${project.links.github ? `
                            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
                                <i class="fab fa-github"></i>
                                Code
                            </a>
                        ` : ''}
                    </div>
                </div>
                <div class="project-content">
                    <span class="project-category">
                        <i class="fas fa-folder"></i>
                        ${project.category}
                    </span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techTags}
                    </div>
                </div>
            </article>
        `;
    }

    /**
     * Generate a placeholder image URL
     * @param {string} title - Project title
     * @returns {string} Placeholder URL
     */
    generatePlaceholder(title) {
        const colors = ['4ecca3', '00d9ff', '9b6dff', 'ff6b9d'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return `https://via.placeholder.com/600x400/${color}/0a0a0f?text=${encodeURIComponent(title)}`;
    }

    /**
     * Render all projects
     */
    render() {
        if (!this.container) {
            console.warn('Projects container not found');
            return;
        }

        if (this.projects.length === 0) {
            this.container.innerHTML = `
                <div class="packages-empty" style="grid-column: 1 / -1;">
                    <i class="fas fa-rocket"></i>
                    <p>Projects coming soon! Check back later.</p>
                </div>
            `;
            return;
        }

        // Sort to put featured first
        const sortedProjects = [...this.projects].sort((a, b) => {
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        });

        const projectsHtml = sortedProjects
            .map(project => this.renderProjectCard(project))
            .join('');

        this.container.innerHTML = projectsHtml;

        // Initialize animations after render
        this.initAnimations();
    }

    /**
     * Initialize scroll-triggered animations
     */
    initAnimations() {
        const cards = this.container.querySelectorAll('.project-card');

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

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    const renderer = new ProjectsRenderer('projects-grid');
    renderer.render();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsRenderer, projectsData };
}
