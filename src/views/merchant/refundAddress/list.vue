<template>
  <div class="container">
    <Breadcrumb :items="['小店管理', '小店列表']" />
    <!-- <div class="pageTitle"> 小店列表 </div> -->
    <div class="box_bcw" style="width: 100%">
      <a-row justify="space-between">
        <a-col flex="120px"></a-col>
        <a-col flex="80px">
          <a-button type="primary" @click="handleClick(3)">
            <template #icon>
              <icon-plus />
            </template>
            添加退货地址
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
        :scroll="scroll"
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
                    v-if="record.merchantInfo.headimgUrl"
                    alt="avatar"
                    :src="record.merchantInfo.headimgUrl"
                  />
                </a-avatar>
                <a-space>
                  <div class="shopInfo">
                    <div class="shopName">
                      <a-typography-text>
                        名称:<a-typography-text type="secondary">
                          {{ record.merchantInfo.nickname }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                    <div class="APPID">
                      <a-typography-text>
                        APPID:<a-typography-text type="secondary">
                          {{ record.merchantInfo.appid }}
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
          <a-table-column title="地址信息" align="center">
            <template #cell="{ record }">
              {{ record.addressInfo || '-' }}
            </template> </a-table-column
          ><a-table-column title="联系方式" align="center">
            <template #cell="{ record }">
              <a-space>
                <div class="info">
                  <div class="shopName">
                    <a-typography-text>
                      联系人:<a-typography-text type="secondary">
                        {{ record.detailInfo.address_info.user_name }}
                      </a-typography-text>
                    </a-typography-text>
                  </div>
                  <div class="APPID">
                    <a-typography-text>
                      手机号码:<a-typography-text type="secondary">
                        {{ record.detailInfo.address_info.tel_number }}
                      </a-typography-text>
                    </a-typography-text>
                  </div>
                </div>
              </a-space>
            </template>
          </a-table-column>
          <!-- <a-table-column title="订单同步时间" align="center">
            <template #cell="{ record }">{{
              record.sphLoginAt
                ? dayjs(record.sphLoginAt).format('YYYY-MM-DD HH:mm:ss')
                : '-'
            }}</template>
          </a-table-column> 
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
          </a-table-column>-->
          <a-table-column title="是否默认" align="center">
            <template #cell="{ record }">
              <!-- <a-switch v-model="record.isDefault" :disabled="true"  /> -->
              {{ record.isDefault ? '默认地址' : '否' }}
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

              <!-- <a-button type="text" size="small" @click="handleClick(1)">
                重新登录
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
      v-model:visible="formVisible"
      :title="formTitle"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form ref="formRef" :model="editModel">
        <!-- <a-form-item
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
        </a-form-item> -->
        <a-form-item
          field="mid"
          label="店铺名称"
          :rules="[
            {
              required: true,
              message: '请选择店铺名称',
            },
          ]"
        >
          <a-select v-model="editModel.mid" placeholder="请选择店铺名称">
            <a-option
              v-for="(item, key) in merchantList"
              :key="key"
              :label="item.nickname"
              :value="item.mid"
            />
          </a-select>
        </a-form-item>
        <a-form-item
          label="联系人"
          :rules="[
            {
              required: true,
              message: '请填写联系人',
            },
          ]"
        >
          <a-input
            v-model="editModel.address_detail.address_info.user_name"
            placeholder="请填写联系人"
          />
        </a-form-item>
        <a-form-item
          label="联系方式"
          :rules="[
            {
              required: true,
              message: '请填写联系方式',
            },
          ]"
        >
          <a-input
            v-model="editModel.address_detail.address_info.tel_number"
            placeholder="请填写手机号码"
          />
        </a-form-item>
        <a-form-item
          label="选择地址"
          :rules="[
            {
              required: true,
              message: '请选择地址',
            },
          ]"
        >
          <t-cascader
            v-model="addressInfo"
            :options="provinceList"
            clearable
            show-all-levels="true"
            :style="{ width: '100%' }"
            value-mode="all"
            :load="loadMore"
            @change="selectChange"
          />

          <!-- <a-select
              v-model="editModel.address_detail.address_info.province_name"
              :style="{ width: '120px' }"
              placeholder="请选择省"
            >
              <a-option
                v-for="(item, index) in province"
                :key="index"
                :value="item.province"
              >
                {{ item.name }}
              </a-option>
            </a-select> -->
          <!-- <a-cascader
              :options="provinceList"
              :style="{ width: '320px' }"
              :field-names="fieldNames"
              placeholder="请选择地址"
              :load-more="loadMore"
              @change="selectChange"
            /> -->
        </a-form-item>

        <a-form-item
          label="详细地址"
          :rules="[
            {
              required: true,
              message: '请填写详细地址',
            },
          ]"
        >
          <a-input
            v-model="editModel.address_detail.address_info.detail_info"
            placeholder="请填写详细地址"
          />
        </a-form-item>
        <a-form-item
          field="secret"
          label="邮政编码"
          :rules="[
            {
              required: false,
            },
          ]"
        >
          <a-input
            v-model="editModel.address_detail.address_info.postal_code"
            placeholder="请填写邮政编码"
          />
        </a-form-item>
        <a-form-item
          label="设为默认"
          :rules="[
            {
              required: false,
            },
          ]"
        >
          <a-radio-group v-model="editModel.isDefault">
            <a-radio :value="1">设为默认地址</a-radio>
            <a-radio :value="0">不设为默认地址</a-radio>
          </a-radio-group>
          <!-- <a-switch v-model="editModel.detailInfo.default_recv" /> -->
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getQrcode, getQrcodeStatus, sphEdit, sphGrid } from '@/api/sph';
  import {
    addressGrid,
    areaGrid,
    merchantGrid,
    addressAdd,
    addressEdit,
  } from '@/api/merchantApi';
  import dayjs from 'dayjs';
  import QrcodeVue from 'qrcode.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Pagination } from '@/types/global';
  import { sphType, sphStatus, useStatus, enumToObject } from '@/utils/enum';
  import { useUserStore } from '@/store/index';
  import _ from 'lodash';

  const userStore = useUserStore();
  const addressInfo = ref('');
  const fieldNames = { value: 'province', label: 'name' };
  const generateFormModel = () => {
    return {
      isDefault: -1,
    };
  };
  const scroll = {
    x: 2000,
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

  const editFormModel = () => {
    return {
      isDefault: 0,
      mid: undefined,
      address_detail: {
        addressId: '',
        address_info: {
          user_name: '',
          postal_code: '',
          province_name: '',
          city_name: '',
          county_name: '',
          detail_info: '',
          tel_number: '',
          lat: 0,
          lng: 0,
          house_number: '',
        },
        landline: '',
        remark: '',
        send_addr: false,
        default_send: false,
        recv_addr: false,
        default_recv: false,
        address_type: {
          same_city: 0,
          pickup: 0,
        },
      },
    };
  };
  const editModel = ref(editFormModel());

  const merchantInputFiled = ref({
    remark: '备注',
  });

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<any[]>([]);
  const provinceList = ref<any[]>([]);
  const merchantList = ref<any>([]);

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
      const { data } = await addressGrid(params);
      if (data.grid) {
        data.grid.forEach((e) => {
          e.detailInfo = JSON.parse(e.detailInfo);
          e.addressInfo =
            e.detailInfo.address_info.province_name +
            e.detailInfo.address_info.city_name +
            e.detailInfo.address_info.county_name +
            e.detailInfo.address_info.detail_info;
        });
        renderData.value = data.grid;

        console.log(data.grid);
      }

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
  const getMerchantGrid = async () => {
    const { data } = await merchantGrid(pagination);
    merchantList.value = data.grid;
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

  const getArea = async () => {
    const { data } = await areaGrid({ parentCode: 0 });
    console.log(data);
    if (data.grid) {
      data.grid.forEach((e: any) => {
        e.label = e.name;
        e.value = `${e.code},${e.name}`;
        e.children = e.level < 3;
      });
      console.log(data.grid);
      provinceList.value = data.grid;
    }
  };
  getArea();
  const selectChange = (value: any) => {
    // value.forEach((e: any, k: any) => {
    const str: any = value.split(',')[1];
    //   if (k === 0) {
    //     // eslint-disable-next-line prefer-destructuring
    //     editModel.value.address_detail.address_info.province_name = str[1];
    //   } else if (k === 1) {
    //     // eslint-disable-next-line prefer-destructuring
    //     editModel.value.address_detail.address_info.city_name = str[1];
    //   } else {
    //     // eslint-disable-next-line prefer-destructuring
    editModel.value.address_detail.address_info.county_name = str;
    //   }
    // });
    console.log(value, editModel.value);

    // editModel.value.address_detail.address_info
    // const oneLabel = _.find(provinceList.value, ['code', value[0]]).label;
  };
  const loadMore = (node: any) => {
    console.log(node);
    // eslint-disable-next-line no-new
    return new Promise((resolve: any) => {
      const nodevalue = node.value.split(',');
      if (node.level === 0) {
        // eslint-disable-next-line prefer-destructuring
        editModel.value.address_detail.address_info.province_name =
          nodevalue[1];
      } else {
        // eslint-disable-next-line prefer-destructuring
        editModel.value.address_detail.address_info.city_name = nodevalue[1];
      }
      areaGrid({ parentCode: nodevalue[0] }).then((res) => {
        const { grid } = res.data;

        grid.forEach((e: any) => {
          e.label = e.name;
          e.value = `${e.code},${e.name}`;
          e.children = e.level < 3;
        });
        // provinceList.value.forEach((e: any, k: any) => {
        //   if (e.code === node.value) {
        //     e.children = grid;
        //   }
        // });
        // console.log(provinceList.value);

        // node.children = grid;
        resolve(grid);
      });
      // resolve({
      //   label: '12312',
      //   value: '123123',
      // });
    });

    // done(done);
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
  const handleClick = async (type: number, row?: any) => {
    getMerchantGrid();

    if (type === 2) {
      addressInfo.value = '';
      formTitle.value = '修改地址';
      editModel.value.mid = row.mid;

      editModel.value.address_detail.addressId = row.addressId;
      editModel.value.address_detail.address_info.user_name =
        row.detailInfo.address_info.user_name;
      editModel.value.address_detail.address_info.tel_number =
        row.detailInfo.address_info.tel_number;
      editModel.value.address_detail.address_info.postal_code =
        row.detailInfo.address_info.postal_code;
      editModel.value.address_detail.address_info.detail_info =
        row.detailInfo.address_info.detail_info;

      editModel.value.address_detail.address_info.province_name =
        row.detailInfo.address_info.province_name;
      editModel.value.address_detail.address_info.city_name =
        row.detailInfo.address_info.city_name;
      editModel.value.address_detail.address_info.county_name =
        row.detailInfo.address_info.county_name;
      editModel.value.isDefault = row.isDefault;

      addressInfo.value =
        row.detailInfo.address_info.province_name +
        row.detailInfo.address_info.city_name +
        row.detailInfo.address_info.county_name;
      editModel.value.type = 2;
      formVisible.value = true;
    } else if (type === 3) {
      formTitle.value = '新增退货地址';

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

    if (editModel.value.type === 2) {
      // editModel.value.sphId = Number(editModel.value.sphId);
      // editModel.value.costPrice = Number(editModel.value.costPrice);
      const { data } = await addressEdit(editModel.value);
      Message.success({
        content: '编辑成功',
        duration: 5 * 1000,
      });
      search();
    } else {
      const { data } = await addressAdd(editModel.value);
      Message.success({
        content: '添加成功',
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
  // .selectInfo {
  //   width: 100%;
  //   :deep(.t-select-input) {
  //     color: red;
  //     :deep(.t-input__wrap) {
  //       color: red;

  //       :deep(.t-is-readonly) {
  //         background: #f2f5ff;
  //         border: none;
  //       }
  //     }
  //   }
  // }
</style>
