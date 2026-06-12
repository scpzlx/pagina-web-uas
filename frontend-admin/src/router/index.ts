import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/noticias',
      name: 'Noticias',
      component: () => import('../views/noticias/NoticiasListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/noticias/crear',
      name: 'NoticiaCreate',
      component: () => import('../views/noticias/NoticiaCreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/noticias/editar/:id',
      name: 'NoticiaEdit',
      component: () => import('../views/noticias/NoticiaEditView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/eventos',
      name: 'Eventos',
      component: () => import('../views/eventos/EventosListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/eventos/crear',
      name: 'EventoCreate',
      component: () => import('../views/eventos/EventoCreateView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/eventos/editar/:id',
      name: 'EventoEdit',
      component: () => import('../views/eventos/EventoEditView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/chatbot',
      name: 'Chatbot',
      component: () => import('../views/chatbot/ChatbotView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// Guarda global de autenticación
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Verificar sesión en el servidor si no sabemos el estado
  if (!auth.isAuthenticated) {
    await auth.checkSession()
  }

  // Ruta protegida y no autenticado → login
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Login' }
  }

  // Ya autenticado intenta ir al login → dashboard
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    return { name: 'Dashboard' }
  }
})

export default router