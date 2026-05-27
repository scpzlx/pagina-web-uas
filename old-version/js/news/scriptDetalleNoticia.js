// scriptDetalleNoticia.js - Detalle de una noticia
// Conectado a MySQL via API

const API_URL = '/api/news';

// Función para obtener parámetro de URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para formatear fecha
function formatDate(dateString) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
}

// Cargar noticia desde la base de datos
async function loadNews() {
    console.log('Cargando detalle de noticia...');
    
    const newsId = getUrlParameter('id');
    
    if (!newsId) {
        console.error('No se proporcionó ID de noticia');
        document.querySelector('.main-content').innerHTML = '<div style="padding: 40px; text-align: center;"><h2>Error</h2><p>No se proporcionó un ID de noticia válido.</p><a href="noticias.html">← Volver a noticias</a></div>';
        return;
    }
    
    try {
        const response = await fetch(API_URL + '/get-news-by-id.php?id=' + newsId);
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Noticia no encontrada');
        }
        
        const news = result.data;
        console.log('Noticia cargada:', news);
        
        document.getElementById('hero-image').src = news.heroImage;
        document.getElementById('hero-image').alt = news.title;
        document.getElementById('news-title').textContent = news.title;
        document.getElementById('news-date').textContent = formatDate(news.date);
        document.getElementById('news-full-title').textContent = news.title;
        
        const contentContainer = document.getElementById('news-content');
        const contentHTML = news.content.map(function(paragraph) {
            return '<p>' + paragraph + '</p>';
        }).join('');
        contentContainer.innerHTML = contentHTML;
        
        if (news.videoUrl) {
            const videoContainer = document.getElementById('news-video');
            videoContainer.style.display = 'block';
            videoContainer.innerHTML = '<iframe src="' + news.videoUrl + '" allowfullscreen></iframe>';
        }
        
        if (news.gallery && news.gallery.length > 0) {
            const galleryContainer = document.getElementById('gallery-images');
            const galleryHTML = news.gallery.map(function(img) {
                return '<img src="' + img + '" alt="Imagen relacionada" onclick="window.open(\'' + img + '\', \'_blank\')">';
            }).join('');
            galleryContainer.innerHTML = galleryHTML;
            initGalleryNavigation();
        }
        
        setupSocialSharing(news);
        loadOtherNews(newsId);
        
    } catch (error) {
        console.error('Error al cargar noticia:', error);
        document.querySelector('.main-content').innerHTML = '<div style="padding: 40px; text-align: center;"><h2>Error</h2><p>' + error.message + '</p><a href="noticias.html">← Volver a noticias</a></div>';
    }
}

// Configurar botones de compartir
function setupSocialSharing(news) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(news.title);
    
    const facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    document.getElementById('share-facebook').href = facebookUrl;
    document.getElementById('share-facebook-bottom').href = facebookUrl;
    
    const twitterUrl = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
    document.getElementById('share-twitter').href = twitterUrl;
    document.getElementById('share-twitter-bottom').href = twitterUrl;
    
    const googleUrl = 'https://plus.google.com/share?url=' + url;
    document.getElementById('share-google').href = googleUrl;
    document.getElementById('share-google-bottom').href = googleUrl;
}

// Cargar otras noticias
async function loadOtherNews(currentId) {
    try {
        const response = await fetch(API_URL + '/get-all-news.php');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error('Error al cargar otras noticias');
        }
        
        const otherNews = result.data
            .filter(function(n) { return n.id !== parseInt(currentId); })
            .slice(0, 6);
        
        const container = document.getElementById('related-news');
        
        if (otherNews.length === 0) {
            container.innerHTML = '<p style="color: #666; font-size: 14px; padding: 20px;">No hay otras noticias disponibles.</p>';
            return;
        }
        
        const newsHTML = otherNews.map(function(news) {
            return '<div class="related-news-item">' +
                '<p class="related-news-date">' + formatDate(news.date) + '</p>' +
                '<p class="related-news-title">' +
                    '<a href="noticia-detalle.html?id=' + news.id + '">' + news.title + '</a>' +
                '</p>' +
            '</div>';
        }).join('');
        
        container.innerHTML = newsHTML;
        
    } catch (error) {
        console.error('Error al cargar otras noticias:', error);
    }
}

// Navegación de galería
let currentGalleryIndex = 0;
let galleryImages = [];

function initGalleryNavigation() {
    const container = document.getElementById('gallery-images');
    galleryImages = container.querySelectorAll('img');
    
    if (galleryImages.length <= 4) {
        document.getElementById('gallery-prev').style.display = 'none';
        document.getElementById('gallery-next').style.display = 'none';
        return;
    }
    
    updateGalleryButtons();
    
    document.getElementById('gallery-prev').addEventListener('click', function() {
        if (currentGalleryIndex > 0) {
            currentGalleryIndex--;
            updateGallery();
        }
    });
    
    document.getElementById('gallery-next').addEventListener('click', function() {
        if (currentGalleryIndex < galleryImages.length - 4) {
            currentGalleryIndex++;
            updateGallery();
        }
    });
}

function updateGallery() {
    const container = document.getElementById('gallery-images');
    const offset = currentGalleryIndex * -215;
    container.style.transform = 'translateX(' + offset + 'px)';
    updateGalleryButtons();
}

function updateGalleryButtons() {
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    prevBtn.disabled = currentGalleryIndex === 0;
    nextBtn.disabled = currentGalleryIndex >= galleryImages.length - 4;
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada. URL:', window.location.href);
    loadNews();
});