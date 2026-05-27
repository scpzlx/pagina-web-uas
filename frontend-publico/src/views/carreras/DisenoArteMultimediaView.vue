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
            <span>Diseño y Arte Multimedia</span>
          </div>
          <div class="hero-area-tag">Área 2 · Arquitectura, Diseño y Urbanismo</div>
          <h1>Licenciatura en <br><span>Diseño y Arte Multimedia</span></h1>
          <div class="hero-badges">
            <span><i class="ti ti-map-pin"></i> Culiacán &amp; Guamúchil, Sinaloa</span>
            <span><i class="ti ti-school"></i> Modalidad Presencial</span>
            <span><i class="ti ti-calendar"></i> 8 Semestres</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/Arte-multimedia.webp" alt="Licenciatura en Diseño y Arte Multimedia" class="hero-img" />
            <div class="hero-img-badge">
              <i class="ti ti-device-desktop"></i>
              <span>Diseño Multimedia</span>
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

    <!-- PERFIL DE EGRESO — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="perfil-box">
          <div class="perfil-icon"><i class="ti ti-user-check"></i></div>
          <div class="perfil-content">
            <div class="s-tag">Formación profesional</div>
            <h2 class="s-title">Perfil de Egreso</h2>
            <p>El egresado de la Licenciatura en Diseño y Arte Multimedia en su área de desempeño profesional en
              el campo laboral del sector público, privado y social, mostrando su destreza en la praxis de la
              investigación y la producción de imágenes generadas por medios digitales, con capacidad de
              innovación, pertinencia social y la sensibilidad estética, de acuerdo al entorno socio-cultural en
              el que emerge, atendiendo una de las necesidades vitales que demanda en la actualidad el siglo XXI.
              Es capaz de ofrecer productos y servicios basados en la solidez de sus conocimientos y habilidades,
              su compromiso social y alto desempeño ético enfocados en la creación de contenidos gráficos,
              animaciones, video y web, coordinar equipos multidisciplinarios para proponer soluciones
              competitivas en términos de imagen y diseño dirigidas a contextos en constante transformación.
              Actúa con iniciativa en la dirección que las exigencias colectivas le impongan para subsanar
              carencias y detonar el desarrollo social asumiendo su rol de profesionista comprometido,
              eficiente y creativo.</p>
          </div>
          <div class="perfil-qr">
            <div class="qr-label">Más Información</div>
            <img src="/images/qr_diseno_y_arte_multimedia.png" alt="QR Diseño y Arte Multimedia" class="qr-img" />
            <p>Escanea el código QR para más detalles</p>
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
            <i class="ti ti-device-desktop deco-icon"></i>
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
            <div class="contacto-info" style="margin-top: 20px;">
              <div class="contacto-item">
                <i class="ti ti-map-pin"></i>
                <p>Carretera a Angostura Km. 0.5, C.P. 81460. Guamúchil, Salvador Alvarado, Sinaloa, México.</p>
              </div>
              <div class="contacto-item">
                <i class="ti ti-phone"></i>
                <a href="tel:6737323200">673 732 3200</a>
              </div>
            </div>
            <div class="cta-btns">
              <RouterLink to="/carreras/artes-visuales" class="btn-outline">
                Ver Artes Visuales
              </RouterLink>
              <RouterLink to="/carreras/fotografia-produccion-video" class="btn-primary">
                Ver Fotografía y Video <i class="ti ti-arrow-right"></i>
              </RouterLink>
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
  { icon: 'ti-calendar', number: '8', label: 'Semestres' },
  { icon: 'ti-book', number: '48', label: 'Materias' },
  { icon: 'ti-certificate', number: '3', label: 'Certificaciones' },
  { icon: 'ti-map-pin', number: '2', label: 'Sedes en Sinaloa' },
]

