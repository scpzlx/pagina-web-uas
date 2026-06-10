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
                        <span>Maestría en Educación Artística</span>
                    </div>
                    <div class="hero-area-tag">Posgrado · Ciencias de la Educación y Humanidades</div>
                    <h1>Maestría en <br><span>Educación Artística</span></h1>
                    <div class="hero-badges">
                        <span><i class="ti ti-map-pin"></i> Culiacán, Sinaloa</span>
                        <span><i class="ti ti-school"></i> Modalidad Presencial</span>
                        <span><i class="ti ti-calendar"></i> 4 Semestres</span>
                        <span><i class="ti ti-award"></i> Posgrado</span>
                    </div>
                </div>
                <div class="hero-right">
                    <div class="hero-stats-wrap">
                        <div class="hero-stat" v-for="stat in heroStats" :key="stat.label">
                            <div class="hero-stat-n">{{ stat.number }}</div>
                            <div class="hero-stat-l">{{ stat.label }}</div>
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

        <!-- PERFILES — blanco con tabs -->
        <section class="section bg-white">
            <div class="container">
                <div class="s-tag">Formación profesional</div>
                <h2 class="s-title">Perfiles</h2>

                <div class="tabs-wrap">
                    <div class="tabs-nav">
                        <button v-for="tab in perfilTabs" :key="tab.id" class="tab-btn"
                            :class="{ active: tabActivo === tab.id }" @click="tabActivo = tab.id">
                            <i :class="`ti ${tab.icon}`"></i>
                            {{ tab.label }}
                        </button>
                    </div>

                    <div class="tab-content">
                        <!-- PERFIL DE INGRESO -->
                        <div v-if="tabActivo === 'ingreso'" class="perfil-panel">
                            <p class="perfil-intro">{{ perfilIngreso.intro }}</p>
                            <div class="perfil-cats">
                                <div v-for="cat in perfilIngreso.categorias" :key="cat.titulo" class="perfil-cat">
                                    <div class="perfil-cat-header">
                                        <div class="perfil-cat-icon"><i :class="`ti ${cat.icon}`"></i></div>
                                        <h3>{{ cat.titulo }}</h3>
                                    </div>
                                    <ul>
                                        <li v-for="item in cat.items" :key="item">
                                            <i class="ti ti-chevron-right"></i> {{ item }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- PERFIL DE EGRESO -->
                        <div v-if="tabActivo === 'egreso'" class="perfil-panel">
                            <p class="perfil-intro">{{ perfilEgreso.intro }}</p>
                            <div class="perfil-cats">
                                <div v-for="cat in perfilEgreso.categorias" :key="cat.titulo" class="perfil-cat">
                                    <div class="perfil-cat-header">
                                        <div class="perfil-cat-icon"><i :class="`ti ${cat.icon}`"></i></div>
                                        <h3>{{ cat.titulo }}</h3>
                                    </div>
                                    <ul>
                                        <li v-for="item in cat.items" :key="item">
                                            <i class="ti ti-chevron-right"></i> {{ item }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- ÁREAS DE CONOCIMIENTO -->
                        <div v-if="tabActivo === 'areas'" class="perfil-panel">
                            <p class="perfil-intro">Líneas de investigación y especialización del programa de maestría.
                            </p>
                            <div class="areas-grid">
                                <div v-for="area in areasConocimiento" :key="area.titulo" class="area-card">
                                    <div class="area-icon"><i :class="`ti ${area.icon}`"></i></div>
                                    <h3>{{ area.titulo }}</h3>
                                </div>
                            </div>
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
                                <span class="materia-creditos">{{ m.creditos }}C</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- REQUISITOS — azul -->
        <section class="section bg-dark">
            <div class="container">
                <div class="s-tag light">Proceso de admisión</div>
                <h2 class="s-title light">Requisitos para ser Aspirante</h2>

                <div class="requisitos-grid">
                    <div class="req-list">
                        <div v-for="(req, i) in requisitos" :key="req.titulo" class="req-item">
                            <div class="req-num">{{ String(i + 1).padStart(2, '0') }}</div>
                            <div class="req-body">
                                <h3>{{ req.titulo }}</h3>
                                <p>{{ req.desc }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="req-side">
                        <!-- SELECCIÓN -->
                        <div class="seleccion-box">
                            <h3><i class="ti ti-list-check"></i> Proceso de Selección</h3>
                            <div v-for="(paso, i) in seleccion" :key="paso" class="seleccion-item">
                                <div class="sel-num">{{ i + 1 }}</div>
                                <p>{{ paso }}</p>
                            </div>
                            <p class="sel-nota">Los resultados se harán llegar a través del correo electrónico
                                registrado.</p>
                        </div>

                        <!-- DESCARGAS -->
                        <div class="descargas-box">
                            <h3><i class="ti ti-download"></i> Material de Apoyo</h3>

                            <a href="/docs/Plantilla_Anteproyecto.docx" target="_blank" class="descarga-item" download>
                                <div class="descarga-icon pdf"><i class="ti ti-file-type-pdf"></i></div>
                                <div>
                                    <div class="descarga-titulo">Plantilla Anteproyecto</div>
                                    <div class="descarga-sub">Descarga el PDF con todos los detalles</div>
                                </div>
                                <i class="ti ti-download descarga-arrow"></i>
                            </a>

                            <div class="video-wrap" @click="abrirVideo">
                                <div class="video-thumb-inner">
                                    <div class="video-play-btn"><i class="ti ti-player-play"></i></div>
                                    <div class="video-label">
                                        <div class="video-titulo">Video informativo</div>
                                        <div class="video-sub">CITAS y REFERENCIAS APA 7ma edición | Normas APA séptima
                                            ed. |</div>
                                    </div>
                                </div>
                            </div>

                            <p class="contacto-doc">
                                <i class="ti ti-mail"></i>
                                Envía tu documentación a:
                                <a href="mailto:posgrado.uaa@uas.edu.mx">posgrado.uaa@uas.edu.mx</a>
                            </p>
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
                        <i class="ti ti-award deco-icon"></i>
                    </div>
                    <div class="cta-text">
                        <div class="s-tag">Contacto</div>
                        <h2 class="s-title">Escuela de Diseño y Artes Visuales</h2>
                        <div class="contacto-info">
                            <div class="contacto-item">
                                <i class="ti ti-map-pin"></i>
                                <p>Blvd. Francisco Labastida Ochoa (malecón nuevo) rumbo a La Limita, a 300 mts. de la
                                    carretera a Imala. CP. 80064 Culiacán, Sinaloa, México</p>
                            </div>
                            <div class="contacto-item">
                                <i class="ti ti-phone"></i>
                                <a href="tel:6677137155">667 713 7155</a>
                            </div>
                            <div class="contacto-item">
                                <i class="ti ti-mail"></i>
                                <a href="mailto:posgrado.uaa@uas.edu.mx">posgrado.uaa@uas.edu.mx</a>
                            </div>
                        </div>
                        <div class="cta-btns">
                            <RouterLink to="/carreras/artes-visuales" class="btn-primary">
                                Ver Artes Visuales <i class="ti ti-arrow-right"></i>
                            </RouterLink>
                            <RouterLink to="/carreras/diseno-arte-multimedia" class="btn-outline">
                                Ver Diseño Multimedia
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- OVERLAY VIDEO -->
        <div v-if="videoAbierto" class="video-overlay" @click.self="cerrarVideo">
            <button class="overlay-close" @click="cerrarVideo">×</button>
            <iframe :src="videoUrl" frameborder="0" allowfullscreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                class="video-iframe">
            </iframe>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const tabActivo = ref('ingreso')
const videoUrl = ref('')
const videoAbierto = ref(false)

function abrirVideo() {
    videoUrl.value = 'https://www.youtube.com/embed/m09MGyFfvTU?autoplay=1';
    videoAbierto.value = true
}
function cerrarVideo() {
    videoAbierto.value = false
    videoUrl.value = ''

}

const perfilTabs = [
    { id: 'ingreso', label: 'Perfil de Ingreso', icon: 'ti-door-enter' },
    { id: 'egreso', label: 'Perfil de Egreso', icon: 'ti-user-check' },
    { id: 'areas', label: 'Áreas de Conocimiento', icon: 'ti-books' },
]

const heroStats = [
    { number: '4', label: 'Semestres' },
    { number: '24', label: 'Materias' },
    { number: '8.5', label: 'Promedio mínimo' },
]

const stats = [
    { icon: 'ti-calendar', number: '4', label: 'Semestres' },
    { icon: 'ti-book', number: '24', label: 'Materias' },
    { icon: 'ti-certificate', number: '8.5', label: 'Promedio mínimo' },
    { icon: 'ti-map-pin', number: 'Culiacán', label: 'Sinaloa, México' },
]

const perfilIngreso = {
    intro: 'El programa se dirige a aspirantes de México y del extranjero egresados de un programa de licenciatura afín que se desempeñen o interesen en profesionalizar sus estudios para la aplicación y solución de situaciones educativas actuales respecto a la educación artística.',
    categorias: [
        {
            titulo: 'A. Conocimientos',
            icon: 'ti-brain',
            items: [
                'Tener una trayectoria afín al programa de la maestría.',
                'Promedio de certificado de licenciatura mínimo de 8.5.',
                'Conocimientos y habilidades artísticas previas.',
                'Conocimiento sobre un proyecto de investigación dentro del ámbito artístico.',
                'Habilidades para el manejo de computadora e Internet.',
                'Competencia para comprender textos escritos en inglés.',
            ],
        },
        {
            titulo: 'B. Habilidades',
            icon: 'ti-star',
            items: [
                'Presentar proyectos de interés internacional, nacional y local.',
                'Capacidad de creación y logística de actividades artísticas.',
                'Transmitir clara y ordenadamente sus ideas, oral y escrita.',
                'Interés por la innovación, docencia, investigación y creación artística.',
            ],
        },
        {
            titulo: 'C. Actitudes',
            icon: 'ti-heart',
            items: [
                'Responsabilidad, disposición y colaboración para trabajar en equipo.',
                'Interés por profesionalizarse y analizar situaciones de la educación del arte.',
                'Tomar decisiones, resolver problemas y ejercer procesos de autoaprendizaje.',
                'Compromiso y responsabilidad para realizar en tiempo y forma todas las actividades.',
            ],
        },
        {
            titulo: 'D. Valores',
            icon: 'ti-scale',
            items: [
                'Conducirse con respeto, solidaridad, justicia, honestidad y equidad.',
                'Mostrar tolerancia ante posturas u opiniones distintas a las propias.',
            ],
        },
    ],
}

const perfilEgreso = {
    intro: 'El egresado de la Maestría en Educación Artística se desempeña como un docente con conocimientos teóricos, prácticos y metodológicos con compromiso y responsabilidad social para la enseñanza de las artes, director y gestor artístico-cultural.',
    categorias: [
        {
            titulo: 'A. Conocimientos',
            icon: 'ti-brain',
            items: [
                'Comprensión del campo de la educación y dominio de los métodos de investigación utilizados en este campo.',
            ],
        },
        {
            titulo: 'B. Habilidades',
            icon: 'ti-star',
            items: [
                'Capacidad de concebir, diseñar, crear, poner en práctica y adoptar un proceso sustancial de investigación o creación.',
                'Capacidad para contribuir a la ampliación de las fronteras del conocimiento a través de una investigación original.',
            ],
        },
        {
            titulo: 'C. Valores',
            icon: 'ti-scale',
            items: [
                'Sensibilidad frente a los problemas de la educación en países como México.',
                'Ética profesional y honestidad en su desempeño como investigador.',
                'Equidad social y de género desde la inclusión.',
                'Actuación desde la ética y el profesionalismo que el área de artes solicita.',
            ],
        },
    ],
}

const areasConocimiento = [
    { titulo: 'Sujetos y procesos en la educación artística', icon: 'ti-users' },
    { titulo: 'Análisis e innovación curricular en el arte', icon: 'ti-refresh' },
    { titulo: 'Creencias y valores en la educación del arte', icon: 'ti-heart' },
    { titulo: 'Práctica y reflexión docente en la educación artística', icon: 'ti-school' },
    { titulo: 'Aspectos sociológicos y económicos de la educación del arte', icon: 'ti-chart-bar' },
    { titulo: 'Tecnologías de la Información y la comunicación en el arte', icon: 'ti-device-laptop' },
]

const planEstudios = [
    {
        semestre: '01', titulo: 'Primer Semestre',
        materias: [
            { nombre: 'Educación, Arte y Sociedad', creditos: 8 },
            { nombre: 'Tecnologías de la Información y Comunicación en el Arte', creditos: 7 },
            { nombre: 'Teoría del Arte', creditos: 7 },
            { nombre: 'Diseño Instruccional', creditos: 6 },
            { nombre: 'Construcción del Objeto de Estudio de Investigación', creditos: 6 },
        ],
    },
    {
        semestre: '02', titulo: 'Segundo Semestre',
        materias: [
            { nombre: 'Arte Regional', creditos: 6 },
            { nombre: 'Expresión Artística', creditos: 7 },
            { nombre: 'Innovación en la Educación Artística', creditos: 7 },
            { nombre: 'Diseño Curricular en el Arte', creditos: 7 },
            { nombre: 'Desarrollo de Proyecto de Investigación', creditos: 7 },
        ],
    },
    {
        semestre: '03', titulo: 'Tercer Semestre',
        materias: [
            { nombre: 'Diseño de Espacios Escénicos', creditos: 6 },
            { nombre: 'Gestión Cultural', creditos: 6 },
            { nombre: 'Corrientes Filosóficas en la Educación Artística', creditos: 6 },
            { nombre: 'Pedagogía y Didáctica del Arte', creditos: 7 },
            { nombre: 'Investigación Aplicada en las Artes', creditos: 7 },
        ],
    },
    {
        semestre: '04', titulo: 'Cuarto Semestre',
        materias: [
            { nombre: 'Dirección Artística', creditos: 6 },
            { nombre: 'Gestión de Proyectos Artísticos y Culturales', creditos: 6 },
            { nombre: 'Práctica Docente', creditos: 6 },
            { nombre: 'Producción de Eventos Artísticos y Culturales', creditos: 5 },
            { nombre: 'Información de Investigación', creditos: 7 },
        ],
    },
]

const requisitos = [
    {
        titulo: 'Anteproyecto de investigación',
        desc: 'Máximo 3,000 palabras incluyendo referencias. Debe plantear el tema, justificar su importancia y definir objetivos. Redacción en normas APA.',
    },
    {
        titulo: 'Currículo vitae con fotografía',
        desc: 'Acompañado con copias de respaldo documental que acrediten la trayectoria académica y profesional.',
    },
    {
        titulo: 'Carta de exposición de motivos',
        desc: 'Dirigida al Comité de Admisión. Debe expresar las razones de interés en el programa y los objetivos académicos y profesionales.',
    },
    {
        titulo: 'Certificados y títulos',
        desc: 'Presentar certificado y título de Licenciatura con promedio mínimo de 8 (ocho).',
    },
    {
        titulo: 'Ficha de registro',
        desc: 'Llenar la ficha de registro antes del 16 de agosto de 2024 en el área correspondiente.',
    },
    {
        titulo: 'Examen EXANI-III (Ceneval)',
        desc: 'Se puede tomar en cualquier sede nacional o en la UAS Culiacán. Resultados válidos si no han transcurrido más de un año.',
    },
    {
        titulo: 'Acreditación del idioma inglés',
        desc: 'Certificado del centro de idiomas, TOEFL o Cambridge. Si no se cuenta con él, se firma carta compromiso para obtenerlo durante la maestría.',
    },
]

const seleccion = [
    'Evaluación de la originalidad y pertinencia del anteproyecto',
    'Entrevista con el Comité de Admisión',
    'Evaluación de trayectoria u hoja de vida (currículum vitae)',
    'Puntaje EXANI-III',
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.carrera-page {
    font-family: 'Outfit', sans-serif;
    background: #f4f5f9;
}

/* HERO */
.hero-carrera {
    background: #ffd500;
    padding: 64px 48px;
    position: relative;
    overflow: hidden;
}

.hero-carrera::before {
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

.hero-area-tag {
    font-size: 11px;
    font-weight: 700;
    color: #0f1a8c;
    background: rgba(15, 26, 140, 0.1);
    padding: 4px 12px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 14px;
    letter-spacing: 0.3px;
}

.hero-carrera h1 {
    font-size: clamp(26px, 3.5vw, 44px);
    font-weight: 800;
    color: #0f1a8c;
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 20px;
}

.hero-carrera h1 span {
    color: rgba(15, 26, 140, 0.65);
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

.hero-stats-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.hero-stat {
    background: rgba(15, 26, 140, 0.1);
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
    font-weight: 500;
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
    font-size: 24px;
    font-weight: 800;
    color: white;
    margin-bottom: 6px;
}

.stat-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);
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
    margin-bottom: 36px;
}

.s-title.light {
    color: white;
}

/* TABS */
.tabs-wrap {}

.tabs-nav {
    display: flex;
    gap: 8px;
    margin-bottom: 28px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0;
    flex-wrap: wrap;
}

.tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #64748b;
    background: none;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    transition: all 0.2s;
    border-radius: 8px 8px 0 0;
}

.tab-btn:hover {
    color: #0f1a8c;
    background: #f4f5f9;
}

.tab-btn.active {
    color: #0f1a8c;
    border-bottom-color: #ffd500;
    background: #f4f5f9;
}

.tab-btn i {
    font-size: 16px;
}

.tab-content {
    animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(6px);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

/* PERFIL PANEL */
.perfil-intro {
    font-size: 15px;
    color: #555;
    line-height: 1.8;
    max-width: 860px;
    margin-bottom: 28px;
    padding: 20px 24px;
    background: #f4f5f9;
    border-left: 4px solid #ffd500;
    border-radius: 12px;
}

.perfil-cats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.perfil-cat {
    background: #f4f5f9;
    border-radius: 14px;
    padding: 22px;
    border-top: 3px solid #0f1a8c;
}

.perfil-cat-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
}

.perfil-cat-icon {
    font-size: 22px;
    color: #0f1a8c;
}

.perfil-cat h3 {
    color: #0f1a8c;
    font-size: 15px;
    font-weight: 700;
}

.perfil-cat ul {
    list-style: none;
    padding: 0;
}

.perfil-cat li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: #555;
    padding: 6px 0;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
    line-height: 1.5;
}

.perfil-cat li:last-child {
    border-bottom: none;
}

.perfil-cat li i {
    color: #0f1a8c;
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 3px;
}

/* ÁREAS */
.areas-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
}

.area-card {
    background: #f4f5f9;
    border-radius: 14px;
    padding: 24px;
    border-left: 3px solid #ffd500;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.area-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(15, 26, 140, 0.1);
}

.area-icon {
    font-size: 24px;
    color: #0f1a8c;
    flex-shrink: 0;
}

.area-card h3 {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a2e;
    line-height: 1.4;
}

/* PLAN DE ESTUDIOS */
.semestres-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
}

