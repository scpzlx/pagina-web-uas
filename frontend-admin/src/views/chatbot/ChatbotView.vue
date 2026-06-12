<template>
    <AdminLayout title="Chatbot institucional" eyebrow="Módulos">
        <div class="content-header">
            <div>
                <h1 class="content-title">Gestión del Chatbot</h1>
                <p class="content-desc">
                    Configura las categorías, subcategorías, preguntas y respuestas del asistente
                    virtual que ayuda a los estudiantes en el sitio público.
                </p>
            </div>
        </div>

        <!-- TABS -->
        <nav class="tablist" role="tablist" aria-label="Secciones del panel chatbot">
            <button v-for="t in tabs" :key="t.id" type="button" class="tab-btn" :class="{ active: activeTab === t.id }"
                role="tab" :aria-selected="activeTab === t.id" @click="activeTab = t.id">
                <i :class="t.icon"></i>
                <span>{{ t.label }}</span>
            </button>
        </nav>

        <!-- ===================== CATEGORÍAS ===================== -->
        <div v-show="activeTab === 'categorias'" class="split-grid">
            <section class="card">
                <div class="card-header"><i class="ti ti-circle-plus"></i> Nueva categoría</div>
                <div class="card-body">
                    <form @submit.prevent="guardarCategoria" novalidate>
                        <div class="field">
                            <label class="label">Nombre de categoría <span class="req">*</span></label>
                            <input v-model="catForm.nombre" type="text" class="input"
                                placeholder="Ej: Servicios Escolares" />
                        </div>
                        <div class="field">
                            <label class="label">Descripción</label>
                            <textarea v-model="catForm.descripcion" class="textarea" rows="3"
                                placeholder="Describe brevemente esta categoría..."></textarea>
                        </div>
                        <button type="submit" class="btn-primary btn-full" :disabled="saving">
                            <i class="ti ti-device-floppy"></i> Guardar categoría
                        </button>
                    </form>
                </div>
            </section>

            <section class="card">
                <div class="card-header"><i class="ti ti-list"></i> Categorías registradas</div>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th class="col-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading"><td colspan="3" class="empty-cell">Cargando...</td></tr>
                            <tr v-else-if="!categorias.length"><td colspan="3" class="empty-cell">Sin categorías
                                    registradas aún.</td></tr>
                            <tr v-for="c in categorias" :key="c.id">
                                <td><strong>{{ c.nombre }}</strong></td>
                                <td class="td-muted">{{ c.descripcion || '—' }}</td>
                                <td class="col-actions">
                                    <button class="btn-icon btn-edit" title="Editar" @click="abrirEditarCategoria(c)">
                                        <i class="ti ti-edit"></i>
                                    </button>
                                    <button class="btn-icon btn-delete" title="Eliminar"
                                        @click="confirmarEliminarCategoria(c)">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <!-- ===================== SUBCATEGORÍAS ===================== -->
        <div v-show="activeTab === 'subcategorias'" class="split-grid">
            <section class="card">
                <div class="card-header"><i class="ti ti-circle-plus"></i> Nueva subcategoría</div>
                <div class="card-body">
                    <form @submit.prevent="guardarSubcategoria" novalidate>
                        <div class="field">
                            <label class="label">Categoría <span class="req">*</span></label>
                            <select v-model="subForm.categoria_id" class="select">
                                <option value="">Seleccione una categoría</option>
                                <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="label">Nombre de subcategoría <span class="req">*</span></label>
                            <input v-model="subForm.nombre" type="text" class="input"
                                placeholder="Ej: Trámites de Titulación" />
                        </div>
                        <div class="field">
                            <label class="label">Descripción</label>
                            <textarea v-model="subForm.descripcion" class="textarea" rows="3"
                                placeholder="Describe esta subcategoría..."></textarea>
                        </div>
                        <button type="submit" class="btn-primary btn-full" :disabled="saving">
                            <i class="ti ti-device-floppy"></i> Guardar subcategoría
                        </button>
                    </form>
                </div>
            </section>

            <section class="card">
                <div class="card-header"><i class="ti ti-list"></i> Subcategorías registradas</div>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th class="col-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading"><td colspan="4" class="empty-cell">Cargando...</td></tr>
                            <tr v-else-if="!subcategorias.length"><td colspan="4" class="empty-cell">Sin subcategorías
                                    registradas aún.</td></tr>
                            <tr v-for="s in subcategorias" :key="s.id">
                                <td><span class="chip">{{ categoriaNombre(s.categoria_id) }}</span></td>
                                <td><strong>{{ s.nombre }}</strong></td>
                                <td class="td-muted">{{ s.descripcion || '—' }}</td>
                                <td class="col-actions">
                                    <button class="btn-icon btn-edit" title="Editar" @click="abrirEditarSubcategoria(s)">
                                        <i class="ti ti-edit"></i>
                                    </button>
                                    <button class="btn-icon btn-delete" title="Eliminar"
                                        @click="confirmarEliminarSubcategoria(s)">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <!-- ===================== PREGUNTAS ===================== -->
        <div v-show="activeTab === 'preguntas'" class="split-grid">
            <section class="card">
                <div class="card-header"><i class="ti ti-circle-plus"></i> Nueva pregunta</div>
                <div class="card-body">
                    <form @submit.prevent="guardarPregunta" novalidate>
                        <div class="field">
                            <label class="label">Categoría <span class="req">*</span></label>
                            <select v-model="pregForm.categoria_id" class="select" @change="pregForm.subcategoria_id = ''">
                                <option value="">Seleccione una categoría</option>
                                <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="label">Subcategoría <span class="req">*</span></label>
                            <select v-model="pregForm.subcategoria_id" class="select" :disabled="!pregForm.categoria_id">
                                <option value="">
                                    {{ pregForm.categoria_id ? 'Seleccione una subcategoría' : 'Primero seleccione una categoría' }}
                                </option>
                                <option v-for="s in subcategoriasForm" :key="s.id" :value="s.id">{{ s.nombre }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="label">Pregunta <span class="req">*</span></label>
                            <input v-model="pregForm.pregunta" type="text" class="input"
                                placeholder="¿Cuál es la pregunta frecuente?" />
                        </div>
                        <button type="submit" class="btn-primary btn-full" :disabled="saving">
                            <i class="ti ti-device-floppy"></i> Guardar pregunta
                        </button>
                    </form>
                </div>
            </section>

            <section class="card">
                <div class="card-header"><i class="ti ti-list"></i> Preguntas registradas</div>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Subcategoría</th>
                                <th>Pregunta</th>
                                <th>Respuesta</th>
                                <th class="col-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading"><td colspan="5" class="empty-cell">Cargando...</td></tr>
                            <tr v-else-if="!preguntas.length"><td colspan="5" class="empty-cell">Sin preguntas
                                    registradas aún.</td></tr>
                            <tr v-for="p in preguntas" :key="p.id">
                                <td class="td-muted">{{ p.categoria || '—' }}</td>
                                <td class="td-muted">{{ p.subcategoria || '—' }}</td>
                                <td><strong>{{ p.pregunta }}</strong></td>
                                <td>
                                    <span v-if="p.respuesta && p.respuesta.trim()" class="badge badge-ok">
                                        <i class="ti ti-check"></i> Con respuesta
                                    </span>
                                    <span v-else class="badge badge-none">Sin respuesta</span>
                                </td>
                                <td class="col-actions">
                                    <button class="btn-icon btn-edit" title="Editar" @click="abrirEditarPregunta(p)">
                                        <i class="ti ti-edit"></i>
                                    </button>
                                    <button class="btn-icon btn-delete" title="Eliminar"
                                        @click="confirmarEliminarPregunta(p)">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <!-- ===================== RESPUESTAS ===================== -->
        <div v-show="activeTab === 'respuestas'" class="split-grid">
            <section class="card">
                <div class="card-header"><i class="ti ti-circle-plus"></i> Nueva respuesta</div>
                <div class="card-body">
                    <p class="hint" style="margin-bottom:14px">
                        Selecciona una pregunta y escribe su respuesta. Si la pregunta ya tiene
                        respuesta, se reemplazará.
                    </p>
                    <form @submit.prevent="guardarRespuesta" novalidate>
                        <div class="field">
                            <label class="label">Pregunta <span class="req">*</span></label>
                            <select v-model="respForm.pregunta_id" class="select">
                                <option value="">Seleccione una pregunta</option>
                                <option v-for="p in preguntas" :key="p.id" :value="p.id">{{ p.pregunta }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="label">Respuesta <span class="req">*</span></label>
                            <textarea v-model="respForm.respuesta" class="textarea" rows="5"
                                placeholder="Escribe la respuesta detallada..."></textarea>
                        </div>
                        <button type="submit" class="btn-primary btn-full" :disabled="saving">
                            <i class="ti ti-device-floppy"></i> Guardar respuesta
                        </button>
                    </form>
                </div>
            </section>

            <section class="card">
                <div class="card-header"><i class="ti ti-list"></i> Respuestas registradas</div>
                <div class="table-wrap">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Pregunta</th>
                                <th>Respuesta</th>
                                <th class="col-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading"><td colspan="3" class="empty-cell">Cargando...</td></tr>
                            <tr v-else-if="!respuestas.length"><td colspan="3" class="empty-cell">Sin respuestas
                                    registradas aún.</td></tr>
                            <tr v-for="r in respuestas" :key="r.id">
                                <td><strong>{{ r.pregunta }}</strong></td>
                                <td class="td-muted" :title="r.respuesta">{{ truncate(r.respuesta, 120) }}</td>
                                <td class="col-actions">
                                    <button class="btn-icon btn-edit" title="Editar" @click="abrirEditarRespuesta(r)">
                                        <i class="ti ti-edit"></i>
                                    </button>
                                    <button class="btn-icon btn-delete" title="Eliminar"
                                        @click="confirmarEliminarRespuesta(r)">
                                        <i class="ti ti-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <!-- ===================== MODAL DE EDICIÓN ===================== -->
        <div v-if="editModal.show" class="modal-overlay" @click.self="cerrarEditar">
            <div class="modal-box modal-form">
                <header class="modal-form-header">
                    <h3>{{ editTitle }}</h3>
                    <button class="modal-x" @click="cerrarEditar" aria-label="Cerrar"><i class="ti ti-x"></i></button>
                </header>

                <div class="modal-form-body">
                    <!-- CATEGORÍA -->
                    <template v-if="editModal.type === 'categoria'">
                        <div class="field">
                            <label class="label">Nombre <span class="req">*</span></label>
                            <input v-model="editData.nombre" type="text" class="input" />
                        </div>
                        <div class="field">
                            <label class="label">Descripción</label>
                            <textarea v-model="editData.descripcion" class="textarea" rows="3"></textarea>
                        </div>
                    </template>

                    <!-- SUBCATEGORÍA -->
                    <template v-else-if="editModal.type === 'subcategoria'">
                        <div class="field">
                            <label class="label">Categoría <span class="req">*</span></label>
                            <select v-model="editData.categoria_id" class="select">
                                <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="label">Nombre <span class="req">*</span></label>
                            <input v-model="editData.nombre" type="text" class="input" />
                        </div>
                        <div class="field">
                            <label class="label">Descripción</label>
                            <textarea v-model="editData.descripcion" class="textarea" rows="3"></textarea>
                        </div>
                    </template>

                    <!-- PREGUNTA -->
                    <template v-else-if="editModal.type === 'pregunta'">
                        <div class="field">
                            <label class="label">Categoría <span class="req">*</span></label>
                            <select v-model="editData.categoria_id" class="select"
                                @change="editData.subcategoria_id = ''">
                                <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="label">Subcategoría <span class="req">*</span></label>
                            <select v-model="editData.subcategoria_id" class="select">
                                <option value="">Seleccione una subcategoría</option>
                                <option v-for="s in subcategoriasEdit" :key="s.id" :value="s.id">{{ s.nombre }}</option>
                            </select>
                        </div>
                        <div class="field">
                            <label class="label">Pregunta <span class="req">*</span></label>
                            <input v-model="editData.pregunta" type="text" class="input" />
                        </div>
                    </template>

                    <!-- RESPUESTA -->
                    <template v-else-if="editModal.type === 'respuesta'">
                        <div class="field">
                            <label class="label">Pregunta</label>
                            <input :value="editData.pregunta" type="text" class="input" disabled />
                        </div>
                        <div class="field">
                            <label class="label">Respuesta <span class="req">*</span></label>
                            <textarea v-model="editData.respuesta" class="textarea" rows="5"></textarea>
                        </div>
                    </template>
                </div>

                <footer class="modal-form-footer">
                    <button class="btn-secondary" @click="cerrarEditar">Cancelar</button>
                    <button class="btn-primary" :disabled="saving" @click="guardarEdicion">
                        <i class="ti ti-loader-2 spin" v-if="saving"></i>
                        <i class="ti ti-device-floppy" v-else></i>
                        Guardar cambios
                    </button>
                </footer>
            </div>
        </div>

        <!-- ===================== MODAL DE ELIMINACIÓN ===================== -->
        <div v-if="deleteModal.show" class="modal-overlay" @click.self="deleteModal.show = false">
            <div class="modal-box">
                <div class="modal-warning-icon"><i class="ti ti-alert-triangle"></i></div>
                <h3>¿Eliminar {{ deleteModal.tipo }}?</h3>
                <p v-html="deleteModal.mensaje"></p>
                <div class="modal-actions">
                    <button class="btn-secondary" @click="deleteModal.show = false">Cancelar</button>
                    <button class="btn-danger" :disabled="deleting" @click="ejecutarEliminacion">
                        <i class="ti ti-loader-2 spin" v-if="deleting"></i>
                        <i class="ti ti-trash" v-else></i>
                        {{ deleting ? 'Eliminando...' : 'Eliminar' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- TOAST -->
        <div v-if="toast.show" class="toast" :class="toast.type">
            <i :class="toast.type === 'success' ? 'ti ti-check' : 'ti ti-alert-circle'"></i>
            {{ toast.msg }}
        </div>

    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import api from '@/services/api'

interface Categoria { id: number; nombre: string; descripcion: string | null }
interface Subcategoria { id: number; categoria_id: number; nombre: string; descripcion: string | null }
interface Pregunta {
    id: number; pregunta: string
    subcategoria_id: number; subcategoria: string | null
    categoria_id: number; categoria: string | null
    respuesta_id: number | null; respuesta: string | null
}
interface Respuesta { id: number; pregunta_id: number; respuesta: string; pregunta: string }

type TabId = 'categorias' | 'subcategorias' | 'preguntas' | 'respuestas'
const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'categorias', label: 'Categorías', icon: 'ti ti-folder' },
    { id: 'subcategorias', label: 'Subcategorías', icon: 'ti ti-folders' },
    { id: 'preguntas', label: 'Preguntas', icon: 'ti ti-help-circle' },
    { id: 'respuestas', label: 'Respuestas', icon: 'ti ti-message-2' },
]
const activeTab = ref<TabId>('categorias')

const categorias = ref<Categoria[]>([])
const subcategorias = ref<Subcategoria[]>([])
const preguntas = ref<Pregunta[]>([])
const respuestas = ref<Respuesta[]>([])

const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

const catForm = ref({ nombre: '', descripcion: '' })
const subForm = ref({ categoria_id: '' as number | '', nombre: '', descripcion: '' })
const pregForm = ref({ categoria_id: '' as number | '', subcategoria_id: '' as number | '', pregunta: '' })
const respForm = ref({ pregunta_id: '' as number | '', respuesta: '' })

const editModal = ref<{ show: boolean; type: '' | 'categoria' | 'subcategoria' | 'pregunta' | 'respuesta' }>({ show: false, type: '' })
const editData = ref<any>({})

const deleteModal = ref<{ show: boolean; tipo: string; mensaje: string; accion: null | (() => Promise<void>) }>({
    show: false, tipo: '', mensaje: '', accion: null,
})

const toast = ref({ show: false, msg: '', type: 'success' as 'success' | 'error' })

// ─── Computeds ────────────────────────────────────────────────────────────────
const subcategoriasForm = computed(() =>
    subcategorias.value.filter((s) => String(s.categoria_id) === String(pregForm.value.categoria_id)),
)
const subcategoriasEdit = computed(() =>
    subcategorias.value.filter((s) => String(s.categoria_id) === String(editData.value.categoria_id)),
)
const editTitle = computed(() => {
    const map: Record<string, string> = {
        categoria: 'Editar categoría', subcategoria: 'Editar subcategoría',
        pregunta: 'Editar pregunta', respuesta: 'Editar respuesta',
    }
    return map[editModal.value.type] || 'Editar'
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
function categoriaNombre(id: number) {
    return categorias.value.find((c) => c.id == id)?.nombre ?? '—'
}
function truncate(text: string | null, max: number) {
    if (!text) return '—'
    return text.length <= max ? text : text.substring(0, max - 3) + '...'
}
function showToast(msg: string, type: 'success' | 'error' = 'success') {
    toast.value = { show: true, msg, type }
    setTimeout(() => { toast.value.show = false }, 3200)
}

async function postAction(params: Record<string, string | number>) {
    const body = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => body.append(k, String(v)))
    const res = await api.post('/chat/backend.php', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return res.data
}

// ─── Carga de datos ───────────────────────────────────────────────────────────
async function loadCategorias() {
    const res = await api.get('/chat/backend.php?action=get_categories')
    if (res.data.success) categorias.value = res.data.data || []
}
async function loadSubcategorias() {
    const res = await api.get('/chat/backend.php?action=get_all_subcategories')
    if (res.data.success) subcategorias.value = res.data.data || []
}
async function loadPreguntas() {
    const res = await api.get('/chat/backend.php?action=get_questions')
    if (res.data.success) preguntas.value = res.data.data || []
}
async function loadRespuestas() {
    const res = await api.get('/chat/backend.php?action=get_answers')
    if (res.data.success) respuestas.value = res.data.data || []
}
async function loadAll() {
    loading.value = true
    try {
        await Promise.all([loadCategorias(), loadSubcategorias(), loadPreguntas(), loadRespuestas()])
    } catch {
        showToast('Error al cargar la información', 'error')
    } finally {
        loading.value = false
    }
}

// ─── Crear: categorías ────────────────────────────────────────────────────────
async function guardarCategoria() {
    if (!catForm.value.nombre.trim()) return showToast('El nombre es obligatorio', 'error')
    saving.value = true
    try {
        const data = await postAction({ action: 'save_category', nombre: catForm.value.nombre, descripcion: catForm.value.descripcion })
        showToast(data.message, data.success ? 'success' : 'error')
        if (data.success) {
            catForm.value = { nombre: '', descripcion: '' }
            await loadCategorias()
        }
    } catch { showToast('Error de conexión', 'error') }
    finally { saving.value = false }
}

// ─── Crear: subcategorías ─────────────────────────────────────────────────────
async function guardarSubcategoria() {
    if (!subForm.value.categoria_id) return showToast('Seleccione una categoría', 'error')
    if (!subForm.value.nombre.trim()) return showToast('El nombre es obligatorio', 'error')
    saving.value = true
    try {
        const data = await postAction({
            action: 'save_subcategory', categoria_id: subForm.value.categoria_id,
            nombre: subForm.value.nombre, descripcion: subForm.value.descripcion,
        })
        showToast(data.message, data.success ? 'success' : 'error')
        if (data.success) {
            subForm.value.nombre = ''
            subForm.value.descripcion = ''
            await loadSubcategorias()
        }
    } catch { showToast('Error de conexión', 'error') }
    finally { saving.value = false }
}

// ─── Crear: preguntas ─────────────────────────────────────────────────────────
async function guardarPregunta() {
    if (!pregForm.value.subcategoria_id) return showToast('Seleccione una subcategoría', 'error')
    if (!pregForm.value.pregunta.trim()) return showToast('La pregunta es obligatoria', 'error')
    saving.value = true
    try {
        const data = await postAction({
            action: 'save_question', subcategoria_id: pregForm.value.subcategoria_id, pregunta: pregForm.value.pregunta,
        })
        showToast(data.message, data.success ? 'success' : 'error')
        if (data.success) {
            pregForm.value.pregunta = ''
            await loadPreguntas()
        }
    } catch { showToast('Error de conexión', 'error') }
    finally { saving.value = false }
}

// ─── Crear / reemplazar: respuestas ───────────────────────────────────────────
async function guardarRespuesta() {
    if (!respForm.value.pregunta_id) return showToast('Seleccione una pregunta', 'error')
    if (!respForm.value.respuesta.trim()) return showToast('La respuesta es obligatoria', 'error')
    saving.value = true
    try {
        const data = await postAction({
            action: 'save_answer', pregunta_id: respForm.value.pregunta_id, respuesta: respForm.value.respuesta,
        })
        showToast(data.message, data.success ? 'success' : 'error')
        if (data.success) {
            respForm.value = { pregunta_id: '', respuesta: '' }
            await Promise.all([loadRespuestas(), loadPreguntas()])
        }
    } catch { showToast('Error de conexión', 'error') }
    finally { saving.value = false }
}

// ─── Edición ──────────────────────────────────────────────────────────────────
function abrirEditarCategoria(c: Categoria) {
    editData.value = { id: c.id, nombre: c.nombre, descripcion: c.descripcion || '' }
    editModal.value = { show: true, type: 'categoria' }
}
function abrirEditarSubcategoria(s: Subcategoria) {
    editData.value = { id: s.id, categoria_id: s.categoria_id, nombre: s.nombre, descripcion: s.descripcion || '' }
    editModal.value = { show: true, type: 'subcategoria' }
}
function abrirEditarPregunta(p: Pregunta) {
    editData.value = { id: p.id, categoria_id: p.categoria_id, subcategoria_id: p.subcategoria_id, pregunta: p.pregunta }
    editModal.value = { show: true, type: 'pregunta' }
}
function abrirEditarRespuesta(r: Respuesta) {
    editData.value = { pregunta_id: r.pregunta_id, pregunta: r.pregunta, respuesta: r.respuesta }
    editModal.value = { show: true, type: 'respuesta' }
}
function cerrarEditar() {
    editModal.value = { show: false, type: '' }
    editData.value = {}
}

async function guardarEdicion() {
    const type = editModal.value.type
    const d = editData.value
    let params: Record<string, string | number> | null = null

    if (type === 'categoria') {
        if (!d.nombre?.trim()) return showToast('El nombre es obligatorio', 'error')
        params = { action: 'update_category', id: d.id, nombre: d.nombre, descripcion: d.descripcion || '' }
    } else if (type === 'subcategoria') {
        if (!d.categoria_id) return showToast('Seleccione una categoría', 'error')
        if (!d.nombre?.trim()) return showToast('El nombre es obligatorio', 'error')
        params = { action: 'update_subcategory', id: d.id, categoria_id: d.categoria_id, nombre: d.nombre, descripcion: d.descripcion || '' }
    } else if (type === 'pregunta') {
        if (!d.subcategoria_id) return showToast('Seleccione una subcategoría', 'error')
        if (!d.pregunta?.trim()) return showToast('La pregunta es obligatoria', 'error')
        params = { action: 'update_question', id: d.id, subcategoria_id: d.subcategoria_id, pregunta: d.pregunta }
    } else if (type === 'respuesta') {
        if (!d.respuesta?.trim()) return showToast('La respuesta es obligatoria', 'error')
        params = { action: 'save_answer', pregunta_id: d.pregunta_id, respuesta: d.respuesta }
    }
    if (!params) return

    saving.value = true
    try {
        const data = await postAction(params)
        showToast(data.message, data.success ? 'success' : 'error')
        if (data.success) {
            cerrarEditar()
            await loadAll()
        }
    } catch { showToast('Error de conexión', 'error') }
    finally { saving.value = false }
}

// ─── Eliminación ──────────────────────────────────────────────────────────────
function confirmarEliminarCategoria(c: Categoria) {
    deleteModal.value = {
        show: true, tipo: 'categoría',
        mensaje: `Estás a punto de eliminar <strong>${c.nombre}</strong>. También se eliminarán sus subcategorías, preguntas y respuestas asociadas.`,
        accion: async () => { await eliminar({ action: 'delete_category', id: c.id }) },
    }
}
function confirmarEliminarSubcategoria(s: Subcategoria) {
    deleteModal.value = {
        show: true, tipo: 'subcategoría',
        mensaje: `Estás a punto de eliminar <strong>${s.nombre}</strong>. También se eliminarán sus preguntas y respuestas asociadas.`,
        accion: async () => { await eliminar({ action: 'delete_subcategory', id: s.id }) },
    }
}
function confirmarEliminarPregunta(p: Pregunta) {
    deleteModal.value = {
        show: true, tipo: 'pregunta',
        mensaje: `Estás a punto de eliminar la pregunta <strong>${p.pregunta}</strong> y su respuesta asociada.`,
        accion: async () => { await eliminar({ action: 'delete_question', id: p.id }) },
    }
}
function confirmarEliminarRespuesta(r: Respuesta) {
    deleteModal.value = {
        show: true, tipo: 'respuesta',
        mensaje: `Estás a punto de eliminar la respuesta de <strong>${r.pregunta}</strong>.`,
        accion: async () => { await eliminar({ action: 'delete_answer', id: r.id }) },
    }
}

async function eliminar(params: Record<string, string | number>) {
    const data = await postAction(params)
    showToast(data.message, data.success ? 'success' : 'error')
    if (data.success) await loadAll()
}

async function ejecutarEliminacion() {
    if (!deleteModal.value.accion) return
    deleting.value = true
    try {
        await deleteModal.value.accion()
    } catch { showToast('Error de conexión', 'error') }
    finally {
        deleting.value = false
        deleteModal.value.show = false
    }
}

onMounted(loadAll)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.content-header {
    margin-bottom: 24px;
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
    max-width: 70ch;
}

/* ─── TABS ───────────────────────────────────────────── */
.tablist {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 22px;
    border-bottom: 1.5px solid #e2e8f0;
}

.tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: none;
    border: none;
    border-bottom: 2.5px solid transparent;
    padding: 10px 14px;
    margin-bottom: -1.5px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
}

.tab-btn i {
    font-size: 17px;
}

.tab-btn:hover {
    color: #0f1a8c;
}

.tab-btn.active {
    color: #0f1a8c;
    border-bottom-color: #ffd500;
}

/* ─── LAYOUT ─────────────────────────────────────────── */
.split-grid {
    display: grid;
    grid-template-columns: minmax(320px, 420px) 1fr;
    gap: 20px;
    align-items: start;
}

.card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 20px;
    border-bottom: 1px solid #f1f5f9;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a2e;
}

.card-header i {
    color: #0f1a8c;
    font-size: 16px;
}

.card-body {
    padding: 20px;
}

/* ─── FORM ───────────────────────────────────────────── */
.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
    font-family: 'Outfit', sans-serif;
}

.field:last-child {
    margin-bottom: 16px;
}

.label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
}

