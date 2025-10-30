// scriptAdmin.js - Panel de administración
// Conectado a MySQL via API

const API_URL = '/api';

let editingNewsId = null;

// Mostrar/ocultar tabs
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    document.getElementById('tab-' + tabName).classList.add('active');
    
    const clickedBtn = Array.from(tabBtns).find(function(btn) {
        return btn.textContent.toLowerCase().includes(tabName);
    });
    if (clickedBtn) clickedBtn.classList.add('active');
    
    if (tabName === 'gestionar') {
        loadNewsList();
    }
}

// Agregar párrafo
function addParagraph() {
    const container = document.getElementById('paragraphs-container');
    const paragraphCount = container.children.length;
    
    const div = document.createElement('div');
    div.className = 'paragraph-item';
    div.innerHTML = '<textarea class="form-control paragraph-input" rows="4" placeholder="Escribe el párrafo ' + (paragraphCount + 1) + '..." required></textarea><button type="button" class="btn-remove-paragraph" onclick="removeParagraph(this)"><i class="fas fa-times"></i></button>';
    
    container.appendChild(div);
}

// Eliminar párrafo
function removeParagraph(button) {
    const container = document.getElementById('paragraphs-container');
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert('Debe haber al menos un párrafo');
    }
}

// Agregar imagen a galería
let galleryCounter = 0;

function addGalleryImage() {
    const container = document.getElementById('gallery-container');
    galleryCounter++;
    const uniqueId = 'gallery-file-' + galleryCounter;
    const urlInputId = 'gallery-url-' + galleryCounter;
    
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = '<div class="gallery-item-inputs">' +
        '<input type="url" id="' + urlInputId + '" class="form-control gallery-input" placeholder="https://ejemplo.com/imagen' + galleryCounter + '.jpg">' +
        '<div class="file-input-container">' +
            '<input type="file" id="' + uniqueId + '" accept="image/*">' +
            '<label for="' + uniqueId + '" class="file-input-label" title="Subir desde PC">' +
                '<i class="fas fa-upload"></i>' +
            '</label>' +
        '</div>' +
        '<div class="file-preview"></div>' +
    '</div>' +
    '<button type="button" class="btn-remove-gallery" onclick="removeGalleryImage(this)" title="Eliminar imagen">' +
        '<i class="fas fa-times"></i>' +
    '</button>';
    
    container.appendChild(div);
    
    // Event listener para el botón eliminar
    const removeBtn = div.querySelector('.btn-remove-gallery');
    removeBtn.addEventListener('click', function() {
        div.remove();
    });
    
    // Event listener para el input file
    const fileInput = document.getElementById(uniqueId);
    const urlInput = document.getElementById(urlInputId);
    const preview = div.querySelector('.file-preview');
    
    fileInput.addEventListener('change', async function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Validar tamaño (3MB)
        if (file.size > 3 * 1024 * 1024) {
            alert('La imagen es demasiado grande. Máximo: 3MB');
            fileInput.value = '';
            return;
        }
        
        // Validar tipo
        if (!file.type.startsWith('image/')) {
            alert('Solo se permiten imágenes');
            fileInput.value = '';
            return;
        }
        
        preview.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
        preview.classList.add('show');
        
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'gallery');
            
            const response = await fetch('/api/upload-file.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Error al subir imagen');
            }
            
            // Actualizar URL input con la ruta del archivo
            urlInput.value = window.location.origin + result.url;
            preview.innerHTML = '<i class="fas fa-check-circle"></i> ' + file.name + ' (' + result.size + ')';
            
        } catch (error) {
            console.error('Error:', error);
            preview.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error: ' + error.message;
            alert('Error al subir la imagen: ' + error.message);
        }
    });
}

// Obtener datos del formulario
function getFormData() {
    const title = document.getElementById('news-title-input').value.trim();
    const shortDesc = document.getElementById('news-short-desc').value.trim();
    const date = document.getElementById('news-date').value;
    const category = document.getElementById('news-category').value;
    const thumbnail = document.getElementById('news-thumbnail').value.trim();
    const hero = document.getElementById('news-hero').value.trim();
    const videoInput = document.getElementById('news-video').value.trim();
    
    // Convertir URLs de video automáticamente
    let videoUrl = null;
    if (videoInput) {
        videoUrl = convertToEmbedUrl(videoInput);
    }
    
    const paragraphInputs = document.querySelectorAll('.paragraph-input');
    const content = [];
    paragraphInputs.forEach(function(input) {
        const text = input.value.trim();
        if (text) {
            content.push(text);
        }
    });
    
    const galleryInputs = document.querySelectorAll('.gallery-input');
    const gallery = [];
    galleryInputs.forEach(function(input) {
        const url = input.value.trim();
        if (url) {
            gallery.push(url);
        }
    });
    
    const categorySelect = document.getElementById('news-category');
    const categoryLabel = categorySelect.options[categorySelect.selectedIndex].text;
    
    return {
        title: title,
        shortDescription: shortDesc,
        date: date,
        category: category,
        categoryLabel: categoryLabel,
        thumbnailImage: thumbnail,
        heroImage: hero,
        content: content,
        videoUrl: videoUrl,
        gallery: gallery
    };
}

