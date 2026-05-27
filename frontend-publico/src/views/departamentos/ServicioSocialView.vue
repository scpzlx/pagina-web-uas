<template>
  <div class="ss-page">

    <!-- HERO — amarillo -->
    <section class="hero-ss">
      <div class="hero-inner">
        <div class="hero-breadcrumb">
          <RouterLink to="/">Inicio</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <RouterLink to="/departamentos">Departamentos</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <span>Servicio Social</span>
        </div>
        <div class="hero-grid">
          <div class="hero-text">
            <div class="hero-tag">Departamento</div>
            <h1>Servicio Social <span class="hero-accent">Universitario</span></h1>
            <p class="hero-desc">
              Actividades teórico-prácticas de carácter obligatorio y temporal que consolidan la formación
              académica del estudiante mediante la aplicación de competencias profesionales y el desarrollo
              de valores éticos en beneficio de la comunidad.
            </p>
            <div class="hero-stats">
              <div class="hero-stat">
                <span class="hero-stat-num">480+</span>
                <span class="hero-stat-label">Horas mínimas</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-num">6–12</span>
                <span class="hero-stat-label">Meses de duración</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-num">17</span>
                <span class="hero-stat-label">ODS atendidos</span>
              </div>
            </div>
          </div>
          <div class="hero-img-wrap">
            <img src="/images/servicio-social1.webp" alt="Servicio Social UAS" class="hero-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- DEFINICIÓN — blanco -->
    <section class="section bg-white">
      <div class="inner">
        <div class="def-grid">
          <div class="def-text">
            <div class="s-tag">¿Qué es?</div>
            <h2 class="s-title">Definición</h2>
            <p>De acuerdo con el Reglamento de Servicio Social de la Universidad Autónoma de Sinaloa (2022)
              en su Artículo 2, define el servicio social como las actividades teórico-prácticas que con
              carácter obligatorio y temporal realizan estudiantes o egresados de la Universidad, con el
              propósito de consolidar su formación académica e integrarla a través de la aplicación de
              competencias profesionales integrales y desarrollo de valores éticos, mediante la participación
              en proyectos que contribuyen al bienestar de la comunidad.</p>
            <p>El servicio social constituye una actividad de formación integral para fortalecer las
              competencias integrales que los y las estudiantes desarrollan a lo largo de la carrera
              universitaria; para lograr lo anterior, los brigadistas desarrollan la metodología de proyectos
              de intervención y/o investigación donde se desarrollan las familias de competencias.</p>
            <div class="def-quote">
              <i class="ti ti-quote"></i>
              <p>Desde el inicio del actual rectorado del Dr. Jesús Madueña Molina, se ha fortalecido la
                actualización del modelo académico, la normatividad y procesos administrativos con el propósito
                de fortalecer las actividades de formación académica de los y las estudiantes, simplificando
                los trámites administrativos para facilitar la trayectoria y egreso de la universidad.</p>
            </div>
          </div>
          <div class="def-aside">
            <div class="def-card" v-for="item in propósitos" :key="item.label">
              <div class="def-card-icon"><i :class="item.icon"></i></div>
              <div>
                <div class="def-card-title">{{ item.label }}</div>
                <div class="def-card-desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MISIÓN, VISIÓN Y FILOSOFÍA — gris -->
    <section class="section bg-gray">
      <div class="inner">
        <div class="mvf-grid">
          <div class="mvf-img-wrap">
            <img src="/images/servicio-social2.webp" alt="Misión Servicio Social" class="mvf-img" />
          </div>
          <div class="mvf-cards">
            <div class="s-tag">Identidad institucional</div>
            <h2 class="s-title">Misión, Visión y Filosofía</h2>
            <div class="mvf-card" v-for="item in misionVision" :key="item.titulo">
              <div class="mvf-card-header">
                <div class="mvf-card-icon"><i :class="item.icon"></i></div>
                <h3>{{ item.titulo }}</h3>
              </div>
              <p>{{ item.texto }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VALORES — azul -->
    <section class="section bg-dark">
      <div class="inner">
        <div class="valores-grid">
          <div class="valores-text">
            <div class="s-tag light">Principios</div>
            <h2 class="s-title light">Valores</h2>
            <p class="valores-desc">
              La Universidad se muestra sensible a su entorno. Más allá de su tarea formadora, busca estrechar
              los lazos entre sus diferentes actores al crear mecanismos oportunos de integración humana y
              social, por medio de los cuales sus educandos adquieren los elementos necesarios para eliminar
              barreras socioeconómicas, políticas y culturales.
            </p>
            <p class="valores-desc">
              La Universidad ha asumido como su filosofía institucional la apropiación de valores, preceptos y
              principios que son resultado de una reflexión axiológica para coadyuvar a la reconstrucción del
              fragmentado tejido social de nuestro estado mediante la generación y aplicación de conocimiento
              y tecnología, la innovación y el cambio permanente.
            </p>
          </div>
          <div class="valores-img-wrap">
            <img src="/images/servicio-social-valores.webp" alt="Pirámide de Valores UAS" class="valores-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- NORMATIVIDAD — blanco -->
    <section class="section bg-white">
      <div class="inner">
        <div class="norm-grid">
          <div class="norm-img-wrap">
            <img src="/images/servicio-social-normatividad.webp" alt="Normatividad" class="norm-img" />
          </div>
          <div class="norm-content">
            <div class="s-tag">Marco legal</div>
            <h2 class="s-title">Normatividad</h2>
            <div class="norm-categoria" v-for="cat in normatividad" :key="cat.titulo">
              <h3><i class="ti ti-folder"></i> {{ cat.titulo }}</h3>
              <ul>
                <li v-for="doc in cat.docs" :key="doc.label">
                  <a :href="doc.url" target="_blank" rel="noopener noreferrer">
                    <i class="ti ti-file-text"></i>
                    {{ doc.label }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DOCUMENTOS — gris -->
    <section class="section bg-gray">
      <div class="inner">
        <div class="s-tag">Recursos</div>
        <h2 class="s-title">Documentos</h2>
        <div class="docs-grid">
          <a href="https://dgss.uas.edu.mx/wp-content/uploads/2025/08/reglamento-de-servicio-social-universitario-2022.pdf"
            target="_blank" class="doc-card">
            <img src="/images/servicio-social-reglamento.webp" alt="Reglamento de Servicio Social" />
            <div class="doc-card-overlay">
              <i class="ti ti-external-link"></i>
              <span>Ver documento</span>
            </div>
          </a>
          <a href="https://dgss.uas.edu.mx/wp-content/uploads/2025/10/criterios-para-atender-la-vulneracion-de-derechos.pdf"
            target="_blank" class="doc-card">
            <img src="/images/servicio-social-criterios.webp" alt="Criterios para Atender la Vulneración" />
            <div class="doc-card-overlay">
              <i class="ti ti-external-link"></i>
              <span>Ver documento</span>
            </div>
          </a>
          <a href="#" class="doc-card">
            <img src="/images/servicio-social-privacidad.webp" alt="Aviso de Privacidad" />
            <div class="doc-card-overlay">
              <i class="ti ti-external-link"></i>
              <span>Ver documento</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- DIRECTORIO — azul -->
    <section class="section bg-dark">
      <div class="inner">
        <div class="dir-grid">
          <div>
            <div class="s-tag light">Personal</div>
            <h2 class="s-title light">Directorio</h2>
            <div class="dir-list">
              <div class="dir-item" v-for="persona in directorio" :key="persona.nombre">
                <div class="dir-avatar"><i class="ti ti-user"></i></div>
                <div>
                  <div class="dir-nombre">{{ persona.nombre }}</div>
                  <div class="dir-cargo">{{ persona.cargo }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="dir-img-wrap">
            <img src="/images/servicio-social-directorio.webp" alt="Directorio" class="dir-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- CERTIFICACIÓN — blanco con borde amarillo arriba -->
    <section class="section bg-white cert-section">
      <div class="inner">
        <div class="s-tag">Calidad</div>
        <h2 class="s-title">Certificación</h2>
        <div class="cert-grid">
          <div class="cert-card">
            <img src="/images/politica_gestion.webp" alt="Política de Gestión" />
          </div>
          <div class="cert-card">
            <img src="/images/politica_iso.webp" alt="Política ISO" />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const propósitos = [
  {
    icon: 'ti ti-users',
    label: 'Vinculación social',
    desc: 'Conecta la universidad con la comunidad mediante proyectos de impacto real.',
  },
  {
    icon: 'ti ti-certificate',
    label: 'Formación integral',
    desc: 'Fortalece competencias profesionales y valores éticos del estudiante.',
  },
  {
    icon: 'ti ti-leaf',
    label: 'Desarrollo sostenible',
    desc: 'Atiende los 17 Objetivos de Desarrollo Sostenible de la ONU.',
  },
  {
    icon: 'ti ti-chart-line',
    label: 'Impacto social',
    desc: 'Contribuye a revertir indicadores sociales medidos por CONEVAL.',
  },
]

const misionVision = [
  {
    icon: 'ti ti-target',
    titulo: 'Misión',
    texto: 'Vincular a la universidad con la sociedad, aportando soluciones a problemáticas sociales, económicas y culturales, mientras el estudiante desarrolla competencias profesionales y éticas.',
  },
  {
    icon: 'ti ti-eye',
    titulo: 'Visión',
    texto: 'Proyectarse como un espacio formativo estratégico, donde los estudiantes contribuyen activamente al desarrollo social y comunitario, consolidando la universidad como institución comprometida con la transformación social.',
  },
  {
    icon: 'ti ti-heart',
    titulo: 'Filosofía',
    texto: 'Fundamentada en los principios de solidaridad, compromiso social y formación integral, considerando el servicio social como un deber ético y profesional del estudiante universitario para retribuir a la sociedad lo recibido.',
  },
]

const normatividad = [
  {
    titulo: 'Marco Jurídico',
    docs: [
      { label: 'Ley Orgánica y Estatuto General [2025]', url: 'https://www.uas.edu.mx/pdf/marco_juridico/2025/Ley_Organica_y_Estatuto_2025.pdf' },
      { label: 'Contrato Colectivo de Trabajo [2023]', url: 'https://sau.uas.edu.mx/pdf/Contrato_Colectivo_de_Trabajo_2023.pdf' },
    ],
  },
  {
    titulo: 'Reglamentos',
    docs: [
      { label: 'Reglamento de Servicio Social [2022]', url: 'https://www.uas.edu.mx/pdf/marco_juridico/2023/Reglamento_de_Servicio_Social_Universitario_UAS_2022.pdf' },
      { label: 'Reglamento Escolar [2023]', url: 'https://www.uas.edu.mx/pdf/marco_juridico/2023/Reglamento_Escolar_UAS_2023.pdf' },
      { label: 'Reglamento para la Transparencia y Acceso a la Información Pública [2023]', url: 'https://www.uas.edu.mx/pdf/marco_juridico/2023/Reglamento_para_la_Transparencia_y_Acceso_a_la_Informacion_Publica_de_la_UAS.pdf' },
      { label: 'Reglamento de Integración y Funcionamiento del Consejo General para la Igualdad de Género [2022]', url: 'https://www.uas.edu.mx/pdf/marco_juridico/2023/Reglamento_de_Integracion_y_Funcionamiento_del_Consejo_General_para_la_Igualdad_de_Genero_UAS_2022.pdf' },
    ],
  },
  {
    titulo: 'Plan de Desarrollo Institucional',
    docs: [
      { label: 'Plan de Desarrollo Institucional Con Visión de Futuro 2025', url: 'https://sau.uas.edu.mx/pdf/PDI_con_vision_de_futuro_2025.pdf' },
    ],
  },
  {
    titulo: 'Modelos, Programas y Políticas Institucionales',
    docs: [
      { label: 'Programa de Atención a la Diversidad (ADILIAS) [2021]', url: 'https://drive.google.com/file/d/1GSV46k5dBKeQ6N_WLpfAq38uK4ZePqA9/view' },
    ],
  },
  {
    titulo: 'Planes Estratégicos y Operativos',
    docs: [
      { label: 'Plan Operativo Anual [2022]', url: 'https://sau.uas.edu.mx/pdf/sau_plan_operativo_anual_2022.pdf' },
      { label: 'Plan Estratégico de Desarrollo 2025', url: 'https://sau.uas.edu.mx/pdf/sau_plan_estrategico_de_desarrollo_2025.pdf' },
    ],
  },
]

const directorio = [
  { nombre: 'Dr. Jesús Madueña Molina', cargo: 'Rector de la Universidad Autónoma de Sinaloa' },
  { nombre: 'Dr. Nidia Yuniba Brunn Corona', cargo: 'Secretaria General' },
  { nombre: 'M.C. Maricela Guadalupe Pérez Carillo', cargo: 'Directora General de Servicio Social' },
  { nombre: 'Lic. Isaac López Bañuelos', cargo: 'Subdirector Académico' },
  { nombre: 'Dra. Gloria Ema Reyes Verduzco', cargo: 'Subdirectora de Planeación y Administración' },
  { nombre: 'Dr. Edgar Amed Galaz Torres', cargo: 'Subdirector Unidad Regional Norte' },
  { nombre: 'Lic. Diego Soberanes Bojorquez', cargo: 'Subdirector Unidad Regional Centro Norte' },
  { nombre: 'LAF. Ashanti Daniela Román León', cargo: 'Subdirectora Unidad Regional Centro' },
  { nombre: 'Dr. Víctor Arturo Ramírez Pérez', cargo: 'Subdirector Unidad Regional Sur' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.ss-page {
  font-family: 'Outfit', sans-serif;
  color: #1e293b;
}

/* ── LAYOUT ───────────────────────────────── */
.section {
  padding: 72px 48px;
}

.bg-white {
  background: #ffffff;
}

.bg-gray {
  background: #f4f5f9;
}

.bg-dark {
  background: #0f1a8c;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
}

.s-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #0f1a8c;
  margin-bottom: 8px;
}

.s-tag.light {
  color: #ffd500;
}

.s-title {
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 800;
  color: #1a1a2e;
  letter-spacing: -0.5px;
  margin: 0 0 36px;
}

.s-title.light {
  color: #ffffff;
}

/* ── HERO ─────────────────────────────────── */
.hero-ss {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-ss::before {
  content: '';
  position: absolute;
  right: -80px;
  top: -80px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
  pointer-events: none;
}

.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(15, 26, 140, 0.6);
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.hero-breadcrumb a {
  color: rgba(15, 26, 140, 0.6);
  text-decoration: none;
}

.hero-breadcrumb a:hover {
  color: #0f1a8c;
}

.hero-breadcrumb span {
  color: #0f1a8c;
  font-weight: 600;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.hero-tag {
  display: inline-block;
  background: #0f1a8c;
  color: #ffd500;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 14px;
}

.hero-text h1 {
  font-size: clamp(30px, 4vw, 50px);
  font-weight: 900;
  color: #0f1a8c;
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0 0 16px;
}

.hero-accent {
  display: block;
  opacity: 0.65;
}

.hero-desc {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(15, 26, 140, 0.8);
  margin-bottom: 28px;
  max-width: 460px;
}

.hero-stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  background: rgba(15, 26, 140, 0.1);
  border-radius: 12px;
  padding: 12px 18px;
  border: 1.5px solid rgba(15, 26, 140, 0.15);
}

.hero-stat-num {
  font-size: 22px;
  font-weight: 900;
  color: #0f1a8c;
  line-height: 1;
}

.hero-stat-label {
  font-size: 11px;
  color: rgba(15, 26, 140, 0.7);
  font-weight: 500;
  margin-top: 4px;
}

.hero-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(15, 26, 140, 0.2);
}

.hero-img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
}

/* ── DEFINICIÓN ───────────────────────────── */
.def-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 56px;
  align-items: start;
}

.def-text p {
  font-size: 15px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 18px;
}

.def-quote {
  display: flex;
  gap: 16px;
  background: #f4f5f9;
  border-left: 4px solid #ffd500;
  border-radius: 0 12px 12px 0;
  padding: 20px 24px;
  margin-top: 24px;
}

.def-quote i {
  font-size: 28px;
  color: #ffd500;
  flex-shrink: 0;
  margin-top: 2px;
}

.def-quote p {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin: 0;
  font-style: italic;
}

.def-aside {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.def-card {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #f4f5f9;
  border-radius: 14px;
  padding: 18px;
  border-top: 3px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.def-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(15, 26, 140, 0.1);
}

.def-card-icon {
  font-size: 24px;
  color: #0f1a8c;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.def-card-title {
  font-size: 13px;
  font-weight: 700;
  color: #0f1a8c;
  margin-bottom: 4px;
}

.def-card-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
}

/* ── MISIÓN VISIÓN FILOSOFÍA ──────────────── */
.mvf-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}

.mvf-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.mvf-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 400px;
}

