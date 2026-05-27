<template>
  <div class="organigrama-page">

    <!-- HERO — amarillo -->
    <section class="hero-organigrama">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Facultad</span>
            <i class="ti ti-chevron-right"></i>
            <span>Organigrama</span>
          </div>
          <h1>Organigrama</h1>
          <p>Estructura organizacional de la Secretaría Administrativa de la Facultad de Diseño y Artes Visuales de la
            UAS.</p>
          <div class="hero-badges">
            <span><i class="ti ti-sitemap"></i> Estructura Organizacional</span>
            <span><i class="ti ti-users"></i> 6 Departamentos</span>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/organigrama.jpeg" alt="Organigrama EDAV" class="hero-img" />
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

    <!-- OBJETIVO — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="objetivo-box">
          <div class="objetivo-icon"><i class="ti ti-target" aria-hidden="true"></i></div>
          <div>
            <div class="s-tag">Misión del área</div>
            <h2 class="s-title">Objetivo General</h2>
            <p>Colaborar con la programación, planeación, coordinación, organización y funcionamiento del área
              administrativa de la unidad académica, supervisando las funciones de personal académico, administrativo,
              recursos financieros y materiales, con el apoyo de procedimientos apropiados que permitan la integración
              de las funciones óptimas de los servicios administrativos y el buen desempeño en cada una de las áreas,
              con el fin de aprovechar al máximo los recursos con los que se cuenta, así como también resolver problemas
              que afecten en el área laboral de los administrativos y académicos en dicha unidad académica.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ESTRUCTURA VISUAL — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Jerarquía</div>
        <h2 class="s-title">Estructura Organizacional</h2>

        <div class="org-chart">
          <div class="org-top">
            <div class="org-box principal">
              <div class="org-box-icon"><i class="ti ti-crown" aria-hidden="true"></i></div>
              <h4>Secretaría Administrativa</h4>
              <p>Coordinación General</p>
            </div>
          </div>
          <div class="org-line"></div>
          <div class="org-bottom">
            <div v-for="dep in departamentosOrg" :key="dep.label" class="org-box secundario">
              <div class="org-box-icon"><i :class="`ti ${dep.icon}`" aria-hidden="true"></i></div>
              <h4>{{ dep.label }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DEPARTAMENTOS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Personal y funciones</div>
        <h2 class="s-title">Departamentos y Funciones</h2>
        <div class="deps-grid">
          <div v-for="dep in departamentos" :key="dep.title" class="dep-card">
            <div class="dep-img-wrap">
              <img :src="dep.img" :alt="dep.title" class="dep-img" />
              <div class="dep-img-overlay"></div>
            </div>
            <div class="dep-body">
              <span class="dep-tag">{{ dep.tag }}</span>
              <h3>{{ dep.title }}</h3>
              <p>{{ dep.desc }}</p>
              <button class="funciones-btn" @click="toggleFunciones(dep.title)">
                {{ funcAbierta === dep.title ? 'Ocultar funciones' : 'Ver funciones principales' }}
                <i :class="funcAbierta === dep.title ? 'ti ti-chevron-up' : 'ti ti-chevron-down'"></i>
              </button>
              <div v-if="funcAbierta === dep.title" class="funciones-list">
                <ul>
                  <li v-for="fn in dep.funciones" :key="fn">
                    <i class="ti ti-check" aria-hidden="true"></i> {{ fn }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
            <i class="ti ti-sitemap deco-icon" aria-hidden="true"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">¿Tienes dudas?</div>
            <h2 class="s-title">Contacta a la Secretaría Administrativa</h2>
            <p>Si necesitas más información sobre la estructura organizacional o quieres ponerte en contacto con algún
              departamento, visita nuestro directorio.</p>
            <div class="cta-btns">
              <RouterLink to="/departamentos/secretaria-administrativa" class="btn-primary">
                Ver Secretaría Administrativa <i class="ti ti-arrow-right"></i>
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
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const funcAbierta = ref<string | null>(null)

function toggleFunciones(title: string) {
  funcAbierta.value = funcAbierta.value === title ? null : title;
}

const stats = [
  { icon: 'ti-building', number: '1', label: 'Secretaría Administrativa' },
  { icon: 'ti-users', number: '6', label: 'Departamentos' },
  { icon: 'ti-clipboard-list', number: '31+', label: 'Funciones documentadas' },
  { icon: 'ti-shield-check', number: '100%', label: 'Respaldo institucional' },
]

const departamentosOrg = [
  { label: 'Secretarias', icon: 'ti-file-text' },
  { label: 'Biblioteca', icon: 'ti-books' },
  { label: 'Modelos', icon: 'ti-user' },
  { label: 'Intendencias', icon: 'ti-tools' },
  { label: 'Veladores', icon: 'ti-shield' },
]

const departamentos = [
  {
    title: 'Secretaría Administrativa',
    tag: 'Coordinación Principal',
    img: '/images/secretaria-administrativa.jpg',
    desc: 'Colaborar con la programación, planeación, coordinación, organización y funcionamiento del área administrativa de la unidad académica, supervisando las funciones de personal académico, administrativo, recursos financieros y materiales.',
    funciones: [
      'Coordinar y supervisar las actividades del personal de la secretaría administrativa',
      'Establecer mecanismos de coordinación para la administración de recursos humanos, financieros y materiales',
      'Supervisar el pago de nómina y su entrega oportuna a la dirección general de finanzas',
      'Vigilar la atención al personal en sus necesidades, derechos y obligaciones',
      'Definir políticas y procedimientos para el aprovisionamiento de bienes y servicios',
      'Representar a la unidad académica ante las autoridades administrativas universitarias',
      'Coordinar y supervisar las actividades del personal de vigilancia, intendencia, modelos y secretarias',
      'Administrar y supervisar el proceso de actualización del padrón del personal académico y administrativo',
    ],
  },
  {
    title: 'Secretarias',
    tag: 'Apoyo Administrativo',
    img: '/images/secretarias.jpg',
    desc: 'Atender de manera oportuna las disposiciones generales y específicas del área administrativa, realizando documentos requeridos por la administración y atendiendo a los estudiantes que requieran información.',
    funciones: [
      'Auxiliar en la redacción de documentos propios de la dependencia',
      'Elaborar, revisar, recibir, enviar, registrar y archivar la correspondencia',
      'Atender llamadas telefónicas y tomar anotaciones si se requiere',
      'Proporcionar orientación e información al público que lo requiera',
      'Llevar control de la correspondencia recibida y enviada',
      'Entregar Kárdex o constancias de estudio y realizar el cobro correspondiente',
      'Escanear documentos para el archivo digital de la unidad académica',
      'Elaborar cada mes un reporte de actividades desempeñadas',
    ],
  },
  {
    title: 'Biblioteca',
    tag: 'Servicios Bibliográficos',
    img: '/images/biblioteca.jpeg',
    desc: 'Espacio de lectura y aprendizaje cuyo objetivo es proporcionar los servicios de información bibliográfica necesarios, ofreciéndolos de manera eficaz y oportuna a los docentes, estudiantes y público en general.',
    funciones: [
      'Proporcionar las fuentes de información que permitan la realización de investigación',
      'Apoyar, orientar y colaborar con las actividades propias de la docencia',
      'Recibir, registrar, colocar y localizar oportunamente libros y publicaciones',
      'Elaborar y mantener actualizado el inventario de la biblioteca',
      'Orientar al usuario sobre bibliografía, temas y fuentes de consulta',
      'Realizar préstamos internos y externos del acervo bibliográfico',
      'Emitir credenciales de biblioteca para estudiantes, administrativos y docentes',
      'Elaborar cada mes un reporte de actividades desempeñadas',
    ],
  },
  {
    title: 'Modelos',
    tag: 'Apoyo Artístico',
    img: '/images/modelos.jpg',
    desc: 'Apoyar en la construcción de la anatomía humana, tomando como referencia su figura anatómica para las proporciones de cánones y plasmarlos en dibujos, bocetos, pinturas, grabados y esculturas artísticas.',
    funciones: [
      'Auxiliar al docente del taller correspondiente que requiera de su compromiso',
      'Posar el tiempo requerido para el taller de dibujo, grabado, pintura y escultura',
      'Trabajar únicamente cuando el docente lo comunique',
      'Comunicar ante su jefe inmediato situaciones que afecten su integridad física o emocional',
      'Solicitar ante su jefe inmediato material de trabajo necesario',
      'Comunicar con anticipación los días económicos para concluir los trabajos en curso',
      'No permitir la toma de fotografías o video bajo ninguna circunstancia no autorizada',
      'Realizar otras actividades concernientes al puesto',
    ],
  },
  {
    title: 'Intendencias',
    tag: 'Limpieza y Mantenimiento',
    img: '/images/intendencia.png',
    desc: 'Cuidar, reacomodar y limpiar las instalaciones y muebles de la unidad académica, atendiendo cualquier espacio que requiera limpieza adecuada y utilizando materiales no contaminantes.',
    funciones: [
      'Conservar permanentemente limpios edificios, mobiliario y equipo del área asignada',
      'Mover y reacomodar mobiliario, equipo y accesorios necesarios',
      'Limpieza de alfombras, mobiliario, ventanas, muros, canceles y puertas',
      'Limpiar y desinfectar baños, salones y talleres del área asignada',
      'Resguardar las llaves de las aulas y espacios sujetos a limpieza',
      'Solicitar oportunamente el mantenimiento del equipo de trabajo',
      'Cuidar y usar adecuadamente material y herramientas de trabajo',
      'Elaborar cada mes un reporte de actividades desempeñadas',
    ],
  },
  {
    title: 'Veladores',
    tag: 'Vigilancia y Seguridad',
    img: '/images/veladores.jpg',
    desc: 'Vigilar y proteger las instalaciones de muebles e inmuebles de la Unidad Académica, garantizando la seguridad del patrimonio universitario.',
    funciones: [
      'Vigilar y resguardar los bienes muebles e inmuebles de la dependencia',
      'Realizar recorridos de vigilancia en las instalaciones',
      'Vigilar que los aparatos eléctricos y luces sean desconectadas a la salida del personal',
      'Revisar que las áreas mantengan su iluminación en horas de trabajo',
      'Comunicar las irregularidades que observe en su área de trabajo',
      'Notificar atentados contra los bienes de la institución',
      'Solicitar oportunamente el mantenimiento de su equipo de trabajo',
      'Elaborar cada mes un reporte de actividades desempeñadas',
    ],
  },
]

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.organigrama-page {
  font-family: 'Outfit', sans-serif;
}

/* HERO */
.hero-organigrama {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-organigrama::before {
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

.hero-organigrama h1 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  letter-spacing: -1px;
  margin-bottom: 16px;
  line-height: 1.1;
}

.hero-organigrama p {
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
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

/* STATS */
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

/* OBJETIVO */
.objetivo-box {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 36px;
  border-left: 4px solid #ffd500;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.objetivo-icon {
  font-size: 32px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 4px;
}

.objetivo-box .s-tag {
  margin-bottom: 4px;
}

.objetivo-box .s-title {
  margin-bottom: 12px;
  font-size: 20px;
}

.objetivo-box p {
  color: #555;
  font-size: 14px;
  line-height: 1.8;
}

/* ORGANIGRAMA VISUAL */
.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.org-top {
  display: flex;
  justify-content: center;
}

.org-box {
  border-radius: 14px;
  padding: 20px 28px;
  text-align: center;
  min-width: 220px;
}

.org-box.principal {
  background: #0f1a8c;
  color: white;
  border-bottom: 3px solid #ffd500;
}

.org-box.secundario {
  background: white;
  color: #0f1a8c;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: 3px solid #ffd500;
  min-width: 160px;
}

.org-box-icon {
  font-size: 22px;
  margin-bottom: 8px;
}

.org-box.principal .org-box-icon {
  color: #ffd500;
}

.org-box.secundario .org-box-icon {
  color: #0f1a8c;
}

.org-box h4 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.org-box.principal h4 {
  color: white;
}

.org-box p {
  font-size: 12px;
  opacity: 0.7;
}

.org-line {
  width: 3px;
  height: 40px;
  background: linear-gradient(180deg, #0f1a8c, #ffd500);
}

.org-bottom {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

/* DEPARTAMENTOS */
.deps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.dep-card {
  background: #f4f5f9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.dep-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.1);
}

.dep-img-wrap {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.dep-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.dep-card:hover .dep-img {
  transform: scale(1.05);
}

.dep-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50% rgba(15, 26, 140, 0.3) 100%);
}

.dep-body {
  padding: 20px 24px;
}

.dep-tag {
  font-size: 11px;
  font-weight: 700;
  color: #0f1a8c;
  background: #e8ecff;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 10px;
}

.dep-body h3 {
  color: #0f1a8c;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
}

.dep-body p {
  color: #555;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 16px;
}

.funciones-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  background: #ffd500;
  color: #0f1a8c;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  justify-content: space-between;
}

.funciones-btn:hover {
  background: #ffe033;
}

.funciones-list {
  margin-top: 12px;
  background: white;
  border-radius: 10px;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.07);
}

.funciones-list ul {
  list-style: none;
  padding: 0;
}

.funciones-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #555;
  padding: 6px 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  line-height: 1.5;
}

.funciones-list li:last-child {
  border-bottom: none;
}

.funciones-list li i {
  color: #0f1a8c;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
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
  .hero-organigrama {
    padding: 48px 24px;
  }

  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-right {
    display: none;
  }

  .stats-section {
    padding: 32px 24px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section {
    padding: 48px 24px;
  }

  .deps-grid {
    grid-template-columns: 1fr 1fr;
  }

  .org-bottom {
    gap: 10px;
  }

  .org-box.secundario {
    min-width: 130px;
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
  .hero-organigrama {
    padding: 40px 16px;
  }

  .stats-section {
    padding: 24px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .deps-grid {
    grid-template-columns: 1fr;
  }

  .objetivo-box {
    flex-direction: column;
    gap: 12px;
  }

  .org-bottom {
    flex-direction: column;
    align-items: center;
  }
}
</style>
