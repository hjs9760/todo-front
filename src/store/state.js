import moment from 'moment';

const state = {
  userId: '',
  userInfo: {},
  token: '',
  todoListAll: {},
  startDate: `${moment()
    .subtract(7, 'd')
    .format('YYYY-MM-DD')}`,
  endDate: `${moment().format('YYYY-MM-DD')}`,
};

export default state;
