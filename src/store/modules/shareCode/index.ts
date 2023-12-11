import { defineStore } from 'pinia';

const useUserCodeStore = defineStore('code', {
  state: (): any => ({
    whiteUseShareCode: '',
  }),

  getters: {
    userInfo(state: any): any {
      return { ...state };
    },
  },

  actions: {
    setCodeInfo(partial: Partial<any>) {
      this.$patch(partial);
    },
  },
});

export default useUserCodeStore;
