import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueMaterial from './plugins/VueMaterial';
// import vuetify from './plugins/vuetify';
// import moment from 'vue-moment';
// import Datetime from 'vue-datetime';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  // vuetify,
  VueMaterial,
  // moment,
  // Datetime,
}).$mount('#app');
