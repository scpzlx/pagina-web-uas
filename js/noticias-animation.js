const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
}; 

const oberver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => oberver.observe(el));