.mvf-cards {
  display: flex;
  flex-direction: column;
}

.mvf-card {
  padding: 22px 24px;
  background: white;
  border-radius: 14px;
  border-left: 4px solid #0f1a8c;
  margin-bottom: 16px;
  transition: border-color 0.2s, transform 0.2s;
}

.mvf-card:hover {
  border-left-color: #ffd500;
  transform: translateX(4px);
}

.mvf-card:last-child {
  margin-bottom: 0;
}

.mvf-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.mvf-card-icon {
  width: 36px;
  height: 36px;
  background: #ffd500;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #0f1a8c;
  flex-shrink: 0;
}

.mvf-card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #0f1a8c;
  margin: 0;
}

.mvf-card p {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin: 0;
}

/* ── VALORES ──────────────────────────────── */
.valores-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.valores-desc {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 18px;
}

.valores-img-wrap {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.valores-img {
  width: 100%;
  max-width: 340px;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 12px;
}

/* ── NORMATIVIDAD ─────────────────────────── */
.norm-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 56px;
  align-items: start;
}

.norm-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
}

.norm-img {
  width: 100%;
  display: block;
}

.norm-categoria {
  background: #f4f5f9;
  border-radius: 14px;
  padding: 20px 22px;
  margin-bottom: 14px;
  border-left: 4px solid #ffd500;
}

