import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/video',
  name: 'video',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '视频管理',
    requiresAuth: true,
    icon: 'icon-archive',
    order: 4,
  },
  children: [
    {
      path: 'createVideo',
      name: 'createVideo',
      component: () => import('@/views/plant/create-video/all_create.vue'),
      meta: {
        locale: '批量发布视频',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'videoData',
      name: 'videoData',
      component: () => import('@/views/plant/video/data.vue'),
      meta: {
        locale: '视频详情',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'videoTaskGrid',
      name: 'videoTaskGrid',
      component: () => import('@/views/plant/video/task-list.vue'),
      meta: {
        locale: '任务记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
