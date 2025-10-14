// Base de datos de noticias (en el futuro esto vendrá de una API/Backend)
// IMPORTANTE: Mantener sincronizado con script-detalle.js
const newsDatabase = [
    {
        id: 1,
        title: "La UAS es primer lugar entre las universidades públicas estatales del país y tercer lugar general por cuarto año consecutivo, de acuerdo con el Ranking Mundial de Universidades de Times Higher Education",
        description: "Por sus indicadores de excelencia, la Universidad Autónoma de Sinaloa (UAS) se ubica en el primer lugar entre las universidades públicas estatales del país y por cuarto año consecutivo se mantiene en el tercer lugar entre las instituciones mexicanas, tanto públicas ...",
        date: "2025-10-09",
        category: "actividades-generales",
        categoryLabel: "ACTIVIDADES GENERALES",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
        link: "noticia-detalle.html?id=1"
    },
    {
        id: 2,
        title: "Es necesario centrarse en el bienestar emocional y cognitivo tanto de los pacientes de cáncer de mama como de sus acompañantes para rescatar la resiliencia, la salud y el amor propio",
        description: "Contar con redes de apoyo y resiliencia es de gran importancia cuando las personas reciben un diagnóstico de cáncer de mama, pero estos individuos deben estar preparados y conocer que pueden acercarse con personas indicadas que les ayuden a recover todo ...",
        date: "2025-10-09",
        category: "actividades-generales",
        categoryLabel: "ACTIVIDADES GENERALES",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
        link: "noticia-detalle.html?id=2"
    },
    {
        id: 3,
        title: "Comprometida socialmente, la UAS llevará a cabo consultas oftalmológicas gratuitas en el CIDOCS, en el marco del Día Mundial de la Visión",
        description: "La Universidad Autónoma de Sinaloa (UAS), en su compromiso permanente de servir a la sociedad, estará llevando a cabo más de 100 consultas oftalmológicas gratuitas este viernes 10 de octubre conmemorando el Día Mundial de la Visión, por lo que se ...",
        date: "2025-10-09",
        category: "actividades-generales",
        categoryLabel: "ACTIVIDADES GENERALES",
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&h=400&fit=crop",
        link: "noticia-detalle.html?id=3"
    },
    {
        id: 4,
        title: "La UAS, a través de la Licenciatura en Gestión Turística, participa en el Tianguis Turístico 2025",
        description: "La Universidad Autónoma de Sinaloa (UAS), a través de la Licenciatura en Gestión Turística de la Facultad de Ciencias Económicas y Sociales, participa en el Tianguis Turístico 2025 que se lleva a cabo en Acapulco...",
        date: "2025-10-09",
        category: "actividades-generales",
        categoryLabel: "ACTIVIDADES GENERALES",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop",
        link: "noticia-detalle.html?id=4"
    },
    {
        id: 5,
        title: "Investigadores de la UAS presentan avances en biotecnología marina",
        description: "El equipo de investigación de la Facultad de Ciencias del Mar ha logrado importantes avances en el desarrollo de nuevas técnicas de cultivo sustentable de especies marinas, lo que representa un gran avance para la industria acuícola de la región...",
        date: "2025-09-28",
        category: "investigacion",
        categoryLabel: "INVESTIGACIÓN",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
        link: "noticia-detalle.html?id=5"
    },
    {
        id: 6,
        title: "UAS inaugura nuevo laboratorio de inteligencia artificial",
        description: "Con tecnología de punta y equipamiento de última generación, la universidad abre sus puertas a un espacio dedicado al desarrollo de proyectos de IA que beneficiarán tanto a la comunidad estudiantil como al sector empresarial...",
        date: "2025-08-15",
        category: "academico",
        categoryLabel: "ACADÉMICO",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
        link: "noticia-detalle.html?id=6"
    }
];

// Variables globales
let currentFilters = {
    month: '',
    year: '',
    category: ''
};

// Función para formatear la fecha en español
function formatDate(dateString) {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}

// Función para crear el HTML de una tarjeta de noticia
function createNewsCard(news) {
    return `
        <article class="news-card" data-id="${news.id}">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
                <div class="news-category">${news.categoryLabel}</div>
            </div>
            <div class="news-content">
                <div>
                    <div class="news-date">${formatDate(news.date)}</div>
                    <h2 class="news-title">
                        <a href="${news.link}">${news.title}</a>
                    </h2>
                    <p class="news-description">${news.description}</p>
                </div>
                <div class="news-button">
                    <button class="btn-read-more" onclick="window.location.href='${news.link}'">
                        LEER NOTICIA
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Función para filtrar noticias
function filterNews() {
    const month = currentFilters.month;
    const year = currentFilters.year;
    const category = currentFilters.category;
    
    let filteredNews = newsDatabase;
    
    // Filtrar por mes
    if (month) {
        filteredNews = filteredNews.filter(news => {
            const newsDate = new Date(news.date + 'T00:00:00');
            return (newsDate.getMonth() + 1) === parseInt(month);
        });
    }
    
    // Filtrar por año
    if (year) {
        filteredNews = filteredNews.filter(news => {
            const newsDate = new Date(news.date + 'T00:00:00');
            return newsDate.getFullYear() === parseInt(year);
        });
    }
    
    // Filtrar por categoría
    if (category) {
        filteredNews = filteredNews.filter(news => news.category === category);
    }
    
    return filteredNews;
}

// Función para renderizar las noticias
function renderNews() {
    const newsContainer = document.getElementById('news-container');
    const noResults = document.getElementById('no-results');
    const filteredNews = filterNews();
    
    if (filteredNews.length === 0) {
        newsContainer.innerHTML = '';
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        const newsHTML = filteredNews.map(news => createNewsCard(news)).join('');
        newsContainer.innerHTML = newsHTML;
    }
}

// Event listeners para los filtros
document.addEventListener('DOMContentLoaded', function() {
    const monthFilter = document.getElementById('filter-month');
    const yearFilter = document.getElementById('filter-year');
    const categoryFilter = document.getElementById('filter-category');
    
    // Establecer filtros iniciales
    currentFilters.month = monthFilter.value;
    currentFilters.year = yearFilter.value;
    currentFilters.category = categoryFilter.value;
    
    // Renderizar noticias iniciales
    renderNews();
    
    // Agregar event listeners
    monthFilter.addEventListener('change', function() {
        currentFilters.month = this.value;
        renderNews();
    });
    
    yearFilter.addEventListener('change', function() {
        currentFilters.year = this.value;
        renderNews();
    });
    
    categoryFilter.addEventListener('change', function() {
        currentFilters.category = this.value;
        renderNews();
    });
});

// Función auxiliar para agregar noticias (útil para el futuro panel de administración)
function addNews(newsData) {
    newsData.id = newsDatabase.length + 1;
    newsDatabase.push(newsData);
    renderNews();
}

// Función auxiliar para eliminar noticias (útil para el futuro panel de administración)
function deleteNews(newsId) {
    const index = newsDatabase.findIndex(news => news.id === newsId);
    if (index !== -1) {
        newsDatabase.splice(index, 1);
        renderNews();
    }
}

// Función auxiliar para editar noticias (útil para el futuro panel de administración)
function editNews(newsId, updatedData) {
    const index = newsDatabase.findIndex(news => news.id === newsId);
    if (index !== -1) {
        newsDatabase[index] = { ...newsDatabase[index], ...updatedData };
        renderNews();
    }
}