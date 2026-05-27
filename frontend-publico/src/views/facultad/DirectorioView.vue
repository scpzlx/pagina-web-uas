<template>
  <div class="directorio-page">

    <!-- HERO — amarillo -->
    <section class="hero-directorio">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Facultad</span>
            <i class="ti ti-chevron-right"></i>
            <span>Directorio</span>
          </div>
          <h1>Directorio</h1>
          <p>Conoce a nuestro equipo directivo, jefaturas de carrera y personal administrativo de la Facultad de Diseño
            y Artes Visuales.</p>
          <div class="hero-badges">
            <span><i class="ti ti-crown"></i> Autoridades</span>
            <span><i class="ti ti-school"></i> Jefaturas de Carrera</span>
            <span><i class="ti ti-users"></i> Departamentos</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-stats">
            <div class="hero-stat" v-for="stat in heroStats" :key="stat.label">
              <div class="hero-stat-n">{{ stat.number }}</div>
              <div class="hero-stat-l">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AUTORIDADES — azul -->
    <section class="autoridades-section">
      <div class="container">
        <div class="s-tag light">Liderazgo institucional</div>
        <h2 class="s-title light">Autoridades</h2>
        <div class="autoridades-grid">
          <div v-for="(auto, i) in autoridades" :key="auto.nombre" class="auto-card" :class="{ principal: i === 0 }">
            <div class="auto-foto">
              <img v-if="auto.foto" :src="auto.foto" :alt="auto.nombre" />
              <div v-else class="auto-avatar">
                <i class="ti ti-user" aria-hidden="true"></i>
              </div>
              <div v-if="i === 0" class="auto-badge-principal">
                <i class="ti ti-crown"></i> Dirección
              </div>
            </div>
            <div class="auto-body">
              <h3>{{ auto.nombre }}</h3>
              <span class="auto-cargo">{{ auto.cargo }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- JEFATURAS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Coordinación académica</div>
        <h2 class="s-title">Jefaturas de Carreras</h2>
        <div class="personal-grid">
          <div v-for="persona in jefaturas" :key="persona.nombre" class="personal-card">
            <div class="personal-foto">
              <img v-if="persona.foto" :src="persona.foto" :alt="persona.nombre" />
              <div v-else class="personal-avatar">
                <i class="ti ti-user" aria-hidden="true"></i>
              </div>
            </div>
            <div class="personal-body">
              <div class="personal-carrera-tag">{{ persona.cargo }}</div>
              <h3>{{ persona.nombre }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DEPARTAMENTOS — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Personal administrativo</div>
        <h2 class="s-title">Departamentos</h2>
        <div class="deps-grid">
          <div v-for="persona in departamentos" :key="persona.nombre" class="dep-card">
            <div class="dep-foto">
              <img v-if="persona.foto" :src="persona.foto" :alt="persona.nombre" />
              <div v-else class="dep-avatar">
                <i class="ti ti-user" aria-hidden="true"></i>
              </div>
            </div>
            <div class="dep-body">
              <span class="dep-cargo-tag">{{ persona.cargo }}</span>
              <h3>{{ persona.nombre }}</h3>
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
            <i class="ti ti-phone deco-icon" aria-hidden="true"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">¿Necesitas contactarnos?</div>
            <h2 class="s-title">Estamos para ayudarte</h2>
            <p>Si tienes alguna pregunta o necesitas ponerte en contacto con algún departamento específico, puedes
              comunicarte a través de nuestros canales oficiales.</p>
            <div class="cta-btns">
              <RouterLink to="/departamentos/control-escolar" class="btn-primary">
                Control Escolar <i class="ti ti-arrow-right"></i>
              </RouterLink>
              <RouterLink to="/facultad/normatividad" class="btn-outline">
                Ver normatividad
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

const heroStats = [
  { number: '3', label: 'Autoridades principales' },
  { number: '3', label: 'Jefaturas de carrera' },
  { number: '9', label: 'Departamentos' },
]

const autoridades = [
  { nombre: 'M.C. Juan Pedro Cervantes Ayala', cargo: 'Dirección', foto: '/images/JuanPedroCervantesAyala.jpg' },
  { nombre: 'Dra. Martha Alicia Jiménez Meza', cargo: 'Secretaría Académica', foto: '/images/MarthaAliciaJimenezMeza.jpg' },
  { nombre: 'Dra. Ruth Mora', cargo: 'Secretaría Administrativa', foto: '' },
]

const jefaturas = [
  { nombre: 'M.C. Cristian Demetrio Estrella Iturrios', cargo: 'Licenciatura en Artes Visuales', foto: '' },
  { nombre: 'L.A.P. Dalia Margarita Payán Sánchez', cargo: 'Diseño y Arte Multimedia', foto: '' },
  { nombre: 'L.M. María del Carmen Félix Pérez', cargo: 'Fotografía y Producción de Video', foto: '' },
]

const departamentos = [
  { nombre: 'L.A.P. Emmanuel Salomón Arellano', cargo: 'Difusión Cultural', foto: '' },
  { nombre: 'L.C.P. Sonia Grisel Angulo', cargo: 'Control Escolar', foto: '' },
  { nombre: 'Jessica Jennifer Ríos Hernández', cargo: 'Vinculación / Auxiliar', foto: '' },
  { nombre: 'M.C. José Roberto Leyva Romero', cargo: 'Tutorías', foto: '/images/JoseRobertoLeyvaRomero.jpeg' },
  { nombre: 'Lic. Rosalía Ponce Acia', cargo: 'Apoyo Especial', foto: '' },
  { nombre: 'L.C.P. Uriel Ibarra Jiménez', cargo: 'Servicio Social / Becas', foto: '' },
  { nombre: 'L.A.E. Karen Medina Burgos', cargo: 'Contabilidad', foto: '' },
  { nombre: 'Lucio Mario Santos Quintero', cargo: 'Mantenimiento', foto: '' },
  { nombre: 'L.A.E. Manuel Osvaldo Ramos Amarillas', cargo: 'Auxiliar Administrativo', foto: '' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.directorio-page {
  font-family: 'Outfit', sans-serif;
}

/* HERO */
.hero-directorio {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-directorio::before {
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

.hero-directorio h1 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  letter-spacing: -1px;
  margin-bottom: 16px;
  line-height: 1.1;
}

.hero-directorio p {
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

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.hero-stat {
  background: rgba(15, 26, 140, 0.08);
  border: 1px solid rgba(15, 26, 140, 0.12);
  border-radius: 14px;
  padding: 20px 16px;
  text-align: center;
}

.hero-stat-n {
  font-size: 32px;
  font-weight: 800;
  color: #0f1a8c;
  margin-bottom: 6px;
}

.hero-stat-l {
  font-size: 12px;
  color: rgba(15, 26, 140, 0.7);
  line-height: 1.3;
  font-weight: 500;
}

/* AUTORIDADES */
.autoridades-section {
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

.autoridades-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.auto-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, background 0.2s;
}

.auto-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.13);
}

.auto-card.principal {
  border-color: #ffd500;
  border-width: 2px;
}

.auto-foto {
  position: relative;
  height: 260px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.auto-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.auto-avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 36px;
}

.auto-badge-principal {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #ffd500;
  color: #0f1a8c;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.auto-body {
  padding: 20px 24px;
  text-align: center;
}

.auto-body h3 {
  color: white;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}

.auto-cargo {
  font-size: 12px;
  font-weight: 600;
  color: #ffd500;
  background: rgba(255, 213, 0, 0.15);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
}

/* SECCIONES */
.section {
  padding: 72px 48px;
}

.bg-white {
  background: white;
}

.bg-gray {
  background: #f4f5f9;
}

/* JEFATURAS */
.personal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.personal-card {
  background: #f4f5f9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.personal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.1);
  border-color: #ffd500;
}

.personal-foto {
  height: 220px;
  background: #e8ecff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.personal-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.personal-avatar {
  width: 72px;
  height: 72px;
  background: rgba(15, 26, 140, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(15, 26, 140, 0.3);
  font-size: 32px;
}

.personal-body {
  padding: 18px 20px;
  text-align: center;
}

.personal-carrera-tag {
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  background: #e8ecff;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 10px;
}

.personal-body h3 {
  color: #1a1a2e;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
}

/* DEPARTAMENTOS */
.deps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.dep-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-left: 3px solid #ffd500;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.dep-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(15, 26, 140, 0.1);
}

.dep-foto {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  background: #e8ecff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dep-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dep-avatar {
  color: rgba(15, 26, 140, 0.3);
  font-size: 24px;
}

.dep-body {
  flex: 1;
}

.dep-cargo-tag {
  font-size: 10px;
  font-weight: 700;
  color: #0f1a8c;
  background: #e8ecff;
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 5px;
}

.dep-body h3 {
  color: #1a1a2e;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
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
@media (max-width: 900px) {
  .hero-directorio {
    padding: 48px 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .autoridades-section {
    padding: 48px 24px;
  }

  .autoridades-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 48px 24px;
  }

  .personal-grid {
    grid-template-columns: 1fr 1fr;
  }

  .deps-grid {
    grid-template-columns: 1fr;
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
  .hero-directorio {
    padding: 40px 16px;
  }

  .autoridades-section {
    padding: 40px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .personal-grid {
    grid-template-columns: 1fr;
  }

  .deps-grid {
    grid-template-columns: 1fr;
  }
}
</style>