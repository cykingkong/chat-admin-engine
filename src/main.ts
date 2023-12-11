import { createSSRApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import TDesign from 'tdesign-vue-next';
import Particles from 'particles.vue3';
import DataVVue3 from '@kjgl77/datav-vue3';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
import '@/api/interceptor';
import 'tdesign-vue-next/es/style/index.css';
import './assets/icon/iconfont.css';

const app = createSSRApp(App);

app.use(DataVVue3);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(Particles);
app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);
app.use(TDesign);

app.mount('#app');
