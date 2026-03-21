<template>
  <div class="page-wrap">
    <AppNavbar />
    <main class="page-main">
      <section class="page-hero-sm"><div class="container"><span class="section-tag" style="color:var(--gold-light)">My Account</span><h1 class="page-hero-title">Profile</h1></div></section>
      <section class="profile-section">
        <div class="container">
          <div v-if="!store.isLoggedIn" class="profile-prompt">
            <span>🔒</span>
            <h3>Please log in</h3>
            <p>Create an account or log in to view your profile.</p>
            <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;justify-content:center">
              <RouterLink to="/login" class="btn btn-primary">Log In</RouterLink>
              <RouterLink to="/register" class="btn btn-secondary">Create Account</RouterLink>
            </div>
          </div>
          <div v-else class="profile-layout">
            <aside class="profile-sidebar">
              <div class="profile-avatar-wrap">
                <div class="profile-avatar">{{ store.user?.name?.charAt(0)||'U' }}</div>
                <h3 class="profile-name">{{ store.user?.name }}</h3>
                <p class="profile-email">{{ store.user?.email }}</p>
                <span class="profile-badge">🌿 Eco Member</span>
              </div>
              <nav class="profile-nav">
                <button v-for="tab in tabs" :key="tab.id" class="pnav-btn" :class="{active:activeTab===tab.id}" @click="activeTab=tab.id">{{ tab.icon }} {{ tab.label }}</button>
              </nav>
              <button class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:auto" @click="logout">🚪 Log Out</button>
            </aside>
            <div class="profile-main">
              <!-- INFO -->
              <div v-if="activeTab==='info'" class="pcard">
                <h3 class="pcard-title">Personal Information</h3>
                <div class="form-row-2">
                  <div class="form-group"><label>Full Name</label><input :value="store.user.name" readonly/></div>
                  <div class="form-group"><label>Email Address</label><input :value="store.user.email" readonly/></div>
                </div>
                <div class="form-row-2">
                  <div class="form-group"><label>Mobile Number</label><input :value="store.user.mobile||'+63 900 000 0000'" readonly/></div>
                  <div class="form-group"><label>Member Since</label><input :value="store.user.joinDate||'March 2025'" readonly/></div>
                </div>
                <div class="form-group"><label>Address</label><input :value="store.user.address||'Metro Manila, Philippines'" readonly/></div>
              </div>
              <!-- ORDERS -->
              <div v-if="activeTab==='orders'" class="pcard">
                <h3 class="pcard-title">Recent Orders</h3>
                <div style="display:flex;flex-direction:column;gap:14px">
                  <div class="txn-card-mini" v-for="tx in store.transactions.slice(0,3)" :key="tx.id">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:10px">
                      <div><p style="font-weight:700;font-size:0.9rem;color:var(--green-deep);font-family:monospace">{{ tx.id }}</p><p style="font-size:0.78rem;color:var(--text-light)">{{ tx.date }}</p></div>
                      <span :class="['txn-status','status-'+tx.status.toLowerCase()]">{{ tx.status }}</span>
                    </div>
                    <p style="font-size:0.82rem;color:var(--text-mid)">{{ tx.items.join(' · ') }}</p>
                    <div style="display:flex;justify-content:space-between;margin-top:10px">
                      <span style="font-size:0.82rem;color:var(--text-light)">{{ tx.method }} · {{ tx.mode }}</span>
                      <span style="font-family:'Cormorant Garamond',serif;font-weight:700;color:var(--green-deep)">₱{{ tx.total }}</span>
                    </div>
                  </div>
                </div>
                <RouterLink to="/transaction-history" class="btn btn-secondary" style="margin-top:16px;display:inline-flex">View Full History →</RouterLink>
              </div>
              <!-- SETTINGS -->
              <div v-if="activeTab==='settings'" class="pcard">
                <h3 class="pcard-title">Account Settings</h3>
                <div class="settings-list">
                  <div class="setting-row" v-for="s in settings" :key="s.label">
                    <div><strong>{{ s.label }}</strong><p>{{ s.desc }}</p></div>
                    <label class="toggle"><input type="checkbox" :checked="s.on"/><span class="slider"></span></label>
                  </div>
                </div>
                <div class="danger-zone"><h4>Danger Zone</h4><button class="btn-danger">Delete Account</button></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'
import { store } from '../store/index.js'

const router = useRouter()
const activeTab = ref('info')
const tabs = [{id:'info',icon:'👤',label:'Personal Info'},{id:'orders',icon:'📦',label:'My Orders'},{id:'settings',icon:'⚙️',label:'Settings'}]
const settings = [{label:'Email Notifications',desc:'Receive order updates via email',on:true},{label:'SMS Alerts',desc:'Get shipping notifications via SMS',on:false},{label:'Eco Newsletter',desc:'Tips on sustainable living with coir',on:true}]
function logout() { store.logout(); router.push('/login') }
</script>

