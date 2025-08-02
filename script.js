document.addEventListener('DOMContentLoaded', () => {

    // --- On-Scroll Reveal Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Re-usable observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the element is in view, add the 'in-view' class
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1 // Animation triggers when 10% of the element is visible
    });

    // Observe each element with the animation class
    animatedElements.forEach(el => observer.observe(el));

});