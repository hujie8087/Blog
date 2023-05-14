<template>
  <div class="BlogIndexContent">
    <div class="ArticleDetailHeader">
      <el-skeleton
        animated
        :loading="loading"
        style="width: 100%; height: 100%"
      >
        <template #template>
          <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
        </template>
        <template #default>
          <img :src="articleDetail?.articleCover" />
        </template>
      </el-skeleton>
    </div>
    <div class="ArticleDetailContent">
      <div class="ArticleDetailContentTab">
        <el-skeleton animated :loading="loading">
          <template #template>
            <el-skeleton-item
              variant="h3"
              style="width: 50%; margin-bottom: 1rem"
            />
            <div>
              <el-skeleton :rows="10" />
            </div>
          </template>
          <template #default>
            <h1>{{ articleDetail?.title }}</h1>
            <div class="ArticleCreateTime">
              发布时间：{{ articleDetail?.createDate }}
            </div>
            <div class="markdown-body" v-html="articleDetail?.content"></div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { getArticleDetail } from '@/api/article/index';
import { ArticleType } from '@/types/article';

const loading = ref(true);
const articleDetail = ref<ArticleType>();

onBeforeMount(() => {
  let queryId = router.currentRoute.value.query.id;
  if (queryId) {
    getDetail(+queryId);
  }
});
const getDetail = async (id: number) => {
  const { data } = await getArticleDetail(id);
  articleDetail.value = data;
  loading.value = false;
};
</script>

<style scoped>
.BlogIndexContent {
  width: 1088px;
  margin: 74px auto 20px;
}
.ArticleDetailHeader {
  background: #1f3747;
  background-image: -webkit-linear-gradient(left, #1f3747, #293d31);
  max-width: 1008px;
  margin: 1rem auto 0;
  height: 24rem;
  position: relative;
}

.ArticleDetailHeader img {
  width: 100%;
  height: 100%;
}

.HeaderContent {
  margin-left: 4.5rem;
  color: #fff;
  position: absolute;
  top: 4rem;
  left: 0;
}

.ArticleDetailContent {
  width: 1008px;
  margin: 0 auto 0;
  background-color: #fff;
  position: relative;
  padding: 3rem 6rem;
  box-sizing: border-box;
}

.ArticleDetailContentTab {
  position: relative;
  min-height: 50vh;
}

.ArticleDetailContentTab h1 {
  margin: 1rem 0;
}
.ArticleCreateTime {
  font-size: 13px;
  margin-bottom: 2.5rem;
}

.ArticleDetailContentTab span:nth-child(0) {
  margin: 1rem 0 3rem;
  font-size: 1rem;
}

.BlogDetailSkeletonScreenPC {
  width: 100%;
  height: 80%;
  position: absolute;
  left: 0;
  top: 10%;
}

.BlogDetailSkeletonScreenMobile {
  display: none;
}

.CommentUserInfo input {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: 0 0.5rem;
}

.CommentUserInfo input:last-child {
  margin-right: 0;
}

.ArticleDetailCommentFirstLine {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: 'middle';
  -ms-flex-align: 'middle';
  align-items: 'middle';
  padding: 0.5rem 0;
  margin-top: 2rem;
}

.CommentSubmitLine {
  text-align: right;
  width: 100%;
  margin-bottom: 2rem;
}

.ArticleDetailCommentContent {
  position: relative;
}

.TopBarHeight {
  height: 60px;
}

.ArticleDetailComment {
  margin: 2rem 0;
}
</style>
