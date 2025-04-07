import { DEFAULT_LAYOUT } from '../base';

export default {
  path: '/quick',
  name: 'quick',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '快捷回复',
    requiresAuth: true,
    icon: 'icon-reply',
    order: 6,
  },
  children: [
    {
      path: '/quickReply',
      name: 'quickReply',
      component: () => import('@/views/quickReply/list.vue'),
      meta: {
        locale: '快捷回复列表',
        requiresAuth: true,
        roles: ['superAdmin', 'kfAdmin'],
      },
    },
  ],
};
