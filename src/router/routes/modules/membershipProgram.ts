import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/membership',
  name: 'membership',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '收银台',
    requiresAuth: true,
    icon: 'icon-fire',
    order: 9,
  },
  children: [
    {
      path: '/memberShip',
      name: 'memberShip',
      component: () => import('@/views/memberShip/memberShip.vue'),
      meta: {
        locale: '会员服务',
        requiresAuth: true,
        roles: ['superAdmin', 'grayscaleSuperAdmin'],
      },
    },
    {
      path: '/pos',
      name: 'pos',
      component: () => import('@/views/pos/pos.vue'),
      meta: {
        locale: '收银台',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['superAdmin', 'grayscaleSuperAdmin'],
      },
    },
  ],
};

export default SYSTEM;
