const btnPresentacion = document.getElementById('btnPresentacion')
const presentacionHidden = document.getElementById('presentacionHidden')

btnPresentacion.addEventListener('click', () => {
    if (presentacionHidden.classList.contains('show')) {
        // Animación de cierre
        presentacionHidden.style.maxHeight = presentacionHidden.scrollHeight + 'px';
        setTimeout(() => {
            presentacionHidden.style.maxHeight = '0';
        }, 10);
        
        setTimeout(() => {
            presentacionHidden.classList.remove('show');
        }, 500);
        
        btnPresentacion.textContent = 'Continuar leyendo';
    } else {
        // Animación de apertura
        presentacionHidden.classList.add('show');
        presentacionHidden.style.maxHeight = '0';
        setTimeout(() => {
            presentacionHidden.style.maxHeight = presentacionHidden.scrollHeight + 'px';
        }, 10);
        
        btnPresentacion.textContent = 'Ocultar';
    }
});