// NUEVA FUNCIÓN: Convertir URLs de video a formato embebido
function convertToEmbedUrl(url) {
    // Si ya es una URL embed, devolverla tal cual
    if (url.includes('/embed/') || url.includes('facebook.com/plugins/video.php')) {
        return url;
    }
    
    // Convertir YouTube
    // Acepta: https://www.youtube.com/watch?v=VIDEO_ID
    //         https://youtu.be/VIDEO_ID
    //         https://m.youtube.com/watch?v=VIDEO_ID
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch && youtubeMatch[1]) {
        return 'https://www.youtube.com/embed/' + youtubeMatch[1];
    }
    
    // Convertir Facebook
    // Acepta: https://www.facebook.com/user/videos/VIDEO_ID/
    //         https://fb.watch/VIDEO_ID/
    const facebookRegex = /(?:facebook\.com\/.*\/videos\/(\d+)|fb\.watch\/([a-zA-Z0-9_-]+))/;
    const facebookMatch = url.match(facebookRegex);
    
    if (facebookMatch) {
        const videoId = facebookMatch[1] || facebookMatch[2];
        // Encode la URL original para Facebook embed
        const encodedUrl = encodeURIComponent(url);
        return 'https://www.facebook.com/plugins/video.php?href=' + encodedUrl + '&show_text=false&width=734';
    }
    
    // Si no es YouTube ni Facebook, devolver la URL original
    return url;
}

// Validar formulario
function validateForm(data) {
    if (!data.title) {
        alert('Por favor ingresa un título');
        return false;
    }
    if (!data.shortDescription) {
        alert('Por favor ingresa una descripción corta');
        return false;
    }
    if (!data.date) {
        alert('Por favor selecciona una fecha');
        return false;
    }
    if (!data.category) {
        alert('Por favor selecciona una categoría');
        return false;
    }
    if (!data.thumbnailImage) {
        alert('Por favor ingresa la URL de la imagen miniatura');
        return false;
    }
    if (!data.heroImage) {
        alert('Por favor ingresa la URL de la imagen principal');
        return false;
    }
    if (data.content.length === 0) {
        alert('Por favor ingresa al menos un párrafo de contenido');
        return false;
    }
    return true;
}

// Formatear fecha
function formatDateForDisplay(dateString) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
}

// Vista previa
function previewNews() {
    const newsData = getFormData();
    
    if (!validateForm(newsData)) {
        return;
    }
    
    let previewHTML = '<div style="max-width: 800px; margin: 0 auto;">';
    previewHTML += '<div style="margin-bottom: 20px;"><img src="' + newsData.heroImage + '" style="width: 100%; height: 400px; object-fit: cover; border-radius: 10px;"></div>';
    previewHTML += '<p style="color: #c9a557; font-weight: bold; margin-bottom: 10px;">' + formatDateForDisplay(newsData.date) + '</p>';
    previewHTML += '<h2 style="color: #003d7a; font-size: 28px; margin-bottom: 20px;">' + newsData.title + '</h2>';
    
    newsData.content.forEach(function(p) {
        previewHTML += '<p style="margin-bottom: 15px; line-height: 1.8;">' + p + '</p>';
    });
    
    if (newsData.videoUrl) {
        previewHTML += '<div style="margin-top: 30px;"><iframe src="' + newsData.videoUrl + '" width="100%" height="400" frameborder="0" allowfullscreen></iframe></div>';
    }
    
    if (newsData.gallery.length > 0) {
        previewHTML += '<div style="margin-top: 30px;"><h3>Galería</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-top: 15px;">';
        newsData.gallery.forEach(function(img) {
            previewHTML += '<img src="' + img + '" style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px;">';
        });
        previewHTML += '</div></div>';
    }
    
    previewHTML += '</div>';
    
    document.getElementById('preview-content').innerHTML = previewHTML;
    document.getElementById('preview-modal').classList.add('show');
}

// Cerrar vista previa
function closePreview() {
    document.getElementById('preview-modal').classList.remove('show');
}

// Guardar noticia (crear o actualizar)
async function saveNews(event) {
    event.preventDefault();
    
    const newsData = getFormData();
    
    if (!validateForm(newsData)) {
        return;
    }
    
    try {
        let url = API_URL + '/create-news.php';
        let method = 'POST';
        
        if (editingNewsId) {
            url = API_URL + '/update-news.php';
            newsData.id = editingNewsId;
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newsData)
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al guardar la noticia');
        }
        
        alert(editingNewsId ? 'Noticia actualizada exitosamente' : 'Noticia creada exitosamente');
        
        resetForm();
        showTab('gestionar');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar la noticia: ' + error.message);
    }
}

