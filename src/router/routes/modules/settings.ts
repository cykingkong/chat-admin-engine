import { DEFAULT_LAYOUT } from '../base';

export default {
  path: '/settings',
  name: 'settings',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '团队管理',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 6,
  },
  children: [
    {
      path: 'adminList',
      name: 'adminList',
      component: () => import('@/views/settings/admin-list/list.vue'),
      meta: {
        locale: '客服账号管理',
        requiresAuth: true,
        roles: ['superAdmin'],
      },
    },
    {
      path: 'userList',
      name: 'userList',
      component: () => import('@/views/settings/user-list/list.vue'),
      meta: {
        locale: '商户管理',
        requiresAuth: true,
        roles: ['superAdmin'],
      },
    },
    // {
    //   path: 'roleList',
    //   name: 'roleList',
    //   component: () => import('@/views/settings/role-list/list.vue'),
    //   meta: {
    //     locale: '角色管理',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};
