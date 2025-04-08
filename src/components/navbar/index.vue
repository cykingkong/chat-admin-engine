<template>
  <div class="navbar">
    <!-- <div class="guide_overlay"></div>
    <div class="guide_highlight guide_highlight_mask"></div> -->
    <div> </div>
    <div v-if="!kfShow" class="showKf" @click="hideIcon('show')"
      ><icon-double-left />
    </div>
    <div class="left-side">
      <a-space>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" ref="menuleft" class="guideMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-popover
          position="br"
          trigger="click"
          content-class="infoContent"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: '0', border: 'none' }"
        >
          <div style="text-align: center">
            <a-space direction="vertical" fill :size="[0, 0]">
              <div class="info">
                <a-avatar
                  :size="32"
                  :style="{ marginRight: '8px', cursor: 'pointer' }"
                >
                  <icon-user />
                </a-avatar>
                <a-typography-text type="secondary">
                  <span> {{ userNickname }} </span>
                </a-typography-text>
              </div>
            </a-space>
          </div>
          <template #content>
            <div class="infoContent">
              <div class="infoBox"> 客服后台 </div>
              <div class="info">
                <div class="titleLi" @click="handleToUserInfo">
                  编辑帐号信息
                  <icon-right class="right_icon" />
                </div>
                <div class="userInfo">
                  <div class="label"> 登录账号: </div>
                  <div class="rightValue">
                    {{ userNickname }}
                  </div>
                </div>

                <div class="logoutBtn" @click="handleLogout">
                  <icon-export />
                  退出登录
                </div>
              </div>
            </div>
          </template>
        </a-popover>
      </li>
    </ul>
    <a-modal
      v-model:visible="formVisible"
      :title="'编辑帐号信息'"
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
        <a-space style="width: 100%" align="start">
          <a-card
            class="general-card"
            style="width: 400px"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{ padding: '17px 20px 21px 20px' }"
            title="用户信息"
          >
            <a-form-item
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
              v-if="userStoreState.role == 'superAdmin'"
              field=""
              label="头像"
              :rules="[
                {
                  required: true,
                  message: '',
                },
              ]"
            >
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
  import { computed, ref, inject } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useDark, useToggle, useFullscreen } from '@vueuse/core';
  import { useAppStore, useUserStore } from '@/store';
  import { LOCALE_OPTIONS } from '@/locale';
  import useLocale from '@/hooks/locale';
  import useUser from '@/hooks/user';
  import Menu from '@/components/menu/index.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { uploadFile } from '@/api/tool';
  import { memberEdit } from '@/api/settings';

  const route = useRoute();
  const iconShow = ref<boolean>(true);
  const kfShow = ref<boolean>(true);
  const router = useRouter();
  const appStore = useAppStore();
  const userStore = useUserStore();
  const userStoreState = computed(() => {
    return userStore.$state;
  });
  const userNickname = computed(() => {
    return userStore.$state.nickname;
  });
  const formVisible = ref(false);
  const fileList = ref([]);
  const editModel = ref({
    password: '',
    nickname: '',
    avatar: '',
  });
  const { logout } = useUser();
  const { changeLocale, currentLocale } = useLocale();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

  const hideIcon = (type: any) => {
    if (type === 'hide') {
      iconShow.value = false;
      setTimeout(() => {
        kfShow.value = false;
      }, 300);
    } else {
      kfShow.value = true;
      setTimeout(() => {
        iconShow.value = true;
      }, 300);
    }
  };
  const storageTotal = ref(Number(localStorage.getItem('msgTotal')));

  if (storageTotal.value === 0) {
    localStorage.setItem('msgTotal', '0');
  }

  const topMenu = computed(() => appStore.topMenu && appStore.menu);
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);

  const formRef = ref<any>();
  const refBtn = ref();
  const triggerBtn = ref();
  const handleLogout = () => {
    logout();
  };
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    const { data } = await memberEdit(editModel.value);
    await userStore.info();
    Message.success({
      content: '修改成功',
      duration: 5 * 1000,
    });
    formVisible.value = false;

    window.setTimeout(() => {
      done();
    }, 300);
  };
  const handleToUserInfo = () => {
    editModel.value = {
      avatar: userStoreState.value.avatar,
      nickname: userStoreState.value.nickname,
      password: '',
    };
    if (userStoreState.value.avatar) {
      fileList.value = [
        {
          uid: '1',
          name: userStoreState.value.avatar,
          url: userStoreState.value.avatar,
        },
      ];
    }
    formVisible.value = true;
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
  const beforeRemove = () => {
    return new Promise((resolve) => {
      fileList.value = [];
      editModel.value.avatar = '';

      resolve(true);
    });
  };
  const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;

  if (route.name !== 'datav') {
    // fetchMsgData();
  }
</script>

<style scoped lang="less">
  .guide_overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999997;
  }
  .guide_highlight_mask {
    box-shadow: 0 0 0 0 #00000099, #00000099 0 0 0 5000px;
  }
  .guide_highlight {
    z-index: 999998;
    width: 220px;
    height: calc(100% - 60px);
    top: 60px;
    left: 0;
    transition: 0.2s cubic-bezier(0, 0, 0.15, 1);
    border-radius: 8px;
    position: fixed;
  }
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background: #0006;
    top: 0;
    left: 0;
    .midBox {
      width: 572px;
      height: 642px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .text {
        position: absolute;
        bottom: 236px;
        font-size: 20px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .herfBtn {
        width: 453.6px;
        height: 84px;
        position: absolute;
        background: transparent;
        bottom: 116px;
        left: 50%;
        cursor: pointer;
        transform: translate(-50%, -50%);
      }
      .modal_img {
        transform: scale(0.8);
        width: 572px;
        height: 642px;
      }
      .close_icon {
        width: 44px;
        height: 44px;
        position: absolute;
        top: 0px;
        cursor: pointer;
        right: 22px;
        transform: scale(0.8);
      }
    }
    .midBoxShow {
      width: 0;
      height: 0;
    }
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .center-side {
    flex: 1;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;
    position: relative;
    :deep(.locale-select) {
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }

    .nav-btn {
      color: rgb(var(--gray-8));
      font-size: 16px;
      border-color: rgb(var(--gray-2));
    }

    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }

    .trigger-btn {
      margin-left: 14px;
    }
  }
  .infoContent {
    border-radius: 6px;

    .infoBox {
      width: 25.975rem;
      height: 9.1rem;
      background: linear-gradient(169deg, #6394fe 0%, #1059f5 100%);
      border-radius: 6px 6px 0px 0px;
      display: flex;
      align-items: center;
      padding: 24px;
      font-weight: 500;
      font-size: 24px;
      color: #fff;
      .moli_logo {
        width: 73px;
        height: 73px;
        border-radius: 50%;
        margin-right: 16px;
      }
    }
    .info {
      width: 100%;
      .titleLi {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        // color: #000;
        font-weight: 500;
        padding: 12px 24px 7px;
        cursor: pointer;
        .next_icon {
          width: 7.6px;
          height: 13.2px;
        }
      }
      .userInfo {
        height: 50px;
        width: 100%;
        padding: 0 24px;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        font-size: 16px;
        color: #000;
        font-weight: 500;
        border-bottom: 1px solid #c7c7c7;

        .label {
          width: 96px;
        }
        .rightValue {
          text-align: left;
          white-space: nowrap;
          width: calc(100% - 154px);
        }
        .tag {
          display: flex;
          align-items: center;
          justify-content: center;
          // margin-left: 30px;
          width: 58px;
          height: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
          // box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
          border-radius: 4px 4px 4px 4px;
          opacity: 1;
          border: 1px solid #1059f5;
        }
      }
      .logoutBtn {
        width: 100%;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 500;
        color: #000000;
        .close_icon {
          width: 16px;
          height: 16px;
          margin-right: 4px;
        }
      }
    }
  }
</style>

<style lang="less">
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }
  .service {
    // postion

    position: fixed;
    bottom: 10%;
    right: 10px;
    text-align: center;
    display: flex;
    // width: 28px;
    // height: 85px;
    border-radius: 5px;
    flex-direction: column;
    align-items: center;
    // border: 1px solid;
    color: rgb(22, 93, 255);
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
    }
    .ser_icon {
      font-size: 34px;
    }
    .kf_icon {
      width: 46px;
      height: 46px;
    }
    .service-text {
      // writing-mode: vertical-rl; /* 设置文字从上往下排列 */
      // text-orientation: upright; /* 设置文字方向为正立 */
      white-space: nowrap; /* 禁止换行 */
      font-size: 14px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #000000;
    }
    .arco-btn-icon {
      margin-right: 0 !important;
    }
    // :deep(.arco-btn-icon) {
    //   margin: 0;
    // }
  }
  .hide {
    right: -60px;
  }
  .showKf {
    position: fixed;
    color: rgb(22, 93, 255);
    bottom: 10%;
    display: flex;

    // flex-direction: column;
    // align-items: center;
    right: 0px;
    writing-mode: vertical-rl; /* 设置文字从上往下排列 */
    text-orientation: upright; /* 设置文字方向为正立 */
    white-space: nowrap; /* 禁止换行 */
    &:hover {
      cursor: pointer;
    }
  }
  .nav_btn_book {
    // margin-right: ;
  }
  .icon_weixin {
    width: 14px;
    height: 14px;
  }

  .infoContent {
    padding: 0;
    border: none;
  }
  .right_icon {
    color: rgb(var(--arcoblue-6));
  }
</style>
