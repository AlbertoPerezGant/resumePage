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

// Projects data for dynamic rendering
const projectsData = [
  {
    title: "Model training for RLHF",
    description: "Development of a course in colaboration with Datacamp related to a model training for Reinforcement Learning for Human Feedback.",
    badges: ["Python", "Neural Networks", "RLHF"]
  },
  {
    title: "Data Governance",
    description: "Implementation of procedures and dashboard for Data Quality control, using different data sources",
    badges: ["Data Quality", "Dashboards", "PowerBI"]
  },
  {
    title: "Data Pipeline Automation",
    description: "Automation of pipelines using Fabric and PySpark for lakehouse ingestions. Also, integration of different platforms via API.",
    badges: ["Apache Spark", "ETL", "Python", "Fabric"]
  },
  {
    title: "Inventory optimization with RL",
    description: "Development of a reinforcement learning model to optimize inventory management and reduce costs in supply chain operations.",
    badges: ["Reinforcement Learning", "Python", "Supply Chain"]
  },
  {
    title: "Image Detection",
    description: "Development of a project for image detection using YOLOv5 and PyTorch in agriculture enviroment.",
    badges: ["YOLO v5", "OpenCV", "Computer Vision"]
  },
  {
    title: "Embedded Systems",
    description: "Automation of communications between embedded systems and cloud platforms using Python and MQTT.",
    badges: ["Python", "MQTT", "IoT"]
  },
  {
    title: "Time Series",
    description: "Algorithmic development for error detection in time series accelerometers applying also RRN models and customized fourier series over signals.",
    badges: ["Time Series", "SVM", "Fourier Analysis"]
  },
  {
    title: "Data analysis", 
    description: "Analysis of large datasets to extract insights and support decision-making processes.", 
    badges: ["Python", "Pandas", "SQL", "PowerBI"]
}
];

function renderProjectsGrid() {
  const grid = document.getElementById('projects-grid-js');
  if (!grid) return;
  grid.innerHTML = projectsData.map(project => `
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

document.addEventListener('DOMContentLoaded', renderProjectsGrid);