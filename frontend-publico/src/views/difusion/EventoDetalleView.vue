<template>
  <div class="detalle-page">

    <!-- LOADING -->
    <div v-if="loading" class="estado-msg">
      <i class="ti ti-loader-2 spin"></i>
      Cargando evento...
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="estado-msg error">
      <i class="ti ti-alert-circle"></i>
      No se pudo cargar el evento.
      <button class="btn-volver" @click="$router.push('/eventos')">
        <i class="ti ti-arrow-left"></i> Volver a eventos
      </button>
    </div>

    <!-- CONTENIDO -->
    <template v-else-if="evento">

      <!-- HERO -->
      <section class="detalle-hero"
        :style="evento.thumbnailImage ? `background-image: url(${evento.thumbnailImage})` : ''">
        <div class="detalle-hero-overlay"></div>
        <div class="detalle-hero-content">
          <button class="btn-volver" @click="$router.push('/eventos')">
            <i class="ti ti-arrow-left"></i> Volver a eventos
          </button>
          <span class="evento-tag">{{ evento.categoryLabel }}</span>
          <h1>{{ evento.title }}</h1>
          <div class="detalle-meta">
            <span><i class="ti ti-calendar"></i> {{ formatDate(evento.date) }}</span>
            <span v-if="evento.author"><i class="ti ti-user"></i> {{ evento.author }}</span>
          </div>
        </div>
      </section>

      <!-- CUERPO -->
      <section class="detalle-body">
        <div class="detalle-inner">

          <p class="detalle-lead">{{ evento.shortDescription }}</p>

          <div v-if="evento.thumbnailImage" class="detalle-img-wrap">
            <img :src="evento.thumbnailImage" :alt="evento.title" class="detalle-img" />
          </div>

          <div v-if="evento.content" class="detalle-content" v-html="evento.content"></div>
          <div v-else class="detalle-content">
            <p>{{ evento.shortDescription }}</p>
          </div>

          <div class="detalle-footer">
            <div class="detalle-footer-info">
              <span v-if="evento.date">
                <i class="ti ti-calendar"></i> {{ formatDate(evento.date) }}
              </span>
              <span v-if="evento.categoryLabel">
                <i class="ti ti-tag"></i> {{ evento.categoryLabel }}
              </span>
            </div>
            <button class="btn-compartir" @click="compartir">
              <i class="ti ti-share"></i> Compartir
            </button>
          </div>

        </div>

        <!-- EVENTOS RELACIONADOS -->
        <div v-if="relacionados.length > 0" class="relacionadas">
          <div class="relacionadas-inner">
            <h2 class="relacionadas-titulo">Más eventos</h2>
            <div class="relacionadas-grid">
              <div v-for="rel in relacionados" :key="rel.id" class="rel-card"
                @click="$router.push(`/eventos/${rel.id}`)">
                <div class="rel-img">
                  <img v-if="rel.thumbnailImage" :src="rel.thumbnailImage" :alt="rel.title" loading="lazy" />
                  <i v-else class="ti ti-calendar-event"></i>
                </div>
                <div class="rel-body">
                  <span class="evento-tag small">{{ rel.categoryLabel }}</span>
                  <h3>{{ truncate(rel.title, 70) }}</h3>
                  <span class="rel-fecha"><i class="ti ti-calendar"></i> {{ formatDate(rel.date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </template>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const evento = ref<any>(null)
const relacionados = ref<any[]>([])
const loading = ref(true)
const error = ref(false)

const mesesLargo = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function formatDate(dateString: string) {
  if (!dateString) return ''
  const d = new Date(dateString + 'T00:00:00')
  return `${mesesLargo[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`
}

function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length <= max ? text : text.substring(0, max) + '...'
}

function compartir() {
  if (navigator.share) {
    navigator.share({ title: evento.value?.title, url: window.location.href })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Enlace copiado al portapapeles')
  }
}

async function cargarEvento(id: string) {
  loading.value = true
  error.value = false
  evento.value = null

  try {
    const res = await api.get(`/events/get-event.php?id=${id}`)
    if (res.data.success) {
      evento.value = res.data.data
    } else {
      error.value = true
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }

  try {
    const res = await api.get('/events/get-all-events.php')
    if (res.data.success) {
      relacionados.value = res.data.data
        .filter((e: any) => String(e.id) !== String(id))
        .slice(0, 3)
    }
  } catch {
    // silencioso
  }
}

onMounted(() => cargarEvento(route.params.id as string))

watch(() => route.params.id, (newId) => {
  if (newId) {
    cargarEvento(newId as string)
    window.scrollTo(0, 0)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.detalle-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
  min-height: 100vh;
}

.detalle-hero {
  min-height: 360px;
  background: linear-gradient(135deg, #0f1a8c, #1a2db5);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
}

.detalle-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(15, 26, 140, 0.5) 0%, rgba(15, 26, 140, 0.95) 100%);
}

.detalle-hero-content {
  position: relative;
  z-index: 1;
  padding: 48px;
  color: white;
  max-width: 860px;
}

.btn-volver {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.2s;
}

.btn-volver:hover {
  background: rgba(255, 255, 255, 0.2);
}

.evento-tag {
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  background: #ffd500;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 12px;
}

.evento-tag.small {
  font-size: 10px;
  background: #e8ecff;
  color: #0f1a8c;
}

.detalle-hero-content h1 {
  font-size: clamp(22px, 3.5vw, 38px);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.detalle-meta {
  display: flex;
  gap: 20px;
  font-size: 13px;
  opacity: 0.75;
  flex-wrap: wrap;
}

.detalle-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.detalle-body {
  padding-bottom: 64px;
}

.detalle-inner {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 24px;
}

.detalle-lead {
  font-size: 17px;
  font-weight: 500;
  color: #333;
  line-height: 1.7;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 2px solid rgba(15, 26, 140, 0.1);
}

.detalle-img-wrap {
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.detalle-img {
  width: 100%;
  height: auto;
  display: block;
  max-height: 460px;
  object-fit: cover;
}

.detalle-content {
  font-size: 15px;
  color: #444;
  line-height: 1.8;
}

.detalle-content :deep(h2) {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 28px 0 12px;
}

.detalle-content :deep(h3) {
  font-size: 17px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 24px 0 10px;
}

.detalle-content :deep(p) {
  margin-bottom: 16px;
}

.detalle-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 16px 0;
}

.detalle-content :deep(ul),
.detalle-content :deep(ol) {
  padding-left: 24px;
  margin-bottom: 16px;
}

.detalle-content :deep(li) {
  margin-bottom: 6px;
}

.detalle-content :deep(a) {
  color: #0f1a8c;
  text-decoration: underline;
}

.detalle-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  gap: 12px;
}

.detalle-footer-info {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #888;
  flex-wrap: wrap;
}

.detalle-footer-info span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-compartir {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #0f1a8c;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-compartir:hover {
  background: #1a2db5;
}

.relacionadas {
  background: white;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  padding: 48px 0;
  margin-top: 16px;
}

.relacionadas-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;
}

.relacionadas-titulo {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
}

.relacionadas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.rel-card {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: #f4f5f9;
}

.rel-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(15, 26, 140, 0.1);
}

.rel-img {
  height: 130px;
  background: linear-gradient(135deg, #0f1a8c, #1a2db5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 28px;
  overflow: hidden;
}

.rel-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rel-body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rel-body h3 {
  font-size: 13px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.4;
}

.rel-fecha {
  font-size: 11px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

.estado-msg {
  text-align: center;
  padding: 120px 24px;
  font-size: 15px;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.estado-msg i {
  font-size: 40px;
  opacity: 0.4;
}

.estado-msg.error {
  color: #c0392b;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

@media (max-width: 900px) {
  .detalle-hero-content {
    padding: 32px 24px;
  }

  .detalle-inner {
    padding: 32px 20px;
  }

  .relacionadas-inner {
    padding: 0 24px;
  }

  .relacionadas-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .detalle-hero-content {
    padding: 24px 16px;
  }

  .detalle-inner {
    padding: 24px 16px;
  }

  .relacionadas-inner {
    padding: 0 16px;
  }

  .relacionadas-grid {
    grid-template-columns: 1fr;
  }

  .detalle-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>