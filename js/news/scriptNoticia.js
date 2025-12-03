// scriptNoticia.js - Lista completa de noticias con filtros
// Conectado a MySQL via API

const API_URL = '/api/news';

let allNewsData = [];
let currentFilters = {
    month: '',
    year: '',
    category: ''
};

// Función para formatear fecha
function formatDate(dateString) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
}

// Función para crear tarjeta de noticia
function createNewsCard(news) {
    return '<article class="news-card" data-id="' + news.id + '">' +
        '<div class="news-image">' +
            '<img src="' + news.thumbnailImage + '" alt="' + news.title + '">' +
            '<div class="news-category">' + news.categoryLabel + '</div>' +
        '</div>' +
        '<div class="news-content">' +
            '<div>' +
                '<div class="news-date">' + formatDate(news.date) + '</div>' +
                '<h2 class="news-title">' +
                    '<a href="noticia-detalle.html?id=' + news.id + '">' + news.title + '</a>' +
                '</h2>' +
                '<p class="news-description">' + news.shortDescription + '</p>' +
            '</div>' +
            '<div class="news-button">' +
                '<button class="btn-read-more" onclick="window.location.href=\'noticia-detalle.html?id=' + news.id + '\'">LEER NOTICIA</button>' +
            '</div>' +
        '</div>' +
    '</article>';
}

// Función para filtrar noticias
function filterNews() {
    const month = currentFilters.month;
    const year = currentFilters.year;
    const category = currentFilters.category;
    
    let filtered = allNewsData;
    
    if (month) {
        filtered = filtered.filter(function(news) {
            const newsDate = new Date(news.date + 'T00:00:00');
            return (newsDate.getMonth() + 1) === parseInt(month);
        });
    }
    
    if (year) {
        filtered = filtered.filter(function(news) {
            const newsDate = new Date(news.date + 'T00:00:00');
            return newsDate.getFullYear() === parseInt(year);
        });
    }
    
    if (category) {
        filtered = filtered.filter(function(news) {
            return news.category === category;
        });
    }
    
    return filtered;
}

// Función para renderizar noticias
function renderNews() {
    const container = document.getElementById('news-container');
    const noResults = document.getElementById('no-results');
    const filtered = filterNews();
    
    if (filtered.length === 0) {
        container.innerHTML = '';
        if (noResults) {
            noResults.style.display = 'block';
        }
    } else {
        if (noResults) {
            noResults.style.display = 'none';
        }
        const html = filtered.map(function(news) {
            return createNewsCard(news);
        }).join('');
        container.innerHTML = html;
    }
}

// Función para mostrar loading
function showLoading() {
    const container = document.getElementById('news-container');
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 60px;"><p style="font-size: 18px; color: #666;">Cargando noticias...</p></div>';
    }
}

// Función para mostrar error
function showError(message) {
    const container = document.getElementById('news-container');
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc3545;"><i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px; display: block;"></i><p style="font-size: 16px;">' + message + '</p></div>';
    }
}

// Cargar noticias desde la base de datos
async function loadNewsFromDatabase() {
    console.log('Cargando noticias desde MySQL...');
    showLoading();
    
    try {
        const response = await fetch(API_URL + '/get-all-news.php');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al cargar noticias');
        }
        
        allNewsData = result.data;
        console.log('Noticias cargadas:', allNewsData.length);
        renderNews();
        
    } catch (error) {
        console.error('Error al cargar noticias:', error);
        showError('Error al cargar las noticias. Por favor, intenta más tarde.');
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadNewsFromDatabase();
    
    const monthFilter = document.getElementById('filter-month');
    const yearFilter = document.getElementById('filter-year');
    const categoryFilter = document.getElementById('filter-category');
    
    if (monthFilter) {
        currentFilters.month = monthFilter.value;
        monthFilter.addEventListener('change', function() {
            currentFilters.month = this.value;
            renderNews();
        });
    }
    
    if (yearFilter) {
        currentFilters.year = yearFilter.value;
        yearFilter.addEventListener('change', function() {
            currentFilters.year = this.value;
            renderNews();
        });
    }
    
    if (categoryFilter) {
        currentFilters.category = categoryFilter.value;
        categoryFilter.addEventListener('change', function() {
            currentFilters.category = this.value;
            renderNews();
        });
    }
});