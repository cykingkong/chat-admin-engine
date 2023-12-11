<!-- eslint-disable consistent-return -->
<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '账号信息']" />
    <div v-if="userStore.$state.userInfo" class="upai_content_outsideBox">
      <div class="upai_title"> 账号信息 </div>
      <div class="infoLiBox">
        <div class="infoContent">
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              登录账号
            </div>
            <div class="upai_value">
              {{
                userStore.$state.userInfo.memberDepId
                  ? userStore.$state.userInfo.memberAccount
                  : userStore.$state.memberAccount
              }}
              <div class="tag">
                {{
                  userStore.$state.userInfo.memberDepId ? '子账号' : '主账号'
                }}</div
              >
            </div>
          </div>
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              用户昵称
            </div>
            <div class="upai_value">
              {{
                userStore.$state.userInfo.memberDepId
                  ? userStore.$state.userInfo.memberNickname
                  : userStore.$state.memberNickname
              }}

              <img
                src="https://img.adyinqing.com/upai_shop/9smqxylj1688096316299"
                alt=""
                class="edit_icon"
                @click="handleClickEdit(2)"
              />
            </div>
          </div>
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              手机号
            </div>
            <div class="upai_value">
              {{ userInfo.memberPhone }}
            </div>
          </div>
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              公众号绑定
            </div>
            <div
              class="upai_value"
              :class="userInfo.userInfo.gzhOpenid ? '' : 'bd'"
              @click="handleClickGzhEwm"
            >
              {{ userInfo.userInfo.gzhOpenid ? '已绑定' : '未绑定' }}

              <img
                v-if="!userInfo.userInfo.gzhOpenid"
                src="https://img.adyinqing.com/upai_shop/skj65c1l1689818905635"
                alt=""
                class="right_icon"
              />
            </div>
          </div>
        </div>
        <div class="infoContent">
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              密码
            </div>
            <div class="upai_value">
              xxxxxxxx
              <img
                src="https://img.adyinqing.com/upai_shop/9smqxylj1688096316299"
                alt=""
                class="edit_icon"
                @click="handleClickEdit(1)"
              />
            </div>
          </div>
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              注册时间
            </div>
            <div class="upai_value">
              {{ userInfo.createdAt }}
            </div>
          </div>
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              账号有效期
            </div>
            <div class="upai_value">
              {{ userInfo.memberExpiredAt }}
            </div>
          </div>
        </div>
        <div class="infoContent">
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              添加视频号数量
            </div>
            <div class="upai_value">
              {{ userInfo.sphCount }}/
              {{ userInfo.memberSphCount }}
              <!-- {{
                sysConfig[sysConfigMemberLevelSphCount[userInfo.memberLevel]]
              }} -->
            </div>
          </div>
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              添加小店数量
            </div>
            <div class="upai_value">
              {{ userInfo.merchantCount }}/
              {{ userInfo.merchantLevelCount }}
              <!-- {{
                sysConfig[sysConfigMemberLevelCount[userInfo.memberLevel]]
              }} -->
            </div>
          </div>
          <div class="infoLi">
            <div class="upai_label">
              <span class="borderLeft"></span>
              客服数量
            </div>
            <div class="upai_value"> 0/0 </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userStore.$state.userInfo" class="upai_content_outsideBox">
      <div class="upai_title"> 分享邀请 </div>
      <div class="shareLink">
        <a-space :size="0">
          <div class="shareLabel" style="margin-right: 18px">邀请链接</div>
          <a-typography-text
            type="primary"
            style="
              cursor: pointer;
              font-size: 16px;
              font-weight: 500;
              color: #1059f5;
              margin-right: 4px;
            "
            class="link"
          >
            {{ userInfo.shareLink }}
          </a-typography-text>
          <img
            src="https://img.adyinqing.com/upai_shop/1bqpa23n1688104315393"
            alt=""
            class=""
            style="margin-right: 18px; cursor: pointer"
            @click="openLink"
          />
          <a-button type="primary" size="small" @click="handleDouwnLoad()">
            下载分享海报
          </a-button>
        </a-space>
      </div>
      <div class="shareLink" style="margin-top: 12px">
        <a-space :size="0">
          <div class="shareLabel" style="width: 56px; margin-right: 18px"
            >邀请码</div
          >
          <a-typography-text class="link" style="margin-right: 4px">
            {{ userInfo.payShareCode }}
          </a-typography-text>
          <img
            src="https://img.adyinqing.com/upai_shop/1bqpa23n1688104315393"
            alt=""
            class=""
            style="margin-right: 18px; cursor: pointer"
            @click="copyCode"
          />
        </a-space>
      </div>
      <div v-if="false" class="shareContentBox">
        <div class="shareBox">
          <div class="shareLeft">
            <div class="shareNum">10</div>
            <div class="shareLabel"> 邀请总数 </div>
          </div>
          <div class="shareRight">
            <ul>
              <li>
                <div class="liLeft"><span class="d"></span> 体验卡 </div>
                <span>10</span></li
              >
              <li>
                <div class="liLeft"><span class="d"></span> 年卡 </div>
                <span>10</span></li
              >
              <li>
                <div class="liLeft"><span class="d"></span> 即将到期 </div>
                <span>10</span></li
              >
            </ul>
            <ul>
              <li>
                <div class="liLeft"><span class="d"></span> 季卡 </div>
                <span>10</span></li
              >
              <li>
                <div class="liLeft"><span class="d"></span> 已过期 </div>
                <span>10</span></li
              >
              <li>
                <div class="liLeft"><span class="d"></span> 二级激活 </div>
                <span>10</span></li
              >
            </ul>
          </div>
        </div>

        <div class="shareBox">
          <div class="shareLeft">
            <div class="shareNum">122</div>
            <div class="shareLabel"> 实付总金额(¥) </div>
          </div>
          <div class="shareRight">
            <ul>
              <li>
                <div class="liLeft"><span class="d"></span> 未结算 </div>
                <span>10</span></li
              >
              <li>
                <div class="liLeft"><span class="d"></span> 一级 </div>
                <span>10</span></li
              >
            </ul>
            <ul>
              <li>
                <div class="liLeft"><span class="d"></span> 已结算 </div>
                <span>10</span></li
              >
              <li>
                <div class="liLeft"><span class="d"></span> 二级 </div>
                <span>10</span></li
              >
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="userStore.$state.userInfo" class="upai_content_outsideBox">
      <div class="upai_title title_flex">
        邀请记录
        <div class="right" @click="toShareLinkPage">查看详情</div>
      </div>
      <a-table
        row-key="id"
        :pagination="false"
        :loading="loading"
        :data="renderData"
        :hoverable="true"
        :stripe="false"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="昵称" align="center">
            <template #cell="{ record }">{{
              record.shareMemberInfo ? record.shareMemberInfo.memberPhone : '-'
            }}</template>
          </a-table-column>
          <a-table-column title="手机号码" align="center">
            <template #cell="{ record }">{{
              record.shareMemberInfo ? record.shareMemberInfo.memberPhone : '-'
            }}</template>
          </a-table-column>
          <a-table-column title="实付金额" align="center">
            <template #cell="{ record }">{{
              record.payPrice ? record.payPrice : '-'
            }}</template>
          </a-table-column>
          <a-table-column title="账号类型" align="center">
            <template #cell="{ record }">
              <a-tag color="arcoblue">
                {{
                  record.shareMemberInfo
                    ? memberLevel[record.shareMemberInfo.memberLevel]
                    : '-'
                }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="绑定状态" align="center">
            <template #cell="{ record }">
              {{ record.bindStatus ? bindStatus[record.bindStatus] : '-' }}
            </template>
          </a-table-column>
          <a-table-column
            v-if="userInfo.memberChannel === 2"
            title="二级邀请"
            align="center"
          >
            <template #cell="{ record }">
              {{ record.shareCount }}
            </template>
          </a-table-column>
          <a-table-column title="创建时间" align="center">
            <template #cell="{ record }">{{ record.createdAt }}</template>
          </a-table-column>
          <a-table-column title="使用过期时间" align="center">
            <template #cell="{ record }">{{
              record.shareMemberInfo
                ? record.shareMemberInfo.memberExpiredAt
                : '-'
            }}</template>
          </a-table-column>
          <a-table-column title="备注" align="center">
            <template #cell="{ record }">
              <a-space :size="8">
                {{ record.remark || '-' }}
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <div class="pagination">
        <div></div>
        <div>
          <a-pagination
            v-model:current="pagination.pageIndex"
            v-model:page-size="pagination.pageSize"
            :total="Number(pagination.total)"
            :show-total="true"
            :show-page-size="true"
            :page-size="pageSize"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="onPageChange"
            @page-size-change="pageSizeChange"
          />
        </div>
      </div>
    </div>

    <a-modal
      v-model:visible="editVisible"
      :title="editTitle"
      @cancel="editVisible = false"
      @before-ok="handleBeforeOk"
    >
      <a-form
        :model="editModel"
        label-align="left"
        auto-label-width
        layout="horizontal"
      >
        <a-form-item
          v-if="editModel.type === 1"
          field="memberPassword"
          label="新密码"
          label-col-flex="60px"
        >
          <a-input
            v-model="editModel.memberPassword"
            placeholder="请输入您的新密码"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          v-if="editModel.type === 1"
          field="passwordAgain"
          label="再次确认"
          label-col-flex="60px"
        >
          <a-input
            v-model="editModel.passwordAgain"
            placeholder="请再次输入您的新密码"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          v-if="editModel.type === 2"
          field="memberNickname"
          label="用户昵称"
          label-col-flex="60px"
        >
          <a-input
            v-model="editModel.memberNickname"
            placeholder="请输入您的用户昵称"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <div v-if="ewmVisible" class="mark" @click="closeGzhEwm">
      <div class="midBox" :class="midShow ? 'open' : ''">
        <img
          src="https://img.adyinqing.com/upai_shop/x2o5p1ld1690165299872"
          style="
            position: absolute;
            right: 24px;
            top: 24px;
            width: 15px;
            height: 15px;
          "
          @click="closeGzhEwm"
        />
        <a-row justify="center" align="center" style="margin-top: 29px">
          <a-col>
            <a-space direction="vertical" style="width: 100%" align="center">
              <div class="qrcodeBorder">
                <QrcodeVue
                  v-if="qrcodeValue"
                  :value="qrcodeValue"
                  :size="140"
                  level="H"
                />
              </div>
              <a-button type="primary" size="small" style="margin: 0 auto">
                扫码关注 开启公众号提醒
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </div>
    </div>
    <!-- <a-divider v-if="false" style="margin-top: 0" />
    <a-card v-if="false" class="general-card" title="" style="margintop: 10px">
      <a-tabs lazy-load>
        <a-tab-pane key="1" title="基本信息">
          <a-card class="general-card">
            <template #title>
              <a-space :size="18" align="baseline">
                <h1 style="font-size: 24px; margin: 0"> 基本信息 </h1>
              </a-space>
            </template>
            <a-form
              :model="editModel"
              label-align="left"
              auto-label-width
              layout="horizontal"
            >
              <a-form-item
                field="memberNickname"
                label="用户昵称"
                label-col-flex="60px"
              >
                <a-input
                  v-model="editModel.memberNickname"
                  :style="{ width: '320px' }"
                  placeholder="请输入用户昵称"
                  allow-clear
                />
              </a-form-item>

              <a-form-item
                field="linkPhone"
                label="登录密码"
                label-col-flex="60px"
              >
                <a-input
                  v-model="editModel.memberPassword"
                  placeholder="已设置。密码至少6位宇符，支持数宇、字母和除空格外的特殊字符，旦必须同时包含数字和大小写宇母。"
                  allow-clear
                />
              </a-form-item>

              <a-form-item field="msg" label="消息配置" label-col-flex="60px">
                <a-checkbox-group v-model="editModel.memberMsgArr">
                  <a-checkbox value="1" :disabled="level === 1"
                    >账号离线通知</a-checkbox
                  >
                  <a-checkbox value="2" :disabled="level === 1"
                    >商品爆单通知</a-checkbox
                  >
                  <a-checkbox value="3" :disabled="level === 1"
                    >计划关停通知</a-checkbox
                  ><a-checkbox value="4" :disabled="level === 1"
                    >异常关停通知</a-checkbox
                  >
                </a-checkbox-group>
                <template v-if="level === 1" #extra>
                  <div
                    >此账号暂无消息推送权限

                    <a-link @click="showQr">联系商务，升级权限</a-link></div
                  >
                </template>
              </a-form-item>
              <a-form-item
                field="link"
                label="公众号提醒"
                label-col-flex="60px"
              >
                <a-image
                  width="150"
                  fit="cover"
                  src="https://img.adyinqing.com/upai_shop/lt8nfiqa1686277261912"
                />

                <template #extra>
                  <div style="padding-left: 5px">
                    扫码关注，开启公众号提醒
                  </div>
                </template>
              </a-form-item>
              <a-form-item field="link" label="客服链接" label-col-flex="60px">
                <a-tag color="arcoblue" class="tag">
                  <a-typography-text type="primary" copyable>
                    http://moli.upaicm.com/merchant/index.html?authCode={{
                      authKey
                    }}</a-typography-text
                  >
                </a-tag>
                <template #extra>
                  <div>复制该链接，前往企业微信配置</div>
                </template>
              </a-form-item>
              <a-form-item>
                <a-space>
                  <a-button type="primary" @click="submitEdit">提交</a-button>
                </a-space>
              </a-form-item>
            </a-form>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" title="数据管理">
          <a-form
            :model="reqModel"
            label-align="left"
            auto-label-width
            layout="horizontal"
          >
            <a-card class="general-card">
              <template #title>
                <a-space :size="18" align="baseline">
                  <h1 style="font-size: 24px; margin: 0"> 账号数据 </h1>
                  <a-typography-text type="secondary">
                    可同步此账号在官方创建的计划数据
                  </a-typography-text>
                </a-space>
              </template>
              <a-form-item label="投放号" label-col-flex="60px">
                <a-select
                  v-model="reqModel.sphId"
                  placeholder="可输入模糊搜索"
                  :allow-search="{ retainInputValue: true }"
                  :style="{ width: '320px' }"
                  allow-clear
                  @search="sphGridSearch"
                >
                  <a-option
                    v-for="(item, key) in sphGridList"
                    :key="key"
                    :label="item.sphName"
                    :value="item.sphId"
                  />
                </a-select>
              </a-form-item>
              <a-form-item label="" label-col-flex="60px">
                <a-radio-group v-model="reqModel.days" :default-value="1">
                  <a-radio :value="1">
                    <template #radio="{ checked }">
                      <a-tag :checked="checked" color="arcoblue" checkable
                        >当日</a-tag
                      >
                    </template>
                  </a-radio>
                  <a-radio :value="2">
                    <template #radio="{ checked }">
                      <a-tag :checked="checked" color="arcoblue" checkable
                        >近2天</a-tag
                      >
                    </template>
                  </a-radio>
                  <a-radio :value="3">
                    <template #radio="{ checked }">
                      <a-tag :checked="checked" color="arcoblue" checkable
                        >近3天</a-tag
                      >
                    </template>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="" label-col-flex="60px">
                <a-radio-group v-model="reqModel.syncType" :default-value="1">
                  <a-radio :value="1">短视频</a-radio>
                  <a-radio :value="2">直播间</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="" label-col-flex="60px">
                <a-space>
                  <a-button
                    type="primary"
                    size="small"
                    @click="handleClickSync()"
                  >
                    同步数据
                  </a-button>
                  <a-typography-text type="secondary">
                    （预计1小时内，同步完成）
                  </a-typography-text>
                </a-space>
              </a-form-item>
            </a-card>
            <a-card v-if="false" class="general-card">
              <template #title>
                <a-space :size="18" align="baseline">
                  <h1 style="font-size: 24px; margin: 0"> 平台数据迁移 </h1>
                  <a-typography-text type="secondary">
                    跨平台迁移自定义计划包、计划分组等数据
                  </a-typography-text>
                </a-space>
              </template>
              <a-form-item
                field="memberNickname"
                label="工具名称"
                label-col-flex="60px"
              >
                <a-input
                  :style="{ width: '320px' }"
                  placeholder="请输入工具名称"
                  allow-clear
                />
              </a-form-item>
              <a-form-item
                field="memberNickname"
                label="子账号"
                label-col-flex="60px"
              >
                <a-space :size="10">
                  <a-input
                    :style="{ width: '320px' }"
                    placeholder="请输入子账号"
                    allow-clear
                  />
                  <a-input
                    :style="{ width: '320px' }"
                    placeholder="请输入字账号密码"
                    allow-clear
                  />
                </a-space>
              </a-form-item>
              <a-form-item
                field="memberNickname"
                label=""
                label-col-flex="60px"
              >
                <a-space direction="vertical">
                  <a-typography-text style="display: block">
                    温馨提示：
                  </a-typography-text>
                  <a-typography-text style="display: block">
                    1.魔力智投只会对数据进行迁移，不会进行任何无关操作，请放心提交
                  </a-typography-text>
                  <a-typography-text style="display: block">
                    2.迁移时间一般为1个工作日，可
                    <a-typography-text
                      type="primary"
                      style="cursor: pointer"
                      @click="kf"
                    >
                      联系客服 </a-typography-text
                    >查看进度
                  </a-typography-text>
                  <a-button
                    type="primary"
                    size="small"
                    @click="handleClickSync()"
                  >
                    同步数据
                  </a-button>
                </a-space>
              </a-form-item>
            </a-card>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card> -->
    <canvas ref="canvas" height="2208" width="1242" class="canvasHB"></canvas>
    <canvas ref="canvasEwm" height="203" width="203" class="canvasEwm"></canvas>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, h, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    memberLevel,
    sysConfigMemberLevelCount,
    sysConfigMemberLevelSphCount,
    bindStatus,
  } from '@/utils/enum';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { getUserInfo, updateUser } from '@/api/user';
  import { sphGrid } from '@/api/sph';
  import { useRoute, useRouter } from 'vue-router';
  import { asyncAllData, asyncLiveAllData } from '@/api/plant';
  import { useAppStore, useUserStore } from '@/store';
  import {
    shareGrid,
    getSysConfig,
    getShareQrcode,
    getGetGzhQrCode,
  } from '@/api/member';

  import dayjs from 'dayjs';
  import _ from 'lodash';
  import Qrcode from 'qrcode';
  import QrcodeVue from 'qrcode.vue';
  import copy from '@/utils/copy';

  const canvas = ref();
  const canvasEwm = ref();
  const renderData = ref<any[]>([]);
  const generateFormModel = () => {
    return {};
  };
  onMounted(() => {});
  const formModel = ref(generateFormModel());
  const userStore = useUserStore();
  const userInfo = ref(userStore.$state);
  const sysConfig = ref(userStore.$state.sysConfig);
  const getQrcodeUrl2 = () => {
    return new Promise((reslove) => {
      getGetGzhQrCode().then((response) => {
        reslove(response.data);
      });
    });
  };
  const ewmVisible = ref(false);
  const midShow = ref(false);
  const qrcodeValue = ref('');

  const qrcodeToken = ref('');
  // page
  const basePagination: Pagination = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
  };

  const pagination = reactive({
    ...basePagination,
  });
  const router = useRouter();
  const authKey = ref();
  const expandedKeys = ref<any>([]);
  const selectArr = ref<any>([]);
  const level = ref(0);
  const editFormModel = () => {
    return {
      memberNickname: '',
      memberPassword: '',
      memberMsgArr: [],
      memberMsg: '',
      memberUserId: undefined,
      passwordAgain: '',
      type: 1,
    };
  };
  const getQrcodeUrl = () => {
    return new Promise((reslove) => {
      getShareQrcode().then((response) => {
        reslove(response.data);
      });
    });
  };
  const openLink = () => {
    copy(`
    【魔力智投】
  视频号微信豆、智能投放工具，让你轻松突破ROI瓶颈~

  ${userInfo.value.shareLink}
  -------
  点击即刻免费使用
  邀请码：${userInfo.value.payShareCode}
    `);
    Message.success('复制邀请链接成功');
  };
  const copyCode = () => {
    copy(`${userInfo.value.payShareCode}`);
    Message.success('复制邀请码成功');
  };
  const handleDouwnLoad = async () => {
    const canvasEWM = canvasEwm.value;
    const context = canvasEWM.getContext('2d');
    /**
     * 首先获取二维码卡片的url，然后将其用canvas绘制到第一个canvas上。
     * 然后使用toDataURL将第一个canvas转为url
     * 再去另一个canvas里面绘制海报背景图，并将二维码也画进第二个canvas里面，也是使用new Image()
    
    */
    const { url } = await getQrcodeUrl(); // 替换为你要生成的 QR Code 的内容
    const qrCodeValue = url;
    const options = {
      width: 217,
      height: 217,
      margin: 1, // 自定义白边大小，单位为像素
    };
    Qrcode.toCanvas(canvasEWM, qrCodeValue, options, (error) => {
      if (error) {
        console.error(error);
        return Message.error('未知错误。请联系管理员');
      }
      return true;
    });

    const ctx = canvas.value.getContext('2d');

    const image = new Image();
    const ewmImage = new Image();

    const ewmUrl = canvasEwm.value.toDataURL();
    image.crossOrigin = 'anonymous';
    ewmImage.crossOrigin = 'anonymous';
    image.src =
      'https://img.adyinqing.com/upai_shop/9v1aqkll1702023948418~sj.image.info';
    // image.src = 'https://img.adyinqing.com/upai_shop/dur9t9jr1689148103960';
    // image.src = 'https://img.adyinqing.com/upai_shop/ttzy6jql1689143784055';
    ewmImage.src = ewmUrl;
    image.addEventListener('load', () => {
      ctx.drawImage(image, 0, 0);
      ctx.drawImage(ewmImage, 239, 1505);
      // ctx.drawImage(ewmImage, 392, 2024);
      ctx.stroke();
      const dataURL = canvas.value.toDataURL();
      const link = document.createElement('a');
      link.download = '魔力智投邀请二维码';

      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
    });
  };

  const editModel = ref(editFormModel());
  const reqModel = reactive({
    sphId: undefined,
    days: 1,
    syncType: 1,
  });
  const infoArr = ref<any>([
    { label: '登录账号', key: 'memberAccount', value: '' },
    { label: '用户昵称', key: 'memberNickname', value: '' },
    { label: '手机号', key: 'memberPhone', value: '' },

    { label: '注册时间', key: 'createdAt', value: '' },
    { label: '账户有效期', key: 'memberExpiredAt', value: '' },
  ]);
  const merchantInfoArr = ref<any>([]);
  const sphGridList = ref<any>([]);
  const editTitle = ref('修改密码');
  // 脱敏
  // eslint-disable-next-line consistent-return
  const encryptPublic = (str: any, kind: any) => {
    if (!str) return '';
    if (kind === 'name') {
      return `${str.substr(0, 1)}*`;
    }
    if (kind === 'idcard') {
      return str.replace(/^(.{6})(?:\d+)(.{4})$/, '$1********$2');
    }
    if (kind === 'phone') {
      return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
  };
  const editVisible = ref(false);
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const getUser = async () => {
    const { data } = await getUserInfo();
    console.log(data, 156456);
    userInfo.value = data;
    authKey.value = data.authKey;
    level.value = data.memberLevel;
    infoArr.value.forEach((el: any) => {
      if (el.key === 'memberPhone') {
        el.value = encryptPublic(String(data[el.key]), 'phone');
      } else {
        el.value = data[el.key];
      }
    });

    editModel.value.memberNickname = data.memberNickname;
    if (data.memberMsg) {
      editModel.value.memberMsgArr = data.memberMsg.split(',') || [];
    }
  };
  const toShareLinkPage = () => {
    router.push({
      name: 'shareLink',
    });
  };
  const sphGridSearch = async (params: any) => {
    const { data } = await sphGrid({
      pageIndex: 1,
      pageSize: 100,
      sphName: params,
    });
    sphGridList.value = data.grid || [];
  };
  // sphGridSearch('');
  const handleClickGzhEwm = () => {
    if (!userInfo.value.userInfo.gzhOpenid) {
      ewmVisible.value = true;
      setTimeout(() => {
        midShow.value = true;
      }, 100);
      getQrcodeUrl2().then((res: any) => {
        console.log(res.url);
        qrcodeValue.value = res.url;
      });
    }
  };
  const closeGzhEwm = () => {
    midShow.value = false;

    setTimeout(() => {
      ewmVisible.value = false;
    }, 100);
  };
  const handleClickSync = async () => {
    if (!reqModel.sphId) {
      Message.info('请选择想要同步的投放号');
      return;
    }
    if (!reqModel.days) {
      Message.info('请选择想要同步的时长');
      return;
    }
    if (reqModel.syncType === 1) {
      const { data, code } = await asyncAllData(reqModel);
      console.log(data, code);
      Message.success('同步数据请求已提交');
    } else if (reqModel.syncType === 2) {
      const { data, code } = await asyncLiveAllData(reqModel);
      console.log(data, code);
      Message.success('同步数据请求已提交');
    }
  };
  const submitEdit = async () => {
    editModel.value.memberMsg = editModel.value.memberMsgArr.join(',');
    const { data } = await updateUser(editModel.value);
    Message.success('修改基本信息成功');
    getUser();
  };
  const handleBeforeOk = async (done: any) => {
    if (editModel.value.type === 1) {
      if (editModel.value.passwordAgain !== editModel.value.memberPassword) {
        Message.info('请确保两次输入的密码一致');
        done(false);
        return;
      }
      const { data } = await updateUser({
        memberPassword: editModel.value.memberPassword,
      });
      Message.success('修改密码成功');
    } else if (editModel.value.type === 2) {
      const { data } = await updateUser({
        memberNickname: editModel.value.memberNickname.trim(),
      });
      Message.success('修改用户昵称成功');
      await userStore.info();
    }

    getUser();
    setTimeout(() => {
      editVisible.value = false;
    }, 400);
  };
  const submitSafeEdit = async () => {
    // const { data } = await updateMerchantUser(editSafeModel.value);
    // console.log(data);
    Message.success('修改用户安全信息成功');
    // getUser(localStorage.getItem('merchantUserId'));
  };

  const editSafeFormModel = () => {
    return {
      merchantUserPassword: '',
      merchantUserRealName: '',
      merchantUserPhone: '',
      merchantUserId: undefined,
    };
  };
  const editSafeModel = ref(editSafeFormModel());

  const handleClick = (type: number, row?: any) => {};
  const resetEdit = async () => {
    editModel.value = editFormModel();
  };
  const resetSafeEdit = async () => {
    editSafeModel.value = editSafeFormModel();
  };
  const showQr = () => {
    const imgNode = h('img', {
      src: 'https://img.adyinqing.com/upai_shop/uww28i291684480862798',
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
    Modal.open({
      title: '联系商务，升级权限',
      content: () => contentNode,
      okText: '确认',
      simple: true,
      // closable: false,
      maskClosable: true,
      footer: false,
      async onOk() {},
    });
  };

  const handleClickEdit = async (type: any) => {
    if (type === 1) {
      editTitle.value = '修改密码';
      editModel.value.type = 1;
    } else {
      editTitle.value = '修改用户昵称';
      editModel.value.type = type;
      editModel.value.memberNickname = userStore.$state.userInfo.memberDepId
        ? userStore.$state.userInfo.memberNickname
        : userStore.$state.memberNickname;
    }

    editVisible.value = true;
    // editModel.value.memberUserId = userInfo.value.
  };
  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await shareGrid(params);

      renderData.value = data.grid;
      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total;
      // console.log(pagination);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const getSys = async () => {
    const { data } = await getSysConfig();
    sysConfig.value = data;
  };

  const initData = async () => {
    await getSys();

    await getUser();

    await fetchData({
      ...formModel.value,

      ...basePagination,
    } as unknown as any);
  };
  initData();
  const formRef = ref<FormInstance>();
  const onPageChange = (current: number) => {
    // console.log(current);
    basePagination.pageIndex = current;
    basePagination.current = current;
    pagination.pageIndex = current;
    pagination.current = current;
    // formModel.value.pageIndex = current;
    fetchData({
      ...formModel.value,

      ...basePagination,
    } as unknown as any);
  };

  const pageSizeChange = (size: number) => {
    // console.log(size);
    basePagination.pageSize = size;
    pagination.pageSize = size;
    fetchData({
      ...formModel.value,

      ...basePagination,
    } as unknown as any);
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
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    // :deep(.arco-pagination-total) {
    //   display: none;
    // }
  }
  .tag {
    height: auto;
    padding: 3px 5px;
  }
  .copy_icon {
    width: 16px;
    height: 16px;
  }
  .link {
    font-size: 16px !important;
  }
  .upai_content_outsideBox {
    width: 100%;
    min-height: 100px;
    border-radius: 8px;
    margin-bottom: 24px;

    padding: 24px;
    background: #fafbff;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.04);
    .upai_title {
      font-size: 28px;
      font-weight: bold;
      color: #2d2d2d;
      margin-bottom: 24px;
    }
    .title_flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        cursor: pointer;
        font-size: 16px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #1059f5;
      }
    }
    .infoLiBox {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      // grid-row-gap: 90px; /* 纵向间距为10px */
      grid-column-gap: 24px; /* 横向间距为20px */
      .infoContent {
        .infoLi {
          &:not(:last-of-type) {
            margin-bottom: 24px;
          }
          width: 100%;
          height: 48px;
          padding-left: 8px;
          padding-right: 16px;
          display: flex;
          background: #ffffff;
          box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.06);
          border-radius: 4px;
          align-items: center;
          justify-content: space-between;
          .upai_label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;

            font-weight: 500;
            color: #000000;
            .borderLeft {
              width: 4px;
              height: 14px;
              background: linear-gradient(359deg, #1059f5 0%, #6495ff 100%);
              border-radius: 8px;
              margin-right: 4px;
            }
          }
          .upai_value {
            display: flex;
            align-items: center;
            .tag {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 12px;
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
            .edit_icon {
              width: 16px;
              height: 16px;
              margin-left: 12px;
              cursor: pointer;
            }
          }
          .bd {
            padding: 0 6px;
            height: 20px;
            font-size: 14px;
            background: #1059f5;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: center;
            border-radius: 4px;
            cursor: pointer;
            .right_icon {
              width: 6.5px;
              height: 11px;
              margin-left: 4px;
            }
          }
        }
      }
    }
    .shareContentBox {
      margin-top: 25px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 26px;

      .shareBox {
        width: 100%;
        height: 120px;
        border-radius: 8px;
        background: #fff;
        display: flex;
        padding: 0 16px;
        box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.06);
        .shareLeft {
          width: 35%;
          color: #000000;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 0;
          .shareNum {
            font-size: 28px;

            font-weight: bold;
            color: #000000;
          }
          .shareLabel {
            font-size: 18px;

            font-weight: 500;
          }
        }
        .shareRight {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 16px 24px;
          align-items: center;
          ul {
            width: 120px;
            padding: 0;
            margin: 0 auto;
            li {
              list-style: none;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 16px;
              font-weight: 500;
              &:not(:last-of-type) {
                margin-bottom: 16px;
              }
              color: #000000;
              .liLeft {
                display: flex;
                align-items: center;
                .d {
                  display: inline-block; /* 将伪元素显示为内联块元素 */
                  width: 16px; /* 设置伪元素的宽度 */
                  height: 16px; /* 设置伪元素的高度 */
                  margin-right: 6px; /* 设置伪元素与文本之间的间距 */
                  background-color: #1059f5; /* 设置伪元素的背景颜色 */
                  border-radius: 50%; /* 设置伪元素为圆形 */
                }
              }
            }
          }
        }
      }
    }
  }
  .canvasEwm {
    position: fixed;
    right: -999999px;
    bottom: -100000px;
  }
  .canvasHB {
    position: fixed;
    right: -999999px;
    bottom: -100000px;
  }
  .qrcodeBorder {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 2px solid #1059f5;
    margin: 0 auto;
  }
  .mark {
    width: 100%;
    height: 100%;
    position: fixed;

    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.32);

    z-index: 1001;
    .midBox {
      width: 275px;
      height: 280px;
      background: #ffffff;
      border-radius: 6px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      vertical-align: middle;
      margin: 0 auto;
      padding: 24px;
      transition: all 0.2s;
    }
    .open {
      transform: translate(-50%, -50%) scale(1);
    }
  }
</style>
