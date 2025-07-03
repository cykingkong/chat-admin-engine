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
       proxy: {
        '/api': {
          target:'https://helpapi.getechat.one', // 代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          ws: false,
        },
      }
    },

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
