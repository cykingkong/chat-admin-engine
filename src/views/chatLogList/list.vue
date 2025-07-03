<template>
  <div class="container">
    <a-row>
      <a-col :span="6">
        <a-card title="客服列表">
          <div class="user-list">
        
            <a-table
              :show-header="false"
              :hoverable="true"
              :pagination="false"
              :data="cacheKfList"
              :loading="tableKfLoading"
              :row-class="rowKfClassName"
              @cell-click="cellKfClick"
              @page-change="handleClickKfPageChange"
            >
              <template #columns>
                <a-table-column title="" :align="'center'">
                  <template #cell="{ record }">
                    {{ record.nickname }}
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </div>
                    <div
        class="pagination"
        style="display: flex; justify-content: space-between; margin-top: 15px"
      >
        <div></div>
        <div>
          <a-pagination
            v-model:current="kfpagination.page"
            v-model:page-size="kfpagination.pageSize"
            :total="kfpagination.total || 0"
            :show-total="true"
            :show-page-size="true"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="handleClickKfPageChange"
            @page-size-change="pageSizeChange"
        /></div>
      </div>
        </a-card>
        
      </a-col>
      <a-col v-if="formModel.kfId" :span="6">
        <a-card title="用户列表">
               <a-space class="mb-20">
        <a-select
          :style="{ width: '160px' }"
          v-model="searchForm.channel"
          allow-clear
          placeholder="请选择分组"
        >
          <a-option
            v-for="(el, i) in channelList"
            :key="i"
            :value="el.channelKey"
            >{{ el.channelName }}</a-option
          >
        </a-select>
        <a-button :type="'primary'" class="" @click="searchUser">提交</a-button>
      </a-space>
          <div class="user-list">
            <a-table
              :show-header="false"
              :hoverable="true"
              :loading="tableLoading"
              :data="userList"
              :pagination="false"
              :row-class="rowClassName"
              @cell-click="cellClick"
              @page-change="handleClickUserPageChange"
            >
              <template #columns>
                <a-table-column title="" :align="'center'">
                  <template #cell="{ record }">
                    {{ record.nickname }}
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </div>
            <div
        class="pagination"
        style="display: flex; justify-content: space-between; margin-top: 15px"
      >
        <div></div>
        <div>
          <a-pagination
            v-model:current="userpagination.page"
            v-model:page-size="userpagination.pageSize"
            :total="userpagination.total || 0"
            :show-total="true"
            :show-page-size="true"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="handleClickUserPageChange"
            @page-size-change="pageSizeChange"
        /></div>
      </div>
        </a-card>
      </a-col>

      <a-col v-if="msgVisible" :span="12">
        <a-card title="对话消息">
          <div ref="userChatLogListRef" class="user-chat-log-list">
            <div
              v-for="(item, index) in renderData"
              :key="index"
              class="msg-item"
              :class="item.chatType === 1 ? 'msg-item-right' : 'msg-item-left'"
            >
              <div class="update-time w100">{{ item.createdAt }}</div>
              <a-avatar class="avatar">
                {{ item.chatType == 1 ? '客服' : '用户' }}
              </a-avatar>
              <a-space direction="vertical" :size="14">
                <a-typography-text type="secound">
                  {{ item.chatType == 1 ? item.kfNickname : item.userNickname }}
                </a-typography-text>

                <a-typography-text class="msg-content" v-html="`${item.msg}`">
                </a-typography-text>
              </a-space>
            </div>
            <a-empty v-if="renderData && renderData.length === 0" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, onMounted } from 'vue';
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
    import {
    userChannelGrid,
    
  } from '@/api/channel';
  import { userConsultGrid } from '@/api/userList';
  import { getChatLog, chatUser } from '@/api/chatLog';
  import _ from 'lodash';

  const tableLoading = ref(false);
  const tableKfLoading = ref(false);
  const activeRowClass = (record: any) => {
    return record.userId === selectedRow.value ? 'activeRowLight' : '';
  };
  const userStatusList = ref<any[]>([
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' },
  ]);
   const channelList = ref<any[]>([]);
    const searchForm = ref({
    channel: '',
  });
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
  const msgVisible = ref(false);
  const userChatLogListRef = ref();
  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const cacheKfList = ref<any[]>([]);
  const basePagination: any = {
    current: 1,
    page: 1,
    pageSize: 30,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const kfpagination = reactive({
    ...basePagination,
  });
  const userpagination = reactive({
    ...basePagination,
  });
  const selectedRow = ref<any>('');
  const fetchChannelData = async (params: { pageIndex: 1; page_size: 30 }) => {
    try {
      const { data, code } = await userChannelGrid(params);
      if (code === 200) {
        channelList.value = data.rows || [];
      } else {
        renderData.value = [];
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {

    }
  };
  fetchChannelData({ pageIndex: 1, page_size: 30 })
  const cellClick = async (row: any) => {
    if (loading.value) {
      return;
    }
    kfList.value = [];
    selectedRow.value = row.userUuid ? row.userUuid : null;
    formModel.value['user-uuid'] = row.userUuid;

    await fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as any);
  };
  const cellKfClick = async (row: any) => {
    renderData.value = [];
    formModel.value.kfId = row.kfId;
    userpagination.page = 1;
    fetchUserList({ ...userpagination, kfId: formModel.value.kfId });
  };
  const handleClickKfPageChange = (page: number) => {
    kfpagination.current = page;
    kfpagination.page = page;
    fetchListData({ ...kfpagination, kfId: formModel.value.kfId });
  };
  const handleClickUserPageChange = (page: number) => {
    console.log(page)
    userpagination.current = page;
    userpagination.page = page;
    fetchUserList({ ...userpagination, kfId: formModel.value.kfId });
  };
  const rowKfClassName = (record: any) => {
    return record.kfId === formModel.value.kfId ? 'selected-row' : '';
  };
  const rowClassName = (record: any) => {
    return record.userUuid === selectedRow.value ? 'selected-row' : '';
  };
  
  // 获取客服列表
  const fetchListData = async (params: { page: 1; page_size: 20 }) => {
    const { data, code } = await getUserPage(params);
    if (code === 200) {
      kfList.value =
        data.rows.map((item: any) => {
          return {
            nickname: `${item.nickname}(${item.account})`,
            kfId: item.kfId,
          };
        }) || [];
      cacheKfList.value = data.rows ? data.rows : [];
      kfpagination.total = data.total;
    }
tableKfLoading.value = false;

    // try {
    //   tableLoading.value = true;
    //   const userRes = await userConsultGrid({ pageIndex: 1, pageSize: 200 });
    //   if (userRes.code === 200) {
    //     userList.value = userRes.data.rows
    //       ? userRes.data.rows.map((e: any) => {
    //           return {
    //             nickname: `${e.nickname}${e.remark ? `(${e.remark})` : ''} `,
    //             uuid: e.uuid,
    //             userId: e.userId,
    //             consultId: e.consultId,
    //           };
    //         })
    //       : [];
    //   }
    //   tableLoading.value = false;
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const searchUser = ()=>{
tableLoading.value = true;
      fetchUserList({...searchForm.value,page:1,pageSize:200,kfId: formModel.value.kfId});
  }
  // 获取客服接待的用户数
  const fetchUserList = async (params: { page: 1; page_size: 20 }) => {
    try {
      tableLoading.value = true;
      const { data, code } = await chatUser(params);
      userList.value = data.rows
        ? data.rows.map((e: any) => {
            return {
              nickname: `${e.userNickname}${
                e.userConsultInfo && e.userConsultInfo.remark
                  ? `(${e.userConsultInfo.remark})`
                  : ''
              } `,
              uuid: e.uuid,
              userId: e.userId,
              userUuid: e.userUuid,
            };
          })
        : [];
        userpagination.total = data.total;
      tableLoading.value = false;
    } catch (e) {
      console.log(e);
    }
  };
  // 获取消息列表
  const fetchData = async (params: { page: 1; page_size: 20 }) => {
    msgVisible.value = false;
    setLoading(true);
    try {
      const { data, code } = await getChatLog(params);
      if (code === 200) {
        renderData.value = data.rows ? data.rows.reverse() : [];
        pagination.current = params.page;
        pagination.page = params.page;
        pagination.total = data.total;
      } else {
        renderData.value = [];
      }
      if (formModel.value.kfId) {
        msgVisible.value = true;

        setTimeout(() => {
          console.log(userChatLogListRef.value, 'userChatLogListRef');
          // 判断userChatLogListRef.value是否有滚动条，有的话滚动到最底部
          if (userChatLogListRef.value) {
            userChatLogListRef.value.scrollTop =
              userChatLogListRef.value.scrollHeight;
          }
        }, 300);
      }
    } catch (err) {
      msgVisible.value = false;
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
  onMounted(() => {
    setLoading(false);
  });
  // fetchData({
  //   ...basePagination,
  //   ...formModel.value,
  // } as unknown as any);
  fetchListData({
    ...basePagination,
  });
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
  interface EditModelType {
    userId: string;
    nickname: string;
    email: string;
    account: string;
    password: string;
    avatar: string;
    status: number;
    type: number;
    maxConnections?: number;
  }

  const editFormModel = (): EditModelType => {
    return {
      userId: '',
      nickname: '',
      email: '',
      account: '',
      password: '',
      avatar: '',
      status: 1,
      type: 1,
      maxConnections: 0,
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
    padding: 20px;
  }
  .user-list,
  .user-chat-log-list {
    width: 100%;
    height: 80vh;
    overflow-y: auto;
  }
  .user-chat-log-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .msg-item {
    padding: 10px;
    // border-bottom: 1px solid #ccc;
    // background: #fff;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    position: relative;
    width: 100%;
    padding-top: 20px;
    // border-radius: 5px;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .update-time {
      position: absolute;
      left: 0;
      top: 0;
      height: 20px;
      width: 100%;
      text-align: center;
      color: var(--color-neutral-6);
    }
    .avatar {
      width: 30px;
      height: 30px;
    }
    .msg-content {
      background: #fff;
      border-radius: 5px;
      padding: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  .msg-item-left {
    align-self: flex-start;
  }
  .msg-item-right {
    align-self: flex-end;
    text-align: right;
    flex-direction: row-reverse;
  }
  :deep(.selected-row > .arco-table-td) {
    background-color: #8ba1fb !important;
    color: #fff;
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
  .arco-typography {
    display: block;
  }
  .mb-20{
    margin-bottom: 20px;
  }
</style>
