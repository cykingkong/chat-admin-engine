<template>
  <div class="container">
    <Breadcrumb :items="['小店管理', '订单列表']" />
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
                      v-for="(item, key) in enumToObject(merchantOrderStatus)"
                      :key="key"
                      :label="item.label"
                      :value="item.value"
                    />
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
                    allow-clear
                    style="width: 100%"
                    :shortcuts="rangeShortcuts"
                    shortcuts-position="left"
                    @change="dateChange"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
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
    <div class="gridBox">
      <div v-for="(el, ky) in orderInfoSumData" :key="ky" class="numBox2">
        <div class="titleBox">
          <img :src="el.url" class="y" alt="" />
          {{ el.t }}

          <a-tooltip v-if="el.tips">
            <icon-question-circle-fill />

            <template #content>
              <p> {{ el.tips }}</p>
            </template>
          </a-tooltip>
        </div>
        <div class="n">
          <span v-if="el.type === 2 && el.n != '-'" class="rmb">¥</span>
          <span>{{ [2, 4].includes(el.type) ? fun(el.n) : el.n }}</span>
          <span v-if="el.type === 4 && el.n != '-'" class="rmb">%</span>
        </div>
      </div>
    </div>
    <a-card class="general-card-upai" style="width: 100%; padding-bottom: 32px">
      <!-- <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1)">
              <template #icon>
                <icon-plus />
              </template>
              添加账号
            </a-button>
          </a-space>
        </a-col>
      </a-row> -->
      <a-table
        row-key="id"
        :sticky-header="true"
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
                      订单ID:<a-typography-text type="secondary">
                        {{ record.orderNo }}
                      </a-typography-text>
                    </a-typography-text>
                  </div>
                </div>
              </a-space>
            </template>
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
                    <div class="appId">
                      <a-typography-text>
                        APPID:<a-typography-text
                          type="secondary"
                          :ellipsis="{
                            rows: 1,
                            showTooltip: true,
                          }"
                        >
                          {{ record.merchantInfo.appid || '-' }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                  </div>
                </a-space>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="商品信息" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-avatar>
                  <img
                    v-if="record.productInfo[0].thumb_img"
                    alt="avatar"
                    :src="record.productInfo[0].thumb_img"
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
                          {{ record.shopTitle || '-' }}
                        </a-typography-text>
                      </a-typography-text>
                    </div>
                  </div>
                </a-space>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="售价/数量" align="center">
            <template #cell="{ record }">
              <a-space>
                <div class="shopInfo">
                  <div class="shopName">
                    <a-typography-text>
                      ¥{{ record.productPrice }}
                    </a-typography-text>
                  </div>
                  <div class="APPID">
                    <a-typography-text type="secondary">
                      x{{ record.productInfo.length }}
                    </a-typography-text>
                  </div>
                </div>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="实付款" align="center">
            <template #cell="{ record }">{{ record.orderPrice }}</template>
          </a-table-column>
          <a-table-column title="收货人信息" align="center">
            <template #cell="{ record }">
              <a-space direction="vertical" style="text-align: left">
                <a-space :size="10">
                  <a-typography-text>
                    {{ record.userName }}
                  </a-typography-text>
                  <a-typography-text>
                    {{ record.telNumber }}
                  </a-typography-text>
                </a-space>
                <a-typography-text
                  :ellipsis="{
                    rows: 1,
                    showTooltip: true,
                  }"
                >
                  {{ record.addressInfo.addressInfo || '-' }}
                </a-typography-text>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="买家留言" align="center">
            <template #cell="{ record }">
              {{ record.customerNotes || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="售后单数" align="center">
            <template #cell="{ record }">
              {{ record.sphLoginAt || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="纠纷反馈" align="center">
            <template #cell="{ record }">
              <a-typography-text
                v-if="record.reorder && record.reorder.complaintId !== '0'"
                type="primary"
                style="cursor: pointer"
                @click="handleClickhistory(record)"
              >
                查看详情
              </a-typography-text>
              <a-typography-text v-else> 无 </a-typography-text>
            </template>
          </a-table-column>
          <a-table-column title="下单/支付时间" align="center">
            <template #cell="{ record }">
              <a-space direction="vertical">
                <a-typography-text>
                  下单：
                  {{
                    record.prepayTime
                      ? dayjs(record.prepayTime * 1000).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                      : '-'
                  }}
                </a-typography-text>
                <a-typography-text>
                  支付：
                  {{
                    record.payTime
                      ? dayjs(record.payTime * 1000).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                      : '-'
                  }}
                </a-typography-text>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="发货时间" align="center">
            <template #cell="{ record }">
              <a-space direction="vertical">
                <a-typography-text>
                  发货：
                  {{
                    record.shipDoneTime
                      ? dayjs(record.shipDoneTime * 1000).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                      : '-'
                  }}
                </a-typography-text>
              </a-space></template
            >
          </a-table-column>

          <a-table-column
            align="center"
            title="操作"
            data-index="operations"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-button
                type="text"
                size="small"
                @click="handleClick(3, record)"
              >
                订单详情
              </a-button>
              <a-button
                type="text"
                size="small"
                @click="handleClick(2, record)"
              >
                备注
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
                    <a-typography-text type="secondary">
                      ¥{{
                        orderDetail.priceInfo.freight || '0'
                      }}</a-typography-text
                    >
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
                      {{ orderDetail.addressInfo.user_name }}
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
                      {{ orderDetail.addressInfo.tel_number }}
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
                      {{ orderDetail.addressInfo.addressInfo }}
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="orderDetail.deliveryProductInfo.length" class="borderBox">
          <div class="orderDetailBox">
            <div class="title"> 物流信息 </div>
            <div class="contentBox">
              <div class="infoContent">
                <div class="liBox">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      快递公司
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{ orderDetail.deliveryProductInfo[0].delivery_name }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      快递单号
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{ orderDetail.deliveryProductInfo[0].waybill_id }}
                    </a-typography-text>
                  </div>
                </div>
                <div class="liBox" style="margin-top: 10px">
                  <div class="content_label">
                    <a-typography-text type="secondary">
                      发货时间
                    </a-typography-text>
                  </div>
                  <div class="content_r">
                    <a-typography-text>
                      {{
                        orderDetail.deliveryProductInfo[0].delivery_time
                          ? dayjs(
                              orderDetail.deliveryProductInfo.delivery_time
                            ).format('YYYY-MM-DD HH:mm:ss')
                          : '-'
                      }}
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
      v-model:visible="showQrcodeVisible"
      width="auto"
      :footer="false"
      :simple="true"
      hide-cancel
    >
      <template #title> 添加视频号</template>
      <a-card class="general-card">
        <a-space :size="16" direction="vertical" fill>
          <a-space
            direction="vertical"
            fill
            style="text-align: center; position: relative"
          >
            <QrcodeVue
              :value="qrcodeValue"
              :size="200"
              level="H"
              style="position: relative"
            />

            <div v-if="qrcodeScan" class="mark">
              <div class="iconBox">
                <icon-check-circle-fill style="color: rgb(0, 180, 42)" />
                <!-- <br /> -->
                <span
                  style="
                    font-size: 16px;
                    color: #1d2129;
                    font-weight: bold;

                    display: block;
                  "
                >
                  扫码成功</span
                >
              </div>
            </div>

            <a-tag color="green">请用微信APP扫描二维码</a-tag>
          </a-space>
        </a-space>
      </a-card>
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
    <a-modal v-model:visible="historyVisible" title="历史反馈信息" width="40%">
      <!-- <HistoryList :complaint-id="complaintId" /> -->
      <a-scrollbar style="height: 600px; overflow: auto">
        <a-empty v-if="!historyData.length">
          <template #image>
            <icon-exclamation-circle-fill />
          </template>
          暂无回复记录!
        </a-empty>
        <a-steps :current="current" direction="vertical">
          <a-step
            v-for="(item, key) in historyData"
            :key="key"
            :title="`${itemType[item.item_type]}`"
          >
            <template #description>
              <div class="contentLi">
                <a-typography-text type="secondary"> 时间： </a-typography-text>
                <a-typography-text>
                  {{
                    item.time
                      ? dayjs
                          .unix(item.time)
                          .format('YYYY-MM-DD HH:mm:ss')
                          .toString()
                      : ''
                  }}
                </a-typography-text>
              </div>
              <div class="descriptionBox">
                <a-space direction="vertical" fill>
                  <div v-if="item.item_type === 50" class="contentLi">
                    <a-typography-text type="secondary">
                      售后类型：
                    </a-typography-text>
                    <a-typography-text>
                      {{ item.after_sale_type === 1 ? '仅退款' : '退货退款' }}
                    </a-typography-text>
                  </div>
                  <div v-if="item.mediaList.length" class="contentLi">
                    <a-typography-text type="secondary">
                      图片：
                    </a-typography-text>
                    <a-space>
                      <!-- <img
                      v-for="(e, k) in item.mediaList"
                      :key="k"
                      :src="e"
                      alt=""
                    /> -->
                      <a-image
                        v-for="(e, k) in item.mediaList"
                        :key="k"
                        width="200"
                        :src="e"
                      />
                    </a-space>
                  </div>
                  <div v-if="item.item_type === 50" class="contentLi">
                    <a-typography-text type="secondary">
                      售后原因：
                    </a-typography-text>
                    <a-typography-text>
                      {{ afterSaleReason[item.after_sale_reason] }}
                    </a-typography-text>
                  </div>
                  <div v-if="item.item_type === 50" class="contentLi">
                    <a-typography-text type="secondary">
                      联系方式：
                    </a-typography-text>
                    <a-typography-text>
                      {{ item.phone_number }}
                    </a-typography-text>
                  </div>
                  <div class="contentLi">
                    <a-typography-text type="secondary">
                      回复内容：
                    </a-typography-text>
                    <a-typography-text>
                      {{ item.content || '-' }}
                    </a-typography-text>
                  </div>
                </a-space>
              </div>
            </template>
          </a-step>
        </a-steps>
      </a-scrollbar>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { getQrcode, getQrcodeStatus, sphEdit, sphGrid } from '@/api/sph';
  import {
    orderGrid,
    orderEdit,
    orderGridData,
    merchantGrid,
    mediaIdGetImg,
    complaintOrderInfo,
  } from '@/api/merchantApi';
  import dayjs from 'dayjs';
  import {
    itemType,
    sphType,
    sphStatus,
    useStatus,
    enumToObject,
    merchantOrderStatus,
    afterSaleReason,
  } from '@/utils/enum';
  import QrcodeVue from 'qrcode.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Pagination } from '@/types/global';
  import { useUserStore } from '@/store/index';

  const orderDetail = ref<any>({});
  const merchantList = ref<any>([]);
  const historyData = ref<any[]>([]);

  const orderInfoSumData = ref<any>([
    {
      t: '实付金额',
      key: 'payPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
      tips: '实际已付款总金额(包含退款订单金额)',
    },
    {
      t: '实付订单数',
      key: 'payOrderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      tips: '实际已付款订单总数(包含退款订单数)',
      type: 1,
    },
    {
      t: '成交商品件数',
      key: 'payProCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 1,
      tips: '实际已付款商品件数(包含退款商品)',
    },
    {
      t: '创单金额',
      key: 'createdPrice',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 2,
      tips: '官方定义为”下单金额“，订单创建成功的金额总数',
    },
    {
      t: '创建订单数',
      key: 'createdOrderCount',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 1,
      tips: '官方定义为”下单订单数“，订单创建成功的订单总数',
    },
    {
      t: '支付转化率',
      key: 'convertRate',
      url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
      n: 0,
      type: 4,
      tips: '支付转化率=实付订单数/创建订单数',
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
    x: 2300,
    y: 500,
  };
  const router = useRouter();

  const formVisible = ref(false);
  const historyVisible = ref(false);
  const showQrcodeVisible = ref(false);
  const refundVisible = ref(false);
  const tableHeaderArr = ref<any[]>([]);

  const sphCode = ref('');
  const qrcodeValue = ref('');
  const qrcodeToken = ref('');
  const qrcodeScan = ref(false);
  const qrcodeStatusTimer = ref<any>();
  // const sphId = ref(0);
  const selectChannelId = ref(0);
  const selectsphId = ref(0);
  const formTitle = ref('修改信息');
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
  const formModel = ref(generateFormModel());
  const visible = ref<boolean>(false);
  const productCode = ref('');

  // page
  const basePagination: Pagination = {
    current: 1,
    pageIndex: 1,
    pageSize: 10,
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
  const getGridData = async (params: any) => {
    const { data } = await orderGridData(params);
    console.log(data);
    orderInfoSumData.value.forEach((e: any) => {
      e.n = data[e.key];
    });
  };
  const getMerchantGrid = async () => {
    const { data } = await merchantGrid(pagination);
    merchantList.value = data.grid;
  };
  // list data
  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await orderGrid(params);
      getMerchantGrid();
      getGridData(params);
      if (data.grid) {
        data.grid.forEach((e: any) => {
          e.addressInfo = JSON.parse(e.addressInfo);
          e.addressInfo.addressInfo =
            e.addressInfo.province_name +
            e.addressInfo.city_name +
            e.addressInfo.county_name +
            e.addressInfo.detail_info;
          e.productInfo = JSON.parse(e.productInfo);
          e.payInfo = JSON.parse(e.payInfo);
          e.deliveryProductInfo = JSON.parse(e.deliveryProductInfo);
          e.priceInfo = JSON.parse(e.priceInfo);
          e.settleInfo = JSON.parse(e.settleInfo);
        });
      }

      renderData.value = data.grid || [];

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

      showQrcodeVisible.value = false;
      qrcodeScan.value = false;

      search();
      return;
    }
    setTimeout(checkSph, 1000);
  };
  const getMedia = (mediaId: any, mid: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const { data } = await mediaIdGetImg({ mediaId, mid });

      // const blob = new Blob([res], { type: 'application/octet-binary' }); // 传入一个合适的MIME类型
      // const url = URL.createObjectURL(blob);
      // console.log(`data:image/png;base64${data.code}`, 'data');

      resolve(`data:image/png;base64,${data.code}`);
    });
  };
  const current = ref(1);
  const mid = ref();
  const handleClickhistory = async (row: any) => {
    // console.log(JSON.parse(row.complaintOrder.history));
    if (row.reorder.complaintId === '0') return;
    mid.value = row.mid;
    const { data } = await complaintOrderInfo({
      mid: row.mid,
      complaintId: row.reorder.complaintId,
    });
    console.log(data.complaintOrderInfo);
    if (data.complaintOrderInfo.errcode === 10021500) {
      // eslint-disable-next-line consistent-return
      Message.error('投诉单号不存在');

      return;
    }
    if (data.complaintOrderInfo.history) {
      historyData.value = data.complaintOrderInfo.history.reverse();
      historyData.value.forEach((el) => {
        el.mediaList = [];
        el.media_id_list.forEach((e) => {
          getMedia(e, row.mid).then((res) => {
            // console.log(res, 'res');
            el.mediaList.push(res);
          });
        });
      });
      current.value = historyData.value.length;
      // console.log(historyData.value);
      historyVisible.value = true;
    }
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

      showQrcodeVisible.value = true;
      checkSph();
    }
  };

  const formRef = ref<FormInstance>();
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
    .appId {
      :deep(.arco-typography) {
        display: flex;
        align-items: center;
        margin-bottom: 0;
      }
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
  .contentLi {
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .descriptionBox {
    padding: 12px 24px;
    background: #f9f9f9;
    border-radius: 8px;
  }
</style>
