export function initRevealOnScroll() {
    const revealElements = Array.from(document.querySelectorAll('.reveal'));
    if (!revealElements.length) {
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -20px 0px'
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}
