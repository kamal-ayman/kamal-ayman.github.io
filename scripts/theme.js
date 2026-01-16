/**
 * Theme Controller
 * Handles light/dark mode toggling with persisted state and "Telegram-like" circular transition.
 * Uses the View Transitions API for performance.
 * @module ThemeController
 */

const ThemeController = {
    toggleBtn: null,
    theme: 'dark', // Default state

    init() {
        this.toggleBtn = document.getElementById('theme-toggle');

        // 1. Load saved theme or system preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.theme = savedTheme;
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            this.theme = 'light';
        }

        // 2. Apply initial state immediately (prevent flash if possible, though CSS is handled)
        // If theme is light, we set attribute. If dark (default), we leave it (variable fallbacks)
        if (this.theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        this.updateIcon();

        // 3. Bind events
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', (e) => this.toggleTheme(e));
        }
    },

    /**
     * Toggles the theme with a circular clip-path transition
     * @param {MouseEvent} event 
     */
    toggleTheme(event) {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';

        // Check if View Transitions are supported
        if (!document.startViewTransition) {
            this.applyTheme(newTheme);
            return;
        }

        // Get click coordinates for the transition center
        const x = event.clientX;
        const y = event.clientY;

        // Calculate radius to cover the entire screen from the click point
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        // Perform the View Transition
        const transition = document.startViewTransition(() => {
            this.applyTheme(newTheme);
        });

        // Animate the clip-path of the new view
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];

            // Animate only the new view expanding
            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 500,
                    easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // Smooth eased animation
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    },

    /**
     * Apps the theme state to DOM and Storage
     * @param {string} newTheme 
     */
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

    /**
     * Updates the toggle button icon
     */
    updateIcon() {
        if (!this.toggleBtn) return;
        const icon = this.toggleBtn.querySelector('i');
        if (!icon) return;

        // Add rotation animation class
        this.toggleBtn.classList.add('animate');
        setTimeout(() => this.toggleBtn.classList.remove('animate'), 500);

        if (this.theme === 'light') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeController.init();
});
