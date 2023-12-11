<!--index.vue-->
<template>
  <dv-full-screen-container class="allWindow">
    <!-- <dv-scroll-board
      :config="config"
      style="width: 500px; height: 220px"
      @mouseover="mouseoverHandler"
      @click="clickHandler"
    /> -->
    <a-row class="grid-demo" style="margin-bottom: 16px">
      <a-col flex="100px">
        <div></div>
      </a-col>
      <a-col flex="auto">
        <div class="logo" style="width: 150px; margin: auto">
          <img
            alt="logo"
            width="150"
            src="https://img.adyinqing.com/upai_shop/w7gnw2fu1683645946208"
          />
          <dv-decoration6 style="width: 150px; height: 10px" />
        </div>
      </a-col>
      <a-col flex="100px">
        <div></div>
      </a-col>
    </a-row>
    <a-row class="grid-demo">
      <a-col flex="100px">
        <div>100px</div>
      </a-col>
      <a-col flex="auto">
        <div>auto</div>
      </a-col>
      <a-col flex="100px">
        <div>100px</div>
      </a-col>
    </a-row>
    <a-layout style="height: 100%; width: 100%">
      <a-layout-header style="height: 60px; text-align: center">
        <div class="logo" style="width: 150px; margin: auto">
          <img
            alt="logo"
            width="150"
            src="https://img.adyinqing.com/upai_shop/w7gnw2fu1683645946208"
          />
          <dv-decoration6 style="width: 150px; height: 10px" />
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          theme="dark"
          class="rank"
          style="background: none"
          :width="null"
        >
          <a-space direction="vertical" fill :size="[0, 25]">
            <dv-border-box10>
              <div style="padding: 27px">
                <div class="d-flex pt-2 pl-2">
                  <span>
                    <i class="iconfont icon-vector" />
                  </span>
                  <div class="d-flex">
                    <span class="fs-xl text mx-2">当日最佳计划</span>
                  </div>
                </div>

                <div class="dv-bg">
                  <dv-scroll-ranking-board :config="plantData" />
                </div>
              </div>
            </dv-border-box10>
          </a-space>
        </a-layout-sider>
        <a-layout-content style="padding: 0 0 0 10px">
          <a-row :gutter="24">
            <a-col :span="16">
              <dv-border-box3>
                <div class="dv-bg-gl">
                  <a-row>
                    <a-col :span="8">
                      <dv-decoration1 style="width: 200px; height: 20px" />
                    </a-col>
                    <a-col :span="8" style="text-align: center">
                      <span>实时GMV</span>
                      <dv-digital-flop
                        style="height: 40px"
                        :config="gmvConfig"
                      />
                    </a-col>
                    <a-col :span="8">
                      <dv-decoration1 style="width: 200px; height: 20px" />
                    </a-col>
                  </a-row>
                  <a-row style="text-align: center">
                    <a-col :span="24"></a-col>
                  </a-row>
                  <!-- <a-row :span="24">
                    <DataOverView ref="dataOverView" />
                  </a-row> -->
                  <!-- <div> </div> -->
                  <!-- <div>
                    <a-space>
                      <dv-decoration1 style="width: 200px; height: 20px" />
                      <span> GMV </span>

                      <dv-decoration1 style="width: 200px; height: 20px" />
                    </a-space>
                  </div> -->
                </div>
              </dv-border-box3>
            </a-col>
            <a-col :span="8">
              <div>
                <dv-decoration-12 style="width: 150px; height: 150px" />
              </div>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="16">
              <dv-border-box1>
                <div class="dv-bg-gl">
                  <!-- <a-row>
                    <a-col :span="8">
                      <dv-decoration1 style="width: 200px; height: 20px" />
                    </a-col>
                    <a-col :span="8" style="text-align: center">
                      <span>实时GMV</span>
                      <dv-digital-flop
                        style="height: 40px"
                        :config="gmvConfig"
                      />
                    </a-col>
                    <a-col :span="8">
                      <dv-decoration1 style="width: 200px; height: 20px" />
                    </a-col>
                  </a-row>
                  <a-row style="text-align: center">
                    <a-col :span="24"></a-col>
                  </a-row> -->
                  <a-row :span="24">
                    <!-- <dv-decoration7>
                      <div class="color-white" style="font-weight: 300">
                        当日最佳计划
                      </div>
                    </dv-decoration7> -->

                    <div class="d-flex pt-2 pl-2">
                      <span>
                        <i class="iconfont icon-chart-area" />
                      </span>
                      <div class="d-flex">
                        <span class="fs-xl text mx-2 mt-1">实时分时数据</span>
                      </div>
                    </div>
                    <DataOverView ref="dataOverView" />
                  </a-row>
                  <!-- <div> </div> -->
                  <!-- <div>
                    <a-space>
                      <dv-decoration1 style="width: 200px; height: 20px" />
                      <span> GMV </span>

                      <dv-decoration1 style="width: 200px; height: 20px" />
                    </a-space>
                  </div> -->
                </div>
              </dv-border-box1>
            </a-col>
            <a-col :span="8">
              <!-- <div>
                <dv-decoration-12 style="width: 150px; height: 150px" />
              </div> -->
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
    <!--     
    <div class="small-bg">
      <dv-loading>
        <div class="color-white"> Loading... </div>
      </dv-loading>
    </div> -->
  </dv-full-screen-container>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, reactive } from 'vue';
  import dayjs from 'dayjs';
  import DataOverView from './components/data-overview.vue';
  import '@/assets/data_scss/style.scss';

  const dataOverView = ref<InstanceType<typeof DataOverView>>();

  const plantData = reactive({
    data: [
      {
        name: '桃子姐优选好物-0320-19',
        value: 55,
      },
      {
        name: '桃子姐优选好物-0320-8',
        value: 120,
      },
      {
        name: '桃子姐优选好物-0320-6',
        value: 78,
      },
      {
        name: '桃子姐优选好物-0320-4',
        value: 66,
      },
      {
        name: '桃子姐优选好物-0320-3',
        value: 80,
      },
      {
        name: '桃子姐优选好物-0320-2',
        value: 45,
      },
      {
        name: '桃子姐优选好物-0320-1',
        value: 29,
      },
      {
        name: '心选礼物-0320-1',
        value: 29,
      },
      {
        name: '心选礼物-0320-1',
        value: 45,
      },
      {
        name: '心选礼物-0320-1',
        value: 234,
      },
      {
        name: '心选礼物-0320-1',
        value: 45,
      },
    ],
    unit: '元(gmv)',
    rowNum: 10,
  });

  function formatter(number: number) {
    const numbers = number.toString().split('').reverse();
    const segs = [];

    while (numbers.length) segs.push(numbers.splice(0, 3).join(''));

    return segs.join(',').split('').reverse().join('');
  }
  const gmvConfig = reactive({
    number: [247287382],
    content: '¥ {nt}',
    // toFixed: 2,
    formatter,
  });

  setInterval(() => {
    gmvConfig.number[0] += Math.random() * 100;
  }, 2000);

  const generateFormReqModel = () => {
    return {
      startDate: dayjs('2023-05-09')
        .startOf('date')
        .format('YYYY-MM-DD HH:mm:ss'),
      endDate: dayjs('2023-05-09').endOf('date').format('YYYY-MM-DD HH:mm:ss'),
      pageIndex: 1,
      pageSize: 10,
      taskStatus: -1,
    };
  };
  const reqModel = ref(generateFormReqModel());

  onMounted(() => {
    setTimeout(() => {
      dataOverView.value?.setChartsData(reqModel.value);
    }, 20);
  });
