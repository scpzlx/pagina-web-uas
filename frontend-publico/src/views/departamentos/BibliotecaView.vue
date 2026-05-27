<template>
  <div class="biblioteca-page">

    <!-- HERO — amarillo -->
    <section class="hero-biblioteca">
      <div class="hero-inner">
        <div class="hero-breadcrumb">
          <RouterLink to="/">Inicio</RouterLink>
          <i class="ti ti-chevron-right"></i>
          <span>Departamentos</span>
          <i class="ti ti-chevron-right"></i>
          <span>Biblioteca</span>
        </div>
        <div class="hero-area-tag">
          <i class="ti ti-books"></i> Servicios Bibliotecarios
        </div>
        <h1>Biblioteca</h1>
        <p class="hero-desc">
          Espacio de conocimiento y consulta al servicio de la comunidad universitaria
          de la Escuela de Diseño y Artes Visuales de la UAS.
        </p>
        <div class="hero-badges">
          <span><i class="ti ti-clock"></i> Lun–Vie 8:00–15:00</span>
          <span><i class="ti ti-map-pin"></i> Campus UAS Culiacán</span>
          <span><i class="ti ti-id-badge"></i> Primera credencial GRATIS</span>
        </div>
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

    <!-- SERVICIOS — blanco -->
    <section class="section bg-white">
      <div class="container">
        <div class="s-tag">¿Qué ofrecemos?</div>
        <h2 class="s-title">Nuestros Servicios</h2>
        <div class="servicios-grid">
          <div
            v-for="srv in servicios"
            :key="srv.title"
            class="srv-card"
            :class="{ destacado: srv.destacado }"
          >
            <div class="srv-icon"><i :class="`ti ${srv.icon}`"></i></div>
            <h3>{{ srv.title }}</h3>
            <p>{{ srv.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRÉSTAMO EXTERNO — gris -->
    <section class="section bg-gray">
      <div class="container">
        <div class="s-tag">Circulación de materiales</div>
        <h2 class="s-title">Préstamo Externo</h2>
        <p class="prestamo-intro">Exclusivo para usuarios internos con credencial vigente</p>
        <div class="prestamo-grid">
          <div v-for="p in prestamos" :key="p.title" class="prestamo-card">
            <div class="prestamo-icon"><i :class="`ti ${p.icon}`"></i></div>
            <div class="prestamo-num">{{ p.num }}</div>
            <div class="prestamo-unit">{{ p.unit }}</div>
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
          </div>
        </div>
        <div class="prestamo-note">
          <i class="ti ti-info-circle"></i>
          <span>Si ya se prestó un ejemplar de un libro que tiene varios, los restantes se prestarán como ejemplar único.</span>
        </div>
      </div>
    </section>

    <!-- REGLAMENTO — azul con tabs -->
    <section class="section bg-dark">
      <div class="container">
        <div class="s-tag light">Normativa interna</div>
        <h2 class="s-title light">Reglamento de Biblioteca</h2>

        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-btn"
            :class="{ active: tabActivo === tab.id }"
            @click="tabActivo = tab.id"
          >
            <i :class="`ti ${tab.icon}`"></i>
            {{ tab.label }}
          </button>
        </div>

        <div class="tab-content">
          <transition name="fade" mode="out-in">
            <div :key="tabActivo" class="reg-grid">
              <div
                v-for="item in reglamento[tabActivo]"
                :key="item.title"
                class="reg-card"
              >
                <h4><i :class="`ti ${item.icon}`"></i> {{ item.title }}</h4>
                <ul>
                  <li v-for="li in item.items" :key="li">{{ li }}</li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- CREDENCIAL — gris con borde amarillo -->
    <section class="section bg-gray cta-section">
      <div class="container">
        <div class="cta-inner">
          <div class="cta-deco">
            <div class="deco-circle c1"></div>
            <div class="deco-circle c2"></div>
            <i class="ti ti-id-badge deco-icon"></i>
          </div>
          <div class="cta-text">
            <div class="s-tag">Credencial de servicios</div>
            <h2 class="s-title">Credencial de Servicios Bibliotecarios</h2>
            <p class="credencial-sub">Única e intransferible — Primera expedición <strong>GRATUITA</strong></p>

            <div class="requisitos-box">
              <div class="req-header">
                <i class="ti ti-list-check"></i>
                <span>Requisitos para Reposición</span>
              </div>
              <ul class="req-list">
                <li v-for="r in requisitos" :key="r">
                  <i class="ti ti-check"></i> {{ r }}
                </li>
              </ul>
              <div class="costo-badge">
                <i class="ti ti-receipt"></i>
                Costo de Reposición: <strong>$50.00</strong>
              </div>
              <p class="req-nota">
                * Trámite disponible en días hábiles según calendario escolar. Renovación anual obligatoria.
              </p>
            </div>

            <div class="cta-btns">
              <RouterLink to="/departamentos/control-escolar" class="btn-outline">
                Ver Control Escolar
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const tabActivo = ref('derechos')

const stats = [
  { icon: 'ti-book', number: '+2,000', label: 'Títulos disponibles' },
  { icon: 'ti-users', number: '4', label: 'Servicios principales' },
  { icon: 'ti-clock', number: '35h', label: 'Atención semanal' },
  { icon: 'ti-coin', number: 'GRATIS', label: 'Primera credencial' },
]

const servicios = [
  {
    icon: 'ti-archive',
    title: 'Estantería Abierta',
    desc: 'Acceso directo a materiales documentales en diferentes clasificaciones. Toma los recursos que necesites o solicítalos al personal.',
    destacado: false,
  },
  {
    icon: 'ti-book-2',
    title: 'Área de Consulta',
    desc: 'Espacio cómodo y tranquilo para estudiar y consultar materiales bibliográficos especializados.',
    destacado: true,
  },
  {
    icon: 'ti-bookmark',
    title: 'Préstamo Externo',
    desc: 'Para usuarios internos con credencial vigente. Hasta 2 ejemplares simultáneos según disponibilidad.',
    destacado: false,
  },
  {
    icon: 'ti-id-badge',
    title: 'Credencial de Usuario',
    desc: 'Credencial única e intransferible para acceder a todos los servicios bibliotecarios del sistema.',
    destacado: false,
  },
]

const prestamos = [
  {
    icon: 'ti-books',
    num: '7',
    unit: 'días',
    title: 'Varios Ejemplares',
    desc: 'Cuando el libro tiene más de un ejemplar disponible en acervo.',
  },
  {
    icon: 'ti-book',
    num: '2',
    unit: 'días',
    title: 'Ejemplar Único',
    desc: 'Cuando solo existe un ejemplar del título en la colección.',
  },
  {
    icon: 'ti-stack-2',
    num: '2',
    unit: 'libros',
    title: 'Máximo por Persona',
    desc: 'Límite de materiales simultáneos por usuario con credencial vigente.',
  },
]

const tabs = [
  { id: 'derechos',     label: 'Derechos',     icon: 'ti-shield-check' },
  { id: 'obligaciones', label: 'Obligaciones',  icon: 'ti-clipboard-list' },
  { id: 'sanciones',    label: 'Sanciones',     icon: 'ti-alert-triangle' },
]

const reglamento: Record<string, { title: string; icon: string; items: string[] }[]> = {
  derechos: [
    {
      title: 'Uso de Material',
      icon: 'ti-book',
      items: [
        'Acceso a material documental en todas sus clasificaciones',
        'Toma directa de estantería abierta',
        'Asistencia del personal disponible',
      ],
    },
    {
      title: 'Fotocopiado',
      icon: 'ti-copy',
      items: [
        'Disponible para todos los usuarios',
        'Excepto tesis y colección antigua',
        'Costo por servicio',
      ],
    },
  ],
  obligaciones: [
    {
      title: 'Casilleros',
      icon: 'ti-lock',
      items: [
        'Depositar pertenencias durante la estancia',
        'Uso obligatorio para todos los usuarios',
      ],
    },
    {
      title: 'Registro',
      icon: 'ti-clipboard',
      items: [
        'Todo usuario debe registrarse en el Control de Usuarios',
        'Sin excepciones',
      ],
    },
    {
      title: 'Conducta Respetuosa',
      icon: 'ti-heart-handshake',
      items: [
        'Conservar el material proporcionado',
        'Prohibido introducir alimentos y bebidas',
        'No fumar en las instalaciones',
        'Silenciar equipos electrónicos',
        'Mantener silencio en las áreas de servicio',
      ],
    },
  ],
  sanciones: [
    {
      title: 'Daños al Material',
      icon: 'ti-alert-circle',
      items: [
        'Pago del importe de reposición',
        'Costo determinado por el responsable',
      ],
    },
    {
      title: 'Mutilación o Pérdida',
      icon: 'ti-file-x',
      items: [
        'Reposición con obra idéntica en máximo 1 semana',
        'Si no es posible: 2 libros nuevos de la misma materia',
        'Suspensión de derechos hasta reposición',
      ],
    },
    {
      title: 'Retraso en Devolución',
      icon: 'ti-clock-x',
      items: [
        '$5.00 diarios por cada libro',
        'Suspensión hasta cubrir multa o devolver material',
        'Retención de credencial por adeudos',
      ],
    },
  ],
}

const requisitos = [
  'Llenar solicitud de registro',
  'Entregar fotografía tamaño infantil',
  'Presentar credencial vigente o recibo de inscripción',
  'Personal universitario: credencial y/o último talón de cheque',
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');


.biblioteca-page {
  font-family: 'Outfit', sans-serif;
  background: #f4f5f9;
}

/* ─── HERO ───────────────────────────────────────────── */
.hero-biblioteca {
  background: #ffd500;
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}
.hero-biblioteca::before {
  content: ''; position: absolute;
  right: -60px; top: -60px;
  width: 300px; height: 300px;
  border-radius: 50%; background: rgba(15,26,140,0.06);
}
.hero-biblioteca::after {
  content: ''; position: absolute;
  right: 80px; bottom: -40px;
  width: 180px; height: 180px;
  border-radius: 50%; background: rgba(15,26,140,0.04);
}

.hero-inner {
  position: relative; z-index: 1;
  max-width: 1100px; margin: 0 auto;
}

.hero-breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: rgba(15,26,140,0.6); margin-bottom: 16px;
}
.hero-breadcrumb a { color: rgba(15,26,140,0.6); text-decoration: none; }
.hero-breadcrumb a:hover { color: #0f1a8c; }
.hero-breadcrumb i { font-size: 12px; }

.hero-area-tag {
  font-size: 11px; font-weight: 700; color: #0f1a8c;
  background: rgba(15,26,140,0.1); padding: 4px 12px;
  border-radius: 20px; display: inline-flex; align-items: center;
  gap: 6px; margin-bottom: 14px; letter-spacing: 0.3px;
}

.hero-biblioteca h1 {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800; color: #0f1a8c;
  line-height: 1.05; letter-spacing: -2px; margin-bottom: 16px;
}

.hero-desc {
  font-size: 15px; color: rgba(15,26,140,0.75);
  line-height: 1.7; margin-bottom: 22px; max-width: 540px;
}

.hero-badges { display: flex; gap: 10px; flex-wrap: wrap; }
.hero-badges span {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(15,26,140,0.1); color: #0f1a8c;
  font-size: 12px; font-weight: 600;
  padding: 6px 14px; border-radius: 20px;
  border: 1px solid rgba(15,26,140,0.12);
}

/* ─── STATS ──────────────────────────────────────────── */
.stats-section { background: #0f1a8c; padding: 40px 48px; }
.container { max-width: 1100px; margin: 0 auto; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat-card {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px; padding: 20px 16px;
  text-align: center; transition: background 0.2s;
}
.stat-card:hover { background: rgba(255,255,255,0.14); }
.stat-icon { font-size: 24px; color: #ffd500; margin-bottom: 10px; }
.stat-number { font-size: 22px; font-weight: 800; color: white; margin-bottom: 6px; }
.stat-label { font-size: 12px; color: rgba(255,255,255,0.65); }

/* ─── LAYOUT ─────────────────────────────────────────── */
.section { padding: 72px 48px; }
.bg-white { background: white; }
.bg-gray  { background: #f4f5f9; }
.bg-dark  { background: #0f1a8c; }

.s-tag {
  font-size: 11px; font-weight: 700; color: #0f1a8c;
  text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;
}
.s-tag.light { color: #ffd500; }

.s-title {
  font-size: clamp(22px, 3vw, 32px); font-weight: 800;
  color: #1a1a2e; letter-spacing: -0.5px; margin-bottom: 40px;
}
.s-title.light { color: white; }

/* ─── SERVICIOS ──────────────────────────────────────── */
.servicios-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
}
.srv-card {
  background: #f4f5f9; border-radius: 16px; padding: 28px 22px;
  border-top: 3px solid transparent;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
}
.srv-card:not(.destacado) { border-top-color: #ffd500; }
.srv-card.destacado {
  background: #ffd500; border-top-color: #0f1a8c;
}
.srv-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(15,26,140,0.12); }
.srv-icon { font-size: 30px; color: #0f1a8c; margin-bottom: 14px; }
.srv-card.destacado .srv-icon { color: #0f1a8c; }
.srv-card h3 { font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
.srv-card p  { font-size: 13px; color: #666; line-height: 1.7; }
.srv-card.destacado p { color: #0f1a8c; opacity: 0.8; }

/* ─── PRÉSTAMO ───────────────────────────────────────── */
.prestamo-intro {
  font-size: 15px; color: #666; text-align: center;
  margin-top: -24px; margin-bottom: 36px;
}
.prestamo-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  margin-bottom: 24px;
}
.prestamo-card {
  background: white; border-radius: 16px; padding: 32px 24px;
  text-align: center; border-bottom: 3px solid #ffd500;
  transition: transform 0.2s, box-shadow 0.2s;
}
.prestamo-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(15,26,140,0.1); }
.prestamo-icon { font-size: 28px; color: #0f1a8c; margin-bottom: 12px; }
.prestamo-num  { font-size: 52px; font-weight: 800; color: #0f1a8c; line-height: 1; }
.prestamo-unit { font-size: 13px; font-weight: 600; color: #ffd500; text-transform: uppercase;
                  letter-spacing: 1px; margin-bottom: 10px; }
.prestamo-card h3 { font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
.prestamo-card p  { font-size: 13px; color: #777; line-height: 1.6; }

.prestamo-note {
  display: flex; align-items: flex-start; gap: 10px;
  background: white; border-left: 4px solid #ffd500;
  border-radius: 10px; padding: 16px 20px;
  font-size: 13px; color: #555;
}
.prestamo-note i { color: #0f1a8c; font-size: 16px; flex-shrink: 0; margin-top: 1px; }

/* ─── TABS REGLAMENTO ────────────────────────────────── */
.tabs {
  display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px;
}
.tab-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; border-radius: 24px; border: 1.5px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7);
  font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
}
.tab-btn i { font-size: 16px; }
.tab-btn:hover { background: rgba(255,255,255,0.14); color: white; }
.tab-btn.active {
  background: #ffd500; color: #0f1a8c;
  border-color: #ffd500;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.fade-enter-from { opacity: 0; transform: translateY(8px); }
.fade-leave-to   { opacity: 0; transform: translateY(-8px); }

.reg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.reg-card {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 14px; padding: 24px;
  border-left: 4px solid #ffd500;
}
.reg-card h4 {
  display: flex; align-items: center; gap: 8px;
  color: white; font-size: 15px; font-weight: 700; margin-bottom: 14px;
}
.reg-card h4 i { color: #ffd500; font-size: 16px; }
.reg-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.reg-card li {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 13px; color: rgba(255,255,255,0.8); line-height: 1.5;
  padding-left: 0;
}
.reg-card li::before {
  content: '→'; color: #ffd500; font-weight: 700; flex-shrink: 0;
}

/* ─── CREDENCIAL / CTA ───────────────────────────────── */
.cta-section { border-top: 3px solid #ffd500; }
.cta-inner {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 64px; align-items: start;
}
.cta-deco {
  position: relative; height: 200px;
  display: flex; align-items: center; justify-content: center;
}
.deco-circle { position: absolute; border-radius: 50%; }
.c1 { width: 180px; height: 180px; background: #ffd500; opacity: 0.15; }
.c2 { width: 120px; height: 120px; background: #0f1a8c; opacity: 0.08; }
.deco-icon { font-size: 56px; color: #0f1a8c; opacity: 0.2; z-index: 1; }

.credencial-sub {
  font-size: 15px; color: #555; margin-top: -28px; margin-bottom: 28px;
}

.requisitos-box {
  background: white; border-radius: 14px; padding: 28px;
  border: 1px solid rgba(0,0,0,0.07); margin-bottom: 28px;
}
.req-header {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 700; color: #0f1a8c;
  margin-bottom: 16px;
}
.req-header i { font-size: 18px; }
.req-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 10px; }
.req-list li {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 14px; color: #444; line-height: 1.5;
}
.req-list li i { color: #0f1a8c; flex-shrink: 0; margin-top: 2px; }

.costo-badge {
  display: flex; align-items: center; gap: 8px;
  background: #ffd500; color: #0f1a8c;
  font-size: 14px; font-weight: 700;
  padding: 12px 18px; border-radius: 10px;
  margin-bottom: 12px;
}
.costo-badge i { font-size: 18px; }

.req-nota { font-size: 12px; color: #888; font-style: italic; margin: 0; }

.cta-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: #0f1a8c;
  font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
  padding: 12px 24px; border-radius: 10px;
  border: 1.5px solid #0f1a8c; text-decoration: none; transition: all 0.2s;
}
.btn-outline:hover { background: #0f1a8c; color: white; }

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 1100px) {
  .servicios-grid { grid-template-columns: repeat(2, 1fr); }
  .reg-grid       { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 900px) {
  .hero-biblioteca { padding: 48px 24px; }
  .stats-section   { padding: 32px 24px; }
  .stats-grid      { grid-template-columns: repeat(2, 1fr); }
  .section         { padding: 56px 24px; }
  .prestamo-grid   { grid-template-columns: 1fr; }
  .reg-grid        { grid-template-columns: 1fr; }
  .cta-inner       { grid-template-columns: 1fr; gap: 32px; }
  .cta-deco        { height: 120px; }
}

@media (max-width: 600px) {
  .hero-biblioteca { padding: 40px 16px; }
  .stats-section   { padding: 24px 16px; }
  .section         { padding: 40px 16px; }
  .servicios-grid  { grid-template-columns: 1fr; }
  .tabs            { gap: 8px; }
  .tab-btn         { padding: 8px 16px; font-size: 13px; }
}
</style>