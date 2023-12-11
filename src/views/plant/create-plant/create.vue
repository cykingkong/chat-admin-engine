<template>
  <div class="container">
    <Breadcrumb :items="['投流管理', '创建计划']" />

    <div
      :style="{
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: 'var(--color-fill-2)',
      }"
    >
      <a-row :gutter="24">
        <a-col :span="18">
          <a-row :gutter="24" :style="{ marginBottom: '-5px' }">
            <a-col :span="24">
              <a-card
                title="基础信息"
                :bordered="false"
                :style="{ width: '100%' }"
              >
                <a-form
                  ref="formJcRef"
                  auto-label-width
                  :model="reqModel.engineInfo"
                  style="width: 520px"
                >
                  <a-form-item
                    field="groupId"
                    label=""
                    :rules="[{ required: true, message: '请选择分组' }]"
                    :validate-trigger="['change', 'input']"
                  >
                    <template #label>
                      <a-space :size="3">
                        归属分组
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p>根据商家自己运营策略进行定义/选择</p>
                            <p>命名举例：日期/投放号/运营者/产品名称</p>
                          </template>
                        </a-tooltip>
                      </a-space>
                    </template>
                    <a-select
                      v-model="reqModel.engineInfo.groupId"
                      placeholder="可输入模糊搜索"
                      allow-clear
                      :allow-search="{ retainInputValue: true }"
                      style="margin-right: 10px"
                    >
                      <a-option
                        v-for="(item, key) in groupGridList"
                        :key="key"
                        :label="item.groupName"
                        :value="item.groupId"
                      />
                    </a-select>
                    <a-button type="primary" @click="handleGpClick(1)">
                      <template #icon>
                        <icon-plus />
                      </template>
                      <template #default>新建分组</template>
                    </a-button>
                  </a-form-item>

                  <a-form-item
                    field="packageId"
                    label="计划包"
                    :rules="[{ required: true, message: '请选择计划包' }]"
                    :validate-trigger="['change', 'input']"
                  >
                    <template #label>
                      <a-space :size="3">
                        计划包
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p>根据商家自己运营策略进行定义/选择</p>
                            <p>命名举例：xx运营策略</p>
                          </template>
                        </a-tooltip>
                      </a-space>
                    </template>
                    <a-select
                      v-model="reqModel.engineInfo.packageId"
                      placeholder="可输入模糊搜索"
                      allow-clear
                      :allow-search="{ retainInputValue: true }"
                      style="margin-right: 10px"
                    >
                      <a-option
                        v-for="(item, key) in packageGridList"
                        :key="key"
                        :label="item.packageName"
                        :value="item.packageId"
                      />
                    </a-select>
                    <a-button type="primary" @click="handleGpClick(2)">
                      <template #icon>
                        <icon-plus />
                      </template>
                      <template #default>新建计划包</template>
                    </a-button>
                  </a-form-item>

                  <a-form-item
                    field="sphIds"
                    label="投放号"
                    :rules="[{ required: true, message: '请选择投放号' }]"
                    :validate-trigger="['change', 'input']"
                  >
                    <template #label>
                      <a-space :size="3">
                        投放号
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p>选择要创建计划同时也是付款的视频号</p>
                          </template>
                        </a-tooltip>
                      </a-space>
                    </template>
                    <a-select
                      v-model="reqModel.engineInfo.sphIds"
                      placeholder="可输入视频号名称或备注名进行搜索"
                      :allow-search="{ retainInputValue: true }"
                      allow-clear
                      style="margin-right: 10px"
                      multiple
                      @search="sphGridSearch"
                      @change="sphIdsChange"
                    >
                      <a-option
                        v-for="(item, key) in sphGridList"
                        :key="key"
                        :label="item.sphName"
                        :value="item.sphId"
                      />
                    </a-select>
                    <a-button type="primary" size="small" @click="herfLogin()">
                      登录投放号
                    </a-button>
                  </a-form-item>

                  <a-form-item
                    field="taskNum"
                    label="创建数量"
                    :rules="[{ required: true, message: '请填写创建数量' }]"
                    :validate-trigger="['change', 'input']"
                    ><template #label>
                      <a-space :size="3">
                        创建数量
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p>批量创建计划上限是30条，避免计划创建频繁</p>
                          </template>
                        </a-tooltip>
                      </a-space>
                    </template>
                    <a-input-number
                      v-model="reqModel.engineInfo.taskNum"
                      placeholder="请填写创建数量"
                      :min="1"
                      :max="30"
                    />
                  </a-form-item>

                  <a-form-item field="taskNum" label="">
                    <template #label>
                      <a-space :size="3">
                        佣金率
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p> 佣金率=(广告出价-商品实际成本)/广告出价*100%</p>
                          </template>
                        </a-tooltip>
                      </a-space>
                    </template>
                    <a-input-number
                      v-model="reqModel.engineInfo.yjl"
                      placeholder="请填写佣金率"
                      :min="1"
                      :max="100"
                    />
                  </a-form-item>
                  <a-form-item field="taskRemark" label="">
                    <template #label>
                      <a-space :size="3"> 备注 </a-space>
                    </template>
                    <a-input
                      v-model="reqModel.taskRemark"
                      placeholder="请填写备注"
                    />
                  </a-form-item>
                  <a-form-item label="自动关停策略">
                    <template #label>
                      <a-space :size="3">
                        自动关停策略
                        <a-tooltip title="">
                          <icon-question-circle-fill />

                          <template #content>
                            <p>
                              自定义设置关停策略，触发阈值系统将自动关停计划</p
                            >
                          </template>
                        </a-tooltip>
                      </a-space>
                    </template>
                    <a-space>
                      <a-switch
                        v-model="taskNumBoolean"
                        @change="shutdownBoolChange"
                      />
                      <a-select
                        v-if="taskNumBoolean"
                        v-model="shutdownRuleCheck"
                        :style="{ width: '360px' }"
                        placeholder="请选择自动关停策略"
                        multiple
                        readonly
                        :limit="10"
                        :scrollbar="true"
                        @change="shutdownRuleChange"
                      >
                        <a-option
                          v-for="item in shutdownRuleList"
                          :key="item.srId"
                          :label="item.srName"
                          :value="item.srId"
                        />
                      </a-select>
                    </a-space>
                  </a-form-item>
                </a-form>
              </a-card>

              <a-row :gutter="24">
                <a-col :span="24">
                  <a-card
                    v-if="!checkVideoVisible"
                    :bordered="false"
                    :style="{ width: '100%' }"
                  >
                    <div
                      style="
                        background-color: var(--color-fill-2);
                        color: var(--color-text-1);
                        border: 1px dashed var(--color-fill-4);
                        height: 140px;
                        width: 120px;
                        border-radius: 2px;
                        vertical-align: middle;
                        display: flex;
                        cursor: pointer;
                        align-items: center;
                        text-align: center;
                      "
                      @click="handleVideoClick"
                    >
                      <div class="selectTips">
                        <a-space direction="vertical" :size="5" fill>
                          <icon-plus style="font-size: 18px" />
                          <span class="selectText">请选择要加热的视频</span>
                        </a-space>
                      </div>
                    </div>
                  </a-card>
                  <a-card
                    v-if="checkVideoVisible"
                    hoverable
                    :style="{ width: '100%', marginBottom: '20px' }"
                  >
                    <div
                      :style="{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }"
                    >
                      <span
                        :style="{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#1D2129',
                        }"
                      >
                        <a-image width="70" :src="checkVideoInfo.coverUrl" />
                        <a-space direction="vertical" fill :size="'mini'">
                          <a-typography-paragraph
                            :ellipsis="{ rows: 1, expandable: false }"
                            style="margin-bottom: 0; margin-left: 5px"
                            >{{
                              checkVideoInfo.description || '-'
                            }}</a-typography-paragraph
                          >
                          <a-typography-paragraph
                            :heading="6"
                            style="
                              margin-left: 5px;
                              margin-bottom: 0;
                              color: #b3b3b3;
                            "
                          >
                            <a-avatar
                              :image-url="checkAuthorInfo.headImgUrl"
                              size="30px"
                            ></a-avatar>
                            {{ checkAuthorInfo.nickName }}
                            {{
                              dayjs
                                .unix(checkVideoInfo.createTime)
                                .format('YYYY-MM-DD HH:mm:ss')
                            }}</a-typography-paragraph
                          >
                          <a-popover
                            v-if="checkVideoInfo.shoppingcartJumpinfo.wording"
                            trigger="click"
                          >
                            <a-link style="padding: 0; margin-left: 5px">{{
                              checkVideoInfo.shoppingcartJumpinfo.wording
                            }}</a-link>
                            <template #content>
                              <a-space
                                direction="vertical"
                                fill
                                style="text-align: center"
                              >
                                <QrcodeVue
                                  :value="videoQrcodeValue"
                                  :size="200"
                                  level="H"
                                  style="position: relative"
                                />
                                <a-tag color="green"
                                  >请用微信APP扫描二维码</a-tag
                                >
                              </a-space>
                            </template>
                          </a-popover>
                        </a-space>
                      </span>

                      <a-link @click="handleVideoClick">更换</a-link>
                    </div>
                  </a-card>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row :gutter="24" style="margin-top: 10px">
            <a-col :span="24">
              <a-card :bordered="false" :style="{ width: '100%' }">
                <a-list :bordered="false" :split="false">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span
                          >优先提升目标
                          <span
                            style="
                              font-size: 12px;
                              color: #ccc;
                              display: inline-block;
                              margin-left: 5px;
                            "
                            >无商品链接的视频暂不支持以下目标：商品点击、商品成交</span
                          ></span
                        >
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="
                            reqModel.feedPromotionOrderInfo.promotionTarget
                          "
                          style="margin-top: 20px"
                          @change="promotionTargetChange"
                        >
                          <a-radio
                            :value="6"
                            :disabled="searchVideoGoodsVisible"
                            >点赞数
                          </a-radio>
                          <a-radio
                            :value="5"
                            :disabled="searchVideoGoodsVisible"
                            >关注数
                          </a-radio>
                          <a-radio
                            :value="1"
                            :disabled="searchVideoGoodsVisible"
                            >完播数
                          </a-radio>
                          <a-radio
                            :value="12"
                            :disabled="searchVideoGoodsVisible"
                            >直播预约
                          </a-radio>
                          <a-radio
                            :value="7"
                            :disabled="!searchVideoGoodsVisible"
                            >商品点击
                          </a-radio>
                          <a-radio
                            :value="8"
                            :disabled="!searchVideoGoodsVisible"
                            >商品成交
                          </a-radio>
                          <a-radio
                            :value="11"
                            :disabled="!searchVideoGoodsVisible"
                            >成交ROI
                          </a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span
                          >预计{{ promotionTarget }}
                          <span
                            style="
                              font-size: 12px;
                              color: #ccc;
                              display: inline-block;
                              margin-left: 5px;
                            "
                            >实际效果与视频质量有关，若加热未完成，剩余流量券和微信豆将返还</span
                          ></span
                        >
                      </template>
                      <template #description>
                        <div style="margin-top: 20px">
                          <span style="font-size: 24px; color: #1554f8">{{
                            promotionTargetMemberSum
                          }}</span>
                          <span style="font-size: 12px; color: #1554f8"
                            >人</span
                          >
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>支付微信豆</span>
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="estimatedWecoinAmountType"
                          style="margin-top: 20px"
                          @change="estimatedWecoinAmountTypeChange"
                        >
                          <a-radio :value="1">
                            <a-space :size="2">
                              {{
                                searchVideoGoodsVisible
                                  ? reqModel.feedPromotionOrderInfo
                                      .promotionTarget === 11
                                    ? '3000'
                                    : '1000'
                                  : `500`
                              }}<img
                                v-if="
                                  reqModel.feedPromotionOrderInfo
                                    .promotionTarget !== 11
                                "
                                src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                                alt=""
                                class="wx_dou_icon"
                              />
                            </a-space>
                          </a-radio>
                          <a-radio :value="2">
                            <a-space :size="2">
                              {{
                                searchVideoGoodsVisible
                                  ? reqModel.feedPromotionOrderInfo
                                      .promotionTarget === 11
                                    ? '5000'
                                    : '2000'
                                  : `1000`
                              }}<img
                                v-if="
                                  reqModel.feedPromotionOrderInfo
                                    .promotionTarget !== 11
                                "
                                src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                                alt=""
                                fit="cover"
                                class="wx_dou_icon"
                              /> </a-space
                          ></a-radio>
                          <a-radio :value="3">
                            <a-space>
                              <span>自定义</span>
                              <div style="display: flex; align-items: center">
                                <a-input-number
                                  v-if="estimatedWecoinAmountZdyVisble"
                                  v-model="estimatedWecoinAmountZdy"
                                  :placeholder="placeholderText"
                                  :min="
                                    searchVideoGoodsVisible
                                      ? reqModel.feedPromotionOrderInfo
                                          .promotionTarget === 11
                                        ? 3000
                                        : 1000
                                      : 500
                                  "
                                  :max="300000"
                                  :step="1000"
                                  :precision="0"
                                  mode="button"
                                  style="width: 100%"
                                  @change="estimatedWecoinAmountZdyChange"
                                />
                                <img
                                  v-if="
                                    estimatedWecoinAmountZdyVisble &&
                                    reqModel.feedPromotionOrderInfo
                                      .promotionTarget !== 11
                                  "
                                  src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                                  alt=""
                                  class="wx_dou_icon"
                                  style="margin-left: 4px"
                                />
                              </div>
                            </a-space>
                          </a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span
                          >出价方式{{
                            reqModel.feedPromotionOrderInfo.promotionTarget ===
                            11
                              ? '(ROI)'
                              : ''
                          }}</span
                        >
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="wecoinBidType"
                          style="margin-top: 20px"
                          @change="wecoinBidTypeChange"
                        >
                          <a-radio :value="1">智能出价</a-radio>
                          <a-radio :value="2">
                            <div class="zdyBox">
                              <span>自定义</span>
                              <a-space direction="vertical" align="start">
                                <div style="display: flex; align-items: center">
                                  <a-input-number
                                    v-if="wecoinBidZdyVisble"
                                    v-model="wecoinBidZdy"
                                    :placeholder="
                                      reqModel.feedPromotionOrderInfo
                                        .promotionTarget === 11
                                        ? ``
                                        : `需在1-10000之间`
                                    "
                                    :min="
                                      Number(
                                        reqModel.feedPromotionOrderInfo
                                          .promotionTarget
                                      ) === 11
                                        ? 0.5
                                        : 1
                                    "
                                    :max="1000000000"
                                    :step="
                                      Number(
                                        reqModel.feedPromotionOrderInfo
                                          .promotionTarget
                                      ) === 11
                                        ? 0.01
                                        : 1
                                    "
                                    :precision="
                                      reqModel.feedPromotionOrderInfo
                                        .promotionTarget === 11
                                        ? 2
                                        : 0
                                    "
                                    mode="button"
                                    style="width: 100%"
                                    @change="wecoinBidZdyChange"
                                  />
                                  <img
                                    v-if="
                                      wecoinBidZdyVisble &&
                                      reqModel.feedPromotionOrderInfo
                                        .promotionTarget !== 11
                                    "
                                    src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                                    alt=""
                                    class="wx_dou_icon"
                                    style="margin-left: 4px"
                                  />
                                </div>
                              </a-space>
                              <div
                                v-if="
                                  reqModel.feedPromotionOrderInfo
                                    .promotionTarget == 11 && wecoinBidZdyVisble
                                "
                                class="tips"
                              >
                                roi需在0.5-50之间</div
                              >
                            </div>
                          </a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>加热方式</span>
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="
                            reqModel.feedPromotionOrderInfo.promotionType
                          "
                          style="margin-top: 20px"
                          @change="promotionTypeChange"
                        >
                          <a-radio :value="1">智能加热</a-radio>
                          <a-radio :value="2">定向加热</a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>使用他人肖像</span>
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="usePortrait"
                          style="margin-top: 20px"
                        >
                          <a-radio :value="false">未使用</a-radio>

                          <a-radio :value="true">使用</a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <a-list-item v-if="usePortrait">
                    <a-list-item-meta>
                      <template #title>
                        <span>上传肖像授权</span>
                      </template>
                      <template #description>
                        <a-space direction="vertical" style="margin-top: 20px">
                          <a-typography-text type="secondary">
                            <a
                              href="https://res.wx.qq.com/t/wx_fed/finder/static-assets/finder-common-assets/res/protocol/%E8%A7%86%E9%A2%91%E5%8F%B7%E8%82%96%E5%83%8F%E6%8E%88%E6%9D%83%E5%8D%8F%E8%AE%AE%E4%B9%A6221025.docx"
                              rel="noopener noreferrer"
                              download="视频号肖像授权协议书.docx"
                              >下载肖像授权模板，</a
                            >
                            填写后上传文件。
                          </a-typography-text>
                          <a-upload
                            action="/"
                            draggable
                            :file-list="flieList"
                            :limit="1"
                            :accept="'.doc,.docx,.pdf,.png'"
                            :custom-request="protraitUpload"
                            @before-upload="beforeUpload"
                          />
                        </a-space>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- <div
                v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                style="padding: 13px 20px"
              > -->
                  <a-list-item
                    v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                  >
                    <a-list-item-meta>
                      <template #title>
                        <span>加热时长</span>
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="reqModel.feedPromotionOrderInfo.duration"
                          style="margin-top: 20px"
                        >
                          <a-radio value="86400">24小时</a-radio>
                          <a-radio value="43200">12小时</a-radio>
                          <a-radio value="21600">6小时</a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- 粉丝层推荐 -->
                  <a-list-item
                    v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                  >
                    <a-list-item-meta>
                      <template #title>
                        <span
                          >根据粉丝层推荐
                          <span
                            style="
                              font-size: 12px;
                              color: #ccc;
                              display: inline-block;
                              margin-left: 5px;
                            "
                            >视频将定向推给你选择作者的粉丝，以及与粉丝相似的人。</span
                          ></span
                        >
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="fansVideoTagRadio"
                          style="margin-top: 20px"
                          @change="changeFansTag"
                        >
                          <a-radio :value="1">不限</a-radio>
                          <a-radio
                            :value="2"
                            @click="
                              formVideoTagVisible = true;
                              changeActive(0);
                            "
                            >选择相似作者的粉丝</a-radio
                          >
                        </a-radio-group>
                        <br />
                        <a-space
                          v-if="fansVideoCheckOK"
                          @click="
                            formVideoTagVisible = true;
                            changeActive(labelActive);
                          "
                        >
                          已添加
                          <a-input-tag
                            v-model="videoTagArr"
                            placeholder="已添加作者"
                            :max-tag-count="3"
                            readonly
                            allow-clear
                            style="
                               {
                                width: 300px;
                                border-radius: 8px;
                              }
                            "
                          >
                            <template #value="{ value }"> {{ value }}</template>
                          </a-input-tag>
                          等 {{ videoTagArr.length }}个作者
                        </a-space>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- 性别定向 -->
                  <a-list-item
                    v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                  >
                    <a-list-item-meta>
                      <template #title>
                        <span>根据性别定向推荐</span>
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="gender"
                          style="margin-top: 20px"
                          @change="reqGenderChange"
                        >
                          <a-radio :value="0">不限 </a-radio>
                          <a-radio :value="1">男</a-radio>
                          <a-radio :value="2">女</a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- 设备定向 deviceType-->
                  <a-list-item
                    v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                  >
                    <a-list-item-meta>
                      <template #title>
                        <span>根据设备定向推荐</span>
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="deviceType"
                          style="margin-top: 20px"
                          @change="deviceTypesChange"
                        >
                          <a-radio :value="0">不限 </a-radio>
                          <a-radio :value="1">iphone</a-radio>
                          <a-radio :value="2">安卓</a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- 年龄推荐 -->
                  <a-list-item
                    v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                  >
                    <a-list-item-meta>
                      <template #title>
                        <span>根据年龄推荐</span>
                      </template>
                      <template #description>
                        <a-select
                          v-model="
                            reqModel.feedPromotionOrderInfo.suggest.ageRange
                          "
                          style="margin-top: 10px; width: 320px"
                          placeholder="全部年龄"
                          multiple
                          allow-clear
                        >
                          <a-option :value="1">18-24岁</a-option>
                          <a-option :value="2">25-29岁</a-option>
                          <a-option :value="3">30-39岁</a-option>
                          <a-option :value="4">40-49岁</a-option>
                          <a-option :value="5">50岁以上</a-option>
                        </a-select>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- 地区  areaValue-->
                  <a-list-item
                    v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                  >
                    <a-list-item-meta>
                      <template #title>
                        <span>根据地区推荐</span>
                      </template>
                      <template #description>
                        <Cascader
                          v-model:value="areaValue"
                          style="margin-top: 10px; width: 320px"
                          multiple
                          :options="areaOptions"
                          placeholder="全部地区"
                          dropdown-class-name="ant_placeholder_class"
                          suffix-icon="Shopping Around"
                          @change="changeAreaTag"
                        >
                          <template #tagRender="data">
                            <a-tag :key="data.value" color="blue">{{
                              data.label
                            }}</a-tag>
                          </template>
                        </Cascader>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- 兴趣推荐 interestTag-->
                  <a-list-item
                    v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                  >
                    <a-list-item-meta>
                      <template #title>
                        <span>根据兴趣推荐</span>
                      </template>
                      <template #description>
                        <a-select
                          v-model="
                            reqModel.feedPromotionOrderInfo.suggest.interestTag
                          "
                          style="margin-top: 10px; width: 320px"
                          placeholder="全部兴趣"
                          multiple
                          allow-clear
                        >
                          <a-option
                            v-for="(item, key) in insertTag"
                            :key="key"
                            :value="Object.values(item)[0]"
                          >
                            {{ Object.keys(item)[0] }}
                          </a-option>
                        </a-select>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- </div> -->

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span
                          >使用优惠
                          <span
                            style="
                              font-size: 12px;
                              color: #ccc;
                              display: inline-block;
                              margin-left: 5px;
                            "
                            >加热他人不可使用优惠</span
                          ></span
                        >
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="reqModel.engineInfo.userVoucher"
                          style="margin-top: 20px"
                        >
                          <a-radio :value="1">优先使用最大面额优惠券 </a-radio>
                          <a-radio :value="2">优先使用即将到期优惠券 </a-radio>
                          <a-radio :value="3">不使用优惠券</a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6">
          <a-space style="width: 100%" direction="vertical" :size="24">
            <a-card
              :bordered="false"
              :style="{ width: '100%', maxHeight: '320px', overflow: ' auto' }"
            >
              <template #title>
                <a-row justify="space-between" align="end">
                  <a-col flex="60px">微信豆余额</a-col>
                  <a-col flex="60px" style="font-size: 12px"
                    >已选{{ sphWxdouGridList.length }}个</a-col
                  >
                </a-row>
              </template>
              <a-list style="margin-bottom: 30px">
                <a-list-item
                  v-for="(item, index) in sphWxdouGridList"
                  :key="index"
                >
                  <a-row justify="space-between" style="width: 100%">
                    <a-col :flex="6">
                      <span style="font-size: 14px; font-weight: 500"
                        >{{
                          item
                            ? item.realSphName
                              ? item.realSphName
                              : item.sphName
                            : ''
                        }}
                      </span></a-col
                    >
                    <a-col :flex="1">
                      <a-space :size="3">
                        <span
                          style="
                            font-size: 14px;
                            font-weight: 500;
                            white-space: nowrap;
                          "
                          >{{ item ? item.sphBalance : 0 }}个
                        </span>
                        <img
                          src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                          alt=""
                          class="wx_dou_icon"
                          style="margin-bottom: 0"
                        />
                      </a-space>
                    </a-col>
                  </a-row>
                </a-list-item>
              </a-list>
            </a-card>
            <a-card
              title="加热信息"
              :bordered="false"
              :style="{ width: '100%' }"
            >
              <a-list style="margin-bottom: 30px">
                <a-list-item
                  ><span style="font-size: 18px; font-weight: 500"
                    >订单数量： </span
                  ><span>
                    {{
                      reqModel.engineInfo.sphIds.length
                        ? reqModel.engineInfo.taskNum *
                          reqModel.engineInfo.sphIds.length
                        : reqModel.engineInfo.taskNum
                    }}个</span
                  >
                </a-list-item>
                <a-list-item
                  ><span style="font-size: 18px; font-weight: 500"
                    >订单金额：
                  </span>

                  <a-space :size="2">
                    {{
                      reqModel.engineInfo.sphIds.length
                        ? reqModel.feedPromotionOrderInfo
                            .estimatedWecoinAmount *
                          reqModel.engineInfo.taskNum *
                          reqModel.engineInfo.sphIds.length
                        : reqModel.feedPromotionOrderInfo
                            .estimatedWecoinAmount * reqModel.engineInfo.taskNum
                    }}
                    <img
                      src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                      alt=""
                      class="wx_dou_icon"
                      style="margin-bottom: 0"
                    />
                  </a-space>
                </a-list-item>
                <a-list-item
                  ><span style="font-size: 18px; font-weight: 500"
                    >需支付：
                  </span>
                  <a-space :size="2">
                    {{
                      reqModel.engineInfo.sphIds.length
                        ? reqModel.feedPromotionOrderInfo
                            .estimatedWecoinAmount *
                          reqModel.engineInfo.taskNum *
                          reqModel.engineInfo.sphIds.length
                        : reqModel.feedPromotionOrderInfo
                            .estimatedWecoinAmount * reqModel.engineInfo.taskNum
                    }}
                    <img
                      src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                      alt=""
                      class="wx_dou_icon"
                      style="margin-bottom: 0"
                    />
                  </a-space>
                </a-list-item>
              </a-list>
              <a-button
                type="primary"
                shape="round"
                size="large"
                :disabled="createOrderDisabled"
                long
                @click="createOrder"
                >创建订单
              </a-button>
            </a-card>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <!-- 粉丝层推荐 -->
    <a-modal
      v-model:visible="formVideoTagVisible"
      width="1000px"
      title="根据粉丝层推荐"
      @cancel="handleVideoTagCancel"
      @before-ok="handleVideoTagBeforeOk"
    >
      <div class="titleBox"
        >将定向推给你选择作者的粉丝，以及与粉丝相似的人。

        <a-input-search
          v-model="searchText"
          :style="{ width: '320px' }"
          placeholder="搜索作者的粉丝，以及与粉丝相似的人"
          search-button
          @change="searchTagAuth"
        />
      </div>
      <a-row>
        <a-col flex="1">
          <a-input-tag
            v-model="videoTagArr"
            placeholder="选择作者的粉丝，以及与粉丝相似的人。"
            allow-clear
            style="
               {
                width: 500px;
                height: 80px;
                border-radius: 8px;
              }
            "
            @remove="textChange($event)"
            @press-enter="textEnterChange($event)"
          >
            <template #value="{ value }"> {{ value }}</template>
          </a-input-tag>
        </a-col>
      </a-row>
      <a-row v-if="!selectBox">
        <a-col :span="4">
          <div class="labelContentL">
            <div
              v-for="(el, k) in fansTag"
              :key="k"
              class="labelBox"
              :class="{ active: labelActive === k }"
              @click="changeActive(k)"
              >{{ el.labelName }}<icon-right />
            </div>
          </div>
        </a-col>
        <a-col :span="20">
          <a-spin
            :loading="labelContentloading"
            tip="加载中"
            style="width: 100%"
          >
            <div class="labelContentR">
              <div
                v-for="(item, index) in fansTag[labelActive].accountInfos"
                :key="index"
                class="contentBox"
                @click="pushContentInArr(item, index)"
              >
                <a-avatar
                  :image-url="item.headImgUrl"
                  :size="30"
                  style="margin-right: 0.7rem"
                ></a-avatar>
                {{ item.nickName }}
                <icon-check v-if="item.select" />
              </div>
            </div>
          </a-spin>
        </a-col>
      </a-row>
      <a-row v-if="selectBox">
        <a-col :flex="1">
          <a-spin
            :loading="labelContentloading"
            tip="加载中"
            style="width: 100%"
          >
            <div class="searchContentBox">
              <div
                v-for="(item, k) in fansTagSearchGrid"
                :key="k"
                class="searchContent"
                @click="pushContentInArr(item, k)"
              >
                <a-avatar
                  :image-url="item.headImgUrl"
                  :size="48"
                  style="margin-right: 0.7rem"
                ></a-avatar>
                {{ item.nickName }}
                <icon-check v-if="item.select" />
              </div>
            </div>
          </a-spin>
        </a-col>
      </a-row>
    </a-modal>
    <!-- 选择加热视频 -->
    <a-modal
      v-model:visible="formVideoVisible"
      width="1000px"
      title="选择要加热的视频"
      @before-ok="handleVideoCheckBeforeOk"
    >
      <a-list :bordered="false" :split="false">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <span>搜索你想加热的视频号名字</span>
            </template>
            <template #description>
              <a-card
                v-if="checkAuthorInfoVisible"
                hoverable
                :style="{ width: '360px', marginBottom: '20px' }"
              >
                <div
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }"
                >
                  <span
                    :style="{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#1D2129',
                    }"
                  >
                    <a-avatar
                      :style="{
                        marginRight: '8px',
                        backgroundColor: '#165DFF',
                      }"
                      :size="35"
                      :image-url="checkAuthorInfo.headImgUrl"
                    >
                    </a-avatar>
                    <a-space direction="vertical" fill :size="'mini'">
                      <a-typography-title :heading="6" style="margin: 0">{{
                        checkAuthorInfo.nickName
                      }}</a-typography-title>
                      <a-typography-paragraph
                        :ellipsis="{ rows: 1, expandable: false }"
                        style="margin-bottom: 0"
                        >{{
                          checkAuthorInfo.signature || '-'
                        }}</a-typography-paragraph
                      >
                    </a-space>
                  </span>
                  <a-link
                    @click="
                      checkAuthorInfoVisible = false;
                      videoCurrenyIndex = -1;
                    "
                    >更换</a-link
                  >
                </div>
              </a-card>

              <a-input-search
                v-if="!checkAuthorInfoVisible"
                v-model="searchVideoQuery"
                style="margin-top: 10px; width: 300px"
                placeholder="输入视频号，回车或点击按钮搜索"
                autocomplete="off"
                allow-clear
                @press-enter="searchVideoAccount"
                @search="searchVideoAccount"
              />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>

      <div v-if="checkAuthorInfoVisible">
        <a-list :bordered="false" :split="false">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                <span>选择要加热的视频 </span>
              </template>
              <template #description>
                日期范围
                <a-radio-group
                  v-model="searchVideoTime"
                  style="margin-top: 20px"
                  @change="
                    searchVideoLastBuf = '';
                    searchAuthVideoList = [];
                    searchAuthVideo();
                  "
                >
                  <a-radio :value="1">近7天</a-radio>
                  <a-radio :value="2">近3个月</a-radio>
                </a-radio-group>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </a-list>

        <a-list
          :max-height="420"
          :scrollbar="true"
          :bordered="false"
          :loading="loading"
          @reach-bottom="searchAuthVideo()"
        >
          <template #scroll-loading>
            <div v-if="videoBottom">暂无更多数据</div>
            <a-spin v-else />
          </template>
          <a-row :gutter="24" :style="{ marginBottom: '20px' }">
            <a-col
              v-for="(item, key) of searchAuthVideoList"
              :key="key"
              :span="6"
              style="margin-bottom: 10px; cursor: pointer"
            >
              <a-card
                :class="{ 'video-select': videoCurrenyIndex === key }"
                @click="handelVideoSearchClick(key, item)"
              >
                <template #cover>
                  <img
                    :style="{ width: '100%', transform: 'translateY(-20px)' }"
                    alt="dessert"
                    :src="item.coverUrl"
                  />
                </template>
                <a-card-meta>
                  <template #description>
                    <a-typography-paragraph
                      :ellipsis="{ rows: 1, expandable: false }"
                      style="margin-bottom: 0"
                    >
                      {{ item.description || '-' }}
                    </a-typography-paragraph>
                    <div class="countBox">
                      <div
                        v-for="(el, index) in bottomBarList"
                        :key="index"
                        class="count"
                      >
                        <img :src="el.iconUrl" alt="" class="icon" />
                        <a-typography-paragraph style="margin-bottom: 0">
                          {{ item[el.value] ? numFormat(item[el.value]) : '0' }}
                        </a-typography-paragraph>
                      </div>
                    </div>
                  </template>
                </a-card-meta>
              </a-card>
            </a-col>
          </a-row>
        </a-list>
      </div>

      <a-list
        v-if="!checkAuthorInfoVisible"
        :bordered="false"
        :split="false"
        :hoverable="true"
        :loading="loading"
      >
        <a-list-item v-for="(item, key) in targetAuthorList" :key="key">
          <a-list-item-meta
            style="cursor: pointer"
            @click="handelAuthSearchClick(item)"
          >
            <template #title>
              <span>{{ item.nickName }}</span>
            </template>
            <template #description>
              <a-typography-paragraph
                v-if="item.signature"
                :ellipsis="{
                  suffix: '',
                  rows: 1,
                  expandable: true,
                }"
              >
                {{ item.signature || '-' }}
              </a-typography-paragraph>
            </template>
            <template #avatar>
              <a-avatar shape="square">
                <img alt="avatar" :src="item.headImgUrl" />
              </a-avatar>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
    <!-- 计划包 -->
    <a-modal
      v-model:visible="formGpVisible"
      :title="formGpTitle"
      @cancel="formGpVisible = false"
      @before-ok="handleGpBeforeOk"
    >
      <a-form
        ref="formGpRef"
        :model="formGpModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          v-if="formGpModel.type === 1"
          field="name"
          label="分组名称"
          :rules="[{ required: true, message: '请填写分组名称' }]"
        >
          <a-input v-model="formGpModel.name" />
        </a-form-item>

        <a-form-item
          v-if="formGpModel.type === 2"
          field="name"
          label="计划包名称"
          :rules="[{ required: true, message: '请填写计划包名称' }]"
        >
          <a-input v-model="formGpModel.name" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="createOverPayVisible"
      :mask-closable="false"
      width="1000px"
      title="正在创建计划"
      :esc-to-close="false"
      @cancel="createdOrderTimerClear(true)"
      @ok="createdOrderTimerClear(true)"
    >
      <a-row :gutter="24">
        <a-col :span="16">
          <div class="tableBox">
            <a-table
              v-model:selectedKeys="selectedKeys"
              row-key="plantCode"
              :pagination="createPagination"
              :hoverable="true"
              :stripe="false"
              :loading="createTaskOrderLoading"
              :data="createTaskOrderList"
              :bordered="false"
              @page-change="createPaginationChange"
              @row-click="rowClick"
            >
              <template #columns>
                <a-table-column title="投手号" align="center">
                  <template #cell="{ record }">
                    {{ record.sphInfo.sphName }}
                  </template>
                </a-table-column>
                <a-table-column title="创建状态" align="center">
                  <template #cell="{ record }">
                    <!-- <span @click="$message.info(record.errorMsg)"
                      v-if="record.createStatus === 3">
                      <span> {{ createStatus[record.createStatus] }}</span>
                      <icon-exclamation-circle-fill />
                    </span> -->
                    <a-tooltip
                      v-if="record.createStatus === 3"
                      :content="record.errorMsg"
                    >
                      <span>
                        {{ createStatus[record.createStatus] }}
                        <icon-exclamation-circle-fill />
                      </span>
                    </a-tooltip>

                    <span v-else> {{ createStatus[record.createStatus] }}</span>
                  </template>
                </a-table-column>
                <a-table-column title="优惠券折扣" align="center"
                  ><template #cell="{ record }">
                    {{
                      record.voucherInfo ? numF(record.voucherInfo.quota) : '-'
                    }}
                  </template></a-table-column
                >
                <a-table-column title="需支付" align="center">
                  <template #cell="{ record }">
                    {{ record.estimatedWecoinAmount }}
                  </template>
                </a-table-column>
                <a-table-column title="订单状态" align="center">
                  <template #cell="{ record }">
                    {{ plantStatus[record.plantStatus] }}
                    <!-- <a-tooltip
                      v-if="
                        record.plantStatus === 1 && record.createStatus === 1
                      "
                    >
                      <icon-star />
                      <template #content>
                        <p>订单未支付</p>
                      </template>
                    </a-tooltip> -->
                  </template>
                </a-table-column>
              </template>
            </a-table>

            <span
              >共{{ createTaskOrderInfo.total }}条 | 成功{{
                createTaskOrderInfo.success
              }}条 失败{{ createTaskOrderInfo.error }}条｜完成支付{{
                createTaskOrderInfo.overPay
              }}条
            </span>
          </div>
        </a-col>
        <a-col :span="8" style="text-align: center">
          <span style="font-size: 16px">请使用对应投手号进行支付</span>
          <a-spin :loading="createTaskPayLoading" :tip="createTaskPayTips">
            <template
              v-if="
                createTaskPayTips === '当前订单已全部支付完成' ||
                createTaskPayTips === '当前订单支付完成，请勿重复操作'
              "
              #element
            >
              <icon-check-circle-fill :spin="false" :rotate="0" :size="20" />
            </template>
            <a-card class="general-card" style="padding-top: 20px">
              <a-space
                :size="16"
                direction="vertical"
                align="center"
                fill
                style="text-align: center"
              >
                <span style="font-size: 14px">{{ waitQrcodeTips }}</span>

                <span
                  v-if="createTaskPayOrderList[createTaskPayOrderIndex]"
                  style="font-size: 16px; font-weight: 500"
                  >{{
                    createTaskPayOrderList[createTaskPayOrderIndex].plantName
                  }}</span
                >
                <div class="qrcodeBox">
                  <QrcodeVue
                    v-if="createTaskPayOrderList[createTaskPayOrderIndex]"
                    :value="
                      createTaskPayOrderList[createTaskPayOrderIndex].qrCodeVal
                    "
                    :size="220"
                    level="H"
                    style="position: relative"
                  />
                  <div
                    v-if="
                      waitQrcodeTips === '当前订单已支付完成' ||
                      waitQrcodeTips === '计划创建失败，无法支付'
                    "
                    class="qrcodePayMark"
                  >
                    <a-tag
                      v-if="waitQrcodeTips === '当前订单已支付完成'"
                      color="arcoblue"
                      style="transform: scale(1.5)"
                      >已支付</a-tag
                    >

                    <a-tag
                      v-if="waitQrcodeTips === '计划创建失败，无法支付'"
                      color="gray"
                      style="transform: scale(1.3)"
                      >创建失败，请勿支付</a-tag
                    >
                  </div>
                </div>

                <a-tag color="green">请用微信APP扫描二维码</a-tag>
                <a-space>
                  <a-link @click="createTaskPayOrderJumpThis"
                    >跳过该计划</a-link
                  >
                  <!-- <a-link @click="createTaskPayOrderJumpThisSphId"
                    >跳过该账号计划</a-link
                  > -->
                </a-space>
              </a-space>
            </a-card>
          </a-spin>
          <div class="tipsWords"
            >移动到
            <icon-exclamation-circle-fill /> 按钮，可查看计划创建失败原因</div
          >
        </a-col>
      </a-row>
    </a-modal>
    <!-- <a-modal v-model:visible="serviceQrCode" hide-cancel="true" @ok="serviceQrCodeOk" >
      <template #title>提示</template>
	  <div class="serviceQrCode">
		  <div class="txt">体验卡可创建加热计划数量已不足，联系客服可免费升级</div>
		  <img class="img" src="../../../assets/images/ewm.png" />
	  </div>
    </a-modal> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineComponent, onMounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import { Message } from '@arco-design/web-vue';
  import _ from 'lodash';
  import { useRouter } from 'vue-router';
  import {
    plantPackageGrid,
    plantGroupGrid,
    plantGroupAdd,
    plantPackageAdd,
    createTask,
    plantGrid,
  } from '@/api/plant';
  import { shutdownRuleGrid } from '@/api/rule';
  import {
    sphGrid,
    getTargetAuthor,
    getSearchAccount,
    getFinderObject,
    getObjectShortLink,
    getLabelTag,
    getOrderDetail,
    getFileKey,
  } from '@/api/sph';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import QrcodeVue from 'qrcode.vue';
  import type { CascaderProps } from 'ant-design-vue';
  import { Cascader } from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
  import { province, city } from '@/utils/address';
  import { createStatus, plantStatus } from '@/utils/enum';
  import { findLastIndexWithSameId } from '@/utils/event';

  // const serviceQrCode = ref(false);
  const rowSelection = {
    type: 'radio',
  };
  const selectedKeys = ref<any[]>();
  const createOverPayVisible = ref(false);
  const createTaskId = ref(0);
  const createTaskOrderLoading = ref(false);
  const createTaskPayLoading = ref(false);
  const createTaskPayTips = ref('正在创建支付订单');
  const createTaskOrderList = ref<any>([]);
  const createTaskOrderInfoModel = () => {
    return {
      total: 0,
      success: 0,
      error: 0,
      overPay: 0,
    };
  };
  const createPagination = ref({ current: 1, pageSize: 10, chengeNum: 0 });
  const placeholderText = ref('需在500-300000之间');

  const areaValue = ref([]);
  const createTaskOrderInfo = ref(createTaskOrderInfoModel());
  const createTaskPayOrderList = ref<any>([]);
  const createTaskPayOrderIndex = ref(0);
  const createdGetPlantReqVisable = ref(true);
  const createdGetInfoReqVisable = ref(true);
  const createdPlantTimer = ref<any>();
  const createdOrderTimer = ref<any>();
  const createdOrderTimerClear = (ok?: boolean) => {
    createdGetPlantReqVisable.value = true;
    createdGetInfoReqVisable.value = true;
    clearInterval(createdPlantTimer.value);
    clearInterval(createdOrderTimer.value);
    if (ok) {
      return;
    }
    setTimeout(() => {
      // eslint-disable-next-line no-use-before-define
      createdGetPlant();
    }, 2500);
  };
  const createTaskPayOrderJumpThisSphId = () => {
    if (createTaskPayOrderList.value.length > 0) {
      console.log(
        findLastIndexWithSameId(
          createTaskOrderList.value,
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].sphId
        ),
        createTaskPayOrderList[createTaskPayOrderIndex.value]
      );
      createTaskPayOrderIndex.value =
        findLastIndexWithSameId(
          createTaskOrderList.value,
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].sphId
        ) + 1;
      const nullArr = getTruthyIndexes(
        JSON.parse(JSON.stringify(createTaskPayOrderList.value))
      );
      if (
        nullArr.length > 0 &&
        nullArr.includes(createTaskPayOrderIndex.value)
      ) {
        Message.info('已为您跳过创建失败计划的支付二维码');
        createTaskPayOrderIndex.value += 1;
      }
      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        createTaskPayLoading.value = true;
      }
    }
  };
  function getTruthyIndexes(arr: any) {
    return arr.reduce((indexes: any, value: any, index: any) => {
      if (value === null) {
        indexes.push(index);
      }
      return indexes;
    }, []);
  }
  function findIndexLessThanNumber(arr: any, num: any) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr.length; i++) {
      if (num < arr[i]) {
        return arr[i];
      }
    }
    return -1; // 如果没有找到满足条件的元素，返回-1
  }

  const createTaskPayOrderJumpThis = () => {
    // 如果可支付列表长度大于0
    if (createTaskPayOrderList.value.length > 0) {
      // 判断可支付列表内是否含有创建失败的订单
      // const nullArr = getTruthyIndexes(
      //   JSON.parse(JSON.stringify(createTaskPayOrderList.value))
      // );
      if (
        !createTaskPayOrderList.value[createTaskPayOrderIndex.value + 1] &&
        createTaskOrderInfo.value.success + createTaskOrderInfo.value.error !==
          createTaskOrderList.value.length
      ) {
        return;
      }

      // createTaskPayLoading.value = true;
      createTaskPayOrderIndex.value += 1;
      waitQrcodeTips.value = '切换成功，请进行支付….';

      // 判断当前下标是否适合翻页
      if (
        createTaskPayOrderList.value[createTaskPayOrderIndex.value] &&
        Number(
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].index
        ) %
          10 ===
          0
      ) {
        createPagination.value.current += 1;
        //   createPagination.value.chengeNum = createTaskOrderInfo.value.overPay;
      }
      // // 如果下一个可支付二维码不存在则跳过
      // if (nullArr.length && nullArr.includes(createTaskPayOrderIndex.value)) {
      //   createTaskPayOrderIndex.value += 1;
      //   if (nullArr.includes(createTaskPayOrderIndex.value)) {
      //     Message.info('已为您自动跳过创建失败的订单支付二维码');

      //     let nextIndex = createTaskPayOrderIndex.value + 1;
      //     while (nullArr.includes(nextIndex)) {
      //       // eslint-disable-next-line no-plusplus
      //       nextIndex++;
      //     }

      //     console.log(nextIndex);

      //     createTaskPayOrderIndex.value = nextIndex;
      //   }
      // }
      //  else {
      //   console.log(createTaskOrderInfo.value);
      //   // eslint-disable-next-line no-lonely-if
      //   if (
      //     createTaskPayOrderList.value.length ===
      //     createTaskOrderInfo.value.total
      //   ) {
      //     createTaskPayOrderIndex.value += 2;

      //     if (
      //       createTaskPayOrderIndex.value < createTaskPayOrderList.value.length
      //     ) {
      //       Message.info('已为您自动跳过创建失败的订单支付二维码');
      //     }
      //   } else {
      //     // if(createTaskPayOrderIndex.value === )
      //     console.log(createTaskPayOrderIndex.value, '下标');
      //     console.log(createTaskPayOrderList.value, '创建订单支付列表');
      //     console.log(createTaskOrderList.value, '创建订单列表');

      //     Message.info('请等待全部订单创建完成后再试');
      //     // return;
      //   }
      // }

      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        selectedKeys.value = [];
        if (
          createTaskOrderInfo.value.success +
            createTaskOrderInfo.value.error ===
          createTaskOrderList.value.length
        ) {
          createdOrderTimerClear();
          selectedKeys.value = [];
          createTaskPayLoading.value = true;
          createTaskPayTips.value = '当前订单已全部支付完成';
          waitQrcodeTips.value = '当前订单已全部支付完成';
          Message.success('订单已全部支付完成');
        }
      } else {
        selectedKeys.value = [
          createTaskOrderList.value[
            _.findIndex(createTaskOrderList.value, [
              'plantCode',
              createTaskPayOrderList.value[createTaskPayOrderIndex.value]
                .plantCode,
            ])
          ].plantCode,
        ];
        const createTaskOrderIndex: any =
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].index;
        if (
          [2, 5].includes(
            createTaskOrderList.value[createTaskOrderIndex].plantStatus
          )
        ) {
          createTaskPayLoading.value = true;
          waitQrcodeTips.value = '当前订单已支付完成';
          createTaskPayTips.value = '当前订单支付完成，请勿重复操作';
          // return;
        } else {
          waitQrcodeTips.value = '切换成功，请进行支付….';
          createTaskPayLoading.value = false;
          createTaskPayTips.value = '';
        }
      }
    } else {
      createdOrderTimerClear();
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
      Message.success('订单已全部支付完成');
    }
  };
  // 用于记录下标
  const firstInIndex = ref<any>(0);
  // 相同下标进入次数
  const sameIndexFrequency = ref<any>(1);
  const createdGetPlant = async () => {
    if (createdGetPlantReqVisable.value) {
      return;
    }

    if (createTaskId.value === 0) {
      return;
    }
    createdGetPlantReqVisable.value = true;
    createOverPayVisible.value = true;
    const { data } = await plantGrid({
      taskIds: createTaskId.value.join(','),
      pageIndex: 1,
      pageSize: 110,
      startDate: '2023-01-01',
      endDate: '2128-01-01',
    });

    createTaskOrderList.value = data.grid ? data.grid : [];
    createTaskOrderInfo.value = createTaskOrderInfoModel();
    createTaskOrderInfo.value.total = data.total;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < createTaskOrderList.value.length; i++) {
      const el = createTaskOrderList.value[i];
      switch (el.createStatus) {
        case 1:
          createTaskOrderInfo.value.success += 1;
          break;
        case 3:
          createTaskOrderInfo.value.error += 1;
          break;
        default:
          break;
      }

      if (el.plantStatus === 1 && el.createStatus === 1) {
        if (
          _.findIndex(createTaskPayOrderList.value, [
            'plantCode',
            el.plantCode,
          ]) === -1
        ) {
          let corproateId = 'undefined';
          if (el.sphInfo.sphUserType === 3) {
            corproateId = el.sphInfo.sphUniqid;
          }
          console.log('456789');
          createTaskPayOrderList.value.push({
            plantName: el.plantName,
            plantCode: el.plantCode,
            sphId: el.sphId,
            index: i,
            qrCodeVal: `https://channels.weixin.qq.com/promote/pages/mobile_pay?promotionId=${el.plantCode}&type=feed&userType=${el.sphInfo.sphUserType}&corproateId=${corproateId}`,
          });

          // createTaskPayOrderList.value[i] = {
          //   plantName: el.plantName,
          //   plantCode: el.plantCode,
          //   sphId: el.sphId,
          //   qrCodeVal: `https://channels.weixin.qq.com/promote/pages/mobile_pay?promotionId=${el.plantCode}&type=feed&userType=${el.sphInfo.sphUserType}&corproateId=${corproateId}`,
          // };
          // console.log(i, 'iiii', createTaskPayOrderList.value);
        }
      }
      if (el.plantStatus === 2 || el.plantStatus === 5) {
        createTaskOrderInfo.value.overPay += 1;
      }
    }

    createTaskOrderLoading.value = false;
    createdGetPlantReqVisable.value = false;
    if (createTaskPayOrderList.value.length === 1) {
      selectedKeys.value = [
        createTaskOrderList.value[
          _.findIndex(createTaskOrderList.value, [
            'plantCode',
            createTaskPayOrderList.value[0].plantCode,
          ])
        ].plantCode,
      ];
    }
    if (
      createTaskOrderInfo.value.total ===
        createTaskOrderInfo.value.success + createTaskOrderInfo.value.error &&
      createTaskOrderInfo.value.success === createTaskOrderInfo.value.overPay
    ) {
      createdOrderTimerClear();
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
      Message.success('当前订单已全部支付完成');
      return;
    }
    // if (
    //   createTaskOrderInfo.value.total ===
    //     createTaskOrderInfo.value.success + createTaskPayOrderIndex.value &&
    //   createTaskOrderInfo.value.total ===
    //     createTaskOrderInfo.value.success + createTaskOrderInfo.value.error
    // ) {
    //   console.log(
    //     createTaskOrderInfo.value.total,
    //     createTaskOrderInfo.value.success,
    //     createTaskPayOrderIndex.value,
    //     createTaskOrderInfo.value.error,
    //     123456
    //   );

    //   if (
    //     createTaskPayOrderList.value[createTaskPayOrderIndex.value] &&
    //     createTaskPayOrderList.value.length === 1
    //   ) {
    //     createTaskPayLoading.value = false;
    //     return;
    //   }
    //   createdOrderTimerClear();
    //   createTaskPayLoading.value = true;
    //   createTaskPayTips.value = '当前订单已全部支付完成';
    //   waitQrcodeTips.value = '当前订单已全部支付完成';
    //   Message.success('订单创建完成，可前往投放数据查看计划');
    //   return;
    // }
    // 翻页
    // if (createTaskPayOrderList.value.length > 0) {
    //   // 当前二维码下标
    //   const payOrderListIndex = Number(
    //     createTaskPayOrderList.value[createTaskPayOrderIndex.value].index
    //   );

    //   // 如果当前二维码下标%10 === 0 且当前二维码下标 !== 0  进行翻页操作
    //   if (
    //     payOrderListIndex % 10 === 0 &&
    //     payOrderListIndex !== 0 &&
    //     sameIndexFrequency.value === 1
    //   ) {
    //     sameIndexFrequency.value += 1;
    //     createPagination.value.current += 1;
    //   } else {
    //     sameIndexFrequency.value = 1;
    //   }
    //   firstInIndex.value = payOrderListIndex;
    // }
    // // 翻页
    // if (
    //   createTaskPayOrderList.value.length > 0 &&
    //   createTaskPayOrderList.value[createTaskPayOrderIndex.value]
    // ) {
    //   // 当前二维码下标
    //   const payOrderListIndex = Number(
    //     createTaskPayOrderList.value[createTaskPayOrderIndex.value].index
    //   );
    //   // 判断在执行相等之前，上一次记录的index是否跟当前二维码下标有变化
    //   if (firstInIndex.value !== payOrderListIndex) {
    //     sameIndexFrequency.value = 1;
    //   }
    //   firstInIndex.value = payOrderListIndex;

    //   // 如果当前二维码下标%10 === 0 且当前二维码下标 !== 0  进行翻页操作
    //   if (
    //     payOrderListIndex % 10 === 0 &&
    //     payOrderListIndex !== 0 &&
    //     sameIndexFrequency.value === 1
    //   ) {
    //     sameIndexFrequency.value += 1;
    //     createPagination.value.current += 1;
    //   }
    // }

    // if (
    //   createTaskOrderInfo.value.overPay > 1 &&
    //   createTaskOrderInfo.value.overPay !== createPagination.value.chengeNum &&
    //   createTaskOrderInfo.value.overPay % 10 === 0
    // ) {
    //   createPagination.value.current += 1;
    //   createPagination.value.chengeNum = createTaskOrderInfo.value.overPay;
    // }

    if (
      createTaskPayOrderIndex.value > 0 &&
      !JSON.parse(JSON.stringify(createTaskPayOrderList.value))[
        createTaskPayOrderIndex.value
      ]
    ) {
      // if (
      //   createTaskPayOrderList.value.length === createTaskOrderList.value.length
      // ) {
      //   createdOrderTimerClear();
      //   createTaskPayLoading.value = true;
      //   createTaskPayTips.value = '当前订单已全部支付完成';
      //   waitQrcodeTips.value = '当前订单已全部支付完成';
      //   // Message.success('订单创建完成，可前往投放数据查看计划');
      //   return;
      // }
    }
    if (
      createTaskOrderInfo.value.total !==
      createTaskOrderInfo.value.success + createTaskOrderInfo.value.error
    ) {
      setTimeout(() => {
        createdGetPlant();
      }, 1500);
    }
    if (
      createTaskOrderInfo.value.success !== createTaskOrderInfo.value.overPay
    ) {
      setTimeout(() => {
        createdGetPlant();
      }, 1500);
    }

    if (createTaskPayOrderList.value.length > 0) {
      // const nullArr = getTruthyIndexes(
      //   JSON.parse(JSON.stringify(createTaskPayOrderList.value))
      // );
      // console.log(
      //   _.findIndex(nullArr, function (e) {
      //     return e === 0;
      //   })
      // );

      // if (
      //   _.findIndex(nullArr, function (e) {
      //     return e === 0;
      //   }) === 0 &&
      //   createTaskPayOrderIndex.value === 0
      // ) {
      //   let nextIndex = createTaskPayOrderIndex.value + 1;
      //   while (nullArr.includes(nextIndex)) {
      //     // eslint-disable-next-line no-plusplus
      //     nextIndex++;
      //   }
      //   // Message.info('已为您自动跳过创建失败的订单支付二维码');

      //   console.log(nextIndex);

      //   createTaskPayOrderIndex.value = nextIndex;
      //   // createTaskPayOrderIndex.value = 1;
      //   console.log(nullArr, 'nullArr', createTaskPayOrderIndex.value);

      //   Message.info('已自动为您跳过创建失败的订单');
      //   createTaskPayLoading.value = false;

      //   return;
      // }

      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        createTaskPayLoading.value = true;
      } else {
        createTaskPayLoading.value = false;
      }
      if (waitQrcodeTips.value === '') {
        waitQrcodeTips.value = '等待支付中……';
      }
    }
  };

  const reqFormModel = () => {
    return {
      sequence: '',
      exportId: '',
      engineInfo: {
        groupId: null,
        packageId: null,
        sphIds: [],
        userVoucher: 3,
        ruleId: '',
        taskNum: 1,
        yjl: 100,
        videoUrl: '',
        taskArr: [],
        videoInfo: {},
        authorInfo: {},
        cityIdArr: [],
        videoTagArr: [],
        videoUserName: [],
      },
      feedPromotionOrderInfo: {
        promotionTarget: 6,
        promotionType: 1,
        estimatedWecoinAmount: '500',
        suggest: {
          gender: [],
          ageRange: [],
          cityIds: [],
          interestTag: [],
          roomInfo: {
            roomId: [],
          },
          similarUsernameList: [],
        },
        duration: '86400',
        pricingMethod: 1,
        internalInfo: {
          isInternal: false,
        },
      },
      voucherIds: [],
      deviceInfo: {
        deviceTypeId: 1,
      },
      baseReq: {
        featureFlag: 26,
      },
    };
  };
  const reqModel = ref(reqFormModel());
  const taskNumBoolean = ref(true);
  const packageGridList = ref<any>([]);
  const groupGridList = ref<any>([]);
  const sphGridList = ref<any>([]);
  const sphWxdouGridList = ref<any>([]);

  const estimatedWecoinAmountZdyVisble = ref(false);
  const estimatedWecoinAmountZdy = ref(500);
  const estimatedWecoinAmountType = ref(1);

  const wecoinBidZdyVisble = ref(false);
  const wecoinBidZdy = ref(40);
  const wecoinBidType = ref(1);

  const promotionTarget = ref('点赞数');
  const promotionTargetTextChange = (val: any) => {
    switch (val) {
      case 6:
        promotionTarget.value = '点赞数';
        // 出价方式为智能出价
        if (wecoinBidType.value === 1) {
          promotionTargetMember.value = 25;
        }
        break;
      case 12:
        promotionTarget.value = '覆盖人数';
        if (wecoinBidType.value === 1) {
          promotionTargetMember.value = 3334;
        }
        break;
      case 5:
        promotionTarget.value = '新增粉丝';
        if (wecoinBidType.value === 1) {
          promotionTargetMember.value = 8;
        }
        break;
      case 1:
        promotionTarget.value = '覆盖人数';
        if (wecoinBidType.value === 1) {
          promotionTargetMember.value = 3333;
        }
        break;
      case 8:
        promotionTarget.value = '商品成交';
        if (wecoinBidType.value === 1) {
          promotionTargetMember.value = 14;
        }
        break;
      case 7:
        promotionTarget.value = '商品点击';
        if (wecoinBidType.value === 1) {
          promotionTargetMember.value = 12;
        }
        break;

      case 11:
        promotionTarget.value = '覆盖人数';
        if (wecoinBidType.value === 1) {
          promotionTargetMember.value = 3333.3;
        }
        break;

      default:
        break;
    }
    promotionTargetMemberSum.value = Math.ceil(
      (promotionTargetMember.value *
        Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount)) /
        1000
    );
  };
  watch(
    () => reqModel.value.feedPromotionOrderInfo.promotionTarget,
    (newVal) => {
      console.log(newVal, 'newVal');
      promotionTargetTextChange(newVal);
    }
  );
  const promotionTargetMember = ref(25); // 原本 1667 如今改为第一次进来500微信豆 预计点赞数 25人 跟官方一样
  const promotionTargetMemberSum = ref(25); // 原本 1667

  const formGpVisible = ref(false);
  const formGpTitle = ref('新建分组');
  const formGpModel = ref({ name: null, type: 1 });
  const formGpRef = ref<FormInstance>();

  const formVideoTagVisible = ref(false);
  const formVideoVisible = ref(false);
  const targetAuthorList = ref<any>([]);
  const searchVideoQuery = ref('');
  const checkAuthorInfo = ref<any>({});
  const checkAuthorInfoVisible = ref(false);
  const checkVideoVisible = ref(false);
  const videoBottom = ref(false);
  const videoCurrenyIndex = ref(-1);
  const searchAuthVideoList = ref<any>([]);
  const searchAuthVideoLock = ref(false);
  const searchVideoGoodsVisible = ref(false);
  const searchVideoTime = ref(2);
  const searchVideoStartTs = ref('');
  const searchVideoEndTs = ref('');
  const searchVideoCurrent = ref(1);
  const searchVideoLastBuf = ref('');
  const videoQrcodeValue = ref('');
  const checkVideoInfo = ref<any>({});
  const labelContentloading = ref(false);
  const waitQrcodeTips = ref('');
  // 性别定向
  const gender = ref(0);
  const insertTag = ref(
    '[{"搞笑":"1083"},{"亲子":"1084"},{"二次元":"1085"},{"明星名人":"1086"},{"旅行风景":"1087"},{"舞蹈":"1088"},{"音乐":"1089"},{"运动":"1090"},{"影视综艺":"1091"},{"时尚":"1092"},{"美食":"1093"},{"萌宠":"1094"},{"动物":"1095"},{"游戏":"1096"},{"科技":"1097"},{"工业/机械/施工":"1098"},{"车":"1099"},{"生活":"1100"},{"新闻资讯":"1101"},{"知识":"1102"},{"悬疑/侦探剧场":"1103"},{"情感":"1104"},{"才艺":"1105"},{"生活技巧":"1106"}]'
  );
  const fansTag = ref<any>(
    '[{"accountInfos":[],"labelName":"摄影","labelId":"1"},{"accountInfos":[],"labelName":"音乐","labelId":"2"},{"accountInfos":[],"labelName":"生活","labelId":"3"},{"accountInfos":[],"labelName":"VLOG","labelId":"4"},{"accountInfos":[],"labelName":"美食","labelId":"5"},{"accountInfos":[],"labelName":"影视综","labelId":"6"},{"accountInfos":[],"labelName":"情感","labelId":"7"},{"accountInfos":[],"labelName":"旅行","labelId":"8"},{"accountInfos":[],"labelName":"职场","labelId":"9"},{"accountInfos":[],"labelName":"颜值","labelId":"10"},{"accountInfos":[],"labelName":"亲子","labelId":"11"},{"accountInfos":[],"labelName":"人文艺术","labelId":"12"},{"accountInfos":[],"labelName":"二次元","labelId":"13"},{"accountInfos":[],"labelName":"舞蹈","labelId":"14"},{"accountInfos":[],"labelName":"游戏","labelId":"15"},{"accountInfos":[],"labelName":"教育","labelId":"16"},{"accountInfos":[],"labelName":"宠物","labelId":"17"},{"accountInfos":[],"labelName":"体育","labelId":"18"},{"accountInfos":[],"labelName":"美妆","labelId":"19"},{"accountInfos":[],"labelName":"时尚","labelId":"20"},{"accountInfos":[],"labelName":"科学科普","labelId":"21"},{"accountInfos":[],"labelName":"搞笑","labelId":"22"},{"accountInfos":[],"labelName":"社会","labelId":"23"},{"accountInfos":[],"labelName":"汽车","labelId":"24"},{"accountInfos":[],"labelName":"财经","labelId":"25"},{"accountInfos":[],"labelName":"健康","labelId":"26"},{"accountInfos":[],"labelName":"剧情","labelId":"28"},{"accountInfos":[],"labelName":"三农","labelId":"29"},{"accountInfos":[],"labelName":"法律","labelId":"31"},{"accountInfos":[],"labelName":"娱乐","labelId":"32"},{"accountInfos":[],"labelName":"收藏","labelId":"33"},{"accountInfos":[],"labelName":"科技","labelId":"34"},{"accountInfos":[],"labelName":"星座运势","labelId":"35"},{"accountInfos":[],"labelName":"公益","labelId":"36"},{"accountInfos":[],"labelName":"历史","labelId":"37"},{"accountInfos":[],"labelName":"宗教","labelId":"38"},{"accountInfos":[],"labelName":"无法分类","labelId":"39"},{"accountInfos":[],"labelName":"军事","labelId":"40"}]'
  );
  const bottomBarList = [
    {
      label: '浏览',
      iconUrl: 'https://img.adyinqing.com/upai_shop/2vo96s3s1685331358030',
      value: 'readCount',
    },
    {
      label: '点赞',
      iconUrl: 'https://img.adyinqing.com/upai_shop/37yp0twk1685329463259',
      value: 'likeCount',
    },
    {
      label: '评论',
      iconUrl: 'https://img.adyinqing.com/upai_shop/pct8hpxr1685329463229',
      value: 'commentCount',
    },

    {
      label: '转发',
      iconUrl: 'https://img.adyinqing.com/upai_shop/cvbiirrf1685329463284',
      value: 'favCount',
    },
  ];
  insertTag.value = JSON.parse(insertTag.value);
  fansTag.value = JSON.parse(fansTag.value);
  // 定向推给你选择作者的粉丝
  const videoTagArr = ref([]);
  const videoUserName = ref([]);

  const labelActive = ref(0);
  const searchText = ref('');
  const selectBox = ref(false);
  const fansVideoTagRadio = ref(1);
  const fansVideoCheckOK = ref(false);
  const fansTagSearchGrid = ref<any>([]);

  const areaOptions: CascaderProps['options'] = [];

  const shutdownRuleList = ref<any>([]);
  const shutdownRuleCheck = ref<any>([]);

  const initAreaData = async () => {
    province.forEach((el: any) => {
      el.value = el.code;
      el.label = el.name;
      el.children = [];
      city.forEach((e: any) => {
        if (el.province === e.province) {
          e.value = e.code;
          e.label = e.name;
          el.children.push(e);
        }
      });

      areaOptions.push(el);
    });
  };
  initAreaData();
  const changeAreaTag = async (val: any) => {
    reqModel.value.feedPromotionOrderInfo.suggest.cityIds = [];
    val.forEach((el: any) => {
      if (el.length === 2) {
        reqModel.value.feedPromotionOrderInfo.suggest.cityIds.push(
          String(el[1])
        );
      } else {
        reqModel.value.feedPromotionOrderInfo.suggest.cityIds.push(
          String(el[0])
        );
      }
    });
    reqModel.value.engineInfo.cityIdArr = val;
  };

  const changeActive = async (e: any) => {
    labelActive.value = e;
    if (!reqModel.value.engineInfo.sphIds[0]) {
      Message.warning({
        content: '请先选择投放号',
        duration: 3 * 1000,
      });
      return;
    }
    if (fansTag.value[labelActive.value].accountInfos.length === 0) {
      labelContentloading.value = true;
      // 获取数据
      const { data } = await getLabelTag({
        sphId: reqModel.value.engineInfo.sphIds[0],
        labelId: fansTag.value[labelActive.value].labelId,
      });

      fansTag.value[labelActive.value].accountInfos =
        data.data.labelTag.accountInfos;

      fansTag.value[labelActive.value].accountInfos.forEach((element: any) => {
        element.select = false;
      });
      if (data) {
        labelContentloading.value = false;
      }
    }
  };
  const rowClick = (event) => {
    if (createTaskPayOrderList.value.length > 0) {
      console.log(event.plantCode, 'event.plantCode');
      if (
        _.findIndex(createTaskPayOrderList.value, [
          'plantCode',
          event.plantCode,
        ]) !== -1
      ) {
        if ([2, 5].includes(Number(event.plantStatus))) {
          createTaskPayLoading.value = true;
          waitQrcodeTips.value = '当前订单已支付完成';
          createTaskPayTips.value = '当前订单支付完成，请勿重复操作';
          // return;
        } else {
          waitQrcodeTips.value = '切换成功，请进行支付….';
          createTaskPayLoading.value = false;
          createTaskPayTips.value = '';
        }
        createTaskPayOrderIndex.value = _.findIndex(
          createTaskPayOrderList.value,
          ['plantCode', event.plantCode]
        );
        selectedKeys.value = [event.plantCode];
        if (![2, 5].includes(Number(event.plantStatus))) {
          createOrderDetailCheck();
        }
      } else {
        if (event.plantCode !== '0') {
          selectedKeys.value = [event.plantCode];
        } else {
          selectedKeys.value = [];
        }

        createTaskPayLoading.value = true;
        waitQrcodeTips.value = '计划创建失败，无法支付';
      }
    }
  };

  const getShutdownRuleGrid = async () => {
    const { data } = await shutdownRuleGrid({
      pageIndex: 1,
      pageSize: 100,
    });
    shutdownRuleList.value = data.grid || [];
  };

  getShutdownRuleGrid();

  const shutdownRuleChange = async (item: any) => {
    reqModel.value.engineInfo.ruleId = item.join(',');
  };
  const shutdownBoolChange = async () => {
    if (taskNumBoolean.value === false) {
      reqModel.value.engineInfo.ruleId = '';
    } else {
      shutdownRuleChange(shutdownRuleCheck.value);
    }
  };

  const searchTagAuth = async () => {
    if (searchText.value.length > 0) {
      selectBox.value = true;
      labelContentloading.value = true;
      try {
        const { data } = await getSearchAccount({
          sphId: reqModel.value.engineInfo.sphIds[0],
          query: searchText.value,
          pageIndex: 1,
          pageSize: 20,
        });
        fansTagSearchGrid.value = data.data.list;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false);
        labelContentloading.value = false;
      }
    } else {
      selectBox.value = false;
    }
  };
  const beforeUpload = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileType = file.type;

      // eslint-disable-next-line no-unsafe-optional-chaining
      const fileSize = file?.size / (1024 * 1024);
      console.log(fileSize, 'fileSize');
      console.log(fileType, ',fileType');

      if (fileSize > 1) {
        Message.error('上传图片大小超过1M限制');
        // eslint-disable-next-line no-promise-executor-return
        return reject(new Error('上传图片大小超过1M限制'));
      }

      // const allowedTypes = [
      //   'application/msword',
      //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //   'application/pdf',
      //   'application/png',
      // ];
      // console.log(fileType);

      // if (!allowedTypes.includes(fileType)) {
      //   // ;
      //   // eslint-disable-next-line no-promise-executor-return
      //   return reject(Message.error('只能上传文档文件！'));
      //   // 阻止文件上传
      // }

      // eslint-disable-next-line no-promise-executor-return
      return resolve(true);
    });
  };
  const flieList = ref<any[]>([]);
  const usePortrait = ref(false);
  const proofFileKey = ref('');
  const protraitUpload = async (option: any) => {
    if (!reqModel.value.engineInfo.sphIds[0]) {
      Message.warning({
        content: '请先选择被投号',
        duration: 3 * 1000,
      });
      return;
    }
    const { fileItem } = option;
    console.log(fileItem, option);

    const param = new FormData();
    param.append('file', fileItem.file);
    param.append('sphId', reqModel.value.engineInfo.sphIds[0]);
    const { data } = await getFileKey(param);
    proofFileKey.value = data.FileKey;
    flieList.value = [
      {
        uid: fileItem.uid,
        name: fileItem.file.name,
        url: '',
      },
    ];
    Message.success('上传成功。');
    console.log(data, flieList.value);

    // eslint-disable-next-line consistent-return
    // param.append('uin', uin.value);
    // param.append('authKey', authKey.value);
  };
  const pushContentInArr = (item: any, index: any) => {
    const findTagKey = videoTagArr.value.indexOf(item.nickName);
    console.log(findTagKey, item.nickName, videoTagArr.value);
    if (findTagKey >= 0) {
      videoTagArr.value.splice(videoTagArr.value.indexOf(item.nickName), 1);

      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.splice(
        reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.indexOf(
          item.username
        ),
        1
      );
      fansTag.value[labelActive.value].accountInfos[index].select = false;
    } else {
      if (videoTagArr.value.length >= 10) {
        Message.warning('最大只能选择10位作者');
        return;
      }
      videoTagArr.value.push(item.nickName);
      videoUserName.value.push(item.username);

      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.push(
        item.username
      );
      fansTag.value[labelActive.value].accountInfos[index].select = true;
    }

    // if (!fansTag.value[labelActive.value].accountInfos[index].select) {

    // } else {

    // }

    reqModel.value.engineInfo.videoTagArr = videoTagArr.value;
  };
  const textEnterChange = (ev: any) => {
    console.log(ev, videoTagArr.value, _.indexOf(videoTagArr.value, ev));
    videoTagArr.value.splice(_.indexOf(videoTagArr.value, ev), 1);
    Message.info('请通过点击添加作者的粉丝');
  };
  const textChange = (ev: any) => {
    fansTag.value[labelActive.value].accountInfos.forEach((element: any) => {
      if (element.nickName === ev) {
        element.select = false;
        reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.splice(
          reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.indexOf(
            element.username
          ),
          1
        );
      }
    });
  };

  const handleVideoTagBeforeOk = (done: any) => {
    console.log(
      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList
    );
    fansVideoCheckOK.value = true;
    fansVideoTagRadio.value = 2;
    formVideoTagVisible.value = false;
    done(false);
  };
  const handleVideoTagCancel = () => {
    if (
      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList
        .length === 0
    ) {
      formVideoTagVisible.value = false;
      fansVideoTagRadio.value = 1;
      fansVideoCheckOK.value = true;
      videoTagArr.value = [];
      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList = [];
    }
  };

  const createPaginationChange = async (page: any) => {
    createPagination.value.current = page;
  };
  const formJcRef = ref<FormInstance>();

  const { loading, setLoading } = useLoading(true);

  const sphGridSearch = async (params: any) => {
    const { data } = await sphGrid({
      pageIndex: 1,
      pageSize: 100,
      sphName: params,
    });
    const formatData = data.grid.map((el: any) => {
      el.realSphName = el.sphName;

      el.sphName = `（${el.sphRemark ? el.sphRemark : '-'}）${
        el.sphName
      }   \u00A0\u00A0\u00A0\u00A0  ${el.sphBalance}\u00A0微信豆`;
      return el;
    });
    console.log(formatData, 'formatData');
    if (reqModel.value.engineInfo.sphIds.length) {
      sphWxdouGridList.value = reqModel.value.engineInfo.sphIds.map(
        (e: any) => {
          return _.find(data.grid, ['sphId', e]);
        }
      );
    }

    sphGridList.value = formatData || [];
  };
  watch(searchVideoGoodsVisible, (newValue: any, oldValue: any) => {
    if (searchVideoGoodsVisible.value) {
      placeholderText.value = '需在1000-300000之间';
    } else {
      placeholderText.value = '需在500-300000之间';
    }
  });
  const groupGridSearch = async (params: any) => {
    const { data } = await plantGroupGrid({
      pageIndex: 1,
      pageSize: 100,
      name: params,
    });
    groupGridList.value = data.grid || [];
  };

  const packageGridSearch = async (params: any) => {
    let packageId: any;
    if (localStorage.getItem('createPlant')) {
      const req: any = JSON.parse(localStorage.getItem('createPlant'));
      console.log(req.engineInfo.packageId, 'req.packageId');
      if (req.engineInfo.packageId) {
        packageId = req.engineInfo.packageId;
      }
    }
    const { data } = await plantPackageGrid({
      pageIndex: 1,
      pageSize: 100,
      name: params,
      packageId,
    });
    packageGridList.value = data.grid || [];
  };

  const removeObjects = (obj: any, key: any) => {
    Object.keys(obj).forEach((k) => {
      if (k === key) {
        delete obj[k]; // 删除对象的key
      }
    });
    return obj;
  };

  const wecoinBidTypeChange = async () => {
    console.log(
      reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100,
      'wecoinBidTypeChange',
      wecoinBidType.value
    );

    switch (wecoinBidType.value) {
      case 1:
        wecoinBidZdyVisble.value = false;
        if (reqModel.value.feedPromotionOrderInfo.promotionTarget === 11) {
          reqModel.value.feedPromotionOrderInfo.suggest = removeObjects(
            reqModel.value.feedPromotionOrderInfo.suggest,
            'roiBidX100'
          );
          promotionTarget.value = '覆盖人数';
        }
        reqModel.value.feedPromotionOrderInfo.suggest = removeObjects(
          reqModel.value.feedPromotionOrderInfo.suggest,
          'wecoinBid'
        );
        // 判断是否有商品链接
        if (!searchVideoGoodsVisible.value) {
          if (reqModel.value.feedPromotionOrderInfo.promotionTarget === 1) {
            reqModel.value.feedPromotionOrderInfo = removeObjects(
              reqModel.value.feedPromotionOrderInfo,
              'pricingMethod'
            );
          } else {
            reqModel.value.feedPromotionOrderInfo.pricingMethod = 1;
          }
        } else {
          switch (reqModel.value.feedPromotionOrderInfo.promotionTarget) {
            case 8:
              reqModel.value.feedPromotionOrderInfo.pricingMethod = 0;
              break;
            case 7:
              reqModel.value.feedPromotionOrderInfo.pricingMethod = 0;
              break;
            case 11:
              reqModel.value.feedPromotionOrderInfo.pricingMethod = 0;
              break;
            default:
              break;
          }
        }

        // promotionTargetMember.value = 1667;
        estimatedWecoinAmountZdyChange();
        estimatedWecoinAmountTypeChange();
        // promotionTarget.value = '覆盖人数';
        // 重新赋值promotionTargetMember
        promotionTargetTextChange(
          reqModel.value.feedPromotionOrderInfo.promotionTarget
        );

        // promotionTargetChange();
        break;
      case 2:
        wecoinBidZdyVisble.value = true;
        if (reqModel.value.feedPromotionOrderInfo.promotionTarget === 11) {
          reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100 = Number(
            (Number(wecoinBidZdy.value) * 100).toFixed(2)
          );
          promotionTarget.value = '下单金额';
        } else {
          reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid = String(
            Number(wecoinBidZdy.value) * 100
          );
        }

        reqModel.value.feedPromotionOrderInfo.pricingMethod = 1;
        promotionTargetMember.value = 24;

        estimatedWecoinAmountZdyChange();
        estimatedWecoinAmountTypeChange();
        // promotionTargetChange();
        break;
      default:
        break;
    }
    console.log(reqModel.value);
  };
  const promotionTypeChange = (event: any) => {
    console.log(event, 'promotionTypeChange');
    // 选择智能加热的时候 清空suggest内之前选中过的内容
    if (event === 1) {
      reqModel.value.feedPromotionOrderInfo.suggest.ageRange = [];
      reqModel.value.feedPromotionOrderInfo.suggest.cityIds = [];
      reqModel.value.feedPromotionOrderInfo.suggest.gender = [];
      delete reqModel.value.feedPromotionOrderInfo.suggest.deviceTypes;
      reqModel.value.feedPromotionOrderInfo.suggest.interestTag = [];
      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList = [];
      reqModel.value.feedPromotionOrderInfo.duration = '86400';
      reqModel.value.engineInfo.cityIdArr = [];
      videoTagArr.value = []; // 视频tag清空
      areaValue.value = []; // 地区推荐清空
      deviceType.value = 0; // 设备清空
      gender.value = 0; // 性别不限
      fansVideoTagRadio.value = 1; // 粉丝层推荐 选择不限
    }
  };
  const numF = (num: any) => {
    num = Number(num) / 100;
    return num;
  };
  function numFormat(num: any) {
    num = Number(num);
    if (num >= 10000) {
      num = `${Math.floor(num / 1000) / 10}W+`;
    } else if (num >= 1000) {
      num = `${Math.floor(num / 100) / 10}K+`;
    }

    return num;
  }
  const promotionTargetChange = async () => {
    console.log('promotionTargetChange');

    switch (reqModel.value.feedPromotionOrderInfo.promotionTarget) {
      case 6:
        promotionTarget.value = '点赞数';

        break;
      case 12:
        promotionTarget.value = '覆盖人数';

        break;
      case 5:
        promotionTarget.value = '新增粉丝';

        break;
      case 1:
        promotionTarget.value = '覆盖人数';

        break;
      case 8:
        promotionTarget.value = '成交人数';
        placeholderText.value = '需在1000-300000之间';
        estimatedWecoinAmountZdy.value = 1000;
        if (reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100) {
          reqModel.value.feedPromotionOrderInfo.suggest = removeObjects(
            reqModel.value.feedPromotionOrderInfo.suggest,
            'wecoinBid'
          );
        }
        break;
      case 7:
        promotionTarget.value = '点击人数';
        placeholderText.value = '需在1000-300000之间';
        estimatedWecoinAmountZdy.value = 1000;

        break;

      case 11:
        estimatedWecoinAmountZdy.value = 3000;
        promotionTarget.value = '覆盖人数';

        placeholderText.value = '需在3000-300000之间';
        if (wecoinBidType.value === 2) {
          wecoinBidZdy.value = undefined;
        }
        break;

      default:
        break;
    }
    wecoinBidTypeChange();
    // if (
    //   reqModel.value.feedPromotionOrderInfo.promotionTarget === 9 ||
    //   reqModel.value.feedPromotionOrderInfo.promotionTarget === 8
    // ) {
    //   promotionTargetMemberSum.value =
    //     (30 *
    //       Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount)) /
    //     1000;
    //   promotionTargetMember.value = 30;
    // } else {
    //   promotionTargetMemberSum.value =
    //     (1667 *
    //       Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount)) /
    //     1000;
    //   promotionTargetMember.value = 1667
    // }
  };
  const estimatedWecoinAmountTypeChange = async () => {
    console.log(
      'change',
      estimatedWecoinAmountType.value,
      reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100
    );
    switch (estimatedWecoinAmountType.value) {
      case 1:
        estimatedWecoinAmountZdyVisble.value = false;
        reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount =
          searchVideoGoodsVisible.value ? `1000` : `500`;
        if (reqModel.value.feedPromotionOrderInfo.promotionTarget === 11) {
          reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount = '3000';
        }

        promotionTargetMemberSum.value = Math.ceil(
          (promotionTargetMember.value *
            Number(
              reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount
            )) /
            1000
        );

        break;
      case 2:
        estimatedWecoinAmountZdyVisble.value = false;
        reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount =
          searchVideoGoodsVisible.value ? `2000` : `1000`;
        if (reqModel.value.feedPromotionOrderInfo.promotionTarget === 11) {
          reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount = '5000';
        }

        promotionTargetMemberSum.value = Math.ceil(
          (promotionTargetMember.value *
            Number(
              reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount
            )) /
            1000
        );
        break;
      case 3:
        estimatedWecoinAmountZdyVisble.value = true;
        estimatedWecoinAmountZdyChange();
        break;
      default:
        break;
    }
  };

  const estimatedWecoinAmountZdyChange = async () => {
    reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount = String(
      estimatedWecoinAmountZdy.value
    );
    promotionTargetMemberSum.value = Math.ceil(
      (promotionTargetMember.value *
        Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount)) /
        1000
    );
  };
  const wecoinBidZdyChange = async () => {
    if (reqModel.value.feedPromotionOrderInfo.promotionTarget === 11) {
      reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100 = Number(
        (wecoinBidZdy.value * 100).toFixed(2)
      );
    } else {
      reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid = String(
        wecoinBidZdy.value * 100
      );
    }

    console.log(reqModel.value.feedPromotionOrderInfo.suggest);
  };

  const reqGenderChange = async (item: any) => {
    switch (gender.value) {
      case 0:
        reqModel.value.feedPromotionOrderInfo.suggest.gender = [];
        break;
      case 1:
        reqModel.value.feedPromotionOrderInfo.suggest.gender = [1];
        break;
      case 2:
        reqModel.value.feedPromotionOrderInfo.suggest.gender = [2];
        break;
      default:
        reqModel.value.feedPromotionOrderInfo.suggest.gender = [];
        break;
    }
  };
  // 设备定向
  const deviceType = ref(0);

  const deviceTypesChange = async () => {
    switch (deviceType.value) {
      case 0:
        delete reqModel.value.feedPromotionOrderInfo.suggest.deviceTypes;
        break;
      case 1:
        reqModel.value.feedPromotionOrderInfo.suggest.deviceTypes = [1];
        break;
      case 2:
        reqModel.value.feedPromotionOrderInfo.suggest.deviceTypes = [2];
        break;
      default:
        delete reqModel.value.feedPromotionOrderInfo.suggest.deviceTypes;
        break;
    }
  };

  const handleGpClick = async (type: any) => {
    if (type === 2) {
      formGpTitle.value = '新增计划包';
    } else {
      formGpTitle.value = '新增分组';
    }
    formGpModel.value.type = type;
    formGpVisible.value = true;
  };

  const handleGpBeforeOk = async (done: any) => {
    const res = await formGpRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (formGpModel.value.type === 1) {
      const { data, code } = await plantGroupAdd({
        name: formGpModel.value.name,
      });
      if (code === 200) {
        Message.success({
          content: '添加分组成功',
          duration: 5 * 1000,
        });
      }

      await groupGridSearch('');
    } else {
      const { data, code } = await plantPackageAdd({
        name: formGpModel.value.name,
      });
      if (code === 200) {
        Message.success({
          content: '添加计划包成功',
          duration: 5 * 1000,
        });
      }

      await packageGridSearch('');
    }
    formGpModel.value.name = null;
    window.setTimeout(() => {
      done();
    }, 300);
  };

  const handleVideoClick = async () => {
    if (!reqModel.value.engineInfo.sphIds[0]) {
      Message.warning({
        content: '请先选择投放号',
        duration: 3 * 1000,
      });
      return;
    }

    formVideoVisible.value = true;
    setLoading(true);
    try {
      const { data } = await getTargetAuthor({
        sphId: reqModel.value.engineInfo.sphIds[0],
      });
      targetAuthorList.value = data.data.accountInfos;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const searchVideoAccount = async () => {
    if (!searchVideoQuery.value) {
      Message.warning({
        content: '请填写搜索内容',
        duration: 3 * 1000,
      });
      return;
    }
    setLoading(true);
    try {
      const { data } = await getSearchAccount({
        sphId: reqModel.value.engineInfo.sphIds[0],
        query: searchVideoQuery.value,
        pageIndex: 1,
        pageSize: 6,
      });
      targetAuthorList.value = data.data.list;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const handelVideoSearchClick = async (index: any, item: any) => {
    videoCurrenyIndex.value = index;
    checkVideoInfo.value = item;
  };
  const router = useRouter();
  const herfLogin = () => {
    router.push({
      name: 'sphList',
    });
  };
  const getShourtLink = async () => {
    videoQrcodeValue.value = '';
    const { data } = await getObjectShortLink({
      sphId: reqModel.value.engineInfo.sphIds[0],
      exportId: checkVideoInfo.value.exportId,
      nonceId: checkVideoInfo.value.nonce,
    });
    videoQrcodeValue.value = data.data.shortUrl;
    reqModel.value.engineInfo.videoUrl = data.data.shortUrl;
  };

  const handleVideoCheckBeforeOk = (done: any) => {
    if (videoCurrenyIndex.value === -1) {
      Message.warning({
        content: '请点击选择你要加热的视频',
        duration: 3 * 1000,
      });
      done(false);
      return;
    }
    if (Object.values(checkVideoInfo.value).length > 0) {
      searchVideoGoodsVisible.value = false;
      checkVideoVisible.value = true;

      reqModel.value.exportId = checkVideoInfo.value.exportId;
      reqModel.value.engineInfo.videoInfo = checkVideoInfo.value;
      reqModel.value.engineInfo.authorInfo = checkAuthorInfo.value;
      if (checkVideoInfo.value.shoppingcartJumpinfo.wording) {
        searchVideoGoodsVisible.value = true;
        reqModel.value.feedPromotionOrderInfo.promotionTarget = 8;
        reqModel.value.feedPromotionOrderInfo.pricingMethod = 0;
        console.log('有商品链接');

        getShourtLink();
        promotionTargetChange();
      } else {
        console.log('无商品链接');

        reqModel.value.feedPromotionOrderInfo.promotionTarget = 6;
        reqModel.value.feedPromotionOrderInfo.pricingMethod = 1;
      }
    }
    formVideoVisible.value = false;
    done(false);
  };

  const changeFansTag = async () => {
    if (fansVideoTagRadio.value === 1) {
      videoTagArr.value = [];
      formVideoTagVisible.value = false;
      // fansTag.value[labelActive.value].accountInfos = [];
      console.log(fansTag.value[labelActive.value].accountInfos);
      fansTag.value[labelActive.value].accountInfos = fansTag.value[
        labelActive.value
      ].accountInfos.map((e) => {
        e.select = false;
        return e;
      });
      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList = [];
    }
  };
  // 客服二维码 回调
  // const serviceQrCodeOk = async () => {
  //   serviceQrCode.value=false;
  // };
  const searchAuthVideo = async () => {
    if (searchAuthVideoLock.value) {
      return;
    }
    searchAuthVideoLock.value = true;
    setLoading(true);
    switch (searchVideoTime.value) {
      case 1:
        searchVideoStartTs.value = dayjs().add(-7, 'day').format('YYYY-MM-DD');
        searchVideoEndTs.value = dayjs().format('YYYY-MM-DD');
        break;
      case 2:
        searchVideoStartTs.value = dayjs()
          .add(-3, 'month')
          .format('YYYY-MM-DD');
        searchVideoEndTs.value = dayjs().format('YYYY-MM-DD');
        break;
      default:
        searchVideoStartTs.value = dayjs().add(-7, 'day').format('YYYY-MM-DD');
        searchVideoEndTs.value = dayjs().format('YYYY-MM-DD');
        break;
    }
    try {
      // const uploadPromises: any = [];
      // console.log(
      //   reqModel.value.engineInfo,
      //   'reqModel.value.engineInfo.sphIds'
      // );
      // if (reqModel.value.engineInfo.sphIds.length) {
      //   for (let i = 0; i < reqModel.value.engineInfo.sphIds.length; i += 1) {
      //     const promise = new Promise((resolve, reject) => {
      //       getFinderObject({
      //         sphId: reqModel.value.engineInfo.sphIds[i],
      //         encryptedUsername: checkAuthorInfo.value?.username,
      //         startTs: searchVideoStartTs.value,
      //         endTs: searchVideoEndTs.value,
      //         lastBuf: searchVideoLastBuf.value,
      //       }).then(({ data }) => {
      //         resolve(data);
      //       });
      //     });
      //     uploadPromises.push(promise);
      //   }
      // }
      // await Promise.all(uploadPromises).then((data) => {
      //   console.log(data);
      //   if (
      //     data[0].data.objects.length === 0 ||
      //     data[0].data.objects.length < 19
      //   ) {
      //     videoBottom.value = true;
      //   }
      //   data[0].data.objects.forEach((el: any) => {
      //     searchAuthVideoList.value.push(el);
      //   });
      //   searchVideoLastBuf.value = data.data.lastBuf;
      // });
      const { data } = await getFinderObject({
        sphId: reqModel.value.engineInfo.sphIds[0],
        encryptedUsername: checkAuthorInfo.value?.username,
        startTs: searchVideoStartTs.value,
        endTs: searchVideoEndTs.value,
        lastBuf: searchVideoLastBuf.value,
      });
      if (data.data.objects.length === 0 || data.data.objects.length < 19) {
        videoBottom.value = true;
      }
      data.data.objects.forEach((el: any) => {
        searchAuthVideoList.value.push(el);
      });

      searchVideoLastBuf.value = data.data.lastBuf;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
      searchAuthVideoLock.value = false;
      searchVideoCurrent.value += 1;
    }
  };
  const sphIdsChange = async (val: any) => {
    console.log(val, 'sphIdsChange');
    // if (checkAuthorInfo.value?.username) {
    const uploadPromises = [];
    if (val.length) {
      for (let i = 0; i < val.length; i += 1) {
        const promise = new Promise((resolve, reject) => {
          getTargetAuthor({
            sphId: val[i],
          })
            .then(({ data }) => {
              resolve(data);
            })
            .catch((res) => {
              console.log(res);
              reject(val[i]);
            });
        });
        uploadPromises.push(promise);
      }
    }
    await Promise.all(uploadPromises)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        reqModel.value.engineInfo.sphIds =
          reqModel.value.engineInfo.sphIds.filter((item: any) => item !== e);
        console.log(e, 'catch e');
      });
    sphWxdouGridList.value = reqModel.value.engineInfo.sphIds.map((e: any) => {
      console.log(_.find(sphGridList.value, ['sphId', e]), '4567890-');

      return _.find(sphGridList.value, ['sphId', e]);
    });
    console.log(sphWxdouGridList.value);
    // }
  };
  function findSelectedKeys() {
    console.log('checkout');
    if (createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
      const index = _.findIndex(createTaskOrderList.value, [
        'plantCode',
        createTaskPayOrderList.value[createTaskPayOrderIndex.value].plantCode,
      ]);
      selectedKeys.value = [createTaskOrderList.value[index].plantCode];
      setTimeout(createOrderDetailCheck, 1400);
    } else {
      if (createTaskPayTips.value === '当前订单已全部支付完成') {
        return;
      }
      setTimeout(() => {
        findSelectedKeys();
      }, 1000);
    }
  }

  const createOrderDetailCheck = async () => {
    if (createTaskPayOrderList.value.length > 0) {
      if (createdGetInfoReqVisable.value) {
        return;
      }

      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        return;
      }

      createdGetInfoReqVisable.value = true;
      const { plantCode } =
        createTaskPayOrderList.value[createTaskPayOrderIndex.value];
      const { data } = await getOrderDetail({
        sphId:
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].sphId,
        promotionId:
          createTaskPayOrderList.value[createTaskPayOrderIndex.value].plantCode,
      });
      createdGetInfoReqVisable.value = false;
      if (data) {
        if (
          Number(data.data.order.orderInfo.status) === 5 ||
          Number(data.data.order.orderInfo.status) === 2
        ) {
          createdGetPlant();
          waitQrcodeTips.value = '支付完成，正在切换下个订单….';
          Message.success('支付完成，请支付下一个订单');
          // setTimeout(() => {

          createTaskPayOrderIndex.value += 1;
          // 判断当前下标是否适合翻页
          if (
            createTaskPayOrderList.value[createTaskPayOrderIndex.value] &&
            Number(
              createTaskPayOrderList.value[createTaskPayOrderIndex.value].index
            ) %
              10 ===
              0
          ) {
            createPagination.value.current += 1;
            //   createPagination.value.chengeNum = createTaskOrderInfo.value.overPay;
          }
          // 更换选中内容
          if (createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
            const index = _.findIndex(createTaskOrderList.value, [
              'plantCode',
              createTaskPayOrderList.value[createTaskPayOrderIndex.value]
                .plantCode,
            ]);
            selectedKeys.value = [createTaskOrderList.value[index].plantCode];
          }
          // else {
          //   selectedKeys.value = [];
          //   setTimeout(() => {
          //     findSelectedKeys();
          //   }, 1000);
          // }
          // const nextPlantStatus = Number(
          //   createTaskOrderList.value[createTaskPayOrderIndex.value].plantStatus
          // );

          // if (nextPlantStatus === 2 || nextPlantStatus === 5) {
          //   waitQrcodeTips.value = '当前订单已支付完成';
          //   return;
          // }
          waitQrcodeTips.value = '切换成功，请进行支付….';
          // }, 1500);
        }
      }
    }
    if (
      createTaskOrderInfo.value.success + createTaskOrderInfo.value.error ===
        createTaskOrderList.value.overPay &&
      createTaskOrderInfo.value.success === createTaskOrderInfo.value.overPay
    ) {
      createdOrderTimerClear();
      selectedKeys.value = [];
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
      Message.success('订单已全部支付完成');
      return;
    }
    setTimeout(createOrderDetailCheck, 1400);
  };
  const createOrderDisabled = ref(false);
  const createOrder = async () => {
    if (
      wecoinBidType.value === 2 &&
      Number(wecoinBidZdy.value) >
        Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount) / 2
    ) {
      Message.error({
        content: '出价设置过高，请重新设置(出价金额必须小于订单金额的一半)',
        duration: 5 * 1000,
      });
      return;
    }
    if (wecoinBidType.value === 2 && wecoinBidZdy.value === undefined) {
      Message.error({
        content: '请填写自定义出价方式',
        duration: 5 * 1000,
      });
      return;
    }
    createOrderDisabled.value = true;

    const res = await formJcRef.value?.validate();

    if (res) {
      return;
    }
    if (!reqModel.value.exportId) {
      createOrderDisabled.value = false;
      Message.error({
        content: '请选择需要加热的视频',
        duration: 5 * 1000,
      });
      return;
    }

    try {
      if (usePortrait.value) {
        reqModel.value.feedPromotionOrderInfo.proofFileKey = proofFileKey.value;
      } else {
        delete reqModel.value.feedPromotionOrderInfo.proofFileKey;
      }
      reqModel.value = removeObjects(reqModel.value, 'createTaskBefore');
      console.log(reqModel.value, 'reqModel.value');
      console.log(JSON.stringify(reqModel.value), 'reqModel.value');
      const { data } = await createTask({
        reqJson: JSON.stringify(reqModel.value),
      });
      // console.log(911, data)
      //     if (code == 1005) {
      //       serviceQrCode.value = true
      // return
      //     }
      createTaskId.value = data.taskId;
      if (data) {
        Message.success({
          content: '创建成功，请等待系统创建订单',
          duration: 5 * 1000,
        });
      } else {
        Message.error({
          content: '创建失败，请刷新页面后重新创建',
          duration: 5 * 1000,
        });
      }
    } catch (err) {
      createOrderDisabled.value = false;
      createTaskId.value = 0;
      setTimeout(() => {
        createdGetPlantReqVisable.value = true;
        createOverPayVisible.value = false;
      }, 1000);
      console.log(err, 'err');
      // you can report use errorHandler or other
    } finally {
      console.log(1111111);
      // you can report use errorHandler or other
      setTimeout(() => {
        createOrderDisabled.value = false;
      }, 5000);
      reqModel.value.createTaskBefore = 1;
      localStorage.setItem('createPlant', JSON.stringify(reqModel.value));

      createdGetPlantReqVisable.value = false;
      createdGetInfoReqVisable.value = false;
      createTaskOrderLoading.value = true;
      createTaskPayLoading.value = true;
      createTaskPayOrderIndex.value = 0;
      createTaskPayOrderList.value = [];
      createTaskPayTips.value = '正在创建支付订单';
      createPagination.value.current = 1;
      createPagination.value.chengeNum = 0;

      createdGetPlant();
      createOrderDetailCheck();
      // createdPlantTimer.value = setInterval(async function () {
      //   createdGetPlant();
      // }, 1000);
      // console.log(createdPlantTimer.value, 'create')
    }
  };

  const initStorage = async () => {
    if (localStorage.getItem('createPlant')) {
      reqModel.value = JSON.parse(localStorage.getItem('createPlant'));
      // req用于保证复投中estimatedWecoinAmount不被修改
      const req = JSON.parse(localStorage.getItem('createPlant'));
      console.log(req.engineInfo.packageId, 'req.packageId');
      // if (req.engineInfo.packageId) {
      //   packageGridSearch(null, req.packageId);
      // }
      if (reqModel.value.createTaskBefore !== 1) {
        reqModel.value.engineInfo.sphIds = [reqModel.value.engineInfo.sphId];
      }

      if (reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid) {
        if (
          Number(reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid) > 0
        ) {
          wecoinBidZdyVisble.value = true;
          wecoinBidType.value = 2;
          wecoinBidZdy.value =
            Number(reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid) /
            100;
          if (
            reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100 &&
            req.feedPromotionOrderInfo.promotionTarget === 11
          ) {
            wecoinBidZdy.value =
              Number(req.feedPromotionOrderInfo.suggest.roiBidX100) / 100;
            console.log(
              wecoinBidZdy.value,
              reqModel.value.feedPromotionOrderInfo.suggest,
              'wecoinBid53'
            );
          }
        }
      } else if (
        reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100 &&
        req.feedPromotionOrderInfo.promotionTarget === 11
      ) {
        console.log(
          reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100,
          'wecoinBid51-before'
        );
        wecoinBidType.value = 2;

        wecoinBidZdy.value =
          Number(req.feedPromotionOrderInfo.suggest.roiBidX100) / 100;
        console.log(
          wecoinBidZdy.value,
          reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100,
          'wecoinBid51'
        );
      }

      if (reqModel.value.exportId) {
        checkVideoVisible.value = true;
        checkVideoInfo.value = reqModel.value.engineInfo.videoInfo;
        checkAuthorInfoVisible.value = true;
        checkAuthorInfo.value = reqModel.value.engineInfo.authorInfo;

        if (reqModel.value.engineInfo.videoInfo.shoppingcartJumpinfo.wording) {
          console.log('test');

          searchVideoGoodsVisible.value = true;
          // reqModel.value.feedPromotionOrderInfo.promotionTarget = 8;

          getShourtLink();
          console.log(
            reqModel.value.feedPromotionOrderInfo.promotionTarget,
            'if',
            wecoinBidType.value
          );

          promotionTargetChange();
        }
      }
      console.log(
        req.feedPromotionOrderInfo.estimatedWecoinAmount,
        'req',
        searchVideoGoodsVisible.value
      );

      console.log(
        reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid,
        'wecoinBid4'
      );
      if (reqModel.value.engineInfo.ruleId) {
        console.log(
          reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid,
          'wecoinBid3'
        );

        shutdownRuleCheck.value = reqModel.value.engineInfo.ruleId.split(',');
        shutdownRuleCheck.value.forEach((el: any, key: any) => {
          shutdownRuleCheck.value[key] = Number(el);
        });
      }

      switch (req.feedPromotionOrderInfo.estimatedWecoinAmount) {
        case '500':
          estimatedWecoinAmountType.value = 1;
          break;
        case '1000':
          console.log(
            reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount,
            '1',
            searchVideoGoodsVisible.value
          );

          estimatedWecoinAmountType.value = searchVideoGoodsVisible.value
            ? 1
            : 2;
          // 无商品链接时复投选择1000时estimatedWecoinAmountType.value为2
          break;
        case '2000':
          console.log(
            reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount,
            '2',
            searchVideoGoodsVisible.value
          );

          estimatedWecoinAmountType.value = 2;
          break;
        default:
          console.log(
            req.feedPromotionOrderInfo.estimatedWecoinAmount,
            '3',
            searchVideoGoodsVisible.value
          );

          estimatedWecoinAmountType.value = 3;

          estimatedWecoinAmountZdy.value = Number(
            req.feedPromotionOrderInfo.estimatedWecoinAmount
          );
          if (reqModel.value.feedPromotionOrderInfo.promotionTarget === 11) {
            let type = 3;
            if (req.feedPromotionOrderInfo.estimatedWecoinAmount === '3000') {
              type = 1;
            } else if (
              req.feedPromotionOrderInfo.estimatedWecoinAmount === '5000'
            ) {
              type = 2;
            }
            estimatedWecoinAmountType.value = type;
          }
          console.log(Number(req.feedPromotionOrderInfo.estimatedWecoinAmount));
          break;
      }
      const { suggest } = reqModel.value.feedPromotionOrderInfo;
      if (suggest.gender.length > 0 && suggest.gender[0] === 1) {
        gender.value = 1;
      }
      if (suggest.gender.length > 0 && suggest.gender[0] === 2) {
        gender.value = 2;
      }

      if (suggest.deviceTypes) {
        deviceType.value = suggest.deviceTypes.indexOf(1) === 0 ? 1 : 2;
      }

      if (suggest.similarUsernameList.length > 0) {
        fansVideoTagRadio.value = 2;
        fansVideoCheckOK.value = true;
        videoTagArr.value = reqModel.value.engineInfo.videoTagArr;
      }
      areaValue.value = reqModel.value.engineInfo.cityIdArr;
      wecoinBidTypeChange();
      console.log(
        wecoinBidType.value,
        reqModel.value,
        'estimatedWecoinAmountType.value'
      );
      if (
        wecoinBidType.value === 2 &&
        req.feedPromotionOrderInfo.suggest.roiBidX100 &&
        req.feedPromotionOrderInfo.promotionTarget === 11
      ) {
        wecoinBidZdy.value =
          Number(req.feedPromotionOrderInfo.suggest.roiBidX100) / 100;
        console.log(
          wecoinBidZdy.value,
          reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100,
          'wecoinBid52'
        );
      }
      // 缓存内 智能加热 则清空suggest内全部选项
      if (req.feedPromotionOrderInfo.promotionType === 1) {
        // reqModel.value.feedPromotionOrderInfo.suggest.ageRange = [];
        // reqModel.value.feedPromotionOrderInfo.suggest.cityIds = [];
        // reqModel.value.feedPromotionOrderInfo.suggest.gender = [];
        // reqModel.value.feedPromotionOrderInfo.suggest.interestTag = [];
        // reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList = [];

        // videoTagArr.value = []; // 视频tag清空
        // areaValue.value = []; // 地区推荐清空
        // deviceType.value = 0; // 设备清空
        // gender.value = 0; // 性别不限
        // fansVideoTagRadio.value = 1; // 粉丝层推荐 选择不限
        promotionTypeChange(1);
      }
      estimatedWecoinAmountTypeChange();
      if (
        req.feedPromotionOrderInfo.suggest.roiBidX100 &&
        req.feedPromotionOrderInfo.promotionTarget === 11
      ) {
        reqModel.value.feedPromotionOrderInfo.suggest.roiBidX100 =
          req.feedPromotionOrderInfo.suggest.roiBidX100;
      }
    }
  };

  const handelAuthSearchClick = async (item: any) => {
    checkAuthorInfo.value = item;
    checkAuthorInfoVisible.value = true;
    searchVideoCurrent.value = 1;
    searchVideoLastBuf.value = '';
    searchAuthVideoList.value = [];
    await searchAuthVideo();
  };

  const initData = () => {
    sphGridSearch(null);
    packageGridSearch(null);
    groupGridSearch(null);
  };

  initData();

  onMounted(() => {
    initStorage();
  });
