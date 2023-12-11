<template>
  <div class="container">
    <div v-if="markShow" class="shareCodeMark">
      <div v-if="ewmShow" class="ewmKFBox">
        <img
          src="https://img.adyinqing.com/upai_shop/tzlgshuk1689054043754"
          alt=""
          class="close_icon_i"
          @click="
            () => {
              ewmShow = false;
            }
          "
        />
        <img
          src="https://img.adyinqing.com/upai_shop/4z0dvgoj1689055903539"
          alt=""
          class="ewm"
        />
        <a-tag color="#1059F5"> 请使用微信扫码联系客服咨询 </a-tag>
      </div>
      <div class="middleBox">
        <div class="topBox">
          <div class="title_s"> 领取奖励 </div>
          <img
            src="https://img.adyinqing.com/upai_shop/tzlgshuk1689054043754"
            alt=""
            class="close_icon"
            @click="
              () => {
                markShow = false;
              }
            "
          />
        </div>
        <a-row align="center">
          <a-col flex="120px">
            <span style="color: #ff0000">*</span>
            请输入邀请码：
          </a-col>
          <a-col flex="auto">
            <t-input
              v-model="formModel.payShareCode"
              placeholder="请输入邀请码"
            ></t-input>
          </a-col>
        </a-row>
        <a-row align="center" style="margin-top: 16px">
          <a-col flex="120px"> </a-col>
          <a-col flex="auto">
            <a-typography-text
              type="primary"
              style="cursor: pointer"
              @click="
                () => {
                  ewmShow = true;
                }
              "
            >
              如何获取邀请码</a-typography-text
            >
          </a-col>
        </a-row>
        <a-row align="center" justify="end" style="margin-top: 16px">
          <a-col flex="120px">
            <a-space>
              <a-button
                type="outline"
                size="small"
                @click="
                  () => {
                    markShow = false;
                  }
                "
              >
                取消
              </a-button>
              <a-button type="primary" size="small" @click="handleClickOk()">
                确定
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="title">收银台 </div>

    <div class="upai_content_outsideBox">
      <div class="linkTitle">
        会员类型
        <a-typography-text
          v-if="false"
          type="secondary"
          style="margin-left: 8px"
        >
          （月卡季卡限时优惠活动不可叠加购买）
        </a-typography-text></div
      >

      <a-row align="center" style="margin-top: 24px">
        <a-radio-group
          v-model="formModel.packageId"
          style="width: 100%"
          @change="packageIdChange"
        >
          <a-grid :cols="4" :col-gap="24" justify="space-between">
            <a-grid-item v-for="(item, k) in memberShipList" :key="k">
              <a-radio :value="item.packageId" style="width: 100%">
                <template #radio="{ checked }">
                  <div
                    class="upai-radio-card"
                    :class="{ 'custom-radio-card-checked': checked }"
                  >
                    <div v-if="item.tag === 1" class="tag"> 限时优惠</div>
                    <img
                      v-if="checked"
                      src="https://img.adyinqing.com/upai_shop/drrmnpjc1688611715066"
                      alt=""
                      class="select_img"
                    />
                    <div className="custom-radio-card-title">
                      {{ item.packageName || '-' }}
                    </div>
                    <div class="price">
                      <span class="rmb">¥</span>
                      <div class="num">{{ item.payPrice }}</div>
                      <div class="rmb">/{{ item.timeUnit || '-' }}</div>
                    </div>
                    <div class="salePrice">
                      <span v-if="item.payPrice !== item.originalPrice">
                        原价:{{ item.originalPrice }}/{{ item.timeUnit || '-' }}
                      </span>
                      <div v-else style="height: 13.8px; width: 100%"> </div>
                    </div>
                    <div class="saleText">{{ item.describe || '-' }} </div>
                  </div>
                </template>
              </a-radio>
            </a-grid-item>
          </a-grid>
        </a-radio-group>
      </a-row>
    </div>
    <div v-if="false" class="upai_content_outsideBox">
      <div class="linkTitle"> 邀请码 </div>
      <a-row align="center" style="margin-top: 24px">
        <a-col>
          <div
            v-if="packageInfo"
            class="payShareCodeBox"
            :style="{
              backgroundImage: `url(${imgUrl}) `,
            }"
          >
            <div v-if="i" class="leftTopTag">未获得</div>
            <div
              class="btnBox"
              :style="{
                whiteSpace: !i ? 'nowrap' : 'break-spaces',
                right: !i ? '90px' : '83px',
              }"
              @click="handleClickCode"
              >{{
                !i
                  ? userStore.$state.sharePayCode
                    ? '已获得'
                    : '待生效'
                  : '立即领取'
              }}
            </div>
            <div class="shareTextBox">
              <div class="shareText_t">优惠奖励</div>
              <div class="shareText_c"
                >{{ packageInfo.shareDays }}天会员时长</div
              >
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="upai_content_outsideBox">
      <div class="linkTitle"> 支付方式 </div>
      <a-row align="center" style="margin-top: 24px">
        <div class="payTypeBox">
          <div
            v-for="(i, k) in payType"
            :key="k"
            class="btn"
            :class="k === typeActve ? 'btnTypeActive' : ''"
            @click="typeChange(k)"
          >
            <img
              v-if="k === 0"
              :src="
                k === typeActve
                  ? 'https://img.adyinqing.com/upai_shop/yy2erjw21688627618113'
                  : 'https://img.adyinqing.com/upai_shop/h4pm70oc1688627679108'
              "
              mode="scaleToFill"
              class="icon1"
            />
            <img
              v-if="k === 1"
              :src="
                k === typeActve
                  ? 'https://img.adyinqing.com/upai_shop/ohmg028o1688628165834'
                  : 'https://img.adyinqing.com/upai_shop/q5u4jgan1688627618112'
              "
              mode="scaleToFill"
              class="icon1"
            />
            {{ i.label }}
          </div>
        </div>
      </a-row>
      <a-row align="center" style="margin-top: 16px">
        <div class="payBox">
          <a-checkbox class="ty" :value="true" @change="checkChange">
            <template #checkbox="{ checked }">
              <a-space>
                <img
                  v-if="checked"
                  src="https://img.adyinqing.com/upai_shop/gwg1cua61689748379160"
                  alt=""
                  class="checkIcon"
                />
                <img
                  v-else
                  src="https://img.adyinqing.com/upai_shop/a9jd4arn1689748379159"
                  alt=""
                  class="checkIcon"
                />
                <a-typography-text>
                  已阅读并同意
                  <a-typography-text
                    type="primary"
                    style="cursor: pointer"
                    @click="openLink"
                  >
                    《软件应用协议》</a-typography-text
                  >
                </a-typography-text>
              </a-space>

              <!-- <a-tag :checked="checked" checkable>This is a tag checkbox 1</a-tag> -->
            </template>
          </a-checkbox>

          <div class="payLeft">
            <div class="p">
              <div class="ewmBox">
                <div v-if="!checked && typeActve === 0" class="nocheckedMark">
                  <div class="markTips">
                    <span class="t"> 请阅读并勾选软件应用协议 </span>
                  </div>
                </div>
                <a-spin :loading="loading" tip="加载中">
                  <div class="ewmImg">
                    <QrcodeVue
                      v-if="qrcodeValue && typeActve === 0"
                      :value="qrcodeValue"
                      :size="121"
                      level="H"
                      style="position: relative"
                    />
                    <a-image
                      v-if="typeActve === 1"
                      width="121"
                      height="121"
                      src="https://img.adyinqing.com/upai_shop/q2pf7ijc1701684291556"
                    ></a-image>
                  </div>
                </a-spin>
                <div class="text">
                  {{ typeActve ? '客服二维码' : '微信收款码' }}
                </div>
              </div>
              <div class="tips">
                {{
                  typeActve
                    ? '请使用微信扫码添加客服'
                    : '请使用微信进行扫码支付'
                }}
              </div>
            </div>
          </div>
          <div v-if="packageInfo && typeActve === 0" class="payRight">
            <div class="packageType">
              会员类型：{{ packageInfo.packageName }}
            </div>
            <div class="packagePrice">
              支付金额：
              <span class="price">
                <span class="rmb"> ¥ </span>{{ packageInfo.payPrice }}元</span
              >
            </div>
          </div>
        </div>
      </a-row>
    </div>
    <div v-if="paySuccessVisible" class="mark">
      <div class="middleBox">
        <div class="titleS">支付成功</div>
        <img
          src="https://img.adyinqing.com/upai_shop/n8w0t8yo1688969578821"
          mode="scaleToFill"
          class="successImage"
        />
        <div class="successTip"
          >订单支付成功，恭喜你成为魔力智投的会员，快去体验吧！</div
        >
        <div class="tipsButton">{{ tipsText }} </div>
      </div>
    </div>
    <!-- -->
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  reactive,
  toRefs,
  onMounted,
  watch,
  onUnmounted,
} from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useRoute } from 'vue-router';

