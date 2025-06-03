<template>
  <div class="login-form-wrapper">
    <!-- <div class="logo">
      

    </div>  -->
    <div class="login-form-title">
      <div class="titleFlexBox">
        <span
          v-for="(i, k) in loginTitleList"
          :key="k"
          class="textBox"
          :class="loginActive === k ? 'activeText' : ''"
          @click="loginTypeChange(k)"
        >
          {{ i }}
        </span>
      </div>
    </div>

    <!-- <div class="login-form-sub-title">{{ $t('login.form.title') }}</div> -->
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-asterisk
      >
        <!-- <template #label> <div class="formLabel"> 账号 </div> </template> -->
        <a-input
          v-model="userInfo.username"
          placeholder="请输入账号"
          class="upai_input"
        >
          <!-- <template #prefix>
            <icon-user />
          </template> -->
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-asterisk
      >
        <!-- <template #label> <div class="formLabel">密码 </div> </template> -->

        <a-input-password
          v-model="userInfo.password"
          placeholder="请输入密码"
          allow-clear
          class="upai_input"
        >
        </a-input-password>
      </a-form-item>
      <a-form-item
        v-if="loginType == 2"
        field="code"
        :validate-trigger="['change', 'blur']"
        hide-asterisk
      >
        <!-- <template #label> <div class="formLabel">密码 </div> </template> -->

        <a-input
          v-model="userInfo.code"
          placeholder="请输入商户二次验证码"
          allow-clear
          class="upai_input"
        >
        </a-input>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword"
          >
            <span style="color: #0c2963">
              {{ $t('login.form.rememberPassword') }}</span
            >
          </a-checkbox>
        </div>
        <a-button
          type="primary"
          html-type="submit"
          long
          :loading="loading"
          class="loginBtn"
        >
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import { LoginData, login, smsLogin, sendSms, getUserAuth } from '@/api/user';
  import { getCaptcha, resetPassword } from '@/api/member';
  import { setToken } from '@/utils/auth';
  import Validate from './NC.vue';

  const loginActive = ref(0);
  const iconShow = ref(false);
  const iconEditShow = ref(false);
  const pwdIconShow = ref(false);
  const pwdEditIconShow = ref(false);
  const passIcon = ref(true);
  const passEditIcon = ref(true);
  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const loginTitleList = ref(['密码登录', '商户登陆']);
  const loginType = ref(1);
  const loginText = ref('登录');
  const buttonText = ref('注册');
  const buttonText2 = ref('已有账号');
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: null, // 演示默认值
    password: null, // demo default value
  });
  const sendCodeTips = ref('获取手机验证码');
  const getImgCode = ref('获取图片验证码');
  const codeImgUrl = ref('');
  const countdown = ref(60);
  const disable = ref<boolean>(false);
  const logonForm = reactive({
    phone: '',
    verificationCode: '',
    memberPassword: '',
    memberPasswordCheck: '',
    token: '',
  });
  const editForm = reactive({
    phone: '',
    verificationCode: '',
    memberPassword: '',
    memberPasswordCheck: '',
    token: '',
  });
  const userInfo = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
    code: null,
  });
  const resetEditForm = () => {
    loginType.value = 4;
    buttonText.value = '修改密码';
    editForm.phone = '';
    editForm.verificationCode = '';
    editForm.memberPassword = '';
    editForm.memberPasswordCheck = '';
    editForm.token = '';
  };
  const merchantToken = ref();
  function GetQuery(e: any) {
    let R: any = new RegExp(`(^|&)${e}=([^&]*)(&|$)`, 'i');
    console.log(window);
    let n = window.location.href.substr(1).match(R);
    let a = '';
    // eslint-disable-next-line no-return-assign
    return (
      n != null && (a = decodeURIComponent(n[2])),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (R = null),
      (n = null),
      // eslint-disable-next-line eqeqeq
      a == null || a == '' || a == 'undefined' ? '' : a
    );
  }

  const toLogin = () => {
    loginType.value = 1;
    loginActive.value = 0;
    console.log(editForm, 'toLogin');
  };
  const loginTypeChange = (k: any) => {
    userInfo.password = null;
    userInfo.username = null;
    userInfo.code = null;
    if (loginType.value <= 2) {
      loginActive.value = k;
      loginType.value = k ? 2 : 1;
      buttonText.value = '登录';
    }
  };
  const dynamicLoadJs = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      script.onload = () => {
        resolve();
      };

      script.onerror = () => {
        reject(new Error(`Failed to load script: ${url}`));
      };

      document.head.appendChild(script);
    });
  };
  dynamicLoadJs('//captcha.luosimao.com/static/js/api.js');
  if (GetQuery('auth_key')) {
    loginTitleList.value = ['注册'];
    loginType.value = 3;
  }
  if (GetQuery('auth_code')) {
    merchantToken.value = GetQuery('auth_code');
    userStore.SSOLogin(merchantToken.value);
    localStorage.setItem('waitReload', '1');
    const { redirect, ...othersQuery } = router.currentRoute.value.query;

    router.push({
      name: (redirect as string) || 'Workplace',
      query: {
        ...othersQuery,
      },
    });

    // window.location.reload();
  }
  function resetValidate() {
    logonForm.token = '';
    editForm.token = '';
    // eslint-disable-next-line
    LUOCAPTCHA && LUOCAPTCHA.reset();
  }
  const setTime = () => {
    if (countdown.value === 0) {
      sendCodeTips.value = '获取手机验证码';

      disable.value = false;

      resetValidate();
      validateVisible.value = false;
    } else {
      // eslint-disable-next-line no-plusplus
      countdown.value--;
      sendCodeTips.value = `${countdown.value}s后重新发送`;
      disable.value = true;
    }
    setTimeout(() => {
      setTime();
    }, 1000);
  };
  const checkPassword = (type: string) => {
    if (type === 'logon') {
      if (!iconShow.value) iconShow.value = true;
      const memberPasswordCheck = logonForm.memberPasswordCheck.trim();
      const memberPassword = logonForm.memberPassword.trim();
      console.log(memberPasswordCheck, memberPassword);
      if (memberPasswordCheck === memberPassword) {
        passIcon.value = true;
      } else {
        passIcon.value = false;
      }
    } else if (type === 'edit') {
      if (!iconEditShow.value) iconEditShow.value = true;
      const memberPasswordCheck = editForm.memberPasswordCheck.trim();
      const memberPassword = editForm.memberPassword.trim();
      passEditIcon.value = memberPasswordCheck === memberPassword;
    }
  };
  const checkPwd = (type: string) => {
    if (type === 'logon') {
      if (!pwdIconShow.value) pwdIconShow.value = true;
      if (logonForm.memberPasswordCheck.trim()) {
        checkPassword(type);
      }
    } else if (type === 'edit') {
      if (!pwdEditIconShow.value) pwdEditIconShow.value = true;
      if (editForm.memberPasswordCheck.trim()) {
        checkPassword(type);
      }
    }
  };
  const validateVisible = ref<boolean>(false);
  const sendMessage = async () => {
    if (!logonForm.phone) {
      Message.info('请先输入手机号码');
      return;
    }
    // if (!logonForm.imgCode) {
    //   Message.info('请先输入验证码');
    //   return;
    // }
    if (!/^1[3456789]\d{9}$/.test(logonForm.phone)) {
      Message.info('手机号码有误，请重填');
      return;
    }
    if (logonForm.token) {
      sendSms({
        tel: logonForm.phone,
        token: logonForm.token,
      })
        .then(({ data }) => {
          if (data) {
            Message.success('发送验证码成功，请注意查收');
            sendCodeTips.value = '';
            setTime();
          }
        })
        .catch((err) => {
          resetValidate();
        });
    }
    validateVisible.value = true;
  };
  const sendEditMessage = async () => {
    if (!editForm.phone) {
      Message.info('请先输入手机号码');
      return;
    }
    // if (!logonForm.imgCode) {
    //   Message.info('请先输入验证码');
    //   return;
    // }
    if (!/^1[3456789]\d{9}$/.test(editForm.phone)) {
      Message.info('手机号码有误，请重填');
      return;
    }
    if (editForm.token) {
      sendSms({
        tel: editForm.phone,
        token: editForm.token,
        resetPassword: true,
      })
        .then(({ data }) => {
          if (data) {
            Message.success('发送验证码成功，请注意查收');
            sendCodeTips.value = '';
            setTime();
          }
        })
        .catch((err) => {
          resetValidate();
        });
    }
    validateVisible.value = true;
  };
  async function SetToken(resp: any) {
    countdown.value = 60;
    if (loginType.value === 4) {
      editForm.token = resp;
      const { data } = await sendSms({
        tel: editForm.phone,
        token: editForm.token,
        resetPassword: true,
      });
      if (data) {
        Message.success('发送验证码成功，请注意查收');
        sendCodeTips.value = '';
        setTime();
      }
      return;
    }
    logonForm.token = resp;

    const { data } = await sendSms({
      tel: logonForm.phone,
      token: logonForm.token,
    });
    if (data) {
      Message.success('发送验证码成功，请注意查收');
      sendCodeTips.value = '';
      setTime();
    }
  }

  const getImgCodeUrl = async () => {
    getImgCode.value = '刷新图片验证码';
    const { data } = await getUserAuth({ userId: 0 });
    console.log(data);
    codeImgUrl.value = data.data;
    logonForm.codeId = data.id;
  };
  const handleSubmitEdit = async ({ errors }) => {
    if (!errors) {
      if (!passEditIcon.value) {
        Message.error('请确认两次密码无误');

        return;
      }
      const req = {
        tel: editForm.phone,
        code: editForm.verificationCode,
        memberPassword: editForm.memberPassword,
      };
      const { data, code } = await smsLogin(req);
      if (code === 200) {
        Message.success('修改密码成功');
        loginConfig.value.password = editForm.memberPassword;
        loginConfig.value.username = editForm.phone;
        userInfo.username = loginConfig.value.username;
        userInfo.password = loginConfig.value.password;

        loginType.value = 1;
      }
    }
  };
  // getImgCodeUrl();
  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        if (loginType.value === 1 || loginType.value === 2) {
          await userStore.login(values as LoginData);

          const { rememberPassword } = loginConfig.value;
          const { username, password } = values;
          // 实际生产环境需要进行加密存储。
          // The actual production environment requires encrypted storage.
          loginConfig.value.username = rememberPassword ? username : '';
          loginConfig.value.password = rememberPassword ? password : '';
        }

        const { redirect, ...othersQuery } = router.currentRoute.value.query;

        router.push({
          name:
            (redirect as string) || loginType.value === 1
              ? 'adminList'
              : 'quickReply',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
      } catch (err) {
        console.log(err);

        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .logo {
    display: block;
    margin: 0 auto;
    z-index: 1;
    align-items: center;
    position: relative;
    top: 32px;
    width: 225px;
    height: 169px;
    img {
      width: 100%;
      height: 100%;
    }
    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
  .login-form {
    &-wrapper {
      width: 420px;
      position: relative;
      background: #fff;
      padding: 48px;
    }

    &-title {
      color: #0000007d;
      font-weight: bold;
      font-size: 20px;
      line-height: 20px;
      .titleFlexBox {
        display: flex;
        align-items: center;
        .textBox {
          display: block;
          margin-right: 48px;
          cursor: pointer;
        }
        .activeText {
          color: #0c2963;
          position: relative;
          &::before {
            content: '';
            width: 30px;
            height: 4px;
            border-radius: 2px;
            background: #0c2963;
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
  .formLabel {
    font-size: 16px;
    font-weight: 400;
    color: #0c2963;
  }
  .upai_input:focus-within {
    border: 2px solid #13274c;
  }
  .icon {
    width: 17px;
    height: 17px;
  }
  .upai_input {
    height: 40px !important;
    border-radius: 6px;
    font-size: 14px !important;
    font-weight: 400;
    :deep(.arco-input) {
      font-size: 14px !important;
    }
    // background: transparent;
    // border: 2px solid rgba(19, 39, 76, 0.51);
    :deep(.arco-input-wrapper) {
      height: 100% !important;
      border-radius: 6px;
      box-sizing: border-box;
      // background: transparent;
    }
    :deep(.arco-input-append) {
      // background: transparent;
      border-left: none;
    }
    :deep(.arco-input-wrapper):focus-within {
      // background: transparent;

      border: 1px solid transparent;
    }
    :deep(.arco-input-append) {
      .arco-btn {
        height: 40px !important;
        background: #13274c;
        border-radius: 0 6px 6px 0;
      }
      .arco-btn:hover {
        background: #224688;
      }
    }
  }
  .upai_input::placeholder {
    color: #0c2963;
    font-size: 20px !important;
    font-weight: 400;
  }
  .loginBtn {
    background: #13274c;
    height: 40px !important;
    border-radius: 6px;
    font-size: 14px !important;
  }
  .loginBtn:hover {
    background: #224688;
  }
  .fontColorClass {
    color: #224688 !important;
    font-weight: bold;
    font-size: 14px;
  }
</style>
