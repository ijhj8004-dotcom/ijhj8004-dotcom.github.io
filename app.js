document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor Logic ---
    // Only run if not on mobile (simple width check)
    if (window.innerWidth > 768) {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        const hoverElements = document.querySelectorAll('a, button, .menu-card, .glitch-hover');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Add hover effects for interactive elements
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover-active');
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on load

    // --- Vanilla Tilt Initialization ---
    // Ensure the library is loaded via CDN in HTML
    if(typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
    }

    // --- Glitch Text Randomizer (Optional extra flair) ---
    const glitchTexts = document.querySelectorAll('.glitch-hover');
    glitchTexts.forEach(text => {
        text.addEventListener('mouseover', () => {
            // Add sound effect here if needed (omitted for browser policy compliance)
        });
    });

    // Mobile Menu basic toggle (placeholder logic)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // For a real app, toggle a mobile menu class
            alert('Menú móvil (Implementación pendiente)');
        });
    }
});
