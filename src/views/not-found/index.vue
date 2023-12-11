<template>
  <div class="content">
    <a-result class="result" status="404" :subtitle="'not found'"> </a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back"> back </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useUserStore, useAppStore } from '@/store';

  const appStore = storeToRefs(useAppStore());

  const router = useRouter();
  const back = () => {
    // warning�Go to the node that has the permission
    router.push({ name: 'Workplace' });
  };
  // eslint-disable-next-line consistent-return
  const getFirstMenuRolesCanUse = (menu: any) => {
    menu.sort((a: any, b: any) => {
      return (a.meta.order || 0) - (b.meta.order || 0);
    });
    // 获取菜单权限为所有的第一个路由的name
    for (let i = 0; i < menu.length; i += 1) {
      if (menu[i].meta.roles[0] === '*') {
        if (menu[i].children && menu[i].children[0].meta.roles[0] === '*') {
          console.log(menu[i].children.name, 'menu[i].children.name');
          return menu[i].children[0].name;
        }
        return menu[i].name;
      }
    }
  };

  onMounted(() => {
    const firstMenuName: any =
      getFirstMenuRolesCanUse(appStore.serverMenu.value) || 'Workplace';

    router.push({ name: firstMenuName });
  });
</script>

<style scoped lang="less">
  .content {
    // padding-top: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -121px;
    text-align: center;
  }
</style>
