<template>
  <div class="historia-page">

    <!-- HERO — amarillo -->
    <section class="hero-historia">
      <div class="hero-inner">
        <div class="hero-breadcrumb">
          <RouterLink to="/">Inicio</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <span>Facultad</span>
          <i class="ti ti-chevron-right"></i>
          <span>Nuestra Historia</span>
        </div>
        <h1>Historia y Filosofía <br><span>de la EDAV</span></h1>
        <p>Conoce los orígenes, la misión y el impacto cultural de la Facultad de Artes de la
          Universidad Autónoma de Sinaloa.</p>
        <div class="hero-stats">
          <div class="h-stat"><strong>1957</strong><span>Fundación oficial</span></div>
          <div class="h-sep"></div>
          <div class="h-stat"><strong>68+</strong><span>Años de historia</span></div>
          <div class="h-sep"></div>
          <div class="h-stat"><strong>3</strong><span>Licenciaturas</span></div>
          <div class="h-sep"></div>
          <div class="h-stat"><strong>500+</strong><span>Estudiantes activos</span></div>
        </div>
      </div>
    </section>

    <!-- ORÍGENES — timeline -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Desde 1873</div>
        <h2 class="s-title">Orígenes e Historia Institucional</h2>
        <div class="timeline">
          <div class="tl-line"></div>
          <div v-for="(item, i) in timeline" :key="item.year" class="tl-item" :class="i % 2 === 0 ? 'left' : 'right'">
            <div class="tl-content">
              <div class="tl-year">{{ item.year }}</div>
              <div class="tl-card">
                <div class="tl-icon"><i :class="`ti ${item.icon}`" aria-hidden="true"></i></div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            </div>
            <div class="tl-dot"></div>
          </div>
        </div>
        <div class="conclusion-box">
          <i class="ti ti-quote" aria-hidden="true"></i>
          <p>Aunque la UAS tiene más de un siglo de historia, la EDAV representa una evolución de su compromiso con las
            artes visuales, surgida de la necesidad de formalizar la enseñanza plástica y visual en Sinaloa.</p>
        </div>
      </div>
    </section>

    <!-- FILOSOFÍA — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Misión</div>
        <h2 class="s-title">Filosofía y Misión Educativa</h2>
        <div class="filosofia-grid">
          <div v-for="(card, i) in filosofia" :key="i" class="f-card" :class="{ featured: card.destacada }">
            <div class="f-icon"><i :class="`ti ${card.icon}`" aria-hidden="true"></i></div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
            <div v-if="card.destacada" class="f-badge">Valor central</div>
          </div>
        </div>
      </div>
    </section>

    <!-- OFERTA — azul -->
    <section class="section bg-dark">
      <div class="container">
        <div class="s-tag light">Carreras</div>
        <h2 class="s-title light">Oferta Académica y Perfil Formativo</h2>
        <div class="lic-grid">
          <RouterLink v-for="lic in licenciaturas" :key="lic.num" :to="lic.to" class="lic-card">
            <div class="lic-header">
              <div class="lic-num">{{ lic.num }}</div>
              <i :class="`ti ${lic.icon}`" class="lic-icon" aria-hidden="true"></i>
            </div>
            <h3>{{ lic.title }}</h3>
            <p>{{ lic.desc }}</p>
            <div class="lic-tags">
              <span v-for="t in lic.tags" :key="t">{{ t }}</span>
            </div>
            <div class="lic-cta">Ver carrera <i class="ti ti-arrow-right" aria-hidden="true"></i></div>
          </RouterLink>
        </div>
        <div class="perfil-box">
          <div class="perfil-icon"><i class="ti ti-award" aria-hidden="true"></i></div>
          <div>
            <h3>Perfil del Egresado</h3>
            <p>El plan de estudios combina historia del arte, teoría, técnicas tradicionales y contemporáneas, dibujo,
              pintura, grabado, tridimensionalidad, fotografía, video, curaduría, administración cultural e
              investigación. Todo diseñado para formar artistas-gestores críticos, conscientes de su contexto.</p>
            <p class="perfil-highlight">La formación también incluye idioma extranjero obligatorio, certificaciones en
              tecnologías y competencias transversales, así como actividades extracurriculares y servicio social.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- IMPACTO — gris claro -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Comunidad</div>
        <h2 class="s-title">Impacto Social y Cultural</h2>
        <div class="impacto-grid">
          <div v-for="(item, i) in impacto" :key="i" class="imp-card">
            <div class="imp-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="imp-icon"><i :class="`ti ${item.icon}`" aria-hidden="true"></i></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONCLUSIÓN — blanco -->
    <section class="section bg-white conclusion-section">
      <div class="container">
        <div class="conclusion-inner">
          <div class="conclusion-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-palette deco-icon" aria-hidden="true"></i>
          </div>
          <div class="conclusion-text">
            <div class="s-tag">Nuestra esencia</div>
            <h2 class="s-title">Una institución que transforma</h2>
            <p>La EDAV contribuye no solo a formar artistas y diseñadores, sino a fortalecer la cultura local, construir
              identidad colectiva y abrir espacios de diálogo social a través del arte.</p>
            <blockquote>
              La Facultad de Artes de la UAS representa un esfuerzo institucional por consolidar la
              formación artística y cultural en Sinaloa, integrando tradición plástica, innovación multimedia,
              compromiso social y formación integral.
            </blockquote>
            <RouterLink to="/carreras/artes-visuales" class="btn-cta">
              Conoce nuestras carreras <i class="ti ti-arrow-right" aria-hidden="true"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const timeline = [
  { year: '1873', icon: 'ti-building', title: 'Fundación del Liceo Rosales', desc: 'La UAS tiene sus raíces en el antiguo Liceo Rosales, que tras varias transformaciones históricas terminó por consolidarse como la Universidad Autónoma de Sinaloa, con su autonomía restablecida en 1965.' },
  { year: '1950s', icon: 'ti-palette', title: 'Taller de Artes Plásticas', desc: 'Antecedente directo de la EDAV: un Taller de Artes Plásticas dentro de la universidad que sentó las bases de la enseñanza artística formal en Sinaloa.' },
  { year: '1957', icon: 'ti-certificate', title: 'Reconocimiento Formal', desc: 'La escuela se reconoció formalmente como institución educativa alrededor del 26 de enero de 1957, consolidando la enseñanza de las artes visuales en la región.' },
  { year: 'HOY', icon: 'ti-school', title: 'EDAV Actual', desc: 'Hoy la EDAV forma parte de la estructura de la UAS como la unidad centrada en artes visuales, diseño multimedia, fotografía, video y más, con más de 500 estudiantes activos.' },
]