import {
  orderList,
  createOrder,
  getOrderPayStatus,
  codeCheck,
} from '@/api/pay';
import useLoading from '@/hooks/loading';
import _ from 'lodash';
import QrcodeVue from 'qrcode.vue';
import { useUserStore, useUserCodeStore } from '@/store';
import { Message } from '@arco-design/web-vue';

const { loading, setLoading } = useLoading(true);

const route = useRoute();
const { k } = route.query;
const userStore = useUserStore();
const userCodeStore = useUserCodeStore();
const markShow = ref(false);
const ewmShow = ref(false);
const packageInfo = ref();
const checked = ref(false);
const checkChange = (ev) => {
  console.log(ev);
  checked.value = ev;
};
const i = ref(true);
const typeActve = ref(0);
const openLink = () => {
  window.open('https://docs.qq.com/doc/DTmltSEFxSHpOaHRy');
};

const baseHerfUrl = import.meta.env.VITE_API_BASE_HERF_URL_PAY;
const tipsText = ref('前往魔力智投（5s）');
const getPayOrderList = async (params: any) => {
  const { data } = await orderList(params);
  console.log(data, k);
  memberShipList.value = data.grid;

  if (k) {
    formModel.value.packageId = data.grid[Number(k)].packageId;
    packageInfo.value = data.grid[Number(k)];

    getPayEwm(formModel.value);
    console.log(formModel.value, Number(k));

    return;
  }
  memberShipList.value = data.grid;
  formModel.value.packageId = data.grid[0].packageId;
  // eslint-disable-next-line prefer-destructuring
  packageInfo.value = data.grid[0];
  getPayEwm(formModel.value);
};
const getPayEwm = async (params: any) => {
  setLoading(true);
  try {
    const { data } = await createOrder(params);
    console.log(data);
    qrcodeValue.value = data.payInfo.codeUrl;
    orderId.value = data.payInfo.orderId;
    await getOrderStatus();
    setLoading(false);
  } catch (error) {
    setLoading(true);

    // 1
  }
};
const orderStatusTimer = ref();
const countdown = ref(5);
const paySuccessVisible = ref(false);
const checkCode = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const { data, code, message } = await codeCheck({
      code: formModel.value.payShareCode,
    });
    if (code === 200) {
      resolve(true);
    } else {
      reject(message);

      Message.error(message);
    }
  });
};
const getOrderStatus = async () => {
  try {
    const { data } = await getOrderPayStatus({ orderId: orderId.value });
    if (data.payStatus === '1') {
      orderStatusTimer.value = setTimeout(() => {
        getOrderStatus();
      }, 3000);
    } else if (data.payStatus === '2') {
      orderStatusTimer.value = '';
      paySuccessVisible.value = true;
      setTime();

      clearTimeout(orderStatusTimer.value);
    } else if (data.payStatus === '3') {
      getPayEwm(formModel.value);
    }
  } catch {
    //
  }
};
const handleClickOk = async () => {
  console.log(i.value);

  if (formModel.value.payShareCode) {
    checkCode().then((res) => {
      if (res) {
        i.value = false;

        markShow.value = false;
        ewmShow.value = false;
        localStorage.setItem('shareCode', formModel.value.payShareCode);
        // userCodeStore.setCodeInfo({
        //   whiteUseShareCode: formModel.value.payShareCode,
        // });
        // console.log(userCodeStore.$state);

        getPayEwm(formModel.value);

        Message.info('支付成功，即可获得优惠！');
      }
    });
  } else {
    Message.error('邀请码不能为空');
  }
};
const imgUrl = ref('https://img.adyinqing.com/upai_shop/hv5lhp2e1689042489778');

