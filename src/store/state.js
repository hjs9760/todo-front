import moment from 'moment';

const state = {
  userId: '',
  userInfo: {},
  token: '',
  categoryInfo: {},
  todoInfo: {},
  sDate: `${moment().format('YYYY-MM-01 00:00:00')}`,
  eDate: `${moment()
    .endOf('months')
    .add(1, 'day')
    .format('YYYY-MM-DD 00:00:00')}`,
  type: 1,
};

export default state;
