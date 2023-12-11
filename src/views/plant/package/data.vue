<!-- eslint-disable no-plusplus -->
<template>
  <div class="container">
    <div class="upai_content">
      <Breadcrumb :items="['投流管理', '计划包']" />
      <div class="pageTitle"> 计划包数据 </div>
      <a-row>
        <a-card class="general-card-upai" style="width: 100%">
          <a-row>
            <a-col :flex="1">
              <a-form :model="reqModel" auto-label-width label-align="left">
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item field="name">
                      <template #label>
                        <div class="labelText">名称搜索：</div>
                      </template>
                      <a-input
                        v-model="reqModel.name"
                        placeholder="请输入计划包名称"
                        allow-clear
                        @press-enter="search"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="sphId">
                      <template #label>
                        <div class="labelText">所属部门：</div>
                      </template>

                      <a-cascader
                        v-model="reqModel.memberDepId"
                        :options="depmentArr"
                        check-strictly
                        allow-clear
                        :field-names="{
                          value: 'memberDepId',
                          label: 'memberDepName',
                        }"
                        placeholder="请选择所属部门"
                        @clear="clearDep"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="hotStatus">
                      <template #label>
                        <div class="labelText">加热状态：</div>
                      </template>
                      <a-select
                        v-model="reqModel.hotStatus"
                        placeholder="请选择加热状态"
                      >
                        <a-option
                          v-for="(item, key) in enumToObject(hotStatus)"
                          :key="key"
                          :label="item.label"
                          :value="item.value"
                        />
                      </a-select> </a-form-item
                  ></a-col>

                  <!-- 
                 

                  <a-col :span="8">
                    <a-form-item field="videoId">
                      <template #label>
                        <div class="labelText">作者搜索：</div>
                      </template>
                      <a-select
                        v-model="reqModel.videoId"
                        placeholder="全部投手号"
                      >
                        <a-option
                          v-for="(item, key) in searchVideoGrid"
                          :key="key"
                          :label="item.videoNickName"
                          :value="item.videoId"
                        />
                      </a-select>
                    </a-form-item>
                  </a-col> -->

                  <!-- <a-col :span="8">
                    <a-form-item field="goodsId">
                      <template #label>
                        <div class="labelText">商品搜索：</div>
                      </template>
                      <a-select
                        v-model="reqModel.goodsId"
                        placeholder="全部商品"
                      >
                        <a-option
                          v-for="(item, key) in searchGoodsGrid"
                          :key="key"
                          :label="item.goodsName"
                          :value="item.goodsId"
                        />
                      </a-select>
                    </a-form-item>
                  </a-col> -->

                  <a-col :span="10">
                    <a-form-item field="createdTime">
                      <template #label>
                        <div class="labelText">创建时间：</div>
                      </template>
                      <a-range-picker
                        v-model="createDate"
                        show-time
                        :default-value="[dayjs().add(-1, 'month'), dayjs()]"
                        style="width: 100%"
                        :shortcuts="rangeShortcuts"
                        shortcuts-position="left"
                        @change="dateChange"
                      />
                      <!-- <a-range-picker style="width: 100%" @change="dateChange" /> -->
                    </a-form-item>
                  </a-col>
                  <a-col :span="8"></a-col>
                  <a-col :span="6"></a-col>
                  <!-- <a-col :span="16"> </a-col> -->

                  <a-col :span="8">
                    <a-form-item field="number" :hide-label="true">
                      <a-space :size="18">
                        <a-button
                          type="primary"
                          class="searchBtn"
                          @click="search"
                        >
                          筛选
                        </a-button>
                        <a-button
                          type="outline"
                          class="refreshBtn"
                          @click="search()"
                        >
                          刷新
                        </a-button>
                        <a-typography-text type="primary">
                          <a-link href="javascript:void(0)" @click="refresh()"
                            >重置筛选条件</a-link
                          >
                        </a-typography-text>
                      </a-space>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
      </a-row>
      <a-card
        class="general-card-upai"
        style="width: 100%; padding-bottom: 28px"
      >
        <a-row justify="space-between">
          <a-col flex="250px">
            <a-space :size="18" style="margin-bottom: 10px">
              <a-button type="primary" @click="handleGpClick(1)">
                <template #icon>
                  <icon-plus />
                </template>
                创建计划包
              </a-button>

              <!-- <a-button
                type="primary"
                status="success"
                class="searchBtn"
                @click="exportExcel()"
              >
                <template #icon> <icon-unordered-list /></template>
                导出
              </a-button> -->
              <t-dropdown :min-column-width="88">
                <a-button type="primary" status="success" class="searchBtn">
                  <template #icon> <icon-unordered-list /></template>
                  <a-space>
                    导出
                    <icon-down />
                  </a-space>
                </a-button>
                <t-dropdown-menu>
                  <t-dropdown-item
                    :value="1"
                    divider
                    @click="exportExcelModal()"
                  >
                    导出
                  </t-dropdown-item>
                  <t-divider />

                  <t-dropdown-item :value="2" @click="openExcelList">
                    报表列表
                  </t-dropdown-item>
                </t-dropdown-menu>
              </t-dropdown>
              <!-- <a-button type="primary" status="success">
                <template #icon>
                  <icon-refresh />
                </template>
                同步数据
              </a-button> -->
            </a-space>
          </a-col>
          <a-col flex="60px">
            <a-space :size="18" style="margin-bottom: 10px">
              <a-button type="primary" @click="columnControllerVisible = true">
                <template #icon>
                  <icon-settings />
                </template>
                列表配置
              </a-button>
            </a-space>
          </a-col>
        </a-row>

        <t-table
          v-model:columnControllerVisible="columnControllerVisible"
          row-key="plantId"
          :data="renderData"
          :columns="renderColumns"
          :loading="loading"
          :header-affixed-top="true"
          :max-height="1000"
          :column-controller="{
            placement: 'top-right',
            fields,
            dialogProps: { preventScrollThrough: true },
            hideTriggerButton: true,
          }"
          :pagination="pagination"
          :bordered="false"
          table-layout="fixed"
          :default-display-columns="disPlayColumns"
          :on-display-columns-change="disPlayColumnsChange"
          @page-change="onPageChange"
          @sort-change="sorterChange"
        >
          <template #process="{ row }">
            <a-progress
              :percent="Number(fun(row.cost / row.estimatedWecoinAmount))"
              :style="{ width: '50%' }"
            />
          </template>
          <template #roi="{ row }">
            {{ fun(row.productPlaceorderGmv / row.cost) }}
          </template>
          <template #lr="{ row }">
            {{ fun(row.productPlaceorderGmv - row.cost) }}
          </template>
          <template #hotStatus="{ row }">
            <a-tag :color="hotStatusColor[row.hotStatus]">
              {{ hotStatus[row.hotStatus] }}
            </a-tag>
          </template>
          <template #totalIndemnifyVoucherAmount="{ row }">
            <a-space>
              <span>{{
                row.totalIndemnifyVoucherAmount
                  ? `¥${row.totalIndemnifyVoucherAmount}`
                  : '-' || '-'
              }}</span>
            </a-space>
          </template>
          <template #totalIndemnifyVoucherIntoAmount="{ row }">
            {{
              row.totalIndemnifyVoucherIntoAmount
                ? `¥${row.totalIndemnifyVoucherIntoAmount / 100}`
                : '-'
            }}
          </template>
          <template #indemnifyVoucherAmountRoi="{ row }">
            {{ row.indemnifyVoucherAmountRoi || '-' }}
          </template>
          <template #op="{ row }">
            <a-button type="text" size="small" @click="jumpPlantData(row)">
              查看计划
            </a-button>
            <a-button type="text" size="small" @click="handleGpClick(2, row)">
              修改
            </a-button>
            <a-popconfirm
              content="确认是否删除此计划"
              ok-text="确认"
              @ok="handleClickDel(row)"
            >
              <a-button type="text" size="small"> 删除 </a-button>
            </a-popconfirm>
          </template>
        </t-table>
      </a-card>
    </div>
    <ExportList ref="exportList"></ExportList>

    <a-modal
      v-model:visible="formGpVisible"
      :title="formGpTitle"
      @cancel="formGpVisible = false"
      @before-ok="handleGpBeforeOk"
    >
      <a-form
        ref="formGpRef"
        :model="formGpModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="name"
          label="计划包名称"
          :rules="[{ required: true, message: '请填写计划包名称' }]"
        >
          <a-input v-model="formGpModel.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import {
    plantPackageGridData,
    videoGrid,
    goodsGrid,
    plantPackageAdd,
    plantPackageEdit,
    plantPackageDel,
  } from '@/api/plant';
  import {
    taskStatus,
    hotStatus,
    enumToObject,
    indemnifyVoucherStatus,
  } from '@/utils/enum';
  import { getDepment } from '@/api/settings';
  import { clearAllChildren } from '@/utils/event';

  import { Message, Notification, Modal } from '@arco-design/web-vue';
  import { exportPlantPackageGridData, exportGrid } from '@/api/export';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useRouter } from 'vue-router';
  import { sphGrid } from '@/api/sph';
  import { EXlsx } from '@/utils/xlsx';
  import ExportList from '../plant-data/components/export-list.vue';

  const exportList = ref<InstanceType<typeof ExportList>>();

  const rangeShortcuts = [
    {
      label: '当日',
      value: () => [
        dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '昨日',
      value: () => [
        dayjs().add(-1, 'day').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '近一周',
      value: () => [
        dayjs().add(-1, 'week').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '近一月',
      value: () => [
        dayjs().add(-1, 'month').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '本月',
      value: () => [
        dayjs().startOf('month').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
  ];
  const scroll = {
    x: 2200,
    y: 500,
  };
  const bgcolor = '#F7F9FF';
  const hotStatusColor = ['', '#7bc616', '#ff5722'];
  const { loading, setLoading } = useLoading(true);

  const formGpVisible = ref(false);
  const formGpTitle = ref('新建计划包');
  const formGpModel = ref({ name: null, type: 1 });
  const formGpRef = ref<FormInstance>();
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
  const columnControllerVisible = ref(false);
  const fields = ref<any[]>([]);
  const depmentArr = ref([]);
  const pagination = reactive({
    ...basePagination,
  });

  const renderColumns = ref([
    {
      colKey: 'packageName',
      title: '计划包名称',
      fixed: 'left',
      align: 'left',
      width: 220,
    },
    {
      colKey: 'memberDepName',
      title: '所属部门',
      align: 'center',
      width: 120,
    },
    {
      colKey: 'estimatedWecoinAmount',
      title: '投放总金额',
      align: 'center',
      width: 150,
      sortType: 'all',
      sorter: true,
    },

    {
      colKey: 'plantCount',
      title: '总计划条数',
      align: 'center',
      width: 150,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'plantHotCount',
      title: '加热计划条数',
      align: 'center',
      width: 150,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'hotStatus',
      title: '加热状态',
      align: 'center',
      width: 100,
    },
    {
      colKey: 'process',
      title: '消耗比例',
      align: 'center',
      width: 170,
    },
    {
      colKey: 'cost',
      title: '消耗金额',
      align: 'center',
      width: 120,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productOrderCount',
      title: '订单数',
      align: 'center',
      width: 100,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productPlaceorderGmv',
      title: '营业额',
      align: 'center',
      width: 100,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'roi',
      title: 'ROI',
      align: 'center',
      width: 100,
    },
    {
      colKey: 'lr',
      title: '利润',
      align: 'center',
      width: 100,
    },
    {
      colKey: 'airCost',
      title: '空耗值',
      align: 'center',
      width: 120,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'qan_cost',
      title: '千展成本',
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
    {
      colKey: 'zh_rate',
      title: '转化率',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'productClickCountPv',
      title: '商品点击',
      align: 'center',
      width: 120,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'exposureCount',
      title: '浏览',
      align: 'center',
      width: 100,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'likeCount',
      title: '点赞',
      align: 'center',
      width: 100,
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'favCount',
      title: '评论',
      align: 'center',
      width: 100,
      sortType: 'all',
      sorter: true,
    },
    // {
    //   colKey: 'followCount',
    //   title: '关注',
    //   align: 'center',
    //   width: 100,
    //   sortType: 'all',
    //   sorter: true,
    // },
    {
      colKey: 'totalIndemnifyVoucherAmount',
      title: '补贴金额',
      width: '120',
      align: 'center',
    },
    // {
    //   colKey: 'totalIndemnifyVoucherIntoAmount',
    //   title: '已补贴金额',
    //   width: '120',
    //   align: 'center',
    // },
    {
      colKey: 'indemnifyVoucherAmountRoi',
      title: '补贴ROI',
      width: '120',
      align: 'center',
    },

    {
      colKey: 'updatedAt',
      title: '更新时间',
      align: 'center',
      width: 120,
    },

    {
      colKey: 'op',
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: 150,
    },
  ]);
  fields.value = renderColumns.value.map((e: any) => {
    if (e.colKey === 'row-select') {
      return console.log('45678');
    }
    return e.colKey;
  });
  const generateFormReqModel = () => {
    return {
      startDate: dayjs().add(-1, 'month').format('YYYY-MM-DD').toString(),
      endDate: dayjs().format('YYYY-MM-DD').toString(),
      pageIndex: 1,
      pageSize: 30,
      hotStatus: -1,
      taskStatus: -1,
    };
  };

  const fun = (val: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      return 0;
    }
    if (Number(val) === 0) {
      return 0;
    }
    return Number(val).toFixed(2);
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
  const reqModel = ref(generateFormReqModel());
  const renderData = ref([]);
  const actionTypeActive = ref(0);

  const searchSphGrid = ref<any>([]);
  const searchGoodsGrid = ref<any>([]);
  const searchVideoGrid = ref<any>([]);
  function findMemberDepName(data: any, memberDepId: any) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.memberDepId === memberDepId) {
        return item.memberDepName;
      }
      if (item.children && item.children.length > 0) {
        const result: any = findMemberDepName(item.children, memberDepId);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
  const getDepArr = async (params: { pageIndex: 1; pageSize: 150 }) => {
    const { data } = await getDepment(params);
    if (data.grid) {
      depmentArr.value = clearAllChildren(data.grid);
    } else {
      depmentArr.value = [];
    }

    return new Promise((resolve) => {
      resolve(true);
    });
  };
  const clearDep = () => {
    delete reqModel.value.memberDepId;
  };
  const searchSphGridInit = async () => {
    const { data } = await sphGrid({
      pageIndex: 1,
      pageSize: 200,
      sphType: 1,
    });
    searchSphGrid.value = data.grid;
  };
  const searchGoodsGridInit = async () => {
    const { data } = await goodsGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    searchGoodsGrid.value = data.grid;
  };
  const searchSphVideoInit = async () => {
    const { data } = await videoGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    searchVideoGrid.value = data.grid;
  };

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await plantPackageGridData(params);
      if (data.grid) {
        data.grid.forEach((el: any, key: any) => {
          el.key = String(key + 1);

          el.click_cost = fun2(el.cost / el.productClickCountPv);
          el.memberDepName = el.memberDepId
            ? findMemberDepName(depmentArr.value, el.memberDepId)
            : '-';
          el.click_rate =
            fun2((el.productClickCountPv / el.exposureCount) * 100) === '-'
              ? '-'
              : `${fun2((el.productClickCountPv / el.exposureCount) * 100)}%`;
          el.qan_cost = fun2((el.cost / el.exposureCount) * 1000);
          el.zh_cost = fun2(el.cost / el.productOrderCount);
          el.zh_rate =
            fun2((el.productOrderCount / el.productClickCountPv) * 100) === '-'
              ? '-'
              : `${fun2(
                  (el.productOrderCount / el.productClickCountPv) * 100
                )}%`;
          el.shutdownSwitch = el.shutdownStatus !== 0;
          el.indemnifyVoucherAmountRoi =
            el.cost - el.totalIndemnifyVoucherAmount / 100 <= 0
              ? '-'
              : fun2(
                  el.productPlaceorderGmv /
                    (el.cost - el.totalIndemnifyVoucherAmount / 100)
                );
          const isAfterCurrentTime = dayjs(el.indemnifyTs).isAfter(dayjs());
          // el.indemnifyVoucherIntoAmount =
          //   el.indemnifyVoucherStatus === 2
          //     ? el.totalIndemnifyVoucherIntoAmount
          //     : '-';
          if (el.totalIndemnifyVoucherAmount > 0) {
            el.totalIndemnifyVoucherAmount /= 100;
          }
        });
      }
      renderData.value = data.grid || [];

      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page: any) => {
    basePagination.pageIndex = page.current;
    basePagination.current = page.current;
    basePagination.pageSize = page.pageSize;

    pagination.pageIndex = page.current;
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    // formModel.value.pageIndex = current;
    fetchData({
      ...reqModel.value,

      ...basePagination,
    } as unknown as any);
  };

  const pageSizeChange = (size: number) => {
    // console.log(size);
    basePagination.pageSize = size;
    pagination.pageSize = size;
    fetchData({
      ...reqModel.value,

      ...basePagination,
    } as unknown as any);
  };

  const dateChange = (dateString: Array<string>) => {
    // eslint-disable-next-line prefer-destructuring
    reqModel.value.startDate = dateString[0];
    // eslint-disable-next-line prefer-destructuring
    reqModel.value.endDate = dateString[1];
    // dateArr.value = getDay(dateString[0], dateString[1]);
  };

  const search = () => {
    onPageChange({
      current: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleClickDel = async (row: any) => {
    const { data } = await plantPackageDel({
      packageId: row.packageId,
    });
    if (data) {
      Message.success({
        content: '删除计划包成功',
        duration: 5 * 1000,
      });
      await search();
    }
  };
  const handleGpClick = async (type: any, item: any) => {
    if (type === 2) {
      formGpTitle.value = '修改计划包';
      formGpModel.value.packageId = item.packageId;
      formGpModel.value.name = item.packageName;
    } else {
      formGpTitle.value = '新增计划包';
      formGpModel.value.name = null;
    }
    formGpModel.value.type = type;
    formGpVisible.value = true;
  };

  const handleGpBeforeOk = async (done: any) => {
    const res = await formGpRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (formGpModel.value.type === 1) {
      const { data } = await plantPackageAdd({
        name: formGpModel.value.name,
      });
      Message.success({
        content: '添加计划包成功',
        duration: 5 * 1000,
      });
      await search();
    } else {
      const { data } = await plantPackageEdit({
        packageId: formGpModel.value.packageId,
        name: formGpModel.value.name,
      });
      Message.success({
        content: '修改计划包成功',
        duration: 5 * 1000,
      });
      await search();
    }
    formGpModel.value.name = null;
    window.setTimeout(() => {
      done();
    }, 300);
  };
  const router = useRouter();
  const openExcelList = () => {
    exportList.value?.showModel();
  };
  const exportExcelModal = () => {
    Modal.info({
      title: '提示',
      content: '是否导出选中数据？',
      simple: false,
      hideCancel: false,
      cancelText: '取消',
      async onOk() {
        exportExcel();
      },
    });
  };
  const exportExcel = async () => {
    const req = { ...reqModel.value };
    req.excel = true;
    // req.pageSize = 5000;
    // req.pageIndex = 1;
    const { data, code, message } = await exportPlantPackageGridData(req);
    if (code === 200) {
      Message.success('数据报表生成中，请前往报表列表查看');
    }
    // const req = { ...reqModel.value };
    // // req.pageSize = 5000;
    // // req.pageIndex = 1;
    // const promiseArray = [];
    // const fileName = `计划包报表导出${dayjs().format('YYMMDDhhmmss')}.xls`;
    // // 循环15次 每次获取200条 共300条
    // // eslint-disable-next-line prettier/prettier, no-plusplus
    // for (let i = 0; i < 15; i++) {
    //   // eslint-disable-next-line no-async-promise-executor
    //   const promise = new Promise(async (resolve) => {
    //     req.pageSize = 200;
    //     req.pageIndex = i + 1;
    //     const { data } = await plantPackageGridData({
    //       ...req,
    //     });
    //     resolve(data.grid);
    //   });

    //   promiseArray.push(promise);
    // }
    // const eData: any = [];

    // await Promise.all(promiseArray).then((res) => {
    //   console.log(res);
    //   res.forEach((el: any) => {
    //     if (el) {
    //       el.forEach((e: any) => {
    //         eData.push(e);
    //       });
    //     }
    //   });
    // });

    // const { data } = await plantPackageGridData({
    //   ...req,
    // });
    // const listHander = {
    //   packageName: '计划包名称',
    //   estimatedWecoinAmount: '投放金额',
    //   plantCount: '总计划条数',
    //   plantHotCount: '加热计划条数',
    //   costRate: '消耗比例',
    //   cost: '消耗金额',
    //   productOrderCount: '订单数',
    //   productPlaceorderGmv: '营业额',
    //   lr: '利润',
    //   roi: 'ROI',
    //   airCost: '空耗值',
    //   qan_cost: '千展成本',
    //   click_rate: '点击率',
    //   zh_cost: '转化成本',
    //   productClickCountPv: '商品点击',
    //   exposureCount: '浏览',
    //   likeCount: '点赞',
    //   favCount: '评论',
    //   followCount: '关注数',
    //   indemnifyVoucherAmount: '补贴金额',
    //   indemnifyVoucherStatus: '补贴状态',
    //   indemnifyTs: '补贴时间',

    //   hotStatus: '状态',
    //   updatedAt: '更新时间',
    // };

    // eData.forEach((el: any) => {
    //   if (el.productPlaceorderGmv > 0) {
    //     el.lr = fun(el.productPlaceorderGmv * (el.yjl / 100) - el.cost);
    //   } else {
    //     el.lr = '-';
    //   }
    //   el.costRate = Number(fun(el.cost / el.estimatedWecoinAmount));
    //   el.hotStatus = hotStatus[el.hotStatus] || '-';
    //   el.cost = fun2(el.cost);
    //   el.productOrderCount = fun2(el.productOrderCount);
    //   el.productPlaceorderGmv = fun2(el.productPlaceorderGmv);
    //   el.roi = fun2(el.productPlaceorderGmv / el.roi);
    //   el.airCost = fun2(el.airCost);
    //   el.indemnifyVoucherAmount = fun2(el.indemnifyVoucherAmount / 10);

    //   el.indemnifyVoucherStatus =
    //     indemnifyVoucherStatus[el.indemnifyVoucherStatus] || '-';
    //   el.indemnifyTs = el.indemnifyTs
    //     ? dayjs.unix(Number(el.indemnifyTs)).format('YYYY-MM-DD')
    //     : '-';
    // });
    // EXlsx(eData, listHander, fileName);
  };

  const disPlayColumns = ref([]);
  if (localStorage.getItem('package-disPlayColumns')) {
    disPlayColumns.value = JSON.parse(
      localStorage.getItem('package-disPlayColumns')
    );
  } else {
    renderColumns.value.forEach((el: any) => {
      disPlayColumns.value.push(el.colKey);
    });
  }
  const disPlayColumnsChange = async (value: any) => {
    localStorage.setItem('package-disPlayColumns', JSON.stringify(value));
  };
  const jumpPlantData = (row: any) => {
    router.push({
      name: 'plantData',
      query: {
        packageId: row.packageId,
        packageCreaedAt: dayjs(row.createdAt).unix(),
      },
    });
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
  const createDate = ref<any[]>([]);
  createDate.value = [dayjs().add(-1, 'month'), dayjs()];
  const refresh = () => {
    reqModel.value = generateFormReqModel();
    createDate.value = [dayjs().add(-1, 'month'), dayjs()];
  };
  const initData = async () => {
    searchSphGridInit();
    searchGoodsGridInit();
    searchSphVideoInit();
    getDepArr({ pageIndex: 1, pageSize: 150 }).then((res) => {
      fetchData({
        ...reqModel.value,
      });
    });
  };
  initData();
  defineExpose({
    fetchData,
  });
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    :deep(.arco-pagination-total) {
      display: none;
    }
  }
  .content {
    width: 100%;
    .orderTypeBox {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      .orderTypeBtn {
        width: 110px;
        height: 40px;
        border-radius: 20px;
        background: #f2f5ff;
        color: #2d2d2d;
        margin-right: 32px;
        font-size: 16px;
        line-height: 38px;
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
  }
  :deep .arco-table-th {
    background: #f2f5ff;
    height: 60px;
    border-radius: 4px;
    font-weight: 500;
    color: #535353;
    border-bottom: none !important;
  }
  .background_img_one {
    width: 36px;
    height: 36px;
    color: #fff;
    background-image: url('https://img.adyinqing.com/upai_shop/ip8t7za11678348299203');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: -4px 0px;
    line-height: 44px;
    margin: 0 auto;
  }
  .background_img_two {
    width: 36px;
    height: 36px;
    color: #fff;
    background-image: url('https://img.adyinqing.com/upai_shop/a269mw6i1678349024302');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: -4px 0px;
    line-height: 44px;
    margin: 0 auto;
  }
  .background_img_three {
    width: 36px;
    height: 36px;
    color: #fff;
    background-image: url('https://img.adyinqing.com/upai_shop/z1dekxra1678349027531');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: -4px 0px;
    line-height: 44px;
    margin: 0 auto;
  }
  .key {
    width: 36px;
    height: 36px;
    font-weight: 500;
    margin: 0 auto;
    line-height: 44px;

    font-size: 16px;
    color: #3f3f3f;
  }
  .container {
    height: 100%;
    padding: 0 17px 17px 17px;
    background: #f7f9ff;
  }
  // :deep
  //   .arco-table-stripe:not(.arco-table-dragging)
  //   .arco-table-tr:not(.arco-table-tr-empty):not(
  //     .arco-table-tr-summary
  //   ):nth-child(even)
  //   .arco-table-td:not(.arco-table-col-fixed-left):not(
  //     .arco-table-col-fixed-right
  //   ),
  // .arco-table-stripe
  //   .arco-table-tr-drag
  //   .arco-table-td:not(.arco-table-col-fixed-left):not(
  //     .arco-table-col-fixed-right
  //   ) {
  //   background-color: #f2f5ff !important;
  // }
  // :deep(.arco-table-td) {
  //   border-bottom: none;
  // }
  .title {
    font-size: 20px;
    color: #2d2d2d;
    font-weight: 500;
    display: flex;
    align-items: center;
    // margin-bottom: 28px;
    .tips {
      font-size: 16px;
      color: #535353;
      font-weight: 400;
      margin-left: 22px;
    }
  }

  .general-card-upai {
    // border-radius: 20px;
    border: none;
    margin-bottom: 16px;
    .arco-card-body {
      padding: 20px 17px !important;
    }
  }
  .pageTitle {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #2d2d2d;
    line-height: 28px;
    margin-bottom: 28px;
  }
  :deep.arco-input-wrapper {
    background: #f2f5ff;
    border-radius: 4px;
    height: 40px;
  }
  :deep .arco-picker {
    height: 40px;
    background: #f2f5ff;
    border-radius: 4px;
  }
  :deep.arco-input-number {
    height: 30px;
  }
  .arco-row-align-start {
    align-items: center;
  }
  .labelText {
    // width: 80px;
    // height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3f3f3f;
    white-space: nowrap;
    line-height: 22px;
  }
  :deep .arco-select-view-single {
    background: #f2f5ff;
    border-radius: 4px;
    height: 40px;
  }
  :deep .arco-progress-line-text {
    margin-left: 1px;
    min-width: none;
  }

  :deep .t-table__header tr {
    background: #f2f5ff;
    height: 60px;
    border-radius: 4px;
    font-weight: 500;
    color: #535353;
    border-bottom: none !important;
  }

  .wx_dou_icon {
    width: 10px;
    height: calc(11px / (43 / 49));
    margin-bottom: 1px;
  }
</style>
