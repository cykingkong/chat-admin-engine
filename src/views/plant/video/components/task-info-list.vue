<!-- eslint-disable no-plusplus -->
<template>
  <div class="container-task-info">
    <div class="upai_content">
      <a-row>
        <a-card class="general-card-upai" style="width: 100%">
          <a-row>
            <a-col :flex="1">
              <a-form :model="reqModel" auto-label-width label-align="left">
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item field="status" label="上传状态">
                      <a-select
                        v-model="reqModel.status"
                        allow-clear
                        placeholder="请选择上传状态"
                      >
                        <a-option
                          v-for="(item, key) in enumToObject(taskInfoStatus)"
                          :key="key"
                          :label="item.label"
                          :value="item.value"
                        />
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item field="auditStatus" label="审核状态">
                      <a-select
                        v-model="reqModel.auditStatus"
                        allow-clear
                        placeholder="请选择审核状态"
                      >
                        <a-option
                          v-for="(item, key) in enumToObject(auditStatus)"
                          :key="key"
                          :label="item.label"
                          :value="item.value"
                        />
                      </a-select>
                    </a-form-item>
                  </a-col>

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
        <a-row>
          <a-col flex="1">
            <a-table
              row-key="id"
              :pagination="false"
              :hoverable="true"
              :loading="loading"
              :stripe="false"
              :data="renderData"
              :bordered="false"
            >
              <template #columns>
                <a-table-column
                  title="视频编号"
                  data-index="taskVideoNonce"
                  align="center"
                >
                </a-table-column>
                <a-table-column title="发布视频" align="left" width="350">
                  <template #cell="{ record }">
                    <a-space>
                      <a-image
                        :src="
                          record.coverUrl ||
                          'http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png'
                        "
                        width="80px"
                        height="100px"
                        style="width: 80px; height: 100px"
                      />
                      <a-space direction="vertical" fill>
                        <a-typography-paragraph
                          :ellipsis="{
                            rows: 1,
                            expandable: true,
                          }"
                        >
                          {{ record.description || '-' }}
                        </a-typography-paragraph>

                        <div
                          class="proCode"
                          style="display: flex; align-items: center"
                          ><a-typography-paragraph
                            copyable
                            style="margin-bottom: 0"
                          >
                            {{ record.videoNickName || '-' }}
                          </a-typography-paragraph></div
                        >

                        <div
                          class="proCode"
                          style="display: flex; align-items: center"
                          ><a-typography-paragraph style="margin-bottom: 0">
                            {{ record.createdAt || '-' }}
                          </a-typography-paragraph></div
                        >
                      </a-space>
                    </a-space>
                  </template>
                </a-table-column>

                <a-table-column
                  title="上传状态"
                  data-index="taskStatus"
                  align="center"
                >
                  <template #cell="{ record }">
                    <a-tag color="arcoblue">
                      {{ taskInfoStatus[record.status] }}
                    </a-tag>
                  </template>
                </a-table-column>
                <a-table-column
                  title="审核状态"
                  data-index="taskStatus"
                  align="center"
                >
                  <template #cell="{ record }">
                    <a-tag color="arcoblue">
                      {{ auditStatus[record.auditStatus] }}
                    </a-tag>
                  </template>
                </a-table-column>

                <a-table-column
                  title="错误原因"
                  data-index="errorMsg"
                  align="center"
                >
                </a-table-column>
              </template>
            </a-table>
            <div class="pagination">
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
                />
              </div>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, toRefs, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import { useRouter } from 'vue-router';

  import { aideVideoTaskInfoGrid } from '@/api/sph-aide';
  import { taskInfoStatus, auditStatus, enumToObject } from '@/utils/enum';

  const props = defineProps({
    id: {
      type: Number,
      default: 0,
    },
  });

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

  const { loading, setLoading } = useLoading(true);

  // page
  const basePagination: Pagination = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const taskAideId = ref(props.id);

  const generateFormReqModel = () => {
    return {
      startDate: dayjs().add(-1, 'month').format('YYYY-MM-DD').toString(),
      endDate: dayjs().format('YYYY-MM-DD').toString(),
      pageIndex: 1,
      pageSize: 10,
      taskStatus: -1,
      taskAideId: taskAideId.value,
    };
  };

  const reqModel = ref(generateFormReqModel());
  const renderData = ref([]);
  const actionTypeActive = ref(0);

  watch(
    () => props.id,
    (newId, oldId) => {
      // 当 id 变化时，重新请求数据
      reqModel.value.taskAideId = newId;
      search();
    }
  );

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await aideVideoTaskInfoGrid(params);
      renderData.value = data.grid;
      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total;
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
    // advData();
    onPageChange(1);
  };
  const router = useRouter();

  const createDate = ref([]);
  const refresh = () => {
    reqModel.value = generateFormReqModel();
    createDate.value = [];
  };

  if (props.id > 0) {
    fetchData({
      ...reqModel.value,
    });
  }

  defineExpose({
    fetchData,
  });
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
  .container-task-info {
    height: 100%;
    padding: 14px 17px 17px 17px;
    background: #f7f9ff;
  }

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
</style>
