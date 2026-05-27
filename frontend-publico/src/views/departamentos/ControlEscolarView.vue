<template>
  <div class="control-page">

    <!-- HERO — amarillo -->
    <section class="hero-control">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Departamentos</span>
            <i class="ti ti-chevron-right"></i>
            <span>Control Escolar</span>
          </div>
          <div class="hero-area-tag">
            <i class="ti ti-clipboard-list"></i> Servicios Escolares
          </div>
          <h1>Control <br /><span>Escolar</span></h1>
          <p class="hero-desc">
            Gestión académica y administrativa al servicio de los estudiantes y
            docentes de la Escuela de Diseño y Artes Visuales de la UAS.
          </p>
          <div class="hero-badges">
            <span><i class="ti ti-clock"></i> Lun–Vie 8:00–15:00</span>
            <span><i class="ti ti-map-pin"></i> Campus UAS Culiacán</span>
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

    <!-- SERVICIOS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">¿Qué hacemos?</div>
        <h2 class="s-title">Servicios que ofrecemos</h2>
        <div class="servicios-grid">
          <div v-for="srv in servicios" :key="srv.title" class="srv-card">
            <div class="srv-icon"><i :class="`ti ${srv.icon}`"></i></div>
            <h3>{{ srv.title }}</h3>
            <p>{{ srv.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONVOCATORIA / IMAGEN — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Jornada Institucional</div>
        <h2 class="s-title">Evaluación al Desempeño Docente</h2>
        <div class="conv-wrap">
          <div class="conv-img-side">
            <img src="/images/control-escolar-image.jpeg" alt="Jornada Institucional de Evaluación al Desempeño Docente"
              class="conv-img" />
          </div>
          <div class="conv-info-side">
            <p class="conv-desc">
              La Jornada Institucional de Evaluación al Desempeño Docente es un
              proceso fundamental para asegurar la calidad educativa. Participar
              de manera activa fortalece el desarrollo académico de toda la
              comunidad universitaria.
            </p>
            <div class="conv-highlights">
              <div class="ch-item">
                <i class="ti ti-check"></i>
                <span>Proceso institucional obligatorio para docentes activos</span>
              </div>
              <div class="ch-item">
                <i class="ti ti-check"></i>
                <span>Mejora continua de la calidad educativa</span>
              </div>
              <div class="ch-item">
                <i class="ti ti-check"></i>
                <span>Retroalimentación constructiva para el cuerpo docente</span>
              </div>
              <div class="ch-item">
                <i class="ti ti-check"></i>
                <span>Coordinado por la Comisión Mixta de Capacitación UAS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ENLACES — azul -->
    <section class="section bg-dark">
      <div class="container">
        <div class="s-tag light">Recursos digitales</div>
        <h2 class="s-title light">Enlaces de Interés</h2>
        <div class="links-grid">
          <a v-for="link in enlaces" :key="link.label" :href="link.url" target="_blank" rel="noopener noreferrer"
            class="link-card">
            <div class="link-icon-wrap">
              <i :class="`ti ${link.icon}`"></i>
            </div>
            <div class="link-body">
              <div class="link-label">{{ link.label }}</div>
              <div class="link-sub">{{ link.sub }}</div>
            </div>
            <i class="ti ti-external-link link-arrow"></i>
          </a>
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
            <i class="ti ti-clipboard-list deco-icon"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">Contacto y Atención</div>
            <h2 class="s-title">Comisión Mixta de Capacitación y Adiestramiento</h2>
            <div class="contacto-info">
              <div class="contacto-item">
                <i class="ti ti-mail"></i>
                <div>
                  <span class="ci-label">Correo general</span>
                  <a href="mailto:adiestramiento.uas@educacion.mx">adiestramiento.uas@educacion.mx</a>
                </div>
              </div>
              <div class="contacto-item">
                <i class="ti ti-mail"></i>
                <div>
                  <span class="ci-label">Correo PIEFAD</span>
                  <a href="mailto:piefad@uas.edu.mx">piefad@uas.edu.mx</a>
                </div>
              </div>
              <div class="contacto-item">
                <i class="ti ti-phone"></i>
                <div>
                  <span class="ci-label">Teléfono</span>
                  <a href="tel:6677593830">667 759 3830</a>
                </div>
              </div>
              <div class="contacto-item">
                <i class="ti ti-map-pin"></i>
                <div>
                  <span class="ci-label">Dirección</span>
                  <p>Blvd. Francisco Labastida Ochoa (malecón nuevo) rumbo a La Limita, a 300 mts. de la carretera a
                    Imala. CP. 80064 Culiacán, Sinaloa, México</p>
                </div>
              </div>
            </div>
            <div class="cta-btns">
              <a href="https://siu.uas.net.mx/acceso/" target="_blank" class="btn-primary">
                Acceder al SIU <i class="ti ti-external-link"></i>
              </a>
              <RouterLink to="/departamentos/biblioteca" class="btn-outline">
                Ver Biblioteca
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
  { icon: 'ti-users', number: '+500', label: 'Estudiantes atendidos' },
  { icon: 'ti-calendar', number: '2', label: 'Jornadas anuales' },
  { icon: 'ti-link', number: '3', label: 'Portales disponibles' },
  { icon: 'ti-clock', number: '35h', label: 'Atención semanal' },
]

const servicios = [
  {
    icon: 'ti-id-badge',
    title: 'Inscripciones y Reinscripciones',
    desc: 'Gestión de altas, bajas y cambios de materia en los periodos establecidos por el calendario escolar.',
  },
  {
    icon: 'ti-certificate',
    title: 'Certificados y Constancias',
    desc: 'Emisión de documentos oficiales como historial académico, constancias de estudios y certificados parciales.',
  },
  {
    icon: 'ti-chart-bar',
    title: 'Evaluación Docente',
    desc: 'Coordinación de la Jornada Institucional de Evaluación al Desempeño Docente de la UAS.',
  },
  {
    icon: 'ti-file-text',
    title: 'Trámites Académicos',
    desc: 'Apoyo en cambios de carrera, equivalencias, recursamiento y demás procedimientos administrativos.',
  },
  {
    icon: 'ti-calendar-event',
    title: 'Calendario Escolar',
    desc: 'Difusión y gestión del calendario de actividades académicas del ciclo escolar vigente.',
  },
  {
    icon: 'ti-shield-check',
    title: 'Programa PIEFAD',
    desc: 'Administración del Programa Institucional de Evaluación de la Función del Académico Docente.',
  },
]

const enlaces = [
  {
    icon: 'ti-link',
    label: 'Portal de Acceso SIU',
    sub: 'Sistema Institucional Universitario · siu.uas.net.mx',
    url: 'https://siu.uas.net.mx/acceso/',
  },
  {
    icon: 'ti-clipboard-check',
    label: 'Encuesta de Evaluación',
    sub: 'Evaluación al desempeño docente · bit.ly/EncuestaEvalua',
    url: 'https://bit.ly/EncuestaEvalua',
  },
  {
    icon: 'ti-school',
    label: 'Programa PIEFAD',
    sub: 'Evaluación de la función académica · eau.uas.edu.mx',
    url: 'https://eau.uas.edu.mx/piefad',
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');


.control-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ─────────────────────────────────────────── */
.hero-control {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-control::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-control::after {
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
  grid-template-columns: 1fr;
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  letter-spacing: 0.3px;
}

.hero-control h1 {
  font-size: clamp(28px, 3.8vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.hero-control h1 span {
  opacity: 0.65;
}

.hero-desc {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  line-height: 1.7;
  margin-bottom: 22px;
  max-width: 420px;
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

/* ─── STATS ─────────────────────────────────────────── */
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

/* ─── SERVICIOS ──────────────────────────────────────── */
.servicios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.srv-card {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 28px 24px;
  border-top: 3px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.srv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(15, 26, 140, 0.1);
}

.srv-icon {
  font-size: 28px;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.srv-card h3 {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.srv-card p {
  font-size: 13px;
  color: #666;
  line-height: 1.7;
}

/* ─── CONVOCATORIA ────────────────────────────────────── */
.conv-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.conv-img-side {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.12);
}

.conv-img {
  width: 100%;
  height: auto;
  display: block;
}

.conv-desc {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 24px;
}

.conv-highlights {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ch-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #444;
}

.ch-item i {
  color: #0f1a8c;
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ─── ENLACES ────────────────────────────────────────── */
.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  padding: 22px 20px;
  text-decoration: none;
  color: white;
  transition: background 0.2s, transform 0.2s;
  border-left: 4px solid #ffd500;
}

.link-card:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-3px);
}

.link-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(255, 213, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #ffd500;
  flex-shrink: 0;
}

.link-body {
  flex: 1;
}

.link-label {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.link-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.4;
}

.link-arrow {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
}

/* ─── CTA FINAL ──────────────────────────────────────── */
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
  gap: 14px;
  margin-bottom: 28px;
}

.contacto-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
}

.contacto-item>i {
  font-size: 18px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 2px;
}

.ci-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.contacto-item a {
  color: #333;
  font-weight: 600;
  text-decoration: none;
}

.contacto-item a:hover {
  color: #0f1a8c;
  text-decoration: underline;
}

.contacto-item p {
  color: #555;
  line-height: 1.6;
  margin: 0;
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

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 1100px) {
  .servicios-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .links-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 900px) {
  .hero-control {
    padding: 48px 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 32px;
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

  .conv-wrap {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .links-grid {
    grid-template-columns: 1fr;
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
  .hero-control {
    padding: 40px 16px;
  }

  .stats-section {
    padding: 24px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .servicios-grid {
    grid-template-columns: 1fr;
  }
}
</style>