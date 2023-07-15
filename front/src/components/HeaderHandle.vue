<script setup lang="ts">
const logo = ref("Jayden's Blog");
const route = useRoute();
const activeIndex = ref(route.path);
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <header>
    <div class="topBar">
      <div class="MediaIndexContent">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          router
          style="border: none; background-color: transparent"
          @select="handleSelect"
        >
          <el-menu-item index="0"
            ><span class="topLogo">{{ logo }}</span>
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="/home">博文</el-menu-item>
          <el-menu-item index="/MessageBoard">留言</el-menu-item>
          <el-menu-item index="/TimeLine">时间轴</el-menu-item>
          <el-menu-item index="/TestField">试验田</el-menu-item>
          <el-menu-item index="/AboutMe">关于</el-menu-item>
          <el-menu-item index="/Admin">开放式后台</el-menu-item>
        </el-menu>
      </div>
    </div>
  </header>
</template>

<style scoped lang="less">
.topBar {
  background-color: hsla(0, 0%, 100%, 0.9);
  color: rgba(0, 0, 0, 0.65);
  -webkit-box-shadow: 0 1px 5px 0 rgb(0 0 0 / 9%);
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 9%);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10000;
  .MediaIndexContent {
    width: 1200px;
    margin: 0 auto;
    height: 58px;
    line-height: 58px;
    .topLogo {
      font-size: 1.1rem;
    }
    .flex-grow {
      flex-grow: 1;
    }
    .el-menu-item {
      padding: 0 30px;
    }
  }
}
</style>
