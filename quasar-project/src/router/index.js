import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // Navigation guard for authentication
  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token; // Replace with actual authentication check
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next('/');
    } else {
      next();
    }
  });

  // Add afterEach hook to dynamically set document title
  Router.afterEach((to) => {
    document.title = to.meta.title || 'Sign In'
  })

  return Router
})
