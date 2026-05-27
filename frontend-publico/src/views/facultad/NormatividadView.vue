<template>
  <div class="normatividad-page">

    <!-- HERO -->
    <section class="hero-normatividad">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Facultad</span>
            <i class="ti ti-chevron-right"></i>
            <span>Normatividad</span>
          </div>
          <h1>Normatividad</h1>
          <p>La Facultad de Diseño y Artes Visuales cuenta con normas y procedimientos para el correcto funcionamiento
            de los diferentes espacios, regulados por los encargados de cada área.</p>
          <div class="hero-badges">
            <span><i class="ti ti-file-text"></i>Normatividad Institucional</span>
            <span><i class="ti ti-building"></i>Normatividad Interna</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/normatividad.jpg" alt="Normatividad EDAVA" class="hero-img">
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-stat">
            <div class="intro-stat-n">8</div>
            <div class="intro-stat-l">Reglamentos institucionales</div>
          </div>
          <div class="intro-stat">
            <div class="intro-stat-n">14</div>
            <div class="intro-stat-l">Reglamentos internos</div>
          </div>
          <div class="intro-stat">
            <div class="intro-stat-n">UAS</div>
            <div class="intro-stat-l">Respaldado por la universidad</div>
          </div>
          <div class="intro-stat">
            <div class="intro-stat-n">100%</div>
            <div class="intro-stat-l">Transparencia institucional</div>
          </div>
        </div>
      </div>
    </section>

    <!-- NORMATIVIDAD INSTITUCIINAL -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Universidad Autónoma dee Sinaloa</div>
        <h2 class="s-title">Normatividad Institucional</h2>
        <div class="docs-grid">
          <a v-for="doc in institucional" :key="doc.title" :href="doc.url" target="_blank" rel="noopener noreferrer"
            class="doc-card">
            <div class="doc-icon"><i class="ti ti-file-text" aria-hidden="true"></i></div>
            <div class="doc-body">
              <div class="doc-title">{{ doc.title }}</div>
              <div class="doc-action">Ver documento <i class="ti ti-external-link"></i></div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- NORMATIVIDAD INTERNA -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Facultad de Artes · EDAV</div>
        <h2 class="s-title">Normatividad Interna</h2>
        <div class="docs-grid">
          <div v-for="doc in interna" :key="doc.title" class="doc-card doc-card-pending">
            <div class="doc-icon"><i class="ti ti-file" aria-hidden="true"></i></div>
            <div class="doc-body">
              <div class="doc-title">{{ doc.title }}</div>
              <div class="doc-pending">Próximamente disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-white cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-shield-check deco-icon" aria-hidden="true"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">¿Tienes dudas?</div>
            <h2 class="s-title">Consulta con Control Escolar</h2>
            <p>Si tienes alguna duda sobre los reglamentos o necesitas más información sobre la normatividad de la
              facultad, nuestro equipo de Control Escolar puede orientarte.</p>
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

const institucional = [
  { title: 'Manual de procedimientos escolares', url: 'https://fic.uas.edu.mx/wp-content/uploads/2020/08/Manual-de-Procedimientos-Escolares.pdf' },
  { title: 'Reglamento de la Defensoría de los Derechos Universitarios', url: 'https://fic.uas.edu.mx/wp-content/uploads/2020/08/Reglamento-de-la-Defensoria-de-los-Derechos-Universitarios.pdf' },
  { title: 'Reglamento del Programa Institucional de Tutorías', url: 'https://fic.uas.edu.mx/wp-content/uploads/2020/08/Reglamento-del-Programa-Institucional-de-Tutorias.pdf' },
  { title: 'Reglamento para la Prevención, Atención y Sanción del Hostigamiento y Acoso Sexual', url: 'https://fic.uas.edu.mx/wp-content/uploads/2020/08/Reglamento-para-la-Prevencion-Atencion-y-Sancion-del-Hostigamiento-y-Acoso-Sexual-UAS.pdf' },
  { title: 'Reglamento de admisión', url: 'https://fic.uas.edu.mx/wp-content/uploads/2025/03/Reglamento-Admision.pdf' },
  { title: 'Reglamento escolar', url: 'https://fic.uas.edu.mx/wp-content/uploads/2025/03/Reglamento-Escolar.pdf' },
  { title: 'Código de ética', url: 'https://fic.uas.edu.mx/wp-content/uploads/2020/08/Codigo-de-etica.pdf' },
  { title: 'Reglamento de beca institucional para alumnos UAS', url: 'https://fic.uas.edu.mx/wp-content/uploads/2025/06/Reglamento-de-Beca-Institucional-para-Alumnos-UAS.pdf' },
]

const interna = [
  { title: 'Reglamento Control Escolar' },
  { title: 'Reglamento de aula de clases' },
  { title: 'Reglamento de uso de aulas de capacitación' },
  { title: 'Reglamento de Laboratorio de Cómputo' },
  { title: 'Reglamento de usos de equipo de cómputo' },
  { title: 'Reglamento de Taller de Escultura' },
  { title: 'Reglamento de Taller de Grabado' },
  { title: 'Reglamento de Sala Audiovisual' },
  { title: 'Reglamento de Biblioteca' },
  { title: 'Reglamento de Tutorías' },
  { title: 'Reglamento de Servicio Social' },
  { title: 'Reglamento de Vinculación y Relaciones Internacionales' },
  { title: 'Reglamento de Intercambio y Movilidad Académica' },
  { title: 'Reglamento de Prácticas Profesionales' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.normatividad-page {
  font-family: 'Outfit', sans-serif;
}

/* HERO */
.hero-normatividad {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-normatividad::before {
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

.hero-normatividad h1 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  letter-spacing: -1px;
  margin-bottom: 16px;
  line-height: 1.1;
}

.hero-normatividad p {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 440px;
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
  max-height: 380px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

/* INTRO STATS */
.intro-section {
  background: #0f1a8c;
  padding: 40px 48px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.intro-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

.intro-stat {
  text-align: center;
  padding: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
}

.intro-stat:last-child {
  border-right: none;
}

.intro-stat-n {
  font-size: 28px;
  font-weight: 800;
  color: #ffd500;
  margin-bottom: 6px;
}

.intro-stat-l {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.3;
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
  margin-bottom: 36px;
}

/* DOCS GRID */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 18px 20px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-left: 3px solid #0f1a8c;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  cursor: pointer;
}

.doc-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(15, 26, 140, 0.12);
  background: #f0f3ff;
}

.doc-card-pending {
  border-left-color: #ffd500;
  cursor: default;
}

.doc-card-pending:hover {
  transform: none;
  box-shadow: none;
  background: white;
}

.doc-icon {
  font-size: 24px;
  color: #0f1a8c;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: #e8ecff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.doc-card-pending .doc-icon {
  background: #fffbe6;
  color: #b8860b;
}

.doc-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.4;
  margin-bottom: 4px;
}

.doc-action {
  font-size: 12px;
  color: #0f1a8c;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.doc-pending {
  font-size: 11px;
  color: #b8860b;
  font-weight: 500;
  background: #fffbe6;
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
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
  .hero-normatividad {
    padding: 48px 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-right {
    display: none;
  }

  .intro-section {
    padding: 32px 24px;
  }

  .intro-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .intro-stat {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    padding-bottom: 16px;
  }

  .section {
    padding: 48px 24px;
  }

  .docs-grid {
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
  .hero-normatividad {
    padding: 40px 16px;
  }

  .intro-section {
    padding: 24px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .intro-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>