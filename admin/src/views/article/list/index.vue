<template>
	<n-card title="文章管理" :bordered="false" class="rounded-16px shadow-sm">
		<n-space class="pb-12px" justify="space-between">
			<n-space>
				<n-button type="primary" @click="handleAddTable">
					<icon-ic-round-plus class="mr-4px text-20px" />
					新增
				</n-button>
				<n-button type="error">
					<icon-ic-round-delete class="mr-4px text-20px" />
					删除
				</n-button>
				<n-button type="success">
					<icon-uil:export class="mr-4px text-20px" />
					导出Excel
				</n-button>
			</n-space>
			<n-space align="center" :size="18">
				<n-button size="small" type="primary" @click="getTableData">
					<icon-mdi-refresh
						class="mr-4px text-16px"
						:class="{ 'animate-spin': loading }"
					/>
					刷新表格
				</n-button>
				<column-setting v-model:columns="columns" />
			</n-space>
		</n-space>
		<n-data-table
			:columns="columns"
			:data="tableData"
			:loading="loading"
			:pagination="pagination"
		/>
	</n-card>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { NButton, NPopconfirm, NSpace } from "naive-ui";
import type { DataTableColumns, PaginationProps } from "naive-ui";
import { fetchArticleList } from "@/service";
import { useBoolean, useLoading } from "@/hooks";
import ColumnSetting from "./components/ColumnSetting.vue";
import { routeName } from "@/router";
import { useRouterPush } from "@/composables";

const { loading, startLoading, endLoading } = useLoading(false);
const { setTrue: openModal } = useBoolean();
const { routerPush } = useRouterPush();
const tableData = ref<ArticleManagement.Article[]>([]);
function setTableData(data: ArticleManagement.Article[]) {
	tableData.value = data;
}

async function getTableData() {
	startLoading();
	const { data } = await fetchArticleList();
	if (data) {
		setTimeout(() => {
			setTableData(data);
			endLoading();
		}, 1000);
	}
}

const columns: Ref<DataTableColumns<ArticleManagement.Article>> = ref([
	{
		type: "selection",
		align: "center",
	},
	{
		key: "index",
		title: "序号",
		align: "center",
		width: 80,
	},
	{
		key: "Title",
		title: "文章标题",
		align: "center",
	},
	{
		key: "ArticleTag",
		title: "文章标签",
		align: "center",
	},
	{
		key: "CommentNum",
		title: "留言数量",
		align: "center",
	},
	{
		key: "articleReadNum",
		title: "阅读数量",
		align: "center",
	},
	{
		key: "order",
		title: "排序",
		align: "center",
	},
	{
		key: "CreateDate",
		title: "创建时间",
		align: "center",
	},
	{
		key: "ArticleCover",
		title: "文章图片",
		align: "center",
		render: (row) => {
			return <n-image width="100" src={row.ArticleCover} />;
		},
	},
	{
		key: "actions",
		title: "操作",
		align: "center",
		render: (row) => {
			return (
				<NSpace justify={"center"}>
					<NButton size={"small"} onClick={() => handleEditTable(row._id)}>
						编辑
					</NButton>
					<NPopconfirm onPositiveClick={() => handleDeleteTable(row._id)}>
						{{
							default: () => "确认删除",
							trigger: () => <NButton size={"small"}>删除</NButton>,
						}}
					</NPopconfirm>
				</NSpace>
			);
		},
	},
]) as Ref<DataTableColumns<ArticleManagement.Article>>;

const editData = ref<ArticleManagement.Article | null>(null);

function setEditData(data: ArticleManagement.Article | null) {
	editData.value = data;
}

function handleAddTable() {
	routerPush({ name: routeName("article_create") });
}

function handleEditTable(rowId: string) {
	const findItem = tableData.value.find((item) => item._id === rowId);
	if (findItem) {
		setEditData(findItem);
	}
	openModal();
}

function handleDeleteTable(rowId: string) {
	window.$message?.info(`点击了删除，rowId为${rowId}`);
}

const pagination: PaginationProps = reactive({
	page: 1,
	pageSize: 10,
	showSizePicker: true,
	pageSizes: [10, 15, 20, 25, 30],
	onChange: (page: number) => {
		pagination.page = page;
	},
	onUpdatePageSize: (pageSize: number) => {
		pagination.pageSize = pageSize;
		pagination.page = 1;
	},
});

function init() {
	getTableData();
}

// 初始化
init();
</script>

<style scoped></style>
