// ===========================================
// GESTIÓN DE GALERÍA
// ===========================================
let galleryCounter = 0;

function addGalleryImage() {
    const container = document.getElementById('gallery-container');
    galleryCounter++;
    const uniqueId = 'gallery-file-' + galleryCounter;
    
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = '<div class="gallery-item-inputs"><input type="url" class="form-control gallery-input" placeholder="https://ejemplo.com/imagen' + galleryCounter + '.jpg"><div class="file-input-container"><input type="file" id="' + uniqueId + '" accept="image/*"><label for="' + uniqueId + '" class="file-input-label"><i class="fas fa-upload"></i> Subir desde PC</label></div><div class="file-preview"></div></div><button type="button" class="btn-remove-gallery" onclick="removeGalleryImage(this)"><i class="fas fa-times"></i> Eliminar</button>';
    
    container.appendChild(div);
    
    // Agregar event listener al input file
    const fileInput = document.getElementById(uniqueId);
    const urlInput = div.querySelector('.gallery-input');
    fileInput.addEventListener('change', function(event) {
        handleGalleryFileSelect(event, urlInput);
    });
}// ===========================================
// SISTEMA DE ALMACENAMIENTO
// ===========================================
// Por ahora usamos localStorage, pero está preparado para MySQL

// Cargar noticias iniciales si no existen en localStorage
function initializeDefaultNews() {
    const existingNews = localStorage.getItem('newsDatabase');
    if (!existingNews) {
        // Noticias por defecto (las mismas de script.js y script-detalle.js)
        const defaultNews = [
            {
                id: 1,
                title: "La UAS es primer lugar entre las universidades públicas estatales del país y tercer lugar general por cuarto año consecutivo, de acuerdo con el Ranking Mundial de Universidades de Times Higher Education",
                shortDescription: "Por sus indicadores de excelencia, la Universidad Autónoma de Sinaloa (UAS) se ubica en el primer lugar entre las universidades públicas estatales del país y por cuarto año consecutivo se mantiene en el tercer lugar entre las instituciones mexicanas, tanto públicas ...",
                date: "2025-10-09",
                category: "actividades-generales",
                categoryLabel: "ACTIVIDADES GENERALES",
                thumbnailImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop",
                content: [
                    "Por sus indicadores de excelencia, la Universidad Autónoma de Sinaloa (UAS) se ubica en el primer lugar entre las universidades públicas estatales del país y por cuarto año consecutivo se mantiene en el tercer lugar entre las instituciones mexicanas, tanto públicas como privadas, de acuerdo con el Ranking Mundial de Universidades elaborado y difundido por el Times Higher Education (THE), instrumento de medición de indicadores más grande y diverso en el sector académico del mundo.",
                    "Este Ranking dio a conocer los resultados este jueves y evalúa indicadores como la docencia, la calidad de la investigación y su impacto, la vinculación con los sectores productivos, la internacionalización y las publicaciones de impacto donde se toma en cuenta las veces que son citados los investigadores en otras partes del mundo, entre otros aspectos."
                ],
                videoUrl: null,
                gallery: []
            },
            {
                id: 2,
                title: "Es necesario centrarse en el bienestar emocional y cognitivo tanto de los pacientes de cáncer de mama como de sus acompañantes para rescatar la resiliencia, la salud y el amor propio",
                shortDescription: "Contar con redes de apoyo y resiliencia es de gran importancia cuando las personas reciben un diagnóstico de cáncer de mama...",
                date: "2025-10-09",
                category: "actividades-generales",
                categoryLabel: "ACTIVIDADES GENERALES",
                thumbnailImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
                heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&h=600&fit=crop",
                content: ["Contar con redes de apoyo y resiliencia es de gran importancia cuando las personas reciben un diagnóstico de cáncer de mama..."],
                videoUrl: null,
                gallery: []
            }
        ];
        saveAllNews(defaultNews);
    }
}

