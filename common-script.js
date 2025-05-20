// common-script.js - For shared functions like language switching

const siteTranslations = {
    en: {
        // Navbar (shared across all pages)
        navBrandSiteName: "<i class=\"fas fa-rocket me-2\"></i>Said Hany | Projects", // Adjusted for all pages
        navLinkHome: "<i class=\"fas fa-home me-1\"></i>Home",
        navLinkAbout: "<i class=\"fas fa-user-tie me-1\"></i>About Me",
        navLinkDashboard: "<i class=\"fas fa-tasks me-1\"></i>Project Management", // For dashboard navbar
        navLinkHomeDashboard: "<i class=\"fas fa-home me-1\"></i>Back to Home", // For dashboard navbar to go to index.html

        // Footer (shared across all pages)
        footerText: `&copy; ${new Date().getFullYear()} Said Hany. All rights reserved. <br class="d-block d-sm-none"> Designed with <i class="fas fa-heart text-danger"></i>`,
        footerOwnerName: "Said Hany", // Used if needed separately

        // --- Homepage (index.html) Specific ---
        metaTitleHome: "Said Hany - Web Developer",
        heroTitle: "Welcome, I'm Said Hany",
        heroSubtitle: "A passionate Web Developer, specializing in turning ideas into creative digital realities.",
        heroBtnAbout: "<i class=\"fas fa-user-circle me-2\"></i>Learn More About Me",
        heroBtnProjects: "<i class=\"fas fa-eye me-2\"></i>View My Work",
        aboutPreviewTitle: "<i class=\"fas fa-feather-alt me-2\"></i>Quick Overview",
        aboutPreviewText: "I am a web developer focused on building smooth and engaging user experiences. I use modern technologies like HTML, CSS, JavaScript, and I'm currently learning WordPress and Elementor. I also have basic backend experience and enjoy turning challenges into software solutions.",
        projectsPreviewTitle: "<i class=\"fas fa-laptop-code me-2\"></i>Featured Projects",
        projectsPreviewSubtext: "A glimpse into some of the projects I've worked on. For more, you can visit my private dashboard.",
        projectCard1Title: "Al-Taqwa Website (Past Project)", // Example project on homepage
        projectCard1Desc: "A landing page with a simple and clear design, focusing on ease of navigation.",
        projectCard1Btn: "<i class=\"fas fa-external-link-alt me-1\"></i>Visit Project",
        projectCard2Title: "Another Creative Project",
        projectCard2Desc: "A brief description of another distinct project showcasing specific skills.",
        projectCard2Btn: "<i class=\"fas fa-external-link-alt me-1\"></i>Coming Soon",
        projectCard3Title: "Projects Dashboard",
        projectCard3Desc: "The tool you use to manage your projects, built with Flask and JavaScript.",
        projectCard3Btn: "<i class=\"fas fa-tachometer-alt me-1\"></i>Go to Dashboard",
        contactSectionTitle: "<i class=\"fas fa-comments me-2\"></i>Contact Me",
        contactSectionSubtext: "Have a project idea or a collaboration opportunity? Don't hesitate to reach out!",
        contactBtnEmail: "<i class=\"fas fa-paper-plane me-2\"></i>Send me an Email",

        // --- About Page (about.html) Specific ---
        metaTitleAboutPage: "About Me - Said Hany",
        aboutMainTitle: "<i class=\"fas fa-id-card me-2\"></i>About Me",
        aboutNameCard: "Said Hany",
        aboutTaglineCard: "Ambitious Web Developer",
        whoAmITitle: "<i class=\"fas fa-question-circle me-2\"></i>Who Am I?",
        aboutIntro: "Hello! I'm Said, a passionate web developer, currently focused on honing my skills in the latest frontend and backend technologies. I always strive to learn new things and apply what I learn in practical and innovative projects.",
        aboutAmbition: "One of my goals is to create useful web tools and applications. This project management dashboard is a step in that direction, aiming to organize my work and track my progress. I believe that continuous learning and practical application are key to evolving in this dynamic field.",
        mySkillsTitle: "<i class=\"fas fa-cogs me-2\"></i>My Technical Skills",
        skillHTML: "HTML5",
        skillCSS: "CSS3",
        skillJS: "JavaScript",
        skillWP: "WordPress <small class=\"d-block\">(Learning)</small>",
        skillElementor: "Elementor <small class=\"d-block\">(Learning)</small>",
        skillBackend: "Backend <small class=\"d-block\">(Basic Experience)</small>",
        skillPython: "Python <small class="d-block">(with Flask)</small>",
        skillBootstrap: "Bootstrap",
        contactMeTitle: "<i class=\"fas fa-envelope-open-text me-2\"></i>Get in Touch",
        contactPrompt: "I'm always happy to connect and exchange experiences. You can find me on:",
        emailButtonAbout: "<i class=\"fas fa-envelope fa-fw me-2\"></i>Email Me",
        githubButtonAbout: "<i class=\"fab fa-github fa-fw me-2\"></i>GitHub",
        // Add more for about.html if needed

        // --- Dashboard (dashboard.html) Specific (also uses some from common-script.js) ---
        metaTitleDashboard: "Project Dashboard - Said Hany",
        formTitleDashboard: "<i class=\"fas fa-plus-circle me-2\"></i>Add New Project", // if different from general formTitle
        labelProjectNameDashboard: "Project Name:",
        labelProjectUrlDashboard: "Project URL:",
        labelProjectDescriptionDashboard: "Project Description:",
        submitProjectButtonDashboard: "<i class=\"fas fa-paper-plane me-2\"></i>Add Project",
        savedProjectsTitleDashboard: "<i class=\"fas fa-briefcase me-2\"></i>Saved Projects",
        loadingProjectsTextDashboard: "Loading projects, please wait...",
        noProjectsTextDashboard: "<i class=\"fas fa-folder-open me-2\"></i>No projects saved yet. Add your first masterpiece!",
        refreshProjectsBtnTextDashboard: "<i class=\"fas fa-sync-alt me-1\"></i>Refresh List",
        deleteConfirmMessage: "Are you sure you want to delete the project \"{projectName}\"? This action cannot be undone.",
        deleteButtonTitle: "Delete Project",
        projectDeletedSuccess: "Project \"{projectName}\" deleted successfully.",
        errorDeletingProject: "Error deleting project \"{projectName}\".",
        confirmDeleteBtn: "Yes, Delete",
        cancelDeleteBtn: "Cancel",
        alerts: {
            urlRequired: "Please enter the website URL.", // This is actually project URL now
            projectNameRequired: "Project name is required.", // New
            projectDescRequired: "Project description is required.", // New
            allFieldsRequiredDashboard: "Hold on! Project Name, URL, and Description are all required for the dashboard.",
            urlInvalid: "Hmm, that URL doesn't look right. Please use a valid format (http:// or https://).",
            urlAdded: "Project added successfully! It's now in your list.", // Should be projectAdded
            projectAddedSuccessDashboard: "Project added successfully! It's now in your list.",
            errorAdding: "Oops! Error adding project. Please check your input or server.",
            networkError: "Network Error! Please check your internet connection or if the backend server is running.",
            errorFetching: "Could not fetch projects. The server might be resting!",
            projectNotFound: "Project not found for deletion."
            // Keep other specific backend error messages from original script.js if they are still relevant
        }
    },
    ar: {
        // Navbar (shared across all pages)
        navBrandSiteName: "<i class=\"fas fa-rocket me-2\"></i>سعيد هاني | مشاريعي", // Adjusted
        navLinkHome: "<i class=\"fas fa-home me-1\"></i>الرئيسية",
        navLinkAbout: "<i class=\"fas fa-user-tie me-1\"></i>عني",
        navLinkDashboard: "<i class=\"fas fa-tasks me-1\"></i>إدارة المشاريع",
        navLinkHomeDashboard: "<i class=\"fas fa-home me-1\"></i>العودة للرئيسية",

        // Footer (shared across all pages)
        footerText: `&copy; ${new Date().getFullYear()} سعيد هاني. كل الحقوق محفوظة. <br class="d-block d-sm-none"> تم التصميم بحب <i class="fas fa-heart text-danger"></i>`,
        footerOwnerName: "سعيد هاني",

        // --- Homepage (index.html) Specific ---
        metaTitleHome: "سعيد هاني - مطور ويب",
        heroTitle: "مرحباً، أنا سعيد هاني",
        heroSubtitle: "مطور ويب شغوف، متخصص في تحويل الأفكار إلى واقع رقمي إبداعي.",
        heroBtnAbout: "<i class=\"fas fa-user-circle me-2\"></i>اعرف المزيد عني",
        heroBtnProjects: "<i class=\"fas fa-eye me-2\"></i>شاهد أعمالي",
        aboutPreviewTitle: "<i class=\"fas fa-feather-alt me-2\"></i>لمحة سريعة",
        aboutPreviewText: "أنا مطور ويب أركز على بناء تجارب مستخدم سلسة وجذابة. أستخدم أحدث التقنيات مثل HTML, CSS, JavaScript، وأتعلم حاليًا WordPress و Elementor. لدي أيضًا خبرة بسيطة في تطوير الباك إند، وأستمتع بتحويل التحديات إلى حلول برمجية.",
        projectsPreviewTitle: "<i class=\"fas fa-laptop-code me-2\"></i>أبرز المشاريع",
        projectsPreviewSubtext: "نظرة على بعض المشاريع التي عملت عليها. للمزيد، يمكنك زيارة لوحة التحكم الخاصة بي.",
        projectCard1Title: "موقع التقوى (مشروع سابق)",
        projectCard1Desc: "صفحة هبوط تعريفية بتصميم بسيط وواضح، تركز على سهولة التصفح.",
        projectCard1Btn: "<i class=\"fas fa-external-link-alt me-1\"></i>زيارة المشروع",
        projectCard2Title: "مشروع إبداعي آخر",
        projectCard2Desc: "وصف موجز لمشروع آخر مميز قمت به، يعرض مهارات معينة.",
        projectCard2Btn: "<i class=\"fas fa-external-link-alt me-1\"></i>قريباً",
        projectCard3Title: "لوحة تحكم المشاريع",
        projectCard3Desc: "الأداة التي تستخدمها لإدارة مشاريعك، تم بناؤها باستخدام Flask و JavaScript.",
        projectCard3Btn: "<i class=\"fas fa-tachometer-alt me-1\"></i>الذهاب للوحة التحكم",
        contactSectionTitle: "<i class=\"fas fa-comments me-2\"></i>تواصل معي",
        contactSectionSubtext: "هل لديك فكرة مشروع أو فرصة تعاون؟ لا تتردد في التواصل معي!",
        contactBtnEmail: "<i class=\"fas fa-paper-plane me-2\"></i>أرسل لي بريدًا إلكترونيًا",
        
        // --- About Page (about.html) Specific ---
        metaTitleAboutPage: "عني - سعيد هاني",
        aboutMainTitle: "<i class=\"fas fa-id-card me-2\"></i>نبذة تعريفية",
        aboutNameCard: "سعيد هاني",
        aboutTaglineCard: "مطور ويب طموح",
        whoAmITitle: "<i class=\"fas fa-question-circle me-2\"></i>من أنا؟",
        aboutIntro: "أهلاً! أنا سعيد، مطور ويب شغوف، أركز حاليًا على صقل مهاراتي في أحدث تقنيات الواجهة الأمامية والخلفية. أسعى دائمًا لتعلم الجديد وتطبيق ما أتعلمه في مشاريع عملية ومبتكرة.",
        aboutAmbition: "أحد أهدافي هو إنشاء أدوات وتطبيقات ويب مفيدة، وهذه اللوحة لإدارة المشاريع هي خطوة في هذا الاتجاه، حيث أهدف لتنظيم أعمالي ومتابعة تقدمي. أؤمن بأن التعلم المستمر والتطبيق العملي هما مفتاح التطور في هذا المجال الديناميكي.",
        mySkillsTitle: "<i class=\"fas fa-cogs me-2\"></i>مهاراتي التقنية",
        skillHTML: "HTML5",
        skillCSS: "CSS3",
        skillJS: "JavaScript",
        skillWP: "WordPress <small class=\"d-block\">(أتعلمه)</small>",
        skillElementor: "Elementor <small class=\"d-block\">(أتعلمه)</small>",
        skillBackend: "باك إند <small class=\"d-block\">(خبرة بسيطة)</small>",
        skillPython: "Python <small class=\"d-block\">(مع Flask)</small>",
        skillBootstrap: "Bootstrap",
        contactMeTitle: "<i class=\"fas fa-envelope-open-text me-2\"></i>تواصل معي",
        contactPrompt: "يسعدني دائمًا التواصل وتبادل الخبرات. يمكنك إيجادي على:",
        emailButtonAbout: "<i class=\"fas fa-envelope fa-fw me-2\"></i>راسلني",
        githubButtonAbout: "<i class=\"fab fa-github fa-fw me-2\"></i>GitHub",

        // --- Dashboard (dashboard.html) Specific ---
        metaTitleDashboard: "لوحة تحكم المشاريع - سعيد هاني",
        formTitleDashboard: "<i class=\"fas fa-plus-circle me-2\"></i>إضافة مشروع جديد",
        labelProjectNameDashboard: "اسم المشروع:",
        labelProjectUrlDashboard: "رابط المشروع (URL):",
        labelProjectDescriptionDashboard: "وصف المشروع:",
        submitProjectButtonDashboard: "<i class=\"fas fa-paper-plane me-2\"></i>إضافة المشروع",
        savedProjectsTitleDashboard: "<i class=\"fas fa-briefcase me-2\"></i>المشاريع المحفوظة",
        loadingProjectsTextDashboard: "جاري تحميل المشاريع، يرجى الانتظار...",
        noProjectsTextDashboard: "<i class=\"fas fa-folder-open me-2\"></i>لا توجد مشاريع محفوظة حتى الآن. قم بإضافة تحفتك الأولى!",
        refreshProjectsBtnTextDashboard: "<i class=\"fas fa-sync-alt me-1\"></i>تحديث القائمة",
        deleteConfirmMessage: "هل أنت متأكد أنك تريد حذف مشروع \"{projectName}\"؟ لا يمكن التراجع عن هذا الإجراء.",
        deleteButtonTitle: "حذف المشروع",
        projectDeletedSuccess: "تم حذف مشروع \"{projectName}\" بنجاح.",
        errorDeletingProject: "خطأ في حذف مشروع \"{projectName}\".",
        confirmDeleteBtn: "نعم، احذف",
        cancelDeleteBtn: "إلغاء",
        alerts: { // Alerts for dashboard, some might be similar to general ones
            urlRequired: "الرجاء إدخال رابط المشروع.",
            projectNameRequired: "اسم المشروع مطلوب.",
            projectDescRequired: "وصف المشروع مطلوب.",
            allFieldsRequiredDashboard: "لحظة من فضلك! اسم المشروع، الرابط، والوصف كلها مطلوبة للوحة التحكم.",
            urlInvalid: "هممم، هذا الرابط لا يبدو صحيحًا. يرجى استخدام تنسيق صالح (http:// أو https://).",
            projectAddedSuccessDashboard: "تمت إضافة المشروع بنجاح! أصبح الآن في قائمتك.",
            errorAdding: "عفوًا! خطأ في إضافة المشروع. يرجى التحقق من مدخلاتك أو الخادم.",
            networkError: "خطأ في الشبكة! يرجى التحقق من اتصالك بالإنترنت أو من أن الخادم الخلفي يعمل.",
            errorFetching: "تعذر جلب المشاريع. قد يكون الخادم في استراحة!",
            projectNotFound: "لم يتم العثور على المشروع للحذف."
        }
    }
};

