<template>
    <AdminLayout :title="esEdicion ? 'Editar Noticia' : 'Nueva Noticia'" eyebrow="Módulos · Noticias">
        <div class="content-header">
            <div>
                <h1 class="content-title">{{ esEdicion ? 'Editar Noticia' : 'Nueva Noticia' }}</h1>
                <p class="content-desc">{{ esEdicion ? 'Modifica los datos de la noticia.' : 'Completa el formulario para publicar una nueva noticia.' }}</p>
            </div>
            <RouterLink to="/noticias" class="btn-back">
                <i class="ti ti-arrow-left"></i> Volver
            </RouterLink>
        </div>

        <!-- LOADING EDICIÓN -->
        <div v-if="loadingData" class="estado-msg">
            <i class="ti ti-loader-2 spin"></i> Cargando noticia...
        </div>

        <form v-else @submit.prevent="guardar" class="form-layout" novalidate>

            <!-- COLUMNA PRINCIPAL -->
            <div class="form-main">

                <!-- TÍTULO -->
                <div class="card">
                    <div class="card-header"><i class="ti ti-heading"></i> Información básica</div>
                    <div class="card-body">
                        <div class="field">
                            <label class="label">Título <span class="req">*</span></label>
                            <input v-model="form.title" type="text" class="input"
                                placeholder="Escribe el título completo de la noticia" required />
                        </div>
                        <div class="field">
                            <label class="label">Descripción corta <span class="req">*</span></label>
                            <textarea v-model="form.shortDescription" class="textarea" rows="3"
                                placeholder="Descripción breve para la lista (máx. 200 caracteres)" maxlength="200"
                                required></textarea>
                            <small>{{ form.shortDescription.length }}/200 caracteres</small>
                        </div>
                        <div class="form-row">
                            <div class="field">
                                <label class="label">Fecha <span class="req">*</span></label>
                                <input v-model="form.date" type="date" class="input" required />
                            </div>
                            <div class="field">
                                <label class="label">Categoría <span class="req">*</span></label>
                                <select v-model="form.category" class="select" required @change="onCategoryChange">
                                    <option value="">Seleccionar categoría</option>
                                    <option value="actividades-generales">Actividades generales</option>
                                    <option value="academico">Académico</option>
                                    <option value="investigacion">Investigación</option>
                                    <option value="extension">Extensión</option>
                                    <option value="cultura">Cultura</option>
                                    <option value="deportes">Deportes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CONTENIDO -->
                <div class="card">
                    <div class="card-header">
                        <span><i class="ti ti-file-text"></i> Contenido</span>
                        <button type="button" class="btn-add-small" @click="addParagraph">
                            <i class="ti ti-plus"></i> Agregar párrafo
                        </button>
                    </div>
                    <div class="card-body">
                        <div v-for="(p, i) in form.content" :key="i" class="paragraph-item">
                            <span class="paragraph-num">{{ i + 1 }}</span>
                            <textarea v-model="form.content[i]" class="textarea" rows="4"
                                :placeholder="`Párrafo ${i + 1}...`" required></textarea>
                            <button v-if="form.content.length > 1" type="button" class="btn-remove"
                                @click="removeParagraph(i)">
                                <i class="ti ti-x"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- GALERÍA -->
                <div class="card">
                    <div class="card-header">
                        <span><i class="ti ti-photos"></i> Galería (opcional)</span>
                        <button type="button" class="btn-add-small" @click="addGalleryImage">
                            <i class="ti ti-plus"></i> Agregar imagen
                        </button>
                    </div>
                    <div class="card-body">
                        <p class="hint" v-if="form.gallery.length === 0">Sin imágenes en galería. Haz clic en "Agregar
                            imagen" para añadir.</p>
                        <div v-for="(img, i) in form.gallery" :key="i" class="gallery-item">
                            <input v-model="form.gallery[i]" type="url" class="input"
                                :placeholder="`URL imagen ${i + 1}`" />
                            <button type="button" class="btn-remove" @click="removeGallery(i)"><i
                                    class="ti ti-x"></i></button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- COLUMNA LATERAL -->
            <div class="form-side">

                <!-- IMÁGENES -->
                <div class="card">
                    <div class="card-header"><i class="ti ti-photo"></i> Imágenes</div>
                    <div class="card-body">
                        <div class="field">
                            <label class="label">Imagen miniatura <span class="req">*</span></label>
                            <input v-model="form.thumbnailImage" type="url" class="input" placeholder="https://..." />
                            <div v-if="form.thumbnailImage" class="img-preview">
                                <img :src="form.thumbnailImage" alt="Miniatura" @error="form.thumbnailImage = ''" />
                            </div>
                            <small>Para la lista de noticias (800x600px recomendado)</small>
                        </div>
                        <div class="field" style="margin-top: 16px;">
                            <label class="label">Imagen principal / Hero <span class="req">*</span></label>
                            <input v-model="form.heroImage" type="url" class="input" placeholder="https://..." />
                            <div v-if="form.heroImage" class="img-preview">
                                <img :src="form.heroImage" alt="Hero" @error="form.heroImage = ''" />
                            </div>
                            <small>Para el detalle de la noticia (1920x1080px recomendado)</small>
                        </div>
                    </div>
                </div>

                <!-- VIDEO -->
                <div class="card">
                    <div class="card-header"><i class="ti ti-video"></i> Video (opcional)</div>
                    <div class="card-body">
                        <div class="field">
                            <input v-model="form.videoUrl" type="url" class="input"
                                placeholder="URL de YouTube o Facebook" />
                            <small>Pega el link de YouTube o Facebook, se convierte automáticamente.</small>
                        </div>
                    </div>
                </div>

                <!-- ACCIONES -->
                <div class="card">
                    <div class="card-body">
                        <button type="submit" class="btn-primary btn-full" :disabled="guardando">
                            <i class="ti ti-loader-2 spin" v-if="guardando"></i>
                            <i class="ti ti-device-floppy" v-else></i>
                            {{ guardando ? 'Guardando...' : (esEdicion ? 'Actualizar noticia' : 'Publicar noticia') }}
                        </button>
                        <RouterLink to="/noticias" class="btn-secondary btn-full"
                            style="margin-top: 10px; display: flex; justify-content: center;">
                            Cancelar
                        </RouterLink>
                    </div>
                </div>

            </div>

        </form>

        <!-- TOAST -->
        <div v-if="toast.show" class="toast" :class="toast.type">
            <i :class="toast.type === 'success' ? 'ti ti-check' : 'ti ti-alert-circle'"></i>
            {{ toast.msg }}
        </div>

    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import AdminLayout from '@/components/AdminLayout.vue'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()

