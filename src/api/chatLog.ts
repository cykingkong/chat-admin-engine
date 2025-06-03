import axios from 'axios';
import qs from 'query-string';

export function getChatLog(params: any) {
  return axios.get<any>('ztapi/kfuser/chatLog', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function chatUser(params: any) {
  return axios.get<any>('ztapi/kfuser/chatUser', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
