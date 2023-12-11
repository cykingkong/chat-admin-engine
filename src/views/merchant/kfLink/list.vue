<template>
  <div class="container">
    <Breadcrumb :items="['小店管理', '客服配置']" />

    <div class="upai_content_outsideBox">
      <a-row align="center">
        <a-col flex="260px">
          <div class="title"> 客服配置 </div>
        </a-col>
      </a-row>
      <a-row align="start" style="margin-top: 24px">
        <a-col>
          <a-space align="start">
            <div class="linkTitle"> 客服链接: </div>
            <a-space direction="vertical">
              <a-space>
                <a-tag color="arcoblue" class="tag">
                  <a-typography-text type="primary">
                    https://moli.upaicm.com/merchant/index.html?authCode={{
                      authKey
                    }}</a-typography-text
                  >
                </a-tag>
                <a-button
                  type="primary"
                  size="small"
                  style="height: 24px"
                  @click="handleClickCopy()"
                >
                  复制链接
                </a-button>
              </a-space>
              <a-typography-text>
                复制链接前往企业微信配置，
                <a-typography-text
                  type="primary"
                  style="cursor: pointer"
                  @click="openLink"
                >
                  如何配置客服链接?</a-typography-text
                >
              </a-typography-text>
            </a-space>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, toRefs } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { getUserInfo, updateUser } from '@/api/user';
  import copy from '@/utils/copy';
  import { Message } from '@arco-design/web-vue';

  const authKey = ref();
  const getUser = async () => {
    const { data } = await getUserInfo();
    // console.log(data);
    authKey.value = data.authKey;
  };
  const handleClickCopy = () => {
    copy(
      `https://moli.upaicm.com/merchant/index.html?authCode=${authKey.value}`
    );
    Message.success({
      content: '复制成功',
      duration: 5 * 1000,
    });
  };
  const openLink = () => {
    window.open(
      'https://docs.qq.com/doc/DTkNNQ0tEWGVvdUta?u=a03ed1a898694aefbc6591043d89b6ce'
    );
  };
  getUser();
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    padding: 0px 24px 24px;
    background: #f7f9ff;
    .upai_content_outsideBox {
      padding: 24px;
      width: 100%;
      min-height: 226px;
      background: #fafbff;
      box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.04);
      border-radius: 8px 8px 8px 8px;
      .title {
        font-size: 28px;
        font-weight: bold;
        color: #2d2d2d;
        display: flex;
        align-items: baseline;
        position: relative;
        // &::after {
        //   content: '';
        //   position: absolute;
        //   width: 6px;
        //   height: 26px;
        //   background: #1059f5;
        //   top: 50%;
        //   left: 0;
        //   transform: translate(-50%, -50%);
        // }
      }
      .linkTitle {
        font-size: 16px;
        font-weight: bold;
        color: #2d2d2d;
        padding: 0 12px;
        display: flex;
        align-items: baseline;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 16px;
          background: #1059f5;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>
