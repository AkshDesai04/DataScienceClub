document.addEventListener('DOMContentLoaded', () => {
    // Initialize standard UI components
    initNavbarScroll();
    initMobileMenu();
    updateActiveLink();
    updateYear();
    
    // Initialize Lucide icons if available
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Initialize Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));
});

function updateYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function updateActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Desktop Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.remove('text-slate-300', 'hover:text-white');
            link.classList.add('text-white', 'bg-primary/10');
        }
    });

    // Mobile Links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
            link.classList.remove('text-slate-300', 'hover:bg-primary/10', 'hover:text-primary');
            link.classList.add('text-white', 'bg-primary/10');
        }
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPath === 'index.html' || currentPath === '';

    if (!isHomePage) {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
    } else {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('navbar-scrolled', 'bg-slate-900/95', 'backdrop-blur-xl', 'shadow-2xl');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('navbar-scrolled', 'bg-slate-900/95', 'backdrop-blur-xl', 'shadow-2xl');
                navbar.classList.add('bg-transparent');
            }
        });
    }
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}
