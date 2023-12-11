<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '部门管理']" />
    <a-row align="center">
      <a-col>
        <div
          v-if="topTipsBar"
          class="topTipsBar"
          :class="topTipsBar ? 'tipsShow' : ''"
        >
          <img
            v-if="topTipsBarContent"
            src="https://img.adyinqing.com/upai_shop/x3pg1vne1690430298724"
            alt=""
            class="icon"
          />
          <div v-if="topTipsBarContent" class="tipsText"
            >全新团队管理上线。修改子账号的权限现调整为通过角色进行管理，请及时创建角色进行调整。（原子账号权限不受影响）</div
          >
        </div>
      </a-col>
    </a-row>
    <a-card class="general-card" title="部门管理">
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button
              type="primary"
              @click="
                handleClick(1, {
                  memberDepId: 0,
                })
              "
            >
              <template #icon>
                <icon-plus />
              </template>
              新建部门
            </a-button>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <!-- <a-button type="primary" style="margin-right: 13px">
            <template #icon> <icon-menu-unfold /> </template>
            自定义列
          </a-button> -->
          <!-- <TableFluter ref="tableFluter" /> -->
          <a-button type="primary" @click="search()">
            <template #icon> <icon-refresh /> </template>
            刷新
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="memberDepId"
        :loading="loading"
        :pagination="false"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <!-- <a-table-column title="id">
            <template #cell="{ record }">
              {{ record.ruleId || 0 }}
            </template>
          </a-table-column> -->
          <a-table-column title="部门名称">
            <template #cell="{ record }">
              {{ record.memberDepName || '-' }}
            </template>
          </a-table-column>

          <a-table-column title="部门负责人" align="center">
            <template #cell="{ record }">
              {{ record.leaderName || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="部门人数" align="center">
            <template #cell="{ record }">
              {{ record.memberCount || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="部门备注" align="center">
            <template #cell="{ record }">
              {{ record.memberDepRemark || '-' }}
            </template>
          </a-table-column>

          <a-table-column title="操作" data-index="operations" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button
                  type="text"
                  size="small"
                  @click="handleClick(2, record)"
                >
                  编辑
                </a-button>
                <a-button
                  type="text"
                  size="small"
                  @click="handleClick(1, record)"
                >
                  新增子部门
                </a-button>
                <!-- <a-popconfirm
                  content="确定清除对应身份菜单缓存？"
                  @ok="hadleClickDeleteCache(record.ruleId)"
                >
                  <a-button type="text" size="small">
                    清除对应身份菜单缓存
                  </a-button>
                </a-popconfirm> -->
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <!-- <div
        class="pagination"
        style="display: flex; justify-content: space-between; margin-top: 15px"
      >
        <div>
          <a-pagination
            v-model:current="pagination.pageIndex"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :show-total="true"
            :show-page-size="true"
            :page-size="pagination.pageSize"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="onPageChange"
            @page-size-change="pageSizeChange"
        /></div>
      </div> -->
    </a-card>

    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      :width="editModel.type === 1 ? '40%' : '70%'"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form
        ref="formRef"
        :model="editModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="deptName"
          label="部门名称"
          :rules="[
            {
              required: true,
              message: '请填写部门名称',
            },
          ]"
        >
          <a-input v-model="editModel.deptName" />
        </a-form-item>
        <a-form-item field="leaderName" label="部门负责人">
          <a-input v-model="editModel.leaderName" />
        </a-form-item>
        <a-form-item field="depRemark" label="备注（非必填）">
          <a-input v-model="editModel.depRemark" />
        </a-form-item>

        <!-- <a-form-item 
          field="ruleStatus"
          label="权限状态"
          :rules="[
            {
              required: true,
              message: '请填写密码',
            },
          ]"
        >
          <a-select
            v-model="editModel.ruleStatus"
            allow-clear
            placeholder="请选择状态"
          >
            <a-option
              v-for="(el, key) in ruleStatusList"
              :key="key"
              :value="el.dictionaryCode"
              >{{ el.dictionaryName }}</a-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          field=""
          label="权限管理"
          :rules="[
            {
              required: true,
              message: '请选择菜单',
            },
          ]"
        >
          <a-space direction="vertical">
            <a-checkbox
              :model-value="checked2"
              :indeterminate="indeterminate"
              @change="selectChangeKey"
              >全选</a-checkbox
            >

            <a-tree
              v-model:checked-keys="checkedKeys"
              :checkable="true"
              :field-names="{
                key: 'menuId',
                title: 'menuName',
                children: 'children',
                icon: 'menuIcon',
              }"
              :only-check-leaf="true"
              :check-strictly="false"
              checked-strategy="all"
              :data="treeData"
              @check="changeSelect"
            >
            </a-tree>
          </a-space>
        </a-form-item>-->
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    getDepment,
    getMenu,
    insertDepment,
    buildDeptMenu,
    updateDepment,
    getMeunDataByDepment,
  } from '@/api/settings';
  import { getAllMenuIds } from '@/utils/event';
  import { IconDown, IconStar } from '@arco-design/web-vue/es/icon';

  import dayjs from 'dayjs';

  // import TableFluter from './components/table-fluter.vue';

  // const tableFluter = ref<InstanceType<typeof TableFluter>>();
  // const tableHeader = [
  //   { key: 'userName', check: true, label: '账户名称' },
  //   { key: 'createDate', check: true, label: '创建时间' },
  // ];
  // setTimeout(() => {
  //   tableFluter.value?.setData(tableHeader);
  //   // const keyData = tableFluter.value?.getData();
  // }, 200);
  const checkedKeys = ref<any[]>([]);

  const expandedKeys = ref<any>([]);
  const selectArr = ref<any>([]);
  const generateFormModel = () => {
    return {
      ruleName: '',
      ruleStatus: '',
    };
  };

  const ruleStatusList = ref<any[]>();

  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const checked2 = ref(false);

  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const topTipsBarContent = ref(false);
  const topTipsBar = ref(false);

  // page
  const basePagination: any = {
    pageIndex: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  // list data
  const fetchData = async (params: { pageIndex: 1; pageSize: 20 }) => {
    setLoading(true);
    try {
      const { data } = await getDepment(params);
      renderData.value = clearAllChildren(data.grid);
      // pagination.current = params.pageIndex;
      // pagination.pageIndex = params.pageIndex;
      // pagination.total = data.total;
    } catch (err) {
      console.log(err);
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
      topTipsBar.value = true;
      setTimeout(() => {
        topTipsBarContent.value = true;
      }, 320);
    }
  };
  const treeData = ref<any>([]);
  const getMenuData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await getMenu(params);
      // data.forEach((key: any, el: any) => {});
      if (data.grid) {
        const clearBeforeData = clearAllChildren(data.grid);
        treeData.value = clearBeforeData.map((e: any) => {
          const obj = {
            menuName: e.menuName,
            menuId: e.menuId,
            children: e.children || [],
            icon: e.menuIcon || '',
          };
          return obj;
        });
        // pagination.current = params.pageIndex;
        // pagination.pageIndex = params.pageIndex;
        // pagination.total = data.total;
      }

      console.log(treeData.value);
    } catch (err) {
      console.log(err);
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  getMenuData({
    ...basePagination,
  } as unknown as any);
  const clearAllChildren = (items: any, childrenName = 'children') => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // 当前对象存在children
      if (item && item[childrenName]) {
        // children为空数组时删除
        if (item[childrenName].length === 0) {
          delete item[childrenName];
        } else {
          // 递归当前children数组
          clearAllChildren(item[childrenName], childrenName);
        }
      }
    }
    return items;
  };
  const changeSelect = (checkedKeys: any) => {
    console.log(checkedKeys);
  };
  const onPageChange = (current: number) => {
    basePagination.pageIndex = current;
    basePagination.current = current;
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as any);
  };

  const menuSelectChange = (rowKeys: any, rowKey: any, record: any) => {
    // advSaveReq.value.advMap = [];
    // // const key = rowKeys.length > 0 ? rowKeys[rowKeys.length - 1] : null;
    // advcheckedKeyss.value = rowKeys;
    // rowKeys.forEach((el: any) => {
    //   advSaveReq.value.advMap.push({
    //     advId: el,
    //     advCode: advCodeMap.value[el],
    //   });
    // });
    editModel.value.menuList = rowKeys;
    selectArr.value = rowKeys;
    console.log(rowKeys, editModel.value, expandedKeys.value);
  };
  // 搜索
  const search = () => {
    onPageChange(1);
    getMenuData({
      ...basePagination,
    } as unknown as any);
  };
  const getCheckedKeys = computed(() => {
    return checkedKeys.value;
  });
  const indeterminate = ref(false);
  watch(getCheckedKeys, (newValue: any, oldValue: any) => {
    console.log(newValue.length, treeData.value.length);
    const arr = getAllMenuIds(treeData.value);
    if (newValue.length === arr.length) {
      checked2.value = true;
    } else if (newValue.length < arr.length && newValue.length > 0) {
      indeterminate.value = true;
    } else {
      checked2.value = false;
      indeterminate.value = false;
    }
  });
  fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as any);

  const pageSizeChange = (size: number) => {
    // console.log(size);
    basePagination.pageSize = size;
    pagination.pageSize = size;
    search();
  };
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const formVisible = ref(false);
  const formTitle = ref('新增部门');
  const editFormModel = () => {
    return {
      deptName: '',
      depRemark: '',
      deptParent: 0,
      // userId: '',
      // menuList: [],

      type: 1,
    };
  };

  const editModel = ref(editFormModel());
  const editRow = ref(editFormModel());
  // 查找MenuId
  const getMenuIds = (arr: any) => {
    let menuIds: number[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr.length; i++) {
      // eslint-disable-next-line prettier/prettier, prefer-const
      let obj = arr[i];
      if (obj.menuId) {
        menuIds.push(obj.menuId);
      }
      if (obj.children && obj.children.length > 0) {
        // eslint-disable-next-line prefer-const
        let childMenuIds = getMenuIds(obj.children);
        menuIds = menuIds.concat(childMenuIds);
      }
    }
    return menuIds;
  };

  // 根据ID查找depMenuId
  const getDepmentMenu = (id: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const { data } = await getMeunDataByDepment({ deptId: id });
      let arr: any = [];
      if (data.grid) {
        arr = getMenuIds(data.grid);
      }
      console.log(arr);
      resolve(arr);
    });
  };

  // 查找父MenuId
  const findParentMenuId = (arr: any, targetMenuId: any) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj.menuId === targetMenuId) {
        return obj.parentId;
      }
      if (obj.children && obj.children.length > 0) {
        const parentMenuId: any = findParentMenuId(obj.children, targetMenuId);
        if (parentMenuId !== null) {
          return parentMenuId;
        }
      }
    }
    return null;
  };
  const handleClick = (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '编辑部门信息';
      editRow.value.deptName = row.memberDepName;
      editRow.value.depRemark = row.memberDepRemark;
      editRow.value.deptId = row.memberDepId;
      editModel.value.deptName = row.memberDepName;
      editModel.value.depRemark = row.memberDepRemark;
      editModel.value.leaderName = row.leaderName;
      editModel.value.deptId = row.memberDepId;
      checkedKeys.value = [];
      editRow.value.type = 2;
      // getDepmentMenu(row.memberDepId).then((res: any) => {
      //   checkedKeys.value = res;
      // });
      editModel.value.type = 2;
    } else {
      formTitle.value = '新增部门';
      if (row.memberDepId !== 0) {
        formTitle.value = '新增子部门';
      }
      editModel.value = editFormModel();
      editModel.value.deptParent = row.memberDepId;
      checkedKeys.value = [];
      editModel.value.type = 1;
    }
    formVisible.value = true;
  };

  const formRef = ref<FormInstance>();
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    console.log(res);
    // if (!checkedKeys.value.length) {
    //   Message.info('请先选择权限');
    //   return;
    // }
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 1) {
      insertDepment(editModel.value).then(({ data, code }) => {
        if (code === 200) {
          // const req: any = {
          //   deptId: data.memberDepId,
          //   menuIdArr: [],
          // };
          // req.menuIdArr = checkedKeys.value;
          // buildDeptMenu(req).then((res) => {
          //   if (res.code === 200) {
          Message.success({
            content: '添加成功',
            duration: 5 * 1000,
          });
          search();
          //   }
          // });
        }
      });
    } else {
      // const req = {
      //   deptId: editModel.value.deptId,
      //   menuIdArr: [],
      // };
      // const parentIds: any = [];
      // checkedKeys.value.forEach((e) => {
      //   if (findParentMenuId(treeData.value, e)) {
      //     parentIds.push(findParentMenuId(treeData.value, e));
      //   }
      // });

      // // 去重

      // const parentIdArr: any = new Set(parentIds);
      // req.menuIdArr = [...checkedKeys.value, ...parentIdArr];
      // const res = await buildDeptMenu(req);

      // if (JSON.stringify(editModel.value) === JSON.stringify(editRow.value)) {
      //   console.log('未发生修改');
      // } else {
      const editReq = {
        deptId: editModel.value.deptId,
        deptName: editModel.value.deptName,
        depRemark: editModel.value.depRemark,
        leaderName: editModel.value.leaderName,
      };
      const { data } = await updateDepment(editReq);
      Message.success({
        content: '修改成功',
        duration: 5 * 1000,
      });
      // }

      search();
    }

    window.setTimeout(() => {
      done();
    }, 300);
  };
  const hadleClickDeleteCache = async (id: any) => {
    // const { data } = await clearRuleCache({ ruleId: id });
    Message.success({
      content: '清除成功',
      duration: 5 * 1000,
    });
  };
  const handleCancel = () => {
    formVisible.value = false;
  };
  const selectChangeKey = (value: any) => {
    console.log(value);
    if (value) {
      const arr = getAllMenuIds(treeData.value);
      console.log(arr);
      checkedKeys.value = arr;
    } else {
      checkedKeys.value = [];
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .topTipsBar {
    width: 100%;
    height: 0;
    border-radius: 8px;
    background: #0f58f54d;
    padding: 0 24px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    transition: all 0.3s;
    .icon {
      width: 15.33px;
      height: 15.33px;
      margin-right: 10px;
    }
    .tipsText {
      font-size: 16px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #000000;
      display: flex;
      .link {
        color: #1059f5;
        cursor: pointer;
      }
    }
  }
  .tipsShow {
    height: 42px;
    margin-bottom: 24px;
  }
</style>
