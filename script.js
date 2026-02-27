// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section, header');
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// Immediate check for initial load
if (window.scrollY > 50) navbar.classList.add('scrolled');

// Mobile Menu Toggle
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Reveal Animation using Intersection Observer
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

if (revealElements.length > 0) {
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// Parallax effect on Hero Background
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    const scrollVal = window.scrollY;
    // Only apply parallax if user hasn't scrolled past the hero section to save performance
    if (heroBg && scrollVal < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollVal * 0.4}px)`;
    }
});

// Video Modal Logic
const videoLinks = document.querySelectorAll('.video-link');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close-modal');

if (videoLinks.length > 0 && videoModal) {
    videoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = link.getAttribute('data-video');
            modalVideo.src = videoSrc;
            videoModal.style.display = 'flex';
            videoModal.style.justifyContent = 'center';
            videoModal.style.alignItems = 'center';

            // Force reflow
            void videoModal.offsetWidth;
            videoModal.classList.add('show');
            modalVideo.play().catch(err => console.log("Auto-play prevented", err));
        });
    });

    const closeVideoModal = () => {
        videoModal.classList.remove('show');
        setTimeout(() => {
            videoModal.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = "";
        }, 300);
    };

    closeModal.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && videoModal.classList.contains('show')) {
            closeVideoModal();
        }
    });
}
