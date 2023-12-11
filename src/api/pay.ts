import axios from 'axios';
import qs from 'query-string';

export function createOrder(data: any) {
  return axios.post<any>('/api/pay/createOrder', data);
}

export function codeCheck(params: any) {
  return axios.get<any>('/api/pay/codeCheck', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function orderList(data: any) {
  return axios.post<any>('/api/pay/orderList', data);
}
export function getOrderPayStatus(params: any) {
  return axios.get<any>('/api/pay/getOrderPayStatus', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
