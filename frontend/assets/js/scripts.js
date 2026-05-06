// This file contains the JavaScript code for the project. It is used to add interactivity and functionality to the web page.

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

    // Smooth scroll for navigation links with offset
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

    // Button scroll to top
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

// Data will be loaded dynamically from data.json

async function loadAndRenderDynamicData() {
  try {
    const response = await fetch('data/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Render Hero
    const heroTitle = document.getElementById('hero-title-js');
    const heroSubtitle = document.getElementById('hero-subtitle-js');
    const heroDescription = document.getElementById('hero-description-js');
    
    if (heroTitle && data.hero) {
        heroTitle.textContent = data.hero.name;
    }
    if (heroSubtitle && data.hero) {
        heroSubtitle.textContent = data.hero.subtitle;
    }
    if (heroDescription && data.hero) {
        heroDescription.innerHTML = data.hero.description; // We use innerHTML because it contains <strong> tags
    }

    // Render Skills
    const skillsBadges = document.getElementById('skills-badges-js');
    if (skillsBadges && data.skills) {
        skillsBadges.innerHTML = data.skills.map(skill => `
            <span class="skill-badge">${skill}</span>
        `).join('');
    }

    // Render Experience
    const experienceList = document.getElementById('experience-list-js');
    if (experienceList && data.experience) {
      experienceList.innerHTML = data.experience.map(exp => `
        <div class="experience-card">
          <div class="experience-info">
            <h3>${exp.title}</h3>
            <ul>
              ${exp.responsibilities.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="experience-date">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10m-12 8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12z"/></svg>
            <span>${exp.date}</span>
          </div>
        </div>
      `).join('');
    }
    
    // Render Education
    const educationList = document.getElementById('education-list-js');
    if (educationList && data.education) {
      educationList.innerHTML = data.education.map(edu => `
        <div class="education-card">
            <div class="education-info">
                <div class="education-degree">${edu.degree}</div>
                <div class="education-school">${edu.school}</div>
            </div>
            <div class="education-date">
                <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" width=\"20\" height=\"20\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 7V3m8 4V3m-9 8h10m-12 8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12z\"/></svg>
                <span>${edu.date}</span>
            </div>
        </div>
      `).join('');
    }
    
    // Render Projects
    const projectsGrid = document.getElementById('projects-grid-js');
    if (projectsGrid && data.projects) {
      projectsGrid.innerHTML = data.projects.map(project => `
        <div class="project-card-v2">
          <div class="project-title-row">
            <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" width=\"20\" height=\"20\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M18 13V6a2 2 0 00-2-2H8a2 2 0 00-2 2v7m12 0a2 2 0 01-2 2H8a2 2 0 01-2-2m12 0v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5\"/></svg>
            ${project.title}
          </div>
          <div class="project-description">${project.description}</div>
          <div class="project-badges">
            ${project.badges.map(badge => `<span class="project-badge">${badge}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading dynamic data:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadAndRenderDynamicData);

// --- Contact Form Submission ---
const POCKETBASE_URL = "https://albertoperezgant.com/pb";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const emailValue = formData.get("email");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                alert("⚠️ Please enter a valid email address.");
                return;
            }

            try {
                const response = await fetch(`${POCKETBASE_URL}/api/collections/Contactos_Alberto/records`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.get("name"),
                        email: emailValue,
                        message: formData.get("message")
                    })
                });

                if (response.ok) {
                    alert("✅ Message sent successfully!");
                    form.reset();
                } else {
                    const result = await response.json();
                    alert("❌ Error: " + (result.message || "Unknown error"));
                }

            } catch (error) {
                console.error("Error sending form:", error);
                alert("⚠️ Could not connect to the server.");
            }
        });
    }
});