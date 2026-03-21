<template>
  <div class="page-wrap">
    <AppNavbar />
    <main class="page-main">
      <!-- TOAST -->
      <div class="toast-wrap"><Transition><div class="toast" v-if="toast">✓ Added to cart!</div></Transition></div>

      <!-- HERO -->
      <section class="sf-hero">
        <div class="container sf-hero-inner">
          <div class="sf-hero-text">
            <span class="section-tag" style="color:var(--gold-light)">Welcome to Our Storefront</span>
            <h1 class="sf-title">Curated Coir<br/><em>Collections</em></h1>
            <p style="color:rgba(255,255,255,0.68);font-size:0.97rem;max-width:440px">Hand-selected products featuring what's new, trending, and loved by our customers.</p>
          </div>
          <div class="sf-hero-stats">
            <div class="sf-stat" v-for="s in stats" :key="s.label">
              <span class="sf-stat-num">{{ s.num }}</span>
              <span class="sf-stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- NEW ARRIVALS -->
      <section class="sf-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Fresh Drops</span>
            <h2 class="section-title">New Arrivals</h2>
            <p class="section-sub">The latest additions to our coconut coir lineup</p>
          </div>
          <div class="sf-grid">
            <div class="product-card" v-for="p in newArrivals" :key="p.id">
              <div class="card-img"><img :src="p.img" :alt="p.name"/><div class="card-badge badge-new">New</div></div>
              <div class="card-body">
                <p class="card-cat">{{ p.cat }}</p><h3 class="card-name">{{ p.name }}</h3><p class="card-desc">{{ p.desc }}</p>
                <div class="card-footer">
                  <div class="price-wrap"><span class="price">₱{{ p.price }}</span><span class="price-old" v-if="p.oldPrice">₱{{ p.oldPrice }}</span></div>
                  <button class="btn-cart" @click="addToCart(p)">+ Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TRENDING -->
      <section class="sf-section sf-alt">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">What's Hot</span>
            <h2 class="section-title">Trending Now</h2>
            <p class="section-sub">Products everyone's talking about this season</p>
          </div>
          <div class="sf-grid">
            <div class="product-card" v-for="p in trending" :key="p.id">
              <div class="card-img"><img :src="p.img" :alt="p.name"/><div class="card-badge badge-hot">🔥 Hot</div></div>
              <div class="card-body">
                <p class="card-cat">{{ p.cat }}</p><h3 class="card-name">{{ p.name }}</h3><p class="card-desc">{{ p.desc }}</p>
                <div class="card-footer">
                  <div class="price-wrap"><span class="price">₱{{ p.price }}</span><span class="price-old" v-if="p.oldPrice">₱{{ p.oldPrice }}</span></div>
                  <button class="btn-cart" @click="addToCart(p)">+ Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BEST SELLERS -->
      <section class="sf-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Most Loved</span>
            <h2 class="section-title">Best Sellers</h2>
            <p class="section-sub">What our customers keep coming back for</p>
          </div>
          <div class="bs-layout">
            <div class="bs-main-card" v-if="bestSellers[0]">
              <div class="bs-main-img"><img :src="bestSellers[0].img" :alt="bestSellers[0].name"/><div class="bs-crown">#1 Best Seller 🏆</div></div>
              <div class="bs-main-info">
                <p class="card-cat">{{ bestSellers[0].cat }}</p>
                <h3 class="bs-main-name">{{ bestSellers[0].name }}</h3>
                <p class="bs-main-desc">{{ bestSellers[0].desc }}</p>
                <div class="bs-stars">★★★★★ <span class="bs-rc">1,842 reviews</span></div>
                <div class="bs-sizes">
                  <button v-for="sz in sizes" :key="sz" class="size-btn" :class="{ active: selectedSize===sz }" @click="selectedSize=sz">{{ sz }}</button>
                </div>
                <div class="bs-footer">
                  <span class="bs-price">₱{{ bestSellers[0].price }}</span>
                  <button class="btn btn-primary" @click="addToCart(bestSellers[0])">Add to Cart</button>
                </div>
              </div>
            </div>
            <div class="bs-side">
              <div class="bs-side-card" v-for="(p,i) in bestSellers.slice(1)" :key="p.id">
                <div class="bs-rank">#{{ i+2 }}</div>
                <div class="bs-side-img"><img :src="p.img" :alt="p.name"/></div>
                <div class="bs-side-info">
                  <p class="card-cat">{{ p.cat }}</p>
                  <h4 class="bs-side-name">{{ p.name }}</h4>
                  <div class="bs-side-footer"><span class="price">₱{{ p.price }}</span><button class="btn-cart" @click="addToCart(p)">+ Cart</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="sf-cta">
        <div class="container" style="text-align:center">
          <h2 style="font-family:'Cormorant Garamond',serif;color:var(--white);font-size:2rem">See the Full Catalog</h2>
          <p style="color:rgba(255,255,255,0.65);margin-top:6px">Browse all 30+ coconut coir products we carry.</p>
          <RouterLink to="/products" class="btn btn-gold" style="margin-top:20px;display:inline-flex">View All Products →</RouterLink>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'
