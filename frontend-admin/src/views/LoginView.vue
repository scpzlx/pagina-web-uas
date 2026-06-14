<template>
    <div class="login-shell">

        <!-- Panel izquierdo — marca institucional -->
        <aside class="login-brand-panel" aria-hidden="true">
            <div class="login-brand-overlay"></div>
            <div class="login-brand-content">

                <!-- Logos -->
                <div class="login-logos">
                    <div class="login-logo-wrap">
                        <img src="/images/LogoUas.png" alt="Logo UAS">
                    </div>
                    <div class="login-logos-divider"></div>
                    <div class="login-logo-wrap">
                        <img src="/images/logoEscuelaFooter.png" alt="Logo EDAV">
                    </div>
                </div>

                <!-- Texto central -->
                <div class="login-brand-text">
                    <span class="login-brand-eyebrow">Panel Administrativo</span>
                    <h2 class="login-brand-title">Escuela de Diseño<br>y Artes Visuales</h2>
                    <p class="login-brand-sub">
                        Gestiona noticias y eventos institucionales de la EDAV · UAS desde este panel seguro.
                    </p>

                    <div class="login-brand-chips">
                        <div class="brand-chip">
                            <i class="ti ti-news" aria-hidden="true"></i>
                            <span>Gestión de Noticias</span>
                        </div>
                        <div class="brand-chip">
                            <i class="ti ti-calendar-check" aria-hidden="true"></i>
                            <span>Gestión de Eventos</span>
                        </div>
                        <div class="brand-chip">
                            <i class="ti ti-shield-check" aria-hidden="true"></i>
                            <span>Acceso Seguro</span>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="login-brand-footer">
                    <span>&copy; {{ year }} Universidad Autónoma de Sinaloa · EDAV</span>
                </div>

            </div>
        </aside>

        <!-- Panel derecho — formulario -->
        <main class="login-form-panel">
            <div class="login-card">

                <header class="login-card-header">
                    <div class="login-card-icon">
                        <i class="ti ti-shield-check" aria-hidden="true"></i>
                    </div>
                    <h1 class="login-card-title">Iniciar sesión</h1>
                    <p class="login-card-sub">Ingresa tus credenciales para acceder al panel administrativo.</p>
                </header>

                <!-- Login mobile -->
                <div class="login-logos-mobile">
                    <div class="login-logo-wrap sm">
                        <img src="/images/LogoUas.png" alt="Logo UAS">
                    </div>
                    <div class="login-logos-divider sm"></div>
                    <div class="login-logo-wrap sm">
                        <img src="/images/logoEscuelaFooter.png" alt="Logo EDAV">
                    </div>
                </div>

                <!-- Alerta error normal -->
                <div v-if="errorMsg && !bloqueado" class="login-alert login-alert--error">
                    <i class="ti ti-alert-triangle" aria-hidden="true"></i>
                    {{ errorMsg }}
                </div>

                <!-- Alerta de cuenta bloqueada con contador -->
                <div v-if="bloqueado" class="login-alert login-alert--blocked">
                    <div class="blocked-header">
                        <i class="ti ti-lock" aria-hidden="true"></i>
                        <strong>Cuenta bloqueada temporalmente</strong>
                    </div>
                    <p class="blocked-msg">Demasiados intentos fallidos. Podrás intentarlo de nuevo en:</p>
                    <div class="blocked-timer">
                        <span class="timer-digits">{{ timerDisplay }}</span>
                        <span class="timer-label">minutos : segundos</span>
                    </div>
                    <p class="blocked-hint">El bloqueo se levantará automáticamente cuando el contador llegue a cero.
                    </p>
                </div>

                <!-- Formulario — deshabilitado si está bloqueado -->
                <form class="login-form" @submit.prevent="handleLogin" novalidate>
                    <div class="form-field">
                        <label class="form-label" for="usuario">
                            <i class="ti ti-user" aria-hidden="true"></i>
                            Usuario
                        </label>
                        <input v-model="form.usuario" type="text" id="usuario" class="form-input"
                            :class="{ 'input-disabled': bloqueado }" placeholder="Tu nombre de usuario"
                            autocomplete="username" :disabled="bloqueado" @keypress.enter="focusPassword" />
                    </div>

                    <div class="form-field">
                        <label class="form-label" for="password">
                            <i class="ti ti-lock" aria-hidden="true"></i>
                            Contraseña
                        </label>
                        <div class="password-wrap">
                            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" id="password"
                                ref="passwordRef" class="form-input" :class="{ 'input-disabled': bloqueado }"
                                placeholder="Tu contraseña" autocomplete="current-password" :disabled="bloqueado" />
                            <button type="button" class="password-toggle" @click="showPassword = !showPassword"
                                :disabled="bloqueado"
                                :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                                <i :class="showPassword ? 'ti ti-eye-off' : 'ti ti-eye'" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="btn-login" :disabled="auth.loading || bloqueado"
                        :class="{ loading: auth.loading, blocked: bloqueado }">
                        <span v-if="bloqueado" class="btn-login-text">
                            <i class="ti ti-lock" aria-hidden="true"></i>
                            Cuenta bloqueada — {{ timerDisplay }}
                        </span>
                        <span v-else-if="!auth.loading" class="btn-login-text">
                            <i class="ti ti-login" aria-hidden="true"></i>
                            Entrar al panel
                        </span>
                        <span v-else class="btn-login-spinner">
                            <i class="ti ti-loader-2 spin" aria-hidden="true"></i>
                            Verificando...
                        </span>
                    </button>
                </form>

                <footer class="login-card-footer">
                    <a href="https://edav.uas.edu.mx" class="login-back-link">
                        <i class="ti ti-arrow-left" aria-hidden="true"></i>
                        Volver al sitio público
                    </a>
                </footer>

            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const year = new Date().getFullYear()
