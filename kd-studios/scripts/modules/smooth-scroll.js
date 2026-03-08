export function initSmoothScroll() {
    const offset = 96;
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (!targetSection) {
                return;
            }

            event.preventDefault();
            const top = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}
