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
      commit('SET_TODO_INFO', data.data);
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
    api.todo.update(todoUpdateForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_TODO_INFO_BY_SECTION', data.data);
      }
    });
  },

  async CREATE_CATEGORY({ dispatch }, categorySaveForm) {
    api.category.create(categorySaveForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_CATEGORY_INFO_ALL', data.data);
      }
    });
  },

  async CREATE_TODO({ dispatch }, todoSaveForm) {
    api.todo.create(todoSaveForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_TODO_INFO_BY_SECTION', todoSaveForm.sectionId);
      }
    });
  },

  async CREATE_SECTION({ dispatch }, sectionSaveForm) {
    api.section.create(sectionSaveForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_CATEGORY_INFO_ALL');
      }
    });
  },

  async UPDATE_SECTION({ dispatch }, sectionUpdateForm) {
    api.section.update(sectionUpdateForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_CATEGORY_INFO_ALL');
      }
    });
  },

  async DELETE_SECTION({ dispatch }, sectionId) {
    api.section.delete(sectionId).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_CATEGORY_INFO_ALL');
        dispatch('GET_MY_TODO_INFO_BY_SECTION', sectionId);
      }
    });
  },

  async UPDATE_CATEGORY({ dispatch }, categoryUpdateForm) {
    api.category.update(categoryUpdateForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_CATEGORY_INFO_ALL');
      }
    });
  },

  async DELETE_CATEGORY({ dispatch }, categoryId) {
    api.category.delete(categoryId).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_CATEGORY_INFO_ALL');
      }
    });
  },

  async GET_MY_NOTICE_INFO({ commit }) {
    api.notice.get().then((data) => {
      commit('SET_NOTICE_INFO', data.data);
    });
  },

  async DELETE_NOTICE({ dispatch }, noticeId) {
    api.notice.delete(noticeId).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_NOTICE_INFO');
      }
    });
  },

  async UPDATE_NOTICE({ dispatch }, noticeUpdateForm) {
    api.notice.update(noticeUpdateForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_NOTICE_INFO');
      }
    });
  },

  async CREATE_NOTICE({ dispatch }, noticeSaveForm) {
    api.notice.create(noticeSaveForm).then((data) => {
      alert(data.message);
      if (data.code == '200') {
        dispatch('GET_MY_NOTICE_INFO');
      }
    });
  },

  async SHARE_CATEGORY({ dispatch }, categoryId) {
    api.category.share(categoryId).then(() => {
      dispatch('GET_MY_CATEGORY_INFO_ALL');
    });
  },
  async GET_MY_CATEGORY_SHARE_INFO({ commit }) {
    api.category.findShare().then((data) => {
      commit('SET_SHARE_CATEGORY_INFO', data.data);
    });
  },
};

export default actions;