const showPassword = ref(false)
const errorMsg = ref('')
const passwordRef = ref<HTMLInputElement | null>(null)
const form = ref({ usuario: '', password: '' })

// ── Estado de bloqueo ─────────────────────────────────────────────────────────
const bloqueado = ref(false)
const segundosRestantes = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

// Formato MM:SS para el contador
const timerDisplay = computed(() => {
    const m = Math.floor(segundosRestantes.value / 60)
    const s = segundosRestantes.value % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

// Extrae los minutos del mensaje PHP — "Cuenta bloqueada. Intenta de nuevo en X minuto(s)"
function extraerMinutos(mensaje: string): number {
    const match = mensaje.match(/(\d+)\s+minuto/)
    return match && match[1] ? parseInt(match[1]) : 15
}

function iniciarContador(minutos: number) {
    // Limpiar cualquier contador previo
    if (timerInterval) clearInterval(timerInterval)

    bloqueado.value = true
    segundosRestantes.value = minutos * 60

    timerInterval = setInterval(() => {
        segundosRestantes.value--
        if (segundosRestantes.value <= 0) {
            // Tiempo terminado — desbloquear
            bloqueado.value = false
            errorMsg.value = ''
            segundosRestantes.value = 0
            if (timerInterval) clearInterval(timerInterval)
        }
    }, 1000)
}

// Limpiar el intervalo si el componente se destruye
onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval)
})

function focusPassword() {
    passwordRef.value?.focus()
}

async function handleLogin() {
    if (!form.value.usuario.trim() || !form.value.password) {
        errorMsg.value = 'Por favor completa todos los campos.'
        return
    }

    errorMsg.value = ''
    const result = await auth.login(form.value.usuario.trim(), form.value.password)

    if (result.success) {
        router.push({ name: 'Dashboard' })
        return
    }

    const msg = result.message || 'Usuario o contraseña incorrectos.'

    // Detectar si es un bloqueo de cuenta
    if (msg.toLowerCase().includes('bloqueada') || msg.toLowerCase().includes('bloqueado')) {
        const minutos = extraerMinutos(msg)
        iniciarContador(minutos)
    } else {
        errorMsg.value = msg
    }

    form.value.password = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.login-shell {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    min-height: 100vh;
    font-family: 'Outfit', sans-serif;
}

/* ── PANEL IZQUIERDO ─────────────────────── */
.login-brand-panel {
    position: relative;
    background: #0f1a8c;
    color: white;
    overflow: hidden;
    display: flex;
    align-items: stretch;
}

.login-brand-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(115deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(65deg, rgba(255, 213, 0, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
}

.login-brand-overlay {
    position: absolute;
    top: -120px;
    right: -120px;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 213, 0, 0.12) 0%, transparent 65%);
    pointer-events: none;
}

.login-brand-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 52px;
    width: 100%;
    max-width: 620px;
    margin: 0 auto;
}

