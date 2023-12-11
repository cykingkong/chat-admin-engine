import axios from 'axios';
import qs from 'query-string';

export function createTask(data: any) {
  return axios.post<any>('/api/live/createTask', data);
}

export function investedGrid(params: any) {
  return axios.get<any>('/api/live-invested/liveInvestedGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function taskGrid(params: any) {
  return axios.get<any>('/api/live-task/taskGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function taskInfo(params: any) {
  return axios.get<any>('/api/live-task/taskInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantGrid(params: any) {
  return axios.get<any>('/api/live-plant/plantGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function livePlantGridData(params: any) {
  return axios.get<any>('/api/live-plant/livePlantGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function plantGridData(params: any) {
  return axios.get<any>('/api/live-plant/plantGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function reportData(params: any) {
  return axios.get<any>('/api/live-plant/reportGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function reportHourData(params: any) {
  return axios.get<any>('/api/live-plant/reportHourGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function reportDayData(params: any) {
  return axios.get<any>('/api/live-plant/reportDayGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function reportSumData(params: any) {
  return axios.get<any>('/api/live-plant/reportSumData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantLogGrid(params: any) {
  return axios.get<any>('/api/live-plant/plantLogGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantStageGrid(params: any) {
  return axios.get<any>('/api/live-plant/plantStageGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantInfo(params: any) {
  return axios.get<any>('/api/live-plant/plantInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function plantEdit(data: any) {
  return axios.post<any>('/api/live-plant/plantEdit', data);
}
export function plantDeleted(data: any) {
  return axios.post<any>('/api/live-plant/plantDeleted', data);
}

export function asyncData(data: any) {
  return axios.post<any>('/api/live-plant/asyncData', data);
}

export function asyncAllData(data: any) {
  return axios.post<any>('/api/live-plant/asyncAllData', data);
}
