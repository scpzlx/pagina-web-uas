<template>
    <AdminLayout title="Dashboard" eyebrow="Principal">

        <!-- HERO -->
        <section class="dash-hero">
            <div class="dash-hero-accent"></div>
            <div class="dash-hero-content">
                <span class="dash-hero-eyebrow">
                    <i class="ti ti-shield-check"></i> Acceso administrativo
                </span>
                <h1 class="dash-hero-title">Bienvenido al Panel EDAV</h1>
                <p class="dash-hero-desc">
                    Gestiona el contenido institucional de la Escuela de Diseño y Artes Visuales
                    desde un solo lugar: noticias y eventos.
                </p>
            </div>
            <div class="dash-hero-ornament">
                <img src="/images/LogoUas.png" alt="" />
            </div>
        </section>

        <!-- STATS -->
        <div class="stats-row">
            <div class="stat-card">
                <div class="stat-icon noticias-icon"><i class="ti ti-news"></i></div>
                <div class="stat-body">
                    <div class="stat-label">Noticias publicadas</div>
                    <div class="stat-num">
                        <span v-if="loadingStats" class="stat-loading">—</span>
                        <span v-else>{{ stats.noticias }}</span>
                    </div>
                    <div class="stat-sub">Total en el sistema</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon eventos-icon"><i class="ti ti-calendar-check"></i></div>
                <div class="stat-body">
                    <div class="stat-label">Eventos publicados</div>
                    <div class="stat-num">
                        <span v-if="loadingStats" class="stat-loading">—</span>
                        <span v-else>{{ stats.eventos }}</span>
                    </div>
                    <div class="stat-sub">Total en el sistema</div>
                </div>
            </div>

            <div class="stat-card acceso-rapido">
                <div class="stat-body">
                    <div class="stat-label">Acceso rápido</div>
                    <RouterLink to="/noticias/crear" class="quick-link">
                        <i class="ti ti-plus"></i> Nueva noticia
                    </RouterLink>
                    <RouterLink to="/eventos/crear" class="quick-link">
                        <i class="ti ti-plus"></i> Nuevo evento
                    </RouterLink>
                </div>
            </div>
        </div>

        <!-- MÓDULOS -->
        <section class="dash-section">
            <header class="dash-section-header">
                <h2 class="dash-section-title">
                    <span class="dash-section-bar"></span>
                    Módulos de gestión
                </h2>
                <span class="dash-section-hint">Selecciona un módulo para comenzar</span>
            </header>
            <div class="modules-grid">
                <RouterLink to="/noticias" class="module-card">
                    <div class="module-card-top module-top-noticias">
                        <div class="module-card-icon"><i class="ti ti-news"></i></div>
                        <span class="module-card-tag">Contenido</span>
                    </div>
                    <div class="module-card-body">
                        <h3 class="module-card-title">Noticias</h3>
                        <p class="module-card-desc">
                            Publica y administra las noticias de la escuela con imágenes, galerías y contenido
                            multimedia.
                        </p>
                    </div>
                    <div class="module-card-footer">
                        <span>Gestionar noticias</span>
                        <i class="ti ti-arrow-right"></i>
                    </div>
                </RouterLink>

                <RouterLink to="/eventos" class="module-card">
                    <div class="module-card-top module-top-eventos">
                        <div class="module-card-icon"><i class="ti ti-calendar-check"></i></div>
                        <span class="module-card-tag">Agenda</span>
                    </div>
                    <div class="module-card-body">
                        <h3 class="module-card-title">Eventos</h3>
                        <p class="module-card-desc">
                            Crea y gestiona los eventos académicos, culturales y deportivos que organiza la facultad.
                        </p>
                    </div>
                    <div class="module-card-footer">
                        <span>Gestionar eventos</span>
                        <i class="ti ti-arrow-right"></i>
                    </div>
                </RouterLink>
            </div>
        </section>

        <!-- INFO STRIP -->
        <section class="dash-section">
            <div class="info-strip">
                <div class="info-strip-icon"><i class="ti ti-building-community"></i></div>
                <div class="info-strip-text">
                    <strong>Universidad Autónoma de Sinaloa</strong>
                    <span>Escuela de Diseño y Artes Visuales · Administración web</span>
                </div>
                <div class="info-strip-actions">
                    <a href="https://edav.uas.edu.mx" target="_blank" rel="noopener" class="btn-ver-sitio">
                        <i class="ti ti-external-link"></i> Ver sitio
                    </a>
                </div>
            </div>
        </section>

    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import AdminLayout from '@/components/AdminLayout.vue'
import api from '@/services/api'

const loadingStats = ref(true)
const stats = ref({ noticias: 0, eventos: 0 })

onMounted(async () => {
    try {
        const [resN, resE] = await Promise.all([
            api.get('/news/get-all-news.php'),
            api.get('/events/get-all-events.php'),
        ])
        if (resN.data.success) stats.value.noticias = resN.data.count ?? resN.data.data?.length ?? 0
        if (resE.data.success) stats.value.eventos = resE.data.count ?? resE.data.data?.length ?? 0
    } catch { }
    finally { loadingStats.value = false }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* ─── HERO ───────────────────────────────────────────── */
.dash-hero {
    background: #0f1a8c;
    border-radius: 16px;
    padding: 40px 48px;
    color: white;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: center;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
}

.dash-hero-accent {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: #ffd500;
    border-radius: 16px 0 0 16px;
}

.dash-hero::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -10%;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 213, 0, 0.12) 0%, transparent 60%);
    pointer-events: none;
}

