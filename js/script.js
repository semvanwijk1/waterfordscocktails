const translations = {
    nl: {
        home: "HOME", about: "OVER ONS", flavors: "SMAKEN", where: "SHOP", contact: "CONTACT",
        hero_tag: "WATERFORDS 0.0%", hero_main: "ZUIVER AMBACHT",
        quality_title: "Kwaliteit zonder compromis",
        quality_text: "Geen alcohol, wel de beleving. Waterfords brengt de luxe van de cocktailbar naar jouw huis.",
        footer_text: "Premium alcoholvrije cocktails voor de moderne fijnproever.",
        footer_flavors: "COLLECTIE", footer_socials: "VOLG ONS", footer_contact: "CONTACT"
    },
    en: {
        home: "HOME", about: "ABOUT US", flavors: "FLAVORS", where: "SHOP", contact: "CONTACT",
        hero_tag: "WATERFORDS 0.0%", hero_main: "PURE CRAFT",
        quality_title: "Quality without compromise",
        quality_text: "No alcohol, but the full experience. Waterfords brings the luxury of the cocktail bar to your home.",
        footer_text: "Premium non-alcoholic cocktails for the modern connoisseur.",
        footer_flavors: "COLLECTION", footer_socials: "FOLLOW US", footer_contact: "CONTACT"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', './components/header.html');
    loadComponent('footer', './components/footer.html');
    initScrollAnimations();
});

async function loadComponent(id, path) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        updateLanguageUI();
        if(id === 'header') markActiveLang();
    } catch (e) { console.error("Error loading component", e); }
}

function updateLanguageUI() {
    const lang = localStorage.getItem('lang') || 'nl';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
}

function switchLang(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
}

function markActiveLang() {
    const lang = localStorage.getItem('lang') || 'nl';
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if(btn.textContent.toLowerCase() === lang) btn.classList.add('active');
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 800);
}

// Scroll bar
window.onscroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-bar");
    if(bar) bar.style.width = scrolled + "%";
};