import { store } from '../store/index.js'

const toast = ref(false); let t = null
function addToCart(p) { store.addToCart(p); toast.value=true; clearTimeout(t); t=setTimeout(()=>toast.value=false,2200) }

const stats = [{ num:'30+',label:'Products'},{ num:'5k+',label:'Customers'},{ num:'100%',label:'Organic'},{ num:'PH',label:'Local Made'}]
const newArrivals = store.products.filter(p=>p.tag==='new').slice(0,4)
const trending    = store.products.filter(p=>p.tag==='trending').slice(0,4)
const bestSellers = store.products.filter(p=>p.tag==='bestseller')
const selectedSize = ref('5kg')
const sizes = ['2kg','5kg','10kg','25kg']
</script>

<style scoped>
.sf-hero { background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-mid) 100%); padding:72px 0 }
.sf-hero-inner { display:flex; align-items:center; justify-content:space-between; gap:48px; flex-wrap:wrap }
.sf-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.2rem,4vw,3.4rem); font-weight:700; color:var(--white); line-height:1.1; margin:10px 0 16px }
.sf-title em { color:var(--gold-light); font-style:italic }
.sf-hero-stats { display:flex; gap:36px; flex-wrap:wrap }
.sf-stat { display:flex; flex-direction:column; align-items:center; gap:4px }
.sf-stat-num { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; color:var(--white) }
.sf-stat-label { font-size:0.75rem; color:rgba(255,255,255,0.55); font-weight:500; letter-spacing:0.06em }
.sf-section { padding:90px 0 }
.sf-alt { background:var(--ivory-dark) }
.sf-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px }
.bs-layout { display:grid; grid-template-columns:1fr 360px; gap:24px; align-items:start }
.bs-main-card { background:var(--white); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-md); display:grid; grid-template-columns:1fr 1fr; border:1px solid var(--border) }
.bs-main-img { position:relative; min-height:420px; background:var(--green-pale); overflow:hidden }
.bs-main-img img { width:100%; height:100%; object-fit:cover }
.bs-crown { position:absolute; bottom:16px; left:50%; transform:translateX(-50%); background:var(--gold); color:var(--white); font-size:0.76rem; font-weight:700; padding:7px 18px; border-radius:var(--radius-pill); white-space:nowrap }
.bs-main-info { padding:36px 30px; display:flex; flex-direction:column; gap:14px }
.bs-main-name { font-family:'Cormorant Garamond',serif; font-size:1.65rem; font-weight:700; color:var(--green-deep); line-height:1.2 }
.bs-main-desc { font-size:0.87rem; color:var(--text-mid); line-height:1.75 }
.bs-stars { color:var(--gold); font-size:1rem }
.bs-rc { font-size:0.8rem; color:var(--text-light); margin-left:6px }
.bs-sizes { display:flex; gap:8px; flex-wrap:wrap }
.size-btn { padding:6px 15px; border-radius:var(--radius-pill); border:1.5px solid var(--border); background:transparent; font-size:0.82rem; font-weight:500; cursor:pointer; color:var(--text-mid); transition:var(--transition) }
.size-btn.active,.size-btn:hover { background:var(--green-deep); color:var(--white); border-color:var(--green-deep) }
.bs-footer { display:flex; align-items:center; gap:16px; margin-top:auto }
.bs-price { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:700; color:var(--green-deep) }
.bs-side { display:flex; flex-direction:column; gap:12px }
.bs-side-card { background:var(--white); border-radius:var(--radius-md); padding:14px; display:flex; align-items:center; gap:12px; box-shadow:var(--shadow-xs); border:1px solid var(--border); transition:var(--transition); border-left:3px solid transparent }
.bs-side-card:hover { transform:translateX(4px); box-shadow:var(--shadow-sm); border-left-color:var(--gold) }
.bs-rank { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color:var(--gold); width:28px; flex-shrink:0 }
.bs-side-img { width:56px; height:56px; border-radius:var(--radius-sm); overflow:hidden; flex-shrink:0 }
.bs-side-img img { width:100%; height:100%; object-fit:cover }
.bs-side-info { flex:1; min-width:0 }
.bs-side-name { font-family:'Cormorant Garamond',serif; font-size:0.93rem; font-weight:700; color:var(--green-deep); margin-bottom:6px; line-height:1.3 }
.bs-side-footer { display:flex; align-items:center; justify-content:space-between }
.sf-cta { background:var(--green-deep); padding:80px 0 }
@media(max-width:1100px) { .sf-grid { grid-template-columns:repeat(2,1fr) } .bs-layout { grid-template-columns:1fr } .bs-main-card { grid-template-columns:1fr } .bs-main-img { min-height:260px } }
@media(max-width:600px) { .sf-grid { grid-template-columns:1fr } }
</style>
