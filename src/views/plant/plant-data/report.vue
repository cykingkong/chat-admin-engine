<!-- eslint-disable no-plusplus -->
<template>
  <div class="container">
    <TimeDiglog ref="timeDiglog" />

    <div class="">
      <Breadcrumb :items="['投流管理', '投放数据']" />
      <!-- <div class="pageTitle"> 计划投放数据 </div> -->
      <a-row>
        <a-col :flex="1">
          <div class="goodStatusBox">
            <div
              v-for="(item, k) in plantTabList"
              :key="k"
              class="btn"
              :class="{ active: plantTabActive === k }"
              @click="changePlantTab(k)"
              >{{ item.name }}</div
            >
          </div>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col v-if="plantTabActive !== 0" :span="4">
          <a-card class="general-card-upai2" style="width: 100%">
            <a-list
              :hoverable="true"
              :scrollbar="true"
              :bordered="false"
              style="min-height: 700px"
              :max-height="700"
              @reach-bottom="getTargetTypeData"
            >
              <template #scroll-loading>
                <div v-if="targetTypeBottom">暂无更多数据</div>
                <a-spin v-else />
              </template>
              <a-list-item
                v-for="(item, key) of targetTypeData"
                :key="key"
                :class="{ 'plantTab-select': plantTabCheckIndex === key }"
                @click="plantTabCheck(item, key)"
              >
                <a-space style="margin-bottom: 10px">
                  <a-typography-paragraph
                    v-if="plantTabList[plantTabActive].id === 2"
                    copyable
                    style="margin-bottom: 0"
                  >
                    {{ item.groupName }}
                  </a-typography-paragraph>

                  <a-typography-paragraph
                    v-if="plantTabList[plantTabActive].id === 3"
                    style="margin-bottom: 0"
                    :ellipsis="{
                      rows: 1,
                      expandable: true,
                    }"
                  >
                    {{ item.goodsName }}
                  </a-typography-paragraph>
                  <a-typography-paragraph
                    v-if="plantTabList[plantTabActive].id === 7"
                    style="margin-bottom: 0"
                    :ellipsis="{
                      rows: 2,
                      expandable: false,
                    }"
                  >
                    {{ item.srName }}
                  </a-typography-paragraph>

                  <a-space
                    v-if="
                      plantTabList[plantTabActive].id === 5 ||
                      plantTabList[plantTabActive].id === 6
                    "
                    direction="vertical"
                    fill
                  >
                    <div
                      class="proCode"
                      style="display: flex; align-items: center"
                    >
                      <a-avatar
                        style="margin-right: 2px"
                        :size="40"
                        :image-url="item.sphAvatar"
                      ></a-avatar>
                      <a-space direction="vertical" fill>
                        <a-typography-paragraph style="margin-bottom: 0">
                          {{ item.sphName }}
                        </a-typography-paragraph>
                        <a-typography-paragraph style="margin-bottom: 0">
                          备注：{{ item.sphRemark }}
                        </a-typography-paragraph>
                      </a-space>
                    </div>
                  </a-space>

                  <a-image
                    v-if="plantTabList[plantTabActive].id === 4"
                    :src="item.coverUrl"
                    width="60px"
                    height="80px"
                  />
                  <a-space
                    v-if="plantTabList[plantTabActive].id === 4"
                    direction="vertical"
                    fill
                  >
                    <a-typography-paragraph
                      :ellipsis="{
                        rows: 1,
                        expandable: false,
                      }"
                    >
                      {{ item.signature }}
                    </a-typography-paragraph>
                    <a-typography-paragraph>
                      {{ item.createdAt }}
                    </a-typography-paragraph>

                    <div
                      class="proCode"
                      style="display: flex; align-items: center"
                    >
                      <a-avatar
                        style="margin-right: 2px"
                        :size="24"
                        :image-url="item.videoAvatar"
                      ></a-avatar>
                      <a-typography-paragraph copyable style="margin-bottom: 0">
                        {{ item.videoNickName }}
                      </a-typography-paragraph></div
                    >
                  </a-space>
                </a-space>
                <a-descriptions
                  v-if="plantTabList[plantTabActive].id !== 7"
                  size="mini"
                  :column="2"
                  layout="inline-vertical"
                  align="left"
                >
                  <a-descriptions-item label="消耗">
                    <a-statistic :value="item.cost || 0" :precision="2" />
                  </a-descriptions-item>
                  <a-descriptions-item label="成交金额">
                    <a-statistic
                      :value="item.productPlaceorderGmv || 0"
                      :precision="2"
                    />
                  </a-descriptions-item>
                  <a-descriptions-item label="成交ROI">
                    <a-statistic
                      :value="
                        item.productPlaceorderGmv > 0
                          ? item.productPlaceorderGmv / item.cost
                          : 0
                      "
                      :precision="2"
                    />
                  </a-descriptions-item>
                  <a-descriptions-item label="利润">
                    <a-statistic
                      :value="
                        item.productPlaceorderGmv > 0
                          ? item.productPlaceorderGmv - item.cost
                          : 0
                      "
                      :precision="2"
                    />
                  </a-descriptions-item>
                </a-descriptions>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col :span="plantTabActive == 0 ? 24 : 20">
          <a-card class="general-card-upai" style="width: 100%">
            <a-row>
              <a-col :flex="1">
                <a-form :model="reqModel" auto-label-width label-align="left">
                  <a-row :gutter="16">
                    <a-col :span="8">
                      <a-form-item field="plantName">
                        <template #label>
                          <div class="labelText">名称搜索：</div>
                        </template>
                        <a-input
                          v-model="reqModel.plantName"
                          placeholder="请输入计划名称"
                          allow-clear
                          @press-enter="search"
                        />
                      </a-form-item>
                    </a-col>

                    <a-col v-if="plantTabActive === 0" :span="8">
                      <a-form-item field="sphId">
                        <template #label>
                          <div class="labelText">投手号搜索：</div>
                        </template>
                        <a-select
                          v-model="reqModel.sphId"
                          placeholder="全部投手号"
                        >
                          <a-option
                            v-for="(item, key) in searchSphGrid"
                            :key="key"
                            :label="item.sphName"
                            :value="item.sphId"
                          />
                        </a-select>
                      </a-form-item>
                    </a-col>

                    <a-col v-if="plantTabActive === 0" :span="8">
                      <a-form-item field="videoId">
                        <template #label>
                          <div class="labelText">作者搜索：</div>
                        </template>
                        <a-select
                          v-model="reqModel.videoId"
                          placeholder="全部投手号"
                        >
                          <a-option
                            v-for="(item, key) in searchVideoGrid"
                            :key="key"
                            :label="item.videoNickName"
                            :value="item.videoId"
                          />
                        </a-select>
                      </a-form-item>
                    </a-col>

                    <a-col v-if="plantTabActive === 0" :span="8">
                      <a-form-item field="goodsId">
                        <template #label>
                          <div class="labelText">商品搜索：</div>
                        </template>
                        <a-select
                          v-model="reqModel.goodsId"
                          placeholder="全部商品"
                        >
                          <a-option
                            v-for="(item, key) in searchGoodsGrid"
                            :key="key"
                            :label="item.goodsName"
                            :value="item.goodsId"
                          />
                        </a-select>
                      </a-form-item>
                    </a-col>

                    <a-col :span="8">
                      <a-form-item field="createdTime">
                        <template #label>
                          <div class="labelText">创建时间：</div>
                        </template>
                        <a-range-picker
                          show-time
                          :default-value="[
                            dayjs()
                              .startOf('date')
                              .format('YYYY-MM-DD HH:mm:ss'),
                            dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
                          ]"
                          style="width: 100%"
                          :shortcuts="rangeShortcuts"
                          shortcuts-position="left"
                          @change="dateChange"
                        />
                        <!-- <a-range-picker style="width: 100%" @change="dateChange" /> -->
                      </a-form-item>
                    </a-col>
                    <!-- <a-col :span="16"> </a-col> -->

                    <a-col :span="8">
                      <a-form-item field="number" :hide-label="true">
                        <a-space :size="18">
                          <a-button
                            type="primary"
                            class="searchBtn"
                            @click="search"
                          >
                            筛选
                          </a-button>
                          <a-button
                            type="outline"
                            class="refreshBtn"
                            @click="search()"
                          >
                            刷新
                          </a-button>
                          <a-typography-text type="primary">
                            <a-link href="javascript:void(0)" @click="refresh()"
                              >重置筛选条件</a-link
                            >
                          </a-typography-text>
                        </a-space>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
              </a-col>
            </a-row>
          </a-card>
          <a-row style="margin-bottom: 16px">
            <a-col flex="auto">
              <a-grid
                :cols="6"
                :col-gap="12"
                :row-gap="12"
                class="grid-demo-grid"
                :collapsed="collapsed"
              >
                <a-grid-item v-for="(el, ky) in orderInfoSumData" :key="ky">
                  <div class="numBox2">
                    <div class="titleBox">
                      <img :src="el.url" class="y" alt="" />
                      {{ el.t }}
                    </div>
                    <div class="n">
                      <span v-if="el.type === 2 && el.n != '-'" class="rmb"
                        >¥</span
                      ><span>{{ el.type === 2 ? fun(el.n) : el.n }}</span>
                    </div>
                  </div></a-grid-item
                >
              </a-grid>
            </a-col>
            <a-col flex="110px">
              <a-button
                type="primary"
                class="searchBtn"
                style="float: right"
                @click="showMore"
              >
                {{ collapsed ? '展开' : '收起' }}
              </a-button>
            </a-col>
          </a-row>

          <a-card
            class="general-card-upai"
            style="width: 100%; padding-bottom: 28px"
          >
            <a-space :size="18" style="margin-bottom: 10px">
              <a-button
                type="primary"
                status="success"
                class="searchBtn"
                @click="exportExcel()"
              >
                <template #icon> <icon-unordered-list /></template>
                导出
              </a-button>
            </a-space>

            <t-table
              row-key="plantId"
              :data="renderData"
              :columns="plantColumns"
              :loading="loading"
              :column-controller="{
                placement: 'top-right',
                dialogProps: { preventScrollThrough: true },
                buttonProps: {
                  content: '显示列控制',
                  theme: 'primary',
                  variant: 'base',
                },
              }"
              :pagination="pagination"
              :bordered="true"
              table-layout="fixed"
              :default-display-columns="disPlayColumns"
              :on-display-columns-change="disPlayColumnsChange"
              @select-change="selectionChange"
              @sort-change="sorterChange"
              @page-change="onPageChange"
            >
              <template #plantNameId="{ row }">
                <a-space direction="vertical" fill>
                  <a-space>
                    <a-typography-paragraph
                      style="margin-bottom: 10px"
                      :ellipsis="{
                        rows: 1,
                      }"
                    >
                      {{ row.plantName || '-' }}
                    </a-typography-paragraph>
                    <span style="margin-left: 2px">
                      <a-tooltip content="分时报表">
                        <a-link
                          href="javascript:void(0)"
                          @click="timereport(row)"
                          ><icon-book
                        /></a-link> </a-tooltip
                    ></span>
                  </a-space>

                  <div
                    class="proCode"
                    style="display: flex; align-items: center"
                  >
                    ID:
                    <a-typography-paragraph copyable style="margin-bottom: 0">
                      {{ row.plantCode || '-' }}
                    </a-typography-paragraph></div
                  >
                </a-space>
              </template>
              <template #plantVideo="{ row }">
                <a-space>
                  <a-image
                    :src="
                      row.videoInfo.coverUrl ||
                      'http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png'
                    "
                    width="80px"
                    height="100px"
                    style="width: 80px; height: 100px"
                  />
                  <a-space direction="vertical" fill>
                    <a-typography-paragraph
                      :ellipsis="{
                        rows: 1,
                        expandable: true,
                      }"
                    >
                      {{ row.goodsInfo.goodsName || row.videoInfo.signature }}
                    </a-typography-paragraph>

                    <div
                      class="proCode"
                      style="display: flex; align-items: center"
                    >
                      <a-avatar
                        style="margin-right: 2px"
                        :size="24"
                        :image-url="row.videoInfo.videoAvatar"
                      ></a-avatar>
                      <a-typography-paragraph copyable style="margin-bottom: 0">
                        {{ row.videoInfo.videoNickName || '-' }}
                      </a-typography-paragraph></div
                    >
                  </a-space>
                </a-space>
              </template>

              <template #process="{ row }">
                <a-progress
                  :percent="Number(fun(row.cost / row.estimatedWecoinAmount))"
                  :style="{ width: '50%' }"
                />
              </template>

              <template #createdCancelTime="{ row }">
                <a-space direction="vertical">
                  <span>创建：{{ row.createdAt }}</span>
                  <span>更新：{{ row.updatedAt }}</span>
                </a-space>
              </template>
            </t-table>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <a-modal
      v-model:visible="showQrcodeVisible"
      width="auto"
      :footer="false"
      :simple="true"
      hide-cancel
      @before-close="orderPayCancel"
    >
      <template #title> 支付订单</template>
      <a-card class="general-card">
        <a-space
          :size="16"
          direction="vertical"
          fill
          style="text-align: center"
        >
          <QrcodeVue
            :value="qrcodePayValue"
            :size="200"
            level="H"
            style="position: relative"
          />

          <a-tag color="green">请用微信APP扫描二维码</a-tag>
        </a-space>
      </a-card>
    </a-modal>

    <a-drawer
      :width="920"
      :visible="orderInfoVisible"
      mask-closable
      :footer="false"
      :header="false"
      @cancel="orderInfoVisible = false"
    >
      <template #title> </template>
      <a-spin :loading="orderInfoLoading">
        <div v-if="orderInfo">
          <a-descriptions style="margin-top: 10px; padding-left: 10px">
            <template #title>
              <span> 计划名称: {{ orderInfo.plantName }}</span>
            </template>
            <a-descriptions-item label="ID">{{
              orderInfo.plantCode
            }}</a-descriptions-item>
            <a-descriptions-item label="投放金额"
              >¥{{ orderInfo.estimatedWecoinAmount }}</a-descriptions-item
            >

            <a-descriptions-item label="数据更新时间">{{
              orderInfo.updatedAt
            }}</a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin: 0" />

          <a-tabs default-active-key="1" style="margin-top: 10px" size="large">
            <a-tab-pane key="1" title="计划详情" style="padding-left: 10px">
              <a-space>
                <a-image
                  :src="
                    orderInfo.videoInfo.coverUrl ||
                    'http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png'
                  "
                  width="80px"
                  height="100px"
                  style="width: 80px; height: 100px"
                />
                <a-space direction="vertical" fill>
                  <a-typography-paragraph>
                    {{ orderInfo.videoInfo.signature }}
                  </a-typography-paragraph>

                  <div
                    class="proCode"
                    style="display: flex; align-items: center"
                  >
                    <a-avatar
                      style="margin-right: 2px"
                      :size="24"
                      :image-url="
                        orderInfo.videoInfo.videoAvatar ||
                        'http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png'
                      "
                    ></a-avatar>
                    <a-typography-paragraph copyable style="margin-bottom: 0">
                      {{ orderInfo.videoInfo.videoNickName }}
                    </a-typography-paragraph></div
                  >

                  <a-typography-paragraph>
                    {{ orderInfo.goodsInfo.goodsName }}
                  </a-typography-paragraph>
                </a-space>

                <a-space>
                  <a-progress
                    type="circle"
                    :percent="
                      Number(
                        fun(orderInfo.cost / orderInfo.estimatedWecoinAmount)
                      )
                    "
                  />
                  <a-tag status="success">{{
                    plantStatus[orderInfo.plantStatus]
                  }}</a-tag>
                </a-space>
              </a-space>

              <a-row :gutter="[55, 0]">
                <a-col :flex="1">
                  <div class="upai_content">
                    <div class="title"> 加热数据 </div>

                    <a-row :gutter="[10, 10]">
                      <a-col
                        v-for="(el, ky) in orderInfoHotData"
                        :key="ky"
                        :span="5"
                      >
                        <div class="numBox">
                          <div class="titleBox">
                            <img :src="el.url" class="y" alt="" />
                            {{ el.t }}
                          </div>
                          <div class="n">
                            <span
                              v-if="el.type === 2 && el.n != '-'"
                              class="rmb"
                              >¥</span
                            ><span>{{ el.type === 2 ? fun(el.n) : el.n }}</span>
                          </div>
                        </div>
                      </a-col>
                    </a-row>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="[55, 0]">
                <a-col :flex="1">
                  <div class="upai_content">
                    <div class="title"> 加热信息 </div>

                    <a-descriptions
                      style="margin-top: 10px; padding-left: 10px"
                      :column="2"
                      :data="orderInfoHotMsg"
                    >
                      <template #title> </template>
                      <a-descriptions-item
                        v-for="(item, key) in orderInfoHotMsg"
                        :key="key"
                        :label="item.label"
                      >
                        <a-typography-paragraph
                          style="max-width: 250px"
                          :ellipsis="{
                            rows: 1,
                            expandable: item.expandable,
                          }"
                        >
                          {{ item.value }}
                        </a-typography-paragraph>
                      </a-descriptions-item>
                    </a-descriptions>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="[55, 0]">
                <a-col :flex="1">
                  <div class="upai_content">
                    <div class="title"> 支付信息 </div>

                    <a-descriptions
                      style="margin-top: 10px; padding-left: 10px"
                      :column="2"
                      :data="orderInfoPayData"
                    >
                      <template #title> </template>
                      <a-descriptions-item
                        v-for="(item, key) in orderInfoPayData"
                        :key="key"
                        :label="item.label"
                      >
                        <a-typography-paragraph
                          style="max-width: 250px"
                          :ellipsis="{
                            rows: 1,
                            expandable: item.expandable,
                          }"
                        >
                          {{ item.value }}
                        </a-typography-paragraph>
                      </a-descriptions-item>
                    </a-descriptions>
                  </div>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" title="计划日志" style="padding-left: 10px">
              <a-table
                :pagination="true"
                :hoverable="true"
                :stripe="false"
                :loading="orderLogLoading"
                :data="orderLogData"
                :bordered="false"
              >
                <template #columns>
                  <a-table-column title="操作时间" align="center">
                    <template #cell="{ record }">
                      {{ record.createdAt }}
                    </template>
                  </a-table-column>
                  <a-table-column title="行为" align="center">
                    <template #cell="{ record }">
                      {{ record.plantLog }}
                    </template>
                  </a-table-column>
                  <a-table-column title="操作人" align="center"
                    ><template #cell="{ record }">
                      {{ record.createUser == 0 ? '系统' : '管理员' }}
                    </template></a-table-column
                  >
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import {
    videoGrid,
    goodsGrid,
    reportData,
    plantGroupGrid,
    plantEdit,
    plantInfo,
    reportSumData,
    asyncData,
    plantLogGrid,
  } from '@/api/plant';
  import {
    taskStatus,
    enumToObject,
    targetType,
    plantStatus,
    ruleFlagType,
    ruleType,
    shutdownStatus,
  } from '@/utils/enum';
  import {
    shutdownRuleGrid,
    shutdownRuleAdd,
    shutdownRuleEdit,
  } from '@/api/rule';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import QrcodeVue from 'qrcode.vue';
  import _ from 'lodash';

  import { sphGrid, getOrderDetail, cancelPromotion } from '@/api/sph';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { province, city } from '@/utils/address';
  import { EXlsx } from '@/utils/xlsx';
  import TimeDiglog from './components/time-report.vue';

  const generateFormGpModel = () => {
    return {
      name: null,
      type: 1,
      firstType: 1,
      firstVal: 0,
      secondType: 1,
      secondVal: 0,
      flagType: 1,
    };
  };
  const formGpModel = ref(generateFormGpModel());
  const formGpRef = ref<FormInstance>();

  const rangeShortcuts = [
    {
      label: '当日',
      value: () => [
        dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '昨日',
      value: () => [
        dayjs().add(-1, 'day').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '近一周',
      value: () => [
        dayjs().add(-1, 'week').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '近一月',
      value: () => [
        dayjs().add(-1, 'month').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().add(-1, 'day').endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
    {
      label: '本月',
      value: () => [
        dayjs().startOf('month').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      ],
    },
  ];
  const scroll = {
    x: 4000,
    y: 500,
  };
  const collapsed = ref(true);
  const showMore = () => {
    collapsed.value = !collapsed.value;
  };
  const bgcolor = '#F7F9FF';
  const insertTag = ref<any>(
    '[{"搞笑":"1083"},{"亲子":"1084"},{"二次元":"1085"},{"明星名人":"1086"},{"旅行风景":"1087"},{"舞蹈":"1088"},{"音乐":"1089"},{"运动":"1090"},{"影视综艺":"1091"},{"时尚":"1092"},{"美食":"1093"},{"萌宠":"1094"},{"动物":"1095"},{"游戏":"1096"},{"科技":"1097"},{"工业/机械/施工":"1098"},{"车":"1099"},{"生活":"1100"},{"新闻资讯":"1101"},{"知识":"1102"},{"悬疑/侦探剧场":"1103"},{"情感":"1104"},{"才艺":"1105"},{"生活技巧":"1106"}]'
  );
  insertTag.value = JSON.parse(insertTag.value);
  const insertTagMap = new Map();
  insertTag.value.forEach((el: any, key: any) => {
    insertTagMap.set(el[Object.keys(el)], Object.keys(el)[0]);
  });

  const { loading, setLoading } = useLoading(true);

  // page
  const basePagination: any = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
    defaultPageSize: 10,
    total: 0,
    defaultCurrent: 1,
    page: 1,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const generateFormReqModel = () => {
    return {
      startDate: dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      pageIndex: 1,
      pageSize: 10,
      taskStatus: -1,
    };
  };

  const plantColumns = ref([
    { colKey: 'row-select', type: 'multiple', width: 46, fixed: 'left' },
    {
      colKey: 'plantNameId',
      title: '计划名称/Id',
      width: '250',
      fixed: 'left',
      align: 'left',
    },
    {
      colKey: 'plantVideo',
      title: '被投视频',
      width: '350',
      fixed: 'left',
      align: 'left',
    },
    {
      colKey: 'sphInfo.sphName',
      title: '投放号',
      width: '150',
      align: 'center',
    },
    {
      colKey: 'estimatedWecoinAmount',
      title: '投放金额',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'process',
      title: '消耗比例',
      width: '170',
      align: 'center',
    },
    {
      colKey: 'cost',
      title: '消耗金额',
      width: '120',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productOrderCount',
      title: '订单数',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productPlaceorderGmv',
      title: '营业额',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'lr',
      title: '利润',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'roi',
      title: 'ROI',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'yl_roi',
      title: '佣金ROI',
      width: '125',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'yjl',
      title: '佣金率',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'airCost',
      title: '空炮余额',
      width: '120',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'productClickCountPv',
      title: '商品点击',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'exposureCount',
      title: '浏览',
      width: '100',
      align: 'center',
      sortType: 'all',
      sorter: true,
    },
    {
      colKey: 'targetType',
      title: '投放目标',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'wecoinBid',
      title: '出价',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'duration',
      title: '投放时长',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'click_rate',
      title: '点击率',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'qan_cost',
      title: '千展成本',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'click_cost',
      title: '点击成本',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'zh_cost',
      title: '转化成本',
      width: '100',
      align: 'center',
    },
    {
      colKey: 'createdCancelTime',
      title: '创建/更新时间',
      width: '240',
    },
  ]);

  const formGpVisible = ref(false);
  const formGpTitle = ref('新建计划包');
  const formGpTypeUnit = ref(['', '元', '元', '元', '小时', '', '', '小时']);

  const reqModel = ref(generateFormReqModel());
  const renderData = ref([]);
  const actionTypeActive = ref(0);
  const orderInfo = ref<any>();
  const checkPlantArr = ref<any>([]);
  const router = useRouter();

  const { taskId } = router.currentRoute.value.query || 0;
  const { packageId } = router.currentRoute.value.query || 0;
  const { videoId } = router.currentRoute.value.query || 0;
  const timeDiglog = ref<InstanceType<typeof TimeDiglog>>();

  if (Number(taskId) > 0) {
    reqModel.value.taskId = taskId;
  }
  if (Number(packageId) > 0) {
    reqModel.value.packageId = packageId;
  }
  if (Number(videoId) > 0) {
    reqModel.value.videoId = videoId;
  }
  const plantTabActive = ref(0);

  const showQrcodeVisible = ref(false);
  const qrcodePayValue = ref('');
  const plantChanelId = ref(0);
  const plantTabList = ref([
    { id: 1, name: '计划列表' },
    { id: 2, name: '分组计划' },
    { id: 3, name: '商品计划' },
    { id: 4, name: '视频计划' },
    { id: 5, name: '投放号计划' },
    { id: 6, name: '被投号计划' },
    { id: 7, name: '关停策略' },
  ]);

  const ageRangeTag: any = {
    1: '18-24岁',
    2: '25-29岁',
    3: '30-39岁',
    4: '40-49岁',
    5: '50岁以上',
  };
  const orderInfoVisible = ref(false);
  const orderInfoLoading = ref(false);
  const targetTypeBottom = ref(false);
  const targetTypeReq = ref(false);
  const targetTypeData = ref<any>([]);
  const targetTypePageNo = ref(1);

  const plantTabCheckIndex = ref(0);

  const qrcodeStatusTimer = ref<any>();

  const timereport = (row: any) => {
    // console.log(sonRef.value?.msg);
    timeDiglog.value?.showModel(row);
  };

  const getTargetTypeData = async () => {
    if (targetTypeReq.value) {
      return;
    }
    let data: any = [];
    let res: any = {};
    let reqField = '';
    targetTypeReq.value = true;
    switch (plantTabList.value[plantTabActive.value].id) {
      case 4:
        // eslint-disable-next-line no-case-declarations
        res = await videoGrid({
          pageIndex: targetTypePageNo.value,
          pageSize: 5,
        });
        data = res.data.grid;
        reqField = 'videoId';
        break;
      case 2:
        // eslint-disable-next-line no-case-declarations
        res = await plantGroupGrid({
          pageIndex: targetTypePageNo.value,
          pageSize: 5,
        });
        data = res.data.grid;
        reqField = 'groupId';
        break;
      case 3:
        // eslint-disable-next-line no-case-declarations
        res = await goodsGrid({
          pageIndex: targetTypePageNo.value,
          pageSize: 5,
        });
        data = res.data.grid;
        reqField = 'goodsId';
        break;
      case 5:
        // eslint-disable-next-line no-case-declarations
        res = await sphGrid({
          pageIndex: targetTypePageNo.value,
          pageSize: 5,
          sphType: 1,
        });
        data = res.data.grid;
        reqField = 'sphId';
        break;
      case 6:
        // eslint-disable-next-line no-case-declarations
        res = await sphGrid({
          pageIndex: targetTypePageNo.value,
          pageSize: 5,
          sphType: 2,
        });
        data = res.data.grid;
        reqField = 'sphId';
        break;
      case 7:
        // eslint-disable-next-line no-case-declarations
        res = await shutdownRuleGrid({
          pageIndex: targetTypePageNo.value,
          pageSize: 5,
        });
        data = res.data.grid;
        reqField = 'srId';
        break;
      default:
        targetTypeData.value = [];
        targetTypeReq.value = false;
        targetTypeBottom.value = true;
        targetTypePageNo.value = 0;
        return;
    }
    if (data != null) {
      data.forEach((el: any, key: any) => {
        targetTypeData.value.push(el);
        console.log(targetTypePageNo.value, key, el[reqField], reqField);
        if (key === 0 && targetTypePageNo.value === 1) {
          reqModel.value[reqField] = el[reqField];
        }
      });
    } else {
      reqModel.value[reqField] = -1;
    }

    targetTypeReq.value = false;
    targetTypeBottom.value = true;
    targetTypePageNo.value += 1;
  };

  const orderInfoSumData = ref<any>([
    {
      t: '投放金额',
      key: 'estimatedWecoinAmount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '消耗金额',
      key: 'cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '成交金额',
      key: 'productPlaceorderGmv',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '成交订单数',
      key: 'productOrderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '成交ROI',
      key: 'roi',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '佣金ROI',
      key: 'yj_roi',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '空耗值',
      key: 'airCost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '利润',
      key: 'lr',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '千次展示成本',
      key: 'qz_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '关注成本',
      key: 'gz_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '点击成本',
      key: 'click_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '转化成本',
      key: 'zh_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '商品点击率',
      key: 'click_rate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '点击成交率',
      key: 'cj_rate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },

    {
      t: '点击数',
      key: 'productClickCountPv',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '浏览数',
      key: 'exposureCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '点赞数',
      key: 'likeCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '关注数',
      key: 'followCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '评论数',
      key: 'favCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
  ]);

  const orderInfoHotData = ref<any>([
    {
      t: '订单金额',
      key: 'productPlaceorderGmv',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '订单数',
      key: 'productOrderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 1,
    },
    {
      t: '消耗金额',
      key: 'cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '平均客单价',
      key: 'pjKdj',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '无消耗时长',
      key: 'noCostTime',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 0,
    },
    {
      t: '成交ROI',
      key: 'roi',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '佣金ROI',
      key: 'yj_roi',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '点击率',
      key: 'click_rate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '成交率',
      key: 'cj_rate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 3,
    },
    {
      t: '空耗值',
      key: 'airCost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '千次展示成本',
      key: 'qz_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '关注成本',
      key: 'gz_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '点击成本',
      key: 'click_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '转化成本',
      key: 'zh_cost',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '利润',
      key: 'lr',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },

    {
      t: '点击数',
      key: 'productClickCountPv',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '浏览数',
      key: 'exposureCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '点赞数',
      key: 'likeCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '关注数',
      key: 'followCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
    {
      t: '评论数',
      key: 'favCount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 1,
    },
  ]);

  const orderInfoHotMsg = ref<any>([
    {
      label: '加热方式:',
      value: '',
      key: 'promotionType',
      expandable: false,
    },
    {
      label: '性别:',
      value: '',
      key: 'gender',
      expandable: false,
    },
    {
      label: '优先提升:',
      value: '',
      key: 'promotionTarget',
      expandable: false,
    },
    {
      label: '年龄:',
      value: '',
      key: 'ageRange',
      expandable: false,
    },
    {
      label: '成交出价:',
      value: '',
      key: 'wecoinBid',
      expandable: false,
    },
    {
      label: '区域:',
      value: '',
      key: 'cityIds',
      expandable: false,
    },
    {
      label: '加热时长:',
      value: '',
      key: 'duration',
      expandable: false,
    },
    {
      label: '兴趣:',
      value: '',
      key: 'interestTag',
      expandable: false,
    },
  ]);

  const orderInfoPayData = ref<any>([
    {
      label: '已支付微信豆:',
      value: '',
      key: 'estimatedWecoinAmount',
      expandable: false,
    },
    {
      label: '使用优惠:',
      value: '未使用',
      key: '',
      expandable: false,
    },
    {
      label: '已返还微信豆:',
      value: '',
      key: 'estimatedWecoinAmountBack',
      expandable: false,
    },
    {
      label: '补贴进度:',
      value: '无补贴',
      key: '',
      expandable: false,
    },
    {
      label: '实际使用微信豆:',
      value: '',
      key: 'costCoin',
      expandable: false,
    },
  ]);

  const orderLogData = ref<any>([]);

  const orderLogLoading = ref(false);

  const searchSphGrid = ref<any>([]);
  const searchGoodsGrid = ref<any>([]);
  const searchVideoGrid = ref<any>([]);

  const searchSphGridInit = async () => {
    const { data } = await sphGrid({
      pageIndex: 1,
      pageSize: 200,
      sphType: 1,
    });
    searchSphGrid.value = data.grid;
  };
  const searchGoodsGridInit = async () => {
    const { data } = await goodsGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    searchGoodsGrid.value = data.grid;
  };
  const searchSphVideoInit = async () => {
    const { data } = await videoGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    searchVideoGrid.value = data.grid;
  };
  searchSphGridInit();
  searchGoodsGridInit();
  searchSphVideoInit();

  const showRuleVisible = ref(false);
  const shutdownRuleList = ref<any>([]);
  const shutdownModel = ref({
    oldShutdownStatus: 0,
    shutdownStatus: null,
    shutdownSetId: null,
    plantId: 0,
  });
  const getShutdownRuleGrid = async () => {
    const { data } = await shutdownRuleGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    shutdownRuleList.value = data.grid || [];
  };
  getShutdownRuleGrid();

  const handleGpBeforeOk = async (done: any) => {
    const res = await formGpRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (formGpModel.value.type === 1) {
      const { data } = await shutdownRuleAdd({ ...formGpModel.value });
      Message.success({
        content: '添加关停策略成功',
        duration: 5 * 1000,
      });
      await getShutdownRuleGrid();
    } else {
      const { data } = await shutdownRuleEdit({ ...formGpModel.value });
      Message.success({
        content: '修改关停策略成功',
        duration: 5 * 1000,
      });
      await getShutdownRuleGrid();
    }
    formGpModel.value.name = null;
    window.setTimeout(() => {
      done();
    }, 300);
  };

  const changeGpName = () => {
    formGpModel.value.name =
      ruleType[formGpModel.value.firstType] +
      formGpModel.value.firstVal +
      ruleFlagType[formGpModel.value.flagType] +
      ruleType[formGpModel.value.secondType] +
      formGpModel.value.secondVal;
  };

  const handleGpClick = async (type: any, item: any) => {
    if (type === 2) {
      formGpTitle.value = '修改关停策略';
      formGpModel.value.srId = item.srId;
      formGpModel.value.name = item.srName;
      formGpModel.value.firstType = item.firstType;
      formGpModel.value.firstVal = item.firstVal;
      formGpModel.value.flagType = item.flagType;
      formGpModel.value.secondType = item.secondType;
      formGpModel.value.secondVal = item.secondVal;
    } else {
      formGpTitle.value = '新增关停策略';
      formGpModel.value = generateFormGpModel();
      formGpModel.value.name = null;
      changeGpName();
    }

    formGpModel.value.type = type;
    formGpVisible.value = true;
  };

  const showRuleClick = async (item: any) => {
    if (item) {
      shutdownModel.value.shutdownStatus = item.shutdownStatus !== 0;
      shutdownModel.value.shutdownSetId = [];

      if (item.shutdownSetId) {
        item.shutdownSetId.split(',').forEach((el: any) => {
          shutdownModel.value.shutdownSetId.push(Number(el));
        });
      }
      shutdownModel.value.plantId = item.plantId;
      shutdownModel.value.oldShutdownStatus = item.shutdownStatus;
      checkPlantArr.value = [item.plantId];
    } else {
      if (checkPlantArr.value.length === 0) {
        Message.info('请选择对应计划');
        return;
      }
      shutdownModel.value.shutdownStatus = true;
      shutdownModel.value.shutdownSetId = [];
    }
    showRuleVisible.value = true;
  };
  const shutdownRuleChange = async (val: any) => {
    if (
      shutdownModel.value.shutdownSetId != null &&
      shutdownModel.value.shutdownSetId.length > 0 &&
      shutdownModel.value.shutdownStatus === false
    ) {
      shutdownModel.value.shutdownStatus = true;
    }
    if (
      shutdownModel.value.shutdownSetId.length === 0 &&
      shutdownModel.value.shutdownStatus === true
    ) {
      shutdownModel.value.shutdownStatus = false;
    }
  };

  const selectionChange = async (option: any) => {
    checkPlantArr.value = option;
  };

  const dateChange = (dateString: Array<string>) => {
    if (dateString) {
      // eslint-disable-next-line prefer-destructuring
      reqModel.value.startDate = dateString[0];
      // eslint-disable-next-line prefer-destructuring
      reqModel.value.endDate = dateString[1];
    } else {
      reqModel.value.startDate = dayjs()
        .add(-3, 'month')
        .format('YYYY-MM-DD')
        .toString();
      reqModel.value.endDate = dayjs().format('YYYY-MM-DD').toString();
    }
    console.log(dateString);

    // dateArr.value = getDay(dateString[0], dateString[1]);
  };

  const fun = (val: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      return 0;
    }
    if (Number(val) === 0) {
      return 0;
    }
    if (val === Infinity) {
      return 0;
    }
    return Number(val).toFixed(2);
  };
  const fun2 = (val: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      return '-';
    }
    if (Number(val) === 0) {
      return '-';
    }
    if (val === Infinity) {
      return '-';
    }
    return Number(val).toFixed(2);
  };
  const fun4 = (val: any) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(val)) {
      return '-';
    }
    if (Number(val) === 0) {
      return '-';
    }
    return Number(val * 100).toFixed(2);
  };

  const fetchSumData = async (params: any) => {
    const { data } = await reportSumData(params);
    const tls = data;
    tls.pjKdj = fun(tls.productPlaceorderGmv / tls.productOrderCount);
    tls.roi = fun(tls.productPlaceorderGmv / tls.cost);
    tls.yj_roi = fun(
      (tls.productPlaceorderGmv * (tls.yjl / tls.plantCount / 100)) / tls.cost
    );
    tls.click_rate = `${fun(
      (tls.productClickCountPv / tls.exposureCount) * 100
    )}%`;
    tls.cj_rate = `${fun(
      (tls.productOrderCount / tls.productClickCountPv) * 100
    )}%`;
    tls.qz_cost = fun((tls.cost / tls.exposureCount) * 1000);
    tls.gz_cost = fun(tls.cost / tls.followCount);
    tls.click_cost = fun(tls.cost / tls.productClickCountPv);
    tls.zh_cost = fun(tls.cost / tls.productOrderCount);
    tls.lr = fun(tls.productPlaceorderGmv - tls.cost);
    tls.noCostTime = `${fun(tls.noCostTime / 60)}分`;
    orderInfoSumData.value.forEach((el: any) => {
      el.n = tls[el.key] || '-';
    });
  };

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      fetchSumData(params);

      const { data } = await reportData(params);

      if (data.grid) {
        data.grid.forEach((el: any, key: any) => {
          el.key = String(key + 1);
          if (el.productPlaceorderGmv > 0) {
            el.lr = fun2(el.productPlaceorderGmv * (el.yjl / 100) - el.cost);
          } else {
            el.lr = 0;
          }
          el.cost = fun2(el.cost);
          el.productOrderCount = fun2(el.productOrderCount);
          el.productPlaceorderGmv = fun2(el.productPlaceorderGmv);
          el.roi = fun2(el.productPlaceorderGmv / el.cost);
          el.yl_roi = fun2(
            (el.productPlaceorderGmv * (el.yjl / 100)) / el.cost
          );
          el.airCost = fun2(el.airCost);
          el.productClickCountPv = fun2(el.productClickCountPv);
          el.exposureCount = fun2(el.exposureCount);
          el.targetType = targetType[el.targetType];
          el.wecoinBid = el.wecoinBid > 0 ? el.wecoinBid : '智能';
          el.duration = `${el.duration / 3600}小时`;
          el.click_rate =
            fun4(el.productClickCountPv / el.exposureCount) === '-'
              ? '-'
              : `${fun4(el.productClickCountPv / el.exposureCount)}%`;
          el.qan_cost = fun2((el.cost / el.exposureCount) * 1000);
          el.click_cost = fun2(el.cost / el.productClickCountPv);
          el.zh_cost = fun2(el.cost / el.productOrderCount);

          el.shutdownSwitch = el.shutdownStatus !== 0;
        });
      }
      renderData.value = data.grid || [];

      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const exportExcel = async () => {
    const req = { ...reqModel.value };
    req.pageSize = 5000;
    req.pageIndex = 1;
    const fileName = `计划报表导出${dayjs().format('YYMMDDhhmmss')}.xls`;
    const { data } = await reportData({
      ...req,
    });
    const listHander = {
      plantName: '计划名称',
      plantCode: '计划ID',
      plantStatus: '计划状态',
      sphName: '投放号',
      estimatedWecoinAmount: '投放金额',
      costRate: '消耗比例',
      cost: '消耗金额',
      productOrderCount: '订单数',
      productPlaceorderGmv: '营业额',
      lr: '利润',
      roi: 'ROI',
      ylRoi: '佣金ROI',
      yjl: '佣金率',
      airCost: '空炮余额',
      productClickCountPv: '商品点击',
      exposureCount: '浏览',
      targetType: '投放目标',
      wecoinBid: '出价',
      duration: '投放时长',
      productClickCountPvRate: '点击率',
      qRate: '千展成本',
      cRate: '点击成本',
      zRate: '转化成本',
      updatedAt: '更新时间',
      createdAt: '创建时间',
      cancelTime: '关闭时间',
      startTime: '加热开始时间',
      endTime: '加热结束时间',
    };

    const eData = data.grid;

    eData.forEach((el: any) => {
      if (el.productPlaceorderGmv > 0) {
        el.lr = fun2(el.productPlaceorderGmv * (el.yjl / 100) - el.cost);
      } else {
        el.lr = '-';
      }
      el.plantStatus = plantStatus[el.plantStatus] || '-';
      el.sphName = el.sphInfo.sphName;
      el.costRate = Number(fun(el.cost / el.estimatedWecoinAmount));
      el.cost = Number(fun2(el.cost));
      el.productOrderCount = Number(fun2(el.productOrderCount));
      el.productPlaceorderGmv = Number(fun2(el.productPlaceorderGmv));
      el.roi = fun2(el.roi);
      el.ylRoi = fun2(el.ylRoi);
      el.yjl = fun2(el.yjl);
      el.airCost = fun2(el.airCost);
      el.productClickCountPv =
        fun2(el.productClickCountPv) === '-'
          ? '-'
          : parseInt(fun2(el.productClickCountPv), 10);
      el.exposureCount =
        fun2(el.exposureCount) === '-'
          ? '-'
          : parseInt(fun2(el.exposureCount), 10);
      el.targetType = targetType[el.targetType];
      el.wecoinBid = el.wecoinBid > 0 ? el.wecoinBid : '智能';
      el.duration = `${el.duration / 3600}小时`;
      el.productClickCountPvRate =
        fun4(el.productClickCountPv / el.exposureCount) === '-'
          ? '-'
          : `${fun4(el.productClickCountPv / el.exposureCount)}%`;
      el.qRate = fun2((el.cost / el.exposureCount) * 1000);
      el.cRate = fun2(el.cost / el.productClickCountPv);
      el.zRate = fun2(el.cost / el.productOrderCount);
    });
    EXlsx(eData, listHander, fileName);
  };
  const onPageChange = (page: any) => {
    basePagination.pageIndex = page.current;
    basePagination.current = page.current;
    pagination.pageIndex = page.current;
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    // formModel.value.pageIndex = current;
    fetchData({
      ...reqModel.value,

      ...basePagination,
    } as unknown as any);
  };
  const pageSizeChange = (size: number) => {
    // console.log(size);
    basePagination.pageSize = size;
    pagination.pageSize = size;
    fetchData({
      ...reqModel.value,
      ...basePagination,
    } as unknown as any);
  };

  const search = () => {
    // advData();
    onPageChange({
      current: 1,
      pageSize: pagination.pageSize,
    });
  };

  const getAsyncData = async () => {
    const res = await asyncData({});
    if (res.success) {
      Message.success('同步成功');
    } else {
      Message.success(res.message);
    }
  };

  const sorterChange = async (sort: any) => {
    console.log(sort, 'sort');
    if (sort) {
      reqModel.value.orderKey = sort.sortBy;
      reqModel.value.orderSort = sort.descending ? 'DESC' : 'ASC';
    } else {
      reqModel.value.orderSort = null;
    }
    search();
  };
  const handleRuleBeforeOk = async (done: any) => {
    try {
      let status = 0;
      if (shutdownModel.value.shutdownStatus === true) {
        status =
          shutdownModel.value.oldShutdownStatus === 0
            ? 1
            : shutdownModel.value.oldShutdownStatus;
      }
      const { data } = await plantEdit({
        plantId: checkPlantArr.value.join(','),
        shutdownSetId: shutdownModel.value.shutdownSetId.join(','),
        shutdownStatus: status,
      });
      Message.success({
        content: '更新关停策略成功',
        duration: 5 * 1000,
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      showRuleVisible.value = false;

      search();
      // you can report use errorHandler or other
    }
    done(false);
  };
  const orderPayCheck = async (item: any) => {
    qrcodeStatusTimer.value = setInterval(async function () {
      const { data } = await getOrderDetail({
        sphId: item.sphId,
        promotionId: item.plantCode,
      });
      if (Number(data.data.order.orderInfo.status) !== 1) {
        clearInterval(qrcodeStatusTimer.value);
        Message.success({
          content: '当前订单已支付',
          duration: 5 * 1000,
        });
        showQrcodeVisible.value = false;
        search();
      }
      if (Number(data.data.order.orderInfo.status) === 2) {
        clearInterval(qrcodeStatusTimer.value);
        Message.success({
          content: '订单支付成功',
          duration: 5 * 1000,
        });
        showQrcodeVisible.value = false;
        search();
      }
    }, 1500);
  };

  const orderPayCancel = async () => {
    clearInterval(qrcodeStatusTimer.value);
  };

  const changePlantTab = async (k: any) => {
    plantTabActive.value = k;
    targetTypeData.value = [];
    targetTypeBottom.value = false;
    targetTypePageNo.value = 1;
    targetTypeReq.value = false;
    reqModel.value = generateFormReqModel();

    await getTargetTypeData();
    await search();
  };

  const plantTabCheck = async (item: any, key: any) => {
    plantTabCheckIndex.value = key;
    const reqField = [
      '',
      '',
      'groupId',
      'goodsId',
      'videoId',
      'sphId',
      'sphId',
      'srId',
    ];
    const tabkey = plantTabList.value[plantTabActive.value].id;
    console.log(item, reqField[tabkey]);
    reqModel.value[reqField[tabkey]] = item[reqField[tabkey]];

    await search();
  };

  const plantChanel = async (done: any, plantId: any) => {
    try {
      const { data } = await cancelPromotion({
        plantId: plantChanelId.value,
      });
      Message.success({
        content: '请求关停成功',
        duration: 5 * 1000,
      });
    } catch (err) {
      done(true);
      return;
      // you can report use errorHandler or other
    } finally {
      // you can report use errorHandler or other
      search();
    }
    done(true);
  };

  const getPlantLogGrid = async () => {
    orderLogLoading.value = true;
    const { data } = await plantLogGrid({
      plantId: orderInfo.value.plantId,
      pageIndex: 1,
      pageSize: 200,
    });
    orderLogData.value = data.grid;
    orderLogLoading.value = false;
  };

  const getOrderInfo = async (item: any) => {
    orderInfoVisible.value = true;
    orderInfoLoading.value = true;
    const { data } = await plantInfo({ plantId: item.plantId });
    orderInfo.value = data.info;
    const tls = orderInfo.value;

    // 加热数据
    tls.pjKdj = fun(tls.productPlaceorderGmv / tls.productOrderCount);
    tls.roi = fun(tls.productPlaceorderGmv / tls.cost);
    tls.yj_roi = fun((tls.productPlaceorderGmv * (tls.yjl / 100)) / tls.cost);
    tls.click_rate = `${fun(
      (tls.productClickCountPv / tls.exposureCount) * 100
    )}%`;
    tls.cj_rate = `${fun(
      (tls.productOrderCount / tls.productClickCountPv) * 100
    )}%`;
    tls.qz_cost = fun((tls.cost / tls.exposureCount) * 1000);
    tls.gz_cost = fun(tls.cost / tls.followCount);
    tls.click_cost = fun(tls.cost / tls.productClickCountPv);
    tls.zh_cost = fun(tls.cost / tls.productOrderCount);
    tls.lr = fun(tls.productPlaceorderGmv - tls.cost);
    tls.noCostTime = `${fun(tls.noCostTime / 60)}分`;
    orderInfoHotData.value.forEach((el: any) => {
      el.n = tls[el.key] || '-';
    });

    // 加热信息
    const hotMsg: any = {};
    const taskReq: any = JSON.parse(tls.taskInfo.reqJson);
    hotMsg.duration = `${tls.duration / 3600}小时`;
    hotMsg.promotionType =
      taskReq.feedPromotionOrderInfo.promotionType === 1
        ? '智能加热'
        : '定向加热';

    hotMsg.promotionTarget = targetType[tls.targetType];
    hotMsg.wecoinBid = tls.wecoinBid > 0 ? tls.wecoinBid : '智能';
    if (taskReq.feedPromotionOrderInfo.suggest.gender.length === 0) {
      hotMsg.gender = '不限';
    } else {
      hotMsg.gender =
        taskReq.feedPromotionOrderInfo.suggest.gender.indexOf(1) === 0
          ? '男'
          : '女';
    }

    if (taskReq.feedPromotionOrderInfo.suggest.ageRange.length === 0) {
      hotMsg.ageRange = '不限';
    } else {
      hotMsg.ageRange = '';
      taskReq.feedPromotionOrderInfo.suggest.ageRange.forEach((e: any) => {
        hotMsg.ageRange += `${ageRangeTag[e]}、`;
      });
    }

    if (taskReq.feedPromotionOrderInfo.suggest.interestTag.length === 0) {
      hotMsg.interestTag = '不限';
    } else {
      hotMsg.interestTag = '';
      taskReq.feedPromotionOrderInfo.suggest.interestTag.forEach((e: any) => {
        // const regex = new RegExp(`"([^"]*)":"${e}"`);
        // const str = JSON.stringify(insertTag.value);
        // console.log(regex);
        // console.log(str.match(regex));
        hotMsg.interestTag += `${insertTagMap.get(e)}、`;
      });
    }

    const allCitys = [...province, ...city];
    if (taskReq.feedPromotionOrderInfo.suggest.cityIds.length === 0) {
      hotMsg.cityIds = '不限';
    } else {
      hotMsg.cityIds = '';
      taskReq.feedPromotionOrderInfo.suggest.cityIds.forEach((e: any) => {
        hotMsg.cityIds += `${_.find(allCitys, ['code', e])?.name}、`;
      });
    }
    orderInfoHotMsg.value.forEach((el: any) => {
      if (el.key === 'cityIds' && hotMsg[el.key] !== '不限') {
        el.expandable = true;
      }
      if (el.key === 'interestTag' && hotMsg[el.key] !== '不限') {
        el.expandable = true;
      }
      el.value = hotMsg[el.key] || '-';
    });

    tls.costCoin = parseInt(tls.cost * 100, 10);
    tls.estimatedWecoinAmount =
      tls.plantStatus === 2 ? tls.estimatedWecoinAmount * 100 : 0;

    tls.estimatedWecoinAmountBack =
      tls.cost > 0 ? tls.estimatedWecoinAmount - tls.costCoin : 0;
    orderInfoPayData.value.forEach((el: any) => {
      if (el.key !== '') {
        el.value = tls[el.key] || '-';
      }
    });

    orderInfoLoading.value = false;
    getPlantLogGrid();
  };
  const disPlayColumns = ref([]);
  if (localStorage.getItem('report-disPlayColumns')) {
    disPlayColumns.value = JSON.parse(
      localStorage.getItem('report-disPlayColumns')
    );
  } else {
    plantColumns.value.forEach((el: any) => {
      disPlayColumns.value.push(el.colKey);
    });
  }
  const disPlayColumnsChange = async (value: any) => {
    localStorage.setItem('report-disPlayColumns', JSON.stringify(value));
  };
  const refresh = () => {
    reqModel.value = generateFormReqModel();
  };
  fetchData({
    ...reqModel.value,
  });
  defineExpose({
    fetchData,
  });
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    :deep(.arco-pagination-total) {
      display: none;
    }
  }
  .content {
    width: 100%;
    .orderTypeBox {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      .orderTypeBtn {
        width: 110px;
        height: 40px;
        border-radius: 20px;
        background: #f2f5ff;
        color: #2d2d2d;
        margin-right: 32px;
        font-size: 16px;
        line-height: 38px;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
        &:last-child {
          margin-right: 0;
        }
      }
      .orderTypeActive {
        background: #165dff;
        color: #fff;
      }
    }
  }

  :deep .t-table__header tr {
    background: #f2f5ff;
    height: 60px;
    border-radius: 4px;
    font-weight: 500;
    color: #535353;
    border-bottom: none !important;
  }
  .background_img_one {
    width: 36px;
    height: 36px;
    color: #fff;
    background-image: url('https://img.adyinqing.com/upai_shop/ip8t7za11678348299203');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: -4px 0px;
    line-height: 44px;
    margin: 0 auto;
  }
  .background_img_two {
    width: 36px;
    height: 36px;
    color: #fff;
    background-image: url('https://img.adyinqing.com/upai_shop/a269mw6i1678349024302');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: -4px 0px;
    line-height: 44px;
    margin: 0 auto;
  }
  .background_img_three {
    width: 36px;
    height: 36px;
    color: #fff;
    background-image: url('https://img.adyinqing.com/upai_shop/z1dekxra1678349027531');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: -4px 0px;
    line-height: 44px;
    margin: 0 auto;
  }
  .key {
    width: 36px;
    height: 36px;
    font-weight: 500;
    margin: 0 auto;
    line-height: 44px;

    font-size: 16px;
    color: #3f3f3f;
  }
  .container {
    height: 100%;
    padding: 0 17px 17px 17px;
    background: #f7f9ff;
  }
  // :deep
  //   .arco-table-stripe:not(.arco-table-dragging)
  //   .arco-table-tr:not(.arco-table-tr-empty):not(
  //     .arco-table-tr-summary
  //   ):nth-child(even)
  //   .arco-table-td:not(.arco-table-col-fixed-left):not(
  //     .arco-table-col-fixed-right
  //   ),
  // .arco-table-stripe
  //   .arco-table-tr-drag
  //   .arco-table-td:not(.arco-table-col-fixed-left):not(
  //     .arco-table-col-fixed-right
  //   ) {
  //   background-color: #f2f5ff !important;
  // }
  // :deep(.arco-table-td) {
  //   border-bottom: none;
  // }
  .title {
    font-size: 20px;
    color: #2d2d2d;
    font-weight: 500;
    display: flex;
    align-items: center;
    // margin-bottom: 28px;
    .tips {
      font-size: 16px;
      color: #535353;
      font-weight: 400;
      margin-left: 22px;
    }
  }

  .general-card-upai {
    // border-radius: 20px;
    border: none;
    margin-bottom: 16px;
    .arco-card-body {
      padding: 20px 17px !important;
    }
  }

  .general-card-upai2 {
    // border-radius: 20px;
    border: none;
    margin-bottom: 16px;
    .arco-card-body {
      padding: 9px 9px !important;
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
  :deep .arco-picker {
    height: 40px;
    background: #f2f5ff;
    border-radius: 4px;
  }
  :deep.arco-input-number {
    height: 30px;
  }
  .general-card-upai {
    :deep(.arco-row-align-start) {
      align-items: center;
    }
  }
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
  :deep .arco-progress-line-text {
    margin-left: 1px;
    min-width: none;
  }

  .goodStatusBox {
    padding: 0px 36px;
    width: 100%;
    height: 76px;
    background: #ffffff;

    border-radius: 12px;
    margin: 16px 0;
    display: flex;
    align-items: center;
    .btn {
      height: 100%;
      margin-right: 6vw;
      box-sizing: border-box;
      color: #535353;
      font-size: 20px;
      line-height: 76px;
      transition: all 0.2s;
      &:hover {
        cursor: pointer;
      }
    }
    .active {
      color: #165dff;
      font-weight: 500;
      border-bottom: 2px solid #165dff;
    }
  }
  .plantTab-select {
    background-color: rgba(21, 84, 248, 0.1);
  }

  /deep/ .arco-statistic-value-integer {
    font-size: 13px !important;
  }
  /deep/ .arco-statistic-value-decimal {
    font-size: 13px !important;
  }
  /deep/ .arco-statistic-value {
    font-size: 14px !important;
  }
  /deep/ .arco-descriptions-item {
    line-height: 1 !important;
  }

  /deep/ .arco-typography {
    margin-bottom: 0 !important;
  }
  /deep/.arco-descriptions-title {
    margin-bottom: 4px !important;
  }

  .upai_content {
    width: 100%;
    // height: 340px;
    border-radius: 6px;
    background: #fff;
    // padding: 27px 28px;
    .title {
      font-size: 17px;
      color: #2d2d2d;
      font-weight: 500;
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
      .tips {
        font-size: 12px;
        color: #535353;
        font-weight: 400;
        margin-left: 22px;
      }
    }
    .arco-col-5 {
      flex: 0 0 19.833333%;
      width: 19.833333%;
    }
  }

  .numBox2 {
    width: 100%;
    height: 75px;
    background: #fff;
    border-radius: 8px;
    // padding: 31px 23px;
    padding: 10px 10px;
    .titleBox {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #6f6f6f;
      font-weight: 500;
      .y {
        width: 12px;
        height: 12px;
        margin-right: 6px;
      }
    }
    .n {
      padding-left: 10px;
      margin-top: 10px;
    }
  }
  .numBox {
    width: 100%;
    height: 75px;
    background: #f5f5f5;
    border-radius: 8px;
    // padding: 31px 23px;
    padding: 10px 10px;
    .titleBox {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #6f6f6f;
      font-weight: 500;
      .y {
        width: 12px;
        height: 12px;
        margin-right: 6px;
      }
    }
    .n {
      padding-left: 10px;
      margin-top: 10px;
    }
  }
  .grid-demo-grid .demo-item,
  .grid-demo-grid .demo-suffix {
    height: 48px;
    line-height: 48px;
    color: var(--color-white);
    text-align: center;
  }

  .grid-demo-grid .demo-item:nth-child(2n) {
    background-color: rgba(var(--arcoblue-6), 0.9);
  }

  .grid-demo-grid .demo-item:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }
</style>
