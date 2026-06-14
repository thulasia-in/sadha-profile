/* ==========================================================================
   Sadhasivam Portfolio Javascript Script
   Interactivity: Custom Modals, Filtering, Smooth Scrolling, Scroll Reveals
   ========================================================================== */

// --- Lucide Icons Initialization ---
lucide.createIcons();

// --- Configuration ---
// 1. Get your free access key at https://web3forms.com/ and paste it here to receive real emails:
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; 

// 2. Customize your social links here:
const SOCIAL_LINKS = {
    github: "https://github.com/sadha8986", // Replace with your real GitHub URL
    linkedin: "https://linkedin.com/in/sadhasivam-m", // Replace with your real LinkedIn URL
    email: "sadha8986@gmail.com"
};

// --- DOM Query Selectors ---
const body = document.body;
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

// --- Global State ---
let currentTheme = localStorage.getItem('theme') || 'dark';

// --- Initialization on Load ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme
    setTheme(currentTheme);
    
    // 2. Start Typing Animation
    startTypingAnimation();
    
    // 3. Prep Skill Bars for Scroll-in Animation
    initSkillBars();
    
    // 4. Setup Intersection Observers
    initObservers();
    
    // 5. Load configured social profiles and email links
    updateDynamicLinks();
});

// --- Dynamic Social & Mailto Links Loader ---
function updateDynamicLinks() {
    // Update all GitHub links dynamically
    document.querySelectorAll('a[href*="github.com"]').forEach(link => {
        link.href = SOCIAL_LINKS.github;
    });
    // Update all LinkedIn links dynamically
    document.querySelectorAll('a[href*="linkedin.com"]').forEach(link => {
        link.href = SOCIAL_LINKS.linkedin;
    });
    // Update all mailto links dynamically
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${SOCIAL_LINKS.email}`;
    });
}

// --- Theme Toggle Handling ---
function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.className = 'fa-regular fa-moon';
    }
    currentTheme = theme;
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
});

// --- Mobile Navigation Hamburger Menu ---
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- Sticky Navigation & Scroll-to-Top Display ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to Top action
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- Dynamic Typing Effect ---
const typingPhrases = [
    "Data Science Solutions.",
    "Machine Learning Pipelines.",
    "Computer Vision & Imaging.",
    "Quantitative Analysis.",
    "Growth Marketing Strategies."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextElement = document.getElementById('typing-text');

function startTypingAnimation() {
    const currentPhrase = typingPhrases[phraseIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of word
        typingSpeed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typingSpeed = 400; // Small delay before starting next word
    }
    
    setTimeout(startTypingAnimation, typingSpeed);
}

// --- Skill Bars Animation ---
const skillFills = document.querySelectorAll('.skill-bar-fill');
const skillTargetWidths = [];

function initSkillBars() {
    skillFills.forEach((fill, index) => {
        // Save the inline width set in HTML
        skillTargetWidths[index] = fill.style.width;
        // Zero out initial width so it is hidden
        fill.style.width = '0%';
    });
}

function animateSkillBars() {
    skillFills.forEach((fill, index) => {
        fill.style.width = skillTargetWidths[index];
    });
}

// --- Skill Filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const skillItems = document.querySelectorAll('.skill-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active to current
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-filter');
        
        skillItems.forEach(item => {
            const itemCats = item.getAttribute('data-category').split(' ');
            if (category === 'all' || itemCats.includes(category)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 200);
            }
        });
    });
});

// --- Intersection Observers (Reveal & Active State Navigation) ---
function initObservers() {
    // 1. Reveal Animations & Skill Bars trigger
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's the skills section, animate the bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });
    
    document.querySelectorAll('.scroll-reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // 2. Active Menu Section Highlighting
    const activeNavCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };
    
    const activeNavObserver = new IntersectionObserver(activeNavCallback, {
        threshold: 0.4,
        rootMargin: "-20% 0px -40% 0px"
    });
    
    document.querySelectorAll('section').forEach(section => {
        activeNavObserver.observe(section);
    });
}

// --- Dynamic Projects Modal Controller ---
const projectDetails = {
    autism: {
        tag: "Computer Vision / Machine Learning",
        title: "Autism Prediction Using Thermal Imaging",
        desc: "Developed an AI-based objective diagnostic protocol utilizing clinical infrared thermography mapping and machine learning pipeline classifications to identify biomarkers linked to Autism Spectrum Disorder.",
        problem: "Traditional diagnostic methods for ASD are behavioral, qualitative, and often completed late in childhood. Objective physical biomarkers can enable critical early intervention. Infrared thermal imaging detects distinct skin temperature profiles caused by autonomous nervous system responses.",
        achievements: [
            "Pioneered computer vision algorithms (Python, OpenCV) to automatically map facial ROIs (Regions of Interest) on thermal video outputs.",
            "Normalized temperature variations using custom calibration protocols, enhancing data reliability across varying ambient settings.",
            "Trained, cross-validated, and optimized machine learning classifier structures (including SVM, Random Forests, and CNNs), achieving 88%+ accuracy in differentiating neurotypical and neurodiverse physiological thermographic features.",
            "Designed a Python GUI dashboard representing visual charts to aid healthcare professionals in analysis and diagnosis."
        ],
        tech: ["Python", "OpenCV", "Scikit-Learn", "Thermal Imaging Processing", "Numerical Mathematics", "Matplotlib"]
    },
    edtech: {
        tag: "Generative AI / Educational Media",
        title: "AI-Powered Animated Educational Platform",
        desc: "Created a modern generation engine mapping academic descriptions automatically to structural graphical animations to improve information retention in interactive online learning setups.",
        problem: "Static learning resources or simple slides have low student retention rates, while customized vector animations are extremely resource-intensive to produce manually. The objective was to build an automated, prompt-to-animation workflow.",
        achievements: [
            "Engineered a text-parsing structure that extracts keywords and abstract concepts from lesson text inputs.",
            "Integrated Generative AI pipelines mapping segmented concepts directly to scene descriptors, asset generators, and timing files.",
            "Assembled a lightweight browser-based renderer that overlays narration and sequences animated components seamlessly using CSS and HTML Canvas timelines.",
            "Reduced courseware production turnaround time by 75% and improved student engagement metrics by 50% during interactive testing trials."
        ],
        tech: ["Python", "Generative AI APIs", "JavaScript (ES6)", "HTML Canvas", "CSS Animations", "Asset Generation"]
    },
    bi: {
        tag: "Data Analysis / Business Intelligence",
        title: "Dynamic BI & Growth Marketing Dashboard",
        desc: "Synthesized sales campaign data, online tracking analytics, and business office registers into unified Power BI models to deliver predictive insights for digital outreach optimization.",
        problem: "Sales pipelines, web conversion data (SEO details), and financial ledgers were managed in siloed systems, leading to delayed marketing responses and operational bottlenecks.",
        achievements: [
            "Wrote custom SQL scripts to merge database tables and set up automated ETL structures in MS Excel and Power BI dashboards.",
            "Designed interactive visualizations tracing campaign spend against actual landing conversions, surfacing cost-per-lead insights.",
            "Conducted search volume analyses and SEO auditing that improved visibility for digital marketing campaign headers, increasing organic search clicks by 30%.",
            "Discovered inventory cost imbalances through automated ledger audits, advising a restructure of campaign expenditure that reduced overhead by 12%."
        ],
        tech: ["Power BI", "Microsoft SQL", "Advanced Excel", "ETL Practices", "SEO Analytics", "Financial Ledger Modeling"]
    }
};

const modalOverlay = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-dynamic-content');

function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;
    
    const techSpans = data.tech.map(t => `<span>${t}</span>`).join('');
    const bulletList = data.achievements.map(a => `<li><i class="fa-solid fa-circle-check" style="color: var(--primary-color); margin-right: 10px;"></i> ${a}</li>`).join('');
    
    modalContent.innerHTML = `
        <span class="modal-proj-tag">${data.tag}</span>
        <h3 class="modal-proj-title">${data.title}</h3>
        <p class="modal-proj-desc">${data.desc}</p>
        
        <div class="modal-grid">
            <div class="modal-grid-box">
                <h4>Core Problem Solved</h4>
                <p style="font-weight: normal; color: var(--text-secondary); margin-top: 5px;">${data.problem}</p>
            </div>
            <div class="modal-grid-box">
                <h4>Technologies Employed</h4>
                <div class="project-tech-stack" style="margin-top: 8px; margin-bottom: 0;">
                    ${techSpans}
                </div>
            </div>
        </div>
        
        <div class="modal-highlights-box">
            <h4 class="modal-section-title"><i class="fa-solid fa-list-check"></i> Key Engineering Accomplishments</h4>
            <ul class="modal-bullets">
                ${bulletList}
            </ul>
        </div>
        
        <div style="display: flex; gap: 16px; margin-top: 40px;">
            <button class="btn btn-primary" onclick="closeProjectModal()"><span>Close Case Study</span></button>
            <a href="https://github.com/sadhasivam-m" target="_blank" class="btn btn-secondary"><span>View GitHub Repository</span> <i class="fa-brands fa-github"></i></a>
        </div>
    `;
    
    modalOverlay.classList.add('open');
    body.style.overflow = 'hidden'; // Lock scrolling
}

function closeProjectModal(event) {
    // If event is passed, only close if clicked outside/overlay or the close btn specifically
    modalOverlay.classList.remove('open');
    body.style.overflow = ''; // Unlock scrolling
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeProjectModal();
    }
});

// --- Contact Form Handling & Web3Forms Real Email Submission ---
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Disable button and show sending state
    submitBtn.disabled = true;
    const btnSpan = submitBtn.querySelector('span');
    const originalText = btnSpan.textContent;
    btnSpan.textContent = 'Sending Message...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    
    const nameVal = document.getElementById('name').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const subjectVal = document.getElementById('subject').value.trim();
    const msgVal = document.getElementById('message').value.trim();
    
    // Fallback: If Web3Forms access key is not set, run in preview simulation mode
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
        setTimeout(() => {
            formStatus.textContent = `[Preview Mode] Thank you, ${nameVal}! Your message was simulated successfully. (To receive real emails in your inbox, set your Web3Forms access key at the top of script.js).`;
            formStatus.className = 'form-status success';
            contactForm.reset();
            submitBtn.disabled = false;
            btnSpan.textContent = originalText;
        }, 1200);
        return;
    }
    
    // Real submission via Web3Forms API
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('name', nameVal);
    formData.append('email', emailVal);
    formData.append('subject', subjectVal);
    formData.append('message', msgVal);
    formData.append('from_name', 'M. Sadhasivam Portfolio Contact');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            formStatus.textContent = `Thank you, ${nameVal}! Your message has been sent successfully. I will get back to you shortly.`;
            formStatus.className = 'form-status success';
            contactForm.reset();
        } else {
            formStatus.textContent = json.message || "Failed to send message. Please try again.";
            formStatus.className = 'form-status error';
        }
    })
    .catch(error => {
        console.error(error);
        formStatus.textContent = "Error connecting to the mail server. Please check your connection.";
        formStatus.className = 'form-status error';
    })
    .then(() => {
        submitBtn.disabled = false;
        btnSpan.textContent = originalText;
        
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 8000);
    });
}
