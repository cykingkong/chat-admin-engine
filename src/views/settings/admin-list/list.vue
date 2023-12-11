<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '子账号管理']" />
    <a-card class="general-card" title="子账号管理">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" auto-label-width label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="memberNickname"
                  label="账户昵称"
                  label-col-flex="60px"
                >
                  <a-input
                    v-model="formModel.memberNickname"
                    placeholder="请输入账户昵称"
                    allow-clear
                    @press-enter="search"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="memberAccount"
                  label="登录账号"
                  label-col-flex="60px"
                >
                  <a-input
                    v-model="formModel.memberAccount"
                    placeholder="请输入登录账号"
                    allow-clear
                    @press-enter="search"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="memberDepId"
                  label="所属部门"
                  label-col-flex="60px"
                >
                  <a-cascader
                    v-model="formModel.memberDepId"
                    :options="depmentArr"
                    check-strictly
                    allow-clear
                    :field-names="{
                      value: 'memberDepId',
                      label: 'memberDepName',
                    }"
                    placeholder="请选择所属部门"
                    @clear="clearDep"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="memberStatus"
                  label="状态"
                  label-col-flex="30px"
                >
                  <a-select
                    v-model="formModel.memberStatus"
                    allow-clear
                    placeholder="请选择状态"
                  >
                    <a-option
                      v-for="(el, key) in userStatusList"
                      :key="key"
                      :value="el.value"
                      >{{ el.label }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="roleId" label="角色" label-col-flex="30px">
                  <a-select
                    v-model="formModel.roleId"
                    allow-clear
                    placeholder="请选择角色"
                  >
                    <a-option
                      v-for="(el, key) in roleList"
                      :key="key"
                      :value="el.roleId"
                      >{{ el.roleName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8"> </a-col>
              <a-col :span="8">
                <a-form-item field="number" :hide-label="true">
                  <a-space :size="18">
                    <a-button type="primary" class="searchBtn" @click="search">
                      筛选
                    </a-button>
                    <a-button
                      type="outline"
                      class="refreshBtn"
                      @click="search()"
                    >
                      刷新
                    </a-button>
                    <a-typography-text type="primary">
                      <a-link href="javascript:void(0)" @click="refresh()"
                        >重置筛选条件</a-link
                      >
                    </a-typography-text>
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>

        <!-- <a-divider style="height: 42px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
          </a-space>
        </a-col> -->
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick(1)">
              <template #icon>
                <icon-plus />
              </template>
              新建子账号
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
        row-key="id"
        :loading="loading"
        :pagination="false"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="账户昵称" align="center">
            <template #cell="{ record }">
              <!-- <a-link href="javascript:void(0)" @click="userDetail(record)"> -->
              {{ record.memberNickname || 0 }}
              <!-- </a-link> -->
            </template>
          </a-table-column>
          <a-table-column title="登录账号" align="center">
            <template #cell="{ record }">
              {{ record.memberAccount || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="用户角色" align="center">
            <template #cell="{ record }">
              {{ record.roleName || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="所属部门" align="center">
            <template #cell="{ record }">
              {{ record.member_dep_name || '-' }}
            </template>
          </a-table-column>
          <a-table-column title="账号状态" align="center">
            <template #cell="{ record }">
              {{ userStatus[record.memberStatus] || 0 }}
            </template>
          </a-table-column>
          <a-table-column title="创建时间" align="center">
            <template #cell="{ record }">
              {{
                record.createdAt
                  ? dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  : '-'
              }}
            </template>
          </a-table-column>
          <a-table-column title="备注" align="center">
            <template #cell="{ record }">
              {{ record.memberUserRemark || '-' }}
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
                <!-- <a-button
                  type="text"
                  size="small"
                  @click="handleClickChangeStatus(record)"
                >
                  停用
                </a-button> -->
                <a-popconfirm
                  content="确认是否删除此子账号"
                  ok-text="确认"
                  @ok="handleClickDel(record)"
                >
                  <a-button type="text" status="danger" size="small">
                    删除
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <div
        class="pagination"
        style="display: flex; justify-content: space-between; margin-top: 15px"
      >
        <div></div>
        <div>
          <a-pagination
            v-model:current="pagination.pageIndex"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :show-total="true"
            :show-page-size="true"
            :page-size="pageSize"
            :page-size-options="[10, 20, 50, 100, 200]"
            @change="onPageChange"
            @page-size-change="pageSizeChange"
        /></div>
      </div>
    </a-card>

    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      width="900px"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form
        ref="formRef"
        style="margin: 0 auto; width: 800px"
        :model="editModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-space style="width: 100%" align="start">
          <a-card
            class="general-card"
            style="width: 400px"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{ padding: '17px 20px 21px 20px' }"
            title="用户信息"
          >
            <a-form-item
              v-if="editModel.type != 3"
              field="memberNickname"
              label="用户昵称"
              :rules="[
                {
                  required: true,
                  message: '请填写用户昵称',
                },
              ]"
            >
              <a-input
                v-model="editModel.memberNickname"
                allow-clear
                placeholder="请填写用户昵称"
              />
            </a-form-item>
            <a-form-item
              v-if="editModel.type != 3"
              field="memberAccount"
              label="登录手机号"
              :rules="[
                {
                  required: true,
                  message: '请填写登录手机号',
                },
              ]"
            >
              <a-input
                v-model="editModel.memberAccount"
                allow-clear
                placeholder="请填写登录手机号"
              />
            </a-form-item>
            <a-form-item
              v-if="editModel.type != 3"
              field="memberPassword"
              label="登录密码"
              :rules="[
                {
                  required: editModel.type == 1 ? true : false,
                  message: '请填写登录密码',
                },
              ]"
            >
              <!-- <a-input-password v-model="editModel.memberPassword" allow-clear  v-if="editModel.value===1"/> -->
              <a-input
                v-model="editModel.memberPassword"
                allow-clear
                placeholder="请填写登录密码"
              />
            </a-form-item>
            <a-form-item
              v-if="editModel.type != 3"
              field="memberDepId"
              label="所属部门"
              :rules="[
                {
                  required: true,
                  message: '请选择所属部门',
                },
              ]"
            >
              <a-cascader
                v-model="editModel.memberDepId"
                :options="depmentArr"
                check-strictly
                allow-clear
                :field-names="{ value: 'memberDepId', label: 'memberDepName' }"
                placeholder="请选择所属部门"
              />
            </a-form-item>

            <a-form-item
              v-if="editModel.type != 3"
              field="memberStatus"
              label="状态"
              :rules="[
                {
                  required: true,
                  message: '请选择状态',
                },
              ]"
            >
              <a-select
                v-model="editModel.memberStatus"
                allow-clear
                placeholder="请选择状态"
              >
                <a-option
                  v-for="(el, key) in userStatusList"
                  :key="key"
                  :value="el.value"
                  >{{ el.label }}</a-option
                >
              </a-select>
            </a-form-item>

            <a-form-item field="memberUserRemark" label="备注">
              <a-input
                v-model="editModel.memberUserRemark"
                placeholder="请填写备注"
              />
            </a-form-item>
          </a-card>

          <a-card
            class="general-card"
            style="width: 400px"
            :header-style="{ paddingBottom: '0' }"
            :body-style="{ padding: '17px 20px 21px 20px' }"
            title="权限配置"
          >
            <a-form-item
              field="roleId"
              label="用户角色"
              :rules="[
                {
                  required: true,
                  message: '请选择数据权限',
                },
              ]"
            >
              <a-select
                v-model="editModel.roleId"
                allow-clear
                placeholder="请选择用户角色"
                @change="roleIdChange"
              >
                <a-option
                  v-for="(el, key) in roleList"
                  :key="key"
                  :value="el.roleId"
                  >{{ el.roleName }}</a-option
                >
              </a-select>
            </a-form-item>

            <a-form-item label="数据权限">
              <a-typography-text>
                {{ dataRoleText }}
              </a-typography-text>
              <!-- <a-select
            v-model="editModel.dataRole"
            allow-clear
            placeholder="请选择数据权限"
          >
            <a-option
              v-for="(el, key) in roleArr"
              :key="key"
              :value="el.value"
              >{{ el.label }}</a-option
            >
          </a-select> -->
            </a-form-item>
            <a-form-item label="菜单权限" style="position: relative">
              <div class="treeMark"> </div>
              {{ checkedKeys.length === 0 ? '请先选择用户角色' : '' }}
              <a-tree
                v-show="checkedKeys.length > 0"
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
                :default-expand-all="true"
                checked-strategy="all"
                :data="treeData"
              >
              </a-tree>
            </a-form-item>
          </a-card>
        </a-space>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    getUserPage,
    memberEdit,
    getDepment,
    insertUser,
    updateUser,
    deleteUser,
  } from '@/api/settings';
  import { getMenu } from '@/api/user';

  import { clearAllChildren, getAllMenuIds } from '@/utils/event';
  import { userStatus } from '@/utils/enum';

  import * as listMethods from '@/views/settings/listMethods';
  import _ from 'lodash';

  const userStatusList = ref<any[]>([
    { value: 0, label: '禁用' },
    { value: 1, label: '启用' },
  ]);
  const checkedKeys = ref<any>([]);
  const treeData = ref<any>([]);
  const getMenuData = async (params: any) => {
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
      }
    } catch (err) {
      console.log(err);
      // you can report use errorHandler or other
    }
  };

  // const getDictionaryList = async () => {
  // };

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

  const generateFormModel = () => {
    return {};
  };
  const clearDep = () => {
    delete formModel.value.memberDepId;
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const roleList = ref<any[]>([]);
  const dataRoleText = ref('请先选择用户角色');
  listMethods.getRoleGrid().then((res: any) => {
    if (res.grid) {
      roleList.value = res.grid;
    }
    console.log(roleList.value);
  });
  const roleArr = ref<any>([
    { value: 0, label: '所有' },
    { value: 1, label: '本部门及以下数据权限 ' },
    { value: 2, label: '本部门数据权限' },
    { value: 3, label: '仅本人数据权限' },
  ]);

  const roleIdChange = (event: any) => {
    console.log(event);
    if (event) {
      const dataRole = _.find(roleList.value, ['roleId', event]).roleData;
      dataRoleText.value = roleArr.value[dataRole].label;
      listMethods
        .getMeunDataByRole({
          roleId: event,
        })
        .then((res: any) => {
          checkedKeys.value = getAllMenuIds(res.grid);
        });
    } else {
      dataRoleText.value = '请先选择用户角色';
      checkedKeys.value = [];
    }
  };
  const depmentArr = ref([]);
  const flatArr = (arr: any) => {
    const ar = arr.map((item: any) => item.children).flat();
    console.log(arr);

    return ar;
  };
  const getDepArr = async (params: { pageIndex: 1; pageSize: 20 }) => {
    setLoading(true);
    try {
      const { data } = await getDepment(params);
      depmentArr.value = clearAllChildren(data.grid);
      console.log(flatArr(depmentArr.value));
      // pagination.current = params.pageIndex;
    } catch (err) {
      // console.log(err);
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  getDepArr({ pageIndex: 1, pageSize: 20 });
  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  // const userDetail = async (row: any) => {
  //   const { data } = await getSysUserById({ sysUserId: row.userId });
  //   console.log(data);
  // };
  // page
  const basePagination: any = {
    current: 1,
    pageIndex: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  getMenuData({
    ...basePagination,
  } as unknown as any);
  // list data
  const fetchData = async (params: { pageIndex: 1; pageSize: 20 }) => {
    setLoading(true);
    try {
      const { data } = await getUserPage(params);
      renderData.value = data.grid;
      pagination.current = params.pageIndex;
      pagination.pageIndex = params.pageIndex;
      pagination.total = data.total;
    } catch (err) {
      console.log(err);
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (current: number) => {
    basePagination.pageIndex = current;
    basePagination.current = current;
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as any);
  };

  // 搜索
  const search = () => {
    onPageChange(1);
    getDepArr({ pageIndex: 1, pageSize: 20 });
  };

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

  const refresh = () => {
    formModel.value = generateFormModel();
  };
  const formVisible = ref(false);
  const formTitle = ref('新增子账号');
  const editFormModel = () => {
    return {
      memberAccount: '',
      memberUserRemark: '',
      memberNickname: '',
      memberPassword: '',
      memberDepId: undefined,
      memberUserId: undefined,
      roleId: undefined,
      memberStatus: 1,
      dataRole: undefined,
      type: 1,
    };
  };
  const editModel = ref(editFormModel());

  const handleClick = (type: number, row?: any) => {
    if (type === 2) {
      formTitle.value = '编辑子账号信息';
      editModel.value.memberAccount = row.memberAccount;
      editModel.value.memberNickname = row.memberNickname;
      editModel.value.memberUserRemark = row.memberUserRemark;
      editModel.value.memberDepId = row.memberDepId;
      editModel.value.dataRole = row.dataRole;
      editModel.value.roleId = row.roleId ? row.roleId : undefined;
      dataRoleText.value = roleArr.value[row.roleData].label;
      checkedKeys.value = [];
      if (row.roleId) {
        listMethods
          .getMeunDataByRole({
            roleId: row.roleId || 0,
          })
          .then((res: any) => {
            checkedKeys.value = getAllMenuIds(res.grid);
          });
      }

      editModel.value.memberStatus = row.memberStatus;
      editModel.value.memberUserId = row.memberUserId;
      editModel.value.memberPassword = '';
      editModel.value.type = 2;
    } else if (type === 3) {
      formTitle.value = '修改子账号密码';

      editModel.value.sysUserId = row.userId;
      editModel.value.userPassword = '';
      editModel.value.type = 3;
    } else {
      formTitle.value = '新增子账号';
      editModel.value = editFormModel();
      dataRoleText.value = '请先选择用户角色';
      checkedKeys.value = [];
    }
    formVisible.value = true;
  };

  const formRef = ref<FormInstance>();
  const handleBeforeOk = async (done: any) => {
    const res = await formRef.value?.validate();
    if (res) {
      done(false);
      return;
    }

    if (editModel.value.type === 1) {
      console.log(editModel.value);

      const { data } = await insertUser(editModel.value);
      Message.success({
        content: '添加成功',
        duration: 5 * 1000,
      });
      search();
    } else if (editModel.value.type === 3) {
      // const { data } = await updateUser(editModel.value);
      // Message.success({
      //   content: '修改成功',
      //   duration: 5 * 1000,
      // });
      // search();
    } else {
      // delete editModel.value.memberDepId;
      const { data } = await updateUser(editModel.value);
      Message.success({
        content: '修改成功',
        duration: 5 * 1000,
      });
      search();
    }

    window.setTimeout(() => {
      done();
    }, 300);
  };
  const handleClickChangeStatus = async (row: any) => {
    const { data } = await updateUser({
      memberUserId: row.memberUserId,
      memberStatus: 0,
    });
    Message.success({
      content: '停用该账号成功',
      duration: 5 * 1000,
    });
    search();
  };
  const handleClickDel = async (row: any) => {
    const { data } = await deleteUser({
      memberUserId: row.memberUserId,
    });
    Message.success({
      content: '成功删除子账号',
      duration: 5 * 1000,
    });
    search();
  };
  const handleCancel = () => {
    formVisible.value = false;
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
  .treeMark {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
  }
</style>
