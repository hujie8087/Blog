<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup>
const route = useRoute();
</script>

<style lang="scss" scoped>
.app-main {
  flex: auto;
  min-height: 0;
  height: 100%;
}
</style>
