import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const usuario = ref('')
    const loading = ref(false)

    // ─── Check session ────────────────────────────────────────────────────────
    async function checkSession() {
        try {
            const res = await api.get('/auth/auth.php?action=check_session')

            // Sesión expirada
            if (res.data?.expired) {
                isAuthenticated.value = false
                usuario.value = ''
                return false
            }

            if (res.data.success && res.data.data?.logged_in) {
                isAuthenticated.value = true
                usuario.value = res.data.data.usuario || ''
                return true
            }
        } catch { }

        isAuthenticated.value = false
        usuario.value = ''
        return false
    }

    // ─── Login ────────────────────────────────────────────────────────────────
    async function login(usuarioInput: string, password: string) {
        loading.value = true
        try {
            const form = new FormData()
            form.append('action', 'login')
            form.append('usuario', usuarioInput)
            form.append('password', password)

            const res = await api.post('/auth/auth.php', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (res.data.success) {
                isAuthenticated.value = true
                usuario.value = res.data.data?.usuario || usuarioInput
                return { success: true }
            }

            // Devolver el mensaje exacto del PHP (incluye "Intentos restantes: X" o "Cuenta bloqueada")
            return { success: false, message: res.data.message || 'Credenciales incorrectas' }

        } catch {
            return { success: false, message: 'Error de conexión. Intenta de nuevo.' }
        } finally {
            loading.value = false
        }
    }

    // ─── Logout ───────────────────────────────────────────────────────────────
    async function logout() {
        try {
            const form = new FormData()
            form.append('action', 'logout')
            await api.post('/auth/auth.php', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        } catch { }

        isAuthenticated.value = false
        usuario.value = ''
    }

    return { isAuthenticated, usuario, loading, checkSession, login, logout }
})

// ─── Composable para manejar sesión expirada en cualquier componente ──────────
// Úsalo en App.vue para que funcione globalmente
export function useSessionExpiredHandler() {
    const router = useRouter()
    const auth = useAuthStore()

    function handleExpired() {
        auth.isAuthenticated = false
        auth.usuario = ''
        router.push({ name: 'Login' })
    }

    onMounted(() => {
        window.addEventListener('session-expired', handleExpired)
    })

    onUnmounted(() => {
        window.removeEventListener('session-expired', handleExpired)
    })
}