<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="菜单列表"
      row-key="path"
      :indent="30"
      :columns="columns"
      :request-api="getAuthMenuListApi"
      :pagination="false"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增菜单</el-button>
        <el-row>
          <el-col :span="8"></el-col>
        </el-row>
      </template>
      <!-- 菜单图标 -->
      <template #icon="scope">
        <el-icon :size="18">
          <component :is="scope.row.meta.icon"></component>
        </el-icon>
      </template>
      <!-- 菜单操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="Plus" @click="openDrawer('新增', scope.row)">增加</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteMenu(scope.row)">删除</el-button>
      </template>
    </ProTable>
  </div>
  <MenuDrawer ref="drawerRef" />
</template>

<script setup lang="ts" name="menuMange">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { getAuthMenuListApi } from "@/api/modules/login";
import { Delete, EditPen, CirclePlus, Plus } from "@element-plus/icons-vue";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import MenuDrawer from "./components/MenuDrawer.vue";
import { addMenu, editMenu, getMenuById } from "@/api/modules/system/menu";
import { Menu } from "@/api/interface/system";

const proTable = ref();

// 表格配置项
const columns: ColumnProps[] = [
  { prop: "selection", type: "selection", align: "center" },
  { prop: "meta.title", label: "菜单标题", headerAlign: "center", align: "left", search: { el: "input" } },
  { prop: "meta.icon", label: "菜单图标" },
  { prop: "name", label: "菜单名称" },
  { prop: "path", label: "菜单路径", width: 300, search: { el: "input" } },
  { prop: "component", label: "组件路径", width: 300 },
  { prop: "sort", label: "排序", width: 100 },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];

// 删除菜单（示例、根据自己后端接口来）
const deleteMenu = async (params: Menu.ResMenuList) => {
  await useHandleData(getAuthMenuListApi, { path: [params.path] }, `删除【${params.meta.title}】菜单`);
  proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null);
const openDrawer = async (title: string, row: Partial<Menu.ResMenuList> = {}) => {
  let rowData = row.id ? { parentId: row.id } : row;
  if (title === "编辑") {
    const { data } = await getMenuById(row.id as number);
    rowData = data;
  }
  const params = {
    title,
    isView: title === "查看",
    rowData: rowData,
    api: title === "新增" ? addMenu : title === "编辑" ? editMenu : undefined,
    getTableList: proTable.value.getTableList,
    menuOptions: [{ id: 0, title: "主目录", meta: {}, children: proTable.value.tableData }]
  };
  drawerRef.value?.acceptParams(params);
};
</script>
