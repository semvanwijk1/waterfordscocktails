const translations = {
    nl: {
        home: "HOME", about: "OVER ONS", flavors: "SMAKEN", where: "SHOP", contact: "CONTACT",
        hero_tag: "WATERFORDS 0.0%",
        hero_main: "ZUIVER AMBACHT",
        btn_discover: "ONTDEK DE SMAKEN",
        quality_title: "Kwaliteit zonder compromis",
        quality_text: "Geen alcohol, wel de beleving. Waterfords brengt de luxe van de cocktailbar naar jouw huis.",
        footer_contact: "CONTACT",
        footer_socials: "SOCIALS",
        footer_flavors: "SMAKEN",
        footer_text: "Ambachtelijke 0.0% cocktails uit Den Haag."
    },
    en: {
        home: "HOME", about: "ABOUT US", flavors: "FLAVORS", where: "SHOP", contact: "CONTACT",
        hero_tag: "WATERFORDS 0.0%",
        hero_main: "PURE CRAFT",
        btn_discover: "DISCOVER FLAVORS",
        quality_title: "Quality without compromise",
        quality_text: "No alcohol, but the full experience. Waterfords brings the luxury of the cocktail bar to your home.",
        footer_contact: "CONTACT",
        footer_socials: "SOCIALS",
        footer_flavors: "FLAVORS",
        footer_text: "Handcrafted 0.0% cocktails from The Hague."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', './components/header.html');
    loadComponent('footer', './components/footer.html');
    initAnimations();
});

async function loadComponent(id, path) {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    updateLanguageUI();
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

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
}