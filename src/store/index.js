import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  plugins: [createPersistedState()],
});

store.commit('SET_TOKEN', localStorage.token);

export default store;
