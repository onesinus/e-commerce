import Vue from 'vue';
import VueRouter from 'vue-router';
import Ebooks from './components/Ebooks.vue';
import Tutorials from './components/Tutorials.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { requiresAuth: true },
  },
  {
    path: '/ebooks',
    component: Ebooks,
    name: 'ebooks',
    meta: { requiresAuth: true },
  },
  {
    path: '/tutorials',
    component: Tutorials,
    name: 'tutorials',
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
  },
];

// Vue Router Config
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
});
// End Router Config

// Redirect before login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        name: 'login',
      });
    }
  } else if (['/login', '/register'].includes(to.path) && token) {
    next({
      name: 'home',
    });
  } else {
    next();
  }
});
// End Redirect


export default router;
