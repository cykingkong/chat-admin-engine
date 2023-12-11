<template>
  <div>
    <!-- 商品列表 -->
    <a-spin :loading="goodsLoading" style="width: 100%">
      <div class="list">
        <a-card v-for="(item, index) in goodsData" class="li" hoverable>
          <div class="img">
            <img :src="item.productHeadImg" />
            <a-button
              class="leftButton"
              type="outline"
              @click="applyProduct(item)"
              >申请定向推广</a-button
            >

            <a-trigger
              trigger="click"
              show-arrow
              @show="getQrCode(item.productId)"
            >
              <a-button class="rightButton" type="outline"> 详情 </a-button>
              <!-- 二维码 -->
              <template #content>
                <div class="demo-arrow">
                  <QrcodeVue
                    :value="qrcodeValue"
                    :size="160"
                    level="H"
                    style="position: relative"
                  />
                  <div class="name">扫码预览商品详情</div>
                </div>
              </template>
            </a-trigger>
          </div>
          <div class="title">{{ item.productName }}</div>
          <div class="money">
            ￥ {{ item.productPrice / 100 }}
            <span>佣金{{ item.ratio }}%</span>
          </div>
          <!-- <div class="num">
					<div class="left">库存10000</div>
					<div class="right">月销999+</div>
				</div> -->
          <a-button type="primary" class="button" @click="addWindow(item)"
            >添加到橱窗</a-button
          >
        </a-card>

        <a-empty v-if="goodsData.length === 0" class="emptylist" />
      </div>
    </a-spin>
    <!-- 翻页  -->
    <div class="pagination">
      <div>
        <a-pagination
          v-model:current="pagination.pageIndex"
          v-model:page-size="pagination.pageSize"
          :total="Number(pagination.total)"
          :show-total="true"
          :show-page-size="true"
          :page-size="pageSize"
          :page-size-options="[12, 20, 50, 100, 200]"
          @change="onPageChange"
          @page-size-change="pageSizeChange"
        />
      </div>
    </div>

    <a-modal
      v-model:visible="windowsVisible"
      title="添加商品至橱窗"
      :width="950"
      :mask-closable="false"
      :hide-cancel="true"
      ok-text="关闭"
    >
      <ListAide :product-id="checkProductId"></ListAide>
    </a-modal>

    <a-modal
      v-model:visible="applyVisible"
      title="申请定向推广"
      :width="650"
      :mask-closable="false"
      @before-ok="applyProductOk"
    >
      <a-form
        ref="formJcRef"
        :model="applyReqModel"
        auto-label-width
        style="width: 420px"
      >
        <a-form-item
          field="sphAideId"
          label="发布号"
          :rules="[{ required: true, message: '请选择发布号' }]"
          :validate-trigger="['change', 'input']"
        >
          <template #label>
            <a-space :size="3">
              视频号
              <a-tooltip title="">
                <icon-question-circle-fill />
                <template #content>
                  <p>需要前往魔力PC视频号管理-登录视频号助手账号</p>
                </template>
              </a-tooltip>
            </a-space>
          </template>
          <a-select
            v-model:model-value="applyReqModel.sphAideId"
            v-model:input-value="applyReqModel.select"
            placeholder="可输入视频号名称或备注名进行搜索"
            :allow-search="{ retainInputValue: true }"
            allow-clear
            style="margin-right: 10px"
            @search="sphGridSearch"
          >
            <a-option
              v-for="(item, key) in sphGridList"
              :key="key"
              :label="item.sphName"
              :value="item.sphId"
              @click="clickSphAide(item)"
            >
              <a-badge :color="item.sphStatus === 1 ? 'green' : 'red'">
              </a-badge>
              {{ item.sphName }}
            </a-option>
          </a-select>
          <a-button type="primary" size="small" @click="herfLogin()">
            登录视频号
          </a-button>
        </a-form-item>

        <a-form-item
          field="ratio"
          label="申请佣金率"
          :rules="[{ required: true, message: '请填写申请佣金率' }]"
          :validate-trigger="['change', 'input']"
          ><template #label> 申请佣金率 </template>
          <a-input-number
            v-model="applyReqModel.ratio"
            placeholder="请填写申请佣金率"
            :min="0"
            :max="90"
          />
        </a-form-item>

        <a-form-item
          field="pickerTimer"
          label="推广结束时间"
          :rules="[{ required: true, message: '请填写推广结束时间' }]"
          :validate-trigger="['change', 'input']"
        >
          <template #label> 推广结束时间 </template>
          <a-date-picker
            v-model="applyReqModel.pickerTimer"
            class="datePicker"
            show-time
            shortcuts-position="left"
            :shortcuts="shortcuts"
            :value-format="'timestamp'"
            :preview-shortcut="false"
            :popup-container="`body`"
            :disabled-date="(current) => dayjs(current).isBefore(dayjs())"
            :format="
              (value) =>
                `${
                  dayjs(value).valueOf() === forerver
                    ? '永久'
                    : dayjs(value).format('YYYY-MM-DD HH:mm:ss')
                }`
            "
            @change="pickerTimerChange"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  //* ************js与组件引用**************
  import {
    ref,
    onMounted,
    reactive,
    nextTick,
    defineProps,
    watch,
    toRef,
  } from 'vue';
  import { getGoodsGrid, setAddWindow, setApplyGoods } from '@/api/merchantApi';
  import { number } from 'echarts/core';
  import { sphAideGrid } from '@/api/sph-aide';
  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { Message, Modal } from '@arco-design/web-vue';
  import { fun } from '@/utils/num';
  import copy from '@/utils/copy';
  import QrcodeVue from 'qrcode.vue';
  import { useRouter } from 'vue-router';
  import ListAide from './list-aide.vue';
  //* ************变量/数据**************
  // 加载条
  const loading = ref(true);
  // 翻页参数
  const pagination = ref({
    current: 1,
    pageIndex: 1,
    pageSize: 12,
    total: 0,
  });
  const qrcodeValue = ref();
  // 申请列表数据
  const goodsData = ref([]);
  // 接收外部数据
  const props = defineProps({
    formModel: {
      type: [Object],
    },
  });
  const goodsLoading = ref(false);
  // 多选id列表
  const idList = ref([]);
  // 拒绝原因
  const rejectMsg = ref('');
  // 拒绝原因的弹窗
  const rejectWindow = ref(false);
  // 通过、拒绝申请的id
  const applyRequestId = '';

  const forerver = ref(
    dayjs(dayjs().add(1, 'day').format('YYYY-MM-DD')).valueOf() + 9999
  );
  const shortcuts = [
    {
      label: '永久',
      value: Number(forerver.value),
    },
  ];
  const windowsVisible = ref(false);
  const applyVisible = ref(false);
  const checkProductId = ref(0);
  // 路由
  const router = useRouter();

  // 视频号助手
  const sphGridList = ref<any>([]);
  const applyReqModel = ref({
    id: 0,
    ratio: undefined,
    sphAideId: undefined,
    endTime: 0,
  });
  const pickertimeLabel = ref('永久');
  const pickerTimerChange = (value: any) => {
    // applyReqModel.value.endTime = '永久';
    if (value === forerver.value) {
      applyReqModel.value.endTime = 0;
    } else {
      applyReqModel.value.endTime = value / 1000;
    }
    console.log(value, 6545646, applyReqModel.value);
  };
  //* ************监听、钩子、定向**************
  // 监听筛选数据
  watch(props.formModel, (newValue: any, oldValue: any) => {
    // console.log(777, newValue);
    getGoodsGridList();
  });

  //* ************生命周期**************
  onMounted(() => {
    getGoodsGridList();
  });

  //* ************js方法**************
  // 获取申请列表
  const getGoodsGridList = async () => {
    goodsLoading.value = true;
    try {
      // 请求数据合成
      const params = {
        ...props.formModel,
        pageIndex: pagination.value.pageIndex, // 页面数
        pageSize: pagination.value.pageSize, // 页面量
      };
      const { data } = await getGoodsGrid(params);
      const list = data ? data.grid : '';
      if (list && list.length) {
        // json化 合作达人数据
        // list.forEach((item, index) => {
        // 	//判断有没有 合作达人的数据
        // 	if (item.exclusiveInfo && item.exclusiveInfo != 'null') {
        // 		let t = item.exclusiveInfo.replace(/\\/g, '');
        // 		item.exclusiveInfo = JSON.parse(t)
        // 	}
        // })
        goodsData.value = list;
        pagination.value.total = data.total;
      } else {
        // 列表为空气
        goodsData.value = [];
        pagination.value.total = 0;
      }
    } catch (e) {
      console.log('获取商品列表失败', e);
    }
    goodsLoading.value = false;
  };

  // 切换页数时触发
  const onPageChange = (e) => {
    getGoodsGridList();
  };

  // 修改页面数量
  const pageSizeChange = (size: number) => {
    pagination.value.pageIndex = 1;
    pagination.value.pageSize = size;
    goodsData.value = [];
    getGoodsGridList();
  };

  // 生成二维码
  const getQrCode = async (shopId) => {
    console.log('生成二维码', shopId);
    qrcodeValue.value = `https://liteapp.weixin.qq.com/q/ABMNbs?shopId=${shopId}`;
  };

  // 搜索视频号
  const sphGridSearch = async (params: any) => {
    const { data } = await sphAideGrid({
      pageIndex: 1,
      pageSize: 100,
      sphName: params,
    });

    sphGridList.value = data.grid;
  };
  sphGridSearch(null);

  // 显示添加商品到橱窗 弹窗
  const addWindow = (item: any) => {
    windowsVisible.value = true;
    checkProductId.value = item.productId;
  };

  // 显示定向申请弹窗
  const applyProduct = (item: any) => {
    applyVisible.value = true;
    checkProductId.value = item.productId;
    applyReqModel.value.id = item.id;
    // 先清空上一次的缓存
    applyReqModel.value.ratio = '';
    applyReqModel.value.sphAideId = '';
    applyReqModel.value.endTime = 0;
    applyReqModel.value.pickerTimer = '';
    applyReqModel.value.select = '';
    console.log(item.id, applyReqModel.value);
  };
  const formJcRef = ref<FormInstance>();

  // 发起定向申请
  const applyProductOk = async (done: any) => {
    const res = await formJcRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    const { data } = await setApplyGoods(applyReqModel.value);
    Message.success({
      content: '申请成功',
      duration: 5 * 1000,
    });
    window.setTimeout(() => {
      done();
    }, 300);
  };

  // 登录视频号
  const herfLogin = (item: any) => {
    router.push({
      name: 'sphList',
      query: {
        key: 2,
      },
    });
  };

  // 进行广播
  defineExpose({
    getGoodsGridList,
  });
