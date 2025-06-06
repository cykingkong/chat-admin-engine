import axios from 'axios';
import qs from 'query-string';

export function getMenu(params: any) {
  return axios.get<any>('/api/menu/getMenu', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function insertMenu(data: any) {
  return axios.post<any>('/admin/user/insertMenu', data);
}
export function updateMenu(data: any) {
  return axios.post<any>('/admin/user/updateMenu', data);
}
// 账号管理
export function getUserPage(params: any) {
  return axios.get<any>('/ztapi/kfuser/kfUserManageGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function getToken(params: any) {
  return axios.get<any>('ztapi/kfuser/getToken', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function insertUser(data: any) {
  return axios.post<any>('/ztapi/kfuser/kfUserManageAdd', data);
}
export function updateUser(data: any) {
  return axios.post<any>('/ztapi/kfuser/kfUserManageUpdate', data);
}
export function deleteUser(data: any) {
  return axios.post<any>('/ztapi/kfuser/kfUserManageDel', data);
}

// 商户管理
export function userGrid(params: any) {
  return axios.get<any>('ztapi/user/userGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function userKfConfigInfo(params: any) {
  return axios.get<any>('ztapi/user/userKfConfigInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function userConfigInfo(params: any) {
  return axios.get<any>('ztapi/user/userConfigInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function userAdd(data: any) {
  return axios.post<any>('ztapi/user/userAdd', data);
}
export function memberEdit(data: any) {
  return axios.post<any>('/ztapi/user/memberEdit', data);
}
export function userDel(data: any) {
  return axios.post<any>('ztapi/user/userDel', data);
}
export function userUpdate(data: any) {
  return axios.post<any>('ztapi/user/userUpdate', data);
}
export function updateUserKfConfigInfo(data: any) {
  return axios.post<any>('ztapi/user/userKfConfigUpdate', data);
}
export function updateUserConfigInfo(data: any) {
  return axios.post<any>('ztapi/user/userConfigUpdate', data);
}
// 部门管理
export function getDepment(params: any) {
  return axios.get<any>('/api/department/getDepment', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function getMeunDataByDepment(params: any) {
  return axios.get<any>('/api/menu/getMeunDataByDepment', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function plantDepInfoReq() {
  return axios.get<any>('/api/department/plantDepInfoReq');
}
export function insertDepment(data: any) {
  return axios.post<any>('/api/department/insertDepment', data);
}
export function parentDepInfoReq() {
  return axios.post<any>('/api/department/parentDepInfoReq');
}
export function buildDeptMenu(data: any) {
  return axios.post<any>('/api/menu/buildDeptMenu', data);
}
export function updateDepment(data: any) {
  return axios.post<any>('/api/department/updateDepment', data);
}
