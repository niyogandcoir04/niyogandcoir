<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="brand-icon">🌿</div>
            <div class="brand-text">
              <span class="brand-name">Niyog <em>&amp;</em> Coir</span>
              <span class="brand-sub">Eco-Fiber Products</span>
            </div>
          </div>
          <p class="footer-tagline">From Philippine coconut husks to your doorstep.<br/>Sustainable. Natural. Local.</p>
        </div>
        <div class="footer-nav">
          <h5>Navigate</h5>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/storefront">Storefront</RouterLink>
          <RouterLink to="/products">All Products</RouterLink>
          <RouterLink to="/cart">Cart</RouterLink>
          <RouterLink to="/transaction-history">Orders</RouterLink>
        </div>
        <div class="footer-nav">
          <h5>Account</h5>
          <RouterLink to="/profile">My Profile</RouterLink>
          <RouterLink to="/login">Log In</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
          <RouterLink to="/checkout">Checkout</RouterLink>
        </div>
        <div class="footer-nav">
          <h5>Categories</h5>
          <a href="#">Gardening</a>
          <a href="#">Construction</a>
          <a href="#">Home &amp; Décor</a>
          <a href="#">Erosion Control</a>
          <a href="#">Agriculture</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-disclaimer">For educational purposes only, and no copyright infringement is intended.</p>
        <p class="footer-copy">© 2025 Niyog &amp; Coir. All rights reserved. Proudly Philippine-Made 🇵🇭</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background:var(--green-deep); padding:64px 0 0; margin-top:auto }
.footer-inner { display:flex; flex-direction:column }
.footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; padding-bottom:48px; border-bottom:1px solid rgba(255,255,255,0.08) }
.footer-logo { display:flex; align-items:center; gap:10px; margin-bottom:14px }
.brand-icon { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:1.2rem }
.brand-text { display:flex; flex-direction:column; line-height:1.1 }
.brand-name { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:700; color:var(--white) }
.brand-name em { color:var(--gold-light); font-style:italic }
.brand-sub { font-size:0.62rem; color:rgba(255,255,255,0.45); letter-spacing:0.08em; text-transform:uppercase }
.footer-tagline { font-size:0.86rem; color:rgba(255,255,255,0.55); line-height:1.75; max-width:280px }
.footer-nav { display:flex; flex-direction:column; gap:10px }
.footer-nav h5 { font-size:0.72rem; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold-light); margin-bottom:6px }
.footer-nav a { font-size:0.86rem; color:rgba(255,255,255,0.58); text-decoration:none; transition:color 0.2s }
.footer-nav a:hover { color:var(--white) }
.footer-bottom { padding:24px 0; display:flex; flex-direction:column; align-items:center; gap:6px; text-align:center }
.footer-disclaimer { font-size:0.78rem; font-style:italic; color:rgba(255,255,255,0.38) }
.footer-copy { font-size:0.76rem; color:rgba(255,255,255,0.28) }
@media(max-width:900px) { .footer-top { grid-template-columns:1fr 1fr } }
@media(max-width:600px) { .footer-top { grid-template-columns:1fr } }
</style>
