export function initThemeToggle() {
    const themeButton = document.querySelector('#theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeButton ? themeButton.querySelector('i') : null;

    const applyTheme = (isDark) => {
        if (isDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
            localStorage.setItem('kd-theme', 'dark');
            return;
        }

        htmlElement.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        localStorage.setItem('kd-theme', 'light');
    };

    const storedTheme = localStorage.getItem('kd-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(storedTheme === 'dark' || (!storedTheme && prefersDark));

    if (!themeButton) {
        return;
    }

    themeButton.addEventListener('click', () => {
        const isDarkTheme = htmlElement.getAttribute('data-theme') === 'dark';
        applyTheme(!isDarkTheme);
    });
}
