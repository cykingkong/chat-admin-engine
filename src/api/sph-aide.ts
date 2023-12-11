import axios from 'axios';
import qs from 'query-string';

export function getQrcodeStatus(params: any) {
  return axios.get<any>('/api/channels-aide/getQrcodeStatus', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getQrcode(params: any, add?: boolean) {
  if (!add) {
    params.isAdd = false;
  } else {
    params.isAdd = add;
  }
  return axios.get<any>('/api/channels-aide/getQrcode', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function sphAideGrid(params: any) {
  return axios.get<any>('/api/channels-aide/sphGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function sphEdit(data: any) {
  return axios.post<any>('/api/channels-aide/sphEdit', data);
}
export function deleteSphBind(data: any) {
  return axios.post<any>('/api/channels-aide/deleteSphBind', data);
}

export function describeTempGrid(params: any) {
  return axios.get<any>('/api/channels-aide/describeTempGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function describeTempEdit(data: any) {
  return axios.post<any>('/api/channels-aide/describeTempEdit', data);
}
export function describeTempDel(data: any) {
  return axios.post<any>('/api/channels-aide/describeTempDel', data);
}

export function describeTempAdd(data: any) {
  return axios.post<any>('/api/channels-aide/describeTempAdd', data);
}

export function aideVideoTaskGrid(params: any) {
  return axios.get<any>('/api/channels-aide/aideVideoTaskGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function aideVideoTaskInfoGrid(params: any) {
  return axios.get<any>('/api/channels-aide/aideVideoTaskInfoGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function aideVideoTaskInfo(params: any) {
  return axios.get<any>('/api/channels-aide/aideVideoTaskInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function aideVideoTaskAdd(data: any) {
  return axios.post<any>('/api/channels-aide/aideVideoTaskAdd', data);
}

export function ExtInfo(params: any) {
  return axios.get<any>('/api/info', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
    baseURL: 'http://localhost:15076',
  });
}

export function openFiles(params: any) {
  return axios.get<any>('/api/openFiles', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
    baseURL: 'http://localhost:15076',
  });
}

export function extUpload(data: any) {
  return axios.post<any>('/api/upload', data, {
    baseURL: 'http://localhost:15076',
  });
}

export function getAllProduct(params: any) {
  return axios.get<any>('/api/channels-aide/getAllProduct', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function checkProduct(params: any) {
  return axios.get<any>('/api/channels-aide/checkProduct', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
