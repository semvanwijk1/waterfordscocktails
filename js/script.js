// Scroll Progress Bar Logic
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-bar");
    if(bar) bar.style.width = scrolled + "%";
    
    // Header shrinking effect
    const header = document.querySelector('header');
    if(winScroll > 50) {
        header.style.padding = "10px 0";
        header.style.background = "rgba(0, 10, 18, 0.95)";
    } else {
        header.style.padding = "20px 0";
        header.style.background = "rgba(0, 10, 18, 0.8)";
    }
};

// Magnetic effect voor de Back-to-top knop (Subtiel)
document.addEventListener('mousemove', (e) => {
    const btn = document.querySelector('.back-to-top');
    if(!btn) return;
    
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    if(Math.abs(x) < 50 && Math.abs(y) < 50) {
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    } else {
        btn.style.transform = `translate(0,0)`;
    }
});