<template>
    <div class="tutorias-page">

        <!-- HERO — amarillo -->
        <section class="hero-tutorias">
            <div class="hero-inner">
                <div class="hero-left">
                    <div class="hero-breadcrumb">
                        <RouterLink to="/">Inicio</RouterLink>
                        <i class="ti ti-chevron-right"></i>
                        <span>Departamentos</span>
                        <i class="ti ti-chevron-right"></i>
                        <span>Tutorías</span>
                    </div>
                    <h1>¡Bienvenidos,<br><span>estudiantes!</span></h1>
                    <p>El departamento de tutoría de la Universidad Autónoma de Sinaloa es el responsable de ofrecer
                        apoyo a la comunidad estudiantil. Desde la propuesta de ANUIES (2000), la tutoría se entiende
                        como un proceso de acompañamiento durante el trayecto educativo del estudiante, en el que se
                        deben identificar tanto sus necesidades como sus problemas académicos, considerando también su
                        desarrollo personal.</p>
                    <div class="hero-badges">
                        <span><i class="ti ti-school"></i> Acompañamiento académico</span>
                        <span><i class="ti ti-heart"></i> Desarrollo personal</span>
                    </div>
                </div>
                <div class="hero-right">
                    <div class="hero-stats-wrap">
                        <div class="hero-stat">
                            <div class="hero-stat-n"><i class="ti ti-users"></i></div>
                            <div class="hero-stat-l">Atención estudiantil</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-n"><i class="ti ti-book"></i></div>
                            <div class="hero-stat-l">Plan de Acción Tutorial</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-n"><i class="ti ti-heart-handshake"></i></div>
                            <div class="hero-stat-l">Apoyo integral</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PROGRAMA — azul -->
        <section class="section bg-dark">
            <div class="container">
                <div class="s-tag light">ANUIES 2000</div>
                <h2 class="s-title light">Programa de Tutorías</h2>
                <div class="programa-grid">
                    <div class="prog-card">
                        <div class="prog-icon"><i class="ti ti-help-circle" aria-hidden="true"></i></div>
                        <h3>¿Qué es?</h3>
                        <p>La tutoría, según la propuesta de la ANUIES (2000), es un proceso de apoyo y acompañamiento
                            sistemático que se ofrece al estudiante a lo largo de su permanencia en un programa
                            educativo. No se trata simplemente de una asesoría puntual o de atender dudas aisladas: la
                            tutoría se concibe como un programa integral cuyo propósito central es identificar y atender
                            las necesidades y problemas académicos de cada alumno, pero también fomentar su desarrollo
                            personal.</p>
                    </div>
                    <div class="prog-card">
                        <div class="prog-icon"><i class="ti ti-route" aria-hidden="true"></i></div>
                        <h3>Proceso</h3>
                        <p>Comenzamos con un diagnóstico de necesidades académicas y personales del estudiante, tras lo
                            cual es derivado a tutores y asesores pares según el Plan de Acción Tutorial. Cada tutor,
                            basado en ese diagnóstico, implementa estrategias preventivas y correctivas. Se integran
                            apoyos institucionales (servicios psicológicos, bibliotecas, talleres) y se coordina a los
                            tutores, asesores pares y coordinadores académicos para garantizar una atención integral.
                        </p>
                    </div>
                    <div class="prog-card">
                        <div class="prog-icon"><i class="ti ti-target" aria-hidden="true"></i></div>
                        <h3>¿A quién va dirigido?</h3>
                        <p>Está dirigido a los estudiantes pertenecientes a la Universidad Autónoma de Sinaloa, tanto de
                            nivel medio superior como superior, que presenten dificultades en su rendimiento académico.
                            Les hacemos el cordial recordatorio de que este sitio web está dedicado a la Unidad
                            Académica de Artes Visuales, por lo que sólo serán considerados los alumnos pertenecientes a
                            esta. En caso de necesitar ser asesorado, le hacemos la invitación de asistir a la oficina
                            de tutorías de su Facultad/Preparatoria.</p>
                    </div>
                </div>

                <!-- <div class="derivacion-wrap">
                    <button class="btn-derivacion" @click="mostrarApoyo = true">
                        <i class="ti ti-arrow-right-circle"></i>
                        Derivación
                    </button>
                </div> -->
            </div>
        </section>

        <!-- APOYO ESTUDIANTIL — blanco (se muestra al dar click en Derivación) -->
        <section v-if="mostrarApoyo" class="section bg-white" ref="apoyoRef">
            <div class="container">
                <div class="s-tag">Recursos disponibles</div>
                <h2 class="s-title">Apoyo Estudiantil</h2>
                <div class="apoyo-grid">
                    <div class="apoyo-card">
                        <div class="apoyo-icon"><i class="ti ti-building-community" aria-hidden="true"></i></div>
                        <h3>Centro de Atención Estudiantil</h3>
                        <p>Orientado a ofrecer asesoramiento psicológico y emocional. Busca ayudar a los estudiantes a
                            enfrentar dificultades personales que puedan impactar su desempeño académico y vida
                            universitaria.</p>
                        <a href="https://tutorarte.uas.edu.mx/HTML/CAE.php" target="_blank" rel="noopener" class="apoyo-btn">
                            <i class="ti ti-external-link"></i> Ir a CAE
                        </a>
                    </div>

                    <div class="apoyo-card destacada">
                        <div class="apoyo-icon"><i class="ti ti-school" aria-hidden="true"></i></div>
                        <h3>Asesorías académicas</h3>
                        <p>Orientación en la elección de materias, técnicas de estudio, gestión del tiempo y decisiones
                            sobre su futuro profesional. Su objetivo es ayudar al estudiante a superar dificultades y
                            alcanzar sus metas con éxito.</p>
                        <a href="https://tutorarte.uas.edu.mx/HTML/Asesoria.php" target="_blank" rel="noopener" class="apoyo-btn">
                            <i class="ti ti-external-link"></i> Solicitar Asesorías
                        </a>
                    </div>

                    <div class="apoyo-card">
                        <div class="apoyo-icon"><i class="ti ti-file-check" aria-hidden="true"></i></div>
                        <h3>Solicitar justificantes</h3>
                        <p>Permite a los alumnos enviar sus datos y adjuntar una receta médica o comprobante válido para
                            justificar una falta. Su propósito es facilitar el proceso de registro y validación de
                            ausencias de forma clara y ordenada.</p>
                        <a href="https://tutorarte.uas.edu.mx/HTML/justificante.php" target="_blank" rel="noopener"
                            class="apoyo-btn">
                            <i class="ti ti-external-link"></i> Solicitar Justificante
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- RESPONSABLE — gris -->
        <section class="section bg-gray">
            <div class="container">
                <div class="s-tag">Contacto directo</div>
                <h2 class="s-title">Responsable de Tutorías</h2>
                <div class="responsable-wrap">
                    <div class="responsable-foto">
                        <img src="https://tutorarte.uas.edu.mx/imagenes/encargado.jpg" alt="Responsable de Tutorías" />
                    </div>
                    <div class="responsable-info">
                        <div class="responsable-badge">Responsable de Tutorías</div>
                        <h3>Lic. Erika Yazmín Osorio Valenzuela</h3>
                        <div class="responsable-datos">
                            <div class="dato-item">
                                <i class="ti ti-clock" aria-hidden="true"></i>
                                <div>
                                    <strong>Horario de atención</strong>
                                    <span>Lunes a Viernes · 8:00 am – 1:00 pm</span>
                                </div>
                            </div>
                            <div class="dato-item">
                                <i class="ti ti-map-pin" aria-hidden="true"></i>
                                <div>
                                    <strong>Ubicación</strong>
                                    <span>Oficina de Tutorías · EDAV · UAS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA — blanco con borde amarillo -->
        <section class="section bg-white cta-section">
            <div class="container">
                <div class="cta-inner">
                    <div class="cta-deco">
                        <div class="deco-circle c1"></div>
                        <div class="deco-circle c2"></div>
                        <i class="ti ti-heart-handshake deco-icon" aria-hidden="true"></i>
                    </div>
                    <div class="cta-text">
                        <div class="s-tag">¿Necesitas apoyo?</div>
                        <h2 class="s-title">Estamos aquí para ayudarte</h2>
                        <p>Si tienes dificultades académicas o personales, no dudes en acercarte al departamento de
                            Tutorías. Nuestro equipo está listo para acompañarte en tu trayecto universitario.</p>
                        <div class="cta-btns">
                            <button class="btn-primary" @click="mostrarApoyo = true; scrollToApoyo()">
                                Ver opciones de apoyo <i class="ti ti-arrow-right"></i>
                            </button>
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
import { ref, nextTick } from 'vue'
import { RouterLink } from 'vue-router'

