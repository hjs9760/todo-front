import loginAPI from './loginAPI';
import axios from 'axios';
import router from '../router';

export default {
  async login(uid, password) {
    try {
      const loginResponse = await loginAPI.login(uid, password);
      return loginResponse;
    } catch (err) {
      console.error(err);
    }
  },
};

////
const DOMAIN = 'http://localhost:8080';
const UNAUTHORIZED = 401;

const onUnauthorized = () => {
  router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`);
};

export function setTokenInHeader(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((result) => result.data)
    .catch((result) => {
      const { status } = result.response;

      if (status === UNAUTHORIZED) onUnauthorized();

      throw result.response;
    });
};

export const exercise = {
  get() {
    return request('get', `/exercise/findList`);
  },
  create(data) {
    return request('post', '/exercise/save', data);
  },
  update(data) {
    return request('post', `/exercise/update`, data);
  },
  delete(id) {
    return request('post', `/exercise/remove/${id}`);
  },

  getCategories() {
    return request('get', '/categories');
  },
};

export const login = {
  create(data) {
    return request('post', `/member/signUp`, data);
  },

  kakaoLogin() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  },
  naverLogin() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  },
};