const filosofia = [
  { icon: 'ti-palette', title: 'Formación Amplia y Plural', desc: 'Pintura, escultura, grabado, fotografía, video, instalación y diseño multimedia para una visión artística actual y completa.', destacada: false },
  { icon: 'ti-world', title: 'Compromiso Social y Cultural', desc: 'Ética, sostenibilidad, transversales de género y conciencia del contexto local, nacional e internacional.', destacada: true },
  { icon: 'ti-settings', title: 'Producción + Análisis + Gestión', desc: 'Teoría del arte, historia, crítica, curaduría, museografía y gestión cultural integradas en la formación profesional.', destacada: false },
  { icon: 'ti-school', title: 'Diversidad de Salidas Profesionales', desc: 'Tres licenciaturas con distintas orientaciones para cada interés artístico, desde artes plásticas hasta multimedia.', destacada: false },
  { icon: 'ti-building-community', title: 'Vinculación con la Comunidad', desc: 'Murales, exposiciones y festivales culturales que refuerzan la identidad regional y la transformación social.', destacada: false },
]

const licenciaturas = [
  { num: '01', icon: 'ti-palette', title: 'Artes Visuales', desc: 'Pintura, escultura, grabado y medios contemporáneos para formar artistas con visión crítica y técnica sólida.', to: '/carreras/artes-visuales', tags: ['4 años', 'Licenciatura', 'Presencial'] },
  { num: '02', icon: 'ti-devices', title: 'Diseño y Arte Multimedia', desc: 'Diseño gráfico, animación digital, multimedia e interfaces para el mundo creativo y tecnológico actual.', to: '/carreras/diseno-arte-multimedia', tags: ['4 años', 'Licenciatura', 'Presencial'] },
  { num: '03', icon: 'ti-camera', title: 'Fotografía y Producción de Video', desc: 'Imagen fija, edición, producción audiovisual y narrativa visual para medios y proyectos culturales.', to: '/carreras/fotografia-produccion-video', tags: ['4 años', 'Licenciatura', 'Presencial'] },
  { num: '04', icon: 'ti-music', title: 'Música', desc: 'Interpretación instrumental, composición y dirección musical con formación artística integral para contribuir al desarrollo cultural y educativo.', to: '/carreras/musica', tags: ['4 años', 'Licenciatura', 'Presencial'] },
  { num: '05', icon: 'ti-vinyl', title: 'Música Popular Contemporánea', desc: 'Interpretación, composición y producción de música popular contemporánea para formar artistas capaces de desarrollarse en la industria musical actual.', to: '/carreras/musica-popular-contemporanea', tags: ['3.5 años', 'Licenciatura', 'Presencial'] },
  { num: '06', icon: 'ti-school', title: 'Educación Artística', desc: 'Formación en artes, pedagogía y gestión cultural para preparar profesionales capaces de enseñar y promover la educación artística.', to: '/carreras/educacion-artistica', tags: ['4 años', 'Licenciatura', 'Mixta'] },
  { num: '07', icon: 'ti-masks-theater', title: 'Artes Escénicas', desc: 'Actuación, dirección, producción y creación escénica para formar profesionales capaces de desarrollar proyectos artísticos y culturales.', to: '/carreras/artes-escenicas', tags: ['4 años', 'Licenciatura', 'Presencial'] },
  { num: '08', icon: 'ti-certificate', title: 'Maestria en Educación Artística', desc: 'Investigación, innovación pedagógica y gestión educativa en las artes para formar especialistas capaces de fortalecer la educación artística.', to: '/posgrado/maestria-educacion-artistica', tags: ['2 años', 'Posgrado', 'Presencial'] },
]

