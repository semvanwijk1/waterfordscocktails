const translations = {
    nl: {
        home: "HOME", about: "OVER ONS", flavors: "SMAKEN", where: "SHOP", contact: "CONTACT",
        hero_tag: "WATERFORDS 0.0%", 
        hero_main: "ZUIVER AMBACHT",
        hero_slogan: "De toekomst van verfijnde dranken, zonder alcohol.",
        btn_discover: "ONTDEK COLLECTIE",
        section_about_title: "OVER WATERFORDS",
        about_p1: "Ontdek de verfijnde wereld van Waterfords, waar we met trots onze eigen alcoholvrije cans produceren en ontwerpen, voorzien van authentieke smaken. Van de klassieke tonen van Gin & Tonic tot de rijke smaken van Whisky & Cola: ons assortiment biedt een unieke en meeslepende ervaring, volledig vrij van alcohol met een gegarandeerde 0.0%.",
        about_p2: "Bij Waterfords gaat het niet alleen om het proeven van de drankjes, maar om het creëren van een totale beleving. Met meer dan 10 jaar ervaring in de drankenindustrie hebben we unieke smaken ontwikkeld mét karakter, maar zonder de alcohol. Elke slok opent de deur naar een wereld van genot, waar authenticiteit en innovatie samenkomen. Wij geloven in het verrijken van momenten.",
        about_p3: "Geniet van een nieuwe standaard in alcoholvrije verfrissing met Waterfords. Handig voor de horeca, makkelijk voor thuis. Altijd een kant-en-klare alcoholvrije mix binnen handbereik zonder dat je zelf alle ingrediënten hoeft te kopen. Verpakt in een aluminium blikje: een duurzame keuze en eenvoudig te recyclen.",
        where_title: "WERELDWIJD VERKRIJGBAAR",
        where_text: "Onze producten zijn verkrijgbaar in een breed scala aan landen! Kijk hier wat het beste bij u past!",
        footer_text: "De toekomst van verfijnde dranken, zonder alcohol.",
        footer_contact: "CONTACT", footer_socials: "VOLG ONS", footer_flavors: "COLLECTIE"
    },
    en: {
        home: "HOME", about: "ABOUT US", flavors: "FLAVORS", where: "SHOP", contact: "CONTACT",
        hero_tag: "WATERFORDS 0.0%", 
        hero_main: "PURE CRAFT",
        hero_slogan: "The future of refined drinks, without alcohol.",
        btn_discover: "DISCOVER COLLECTION",
        section_about_title: "ABOUT WATERFORDS",
        about_p1: "Discover the refined world of Waterfords, where we proudly produce and design our own alcohol-free cans, boasting authentic flavors. From the classic tones of Gin & Tonic to the rich flavors of Whisky & Cola, our range offers a unique and immersive experience, completely free of alcohol with a guaranteed 0.0%.",
        about_p2: "At Waterfords, it’s not just about tasting the drinks, but creating a total experience. With over 10 years in the beverage industry, we’ve developed unique flavors with taste but without the alcohol. Each sip opens the door to a world of pleasure, where authenticity and innovation converge. We believe in enriching moments.",
        about_p3: "Enjoy a new standard in alcohol-free refreshment with Waterfords. Convenient for hospitality. Easy for home. Always a ready-to-drink alcohol-free mix at your fingertips without having to buy all the ingredients yourself. Packaged in an aluminum can. A sustainable choice and easy to recycle.",
        where_title: "AVAILABLE WORLDWIDE",
        where_text: "Our products can be purchased in a wide variety of countries! Look here what suits you the most!",
        footer_text: "The future of refined drinks, without alcohol.",
        footer_contact: "CONTACT", footer_socials: "FOLLOW US", footer_flavors: "COLLECTION"
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
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
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
    }, 500);
}

window.onscroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-bar");
    if(bar) bar.style.width = scrolled + "%";
};