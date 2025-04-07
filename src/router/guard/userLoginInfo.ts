import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

// 导出一个默认函数 setupUserLoginInfoGuard，该函数用于设置用户登录信息守卫
export default function setupUserLoginInfoGuard(router: Router) {
  // 使用 router 的 beforeEach 钩子函数，在每次路由跳转前执行
  router.beforeEach(async (to, from, next) => {
    // 启动进度条，用于显示页面加载进度
    NProgress.start();
    // 获取用户存储实例
    const userStore = useUserStore();
    // 检查用户是否已登录
    if (isLogin()) {
      // 如果用户已登录且角色信息存在，直接放行
      if (userStore.role) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          await userStore.logout();
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
        }
      }
    } else {
      if (to.name === 'login') {
        next();
        return;
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
    }
  });
}
