import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/default.vue';
// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: '/BlogDetail',
        name: 'BlogDetail',
        component: () => import('@/views/BlogDetail.vue'),
      },
      {
        path: '/MessageBoard',
        name: 'MessageBoard',
        component: () => import('@/views/MessageBoard.vue'),
      },
      {
        path: '/TimeLine',
        name: 'TimeLine',
        component: () => import('@/views/TimeLine/index.vue'),
      },
      {
        path: '/TestField',
        name: 'TestField',
        component: () => import('@/views/TestField/index.vue'),
      },
      {
        path: '/AboutMe',
        name: 'AboutMe',
        component: () => import('@/views/AboutMe.vue'),
      },
    ],
  },
];

export default routes;
