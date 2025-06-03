import { DEFAULT_LAYOUT } from '../base';

export default {
  path: '/shUser',
  name: 'shUser',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '欢迎语管理',
    requiresAuth: true,
    icon: 'icon-idcard',
    order: 6,
  },
  children: [
    {
      path: 'shUserInfo',
      name: 'shUserInfo',
      component: () => import('@/views/shUserInfo/index.vue'),
      meta: {
        locale: '欢迎语管理',
        requiresAuth: true,
        roles: ['kfAdmin'],
      },
    },
  ],
};
