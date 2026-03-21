<template>
  <div class="page-wrap">
    <AppNavbar />
    <main class="page-main">
      <section class="page-hero-sm"><div class="container"><span class="section-tag" style="color:var(--gold-light)">Almost There</span><h1 class="page-hero-title">Checkout</h1></div></section>

      <section v-if="placed" class="success-section">
        <div class="container">
          <div class="success-card">
            <div class="success-icon">✅</div>
            <h2>Order Placed!</h2>
            <p>Order <strong>{{ orderId }}</strong> confirmed. Thank you for choosing Niyog &amp; Coir! 🌿</p>
            <div style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap;justify-content:center">
              <RouterLink to="/transaction-history" class="btn btn-primary">View Order History</RouterLink>
              <RouterLink to="/products" class="btn btn-secondary">Continue Shopping</RouterLink>
            </div>
          </div>
        </div>
      </section>

      <section v-else class="checkout-section">
        <div class="container checkout-layout">
          <div class="checkout-forms">
            <!-- DELIVERY INFO -->
            <div class="co-card">
              <h3 class="co-card-title"><span class="step">1</span> Delivery Information</h3>
              <div class="form-row-2">
                <div class="form-group"><label>Full Name</label><input v-model="form.name" placeholder="Juan dela Cruz"/></div>
                <div class="form-group"><label>Mobile Number</label><input v-model="form.mobile" placeholder="+63 9XX XXX XXXX"/></div>
              </div>
              <div class="form-group"><label>Email Address</label><input v-model="form.email" placeholder="juan@email.com"/></div>
              <div class="form-group"><label>Delivery Address</label><input v-model="form.address" placeholder="House No., Street, Barangay, City, Province"/></div>
              <div class="form-group"><label>Order Notes (optional)</label><textarea v-model="form.notes" rows="3" placeholder="Any special instructions..."></textarea></div>
            </div>

            <!-- RECEIVE METHOD -->
            <div class="co-card">
              <h3 class="co-card-title"><span class="step">2</span> How Will You Receive It?</h3>
              <div class="receive-opts">
                <label class="receive-opt" :class="{selected:mode==='delivery'}">
                  <input type="radio" value="delivery" v-model="mode"/>
                  <span class="r-icon">🚚</span>
                  <div><strong>Home Delivery</strong><p>3–7 business days.</p><p class="r-fee">{{ store.cartSubtotal>=1500?'FREE':'+ ₱80 shipping fee' }}</p></div>
                </label>
                <label class="receive-opt" :class="{selected:mode==='pickup'}">
                  <input type="radio" value="pickup" v-model="mode"/>
                  <span class="r-icon">🏪</span>
                  <div><strong>Store Pickup</strong><p>Quezon City, Metro Manila.</p><p class="r-fee">FREE · Ready in 1–2 days</p></div>
                </label>
              </div>
            </div>

            <!-- PAYMENT -->
            <div class="co-card">
              <h3 class="co-card-title"><span class="step">3</span> Payment Method</h3>
              <div class="pay-opts">
                <label class="pay-opt" :class="{selected:pay===p.val}" v-for="p in payMethods" :key="p.val">
                  <input type="radio" :value="p.val" v-model="pay"/>
                  <span>{{ p.icon }}</span><span>{{ p.label }}</span>
                </label>
              </div>
              <div v-if="pay==='gcash'||pay==='maya'" class="pay-extra">
                <div class="form-group"><label>{{ pay==='gcash'?'GCash':'Maya' }} Number</label><input type="tel" placeholder="+63 9XX XXX XXXX"/></div>
              </div>
              <div v-if="pay==='bank'" class="pay-extra bank-info">
                <p><strong>Bank:</strong> BDO Unibank</p>
                <p><strong>Account Name:</strong> Niyog &amp; Coir Inc.</p>
                <p><strong>Account No.:</strong> 1234-5678-9012</p>
              </div>
            </div>
          </div>

          <!-- SUMMARY -->
          <div class="co-summary">
            <h3 class="summary-title">Order Summary</h3>
            <div class="co-items">
              <div class="co-item" v-for="item in store.cartItems" :key="item.id">
                <div class="co-img">{{ item.emoji }}</div>
                <div class="co-info"><p>{{ item.name }}</p><p style="font-size:0.76rem;color:var(--text-light)">Qty: {{ item.qty }}</p></div>
                <span style="font-family:'Cormorant Garamond',serif;font-weight:700;color:var(--green-deep)">₱{{ item.price*item.qty }}</span>
              </div>
            </div>
            <div class="summary-row"><span>Subtotal</span><span>₱{{ store.cartSubtotal }}</span></div>
            <div class="summary-row"><span>Shipping</span><span :class="{free:mode==='pickup'||store.cartSubtotal>=1500}">{{ mode==='pickup'||store.cartSubtotal>=1500?'FREE':'₱80' }}</span></div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total"><span>Total</span><span>₱{{ grandTotal }}</span></div>
            <button class="btn btn-primary btn-full" style="margin-top:20px" @click="placeOrder" :disabled="!canPlace">Place Order →</button>
            <p v-if="!canPlace" style="font-size:0.76rem;color:#c0392b;text-align:center;margin-top:8px">Please fill in all required fields.</p>
            <div class="secure-note">🔒 Secure &amp; Encrypted Checkout</div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'