.dash-hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffd500;
    padding: 4px 12px;
    background: rgba(255, 213, 0, 0.12);
    border: 1px solid rgba(255, 213, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 16px;
}

.dash-hero-title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
}

.dash-hero-desc {
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.75);
    max-width: 55ch;
}

.dash-hero-ornament {
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 16px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dash-hero-ornament img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.9;
}

/* ─── STATS ──────────────────────────────────────────── */
.stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 28px;
}

.stat-card {
    background: var(--surface, white);
    border: 1px solid var(--border, #e2e8f0);
    border-radius: 14px;
    padding: 20px 22px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: background 0.25s, border-color 0.25s;
}

.stat-card.acceso-rapido {
    border-left: 3px solid #ffd500;
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
}

.noticias-icon {
    background: #eef2ff;
    color: #0f1a8c;
    border: 1px solid #c7d2fe;
}

.eventos-icon {
    background: #fffbe6;
    color: #b8860b;
    border: 1px solid #ffd500;
}

.stat-body {
    flex: 1;
}

.stat-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-muted, #94a3b8);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}

.stat-num {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-main, #1a1a2e);
    line-height: 1;
    margin-bottom: 4px;
}

.stat-loading {
    color: #c7d2fe;
}

.stat-sub {
    font-size: 12px;
    color: var(--text-muted, #94a3b8);
}

.quick-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #0f1a8c;
    text-decoration: none;
    padding: 4px 0;
    transition: color 0.15s;
}

.quick-link:hover {
    color: #ffd500;
}

.quick-link i {
    font-size: 14px;
}

/* ─── SECTIONS ───────────────────────────────────────── */
.dash-section {
    margin-bottom: 28px;
}

.dash-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 8px;
}

.dash-section-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-main, #1a1a2e);
    display: flex;
    align-items: center;
    gap: 10px;
}

.dash-section-bar {
    width: 4px;
    height: 20px;
    background: #ffd500;
    border-radius: 2px;
    display: inline-block;
}

.dash-section-hint {
    font-size: 13px;
    color: var(--text-muted, #94a3b8);
}

/* ─── MÓDULOS ────────────────────────────────────────── */
.modules-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.module-card {
    background: var(--surface, white);
    border: 1px solid var(--border, #e2e8f0);
    border-radius: 14px;
    text-decoration: none;
    color: inherit;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.25s;
}

.module-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 26, 140, 0.12);
    border-color: #c7d2fe;
}

.module-card-top {
    padding: 24px 24px 32px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    color: white;
    position: relative;
    overflow: hidden;
}

.module-top-noticias {
    background: #0f1a8c;
}

.module-top-eventos {
    background: #1a2db5;
}

.module-card-icon {
    width: 52px;
    height: 52px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
}

.module-card-tag {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 3px 10px;
    background: rgba(255, 213, 0, 0.18);
    color: #ffd500;
    border: 1px solid rgba(255, 213, 0, 0.3);
    border-radius: 20px;
}

.module-card-body {
    flex: 1;
    padding: 20px 24px 16px;
}

.module-card-title {
    font-size: 17px;
    font-weight: 700;
    color: var(--text-main, #1a1a2e);
    margin-bottom: 8px;
}

.module-card-desc {
    font-size: 13px;
    color: var(--text-sub, #64748b);
    line-height: 1.55;
}

.module-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-top: 1px solid var(--border-soft, #f1f5f9);
    color: #0f1a8c;
    font-size: 13px;
    font-weight: 600;
    background: var(--border-soft, #f8fafc);
    transition: background 0.2s;
}

.module-card:hover .module-card-footer {
    background: #eef2ff;
}

.module-card:hover .module-card-footer i {
    transform: translateX(4px);
}

.module-card-footer i {
    transition: transform 0.2s;
    font-size: 16px;
}

/* ─── INFO STRIP ─────────────────────────────────────── */
.info-strip {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background: var(--surface, white);
    border: 1px solid var(--border, #e2e8f0);
    border-radius: 14px;
    transition: background 0.25s, border-color 0.25s;
}

.info-strip-icon {
    width: 44px;
    height: 44px;
    background: #eef2ff;
    color: #0f1a8c;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    border: 1px solid #c7d2fe;
}

.info-strip-text {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.info-strip-text strong {
    font-size: 14px;
    color: var(--text-main, #1a1a2e);
    font-weight: 700;
}

.info-strip-text span {
    font-size: 12px;
    color: var(--text-muted, #94a3b8);
}

.btn-ver-sitio {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface, white);
    color: #0f1a8c;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    border: 1.5px solid #0f1a8c;
    text-decoration: none;
    transition: all 0.2s;
    white-space: nowrap;
}

.btn-ver-sitio:hover {
    background: #0f1a8c;
    color: white;
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 900px) {
    .dash-hero {
        padding: 28px 24px;
        grid-template-columns: 1fr;
    }

    .dash-hero-ornament {
        display: none;
    }

    .modules-grid {
        grid-template-columns: 1fr;
    }

    .stats-row {
        grid-template-columns: 1fr;
    }
}
</style>