.norm-categoria h3 {
  font-size: 13px;
  font-weight: 700;
  color: #0f1a8c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.norm-categoria ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.norm-categoria a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #0f1a8c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s, gap 0.2s;
}

.norm-categoria a:hover {
  color: #1e3a8a;
  gap: 10px;
  text-decoration: underline;
}

.norm-categoria a i {
  font-size: 14px;
  flex-shrink: 0;
  color: #ffd500;
}

/* ── DOCUMENTOS ───────────────────────────── */
.docs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.doc-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: block;
  transition: transform 0.2s, box-shadow 0.2s;
}

.doc-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
}

.doc-card img {
  width: 100%;
  height: auto;
  display: block;
}

.doc-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 26, 140, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.25s;
}

.doc-card-overlay i {
  font-size: 28px;
}

.doc-card:hover .doc-card-overlay {
  opacity: 1;
}

/* ── DIRECTORIO ───────────────────────────── */
.dir-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}

.dir-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dir-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 14px 18px;
  transition: background 0.2s;
}

.dir-item:hover {
  background: rgba(255, 255, 255, 0.14);
}

.dir-avatar {
  width: 40px;
  height: 40px;
  background: #ffd500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #0f1a8c;
  flex-shrink: 0;
}

.dir-nombre {
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.dir-cargo {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 2px;
}

.dir-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 100px;
}