const esEdicion = computed(() => !!route.params.id)
const loadingData = ref(false)
const guardando = ref(false)
const toast = ref({ show: false, msg: '', type: 'success' })

const categoryLabels: Record<string, string> = {
    'actividades-generales': 'Actividades generales',
    'academico': 'Académico',
    'investigacion': 'Investigación',
    'extension': 'Extensión',
    'cultura': 'Cultura',
    'deportes': 'Deportes',
}

const form = ref({
    title: '',
    shortDescription: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    categoryLabel: '',
    thumbnailImage: '',
    heroImage: '',
    videoUrl: '',
    content: [''],
    gallery: [] as string[],
})

function onCategoryChange() {
    form.value.categoryLabel = categoryLabels[form.value.category] || form.value.category
}

function addParagraph() { form.value.content.push('') }
function removeParagraph(i: number) { form.value.content.splice(i, 1) }
function addGalleryImage() { form.value.gallery.push('') }
function removeGallery(i: number) { form.value.gallery.splice(i, 1) }

function convertToEmbed(url: string): string {
    if (!url) return ''
    if (url.includes('/embed/')) return url
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
    return url
}

function showToast(msg: string, type = 'success') {
    toast.value = { show: true, msg, type }
    setTimeout(() => { toast.value.show = false }, 3500)
}

function validate(): string | null {
    if (!form.value.title.trim()) return 'El título es requerido'
    if (!form.value.shortDescription.trim()) return 'La descripción corta es requerida'
    if (!form.value.date) return 'La fecha es requerida'
    if (!form.value.category) return 'La categoría es requerida'
    if (!form.value.thumbnailImage.trim()) return 'La imagen miniatura es requerida'
    if (!form.value.heroImage.trim()) return 'La imagen principal es requerida'
    if (form.value.content.filter(p => p.trim()).length === 0) return 'Agrega al menos un párrafo de contenido'
    return null
}