// Resetear formulario
function resetForm() {
    document.getElementById('news-form').reset();
    
    const paragraphsContainer = document.getElementById('paragraphs-container');
    paragraphsContainer.innerHTML = '<div class="paragraph-item"><textarea class="form-control paragraph-input" rows="4" placeholder="Escribe el primer párrafo de la noticia..." required></textarea><button type="button" class="btn-remove-paragraph" onclick="removeParagraph(this)" style="display: none;"><i class="fas fa-times"></i></button></div>';
    
    document.getElementById('gallery-container').innerHTML = '';
    
    editingNewsId = null;
}

// Cargar lista de noticias
async function loadNewsList() {
    const container = document.getElementById('news-list');
    container.innerHTML = '<div style="text-align: center; padding: 40px;"><p>Cargando noticias...</p></div>';
    
    try {
        const response = await fetch(API_URL + '/get-all-news.php');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al cargar noticias');
        }
        
        const allNews = result.data;
        
        if (allNews.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;"><i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 20px; display: block;"></i><p>No hay noticias publicadas aún</p></div>';
            return;
        }
        
        let html = '';
        allNews.forEach(function(news) {
            html += '<div class="news-item" data-id="' + news.id + '">';
            html += '<div class="news-item-info">';
            html += '<h3>' + news.title + '</h3>';
            html += '<div class="news-item-meta">';
            html += '<span><i class="fas fa-calendar"></i> ' + formatDateForDisplay(news.date) + '</span>';
            html += '<span><i class="fas fa-tag"></i> ' + news.categoryLabel + '</span>';
            html += '<span><i class="fas fa-hashtag"></i> ID: ' + news.id + '</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="news-item-actions">';
            html += '<button class="btn-icon btn-edit" onclick="editNews(' + news.id + ')" title="Editar"><i class="fas fa-edit"></i></button>';
            html += '<button class="btn-icon btn-delete" onclick="confirmDelete(' + news.id + ')" title="Eliminar"><i class="fas fa-trash"></i></button>';
            html += '</div>';
            html += '</div>';
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc3545;"><p>Error al cargar las noticias</p></div>';
    }
}

// Buscar noticias
function searchNews() {
    const searchTerm = document.getElementById('search-news').value.toLowerCase();
    const newsItems = document.querySelectorAll('.news-item');
    
    newsItems.forEach(function(item) {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Editar noticia
async function editNews(newsId) {
    try {
        const response = await fetch(API_URL + '/get-news-by-id.php?id=' + newsId);
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Noticia no encontrada');
        }
        
        const news = result.data;
        
        document.getElementById('news-title-input').value = news.title;
        document.getElementById('news-short-desc').value = news.shortDescription;
        document.getElementById('news-date').value = news.date;
        document.getElementById('news-category').value = news.category;
        document.getElementById('news-thumbnail').value = news.thumbnailImage || '';
        document.getElementById('news-hero').value = news.heroImage || '';
        document.getElementById('news-video').value = news.videoUrl || '';
        
        const paragraphsContainer = document.getElementById('paragraphs-container');
        paragraphsContainer.innerHTML = '';
        news.content.forEach(function(paragraph, index) {
            const div = document.createElement('div');
            div.className = 'paragraph-item';
            div.innerHTML = '<textarea class="form-control paragraph-input" rows="4" required>' + paragraph + '</textarea><button type="button" class="btn-remove-paragraph" onclick="removeParagraph(this)" style="' + (index === 0 ? 'display: none;' : '') + '"><i class="fas fa-times"></i></button>';
            paragraphsContainer.appendChild(div);
        });
        
        const galleryContainer = document.getElementById('gallery-container');
        galleryContainer.innerHTML = '';
        if (news.gallery && news.gallery.length > 0) {
            news.gallery.forEach(function(img) {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.innerHTML = '<div class="gallery-item-inputs"><input type="url" class="form-control gallery-input" value="' + img + '"></div><button type="button" class="btn-remove-gallery" onclick="removeGalleryImage(this)"><i class="fas fa-times"></i> Eliminar</button>';
                galleryContainer.appendChild(div);
            });
        }
        
        editingNewsId = newsId;
        
        showTab('crear');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        alert('Editando noticia ID: ' + newsId + '\n\nRecuerda hacer click en "Guardar Noticia" para aplicar los cambios.');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar la noticia: ' + error.message);
    }
}

// Confirmar eliminación
function confirmDelete(newsId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta noticia?\n\nEsta acción no se puede deshacer.')) {
        deleteNews(newsId);
    }
}

// Eliminar noticia
async function deleteNews(newsId) {
    try {
        const response = await fetch(API_URL + '/delete-news.php?id=' + newsId);
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al eliminar la noticia');
        }
        
        alert('Noticia eliminada exitosamente');
        loadNewsList();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar la noticia: ' + error.message);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('news-date').value = today;
    
    const form = document.getElementById('news-form');
    form.addEventListener('submit', saveNews);
    
    loadNewsList();
});