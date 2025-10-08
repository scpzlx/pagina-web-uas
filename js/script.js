document.addEventListener('DOMContentLoaded', () => {
  const leftBtn = document.querySelector('.arrow.left');
  const rightBtn = document.querySelector('.arrow.right');
  const viewport = document.querySelector('.viewport');
  const track = document.querySelector('.track');
  const cards = Array.from(track.querySelectorAll('.card'));

  if (!track || cards.length === 0) return;

  let isAnimating = false;
  let centerIndex = 1;

  function getSizes() {
    const cardRect = cards[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(track).gap) || 40;
    return {
      cardWidth: cardRect.width,
      gap,
      viewportWidth: viewport.getBoundingClientRect().width,
      fullStep: cardRect.width + gap
    };
  }

  function updatePosition(animate = true) {
    const { cardWidth, gap, viewportWidth, fullStep } = getSizes();
    
    // Calculamos el offset para que la tarjeta centerIndex quede en el centro del viewport
    const centerOffset = (viewportWidth - cardWidth) / 2;
    const offset = centerIndex * fullStep;
    const translateX = centerOffset - offset;
    
    if (!animate) {
      track.style.transition = 'none';
    }
    
    requestAnimationFrame(() => {
      track.style.transform = `translateX(${translateX}px)`;
      
      if (!animate) {
        // Forzar reflow y restaurar la transición
        void track.offsetWidth;
        track.style.transition = '';
      }
    });
  }

  // Evento de fin de transición para desbloquear
  track.addEventListener('transitionend', () => {
    isAnimating = false;
  });

  // Botón derecho: mover siguiente tarjeta al centro
  rightBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    
    // Avanzar al siguiente
    centerIndex = (centerIndex + 1) % cards.length;
    updatePosition(true);
  });

  // Botón izquierdo: mover tarjeta anterior al centro
  leftBtn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    
    // Retroceder al anterior
    centerIndex = (centerIndex - 1 + cards.length) % cards.length;
    updatePosition(true);
  });

  // Resize: recalcula posiciones sin animación
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updatePosition(false);
    }, 100);
  });

  // Inicializar - comenzar con la segunda tarjeta (Business loan) en el centro
  updatePosition(false);
});