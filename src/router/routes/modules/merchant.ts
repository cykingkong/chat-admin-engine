import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/merchant',
  name: 'merchant',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '小店管理',
    requiresAuth: true,
    icon: 'icon-code-sandbox',
    order: 4,
  },
  children: [
    {
      path: 'merchantDataView',
      name: 'merchantDataView',
      component: () =>
        import('@/views/merchant/merchantDataView/data-overview.vue'),
      meta: {
        locale: '小店数据',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'merchantList',
      name: 'merchantList',
      component: () => import('@/views/merchant/xiaodian/list.vue'),
      meta: {
        locale: '小店列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'orderList',
      name: 'orderList',
      component: () => import('@/views/merchant/order/list.vue'),
      meta: {
        locale: '订单管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'refundOrderList',
      name: 'refundOrderList',
      component: () => import('@/views/merchant/refundOrder/list.vue'),
      meta: {
        locale: '售后管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'refundAddressList',
      name: 'refundAddressList',
      component: () => import('@/views/merchant/refundAddress/list.vue'),
      meta: {
        locale: '退货地址管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'kfLink',
      name: 'kfLink',
      component: () => import('@/views/merchant/kfLink/list.vue'),
      meta: {
        locale: '客服配置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default SYSTEM;