</script>

<style lang="less" scoped>
  // .serviceQrCode{
  // 	.txt{
  // 		font-size:16px;
  // 		text-align: center;
  // 	}
  // 	.img{
  // 		width:130px;
  // 		height:130px;
  // 		margin: 20px auto 0 auto;
  // 		display: block;
  // 	}
  // }

  .titleBox {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .container {
    padding: 0 17px 17px;
  }
  .searchContentBox {
    width: 100%;
    height: 500px;
    overflow: auto;
    border-right: 1px solid #e6e5e5;
    border-left: 1px solid #e6e5e5;
    border-bottom: 1px solid #e6e5e5;
    .searchContent {
      width: 100%;
      height: 70px;
      color: #1554f8;
      font-size: 16px;
      line-height: 70px;
      font-weight: 400;
      text-align: center;
      display: flex;
      align-items: center;
      padding: 0 2rem;
      border-radius: 8px;
      &:hover {
        cursor: pointer;
        background: rgb(241, 241, 241);
      }

      // &:not(:last-child) {
      //   border-bottom: 1px solid #e6e5e5;
      // }
    }
  }
  .video-select {
    border-width: 1px;
    border-style: solid;
    border-color: #1554f8;
    background-color: rgba(21, 84, 248, 0.1);
  }

  div {
    box-sizing: border-box;
  }

  .labelContentR {
    width: 100%;
    height: 500px;
    overflow: auto;
    border-right: 1px solid #e6e5e5;
    // border-left: 1px solid #e6e5e5;
    border-bottom: 1px solid #e6e5e5;

    .contentBox {
      width: 100%;
      height: 60px;
      color: #1554f8;
      font-size: 16px;
      line-height: 60px;
      font-weight: 400;
      text-align: center;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      &:hover {
        cursor: pointer;
        background: rgb(247, 247, 247);
      }

      // &:not(:last-child) {
      //   border-bottom: 1px solid #e6e5e5;
      // }
    }
  }

  .labelContentL {
    background: #fff;
    width: 100%;
    height: 500px;
    overflow: auto;
    border-right: 1px solid #e6e5e5;
    border-left: 1px solid #e6e5e5;
    border-bottom: 1px solid #e6e5e5;

    .labelBox {
      width: 100%;
      height: 48px;
      text-align: center;
      color: #1554f8;
      font-size: 16px;
      line-height: 48px;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      &:hover {
        cursor: pointer;
        background: rgb(247, 247, 247);
        color: rgba(0, 0, 0, 0.9);
      }
      // &:not(:last-child) {
      //   border-bottom: 1px solid #e6e5e5;
      // }
    }

    .active {
      background: #1554f8;
      color: #fff;
    }
  }
  /deep/ .ant-select-selection-placeholder {
    color: #7a8591 !important;
  }
  .general-card-upai {
    // border-radius: 20px;
    border: none;
    margin-bottom: 16px;
    .arco-card-body {
      padding: 20px 17px !important;
    }
  }

  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    :deep(.arco-pagination-total) {
      display: none;
    }
  }
  .countBox {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: auto;
    gap: 5px;
    margin-top: 5px;
    .count {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .icon {
        width: 15px;
        height: 15px;
        display: block;
      }
    }
  }
  .selectTips {
    width: 100%;

    .selectText {
      text-align: center;
      font-size: 12px;
      white-space: nowrap;
    }
  }
  .wx_dou_icon {
    width: 10px;
    height: calc(11px / (43 / 49));
    margin-bottom: 1px;
  }
  .zdyBox {
    position: relative;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .tips {
    color: #7a8591;
    font-size: 12px;
    position: absolute;
    right: 50%;
    bottom: -20px;
    transform: translate(50%, 0);
  }
  .tableBox {
    :deep(.arco-table-tr-checked) {
      .arco-table-td {
        background: rgb(201, 205, 212);
      }
    }
    :deep(.arco-table-tr) {
      cursor: pointer;
    }
  }
  :deep.arco-table-tr-checked .arco-table-td {
    background: red;
  }
  .qrcodeBox {
    position: relative;
    width: 220px;
    height: 220px;
    .qrcodePayMark {
      position: absolute;
      top: 0;
      left: 0;
      width: 220px;
      height: 220px;
      z-index: 99;
      background: #ffffffc6;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
