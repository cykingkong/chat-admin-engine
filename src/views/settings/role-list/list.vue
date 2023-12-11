import dayjs from 'dayjs'; import dayjs from 'dayjs';
<template>
  <div class="content">
    <Breadcrumb :items="['系统管理', '角色管理']" />
    <a-row :gutter="24">
      <a-col :span="5">
        <a-card
          style="width: 100%; min-height: 537px"
          class="general-card"
          title="系统角色"
        >
          <a-scrollbar style="height: 71vh; overflow: auto">
            <a-radio-group
              v-model="roleId"
              style="width: 100%"
              direction="vertical"
              :cols="1"
              :row-gap="24"
              @change="roleIdChange($event)"
            >
              <a-radio v-for="(i, k) in roleList" :key="k" :value="i.roleId">
                <template #radio="{ checked }">
                  <a-space class="li" :size="12" :class="{ checkLi: checked }">
                    <icon-user />
                    <span style="white-space: nowrap">{{ i.roleName }}</span>
                  </a-space>
                </template>
              </a-radio>
            </a-radio-group>
          </a-scrollbar>
          <a-button type="text" @click="handleClick(1)">
            <a-space> <icon-plus />添加角色 </a-space>
          </a-button>
        </a-card>
      </a-col>
      <a-col :span="19">
        <a-card
          style="width: 100%"
          class="general-card"
          :title="
            `${acitvingRole.roleName}${
              acitvingRole.memberTotal
                ? '(' + acitvingRole.memberTotal + ')'
                : '-'
            }` || '-'
          "
        >
          <a-space :size="20">
            <div class="status">
              <span>状态：</span>
              <span>
                <a-space>
                  <span
                    v-if="acitvingRole.useStatus === 1"
                    data-status-open
                  ></span>
                  <span v-else data-status-close></span>
                  {{ acitvingRole.useStatus === 1 ? '已启用' : '已禁用' }}
                </a-space>
              </span>
            </div>
            <div class="createTime">
              <span>创建时间：</span>
              <span>{{
                dayjs(acitvingRole.createdAt).format('YYYY-MM-DD')
              }}</span>
            </div>
            <div class="createTime">
              <span>备注：</span>
              <span>{{ acitvingRole.memberRoleRemark || '-' }}</span>
            </div>
          </a-space>
          <a-divider />
          <a-tabs
            :active-key="activeKey"
            lazy-load
            style="height: 68vh"
            @change="tabsChange"
          >
            <a-tab-pane :key="1" title="角色成员">
              <t-table
                drag-sort="col"
                :data="renderData"
                :max-height="1000"
                :columns="columns"
                :loading="loading"
                :pagination="pagination"
                :bordered="false"
                @page-change="onPageChange"
              >
              </t-table>
            </a-tab-pane>
            <a-tab-pane :key="2" title="角色权限">
              <a-scrollbar style="height: 337px; overflow: auto">
                <a-form
                  ref="formRefEdit"
                  style="width: 500px"
                  :model="acitvingRole"
                  :label-col-props="{ span: 6 }"
                  :wrapper-col-props="{ span: 18 }"
                >
                  <a-form-item
                    field="roleName"
                    label="角色名称"
                    :rules="[
                      {
                        required: true,
                        message: '请填写角色名称',
                      },
                    ]"
                  >
                    <a-input
                      v-model="acitvingRole.roleName"
                      style="width: 200px"
                      placeholder="请填写角色名称"
                    />
                  </a-form-item>
                  <a-form-item field="memberRoleRemark" label="角色备注">
                    <a-input
                      v-model="acitvingRole.memberRoleRemark"
                      style="
                         {
                          width: 200px;
                        }
                      "
                      placeholder="请填写角色备注"
                    />
                  </a-form-item>
                  <!-- <a-form-item
                    field="useStatus"
                    label="角色状态"
                    :rules="[
                      {
                        required: true,
                        message: '请填写角色状态',
                      },
                    ]"
                  >
                    <a-radio-group v-model="acitvingRole.useStatus">
                      <a-radio :value="1">启用</a-radio>
                      <a-radio :value="0">禁用</a-radio>
                    </a-radio-group>
                  </a-form-item> -->
                  <a-form-item
                    field="roleData"
                    label="数据权限"
                    :rules="[
                      {
                        required: true,
                        message: '请选择数据权限',
                      },
                    ]"
                  >
                    <a-select
                      v-model="acitvingRole.roleData"
                      allow-clear
                      placeholder="请选择数据权限"
                    >
                      <a-option
                        v-for="(el, key) in roleArr"
                        :key="key"
                        :value="el.value"
                        >{{ el.label }}</a-option
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
                        :model-value="checked3"
                        :indeterminate="indeterminate1"
                        @change="selectChangeKey1"
                        >全选</a-checkbox
                      >

                      <a-tree
                        v-model:checked-keys="acitvingRole.menuId"
                        :checkable="true"
                        :field-names="{
                          key: 'menuId',
                          title: 'menuName',
                          children: 'children',
                          icon: 'menuIcon',
                        }"
                        :only-check-leaf="true"
                        :check-strictly="false"
                        :default-expand-all="false"
                        checked-strategy="all"
                        :data="treeData"
                        @check="changeSelect2"
                      >
                      </a-tree>
                    </a-space>
                  </a-form-item>
                </a-form>
              </a-scrollbar>
              <a-row justify="center">
                <a-col flex="60px"
                  ><a-button type="primary" @click="handleBeforeEdit"
                    >编辑</a-button
                  ></a-col
                >
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
    </a-row>
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
          field="roleName"
          label="角色名称"
          :rules="[
            {
              required: true,
              message: '请填写角色名称',
            },
          ]"
        >
          <a-input v-model="editModel.roleName" placeholder="请填写角色名称" />
        </a-form-item>
        <a-form-item field="memberRoleRemark" label="角色备注">
          <a-input
            v-model="editModel.memberRoleRemark"
            placeholder="请填写角色备注"
          />
        </a-form-item>
        <!-- <a-form-item
          field="useStatus"
          label="角色状态"
          :rules="[
            {
              required: true,
              message: '请填写角色状态',
            },
          ]"
        >
          <a-radio-group v-model="editModel.useStatus">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item> -->
        <a-form-item
          v-if="editModel.type != 3"
          field="roleData"
          label="数据权限"
          :rules="[
            {
              required: true,
              message: '请选择数据权限',
            },
          ]"
        >
          <a-select
            v-model="editModel.roleData"
            allow-clear
            placeholder="请选择数据权限"
          >
            <a-option
              v-for="(el, key) in roleArr"
              :key="key"
              :value="el.value"
              >{{ el.label }}</a-option
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
              :default-expand-all="false"
              checked-strategy="all"
              :data="treeData"
              @check="changeSelect"
            >
            </a-tree>
          </a-space>
        </a-form-item>
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
  import dayjs from 'dayjs';
  import { IconDown, IconStar } from '@arco-design/web-vue/es/icon';
  import { getAllMenuIds } from '@/utils/event';
  import { getMenu } from '@/api/user';
  import { create as createRole, grid as roleGrid } from '@/api/member';
  import _ from 'lodash';
  import * as listMethods from '@/views/settings/listMethods';

  const roleId = ref(0);
  const activeKey = ref(1);
  const acitvingRoleModel = () => {
    return {
      roleId: undefined,
      roleName: '',
      createdAt: '',
      memberRoleRemark: '',
      menuId: [],
    };
  };
  const acitvingRole = ref<any>(acitvingRoleModel());
  const renderData = ref([]);
  const roleList = ref<any[]>([]);
  const checkedKeys = ref<any[]>([]);
  const treeData = ref<any>([]);

  const checked2 = ref(false);
  const checked3 = ref(false);
  const indeterminate = ref(false);
  const indeterminate1 = ref(false);
  const formVisible = ref(false);

  const formTitle = ref('添加角色');
  const editFormModel = () => {
    return {
      roleName: '',
      roleData: 0,
      memberRoleRemark: '',
      useStatus: 1,
      type: 1,
    };
  };

  const editModel = ref(editFormModel());
  const handleClick = (type: any, row?: any) => {
    editModel.value.type = type;
    editModel.value = editFormModel(); // 数据初始化
    checkedKeys.value = []; // 清空选择过的菜单
    formTitle.value = type === 1 ? '添加角色' : '编辑角色';
    formVisible.value = true;
  };

  const getCheckedKeys = computed(() => {
    return checkedKeys.value;
  });
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
  const getCheckedKeys1 = () => {
    return acitvingRole.value.menuId;
  };

  watch(getCheckedKeys1, (newValue: any, oldValue: any) => {
    if (newValue) {
      const arr = getAllMenuIds(treeData.value);
      console.log(newValue);

      if (newValue.length === arr.length) {
        checked3.value = true;
      } else if (newValue.length < arr.length && newValue.length > 0) {
        indeterminate1.value = true;
      } else {
        checked3.value = false;
        indeterminate1.value = false;
      }
    }
  });
  const selectChangeKey = (value: any) => {
    if (value) {
      const arr = getAllMenuIds(treeData.value);
      checkedKeys.value = arr;
    } else {
      checkedKeys.value = [];
    }
  };
  const selectChangeKey1 = (value: any) => {
    checked3.value = value;
    if (value) {
      const arr = getAllMenuIds(treeData.value);
      acitvingRole.value.menuId = arr;
    } else {
      acitvingRole.value.menuId = [];
    }
  };
  const { loading, setLoading } = useLoading(false);
  const roleArr = ref<any>([
    { value: 0, label: '所有' },
    { value: 1, label: '本部门及以下数据权限 ' },
    { value: 2, label: '本部门数据权限' },
    { value: 3, label: '仅本人数据权限' },
  ]);

  const columns = [
    {
      colKey: 'memberNickname',
      title: '用户名称',
      width: '200',
      align: 'center',
    },
    {
      colKey: 'memberAccount',
      title: '手机号',
      width: '200',
      align: 'center',
    },
    {
      colKey: 'memberDepName',
      title: '所属部门',
      width: '200',
      align: 'center',
    },
  ];
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
  const initData = () => {
    listMethods.getRoleGrid().then((res: any) => {
      console.log(res);
      if (res.grid) {
        roleList.value = res.grid;
        roleId.value = res.grid[0].roleId;
        // eslint-disable-next-line prefer-destructuring
        acitvingRole.value = res.grid[0];
        listMethods.getRoleInfoByRoleId(res.grid[0].roleId).then((res) => {
          console.log(res, 'getRoleInfoByRoleId');
        });

        getInfoByRoleId(res.grid[0].roleId);
        // listMethods
        //   .getMeunDataByRole({
        //     roleId: res.grid[0].roleId,
        //   })
        //   .then((menuRes: any) => {
        //     acitvingRole.value.menuId = getAllMenuIds(menuRes.grid);
        //     changeCheckStatus();
        //   });
      }
    });
  };
  const updateAcitvingRole = (roleId: any) => {
    listMethods.getRoleInfoByRoleId(roleId).then((res: any) => {
      console.log();

      res.menuId = getAllMenuIds(res.grid);
      delete res.grid;
      console.log(res, 'getRoleInfoByRoleId');
      acitvingRole.value = res;
    });
  };
  const tabsChange = (e) => {
    console.log(e);
    activeKey.value = e;
  };
  const getInfoByRoleId = (id: any) => {
    listMethods
      .getMeunDataByRole({
        roleId: id,
      })
      .then((res: any) => {
        // if (res.grid) {

        acitvingRole.value.menuId = getAllMenuIds(res.grid);

        changeCheckStatus();
        // }
      });
    listMethods
      .getRoleUserGrid({
        roleId: id,
      })
      .then((res: any) => {
        if (res.grid) {
          renderData.value = res.grid.map((e) => {
            return {
              memberNickname: e.memberNickname || '-',
              memberAccount: e.memberAccount || '-',
              memberDepName: e.memberDepName || '-',
            };
          });
        } else {
          renderData.value = [];
        }
        acitvingRole.value.memberTotal = res.total;
        pagination.total = res.total;
      });
  };
  const roleIdChange = (event: any) => {
    acitvingRole.value = _.find(roleList.value, ['roleId', event]);
    getInfoByRoleId(acitvingRole.value.roleId);
    // listMethods
    //   .getMeunDataByRole({
    //     roleId: acitvingRole.value.roleId,
    //   })
    //   .then((res: any) => {
    //     // if (res.grid) {

    //     acitvingRole.value.menuId = getAllMenuIds(res.grid);

    //     changeCheckStatus();
    //     // }
    //   });
  };

  initData();
  function changeCheckStatus() {
    const arr = getAllMenuIds(treeData.value);

    if (acitvingRole.value.menuId.length === arr.length) {
      checked3.value = true;
    } else if (
      acitvingRole.value.menuId.length < arr.length &&
      acitvingRole.value.menuId.length > 0
    ) {
      indeterminate1.value = true;
    } else {
      checked3.value = false;
      indeterminate1.value = false;
    }
  }
  const getMenuData = async (params: any) => {
    setLoading(true);
    try {
      const { data } = await getMenu(params);
      // data.forEach((key: any, el: any) => {});
      if (data.grid) {
        const clearBeforeData = clearAllChildren(data.grid);
        const arr: any = clearBeforeData.map((e: any) => {
          const obj = {
            menuName: e.menuName,
            menuId: e.menuId,
            children: e.children || [],
            icon: e.menuIcon || '',
          };
          return obj;
        });
        // 特殊处理  不让选中部门管理 将部门管理MenuI
        // eslint-disable-next-line array-callback-return
        treeData.value = arr.map((item: any) => {
          if (item.children.length > 0 && item.menuId === 32) {
            // eslint-disable-next-line array-callback-return, consistent-return
            // item.children =  item.children.filter((e: any) => e.menuId !== 34);
            const filteredChildren = item.children.filter(
              (e: any) => e.menuId !== 34
            );
            item.children = filteredChildren;
          }
          return item;
        });
        console.log(treeData.value);
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

  const changeSelect = (checkedKeys: any) => {
    console.log(checkedKeys);
  };
  const changeSelect2 = (checkedKeys: any) => {
    console.log(acitvingRole.value.menuId, '2');
  };

  // page
  const basePagination: any = {
    current: 1,
    pageIndex: 1,
    pageSize: 30,
    defaultPageSize: 30,
    pageSizeOptions: [10, 30, 50, 100],
    total: 0,
    defaultCurrent: 1,
    page: 1,
  };

  const pagination = reactive({
    ...basePagination,
  });
  getMenuData({
    ...basePagination,
  } as unknown as any);
  const onPageChange = (page: any) => {
    basePagination.pageIndex = page.current;
    basePagination.current = page.current;
    basePagination.pageSize = page.pageSize;
    pagination.pageIndex = page.current;
    pagination.current = page.current;
    pagination.pageSize = page.pageSize;
    // reqModel.value.pageIndex = page.current;
    // reqModel.value.pageSize = page.pageSize;

    // fetchData({
    //   ...reqModel.value,

    //   ...basePagination,
    // } as unknown as any);
  };
  const handleCancel = () => {
    formVisible.value = false;
  };
  const formRef = ref<FormInstance>();
  const formRefEdit = ref<FormInstance>();
  const handleBeforeEdit = async () => {
    const res = await formRefEdit.value?.validate();
    console.log(acitvingRole.value);
    if (acitvingRole.value.menuId.length === 0) {
      Message.info('请为角色分配权限！');
      return;
    }
    const firstdata = {
      roleId: acitvingRole.value.roleId,
      roleName: acitvingRole.value.roleName,
      roleData: acitvingRole.value.roleData,
      useStatus: acitvingRole.value.useStatus,
      memberRoleRemark: acitvingRole.value.memberRoleRemark,
    };
    listMethods.updateRoleT(firstdata).then((res: any) => {
      const menuData = {
        roleId: acitvingRole.value.roleId,
        menuIdArr: acitvingRole.value.menuId,
      };
      acitvingRole.value.menuId.forEach((e: any) => {
        treeData.value.forEach((el: any) => {
          // eslint-disable-next-line prettier/prettier
          if (_.find(el.children, ['menuId', e])) {
            // 判断选中子菜单其中一个，将其parentId添加到数组中

            if (
              el.children.length > 0 &&
              !acitvingRole.value.menuId.includes(
                _.find(el.children, ['menuId', e]).parentId
              )
            ) {
              acitvingRole.value.menuId.push(
                _.find(el.children, ['menuId', e]).parentId
              );
            }
          }
        });
      });
      listMethods.insetMenuInRole(menuData).then((insetRes: any) => {
        if (insetRes.code === 200) {
          Message.success('编辑角色成功');
          updateAcitvingRole(acitvingRole.value.roleId);
          // initData();
        }
      });
    });
  };
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }
    if (editModel.value.type === 1) {
      if (checkedKeys.value.length === 0) {
        Message.info('请为角色分配权限！');
        return;
      }

      listMethods.createRoleT(editModel.value).then((res: any) => {
        console.log(res);
        if (res.code === 200) {
          //   initData();
          const req: any = {
            roleId: res.data.roleId,
            menuIdArr: [],
          };
          req.menuIdArr = checkedKeys.value;
          listMethods.insetMenuInRole(req).then((insetRes: any) => {
            if (insetRes.code === 200) {
              Message.success('添加角色成功');
              formVisible.value = false;
              initData();
            }
          });
        }
      });
    }
    window.setTimeout(() => {
      done();
    }, 300);
  };
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style lang="scss" scoped>
  .content {
    padding: 0 20px 20px 20px;
  }
  .li {
    width: 100%;
    height: 30px;
    border-radius: 8px;
    padding: 0 11px;
    margin-bottom: 12px;
  }
  .checkLi {
    background: rgba(21, 84, 248, 0.1);
  }

  span[data-status-open] {
    width: 8px;
    height: 8px;
    background: rgb(0, 180, 42);
    border-radius: 50%;
  }
  span[data-status-close] {
    width: 8px;
    height: 8px;
    background: rgb(245, 63, 63);
    border-radius: 50%;
  }
</style>
