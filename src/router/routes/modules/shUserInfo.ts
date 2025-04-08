import { DEFAULT_LAYOUT } from '../base';

export default {
  path: '/shUser',
  name: 'shUser',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '个人信息',
    requiresAuth: true,
    icon: 'icon-share-alt',
    order: 6,
  },
  children: [
    {
      path: 'shUserInfo',
      name: 'shUserInfo',
      component: () => import('@/views/shUserInfo/index.vue'),
      meta: {
        locale: '个人信息',
        requiresAuth: true,
        roles: ['kfAdmin'],
      },
    },
  ],
};
