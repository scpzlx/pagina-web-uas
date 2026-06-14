<template>
  <div class="computo-page">

    <!-- HERO — amarillo -->
    <section class="hero-computo">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-breadcrumb">
            <RouterLink to="/">Inicio</RouterLink>
            <i class="ti ti-chevron-right"></i>
            <span>Departamentos</span>
            <i class="ti ti-chevron-right"></i>
            <span>Centro de Cómputo</span>
          </div>
          <h1>Centro de <br><span>Cómputo</span></h1>
          <p>Espacio tecnológico de la EDAV para el aprendizaje y la práctica académica, con equipos de última
            generación y software especializado.</p>
          <div class="hero-badges">
            <span><i class="ti ti-device-desktop"></i> 200+ Equipos</span>
            <span><i class="ti ti-clock"></i> Lun–Vie 8AM–7PM</span>
            <span><i class="ti ti-users"></i> Comunidad EDAV</span>
          </div>
        </div>
        <!-- <div class="hero-right">
          <div class="hero-img-wrap">
            <img src="/images/computo.jpg" alt="Centro de Cómputo EDAV" class="hero-img" />
            <div class="hero-img-badge">
              <i class="ti ti-device-desktop"></i>
              <span>Lab. Cómputo</span>
            </div>
          </div>
        </div> -->
      </div>
    </section>

    <!-- STATS — azul -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-icon"><i :class="`ti ${stat.icon}`"></i></div>
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
          <div class="objetivo-icon"><i class="ti ti-target"></i></div>
          <div>
            <div class="s-tag">Misión del área</div>
            <h2 class="s-title">Objetivo</h2>
            <p>Lograr un eficiente y correcto uso del equipo de cómputo asignado en este centro, por parte de sus
              usuarios; de tal manera, que se coadyuve en el logro de las metas académicas de la EDAV y la
              Administración de la UAS.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- USUARIOS — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Acceso al laboratorio</div>
        <h2 class="s-title">¿Quiénes pueden usar el Centro?</h2>
        <div class="usuarios-grid">
          <div v-for="(u, i) in usuarios" :key="u.title" class="usuario-card">
            <div class="usuario-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="usuario-icon"><i :class="`ti ${u.icon}`"></i></div>
            <h3>{{ u.title }}</h3>
            <p>{{ u.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NORMAS DE USO — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Reglamento</div>
        <h2 class="s-title">Normas de Uso del Equipo</h2>
        <div class="normas-grid">
          <div v-for="norma in normas" :key="norma.title" class="norma-card">
            <div class="norma-header">
              <div class="norma-icon"><i :class="`ti ${norma.icon}`"></i></div>
              <h3>{{ norma.title }}</h3>
            </div>
            <ul class="norma-list">
              <li v-for="item in norma.items" :key="item">
                <i class="ti ti-check"></i>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- PROHIBICIONES — azul -->
    <section class="section bg-dark">
      <div class="container">
        <div class="s-tag light">Reglamento</div>
        <h2 class="s-title light">Prohibiciones en el Centro</h2>
        <p class="prohib-intro">Durante el trabajo en el centro de cómputo, <strong>NO SE PERMITE:</strong></p>
        <div class="prohib-grid">
          <div v-for="p in prohibiciones" :key="p.text" class="prohib-card">
            <div class="prohib-emoji">{{ p.emoji }}</div>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HORARIOS Y LÍMITES — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Servicio</div>
        <h2 class="s-title">Horarios y Límites de Uso</h2>
        <div class="horarios-layout">
          <div class="horario-card">
            <div class="horario-icon"><i class="ti ti-clock"></i></div>
            <h3>Horarios de Servicio</h3>
            <div class="horario-slots">
              <div class="h-slot">
                <span class="h-slot-label">Usuarios individuales</span>
                <span class="h-slot-time">Lun–Vie · 8:00 AM – 7:00 PM</span>
              </div>
              <div class="h-slot">
                <span class="h-slot-label">Grupos con Maestro</span>
                <span class="h-slot-time">Lun–Vie · 8:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>

          <div class="limites-card">
            <h3><i class="ti ti-chart-bar"></i> Límites de Uso</h3>
            <div class="limites-nums">
              <div v-for="lim in limites" :key="lim.label" class="limite-item">
                <div class="limite-n">{{ lim.number }}</div>
                <div class="limite-l">{{ lim.label }}</div>
              </div>
            </div>
            <div class="advertencia">
              <i class="ti ti-alert-circle"></i>
              <p>El centro no se hace responsable de la información almacenada en los equipos de cómputo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SANCIONES — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">Consecuencias</div>
        <h2 class="s-title">Sanciones por Incumplimiento</h2>
        <p class="sanciones-intro">Todo usuario que no respete las disposiciones será sancionado según la gravedad de la
          falta.</p>
        <div class="sanciones-grid">
          <div v-for="s in sanciones" :key="s.nivel" class="sancion-card" :style="`border-left-color: ${s.color}`">
            <div class="sancion-nivel" :style="`background: ${s.color}`">Nivel {{ s.nivel }}</div>
            <h3>{{ s.titulo }}</h3>
            <p class="sancion-aplica">Aplica por:</p>
            <ul>
              <li v-for="item in s.items" :key="item"><i class="ti ti-point"></i> {{ item }}</li>
            </ul>
            <div v-if="s.nota" class="sancion-nota">
              <i class="ti ti-alert-triangle"></i> {{ s.nota }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MENSAJE FINAL — gris con borde amarillo -->
    <section class="section bg-gray cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-device-desktop deco-icon"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">Mensaje importante</div>
            <h2 class="s-title">Un espacio pensado para ti</h2>
            <p>Observa y cumple todo el reglamento. Es con el fin de que tú mismo te beneficies, ayudando a que estas
              instalaciones pensadas para apoyar el desempeño académico de estudiantes y maestros brinden un servicio
              continuo y eficaz.</p>
            <!-- <div class="cta-btns">
              <RouterLink to="/departamentos/biblioteca" class="btn-primary">
                Ver Biblioteca <i class="ti ti-arrow-right"></i>
              </RouterLink>
              <RouterLink to="/facultad/infraestructura" class="btn-outline">
                Ver Infraestructura
              </RouterLink>
            </div> -->
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const stats = [
  { icon: 'ti-device-desktop', number: '200+', label: 'Computadoras' },
  { icon: 'ti-clock', number: '11h', label: 'Servicio diario' },
  { icon: 'ti-users', number: '6', label: 'Tipos de usuarios' },
  { icon: 'ti-shield-check', number: '4', label: 'Niveles de sanción' },
]

const usuarios = [
  { icon: 'ti-school', title: 'Estudiantes UAAP', desc: 'Con materias relacionadas al uso de computadoras como apoyo didáctico o de práctica.' },
  { icon: 'ti-id-badge', title: 'Estudiantes Inscritos', desc: 'En cualquier carrera y grado de la EDAV que hayan aprobado el examen de admisión.' },
  { icon: 'ti-chalkboard', title: 'Profesores e Investigadores', desc: 'De la EDAV para apoyo didáctico o desarrollo de investigaciones académicas.' },
  { icon: 'ti-briefcase', title: 'Personal Administrativo', desc: 'En cursos de capacitación o actualización relacionados con la computación.' },
  { icon: 'ti-building', title: 'Usuarios UAS Externos', desc: 'Profesores y estudiantes de otras escuelas de la UAS con autorización previa y justificación.' },
  { icon: 'ti-users', title: 'Trabajadores UAS', desc: 'De otras escuelas participando en cursos de capacitación con autorización previa.' },
]

const normas = [
  {
    icon: 'ti-id-badge',
    title: 'Requisitos para Estudiantes',
    items: [
      'Presentar credencial o gafete expedido por la EDAV para identificarse plenamente.',
      'Si hay computadoras disponibles, la asignación será inmediata. De lo contrario, esperar turno fuera del centro.',
    ],
  },
  {
    icon: 'ti-chalkboard',
    title: 'Requisitos para Profesores y Personal',
    items: [
      'Solicitar el servicio verbalmente a la coordinación con mínimo una hora de anticipación.',
      'Asignación inmediata si hay equipos disponibles, o esperar turno si están ocupados.',
    ],
  },
  {
    icon: 'ti-clipboard-check',
    title: 'Al Finalizar el Uso',
    items: [
      'Llenar registro con nombre y firma, anotando la clave del software utilizado.',
    ],
  },
]

const prohibiciones = [
  { emoji: '🎮', text: 'Usar el equipo para fines no académicos (juegos, lucro personal, etc.)' },
  { emoji: '🍔', text: 'Introducir y/o consumir alimentos de cualquier tipo' },
  { emoji: '🚬', text: 'Fumar dentro del local' },
  { emoji: '🔨', text: 'Golpear o maltratar el equipo o cualquiera de sus componentes' },
  { emoji: '🤬', text: 'Pronunciar palabras obscenas o dirigirlas a otro usuario' },
  { emoji: '🐕', text: 'Llevar consigo ningún tipo de animal' },
  { emoji: '🦠', text: 'Introducir intencionalmente USB con virus informático' },
  { emoji: '⚠️', text: 'Causar daño intencional al software instalado' },
  { emoji: '🚪', text: 'Introducirse al local sin un propósito de trabajo específico' },
  { emoji: '🗑️', text: 'Tirar basura dentro del local' },
  { emoji: '😡', text: 'Faltar al respeto al personal que labora en el centro' },
  { emoji: '🔒', text: 'Sustraer partes o equipos de cómputo' },
  { emoji: '💾', text: 'Instalar programas no permitidos por el centro' },
  { emoji: '🔞', text: 'Acceder a páginas de contenido inapropiado' },
  { emoji: '🔊', text: 'Reproducir archivos de audio sin audífonos' },
]

const limites = [
  { number: '2h', label: 'Máximo por sesión/día' },
  { number: '1', label: 'Uso por día' },
  { number: '3', label: 'Veces por semana' },
  { number: '1', label: 'Usuario por computadora' },
]

const sanciones = [
  {
    nivel: 1, color: '#22c55e', titulo: 'Llamada de Atención',
    items: ['Uso no académico', 'Introducir alimentos', 'Fumar en el local', 'Llevar animales', 'Acceso sin propósito', 'Tirar basura', 'Audio sin audífonos'],
    nota: null,
  },
  {
    nivel: 2, color: '#f97316', titulo: 'Suspensión de 1 Semana',
    items: ['Maltrato al equipo', 'Palabras obscenas', 'Virus informáticos', 'Daño al software', 'Contenido inapropiado'],
    nota: null,
  },
  {
    nivel: 3, color: '#ef4444', titulo: 'Suspensión de 1 Mes',
    items: ['Faltar al respeto al personal'],
    nota: 'Se reportará mediante oficio a la dirección de la escuela para determinar la acción pertinente.',
  },
  {
    nivel: 4, color: '#7f1d1d', titulo: 'Suspensión Definitiva',
    items: ['Sustraer partes o equipos de cómputo'],
    nota: 'Esta sanción es permanente e irreversible.',
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.computo-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ─────────────────────────────────────────── */
.hero-computo {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}

.hero-computo::before {
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(15, 26, 140, 0.06);
}

.hero-computo::after {
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
  margin-bottom: 16px;
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

.hero-computo h1 {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  color: #0f1a8c;
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: 16px;
}

.hero-computo h1 span {
  opacity: 0.7;
}

.hero-computo p {
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
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
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

/* ─── OBJETIVO ─────────────────────────────────────── */
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
  font-size: 36px;
  color: #0f1a8c;
  flex-shrink: 0;
  margin-top: 4px;
}

.objetivo-box .s-tag {
  margin-bottom: 4px;
}

.objetivo-box .s-title {
  margin-bottom: 12px;
}

.objetivo-box p {
  color: #555;
  font-size: 15px;
  line-height: 1.8;
}

/* ─── USUARIOS ─────────────────────────────────────── */
.usuarios-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.usuario-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border-top: 3px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.usuario-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(15, 26, 140, 0.1);
}

.usuario-num {
  font-size: 40px;
  font-weight: 800;
  color: rgba(15, 26, 140, 0.06);
  line-height: 1;
  margin-bottom: 4px;
  letter-spacing: -2px;
}

.usuario-icon {
  font-size: 26px;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.usuario-card h3 {
  color: #0f1a8c;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
}

.usuario-card p {
  color: #555;
  font-size: 13px;
  line-height: 1.7;
}

/* ─── NORMAS ───────────────────────────────────────── */
.normas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.norma-card {
  background: #f4f5f9;
  border-radius: 14px;
  padding: 24px;
  border-top: 3px solid #0f1a8c;
  transition: transform 0.2s, box-shadow 0.2s;
}

.norma-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.norma-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.norma-icon {
  font-size: 24px;
  color: #0f1a8c;
  flex-shrink: 0;
}

.norma-header h3 {
  color: #0f1a8c;
  font-size: 15px;
  font-weight: 700;
}

.norma-list {
  list-style: none;
  padding: 0;
}

.norma-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: #555;
  padding: 6px 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  line-height: 1.5;
}

.norma-list li:last-child {
  border-bottom: none;
}

.norma-list li i {
  color: #0f1a8c;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ─── PROHIBICIONES ────────────────────────────────── */
.prohib-intro {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  margin-bottom: 28px;
  margin-top: -16px;
}

.prohib-intro strong {
  color: #ffd500;
}

.prohib-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.prohib-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  transition: background 0.2s;
}

.prohib-card:hover {
  background: rgba(255, 255, 255, 0.14);
}

.prohib-emoji {
  font-size: 24px;
  margin-bottom: 8px;
}

.prohib-card p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  line-height: 1.5;
}

/* ─── HORARIOS ─────────────────────────────────────── */
.horarios-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.horario-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  border-top: 3px solid #0f1a8c;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.horario-icon {
  font-size: 32px;
  color: #0f1a8c;
  margin-bottom: 12px;
}

.horario-card h3 {
  color: #0f1a8c;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}

.horario-slots {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.h-slot {
  background: #f4f5f9;
  border-radius: 10px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 3px solid #ffd500;
}

.h-slot-label {
  font-size: 13px;
  font-weight: 600;
  color: #0f1a8c;
}

.h-slot-time {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a2e;
}

.limites-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  border-top: 3px solid #ffd500;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.limites-card h3 {
  color: #0f1a8c;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.limites-nums {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.limite-item {
  background: #f4f5f9;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  border-top: 2px solid #0f1a8c;
}

.limite-n {
  font-size: 28px;
  font-weight: 800;
  color: #ffd500;
  line-height: 1;
  margin-bottom: 4px;
}

.limite-l {
  font-size: 11px;
  color: #666;
  line-height: 1.4;
}

.advertencia {
  background: #fffbe6;
  border-left: 3px solid #ffd500;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.advertencia i {
  color: #f59e0b;
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.advertencia p {
  font-size: 13px;
  color: #555;
  line-height: 1.5;
  margin: 0;
}

/* ─── SANCIONES ────────────────────────────────────── */
.sanciones-intro {
  font-size: 14px;
  color: #666;
  margin-bottom: 32px;
  margin-top: -20px;
}

.sanciones-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.sancion-card {
  background: #f4f5f9;
  border-radius: 14px;
  padding: 24px;
  border-left: 4px solid;
  transition: transform 0.2s, box-shadow 0.2s;
}

.sancion-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.sancion-nivel {
  display: inline-block;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.sancion-card h3 {
  color: #1a1a2e;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
}

.sancion-aplica {
  font-size: 12px;
  font-weight: 600;
  color: #888;
  margin-bottom: 8px;
}

.sancion-card ul {
  list-style: none;
  padding: 0;
}

.sancion-card ul li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #555;
  padding: 4px 0;
}

.sancion-card ul li i {
  font-size: 10px;
  color: #0f1a8c;
  flex-shrink: 0;
}

.sancion-nota {
  margin-top: 14px;
  background: #fff3e0;
  border-left: 3px solid #f97316;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  display: flex;
  gap: 6px;
  align-items: flex-start;
}

.sancion-nota i {
  color: #f97316;
  flex-shrink: 0;
  margin-top: 1px;
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
@media (max-width: 1100px) {
  .prohib-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sanciones-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-computo {
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
    padding: 56px 24px;
  }

  .usuarios-grid {
    grid-template-columns: 1fr 1fr;
  }

  .normas-grid {
    grid-template-columns: 1fr;
  }

  .prohib-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .horarios-layout {
    grid-template-columns: 1fr;
  }

  .sanciones-grid {
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
  .hero-computo {
    padding: 40px 16px;
  }

  .stats-section {
    padding: 24px 16px;
  }

  .section {
    padding: 40px 16px;
  }

  .usuarios-grid {
    grid-template-columns: 1fr;
  }

  .prohib-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sanciones-grid {
    grid-template-columns: 1fr;
  }

  .objetivo-box {
    flex-direction: column;
    gap: 16px;
  }

  .limites-nums {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>