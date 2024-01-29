<template>
  <div class="card content-box">
    <el-form
      ref="articleFormRef"
      label-width="120px"
      label-suffix=" :"
      :rules="rules"
      :disabled="isView"
      :model="articleDetail"
      :hide-required-asterisk="isView"
      style="width: 100%"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleDetail.title" placeholder="请填写文章标题" clearable :autofocus="true"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="summary">
        <el-input v-model="articleDetail.summary" placeholder="请填写文章描述" clearable></el-input>
      </el-form-item>
      <el-form-item label="文章标签" prop="articleTag">
        <el-select v-model="articleDetail.articleTag" placeholder="请选择文章标签">
          <el-option v-for="item in tagDict" :key="item.id" :label="item.title" :value="item.title" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片" prop="articleCover">
        <UploadImg v-model:image-url="articleDetail.articleCover" width="250px">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传文章图片</span>
          </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <WangEditor height="400px" v-model:value="articleDetail.content" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="articleDetail.sort" size="default" :min="0" label="排序" clearable></el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="articleDetail.status"
          :active-text="articleDetail.status ? '启用' : '禁用'"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button @click="restArticleForm(articleFormRef)">重置</el-button>
      <el-button type="primary" @click="submitArticle(articleFormRef)">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="createArticle">
import { reactive, ref, onBeforeMount } from "vue";
import { Article, ArticleTag } from "@/api/interface/article";
import UploadImg from "@/components/Upload/Img.vue";
import WangEditor from "@/components/WangEditor/index.vue";
import "@wangeditor/editor/dist/css/style.css";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { getArticleTagDict } from "@/api/modules/article/articleTag";
import { addArticle, getArticleById, updateArticle } from "@/api/modules/article/article";
import { useRoute } from "vue-router";
const route = useRoute();

const isView = ref(false);
const articleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
  articleCover: [{ required: true, message: "请上传文章图片", trigger: "blur" }],
  summary: [{ required: true, message: "请输入文章描述", trigger: "blur" }],
  content: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
  articleTag: [{ required: true, message: "请选择文章标签", trigger: "blur" }]
});

const tagDict = ref<ArticleTag.ArticleTagDict[]>([]);

const getTagDictList = async () => {
  const { data } = await getArticleTagDict();
  tagDict.value = data;
};

const queryId = ref();

const articleDetail = ref<Article.Article>({
  _id: "",
  title: "",
  summary: "",
  sort: 0,
  status: 0,
  content: "",
  articleTag: "",
  articleCover: "",
  createdAt: ""
});

onBeforeMount(() => {
  getTagDictList();
  queryId.value = route.query.id;
  if (queryId.value) {
    getArticleDetail(queryId.value);
  }
});

const getArticleDetail = async (id: string) => {
  const { data } = await getArticleById(id);
  articleDetail.value = data;
};

const submitArticle = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      if (queryId.value) {
        await updateArticle(articleDetail.value);
        ElMessage.success({ message: `更新文章成功！` });
      } else {
        await addArticle(articleDetail.value);
        ElMessage.success({ message: `添加文章成功！` });
      }
      restArticleForm(formEl);
    }
  });
};
const restArticleForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
