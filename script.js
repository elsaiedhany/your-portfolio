const translations = {
    en: {
        metaTitle: "Site Management",
        navBrandSiteName: "Your Site Name",
        navLinkHome: "Home/Link Management",
        navLinkAbout: "About Me",
        pageTitleCard: "Add New Website",
        urlLabel: "Enter Website URL:",
        submitButton: "Add Website",
        footerNote: "Backend integration active.",
        htmlLang: "en",
        bodyDir: "ltr",
        formPlaceholder: "https://www.example.com",
        footerOwnerName: "Said Hany",
        submittedSitesTitle: "Saved Sites",
        loadingText: "Loading sites...",
        noSitesText: "No sites saved yet.",
        refreshButtonText: "Refresh List",
        alerts: { /* ... نفس تنبيهات الردود من الخادم ... */
            urlRequired: "Please enter the website URL.",
            urlInvalid: "Please enter a valid URL (e.g., https://www.example.com).",
            urlAdded: "Site added successfully!",
            errorAddingUrl: "Error adding URL. Please try again.",
            networkError: "Network error. Please check your connection or backend server.",
            noUrlProvidedBackend: "No URL provided to the server.",
            urlEmptyBackend: "URL cannot be empty (checked by server).",
            invalidUrlFormatBackend: "Invalid URL format. Must start with http:// or https:// (checked by server).",
            internalErrorBackend: "An internal server error occurred. Please try again.",
            errorFetchingSites: "Error fetching sites."
        }
    },
    ar: {
        metaTitle: "إدارة المواقع",
        navBrandSiteName: "اسم موقعك",
        navLinkHome: "الرئيسية/إدارة الروابط",
        navLinkAbout: "عني",
        pageTitleCard: "إضافة موقع جديد",
        urlLabel: "أدخل رابط الموقع الإلكتروني:",
        submitButton: "إضافة الموقع",
        footerNote: "تم تفعيل الربط مع الخادم.",
        htmlLang: "ar",
        bodyDir: "rtl",
        formPlaceholder: "https://www.example.com",
        footerOwnerName: "سعيد هاني",
        submittedSitesTitle: "المواقع المحفوظة",
        loadingText: "جاري تحميل المواقع...",
        noSitesText: "لا توجد مواقع محفوظة حتى الآن.",
        refreshButtonText: "تحديث القائمة",
        alerts: { /* ... نفس تنبيهات الردود من الخادم ... */
            urlRequired: "الرجاء إدخال رابط الموقع.",
            urlInvalid: "الرجاء إدخال رابط صحيح (مثال: https://www.example.com).",
            urlAdded: "تمت إضافة الموقع بنجاح!",
            errorAddingUrl: "خطأ في إضافة الرابط. الرجاء المحاولة مرة أخرى.",
            networkError: "خطأ في الشبكة. يرجى التحقق من اتصالك أو من الخادم الخلفي.",
            noUrlProvidedBackend: "لم يتم توفير رابط للخادم.",
            urlEmptyBackend: "لا يمكن أن يكون الرابط فارغًا (تم التحقق بواسطة الخادم).",
            invalidUrlFormatBackend: "تنسيق الرابط غير صالح. يجب أن يبدأ بـ http:// أو https:// (تم التحقق بواسطة الخادم).",
            internalErrorBackend: "حدث خطأ داخلي في الخادم. الرجاء المحاولة مرة أخرى.",
            errorFetchingSites: "خطأ في جلب المواقع."
        }
    }
};

// --- DOM Elements ---
const responseMessageDiv = document.getElementById('responseMessage');
const siteForm = document.getElementById('siteForm');
const websiteUrlInput = document.getElementById('websiteUrl');
const submitButton = document.getElementById('submitButton');

// --- عناصر خاصة بعرض الروابط ---
const sitesListContainer = document.getElementById('sitesListContainer');
const loadingSitesMessage = document.getElementById('loadingSitesMessage');
const noSitesMessage = document.getElementById('noSitesMessage');
const refreshSitesButton = document.getElementById('refreshSitesButton');


// --- Functions ---
function setLanguage(lang) {
    const currentTranslations = translations[lang];
    document.documentElement.lang = currentTranslations.htmlLang;
    document.body.dir = currentTranslations.bodyDir;
    document.body.classList.toggle('rtl', currentTranslations.bodyDir === 'rtl');

    // تحديث نصوص الترجمة العامة
    const elementsToTranslate = {
        'metaTitle': currentTranslations.metaTitle,
        'navBrandSiteName': currentTranslations.navBrandSiteName,
        'navLinkHome': currentTranslations.navLinkHome,
        'navLinkAbout': currentTranslations.navLinkAbout,
        'pageTitleCard': currentTranslations.pageTitleCard,
        'urlLabel': currentTranslations.urlLabel,
        'submitButton': currentTranslations.submitButton,
        'footerNote': currentTranslations.footerNote,
        'footerOwnerName': currentTranslations.footerOwnerName,
        'submittedSitesTitle': currentTranslations.submittedSitesTitle,
        'loadingText': currentTranslations.loadingText,
        'noSitesText': currentTranslations.noSitesText,
        'refreshButtonText': currentTranslations.refreshButtonText
    };

    for (const id in elementsToTranslate) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elementsToTranslate[id];
        }
    }
    
    if(websiteUrlInput) websiteUrlInput.placeholder = currentTranslations.formPlaceholder;
    
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    localStorage.setItem('preferredLanguage', lang);
    fetchAndDisplaySites(); // إعادة تحميل وعرض المواقع باللغة الجديدة (خاصة لرسالة "لا توجد مواقع")
}

