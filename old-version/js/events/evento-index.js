// SISTEMA DE EVENTOS - INTEGRACIÓN API

const EVENTS_API_URL = '/api/events';

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

async function loadLatestEvents() {
    console.log('Cargando últimos 3 eventos...');
    
    const container = document.getElementById('latest-events-container');
    
    if (!container) {
        console.log('Contenedor de eventos no encontrado en esta página');
        return;
    }
    
    container.innerHTML = '<div style="text-align: center; padding: 40px; color: white;"><p>Cargando eventos...</p></div>';
    
    try {
        const response = await fetch(EVENTS_API_URL + '/get-all-events.php');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al cargar eventos');
        }
        
        const allEvents = result.data;
        const latestEvents = allEvents.slice(0, 3);
        
        if (latestEvents.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: black;"><p>No hay eventos disponibles</p></div>';
            return;
        }
        
        let html = '';
        latestEvents.forEach(function(events) {
            html += '<div class="events-card-home">';
            html += '  <img src="' + events.thumbnailImage + '" alt="' + events.title + '" loading="lazy">';
            html += '  <div class="events-card-content">';
            html += '    <div class="events-card-header">' + events.categoryLabel + '</div>';
            html += '    <div class="events-card-body">';
            html += '      <div class="events-card-title">' + truncateText(events.title, 100) + '</div>';
            html += '      <div class="events-card-text">' + truncateText(events.shortDescription, 180) + '</div>';
            html += '      <a href="evento-detalle.html?id=' + events.id + '" class="events-card-link">Leer nota completa</a>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: black;"><p>Error al cargar los Eventos</p></div>';
    }
}

// Llamar a la función cuando se carga la página
if (document.getElementById('latest-events-container')) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadLatestEvents);
    } else {
        loadLatestEvents();
    }
}