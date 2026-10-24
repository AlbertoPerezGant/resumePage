// This file contains the JavaScript code for the project. It is used to add interactivity and functionality to the web page.

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        navLinks.addEventListener('click', event => {
            if (event.target.closest('a')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
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