/* LOGOS */

.login-logos {
    display: flex;
    align-items: center;
    gap: 14px;
}

.login-logo-wrap {
    width: 56px;
    height: 56px;
    background: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.login-logo-wrap img {
    width: 44px;
    height: 44px;
    object-fit: contain;
}

.login-logo-wrap.sm img {
    width: 34px;
    height: 36px;
}

.login-logos-divider {
    width: 1px;
    height: 36px;
    background: rgba(255, 255, 255, 0.2);
}

.login-logos-divider.sm {
    height: 28px;
    background: rgba(15, 26, 140, 0.2);
}

/* Texto brand */

.login-brand-text {
    margin-top: auto;
    padding: 40px 0;
}

.login-brand-eyebrow {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #ffd500;
    padding: 4px 12px;
    background: rgba(255, 213, 0, 0.12);
    border: 1px solid rgba(255, 213, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 18px;
}

.login-brand-title {
    font-size: 38px;
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
    color: white;
}

.login-brand-sub {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.65);
    max-width: 42ch;
    margin-bottom: 28px;
}

/* CHIPS */

.login-brand-chips {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.brand-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 10px 14px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
}

.brand-chip i {
    font-size: 16px;
    color: #ffd500;
    flex-shrink: 0;
}

/* FOOTER */
.login-brand-footer {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: 0.03em;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* ── PANEL DERECHO ───────────────────────── */
.login-form-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 32px;
    background: #f4f5f9;
}

.login-card {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    animation: fadeUp 0.4s ease;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* HEADER CARD */

.login-card-header {
    text-align: left;
}

.login-card-icon {
    width: 56px;
    height: 56px;
    background: #0f1a8c;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #ffd500;
    margin-bottom: 16px;
}

.login-card-title {
    font-size: 26px;
    font-weight: 800;
    color: #1a1a2e;
    letter-spacing: -0.3px;
    margin-bottom: 6px;
}

.login-card-sub {
    font-size: 13px;
    color: #64748b;
    line-height: 1.55;
}

/* LOGOS MOBILE - solo visible en movil */
.login-logos-mobile {
    display: none;
    align-items: center;
    justify-items: center;
    justify-content: center;
    gap: 12px;
}

.login-card-mark {
    width: 52px;
    height: 52px;
    background: #0f1a8c;
    border-radius: 12px;
    padding: 8px;
    margin-bottom: 20px;
    display: none;
}

/* ── ALERTAS ─────────────────────────────── */
.login-alert {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px 16px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
    border: 1px solid transparent;
}

.login-alert--error {
    flex-direction: row;
    align-items: center;
    gap: 10px;
    background: #fef2f2;
    color: #b91c1c;
    border-color: #fecaca;
}

.login-alert--error i {
    font-size: 16px;
    flex-shrink: 0;
}

/* Alerta de bloqueo */
.login-alert--blocked {
    background: #fffbeb;
    border-color: #fde68a;
    color: #92400e;
}

.blocked-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #78350f;
}

.blocked-header i {
    font-size: 18px;
    color: #d97706;
}

.blocked-msg {
    font-size: 13px;
    color: #92400e;
    margin: 0;
}

/* Contador visual */
.blocked-timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0 6px;
    gap: 4px;
}

.timer-digits {
    font-size: 34px;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #d97706;
    font-variant-numeric: tabular-nums;
    line-height: 1;
}

.timer-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #b45309;
    opacity: 0.7;
}

.blocked-hint {
    font-size: 12px;
    color: #b45309;
    opacity: 0.8;
    margin: 0;
}

/* ── FORMULARIO ──────────────────────────── */
.login-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
}

.form-label i {
    font-size: 14px;
    color: #0f1a8c;
}

.form-input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: #1a1a2e;
    background: white;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
    border-color: #0f1a8c;
    box-shadow: 0 0 0 3px rgba(15, 26, 140, 0.1);
}

