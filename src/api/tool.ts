import axios from 'axios';
import qs from 'query-string';

export function uploadFile(data: any) {
  return axios.put<any>('/kfapi/tool/upload', data);
}
