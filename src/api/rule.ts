import axios from 'axios';
import qs from 'query-string';

export function shutdownRuleGrid(params: any) {
  return axios.get<any>('/api/shutdown/shutdownRuleGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function shutdownRuleAdd(data: any) {
  return axios.post<any>('/api/shutdown/shutdownRuleAdd', data);
}

export function shutdownRuleEdit(data: any) {
  return axios.post<any>('/api/shutdown/shutdownRuleEdit', data);
}

export function shutdownRuleDel(data: any) {
  return axios.post<any>('/api/shutdown/shutdownRuleDel', data);
}
