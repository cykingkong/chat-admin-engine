<template>
  <div class="container">
    <Breadcrumb :items="['视频号管理', '账号列表']" />
    <!-- <div class="pageTitle"> 视频号账号列表 </div> -->
    <input id="moliExt" type="hidden" />

    <a-tabs v-model:active-key="selectKey">
      <a-tab-pane :key="1">
        <template #title>
          <a-space :size="8">加热平台账号</a-space>
          <a-tooltip>
            <icon-question-circle-fill />
            <template #content>
              <p>进行加热计划搭建的账号</p>
            </template>
          </a-tooltip>
        </template>

        <SphHot />
      </a-tab-pane>
      <a-tab-pane :key="2" title="">
        <template #title>
          <a-space :size="8">视频号助手账号</a-space>
          <a-tooltip>
            <icon-question-circle-fill />
            <template #content>
              <p>进行视频发布的账号</p>
            </template>
          </a-tooltip>
        </template>
        <SphAide />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onUnmounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { useRouter } from 'vue-router';
  import SphHot from './list.vue';
  import SphAide from './list-aide.vue';

  const router = useRouter();

  const selectKey = ref(1);

  const { key } = router.currentRoute.value.query || 0;

  if (Number(key) > 0) {
    selectKey.value = Number(key);
  }
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    // :deep(.arco-pagination-total) {
    //   display: none;
    // }
  }

  :deep .arco-table-th {
    background: #f2f5ff;
    height: 60px;
    border-radius: 4px;
    font-weight: 500;
    color: #535353;
    border-bottom: none !important;
  }

  .container {
    height: 100%;
    padding: 0 17px 17px 17px;
    background: #f7f9ff;
  }

  .title {
    font-size: 20px;
    color: #2d2d2d;
    font-weight: 500;
    display: flex;
    align-items: center;
    // margin-bottom: 32px;
    .tips {
      font-size: 16px;
      color: #535353;
      font-weight: 400;
      margin-left: 22px;
    }
  }

  .general-card-upai {
    // border-radius: 20px;
    border: none;
    margin-bottom: 16px;
    .arco-card-body {
      padding: 20px 17px !important;
    }
    // :deep(.arco-table-cell) {
    //   padding: 0;
    // }
  }

  :deep.arco-input-wrapper {
    background: #f2f5ff;
    border-radius: 4px;
    height: 32px;
  }
  :deep .arco-picker {
    height: 32px;
    background: #f2f5ff;
    border-radius: 4px;
  }
  :deep.arco-input-number {
    height: 32px;
  }
  .arco-row-align-start {
    align-items: center;
  }
  .labelText {
    // width: 80px;
    // height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3f3f3f;
    white-space: nowrap;
    line-height: 15.4px;
  }
  :deep .arco-select-view-single {
    background: #f2f5ff;
    border-radius: 4px;
    height: 32px;
  }
  .mark {
    position: absolute;
    top: 0%;
    left: 0;

    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.7);

    .iconBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
    }
  }
  .pageTitle {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // /deep/ .arco-statistic-value {
  //   font-size: 16px !important;
  //   color: #535353 !important;
  // }
</style>
