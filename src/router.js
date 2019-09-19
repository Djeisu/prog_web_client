import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/main/Core.vue'),
      meta: { authRequired: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./views/main/Home.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/main/profile/Profile.vue'),
          children: [
            {
              path: 'delete',
              name: 'delete',
              component: () => import('./views/main/profile/DeleteProfile.vue'),
            },
            {
              path: 'update',
              name: 'update',
              component: () => import('./views/main/profile/UpdateProfile.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('./views/auth/Core.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('./views/auth/Login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./views/auth/Register.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // store.dispatch('checkAuth');
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else if (store.state.isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