<style scoped>
.profile-section { padding:52px 0 100px }
.profile-prompt { text-align:center; max-width:400px; margin:0 auto; padding:80px 40px; background:var(--white); border-radius:var(--radius-xl); border:1px solid var(--border) }
.profile-prompt span { font-size:3rem; display:block; margin-bottom:16px }
.profile-prompt h3 { font-family:'Cormorant Garamond',serif; font-size:1.8rem; color:var(--green-deep); margin-bottom:8px }
.profile-prompt p { color:var(--text-light) }
.profile-layout { display:grid; grid-template-columns:260px 1fr; gap:28px; align-items:start }
.profile-sidebar { background:var(--white); border-radius:var(--radius-md); padding:24px; border:1px solid var(--border); display:flex; flex-direction:column; gap:0; position:sticky; top:90px; min-height:500px }
.profile-avatar-wrap { text-align:center; padding-bottom:20px; border-bottom:1px solid var(--border); margin-bottom:16px }
.profile-avatar { width:72px; height:72px; border-radius:50%; background:var(--green-deep); color:var(--white); font-size:1.8rem; font-weight:700; display:flex; align-items:center; justify-content:center; margin:0 auto 12px }
.profile-name { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:700; color:var(--green-deep) }
.profile-email { font-size:0.8rem; color:var(--text-light); margin-top:3px }
.profile-badge { display:inline-block; margin-top:8px; background:var(--green-pale); color:var(--green-deep); font-size:0.72rem; font-weight:600; padding:4px 12px; border-radius:var(--radius-pill) }
.profile-nav { display:flex; flex-direction:column; gap:4px; flex:1 }
.pnav-btn { display:flex; align-items:center; gap:10px; padding:11px 14px; border-radius:var(--radius-sm); border:none; background:transparent; font-size:0.87rem; font-weight:500; color:var(--text-mid); cursor:pointer; transition:var(--transition); text-align:left }
.pnav-btn.active,.pnav-btn:hover { background:var(--green-pale); color:var(--green-deep) }
.profile-main { display:flex; flex-direction:column; gap:20px }
.pcard { background:var(--white); border-radius:var(--radius-md); padding:28px; border:1px solid var(--border) }
.pcard-title { font-family:'Cormorant Garamond',serif; font-size:1.3rem; font-weight:700; color:var(--green-deep); margin-bottom:22px }
.pcard .form-group input[readonly] { background:var(--ivory); color:var(--text-mid) }
.txn-card-mini { background:var(--ivory); border-radius:var(--radius-md); padding:16px; border:1px solid var(--border) }
.txn-status { font-size:0.78rem; font-weight:700; padding:5px 14px; border-radius:var(--radius-pill); text-transform:uppercase }
.status-delivered { background:#e6f4ea; color:#1b6b2e }
.status-processing { background:#fff8e1; color:#b8860b }
.status-cancelled  { background:#fdecea; color:#c0392b }
.settings-list { display:flex; flex-direction:column }
.setting-row { display:flex; align-items:center; justify-content:space-between; padding:18px 0; border-bottom:1px solid var(--border); gap:16px }
.setting-row:last-child { border-bottom:none }
.setting-row strong { font-size:0.9rem; color:var(--text-dark) }
.setting-row p { font-size:0.8rem; color:var(--text-light); margin-top:2px }
.toggle { position:relative; display:inline-block; width:44px; height:24px; flex-shrink:0 }
.toggle input { opacity:0; width:0; height:0 }
.slider { position:absolute; inset:0; cursor:pointer; background:#ccc; border-radius:var(--radius-pill); transition:0.3s }
.slider::before { content:''; position:absolute; width:18px; height:18px; border-radius:50%; left:3px; bottom:3px; background:white; transition:0.3s }
.toggle input:checked + .slider { background:var(--green-deep) }
.toggle input:checked + .slider::before { transform:translateX(20px) }
.danger-zone { margin-top:28px; padding-top:20px; border-top:1px solid var(--border) }
.danger-zone h4 { font-size:0.85rem; color:#c0392b; font-weight:600; margin-bottom:12px }
.btn-danger { background:#fdecea; color:#c0392b; border:1.5px solid #f5c6cb; padding:9px 20px; border-radius:var(--radius-pill); font-size:0.85rem; font-weight:600; cursor:pointer; transition:var(--transition) }
.btn-danger:hover { background:#c0392b; color:white }
@media(max-width:800px) { .profile-layout { grid-template-columns:1fr } .profile-sidebar { position:static } }
</style>
