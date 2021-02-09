import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/login/Index'; // 로그인 컴포넌트를 import
import HelloWorld from '@/components/HelloWorld';
import Signup from '@/components/login/Signup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', // 첫 화면을 로그인 화면으로 설정한다
      name: 'Index',
      component: Index,
    },
    {
      path: '/signup',
      name: 'Info',
      component: Signup,
      // component: () => import('../login/Signup.vue'),
    },

    {
      path: '/helloWorld', // 추가하는 path
      name: 'HelloWorld',
      component: HelloWorld, // 추가하는 컴포넌트
    },
  ],
});
