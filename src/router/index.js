import Vue from 'vue';
import VueRouter from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';
import store from '../store';

Vue.use(VueRouter);

const authGuard = (to, from, next) => {
  const { get } = useCookies(['stegosaurus']);
  if (get('stegosaurus')) {
    const data = get('stegosaurus');
    store.commit('authStore/setUser', data);

    if (store.getters['authStore/isAuthenticated'] === true) next();
    else next('/login');
  } else {
    store.commit('authStore/clearUser');
    next('/login');
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
      header: () => import(/* webpackChunkName: "header" */ '../components/BaseHeader.vue'),
    },
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    },
    beforeEnter: (to, from, next) => {
      if (store.getters['authStore/isAuthenticated'] === true) next('/');
      else next();
    },
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
      header: () => import(/* webpackChunkName: "header" */ '../components/BaseHeader.vue'),
    },
    beforeEnter: authGuard,
  },
  {
    path: '/customer',
    name: 'customer',
    components: {
      default: () => import(/* webpackChunkName: "customer" */ '../views/CustomerView.vue'),
      header: () => import(/* webpackChunkName: "header" */ '../components/BaseHeader.vue'),
    },
    beforeEnter: authGuard,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
