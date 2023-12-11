<template>
  <a-spin :loading="loading" style="width: 100%">
    <div class="container">
      <div class="title">专注于视频号加热投放的工具 </div>

      <a-grid
        :cols="memberShipList.length"
        :col-gap="24"
        justify="space-between"
      >
        <a-grid-item
          v-for="(item, k) in memberShipList"
          :key="k"
          style="position: relative"
        >
          <img :src="item.packageRuleImages" alt="" class="packageRuleImages" />
          <div class="buyBtn" @click="toPay(item.jumpkey)"> </div>
        </a-grid-item>
      </a-grid>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, toRefs, onMounted } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { orderList, createOrder } from '@/api/pay';
  import useLoading from '@/hooks/loading';
  import _ from 'lodash';
  import QrcodeVue from 'qrcode.vue';

  const { loading, setLoading } = useLoading(true);
  const packageInfo = ref();

  const typeActve = ref(0);
  const getPayOrderList = async () => {
    const { data } = await orderList({});
    const mdata = data.grid || [];

    memberShipList.value.push({
      jumpkey: 0,
      packageId: 0,
      packageName: '体验卡',
      packageRuleImages:
        'https://img.adyinqing.com/upai_shop/h4h5z2351697769906294',
      originalPrice: 0,
      payPrice: 0,
      renewsDays: 0,
      renewsType: 0,
    });
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < mdata.length; index++) {
      const el = mdata[index];
      el.jumpkey = index;
      memberShipList.value.push(el);
    }
    // if (data.grid[0].payPrice > 0) {
    //   formModel.value.packageId = data.grid[0].packageId;
    //   // eslint-disable-next-line prefer-destructuring
    //   packageInfo.value = data.grid[0];
    // } else {
    //   formModel.value.packageId = data.grid[1].packageId;
    //   // eslint-disable-next-line prefer-destructuring
    //   packageInfo.value = data.grid[1];
    // }

    setLoading(false);
    // eslint-disable-next-line prefer-destructuring
    // getPayEwm(formModel.value);
  };

  getPayOrderList();

  const getPayEwm = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await createOrder(params);
      console.log(data);
      qrcodeValue.value = data.payInfo.codeUrl;
      setLoading(false);
    } catch (error) {
      console.log(error, 3456789);
      setLoading(true);

      // 1
    }
  };
  const qrcodeValue = ref('');
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
    };
  };
  const formModel = ref(resetModel());
  const packageIdChange = (value: any, event: any) => {
    packageInfo.value = _.find(memberShipList.value, ['packageId', value]);

    getPayEwm(formModel.value);
  };
  const typeChange = (k: any) => {
    typeActve.value = k;
  };
  const toPay = (k: any) => {
    window.open(`/#/pos?k=${k}`, '_blank');
  };
</script>

<style scoped lang="less">
  .mark {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 20px;
    left: 0;
    background: #000000bb;
    z-index: 9;
  }
  .packageRuleImages {
    width: 100%;
    height: 100%;
  }
  .buyBtn {
    width: 138px;
    height: 42px;
    position: absolute;
    top: 32%;
    left: 50%;
    transform: translate(-50%, -50%);
    // background: #000;
    cursor: pointer;
  }
  .title {
    font-size: 28px;
    width: 100%;
    font-weight: bold;
    color: #2d2d2d;
    display: flex;
    margin-bottom: 24px;
    text-align: center;
    justify-content: center;
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
  .container {
    width: 100%;
    height: 100%;
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
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
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
</style>
