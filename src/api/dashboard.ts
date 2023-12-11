import axios from 'axios';
import qs from 'query-string';

export interface ContentDataRecord {
  x: string;
  y: number;
}

export function queryContentData() {
  return axios.get<ContentDataRecord[]>('/api/content-data');
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

export function queryPopularList(params: { type: string }) {
  return axios.get<PopularRecord[]>('/api/popular/list', { params });
}

export function GetReportDataByLeft(params: any) {
  console.log(params);

  return axios.get<any>('/Board/GetReportDataByLeft', {
    paramsSerializer: (obj: any) => {
      return qs.stringify(obj);
    },
    params,
  });
}
export function getDataCenter(params: any) {
  return axios.get<PopularRecord[]>('/reportData/getDataCenter', {
    paramsSerializer: (obj: any) => {
      return qs.stringify(obj);
    },
    params,
  });
}

export function plantData(params: any) {
  return axios.get<any>('/api/data/plantData', {
    paramsSerializer: (obj: any) => {
      return qs.stringify(obj);
    },
    params,
  });
}
export function livePlantData(params: any) {
  return axios.get<any>('/api/data/livePlantData', {
    paramsSerializer: (obj: any) => {
      return qs.stringify(obj);
    },
    params,
  });
}
export function accountData(params: any) {
  return axios.get<any>('/api/data/accountData', {
    paramsSerializer: (obj: any) => {
      return qs.stringify(obj);
    },
    params,
  });
}
export function merchantData(params: any) {
  return axios.get<any>('/api/data/merchantData', {
    paramsSerializer: (obj: any) => {
      return qs.stringify(obj);
    },
    params,
  });
}
