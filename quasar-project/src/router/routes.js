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

// Import your separate room status pages
import RoomStatus1Page from 'src/pages/RoomStatus1Page.vue';
import RoomStatus2Page from 'src/pages/RoomStatus2Page.vue';
import RoomStatus3Page from 'src/pages/RoomStatus3Page.vue';
import RoomStatus4Page from 'src/pages/RoomStatus4Page.vue';
import RoomStatus5Page from 'src/pages/RoomStatus5Page.vue';

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
        path: 'statuses/edit/:id',
        component: EditStatusPage,
        meta: { title: 'Edit Status', requiresAuth: true }
      },
      {
        path: 'change-status',
        component: ChangeStatusPage,
        meta: { title: 'Change Status', requiresAuth: true }
      },
      // Routes for separate room status pages
      {
        path: 'roomstatus/room-1',
        component: RoomStatus1Page,
        meta: { title: 'Room 1', requiresAuth: true }
      },
      {
        path: 'roomstatus/room-2',
        component: RoomStatus2Page,
        meta: { title: 'Room 2', requiresAuth: true }
      },
      {
        path: 'roomstatus/room-3',
        component: RoomStatus3Page,
        meta: { title: 'Room 3', requiresAuth: true }
      },
      {
        path: 'roomstatus/room-4',
        component: RoomStatus4Page,
        meta: { title: 'Room 4', requiresAuth: true }
      },
      {
        path: 'roomstatus/room-5',
        component: RoomStatus5Page,
        meta: { title: 'Room 5', requiresAuth: true }
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
