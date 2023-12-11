import { mergeConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
      port: 7813,
      host: '0.0.0.0',
    },
    // proxy: {
    //   '/applyuploaddfs': {
    //     target: `https://finder-assistant.mp.video.tencent-cloud.com/`,
    //     // https://whiskyport.cn/
    //     chargeOrigin: true, // 开启代理服务器
    //     pathRewrite: {
    //       // ['^'+process.env.VUE_APP_BASE_API]:''
    //       '^/applyuploaddfs': '/',
    //     },
    //     headers: {
    //       origin: 'https://channels.weixin.qq.com',
    //       Referer: 'https://channels.weixin.qq.com/',
    //     },
    //   },
    // },
    plugins: [
      // eslint({
      //   cache: false,
      //   include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      //   exclude: ['node_modules'],
      // }),
    ],
  },
  baseConfig
);
