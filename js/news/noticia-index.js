
// SISTEMA DE NOTICIAS - INTEGRACIÓN API

const API_URL = '/api/news';

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