// Función para obtener todas las noticias
function getAllNews() {
    const newsJSON = localStorage.getItem('newsDatabase');
    if (newsJSON) {
        return JSON.parse(newsJSON);
    }
    return [];
}

// Función para guardar todas las noticias
function saveAllNews(newsArray) {
    localStorage.setItem('newsDatabase', JSON.stringify(newsArray));
}

// Función para obtener el próximo ID
function getNextId() {
    const news = getAllNews();
    if (news.length === 0) return 1;
    const maxId = Math.max.apply(Math, news.map(function(n) { return n.id; }));
    return maxId + 1;
}

// ===========================================
// MANEJO DE ARCHIVOS (IMÁGENES Y VIDEOS)
// ===========================================
function handleFileSelect(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const dataURL = e.target.result;
        
        // Actualizar el input correspondiente con el data URL
        if (type === 'thumbnail') {
            document.getElementById('news-thumbnail').value = dataURL;
            showFilePreview('thumbnail-preview', file.name, 'imagen');
        } else if (type === 'hero') {
            document.getElementById('news-hero').value = dataURL;
            showFilePreview('hero-preview', file.name, 'imagen');
        } else if (type === 'video') {
            document.getElementById('news-video').value = dataURL;
            showFilePreview('video-preview', file.name, 'video');
        } else if (type === 'gallery') {
            // Para galería, se maneja diferente
            return dataURL;
        }
    };
    
    reader.readAsDataURL(file);
}

function showFilePreview(previewId, fileName, fileType) {
    const preview = document.getElementById(previewId);
    const icon = fileType === 'video' ? 'fa-video' : 'fa-image';
    preview.innerHTML = '<i class="fas ' + icon + '"></i> Archivo seleccionado: ' + fileName;
    preview.classList.add('show');
}

// Para galería (cada imagen individual)
function handleGalleryFileSelect(event, inputElement) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        inputElement.value = e.target.result;
        
        // Mostrar preview al lado del input
        const preview = inputElement.nextElementSibling;
        if (preview && preview.classList.contains('file-preview')) {
            preview.innerHTML = '<i class="fas fa-check-circle"></i> Archivo cargado: ' + file.name;
            preview.classList.add('show');
        }
    };
    reader.readAsDataURL(file);
}

// ===========================================
// GESTIÓN DE TABS
// ===========================================
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

// ===========================================
// GESTIÓN DE PÁRRAFOS
// ===========================================
function addParagraph() {
    const container = document.getElementById('paragraphs-container');
    const paragraphCount = container.children.length;
    
    const div = document.createElement('div');
    div.className = 'paragraph-item';
    div.innerHTML = '<textarea class="form-control paragraph-input" rows="4" placeholder="Escribe el párrafo ' + (paragraphCount + 1) + '..." required></textarea><button type="button" class="btn-remove-paragraph" onclick="removeParagraph(this)"><i class="fas fa-times"></i></button>';
    
    container.appendChild(div);
}

function removeParagraph(button) {
    const container = document.getElementById('paragraphs-container');
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert('Debe haber al menos un párrafo');
    }
}

// ===========================================
// GESTIÓN DE GALERÍA
// ===========================================
function addGalleryImage() {
    const container = document.getElementById('gallery-container');
    const imageCount = container.children.length;
    
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = '<input type="url" class="form-control gallery-input" placeholder="https://ejemplo.com/imagen' + (imageCount + 1) + '.jpg"><button type="button" class="btn-remove-gallery" onclick="removeGalleryImage(this)"><i class="fas fa-times"></i> Eliminar</button>';
    
    container.appendChild(div);
}

function removeGalleryImage(button) {
    button.parentElement.remove();
}

