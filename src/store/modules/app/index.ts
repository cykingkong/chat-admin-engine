import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router';
import defaultSettings from '@/config/settings.json';
import { getMenu } from '@/api/user';
import { AppState } from './types';

const isShowDept = false;
const generateMenu = (routes: any, data: any) => {
  data.forEach((item: any) => {
    // str.replace("需要替换的字符串"，"新字符串")
    const menu: RouteRecordRaw = {
      name: item.menuRote.replace('/', '-'),
      path: `/${item.menuRote}`,
      meta: {
        locale: item.menuName,
        icon: item.menuIcon,
        requiresAuth: true,
        order: item.sortId,
        roles: item.menuRoles.split(','),
      },
    };

    if (item.menuName === '数据大屏') {
      menu.meta.hideChildrenInMenu = true;
    }
    if (item.menuName === '分享链接') {
      menu.meta.hideInMenu = true;
    }
    // if (item.menuName === '智能监控') {
    //   menu.meta.hideInMenu = true;
    // }
    // console.log(menu, 'menu');
    // if (item.menuName === 'index') {
    //   menu.meta.0 = true;
    // }
    if (item.parentId === 0 && item.menuType === 1) {
      // 目录
      // menu.component = () => import(`/src/${item.menuPath}`);
      // menu.component = () => import('@/views/dashboard/index.vue');
    } else if (item.menuType === 1 && item.parentId > 0) {
      menu.path = item.menuRote;
      // menu.component = (resolve) =>require();
      // menu.component = () => import(`/src/views/settings/admin-list/list.vue`);
    } else {
      // 最后一级，就是具体指向的页面，type==2，菜单
      // menu.component = (resolve) =>
      //   require([`@/views${item.path_views}`], resolve);
    }
    if (item.children && item.children.length > 0) {
      menu.children = [];
      generateMenu(menu.children, item.children);
    }

    // console.log(menu, 'menu');

    routes.push(menu);
  });
};
const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null;
      try {
        const { data } = await getMenu();
        const tempAsyncRoutes: RouteRecordNormalized[] = [];

        generateMenu(tempAsyncRoutes, data.grid);
        // const settings = {
        //   path: '/settings',
        //   name: 'settings',
        //   meta: {
        //     locale: '团队管理',
        //     requiresAuth: true,
        //     icon: 'icon-user-group',
        //     order: 6,
        //   },
        //   children: [
        //     {
        //       path: 'adminList',
        //       name: 'adminList',
        //       meta: {
        //         locale: '子账号管理',
        //         requiresAuth: true,
        //         roles: ['superAdmin', 'dept'],
        //         // roles: ['superAdmin'],
        //       },
        //     },
        //     {
        //       path: 'depmentList',
        //       name: 'depmentList',
        //       meta: {
        //         locale: '部门管理',
        //         requiresAuth: true,
        //         roles: ['superAdmin', 'dept'],
        //         // roles: ['superAdmin'],
        //       },
        //     },
        //   ],
        // };

        // tempAsyncRoutes.push(settings);

        // router.addRoute(tempAsyncRoutes[1]);
        this.serverMenu = tempAsyncRoutes;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        });
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
