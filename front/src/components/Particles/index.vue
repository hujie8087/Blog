<template>
  <Particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :options="options"
  />
</template>

<script setup lang="ts">
import { options } from './options';
import { loadFull } from 'tsparticles';

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};
</script>

<style scoped lang="less"></style>
