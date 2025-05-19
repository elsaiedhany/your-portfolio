// --- Global Translations Object ---
const translations = {
    en: {
        metaTitle: "Project Dashboard - Said Hany",
        navBrandSiteName: "Said Hany | Project Panel",
        navLinkHome: "<i class=\"fas fa-tasks me-1\"></i>Project Management",
        navLinkAbout: "<i class=\"fas fa-user-circle me-1\"></i>About Me",
        formTitle: "<i class=\"fas fa-plus-circle me-2\"></i>Add New Project",
        labelProjectName: "Project Name:",
        labelProjectUrl: "Project URL:",
        labelProjectDescription: "Project Description:",
        submitProjectButton: "<i class=\"fas fa-paper-plane me-2\"></i>Add Project",
        savedProjectsTitle: "<i class=\"fas fa-briefcase me-2\"></i>Saved Projects",
        loadingProjectsText: "Loading projects, please wait...",
        noProjectsText: "<i class=\"fas fa-folder-open me-2\"></i>No projects saved yet. Add your first masterpiece!",
        refreshProjectsBtnText: "<i class=\"fas fa-sync-alt me-1\"></i>Refresh List",
        visitProjectBtnText: "<i class=\"fas fa-external-link-alt me-1\"></i>Visit Project",
        footerText: `&copy; ${new Date().getFullYear()} Said Hany. All rights reserved. <br class="d-block d-sm-none"> Designed with <i class="fas fa-heart text-danger"></i>`,
        // Alerts & Messages
        alertProjectAdded: "Project added successfully! It's now in your list.",
        alertErrorAdding: "Oops! Error adding project. Please check your input or server.",
        alertNetworkError: "Network Error! Please check your internet connection or if the backend server is running.",
        alertFieldsRequired: "Hold on! Project Name, URL, and Description are all required.",
        alertInvalidUrl: "Hmm, that URL doesn't look right. Please use a valid format (http:// or https://).",
        alertErrorFetching: "Could not fetch projects. The server might be resting!",
        addingProjectInProgress: "<i class=\"fas fa-spinner fa-spin me-2\"></i>Adding Project..."
    },
    ar: {
        metaTitle: "لوحة تحكم المشاريع - سعيد هاني",
        navBrandSiteName: "<i class=\"fas fa-rocket me-2\"></i>سعيد هاني | لوحة المشاريع",
        navLinkHome: "<i class=\"fas fa-tasks me-1\"></i>إدارة المشاريع",
        navLinkAbout: "<i class=\"fas fa-user-circle me-1\"></i>عني",
        formTitle: "<i class=\"fas fa-plus-circle me-2\"></i>إضافة مشروع جديد",
        labelProjectName: "اسم المشروع:",
        labelProjectUrl: "رابط المشروع (URL):",
        labelProjectDescription: "وصف المشروع:",
        submitProjectButton: "<i class=\"fas fa-paper-plane me-2\"></i>إضافة المشروع",
        savedProjectsTitle: "<i class=\"fas fa-briefcase me-2\"></i>المشاريع المحفوظة",
        loadingProjectsText: "جاري تحميل المشاريع، يرجى الانتظار...",
        noProjectsText: "<i class=\"fas fa-folder-open me-2\"></i>لا توجد مشاريع محفوظة حتى الآن. قم بإضافة تحفتك الأولى!",
        refreshProjectsBtnText: "<i class=\"fas fa-sync-alt me-1\"></i>تحديث القائمة",
        visitProjectBtnText: "<i class=\"fas fa-external-link-alt me-1\"></i>زيارة المشروع",
        footerText: `&copy; ${new Date().getFullYear()} سعيد هاني. كل الحقوق محفوظة. <br class="d-block d-sm-none"> تم التصميم بحب <i class="fas fa-heart text-danger"></i>`,
        // Alerts & Messages
        alertProjectAdded: "تمت إضافة المشروع بنجاح! أصبح الآن في قائمتك.",
        alertErrorAdding: "عفوًا! خطأ في إضافة المشروع. يرجى التحقق من مدخلاتك أو الخادم.",
        alertNetworkError: "خطأ في الشبكة! يرجى التحقق من اتصالك بالإنترنت أو من أن الخادم الخلفي يعمل.",
        alertFieldsRequired: "لحظة من فضلك! اسم المشروع، الرابط، والوصف كلها مطلوبة.",
        alertInvalidUrl: "هممم، هذا الرابط لا يبدو صحيحًا. يرجى استخدام تنسيق صالح (http:// أو https://).",
        alertErrorFetching: "تعذر جلب المشاريع. قد يكون الخادم في استراحة!",
        addingProjectInProgress: "<i class=\"fas fa-spinner fa-spin me-2\"></i>جاري الإضافة..."
    }
};

