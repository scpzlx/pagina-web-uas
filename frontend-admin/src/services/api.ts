import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // necesario para que las cookies de sesión PHP viajen
})

// Interceptor de respuesta — detecta sesión expirada en cualquier llamada
api.interceptors.response.use(
    (response) => {
        // Si el PHP devuelve expired: true, redirige al login automáticamente
        if (response.data?.expired === true) {
            // Limpiar el store y redirigir
            window.dispatchEvent(new CustomEvent('session-expired'))
        }
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new CustomEvent('session-expired'))
        }
        return Promise.reject(error)
    }
)

export default api;