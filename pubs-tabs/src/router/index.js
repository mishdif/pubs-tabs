import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import { auth } from '@/firebase';

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
