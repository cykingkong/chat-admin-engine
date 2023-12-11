import axios from 'axios';
import qs from 'query-string';

// type 1短视频  2直播间
export function getCustomColumn(params: any) {
  return axios.get<any>('/api/member/getCustomColumn', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function setCustomColumn(data: any) {
  return axios.post<any>('/api/member/setCustomColumn', data);
}
export function getLiveCustomColumn() {
  return axios.get<any>('/api/live-customColumn/getCustomColumn');
}
export function setLiveCustomColumn(data: any) {
  return axios.post<any>('/api/live-customColumn/setCustomColumn', data);
}
