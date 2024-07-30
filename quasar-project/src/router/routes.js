import MainLayout from 'layouts/MainLayout.vue';
import LoginLayout from 'layouts/LoginLayout.vue';
import IndexPage from 'pages/IndexPage.vue';
import SettingsPage from 'pages/SettingsPage.vue';
import AboutPage from 'pages/AboutPage.vue';
import DashBoard from 'pages/DashBoard.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';
import Statuses from 'pages/StatusesPage.vue';
import NewStatusPage from 'pages/NewStatusPage.vue';
import EditStatusPage from 'pages/EditStatusPage.vue';
import ChangeStatusPage from 'src/pages/ChangeStatusPage.vue';
import RoomStatusPage from 'src/pages/RoomStatusPage.vue';


const routes = [
  // Unauthenticated routes
  {
    path: '/',
    component: LoginLayout,
    children: [
      {
        path: '',
        component: IndexPage,
        meta: { title: 'Sign In' }
      }
    ]
  },

  // Authenticated routes
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'settings',
        component: SettingsPage,
        meta: { title: 'Settings', requiresAuth: true }
      },
      {
        path: 'about',
        component: AboutPage,
        meta: { title: 'About', requiresAuth: true }
      },
      {
        path: 'dashboard',
        component: DashBoard,
        meta: { title: 'Dashboard', requiresAuth: true }
      },
      {
        path: 'statuses',
        component: Statuses,
        meta: { title: 'Statuses', requiresAuth: true }
      },
      {
        path: 'statuses/newstatus',
        component: NewStatusPage,
        meta: { title: 'New Status', requiresAuth: true }
      },
      {
        path: 'statuses/edit/:id', // Changed to use path parameter
        component: EditStatusPage,
        meta: { title: 'Edit Status', requiresAuth: true }
      },
      {
        path: '/change-status', // Changed to use path parameter
        component: ChangeStatusPage,
        meta: { title: 'Change Status', requiresAuth: true }
      },
      {
        path: '/change-status/:roomNumber', // Changed to use path parameter
        component: RoomStatusPage,
        meta: { title: 'Room Status', requiresAuth: true }
      }
    ]
  },

  // Catch-all route for 404
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound
  }
];

export default routes;