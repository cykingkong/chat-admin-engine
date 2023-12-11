<template>
  <a-modal
    v-model:visible="visible"
    width="80%"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 报表详情 </template>
    <div>
      <a-row>
        <a-col :flex="1">
          <a-form :model="reqModel">
            <a-row :gutter="16">
              <!-- <a-col :span="8">
               
              </a-col>
            -->
              <a-col :span="8">
                <a-form-item field="exportType" label="报表类型">
                  <a-select v-model="reqModel.exportType">
                    <a-option label="全部" value="" />
                    <a-option
                      v-for="(item, key) in enumToObject(exportType)"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    />
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-space :size="18">
                  <a-button type="primary" @click="search">
                    <template #icon>
                      <icon-search />
                    </template>
                    搜索
                  </a-button>
                  <a-button type="primary" @click="search">
                    <template #icon>
                      <icon-refresh />
                    </template>
                    刷新
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <!-- <a-divider style="height: 40px" direction="vertical" />
        <a-col :flex="'136px'" style="text-align: right"> </a-col> -->
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
        :pagination="pagination"
        :bordered="true"
        table-layout="fixed"
        :default-display-columns="disPlayColumns"
        :on-display-columns-change="disPlayColumnsChange"
        @page-change="onPageChange"
      >
        <template #exportStatus="{ row }">
          <a-tag :color="exportStatusColor[row.exportStatus]">
            {{ exportStatus[row.exportStatus] || '-' }}
          </a-tag>
        </template>
        <template #exportType="{ row }">
          {{ exportType[row.exportType] || '-' }}
        </template>
        <template #op="{ row }">
          <a-button type="text" class="searchBtn" @click="getFile(row)">
            下载报表
          </a-button>
        </template>
      </t-table>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, toRefs, defineExpose, reactive, computed } from 'vue';
  import { reportHourData } from '@/api/plant';
  import { useI18n } from 'vue-i18n';
  import { Message } from '@arco-design/web-vue';

  import useLoading from '@/hooks/loading';
  import { Pagination, Options } from '@/types/global';
  import dayjs from 'dayjs';
  import { EXlsx } from '@/utils/xlsx';
  import { enumToObject, exportStatus, exportType } from '@/utils/enum';
  import { exportGrid } from '@/api/export';
  import { IconDownload } from '@arco-design/web-vue/es/icon';

  const scroll = {
    x: 2000,
    y: 500,
  };
  const exportStatusColor = [
    '',
    '#7bc616',
    '#165dff',
    '#00b42a',
    '#00b42a',
    '#eb0aa4',
    'f53f3f',
    'f53f3f',
    '#f53f3f',
    '#f53f3f',
  ];
  const generateFormModel = () => {
    return {
      exportType: '',
    };
  };
  // page
  const basePagination: any = {
    current: 1,
    pageIndex: 1,
    pageSize: 30,
    defaultPageSize: 30,
    pageSizeOptions: [10, 30, 50, 100],
    total: 0,
    defaultCurrent: 1,
    page: 1,
  };

  const pagination = reactive({
    ...basePagination,
  });
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
      colKey: 'exportName',
      title: '报表名称',
      width: '180',
      align: 'center',
    },
    {
      colKey: 'exportStatus',
      title: '报表状态',
      width: '150',
      align: 'center',
    },
    {
      colKey: 'createdAt',
      title: '创建时间',
      width: '150',
      align: 'center',
    },
    {
      colKey: 'expiredTime',
      title: '过期时间',
      width: '150',
      align: 'center',
    },
    {
      colKey: 'exportType',
      title: '报表类型',
      width: '150',
      align: 'center',
    },
    {
      colKey: 'op',
      title: '操作',
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
      const { data } = await exportGrid({ ...reqModel.value, ...pagination });
      // console.log(data, 'data2');

      // if (data.grid) {

      // }
      pagination.total = data.total;
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
  const getFile = (row: any) => {
    switch (row.exportStatus) {
      case 1:
        Message.info('报表生成中');
        break;
      case 2:
        if (dayjs().isBefore(dayjs(row.expiredTime))) {
          // eslint-disable-next-line no-case-declarations
          const link = document.createElement('a');

          link.style.display = 'none';
          link.href = row.exportUrl;

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          Message.info('文件已过期，无法下载');
        }

        break;

      default:
        break;
    }
  };
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

  const showModel = () => {
    visible.value = true;
    // reportInfo.value = row;
    // reqModel.value.plantCode = row.plantCode;
    // formModel.value.advId = row.ad_adv_id;
    // console.log(row, 1111);
    fetchData();
  };
  const onPageChange = (page: any) => {
    basePagination.pageIndex = page.current;
    basePagination.current = page.current;
    basePagination.pageSize = page.pageSize;
    pagination.pageIndex = page.current;
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    // reqModel.value.pageIndex = page.current;
    // reqModel.value.pageSize = page.pageSize;

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
  /* /deep/.arco-statistic-content .arco-statistic-value-integer {
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
  } */
  /* .arco-space-vertical {
    flex-direction: column;
    margin-left: 10px;
  } */
</style>