</script>

<style>
  .allWindow {
    /* display: flex; */
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }

  .rank {
    width: 33.4rem;
  }
  .dv-bg {
    height: 53rem;
    display: flex;
    align-items: center;
    justify-content: center;
    --un-text-opacity: 1;
    color: rgba(255, 255, 255, var(--un-text-opacity));
  }

  .dv-bg-gl {
    height: 32rem;
    padding: 2rem 2rem 0 2rem;
    /* height: 100%; */
    /* display: flex; */
    /* align-items: center; */
    justify-content: center;
    --un-text-opacity: 1;
    color: rgba(255, 255, 255, var(--un-text-opacity));
  }

  @media (max-width: 1500px) {
    .rank {
      width: 25.6rem;
    }
    .dv-bg {
      height: 45rem;
      /* height: 100%; */
      display: flex;
      align-items: center;
      justify-content: center;
      --un-text-opacity: 1;
      color: rgba(255, 255, 255, var(--un-text-opacity));
    }

    .dv-bg-gl {
      height: 32rem;
      padding: 2rem 2rem 0 2rem;
      /* height: 100%; */
      /* display: flex; */
      /* align-items: center; */
      justify-content: center;
      --un-text-opacity: 1;
      color: rgba(255, 255, 255, var(--un-text-opacity));
    }
  }

  .text {
    color: #c3cbde;
  }
</style>
