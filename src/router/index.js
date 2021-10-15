import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import decode from 'jwt-decode'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signUp" */ '../views/SignUp.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {requiresAuth: true},
    children: [
      {
        path: 'usuarios',
        name: 'Usuarios',
        meta: {
          Administrador: true
        },
        component: () => import(/* webpackChunkName: "usuarios" */ '../components/UsuariosDT.vue')
      },
      {
        path: 'articulos',
        name: 'Articulos',
        component: () => import(/* webpackChunkName: "articulos" */ '../components/ArticulosDT.vue')
      },
      {
        path: 'categorias',
        name: 'Categorias',
        component: () => import(/* webpackChunkName: "categorias" */ '../components/CategoriasDT.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let token = localStorage.getItem('token');
    if (!token) {
      next({
        name: 'Login',
        //query: { redirect: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.Administrador)){
        let decodeToken = decode(token)
        if (decodeToken["rol"] === 'Administrador') {
          next()
        }else{
          next({
            name: 'Admin'
          })
        }
      }
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
