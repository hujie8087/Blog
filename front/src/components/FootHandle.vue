<template>
  <footer class="Footer">
    <div class="MediaIndexContent">
      <p>{{ footInfo.copyright }}</p>
      <p>{{ footInfo.technology }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footInfo = reactive({
  copyright: '版权所有 @ 2022 Jayden.保留所有权利 粤ICP备XXXXXX号-1',
  technology: 'Base on Node + Vue3 + TypeScript、Element Plus by Jayden Hu',
});
</script>

<style scoped lang="less">
.Footer {
  text-align: center;
  background-color: hsla(0, 0%, 100%, 0.9);
  color: rgba(0, 0, 0, 0.65);
  padding: 2rem 1rem 1.6rem;
  margin-top: 1rem;
  position: relative;
  .MediaIndexContent {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
