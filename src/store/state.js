import moment from 'moment';

const state = {
  userInfo: {},
  token: '',
  categoryInfo: {},
  todoInfo: {},
  sDate: `${moment().format('YYYY-MM-01 00:00:00')}`,
  eDate: `${moment()
    .endOf('months')
    .add(1, 'day')
    .format('YYYY-MM-DD 00:00:00')}`,
  showType: 1,
  sectionId: '',
  leftType: 1,
  noticeInfo: [],
  shareCategoryInfo: [],
};

export default state;
