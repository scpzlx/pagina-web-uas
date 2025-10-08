// Modal del calendario
const modal = document.getElementById('modalCalendario');
const imgCalendario = document.getElementById('calendarioImg');
const modalImg = document.getElementById('imgModal');
const closeModal = document.querySelector('.close-modal');

// Abrir modal al hacer click en la imagen del calendario
imgCalendario.addEventListener('click', function() {
  modal.style.display = 'block';
  modalImg.src = this.src;
});

// Cerrar modal al hacer click en la X
closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Cerrar modal al hacer click fuera de la imagen
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
  }
});