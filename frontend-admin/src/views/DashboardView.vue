<template>
    <div class="admin-app" :class="{ dark: isDark }">

        <!-- SIDEBAR -->
        <aside class="admin-sidebar" :class="{ 'is-open': sidebarOpen }">
            <div class="sidebar-brand">
                <img src="/images/LogoUas.png" alt="UAS" class="sidebar-brand-logo" />
                <div class="sidebar-brand-text">
                    <span class="sidebar-brand-title">EDAV</span>
                    <span class="sidebar-brand-sub">Panel Admin</span>
                </div>
            </div>

            <div class="sidebar-section">
                <div class="sidebar-label">Principal</div>
                <nav>
                    <RouterLink to="/" class="nav-item" @click="closeSidebar">
                        <i class="ti ti-gauge"></i><span>Dashboard</span>
                    </RouterLink>
                </nav>
                <div class="sidebar-label" style="margin-top:20px">Módulos</div>
                <nav>
                    <RouterLink to="/noticias" class="nav-item" @click="closeSidebar">
                        <i class="ti ti-news"></i><span>Noticias</span>
                    </RouterLink>
                    <RouterLink to="/eventos" class="nav-item" @click="closeSidebar">
                        <i class="ti ti-calendar-check"></i><span>Eventos</span>
                    </RouterLink>
                    <RouterLink to="/chatbot" class="nav-item" @click="closeSidebar">
                        <i class="ti ti-robot"></i><span>Chatbot</span>
                    </RouterLink>
                </nav>
            </div>

            <div class="sidebar-footer">
                <!-- TOGGLE MODO OSCURO -->
                <button type="button" class="nav-item theme-toggle" @click="toggle">
                    <i :class="isDark ? 'ti ti-sun' : 'ti ti-moon'"></i>
                    <span>{{ isDark ? 'Modo claro' : 'Modo oscuro' }}</span>
                    <div class="theme-pill" :class="{ on: isDark }">
                        <div class="theme-pill-dot"></div>
                    </div>
                </button>

                <a href="https://edav.uas.edu.mx" target="_blank" rel="noopener" class="nav-item">
                    <i class="ti ti-external-link"></i><span>Ver sitio público</span>
                </a>
                <button type="button" class="nav-item nav-item-logout" @click="handleLogout">
                    <i class="ti ti-logout"></i><span>Cerrar sesión</span>
                </button>
            </div>
        </aside>

        <!-- BACKDROP -->
        <div class="sidebar-backdrop" :class="{ 'is-open': sidebarOpen }" @click="closeSidebar"></div>

        <!-- MAIN -->
        <div class="admin-main">

            <!-- TOPBAR -->
            <header class="admin-topbar">
                <div class="topbar-left">
                    <button type="button" class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
                        <i class="ti ti-menu-2"></i>
                    </button>
                    <div class="page-title">
                        <span class="page-eyebrow">Panel EDAV</span>
                        <span class="page-name">Dashboard</span>
                    </div>
                </div>
                <div class="topbar-right">
                    <span class="topbar-date"><i class="ti ti-calendar"></i> {{ fechaActual }}</span>
                    <div class="topbar-user">
                        <div class="user-avatar">{{ auth.usuario?.charAt(0).toUpperCase() }}</div>
                        <div class="user-meta">
                            <span class="user-name">{{ auth.usuario }}</span>
                            <span class="user-role">Administrador</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- CONTENT -->
            <main class="admin-content">

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
                                    Crea y gestiona los eventos académicos, culturales y deportivos que organiza la
                                    facultad.
                                </p>
                            </div>
                            <div class="module-card-footer">
                                <span>Gestionar eventos</span>
                                <i class="ti ti-arrow-right"></i>
                            </div>
                        </RouterLink>
                        <RouterLink to="/chatbot" class="module-card">
                            <div class="module-card-top module-top-chatbot">
                                <div class="module-card-icon"><i class="ti ti-robot"></i></div>
                                <span class="module-card-tag">Asistente</span>
                            </div>
                            <div class="module-card-body">
                                <h3 class="module-card-title">Chatbot</h3>
                                <p class="module-card-desc">
                                    Configura las categorías, subcategorías, preguntas y respuestas del asistente
                                    virtual del sitio público.
                                </p>
                            </div>
                            <div class="module-card-footer">
                                <span>Gestionar chatbot</span>
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
                            <a href="https://edav.uas.edu.mx" target="_blank" rel="noopener" class="btn-secondary">
                                <i class="ti ti-external-link"></i> Ver sitio
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            <footer class="admin-footer">
                <span>&copy; {{ year }} Universidad Autónoma de Sinaloa · Escuela de Diseño y Artes Visuales</span>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'
import api from '@/services/api'

const auth = useAuthStore()
const router = useRouter()
const { isDark, toggle } = useTheme()

const sidebarOpen = ref(false)
const year = new Date().getFullYear()
const loadingStats = ref(true)
const stats = ref({ noticias: 0, eventos: 0 })

const fechaActual = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
})

function closeSidebar() { sidebarOpen.value = false }

async function handleLogout() {
    if (!confirm('¿Deseas cerrar sesión?')) return
    await auth.logout()
    router.push({ name: 'Login' })
}

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

/* ─── VARIABLES ──────────────────────────────────────── */
.admin-app {
    --bg: #f4f5f9;
    --surface: #ffffff;
    --border: #e2e8f0;
    --border-soft: #f1f5f9;
    --text-main: #1a1a2e;
    --text-sub: #64748b;
    --text-muted: #94a3b8;

    display: flex;
    min-height: 100vh;
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    transition: background 0.25s;
}

