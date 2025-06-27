import { createRouter, createWebHistory } from 'vue-router';
// import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/App.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
//   {
//     path: '/login',
//     name: 'Login',
//     component: LoginPage
//   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
