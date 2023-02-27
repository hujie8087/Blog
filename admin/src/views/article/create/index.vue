<template>
	<div class="h-full">
		<n-card title="新建文章" class="h-full shadow-sm rounded-16px">
			<n-form
				ref="formRef"
				:model="articleModel"
				label-placement="left"
				:label-width="80"
			>
				<n-form-item label="标题：" path="Title">
					<n-input
						v-model:value="articleModel.Title"
						placeholder="请输入文章标题"
					/>
				</n-form-item>
				<n-form-item label="标签：" path="ArticleTag">
					<n-select
						v-model:value="articleModel.ArticleTag"
						placeholder="Select"
						:options="articleTagOptions"
					/>
				</n-form-item>
				<n-form-item label="概况：" path="Summary">
					<n-input
						v-model:value="articleModel.Summary"
						placeholder="请输入文章概况"
					/>
				</n-form-item>
				<n-form-item label="排序：" path="order">
					<n-input-number v-model:value="articleModel.order" />
				</n-form-item>
				<n-form-item label="图片：" path="ArticleCover">
					<n-upload
						action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
						:default-file-list="fileList"
						list-type="image-card"
					>
						点击上传
					</n-upload>
				</n-form-item>
				<n-form-item label="内容：" path="content">
					<div ref="content"></div>
				</n-form-item>
			</n-form>
		</n-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { UploadFileInfo } from "naive-ui";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { useThemeStore } from "@/store";

// 文章标签类型
interface articleTagType {
	label: string;
	value: string;
}

// 新建文章类型
interface newArticleType {
	Title: string;
	ArticleCover: string;
	ArticleTag: string;
	Content: string;
	Summary: string;
	order: number;
	CommentNum: number;
	articleReadNum: number;
}
// 标题数据模型
const articleModel = ref<newArticleType>({
	Title: "",
	ArticleCover: "",
	ArticleTag: "",
	Content: "",
	Summary: "",
	CommentNum: 0,
	articleReadNum: 0,
	order: 9999,
});
// 文章标签数据
const articleTagOptions = ref<articleTagType[]>(
	["文章标签1", "文章标签2", "文章标签3", "文章标签4"].map((v) => ({
		label: v,
		value: v,
	}))
);

// 上传图片
const fileList = ref<UploadFileInfo[]>([]);

// markdown编辑器
const theme = useThemeStore();
const vditor = ref<Vditor>();
const content = ref<HTMLElement>();

function renderVditor() {
	if (!content.value) return;
	vditor.value = new Vditor(content.value, {
		minHeight: 400,
		width: "100%",
		theme: theme.darkMode ? "dark" : "classic",
		icon: "material",
		cache: { enable: false },
	});
}

const stopHandle = watch(
	() => theme.darkMode,
	(newValue) => {
		const themeMode = newValue ? "dark" : "classic";
		vditor.value?.setTheme(themeMode);
	}
);

onMounted(() => {
	renderVditor();
});

onUnmounted(() => {
	stopHandle();
});
</script>

<style scoped></style>