.sem-card {
    background: white;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.07);
    transition: transform 0.2s, box-shadow 0.2s;
}

.sem-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(15, 26, 140, 0.1);
}

.sem-header {
    background: #0f1a8c;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 3px solid #ffd500;
}

.sem-num {
    background: #ffd500;
    color: #0f1a8c;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 800;
    flex-shrink: 0;
}

.sem-header h3 {
    color: white;
    font-size: 14px;
    font-weight: 700;
}

.materias-list {
    padding: 12px 0;
}

.materia-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
    gap: 8px;
}

.materia-row:last-child {
    border-bottom: none;
}

.materia-nombre {
    font-size: 12px;
    color: #444;
    line-height: 1.4;
    flex: 1;
}

.materia-creditos {
    background: #ffd500;
    color: #0f1a8c;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 20px;
    flex-shrink: 0;
}

/* REQUISITOS */
.requisitos-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 32px;
    align-items: start;
}

.req-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.req-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    padding: 18px 20px;
    transition: background 0.2s;
}

.req-item:hover {
    background: rgba(255, 255, 255, 0.13);
}

.req-num {
    background: #ffd500;
    color: #0f1a8c;
    font-size: 13px;
    font-weight: 800;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.req-body h3 {
    color: white;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 4px;
}

.req-body p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    line-height: 1.6;
}

