<template>
  <view class="content">
    <a-card class="general-card-upai" style="width: 100%; padding-bottom: 32px">
      <a-table
        v-model:selectedKeys="selectedAddressKey"
        row-key="addressId"
        :row-selection="rowSelection"
        :pagination="false"
        :loading="loading"
        :data="renderData"
        :hoverable="true"
        :scroll="scroll"
        :stripe="false"
        :bordered="false"
        @select="selectKey"
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
          <!--    <a-table-column title="创建时间" align="center">
            <template #cell="{ record }">{{ record.createdAt }}</template>
          </a-table-column>

          <a-table-column title="是否默认" align="center">
            <template #cell="{ record }">
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

               <a-button type="text" size="small" @click="handleClick(1)">
                重新登录
              </a-button>
            </template>
          </a-table-column> -->
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
      <a-row style="margin-top: 24px" justify="space-between">
        <a-col flex="100px"></a-col>
        <a-col flex="60px">
          <a-space :size="18">
            <a-button @click="handleCancel()">取消</a-button>

            <a-button type="primary" @click="handleClick()"> 确认 </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-card>
  </view>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, toRefs, watch } from 'vue';
  import useLoading from '@/hooks/loading';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    addressGrid,
    areaGrid,
    merchantGrid,
    addressAdd,
    addressEdit,
  } from '@/api/merchantApi';

  const { loading, setLoading } = useLoading(true);
  const scroll = {
    // x: 1800,
    y: 500,
  };
  const rowSelection = {
    type: 'radio',
  };
  const emit = defineEmits(['selectChange', 'closeV']);
  const props = defineProps({
    mid: {
      type: Number,
      default: 1,
    },
  });
  const generateFormModel = () => {
    return {
      mid: undefined,
      isDefault: -1,
    };
  };
  const addressInfo = ref();
  const selectKey = (rowKeys: any, rowKey: any, record: any) => {
    console.log(rowKeys, rowKey, record);
    addressInfo.value = record;
  };
  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const selectedAddressKey = ref<any>();

  const { mid } = toRefs(props);
  const basePagination: any = {
    pageIndex: 1,
    pageSize: 10,
  };
  console.log(mid.value);
  formModel.value.mid = mid.value;
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
  const getMid = computed(() => {
    return mid.value;
  });
  const wa = watch(
    getMid,
    (newVal, oldVal) => {
      if (newVal !== undefined && Number(newVal) > 0) {
        formModel.value.mid = newVal;

        fetchData({
          ...basePagination,
          ...formModel.value,
        } as unknown as any);
        // getSkuByPro();
        // fetchCouponData({ proId: newVal });
      }
    },
    { immediate: true, deep: true }
  );
  const handleClick = () => {
    console.log(selectedAddressKey.value);

    emit('selectChange', addressInfo.value);
  };
  const handleCancel = () => {
    emit('closeV');
  };
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
  }
  .content {
    background: #f7f7f7;
  }
</style>
