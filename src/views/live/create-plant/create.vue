<template>
  <div class="container">
    <Breadcrumb :items="['投流管理', '创建计划']" />

    <div
      :style="{
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: 'var(--color-fill-2)',
        position: 'relative',
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
                    field="packageId"
                    label="计划包"
                    :rules="[{ required: true, message: '请选择计划包' }]"
                    :validate-trigger="['change', 'input']"
                  >
                    <a-select
                      v-model="reqModel.engineInfo.packageId"
                      placeholder="可输入模糊搜索"
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
                    <a-select
                      v-model="reqModel.engineInfo.sphIds"
                      placeholder="可输入视频号名称或备注名进行搜索"
                      :allow-search="{ retainInputValue: true }"
                      allow-clear
                      multiple
                      style="margin-right: 10px"
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
                  >
                    <a-input-number
                      v-model="reqModel.engineInfo.taskNum"
                      placeholder="请填写创建数量"
                      :min="1"
                      :max="30"
                    />
                  </a-form-item>

                  <a-form-item
                    field="orderName"
                    :rules="[{ required: true, message: '请填写账号名称' }]"
                    :validate-trigger="['change', 'input']"
                    label="计划名称"
                  >
                    <a-input
                      v-model="reqModel.engineInfo.orderName"
                      placeholder="请填写计划名称"
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
                    v-if="!checkAuthorInfoVisible"
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
                          <span class="selectText">请选择要加热的直播</span>
                        </a-space>
                      </div>
                    </div>
                  </a-card>
                  <a-card
                    v-if="checkAuthorInfoVisible"
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
                        <a-image width="70" :src="checkAuthorInfo.headImgUrl" />
                        <a-space direction="vertical" fill :size="'mini'">
                          <a-typography-paragraph
                            :ellipsis="{ rows: 1, expandable: false }"
                            style="margin-bottom: 0; margin-left: 5px"
                          >
                            <div class="flex_ct">
                              <span>{{ checkAuthorInfo.nickName || '-' }}</span>
                              <a-image
                                :src="checkAuthorInfo.authImgUrl"
                                width="15"
                                class="mr"
                              />
                              <div
                                v-if="checkAuthorInfo.liveStatus === 1"
                                class="liveTag"
                              >
                                <div class="sc">
                                  <div class="sm"></div>
                                </div>
                                <div class="text">直播中 </div>
                              </div>
                            </div>
                          </a-typography-paragraph>
                          <a-typography-paragraph
                            :ellipsis="{ rows: 1, expandable: false }"
                            style="margin-bottom: 0; margin-left: 5px"
                            >{{
                              checkAuthorInfo.signature || '-'
                            }}</a-typography-paragraph
                          >
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
                          >预计带来{{
                            targetVal[
                              reqModel.livePromotionOrderInfo.promotionTarget
                            ]
                          }}
                          <span
                            style="
                              font-size: 12px;
                              color: #ccc;
                              display: inline-block;
                              margin-left: 5px;
                            "
                            >实际效果与直播质量有关，未带来的观看量将在直播结束后按规则折算微信豆或流量券退回原账户。</span
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
                        <span
                          >加热方式
                          <span
                            style="
                              font-size: 12px;
                              color: #ccc;
                              display: inline-block;
                              margin-left: 5px;
                            "
                            >无商品链接的直播间暂不支持以下方式：控成本加热</span
                          ></span
                        >
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="hotType"
                          style="margin-top: 20px"
                          @change="hotTypeChange"
                        >
                          <a-radio :value="1">放量加热 </a-radio>
                          <a-radio
                            :value="2"
                            :disabled="!searchVideoGoodsVisible"
                            >控成本加热
                          </a-radio>
                        </a-radio-group>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

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
                            >无商品链接的直播间暂不支持以下目标：直播间商品点击、直播间商品成交</span
                          ></span
                        >
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="
                            reqModel.livePromotionOrderInfo.promotionTarget
                          "
                          style="margin-top: 20px"
                          @change="promotionTargetChange"
                        >
                          <a-radio :value="1">直播间观众 </a-radio>
                          <a-radio :value="2">直播间互动 </a-radio>
                          <a-radio :value="3">直播间涨粉 </a-radio>
                          <a-radio
                            :value="4"
                            :disabled="!searchVideoGoodsVisible"
                            >直播间商品点击
                          </a-radio>
                          <a-radio
                            :value="8"
                            :disabled="!searchVideoGoodsVisible"
                            >直播间商品成交
                          </a-radio>
                        </a-radio-group>
                        <a-form-item
                          v-if="hotType === 2"
                          field="videoId"
                          :label="
                            targetHotLabel[
                              reqModel.livePromotionOrderInfo.promotionTarget
                            ]
                          "
                        >
                          <a-input-number
                            v-model="wecoinBidZdy"
                            :placeholder="
                              placeholderText[
                                reqModel.livePromotionOrderInfo.promotionTarget
                              ]
                            "
                            :min="1"
                            :max="1000000000"
                            :step="1"
                            :precision="0"
                            mode="button"
                            style="width: 60%"
                            @change="wecoinBidZdyChange"
                          />
                          <img
                            src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                            alt=""
                            class="wx_dou_icon"
                          />
                        </a-form-item>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>下单金额</span>
                      </template>
                      <template #description>
                        <a-radio-group
                          v-model="estimatedWecoinAmountType"
                          style="margin-top: 20px"
                          @change="estimatedWecoinAmountTypeChange"
                        >
                          <a-radio
                            v-for="item in wecoinArr[
                              Number(
                                reqModel.livePromotionOrderInfo.promotionTarget
                              )
                            ]"
                            :key="item"
                            :value="item"
                          >
                            <a-space :size="4">
                              {{ item }}
                              <img
                                src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                                alt=""
                                class="wx_dou_icon"
                              />
                            </a-space>
                          </a-radio>
                          <a-radio :value="-1">
                            <a-space>
                              <span>自定义</span>
                              <div style="display: flex; align-items: center">
                                <a-input-number
                                  v-if="estimatedWecoinAmountType == -1"
                                  v-model="estimatedWecoinAmountZdy"
                                  :placeholder="placeholderZDY"
                                  :min="
                                    wecoinArr[
                                      Number(
                                        reqModel.livePromotionOrderInfo
                                          .promotionTarget
                                      )
                                    ][0]
                                  "
                                  :max="300000"
                                  :step="1000"
                                  :precision="0"
                                  mode="button"
                                  style="width: 100%"
                                  @change="estimatedWecoinAmountZdyChange"
                                />
                                <img
                                  v-if="estimatedWecoinAmountZdyVisble"
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
                        <span>加热素材</span>
                      </template>
                      <template #description>
                        <div style="margin-top: 20px">
                          <a-checkbox
                            :model-value="sucaizbCheck"
                            @click="sucaizbCheck = !sucaizbCheck"
                            >直播间</a-checkbox
                          >
                          <a-checkbox
                            :model-value="sccaispCheck"
                            @click="checkVIdeoSc"
                            >短视频
                            <span v-if="sccaispCheck"
                              >已选择{{ videoCurrenyArr.length }}个视频</span
                            >
                          </a-checkbox>
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>加热时长</span>
                      </template>
                      <template #description>
                        <a-select
                          v-model="reqModel.livePromotionOrderInfo.duration"
                          style="margin-top: 10px; width: 320px"
                          placeholder="加热时长"
                        >
                          <a-option value="1800">0.5小时</a-option>
                          <a-option value="3600">1小时</a-option>
                          <a-option value="5400">1.5小时</a-option>
                          <a-option value="7200">2小时</a-option>
                          <a-option value="9000">2.5小时</a-option>
                          <a-option value="10800">3小时</a-option>
                          <a-option value="12600">3.5小时</a-option>
                          <a-option value="14400">4小时</a-option>
                          <a-option value="16200">4.5小时</a-option>
                          <a-option value="18000">5小时</a-option>
                          <a-option value="19800">5.5小时</a-option>
                          <a-option value="21600">6小时</a-option>
                          <a-option value="43200">12小时</a-option>
                          <a-option value="86400">24小时</a-option>
                        </a-select>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
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

                  <a-list-item>
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

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>根据年龄推荐</span>
                      </template>
                      <template #description>
                        <a-select
                          v-model="
                            reqModel.livePromotionOrderInfo.suggest.ageRange
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

                  <a-list-item>
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

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>根据兴趣推荐</span>
                      </template>
                      <template #description>
                        <Cascader
                          v-model:value="insertTagValue"
                          style="margin-top: 10px; width: 320px"
                          multiple
                          :options="insertOptions"
                          :field-names="{
                            label: 'labelName',
                            value: 'labelId',
                            children: 'labelChild',
                          }"
                          placeholder="全部兴趣领域"
                          dropdown-class-name="ant_placeholder_class"
                          suffix-icon="Shopping Around"
                          @change="changeInsertTag"
                        >
                          <template #tagRender="data">
                            <a-tag :key="data.value" color="blue">{{
                              data.label
                            }}</a-tag>
                          </template>
                        </Cascader>

                        <!-- <a-select
                      v-model="
                        reqModel.livePromotionOrderInfo.suggest.interestTag
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
                    </a-select> -->
                      </template>
                    </a-list-item-meta>
                  </a-list-item>

                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <span>其他支付方式</span>
                      </template>
                      <template #description>
                        <a-space direction="vertical">
                          <a-radio-group
                            v-model="reqModel.engineInfo.userVoucherType"
                            style="margin-top: 20px"
                          >
                            <a-radio :value="0">不使用</a-radio>
                            <a-radio :value="1">流量券</a-radio>
                            <a-radio :value="2"
                              >人气卡
                              <a-typography-text type="danger">
                                (推荐)
                              </a-typography-text></a-radio
                            >
                          </a-radio-group>
                          <a-typography-text
                            v-if="reqModel.engineInfo.userVoucherType === 2"
                            type="secondary"
                          >
                            使用人气卡支付可实现自动批量支付，无需扫码！
                            <!-- <a-typography-text
                          type="warning"
                          style="cursor: pointer"
                          @click="createRQKVisible = true"
                        >
                          查看人气卡>>
                        </a-typography-text> -->
                          </a-typography-text>
                        </a-space>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                  <!-- </div> -->
                </a-list>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6">
          <a-space style="width: 100%" direction="vertical" :size="24">
            <a-card
              :bordered="false"
              :style="{ width: '100%', maxHeight: '400px', overflow: ' auto' }"
            >
              <template #title>
                <a-row justify="space-between" align="end">
                  <a-col flex="60px">微信豆余额</a-col>
                  <a-col flex="60px" style="font-size: 12px"
                    >已选{{ sphWxdouGridList.length }}个</a-col
                  >
                </a-row>
              </template>
              <a-list>
                <a-list-item
                  v-for="(item, index) in sphWxdouGridList"
                  :key="index"
                >
                  <a-row justify="space-between" style="width: 100%">
                    <a-col :flex="6">
                      <span style="font-size: 14px; font-weight: 500"
                        >{{
                          item.realSphName ? item.realSphName : item.sphName
                        }}
                      </span>
                    </a-col>
                    <a-col :flex="1">
                      <a-space :size="3">
                        <span
                          style="
                            font-size: 14px;
                            font-weight: 500;
                            white-space: nowrap;
                          "
                          >{{ item.sphBalance }}个
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
              class="fixedRight"
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
                        ? reqModel.livePromotionOrderInfo
                            .estimatedWecoinAmount *
                          reqModel.engineInfo.taskNum *
                          reqModel.engineInfo.sphIds.length
                        : reqModel.livePromotionOrderInfo
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
                        ? reqModel.livePromotionOrderInfo
                            .estimatedWecoinAmount *
                          reqModel.engineInfo.taskNum *
                          reqModel.engineInfo.sphIds.length
                        : reqModel.livePromotionOrderInfo
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
    <a-modal v-model:visible="hobbyVisible" width="1000px" title="选择兴趣爱好">
      <a-row>
        <a-col flex="7">
          <a-cascader-panel
            v-model:value="insertTagValue"
            :options="insertOptions"
            :field-names="{
              label: 'labelName',
              value: 'labelId',
              children: 'labelChild',
            }"
            expand-child
            :multiple="true"
          />
        </a-col>
      </a-row>
    </a-modal>
    <a-modal
      v-model:visible="formVideoScVisible"
      width="1000px"
      title="选择视频"
      @before-ok="handleVideoScBeforeOk"
    >
      <div>
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
                :class="{ 'video-select': videoCurrenyArr.indexOf(key) >= 0 }"
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
    </a-modal>
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

    <a-modal
      v-model:visible="formVideoVisible"
      width="1000px"
      title="选择要加热的直播"
      @before-ok="handleVideoCheckBeforeOk"
    >
      <a-list :bordered="false" :split="false">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <span
                >可自行选择某个直播对象进行加热，使用加热后直播间将推荐给更多用户，从而提升观看人数、评论、粉丝等。
              </span>
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
                  <a-link @click="checkAuthorInfoVisible = false">更换</a-link>
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
              <div class="flex_ct">
                <span>{{ item.nickName }}</span>
                <a-image :src="item.authImgUrl" width="15" class="mr" />
                <div v-if="item.liveStatus === 1" class="liveTag">
                  <div class="sc">
                    <div class="sm"></div>
                  </div>
                  <div class="text">直播中 </div>
                </div>
              </div>
            </template>
            <template #description>
              <a-typography-paragraph
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
      @cancel="createdOrderTimerClear"
      @ok="createdOrderTimerClear"
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
                      record.discountAmount ? numF(record.discountAmount) : '-'
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
                    {{ plantLiveStatus[record.plantStatus] }}
                  </template>
                </a-table-column>
              </template>
            </a-table>

            <span
              >共{{ createTaskOrderInfo.total }}条 | 成功{{
                createTaskOrderInfo.success
              }}条 失败{{ createTaskOrderInfo.error }}条｜完成支付{{
                createTaskOrderInfo.overPay
              }}条</span
            >
          </div>
        </a-col>
        <a-col :span="8" style="text-align: center">
          <span style="font-size: 16px">请使用对应投手号进行支付</span>
          <a-spin :loading="createTaskPayLoading" :tip="createTaskPayTips">
            <template
              v-if="createTaskPayTips === '当前订单已全部支付完成'"
              #element
            >
              <icon-check-circle-fill :spin="false" :rotate="0" :size="20" />
            </template>
            <a-card class="general-card" style="padding-top: 20px">
              <a-space
                :size="16"
                direction="vertical"
                fill
                align="center"
                style="text-align: center"
              >
                <span style="font-size: 14px">{{ waitQrcodeTips }}</span>

                <span
                  v-if="createTaskPayOrderList[createTaskPayOrderIndex]"
                  style="font-size: 16px"
                >
                  {{
                    createTaskOrderList[createTaskPayOrderIndex].sphInfo
                      ? createTaskOrderList[createTaskPayOrderIndex].sphInfo
                          .sphName
                      : ''
                  }}
                  {{
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

    <a-modal
      v-model:visible="createRQKVisible"
      :mask-closable="false"
      width="900px"
      title="选择人气卡"
      @cancel="createdRQKClear"
      @ok="createdRQKClear"
    >
      <a-space direction="vertical">
        <a-typography-text type="secondary">
          已选择{{ selectCardData.length ? selectCardData.length : 0 }}张人气卡
        </a-typography-text>
        <a-checkbox-group v-model="selectCardData" @change="selectCardChange">
          <template v-for="item in cardDataList" :key="item">
            <a-checkbox :value="item.cardId">
              <template #checkbox="{ checked }">
                <a-space
                  align="center"
                  class="custom-checkbox-card"
                  :class="{ 'custom-checkbox-card-checked': checked }"
                >
                  <div className="custom-checkbox-card-mask">
                    <div className="custom-checkbox-card-mask-dot" />
                  </div>
                  <div>
                    <div className="custom-checkbox-card-title">
                      <a-space direction="vertical">
                        <div class="cardId"> 人气卡ID： {{ item.cardId }} </div>
                        <a-typography-text type="secondary">
                          剩余流量点：{{ item.cardBalance / 100 }}
                        </a-typography-text>
                      </a-space>
                    </div>
                    <div class="flexLi">
                      <div class="endTime"
                        ><a-typography-text type="secondary">
                          过期时间：{{
                            dayjs
                              .unix(Number(item.expireTs))
                              .format('YYYY-MM-DD')
                          }}
                        </a-typography-text></div
                      >
                      <div class="createTime"
                        ><a-typography-text type="secondary">
                          创建时间：{{
                            dayjs
                              .unix(Number(item.createTime))
                              .format('YYYY-MM-DD')
                          }}
                        </a-typography-text></div
                      >
                    </div>
                  </div>
                </a-space>
              </template>
            </a-checkbox>
          </template>
        </a-checkbox-group>

        <a-pagination
          :total="cardPageInfo.total"
          show-total
          :default-page-size="12"
          @change="cardPageChange"
        />
      </a-space>
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
  import { createTask, plantGrid } from '@/api/live-plant';
  import { clearAllChildren, findLastIndexWithSameId } from '@/utils/event';
  import {
    plantPackageGrid,
    getLivePromotionAccountUseList,
    plantPackageAdd,
    getFinderUserAttr,
    getOrderDetail,
    getCardList,
  } from '@/api/live';
  import { shutdownRuleGrid } from '@/api/rule';
  import {
    sphGrid,
    getSearchAccount,
    getFinderObject,
    getTargetAuthor,
    getLabelTag,
    sphInfo,
  } from '@/api/sph';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import QrcodeVue from 'qrcode.vue';
  import type { CascaderProps } from 'ant-design-vue';
  import { Cascader } from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
  import { province, city } from '@/utils/address';
  import { createStatus, plantLiveStatus } from '@/utils/enum';

  // const serviceQrCode = ref(false);
  const createOverPayVisible = ref(false);
  const createRQKVisible = ref(false);
  const createTaskId = ref(0);
  const createTaskOrderLoading = ref(false);
  const createTaskPayLoading = ref(false);
  const createTaskPayTips = ref('正在创建支付订单');

  const placeholderText = ref([
    '',
    '建议在2-6微信豆',
    '建议在40-220微信豆',
    '建议在100-900微信豆',
    '建议在30-300微信豆',
    '',
    '',
    '',
    '建议在200-1200微信豆',
  ]);
  const createTaskOrderList = ref<any>([]);
  const selectedKeys = ref<any[]>([]);
  const createTaskOrderInfoModel = () => {
    return {
      total: 0,
      success: 0,
      error: 0,
      overPay: 0,
    };
  };
  const createPagination = ref({ current: 1, pageSize: 10, chengeNum: 0 });
  const finderUserAttr = ref({});
  const areaValue = ref([]);
  const createTaskOrderInfo = ref(createTaskOrderInfoModel());
  const createTaskPayOrderList = ref<any>([]);
  const createTaskPayOrderIndex = ref(0);
  const createdGetPlantReqVisable = ref(true);
  const createdGetInfoReqVisable = ref(true);
  const createdPlantTimer = ref<any>();
  const createdOrderTimer = ref<any>();
  const createdOrderTimerClear = () => {
    console.log('stop');

    createdGetPlantReqVisable.value = true;
    createdGetInfoReqVisable.value = true;
    clearInterval(createdPlantTimer.value);
    clearInterval(createdOrderTimer.value);
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
      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        createTaskPayLoading.value = true;
      }
    }
  };

  const createTaskPayOrderJumpThis = () => {
    if (createTaskPayOrderList.value.length > 0) {
      if (
        !createTaskPayOrderList.value[createTaskPayOrderIndex.value + 1] &&
        createTaskOrderInfo.value.success + createTaskOrderInfo.value.error !==
          createTaskOrderList.value.length
      ) {
        return;
      }
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

        waitQrcodeTips.value = '切换成功，请进行支付….';

        //   createPagination.value.chengeNum = createTaskOrderInfo.value.overPay;
      }
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

      // if (
      //   createTaskPayOrderList.value.length === createTaskOrderList.value.length
      // ) {
      //   console.log('1支付完成');

      //   createdOrderTimerClear();
      //   createTaskPayLoading.value = true;
      //   createTaskPayTips.value = '当前订单已全部支付完成';
      //   waitQrcodeTips.value = '当前订单已全部支付完成';
      // }
    } else {
      console.log('2支付完成');

      createdOrderTimerClear();
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
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
    createTaskOrderList.value = data.grid;
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

      if (el.plantStatus === 10 && el.createStatus === 1) {
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
          createTaskPayOrderList.value.push({
            plantName: el.plantName,
            plantCode: el.plantCode,
            sphId: el.sphId,
            index: i,

            qrCodeVal: `https://channels.weixin.qq.com/promote/pages/mobile_pay?promotionId=${el.plantCode}&type=live&userType=${el.sphInfo.sphUserType}&corproateId=${corproateId}`,
          });
        }
      }
      if (el.plantStatus === 1 || el.plantStatus === 4) {
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
      console.log('3支付完成');

      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      waitQrcodeTips.value = '当前订单已全部支付完成';
      // Message.success('订单创建完成，可前往投放数据查看计划');
      return;
    }
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
      !createTaskPayOrderList.value[createTaskPayOrderIndex.value]
    ) {
      console.log('4支付完成');
      if (
        createTaskPayOrderList.value.length === createTaskOrderList.value.length
      ) {
        createdOrderTimerClear();

        createTaskPayLoading.value = true;
        createTaskPayTips.value = '当前订单已全部支付完成';
        waitQrcodeTips.value = '当前订单已全部支付完成';
        // Message.success('订单创建完成，可前往投放数据查看计划');

        return;
      }
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
      // createTaskPayLoading.value = false;
      console.log('关闭spin');
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

  // 客服二维码 回调
  // const serviceQrCodeOk = async () => {
  //   serviceQrCode.value=false;
  // };

  const reqFormModel = () => {
    return {
      sequence: '',
      engineInfo: {
        orderName: dayjs().format('YYYY年MM月DD日'),
        packageId: null,
        sphIds: [],
        hotType: 1,
        userVoucherType: 0,
        ruleId: '',
        taskNum: 1,
        yjl: 100,
        videoUrl: '',
        sphInfo: [],
        taskArr: [],
        videoInfo: {},
        authorInfo: {},
        cityIdArr: [],
        videoTagArr: [],
        videoUserName: [],
        insertTagArr: [],
        videoCurrenyArr: [],
      },
      livePromotionOrderInfo: {
        promotionTarget: 1,
        suggest: {
          gender: [],
          ageRange: [],
          cityIds: [],
          interestTag: [],
          interestTagV3: [],
          similarUsernameList: [],
          // wecoinBid: '30000',
          interestTagV3Mark: 0,
        },
        duration: '1800',
        promotionType: 2,
        orderType: 1,
        materialFlag: 1,
        materialFeedExportids: [],
        estimatedWecoinAmount: '500',
        internalInfo: {
          isInternal: false,
        },
      },

      targetUsername: '',
      voucherId: [],
      cardIds: [],
      orderName: dayjs().format('YYYY年MM月DD日'),
      deviceInfo: {
        appVer: 1,
        deviceTypeId: 1,
      },
    };
  };
  const reqModel = ref(reqFormModel());
  const router = useRouter();
  const herfLogin = () => {
    router.push({
      name: 'sphList',
    });
  };
  const checkSph = (val: any) => {
    // selectCard();
    console.log(val);

    // if (val) {
    //   const index = _.find(sphGridList.value, ['sphId', val[0]]);

    //   reqModel.value.engineInfo.orderName = `${
    //     index.onlySphName
    //   }-${dayjs().format('MMDD')}`;
    // } else {
    //   reqModel.value.engineInfo.orderName = dayjs().format('YYYY年MM月DD日');
    // }
  };
  const targetVal = {
    1: '直播间观众',
    2: '直播间互动',
    3: '直播间涨粉',
    4: '直播间商品点击',
    8: '直播间商品成交',
  };
  const targetHotLabel = {
    1: '每个观众进入的出价',
    2: '每条用户评论的出价',
    3: '每个新增粉丝的出价',
    4: '每个商品点击的出价',
    8: '每个订单成交的出价',
  };
  const targetDefaultWecoin = { 1: 1000, 2: 5000, 3: 5000, 4: 5000, 8: 5000 };
  const wecoinArr = {
    1: [500, 1000, 2000, 3000, 4000, 5000],
    2: [2000, 3000, 4000, 5000, 6000],
    3: [3000, 4000, 5000, 6000, 8000],
    4: [5000, 6000, 7000, 8000, 10000],
    8: [5000, 8000, 10000, 12000, 15000],
  };
  const targetSumDefalut = { 1: 500, 2: 25, 3: 10, 4: 33, 8: 10 };

  const taskNumBoolean = ref(true);
  const packageGridList = ref<any>([]);
  const sphGridList = ref<any>([]);
  const sphWxdouGridList = ref<any>([]);

  const estimatedWecoinAmountZdyVisble = ref(false);
  const estimatedWecoinAmountZdy = ref(1000);
  const estimatedWecoinAmountType = ref(500);
  const wecoinBidZdy = ref<any>(undefined);
  const wecoinBidType = ref(1);
  const sccaispCheck = ref(false);
  const sucaizbCheck = ref(true);
  const promotionTargetMemberSum = ref(500);
  const formGpVisible = ref(false);
  const formGpTitle = ref('新建分组');
  const formGpModel = ref({ name: null, type: 1 });
  const formGpRef = ref<FormInstance>();

  const formVideoScVisible = ref(false);
  const formVideoTagVisible = ref(false);
  const formVideoVisible = ref(false);
  const targetAuthorList = ref<any>([]);
  const searchVideoQuery = ref('');
  const checkAuthorInfo = ref<any>({});
  const checkAuthorInfoVisible = ref(false);
  const checkVideoVisible = ref(false);
  const asyncCard = ref(true);
  const cardPageInfo = ref({
    page: 1,
    total: 0,
  });
  const cardDataList = ref<any>([]);
  const selectCardData = ref<any[]>([]);
  const selectCardChange = () => {
    console.log(selectCardData.value);
  };
  const videoBottom = ref(false);
  const videoCurrenyArr = ref<any>([]);
  const searchAuthVideoList = ref<any>([]);
  const searchAuthVideoLock = ref(false);
  const searchVideoGoodsVisible = ref(false);
  const searchVideoTime = ref(2);
  const searchVideoStartTs = ref('');
  const searchVideoEndTs = ref('');
  const searchVideoCurrent = ref(1);
  const searchVideoLastBuf = ref('');
  const videoQrcodeValue = ref('');
  const checkVideoArr = ref<any>([]);
  const labelContentloading = ref(false);
  const waitQrcodeTips = ref('');
  const gender = ref(0);

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
  fansTag.value = JSON.parse(fansTag.value);
  const insertTagV3 = ref({});
  const insertOptions = ref<CascaderProps['options']>();
  fetch('https://img.adyinqing.com/json/tag.json')
    .then((response) => response.json())
    .then((data) => {
      insertTagV3.value = data;
      insertOptions.value = data;
      console.log(data);
    });
  const insertTagValue = ref();

  const hotType = ref(1);
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
  const placeholderZDY = ref(
    `需在${
      wecoinArr[
        Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
      ][0]
    }-300000之间`
  );

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
  const changeAreaTag = async (val: any, option: any) => {
    reqModel.value.livePromotionOrderInfo.suggest.cityIds = [];
    val.forEach((el: any) => {
      if (el.length === 2) {
        reqModel.value.livePromotionOrderInfo.suggest.cityIds.push(
          String(el[1])
        );
      } else {
        reqModel.value.livePromotionOrderInfo.suggest.cityIds.push(
          String(el[0])
        );
      }
    });
    reqModel.value.engineInfo.cityIdArr = val;
  };
  const hobbyVisible = ref(false);
  const handleClickHobby = () => {
    hobbyVisible.value = true;
  };
  const changeInsertTag = async (val: any, option: any) => {
    // console.log(option, 123);
    reqModel.value.livePromotionOrderInfo.suggest.interestTagV3 = [];
    option.forEach((el: any, key: any) => {
      // @ts-ignore
      reqModel.value.livePromotionOrderInfo.suggest.interestTagV3.push({
        interestTag: Number(el[el.length - 1].labelId),
        tagLevel: Number(el[el.length - 1].labelLevel),
        interestTagName: el[el.length - 1].labelName,
      });
    });
    console.log(reqModel.value, 'elelelel');

    console.log(insertTagValue.value);
    reqModel.value.engineInfo.insertTagArr = insertTagValue.value;
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

  const rowClick = (event: any) => {
    if (createTaskPayOrderList.value.length > 0) {
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
      srType: 2,
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

  // watch(searchVideoGoodsVisible, (newValue: any, oldValue: any) => {
  //   console.log(searchVideoGoodsVisible.value);
  //   if (searchVideoGoodsVisible.value) {
  //     placeholderText.value = '需在1000-300000之间';
  //   } else {
  //     placeholderText.value = '需在500-300000之间';
  //   }
  // });
  const pushContentInArr = (item: any, index: any) => {
    const findTagKey = videoTagArr.value.indexOf(item.nickName);
    console.log(findTagKey, 'findTagKey');
    if (findTagKey >= 0) {
      videoTagArr.value.splice(videoTagArr.value.indexOf(item.nickName), 1);

      reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList.splice(
        reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList.indexOf(
          item.username
        ),
        1
      );
      fansTag.value[labelActive.value].accountInfos[index].select = false;
    } else {
      if (videoTagArr.value.length >= 20) {
        Message.warning('最大只能选择20位作者');
        return;
      }
      videoTagArr.value.push(item.nickName);
      videoUserName.value.push(item.username);

      reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList.push(
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
        reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList.splice(
          reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList.indexOf(
            element.username
          ),
          1
        );
      }
    });
  };

  const handleVideoTagBeforeOk = (done: any) => {
    fansVideoCheckOK.value = true;
    fansVideoTagRadio.value = 2;
    formVideoTagVisible.value = false;
    done(false);
  };
  const handleVideoTagCancel = () => {
    if (
      reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList
        .length === 0
    ) {
      formVideoTagVisible.value = false;
      fansVideoTagRadio.value = 1;
      fansVideoCheckOK.value = true;
      videoTagArr.value = [];
      reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList = [];
    }
  };

  const createPaginationChange = async (page: any) => {
    createPagination.value.current = page;
  };
  const formJcRef = ref<FormInstance>();

  const { loading, setLoading } = useLoading(true);
  const checkSphStatus = async (item: any) => {
    let sphIdArr: any = item.map((e: any) => {
      return e;
    });
    // 去重
    sphIdArr = [...new Set(sphIdArr)];
    const { data } = await sphInfo({
      sphId: sphIdArr,
    });

    const filteredData = data.grid.filter((el: any) => el.sphStatus !== 1);

    return new Promise((resolve, reject) => {
      if (filteredData.length > 0) {
        // catch出去已离线视频号数组
        reject(filteredData);
      } else {
        resolve(true);
      }
    });
  };
  const sphIdsChange = async (val: any) => {
    console.log(val, 'sphIdsChange');
    // if (checkAuthorInfo.value?.username) {
    // const uploadPromises = [];
    if (val.length) {
      // for (let i = 0; i < val.length; i += 1) {
      //   const promise = new Promise((resolve, reject) => {
      //     getTargetAuthor({
      //       sphId: val[i],
      //     })
      //       .then(({ data }) => {
      //         resolve(data);
      //       })
      //       .catch((res) => {
      //         console.log(res);
      //         reject(val[i]);
      //       });
      //   });
      //   uploadPromises.push(promise);
      // }
      checkSphStatus(val)
        .then((e) => {})
        .catch((error) => {
          console.log(
            reqModel.value.engineInfo.sphIds.filter(
              (item: any) => item !== error.sphId
            ),
            'errorcheckSphStatus'
          );
          error.forEach((errItem: any) => {
            reqModel.value.engineInfo.sphIds =
              reqModel.value.engineInfo.sphIds.filter(
                (item: any) => item !== errItem.sphId
              );
          });
        });
    }

    // await Promise.all(uploadPromises)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     reqModel.value.engineInfo.sphIds =
    //       reqModel.value.engineInfo.sphIds.filter((item: any) => item !== e);
    //     console.log(e, 'catch e');
    //   });
    // console.log(sphWxdouGridList.value);
    sphWxdouGridList.value = reqModel.value.engineInfo.sphIds.map((e: any) => {
      console.log(_.find(sphGridList.value, ['sphId', e]));

      return _.find(sphGridList.value, ['sphId', e]);
    });
    // }
  };
  const sphGridSearch = async (params: any) => {
    const { data } = await sphGrid({
      pageIndex: 1,
      pageSize: 100,
      sphName: params,
    });
    const formatData = data.grid.map((el: any) => {
      el.onlySphName = `${el.sphName}`;
      el.realSphName = el.sphName;

      el.sphName = `${el.sphName} 备注名：${
        el.sphRemark ? el.sphRemark : '-'
      } \u00A0\u00A0\u00A0\u00A0微信豆余额 ${el.sphBalance}`;
      return el;
    });
    if (reqModel.value.engineInfo.sphIds.length) {
      sphWxdouGridList.value = reqModel.value.engineInfo.sphIds.map(
        (e: any) => {
          return _.find(data.grid, ['sphId', e]);
        }
      );
    }
    sphGridList.value = formatData || [];
  };

  const packageGridSearch = async (params: any) => {
    const { data } = await plantPackageGrid({
      pageIndex: 1,
      pageSize: 100,
      name: params,
    });
    packageGridList.value = data.grid || [];
  };

  const removeObjects = (obj: any, key: any) => {
    Object.keys(obj).forEach((k) => {
      if (k === key) {
        delete obj[k]; // 删除对象的key。
      }
    });
    return obj;
  };

  const checkVIdeoSc = () => {
    if (!reqModel.value.engineInfo.sphIds[0]) {
      Message.warning({
        content: '请先选择投放号',
        duration: 3 * 1000,
      });
      return;
    }
    if (!reqModel.value.targetUsername) {
      Message.warning({
        content: '请先选择加热账号',
        duration: 3 * 1000,
      });
      return;
    }
    if (sccaispCheck.value) {
      sccaispCheck.value = false;
      videoCurrenyArr.value = [];
      reqModel.value.livePromotionOrderInfo.materialFeedExportids = [];
      return;
    }
    formVideoScVisible.value = true;
    searchAuthVideo();
  };
  const handelAuthSearchClick = async (item: any) => {
    checkAuthorInfo.value = item;
    checkAuthorInfoVisible.value = true;
    searchVideoCurrent.value = 1;
    searchVideoLastBuf.value = '';
    searchAuthVideoList.value = [];

    reqModel.value.targetUsername = item.username;
    // await searchAuthVideo();
    const { data } = await getFinderUserAttr({
      sphId: reqModel.value.engineInfo.sphIds[0],
      username: item.username,
    });
    finderUserAttr.value = data.data;
    formVideoVisible.value = false;
    if (data.data.hasShopShelf === 1) {
      searchVideoGoodsVisible.value = true;
      hotType.value = 2;
      reqModel.value.livePromotionOrderInfo.promotionTarget = 8;
      promotionTargetChange();
    }
    reqModel.value.engineInfo.authorInfo = item;
    searchAuthVideo();
  };

  const hotTypeChange = () => {
    if (hotType.value === 1) {
      delete reqModel.value.livePromotionOrderInfo.suggest.wecoinBid;
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
    // if (estimatedWecoinAmountType.value !== -1) {
    // estimatedWecoinAmountType.value =
    //   targetDefaultWecoin[
    //     reqModel.value.livePromotionOrderInfo.promotionTarget
    //   ];
    // eslint-disable-next-line prefer-destructuring
    estimatedWecoinAmountType.value =
      wecoinArr[
        Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
      ][0];
    // if (estimatedWecoinAmountType.value === -1) {
    console.log(
      estimatedWecoinAmountZdy.value,
      Number(
        wecoinArr[
          Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
        ][0]
      )
    );
    // if (
    //   estimatedWecoinAmountZdy.value <
    //   Number(
    //     wecoinArr[
    //       Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
    //     ][0]
    //   )
    // ) {
    estimatedWecoinAmountZdy.value = Number(
      wecoinArr[
        Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
      ][0]
    );
    // }
    placeholderZDY.value = `需在${
      wecoinArr[
        Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
      ][0]
    }-300000之间`;

    // }
    estimatedWecoinAmountTypeChange();
  };

  // };
  const estimatedWecoinAmountTypeChange = async () => {
    switch (estimatedWecoinAmountType.value) {
      case -1:
        estimatedWecoinAmountZdyVisble.value = true;
        estimatedWecoinAmountZdyChange();
        break;
      default:
        reqModel.value.livePromotionOrderInfo.estimatedWecoinAmount = String(
          estimatedWecoinAmountType.value
        );

        if (hotType.value === 2 && wecoinBidZdy.value > 0) {
          wecoinBidZdyChange();
        } else {
          promotionTargetMemberSum.value =
            (estimatedWecoinAmountType.value / 1000) *
            targetSumDefalut[
              reqModel.value.livePromotionOrderInfo.promotionTarget
            ];
        }

        break;
    }
  };

  const estimatedWecoinAmountZdyChange = async () => {
    reqModel.value.livePromotionOrderInfo.estimatedWecoinAmount = String(
      estimatedWecoinAmountZdy.value
    );
    console.log(
      estimatedWecoinAmountZdy.value,
      'estimatedWecoinAmountZdyChange',
      (estimatedWecoinAmountZdy.value / 1000) *
        targetSumDefalut[reqModel.value.livePromotionOrderInfo.promotionTarget]
    );
    if (hotType.value === 2 && wecoinBidZdy.value > 0) {
      wecoinBidZdyChange();
    } else {
      promotionTargetMemberSum.value =
        (estimatedWecoinAmountZdy.value / 1000) *
        targetSumDefalut[reqModel.value.livePromotionOrderInfo.promotionTarget];
    }
  };

  const wecoinBidZdyChange = async () => {
    reqModel.value.livePromotionOrderInfo.suggest.wecoinBid = String(
      wecoinBidZdy.value * 100
    );
    let estimatedWecoin = estimatedWecoinAmountZdy.value;
    if (estimatedWecoinAmountType.value > 0) {
      estimatedWecoin = estimatedWecoinAmountType.value;
    }
    promotionTargetMemberSum.value =
      parseInt(estimatedWecoin / wecoinBidZdy.value, 10) || 1;
  };

  const reqGenderChange = async (item: any) => {
    switch (gender.value) {
      case 0:
        reqModel.value.livePromotionOrderInfo.suggest.gender = [];
        break;
      case 1:
        reqModel.value.livePromotionOrderInfo.suggest.gender = [1];
        break;
      case 2:
        reqModel.value.livePromotionOrderInfo.suggest.gender = [2];
        break;
      default:
        reqModel.value.livePromotionOrderInfo.suggest.gender = [];
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

    if (formGpModel.value.type !== 1) {
      const { data } = await plantPackageAdd({
        name: formGpModel.value.name,
      });
      Message.success({
        content: '添加计划包成功',
        duration: 5 * 1000,
      });
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
      const { data } = await getLivePromotionAccountUseList({
        sphId: reqModel.value.engineInfo.sphIds[0],
      });
      targetAuthorList.value = data.data.historyAccounts;
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

  const cardPageChange = async (current: any) => {
    cardPageInfo.value.page = current;
    selectCard();
  };
  const selectCard = async () => {
    if (!reqModel.value.engineInfo.sphIds[0]) {
      Message.warning({
        content: '请先选择投放号',
        duration: 3 * 1000,
      });
      return;
    }
    setLoading(true);
    try {
      const { data } = await getCardList({
        sphId: reqModel.value.engineInfo.sphIds[0],
        page: cardPageInfo.value.page,
        async: asyncCard.value,
      });
      cardDataList.value = data.data.tabList;
      cardPageInfo.value.total = data.data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
      asyncCard.value = false;
    }
  };

  const handelVideoSearchClick = async (index: any, item: any) => {
    if (videoCurrenyArr.value.length >= 10) {
      Message.warning({
        content: '最大只能选择10个视频～',
        duration: 3 * 1000,
      });
      return;
    }
    if (videoCurrenyArr.value.indexOf(index) >= 0) {
      videoCurrenyArr.value.splice(videoCurrenyArr.value.indexOf(index), 1);
    } else {
      videoCurrenyArr.value.push(index);
    }
    if (
      reqModel.value.livePromotionOrderInfo.materialFeedExportids.indexOf(
        item.exportId
      ) >= 0
    ) {
      reqModel.value.livePromotionOrderInfo.materialFeedExportids.splice(
        reqModel.value.livePromotionOrderInfo.materialFeedExportids.indexOf(
          item.exportId
        ),
        1
      );
    } else {
      reqModel.value.livePromotionOrderInfo.materialFeedExportids.push(
        item.exportId
      );
    }
    reqModel.value.engineInfo.videoCurrenyArr = videoCurrenyArr.value;
    // checkVideoArr.value.push(item);
    // checkVideoInfo.value = item;
  };

  const handleVideoScBeforeOk = (done: any) => {
    if (videoCurrenyArr.value.length >= 1) {
      sccaispCheck.value = true;
    } else {
      sccaispCheck.value = false;
    }
    done(false);
    formVideoScVisible.value = false;

    // reqModel.value.materialFlag = 1
  };

  const handleVideoCheckBeforeOk = (done: any) => {
    formVideoVisible.value = false;
    done(false);
  };

  const changeFansTag = async () => {
    if (fansVideoTagRadio.value === 1) {
      videoTagArr.value = [];
      formVideoTagVisible.value = false;
      fansTag.value[labelActive.value].accountInfos = fansTag.value[
        labelActive.value
      ].accountInfos.map((e) => {
        e.select = false;
        return e;
      });
      reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList = [];
    }
  };

  const searchAuthVideo = async () => {
    console.log(
      reqModel.value.engineInfo.sphIds,
      'reqModel.value.engineInfo.sphIds[0]',
      searchAuthVideoLock.value
    );
    if (!reqModel.value.engineInfo.sphIds[0]) {
      return;
    }
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
      const uploadPromises: any = [];
      console.log(
        reqModel.value.engineInfo.sphIds,
        'reqModel.value.engineInfo.sphIds'
      );
      if (reqModel.value.engineInfo.sphIds.length) {
        for (let i = 0; i < reqModel.value.engineInfo.sphIds.length; i += 1) {
          const promise = new Promise((resolve, reject) => {
            getFinderObject({
              sphId: reqModel.value.engineInfo.sphIds[i],
              encryptedUsername: checkAuthorInfo.value?.username,
              startTs: searchVideoStartTs.value,
              endTs: searchVideoEndTs.value,
              lastBuf: searchVideoLastBuf.value,
            })
              .then(({ data }) => {
                resolve(data);
              })
              .catch((error) => {
                console.log(error, 'error');
                reject(error);
              });
          });
          uploadPromises.push(promise);
        }
      }
      await Promise.all(uploadPromises)
        .then((data) => {
          console.log(data, 'Promise.all');
          if (
            data[0].data.objects.length === 0 ||
            data[0].data.objects.length < 19
          ) {
            videoBottom.value = true;
          }
          data[0].data.objects.forEach((el: any) => {
            searchAuthVideoList.value.push(el);
          });
          if (
            data[0].data.objects.length === 0 ||
            data[0].data.objects.length < 19
          ) {
            videoBottom.value = true;
          }
          data[0].data.objects.forEach((el: any) => {
            searchAuthVideoList.value.push(el);
          });

          searchVideoLastBuf.value = data[0].data.lastBuf;
        })
        .catch((error) => {
          setLoading(false);
          searchAuthVideoLock.value = false;
        });
      // const { data } = await getFinderObject({
      //   sphId: reqModel.value.engineInfo.sphId,
      //   encryptedUsername: checkAuthorInfo.value?.username,
      //   startTs: searchVideoStartTs.value,
      //   endTs: searchVideoEndTs.value,
      //   lastBuf: searchVideoLastBuf.value,
      // });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
      searchAuthVideoLock.value = false;
      console.log('changesearchAuthVideoLock');
      searchVideoCurrent.value += 1;
    }
  };

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
        console.log(Number(data.data.order.status));
        if (
          Number(data.data.order.status) === 1 ||
          Number(data.data.order.status) === 4 ||
          Number(data.data.order.status) === 8
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
    setTimeout(createOrderDetailCheck, 1400);
  };
  const createOrderDisabled = ref(false);
  const createOrder = async () => {
    createOrderDisabled.value = true;
    const res = await formJcRef.value?.validate();
    if (res) {
      createOrderDisabled.value = false;
      return;
    }
    if (!reqModel.value.targetUsername) {
      createOrderDisabled.value = false;
      Message.error({
        content: '请选择需要加热的直播账号',
        duration: 5 * 1000,
      });
      return;
    }
    console.log(wecoinBidZdy.value);
    if (hotType.value === 2 && !wecoinBidZdy.value) {
      createOrderDisabled.value = false;

      Message.error({
        content: `请填写${
          targetHotLabel[reqModel.value.livePromotionOrderInfo.promotionTarget]
        }`,
        duration: 5 * 1000,
      });
      return;
    }
    if (sccaispCheck.value && sucaizbCheck.value) {
      reqModel.value.livePromotionOrderInfo.materialFlag = 3;
    } else if (sccaispCheck.value && !sucaizbCheck.value) {
      reqModel.value.livePromotionOrderInfo.materialFlag = 2;
    } else if (!sccaispCheck.value && sucaizbCheck.value) {
      reqModel.value.livePromotionOrderInfo.materialFlag = 1;
    } else if (!sccaispCheck.value && !sucaizbCheck.value) {
      Message.error({
        content: '至少选择一个加热素材',
        duration: 5 * 1000,
      });
      createOrderDisabled.value = false;
      return;
    }

    if (
      reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList
        .length !== reqModel.value.engineInfo.videoTagArr.length
    ) {
      reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList =
        reqModel.value.livePromotionOrderInfo.suggest.similarUsernameList.slice(
          0,
          reqModel.value.engineInfo.videoTagArr.length
        );
    }
    // const nickNameArr: any = [];
    // const usernameArr: any = [];
    // fansTag.value.forEach((item: any) => {
    //   if (item.accountInfos.length > 0) {
    //     item.accountInfos.forEach((e) => {
    //       if (e.select) {
    //         nickNameArr.push(e.nickName);
    //         usernameArr.push(e.username);
    //       }
    //     });
    //   }
    // });
    // console.log(
    //   JSON.stringify(nickNameArr),
    //   JSON.stringify(usernameArr),
    //   'nickNameArr'
    // );
    reqModel.value.engineInfo.sphInfo = [];
    for (let i = 0; i < reqModel.value.engineInfo.sphIds.length; i += 1) {
      const findSph = _.find(sphGridList.value, [
        'sphId',
        reqModel.value.engineInfo.sphIds[i],
      ]);
      reqModel.value.deviceInfo.deviceTypeId = findSph.sphUserType;
      reqModel.value.engineInfo.sphInfo.push(findSph);
    }

    reqModel.value.engineInfo.hotType = hotType.value;
    console.log(JSON.stringify(reqModel.value));
    try {
      reqModel.value = removeObjects(reqModel.value, 'createTaskBefore');
      console.log(JSON.stringify(reqModel.value));
      const { data, code } = await createTask({
        reqJson: JSON.stringify(reqModel.value),
      });
      createTaskId.value = data.taskId;
      // console.log(911, code)
      // if (code == 1005) {
      //   serviceQrCode.value = true
      // 		return
      // }

      Message.success({
        content: '创建成功，请等待系统创建订单',
        duration: 5 * 1000,
      });
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
      // you can report use errorHandler or other
      setTimeout(() => {
        createOrderDisabled.value = false;
      }, 5000);
      reqModel.value.createTaskBefore = 1;
      localStorage.setItem('createLivePlant', JSON.stringify(reqModel.value));

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
    }
  };

  const initStorage = async () => {
    if (localStorage.getItem('createLivePlant')) {
      console.log(89456132);
      // TODO
      const cacheReq = JSON.parse(localStorage.getItem('createLivePlant'));
      console.log(cacheReq);
      const req = JSON.parse(localStorage.getItem('createLivePlant'));
      reqModel.value = JSON.parse(localStorage.getItem('createLivePlant'));
      if (reqModel.value.createTaskBefore !== 1) {
        console.log('no ==1');

        reqModel.value.engineInfo.sphIds = [reqModel.value.engineInfo.sphId];
      }
      const { suggest } = cacheReq.livePromotionOrderInfo;

      if (reqModel.value.engineInfo.ruleId) {
        shutdownRuleCheck.value = reqModel.value.engineInfo.ruleId.split(',');
        shutdownRuleCheck.value.forEach((el: any, key: any) => {
          shutdownRuleCheck.value[key] = Number(el);
        });
      }

      if (suggest.gender.length > 0 && suggest.gender[0] === 1) {
        gender.value = 1;
      }
      if (suggest.gender.length > 0 && suggest.gender[0] === 2) {
        gender.value = 2;
      }

      if (suggest.similarUsernameList.length > 0) {
        fansVideoTagRadio.value = 2;
        fansVideoCheckOK.value = true;
        videoTagArr.value = reqModel.value.engineInfo.videoTagArr;

        console.log(suggest.similarUsernameList, 6666);
      }
      console.log(
        req.livePromotionOrderInfo.estimatedWecoinAmount,
        ' req.livePromotionOrderInfo.estimatedWecoinAmount'
      );
      //  下单金额
      if (
        reqModel.value.livePromotionOrderInfo.estimatedWecoinAmount &&
        wecoinArr[
          Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
        ].includes(Number(req.livePromotionOrderInfo.estimatedWecoinAmount))
      ) {
        estimatedWecoinAmountType.value = Number(
          req.livePromotionOrderInfo.estimatedWecoinAmount
        );
        estimatedWecoinAmountTypeChange();
      } else {
        estimatedWecoinAmountZdyVisble.value = true;
        estimatedWecoinAmountType.value = -1;

        estimatedWecoinAmountZdy.value = Number(
          req.livePromotionOrderInfo.estimatedWecoinAmount
        );

        estimatedWecoinAmountZdyChange();
      }
      console.log(reqModel.value);
      switch (cacheReq.livePromotionOrderInfo.materialFlag) {
        case 1:
          sccaispCheck.value = false;
          sucaizbCheck.value = true;
          break;
        case 2:
          sccaispCheck.value = true;
          sucaizbCheck.value = false;
          break;
        default:
          sccaispCheck.value = true;
          sucaizbCheck.value = true;
          break;
      }
      reqModel.value.deviceInfo.deviceTypeId =
        reqModel.value.engineInfo.sphInfo.sphUserType || 1;

      areaValue.value = reqModel.value.engineInfo.cityIdArr || [];
      insertTagValue.value = reqModel.value.engineInfo.insertTagArr || [];
      videoCurrenyArr.value = reqModel.value.engineInfo.videoCurrenyArr || [];

      if (reqModel.value.targetUsername) {
        checkAuthorInfoVisible.value = true;
        checkAuthorInfo.value = reqModel.value.engineInfo.authorInfo;

        const { data } = await getFinderUserAttr({
          sphId: reqModel.value.engineInfo.sphIds[0],
          username: reqModel.value.targetUsername,
        });
        finderUserAttr.value = data.data;
        formVideoVisible.value = false;

        if (data.data.accountInfo) {
          reqModel.value.engineInfo.authorInfo = data.data.accountInfo;
        }

        // 有商品链接的情况才能选择控成本加热
        if (data.data.hasShopShelf === 1) {
          searchVideoGoodsVisible.value = true;
          hotType.value = cacheReq.engineInfo.hotType;
          reqModel.value.livePromotionOrderInfo.promotionTarget =
            cacheReq.livePromotionOrderInfo.promotionTarget;
          promotionTargetChange();

          if (Number(suggest.wecoinBid) > 0) {
            wecoinBidZdy.value = Number(suggest.wecoinBid) / 100;

            wecoinBidZdyChange();
          }
          //  因为promotionTargetChange()会改变下单金额 需要重新赋值
          if (
            reqModel.value.livePromotionOrderInfo.estimatedWecoinAmount &&
            wecoinArr[
              Number(reqModel.value.livePromotionOrderInfo.promotionTarget)
            ].includes(Number(req.livePromotionOrderInfo.estimatedWecoinAmount))
          ) {
            estimatedWecoinAmountType.value = Number(
              req.livePromotionOrderInfo.estimatedWecoinAmount
            );
            estimatedWecoinAmountTypeChange();
          } else {
            estimatedWecoinAmountZdyVisble.value = true;
            estimatedWecoinAmountType.value = -1;

            estimatedWecoinAmountZdy.value = Number(
              req.livePromotionOrderInfo.estimatedWecoinAmount
            );

            estimatedWecoinAmountZdyChange();
          }
        }

        console.log(JSON.stringify(reqModel.value), 'initStorage');
        selectCard();
        // if (reqModel.value.engineInfo.videoInfo.shoppingcartJumpinfo.wording) {
        //   searchVideoGoodsVisible.value = true;
        //   reqModel.value.feedPromotionOrderInfo.promotionTarget = 8;
        //   getShourtLink();
        //   promotionTargetChange();
        // }
      }
    }
    console.log(estimatedWecoinAmountType.value, 'estimatedWecoinAmountType');

    // await searchAuthVideo();
  };

  const initData = () => {
    sphGridSearch(null);
    packageGridSearch(null);
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
  .tipsWords {
    font-size: 14px;
    .arco-icon {
      font-size: 18px;
    }
  }
  .titleBox {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
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
  .container {
    padding: 0 17px 17px;
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
  .flex_ct {
    display: flex;
    align-items: center;
  }
  .mr {
    margin: 0 5px;
  }
  .liveTag {
    display: flex;
    width: 64px;
    height: 16px;
    align-items: center;
    padding: 0 7px;
    justify-content: space-between;
    background: #f8e3de;
    border-radius: 8px;
    .text {
      font-size: 12px;

      color: #ec544d;
      white-space: nowrap;
      transform: scale(0.9);
    }
    .sc {
      width: 12px;
      height: 12px;
      position: relative;
      transform: scale(0.8);

      border-radius: 50%;
      border: 1px solid #ec544d;
      flex-shrink: 0;
      .sm {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ec544d;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .custom-checkbox-card {
    padding: 10px 16px;
    border: 1px solid var(--color-border-2);
    border-radius: 4px;
    width: 250px;
    box-sizing: border-box;
    margin-bottom: 10px;
    .flexLi {
      width: 100%;
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
    }
  }

  .custom-checkbox-card-mask {
    height: 14px;
    width: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: 1px solid var(--color-border-2);
    box-sizing: border-box;
  }

  .custom-checkbox-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }

  .custom-checkbox-card-title {
    color: var(--color-text-1);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .custom-checkbox-card:hover,
  .custom-checkbox-card-checked,
  .custom-checkbox-card:hover .custom-checkbox-card-mask,
  .custom-checkbox-card-checked .custom-checkbox-card-mask {
    border-color: rgb(var(--primary-6));
  }

  .custom-checkbox-card-checked {
    background-color: var(--color-primary-light-1);
  }

  .custom-checkbox-card:hover .custom-checkbox-card-title,
  .custom-checkbox-card-checked .custom-checkbox-card-title {
    color: rgb(var(--primary-6));
  }

  .custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
    background-color: rgb(var(--primary-6));
  }
  .wx_dou_icon {
    width: 10px;
    height: calc(11px / (43 / 49));
    margin-bottom: 1px;
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
</style>
