<template>
  <a-list
    :bordered="false"
    :scrollbar="true"
    :max-height="520"
    @reach-bottom="onFetchData"
  >
    <a-list-item
      v-for="item in renderList"
      :key="item.id"
      action-layout="vertical"
      :style="{
        opacity: item.messageStatus ? 0.5 : 1,
      }"
    >
      <div class="item-wrap" @click="onItemClick(item)">
        <a-list-item-meta>
          <template #title>
            <a-space :size="4">
              <span>{{ item.title }}</span>
              <a-typography-text type="secondary">
                {{ item.messageText }}
              </a-typography-text>
            </a-space>
          </template>
          <template #description>
            <div>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                }"
                >{{ item.content || '-' }}</a-typography-paragraph
              >
              <a-typography-text class="time-text">
                {{ item.createdAt }}
              </a-typography-text>
            </div>
          </template>
        </a-list-item-meta>
      </div>
    </a-list-item>

    <template #scroll-loading>
      <div v-if="bottom">暂无更多数据</div>
      <a-spin v-else />
    </template>
    <!-- <template #footer>
      <a-space
        fill
        :size="0"
        :class="{ 'add-border-top': renderList.length < showMax }"
      >
        <div class="footer-wrap">
          <a-link @click="allRead">{{ $t('messageBox.allRead') }}</a-link>
        </div>
        <div class="footer-wrap">
          <a-link>{{ $t('messageBox.viewMore') }}</a-link>
        </div>
      </a-space>
    </template> -->
    <div
      v-if="renderList.length && renderList.length < 3"
      :style="{ height: (showMax - renderList.length) * 86 + 'px' }"
    ></div>
  </a-list>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { MessageRecord, MessageListType } from '@/api/message';

  const props = defineProps({
    renderList: {
      type: Array as PropType<any>,
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Boolean,
    },
  });
  const emit = defineEmits(['itemClick', 'fetchData']);
  const allRead = () => {
    emit('itemClick', [...props.renderList]);
  };

  const onItemClick = (item: MessageRecord) => {
    if (!item.status) {
      emit('itemClick', [item]);
    }
  };
  const onFetchData = () => {
    emit('fetchData', []);
  };
  const showMax = 3;
</script>

<style scoped lang="less">
  :deep(.arco-list) {
    .arco-list-item {
      min-height: 86px;
      border-bottom: 1px solid rgb(var(--gray-3));
    }
    .arco-list-item-extra {
      position: absolute;
      right: 20px;
    }
    .arco-list-item-meta-content {
      flex: 1;
    }
    .item-wrap {
      cursor: pointer;
    }
    .time-text {
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
    .arco-empty {
      display: none;
    }
    .arco-list-footer {
      padding: 0;
      height: 50px;
      line-height: 50px;
      border-top: none;
      .arco-space-item {
        width: 100%;
        border-right: 1px solid rgb(var(--gray-3));
        &:last-child {
          border-right: none;
        }
      }
      .add-border-top {
        border-top: 1px solid rgb(var(--gray-3));
      }
    }
    .footer-wrap {
      width: 100%;
      text-align: center;
    }
    .arco-typography {
      margin-bottom: 0;
    }
    .add-border {
      border-top: 1px solid rgb(var(--gray-3));
    }
  }
</style>
