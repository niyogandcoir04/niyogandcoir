<template>
  <div class="page-wrap">
    <AppNavbar />
    <main class="page-main">
      <section class="page-hero-sm"><div class="container"><span class="section-tag" style="color:var(--gold-light)">Your Selections</span><h1 class="page-hero-title">Shopping Cart</h1></div></section>
      <section class="cart-section">
        <div class="container cart-layout">
          <div class="cart-items" v-if="store.cartItems.length">
            <div class="cart-head"><span>Product</span><span>Price</span><span>Qty</span><span>Total</span><span></span></div>
            <div class="cart-row" v-for="item in store.cartItems" :key="item.id">
              <div class="cart-product">
                <div class="cart-img">{{ item.emoji }}</div>
                <div><p class="cart-name">{{ item.name }}</p><p class="cart-sub">Coconut Coir Product</p></div>
              </div>
              <span class="cell-price">₱{{ item.price }}</span>
              <div class="cart-qty">
                <button class="qty-btn" @click="store.updateQty(item.id,-1)">−</button>
                <span>{{ item.qty }}</span>
                <button class="qty-btn" @click="store.updateQty(item.id,1)">+</button>
              </div>
              <span class="cell-price">₱{{ item.price * item.qty }}</span>
              <button class="remove-btn" @click="store.removeFromCart(item.id)">✕</button>
            </div>
            <div class="cart-actions">
              <button class="btn btn-ghost" @click="store.clearCart()">🗑 Clear Cart</button>
              <RouterLink to="/products" class="btn btn-secondary">← Continue Shopping</RouterLink>
            </div>
          </div>
          <div class="cart-empty" v-else>
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add some eco-friendly coir products!</p>
            <RouterLink to="/products" class="btn btn-primary" style="margin-top:24px">Browse Products</RouterLink>
          </div>
          <div class="cart-summary" v-if="store.cartItems.length">
            <h3 class="summary-title">Order Summary</h3>
            <div class="summary-row"><span>Subtotal ({{ store.cartCount }} items)</span><span>₱{{ store.cartSubtotal }}</span></div>
            <div class="summary-row"><span>Shipping</span><span :class="{free: store.cartSubtotal>=1500}">{{ store.cartSubtotal>=1500?'FREE':'₱80' }}</span></div>
            <p class="free-hint" v-if="store.cartSubtotal<1500">Add ₱{{ 1500-store.cartSubtotal }} more for free shipping!</p>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total"><span>Total</span><span>₱{{ store.cartSubtotal>=1500?store.cartSubtotal:store.cartSubtotal+80 }}</span></div>
            <RouterLink to="/checkout" class="btn btn-primary btn-full" style="margin-top:20px">Proceed to Checkout →</RouterLink>
            <div class="secure-note">🔒 Secure checkout · Multiple payment options</div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'
import { store } from '../store/index.js'
</script>

<style scoped>
.cart-section { padding:52px 0 100px }
.cart-layout { display:grid; grid-template-columns:1fr 320px; gap:28px; align-items:start }
.cart-items { display:flex; flex-direction:column; gap:10px }
.cart-head { display:grid; grid-template-columns:2fr 1fr 1fr 1fr 40px; padding:12px 16px; background:var(--ivory-dark); border-radius:var(--radius-sm); font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-light) }
.cart-row { display:grid; grid-template-columns:2fr 1fr 1fr 1fr 40px; padding:18px 16px; align-items:center; background:var(--white); border-radius:var(--radius-md); border:1px solid var(--border); gap:12px; transition:var(--transition) }
.cart-row:hover { border-color:rgba(27,61,43,0.2) }
.cart-product { display:flex; align-items:center; gap:12px }
.cart-img { width:52px; height:52px; border-radius:var(--radius-sm); background:var(--green-pale); font-size:1.8rem; display:flex; align-items:center; justify-content:center; flex-shrink:0 }
.cart-name { font-weight:600; font-size:0.92rem; color:var(--green-deep) }
.cart-sub { font-size:0.76rem; color:var(--text-light); margin-top:2px }
.cell-price { font-family:'Cormorant Garamond',serif; font-weight:700; font-size:1rem; color:var(--green-deep) }
.cart-qty { display:flex; align-items:center; gap:8px }
.qty-btn { width:28px; height:28px; border-radius:50%; border:1.5px solid var(--border); background:var(--white); font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:var(--transition) }
.qty-btn:hover { background:var(--green-deep); color:var(--white); border-color:var(--green-deep) }
.remove-btn { background:none; border:none; color:var(--text-light); font-size:0.9rem; cursor:pointer; transition:color 0.2s; width:28px; height:28px }
.remove-btn:hover { color:#c0392b }
.cart-actions { display:flex; gap:12px; margin-top:6px }
.cart-empty { text-align:center; padding:80px 40px; background:var(--white); border-radius:var(--radius-lg); border:1px solid var(--border) }
.cart-empty span { font-size:4rem; display:block; margin-bottom:16px }
.cart-empty h3 { font-family:'Cormorant Garamond',serif; font-size:1.8rem; color:var(--green-deep); margin-bottom:8px }
.cart-empty p { color:var(--text-light) }
.cart-summary { background:var(--white); border-radius:var(--radius-md); padding:28px; border:1px solid var(--border); position:sticky; top:90px }
.free-hint { font-size:0.78rem; color:var(--gold); font-weight:500; margin-top:-4px }
@media(max-width:900px) { .cart-layout { grid-template-columns:1fr } .cart-summary { position:static } .cart-head,.cart-row { grid-template-columns:2fr 1fr 1fr } }
</style>
