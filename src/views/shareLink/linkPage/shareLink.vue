<template>
  <div class="container">
    <Breadcrumb :items="['邀请链接']" />
    <div class="bgWBox" style="width: 100%">
      <a-row :gutter="16">
        <a-col flex="80px">
          <a-typography-text> 专属链接 </a-typography-text>
        </a-col>
        <a-col flex="auto">
          <a-typography-text type="primary" style="cursor: pointer">
            {{ shareLink }}
          </a-typography-text>
        </a-col>
        <a-col flex="80px">
          <a-button type="primary" @click="copyLink()">
            <template #icon> <icon-link /> </template>复制链接
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-row> </a-row>

    <a-card class="general-card-upai" style="width: 100%; padding-bottom: 32px">
      <h1
        style="font-size: 18px; margin-bottom: 10px; margin-top: 0; color: #000"
      >
        邀请记录
      </h1>

      <a-table
        row-key="id"
        :pagination="false"
        :loading="loading"
        :data="renderData"
        :hoverable="true"
        :stripe="false"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <!-- <a-table-column title="id" align="center">
            <template #cell="{ record }">{{ record.sphId }} </template>
          </a-table-column> 
          <a-table-column
            title="账号信息"
            :header-cell-style="{
              justifyContent: 'center',
              textAlign: 'center',
              display: 'flex',
            }"
            :body-cell-style="{
              display: 'flex',
              width: '100%',
              justifyContent: 'left',
            }"
          >
            <template #cell="{ record }">
              <div class="infoBox">
                <a-avatar>
                  <img alt="avatar" :src="record.sphAvatar" />
                </a-avatar>
                {{ record.sphName }}
              </div>
            </template>
          </a-table-column>-->

          <a-table-column title="昵称" align="center">
            <template #cell="{ record }">{{
              record.shareMemberInfo ? record.shareMemberInfo.memberPhone : '-'
            }}</template>
          </a-table-column>
          <a-table-column title="手机号码" align="center">
            <template #cell="{ record }">{{
              record.shareMemberInfo ? record.shareMemberInfo.memberPhone : '-'
            }}</template>
          </a-table-column>
          <a-table-column title="实付金额" align="center">
            <template #cell="{ record }">{{
              record.payPrice ? record.payPrice : '-'
            }}</template>
          </a-table-column>

          <a-table-column title="账号类型" align="center">
            <template #cell="{ record }">
              <a-tag color="arcoblue">
                {{
                  record.shareMemberInfo
                    ? memberLevel[record.shareMemberInfo.memberLevel]
                    : '-'
                }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="绑定状态" align="center">
            <template #cell="{ record }">
              {{ record.bindStatus ? bindStatus[record.bindStatus] : '-' }}
            </template>
          </a-table-column>
          <a-table-column
            v-if="userStore.$state.memberChannel === 2"
            title="二级邀请"
            align="center"
          >
            <template #cell="{ record }">
              {{ record.shareCount }}
            </template>
          </a-table-column>
          <a-table-column title="创建时间" align="center">
            <template #cell="{ record }">{{ record.createdAt }}</template>
          </a-table-column>
          <a-table-column title="使用过期时间" align="center">
            <template #cell="{ record }">{{
              record.shareMemberInfo
                ? record.shareMemberInfo.memberExpiredAt
                : '-'
            }}</template>
          </a-table-column>
          <a-table-column title="备注" align="center">
            <template #cell="{ record }">
              <a-space :size="8">
                {{ record.remark || '-' }}
                <a-typography-text
                  type="primary"
                  style="cursor: pointer"
                  @click="handleClick(2, record)"
                >
                  <icon-edit />
                </a-typography-text>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column
            v-if="userStore.$state.memberChannel === 2"
            align="center"
            title="操作"
            data-index="operations"
            fixed="right"
            :width="250"
          >
            <template #cell="{ record }">
              <a-button
                type="text"
                size="small"
                @click="handleClickDetail(record)"
              >
                邀请详情
              </a-button>
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
            :total="Number(pagination.total)"
            :show-total="true"
            :show-page-size="true"
            :page-size="pageSize"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="onPageChange"
            @page-size-change="pageSizeChange"
          />
        </div>
      </div>
    </a-card>
    <a-modal
      v-model:visible="tableVisible"
      title="二级邀请列表"
      width="800px"
      @cancel="tableVisible = false"
      @ok="tableVisible = false"
    >
      <a-table
        row-key="id"
        :pagination="false"
        :loading="loading"
        :data="tableData"
        :hoverable="true"
        :stripe="false"
        :bordered="false"
      >
        <template #columns>
          <a-table-column title="昵称" align="center">
            <template #cell="{ record }">{{
              record.shareMemberInfo.memberPhone
            }}</template>
          </a-table-column>

          <a-table-column title="账号类型" align="center">
            <template #cell="{ record }">
              <a-tag color="arcoblue">
                {{ memberLevel[record.shareMemberInfo.memberLevel] }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="实付金额" align="center">
            <template #cell="{ record }">{{
              record.payPrice ? record.payPrice : '-'
            }}</template>
          </a-table-column>

          <a-table-column title="绑定状态" align="center">
            <template #cell="{ record }">
              {{ record.bindStatus ? bindStatus[record.bindStatus] : '-' }}
            </template>
          </a-table-column>
          <a-table-column title="使用状态" align="center">
            <template #cell="{ record }">{{
              Date.now() <
              dayjs(record.shareMemberInfo.memberExpiredAt).valueOf()
                ? '使用中'
                : '已过期'
            }}</template>
          </a-table-column>
        </template>
      </a-table>
      <div class="pagination">
        <div></div>
        <div>
          <a-pagination
            v-model:current="pagination2.pageIndex"
            v-model:page-size="pagination2.pageSize"
            :total="Number(pagination2.total)"
            :show-total="true"
            :show-page-size="true"
            :page-size="pageSize"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="onPageChange2"
            @page-size-change="pageSizeChange2"
          />
        </div>
      </div>
    </a-modal>
    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form
        ref="formRef"
        :model="editModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          v-for="(label, filed) in sphInputFiled"
          :key="label"
          :field="filed"
          :label="label"
          :rules="[
            {
              required: true,
              message: '请填写' + label,
            },
          ]"
        >
          <a-input v-model="editModel[filed]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getQrcode, getQrcodeStatus, sphEdit, sphGrid } from '@/api/sph';
  import dayjs from 'dayjs';
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
    memberLevel,
    bindStatus,
  } from '@/utils/enum';
  import { getUserInfo, updateUser } from '@/api/user';
  import { useUserStore } from '@/store/index';
  import { shareUpdate, shareGrid } from '@/api/member';
  import copy from '@/utils/copy';
  import { forEach } from 'lodash';

  const userStore = useUserStore();
  const baseHerfUrl = import.meta.env.VITE_API_BASE_HERF_URL;
  const authKey = ref('');
  const shareLink = ref('');
  getUserInfo().then((res) => {
    console.log(res);
    shareLink.value = res.data.shareLink;
    authKey.value = res.data.authKey;
  });
  const generateFormModel = () => {
    return {};
  };
  const copyLink = () => {
    copy(`【魔力智投】
  视频号微信豆、智能投放工具，让你轻松突破ROI瓶颈~

  ${shareLink.value}
  -------
  点击立即领取7天免费试用`);
    Message.success('复制成功');
  };
  const scroll = {
    x: 2000,
    y: 500,
  };
  const router = useRouter();

  const formVisible = ref(false);
  const tableVisible = ref(false);
  const tableData = ref<any[]>([]);
  const showQrcodeVisible = ref(false);
  const refundVisible = ref(false);
  const tableHeaderArr = ref<any[]>([]);

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

  const editFormModel = () => {
    return {
      id: undefined,
      sphType: 0,
      sphRemark: '',
      type: 1,
    };
  };
  const editModel = ref(editFormModel());

  const sphInputFiled = ref({
    remark: '备注',
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
  const pagination2 = reactive({
    ...basePagination,
  });
  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await shareGrid(params);

      renderData.value = data.grid;
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
  const fetchTableData = async (params: any) => {
    console.log(params);
    const { data } = await shareGrid(params);
    if (data.grid) {
      tableData.value = data.grid;
      pagination2.current = params.pageIndex;
      pagination2.pageIndex = params.pageIndex;
      pagination2.total = data.total;
    } else {
      pagination2.total = 0;
    }
  };
  const shareMemberId = ref(0);
  const handleClickDetail = (row: any) => {
    tableData.value = [];
    shareMemberId.value = row.shareMemberId;
    fetchTableData({
      shareLevel: 2,
      shareMemberId: shareMemberId.value,
      ...basePagination,
    });
    tableVisible.value = true;
  };
  const handleClick = async (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '修改备注';
      editModel.value.remark = row.remark;
      editModel.value.id = row.id;
      editModel.value.type = 2;
      formVisible.value = true;
    } else {
      formVisible.value = false;
      const { data } = await getQrcode({});
      qrcodeValue.value = data.url;
      qrcodeToken.value = data.token;

      showQrcodeVisible.value = true;
      timer.value = setTimeout(checkSph, 1000);
      // timer.value = setInterval(() => {

      // }, 1000);
    }
  };
  const onPageChange2 = (current: number) => {
    // console.log(current);

    pagination2.pageIndex = current;
    pagination2.current = current;
    // formModel.value.pageIndex = current;
    fetchTableData({
      shareLevel: 2,
      shareMemberId: shareMemberId.value,

      ...pagination2,
    } as unknown as any);
  };
  const pageSizeChange2 = (size: number) => {
    // console.log(size);
    pagination2.pageSize = size;
    fetchTableData({
      shareLevel: 2,
      shareMemberId: shareMemberId.value,

      ...pagination2,
    } as unknown as any);
  };
  onUnmounted(() => {
    clearInterval(timer.value);
    timer.value = null;
  });
  const formRef = ref<FormInstance>();
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 1) {
      // editModel.value.sphId = Number(editModel.value.sphId);
    } else {
      const { data } = await shareUpdate(editModel.value);
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
  const handleCancel = () => {
    formVisible.value = false;
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
  .bgWBox {
    border-radius: 10px;
    padding: 17px;
    background: #fff;
    margin-bottom: 17px;
  }
</style>
