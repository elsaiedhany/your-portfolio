// common-script.js - For shared functions like language switching and global UI elements

const siteTranslations = {
    en: {
        // Meta Titles
        metaTitleHome: "Said Hany - Creative Web Developer",
        metaTitleAboutPage: "About Me - Said Hany",
        metaTitleDashboard: "Project Dashboard - Said Hany",

        // Navbar (shared)
        navBrandSiteName: "<span class='brand-icon'><i class='fas fa-meteor'></i></span> Said Hany",
        navLinkHome: "<i class='fas fa-home-alt me-1'></i>Home",
        navLinkAbout: "<i class='fas fa-user-astronaut me-1'></i>About Me",
        navLinkProjects: "<i class='fas fa-bolt me-1'></i>My Work", // For homepage link to projects section
        navLinkContact: "<i class='fas fa-paper-plane me-1'></i>Contact", // For homepage link to contact section
        
        // Dashboard Navbar specific
        navLinkHomeDashboard: "<i class='fas fa-arrow-left me-1'></i>Back to Main Site",
        navLinkDashboard: "<i class='fas fa-edit me-1'></i>Manage Projects",
        navLinkAboutDashboard: "<i class='fas fa-info-circle me-1'></i>About Page",


        // Footer (shared) - Year will be handled by JS
        footerText: `&copy; {year} <span id="footerOwnerName" class="fw-bold">Said Hany</span>. All rights reserved. <br class="d-block d-sm-none"> Crafted with <i class="fas fa-heart text-dangerbeat"></i>`,
        footerOwnerName: "Said Hany", // For dynamic insertion if needed elsewhere

        // --- Homepage (index.html) ---
        heroTitle: "Said Hany",
        heroSubtitle: "Creative Web Developer | Turning Complex Ideas into Elegant & Seamless Digital Experiences.",
        heroBtnAbout: "<i class='fas fa-sparkles me-2'></i>Discover More About Me",
        heroBtnProjects: "<i class='fas fa-project-diagram me-2'></i>Browse My Projects",
        aboutPreviewTitle: "<span><i class='fas fa-user-check me-2'></i>About Me Briefly</span>",
        aboutPreviewText: "I'm Said, a developer specializing in interactive frontend interfaces using HTML, CSS, and JavaScript. I'm expanding my knowledge into WordPress and Elementor, along with exploring backend development fundamentals. I enjoy programming challenges and strive to deliver innovative, high-quality solutions.",
        projectsPreviewTitle: "<span><i class='fas fa-lightbulb me-2'></i>Inspiring Projects</span>",
        projectsPreviewSubtext: "A quick look at some projects that reflect my passion for design and development. To manage all projects, I access my private dashboard.",
        projectCard1Title: "Al-Taqwa Website",
        projectCard1Desc: "My first venture into web design, a landing page focused on content and usability.",
        projectCard1Btn: "<i class='fas fa-external-link-square-alt me-1'></i>Visit Project",
        projectCard2Title: "Creative UI Design",
        projectCard2Desc: "An experimental project applying modern design principles to create an engaging UI.",
        projectCard2Btn: "<i class='fas fa-hourglass-start me-1'></i>In Progress",
        projectCard3Title: "Projects Dashboard",
        projectCard3Desc: "My personal tool for managing projects, built with Python (Flask) and JavaScript.",
        projectCard3Btn: "<i class='fas fa-user-shield me-1'></i>Access Panel (Private)",
        contactSectionTitle: "<span><i class='fas fa-hands-helping me-2'></i>Let's Collaborate!</span>",
        contactSectionSubtext: "Have an exciting project, a collaboration idea, or just want to exchange experiences? I'm here to listen and help.",
        contactBtnEmail: "<i class='fas fa-at me-2'></i>Send Me a Message",

        // --- About Page (about.html) ---
        aboutMainTitle: "<i class='fas fa-id-card me-2'></i>About Me", // Re-used ID, will be fine
        aboutNameCard: "Said Hany",
        aboutTaglineCard: "Ambitious Web Developer",
        whoAmITitle: "<i class='fas fa-question-circle me-2'></i>Who Am I?",
        aboutIntro: "Hello! I'm Said, a passionate web developer, currently focused on honing my skills in the latest frontend and backend technologies. I always strive to learn new things and apply what I learn in practical and innovative projects.",
        aboutAmbition: "One of my goals is to create useful web tools and applications. This project management dashboard is a step in that direction, aiming to organize my work and track my progress. I believe that continuous learning and practical application are key to evolving in this dynamic field.",
        mySkillsTitle: "<i class='fas fa-cogs me-2'></i>My Technical Skills",
        skillHTML: "HTML5",
        skillCSS: "CSS3",
        skillJS: "JavaScript",
        skillWP: "WordPress <small class='d-block text-muted'>(Learning)</small>",
        skillElementor: "Elementor <small class='d-block text-muted'>(Learning)</small>",
        skillBackend: "Backend <small class='d-block text-muted'>(Basic Experience)</small>",
        skillPython: "Python <small class='d-block text-muted'>(with Flask)</small>",
        skillBootstrap: "Bootstrap",
        contactMeTitle: "<i class='fas fa-envelope-open-text me-2'></i>Get in Touch",
        contactPrompt: "I'm always happy to connect and exchange experiences. You can find me on:",
        emailButtonAbout: "<i class='fas fa-envelope fa-fw me-2'></i>Email Me",
        githubButtonAbout: "<i class='fab fa-github fa-fw me-2'></i>GitHub",
        
        // --- Dashboard (dashboard.html) ---
        // Meta title is already defined above (metaTitleDashboard)
        formTitleDashboard: "<i class='fas fa-folder-plus me-2'></i>Add New Project to Dashboard",
        labelProjectNameDashboard: "Project Name:",
        labelProjectUrlDashboard: "Project URL:",
        labelProjectDescriptionDashboard: "Brief Project Description:",
        submitProjectButtonDashboard: "<i class='fas fa-save me-2'></i>Save Project",
        savedProjectsTitleDashboard: "<i class='fas fa-archive me-2'></i>Your Saved Projects",
        loadingProjectsTextDashboard: "Loading projects, hang tight...",
        noProjectsTextDashboard: "<i class='fas fa-box-open me-2'></i>No projects found. Add your first one!",
        refreshProjectsBtnTextDashboard: "<i class='fas fa-redo-alt me-1'></i>Refresh List",
        deleteConfirmMessage: "Are you absolutely sure you want to delete the project \"<strong>{projectName}</strong>\"? This action is irreversible.",
        deleteButtonTitle: "Delete this project",
        projectDeletedSuccess: "Project \"{projectName}\" has been successfully deleted.",
        errorDeletingProject: "Oops! Could not delete project \"{projectName}\".",
        confirmDeleteBtn: "Yes, Delete It",
        cancelDeleteBtn: "Cancel",
        alerts: {
            allFieldsRequiredDashboard: "Hold on! Project Name, URL, and Description are all required for the dashboard.",
            urlInvalid: "Hmm, that URL doesn't look right. Please use a valid format (e.g., https://example.com).",
            projectAddedSuccessDashboard: "Project added successfully! It's now in your list.",
            errorAdding: "Oops! Error adding project. Please check your input or server.",
            networkError: "Network Error! Please check your internet connection or if the backend server is running.",
            errorFetching: "Could not fetch projects. The server might be resting or unavailable!",
            projectNotFound: "Project not found for deletion.",
            // From backend, ensure these keys match what backend.py sends for specific errors
            noUrlProvided: "No URL provided to the server.", // Example key for a backend message
            urlCannotBeEmpty: "URL cannot be empty (checked by server).", // Example
            invalidUrlFormatBackend: "Invalid URL format from server." // Example
        }
    },
    ar: {
        // Meta Titles
        metaTitleHome: "سعيد هاني - مطور ويب إبداعي",
        metaTitleAboutPage: "عني - سعيد هاني",
        metaTitleDashboard: "لوحة تحكم المشاريع - سعيد هاني",

        // Navbar (shared)
        navBrandSiteName: "<span class='brand-icon'><i class='fas fa-meteor'></i></span> سعيد هاني",
        navLinkHome: "<i class='fas fa-home-alt me-1'></i>الرئيسية",
        navLinkAbout: "<i class='fas fa-user-astronaut me-1'></i>من أنا؟",
        navLinkProjects: "<i class='fas fa-bolt me-1'></i>أعمالي",
        navLinkContact: "<i class='fas fa-paper-plane me-1'></i>تواصل",

        // Dashboard Navbar specific
        navLinkHomeDashboard: "<i class='fas fa-arrow-left me-1'></i>العودة للموقع الرئيسي",
        navLinkDashboard: "<i class='fas fa-edit me-1'></i>إدارة المشاريع",
        navLinkAboutDashboard: "<i class='fas fa-info-circle me-1'></i>صفحة \"عني\"",

        // Footer (shared)
        footerText: `&copy; ${new Date().getFullYear()} <span id="footerOwnerName" class="fw-bold">سعيد هاني</span>. كل الحقوق محفوظة. <br class="d-block d-sm-none"> صُمم بحب وشغف <i class="fas fa-heart text-dangerbeat"></i>`,
        footerOwnerName: "سعيد هاني",

        // --- Homepage (index.html) ---
        heroTitle: "سعيد هاني",
        heroSubtitle: "مطور واجهات ويب إبداعي | شغوف بتحويل الأفكار المعقدة إلى تجارب رقمية أنيقة وسلسة.",
        heroBtnAbout: "<i class='fas fa-sparkles me-2'></i>اكتشف المزيد عني",
        heroBtnProjects: "<i class='fas fa-project-diagram me-2'></i>تصفح مشاريعي",
        aboutPreviewTitle: "<span><i class='fas fa-user-check me-2'></i>نبذة تعريفية</span>",
        aboutPreviewText: "أنا سعيد، مطور متخصص في بناء واجهات مستخدم تفاعلية (Frontend) باستخدام HTML، CSS، و JavaScript. حاليًا، أعمل على تعميق معرفتي بمنصات WordPress و Elementor، بالإضافة إلى استكشاف أساسيات تطوير الواجهات الخلفية (Backend). أستمتع بالتحديات البرمجية وأسعى دائمًا لتقديم حلول مبتكرة وعالية الجودة.",
        projectsPreviewTitle: "<span><i class='fas fa-lightbulb me-2'></i>مشاريع ملهمة</span>",
        projectsPreviewSubtext: "هذه لمحة سريعة عن بعض المشاريع التي قمت بتطويرها، والتي تعكس تطور مهاراتي وشغفي بالتفاصيل. لإدارة جميع مشاريعي، أستخدم لوحة تحكم خاصة.",
        projectCard1Title: "موقع التقوى",
        projectCard1Desc: "مشروعي الأول الذي انطلقت منه في عالم تصميم الويب، صفحة هبوط تعريفية تتميز ببساطتها وسهولة التنقل فيها.",
        projectCard1Btn: "<i class='fas fa-external-link-square-alt me-1'></i>زيارة المشروع",
        projectCard2Title: "تصميم واجهة UI/UX",
        projectCard2Desc: "مشروع تجريبي لتطبيق مبادئ تصميم تجربة المستخدم وإنشاء واجهة مستخدم عصرية وجذابة بصريًا.",
        projectCard2Btn: "<i class='fas fa-hourglass-start me-1'></i>قيد التطوير",
        projectCard3Title: "لوحة تحكم المشاريع",
        projectCard3Desc: "أداتي الشخصية لإدارة وتتبع المشاريع البرمجية، تم تطويرها باستخدام Python (Flask) للباك إند و JavaScript للفرونت إند.",
        projectCard3Btn: "<i class='fas fa-user-shield me-1'></i>الدخول للوحة (خاص)",
        contactSectionTitle: "<span><i class='fas fa-hands-helping me-2'></i>لنتعاون معًا!</span>",
        contactSectionSubtext: "إذا كان لديك مشروع مثير للاهتمام، فكرة تود تحويلها إلى واقع، أو حتى مجرد رغبة في تبادل الخبرات، لا تتردد في التواصل.",
        contactBtnEmail: "<i class='fas fa-at me-2'></i>تواصل عبر البريد",

        // --- About Page (about.html) ---
        aboutMainTitle: "<i class='fas fa-id-card me-2'></i>نبذة عني",
        aboutNameCard: "سعيد هاني",
        aboutTaglineCard: "مطور ويب طموح",
        whoAmITitle: "<i class='fas fa-question-circle me-2'></i>من أنا؟",
        aboutIntro: "أهلاً! أنا سعيد، مطور ويب شغوف، أركز حاليًا على صقل مهاراتي في أحدث تقنيات الواجهة الأمامية والخلفية. أسعى دائمًا لتعلم الجديد وتطبيق ما أتعلمه في مشاريع عملية ومبتكرة.",
        aboutAmbition: "أحد أهدافي هو إنشاء أدوات وتطبيقات ويب مفيدة، وهذه اللوحة لإدارة المشاريع هي خطوة في هذا الاتجاه، حيث أهدف لتنظيم أعمالي ومتابعة تقدمي. أؤمن بأن التعلم المستمر والتطبيق العملي هما مفتاح التطور في هذا المجال الديناميكي.",
        mySkillsTitle: "<i class='fas fa-cogs me-2'></i>مهاراتي التقنية",
        skillHTML: "HTML5",
        skillCSS: "CSS3",
        skillJS: "JavaScript",
        skillWP: "WordPress <small class='d-block text-muted'>(أتعلمه)</small>",
        skillElementor: "Elementor <small class='d-block text-muted'>(أتعلمه)</small>",
        skillBackend: "باك إند <small class='d-block text-muted'>(خبرة بسيطة)</small>",
        skillPython: "Python <small class='d-block text-muted'>(مع Flask)</small>",
        skillBootstrap: "Bootstrap",
        contactMeTitle: "<i class='fas fa-envelope-open-text me-2'></i>تواصل معي",
        contactPrompt: "يسعدني دائمًا التواصل وتبادل الخبرات. يمكنك إيجادي على:",
        emailButtonAbout: "<i class='fas fa-envelope fa-fw me-2'></i>راسلني",
        githubButtonAbout: "<i class='fab fa-github fa-fw me-2'></i>GitHub",

        // --- Dashboard (dashboard.html) ---
        formTitleDashboard: "<i class='fas fa-folder-plus me-2'></i>إضافة مشروع جديد للوحة التحكم",
        labelProjectNameDashboard: "اسم المشروع:",
        labelProjectUrlDashboard: "رابط المشروع (URL):",
        labelProjectDescriptionDashboard: "وصف موجز للمشروع:",
        submitProjectButtonDashboard: "<i class='fas fa-save me-2'></i>حفظ المشروع",
        savedProjectsTitleDashboard: "<i class='fas fa-archive me-2'></i>المشاريع المحفوظة في لوحتك",
        loadingProjectsTextDashboard: "جاري تحميل المشاريع، يرجى الانتظار...",
        noProjectsTextDashboard: "<i class='fas fa-box-open me-2'></i>لا توجد مشاريع محفوظة. قم بإضافة مشروعك الأول!",
        refreshProjectsBtnTextDashboard: "<i class='fas fa-redo-alt me-1'></i>تحديث القائمة",
        deleteConfirmMessage: "هل أنت متأكد أنك تريد حذف مشروع \"<strong>{projectName}</strong>\"؟ لا يمكن التراجع عن هذا الإجراء.",
        deleteButtonTitle: "حذف هذا المشروع",
        projectDeletedSuccess: "تم حذف مشروع \"{projectName}\" بنجاح.",
        errorDeletingProject: "عفوًا! تعذر حذف مشروع \"{projectName}\".",
        confirmDeleteBtn: "نعم، احذف",
        cancelDeleteBtn: "إلغاء",
        alerts: {
            allFieldsRequiredDashboard: "لحظة من فضلك! اسم المشروع، الرابط، والوصف كلها مطلوبة للوحة التحكم.",
            urlInvalid: "هممم، هذا الرابط لا يبدو صحيحًا. يرجى استخدام تنسيق صالح (http:// أو https://).",
            projectAddedSuccessDashboard: "تمت إضافة المشروع بنجاح! أصبح الآن في قائمتك.",
            errorAdding: "عفوًا! خطأ في إضافة المشروع. يرجى التحقق من مدخلاتك أو الخادم.",
            networkError: "خطأ في الشبكة! يرجى التحقق من اتصالك بالإنترنت أو من أن الخادم الخلفي يعمل.",
            errorFetching: "تعذر جلب المشاريع. قد يكون الخادم في استراحة أو غير متاح!",
            projectNotFound: "لم يتم العثور على المشروع للحذف.",
            noUrlProvided: "لم يتم توفير رابط للخادم.",
            urlCannotBeEmpty: "لا يمكن أن يكون الرابط فارغًا (تم التحقق بواسطة الخادم).",
            invalidUrlFormatBackend: "تنسيق الرابط غير صالح من الخادم."
        }
    }
};

