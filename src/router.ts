import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from './pages/HomeView.vue';
import MapView from './pages/MapView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView,
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
