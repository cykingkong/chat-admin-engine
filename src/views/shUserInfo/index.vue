<template>
  <div class="container">
    <!-- <Breadcrumb :items="['个人信息']" /> -->
    <a-card class="general-card" title="个人信息">
      <template #extra>
        <a-button
          v-if="!isEditGreeting"
          type="primary"
          @click="isEditGreeting = !isEditGreeting"
        >
          编辑
        </a-button>
      </template>
      <a-row style="margin-bottom: 16px">
        <a-form
          ref="userformRef"
          style="width: 400px"
          :model="userConfigModel"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
        >
          <a-form-item
            field="greeting"
            label="商户欢迎语"
            class="align-center"
            :show-colon="isEditGreeting"
          >
            <a-input
              v-if="isEditGreeting"
              v-model="userConfigModel.greeting"
              allow-clear
              placeholder="请填写欢迎语"
            />
            <p v-else>
              <a-space>
                {{ userConfigModel.greeting }}
              </a-space>
            </p>
          </a-form-item>
          <a-form-item
            field="nickname"
            class="align-center"
            :show-colon="isEditGreeting"
            label="商户昵称"
          >
            <a-input
              v-if="isEditGreeting"
              v-model="userConfigModel.nickname"
              allow-clear
              placeholder="请填写商户昵称"
            />
            <p v-else>
              {{ userConfigModel.nickname }}
            </p>
          </a-form-item>
          <a-form-item
            field="avatar"
            class="align-center"
            :show-colon="isEditGreeting"
            label="头像"
          >
            <a-upload
              v-if="isEditGreeting"
              :file-list="fileList"
              :limit="1"
              image-preview
              list-type="picture-card"
              :accept="'.doc,.docx,.pdf,.png'"
              :custom-request="protraitUpload"
              @before-remove="beforeRemove"
            />
            <a-image
              v-if="
                userConfigModel && userConfigModel.avatar && !isEditGreeting
              "
              :src="userConfigModel.avatar"
              width="100px"
              height="100px"
            >
            </a-image>
          </a-form-item>

          <a-form-item
            v-if="isEditGreeting"
            field="password"
            class="align-center"
            :show-colon="isEditGreeting"
            label="登陆密码"
          >
            <a-input
              v-if="isEditGreeting"
              v-model="userConfigModel.password"
              allow-clear
              placeholder="请填写登陆密码"
            />
            <p v-else>
              {{ userConfigModel.password || '-' }}
            </p>
          </a-form-item>
          <a-form-item
            v-if="isEditGreeting"
            field="password"
            class="align-center"
            label=""
          >
            <a-button
              v-if="isEditGreeting"
              type="primary"
              @click="handleClickSave"
            >
              保存
            </a-button>
          </a-form-item>
        </a-form>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { uploadFile } from '@/api/tool';

  import {
    updateUserConfigInfo,
    userConfigInfo,
    userKfConfigInfo,
    memberEdit,
  } from '@/api/settings';
  import _ from 'lodash';

  const userStore = useUserStore();
  const userStoreState = computed(() => {
    return userStore.$state;
  });
  const isEditGreeting = ref(false);
  const isEditInfo = ref(false);
  const userConfigModel = reactive({
    greeting: '',
    nickname: '',
    avatar: '',
    userId: '',
    password: '',
    status: '',
    type: 1,
  });
  const fileList = ref<any[]>([]);

  const getKfConfig = async () => {
    const { data, code } = await userConfigInfo({
      userId: userStoreState.value.userId,
    });
    if (code === 200) {
      userConfigModel.greeting = data.greeting;
    }
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

  const beforeRemove = () => {
    return new Promise((resolve) => {
      fileList.value = [];
      userConfigModel.avatar = '';
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
      userConfigModel.avatar = data.url;
    }
  };
  const handleClickSave = async () => {
    let flag = true;
    const { data, code } = await updateUserConfigInfo(userConfigModel);
    if (code !== 200) {
      flag = false;
    }
    const { data: data1, code: code1 } = await memberEdit(userConfigModel);
    if (code1 !== 200) {
      flag = false;
    }
    if (flag) {
      Message.success('保存成功');
      isEditGreeting.value = false;
      await userStore.info();
      initData();

      isEditInfo.value = false;
    } else {
      Message.error('保存失败');
    }
  };
  onMounted(() => {
    initData();
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