let currentGlobalLanguage = 'ar'; // Default language

function updateTextContentGlobal(elementId, translationKey, translationsObject) {
    const element = document.getElementById(elementId);
    if (element && translationsObject[translationKey]) {
        element.innerHTML = translationsObject[translationKey];
    } else if (element) {
        // console.warn(`Translation key "${translationKey}" not found for element "#${elementId}" or element not found.`);
    }
}

function applyGlobalTranslations(lang) {
    currentGlobalLanguage = lang;
    const trans = siteTranslations[lang];

    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');

    // --- Shared Elements (Navbar, Footer) ---
    // Note: You need to ensure these IDs exist in all relevant HTML files
    // For Navbar (Example IDs, adjust to your actual HTML)
    updateTextContentGlobal('navBrandSiteName', 'navBrandSiteName', trans); // For index.html navbar
    updateTextContentGlobal('navBrandSiteNameAbout', 'navBrandSiteName', trans); // For about.html navbar
    updateTextContentGlobal('navBrandSiteNameDashboard', 'navBrandSiteName', trans); // For dashboard.html navbar
    
    updateTextContentGlobal('navLinkHome', 'navLinkHome', trans); // For index.html navbar
    updateTextContentGlobal('navLinkAbout', 'navLinkAbout', trans); // For index.html navbar
    updateTextContentGlobal('navLinkDashboard', 'navLinkDashboard', trans); // For dashboard navbar link to itself
    updateTextContentGlobal('navLinkHomeAbout', 'navLinkHome', trans); // For about.html navbar link to home
    updateTextContentGlobal('navLinkAboutAbout', 'navLinkAbout', trans); // For about.html navbar link to itself
    updateTextContentGlobal('navLinkHomeDashboard', 'navLinkHome', trans); // For dashboard.html navbar link to home
    updateTextContentGlobal('navLinkAboutDashboard', 'navLinkAbout', trans); // For dashboard.html navbar link to about


    // For Footer (Example IDs, adjust to your actual HTML)
    updateTextContentGlobal('footerText', 'footerText', trans); // For dashboard.html
    updateTextContentGlobal('footerTextAbout', 'footerText', trans); // For about.html
    // For index.html footer, the year is handled by its own small script. We only need to translate owner name if it's dynamic
    const footerOwnerNameElements = document.querySelectorAll('#footerOwnerName, #footerOwnerNameAbout, #footerOwnerNameMain'); // Generalize if possible
    footerOwnerNameElements.forEach(el => {
        if(el) el.textContent = trans.footerOwnerName;
    });


    // --- Page-Specific Translations ---
    // Homepage (index.html)
    if (document.body.classList.contains('homepage')) { // Add class="homepage" to body of index.html
        updateTextContentGlobal('metaTitleHome', 'metaTitleHome', trans); // Assuming you set an ID for title tag
        if(document.title && trans.metaTitleHome) document.title = trans.metaTitleHome.replace(/<[^>]*>?/gm, ''); // Set document title, strip HTML

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
    // About Page (about.html)
    else if (document.getElementById('aboutMainTitle')) { // Check for a unique ID from about page
        if(document.title && trans.metaTitleAboutPage) document.title = trans.metaTitleAboutPage.replace(/<[^>]*>?/gm, '');
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
    // Dashboard Page (dashboard.html) - specific texts if not covered by general script.js
    else if (document.getElementById('formTitle')) { // A unique ID from dashboard
        const dashboardTrans = siteTranslations[lang]; // Use the main translations object
        if(document.title && dashboardTrans.metaTitleDashboard) document.title = dashboardTrans.metaTitleDashboard.replace(/<[^>]*>?/gm, '');

        updateTextContentGlobal('formTitle', 'formTitleDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('labelProjectName', 'labelProjectNameDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('labelProjectUrl', 'labelProjectUrlDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('labelProjectDescription', 'labelProjectDescriptionDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('submitProjectButton', 'submitProjectButtonDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('savedProjectsTitle', 'savedProjectsTitleDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('loadingProjectsText', 'loadingProjectsTextDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('noProjectsText', 'noProjectsTextDashboard', dashboardTrans); // Already in script.js
        updateTextContentGlobal('refreshProjectsBtnText', 'refreshProjectsBtnTextDashboard', dashboardTrans); // Already in script.js
        // Placeholder updates are usually handled by the page-specific script (script.js for dashboard)
    }


    // Update active language button style across all pages if they exist
    const langBtnAr = document.getElementById('langBtnAr');
    const langBtnEn = document.getElementById('langBtnEn');
    if (langBtnAr && langBtnEn) {
        langBtnAr.classList.toggle('active-lang', lang === 'ar');
        langBtnEn.classList.toggle('active-lang', lang === 'en');
    }
    
    localStorage.setItem('preferredGlobalLanguage', lang);
}

// --- Initial Language Setup ---
document.addEventListener('DOMContentLoaded', () => {
    const preferredGlobalLanguage = localStorage.getItem('preferredGlobalLanguage') || (navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en');
    applyGlobalTranslations(preferredGlobalLanguage);

    // Attach event listeners to language buttons if they exist on the page
    const langBtnAr = document.getElementById('langBtnAr');
    const langBtnEn = document.getElementById('langBtnEn');

    if (langBtnAr) {
        langBtnAr.addEventListener('click', () => applyGlobalTranslations('ar'));
    }
    if (langBtnEn) {
        langBtnEn.addEventListener('click', () => applyGlobalTranslations('en'));
    }

    // Update year in footers
    const yearSpans = document.querySelectorAll('#currentYear, #currentYearMain, #currentYearAboutPage');
    yearSpans.forEach(span => {
        if(span) span.textContent = new Date().getFullYear();
    });
});
