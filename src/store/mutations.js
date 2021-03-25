import { setTokenInHeader } from '../api';

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    setTokenInHeader(token);
    localStorage.setItem('token', token);
  },
  SET_USERID(state, userId) {
    state.userId = userId;
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SET_TODO_INFO_ALL(state, categoryInfo) {
    state.categoryInfo = categoryInfo;
  },

  // ADD_MY_EXERCISE_LIST(state, exerciseList) {
  //   for (var exercise of exerciseList) {
  //     state.exerciseList.push(exercise);
  //   }
  // },

  // SET_MY_ROUTINE_LIST(state, routineList) {
  //   state.routineList = routineList;
  // },

  // SET_MY_INFO(state, myInfo) {
  //   state.myInfo = myInfo;
  // },

  // SET_CATEGORIES(state, data) {
  //   state.categoryList = data;
  // },

  // SET_MY_HISTORY_LIST(state, historyList) {
  //   state.historyList = historyList;
  // },

  // SET_MY_START_DATE(state, date) {
  //   state.startDate = date;
  // },
  // SET_MY_END_DATE(state, date) {
  //   state.endDate = date;
  // },
  // SET_ROUTINE_ID(state, routineId) {
  //   state.routineId = routineId;
  // },
};

export default mutations;
