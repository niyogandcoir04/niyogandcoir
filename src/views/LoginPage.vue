<template>
  <div class="auth-page">
    <div class="auth-split">
      <!-- LEFT PANEL -->
      <div class="auth-left">
        <RouterLink to="/" class="auth-brand">
          <div class="brand-icon">🌿</div>
          <div class="brand-text">
            <span class="brand-name">Niyog <em>&amp;</em> Coir</span>
            <span class="brand-sub">Eco-Fiber Products</span>
          </div>
        </RouterLink>
        <div class="auth-left-body">
          <h2 class="auth-left-title">Welcome Back,<br/><em>Eco Warrior</em></h2>
          <p>Log in to access your cart, track orders, and explore our full collection of Philippine coconut coir products.</p>
          <div class="auth-features">
            <div class="auth-feat" v-for="f in features" :key="f"><span class="feat-dot">●</span> {{ f }}</div>
          </div>
        </div>
        <div class="auth-deco">🌿</div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="auth-right">
        <div class="auth-form-wrap">
          <h1 class="auth-form-title">Log In</h1>
          <p class="auth-form-sub">Enter your credentials to continue</p>

          <div class="auth-form">
            <div class="form-group">
              <label>Email Address</label>
              <input v-model="email" type="email" placeholder="juan@email.com" @keyup.enter="login"/>
              <span class="form-error" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="pass-wrap">
                <input v-model="password" :type="showPass?'text':'password'" placeholder="Your password" @keyup.enter="login"/>
                <button class="pass-toggle" @click="showPass=!showPass">{{ showPass?'🙈':'👁️' }}</button>
              </div>
              <span class="form-error" v-if="errors.password">{{ errors.password }}</span>
            </div>
            <div class="auth-remember">
              <label class="check-wrap"><input type="checkbox" v-model="remember"/> Remember me</label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>
            <span class="form-error" v-if="errors.general">{{ errors.general }}</span>
            <button class="btn btn-primary btn-full" @click="login">Log In →</button>
            <div class="auth-divider"><span>or</span></div>
            <button class="btn btn-ghost btn-full" @click="demoLogin">🧪 Use Demo Account</button>
          </div>

          <p class="auth-switch">Don't have an account? <RouterLink to="/register" class="auth-link">Sign Up</RouterLink></p>
        </div>
        <p class="auth-footer-note">For educational purposes only, and no copyright infringement is intended.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store/index.js'

const router = useRouter()
const email = ref(''); const password = ref(''); const showPass = ref(false); const remember = ref(false)
const errors = reactive({ email:'', password:'', general:'' })

const features = [
  'Track your orders in real-time',
  'Manage your eco-friendly wishlist',
  'Exclusive member discounts',
  'Fast checkout with saved address',
]

function validate() {
  let ok = true; errors.email = errors.password = errors.general = ''
  if (!email.value) { errors.email = 'Email is required.'; ok = false }
  else if (!/\S+@\S+\.\S+/.test(email.value)) { errors.email = 'Enter a valid email.'; ok = false }
  if (!password.value) { errors.password = 'Password is required.'; ok = false }
  return ok
}
function login() {
  if (!validate()) return
  store.login({
    name: email.value.split('@')[0].replace(/\./g,' ').replace(/\b\w/g,c=>c.toUpperCase()),
    email: email.value, joinDate: 'March 2025',
  })
  router.push('/')
}
function demoLogin() {
  store.login({ name:'Juan dela Cruz', email:'juan@niyogcoir.ph', mobile:'+63 912 345 6789', address:'Quezon City, Metro Manila', joinDate:'March 2025' })
  router.push('/')
}
</script>

<style scoped>
.auth-page { min-height:100vh; background:var(--white) }
.auth-split { display:grid; grid-template-columns:420px 1fr; min-height:100vh }
.auth-left { background:var(--green-deep); padding:36px; display:flex; flex-direction:column; position:relative; overflow:hidden }
.auth-brand { display:flex; align-items:center; gap:10px; text-decoration:none; margin-bottom:60px }
.brand-icon { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:1.2rem }
.brand-text { display:flex; flex-direction:column; line-height:1.1 }
.brand-name { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700; color:var(--white) }
.brand-name em { color:var(--gold-light); font-style:italic }
.brand-sub { font-size:0.65rem; color:rgba(255,255,255,0.5); letter-spacing:0.08em; text-transform:uppercase }
.auth-left-body { flex:1; display:flex; flex-direction:column; justify-content:center }
.auth-left-title { font-family:'Cormorant Garamond',serif; font-size:2.6rem; font-weight:700; color:var(--white); line-height:1.1; margin-bottom:18px }
.auth-left-title em { color:var(--gold-light); font-style:italic }
.auth-left-body > p { font-size:0.92rem; color:rgba(255,255,255,0.65); line-height:1.8; margin-bottom:28px }
.auth-features { display:flex; flex-direction:column; gap:10px }
.auth-feat { font-size:0.86rem; color:rgba(255,255,255,0.75); display:flex; gap:8px; align-items:center }
.feat-dot { color:var(--gold-light); font-size:0.6rem }
.auth-deco { position:absolute; bottom:-20px; right:-20px; font-size:10rem; opacity:0.06; pointer-events:none }
.auth-right { padding:48px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--ivory); overflow-y:auto }
.auth-form-wrap { width:100%; max-width:400px }
.auth-form-title { font-family:'Cormorant Garamond',serif; font-size:2.2rem; font-weight:700; color:var(--green-deep); margin-bottom:6px }
.auth-form-sub { font-size:0.9rem; color:var(--text-light); margin-bottom:32px }
.auth-form { display:flex; flex-direction:column; gap:16px }
.pass-wrap { position:relative }
.pass-wrap input { padding-right:44px; width:100% }
.pass-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:1rem }
.auth-remember { display:flex; justify-content:space-between; align-items:center }
.check-wrap { display:flex; align-items:center; gap:7px; font-size:0.84rem; color:var(--text-mid); cursor:pointer }
.check-wrap input { accent-color:var(--green-deep) }
.forgot-link { font-size:0.84rem; color:var(--green-light); text-decoration:none }
.forgot-link:hover { text-decoration:underline }
.auth-divider { text-align:center; position:relative; font-size:0.8rem; color:var(--text-light) }
.auth-divider::before,.auth-divider::after { content:''; position:absolute; top:50%; width:calc(50% - 20px); height:1px; background:var(--border) }
.auth-divider::before { left:0 } .auth-divider::after { right:0 }
.auth-switch { text-align:center; font-size:0.87rem; color:var(--text-mid); margin-top:24px }
.auth-link { color:var(--green-deep); font-weight:600; text-decoration:none }
.auth-link:hover { text-decoration:underline }
.auth-footer-note { font-size:0.72rem; color:var(--text-light); font-style:italic; text-align:center; margin-top:28px; max-width:360px }
@media(max-width:800px) { .auth-split { grid-template-columns:1fr } .auth-left { display:none } .auth-right { padding:32px 24px } }
</style>
