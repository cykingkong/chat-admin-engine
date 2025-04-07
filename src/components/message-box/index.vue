<template>
  <a-spin style="display: block" :loading="loading">
    <a-tabs
      v-model:activeKey="messageType"
      type="rounded"
      destroy-on-hide
      @change="changePane"
    >
      <a-tab-pane v-for="item in tabList" :key="item.key">
        <template #title>
          <span> {{ item.title }}{{ formatUnreadLength(item.key) }} </span>
        </template>
        <a-result v-if="!renderList.length" status="404">
          <template #subtitle> {{ $t('messageBox.noContent') }} </template>
        </a-result>
        <List
          :render-list="renderList"
          :unread-count="unreadCount"
          :bottom="bottom"
          @item-click="handleItemClick"
          @fetch-data="handelFetchNextPage"
        />
      </a-tab-pane>
      <template #extra>
        <a-button type="text" @click="allRead()"> 全部已读 </a-button>
        <a-popconfirm content="确定是否清空全部消息？" @ok="emptyList()">
          <a-button type="text" status="danger" style="margin-left: 10px">
            清空
          </a-button>
        </a-popconfirm>
      </template>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    memberMsg,
    // setMessageStatus,
    // MessageRecord,
    // MessageListType,
  } from '@/api/user';
  import useLoading from '@/hooks/loading';
  import _ from 'lodash';
  import { useUserStore } from '@/store';
  import List from './list.vue';

  const bottom = ref(false);

  interface TabItem {
    key: string;
    title: string;
    avatar?: string;
  }
  const { loading, setLoading } = useLoading(true);
  const messageType = ref(0);
  const { t } = useI18n();
  const messageData = reactive<any>({
    messageList: [],
  });
  const initPage = ref(1);
  toRefs(messageData);
  const tabList: any[] = [
    {
      key: 0,
      title: '全部',
    },
    {
      key: 1,
      title: '账号',
    },
    {
      key: 2,
      title: '爆单',
    },
    {
      key: 3,
      title: '关停',
    },
    {
      key: 4,
      title: '异常',
    },
    {
      key: 5,
      title: '发布视频',
    },
  ];
  const userStore = useUserStore();

  if (userStore.$state.role === 'grayscaleSuperAdmin') {
    tabList.push({
      key: 6,
      title: '带货',
    });
  }
  const reqModel = ref({
    pageIndex: 1,
    pageSize: 8,
    readIds: null,
  });
  const fetchReqLoad = ref(false);

  async function fetchSourceData() {
    if (fetchReqLoad.value) {
      return;
    }
    fetchReqLoad.value = true;
    setLoading(true);
    try {
      const { data } = await memberMsg({
        ...reqModel.value,
        messageClass: messageType.value,
      });
      if (data.grid) {
        if (initPage.value === 1) {
          messageData.messageList = data.grid;
          initPage.value += 1;
        } else {
          const fData = data.grid;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < fData.length; i++) {
            messageData.messageList.push(fData[i]);
          }
        }

        //  = data.grid;
      } else {
        if (initPage.value === 1) {
          messageData.messageList = [];
        }
        bottom.value = true;
      }
      if (data.total < reqModel.value.pageSize) {
        bottom.value = true;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
      fetchReqLoad.value = false;
    }
  }

  async function changePane() {
    initPage.value = 1;
    reqModel.value.pageIndex = 1;
    // fetchSourceData();
  }
  async function readMessage(data: any) {
    const ids = data.map((item: any) => item.id);
    // await setMessageStatus({ ids });
    // reqModel.value.readIds = ids.join(',');
    setLoading(true);
    await memberMsg({
      pageIndex: 1,
      pageSize: 2,
      readIds: ids.join(','),
    });
    setLoading(false);
    ids.forEach((el: any) => {
      const findKey = _.findIndex(messageData.messageList, ['id', el]);
      if (findKey >= 0) {
        messageData.messageList[findKey].messageStatus = 1;
      }
    });
  }
  const renderList = computed(() => {
    return messageData.messageList;
  });
  const allRead = async () => {
    if (fetchReqLoad.value) {
      return;
    }
    fetchReqLoad.value = true;
    setLoading(true);
    try {
      const { data } = await memberMsg({
        pageIndex: 1,
        pageSize: 8,
        readIds: 'allIds',
      });
      // if (data.grid) {
      //   messageData.messageList = data.grid;
      //   initPage.value += 1;
      // } else {
      //   bottom.value = true;
      // }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
      fetchReqLoad.value = false;
    }

    messageData.messageList.forEach((el: any) => {
      el.messageStatus = 2;
    });
  };
  const unreadCount = computed(() => {
    return renderList.value.filter((item: any) => !item.status).length;
  });
  const getUnreadList = (type: string) => {
    const list = messageData.messageList.filter(
      (item: any) => item.type === type && !item.status
    );
    return list;
  };
  const formatUnreadLength = (type: string) => {
    const list = getUnreadList(type);
    return list.length ? `(${list.length})` : ``;
  };
  const handleItemClick = (items: any) => {
    if (renderList.value.length) readMessage([...items]);
  };
  const emptyList = async () => {
    setLoading(true);
    await memberMsg({
      pageIndex: 1,
      pageSize: 2,
      delId: 1,
    });
    setLoading(false);
    messageData.messageList = [];
    bottom.value = true;
  };
  const handelFetchNextPage = () => {
    reqModel.value.pageIndex += 1;
    // fetchSourceData();
  };
  // fetchSourceData();
</script>

<style scoped lang="less">
  :deep(.arco-popover-popup-content) {
    padding: 0;
  }

  :deep(.arco-list-item-meta) {
    align-items: flex-start;
  }
  :deep(.arco-tabs-nav) {
    padding: 14px 0 12px 16px;
    border-bottom: 1px solid var(--color-neutral-3);
  }
  :deep(.arco-tabs-content) {
    padding-top: 0;
    .arco-result-subtitle {
      color: rgb(var(--gray-6));
    }
  }
</style>
