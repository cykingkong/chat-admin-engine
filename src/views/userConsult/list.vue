<template>
  <div class="container">
    <Breadcrumb :items="['咨询用户管理']" />
    <a-card class="general-card" title="咨询用户列表">
      <a-space class="mb-20">
        <a-select
          :style="{ width: '320px' }"
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
        <a-button :type="'primary'" class="" @click="search">提交</a-button>
      </a-space>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="false"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="用户信息" align="center" :width="140">
            <template #cell="{ record }">
              <a-space direction="vertical">
                <a-avatar v-if="record.avatar" :image-url="record.avatar">
                </a-avatar>
                <a-typography-text>
                  {{ record.nickname }}
                </a-typography-text>

                <a-typography-text type="secondary">
                  {{ record.userAgentDesc }}
                </a-typography-text>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="备注" :align="'center'" :width="140">
            <template #cell="{ record }">
              {{ record.remark || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="在线状态" :align="'center'" :width="100">
            <template #cell="{ record }">
              {{ record.onlineStatus == 1 ? '在线' : '离线' }}
            </template>
          </a-table-column>
          <a-table-column title="状态" :align="'center'" :width="100">
            <template #cell="{ record }">
              {{ record.status ? statusEnum[record.status] : '-' }}
            </template>
          </a-table-column>
          <a-table-column title="渠道信息" align="center" :width="100">
            <template #cell="{ record }">
              {{
                (record.channelInfo && record.channelInfo.channelName) || '-'
              }}
            </template>
          </a-table-column>
          <a-table-column title="登陆IP" align="center" :width="140">
            <template #cell="{ record }">
              <a-space direction="vertical">
                <a-typography-text>
                  {{ record.loginIpAddress }}
                </a-typography-text>
                <a-typography-text type="secondary">
                  【{{ record.ipLocation }}】
                </a-typography-text>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" align="center" :width="180">
            <template #cell="{ record }">
              {{
                record.createdAt
                  ? dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  : '-'
              }}
            </template>
          </a-table-column>
          <a-table-column title="登陆时间" align="center" :width="180">
            <template #cell="{ record }">
              {{
                record.loginTime
                  ? dayjs(record.loginTime).format('YYYY-MM-DD HH:mm:ss')
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
          field="remark"
          label="备注"
          :rules="[
            {
              required: true,
              message: '请填写备注',
            },
          ]"
        >
          <a-input
            v-model="editModel.remark"
            allow-clear
            placeholder="请填写备注"
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
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { uploadFile } from '@/api/tool';
  import {
    userConsultGrid,
    userConsultDel,
    userConsultUpdate,
  } from '@/api/userList';
  import { userChannelGrid } from '@/api/channel';
  import _ from 'lodash';

  const statusEnum: any = {
    1: '正常',
    2: '删除',
    3: '拉黑',
  };
  const userStatusList = ref<any[]>([
    { value: 1, label: '正常' },
    { value: 2, label: '删除' },
    { value: 3, label: '拉黑' },
  ]);
  const checkedKeys = ref<any>([]);
  const fileList = ref<any[]>([]);

  const generateFormModel = () => {
    return {};
  };

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();

  const renderData = ref<any[]>([]);
  const channelList = ref<any[]>([]);
    const searchForm = ref({
    channel: '',
  });
  const formModel = ref(generateFormModel());

  const basePagination: any = {
    current: 1,
    pageIndex: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const fetchChannelData = async (params: { pageIndex: 1; page_size: 100 }) => {
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
      setLoading(false);
    }
  };
  const fetchData = async (params: { pageIndex: 1; page_size: 20 }) => {
    setLoading(true);
    try {
      let d = {
        ...params,
        ...searchForm.value,
      };
      const { data, code } = await userConsultGrid(d);
      if (code === 200) {
        renderData.value = data.rows ? data.rows : [];
        console.log(renderData.value, 'renderData.value');
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
  fetchChannelData({ pageIndex: 1, page_size: 100 });
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
    search();
  };
  const formVisible = ref(false);
  const formTitle = ref('新增客服帐号');

  const dataRoleText = ref('请先选择用户角色');

  const editFormModel = () => {
    return {
      remark: '',
      consultId: '',
      status: 1,
      type: 1,
      avatar: '',
    };
  };

  const editModel = ref(editFormModel());

  const handleClick = (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '编辑客户账号信息';
      editModel.value.remark = row.remark;
      editModel.value.status = row.status;
      editModel.value.consultId = row.consultId;

      editModel.value.type = 2;
    } else if (type === 3) {
      formTitle.value = '修改客服账号密码';

      // editModel.value.sysUserId = row.userId;
      // editModel.value.userPassword = '';
      editModel.value.type = 3;
    } else {
      formTitle.value = '新增客服账号';
      editModel.value = editFormModel();
      dataRoleText.value = '请先选择用户角色';
      checkedKeys.value = [];
    }
    formVisible.value = true;
  };

  const formRef = ref<FormInstance>();
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 2) {
      // delete editModel.value.memberDepId;
      const { data } = await userConsultUpdate(editModel.value);
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
    const { data } = await userConsultDel({
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

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
</style>
