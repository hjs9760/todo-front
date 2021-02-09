import * as api from '../api';
import axios from 'axios';

// import moment from 'moment';

const actions = {
  async SIGNUP(data) {
    axios.post('http://localhost:8080/member/signUp', {
      params: {
        signUpForm: data,
      },
    });

    // return api.login.create(data);
    //.then((data) => commit('SET__ID', routineId));
  },
  async GET_KAKAO_LOGIN() {
    api.login.kakaoLogin();
  },
  async GET_NAVER_LOGIN() {
    api.login.naverLogin();
  },

  ////
  // async CREATE_ROUTINE({ dispatch, commit }, data) {
  //   return api.routine
  //     .create(data)
  //     .then((routineId) =>
  //       dispatch('GET_MY_ROUTINE_LIST', commit('SET_ROUTINE_ID', routineId))
  //     );
  // },
  // async UPDATE_ROUTINE({ dispatch }, data) {
  //   return api.routine.update(data).then(() => dispatch('GET_MY_ROUTINE_LIST'));
  // },
  // async DELETE_ROUTINE({ dispatch }, id) {
  //   return api.routine
  //     .delete(id)
  //     .then((value) =>
  //       dispatch(
  //         'GET_MY_ROUTINE_LIST',
  //         value == 0
  //           ? alert('정상적으로 삭제되었습니다.')
  //           : alert('삭제에 실패하였습니다.')
  //       )
  //     );
  // },
  // async GET_MY_INFO({ commit }) {
  //   return api.member.get().then((data) => {
  //     commit('SET_MY_INFO', data);
  //   });
  // },
  // async GET_MY_HISTORY_LIST({ commit }, date) {
  //   api.history.get(date).then((data) => {
  //     commit('SET_MY_HISTORY_LIST', data);
  //   });
  // },
  // async CREATE_MY_HISTORY_LIST({ dispatch }, data) {
  //   api.history.create(data).then(() => {
  //     dispatch('GET_MY_HISTORY_LIST', {
  //       startDate: `${moment()
  //         .subtract(7, 'd')
  //         .format('YYYY-MM-DD 00:00:00')}`,
  //       endDate: `${moment().format('YYYY-MM-DD 00:00:00')}`,
  //     });
  //   });
  // },
};

export default actions;
