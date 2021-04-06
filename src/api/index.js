import axios from 'axios';
import router from '../router';

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

export const category = {
  get() {
    return request('get', `/category/find`);
  },
};

export const todo = {
  get(sectionId) {
    return request('get', `/todo/find/${sectionId}`);
  },
  getByStatus(status) {
    return request('get', `/todo/find/${status}`);
  },
  getAll(todoFindForm) {
    return request('post', `/todo/findAll`, todoFindForm);
  },
  update(todoUpdateForm) {
    return request('post', `/todo/update`, todoUpdateForm);
  },
};