const planEstudios = [
  {
    semestre: '01', titulo: 'Primer Semestre',
    materias: [
      { nombre: 'Imagen en la prehistoria y antigüedad', creditos: 9 },
      { nombre: 'Geometría y perspectiva', creditos: 11 },
      { nombre: 'Tecnología y creatividad', creditos: 9 },
      { nombre: 'Dibujo básico', creditos: 12 },
      { nombre: 'Fundamentos de fotografía', creditos: 11 },
      { nombre: 'Modelado básico', creditos: 12 },
    ],
  },
  {
    semestre: '02', titulo: 'Segundo Semestre',
    materias: [
      { nombre: 'Imagen medieval y renacentista', creditos: 9 },
      { nombre: 'Apreciación visual y principios compositivos', creditos: 9 },
      { nombre: 'Lectura y escritura creativa', creditos: 11 },
      { nombre: 'Teoría de la luz y el color', creditos: 11 },
      { nombre: 'Fotografía digital', creditos: 12 },
      { nombre: 'Revelado fotográfico digital', creditos: 12 },
    ],
  },
  {
    semestre: '03', titulo: 'Tercer Semestre',
    materias: [
      { nombre: 'Imagen en el academicismo', creditos: 9 },
      { nombre: 'Semiología y comunicación visual', creditos: 9 },
      { nombre: 'Narrativa audiovisual', creditos: 9 },
      { nombre: 'Ilustración', creditos: 11 },
      { nombre: 'Imagen gráfica matricial', creditos: 12 },
      { nombre: 'Imagen gráfica vectorial', creditos: 12 },
    ],
  },
  {
    semestre: '04', titulo: 'Cuarto Semestre',
    materias: [
      { nombre: 'Imagen en la modernidad', creditos: 9 },
      { nombre: 'Teorías estéticas', creditos: 9 },
      { nombre: 'Guionismo', creditos: 11 },
      { nombre: 'Diseño de sonido y audio digital', creditos: 11 },
      { nombre: 'Producción de video', creditos: 12 },
      { nombre: 'Postproducción de video', creditos: 12 },
    ],
  },
  {
    semestre: '05', titulo: 'Quinto Semestre',
    materias: [
      { nombre: 'Imagen en las vanguardias', creditos: 9 },
      { nombre: 'Propiedad intelectual', creditos: 9 },
      { nombre: 'Innovación y emprendimiento', creditos: 9 },
      { nombre: 'Tipografía', creditos: 11 },
      { nombre: 'Animación digital bidimensional', creditos: 12 },
      { nombre: 'Fundamentos de programación', creditos: 12 },
    ],
  },
  {
    semestre: '06', titulo: 'Sexto Semestre',
    materias: [
      { nombre: 'Imagen en la posmodernidad', creditos: 9 },
      { nombre: 'Gestión de contenidos para redes sociales', creditos: 11 },
      { nombre: 'Principios de administración', creditos: 9 },
      { nombre: 'Optativa I', creditos: 12 },
      { nombre: 'Modelado y animación digital tridimensional', creditos: 12 },
      { nombre: 'Lenguajes de programación', creditos: 12 },
    ],
  },
  {
    semestre: '07', titulo: 'Séptimo Semestre',
    materias: [
      { nombre: 'Sociedad y cultura visual contemporánea', creditos: 9 },
      { nombre: 'Estrategias publicitarias', creditos: 11 },
      { nombre: 'Costos y presupuestación', creditos: 9 },
      { nombre: 'Optativa II', creditos: 12 },
      { nombre: 'Diseño publicitario', creditos: 12 },
      { nombre: 'Hipermedia y realidad aumentada', creditos: 12 },
    ],
  },
  {
    semestre: '08', titulo: 'Octavo Semestre',
    materias: [
      { nombre: 'Seminario de investigación', creditos: 9 },
      { nombre: 'Diseño de empaques y embalajes', creditos: 12 },
      { nombre: 'Diseño y gestión de proyectos', creditos: 11 },
      { nombre: 'Integración profesional', creditos: 12 },
      { nombre: 'Identidad corporativa', creditos: 9 },
      { nombre: 'Seminario de caso práctico', creditos: 12 },
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
  letter-spacing: 0.3px;
}

.hero-carrera h1 {
  font-size: clamp(24px, 3vw, 40px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 20px;
}

.hero-carrera h1 span {
  color: #1a3a8c;
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
  margin-bottom: 40px;
}

.s-title.light {
  color: white;
}

/* ─── PERFIL ───────────────────────────────────────── */
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

.perfil-content {
  flex: 1;
  min-width: 0;
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

.perfil-qr .qr-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.perfil-qr .qr-img {
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

/* ─── PLAN DE ESTUDIOS ─────────────────────────────── */
.semestres-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
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
  margin-bottom: 8px;
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
  margin-top: 24px;
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
}
</style>