<template>
  <div style="width: 324px">
    <div
      class="l-captcha"
      :data-site-key="siteKey"
      data-width="324"
      data-callback="getResponse"
      style="width: 324px"
    ></div>
  </div>
</template>

<script setup>
  const siteKey = import.meta.env.VITE_API_SITE_KEY;
</script>

<script>
  export default {
    created() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      this.dynamicLoadJs('//captcha.luosimao.com/static/js/api.js');
      window.getResponse = (resp) => {
        const els = document.getElementsByName('luotest_response');
        if (els.length === 1 && els[0].value === resp) {
          self.$emit('success', resp);
        } else {
          // eslint-disable-next-line
          LUOCAPTCHA && LUOCAPTCHA.reset();
        }
      };
    },
    methods: {
      dynamicLoadJs(url, callback) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;

          script.onload = () => {
            resolve();
          };

          script.onerror = () => {
            reject(new Error(`Failed to load script: ${url}`));
          };

          document.head.appendChild(script);
        });
      },
    },
  };
</script>
