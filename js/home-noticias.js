// home-noticias.js
// Script para cargar las últimas 3 noticias en la página principal

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

function loadLatestNews() {
    console.log('Cargando noticias...');
    
    const container = document.getElementById('latest-news-container');
    
    if (!container) {
        console.error('No se encontró el contenedor latest-news-container');
        return;
    }
    
    // Obtener noticias de localStorage
    const newsJSON = localStorage.getItem('newsDatabase');
    let allNews = [];
    
    if (newsJSON) {
        allNews = JSON.parse(newsJSON);
        console.log('Noticias encontradas en localStorage:', allNews.length);
    }
    
    // Si no hay noticias en localStorage, usar noticias por defecto
    if (allNews.length === 0) {
        console.log('Usando noticias por defecto...');
        allNews = [
            {
                id: 1,
                title: "Recibe el H. Consejo Universitario los resultados de la Consulta sobre el futuro de la Reingeniería Integral",
                shortDescription: "Con 13 mil 620 votos a favor de la Reingeniería que representan el 90 por ciento sobre los votos validados, el H. Consejo Universitario recibió los resultados...",
                date: "2025-10-09",
                categoryLabel: "UNIVERSIDAD",
                thumbnailImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
            },
            {
                id: 2,
                title: "Emite el Rector Jesús Madueña su voto en la Consulta sobre la Reingeniería Integral Universitaria",
                shortDescription: "El Rector de la Universidad Autónoma de Sinaloa (UAS), doctor Jesús Madueña Molina, expresó su confianza de que la comunidad universitaria vote por la Reingeniería Integral...",
                date: "2025-10-09",
                categoryLabel: "UNIVERSIDAD",
                thumbnailImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop"
            },
            {
                id: 3,
                title: "Con una amplia tendencia al sí, culmina la Consulta para definir el futuro de la Reingeniería Integral Universitaria",
                shortDescription: "Con una participación de más del 80 por ciento de los más de 20 mil trabajadores activos y jubilados, la Universidad Autónoma de Sinaloa (UAS) culminó el proceso de consulta...",
                date: "2025-10-09",
                categoryLabel: "UNIVERSIDAD",
                thumbnailImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop"
            }
        ];
    }
    
    // Ordenar por fecha más reciente
    allNews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Tomar solo las 3 más recientes
    const latestNews = allNews.slice(0, 3);
    console.log('Mostrando', latestNews.length, 'noticias');
    
    // Generar HTML
    let html = '';
    latestNews.forEach(function(news) {
        html += '<div class="news-card-home">';
        html += '  <img src="' + news.thumbnailImage + '" alt="' + news.title + '" loading="lazy">';
        html += '  <div class="news-card-content">';
        html += '    <div class="news-card-header">' + news.categoryLabel + '</div>';
        html += '    <div class="news-card-body">';
        html += '      <div class="news-card-title">' + news.title + '</div>';
        html += '      <div class="news-card-text">' + truncateText(news.shortDescription, 180) + '</div>';
        html += '      <a href="noticia-detalle.html?id=' + news.id + '" class="news-card-link">Leer nota completa</a>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    });
    
    container.innerHTML = html;
    console.log('Noticias cargadas exitosamente');
}

// Cargar noticias cuando se carga la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLatestNews);
} else {
    loadLatestNews();
}