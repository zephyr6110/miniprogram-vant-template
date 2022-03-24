import request from '../utils/request';

export function login(data) {
  return request({
    url: '/api/data/login',
    method: 'post',
    data
  });
}

export function miniprogramLogin(data) {
  return request({
    url: '/api/data/miniProgramLogin',
    method: 'post',
    data
  });
}

export function getToken(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  });
}

export function getUserInfo(query) {
  return request({
    url: '/api/user/userInfo',
    method: 'get',
    params: query
  });
}

export function sendCode(data) {
  return request({
    url: '/api/sms/sendCode',
    method: 'post',
    data
  });
}
