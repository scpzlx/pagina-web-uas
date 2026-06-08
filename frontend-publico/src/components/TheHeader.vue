<template>
    <header>
        <nav class="nav">
            <div class="nav-logos">
                <img src="/images/LogoUas.png" alt="UAS logo" class="logo-img" />
                <div class="nav-divider"></div>
                <img src="/images/logo_uas_futuro.png" alt="UAS visión futuro" class="logo-img" />
            </div>

            <div class="nav-links" :class="{ 'menu-open': menuAbierto }">
                <RouterLink to="/" class="nav-btn" @click="cerrarMenu">Inicio</RouterLink>

                <div class="nav-item" v-for="menu in menus" :key="menu.label"
                    :class="{ 'mobile-open' : menuMovilAbierto === menu.label }">
                    <button class="nav-btn" @click.stop="toggleMenuMovil(menu.label)">
                        {{ menu.label }}
                        <i class="ti ti-chevron-down"></i>
                    </button>
                    <div class="dropdown-menu">
                        <template v-for="item in menu.items" :key="item.to ?? item.divider">
                            <div v-if="item.divider" class="dropdown-divider"></div>
                            <RouterLink v-else :to="item.to!" @click="cerrarMenu">
                                <i :class="`ti ${item.icon}`" aria-hidden="true"></i>
                                {{ item.label }}
                            </RouterLink>
                        </template>
                    </div>
                </div>
            </div>

            <div class="nav-right">
                <img src="/images/logoEscuelaFooter.png" alt="Logo Escuela" class="logo-escuela">
                <button class="hamburger" :class="{ active: menuAbierto }" @click="toggleMenu" aria-label="Menú">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
        <div class="yellow-bar"></div>

        <div class="overlay" :class="{ active: menuAbierto }" @click="cerrarMenu"></div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuAbierto = ref(false)
const menuMovilAbierto = ref<string | null>(null)

function toggleMenuMovil(label: string) {
    menuMovilAbierto.value = menuMovilAbierto.value === label ? null : label
}

function toggleMenu() {
    menuAbierto.value = !menuAbierto.value
}

function cerrarMenu() {
    menuAbierto.value = false
}

const menus = [
    {
        label: 'Facultad',
        items: [
            { to: '/facultad/historia', icon: 'ti-history', label: 'Nuestra Historia y Filosofía' },
            { to: '/facultad/infraestructura', icon: 'ti-building', label: 'Infraestructura' },
            { to: '/facultad/normatividad', icon: 'ti-file-text', label: 'Normatividad' },
            { divider: true },
            { to: '/facultad/organigrama', icon: 'ti-sitemap', label: 'Organigrama' },
            { to: '/facultad/directorio', icon: 'ti-address-book', label: 'Directorio' },
            { to: '/facultad/consejos-tecnicos', icon: 'ti-users', label: 'Consejos Técnicos' },
        ],
    },
    {
        label: 'Oferta Educativa',
        items: [
            { to: '/carreras/artes-visuales', icon: 'ti-palette', label: 'Artes Visuales' },
            { to: '/carreras/diseno-arte-multimedia', icon: 'ti-devices', label: 'Diseño y Arte Multimedia' },
            { to: '/carreras/fotografia-produccion-video', icon: 'ti-camera', label: 'Fotografía y Producción de Video' },
            { to: '/carreras/musica', icon: 'ti-music', label: 'Música' },
            { to: '/carreras/musica-popular-contemporanea', icon: 'ti-vinyl', label: 'Música Popular y Contemporánea' },
            { to: '/carreras/educacion-artistica', icon: 'ti-school', label: 'Educación Artística' },
            { to: '/carreras/artes-escenicas', icon: 'ti-masks-theater', label: 'Artes Escénicas   ' },
            {divider: true},
            { to: '/posgrado/maestria-educacion-artistica', icon: 'ti-certificate', label: 'Maestría en Educación Artística' },
        ],
    },
    {
        label: 'Departamentos',
        items: [
            { to: '/departamentos/servicio-social', icon: 'ti-school', label: 'Servicio Social' },
            { to: '/departamentos/control-escolar', icon: 'ti-clipboard', label: 'Control Escolar' },
            { to: '/departamentos/biblioteca', icon: 'ti-books', label: 'Biblioteca' },
            { to: '/departamentos/vinculacion', icon: 'ti-network', label: 'Vinculación' },
            { divider: true },
            { to: '/departamentos/computo', icon: 'ti-device-desktop', label: 'Laboratorio de Cómputo' },
            { to: '/departamentos/taller-escultura', icon: 'ti-tools', label: 'Taller de Escultura' },
            { to: '/departamentos/taller-grabado', icon: 'ti-tools', label: 'Taller de Grabado' },
            { to: '/departamentos/secretaria-academica', icon: 'ti-clipboard-list', label: 'Secretaría Académica' },
            { to: '/departamentos/secretaria-administrativa', icon: 'ti-briefcase', label: 'Secretaría Administrativa' },
            { to: '/departamentos/adiuas', icon: 'ti-building-community', label: 'ADIUAS' },
        ],
    },
    {
        label: 'Difusión',
        items: [
            { to: '/eventos', icon: 'ti-calendar-event', label: 'Eventos' },
            { to: '/noticias', icon: 'ti-news', label: 'Noticias' },
        ],
    },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
    box-sizing: border-box;
}

