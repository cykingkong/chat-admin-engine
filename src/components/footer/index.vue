<template>
  <a-layout-footer class="footer"> </a-layout-footer>
</template>

<script lang="ts" setup>
  const oldVersion = import.meta.env.VITE_KB_VERSION;
</script>

<style lang="less" scoped>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    color: var(--color-text-2);
    text-align: center;
  }
</style>
