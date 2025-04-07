import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to);
  });
}

// 导出一个默认函数 createRouteGuard，该函数接收一个 Router 类型的参数 router
export default function createRouteGuard(router: Router) {
  // 调用 setupPageGuard 函数，传入 router 参数，设置页面级别的路由守卫
  setupPageGuard(router);
  // 调用 setupUserLoginInfoGuard 函数，传入 router 参数，设置用户登录信息级别的路由守卫
  setupUserLoginInfoGuard(router);
  // 调用 setupPermissionGuard 函数，传入 router 参数，设置权限级别的路由守卫
  setupPermissionGuard(router);
}
