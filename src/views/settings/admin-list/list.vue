<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '客服管理']" />
    <a-card class="general-card" title="客服管理">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1)">
              <template #icon>
                <icon-plus />
              </template>
              新建客服账号
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
          <a-table-column title="账户信息" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-avatar v-if="record.avatar" :image-url="record.avatar">
                </a-avatar>
                {{ record.nickname || 0 }}
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="登录账号" align="center">
            <template #cell="{ record }">
              {{ record.account || '-' }}
            </template>
          </a-table-column>
               <a-table-column title="分组信息" align="center">
            <template #cell="{ record }">
              <!-- channel -->
              {{ record.channelName }} 
            </template>
          </a-table-column>
          <a-table-column title="最大处理咨询用户数" align="center">
            <template #cell="{ record }">
              {{ record.maxConnections || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="状态" align="center">
            <template #cell="{ record }">
              {{ record.status == 1 ? '启用' : '禁用' }}
            </template>
          </a-table-column>
          <a-table-column title="在线状态" align="center">
            <template #cell="{ record }">
              {{ record.onlineStatus ? '在线' : '离线' }}
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
          <a-table-column
            title="操作"
            data-index="operations"
            align="center"
            :width="220"
          >
            <template #cell="{ record }">
              <a-space>
                <a-button
                  type="text"
                  size="small"
                  @click="handleClick(2, record)"
                >
                  编辑
                </a-button>

                <a-popconfirm
                  content="确认是否删除此客服账号"
                  ok-text="确认"
                  @ok="handleClickDel(record)"
                >
                  <a-button type="text" status="danger" size="small">
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
              <a-space>
                <a-button
                  type="text"
                  size="small"
                  @click="handleClickToken(record)"
                >
                  查看账号
                </a-button>
                <a-button
                  type="text"
                  size="small"
                  :loading="record.copyBtnLoading"
                  @click="handleClickCopyLink(record)"
                >
                  复制链接
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <div
        class="pagination"
        style="display: flex; justify-content: space-between; margin-top: 15px"
      >
        <div>
          <a-pagination
            v-model:current="pagination.page"
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
    </a-card>

    <a-modal
      v-model:visible="channelVisible"
      title="选择渠道"
      width="500px"
      :ok-text="'复制链接'"
      @cancel="channelVisible = false"
      @before-ok="handleBeforeCopy"
    >
      <a-form
        ref="channelFormRef"
        style="margin: 0 auto; width: 400px"
        :model="channelModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="channelKey"
          label="渠道"
          :rules="[
            {
              required: true,
              message: '请选择渠道',
            },
          ]"
        >
          <a-select
            v-model="channelModel.channelKey"
            allow-clear
            placeholder="请选择渠道"
          >
            <a-option
              v-for="(el, key) in channelList"
              :key="key"
              :value="el.channelKey"
              >{{ el.channelName }}</a-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      width="500px"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form
        ref="formRef"
        style="margin: 0 auto; width: 400px"
        :model="editModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-space style="width: 100%" align="start">
          <a-card
            class="general-card"
            style="width: 400px"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{ padding: '17px 20px 21px 20px' }"
            title="用户信息"
          >
            <a-form-item
              v-if="editModel.type != 3"
              field="nickname"
              label="用户昵称"
              :rules="[
                {
                  required: true,
                  message: '请填写用户昵称',
                },
              ]"
            >
              <a-input
                v-model="editModel.nickname"
                allow-clear
                placeholder="请填写用户昵称"
              />
            </a-form-item>
            <a-form-item
              v-if="editModel.type != 3"
              field="channelKey"
              label="分组"
              :rules="[
                {
                  required: true,
                  message: '请选择分组',
                },
              ]"
            >
          
          <a-select
            v-model="editModel.channelKey"
            allow-clear
            placeholder="请选择分组"
          >
            <a-option
              v-for="(el, key) in channelList"
              :key="key"
              :value="el.channelKey"
              >{{ el.channelName }}</a-option
            >
          </a-select>
          </a-form-item>
             
            <a-form-item
              v-if="editModel.type != 3"
              field="account"
              label="登录账号"
              :rules="[
                {
                  required: true,
                  message: '请填写登录手机号',
                },
              ]"
            >
              <a-input
                v-model="editModel.account"
                allow-clear
                placeholder="请填写登录账号"
              />
            </a-form-item>
            <a-form-item
              v-if="editModel.type != 3"
              field="password"
              label="登录密码"
              :rules="[
                {
                  required: editModel.type == 1 ? true : false,
                  message: '请填写登录密码',
                },
              ]"
            >
              <!-- <a-input-password v-model="editModel.memberPassword" allow-clear  v-if="editModel.value===1"/> -->
              <a-input
                v-model="editModel.password"
                allow-clear
                placeholder="请填写登录密码"
              />
            </a-form-item>
            <a-form-item
              v-if="editModel.type != 3"
              field="maxConnections"
              label="最大咨询数"
              :rules="[
                {
                  required: true,
                  message: '请填写最大咨询数',
                },
              ]"
            >
              <a-input-number
                v-model="editModel.maxConnections"
                allow-clear
                placeholder="请填写最大咨询数"
              />
            </a-form-item>

            <a-form-item
              v-if="editModel.type != 3"
              field="status"
              label="状态"
              :rules="[
                {
                  required: true,
                  message: '请选择状态',
                },
              ]"
            >
              <a-select
                v-model="editModel.status"
                allow-clear
                placeholder="请选择状态"
              >
                <a-option
                  v-for="(el, key) in userStatusList"
                  :key="key"
                  :value="el.value"
                  >{{ el.label }}</a-option
                >
              </a-select>
            </a-form-item>
            <a-form-item v-if="editModel.type != 3" field="" label="头像">
              <a-upload
                :file-list="fileList"
                :limit="1"
                image-preview
                list-type="picture-card"
                :accept="'.doc,.docx,.pdf,.png'"
                :custom-request="protraitUpload"
                @before-remove="beforeRemove"
            /></a-form-item>
          </a-card>
        </a-space>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { useClipboard } from '@vueuse/core';

  import { Message,Modal } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { uploadFile } from '@/api/tool';
  import {
    getUserPage,
    memberEdit,
    getDepment,
    insertUser,
    updateUser,
    deleteUser,
    getToken,
  } from '@/api/settings';
  import { userChannelGrid } from '@/api/channel';

  import { clearAllChildren, getAllMenuIds } from '@/utils/event';
  import { userStatus } from '@/utils/enum';

  import * as listMethods from '@/views/settings/listMethods';
  import _ from 'lodash';

  const userStatusList = ref<any[]>([
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' },
  ]);
  const { copy } = useClipboard();
  const checkedKeys = ref<any>([]);
  const fileList = ref([]);
  const channelVisible = ref(false);
  const channelList = ref<any>([]);
  const channelModel = ref({
    channelKey: '',
    sessionId: '',
  });
  // const getDictionaryList = async () => {
  // };

  // import TableFluter from './components/table-fluter.vue';

  // const tableFluter = ref<InstanceType<typeof TableFluter>>();
  // const tableHeader = [
  //   { key: 'userName', check: true, label: '账户名称' },
  //   { key: 'createDate', check: true, label: '创建时间' },
  // ];
  // setTimeout(() => {
  //   tableFluter.value?.setData(tableHeader);
  //   // const keyData = tableFluter.value?.getData();
  // }, 200);

  const generateFormModel = () => {
    return {};
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const dataRoleText = ref('请先选择用户角色');

  // getDepArr({ page: 1, pageSize: 20 });
  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  // const userDetail = async (row: any) => {
  //   const { data } = await getSysUserById({ sysUserId: row.userId });
  //   console.log(data);
  // };
  // page
  const basePagination: any = {
    current: 1,
    page: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  // getMenuData({
  //   ...basePagination,
  // } as unknown as any);
  // list data
  const fetchData = async (params: { page: 1; page_size: 20 }) => {
    setLoading(true);
    try {
      const { data, code } = await getUserPage(params);
      if (code === 200) {
        renderData.value =
          data.rows.map((e: any) => {
            return {
              ...e,
              copyBtnLoading: false, 
              channelName:channelList.value.find((el:any)=>el.channelKey==e.wckIdArr)?.channelName  ||'-'
            };
          }) || [];
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


  const beforeRemove = () => {
    return new Promise((resolve) => {
      fileList.value = [];
      editModel.value.avatar = '';

      resolve(true);
    });
  };
const chatUrl = ref('')
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
  const handleClickToken = async (row: any) => {
    const url = import.meta.env.VITE_PC_CHAT_URL;
    const { data } = await getToken({ kfId: row.kfId });
    window.open(`${url}#/login?auth_code=${data.token}&kfId=${row.kfId}`);
  };
  const handleClickCopyLink = async (row: any) => {
     const url = import.meta.env.VITE_M_CHAT_URL;
    const str = `${url}?sessionId=${row.sessionId}&channel=${row.wckIdArr}`;
    copy(str);
 Message.success({
      content: '复制成功',
      duration: 5 * 1000,
    });
    // row.copyBtnLoading = true;
    // channelModel.value.channelKey = '';

    // const { data, code } = await userChannelGrid({
    //   pageIndex: 1,
    //   page_size: 200,
    // });
    // if (code === 200) {
    //   channelList.value = data.rows ? data.rows : [];
    //   channelModel.value.sessionId = row.sessionId;
    // }
    // channelVisible.value = true;
    // row.copyBtnLoading = false;
  };
  const handleBeforeCopy = async (done: any) => {
    const res = await channelFormRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    const url = import.meta.env.VITE_M_CHAT_URL;
    const str = `${url}?sessionId=${channelModel.value.sessionId}&channel=${channelModel.value.channelKey}`;
    console.log(str)
    copy(str);
    Message.success({
      content: '复制成功',
      duration: 5 * 1000,
    });
    done(true);
    setTimeout(() => {
      channelVisible.value = false;
       Modal.info({
          title: '链接地址',
          content: str,
          width:"750px",
          okText: '确定',
       })
    }, 300);
  };
  const formVisible = ref(false);
  const formTitle = ref('新增客服帐号');
  const editFormModel = () => {
    return {
      account: '',
      nickname: '',
      password: '',
      avatar: '',
      kfId: undefined,
      maxConnections:1,
      wckIdArr:'',// channelKey
      channelKey:"",
      status: 1,
      type: 1,
    };
  };
  const editModel = ref(editFormModel());

  const handleClick = (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '编辑客服账号信息';
      editModel.value.account = row.account;
      editModel.value.kfId = row.kfId;
      editModel.value.nickname = row.nickname;
    editModel.value.channelKey =   editModel.value.wckIdArr = row.channelKey

      editModel.value.maxConnections = row.maxConnections;
      editModel.value.status = row.status;
      editModel.value.password = '';
      editModel.value.avatar = row.avatar;
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
      formTitle.value = '修改客服账号密码';

      editModel.value.sysUserId = row.userId;
      editModel.value.userPassword = '';
      editModel.value.type = 3;
    } else {
      formTitle.value = '新增客服账号';
      editModel.value = editFormModel();
      if(channelList.value.length>0){
         editModel.value.channelKey =   editModel.value.wckIdArr = channelList.value[0].channelKey
      }
      dataRoleText.value = '请先选择用户角色';
      checkedKeys.value = [];
    }
    formVisible.value = true;
  };

  const formRef = ref<FormInstance>();
  const channelFormRef = ref<FormInstance>();
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 1) {
      console.log(editModel.value);
      editModel.value.wckIdArr = editModel.value.channelKey
      const { data } = await insertUser(editModel.value);
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
      editModel.value.wckIdArr = editModel.value.channelKey

      const { data } = await updateUser(editModel.value);
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
    const { data } = await deleteUser({
      kfId: row.kfId,
    });
    Message.success({
      content: '成功删除客服账号',
      duration: 5 * 1000,
    });
    search();
  };
  const getChannelList = async()=>{
     const { data, code } = await userChannelGrid({
      pageIndex: 1,
      page_size: 200,
    });
    if (code === 200) {
      channelList.value = data.rows ? data.rows : [];

    }
  }
  const init = async () => {
  await   getChannelList()
  await   fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as any);

  }
  onMounted(()=>{
    init()
  })
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
</style>
