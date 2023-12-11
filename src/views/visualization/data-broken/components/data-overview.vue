<template>
  <a-spin :loading="loading" style="width: 100%">
    <Chart style="height: 328px; margin-top: 20px" :option="chartOption" />
    <!-- </a-card> -->
  </a-spin>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';

  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { LineSeriesOption } from 'echarts';
  import { chunk } from 'lodash';
  import useLoading from '@/hooks/loading';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useThemes from '@/hooks/themes';
  import useChartOption from '@/hooks/chart-option';

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    console.log(items);
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
    data: number[]
  ): LineSeriesOption => {
    return {
      name,
      data,
      stack: 'Total',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 10,
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
  const convertData = ref<number[]>([]);

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
        data: ['访问次数', '访问人数', '创建订单数', '支付订单数'],
        selected: {},
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
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: number, idx: number) {
            // if (idx === 0) return String(value);
            // if (value > 10000) {
            //   return `${value / 10000}w`;
            // }
            return value;
          },
        },
        splitLine: {
          lineStyle: {
            color: dark ? '#2E2E30' : '#F2F3F5',
          },
        },
      },
      tooltip: {
        trigger: 'axis',

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
        generateSeries('访问次数', '#722ED1', '#F5E8FF', costData.value),
        generateSeries('访问人数', '#F77234', '#FFE4BA', showData.value),
        generateSeries('创建订单数', '#33D1C9', '#E8FFFB', clickData.value),
        generateSeries('支付订单数', '#3469FF', '#E8F3FF', convertData.value),
      ],
    };
  });

  const params = {
    startDate: '2022-04-10',
    endDate: '2022-04-20',
  };

  const chartsData = ref<Array<any>>([]);

  setLoading(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (params.startDate === params.endDate) {
        // befoureXAxis.value = dayjs(params.startDate).format('M.D');
        // befoureXAxis.value = dayjs(params.startDate).format('HH.mm');
        // afterXAxis.value = dayjs(params.endDate).endOf('days').format('HH.mm');
      } else {
        befoureXAxis.value = dayjs(params.startDate).format('M.D');
        afterXAxis.value = dayjs(params.endDate).format('M.D');
      }
      xAxis.value = [];

      // const { data } = await GetReportByIndexData(params);
      if (chartsData.value.length === 0) {
        setLoading(false);
        xAxis.value = [];
        costData.value = [0];
        showData.value = [0];
        clickData.value = [0];
        convertData.value = [0];
        return;
      }
      costData.value = [];
      showData.value = [];
      clickData.value = [];
      convertData.value = [];
      chartsData.value.forEach((el: any, key: any) => {
        xAxis.value.push(dayjs(el.viewDate).format('M.D'));

        costData.value.push(el.pvCount || 0);
        showData.value.push(el.uvCount || 0);
        clickData.value.push(el.orderCount || 0);
        convertData.value.push(el.payCount || 0);
      });
      // xAxis.value = ['1', '2', '3'];
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const setChartsData = (row: any) => {
    chartsData.value = row;
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
</style>
