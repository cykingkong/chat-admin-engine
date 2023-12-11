<template>
  <a-modal
    v-model:visible="visible"
    width="80%"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 计划分时报表 </template>
    <div>
      <a-row>
        <a-col :flex="1">
          <a-form :model="reqModel">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="number" label="计划ID">
                  <span>{{ reportInfo.plantCode }}</span>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" label="计划名称">
                  <span>{{ reportInfo.plantName }}</span>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createdTime" label="报表时间">
                  <a-date-picker
                    :default-value="dayjs()"
                    style="width: 100%"
                    :shortcuts="rangeShortcuts"
                    shortcuts-position="left"
                    @change="dateChange"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <!-- <a-button type="primary" @click="exportExcel">
              <template #icon>
                <icon-download />
              </template>
              {{ $t('searchTable.form.daochu') }}
            </a-button> -->
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 8px" />
      <!-- <div style="padding: 16px 20px 0 20px">
        <DataOverView ref="dataOverView" />
      </div>
      <a-divider style="margin-top: 0" /> -->

      <t-table
        row-key="plantId"
        :data="reportData"
        :columns="plantColumns"
        :loading="loading"
        :column-controller="{
          placement: 'top-right',
          dialogProps: { preventScrollThrough: true },
          buttonProps: {
            content: '显示列控制',
            theme: 'primary',
            variant: 'base',
          },
        }"
        :pagination="false"
        :bordered="true"
        table-layout="fixed"
        :default-display-columns="disPlayColumns"
        :on-display-columns-change="disPlayColumnsChange"
        @sort-change="sorterChange"
      >
      </t-table>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, toRefs, defineExpose, reactive, computed } from 'vue';
  import { reportHourData } from '@/api/plant';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination, Options } from '@/types/global';
  import dayjs from 'dayjs';
  import { EXlsx } from '@/utils/xlsx';
  import { enumToObject, targetType } from '@/utils/enum';
  import DataOverView from './data-overview.vue';

  const dataOverView = ref<InstanceType<typeof DataOverView>>();

  const scroll = {
    x: 2000,
    y: 500,
  };
  const generateFormModel = () => {
    return {
      plantCode: '',
      reportDate: dayjs().format('YYYY-MM-DD').toString(),
    };
  };

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const plantData = ref<Array<any>>([]);
  // const renderReqData = ref<PolicyParams>( {} );
  const reqModel = ref(generateFormModel());
  const reportInfo = ref<any>({});
  const reportData = ref<any>([]);

  const rangeShortcuts = [
    {
      label: '当日',
      value: () => dayjs(),
    },
    {
      label: '昨日',
      value: () => dayjs().add(-1, 'day'),
    },
  ];

  const plantColumns = ref([
    {
      colKey: 'plantCode',
      title: '计划ID',
      width: '180',
      fixed: 'left',
      align: 'left',
    },
    {
      colKey: 'plantName',
      title: '计划名称',
      width: '150',
      fixed: 'left',
      align: 'left',
    },
    {
      colKey: 'plantReportHour',
      title: '投放时段',
      width: '150',
      align: 'center',
    },
    {
      colKey: 'estimatedWecoinAmount',
      title: '投放金额',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'cost',
      title: '消耗金额',
      width: '120',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productOrderCount',
      title: '订单数',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productPlaceorderGmv',
      title: '营业额',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'lr',
      title: '利润',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'roi',
      title: 'ROI',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'yl_roi',
      title: '佣金ROI',
      width: '125',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'yjl',
      title: '佣金率',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'airCost',
      title: '空炮余额',
      width: '120',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productClickCountPv',
      title: '商品点击',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'exposureCount',
      title: '浏览',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'targetType',
      title: '投放目标',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'wecoinBid',
      title: '出价',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'duration',
      title: '投放时长',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'click_rate',
      title: '点击率',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'qan_cost',
      title: '千展成本',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'click_cost',
      title: '点击成本',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'zh_cost',
      title: '转化成本',
      width: '100',
      align: 'center',
    },
  ]);

  const fun4 = (val: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      return '-';
    }
    if (Number(val) === 0) {
      return '-';
    }
    return Number(val * 100).toFixed(2);
  };
  const fun2 = (val: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      return '-';
    }
    if (Number(val) === 0) {
      return '-';
    }
    if (val === Infinity) {
      return '-';
    }
    return Number(val).toFixed(2);
  };

  const dateChange = (dateString: any) => {
    // eslint-disable-next-line prefer-destructuring
    reqModel.value.reportDate = dateString;
    // eslint-disable-next-line prefer-destructuring
  };
  // 下载

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await reportHourData(reqModel.value);
      // console.log(data, 'data2');

      if (data.grid) {
        data.grid.forEach((el: any, key: any) => {
          el.key = String(key + 1);
          if (el.productPlaceorderGmv > 0) {
            el.lr = fun2(el.productPlaceorderGmv * (el.yjl / 100) - el.cost);
          } else {
            el.lr = 0;
          }
          el.cost = fun2(el.cost);
          el.productOrderCount = fun2(el.productOrderCount);
          el.productPlaceorderGmv = fun2(el.productPlaceorderGmv);
          el.roi = fun2(el.productPlaceorderGmv / el.cost);
          el.yl_roi = fun2(
            (el.productPlaceorderGmv * (el.yjl / 100)) / el.cost
          );
          el.airCost = fun2(el.airCost);
          el.productClickCountPv = fun2(el.productClickCountPv);
          el.exposureCount = fun2(el.exposureCount);
          el.targetType = targetType[el.targetType];
          el.wecoinBid = el.wecoinBid > 0 ? el.wecoinBid : '智能';
          el.duration = `${el.duration / 3600}小时`;
          el.click_rate =
            fun4(el.productClickCountPv / el.exposureCount) === '-'
              ? '-'
              : `${fun4(el.productClickCountPv / el.exposureCount)}%`;
          el.qan_cost = fun2((el.cost / el.exposureCount) * 1000);
          el.click_cost = fun2(el.cost / el.productClickCountPv);
          el.zh_cost = fun2(el.cost / el.productOrderCount);

          el.shutdownSwitch = el.shutdownStatus !== 0;
          el.plantReportHour = `${el.reportHour - 1}:00~${el.reportHour}:00`;
        });
      }
      reportData.value = data.grid || [];

      // dataOverView.value?.setParamsData({
      //   startDate: formModel.value.reportDate,
      //   endDate: formModel.value.reportDate,
      // });

      // dataOverView.value?.setChartsData(reportData.value);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const search = () => {
    fetchData();
  };
  // fetchData();

  const fun = (val: any) => {
    return Number(val).toFixed(2);
  };
  // const fun = (val: any) => {
  //   return `${val.toFixed(2)}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  // };
  const visible = ref<boolean>(false);

  const disPlayColumns = ref([]);
  if (localStorage.getItem('report-hour-disPlayColumns')) {
    disPlayColumns.value = JSON.parse(
      localStorage.getItem('report-hour-disPlayColumns')
    );
  } else {
    plantColumns.value.forEach((el: any) => {
      disPlayColumns.value.push(el.colKey);
    });
  }
  const disPlayColumnsChange = async (value: any) => {
    localStorage.setItem('report-hour-disPlayColumns', JSON.stringify(value));
  };

  const sorterChange = async (sort: any) => {
    if (sort) {
      reqModel.value.orderKey = sort.sortBy;
      reqModel.value.orderSort = sort.descending ? 'DESC' : 'ASC';
    } else {
      reqModel.value.orderSort = null;
    }
    search();
  };

  const showModel = (row: any) => {
    visible.value = true;
    reportInfo.value = row;
    reqModel.value.plantCode = row.plantCode;
    // formModel.value.advId = row.ad_adv_id;
    // console.log(row, 1111);
    fetchData();
  };
  defineExpose({
    showModel,
  });

  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>

<style scoped>
  /deep/.arco-statistic-content .arco-statistic-value-integer {
    font-size: 14px;
    white-space: nowrap;
  }
  /deep/.arco-statistic-content .arco-statistic-value-decimal {
    display: inline-block;
    font-size: 14px;
  }
  /deep/.arco-statistic-content .arco-statistic-value {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
    margin-top: -9px;
  }
  /* .arco-space-vertical {
    flex-direction: column;
    margin-left: 10px;
  } */
</style>
