// Componentes reutilizables compartidos entre páginas (navbar y footer).
// Cada página declara los placeholders:
//   <nav class="navbar" data-component="navbar"></nav>
//   <footer class="footer" data-component="footer"></footer>
// En páginas distintas de index, data-prefix="index.html" hace que los
// enlaces de sección naveguen de vuelta a la página principal.

const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
];

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('[data-component="navbar"]');
    if (navbar) {
        const prefix = navbar.dataset.prefix || '';
        navbar.innerHTML = `
            <div class="navbar-logo">APG</div>
            <span class="navbar-title">Alberto Perez Gant</span>
            <button class="menu-toggle" type="button" aria-label="Open menu">☰</button>
            <div class="nav-links">
                ${NAV_LINKS.map((link, i) =>
                    `<a href="${prefix}#${link.id}"${!prefix && i === 0 ? ' class="active"' : ''}>${link.label}</a>`
                ).join('')}
            </div>`;
    }

    const footer = document.querySelector('[data-component="footer"]');
    if (footer) {
        footer.innerHTML = `
            <div class="footer-content">
                &copy; 2025 Alberto Perez. All rights reserved.
                <span class="footer-sep">|</span>
                <a href="privacy.html" class="footer-link">Privacy Policy</a>
            </div>`;
    }
});
