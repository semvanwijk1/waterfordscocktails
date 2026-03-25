const translations = {
    nl: {
        home: "HOME", about: "OVER ONS", flavors: "SMAKEN", where: "SHOP", contact: "CONTACT",
        cookie_text: "Wij gebruiken cookies om uw ervaring te verbeteren.",
        hero_title: "PURE CRAFT"
    },
    en: {
        home: "HOME", about: "ABOUT US", flavors: "FLAVORS", where: "SHOP", contact: "CONTACT",
        cookie_text: "We use cookies to improve your experience.",
        hero_title: "PURE CRAFT"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    initAnimations();
});

async function loadComponent(id, path) {
    try {
        const response = await fetch('./' + path);
        if (!response.ok) throw new Error('Fout bij laden');
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        if (id === 'header') {
            setupNav();
            updateLanguageUI();
        }
    } catch (err) {
        console.error(err);
    }
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
    }, 600);
}

function setupNav() {
    const burger = document.getElementById('nav-toggle');
    const nav = document.querySelector('.nav-links');
    if(burger) {
        burger.onclick = () => nav.classList.toggle('active');
    }
}

function acceptCookies() {
    document.getElementById('cookie-alert').style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
}

window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-bar");
    if(bar) bar.style.width = scrolled + "%";
};