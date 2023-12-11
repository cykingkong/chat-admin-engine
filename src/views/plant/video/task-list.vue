<!-- eslint-disable no-plusplus -->
<template>
  <div class="container">
    <div class="upai_content">
      <Breadcrumb :items="['视频管理', '任务记录']" />
      <div class="pageTitle"> 任务记录 </div>
      <a-row>
        <a-card class="general-card-upai" style="width: 100%">
          <a-row>
            <a-col :flex="1">
              <a-form :model="reqModel" auto-label-width label-align="left">
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item field="taskStatus" label="任务状态">
                      <a-select
                        v-model="reqModel.taskStatus"
                        allow-clear
                        placeholder="请选择视频号类型"
                      >
                        <a-option
                          v-for="(item, key) in enumToObject(taskStatus)"
                          :key="key"
                          :label="item.label"
                          :value="item.value"
                        />
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <a-col :span="8">
                    <a-form-item field="createdTime">
                      <template #label>
                        <div class="labelText">创建时间：</div>
                      </template>
                      <a-range-picker
                        v-model="createDate"
                        show-time
                        :default-value="[]"
                        style="width: 100%"
                        :shortcuts="rangeShortcuts"
                        shortcuts-position="left"
                        @change="dateChange"
                      />
                      <!-- <a-range-picker style="width: 100%" @change="dateChange" /> -->
                    </a-form-item>
                  </a-col>
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
                <a-table-column title="发布号">
                  <template #cell="{ record }">
                    <a-space>
                      <a-avatar>
                        <img alt="avatar" :src="record.sphAideInfo.sphAvatar" />
                      </a-avatar>
                      {{ record.sphAideInfo.sphName }}
                    </a-space>
                  </template>
                </a-table-column>
                <a-table-column
                  title="任务状态"
                  data-index="taskStatus"
                  align="center"
                >
                  <template #cell="{ record }">
                    <a-tag color="arcoblue">
                      {{ taskStatus[record.taskStatus] }}
                    </a-tag>
                  </template>
                </a-table-column>

                <a-table-column
                  title="描述类型"
                  data-index="videoDescriptionType"
                  align="center"
                >
                  <template #cell="{ record }">
                    {{ descriptionType[record.videoDescriptionType] }}
                  </template>
                </a-table-column>
                <a-table-column
                  title="发布类型"
                  data-index="publishType"
                  align="center"
                >
                  <template #cell="{ record }">
                    <a-space direction="vertical">
                      <span> {{ publishType[record.publishType] }}</span>

                      <span v-if="record.publishType === 2">{{
                        dayjs
                          .unix(record.publishTimer)
                          .format('YYYY-MM-DD HH:mm:ss')
                      }}</span>
                    </a-space>
                  </template>
                </a-table-column>
                <a-table-column
                  title="挂车商品ID"
                  data-index="productCode"
                  align="center"
                >
                </a-table-column>
                <!-- <a-table-column
                  title="错误原因"
                  data-index="errorMsg"
                  align="center"
                >
                </a-table-column> -->

                <a-table-column
                  title="创建数量"
                  data-index="createNum"
                  align="center"
                >
                </a-table-column>
                <a-table-column
                  title="创建成功"
                  data-index="orderSuccess"
                  align="center"
                >
                </a-table-column>
                <a-table-column
                  title="创建失败"
                  data-index="orderError"
                  align="center"
                >
                </a-table-column>

                <a-table-column
                  title="更新时间"
                  data-index="updatedAt"
                  align="center"
                >
                </a-table-column>
                <a-table-column
                  align="center"
                  fixed="right"
                  title="操作"
                  data-index="operations"
                >
                  <template #cell="{ record }">
                    <a-button
                      type="text"
                      size="small"
                      @click="openTaskInfo(record)"
                    >
                      素材详情
                    </a-button>
                    <!-- <a-button
                      type="text"
                      size="small"
                      @click="handleClickCoupon(record)"
                    >
                      复投
                    </a-button> -->
                  </template>
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

    <a-modal
      v-model:visible="showTaskInfoVisible"
      width="1300px"
      :body-style="{
        padding: 0,
      }"
      title="素材上传记录"
      style="padding: 0"
      :footer="false"
    >
      <TaskInfoList :id="taskAideId" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import { useRouter } from 'vue-router';

  import { aideVideoTaskGrid } from '@/api/sph-aide';
  import {
    taskStatus,
    publishType,
    descriptionType,
    enumToObject,
  } from '@/utils/enum';

  import TaskInfoList from './components/task-info-list.vue';

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
    x: 3200,
    y: 500,
  };
  const bgcolor = '#F7F9FF';

  const { loading, setLoading } = useLoading(true);

  const taskAideId = ref(0);
  // page
  const basePagination: Pagination = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const generateFormReqModel = () => {
    return {
      startDate: dayjs().add(-1, 'month').format('YYYY-MM-DD').toString(),
      endDate: dayjs().format('YYYY-MM-DD').toString(),
      pageIndex: 1,
      pageSize: 10,
      taskStatus: -1,
    };
  };

  const reqModel = ref(generateFormReqModel());
  const renderData = ref([]);
  const actionTypeActive = ref(0);

  const showTaskInfoVisible = ref<boolean>(false);
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await aideVideoTaskGrid(params);
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

  const openTaskInfo = (row: any) => {
    taskAideId.value = row.taskAideId;
    console.log(row.taskAideId);
    showTaskInfoVisible.value = true;
  };
  const createDate = ref([]);
  const refresh = () => {
    reqModel.value = generateFormReqModel();
    createDate.value = [];
  };
  fetchData({
    ...reqModel.value,
  });
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
</style>
