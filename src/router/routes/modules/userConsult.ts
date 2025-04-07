import { DEFAULT_LAYOUT } from '../base';

export default {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '咨询用户',
    requiresAuth: true,
    icon: 'icon-user',
    order: 6,
  },
  children: [
    {
      path: '/userConsult',
      name: 'userConsult',
      component: () => import('@/views/userConsult/list.vue'),
      meta: {
        locale: '咨询用户列表',
        requiresAuth: true,
        roles: ['superAdmin'],
      },
    },
  ],
};
