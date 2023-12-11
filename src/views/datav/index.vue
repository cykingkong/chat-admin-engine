<!--index.vue-->
<template>
  <dv-full-screen-container class="allWindow">
    <dv-loading v-if="dataLoading">
      <span style="font-size: 28px; color: #fff">Loading...</span>
    </dv-loading>

    <div>
      <div class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
            <div class="title">
              <span class="title-text">
                <div class="logo" style="width: 160px">
                  <img
                    alt="logo"
                    width="150"
                    src="https://img.adyinqing.com/upai_shop/w7gnw2fu1683645946208"
                  />
                  <!-- <dv-decoration6 style="width: 150px; height: 10px" /> -->
                </div>
              </span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="['#568aea', '#000000']"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>
      </div>

      <div class="d-flex jc-between px-2">
        <div class="d-flex aside-width">
          <div class="react-left ml-4 react-l-s">
            <span class="react-before"></span>
            <span class="text">{{ subtitle[0] }}</span>
          </div>
          <div class="react-left ml-3">
            <span class="text">{{ subtitle[1] }}</span>
          </div>
        </div>
        <div class="d-flex aside-width">
          <div class="react-right bg-color-blue mr-3">
            <span class="text fw-b">{{ subtitle[2] }}</span>
          </div>
          <div class="react-right mr-4 react-l-s">
            <span class="react-after"></span>
            <span class="text">
              {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
              {{ timeInfo.dateDay }}
            </span>
          </div>
        </div>
      </div>
      <div class="hideScrollBar" style="overflow: auto; padding-bottom: 150px">
        <a-row class="grid-demo" style="padding-top: 10px">
          <a-col :flex="3">
            <a-row>
              <a-col flex="220px">
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
            <dv-border-box1 class="dv-bg-gl">
              <a-row :span="24" style="padding: 2.3vh 2.6vh 0px">
                <div class="d-flex">
                  <span class="textIcon mt-1">
                    <icon-fire />
                  </span>
                  <div class="d-flex">
                    <span class="text mx-1 mt-1">{{
                      comeType[comeActive].t2
                    }}</span>
                  </div>
                </div>

                <div class="dv-bg-sm">
                  <dv-scroll-ranking-board
                    :config="comeActive ? liveDataRank : videoDataRank"
                  >
                  </dv-scroll-ranking-board>
                </div>
              </a-row>
            </dv-border-box1>

            <dv-border-box1 class="dv-bg-gl2">
              <a-row :span="24" style="padding: 2.3vh 2.6vh 0px">
                <div v-if="comeActive === 0" class="d-flex">
                  <span class="textIcon mt-1"> <icon-mind-mapping /> </span>
                  <div class="d-flex">
                    <span class="text mx-1 mt-1">商品排行榜</span>
                  </div>
                </div>
                <div class="dv-bg-sm">
                  <dv-scroll-board
                    v-if="comeActive === 0"
                    :config="proDuctDataRank"
                  />
                  <div v-else class="dv-bg-sm"></div>
                </div>
              </a-row>
            </dv-border-box1>
          </a-col>
          <a-col flex="auto">
            <a-row>
              <dv-border-box3 class="dv-bg-gl">
                <a-row style="padding: 2rem 2rem 0 2rem">
                  <a-col :span="8">
                    <dv-decoration1 style="width: 200px; height: 20px" />
                  </a-col>
                  <a-col :span="8">
                    <dv-decoration1 style="width: 200px; height: 20px" />
                  </a-col>
                  <!-- <a-col :span="8" style="text-align: center">
                <span>实时GMV</span>
                <dv-digital-flop style="height: 40px" :config="gmvConfig" />
              </a-col> -->
                  <a-col :span="8">
                    <dv-decoration1 style="width: 200px; height: 20px" />
                  </a-col>
                </a-row>
                <a-row
                  style="text-align: center; height: 100%; padding: 0 23px"
                  :gutter="[12, 0]"
                >
                  <a-col :flex="4">
                    <div class="h">
                      <a-space direction="vertical" :size="0">
                        <div class="priceBox2" style="color: #fff">
                          <a-space direction="vertical" :size="0">
                            <div class="priceTitle">{{
                              comeType[comeActive].label
                            }}</div>
                          </a-space>
                        </div>
                        <div class="priceBox2" style="color: #fff">
                          <!-- <dv-decoration-12 class="ld" /> -->

                          <!--雷达图 -->
                          <a-space direction="vertical" :size="0">
                            <div class="priceTitle">成交金额</div>

                            <a-statistic
                              :value="comeActive ? liveDataGmv : dataGmv"
                              :precision="2"
                              show-group-separator
                            />
                          </a-space>
                        </div>
                      </a-space>
                    </div>
                  </a-col>
                  <a-col :flex="8">
                    <div class="up">
                      <div
                        v-for="item in titleItem"
                        v-show="comeActive == 0"
                        :key="item.text"
                        class="item"
                      >
                        <p class="ta-l colorBlue fw-b">{{ item.text }}</p>
                        <div>
                          <a-statistic
                            :value="item.number"
                            :precision="item.num2"
                            show-group-separator
                          />
                        </div>
                      </div>
                      <div
                        v-for="item in titleLiveItem"
                        v-show="comeActive == 1"
                        :key="item.text"
                        class="item"
                      >
                        <p class="ta-l colorBlue fw-b">{{ item.text }}</p>
                        <div>
                          <a-statistic
                            :value="item.number"
                            :precision="item.num2"
                            show-group-separator
                          />
                        </div>
                      </div>
                    </div>
                  </a-col>
                </a-row>
              </dv-border-box3>
            </a-row>
            <a-row>
              <dv-border-box1 class="dv-bg-gl2 calcHeight" style="width: 100%">
                <a-row style="padding: 2rem 2rem 0 2rem">
                  <a-col :span="24">
                    <div class="d-flex pt-2 pl-2">
                      <span class="textIcon mt-1">
                        <icon-bar-chart />
                      </span>
                      <div class="d-flex">
                        <span class="text mx-1 mt-1"
                          >{{ comeType[comeActive].label }}实时分时数据</span
                        >
                      </div>
                    </div>
                    <div style="height: 33vh; width: 100%; margin-top: 10px">
                      <DataOverView
                        v-if="comeActive === 0"
                        ref="dataOverView"
                      />
                      <LiveDataOverView v-else ref="liveDataOverView" />
                    </div>
                  </a-col>
                </a-row>
              </dv-border-box1>
            </a-row>
          </a-col>
          <a-col :flex="3">
            <dv-border-box1 class="dv-bg-gl">
              <a-row :span="24" style="padding: 2.3vh 2.6vh 0px">
                <div class="d-flex">
                  <span class="textIcon mt-1">
                    <icon-fire />
                  </span>
                  <div class="d-flex">
                    <span class="text mx-1 mt-1">店铺数据</span>
                  </div>
                </div>

                <div class="dv-bg-sm">
                  <div class="up">
                    <div
                      v-for="item in merchantDataList"
                      :key="item.key"
                      class="item"
                    >
                      <p class="ta-l colorBlue fw-b">{{ item.t }}</p>
                      <div>
                        <a-statistic
                          :value="item.n"
                          :precision="item.num2"
                          show-group-separator
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </a-row>
            </dv-border-box1>

            <dv-border-box1 class="dv-bg-gl2 calcHeight">
              <a-row :span="24" style="padding: 2.3vh 2.6vh 0px">
                <div class="d-flex">
                  <span class="textIcon mt-1"> <icon-mind-mapping /> </span>
                  <div class="d-flex">
                    <span class="text mx-1 mt-1">账号数据</span>
                  </div>
                </div>
                <div class="dv-bg-sm">
                  <div class="up">
                    <div
                      v-for="item in orderTypeList"
                      :key="item.key"
                      class="item"
                    >
                      <p class="ta-l colorBlue fw-b">{{ item.t }}</p>
                      <div>
                        <a-statistic
                          :value="item.n"
                          :precision="item.num2"
                          show-group-separator
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </a-row>
            </dv-border-box1>
          </a-col>
        </a-row>
        <a-row>
          <dv-border-box10 class="fill-height">
            <!-- 内容 -->
            <div style="padding: 2.3vh 2.6vh 0px; flex: 1">
              <div class="d-flex">
                <span class="textIcon mt-1"> <icon-ordered-list /> </span>
                <div class="d-flex">
                  <span class="text mx-1 mt-1">当日最佳计划</span>
                </div>
              </div>
              <div class="dv-bg">
                <dv-scroll-ranking-board :config="plantDataRank" />
              </div>
            </div>
          </dv-border-box10>
        </a-row>
      </div>
    </div>
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, reactive } from 'vue';
  import dayjs from 'dayjs';
  import { formatTime } from '@/utils/index';
  import {
    plantData,
    livePlantData,
    merchantData,
    accountData,
  } from '@/api/dashboard';
  import { plantGrid, goodsGridData, videoGridData } from '@/api/plant';
  import _ from 'lodash';
  import {
    livePlantGridData,
    plantGrid as livePlantGrid,
  } from '@/api/live-plant';
  import DataOverView from './components/data-overview.vue';
  import LiveDataOverView from './components/live-data-overview.vue';
  import '@/assets/data_scss/style.scss';

  const startDate = dayjs().format('YYYY-MM-DD').toString();
  const endDate = dayjs().format('YYYY-MM-DD').toString();
  const mulNum = 1;
  const orderTypeList = ref([
    {
      t: '在线投放号',
      key: 'onlineAccount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      num2: 0,
      color: '',
    },
    {
      t: '在线被投号',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      num2: 0,
      n: 0,
      key: 'onlineAccountBack',
    },
    {
      t: '即将掉线',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      num2: 0,
      n: 0,
      key: 'onlineAccountLeave',
    },
    {
      t: '已离线',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      num2: 0,
      n: 0,
      key: 'onlineAccountLeaveEd',
    },
    // {
    //   t: '总余额',
    //   key: 'accountBalance',
    //   url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
    // num2:2,
    //   n: 0,
    // },
    // {
    //   t: '加热中计划数',
    //   url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
    // num2:0,
    //   n: 0,
    //   key: 'hotPlant',
    // },
    // {
    //   t: '加热中视频数',
    //   url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
    //   n: 0,
    //   key: 'hotVideo',
    // num2:0,

    // },
    // {
    //   t: '加热中商品数',
    //   url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
    //   key: 'hotGoods',
    // num2:0,
    //   n: 0,
    // },
  ]);
  const comeType = ref([
    {
      label: '短视频',
      t2: '视频热度排行',
      data: [
        {
          t: '成交金额',
          key: 'advertisingFlowPrice',
          n: 0,
          n2: 0,
        },
        {
          t: '成交金额',
          key: 'advertisingFlowCount',
          n: 0,
          n2: 0,
        },
      ],
    },
    {
      label: '直播间',
      t2: '直播间热度排行',

      data: [
        {
          t: '成交金额',
          key: 'naturalFlowCount',
          n: 0,
          n2: 0,
        },
        {
          t: '成交金额',
          key: 'naturalFlowPrice',
          n: 0,
          n2: 0,
        },
      ],
    },
  ]);
  const comeActive = ref(0);
  const merchantDataList = ref([
    {
      t: '成交金额（¥）',
      key: 'dealPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      num2: 2,
      color: '',
    },
    {
      t: '成交订单数',
      key: 'dealCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      num2: 0,

      color: '',
    },
    {
      t: '下单金额（¥）',
      key: 'orderPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      num2: 2,

      color: '',
    },
    {
      t: '下单订单数',
      key: 'orderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      num2: 0,

      color: '',
    },
    {
      t: '支付转化率',
      key: 'transformRate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: undefined,
      num2: 2,

      color: '',
    },
  ]);
  const titleItem = ref([
    {
      number: 0,
      num2: 2,
      text: '利润',
      key: 'lr',
    },
    {
      number: 0,
      text: '成交订单数',
      num2: 0,
      key: 'productOrderCount',
    },
    {
      num2: 2,
      number: 0,
      text: '消耗',
      key: 'cost',
    },
    {
      number: 0,
      num2: 0,
      text: '创建计划数',
      key: 'plantCount',
    },
    {
      number: 0,
      num2: 0,
      text: '加热中计划',
      key: 'plantHotCount',
    },
    {
      number: 0,
      num2: 2,
      text: 'ROI',
      key: 'roi',
    },
  ]);
  const titleLiveItem = ref([
    {
      number: 0,
      num2: 2,
      text: '利润',
      key: 'lr',
    },
    {
      number: 0,
      text: '成交订单数',
      num2: 0,
      key: 'productOrderCount',
    },
    {
      num2: 2,
      number: 0,
      text: '消耗',
      key: 'cost',
    },
    {
      number: 0,
      num2: 0,
      text: '创建计划数',
      key: 'plantCount',
    },
    // {
    //   number: 0,
    //   num2: 0,
    //   text: '加热中计划',
    //   key: 'plantHotCount',
    // },
    {
      number: 0,
      num2: 2,
      text: 'ROI',
      key: 'roi',
    },
  ]);
  const dataOverView = ref<InstanceType<typeof DataOverView>>();
  const liveDataOverView = ref<InstanceType<typeof LiveDataOverView>>();

  const wh = ref('');
  wh.value = `${window.outerWidth}px`;

  const he = ref('');
  he.value = `${window.outerHeight}px`;

  const dataGmv = ref(0);
  const liveDataGmv = ref(0);
  const plantDataRank = reactive({
    data: [],
    unit: '元(gmv)',
    waitTime: 4000,
    rowNum: 14,
  });
  const liveDataRank = reactive({
    data: [],
    unit: '🔥',
    waitTime: 4000,
    rowNum: 6,
  });
  const videoDataRank = reactive({
    data: [],
    unit: '🔥',
    waitTime: 4000,
    rowNum: 6,
  });

  const proDuctDataRank = reactive({
    header: ['商品ID', '点击', '成交'],
    data: [
      // ['行1列1', '1200', '行1列3'],
      // ['行2列1', '1200', '行2列3'],
      // ['行3列1', '1200', '行3列3'],
      // ['行4列1', '1200', '行4列3'],
      // ['行5列1', '1200', '行5列3'],
      // ['行6列1', '1200', '行6列3'],
      // ['行7列1', '1200', '行7列3'],
      // ['行8列1', '1200', '行8列3'],
      // ['行9列1', '1200', '行9列3'],
      // ['行10列1', '1200', '行10列3'],
    ],
    headerBGC: '#1969f1',
    index: true,
    columnWidth: [50],
    align: ['center'],
    rowNum: 6,
  });
  const timeInfo = reactive({
    setInterval: 0,
    dateDay: '',
    dateYear: '',
    dateWeek: '',
  });

  const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  // 主题名称与副标题名称
  const title = '大数据可视化平台';
  const subtitle = ['', '', '数据大屏'];

  function formatter(number: number) {
    const numbers = number.toString().split('').reverse();
    const segs = [];

    while (numbers.length) segs.push(numbers.splice(0, 3).join(''));

    return segs.join(',').split('').reverse().join('');
  }

  const fun = (val: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      return 0;
    }
    if (Number(val) === 0) {
      return 0;
    }
    if (val === Infinity) {
      return 0;
    }
    return Number(val).toFixed(2);
  };
  const fetchGmvData = async () => {
    try {
      const { data } = await plantData({
        startDate,
        endDate,
        dateType: 2,
      });

      data.productPlaceorderGmv *= mulNum;
      data.cost *= mulNum;
      data.plantCount *= mulNum;
      data.plantHotCount *= mulNum;
      data.productOrderCount *= mulNum;
      if (data.productPlaceorderGmv > 0) {
        data.lr = Number(
          fun(data.productPlaceorderGmv * data.pjYjl - data.cost)
        );
      } else {
        data.lr = 0;
      }
      data.roi = Number(fun(data.productPlaceorderGmv / data.cost));
      dataGmv.value = data.productPlaceorderGmv;
      titleItem.value.forEach((el: any) => {
        el.number = data[el.key];
        // el.num2 = data[el.key2];
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      // setLoading(false);
    }
  };
  const fetchLiveGmvData = async () => {
    try {
      const { data } = await livePlantData({
        startDate,
        endDate,
        dateType: 2,
      });

      data.productPlaceorderGmv *= mulNum;
      data.cost *= mulNum;
      data.plantCount *= mulNum;
      data.plantHotCount *= mulNum;
      data.productOrderCount *= mulNum;
      if (data.productPlaceorderGmv > 0) {
        data.lr = Number(
          fun(data.productPlaceorderGmv * data.pjYjl - data.cost)
        );
      } else {
        data.lr = 0;
      }
      data.roi = Number(fun(data.productPlaceorderGmv / data.cost));
      liveDataGmv.value = data.productPlaceorderGmv;
      titleLiveItem.value.forEach((el: any) => {
        el.number = data[el.key];
        // el.num2 = data[el.key2];
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      // setLoading(false);
    }
  };
  const fetchMerchantData = async () => {
    try {
      const { data } = await merchantData(reqModel.value);
      console.log(data);

      merchantDataList.value.forEach((el: any) => {
        el.n = Number(data[el.key]) || 0;
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      //
    }
  };
  const fetchAccountData = async () => {
    try {
      const { data } = await accountData({});

      orderTypeList.value.forEach((el: any) => {
        el.n = data[el.key];
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      //
    }
  };
  const fetchPlantData = async (type: any) => {
    try {
      if (type) {
        const { data } = await livePlantGrid({
          startDate,
          endDate,
          pageIndex: 1,
          pageSize: 30,
          orderKey: 'productPlaceorderGmv',
          orderSort: 'DESC',
        });
        if (data.grid) {
          // plantDataRank.data = [];
          data.grid.forEach((el: any) => {
            el.productPlaceorderGmv *= mulNum;
            const findKey = _.findIndex(plantDataRank.data, [
              'key',
              el.plantCode,
            ]);
            if (findKey >= 0) {
              plantDataRank.data[findKey].value = el.productPlaceorderGmv;
            } else {
              // @ts-ignore
              plantDataRank.data.push({
                key: el.plantCode,
                name: el.plantCode,
                value: el.productPlaceorderGmv,
              });
            }
          });
        }
      } else {
        const { data } = await plantGrid({
          startDate,
          endDate,
          pageIndex: 1,
          pageSize: 30,
          orderKey: 'productPlaceorderGmv',
          orderSort: 'DESC',
        });
        if (data.grid) {
          // plantDataRank.data = [];
          data.grid.forEach((el: any) => {
            el.productPlaceorderGmv *= mulNum;
            const findKey = _.findIndex(plantDataRank.data, [
              'key',
              el.plantCode,
            ]);
            if (findKey >= 0) {
              plantDataRank.data[findKey].value = el.productPlaceorderGmv;
            } else {
              // @ts-ignore
              plantDataRank.data.push({
                key: el.plantCode,
                name: el.plantCode,
                value: el.productPlaceorderGmv,
              });
            }
          });
        }
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      // setLoading(false);
    }
  };

  const fetchVideoData = async () => {
    try {
      const { data } = await videoGridData({
        startDate,
        endDate,
        pageIndex: 1,
        pageSize: 6,
        orderKey: 'exposureCount',
        orderSort: 'DESC',
      });

      if (data.grid) {
        data.grid.forEach((el: any) => {
          el.exposureCount += 1;
          el.exposureCount *= mulNum;
          const findKey = _.findIndex(videoDataRank.data, ['key', el.videoId]);
          if (findKey >= 0) {
            videoDataRank.data[findKey].value = el.productPlaceorderGmv;
          } else {
            // @ts-ignore
            videoDataRank.data.push({
              key: el.videoId,
              name: `${el.videoNickName}(${el.signature ? el.videoId : '-'})`,
              value: el.exposureCount,
            });
          }
        });
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      // setLoading(false);
    }
  };
  const fetchLiveData = async () => {
    try {
      const { data } = await livePlantGridData({
        startDate,
        endDate,
        pageIndex: 1,
        pageSize: 6,
        orderKey: 'product_placeorder_gmv',
        orderSort: 'DESC',
      });

      if (data.length) {
        data.forEach((el: any) => {
          el.exposureCount += 1;
          el.exposureCount *= mulNum;
          // const findKey = _.findIndex(videoDataRank.data, ['key', el.videoId]);
          // if (findKey >= 0) {
          //   liveDataRank.data[findKey].value = el.productPlaceorderGmv;
          // } else {
          // @ts-ignore
          liveDataRank.data.push({
            name: `${el.PlantName}`,
            value: el.ProductPlaceorderGmv,
          });
          // }
        });
        console.log(liveDataRank.data, '3456789');
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      // setLoading(false);
    }
  };
  const fetchGoodsData = async () => {
    try {
      const { data } = await goodsGridData({
        startDate,
        endDate,
        pageIndex: 1,
        pageSize: 6,
        orderKey: 'productClickCountPv',
        orderSort: 'DESC',
      });

      if (data.grid) {
        data.grid.forEach((el: any) => {
          el.productClickCountPv += 1;
          el.productPlaceorderGmv *= mulNum;
          el.productClickCountPv *= mulNum;
          const findKey = _.findIndex(proDuctDataRank.data, el.goodsName);
          if (findKey >= 0) {
            proDuctDataRank.data[findKey] = [
              String(el.goodsName),
              String(el.productClickCountPv),
              String(el.productPlaceorderGmv),
            ];
          } else {
            // @ts-ignore
            proDuctDataRank.data.push([
              String(el.goodsName),
              String(el.productClickCountPv),
              String(el.productPlaceorderGmv),
            ]);
          }
          console.log(proDuctDataRank.data);
        });
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      // setLoading(false);
    }
  };
  const water = reactive({
    data: [24, 45],
    shape: 'roundRect',
    formatter: '{value}%',
    waveNum: 3,
  });
  const generateFormReqModel = () => {
    return {
      startDate,
      endDate,
      pageIndex: 1,
      pageSize: 10,
      taskStatus: -1,
    };
  };
  const reqModel = ref(generateFormReqModel());

  const handleTime = () => {
    timeInfo.setInterval = setInterval(() => {
      const date = new Date();
      timeInfo.dateDay = formatTime(date, 'HH: mm: ss');
      timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd');
      timeInfo.dateWeek = WEEK[date.getDay()];
    }, 1000);
  };

  const charts = async () => {
    setTimeout(() => {
      dataOverView.value?.setChartsData(reqModel.value);
    }, 200);
  };
  const liveCharts = async () => {
    setTimeout(() => {
      liveDataOverView.value?.setChartsData(reqModel.value);
    }, 200);
  };
  const timeFlash = async (func: any, timer: any) => {
    setTimeout(() => {
      func();

      timeFlash(func, timer);
    }, timer);
  };
  const timeFlashType = async (func: any, timer: any, type: any) => {
    setTimeout(() => {
      func(comeActive.value);
      console.log(type);

      timeFlashType(func, timer, comeActive.value);
    }, timer);
  };
  const dataLoading = ref(true);
  const initData = async () => {
    await charts();
    await fetchAccountData();
    await fetchMerchantData();
    await liveCharts();
    await fetchGmvData();
    await fetchLiveGmvData();
    await fetchPlantData(0);
    await fetchVideoData();
    await fetchLiveData();
    await fetchGoodsData();
    setTimeout(() => {
      dataLoading.value = false;
    }, 30);
  };
  const comeChange = (k: any) => {
    comeActive.value = k;
    if (k === 1) {
      liveCharts();
      fetchPlantData(1);
    } else {
      charts();
      fetchPlantData(0);
    }
  };
  onMounted(() => {
    handleTime();
    initData();
    timeFlash(charts, 60000);
    timeFlash(fetchGmvData, 5000);
    timeFlash(fetchLiveGmvData, 5000);
    timeFlashType(fetchPlantData, 6000, comeActive.value);
    timeFlash(fetchVideoData, 5000);
    timeFlash(fetchLiveData, 5000);
  });
</script>

<style lang="less" scoped>
  .allWindow {
    height: v-bind(he);
    width: v-bind(wh);
    padding: 16px 16px 0 16px;

    background-image: url('../../assets/pageBg.png');
    background-size: cover;
    background-position: center center;
    /* display: flex; */
    // background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }

  .rank {
    width: 33.4rem;
  }
  .fill-height {
    height: 600px;
    overflow: hidden;
  }

  .dv-bg {
    height: calc(96vh - 155px);
    width: 100%;
    align-items: center;
    justify-content: center;
    --un-text-opacity: 1;
    color: rgba(255, 255, 255, var(--un-text-opacity));
  }

  .dv-bg-gl {
    height: calc(47vh - 56px);
    width: 100%;
    justify-content: center;
    --un-text-opacity: 1;
    color: rgba(255, 255, 255, 1);
  }

  .dv-bg-sm {
    height: calc(50vh - 155px);
    width: 100%;
    padding-top: 1vh;
    align-items: center;
    justify-content: center;
    --un-text-opacity: 1;
    color: rgba(255, 255, 255, var(--un-text-opacity));
  }
  .dv-bg-gl2 {
    height: calc(44vh - 19px);
    /* width: 700px; */
    /* padding: 2rem 2rem 0 2rem; */
    justify-content: center;
    --un-text-opacity: 1;
    color: rgba(255, 255, 255, var(--un-text-opacity));
  }
  .calcHeight {
    height: calc(47vh - 19px);
  }

  .text {
    color: #c3cbde;
  }
  .textIcon {
    color: #68d1e2;
  }

  .dv-dec-10,
  .dv-dec-10-s {
    width: 33.3%;
    height: 5px;
  }
  .dv-dec-10-s {
    transform: rotateY(180deg);
  }
  .dv-dec-8 {
    width: 200px;
    height: 50px;
  }
  .title {
    position: relative;
    width: 500px;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: #d3d6dd;

    .title-text {
      font-size: 24px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      color: #d3d6dd;
    }

    .dv-dec-6 {
      position: absolute;
      bottom: -30px;
      left: 50%;
      width: 250px;
      height: 8px;
      transform: translate(-50%);
    }
  }

  // 第二行
  .aside-width {
    width: 40%;
  }
  .react-r-s,
  .react-l-s {
    background-color: #0f1325;
  }

  // 平行四边形
  .react-right {
    &.react-l-s {
      text-align: right;
      width: 500px;
    }
    font-size: 18px;
    width: 300px;
    line-height: 50px;
    text-align: center;
    transform: skewX(-45deg);

    .react-after {
      position: absolute;
      right: -25px;
      top: 0;
      height: 50px;
      width: 50px;
      background-color: #0f1325;
      transform: skewX(45deg);
    }

    .text {
      display: inline-block;
      transform: skewX(45deg);
    }
  }

  .react-left {
    &.react-l-s {
      width: 500px;
      text-align: left;
    }
    font-size: 18px;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transform: skewX(45deg);
    background-color: #0f1325;

    .react-before {
      position: absolute;
      left: -25px;
      top: 0;
      height: 50px;
      width: 50px;
      background-color: #0f1325;
      transform: skewX(-45deg);
    }

    .text {
      display: inline-block;
      transform: skewX(-45deg);
    }
  }
  .priceBox {
    height: 8vh;
    display: flex;
    align-items: center;
    margin: 0 auto;
    font-size: 2.5vh !important;

    :deep(.arco-statistic-value-integer) {
      font-size: 3.5vh !important;
      color: #fff;
    }
  }
  .hideScrollBar {
    height: 100vh;
    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }

  .priceBox2 {
    height: 9vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .priceTitle {
      text-align: left;
      font-size: 1.5vh !important;
    }
    :deep(.arco-statistic-value-integer) {
      font-size: 4vh !important;
      color: #fff;
      font-weight: 700;
      line-height: 1 !important;
      font-family: DINAlternate-Bold, DINAlternate;
      font-variant: tabular-nums;
      font-feature-settings: 'tnum';
    }
    :deep(.arco-statistic-value-decimal) {
      font-size: 4vh !important;
      color: #fff;
      font-weight: 700;

      line-height: 1 !important;
      font-family: DINAlternate-Bold, DINAlternate;
      font-variant: tabular-nums;
      font-feature-settings: 'tnum';
    }
  }
  .dv-dig-flop {
    width: 100%;
    height: 3vh;
  }
  .ld {
    width: 23.3vh;
    height: 23.3vh;
    // height: 600px;
  }

  .water {
    width: 100%;
    .dv-wa-le-po {
      height: 120px;
    }
  }
  .gridBox {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    align-items: center;
    justify-content: center;
    height: 37vh;
  }

  .up {
    width: 100%;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-around;
    // height: 36vh;

    display: grid;
    padding-right: 3vh;
    padding-bottom: 1vh;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    align-items: center;
    justify-content: center;
    // gap: 8px;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      // width: 32%;
      height: 9.5vh;
      text-align: left;
      :deep(.arco-statistic-value-integer) {
        font-size: 3.2vh !important;
        color: #fff;
        line-height: 1 !important;
        font-family: DINAlternate-Bold, DINAlternate;
        font-variant: tabular-nums;
        font-feature-settings: 'tnum';
      }
      :deep(.arco-statistic-value-decimal) {
        font-size: 3.2vh !important;
        color: #fff;
        line-height: 1 !important;
        font-family: DINAlternate-Bold, DINAlternate;
        font-variant: tabular-nums;
        font-feature-settings: 'tnum';
      }
      .ta-l {
        font-size: 1.5vh !important;
        text-align: left;
      }
    }
  }
  .orderComeTypeBox {
    width: 220px;
    height: 30px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    margin-bottom: 8px;
    // border: 1px solid #1059f5;
    .comeBtn {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      cursor: pointer;
      font-weight: 500;
      color: #fff;
      background: #222;
    }
    .comeBtnActive {
      color: #000000;
      background: #fff;
    }
  }
</style>