// --- DOM Elements Cache ---
const domElements = {
    metaTitle: document.getElementById('metaTitle'),
    navBrandSiteName: document.getElementById('navBrandSiteName'),
    navLinkHome: document.getElementById('navLinkHome'),
    navLinkAbout: document.getElementById('navLinkAbout'),
    formTitle: document.getElementById('formTitle'),
    labelProjectName: document.getElementById('labelProjectName'),
    labelProjectUrl: document.getElementById('labelProjectUrl'),
    labelProjectDescription: document.getElementById('labelProjectDescription'),
    submitProjectButton: document.getElementById('submitProjectButton'),
    savedProjectsTitle: document.getElementById('savedProjectsTitle'),
    loadingProjectsText: document.getElementById('loadingProjectsText'),
    noProjectsText: document.getElementById('noProjectsText'),
    refreshProjectsBtnText: document.getElementById('refreshProjectsBtnText'),
    footerText: document.getElementById('footerText'),
    
    projectForm: document.getElementById('projectForm'),
    projectNameInput: document.getElementById('projectName'),
    projectUrlInput: document.getElementById('projectUrl'),
    projectDescriptionInput: document.getElementById('projectDescription'),
    addProjectResponseMessage: document.getElementById('addProjectResponseMessage'),
    
    projectsListContainer: document.getElementById('projectsListContainer'),
    loadingProjectsMessage: document.getElementById('loadingProjectsMessage'),
    noProjectsMessage: document.getElementById('noProjectsMessage'),
    refreshProjectsButton: document.getElementById('refreshProjectsButton'),

    langBtnAr: document.getElementById('langBtnAr'),
    langBtnEn: document.getElementById('langBtnEn'),
};

// --- Global State ---
let currentLanguage = 'ar'; // Default language
const BACKEND_BASE_URL = 'http://127.0.0.1:5000'; // تأكد من تعديل هذا إذا كان IP موبايلك مختلفًا عند الاختبار

// --- Utility Functions ---
function updateTextContent(element, text) {
    if (element) {
        element.innerHTML = text; // Use innerHTML to render icons within text
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    const trans = translations[lang];

    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');

    // Update all static texts
    for (const key in domElements) {
        if (trans[key] && domElements[key]) {
            updateTextContent(domElements[key], trans[key]);
        }
    }
    
    // Update placeholders
    if (domElements.projectNameInput) domElements.projectNameInput.placeholder = lang === 'ar' ? "مثال: موقع شخصي متكامل" : "e.g., Full Personal Portfolio";
    if (domElements.projectUrlInput) domElements.projectUrlInput.placeholder = "https://example.com";
    if (domElements.projectDescriptionInput) domElements.projectDescriptionInput.placeholder = lang === 'ar' ? "اكتب وصفًا موجزًا للمشروع وأهم التقنيات المستخدمة..." : "Write a brief description of the project and key technologies used...";

    // Update active language button style
    if (domElements.langBtnAr && domElements.langBtnEn) {
        domElements.langBtnAr.classList.toggle('active-lang', lang === 'ar');
        domElements.langBtnEn.classList.toggle('active-lang', lang === 'en');
    }
    
    localStorage.setItem('preferredLanguage', lang);
    fetchAndDisplayProjects(); // Refresh project list with new language for messages
}

function displayResponseMessage(element, message, type) {
    if (element) {
        element.innerHTML = message; // Use innerHTML for potential icons in messages
        element.className = 'mb-3 alert'; // Base classes
        element.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
        element.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                if (element) {
                    element.style.display = 'none';
                    element.innerHTML = '';
                    element.className = 'mb-3';
                }
            }, 4000);
        }
    }
}

