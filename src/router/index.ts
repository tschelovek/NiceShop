import MainPage from '@/pages/MainPage.vue';
import PageNotFound from '@/pages/PageNotFound.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import CategoryPage from "@/pages/CategoryPage.vue";
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/:category',
    name: 'category',
    component: CategoryPage,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/order',
    name: 'order',
    component: OrderPage,
  },
  {
    path: '/order/:id',
    name: 'orderInfo',
    component: OrderInfoPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory('/vue-shop/'),
  routes,
});

export default router;
