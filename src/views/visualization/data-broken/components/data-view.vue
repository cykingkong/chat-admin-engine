<template>
  <div class="panel">
    <a-row class="banner">
      <a-col :span="10" class="accountCheck">
        <div class="titleBox">
          <div class="textBox">
            <div class="leftBorder"> </div>
            <div class="titleText" style="color: #000"> GMV数据趋势 </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row class="banner-search" :gutter="{ md: 8, lg: 24 }">
      <a-col :span="6">
        <a-form>
          <a-form-item label="订单类型:">
            <a-select
              v-model="reqModelGMV.orderType"
              allow-clear
              placeholder="请选择订单类型"
              :rules="[
                {
                  required: true,
                  message: '请选择订单类型',
                },
              ]"
            >
              <a-option
                v-for="(e, k) in orderTypeList"
                :key="k"
                :value="e.dictionaryCode"
                >{{ e.dictionaryName }}</a-option
              >
            </a-select>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="10" class="accountTime">
        <a-row>
          <a-col :span="22">
            <a-range-picker
              :default-value="[
                dayjs().add(-30, 'day').format('YYYY-MM-DD HH:mm:ss'),
                dayjs(),
              ]"
              style="width: 100%"
              :shortcuts="rangeShortcuts"
              shortcuts-position="left"
              @change="dateChangeGMV"
            />
          </a-col>
          <a-col :span="2">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-refresh />
              </template>
              <template #default>搜索</template>
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div style="padding: 16px 20px 0 20px">
      <DataOverViewGMV ref="dataOverViewGmv" />
    </div>
  </div>

  <div class="panel">
    <a-row class="banner">
      <a-col :span="10" class="accountCheck">
        <div class="titleBox">
          <div class="textBox">
            <div class="leftBorder"> </div>
            <div class="titleText" style="color: #000"> 商品访问数据趋势 </div>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row class="banner-search">
      <a-col :span="6">
        <a-form>
          <a-form-item field="merchant" label="商品:">
            <a-input
              v-model="reqModel.proCode"
              placeholder="输入商品编码"
            ></a-input>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="10" :offset="6" class="accountTime">
        <a-row>
          <a-col :span="19">
            <a-range-picker
              :default-value="[dayjs().add(-30, 'day'), dayjs()]"
              style="width: 100%"
              :shortcuts="rangeShortcuts"
              shortcuts-position="left"
              @change="dateChange"
            />
          </a-col>
          <a-col :span="2">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-refresh />
              </template>
              <template #default>搜索</template>
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div style="padding: 16px 20px 0 20px">
      <DataOverView ref="dataOverView" />
    </div>
  </div>
  <!-- TOP10商品 -->

  <div class="panel">
    <a-row class="banner">
      <a-col :span="10" class="accountCheck">
        <div class="titleBox">
          <div class="textBox">
            <div class="leftBorder"> </div>
            <div class="titleText" style="color: #000"> Top10商品 </div>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row class="banner-search">
      <a-col :span="6"> </a-col>
      <a-col :span="10" :offset="6" class="accountTime">
        <a-row>
          <a-col :span="19">
            <a-range-picker
              :default-value="[dayjs().add(-7, 'day'), dayjs()]"
              style="width: 100%"
              :shortcuts="rangeShortcuts"
              shortcuts-position="left"
              @change="dateChangeTop"
            />
          </a-col>
          <a-col :span="2">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-refresh />
              </template>
              <template #default>搜索</template>
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div style="padding: 16px 20px 0 20px">
      <DataOverViewTop ref="dataOverViewTOP" />
    </div>
  </div>
  <!-- TOP10落地页 -->
  <div class="panel">
    <a-row class="banner">
      <a-col :span="10" class="accountCheck">
        <div class="titleBox">
          <div class="textBox">
            <div class="leftBorder"> </div>
            <div class="titleText" style="color: #000"> Top10广告投放链接 </div>
          </div>
        </div>
      </a-col>
    </a-row>

    <a-row class="banner-search">
      <a-col :span="6"> </a-col>
      <a-col :span="10" :offset="6" class="accountTime">
        <a-row>
          <a-col :span="19">
            <a-range-picker
              :default-value="[dayjs().add(-7, 'day'), dayjs()]"
              style="width: 100%"
              :shortcuts="rangeShortcuts"
              shortcuts-position="left"
              @change="dateChangeTop"
            />
          </a-col>
          <a-col :span="2">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-refresh />
              </template>
              <template #default>搜索</template>
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div style="padding: 16px 20px 20px">
      <DataOverViewTopLdy ref="dataOverViewTOPLDY" />
    </div>
  </div>
  <!-- <a-card class="general-card-upai" style="margin-top:20px">
   
  </a-card> -->
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { computed, ref, toRefs } from 'vue';
  import useLoading from '@/hooks/loading';
  import { useUserStore } from '@/store';
  import {
    GetAdHourReportData,
    GetBoardInfo,
    getGMVData,
    GetReportByIndexData,
    getTop10Product,
    getTop10Ldy,
  } from '@/api/data';

  import { getAllDictionary } from '@/api/order';

  // import { Icon } from '@arco-design/web-vue';
  import DataOverView from './data-overview.vue';
  import DataOverViewGMV from './data-overview-gmv.vue';
  import DataOverViewTop from './data-overview-top10.vue';
  import DataOverViewTopLdy from './data-overview-top10ldy.vue';

  // const popularContent = ref<InstanceType<typeof PopularContent>>();
  // const dataDayil = ref<InstanceType<typeof DataDayil>>();

  const dataOverView = ref<InstanceType<typeof DataOverView>>();
  const dataOverViewGmv = ref<InstanceType<typeof DataOverViewGMV>>();
  const dataOverViewTOP = ref<InstanceType<typeof DataOverViewTop>>();
  const dataOverViewTOPLDY = ref<InstanceType<typeof DataOverViewTopLdy>>();

  const { loading, setLoading } = useLoading(false);
  const userStore = useUserStore();
  const userInfo = computed(() => {
    return {
      name: userStore.name,
    };
  });
  const dataFormModel = () => {
    return {
      xiohao: 103123.23,
      chengjiao: 100389.43,
      roi: 109,
      xiaohaoAc: 199,
      plantNum: 299,
      newPlant: 39,
    };
  };
  const dataInfo = ref(dataFormModel());

  const defaultData = {
    key: '',
    label: '',
    value: '',
    image: '',
    hidden: false,
  };
  const orderTypeList = ref<any[]>([]);
  const getDictionaryList = async () => {
    const { data } = await getAllDictionary();

    // eslint-disable-next-line array-callback-return, consistent-return
    data.forEach((el: any) => {
      if (el.dictionaryKey === 'order_type') {
        console.log(el);
        orderTypeList.value = el.childDictionary;
      }
    });
  };
  getDictionaryList();
  // const merchantList = ref<any[]>([]);
  // const getMerchantList = async () => {
  //   const { data } = await getMerchantCombList();
  //   merchantList.value = data;
  // };
  // getMerchantList();
  const rangeShortcuts = [
    {
      label: '当日',
      value: () => [dayjs(), dayjs()],
    },
    {
      label: '昨日',
      value: () => [dayjs().add(-1, 'day'), dayjs().add(-1, 'day')],
    },
    {
      label: '近一周',
      value: () => [dayjs().add(-1, 'week'), dayjs().add(-1, 'day')],
    },
    {
      label: '近一月',
      value: () => [dayjs().add(-1, 'month'), dayjs().add(-1, 'day')],
    },
    {
      label: '本月',
      value: () => [dayjs().startOf('month'), dayjs()],
    },
  ];

  const selectModel = () => {
    return {
      startDate: dayjs().add(-30, 'day').format('YYYY-MM-DD').toString(),
      endDate: dayjs().format('YYYY-MM-DD').toString(),
      merchantId: null,
      proCode: null,
    };
  };
  const selectModelGMV = () => {
    return {
      startDate: dayjs().add(-30, 'day').format('YYYY-MM-DD').toString(),
      endDate: dayjs().format('YYYY-MM-DD').toString(),
      merchantId: null,
      orderType: null,
    };
  };
  const selectModelTop = () => {
    return {
      startDate: dayjs().add(-30, 'day').format('YYYY-MM-DD').toString(),
      endDate: dayjs().format('YYYY-MM-DD').toString(),
      startHour: null,
      endHour: null,
    };
  };
  const reqModel = ref(selectModel());
  const reqModelGMV = ref(selectModelGMV());
  const reqModelTop = ref(selectModelTop());
  const reqModelTopLdy = ref(selectModelTop());

  const dateChange = (dateString: Array<string>) => {
    reqModel.value.startDate = dateString[0].toString();
    reqModel.value.endDate = dateString[1].toString();
  };
  const dateChangeGMV = (dateString: Array<string>) => {
    reqModelGMV.value.startDate = dateString[0].toString();
    reqModelGMV.value.endDate = dateString[1].toString();
  };
  const dateChangeTop = (dateString: Array<string>) => {
    reqModelTop.value.startDate = dateString[0].toString();
    reqModelTop.value.endDate = dateString[1].toString();
  };
  const dateChangeTopLdy = (dateString: Array<string>) => {
    reqModelTopLdy.value.startDate = dateString[0].toString();
    reqModelTopLdy.value.endDate = dateString[1].toString();
  };
  const props = defineProps({
    mediaId: {
      type: Number,
      default: 1,
    },
  });
  const getTopData = async () => {};
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await GetReportByIndexData(reqModel.value);
      dataOverView.value?.setParamsData(reqModel.value);
      const res = await getGMVData(reqModelGMV.value);
      const GMVData = res.data;
      const topData = await getTop10Product(reqModelTop.value);
      const topLdyData = await getTop10Ldy(reqModelTopLdy.value);

      dataOverViewTOP.value?.setTopData(topData.data);
      dataOverViewTOPLDY.value?.setTopData(topLdyData.data);
      dataOverView.value?.setChartsData(data);
      dataOverViewGmv.value?.setParamsData(reqModel.value);

      dataOverViewGmv.value?.setChartsData(GMVData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // setTimeout(() => {}, 1200);
  };

  const boardAdvArr = ref<string[]>([]);
  const boardAdvIdArr = ref<number[]>([]);
  const moneyCount = ref<number>(0);

  const changeMerchant = (value: any) => {
    const key = boardAdvArr.value.indexOf(value);
    reqModel.value.advId = boardAdvIdArr.value[key];
    if (!value) {
      reqModel.value.advId = 0;
    }
  };

  // const getBoardInfo = async () => {
  //   const { data } = await GetBoardInfo({ mediaId: mediaId.value });
  //   // banner.value?.setUserdata(data);
  //   moneyCount.value = 0;
  //   data.boardAdvList.forEach((adv: any) => {
  //     moneyCount.value += adv.moneyCount;
  //     if (adv.dyAdvId != null) {
  //       boardAdvArr.value.push(`${adv.advName}(${adv.dyAdvId})`);
  //     } else {
  //       boardAdvArr.value.push(`${adv.advName}`);
  //     }
  //     boardAdvIdArr.value.push(adv.advId);
  //   });
  // };

  const search = () => {
    // getBoardInfo();
    fetchData();
    // getTopData();
  };
  // setLoading(true);
  //   getBoardInfo();
  // getBoardInfo();
  fetchData();
  // getTopData();
