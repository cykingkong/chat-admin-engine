import { DEFAULT_LAYOUT } from '../base';

export default {
  path: '/channel',
  name: 'channel',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '渠道管理',
    requiresAuth: true,
    icon: 'icon-share-alt',
    order: 6,
  },
  children: [
    {
      path: 'channelManage',
      name: 'channelManage',
      component: () => import('@/views/channelManage/list.vue'),
      meta: {
        locale: '渠道管理',
        requiresAuth: true,
        roles: ['superAdmin', 'kfAdmin'],
      },
    },
  ],
};
