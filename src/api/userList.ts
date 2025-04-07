import axios from 'axios';
import qs from 'query-string';

// 导出一个名为 userConsultGrid 的函数，该函数接收一个参数 params
export function userConsultGrid(params: any) {
  return axios.get<any>('ztapi/user/userConsultGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function userConsultDel(data: any) {
  return axios.post<any>('ztapi/user/userConsultDel', data);
}
export function userConsultUpdate(data: any) {
  return axios.post<any>('ztapi/user/userConsultUpdate', data);
}
