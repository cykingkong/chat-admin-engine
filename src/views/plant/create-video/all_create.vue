<template>
  <div class="container">
    <Breadcrumb :items="['投流管理', '批量发布视频']" />
    <input id="moliCors" type="hidden" />

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
          <a-alert v-if="!extVisable" type="error"
            >使用批量发布视频功能，请<a-link
              style="font-size: 14px !important; padding: 0"
              @click="getLinkHref"
              >下载魔力智投插件</a-link
            >

            <template #icon> <icon-info-circle-fill /> </template>
          </a-alert>

          <a-card
            title="发布视频信息"
            :bordered="false"
            :style="{ width: '100%' }"
          >
            <a-form
              ref="formJcRef"
              auto-label-width
              :model="reqVfModel.engineInfo"
              style="width: 520px"
            >
              <a-form-item
                field="sphAideId"
                label="发布号"
                :rules="[{ required: true, message: '请选择发布号' }]"
                :validate-trigger="['change', 'input']"
              >
                <template #label>
                  <a-space :size="3">
                    发布号
                    <a-tooltip title="">
                      <icon-question-circle-fill />

                      <template #content>
                        <p>选择要创建发布素材的视频号</p>
                      </template>
                    </a-tooltip>
                  </a-space>
                </template>
                <a-select
                  v-model="reqVfModel.engineInfo.sphAideId"
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
                  />
                </a-select>
                <a-button type="primary" size="small" @click="herfLogin()">
                  登录发布号
                </a-button>
              </a-form-item>

              <a-form-item
                field="createNum"
                label="创建数量"
                :rules="[{ required: true, message: '请填写创建数量' }]"
                :validate-trigger="['change', 'input']"
              >
                <template #label>
                  <a-space :size="3">
                    创建数量
                    <a-tooltip title="">
                      <icon-question-circle-fill />

                      <template #content>
                        <p>指的是同一篇视频上传审核多少份</p>
                      </template>
                    </a-tooltip>
                  </a-space>
                </template>
                <a-input-number
                  v-model="reqVfModel.engineInfo.createNum"
                  placeholder="请填写创建数量"
                  :min="1"
                  :max="5"
                />
              </a-form-item>

              <a-form-item
                field="videoArr"
                label="加热视频"
                :rules="[{ required: true, message: '请上传加热视频' }]"
                :validate-trigger="['input']"
              >
                <a-space>
                  <a-textarea
                    v-model="filePathsStr"
                    style="min-height: 70px; min-width: 440px"
                    auto-size
                    allow-clear
                    placeholder="点击上传素材视频"
                    readonly
                    @clear="clearFilePaths"
                  />
                  <a-space
                    direction="vertical"
                    style="min-width: 100px; text-align: center"
                  >
                    <div>
                      <a-button
                        type="primary"
                        :disabled="buttonVisable"
                        @click="OpenExtFiles"
                        >上传视频</a-button
                      >
                    </div>
                    <span v-if="filePathsArr.length > 0" style="font-size: 12px"
                      >已选择{{ filePathsArr.length }}个视频</span
                    >
                  </a-space>
                </a-space>
              </a-form-item>

              <a-form-item field="taskNum" label="视频封面">
                <a-upload
                  list-type="picture-card"
                  action="/"
                  tip="自动生成封面"
                  :limit="1"
                  image-preview
                  :custom-request="customRequest"
                  @change="onChangeFile"
                />
              </a-form-item>

              <a-form-item field="objDescDescriptionArr" label="视频描述">
                <a-space direction="vertical" :size="0">
                  <a-space>
                    <a-radio-group
                      v-model="reqVfModel.engineInfo.useTemp"
                      :disabled="descDisabled"
                    >
                      <a-radio :value="0">不使用模版</a-radio>
                      <a-radio :value="1">使用模版</a-radio>
                    </a-radio-group>
                    <a-button
                      v-if="reqVfModel.engineInfo.useTemp === 0"
                      type="primary"
                      size="mini"
                      :disabled="descDisabled"
                      @click="handleGpClick(1)"
                      >新增模板</a-button
                    >
                  </a-space>
                  <a-space
                    v-if="reqVfModel.engineInfo.useTemp === 1"
                    style="margin-top: 10px"
                  >
                    <a-select
                      v-model="descTempId"
                      :disabled="descDisabled"
                      allow-search
                      placeholder="可输入模板进行搜索"
                      clear
                      style="min-width: 180px"
                      @search="serachDescTemp"
                    >
                      <a-option
                        v-for="(item, key) in descTempList"
                        :key="key"
                        style="min-width: 180px"
                        :value="item.tempId"
                        @click="
                          descTempInfoArr = JSON.parse(item.descriptionArr);
                          descTempName = item.tempName;
                        "
                        >{{ item.tempName }}</a-option
                      >
                    </a-select>
                    <a-button
                      type="primary"
                      :disabled="descDisabled"
                      size="mini"
                      @click="handleGpClick(1)"
                      >新增模板</a-button
                    >

                    <a-button
                      type="primary"
                      :disabled="descDisabled"
                      size="mini"
                      @click="handleGpClick(2)"
                      >保存模板</a-button
                    >
                    <a-button
                      type="primary"
                      :disabled="descDisabled"
                      status="danger"
                      size="mini"
                      @click="handleGpClick(3)"
                      >删除模板</a-button
                    >
                  </a-space>

                  <a-space direction="vertical" style="margin-top: 10px">
                    <a-space
                      v-for="(info, key) in descTempInfoArr"
                      :key="key"
                      style="min-width: 460px"
                    >
                      <span style="font-size: 12px; min-width: 40px"
                        >描述{{ key + 1 }}:</span
                      >
                      <a-input
                        v-model:model-value="descTempInfoArr[key].value"
                        placeholder="请输入视频描述"
                        style="min-width: 420px"
                        :disabled="descDisabled"
                      />
                      <a-button
                        v-if="key + 1 === 1"
                        type="primary"
                        shape="circle"
                        @click="
                          descTempInfoArr.push({
                            key: descTempInfoArr.length + 1,
                            value: '',
                          })
                        "
                      >
                        <template #icon>
                          <icon-plus />
                        </template>
                      </a-button>

                      <a-button
                        v-if="key + 1 > 1"
                        type="primary"
                        status="danger"
                        shape="circle"
                        @click="descTempInfoArr.splice(key, 1)"
                      >
                        <template #icon> <icon-minus /> </template>
                      </a-button>
                    </a-space>
                  </a-space>

                  <a-radio-group
                    v-model="reqVfModel.engineInfo.videoDescriptionType"
                    style="margin-top: 10px"
                    :change="
                      (descDisabled =
                        reqVfModel.engineInfo.videoDescriptionType === 3)
                    "
                  >
                    <a-radio :value="1">循环使用描述</a-radio>
                    <a-radio :value="2">随机使用描述</a-radio>
                    <a-radio :value="3">使用视频名称作为描述</a-radio>
                  </a-radio-group>
                </a-space>
              </a-form-item>

              <a-form-item label="加热商品">
                <a-input
                  v-model="checkProductName"
                  readonly
                  :disabled="!hasProducts"
                  placeholder="选择商品"
                  @click="handleClickChoosePro"
                ></a-input>
              </a-form-item>

              <a-form-item label="发布时间">
                <a-radio-group v-model="reqVfModel.engineInfo.publishType">
                  <a-radio :value="1">立即发布</a-radio>
                  <a-radio :value="2">定时发布</a-radio>
                </a-radio-group>
                <a-date-picker
                  v-if="reqVfModel.engineInfo.publishType === 2"
                  v-model="reqVfModel.engineInfo.publishTimerDate"
                  show-time
                  :disabled-date="diabledDate"
                />
              </a-form-item>

              <a-form-item label="是否加热">
                <a-radio-group :default-value="1" :disabled="true">
                  <a-radio :value="1">仅发布视频</a-radio>
                  <a-radio :value="2">发布视频并加热</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="确认信息" :bordered="false" :style="{ width: '100%' }">
            <a-list style="margin-bottom: 30px">
              <a-list-item
                ><span style="font-size: 18px; font-weight: 500"
                  >创建数量： </span
                ><span> {{ reqVfModel.engineInfo.createNum }}个</span>
              </a-list-item>
            </a-list>
            <a-button
              type="primary"
              shape="round"
              size="large"
              long
              :disabled="createTaskVisible"
              @click="createTask()"
              >创建任务
            </a-button>
          </a-card>
        </a-col>
      </a-row>
    </div>

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
          v-if="formGpModel.type === 1 || formGpModel.type === 2"
          field="name"
          label="模板名称"
          :rules="[{ required: true, message: '请填写模板名称' }]"
        >
          <a-input v-model="formGpModel.name" />
        </a-form-item>
        <span v-if="formGpModel.type === 3">
          您确定删除 {{ formGpModel.name }} 模板吗
        </span>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="tipsVisible"
      width="420px"
      title="提示"
      @ok="handleTipsOk"
    >
      <div>{{ tipsDesc }}</div>
    </a-modal>

    <a-modal
      v-model:visible="chooseProductVisible"
      :mask-closable="false"
      ok-text="添加"
      width="1000px"
      title="选择商品"
    >
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
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    sphAideGrid,
    ExtInfo,
    describeTempAdd,
    describeTempEdit,
    describeTempDel,
    describeTempGrid,
    openFiles,
    aideVideoTaskAdd,
    extUpload,
    checkProduct,
    getAllProduct,
  } from '@/api/sph-aide';

  const router = useRouter();

  const reqVformModel = () => {
    return {
      engineInfo: {
        sphAideId: null,
        sphId: null,
        createNum: 1,
        videoPath: null,
        coverFrameUrl: null,
        videoDescriptionArr: null,
        aideDescriptionId: null,
        videoDescriptionType: 1,
        useTemp: 0,
        publishType: 1,
        publishTimer: null,
        publishTimerDate: null,
        createPlantJson: '{}',
        productCode: null,
      },
    };
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
  const reqVfModel = ref(reqVformModel());

  const diabledDate = (current: any) => {
    return dayjs(current).isBefore(dayjs());
  };
  const sphGridList = ref<any>([]);
  const checkProductName = ref('');
  const filePathsArr = ref<any>([]);
  const filePathsStr = ref<any>(null);
  const extVisable = ref<boolean>(false);
  const proComeData = ref([]);
  const proComeDataLoding = ref(false);
  const chooseProductVisible = ref(false);
  const uin = ref('');
  const selectedProductKeys = ref<any>();
  const imagesFile = ref<any>();
  const imagesFileList = ref<any>();
  const descTempList = ref<any>([]);
  const descTempId = ref(null);
  const descTempName = ref('');
  const buttonVisable = ref(false);
  const ExtLink = ref('');
  const descTempInfo = ref<any>({
    value: '',
    key: '',
  });
  const descTempInfoArr = ref<any>([
    {
      value: '',
      key: 1,
    },
  ]);

  const hasProducts = ref<boolean>(false);
  const descDisabled = ref<boolean>(false);
  const tipsVisible = ref<boolean>(false);
  const createTaskVisible = ref<boolean>(false);
  const tipsDesc = ref('');
  const handleClickChoosePro = async () => {
    if (!reqVfModel.value.engineInfo.sphAideId) {
      Message.warning({
        content: '请先选择发布号',
        duration: 3 * 1000,
      });
      return;
    }
    getAllProductData();
    chooseProductVisible.value = true;
  };

  const getLinkHref = () => {
    window.open(
      `${ExtLink.value}?time=${dayjs().unix()}`
      // `https://img.adyinqing.com/ext/%E9%AD%94%E5%8A%9B%E6%99%BA%E6%8A%95_windows_386.exe?time=${dayjs().unix()}`
    );
    // return `https://img.adyinqing.com/ext/%E9%AD%94%E5%8A%9B%E6%99%BA%E6%8A%95_windows_386.exe?time=${dayjs().unix()}`;
  };
  const serachDescTemp = async (params: any) => {
    const { data } = await describeTempGrid({
      pageIndex: 1,
      pageSize: 200,
      name: params,
    });

    descTempList.value = data.grid || [];
  };
  serachDescTemp('');

  const formGpVisible = ref(false);
  const formGpTitle = ref('新建分组');
  const formGpModel = ref({ name: null, type: 1 });
  const formGpRef = ref<FormInstance>();

  const handleGpClick = async (type: any) => {
    if (type === 1) {
      formGpTitle.value = '新增模版';
    } else if (type === 2) {
      formGpTitle.value = '保存模版';
    } else {
      formGpTitle.value = '删除模板';
    }
    formGpModel.value.name = descTempName.value;
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
      const { data } = await describeTempAdd({
        tempId: descTempId.value,
        tempName: formGpModel.value.name,
        descriptionArr: JSON.stringify(descTempInfoArr.value),
      });
      Message.success('新增成功');
    } else if (formGpModel.value.type === 2) {
      if (descTempId.value === null) {
        const { data } = await describeTempAdd({
          tempId: descTempId.value,
          tempName: formGpModel.value.name,
          descriptionArr: JSON.stringify(descTempInfoArr.value),
        });
      } else {
        const { data } = await describeTempEdit({
          tempId: descTempId.value,
          tempName: formGpModel.value.name,
          descriptionArr: JSON.stringify(descTempInfoArr.value),
        });
      }
      Message.success('修改成功');
    } else if (formGpModel.value.type === 3) {
      if (descTempId.value === null) {
        Message.info('请选择要删除的模板');
        return;
      }
      const { data } = await describeTempDel({
        tempId: descTempId.value,
      });
      descTempId.value = null;
      Message.success('删除成功');
    }
    serachDescTemp('');

    // formGpModel.value.name = null;
    window.setTimeout(() => {
      done();
    }, 300);
  };

  const clickSphAide = async (item: any) => {
    const { data } = await checkProduct({ sphId: item.sphId });
    console.log(data);
    if (data.data.hasProducts === 1) {
      hasProducts.value = true;
      getAllProductData();
    }
  };
  const getAllProductData = async () => {
    proComeDataLoding.value = true;
    const data = await getAllProduct({
      sphId: reqVfModel.value.engineInfo.sphAideId,
    });
    proComeDataLoding.value = false;
    data.data.data.products.forEach((el: any, k: any) => {
      el.key = k + 1;
    });
    proComeData.value = data.data.data.products;
  };

  const productCheck = (record: any, ev: any) => {
    selectedProductKeys.value = [];
    selectedProductKeys.value.push(record.key);
    checkProductName.value = record.title;
    reqVfModel.value.engineInfo.productCode = record.productId;
    // reqModel.value.engineInfo.videoInfo.shoppingcartJumpinfo.productId =
    //   record.productId;
    // reqModel.value.engineInfo.videoInfo.shoppingcartJumpinfo.wording =
    //   record.title;
    // console.log(123123, record, ev, selectedProductKeys.value);
  };

  const customRequest = (option: any) => {
    const { onProgress, onError, onSuccess, fileItem, name } = option;

    onSuccess('');
  };
  const onChangeFile = (fileList: any, file: any) => {
    imagesFile.value = file;
  };
  const herfLogin = () => {
    router.push({
      name: 'sphList',
      query: {
        key: 2,
      },
    });
  };

  const sphGridSearch = async (params: any) => {
    const { data } = await sphAideGrid({
      pageIndex: 1,
      pageSize: 100,
      sphName: params,
    });

    sphGridList.value = data.grid;
    ExtLink.value = data.extUrl;
  };
  const clearFilePaths = () => {
    filePathsArr.value = [];
    filePathsStr.value = '';
  };
  const OpenExtFiles = async () => {
    buttonVisable.value = true;
    await CheckExtInfo();
    if (!extVisable.value) {
      Message.error('请安装或启动插件');
      buttonVisable.value = false;
      return;
    }

    try {
      const { data } = await openFiles({});

      // 判断数组filePathsArr.value长度，若大于10，则取前10
      if ([...filePathsArr.value, ...data.filePaths].length > 10) {
        filePathsArr.value = [...filePathsArr.value, ...data.filePaths].slice(
          0,
          10
        );
        filePathsStr.value = filePathsArr.value.join('\n');
        buttonVisable.value = false;
        reqVfModel.value.engineInfo.videoPath = filePathsArr.value;
        Message.info('最多上传10个视频');
        return;
      }
      if (data.filePaths) {
        reqVfModel.value.engineInfo.videoPath = filePathsArr.value;
        filePathsArr.value = [...filePathsArr.value, ...data.filePaths];
        filePathsStr.value = filePathsArr.value.join('\n');
      }
    } catch (error) {
      console.log(error);
    }
    buttonVisable.value = false;
  };
  const CheckExtInfo = async () => {
    try {
      await ExtInfo({});
      extVisable.value = true;
    } catch (error) {
      extVisable.value = false;
    }
  };
  const CheckExtTimer = async () => {
    await CheckExtInfo();
    setTimeout(() => {
      CheckExtTimer();
    }, 1000);
  };
  const createTask = async () => {
    await CheckExtInfo();
    if (!extVisable.value) {
      Message.warning('请安装或启动插件');
      return;
    }
    if (!reqVfModel.value.engineInfo.sphAideId) {
      Message.warning({
        content: '请先选择发布号',
        duration: 3 * 1000,
      });
      return;
    }
    if (filePathsArr.value.length === 0) {
      Message.warning('请上传视频文件');
      return;
    }

    createTaskVisible.value = true;

    if (reqVfModel.value.engineInfo.publishTimerDate) {
      reqVfModel.value.engineInfo.publishTimer = dayjs(
        reqVfModel.value.engineInfo.publishTimerDate
      ).unix();
    }

    reqVfModel.value.engineInfo.videoDescriptionArr = JSON.stringify(
      descTempInfoArr.value
    );
    reqVfModel.value.engineInfo.aideDescriptionId = descTempId.value;

    const { data } = await aideVideoTaskAdd({
      ...reqVfModel.value.engineInfo,
    });
    localStorage.setItem('videoTask', JSON.stringify(reqVfModel.value));

    if (imagesFile.value) {
      // console.log('imagesFile', imagesFile.value);
      // localStorage.setItem('imagesFile', JSON.stringify(imagesFile.value));

      const formData = new FormData();
      formData.append('imagesFile', imagesFile.value.file);
      formData.append('uploadData', data.taskInfo);
      extUpload(formData);
    } else {
      extUpload({
        uploadData: data.taskInfo,
      });
    }

    tipsVisible.value = true;
    // tipsDesc.value = '创建批量发布视频任务成功，您可以前往任务列表支付搭建的加热计划';

    tipsDesc.value = '创建批量发布视频任务成功，您可以前往任务列表查看任务详情';
    createTaskVisible.value = false;
  };

  const handleTipsOk = () => {
    router.push({
      name: 'videoTaskGrid',
    });
  };
  const initStorage = () => {
    if (localStorage.getItem('videoTask')) {
      const videoTask = JSON.parse(localStorage.getItem('videoTask'));
      // 缓存内创建数量大于5 直接改成5
      if (Number(videoTask.engineInfo.createNum) > 5) {
        videoTask.engineInfo.createNum = 5;
      }

      reqVfModel.value = videoTask;
      console.log(JSON.parse(videoTask.engineInfo.videoDescriptionArr));
      if (videoTask.engineInfo.videoDescriptionArr) {
        descTempInfoArr.value = JSON.parse(
          videoTask.engineInfo.videoDescriptionArr
        );
      }

      filePathsArr.value = videoTask.engineInfo.videoPath;
      filePathsStr.value = videoTask.engineInfo.videoPath.join('/n');
    }
    // if (localStorage.getItem('imagesFile')) {
    //   imagesFile.value = JSON.parse(localStorage.getItem('imagesFile'));
    // }
  };
  initStorage();
  const initData = () => {
    sphGridSearch(null);
    CheckExtTimer();
    // packageGridSearch(null);
    // groupGridSearch(null);
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
