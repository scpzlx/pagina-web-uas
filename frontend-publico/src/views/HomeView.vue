<template>
  <div class="home">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-slide active" style="background-image: url('/images/ImageHero.jpg')"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-badge">
            <i class="ti ti-palette"></i>
            Facultad de Artes · UAS
          </div>
          <h1>Escuela de Diseño y <span>Artes Visuales</span></h1>
          <p>Formamos creadores capaces de comunicar ideas, emociones y valores a través de la imagen, el color y la
            forma. Fomentamos la experimentación, la innovación y el pensamiento crítico.</p>
          <div class="hero-btns">
            <RouterLink to="/carreras/artes-visuales" class="btn-primary">Conocer oferta educativa</RouterLink>
            <RouterLink to="/eventos" class="btn-outline">Ver eventos →</RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-cards">
            <RouterLink to="/carreras/artes-visuales" class="hero-card">
              <div class="hero-card-icon"><i class="ti ti-palette"></i></div>
              <h3>Artes Visuales</h3>
              <p>Licenciatura · 4 años</p>
            </RouterLink>
            <RouterLink to="/carreras/diseno-arte-multimedia" class="hero-card">
              <div class="hero-card-icon"><i class="ti ti-devices"></i></div>
              <h3>Diseño Multimedia</h3>
              <p>Licenciatura · 4 años</p>
            </RouterLink>
            <RouterLink to="/carreras/fotografia-produccion-video" class="hero-card">
              <div class="hero-card-icon"><i class="ti ti-camera"></i></div>
              <h3>Fotografía y Video</h3>
              <p>Licenciatura · 4 años</p>
            </RouterLink>
            <div class="hero-card">
              <div class="hero-card-icon"><i class="ti ti-users"></i></div>
              <h3>+500 Estudiantes</h3>
              <p>Activos este ciclo</p>
            </div>
          </div>
          <div class="hero-card-wide">
            <i class="ti ti-calendar-event"></i>
            <div>
              <strong>Ciclo 2025–2026</strong>
              Inscripciones abiertas · Consulta el calendario escolar
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR -->
    <section class="stats-bar">
      <div class="stat">
        <div class="stat-n">3</div>
        <div class="stat-l">Licenciaturas</div>
      </div>
      <div class="stat">
        <div class="stat-n">500+</div>
        <div class="stat-l">Estudiantes activos</div>
      </div>
      <div class="stat">
        <div class="stat-n">1957</div>
        <div class="stat-l">Año de fundación</div>
      </div>
      <div class="stat">
        <div class="stat-n">68</div>
        <div class="stat-l">Años de historia</div>
      </div>
    </section>

    <!-- EVENTOS — azul -->
    <section class="section">
      <div class="section-header">
        <div>
          <div class="section-tag">Próximos</div>
          <div class="section-title">Eventos</div>
        </div>
        <RouterLink to="/eventos" class="ver-todos">Ver todos →</RouterLink>
      </div>
      <div v-if="loadingEventos" class="loading-msg loading-light">Cargando eventos...</div>
      <div v-else-if="errorEventos" class="error-msg error-light">No se pudieron cargar los eventos.</div>
      <div v-else-if="eventos.length === 0" class="empty-msg loading-light">No hay eventos disponibles.</div>
      <div v-else class="eventos-layout">
        <div class="evento-featured" @click="$router.push(`/eventos/${eventos[0].id}`)">
          <div class="evento-featured-img">
            <div class="ef-day">{{ getDia(eventos[0].date) }}</div>
            <div class="ef-month">{{ getMes(eventos[0].date) }}</div>
            <div class="ef-year">{{ new Date(eventos[0].date + 'T00:00:00').getFullYear() }}</div>
          </div>
          <div class="evento-featured-body">
            <span class="ev-cat-pill">{{ eventos[0].categoryLabel }}</span>
            <div class="ev-featured-title">{{ truncate(eventos[0].title, 80) }}</div>
            <div class="ev-featured-desc">{{ truncate(eventos[0].shortDescription, 130) }}</div>
            <div class="ev-featured-footer">
              <i class="ti ti-map-pin"></i>
              {{ eventos[0].location || 'Facultad de Artes · UAS' }}
            </div>
          </div>
        </div>
        <div class="eventos-stack">
          <div v-for="evento in eventos.slice(1)" :key="evento.id" class="evento-mini"
            @click="$router.push(`/eventos/${evento.id}`)">
            <div class="ev-mini-date">
              <div class="ev-mini-day">{{ getDia(evento.date) }}</div>
              <div class="ev-mini-month">{{ getMes(evento.date) }}</div>
            </div>
            <div class="ev-mini-body">
              <div class="ev-mini-cat">{{ evento.categoryLabel }}</div>
              <div class="ev-mini-title">{{ truncate(evento.title, 60) }}</div>
            </div>
            <i class="ti ti-chevron-right ev-mini-arrow"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- NOTICIAS — blanco -->
    <section class="section section-alt">
      <div class="section-header">
        <div>
          <div class="section-tag">Últimas</div>
          <div class="section-title">Noticias</div>
        </div>
        <RouterLink to="/noticias" class="ver-todos">Ver todas →</RouterLink>
      </div>
      <div v-if="loadingNoticias" class="loading-msg">Cargando noticias...</div>
      <div v-else-if="errorNoticias" class="error-msg">No se pudieron cargar las noticias.</div>
      <div v-else-if="noticias.length === 0" class="empty-msg">No hay noticias disponibles.</div>
      <div v-else class="cards-grid">
        <div v-for="noticia in noticias" :key="noticia.id" class="news-card"
          @click="$router.push(`/noticias/${noticia.id}`)">
          <div class="news-img" :style="noticia.thumbnailImage
            ? { backgroundImage: `url(${noticia.thumbnailImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}">
            <i v-if="!noticia.thumbnailImage" class="ti ti-photo news-img-placeholder"></i>
            <span class="news-cat-pill">{{ noticia.categoryLabel }}</span>
            <span class="news-date-pill">
              <i class="ti ti-calendar"></i> {{ formatDate(noticia.date) }}
            </span>
          </div>
          <div class="news-body">
            <div class="news-title">{{ truncate(noticia.title, 80) }}</div>
            <div class="news-desc">{{ truncate(noticia.shortDescription, 130) }}</div>
            <div class="news-footer">
              <span class="news-read">Leer más <i class="ti ti-arrow-right"></i></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VIDEOS — azul -->
    <section class="section videos-section">
      <div class="section-header">
        <div>
          <div class="section-tag">Conoce la escuela</div>
          <div class="section-title">Videos</div>
        </div>
      </div>
      <div class="videos-grid">
        <div v-for="video in videos" :key="video.id" class="video-card" @click="abrirVideo(video.url)">
          <div class="video-thumb">
            <img :src="video.thumb" :alt="video.title" />
            <div class="video-play"><i class="ti ti-player-play"></i></div>
            <div class="video-dur">{{ video.duracion }}</div>
          </div>
          <div class="video-body">
            <span class="video-tag">{{ video.tag }}</span>
            <div class="video-title">{{ video.title }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CALENDARIO — blanco -->
    <section class="calendario-section">
      <div class="cal-info">
        <div class="cal-tag">Ciclo 2025–2026</div>
        <div class="cal-title">Calendario<br>Escolar</div>
        <div class="cal-desc">Consulta los periodos de clases, vacaciones, inscripciones, exámenes y eventos académicos.
          Mantente al día y prepárate para un año lleno de aprendizaje y creatividad.</div>
        <button class="btn-primary" @click="abrirCalendario">Ver calendario completo</button>
      </div>
      <div class="cal-img-wrap">
        <div class="cal-img-inner" @click="abrirCalendario">
          <img src="/images/calendario.jpg" alt="Calendario escolar 2025-2026" class="cal-img" />
          <div class="cal-img-overlay">
            <i class="ti ti-zoom-in"></i>
            <span>Ver completo</span>
          </div>
        </div>
      </div>
    </section>

    <!-- OVERLAY CALENDARIO -->
    <div v-if="calendarioAbierto" class="cal-overlay" @click.self="cerrarCalendario">
      <button class="cal-overlay-close" @click="cerrarCalendario">×</button>
      <div class="cal-overlay-content" @wheel.prevent="onZoom" @mousedown="startPan" @mousemove="doPan"
        @mouseup="endPan" @mouseleave="endPan">
        <img src="/images/calendario.jpg" alt="Calendario ampliado"
          :style="{ transform: `scale(${zoomScale}) translate(${panX}px, ${panY}px)` }" />
      </div>
    </div>

    <!-- OVERLAY VIDEO -->
    <div v-if="videoAbierto" class="video-overlay" @click.self="cerrarVideo">
      <button class="cal-overlay-close" @click="cerrarVideo">×</button>
      <iframe :src="videoUrl" frameborder="0" allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        class="video-iframe"></iframe>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const eventos = ref<any[]>([])
const loadingEventos = ref(true)
const errorEventos = ref(false)

const noticias = ref<any[]>([])
const loadingNoticias = ref(true)
const errorNoticias = ref(false)

const videoAbierto = ref(false)
const videoUrl = ref('')

const videos = [
  { id: 1, title: 'Entrada a la Facultad', tag: 'TOUR', duracion: '0:13', url: 'https://www.youtube.com/embed/4VSbx5qFHYg', thumb: 'https://img.youtube.com/vi/4VSbx5qFHYg/maxresdefault.jpg' },
  { id: 2, title: 'Nuevo mural de la Escuela', tag: 'MURAL', duracion: '0:51', url: 'https://www.youtube.com/embed/fXfnmhqLyd0', thumb: 'https://img.youtube.com/vi/fXfnmhqLyd0/maxresdefault.jpg' },
  { id: 3, title: 'Nuevo mural de la Escuela', tag: 'MURAL', duracion: '0:43', url: 'https://www.youtube.com/embed/3HsDwl79l7Q', thumb: 'https://img.youtube.com/vi/3HsDwl79l7Q/maxresdefault.jpg' },
]

function abrirVideo(url: string) {
  videoUrl.value = url + '?autoplay=1'
  videoAbierto.value = true
}
function cerrarVideo() {
  videoAbierto.value = false
  videoUrl.value = ''
}

const calendarioAbierto = ref(false)
const zoomScale = ref(1)
const panX = ref(0)
const panY = ref(0)
let panning = false
let panStart = { x: 0, y: 0 }

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const mesesLargo = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function getDia(d: string) { return new Date(d + 'T00:00:00').getDate() }
function getMes(d: string) { return meses[new Date(d + 'T00:00:00').getMonth()] }
function formatDate(d: string) {
  const fecha = new Date(d + 'T00:00:00')
  return `${mesesLargo[fecha.getMonth()]} ${String(fecha.getDate()).padStart(2, '0')}, ${fecha.getFullYear()}`
}
function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length <= max ? text : text.substring(0, max) + '...'
}

function abrirCalendario() { calendarioAbierto.value = true; zoomScale.value = 1; panX.value = 0; panY.value = 0 }
function cerrarCalendario() { calendarioAbierto.value = false }
function onZoom(e: WheelEvent) {
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  zoomScale.value = Math.min(4, Math.max(0.5, zoomScale.value + delta))
}
function startPan(e: MouseEvent) {
  if (zoomScale.value <= 1) return
  panning = true
  panStart = { x: e.clientX - panX.value, y: e.clientY - panY.value }
}
function doPan(e: MouseEvent) { if (!panning) return; panX.value = e.clientX - panStart.x; panY.value = e.clientY - panStart.y }
function endPan() { panning = false }

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { cerrarCalendario(); cerrarVideo() }
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/events/get-all-events.php')
    if (res.data.success) eventos.value = res.data.data.slice(0, 3)
    else errorEventos.value = true
  } catch { errorEventos.value = true }
  finally { loadingEventos.value = false }

  try {
    const res = await axios.get('/api/news/get-all-news.php')
    if (res.data.success) noticias.value = res.data.data.slice(0, 3)
    else errorNoticias.value = true
  } catch { errorNoticias.value = true }
  finally { loadingNoticias.value = false }

  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.home {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ───────────────────────────────────────────── */
.hero {
  min-height: 560px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right,
      rgba(10, 10, 30, 0.80) 0%,
      rgba(10, 10, 30, 0.55) 45%,
      rgba(0, 0, 0, 0.15) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  width: 100%;
  padding: 64px 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 213, 0, 0.2);
  color: #ffd500;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.hero-text h1 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.hero-text h1 span {
  color: #ffd500;
}

.hero-text p {
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.9;
  margin-bottom: 32px;
  max-width: 480px;
}

.hero-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  background: #ffd500;
  color: #0f1a8c;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary:hover {
  background: #ffe033;
  transform: translateY(-1px);
}

.btn-outline {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.2);
}

.hero-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.hero-card {
  background: rgba(15, 26, 140, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 14px;
  padding: 20px;
  text-decoration: none;
  color: white;
  transition: background 0.2s;
  display: block;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.hero-card:hover {
  background: rgba(15, 26, 140, 0.75);
}

.hero-card-icon {
  font-size: 24px;
  color: #ffd500;
  margin-bottom: 10px;
}

.hero-card h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.hero-card p {
  font-size: 12px;
  opacity: 0.7;
}

.hero-card-wide {
  background: rgba(255, 213, 0, 0.2);
  border: 1px solid rgba(255, 213, 0, 0.4);
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
  font-size: 13px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.hero-card-wide i {
  font-size: 28px;
  color: #ffd500;
}

.hero-card-wide strong {
  display: block;
  font-size: 15px;
  margin-bottom: 2px;
}

/* ─── STATS BAR ──────────────────────────────────────── */
.stats-bar {
  background: #ffd500;
  padding: 24px 48px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.stat {
  text-align: center;
  border-right: 1px solid rgba(15, 26, 140, 0.15);
  padding: 8px 0;
}

.stat:last-child {
  border-right: none;
}

.stat-n {
  font-size: 26px;
  font-weight: 800;
  color: #0f1a8c;
}

.stat-l {
  font-size: 12px;
  font-weight: 600;
  color: #0f1a8c;
  opacity: 0.7;
  margin-top: 2px;
}

/* ─── LAYOUT SECCIONES ───────────────────────────────── */
.section {
  padding: 64px 48px;
  background: #0f1a8c;
}

.section-alt {
  background: white;
}

.videos-section {
  background: #0f1a8c;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
}

.section-tag {
  font-size: 11px;
  font-weight: 700;
  color: #ffd500;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
}

.ver-todos {
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: 1.5px solid white;
  border-radius: 8px;
  transition: all 0.2s;
  white-space: nowrap;
}

.ver-todos:hover {
  background: white;
  color: #0f1a8c;
}

.section-alt .section-tag {
  color: #0f1a8c;
}

.section-alt .section-title {
  color: #1a1a2e;
}

.section-alt .ver-todos {
  color: #0f1a8c;
  border-color: #0f1a8c;
}

.section-alt .ver-todos:hover {
  background: #0f1a8c;
  color: white;
}

/* ─── EVENTOS ────────────────────────────────────────── */
.eventos-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.evento-featured {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 110px 1fr;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.evento-featured:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(255, 213, 0, 0.2);
}

.evento-featured-img {
  background: linear-gradient(160deg, #1a2db5, #0f1a8c);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 16px;
  border-right: 3px solid #ffd500;
}

.ef-day {
  font-size: 38px;
  font-weight: 800;
  color: #ffd500;
  line-height: 1;
}

.ef-month {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.75);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.ef-year {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 2px;
}

.evento-featured-body {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
}

.ev-cat-pill {
  font-size: 10px;
  font-weight: 800;
  color: #0f1a8c;
  background: #e8ecff;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.ev-featured-title {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.35;
}

.ev-featured-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
  flex: 1;
}

.ev-featured-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #999;
  margin-top: 2px;
}

.ev-featured-footer i {
  font-size: 13px;
  color: #0f1a8c;
}

.eventos-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.evento-mini {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: background 0.2s;
  flex: 1;
}

.evento-mini:hover {
  background: rgba(255, 255, 255, 0.14);
}

.ev-mini-date {
  background: #ffd500;
  color: #0f1a8c;
  border-radius: 10px;
  min-width: 46px;
  text-align: center;
  padding: 6px 8px;
  flex-shrink: 0;
}

.ev-mini-day {
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
}

.ev-mini-month {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ev-mini-body {
  flex: 1;
}

.ev-mini-cat {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 213, 0, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 3px;
}

.ev-mini-title {
  font-size: 13px;
  font-weight: 600;
  color: white;
  line-height: 1.35;
}

.ev-mini-arrow {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.25);
  flex-shrink: 0;
}

/* ─── NOTICIAS ───────────────────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.1);
}

.news-img {
  height: 168px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f1a8c 0%, #1a3bcc 100%);
}

.news-img-placeholder {
  font-size: 48px;
  color: rgba(255, 255, 255, 0.12);
}

.news-cat-pill {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ffd500;
  color: #0f1a8c;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.news-date-pill {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.85);
  font-size: 10px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.news-date-pill i {
  font-size: 11px;
}

.news-body {
  padding: 18px 20px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.news-title {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.4;
}

.news-desc {
  font-size: 12px;
  color: #777;
  line-height: 1.65;
  flex: 1;
}

.news-footer {
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.news-read {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #0f1a8c;
}

.news-read i {
  font-size: 14px;
}

/* ─── VIDEOS ─────────────────────────────────────────── */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.video-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.video-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.14);
}

.video-thumb {
  height: 140px;
  background: #1a1a2e;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.video-play {
  position: absolute;
  width: 44px;
  height: 44px;
  background: #ffd500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f1a8c;
  font-size: 20px;
  transition: transform 0.2s;
  z-index: 2;
}

.video-card:hover .video-play {
  transform: scale(1.1);
}

.video-dur {
  position: absolute;
  bottom: 8px;
  right: 10px;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 4px;
  z-index: 2;
}

.video-body {
  padding: 12px 16px;
}

.video-tag {
  font-size: 10px;
  font-weight: 700;
  color: #ffd500;
  background: rgba(255, 213, 0, 0.15);
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 6px;
}

.video-title {
  font-size: 13px;
  font-weight: 600;
  color: white;
  line-height: 1.4;
}

/* ─── CALENDARIO ─────────────────────────────────────── */
.calendario-section {
  background: white;
  border-top: 3px solid #ffd500;
  padding: 64px 48px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.cal-tag {
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}

.cal-title {
  font-size: 32px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  color: #1a1a2e;
}

.cal-desc {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 28px;
}

.cal-img-wrap {
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(15, 26, 140, 0.15);
  transition: border-color 0.2s;
  width: fit-content;
  justify-self: center;
}

.cal-img-wrap:hover {
  border-color: #0f1a8c;
}

.cal-img-inner {
  position: relative;
  line-height: 0;
}

.cal-img {
  width: 380px;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.cal-img-wrap:hover .cal-img {
  transform: scale(1.03);
}

.cal-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 26, 140, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.cal-img-overlay i {
  font-size: 28px;
}

.cal-img-wrap:hover .cal-img-overlay {
  opacity: 1;
}

/* ─── OVERLAYS ───────────────────────────────────────── */
.cal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cal-overlay-close {
  position: absolute;
  top: 20px;
  right: 28px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.cal-overlay-close:hover {
  opacity: 1;
}

.cal-overlay-content {
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  cursor: grab;
}

.cal-overlay-content:active {
  cursor: grabbing;
}

.cal-overlay-content img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  transition: transform 0.1s;
  user-select: none;
}

.video-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-iframe {
  width: 85vw;
  height: 48vw;
  max-height: 85vh;
  border-radius: 12px;
}

/* ─── ESTADOS ────────────────────────────────────────── */
.loading-msg,
.error-msg,
.empty-msg {
  text-align: center;
  padding: 48px;
  font-size: 15px;
  color: #666;
}

.loading-light,
.empty-msg.loading-light {
  color: rgba(255, 255, 255, 0.6);
}

.error-msg {
  color: #c0392b;
}

.error-light {
  color: #ffaaaa;
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-content {
    grid-template-columns: 1fr;
    padding: 48px 24px;
  }

  .hero-visual {
    display: none;
  }

  .section {
    padding: 48px 24px;
  }

  .eventos-layout {
    grid-template-columns: 1fr;
  }

  .evento-featured {
    grid-template-columns: 90px 1fr;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .videos-grid {
    grid-template-columns: 1fr 1fr;
  }

  .calendario-section {
    grid-template-columns: 1fr;
    padding: 48px 24px;
    gap: 32px;
  }

  .stats-bar {
    padding: 20px 24px;
    grid-template-columns: repeat(2, 1fr);
  }

  .stat {
    border-right: none;
    border-bottom: 1px solid rgba(15, 26, 140, 0.15);
    padding-bottom: 12px;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 40px 16px;
  }

  .hero-content {
    padding: 40px 16px;
  }

  .calendario-section {
    padding: 40px 16px;
  }

  .evento-featured {
    grid-template-columns: 80px 1fr;
  }

  .ef-day {
    font-size: 28px;
  }

  .videos-grid {
    grid-template-columns: 1fr;
  }

  .stats-bar {
    padding: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  .cal-img {
    width: 100%;
  }
}
</style>