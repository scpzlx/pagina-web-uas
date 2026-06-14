<template>
  <div class="sec-adm-page">

    <!-- HERO — amarillo (sin imagen, tiene suficiente contenido de texto) -->
    <section class="hero-sec">
      <div class="hero-inner">
        <div class="hero-breadcrumb">
          <RouterLink to="/">Inicio</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <span>Departamentos</span>
          <i class="ti ti-chevron-right"></i>
          <span>Secretaría Administrativa</span>
        </div>
        <h1>Secretaría <span>Administrativa</span></h1>
        <p>Área encargada de coadyuvar con la dirección en la planeación, organización, coordinación y supervisión de
          los recursos humanos, financieros y materiales de la EDAV.</p>
        <div class="hero-badges">
          <span><i class="ti ti-briefcase"></i> Gestión Institucional</span>
          <span><i class="ti ti-users"></i> Recursos Humanos</span>
          <span><i class="ti ti-chart-bar"></i> Recursos Financieros</span>
        </div>
        <div class="hero-contacto">
          <a href="tel:6673542354" class="hc-item">
            <i class="ti ti-phone"></i>
            <span>667-354-2354 Ext. 107</span>
          </a>
          <a href="mailto:secretaria.administrativa@info.uas.edu.mx" class="hc-item">
            <i class="ti ti-mail"></i>
            <span>secretaria.administrativa@info.uas.edu.mx</span>
          </a>
        </div>
      </div>
    </section>

    <!-- DESCRIPCIÓN — azul -->
    <section class="desc-section">
      <div class="container">
        <div class="desc-inner">
          <div class="desc-icon"><i class="ti ti-building"></i></div>
          <p>La Secretaría Administrativa busca coadyuvar con la dirección en la planeación, organización, coordinación
            y supervisión de los recursos humanos, financieros y materiales con que cuenta la unidad académica, a fin de
            proporcionar oportunamente los servicios administrativos que se requieran para el desarrollo de las
            funciones sustantivas de la dependencia.</p>
        </div>
      </div>
    </section>

    <!-- MISIÓN Y VISIÓN — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Filosofía institucional</div>
        <h2 class="s-title">Misión y Visión</h2>
        <div class="mv-grid">
          <div class="mv-card">
            <div class="mv-header">
              <div class="mv-icon"><i class="ti ti-target"></i></div>
              <h3>Misión</h3>
            </div>
            <p>Eficientar el uso y aplicación de los recursos financieros y materiales que se obtienen, así como el
              manejo transparente y honesto de los mismos, mediante sistemas y procedimientos apropiados que nos
              permitan dar resultados óptimos en el funcionamiento de los servicios administrativos, realizando
              evaluaciones permanentes en todas las áreas que son competencia, incluyendo la supervisión y mantenimiento
              de las instalaciones, además de organizar, controlar y supervisar el cumplimiento del personal de la
              facultad.</p>
          </div>
          <div class="mv-card featured">
            <div class="mv-header">
              <div class="mv-icon"><i class="ti ti-eye"></i></div>
              <h3>Visión</h3>
            </div>
            <p>Lograr el reconocimiento y trascendencia de nuestra facultad siendo ejemplo en el manejo y administración
              de los recursos con los que cuenta, desarrollando de forma integral nuestras actividades con una visión de
              futuro que nos permita contribuir a la excelencia académica y administrativa de la misma, acreditada por
              organismos con reconocimiento nacional e internacional.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EQUIPO — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Personal</div>
        <h2 class="s-title">Nuestro Equipo</h2>
        <div class="equipo-grid">
          <div v-for="(persona, i) in equipo" :key="persona.nombre" class="equipo-card" :class="{ principal: i === 0 }">
            <div class="equipo-foto">
              <img v-if="persona.foto" :src="persona.foto" :alt="persona.nombre" />
              <div v-else class="equipo-avatar">
                <i class="ti ti-user"></i>
              </div>
              <div v-if="i === 0" class="equipo-badge">
                <i class="ti ti-crown"></i> Principal
              </div>
            </div>
            <div class="equipo-body">
              <h3>{{ persona.nombre }}</h3>
              <span class="equipo-cargo">{{ persona.cargo }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FUNCIONES — azul -->
    <section class="section bg-dark">
      <div class="container">
        <div class="s-tag light">Responsabilidades</div>
        <h2 class="s-title light">Funciones</h2>
        <div class="funciones-grid">
          <div v-for="(fn, i) in funciones" :key="i" class="funcion-card">
            <div class="funcion-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <p>{{ fn }}</p>
          </div>
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
            <i class="ti ti-briefcase deco-icon"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">Contacto</div>
            <h2 class="s-title">¿Necesitas información?</h2>
            <p>Para mayor información comunícate con el Departamento de Secretaría Administrativa. Estamos aquí para
              apoyarte en todos los trámites y gestiones administrativas.</p>
            <div class="contacto-items">
              <a href="tel:6673542354" class="contacto-item">
                <div class="contacto-icon"><i class="ti ti-phone"></i></div>
                <div>
                  <span class="contacto-label">Teléfono</span>
                  <span class="contacto-value">667-354-2354 Ext. 107</span>
                </div>
              </a>
              <a href="mailto:secretaria.administrativa@info.uas.edu.mx" class="contacto-item">
                <div class="contacto-icon"><i class="ti ti-mail"></i></div>
                <div>
                  <span class="contacto-label">Correo Electrónico</span>
                  <span class="contacto-value">secretaria.administrativa@info.uas.edu.mx</span>
                </div>
              </a>
            </div>
            <div class="cta-btns">
              <!-- <RouterLink to="/facultad/directorio" class="btn-primary">
                Ver Directorio <i class="ti ti-arrow-right"></i>
              </RouterLink>
              <RouterLink to="/facultad/organigrama" class="btn-outline">
                Ver Organigrama
              </RouterLink> -->
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const equipo = [
  { nombre: 'Dra. Ruth Mora', cargo: 'Secretaria Administrativa', foto: '/images/maestro1.avif' },
  { nombre: 'Lic. Nombre', cargo: 'Oficial Administrativo', foto: '/images/maestro2.avif' },
  { nombre: 'C. Nombre', cargo: 'Auxiliar Administrativo', foto: '/images/maestro3.avif' },
]

const funciones = [
  'Coordinar y supervisar las actividades del personal que conforma la secretaría administrativa.',
  'Establecer los mecanismos de coordinación que permitan la adecuada administración de los recursos humanos, financieros y materiales asignados.',
  'Presentar a la consideración del director el proyecto del programa de actividades de la Secretaría Administrativa, con metas y objetivos particulares de cada área que la conforma, así como sus costos.',
  'Informar de manera periódica al director sobre los avances en el cumplimiento de los programas.',
  'Vigilar la atención que se dé al personal en lo correspondiente a sus necesidades, derechos y obligaciones, sobre las bases legales procedentes.',
  'Presentar al director de la dependencia el anteproyecto de operación anual con objetivos y metas, así como el costo programado.',
  'Definir las políticas y procedimientos a seguir para el aprovisionamiento de bienes, materiales y prestación de servicios que se requieran en el desempeño de las actividades de las diferentes áreas.',
  'Coordinar las actividades inherentes a la recepción, control y entrega de la correspondencia.',
  'Auxiliar en la reproducción de documentos.',
  'Cerrar las instalaciones al término de la jornada laboral verificando previamente que no haya inconvenientes.',
  'Participar en la publicación de eventos organizados por la dependencia dentro de su área.',
  'Manejo de equipo de oficina necesario para su trabajo.',
  'Auxiliar en la elaboración de listas de materiales necesarios para el desarrollo de las labores al interior de la dependencia.',
  'Vigilar el adecuado cumplimiento de los criterios emitidos por el director que permitan la coordinación con el resto de la organización.',
  'Representar a la unidad académica ante las autoridades administrativas universitarias.',
  'Llevar un registro y control de los asuntos y actividades relevantes de la secretaría administrativa por cada una de las áreas que la integran.',
  'Mantener relación directa con las dependencias normativas, a fin de evitar demora en el trámite de la documentación.',
  'Apoyar al departamento de difusión en la logística para la realización de eventos.',
  'Promover la capacitación y adiestramiento del personal administrativo en los programas y áreas que favorezcan su desarrollo y la superación del centro.',
  'Auxiliar al director en la elaboración anual del proyecto de presupuesto de la unidad académica conforme a criterios programáticos.',
  'Informar al director de manera especial sobre el ejercicio del presupuesto.',
  'Coordinar y supervisar las actividades del personal de vigilancia, intendencia, biblioteca, jardinería, secretarias y veladores.',
  'Programar el adiestramiento al personal de intendencia y vigilancia, con la asesoría y apoyo de la coordinación de asuntos laborales.',
  'Auxiliar en trabajos que correspondan a movimientos de oficina.',
  'Auxiliar en la compaginación de documentos.',
  'Auxiliar en el mantenimiento y consulta de archivo de la dependencia.',
  'Encargarse de la entrega de notificaciones, avisos relacionados con reuniones u otros requerimientos al interior de la dependencia.',
  'Auxiliar en el llenado y verificación de formas de trámites diversos relacionados con la dependencia.',
  'Reportar y solicitar el mantenimiento oportuno de equipo y muebles de oficina.',
  'Realizar otras actividades inherentes al puesto.',
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');


.sec-adm-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ─────────────────────────────────────────── */
.hero-sec {
  background: #ffd500;
  padding: 64px 48px;
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

.hero-sec::after {
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
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.15;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.hero-sec h1 span {
  opacity: 0.7;
}

.hero-sec p {
  font-size: 15px;
  color: rgba(15, 26, 140, 0.75);
  max-width: 600px;
  line-height: 1.7;
  margin-bottom: 24px;
}

.hero-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
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

.hero-contacto {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hc-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0f1a8c;
  color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s;
}

.hc-item:hover {
  background: #1a2db5;
}

.hc-item i {
  font-size: 15px;
}

/* ─── DESCRIPCIÓN ──────────────────────────────────── */
.desc-section {
  background: #0f1a8c;
  padding: 40px 48px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.desc-inner {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.desc-icon {
  font-size: 32px;
  color: #ffd500;
  flex-shrink: 0;
  margin-top: 2px;
}

.desc-inner p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  line-height: 1.8;
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

/* ─── MISIÓN Y VISIÓN ──────────────────────────────── */
.mv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.mv-card {
  background: #f4f5f9;
  border-radius: 16px;
  padding: 32px;
  border-top: 3px solid #0f1a8c;
  transition: transform 0.2s, box-shadow 0.2s;
}

.mv-card.featured {
  background: #ffd500;
  border-top-color: #0f1a8c;
}

.mv-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.mv-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.mv-icon {
  font-size: 28px;
  color: #0f1a8c;
}

.mv-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #0f1a8c;
}

.mv-card p {
  font-size: 14px;
  color: #555;
  line-height: 1.8;
}

.mv-card.featured p {
  color: rgba(15, 26, 140, 0.75);
}

/* ─── EQUIPO ───────────────────────────────────────── */
.equipo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.equipo-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.equipo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 26, 140, 0.1);
}

.equipo-card.principal {
  border: 2px solid #ffd500;
}

.equipo-foto {
  position: relative;
  height: 220px;
  background: #e8ecff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.equipo-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.equipo-avatar {
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

.equipo-body {
  padding: 18px 20px;
  text-align: center;
}

.equipo-body h3 {
  color: #1a1a2e;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}

.equipo-cargo {
  font-size: 12px;
  font-weight: 600;
  color: #0f1a8c;
  background: #e8ecff;
  padding: 3px 12px;
  border-radius: 20px;
  display: inline-block;
}

/* ─── FUNCIONES ────────────────────────────────────── */
.funciones-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.funcion-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  transition: background 0.2s;
}

.funcion-card:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 213, 0, 0.4);
}

.funcion-num {
  background: #ffd500;
  color: #0f1a8c;
  font-size: 12px;
  font-weight: 800;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.funcion-card p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  line-height: 1.6;
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
  margin-bottom: 24px;
}

.contacto-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.contacto-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  border-radius: 12px;
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-left: 3px solid #ffd500;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.contacto-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(15, 26, 140, 0.1);
}

.contacto-icon {
  width: 36px;
  height: 36px;
  background: #e8ecff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f1a8c;
  font-size: 18px;
  flex-shrink: 0;
}

.contacto-item>div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contacto-label {
  font-size: 11px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contacto-value {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
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
  .hero-sec {
    padding: 48px 24px;
  }

  .desc-section {
    padding: 32px 24px;
  }

  .section {
    padding: 56px 24px;
  }

  .mv-grid {
    grid-template-columns: 1fr;
  }

  .equipo-grid {
    grid-template-columns: 1fr 1fr;
  }

  .funciones-grid {
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
  .hero-sec {
    padding: 40px 16px;
  }

  .desc-section {
    padding: 24px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .equipo-grid {
    grid-template-columns: 1fr;
  }

  .funciones-grid {
    grid-template-columns: 1fr;
  }

  .hero-contacto {
    flex-direction: column;
  }
}
</style>