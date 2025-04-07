import axios from 'axios';
import qs from 'query-string';

function getChatLog(params: any) {
  return axios.get<any>('ztapi/kfuser/chatLog', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
export default getChatLog;