const impacto = [
  { icon: 'ti-masks-theater', title: 'Festivales y Cultura', desc: 'Participación activa en el Festival Internacional Universitario de la Cultura (FIUC) con actividades de artes visuales, exposiciones y talleres abiertos a la comunidad.' },
  { icon: 'ti-photo', title: 'Proyectos Comunitarios', desc: 'Murales monumentales, exposiciones e intervenciones públicas con impacto directo en la identidad universitaria y la transformación del espacio social sinaloense.' },
  { icon: 'ti-book', title: 'Conciencia Regional', desc: 'Formación con historia del arte mexicano y regional, diplomados y valorización del arte propio de Sinaloa como parte esencial del currículo.' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.historia-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ─────────────────────────────────────────── */
.hero-historia {
  background: #ffd500;
  padding: 64px 48px 56px;
  position: relative;
  overflow: hidden;
}

.hero-historia::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-historia::after {
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

.hero-historia h1 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.hero-historia h1 span {
  color: #0f1a8c;
  opacity: 0.75;
}

.hero-historia p {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: 36px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(15, 26, 140, 0.08);
  border-radius: 14px;
  padding: 16px 24px;
  width: fit-content;
  flex-wrap: wrap;
  gap: 0;
}

.h-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
}

.h-stat strong {
  font-size: 24px;
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1;
}

.h-stat span {
  font-size: 11px;
  color: rgba(15, 26, 140, 0.65);
  margin-top: 3px;
  white-space: nowrap;
}

.h-sep {
  width: 1px;
  height: 36px;
  background: rgba(15, 26, 140, 0.15);
}

/* ─── LAYOUT ───────────────────────────────────────── */
.section {
  padding: 72px 48px;
}

.bg-gray {
  background: #f4f5f9;
}

.bg-white {
  background: white;
}

.bg-dark {
  background: #0f1a8c;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
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
  margin-bottom: 48px;
  line-height: 1.2;
}

.s-title.light {
  color: white;
}

/* ─── TIMELINE ─────────────────────────────────────── */
.timeline {
  position: relative;
  padding: 0 0 24px;
  margin-bottom: 40px;
}

.tl-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #ffd500 0%, #0f1a8c 100%);
  transform: translateX(-50%);
  border-radius: 2px;
}

.tl-item {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

.tl-item.left {
  flex-direction: row;
}

.tl-item.right {
  flex-direction: row-reverse;
}

.tl-dot {
  width: 18px;
  height: 18px;
  background: #ffd500;
  border: 3px solid #0f1a8c;
  border-radius: 50%;
  flex-shrink: 0;
  z-index: 2;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.tl-content {
  width: calc(50% - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.tl-item.right .tl-content {
  align-items: flex-start;
}

.tl-year {
  background: #0f1a8c;
  color: #ffd500;
  font-size: 12px;
  font-weight: 800;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.tl-card {
  background: white;
  border-radius: 16px;
  padding: 22px 24px;
  box-shadow: 0 4px 20px rgba(15, 26, 140, 0.08);
  border: 1px solid rgba(15, 26, 140, 0.07);
  max-width: 360px;
  width: 100%;
  border-top: 3px solid #ffd500;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tl-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(15, 26, 140, 0.13);
}

.tl-icon {
  font-size: 24px;
  color: #0f1a8c;
  margin-bottom: 10px;
}

.tl-card h3 {
  font-size: 15px;
  font-weight: 700;
  color: #0f1a8c;
  margin-bottom: 8px;
}

.tl-card p {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
}

.conclusion-box {
  background: white;
  border-radius: 14px;
  padding: 28px 32px;
  border-left: 4px solid #ffd500;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 16px;
  align-items: flex-start;
  max-width: 700px;
  margin: 0 auto;
}

.conclusion-box i {
  font-size: 28px;
  color: #ffd500;
  flex-shrink: 0;
  margin-top: 2px;
}

.conclusion-box p {
  font-size: 14px;
  line-height: 1.8;
  color: #555;
  font-style: italic;
}

/* ─── FILOSOFÍA ────────────────────────────────────── */
.filosofia-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.f-card {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 26px;
  border-top: 3px solid #0f1a8c;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.f-card.featured {
  background: #ffd500;
  border-top-color: #0f1a8c;
  grid-column: span 1;
}

.f-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.f-icon {
  font-size: 28px;
  color: #0f1a8c;
  margin-bottom: 14px;
}

.f-card.featured .f-icon {
  color: #0f1a8c;
}

.f-card h3 {
  font-size: 15px;
  font-weight: 700;
  color: #0f1a8c;
  margin-bottom: 8px;
}

.f-card p {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
}

.f-card.featured p {
  color: rgba(15, 26, 140, 0.75);
}

.f-badge {
  display: inline-block;
  margin-top: 12px;
  background: #0f1a8c;
  color: #ffd500;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* ─── LICENCIATURAS ────────────────────────────────── */
.lic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

.lic-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 26px 22px;
  text-decoration: none;
  display: block;
  transition: background 0.2s, transform 0.2s;
}

.lic-card:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-4px);
}

.lic-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.lic-num {
  background: #ffd500;
  color: #0f1a8c;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 800;
}

.lic-icon {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.3);
}

.lic-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
}

.lic-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 16px;
}

.lic-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.lic-tags span {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
  background: rgba(255, 213, 0, 0.15);
  color: #ffd500;
  border: 1px solid rgba(255, 213, 0, 0.3);
}

.lic-cta {
  font-size: 13px;
  font-weight: 600;
  color: #ffd500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.perfil-box {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 4px solid #ffd500;
  border-radius: 14px;
  padding: 28px 32px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.perfil-icon {
  font-size: 32px;
  color: #ffd500;
  flex-shrink: 0;
}

.perfil-box h3 {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.perfil-box p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.8;
  margin-bottom: 12px;
}

.perfil-highlight {
  background: rgba(255, 213, 0, 0.1);
  padding: 14px 18px;
  border-radius: 10px;
  border-left: 3px solid #ffd500;
  margin-bottom: 0 !important;
  color: rgba(255, 255, 255, 0.85) !important;
}

/* ─── IMPACTO ──────────────────────────────────────── */
.impacto-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.imp-card {
  background: white;
  border-radius: 16px;
  padding: 28px 24px;
  border-top: 3px solid #ffd500;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.imp-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(15, 26, 140, 0.1);
}

.imp-num {
  font-size: 48px;
  font-weight: 800;
  color: rgba(15, 26, 140, 0.06);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -2px;
}

.imp-icon {
  font-size: 28px;
  color: #0f1a8c;
  margin-bottom: 14px;
}

.imp-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: #0f1a8c;
  margin-bottom: 10px;
}

.imp-card p {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
}

/* ─── CONCLUSIÓN ───────────────────────────────────── */
.conclusion-section {
  border-top: 3px solid #ffd500;
}

.conclusion-inner {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 64px;
  align-items: center;
}

.conclusion-deco {
  position: relative;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
}

.c1 {
  width: 200px;
  height: 200px;
  background: #ffd500;
  opacity: 0.15;
}

.c2 {
  width: 140px;
  height: 140px;
  background: #0f1a8c;
  opacity: 0.08;
}

.deco-icon {
  font-size: 64px;
  color: #0f1a8c;
  opacity: 0.2;
  z-index: 1;
}

.conclusion-text {}

.conclusion-text p {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
}

.conclusion-text blockquote {
  background: #fffbe6;
  border-left: 4px solid #ffd500;
  padding: 18px 22px;
  border-radius: 0 12px 12px 0;
  font-size: 14px;
  color: #333;
  line-height: 1.8;
  font-style: italic;
  margin-bottom: 28px;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0f1a8c;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.btn-cta:hover {
  background: #1a2db5;
  transform: translateY(-1px);
}

/* ─── RESPONSIVE ───────────────────────────────────── */
@media (max-width: 900px) {
  .section {
    padding: 56px 24px;
  }

  .hero-historia {
    padding: 48px 24px;
  }

  .hero-stats {
    gap: 0;
  }

  .h-stat {
    padding: 0 16px;
  }

  .tl-line {
    left: 28px;
  }

  .tl-item {
    flex-direction: row !important;
  }

  .tl-dot {
    left: 28px;
    transform: translateX(-50%);
    transform: none;
    left: 19px;
  }

  .tl-content {
    width: calc(100% - 60px);
    margin-left: 60px;
    align-items: flex-start !important;
  }

  .filosofia-grid {
    grid-template-columns: 1fr 1fr;
  }

  .lic-grid {
    grid-template-columns: 1fr;
  }

  .impacto-grid {
    grid-template-columns: 1fr 1fr;
  }

  .conclusion-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .conclusion-deco {
    height: 120px;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 40px 16px;
  }

  .hero-historia {
    padding: 40px 16px;
  }

  .hero-stats {
    width: 100%;
    justify-content: center;
  }

  .h-stat {
    padding: 0 12px;
  }

  .filosofia-grid {
    grid-template-columns: 1fr;
  }

  .impacto-grid {
    grid-template-columns: 1fr;
  }

  .perfil-box {
    flex-direction: column;
  }
}
</style>