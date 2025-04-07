import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
  ssoToken,
} from '@/api/user';
import { getSysConfig } from '@/api/member';
import { h } from 'vue';
import { setToken, clearToken, clearShareCode } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { compareVersions } from '@/utils/version';
import { Modal } from '@arco-design/web-vue';

import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): any => ({
    role: '',
    agentName: '',
    userInfo: {},
    closeDialog: false,
    whiteUseShareCode: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<any>) {
      console.log(partial);
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      res.data.role = 'admin';
      console.log(res.data, 'fsada');
      if (res.data.isSupper) {
        res.data.role = 'superAdmin';
      } else {
        res.data.role = 'kfAdmin';
      }
      // if (res.data.userInfo.memberDepId === 0) {
      //   res.data.role = 'superAdmin';
      //   if (res.data.grayscaleType === 1) {
      //     res.data.role = 'grayscaleSuperAdmin';
      //   }
      // } else {
      //   res.data.plantDataGuidance = res.data.userInfo.plantDataGuidance || 0;
      //   res.data.guidance = res.data.userInfo.guidance || 0;
      // }

      //  else {
      //   res.data.role = 'dept';
      // }
      // if (res.data.guidance === 0) {
      //   localStorage.setItem('GuideStep', '0');
      // }
      // const sysRes = await getSysConfig();
      // res.data.sysConfig = sysRes.data;

      this.setInfo(res.data);

      // const oldVersion = import.meta.env.VITE_KB_VERSION;
      // const versionDescArr = res.data.versionDesc.split('\n');
      // const buildVersionDesc = () => {
      //   const arr = versionDescArr.map((item: any) => {
      //     return h('div', { style: 'margin-bottom:10px' }, item);
      //   });
      //   return arr;
      // };
      // console.log(buildVersionDesc());
      // console.log(versionDescArr);
      // if (compareVersions(res.data.version, oldVersion) === 1) {
      //   Modal.open({
      //     title: `客服后台${res.data.version} 版本更新`,
      //     content: () => h(buildVersionDesc),
      //     mask: true,
      //     simple: true,
      //     width: 'auto',
      //     okText: '立即更新',
      //     async onOk() {
      //       // eslint-disable-next-line no-restricted-globals
      //       location.reload();
      //     },
      //   });
      // }
    },
    async getInfo() {
      const res = await getUserInfo();
      this.userInfo = res.data;
      return res.data;
    },

    // Login
    async login(loginForm: any) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    async SSOLogin(token: string) {
      try {
        const { data } = await ssoToken({ authCode: token });
        console.log(data, 'dataSSOLOGIN');
        setToken(data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      clearShareCode();
      localStorage.removeItem('closeDialog');
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        // await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