const getShareCode = () => {
  return i.value;
};
watch(getShareCode, (newV: any, oldV: any) => {
  imgUrl.value = newV
    ? 'https://img.adyinqing.com/upai_shop/hv5lhp2e1689042489778'
    : 'https://img.adyinqing.com/upai_shop/wlx3kh3o1689042489772';
});
if (userStore.$state.sharePayCode) {
  i.value = false;
} else {
  i.value = true;
}

const timerC = ref();
const hasRedirected = ref(false);
const setTime = () => {
  console.log(hasRedirected.value);

  if (hasRedirected.value) {
    return; // 已经跳转页面，直接返回
  }
  if (countdown.value !== 0) {
    // eslint-disable-next-line no-plusplus
    countdown.value--;

    tipsText.value = `前往魔力智投（${countdown.value}s）`;
  } else {
    tipsText.value = '前往魔力智投';
    hasRedirected.value = true;
    window.location.replace(baseHerfUrl);
    console.log(timerC.value);
    clearTimeout(timerC.value);
    return;
  }

  timerC.value = setTimeout(() => {
    setTime();
  }, 1000);
};
function GetQuery(e: any) {
  let R: any = new RegExp(`(^|&)${e}=([^&]*)(&|$)`, 'i');
  let n = window.location.href.substr(1).match(R);
  let a = '';
  // eslint-disable-next-line no-return-assign
  return (
    n != null && (a = decodeURIComponent(n[2])),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (R = null),
    (n = null),
    // eslint-disable-next-line eqeqeq
    a == null || a == '' || a == 'undefined' ? '' : a
  );
}
const qrcodeValue = ref('');
const orderId = ref('');
const memberShipList = ref<any[]>([]);
const payType = ref([
  {
    label: '微信支付',
  },
  { label: '联系客服支付' },
]);
const resetModel = () => {
  return {
    packageId: undefined,
    payShareCode: '',
  };
};
const formModel = ref(resetModel());

