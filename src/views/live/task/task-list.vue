<!-- eslint-disable no-plusplus -->
<template>
  <div class="container">
    <div class="upai_content">
      <Breadcrumb :items="['投流管理', '投放任务']" />
      <div class="pageTitle"> 任务列表 </div>
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
              row-key="key"
              :pagination="false"
              :hoverable="true"
              :loading="loading"
              :stripe="false"
              :scroll="scroll"
              :data="renderData"
              :bordered="false"
            >
              <template #columns>
                <a-table-column title="被投视频" align="left" width="350">
                  <template #cell="{ record }">
                    <a-space>
                      <a-image
                        :src="
                          record.investedInfo
                            ? record.investedInfo.coverUrl
                            : 'http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png'
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
                          {{
                            record.investedInfo
                              ? record.investedInfo.signature
                              : '-'
                          }}
                        </a-typography-paragraph>

                        <div
                          class="proCode"
                          style="display: flex; align-items: center"
                          ><a-typography-paragraph
                            copyable
                            style="margin-bottom: 0"
                          >
                            {{
                              record.investedInfo
                                ? record.investedInfo.nickName
                                : '-'
                            }}
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
                  title="投放总金额"
                  data-index="orderSum"
                  align="center"
                >
                </a-table-column>
                <a-table-column
                  title="投放笔数"
                  data-index="orderCount"
                  align="center"
                >
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
                  title="单笔投放金额"
                  data-index="orderOne"
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
                  title="支付笔数"
                  data-index="orderPay"
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
                  title="备注"
                  data-index="taskRemark"
                  align="center"
                >
                  <template #cell="{ record }">
                    {{ record.taskRemark || '-' }}
                  </template>
                </a-table-column>
                <a-table-column
                  align="center"
                  fixed="right"
                  title="操作"
                  width="240"
                  data-index="operations"
                >
                  <template #cell="{ record }">
                    <a-space :size="0" direction="vertical">
                      <a-space>
                        <a-button
                          type="text"
                          size="small"
                          @click="handleClick(record)"
                        >
                          备注
                        </a-button>
                        <a-button
                          type="text"
                          size="small"
                          @click="jumpPlantData(record.taskId)"
                        >
                          查看计划
                        </a-button>
                      </a-space>
                      <a-space>
                        <a-button
                          type="text"
                          size="small"
                          @click="jumpTask(record)"
                        >
                          复投
                        </a-button>
                        <a-popconfirm
                          content="请确认是否删除该计划任务？"
                          ok-text="确认"
                          @ok="handleClickDelete(record)"
                        >
                          <a-button type="text" status="danger" size="small">
                            删除
                          </a-button>
                        </a-popconfirm>
                        <!-- <a-button
                          type="text"
                          size="small"
                          status="success"
                          @click="payTask(record)"
                        >
                          支付
                        </a-button> -->
                      </a-space>
                    </a-space>
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
      v-model:visible="visible"
      title="备注投放记录"
      width="500px"
      @cancel="visible = false"
      @before-ok="handlBeforeOk"
    >
      <a-form ref="formRef" :model="editForm" :auto-label-width="true">
        <a-form-item field="taskRemark" label="备注">
          <a-input v-model="editForm.taskRemark" placeholder="请填写备注" />
        </a-form-item>
      </a-form>
    </a-modal>
    <LoginSphModal ref="loginSphModal"></LoginSphModal>

    <!--  创建计划 -->
    <a-modal
      v-model:visible="createOverPayVisible"
      :mask-closable="false"
      width="1000px"
      title="正在创建计划"
      :esc-to-close="false"
      @cancel="createdOrderTimerClear(true)"
      @ok="createdOrderTimerClear(true)"
    >
      <a-row :gutter="24">
        <a-col :span="16">
          <div class="tableBox">
            <a-table
              v-model:selectedKeys="selectedKeys"
              row-key="plantCode"
              :pagination="createPagination"
              :hoverable="true"
              :stripe="false"
              :loading="createTaskOrderLoading"
              :data="createTaskOrderList"
              :bordered="false"
              @page-change="createPaginationChange"
              @row-click="rowClick"
            >
              <template #columns>
                <a-table-column title="投手号" align="center">
                  <template #cell="{ record }">
                    {{ record.sphInfo.sphName }}
                  </template>
                </a-table-column>
                <a-table-column title="创建状态" align="center">
                  <template #cell="{ record }">
                    <!-- <span @click="$message.info(record.errorMsg)"
                      v-if="record.createStatus === 3">
                      <span> {{ createStatus[record.createStatus] }}</span>
                      <icon-exclamation-circle-fill />
                    </span> -->
                    <a-tooltip
                      v-if="record.createStatus === 3"
                      :content="record.errorMsg"
                    >
                      <span>
                        {{ createStatus[record.createStatus] }}
                        <icon-exclamation-circle-fill />
                      </span>
                    </a-tooltip>

                    <span v-else> {{ createStatus[record.createStatus] }}</span>
                  </template>
                </a-table-column>
                <a-table-column title="优惠券折扣" align="center"
                  ><template #cell="{ record }">
                    {{
                      record.voucherInfo ? numF(record.voucherInfo.quota) : '-'
                    }}
                  </template></a-table-column
                >
                <a-table-column title="需支付" align="center">
                  <template #cell="{ record }">
                    {{ record.estimatedWecoinAmount }}
                  </template>
                </a-table-column>
                <a-table-column title="订单状态" align="center">
                  <template #cell="{ record }">
                    {{ plantLiveStatus[record.plantStatus] }}
                    <!-- <a-tooltip
                      v-if="
                        record.plantStatus === 1 && record.createStatus === 1
                      "
                    >
                      <icon-star />
                      <template #content>
                        <p>订单未支付</p>
                      </template>
                    </a-tooltip> -->
                  </template>
                </a-table-column>
              </template>
            </a-table>

            <span
              >共{{ createTaskOrderInfo.total }}条 | 成功{{
                createTaskOrderInfo.success
              }}条 失败{{ createTaskOrderInfo.error }}条｜完成支付{{
                createTaskOrderInfo.overPay
              }}条
            </span>
          </div>
        </a-col>
        <a-col :span="8" style="text-align: center">
          <span style="font-size: 16px">请使用对应投手号进行支付</span>
          <a-spin :loading="createTaskPayLoading" :tip="createTaskPayTips">
            <template
              v-if="
                createTaskPayTips === '当前订单已全部支付完成' ||
                createTaskPayTips === '当前订单支付完成，请勿重复操作'
              "
              #element
            >
              <icon-check-circle-fill :spin="false" :rotate="0" :size="20" />
            </template>
            <a-card class="general-card" style="padding-top: 20px">
              <a-space
                :size="16"
                direction="vertical"
                align="center"
                fill
                style="text-align: center"
              >
                <span style="font-size: 14px">{{ waitQrcodeTips }}</span>

                <span
                  v-if="createTaskPayOrderList[createTaskPayOrderIndex]"
                  style="font-size: 16px; font-weight: 500"
                  >{{
                    createTaskPayOrderList[createTaskPayOrderIndex].plantName
                  }}</span
                >
                <div class="qrcodeBox">
                  <QrcodeVue
                    v-if="createTaskPayOrderList[createTaskPayOrderIndex]"
                    :value="
                      createTaskPayOrderList[createTaskPayOrderIndex].qrCodeVal
                    "
                    :size="220"
                    level="H"
                    style="position: relative"
                  />
                  <div
                    v-if="
                      waitQrcodeTips === '当前订单已支付完成' ||
                      waitQrcodeTips === '计划创建失败，无法支付'
                    "
                    class="qrcodePayMark"
                  >
                    <a-tag
                      v-if="waitQrcodeTips === '当前订单已支付完成'"
                      color="arcoblue"
                      style="transform: scale(1.5)"
                      >已支付</a-tag
                    >

                    <a-tag
                      v-if="waitQrcodeTips === '计划创建失败，无法支付'"
                      color="gray"
                      style="transform: scale(1.3)"
                      >计划已支付</a-tag
                    >
                  </div>
                </div>

                <a-tag color="green">请用微信APP扫描二维码</a-tag>
                <a-space>
                  <a-link @click="createTaskPayOrderJumpThis"
                    >跳过该计划</a-link
                  >
                  <!-- <a-link @click="createTaskPayOrderJumpThisSphId"
                    >跳过该账号计划</a-link
                  > -->
                </a-space>
              </a-space>
            </a-card>
          </a-spin>
          <div class="tipsWords"
            >移动到
            <icon-exclamation-circle-fill /> 按钮，可查看计划创建失败原因</div
          >
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, toRefs } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { sphInfo } from '@/api/sph';
  import { getOrderDetail, taskUpdate } from '@/api/live';
  import { useI18n } from 'vue-i18n';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import { useRouter } from 'vue-router';
  import QrcodeVue from 'qrcode.vue';
  import _ from 'lodash';
  import { taskLiveGrid, liveTaskDeleted } from '@/api/plant';
  import { taskInfo, plantGrid } from '@/api/live-plant';
  import {
    taskStatus,
    enumToObject,
    plantStatus,
    createStatus,
    plantLiveStatus,
  } from '@/utils/enum';
  import LoginSphModal from './components/login-sph-modal.vue';

  const loginSphModal = ref<InstanceType<typeof LoginSphModal>>();

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
    x: '150%',
  };
  const bgcolor = '#F7F9FF';
  const formRef = ref<FormInstance>();
  // 创建计划
  const createTaskId = ref<any>(0);
  const createdGetPlantReqVisable = ref(true);
  const createTaskPayOrderList = ref<any>([]);
  const createOrderDisabled = ref(false);
  const createTaskPayOrderIndex = ref(0);
  const createdGetInfoReqVisable = ref(true);
  const createdPlantTimer = ref<any>();
  const createdOrderTimer = ref<any>();
  const createTaskOrderLoading = ref(false);
  const createTaskPayLoading = ref(false);
  const createTaskPayTips = ref('正在创建支付订单');
  const createPagination = ref({ current: 1, pageSize: 10, chengeNum: 0 });
  const waitQrcodeTips = ref('');
  const createOverPayVisible = ref(false);
  const createTaskOrderList = ref<any>([]);
  const selectedKeys = ref<any>([]);
  const createTaskOrderInfoModel = () => {
    return {
      total: 0,
      success: 0,
      error: 0,
      overPay: 0,
    };
  };
  const createTaskOrderInfo = ref(createTaskOrderInfoModel());

  const { loading, setLoading } = useLoading(true);
  const visible = ref(false);
  const editForm = reactive({
    taskRemark: '',
    taskId: undefined,
  });
  const handleClick = (row: any) => {
    editForm.taskId = row.taskId;
    editForm.taskRemark = row.taskRemark || '';

    visible.value = true;
  };
  const handlBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    const { data } = await taskUpdate(editForm);
    Message.success('备注投放记录成功');
    search();
    window.setTimeout(() => {
      done();
    }, 300);
  };
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
  const createdOrderTimerClear = (ok?: boolean) => {
    createdGetPlantReqVisable.value = true;
    createdGetInfoReqVisable.value = true;
    clearInterval(createdPlantTimer.value);
    clearInterval(createdOrderTimer.value);
    if (ok) {
      return;
    }
    setTimeout(() => {
      // eslint-disable-next-line no-use-before-define
      createdGetPlant();
    }, 2500);
  };
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await taskLiveGrid(params);
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
  const checkSphStatus = async (item: any) => {
    console.log(item);
    let sphIdArr: any = item.map((e: any) => {
      return e.sphId;
    });
    // 去重
    sphIdArr = [...new Set(sphIdArr)];
    // sphInfo接口可以换成 用来检查是否登录的接口
    const { data } = await sphInfo({
      sphId: sphIdArr,
    });
    // return 一个Promise对象
    return new Promise((resolve, reject) => {
      let flag = false;
      // 我这里需要循环是因为 接口返回的是数组所以需要依次判断状态 状态为2就reject 否则 resolve 出去
      // 可以改成账号已离线reject 否则 resolve出去
      // eslint-disable-next-line no-plusplus, no-unreachable-loop
      for (let i = 0; i < data.grid.length; i++) {
        console.log(i);

        if (data.grid[i].sphStatus === 2) {
          flag = true;
          break;
        }
      }
      if (flag) {
        reject(data);
      } else {
        resolve(data);
      }
    });
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

  const jumpPlantData = (id: any) => {
    router.push({
      name: 'plantliveData',
      query: {
        taskId: id,
      },
    });
  };
  const createdGetPlant = async () => {
    if (createdGetPlantReqVisable.value) {
      return;
    }
    if (createTaskId.value === 0) {
      return;
    }
    createdGetPlantReqVisable.value = true;
    createOverPayVisible.value = true;
    const { data } = await plantGrid({
      taskIds: `${createTaskId.value}`,
      pageIndex: 1,
      pageSize: 110,
      startDate: '2023-01-01',
      endDate: '2128-01-01',
    });
    createTaskOrderList.value = data.grid;
    createTaskOrderInfo.value = createTaskOrderInfoModel();
    createTaskOrderInfo.value.total = data.total;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < createTaskOrderList.value.length; i++) {
      const el = createTaskOrderList.value[i];
      switch (el.createStatus) {
        case 1:
          createTaskOrderInfo.value.success += 1;
          break;
        case 3:
          createTaskOrderInfo.value.error += 1;
          break;
        default:
          break;
      }

      if (el.plantStatus === 10 && el.createStatus === 1) {
        if (
          _.findIndex(createTaskPayOrderList.value, [
            'plantCode',
            el.plantCode,
          ]) === -1
        ) {
          let corproateId = 'undefined';
          if (el.sphInfo.sphUserType === 3) {
            corproateId = el.sphInfo.sphUniqid;
          }
          createTaskPayOrderList.value.push({
            plantName: el.plantName,
            plantCode: el.plantCode,
            sphId: el.sphId,
            index: i,

            qrCodeVal: `https://channels.weixin.qq.com/promote/pages/mobile_pay?promotionId=${el.plantCode}&type=live&userType=${el.sphInfo.sphUserType}&corproateId=${corproateId}`,
          });
        }
      }
      if (el.plantStatus === 1 || el.plantStatus === 4) {
        createTaskOrderInfo.value.overPay += 1;
      }
    }

    createTaskOrderLoading.value = false;
    createdGetPlantReqVisable.value = false;
    if (createTaskPayOrderList.value.length === 1) {
      selectedKeys.value = [
        createTaskOrderList.value[
          _.findIndex(createTaskOrderList.value, [
            'plantCode',
            createTaskPayOrderList.value[0].plantCode,
          ])
        ].plantCode,
      ];
    }
    if (
      createTaskOrderInfo.value.total ===
        createTaskOrderInfo.value.success + createTaskOrderInfo.value.error &&
      createTaskOrderInfo.value.success === createTaskOrderInfo.value.overPay
    ) {
      createdOrderTimerClear();
      console.log('3支付完成');

      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
      // Message.success('订单创建完成，可前往投放数据查看计划');
      return;
    }

    if (
      createTaskPayOrderIndex.value > 0 &&
      !createTaskPayOrderList.value[createTaskPayOrderIndex.value]
    ) {
      console.log('4支付完成');
      if (
        createTaskPayOrderList.value.length === createTaskOrderList.value.length
      ) {
        createdOrderTimerClear();

        createTaskPayLoading.value = true;
        createTaskPayTips.value = '当前订单已全部支付完成';
        waitQrcodeTips.value = '当前订单已全部支付完成';
        // Message.success('订单创建完成，可前往投放数据查看计划');

        return;
      }
    }
    if (
      createTaskOrderInfo.value.total !==
      createTaskOrderInfo.value.success + createTaskOrderInfo.value.error
    ) {
      setTimeout(() => {
        createdGetPlant();
      }, 1500);
    }
    if (
      createTaskOrderInfo.value.success !== createTaskOrderInfo.value.overPay
    ) {
      setTimeout(() => {
        createdGetPlant();
      }, 1500);
    }

    if (createTaskPayOrderList.value.length > 0) {
      // createTaskPayLoading.value = false;
      console.log('关闭spin');
      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        createTaskPayLoading.value = true;
      } else {
        createTaskPayLoading.value = false;
      }
      if (waitQrcodeTips.value === '') {
        waitQrcodeTips.value = '等待支付中……';
      }
    }
  };
  const numF = (num: any) => {
    num = Number(num) / 100;
    return num;
  };
  // 跳过该计划
  const createTaskPayOrderJumpThis = () => {
    // 如果可支付列表长度大于0
    if (createTaskPayOrderList.value.length > 0) {
      // 判断可支付列表内是否含有创建失败的订单
      // const nullArr = getTruthyIndexes(
      //   JSON.parse(JSON.stringify(createTaskPayOrderList.value))
      // );
      if (
        !createTaskPayOrderList.value[createTaskPayOrderIndex.value + 1] &&
        createTaskOrderInfo.value.success + createTaskOrderInfo.value.error !==
          createTaskOrderList.value.length
      ) {
        return;
      }

      // createTaskPayLoading.value = true;
      createTaskPayOrderIndex.value += 1;
      waitQrcodeTips.value = '切换成功，请进行支付….';

      // 判断当前下标是否适合翻页
      if (
        createTaskPayOrderList.value[createTaskPayOrderIndex.value] &&
        Number(
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].index
        ) %
          10 ===
          0
      ) {
        createPagination.value.current += 1;
        //   createPagination.value.chengeNum = createTaskOrderInfo.value.overPay;
      }

      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        selectedKeys.value = [];
        if (
          createTaskOrderInfo.value.success +
            createTaskOrderInfo.value.error ===
          createTaskOrderList.value.length
        ) {
          createdOrderTimerClear();
          selectedKeys.value = [];
          createTaskPayLoading.value = true;
          createTaskPayTips.value = '当前订单已全部支付完成';
          waitQrcodeTips.value = '当前订单已全部支付完成';
          Message.success('订单已全部支付完成');
        }
      } else {
        selectedKeys.value = [
          createTaskOrderList.value[
            _.findIndex(createTaskOrderList.value, [
              'plantCode',
              createTaskPayOrderList.value[createTaskPayOrderIndex.value]
                .plantCode,
            ])
          ].plantCode,
        ];
        const createTaskOrderIndex: any =
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].index;
        if (
          [2, 5].includes(
            createTaskOrderList.value[createTaskOrderIndex].plantStatus
          )
        ) {
          createTaskPayLoading.value = true;
          waitQrcodeTips.value = '当前订单已支付完成';
          createTaskPayTips.value = '当前订单支付完成，请勿重复操作';
          // return;
        } else {
          waitQrcodeTips.value = '切换成功，请进行支付….';
          createTaskPayLoading.value = false;
          createTaskPayTips.value = '';
        }
      }
    } else {
      createdOrderTimerClear();
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
      Message.success('订单已全部支付完成');
    }
  };
  const rowClick = (event) => {
    if (createTaskPayOrderList.value.length > 0) {
      if (
        _.findIndex(createTaskPayOrderList.value, [
          'plantCode',
          event.plantCode,
        ]) !== -1
      ) {
        if ([2, 5].includes(Number(event.plantStatus))) {
          createTaskPayLoading.value = true;
          waitQrcodeTips.value = '当前订单已支付完成';
          createTaskPayTips.value = '当前订单支付完成，请勿重复操作';
          // return;
        } else {
          waitQrcodeTips.value = '切换成功，请进行支付….';
          createTaskPayLoading.value = false;
          createTaskPayTips.value = '';
        }
        createTaskPayOrderIndex.value = _.findIndex(
          createTaskPayOrderList.value,
          ['plantCode', event.plantCode]
        );
        selectedKeys.value = [event.plantCode];
        if (![2, 5].includes(Number(event.plantStatus))) {
          createOrderDetailCheck();
        }
      } else {
        if (event.plantCode !== '0') {
          selectedKeys.value = [event.plantCode];
        } else {
          selectedKeys.value = [];
        }
        createTaskPayLoading.value = true;
        waitQrcodeTips.value = '计划创建失败，无法支付';
      }
    }
  };
  const createPaginationChange = async (page: any) => {
    createPagination.value.current = page;
  };
  const createOrderDetailCheck = async () => {
    if (createTaskPayOrderList.value.length > 0) {
      if (createdGetInfoReqVisable.value) {
        return;
      }

      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        return;
      }

      createdGetInfoReqVisable.value = true;
      const { plantCode } =
        createTaskPayOrderList.value[createTaskPayOrderIndex.value];
      const { data } = await getOrderDetail({
        sphId:
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].sphId,
        promotionId:
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].plantCode,
      });
      createdGetInfoReqVisable.value = false;
      if (data) {
        if (
          Number(data.data.order.orderInfo.status) === 5 ||
          Number(data.data.order.orderInfo.status) === 2
        ) {
          createdGetPlant();
          waitQrcodeTips.value = '支付完成，正在切换下个订单….';
          Message.success('支付完成，请支付下一个订单');
          // setTimeout(() => {

          createTaskPayOrderIndex.value += 1;
          // 判断当前下标是否适合翻页
          if (
            createTaskPayOrderList.value[createTaskPayOrderIndex.value] &&
            Number(
              createTaskPayOrderList.value[createTaskPayOrderIndex.value].index
            ) %
              10 ===
              0
          ) {
            createPagination.value.current += 1;
            //   createPagination.value.chengeNum = createTaskOrderInfo.value.overPay;
          }
          // 更换选中内容
          if (createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
            const index = _.findIndex(createTaskOrderList.value, [
              'plantCode',
              createTaskPayOrderList.value[createTaskPayOrderIndex.value]
                .plantCode,
            ]);
            selectedKeys.value = [createTaskOrderList.value[index].plantCode];
          } else {
            selectedKeys.value = [];
            // setTimeout(() => {
            //   findSelectedKeys();
            // }, 1000);
          }
          // const nextPlantStatus = Number(
          //   createTaskOrderList.value[createTaskPayOrderIndex.value].plantStatus
          // );

          // if (nextPlantStatus === 2 || nextPlantStatus === 5) {
          //   waitQrcodeTips.value = '当前订单已支付完成';
          //   return;
          // }
          waitQrcodeTips.value = '切换成功，请进行支付….';
          // }, 1500);
        }
      }
    }
    if (
      createTaskOrderInfo.value.success + createTaskOrderInfo.value.error ===
        createTaskOrderList.value.overPay &&
      createTaskOrderInfo.value.success === createTaskOrderInfo.value.overPay
    ) {
      createdOrderTimerClear();
      selectedKeys.value = [];
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
      Message.success('订单已全部支付完成');
      return;
    }
    setTimeout(createOrderDetailCheck, 1400);
  };
  const payTask = async (row: any) => {
    checkSphStatus([row])
      .then((res) => {
        createTaskId.value = row.taskId;
        setTimeout(() => {
          createOrderDisabled.value = false;
        }, 5000);
        createdGetPlantReqVisable.value = false;
        createdGetInfoReqVisable.value = false;
        createTaskOrderLoading.value = true;
        createTaskPayLoading.value = true;
        createTaskPayOrderIndex.value = 0;
        createTaskPayOrderList.value = [];
        createTaskPayTips.value = '正在创建支付订单';
        waitQrcodeTips.value = '';

        createPagination.value.current = 1;
        createPagination.value.chengeNum = 0;

        createdGetPlant();
        createOrderDetailCheck();
      })
      .catch((err: any) => {
        const sphNameArr = err.grid.map((e: any) => {
          return e.sphName;
        });
        search();
        loginSphModal.value?.showModel(sphNameArr);
      });
  };
  // eslint-disable-next-line consistent-return
  const jumpTask = async (row: any) => {
    // if (row.exportPlantCode.includes(row.plantName)) {
    //   return Message.info('同步官方创建的计划暂不支持复投');
    // }
    if (!row.taskId) {
      return Message.info('暂不支持复投。');
    }
    const { data } = await taskInfo({ taskId: row.taskId });
    data.reqJson = JSON.parse(data.reqJson);
    data.reqJson.createTaskBefore = 0;
    data.reqJson = JSON.stringify(data.reqJson);
    console.log(JSON.stringify(data.reqJson), 'JSON.stringify(data.reqJson)');

    localStorage.setItem('createLivePlant', data.reqJson);

    router.push({
      name: 'createlivePlant',
    });
  };
  const handleClickDelete = async (row: any) => {
    const { data, code } = await liveTaskDeleted({ taskId: row.taskId });
    if (code === 200) {
      Message.success('删除成功');
      search();
    }
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
  // .arco-row-align-start {
  //   align-items: center;
  // }
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
  .qrcodeBox {
    position: relative;
    width: 220px;
    height: 220px;
    .qrcodePayMark {
      position: absolute;
      top: 0;
      left: 0;
      width: 220px;
      height: 220px;
      z-index: 99;
      background: #ffffffc6;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .tableBox {
    :deep(.arco-table-tr-checked) {
      .arco-table-td {
        background: rgb(201, 205, 212);
      }
    }
    :deep(.arco-table-tr) {
      cursor: pointer;
    }
  }
</style>
