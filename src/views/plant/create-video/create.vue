<template>
  <div class="container">
    <Breadcrumb :items="['投流管理', '创建视频']" />
    <input id="moliCors" type="hidden" />

    <div v-if="level === 1" class="mark">
      <a-modal
        :mask="false"
        :simple="true"
        :footer="false"
        :mask-closable="false"
        :default-visible="true"
        style="z-index: 12"
      >
        <template #title> 抱歉，此账号暂无权限 </template>
        <a-typography>
          <a-typography-paragraph style="text-align: center">
            <a-space direction="vertical" fill>
              <span>联系商务，升级权限</span>
              <a-image
                width="200"
                height="200"
                src="https://img.adyinqing.com/upai_shop/uww28i291684480862798"
              ></a-image>
            </a-space>
          </a-typography-paragraph>
        </a-typography>
      </a-modal>
    </div>
    <div v-if="moliCorsVisible && level === 2" class="mark">
      <a-modal
        v-model:visible="moliCorsVisible"
        :mask="false"
        :simple="true"
        :footer="false"
        :mask-closable="false"
        style="z-index: 12"
      >
        <template #title> 请安装Chrome扩展，[魔力智投] 扩展 </template>
        <a-typography>
          <a-typography-paragraph>
            <ul>
              <li> 量身定制的chrome插件，突破视频上传速度</li>
              <li> 没有此插件无法使用【发布视频】功能</li>
              <li> 安装完成后，请刷新本页面</li>
            </ul>
          </a-typography-paragraph>
          <a-typography-paragraph style="text-align: center">
            <a-button type="primary" shape="round" @click="jumpTuDown"
              >安装向导</a-button
            >
          </a-typography-paragraph>
        </a-typography>
        <!-- <template #title> 【发布视频】此功能更新中... </template>
        <a-space align="start">
          <icon-exclamation-circle style="margin-top: 4px" />

          5月16日起，只有开通短视频商品分享权益的账号才能使用「加热商品」功能，请等待软件更新

        </a-space> -->
      </a-modal>
    </div>

    <div
      :style="{
        boxSizing: 'border-box',
        width: '100%',
        padding: '10px 20px 0 20px',
        backgroundColor: 'var(--color-fill-2)',
      }"
    >
      <a-row :gutter="24" :style="{ marginBottom: '-5px' }">
        <a-col :span="18">
          <a-card title="基础信息" :bordered="false" :style="{ width: '100%' }">
            <a-form
              ref="formJcRef"
              auto-label-width
              :model="reqModel.engineInfo"
              style="width: 520px"
            >
              <a-form-item
                field="groupId"
                label="归属分组"
                :rules="[{ required: true, message: '请选择分组' }]"
                :validate-trigger="['change', 'input']"
              >
                <a-select
                  v-model="reqModel.engineInfo.groupId"
                  placeholder="可输入模糊搜索"
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
                  <template #default>新建计划</template>
                </a-button>
              </a-form-item>

              <a-form-item
                field="sphId"
                label="被投号"
                :rules="[{ required: true, message: '请选择被投号' }]"
                :validate-trigger="['change', 'input']"
              >
                <a-select
                  v-model="reqModel.engineInfo.sphId"
                  placeholder="可输入模糊搜索"
                  :allow-search="{ retainInputValue: true }"
                  allow-clear
                  @search="sphGridSearch"
                  @change="gethelperUploadParams"
                >
                  <a-option
                    v-for="(item, key) in sphGridList"
                    :key="key"
                    :label="item.sphName"
                    :value="item.sphId"
                  />
                </a-select>
              </a-form-item>

              <a-form-item
                field="taskNum"
                label="创建数量"
                :rules="[{ required: true, message: '请填写创建数量' }]"
                :validate-trigger="['change', 'input']"
              >
                <a-input-number
                  v-model="reqModel.engineInfo.taskNum"
                  disabled
                  placeholder="请填写创建数量"
                  :min="1"
                  :max="100"
                />
              </a-form-item>

              <a-form-item field="taskNum" label="佣金率">
                <a-input-number
                  v-model="reqModel.engineInfo.yjl"
                  placeholder="请填写佣金率"
                  :min="1"
                  :max="100"
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
                    :style="{ width: '360px' }"
                    placeholder="请选择自动关停策略"
                    multiple
                    readonly
                    :limit="10"
                    :scrollbar="true"
                    @change="shutdownRuleChange"
                  >
                    <a-option
                      v-for="(item, key) in shutdownRuleList"
                      :key="key"
                      :label="item.srName"
                      :value="item.srId"
                    />
                  </a-select>
                </a-space>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="加热信息" :bordered="false" :style="{ width: '100%' }">
            <a-list style="margin-bottom: 30px">
              <a-list-item
                ><span style="font-size: 18px; font-weight: 500"
                  >订单数量： </span
                ><span> {{ reqModel.engineInfo.taskNum }}个</span>
              </a-list-item>
              <a-list-item
                ><span style="font-size: 18px; font-weight: 500"
                  >订单金额：
                </span>
                {{
                  reqModel.feedPromotionOrderInfo.estimatedWecoinAmount *
                  reqModel.engineInfo.taskNum
                }}
              </a-list-item>
              <a-list-item
                ><span style="font-size: 18px; font-weight: 500">需支付： </span
                >{{
                  reqModel.feedPromotionOrderInfo.estimatedWecoinAmount *
                  reqModel.engineInfo.taskNum
                }}
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
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="18">
          <a-card :bordered="false" style="width: 100%; margin-top: 20px">
            <a-steps :current="step" type="navigation">
              <a-step>添加商品并创建视频</a-step>
              <a-step>发起加热</a-step>
            </a-steps>
            <!-- <a-divider /> -->

            <a-row v-if="step === 1" :gutter="24" style="margin-top: 10px">
              <a-col :span="18">
                <a-card :bordered="false" :style="{ width: '100%' }">
                  <a-space align="start" :size="120">
                    <div class="leftUpload">
                      <a-spin
                        :loading="videoUploadLoadding"
                        tip="视频正在上传中"
                      >
                        <template #element>
                          <a-progress
                            type="circle"
                            :percent="videoUploadPercent"
                          />
                        </template>

                        <a-upload
                          v-if="!uploadVideoUrl"
                          draggable
                          action="/"
                          style="width: 240px"
                          :show-file-list="false"
                          :custom-request="sphVideoUpload"
                        />
                      </a-spin>
                      <a-spin
                        :loading="videoProcessloading"
                        tip="视频正在处理中"
                      >
                        <video
                          id="videoPlay"
                          :src="uploadVideoUrl"
                          :style="{
                            display: uploadVideoUrl ? 'initial' : 'none',
                          }"
                          class="avatar"
                          style="width: 240px; height: 500px"
                          crossorigin="anonymous"
                          controls="controls"
                          >您的浏览器不支持视频播放</video
                        >
                      </a-spin>
                    </div>

                    <a-form
                      ref="formVideoRef"
                      auto-label-width
                      :model="vReqModel.objectDesc"
                      style="width: 520px"
                    >
                      <a-form-item label="封面预览">
                        <a-upload
                          v-if="!uploadVideoImgUrl"
                          draggable
                          :disabled="true"
                          action="/"
                          style="width: 240px"
                          :custom-request="sphVideoUpload"
                        />
                        <a-image
                          v-if="uploadVideoImgUrl"
                          width="120"
                          :src="uploadVideoImgUrl"
                        />
                        <canvas id="canvas" style="display: none"></canvas>
                      </a-form-item>
                      <a-form-item field="shortTitle" label="短标题">
                        <a-input
                          v-model="vReqTitleModel.shortTitle[0].shortTitle"
                          placeholder="输入短标题"
                        ></a-input>
                      </a-form-item>
                      <a-form-item
                        field="description"
                        label="动态描述"
                        :rules="[{ required: true, message: '请填写动态描述' }]"
                        :validate-trigger="['change', 'input']"
                      >
                        <a-textarea
                          v-model="vReqModel.objectDesc.description"
                          :auto-size="{
                            minRows: 2,
                            maxRows: 5,
                          }"
                          placeholder="添加描述"
                          allow-clear
                        />
                      </a-form-item>

                      <a-form-item label="商品">
                        <a-input
                          v-model="checkProductName"
                          readonly
                          placeholder="选择商品"
                          @click="handleClickChoosePro"
                        ></a-input>
                      </a-form-item>

                      <a-form-item>
                        <a-button
                          :loading="createVideoLoadding"
                          status="success"
                          @click="createVideoTask"
                          >下一步
                        </a-button>
                      </a-form-item>
                    </a-form>
                  </a-space>
                </a-card>
              </a-col>
            </a-row>

            <a-row v-if="step === 2" :gutter="24" style="margin-top: 10px">
              <a-col :span="18">
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
                              :value="7"
                              :disabled="!searchVideoGoodsVisible"
                              >商品点击
                            </a-radio>
                            <a-radio
                              :value="8"
                              :disabled="!searchVideoGoodsVisible"
                              >商品成交
                            </a-radio>
                          </a-radio-group>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>

                    <a-list-item>
                      <a-list-item-meta>
                        <template #title>
                          <span
                            >预计覆盖人数
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
                            <a-radio :value="1">1000</a-radio>
                            <a-radio :value="2">2000</a-radio>
                            <a-radio :value="3">
                              <span>自定义</span>
                              <a-input-number
                                v-if="estimatedWecoinAmountZdyVisble"
                                v-model="estimatedWecoinAmountZdy"
                                placeholder="需在500/1000-300000之间"
                                :min="1000"
                                :max="300000"
                                :step="1000"
                                :precision="0"
                                mode="button"
                                style="width: 60%"
                                @change="estimatedWecoinAmountZdyChange"
                              />
                            </a-radio>
                          </a-radio-group>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>

                    <a-list-item>
                      <a-list-item-meta>
                        <template #title>
                          <span>出价方式</span>
                        </template>
                        <template #description>
                          <a-radio-group
                            v-model="wecoinBidType"
                            style="margin-top: 20px"
                            @change="wecoinBidTypeChange"
                          >
                            <a-radio :value="1">智能出价</a-radio>
                            <a-radio :value="2">
                              <span>自定义</span>
                              <a-input-number
                                v-if="wecoinBidZdyVisble"
                                v-model="wecoinBidZdy"
                                placeholder="需在500/1000-300000之间"
                                :min="1"
                                :max="1000"
                                :step="1"
                                :precision="0"
                                mode="button"
                                style="width: 60%"
                                @change="wecoinBidZdyChange"
                              />
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
                          >
                            <a-radio :value="1">智能加热</a-radio>
                            <a-radio :value="2">定向加热</a-radio>
                          </a-radio-group>
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
                              >选择相似作者的粉丝
                            </a-radio>
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
                              <template #value="{ value }">
                                {{ value }}
                              </template>
                            </a-input-tag>
                            等 {{ videoTagArr.length }}个作者
                          </a-space>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>

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
                            <a-radio :value="0" :default-checked="true"
                              >不限
                            </a-radio>
                            <a-radio :value="1">男</a-radio>
                            <a-radio :value="2">女</a-radio>
                          </a-radio-group>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>

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

                    <a-list-item
                      v-if="reqModel.feedPromotionOrderInfo.promotionType === 2"
                    >
                      <a-list-item-meta>
                        <template #title>
                          <span>根据地区推荐</span>
                        </template>
                        <template #description>
                          <Cascader
                            style="margin-top: 10px; width: 320px"
                            multiple
                            :options="areaOptions"
                            placeholder="全部地区"
                            dropdown-class-name="ant_placeholder_class"
                            suffix-icon="Shopping Around"
                            @change="changeAreaTag"
                          >
                            <template #tagRender="data">
                              <a-tag :key="data.value" color="blue"
                                >{{ data.label }}
                              </a-tag>
                            </template>
                          </Cascader>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>

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
                              reqModel.feedPromotionOrderInfo.suggest
                                .interestTag
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
                            style="margin-top: 20px"
                            default-value="C"
                          >
                            <a-radio value="A" disabled
                              >优先使用最大面额优惠券
                            </a-radio>
                            <a-radio value="B" disabled
                              >优先使用即将到期优惠券
                            </a-radio>
                            <a-radio value="C" disabled>不使用优惠券</a-radio>
                          </a-radio-group>
                        </template>
                      </a-list-item-meta>
                    </a-list-item>
                  </a-list>
                </a-card>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>

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
            readonly
            allow-clear
            style="
               {
                width: 500px;
                height: 80px;
                border-radius: 8px;
              }
            "
            @remove="textChange($event)"
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
              >{{ el.labelName }}
              <icon-right />
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
              </div>
            </div>
          </a-spin>
        </a-col>
      </a-row>
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
          <a-table
            :pagination="true"
            :hoverable="true"
            :stripe="false"
            :loading="createTaskOrderLoading"
            :data="createTaskOrderList"
            :bordered="false"
          >
            <template #columns>
              <a-table-column title="投手号" align="center">
                <template #cell="{ record }">
                  {{ record.sphInfo.sphName }}
                </template>
              </a-table-column>
              <a-table-column title="创建状态" align="center">
                <template #cell="{ record }">
                  <span @click="$message.info(record.errorMsg)"
                    v-if="record.createStatus === 3">
                    <span> {{ createStatus[record.createStatus] }}</span>
                    <icon-exclamation-circle-fill />
                  </span>

                  <span v-else> {{ createStatus[record.createStatus] }}</span>
                </template>
              </a-table-column>
              <a-table-column title="优惠券折扣" align="center">
                <template #cell="{ record }">
                  {{ record.jueduimeiyou || '-' }}
                </template>
              </a-table-column>
              <a-table-column title="需支付" align="center">
                <template #cell="{ record }">
                  {{ record.estimatedWecoinAmount }}
                </template>
              </a-table-column>
              <a-table-column title="订单状态" align="center">
                <template #cell="{ record }">
                  {{ plantStatus[record.plantStatus] }}
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
        </a-col>
        <a-col :span="8" style="text-align: center">
          <span style="font-size: 16px">请使用对应投手号进行支付</span>

          <a-spin :loading="createTaskPayLoading" :tip="createTaskPayTips">
            <template
              v-if="createTaskPayTips === '当前订单已全部支付完成'"
              #element
            >
              <icon-check-circle-fill :spin="false" :rotate="0" />
            </template>
            <a-card class="general-card" style="padding-top: 60px">
              <a-space
                :size="16"
                direction="vertical"
                fill
                style="text-align: center"
              >
                <span
                  v-if="createTaskPayOrderList[createTaskPayOrderIndex]"
                  style="font-size: 16px"
                  >{{
                    createTaskPayOrderList[createTaskPayOrderIndex].plantName
                  }}</span
                >
                <QrcodeVue
                  v-if="createTaskPayOrderList[createTaskPayOrderIndex]"
                  :value="
                    createTaskPayOrderList[createTaskPayOrderIndex].qrCodeVal
                  "
                  :size="200"
                  level="H"
                  style="position: relative"
                />

                <a-tag color="green">请用微信APP扫描二维码</a-tag>
                <a-link @click="createTaskPayOrderJumpThis">跳过该计划</a-link>
              </a-space>
            </a-card>
          </a-spin>
        </a-col>
      </a-row>
    </a-modal>

    <a-modal
      v-model:visible="chooseProductVisible"
      :mask-closable="false"
      ok-text="添加"
      width="1000px"
      title="选择商品"
      @cancel="createdOrderTimerClear"
      @ok="createdOrderTimerClear"
    >
      <!-- <a-form auto-label-width show-colon="true">
        <a-row justify="space-between">
          <a-col :span="8">
            <a-form-item
              field="sphId"
              label="商品来源"
              :rules="[{ required: true, message: '请选择商品来源' }]"
              :validate-trigger="['change', 'input']"
            >
              <a-input style="width: 300px" />
            </a-form-item>
          </a-col>
          <a-col :span="8" flex="end">
            <a-form-item
              field="sphId"
              label="其他添加方式"
              :rules="[{ required: false, message: '请选择商品来源' }]"
              :validate-trigger="['change', 'input']"
            >
              <a-space :size="8">
                <a-button type="text" @click="handleGpClick(1)">
                  商品链接
                </a-button>
                <a-button type="text" @click="handleGpClick(1)">
                  我的商品
                </a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form> -->
      <a-table
        v-model:selectedKeys="selectedProductKeys"
        :bordered="false"
        :pagination="true"
        :hoverable="true"
        :stripe="false"
        :loading="proComeDataLoding"
        :data="proComeData"
        :row-selection="{
          type: 'radio',
        }"
        @row-click="productCheck"
      >
        <template #columns>
          <a-table-column title="商品信息" align="left">
            <template #cell="{ record }">
              <a-space :size="12">
                <a-image width="70" :src="record.imgUrls[0]" />
                <a-space direction="vertical" fill>
                  <a-typography-text>
                    商品名称 {{ record.title }}
                  </a-typography-text>
                  <a-typography-text disabled>
                    ID: {{ record.productId }}
                  </a-typography-text>
                </a-space>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="商品来源" align="center">
            <template #cell="{ record }">
              {{ record.platformName }}
            </template>
          </a-table-column>
          <a-table-column title="价格" align="center">
            <template #cell="{ record }">
              {{ (record.sellingPrice / 100).toFixed(2) }}
            </template>
          </a-table-column>
          <a-table-column title="库存" align="center">
            <template #cell="{ record }">
              {{ record.stock }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, watch, computed, nextTick, onMounted } from 'vue';
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
    applyuploaddfs,
    uploadPartdfs,
    completepartuploaddfs,
  } from '@/api/sphUpload';
  import {
    sphGrid,
    getOrderDetail,
    getLabelTag,
    getSearchAccount,
    sphUpload,
    helperUploadParams,
    getTraceKey,
    postVideo,
    postVideoResult,
    getAllProduct,
    createVideo,
    helperReport,
    getAuthData,
  } from '@/api/sph';
  import { getUserInfo } from '@/api/user';

  import { FormInstance } from '@arco-design/web-vue/es/form';
  import QrcodeVue from 'qrcode.vue';
  import type { CascaderProps } from 'ant-design-vue';
  import { Cascader } from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
  import { province, city } from '@/utils/address';
  import axios from 'axios';
  import { createStatus, plantStatus } from '@/utils/enum';

  const level = ref(0);

  const getUser = async () => {
    const { data } = await getUserInfo();
    level.value = data.memberLevel;
  };
  getUser();
  const proComeData = ref([]);
  const proComeDataLoding = ref(false);
  const step = ref(1);

  const uin = ref('');
  const authKey = ref('');
  const uploadVideoUrl = ref('');
  const uploadVideoDuration = ref<any>('');
  const uploadVideoFileSize = ref<any>('');
  const uploadVideoFileName = ref<any>('');
  const checkProductName = ref('');
  const videoClipKey = ref('');
  const videoDraftId = ref('');

  const videoUploadLoadding = ref(false);
  const videoUploadPercent = ref(0);
  const createVideoLoadding = ref(false);
  const postClipVideoVisable = ref(false);
  const videoTimer = ref<any>();
  const uploadVideoImgUrl = ref('');
  const selectedProductKeys = ref<any>();
  const traceInfo = ref({
    traceKey: 'FPT_1679566421_610774149',
    uploadCdnStart: 1679566420,
    uploadCdnEnd: '',
  });
  const authData = ref<any>({});

  const genVreqModel = () => {
    return {
      objectType: 0,
      longitude: 0,
      latitude: 0,
      feedLongitude: 0,
      feedLatitude: 0,
      originalFlag: 0,
      topics: [],
      isFullPost: 1,
      handleFlag: 2,
      videoClipTaskId: videoClipKey.value,
      traceInfo: traceInfo.value,
      objectDesc: {
        mpTitle: '',
        description: '',
        extReading: {},
        mediaType: 4,
        location: {},
        topic: {
          finderTopicInfo: '',
        },
        event: {},
        mentionedUser: [],
        media: [
          {
            url: '',
            fileSize: 4586870,
            thumbUrl: '',
            fullThumbUrl: '',
            mediaType: 4,
            videoPlayLen: 28,
            width: 368,
            height: 656,
            md5sum: '',
          },
        ],

        component: {
          id: '',
          type: 1,
        },
      },
      report: {
        clipKey: videoClipKey.value,
        draftId: videoDraftId.value,
        timestamp: '',
        pluginSessionId: null,
        scene: 7,
        reqScene: 6,
        height: 654,
        width: 368,
        duration: uploadVideoDuration.value,
        fileSize: uploadVideoFileSize.value,
        uploadCost: 1306,
      },
      mode: 1,
      clientid: '2c9e254b-923a-46b8-b186-789a5545dd21',
      timestamp: '1679566805789',
      pluginSessionId: null,
      scene: 7,
      reqScene: 6,
    };
  };
  const vReqTitleModel = ref<any>({
    shortTitle: [
      {
        shortTitle: '',
      },
    ],
  });
  const vReqModel = ref<any>(genVreqModel());

  const createOverPayVisible = ref(false);
  const chooseProductVisible = ref(false);
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
  const createTaskOrderInfo = ref(createTaskOrderInfoModel());
  const createTaskPayOrderList = ref<any>([]);
  const createTaskPayOrderIndex = ref(0);
  const createdGetPlantReqVisable = ref(true);
  const createdGetInfoReqVisable = ref(true);
  const createdPlantTimer = ref<any>();
  const createdOrderTimer = ref<any>();
  const createdOrderTimerClear = () => {
    createdGetPlantReqVisable.value = true;
    createdGetInfoReqVisable.value = true;
    clearInterval(createdPlantTimer.value);
    clearInterval(createdOrderTimer.value);
  };
  const createTaskPayOrderJumpThis = () => {
    if (createTaskPayOrderList.value.length > 0) {
      createTaskPayOrderIndex.value += 1;
      if (!createTaskPayOrderList.value[createTaskPayOrderIndex.value]) {
        createdOrderTimerClear();
        createTaskPayLoading.value = true;
        createTaskPayTips.value = '当前订单已全部支付完成';
      }
    } else {
      createdOrderTimerClear();
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
    }
  };

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
      taskId: createTaskId.value,
      pageIndex: 1,
      pageSize: 110,
      startDate: '2023-01-01',
      endDate: '2128-01-01',
    });
    createTaskOrderList.value = data.grid;
    createTaskOrderInfo.value = createTaskOrderInfoModel();
    createTaskOrderInfo.value.total = data.total;
    createTaskOrderList.value.forEach((el: any) => {
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
          createTaskPayOrderList.value.push({
            plantName: el.plantName,
            plantCode: el.plantCode,
            sphId: el.sphId,
            qrCodeVal: `https://channels.weixin.qq.com/promote/pages/mobile_pay?promotionId=${el.plantCode}&type=feed&userType=${el.sphInfo.sphUserType}&corproateId=${corproateId}`,
          });
        }
      }
      if (el.plantStatus !== 1) {
        createTaskOrderInfo.value.overPay += 1;
        if (
          _.findIndex(createTaskPayOrderList.value, [
            'plantCode',
            el.plantCode,
          ]) !== undefined
        ) {
          createTaskPayOrderList.value.splice(
            _.findIndex(createTaskPayOrderList.value, [
              'plantCode',
              el.plantCode,
            ]),
            1
          );
        }
      }
    });
    // createTaskOrderList
    createTaskOrderLoading.value = false;
    createdGetPlantReqVisable.value = false;
    if (
      createTaskOrderInfo.value.total ===
        createTaskOrderInfo.value.success + createTaskOrderInfo.value.error &&
      createTaskOrderInfo.value.success === createTaskOrderInfo.value.overPay
    ) {
      createdOrderTimerClear();
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      return;
    }
    if (
      createTaskPayOrderIndex.value > 0 &&
      !createTaskPayOrderList.value[createTaskPayOrderIndex.value]
    ) {
      createdOrderTimerClear();
      createTaskPayLoading.value = true;
      createTaskPayTips.value = '当前订单已全部支付完成';
      return;
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
      createTaskPayLoading.value = false;
    }
  };

  const reqFormModel = () => {
    return {
      sequence: '',
      exportId: '',
      engineInfo: {
        groupId: null,
        packageId: null,
        sphId: null,
        ruleId: '',
        taskNum: 1,
        taskArr: [],
        yjl: 100,
        videoUrl: '',
        videoInfo: {
          shoppingcartJumpinfo: {},
        },
        authorInfo: {},
      },
      feedPromotionOrderInfo: {
        promotionTarget: 6,
        promotionType: 1,
        estimatedWecoinAmount: '1000',
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
        pricingMethod: 0,
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

  const estimatedWecoinAmountZdyVisble = ref(false);
  const estimatedWecoinAmountZdy = ref(1000);
  const estimatedWecoinAmountType = ref(1);

  const wecoinBidZdyVisble = ref(false);
  const wecoinBidZdy = ref(40);
  const wecoinBidType = ref(1);

  const promotionTargetMember = ref(1667);
  const promotionTargetMemberSum = ref(1667);

  const formGpVisible = ref(false);
  const formGpTitle = ref('新建分组');
  const formGpModel = ref({ name: null, type: 1 });
  const formGpRef = ref<FormInstance>();

  const formVideoTagVisible = ref(false);

  const searchVideoGoodsVisible = ref(false);

  const labelContentloading = ref(false);

  const gender = ref(0);
  const insertTag = ref(
    '[{"搞笑":"1083"},{"亲子":"1084"},{"二次元":"1085"},{"明星名人":"1086"},{"旅行风景":"1087"},{"舞蹈":"1088"},{"音乐":"1089"},{"运动":"1090"},{"影视综艺":"1091"},{"时尚":"1092"},{"美食":"1093"},{"萌宠":"1094"},{"动物":"1095"},{"游戏":"1096"},{"科技":"1097"},{"工业/机械/施工":"1098"},{"车":"1099"},{"生活":"1100"},{"新闻资讯":"1101"},{"知识":"1102"},{"悬疑/侦探剧场":"1103"},{"情感":"1104"},{"才艺":"1105"},{"生活技巧":"1106"}]'
  );
  const fansTag = ref<any>(
    '[{"accountInfos":[],"labelName":"摄影","labelId":"1"},{"accountInfos":[],"labelName":"音乐","labelId":"2"},{"accountInfos":[],"labelName":"生活","labelId":"3"},{"accountInfos":[],"labelName":"VLOG","labelId":"4"},{"accountInfos":[],"labelName":"美食","labelId":"5"},{"accountInfos":[],"labelName":"影视综","labelId":"6"},{"accountInfos":[],"labelName":"情感","labelId":"7"},{"accountInfos":[],"labelName":"旅行","labelId":"8"},{"accountInfos":[],"labelName":"职场","labelId":"9"},{"accountInfos":[],"labelName":"颜值","labelId":"10"},{"accountInfos":[],"labelName":"亲子","labelId":"11"},{"accountInfos":[],"labelName":"人文艺术","labelId":"12"},{"accountInfos":[],"labelName":"二次元","labelId":"13"},{"accountInfos":[],"labelName":"舞蹈","labelId":"14"},{"accountInfos":[],"labelName":"游戏","labelId":"15"},{"accountInfos":[],"labelName":"教育","labelId":"16"},{"accountInfos":[],"labelName":"宠物","labelId":"17"},{"accountInfos":[],"labelName":"体育","labelId":"18"},{"accountInfos":[],"labelName":"美妆","labelId":"19"},{"accountInfos":[],"labelName":"时尚","labelId":"20"},{"accountInfos":[],"labelName":"科学科普","labelId":"21"},{"accountInfos":[],"labelName":"搞笑","labelId":"22"},{"accountInfos":[],"labelName":"社会","labelId":"23"},{"accountInfos":[],"labelName":"汽车","labelId":"24"},{"accountInfos":[],"labelName":"财经","labelId":"25"},{"accountInfos":[],"labelName":"健康","labelId":"26"},{"accountInfos":[],"labelName":"剧情","labelId":"28"},{"accountInfos":[],"labelName":"三农","labelId":"29"},{"accountInfos":[],"labelName":"法律","labelId":"31"},{"accountInfos":[],"labelName":"娱乐","labelId":"32"},{"accountInfos":[],"labelName":"收藏","labelId":"33"},{"accountInfos":[],"labelName":"科技","labelId":"34"},{"accountInfos":[],"labelName":"星座运势","labelId":"35"},{"accountInfos":[],"labelName":"公益","labelId":"36"},{"accountInfos":[],"labelName":"历史","labelId":"37"},{"accountInfos":[],"labelName":"宗教","labelId":"38"},{"accountInfos":[],"labelName":"无法分类","labelId":"39"},{"accountInfos":[],"labelName":"军事","labelId":"40"}]'
  );
  insertTag.value = JSON.parse(insertTag.value);
  fansTag.value = JSON.parse(fansTag.value);

  const videoTagArr = ref([]);
  const labelActive = ref(0);
  const searchText = ref('');
  const selectBox = ref(false);
  const fansVideoTagRadio = ref(1);
  const fansVideoCheckOK = ref(false);
  const videoProcessloading = ref(false);
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
  const changeAreaTag = async (val: any, option: any) => {
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
    console.log(val, reqModel.value.feedPromotionOrderInfo.suggest.cityIds);
  };

  const changeActive = async (e: any) => {
    labelActive.value = e;
    if (!reqModel.value.engineInfo.sphId) {
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
        sphId: reqModel.value.engineInfo.sphId,
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
          sphId: reqModel.value.engineInfo.sphId,
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

  const pushContentInArr = (item: any, index: any) => {
    if (!fansTag.value[labelActive.value].accountInfos[index].select) {
      if (videoTagArr.value.length >= 10) {
        Message.warning('最大只能选择10位作者');
        return;
      }
      videoTagArr.value.push(item.nickName);
      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.push(
        item.username
      );
      fansTag.value[labelActive.value].accountInfos[index].select = true;
    } else {
      videoTagArr.value.splice(videoTagArr.value.indexOf(item.nickName), 1);
      reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.splice(
        reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList.indexOf(
          item.username
        ),
        1
      );
      fansTag.value[labelActive.value].accountInfos[index].select = false;
    }
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
    formVideoTagVisible.value = false;
    fansVideoTagRadio.value = 1;
    reqModel.value.feedPromotionOrderInfo.suggest.similarUsernameList = [];
  };

  const formJcRef = ref<FormInstance>();

  const formVideoRef = ref<FormInstance>();

  const { loading, setLoading } = useLoading(true);

  const sphGridSearch = async (params: any) => {
    const { data } = await sphGrid({
      pageIndex: 1,
      pageSize: 100,
      sphType: 2,
      sphName: params,
    });
    sphGridList.value = data.grid || [];
  };

  const groupGridSearch = async (params: any) => {
    const { data } = await plantGroupGrid({
      pageIndex: 1,
      pageSize: 100,
      name: params,
    });
    groupGridList.value = data.grid || [];
  };

  const packageGridSearch = async (params: any) => {
    const { data } = await plantPackageGrid({
      pageIndex: 1,
      pageSize: 100,
      name: params,
    });
    packageGridList.value = data.grid || [];
  };
  const estimatedWecoinAmountTypeChange = async () => {
    switch (estimatedWecoinAmountType.value) {
      case 1:
        estimatedWecoinAmountZdyVisble.value = false;
        reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount = '1000';
        promotionTargetMemberSum.value =
          (promotionTargetMember.value *
            Number(
              reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount
            )) /
          1000;

        break;
      case 2:
        estimatedWecoinAmountZdyVisble.value = false;
        reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount = '2000';
        promotionTargetMemberSum.value =
          (promotionTargetMember.value *
            Number(
              reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount
            )) /
          1000;
        break;
      case 3:
        estimatedWecoinAmountZdyVisble.value = true;
        break;
      default:
        break;
    }
  };
  const estimatedWecoinAmountZdyChange = async () => {
    reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount = String(
      estimatedWecoinAmountZdy.value
    );
    promotionTargetMemberSum.value =
      (promotionTargetMember.value *
        Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount)) /
      1000;
  };

  const removeObjects = (obj: any, key: any) => {
    Object.keys(obj).forEach((k) => {
      if (k === key) {
        delete obj[k]; // 删除对象的key。
      }
    });
    return obj;
  };

  function guid2() {
    function S4() {
      // eslint-disable-next-line no-bitwise
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  }

  const promotionTargetChange = async () => {
    if (
      reqModel.value.feedPromotionOrderInfo.promotionTarget === 9 ||
      reqModel.value.feedPromotionOrderInfo.promotionTarget === 8
    ) {
      promotionTargetMemberSum.value =
        (30 *
          Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount)) /
        1000;
      promotionTargetMember.value = 30;
    } else {
      promotionTargetMemberSum.value =
        (1667 *
          Number(reqModel.value.feedPromotionOrderInfo.estimatedWecoinAmount)) /
        1000;
      promotionTargetMember.value = 1667;
    }
  };

  const wecoinBidTypeChange = async () => {
    switch (wecoinBidType.value) {
      case 1:
        wecoinBidZdyVisble.value = false;
        reqModel.value.feedPromotionOrderInfo.suggest = removeObjects(
          reqModel.value.feedPromotionOrderInfo.suggest,
          'wecoinBid'
        );
        reqModel.value.feedPromotionOrderInfo.pricingMethod = 0;
        break;
      case 2:
        wecoinBidZdyVisble.value = true;
        reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid = String(
          wecoinBidZdy.value * 100
        );
        reqModel.value.feedPromotionOrderInfo.pricingMethod = 1;
        break;
      default:
        break;
    }
  };
  const wecoinBidZdyChange = async () => {
    reqModel.value.feedPromotionOrderInfo.suggest.wecoinBid = String(
      wecoinBidZdy.value * 100
    );
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

  const changeFansTag = async () => {};

  const createOrderDisabled = ref(false);
  const createOrder = async () => {
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
      const { data } = await createTask({
        reqJson: JSON.stringify(reqModel.value),
      });
      createTaskId.value = data.taskId;
      Message.success({
        content: '创建成功，请等待系统创建订单',
        duration: 5 * 1000,
      });
    } catch (err) {
      createOrderDisabled.value = false;
      // you can report use errorHandler or other
    } finally {
      // you can report use errorHandler or other
      setTimeout(() => {
        createOrderDisabled.value = false;
      }, 5000);

      // 添加缓存
      // localStorage.setItem('createVideoPlant', JSON.stringify(reqModel.value));

      createdGetPlantReqVisable.value = false;
      createdGetInfoReqVisable.value = false;
      createTaskOrderLoading.value = true;
      createTaskPayLoading.value = true;
      createTaskPayOrderIndex.value = 0;
      createTaskPayOrderList.value = [];
      createTaskPayTips.value = '正在创建支付订单';
      createdGetPlant();

      createdPlantTimer.value = setInterval(async function () {
        createdGetPlant();
      }, 1000);
      createdOrderTimer.value = setInterval(async function () {
        if (createTaskPayOrderList.value.length > 0) {
          if (createdGetInfoReqVisable.value) {
            return;
          }

          createdGetInfoReqVisable.value = true;
          const { data } = await getOrderDetail({
            sphId:
              createTaskPayOrderList.value[createTaskPayOrderIndex.value].sphId,
            promotionId:
              createTaskPayOrderList.value[createTaskPayOrderIndex.value]
                .plantCode,
          });
          createdGetInfoReqVisable.value = false;
          if (Number(data.data.order.orderInfo.status) === 2) {
            createdGetPlant();
          }
        }
      }, 1000);
    }
  };

  const changeTradeKey = async () => {
    if (!reqModel.value.engineInfo.sphId) {
      return;
    }
    const { data } = await getTraceKey({
      sphId: reqModel.value.engineInfo.sphId,
    });
    traceInfo.value.traceKey = data.data.traceKey;
    traceInfo.value.uploadCdnStart = dayjs().unix();

    const auRes = await getAuthData({
      sphId: reqModel.value.engineInfo.sphId,
    });
    authData.value = auRes.data.data;
    reqModel.value.engineInfo.authorInfo.nickName =
      authData.value.finderUser.nickname;
    reqModel.value.engineInfo.authorInfo.signature = authData.value.signature;
    reqModel.value.engineInfo.authorInfo.headImgUrl =
      authData.value.finderUser.headImgUrl;
    reqModel.value.engineInfo.authorInfo.username =
      authData.value.finderUser.finderUsername;
  };

  const gethelperUploadParams = async () => {
    if (!reqModel.value.engineInfo.sphId) {
      return;
    }
    const { data } = await helperUploadParams({
      sphId: reqModel.value.engineInfo.sphId,
    });
    uin.value = data.data.uin;
    authKey.value = data.data.authKey;
    changeTradeKey();
  };

  const initData = () => {
    sphGridSearch(null);
    packageGridSearch(null);
    groupGridSearch(null);
  };

  const dataURLtoFile = (dataurl: any, filename: any) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const findVideoCover = () => {
    nextTick(async () => {
      const size = 160;
      if (uploadVideoImgUrl.value) {
        return;
      }
      const video: any = document.getElementById('videoPlay');
      const imgWidth = 368;
      const imgHeight = 656;
      const { videoWidth, videoHeight } = video; // 获取video的宽高
      let x = 0;
      let y = 0;
      let width = 0;
      let height = 0;
      // 计算缩小后图片的宽高以及canvas绘制的位置信息
      if (videoWidth / videoHeight >= 1.5) {
        width = imgWidth;
        height = videoHeight * (imgWidth / videoWidth);
        x = 0;
        y = (imgHeight - height) / 2;
      } else {
        height = imgHeight;
        width = videoWidth * (imgHeight / videoHeight);
        y = 0;
        x = (imgWidth - width) / 2;
      }
      const canvas: any = document.createElement('canvas');
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, imgWidth, imgHeight);
      ctx.drawImage(video, x, y, width, height);
      const videoImg = canvas.toDataURL('image/jpeg');

      const fileName = `finder_video_img.jpeg`;
      const imgFile = dataURLtoFile(videoImg, fileName);

      const param = new FormData();
      param.append('file', imgFile);
      param.append('uin', uin.value);
      param.append('authKey', authKey.value);
      // const { data } = await sphUpload(param);
      // axios
      console.log(imgFile);
      const data = await tcUpload({ file: imgFile });
      uploadVideoImgUrl.value = data.url.replace(
        'http://wxapp.tc.qq.com/251/',
        'https://finder.video.qq.com/251/'
      );

      console.log(uploadVideoImgUrl.value);
    });
  };

  const postClipVideoResult = async () => {
    if (!reqModel.value.engineInfo.sphId) {
      return;
    }
    const { data } = await postVideoResult({
      sphId: reqModel.value.engineInfo.sphId,
      uin: uin.value,
      clipKey: videoClipKey.value,
      draftId: videoDraftId.value,
    });
    if (data.data && data.data.flag === 1) {
      uploadVideoUrl.value = data.data.url;
      vReqModel.value.objectDesc.media[0].url = data.data.url;
      vReqModel.value.objectDesc.media[0].fileSize = data.data.fileSize;
      vReqModel.value.objectDesc.media[0].videoPlayLen = data.data.duration;
      vReqModel.value.objectDesc.media[0].md5sum = guid2();
      vReqModel.value.objectDesc.media[0].thumbUrl = uploadVideoImgUrl.value;
      vReqModel.value.objectDesc.media[0].fullThumbUrl =
        uploadVideoImgUrl.value;
      videoProcessloading.value = false;
      reqModel.value.engineInfo.videoUrl = data.data.url;
    } else if (data.data && data.data.flag === 2) {
      setTimeout(() => {
        postClipVideoResult();
      }, 4500);
    }
  };

  const postClipVideo = async () => {
    if (!reqModel.value.engineInfo.sphId) {
      return;
    }

    videoProcessloading.value = true;

    traceInfo.value.uploadCdnEnd = dayjs().unix();
    const video: any = document.getElementById('videoPlay');

    const { videoWidth, videoHeight } = video; // 获取video的宽高

    const { data } = await postVideo({
      sphId: reqModel.value.engineInfo.sphId,
      width: videoWidth,
      height: videoHeight,
      uin: uin.value,
      url: uploadVideoUrl.value,
      duration: uploadVideoDuration.value,
      fileSize: uploadVideoFileSize.value,
      traceKey: traceInfo.value.traceKey,
      uploadCdnStart: traceInfo.value.uploadCdnStart,
      uploadCdnEnd: traceInfo.value.uploadCdnEnd,
    });
    videoClipKey.value = data.data.clipKey;
    videoDraftId.value = data.data.draftId;

    setTimeout(() => {
      postClipVideoResult();
    }, 4500);
  };

  nextTick(() => {
    const video: any = document.getElementById('videoPlay');
    video.addEventListener('loadeddata', () => {
      uploadVideoDuration.value = video.duration;

      if (!postClipVideoVisable.value) {
        postClipVideoVisable.value = true;
        postClipVideo();
        setTimeout(() => {
          findVideoCover();
        }, 1500);
      }
    });
  });

  const beforeUpload = (file: any) => {
    return new Promise((resolve, reject) => {
      if (!reqModel.value.engineInfo.sphId) {
        Message.warning({
          content: '请先选择被投号',
          duration: 3 * 1000,
        });
        // eslint-disable-next-line no-promise-executor-return
        return reject(new Error('请先选择被投号'));
      }

      // eslint-disable-next-line no-promise-executor-return
      return resolve(true);
    });
  };
  const sphVideoUpload = async (option: any) => {
    if (!reqModel.value.engineInfo.sphId) {
      Message.warning({
        content: '请先选择被投号',
        duration: 3 * 1000,
      });
      return;
    }
    const { fileItem } = option;

    const param = new FormData();
    param.append('file', fileItem.file);
    param.append('uin', uin.value);
    param.append('authKey', authKey.value);

    videoUploadLoadding.value = true;
    // const reader = new FileReader();
    // reader.readAsArrayBuffer(fileItem.file);

    // reader.onload = async () => {
    const data = await tcUpload(fileItem);
    //   console.log(putRes);
    // const data = await sphUpload(param);
    uploadVideoUrl.value = data.url.replace(
      'http://wxapp.tc.qq.com',
      'https://finder.video.qq.com'
    );
    uploadVideoFileSize.value = fileItem.file.size;
    uploadVideoFileName.value = fileItem.file.name;

    videoUploadLoadding.value = false;
    // };
  };

  const tcUpload = async (fileItem: any) => {
    const fileUuid = guid2();
    const filename = encodeURI(fileItem.file.name);
    let xArguments = `apptype=251&filetype=20302&weixinnum=${uin.value}&filekey=${filename}&filesize=${fileItem.file.size}&taskid=${fileUuid}&scene=0`;
    if (fileItem.file.name.indexOf('jpeg') > 0) {
      xArguments = `apptype=251&filetype=20304&weixinnum=${uin.value}&filekey=${filename}&filesize=${fileItem.file.size}&taskid=${fileUuid}&scene=0`;
    }
    const appheaders = {
      'authority': 'finder-assistant.mp.video.tencent-cloud.com',
      'authorization': authKey.value,
      'x-arguments': xArguments,
    };

    const PART_SIZE = 8 * 1024 * 1024;
    const blockPartlength = [];
    const blockFile: any = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i * PART_SIZE < fileItem.file.size; i++) {
      if (i > 0) {
        blockPartlength.push(i * PART_SIZE);
      }
      blockFile.push(
        fileItem.file.slice(
          i * PART_SIZE,
          Math.min((i + 1) * PART_SIZE, fileItem.file.size)
        )
      );
    }
    blockPartlength.push(fileItem.file.size);

    const applyRes = await applyuploaddfs(
      {
        BlockSum: blockPartlength.length,
        BlockPartLength: blockPartlength,
      },
      appheaders
    );

    const upheaders = {
      'authority': 'finder-assistant.mp.video.tencent-cloud.com',
      'authorization': authKey.value,
      'x-arguments': xArguments,
      'content-type': 'application/octet-stream',
    };

    const partInfo: any = [];

    const uploadPromises: any = [];
    let promises = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < blockFile.length; i++) {
      if (blockPartlength.length < 200) {
        const uploadUrl = `https://finder-assistant.mp.video.tencent-cloud.com/uploadpartdfs?PartNumber=${
          i + 1
        }&UploadID=${applyRes.UploadID}`;
        // eslint-disable-next-line no-await-in-loop
        const uploadRes = await uploadPartdfs(
          uploadUrl,
          blockFile[i],
          upheaders
        );
        partInfo.push({
          PartNumber: i + 1,
          ETag: uploadRes.ETag,
        });

        if (fileItem.file.name.indexOf('jpeg') < 0) {
          videoUploadPercent.value = (i + 1) / blockPartlength.length;
        }
      } else {
        promises += 1;
        // eslint-disable-next-line no-async-promise-executor
        const promise = new Promise(async (resolve, reject) => {
          const uploadUrl = `https://finder-assistant.mp.video.tencent-cloud.com/uploadpartdfs?PartNumber=${
            i + 1
          }&UploadID=${applyRes.UploadID}`;
          // eslint-disable-next-line no-await-in-loop
          const uploadRes = await uploadPartdfs(
            uploadUrl,
            blockFile[i],
            upheaders
          );
          resolve({
            PartNumber: i + 1,
            ETag: uploadRes.ETag,
          });
        });
        uploadPromises.push(promise);
        if (promises >= 4) {
          promises = 0;
          // eslint-disable-next-line no-await-in-loop
          await Promise.all(uploadPromises).then((res) => {
            res.forEach((el) => {
              partInfo.push(el);
            });
          });
        }
      }
    }
    // if (uploadPromises.length > 0) {
    //   await Promise.all(uploadPromises).then((res) => {
    //     res.forEach((el) => {
    //       partInfo.push(el);
    //     });
    //   });
    // }

    const comUrl = `https://finder-assistant.mp.video.tencent-cloud.com/completepartuploaddfs?UploadID=${applyRes.UploadID}`;

    const comRes = await completepartuploaddfs(
      comUrl,
      {
        TransFlag: '0_0',
        PartInfo: partInfo,
      },
      appheaders
    );

    console.log(applyRes, comRes);

    return { url: comRes.DownloadURL };
  };

  const productCheck = (record: any, ev: any) => {
    selectedProductKeys.value = [];
    selectedProductKeys.value.push(record.key);
    checkProductName.value = record.title;
    vReqModel.value.objectDesc.component.id = record.productId;
    reqModel.value.engineInfo.videoInfo.shoppingcartJumpinfo.productId =
      record.productId;
    reqModel.value.engineInfo.videoInfo.shoppingcartJumpinfo.wording =
      record.title;
    // console.log(123123, record, ev, selectedProductKeys.value);
  };

  const objToXml = (obj: any) => {
    let xml = '';
    Object.keys(obj).forEach((k) => {
      if (obj[k].constructor === String || obj[k].constructor === Number) {
        if (k.indexOf('value') > -1 && k !== 'valuecount') {
          xml += `<${k}>${`<![CDATA[${obj[k]}]]>`}</${k}>`;
        } else {
          xml += `<${k}>${obj[k]}</${k}>`;
        }
      } else xml += `<${k}>${objToXml(obj[k])}</${k}>`;
    });
    return xml;
  };

  const createVideoTask = async () => {
    const res = await formVideoRef.value?.validate();
    if (res) {
      return;
    }
    if (!vReqModel.value.objectDesc.media[0].url) {
      Message.warning({
        content: '请先上传视频或等待视频视频处理完成',
        duration: 3 * 1000,
      });
      return;
    }

    if (!vReqModel.value.objectDesc.component.id) {
      Message.warning({
        content: '请选择对应商品',
        duration: 3 * 1000,
      });
      return;
    }

    if (!vReqModel.value.objectDesc.description) {
      Message.warning({
        content: '请填写动态描述',
        duration: 3 * 1000,
      });
      return;
    }

    if (videoProcessloading.value) {
      Message.warning({
        content: '请等待视频处理完成',
        duration: 3 * 1000,
      });
      return;
    }

    createVideoLoadding.value = true;
    vReqModel.value.topics = [];
    const str = vReqModel.value.objectDesc.description;
    const regex = /#([^\s#]+)|(\s+)/g;
    const finderTopicInfo: any = {
      finder: {
        version: '1',
        valuecount: '',
        style: {
          at: '',
        },
      },
    };
    let valueKey = 0;
    let match = regex.exec(str);
    const finderTopicTagArr = [];
    const finderTopicNoTagArr = [];
    while (match !== null) {
      if (match[1]) {
        vReqModel.value.topics.push(match[1]);
        finderTopicTagArr.push(match[1]);
        finderTopicInfo.finder[`value${valueKey}`] = {
          topic: `#${match[1]}#`,
        };
      } else {
        finderTopicNoTagArr.push(match[2]);

        // eslint-disable-next-line prefer-destructuring
        finderTopicInfo.finder[`value${valueKey}`] = match[2];
      }
      valueKey += 1;
      match = regex.exec(str);
    }
    vReqModel.value.objectDesc.topic.finderTopicInfo = '';
    finderTopicInfo.finder.valuecount = valueKey;
    vReqModel.value.objectDesc.topic.finderTopicInfo =
      JSON.stringify(finderTopicInfo);
    vReqModel.value.videoClipTaskId = videoClipKey.value;
    vReqModel.value.traceInfo = traceInfo.value;
    vReqModel.value.report.draftId = videoDraftId.value;
    vReqModel.value.report.clipKey = videoClipKey.value;
    vReqModel.value.report.duration = uploadVideoDuration.value;
    vReqModel.value.report.fileSize = uploadVideoFileSize.value;

    const encode = encodeURI(objToXml(finderTopicInfo));

    // 对编码的字符串转化base64
    const base64 = btoa(encode);

    if (vReqTitleModel.value.shortTitle[0].shortTitle !== '') {
      vReqModel.value.objectDesc.shortTitle = vReqTitleModel.value.shortTitle;
    }

    const { data } = await createVideo({
      sphId: reqModel.value.engineInfo.sphId,
      uin: uin.value,
      reqJson: JSON.stringify(vReqModel.value),
      finderTopicInfo: base64,
      finderTopicTagArr,
      finderTopicNoTagArr,
    });

    if (!data.data.exportId) {
      Message.error({
        content: '创建失败，请稍后再试或联系系统管理员',
        duration: 3 * 1000,
      });
      return;
    }

    createVideoLoadding.value = false;

    reqModel.value.engineInfo.videoInfo.coverUrl = uploadVideoImgUrl.value;
    reqModel.value.engineInfo.videoInfo.exportId = data.data.exportId;
    reqModel.value.exportId = data.data.exportId;
    searchVideoGoodsVisible.value = true;
    reqModel.value.feedPromotionOrderInfo.promotionTarget = 8;
    step.value += 1;

    // console.log(objToXml(finderTopicInfo));
  };

  const getAllProductData = async () => {
    proComeDataLoding.value = true;
    const data = await getAllProduct({
      sphId: reqModel.value.engineInfo.sphId,
      uin: uin.value,
    });
    proComeDataLoding.value = false;
    data.data.data.products.forEach((el: any, k: any) => {
      el.key = k + 1;
    });
    proComeData.value = data.data.data.products;
  };

  const handleClickChoosePro = () => {
    if (!reqModel.value.engineInfo.sphId) {
      Message.warning({
        content: '请先选择被投号',
        duration: 3 * 1000,
      });
      return;
    }
    getAllProductData();
    chooseProductVisible.value = true;
  };

  const moliCors = ref(0);
  const moliCorsVisible = ref(false);

  const getmoliCors = () => {
    const element: any = document.getElementById('moliCors');
    if (element.value !== undefined) {
      moliCors.value = Number(element.value);
      if (moliCors.value === 0) {
        moliCorsVisible.value = true;
      } else {
        moliCorsVisible.value = false;
        return;
      }
    }
    setTimeout(getmoliCors, 200);
  };

  onMounted(() => {
    setTimeout(getmoliCors, 200);
  });

  const jumpTuDown = () => {
    window.open('https://docs.qq.com/doc/DTnNxWlBYaHBNTExu');
  };

  initData();
</script>

<style lang="less" scoped>
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

  /deep/ .ant-select-selector {
    // background-color: #f2f3f5 !important;
    border: none !important;
    background: #f2f5ff !important;
    border-radius: 4px;
    height: 40px;
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

  .pageTitle {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #2d2d2d;
    line-height: 28px;
    margin-bottom: 28px;
  }

  :deep.arco-input-wrapper {
    background: #f2f5ff;
    border-radius: 4px;
    height: 40px;
  }

  /deep/ .arco-select-view-multiple {
    background: #f2f5ff;
    border-radius: 4px;
    height: 40px;
  }

  /deep/ .arco-select-view-inner {
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }

  :deep .arco-picker {
    height: 40px;
    background: #f2f5ff;
    border-radius: 4px;
  }

  :deep.arco-input-number {
    height: 40px;
  }

  // .arco-row-align-start {
  //   align-items: center;
  // }
  .labelText {
    // width: 80px;
    // height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3f3f3f;
    white-space: nowrap;
    line-height: 22px;
  }

  :deep .arco-select-view-single {
    background: #f2f5ff;
    border-radius: 4px;
    height: 40px;
  }

  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;

    :deep(.arco-pagination-total) {
      display: none;
    }
  }

  .arco-textarea-wrapper {
    background: #f2f5ff;
    // border: 1px solid #e3e4e5;
  }

  .leftUpload {
    height: auto;

    :deep(.arco-upload-drag) {
      height: 500px;
      border: 1px dashed #e3e4e5;
      background: none;
      padding-top: 200px;
    }
  }
  .leftUpload {
    :deep(.arco-spin-mask) {
      background: rgba(0, 0, 0, 0.9) !important;
    }
  }
  .container {
    position: relative;
  }
  .mark {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
</style>
