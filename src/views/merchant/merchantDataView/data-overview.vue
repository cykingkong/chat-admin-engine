<template>
  <div class="container">
    <a-row align="center">
      <a-col>
        <div
          v-if="topTipsBar"
          class="topTipsBar"
          :class="topTipsBar ? 'tipsShow' : ''"
        >
          <img
            v-if="topTipsBarContent"
            src="https://img.adyinqing.com/upai_shop/x3pg1vne1690430298724"
            alt=""
            class="icon"
          />
          <div v-if="topTipsBarContent" class="tipsText"
            >您暂未绑定店铺，请
            <span class="link" @click="handleClickLink">前往绑定</span></div
          >
        </div>
        <div v-else class="topTipsBar" :class="topTipsBar2 ? 'tipsShow' : ''">
          <img
            v-if="topTipsBarContent2"
            src="https://img.adyinqing.com/upai_shop/x3pg1vne1690430298724"
            alt=""
            class="icon"
          />
          <div v-if="topTipsBarContent2" class="tipsText">
            建议绑定运营中的店铺，保证数据的准确性。
          </div>
        </div>
      </a-col>
    </a-row>

    <a-spin :loading="loading" style="width: 100%">
      <a-space direction="vertical" fill size="medium">
        <a-row>
          <div class="upai_outsideBox">
            <a-row align="center" justify="space-between">
              <a-col flex="293px">
                <div class="title">经营数据 </div>
              </a-col>
              <a-col flex="589px">
                <div class="flexBox">
                  <div style="margin-right: 10px" class="dnm">
                    <t-select
                      v-model="reqModel.mid"
                      placeholder="选择店铺"
                      style=""
                      class="custom-select"
                      :options="merchantList"
                      :keys="{
                        value: 'mid',
                        label: 'nickname',
                      }"
                      @change="search()"
                    >
                    </t-select>
                  </div>
                  <div class="datePickBox">
                    <div
                      v-for="(el, k) in rangeShortcuts"
                      :key="k"
                      class="btn"
                      :class="{ active: dateActive === k }"
                      @click="changeDate(k)"
                      >{{ el.label }}</div
                    >
                    <a-range-picker
                      :default-value="[dayjs(), dayjs()]"
                      shortcuts-position="left"
                      style="width: 560px"
                      :disabled-date="disabledDate"
                      @select="onSelect"
                      @popupVisibleChange="onPopupVisibleChange"
                      @change="dateChange"
                    >
                      <a-button
                        class="btn zdy"
                        :class="{ active: dateActive === -10 }"
                        >{{ '自定义' }}</a-button
                      >
                    </a-range-picker>
                    <!-- <a-range-picker
              v-if="datePickShow"
              class="datePick"
              :default-value="[dayjs(), dayjs()]"
              style="width: 560px"
              :disabled-date="disabledDate"
              hide-trigger
              shortcuts-position="left"
              @select="onSelect"
              @change="dateChange"
            /> -->
                  </div>
                </div>
              </a-col>
            </a-row>

            <div class="upai_grid">
              <div v-for="(item, k) in OperatingData" :key="k">
                <div
                  class="upai_card_m"
                  :style="{
                    backgroundColor: bgc[k],
                  }"
                >
                  <div class="infoBox">
                    <div class="infoTitle">{{ item.title }}</div>
                    <div class="num">
                      <span v-if="item.type && k !== 4" class="rmb">¥</span
                      >{{ item.num
                      }}<span v-if="item.type && k === 4" class="rmb">%</span>
                    </div>
                    <div class="n2">
                      昨日{{ dateActive >= 2 ? '- -' : item.num2 }}
                    </div>
                  </div>
                  <!-- <img :src="item.url" alt="" class="rightImg" /> -->
                </div>
              </div>
            </div>
          </div>
        </a-row>
        <a-row :gutter="[20, 20]">
          <a-col flex="50%">
            <div class="upai_outsideBox" style="height: 240px">
              <a-row
                align="center"
                justify="space-between"
                style="margin-bottom: 24px"
              >
                <a-col flex="293px">
                  <div class="title">订单来源 </div>
                </a-col>
                <a-col flex="209px">
                  <div class="orderComeTypeBox">
                    <div
                      v-for="(i, k) in comeType"
                      :key="k"
                      class="comeBtn"
                      :class="{ comeBtnActive: k == comeActive }"
                      @click="comeChange(k)"
                      >{{ i.label }}</div
                    >
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col
                  v-for="(i, key) in comeType[comeActive].data"
                  :key="key"
                  flex="50%"
                  class="dataBox"
                >
                  <div class="infoBox">
                    <div class="infoTitle">{{ i.t }}</div>
                    <div class="num">
                      <span v-show="key === 0 && i.n != '异常'" class="rmb"
                        >¥</span
                      >{{ i.n }}
                    </div>

                    <div v-show="dateActive < 2" class="n2">
                      昨日{{ i.n2 }}</div
                    >
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>

          <!-- 订单 -->
          <a-col flex="50%">
            <div class="upai_outsideBox" style="height: 240px">
              <a-row
                align="center"
                justify="space-between"
                style="margin-bottom: 24px"
              >
                <a-col flex="293px">
                  <div class="title">待处理 </div>
                </a-col>
                <a-col flex="589px"> </a-col>
              </a-row>
              <a-row>
                <a-col
                  v-for="(i, k) in orderStatus"
                  :key="k"
                  :span="8"
                  class="dataBox"
                >
                  <div class="infoBox" style="padding-top: 15px">
                    <div class="infoTitle">{{ i.label }}</div>
                    <div class="num"> {{ i.n }} </div>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <a-col flex="50%">
            <div class="upai_outsideBox" style="height: 240px">
              <a-row
                align="center"
                justify="space-between"
                style="margin-bottom: 24px"
              >
                <a-col flex="293px">
                  <div class="title">商品概况 </div>
                </a-col>
                <a-col flex="589px"> </a-col>
              </a-row>
              <a-row>
                <a-col
                  v-for="(i, k) in goodsData"
                  :key="k"
                  :span="8"
                  class="dataBox"
                >
                  <div class="infoBox" style="padding-top: 15px">
                    <div class="infoTitle">{{ i.label }}</div>
                    <div class="num"> {{ i.n }} </div>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col>
          <!-- <a-col flex="50%">
            <div class="upai_outsideBox">
              <a-row
                align="center"
                justify="space-between"
                style="margin-bottom: 24px"
              >
                <a-col flex="293px">
                  <div class="title">待处理 </div>
                </a-col>
                <a-col flex="589px"> </a-col>
              </a-row>
              <a-row>
                <a-col
                  v-for="(i, k) in orderStatus"
                  :key="k"
                  :span="8"
                  class="dataBox"
                >
                  <div class="infoBox" style="padding-top: 15px">
                    <div class="infoTitle">{{ i.label }}</div>
                    <div class="num"> {{ i.n }} </div>
                  </div>
                </a-col>
              </a-row>
            </div>
          </a-col> -->
        </a-row>
      </a-space>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, onMounted, nextTick } from 'vue';
  import { useRouter } from 'vue-router';

  import { useI18n } from 'vue-i18n';
  import { LineSeriesOption } from 'echarts';
  import { queryDataOverview } from '@/api/visualization';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useThemes from '@/hooks/themes';
  import useChartOption from '@/hooks/chart-option';
  import dayjs from 'dayjs';
  import { merchantGrid, merchantStoreList } from '@/api/merchantApi';
  import { Message } from '@arco-design/web-vue';

  import { plantData, accountData } from '@/api/dashboard';
  import { fun } from '@/utils/num';

  const dateActive = ref(0);
  const comeActive = ref(0);
  const topTipsBar = ref(false);
  const topTipsBar2 = ref(false);
  const topTipsBarContent = ref(false);
  const topTipsBarContent2 = ref(false);
  const comeChange = (k: any) => {
    comeActive.value = k;
  };
  const handleClickLink = () => {
    router.push({
      name: 'merchantList',
    });
  };
  const goodsData = ref([
    {
      label: '销售中',
      n: 0,
      key: 'sellingCount',
    },
    {
      label: '待上架',
      n: 0,
      key: 'preShowCount',
    },
    {
      label: '审核中',
      n: 0,
      key: 'reviewingCount',
    },
  ]);
  const comeType = ref([
    {
      label: '广告来源',
      data: [
        {
          t: '成交金额',
          key: 'advertisingFlowPrice',
          n: 0,
          n2: 0,
        },
        {
          t: '成交订单数',
          key: 'advertisingFlowCount',
          n: 0,
          n2: 0,
        },
      ],
    },
    {
      label: '自然流量',
      data: [
        {
          t: '成交金额',
          key: 'naturalFlowPrice',
          n: 0,
          n2: 0,
        },
        {
          t: '成交订单数',
          key: 'naturalFlowCount',
          n: 0,
          n2: 0,
        },
      ],
    },
  ]);
  const merchantList = ref([]);
  const getMid = async (params: any) => {
    const { data } = await merchantGrid(params);
    if (data.grid) {
      data.grid.unshift({
        mid: undefined,
        nickname: '全部',
      });
      merchantList.value = data.grid;
      reqModel.value.mid = data.grid[0].mid;
    } else {
      console.log('error');
      reqModel.value.mid = undefined;
      topTipsBar.value = true;
      setTimeout(() => {
        topTipsBarContent.value = true;
      }, 320);
      // Message.info('暂未绑定小店');
    }
  };
  const orderStatus = ref([
    { label: '待付款', n: 0, key: 'prePayCount' },
    { label: '待发货', n: 0, key: 'preSendCount' },
    { label: '售后', n: 0, key: 'preAfterSales' },
  ]);
  const rangeShortcuts = [
    {
      label: '当日',
      value: [
        dayjs().startOf('day').format('YYYY-MM-DD  HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD  HH:mm:ss'),
      ],
    },
    {
      label: '昨日',
      value: [
        dayjs().add(-1, 'day').startOf('day').format('YYYY-MM-DD  HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD  HH:mm:ss'),
      ],
    },
    {
      label: '近一周',
      value: [
        dayjs().add(-1, 'week').startOf('day').format('YYYY-MM-DD  HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD  HH:mm:ss'),
      ],
    },
    {
      label: '近一月',
      value: [
        dayjs().add(-1, 'month').startOf('day').format('YYYY-MM-DD  HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD  HH:mm:ss'),
      ],
    },
    {
      label: '本月',
      value: [
        dayjs().startOf('month').startOf('day').format('YYYY-MM-DD  HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD  HH:mm:ss'),
      ],
    },
  ];

  const orderTypeActive = ref(0);
  const returnTypeActive = ref(0);
  const bgcolor = ref('#ff330026');
  const shucolor = ref('#ff3300');
  const bgc = ['#FFF4F3', '#EFFAFF', '#EFF7FF', '#F7F3FF', '#F4F4F4'];
  const orderTypeList = ref([
    {
      title: '账户数据',
      numList: [
        {
          t: '在线投放号',
          key: 'onlineAccount',
          url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
          n: 0,
          color: '',
        },
        {
          t: '在线被投号',
          url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
          n: 0,
          key: 'onlineAccountBack',
        },
        {
          t: '即将掉线',
          url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
          n: 0,
          key: 'onlineAccountLeave',
        },
        {
          t: '已离线',
          url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
          n: 0,
          key: 'onlineAccountLeaveEd',
        },
        {
          t: '总余额',
          key: 'accountBalance',
          url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
          n: 0,
        },
        {
          t: '加热中计划数',
          url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
          n: 0,
          key: 'hotPlant',
        },
        {
          t: '加热中视频数',
          url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
          n: 0,
          key: 'hotVideo',
        },
        {
          t: '加热中商品数',
          url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
          key: 'hotGoods',
          n: 0,
        },
      ],
    },
  ]);
  const selectModel = () => {
    return {
      startDate: dayjs()
        .startOf('date')
        .format('YYYY-MM-DD HH:mm:ss')
        .toString(),
      endDate: dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss').toString(),

      mid: undefined,
    };
  };
  const reqModel = ref(selectModel());

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${
            el.color
          }" class="tooltip-item-icon"></span><span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">${el.value.toLocaleString()}</span>
      </div>`
      )
      .reverse()
      .join('');
  };
  const router = useRouter();

  const gotodo = () => {
    if (!returnTypeActive.value) {
      router.push({
        name: 'wxFeedBackList',
      });
    } else {
      router.push({
        name: 'refundList',
      });
    }
  };

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const { isDark } = useThemes();
  // eslint-disable-next-line no-shadow
  enum CardTitle {
    a = '成交金额',
    b = '成交订单数',
    c = '下单金额',
    d = '下单订单数',
    e = '支付转化率',
  }
  const OperatingData = ref([
    {
      title: CardTitle.a,
      num: 0,
      num2: 0,
      type: true,
      key: 'dealPrice',
      key2: 'productPlaceorderGmvHb',
      url: 'https://img.adyinqing.com/upai_shop/5dea827e1676628633698',
    },
    {
      title: CardTitle.b,
      num: 0,
      num2: 0,
      type: false,
      key: 'dealCount',
      key2: 'productOrderCountHb',
      url: 'https://img.adyinqing.com/upai_shop/9phewe3x1676628682838',
    },
    {
      title: CardTitle.c,
      num: 0,
      num2: 0,
      type: true,
      key: 'orderPrice',
      key2: 'costHb',
      url: 'https://img.adyinqing.com/upai_shop/39ttxfcp1676628721182',
    },
    {
      title: CardTitle.d,
      num: 0,
      num2: 0,
      type: false,
      key: 'orderCount',
      key2: 'roiHb',
      url: 'https://img.adyinqing.com/upai_shop/ocdlgyo91676628747667',
    },
    {
      title: CardTitle.e,
      num: 0,
      num2: 0,
      type: true,
      key: 'transformRate',
      key2: 'yj_roiHb',
      url: 'https://img.adyinqing.com/upai_shop/ocdlgyo91676628747667',
    },
  ]);

  const dates = ref([]);
  const onSelect = (valueString: any, value: any) => {
    dates.value = value;
  };
  const disabledDate = (current: any) => {
    const datess: any = dates.value;
    if (datess && datess.length) {
      const tooLate =
        datess[0] &&
        Math.abs((new Date(current) - datess[0]) / (24 * 60 * 60 * 1000)) > 30;
      const tooEarly =
        datess[1] &&
        Math.abs((new Date(current) - datess[1]) / (24 * 60 * 60 * 1000)) > 30;
      return tooEarly || tooLate;
    }
    return false;
  };
  const getTime = (time: any) => {
    // 转换为式分秒
    let h: any = parseInt((time / 60 / 60) % 24, 10);
    h = h < 10 ? `0${h}` : h;
    let m: any = parseInt((time / 60) % 60, 10);
    m = m < 10 ? `0${m}` : m;
    let s: any = parseInt(time % 60, 10);
    s = s < 10 ? `0${s}` : s;
    // 作为返回值返回
    return [h, m, s];
  };

  const hb = (n1: any, n2: any) => {
    if (n1 - n2 === 0 || !n1 || !n2) {
      return 0;
    }
    // n1 本期 n2 上期
    // 环比增长率=（本期数-上期数）/上期数×100%
    return ((n1 - n2) / n2) * 100;
  };
  const fetchData = async () => {
    setLoading(true);

    try {
      console.log(1);

      const { data } = await merchantStoreList(reqModel.value);
      console.log(2, data);

      OperatingData.value.forEach((el: any) => {
        if (el.key === 'orderCount' || el.key === 'dealCount') {
          el.num = data.storeList[el.key];
        } else {
          el.num = fun(data.storeList[el.key]);
        }
        if (data.yesterday) {
          if (el.key === 'orderCount' || el.key === 'dealCount') {
            el.num2 = data.yesterday[el.key];
          } else {
            el.num2 = fun(data.yesterday[el.key]);
          }
        }
      });
      orderStatus.value.forEach((e: any) => {
        e.n = data.storeList[e.key];
      });
      nextTick(() => {
        comeType.value.forEach((el: any) => {
          el.data.forEach((e: any) => {
            e.n = Number(data.storeList[e.key]);

            if (
              Number(data.storeList[e.key]) < 0 &&
              (e.key === 'naturalFlowPrice' || e.key === 'naturalFlowCount')
            ) {
              e.n = '异常';

              // Message.info(
              //   '投放产生的数据包含未绑定的店铺订单，导致无法准确统计相关数据，请前往绑定相关店铺'
              // );
            }

            if (data.yesterday) {
              e.n2 = Number(data.yesterday[e.key])
                ? Number(data.yesterday[e.key])
                : 0;
            }
          });
        });
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const toastShow = () => {
    topTipsBar2.value = true;
    setTimeout(() => {
      topTipsBarContent2.value = true;
    }, 320);
  };
  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const { data } = await accountData({});

      orderTypeList.value[orderTypeActive.value].numList.forEach((el: any) => {
        el.n = data[el.key];
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const changeOrderType = (k: any) => {
    orderTypeActive.value = k;
    // fetchAccountData();
    // numList.value = orderTypeList.value[orderTypeActive.value].numList;
  };
  const basePagination = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
  };

  const pagination = reactive({
    ...basePagination,
  });
  const initData = async () => {
    await getMid({ ...pagination });
    // if (reqModel.value.mid) {
    await fetchData();
    await toastShow();
    // } else {
    // setLoading(false);
    // }
  };
  // fetchAccountData();
  const search = () => {
    // getBoardInfo();
    fetchData();
  };
  onMounted(() => {
    initData();
  });
  const rangeValue = ref();
  const datePickShow = ref(false);
  const onPopupVisibleChange = (visible: any) => {
    console.log(visible);
    if (!visible) dates.value = [];
  };

  const changeDate = (k: any) => {
    if (k === dateActive.value) {
      dateActive.value = -1;
      reqModel.value.startDate = dayjs().format('YYYY-MM-DD');
      reqModel.value.endDate = dayjs().format('YYYY-MM-DD');
      if (datePickShow.value) {
        datePickShow.value = false;
        dates.value = [];
      }
      fetchData();
    } else if (k === 5) {
      dateActive.value = k;

      datePickShow.value = true;
    } else {
      dateActive.value = k;
      if (datePickShow.value) {
        datePickShow.value = false;
        dates.value = [];
      }
      reqModel.value.startDate = rangeShortcuts[k].value[0].toString();
      reqModel.value.endDate = rangeShortcuts[k].value[1].toString();
      fetchData();
    }
  };
  const dateChange = (dateString: Array<string>) => {
    // console.log(dateString[0]);
    reqModel.value.startDate = dateString[0].toString();
    reqModel.value.endDate = dateString[1].toString();
    if (datePickShow.value) datePickShow.value = false;
    dateActive.value = -10;

    fetchData();
  };
</script>

<style scoped lang="less">
  .container {
    padding: 24px 24px 20px;
    // overflow: auto;
  }
  .orderComeTypeBox {
    width: 200px;
    height: 30px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #1059f5;
    .comeBtn {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      background: #fff;
      cursor: pointer;
      font-weight: 500;
      color: #000000;
    }
    .comeBtnActive {
      color: #fff;
      background: #1059f5;
    }
  }
  .upai_outsideBox {
    width: 100%;
    min-height: 91px;
    background: #ffffff;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    padding: 24px;

    .dataBox {
      width: 100%;
      min-height: 118px;
      position: relative;
      .infoBox {
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 24px;
        .infoTitle {
          font-size: 20px;

          font-weight: 500;
          color: #000000;
        }
        .num {
          font-size: 30px;

          font-weight: bold;
          color: #000000;
          // margin: 24px 0 28px;
          .rmb {
            font-size: 16px;
          }
        }
        .n2 {
          font-size: 16px;

          font-weight: 500;
          color: #979797;
        }
      }
      &:not(:last-of-type) ::before {
        content: '';
        width: 1px;
        background: #1059f5;
        height: 73px;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .upai_grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      gap: 20px;
      margin-top: 24px;

      .upai_card_m {
        width: 100%;
        height: 188px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        .infoBox {
          text-align: center;
          .infoTitle {
            font-size: 20px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #000000;
          }
          .num {
            font-size: 30px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #000000;
            margin: 24px 0 28px;
            .rmb {
              font-size: 16px;
            }
          }
          .n2 {
            font-size: 16px;

            font-weight: 500;
            color: #979797;
          }
        }
      }
    }
  }
  .titleTag {
    width: 88px;
    height: 30px;
    background: #1059f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
  }
  :deep(.arco-statistic) {
    .arco-statistic-title {
      color: #636e95;
      font-weight: 500;
      font-size: 14px !important;
    }
    .arco-statistic-value {
      display: flex;
      align-items: center;
    }
  }
  .statistic-prefix {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    color: var(--color-white);
    font-size: 16px !important;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
  }
  .panel-col {
    // padding-left: 10px;
    border-right: 1px solid rgb(var(--gray-2));
    padding-left: 10px;

    transition: all 0.5s;
  }
  .panel-col:last-child {
    border: none;
  }
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
  .date {
    font-size: 14px;
    font-weight: 400;
    color: #2d2d2d;
  }
  .upai_content {
    width: 100%;
    // height: 340px;
    border-radius: 6px;
    background: #fff;
    padding: 27px 28px;
    .title {
      font-size: 16px !important;
      color: #2d2d2d;
      font-weight: 500;
      display: flex;
      align-items: center;
      margin-bottom: 19.6px;
      .tips {
        font-size: 14px !important;
        color: #535353;
        font-weight: 400;
        margin-left: 22px;
      }
    }
  }
  .shu {
    position: relative;
  }
  .shu ::before {
    content: '';
    width: 3px;
    height: 69px;
    background: v-bind(shucolor);
    position: absolute;
    right: 0;
    top: 24px;
    transition: all 0.3s;

    border-radius: 1.5px;
  }
  // :deep(.arco-space-item) {
  //   overflow: auto;
  //   overflow-x: hidden;
  // }
  .returnBox {
    width: 100%;
    display: flex;
    height: 156px;
    border-radius: 12px;
    background: linear-gradient(
      90deg,
      v-bind(bgcolor) 0%,
      rgba(101, 178, 255, 0) 100%
    );
    transition: all 0.3s;
    padding: 21px 47px 12px;

    .infoBox {
      width: 16%;
      height: 100%;
      &:first-child {
        width: 13%;
      }
      &:first-child {
        text-align: left;
      }
      .label {
        text-align: center;
        font-size: 20px !important;
        color: #5c5c5c;
        font-weight: 500;
        // padding-left: 26px;
      }
      .num {
        text-align: center;
        font-size: 24px !important;
        color: #2d2d2d;
        font-weight: 500;
        margin-top: 6px;
        :deep(.arco-statistic) {
          line-height: 24px;
          .arco-statistic-prefix {
            font-size: 24px !important;
            font-weight: 500;
          }
          .arco-statistic-value-integer {
            font-size: 24px !important;
            font-weight: 500;
          }
          .arco-statistic-value-decimal {
            font-size: 24px !important;
            font-weight: 500;
          }
        }
      }
      .gotodoBtn {
        margin: 10px auto 0;
        width: 90px;
        height: 40px;
        background: rgba(255, 31, 22, 0.16);
        border-radius: 20px;
        text-align: center;
        line-height: 40px;
        color: #731313;
        font-size: 18px !important;
        font-weight: 500;
        &:hover {
          cursor: pointer;
        }
      }
      .c2 {
        color: rgb(22, 93, 255);
        background: rgba(22, 93, 255, 0.16);
      }
    }
  }
  .orderTypeBox {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    .orderTypeBtn {
      width: 77px;
      height: 28px;
      border-radius: 20px;
      background: #f2f5ff;
      color: #2d2d2d;
      margin-right: 32px;
      font-size: 13px !important;
      line-height: 26.8px;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .orderTypeActive {
      background: #165dff;
      color: #fff;
    }
  }
  .numBox {
    width: 100%;
    height: 105px;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 21.7px 16.1px;
    .titleBox {
      display: flex;
      align-items: center;
      font-size: 14px !important;
      color: #6f6f6f;
      font-weight: 500;
      .y {
        width: 16.8px;
        height: 16.8px;
        margin-right: 8.4px;
      }
    }
    .n {
      padding-left: 24.2px;
      margin-top: 7px;
      :deep(.arco-statistic) {
        line-height: 29.7px;
        .arco-statistic-prefix {
          font-size: 21px !important;
          font-weight: 600;
        }
        .arco-statistic-value-integer {
          font-size: 21px !important;
          font-weight: 600;
        }
        .arco-statistic-value-decimal {
          font-size: 21px !important;
          font-weight: 600;
        }
      }
    }
  }
  .flexBox {
    display: flex;
    align-items: center;
    position: relative;

    .custom-select {
      border-radius: 4px;
      border: none;
      width: 103px;
      height: 30px;
      font-size: 14px;
      color: #000;
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
      :deep(.t-select-input) {
        .t-input__wrap {
          .t-input {
            border: none;
          }
        }
      }
    }
  }

  .datePickBox {
    width: 100%;
    height: 53px !important;
    display: flex;
    // border-radius: 6px;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    // position: relative;
    position: absolute;
    right: 0;
    top: -10px;
    :deep(.t-input) {
      height: 26.2px;
      border: none;
      border-radius: 0;
    }
    .datePick {
      position: absolute;
      right: 0;
      bottom: -320px;
    }
    .btn {
      // flex: 1;
      height: 30px;
      margin: 0 5px;
      border-radius: 6px;
      background: #fff;
      padding: 0 17px;
      white-space: nowrap;
      overflow: hidden;
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.13);
      color: #2d2d2d;
      font-size: 14px !important;
      text-align: center;
      line-height: 30px;
      transition: all 0.2s;
      &:hover {
        cursor: pointer;
      }
    }
    .zdy {
      padding: 0 17px;

      background: #fff;
    }
    .active {
      background: #165dff;
      // border-radius: 6px;
      color: #fff;
    }
  }

  .upai_card {
    width: 100%;
    height: 104px;
    border-radius: 8px;
    background-color: #fff;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 9px 12px 0px rgba(126, 126, 126, 0.06);
    .rightImg {
      width: 63px;
      height: 63px;
    }
    .infoBox {
      width: 100%;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      .topBox {
        .infoTitle {
          font-size: 16px !important;
          color: #000;
          font-weight: 500;
          margin-bottom: 18px;
        }
        .infoTitle2 {
          font-size: 16px;

          font-weight: 500;
          color: #000000;
          display: flex;
          align-items: center;
          margin-bottom: 18px;
          .sc {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 6px;
          }
          .bg0 {
            background: linear-gradient(270deg, #0cb900 0%, #0dcc00 100%);
          }
          .bg1 {
            background: linear-gradient(270deg, #ffb500 0%, #ffd46a 100%);
          }
          .bg2 {
            background: #c7c7c7;
          }
          .bg3 {
            background: #1059f5;
          }
          .bg4 {
            background: linear-gradient(90deg, #ff7f7c 0%, #ff2924 100%);
          }
        }
        .num {
          :deep(.arco-statistic) {
            line-height: 24px;

            .arco-statistic-prefix {
              font-size: 24px !important;
              font-weight: 500;
            }
            .arco-statistic-value-integer {
              font-size: 24px !important;
              font-weight: 500;
            }
            .arco-statistic-value-decimal {
              font-size: 24px !important;
              font-weight: 500;
            }
          }
        }
      }
      .bottomNum {
        font-size: 16px;
        font-weight: 500;
        color: #c7c7c7;
        :deep(.arco-statistic) {
          line-height: 20px !important;
          .arco-statistic-prefix {
            font-size: 16px !important;
            font-weight: 400;
          }
          .arco-statistic-value-integer {
            font-size: 16px !important;
            font-weight: 400;
          }
          .arco-statistic-value-decimal {
            font-size: 16px !important;
            font-weight: 400;
          }
        }
      }
    }
  }
  .topTipsBar {
    width: 100%;
    height: 0;
    border-radius: 8px;
    background: #0f58f54d;
    padding: 0 24px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    transition: all 0.3s;
    .icon {
      width: 15.33px;
      height: 15.33px;
      margin-right: 10px;
    }
    .tipsText {
      font-size: 16px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #000000;
      display: flex;
      .link {
        color: #1059f5;
        cursor: pointer;
      }
    }
  }
  .tipsShow {
    height: 42px;
    margin-bottom: 24px;
  }
</style>
