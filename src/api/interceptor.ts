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
let isExpired = false;

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
      if (res.code === 50010) {
        console.log(isExpired, 'isExpired');
        if (isExpired) {
          return null;
        }

        isExpired = true;
        const imgNode = h('img', {
          src: 'https://img.adyinqing.com/upai_shop/q2pf7ijc1701684291556',
          style: {
            width: '200px',
            height: '200px',
          },
        }); // 创建img节点
        const onClick = () => {
          window.location.href = '/#/memberShip';
        };
        const btnNode = h(
          Button,
          {
            size: 'medium',
            type: 'primary',
            onClick,
          },
          '查看会员权益'
        );
        const titleNode4 = h(
          'h2',
          {
            style: {
              margin: 0,
              fontSize: '20px',
              color: '#000',
            },
          },
          '账号已过期'
        );
        const infoIcon = h('img', {
          src: 'https://img.adyinqing.com/upai_shop/6pj04icq1699258770391',
          style: {
            width: '14px',
            height: '14px',
          },
        });
        const titleNode3 = h(
          'span',
          {
            style: {
              color: '#000',
            },
          },
          '当前账号已过期，请联系管理员续费'
        );
        const space = h(
          Space,
          {
            size: 8,
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
            },
          },
          [infoIcon, titleNode3]
        );
        const contentNode = h(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              flexDirection: 'column',
              gap: '24px',
            },
          },
          [titleNode4, space, imgNode]
        );

        Modal.info({
          modalClass: 'modalClass',
          content: () => contentNode,
          okText: '查看会员权益',
          async onOk() {
            window.location.href = '/#/memberShip';

            isExpired = false;
          },
          onBeforeClose() {
            isExpired = false;
          },
        });
        return null;
      }

      if (res.code === 1005) {
        console.log(isExpired, 'isExpired');
        if (isExpired) {
          return null;
        }

        isExpired = true;
        const imgNode = h('img', {
          src: 'https://img.adyinqing.com/upai_shop/q2pf7ijc1701684291556',
          style: {
            width: '130px',
            height: '130px',
          },
        });
        const titleNode4 = h(
          'h2',
          {
            style: {
              margin: 0,
              fontSize: '20px',
              fontWeight: 'bold',
              lineHeight: '22px',
            },
          },
          '提示'
        );
        const titleNode3 = h(
          'span',
          {
            style: {
              fontSize: '14px',
            },
          },
          '体验卡可创建加热计划数量已不足，联系客服可免费升级'
        );
        const space = h(
          Space,
          {
            size: 8,
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
            },
          },
          [titleNode3]
        );
        const contentNode = h(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              flexDirection: 'column',
              gap: '24px',
            },
          },
          [titleNode4, space, imgNode]
        );

        Modal.info({
          modalClass: 'modalClass',
          content: () => contentNode,
          okText: '确定',
          async onOk() {
            isExpired = false;
          },
          onBeforeClose() {
            isExpired = false;
          },
        });
        return null;
      }

      if (res.code === 9988) {
        Message.error({
          content: res.message ? res.message : 'Request Error',
          duration: 5 * 1000,
        });
        Modal.error({
          title: '系统升级',
          content: '系统正在升级，请重新登录',
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
        return null;
      }
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
      console.log('45d45f', res);
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
