<template>
  <div class="container">
    <!-- <Breadcrumb :items="['视频号管理', '账号列表']" /> -->
    <!-- <div class="pageTitle"> 视频号账号列表 </div> -->
    <a-row>
      <a-card class="general-card-upai" style="width: 100%">
        <a-col :flex="1">
          <a-form :model="formModel" auto-label-width label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="sphName">
                  <template #label>
                    <div class="labelText">名称搜索：</div>
                  </template>
                  <a-input
                    v-model="formModel.sphName"
                    placeholder="请输入视频号名称"
                    allow-clear
                    @press-enter="search"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="sphStatus">
                  <template #label>
                    <div class="labelText">在线状态：</div>
                  </template>
                  <a-select
                    v-model="formModel.sphStatus"
                    placeholder="请选择在线状态"
                  >
                    <a-option
                      v-for="(item, key) in enumToObject(sphStatus)"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    />
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="useStatus">
                  <template #label>
                    <div class="labelText"
                      ><a-space :size="0">
                        使用状态：
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p>使用中：表示该账号有加热中的计划 </p>
                            <p
                              >空闲中：表示该账号暂无建立计划或涉及的计划都已完成/已结束</p
                            >
                          </template>
                        </a-tooltip>
                      </a-space></div
                    >
                  </template>
                  <a-select
                    v-model="formModel.useStatus"
                    placeholder="请选择使用状态"
                  >
                    <a-option
                      v-for="(item, key) in enumToObject(useStatus)"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    />
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="sphStatus">
                  <template #label>
                    <div class="labelText">
                      <a-space :size="0">
                        视频号类型：
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p
                              >账号类型
                              投放号：此类型为负责建立计划以及付款的视频号</p
                            >
                            <p>被投号：此类型为发布素材以及被加热的视频号</p>
                            <p>同个号：加热本账号的视频素材时可设置为该类型</p>
                          </template>
                        </a-tooltip>
                      </a-space>
                    </div>
                  </template>
                  <a-select
                    v-model="formModel.sphType"
                    placeholder="请选择视频号类型"
                  >
                    <a-option
                      v-for="(item, key) in enumToObject(sphType)"
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
                    <a-button type="primary" class="searchBtn" @click="search">
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
      </a-card>
    </a-row>

    <a-card class="general-card-upai" style="width: 100%; padding-bottom: 32px">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1, {}, true)">
              <template #icon>
                <icon-plus />
              </template>
              添加加热平台账号
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
        :scroll="scroll"
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
          <a-table-column title="账号类型" align="center" :width="120">
            <template #cell="{ record }">
              <a-tag color="arcoblue">
                {{ sphType[record.sphType] }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="在线状态" align="center" :width="120">
            <template #cell="{ record }">
              <a-tag :color="sphStatusTagColor[record.sphStatus]">
                {{ sphStatus[record.sphStatus] }}
              </a-tag>
            </template>
          </a-table-column>

          <a-table-column title="使用状态" align="center" :width="120">
            <template #cell="{ record }"
              >{{ useStatus[record.useStatus] }}
            </template>
          </a-table-column>
          <a-table-column title="账号余额" align="center" :width="120">
            <template #cell="{ record }">{{ record.sphBalance }}</template>
          </a-table-column>

          <a-table-column align="center" :width="130">
            <template #title>
              <a-space :size="4">
                离线倒计时
                <a-tooltip content="This is tooltip content">
                  <icon-question-circle-fill />

                  <template #content>
                    <p
                      >账号登陆时效为6.5小时(加热平台官方定义的规则)，掉线会导致账号相应数据/操作都无法获取生效</p
                    >
                  </template>
                </a-tooltip>
              </a-space>
            </template>
            <template #cell="{ record }">
              <a-countdown
                v-if="
                  Date.now() < dayjs(record.sphLeaveAt).valueOf() &&
                  record.sphStatus === 1
                "
                :value="dayjs(record.sphLeaveAt).valueOf()"
                :now="Date.now()"
              />
              <span v-else> 已离线 </span>
            </template>
          </a-table-column>

          <a-table-column title="登录时间" align="center">
            <template #cell="{ record }">{{ record.sphLoginAt }}</template>
          </a-table-column>
          <a-table-column title="备注名称" align="center">
            <template #cell="{ record }">{{ record.sphRemark }}</template>
          </a-table-column>
          <a-table-column
            align="center"
            title="操作"
            data-index="operations"
            fixed="right"
            :width="280"
          >
            <template #cell="{ record }">
              <a-space direction="vertical">
                <a-space>
                  <a-button
                    type="text"
                    size="small"
                    @click="handleClick(1, {}, undefined)"
                  >
                    重新登录
                  </a-button>
                  <a-button
                    type="text"
                    size="small"
                    status="success"
                    @click="handleLoginChannel(record)"
                  >
                    分身登录
                  </a-button>
                  <a-tooltip>
                    <a-button
                      type="text"
                      size="small"
                      @click="handleClickSync(record)"
                    >
                      <a-space>
                        同步数据 <icon-question-circle-fill />
                      </a-space>
                    </a-button>
                    <template #content>
                      <p>手动更新当前计划的相关数据，系统默认1分钟更新1次 </p>
                    </template>
                  </a-tooltip>
                </a-space>
                <a-space>
                  <a-button
                    type="text"
                    size="small"
                    @click="handleClick(2, record)"
                  >
                    修改
                  </a-button>
                  <a-popconfirm
                    content="即将解除该视频号的绑定，请确认是否删除？"
                    ok-text="确认解除"
                    @ok="handleClickDel(record.sphId)"
                  >
                    <a-button type="text" status="danger">解除绑定</a-button>
                  </a-popconfirm>
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
      <template #title> 添加加热平台账号</template>
      <a-card class="general-card">
        <a-space :size="16" direction="vertical" fill>
          <a-space direction="vertical" fill align="center">
            <div class="qrCodeBox">
              <QrcodeVue :value="qrcodeValue" :size="200" level="H" />

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
            </div>

            <a-tag color="green">请用微信APP扫描二维码</a-tag>
          </a-space>
          <!-- <a-checkbox v-model="asyncChecked" class="ty" @change="checkChange">
            <template #checkbox="{ checked }">
              <a-space>
                <img
                  v-if="checked"
                  src="https://img.adyinqing.com/upai_shop/gwg1cua61689748379160"
                  alt=""
                  class="checkIcon"
                />
                <img
                  v-else
                  src="https://img.adyinqing.com/upai_shop/a9jd4arn1689748379159"
                  alt=""
                  class="checkIcon"
                />
                <a-typography-text>
                  登录投放号，魔力系统会自动同步近30天的计划数据
                </a-typography-text>
              </a-space>

            </template>
          </a-checkbox> -->
        </a-space>
      </a-card>
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

        <a-form-item
          field="sphType"
          label="视频号类型"
          :rules="[
            {
              required: true,
              message: '请选择视频号类型',
            },
          ]"
        >
          <a-select v-model="editModel.sphType" placeholder="请选择视频号类型">
            <a-option
              v-for="(item, key) in enumToObject(sphType)"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="syncVisible"
      title=""
      @cancel="handleCancel"
      @before-ok="handleBeforeSendSync"
    >
      <template #title>
        请选择数据同步的时间<a-typography-text type="secondary">
          （预计1小时内，同步完成）
        </a-typography-text>
      </template>
      <a-form
        :model="reqModel"
        label-align="left"
        auto-label-width
        layout="horizontal"
      >
        <a-form-item label="" label-col-flex="60px">
          <a-radio-group v-model="reqModel.days" :default-value="1">
            <!-- <a-radio :value="1">
              <template #radio="{ checked }">
                <a-tag :checked="checked" color="arcoblue" checkable
                  >当日</a-tag
                >
              </template>
            </a-radio>
            <a-radio :value="2">
              <template #radio="{ checked }">
                <a-tag :checked="checked" color="arcoblue" checkable
                  >近2天</a-tag
                >
              </template>
            </a-radio>
            <a-radio :value="3">
              <template #radio="{ checked }">
                <a-tag :checked="checked" color="arcoblue" checkable
                  >近3天</a-tag
                >
              </template>
            </a-radio> -->
            <a-radio :value="1">当日</a-radio>
            <a-radio :value="2">近2天</a-radio>
            <a-radio :value="3">近3天</a-radio>
            <a-radio :value="30">近30天</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="" label-col-flex="60px">
          <a-radio-group v-model="reqModel.syncType" :default-value="1">
            <a-radio :value="1">短视频</a-radio>
            <a-radio :value="2">直播间</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="moliExtVisible"
      :simple="false"
      :footer="false"
      :mask-closable="false"
    >
      <template #title> 请安装Chrome扩展，[魔力智投] 扩展 </template>
      <a-typography>
        <a-typography-paragraph>
          <ul>
            <li> 仅支持谷歌浏览器（chrome）使用</li>
            <li> 没有此插件无法使用【分身登录】功能</li>
            <li> 安装完成后，请刷新本页面</li>
          </ul>
        </a-typography-paragraph>
        <a-typography-paragraph style="text-align: center">
          <a-button type="primary" shape="round" @click="jumpTuDown"
            >安装向导</a-button
          >
        </a-typography-paragraph>
      </a-typography>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import {
    getQrcode,
    getQrcodeStatus,
    sphEdit,
    sphGrid,
    deleteSphBind,
  } from '@/api/sph';
  import dayjs from 'dayjs';
  import QrcodeVue from 'qrcode.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Pagination } from '@/types/global';
  import { sphType, sphStatus, useStatus, enumToObject } from '@/utils/enum';
  import { useUserStore } from '@/store/index';
  import { asyncAllData, asyncLiveAllData } from '@/api/plant';

  const userStore = useUserStore();

  const generateFormModel = () => {
    return {};
  };
  const scroll = {
    x: 1400,
    y: 500,
  };
  const router = useRouter();
  const reqModel = reactive({
    sphId: undefined,
    days: 1,
    syncType: 1,
    auto: 2,
  });
  const formVisible = ref(false);
  const syncVisible = ref(false);
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
  const asyncChecked = ref(true);
  const checkChange = (ev) => {
    console.log(ev);
    asyncChecked.value = ev;
  };
  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await sphGrid(params);

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

  const moliExtVisible = ref(false);

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
    const qrRes = await getQrcodeStatus({ token: qrcodeToken.value }).catch(
      (err) => {
        showQrcodeVisible.value = false;
        qrcodeScan.value = false;

        search();
        clearInterval(timer.value);
        timer.value = null;
      }
    );

    getQrcodeReqStatus.value = false;

    if (qrRes.data.status === 5) {
      qrcodeScan.value = true;
    }
    if (qrRes.data.status === 1) {
      Message.success({
        content: '登录成功',
        duration: 5 * 1000,
      });
      // if (asyncChecked.value) {
      //   await asyncAllData({ sphId: qrRes.data.sphId, syncType: 1, days: 30 });
      // }

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
  const handleLoginChannel = (row: any) => {
    if (row.sphStatus !== 1) {
      Message.info('当前账号已离线,请尝试重新登录');
      return;
    }

    if (Number(document.getElementById('moliExt').value) !== 1) {
      moliExtVisible.value = true;
      return;
    }

    let cookie = row.sphCookie;
    cookie = cookie.replace('promotewebsessionid=', '');
    window.open(
      `https://channels.weixin.qq.com/login.html?promoteWebSessionIdwx=${cookie}`
    );
  };

  const jumpTuDown = () => {
    window.open(
      `https://e601wcqokc.feishu.cn/docx/AS67dG9lro8PIIxl1ONcoLfhnYd?from=from_copylink`
    );
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
  .qrCodeBox {
    position: relative;
    .mark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      .iconBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 32px;
        gap: 8px;
      }
    }
  }

  .ty {
    .checkIcon {
      width: 14px;
      height: 14px;
    }
  }
  // /deep/ .arco-statistic-value {
  //   font-size: 16px !important;
  //   color: #535353 !important;
  // }
</style>
