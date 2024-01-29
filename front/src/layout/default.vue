<template>
  <div>
    <Particles />
    <HeaderHandle />
    <router-view></router-view>
    <FootHandle />
  </div>
</template>

<script setup lang="ts">
import HeaderHandle from '@/components/HeaderHandle.vue';
import FootHandle from '@/components/FootHandle.vue';
import Particles from '@/components/Particles/index.vue';
</script>

<style scoped></style>
