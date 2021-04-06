import * as api from '../api';

const actions = {
  async GET_KAKAO_LOGIN() {
    api.login.kakaoLogin();
  },
  async GET_NAVER_LOGIN() {
    api.login.naverLogin();
  },

  async GET_MY_CATEGORY_INFO_ALL({ commit }) {
    api.category.get().then((data) => {
      commit('SET_CATEGORY_INFO_ALL', data.data);
    });
  },

  async GET_MY_TODO_INFO_BY_SECTION({ commit }, sectionId) {
    api.todo.get(sectionId).then((data) => {
      commit('SET_TODO_INFO', data.data);
    });
  },

  async GET_MY_TODO_INFO_BY_STATUS({ commit }, status) {
    api.todo.getByStatus(status).then((data) => {
      commit('SET_TODO_INFO_ALL', data.data);
    });
  },

  async GET_MY_TODO_INFO_ALL({ commit }, todoFindForm) {
    api.todo.getAll(todoFindForm).then((data) => {
      commit('SET_TODO_INFO', data.data);
      commit('SET_START_DATE', todoFindForm.startDate);
      commit('SET_END_DATE', todoFindForm.endDate);
    });
  },

  async UPDATE_TODO_INFO({ dispatch }, todoUpdateForm) {
    await api.todo.update(todoUpdateForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_TODO_INFO_BY_SECTION', data.data);
      }
    });
  },
};

export default actions;
