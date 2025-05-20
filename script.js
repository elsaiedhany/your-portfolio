// --- Global Translations Object ---
const translations = {
    en: {
        // ... (نفس ترجمات en من الرد السابق) ...
        deleteConfirmMessage: "Are you sure you want to delete the project \"{projectName}\"? This action cannot be undone.",
        deleteButtonTitle: "Delete Project",
        projectDeletedSuccess: "Project \"{projectName}\" deleted successfully.",
        errorDeletingProject: "Error deleting project \"{projectName}\".",
        confirmDeleteBtn: "Yes, Delete",
        cancelDeleteBtn: "Cancel",
        alerts: {
            // ... (نفس alerts من الرد السابق) ...
            urlRequired: "Please enter the website URL.",
            urlInvalid: "Please enter a valid URL (e.g., https://www.example.com).",
            urlAdded: "Project added successfully! It's now in your list.",
            errorAdding: "Oops! Error adding project. Please check your input or server.",
            networkError: "Network Error! Please check your internet connection or if the backend server is running.",
            fieldsRequired: "Hold on! Project Name, URL, and Description are all required.",
            invalidUrl: "Hmm, that URL doesn't look right. Please use a valid format (http:// or https://).",
            errorFetching: "Could not fetch projects. The server might be resting!",
            projectNotFound: "Project not found for deletion."
        }
    },
    ar: {
        // ... (نفس ترجمات ar من الرد السابق) ...
        deleteConfirmMessage: "هل أنت متأكد أنك تريد حذف مشروع \"{projectName}\"؟ لا يمكن التراجع عن هذا الإجراء.",
        deleteButtonTitle: "حذف المشروع",
        projectDeletedSuccess: "تم حذف مشروع \"{projectName}\" بنجاح.",
        errorDeletingProject: "خطأ في حذف مشروع \"{projectName}\".",
        confirmDeleteBtn: "نعم، احذف",
        cancelDeleteBtn: "إلغاء",
        alerts: {
            // ... (نفس alerts من الرد السابق) ...
            urlRequired: "الرجاء إدخال رابط الموقع.",
            urlInvalid: "الرجاء إدخال رابط صحيح (مثال: https://www.example.com).",
            urlAdded: "تمت إضافة المشروع بنجاح! أصبح الآن في قائمتك.",
            errorAdding: "عفوًا! خطأ في إضافة المشروع. يرجى التحقق من مدخلاتك أو الخادم.",
            networkError: "خطأ في الشبكة! يرجى التحقق من اتصالك بالإنترنت أو من أن الخادم الخلفي يعمل.",
            fieldsRequired: "لحظة من فضلك! اسم المشروع، الرابط، والوصف كلها مطلوبة.",
            invalidUrl: "هممم، هذا الرابط لا يبدو صحيحًا. يرجى استخدام تنسيق صالح (http:// أو https://).",
            errorFetching: "تعذر جلب المشاريع. قد يكون الخادم في استراحة!",
            projectNotFound: "لم يتم العثور على المشروع للحذف."
        }
    }
};

// --- DOM Elements Cache ---
const domElements = { /* ... (نفس domElements من الرد السابق) ... */
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
    deleteConfirmMessage: document.getElementById('deleteConfirmMessage') // عنصر جديد لرسالة تأكيد الحذف
};

// --- Global State & Config ---
let currentLanguage = 'ar';
const BACKEND_BASE_URL = 'http://127.0.0.1:5000';

