<template>
  <AdminLayout title="Eventos" eyebrow="Módulos">
    <div class="content-header">
      <div>
        <h1 class="content-title">Gestión de Eventos</h1>
        <p class="content-desc">Crea, edita y administra los eventos académicos, culturales y deportivos de la facultad.
        </p>
      </div>
      <RouterLink to="/eventos/crear" class="btn-primary">
        <i class="ti ti-plus"></i> Nuevo evento
      </RouterLink>
    </div>

    <!-- BUSCADOR -->
    <div class="search-bar">
      <i class="ti ti-search"></i>
      <input v-model="busqueda" type="text" placeholder="Buscar eventos por título..." class="search-input" />
      <button v-if="busqueda" class="search-clear" @click="busqueda = ''"><i class="ti ti-x"></i></button>
    </div>

    <!-- ESTADOS -->
    <div v-if="loading" class="estado-msg">
      <i class="ti ti-loader-2 spin"></i> Cargando eventos...
    </div>
    <div v-else-if="error" class="estado-msg error">
      <i class="ti ti-alert-circle"></i> No se pudieron cargar los eventos.
    </div>
    <div v-else-if="eventosFiltrados.length === 0" class="estado-msg">
      <i class="ti ti-calendar-off"></i>
      {{ busqueda ? 'No se encontraron eventos con ese criterio.' : 'No hay eventos publicados aún.' }}
    </div>

    <!-- LISTA -->
    <div v-else class="events-list">
      <div v-for="evento in eventosFiltrados" :key="evento.id" class="events-item">
        <div class="events-thumb">
          <img v-if="evento.thumbnailImage" :src="evento.thumbnailImage" :alt="evento.title" />
          <div v-else class="events-thumb-placeholder"><i class="ti ti-calendar-event"></i></div>
        </div>
        <div class="events-info">
          <h3>{{ evento.title }}</h3>
          <p class="events-desc">{{ truncate(evento.shortDescription, 120) }}</p>
          <div class="events-meta">
            <span><i class="ti ti-calendar"></i> {{ formatDate(evento.date) }}</span>
            <span><i class="ti ti-tag"></i> {{ evento.categoryLabel }}</span>
            <span class="events-id"><i class="ti ti-hash"></i> ID: {{ evento.id }}</span>
          </div>
        </div>
        <div class="events-actions">
          <RouterLink :to="`/eventos/editar/${evento.id}`" class="btn-icon btn-edit" title="Editar">
            <i class="ti ti-edit"></i>
          </RouterLink>
          <button class="btn-icon btn-delete" @click="confirmarEliminar(evento)" title="Eliminar">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="modalEliminar" class="modal-overlay" @click.self="modalEliminar = false">
      <div class="modal-box">
        <div class="modal-warning-icon"><i class="ti ti-alert-triangle"></i></div>
        <h3>¿Eliminar evento?</h3>
        <p>Estás a punto de eliminar <strong>{{ eventoAEliminar?.title }}</strong>. Esta acción no se puede deshacer.
        </p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="modalEliminar = false">Cancelar</button>
          <button class="btn-danger" @click="eliminarEvento" :disabled="eliminando">
            <i class="ti ti-loader-2 spin" v-if="eliminando"></i>
            <i class="ti ti-trash" v-else></i>
            {{ eliminando ? 'Eliminando...' : 'Eliminar' }}
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
import { RouterLink } from 'vue-router'
import AdminLayout from '@/components/AdminLayout.vue'
import api from '@/services/api'

const eventos = ref<any[]>([])
const loading = ref(true)
const error = ref(false)
const busqueda = ref('')
const modalEliminar = ref(false)
const eventoAEliminar = ref<any>(null)
const eliminando = ref(false)
const toast = ref({ show: false, msg: '', type: 'success' })

const mesesLargo = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function formatDate(d: string) {
  const fecha = new Date(d + 'T00:00:00')
  return `${mesesLargo[fecha.getMonth()]} ${String(fecha.getDate()).padStart(2, '0')}, ${fecha.getFullYear()}`
}

function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length <= max ? text : text.substring(0, max) + '...'
}

const eventosFiltrados = computed(() => {
  if (!busqueda.value.trim()) return eventos.value
  const q = busqueda.value.toLowerCase()
  return eventos.value.filter(e => e.title?.toLowerCase().includes(q))
})

function showToast(msg: string, type = 'success') {
  toast.value = { show: true, msg, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

function confirmarEliminar(evento: any) {
  eventoAEliminar.value = evento
  modalEliminar.value = true
}

async function eliminarEvento() {
  if (!eventoAEliminar.value) return
  eliminando.value = true
  try {
    const res = await api.post(`/events/delete-event.php`, { id: eventoAEliminar.value.id })
    if (res.data.success) {
      eventos.value = eventos.value.filter(e => e.id !== eventoAEliminar.value.id)
      showToast('Evento eliminado exitosamente')
    } else {
      showToast(res.data.message || 'Error al eliminar', 'error')
    }
  } catch {
    showToast('Error de conexión', 'error')
  } finally {
    eliminando.value = false
    modalEliminar.value = false
    eventoAEliminar.value = null
  }
}

onMounted(async () => {
  try {
    const res = await api.get('/events/get-all-events.php')
    if (res.data.success) eventos.value = res.data.data
    else error.value = true
  } catch { error.value = true }
  finally { loading.value = false }
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
}

.content-desc {
  font-size: 14px;
  color: #64748b;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffd500;
  color: #0f1a8c;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
  white-space: nowrap;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: #ffe033;
  transform: translateY(-1px);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 14px;
  margin-bottom: 20px;
  transition: border-color 0.2s;
}

.search-bar:focus-within {
  border-color: #0f1a8c;
}

.search-bar i {
  font-size: 16px;
  color: #94a3b8;
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  color: #1a1a2e;
  flex: 1;
  background: transparent;
}

.search-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  font-size: 16px;
  padding: 0;
  display: flex;
}

.estado-msg {
  text-align: center;
  padding: 60px 24px;
  font-size: 15px;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  font-family: 'Outfit', sans-serif;
}

.estado-msg i {
  font-size: 40px;
  opacity: 0.4;
}

.estado-msg.error {
  color: #b91c1c;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.events-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px 20px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
}

.events-item:hover {
  border-color: #a8b3e0;
  box-shadow: 0 4px 16px rgba(15, 26, 140, 0.08);
  transform: translateY(-1px);
}

.events-thumb {
  width: 72px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: #eef2ff;
}

.events-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.events-thumb-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #a8b3e0;
}

.events-info {
  flex: 1;
  min-width: 0;
}

.events-info h3 {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.events-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  margin-bottom: 8px;
}

.events-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: #94a3b8;
}

.events-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.events-id {
  color: #c7d2fe;
}

.events-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1.5px solid #e2e8f0;
  background: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s;
  color: #64748b;
  text-decoration: none;
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

@media (max-width: 600px) {
  .events-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .events-thumb {
    width: 100%;
    height: 140px;
  }

  .events-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>