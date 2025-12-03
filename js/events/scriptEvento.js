// scriptEvento.js - Lista completa de eventos con filtros
// Conectado a MySQL via API

const API_URL = '/api/events';

let allEventsData = [];
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

// Función para crear tarjeta de evento
function createEventsCard(events) {
    return '<article class="events-card" data-id="' + events.id + '">' +
        '<div class="events-image">' +
            '<img src="' + events.thumbnailImage + '" alt="' + events.title + '">' +
            '<div class="events-category">' + events.categoryLabel + '</div>' +
        '</div>' +
        '<div class="events-content">' +
            '<div>' +
                '<div class="events-date">' + formatDate(events.date) + '</div>' +
                '<h2 class="events-title">' +
                    '<a href="evento-detalle.html?id=' + events.id + '">' + events.title + '</a>' +
                '</h2>' +
                '<p class="events-description">' + events.shortDescription + '</p>' +
            '</div>' +
            '<div class="events-button">' +
                '<button class="btn-read-more" onclick="window.location.href=\'evento-detalle.html?id=' + events.id + '\'">LEER EVENTO</button>' +
            '</div>' +
        '</div>' +
    '</article>';
}

// Función para filtrar eventos
function filterEvents() {
    const month = currentFilters.month;
    const year = currentFilters.year;
    const category = currentFilters.category;
    
    let filtered = allEventsData;
    
    if (month) {
        filtered = filtered.filter(function(events) {
            const eventsDate = new Date(events.date + 'T00:00:00');
            return (eventsDate.getMonth() + 1) === parseInt(month);
        });
    }
    
    if (year) {
        filtered = filtered.filter(function(events) {
            const eventsDate = new Date(events.date + 'T00:00:00');
            return eventsDate.getFullYear() === parseInt(year);
        });
    }
    
    if (category) {
        filtered = filtered.filter(function(events) {
            return events.category === category;
        });
    }
    
    return filtered;
}

// Función para renderizar eventos
function renderEvents() {
    const container = document.getElementById('events-container');
    const noResults = document.getElementById('no-results');
    const filtered = filterEvents();
    
    if (filtered.length === 0) {
        container.innerHTML = '';
        if (noResults) {
            noResults.style.display = 'block';
        }
    } else {
        if (noResults) {
            noResults.style.display = 'none';
        }
        const html = filtered.map(function(events) {
            return createEventsCard(events);
        }).join('');
        container.innerHTML = html;
    }
}

// Función para mostrar loading
function showLoading() {
    const container = document.getElementById('events-container');
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 60px;"><p style="font-size: 18px; color: #666;">Cargando eventos...</p></div>';
    }
}

// Función para mostrar error
function showError(message) {
    const container = document.getElementById('events-container');
    if (container) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc3545;"><i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px; display: block;"></i><p style="font-size: 16px;">' + message + '</p></div>';
    }
}

// Cargar eventos desde la base de datos
async function loadEventsFromDatabase() {
    console.log('Cargando eventos desde MySQL...');
    showLoading();
    
    try {
        const response = await fetch(API_URL + '/get-all-events.php');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al cargar eventos');
        }
        
        allEventsData = result.data;
        console.log('Eventos cargadas:', allEventsData.length);
        renderEvents();
        
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        showError('Error al cargar los eventos. Por favor, intenta más tarde.');
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadEventsFromDatabase();
    
    const monthFilter = document.getElementById('filter-month');
    const yearFilter = document.getElementById('filter-year');
    const categoryFilter = document.getElementById('filter-category');
    
    if (monthFilter) {
        currentFilters.month = monthFilter.value;
        monthFilter.addEventListener('change', function() {
            currentFilters.month = this.value;
            renderEvents();
        });
    }
    
    if (yearFilter) {
        currentFilters.year = yearFilter.value;
        yearFilter.addEventListener('change', function() {
            currentFilters.year = this.value;
            renderEvents();
        });
    }
    
    if (categoryFilter) {
        currentFilters.category = categoryFilter.value;
        categoryFilter.addEventListener('change', function() {
            currentFilters.category = this.value;
            renderEvents();
        });
    }
});