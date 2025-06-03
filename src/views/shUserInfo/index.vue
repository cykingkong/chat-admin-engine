<template>
  <div class="container">
    <a-card class="general-card" title="欢迎语管理">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1)">
              <template #icon>
                <icon-plus />
              </template>
              新建欢迎语
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
          <a-table-column title="语种" :align="'center'">
            <template #cell="{ record }">
              {{ languageEnum[record.languageType] || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="欢迎语" align="center">
            <template #cell="{ record }">
              <!-- <a-link href="javascript:void(0)" @click="userDetail(record)"> -->
              {{ record.greeting || 0 }}
              <!-- </a-link> -->
            </template>
          </a-table-column>
          <a-table-column title="状态" :align="'center'">
            <template #cell="{ record }">
              {{ userStatusEnmu[record.status] }}
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
      :title="editModel.type == 1 ? '新建欢迎语' : '编辑欢迎语'"
      width="500px"
      @cancel="formVisible = false"
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
          field="greeting"
          label="欢迎语"
          :rules="[
            {
              required: true,
              message: '请填写欢迎语',
            },
          ]"
        >
          <a-input
            v-model="editModel.greeting"
            allow-clear
            placeholder="请填写欢迎语"
          />
        </a-form-item>
        <a-form-item
          field="languageType"
          label="语种"
          :rules="[
            {
              required: true,
              message: '请选择语种',
            },
          ]"
        >
          <a-select
            v-model="editModel.languageType"
            allow-clear
            placeholder="请选择语言"
          >
            <a-option
              v-for="(item, key) in languageList"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </a-select>
        </a-form-item>
        <a-form-item
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
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store';

  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { uploadFile } from '@/api/tool';
  import useLoading from '@/hooks/loading';

  import {
    updateUserConfigInfo,
    userConfigInfo,
    userKfConfigInfo,
    memberEdit,
  } from '@/api/settings';

  const { loading, setLoading } = useLoading(true);
  const renderData = ref<any[]>([]);
  const userStore = useUserStore();
  const userStoreState = computed(() => {
    return userStore.$state;
  });

  const formModel = ref({
    languageType: '',
  });
  const editModel = ref({
    languageType: '',
    greeting: '', // 欢迎语
    status: 1,
    id: undefined,
    type: 1,
  });
  const formVisible = ref(false);
  const basePagination: any = {
    current: 1,
    pageIndex: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const isEditGreeting = ref(false);
  const isEditInfo = ref(false);
  const userConfigModel = reactive({
    greeting: '',
    nickname: '',
    avatar: '',
    userId: '',
    password: '',
    status: 1,
    type: 1,
  });
  const fileList = ref<any[]>([]);
  const formRef = ref<FormInstance>();

  const getKfConfig = async () => {
    setLoading(true);
    const { data, code } = await userConfigInfo({
      userId: userStoreState.value.userId,
    });
    if (code === 200) {
      userConfigModel.greeting = data.greeting;
      renderData.value = JSON.parse(data.greeting);
      setLoading(false);
    }
  };
  const handleClick = (type: number, row?: any) => {
    if (type === 1) {
      editModel.value.greeting = '';
      editModel.value.languageType = '';
      editModel.value.status = 1;
      editModel.value.id = undefined;
      editModel.value.type = 1;
    } else if (type === 2) {
      editModel.value.greeting = row.greeting;
      editModel.value.languageType = row.languageType;
      editModel.value.status = row.status;
      editModel.value.id = row.id;
      editModel.value.type = 2;
    }
    formVisible.value = true;
  };

  const updateKfConfig = async () => {
    userConfigModel.nickname = userStoreState.value.nickname;
    userConfigModel.email = userStoreState.value.email;
    userConfigModel.phone = userStoreState.value.phone;
    userConfigModel.userId = userStoreState.value.userId;
    userConfigModel.avatar = userStoreState.value.avatar;
    userConfigModel.status = userStoreState.value.status;
    if (userStoreState.value.avatar) {
      fileList.value = [
        {
          uid: userStoreState.value.userId,
          name: userStoreState.value.avatar,
          url: userStoreState.value.avatar,
        },
      ];
    }
  };
  const initData = async () => {
    await getKfConfig();
    updateKfConfig();
  };
  const userStatusList = ref<any[]>([
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' },
  ]);
  const userStatusEnmu = computed(() => {
    return userStatusList.value.reduce((prev: any, next: any) => {
      prev[next.value] = next.label;
      return prev;
    }, {});
  });
  const languageList = [
    {
      label: '中文',
      value: 'zh',
    },
    {
      label: '英文',
      value: 'en',
    },
    {
      label: '巴西语',
      value: 'pt',
    },
    {
      label: '俄语',
      value: 'ru',
    },
    {
      label: '日语',
      value: 'ja',
    },
    {
      label: '韩语',
      value: 'ko',
    },
    {
      label: '法语',
      value: 'fr',
    },
    {
      label: '德语',
      value: 'de',
    },
    {
      label: '西班牙语',
      value: 'es',
    },
    {
      label: '阿拉伯语',
      value: 'ar',
    },
    {
      label: '葡萄牙语',
      value: 'pt',
    },
  ];
  const languageEnum = computed(() => {
    return languageList.reduce((prev: any, next: any) => {
      prev[next.value] = next.label;
      return prev;
    }, {});
  });

  const onPageChange = (current: number) => {
    basePagination.pageIndex = current;
    basePagination.current = current;
    getKfConfig();
  };

  // 搜索
  const search = () => {
    onPageChange(1);
  };
  const handleClickDel = async (row: any) => {
    const index = renderData.value.findIndex((item: any) => item.id === row.id);
    let updateJson: any = '';
    const deepCloneRenderData: any = JSON.parse(
      JSON.stringify(renderData.value)
    );
    deepCloneRenderData.splice(index, 1);
    updateJson = JSON.stringify(deepCloneRenderData);
    const { data, code } = await updateUserConfigInfo({
      userId: userStoreState.value.userId,
      greeting: updateJson,
    });
    if (code === 200) {
      getKfConfig();
      Message.success('删除成功');
    }
  };
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    let updateJson: any = '';
    const deepCloneRenderData: any = JSON.parse(
      JSON.stringify(renderData.value)
    );
    // 添加
    if (editModel.value.type === 1) {
      deepCloneRenderData.push({
        ...editModel.value,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        id: renderData.value.length + 1,
      });
    } else if (editModel.value.type === 2) {
      // 修改
      const index = deepCloneRenderData.findIndex(
        (item: any) => item.id === editModel.value.id
      );
      deepCloneRenderData[index] = {
        ...editModel.value,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };
    }

    updateJson = JSON.stringify(deepCloneRenderData);
    console.log(updateJson, deepCloneRenderData);
    const { data, code } = await updateUserConfigInfo({
      userId: userStoreState.value.userId,
      greeting: updateJson,
    });
    if (code === 200) {
      getKfConfig();
    }
    setTimeout(() => {
      done(true);
    }, 300);
  };

  onMounted(() => {
    initData();
    // 获取所有支持的语言
    const supportedLanguages = navigator.languages;
    console.log(supportedLanguages, 'supportedLanguages');
  });
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 20px 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .align-center {
    align-items: center;
    margin-bottom: 10px;
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
