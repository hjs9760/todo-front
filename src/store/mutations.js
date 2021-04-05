import { setTokenInHeader } from '../api';
import moment from 'moment';

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
  SET_CATEGORY_INFO_ALL(state, categoryInfo) {
    state.categoryInfo = categoryInfo;
  },
  SET_TODO_INFO(state, todoInfo) {
    state.todoInfo = todoInfo;
  },
  SET_TYPE(state, type) {
    state.type = type;
  },
  SET_START_DATE(state, startDate) {
    state.sDate = `${moment(startDate).format('YYYY-MM-DD 00:00:00')}`;
  },
  SET_END_DATE(state, endDate) {
    state.eDate = `${moment(endDate).format('YYYY-MM-DD 00:00:00')}`;
  },
};

export default mutations;
