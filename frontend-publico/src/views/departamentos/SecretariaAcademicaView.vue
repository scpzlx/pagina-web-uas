<template>
  <div class="sec-academica-page">

    <!-- HERO — amarillo -->
    <section class="hero-sec">
      <div class="hero-inner">
        <div class="hero-breadcrumb">
          <RouterLink to="/">Inicio</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <span>Departamentos</span>
          <i class="ti ti-chevron-right"></i>
          <span>Secretaría Académica</span>
        </div>
        <h1>Secretaría Académica</h1>
        <p>La Secretaría Académica coordina la actualización de programas, diseña proyectos académicos, elabora la carga
          semestral, promueve la actualización pedagógica e impulsa convenios de colaboración.</p>
        <div class="hero-badges">
          <span><i class="ti ti-book"></i> Coordinación académica</span>
          <span><i class="ti ti-users"></i> Atención docente y alumnos</span>
          <span><i class="ti ti-file-text"></i> Gestión institucional</span>
        </div>
      </div>
    </section>

    <!-- EQUIPO — azul -->
    <section class="equipo-section">
      <div class="container">
        <div class="s-tag light">Personal</div>
        <h2 class="s-title light">Nuestro Equipo</h2>
        <div class="equipo-grid">
          <div v-for="(persona, i) in equipo" :key="persona.nombre" class="equipo-card" :class="{ principal: i === 0 }">
            <div class="equipo-foto">
              <img v-if="persona.foto" :src="persona.foto" :alt="persona.nombre" />
              <div v-else class="equipo-avatar">
                <i class="ti ti-user" aria-hidden="true"></i>
              </div>
              <div v-if="i === 0" class="equipo-badge">
                <i class="ti ti-star"></i> Titular
              </div>
            </div>
            <div class="equipo-info">
              <h3>{{ persona.nombre }}</h3>
              <span class="equipo-cargo">{{ persona.cargo }}</span>
              <a v-if="persona.correo" :href="`mailto:${persona.correo}`" class="equipo-correo">
                <i class="ti ti-mail" aria-hidden="true"></i> {{ persona.correo }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MISIÓN VISIÓN OBJETIVOS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Identidad institucional</div>
        <h2 class="s-title">Misión, Visión y Objetivos</h2>
        <div class="mv-grid">
          <div v-for="mv in misionVision" :key="mv.titulo" class="mv-card" :class="{ destacada: mv.destacada }">
            <div class="mv-icon"><i :class="`ti ${mv.icon}`" aria-hidden="true"></i></div>
            <h3>{{ mv.titulo }}</h3>
            <p>{{ mv.texto }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FUNCIONES — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Responsabilidades</div>
        <h2 class="s-title">Funciones</h2>
        <div class="funciones-grid">
          <div v-for="cat in funciones" :key="cat.categoria" class="func-card">
            <div class="func-header">
              <div class="func-icon"><i :class="`ti ${cat.icon}`" aria-hidden="true"></i></div>
              <h3>{{ cat.categoria }}</h3>
            </div>
            <ul>
              <li v-for="fn in cat.items" :key="fn">
                <i class="ti ti-chevron-right" aria-hidden="true"></i> {{ fn }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- INCIDENCIAS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Trámites</div>
        <h2 class="s-title">Incidencias Académicas</h2>
        <div class="incidencias-wrap">
          <div class="intro-box">
            <div class="intro-icon"><i class="ti ti-info-circle" aria-hidden="true"></i></div>
            <p>Elaborar un oficio dirigido al Secretario(a) Académico(a), con atención al Jefe(a) de Carrera en el cual
              debe incluir de manera puntual y específica los elementos en los cuales se presenta la incidencia.</p>
          </div>

          <div class="dos-cols">
            <div class="proceso-box">
              <h3><i class="ti ti-list-numbers" aria-hidden="true"></i> Procedimiento</h3>
              <ol>
                <li v-for="(paso, i) in procedimiento" :key="i">{{ paso }}</li>
              </ol>
            </div>

            <div class="instancias-box">
              <h3><i class="ti ti-sitemap" aria-hidden="true"></i> Anomalías de docentes</h3>
              <div class="instancias-list">
                <div v-for="inst in instancias" :key="inst.num" class="instancia-item">
                  <div class="instancia-num">{{ inst.num }}</div>
                  <p>{{ inst.texto }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACTO — gris con borde amarillo -->
    <section class="section bg-gray cta-section">
      <div class="container">
        <div class="s-tag">Atención directa</div>
        <h2 class="s-title">Contacto</h2>
        <div class="contacto-grid">
          <a href="tel:+526677161361" class="contacto-card">
            <div class="contacto-icon"><i class="ti ti-phone" aria-hidden="true"></i></div>
            <h3>Teléfono</h3>
            <p>66 77 16 13 61 Ext. 104</p>
          </a>
          <a href="mailto:secretaria.academica@info.uas.edu.mx" class="contacto-card">
            <div class="contacto-icon"><i class="ti ti-mail" aria-hidden="true"></i></div>
            <h3>Correo Electrónico</h3>
            <p>secretaria.academica@info.uas.edu.mx</p>
          </a>
        </div>
        <p class="contacto-nota">Para mayor información comunícate al Departamento de Secretaría Académica.</p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const equipo = [
  { nombre: 'Dr. Nombre', cargo: 'Secretaría Académica', correo: 'secretaria.academica@uas.com', foto: '/images/coordinador.jpeg' },
  { nombre: 'Dra. Nombre', cargo: 'Auxiliar de Secretaría Académica Matutino', correo: 'secretaria.auxiliar@uas.com', foto: '/images/Auxiliar.avif' },
  { nombre: 'Lic. Nombre', cargo: 'Auxiliar de Secretaría Académica Vespertino', correo: 'auxiliar.secretaria@uas.com', foto: '/images/Auxiliar2.avif' },
]

const misionVision = [
  {
    titulo: 'Misión',
    icon: 'ti-target',
    destacada: false,
    texto: 'La coordinación académica tiene como principal misión la atención esmerada al personal docente y alumnos, así como atender todo lo concerniente a sus funciones de forma incondicional y eficiente, mediante un canal constante de comunicación con la dirección y sus demás coordinaciones.',
  },
  {
    titulo: 'Visión',
    icon: 'ti-eye',
    destacada: true,
    texto: 'Planear, operar y difundir un programa de actualización de los docentes mediante cursos donde pongan a prueba sus fortalezas y se combatan sus debilidades, orientándolos hacia una mejor práctica docente, además de abrir una vertiente de comunicación con alumnos y egresados mediante tecnología.',
  },
  {
    titulo: 'Objetivos',
    icon: 'ti-trophy',
    destacada: false,
    texto: 'Apoyar a la dirección en la planeación, organización y coordinación de las actividades académico-administrativas de la unidad académica, así como promover la colaboración académica entre la unidad académica, dependencias universitarias y otras instituciones públicas y privadas.',
  },
]

const funciones = [
  {
    categoria: 'Actualización y Colaboración',
    icon: 'ti-refresh',
    items: [
      'Fomentar la actualización de conocimientos del personal e intercambio de experiencias con otros profesionales.',
      'Analizar proyectos, problemas y avances de las asignaturas junto con los docentes de la institución.',
    ],
  },
  {
    categoria: 'Planeación y Supervisión',
    icon: 'ti-clipboard-list',
    items: [
      'Colaborar con el director en la elaboración del programa anual de actividades e informes institucionales.',
      'Auxiliar al director en la supervisión de labores en secciones o departamentos.',
      'Vigilar la correcta aplicación de la normatividad y reglamentos de la unidad académica.',
    ],
  },
  {
    categoria: 'Representación y Enlace',
    icon: 'ti-link',
    items: [
      'Sustituir al director en sus ausencias, representándolo en el consejo técnico con voz, pero sin voto.',
      'Coordinar reuniones de comisiones y comités establecidos por el reglamento interno.',
      'Fungir como enlace entre la unidad académica y las direcciones generales de asuntos del personal académico.',
    ],
  },
  {
    categoria: 'Gestión Académico-Administrativa',
    icon: 'ti-settings',
    items: [
      'Realizar trámites académico-administrativos del personal académico.',
      'Apoyar en la gestión, desarrollo y seguimiento de programas académicos.',
      'Proporcionar a la Secretaría Administrativa la información necesaria para los trámites del personal.',
    ],
  },
  {
    categoria: 'Promoción y Desarrollo Académico',
    icon: 'ti-award',
    items: [
      'Promover y apoyar la superación y capacitación del personal académico.',
      'Diseñar proyectos y programas enfocados en la actividad y formación docente.',
      'Apoyar la organización de mesas redondas, conferencias y reuniones académicas.',
    ],
  },
  {
    categoria: 'Evaluación y Reportes',
    icon: 'ti-chart-bar',
    items: [
      'Supervisar y evaluar el desarrollo de la actividad docente.',
      'Preparar informes y reportes solicitados por el director.',
      'Informar periódicamente al director sobre el cumplimiento de los programas y actividades.',
    ],
  },
]

const procedimiento = [
  'El oficio deberá estar firmado por todo el grupo o por la mayoría.',
  'Acudir al Departamento de Jefatura de Carrera y entregar el oficio y exposición del asunto (incidencia).',
  'Si en un plazo de 7 días hábiles no hubiese alguna respuesta, acudir a la Secretaría Académica para dar seguimiento al caso.',
]

const instancias = [
  { num: '1ª', texto: 'Instancia: Jefe de grupo – Profesor' },
  { num: '2ª', texto: 'Instancia: Jefe de grupo – Tutorías' },
  { num: '3ª', texto: 'Instancia: Grupo – Jefatura de Carrera' },
  { num: '4ª', texto: 'Instancia: Jefatura de Carrera – Secretaría Académica' },
  { num: '5ª', texto: 'Instancia: Tutorías – Jefatura de Carrera – Secretaría Académica – Dirección' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');


.sec-academica-page {
  font-family: 'Outfit', sans-serif;
}

/* HERO */
.hero-sec {
  background: #ffd500;
  padding: 72px 48px;
  position: relative;
  overflow: hidden;
}

.hero-sec::before {
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

.hero-sec h1 {
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 800;
  color: #0f1a8c;
  letter-spacing: -1px;
  margin-bottom: 16px;
  line-height: 1.1;
}

.hero-sec p {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  line-height: 1.7;
  margin-bottom: 28px;
  max-width: 700px;
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

/* EQUIPO */
.equipo-section {
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

.equipo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.equipo-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, background 0.2s;
}

.equipo-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.13);
}

.equipo-card.principal {
  border-color: #ffd500;
  border-width: 2px;
}

.equipo-foto {
  position: relative;
  height: 240px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.equipo-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.equipo-avatar {
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

.equipo-badge {
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

.equipo-info {
  padding: 20px 24px;
  text-align: center;
}

.equipo-info h3 {
  color: white;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}

.equipo-cargo {
  font-size: 12px;
  font-weight: 600;
  color: #ffd500;
  background: rgba(255, 213, 0, 0.15);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 10px;
}

.equipo-correo {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  margin-top: 8px;
  transition: color 0.2s;
}

.equipo-correo:hover {
  color: #ffd500;
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

/* MISIÓN VISIÓN */
.mv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.mv-card {
  background: #f4f5f9;
  border-radius: 14px;
  padding: 28px;
  border-top: 3px solid #0f1a8c;
  transition: transform 0.2s, box-shadow 0.2s;
}

.mv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.mv-card.destacada {
  background: #ffd500;
  border-top-color: #0f1a8c;
}

.mv-icon {
  font-size: 28px;
  color: #0f1a8c;
  margin-bottom: 14px;
}

.mv-card.destacada .mv-icon {
  color: #0f1a8c;
}

.mv-card h3 {
  color: #0f1a8c;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

.mv-card p {
  color: #555;
  font-size: 14px;
  line-height: 1.7;
}

.mv-card.destacada p {
  color: #0f1a8c;
}

/* FUNCIONES */
.funciones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.func-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  border-top: 3px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
}

.func-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.func-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.func-icon {
  font-size: 22px;
  color: #0f1a8c;
}

.func-header h3 {
  color: #0f1a8c;
  font-size: 15px;
  font-weight: 700;
}

.func-card ul {
  list-style: none;
  padding: 0;
}

.func-card li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #555;
  padding: 7px 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  line-height: 1.5;
}

.func-card li:last-child {
  border-bottom: none;
}

.func-card li i {
  color: #0f1a8c;
  font-size: 13px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* INCIDENCIAS */
.incidencias-wrap {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.intro-box {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #f4f5f9;
  border-radius: 14px;
  padding: 24px;
  border-left: 4px solid #0f1a8c;
}

.intro-icon {
  font-size: 24px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 2px;
}

.intro-box p {
  color: #555;
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
}

.dos-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.proceso-box,
.instancias-box {
  background: #f4f5f9;
  border-radius: 14px;
  padding: 24px;
  border-left: 4px solid #ffd500;
}

.proceso-box h3,
.instancias-box h3 {
  color: #0f1a8c;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.proceso-box ol {
  padding-left: 20px;
}

.proceso-box li {
  color: #555;
  font-size: 14px;
  line-height: 1.7;
  padding: 6px 0;
}

.instancias-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.instancia-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: white;
  border-radius: 10px;
  padding: 12px 16px;
}

.instancia-num {
  background: #0f1a8c;
  color: #ffd500;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  flex-shrink: 0;
  white-space: nowrap;
}

.instancia-item p {
  color: #555;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  padding-top: 2px;
}

/* CONTACTO */
.cta-section {
  border-top: 3px solid #ffd500;
}

.contacto-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 700px;
  margin-bottom: 20px;
}

.contacto-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-left: 3px solid #ffd500;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.contacto-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(15, 26, 140, 0.1);
}

.contacto-icon {
  font-size: 28px;
  color: #0f1a8c;
  flex-shrink: 0;
}

.contacto-card h3 {
  color: #0f1a8c;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.contacto-card p {
  color: #555;
  font-size: 13px;
  margin: 0;
  word-break: break-all;
}

.contacto-nota {
  font-size: 13px;
  color: #888;
  font-style: italic;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero-sec {
    padding: 56px 24px;
  }

  .equipo-section {
    padding: 56px 24px;
  }

  .equipo-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 56px 24px;
  }

  .mv-grid {
    grid-template-columns: 1fr;
  }

  .funciones-grid {
    grid-template-columns: 1fr 1fr;
  }

  .dos-cols {
    grid-template-columns: 1fr;
  }

  .contacto-grid {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .hero-sec {
    padding: 40px 16px;
  }

  .equipo-section {
    padding: 40px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .funciones-grid {
    grid-template-columns: 1fr;
  }
}
</style>