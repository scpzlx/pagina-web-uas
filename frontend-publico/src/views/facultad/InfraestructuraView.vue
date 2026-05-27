<template>
  <div class="infra-page">

    <!-- HERO — amarillo -->
    <section class="hero-infra">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Facultad</span>
            <i class="ti ti-chevron-right"></i>
            <span>Infraestructura</span>
          </div>
          <h1>Nuestras <br><span>Instalaciones</span></h1>
          <p>Dos edificios modernos diseñados para proporcionar un ambiente propicio para el aprendizaje artístico y la
            formación integral de nuestros estudiantes.</p>
          <div class="hero-badges">
            <span><i class="ti ti-building"></i> 2 Edificios · 3 niveles</span>
            <span><i class="ti ti-map-pin"></i> Culiacán, Sinaloa</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/ImageHero.jpg" alt="Instalaciones de la EDAV" class="hero-img" />
            <div class="hero-img-badge">
              <i class="ti ti-building"></i>
              <span>Campus EDAV</span>
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
            <div class="stat-icon"><i :class="`ti ${stat.icon}`" aria-hidden="true"></i></div>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="intro-box">
          <div class="intro-icon"><i class="ti ti-building" aria-hidden="true"></i></div>
          <div>
            <h2>Infraestructura de Primer Nivel</h2>
            <p>Actualmente, la infraestructura física de nuestra Facultad consta de dos edificios modernos de tres
              niveles cada uno, en los que se ubican 14 aulas equipadas con mobiliario adecuado, proyectores y aire
              acondicionado. Además, contamos con instalaciones especializadas que incluyen laboratorios de cómputo de
              última generación, áreas comunes, biblioteca especializada y espacios dedicados a la investigación y el
              desarrollo académico.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ÁREAS ESPECIALIZADAS — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Tecnología y Aprendizaje</div>
        <h2 class="s-title">Áreas Especializadas</h2>
        <div class="areas-grid">
          <div v-for="area in areasEspecializadas" :key="area.title" class="area-card">
            <div class="area-header">
              <div class="area-icon"><i :class="`ti ${area.icon}`" aria-hidden="true"></i></div>
              <div>
                <h3>{{ area.title }}</h3>
                <span class="area-tag">{{ area.tag }}</span>
              </div>
            </div>
            <p>{{ area.desc }}</p>
            <ul v-if="area.items" class="area-list">
              <li v-for="item in area.items" :key="item">
                <i class="ti ti-check" aria-hidden="true"></i> {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ÁREAS COMUNES — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Servicios</div>
        <h2 class="s-title">Áreas Comunes</h2>
        <div class="comunes-grid">
          <div v-for="area in areasComunes" :key="area.title" class="comun-card">
            <div class="comun-icon"><i :class="`ti ${area.icon}`" aria-hidden="true"></i></div>
            <h3>{{ area.title }}</h3>
            <span class="area-tag">{{ area.tag }}</span>
            <p>{{ area.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL — gris con borde amarillo -->
    <section class="section bg-gray cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-building deco-icon" aria-hidden="true"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">Conoce más</div>
            <h2 class="s-title">¿Te interesa estudiar aquí?</h2>
            <p>Visita nuestras instalaciones y conoce de primera mano el ambiente creativo y los recursos que tenemos
              para tu formación artística y profesional.</p>
            <div class="cta-btns">
              <RouterLink to="/carreras/artes-visuales" class="btn-primary">
                Ver oferta educativa <i class="ti ti-arrow-right"></i>
              </RouterLink>
              <RouterLink to="/facultad/directorio" class="btn-outline">
                Contactar a la facultad
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
  { icon: 'ti-building', number: '2', label: 'Edificios' },
  { icon: 'ti-door', number: '14', label: 'Aulas Equipadas' },
  { icon: 'ti-device-desktop', number: '200+', label: 'Computadoras' },
  { icon: 'ti-books', number: '5,000+', label: 'Libros' },
  { icon: 'ti-users', number: '300', label: 'Cap. Auditorio' },
  { icon: 'ti-car', number: '150', label: 'Cajones Estac.' },
]

const areasEspecializadas = [
  {
    icon: 'ti-device-desktop',
    title: 'Centro de Cómputo',
    tag: 'Tecnología Avanzada',
    desc: 'Equipado con más de 200 computadoras de última generación con software especializado. Conexión de alta velocidad y ambiente climatizado.',
    items: ['Software especializado', 'Internet de alta velocidad', 'Soporte técnico permanente', 'Horario extendido'],
  },
  {
    icon: 'ti-books',
    title: 'Biblioteca',
    tag: 'Acervo Especializado',
    desc: 'Amplio acervo bibliográfico con más de 5,000 títulos físicos y acceso a bases de datos digitales internacionales.',
    items: ['Más de 5,000 títulos', 'Bases de datos digitales', 'Salas de estudio', 'Préstamo a domicilio'],
  },
  {
    icon: 'ti-video',
    title: 'Sala Audiovisual',
    tag: 'Tecnología Multimedia',
    desc: 'Espacio equipado con tecnología audiovisual de vanguardia para presentaciones y conferencias. Capacidad para 80 personas.',
    items: ['Audio profesional', 'Proyectores HD', 'Videoconferencias', 'Pantallas interactivas'],
  },
  {
    icon: 'ti-chart-bar',
    title: 'Laboratorio de Simulación',
    tag: 'Aprendizaje Práctico',
    desc: 'Espacio dedicado a la simulación de escenarios donde los estudiantes aplican conocimientos teóricos en casos prácticos.',
    items: ['Simuladores especializados', 'Software de análisis', 'Casos interactivos', 'Trabajo colaborativo'],
  },
  {
    icon: 'ti-music',
    title: 'Auditorio',
    tag: 'Eventos Académicos',
    desc: 'Auditorio con capacidad para 300 personas, equipado con tecnología de audio, video e iluminación profesional.',
    items: ['300 personas', 'Sonido profesional', 'Iluminación escénica', 'Aire acondicionado'],
  },
  {
    icon: 'ti-school',
    title: 'Aulas de Capacitación',
    tag: 'Educación Continua',
    desc: '14 aulas equipadas con tecnología educativa moderna, mobiliario ergonómico y sistemas de climatización.',
    items: ['Proyectores y pantallas', 'Pizarrones inteligentes', 'Mobiliario ergonómico', 'Climatización'],
  },
]

const areasComunes = [
  { icon: 'ti-tools-kitchen-2', title: 'Comedor', tag: 'Servicio de Alimentos', desc: 'Cafetería con amplio espacio que ofrece alimentos nutritivos y económicos durante toda la jornada académica.' },
  { icon: 'ti-car', title: 'Estacionamiento', tag: 'Acceso Vehicular', desc: 'Amplio estacionamiento con capacidad para 150 vehículos, vigilancia 24 horas y áreas para bicicletas y motocicletas.' },
  { icon: 'ti-trees', title: 'Jardines y Áreas Verdes', tag: 'Espacios Recreativos', desc: 'Áreas verdes y jardines para esparcimiento y convivencia, promoviendo un ambiente saludable.' },
  { icon: 'ti-accessible', title: 'Sanitarios', tag: 'Servicios Básicos', desc: 'Instalaciones sanitarias modernas distribuidas en todos los niveles, con accesibilidad universal.' },
  { icon: 'ti-book', title: 'Sala para Tutorías', tag: 'Acompañamiento Académico', desc: 'Espacios cómodos y privados para sesiones de tutoría, asesorías individuales y trabajo colaborativo.' },
  { icon: 'ti-briefcase', title: 'Cubículos para Profesores', tag: 'Espacio Docente', desc: 'Espacios de trabajo equipados para la labor docente, investigación y atención a estudiantes.' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.infra-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ─────────────────────────────────────────── */
.hero-infra {
  background: #ffd500;
  padding: 64px 48px 56px;
  position: relative;
  overflow: hidden;
}

.hero-infra::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-infra::after {
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

.hero-infra h1 {
  font-size: clamp(26px, 3.5vw, 44px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.hero-infra h1 span {
  color: #1a3a8c;
  opacity: 0.7;
}

.hero-infra p {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 28px;
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

.hero-badges span i {
  font-size: 14px;
}

.hero-right {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-img-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(15, 26, 140, 0.2);
}

.hero-img {
  width: 100%;
  height: 280px;
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
  padding: 48px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
  font-size: 26px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.3;
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

.s-tag {
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 8px;
}

.s-title {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.5px;
  margin-bottom: 40px;
}

/* ─── INTRO ────────────────────────────────────────── */
.intro-box {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 36px;
  border-left: 4px solid #ffd500;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.intro-icon {
  font-size: 36px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 4px;
}

.intro-box h2 {
  color: #0f1a8c;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
}

.intro-box p {
  color: #555;
  font-size: 14px;
  line-height: 1.8;
}

/* ─── ÁREAS ESPECIALIZADAS ─────────────────────────── */
.areas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.area-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  border-top: 3px solid #0f1a8c;
  transition: transform 0.2s, box-shadow 0.2s;
}

.area-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.area-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
}

.area-icon {
  font-size: 28px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 2px;
}

.area-header h3 {
  color: #0f1a8c;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
}

.area-tag {
  font-size: 11px;
  font-weight: 600;
  background: #e8ecff;
  color: #0f1a8c;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
}

.area-card p {
  color: #555;
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 14px;
}

.area-list {
  list-style: none;
  padding: 0;
}

.area-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #555;
  padding: 5px 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
}

.area-list li:last-child {
  border-bottom: none;
}

.area-list li i {
  color: #0f1a8c;
  font-size: 14px;
  flex-shrink: 0;
}

/* ─── ÁREAS COMUNES ────────────────────────────────── */
.comunes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.comun-card {
  background: #f4f5f9;
  border-radius: 14px;
  padding: 24px;
  border-top: 3px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.comun-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.comun-icon {
  font-size: 28px;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.comun-card h3 {
  color: #0f1a8c;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
}

.comun-card p {
  color: #555;
  font-size: 13px;
  line-height: 1.7;
  margin-top: 10px;
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

.cta-text p {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 28px;
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
@media (max-width: 900px) {
  .hero-infra {
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
    grid-template-columns: repeat(3, 1fr);
  }

  .section {
    padding: 56px 24px;
  }

  .areas-grid {
    grid-template-columns: 1fr 1fr;
  }

  .comunes-grid {
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
  .hero-infra {
    padding: 40px 16px;
  }

  .stats-section {
    padding: 24px 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section {
    padding: 40px 16px;
  }

  .areas-grid {
    grid-template-columns: 1fr;
  }

  .comunes-grid {
    grid-template-columns: 1fr;
  }

  .intro-box {
    flex-direction: column;
    gap: 16px;
  }
}
</style>