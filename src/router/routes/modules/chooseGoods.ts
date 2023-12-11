import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/chooseGoods',
  name: 'chooseGoods',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '选品库',
    requiresAuth: true,
    icon: 'icon-camera',
    order: 5,
    roles: ['grayscaleSuperAdmin'],
  },
  children: [
    {
      path: 'goodsList',
      name: 'goodsList',
      component: () => import('@/views/chooseGoods/goodsList/index.vue'),
      meta: {
        locale: '选品库',
        requiresAuth: true,
        roles: ['grayscaleSuperAdmin'],
      },
    },
  ],
};

export default SYSTEM;
