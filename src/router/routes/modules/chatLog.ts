import { DEFAULT_LAYOUT } from '../base';

export default {
  path: '/chat',
  name: 'chat',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '聊天记录',
    requiresAuth: true,
    icon: 'icon-list',
    order: 6,
  },
  children: [
    {
      path: 'chatLog',
      name: 'chatLog',
      component: () => import('@/views/chatLogList/list.vue'),
      meta: {
        locale: '聊天记录列表',
        requiresAuth: true,
        roles: ['superAdmin'],
      },
    },
  ],
};
