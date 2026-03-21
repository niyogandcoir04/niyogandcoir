<template>
  <div class="page-wrap">
    <AppNavbar />
    <main class="page-main">
      <div class="toast-wrap"><Transition><div class="toast" v-if="toast">✓ Added to cart!</div></Transition></div>
      <section class="page-hero-sm">
        <div class="container">
          <span class="section-tag" style="color:var(--gold-light)">Our Full Catalog</span>
          <h1 class="page-hero-title">All Products</h1>
          <p style="color:rgba(255,255,255,0.65);font-size:0.97rem;margin-top:8px">Handcrafted by Filipino artisans from 100% natural coconut coir</p>
        </div>
      </section>
      <section class="products-section">
        <div class="container products-layout">
          <aside class="sidebar">
            <div class="filter-block">
              <h4 class="filter-title">Category</h4>
              <label class="filter-opt" v-for="c in categories" :key="c"><input type="radio" :value="c" v-model="activeCat"/><span>{{ c }}</span></label>
            </div>
            <div class="filter-block">
              <h4 class="filter-title">Product Type</h4>
              <label class="filter-opt" v-for="t in tags" :key="t.val"><input type="radio" :value="t.val" v-model="activeTag"/><span>{{ t.label }}</span></label>
            </div>
            <div class="filter-block">
              <h4 class="filter-title">Max Price: ₱{{ maxPrice }}</h4>
              <input type="range" min="0" max="1500" step="50" v-model.number="maxPrice" class="range-slider"/>
              <div class="range-labels"><span>₱0</span><span>₱1,500</span></div>
            </div>
            <button class="btn btn-ghost" style="width:100%;justify-content:center" @click="reset">Reset Filters</button>
          </aside>
          <div class="products-main">
            <div class="toolbar">
              <p class="results-count">{{ filtered.length }} products found</p>
              <select v-model="sortBy" class="sort-select">
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
            <div class="all-grid" v-if="filtered.length">
              <div class="product-card" v-for="p in filtered" :key="p.id">
                <div class="card-img"><img :src="p.img" :alt="p.name"/><div class="card-badge" :class="'badge-'+p.badge" v-if="p.badge">{{ p.badge==='new'?'New':p.badge==='sale'?'Sale':'🔥 Hot' }}</div></div>
                <div class="card-body">
                  <p class="card-cat">{{ p.cat }}</p><h3 class="card-name">{{ p.name }}</h3><p class="card-desc">{{ p.desc }}</p>
                  <div class="card-footer">
                    <div class="price-wrap"><span class="price">₱{{ p.price }}</span><span class="price-old" v-if="p.oldPrice">₱{{ p.oldPrice }}</span></div>
                    <button class="btn-cart" @click="addToCart(p)">+ Cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="empty-state" v-else>
              <span>🌿</span>
              <h3>No products found</h3>
              <p>Try adjusting your filters.</p>
              <button class="btn btn-primary" style="margin-top:20px" @click="reset">Reset</button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'
import { store } from '../store/index.js'

const toast = ref(false); let t = null
function addToCart(p) { store.addToCart(p); toast.value=true; clearTimeout(t); t=setTimeout(()=>toast.value=false,2200) }

const activeCat = ref('All'); const activeTag = ref('all'); const maxPrice = ref(1500); const sortBy = ref('default')
const categories = ['All','Gardening','Construction','Home & Décor','Erosion','Agriculture']
const tags = [{val:'all',label:'All Types'},{val:'new',label:'New Arrivals'},{val:'trending',label:'Trending'},{val:'bestseller',label:'Best Sellers'}]

const filtered = computed(() => {
  let list = [...store.products]
  if (activeCat.value !== 'All') list = list.filter(p=>p.cat===activeCat.value)
  if (activeTag.value !== 'all') list = list.filter(p=>p.tag===activeTag.value)
  list = list.filter(p=>p.price<=maxPrice.value)
  if (sortBy.value==='price-asc')  list.sort((a,b)=>a.price-b.price)
  if (sortBy.value==='price-desc') list.sort((a,b)=>b.price-a.price)
  if (sortBy.value==='name')       list.sort((a,b)=>a.name.localeCompare(b.name))
  return list
})
function reset() { activeCat.value='All'; activeTag.value='all'; maxPrice.value=1500; sortBy.value='default' }
</script>

<style scoped>
.products-section { padding:52px 0 100px }
.products-layout { display:grid; grid-template-columns:240px 1fr; gap:36px; align-items:start }
.sidebar { background:var(--white); border-radius:var(--radius-md); padding:24px; border:1px solid var(--border); position:sticky; top:90px; display:flex; flex-direction:column; gap:24px }
.filter-title { font-size:0.78rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--green-deep); margin-bottom:10px; display:block }
.filter-opt { display:flex; align-items:center; gap:9px; font-size:0.87rem; color:var(--text-mid); cursor:pointer; margin-bottom:8px }
.filter-opt input { accent-color:var(--green-deep) }
.range-slider { width:100%; accent-color:var(--green-deep) }
.range-labels { display:flex; justify-content:space-between; font-size:0.76rem; color:var(--text-light); margin-top:4px }
.products-main { min-width:0 }
.toolbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px }
.results-count { font-size:0.87rem; color:var(--text-light) }
.sort-select { padding:7px 12px; border:1.5px solid var(--border); border-radius:var(--radius-sm); font-size:0.84rem; outline:none; cursor:pointer }
.all-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px }
.empty-state { text-align:center; padding:60px 0 }
.empty-state span { font-size:3rem; display:block; margin-bottom:12px }
.empty-state h3 { font-family:'Cormorant Garamond',serif; color:var(--green-deep); margin-bottom:6px }
.empty-state p { color:var(--text-light) }
@media(max-width:1000px) { .all-grid { grid-template-columns:1fr 1fr } }
@media(max-width:760px) { .products-layout { grid-template-columns:1fr } .sidebar { position:static } }
@media(max-width:500px) { .all-grid { grid-template-columns:1fr } }
</style>
