// Vue router configuration
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TrendingView from '@/views/TrendingView.vue';
import SellView from '@/views/SellView.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import LoyaltyView from '@/views/LoyaltyView.vue';
import Minigame from '@/views/Minigame.vue'; 
import ManageView from '@/views/ManageView.vue'; 

/* User defined routes */
const routes = [
  { path: '/', component: HomeView },
  { path: '/minigame', component: Minigame },
  { path: '/trending', component: TrendingView, props: (route) => ({ query: route.query }) },
  { path: '/sell', component: SellView },
  { path: '/product/:id', name: 'ProductDetail',component: ProductDetail,},
  { path: '/lux', name: 'Loyalty', component: LoyaltyView},
  { path: '/sell', component: SellView, meta: { requiresAuth: true } }, //  Protect Sell page
  { path: '/manage', component: ManageView, meta: { requiresAuth: true } }, //  Protect ManageView page
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
];

//  router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Checks if token exists
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Does the route need auth?

  if (requiresAuth && !isAuthenticated) {
    next({ path: '/' }); // Redirect to login page if not authenticated
  } else {
    next(); 
  }
});

export default router;
