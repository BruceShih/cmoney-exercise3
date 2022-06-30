import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const authGuard = (to, from, next) => {
  next();
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/CustomerView.vue'),
    beforeEnter: authGuard,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
