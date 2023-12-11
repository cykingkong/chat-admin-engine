<template>
  <div class="container">
    <Breadcrumb :items="['文件管理', '文件列表']" />

    <a-card class="general-card" title="文件列表">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="fileType" label="文件类型">
                  <a-select
                    v-model="formModel.fileType"
                    allow-clear
                    placeholder="请选择文件类型"
                  >
                    <a-option
                      v-for="(el, key) in fileTypeList"
                      :key="key"
                      :value="el.dictionaryCode"
                      >{{ el.dictionaryName }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 42px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16"> </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button type="primary" @click="search()">
            <template #icon> <icon-refresh /> </template>
            刷新
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :pagination="false"
        :loading="loading"
        :data="renderData"
        :bordered="{ cell: true }"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="文件名称" align="center">
            <template #cell="{ record }">{{ record.fileName }} </template>
          </a-table-column>
          <!-- <a-table-column title="下载地址" align="center">
            <template #cell="{ record }">
              <a-space direction="vertical" fill>
                <a-link href="javascript:void(0)">
                  <span style="color: #5ec055">{{ record.dowloadPath }}</span>
                </a-link>
              </a-space>
            </template>
          </a-table-column> -->
          <a-table-column title="文件类型" align="center" :width="150">
            <template #cell="{ record }"
              >{{ CodeNameMap.get(record.fileType) || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="文件状态" align="center" :width="150">
            <template #cell="{ record }"
              >{{ CodeNameMap.get(record.fileStatus) || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="商户名称" align="center" :width="180">
            <template #cell="{ record }">
              <span> {{ record.merchantName || '-' }}</span>
            </template>
          </a-table-column>

          <!-- <a-table-column title="订单状态" align="center">
            <template #cell="{ record }">
              {{ CodeNameMap.get(record.orderStatus) || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="支付状态" align="center">
            <template #cell="{ record }">
              {{ CodeNameMap.get(record.payStatus) || '-' }}
            </template>
          </a-table-column> -->

          <a-table-column title="创建日期" align="center">
            <template #cell="{ record }">
              {{
                record.createDate
                  ? dayjs(record.createDate)
                      .format('YYYY-MM-DD HH:mm:ss')
                      .toString()
                  : '-'
              }}
            </template>
          </a-table-column>
          <a-table-column title="过期时间" align="center">
            <template #cell="{ record }">
              {{
                record.expDate
                  ? dayjs(record.expDate)
                      .format('YYYY-MM-DD HH:mm:ss')
                      .toString()
                  : '-'
              }}
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            :title="$t('searchTable.columns.operations')"
            data-index="operations"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-button
                v-if="
                  record.dowloadPath && dayjs().isBefore(dayjs(record.expDate))
                "
                type="text"
                size="small"
                @click="getFile(record.dowloadPath)"
              >
                获取文件
              </a-button>
              <!-- <a-button
                v-if="record.fileStatus == 'file_fail'"
                type="text"
                size="small"
                @click="handleClickPushAgen(record)"
              >
                重新推送
              </a-button> -->
            </template>
          </a-table-column>
        </template>
      </a-table>
      <div class="pagination">
        <div></div>
        <div>
          <a-pagination
            v-model:current="pagination.pageIndex"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :show-total="true"
            :show-page-size="true"
            :page-size="pageSize"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="onPageChange"
            @page-size-change="pageSizeChange"
        /></div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getFilePage, pushAgen } from '@/api/file';
  import dayjs from 'dayjs';

  import { Message } from '@arco-design/web-vue';

  import { useRouter } from 'vue-router';

  import { Pagination } from '@/types/global';
  import { CodeNameMap, NameCodeMap } from '@/utils/dictionary';
  import { getAllDictionary } from '@/api/order';

  import _ from 'lodash';

  const fileTypeList = ref<any>([]);
  const getDictionaryList = async () => {
    const { data } = await getAllDictionary();
    console.log(data);
    // eslint-disable-next-line array-callback-return, consistent-return
    data.forEach((el: any) => {
      if (el.dictionaryKey === 'file_type') {
        fileTypeList.value = el.childDictionary;
      }
    });
  };

  getDictionaryList();
  const address = ref('');
  const expressList = ref();
  const addressList = ref<any[]>([]);

  const fieldNames = { value: 'locationId', label: 'locationName' };
  const generateFormModel = () => {
    return {
      orderSn: '',
      accountType: '',
      startDate: '',
      endDate: '',
      wxBuinessId: '',
      merchantId: '',
      fundType: undefined,
    };
  };
  const scroll = {
    x: 2000,
    y: 500,
  };
  const router = useRouter();

  const formVisible = ref(false);
  const refundVisible = ref(false);
  const tableHeaderArr = ref<any[]>([]);
  const tableHeader = ref<any[]>([
    { key: 'merchantName', label: '店铺名称' },
    { key: 'wxBuinessId', label: '微信业务ID' },
    { key: 'orderSn', label: '订单编号' },
    { key: 'accountType', label: '账户类型' },
    { key: 'fundType', label: '资金类型' },
    { key: 'fundMoney', label: '资金数额' },
    { key: 'fundRemark', label: '备注' },
    { key: 'fundDate', label: '资金日期' },
  ]);
  tableHeader.value.forEach((el, idx) => {
    tableHeaderArr.value.push(el.key);
  });
  const formTitle = ref('订单发货');
  const resetEditModel = () => {
    return {
      merchantId: undefined,
      shipAreaId: '',
      addressDetile: '',
      linkName: '',
      linkPhone: '',
    };
  };
  const editModel = reactive(resetEditModel());

  const refundModel = reactive({
    orderId: undefined,
    returnRejectRemark: '',
    returnStatus: '',
    orderSn: '',
  });

  const orderDetile = ref();
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const visible = ref<boolean>(false);

  const boardType = ref<any>(2);

  boardType.value = localStorage.getItem('boardType');
  const addressChange = (value: any) => {};
  const orderInfoData = ref();
  const orderDetailData = ref();

  // page
  const basePagination: Pagination = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
  };
  const pagination = reactive({
    ...basePagination,
  });

  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await getFilePage(params);

      console.log(data);

      renderData.value = data.rows;
      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total;
      // console.log(pagination);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (current: number) => {
    // console.log(current);
    basePagination.pageIndex = current;
    basePagination.current = current;
    pagination.pageIndex = current;
    pagination.current = current;
    // formModel.value.pageIndex = current;
    fetchData({
      ...formModel.value,

      ...basePagination,
    } as unknown as any);
  };
  const handleClickPushAgen = async (row: any) => {
    const { data } = await pushAgen({ unionId: row.unionId });
  };
  const getFile = (row: any) => {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = row;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // 搜索
  const search = () => {
    // advData();
    onPageChange(1);
  };

  fetchData({
    ...formModel.value,

    ...basePagination,
  } as unknown as any);
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .li {
    display: flex;
    align-items: center;
    font-size: 24px;
  }
  .titleBox {
    width: 100%;
    height: 30px;
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
