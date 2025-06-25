// Este archivo contiene el código JavaScript para el proyecto. Se utiliza para agregar interactividad y funcionalidad a la página web.

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
});

// Alternar el menú desplegable
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

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

// Actualizar los puntos al desplazarse
carousel.addEventListener('scroll', updateIndicators);