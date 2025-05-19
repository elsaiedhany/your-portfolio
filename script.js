const translations = {
    en: {
        metaTitle: "Admin Panel - Add Site",
        navBrand: "Site Admin",
        pageTitleCard: "Submit New Website",
        urlLabel: "Enter Website URL:",
        submitButton: "Add Website",
        footerNote: "Backend integration active.",
        htmlLang: "en",
        bodyDir: "ltr",
        formPlaceholder: "https://www.example.com",
        alerts: {
            urlRequired: "Please enter the website URL.",
            urlInvalid: "Please enter a valid URL (e.g., https://www.example.com).",
            urlAdded: "Site added successfully!",
            errorAddingUrl: "Error adding URL. Please try again.",
            networkError: "Network error. Please check your connection or backend server.",
            noUrlProvidedBackend: "No URL provided to the server.",
            urlEmptyBackend: "URL cannot be empty (checked by server).",
            invalidUrlFormatBackend: "Invalid URL format. Must start with http:// or https:// (checked by server).",
            internalErrorBackend: "An internal server error occurred. Please try again."
        }
    },
    ar: {
        metaTitle: "لوحة التحكم - إضافة موقع",
        navBrand: "إدارة المواقع",
        pageTitleCard: "إضافة موقع جديد",
        urlLabel: "أدخل رابط الموقع الإلكتروني:",
        submitButton: "إضافة الموقع",
        footerNote: "تم تفعيل الربط مع الخادم.",
        htmlLang: "ar",
        bodyDir: "rtl",
        formPlaceholder: "https://www.example.com",
        alerts: {
            urlRequired: "الرجاء إدخال رابط الموقع.",
            urlInvalid: "الرجاء إدخال رابط صحيح (مثال: https://www.example.com).",
            urlAdded: "تمت إضافة الموقع بنجاح!",
            errorAddingUrl: "خطأ في إضافة الرابط. الرجاء المحاولة مرة أخرى.",
            networkError: "خطأ في الشبكة. يرجى التحقق من اتصالك أو من الخادم الخلفي.",
            noUrlProvidedBackend: "لم يتم توفير رابط للخادم.",
            urlEmptyBackend: "لا يمكن أن يكون الرابط فارغًا (تم التحقق بواسطة الخادم).",
            invalidUrlFormatBackend: "تنسيق الرابط غير صالح. يجب أن يبدأ بـ http:// أو https:// (تم التحقق بواسطة الخادم).",
            internalErrorBackend: "حدث خطأ داخلي في الخادم. الرجاء المحاولة مرة أخرى."
        }
    }
};

// --- DOM Elements ---
const responseMessageDiv = document.getElementById('responseMessage');
const siteForm = document.getElementById('siteForm');
const websiteUrlInput = document.getElementById('websiteUrl');
const submitButton = document.getElementById('submitButton');

// --- Functions ---
function setLanguage(lang) {
    const currentTranslations = translations[lang];
    document.documentElement.lang = currentTranslations.htmlLang;
    document.body.dir = currentTranslations.bodyDir;
    document.body.classList.toggle('rtl', currentTranslations.bodyDir === 'rtl');

    document.getElementById('metaTitle').textContent = currentTranslations.metaTitle;
    document.getElementById('navBrand').textContent = currentTranslations.navBrand;
    document.getElementById('pageTitleCard').textContent = currentTranslations.pageTitleCard;
    document.getElementById('urlLabel').textContent = currentTranslations.urlLabel;
    websiteUrlInput.placeholder = currentTranslations.formPlaceholder;
    submitButton.textContent = currentTranslations.submitButton;
    document.getElementById('footerNote').textContent = currentTranslations.footerNote;
    
    localStorage.setItem('preferredLanguage', lang);
}

function displayResponseMessage(message, type) {
    responseMessageDiv.textContent = message;
    responseMessageDiv.className = 'mb-3'; // Reset classes then add specific type
    responseMessageDiv.classList.add(type); // 'success' or 'error'
    
    if (type === 'success') {
        setTimeout(() => {
            responseMessageDiv.textContent = '';
            responseMessageDiv.className = 'mb-3';
        }, 5000); 
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const url = websiteUrlInput.value.trim();
    const currentLang = document.documentElement.lang || 'en';
    const alerts = translations[currentLang].alerts;

    responseMessageDiv.textContent = '';
    responseMessageDiv.className = 'mb-3';

    if (!url) {
        displayResponseMessage(alerts.urlRequired, 'error');
        websiteUrlInput.focus();
        return;
    }
    try {
        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
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
        const backendUrl = 'http://127.0.0.1:5000/add-site'; // هذا هو الرابط الذي يجب أن يعمل إذا كان Termux والمتصفح على نفس الجهاز
        // إذا كنت تفتح الموقع من جهاز آخر (مثل كمبيوتر) بينما Termux على موبايلك،
        // ستحتاج لوضع الـ IP الخاص بموبايلك هنا بدلاً من 127.0.0.1
        // مثال: const backendUrl = 'http://192.168.1.X:5000/add-site'; (استبدل X بالرقم الصحيح)

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ websiteUrl: url }),
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
            displayResponseMessage(alerts.urlAdded, 'success');
            siteForm.reset(); 
        } else {
            let backendMessage = result.message || alerts.errorAddingUrl;
            // محاولة لترجمة رسائل الخطأ الشائعة من الخادم
            if (result.message === "No URL provided") backendMessage = alerts.noUrlProvidedBackend;
            else if (result.message === "URL cannot be empty") backendMessage = alerts.urlEmptyBackend;
            else if (result.message === "Invalid URL format. Must start with http:// or https://") backendMessage = alerts.invalidUrlFormatBackend;
            else if (result.message === "An internal error occurred. Please try again.") backendMessage = alerts.internalErrorBackend;
            
            displayResponseMessage(backendMessage, 'error');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        displayResponseMessage(alerts.networkError, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = translations[currentLang].submitButton;
    }
}

// --- Event Listeners ---
siteForm.addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', () => {
    let preferredLanguage = localStorage.getItem('preferredLanguage');
    if (!preferredLanguage) {
        preferredLanguage = navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    }
    setLanguage(preferredLanguage);
});
