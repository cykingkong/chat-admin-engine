import axios from 'axios';
import qs from 'query-string';

export function merchantGrid(params: any) {
  return axios.get<any>('/api/merchant/merchantGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function orderGridData(params: any) {
  return axios.get<any>('/api/merchant/orderGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function refundGrid(params: any) {
  return axios.get<any>('/api/merchant/refundGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function complaintOrderInfo(params: any) {
  return axios.get<any>('/api/merchant/complaintOrderInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function mediaIdGetImg(params: any) {
  return axios.get<any>('/api/merchant/mediaIdGetImg', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function addressGrid(params: any) {
  return axios.get<any>('/api/merchant/addressGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function areaGrid(params: any) {
  return axios.get<any>('/api/merchant/areaGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function orderGrid(params: any) {
  return axios.get<any>('/api/merchant/orderGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function bindMerchant(data: any) {
  return axios.post<any>('/api/merchant/bindMerchant', data);
}
export function merchantStoreList(data: any) {
  return axios.post<any>('/api/merchantStore/merchantStoreList', data);
}
export function merchantEdit(data: any) {
  return axios.post<any>('/api/merchant/merchantEdit', data);
}
export function orderEdit(data: any) {
  return axios.post<any>('/api/merchant/orderEdit', data);
}
export function addressAdd(data: any) {
  return axios.post<any>('/api/merchant/addressAdd', data);
}
export function addressEdit(data: any) {
  return axios.post<any>('/api/merchant/addressEdit', data);
}
export function refundAgree(data: any) {
  return axios.post<any>('/api/merchant/refundAgree', data);
}
export function refundReject(data: any) {
  return axios.post<any>('/api/merchant/refundReject', data);
}
export function unbindMerchant(data: any) {
  return axios.post<any>('/api/merchant/unbindMerchant', data);
}

export function getClassGrid(params: any) {
  return axios.get<any>('/api/merchant/classGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getGoodsGrid(params: any) {
  return axios.get<any>('/api/merchant/goodsGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function setAddWindow(data: any) {
  return axios.post<any>('/api/merchant/addWindow', data);
}

export function setApplyGoods(data: any) {
  return axios.post<any>('/api/merchant/goodsApply', data);
}
