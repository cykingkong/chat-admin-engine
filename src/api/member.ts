import axios from 'axios';
import qs from 'query-string';

export function shareGrid(params: any) {
  return axios.get<any>('/api/member/shareGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function logGrid(params: any) {
  return axios.get<any>('/api/member/logGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function resetPassword(data: any) {
  return axios.post<any>('/api/member/resetPassword', data);
}
export function getCaptcha() {
  return axios.post<any>('/api/member/getCaptcha');
}
export function shareUpdate(data: any) {
  return axios.post<any>('/api/member/shareUpdate', data);
}
export function getSysConfig() {
  return axios.get<any>('/api/sysConfig/getSysConfig');
}
export function getShareQrcode() {
  return axios.post<any>('/api/member/getShareQrcode');
}
export function getGetGzhQrCode() {
  return axios.post<any>('/api/member/getGetGzhQrCode');
}
// 角色管理 memberRole
export function create(data: any) {
  return axios.post<any>('/api/memberRole/create', data);
}
export function update(data: any) {
  return axios.post<any>('/api/memberRole/update', data);
}
export function grid() {
  return axios.get<any>('/api/memberRole/grid');
}
export function roleUserGrid(params: any) {
  return axios.get<any>('/api/memberRole/roleUserGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function info(params: any) {
  return axios.get<any>('/api/memberRole/info', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function getMeunDataByRole(params: any) {
  return axios.get<any>('/api/menu/getMeunDataByRole', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function buildRoleMenu(data: any) {
  return axios.post<any>('/api/menu/buildRoleMenu', data);
}
