<template>
  <div class="container">
    <Breadcrumb :items="['小店管理', '售后订单']" />
    <!-- <div class="pageTitle"> 小店列表 </div> -->
    <div class="box_bcw" style="width: 100%">
      <a-row :gutter="[0, 12]">
        <!-- <a-col :span="24">
          <a-radio-group v-model="formModel.shopId">
            <a-radio value="">
              <template #radio="{ checked }">
                <a-tag :checked="checked" checkable>全部店铺(2)</a-tag>
              </template>
            </a-radio>

            <a-radio v-for="e in 2" :key="e" :value="e">
              <template #radio="{ checked }">
                <a-tag :checked="checked" checkable>店铺{{ e }}</a-tag>
              </template>
            </a-radio>
          </a-radio-group>
        </a-col> -->
        <a-col :flex="1">
          <!-- <a-space :size="18">
            <a-select :style="{ width: '240px' }" placeholder="" v-model="">
              <a-option
                v-for="(item, index) in formModelLabel"
                :key="index"
                :value="item"
              >
                {{ item }}
              </a-option>
            </a-select> 
          </a-space>-->
          <a-form :model="formModel" auto-label-width label-align="left">
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item field="mid" label="店铺名称" label-col-flex="60px">
                  <a-select
                    v-model="formModel.mid"
                    allow-clear
                    placeholder="请选择店铺名称"
                    @change="search"
                  >
                    <a-option
                      v-for="(item, key) in merchantList"
                      :key="key"
                      :label="item.nickname"
                      :value="item.mid"
                    />
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col
                v-for="(item, index) in formModelLabel"
                :key="index"
                :span="6"
              >
                <a-form-item :field="index" :label="item" label-col-flex="60px">
                  <a-input
                    v-model="formModel[index]"
                    :placeholder="'请输入' + item"
                    allow-clear
                  />
                </a-form-item>
              </a-col>

              <a-col :span="6">
                <a-form-item
                  field="orderStatus"
                  label="订单状态"
                  label-col-flex="60px"
                >
                  <a-select
                    v-model="formModel.orderStatus"
                    allow-clear
                    placeholder="请选择订单状态"
                  >
                    <a-option
                      v-for="(item, index) in enumToObject(merchantOrderStatus)"
                      :key="index"
                      :value="item.value"
                    >
                      {{ item.label }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  field="returnStatus"
                  label="退款订单状态"
                  label-col-flex="60px"
                >
                  <a-select
                    v-model="formModel.returnStatus"
                    allow-clear
                    placeholder="请选择退款订单状态"
                  >
                    <a-option
                      v-for="(item, index) in enumToObject(refundStatus)"
                      :key="index"
                      :value="item.label"
                    >
                      {{ item.value }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  label="支付时间"
                  label-col-flex="60px"
                >
                  <a-range-picker
                    :default-value="[dayjs().add(-1, 'month'), dayjs()]"
                    style="width: 100%"
                    :shortcuts="rangeShortcuts"
                    shortcuts-position="left"
                    @change="dateChange"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="18">
                <a-space :size="18">
                  <a-button type="primary" @click="search">
                    <template #icon>
                      <icon-search />
                    </template>
                    搜索
                  </a-button>
                  <!-- <a-button type="primary" @click="exportExcel">
                    <template #icon>
                      <icon-download />
                    </template>
                    {{ $t('searchTable.form.daochu') }}
                  </a-button> -->
                </a-space>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
    </div>
    <!-- <div class="gridBox">
      <div v-for="(el, ky) in orderInfoSumData" :key="ky" class="numBox2">
        <div class="titleBox">
          <img :src="el.url" class="y" alt="" />
          {{ el.t }}
        </div>
        <div class="n">
          <span v-if="el.type === 2 && el.n != '-'" class="rmb">¥</span>
          <span>{{ el.type === 2 ? fun(el.n) : el.n }}</span>
          <span v-if="el.type === 4 && el.n != '-'" class="rmb">%</span>
        </div>
      </div>
    </div> -->
    <a-card class="general-card-upai" style="width: 100%; padding-bottom: 32px">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="search()">
              <template #icon>
                <icon-refresh />
              </template>
              刷新
            </a-button>

            <a-button type="primary" @click="handleAgreeRefund">
              批量同意
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-table
        v-model:selectedKeys="selectedKey"
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true,
        }"
        :sticky-header="true"
        row-key="roid"
        :pagination="false"
        :loading="loading"
        :data="renderData"
        :hoverable="true"
        :scroll="scroll"
        :stripe="false"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <!-- <a-table-column title="id" align="center">
            <template #cell="{ record }">{{ record.sphId }} </template>
          </a-table-column>
         
          <a-table-column title="小店信息" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-avatar>
                  <img
                    v-if="record.merchantInfo.headimgUrl"
                    alt="avatar"
                    :src="record.merchantInfo.headimgUrl"
                  />
                </a-avatar>
                <a-space>
                  <div class="shopInfo">
                    <div class="shopName">
                      <a-typography-text style="display: flex">
                        名称:<a-typography-text type="secondary">
                          {{ record.merchantInfo.nickname }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                    <div class="APPID">
                      <a-typography-text>
                        APPID:<a-typography-text type="secondary">
                          {{ record.merchantInfo.appid }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                  </div>
                </a-space>
              </a-space>
            </template>
          </a-table-column> -->
          <a-table-column title="订单信息" align="center" :width="250">
            <template #cell="{ record }">
              <a-space>
                <div class="shopInfo">
                  <div class="shopName">
                    <a-typography-text>
                      订单状态:<a-typography-text type="secondary">
                        {{ merchantOrderStatus[record.orderStatus] }}
                      </a-typography-text>
                    </a-typography-text>
                  </div>
                  <div class="APPID">
                    <a-typography-text>
                      退款ID:<a-typography-text type="secondary">
                        {{ record.refundOrderNo }}
                      </a-typography-text>
                    </a-typography-text>
                  </div>
                  <div class="APPID">
                    <a-typography-text>
                      订单ID:<a-typography-text type="secondary">
                        {{ record.orderNo }}
                      </a-typography-text>
                    </a-typography-text>
                  </div>
                </div>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="商品信息" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-avatar>
                  <img
                    v-if="record.orderDetail.productInfo != ''"
                    alt="avatar"
                    :src="record.orderDetail.productInfo[0].thumb_img"
                  />
                </a-avatar>
                <a-space>
                  <div class="shopInfo">
                    <div class="goodsName">
                      <a-typography-text>
                        名称:<a-typography-text
                          type="secondary"
                          :ellipsis="{
                            rows: 1,
                            showTooltip: true,
                          }"
                        >
                          {{ record.orderDetail.shopTitle || '-' }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                  </div>
                </a-space>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="退款规格" align="center">
            <template #cell="{ record }">
              <a-typography-text>
                {{
                  record.orderDetail.productInfo != ''
                    ? record.orderDetail.productInfo[0].sku_attrs[0].attr_value
                    : '-'
                }}
              </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column title="退款类型" align="center">
            <template #cell="{ record }">{{
              rOrderTYpe[record.type] || '-'
            }}</template>
          </a-table-column>
          <a-table-column title="退款原因" align="center">
            <template #cell="{ record }">
              <a-typography-text>
                {{ refundReason[record.reason] || '-' }}
              </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column title="拒绝退款原因" align="center">
            <template #cell="{ record }">
              <a-typography-text>
                {{ record.merchantUploadInfo.reject_reason || '-' }}
              </a-typography-text>
            </template>
          </a-table-column>
          <!-- <a-table-column title="物流状态" align="center">
            <template #cell="{ record }">
              {{ record.customerNotes || '-' }}
            </template>
          </a-table-column> -->
          <a-table-column title="售后状态" align="center">
            <template #cell="{ record }">
              {{ refundStatus[record.returnStatus] || '-' }}
            </template>
          </a-table-column>

          <a-table-column
            align="center"
            title="操作"
            data-index="operations"
            fixed="right"
          >
            <template #cell="{ record }">
              <!-- <a-button
                type="text"
                size="small"
                @click="handleClick(3, record)"
              >
                订单详情
              </a-button> -->
              <a-button
                type="text"
                size="small"
                @click="handleClickReject(record)"
              >
                拒绝
              </a-button>
              <a-button
                type="text"
                size="small"
                @click="handleAgreeSingleRefund(record)"
              >
                同意
              </a-button>
              <!-- <a-button type="text" size="small" @click="handleClick(1)">
                重新登录
              </a-button> -->
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
    </a-card>
    <a-drawer
      width="50%"
      :visible="visible"
      :footer="false"
      unmount-on-close
      @cancel="handleCancelDrawer"
    >
      <template #title>
        <a-button>{{
          merchantOrderStatus[orderDetail.orderStatus || 10]
        }}</a-button>
      </template>
      <div class="gridBoxOrder">
        <div class="borderBox">
          <div class="orderDetailBox">
            <div class="title"> 订单商品 </div>
            <div class="contentBox">
              <div class="leftImg">
                <a-image
                  width="80"
                  :src="orderDetail.shopThumbImg"
                  fit="cover"
                />
              </div>
              <div class="infoContent">
                <div class="liBox">
                  <div class="content_l">
                    <a-typography-text>
                      {{ orderDetail.shopTitle }}
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      ¥{{ orderDetail.productPrice }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_l">
                    <a-typography-text type="secondary">
                      {{ orderDetail.productInfo[0].sku_attrs[0].attr_value }}
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text type="secondary">
                      x{{ orderDetail.productInfo.length }}
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </div>
            <div class="contentBox">
              <div class="leftImg"> </div>
              <div class="infoContent">
                <div class="liBox">
                  <div class="content_l">
                    <a-typography-text> 商品总价 </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      ¥{{ orderDetail.orderPrice }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_l">
                    <a-typography-text type="secondary">
                      订单运费
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text type="secondary"> ¥0 </a-typography-text>
                  </div> </div
                ><div class="liBox" style="margin-top: 10px">
                  <div class="content_l">
                    <a-typography-text type="secondary">
                      商品改价
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text type="secondary"> ¥0 </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class=""> </div>
                  <div class="content_r">
                    <a-typography-text>
                      总{{ orderDetail.productInfo.length }}件，实付款¥{{
                        orderDetail.orderPrice
                      }}
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="orderDetailBox" style="margin-top: 10px">
            <div class="title"> 订单信息 </div>
            <div class="contentBox">
              <div class="infoContent">
                <div class="liBox">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      订单状态
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{ merchantOrderStatus[orderDetail.orderStatus] }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      订单编号
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{ orderDetail.orderNo }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      下单时间
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{
                        orderDetail.prepayTime
                          ? dayjs(orderDetail.prepayTime * 1000).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : '-'
                      }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      支付时间
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{
                        orderDetail.payTime
                          ? dayjs(orderDetail.payTime * 1000).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : '-'
                      }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      交易单号
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text
                      :ellipsis="{
                        rows: 1,
                        showTooltip: true,
                      }"
                    >
                      {{ orderDetail.payInfo.prepay_id || '-' }}
                    </a-typography-text>
                  </div> </div
                ><div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      发货时间
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{
                        orderDetail.shipDoneTime
                          ? dayjs(orderDetail.shipDoneTime * 1000).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : '-'
                      }}
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="borderBox">
          <div class="orderDetailBox">
            <div class="title"> 收货信息 </div>
            <div class="contentBox">
              <div class="infoContent">
                <div class="liBox">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      收货人
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      <!-- {{ orderDetail.addressInfo.user_name }} -->
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      联系方式
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      <!-- {{ orderDetail.addressInfo.tel_number }} -->
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      收货地址
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      <!-- {{ orderDetail.addressInfo.addressInfo }} -->
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-drawer>
    <a-modal
      v-model:visible="rejectVisible"
      width="30%"
      :title="rejectTitle"
      @cancel="handleCancelReject"
      @before-ok="handleBeforeRejcet"
    >
      <a-card class="general-card">
        <a-form ref="formRef" :model="rejectOrder" auto-label-width>
          <a-form-item
            label-col-flex="70px"
            field="rejectReason"
            label="拒绝原因"
            :rules="[
              {
                required: true,
                message: '请填写拒绝原因',
              },
            ]"
          >
            <a-textarea
              v-model="rejectOrder.rejectReason"
              placeholder="请填写拒绝原因"
              allow-clear
            />
          </a-form-item>
        </a-form>
      </a-card>
    </a-modal>
    <a-modal
      v-model:visible="singleAgreeVisible"
      title="同意退货"
      ok-text="同意退货"
      @cancel="handleCancelSingleAgree"
      @before-ok="handleBeforeAgressSingleRefund"
    >
      <a-space direction="vertical">
        <a-typography-text>
          默认退货地址：{{ addressInfoText }} ,是否同意退货？
        </a-typography-text>
        <a-typography-text
          type="primary"
          style="display: flex; cursor: pointer"
          @click="handleHerfAddress"
        >
          选择地址
        </a-typography-text>
      </a-space>
    </a-modal>
    <a-modal
      v-model:visible="AgreeVisible"
      title="批量同意退货"
      ok-text="同意退货"
      @cancel="handleCancelAgree"
      @before-ok="handleBeforeAgressRefund"
    >
      <a-space direction="vertical">
        <a-typography-text>
          默认退货地址：{{ addressInfoText }} ,是否同意批量退货？
        </a-typography-text>

        <a-typography-text
          type="primary"
          style="display: flex; cursor: pointer"
          @click="handleHerfAddress"
        >
          选择地址
        </a-typography-text>
      </a-space>
    </a-modal>
    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form
        ref="formRef"
        :model="editModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          v-for="(label, filed) in sphInputFiled"
          :key="label"
          :field="filed"
          :label="label"
          :rules="[
            {
              required: true,
              message: '请填写' + label,
            },
          ]"
        >
          <a-input v-model="editModel[filed]" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="addressVisible"
      title="退货地址列表"
      width="55%"
      simple
      :footer="false"
    >
      <AddressList
        :mid="mid"
        @selectChange="refundAddressChange"
        @closeV="closeVisible"
      />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getQrcode, getQrcodeStatus, sphEdit, sphGrid } from '@/api/sph';
  import {
    refundGrid,
    orderEdit,
    orderGridData,
    merchantGrid,
    refundAgree,
    refundReject,
    addressGrid,
  } from '@/api/merchantApi';
  import dayjs from 'dayjs';
  import QrcodeVue from 'qrcode.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Pagination } from '@/types/global';
  import {
    sphType,
    sphStatus,
    useStatus,
    enumToObject,
    merchantOrderStatus,
    refundReason,
    refundStatus,
    rOrderTYpe,
  } from '@/utils/enum';

  import { useUserStore } from '@/store/index';
  import AddressList from './components/address.vue';

  const orderDetail = ref<any>({});
  const orderInfoSumData = ref<any>([
    {
      t: '实付金额',
      key: 'payPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '实付订单数',
      key: 'payOrderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 1,
    },
    {
      t: '成交商品件数',
      key: 'payProCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 1,
    },
    {
      t: '创单金额',
      key: 'createdPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
    },
    {
      t: '创单订单数',
      key: 'createdOrderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 1,
    },
    {
      t: '支付转化率',
      key: 'convertRate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 4,
    },
  ]);
  const rangeShortcuts = [
    {
      label: '当日',
      value: () => [dayjs(), dayjs()],
    },
    {
      label: '昨日',
      value: () => [dayjs().add(-1, 'day'), dayjs().add(-1, 'day')],
    },
    {
      label: '近一周',
      value: () => [dayjs().add(-1, 'week'), dayjs().add(-1, 'day')],
    },
    {
      label: '近一月',
      value: () => [dayjs().add(-1, 'month'), dayjs().add(-1, 'day')],
    },
    {
      label: '本月',
      value: () => [dayjs().startOf('month'), dayjs()],
    },
  ];
  const userStore = useUserStore();
  const formModelLabel = reactive({
    orderSn: '订单号',
    refundOrderNo: '退款ID',
    title: '商品名称',
    tel: '下单手机号',
    userName: '收件人姓名',
  });
  const generateFormModel = () => {
    return {
      mid: undefined,
      shopId: '',
      endDate: dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      startDate: dayjs().add(-1, 'month').format('YYYY-MM-DD HH:mm:ss'),
    };
  };
  const scroll = {
    x: 2000,
    // y: 500,
  };
  const router = useRouter();
  const mid = ref();

  const formVisible = ref(false);
  const addressVisible = ref(false);
  const rejectVisible = ref(false);
  const singleAgreeVisible = ref(false);
  const AgreeVisible = ref(false);
  const refundVisible = ref(false);
  const tableHeaderArr = ref<any[]>([]);
  const selectedKey = ref<string[]>([]);
  const addressInfoText = ref('');
  const sphCode = ref('');
  const qrcodeValue = ref('');
  const qrcodeToken = ref('');
  const qrcodeScan = ref(false);
  const qrcodeStatusTimer = ref<any>();
  // const sphId = ref(0);
  const selectChannelId = ref(0);
  const selectsphId = ref(0);
  const formTitle = ref('修改信息');
  const rejectTitle = ref('拒绝原因');
  const sphStatusTagColor = ['', '#00b42a', '#f53f3f'];

  const editFormModel = () => {
    return {
      order_id: undefined,
      remark: '',
      type: 1,
    };
  };
  const editModel = ref(editFormModel());

  const sphInputFiled = ref({
    remark: '备注',
  });

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<any[]>([]);
  const merchantList = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const visible = ref<boolean>(false);
  const productCode = ref('');
  const handleHerfAddress = () => {
    // router.push({
    //   name: 'refundAddressList',
    // });

    addressVisible.value = true;
  };
  // page
  const basePagination: Pagination = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  };

  const pagination = reactive({
    ...basePagination,
  });
  const dateChange = (dateString: Array<string>) => {
    // eslint-disable-next-line prefer-destructuring
    formModel.value.startDate = dateString[0];
    // eslint-disable-next-line prefer-destructuring
    formModel.value.endDate = dateString[1];
  };
  const getMerchantGrid = async () => {
    const { data } = await merchantGrid(pagination);
    merchantList.value = data.grid;
    if (data.grid.length === 1) {
      formModel.value.mid = data.grid[0].mid;
    }
  };
  const getDefaultAddress = async (id: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const { data } = await addressGrid({
        isDefault: 1,
        pageSize: 10,
        pageIndex: 1,
        mid: id,
      });
      if (!data.grid) {
        addressVisible.value = true;
        reject(Message.error('未设置默认地址。请配置默认退货地址'));
      }
      if (data.grid) {
        data.grid[0].detailInfo = JSON.parse(data.grid[0].detailInfo);
        const infoObj = data.grid[0].detailInfo.address_info;
        // console.log(infoObj);
        const address = {
          addressId: data.grid[0].addressId,
          addressInfo:
            infoObj.province_name +
            infoObj.city_name +
            infoObj.county_name +
            infoObj.detail_info,
        };
        resolve(address);
      }
    });
  };
  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await refundGrid(params);
      console.log(data, 'data', data.total);

      getMerchantGrid().then((res) => {
        console.log(res);
      });

      if (data.grid) {
        data.grid.forEach((e: any) => {
          e.detail = e.detail ? JSON.parse(e.detail) : e.detail;
          e.merchantUploadInfo = e.merchantUploadInfo
            ? JSON.parse(e.merchantUploadInfo)
            : e.merchantUploadInfo;
          e.productInfo = e.productInfo
            ? JSON.parse(e.productInfo)
            : e.productInfo;
          e.refundInfo = e.refundInfo ? JSON.parse(e.refundInfo) : e.refundInfo;
          e.refundResp = e.refundResp ? JSON.parse(e.refundResp) : e.refundResp;
          e.returnInfo = e.returnInfo ? JSON.parse(e.returnInfo) : e.returnInfo;
          e.orderDetail.productInfo = e.orderDetail.productInfo
            ? JSON.parse(e.orderDetail.productInfo)
            : e.orderDetail.productInfo;
          // e.addressInfo.addressInfo =
          //   e.addressInfo.province_name +
          //   e.addressInfo.city_name +
          //   e.addressInfo.county_name +
          //   e.addressInfo.detail_info;
        });
      }

      renderData.value = data.grid || [];

      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total || 0;
      // console.log(pagination);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
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

  const refresh = () => {
    formModel.value = generateFormModel();
  };
  // 搜索
  const search = () => {
    // advData();
    onPageChange(1);
  };
  const midChange = (value: any) => {
    console.log(value);
  };
  fetchData({
    ...formModel.value,

    ...basePagination,
  } as unknown as any);

  const getQrcodeReqStatus = ref(false);

  const checkSph = async () => {
    if (getQrcodeReqStatus.value) {
      return;
    }
    getQrcodeReqStatus.value = true;
    const qrRes = await getQrcodeStatus({ token: qrcodeToken.value });

    getQrcodeReqStatus.value = false;

    if (qrRes.data.status === 5) {
      qrcodeScan.value = true;
    }
    if (qrRes.data.status === 1) {
      Message.success({
        content: '登录成功',
        duration: 5 * 1000,
      });

      qrcodeScan.value = false;

      search();
      return;
    }
    setTimeout(checkSph, 1000);
  };
  const rejectOrder = reactive({
    roid: undefined,
    mid: undefined,
    rejectReason: '',
  });
  const handleClickReject = (row: any) => {
    rejectOrder.roid = row.roid; // 订单id
    rejectOrder.mid = row.mid; // 订单id
    rejectVisible.value = true;
  };
  const singleAgreeModel = reactive({
    roid: '',
    addressId: '',
    mid: undefined,
  });
  const agreeModel = reactive({
    roid: '',
    addressId: '',
    mid: undefined,
  });
  const resetModel = (type: any) => {
    if (type === 1) {
      singleAgreeModel.roid = '';
      singleAgreeModel.addressId = '';
      singleAgreeModel.mid = undefined;
    } else {
      agreeModel.roid = '';
      agreeModel.addressId = '';
      agreeModel.mid = undefined;
    }
  };
  const handleAgreeSingleRefund = async (row: any) => {
    singleAgreeModel.roid = `${row.roid}`;
    singleAgreeModel.mid = row.mid;
    mid.value = row.mid;
    const address: any = await getDefaultAddress(row.mid);
    console.log(address);
    addressInfoText.value = address.addressInfo;
    singleAgreeModel.addressId = address.addressId;

    singleAgreeVisible.value = true;
  };
  const vchange = async (value: any) => {
    if (!formModel.value.mid) {
      Message.info('请先选择店铺');
      value = false;
      return;
    }
    if (value) {
      const address: any = await getDefaultAddress(formModel.value.mid);

      addressInfoText.value = address.addressInfo;
    } else {
      addressInfoText.value = '';
    }
  };

  const handleAgreeRefund = async (row?: any) => {
    if (!formModel.value.mid) {
      Message.info('请先选择店铺');
      return;
    }
    if (!selectedKey.value.length) {
      Message.info('请先选择操作的商品');
      return;
    }
    mid.value = formModel.value.mid;

    AgreeVisible.value = true;
    // console.log(selectedKey.value);

    const address: any = await getDefaultAddress(formModel.value.mid);
    addressInfoText.value = address.addressInfo;
    agreeModel.addressId = address.addressId;
    // console.log(address.addressId);
    // const req = {
    //   roid: selectedKey.value.join(','),
    //   addressId: address.addressId,
    //   mid: formModel.value.mid,
    // };
    // const { data } = await refundAgree(req);
    // Message.success('批量操作退货成功');
    search();
  };
  const handleBeforeAgressRefund = async (done: any) => {
    // const address: any = await getDefaultAddress(formModel.value.mid);

    // console.log(address.addressId);
    agreeModel.roid = selectedKey.value.join(',');
    agreeModel.mid = formModel.value.mid;

    const { data, code } = await refundAgree(agreeModel);
    if (code === 200) {
      Message.success('批量操作退货成功');
      resetModel(2);
    }
    window.setTimeout(() => {
      done();
    }, 300);
  };
  const handleClick = async (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '订单备注';
      editModel.value.order_id = row.oid;
      editModel.value.type = 2;
      formVisible.value = true;
    } else if (type === 3) {
      formVisible.value = false;
      orderDetail.value = row;
      visible.value = true;
    } else {
      formVisible.value = false;
      const { data } = await getQrcode({});
      qrcodeValue.value = data.url;
      qrcodeToken.value = data.token;

      checkSph();
    }
  };
  const handleBeforeRejcet = async (done: any) => {
    const { data } = await refundReject(rejectOrder);
    Message.success({
      content: '拒绝成功',
      duration: 5 * 1000,
    });
    search();
    window.setTimeout(() => {
      done();
    }, 300);
  };
  const formRef = ref<FormInstance>();
  const closeVisible = () => {
    window.setTimeout(() => {
      addressVisible.value = false;
    }, 300);
  };
  const refundAddressChange = (val: any) => {
    console.log(val);
    addressInfoText.value = val.addressInfo;
    if (singleAgreeVisible.value) {
      singleAgreeModel.addressId = val.addressId;
    } else {
      agreeModel.addressId = val.addressId;
    }
    window.setTimeout(() => {
      addressVisible.value = false;
    }, 300);
  };
  const handleBeforeAgressSingleRefund = async (done: any) => {
    console.log(singleAgreeModel);
    const { data, code } = await refundAgree(singleAgreeModel);
    if (code === 200) {
      Message.success({
        content: '成功同意退货',
        duration: 5 * 1000,
      });
      resetModel(1);
      search();
    }

    window.setTimeout(() => {
      done();
    }, 300);
  };
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 1) {
      // editModel.value.sphId = Number(editModel.value.sphId);
      // editModel.value.costPrice = Number(editModel.value.costPrice);
      // const { data } = await importProduct(editModel.value);
      // Message.success({
      //   content: "添加成功",
      //   duration: 5 * 1000
      // });
      // search();
    } else {
      const { data } = await orderEdit(editModel.value);
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
  const handleCancel = () => {
    formVisible.value = false;
  };
  const handleCancelReject = () => {
    rejectVisible.value = false;
  };
  const handleCancelSingleAgree = () => {
    singleAgreeVisible.value = false;
  };
  const handleCancelAgree = () => {
    AgreeVisible.value = false;
  };
  const handleCancelDrawer = () => {
    visible.value = false;
  };
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    // :deep(.arco-pagination-total) {
    //   display: none;
    // }
  }

  :deep .arco-table-th {
    background: #f2f5ff;
    height: 60px;
    border-radius: 4px;
    font-weight: 500;
    color: #535353;
    border-bottom: none !important;
  }

  .container {
    height: 100%;
    padding: 0 17px 17px 17px;
    background: #f7f9ff;
  }

  .title {
    font-size: 20px;
    color: #2d2d2d;
    font-weight: 500;
    display: flex;
    align-items: center;
    // margin-bottom: 32px;
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

  :deep.arco-input-wrapper {
    background: #f2f5ff;
    border-radius: 4px;
    height: 32px;
  }
  :deep .arco-picker {
    height: 32px;
    background: #f2f5ff;
    border-radius: 4px;
  }
  :deep.arco-input-number {
    height: 32px;
  }
  .arco-row-align-start {
    align-items: center;
  }
  .labelText {
    // width: 80px;
    // height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3f3f3f;
    white-space: nowrap;
    line-height: 15.4px;
  }
  :deep .arco-select-view-single {
    background: #f2f5ff;
    border-radius: 4px;
    height: 32px;
  }
  .mark {
    position: absolute;
    top: 0%;
    left: 0;

    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.7);

    .iconBox {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
    }
  }
  // /deep/ .arco-statistic-value {
  //   font-size: 16px !important;
  //   color: #535353 !important;
  // }
  .box_bcw {
    padding: 20px 17px;
    border-radius: 12px;
    background: #fff;
    margin-bottom: 12px;
  }
  .shopInfo {
    text-align: left;
    .shopName {
      display: flex;
    }
    .goodsName {
      :deep(.arco-typography) {
        display: flex;
        align-items: center;
        margin-bottom: 0;
      }
    }
  }
  .gridBox {
    margin-bottom: 12px;
    display: grid;
    gap: 12px;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    .numBox2 {
      width: 100%;
      // height: 68.13px;
      background: #fff;
      border-radius: 8px;
      // padding: 31px 23px;
      padding: 7px 7px;
      .titleBox {
        display: flex;
        align-items: center;
        font-size: 12px !important;
        line-height: 1 !important;
        color: #6f6f6f;
        // font-weight: 500;
        .y {
          width: 8.4px;
          height: 8.4px;
          margin-right: 4.2px;
        }
      }
      .n {
        padding-left: 7px;
        margin-top: 7px;
        font-size: 18px !important;
        font-weight: 700;
        line-height: 1 !important;
        font-family: DINAlternate-Bold, DINAlternate;
        font-variant: tabular-nums;
        font-feature-settings: 'tnum';
      }
    }
  }
  .arco-drawer {
    background-color: #eaeaea;
  }
  :deep(.arco-drawer-body) {
    background-color: #eaeaea;
  }
  .gridBoxOrder {
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr;
    width: 100%;
    height: 100%;
    .borderBox {
      .orderDetailBox {
        border-radius: 6px;
        border: 1px solid #eaeaea;
        min-height: 100px;
        padding: 10px;
        .title {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .contentBox {
          display: flex;
          justify-content: space-between;
          .leftImg {
            width: 80px;
            height: 80px;
            flex-shrink: 0;
          }
          .infoContent {
            width: 100%;
            padding-left: 10px;
            .liBox {
              display: flex;
              // align-items: center;
              justify-content: space-between;
              .content_l {
                width: 75%;
              }
              .content_r {
                :deep(.arco-typography) {
                  margin-bottom: 0;
                }
              }
              .content_label {
                width: 80px;
              }
            }
          }
        }
      }
    }
  }
</style>
