<template>
  <div>
    <div class="announce-bar">
      🌴 Proudly Philippine-Made &nbsp;·&nbsp; 100% Natural Coconut Coir &nbsp;·&nbsp; Free shipping on orders over ₱1,500
    </div>
    <nav class="navbar" :class="{ scrolled }">
      <div class="nav-inner container">
        <RouterLink to="/" class="brand">
          <div class="brand-icon">🌿</div>
          <div class="brand-text">
            <span class="brand-name">Niyog <em>&amp;</em> Coir</span>
            <span class="brand-sub">Eco-Fiber Products</span>
          </div>
        </RouterLink>
        <ul class="nav-links">
          <li><RouterLink to="/"             class="nav-link" exact-active-class="active">Home</RouterLink></li>
          <li><RouterLink to="/storefront"   class="nav-link" active-class="active">Storefront</RouterLink></li>
          <li><RouterLink to="/products"     class="nav-link" active-class="active">Products</RouterLink></li>
          <li><RouterLink to="/transaction-history" class="nav-link" active-class="active">Orders</RouterLink></li>
        </ul>
        <div class="nav-actions">
          <template v-if="!store.isLoggedIn">
            <RouterLink to="/login"    class="btn btn-ghost nav-btn">Log In</RouterLink>
            <RouterLink to="/register" class="btn btn-primary nav-btn">Sign Up</RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/profile" class="nav-user">
              <div class="user-avatar">{{ store.user?.name?.charAt(0) || 'U' }}</div>
              <span class="user-name">{{ store.user?.name?.split(' ')[0] }}</span>
            </RouterLink>
          </template>
          <RouterLink to="/cart" class="cart-btn">
            🛒<span class="cart-badge" v-if="store.cartCount > 0">{{ store.cartCount }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { store } from '../store/index.js'

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 24 }
onMounted(()  => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar { position:sticky; top:0; z-index:200; background:rgba(250,248,242,0.9); backdrop-filter:blur(20px); border-bottom:1px solid transparent; transition:all 0.3s }
.navbar.scrolled { border-color:rgba(27,61,43,0.1); box-shadow:0 2px 20px rgba(27,61,43,0.08) }
.nav-inner { display:flex; align-items:center; gap:32px; height:70px }
.brand { display:flex; align-items:center; gap:10px; text-decoration:none; flex-shrink:0 }
.brand-icon { width:40px; height:40px; border-radius:10px; background:var(--green-deep); display:flex; align-items:center; justify-content:center; font-size:1.2rem }
.brand-text { display:flex; flex-direction:column; line-height:1.1 }
.brand-name { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700; color:var(--green-deep) }
.brand-name em { color:var(--gold); font-style:italic }
.brand-sub { font-size:0.65rem; font-weight:500; color:var(--text-light); letter-spacing:0.08em; text-transform:uppercase }
.nav-links { display:flex; gap:2px; flex:1; justify-content:center }
.nav-link { font-size:0.87rem; font-weight:500; color:var(--text-mid); padding:6px 14px; border-radius:var(--radius-pill); transition:var(--transition); text-decoration:none }
.nav-link:hover,.nav-link.active { color:var(--green-deep); background:var(--green-pale) }
.nav-actions { display:flex; align-items:center; gap:10px; flex-shrink:0 }
.nav-btn { padding:8px 18px; font-size:0.84rem }
.nav-user { display:flex; align-items:center; gap:8px; text-decoration:none; padding:4px 12px 4px 4px; border-radius:var(--radius-pill); border:1.5px solid var(--border); transition:var(--transition) }
.nav-user:hover { background:var(--green-pale); border-color:var(--green-light) }
.user-avatar { width:30px; height:30px; border-radius:50%; background:var(--green-deep); color:var(--white); font-size:0.82rem; font-weight:700; display:flex; align-items:center; justify-content:center }
.user-name { font-size:0.86rem; font-weight:500; color:var(--text-dark) }
.cart-btn { position:relative; background:var(--green-pale); border:1.5px solid var(--border); border-radius:var(--radius-pill); padding:8px 14px; font-size:1rem; cursor:pointer; text-decoration:none; display:flex; align-items:center; transition:var(--transition) }
.cart-btn:hover { background:var(--green-deep) }
.cart-badge { position:absolute; top:-5px; right:-5px; background:var(--gold); color:var(--white); font-size:0.65rem; font-weight:700; width:17px; height:17px; border-radius:50%; display:flex; align-items:center; justify-content:center }
@media(max-width:900px) { .nav-links { display:none } .brand-sub { display:none } }
</style>
