<template>
  <div class="adiuas-page">
    <section class="hero-adiuas">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Departamentos</span>
            <i class="ti ti-chevron-right"></i>
            <span>ADIUAS</span>
          </div>
          <h1>Programa Atención a la <br><span>Diversidad</span></h1>
          <p>El programa ADIUAS se enmarca en el concepto de la educación inclusiva, y tiene como propósito
            lograr que las y los estudiantes que presentan necesidades específicas de apoyo educativo
            desarrollen competencias, potencialicen sus capacidades para participar social y laboralmente.</p>
          <div class="hero-badges">
            <span><i class="ti ti-users"></i> Educacion Inclusiva</span>
            <span><i class="ti ti-accessibility"></i> Atención Especializada</span>
            <span><i class="ti ti-heart-handshake"></i> Equidad e Igualdad</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/adiuas.jpg" alt="ADIUAS" class="hero-img" />
          </div>
        </div>
      </div>
    </section>


    <!-- PRESENTACIÓN — blanco -->
    <section class="section bg-white">
      <div class="inner">
        <div class="pres-grid">
          <div class="pres-img-wrap">
            <img src="/images/rector-uas.jpg" alt="Rector UAS" class="pres-img" />
            <div class="pres-img-badge">
              <i class="ti ti-quote"></i>
            </div>
          </div>
          <div class="pres-content">
            <div class="s-tag">Mensaje institucional</div>
            <h2 class="s-title">Presentación</h2>
            <p>La Universidad Autónoma de Sinaloa, en coordinación con Secretaría Académica Universitaria
              y a través del Programa ADIUAS, responde a las necesidades sociales con calidad educativa,
              y con ello estar a la vanguardia de las políticas internacionales y nacionales en el tema
              de educación como una prioridad institucional.</p>
            <p>Por tal motivo, hemos puesto atención especial en la formación integral y humanista con
              equidad, inclusión y calidad educativa para todos los estudiantes sin distinción de raza,
              nacionalidad, origen étnico, color de piel, estado civil, edad, religión o creencias,
              lengua, sexo, preferencia u orientación sexual e identidad de género, apariencia física,
              condición social, cultural, económica, de salud o de discapacidad y cualquier otra que
              atente contra la dignidad humana.</p>

            <div class="pres-expandible" :class="{ show: presExpanded }">
              <p><strong>ADIUAS</strong> es la muestra fehaciente de la responsabilidad social de la
                Universidad con los sectores más desprotegidos, el impacto principalmente en la atención
                a estudiantes con discapacidad que bajo mi gestión se ha logrado ampliar la cobertura y
                la diversificación de la oferta educativa para ellos(as), así como descentralizar la
                atención, mejorando los servicios de intervención.</p>
              <p>Podemos decir que <strong>ADIUAS</strong> es más que un programa, es un compromiso con
                la sociedad, con la inclusión de estudiantes antes discriminados. Por ello y para ellos
                seguiremos trabajando por la inclusión, equidad y calidad educativa mejorando cada día
                las acciones, con la convicción de lograr una sociedad más justa y en igualdad de
                oportunidades para todos.</p>
            </div>

            <button class="btn-expand" @click="presExpanded = !presExpanded">
              <i :class="presExpanded ? 'ti ti-chevron-up' : 'ti ti-chevron-down'"></i>
              {{ presExpanded ? 'Ocultar' : 'Continuar leyendo' }}
            </button>

            <p class="firma"><i class="ti ti-user-star"></i> Rector de la Universidad Autónoma de Sinaloa</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MISIÓN — gris -->
    <section class="section bg-gray">
      <div class="inner">
        <div class="mision-grid">
          <div class="mision-text">
            <div class="s-tag">Propósito</div>
            <h2 class="s-title">Misión</h2>
            <p>ADIUAS tiene como Misión eliminar las barreras para el aprendizaje y apoyar la formación
              integral e inclusiva, para lo cual brinda seguimiento especializado en condiciones de equidad
              e igualdad de oportunidades a estudiantes de educación media superior, superior y posgrado de
              la Universidad Autónoma de Sinaloa, que presentan necesidades específicas de atención, poseen
              talentos sobresalientes o pertenecen a grupos en desventaja o vulnerables.</p>
            <p>Se requiere desplegar acciones que favorezcan el desarrollo máximo de sus capacidades y así
              disminuir las desigualdades físicas, sensoriales, comunicativas, socio-culturales, económicas,
              de género y de cualquier otra que atente contra la dignidad humana, logrando su plena inclusión
              a la vida universitaria.</p>
            <div class="mision-chips">
              <span v-for="chip in misionChips" :key="chip"><i class="ti ti-check"></i> {{ chip }}</span>
            </div>
          </div>
          <div class="mision-img-wrap">
            <img src="/images/servicio-social-valores.webp" alt="Valores UAS" class="mision-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- VISIÓN — azul -->
    <section class="section bg-dark">
      <div class="inner">
        <div class="vision-grid">
          <div class="vision-img-wrap">
            <img src="/images/servicio-social-vision.jpg" alt="Visión ADIUAS" class="vision-img" />
          </div>
          <div class="vision-text">
            <div class="s-tag light">Proyección</div>
            <h2 class="s-title light">Visión</h2>
            <p class="vision-p">En el 2021, ADIUAS se ha consolidado como programa y brinda atención de calidad
              tanto a estudiantes con barreras para el aprendizaje, como aquellos que poseen talentos
              sobresalientes y/o pertenecen a grupos en desventaja o en situación de vulnerabilidad. Las
              Unidades Regionales cuentan con Centros de Apoyo ADIUAS con equipamiento específico y desde
              donde se generan los materiales educativos adaptados.</p>

            <div class="vision-expandible" :class="{ show: visionExpanded }">
              <p class="vision-p">El equipo de tutores de apoyo especializado (TAE) está capacitado en
                lenguajes, tiflotecnología, adecuaciones curriculares y estrategias alternativas para
                facilitar el desarrollo óptimo de las potencialidades de las y los estudiantes durante
                su formación profesional. La Secretaría Académica Universitaria coordina esta atención
                especializada vinculando al Programa Institucional de Tutoría y los Centros de Atención
                Estudiantil (CAE) con los Centros de Apoyo ADIUAS y la Red de TAEs.</p>
            </div>

            <button class="btn-expand light" @click="visionExpanded = !visionExpanded">
              <i :class="visionExpanded ? 'ti ti-chevron-up' : 'ti ti-chevron-down'"></i>
              {{ visionExpanded ? 'Ocultar' : 'Seguir leyendo' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- OBJETIVOS — blanco -->
    <section class="section bg-white">
      <div class="inner">
        <div class="obj-grid">
          <div class="obj-content">
            <div class="s-tag">Metas institucionales</div>
            <h2 class="s-title">Objetivos</h2>
            <ol class="obj-lista">
              <li v-for="(obj, idx) in objetivosVisible" :key="idx">
                <span class="obj-num">{{ String(idx + 1).padStart(2, '0') }}</span>
                <span>{{ obj }}</span>
              </li>
            </ol>
            <div class="obj-hidden-list" :class="{ show: objExpanded }">
              <ol class="obj-lista" :start="4">
                <li v-for="(obj, idx) in objetivosOcultos" :key="idx">
                  <span class="obj-num">{{ String(idx + 4).padStart(2, '0') }}</span>
                  <span>{{ obj }}</span>
                </li>
              </ol>
            </div>
            <button class="btn-expand" @click="objExpanded = !objExpanded">
              <i :class="objExpanded ? 'ti ti-chevron-up' : 'ti ti-chevron-down'"></i>
              {{ objExpanded ? 'Ocultar' : 'Continuar leyendo' }}
            </button>
          </div>
          <div class="obj-img-wrap">
            <img src="/images/servicio-social-bienestar.jpg" alt="Bienestar" class="obj-img" />
          </div>
        </div>
      </div>
    </section>

    <!-- PROGRAMAS VINCULADOS — gris -->
    <section class="section bg-gray">
      <div class="inner">
        <div class="s-tag">Red institucional</div>
        <h2 class="s-title">Programas Vinculados</h2>
        <div class="programas-grid">
          <div class="programa-card" v-for="prog in programas" :key="prog.nombre">
            <div class="programa-img-wrap">
              <img :src="prog.img" :alt="prog.nombre" />
            </div>
            <p>{{ prog.nombre }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ENLACES — blanco con borde amarillo -->
    <section class="section bg-white enlaces-section">
      <div class="inner">
        <div class="s-tag">Recursos</div>
        <h2 class="s-title">Enlaces Relacionados</h2>
        <div class="enlaces-grid">
          <div class="enlaces-col" v-for="col in enlaces" :key="col.titulo">
            <div class="enlaces-col-header">
              <i :class="col.icon"></i>
              <h3>{{ col.titulo }}</h3>
            </div>
            <ul>
              <li v-for="link in col.links" :key="link.label">
                <a :href="link.url" target="_blank" rel="noopener noreferrer">
                  <i class="ti ti-external-link"></i>
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const presExpanded = ref(false)
const visionExpanded = ref(false)
const objExpanded = ref(false)

const misionChips = [
  'Equidad e inclusión',
  'Atención especializada',
  'Talentos sobresalientes',
  'Grupos vulnerables',
  'Tutores TAE',
  'Materiales adaptados',
]

const objetivosVisible = [
  'Contribuir a la inclusión educativa y el éxito escolar de estudiantes con barreras para el aprendizaje, con talentos sobresalientes y/o en condiciones de desventaja o de vulnerabilidad.',
  'Desarrollar en la población antes mencionada, las competencias genéricas y disciplinares necesarias para el logro de la autonomía personal y de participación plena en la escuela y en sociedad.',
  'Brindar apoyo, acompañamiento, recursos materiales y de atención al entorno que aseguren la accesibilidad y el logro de la autonomía personal.',
]

const objetivosOcultos = [
  'Ofrecer atención personalizada e integral con adecuaciones y soporte que aseguren la eliminación de barreras físicas, comunicativas, socio-culturales y económicas mediante un cuerpo de Tutores de Atención Especializados (TAE).',
  'En coordinación con la Unidad de Bienestar Universitario, promover en la comunidad universitaria una cultura de respeto a las diferencias y de atención educativa equitativa.',
  'Concretizar las políticas de equidad y respeto a la diversidad para el ingreso, permanencia y terminación exitosa en los estudios de bachillerato, licenciatura y posgrado.',
  'Impulsar el trabajo corresponsable en equipo, que involucre a los diversos actores educativos (estudiantes, profesores, padres de familia y administradores) para favorecer la inclusión educativa.',
  'Coordinar y desarrollar acciones de capacitación y sensibilización para la atención a la diversidad, la equidad y la inclusión educativa en todos los niveles.',
  'Evaluar y dar seguimiento a los procesos y resultados de las acciones emprendidas para incluir estudiantes con barreras para el aprendizaje y con talentos sobresalientes.',
  'Proveer de materiales educativos adaptados y tiflotecnología de vanguardia a las unidades académicas que tengan incluidos en sus aulas estudiantes con discapacidad.',
  'Difundir el uso de la lengua de señas mexicana e interpretar clases y eventos.',
  'Estar a la vanguardia de las necesidades educativas para los grupos vulnerables, desarrollando acciones para atenderlas con responsabilidad social.',
]

const programas = [
  { nombre: 'Programa Institucional de Tutorías', img: '/images/programa-institucional-tutorias.png' },
  { nombre: 'Programa de Asesores Par', img: '/images/programa-asesores-par.png' },
  { nombre: 'Centros de Atención Estudiantil', img: '/images/centro-atencion-estudiantil.png' },
  { nombre: 'Unidad de Bienestar Universitario', img: '/images/unidad-bienestar-universitario.jpg' },
  { nombre: 'Difusión Cultural y Deportes', img: '/images/difusion-cultural-deportes.jpg' },
  { nombre: 'Programa de Doctores Jóvenes', img: '/images/programa-doctores-jovenes.jpg' },
  { nombre: 'Dirección General de Servicio Social', img: '/images/direccion-general-servicio-social.jpg' },
  { nombre: 'UAS Virtual', img: '/images/uas-virtual.jpg' },
  { nombre: 'Dirección General de Vinculación Internacional', img: '/images/direccion-general-vinculacion-internacional.jpg' },
  { nombre: 'Dirección General de Educación Superior', img: '/images/direccion-general-educacion-superior.jpg' },
  { nombre: 'Dirección General de Vinculación y Posgrado', img: '/images/direccion-general-vinculacion-posgrado.jpg' },
]

const enlaces = [
  {
    icon: 'ti ti-school',
    titulo: 'Sitios para estudiantes',
    links: [
      { label: 'UAS principal', url: 'https://www.uas.edu.mx/' },
      { label: 'Control escolar', url: 'http://siia.uasnet.mx/alumnos/' },
      { label: 'Derechos humanos', url: 'https://www.cndh.org.mx/' },
    ],
  },
  {
    icon: 'ti ti-home',
    titulo: 'Sitios para padres',
    links: [
      { label: 'Bienestar Universitario', url: 'https://www.uas.edu.mx/bienestar' },
      { label: 'SEP Padres', url: 'https://www.sep.gob.mx/swb/sep1/padres_de_familia' },
      { label: 'CONAPRED', url: 'https://www.conapred.org.mx/' },
    ],
  },
  {
    icon: 'ti ti-chalkboard',
    titulo: 'Sitios para docentes',
    links: [
      { label: 'SAU', url: 'https://sau.uas.edu.mx/' },
      { label: 'DGIP', url: 'https://sites.google.com/a/uas.edu.mx/dgipweb/' },
      { label: 'UAS Empleado', url: 'https://siia.uasnet.mx/empleado/' },
    ],
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.adiuas-page {
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
  margin: 0 0 32px;
}

.s-title.light {
  color: #ffffff;
}

/* ── HERO ─────────────────────────────────── */

.hero-adiuas {
  background: #ffd500;
  padding: 64px 48px 56px;
  position: relative;
  overflow: hidden;
}

.hero-adiuas::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-adiuas::after {
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

.hero-adiuas h1 {
  font-size: clamp(26px, 3.5vw, 44px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.hero-adiuas h1 span {
  color: #1a3a8c;
  opacity: 0.7;
}

.hero-adiuas p {
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
  max-height: 380px;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

/* ── PRESENTACIÓN ─────────────────────────── */
.pres-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 56px;
  align-items: start;
}

.pres-img-wrap {
  position: relative;
  border-radius: 20px;
  overflow: visible;
}

.pres-img {
  width: 100%;
  border-radius: 20px;
  display: block;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.pres-img-badge {
  position: absolute;
  bottom: -14px;
  right: -14px;
  width: 52px;
  height: 52px;
  background: #ffd500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #0f1a8c;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.pres-content p {
  font-size: 15px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 16px;
}

.pres-expandible {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.4s ease;
  opacity: 0;
}

.pres-expandible.show {
  max-height: 600px;
  opacity: 1;
}

.firma {
  display: flex;
  align-items: center;
  gap: 8px;
  font-style: italic;
  color: #0f1a8c;
  font-weight: 600;
  font-size: 14px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1.5px solid #f0f0f0;
}

/* ── BOTÓN EXPANDIR ───────────────────────── */
.btn-expand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0f1a8c;
  color: white;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 16px;
  transition: background 0.2s, transform 0.2s;
}

.btn-expand:hover {
  background: #1a2fa0;
  transform: translateY(-1px);
}

.btn-expand.light {
  background: #ffd500;
  color: #0f1a8c;
}

.btn-expand.light:hover {
  background: #ffe033;
}

/* ── MISIÓN ───────────────────────────────── */
.mision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.mision-text p {
  font-size: 15px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 16px;
}

.mision-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.mision-chips span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: white;
  color: #0f1a8c;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1.5px solid rgba(15, 26, 140, 0.15);
}

.mision-chips span i {
  color: #ffd500;
  font-size: 13px;
}

.mision-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

.mision-img {
  width: 100%;
  height: auto;
  display: block;
}

/* ── VISIÓN ───────────────────────────────── */
.vision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.vision-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.vision-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
}

.vision-p {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
}

.vision-expandible {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease, opacity 0.4s ease;
  opacity: 0;
}

.vision-expandible.show {
  max-height: 400px;
  opacity: 1;
}

/* ── OBJETIVOS ────────────────────────────── */
.obj-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
}

.obj-lista {
  list-style: none;
  padding: 0;
  margin: 0 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.obj-lista li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #f4f5f9;
  border-radius: 12px;
  padding: 14px 18px;
  font-size: 14px;
  line-height: 1.6;
  color: #444;
  border-left: 3px solid #ffd500;
  transition: border-color 0.2s, transform 0.2s;
}

.obj-lista li:hover {
  border-left-color: #0f1a8c;
  transform: translateX(3px);
}

.obj-num {
  font-size: 18px;
  font-weight: 900;
  color: #0f1a8c;
  opacity: 0.25;
  flex-shrink: 0;
  line-height: 1.3;
}

.obj-hidden-list {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.6s ease, opacity 0.4s ease;
  opacity: 0;
}

.obj-hidden-list.show {
  max-height: 2000px;
  opacity: 1;
}

.obj-hidden-list .obj-lista {
  margin-top: 12px;
}

.obj-img-wrap {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 100px;
}

.obj-img {
  width: 100%;
  display: block;
}

/* ── PROGRAMAS ────────────────────────────── */
.programas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.programa-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  border: 1.5px solid rgba(15, 26, 140, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
}

.programa-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(15, 26, 140, 0.1);
}

.programa-img-wrap {
  overflow: hidden;
}

.programa-img-wrap img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.programa-card:hover .programa-img-wrap img {
  transform: scale(1.05);
}

.programa-card p {
  font-size: 12px;
  font-weight: 600;
  color: #0f1a8c;
  padding: 12px 14px;
  line-height: 1.4;
  margin: 0;
}

/* ── ENLACES ──────────────────────────────── */
.enlaces-section {
  border-top: 4px solid #ffd500;
}

.enlaces-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.enlaces-col {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 28px 24px;
  border-top: 4px solid #0f1a8c;
}

.enlaces-col-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.enlaces-col-header i {
  font-size: 22px;
  color: #0f1a8c;
}

.enlaces-col-header h3 {
  font-size: 15px;
  font-weight: 700;
  color: #0f1a8c;
  margin: 0;
}

.enlaces-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.enlaces-col a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #0f1a8c;
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.2s, color 0.2s;
}

.enlaces-col a:hover {
  color: #1e3a8a;
  gap: 10px;
  text-decoration: underline;
}

.enlaces-col a i {
  font-size: 13px;
  color: #ffd500;
  flex-shrink: 0;
}

/* ── RESPONSIVE ───────────────────────────── */
@media (max-width: 1024px) {
  .programas-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-adiuas {
    padding: 48px 24px;
  }

  .section {
    padding: 56px 24px;
  }

  .pres-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .pres-img-wrap {
    max-width: 260px;
    margin: 0 auto;
  }

  .mision-grid {
    grid-template-columns: 1fr;
  }

  .mision-img-wrap {
    display: none;
  }

  .vision-grid {
    grid-template-columns: 1fr;
  }

  .vision-img-wrap {
    display: none;
  }

  .obj-grid {
    grid-template-columns: 1fr;
  }

  .obj-img-wrap {
    display: none;
  }

  .programas-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .enlaces-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero-adiuas {
    padding: 40px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .hero-stats {
    gap: 10px;
  }

  .programas-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>