.form-input::placeholder {
    color: #94a3b8;
}

.form-input.input-disabled {
    background: #f8fafc;
    color: #94a3b8;
    border-color: #e2e8f0;
    cursor: not-allowed;
}

.password-wrap {
    position: relative;
}

.password-wrap .form-input {
    padding-right: 44px;
}

.password-toggle {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
    font-size: 16px;
}

.password-toggle:hover:not(:disabled) {
    color: #0f1a8c;
    background: #f1f5f9;
}

/* ── BOTÓN ───────────────────────────────── */
.btn-login {
    width: 100%;
    padding: 13px;
    background: #ffd500;
    color: #0f1a8c;
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-login:hover:not(:disabled) {
    background: #ffe033;
    transform: translateY(-1px);
}

.btn-login:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn-login.blocked {
    background: #fef3c7;
    color: #92400e;
    border: 1.5px solid #fde68a;
}

.btn-login-text,
.btn-login-spinner {
    display: flex;
    align-items: center;
    gap: 8px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.spin {
    animation: spin 1s linear infinite;
    display: inline-block;
}

/* ── FOOTER ──────────────────────────────── */
.login-card-footer {
    text-align: center;
    padding-top: 18px;
    border-top: 1px solid #e2e8f0;
}

.login-back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
}

.login-back-link:hover {
    color: #0f1a8c;
}

/* ── RESPONSIVE ──────────────────────────── */
/* TABLETS */
@media (max-width: 900px) {

    .login-shell {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    /* Panel institucional superior */
    .login-brand-panel {
        min-height: auto;
        max-height: none;
    }

    .login-brand-content {
        padding: 24px 28px;
        max-width: none;
    }

    .login-brand-text {
        margin: 0;
        padding: 20px 0 0;
    }

    .login-brand-eyebrow {
        font-size: 10px;
        margin-bottom: 8px;
    }

    .login-brand-title {
        font-size: 26px;
        line-height: 1.2;
    }

    .login-brand-title br {
        display: none;
    }

    .login-brand-sub {
        font-size: 13px;
        margin-bottom: 20px;
        max-width: none;
    }

    .login-brand-footer {
        display: none;
    }

    /* Logos superiores */
    .login-logo-wrap {
        width: 48px;
        height: 48px;
    }

    .login-logo-wrap img {
        width: 36px;
        height: 36px;
    }

    .login-logos-divider {
        height: 28px;
    }

    /* Login */
    .login-form-panel {
        padding: 40px 24px;
    }

    .login-card {
        max-width: 480px;
        margin: 0 auto;
    }

    .login-card-header {
        text-align: center;
    }

    .login-card-icon {
        display: none;
    }

    .login-card-title {
        font-size: 30px;
    }

    .login-card-sub {
        font-size: 14px;
    }

    /* Logos dentro del login */
    .login-logos-mobile {
        display: flex;
    }
}


/* CELULARES */
@media (max-width: 600px) {

    .login-shell {
        display: block;
        min-height: 100vh;
    }

    /* Ocultar panel azul */
    .login-brand-panel {
        display: none;
    }

    .login-form-panel {
        min-height: 100vh;
        padding: 32px 20px;
        align-items: center;
        justify-content: center;
    }

    .login-card {
        max-width: 100%;
        gap: 20px;
    }

    .login-card-header {
        text-align: center;
    }

    .login-card-title {
        font-size: 28px;
    }

    .login-card-sub {
        font-size: 14px;
    }

    .login-logos-mobile {
        display: flex;
    }

    .login-card-icon {
        display: none;
    }

    .form-input {
        font-size: 16px;
    }

    .btn-login {
        font-size: 16px;
    }

    .login-card-footer {
        margin-top: 10px;
    }
}


/* CELULARES MUY PEQUEÑOS */
@media (max-width: 400px) {

    .login-form-panel {
        padding: 24px 16px;
    }

    .login-card-title {
        font-size: 24px;
    }

    .login-card-sub {
        font-size: 13px;
    }

    .login-logo-wrap.sm {
        width: 44px;
        height: 44px;
    }

    .login-logo-wrap.sm img {
        width: 30px;
        height: 30px;
    }

    .btn-login {
        padding: 12px;
        font-size: 15px;
    }
}
</style>