.nav {
    background: #0f1a8c;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    font-family: 'Outfit', sans-serif;
    position: relative;
    z-index: 100;
}

.nav-logos {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.logo-img {
    height: 42px;
    object-fit: contain;
}

.nav-divider {
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.2);
    margin: 0 4px;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    justify-content: center;
}

.nav-item {
    position: relative;
}

.nav-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.85);
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: background 0.2s, color 0.2s;
    white-space: nowrap;
    text-decoration: none;
}

.nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.router-link-active.nav-btn {
    background: rgba(255, 213, 0, 0.15);
    color: #ffd500;
}

.nav-btn .ti-chevron-down {
    font-size: 13px;
    opacity: 0.7;
    transition: transform 0.2s;
}

.nav-item:hover .nav-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.nav-item:hover .ti-chevron-down {
    transform: rotate(180deg);
    opacity: 1;
}

.dropdown-menu {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background: white;
    border-radius: 12px;
    padding: 8px;
    min-width: 230px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    border: 0.5px solid rgba(0, 0, 0, 0.08);
    z-index: 200;
}

.dropdown-menu::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 0;
    right: 0;
    height: 8px;
}

.nav-item:hover .dropdown-menu {
    display: block;
}

.dropdown-menu a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    color: #1a1a2e;
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 500;
    transition: background 0.15s;
    font-family: 'Outfit', sans-serif;
}

.dropdown-menu a:hover {
    background: #f0f3ff;
    color: #0f1a8c;
}

.dropdown-menu a i {
    color: #0f1a8c;
    font-size: 16px;
    opacity: 0.6;
}

.dropdown-divider {
    height: 0.5px;
    background: rgba(0, 0, 0, 0.07);
    margin: 6px 0;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
}

.logo-escuela {
    height: 42px;
    object-fit: contain;
}

.yellow-bar {
    height: 3px;
    background: #ffd500;
}

.overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.overlay.active {
    display: block;
}

.hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 6px;
}

.hamburger span {
    width: 26px;
    height: 2px;
    background: white;
    border-radius: 2px;
    transition: 0.3s;
    display: block;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -5px);
}

@media (max-width: 1100px) {
    .hamburger {
        display: flex;
    }

    .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 300px;
        height: 100vh;
        background: #0f1a8c;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        padding: 80px 16px 24px;
        gap: 4px;
        transition: right 0.3s ease;
        z-index: 100;
        overflow-y: auto;
    }

    .nav-links.menu-open {
        right: 0;
    }

    .nav-btn {
        justify-content: space-between;
        width: 100%;
    }

    .dropdown-menu {
        position: static;
        box-shadow: none;
        background: rgba(255, 255, 255, 0.07);
        border-radius: 8px;
        margin-top: 4px;
        border: none;
        display: none;
    }

    .dropdown-menu::before {
        display: none;
    }

    .nav-item:hover .dropdown-menu {
        display: none;
    }

    .nav-item.mobile-open .dropdown-menu {
        display: block;
    }

    .dropdown-menu a {
        color: rgba(255, 255, 255, 0.85);
    }

    .dropdown-menu a:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }

    .dropdown-menu a i {
        color: #ffd500;
        opacity: 0.8;
    }

    .dropdown-divider {
        background: rgba(255, 255, 255, 0.1);
    }

    .nav-item {
        width: 100%;
    }

    .nav-right {
        z-index: 101;
        position: relative;
    }

    .hamburger {
        display: flex;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
    }

    .logo-escuela {
        display: block;
        height: 36px;
    }
}
</style>