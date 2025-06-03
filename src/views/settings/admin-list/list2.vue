<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '客服管理']" />
    <div class="tradingview-widget-container" style="height: 100%; width: 100%">
      <div
        class="tradingview-widget-container__widget"
        style="height: calc(100% - 32px); width: 100%"
      ></div>
      <div class="tradingview-widget-copyright"
        ><a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
          ><span class="blue-text">Track all markets on TradingView</span></a
        ></div
      >
    </div>
  </div>
</template>

<script type="module">
  import TradingView from 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
</script>
