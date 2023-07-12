import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Particles from 'vue3-particles';

const bootstrap = () => {
  const app = createApp(App);
  app.use(ElementPlus);
  app.use(Particles as any);
  // 安装store
  setupStore(app);
  // 安装初始化路由
  setupRouter(app);
  // 注册全局图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.mount('#app');
};
bootstrap();