import { store } from '../store/index.js'

const form = reactive({ name:'', mobile:'', email:'', address:'', notes:'' })
const mode = ref('delivery'); const pay = ref('gcash')
const placed = ref(false); const orderId = ref('')
const payMethods = [{val:'gcash',icon:'💙',label:'GCash'},{val:'maya',icon:'💚',label:'Maya'},{val:'bank',icon:'🏦',label:'Bank Transfer'},{val:'cod',icon:'💵',label:'Cash on Delivery'}]
const shipping = computed(() => mode.value==='pickup'||store.cartSubtotal>=1500 ? 0 : 80)
const grandTotal = computed(() => store.cartSubtotal + shipping.value)
const canPlace = computed(() => form.name && form.mobile && form.email && form.address && store.cartItems.length > 0)

function placeOrder() {
  if (!canPlace.value) return
  orderId.value = 'NC-' + Date.now().toString().slice(-8)
  store.transactions.unshift({
    id: orderId.value,
    date: new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}),
    items: store.cartItems.map(i=>`${i.name} x${i.qty}`),
    total: grandTotal.value,
    status: 'Processing',
    method: payMethods.find(p=>p.val===pay.value)?.label,
    mode: mode.value==='pickup'?'Pickup':'Delivery',
  })
  store.clearCart(); placed.value = true; window.scrollTo({top:0,behavior:'smooth'})
}
</script>

<style scoped>
.checkout-section { padding:52px 0 100px }
.checkout-layout { display:grid; grid-template-columns:1fr 340px; gap:28px; align-items:start }
.checkout-forms { display:flex; flex-direction:column; gap:20px }
.co-card { background:var(--white); border-radius:var(--radius-md); padding:28px; border:1px solid var(--border) }
.co-card-title { font-family:'Cormorant Garamond',serif; font-size:1.2rem; font-weight:700; color:var(--green-deep); margin-bottom:20px; display:flex; align-items:center; gap:10px }
.step { width:28px; height:28px; border-radius:50%; background:var(--green-deep); color:var(--white); font-size:0.82rem; font-weight:700; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:'Jost',sans-serif }
textarea { resize:vertical; min-height:80px; width:100% }
.receive-opts { display:grid; grid-template-columns:1fr 1fr; gap:14px }
.receive-opt { display:flex; align-items:flex-start; gap:12px; padding:18px; border-radius:var(--radius-md); border:2px solid var(--border); cursor:pointer; transition:var(--transition) }
.receive-opt input { display:none }
.receive-opt.selected { border-color:var(--green-deep); background:var(--green-subtle) }
.r-icon { font-size:1.6rem; flex-shrink:0 }
.receive-opt strong { font-size:0.9rem; color:var(--green-deep); display:block; margin-bottom:4px }
.receive-opt p { font-size:0.8rem; color:var(--text-light); line-height:1.5 }
.r-fee { color:var(--gold) !important; font-weight:600 !important; }
.pay-opts { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px }
.pay-opt { display:flex; align-items:center; gap:10px; padding:14px 16px; border-radius:var(--radius-md); border:2px solid var(--border); cursor:pointer; transition:var(--transition); font-size:0.88rem; font-weight:500 }
.pay-opt input { display:none }
.pay-opt.selected { border-color:var(--green-deep); background:var(--green-subtle) }
.pay-extra { padding:16px; background:var(--ivory); border-radius:var(--radius-sm); border:1px solid var(--border) }
.bank-info { display:flex; flex-direction:column; gap:6px; font-size:0.88rem; color:var(--text-mid) }
.co-summary { background:var(--white); border-radius:var(--radius-md); padding:28px; border:1px solid var(--border); position:sticky; top:90px }
.co-items { display:flex; flex-direction:column; gap:12px; margin-bottom:20px }
.co-item { display:flex; align-items:center; gap:10px; padding-bottom:12px; border-bottom:1px solid var(--border) }
.co-item:last-child { border-bottom:none; padding-bottom:0 }
.co-img { width:44px; height:44px; border-radius:var(--radius-sm); background:var(--green-pale); font-size:1.5rem; display:flex; align-items:center; justify-content:center; flex-shrink:0 }
.co-info { flex:1 }
.co-info p { font-size:0.86rem; font-weight:600; color:var(--text-dark) }
.success-section { padding:100px 0 }
.success-card { max-width:520px; margin:0 auto; text-align:center; background:var(--white); border-radius:var(--radius-xl); padding:60px 40px; border:1px solid var(--border); box-shadow:var(--shadow-md) }
.success-icon { font-size:4rem; margin-bottom:20px }
.success-card h2 { font-family:'Cormorant Garamond',serif; font-size:2rem; color:var(--green-deep); margin-bottom:12px }
.success-card p { color:var(--text-mid) }
@media(max-width:900px) { .checkout-layout { grid-template-columns:1fr } .co-summary { position:static } .receive-opts,.pay-opts { grid-template-columns:1fr } }
</style>
