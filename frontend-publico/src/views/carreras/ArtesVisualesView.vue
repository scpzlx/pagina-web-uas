<template>
  <div class="carrera-page">

    <!-- HERO — amarillo -->
    <section class="hero-carrera">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Carreras</span>
            <i class="ti ti-chevron-right"></i>
            <span>Artes Visuales</span>
          </div>
          <div class="hero-area-tag">Área 8 · Ciencias de la Educación y Humanidades</div>
          <h1>Licenciatura en <br><span>Artes Visuales</span></h1>
          <div class="hero-badges">
            <span><i class="ti ti-map-pin"></i> Culiacán, Sinaloa</span>
            <span><i class="ti ti-school"></i> Modalidad Presencial</span>
            <span><i class="ti ti-calendar"></i> 8 Semestres</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/artes-visuales.webp" alt="Licenciatura en Artes Visuales" class="hero-img" />
            <div class="hero-img-badge">
              <i class="ti ti-palette"></i>
              <span>Artes Visuales</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS — azul -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-icon"><i :class="`ti ${stat.icon}`"></i></div>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PESTAÑAS: Perfil / Campo / Video — blanco -->
    <section class="section bg-white">
      <div class="container">

        <!-- Tabs -->
        <div class="tabs-bar">
          <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: tabActiva === tab.id }" @click="tabActiva = tab.id">
            <i :class="`ti ${tab.icon}`"></i>
            {{ tab.label }}
          </button>
        </div>

        <!-- Contenido de cada tab -->
        <div class="tab-content">

          <!-- Perfil de Egreso -->
          <div v-if="tabActiva === 'perfil'" class="tab-panel">
            <div class="perfil-box">
              <div class="perfil-icon"><i class="ti ti-user-check"></i></div>
              <div class="perfil-texto">
                <div class="s-tag">Formación profesional</div>
                <h2 class="s-title">Perfil de Egreso</h2>
                <p>El egresado de la Licenciatura en Artes Visuales es un profesional creativo y reflexivo, capaz de
                  comprender y aplicar la teoría e historia del arte para interpretar, producir y fundamentar proyectos
                  visuales significativos. Combina el dominio de técnicas artísticas con habilidades conceptuales y
                  comunicativas que le permiten desarrollar ideas originales, trabajar de forma colaborativa y responder
                  con sensibilidad a los retos culturales y sociales de su tiempo.</p>
                <p style="margin-top:12px">Su formación integral le permite gestionar, documentar y difundir procesos y
                  productos artísticos, así como participar activamente en espacios culturales, educativos y
                  comunitarios, contribuyendo al desarrollo artístico y cultural de Sinaloa y México. Gracias a su
                  enfoque crítico, ético e innovador, puede insertarse en ámbitos como la producción artística, la
                  gestión cultural, la docencia, la curaduría y la investigación visual.</p>
              </div>
              <div class="perfil-qr">
                <div class="qr-label">Más Información</div>
                <img src="/images/qr_artes_visuales.png" alt="QR Artes visuales" class="qr-img" />
                <p>Escanea el código QR para más detalles</p>
              </div>
            </div>
          </div>

          <!-- Campo Profesional -->
          <div v-if="tabActiva === 'campo'" class="tab-panel">
            <div class="campo-layout">
              <div class="campo-intro">
                <div class="s-tag">Dónde trabaja el egresado</div>
                <h2 class="s-title">Campo Profesional</h2>
                <p class="campo-desc">Este profesional destaca por su capacidad de adaptarse a entornos dinámicos,
                  resolver problemas creativos y comunicarse con claridad, impulsando iniciativas que enriquecen la vida
                  cultural y visual de su comunidad y fortalecen su trayectoria laboral tanto a nivel local como
                  nacional.</p>
              </div>
              <div class="campo-grid">
                <div v-for="campo in camposProfesionales" :key="campo.titulo" class="campo-card">
                  <div class="campo-icon"><i :class="`ti ${campo.icon}`"></i></div>
                  <h3>{{ campo.titulo }}</h3>
                  <p>{{ campo.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Video -->
          <div v-if="tabActiva === 'video'" class="tab-panel">
            <div class="video-layout">
              <div class="s-tag">Conoce la carrera</div>
              <h2 class="s-title">Video de la Carrera</h2>
              <div class="video-wrap">
                <iframe src="https://www.youtube.com/embed/2KjwYQ-nuNo" frameborder="0" allowfullscreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  class="video-iframe"></iframe>
              </div>
              <p class="video-caption">Conoce más sobre la Licenciatura en Artes Visuales de la EDAV · UAS</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- PLAN DE ESTUDIOS — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Malla curricular</div>
        <h2 class="s-title">Plan de Estudios</h2>
        <div class="semestres-grid">
          <div v-for="sem in planEstudios" :key="sem.semestre" class="sem-card">
            <div class="sem-header">
              <span class="sem-num">{{ sem.semestre }}</span>
              <h3>{{ sem.titulo }}</h3>
            </div>
            <div class="materias-list">
              <div v-for="m in sem.materias" :key="m.nombre" class="materia-row">
                <span class="materia-nombre">{{ m.nombre }}</span>
                <span class="materia-creditos">{{ m.creditos }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="creditos-total">
          <i class="ti ti-award"></i>
          Total de créditos del plan de estudios: <strong>522</strong>
        </div>
      </div>
    </section>

    <!-- CERTIFICACIONES — azul -->
    <section class="section bg-dark">
      <div class="container">
        <div class="s-tag light">Formación integral</div>
        <h2 class="s-title light">Certificaciones y Requisitos</h2>
        <div class="certs-grid">
          <div v-for="cert in certificaciones" :key="cert.title" class="cert-card">
            <div class="cert-icon"><i :class="`ti ${cert.icon}`"></i></div>
            <h3>{{ cert.title }}</h3>
            <p>{{ cert.desc }}</p>
            <ul v-if="cert.items">
              <li v-for="item in cert.items" :key="item"><i class="ti ti-check"></i> {{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACTO / CTA — gris con borde amarillo -->
    <section class="section bg-gray cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-palette deco-icon"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">Contacto</div>
            <h2 class="s-title">Escuela de Diseño y Artes Visuales</h2>
            <div class="contacto-info">
              <div class="contacto-item">
                <i class="ti ti-map-pin"></i>
                <p>Blvd. Francisco Labastida Ochoa (malecón nuevo) rumbo a La Limita, a 300 mts. de la carretera a
                  Imala. CP. 80064 Culiacán, Sinaloa, México</p>
              </div>
              <div class="contacto-item">
                <i class="ti ti-phone"></i>
                <a href="tel:6677137155">667 713 7155</a>
              </div>
            </div>
            <div class="cta-btns">
              <RouterLink to="/carreras/diseno-arte-multimedia" class="btn-primary">
                Ver Diseño Multimedia <i class="ti ti-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

type TabId = 'perfil' | 'campo' | 'video'

const tabActiva = ref<TabId>('perfil')

const tabs : {
  id: TabId,
  label: string,
  icon: string,
}[] = [
  { id: 'perfil', label: 'Perfil de Egreso', icon: 'ti-user-check' },
  { id: 'campo', label: 'Campo Profesional', icon: 'ti-briefcase' },
  { id: 'video', label: 'Video de la Carrera', icon: 'ti-video' },
]

const stats = [
  { icon: 'ti-calendar', number: '8', label: 'Semestres' },
  { icon: 'ti-book', number: '522', label: 'Créditos totales' },
  { icon: 'ti-certificate', number: '3', label: 'Certificaciones' },
  { icon: 'ti-map-pin', number: 'Culiacán', label: 'Sinaloa' },
]

const camposProfesionales = [
  { icon: 'ti-palette', titulo: 'Producción Artística', desc: 'Creación y desarrollo de proyectos plásticos y visuales propios o colaborativos.' },
  { icon: 'ti-building-community', titulo: 'Gestión Cultural', desc: 'Coordinación y administración de espacios, programas y proyectos culturales.' },
  { icon: 'ti-school', titulo: 'Docencia', desc: 'Enseñanza de artes visuales en instituciones educativas de nivel medio y superior.' },
  { icon: 'ti-photo', titulo: 'Curaduría', desc: 'Selección, investigación y montaje de exposiciones artísticas en galerías y museos.' },
  { icon: 'ti-search', titulo: 'Investigación Visual', desc: 'Estudio y análisis del arte contemporáneo, historia del arte y teoría visual.' },
  { icon: 'ti-calendar-event', titulo: 'Difusión Cultural', desc: 'Organización de festivales, eventos y actividades de promoción artística comunitaria.' },
]

const planEstudios = [
  {
    semestre: '01', titulo: 'Primer Semestre',
    materias: [
      { nombre: 'Arte en la prehistoria y antigüedad', creditos: 9 },
      { nombre: 'Composición en el arte visual', creditos: 9 },
      { nombre: 'Principios geométricos', creditos: 11 },
      { nombre: 'Dibujo de encaje y proporciones', creditos: 12 },
      { nombre: 'Pintura y teoría del color', creditos: 12 },
      { nombre: 'Tridimensionalidad y modelado', creditos: 12 },
    ],
  },
  {
    semestre: '02', titulo: 'Segundo Semestre',
    materias: [
      { nombre: 'Arte en la edad media y renacimiento', creditos: 9 },
      { nombre: 'Iconología y análisis visual', creditos: 9 },
      { nombre: 'Perspectiva', creditos: 11 },
      { nombre: 'Dibujo descriptivo e ilustrativo', creditos: 12 },
      { nombre: 'Pintura de forma y materia', creditos: 12 },
      { nombre: 'Tridimensionalidad en formas y cánones', creditos: 12 },
    ],
  },
  {
    semestre: '03', titulo: 'Tercer Semestre',
    materias: [
      { nombre: 'Arte en el academicismo', creditos: 9 },
      { nombre: 'Semiología', creditos: 9 },
      { nombre: 'La tecnología en el arte', creditos: 11 },
      { nombre: 'Dibujo expresivo y gestual', creditos: 12 },
      { nombre: 'Pintura y proyectos figurativos', creditos: 12 },
      { nombre: 'Tridimensionalidad en relieves', creditos: 12 },
    ],
  },
  {
    semestre: '04', titulo: 'Cuarto Semestre',
    materias: [
      { nombre: 'Arte moderno en el siglo XIX', creditos: 9 },
      { nombre: 'Filosofía del arte y el pensamiento clásico', creditos: 9 },
      { nombre: 'Proyectos artísticos', creditos: 11 },
      { nombre: 'Grabado en relieve', creditos: 12 },
      { nombre: 'Pintura atmosférica y paisajista', creditos: 12 },
      { nombre: 'Tridimensionalidad en la talla', creditos: 12 },
    ],
  },
  {
    semestre: '05', titulo: 'Quinto Semestre',
    materias: [
      { nombre: 'Arte moderno en el siglo XX', creditos: 9 },
      { nombre: 'Filosofía del arte y el pensamiento moderno', creditos: 9 },
      { nombre: 'Proyectos culturales', creditos: 11 },
      { nombre: 'Grabado calcográfico', creditos: 12 },
      { nombre: 'Pintura y abstracción', creditos: 12 },
      { nombre: 'Tridimensionalidad en el ensamblaje', creditos: 12 },
    ],
  },
  {
    semestre: '06', titulo: 'Sexto Semestre',
    materias: [
      { nombre: 'Arte precolombino y colonial', creditos: 9 },
      { nombre: 'Arte y posmodernidad', creditos: 11 },
      { nombre: 'Dinámicas museográficas', creditos: 11 },
      { nombre: 'Grabado ecológico', creditos: 12 },
      { nombre: 'Fotografía', creditos: 12 },
      { nombre: 'Técnicas interdisciplinarias', creditos: 12 },
    ],
  },
  {
    semestre: '07', titulo: 'Séptimo Semestre',
    materias: [
      { nombre: 'Optativa I', creditos: 12 },
      { nombre: 'Arte moderno mexicano', creditos: 9 },
      { nombre: 'Arte y transhumanismo', creditos: 9 },
      { nombre: 'Curaduría', creditos: 11 },
      { nombre: 'Videoarte', creditos: 12 },
      { nombre: 'Diseño de estrategias artísticas', creditos: 12 },
      { nombre: 'Optativa: Pintura digital', creditos: 12 },
      { nombre: 'Optativa: Proyectos gráficos', creditos: 12 },
      { nombre: 'Optativa: Escultura en ferrocemento', creditos: 12 },
    ],
  },
  {
    semestre: '08', titulo: 'Octavo Semestre',
    materias: [
      { nombre: 'Optativa II', creditos: 12 },
      { nombre: 'Arte contemporáneo', creditos: 9 },
      { nombre: 'Retórica y crítica de arte', creditos: 9 },
      { nombre: 'Administración de empresas culturales', creditos: 11 },
      { nombre: 'Proyecto artístico de grado', creditos: 12 },
      { nombre: 'Optativa: Pintura digital II', creditos: 12 },
      { nombre: 'Seminario de investigación', creditos: 12 },
      { nombre: 'Optativa: Proyectos gráficos en gran formato', creditos: 12 },
      { nombre: 'Optativa: Cerámica', creditos: 12 },
    ],
  },
]

const certificaciones = [
  {
    icon: 'ti-language',
    title: 'Certificaciones',
    desc: 'Tres tipos de certificaciones que complementan tu formación profesional.',
    items: ['En idiomas', 'En tecnologías', 'Profesionalizantes'],
  },
  {
    icon: 'ti-briefcase',
    title: 'Prácticas Profesionales',
    desc: 'Por convocatoria. Espacios de aplicación real de los conocimientos adquiridos en la carrera.',
  },
  {
    icon: 'ti-award',
    title: 'Competencias Sello UAS',
    desc: 'Los temas de género, ética y sustentabilidad, así como los transversales y de formación integral, se incorporan dentro de los contenidos temáticos de las materias.',
  },
  {
    icon: 'ti-star',
    title: 'Formación Integral',
    desc: 'Actividades extracurriculares que comprenden aspectos académicos, científicos, actividad física y deportiva, artísticos y culturales.',
  },
  {
    icon: 'ti-heart-handshake',
    title: 'Servicio Social',
    desc: 'Obligatorio según el Artículo 15 del Reglamento de Servicio Social de la UAS. Duración no menor de seis meses ni mayor a un año, cumpliendo al menos 480 horas.',
  },
  {
    icon: 'ti-world',
    title: 'Segundo Idioma',
    desc: 'Obligatorio como requisito de egreso, certificado por el Centro de Estudio de Idiomas de la UAS.',
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
  box-sizing: border-box;
}

.carrera-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ─────────────────────────────────────────── */
.hero-carrera {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-carrera::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-carrera::after {
  content: '';
  position: absolute;
  right: 80px;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.hero-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(15, 26, 140, 0.6);
  margin-bottom: 16px;
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

.hero-area-tag {
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  background: rgba(15, 26, 140, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 14px;
}

.hero-carrera h1 {
  font-size: clamp(26px, 3.5vw, 44px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 20px;
}

.hero-carrera h1 span {
  opacity: 0.75;
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

.hero-right {
  display: flex;
  flex-direction: column;
}

.hero-img-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(15, 26, 140, 0.2);
}

.hero-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.hero-img-badge {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: #ffd500;
  color: #0f1a8c;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ─── STATS ────────────────────────────────────────── */
.stats-section {
  background: #0f1a8c;
  padding: 40px 48px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 20px 16px;
  text-align: center;
  transition: background 0.2s;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.14);
}

.stat-icon {
  font-size: 24px;
  color: #ffd500;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

/* ─── LAYOUT ───────────────────────────────────────── */
.section {
  padding: 72px 48px;
}

.bg-white {
  background: white;
}

.bg-gray {
  background: #f4f5f9;
}

.bg-dark {
  background: #0f1a8c;
}

.s-tag {
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
}

.s-tag.light {
  color: #ffd500;
}

.s-title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.5px;
  margin-bottom: 32px;
}

.s-title.light {
  color: white;
}

/* ─── TABS ─────────────────────────────────────────── */
.tabs-bar {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e8ecff;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  border-radius: 8px 8px 0 0;
}

.tab-btn i {
  font-size: 16px;
}

.tab-btn:hover {
  color: #0f1a8c;
  background: #f0f3ff;
}

.tab-btn.active {
  color: #0f1a8c;
  border-bottom-color: #ffd500;
  background: #f0f3ff;
}

.tab-content {
  min-height: 200px;
}

/* ─── PERFIL TAB ───────────────────────────────────── */
.perfil-box {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 36px;
  border-left: 4px solid #ffd500;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.perfil-icon {
  font-size: 36px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 4px;
}

.perfil-texto {
  flex: 1;
}

.perfil-box .s-tag {
  margin-bottom: 4px;
}

.perfil-box .s-title {
  margin-bottom: 16px;
}

.perfil-box p {
  color: #555;
  font-size: 15px;
  line-height: 1.8;
}

.perfil-qr {
  flex-shrink: 0;
  text-align: center;
  background: white;
  border-radius: 14px;
  padding: 20px 16px;
  border: 1.5px solid rgba(15, 26, 140, 0.1);
  width: 160px;
}

.qr-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.qr-img {
  width: 120px;
  height: 120px;
  display: block;
  margin: 0 auto 10px;
  border-radius: 8px;
}

.perfil-qr p {
  font-size: 11px !important;
  color: #888 !important;
  line-height: 1.4 !important;
  margin: 0 !important;
}

/* ─── CAMPO TAB ────────────────────────────────────── */
.campo-layout {}

.campo-intro {
  margin-bottom: 32px;
}

.campo-desc {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
  max-width: 720px;
}

.campo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.campo-card {
  background: #f4f5f9;
  border-radius: 14px;
  padding: 24px;
  border-top: 3px solid #0f1a8c;
  transition: transform 0.2s, box-shadow 0.2s;
}

.campo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}

.campo-icon {
  font-size: 28px;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.campo-card h3 {
  font-size: 15px;
  font-weight: 700;
  color: #0f1a8c;
  margin-bottom: 8px;
}

.campo-card p {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
}

/* ─── VIDEO TAB ────────────────────────────────────── */
.video-layout {
  text-align: center;
}

.video-layout .s-tag {
  text-align: left;
}

.video-layout .s-title {
  text-align: left;
}

.video-wrap {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(15, 26, 140, 0.15);
  margin-bottom: 16px;
}

.video-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-caption {
  font-size: 13px;
  color: #888;
  text-align: center;
}

/* ─── PLAN DE ESTUDIOS ─────────────────────────────── */
.semestres-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

.sem-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.sem-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(15, 26, 140, 0.1);
}

.sem-header {
  background: #0f1a8c;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 3px solid #ffd500;
}

.sem-num {
  background: #ffd500;
  color: #0f1a8c;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.sem-header h3 {
  color: white;
  font-size: 14px;
  font-weight: 700;
}

.materias-list {
  padding: 12px 0;
}

.materia-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  gap: 8px;
}

.materia-row:last-child {
  border-bottom: none;
}

.materia-nombre {
  font-size: 12px;
  color: #444;
  line-height: 1.4;
  flex: 1;
}

.materia-creditos {
  background: #ffd500;
  color: #0f1a8c;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  flex-shrink: 0;
}

.creditos-total {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border-radius: 12px;
  padding: 16px 24px;
  border-left: 4px solid #0f1a8c;
  font-size: 15px;
  color: #555;
}

.creditos-total i {
  font-size: 20px;
  color: #ffd500;
}

.creditos-total strong {
  color: #0f1a8c;
  font-size: 18px;
}

/* ─── CERTIFICACIONES ──────────────────────────────── */
.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.cert-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 24px;
  border-top: 3px solid #ffd500;
  transition: background 0.2s;
}

.cert-card:hover {
  background: rgba(255, 255, 255, 0.13);
}

.cert-icon {
  font-size: 28px;
  color: #ffd500;
  margin-bottom: 12px;
}

.cert-card h3 {
  color: white;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
}

.cert-card p {
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
  line-height: 1.7;
}

.cert-card ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.cert-card ul li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  padding: 4px 0;
}

.cert-card ul li i {
  color: #ffd500;
  font-size: 14px;
  flex-shrink: 0;
}

/* ─── CTA FINAL ────────────────────────────────────── */
.cta-section {
  border-top: 3px solid #ffd500;
}

.cta-inner {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 64px;
  align-items: center;
}

.cta-deco {
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
}

.c1 {
  width: 180px;
  height: 180px;
  background: #ffd500;
  opacity: 0.15;
}

.c2 {
  width: 120px;
  height: 120px;
  background: #0f1a8c;
  opacity: 0.08;
}

.deco-icon {
  font-size: 56px;
  color: #0f1a8c;
  opacity: 0.2;
  z-index: 1;
}

.contacto-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.contacto-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #555;
}

.contacto-item i {
  font-size: 18px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 2px;
}

.contacto-item p {
  line-height: 1.6;
  margin: 0;
}

.contacto-item a {
  color: #0f1a8c;
  font-weight: 600;
  text-decoration: none;
}

.contacto-item a:hover {
  text-decoration: underline;
}

.cta-btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffd500;
  color: #0f1a8c;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #ffe033;
  transform: translateY(-1px);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: #0f1a8c;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1.5px solid #0f1a8c;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #0f1a8c;
  color: white;
}

/* ─── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 1100px) {
  .semestres-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .campo-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 900px) {
  .hero-carrera {
    padding: 48px 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero-right {
    display: none;
  }

  .stats-section {
    padding: 32px 24px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section {
    padding: 56px 24px;
  }

  .certs-grid {
    grid-template-columns: 1fr 1fr;
  }

  .cta-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .cta-deco {
    height: 120px;
  }
}

@media (max-width: 600px) {
  .hero-carrera {
    padding: 40px 16px;
  }

  .stats-section {
    padding: 24px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .semestres-grid {
    grid-template-columns: 1fr;
  }

  .certs-grid {
    grid-template-columns: 1fr;
  }

  .campo-grid {
    grid-template-columns: 1fr;
  }

  .perfil-box {
    flex-direction: column;
    gap: 16px;
  }

  .perfil-qr {
    width: 100%;
  }

  .perfil-qr .qr-img {
    width: 100px;
    height: 100px;
  }

  .tab-btn {
    font-size: 13px;
    padding: 10px 14px;
  }
}
</style>