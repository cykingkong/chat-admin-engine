<template>
  <div class="container">
    <Breadcrumb :items="['渠道管理']" />
    <a-card class="general-card" title="渠道管理">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1)">
              <template #icon>
                <icon-plus />
              </template>
              新建渠道
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
          <a-table-column title="渠道名称" :align="'center'">
            <template #cell="{ record }">
              {{ record.channelName || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="渠道key" align="center">
            <template #cell="{ record }">
              <!-- <a-link href="javascript:void(0)" @click="userDetail(record)"> -->
              {{ record.channelKey || 0 }}
              <!-- </a-link> -->
            </template>
          </a-table-column>
          <a-table-column title="状态" :align="'center'">
            <template #cell="{ record }">
              {{ record.status == 1 ? '启用' : '禁用' }}
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
                <!-- <a-button
                  type="text"
                  size="small"
                  @click="handleClickChangeStatus(record)"
                >
                  停用
                </a-button> -->
                <a-popconfirm
                  content="确认是否删除此渠道"
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
          field="channelName"
          label="渠道名称"
          :rules="[
            {
              required: true,
              message: '请填写渠道名称',
            },
          ]"
        >
          <a-input
            v-model="editModel.channelName"
            allow-clear
            placeholder="请填写渠道名称"
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
  import {
    userChannelGrid,
    userChannelAdd,
    userChannelUpdate,
    userChannelDel,
  } from '@/api/channel';

  import _ from 'lodash';

  const userStatusList = ref<any[]>([
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' },
  ]);
  const checkedKeys = ref<any>([]);

  const generateFormModel = () => {
    return {};
  };

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const dataRoleText = ref('请先选择用户角色');

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
      const { data, code } = await userChannelGrid(params);
      if (code === 200) {
        renderData.value = data.rows || [];
        pagination.current = params.pageIndex;
        pagination.pageIndex = params.pageIndex;
        pagination.total = data.total;
      } else {
        renderData.value = [];
      }
    } catch (err) {
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
  const pageSizeChange = (size: number) => {
    // console.log(size);
    basePagination.pageSize = size;
    pagination.pageSize = size;
    search();
  };

  const formVisible = ref(false);
  const formTitle = ref('新增渠道');
  const editFormModel = () => {
    return {
      channelName: '',
      id: undefined,
      status: 1,
      type: 1,
    };
  };
  const editModel = ref(editFormModel());

  const handleClick = (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '编辑渠道信息';
      editModel.value.channelName = row.channelName;
      editModel.value.status = row.status;
      editModel.value.id = row.id;

      editModel.value.type = 2;
    } else if (type === 3) {
      formTitle.value = '修改渠道密码';

      // editModel.value.sysUserId = row.userId;
      // editModel.value.userPassword = '';
      editModel.value.type = 3;
    } else {
      formTitle.value = '新增渠道';
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

    if (editModel.value.type === 1) {
      const { data } = await userChannelAdd(editModel.value);
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
      const { data } = await userChannelUpdate(editModel.value);
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
    const { data } = await userChannelDel({
      kfId: row.kfId,
    });
    Message.success({
      content: '成功删除该渠道',
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
</style>