.req {
    color: #ef4444;
}

.hint {
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
    font-family: 'Outfit', sans-serif;
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

.input:disabled,
.select:disabled {
    background: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
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

/* ─── TABLA ──────────────────────────────────────────── */
.table-wrap {
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Outfit', sans-serif;
}

.data-table th {
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #94a3b8;
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    background: #fafbff;
    white-space: nowrap;
}

.data-table td {
    padding: 13px 16px;
    border-bottom: 1px solid #f1f5f9;
    font-size: 13.5px;
    color: #1a1a2e;
    vertical-align: middle;
}

.data-table tbody tr:last-child td {
    border-bottom: none;
}

.data-table tbody tr:hover {
    background: #fafbff;
}

.td-muted {
    color: #64748b;
}

.empty-cell {
    text-align: center;
    color: #94a3b8;
    padding: 32px 16px !important;
    font-size: 14px;
}

.col-actions {
    text-align: right;
    white-space: nowrap;
}

.chip {
    display: inline-block;
    padding: 3px 10px;
    background: #eef2ff;
    color: #0f1a8c;
    border: 1px solid #c7d2fe;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}

.badge-ok {
    background: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
}

.badge-none {
    background: #fff7ed;
    color: #c2410c;
    border: 1px solid #fed7aa;
}

/* ─── BOTONES ────────────────────────────────────────── */
.btn-icon {
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: white;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.15s;
    color: #64748b;
    margin-left: 6px;
}

.btn-edit:hover {
    background: #eef2ff;
    color: #0f1a8c;
    border-color: #a8b3e0;
}

.btn-delete:hover {
    background: #fef2f2;
    color: #b91c1c;
    border-color: #fecaca;
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
    padding: 11px 22px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
}

.btn-primary:hover:not(:disabled) {
    background: #ffe033;
    transform: translateY(-1px);
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
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: #f8fafc;
}

.btn-danger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #ef4444;
    color: white;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-danger:hover:not(:disabled) {
    background: #dc2626;
}

.btn-danger:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-full {
    width: 100%;
}

/* ─── MODALES ────────────────────────────────────────── */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 26, 140, 0.4);
    backdrop-filter: blur(3px);
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.modal-box {
    background: white;
    border-radius: 16px;
    padding: 36px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 24px 60px rgba(15, 26, 140, 0.25);
}

.modal-warning-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #f59e0b;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
}

.modal-box h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 10px;
}

.modal-box p {
    font-size: 14px;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 24px;
}

.modal-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
}

/* Modal con formulario (edición) */
.modal-form {
    text-align: left;
    padding: 0;
    max-width: 480px;
    overflow: hidden;
}

.modal-form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
}

.modal-form-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #1a1a2e;
}

.modal-x {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #94a3b8;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
}

.modal-x:hover {
    background: #f1f5f9;
    color: #1a1a2e;
}

.modal-form-body {
    padding: 22px 24px 6px;
}

.modal-form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 16px 24px;
    border-top: 1px solid #f1f5f9;
    background: #fafbff;
}

/* ─── TOAST ──────────────────────────────────────────── */
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

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 980px) {
    .split-grid {
        grid-template-columns: 1fr;
    }
}
</style>
