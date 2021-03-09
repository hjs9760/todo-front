import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  if (store.state.token != 'undefined') {
    return next();
  }
  alert('로그인 후 이용이 가능한 서비스입니다.');
  next('/login');
};

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    beforeEnter: requireAuth(),
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/login/Index.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/login/Signup.vue'),
  },
  {
    path: '/checkEmail',
    name: 'CheckEmail',
    component: () => import('../components/login/CheckEmail.vue'),
  },

  {
    path: '/oauth-callback',
    name: 'OauthCallBack',
    component: () => import('../components/login/OauthCallBack.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

export default router;