.admin-app.dark {
    --bg: #0d1117;
    --surface: #161b22;
    --border: #30363d;
    --border-soft: #21262d;
    --text-main: #e6edf3;
    --text-sub: #8b949e;
    --text-muted: #6e7681;
}

/* ─── SIDEBAR ────────────────────────────────────────── */
.admin-sidebar {
    width: 240px;
    flex-shrink: 0;
    background: #0f1a8c;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 200;
    transition: transform 0.25s ease;
}

.sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-brand-logo {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 8px;
    padding: 4px;
    object-fit: contain;
    flex-shrink: 0;
}

.sidebar-brand-title {
    font-size: 16px;
    font-weight: 800;
    color: white;
    display: block;
}

.sidebar-brand-sub {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    display: block;
}

.sidebar-section {
    flex: 1;
    padding: 20px 12px;
    overflow-y: auto;
}

.sidebar-label {
    font-size: 10px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 10px;
    margin-bottom: 6px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-family: 'Outfit', sans-serif;
}

.nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.nav-item.router-link-active {
    background: rgba(255, 213, 0, 0.15);
    color: #ffd500;
}

.nav-item i {
    font-size: 18px;
    flex-shrink: 0;
}

.sidebar-footer {
    padding: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.nav-item-logout {
    color: rgba(255, 100, 100, 0.8);
}

.nav-item-logout:hover {
    background: rgba(255, 100, 100, 0.1);
    color: #ff6b6b;
}

/* ─── THEME TOGGLE ───────────────────────────────────── */
.theme-toggle {
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.7);
}

.theme-toggle:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffd500;
}

.theme-pill {
    width: 32px;
    height: 18px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 9px;
    padding: 2px;
    transition: background 0.25s;
    flex-shrink: 0;
    display: flex;
    align-items: center;
}

.theme-pill.on {
    background: #ffd500;
}

.theme-pill-dot {
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    transition: transform 0.25s;
}

.theme-pill.on .theme-pill-dot {
    transform: translateX(14px);
}

/* ─── BACKDROP ───────────────────────────────────────── */
.sidebar-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 199;
}

/* ─── MAIN ───────────────────────────────────────────── */
.admin-main {
    flex: 1;
    margin-left: 240px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* ─── TOPBAR ─────────────────────────────────────────── */
.admin-topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background 0.25s, border-color 0.25s;
}

.topbar-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.topbar-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

.sidebar-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 22px;
    color: var(--text-sub);
    padding: 4px;
    border-radius: 6px;
}

.sidebar-toggle:hover {
    background: var(--border-soft);
    color: #0f1a8c;
}

.page-eyebrow {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
}

.page-name {
    font-size: 16px;
    font-weight: 700;
    color: var(--text-main);
    display: block;
}

.topbar-date {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--text-sub);
}

.topbar-user {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-avatar {
    width: 36px;
    height: 36px;
    background: #0f1a8c;
    color: #ffd500;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 800;
    flex-shrink: 0;
}

.user-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-main);
    display: block;
}

.user-role {
    font-size: 11px;
    color: var(--text-muted);
    display: block;
}

/* ─── CONTENT ────────────────────────────────────────── */
.admin-content {
    flex: 1;
    padding: 32px;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    background: var(--bg);
    transition: background 0.25s;
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
    background: var(--surface);
    border: 1px solid var(--border);
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
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}

.stat-num {
    font-size: 28px;
    font-weight: 800;
    color: var(--text-main);
    line-height: 1;
    margin-bottom: 4px;
}

.stat-loading {
    color: #c7d2fe;
}

.stat-sub {
    font-size: 12px;
    color: var(--text-muted);
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
    color: var(--text-main);
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
    color: var(--text-muted);
}

/* ─── MÓDULOS ────────────────────────────────────────── */
.modules-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.module-card {
    background: var(--surface);
    border: 1px solid var(--border);
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

.module-top-chatbot {
    background: #2536c9;
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
    color: var(--text-main);
    margin-bottom: 8px;
}

.module-card-desc {
    font-size: 13px;
    color: var(--text-sub);
    line-height: 1.55;
}

.module-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-top: 1px solid var(--border-soft);
    color: #0f1a8c;
    font-size: 13px;
    font-weight: 600;
    background: var(--border-soft);
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
    background: var(--surface);
    border: 1px solid var(--border);
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
    color: var(--text-main);
    font-weight: 700;
}

.info-strip-text span {
    font-size: 12px;
    color: var(--text-muted);
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface);
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

.btn-secondary:hover {
    background: #0f1a8c;
    color: white;
}

/* ─── FOOTER ─────────────────────────────────────────── */
.admin-footer {
    padding: 20px 32px;
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
    background: var(--surface);
    transition: background 0.25s, border-color 0.25s;
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width:900px) {
    .admin-sidebar {
        transform: translateX(-100%);
    }

    .admin-sidebar.is-open {
        transform: translateX(0);
    }

    .sidebar-backdrop.is-open {
        display: block;
    }

    .admin-main {
        margin-left: 0;
    }

    .sidebar-toggle {
        display: flex;
    }

    .topbar-date {
        display: none;
    }

    .admin-content {
        padding: 20px;
    }

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

@media (max-width:600px) {
    .admin-topbar {
        padding: 0 16px;
    }

    .admin-content {
        padding: 16px;
    }

    .topbar-right .user-meta {
        display: none;
    }
}
</style>