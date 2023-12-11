import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/merchantMa',
  name: 'merchantMa',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '小店管理助手',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 10,
  },
  children: [
    {
      path: 'merchantManage',
      name: 'merchantManage',
      component: () =>
        import('@/views/merchant/merchantManage/merchantManage.vue'),
      meta: {
        locale: '小店管理助手',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
