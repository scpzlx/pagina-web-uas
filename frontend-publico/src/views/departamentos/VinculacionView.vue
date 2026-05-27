<template>
  <div class="vinculacion-page">

    <!-- HERO — amarillo -->
    <section class="hero-vinculacion">
      <div class="hero-inner">
        <div class="hero-breadcrumb">
          <RouterLink to="/">Inicio</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <span>Departamentos</span>
          <i class="ti ti-chevron-right"></i>
          <span>Vinculación</span>
        </div>
        <div class="hero-area-tag">
          <i class="ti ti-link"></i> Vinculación Académica
        </div>
        <h1>Vinculación</h1>
        <p class="hero-desc">
          Fortalecemos la relación entre la Facultad, los sectores productivos y la comunidad
          académica a través del intercambio, la vinculación y la educación continua.
        </p>
        <div class="hero-badges">
          <span><i class="ti ti-building"></i> Sectores productivos</span>
          <span><i class="ti ti-world"></i> Intercambio nacional e internacional</span>
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

    <!-- COMPROMISO (Objetivo, Misión, Visión) — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Nuestro enfoque</div>
        <h2 class="s-title">Nuestro Compromiso</h2>
        <div class="compromiso-grid">
          <div v-for="item in compromiso" :key="item.title" class="comp-card">
            <div class="comp-icon"><i :class="`ti ${item.icon}`"></i></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FUNCIONES — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">¿Qué hacemos?</div>
        <h2 class="s-title">Funciones del Departamento</h2>
        <div class="funciones-grid">
          <div v-for="fn in funciones" :key="fn.title" class="fn-card">
            <div class="fn-icon"><i :class="`ti ${fn.icon}`"></i></div>
            <h3>{{ fn.title }}</h3>
            <p>{{ fn.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MOVILIDAD — azul -->
    <section class="section bg-dark">
      <div class="container">
        <div class="movilidad-wrap">
          <div class="movilidad-text">
            <div class="s-tag light">Oportunidades</div>
            <h2 class="s-title light">Movilidad Estudiantil</h2>
            <p>La movilidad estudiantil es una alternativa para elevar la calidad académica y la
              competitividad internacional, promoviendo la diversidad y fortaleciendo el
              entendimiento intercultural entre instituciones nacionales y del extranjero.</p>
            <h3 class="movilidad-sub">¿Cómo puedo participar?</h3>
            <p>Atendiendo las bases de las convocatorias que publica la Universidad a través de la
              Dirección General de Vinculación y Relaciones Internacionales, así como de
              instituciones con las que existen convenios de colaboración o redes de cooperación.</p>
            <a href="https://www.uas.edu.mx/pdf/marco_juridico/2023/Reglamento_de_Intercambio_y_Movilidad_Estudiantil_UAS_2023.pdf"
              target="_blank" rel="noopener noreferrer" class="btn-download">
              <i class="ti ti-file-text"></i>
              Reglamento de Intercambio y Movilidad Estudiantil
            </a>
          </div>
          <div class="movilidad-img-side">
            <img src="/images/movilidad-estudiantil.jpg" alt="Movilidad Estudiantil" class="movilidad-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- EN QUÉ CONSISTE — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="consiste-wrap">
          <div class="consiste-img-side">
            <img src="/images/consiste-imagen.jpg" alt="¿En qué consiste?" class="consiste-img" />
          </div>
          <div class="consiste-text">
            <div class="s-tag">Alcance del programa</div>
            <h2 class="s-title">¿En qué consiste?</h2>
            <p>En facilitar la estancia de los alumnos de la Universidad en otras instituciones de
              educación superior de México y el extranjero, con el objeto de que cursen semestres
              completos, realicen cursos y talleres, participen en proyectos de investigación y/o
              reciban asesoría para la conclusión de sus trabajos de tesis.</p>
            <div class="objetivos-list">
              <div class="s-tag" style="margin-top:24px;">Sus objetivos son</div>
              <ul>
                <li v-for="obj in objetivos" :key="obj">
                  <i class="ti ti-check"></i> {{ obj }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONVOCATORIAS — gris con borde amarillo -->
    <section class="section bg-gray cta-section">
      <div class="container">
        <div class="s-tag">Período 2025-2</div>
        <h2 class="s-title">Convocatoria Movilidad Nacional e Internacional</h2>
        <div class="conv-grid">
          <div v-for="conv in convocatorias" :key="conv.title" class="conv-card">
            <div class="conv-img-wrap">
              <img :src="conv.img" :alt="conv.title" class="conv-img" />
              <div class="conv-overlay">
                <i class="ti ti-zoom-in"></i>
              </div>
            </div>
            <div class="conv-body">
              <h3>{{ conv.title }}</h3>
              <a :href="conv.img" :download="conv.filename" class="btn-download-card">
                <i class="ti ti-download"></i> Descargar convocatoria
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const stats = [
  { icon: 'ti-world', number: 'Nacional', label: 'e Internacional' },
  { icon: 'ti-building-community', number: '+10', label: 'Instituciones aliadas' },
  { icon: 'ti-certificate', number: '2', label: 'Convocatorias activas' },
  { icon: 'ti-users', number: 'Abierto', label: 'A toda la comunidad' },
]

const compromiso = [
  {
    icon: 'ti-target',
    title: 'Objetivo',
    desc: 'Proyectar, formular y establecer formas alternativas de intercambio en sus distintos niveles, fomentando el quehacer académico e incrementando la capacidad de respuesta y vinculación de la Facultad de acuerdo a las necesidades del entorno.',
  },
  {
    icon: 'ti-rocket',
    title: 'Misión',
    desc: 'Promover actividades de intercambio y vinculación académica que potencien el desarrollo de la investigación y la docencia, generando propuestas académicas, científicas y culturales que aseguren la pertinencia de los programas educativos.',
  },
  {
    icon: 'ti-eye',
    title: 'Visión',
    desc: 'Consolidar la vinculación con los sectores productivos, académicos, sociales y gubernamentales, posicionando a la Institución como referente de calidad a nivel nacional e internacional.',
  },
]

const funciones = [
  {
    icon: 'ti-file-certificate',
    title: 'Normativa y documentos',
    desc: 'Cumplir y hacer cumplir las normas institucionales, gestionando trámites, autorizaciones y suscripción de documentos de intercambio y vinculación.',
  },
  {
    icon: 'ti-handshake',
    title: 'Convenios y alianzas',
    desc: 'Promover el establecimiento de convenios de intercambio y vinculación con sectores productivos, nacionales e internacionales.',
  },
  {
    icon: 'ti-speakerphone',
    title: 'Difusión y capacitación',
    desc: 'Coordinar y difundir servicios de formación, capacitación y actualización, así como organizar muestras profesiográficas y eventos especiales.',
  },
  {
    icon: 'ti-chart-line',
    title: 'Seguimiento y reporte',
    desc: 'Informar periódicamente a la dirección de la Facultad sobre el funcionamiento del departamento y mantener actualizada la página web institucional.',
  },
  {
    icon: 'ti-device-laptop',
    title: 'Observatorio Infotecnológico',
    desc: 'Gestionar el Observatorio Infotecnológico, mantener su página actualizada y difundir el boletín informativo entre la comunidad de la Facultad.',
  },
  {
    icon: 'ti-help',
    title: 'Gestión de apoyos',
    desc: 'Gestionar apoyos ante autoridades competentes para las actividades generales de intercambio, vinculación académica y educación continua.',
  },
]

const objetivos = [
  'Favorecer la formación profesional mediante la movilidad en áreas que complementen los planes de estudio.',
  'Facilitar el acceso a instituciones de la región para realizar avances en los estudios.',
  'Aumentar la cohesión académica y contribuir a un nivel homogéneo de excelencia.',
  'Mejorar la comunicación entre investigadores de distintas instituciones.',
  'Incentivar la participación en proyectos multidisciplinarios.',
  'Propiciar el intercambio de material didáctico y métodos pedagógicos innovadores.',
  'Incrementar el uso de tecnologías de información y comunicación.',
]

const convocatorias = [
  {
    title: 'Movilidad Estudiantil Internacional 2025-2',
    img: '/images/convocatoria1.jpg',
    filename: 'Convocatoria_Internacional_2025-2.jpg',
  },
  {
    title: 'Movilidad Estudiantil Nacional 2025-2',
    img: '/images/convocatoria2.jpg',
    filename: 'Convocatoria_Nacional_2025-2.jpg',
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.vinculacion-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ───────────────────────────────────────────── */
.hero-vinculacion {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-vinculacion::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-vinculacion::after {
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  letter-spacing: 0.3px;
}

.hero-vinculacion h1 {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: 16px;
}

.hero-desc {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  line-height: 1.7;
  margin-bottom: 22px;
  max-width: 580px;
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

/* ─── STATS ──────────────────────────────────────────── */
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
  font-size: 22px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

/* ─── LAYOUT ─────────────────────────────────────────── */
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
  margin-bottom: 40px;
}

.s-title.light {
  color: white;
}

/* ─── COMPROMISO ─────────────────────────────────────── */
.compromiso-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.comp-card {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 28px 24px;
  border-top: 3px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.comp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(15, 26, 140, 0.1);
}

.comp-icon {
  font-size: 28px;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.comp-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 10px;
}

.comp-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.75;
}

/* ─── FUNCIONES ──────────────────────────────────────── */
.funciones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.fn-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  border-left: 4px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.fn-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(15, 26, 140, 0.09);
}

.fn-icon {
  font-size: 24px;
  color: #0f1a8c;
  margin-bottom: 10px;
}

.fn-card h3 {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.fn-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.7;
}

/* ─── MOVILIDAD ──────────────────────────────────────── */
.movilidad-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.movilidad-text p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: 16px;
}

.movilidad-sub {
  font-size: 16px;
  font-weight: 700;
  color: #ffd500;
  margin: 24px 0 10px;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffd500;
  color: #0f1a8c;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 10px;
  text-decoration: none;
  margin-top: 8px;
  transition: all 0.2s;
}

.btn-download:hover {
  background: #ffe033;
  transform: translateY(-2px);
}

.btn-download i {
  font-size: 16px;
}

.movilidad-img-side {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

.movilidad-img {
  width: 100%;
  height: auto;
  display: block;
}

/* ─── EN QUÉ CONSISTE ────────────────────────────────── */
.consiste-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}

.consiste-img-side {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.12);
}

.consiste-img {
  width: 100%;
  height: auto;
  display: block;
}

.consiste-text p {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 8px;
}

.objetivos-list ul {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.objetivos-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #444;
  line-height: 1.6;
}

.objetivos-list li i {
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ─── CONVOCATORIAS ──────────────────────────────────── */
.cta-section {
  border-top: 3px solid #ffd500;
}

.conv-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.conv-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.conv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.12);
}

.conv-img-wrap {
  position: relative;
  overflow: hidden;
}

.conv-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s;
}

.conv-card:hover .conv-img {
  transform: scale(1.03);
}

.conv-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 26, 140, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  opacity: 0;
  transition: opacity 0.25s;
}

.conv-card:hover .conv-overlay {
  opacity: 1;
}

.conv-body {
  padding: 20px 22px;
}

.conv-body h3 {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 14px;
}

.btn-download-card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffd500;
  color: #0f1a8c;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-download-card:hover {
  background: #ffe033;
  transform: translateY(-1px);
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 1100px) {
  .funciones-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-vinculacion {
    padding: 48px 24px;
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

  .compromiso-grid {
    grid-template-columns: 1fr;
  }

  .movilidad-wrap {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .movilidad-img-side {
    display: none;
  }

  .consiste-wrap {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .consiste-img-side {
    display: none;
  }

  .conv-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero-vinculacion {
    padding: 40px 16px;
  }

  .stats-section {
    padding: 24px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .funciones-grid {
    grid-template-columns: 1fr;
  }
}
</style>