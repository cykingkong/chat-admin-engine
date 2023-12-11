<!-- eslint-disable no-plusplus -->
<template>
  <div class="container">
    <div class="upai_content">
      <Breadcrumb :items="['直播投流管理', '自动关停策略']" />
      <div class="pageTitle"> 自动关停策略 </div>
      <a-row>
        <a-card class="general-card-upai" style="width: 100%">
          <a-row>
            <a-col :flex="1">
              <a-form :model="reqModel" auto-label-width label-align="left">
                <a-row :gutter="16">
                  <a-col :span="8">
                    <a-form-item field="sphName">
                      <template #label>
                        <div class="labelText">名称搜索：</div>
                      </template>
                      <a-input
                        v-model="reqModel.name"
                        placeholder="请输入关停策略名称"
                        allow-clear
                        @press-enter="search"
                      />
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
        <a-row style="margin-bottom: 16px">
          <a-col :span="16">
            <a-space>
              <a-button type="primary" @click="handleGpClick(1, null)">
                <template #icon>
                  <icon-plus />
                </template>
                创建关停策略
              </a-button>
            </a-space>
          </a-col>
        </a-row>

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
                  title="关停策略名称"
                  data-index="srName"
                  align="center"
                >
                </a-table-column>
                <a-table-column title="关停策略" data-index="" align="center">
                  <template #cell="{ record }">
                    {{
                      ruleType[record.firstType] +
                      record.firstVal +
                      ruleFlagType[record.flagType] +
                      ruleType[record.secondType] +
                      record.secondVal
                    }}
                  </template>
                </a-table-column>

                <a-table-column
                  title="更新时间"
                  data-index="updatedAt"
                  align="center"
                >
                </a-table-column>
                <a-table-column
                  title="创建时间"
                  data-index="createdAt"
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
                      @click="handleGpClick(2, record)"
                    >
                      修改
                    </a-button>
                    <!-- <a-button type="text" size="small"> 删除 </a-button> -->
                    <!-- <a-button
                      type="text"
                      size="small"
                      @click="handleClickCoupon(record)"
                    >
                      删除
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
      v-model:visible="formGpVisible"
      :title="formGpTitle"
      width="840px"
      @cancel="formGpVisible = false"
      @before-ok="handleGpBeforeOk"
    >
      <a-form ref="formGpRef" :model="formGpModel" :auto-label-width="true">
        <a-form-item
          field="name"
          label="关停策略名称"
          :rules="[{ required: true, message: '请填写关停策略名称' }]"
        >
          <a-input v-model="formGpModel.name" />
        </a-form-item>

        <a-form-item
          field="name"
          label="自动关停条件"
          :rules="[{ required: true, message: '请填写关停策略名称' }]"
        >
          <a-row :gutter="8">
            <a-col :span="6">
              <a-form-item
                field="firstType"
                validate-trigger="input"
                :rules="[{ required: true, message: '请选择类型' }]"
                no-style
              >
                <a-select
                  v-model="formGpModel.firstType"
                  @change="changeGpName"
                >
                  <a-option
                    v-for="(item, key) in enumToObject(ruleType)"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                field="firstVal"
                :rules="[{ required: true, message: '填写对应值' }]"
                no-style
              >
                <a-space>
                  <a-input
                    v-model="formGpModel.firstVal"
                    @change="changeGpName"
                  />
                  <span> {{ formGpTypeUnit[formGpModel.firstType] }},</span>
                </a-space>
              </a-form-item>
            </a-col>

            <a-col :span="4">
              <a-form-item
                field="flagType"
                :rules="[{ required: true, message: '请选择类型' }]"
                no-style
              >
                <a-select v-model="formGpModel.flagType" @change="changeGpName">
                  <a-option
                    v-for="(item, key) in enumToObject(ruleFlagType)"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item
                field="secondType"
                validate-trigger="input"
                :rules="[{ required: true, message: '请选择类型' }]"
                no-style
              >
                <a-select
                  v-model="formGpModel.secondType"
                  @change="changeGpName"
                >
                  <a-option
                    v-for="(item, key) in enumToObject(ruleType)"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                field="secondVal"
                :rules="[{ required: true, message: '填写对应值' }]"
                no-style
              >
                <a-space>
                  <a-input
                    v-model="formGpModel.secondVal"
                    @change="changeGpName"
                  />
                  <span> {{ formGpTypeUnit[formGpModel.secondType] }}</span>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-typography-text type="secondary">
            提示：<br />
            “并且” 代表两个条件同时满足才触发自动关停 <br />
            “或者” 代表两个条件只需满足其中一个就会触发自动
          </a-typography-text>
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
    shutdownRuleAdd,
    shutdownRuleDel,
    shutdownRuleEdit,
    shutdownRuleGrid,
  } from '@/api/rule';
  import { ruleFlagType, ruleType, enumToObject } from '@/utils/enum';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { useRouter } from 'vue-router';

  const scroll = {
    x: 3200,
    y: 500,
  };

  const { loading, setLoading } = useLoading(true);

  const formGpVisible = ref(false);
  const formGpTitle = ref('新建计划包');
  const formGpTypeUnit = ref(['', '元', '元', '元', '小时', '', '', '小时']);

  const generateFormGpModel = () => {
    return {
      name: null,
      type: 1,
      firstType: 1,
      firstVal: 0,
      secondType: 1,
      secondVal: 0,
      flagType: 1,
      srType: 2,
    };
  };
  const formGpModel = ref(generateFormGpModel());
  const formGpRef = ref<FormInstance>();

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
      name: '',
      pageIndex: 1,
      pageSize: 10,
      srType: 2,
    };
  };

  const reqModel = ref(generateFormReqModel());
  const renderData = ref([]);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await shutdownRuleGrid(params);
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

  const handleGpBeforeOk = async (done: any) => {
    const res = await formGpRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (formGpModel.value.type === 1) {
      const { data } = await shutdownRuleAdd({ ...formGpModel.value });
      Message.success({
        content: '添加关停策略成功',
        duration: 5 * 1000,
      });
      await search();
    } else {
      const { data } = await shutdownRuleEdit({ ...formGpModel.value });
      Message.success({
        content: '修改关停策略成功',
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

  const jumpPlantData = (id: any) => {
    router.push({
      name: 'plantData',
      query: {
        packageId: id,
      },
    });
  };

  const changeGpName = () => {
    formGpModel.value.name =
      ruleType[formGpModel.value.firstType] +
      formGpModel.value.firstVal +
      ruleFlagType[formGpModel.value.flagType] +
      ruleType[formGpModel.value.secondType] +
      formGpModel.value.secondVal;
  };

  const handleGpClick = async (type: any, item: any) => {
    if (type === 2) {
      formGpTitle.value = '修改关停策略';
      formGpModel.value.srId = item.srId;
      formGpModel.value.name = item.srName;
      formGpModel.value.firstType = item.firstType;
      formGpModel.value.firstVal = item.firstVal;
      formGpModel.value.flagType = item.flagType;
      formGpModel.value.secondType = item.secondType;
      formGpModel.value.secondVal = item.secondVal;
      formGpModel.value.srType = 2;
    } else {
      formGpTitle.value = '新增关停策略';
      formGpModel.value = generateFormGpModel();
      formGpModel.value.name = null;
      formGpModel.value.srType = 2;
      changeGpName();
    }

    formGpModel.value.type = type;
    formGpVisible.value = true;
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
  const refresh = () => {
    reqModel.value = generateFormReqModel();
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
  :deep .arco-progress-line-text {
    margin-left: 1px;
    min-width: none;
  }
</style>
