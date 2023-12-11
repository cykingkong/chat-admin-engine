<template>
  <div class="">
    <a-row style="margin-bottom: 16px">
      <a-col :span="16">
        <a-space>
          <a-button type="primary" @click="handleClick(1, {}, true)">
            登录投放号助手
          </a-button>
        </a-space>
      </a-col>
    </a-row>

    <a-table
      row-key="id"
      :pagination="false"
      :loading="loading"
      :data="renderData"
      :hoverable="true"
      :stripe="false"
      :sticky-header="true"
      :bordered="false"
      @page-change="onPageChange"
    >
      <template #columns>
        <a-table-column title="账号信息">
          <template #cell="{ record }">
            <a-space>
              <a-avatar>
                <img alt="avatar" :src="record.sphAvatar" />
              </a-avatar>
              {{ record.sphName }}
            </a-space>
          </template>
        </a-table-column>

        <a-table-column title="在线状态" align="center" :width="120">
          <template #cell="{ record }">
            <a-tag :color="sphStatusTagColor[record.sphStatus]">
              {{ sphStatus[record.sphStatus] }}
            </a-tag>
          </template>
        </a-table-column>

        <a-table-column title="添加权限" align="center">
          <template #cell="{ record }">{{
            isWindows[record.isWindows]
          }}</template>
        </a-table-column>
        <a-table-column
          align="center"
          title="操作"
          data-index="operations"
          fixed="right"
          :width="250"
        >
          <template #cell="{ record }">
            <a-space direction="vertical">
              <a-space>
                <a-button
                  :loading="record.addWindowLoading"
                  type="primary"
                  size="small"
                  @click="addWindow(record)"
                >
                  添加
                </a-button>
              </a-space>
            </a-space>
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
          :total="Number(pagination.total) || 0"
          :show-total="true"
          :show-page-size="true"
          :page-size="pageSize"
          :page-size-options="[10, 20, 50, 100, 200]"
          @change="onPageChange"
          @page-size-change="pageSizeChange"
        />
      </div>
    </div>

    <a-modal
      v-model:visible="showQrcodeVisible"
      width="auto"
      :footer="false"
      :simple="true"
      hide-cancel
    >
      <template #title> 添加视频号助手账号</template>
      <a-card class="general-card">
        <a-space :size="16" direction="vertical" fill>
          <a-space
            direction="vertical"
            fill
            style="text-align: center; position: relative"
          >
            <QrcodeVue
              :value="qrcodeValue"
              :size="200"
              level="H"
              style="position: relative"
            />

            <div v-if="qrcodeScan" class="mark">
              <div class="iconBox">
                <icon-check-circle-fill style="color: rgb(0, 180, 42)" />
                <!-- <br /> -->
                <span
                  style="
                    font-size: 16px;
                    color: #1d2129;
                    font-weight: bold;
                    display: block;
                  "
                >
                  扫码成功
                </span>
              </div>
            </div>

            <a-tag color="green">请用微信APP扫描二维码</a-tag>
          </a-space>
        </a-space>
      </a-card>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onUnmounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import {
    getQrcode,
    getQrcodeStatus,
    sphEdit,
    sphAideGrid,
    deleteSphBind,
  } from '@/api/sph-aide';
  import dayjs from 'dayjs';
  import { setAddWindow } from '@/api/merchantApi';
  import QrcodeVue from 'qrcode.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Pagination } from '@/types/global';
  import {
    sphType,
    sphStatus,
    useStatus,
    enumToObject,
    isWindows,
  } from '@/utils/enum';
  import { useUserStore } from '@/store/index';
  import { asyncAllData, asyncLiveAllData } from '@/api/plant';

  const userStore = useUserStore();

  const generateFormModel = () => {
    return {};
  };

  // 接收外部数据
  const props = defineProps({
    productId: {
      type: Number,
    },
  });

  const router = useRouter();
  const reqModel = reactive({
    sphId: undefined,
    days: 1,
    syncType: 1,
  });
  const formVisible = ref(false);
  const syncVisible = ref(false);
  const addWindowLoading = ref(false);
  const showQrcodeVisible = ref(false);
  const sphCode = ref('');
  const qrcodeValue = ref('');
  const qrcodeToken = ref('');
  const qrcodeScan = ref(false);
  const qrcodeStatusTimer = ref<any>();
  // const sphId = ref(0);
  const selectChannelId = ref(0);
  const selectsphId = ref(0);
  const formTitle = ref('修改信息');
  const sphStatusTagColor = ['', '#00b42a', '#f53f3f'];

  const productId = ref(0);
  // watch(props.productId, (newValue: any, oldValue: any) => {
  //   console.log(newValue, 'watch');
  //   productId.value = newValue;
  // });

  watch(
    () => props.productId,
    (newValue: any) => {
      console.log(newValue, 'watch');
      productId.value = newValue;
    }
  );
  const editFormModel = () => {
    return {
      sphId: undefined,
      sphType: 0,
      sphRemark: '',
      type: 1,
    };
  };
  const editModel = ref(editFormModel());

  const sphInputFiled = ref({
    sphRemark: '备注名称',
  });

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const visible = ref<boolean>(false);
  const productCode = ref('');

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
      const { data } = await sphAideGrid(params);

      renderData.value = data.grid;
      renderData.value.forEach((el: any) => {
        el.addWindowLoading = false;
      });
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

  const pageSizeChange = (size: number) => {
    // console.log(size);
    basePagination.pageSize = size;
    pagination.pageSize = size;
    fetchData({
      ...formModel.value,
      ...basePagination,
    } as unknown as any);
  };

  const refresh = () => {
    formModel.value = generateFormModel();
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

  const getQrcodeReqStatus = ref(false);
  const timer = ref<any>(null);
  const checkSph = async () => {
    if (getQrcodeReqStatus.value) {
      return;
    }

    getQrcodeReqStatus.value = true;
    const qrRes = await getQrcodeStatus({ token: qrcodeToken.value });

    getQrcodeReqStatus.value = false;

    if (qrRes.data.status === 5) {
      qrcodeScan.value = true;
    }
    if (qrRes.data.status === 1) {
      Message.success({
        content: '登录成功',
        duration: 5 * 1000,
      });

      showQrcodeVisible.value = false;
      qrcodeScan.value = false;

      search();
      clearInterval(timer.value);
      timer.value = null;
      return;
    }

    timer.value = setTimeout(checkSph, 1000);
  };

  const handleClick = async (type: number, row?: any, add?: boolean) => {
    if (type === 2) {
      formTitle.value = '修改视频号信息';
      editModel.value = row;
      editModel.value.type = 2;
      formVisible.value = true;
    } else {
      formVisible.value = false;

      const { data } = await getQrcode({}, add);
      qrcodeValue.value = data.url;
      qrcodeToken.value = data.token;

      showQrcodeVisible.value = true;
      timer.value = setTimeout(checkSph, 1000);
      // timer.value = setInterval(() => {

      // }, 1000);
    }
  };

  onUnmounted(() => {
    clearInterval(timer.value);
    timer.value = null;
  });
  const handleClickSync = async (row: any) => {
    reqModel.sphId = row.sphId;
    syncVisible.value = true;
  };
  const handleBeforeSendSync = async (done: any) => {
    if (reqModel.syncType === 1) {
      const { data, code } = await asyncAllData(reqModel);
      console.log(data, code);
      Message.success('同步数据请求已提交');
    } else {
      const { data, code } = await asyncLiveAllData(reqModel);
      console.log(data, code);
      Message.success('同步数据请求已提交');
    }

    window.setTimeout(() => {
      done();
    }, 300);
  };
  const formRef = ref<FormInstance>();
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 1) {
      // editModel.value.sphId = Number(editModel.value.sphId);
      // editModel.value.costPrice = Number(editModel.value.costPrice);
      // const { data } = await importProduct(editModel.value);
      // Message.success({
      //   content: "添加成功",
      //   duration: 5 * 1000
      // });
      // search();
    } else {
      const { data } = await sphEdit(editModel.value);
      Message.success({
        content: '修改成功',
        duration: 5 * 1000,
      });
      search();
    }
    window.setTimeout(() => {
      done();
    }, 300);
  };
  const handleClickDel = async (row: any) => {
    const { data, code } = await deleteSphBind({ sphId: row });
    console.log(data);
    if (code === 200) {
      Message.success('成功解除绑定。');
      search();
    }
  };
  const handleCancel = () => {
    formVisible.value = false;
  };

  const addWindow = async (row: any) => {
    if (row.sphStatus !== 1) {
      Message.info('当前账号已离线，请重新登录');
      handleClick(1, {}, true);
      return;
    }
    row.addWindowLoading = true;
    try {
      const { data, code } = await setAddWindow({
        sphAideId: row.sphId,
        productId: productId.value,
      });
      if (code === 200) {
        Message.success('添加成功');
        search();
      }

      if (code === 11020) {
        Message.info('当前账号已离线，请重新登录');
        handleClick(1, {}, true);
      }
    } catch (error) {
      //
    } finally {
      row.addWindowLoading = false;
    }
  };
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    // :deep(.arco-pagination-total) {
    //   display: none;
    // }
  }

  :deep .arco-table-th {
    background: #f2f5ff;
    height: 60px;
    border-radius: 4px;
    font-weight: 500;
    color: #535353;
    border-bottom: none !important;
  }

  .container {
    height: 100%;
    padding: 0 17px 17px 17px;
    background: #f7f9ff;
  }

  .title {
    font-size: 20px;
    color: #2d2d2d;
    font-weight: 500;
    display: flex;
    align-items: center;

    // margin-bottom: 32px;
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

    // :deep(.arco-table-cell) {
    //   padding: 0;
    // }
  }

  :deep.arco-input-wrapper {
    background: #f2f5ff;
    border-radius: 4px;
    height: 32px;
  }

  :deep .arco-picker {
    height: 32px;
    background: #f2f5ff;
    border-radius: 4px;
  }

  :deep.arco-input-number {
    height: 32px;
  }

  .arco-row-align-start {
    align-items: center;
  }

  .labelText {
    // width: 80px;
    // height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3f3f3f;
    white-space: nowrap;
    line-height: 15.4px;
  }

  :deep .arco-select-view-single {
    background: #f2f5ff;
    border-radius: 4px;
    height: 32px;
  }

  .mark {
    position: absolute;
    top: 0%;
    left: 0;

    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.7);

    .iconBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
    }
  }

  // /deep/ .arco-statistic-value {
  //   font-size: 16px !important;
  //   color: #535353 !important;
  // }
</style>
