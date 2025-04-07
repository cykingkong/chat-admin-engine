import axios from 'axios';
import qs from 'query-string';

export function userChannelGrid(params: any) {
  return axios.get<any>('ztapi/channel/userChannelGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function userChannelAdd(data: any) {
  return axios.post<any>('ztapi/channel/userChannelAdd', data);
}
export function userChannelDel(data: any) {
  return axios.post<any>('ztapi/channel/userChannelDel', data);
}
export function userChannelUpdate(data: any) {
  return axios.post<any>('ztapi/channel/userChannelUpdate', data);
}