/* SIDE */
.req-side {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.seleccion-box,
.descargas-box {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    padding: 22px;
}

.seleccion-box h3,
.descargas-box h3 {
    color: #ffd500;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.seleccion-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
}

.seleccion-item:last-child {
    border-bottom: none;
}

.sel-num {
    background: rgba(255, 213, 0, 0.2);
    color: #ffd500;
    font-size: 12px;
    font-weight: 800;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.seleccion-item p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
    line-height: 1.5;
}

.sel-nota {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 12px;
    font-style: italic;
}

/* DESCARGAS */
.descarga-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 14px 16px;
    text-decoration: none;
    margin-bottom: 12px;
    transition: background 0.2s;
}

.descarga-item:hover {
    background: rgba(255, 255, 255, 0.12);
}

.descarga-icon {
    font-size: 24px;
    flex-shrink: 0;
}

.descarga-icon.pdf {
    color: #ff6b6b;
}

.descarga-titulo {
    color: white;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 2px;
}

.descarga-sub {
    color: rgba(255, 255, 255, 0.55);
    font-size: 11px;
}

.descarga-arrow {
    color: rgba(255, 255, 255, 0.4);
    font-size: 18px;
    margin-left: auto;
}

.video-wrap {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 14px 16px;
    cursor: pointer;
    margin-bottom: 12px;
    transition: background 0.2s;
}

