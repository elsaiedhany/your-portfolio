const translations = {
    en: {
        metaTitle: "Admin Panel - Add Site",
        navBrand: "Site Admin",
        pageTitleCard: "Submit New Website",
        urlLabel: "Enter Website URL:",
        submitButton: "Add Website",
        footerNote: "Frontend Demo. Data is not saved.",
        htmlLang: "en",
        bodyDir: "ltr",
        formPlaceholder: "https://www.example.com"
    },
    ar: {
        metaTitle: "لوحة التحكم - إضافة موقع",
        navBrand: "إدارة المواقع",
        pageTitleCard: "إضافة موقع جديد",
        urlLabel: "أدخل رابط الموقع الإلكتروني:",
        submitButton: "إضافة الموقع",
        footerNote: "واجهة تجريبية. لا يتم حفظ البيانات.",
        htmlLang: "ar",
        bodyDir: "rtl",
        formPlaceholder: "https://www.example.com"
    }
};

function setLanguage(lang) {
    const currentTranslations = translations[lang];

    // Set HTML lang and body direction
    document.documentElement.lang = currentTranslations.htmlLang;
    document.body.dir = currentTranslations.bodyDir;
    if (currentTranslations.bodyDir === 'rtl') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    // Update text content
    document.getElementById('metaTitle').textContent = currentTranslations.metaTitle;
    document.getElementById('navBrand').textContent = currentTranslations.navBrand;
    document.getElementById('pageTitleCard').textContent = currentTranslations.pageTitleCard;
    document.getElementById('urlLabel').textContent = currentTranslations.urlLabel;
    document.getElementById('websiteUrl').placeholder = currentTranslations.formPlaceholder;
    document.getElementById('submitButton').textContent = currentTranslations.submitButton;
    document.getElementById('footerNote').textContent = currentTranslations.footerNote;
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

document.getElementById('siteForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const urlInput = document.getElementById('websiteUrl');
    const url = urlInput.value.trim();
    const currentLang = document.documentElement.lang || 'en';

    if (!url) {
        alert(currentLang === 'ar' ? 'الرجاء إدخال رابط الموقع.' : 'Please enter the website URL.');
        urlInput.focus();
        return;
    }
    try {
        // Basic URL validation: checks if it can be parsed as a URL and has http(s) protocol
        const parsedUrl = new URL(url);
        if (!['http:', 'https первоначально:', 'https:'].includes(parsedUrl.protocol)) {
             throw new Error('Invalid protocol');
        }
    } catch (_) {
        alert(currentLang === 'ar' ? 'الرجاء إدخال رابط صحيح (مثال: https://www.example.com).' : 'Please enter a valid URL (e.g., https://www.example.com).');
        urlInput.focus();
        return;
    }

    alert(`URL Submitted: ${url}\n(${translations[currentLang].footerNote})`);
    // this.reset(); // Optionally reset the form after submission
});

// Load preferred language or default based on browser, then to English
document.addEventListener('DOMContentLoaded', () => {
    let preferredLanguage = localStorage.getItem('preferredLanguage');
    if (!preferredLanguage) {
        preferredLanguage = navigator.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    }
    setLanguage(preferredLanguage);
});