// --- Core Application Logic ---
async function handleAddProjectSubmit(event) {
    event.preventDefault();
    const trans = translations[currentLanguage];

    const projectName = domElements.projectNameInput.value.trim();
    const projectUrl = domElements.projectUrlInput.value.trim();
    const projectDescription = domElements.projectDescriptionInput.value.trim();

    if (domElements.addProjectResponseMessage) {
        domElements.addProjectResponseMessage.style.display = 'none';
    }

    if (!projectName || !projectUrl || !projectDescription) {
        displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.alertFieldsRequired, 'error');
        return;
    }
    try {
        new URL(projectUrl);
        if (!['http:', 'https:'].includes(new URL(projectUrl).protocol)) {
             throw new Error('Invalid protocol');
        }
    } catch (_) {
        displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.alertInvalidUrl, 'error');
        return;
    }

    domElements.submitProjectButton.disabled = true;
    updateTextContent(domElements.submitProjectButton, trans.addingProjectInProgress);

    try {
        const response = await fetch(`${BACKEND_BASE_URL}/add-project`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectName, projectUrl, projectDescription }),
        });
        const result = await response.json();

        if (response.ok && result.status === "success") {
            displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.alertProjectAdded, 'success');
            if(domElements.projectForm) domElements.projectForm.reset(); 
            fetchAndDisplayProjects();
        } else {
            displayResponseMessage(domElements.addProjectResponseMessage, result.message || trans.alerts.alertErrorAdding, 'error');
        }
    } catch (error) {
        console.error('Fetch Error (Add Project):', error);
        displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.alertNetworkError, 'error');
    } finally {
        domElements.submitProjectButton.disabled = false;
        updateTextContent(domElements.submitProjectButton, trans.submitProjectButton);
    }
}

function createProjectCard(project) {
    const trans = translations[currentLanguage];
    const col = document.createElement('div');
    col.className = 'col project-card-item'; // Added a class for potential animation

    const card = document.createElement('div');
    card.className = 'card project-card h-100';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header project-card-header';
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title mb-0';
    cardTitle.textContent = project.name;
    cardHeader.appendChild(cardTitle);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const cardText = document.createElement('p');
    cardText.className = 'card-text project-description';
    cardText.textContent = project.description;
    cardBody.appendChild(cardText);

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer project-card-footer';
    const visitLink = document.createElement('a');
    visitLink.href = project.url;
    visitLink.className = 'btn btn-visit-project btn-sm';
    visitLink.target = '_blank';
    visitLink.rel = 'noopener noreferrer';
    updateTextContent(visitLink, trans.visitProjectBtnText); // Use innerHTML for icon
    cardFooter.appendChild(visitLink);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);
    return col;
}

async function fetchAndDisplayProjects() {
    if (!domElements.projectsListContainer || !domElements.loadingProjectsMessage || !domElements.noProjectsMessage) return;

    const trans = translations[currentLanguage];
    domElements.loadingProjectsMessage.style.display = 'block';
    domElements.noProjectsMessage.style.display = 'none';
    domElements.projectsListContainer.innerHTML = '';

    try {
        const response = await fetch(`${BACKEND_BASE_URL}/get-projects`);
        const result = await response.json();

        if (response.ok && result.status === "success") {
            if (result.projects && result.projects.length > 0) {
                result.projects.forEach((project, index) => {
                    const projectCardElement = createProjectCard(project);
                    domElements.projectsListContainer.appendChild(projectCardElement);
                    // Creative touch: Staggered fade-in animation for cards
                    setTimeout(() => {
                        projectCardElement.style.opacity = '1';
                        projectCardElement.style.transform = 'translateY(0)';
                    }, index * 100); // Delay each card slightly
                });
            } else {
                domElements.noProjectsMessage.style.display = 'block';
                updateTextContent(domElements.noProjectsMessage, trans.noProjectsText);
            }
        } else {
            updateTextContent(domElements.noProjectsMessage, result.message || trans.alerts.alertErrorFetching);
            domElements.noProjectsMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Fetch Error (Get Projects):', error);
        updateTextContent(domElements.noProjectsMessage, trans.alerts.alertNetworkError);
        domElements.noProjectsMessage.style.display = 'block';
    } finally {
        domElements.loadingProjectsMessage.style.display = 'none';
    }
}

// --- Initializations & Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    const preferredLanguage = localStorage.getItem('preferredLanguage') || (navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en');
    setLanguage(preferredLanguage); // This will also call fetchAndDisplayProjects

    // Attach event listeners only if the elements exist (i.e., on the correct page)
    if (domElements.projectForm) {
        domElements.projectForm.addEventListener('submit', handleAddProjectSubmit);
    }
    if (domElements.refreshProjectsButton) {
        domElements.refreshProjectsButton.addEventListener('click', fetchAndDisplayProjects);
    }
    if (domElements.langBtnAr) {
        domElements.langBtnAr.addEventListener('click', () => setLanguage('ar'));
    }
    if (domElements.langBtnEn) {
        domElements.langBtnEn.addEventListener('click', () => setLanguage('en'));
    }

    // Footer current year (could be part of setLanguage if footer is translated)
    // const currentYearSpan = document.getElementById('currentYear'); // Already in setLanguage via footerText
    // if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
});

