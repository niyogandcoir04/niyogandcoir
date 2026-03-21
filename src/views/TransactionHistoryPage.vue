<template>
  <div class="page-wrap">
    <AppNavbar />
    <main class="page-main">
      <section class="page-hero-sm"><div class="container"><span class="section-tag" style="color:var(--gold-light)">Your Orders</span><h1 class="page-hero-title">Transaction History</h1></div></section>
      <section class="txn-section">
        <div class="container">
          <div class="txn-tabs">
            <button v-for="tab in tabs" :key="tab" class="txn-tab" :class="{active:activeTab===tab}" @click="activeTab=tab">{{ tab }}</button>
          </div>
          <div class="txn-stats">
            <div class="txn-stat" v-for="s in stats" :key="s.label">
              <span class="txn-num">{{ s.val }}</span><span class="txn-label">{{ s.label }}</span>
            </div>
          </div>
          <div class="txn-list" v-if="filtered.length">
            <div class="txn-card" v-for="tx in filtered" :key="tx.id">
              <div class="txn-header">
                <div><p class="txn-id">{{ tx.id }}</p><p class="txn-date">📅 {{ tx.date }}</p></div>
                <div :class="['txn-status','status-'+tx.status.toLowerCase()]">{{ statusIcon(tx.status) }} {{ tx.status }}</div>
              </div>
              <div class="txn-items">
                <span class="txn-tag" v-for="item in tx.items" :key="item">{{ item }}</span>
              </div>
              <div class="txn-footer">
                <div class="txn-meta">
                  <span>💳 {{ tx.method }}</span>
                  <span>{{ tx.mode==='Pickup'?'🏪':'🚚' }} {{ tx.mode }}</span>
                </div>
                <span class="txn-total">₱{{ tx.total.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div class="txn-empty" v-else>
            <span>📭</span>
            <h3>No {{ activeTab }} orders</h3>
            <RouterLink to="/products" class="btn btn-primary" style="margin-top:20px">Start Shopping</RouterLink>
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

const activeTab = ref('All')
const tabs = ['All','Delivered','Processing','Cancelled']
const filtered = computed(() => activeTab.value==='All' ? store.transactions : store.transactions.filter(t=>t.status===activeTab.value))
const stats = computed(() => [
  { val: store.transactions.length, label:'Total Orders' },
  { val: store.transactions.filter(t=>t.status==='Delivered').length, label:'Delivered' },
  { val: '₱'+store.transactions.filter(t=>t.status==='Delivered').reduce((s,t)=>s+t.total,0).toLocaleString(), label:'Total Spent' },
])
const statusIcon = s => ({Delivered:'✅',Processing:'⏳',Cancelled:'❌',Shipped:'🚚'}[s]||'📦')
</script>

<style scoped>
.txn-section { padding:52px 0 100px }
.txn-tabs { display:flex; gap:8px; margin-bottom:32px; flex-wrap:wrap }
.txn-tab { padding:8px 20px; border-radius:var(--radius-pill); border:1.5px solid var(--border); background:var(--white); font-size:0.86rem; font-weight:500; cursor:pointer; color:var(--text-mid); transition:var(--transition) }
.txn-tab.active,.txn-tab:hover { background:var(--green-deep); color:var(--white); border-color:var(--green-deep) }
.txn-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:32px; max-width:600px }
.txn-stat { background:var(--white); border-radius:var(--radius-md); padding:20px 24px; border:1px solid var(--border); text-align:center }
.txn-num { font-family:'Cormorant Garamond',serif; font-size:1.6rem; font-weight:700; color:var(--green-deep); display:block }
.txn-label { font-size:0.76rem; color:var(--text-light); display:block; margin-top:4px }
.txn-list { display:flex; flex-direction:column; gap:14px }
.txn-card { background:var(--white); border-radius:var(--radius-md); padding:22px 24px; border:1px solid var(--border); transition:var(--transition) }
.txn-card:hover { border-color:rgba(27,61,43,0.2); box-shadow:var(--shadow-sm) }
.txn-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; flex-wrap:wrap; gap:10px }
.txn-id { font-weight:700; font-size:0.92rem; color:var(--green-deep); font-family:monospace }
.txn-date { font-size:0.8rem; color:var(--text-light); margin-top:3px }
.txn-status { font-size:0.78rem; font-weight:700; padding:5px 14px; border-radius:var(--radius-pill); text-transform:uppercase; letter-spacing:0.04em }
.status-delivered { background:#e6f4ea; color:#1b6b2e }
.status-processing { background:#fff8e1; color:#b8860b }
.status-cancelled  { background:#fdecea; color:#c0392b }
.txn-items { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px }
.txn-tag { background:var(--green-subtle); color:var(--green-deep); font-size:0.78rem; font-weight:500; padding:4px 12px; border-radius:var(--radius-pill); border:1px solid var(--border) }
.txn-footer { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px }
.txn-meta { display:flex; gap:16px; font-size:0.82rem; color:var(--text-light) }
.txn-total { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--green-deep) }
.txn-empty { text-align:center; padding:80px 0 }
.txn-empty span { font-size:3rem; display:block; margin-bottom:14px }
.txn-empty h3 { font-family:'Cormorant Garamond',serif; font-size:1.6rem; color:var(--green-deep); margin-bottom:6px }
</style>
