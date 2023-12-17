import { createRouter, createWebHistory } from 'vue-router' 


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
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
    path: '/productos',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'productos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/productos.vue'),
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

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


