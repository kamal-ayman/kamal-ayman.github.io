// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== TYPING EFFECT =====
const typedText = document.getElementById('typed-text');
const words = ['Flutter Developer', 'Mobile App Developer', 'UI/UX Enthusiast', 'Open Source Contributor'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create initial particles
for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 200);
}

// Continue creating particles
setInterval(createParticle, 1000);

// ===== SKILL BARS ANIMATION =====
const skillProgressBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillProgressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    });
};

// Intersection Observer for skill bars
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounters = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
};

// Intersection Observer for counters
const aboutSection = document.getElementById('about');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterObserver.observe(aboutSection);

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.project-card, .package-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // You can integrate with a service like EmailJS, Formspree, or your own backend
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== TILT EFFECT ON PROJECT CARDS =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});