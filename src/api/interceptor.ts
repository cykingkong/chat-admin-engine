import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal, Button, Space } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { h } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}
const isExpired = false;

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    if (!config.headers) {
      config.headers = {};
    }
    if (
      config.baseURL === 'https://finder-assistant.mp.video.tencent-cloud.com'
    ) {
      return config;
    }
    if (config.baseURL === 'http://localhost:15076') {
      return config;
    }

    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.module = 'ececda9101ac60e4169289b55f15abed';

    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const res = response.data;
    const {
      url,
      baseURL,
      headers,
      data = JSON.stringify({}),
      params = JSON.stringify({}),
    } = response.config;

    if (
      response.config.responseType === 'blob' ||
      response.config.responseType === 'arraybuffer' ||
      response.config.responseType === 'stream'
    ) {
      return res;
    }

    if (
      String(url).indexOf('finder-assistant.mp.video.tencent-cloud.com') > 0
    ) {
      return res;
    }
    if (baseURL === 'https://up-cn-east-2.qiniup.com') {
      return res;
    }
    if (url === '/api/merchant/mediaIdGetImg') {
      return res;
    }
    if (url === '/api/channels/getOrderDetail') {
      return res;
    }
    // if the custom code is not 20000, it is judged as an error.
    if (!res.success) {
      Message.error({
        content: res.message ? res.message : 'Error',
        duration: 5 * 1000,
      });
      // console.log(response.config.url, 4556564);

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        [401].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: '当前账号登录已过期～',
          content: '您已注销，可以取消以停留在此页面，或重新登录',
          okText: '重新登录',
          async onClose() {
            localStorage.setItem('relogin', '0');
          },
          async onOk() {
            const userStore = useUserStore();
            await userStore.logout();
            localStorage.setItem('relogin', '0');
            window.location.reload();
          },
        });
      }

      return Promise.reject(new Error(res.message ? res.message : 'Error'));
    }
    return res;
  },
  async (error) => {
    if (error.config.url === '/api/member/memberMsgGrid') {
      return Promise.reject();
    }
    if (error.message) {
      console.log(1231234545, error.message, error.response);
      if (error.response.data.code === 401) {
        Message.error({
          content: error.response.data.message || 'Request Error',
          duration: 5 * 1000,
        });
        Modal.error({
          title: '当前账户在别地登录',
          content: '您可以取消以停留在此页面，或重新登录',
          okText: '重新登录',
          async onClose() {
            localStorage.setItem('relogin', '0');
          },
          async onOk() {
            const userStore = useUserStore();
            await userStore.logout();
            localStorage.setItem('relogin', '0');
            window.location.reload();
          },
        });
        return false;
        //  window.location.reload();
      }

      // Message.error({
      //   content: error.message || 'Request Error',
      //   duration: 5 * 1000,
      // });
      return Promise.reject();
    }
    if (error.response) {
      console.log(123123);
      Message.error({
        content: error.response.message || 'Request Error',
        duration: 5 * 1000,
      });
      return Promise.reject();
    }

    return Promise.reject();
  }
);
