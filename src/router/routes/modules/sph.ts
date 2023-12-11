import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/sph',
  name: 'sph',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '视频号管理',
    requiresAuth: true,
    icon: 'icon-stamp',
    order: 2,
  },
  children: [
    {
      path: 'sphList',
      name: 'sphList',
      component: () => import('@/views/sph/account/tabIndex.vue'),
      meta: {
        locale: '视频号管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
