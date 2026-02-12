async function loadComponent(elementId, filePath) {
    // Global check: If user opens via file://, auto-redirect to the server.
    if (window.location.protocol === 'file:') {
        // Build the correct URL on localhost
        // Assuming the root of the serving folder corresponds to localhost:3000/
        const fileName = window.location.pathname.split('/').pop() || 'index.html';
        window.location.href = `http://localhost:3000/${fileName}`;
        return; 
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Return a promise that resolves when the component is loaded
        return true;
    } catch (error) {
        console.error(error);
        const el = document.getElementById(elementId);
        if (el) {
            el.innerHTML = `<div style="color: #ef4444; padding: 1rem; text-align: center; border: 1px solid #ef4444; margin: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 0.5rem;">
                <strong>Error loading component (${filePath})</strong><br>
                <div style="font-size: 0.875rem; margin-top: 0.5rem;">
                    You are viewing this file via <code>file://</code> protocol.<br>
                    <strong>Please double-click <code>run_website.bat</code> in your folder.</strong>
                </div>
                <div style="margin-top: 0.5rem;">
                    Or click here: <a href="http://localhost:3000" style="color: #f97316; text-decoration: underline; font-weight: bold;">OPEN WEBSITE CORRECTLY</a>
                </div>
            </div>`;
        }
        return false;
    }
}

async function initApp() {
    await loadComponent('navbar-placeholder', 'components/navbar.html');
    await loadComponent('footer-placeholder', 'components/footer.html');

    // Initialize UI logic after components are loaded
    initNavbarScroll();
    initMobileMenu();
    updateActiveLink();
    updateYear(); // Update footer year
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

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

document.addEventListener('DOMContentLoaded', initApp);
