import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    // Inicio
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },

    // Facultad
    {
      path: '/facultad/historia',
      name: 'historia',
      component: () => import('../views/facultad/HistoriaView.vue'),
    },
    {
      path: '/facultad/infraestructura',
      name: 'infraestructura',
      component: () => import('../views/facultad/InfraestructuraView.vue'),
    },
    {
      path: '/facultad/normatividad',
      name: 'normatividad',
      component: () => import('../views/facultad/NormatividadView.vue'),
    },
    {
      path: '/facultad/organigrama',
      name: 'organigrama',
      component: () => import('../views/facultad/OrganigramaView.vue'),
    },
    {
      path: '/facultad/directorio',
      name: 'directorio',
      component: () => import('../views/facultad/DirectorioView.vue'),
    },
    {
      path: '/facultad/consejos-tecnicos',
      name: 'consejos-tecnicos',
      component: () => import('../views/facultad/ConsejosTecnicosView.vue'),
    },

    // Carreras
    {
      path: '/carreras/artes-visuales',
      name: 'artes-visuales',
      component: () => import('../views/carreras/ArtesVisualesView.vue'),
    },
    {
      path: '/carreras/diseno-arte-multimedia',
      name: 'diseno-arte-multimedia',
      component: () => import('../views/carreras/DisenoArteMultimediaView.vue'),
    },
    {
      path: '/carreras/fotografia-produccion-video',
      name: 'fotografia-produccion-video',
      component: () => import('../views/carreras/FotografiaProduccionVideoView.vue'),
    },
    {
      path: '/carreras/musica',
      name: 'musica',
      component: () => import('../views/carreras/MusicaView.vue'),
    },
    {
      path: '/carreras/musica-popular-contemporanea',
      name: 'musica-popular',
      component: () => import('../views/carreras/MusicaPopularView.vue'),
    },
    {
      path: '/carreras/educacion-artistica',
      name: 'educacion-artistica',
      component: () => import('../views/carreras/EducacionArtisticaView.vue'),
    },
    {
      path: '/carreras/artes-escenicas',
      name: 'artes-escenicas',
      component: () => import('../views/carreras/ArtesEscenicasView.vue'),
    },

    // Posgrado
    {
      path: '/posgrado/maestria-educacion-artistica',
      name: 'maestria-educacion-artistica',
      component: () => import('../views/posgrado/MaestriaEducacionArtisticaView.vue'),
    },

    // Departamentos
    {
      path: '/departamentos/servicio-social',
      name: 'servicio-social',
      component: () => import('../views/departamentos/ServicioSocialView.vue'),
    },
    {
      path: '/departamentos/control-escolar',
      name: 'control-escolar',
      component: () => import('../views/departamentos/ControlEscolarView.vue'),
    },
    {
      path: '/departamentos/biblioteca',
      name: 'biblioteca',
      component: () => import('../views/departamentos/BibliotecaView.vue'),
    },
    {
      path: '/departamentos/vinculacion',
      name: 'vinculacion',
      component: () => import('../views/departamentos/VinculacionView.vue'),
    },
    {
      path: '/departamentos/computo',
      name: 'computo',
      component: () => import('../views/departamentos/ComputoView.vue'),
    },
    {
      path: '/departamentos/taller-escultura',
      name: 'taller-escultura',
      component: () => import('../views/departamentos/TallerEsculturaView.vue'),
    },
    {
      path: '/departamentos/taller-grabado',
      name: 'taller-grabado',
      component: () => import('../views/departamentos/TallerGrabadoView.vue'),
    },
    {
      path: '/departamentos/secretaria-academica',
      name: 'secretaria-academica',
      component: () => import('../views/departamentos/SecretariaAcademicaView.vue'),
    },
    {
      path: '/departamentos/secretaria-administrativa',
      name: 'secretaria-administrativa',
      component: () => import('../views/departamentos/SecretariaAdministrativaView.vue'),
    },
    {
      path: '/departamentos/adiuas',
      name: 'adiuas',
      component: () => import('../views/departamentos/AdiuasView.vue'),
    },

    // Difusión
    {
      path: '/noticias',
      name: 'noticias',
      component: () => import('../views/difusion/NoticiasView.vue'),
    },
    {
      path: '/noticias/:id',
      name: 'noticia-detalle',
      component: () => import('../views/difusion/NoticiaDetalleView.vue'),
    },
    {
      path: '/eventos',
      name: 'eventos',
      component: () => import('../views/difusion/EventosView.vue'),
    },
    {
      path: '/eventos/:id',
      name: 'evento-detalle',
      component: () => import('../views/difusion/EventoDetalleView.vue'),
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router