import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'system',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '信息管理',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 5,
  },
  children: [
    {
      path: 'userInfo',
      name: 'userInfo',
      component: () => import('@/views/userInfo/system/user-info.vue'),
      meta: {
        locale: '用户中心',
        requiresAuth: true,
        roles: ['*'],
      },
    },

    {
      path: 'shareLink',
      name: 'shareLink',
      component: () => import('@/views/shareLink/linkPage/shareLink.vue'),
      meta: {
        locale: '',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
