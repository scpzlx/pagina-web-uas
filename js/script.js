let currentIndex = 0;
const track = document.getElementById('track');
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;
const arrowLeft = document.querySelector('.arrow.left');
const arrowRight = document.querySelector('.arrow.right');

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 20; // width + gap
  const offset = -currentIndex * cardWidth;
  track.style.transform = `translateX(${offset}px)`;
  
  // Actualizar estado de las flechas
  arrowLeft.disabled = currentIndex === 0;
  arrowRight.disabled = currentIndex === totalCards - 1;
}

function moveCarousel(direction) {
  currentIndex += direction;
  
  // Limitar el índice
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex >= totalCards) {
    currentIndex = totalCards - 1;
  }
  
  updateCarousel();
}

// Inicializar
updateCarousel();

// Ajustar en resize
window.addEventListener('resize', () => {
  updateCarousel();
});