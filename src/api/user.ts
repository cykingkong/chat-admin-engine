import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import qs from 'query-string';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: any) {
  return axios.post<any>('/ztapi/user/login', data);
}
export function ssoToken(params: any) {
  return axios.get<any>('/api/member/ssoToken', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function logout() {
  return axios.post<any>('/api/user/logout');
}

export function getUserInfo() {
  return axios.get<any>('/ztapi/user/info');
}

export function updateUser(data: any) {
  return axios.post<any>('/api/member/memberEdit', data);
}
export function memberMsgEdit(data: any) {
  return axios.post<any>('/api/member/memberMsgEdit', data);
}
// 根据角色ID 去获取菜单
export function getMenu() {
  return axios.get<any[]>('/api/menu/getRoleMenu');
}

// export function getMenu() {
//   return axios.get<any[]>('/api/menu/getMenu');
// }
export function editAgent(data: any) {
  return axios.post<any>('/agent/editAgent', data);
}

export function sendSms(data: any) {
  return axios.post<any>('/api/member/sendSms', data);
}

export function smsLogin(data: any) {
  return axios.post<any>('/api/member/smsLogin', data);
}

export function changeGuidance(data: any) {
  return axios.post<any>('/api/member/changeGuidance', data);
}

export function memberMsg(params: any) {
  return axios.get<any>('/api/member/memberMsgGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

// 获取二次验证码

export function getUserAuth(data: any) {
  return axios.post<any>('ztapi/user/userAuth', data);
}
