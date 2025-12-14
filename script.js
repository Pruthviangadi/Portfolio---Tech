// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navList = document.querySelector('.nav-list');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme-preference', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme-preference', 'light');
    }
    updateThemePanelActive();
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navList.classList.toggle('active');
    body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
	if (!mobileMenuToggle.contains(e.target) && !navList.contains(e.target)) {
		mobileMenuToggle.classList.remove('active');
		navList.classList.remove('active');
		body.style.overflow = '';
	}
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		const targetId = link.getAttribute('href');
		const targetSection = document.querySelector(targetId);
		
		if (targetSection) {
			e.preventDefault();
			targetSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Download Resume Button
const downloadBtn = document.querySelector('.btn-primary');
downloadBtn.addEventListener('click', () => {
    // Create a sample resume download
    const resumeContent = `
Fakkirashetti Angadi
Full Stack Developer

EXPERIENCE
Full Stack Developer Intern - Amba Softwares. (Oct 2023-Nov 2023)
• Built and maintained multiple web applications using modern technologies
• Collaborated with cross-functional teams to deliver high-quality products
• Optimized application performance and user experience

Cloud Application Developer Intern - Rooman Technologies (Sep 2024- March 2025)
• Successfully completed a Research/Industry Internship as a Cloud Application Developer under the PMKVY program, 
supported by NSDC and conducted by Rooman Technologies. The internship provided hands-on experience in cloud 
technologies, application deployment, and industry-relevant skills.
• Led the integration of Built a strong foundation in Cloud Application Development, aligning with current IT industry demands, enhancing team collaboration and automating deployment workflows.
• Optimized application performance and user experience

Full Stack Developer Intern - Tap Academy. (June 2025- Present)
• Trained Full Stack Developer skilled in Java, Spring Boot, React JS, JavaScript, HTML, CSS, and SQL, with experience in building end-to-end web applications.
• with hands-on experience building complete end-to-end web applications.
• Built and maintained multiple web applications using modern technologies
• Collaborated with cross-functional teams to deliver high-quality products
• Optimized application performance and user experience

SKILLS
Frontend: React, Vue.js, JavaScript, TypeScript, HTML/CSS
Backend: Node.js, Python, Java,  Django
AI & DevOps: Machine Learning, Kubernetes, AWS, CI/CD

EDUCATION
Bachelor's in Computer Science And Engineering With 7.2 CGPA
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abhishek_Alavandi_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Let's Connect Button
const connectBtn = document.querySelector('.btn-secondary');
connectBtn.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Scroll Indicator Click
const scrollIndicator = document.querySelector('.scroll-indicator');
scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add animation on scroll for skills
const skillCategories = document.querySelectorAll('.skill-category');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(category);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = body.classList.contains('dark-mode') 
            ? 'rgba(26, 26, 26, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = body.classList.contains('dark-mode') 
            ? 'rgba(26, 26, 26, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
});

// Initialize theme based on user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const savedPreference = localStorage.getItem('theme-preference'); // 'light' | 'dark' | 'system'
applyTheme(savedPreference || 'system');
updateThemePanelActive();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Particle Background
(function initParticles() {
    const canvas = document.getElementById('backgroundCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    const config = {
        count: Math.min(100, Math.floor((width * height) / 18000)),
        maxSpeed: 0.5,
        linkDistance: 110
    };
    
    function themeColors() {
        const isDark = document.body.classList.contains('dark-mode');
        return isDark
            ? { dot: 'rgba(255,255,255,0.6)', link: 'rgba(255,255,255,0.15)' }
            : { dot: 'rgba(76,90,220,0.7)', link: 'rgba(102,126,234,0.18)' };
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < config.count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * config.maxSpeed,
                vy: (Math.random() - 0.5) * config.maxSpeed,
                r: 1 + Math.random() * 1.8
            });
        }
    }
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        config.count = Math.min(120, Math.floor((width * height) / 18000));
        createParticles();
    }
    
    function step() {
        const colors = themeColors();
        ctx.clearRect(0, 0, width, height);
        
        // Move and draw particles
        ctx.fillStyle = colors.dot;
        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw links
        ctx.strokeStyle = colors.link;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.hypot(dx, dy);
                if (dist < config.linkDistance) {
                    ctx.globalAlpha = 1 - dist / config.linkDistance;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        
        requestAnimationFrame(step);
    }

    window.addEventListener('resize', resize);
    resize();
    step();
})();

// Theme panel logic
const themeSystem = document.getElementById('themeSystem');
const themeLight = document.getElementById('themeLight');
const themeDark = document.getElementById('themeDark');

function applyTheme(mode) {
    const icon = themeToggle.querySelector('i');
    if (mode === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme-preference', 'dark');
    } else if (mode === 'light') {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme-preference', 'light');
    } else {
        // system
        const systemIsDark = prefersDark.matches;
        body.classList.toggle('dark-mode', systemIsDark);
        if (systemIsDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        localStorage.setItem('theme-preference', 'system');
    }
}

function currentThemePreference() {
    return localStorage.getItem('theme-preference') || 'system';
}

function updateThemePanelActive() {
    const pref = currentThemePreference();
    [themeSystem, themeLight, themeDark].forEach(el => {
        if (!el) return;
        el.classList.remove('active');
    });
    if (pref === 'system' && themeSystem) themeSystem.classList.add('active');
    if (pref === 'light' && themeLight) themeLight.classList.add('active');
    if (pref === 'dark' && themeDark) themeDark.classList.add('active');
}

if (themeSystem) themeSystem.addEventListener('click', () => { applyTheme('system'); updateThemePanelActive(); });
if (themeLight) themeLight.addEventListener('click', () => { applyTheme('light'); updateThemePanelActive(); });
if (themeDark) themeDark.addEventListener('click', () => { applyTheme('dark'); updateThemePanelActive(); });

// React to system theme changes when in 'system' mode
prefersDark.addEventListener('change', () => {
    if (currentThemePreference() === 'system') {
        applyTheme('system');
        updateThemePanelActive();
    }
});
