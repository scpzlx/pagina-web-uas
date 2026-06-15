import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const usuario = ref('')
    const rol = ref('')
    const loading = ref(false)
    const sessionChecked = ref(false)

    async function checkSession() {
        try {
            const res = await api.get('/auth/auth.php?action=check_session')
            if (res.data?.expired) {
                isAuthenticated.value = false
                usuario.value = ''
                rol.value = ''
                return false
            }
            if (res.data.success && res.data.data?.logged_in) {
                isAuthenticated.value = true
                usuario.value = res.data.data.usuario || ''
                rol.value = res.data.data.rol || 'admin'
                return true
            }

        } catch {
            isAuthenticated.value = false
            usuario.value = ''
            rol.value = ''
            return false
        } finally {
            sessionChecked.value = true
        }
    }

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
                rol.value = res.data.data?.rol || 'admin'
                return { success: true }
            }
            return { success: false, message: res.data.message || 'Credenciales incorrectas' }
        } catch {
            return { success: false, message: 'Error de conexión. Intenta de nuevo.' }
        } finally {
            loading.value = false
        }
    }

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
        rol.value = ''
    }

    return { isAuthenticated, usuario, rol, loading, sessionChecked, checkSession, login, logout }  // ← rol en el return
})

export function useSessionExpiredHandler() {
    const router = useRouter()
    const auth = useAuthStore()

    function handleExpired() {
        auth.isAuthenticated = false
        auth.usuario = ''
        router.push({ name: 'Login' })
    }

    onMounted(() => { window.addEventListener('session-expired', handleExpired) })
    onUnmounted(() => { window.removeEventListener('session-expired', handleExpired) })
}