.dir-img {
  width: 100%;
  display: block;
}

/* ── CERTIFICACIÓN ────────────────────────── */
.cert-section {
  border-top: 4px solid #ffd500;
}

.cert-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.cert-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.cert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.15);
}

.cert-card img {
  width: 100%;
  height: auto;
  display: block;
}

/* ── RESPONSIVE ───────────────────────────── */
@media (max-width: 1024px) {
  .def-grid {
    grid-template-columns: 1fr;
  }

  .def-aside {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .norm-img-wrap {
    position: static;
  }
}

@media (max-width: 900px) {
  .hero-ss {
    padding: 48px 24px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero-img-wrap {
    display: none;
  }

  .section {
    padding: 56px 24px;
  }

  .mvf-grid {
    grid-template-columns: 1fr;
  }

  .mvf-img-wrap {
    display: none;
  }

  .valores-grid {
    grid-template-columns: 1fr;
  }

  .norm-grid {
    grid-template-columns: 1fr;
  }

  .norm-img-wrap {
    display: none;
  }

  .dir-grid {
    grid-template-columns: 1fr;
  }

  .dir-img-wrap {
    display: none;
  }

  .cert-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero-ss {
    padding: 40px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .def-aside {
    grid-template-columns: 1fr;
  }

  .docs-grid {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    gap: 12px;
  }
}
</style>