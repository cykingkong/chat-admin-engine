<template>
  <div class="container">
    <Breadcrumb :items="['小店管理', '小店列表']" />
    <!-- <div class="pageTitle"> 小店列表 </div> -->
    <div class="box_bcw" style="width: 100%">
      <a-row justify="space-between">
        <a-col flex="auto"> 已绑定小店数: {{ pagination.total }}</a-col>
        <a-col flex="80px">
          <a-button type="primary" @click="handleClick(3)">
            <template #icon>
              <icon-plus />
            </template>
            添加视频号小店
          </a-button></a-col
        >
      </a-row>
    </div>

    <a-card class="general-card-upai" style="width: 100%; padding-bottom: 32px">
      <!-- <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1)">
              <template #icon>
                <icon-plus />
              </template>
              添加账号
            </a-button>
          </a-space>
        </a-col>
      </a-row> -->
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
          </a-table-column> -->
          <a-table-column title="小店信息" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-avatar>
                  <img
                    v-if="record.headimgUrl"
                    alt="avatar"
                    :src="record.headimgUrl"
                  />
                </a-avatar>
                <a-space>
                  <div class="shopInfo">
                    <div class="shopName">
                      <a-typography-text>
                        名称:<a-typography-text type="secondary">
                          {{ record.nickname }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                    <div class="APPID">
                      <a-typography-text>
                        APPID:<a-typography-text type="secondary">
                          {{ record.appid }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                  </div>
                </a-space>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" align="center">
            <template #cell="{ record }">{{ record.createdAt }}</template>
          </a-table-column>
          <!-- <a-table-column title="订单同步时间" align="center">
            <template #cell="{ record }">{{
              record.sphLoginAt
                ? dayjs(record.sphLoginAt).format('YYYY-MM-DD HH:mm:ss')
                : '-'
            }}</template>
          </a-table-column> -->
          <a-table-column title="账号类型" align="center">
            <template #cell="{ record }">
              <a-tag color="arcoblue">
                {{ record.subjectType || '-' }}
              </a-tag>
            </template>
          </a-table-column>

          <a-table-column title="备注" align="center">
            <template #cell="{ record }">
              {{ record.remark || '-' }}
            </template>
          </a-table-column>

          <a-table-column
            align="center"
            title="操作"
            data-index="operations"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-button
                type="text"
                size="small"
                @click="handleClick(2, record)"
              >
                修改
              </a-button>
              <a-popconfirm
                content="被解除绑定的店铺订单数据将被删除，请确认是否解绑？"
                ok-text="确认"
                @ok="handleClickUnBind(record)"
              >
                <a-button type="text" status="danger" size="small">
                  解绑小店
                </a-button>
              </a-popconfirm>
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
      v-model:visible="showQrcodeVisible"
      width="auto"
      :footer="false"
      :simple="true"
      hide-cancel
    >
      <template #title> 添加视频号</template>
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
                  扫码成功</span
                >
              </div>
            </div>

            <a-tag color="green">请用微信APP扫描二维码</a-tag>
          </a-space>
        </a-space>
      </a-card>
    </a-modal>

    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form ref="formRef" :model="editModel">
        <a-form-item
          v-if="editModel.type === 2"
          field="remark"
          label="备注"
          :rules="[
            {
              required: true,
              message: '请填写备注',
            },
          ]"
        >
          <a-input v-model="editModel.remark" placeholder="请填写备注" />
        </a-form-item>
        <a-form-item
          v-if="editModel.type === 3"
          field="appId"
          label="APPID"
          :rules="[
            {
              required: true,
              message: '请填写APPID',
            },
          ]"
        >
          <a-input v-model="editModel.appId" placeholder="请填写APPID" />
        </a-form-item>
        <a-form-item
          v-if="editModel.type === 3"
          field="secret"
          label="密钥"
          :rules="[
            {
              required: true,
              message: '请填写密钥',
            },
          ]"
        >
          <a-input v-model="editModel.secret" placeholder="请填写密钥" />
        </a-form-item>
        <a-form-item v-if="editModel.type === 3" label="">
          <template #label>
            <a-typography-text
              type="primary"
              style="cursor: pointer"
              @click="openLink"
            >
              如何绑定小店</a-typography-text
            >
          </template>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getQrcode, getQrcodeStatus, bindMerchant, sphGrid } from '@/api/sph';
  import {
    merchantGrid,
    merchantEdit,
    unbindMerchant,
  } from '@/api/merchantApi';
  import dayjs from 'dayjs';
  import QrcodeVue from 'qrcode.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Pagination } from '@/types/global';
  import { sphType, sphStatus, useStatus, enumToObject } from '@/utils/enum';
  import { useUserStore } from '@/store/index';

  const userStore = useUserStore();

  const generateFormModel = () => {
    return {};
  };
  const scroll = {
    x: 1700,
    // y: 500,
  };
  const router = useRouter();

  const formVisible = ref(false);
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
  const openLink = () => {
    window.open(
      'https://docs.qq.com/doc/DTkNNQ0tEWGVvdUta?&u=a03ed1a898694aefbc6591043d89b6ce'
    );
  };
  const editFormModel = () => {
    return {
      id: undefined,
      secret: '',
      remark: '',
      appId: '',
      type: 1,
    };
  };
  const editModel = ref(editFormModel());

  const merchantInputFiled = ref({
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

  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await merchantGrid(params);
      // if (data.grid) {
      renderData.value = data.grid || [];
      // }
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
      return;
    }
    setTimeout(checkSph, 1000);
  };
  const handleClickUnBind = async (row: any) => {
    const { code } = await unbindMerchant({ mid: row.mid });
    if (code === 200) {
      Message.success({
        content: '解绑成功',
        duration: 5 * 1000,
      });
    }

    search();
  };
  const handleClickDel = async (row: any) => {
    // const res = await delMerchant({,id:row.id})
    // if(res.code===200){
    // }
  };
  const handleClick = async (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '修改备注信息';
      editModel.value.id = row.id;
      editModel.value.remark = row.remark;
      editModel.value.type = 2;
      formVisible.value = true;
    } else if (type === 3) {
      formTitle.value = '绑定小店';

      formVisible.value = true;
      // editModel.value = row;
      editModel.value = editFormModel();

      editModel.value.type = 3;

      // const { data } = await getQrcode({});
      // qrcodeValue.value = data.url;
      // qrcodeToken.value = data.token;

      // showQrcodeVisible.value = true;
      // checkSph();
    }
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
    } else if (editModel.value.type === 2) {
      const { data } = await merchantEdit(editModel.value);
      Message.success({
        content: '修改成功',
        duration: 5 * 1000,
      });
      search();
    } else {
      const { data } = await bindMerchant(editModel.value);
      Message.success({
        content: '绑定成功',
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
  .box_bcw {
    padding: 20px 17px;
    border-radius: 12px;
    background: #fff;
    margin-bottom: 12px;
  }
  .shopInfo {
    text-align: left;
  }
</style>
