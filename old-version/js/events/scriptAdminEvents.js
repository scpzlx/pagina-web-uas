// scriptAdminEvents.js - Panel de administración
// Conectado a MySQL via API

const API_URL = '/api/events';

let editingEventsId = null;

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
        loadEventsList();
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
    const title = document.getElementById('events-title-input').value.trim();
    const shortDesc = document.getElementById('events-short-desc').value.trim();
    const date = document.getElementById('events-date').value;
    const category = document.getElementById('events-category').value;
    const thumbnail = document.getElementById('events-thumbnail').value.trim();
    const hero = document.getElementById('events-hero').value.trim();
    const videoInput = document.getElementById('events-video').value.trim();
    
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
    
    const categorySelect = document.getElementById('events-category');
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
function previewEvents() {
    const eventsData = getFormData();
    
    if (!validateForm(eventsData)) {
        return;
    }
    
    let previewHTML = '<div style="max-width: 800px; margin: 0 auto;">';
    previewHTML += '<div style="margin-bottom: 20px;"><img src="' + eventsData.heroImage + '" style="width: 100%; height: 400px; object-fit: cover; border-radius: 10px;"></div>';
    previewHTML += '<p style="color: #c9a557; font-weight: bold; margin-bottom: 10px;">' + formatDateForDisplay(eventsData.date) + '</p>';
    previewHTML += '<h2 style="color: #003d7a; font-size: 28px; margin-bottom: 20px;">' + eventsData.title + '</h2>';
    
    eventsData.content.forEach(function(p) {
        previewHTML += '<p style="margin-bottom: 15px; line-height: 1.8;">' + p + '</p>';
    });
    
    if (eventsData.videoUrl) {
        previewHTML += '<div style="margin-top: 30px;"><iframe src="' + eventsData.videoUrl + '" width="100%" height="400" frameborder="0" allowfullscreen></iframe></div>';
    }
    
    if (eventsData.gallery.length > 0) {
        previewHTML += '<div style="margin-top: 30px;"><h3>Galería</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-top: 15px;">';
        eventsData.gallery.forEach(function(img) {
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

// Guardar evento (crear o actualizar)
async function saveEvents(event) {
    event.preventDefault();
    
    const eventsData = getFormData();
    
    if (!validateForm(eventsData)) {
        return;
    }
    
    try {
        let url = API_URL + '/create-events.php';
        let method = 'POST';
        
        if (editingEventsId) {
            url = API_URL + '/update-events.php';
            eventsData.id = editingEventsId;
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventsData)
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al guardar el evento');
        }
        
        alert(editingEventsId ? 'Evento actualizado exitosamente' : 'Evento creado exitosamente');
        
        resetForm();
        showTab('gestionar');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar el evento: ' + error.message);
    }
}

// Resetear formulario
function resetForm() {
    document.getElementById('events-form').reset();
    
    const paragraphsContainer = document.getElementById('paragraphs-container');
    paragraphsContainer.innerHTML = '<div class="paragraph-item"><textarea class="form-control paragraph-input" rows="4" placeholder="Escribe el primer párrafo del evento..." required></textarea><button type="button" class="btn-remove-paragraph" onclick="removeParagraph(this)" style="display: none;"><i class="fas fa-times"></i></button></div>';
    
    document.getElementById('gallery-container').innerHTML = '';
    
    editingEventsId = null;
}

// Cargar lista de eventos
async function loadEventsList() {
    const container = document.getElementById('events-list');
    container.innerHTML = '<div style="text-align: center; padding: 40px;"><p>Cargando eventos...</p></div>';
    
    try {
        const response = await fetch(API_URL + '/get-all-events.php');
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al cargar eventos');
        }
        
        const allEvents = result.data;
        
        if (allEvents.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;"><i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 20px; display: block;"></i><p>No hay eventos publicadas aún</p></div>';
            return;
        }
        
        let html = '';
        allEvents.forEach(function(events) {
            html += '<div class="events-item" data-id="' + events.id + '">';
            html += '<div class="events-item-info">';
            html += '<h3>' + events.title + '</h3>';
            html += '<div class="events-item-meta">';
            html += '<span><i class="fas fa-calendar"></i> ' + formatDateForDisplay(events.date) + '</span>';
            html += '<span><i class="fas fa-tag"></i> ' + events.categoryLabel + '</span>';
            html += '<span><i class="fas fa-hashtag"></i> ID: ' + events.id + '</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="events-item-actions">';
            html += '<button class="btn-icon btn-edit" onclick="editEvents(' + events.id + ')" title="Editar"><i class="fas fa-edit"></i></button>';
            html += '<button class="btn-icon btn-delete" onclick="confirmDelete(' + events.id + ')" title="Eliminar"><i class="fas fa-trash"></i></button>';
            html += '</div>';
            html += '</div>';
        });
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc3545;"><p>Error al cargar los eventos</p></div>';
    }
}

// Buscar eventos
function searchEvents() {
    const searchTerm = document.getElementById('search-events').value.toLowerCase();
    const eventsItems = document.querySelectorAll('.events-item');
    
    eventsItems.forEach(function(item) {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Editar evento
async function editEvents(eventsId) {
    try {
        const response = await fetch(API_URL + '/get-events-by-id.php?id=' + eventsId);
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Evento no encontrado');
        }
        
        const events = result.data;
        
        document.getElementById('events-title-input').value = events.title;
        document.getElementById('events-short-desc').value = events.shortDescription;
        document.getElementById('events-date').value = events.date;
        document.getElementById('events-category').value = events.category;
        document.getElementById('events-thumbnail').value = events.thumbnailImage || '';
        document.getElementById('events-hero').value = events.heroImage || '';
        document.getElementById('events-video').value = events.videoUrl || '';
        
        const paragraphsContainer = document.getElementById('paragraphs-container');
        paragraphsContainer.innerHTML = '';
        events.content.forEach(function(paragraph, index) {
            const div = document.createElement('div');
            div.className = 'paragraph-item';
            div.innerHTML = '<textarea class="form-control paragraph-input" rows="4" required>' + paragraph + '</textarea><button type="button" class="btn-remove-paragraph" onclick="removeParagraph(this)" style="' + (index === 0 ? 'display: none;' : '') + '"><i class="fas fa-times"></i></button>';
            paragraphsContainer.appendChild(div);
        });
        
        const galleryContainer = document.getElementById('gallery-container');
        galleryContainer.innerHTML = '';
        if (events.gallery && events.gallery.length > 0) {
            events.gallery.forEach(function(img) {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.innerHTML = '<div class="gallery-item-inputs"><input type="url" class="form-control gallery-input" value="' + img + '"></div><button type="button" class="btn-remove-gallery" onclick="removeGalleryImage(this)"><i class="fas fa-times"></i> Eliminar</button>';
                galleryContainer.appendChild(div);
            });
        }
        
        editingEventsId = eventsId;
        
        showTab('crear');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        alert('Editando evento ID: ' + eventsId + '\n\nRecuerda hacer click en "Guardar Evento" para aplicar los cambios.');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el evento: ' + error.message);
    }
}

// Confirmar eliminación
function confirmDelete(eventsId) {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?\n\nEsta acción no se puede deshacer.')) {
        deleteEvents(eventsId);
    }
}

// Eliminar evento
async function deleteEvents(eventsId) {
    try {
        const response = await fetch(API_URL + '/delete-events.php?id=' + eventsId);
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Error al eliminar el evento');
        }
        
        alert('Evento eliminado exitosamente');
        loadEventsList();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el Evento: ' + error.message);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('events-date').value = today;
    
    const form = document.getElementById('events-form');
    form.addEventListener('submit', saveEvents);
    
    loadEventsList();
});