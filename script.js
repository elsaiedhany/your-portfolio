// common-script.js - For shared functions like language switching and global UI elements

// --- START: Comprehensive Translations Object ---
const siteTranslations = {
    en: {
        // Meta Titles
        metaTitleHome: "Said Hany - Creative Web Developer & UI Designer",
        metaTitleAboutPage: "About Me - Said Hany | Web Developer",
        metaTitleDashboard: "Projects Dashboard - Said Hany (Admin)",

        // Navbar (shared) - Assuming same brand for all now
        navBrandSiteName: "<span class='brand-icon'><i class='fas fa-meteor'></i></span> Said Hany", 
        navLinkHome: "<i class='fas fa-home-alt me-1'></i>Home",
        navLinkAbout: "<i class='fas fa-user-astronaut me-1'></i>About Me",
        navLinkProjects: "<i class='fas fa-bolt me-1'></i>My Work", // For homepage link to projects section
        navLinkContact: "<i class='fas fa-paper-plane me-1'></i>Contact", // For homepage link to contact section
        
        // Dashboard Navbar specific (ensure unique IDs if structure differs significantly)
        navLinkHomeDashboard: "<i class='fas fa-arrow-left me-1'></i>Main Site",
        navLinkDashboard: "<i class='fas fa-edit me-1'></i>Manage Projects",
        navLinkAboutDashboard: "<i class='fas fa-info-circle me-1'></i>About Page (View)",


        // Footer (shared) - Year will be handled by JS
        footerText: `&copy; {year} <span id="footerOwnerName" class="fw-bold">Said Hany</span>. All rights reserved. <br class="d-block d-sm-none"> Crafted with passion <i class="fas fa-heart text-dangerbeat"></i>`,
        footerOwnerName: "Said Hany",

        // --- Homepage (index.html) ---
        heroTitle: "Said Hany",
        heroSubtitle: "Creative Web Developer | I transform complex ideas into elegant and seamless digital experiences.",
        heroBtnAbout: "<i class='fas fa-sparkles me-2'></i>Discover More About Me",
        heroBtnProjects: "<i class='fas fa-project-diagram me-2'></i>Browse My Projects",
        aboutPreviewTitle: "<span><i class='fas fa-user-check me-2'></i>About Me Briefly</span>",
        aboutPreviewText: "I'm Said, a developer specializing in interactive frontend interfaces using HTML, CSS, and JavaScript. I'm expanding my knowledge into WordPress and Elementor, along with exploring backend development fundamentals. I enjoy programming challenges and strive to deliver innovative, high-quality solutions.",
        projectsPreviewTitle: "<span><i class='fas fa-lightbulb me-2'></i>Inspiring Projects</span>",
        projectsPreviewSubtext: "A quick look at some projects that reflect my passion for design and development. To manage all projects, I access my private dashboard.",
        projectCard1Title: "Al-Taqwa Website",
        projectCard1Desc: "My first venture into web design, a landing page focused on content and usability.",
        projectCard1Btn: "<i class='fas fa-external-link-square-alt me-1'></i>Visit Project",
        projectCard2Title: "Creative UI Concept",
        projectCard2Desc: "An experimental project applying modern design principles to create an engaging UI.",
        projectCard2Btn: "<i class='fas fa-hourglass-start me-1'></i>In Progress",
        projectCard3Title: "Projects Dashboard",
        projectCard3Desc: "My personal tool for managing projects, built with Python (Flask) and JavaScript.",
        projectCard3Btn: "<i class='fas fa-user-shield me-1'></i>Access Panel (Private)",
        contactSectionTitle: "<span><i class='fas fa-hands-helping me-2'></i>Let's Collaborate!</span>",
        contactSectionSubtext: "Have an exciting project, a collaboration idea, or just want to exchange experiences? I'm here to listen and help.",
        contactBtnEmail: "<i class='fas fa-at me-2'></i>Send Me a Message",

        // --- About Page (about.html) ---
        // metaTitleAboutPage (defined above)
        aboutMainTitle: "<span><i class='fas fa-id-card-alt me-2'></i>Comprehensive Profile</span>",
        aboutNameCard: "Said Hany",
        aboutTaglineCard: "Ambitious Web Developer & UI Designer",
        whoAmITitle: "<i class='fas fa-user-secret me-2 text-secondary'></i>Who Am I?",
        aboutIntro: "Hello! I'm Said, a passionate Egyptian web developer with a keen interest in all new things tech. I am currently focused on deepening my expertise in frontend development using the latest tools and techniques, alongside building a solid foundation in backend development.",
        aboutAmbition: "I always strive to transform innovative ideas into practical and interactive web projects that add value to the user. I believe that continuous learning, passion for detail, and striving for excellence are the keys to success in this ever-evolving field. This web development journey for me is not just a job, but a passion and joy in building things from scratch and seeing them come to life.",
        mySkillsTitle: "<i class='fas fa-cogs me-2 text-secondary'></i>My Technical Skills",
        skillHTML: "HTML5",
        skillCSS: "CSS3",
        skillJS: "JavaScript",
        skillWP: "WordPress <small class='d-block text-muted-custom'>(Learning)</small>",
        skillElementor: "Elementor <small class='d-block text-muted-custom'>(Learning)</small>",
        skillBackend: "Backend Concepts <small class='d-block text-muted-custom'>(Basics)</small>",
        skillPython: "Python <small class='d-block text-muted-custom'>(with Flask)</small>",
        skillBootstrap: "Bootstrap 5",
        contactMeTitle: "<i class='fas fa-comments me-2 text-secondary'></i>Get in Touch",
        contactPrompt: "I'm always happy to hear from you, whether you have an inquiry, a suggestion, or an opportunity for collaboration. You can reach me via:",
        emailButtonAbout: "<i class='fas fa-at fa-fw me-2'></i>Email Me",
        githubButtonAbout: "<i class='fab fa-github-alt fa-fw me-2'></i>My GitHub",
        
        // --- Dashboard (dashboard.html) ---
        // metaTitleDashboard (defined above)
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
        addingProjectInProgress: "<i class=\"fas fa-spinner fa-spin me-2\"></i>Adding...", // For dashboard submit button
        alerts: { // Alerts for dashboard
            allFieldsRequiredDashboard: "Hold on! Project Name, URL, and Description are all required.",
            urlInvalid: "Hmm, that URL doesn't look right. Please use a valid format (e.g., https://example.com).",
            projectAddedSuccessDashboard: "Project added successfully! It's now in your list.",
            errorAdding: "Oops! Error adding project. Please check your input or server.",
            networkError: "Network Error! Please check your internet or backend server.",
            errorFetching: "Could not fetch projects. Server might be resting!",
            projectNotFound: "Project not found for deletion.",
            noUrlProvided: "No URL provided to the server.",
            urlCannotBeEmpty: "URL cannot be empty (server check).",
            invalidUrlFormatBackend: "Invalid URL format from server."
        }
    },
    ar: {
        // Meta Titles
        metaTitleHome: "سعيد هاني - مطور ويب ومصمم واجهات إبداعية",
        metaTitleAboutPage: "عني - سعيد هاني | مطور ويب",
        metaTitleDashboard: "لوحة تحكم المشاريع - سعيد هاني (خاص)",

        // Navbar (shared)
        navBrandSiteName: "<span class='brand-icon'><i class='fas fa-meteor'></i></span> سعيد هاني",
        navLinkHome: "<i class='fas fa-home-alt me-1'></i>الرئيسية",
        navLinkAbout: "<i class='fas fa-user-astronaut me-1'></i>من أنا؟",
        navLinkProjects: "<i class='fas fa-bolt me-1'></i>أعمالي", // For homepage link to projects section
        navLinkContact: "<i class='fas fa-paper-plane me-1'></i>تواصل", // For homepage link to contact section

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
        aboutMainTitle: "<span><i class='fas fa-id-card-alt me-2'></i>نبذة تعريفية شاملة</span>",
        aboutNameCard: "سعيد هاني",
        aboutTaglineCard: "مطور ويب ومصمم واجهات طموح",
        whoAmITitle: "<i class='fas fa-user-secret me-2 text-secondary'></i>من أنا؟",
        aboutIntro: "أهلاً بكم في صفحتي! أنا سعيد هاني، مطور ويب مصري شغوف بكل ما هو جديد في عالم التقنية. أركز حاليًا على تعميق خبراتي في تطوير الواجهات الأمامية (Frontend) باستخدام أحدث الأدوات والتقنيات، بالإضافة إلى بناء أساس قوي في تطوير الواجهات الخلفية (Backend).",
        aboutAmbition: "أسعى دائمًا لتحويل الأفكار المبتكرة إلى مشاريع ويب عملية وتفاعلية تضيف قيمة للمستخدم. أؤمن بأن التعلم المستمر، الشغف بالتفاصيل، والسعي نحو الإتقان هي مفاتيح النجاح في هذا المجال المتجدد باستمرار.",
        mySkillsTitle: "<i class='fas fa-cogs me-2 text-secondary'></i>مهاراتي التقنية",
        skillHTML: "HTML5",
        skillCSS: "CSS3",
        skillJS: "JavaScript",
        skillWP: "WordPress <small class='d-block text-muted-custom'>(أتعلمه)</small>",
        skillElementor: "Elementor <small class='d-block text-muted-custom'>(أتعلمه)</small>",
        skillBackend: "مفاهيم Backend <small class='d-block text-muted-custom'>(أساسيات)</small>",
        skillPython: "Python <small class='d-block text-muted-custom'>(مع Flask)</small>",
        skillBootstrap: "Bootstrap 5",
        contactMeTitle: "<i class='fas fa-comments me-2 text-secondary'></i>تواصل معي",
        contactPrompt: "يسعدني دائمًا أن أسمع منك، سواء كان لديك استفسار، اقتراح، أو فرصة للتعاون. يمكنك التواصل معي عبر:",
        emailButtonAbout: "<i class='fas fa-at fa-fw me-2'></i>البريد الإلكتروني",
        githubButtonAbout: "<i class='fab fa-github-alt fa-fw me-2'></i>حسابي على GitHub",

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
        addingProjectInProgress: "<i class=\"fas fa-spinner fa-spin me-2\"></i>جاري الإضافة...",
        alerts: {
            allFieldsRequiredDashboard: "لحظة من فضلك! اسم المشروع، الرابط، والوصف كلها مطلوبة.",
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

// --- Global Language State & Helper ---
let currentGlobalLanguage = localStorage.getItem('preferredGlobalLanguage') || (navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en');

function updateTextContentGlobal(elementId, translationKey, translationsObject) {
    const element = document.getElementById(elementId);
    if (element && translationsObject && translationsObject[translationKey]) {
        element.innerHTML = translationsObject[translationKey];
    }
}

// --- Main Translation Function ---
function applyGlobalTranslations(lang) {
    currentGlobalLanguage = lang;
    const trans = siteTranslations[lang];
    if (!trans) { console.error(`Translations not found for language: ${lang}`); return; }

    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');

    // Meta Titles (dynamically based on current page for better SEO and user experience)
    let metaTitleKey;
    if (document.body.classList.contains('homepage')) metaTitleKey = 'metaTitleHome';
    else if (document.getElementById('aboutMainTitle')) metaTitleKey = 'metaTitleAboutPage';
    else if (document.getElementById('formTitle')) metaTitleKey = 'metaTitleDashboard'; // Assuming #formTitle is unique to dashboard
    
    if (metaTitleKey && trans[metaTitleKey]) {
        document.title = trans[metaTitleKey].replace(/<[^>]*>?/gm, ''); // Strip HTML for title tag
    }
    
    // Navbar elements (ensure unique IDs across different navs if structures vary greatly)
    // Homepage Navbar
    updateTextContentGlobal('navBrandSiteName', 'navBrandSiteName', trans); // Also used by other navs if they share the ID
    updateTextContentGlobal('navLinkHome', 'navLinkHome', trans);
    updateTextContentGlobal('navLinkAbout', 'navLinkAbout', trans);
    updateTextContentGlobal('navLinkProjects', 'navLinkProjects', trans);
    updateTextContentGlobal('navLinkContact', 'navLinkContact', trans);

    // About Page Navbar (assuming different IDs for nav items if structure varies)
    updateTextContentGlobal('navBrandSiteNameAbout', 'navBrandSiteName', trans); // Re-use brand text
    updateTextContentGlobal('navLinkHomeAbout', 'navLinkHome', trans);
    updateTextContentGlobal('navLinkAboutAbout', 'navLinkAbout', trans);
    updateTextContentGlobal('navLinkProjectsAbout', 'navLinkProjects', trans);
    updateTextContentGlobal('navLinkContactAbout', 'navLinkContact', trans);

    // Dashboard Navbar
    updateTextContentGlobal('navBrandSiteNameDashboard', 'navBrandSiteName', trans); // Re-use brand text
    updateTextContentGlobal('navLinkHomeDashboard', 'navLinkHomeDashboard', trans);
    updateTextContentGlobal('navLinkDashboard', 'navLinkDashboard', trans);
    updateTextContentGlobal('navLinkAboutDashboard', 'navLinkAboutDashboard', trans);
    

    // Footer (common ID, ensure it's in all HTML footers)
    const footerTextElements = document.querySelectorAll('#footerText, #footerTextAbout, #footerTextDashboard'); 
    footerTextElements.forEach(el => {
        if (el) el.innerHTML = trans.footerText.replace('{year}', new Date().getFullYear());
    });

    // --- Page-Specific Translations ---
    if (document.body.classList.contains('homepage')) {
        // Hero section
        updateTextContentGlobal('heroTitle', 'heroTitle', trans);
        updateTextContentGlobal('heroSubtitle', 'heroSubtitle', trans);
        updateTextContentGlobal('heroBtnAbout', 'heroBtnAbout', trans);
        updateTextContentGlobal('heroBtnProjects', 'heroBtnProjects', trans);
        // About Preview
        updateTextContentGlobal('aboutPreviewTitle', 'aboutPreviewTitle', trans);
        updateTextContentGlobal('aboutPreviewText', 'aboutPreviewText', trans);
        // Projects Preview
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
        // Contact Section
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
    else if (document.getElementById('formTitle')) { // Dashboard Page (Handled by script.js but can set initial texts)
        updateTextContentGlobal('formTitle', 'formTitleDashboard', trans);
        updateTextContentGlobal('labelProjectName', 'labelProjectNameDashboard', trans);
        updateTextContentGlobal('labelProjectUrl', 'labelProjectUrlDashboard', trans);
        updateTextContentGlobal('labelProjectDescription', 'labelProjectDescriptionDashboard', trans);
        updateTextContentGlobal('submitProjectButton', 'submitProjectButtonDashboard', trans); // Initial text
        updateTextContentGlobal('savedProjectsTitle', 'savedProjectsTitleDashboard', trans);
        updateTextContentGlobal('loadingProjectsText', 'loadingProjectsTextDashboard', trans);
        updateTextContentGlobal('noProjectsText', 'noProjectsTextDashboard', trans);
        updateTextContentGlobal('refreshProjectsBtnText', 'refreshProjectsBtnTextDashboard', trans);
        // Placeholders for dashboard form inputs
        const pnInput = document.getElementById('projectName');
        const puInput = document.getElementById('projectUrl');
        const pdInput = document.getElementById('projectDescription');
        if (pnInput) pnInput.placeholder = lang === 'ar' ? "مثال: نظام إدارة المهام" : "e.g., Task Management System";
        if (puInput) puInput.placeholder = "https://myproject.example.com";
        if (pdInput) pdInput.placeholder = lang === 'ar' ? "اشرح فكرة المشروع وأهميته..." : "Explain the project idea and its importance...";
    }

    // Update active language button style
    // Use more specific selectors if IDs are duplicated across navbars
    document.querySelectorAll('.btn-lang-switcher').forEach(btn => {
        if (btn.id.toLowerCase().includes(lang)) {
            btn.classList.add('active-lang');
        } else {
            btn.classList.remove('active-lang');
        }
    });
    
    localStorage.setItem('preferredGlobalLanguage', lang);

    // If on dashboard, call its specific fetch/display function
    if (typeof fetchAndDisplayProjectsDashboard === 'function' && document.getElementById('projectsListContainer')) {
        fetchAndDisplayProjectsDashboard();
    }
}

// --- Navbar Scroll & Mobile Menu Close ---
document.addEventListener('DOMContentLoaded', () => {
    applyGlobalTranslations(currentGlobalLanguage); // Apply on load

    // Language switchers event listeners (using more generic selectors for buttons in navbars)
    document.querySelectorAll('.main-navbar .btn-lang-switcher-icon, .main-navbar .btn-lang-switcher').forEach(btn => {
        if (btn.id.toLowerCase().includes('ar')) {
            btn.addEventListener('click', () => applyGlobalTranslations('ar'));
        } else if (btn.id.toLowerCase().includes('en')) {
            btn.addEventListener('click', () => applyGlobalTranslations('en'));
        }
    });
    
    // Navbar scroll effect for homepage (and potentially other pages if .initial-navbar-transparent is used)
    const mainNavbar = document.querySelector('.main-navbar');
    if (mainNavbar && mainNavbar.classList.contains('initial-navbar-transparent')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainNavbar.classList.remove('initial-navbar-transparent');
                mainNavbar.classList.add('scrolled-navbar');
            } else {
                mainNavbar.classList.add('initial-navbar-transparent');
                mainNavbar.classList.remove('scrolled-navbar');
            }
        });
    } else if (mainNavbar) { // Ensure other navbars always have scrolled style if not transparent
         mainNavbar.classList.add('scrolled-navbar');
    }

    // Auto-close mobile navbar on link click or scroll
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    function closeMobileNav() {
        if (navToggler && navCollapse && navCollapse.classList.contains('show')) {
            // navToggler.click(); // This can sometimes cause issues if called during scroll
            // A more robust way to close it using Bootstrap's API if available, or manually:
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                navCollapse.classList.remove('show'); // Manual fallback
            }
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    // Optional: Close on scroll (can be a bit aggressive, test usability)
    // let scrollTimeout;
    // window.addEventListener('scroll', () => {
    //     clearTimeout(scrollTimeout);
    //     scrollTimeout = setTimeout(closeMobileNav, 150); // Close after a short delay of no scrolling
    // }, { passive: true });


    // Update year in footers
    const yearSpans = document.querySelectorAll('#currentYearMain, #currentYearDashboard, #currentYearAboutPage');
    yearSpans.forEach(span => {
        if(span) span.textContent = new Date().getFullYear();
    });

    // Intersection Observer for section animations (can be in common-script.js)
    const animatedSections = document.querySelectorAll('.section-animated');
    if (typeof IntersectionObserver === 'function') {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }); // Trigger a bit earlier
        animatedSections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        animatedSections.forEach(section => section.classList.add('fade-in-up')); // Fallback
    }
});