// --- Utility Functions (updateTextContent, displayResponseMessage - كما هي من قبل) ---
function updateTextContent(element, text) {
    if (element) element.innerHTML = text;
}
function displayResponseMessage(element, message, type, isPermanent = false) {
    if (element) {
        element.innerHTML = message;
        element.className = 'mb-3 alert';
        element.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
        element.style.display = 'block';
        
        if (!isPermanent && type === 'success') {
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
// --- Language Function (setLanguage - كما هي مع إضافة الترجمات الجديدة) ---
function setLanguage(lang) {
    currentLanguage = lang;
    const trans = translations[lang];
    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');

    const elementsToTranslate = { /* ... (نفس عناصر الترجمة من الرد السابق مع إضافة deleteButtonTitle إذا أردت ترجمته بشكل عام) ... */
        'metaTitle': trans.metaTitle,
        'navBrandSiteName': trans.navBrandSiteName,
        'navLinkHome': trans.navLinkHome,
        'navLinkAbout': trans.navLinkAbout,
        'formTitle': trans.formTitle,
        'labelProjectName': trans.labelProjectName,
        'labelProjectUrl': trans.labelProjectUrl,
        'labelProjectDescription': trans.labelProjectDescription,
        'submitProjectButton': trans.submitProjectButton,
        'savedProjectsTitle': trans.savedProjectsTitle,
        'loadingProjectsText': trans.loadingProjectsText,
        'noProjectsText': trans.noProjectsText,
        'refreshProjectsBtnText': trans.refreshProjectsBtnText,
        'footerText': trans.footerText.replace('${new Date().getFullYear()}', new Date().getFullYear()) // تحديث السنة
    };
    for (const key in elementsToTranslate) {
        if (domElements[key]) updateTextContent(domElements[key], elementsToTranslate[key]);
    }
    if (domElements.projectNameInput) domElements.projectNameInput.placeholder = lang === 'ar' ? "مثال: موقع شخصي متكامل" : "e.g., Full Personal Portfolio";
    if (domElements.projectUrlInput) domElements.projectUrlInput.placeholder = "https://example.com";
    if (domElements.projectDescriptionInput) domElements.projectDescriptionInput.placeholder = lang === 'ar' ? "اكتب وصفًا موجزًا للمشروع..." : "Write a brief description...";
    if (domElements.langBtnAr && domElements.langBtnEn) {
        domElements.langBtnAr.classList.toggle('active-lang', lang === 'ar');
        domElements.langBtnEn.classList.toggle('active-lang', lang === 'en');
    }
    localStorage.setItem('preferredLanguage', lang);
    fetchAndDisplayProjects();
}

// --- Add Project Logic (handleAddProjectSubmit - كما هي من قبل) ---
async function handleAddProjectSubmit(event) {
    event.preventDefault();
    const trans = translations[currentLanguage]; // التأكد من استخدام اللغة الحالية للرسائل
    const projectName = domElements.projectNameInput.value.trim();
    const projectUrl = domElements.projectUrlInput.value.trim();
    const projectDescription = domElements.projectDescriptionInput.value.trim();

    if (domElements.addProjectResponseMessage) domElements.addProjectResponseMessage.style.display = 'none';

    if (!projectName || !projectUrl || !projectDescription) {
        displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.fieldsRequired, 'error');
        return;
    }
    try {
        new URL(projectUrl);
        if (!['http:', 'https:'].includes(new URL(projectUrl).protocol)) throw new Error('Invalid protocol');
    } catch (_) {
        displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.invalidUrl, 'error');
        return;
    }

    updateTextContent(domElements.submitProjectButton, trans.addingProjectInProgress);
    domElements.submitProjectButton.disabled = true;

    try {
        const response = await fetch(`${BACKEND_BASE_URL}/add-project`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectName, projectUrl, projectDescription }),
        });
        const result = await response.json();
        if (response.ok && result.status === "success") {
            displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.urlAdded, 'success');
            if(domElements.projectForm) domElements.projectForm.reset(); 
            fetchAndDisplayProjects();
        } else {
            displayResponseMessage(domElements.addProjectResponseMessage, result.message || trans.alerts.errorAdding, 'error');
        }
    } catch (error) {
        console.error('Fetch Error (Add Project):', error);
        displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.networkError, 'error');
    } finally {
        updateTextContent(domElements.submitProjectButton, trans.submitProjectButton);
        domElements.submitProjectButton.disabled = false;
    }
}

// --- !!! وظيفة جديدة للتعامل مع تأكيد الحذف ثم الحذف الفعلي !!! ---
async function confirmAndDeleteProject(projectId, projectName) {
    const trans = translations[currentLanguage];
    // إخفاء رسالة التأكيد السابقة (إذا كانت موجودة)
    if(domElements.deleteConfirmMessage) domElements.deleteConfirmMessage.style.display = 'none';


    // عرض رسالة تأكيد مخصصة
    const confirmationMessage = trans.deleteConfirmMessage.replace("{projectName}", projectName);
    
    // استخدام Bootstrap Modal للتأكيد سيكون أفضل، ولكن للتبسيط الآن سنستخدم confirm()
    // أو نعرض رسالة مخصصة مع أزرار
    if (domElements.deleteConfirmMessage) {
        domElements.deleteConfirmMessage.innerHTML = `
            <p>${confirmationMessage}</p>
            <button class="btn btn-danger btn-sm me-2" id="confirmDeleteActualBtn">${trans.confirmDeleteBtn}</button>
            <button class="btn btn-secondary btn-sm" id="cancelDeleteActualBtn">${trans.cancelDeleteBtn}</button>
        `;
        domElements.deleteConfirmMessage.className = 'alert alert-warning text-center fs-5'; // إعادة التعيين قبل إضافة الكلاس الصحيح
        domElements.deleteConfirmMessage.style.display = 'block';

        document.getElementById('confirmDeleteActualBtn').onclick = async () => {
            domElements.deleteConfirmMessage.style.display = 'none'; // إخفاء رسالة التأكيد
            await deleteProjectFromServer(projectId, projectName);
        };
        document.getElementById('cancelDeleteActualBtn').onclick = () => {
            domElements.deleteConfirmMessage.style.display = 'none'; // إخفاء رسالة التأكيد
        };
    } else { // Fallback if the deleteConfirmMessage div is not found for some reason
        if (!confirm(confirmationMessage)) {
            return; // المستخدم ألغى الحذف
        }
        await deleteProjectFromServer(projectId, projectName);
    }
}

