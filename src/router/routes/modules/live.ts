import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/live',
  name: 'live',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '直播投流管理',
    requiresAuth: true,
    icon: 'icon-play-circle',
    order: 4,
  },
  children: [
    {
      path: 'plantliveData',
      name: 'plantliveData',
      component: () => import('@/views/live/plant-data/data.vue'),
      meta: {
        locale: '投放数据',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'packageLiveData',
      name: 'packageLiveData',
      component: () => import('@/views/live/package/data.vue'),
      meta: {
        locale: '计划包',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'createlivePlant',
      name: 'createlivePlant',
      component: () => import('@/views/live/create-plant/create.vue'),
      meta: {
        locale: '创建计划',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'liveTask',
      name: 'liveTask',
      component: () => import('@/views/live/task/task-list.vue'),
      meta: {
        locale: '投放记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'ruleliveList',
      name: 'ruleliveList',
      component: () => import('@/views/live/rule/grid.vue'),
      meta: {
        locale: '智能关停策略',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