async function guardar() {
    const err = validate()
    if (err) { showToast(err, 'error'); return }

    guardando.value = true
    try {
        const payload = {
            ...form.value,
            content: form.value.content.filter(p => p.trim()),
            gallery: form.value.gallery.filter(g => g.trim()),
            videoUrl: convertToEmbed(form.value.videoUrl),
            categoryLabel: categoryLabels[form.value.category] || form.value.category,
            ...(esEdicion.value ? { id: route.params.id } : {}),
        }

        const endpoint = esEdicion.value ? '/news/update-news.php' : '/news/create-news.php'
        const res = await api.post(endpoint, payload)

        if (res.data.success) {
            showToast(esEdicion.value ? 'Noticia actualizada' : 'Noticia publicada')
            setTimeout(() => router.push('/noticias'), 1200)
        } else {
            showToast(res.data.message || 'Error al guardar', 'error')
        }
    } catch {
        showToast('Error de conexión', 'error')
    } finally {
        guardando.value = false
    }
}

onMounted(async () => {
    if (!esEdicion.value) return
    loadingData.value = true
    try {
        const res = await api.get(`/news/get-news.php?id=${route.params.id}`)
        if (res.data.success) {
            const n = res.data.data
            form.value = {
                title: n.title || '',
                shortDescription: n.shortDescription || '',
                date: n.date || '',
                category: n.category || '',
                categoryLabel: n.categoryLabel || '',
                thumbnailImage: n.thumbnailImage || '',
                heroImage: n.heroImage || '',
                videoUrl: n.videoUrl || '',
                content: n.content?.length ? n.content : [''],
                gallery: n.gallery || [],
            }
        }
    } catch { }
    finally { loadingData.value = false }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.content-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.content-title {
    font-size: 24px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 4px;
    font-family: 'Outfit', sans-serif;
}

.content-desc {
    font-size: 14px;
    color: #64748b;
    font-family: 'Outfit', sans-serif;
}

.btn-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: white;
    color: #374151;
    border: 1.5px solid #e2e8f0;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 9px 18px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.2s;
}

.btn-back:hover {
    background: #f8fafc;
}

.estado-msg {
    text-align: center;
    padding: 60px;
    font-size: 15px;
    color: #94a3b8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-family: 'Outfit', sans-serif;
}

.estado-msg i {
    font-size: 36px;
}

.form-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 20px;
    align-items: start;
}

.card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 16px;
}

.card:last-child {
    margin-bottom: 0;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a2e;
    gap: 8px;
}

.card-header i {
    color: #0f1a8c;
    font-size: 16px;
}

.card-body {
    padding: 20px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
    font-family: 'Outfit', sans-serif;
}

.field:last-child {
    margin-bottom: 0;
}

.label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
}

.req {
    color: #ef4444;
}

.input,
.select,
.textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: #1a1a2e;
    background: white;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus,
.select:focus,
.textarea:focus {
    border-color: #0f1a8c;
    box-shadow: 0 0 0 3px rgba(15, 26, 140, 0.08);
}

.textarea {
    resize: vertical;
    line-height: 1.6;
}

.select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 36px;
}

small {
    font-size: 12px;
    color: #94a3b8;
}

.hint {
    font-size: 13px;
    color: #94a3b8;
    font-family: 'Outfit', sans-serif;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.paragraph-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
}

.paragraph-num {
    width: 24px;
    height: 24px;
    background: #eef2ff;
    color: #0f1a8c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 10px;
    font-family: 'Outfit', sans-serif;
}

.paragraph-item .textarea {
    flex: 1;
}

.gallery-item {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 8px;
}

.gallery-item .input {
    flex: 1;
}

.btn-remove {
    width: 32px;
    height: 32px;
    border: 1.5px solid #fecaca;
    background: #fef2f2;
    color: #b91c1c;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 14px;
    transition: all 0.15s;
}

.btn-remove:hover {
    background: #fee2e2;
}

.btn-add-small {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #eef2ff;
    color: #0f1a8c;
    border: 1.5px solid #c7d2fe;
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: all 0.15s;
}

.btn-add-small:hover {
    background: #e0e7ff;
}

.img-preview {
    margin-top: 8px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    height: 120px;
}

.img-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #ffd500;
    color: #0f1a8c;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
}

.btn-primary:hover:not(:disabled) {
    background: #ffe033;
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: white;
    color: #374151;
    border: 1.5px solid #e2e8f0;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: #f8fafc;
}

.btn-full {
    width: 100%;
}

.toast {
    position: fixed;
    bottom: 28px;
    right: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 400;
    animation: slideIn 0.3s ease;
}

.toast.success {
    background: white;
    color: #047857;
    border-left: 4px solid #10b981;
}

.toast.error {
    background: white;
    color: #b91c1c;
    border-left: 4px solid #ef4444;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(24px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.spin {
    animation: spin 1s linear infinite;
    display: inline-block;
}

@media (max-width: 900px) {
    .form-layout {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>