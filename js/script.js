document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    initLanguage();
    initCookieNotice();
});

// Component Loader
async function loadComponent(id, path) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        if (id === 'header') {
            setupNav(); // Re-init nav events after loading
            updateLanguageUI();
        }
    } catch (err) {
        console.error('Error loading component:', err);
    }
}

// Mobile Nav Logic
function setupNav() {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.dropdown > a');

    if(burger) {
        burger.addEventListener('click', () => nav.classList.toggle('active'));
    }

    if(dropdown && window.innerWidth < 768) {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.parentElement.classList.toggle('active');
        });
    }
}

// Language Logic
const translations = {
    nl: {
        home: "Home",
        about: "Over Ons",
        flavors: "Onze Smaken",
        where: "Waar te kopen",
        contact: "Contact",
        hero_title: "Verfijnd Genieten. Zonder Alcohol.",
        cookie_text: "Wij gebruiken cookies om uw ervaring te verbeteren.",
        cookie_btn: "Accepteren",
        send: "Versturen"
    },
    en: {
        home: "Home",
        about: "About Us",
        flavors: "Our Flavors",
        where: "Where to buy",
        contact: "Contact",
        hero_title: "Sophisticated Taste. Zero Alcohol.",
        cookie_text: "We use cookies to improve your experience.",
        cookie_btn: "Accept",
        send: "Send"
    }
};

function initLanguage() {
    let lang = localStorage.getItem('lang') || 'nl';
    localStorage.setItem('lang', lang);
}

function switchLang(lang) {
    localStorage.setItem('lang', lang);
    location.reload(); // Refresh to apply translations
}

function updateLanguageUI() {
    const lang = localStorage.getItem('lang');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// Cookie Notice
function initCookieNotice() {
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            const banner = document.getElementById('cookie-alert');
            if(banner) banner.style.display = 'block';
        }, 2000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-alert').style.display = 'none';
}