const mostrarApoyo = ref(false)
const apoyoRef = ref<HTMLElement | null>(null)

async function scrollToApoyo() {
    mostrarApoyo.value = true
    await nextTick()
    apoyoRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
    box-sizing: border-box;
}

.tutorias-page {
    font-family: 'Outfit', sans-serif;
}

/* HERO */
.hero-tutorias {
    background: #ffd500;
    padding: 64px 48px;
    position: relative;
    overflow: hidden;
}

.hero-tutorias::before {
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

.hero-tutorias h1 {
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800;
    color: #0f1a8c;
    letter-spacing: -1px;
    margin-bottom: 16px;
    line-height: 1.1;
}

.hero-tutorias h1 span {
    color: rgba(15, 26, 140, 0.65);
}

.hero-tutorias p {
    font-size: 15px;
    color: rgba(15, 26, 140, 0.75);
    line-height: 1.7;
    margin-bottom: 28px;
    max-width: 480px;
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

.hero-stats-wrap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.hero-stat {
    background: rgba(15, 26, 140, 0.1);
    border: 1px solid rgba(15, 26, 140, 0.12);
    border-radius: 14px;
    padding: 24px 16px;
    text-align: center;
}

.hero-stat-n {
    font-size: 32px;
    color: #0f1a8c;
    margin-bottom: 8px;
}

.hero-stat-l {
    font-size: 12px;
    color: rgba(15, 26, 140, 0.7);
    font-weight: 600;
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

.bg-dark {
    background: #0f1a8c;
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

/* PROGRAMA GRID */
.programa-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.prog-card {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-top: 3px solid #ffd500;
    border-radius: 14px;
    padding: 28px;
    transition: background 0.2s;
}

.prog-card:hover {
    background: rgba(255, 255, 255, 0.13);
}

.prog-icon {
    font-size: 28px;
    color: #ffd500;
    margin-bottom: 14px;
}

.prog-card h3 {
    color: white;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
}

.prog-card p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    line-height: 1.7;
}

/* DERIVACIÓN */
.derivacion-wrap {
    display: flex;
    justify-content: center;
    margin-top: 8px;
}

.btn-derivacion {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #ffd500;
    color: #0f1a8c;
    font-family: 'Outfit', sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding: 14px 36px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-derivacion:hover {
    background: #ffe033;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 213, 0, 0.4);
}

/* APOYO ESTUDIANTIL */
.apoyo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.apoyo-card {
    background: #f4f5f9;
    border-radius: 16px;
    padding: 28px;
    border-top: 3px solid #0f1a8c;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.apoyo-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 26, 140, 0.1);
}

.apoyo-card.destacada {
    border-top-color: #ffd500;
    background: #0f1a8c;
}

.apoyo-card.destacada h3 {
    color: white;
}

.apoyo-card.destacada p {
    color: rgba(255, 255, 255, 0.8);
}

.apoyo-icon {
    font-size: 28px;
    color: #0f1a8c;
}

.apoyo-card.destacada .apoyo-icon {
    color: #ffd500;
}

.apoyo-card h3 {
    font-size: 17px;
    font-weight: 700;
    color: #0f1a8c;
}

.apoyo-card p {
    font-size: 13px;
    color: #555;
    line-height: 1.7;
    flex: 1;
}

.apoyo-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #ffd500;
    color: #0f1a8c;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.2s;
    align-self: flex-start;
}

.apoyo-btn:hover {
    background: #ffe033;
    transform: translateY(-1px);
}

/* RESPONSABLE */
.responsable-wrap {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 48px;
    align-items: center;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.07);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.responsable-foto {
    height: 340px;
    overflow: hidden;
}

.responsable-foto img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
}

.responsable-info {
    padding: 32px 32px 32px 0;
}

.responsable-badge {
    font-size: 11px;
    font-weight: 700;
    color: #0f1a8c;
    background: #e8ecff;
    padding: 4px 12px;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.responsable-info h3 {
    font-size: 22px;
    font-weight: 800;
    color: #0f1a8c;
    margin-bottom: 24px;
}

.responsable-datos {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.dato-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: #f4f5f9;
    border-radius: 12px;
    padding: 16px;
    border-left: 3px solid #ffd500;
}

.dato-item i {
    font-size: 22px;
    color: #0f1a8c;
    flex-shrink: 0;
    margin-top: 2px;
}

.dato-item strong {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #0f1a8c;
    margin-bottom: 2px;
}

.dato-item span {
    font-size: 14px;
    color: #555;
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
    border: none;
    cursor: pointer;
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
    .hero-tutorias {
        padding: 48px 24px;
    }

    .hero-inner {
        grid-template-columns: 1fr;
    }

    .hero-stats-wrap {
        grid-template-columns: repeat(3, 1fr);
    }

    .section {
        padding: 48px 24px;
    }

    .programa-grid {
        grid-template-columns: 1fr;
    }

    .apoyo-grid {
        grid-template-columns: 1fr;
    }

    .responsable-wrap {
        grid-template-columns: 1fr;
    }

    .responsable-foto {
        height: 280px;
    }

    .responsable-info {
        padding: 24px;
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
    .hero-tutorias {
        padding: 40px 16px;
    }

    .section {
        padding: 40px 16px;
    }

    .hero-stats-wrap {
        grid-template-columns: 1fr;
    }
}
</style>