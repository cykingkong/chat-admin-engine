import axios from 'axios';
import qs from 'query-string';

export function exportGrid(params: any) {
  return axios.get<any>('/api/export/exportGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function exportPlantGrid(params: any) {
  return axios.get<any>('/api/export/exportPlantGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function exportPlantPackageGridData(params: any) {
  return axios.get<any>('/api/export/exportPlantPackageGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
