<template>
  <a-spin :loading="loading" style="width: 100%">
    <div class="container">
      <img
        v-for="(item, index) in imgArr"
        :key="index"
        :src="item"
        alt=""
        class="packageRuleImages"
      />
    </div>
    <div class="ewmBtn" @click="linkKf"> 联系客服开通 </div>

    <!-- <a-popover title="" trigger="click">

      <template #content>
        <a-image
          width="400"
          height="400"
          src="https://img.adyinqing.com/upai_shop/q2pf7ijc1701684291556"
        ></a-image>
      </template>
    </a-popover> -->
  </a-spin>
</template>

<script lang="ts" setup>
  import { h, ref, computed, watch } from 'vue';
  import { Modal } from '@arco-design/web-vue';
  import { useAppStore } from '@/store';

  const appStore = useAppStore();
  const visible = computed(() => appStore.$state);
  const left = ref('123px');
  if (visible.value.menuCollapse) {
    left.value = '0px';
  } else {
    left.value = '123px';
  }
  watch(
    () => visible.value.menuCollapse,
    (newV) => {
      console.log(newV);
      if (newV) {
        left.value = '0px';
      } else {
        left.value = '123px';
      }
    }
  );
  const imgArr = [
    'https://img.adyinqing.com/upai_shop/y2b8dody1701850981599',
    'https://img.adyinqing.com/upai_shop/5gh7mj6e1701851016331',
    'https://img.adyinqing.com/upai_shop/53zdbtj81701851029510',
    'https://img.adyinqing.com/upai_shop/cqxemrqt1701851032704',
    'https://img.adyinqing.com/upai_shop/l8pl91xq1701851035964',
  ];
  // const imgArr = [
  //   'https://img.adyinqing.com/upai_shop/0ua7rf9t1701765177930',
  //   'https://img.adyinqing.com/upai_shop/irfv4r241701765229353',
  //   'https://img.adyinqing.com/upai_shop/9rgj2zhm1701765311249',
  //   'https://img.adyinqing.com/upai_shop/ggvtnrbi1701765341129',
  //   'https://img.adyinqing.com/upai_shop/me8unydm1701765393588',
  // ];
  const loading = ref(false);
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  const linkKf = () => {
    // visible.value = true;
    const imgNode = h('img', {
      src: 'https://img.adyinqing.com/upai_shop/q2pf7ijc1701684291556',
      style: {
        width: '300px',
        height: '300px',
      },
    });
    const textNode = h(
      'div',
      {
        style: {
          fontSize: '22px',
          color: '#000',
        },
      },
      '扫码添加客服开通'
    );
    const contentNode = h(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          minHeight: '200px',
          flexDirection: 'column',
        },
      },
      [imgNode, textNode]
    );

    Modal.info({
      modalClass: 'modalClass',
      closable: true,
      footer: false,
      simple: true,
      content: () => contentNode,
    });
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
    vertical-align: top;
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
    padding: 24px 200px;

    background: #f1f4fa;
    display: flex;
    flex-direction: column;

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
  .ewmBtn {
    width: 400px;
    height: 80px;
    position: fixed;
    bottom: 40px;
    left: calc(50% + v-bind(left));
    transition: all 0.3s;
    transform: translate(-50%, 0%);
    background: #8272db;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    line-height: 0;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.15), inset 1px 2px 0 0 #fff;
    font-size: 30px;
    &:hover {
      cursor: pointer;
    }
    border-radius: 20px;
  }
  .ewmImg {
    margin: 0 auto;
    display: block;
  }
</style>
