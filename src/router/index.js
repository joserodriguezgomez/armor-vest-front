import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // Importa tu store de Vuex

const routes = [
  {
    path: '/Login',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/Dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
    meta: { requiresAuth: true }, // Añade meta propiedad para rutas que requieren autenticación
  },
  {
    path: '/usuarios',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Usuarios',
        component: () => import('@/views/Users.vue'),
      },
    ],
    meta: { requiresAuth: true }, // Añade meta propiedad para rutas que requieren autenticación
  },
  {
    path: '/reporte',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'reporte',
        component: () => import('@/views/Report.vue'),
      },
    ],
    meta: { requiresAuth: true }, // Añade meta propiedad para rutas que requieren autenticación
  },
  // Añade aquí otras rutas que necesiten autenticación
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Esta ruta requiere autenticación, verifica si el usuario está autenticado
    if (!store.getters['auth/isAuthenticated']) {
      // Si no está autenticado, redirige a la página de login
      next({
        path: '/Login',
        query: { redirect: to.fullPath }
      });
    } else {
      next(); // Asegúrate de llamar a next()
    }
  } else {
    next(); // Asegúrate de llamar a next()
  }
});

export default router;


