<template>
  <!-- <div id="container" ref="chartRef" style="width: 100%; height: 100%">
    <Chart :option="chartOption" />
  </div> -->

  <div id="container" style="width: 100%; height: 100%">
    <Chart :option="chartOption" />
  </div>
  <!-- <a-spin :loading="loading" style="width: 100%">
 
  </a-spin> -->
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';

  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { LineSeriesOption } from 'echarts';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useThemes from '@/hooks/themes';
  import useChartOption from '@/hooks/chart-option';
  import { reportHourData, reportDayData } from '@/api/live-plant';

  const mulNum = 1;
  const reqModel = ref({});
  const timeDisalbed = ref(false);
  const timeType = ref(1);
  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${
            el.color
          }" class="tooltip-item-icon"></span><span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">${el.value.toLocaleString()}</span>
      </div>`
      )
      .reverse()
      .join('');
  };

  const generateSeries = (
    name: string,
    lineColor: string,
    itemBorderColor: string,
    yAxisIndex: number,
    data: number[]
  ): LineSeriesOption => {
    return {
      name,
      data,
      // stack: 'Total',
      type: 'line',
      smooth: true,
      yAxisIndex,
      // symbol: 'circle',
      // symbolSize: 10,
      itemStyle: {
        color: lineColor,
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          color: lineColor,
          borderWidth: 2,
          borderColor: itemBorderColor,
        },
      },
      lineStyle: {
        width: 2,
        color: lineColor,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.1,
        color: lineColor,
      },
    };
  };
  const { t } = useI18n();
  const { loading, setLoading } = useLoading(true);
  const { isDark } = useThemes();

  const xAxis = ref<string[]>([]);
  const befoureXAxis = ref<string>();
  const afterXAxis = ref<string>();
  const costData = ref<number[]>([]);
  const showData = ref<number[]>([]);
  const clickData = ref<number[]>([]);
  const roiData = ref<number[]>([]);
  // @ts-ignore
  const { chartOption } = useChartOption((dark) => {
    return {
      grid: {
        left: '5.6%',
        right: '4',
        top: '40',
        bottom: '40',
      },
      legend: {
        data: ['消耗', '订单数', 'GMV', 'ROI'],

        selected: {},
        textStyle: {
          color: '#fff',
        },
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return '';
            if (idx === xAxis.value.length - 1) return '';
            return `${value}`;
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: [
        {
          show: false,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value);
              if (value > 10000) {
                return `${value / 10000}w`;
              }
              return value;
            },
          },
          splitLine: {
            lineStyle: {
              color: dark ? '#2E2E30' : '#F2F3F5',
            },
          },
        },
        {
          show: false,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value);
              if (value > 10000) {
                return `${value / 10000}w`;
              }
              return value;
            },
          },
          splitLine: {
            lineStyle: {
              color: dark ? '#2E2E30' : '#F2F3F5',
            },
          },
        },
        {
          show: false,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value);
              if (value > 10000) {
                return `${value / 10000}w`;
              }
              return value;
            },
          },
          splitLine: {
            lineStyle: {
              color: dark ? '#2E2E30' : '#F2F3F5',
            },
          },
        },
        {
          show: false,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value);
              if (value > 10000) {
                return `${value / 10000}w`;
              }
              return value;
            },
          },
          splitLine: {
            lineStyle: {
              color: dark ? '#2E2E30' : '#F2F3F5',
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: '2.6%',
            bottom: '18',
            style: {
              text: befoureXAxis.value,
              textAlign: 'center',
              fill: '#4E5969',
              fontSize: 12,
            },
          },
          {
            type: 'text',
            right: '0',
            bottom: '18',
            style: {
              text: afterXAxis.value,
              textAlign: 'center',
              fill: '#4E5969',
              fontSize: 12,
            },
          },
        ],
      },

      series: [
        generateSeries('ROI', '#3469FF', '#E8F3FF', 3, roiData.value),
        generateSeries('GMV', '#33D1C9', '#E8FFFB', 2, clickData.value),
        generateSeries('订单数', '#F77234', '#FFE4BA', 0, showData.value),
        generateSeries('消耗', '#722ED1', '#F5E8FF', 1, costData.value),
        // generateSeries('有效账户', '#3469FF', '#E8F3FF', advData.value),
        // generateSeries('有效计划', '#3469FF', '#E8F3FF', plantData.value),
      ],
    };
  });

  const params = {
    startDate: '2022-04-10',
    endDate: '2022-04-20',
    advId: 0,
  };

  const chartsData = ref<Array<any>>([]);

  // initCharts();

  const fetchData = async () => {
    setLoading(true);
    try {
      costData.value = [];
      showData.value = [];
      clickData.value = [];
      roiData.value = [];
      xAxis.value = [];

      if (timeType.value === 1) {
        xAxis.value.push(`0:00`);

        costData.value.push(0);
        showData.value.push(0);
        clickData.value.push(0);
        roiData.value.push(0);
        const { data } = await reportHourData({
          ...reqModel.value,
          reportDate: reqModel.value.startDate,
        });
        if (data.grid) {
          data.grid.forEach((el: any, key: any) => {
            el.cost *= mulNum;
            el.productOrderCount *= mulNum;
            el.productPlaceorderGmv *= mulNum;
            if (key === 0) {
              costData.value.push(el.cost || 0);
              showData.value.push(el.productOrderCount || 0);
              clickData.value.push(el.productPlaceorderGmv || 0);
              if (el.productPlaceorderGmv > 0 && el.cost > 0) {
                roiData.value.push(el.productPlaceorderGmv / el.cost);
              } else {
                roiData.value.push(0);
              }
            } else {
              costData.value.push(el.cost - data.grid[key - 1].cost || 0);
              showData.value.push(
                el.productOrderCount - data.grid[key - 1].productOrderCount || 0
              );
              clickData.value.push(
                el.productPlaceorderGmv -
                  data.grid[key - 1].productPlaceorderGmv || 0
              );
              if (
                el.productPlaceorderGmv -
                  data.grid[key - 1].productPlaceorderGmv >
                  0 &&
                el.cost - data.grid[key - 1].cost > 0
              ) {
                roiData.value.push(
                  (el.productPlaceorderGmv -
                    data.grid[key - 1].productPlaceorderGmv) /
                    (el.cost - data.grid[key - 1].cost)
                );
              } else {
                roiData.value.push(0);
              }
            }

            xAxis.value.push(`${el.reportHourStr}`);
          });
        }
      } else {
        // xAxis.value.push(dayjs(reqModel.value.startDate).format('M.D'));
        const { data } = await reportDayData({
          ...reqModel.value,
        });
        if (data.grid) {
          data.grid.forEach((el: any) => {
            el.cost *= mulNum;
            el.productOrderCount *= mulNum;
            el.productPlaceorderGmv *= mulNum;
            costData.value.push(el.cost || 0);
            showData.value.push(el.productOrderCount || 0);
            clickData.value.push(el.productPlaceorderGmv || 0);
            if (el.productPlaceorderGmv > 0 && el.cost > 0) {
              roiData.value.push(el.productPlaceorderGmv / el.cost);
            } else {
              roiData.value.push(0);
            }
            xAxis.value.push(dayjs(el.reportDate).format('M.D'));
          });
        }
      }

      // if (params.startDate === params.endDate) {
      //   befoureXAxis.value = dayjs(params.startDate).format('HH.mm');
      //   afterXAxis.value = dayjs(params.endDate).endOf('days').format('HH.mm');
      // } else {
      //   befoureXAxis.value = dayjs(params.startDate).format('M.D');
      //   afterXAxis.value = dayjs(params.endDate).format('M.D');
      // }

      // // const { data } = await GetReportByIndexData(params);
      // if (chartsData.value.length === 0) {
      //   setLoading(false);
      //   xAxis.value = [];
      //   costData.value = [0];
      //   showData.value = [0];
      //   clickData.value = [0];
      //   convertData.value = [0];
      //   priceData.value = [0];
      //   roiData.value = [0];
      //   advData.value = [0];
      //   plantData.value = [0];
      //   return;
      // }
      // xAxis.value = [];

      // costData.value = [];
      // showData.value = [];
      // clickData.value = [];
      // convertData.value = [];
      // priceData.value = [];
      // roiData.value = [];
      // advData.value = [];
      // plantData.value = [];

      // chartsData.value.forEach((el: any, key: any) => {
      //   if (params.startDate === params.endDate) {
      //     xAxis.value.push(el.time_and.split('~')[1]);
      //     costData.value.push(el.cost || 0);
      //     priceData.value.push(el.order_price || 0);
      //     if (el.order_price > 0 && el.cost > 0) {
      //       roiData.value.push(el.order_price / el.cost);
      //     } else {
      //       roiData.value.push(0);
      //     }
      //   } else {
      //     xAxis.value.push(dayjs(el.report_date).format('M.D'));
      //     costData.value.push(el.cost || 0);
      //     priceData.value.push(el.order_price || 0);
      //     if (el.order_price > 0 && el.cost > 0) {
      //       roiData.value.push(el.order_price / el.cost);
      //     } else {
      //       roiData.value.push(0);
      //     }
      //   }
      //   clickData.value.push(el.click || 0);
      //   showData.value.push(el.show || 0);
      //   convertData.value.push(el.convert || 0);
      //   advData.value.push(el.value_adv || 0);
      //   plantData.value.push(el.value_plant || 0);
      // });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const setChartsData = (row: any) => {
    if (
      dayjs(row.startDate).format('YYYYMMDD') ===
      dayjs(row.endDate).format('YYYYMMDD')
    ) {
      timeType.value = 1;
      timeDisalbed.value = false;
    } else {
      timeType.value = 2;
      timeDisalbed.value = true;
    }

    reqModel.value = row;
    fetchData();
  };
  const setParamsData = (row: any) => {
    params.startDate = row.startDate;
    params.endDate = row.endDate;
  };

  defineExpose({
    setChartsData,
    setParamsData,
  });
</script>

<style scoped lang="less">
  :deep(.arco-statistic) {
    .arco-statistic-title {
      color: rgb(var(--gray-10));
      font-weight: bold;
    }
    .arco-statistic-value {
      display: flex;
      align-items: center;
    }
  }
  .general-data {
    padding-left: 43px;
    margin-top: 20px;
  }
  .statistic-prefix {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    color: var(--color-white);
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
  }
  .banner {
    width: 100%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
  }
  .panel-col {
    padding-left: 43px;
    border-right: 1px solid rgb(var(--gray-2));
  }
  .col-avatar {
    margin-right: 12px;
    background-color: var(--color-fill-2);
  }
  .up-icon {
    color: rgb(var(--red-6));
  }
  .unit {
    margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 12px;
  }
  :deep(.panel-border) {
    margin: 4px 0 0 0;
  }

  .leftBorder {
    width: 4px;
    height: 15px;
    background-image: linear-gradient(
      -225deg,
      #22e1ff 0%,
      #1d8fe1 48%,
      #625eb1 100%
    );
    margin-right: 8px;
  }

  .titleBox {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
  }
  .textBox {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  #container {
    :deep(div:first-child) {
      width: 100% !important;
    }
  }
</style>
