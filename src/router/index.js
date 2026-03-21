import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage            from '../views/HomePage.vue'
import StorefrontPage      from '../views/StorefrontPage.vue'
import ProductsPage        from '../views/ProductsPage.vue'
import CartPage            from '../views/CartPage.vue'
import CheckoutPage        from '../views/CheckoutPage.vue'
import TransactionHistory  from '../views/TransactionHistoryPage.vue'
import ProfilePage         from '../views/ProfilePage.vue'
import LoginPage           from '../views/LoginPage.vue'
import RegisterPage        from '../views/RegisterPage.vue'

const routes = [
  { path: '/',                    component: HomePage },
  { path: '/storefront',          component: StorefrontPage },
  { path: '/products',            component: ProductsPage },
  { path: '/cart',                component: CartPage },
  { path: '/checkout',            component: CheckoutPage },
  { path: '/transaction-history', component: TransactionHistory },
  { path: '/profile',             component: ProfilePage },
  { path: '/login',               component: LoginPage },
  { path: '/register',            component: RegisterPage },
  { path: '/:pathMatch(.*)*',     redirect: '/' },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