async function deleteProjectFromServer(projectId, projectName) {
    const trans = translations[currentLanguage];
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/delete-project/${projectId}`, {
            method: 'DELETE',
        });
        const result = await response.json();

        if (response.ok && result.status === "success") {
            displayResponseMessage(domElements.addProjectResponseMessage, trans.projectDeletedSuccess.replace("{projectName}", projectName), 'success');
            fetchAndDisplayProjects(); // تحديث القائمة بعد الحذف
        } else {
            displayResponseMessage(domElements.addProjectResponseMessage, result.message || trans.errorDeletingProject.replace("{projectName}", projectName), 'error');
        }
    } catch (error) {
        console.error('Fetch Error (Delete Project):', error);
        displayResponseMessage(domElements.addProjectResponseMessage, trans.alerts.networkError, 'error');
    }
}


// --- تعديل وظيفة إنشاء بطاقة المشروع لإضافة زر الحذف والـ ID ---
function createProjectCard(project) {
    const trans = translations[currentLanguage];
    const col = document.createElement('div');
    col.className = 'col project-card-item';

    const card = document.createElement('div');
    card.className = 'card project-card h-100';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header project-card-header d-flex justify-content-between align-items-center';
    
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title mb-0';
    cardTitle.textContent = project.name;
    
    // !!! زر الحذف !!!
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-delete-project';
    deleteButton.title = trans.deleteButtonTitle; // للـ tooltip
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // أيقونة سلة المهملات
    deleteButton.setAttribute('data-project-id', project.id); // حفظ الـ ID هنا
    deleteButton.setAttribute('data-project-name', project.name); // حفظ الاسم لرسالة التأكيد
    
    deleteButton.onclick = () => {
        // استدعاء وظيفة تأكيد الحذف عند الضغط
        confirmAndDeleteProject(project.id, project.name);
    };

    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(deleteButton); // إضافة زر الحذف لرأس البطاقة

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
    updateTextContent(visitLink, trans.visitProjectBtnText);
    cardFooter.appendChild(visitLink);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    col.appendChild(card);
    return col;
}

// --- Fetch and Display Projects (fetchAndDisplayProjects - كما هي تقريبًا) ---
async function fetchAndDisplayProjects() {
    if (!domElements.projectsListContainer || !domElements.loadingProjectsMessage || !domElements.noProjectsMessage) return;
    const trans = translations[currentLanguage];
    domElements.loadingProjectsMessage.style.display = 'block';
    domElements.noProjectsMessage.style.display = 'none';
    if(domElements.deleteConfirmMessage) domElements.deleteConfirmMessage.style.display = 'none'; // إخفاء رسالة التأكيد عند التحديث
    domElements.projectsListContainer.innerHTML = '';

    try {
        const response = await fetch(`${BACKEND_BASE_URL}/get-projects`);
        const result = await response.json();
        if (response.ok && result.status === "success") {
            if (result.projects && result.projects.length > 0) {
                result.projects.forEach((project, index) => {
                    const projectCardElement = createProjectCard(project);
                    domElements.projectsListContainer.appendChild(projectCardElement);
                    setTimeout(() => {
                        projectCardElement.style.opacity = '1';
                        projectCardElement.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            } else {
                domElements.noProjectsMessage.style.display = 'block';
                updateTextContent(domElements.noProjectsMessage, trans.noProjectsText);
            }
        } else {
            updateTextContent(domElements.noProjectsMessage, result.message || trans.alerts.errorFetching);
            domElements.noProjectsMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Fetch Error (Get Projects):', error);
        updateTextContent(domElements.noProjectsMessage, trans.alerts.networkError);
        domElements.noProjectsMessage.style.display = 'block';
    } finally {
        domElements.loadingProjectsMessage.style.display = 'none';
    }
}

// --- Initializations & Event Listeners (DOMContentLoaded - كما هي من قبل) ---
document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || (navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en');
    setLanguage(preferredLanguage); 
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
    // جلب المواقع عند تحميل الصفحة إذا كنا في الصفحة الصحيحة
    // (fetchAndDisplayProjects يتم استدعاؤها الآن من داخل setLanguage لضمان تحميل النصوص المترجمة للرسائل)
});
