import { createRouter, createWebHistory } from 'vue-router';

import ProductsPage from "@/pages/ProductsPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";
import Page404 from "@/pages/Page404.vue";
import ConfirmationPage from "@/pages/ConfirmationPage.vue";
import Homepage from "@/pages/Homepage.vue";
import Checkout from "@/pages/Checkout.vue";

const routes = [
    {name: 'home', path: '/', component: Homepage},
    {name: 'products', path: '/all-products', component: ProductsPage},
    {name: 'product', path: '/all-products/:productID', component: ProductPage},
    {name: 'cart', path: '/cart', component: CartPage},
    {name: '404', path: '/:pathMatch(.*)*', component: Page404},
    {name: 'confirmation', path: '/confirmation', component: ConfirmationPage},
    {name: 'checkout', path:'/checkout', component: Checkout}
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;