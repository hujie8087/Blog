<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="文章标签列表"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增标签</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
    </ProTable>
    <ArticleTagDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx" name="articleTag">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import {
  getArticleTagList,
  delArticleTag,
  updateArticleTag,
  addArticleTag,
  getArticleTagById
} from "@/api/modules/article/articleTag";
import { ArticleTag } from "@/api/interface/article";
import ArticleTagDrawer from "./components/ArticleTagDrawer.vue";

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
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getArticleTagList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  return getArticleTagList(newParams);
};

const getArticleTagStatus = [
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
const columns: ColumnProps<ArticleTag.ArticleTag>[] = [
  { type: "selection", fixed: "left", width: 80 },
  { type: "index", label: "#", width: 80 },
  {
    prop: "title",
    label: "标签标题",
    search: { el: "input" }
  },
  {
    prop: "sort",
    label: "排序"
  },
  {
    prop: "status",
    label: "标签状态",
    enum: getArticleTagStatus,
    search: { el: "tree-select", props: { filterable: true } },
    render: scope => {
      return (
        <>
          <el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
        </>
      );
    }
  },
  {
    prop: "remark",
    label: "标签备注"
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 }
];

// 删除角色信息
const deleteAccount = async (params: ArticleTag.ArticleTag) => {
  await useHandleData(delArticleTag, params._id, `删除【${params.title}】角色`);
  proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof ArticleTagDrawer> | null>(null);
const openDrawer = async (title: string, row: Partial<ArticleTag.ArticleTag> = {}) => {
  let rowData = row;
  if (title === "编辑") {
    const { data } = await getArticleTagById(row._id as string);
    rowData = data;
  }
  const params = {
    title,
    isView: title === "查看",
    row: rowData,
    api: title === "新增" ? addArticleTag : title === "编辑" ? updateArticleTag : undefined,
    getTableList: proTable.value.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
