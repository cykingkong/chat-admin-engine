import axios from 'axios';
import qs from 'query-string';

export function plantPackageGrid(params: any) {
  return axios.get<any>('/api/package/plantPackageGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function plantGroupGrid(params: any) {
  return axios.get<any>('/api/group/plantGroupGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function investedEdit(data: any) {
  return axios.post<any>('/api/invested/investedEdit', data);
}
export function videoEdit(data: any) {
  return axios.post<any>('/api/video/videoEdit', data);
}
export function plantGroupAdd(data: any) {
  return axios.post<any>('/api/group/plantGroupAdd', data);
}
export function plantGroupEdit(data: any) {
  return axios.post<any>('/api/group/plantGroupEdit', data);
}
export function plantGroupDel(data: any) {
  return axios.post<any>('/api/group/plantGroupDel', data);
}
export function plantPackageAdd(data: any) {
  return axios.post<any>('/api/package/plantPackageAdd', data);
}
export function plantPackageEdit(data: any) {
  return axios.post<any>('/api/package/plantPackageEdit', data);
}

export function plantPackageDel(data: any) {
  return axios.post<any>('/api/package/plantPackageDel', data);
}

export function createTask(data: any) {
  return axios.post<any>('/api/channels/createTask', data);
}

export function plantPackageGridData(params: any) {
  return axios.get<any>('/api/package/plantPackageGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function goodsGrid(params: any) {
  return axios.get<any>('/api/goods/goodsGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function investedGrid(params: any) {
  return axios.get<any>('/api/invested/investedGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function taskGrid(params: any) {
  return axios.get<any>('/api/task/taskGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function taskLiveGrid(params: any) {
  return axios.get<any>('/api/live-task/taskGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function taskInfo(params: any) {
  return axios.get<any>('/api/task/taskInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function plantGrid(params: any) {
  return axios.get<any>('/api/plant/plantGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantGridData(params: any) {
  return axios.get<any>('/api/plant/plantGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function reportData(params: any) {
  return axios.get<any>('/api/plant/reportGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function reportHourData(params: any) {
  return axios.get<any>('/api/plant/reportHourGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function reportDayData(params: any) {
  return axios.get<any>('/api/plant/reportDayGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function reportSumData(params: any) {
  return axios.get<any>('/api/plant/reportSumData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantLogGrid(params: any) {
  return axios.get<any>('/api/plant/plantLogGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantStageGrid(params: any) {
  return axios.get<any>('/api/plant/plantStageGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function plantInfo(params: any) {
  return axios.get<any>('/api/plant/plantInfo', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function plantEdit(data: any) {
  return axios.post<any>('/api/plant/plantEdit', data);
}
export function plantDeleted(data: any) {
  return axios.post<any>('/api/plant/plantDeleted', data);
}

export function asyncData(data: any) {
  return axios.post<any>('/api/plant/asyncData', data);
}

export function videoGrid(params: any) {
  return axios.get<any>('/api/video/videoGrid', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function videoGridData(params: any) {
  return axios.get<any>('/api/video/videoGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function goodsGridData(params: any) {
  return axios.get<any>('/api/goods/goodsGridData', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export function asyncAllData(data: any) {
  return axios.post<any>('/api/plant/asyncAllData', data);
}
export function asyncLiveAllData(data: any) {
  return axios.post<any>('/api/live-plant/asyncAllData', data);
}
export function taskUpdate(data: any) {
  return axios.post<any>('/api/task/taskUpdate', data);
}
// 删除计划任务
export function liveTaskDeleted(data: any) {
  return axios.post<any>('/api/live-task/taskDeleted', data);
}
export function taskDeleted(data: any) {
  return axios.post<any>('/api/task/taskDeleted', data);
}
