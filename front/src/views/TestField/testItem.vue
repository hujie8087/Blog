<template>
  <el-card class="UrlCardTd" :body-style="{ padding: '0px' }">
    <div class="lab-cover">
      <img :src="articleInfo.ArticleCover" class="image" />
    </div>
    <div class="UrlIconName">
      {{ articleInfo.Title }}
    </div>
    <div class="UrlSummary">
      {{ articleInfo.Content }}
    </div>
  </el-card>
</template>

<script setup lang="ts">
const { articleInfo } = defineProps(['articleInfo']);
</script>

<style scoped lang="less">
.UrlCardTd {
  flex: 1;
  margin: 0.5rem;
  padding: 0;
  background-color: #fff;
  min-width: 20%;
  cursor: pointer;
  .lab-cover {
    height: 180px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .UrlIconName {
    display: flex;
    align-items: center;
    padding: 1.2rem 1rem 1rem 1rem;
    .UrlName {
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 1.1rem;
    }
  }
  .UrlSummary {
    color: #777;
    padding: 0 1rem 1rem;
  }
}
</style>
