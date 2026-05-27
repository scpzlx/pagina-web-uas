<template>
  <div class="taller-page">

    <!-- HERO — amarillo -->
    <section class="hero-taller">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Departamentos</span>
            <i class="ti ti-chevron-right"></i>
            <span>Taller de Escultura</span>
          </div>
          <h1>Taller de<br><span>Escultura</span></h1>
          <p>Espacio dedicado a la creación artística tridimensional donde los estudiantes desarrollan sus habilidades
            en escultura, modelado y construcción.</p>
          <div class="hero-badges">
            <span><i class="ti ti-tools"></i> Área especializada</span>
            <span><i class="ti ti-shield-check"></i> Uso reglamentado</span>
          </div>
        </div>
        <!-- <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/area-modelado.jpeg" alt="Taller de Escultura" class="hero-img" />
            <div class="hero-img-badge">
              <i class="ti ti-tools"></i>
              <span>Taller de Escultura</span>
            </div>
          </div>
        </div> -->
      </div>
    </section>

    <!-- REGLAMENTO — azul -->
    <section class="reglamento-section">
      <div class="container">
        <div class="s-tag light">Normatividad del taller</div>
        <h2 class="s-title light">Información del Taller</h2>
        <div class="reglamento-grid">
          <div v-for="reg in reglamento" :key="reg.titulo" class="reg-card">
            <div class="reg-icon"><i :class="`ti ${reg.icon}`" aria-hidden="true"></i></div>
            <h3>{{ reg.titulo }}</h3>
            <ul>
              <li v-for="item in reg.items" :key="item">
                <i class="ti ti-chevron-right" aria-hidden="true"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICIOS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Equipamiento</div>
        <h2 class="s-title">Servicios del Taller</h2>
        <div class="servicios-grid">
          <div v-for="servicio in servicios" :key="servicio.titulo" class="servicio-card">
            <div class="servicio-img">
              <img v-if="servicio.img" :src="servicio.img" :alt="servicio.titulo" />
              <div v-else class="servicio-placeholder">
                <i class="ti ti-tools" aria-hidden="true"></i>
              </div>
            </div>
            <div class="servicio-body">
              <h4>{{ servicio.titulo }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NORMAS — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Conducta y seguridad</div>
        <h2 class="s-title">Normas Disciplinarias</h2>
        <div class="normas-wrap">
          <div class="normas-list">
            <div v-for="norma in normas" :key="norma.letra" class="norma-item">
              <div class="norma-letra">{{ norma.letra }}</div>
              <p>{{ norma.texto }}</p>
            </div>
          </div>
          <div class="alerta-box">
            <div class="alerta-icon"><i class="ti ti-alert-triangle" aria-hidden="true"></i></div>
            <div>
              <strong>Importante</strong>
              <p>El incumplimiento de estas normas puede resultar en sanciones que incluyen la suspensión temporal o
                permanente del uso de las instalaciones, así como la obligación de cubrir costos de reposición de equipo
                dañado.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA — blanco con borde amarillo -->
    <section class="section bg-white cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-tools deco-icon" aria-hidden="true"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">¿Más información?</div>
            <h2 class="s-title">Consulta el reglamento completo</h2>
            <p>Para conocer el reglamento completo del Taller de Escultura o resolver cualquier duda, puedes consultar
              con la Secretaría Administrativa o con Control Escolar.</p>
            <div class="cta-btns">
              <RouterLink to="/facultad/normatividad" class="btn-primary">
                Ver normatividad <i class="ti ti-arrow-right"></i>
              </RouterLink>
              <RouterLink to="/departamentos/secretaria-administrativa" class="btn-outline">
                Secretaría Administrativa
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

const reglamento = [
  {
    titulo: 'Derechos',
    icon: 'ti-shield-check',
    items: [
      'Los usuarios tienen derecho de hacer uso del Taller de escultura en sus diferentes áreas.',
      'Los usuarios podrán utilizar las mesas individuales y grupales así como estantes disponibles dentro del taller.',
      'Solo los alumnos internos con registro vigente pueden hacer uso de las instalaciones bajo la tutela del docente.',
      'Las esculturas realizadas serán resguardadas dentro del taller hasta su entrega por parte del docente.',
    ],
  },
  {
    titulo: 'Obligaciones',
    icon: 'ti-clipboard-list',
    items: [
      'El usuario deberá depositar en las zonas específicas sus pertenencias durante su estancia en el Taller de Escultura.',
      'Todo usuario, sin excepción, deberá comprar el material que les indique el docente del taller.',
      'Todo usuario, sin excepción, deberá mantener el orden en los turnos de ingreso al Taller de Escultura.',
      'Los usuarios están obligados a conducirse de manera respetuosa y apropiada.',
    ],
  },
  {
    titulo: 'Sanciones',
    icon: 'ti-alert-circle',
    items: [
      'El usuario que incurra en un daño al equipo se obliga a cubrir el importe de reposición si el daño fue por mal uso.',
      'Cuando se sorprenda al usuario dañando o hurtando material, serán suspendidos sus derechos de entrada al taller.',
      'Al usuario que se sorprenda haciendo actos vandálicos dentro de las instalaciones será canalizado con las autoridades.',
    ],
  },
]

const servicios = [
  { titulo: 'Cortadores de madera y metal', img: '/images/cortador-metal.png' },
  { titulo: 'Área de soldadura', img: '/images/area-soldadura.jpeg' },
  { titulo: 'Área de modelado', img: '/images/area-modelado.jpeg' },
  { titulo: 'Área de estantes', img: '/images/area-estantes.jpg' },
  { titulo: 'Herramientas neumáticas', img: '/images/herramientas-neumaticas.jpg' },
]

const normas = [
  { letra: 'A', texto: 'Procurar la conservación de las instalaciones y el equipo proporcionado.' },
  { letra: 'B', texto: 'Aseo general al taller una vez al mes con cada grupo.' },
  { letra: 'C', texto: 'No fumar dentro de las instalaciones.' },
  { letra: 'D', texto: 'Al trabajar con solventes tóxicos, asegúrate de estar en un área aislada y ventilada.' },
  { letra: 'E', texto: 'Mantener el área de trabajo ordenada y fuera de peligro.' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');


.taller-page {
  font-family: 'Outfit', sans-serif;
}

/* HERO */
.hero-taller {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-taller::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
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

.hero-taller h1 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  letter-spacing: -1px;
  margin-bottom: 16px;
  line-height: 1.1;
}

.hero-taller h1 span {
  color: rgba(15, 26, 140, 0.6);
}

.hero-taller p {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 440px;
}

.hero-badges {
  display: flex;
  gap: 8px;
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

/* REGLAMENTO */
.reglamento-section {
  background: #0f1a8c;
  padding: 72px 48px;
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
  margin-bottom: 36px;
}

.s-title.light {
  color: white;
}

.reglamento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.reg-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top: 3px solid #ffd500;
  border-radius: 14px;
  padding: 24px;
  transition: background 0.2s;
}

.reg-card:hover {
  background: rgba(255, 255, 255, 0.13);
}

.reg-icon {
  font-size: 28px;
  color: #ffd500;
  margin-bottom: 14px;
}

.reg-card h3 {
  color: white;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 16px;
}

.reg-card ul {
  list-style: none;
  padding: 0;
}

.reg-card li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 0;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
  line-height: 1.5;
}

.reg-card li:last-child {
  border-bottom: none;
}

.reg-card li i {
  color: #ffd500;
  font-size: 13px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* SERVICIOS */
.section {
  padding: 72px 48px;
}

.bg-white {
  background: white;
}

.bg-gray {
  background: #f4f5f9;
}

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.servicio-card {
  background: #f4f5f9;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-top: 3px solid #0f1a8c;
  transition: transform 0.2s, box-shadow 0.2s;
}

.servicio-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(15, 26, 140, 0.12);
}

.servicio-img {
  height: 140px;
  overflow: hidden;
  background: #e8ecff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.servicio-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.servicio-placeholder {
  color: rgba(15, 26, 140, 0.2);
  font-size: 40px;
}

.servicio-body {
  padding: 14px 16px;
}

.servicio-body h4 {
  color: #0f1a8c;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
}

/* NORMAS */
.normas-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 860px;
}

.normas-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.norma-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 18px 20px;
  border-left: 3px solid #0f1a8c;
}

.norma-letra {
  width: 36px;
  height: 36px;
  background: #0f1a8c;
  color: #ffd500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 800;
  flex-shrink: 0;
}

.norma-item p {
  color: #444;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  padding-top: 6px;
}

.alerta-box {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #fffbe6;
  border-left: 4px solid #ffd500;
  border-radius: 12px;
  padding: 20px 24px;
}

.alerta-icon {
  font-size: 24px;
  color: #b8860b;
  flex-shrink: 0;
  margin-top: 2px;
}

.alerta-box strong {
  display: block;
  color: #b8860b;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
}

.alerta-box p {
  color: #555;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

/* CTA */
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

/* RESPONSIVE */
@media (max-width: 1000px) {
  .servicios-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-taller {
    padding: 48px 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-right {
    display: none;
  }

  .reglamento-section {
    padding: 48px 24px;
  }

  .reglamento-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 48px 24px;
  }

  .servicios-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .cta-deco {
    height: 100px;
  }
}

@media (max-width: 600px) {
  .hero-taller {
    padding: 40px 16px;
  }

  .reglamento-section {
    padding: 40px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .servicios-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>