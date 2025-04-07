<template>
  <div v-if="show" class="mark">
    <div class="midBox">
      <div class="text">活动截止日期至7月31日</div>
      <div class="herfBtn" @click="herfMembership"> </div>
    </div>
  </div>
  <a-layout class="layout" :class="{ mobile: appStore.hideMenu }">
    <t-guide
      v-model="current"
      :steps="steps"
      hide-prev
      :on-next-step-click="onNextStepClick"
      :on-skip="onSkip"
    />

    <div v-if="navbar" class="layout-navbar">
      <NavBar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          v-show="!hideMenu"
          class="layout-sider"
          breakpoint="xl"
          :collapsed="collapsed"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
        <a-drawer
          v-if="hideMenu"
          :visible="drawerVisible"
          placement="left"
          :footer="false"
          mask-closable
          :closable="false"
          @cancel="drawerCancel"
        >
          <Menu />
        </a-drawer>
        <a-layout class="layout-content" :style="paddingStyle">
          <TabBar v-if="appStore.tabBar" />
          <a-layout-content>
            <PageLayout />
          </a-layout-content>
          <Footer v-if="footer" />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { ref, computed, watch, provide, onMounted, h } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import {
    Message,
    Modal,
    Typography,
    Space,
    Button,
  } from '@arco-design/web-vue';
  import { useAppStore, useUserStore } from '@/store';
  import NavBar from '@/components/navbar/index.vue';
  import Menu from '@/components/menu/index.vue';
  import Footer from '@/components/footer/index.vue';
  import TabBar from '@/components/tab-bar/index.vue';
  import usePermission from '@/hooks/permission';
  import useResponsive from '@/hooks/responsive';
  import { changeGuidance } from '@/api/user';
  import dayjs from 'dayjs';
  import PageLayout from './page-layout.vue';

  const show = ref(false);

  const current = ref(-1);
  const steps = [
    {
      element: '.menu-wrapper',
      title: '导航栏',
      body: '加热计划投放管理，支持批量搭建计划、智能监控、高投产复投等等高效功能，可前往体验',
      placement: 'right',
      highlightPadding: 0,
    },
    {},
    {},
  ];
  const onNextStepClick = (context: any) => {
    current.value = -1;

    localStorage.setItem('GuideStep', '1');
  };
  const onSkip = async () => {
    current.value = -1;
    const { data } = await changeGuidance({ guidance: 1 });

    await userStore.info();
    localStorage.setItem('needGuide', 'false');
  };

  const closeDialog = () => {
    show.value = false;
    if (userStore.$state.guidance === 0) {
      current.value = 0;
    }
    localStorage.setItem('closeDialog', '1');
  };
  const herfMembership = () => {
    show.value = false;
    localStorage.setItem('closeDialog', '1');
    if (userStore.$state.guidance === 0) {
      current.value = 0;
    }
    router.push({
      name: 'memberShip',
    });
  };

  const isInit = ref(false);
  const appStore = useAppStore();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const permission = usePermission();
  useResponsive(true);
  const navbarHeight = `60px`;
  const navbar = computed(() => appStore.navbar);
  const renderMenu = computed(() => appStore.menu && !appStore.topMenu);
  const hideMenu = computed(() => appStore.hideMenu);
  const footer = computed(() => appStore.footer);
  const closeDialogL = ref('');
  if (localStorage.getItem('closeDialog')) {
    closeDialogL.value = localStorage.getItem('closeDialog');
  }
  show.value = userStore.$state.payPop === 1 && closeDialogL.value === '0';
  const dayNum = dayjs(userStore.$state.memberExpiredAt).diff(dayjs(), 'days');

  if (userStore.$state.guidance === 0 && !show.value) {
    setTimeout(() => {
      current.value = 0;
    }, 800);
  }
  const menuWidth = computed(() => {
    return appStore.menuCollapse ? 48 : appStore.menuWidth;
  });
  const collapsed = computed(() => {
    return appStore.menuCollapse;
  });

  const paddingStyle = computed(() => {
    const paddingLeft =
      renderMenu.value && !hideMenu.value
        ? { paddingLeft: `${menuWidth.value}px` }
        : {};
    const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {};
    return { ...paddingLeft, ...paddingTop };
  });
  const setCollapsed = (val: boolean) => {
    if (!isInit.value) return; // for page initialization menu state problem
    appStore.updateSettings({ menuCollapse: val });
  };
  watch(
    () => userStore.role,
    (roleValue) => {
      if (roleValue && !permission.accessRouter(route))
        router.push({ name: 'notFound' });
    }
  );
  const drawerVisible = ref(false);
  const drawerCancel = () => {
    drawerVisible.value = false;
  };
  provide('toggleDrawerMenu', () => {
    drawerVisible.value = !drawerVisible.value;
  });
  onMounted(() => {
    isInit.value = true;
  });
</script>

<style scoped lang="less">
  @nav-size-height: 60px;
  @layout-max-width: 1100px;

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    :deep(.arco-menu) {
      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-radius: 7px;
        background-color: var(--color-text-4);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-text-3);
      }
    }
  }

  .layout-content {
    min-height: 100vh;
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background: #0006;
    top: 0;
    left: 0;
    .midBox {
      width: 572px;
      height: 642px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .text {
        position: absolute;
        bottom: 236px;
        font-size: 20px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .herfBtn {
        width: 453.6px;
        height: 84px;
        position: absolute;
        background: transparent;
        bottom: 116px;
        left: 50%;
        cursor: pointer;
        transform: translate(-50%, -50%);
      }
      .modal_img {
        transform: scale(0.8);
        width: 572px;
        height: 642px;
      }
      .close_icon {
        width: 44px;
        height: 44px;
        position: absolute;
        top: 0px;
        cursor: pointer;
        right: 22px;
        transform: scale(0.8);
      }
    }
    .midBoxShow {
      width: 0;
      height: 0;
    }
  }
</style>