.video-wrap:hover {
    background: rgba(255, 255, 255, 0.12);
}

.video-thumb-inner {
    display: flex;
    align-items: center;
    gap: 12px;
}

.video-play-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ffd500;
    color: #0f1a8c;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
}

.video-titulo {
    color: white;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 2px;
}

.video-sub {
    color: rgba(255, 255, 255, 0.55);
    font-size: 11px;
}

.contacto-doc {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    flex-wrap: wrap;
}

.contacto-doc i {
    color: #ffd500;
}

.contacto-doc a {
    color: #ffd500;
    text-decoration: none;
}

.contacto-doc a:hover {
    text-decoration: underline;
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

.contacto-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
}

.contacto-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: #555;
}

.contacto-item i {
    font-size: 18px;
    color: #0f1a8c;
    flex-shrink: 0;
    margin-top: 2px;
}

.contacto-item p {
    line-height: 1.6;
    margin: 0;
}

.contacto-item a {
    color: #0f1a8c;
    font-weight: 600;
    text-decoration: none;
}

.contacto-item a:hover {
    text-decoration: underline;
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

/* OVERLAY VIDEO */
.video-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay-close {
    position: absolute;
    top: 20px;
    right: 28px;
    background: none;
    border: none;
    color: white;
    font-size: 40px;
    cursor: pointer;
    opacity: 0.7;
}

.overlay-close:hover {
    opacity: 1;
}

.video-iframe {
    width: 85vw;
    height: 48vw;
    max-height: 85vh;
    border-radius: 12px;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
    .semestres-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .requisitos-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 900px) {
    .hero-carrera {
        padding: 48px 24px;
    }

    .hero-inner {
        grid-template-columns: 1fr;
    }

    .hero-stats-wrap {
        grid-template-columns: repeat(3, 1fr);
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

    .perfil-cats {
        grid-template-columns: 1fr;
    }

    .areas-grid {
        grid-template-columns: 1fr 1fr;
    }

    .cta-inner {
        grid-template-columns: 1fr;
        gap: 32px;
    }

    .cta-deco {
        height: 100px;
    }
}

@media (max-width: 600px) {
    .hero-carrera {
        padding: 40px 16px;
    }

    .stats-section {
        padding: 24px 16px;
    }

    .section {
        padding: 40px 16px;
    }

    .semestres-grid {
        grid-template-columns: 1fr;
    }

    .areas-grid {
        grid-template-columns: 1fr;
    }

    .hero-stats-wrap {
        grid-template-columns: 1fr;
    }

    .tabs-nav {
        flex-direction: column;
    }
}
</style>