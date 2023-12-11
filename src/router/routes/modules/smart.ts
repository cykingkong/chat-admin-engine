import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/sm',
  name: 'sm',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '智能管理',
    requiresAuth: true,
    icon: 'icon-record',
    order: 6,
  },
  children: [
    {
      path: 'smart',
      name: 'smart',
      component: () => import('@/views/smart/smartPage/smartList.vue'),
      meta: {
        locale: '智能监控',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
