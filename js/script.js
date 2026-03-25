document.addEventListener('DOMContentLoaded', () => {
    // Gebruik relatieve paden zonder de eerste slash
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
    
    initRevealAnimations();
});

async function loadComponent(id, path) {
    try {
        // We voegen ./ toe om te zorgen dat hij in de huidige map zoekt
        const response = await fetch('./' + path);
        if (!response.ok) throw new Error('Fout bij laden van ' + path);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        
        if (id === 'header') {
            setupMobileMenu();
            // Update de taal na het laden van de header
            if(typeof updateLanguageUI === "function") updateLanguageUI();
        }
    } catch (err) {
        console.error('Component error:', err);
    }
}

function initRevealAnimations() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Wacht 500ms zodat de onderdelen (header/footer) ook de tijd hebben om te laden
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
}

function setupMobileMenu() {
    const burger = document.getElementById('nav-toggle');
    const nav = document.querySelector('.nav-links');
    if(burger) {
        burger.onclick = () => nav.classList.toggle('active');
    }
}

// Scroll Progress Bar & Header Shrink
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    
    const bar = document.getElementById("scroll-bar");
    if(bar) bar.style.width = scrolled + "%";
    
    const header = document.querySelector('header');
    if(header) {
        if(winScroll > 50) {
            header.style.padding = "10px 0";
            header.style.background = "rgba(0, 10, 18, 0.95)";
        } else {
            header.style.padding = "20px 0";
            header.style.background = "rgba(0, 10, 18, 0.8)";
        }
    }
};