</script>

<style scoped lang="less">
  .list {
    width: 100%;
    padding: 20px 17px;
    border-radius: 12px;
    background: #fff;
    margin-bottom: 12px;
    overflow: hidden;

    .li {
      float: left;
      // width:15.5%;
      width: 235px;
      margin: 0 15px 30px 15px;
      // margin-right:1.4%;
      // margin-bottom:1.4%;

      .img {
        position: relative;
        width: 100%;
        padding-top: 100%;
        height: 0;
        overflow: hidden;
        border: 1px solid var(--color-neutral-3);
        border-radius: 2px;
        margin-bottom: 10px;

        img,
        .leftButton,
        .rightButton {
          position: absolute;
          left: 0;
        }

        img {
          width: 100%;
          height: 100%;
          top: 0;
        }

        .leftButton,
        .rightButton {
          padding: 0 5%;
          bottom: 8px;
          background: #fff;
          transform: translateY(200%);
          transition: all 0.3s;
        }

        .leftButton {
          left: 8px;
        }

        .rightButton {
          left: auto;
          right: 8px;
        }
      }

      .title {
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
        line-height: 26px;
        height: 52px;
        color: #000;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .money {
        width: 100%;
        color: #f00;
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        span {
          font-weight: 200;
          margin-left: 10px;
          padding: 0 5px;
          background: #fa8c16;
          color: #fff;
          font-size: 12px;
          height: 20px;
          display: flex;
          align-items: center;
          border-radius: 2px;
        }
      }

      .num {
        overflow: hidden;
        font-size: 14px;
        margin-bottom: 10px;

        .left {
          float: left;
        }

        .right {
          float: right;
        }
      }

      .button {
        width: 100%;
        height: 40px;
        font-size: 14px;
      }
    }

    .li:nth-child(6n + 0) {
      // margin-right: 0;
    }

    .li:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

      .leftButton,
      .rightButton {
        transform: translateY(0%);
      }
    }
  }

  .demo-arrow {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    text-align: center;

    .name {
      text-align: center;
      margin-top: 10px;
      font-size: 16px;
    }
  }

  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 15px;
  }
  body {
    :deep(.arco-trigger-popup) {
      background: red;
      .arco-picker-footer {
        display: none;
      }
    }
  }
</style>
