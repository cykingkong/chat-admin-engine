<template>
  <div class="container">
    <Breadcrumb :items="['商户管理']" />
    <a-card class="general-card" title="商户管理">
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
          <a-table-column title="账户昵称" align="center" :width="120">
            <template #cell="{ record }">
              <!-- <a-link href="javascript:void(0)" @click="userDetail(record)"> -->
              {{ record.nickname || 0 }}
              <!-- </a-link> -->
            </template>
          </a-table-column>
          <a-table-column title="登录账号" :align="'center'" :width="120">
            <template #cell="{ record }">
              {{ record.account || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="手机号" :align="'center'" :width="120">
            <template #cell="{ record }">
              {{ record.phone || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="email" :align="'center'">
            <template #cell="{ record }">
              {{ record.email || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="绑定谷歌" :align="'center'" :width="120">
            <template #cell="{ record }">
              {{ record.totpKey ? '已绑定' : '未绑定' }}
            </template>
          </a-table-column>
          <a-table-column title="状态" :align="'center'" :width="100">
            <template #cell="{ record }">
              {{ record.status == 1 ? '启用' : '禁用' }}
            </template>
          </a-table-column>
          <a-table-column title="登陆ip" align="center" :width="120">
            <template #cell="{ record }">
              {{ record.loginIpAddress || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="创建时间" align="center" :width="120">
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
          <a-table-column
            title="操作"
            data-index="operations"
            fixed="right"
            align="center"
            :width="220"
          >
            <template #cell="{ record }">
              <a-space direction="vertical">
                <a-space>
                  <a-button
                    type="text"
                    size="small"
                    @click="handleClick(2, record)"
                  >
                    编辑
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
                <a-space>
                  <a-button
                    type="text"
                    size="small"
                    @click="handleClickUserKfConfig(record)"
                  >
                    客服配置
                  </a-button>
                  <a-button
                    type="text"
                    size="small"
                    @click="handleClickUserAuth(record)"
                  >
                    获取谷歌验证码
                  </a-button>
                  <a-button
                    type="text"
                    size="small"
                    @click="handleClickUserConfig(record)"
                  >
                    欢迎语配置
                  </a-button>
                </a-space>
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
    <!-- 欢迎语配置 -->
    <a-modal
      v-model:visible="userFormVisible"
      :title="'配置欢迎语'"
      width="500px"
      @cancel="userFormVisible = false"
      @before-ok="handleBeforeUserOk"
    >
      <a-form
        ref="userformRef"
        style="margin: 0 auto; width: 400px"
        :model="userConfigModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="greeting"
          label="欢迎语"
          class="align-center"
          :rules="[
            {
              required: true,
              message: '请填写欢迎语',
            },
          ]"
        >
          <a-input
            v-model="userConfigModel.greeting"
            allow-clear
            placeholder="请填写欢迎语"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="userKfFormVisible"
      :title="userKfFormTitle"
      width="500px"
      @cancel="userKfFormVisible = false"
      @before-ok="handleBeforeUserKfOk"
    >
      <a-form
        ref="userKfformRef"
        style="margin: 0 auto; width: 400px"
        :model="userKfConfigModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="maxKfCount"
          label="最大客服数量"
          class="align-center"
          :rules="[
            {
              required: true,
              message: '请填写最大客服数量',
            },
          ]"
        >
          <a-input-number
            v-model="userKfConfigModel.maxKfCount"
            :min="0"
            allow-clear
            placeholder="请填写最大客服数量"
          />
        </a-form-item>
        <a-form-item
          class="align-center"
          field="maxChannelCount"
          label="最大渠道数量"
          :rules="[
            {
              required: true,
              message: '请填写最大渠道数量',
            },
          ]"
        >
          <a-input-number
            v-model="userKfConfigModel.maxChannelCount"
            allow-clear
            :min="0"
            placeholder="请填写最大渠道数量"
          />
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
        <a-form-item
          v-if="editModel.type != 3"
          field="nickname"
          label="商户昵称"
          :rules="[
            {
              required: true,
              message: '请填写商户昵称',
            },
          ]"
        >
          <a-input
            v-model="editModel.nickname"
            allow-clear
            placeholder="请填写商户昵称"
          />
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
        <a-form-item v-if="editModel.type != 3" field="email" label="Email">
          <a-input
            v-model="editModel.email"
            allow-clear
            placeholder="请填写Email"
          />
        </a-form-item>
        <a-form-item v-if="editModel.type != 3" field="phone" label="手机号">
          <a-input
            v-model="editModel.phone"
            allow-clear
            placeholder="请填写手机号"
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
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { h, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message, Modal } from '@arco-design/web-vue';

  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { uploadFile } from '@/api/tool';
  import {
    userGrid,
    userKfConfigInfo,
    userUpdate,
    userAdd,
    updateUser,
    userDel,
    updateUserKfConfigInfo,
    updateUserConfigInfo,
    userConfigInfo,
  } from '@/api/settings';
  import { getUserAuth } from '@/api/user';
  import _ from 'lodash';

  const userStatusList = ref<any[]>([
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' },
  ]);
  const checkedKeys = ref<any>([]);
  const fileList = ref<any[]>([]);
  const userKfFormVisible = ref(false);
  const userFormVisible = ref(false);
  const userKfFormTitle = ref('');
  const userConfigModel = ref({
    greeting: '',
    userId: undefined,
  });
  const userKfConfigModel = ref({
    maxKfCount: undefined,
    maxChannelCount: undefined,
    type: 1,
    userId: undefined,
  });
  const generateFormModel = () => {
    return {};
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
    pageIndex: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (params: { pageIndex: 1; page_size: 20 }) => {
    setLoading(true);
    try {
      const { data, code } = await userGrid(params);
      if (code === 200) {
        renderData.value = data.rows || [];
        pagination.current = params.pageIndex;
        pagination.pageIndex = params.pageIndex;
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
    basePagination.pageIndex = current;
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
  const handleClickUserAuth = async (row: any) => {
    const { data, code } = await getUserAuth({ userId: row.userId });
    if (code === 200) {
      const imgNode = h('img', {
        src: data.url,
        style: {
          width: '200px',
          height: '200px',
        },
      }); // 创建img节点
      const contentNode = h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          },
        },
        [imgNode]
      ); // 将img节点插入到div节点中
      Modal.info({
        title: '谷歌二次验证二维码',
        content: () => contentNode,
        okText: '我已绑定成功',
        maskClosable: false,
      });
    }
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
  const handleClickUserConfig = async (row: any) => {
    const { data } = await userConfigInfo({ userId: row.userId });
    userConfigModel.value = {
      greeting: data.greeting,
      userId: row.userId,
    };
    userFormVisible.value = true;
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
  const userformRef = ref<FormInstance>();
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
  const handleBeforeUserOk = async (done: any) => {
    const res = await userformRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    const { data } = await updateUserConfigInfo(userConfigModel.value);
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
      userId: row.userId,
    });
    Message.success({
      content: '成功删除商户',
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
</style>
