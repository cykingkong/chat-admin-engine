
<template>
  <div>
    <a-spin :loading="loading" style="width: 100%">
      <t-guide
        v-model="currentGuide"
        :steps="steps"
        hide-prev
        :on-finish="onFinish"
        :on-skip="onSkip"
      />

      <div class="container">
        <a-space direction="vertical" fill size="medium">
          <a-row align="center" justify="space-between">
            <a-col flex="293px">
              <a-space :size="22" align="center">
                <div class="date"
                  >更新时间：{{ dayjs().format('YYYY/M/DD HH:mm:ss') }}</div
                >
              </a-space>
            </a-col>
            <a-col flex="589px">
              <div class="flexBox">
                <div style="margin-right: 10px" class="dnm">
                  <t-select
                    v-model="reqModel.dateType"
                    placeholder="时间维度"
                    style=""
                    class="custom-select"
                    @change="search()"
                  >
                    <t-option :value="1" label="创建时间" />
                    <t-option :value="2" label="更新时间" />
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
          <div class="dataTf">
            <a-row justify="space-between" align="center">
              <a-col>
                <a-row align="center" :gutter="[8, 0]">
                  <a-col flex="134px">
                    <div class="title">投放数据 </div>
                  </a-col>
                  <a-col flex="185px">
                    <div class="dataTypeBox">
                      <div
                        v-for="(item, k) in dataTypeList"
                        :key="k"
                        class="dataType"
                        :class="dataTypeActive === k ? 'dataActive' : ''"
                        @click="changeDataType(k)"
                        >{{ item.label }}</div
                      >
                    </div>
                  </a-col>
                </a-row>
              </a-col>

              <a-divider style="margin: 16px 0 16px" />
            </a-row>
            <a-row
              v-if="OperatingData.length"
              class="grid-demo"
              :gutter="[38.5, 38.5]"
              style="margin-bottom: 11px"
            >
              <a-col
                v-for="(item, k) in OperatingData"
                v-show="item.show"
                :key="k"
                :span="6"
                :lg="8"
                :xxl="6"
                :xl="8"
              >
                <div class="upai_card">
                  <div class="infoBox">
                    <div class="topBox">
                      <div class="infoTitle">{{ item.title }}</div>
                      <div class="num"
                        ><a-statistic
                          :value="item.num"
                          :precision="item.type ? 2 : 0"
                          :value-style="{
                            color: '#1F63F5',
                          }"
                        >
                          <template #prefix>
                            <div v-if="k === 0 || k === 2" class="rmb">¥</div>
                          </template>
                        </a-statistic>
                      </div>
                    </div>
                    <div class="bottomNum">
                      昨日 {{ dateActive >= 2 ? '- -' : '' }}
                      <a-statistic
                        v-if="dateActive < 2"
                        :value="item.num2"
                        :precision="2"
                        :value-style="{
                          color: item.num2 > 0 ? '#C7C7C7' : '#C7C7C7',
                        }"
                      >
                        <template #prefix>
                          <icon-arrow-rise
                            v-if="item.num2 > 0"
                            :style="{
                              color: '#FD5700',
                            }"
                          />

                          <icon-arrow-fall
                            v-if="item.num2 <= 0"
                            :style="{
                              color: '#00CF4D',
                            }"
                          />
                        </template>
                        <template #suffix> % </template>
                      </a-statistic>
                    </div>
                  </div>
                  <!-- <img :src="item.url" alt="" class="rightImg" /> -->
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="dataXD">
            <a-row justify="space-between" align="center">
              <a-col flex="126px">
                <div class="title"> 数据概览 </div>
              </a-col>

              <a-divider style="margin: 16px 0 16px" />
              <a-col flex="88px">
                <div class="titleTag" style="margin: 0px 0 16px">
                  小店数据
                </div>
              </a-col>
            </a-row>
            <a-row
              class="grid-demo"
              :gutter="[38.5, 38.5]"
              style="margin-bottom: 11px"
            >
              <a-col
                v-for="(item, k) in merchantDataList"
                :key="k"
                :span="6"
                :lg="8"
                :xxl="6"
                :xl="8"
              >
                <div class="upai_card">
                  <div class="infoBox">
                    <div class="topBox">
                      <div class="infoTitle2">
                        <span
                          class="sc"
                          :class="[
                            k <= 1 ? 'bg0' : '',
                            k == 2 ? 'bg1' : '',
                            k == 3 ? 'bg2' : '',
                            k == 4 ? 'bg3' : '',
                            k > 4 ? 'bg4' : '',
                          ]"
                        ></span>

                        {{ item.t }}</div
                      >
                      <div class="num" style="padding-left: 22px"
                        ><a-statistic
                          :value="item.n"
                          :precision="[2, 3].includes(item.type) ? 2 : 0"
                          :value-style="{
                            color: '#1F63F5',
                          }"
                        >
                          <template #prefix>
                            <div v-if="orderTypeActive === 1" class="rmb"
                              >¥</div
                            >
                          </template>
                          <template #suffix>
                            {{ item.type === 3 ? '%' : '' }}
                          </template>
                        </a-statistic>
                      </div>
                    </div>
                  </div>
                  <!-- <img :src="item.url" alt="" class="rightImg" /> -->
                </div>
              </a-col>
            </a-row>
          </div>
          <div
            class="dataGL"
            :style="{ paddingBottom: currentGuide === 3 ? '550px' : '' }"
          >
            <a-row>
              <a-col flex="88px">
                <div class="titleTag" style="margin: 0px 0 16px">
                  账号数据
                </div>
              </a-col>
            </a-row>
            <a-row
              class="grid-demo"
              :gutter="[38.5, 38.5]"
              style="margin-bottom: 11px"
            >
              <a-col
                v-for="(item, k) in orderTypeList[orderTypeActive].numList"
                :key="k"
                :span="6"
                :lg="8"
                :xxl="6"
                :xl="8"
              >
                <div class="upai_card">
                  <div class="infoBox">
                    <div class="topBox">
                      <div class="infoTitle2">
                        <span
                          class="sc"
                          :class="[
                            k <= 1 ? 'bg0' : '',
                            k == 2 ? 'bg1' : '',
                            k == 3 ? 'bg2' : '',
                            k == 4 ? 'bg3' : '',
                            k > 4 ? 'bg4' : '',
                          ]"
                        ></span>

                        {{ item.t }}</div
                      >
                      <div class="num" style="padding-left: 22px"
                        ><a-statistic
                          :value="item.n"
                          :precision="0"
                          :value-style="{
                            color: '#1F63F5',
                          }"
                        >
                          <template #prefix>
                            <div v-if="orderTypeActive === 1" class="rmb"
                              >¥</div
                            >
                          </template>
                        </a-statistic>
                      </div>
                    </div>
                  </div>
                  <!-- <img :src="item.url" alt="" class="rightImg" /> -->
                </div>
              </a-col>
            </a-row>
          </div>
          <!-- <a-row class="grid-demo" :gutter="[55, 0]">
        <a-col :flex="1">
          <div class="upai_content">
            <div class="title">
              数据概览
            </div>
            <a-row class="grid-demo" style="margin-bottom: 28px">
              <a-col flex="410px">
                <div class="orderTypeBox">
                  <div
                    v-for="(item, k) in orderTypeList"
                    :key="k"
                    :class="{ orderTypeActive: orderTypeActive === k }"
                    class="orderTypeBtn"
                    @click="changeOrderType(k)"
                    >{{ item.title }}</div
                  >
                </div>
              </a-col>
            </a-row>
            <a-row class="grid-demo" :gutter="[24, 24]">
              <a-col
                v-for="(el, ky) in orderTypeList[orderTypeActive].numList"
                :key="ky"
                :span="6"
              >
                <div class="numBox">
                  <div class="titleBox">
                    <img :src="el.url" class="y" alt="" />
                    {{ el.t }}
                  </div>
                  <div class="n">
                    <a-statistic
                      :value="el.n"
                      :precision="orderTypeActive === 1 && ky === 0 ? 2 : 0"
                      :value-style="{
                        color: '#2d2d2d',
                      }"
                    >
                      <template #prefix>
                        <div
                          v-if="orderTypeActive === 1 && ky === 0"
                          class="rmb"
                          >¥</div
                        >
                      </template>
                    </a-statistic>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row> -->
        </a-space>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted, watchEffect, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from '@/store';
  import { useI18n } from 'vue-i18n';
  import { LineSeriesOption } from 'echarts';
  import { queryDataOverview } from '@/api/visualization';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useThemes from '@/hooks/themes';
  import useChartOption from '@/hooks/chart-option';
  import dayjs from 'dayjs';
  import { changeGuidance } from '@/api/user';
  import {
    plantData,
    accountData,
    livePlantData,
    merchantData,
  } from '@/api/dashboard';
  import { useStorage } from '@vueuse/core';
  import { fun2 } from '@/utils/num';

  const userStore = useUserStore();

  const currentGuide = ref(-1);
  const needGuideLocalstorage = ref(userStore.$state.guidance);
  const steps = [
    {},
    {
      element: '.dataTf',
      title: '投放数据',
      body: '关键数据一目了然，实时查看投产效果',
      placement: 'top-right',
      highlightPadding: 8,
    },

    {
      element: '.dataXD',
      title: '数据概览',
      body: '展示小店数据，方便洞察经营，协助投流方案优化',
      placement: 'top-right',
      highlightPadding: 8,
    },
    {
      element: '.dataGL',
      title: '账号数据',
      body: '展示账号数据，协助商家进行账号管理',
      placement: 'bottom-right',
      highlightPadding: 8,
    },
  ];
  const dataTypeActive = ref(0);
  const getGuiStatus = () => {
    needGuideLocalstorage.value = userStore.$state.guidance;
    if (
      needGuideLocalstorage.value === 0 &&
      localStorage.getItem('GuideStep') === '1'
    ) {
      currentGuide.value = 1;
    } else {
      setTimeout(() => {
        getGuiStatus();
      }, 800);
    }
  };
  const onSkip = async () => {
    currentGuide.value = -1;
    localStorage.setItem('needGuide', 'false');
    const { data } = await changeGuidance({ guidance: 1 });
    await userStore.info();

    localStorage.setItem('GuideStep', '-1');
  };
  const route = useRoute();

  onMounted(() => {
    getGuiStatus();
  });
  const dateActive = ref(0);
  const rangeShortcuts = [
    {
      label: '当日',
      value: [
        dayjs().startOf('day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
      ],
    },
    {
      label: '昨日',
      value: [
        dayjs().add(-1, 'day').format('YYYY-MM-DD'),
        dayjs().add(-1, 'day').format('YYYY-MM-DD'),
      ],
    },
    {
      label: '近一周',
      value: [
        dayjs().add(-1, 'week').format('YYYY-MM-DD'),
        dayjs().add(-1, 'day').format('YYYY-MM-DD'),
      ],
    },
    {
      label: '近一月',
      value: [
        dayjs().add(-1, 'month').format('YYYY-MM-DD'),
        dayjs().add(-1, 'day').format('YYYY-MM-DD'),
      ],
    },
    {
      label: '本月',
      value: [
        dayjs().startOf('month').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
      ],
    },
  ];
  const onFinish = async () => {
    const { data } = await changeGuidance({ guidance: 1 });
    await userStore.info();
    localStorage.setItem('GuideStep', '-1');
  };
  const orderTypeActive = ref(0);
  const returnTypeActive = ref(0);
  const bgcolor = ref('#ff330026');
  const shucolor = ref('#ff3300');
  const dataTypeList = ref([
    {
      label: '短视频',
    },
    { label: '直播间' },
  ]);
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
    // {
    //   title: '加热中数据',
    //   numList: [
    //     {
    //       t: '总余额',
    //       key: 'accountBalance',
    //       url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
    //       n: 0,
    //     },
    //     {
    //       t: '加热中计划数',
    //       url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
    //       n: 0,
    //       key: 'hotPlant',
    //     },
    //     {
    //       t: '加热中视频数',
    //       url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
    //       n: 0,
    //       key: 'hotVideo',
    //     },
    //     {
    //       t: '加热中商品数',
    //       url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
    //       key: 'hotGoods',
    //       n: 0,
    //     },
    //   ],
    // },
  ]);
  const selectModel = () => {
    return {
      startDate: dayjs().format('YYYY-MM-DD').toString(),
      endDate: dayjs().format('YYYY-MM-DD').toString(),
      dateType: 2,
      merchantId: undefined,
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
  console.log(route.query.auth_code, 'route');
  if (route.query.auth_code) {
    // route.query.auth_code = '';
    //
    console.log(localStorage.getItem('waitReload'));
    if (localStorage.getItem('waitReload') === '1') {
      localStorage.setItem('waitReload', '2');

      window.location.reload();
    }
    // setTimeout(() => {
    //   router.push({
    //     name: 'Workplace',
    //     query: {},

    //   });
    // }, 500);
  }
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
    a = '营收（元）',
    b = '成交订单数',
    c = '消耗（元）',
    d = '投放ROI',
    e = '创建计划数',
    f = '发布视频数',
  }
  const OperatingData = ref([
    {
      title: CardTitle.a,
      num: 0,
      num2: 0,
      type: true,
      key: 'productPlaceorderGmv',
      key2: 'productPlaceorderGmvHb',
      url: 'https://img.adyinqing.com/upai_shop/5dea827e1676628633698',
      show: true,
    },
    {
      title: CardTitle.b,
      num: 0,
      num2: 0,
      type: false,
      key: 'productOrderCount',
      key2: 'productOrderCountHb',
      url: 'https://img.adyinqing.com/upai_shop/9phewe3x1676628682838',
      show: true,
    },
    {
      title: CardTitle.c,
      num: 0,
      num2: 0,
      type: true,
      key: 'cost',
      key2: 'costHb',
      url: 'https://img.adyinqing.com/upai_shop/39ttxfcp1676628721182',
      show: true,
    },
    {
      title: CardTitle.d,
      num: 0,
      num2: 0,
      type: true,
      key: 'roi',
      key2: 'roiHb',
      url: 'https://img.adyinqing.com/upai_shop/ocdlgyo91676628747667',
      show: true,
    },
    {
      title: '佣金ROI',
      num: 0,
      num2: 0,
      type: true,
      key: 'yj_roi',
      key2: 'yj_roiHb',
      url: 'https://img.adyinqing.com/upai_shop/ocdlgyo91676628747667',
      show: true,
    },
    {
      title: CardTitle.e,
      num: 0,
      num2: 0,
      type: false,
      key: 'plantCount',
      key2: 'plantCountHb',
      url: 'https://img.adyinqing.com/upai_shop/rga7r62i1676628796223',
      show: true,
    },
    {
      title: CardTitle.f,
      num: 0,
      num2: 0,
      type: false,
      key: 'videoCount',
      key2: 'videoCountHb',
      url: 'https://img.adyinqing.com/upai_shop/doafszco1676628817070',
      show: true,
    },
  ]);

  watch(OperatingData.value, (newValue: any, oldValue: any) => {
    console.log(newValue, 'new');
    if (dataTypeActive.value === 1) {
      OperatingData.value[6].show = false;
    } else {
      OperatingData.value[6].show = true;
    }
  });
  const dates = ref([]);
  const merchantDataList = ref([
    {
      t: '成交金额（元）',
      key: 'dealPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      color: '',
      type: 2,
    },
    {
      t: '成交订单数',
      key: 'dealCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      color: '',
      type: 1,
    },
    {
      t: '下单金额（元）',
      key: 'orderPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      color: '',
      type: 2,
    },
    {
      t: '下单订单数',
      key: 'orderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      color: '',
      type: 1,
    },
    {
      t: '支付转化率',
      key: 'transformRate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: undefined,
      color: '',
      type: 3,
    },
    {
      t: '小店ROI',
      key: 'roi',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: undefined,
      color: '',
      type: 2,
    },
  ]);
  const onSelect = (valueString: any, value: any) => {
    dates.value = value;
  };
  const changeDataType = (k: any) => {
    dataTypeActive.value = k;
    fetchData();
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
      if (dataTypeActive.value) {
        const { data } = await livePlantData(reqModel.value);

        OperatingData.value.forEach((el: any, k: any) => {
          el.num = data[el.key] || 0;
          el.num2 = data[el.key2] || 0;
          if (k === 6) el.show = false;
        });
      } else {
        const { data } = await plantData(reqModel.value);

        OperatingData.value.forEach((el: any, k: any) => {
          el.num = data[el.key] || 0;
          el.num2 = data[el.key2] || 0;
          if (k === 6) el.show = true;
        });
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
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
  const fetchMerchantData = async () => {
    setLoading(true);
    try {
      const { data } = await merchantData(reqModel.value);
      console.log(data);

      merchantDataList.value.forEach((el: any) => {
        if (el.key === 'roi') {
          el.n =
            Number(data[el.key]) > 0
              ? Number(Number(data[el.key]).toFixed(2))
              : 0;
        } else {
          el.n = data[el.key] ? Number(data[el.key]) : 0;
        }
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const changeOrderType = (k: any) => {
    orderTypeActive.value = k;
    fetchAccountData();
    fetchMerchantData();
    // numList.value = orderTypeList.value[orderTypeActive.value].numList;
  };
  fetchAccountData();
  fetchMerchantData();
  fetchData();
  const search = () => {
    // getBoardInfo();
    fetchData();
    fetchMerchantData();
  };
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
      fetchAccountData();
      fetchMerchantData();
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
      fetchAccountData();
      fetchMerchantData();
    }
  };
  const dateChange = (dateString: Array<string>) => {
    // console.log(dateString[0]);
    reqModel.value.startDate = dateString[0].toString();
    reqModel.value.endDate = dateString[1].toString();
    if (datePickShow.value) datePickShow.value = false;
    dateActive.value = -10;
    fetchData();
    fetchAccountData();
    fetchMerchantData();
  };
</script>

<style scoped lang="less">
  .container {
    padding: 24px;
    // overflow: auto;
  }
  .dataTypeBox {
    display: flex;
    align-items: center;
    width: 180px;
    border-radius: 6px;
    border: 1px solid #1059f5;
    overflow: hidden;
    height: 30px;
    .dataType {
      flex: 1;
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      background: transparent;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #000;
    }
    .dataActive {
      color: #fff;
      background: #1059f5;
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
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.13);
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
    padding-left: 14px;
    align-items: baseline;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 6px;
      height: 26px;
      background: #1059f5;
      top: 50%;
      left: 4px;
      transform: translate(-50%, -50%);
    }
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
        background: rgba(255, 31, 22, 0.13);
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
        background: rgba(22, 93, 255, 0.13);
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
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.13);
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
    // height: 43px !important;
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
</style>
