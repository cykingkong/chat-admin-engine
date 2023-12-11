<!-- eslint-disable no-plusplus -->
<template>
  <div ref="container" class="container">
    <div class="">
      <t-guide
        v-model="currentGuide"
        :steps="steps"
        hide-prev
        :on-finish="onFinish"
        :on-skip="onSkip"
      />

      <Breadcrumb :items="['投流管理', '投放数据']" />
      <!-- <div class="pageTitle"> 计划投放数据 </div> -->
      <a-row>
        <a-col :flex="1">
          <div class="goodStatusBox">
            <div
              v-for="(item, k) in plantTabList"
              :key="k"
              class="btn tabText"
              :class="{ active: plantTabActive === k }"
              @click="changePlantTab(k)"
            >
              {{ item.name }}
            </div>
          </div>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col
          v-if="plantTabActive !== 0"
          :span="5"
          :xl="{ span: 5 }"
          :xxl="{ span: 4 }"
        >
          <a-card class="general-card-upai2 plantLeftItem" style="width: 100%">
            <a-list
              :hoverable="true"
              :scrollbar="true"
              :bordered="false"
              :max-height="1537"
              @reach-bottom="getTargetTypeData"
            >
              <template #scroll-loading>
                <div v-if="targetTypeBottom">暂无更多数据</div>
                <a-spin v-else />
              </template>
              <a-input-search
                v-model="targetTypeSearch"
                placeholder="请输入名称搜索"
                search-button
                style="margin-bottom: 10px"
                @press-enter="
                  targetTypeData = [];
                  targetTypePageNo = 1;
                  getTargetTypeData();
                "
                @search="
                  targetTypeData = [];
                  targetTypePageNo = 1;
                  getTargetTypeData();
                "
              />
              <a-row
                v-if="plantTabList[plantTabActive].id === 4"
                style="width: 100%; margin-bottom: 12px"
                justify="space-between"
              >
                <!-- <a-col flex="99px">
                  <t-select
                    v-model="targetTypeVideoSort.orderSort"
                    class="dateType"
                    placeholder="时间维度"
                    style="width: 99px; font-size: 12px"
                  >
                    <t-option value="DESC" label="降序" />
                    <t-option value="ASC" label="升序" />
                  </t-select>
                </a-col> -->
                <a-col flex="1">
                  <t-select
                    v-model="targetTypeVideoSort.orderKey"
                    class="dateType"
                    placeholder="排序字段"
                    style="width: 100%; font-size: 12px"
                  >
                    <t-option value="createdAt" label="创建时间" />

                    <t-option value="cost" label="消耗" />
                    <!-- <t-option value="productPlaceorderGmv" label="成交金额" /> -->
                  </t-select>
                </a-col>
              </a-row>
              <a-list-item
                v-for="(item, key) of targetTypeData"
                :key="key"
                :class="{ 'plantTab-select': plantTabCheckIndex === key }"
                style="position: relative"
                @click="plantTabCheck(item, key)"
              >
                <!-- img标签是置顶样式 -->
                <img
                  v-show="item.sort === 9999"
                  src="https://img.adyinqing.com/upai_shop/is7fabir1697525250082"
                  alt=""
                  class="sortTopBg"
                />
                <a-space style="margin-bottom: 10px">
                  <div v-if="plantTabList[plantTabActive].id === 2">
                    <a-space :size="[0, 0]" align="baseline">
                      <div class="nameBox">
                        <a-space>
                          <a-typography-paragraph
                            :bold="item.sort !== 9999"
                            style="margin-bottom: 0"
                          >
                            {{ item.groupName }}
                          </a-typography-paragraph>
                          <icon-edit
                            style="cursor: pointer"
                            @click="handleClickEditGroupName(item)"
                          />
                        </a-space>
                      </div>

                      <a-tooltip
                        :content="item.sort === 9999 ? '取消置顶' : '置顶分组'"
                      >
                        <a-link
                          class="zhiding"
                          style="z-index: 99"
                          @click="zdGroup(item)"
                        >
                          <template #icon>
                            <icon-arrow-fall v-if="item.sort === 9999" />
                            <icon-arrow-rise v-else />
                          </template>
                        </a-link>
                      </a-tooltip>
                    </a-space>
                  </div>

                  <a-typography-paragraph
                    v-if="plantTabList[plantTabActive].id === 3"
                    style="margin-bottom: 0"
                    :ellipsis="{
                      rows: 1,
                      expandable: true,
                    }"
                  >
                    {{ item.goodsName ? item.goodsName : '-' }}
                  </a-typography-paragraph>
                  <a-typography-paragraph
                    v-if="plantTabList[plantTabActive].id === 7"
                    style="margin-bottom: 0"
                    :ellipsis="{
                      rows: 2,
                      expandable: false,
                    }"
                  >
                    {{ item.srName ? item.srName : '-' }}
                  </a-typography-paragraph>

                  <a-space
                    v-if="plantTabList[plantTabActive].id === 5"
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

                  <a-space
                    v-if="plantTabList[plantTabActive].id === 6"
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
                        :image-url="item.videoAvatar"
                      ></a-avatar>
                      <a-space direction="vertical" fill>
                        <a-space>
                          <a-typography-paragraph
                            style="margin-bottom: 0"
                            :ellipsis="{
                              rows: 1,
                              expandable: false,
                            }"
                          >
                            {{ item.videoNickName || '-' }}
                          </a-typography-paragraph>
                          <a-tooltip
                            :content="
                              item.sort === 9999 ? '取消置顶' : '置顶分组'
                            "
                          >
                            <a-link
                              class="zhiding"
                              style="z-index: 99"
                              @click="invGroup(item)"
                            >
                              <template #icon>
                                <icon-arrow-fall v-if="item.sort === 9999" />
                                <icon-arrow-rise v-else />
                              </template>
                            </a-link>
                          </a-tooltip>
                        </a-space>

                        <a-typography-paragraph
                          style="margin-bottom: 0"
                          :ellipsis="{
                            rows: 1,
                            expandable: false,
                          }"
                        >
                          {{ item.signature || '-' }}
                        </a-typography-paragraph>
                      </a-space>
                    </div>
                  </a-space>
                  <a-image
                    v-if="plantTabList[plantTabActive].id === 4"
                    class="plantVideo"
                    :src="item.coverUrl"
                    width="48px"
                    height="64px"
                  />

                  <a-space
                    v-if="plantTabList[plantTabActive].id === 4"
                    direction="vertical"
                    fill
                  >
                    <a-space align="start">
                      <a-typography-paragraph
                        :ellipsis="{
                          rows: 2,
                          expandable: false,
                        }"
                      >
                        {{
                          item.description
                            ? item.description
                            : item.signature
                            ? item.signature
                            : '---'
                        }}
                      </a-typography-paragraph>
                      <a-tooltip
                        :content="item.sort === 9999 ? '取消置顶' : '置顶分组'"
                      >
                        <a-link
                          class="zhiding"
                          style="z-index: 99"
                          @click="videoGroup(item)"
                        >
                          <template #icon>
                            <icon-arrow-fall v-if="item.sort === 9999" />
                            <icon-arrow-rise v-else />
                          </template>
                        </a-link>
                      </a-tooltip>
                    </a-space>

                    <a-typography-paragraph style="font-size: 10px">
                      {{ item.createdAt }}
                    </a-typography-paragraph>
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
        <a-col
          :span="plantTabActive == 0 ? 24 : 19"
          :xl="{ span: plantTabActive == 0 ? 24 : 19 }"
          :xxl="{ span: plantTabActive == 0 ? 24 : 20 }"
        >
          <div ref="hideSearchBar" class="hideSearchBar">
            <a-card class="general-card-upai" style="width: 100%">
              <a-row>
                <a-col :flex="1">
                  <a-form :model="reqModel" auto-label-width label-align="left">
                    <a-row :gutter="16">
                      <a-col :span="8">
                        <a-form-item
                          field="plantName"
                          label="名称搜索"
                          label-col-flex="60px"
                        >
                          <a-input
                            v-model="reqModel.plantName"
                            placeholder="请输入计划名称"
                            allow-clear
                            @press-enter="search"
                          />
                        </a-form-item>
                      </a-col>

                      <a-col :span="8">
                        <a-form-item
                          field="sphId"
                          label="状态搜索"
                          label-col-flex="60px"
                        >
                          <a-select
                            v-model="reqModel.plantStatus"
                            allow-clear
                            placeholder="全部状态"
                          >
                            <a-option
                              v-for="(item, key) in enumToObject(plantStatus)"
                              :key="key"
                              :label="item.label"
                              :value="item.value"
                            />
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <a-col v-if="plantTabActive === 0" :span="8">
                        <a-form-item field="sphId" label-col-flex="80px">
                          <template #label>
                            <div class="labelText">投手号搜索：</div>
                          </template>
                          <a-select
                            v-model="reqModel.sphId"
                            allow-clear
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
                        <a-form-item field="investedId" label-col-flex="80px">
                          <template #label>
                            <div class="labelText">被投号搜索：</div>
                          </template>
                          <a-select
                            v-model="reqModel.investedId"
                            allow-clear
                            placeholder="全部被投号"
                          >
                            <a-option
                              v-for="(item, key) in searchInvestedGrid"
                              :key="key"
                              :label="item.videoNickName"
                              :value="item.id"
                            />
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <a-col v-if="plantTabActive === 0" :span="8">
                        <a-form-item field="packageId" label-col-flex="60px">
                          <template #label>
                            <div class="labelText">计划包：</div>
                          </template>
                          <a-select
                            v-model="reqModel.packageId"
                            allow-search
                            allow-clear
                            placeholder="输入计划包名称进行搜索"
                            @search="packageListSearch"
                            @clear="getPackageList('')"
                          >
                            <a-option
                              v-for="(item, key) in packageList"
                              :key="key"
                              :label="item.packageName"
                              :value="item.packageId"
                            />
                          </a-select>
                        </a-form-item>
                      </a-col>
                      <a-col v-if="plantTabActive === 0" :span="8">
                        <a-form-item
                          field="videoId"
                          label="视频ID搜索"
                          label-col-flex="60px"
                        >
                          <a-input-number
                            v-model="reqModel.videoId"
                            placeholder="请输入视频ID"
                            allow-clear
                            @press-enter="search"
                          />
                        </a-form-item>
                      </a-col>

                      <a-col v-if="plantTabActive === 0" :span="8">
                        <a-form-item
                          field="goodsId"
                          label="商品搜索"
                          label-col-flex="60px"
                        >
                          <a-select
                            v-model="reqModel.goodsId"
                            placeholder="全部商品"
                            allow-search
                            allow-clear
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
                        <a-form-item
                          field="memberDepId"
                          label="所属部门"
                          label-col-flex="60px"
                        >
                          <a-cascader
                            v-model="reqModel.memberDepId"
                            :options="depmentArr"
                            check-strictly
                            allow-clear
                            :field-names="{
                              value: 'memberDepId',
                              label: 'memberDepName',
                            }"
                            placeholder="请选择所属部门"
                            @clear="clearDep"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <a-form-item field="createdTime" label-col-flex="80px">
                          <template #label>
                            <!-- <div class="labelText"></div> -->
                            <a-space>
                              <t-select
                                v-model="reqModel.dateType"
                                class="dateType"
                                placeholder="时间维度"
                                style="width: 99px; font-size: 12px"
                                @change="search()"
                              >
                                <t-option :value="1" label="创建时间" />
                                <t-option :value="2" label="更新时间" />
                              </t-select>
                              <a-tooltip title="">
                                <icon-question-circle style="font-size: 16px" />

                                <template #content>
                                  <p
                                    >更新时间：指的是计划最后一次进行修改或更新的时间(即数据产生了变动，比如：消耗、订单…等等)</p
                                  >
                                  <p
                                    >创建时间：指的是计划创建的时间，不会因为后续的修改而改变</p
                                  >
                                </template>
                              </a-tooltip>
                            </a-space>
                          </template>
                          <a-range-picker
                            v-model="createDate"
                            show-time
                            :default-value="[
                              dayjs()
                                .startOf('date')
                                .format('YYYY-MM-DD HH:mm:ss'),
                              dayjs()
                                .endOf('date')
                                .format('YYYY-MM-DD HH:mm:ss'),
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
                      <a-col v-if="plantTabActive !== 0" :span="8"> </a-col>
                      <a-col v-if="plantTabActive !== 0" :span="8"> </a-col>
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
                              <a-link
                                href="javascript:void(0)"
                                @click="refresh()"
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
                        <a-tooltip v-if="el.tips">
                          <icon-question-circle-fill />
                          <template #content>
                            <p> {{ el.tips }}</p>
                            <p> {{ el.tips2 }}</p>
                          </template>
                        </a-tooltip>
                      </div>
                      <div class="n">
                        <span v-if="el.type === 2 && el.n != '-'" class="rmb"
                          >¥</span
                        ><span>{{ el.type === 2 ? fun(el.n) : el.n }}</span>
                      </div>
                    </div></a-grid-item
                  >
                  <a-grid-item :span="24" style="background: #fff">
                    <DataOverView ref="dataOverView" />
                  </a-grid-item>
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
          </div>
          <a-card
            class="general-card-upai"
            style="width: 100%; padding-bottom: 28px"
          >
            <a-row justify="space-between">
              <a-col flex="250px">
                <a-space :size="18" style="margin-bottom: 10px">
                  <a-button
                    type="primary"
                    class="searchBtn"
                    @click="getAsyncData"
                  >
                    <template #icon> <icon-refresh /> </template>
                    刷新数据
                  </a-button>

                  <a-popconfirm
                    content="确定要关停选中计划？"
                    @ok="plantChanelAll"
                  >
                    <a-button type="primary" class="searchBtn">
                      <template #icon> <icon-settings /></template>
                      关停
                    </a-button>
                  </a-popconfirm>
                  <a-button
                    type="primary"
                    class="searchBtn"
                    @click="showRuleClick(null)"
                  >
                    <template #icon> <icon-settings /></template>
                    自动关停配置
                  </a-button>

                  <a-button
                    type="primary"
                    class="searchBtn"
                    @click="showPackageClick()"
                  >
                    <template #icon> <icon-settings /></template>
                    添加到计划包
                  </a-button>

                  <a-button
                    type="primary"
                    class="searchBtn"
                    @click="showGroupClick()"
                  >
                    <template #icon> <icon-settings /></template>
                    添加到分组
                  </a-button>
                  <a-popconfirm
                    :content="delPlantTipsText"
                    :popup-visible="delVisible"
                    ok-text="确认删除"
                    @popup-visible-change="popupChange"
                    @ok="handleClickDel(null)"
                  >
                    <a-button type="primary" status="danger">删除计划</a-button>
                  </a-popconfirm>

                  <t-dropdown :min-column-width="88" trigger="hover">
                    <a-button type="primary" status="success" class="searchBtn">
                      <template #icon> <icon-unordered-list /></template>
                      <a-space>
                        导出
                        <icon-down />
                      </a-space>
                    </a-button>
                    <t-dropdown-menu>
                      <t-dropdown-item
                        :value="1"
                        :divider="true"
                        @click="exportExcelModal()"
                      >
                        <a-button type="text" style="width: 100%">
                          导出
                        </a-button>
                      </t-dropdown-item>

                      <t-dropdown-item :value="2" @click="openExcelList">
                        <a-button type="text" style="width: 100%">
                          报表列表
                        </a-button>
                      </t-dropdown-item>
                    </t-dropdown-menu>
                  </t-dropdown>
                </a-space>
              </a-col>
              <a-col flex="60px">
                <a-space :size="18" style="margin-bottom: 10px">
                  <a-button
                    type="primary"
                    class="setTable"
                    @click="customColumnsVisable = true"
                  >
                    <template #icon>
                      <icon-settings />
                    </template>
                    自定义列表
                  </a-button>
                </a-space>
              </a-col>
            </a-row>

            <t-table
              v-model:displayColumns="displayColumns"
              row-key="plantId"
              drag-sort="col"
              :data="renderData"
              :header-affixed-top="true"
              :max-height="1000"
              :columns="plantColumns"
              :loading="loading"
              :pagination="pagination"
              :bordered="false"
              table-layout="fixed"
              :on-display-columns-change="disPlayColumnsChange"
              @select-change="selectionChange"
              @sort-change="sorterChange"
              @page-change="onPageChange"
            >
              <template #plantNameId="{ row }">
                <a-space direction="vertical" fill>
                  <a-typography-paragraph
                    style="margin-bottom: 10px"
                    :ellipsis="{
                      rows: 1,
                      expandable: false,
                    }"
                  >
                    <div class="name">
                      <span
                        class="ove"
                        :class="row.plantCode == row.plantName ? '' : 'big'"
                        >{{ row.plantName || '-' }}</span
                      >
                      <span
                        v-if="row.plantCode == row.plantName"
                        class="official iconfont"
                      >
                        <span class="icon-shipinhao"></span>官方
                      </span>
                      <!-- <a-tooltip content='同步官方创建的计划'>
						   <span class="official iconfont icon-tongji">123</span>
					   </a-tooltip> -->
                    </div>
                  </a-typography-paragraph>

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
                    width="40px"
                    height="50px"
                    style="width: 40px; height: 50px"
                  />

                  <a-space direction="vertical" fill :size="3">
                    <a-typography-paragraph
                      :ellipsis="{
                        rows: 1,
                        expandable: true,
                      }"
                    >
                      {{
                        row.goodsInfo
                          ? row.goodsInfo.goodsName
                          : row.videoInfo.signature
                          ? row.videoInfo.signature
                          : '-'
                      }}
                    </a-typography-paragraph>

                    <div
                      class="proCode"
                      style="display: flex; align-items: center"
                    >
                      ID:
                      <a-typography-paragraph copyable style="margin-bottom: 0">
                        {{ row.videoId || '-' }}
                      </a-typography-paragraph></div
                    >

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
              <template #indemnifyVoucherAmountRoi="{ row }">
                {{ row.indemnifyVoucherAmountRoi || '-' }}
              </template>
              <template #op="{ row }">
                <a-space direction="vertical" fill>
                  <a-tooltip v-if="row.errorMsg" :content="row.errorMsg">
                    <a-tag :color="plantStatusColor[row.plantStatus]">
                      <template #icon>
                        <icon-exclamation-circle-fill style="color: #fff" />
                      </template>
                      {{ plantStatus[row.plantStatus] || '-' }}
                    </a-tag>
                  </a-tooltip>
                  <a-tag v-else :color="plantStatusColor[row.plantStatus]">
                    {{ plantStatus[row.plantStatus] || '-' }}
                  </a-tag>

                  <a-space>
                    <a-popconfirm
                      v-if="[2, 5, 101].includes(row.plantStatus)"
                      type="warning"
                      :content="'确定要关停【' + row.plantName + '】计划吗?'"
                      @ok="plantChanel(row)"
                    >
                      <a-link @click="plantChanelId = row.plantId">关停</a-link>
                    </a-popconfirm>
                    <a-link
                      v-if="row.plantStatus === 1"
                      status="success"
                      @click="toPay(row)"
                      >支付</a-link
                    >
                    <a-link @click="jumpTask(row)">复投</a-link>

                    <a-link @click="getOrderInfo(row)">详情</a-link>
                  </a-space>
                </a-space>
              </template>
              <template #process="{ row }">
                <a-progress
                  :percent="Number(fun(row.cost / row.estimatedWecoinAmount))"
                  :style="{ width: '50%' }"
                />
              </template>
              <template #cancelPlant="{ row }">
                <a-space direction="vertical">
                  <a-space>
                    <a-switch v-model="row.shutdownSwitch" disabled />
                    <a-link @click="showRuleClick(row)">
                      <template #icon>
                        <icon-edit />
                      </template>
                    </a-link>
                  </a-space>

                  <span>{{ shutdownStatus[row.shutdownStatus] }}</span>
                </a-space>
              </template>
              <template #voucherQuota="{ row }">
                {{ row.voucherQuota || '-' }}
              </template>
              <template #noCostTime="{ row }">
                <a-space direction="vertical">
                  <span>{{
                    row.noCostTime ? getTimes(row.noCostTime) : 0
                  }}</span>
                </a-space>
              </template>
              <template #createdCancelTime="{ row }">
                <a-space direction="vertical">
                  <span>创建：{{ row.createdAt }}</span>
                  <span>关闭：{{ row.cancelTime || '-' }}</span>
                </a-space>
              </template>
              <template #startEndTime="{ row }">
                <a-space direction="vertical">
                  <span>开始：{{ row.startTime || '-' }}</span>
                  <span>结束: {{ row.endTime || '-' }}</span>
                </a-space>
              </template>
              <template #startCostTime="{ row }">
                <a-space direction="vertical">
                  <span>{{ row.startCostTime || '-' }}</span>
                </a-space>
              </template>
              <template #newMemberDepName="{ row }">
                <a-space direction="vertical">
                  <span>{{ row.newMemberDepName || '-' }}</span>
                </a-space>
              </template>
              <template #indemnifyVoucherAmount="{ row }">
                <a-space>
                  <span>{{
                    row.indemnifyVoucherAmount
                      ? `¥${row.indemnifyVoucherAmount / 100}`
                      : '-' || '-'
                  }}</span>
                </a-space>
              </template>
              <template #indemnifyVoucherIntoAmount="{ row }">
                <a-space>
                  <span>{{ row.indemnifyVoucherIntoAmount || '-' }}</span>
                </a-space>
              </template>
              <template #indemnifyVoucherStatus="{ row }">
                <span>{{
                  indemnifyVoucherStatus[row.indemnifyVoucherStatus] || '-'
                }}</span>
              </template>
              <template #indemnifyTs="{ row }">
                <span>{{
                  row.indemnifyTs
                    ? dayjs.unix(Number(row.indemnifyTs)).format('YYYY-MM-DD')
                    : '-' || '-'
                }}</span>
              </template>
            </t-table>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <a-modal
      v-model:visible="formPackageVisible"
      title="添加到计划包"
      @cancel="formPackageVisible = false"
      @before-ok="formPackageOk"
    >
      <a-form
        ref="formPackageRef"
        :model="formPackageModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="packageType"
          label="选择计划包"
          :rules="[{ required: true, message: '请选择计划包' }]"
        >
          <a-radio-group v-model="formPackageModel.packageType">
            <a-radio :value="1">创建新计划包</a-radio>
            <a-radio :value="2">选择已有计划包</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="formPackageModel.packageType === 2"
          field="packageId"
          label="选择计划包"
          :rules="[{ required: true, message: '请选择计划包' }]"
        >
          <a-select
            v-model="formPackageModel.packageId"
            placeholder="请选择计划包"
          >
            <a-option
              v-for="(item, key) in packageData"
              :key="key"
              :label="item.packageName"
              :value="item.packageId"
            />
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="formPackageModel.packageType === 1"
          field="addName"
          label="计划包名称"
          :rules="[{ required: true, message: '请填写计划包名称' }]"
        >
          <a-input v-model="formPackageModel.addName" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="formClassVisible"
      title="添加到分组"
      @cancel="formClassVisible = false"
      @before-ok="formClassOk"
    >
      <a-form
        ref="formClassRef"
        :model="formClassModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="groupType"
          label="选择分组"
          :rules="[{ required: true, message: '请选择分组' }]"
        >
          <a-radio-group v-model="formClassModel.groupType">
            <a-radio :value="1">创建新分组</a-radio>
            <a-radio :value="2">选择已有分组</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="formClassModel.groupType === 2"
          field="groupId"
          label="选择分组"
          :rules="[{ required: true, message: '请选择分组' }]"
        >
          <a-select v-model="formClassModel.groupId" placeholder="请选择分组">
            <a-option
              v-for="(item, key) in groupData"
              :key="key"
              :label="item.groupName"
              :value="item.groupId"
            />
          </a-select>
        </a-form-item>

        <a-form-item
          v-if="formClassModel.groupType === 1"
          field="addName"
          label="分组名称"
          :rules="[{ required: true, message: '请填写分组名称' }]"
        >
          <a-input v-model="formClassModel.addName" />
        </a-form-item>
      </a-form>
    </a-modal>

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

    <a-modal
      v-model:visible="showRuleVisible"
      width="700px"
      title="自动关停配置"
      @before-ok="handleRuleBeforeOk"
    >
      <a-form ref="formJcRef" auto-label-width :model="shutdownModel">
        <a-form-item label="已选中">
          <span>共{{ checkPlantArr.length }}条计划</span>
        </a-form-item>

        <a-form-item label="自动关停开启">
          <a-switch v-model="shutdownModel.shutdownStatus" />
        </a-form-item>
        <a-form-item label="自动关停策略">
          <a-select
            v-model="shutdownModel.shutdownSetId"
            placeholder="请选择自动关停策略"
            multiple
            readonly
            :limit="10"
            @change="shutdownRuleChange"
          >
            <a-option
              v-for="(item, key) in shutdownRuleList"
              :key="key"
              :label="item.srName"
              :value="item.srId"
            />
          </a-select>
        </a-form-item>
        <a-form-item label="新建关停策略">
          <a-button type="primary" @click="handleGpClick(1, null)">
            <template #icon>
              <icon-plus />
            </template>
            创建关停策略
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="groupNameEditVisible"
      title="修改分组名称"
      width="500px"
      @cancel="groupNameEditVisible = false"
      @before-ok="handleGpBeforeGroupNameEditOk"
    >
      <a-form ref="formGpNameRef" :model="groupModel" :auto-label-width="true">
        <a-form-item
          field="name"
          label="分组名称"
          :rules="[{ required: true, message: '请填写分组名称' }]"
        >
          <a-input v-model="groupModel.name" placeholder="请填写分组名称" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="formGpVisible"
      :title="formGpTitle"
      width="832px"
      @cancel="formGpVisible = false"
      @before-ok="handleGpBeforeOk"
    >
      <a-form ref="formGpRef" :model="formGpModel" :auto-label-width="true">
        <a-form-item
          field="name"
          label="关停策略名称"
          :rules="[{ required: true, message: '请填写关停策略名称' }]"
        >
          <a-input v-model="formGpModel.name" />
        </a-form-item>

        <a-form-item
          field="name"
          label="自动关停条件"
          :rules="[{ required: true, message: '请填写关停策略名称' }]"
        >
          <a-row :gutter="8">
            <a-col :span="6">
              <a-form-item
                field="firstType"
                validate-trigger="input"
                :rules="[{ required: true, message: '请选择类型' }]"
                no-style
              >
                <a-select
                  v-model="formGpModel.firstType"
                  @change="changeGpName"
                >
                  <a-option
                    v-for="(item, key) in enumToObject(ruleType)"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                field="firstVal"
                :rules="[{ required: true, message: '填写对应值' }]"
                no-style
              >
                <a-space>
                  <a-input
                    v-model="formGpModel.firstVal"
                    @change="changeGpName"
                  />
                  <span> {{ formGpTypeUnit[formGpModel.firstType] }},</span>
                </a-space>
              </a-form-item>
            </a-col>

            <a-col :span="4">
              <a-form-item
                field="flagType"
                :rules="[{ required: true, message: '请选择类型' }]"
                no-style
              >
                <a-select v-model="formGpModel.flagType" @change="changeGpName">
                  <a-option
                    v-for="(item, key) in enumToObject(ruleFlagType)"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="6">
              <a-form-item
                field="secondType"
                validate-trigger="input"
                :rules="[{ required: true, message: '请选择类型' }]"
                no-style
              >
                <a-select
                  v-model="formGpModel.secondType"
                  @change="changeGpName"
                >
                  <a-option
                    v-for="(item, key) in enumToObject(ruleType)"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                field="secondVal"
                :rules="[{ required: true, message: '填写对应值' }]"
                no-style
              >
                <a-space>
                  <a-input
                    v-model="formGpModel.secondVal"
                    @change="changeGpName"
                  />
                  <span> {{ formGpTypeUnit[formGpModel.secondType] }}</span>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-typography-text type="secondary">
            提示：<br />
            “并且” 代表两个条件同时满足才触发自动关停 <br />
            “或者” 代表两个条件只需满足其中一个就会触发自动
          </a-typography-text>
        </a-form-item>
      </a-form>
    </a-modal>
    <ExportList ref="exportList"></ExportList>

    <a-drawer
      :width="980"
      :visible="orderInfoVisible"
      mask-closable
      :footer="false"
      :header="false"
      @cancel="orderInfoVisible = false"
    >
      <template #title> </template>
      <a-spin :loading="orderInfoLoading" style="width: 100%">
        <div v-if="orderInfo">
          <a-descriptions style="margin-top: 10px; padding-left: 10px">
            <template #title>
              <span> 计划名称: {{ orderInfo.plantName }}</span>
            </template>
            <a-descriptions-item label="ID">{{
              orderInfo.plantCode
            }}</a-descriptions-item>
            <a-descriptions-item label="投放金额"
              >¥{{ orderInfo.estimatedWecoinAmount / 10 }}</a-descriptions-item
            >

            <a-descriptions-item label="数据更新时间">{{
              orderInfo.updatedAt
            }}</a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin: 0" />

          <a-tabs
            default-active-key="1"
            style="margin-top: 10px; width: 940px"
            size="large"
            lazy-load
          >
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
                    {{ orderInfo.videoInfo.description || '-' }}
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
                    {{
                      orderInfo.goodsInfo ? orderInfo.goodsInfo.goodsName : '-'
                    }}
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

              <!-- <a-row :gutter="[55, 0]">
                <a-col :flex="1">
                  <div class="chartBox" style="width: 100%">
                    <DataChart ref="dataChart" />
                  </div>
                </a-col>
              </a-row> -->
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
              <a-row v-if="orderInfoHotMsg.length" :gutter="[55, 0]">
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
                            showTooltip: true,
                          }"
                        >
                          {{ item.value || '-' }}
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
                      >
                        <template #label>
                          <a-space>
                            {{ item.label }}
                            <a-tooltip>
                              <icon-question-circle-fill />
                              <template #content>
                                <p> {{ item.tips }}</p>
                              </template>
                            </a-tooltip>
                          </a-space>
                        </template>
                        <a-typography-paragraph
                          style="max-width: 250px"
                          :ellipsis="{
                            rows: 1,
                            expandable: item.expandable,
                          }"
                        >
                          {{ item.value || '-' }}
                        </a-typography-paragraph>
                      </a-descriptions-item>
                    </a-descriptions>
                  </div>
                </a-col>
              </a-row>
              <a-row :gutter="[55, 0]">
                <a-col :flex="1">
                  <div class="upai_content">
                    <div class="title"> 补贴信息 </div>

                    <a-descriptions
                      style="margin-top: 10px; padding-left: 10px"
                      :column="2"
                      :data="indemnifyData"
                    >
                      <template #title> </template>
                      <a-descriptions-item
                        v-for="(item, key) in indemnifyData"
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
                          {{ item.key === 'indemnifyVoucherAmount' ? '¥' : '' }}
                          {{ item.value || '-' }}
                          <!-- <img
                            v-show="item.key === 'indemnifyVoucherAmount'"
                            src="https://img.adyinqing.com/upai_shop/nm4pmvv91690358218990"
                            alt=""
                            class="wx_dou_icon"
                            style="margin-left: 8px"
                          /> -->
                        </a-typography-paragraph>
                      </a-descriptions-item>
                    </a-descriptions>
                  </div>
                </a-col>
              </a-row>
              <a-row justify="end">
                <a-col flex="60px">
                  <a-space>
                    <!-- <a-button type="primary" @click="jumpTask(orderInfo)">
                      复投
                    </a-button> -->
                    <a-popconfirm
                      :content="delPlantTipsText"
                      :popup-visible="delSingleVisible"
                      ok-text="确认删除"
                      @popup-visible-change="popupChangeSingle"
                      @ok="handleClickDel(orderInfo.plantId)"
                    >
                      <a-button type="primary" status="danger"
                        >删除计划</a-button
                      >
                    </a-popconfirm>
                  </a-space>
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
                      {{
                        record.createUser == -2
                          ? '个人/系统'
                          : record.createUser == 0
                          ? '系统'
                          : '管理员'
                      }}
                    </template></a-table-column
                  >
                </template>
              </a-table>
            </a-tab-pane>

            <a-tab-pane key="3" title="阶段数据" style="padding-left: 10px">
              <a-scrollbar style="height: 800px; overflow: auto">
                <a-table
                  :pagination="false"
                  :hoverable="true"
                  :stripe="false"
                  :loading="orderStageLoading"
                  :data="orderStageData"
                  :scroll="scrollTable"
                  :bordered="false"
                >
                  <template #columns>
                    <a-table-column title="时间" align="center" :width="220">
                      <template #cell="{ record }">
                        {{ record.createdAt }}
                      </template>
                    </a-table-column>
                    <a-table-column
                      title="消耗金额"
                      align="center"
                      data—index="cost"
                      :width="240"
                    >
                      <a-table-column
                        :title="averageCostText"
                        align="center"
                        data—index="cost"
                        :width="240"
                      >
                        <template #cell="{ record }">
                          {{ record.cost }}
                        </template>
                      </a-table-column>
                    </a-table-column>
                    <a-table-column title="阶段消耗" align="center">
                      <template #cell="{ record }">
                        {{ record.stageCost }}
                      </template>
                    </a-table-column>
                    <a-table-column title="阶段订单" align="center">
                      <template #cell="{ record }">
                        {{ record.stageOrderCount }}
                      </template>
                    </a-table-column>
                    <a-table-column title="阶段GMV" align="center">
                      <template #cell="{ record }">
                        {{ record.stageGmv }}
                      </template>
                    </a-table-column>
                    <a-table-column title="阶段点击" align="center">
                      <template #cell="{ record }">
                        {{ record.stageClick }}
                      </template>
                    </a-table-column>
                    <a-table-column title="点击成本" align="center">
                      <template #cell="{ record }">
                        {{ fun2(record.stageCost / record.stageClick) }}
                      </template>
                    </a-table-column>
                    <a-table-column title="成交ROI" align="center">
                      <template #cell="{ record }">
                        {{ fun2(record.productPlaceorderGmv / record.cost) }}
                      </template>
                    </a-table-column>
                    <a-table-column title="佣金ROI" align="center">
                      <template #cell="{ record }">
                        {{
                          fun2(
                            (record.productPlaceorderGmv * (record.yjl / 100)) /
                              record.cost
                          )
                        }}
                      </template>
                    </a-table-column>
                  </template>
                </a-table>
                <div class="pagination">
                  <div>
                    <a-pagination
                      v-model:current="stagePagination.pageIndex"
                      v-model:page-size="stagePagination.pageSize"
                      :total="stagePagination.total"
                      :show-total="true"
                      :show-page-size="true"
                      :page-size="stagePagination.pageSize"
                      @change="onStagePageChange"
                    />
                  </div>
                </div>
              </a-scrollbar>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-spin>
    </a-drawer>
    <LoginSphModal ref="loginSphModal"></LoginSphModal>
    <!-- 自定义列表 -->
    <CustomColumns
      v-model:custom-columns-visable="customColumnsVisable"
      v-model:display-columns="displayColumns"
      v-model:admange-columns-ref="plantColumns"
      :columns="plantColumns"
      :sys-default-columns="plantColumnsData"
      :render-columns="renderPlantColumns"
      :find-key-name-columns="findKeyNamePlantColumns"
      :group="plantColumnsGroupRef"
      :default-columns="plantDefaultColumnsRef"
      @updateColumns="updateColumns"
    />
    <!-- <a-modal
      v-model:visible="loginQrcodeVisible"
      width="auto"
      :footer="false"
      :simple="true"
      hide-cancel
    >
      <template #title> 登录加热平台账号</template>
      <a-card class="general-card">
        <a-space :size="16" direction="vertical" fill>
          <a-space direction="vertical" fill align="center">
            <div class="qrCodeBox">
              <QrcodeVue :value="qrcodeValue" :size="200" level="H" />
              <div v-if="qrcodeScan" class="mark">
                <div class="iconBox">
                  <icon-check-circle-fill style="color: rgb(0, 180, 42)" />
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
            </div>

            <a-tag color="green">请用微信APP扫描二维码</a-tag>
          </a-space>
        </a-space>
      </a-card>
    </a-modal> -->
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    reactive,
    ref,
    toRefs,
    nextTick,
    h,
    compile,
    onMounted,
    toRef,
    watch,
  } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Pagination } from '@/types/global';
  import useLoading from '@/hooks/loading';
  import dayjs from 'dayjs';
  import {
    getDepment,
    parentDepInfoReq,
    plantDepInfoReq,
  } from '@/api/settings';
  import {
    videoGrid,
    goodsGrid,
    plantGrid,
    plantGroupGrid,
    plantPackageGrid,
    plantEdit,
    plantInfo,
    plantGridData,
    asyncData,
    plantLogGrid,
    taskInfo,
    investedGrid,
    plantStageGrid,
    plantGroupEdit,
    plantDeleted,
    investedEdit,
    videoEdit,
    plantPackageGridData,
  } from '@/api/plant';
  import {
    taskStatus,
    enumToObject,
    targetType,
    plantStatus,
    ruleFlagType,
    ruleType,
    shutdownStatus,
    indemnifyVoucherStatus,
  } from '@/utils/enum';
  import {
    shutdownRuleGrid,
    shutdownRuleAdd,
    shutdownRuleEdit,
  } from '@/api/rule';
  import { clearAllChildren } from '@/utils/event';

  import { exportPlantGrid } from '@/api/export';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';
  import QrcodeVue from 'qrcode.vue';
  import _ from 'lodash';
  import { getCustomColumn, setCustomColumn } from '@/api/columns';
  import {
    sphGrid,
    getOrderDetail,
    cancelPromotion,
    getQrcodeStatus,
    getQrcode,
    sphInfo,
  } from '@/api/sph';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { province, city } from '@/utils/address';
  import { EXlsx } from '@/utils/xlsx';
  import { useUserStore } from '@/store';
  import { changeGuidance } from '@/api/user';
  import CustomColumns from '@/components/customColumns/customColumns.vue';
  import {
    plantColumnsGroup,
    plantColumnsData,
    plantColumnsDataS,
    plantDefaultColumns,
  } from './columns';

  import DataOverView from './components/data-overview.vue';
  import DataChart from './components/data-chart.vue';
  import ExportList from './components/export-list.vue';
  import LoginSphModal from './components/login-sph-modal.vue';

  const hideSearchBar = ref();
  const dataOverView = ref<InstanceType<typeof DataOverView>>();
  const dataChart = ref<InstanceType<typeof DataChart>>();
  const exportList = ref<InstanceType<typeof ExportList>>();
  const loginSphModal = ref<InstanceType<typeof LoginSphModal>>();
  const currentGuide = ref(-1);
  const userStore = useUserStore();
  const packageList = ref([]);
  const depmentArr = ref<any[]>([]);
  const customColumnsVisable = ref<boolean>(false);
  const averageCostText = ref('(平均消耗:-/分钟)');
  const plantDefaultColumnsRef = toRef(
    JSON.parse(JSON.stringify(plantDefaultColumns))
  );
  const plantColumnsGroupRef = toRef(
    JSON.parse(JSON.stringify(plantColumnsGroup))
  );
  const displayColumns = ref<string[]>([]);
  const plantColumns = toRef(JSON.parse(JSON.stringify(plantColumnsData)));
  console.log(
    plantColumns.value,
    'renderPlantColumnsrenderPlantColumns',
    plantDefaultColumnsRef.value
  );
  const renderPlantColumns = toRef(plantColumnsDataS);
  const findKeyNamePlantColumns = toRef(plantColumnsDataS);

  const getPackageList = async (packageName?: any) => {
    const req = {
      pageSize: 200,
      pageIndex: 1,
      name: packageName,
    };
    // const promiseArray = [];

    // // eslint-disable-next-line prettier/prettier, no-plusplus
    // for (let i = 0; i < 15; i++) {
    //   // eslint-disable-next-line no-async-promise-executor
    // const promise = new Promise(async (resolve) => {
    // req.pageSize = 200;
    // req.pageIndex = 1;
    const { data } = await plantPackageGrid({
      ...req,
    });
    //     resolve(data.grid);
    //   });

    //   promiseArray.push(promise);
    // }

    // const eData: any = [];
    // await Promise.all(promiseArray).then((res) => {
    //   console.log(res);
    //   res.forEach((el: any) => {
    //     if (el) {
    //       el.forEach((e: any) => {
    //         eData.push(e);
    //       });
    //     }
    //   });
    // });
    if (data.grid) {
      packageList.value = data.grid.map((e: any) => {
        return {
          packageId: `${e.packageId}`,
          packageName: e.packageName,
        };
      });
    }
  };
  getPackageList();
  const packageListSearch = async (value: any) => {
    console.log(value, 'value');
    getPackageList(value);
  };
  const steps = [
    {
      element: '.goodStatusBox',
      title: '多维度分析',
      body: `根据不同维度对计划进行归类，使商家可以更加精准的分析投产结果`,
      placement: 'bottom-right',
      highlightPadding: 4,
    },
    {
      element: '.dateType',
      title: '时间筛选',
      body: () => {
        return h(
          compile(
            `<div>可根据“更新时间”或“创建时间”为维度筛选对应时间的计划</div>
              <div style="margin-top:16px">更新时间：指的是计划最后一次进行修改或更新的时间</div>
              <div>创建时间：指的是计划创建的时间，不会因为后续的修改而改变</div>`
          )
        );
      },
      placement: 'bottom-right',
      highlightPadding: 4,
    },
    {
      element: '.setTable',
      title: '多维度分析',
      body: `支持自定义配置数据维度，商家可根据自己的运营策略进行数据查看`,
      placement: 'top-right',
      highlightPadding: 4,
    },
  ];
  if (userStore.$state.plantDataGuidance === 0) {
    setTimeout(() => {
      currentGuide.value = 0;
    }, 800);
  }
  const onSkip = async () => {
    currentGuide.value = -1;
    const { data } = await changeGuidance({ plantDataGuidance: 1 });
    await userStore.info();
  };
  const onFinish = async () => {
    const { data } = await changeGuidance({ plantDataGuidance: 1 });
    await userStore.info();
  };
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
  const formGpNameRef = ref<FormInstance>();
  const groupModel = reactive({
    groupId: 0,
    name: '',
  });
  const plantStatusColor = [
    '',
    '#7bc616',
    '#165dff',
    '#00b42a',
    '#00b42a',
    '#eb0aa4',
    '#f53f3f',
    '#f53f3f',
    '#f53f3f',
    '#f53f3f',
  ];
  const excelListVisible = ref(false);

  // 添加到分组
  const formClassVisible = ref(false);
  const formClassModel = ref({
    plantId: null,
    groupId: null,
    groupType: 1,
    addName: null,
  });
  const formClassRef = ref<FormInstance>();
  const groupData = ref([]);
  const fetchGroupData = async () => {
    const { data } = await plantGroupGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    groupData.value = data.grid || [];
  };
  fetchGroupData();

  // 添加到计划包
  const formPackageVisible = ref(false);
  const formPackageModel = ref({
    plantId: null,
    packageId: null,
    packageType: 1,
    addName: null,
  });
  const formPackageRef = ref<FormInstance>();
  const packageData = ref([]);
  const fetchPackageData = async () => {
    const { data } = await plantPackageGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    packageData.value = data.grid || [];
  };
  fetchPackageData();

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
  const scrollTable = {
    x: '150%',
  };
  const collapsed = ref(true);
  const showMore = () => {
    collapsed.value = !collapsed.value;
    // console.log(hideSearchBar.value.clientHeight)
    // if (collapsed.value) {
    //   clentHeight.value = '258px';
    // } else {
    //   clentHeight.value = '772px';
    // }
  };
  onMounted(() => {
    // displayColumns.value = plantDefaultColumnsRef.value.fixColums.concat(
    //   plantDefaultColumnsRef.value.defaultColumns
    // );
    initDisplayColumns();
  });
  // 获取用户自定义列表数据 并且进行组装
  const initDisplayColumns = () => {
    getCustomColumn({ type: 1 }).then(({ data }) => {
      console.log(
        data.customColumnValue !== '',
        'disPlayColumns,initDisplayColumns'
      );

      if (data.customColumnValue !== '') {
        const userPlantColumns = JSON.parse(data.customColumnValue);

        displayColumns.value = JSON.parse(
          JSON.stringify([
            ...plantDefaultColumnsRef.value.fixColums,
            ...userPlantColumns,
          ])
        );
        plantDefaultColumnsRef.value.defaultColumns = userPlantColumns;

        // plantDefaultColumnsRef.value.fixColums.concat(userPlantColumns);
        console.log(
          displayColumns.value,
          'displayColumns.value',
          userPlantColumns
        );
      } else {
        // plantDefaultColumnsRef.value.defaultColumns = [];

        // plantColumns.value.forEach((e: any) => {
        //   if (!plantDefaultColumnsRef.value.fixColums.includes(e.colKey)) {
        //     plantDefaultColumnsRef.value.defaultColumns.push(e.colKey);
        //   }
        // });

        // displayColumns.value = plantDefaultColumnsRef.value.fixColums.concat(
        //   plantDefaultColumnsRef.value.defaultColumns
        // );
        displayColumns.value = plantDefaultColumnsRef.value.fixColums.concat(
          plantDefaultColumnsRef.value.defaultColumns
        );
        console.log(
          displayColumns.value,
          'displayColumns.value,false',
          plantColumns
        );
      }
    });
  };

  const getDepArr = async () => {
    try {
      const { data } = await plantDepInfoReq();
      if (data.grid) {
        const beforeClearChildrenArr = clearAllChildren(data.grid) || [];
        // beforeClearChildrenArr数组最前端添加{memberDepId:-1,memberDepName:'全部'}
        beforeClearChildrenArr.unshift({
          memberDepId: -1,
          memberDepName: '全部',
        });
        depmentArr.value = beforeClearChildrenArr;
      } else {
        const beforeClearChildrenArr = [];
        // beforeClearChildrenArr数组最前端添加{memberDepId:-1,memberDepName:'全部'}
        beforeClearChildrenArr.unshift({
          memberDepId: -1,
          memberDepName: '全部',
        });
        depmentArr.value = beforeClearChildrenArr;
      }

      // pagination.current = params.pageIndex;
    } catch (err) {
      // console.log(err);
      // you can report use errorHandler or other
    }
  };
  getDepArr();
  const clentHeight = ref('258px');
  const delVisible = ref<boolean>(false);
  const groupNameEditVisible = ref<boolean>(false);
  const delSingleVisible = ref<boolean>(false);
  const delPlantTipsText = ref('');
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
    pageSize: 30,
    defaultPageSize: 30,
    pageSizeOptions: [10, 30, 50, 100],
    total: 0,
    defaultCurrent: 1,
    page: 1,
  };

  const pagination = reactive({
    ...basePagination,
  });

  const orderStageData = ref([]);
  const orderStageLoading = ref(false);
  const stagePagination = reactive({
    pageIndex: 1,
    pageSize: 50,
    total: 0,
  });
  const generateFormReqModel = () => {
    return {
      startDate: dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      pageIndex: 1,
      pageSize: 10,
      dateType: 2,
      taskStatus: -1,
      memberDepId: -1,
    };
  };

  const fields = ref([]);
  // const plantColumns = ref<any[]>([
  //   {
  //     colKey: 'row-select',
  //     type: 'multiple',
  //     width: 46,
  //     fixed: 'left',
  //     title: '行选择框',
  //   },
  //   {
  //     colKey: 'plantNameId',
  //     title: '计划名称/Id',
  //     width: '200',
  //     fixed: 'left',
  //     align: 'left',
  //   },
  //   {
  //     colKey: 'op',
  //     title: '状态/操作',
  //     width: '220',
  //     fixed: 'left',

  //     align: 'center',
  //   },

  //   {
  //     colKey: 'plantVideo',
  //     title: '被投视频',
  //     width: '250',
  //     align: 'left',
  //   },

  //   {
  //     colKey: 'sphInfo.sphName',
  //     title: '投放号',
  //     width: '150',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'estimatedWecoinAmount',
  //     title: '投放金额',
  //     width: '120',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },

  //   {
  //     colKey: 'process',
  //     title: '消耗比例',
  //     width: '170',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'cost',
  //     title: '消耗金额',
  //     width: '120',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'productOrderCount',
  //     title: '订单数',
  //     width: '100',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'productPlaceorderGmv',
  //     title: '营业额',
  //     width: '100',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'lr',
  //     title: '利润',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'roi',
  //     title: 'ROI',
  //     width: '100',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'yl_roi',
  //     title: '佣金ROI',
  //     width: '125',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'yjl',
  //     title: '佣金率',
  //     width: '100',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'airCost',
  //     title: '空耗值',
  //     width: '120',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'productClickCountPv',
  //     title: '商品点击',
  //     width: '120',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'exposureCount',
  //     title: '浏览',
  //     width: '100',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'targetType',
  //     title: '投放目标',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'wecoinBid',
  //     title: '出价',
  //     width: '100',
  //     align: 'center',
  //     sortType: 'all',
  //     sorter: true,
  //   },
  //   {
  //     colKey: 'duration',
  //     title: '投放时长',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'click_rate',
  //     title: '点击率',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'qan_cost',
  //     title: '千展成本',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'click_cost',
  //     title: '点击成本',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'zh_cost',
  //     title: '转化成本',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'cancelPlant',
  //     title: '自动关停',
  //     width: '100',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'groupInfo.groupName',
  //     title: '所属分组',
  //     width: '140',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'packageInfo.packageName',
  //     title: '所属计划包',
  //     width: '180',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'noCostTime',
  //     title: '无消耗时长',
  //     width: '200',
  //     align: 'center',
  //     sorter: true,
  //     sortType: 'all',
  //   },
  //   {
  //     colKey: 'indemnifyVoucherStatus',
  //     title: '补贴状态',
  //     width: '120',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'indemnifyVoucherAmount',
  //     title: '补贴金额',
  //     width: '120',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'indemnifyVoucherAmountRoi',
  //     title: '补贴ROI',
  //     width: '120',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'indemnifyTs',
  //     title: '补贴时间',
  //     width: '200',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'voucherQuota',
  //     title: '优惠券抵扣',
  //     width: '120',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'updatedAt',
  //     title: '更新时间',
  //     width: '200',
  //     align: 'center',
  //   },

  //   {
  //     colKey: 'createdCancelTime',
  //     title: '创建/关闭时间',
  //     width: '240',
  //   },
  //   {
  //     colKey: 'startEndTime',
  //     title: '加热开始/结束时间',
  //     width: '240',
  //   },
  //   {
  //     colKey: 'startCostTime',
  //     title: '开始消耗时间',
  //     width: '240',
  //     align: 'center',
  //   },
  //   {
  //     colKey: 'newMemberDepName',
  //     title: '所属部门',
  //     width: '140',
  //     align: 'center',
  //   },
  // ]);
  const popupChangeSingle = async (visible: any) => {
    delPlantTipsText.value = '计划删除后无法复原，请确认是否删除';
    console.log(orderInfo.value);
    if (orderInfo.value.cost) {
      delPlantTipsText.value =
        '删除计划中有包含部分数据，删除可能导致投放数据异常，请谨慎操作确认是否删除';
    }
    delSingleVisible.value = visible;
  };
  const popupChange = async (visible: any) => {
    if (checkPlantArr.value.length === 0) {
      Message.info('请先选择需要删除的计划');
      return;
    }
    delPlantTipsText.value = '计划删除后无法复原，请确认是否删除';

    checkPlantArr.value.forEach((e) => {
      const i = _.find(renderData.value, ['plantId', e]);
      if (i.cost !== '-') {
        delPlantTipsText.value =
          '删除计划中有包含部分数据，删除可能导致投放数据异常，请谨慎操作确认是否删除';
      }
      console.log(_.find(renderData.value, ['plantId', e]));
    });
    delVisible.value = visible;
    console.log(checkPlantArr.value);
  };
  const plantColumnsKeyArr = ref<any[]>([]);
  const arrrrr = [
    'estimatedWecoinAmount',
    'process',
    'cost',
    'airCost',
    'targetType',
    'wecoinBid',
    'duration',
    'voucherQuota',
    'productOrderCount',
    'cancelPlant',
    'groupInfo.groupName',
    'packageInfo.packageName',
    'updatedAt',
    'yjl',
    'createdCancelTime',
    'noCostTime',
    'startEndTime',
    'startCostTime',
    'newMemberDepName',
  ];
  // eslint-disable-next-line array-callback-return
  // plantColumns.value.forEach((e) => {
  //   if (e.colKey === 'row-select') {
  //     console.log('45678');
  //   } else {
  //     fields.value.push(e.colKey);
  //   }

  //   if (
  //     !arrrrr.includes(e.colKey) &&
  //     ![
  //       'row-select',
  //       'plantNameId',
  //       'op',
  //       'plantVideo',
  //       'sphInfo.sphName',
  //     ].includes(e.colKey)
  //   ) {
  //     plantColumnsKeyArr.value.push(e.colKey);
  //   }
  // });
  // console.log(JSON.stringify(plantColumnsKeyArr.value));
  const formGpVisible = ref(false);
  const formGpTitle = ref('新建计划包');
  const formGpTypeUnit = ref(['', '元', '元', '元', '小时', '', '', '小时']);

  const reqModel = ref(generateFormReqModel());
  const renderData = ref([]);
  const actionTypeActive = ref(0);
  const orderInfo = ref<any>();
  const checkPlantArr = ref<any>([]);
  const checkPlantSphArr = ref<any>([]);
  const router = useRouter();
  const createDate = ref<any[]>([
    dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
    dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
  ]);

  console.log(router.currentRoute.value.query, 6666);

  // const defaultTimevalue = [
  //   dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
  //   dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
  // ];
  const { taskId } = router.currentRoute.value.query || 0;
  const { packageId, packageCreaedAt } = router.currentRoute.value.query || 0;
  const { videoId } = router.currentRoute.value.query || 0;

  if (Number(taskId) > 0) {
    reqModel.value.taskId = taskId;
  }
  if (Number(packageId) > 0) {
    reqModel.value.packageId = packageId;
  }
  if (Number(videoId) > 0) {
    reqModel.value.videoId = videoId;
  }
  if (Number(packageCreaedAt) > 0) {
    reqModel.value.startDate = dayjs
      .unix(Number(packageCreaedAt))
      .format('YYYY-MM-DD HH:mm:ss');
    createDate.value[0] = dayjs
      .unix(Number(packageCreaedAt))
      .format('YYYY-MM-DD HH:mm:ss');
  }

  const plantTabActive = ref(0);
  const columnControllerVisible = ref(false);
  const showQrcodeVisible = ref(false);
  const loginQrcodeVisible = ref(false);
  const qrcodeScan = ref(false);
  const getQrcodeReqStatus = ref(false);
  const qrcodePayValue = ref('');
  const qrcodeValue = ref('');
  const qrcodeToken = ref('');
  const timer = ref<any>(null);

  const plantChanelId = ref<any>(0);
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
  const targetTypeVideoSort = reactive({
    orderKey: 'createdAt',
    orderSort: 'DESC',
  });
  const plantTabCheckIndex = ref(0);

  const qrcodeStatusTimer = ref<any>();

  const targetTypeSearch = ref('');
  const getTargetTypeData = async () => {
    console.log(targetTypeReq.value, 'targetTypeReq.value');
    if (targetTypeReq.value) {
      return;
    }
    console.log(targetTypeReq.value, 'targetTypeReq.value');

    let data: any = [];
    let res: any = {};
    let reqField = '';
    const pageSize = 20;
    targetTypeReq.value = true;
    switch (plantTabList.value[plantTabActive.value].id) {
      case 4:
        // eslint-disable-next-line no-case-declarations
        res = await videoGrid({
          name: targetTypeSearch.value,
          pageIndex: targetTypePageNo.value,
          orderKey: targetTypeVideoSort.orderKey,
          orderSort: targetTypeVideoSort.orderSort,

          pageSize,
        });
        data = res.data.grid;
        reqField = 'videoId';
        break;
      case 2:
        // eslint-disable-next-line no-case-declarations
        res = await plantGroupGrid({
          name: targetTypeSearch.value,
          pageIndex: targetTypePageNo.value,
          pageSize,
        });
        data = res.data.grid;
        reqField = 'groupId';
        break;
      case 3:
        // eslint-disable-next-line no-case-declarations
        res = await goodsGrid({
          name: targetTypeSearch.value,
          pageIndex: targetTypePageNo.value,
          pageSize,
        });
        data = res.data.grid;
        reqField = 'goodsId';
        break;
      case 5:
        // eslint-disable-next-line no-case-declarations
        res = await sphGrid({
          sphName: targetTypeSearch.value,
          pageIndex: targetTypePageNo.value,
          pageSize,
          sphType: 1,
        });
        data = res.data.grid;
        reqField = 'sphId';
        break;
      case 6:
        // eslint-disable-next-line no-case-declarations
        res = await investedGrid({
          name: targetTypeSearch.value,
          pageIndex: targetTypePageNo.value,
          pageSize,
        });
        data = res.data.grid;
        reqField = 'investedId';
        break;
      case 7:
        // eslint-disable-next-line no-case-declarations
        res = await shutdownRuleGrid({
          name: targetTypeSearch.value,
          pageIndex: targetTypePageNo.value,
          pageSize,
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
        if (key === 0 && targetTypePageNo.value === 1) {
          if (plantTabList.value[plantTabActive.value].id === 6) {
            reqModel.value[reqField] = el.id;
          } else {
            reqModel.value[reqField] = el[reqField];
          }
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
      type: 3,
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
      tips: '截止上一次转化成功(即出单)到目前为止的消耗金额',
      tips2: '例如：计划加热中，消耗金额为500¥、出单为0，则空耗值为500',
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
    // {
    //   t: '关注成本',
    //   key: 'gz_cost',
    //   url: 'https://img.adyinqing.com/upai_shop/sqolvvco1676629138552',
    //   n: 0,
    //   type: 3,
    // },
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
      t: '关注数',
      key: 'followCount',
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
      t: '补贴金额',
      key: 'indemnifyVoucherAmount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 2,
      tips: '即将到账补贴金额',
    },
    // {
    //   t: '已补贴金额',
    //   key: 'indemnifyVoucherIntoAmount',
    //   url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
    //   n: 0,
    //   type: 2,
    //   tips: '',
    // },
    {
      t: '补贴ROI',
      key: 'indemnifyRoi',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 3,
      // tips: '预计补贴ROI=GMV/(投流消耗 - 预计补贴金额)',
      tips: '补贴ROI=GMV/(投流消耗 - 即将到账补贴金额)',
    },
    // {
    //   t: '评论数',
    //   key: 'favCount',
    //   url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
    //   n: 0,
    //   type: 1,
    // },
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
      t: '补贴金额',
      key: 'indemnifyVoucherAmount',
      url: 'https://img.adyinqing.com/upai_shop/9vefp7lc1676629138525',
      n: 0,
      type: 2,
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
    {
      label: '设备:',
      value: '',
      key: 'deviceTypes',
      expandable: false,
    },
    {
      label: '粉丝层:',
      value: '',
      key: 'videoTagArr',
      expandable: false,
    },
  ]);

  const indemnifyData = ref<any[]>([
    {
      label: '补贴状态:',
      value: '',
      key: 'indemnifyVoucherStatus',
      expandable: false,
    },
    {
      label: '补贴金额:',
      value: '',
      key: 'indemnifyVoucherAmount',
      expandable: false,
    },
    {
      label: '补贴时间:',
      value: undefined,
      key: 'indemnifyTs',
      expandable: false,
    },
    // {
    //   label: '已补贴金额:',
    //   value: '',
    //   key: 'indemnifyVoucherIntoAmount',
    //   expandable: false,
    // },
  ]);
  const orderInfoPayData = ref<any>([
    {
      label: '已支付微信豆:',
      value: '',
      key: 'estimatedWecoinAmount',
      tips: '预计支付微信豆',
      expandable: false,
    },
    {
      label: '使用优惠:',
      value: '未使用',
      key: 'quota',
      tips: '是否使用优惠券抵扣',
      expandable: false,
    },
    {
      label: '实付微信豆:',
      value: '',
      key: 'estimatedWecoinAmountTruePay',
      tips: '计划实际支付微信豆',
      expandable: false,
    },
    {
      label: '已返还微信豆:',
      value: '',
      key: 'estimatedWecoinAmountBack',
      tips: '计划完成消耗后官方退款返还的微信豆',
      expandable: false,
    },

    {
      label: '实际使用微信豆:',
      value: '',
      key: 'costCoin',
      expandable: false,
      tips: '计划实际消耗微信豆',
    },
  ]);

  const orderLogData = ref<any>([]);

  const orderLogLoading = ref(false);

  const searchSphGrid = ref<any>([]);
  const searchInvestedGrid = ref<any>([]);
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
  const searchInvestedGridInit = async () => {
    const { data } = await investedGrid({
      pageIndex: 1,
      pageSize: 200,
    });
    searchInvestedGrid.value = data.grid;
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
  searchInvestedGridInit();
  const onDragSort = (data: any) => {
    if (data.sort === 'col') {
      if (
        ['plantNameId', 'op', 'plantVideo', 'sphInfo.sphName'].includes(
          data.current.colKey
        )
      ) {
        return;
      }
      if (
        ['plantNameId', 'op', 'plantVideo', 'sphInfo.sphName'].includes(
          data.target.colKey
        )
      ) {
        return;
      }
      plantColumns.value = data.newData;
      console.log(data, 'newData');
      localStorage.setItem('plantColumns', JSON.stringify(data.newData));
    }
  };

  const initStorage = () => {
    // 判断localStorage中是否含有plantColumns，有则取出来JSON.parse赋值给plantColumns.value
    // eslint-disable-next-line no-shadow
    if (localStorage.getItem('plantColumns')) {
      plantColumns.value = JSON.parse(localStorage.getItem('plantColumns'));
    }
  };
  initStorage();

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
        Message.info('请先选择需自动关停配置的计划');
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

  const selectionChange = async (option: any, selectedRowKeys: any) => {
    checkPlantSphArr.value = selectedRowKeys.selectedRowData.map((e: any) => {
      return e;
    });

    checkPlantArr.value = option;
    console.log(option, 'select', checkPlantSphArr.value);
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
    // console.log(dateString);

    search();
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
    const { data } = await plantGridData(params);
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
    tls.lr = fun(
      tls.productPlaceorderGmv * (tls.yjl / tls.plantCount / 100) - tls.cost
    );
    tls.noCostTime = `${fun(tls.noCostTime / 60)}分`;
    console.log(tls, 'tls');

    orderInfoSumData.value.forEach((el: any) => {
      el.n = tls[el.key] || '-';
      if (el.key === 'indemnifyVoucherAmount') {
        el.n = Number(tls[el.key]) / 100 || '-';
      }
      if (el.key === 'indemnifyVoucherIntoAmount') {
        el.n = tls.indemnifyVoucherIntoAmount
          ? tls.indemnifyVoucherIntoAmount / 100
          : '-';
      }
      if (el.key === 'indemnifyRoi') {
        el.n =
          tls.cost - tls.indemnifyVoucherAmount / 100 > 0 &&
          tls.indemnifyVoucherAmount > 0
            ? fun2(
                Number(tls.productPlaceorderGmv) /
                  (tls.cost - tls.indemnifyVoucherAmount / 100)
              )
            : 0;
      }
    });

    dataOverView.value?.setChartsData(reqModel.value);
  };

  const fetchData = async (params: any) => {
    console.log(params, 'params');
    setLoading(true);
    try {
      fetchSumData(params);

      const { data } = await plantGrid(params);
      console.log(data, 123213);

      if (data.grid) {
        data.grid.forEach((el: any, key: any) => {
          el.key = String(key + 1);
          if (el.sonDepInfo) {
            const depParentName = el.sonDepInfo.depParentId
              ? _.find(depEnumArr.value, [
                  'memberDepId',
                  el.sonDepInfo.depParentId,
                ]).memberDepName
              : '';

            el.newMemberDepName = `${
              el.sonDepInfo
                ? `${el.sonDepInfo.depParentId ? depParentName : ''}${
                    el.sonDepInfo.depParentId ? '/' : ''
                  }${el.sonDepInfo.memberDepName}`
                : ''
            }`;
          }
          if (el.voucherInfo) {
            el.voucherQuota = el.voucherInfo.quota
              ? fun2(el.voucherInfo.quota / 100)
              : '-';
          }
          if (el.productPlaceorderGmv > 0) {
            el.lr = fun2(el.productPlaceorderGmv * (el.yjl / 100) - el.cost);
          } else {
            el.lr = 0;
          }

          el.cost = fun2(el.cost);
          el.startCostTime = el.startTime
            ? dayjs(el.startTime)
                .add(el.noCostTime, 'second')
                .format('YYYY-MM-DD HH:mm:ss')
            : '-';
          el.hotNoCostTime = el.hotNoCostTime
            ? getTimes(el.hotNoCostTime)
            : '-';
          // el.productOrderCount = el.productOrderCount;
          el.productPlaceorderGmv = fun2(el.productPlaceorderGmv);

          el.roi = fun2(el.productPlaceorderGmv / el.cost);
          el.yl_roi = fun2(
            (el.productPlaceorderGmv * (el.yjl / 100)) / el.cost
          );
          el.airCost = fun2(el.airCost);
          // el.productClickCountPv = fun2(el.productClickCountPv);
          el.exposureCount = fun2(el.exposureCount);
          el.targetType = targetType[el.targetType];

          el.wecoinBid = el.wecoinBid > 0 ? el.wecoinBid : '智能';

          console.log('zdy', el.targetType);

          if (el.targetType === '商品ROI') {
            try {
              if (el.taskInfo && el.taskInfo.reqJson) {
                el.wecoinBid = Number(
                  JSON.parse(el.taskInfo.reqJson).feedPromotionOrderInfo.suggest
                    .roiBidX100
                )
                  ? `${
                      Number(
                        JSON.parse(el.taskInfo.reqJson).feedPromotionOrderInfo
                          .suggest.roiBidX100
                      ) / 100
                    }(roi)`
                  : '智能';
              } else {
                el.wecoinBid = '-';
              }
            } catch (e: any) {
              console.log(e);
            }
          }
          el.duration = `${el.duration / 3600}小时`;
          el.click_rate =
            fun4(el.productClickCountPv / el.exposureCount) === '-'
              ? '-'
              : `${fun4(el.productClickCountPv / el.exposureCount)}%`;
          el.qan_cost = fun2((el.cost / el.exposureCount) * 1000);
          el.click_cost = fun2(el.cost / el.productClickCountPv);
          el.zh_cost = fun2(el.cost / el.productOrderCount);
          console.log(
            (el.cost - el.indemnifyVoucherAmount) / 100 <= 0,
            el.indemnifyVoucherAmount !== 0,
            'indemnifyRoiindemnifyRoiindemnifyRoiindemnifyRoi'
          );
          el.indemnifyVoucherAmountRoi =
            (el.cost - el.indemnifyVoucherAmount) / 100 > 0 &&
            el.indemnifyVoucherAmount > 0
              ? fun2(
                  el.productPlaceorderGmv /
                    (el.cost - el.indemnifyVoucherAmount / 100)
                )
              : '-';
          const displayValue =
            el.indemnifyVoucherStatus === 2
              ? `¥${el.indemnifyVoucherAmount / 100}`
              : '-';
          el.indemnifyVoucherIntoAmount = displayValue;
          el.shutdownSwitch = el.shutdownStatus !== 0;
        });

        // data.grid.forEach((el: any, key: any) => {

        // }
      }
      renderData.value = data.grid || [];

      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or othe
    } finally {
      setLoading(false);
    }
  };
  const depEnumObj = ref<any>();
  const depEnumArr = ref<any>([]);
  const getDepIdName = async () => {
    const { data } = await parentDepInfoReq();

    return new Promise((resolve, reject) => {
      // 生成一个枚举
      if (data.grid) {
        // 循环data.Grid往enumObj里面添加枚举 memberDepId:memberDepName
        // data.grid.forEach((item: any) => {
        //   depEnumObj.value[
        //     item.memberDepId
        //   ] = `${item.memberDepName}`;
        // });
        depEnumArr.value = data.grid.map((item: any) => {
          return {
            memberDepId: item.memberDepId,
            memberDepName: item.memberDepName,
          };
        });
        console.log(depEnumArr.value);
      }
      resolve(depEnumObj.value);
    });
  };
  const openExcelList = () => {
    exportList.value?.showModel();
  };
  const exportExcelModal = () => {
    Modal.info({
      title: '提示',
      content: '是否导出选中数据？',
      simple: false,
      hideCancel: false,
      cancelText: '取消',
      async onOk() {
        exportExcel();
      },
    });
  };
  const exportExcel = async () => {
    const req = { ...reqModel.value };
    req.excel = true;
    // req.pageSize = 5000;
    // req.pageIndex = 1;
    const { data, code, message } = await exportPlantGrid(req);
    if (code === 200) {
      Message.success('数据报表生成中，请前往报表列表查看');
    }
    // 循环15次 每次获取200条 共300条
    // const promiseArray = [];

    // // eslint-disable-next-line prettier/prettier, no-plusplus
    // for (let i = 0; i < 15; i++) {
    //   // eslint-disable-next-line no-async-promise-executor
    //   const promise = new Promise(async (resolve) => {
    //     req.pageSize = 200;
    //     req.pageIndex = i + 1;
    //     const { data } = await plantGrid({
    //       ...req,
    //     });
    //     resolve(data.grid);
    //   });
    //   console.log(promise);

    //   promiseArray.push(promise);
    // }
    // const fileName = `计划报表导出${dayjs().format('YYMMDDhhmmss')}.xls`;
    // // const { data } = await plantGrid({
    // //   ...req,
    // // });
    // const eData: any = [];
    // console.log(new Set([...promiseArray]));
    // await Promise.all(promiseArray).then((res) => {
    //   console.log(res);
    //   res.forEach((el: any) => {
    //     if (el) {
    //       el.forEach((e: any) => {
    //         eData.push(e);
    //       });
    //     }
    //   });
    // });
    // const listHander = {
    //   plantName: '计划名称',
    //   plantCode: '计划ID',
    //   plantStatus: '计划状态',
    //   sphName: '投放号',
    //   videoNickName: '被投号',
    //   estimatedWecoinAmount: '投放金额',
    //   costRate: '消耗比例',
    //   cost: '消耗金额',
    //   productOrderCount: '订单数',
    //   productPlaceorderGmv: '营业额',
    //   lr: '利润',
    //   roi: 'ROI',
    //   ylRoi: '佣金ROI',
    //   yjl: '佣金率',
    //   airCost: '空耗值',
    //   productClickCountPv: '商品点击',
    //   exposureCount: '浏览',
    //   targetType: '投放目标',
    //   wecoinBid: '出价',
    //   duration: '投放时长',
    //   productClickCountPvRate: '点击率',
    //   qRate: '千展成本',
    //   cRate: '点击成本',
    //   zRate: '转化成本',
    //   updatedAt: '更新时间',
    //   createdAt: '创建时间',
    //   cancelTime: '关闭时间',
    //   indemnifyVoucherStatus: '补贴状态',

    //   indemnifyVoucherAmount: '补贴金额',
    //   indemnifyTs: '补贴时间',
    //   startTime: '加热开始时间',
    //   endTime: '加热结束时间',
    //   videoSignature: '视频描述',
    // };

    // // const eData = data.grid;

    // eData.forEach((el: any) => {
    //   if (el.productPlaceorderGmv > 0) {
    //     el.lr = fun2(el.productPlaceorderGmv * (el.yjl / 100) - el.cost);
    //   } else {
    //     el.lr = '-';
    //   }
    //   el.plantStatus = plantStatus[el.plantStatus] || '-';
    //   el.sphName = el.sphInfo.sphName;
    //   el.costRate = Number(fun(el.cost / el.estimatedWecoinAmount));
    //   el.cost = Number(fun2(el.cost));
    //   el.productOrderCount = Number(fun2(el.productOrderCount));
    //   el.productPlaceorderGmv = Number(fun2(el.productPlaceorderGmv));
    //   el.roi = fun2(el.roi);
    //   el.ylRoi = fun2(el.ylRoi);
    //   el.yjl = fun2(el.yjl);
    //   el.airCost = fun2(el.airCost);
    //   el.videoNickName = el.videoInfo ? el.videoInfo.videoNickName : '-';
    //   el.productClickCountPv =
    //     fun2(el.productClickCountPv) === '-'
    //       ? '-'
    //       : parseInt(fun2(el.productClickCountPv), 10);
    //   el.exposureCount =
    //     fun2(el.exposureCount) === '-'
    //       ? '-'
    //       : parseInt(fun2(el.exposureCount), 10);
    //   el.targetType = targetType[el.targetType];
    //   el.wecoinBid = el.wecoinBid > 0 ? el.wecoinBid : '智能';
    //   el.duration = `${el.duration / 3600}小时`;
    //   el.productClickCountPvRate =
    //     fun4(el.productClickCountPv / el.exposureCount) === '-'
    //       ? '-'
    //       : `${fun4(el.productClickCountPv / el.exposureCount)}%`;
    //   el.qRate = fun2((el.cost / el.exposureCount) * 1000);
    //   el.cRate = fun2(el.cost / el.productClickCountPv);
    //   el.zRate = fun2(el.cost / el.productOrderCount);
    //   el.videoSignature = el.videoInfo.signature;
    //   el.indemnifyVoucherAmount = fun2(el.indemnifyVoucherAmount / 100);
    //   el.indemnifyVoucherStatus =
    //     indemnifyVoucherStatus[el.indemnifyVoucherStatus] || '-';
    //   el.indemnifyTs = el.indemnifyTs
    //     ? dayjs.unix(Number(el.indemnifyTs)).format('YYYY-MM-DD')
    //     : '-';
    // });
    // EXlsx(eData, listHander, fileName);
  };
  const onPageChange = (page: any) => {
    basePagination.pageIndex = page.current;
    basePagination.current = page.current;
    basePagination.pageSize = page.pageSize;
    pagination.pageIndex = page.current;
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    // reqModel.value.pageIndex = page.current;
    // reqModel.value.pageSize = page.pageSize;

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
      current: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  };

  const getAsyncData = async () => {
    const res = await asyncData({});
    if (res.success) {
      Message.success('刷新成功');
    } else {
      Message.success(res.message);
    }
  };

  const sorterChange = async (sort: any) => {
    if (sort) {
      reqModel.value.orderKey = sort.sortBy;
      reqModel.value.orderSort = sort.descending ? 'DESC' : 'ASC';
    } else {
      reqModel.value.orderSort = null;
    }
    search();
  };
  const handleGpBeforeGroupNameEditOk = async (done: any) => {
    const res = await formGpNameRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    const { data, code } = await plantGroupEdit(groupModel);
    if (code === 200) {
      Message.success({
        content: '修改分组名称成功',
        duration: 5 * 1000,
      });
    }
    targetTypeData.value = [];
    targetTypePageNo.value = 1;
    getTargetTypeData();

    window.setTimeout(() => {
      done();
    }, 300);
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
      const res = await getOrderDetail({
        sphId: item.sphId,
        promotionId: item.plantCode,
      });
      console.log(res, 'code');
      if (Number(res.data.data.order.orderInfo.status) !== 1) {
        clearInterval(qrcodeStatusTimer.value);
        Message.success({
          content: '当前订单已支付',
          duration: 5 * 1000,
        });
        showQrcodeVisible.value = false;
        search();
        clearInterval(qrcodeStatusTimer.value);

        qrcodeStatusTimer.value = null;
        return;
      }
      if (Number(res.data.data.order.orderInfo.status) === 2) {
        clearInterval(qrcodeStatusTimer.value);
        Message.success({
          content: '订单支付成功',
          duration: 5 * 1000,
        });
        showQrcodeVisible.value = false;
        search();
        clearInterval(qrcodeStatusTimer.value);
        qrcodeStatusTimer.value = null;
      }
    }, 1500);
  };
  const handleClickDel = async (row: any) => {
    if (row) {
      // 123
      const { data, code } = await plantDeleted({ plantId: `${row}` });
      console.log(data);
      if (code === 200) {
        Message.success('删除计划成功。');
        orderInfoVisible.value = false;
        search();
      }
    } else {
      const plantIDs = checkPlantArr.value.join(',');
      console.log(plantIDs);
      const { data, code } = await plantDeleted({ plantId: plantIDs });
      console.log(data);
      if (code === 200) {
        Message.success('批量删除计划成功。');
        search();
      }
    }
  };
  const orderPayCancel = async () => {
    clearInterval(qrcodeStatusTimer.value);
  };

  const changePlantTab = async (k: any) => {
    plantTabActive.value = k;
    targetTypeData.value = [];
    targetTypeBottom.value = false;
    targetTypePageNo.value = 1;
    plantTabCheckIndex.value = 0;
    targetTypeReq.value = false;
    const copyReq = reqModel.value;
    reqModel.value = generateFormReqModel();
    reqModel.value.startDate = copyReq.startDate;
    reqModel.value.endDate = copyReq.endDate;
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
      'investedId',
      'srId',
    ];
    const tabkey = plantTabList.value[plantTabActive.value].id;
    console.log(item, reqField[tabkey]);
    if (tabkey === 6) {
      reqModel.value[reqField[tabkey]] = item.id;
      reqModel.value.sphId = 0;
    } else {
      reqModel.value[reqField[tabkey]] = item[reqField[tabkey]];
    }

    await search();
  };

  const plantChanel = async (row: any) => {
    try {
      checkSphStatus([row])
        .then(async (res) => {
          const { data } = await cancelPromotion({
            plantId: row.plantId,
          });
          Message.success({
            content: '请求关停成功',
            duration: 5 * 1000,
          });
          search();
        })
        .catch((err: any) => {
          const sphNameArr = err.grid.map((e: any) => {
            return e.sphName;
          });
          search();

          loginSphModal.value?.showModel(sphNameArr);
        });
    } catch (err) {
      // done(true);
      // return;
      // you can report use errorHandler or other
    } finally {
      // you can report use errorHandler or other
    }
    // done(true);
  };

  const plantChanelAll = async (done: any) => {
    if (checkPlantArr.value.length === 0) {
      Message.info('请先选择需要关闭的计划');
      done(true);
      return;
    }

    try {
      checkSphStatus(checkPlantSphArr.value)
        .then(async (res) => {
          const { data } = await cancelPromotion({
            plantId: checkPlantArr.value.join(','),
          });
          Message.success({
            content: '请求关停成功',
            duration: 5 * 1000,
          });
          search();
        })
        .catch(async (err) => {
          // 筛选出已离线的视频号数组
          const logoutSphArr = _.filter(err.grid, ['sphStatus', 2]);
          // 正常登录的视频号数组
          const loginSphArr = _.filter(err.grid, ['sphStatus', 1]);
          console.log(loginSphArr, 'loginSphArr', checkPlantSphArr.value);

          const sphNameArr = logoutSphArr.map((e: any) => {
            return e.sphName;
          });

          // eslint-disable-next-line array-callback-return, consistent-return
          const sphPlantArr: any = [];

          for (let i = 0; i < loginSphArr.length; i += 1) {
            checkPlantSphArr.value.forEach((e: any) => {
              console.log(e.sphInfo.sphId, 'e', loginSphArr[i].sphId);
              if (loginSphArr[i].sphId === e.sphInfo.sphId) {
                sphPlantArr.push(e.plantId);
              }
            });
          }
          if (sphPlantArr.length > 0) {
            const { data } = await cancelPromotion({
              plantId: sphPlantArr.join(','),
            });
          }
          search();

          loginSphModal.value?.showModel(sphNameArr, true);
        });
    } catch (err) {
      done(true);
      return;
      // you can report use errorHandler or other
    } finally {
      // you can report use errorHandler or other
    }
    done(true);
  };
  const getPlantStageGrid = async () => {
    orderStageLoading.value = true;
    const { data } = await plantStageGrid({
      plantId: orderInfo.value.plantId,
      pageIndex: stagePagination.pageIndex,
      pageSize: stagePagination.pageSize,
    });
    orderStageData.value = data.grid;

    let endTime: any = '';
    if (data.grid) {
      endTime = dayjs(data.grid[0].createAt).unix().valueOf();

      const costStartTime2 = dayjs(costStartTime.value).unix().valueOf();
      const minute = Number(fun2((endTime - costStartTime2) / 60));
      console.log(minute, '计划时间', costStartTime2, endTime);
      // 总消耗/ (开始消耗时间-阶段数据截止时间)
      //  minutesDiff (开始消耗时间-阶段数据截止时间)
      // const minutesDiff = endTime.diff(costStartTime.value, 'minute');

      averageCostText.value = minute
        ? `(平均消耗:${fun2(orderInfoCost.value / minute)}/分钟)`
        : `(平均消耗:-/分钟)`;
    } else {
      averageCostText.value = `(平均消耗:-/分钟)`;
    }

    stagePagination.total = data.total;
    orderStageLoading.value = false;
  };

  const onStagePageChange = (current: number) => {
    // console.log(current);
    stagePagination.pageIndex = current;
    // formModel.value.pageIndex = current;
    getPlantStageGrid();
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
  function getTimes(t: any) {
    // eslint-disable-next-line radix
    let hT: any = parseInt((t / 60 / 60) % 24);
    // eslint-disable-next-line radix
    let m: any = parseInt((t / 60) % 60);
    // eslint-disable-next-line radix
    let s: any = parseInt(t % 60);
    // 三元表达式 补零 如果小于10 则在前边进行补零 如果大于10 则不需要补零
    hT = hT < 10 ? `0${hT}` : hT;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    return `${hT}:${m}:${s}`;
  }
  const costStartTime = ref<any>();
  const orderInfoCost = ref<any>();
  const getOrderInfo = async (item: any) => {
    orderInfoVisible.value = true;
    orderInfoLoading.value = true;
    const { data } = await plantInfo({ plantId: item.plantId });
    orderInfo.value = data.info;
    const tls = orderInfo.value;
    nextTick(() => {
      dataChart.value?.fetchData({
        plantId: item.plantId,
        pageIndex: 1,
        pageSize: 200,
      });
    });
    costStartTime.value = dayjs(tls.startTime)
      .add(tls.noCostTime, 'second')
      .format('YYYY-MM-DD HH:mm:ss');
    orderInfoCost.value = tls.cost;
    console.log(costStartTime.value, ' costStartTime.value');
    // 加热数据 2023-10-10 01:00:09
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
    tls.indemnifyVoucherAmount = fun2(tls.indemnifyVoucherAmount / 100);
    tls.noCostTime = `${getTimes(tls.noCostTime)}`;
    orderInfoHotData.value.forEach((el: any) => {
      el.n = tls[el.key] || '-';
    });

    // 加热信息
    const hotMsg: any = {};
    let taskReq: any = {};
    if (tls.taskInfo && tls.taskInfo.reqJson) {
      taskReq = JSON.parse(tls.taskInfo.reqJson);
      if (taskReq.feedPromotionOrderInfo.suggest.gender.length === 0) {
        hotMsg.gender = '不限';
      } else {
        hotMsg.gender =
          taskReq.feedPromotionOrderInfo.suggest.gender.indexOf(1) === 0
            ? '男'
            : '女';
      }
      if (!taskReq.feedPromotionOrderInfo.suggest.deviceTypes) {
        hotMsg.deviceTypes = '不限';
      } else {
        hotMsg.deviceTypes =
          taskReq.feedPromotionOrderInfo.suggest.deviceTypes.indexOf(1) === 0
            ? 'iphone'
            : '安卓';
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
      if (
        taskReq.feedPromotionOrderInfo.suggest.similarUsernameList.length > 0
      ) {
        hotMsg.videoTagArr = taskReq.engineInfo.videoTagArr.join(',');
      } else {
        hotMsg.videoTagArr = '不限';
      }
    }

    hotMsg.duration = tls.duration > 0 ? `${tls.duration / 3600}小时` : '-';
    console.log(taskReq, '67890');

    if (tls.taskInfo && tls.taskInfo.reqJson) {
      hotMsg.promotionType =
        taskReq.feedPromotionOrderInfo.promotionType === 1
          ? '智能加热'
          : '定向加热';
    } else {
      hotMsg.promotionType = '-';
    }

    hotMsg.promotionTarget = targetType[tls.targetType];

    hotMsg.wecoinBid = tls.wecoinBid > 0 ? tls.wecoinBid : '智能';
    if (tls.taskInfo && tls.taskInfo.reqJson) {
      if (
        taskReq.feedPromotionOrderInfo.suggest.roiBidX100 &&
        taskReq.feedPromotionOrderInfo.promotionTarget === 11
      ) {
        hotMsg.wecoinBid = `${
          taskReq.feedPromotionOrderInfo.suggest.roiBidX100 / 100
        } （ROI）`;
      }
    }
    if (tls.taskInfo && tls.taskInfo.reqJson) {
      console.log(hotMsg, 'hotMsg');

      orderInfoHotMsg.value.forEach((el: any) => {
        if (el.key === 'cityIds' && hotMsg[el.key] !== '不限') {
          el.expandable = true;
        }
        if (el.key === 'interestTag' && hotMsg[el.key] !== '不限') {
          el.expandable = true;
        }

        el.value = hotMsg[el.key] || '-';
      });
    } else {
      orderInfoHotMsg.value = [];
    }

    tls.costCoin = parseInt(tls.cost * 10, 10);
    tls.estimatedWecoinAmount *= 10;
    console.log(tls.estimatedWecoinAmount, 'tls.estimatedWecoinAmount');

    // tls.plantStatus === 2 ? tls.estimatedWecoinAmount * 100 : 0;

    // tls.estimatedWecoinAmountBack =
    //   tls.cost? tls.estimatedWecoinAmount - tls.costCoin : 0;
    tls.estimatedWecoinAmountBack = tls.estimatedWecoinAmount - tls.costCoin;
    orderInfoPayData.value = orderInfoPayData.value.map((el: any) => {
      if (el.key !== '') {
        el.value = tls[el.key] ? `${tls[el.key]}` : '-';
        console.log(
          tls[el.key] ? `${tls[el.key]}` : '-',
          '56789asdasd0',
          el.key
        );
        if (el.key === 'estimatedWecoinAmountBack') {
          if ([4, 6].includes(tls.plantStatus)) {
            el.value = tls[el.key];
          } else {
            el.value = '-';
          }
        }
        if (el.key === 'quota') {
          let quota = 0;
          if (tls.voucherInfo) {
            quota = tls.voucherInfo.quota / 10;
          }
          el.value = tls.voucherInfo ? `已抵扣${quota}微信豆` : '未使用';
        }
        // key 为实付微信豆
        if (el.key === 'estimatedWecoinAmountTruePay') {
          let quota = 0;
          if (tls.voucherInfo) {
            quota = tls.voucherInfo.quota / 10;
          }
          el.value =
            tls.estimatedWecoinAmount - quota > 0 && tls.plantStatus !== 1
              ? tls.estimatedWecoinAmount - quota
              : '-';
        }
      }
      return el;
    });
    console.log(orderInfoPayData.value);

    indemnifyData.value = indemnifyData.value.map((e) => {
      if (e.key === 'indemnifyVoucherIntoAmount') {
        e.value =
          Number(tls.indemnifyVoucherStatus) === 2
            ? tls.indemnifyVoucherAmount
            : '-';
      }
      if (e.key === 'indemnifyVoucherIntoAmount') {
        e.value =
          Number(tls.indemnifyVoucherStatus) === 2
            ? tls.indemnifyVoucherAmount
            : '-';
      }
      if (e.key === 'indemnifyVoucherAmount') {
        e.value = tls[e.key];
      }
      if (e.key === 'indemnifyTs') {
        e.value = tls[e.key]
          ? dayjs.unix(Number(tls[e.key])).format('YYYY-MM-DD')
          : '-';
      }

      return e;
    });

    orderInfoLoading.value = false;
    getPlantLogGrid();
    getPlantStageGrid();
  };

  // eslint-disable-next-line consistent-return
  const jumpTask = async (row: any) => {
    // console.log(1111,row.plantCode,row.plantName)
    if (row.plantCode.includes(row.plantName)) {
      return Message.info('同步官方创建的计划暂不支持复投');
    }
    if (!row.taskId) {
      return Message.info('暂不支持复投。');
    }
    const { data } = await taskInfo({ taskId: row.taskId });
    data.reqJson = JSON.parse(data.reqJson);
    data.reqJson.createTaskBefore = 0;
    data.reqJson = JSON.stringify(data.reqJson);
    console.log(data.reqJson);

    localStorage.setItem('createPlant', data.reqJson);

    router.push({
      name: 'createPlant',
    });
  };

  const showGroupClick = async () => {
    if (checkPlantArr.value.length === 0) {
      Message.info('请先选择需要添加到分组的计划');
      return;
    }
    formClassVisible.value = true;
  };
  const checkSphStatus = async (item: any) => {
    console.log(item);
    let sphIdArr: any = item.map((e: any) => {
      return e.sphId;
    });
    // 去重
    sphIdArr = [...new Set(sphIdArr)];
    // sphInfo接口可以换成 用来检查是否登录的接口
    const { data } = await sphInfo({
      sphId: sphIdArr,
    });
    // return 一个Promise对象
    return new Promise((resolve, reject) => {
      let flag = false;
      // 我这里需要循环是因为 接口返回的是数组所以需要依次判断状态 状态为2就reject 否则 resolve 出去
      // 可以改成账号已离线reject 否则 resolve出去
      // eslint-disable-next-line no-plusplus, no-unreachable-loop
      for (let i = 0; i < data.grid.length; i++) {
        console.log(i);

        if (data.grid[i].sphStatus === 2) {
          flag = true;
          break;
        }
      }

      if (flag) {
        reject(data);
      } else {
        resolve(data);
      }
    });
  };

  const toPay = (row: any) => {
    // 判断row.plantCode为"0"时退出支付。并且toast提示该计划创建失败，无法支付
    if (row.plantCode === '0') {
      let str = '该计划创建失败，无法支付';
      if (row.createStatus === 2) {
        str = '该计划正在创建中，无法支付';
      }
      Message.info(str);
      return;
    }
    // 用法： 调用checkSphStatus
    // 未离线操作代码在then中执行
    // 已离线操作代码在catch中执行
    checkSphStatus([row])
      .then((res) => {
        let corproateId = 'undefined';
        if (row.sphInfo.sphUserType === 3) {
          corproateId = row.sphInfo.sphUniqid;
        }
        showQrcodeVisible.value = true;
        qrcodePayValue.value = `https://channels.weixin.qq.com/promote/pages/mobile_pay?promotionId=${row.plantCode}&type=feed&userType=${row.sphInfo.sphUserType}&corproateId=${corproateId}`;
        orderPayCheck(row);
      })
      .catch(async (err) => {
        console.log(err, 'error');
        const sphNameArr = err.grid.map((e: any) => {
          return e.sphName;
        });
        loginSphModal.value?.showModel(sphNameArr);
      });
  };

  const formClassOk = async (done: any) => {
    const res = await formClassRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    try {
      const { data } = await plantEdit({
        plantId: checkPlantArr.value.join(','),
        groupId: formClassModel.value.groupId,
        groupType: formClassModel.value.groupType,
        addName: formClassModel.value.addName,
      });
      Message.success({
        content: '更新分组成功',
        duration: 5 * 1000,
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      showRuleVisible.value = false;
      search();
    }
    done(false);
    formClassVisible.value = false;
  };

  const showPackageClick = async () => {
    if (checkPlantArr.value.length === 0) {
      Message.info('请先选择需要添加到计划包的计划');
      return;
    }
    formPackageVisible.value = true;
  };

  const videoGroup = async (item: any) => {
    await videoEdit({
      videoId: item.videoId,
      sort: item.sort === 9999 ? 0 : 9999,
    });
    Message.info(item.sort === 9999 ? '取消置顶' : '置顶成功');
    targetTypeData.value = [];
    targetTypePageNo.value = 1;
    getTargetTypeData();
  };

  const handleClickEditGroupName = (row: any) => {
    groupModel.name = row.groupName;
    groupModel.groupId = row.groupId;
    groupNameEditVisible.value = true;
  };
  const zdGroup = async (item: any) => {
    await plantGroupEdit({
      groupId: item.groupId,
      // name: item.groupName,
      sort: item.sort === 9999 ? 0 : 9999,
    });
    Message.info(item.sort === 9999 ? '取消置顶' : '置顶成功');
    targetTypeData.value = [];
    targetTypePageNo.value = 1;
    getTargetTypeData();
  };
  const invGroup = async (item: any) => {
    await investedEdit({
      id: item.id,
      sort: item.sort === 9999 ? 0 : 9999,
    });
    Message.info(item.sort === 9999 ? '取消置顶' : '置顶成功');
    targetTypeData.value = [];
    targetTypePageNo.value = 1;
    getTargetTypeData();
  };
  const formPackageOk = async (done: any) => {
    const res = await formPackageRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    try {
      const { data } = await plantEdit({
        plantId: checkPlantArr.value.join(','),
        packageId: formPackageModel.value.packageId,
        packageType: formPackageModel.value.packageType,
        addName: formPackageModel.value.addName,
      });
      Message.success({
        content: '更新计划包成功',
        duration: 5 * 1000,
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      showRuleVisible.value = false;
      search();
    }
    done(false);
    formPackageVisible.value = false;
  };
  // 默认列表
  const disPlayColumns = ref<any[]>([]);

  // if (localStorage.getItem('plant-disPlayColumns')) {
  //   disPlayColumns.value = JSON.parse(
  //     localStorage.getItem('plant-disPlayColumns')
  //   );
  // } else {
  //   plantColumns.value.forEach((el: any) => {
  //     disPlayColumns.value.push(el.colKey);
  //   });
  // }
  const disPlayColumnsChange = async (value: any) => {
    // localStorage.setItem('plant-disPlayColumns', JSON.stringify(value));
    console.log(value, 'listendisPlayColumnsChange');
  };

  const refresh = () => {
    reqModel.value = generateFormReqModel();
    createDate.value = [
      dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
    ];
  };
  getDepIdName().then((res) => {
    fetchData({
      ...reqModel.value,
      ...basePagination,
    });
  });
  const onColumnChange = (val: any) => {
    // localStorage.setItem('displayPlantColumns', val);
    console.log(val, 'onColumnChange');
  };
  defineExpose({
    fetchData,
  });
  function updateColumns(val: any) {
    console.log('updateColumns', val);
    const arr: any = [];
    // 用filter过滤val 中参数跟plantDefaultColumnsRef.value.fixColums 相同的参数，得到新数组
    val.filter((e) => {
      if (!plantDefaultColumnsRef.value.fixColums.includes(e)) {
        arr.push(e);
      }
    });
    console.log(arr, 'updateColumns');
    if (arr.length) {
      setCustomColumn({ customColumnValue: JSON.stringify(arr), type: 1 });
      // renderPlantColumns.value = JSON.parse(JSON.stringify(plantColumns.value));
    } else {
      setCustomColumn({ customColumnValue: '[]', type: 1 });
    }
  }
  // // 监听自定义列变化 然后传给后端储存
  watch(
    () => displayColumns.value,
    (newVal, oldVal) => {
      console.log(newVal, 'newVal', plantColumns.value);
      console.log(oldVal, 'oldVal');
    }
  );

  // setCustomColumn({ customColumnValue: '' });
</script>

<style scoped lang="less">
  .name,
  .official {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .name {
    justify-content: left;
    .ove {
      width: 90px;
      overflow: hidden;
      line-height: 26px;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.big {
        width: 100%;
      }
    }
  }
  .official {
    padding: 0 5px 0 1px;
    background: #fa9d3b;
    border-radius: 4px;
    font-size: 12px;
    height: 22px;
    color: #fff;
    margin-left: 5px;
    position: relative;
    z-index: 9;
    cursor: default;
    span {
      color: #fa9d3b;
      font-size: 22px;
      height: 22px;
      line-height: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &:before {
        position: relative;
        z-index: 2;
      }
      &:after {
        background: #fff;
        position: absolute;
        z-index: -1;
        width: 18px;
        height: 18px;
        content: '';
        border-radius: 4px;
      }
    }
    &:hover:after {
      display: block;
    }
    &:after {
      display: none;
      position: absolute;
      bottom: -30px;
      left: 0;
      transform: translateX(-50%);
      content: '同步官方创建的计划';
      line-height: 26px;
      padding: 0 10px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 4px;
      white-space: nowrap;
      z-index: 9;
      font-size: 12px;
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

  .container {
    height: 100%;
    padding: 0 17px 17px 17px;
    background: #f7f9ff;
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
    height: 32px;
  }

  //   :deep.arco-input-wrapper {
  //   background: #f2f5ff;
  //   border-radius: 4px;
  //   height: 32px;
  // }
  :deep .arco-picker {
    height: 32px;
    background: #f2f5ff;
    border-radius: 4px;
  }
  :deep.arco-input-number {
    height: 32px;
  }
  .general-card-upai {
    :deep(.arco-row-align-start) {
      align-items: center;
    }
  }
  .labelText {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3f3f3f;
    white-space: nowrap;
    line-height: 22px;
  }
  :deep .arco-select-view-single {
    background: #f2f5ff;
    border-radius: 4px;
    height: 32px;
  }
  :deep .arco-progress-line-text {
    margin-left: 1px;
    min-width: none;
  }

  .goodStatusBox {
    padding: 0px 25.2px;
    width: 100%;
    height: 53.2px;
    background: #ffffff;

    border-radius: 12px;
    margin: 11.2px 0;
    display: flex;
    align-items: center;
    .btn {
      height: 100%;
      margin-right: 4.2vw;
      box-sizing: border-box;
      color: #535353;
      font-size: 15px;
      line-height: 53.2px;
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
    border-radius: 6px;
    background: #fff;
    .title {
      font-size: 14px;
      color: #2d2d2d;
      font-weight: 500;
      display: flex;
      align-items: center;
      margin-top: 7px;
      margin-bottom: 7px;
      .tips {
        font-size: 12px;
        color: #535353;
        font-weight: 400;
        margin-left: 15.4px;
      }
    }
    .arco-col-5 {
      flex: 0 0 19.833333%;
      width: 19.833333%;
    }
  }

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
  .numBox {
    width: 100%;
    height: 55.5px;
    background: #f5f5f5;
    border-radius: 8px;
    // padding: 31px 23px;
    padding: 7px 7px;
    .titleBox {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #6f6f6f;
      font-weight: 500;
      .y {
        width: 8.4px;
        height: 8.4px;
        margin-right: 4.2px;
      }
    }
    .n {
      padding-left: 7px;
      margin-top: 1px;
      font-size: 16px;
      font-weight: 700;
      font-family: DINAlternate-Bold, DINAlternate;
    }
  }
  .wx_dou_icon {
    width: 10px;
    height: calc(11px / (43 / 49));
    margin-bottom: 1px;
  }
  .grid-demo-grid .demo-item,
  .grid-demo-grid .demo-suffix {
    height: 33.6px;
    line-height: 33.6px;
    color: var(--color-white);
    text-align: center;
  }

  .grid-demo-grid .demo-item:nth-child(2n) {
    background-color: rgba(var(--arcoblue-6), 0.9);
  }

  .grid-demo-grid .demo-item:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }
  .zhiding {
    :deep(.arco-link-icon) {
      margin-right: 0px;
    }
  }
  .nameBox {
    overflow: auto;
  }
  .nameBox::-webkit-scrollbar {
    display: none;
  }
  .hideSearchBar {
    // width: 100%;
    // height: v-bind(clentHeight);
    // overflow: hidden;
    // transition: all 0.3s;
  }
  .qrCodeBox {
    position: relative;
    .mark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      .iconBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 32px;
        gap: 8px;
      }
    }
  }

  .ty {
    .checkIcon {
      width: 14px;
      height: 14px;
    }
  }
  .sortTopBg {
    background: url('"https://img.adyinqing.com/upai_shop/is7fabir1697525250082"')
      no-repeat;
    background-size: 100% 100%;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .arco-link:hover {
    background: rgba(21, 84, 248, 0);
  }
</style>
