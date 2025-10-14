// Funcion para expandir y contraer las funciones de cada departamento
function toggleFunciones(button) {
    const content = button.nextElementSibling;
    const allButtons = document.querySelectorAll('.funciones-toogle');
    const allContents = document.querySelectorAll('.funciones-content');

    // Cerrar todos los demas acordeones
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.classList.remove('active');
        }
    });

    allContents.forEach(cnt => {
        if (cnt !== content) {
            cnt.classList.remove('active');
        }
    });

    // Toggle el acordeon actual
    button.classList.toggle('active');
    content.classList.toggle('active');

    // Animacion de entrada para las tarjetas al hacer scroll
    document.addEventListener('DOMContentLoaded', function(){
        const cards = document.querySelectorAll('.departamento-card');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)'

                    setTimeout(() => {
                       entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                       entry.target.style.opacity = '1';
                       entry.target.style.transform = 'translateY(0)'; 
                    }, 100);

                    observer.unobserve(entry.target);
                } 
            });
        }, observerOptions);

        cards.forEach(card => {
            observer.observe(card);
        });
    });

    // Cerrar acordeon al hacer clic fuera
    document.addEventListener('cick', function(event) {
        const isToggleButton = event.target.classList.contains('funciones-toggle');
        const isInsideContent = event.target.closet('.funciones-content');

        if (!isToggleButton && !isInsideContent) {
            const allButtons = document.querySelectorAll('.funciones-toggle');
            const allContents = document.querySelectorAll('.funciones-content');

            allButtons.forEach(btn => btn.classList.remove('active'));
            allContents.forEach(cnt => cnt.classList.remove('active'));
        }
    });
}