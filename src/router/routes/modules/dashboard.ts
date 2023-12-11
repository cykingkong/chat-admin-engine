import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () =>
        import('@/views/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        locale: '数据大屏',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '/datav',
      name: 'datav',
      component: () => import('@/views/datav/index.vue'),
      meta: {
        locale: '可视化',
        requiresAuth: true,
        hideInMenu: true,
      },
    },
    {
      path: '/shareLink',
      name: 'shareLink',
      component: () => import('@/views/shareLink/linkPage/shareLink.vue'),
      meta: {
        locale: '邀请链接',
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
};

export default DASHBOARD;
