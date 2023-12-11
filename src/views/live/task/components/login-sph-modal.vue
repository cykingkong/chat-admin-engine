<template>
  <a-modal
    v-model:visible="showQrcodeVisible"
    width="auto"
    :footer="false"
    :simple="true"
    hide-cancel
    @close="handleClose"
    @before-close="handleClose"
  >
    <template #title> 登录加热平台账号</template>
    <a-card class="general-card">
      <a-space :size="16" direction="vertical" fill>
        <a-tag
          >{{ sphLength ? '' : '该计划的' }}投放号
          <a-typography-text type="primary">
            {{ sphName }}
          </a-typography-text>
          已离线，请重新登录后再进行操作{{
            sphLength ? '，其他计划正常关停中' : ''
          }}</a-tag
        >

        <a-space direction="vertical" fill align="center">
          <div class="qrCodeBox">
            <QrcodeVue :value="qrcodeValue" :size="200" level="H" />

            <div v-if="qrcodeScan" class="mark">
              <div class="iconBox">
                <icon-check-circle-fill style="color: rgb(0, 180, 42)" />
                <!-- <br /> -->
                <span
                  style="
                    font-size: 16px;
                    color: #1d2129;
                    font-weight: bold;

                    display: block;
                  "
                >
                  扫码成功</span
                >
                <span
                  v-if="sphLength"
                  style="
                    font-size: 16px;
                    color: #8979f7;
                    font-weight: bold;
                    display: block;
                    cursor: pointer;
                    text-decoration: underline;
                  "
                  @click="nextQrCode"
                >
                  点此继续</span
                >
              </div>
            </div>
          </div>

          <a-tag color="green">请用微信APP扫描二维码登录</a-tag>
        </a-space>
      </a-space>
    </a-card>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, toRefs, defineExpose, reactive, computed } from 'vue';
  import {
    sphGrid,
    getOrderDetail,
    cancelPromotion,
    getQrcodeStatus,
    getQrcode,
  } from '@/api/sph';
  import { Message } from '@arco-design/web-vue';
  import QrcodeVue from 'qrcode.vue';
  import { message } from 'ant-design-vue';

  const getQrcodeReqStatus = ref(false);
  const qrcodeScan = ref(false);
  const showQrcodeVisible = ref<boolean>(false);
  const qrcodeValue = ref('');
  const qrcodeToken = ref('');
  const sphName = ref<any>('');
  const sphLength = ref<any>(false);
  const flag = ref<any>(false);
  const timer = ref<any>(null);

  const showModel = async (name: Array<any>, more?: boolean) => {
    clearInterval(timer.value);
    timer.value = null;
    if (more) sphLength.value = more;
    console.log(more, sphLength.value, name);

    const { data } = await getQrcode({}, undefined);
    qrcodeValue.value = data.url;
    qrcodeToken.value = data.token;
    qrcodeScan.value = false;

    showQrcodeVisible.value = true;
    qrcodeScan.value = false;

    if (name.length > 1) {
      sphName.value = name.join('、');
    } else {
      // eslint-disable-next-line prefer-destructuring
      sphName.value = name[0];
    }
    checkSph();
  };
  const nextQrCode = async () => {
    if (flag.value) {
      return;
    }
    flag.value = true;

    clearInterval(timer.value);
    timer.value = null;
    Message.info('切换二维码中');

    setTimeout(async () => {
      qrcodeValue.value = '';
      qrcodeToken.value = '';
      const { data } = await getQrcode({}, undefined);

      flag.value = false;
      qrcodeValue.value = data.url;
      qrcodeToken.value = data.token;
      qrcodeScan.value = false;
      checkSph();
    }, 1000);
  };
  const checkSph = async () => {
    if (getQrcodeReqStatus.value) {
      return;
    }

    getQrcodeReqStatus.value = true;
    const qrRes = await getQrcodeStatus({ token: qrcodeToken.value });

    getQrcodeReqStatus.value = false;

    if (qrRes.data.status === 5) {
      qrcodeScan.value = true;
    }
    if (qrRes.data.status === 1) {
      Message.success({
        content: '登录成功',
        duration: 5 * 1000,
      });
      // if (asyncChecked.value) {
      //   await asyncAllData({ sphId: qrRes.data.sphId, syncType: 1, days: 30 });
      // }
      if (!sphLength.value) {
        showQrcodeVisible.value = false;
        qrcodeScan.value = false;
      }
      // showQrcodeVisible.value = false;
      // qrcodeScan.value = false;

      clearInterval(timer.value);
      timer.value = null;
      return;
    }

    timer.value = setTimeout(checkSph, 1000);
  };
  defineExpose({
    showModel,
  });

  const handleOk = () => {
    showQrcodeVisible.value = false;
  };
  const handleCancel = () => {
    showQrcodeVisible.value = false;
  };
  const handleClose = () => {
    console.log('handleClose');
    clearTimeout(timer.value);
    timer.value = null;
    sphLength.value = false;
  };
</script>

<style lang="scss" scoped>
  .qrCodeBox {
    position: relative;
    .mark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      .iconBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 32px;
        gap: 8px;
      }
    }
  }

  .ty {
    .checkIcon {
      width: 14px;
      height: 14px;
    }
  }
</style>
