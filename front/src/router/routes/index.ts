import type { RouteRecordRaw } from 'vue-router';
interface Modules {
  [key: string]: { default: RouteRecordRaw[] } | { default: RouteRecordRaw };
}
const modules: Modules = import.meta.globEager('./modules/**/*.ts');

const routes: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const modulesRoutes = modules[key].default || {};
  const modRoutesList = Array.isArray(modulesRoutes)
    ? modulesRoutes
    : [modulesRoutes];
  routes.push(...modRoutesList);
});
// 根目录
const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: '/home',
};
// 404页面
const notFoundPage: RouteRecordRaw = {
  // vue-router@4的变化，舍弃*通配符
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/common/404Page.vue'),
};

export default [rootRoute, ...routes, notFoundPage];