// ===========================================
// OBTENER DATOS DEL FORMULARIO
// ===========================================
function getFormData() {
    const title = document.getElementById('news-title-input').value.trim();
    const shortDesc = document.getElementById('news-short-desc').value.trim();
    const date = document.getElementById('news-date').value;
    const category = document.getElementById('news-category').value;
    const thumbnail = document.getElementById('news-thumbnail').value.trim();
    const hero = document.getElementById('news-hero').value.trim();
    const video = document.getElementById('news-video').value.trim();
    
    // Obtener párrafos
    const paragraphInputs = document.querySelectorAll('.paragraph-input');
    const content = [];
    paragraphInputs.forEach(function(input) {
        const text = input.value.trim();
        if (text) {
            content.push(text);
        }
    });
    
    // Obtener imágenes de galería
    const galleryInputs = document.querySelectorAll('.gallery-input');
    const gallery = [];
    galleryInputs.forEach(function(input) {
        const url = input.value.trim();
        if (url) {
            gallery.push(url);
        }
    });
    
    // Obtener label de categoría
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
        videoUrl: video || null,
        gallery: gallery
    };
}

// ===========================================
// VALIDACIÓN
// ===========================================
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

// ===========================================
// FORMATEAR FECHA
// ===========================================
function formatDateForDisplay(dateString) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
}

// ===========================================
// VISTA PREVIA
// ===========================================
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

function closePreview() {
    document.getElementById('preview-modal').classList.remove('show');
}

// ===========================================
// GUARDAR NOTICIA
// ===========================================
function saveNews(event) {
    event.preventDefault();
    
    const newsData = getFormData();
    
    if (!validateForm(newsData)) {
        return;
    }
    
    const allNews = getAllNews();
    const newId = getNextId();
    
    const newNews = {
        id: newId,
        title: newsData.title,
        shortDescription: newsData.shortDescription,
        date: newsData.date,
        category: newsData.category,
        categoryLabel: newsData.categoryLabel,
        thumbnailImage: newsData.thumbnailImage,
        heroImage: newsData.heroImage,
        content: newsData.content,
        videoUrl: newsData.videoUrl,
        gallery: newsData.gallery
    };
    
    allNews.push(newNews);
    saveAllNews(allNews);
    
    alert('¡Noticia guardada exitosamente!\n\nID: ' + newId + '\nTítulo: ' + newsData.title);
    
    resetForm();
    showTab('gestionar');
}

// ===========================================
// RESETEAR FORMULARIO
// ===========================================
function resetForm() {
    document.getElementById('news-form').reset();
    
    const paragraphsContainer = document.getElementById('paragraphs-container');
    paragraphsContainer.innerHTML = '<div class="paragraph-item"><textarea class="form-control paragraph-input" rows="4" placeholder="Escribe el primer párrafo de la noticia..." required></textarea><button type="button" class="btn-remove-paragraph" onclick="removeParagraph(this)" style="display: none;"><i class="fas fa-times"></i></button></div>';
    
    document.getElementById('gallery-container').innerHTML = '';
}

// ===========================================
// CARGAR LISTA DE NOTICIAS
// ===========================================
function loadNewsList() {
    const allNews = getAllNews();
    const container = document.getElementById('news-list');
    
    if (allNews.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;"><i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 20px; display: block;"></i><p>No hay noticias publicadas aún</p></div>';
        return;
    }
    
    allNews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    
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
}

// ===========================================
// BUSCAR NOTICIAS
// ===========================================
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

// ===========================================
// EDITAR NOTICIA
// ===========================================
function editNews(newsId) {
    const allNews = getAllNews();
    const news = allNews.find(function(n) { return n.id === newsId; });
    
    if (!news) {
        alert('Noticia no encontrada');
        return;
    }
    
    document.getElementById('news-title-input').value = news.title;
    document.getElementById('news-short-desc').value = news.shortDescription;
    document.getElementById('news-date').value = news.date;
    document.getElementById('news-category').value = news.category;
    document.getElementById('news-thumbnail').value = news.thumbnailImage;
    document.getElementById('news-hero').value = news.heroImage;
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
    if (news.gallery) {
        news.gallery.forEach(function(img) {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = '<input type="url" class="form-control gallery-input" value="' + img + '"><button type="button" class="btn-remove-gallery" onclick="removeGalleryImage(this)"><i class="fas fa-times"></i> Eliminar</button>';
            galleryContainer.appendChild(div);
        });
    }
    
    const form = document.getElementById('news-form');
    form.setAttribute('data-edit-id', newsId);
    
    showTab('crear');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    alert('Editando noticia ID: ' + newsId + '\n\nRecuerda hacer click en "Guardar Noticia" para aplicar los cambios.');
}

