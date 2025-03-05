// Vue router configuration
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TrendingView from '@/views/TrendingView.vue';

/*User defined routes*/
/* e.g,. 'cart' url would map to its respective component*/
const routes = [
  { path: '/', component: HomeView },
  { path: '/trending', component: TrendingView, props: (route) => ({ query: route.query }) },
];

// Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;