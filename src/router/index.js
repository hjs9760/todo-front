import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/Login'; // 로그인 컴포넌트를 import 한다
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', // 첫 화면을 로그인 화면으로 설정한다
      name: 'Login',
      component: Login,
    },
    {
      path: '/helloWorld', // 추가하는 path
      name: 'HelloWorld',
      component: HelloWorld, // 추가하는 컴포넌트
    },
  ],
});
