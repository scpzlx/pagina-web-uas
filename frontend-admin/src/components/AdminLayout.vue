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

        <!-- BACKDROP MOBILE -->
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
                        <span class="page-eyebrow">Panel EDAV · {{ eyebrow }}</span>
                        <span class="page-name">{{ title }}</span>
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

            <!-- SLOT -->
            <main class="admin-content">
                <slot />
            </main>

            <footer class="admin-footer">
                <span>&copy; {{ year }} Universidad Autónoma de Sinaloa · Escuela de Diseño y Artes Visuales</span>
            </footer>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'

defineProps<{ title: string; eyebrow?: string }>()

const auth = useAuthStore()
const router = useRouter()
const { isDark, toggle } = useTheme()
const sidebarOpen = ref(false)
const year = new Date().getFullYear()
const fechaActual = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
})

function closeSidebar() { sidebarOpen.value = false }

async function handleLogout() {
    if (!confirm('¿Deseas cerrar sesión?')) return
    await auth.logout()
    router.push({ name: 'Login' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* ─── VARIABLES MODO CLARO ───────────────────────────── */
.admin-app {
    --bg: #f4f5f9;
    --surface: #ffffff;
    --border: #e2e8f0;
    --border-soft: #f1f5f9;
    --text-main: #1a1a2e;
    --text-sub: #64748b;
    --text-muted: #94a3b8;
    --topbar-bg: #ffffff;
    --footer-bg: #ffffff;
    --content-bg: #f4f5f9;
    --toggle-bg: rgba(255, 255, 255, 0.08);
    --input-bg: #ffffff;

    display: flex;
    min-height: 100vh;
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    transition: background 0.25s;
}

/* ─── VARIABLES MODO OSCURO ──────────────────────────── */
.admin-app.dark {
    --bg: #0d1117;
    --surface: #161b22;
    --border: #30363d;
    --border-soft: #21262d;
    --text-main: #e6edf3;
    --text-sub: #8b949e;
    --text-muted: #6e7681;
    --topbar-bg: #161b22;
    --footer-bg: #161b22;
    --content-bg: #0d1117;
    --toggle-bg: rgba(255, 255, 255, 0.05);
    --input-bg: #0d1117;
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
    background: var(--toggle-bg);
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
    background: var(--topbar-bg);
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
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    background: var(--content-bg);
    transition: background 0.25s;
}

/* ─── FOOTER ─────────────────────────────────────────── */
.admin-footer {
    padding: 20px 32px;
    text-align: center;
    font-size: 12px;
    color: var(--text-muted);
    border-top: 1px solid var(--border);
    background: var(--footer-bg);
    transition: background 0.25s, border-color 0.25s;
}

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 900px) {
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
}

@media (max-width: 600px) {
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