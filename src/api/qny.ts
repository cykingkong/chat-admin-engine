import axios from 'axios';
import qs from 'query-string';

export function UploadQny(data: FormData) {
  // return axios.;

  return axios.post<any>('/', data, {
    baseURL: 'https://up-cn-east-2.qiniup.com',
  });
}

export function GetQiNiuToken() {
  return axios.get<any>('/qiniu/getToken');
}
