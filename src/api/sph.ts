import axios from 'axios';
import qs from 'query-string';

export function getQrcodeStatus(params: any) {
  return axios.get<any>('/api/channels/getQrcodeStatus', {
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
  return axios.get<any>('/api/channels/getQrcode', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function sphGrid(params: any) {
  return axios.get<any>('/api/channels/sphGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function sphEdit(data: any) {
  return axios.post<any>('/api/channels/sphEdit', data);
}
export function sphInfo(data: any) {
  return axios.post<any>('/api/channels/sphInfo', data);
}
export function bindMerchant(data: any) {
  return axios.post<any>('/api/merchant/bindMerchant', data);
}

export function getFinderObject(params: any) {
  return axios.get<any>('/api/channels/getFinderObject', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getSearchAccount(params: any) {
  return axios.get<any>('/api/channels/getSearchAccount', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getTargetAuthor(params: any) {
  return axios.get<any>('/api/channels/getTargetAuthor', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getObjectShortLink(params: any) {
  return axios.get<any>('/api/channels/getObjectShortLink', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getLabelTag(params: any) {
  return axios.get<any>('/api/channels/getLabelTag', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getOrderDetail(params: any) {
  return axios.get<any>('/api/channels/getOrderDetail', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function cancelPromotion(data: any) {
  return axios.post<any>('/api/channels/cancelPromotion', data);
}
export function cancelLivePromotion(data: any) {
  return axios.post<any>('/api/channels/cancelLivePromotion', data);
}
export function sphUpload(data: any) {
  return axios.post<any>('/api/channels/sphUpload', data);
}
export function getFileKey(data: any) {
  return axios.post<any>('/api/video/getFileKey', data);
}
export function helperUploadParams(params: any) {
  return axios.get<any>('/api/channels/helperUploadParams', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getTraceKey(params: any) {
  return axios.get<any>('/api/channels/getTraceKey', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getAuthData(params: any) {
  return axios.get<any>('/api/channels/getAuthData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function postVideo(data: any) {
  return axios.post<any>('/api/channels/postVideo', data);
}

export function postVideoResult(data: any) {
  return axios.post<any>('/api/channels/postVideoResult', data);
}

export function getAllProduct(params: any) {
  return axios.get<any>('/api/channels/getAllProduct', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function helperReport(data: any) {
  return axios.post<any>('/api/channels/helperReport', data);
}

export function createVideo(data: any) {
  return axios.post<any>('/api/channels/createVideo', data);
}
export function deleteSphBind(data: any) {
  return axios.post<any>('/api/channels/deleteSphBind', data);
}
