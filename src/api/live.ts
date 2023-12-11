import axios from 'axios';
import qs from 'query-string';

export function plantPackageAdd(data: any) {
  return axios.post<any>('/api/live-package/plantPackageAdd', data);
}
export function plantPackageEdit(data: any) {
  return axios.post<any>('/api/live-package/plantPackageEdit', data);
}

export function plantPackageDel(data: any) {
  return axios.post<any>('/api/live-package/plantPackageDel', data);
}
export function plantPackageGrid(params: any) {
  return axios.get<any>('/api/live-package/plantPackageGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantPackageGridData(params: any) {
  return axios.get<any>('/api/live-package/plantPackageGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getLivePromotionAccountUseList(data: any) {
  return axios.post<any>('/api/live/getLivePromotionAccountUseList', data);
}

export function getFinderUserAttr(data: any) {
  return axios.post<any>('/api/live/getFinderUserAttr', data);
}

export function getOrderDetail(params: any) {
  return axios.get<any>('/api/live/getOrderDetail', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getCardList(data: any) {
  return axios.post<any>('/api/live/getCardList', data);
}
export function taskUpdate(data: any) {
  return axios.post<any>('/api/live-task/taskUpdate', data);
}