let currentGlobalLanguage = localStorage.getItem('preferredGlobalLanguage') || (navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en');

function updateTextContentGlobal(elementId, translationKey, translationsObject) {
    const element = document.getElementById(elementId);
    if (element && translationsObject && translationsObject[translationKey]) {
        element.innerHTML = translationsObject[translationKey];
    } else if (element) {
        // console.warn(`Translation key "${translationKey}" or translationsObject missing for element "#${elementId}".`);
    }
}

function applyGlobalTranslations(lang) {
    currentGlobalLanguage = lang;
    const trans = siteTranslations[lang];
    if (!trans) {
        console.error(`Translations not found for language: ${lang}`);
        return;
    }

    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');

    // Translate meta titles for all pages
    const pageSpecificMetaTitleKey = document.body.classList.contains('homepage') ? 'metaTitleHome' :
                                   document.getElementById('aboutMainTitle') ? 'metaTitleAboutPage' :
                                   document.getElementById('formTitle') ? 'metaTitleDashboard' : null;
    if (pageSpecificMetaTitleKey && trans[pageSpecificMetaTitleKey]) {
        document.title = trans[pageSpecificMetaTitleKey].replace(/<[^>]*>?/gm, '');
    }


    // Shared Elements (Navbar) - Using more specific IDs
    updateTextContentGlobal('navBrandSiteName', 'navBrandSiteName', trans); // For index.html
    updateTextContentGlobal('navBrandSiteNameDashboard', 'navBrandSiteName', trans); // For dashboard.html
    updateTextContentGlobal('navBrandSiteNameAbout', 'navBrandSiteName', trans); // For about.html
    
    updateTextContentGlobal('navLinkHome', 'navLinkHome', trans); // For index.html
    updateTextContentGlobal('navLinkAbout', 'navLinkAbout', trans); // For index.html
    updateTextContentGlobal('navLinkProjects', 'navLinkProjects', trans); // For index.html
    updateTextContentGlobal('navLinkContact', 'navLinkContact', trans); // For index.html

    updateTextContentGlobal('navLinkHomeDashboard', 'navLinkHomeDashboard', trans); // For dashboard.html
    updateTextContentGlobal('navLinkDashboard', 'navLinkDashboard', trans); // For dashboard.html
    updateTextContentGlobal('navLinkAboutDashboard', 'navLinkAboutDashboard', trans); // For dashboard.html

    updateTextContentGlobal('navLinkHomeAbout', 'navLinkHome', trans);      // For about.html
    updateTextContentGlobal('navLinkAboutAbout', 'navLinkAbout', trans);  // For about.html


    // Shared Footer
    const footerTextElements = document.querySelectorAll('#footerText'); // Common ID for footer P tag
    footerTextElements.forEach(el => {
        if (el) el.innerHTML = trans.footerText.replace('{year}', new Date().getFullYear());
    });


    // --- Page-Specific Translations ---
    if (document.body.classList.contains('homepage')) {
        updateTextContentGlobal('heroTitle', 'heroTitle', trans);
        updateTextContentGlobal('heroSubtitle', 'heroSubtitle', trans);
        updateTextContentGlobal('heroBtnAbout', 'heroBtnAbout', trans);
        updateTextContentGlobal('heroBtnProjects', 'heroBtnProjects', trans);
        updateTextContentGlobal('aboutPreviewTitle', 'aboutPreviewTitle', trans);
        updateTextContentGlobal('aboutPreviewText', 'aboutPreviewText', trans);
        updateTextContentGlobal('projectsPreviewTitle', 'projectsPreviewTitle', trans);
        updateTextContentGlobal('projectsPreviewSubtext', 'projectsPreviewSubtext', trans);
        updateTextContentGlobal('projectCard1Title', 'projectCard1Title', trans);
        updateTextContentGlobal('projectCard1Desc', 'projectCard1Desc', trans);
        updateTextContentGlobal('projectCard1Btn', 'projectCard1Btn', trans);
        updateTextContentGlobal('projectCard2Title', 'projectCard2Title', trans);
        updateTextContentGlobal('projectCard2Desc', 'projectCard2Desc', trans);
        updateTextContentGlobal('projectCard2Btn', 'projectCard2Btn', trans);
        updateTextContentGlobal('projectCard3Title', 'projectCard3Title', trans);
        updateTextContentGlobal('projectCard3Desc', 'projectCard3Desc', trans);
        updateTextContentGlobal('projectCard3Btn', 'projectCard3Btn', trans);
        updateTextContentGlobal('contactSectionTitle', 'contactSectionTitle', trans);
        updateTextContentGlobal('contactSectionSubtext', 'contactSectionSubtext', trans);
        updateTextContentGlobal('contactBtnEmail', 'contactBtnEmail', trans);
    }
    else if (document.getElementById('aboutMainTitle')) { // About Page
        updateTextContentGlobal('aboutMainTitle', 'aboutMainTitle', trans);
        updateTextContentGlobal('aboutNameCard', 'aboutNameCard', trans);
        updateTextContentGlobal('aboutTaglineCard', 'aboutTaglineCard', trans);
        updateTextContentGlobal('whoAmITitle', 'whoAmITitle', trans);
        updateTextContentGlobal('aboutIntro', 'aboutIntro', trans);
        updateTextContentGlobal('aboutAmbition', 'aboutAmbition', trans);
        updateTextContentGlobal('mySkillsTitle', 'mySkillsTitle', trans);
        updateTextContentGlobal('skillHTML', 'skillHTML', trans);
        updateTextContentGlobal('skillCSS', 'skillCSS', trans);
        updateTextContentGlobal('skillJS', 'skillJS', trans);
        updateTextContentGlobal('skillWP', 'skillWP', trans);
        updateTextContentGlobal('skillElementor', 'skillElementor', trans);
        updateTextContentGlobal('skillBackend', 'skillBackend', trans);
        updateTextContentGlobal('skillPython', 'skillPython', trans);
        updateTextContentGlobal('skillBootstrap', 'skillBootstrap', trans);
        updateTextContentGlobal('contactMeTitle', 'contactMeTitle', trans);
        updateTextContentGlobal('contactPrompt', 'contactPrompt', trans);
        updateTextContentGlobal('emailButtonAbout', 'emailButtonAbout', trans);
        updateTextContentGlobal('githubButtonAbout', 'githubButtonAbout', trans);
    }
    else if (document.getElementById('formTitle')) { // Dashboard Page
        // Most dashboard texts are handled by script.js, but we can set titles here
        updateTextContentGlobal('formTitle', 'formTitleDashboard', trans);
        updateTextContentGlobal('labelProjectName', 'labelProjectNameDashboard', trans);
        updateTextContentGlobal('labelProjectUrl', 'labelProjectUrlDashboard', trans);
        updateTextContentGlobal('labelProjectDescription', 'labelProjectDescriptionDashboard', trans);
        updateTextContentGlobal('submitProjectButton', 'submitProjectButtonDashboard', trans);
        updateTextContentGlobal('savedProjectsTitle', 'savedProjectsTitleDashboard', trans);
        updateTextContentGlobal('loadingProjectsText', 'loadingProjectsTextDashboard', trans);
        updateTextContentGlobal('noProjectsText', 'noProjectsTextDashboard', trans); // Initial text
        updateTextContentGlobal('refreshProjectsBtnText', 'refreshProjectsBtnTextDashboard', trans);
        // Placeholders are handled by the dashboard's script.js or directly in setLanguage in script.js
    }

    // Update active language button style
    const langBtnAr = document.getElementById('langBtnAr') || document.getElementById('langBtnArDashboard');
    const langBtnEn = document.getElementById('langBtnEn') || document.getElementById('langBtnEnDashboard');
    if (langBtnAr && langBtnEn) {
        langBtnAr.classList.toggle('active-lang', lang === 'ar');
        langBtnEn.classList.toggle('active-lang', lang === 'en');
    }
    
    localStorage.setItem('preferredGlobalLanguage', lang);

    // If on dashboard, call its specific fetch/display function
    if (typeof fetchAndDisplayProjectsDashboard === 'function' && document.getElementById('projectsListContainer')) {
        fetchAndDisplayProjectsDashboard();
    }
}

// --- Initial Language Setup & Event Listeners for Lang Buttons ---
document.addEventListener('DOMContentLoaded', () => {
    applyGlobalTranslations(currentGlobalLanguage); // Apply on load

    // Event listeners for language buttons (assuming unique IDs like langBtnArGlobal, langBtnEnGlobal if needed)
    // Or rely on the specific page's script to handle its own buttons if IDs are duplicated.
    // For this setup, using IDs specific to each navbar (e.g. langBtnAr, langBtnArDashboard)
    
    // For general lang buttons (if any page uses these IDs directly)
    const btnAr = document.getElementById('langBtnAr');
    const btnEn = document.getElementById('langBtnEn');
    if (btnAr) btnAr.addEventListener('click', () => applyGlobalTranslations('ar'));
    if (btnEn) btnEn.addEventListener('click', () => applyGlobalTranslations('en'));

    // For dashboard specific lang buttons
    const btnArDash = document.getElementById('langBtnArDashboard');
    const btnEnDash = document.getElementById('langBtnEnDashboard');
    if (btnArDash) btnArDash.addEventListener('click', () => applyGlobalTranslations('ar'));
    if (btnEnDash) btnEnDash.addEventListener('click', () => applyGlobalTranslations('en'));


    // Update year in footers
    const yearSpans = document.querySelectorAll('#currentYearMain, #currentYearDashboard, #currentYearAboutPage'); // IDs from HTML footers
    yearSpans.forEach(span => {
        if(span) span.textContent = new Date().getFullYear();
    });
});
