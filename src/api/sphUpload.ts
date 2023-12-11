import axios from 'axios';
import qs from 'query-string';

// eslint-disable-next-line import/prefer-default-export
export function applyuploaddfs(data: any, headers: any) {
  return axios.put<any>(
    'https://finder-assistant.mp.video.tencent-cloud.com/applyuploaddfs',
    data,
    {
      headers,
    }
  );
}

export function uploadPartdfs(url: any, data: any, headers: any) {
  return axios.put<any>(url, data, {
    headers,
  });
}

export function completepartuploaddfs(url: any, data: any, headers: any) {
  return axios.post<any>(url, data, {
    headers,
  });
}
