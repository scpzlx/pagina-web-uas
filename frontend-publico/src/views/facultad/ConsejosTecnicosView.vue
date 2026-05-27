<template>
  <div class="consejos-page">

    <!-- HERO — amarillo -->
    <section class="hero-consejos">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Facultad</span>
            <i class="ti ti-chevron-right"></i>
            <span>Consejos Técnicos</span>
          </div>
          <h1>Consejos Técnicos</h1>
          <p>Órgano colegiado de representación académica y estudiantil que participa en la toma de decisiones de la
            Facultad de Diseño y Artes Visuales.</p>
          <div class="hero-badges">
            <span><i class="ti ti-school"></i> Consejeros Académicos</span>
            <span><i class="ti ti-users"></i> Consejeros Alumnos</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-n">2</div>
              <div class="hero-stat-l">Tipos de consejeros</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-n">6</div>
              <div class="hero-stat-l">Grados representados</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-n">H.C.T.</div>
              <div class="hero-stat-l">Honorable Consejo Técnico</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONSEJEROS ACADÉMICOS — azul -->
    <section class="academicos-section">
      <div class="container">
        <div class="s-tag light">H. Consejo Técnico</div>
        <h2 class="s-title light">Consejeros Técnicos Académicos</h2>

        <div class="directivos-grid">
          <div v-for="directivo in directivos" :key="directivo.cargo" class="directivo-card">
            <div class="directivo-avatar">
              <i class="ti ti-user" aria-hidden="true"></i>
            </div>
            <div class="directivo-info">
              <span class="directivo-cargo-tag">{{ directivo.cargo }}</span>
              <h3>{{ directivo.nombre }}</h3>
            </div>
          </div>
        </div>

        <div class="tabla-wrap">
          <table class="consejeros-table">
            <thead>
              <tr>
                <th><i class="ti ti-user" aria-hidden="true"></i> Nombre</th>
                <th><i class="ti ti-school" aria-hidden="true"></i> Grado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in consajerosAcademicos" :key="c.grado">
                <td>{{ c.nombre }}</td>
                <td><span class="grado-badge">{{ c.grado }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CONSEJEROS ALUMNOS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">H. Consejo Técnico</div>
        <h2 class="s-title">Consejeros Técnicos Alumnos</h2>

        <div class="tabla-wrap">
          <table class="consejeros-table alumnos">
            <thead>
              <tr>
                <th><i class="ti ti-user" aria-hidden="true"></i> Nombre</th>
                <th><i class="ti ti-school" aria-hidden="true"></i> Grado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in consajerosAlumnos" :key="c.grado">
                <td>{{ c.nombre }}</td>
                <td><span class="grado-badge">{{ c.grado }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CTA — gris con borde amarillo -->
    <section class="section bg-gray cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-users deco-icon" aria-hidden="true"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">¿Quieres participar?</div>
            <h2 class="s-title">Sé parte del Consejo Técnico</h2>
            <p>El Consejo Técnico es el espacio de representación donde estudiantes y académicos participan en la toma
              de decisiones de la facultad. Consulta con Control Escolar para más información.</p>
            <div class="cta-btns">
              <RouterLink to="/departamentos/control-escolar" class="btn-primary">
                Ir a Control Escolar <i class="ti ti-arrow-right"></i>
              </RouterLink>
              <RouterLink to="/facultad/directorio" class="btn-outline">
                Ver directorio
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

const directivos = [
  { cargo: 'Presidente', nombre: 'Dr. nombre' },
  { cargo: 'Secretaria', nombre: 'Dra. nombre' },
]

const consajerosAcademicos = [
  { nombre: 'MC. nombre', grado: '1er grado' },
  { nombre: 'MC. nombre', grado: '2do grado' },
  { nombre: 'Dra. nombre', grado: '3er grado' },
  { nombre: 'MC. nombre', grado: '4to grado' },
  { nombre: 'Dra. nombre', grado: '5to grado' },
  { nombre: 'DR. nombre', grado: 'Posgrado' },
]

const consajerosAlumnos = [
  { nombre: 'C. nombre', grado: '1er grado' },
  { nombre: 'C. nombre', grado: '2do grado' },
  { nombre: 'C. nombre', grado: '3er grado' },
  { nombre: 'C. nombre', grado: '4to grado' },
  { nombre: 'C. nombre', grado: '5to grado' },
  { nombre: 'C. nombre', grado: 'Posgrado' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.consejos-page {
  font-family: 'Outfit', sans-serif;
}

/* HERO */
.hero-consejos {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-consejos::before {
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

.hero-consejos h1 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  letter-spacing: -1px;
  margin-bottom: 16px;
  line-height: 1.1;
}

.hero-consejos p {
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
  font-size: 28px;
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

/* ACADÉMICOS */
.academicos-section {
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

.directivos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.directivo-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-left: 3px solid #ffd500;
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: background 0.2s;
}

.directivo-card:hover {
  background: rgba(255, 255, 255, 0.13);
}

.directivo-avatar {
  width: 52px;
  height: 52px;
  background: rgba(255, 213, 0, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd500;
  font-size: 24px;
  flex-shrink: 0;
}

.directivo-cargo-tag {
  font-size: 11px;
  font-weight: 700;
  color: #ffd500;
  background: rgba(255, 213, 0, 0.15);
  padding: 2px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 6px;
}

.directivo-info h3 {
  color: white;
  font-size: 15px;
  font-weight: 600;
}

/* TABLA */
.tabla-wrap {
  border-radius: 14px;
  overflow: hidden;
}

.consejeros-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.05);
}

.consejeros-table thead tr {
  background: rgba(255, 213, 0, 0.15);
}

.consejeros-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: #ffd500;
  display: table-cell;
}

.consejeros-table th i {
  margin-right: 6px;
}

.consejeros-table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.15s;
}

.consejeros-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.06);
}

.consejeros-table td {
  padding: 14px 20px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

.consejeros-table td:first-child {
  font-weight: 600;
}

.grado-badge {
  background: rgba(255, 213, 0, 0.15);
  color: #ffd500;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 20px;
  display: inline-block;
}

/* TABLA ALUMNOS */
.consejeros-table.alumnos {
  background: white;
}

.consejeros-table.alumnos thead tr {
  background: #f4f5f9;
}

.consejeros-table.alumnos th {
  color: #0f1a8c;
}

.consejeros-table.alumnos tbody tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.consejeros-table.alumnos tbody tr:hover {
  background: #f0f3ff;
}

.consejeros-table.alumnos td {
  color: #444;
}

.consejeros-table.alumnos td:first-child {
  color: #1a1a2e;
}

.consejeros-table.alumnos .grado-badge {
  background: #e8ecff;
  color: #0f1a8c;
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
  .hero-consejos {
    padding: 48px 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .academicos-section {
    padding: 48px 24px;
  }

  .directivos-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 48px 24px;
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
  .hero-consejos {
    padding: 40px 16px;
  }

  .academicos-section {
    padding: 40px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .hero-stats {
    gap: 10px;
  }

  .consejeros-table th,
  .consejeros-table td {
    padding: 12px 14px;
    font-size: 13px;
  }
}
</style>