function displayResponseMessage(message, type) {
    if (responseMessageDiv) {
        responseMessageDiv.textContent = message;
        responseMessageDiv.className = 'mb-3'; 
        responseMessageDiv.classList.add(type); 
        
        if (type === 'success') {
            setTimeout(() => {
                if(responseMessageDiv) { // تحقق مرة أخرى قبل المسح
                    responseMessageDiv.textContent = '';
                    responseMessageDiv.className = 'mb-3';
                }
            }, 5000); 
        }
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const url = websiteUrlInput.value.trim();
    const currentLang = document.documentElement.lang || 'en';
    const alerts = translations[currentLang].alerts;

    if (responseMessageDiv) {
        responseMessageDiv.textContent = '';
        responseMessageDiv.className = 'mb-3';
    }

    if (!url) {
        displayResponseMessage(alerts.urlRequired, 'error');
        websiteUrlInput.focus();
        return;
    }
    try {
        new URL(url); // Basic validation
        if (!['http:', 'https:'].includes(new URL(url).protocol)) {
             throw new Error('Invalid protocol');
        }
    } catch (_) {
        displayResponseMessage(alerts.urlInvalid, 'error');
        websiteUrlInput.focus();
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = currentLang === 'ar' ? 'جاري الإضافة...' : 'Adding...';

    try {
        const backendUrl = 'http://127.0.0.1:5000/add-site';
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ websiteUrl: url }),
        });
        const result = await response.json();

        if (response.ok && result.status === "success") {
            displayResponseMessage(alerts.urlAdded, 'success');
            if(siteForm) siteForm.reset(); 
            fetchAndDisplaySites(); // تحديث قائمة المواقع بعد الإضافة الناجحة
        } else {
            // ... (نفس معالجة أخطاء الخادم من قبل) ...
            let backendMessage = result.message || alerts.errorAddingUrl;
            if (result.message === "No URL provided") backendMessage = alerts.noUrlProvidedBackend;
            else if (result.message === "URL cannot be empty") backendMessage = alerts.urlEmptyBackend;
            else if (result.message === "Invalid URL format. Must start with http:// or https://") backendMessage = alerts.invalidUrlFormatBackend;
            else if (result.message === "An internal error occurred. Please try again.") backendMessage = alerts.internalErrorBackend;
            displayResponseMessage(backendMessage, 'error');
        }
    } catch (error) {
        console.error('Fetch Error (Add Site):', error);
        displayResponseMessage(alerts.networkError, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = translations[currentLang].submitButton;
    }
}

// --- وظيفة جديدة لجلب وعرض المواقع ---
async function fetchAndDisplaySites() {
    if (!sitesListContainer || !loadingSitesMessage || !noSitesMessage) return; // تأكد من وجود العناصر في الصفحة الحالية

    const currentLang = document.documentElement.lang || 'en';
    const alerts = translations[currentLang].alerts;

    loadingSitesMessage.style.display = 'block';
    noSitesMessage.style.display = 'none';
    sitesListContainer.innerHTML = ''; // مسح القائمة القديمة

    try {
        const backendUrl = 'http://127.0.0.1:5000/get-sites';
        const response = await fetch(backendUrl);
        const result = await response.json();

        if (response.ok && result.status === "success") {
            if (result.sites && result.sites.length > 0) {
                result.sites.forEach(siteUrl => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                    
                    const link = document.createElement('a');
                    link.href = siteUrl;
                    link.textContent = siteUrl;
                    link.target = '_blank'; // لفتح الرابط في نافذة جديدة
                    link.rel = 'noopener noreferrer';
                    
                    listItem.appendChild(link);
                    sitesListContainer.appendChild(listItem);
                });
            } else {
                noSitesMessage.style.display = 'block';
                noSitesMessage.textContent = alerts.noSitesText; // استخدام النص المترجم
            }
        } else {
            displayResponseMessage(result.message || alerts.errorFetchingSites, 'error');
             noSitesMessage.style.display = 'block';
             noSitesMessage.textContent = alerts.errorFetchingSites;
        }
    } catch (error) {
        console.error('Fetch Error (Get Sites):', error);
        displayResponseMessage(alerts.networkError, 'error'); // استخدام نفس رسالة الخطأ العامة
        noSitesMessage.style.display = 'block';
        noSitesMessage.textContent = alerts.networkError;
    } finally {
        loadingSitesMessage.style.display = 'none';
    }
}


// --- Event Listeners ---
if (siteForm) {
    siteForm.addEventListener('submit', handleFormSubmit);
}
if (refreshSitesButton) {
    refreshSitesButton.addEventListener('click', fetchAndDisplaySites);
}

document.addEventListener('DOMContentLoaded', () => {
    let preferredLanguage = localStorage.getItem('preferredLanguage');
    if (!preferredLanguage) {
        preferredLanguage = navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    }
    // تطبيق اللغة على كل الصفحات التي قد تحتوي على عناصر تحتاج لترجمة
    setLanguage(preferredLanguage); 

    // جلب المواقع فقط إذا كنا في صفحة index.html (حيث توجد قائمة المواقع)
    if (document.getElementById('sitesListContainer')) {
        fetchAndDisplaySites();
    }
    
    const yearSpanFooter = document.getElementById('currentYear'); // للفوتر العام
    if(yearSpanFooter) yearSpanFooter.textContent = new Date().getFullYear();

    const yearSpanAbout = document.getElementById('currentYearAboutPage'); // للفوتر في about.html
    if(yearSpanAbout) yearSpanAbout.textContent = new Date().getFullYear();
});
