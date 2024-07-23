const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
         component: () => import('pages/IndexPage.vue') },

      { path: 'settings',
         component: () => import('src/pages/SettingsPage.vue'),

         meta: { title: 'Settings'} }, // Settings Page
      { path: 'about',
         component: () => import('src/pages/AboutPage.vue'),

         meta: {title: 'About'} }, // About Page
      { path: 'dashboard',
         component: () => import('src/pages/DashBoard.vue'),
         meta: { title: 'DashBoard'} } // Dash Board Page
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes