import { createRouter, createWebHistory } from 'vue-router' 


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/autenticacion.vue'),
        
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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
      },
      
    ],
  },
  {
    path: '/ventas',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Ventas',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Ventas.vue'),
        
      },
    ],
  },
  {
    path: '/clientes',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'clientes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Clientes.vue'),
      },
      
    ],
  },
  {
    path: '/polizas',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'polizas',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/PolizaView.vue'),
      },
      
    ],
  },
  {
    path: '/chalecos',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'chalecos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ChalecoView.vue'),
      },
      
    ],
  },
  {
    path: '/usuarios',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'usuarios',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Usuario.vue'),
      },
      
    ],
  },
  {
    path: '/formulario',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'formulario',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/components/Modulo-ventas/Formulario'),
      },
      
    ],
  },
  {
    path: '/ingresos',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ingresos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ingreso.vue'),
      },
      
    ],
  },
  {
    path: '/actualizacion',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'actualizacion',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/actualizacion.vue'),
      },
      
    ],
  },
  {
    path: '/muestras',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'muestras',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/muestras.vue'),
      },
      
    ],
  },
  {
    path: '/devoluciones',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'devoluciones',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/devoluciones.vue'),
      },
      
    ],
  },
  {
    path: '/noidic',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'noidic',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/noidic.vue'),
      },
      
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


