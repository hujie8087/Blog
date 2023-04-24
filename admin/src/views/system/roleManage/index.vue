<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="角色列表"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增角色</el-button>
        <el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">
          批量删除角色
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <RoleDrawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="roleManage">
import { ref, reactive, onBeforeMount } from "vue";
import { User } from "@/api/interface";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { getRoleList, delRole, updateRole, addRole, changeRoleStatus } from "@/api/modules/system/role";
import { Menu, Role } from "@/api/interface/system";
import RoleDrawer from "./components/RoleDrawer.vue";
import { getMenuTree } from "@/api/modules/system/menu";

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getRoleList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  return getRoleList(newParams);
};

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const { BUTTONS } = useAuthButtons();

const getUserStatus = [
  {
    label: "启用",
    value: 1
  },
  {
    label: "禁用",
    value: 0
  }
];
// 表格配置项
const columns: ColumnProps<Role.ResRoleList>[] = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "#", width: 80 },
  {
    prop: "name",
    label: "角色",
    search: { el: "input" }
  },
  // 多级 prop
  { prop: "level", label: "权重", search: { el: "input" } },
  {
    prop: "status",
    label: "角色状态",
    enum: getUserStatus,
    search: { el: "tree-select", props: { filterable: true } },
    render: scope => {
      return (
        <>
          {BUTTONS.value.status ? (
            <el-switch
              model-value={scope.row.status}
              active-text={scope.row.status ? "启用" : "禁用"}
              active-value={1}
              inactive-value={0}
              onClick={() => changeStatus(scope.row)}
            />
          ) : (
            <el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
          )}
        </>
      );
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
];

// 删除角色信息
const deleteAccount = async (params: User.ResUserList) => {
  await useHandleData(delRole, { id: [params.id] }, `删除【${params.username}】角色`);
  proTable.value.getTableList();
};

// 批量删除角色信息
const batchDelete = async (id: string[]) => {
  await useHandleData(delRole, { id }, "删除所选角色信息");
  proTable.value.clearSelection();
  proTable.value.getTableList();
};

// 切换角色状态
const changeStatus = async (row: Role.ResRoleList) => {
  await useHandleData(changeRoleStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.name}】角色状态`);
  proTable.value.getTableList();
};

let menuList: Menu.ResMenuList[] = reactive([]);
onBeforeMount(async () => {
  const { data } = await getMenuTree();
  menuList = data;
});

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof RoleDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<Role.ResRoleList> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addRole : title === "编辑" ? updateRole : undefined,
    getTableList: proTable.value.getTableList,
    menuList: menuList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
