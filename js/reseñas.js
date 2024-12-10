document.addEventListener("DOMContentLoaded", function() {
    const testimonios = document.querySelectorAll('.testimonial');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    testimonios.forEach(testimonial => {
        observer.observe(testimonial);
    });
});