const btnVision = document.getElementById('btnVision');
const visionHidden = document.getElementById('visionHidden');

btnVision.addEventListener('click', () => {
    if (visionHidden.classList.contains('show')) {
        // Animación de cierre
        visionHidden.style.maxHeight = visionHidden.scrollHeight + 'px';
        setTimeout(() => {
            visionHidden.style.maxHeight = '0';
        }, 10);
        
        setTimeout(() => {
            visionHidden.classList.remove('show');
        }, 500);
        
        btnVision.textContent = 'Continuar leyendo';
    } else {
        // Animación de apertura
        visionHidden.classList.add('show');
        visionHidden.style.maxHeight = '0';
        setTimeout(() => {
            visionHidden.style.maxHeight = visionHidden.scrollHeight + 'px';
        }, 10);
        
        btnVision.textContent = 'Ocultar';
    }
});