// ===========================================
// CONFIRMAR ELIMINACIÓN
// ===========================================
function confirmDelete(newsId) {
    const allNews = getAllNews();
    const news = allNews.find(function(n) { return n.id === newsId; });
    
    if (!news) {
        alert('Noticia no encontrada');
        return;
    }
    
    document.getElementById('confirm-title').textContent = '¿Eliminar esta noticia?';
    document.getElementById('confirm-message').textContent = news.title;
    
    const confirmBtn = document.getElementById('confirm-action-btn');
    confirmBtn.onclick = function() {
        deleteNews(newsId);
    };
    
    document.getElementById('confirm-modal').classList.add('show');
}

function closeConfirm() {
    document.getElementById('confirm-modal').classList.remove('show');
}

// ===========================================
// ELIMINAR NOTICIA
// ===========================================
function deleteNews(newsId) {
    let allNews = getAllNews();
    allNews = allNews.filter(function(n) { return n.id !== newsId; });
    saveAllNews(allNews);
    
    closeConfirm();
    loadNewsList();
    
    alert('Noticia eliminada exitosamente');
}

// ===========================================
// INICIALIZACIÓN
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('news-date').value = today;
    
    const form = document.getElementById('news-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const editId = form.getAttribute('data-edit-id');
        if (editId) {
            const newsData = getFormData();
            if (!validateForm(newsData)) {
                return;
            }
            
            let allNews = getAllNews();
            const index = allNews.findIndex(function(n) { return n.id === parseInt(editId); });
            
            if (index !== -1) {
                allNews[index] = {
                    id: parseInt(editId),
                    title: newsData.title,
                    shortDescription: newsData.shortDescription,
                    date: newsData.date,
                    category: newsData.category,
                    categoryLabel: newsData.categoryLabel,
                    thumbnailImage: newsData.thumbnailImage,
                    heroImage: newsData.heroImage,
                    content: newsData.content,
                    videoUrl: newsData.videoUrl,
                    gallery: newsData.gallery
                };
                
                saveAllNews(allNews);
                alert('¡Noticia actualizada exitosamente!');
                form.removeAttribute('data-edit-id');
                resetForm();
                showTab('gestionar');
            }
        } else {
            saveNews(event);
        }
    });
    
    loadNewsList();
});

// ===========================================
// EXPORTAR PARA MYSQL (PREPARADO PARA FUTURO)
// ===========================================
function exportToMySQL() {
    const allNews = getAllNews();
    
    console.log('=== SCRIPT SQL PARA CREAR TABLA ===');
    console.log('CREATE TABLE noticias (');
    console.log('  id INT PRIMARY KEY AUTO_INCREMENT,');
    console.log('  title TEXT NOT NULL,');
    console.log('  shortDescription TEXT,');
    console.log('  date DATE NOT NULL,');
    console.log('  category VARCHAR(100),');
    console.log('  categoryLabel VARCHAR(100),');
    console.log('  thumbnailImage TEXT,');
    console.log('  heroImage TEXT,');
    console.log('  content TEXT,');
    console.log('  videoUrl TEXT,');
    console.log('  gallery TEXT,');
    console.log('  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    console.log(');');
    console.log('');
    console.log('=== DATOS ACTUALES (JSON) ===');
    console.log(JSON.stringify(allNews, null, 2));
    
    alert('Revisa la consola del navegador (F12) para ver el script SQL');
}