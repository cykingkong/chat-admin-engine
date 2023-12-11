<template>
  <div class="dialog">
    <t-dialog
      v-model:visible="customColumnsVisableRef"
      width="1020"
      header="自定义列"
      :close-on-overlay-click="false"
      :on-confirm="confirmColums"
      @close="closeColums"
    >
      <t-loading
        size="small"
        :loading="loading"
        show-overlay
        style="width: 100%"
      >
        <t-row :gutter="[0, 0]">
          <t-col :span="9">
            <t-layout style="min-height: 480px">
              <t-header height="42px">
                <div class="title">可选字段</div>
              </t-header>

              <t-layout>
                <t-aside
                  v-if="false"
                  style="min-width: 160px; border: 1px solid #ebebed"
                >
                  <!-- <t-tree
                :data="group"
                :icon="false"
                activable
                expand-all
                class="groupTree"
              /> -->

                  <t-anchor
                    :id="`${path}#default`"
                    style="width: 156px"
                    class="groupTree"
                    container="#anchor-container"
                    :on-change="handleAnchorChange"
                    @click="handleAnchorClick"
                  >
                    <div v-for="(va, key) in group" :key="key">
                      <p style="width: 100%">{{ va.label }}</p>

                      <t-anchor-item
                        v-for="(e, k) in va.children"
                        :key="k"
                        :class="
                          currLink === `#${path}#${e.value}` ? 'active' : ''
                        "
                        :href="`#${path}#${e.value}`"
                        :title="e.label"
                      />
                    </div>
                  </t-anchor>
                </t-aside>
                <t-content
                  id="anchor-container"
                  style="
                    background: #fff;
                    border: 1px solid #ebebed;
                    height: 438px;
                    overflow: auto;
                  "
                >
                  <t-space
                    v-for="(el, key) in group"
                    :key="key"
                    :size="2"
                    direction="vertical"
                    style="width: 100%"
                  >
                    <!-- <p style="margin: 10px 0 10px 10px; font-weight: 500">{{
                  el.label
                }}</p> -->
                    <div style="padding: 20px 10px 10px 20px">
                      <t-space
                        v-for="(e, k) in el.children"
                        :id="`${path}#${e.value}`"
                        :key="k"
                        :size="3"
                        direction="vertical"
                        style="width: 100%"
                      >
                        <!-- <t-checkbox
                      :checked="e.check.length === e.columns.length"
                      :indeterminate="
                        !!(e.columns.length > e.check.length && e.check.length)
                      "
                      style="background: #f7f7f8; width: 100%"
                      :label="e.label"
                      :on-change="
                        (checked) => {
                          e.check = checked ? e.columns : [];
                          let data = checked ? e.check : e.columns;
                          checkChange(checked, data);
                        }
                      "
                    /> -->
                        <span
                          style="
                            font-size: 16px;
                            font-weight: bold;
                            margin-bottom: 10px;
                            display: block;
                          "
                        >
                          {{ e.label }}
                        </span>
                        <t-checkbox-group
                          v-model="e.check"
                          style="width: 100%; margin-bottom: 10px"
                          :on-change="checkChange"
                        >
                          <t-row :gutter="1" style="width: 100%">
                            <t-col
                              v-for="(vv, kk) in e.columns"
                              :key="kk"
                              :span="6"
                            >
                              <t-checkbox
                                :key="vv"
                                :label="findKeyName(vv)"
                                :value="vv"
                              />
                            </t-col>
                          </t-row>
                        </t-checkbox-group>
                      </t-space>
                    </div>
                  </t-space>
                </t-content>
              </t-layout>
            </t-layout>
          </t-col>
          <t-col :span="3">
            <div style="padding-left: 10px">
              <t-layout style="min-height: 480px">
                <t-header height="42px">
                  <div class="title">已选字段 </div>
                </t-header>
                <t-content
                  class="checkTreeTable"
                  style="
                    height: 438px;
                    overflow: auto;
                    background: #fff;
                    border: 1px solid #ebebed;
                  "
                >
                  <t-table
                    v-if="checkTreeTableShow"
                    ref="checkTreeTable"
                    row-key="value"
                    :columns="checkColumns"
                    :data="checkTree"
                    drag-sort="row"
                    :pagination="false"
                    :show-header="false"
                    lazy-load
                    @drag-sort="onDragSort"
                  >
                    <template #drag>
                      <span>
                        <MoveIcon />
                      </span>
                    </template>
                    <template #label="{ row }">
                      <a-row
                        style="width: 100%"
                        justify="space-between"
                        align="center"
                      >
                        {{ row.label }}
                        <icon-close
                          style="cursor: pointer"
                          @click="handleClickSelect(row)"
                        />
                      </a-row>
                    </template>
                  </t-table>
                </t-content>
              </t-layout>
            </div>
          </t-col>
        </t-row>
        <t-row :gutter="[0, 0]">
          <t-col span="60px">
            <a-button type="text" @click="selectAll"> 恢复默认设置 </a-button>
          </t-col>
        </t-row>
      </t-loading>
    </t-dialog>
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    ref,
    getCurrentInstance,
    toRefs,
    toRef,
    triggerRef,
    watch,
    onMounted,
  } from 'vue';
  import get from 'lodash/get';
  import _, { isElement } from 'lodash';
  import { MoveIcon } from 'tdesign-icons-vue-next';
  import { Message, Modal } from '@arco-design/web-vue';

  const checkTreeTable = ref(null);
  const loading = ref(false);
  const props = defineProps({
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    renderColumns: {
      type: Array,
      default() {
        return [];
      },
    },
    findKeyNameColumns: {
      type: Array,
      default() {
        return [];
      },
    },
    group: {
      type: Array,
      default() {
        return [];
      },
    },
    displayColumns: {
      type: Array,
      default() {
        return [];
      },
    },
    sysDefaultColumns: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultColumns: {
      type: Object,
      default() {
        return {
          fixColums: [],
          defaultColumns: [],
        };
      },
    },
    customColumnsVisable: {
      type: Boolean,
      deault: false,
    },
  });
  const {
    customColumnsVisable,
    renderColumns,
    findKeyNameColumns,
    columns,
    group,
    displayColumns,
    sysDefaultColumns,
    defaultColumns,
  } = toRefs(props);
  // const customColumnsVisableRef = toRef(customColumnsVisable);
  const customColumnsVisableRef = ref(false);
  // 复制group 用于还原未点击确定前选中效果
  const groupCp = ref<any[]>([]);
  // 复制CheckTree 用于还原未点击确定前列表效果
  const checkTreeCp = ref<any>([]);
  const checkTreeTableShow = ref(true);
  const checkColumns = [
    {
      colKey: 'drag', // 列拖拽排序必要参数
      title: '排序',
      width: 30,
    },
    { colKey: 'label', title: 'cc' },
  ];

  // 最终筛选的key
  const checkTree = ref<any>([]);

  const checkTreeOld = ref<any>([]);

  // 复制使用的key
  const treeKey = ref<any>([]);

  // 修改后的列
  const changeColumns = ref<any>([]);
  // 第一次进来清空group内check的值
  const firstInClearGroupChildrenCheck = () => {
    return new Promise((resolve: any) => {
      group.value.forEach((el: any) => {
        if (el.children.length > 0) {
          el.children.forEach((e: any) => {
            e.check = [];
          });
        }
      });

      resolve(true);
    });
  };
  // 第一次加载组件时刷新displayColumns，更新视图
  const firstInUpdateDisplayColumns = async () => {
    const cpColumns = columns.value;
    changeColumns.value = [];
    defaultColumns.value.fixColums.forEach((df: any) => {
      treeKey.value.push(df);
      const findKey = _.findIndex(columns.value, ['colKey', df]);
      if (findKey >= 0) {
        changeColumns.value.push(columns.value[findKey]);
        cpColumns.splice(findKey, 1);
      }
    });
    checkTree.value.forEach((e: any) => {
      treeKey.value.push(e.value);
      // 找到当前列的key
      const findKey = _.findIndex(columns.value, ['colKey', e.value]);
      if (findKey >= 0) {
        changeColumns.value.push(columns.value[findKey]);
        cpColumns.splice(findKey, 1);
      }
    });
    cpColumns.forEach((e: any) => {
      changeColumns.value.push(e);
    });
    columns.value = changeColumns.value;
    // 更新父组件
    emit('update:admangeColumnsRef', changeColumns.value);
  };
  // 拖拽排揎变更
  const onDragSort = (params: any) => {
    console.log('onDragSort');
    params.newData.forEach((el: any, key: any) => {
      el.key = key;
    });
    checkTree.value = params.newData;
  };
  // 恢复默认设置 左边全部全选
  const selectAll = () => {
    console.log('selectAll');
    loading.value = true;
    try {
      if (checkTree.value.length >= 0) {
        group.value.forEach((e: any) => {
          if (e.children && e.children.length > 0) {
            e.children.forEach((ee: any) => {
              // 利用map生成新数组 并且赋值给check 如果直接等于 会是浅拷贝 然后再执行删除操作会导致ee.columns
              ee.check = JSON.parse(JSON.stringify(ee.columns));
            });
          }
        });
        checkTree.value = [];
        sysDefaultColumns.value.forEach((df: any) => {
          if (!defaultColumns.value.fixColums.includes(df.colKey)) {
            checkTree.value.push({
              label: df.title,
              value: df.colKey,
            });
          }
        });
        setTimeout(() => {
          loading.value = false;
        }, 1400);
        console.log('selectAll', group.value, checkTree.value);
      }
    } catch {
      Message.info('未知错误，请刷新页面');
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 1000);
    }
  };

  // 点击列表内关闭按钮 取消选中
  const handleClickSelect = (row: any) => {
    console.log(checkTree.value, group.value);
    // 找出点击对应的下标i
    const i = _.findIndex(checkTree.value, function (e: any) {
      return e.value === row.value;
    });
    if (i >= 0 && checkTree.value.length > 1) {
      // 删除对应下标
      checkTree.value.splice(i, 1);
    } else {
      checkTree.value = [];
    }
    // 循环找到group内check值后并且删除
    group.value.forEach((e) => {
      if (e.children && e.children.length > 0) {
        e.children.forEach((ee) => {
          const index = _.findIndex(ee.check, function (data) {
            return data === row.value;
          });
          if (index >= 0) {
            ee.check.splice(index, 1);
          }
        });
      }
    });
  };
  // 排序
  const compare = function (obj1: any, obj2: any) {
    const val1 = obj1.key;
    const val2 = obj2.key;
    if (val1 < val2) {
      return -1;
    }
    if (val1 > val2) {
      return 1;
    }
    return 0;
  };
  watch(
    () => checkTree.value.length,
    (newValue: any) => {
      if (newValue === 0) {
        checkTreeTableShow.value = false;
        setTimeout(() => {
          checkTreeTableShow.value = true;
        }, 200);
      }
    }
  );
  // 选中情况
  const checkChange = (v: any, ctx: any) => {
    // 单选的情况
    if (ctx && ctx.type === 'uncheck') {
      const findKey = _.findIndex(checkTree.value, ['value', ctx.current]);

      if (findKey >= 0) {
        const logCheckTree = JSON.parse(JSON.stringify(checkTree.value));
        console.log(logCheckTree, 'logCheckTree');

        checkTree.value.splice(findKey, 1);
      }
      console.log(findKey, 'uncheck', checkTree.value);
    }
    if (ctx && ctx.type === 'check') {
      const findSortKey = _.findIndex(checkTreeOld.value, [
        'value',
        ctx.current,
      ]);

      const findKey = _.findIndex(checkTree.value, ['value', ctx.current]);
      console.log(findKey, 'check', checkTree.value);

      if (findKey === -1) {
        checkTree.value.push({
          label: findKeyName(ctx.current),
          value: ctx.current,
          key: checkTreeOld.value[findSortKey].key,
        });
        // checkTree.value = [
        //   ...checkTree.value,
        //   {
        //     label: findKeyName(ctx.current),
        //     value: ctx.current,
        //     key: checkTreeOld.value[findSortKey].key,
        //   },
        // ];
      }
    }

    // 全选的情况
    if (typeof v === 'boolean') {
      if (v) {
        ctx.forEach((ch: any) => {
          const findKey = _.findIndex(checkTree.value, ['value', ch]);
          const findSortKey = _.findIndex(checkTreeOld.value, [
            'value',
            ctx.current,
          ]);
          if (findKey === -1) {
            checkTree.value.push({
              label: findKeyName(ch),
              value: ch,
              key: checkTreeOld.value[findSortKey].key,
            });
          }
        });
      } else {
        ctx.forEach((ch: any) => {
          const findKey = _.findIndex(checkTree.value, ['value', ch]);
          if (findKey >= 0) {
            checkTree.value.splice(findKey, 1);
          }
        });
      }
    }
    // // 依照排序重新排序
    checkTree.value.sort(compare);
    console.log('onDragSort');
  };

  // 查找名称
  const findKeyName = (key: any) => {
    const findKey = _.findIndex(findKeyNameColumns.value, ['colKey', key]);
    return findKeyNameColumns.value[findKey]
      ? findKeyNameColumns.value[findKey].title
      : '';
  };

  const { ctx } = getCurrentInstance();
  const path = computed(() => get(ctx, '$route.path', ''));

  const currLink = ref('');
  const handleAnchorClick = ({ e, href, title }) => {
    e.preventDefault();
  };

  // 瞄点事件
  const handleAnchorChange = (currentLink: any, prevLink: any) => {
    currLink.value = currentLink;
    return true;
  };

  // 关联父组件
  const emit = defineEmits([
    'update:customColumnsVisable',
    'update:displayColumns',
    'update:admangeColumnsRef',
    'updateColumns',
  ]);
  // 关闭弹窗
  const closeColums = () => {
    // group.value = groupCp.value
    // group.value = Object.assign(group.value, groupCp.value);
    console.log(groupCp.value, 'closeColums');

    if (groupCp.value.length) {
      // 深拷贝赋值，还原未做修改的状态
      for (let i: any = 0; i < group.value.length; i += 1) {
        for (let j = 0; j < group.value[i].children.length; j += 1) {
          console.log(groupCp.value);
          if (groupCp.value[i].children[j]) {
            group.value[i].children[j].check = JSON.parse(
              JSON.stringify(groupCp.value[i].children[j].check || [])
            );
          }
        }
      }
    }

    checkTree.value = JSON.parse(JSON.stringify(checkTreeCp.value));
  };

  // 确认提交
  const confirmColums = () => {
    customColumnsVisableRef.value = false;

    const cpColumns = columns.value;
    treeKey.value = [];
    changeColumns.value = [];
    // // 依照排序重新排序
    // checkTree.value.sort(compare);
    // 添加固定列
    defaultColumns.value.fixColums.forEach((df: any) => {
      treeKey.value.push(df);
      const findKey = _.findIndex(columns.value, ['colKey', df]);
      if (findKey >= 0) {
        changeColumns.value.push(columns.value[findKey]);
        cpColumns.splice(findKey, 1);
      }
    });

    checkTree.value.forEach((e: any) => {
      treeKey.value.push(e.value);
      // 找到当前列的key
      const findKey = _.findIndex(columns.value, ['colKey', e.value]);
      if (findKey >= 0) {
        changeColumns.value.push(columns.value[findKey]);
        cpColumns.splice(findKey, 1);
      }
    });

    cpColumns.forEach((e: any) => {
      changeColumns.value.push(e);
    });

    // if (changeColumns.value.length >= treeKey.value.length) {
    columns.value = changeColumns.value;
    // }
    //  else {
    //   changeColumns.value = [];

    //   treeKey.value.forEach((e: any) => {
    //     const item: any = _.find(sysDefaultColumns.value, ['colKey', e]);
    //     changeColumns.value.push(item);
    //   });
    //   columns.value = changeColumns.value;
    // }
    emit('update:displayColumns', treeKey.value);
    emit('update:admangeColumnsRef', changeColumns.value);
    emit('updateColumns', treeKey.value);

    // 点击提交 更新groupCp值至最新选中状态
    for (let i: any = 0; i < groupCp.value.length; i += 1) {
      for (let j = 0; j < groupCp.value[i].children.length; j += 1) {
        groupCp.value[i].children[j].check = JSON.parse(
          JSON.stringify(group.value[i].children[j].check)
        );
      }
    }
    checkTreeCp.value = JSON.parse(JSON.stringify(checkTree.value));
  };
  onMounted(() => {
    // 默认显示的列
    setTimeout(() => {
      if (defaultColumns.value.defaultColumns.length > 0) {
        firstInClearGroupChildrenCheck().then((res) => {
          if (res) {
            group.value.forEach((el: any) => {
              if (el.children.length > 0) {
                el.children.forEach((e: any) => {
                  defaultColumns.value.defaultColumns.forEach((df: any) => {
                    const findKey = e.columns.indexOf(df);
                    if (findKey >= 0) {
                      e.check.push(df);
                    }
                  });
                });
              }
            });
            groupCp.value = JSON.parse(JSON.stringify(group.value));
          }
        });
      } else {
        groupCp.value = JSON.parse(JSON.stringify(group.value));
      }

      sysDefaultColumns.value.forEach((el: any, key: any) => {
        if (!defaultColumns.value.fixColums.includes(el.colKey)) {
          checkTreeOld.value.push({
            key: key - defaultColumns.value.fixColums.length,
            label: el.title,
            value: el.colKey,
          });
        }
      });
    }, 1500);

    // 渲染问题，延时增加
    setTimeout(() => {
      checkTree.value = [];
      defaultColumns.value.defaultColumns.forEach((df: any, key: any) => {
        checkTree.value.push({
          key,
          label: findKeyName(df),
          value: df,
        });
      });
      console.log('setTimeout', defaultColumns.value.defaultColumns);
      checkTreeCp.value = _.cloneDeep(checkTree.value);
      firstInUpdateDisplayColumns();
    }, 1200);
  });
  watch(
    () => customColumnsVisable.value,
    (newVal) => {
      if (newVal) {
        customColumnsVisableRef.value = true;
      }
    }
  );
  watch(
    () => customColumnsVisableRef.value,
    (newValue) => {
      emit('update:customColumnsVisable', newValue);
    }
  );
  watch(
    () => defaultColumns.value,
    (newVal) => {
      // console.log(newVal);
    }
  );
</script>

<style scoped lang="less">
  .groupTree {
    padding-top: 1px;
    :deep .t-anchor__line {
      display: none;
    }

    p {
      margin: 10px 0 10px 10px;
      font-weight: 500;
    }
  }

  .title {
    padding: 10px;
    font-weight: 700;
    color: #323335;
    background-color: #fbfcfc;
    border: 1px solid #ebebed;
  }
  :deep .t-is-checked {
    color: #4394f7;
  }
  .dialog {
    :deep(.t-dialog) {
      .t-dialog__header .t-dialog__header-content {
        justify-content: center;
      }
    }
  }

  .checkTreeTable::webkit-scrollbar {
    display: none;
  }
</style>
