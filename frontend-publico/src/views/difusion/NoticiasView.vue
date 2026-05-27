<template>
  <div class="noticias-page">

    <!-- HERO — amarillo -->
    <section class="hero-noticias">
      <div class="hero-inner">
        <div class="hero-breadcrumb">
          <RouterLink to="/">Inicio</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <span>Difusión</span>
          <i class="ti ti-chevron-right"></i>
          <span>Noticias</span>
        </div>
        <h1>Noticias</h1>
        <p>Entérate de todo lo que sucede en la Facultad de Artes · UAS</p>
        <div class="hero-badges">
          <span><i class="ti ti-news"></i> Ciclo 2025–2026</span>
          <span><i class="ti ti-map-pin"></i> Culiacán, Sinaloa</span>
        </div>
      </div>
    </section>

    <!-- FILTROS — azul -->
    <section class="filtros-section">
      <div class="container">
        <div class="filter-bar">
          <div class="filter-label">
            <i class="ti ti-adjustments-horizontal"></i>
            Filtrar
          </div>
          <div class="filter-group">
            <label>Mes</label>
            <select v-model="filtros.mes" class="filter-select">
              <option value="">Todos</option>
              <option value="1">Enero</option>
              <option value="2">Febrero</option>
              <option value="3">Marzo</option>
              <option value="4">Abril</option>
              <option value="5">Mayo</option>
              <option value="6">Junio</option>
              <option value="7">Julio</option>
              <option value="8">Agosto</option>
              <option value="9">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Año</label>
            <select v-model="filtros.anio" class="filter-select">
              <option value="">Todos</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Categoría</label>
            <select v-model="filtros.categoria" class="filter-select">
              <option value="">Todas</option>
              <option value="actividades-generales">Actividades Generales</option>
              <option value="academico">Académico</option>
              <option value="investigacion">Investigación</option>
              <option value="extension">Extensión</option>
              <option value="cultura">Cultura</option>
              <option value="deportes">Deportes</option>
            </select>
          </div>
          <button v-if="hayFiltros" class="btn-clear" @click="limpiarFiltros">
            <i class="ti ti-x"></i> Limpiar
          </button>
        </div>
        <div v-if="hayFiltros" class="resultados-count">
          {{ noticiasFiltradas.length }} resultado{{ noticiasFiltradas.length !== 1 ? 's' : '' }} encontrado{{
            noticiasFiltradas.length !== 1 ? 's' : '' }}
        </div>
      </div>
    </section>

    <!-- LISTA DE NOTICIAS — blanco -->
    <section class="noticias-section">
      <div class="container">

        <div v-if="loading" class="estado-msg">
          <i class="ti ti-loader-2 spin"></i>
          <p>Cargando noticias...</p>
        </div>

        <div v-else-if="error" class="estado-msg error">
          <i class="ti ti-alert-circle"></i>
          <p>No se pudieron cargar las noticias. Por favor, intenta más tarde.</p>
        </div>

        <div v-else-if="noticiasFiltradas.length === 0 && hayFiltros" class="estado-msg">
          <i class="ti ti-search-off"></i>
          <p>No se encontraron noticias con los filtros seleccionados.</p>
          <button class="btn-clear-big" @click="limpiarFiltros">Ver todas las noticias</button>
        </div>

        <div v-else-if="noticiasFiltradas.length === 0" class="estado-msg">
          <i class="ti ti-news-off"></i>
          <p>No hay noticias disponibles por el momento.</p>
        </div>

        <div v-else class="noticias-list">
          <article v-for="noticia in noticiasFiltradas" :key="noticia.id" class="noticia-card"
            @click="$router.push(`/noticias/${noticia.id}`)">
            <div class="noticia-img">
              <img v-if="noticia.thumbnailImage" :src="noticia.thumbnailImage" :alt="noticia.title" loading="lazy" />
              <div v-else class="noticia-img-placeholder">
                <i class="ti ti-news"></i>
              </div>
              <span class="noticia-cat">{{ noticia.categoryLabel }}</span>
            </div>
            <div class="noticia-body">
              <div class="noticia-fecha">
                <i class="ti ti-calendar"></i>
                {{ formatDate(noticia.date) }}
              </div>
              <h2 class="noticia-titulo">{{ noticia.title }}</h2>
              <p class="noticia-desc">{{ truncate(noticia.shortDescription, 200) }}</p>
              <div class="noticia-footer">
                <span class="noticia-leer">
                  Leer noticia <i class="ti ti-arrow-right"></i>
                </span>
              </div>
            </div>
          </article>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const noticias = ref<any[]>([])
const loading = ref(true)
const error = ref(false)

const filtros = ref({
  mes: '',
  anio: '',
  categoria: ''
})

const hayFiltros = computed(() =>
  filtros.value.mes !== '' || filtros.value.anio !== '' || filtros.value.categoria !== ''
)

const noticiasFiltradas = computed(() => {
  let lista = noticias.value

  if (filtros.value.mes) {
    lista = lista.filter(n => {
      const d = new Date(n.date + 'T00:00:00')
      return (d.getMonth() + 1) === parseInt(filtros.value.mes)
    })
  }

  if (filtros.value.anio) {
    lista = lista.filter(n => {
      const d = new Date(n.date + 'T00:00:00')
      return d.getFullYear() === parseInt(filtros.value.anio)
    })
  }

  if (filtros.value.categoria) {
    lista = lista.filter(n => n.category === filtros.value.categoria)
  }

  return lista
})

