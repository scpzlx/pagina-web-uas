<template>
    <div class="carrera-page">

        <!-- HERO — amarillo -->
        <section class="hero-carrera">
            <div class="hero-inner">
                <div class="hero-left">
                    <div class="hero-breadcrumb">
                        <RouterLink to="/">Inicio</RouterLink>
                        <i class="ti ti-chevron-right"></i>
                        <span>Carreras</span>
                        <i class="ti ti-chevron-right"></i>
                        <span>Educación Artística</span>
                    </div>
                    <div class="hero-area-tag">Área 3 · Ciencias de la Educación y Humanidades</div>
                    <h1>Licenciatura en <br><span>Educación Artística</span></h1>
                    <div class="hero-badges">
                        <span><i class="ti ti-map-pin"></i> Culiacán | Mazatlán, Sinaloa</span>
                        <span><i class="ti ti-school"></i> Modalidad Presencial / Mixta</span>
                        <span><i class="ti ti-calendar"></i> 8 Semestres</span>
                    </div>
                </div>
                <div class="hero-right">
                    <div class="hero-img-wrap">
                        <img src="/images/educacion_artistica.jpg" alt="Licenciatura en Educación Artística" class="hero-img" />
                        <div class="hero-img-badge">
                            <i class="ti ti-books"></i>
                            <span>Educación Artística</span>
                        </div>
                    </div>
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

        <!-- PESTAÑAS: Perfil / Campo / Video — blanco -->
        <section class="section bg-white">
            <div class="container">

                <div class="tabs-bar">
                    <button v-for="tab in tabs" :key="tab.id" class="tab-btn"
                        :class="{ active: tabActiva === tab.id }" @click="tabActiva = tab.id">
                        <i :class="`ti ${tab.icon}`"></i>
                        {{ tab.label }}
                    </button>
                </div>

                <div class="tab-content">

                    <!-- Perfil de Egreso -->
                    <div v-if="tabActiva === 'perfil'" class="tab-panel">
                        <div class="perfil-box">
                            <div class="perfil-icon"><i class="ti ti-user-check"></i></div>
                            <div class="perfil-texto">
                                <div class="s-tag">Formación profesional</div>
                                <h2 class="s-title">Perfil de Egreso</h2>
                                <p>El egresado de la Licenciatura en Educación Artística es un profesional con sólidos conocimientos teóricos y prácticos en música, danza, artes visuales y teatro, capaz de combinar creatividad, pedagogía y pensamiento crítico para interpretar, enseñar y producir experiencias artísticas significativas. Su formación fomenta comunicación efectiva, trabajo colaborativo, sensibilidad cultural y uso responsable de tecnologías para el aprendizaje y la expresión artística.</p>
                                <p style="margin-top:12px">Este profesional destaca por su ética, creatividad, compromiso social y capacidad de adaptación, lo que le permite responder con iniciativa a retos reales, promover la inclusión y la convivencia, y fortalecer procesos de aprendizaje que enriquezcan la vida cultural y educativa de su entorno.</p>
                            </div>
                            <div class="perfil-qr">
                                <div class="qr-label">Más Información</div>
                                <img src="/images/qr_educacion_artistica.png" alt="QR Educación Artística" class="qr-img" />
                                <p>Escanea el código QR para más detalles</p>
                            </div>
                        </div>
                    </div>

                    <!-- Campo Profesional -->
                    <div v-if="tabActiva === 'campo'" class="tab-panel">
                        <div class="campo-layout">
                            <div class="campo-intro">
                                <div class="s-tag">Dónde trabaja el egresado</div>
                                <h2 class="s-title">Campo Profesional</h2>
                                <p class="campo-desc">Está preparado para diseñar, implementar y evaluar proyectos educativos y culturales, así como para desempeñarse como docente, gestor artístico-cultural y promotor de iniciativas que integren arte, educación y comunidad en instituciones públicas y privadas. Gracias a su visión integral, puede contribuir al desarrollo de la educación artística en escuelas, centros culturales, talleres y espacios comunitarios en Sinaloa y a nivel nacional.</p>
                            </div>
                            <div class="campo-grid">
                                <div v-for="campo in camposProfesionales" :key="campo.titulo" class="campo-card">
                                    <div class="campo-icon"><i :class="`ti ${campo.icon}`"></i></div>
                                    <h3>{{ campo.titulo }}</h3>
                                    <p>{{ campo.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Video -->
                    <div v-if="tabActiva === 'video'" class="tab-panel">
                        <div class="video-layout">
                            <div class="s-tag">Conoce la carrera</div>
                            <h2 class="s-title">Video de la Carrera</h2>
                            <div class="video-wrap">
                                <iframe src="https://www.youtube.com/embed/PgteNk4CoWE" frameborder="0" allowfullscreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    class="video-iframe"></iframe>
                            </div>
                            <p class="video-caption">Conoce más sobre la Licenciatura en Educación Artística de la EDAV · UAS</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- PLAN DE ESTUDIOS — gris -->
        <section class="section bg-gray">
            <div class="container">
                <div class="s-tag">Malla curricular</div>
                <h2 class="s-title">Plan de Estudios</h2>
                <div class="semestres-grid">
                    <div v-for="sem in planEstudios" :key="sem.semestre" class="sem-card">
                        <div class="sem-header">
                            <span class="sem-num">{{ sem.semestre }}</span>
                            <h3>{{ sem.titulo }}</h3>
                        </div>
                        <div class="materias-list">
                            <div v-for="m in sem.materias" :key="m.nombre" class="materia-row">
                                <span class="materia-nombre">{{ m.nombre }}</span>
                                <span class="materia-creditos">{{ m.creditos }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="creditos-total">
                    <i class="ti ti-award"></i>
                    Total de créditos del plan de estudios: <strong>529</strong>
                </div>
            </div>
        </section>

        <!-- CERTIFICACIONES — azul -->
        <section class="section bg-dark">
            <div class="container">
                <div class="s-tag light">Formación integral</div>
                <h2 class="s-title light">Certificaciones y Requisitos</h2>
                <div class="certs-grid">
                    <div v-for="cert in certificaciones" :key="cert.title" class="cert-card">
                        <div class="cert-icon"><i :class="`ti ${cert.icon}`"></i></div>
                        <h3>{{ cert.title }}</h3>
                        <p>{{ cert.desc }}</p>
                        <ul v-if="cert.items">
                            <li v-for="item in cert.items" :key="item"><i class="ti ti-check"></i> {{ item }}</li>
                        </ul>
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
                        <i class="ti ti-books deco-icon"></i>
                    </div>
                    <div class="cta-text">
                        <div class="s-tag">Contacto · Culiacán</div>
                        <h2 class="s-title">Facultad de Artes (Escuela de Música)</h2>
                        <div class="contacto-info">
                            <div class="contacto-item">
                                <i class="ti ti-map-pin"></i>
                                <p>Constitución y Andrade s/n, Col. Almada. C.P. 80100. Culiacán, Sinaloa, México.</p>
                            </div>
                            <div class="contacto-item">
                                <i class="ti ti-phone"></i>
                                <a href="tel:6677124970">667 712 4970</a>
                            </div>
                        </div>

                        <div class="s-tag" style="margin-top: 24px">Contacto · Mazatlán</div>
                        <h2 class="s-title">Facultad de Artes, Extensión Mazatlán</h2>
                        <div class="contacto-info">
                            <div class="contacto-item">
                                <i class="ti ti-map-pin"></i>
                                <p>Centro Cultural Universitario, Antonio Rosales #401 Col. Centro. C.P. 82000. Mazatlán, Sinaloa, México.</p>
                            </div>
                            <div class="contacto-item">
                                <i class="ti ti-phone"></i>
                                <a href="tel:6692299922">669 229 9922</a>
                            </div>
                        </div>

                        <div class="cta-btns">
                            <RouterLink to="/carreras/musica-popular-contemporanea" class="btn-outline">
                                <i class="ti ti-arrow-left"></i> Ver Música Popular Contemporánea
                            </RouterLink>
                            <RouterLink to="/carreras/artes-escenicas" class="btn-primary">
                                Ver Artes Escénicas <i class="ti ti-arrow-right"></i>
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

type TabId = 'perfil' | 'campo' | 'video'
const tabActiva = ref<TabId>('perfil')

const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'perfil', label: 'Perfil de Egreso', icon: 'ti-user-check' },
    { id: 'campo', label: 'Campo Profesional', icon: 'ti-briefcase' },
    { id: 'video', label: 'Video de la Carrera', icon: 'ti-video' },
]

const stats = [
    { icon: 'ti-calendar', number: '8', label: 'Semestres' },
    { icon: 'ti-book', number: '529', label: 'Créditos totales' },
    { icon: 'ti-certificate', number: '3', label: 'Certificaciones' },
    { icon: 'ti-map-pin', number: 'Culiacán', label: '+ Mazatlán, Sinaloa' },
]

const camposProfesionales = [
    { icon: 'ti-school', titulo: 'Docencia Artística', desc: 'Enseñanza de artes en escuelas de nivel básico, medio y superior.' },
    { icon: 'ti-building-community', titulo: 'Gestión Cultural', desc: 'Coordinación de espacios, talleres y programas culturales en instituciones públicas y privadas.' },
    { icon: 'ti-palette', titulo: 'Producción Artística', desc: 'Creación e interpretación en música, danza, artes visuales y teatro.' },
    { icon: 'ti-users', titulo: 'Proyectos Comunitarios', desc: 'Diseño e implementación de iniciativas que integren arte, educación y comunidad.' },
    { icon: 'ti-chart-bar', titulo: 'Emprendimiento Cultural', desc: 'Desarrollo de proyectos artístico-culturales propios con visión de gestión y sustentabilidad.' },
    { icon: 'ti-accessible', titulo: 'Educación Inclusiva', desc: 'Promoción de la inclusión y la convivencia a través del arte en contextos diversos.' },
]

const planEstudios = [
    {
        semestre: '01', titulo: 'Primer Semestre',
        materias: [
            { nombre: 'Fundamentos para la apreciación visual', creditos: 10 },
            { nombre: 'Introducción al lenguaje y apreciación musical', creditos: 10 },
            { nombre: 'Expresión corporal y rondas infantiles', creditos: 10 },
            { nombre: 'Historia y teoría del teatro', creditos: 10 },
            { nombre: 'Historia del arte prehistórico y antiguo', creditos: 10 },
            { nombre: 'Comprensión y producción de textos en las artes', creditos: 12 },
        ],
    },
    {
        semestre: '02', titulo: 'Segundo Semestre',
        materias: [
            { nombre: 'Expresión bidimensional académica', creditos: 10 },
            { nombre: 'Lenguaje y estructuras musicales', creditos: 10 },
            { nombre: 'Ballet', creditos: 10 },
            { nombre: 'Entrenamiento actoral', creditos: 10 },
            { nombre: 'Historia del arte medieval y moderno', creditos: 10 },
            { nombre: 'Trabajo colaborativo en creación de proyectos artísticos', creditos: 12 },
        ],
    },
    {
        semestre: '03', titulo: 'Tercer Semestre',
        materias: [
            { nombre: 'Expresión tridimensional', creditos: 10 },
            { nombre: 'Conjuntos corales y dirección coral', creditos: 10 },
            { nombre: 'Danza jazz', creditos: 10 },
            { nombre: 'Actuación', creditos: 10 },
            { nombre: 'Historia del arte contemporáneo y actual', creditos: 10 },
            { nombre: 'Sistema educativo mexicano y educación del arte', creditos: 12 },
        ],
    },
    {
        semestre: '04', titulo: 'Cuarto Semestre',
        materias: [
            { nombre: 'Expresiones contemporáneas del arte visual', creditos: 10 },
            { nombre: 'Rondas infantiles y flauta dulce', creditos: 10 },
            { nombre: 'Danza contemporánea', creditos: 10 },
            { nombre: 'Lenguaje escénico', creditos: 10 },
            { nombre: 'Historia del arte en México', creditos: 10 },
            { nombre: 'Teorías del aprendizaje y la enseñanza de las artes', creditos: 12 },
        ],
    },
    {
        semestre: '05', titulo: 'Quinto Semestre',
        materias: [
            { nombre: 'Diseño y arte multimedia', creditos: 12 },
            { nombre: 'Ensambles corales', creditos: 12 },
            { nombre: 'Danzas rituales de México', creditos: 12 },
            { nombre: 'Dirección y puesta en escena', creditos: 12 },
            { nombre: 'Diseño curricular y educación artística', creditos: 12 },
            { nombre: 'Pedagogía y didáctica en el arte', creditos: 12 },
        ],
    },
    {
        semestre: '06', titulo: 'Sexto Semestre',
        materias: [
            { nombre: 'Laboratorio de expresión multidisciplinar', creditos: 12 },
            { nombre: 'Tecnologías aplicadas a la enseñanza de las artes', creditos: 11 },
            { nombre: 'Folclor cultura y tradición', creditos: 12 },
            { nombre: 'Educación inclusiva', creditos: 11 },
            { nombre: 'Elaboración de programas y planeación didáctica', creditos: 12 },
            { nombre: 'Metodología de investigación', creditos: 12 },
        ],
    },
    {
        semestre: '07', titulo: 'Séptimo Semestre',
        materias: [
            { nombre: 'Incorporación de proyectos artísticos y culturales', creditos: 12 },
            { nombre: 'Entornos virtuales de aprendizaje aplicados en la enseñanza de las artes', creditos: 12 },
            { nombre: 'Danza folclórica académica', creditos: 12 },
            { nombre: 'Práctica docente en nivel básico', creditos: 11 },
            { nombre: 'Desarrollo de proyecto de investigación', creditos: 11 },
            { nombre: 'Optativa: Música', creditos: 11 },
            { nombre: 'Optativa: Danza', creditos: 11 },
            { nombre: 'Optativa: Arte visuales', creditos: 11 },
            { nombre: 'Optativa I', creditos: 11 },
        ],
    },
    {
        semestre: '08', titulo: 'Octavo Semestre',
        materias: [
            { nombre: 'Realización de proyectos artísticos y culturales', creditos: 12 },
            { nombre: 'Emprendimiento en industrias culturales y gestión de proyectos', creditos: 12 },
            { nombre: 'Práctica docente profesional', creditos: 12 },
            { nombre: 'Informe de proyecto de investigación', creditos: 12 },
            { nombre: 'Optativa: Didáctica de la música', creditos: 11 },
            { nombre: 'Optativa: Didáctica de la danza', creditos: 11 },
            { nombre: 'Optativa: Didáctica de las artes visuales', creditos: 11 },
            { nombre: 'Optativa: Didáctica artística', creditos: 11 },
            { nombre: 'Optativa: Organización de actividades artísticas-culturales', creditos: 11 },
            { nombre: 'Optativa: Realización de proyectos culturales para la gestión', creditos: 11 },
            { nombre: 'Optativa II', creditos: 11 },
            { nombre: 'Optativa III', creditos: 11 },
        ],
    },
]

const certificaciones = [
    {
        icon: 'ti-language',
        title: 'Certificaciones',
        desc: 'Tres tipos de certificaciones que complementan tu formación profesional.',
        items: ['En idiomas', 'En tecnologías', 'Profesionalizantes'],
    },
    {
        icon: 'ti-briefcase',
        title: 'Prácticas Profesionales',
        desc: 'Por convocatoria. Espacios de aplicación real de los conocimientos adquiridos en la carrera.',
    },
    {
        icon: 'ti-award',
        title: 'Competencias Sello UAS',
        desc: 'Los temas de género, ética y sustentabilidad, así como los transversales y de formación integral, se incorporan dentro de los contenidos temáticos de las materias.',
    },
    {
        icon: 'ti-star',
        title: 'Formación Integral',
        desc: 'Actividades extracurriculares que comprenden aspectos académicos, científicos, actividad física y deportiva, artísticos y culturales.',
    },
    {
        icon: 'ti-heart-handshake',
        title: 'Servicio Social',
        desc: 'Obligatorio según el Artículo 15 del Reglamento de Servicio Social de la UAS. Duración no menor de seis meses ni mayor a un año, cumpliendo al menos 480 horas.',
    },
    {
        icon: 'ti-world',
        title: 'Segundo Idioma',
        desc: 'Obligatorio como requisito de egreso, certificado por el Centro de Estudio de Idiomas de la UAS.',
    },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* { box-sizing: border-box; }
.carrera-page { font-family: 'Outfit', sans-serif; background: #f4f5f9; }

.hero-carrera {
    background: #ffd500;
    padding: 64px 48px;
    position: relative;
    overflow: hidden;
}

.hero-carrera::before {
    content: '';
    position: absolute;
    right: -60px; top: -60px;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: rgba(15,26,140,0.06);
}

.hero-carrera::after {
    content: '';
    position: absolute;
    right: 80px; bottom: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(15,26,140,0.04);
}

.hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 48px; align-items: center;
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
    background: rgba(15,26,140,0.1);
    padding: 4px 12px; border-radius: 20px;
    display: inline-block; margin-bottom: 14px;
}

.hero-carrera h1 {
    font-size: clamp(26px, 3.5vw, 44px);
    font-weight: 800; color: #0f1a8c;
    line-height: 1.15; letter-spacing: -1px; margin-bottom: 20px;
}

.hero-carrera h1 span { opacity: 0.75; }

.hero-badges { display: flex; gap: 10px; flex-wrap: wrap; }

.hero-badges span {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(15,26,140,0.1); color: #0f1a8c;
    font-size: 12px; font-weight: 600;
    padding: 6px 14px; border-radius: 20px;
    border: 1px solid rgba(15,26,140,0.12);
}

.hero-right { display: flex; flex-direction: column; }

.hero-img-wrap {
    position: relative; border-radius: 20px; overflow: hidden;
    box-shadow: 0 16px 48px rgba(15,26,140,0.2);
}

.hero-img { width: 100%; height: 300px; object-fit: cover; display: block; }

.hero-img-badge {
    position: absolute; bottom: 14px; left: 14px;
    background: #ffd500; color: #0f1a8c;
    font-size: 12px; font-weight: 700;
    padding: 6px 14px; border-radius: 20px;
    display: flex; align-items: center; gap: 6px;
}

.stats-section { background: #0f1a8c; padding: 40px 48px; }
.container { max-width: 1100px; margin: 0 auto; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

.stat-card {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 20px 16px; text-align: center;
    transition: background 0.2s;
}

.stat-card:hover { background: rgba(255,255,255,0.14); }
.stat-icon { font-size: 24px; color: #ffd500; margin-bottom: 10px; }
.stat-number { font-size: 24px; font-weight: 800; color: white; margin-bottom: 6px; }
.stat-label { font-size: 12px; color: rgba(255,255,255,0.65); }

.section { padding: 72px 48px; }
.bg-white { background: white; }
.bg-gray { background: #f4f5f9; }
.bg-dark { background: #0f1a8c; }

.s-tag {
    font-size: 11px; font-weight: 700; color: #0f1a8c;
    text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;
}

.s-tag.light { color: #ffd500; }

.s-title {
    font-size: clamp(22px, 3vw, 32px); font-weight: 800;
    color: #1a1a2e; letter-spacing: -0.5px; margin-bottom: 32px;
}

.s-title.light { color: white; }

.tabs-bar {
    display: flex; gap: 8px;
    border-bottom: 2px solid #e8ecff;
    margin-bottom: 36px; flex-wrap: wrap;
}

.tab-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 20px; background: none; border: none;
    border-bottom: 3px solid transparent; margin-bottom: -2px;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
    color: #888; cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    border-radius: 8px 8px 0 0;
}

.tab-btn i { font-size: 16px; }
.tab-btn:hover { color: #0f1a8c; background: #f0f3ff; }
.tab-btn.active { color: #0f1a8c; border-bottom-color: #ffd500; background: #f0f3ff; }
.tab-content { min-height: 200px; }

.perfil-box {
    background: #f4f5f9; border-radius: 16px; padding: 36px;
    border-left: 4px solid #ffd500;
    display: flex; gap: 24px; align-items: flex-start;
}

.perfil-icon { font-size: 36px; color: #0f1a8c; flex-shrink: 0; margin-top: 4px; }
.perfil-texto { flex: 1; }
.perfil-box .s-tag { margin-bottom: 4px; }
.perfil-box .s-title { margin-bottom: 16px; }
.perfil-box p { color: #555; font-size: 15px; line-height: 1.8; }

.perfil-qr {
    flex-shrink: 0; text-align: center; background: white;
    border-radius: 14px; padding: 20px 16px;
    border: 1.5px solid rgba(15,26,140,0.1); width: 160px;
}

.qr-label {
    font-size: 11px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: #0f1a8c; margin-bottom: 12px;
}

.qr-img { width: 120px; height: 120px; display: block; margin: 0 auto 10px; border-radius: 8px; }
.perfil-qr p { font-size: 11px !important; color: #888 !important; line-height: 1.4 !important; margin: 0 !important; }

.campo-intro { margin-bottom: 32px; }
.campo-desc { font-size: 15px; color: #555; line-height: 1.8; max-width: 720px; }

.campo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

.campo-card {
    background: #f4f5f9; border-radius: 14px; padding: 24px;
    border-top: 3px solid #0f1a8c;
    transition: transform 0.2s, box-shadow 0.2s;
}

.campo-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(0,0,0,0.08); }
.campo-icon { font-size: 28px; color: #0f1a8c; margin-bottom: 12px; }
.campo-card h3 { font-size: 15px; font-weight: 700; color: #0f1a8c; margin-bottom: 8px; }
.campo-card p { font-size: 13px; color: #555; line-height: 1.7; }

.video-layout {}
.video-layout .s-tag { text-align: left; }
.video-layout .s-title { text-align: left; }

.video-wrap {
    position: relative; width: 100%; padding-bottom: 56.25%;
    border-radius: 16px; overflow: hidden;
    box-shadow: 0 12px 40px rgba(15,26,140,0.15);
    margin-bottom: 16px;
}

.video-iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
.video-caption { font-size: 13px; color: #888; text-align: center; }

.semestres-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 24px; }

.sem-card {
    background: white; border-radius: 14px; overflow: hidden;
    border: 1px solid rgba(0,0,0,0.07);
    transition: transform 0.2s, box-shadow 0.2s;
}

.sem-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(15,26,140,0.1); }

.sem-header {
    background: #0f1a8c; padding: 14px 18px;
    display: flex; align-items: center; gap: 10px;
    border-bottom: 3px solid #ffd500;
}

.sem-num {
    background: #ffd500; color: #0f1a8c;
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; flex-shrink: 0;
}

.sem-header h3 { color: white; font-size: 14px; font-weight: 700; }
.materias-list { padding: 12px 0; }

.materia-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 16px; border-bottom: 0.5px solid rgba(0,0,0,0.06); gap: 8px;
}

.materia-row:last-child { border-bottom: none; }
.materia-nombre { font-size: 12px; color: #444; line-height: 1.4; flex: 1; }
.materia-creditos {
    background: #ffd500; color: #0f1a8c;
    font-size: 11px; font-weight: 700;
    padding: 2px 8px; border-radius: 20px; flex-shrink: 0;
}

.creditos-total {
    display: flex; align-items: center; gap: 10px;
    background: white; border-radius: 12px; padding: 16px 24px;
    border-left: 4px solid #0f1a8c; font-size: 15px; color: #555;
}

.creditos-total i { font-size: 20px; color: #ffd500; }
.creditos-total strong { color: #0f1a8c; font-size: 18px; }

.certs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

.cert-card {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 16px; padding: 24px;
    border-top: 3px solid #ffd500; transition: background 0.2s;
}

.cert-card:hover { background: rgba(255,255,255,0.13); }
.cert-icon { font-size: 28px; color: #ffd500; margin-bottom: 12px; }
.cert-card h3 { color: white; font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.cert-card p { color: rgba(255,255,255,0.75); font-size: 13px; line-height: 1.7; }
.cert-card ul { list-style: none; padding: 0; margin-top: 10px; }
.cert-card ul li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.8); padding: 4px 0; }
.cert-card ul li i { color: #ffd500; font-size: 14px; flex-shrink: 0; }

.cta-section { border-top: 3px solid #ffd500; }

.cta-inner {
    display: grid; grid-template-columns: 200px 1fr;
    gap: 64px; align-items: center;
}

.cta-deco {
    position: relative; height: 200px;
    display: flex; align-items: center; justify-content: center;
}

.deco-circle { position: absolute; border-radius: 50%; }
.c1 { width: 180px; height: 180px; background: #ffd500; opacity: 0.15; }
.c2 { width: 120px; height: 120px; background: #0f1a8c; opacity: 0.08; }
.deco-icon { font-size: 56px; color: #0f1a8c; opacity: 0.2; z-index: 1; }

.contacto-info { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }

.contacto-item { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #555; }
.contacto-item i { font-size: 18px; color: #0f1a8c; flex-shrink: 0; margin-top: 2px; }
.contacto-item p { line-height: 1.6; margin: 0; }
.contacto-item a { color: #0f1a8c; font-weight: 600; text-decoration: none; }
.contacto-item a:hover { text-decoration: underline; }

.cta-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }

.btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: #ffd500; color: #0f1a8c;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
    padding: 12px 24px; border-radius: 10px;
    text-decoration: none; transition: all 0.2s;
}

.btn-primary:hover { background: #ffe033; transform: translateY(-1px); }

.btn-outline {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: #0f1a8c;
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
    padding: 12px 24px; border-radius: 10px;
    border: 1.5px solid #0f1a8c; text-decoration: none; transition: all 0.2s;
}

.btn-outline:hover { background: #0f1a8c; color: white; }

@media (max-width: 1100px) {
    .semestres-grid { grid-template-columns: repeat(2, 1fr); }
    .campo-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 900px) {
    .hero-carrera { padding: 48px 24px; }
    .hero-inner { grid-template-columns: 1fr; gap: 32px; }
    .hero-right { display: none; }
    .stats-section { padding: 32px 24px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .section { padding: 56px 24px; }
    .certs-grid { grid-template-columns: 1fr 1fr; }
    .cta-inner { grid-template-columns: 1fr; gap: 32px; }
    .cta-deco { height: 120px; }
}

@media (max-width: 600px) {
    .hero-carrera { padding: 40px 16px; }
    .stats-section { padding: 24px 16px; }
    .section { padding: 40px 16px; }
    .semestres-grid { grid-template-columns: 1fr; }
    .certs-grid { grid-template-columns: 1fr; }
    .campo-grid { grid-template-columns: 1fr; }
    .perfil-box { flex-direction: column; gap: 16px; }
    .perfil-qr { width: 100%; }
    .perfil-qr .qr-img { width: 100px; height: 100px; }
    .tab-btn { font-size: 13px; padding: 10px 14px; }
}
</style>