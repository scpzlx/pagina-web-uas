const btnObjetivos = document.getElementById('btnObjetivos');

btnObjetivos.addEventListener('click', () => {
    const hiddenItems = document.querySelectorAll('.objetivos-hidden');
    const isShowing = hiddenItems[0].classList.contains('show');
    
    if (isShowing) {
        // Cerrar todos los elementos
        hiddenItems.forEach(item => {
            item.style.maxHeight = item.scrollHeight + 'px';
            setTimeout(() => {
                item.style.maxHeight = '0';
                item.style.marginBottom = '0';
            }, 10);
            
            setTimeout(() => {
                item.classList.remove('show');
            }, 500);
        });
        
        btnObjetivos.textContent = 'Continuar leyendo';
    } else {
        // Abrir todos los elementos
        hiddenItems.forEach((item, index) => {
            item.classList.add('show');
            item.style.maxHeight = '0';
            item.style.marginBottom = '0';
            
            setTimeout(() => {
                item.style.maxHeight = item.scrollHeight + 'px';
                item.style.marginBottom = '15px';
            }, 10 + (index * 50)); // Animación escalonada
        });
        
        btnObjetivos.textContent = 'Ocultar';
    }
});