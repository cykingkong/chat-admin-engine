<template>
  <div class="container">
    <div class="upai_pageTitle"> 智能监控 </div>
    <a-row :gutter="24" align="start">
      <a-col flex="auto">
        <div class="upai_content_outsideBox">
          <a-table
            row-key="id"
            :pagination="false"
            :loading="loading"
            :data="renderData"
            :scroll="scroll"
            :hoverable="true"
            :stripe="false"
            :bordered="false"
            @page-change="onPageChange"
          >
            <template #columns>
              <a-table-column title="操作人" align="center">
                <template #cell="{ record }">{{
                  record.memberUserInfo
                    ? record.memberUserInfo.memberAccount
                    : '-'
                }}</template>
              </a-table-column>
              <a-table-column title="所属部门" align="center">
                <template #cell="{ record }">{{
                  record.deptName ? record.deptName : '-'
                }}</template>
              </a-table-column>

              <a-table-column title="操作类型" align="center">
                <template #cell="{ record }">
                  <a-tag color="arcoblue">
                    {{ record.logType ? logType[record.logType] : '-' }}
                  </a-tag>
                </template>
              </a-table-column>

              <a-table-column title="操作详情" align="center" width="200">
                <template #cell="{ record }">
                  <a-typography-paragraph
                    :ellipsis="{
                      rows: 1,
                      showTooltip: true,
                    }"
                    style="margin-bottom: 0"
                  >
                    {{ record.logMsg ? record.logMsg : '-' }}
                  </a-typography-paragraph>
                </template>
              </a-table-column>
              <a-table-column title="操作时间" align="center">
                <template #cell="{ record }">{{
                  record.createdAt ? record.createdAt : '-'
                }}</template>
              </a-table-column>
              <!-- <a-table-column title="备注" align="center">
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
        </div>
      </a-col>
      <a-col flex="239px">
        <a-space direction="vertical" :size="24" style="width: 100%">
          <div class="upai_content_outsideBox">
            <div class="upai_titleLi" style="margin-bottom: 22px">
              <span class="borderLeft"></span>
              提示消息配置
            </div>
            <div v-for="(item, key) in notice" :key="key" class="switchBox">
              <a-tooltip
                v-if="item.disabled"
                :content="`${levelName}无开启权限，请联系客服升级`"
              >
                <div
                  class="label"
                  :style="{ color: item.disabled ? '#777' : '#000' }"
                >
                  {{ item.title }}
                </div>
              </a-tooltip>
              <div
                v-else
                class="label"
                :style="{ color: item.disabled ? '#777' : '#000' }"
              >
                {{ item.title }}
              </div>
              <a-popconfirm
                :content="`确认是否修改${item.title}状态`"
                @ok="submitMsgStatus"
                @cancel="
                  () => {
                    console.log('没有修改');
                  }
                "
                @popup-visible-change="onPopupVisibleChange"
              >
                <a-switch
                  v-model="item.select"
                  :disabled="item.disabled"
                  :checked-value="true"
                  :unchecked-value="false"
                />
              </a-popconfirm>
            </div>
            <!-- <a-checkbox-group
              :default-value="[1]"
              direction="vertical"
              style="width: 100%"
              :value="memberMsgArr"
            >
              <a-checkbox :value="1">
                <template #checkbox>
                  <div class="switchBox">
                    <div class="label"> 账号离线通知</div>
                    <a-switch :checked-value="true" :unchecked-value="false" />
                  </div>
                </template>
              </a-checkbox>
              <a-checkbox value="2">
                <template #checkbox="{ checked }">
                  <div class="switchBox">
                    <div class="label"> 计划关停通知</div>
                    <a-switch :value="checked" />
                  </div>
                </template>
              </a-checkbox>
              <a-checkbox value="3">
                <template #checkbox="{ checked }">
                  <div class="switchBox">
                    <div class="label"> 商品爆单通知</div>
                    <a-switch
                      :value="checked"
                      checked-value="true"
                      unchecked-value="false"
                    />
                  </div>
                </template>
              </a-checkbox>
              <a-checkbox value="4">
                <template #checkbox="{ checked }">
                  <div class="switchBox">
                    <div class="label"> 异常关停处理</div>
                    <a-switch
                      :value="checked"
                      checked-value="true"
                      unchecked-value="false"
                    />
                  </div>
                </template>
              </a-checkbox>
            </a-checkbox-group> -->
          </div>
          <div class="upai_content_outsideBox">
            <a-row
              justify="space-between"
              align="center"
              style="margin-bottom: 22px"
            >
              <a-col flex="90px">
                <div class="upai_titleLi">
                  <span class="borderLeft"></span>
                  公众号提醒
                </div>
              </a-col>
              <a-col flex="40px">
                <a-popconfirm
                  :content="`确认是否关闭公众号提醒`"
                  @ok="submitGZH"
                  @cancel="getUser"
                >
                  <a-switch
                    v-model="gzhMsgSwitch"
                    :checked-value="1"
                    :unchecked-value="0"
                  />
                </a-popconfirm>
              </a-col>
            </a-row>

            <a-space style="width: 100%" direction="vertical" align="center">
              <!-- <img
                src="https://img.adyinqing.com/upai_shop/9z72md5z1688116301208"
                alt=""
                class="gzhEwm"
              /> -->
              <div class="qrcodeBorder">
                <QrcodeVue
                  v-if="qrcodeValue"
                  :value="qrcodeValue"
                  :size="140"
                  level="H"
                />
              </div>

              <a-button type="primary" size="small">
                扫码关注 开启公众号提醒
              </a-button>
            </a-space>
          </div>
        </a-space>
      </a-col>
    </a-row>
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
    logType,
  } from '@/utils/enum';
  import { getUserInfo, updateUser, memberMsgEdit } from '@/api/user';
  import { useUserStore } from '@/store/index';
  import {
    shareUpdate,
    shareGrid,
    getGetGzhQrCode,
    logGrid,
  } from '@/api/member';

  import copy from '@/utils/copy';
  import { forEach } from 'lodash';

  const qrcodeValue = ref('');
  const qrcodeToken = ref('');
  const userStore = useUserStore();
  console.log(userStore.$state, 'userStore');
  const baseHerfUrl = import.meta.env.VITE_API_BASE_HERF_URL;
  const authKey = ref('');
  const shareLink = ref('');
  const gzhMsgSwitch = ref();
  getUserInfo().then((res) => {
    shareLink.value = res.data.shareLink;
    authKey.value = res.data.authKey;
    gzhMsgSwitch.value = res.data.userInfo.gzhMsgSwitch;
    console.log(res, gzhMsgSwitch.value);
  });
  const generateFormModel = () => {
    return {};
  };
  const getQrcodeUrl = () => {
    return new Promise((reslove) => {
      getGetGzhQrCode().then((response) => {
        reslove(response.data);
      });
    });
  };
  const copyLink = () => {
    copy(`【魔力智投】
  视频号微信豆、智能投放工具，让你轻松突破ROI瓶颈~

  ${shareLink.value}
  -------
  点击立即领取7天免费试用`);
    Message.success('复制成功');
  };
  const scroll = {};
  const router = useRouter();

  const formVisible = ref(false);
  const tableVisible = ref(false);
  const tableData = ref<any[]>([]);
  const showQrcodeVisible = ref(false);
  const refundVisible = ref(false);
  const tableHeaderArr = ref<any[]>([]);

  const sphCode = ref('');

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
  getQrcodeUrl().then((res: any) => {
    console.log(res.url);
    qrcodeValue.value = res.url;
  });
  const sphInputFiled = ref({
    remark: '备注',
  });

  const changeA = () => {
    console.log(notice);
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
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
  const memberMsgArr = ref([]);
  // 通知
  const notice = reactive([
    {
      title: '账号离线通知',
      Key: '1',
      k: '0',
      select: false,
      disabled: true,
    },
    {
      title: '商品爆单通知',
      Key: '2',
      k: '0',
      select: false,
      disabled: true,
    },
    {
      title: '计划关停通知',
      Key: '3',
      k: '0',
      select: false,

      disabled: true,
    },
    {
      title: '异常关停通知',
      Key: '4',
      k: '0',
      select: false,
      disabled: true,
    },
  ]);
  const levelName = ref();
  const memberDepId = ref();
  const getUser = async () => {
    const { data } = await getUserInfo();
    authKey.value = data.authKey;
    gzhMsgSwitch.value = data.userInfo.gzhMsgSwitch;
    levelName.value = data.levelName;
    memberDepId.value = data.userInfo.memberDepId;
    memberMsgArr.value = data.userInfo.memberDepId
      ? data.userInfo.memberMsg.split(',')
      : data.memberMsg.split(',') || [];
    // levelMemberMsg会员等级所能开启的权限
    const levelMemberMsgArr = data.levelMemberMsg.split(',') || [];
    notice.forEach((e: any, key) => {
      e.k = memberMsgArr.value.includes(`${e.Key}`) ? data.memberMsg[key] : 0;
      e.select = memberMsgArr.value.includes(`${e.Key}`);
      if (levelMemberMsgArr.length) {
        levelMemberMsgArr.forEach((el: any) => {
          if (el === e.Key) {
            e.disabled = false;
          }
        });
      }

      // // levelId 0体验卡  1月卡 2年卡 3季卡 4黑卡 6半年卡
      // switch (data.levelId) {
      //   case 0:
      //     e.disabled = true;
      //     break;
      //   case 1:
      //     e.disabled = true;
      //     break;

      //   case 3:
      //     e.disabled = false;
      //     if (e.Key !== '1') {
      //       e.disabled = true;
      //     }
      //     break;
      //   case 6:
      //     e.disabled = false;
      //     if (e.Key === '4') {
      //       e.disabled = true;
      //     }
      //     break;
      //   default:
      //     e.disabled = false;

      //     break;
      // }
    });

    // editSafeModel.value = _.cloneDeep({
    //   merchantUserId: data.merchantUserId,
    //   merchantUserPassword: '',
    //   merchantUserRealName: data.merchantUserRealName,
    //   merchantUserPhone: data.merchantUserPhone,
    // });
    // console.log(infoArr.value);
  };
  const submitMsgStatus = async () => {
    const str: any = [];
    notice.forEach((e) => {
      if (e.select) str.push(e.Key);
    });
    console.log(str);

    const { data } = await memberMsgEdit({ memberMsg: str.join(',') });
    // if (data) {
    //   getUser();
    // }
  };
  const submitGZH = async () => {
    const { data } = await updateUser({ gzhMsgSwitch: gzhMsgSwitch.value });
    if (data) {
      getUser();
    }
  };

  getUser();
  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await logGrid(params);

      renderData.value = data.grid.map((e) => {
        if (e.memberDepId === 0) {
          e.deptName = '-';
        }
        return e;
      });
      // console.log(renderData.value, userStore.$state.userInfo.memberDepId);
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
  const onPopupVisibleChange = (visible: any) => {
    console.log(visible);
    if (!visible) {
      setTimeout(() => {
        getUser();
      }, 200);
    }
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
    padding: 48px;
    background: #f7f9ff;
    .upai_pageTitle {
      font-size: 28px;

      font-weight: bold;
      color: #2d2d2d;
      margin-bottom: 24px;
    }
    .upai_content_outsideBox {
      padding: 24px;
      width: 100%;
      min-height: 226px;
      background: #fafbff;
      box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.04);
      border-radius: 8px 8px 8px 8px;
      .gzhEwm {
        width: 150px;
        height: 150px;
        margin: 0 auto;
      }
      .upai_titleLi {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        .borderLeft {
          width: 4px;
          height: 14px;
          background: linear-gradient(359deg, #1059f5 0%, #6495ff 100%);
          border-radius: 8px;
          margin-right: 4px;
        }
      }
      .switchBox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        .label {
          font-size: 16px;

          font-weight: 500;
          color: #000000;
        }
      }
    }
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
  .qrcodeBorder {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 2px solid #1059f5;
  }
</style>
