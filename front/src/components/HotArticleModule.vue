<template>
  <div class="Module HotArticleModule">
    <div class="TagListHead">
      {{ tagListHead }}
    </div>
    <div class="HotArticle">
      <div
        v-for="(item, index) in hotArticle"
        :key="item.id"
        class="HotArticleItem"
      >
        <div>
          <span
            v-if="index < 5"
            :style="{ color: colorList[index], fontSize: '15px' }"
            >NO{{ index + 1 }}</span
          >
          <span v-else>NO{{ index + 1 }}</span>
          {{ item.Title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { hotArticle, tagListHead } = defineProps(['hotArticle', 'tagListHead']);
const colorList = reactive([
  '#f44e03',
  '#d41800',
  '#f37e21',
  '#f3212d',
  '#212df3',
]);
</script>

<style scoped lang="less">
.HotArticleModule {
  min-height: 245px;
  .TagListHead {
    padding: 0 0 0.5rem;
    border-bottom: 1px solid #01aaed;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    color: #01aaed;
  }
  .HotArticleItem {
    padding: 0.5rem 0;
    cursor: pointer;
    overflow: hidden;
  }
}
</style>
