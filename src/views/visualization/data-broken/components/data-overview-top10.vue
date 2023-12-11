<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-space direction="vertical" :size="12" fill>
      <a-table
        :data="topData"
        column-resizable
        :table-layout-fixed="true"
        :pagination="false"
        :scroll="{ y: '264px' }"
      >
        <template #columns>
          <a-table-column
            title="排名"
            width="70"
            align="center"
            data-index="key"
          ></a-table-column>
          <a-table-column width="140" title="商品名称" align="center">
            <template #cell="{ record }">
              <a-tooltip :content="record.proName">
                <a-typography-paragraph style="margin-bottom: 0" ellipsis>
                  {{ record.proName }}
                </a-typography-paragraph>
              </a-tooltip>
            </template>
          </a-table-column>
          <a-table-column
            width="100"
            title="订单数"
            data-index="orderCount"
            align="center"
          >
          </a-table-column>
          <a-table-column
            width="100"
            title="支付数"
            data-index="pvCount"
            align="center"
          >
          </a-table-column>
          <a-table-column
            width="100"
            title="PV"
            data-index="pvCount"
            align="center"
          >
          </a-table-column>
          <a-table-column
            width="100"
            title="UV"
            data-index="uvCount"
            align="center"
          >
          </a-table-column>
        </template>
      </a-table>
    </a-space>
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
  const allOrderCountData = ref<number[]>([]); // 全部订单数
  const orderCountData = ref<number[]>([]); // 订单数
  const allOrderPriceData = ref<number[]>([]); // 全部订单金额
  const orderPriceData = ref<number[]>([]); // 订单金额
  const avgOrderPriceData = ref<number[]>([]); // 平均单价
  const topData = ref<Array<any>>([]);

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
        data: ['平均单价', '订单金额', '订单金额汇总', '订单数汇总', '订单数'],
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
        generateSeries(
          '平均单价',
          '#722ED1',
          '#F5E8FF',
          avgOrderPriceData.value
        ),
        generateSeries('订单金额', '#F77234', '#FFE4BA', orderPriceData.value),
        generateSeries(
          '订单金额汇总',
          '#33D1C9',
          '#E8FFFB',
          allOrderPriceData.value
        ),
        generateSeries(
          '订单数汇总',
          '#3469FF',
          '#E8F3FF',
          allOrderCountData.value
        ),
        generateSeries('订单数', '#33D1C9', '#E8FFFB', orderCountData.value),
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
        avgOrderPriceData.value = [0];
        orderPriceData.value = [0];
        allOrderPriceData.value = [0];
        allOrderCountData.value = [0];
        orderCountData.value = [0];
        return;
      }
      avgOrderPriceData.value = [];
      orderPriceData.value = [];
      allOrderPriceData.value = [];
      allOrderCountData.value = [];
      orderCountData.value = [];
      chartsData.value.forEach((el: any, key: any) => {
        xAxis.value.push(dayjs(el.date).format('M.D'));
        console.log(el);

        avgOrderPriceData.value.push(el.avgOrderPrice || 0);
        orderPriceData.value.push(el.orderPrice || 0);
        allOrderPriceData.value.push(el.allOrderPrice || 0);
        allOrderCountData.value.push(el.allOrderCount || 0);
        orderCountData.value.push(el.orderCount || 0);
      });
      // xAxis.value = ['1', '2', '3'];
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const setTopData = async (row: any) => {
    // setLoading(true);
    try {
      console.log(row, 'top10');
      topData.value = row;

      row.forEach((el: any, key: number) => {
        el.key = key + 1;
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
    // fetchData();
  };
  const setChartsData = (row: any) => {
    topData.value = row;
    // console.log(row, 'gmvData');

    // fetchData();
  };

  const setParamsData = (row: any) => {
    params.startDate = row.startDate;
    params.endDate = row.endDate;
  };
  defineExpose({
    setChartsData,
    setTopData,
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
