/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@/plugins/Bus.js';
declare module 'vue3-particles';
declare module 'particles.vue3';