const packageIdChange = (value: any, event: any) => {
  packageInfo.value = _.find(memberShipList.value, ['packageId', value]);
  orderStatusTimer.value = null;
  clearTimeout(orderStatusTimer.value);
  getPayEwm(formModel.value);
};
const typeChange = (index: any) => {
  typeActve.value = index;
};
const handleClickCode = () => {
  if (!formModel.value.payShareCode) {
    markShow.value = true;
  } else if (userStore.$state.sharePayCode) {
    Message.info('已获得奖励');
  } else {
    markShow.value = true;
  }
};
onMounted(() => {
  // if (route.query.value.k) {

  // formModel.value.packageId = Number(k);
  // }
  console.log(userCodeStore.$state);

  // if (userCodeStore.$state.whiteUseShareCode) {
  if (localStorage.getItem('shareCode')) {
    // formModel.value.payShareCode = userStore.$state.whiteUseShareCode;
    formModel.value.payShareCode = localStorage.getItem('shareCode');
    i.value = false;
  }
  getPayOrderList({ code: formModel.value.payShareCode });
});
</script>

<style scoped lang="less">
.title {
  font-size: 28px;
  font-weight: bold;
  color: #2d2d2d;
  display: flex;
  padding-left: 24px;
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
.payTypeBox {
  width: 370px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn {
    width: 172px;
    height: 44px;
    border-radius: 6px;
    border: 1px solid #1059f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #000;
    font-weight: 500;
    .icon1 {
      width: 32.53px;
      height: 28.7px;
      margin-right: 9px;
    }
    .icon2 {
      width: 35.32px;
      margin-right: 9px;
      height: 28.7px;
    }
  }
  .btnTypeActive {
    color: #fff;
    background: #1059f5;
  }
}
.payBox {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  .ty {
    position: absolute;
    right: 0;
    bottom: 0;
    .checkIcon {
      width: 14px;
      height: 14px;
    }
  }
  .payLeft {
    width: 141px;
    .p {
      .ewmBox {
        width: 141px;
        height: 179px;
        background: #ffffff;
        box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.11);
        border-radius: 6px 6px 6px 6px;
        opacity: 1;
        padding: 10px;
        position: relative;
        .nocheckedMark {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 6px 6px 6px 6px;
          width: 100%;
          height: 100%;
          z-index: 9;
          background: #00000059;
          overflow: hidden;
          display: flex;
          align-items: center;
          .markTips {
            width: 100%;
            display: flex;
            align-items: center;
            height: 30px;
            justify-content: center;

            font-size: 10px;
            background: #fff;
            font-weight: 500;
            color: #000000;
            white-space: nowrap;
            .t {
              transform: scale(0.85);
            }
          }
        }
        .ewmImg {
          width: 120px;
          height: 120px;
        }
        .text {
          font-size: 16px;
          width: 100%;
          margin-top: 16px;
          text-align: center;
          font-weight: 500;
          color: #000000;
        }
      }
      .tips {
        margin-top: 16px;
        white-space: nowrap;
        font-size: 14px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #000000;
      }
    }
  }
  .payRight {
    margin-left: 44px;

    .packageType {
      margin: 135px 0 24px;
      font-size: 20px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #2d2d2d;
    }
    .packagePrice {
      font-size: 20px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #2d2d2d;
      display: flex;
      align-items: baseline;
      .price {
        font-size: 30px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #f51010;
        .rmb {
          font-size: 20px;
        }
      }
    }
  }
}
.ewmKFBox {
  position: absolute;
  right: 24px;
  bottom: 129px;
  background: #fff;
  border-radius: 6px;
  width: 275px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  .close_icon_i {
    position: absolute;
    right: 24px;
    top: 24px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
  .ewm {
    width: 161px;
    height: 161px;
    margin: 24px 0 24px;
  }
}
.shareCodeMark {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000052;
  z-index: 999;
  .middleBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 578px;
    min-height: 172px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    padding: 24px;
    .topBox {
      font-size: 20px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #2d2d2d;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      .close_icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 100%;
  overflow: auto;
  padding: 24px;
  background: #f7f9ff;
  .upai_content_outsideBox {
    margin: 24px 0;
    padding: 24px;
    width: 100%;
    min-height: 226px;
    background: #fafbff;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.04);
    border-radius: 8px 8px 8px 8px;

    .linkTitle {
      font-size: 16px;
      font-weight: bold;
      color: #2d2d2d;
      padding-left: 6px;
      display: flex;
      align-items: baseline;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 16px;
        border-radius: 8px;
        background: linear-gradient(359deg, #1059f5 0%, #6495ff 100%);
        top: 46%;
        left: 0;
        transform: translate(-50%, -50%);
      }
    }
    .payShareCodeBox {
      width: 396px;
      height: 99px;
      background-repeat: no-repeat;
      background-position-x: -12px;
      background-size: 100% 100%;
      position: relative;
      .leftTopTag {
        position: absolute;
        top: 8px;
        left: 11px;
        font-size: 12px;

        font-weight: 500;
        color: #ffffff;
      }
      .btnBox {
        width: 32px;
        font-size: 16px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        right: 83px;
        transform: translate(0%, -50%);
        font-weight: 500;
        color: #ffffff;
      }
      .shareTextBox {
        min-width: 186px;
        height: 99px;
        padding: 21px 0;
        position: absolute;
        left: 66px;
        top: 0;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .shareText_t {
          font-size: 16px;
          font-family: Source Han Sans CN-Medium, Source Han Sans CN;
          font-weight: 500;
          color: #000000;
        }
        .shareText_c {
          font-size: 30px;
          font-family: Source Han Sans CN-Bold, Source Han Sans CN;
          font-weight: bold;
          color: #1059f5;
        }
      }
    }
  }
}
.upai-radio-card {
  width: 100%;
  min-height: 196px;
  background: #ffffff;
  border-radius: 6px;
  opacity: 1;
  border: 1px solid #c7c7c7;
  position: relative;
  box-sizing: border-box;
  .tag {
    width: 86px;
    height: 30px;
    border-radius: 12px 0 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    position: absolute;
    right: -6px;
    top: -13px;
    background: linear-gradient(270deg, #ff2727 0%, #ff5d5d 100%);
  }
  .select_img {
    position: absolute;
    right: -3px;
    bottom: -3px;
    width: 37.52px;
    height: 37.52px;
  }
  .custom-radio-card-title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    margin: 24px 0;
    font-weight: 500;
    color: #000000;
  }
  .price {
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: center;
    text-align: center;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #1059f5;
    .rmb {
      font-size: 20px;
    }
    .num {
      font-size: 30px;
    }
  }
  .salePrice {
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    color: #979797;
    margin: 9px 0 24px;
  }
  .saleText {
    border-top: 1px solid #c7c7c7;
    height: 49px;
    font-size: 16px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #000000;
    white-space: nowrap;
  }
}
.custom-radio-card-checked {
  border: 3px solid #1059f5;
}
.mark {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000052;
  .middleBox {
    position: absolute;
    padding: 24px;

    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 519px;
    min-height: 302px;
    background: #ffffff;
    border-radius: 6px;
    text-align: center;
    .titleS {
      font-size: 28px;

      font-weight: bold;
      color: #000000;
    }
    .successImage {
      width: 65.8px;
      height: 65.8px;
      margin: 32px auto;
    }
    .successTip {
      font-size: 16px;

      font-weight: 500;
      color: #000000;
    }
    .tipsButton {
      width: 227px;
      height: 47px;
      background: #1059f5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      margin: 32px auto 0;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
