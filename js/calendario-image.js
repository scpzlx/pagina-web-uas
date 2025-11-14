const overlay = document.getElementById('overlayCalendario');
const imgCalendario = document.getElementById('calendarioImg');
const imgOverlay = document.getElementById('imgOverlay');
const closeOverlay = document.querySelector('.close-overlay');
const imgContainer = document.querySelector('.img-container');

let scale = 1;
let panning = false;
let pointX = 0;
let pointY = 0;
let start = { x: 0, y: 0 };

// Abrir overlay
imgCalendario.addEventListener('click', function() {
  overlay.classList.add('show');
  imgOverlay.src = this.src;
  scale = 1;
  pointX = 0;
  pointY = 0;
  imgOverlay.style.transform = `scale(${scale})`;
});

// Cerrar con X
closeOverlay.addEventListener('click', function() {
  overlay.classList.remove('show');
});

// Cerrar con click en fondo (solo si no está haciendo zoom)
overlay.addEventListener('click', function(e) {
  if (e.target === overlay && scale === 1) {
    overlay.classList.remove('show');
  }
});

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && overlay.classList.contains('show')) {
    overlay.classList.remove('show');
  }
});

// Zoom con rueda del mouse
imgOverlay.addEventListener('wheel', function(e) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale += delta;
  if (scale < 0.5) scale = 0.5;
  if (scale > 4) scale = 4;
  imgOverlay.style.transform = `scale(${scale}) translate(${pointX}px, ${pointY}px)`;
});

// Pan (arrastrar) cuando hay zoom
imgOverlay.addEventListener('mousedown', function(e) {
  if (scale > 1) {
    e.preventDefault();
    start = { x: e.clientX - pointX, y: e.clientY - pointY };
    panning = true;
  }
});

imgOverlay.addEventListener('mousemove', function(e) {
  if (!panning) return;
  e.preventDefault();
  pointX = e.clientX - start.x;
  pointY = e.clientY - start.y;
  imgOverlay.style.transform = `scale(${scale}) translate(${pointX}px, ${pointY}px)`;
});

imgOverlay.addEventListener('mouseup', function() {
  panning = false;
});

imgOverlay.addEventListener('mouseleave', function() {
  panning = false;
});