</script>

<style lang="less" scoped>
  .panel {
    overflow-x: hidden;
    background-color: var(--color-bg-2);
    border-radius: 4px;
    overflow: auto;
  }
  .banner {
    width: 100%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }
  .banner-search {
    width: 100%;
    padding: 10px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  /deep/.arco-statistic-content .arco-statistic-value-integer {
    font-size: 18px;
  }
  /deep/.arco-statistic-content .arco-statistic-value-decimal {
    font-size: 18px;
  }

  .arco-form-item {
    margin-bottom: 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
  }
  .panel-col {
    // padding-left: 10px;
    border-right: 1px solid rgb(var(--gray-2));
    padding: 10px 0 10px 10px;
    margin-right: 6px;
    transition: all 0.5s;
  }
  .panel-col:hover {
    //border-radius: 19px;

    box-shadow: 2px 2px 8px rgb(0 0 0 / 20%);
  }

  .panel-col:nth-child(4n) {
    margin-right: 0;
    //border: none;
  }
  .col-avatar {
    // margin-right: 12px;
    background-color: var(--color-fill-2);
  }
  .up-icon {
    color: rgb(var(--red-6));
  }
  .unit {
    margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 12px;
  }
  :deep(.panel-border) {
    margin: 4px 0 0 0;
  }

  @media all and (max-width: 612px) and (min-width: 300px) {
    .panel-col {
      padding-left: 2px !important;
      border-right: 1px solid rgb(var(--gray-2)) !important;
    }
    .col-avatar {
      margin-right: 0px !important;
      background-color: var(--color-fill-2) !important;
    }

    .accountMoney {
      flex: 0 0 100% !important;
      width: 100% !important;
    }
    .accountCheck {
      flex: 0 0 100% !important;
      width: 100% !important;
      margin-left: 0 !important;
    }

    .accountTime {
      flex: 0 0 100% !important;
      width: 100% !important;
      margin-left: 0 !important;
    }
  }
  .titleBox {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .textBox {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .leftBorder {
    width: 4px;
    height: 20px;
    background-image: linear-gradient(
      -225deg,
      #22e1ff 0%,
      #1d8fe1 48%,
      #625eb1 100%
    );
    margin-right: 8px;
  }
</style>