function limpiarFiltros() {
  filtros.value = { mes: '', anio: '', categoria: '' }
}

const mesesLargo = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function formatDate(d: string) {
  const fecha = new Date(d + 'T00:00:00')
  return `${mesesLargo[fecha.getMonth()]} ${String(fecha.getDate()).padStart(2, '0')}, ${fecha.getFullYear()}`
}

function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length <= max ? text : text.substring(0, max) + '...'
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/news/get-all-news.php')
    if (res.data.success) noticias.value = res.data.data
    else error.value = true
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.noticias-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO — amarillo ───────────────────────────────── */
.hero-noticias {
  background: #ffd500;
  padding: 64px 48px 56px;
  position: relative;
  overflow: hidden;
}

.hero-noticias::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-noticias::after {
  content: '';
  position: absolute;
  right: 100px;
  bottom: -40px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.04);
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
}

.hero-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(15, 26, 140, 0.6);
  margin-bottom: 20px;
}

.hero-breadcrumb a {
  color: rgba(15, 26, 140, 0.6);
  text-decoration: none;
}

.hero-breadcrumb a:hover {
  color: #0f1a8c;
}

.hero-breadcrumb i {
  font-size: 12px;
}

.hero-noticias h1 {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  color: #0f1a8c;
  letter-spacing: -1.5px;
  margin-bottom: 14px;
}

.hero-noticias p {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  margin-bottom: 24px;
  max-width: 540px;
}

.hero-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.hero-badges span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 26, 140, 0.1);
  color: #0f1a8c;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid rgba(15, 26, 140, 0.12);
}

/* ─── FILTROS — azul ────────────────────────────────── */
.filtros-section {
  background: #0f1a8c;
  padding: 28px 48px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(15, 26, 140, 0.3);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #ffd500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-right: 4px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.filter-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 32px 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  min-width: 140px;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}

.filter-select:focus {
  outline: none;
  border-color: #ffd500;
  background-color: rgba(255, 255, 255, 0.15);
}

.filter-select option {
  background: #0f1a8c;
  color: white;
}

.btn-clear {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 213, 0, 0.15);
  border: 1.5px solid rgba(255, 213, 0, 0.4);
  color: #ffd500;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-left: auto;
}

.btn-clear:hover {
  background: rgba(255, 213, 0, 0.25);
  border-color: #ffd500;
}

.resultados-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 10px;
  font-weight: 500;
}

/* ─── LISTA — blanco ────────────────────────────────── */
.noticias-section {
  background: white;
  padding: 56px 48px;
  min-height: 400px;
}

.noticias-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.noticia-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.noticia-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.1);
}

.noticia-img {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f1a8c, #1a3bcc);
}

.noticia-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.noticia-card:hover .noticia-img img {
  transform: scale(1.05);
}

.noticia-img-placeholder {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: rgba(255, 255, 255, 0.15);
}

.noticia-cat {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #ffd500;
  color: #0f1a8c;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.noticia-body {
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.noticia-fecha {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #0f1a8c;
}

.noticia-fecha i {
  font-size: 14px;
}

.noticia-titulo {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.35;
  margin: 0;
}

.noticia-desc {
  font-size: 13px;
  color: #666;
  line-height: 1.75;
  flex: 1;
  margin: 0;
}

.noticia-footer {
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
  margin-top: auto;
}

.noticia-leer {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #0f1a8c;
}

/* ─── ESTADOS ───────────────────────────────────────── */
.estado-msg {
  text-align: center;
  padding: 80px 24px;
  color: #999;
}

.estado-msg i {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
  color: #ccc;
}

.estado-msg.error i {
  color: #ffaaaa;
}

.estado-msg.error p {
  color: #c0392b;
}

.estado-msg p {
  font-size: 16px;
  margin: 0 0 20px;
}

.btn-clear-big {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #0f1a8c;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear-big:hover {
  background: #1a2db5;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

/* ─── RESPONSIVE ────────────────────────────────────── */
@media (max-width: 900px) {
  .hero-noticias {
    padding: 48px 24px 40px;
  }

  .filtros-section {
    padding: 20px 24px;
    position: static;
  }

  .noticias-section {
    padding: 40px 24px;
  }

  .filter-bar {
    gap: 12px;
  }

  .filter-select {
    min-width: 120px;
  }

  .noticia-card {
    grid-template-columns: 1fr;
  }

  .noticia-img {
    height: 220px;
  }

  .noticia-img-placeholder {
    min-height: 220px;
  }

  .noticia-body {
    padding: 20px 24px;
  }
}

@media (max-width: 600px) {
  .hero-noticias {
    padding: 40px 16px 32px;
  }

  .filtros-section {
    padding: 16px;
  }

  .noticias-section {
    padding: 32px 16px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .filter-select {
    width: 100%;
    min-width: unset;
  }

  .btn-clear {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }

  .noticia-body {
    padding: 16px 20px;
  }

  .noticia-titulo {
    font-size: 16px;
  }
}
</style>