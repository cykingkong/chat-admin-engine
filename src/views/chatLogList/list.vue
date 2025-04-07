<template>
  <div class="container">
    <Breadcrumb :items="['聊天记录列表']" />
    <a-row>
      <a-card class="general-card-upai" style="width: 100%">
        <a-col :flex="1">
          <a-form :model="formModel" auto-label-width label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="channel"
                  label="用户渠道"
                  label-col-flex="60px"
                >
                  <a-input v-model="formModel.channel" allow-clear></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="user-uuid"
                  label="用户"
                  label-col-flex="60px"
                >
                  <a-select
                    v-model="formModel.levelId"
                    allow-clear
                    placeholder="请选择用户"
                  >
                    <a-option
                      v-for="(item, key) in levelList"
                      :key="key"
                      :label="item.levelName"
                      :value="item.levelId"
                    />
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="kfId" label="客服ID" label-col-flex="60px">
                  <a-select
                    v-model="formModel.kfId"
                    allow-clear
                    placeholder="请选择客服"
                  >
                    <a-option
                      v-for="(item, key) in kfList"
                      :key="key"
                      :label="item.nickname"
                      :value="item.kfId"
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

    <a-card class="general-card" title="聊天记录列表">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1)">
              <template #icon>
                <icon-plus />
              </template>
              新建商户
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <!-- <a-button type="primary" style="margin-right: 13px">
            <template #icon> <icon-menu-unfold /> </template>
            自定义列
          </a-button> -->
          <!-- <TableFluter ref="tableFluter" /> -->
          <a-button type="primary" @click="search()">
            <template #icon> <icon-refresh /> </template>
            刷新
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="false"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="用户信息" align="center">
            <template #cell="{ record }">
              <a-space direction="vertical">
                <a-avatar
                  v-if="record.userAvatar"
                  :image-url="record.userAvatar"
                >
                </a-avatar>
                {{ record.userNickname || 0 }}
              </a-space>
              <!-- <a-link href="javascript:void(0)" @click="userDetail(record)"> -->
              <!-- </a-link> -->
            </template>
          </a-table-column>
          <a-table-column title="用户渠道" :align="'center'" :width="120">
            <template #cell="{ record }">
              <a-typography-paragraph
                :ellipsis="{
                  rows: 2,
                  showTooltip: true,
                }"
                class="margin-0"
              >
                {{ record.userChannel || '-' }}
              </a-typography-paragraph>
            </template>
          </a-table-column>
          <a-table-column title="消息内容" :align="'center'" :width="120">
            <template #cell="{ record }">
              <a-typography-paragraph
                :ellipsis="{
                  rows: 2,
                  showTooltip: true,
                }"
                class="margin-0"
              >
                <div v-html="record.msg"></div>
              </a-typography-paragraph>
            </template>
          </a-table-column>
          <a-table-column title="email" :align="'center'">
            <template #cell="{ record }">
              {{ record.email || '-' }}
            </template>
          </a-table-column>

          <a-table-column title="状态" :align="'center'">
            <template #cell="{ record }">
              {{ record.status == 1 ? '启用' : '禁用' }}
            </template>
          </a-table-column>
          <a-table-column title="登陆ip" align="center">
            <template #cell="{ record }">
              {{ record.loginIpAddress || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="创建时间" align="center">
            <template #cell="{ record }">
              {{
                record.createdAt
                  ? dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  : '-'
              }}
            </template>
          </a-table-column>
          <!-- <a-table-column title="备注" align="center">
            <template #cell="{ record }">
              {{ record.memberUserRemark || '-' }}
            </template>
          </a-table-column> -->
          <a-table-column title="操作" data-index="operations" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button
                  type="text"
                  size="small"
                  @click="handleClick(2, record)"
                >
                  编辑
                </a-button>
                <a-button
                  type="text"
                  size="small"
                  @click="handleClickUserKfConfig(record)"
                >
                  客服配置
                </a-button>

                <a-popconfirm
                  content="确认是否删除此商户账号"
                  ok-text="确认"
                  @ok="handleClickDel(record)"
                >
                  <a-button type="text" status="danger" size="small">
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <div
        class="pagination"
        style="display: flex; justify-content: space-between; margin-top: 15px"
      >
        <div></div>
        <div>
          <a-pagination
            v-model:current="pagination.page"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :show-total="true"
            :show-page-size="true"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="onPageChange"
            @page-size-change="pageSizeChange"
        /></div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { uploadFile } from '@/api/tool';
  import {
    getUserPage,
    userKfConfigInfo,
    userUpdate,
    userAdd,
    updateUser,
    userDel,
    updateUserKfConfigInfo,
  } from '@/api/settings';
  import { userConsultGrid } from '@/api/userList';
  import getChatLog from '@/api/chatLog';
  import _ from 'lodash';

  const userStatusList = ref<any[]>([
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' },
  ]);
  const checkedKeys = ref<any>([]);
  const fileList = ref<any[]>([]);
  const userKfFormVisible = ref(false);
  const kfList = ref<any[]>([]);
  const userList = ref([]);
  const userKfFormTitle = ref('');
  const userKfConfigModel = ref({
    maxKfCount: undefined,
    maxChannelCount: undefined,
    type: 1,
    userId: undefined,
  });
  const generateFormModel = () => {
    return {
      'channel': '',
      'user-uuid': '',
      'kfId': '',
    };
  };

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const roleList = ref<any[]>([]);
  const dataRoleText = ref('请先选择用户角色');

  const roleArr = ref<any>([
    { value: 0, label: '所有' },
    { value: 1, label: '本部门及以下数据权限 ' },
    { value: 2, label: '本部门数据权限' },
    { value: 3, label: '仅本人数据权限' },
  ]);

  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());

  const basePagination: any = {
    current: 1,
    page: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const fetchListData = async () => {
    const { data, code } = await getUserPage({ page: 1, page_size: 200 });
    if (code === 200) {
      kfList.value =
        data.rows.map((item: any) => {
          return {
            nickname: `${item.nickname}(${item.account})`,
            kfId: item.kfId,
          };
        }) || [];
    }
    const userRes = await userConsultGrid({ pageIndex: 1, pageSize: 200 });
    if (userRes.code === 200) {
      userList.value = userRes.data.rows
        ? userRes.data.rows.map((e: any) => {
            return {
              nickname: `${e.nickname}(${e.remark}) `,
              uuid: e.uuid,
              userId: e.userId,
            };
          })
        : [];
    }
  };
  const fetchData = async (params: { page: 1; page_size: 20 }) => {
    setLoading(true);
    try {
      const { data, code } = await getChatLog(params);
      if (code === 200) {
        renderData.value = data.rows || [];
        pagination.current = params.page;
        pagination.page = params.page;
        pagination.total = data.total;
      } else {
        renderData.value = [];
      }
    } catch (err) {
      console.log(err);
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (current: number) => {
    basePagination.page = current;
    basePagination.current = current;
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as any);
  };

  // 搜索
  const search = () => {
    onPageChange(1);
  };

  fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as any);
  fetchListData();
  const beforeRemove = () => {
    return new Promise((resolve) => {
      fileList.value = [];
      editModel.value.avatar = '';

      resolve(true);
    });
  };
  const protraitUpload = async (option: any) => {
    const { fileItem } = option;
    const param = new FormData();
    param.append('file', fileItem.file);
    const { data, code } = await uploadFile(param);
    if (code === 200) {
      fileList.value = [
        {
          uid: fileItem.uid,
          name: fileItem.file.name,
          url: data.url,
        },
      ];
      editModel.value.avatar = data.url;
      console.log(editModel.value, 'fasda');
    }
  };
  const pageSizeChange = (size: number) => {
    // console.log(size);
    basePagination.pageSize = size;
    pagination.pageSize = size;
    search();
  };

  const refresh = () => {
    formModel.value = generateFormModel();
  };
  const formVisible = ref(false);
  const formTitle = ref('新增商户帐号');
  const editFormModel = () => {
    return {
      userId: '',
      nickname: '',
      email: '',
      account: '',
      password: '',
      avatar: '',
      status: 1,
      type: 1,
    };
  };
  const editModel = ref(editFormModel());
  const handleClickUserKfConfig = async (row: any) => {
    const { data } = await userKfConfigInfo({ userId: row.userId });
    userKfConfigModel.value = {
      type: 2,
      maxKfCount: data.maxKfCount || 12,
      maxChannelCount: data.maxChannelCount || 2,
      userId: row.userId,
    };
    userKfFormTitle.value = '修改商户账号配置';
    userKfFormVisible.value = true;
  };
  const handleClick = (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '编辑商户账号信息';
      editModel.value.account = row.account;
      editModel.value.email = row.email;
      editModel.value.nickname = row.nickname;
      editModel.value.maxConnections = row.maxConnections;
      editModel.value.status = row.status;
      editModel.value.password = '';
      editModel.value.avatar = row.avatar;
      editModel.value.userId = row.userId;
      editModel.value.type = 2;
      if (row.avatar) {
        fileList.value = [
          {
            uid: row.userId,
            name: row.avatar,
            url: row.avatar,
          },
        ];
      }
    } else if (type === 3) {
      formTitle.value = '修改商户账号密码';

      // editModel.value.sysUserId = row.userId;
      // editModel.value.userPassword = '';
      editModel.value.type = 3;
    } else {
      formTitle.value = '新增商户账号';
      editModel.value = editFormModel();
      dataRoleText.value = '请先选择用户角色';
      checkedKeys.value = [];
    }
    formVisible.value = true;
  };
  const userKfformRef = ref<FormInstance>();
  const formRef = ref<FormInstance>();
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 1) {
      const { data } = await userAdd(editModel.value);
      Message.success({
        content: '添加成功',
        duration: 5 * 1000,
      });
      search();
    } else if (editModel.value.type === 3) {
      // const { data } = await updateUser(editModel.value);
      // Message.success({
      //   content: '修改成功',
      //   duration: 5 * 1000,
      // });
      // search();
    } else {
      // delete editModel.value.memberDepId;
      const { data } = await userUpdate(editModel.value);
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
  const handleBeforeUserKfOk = async (done: any) => {
    const res = await userKfformRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    const { data } = await updateUserKfConfigInfo(userKfConfigModel.value);
    window.setTimeout(() => {
      done();
    }, 300);
  };
  const handleClickChangeStatus = async (row: any) => {
    const { data } = await updateUser({
      memberUserId: row.memberUserId,
      memberStatus: 0,
    });
    Message.success({
      content: '停用该账号成功',
      duration: 5 * 1000,
    });
    search();
  };
  const handleClickDel = async (row: any) => {
    const { data } = await userDel({
      kfId: row.kfId,
    });
    Message.success({
      content: '成功删除客服账号',
      duration: 5 * 1000,
    });
    search();
  };
  const handleCancel = () => {
    formVisible.value = false;
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .treeMark {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
  }
  .align-center {
    align-items: center;
  }
  .margin-0 {
    margin: 0;
  }
</style>
