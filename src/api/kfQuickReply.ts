import axios from 'axios';
import qs from 'query-string';

export function userKfQuickReplyGrid(params: any) {
  return axios.get<any>('kfapi/reply/userKfQuickReplyGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function userKfQuickReplyAdd(data: any) {
  return axios.post<any>('kfapi/reply/userKfQuickReplyAdd', data);
}
export function userKfQuickReplyDel(data: any) {
  return axios.post<any>('kfapi/reply/userKfQuickReplyDel', data);
}
export function userKfQuickReplyUpdate(data: any) {
  return axios.post<any>('kfapi/reply/userKfQuickReplyUpdate', data);
}
