// Este archivo contiene el código JavaScript para el proyecto. Se utiliza para agregar interactividad y funcionalidad a la página web.

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.onclick = function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        };
        // Cerrar el menú si se hace clic fuera
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Hacer que los enlaces del menú sean funcionales
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight; // Altura de la barra de navegación
                const sectionPosition = targetSection.offsetTop; // Posición de la sección
                const scrollPosition = sectionPosition - navbarHeight - 10; // Ajuste con margen de 10px

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth',
                });

                // Cerrar el menú después de hacer clic en un enlace
                navLinks.classList.remove('active');
            }
        });
    });

    // Botón scroll to top
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hacer que el título de la barra de navegación lleve arriba
    const navbarTitle = document.querySelector('.navbar-title');
    if (navbarTitle) {
        navbarTitle.style.cursor = 'pointer';
        navbarTitle.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Actualizar los puntos al desplazarse
carousel.addEventListener('scroll', updateIndicators);