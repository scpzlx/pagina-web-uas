// Carrusel de Convocatorias
let currentIndex = 0;
const track = document.getElementById('track');
const cards = document.querySelectorAll('.card');
const totalCards = cards.length;
const arrowLeft = document.querySelector('.arrow.left');
const arrowRight = document.querySelector('.arrow.right');
const viewport = document.querySelector('.viewport');

// Variables para touch/swipe
let startX = 0;
let currentX = 0;
let isDragging = false;
let startTransform = 0;

function updateCarousel() {
  const viewportWidth = viewport.offsetWidth;
  const cardWidth = cards[0].offsetWidth + 20; // width + gap
  const offset = -currentIndex * cardWidth + (viewportWidth - cardWidth) / 2;
  track.style.transform = `translateX(${offset}px)`;

  arrowLeft.disabled = currentIndex === 0;
  arrowRight.disabled = currentIndex === totalCards - 1;
  
  // Estilo visual para botones deshabilitados
  if (currentIndex === 0) {
    arrowLeft.style.opacity = '0.3';
    arrowLeft.style.cursor = 'not-allowed';
  } else {
    arrowLeft.style.opacity = '1';
    arrowLeft.style.cursor = 'pointer';
  }
  
  if (currentIndex === totalCards - 1) {
    arrowRight.style.opacity = '0.3';
    arrowRight.style.cursor = 'not-allowed';
  } else {
    arrowRight.style.opacity = '1';
    arrowRight.style.cursor = 'pointer';
  }
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

// Obtener el valor actual de translateX
function getCurrentTransform() {
  const style = window.getComputedStyle(track);
  const matrix = new DOMMatrix(style.transform);
  return matrix.m41;
}

// Touch Events - Inicio
function handleTouchStart(e) {
  isDragging = true;
  startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
  startTransform = getCurrentTransform();
  track.style.transition = 'none';
  viewport.style.cursor = 'grabbing';
}

// Touch Events - Movimiento
function handleTouchMove(e) {
  if (!isDragging) return;
  
  e.preventDefault();
  currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
  const diff = currentX - startX;
  
  // Aplicar resistencia en los bordes
  let resistance = 1;
  if ((currentIndex === 0 && diff > 0) || 
      (currentIndex === totalCards - 1 && diff < 0)) {
    resistance = 0.3; // Reducir el movimiento en los bordes
  }
  
  track.style.transform = `translateX(${startTransform + (diff * resistance)}px)`;
}

// Touch Events - Fin
function handleTouchEnd(e) {
  if (!isDragging) return;
  
  isDragging = false;
  viewport.style.cursor = 'grab';
  
  const diff = currentX - startX;
  const threshold = 50; // Umbral mínimo para cambiar de slide
  
  // Restaurar transición suave
  track.style.transition = 'transform 0.4s ease';
  
  if (Math.abs(diff) > threshold) {
    // Deslizamiento significativo
    if (diff > 0 && currentIndex > 0) {
      // Deslizar a la derecha - ir al anterior
      moveCarousel(-1);
    } else if (diff < 0 && currentIndex < totalCards - 1) {
      // Deslizar a la izquierda - ir al siguiente
      moveCarousel(1);
    } else {
      // En los bordes, volver a la posición actual
      updateCarousel();
    }
  } else {
    // Deslizamiento muy corto, volver a la posición actual
    updateCarousel();
  }
  
  // Reset de variables
  startX = 0;
  currentX = 0;
}

// Event Listeners - Touch
viewport.addEventListener('touchstart', handleTouchStart, { passive: false });
viewport.addEventListener('touchmove', handleTouchMove, { passive: false });
viewport.addEventListener('touchend', handleTouchEnd);
viewport.addEventListener('touchcancel', handleTouchEnd);

// Event Listeners - Mouse (para desktop)
viewport.addEventListener('mousedown', handleTouchStart);
viewport.addEventListener('mousemove', handleTouchMove);
viewport.addEventListener('mouseup', handleTouchEnd);
viewport.addEventListener('mouseleave', () => {
  if (isDragging) {
    handleTouchEnd();
  }
});

// Prevenir comportamiento por defecto de arrastre de imágenes
viewport.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Ajustar en resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    track.style.transition = 'none';
    updateCarousel();
    setTimeout(() => {
      track.style.transition = 'transform 0.4s ease';
    }, 50);
  }, 250);
});

// Inicializar
updateCarousel();
track.style.transition = 'transform 0.4s ease';
viewport.style.cursor = 'grab';

// SISTEMA DE NOTICIAS - INTEGRACIÓN API

const API_URL = '/api';

function formatDateSimple(dateString) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

async function loadLatestNews() {
    console.log('Cargando últimas 3 noticias...');
    
    const container = document.getElementById('latest-news-container');
    
    if (!container) {
        console.log('Contenedor de noticias no encontrado en esta página');
        return;
    }
    
    container.innerHTML = '<div style="text-align: center; padding: 40px; color: white;"><p>Cargando noticias...</p></div>';
    
    try {
        const response = await fetch(API_URL + '/get-all-news.php');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al cargar noticias');
        }
        
        const allNews = result.data;
        const latestNews = allNews.slice(0, 3);
        
        if (latestNews.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: white;"><p>No hay noticias disponibles</p></div>';
            return;
        }
        
        let html = '';
        latestNews.forEach(function(news) {
            html += '<div class="news-card-home">';
            html += '  <img src="' + news.thumbnailImage + '" alt="' + news.title + '" loading="lazy">';
            html += '  <div class="news-card-content">';
            html += '    <div class="news-card-header">' + news.categoryLabel + '</div>';
            html += '    <div class="news-card-body">';
            html += '      <div class="news-card-title">' + truncateText(news.title, 100) + '</div>';
            html += '      <div class="news-card-text">' + truncateText(news.shortDescription, 180) + '</div>';
            html += '      <a href="noticia-detalle.html?id=' + news.id + '" class="news-card-link">Leer nota completa</a>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: white;"><p>Error al cargar las noticias</p></div>';
    }
}

// Llamar a la función cuando se carga la página
if (document.getElementById('latest-news-container')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadLatestNews);
    } else {
        loadLatestNews();
    }
}