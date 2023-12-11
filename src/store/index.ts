import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useUserCodeStore from './modules/shareCode';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useUserCodeStore };
export default pinia;
