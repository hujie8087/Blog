<template>
  <div class="ArticleItem">
    <div class="ArticleItemCover">
      <img :src="article.ArticleCover" alt="" srcset="" />
    </div>
    <div style="flex: 1 1 0%">
      <div class="ArticleTitle">
        <h3 class="ArticleTitleText">{{ article.Title }}</h3>
      </div>
      <div class="ArticleContent">
        {{ article.Content }}
      </div>
      <div class="ArticleFooter">
        <div class="ArticleFooterItem">
          <el-icon><CollectionTag /></el-icon>
          {{ article.ArticleTag }}
        </div>
        <div class="ArticleFooterItem">
          <el-icon><Clock /></el-icon>
          {{ article.CreateDate }}
        </div>
        <div class="ArticleFooterItem">
          <el-icon><View /></el-icon>
          {{ article.articleReadNum }}
        </div>
        <div class="ArticleFooterItem">
          <el-icon><ChatDotSquare /></el-icon>
          {{ article.CommentNum }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { article } = defineProps(['article']);
</script>

<style scoped lang="less">
.ArticleItem {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #fff;
  font-size: 0.95rem;
  display: flex;
  align-items: start;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.3s ease-in;
  background: linear-gradient(0, #01aaed 1px, #01aaed 0) no-repeat,
    linear-gradient(-90deg, #01aaed 1px, #01aaed 0) no-repeat,
    linear-gradient(-180deg, #01aaed 1px, #01aaed 0) no-repeat,
    linear-gradient(-270deg, #01aaed 1px, #01aaed 0) no-repeat;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-color: #fff;
  background-size: 0 1px, 1px 0, 0 1px, 1px 0;
  &:hover {
    background-size: 100% 1px, 1px 100%, 100% 1px, 1px 100%;
  }
  .ArticleItemCover {
    width: 12rem;
    height: 7.5rem;
    margin-right: 1rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
  }
  .ArticleTitle {
    display: flex;
    align-items: center;
    height: 1.5rem;
    line-height: 1.5rem;
    cursor: pointer;
    h3 {
      padding: 0.5rem 0;
      cursor: pointer;
      font-size: 1.1rem;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .ArticleContent {
    margin-top: 0.5rem;
    min-height: 4.5rem;
    color: rgba(0, 0, 0, 0.43);
    cursor: pointer;
    font-size: 0.9rem;
  }
  .ArticleFooter {
    display: flex;
    align-items: center;
    height: 1rem;
    line-height: 1rem;
    .ArticleFooterItem {
      padding: 0.1rem 0.3rem;
      margin-right: 0.5rem;
      color: rgba(0, 0, 0, 0.65);
      font-size: 0.8rem;
      cursor: pointer;
    }
  }
}
</style>
