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
          <h2 class="auth-left-title">Join the<br/><em>Eco Movement</em></h2>
          <p>Create your account and become part of a community that champions sustainable living with Philippine coconut coir products.</p>
          <div class="auth-features">
            <div class="auth-feat" v-for="f in features" :key="f"><span class="feat-dot">●</span> {{ f }}</div>
          </div>
        </div>
        <div class="auth-deco">🥥</div>
      </div>

      <!-- RIGHT PANEL -->
      <div class="auth-right">
        <div class="auth-form-wrap">
          <h1 class="auth-form-title">Create Account</h1>
          <p class="auth-form-sub">Fill in the details below to get started</p>

          <div class="auth-form">
            <!-- COMPLETE NAME -->
            <div class="form-group">
              <label>Complete Name <span class="req">*</span></label>
              <input v-model="form.name" type="text" placeholder="Juan dela Cruz"/>
              <span class="form-error" v-if="errors.name">{{ errors.name }}</span>
            </div>
            <!-- EMAIL -->
            <div class="form-group">
              <label>Email Address <span class="req">*</span></label>
              <input v-model="form.email" type="email" placeholder="juan@email.com"/>
              <span class="form-error" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <!-- MOBILE -->
            <div class="form-group">
              <label>Mobile Number <span class="req">*</span></label>
              <input v-model="form.mobile" type="tel" placeholder="+63 9XX XXX XXXX"/>
              <span class="form-error" v-if="errors.mobile">{{ errors.mobile }}</span>
            </div>
            <!-- ADDRESS -->
            <div class="form-group">
              <label>Complete Address <span class="req">*</span></label>
              <input v-model="form.address" type="text" placeholder="House No., Street, Barangay, City, Province"/>
              <span class="form-error" v-if="errors.address">{{ errors.address }}</span>
            </div>
            <!-- PASSWORD -->
            <div class="form-group">
              <label>Password <span class="req">*</span></label>
              <div class="pass-wrap">
                <input v-model="form.password" :type="showPass?'text':'password'" placeholder="Minimum 8 characters"/>
                <button class="pass-toggle" @click="showPass=!showPass">{{ showPass?'🙈':'👁️' }}</button>
              </div>
              <div class="pass-strength" v-if="form.password">
                <div class="pass-bar"><div class="pass-fill" :style="{width:strength.pct+'%',background:strength.color}"></div></div>
                <span :style="{color:strength.color,fontSize:'0.76rem'}">{{ strength.label }}</span>
              </div>
              <span class="form-error" v-if="errors.password">{{ errors.password }}</span>
            </div>
            <!-- CONFIRM PASSWORD -->
            <div class="form-group">
              <label>Confirm Password <span class="req">*</span></label>
              <div class="pass-wrap">
                <input v-model="form.confirm" :type="showConfirm?'text':'password'" placeholder="Re-enter your password"/>
                <button class="pass-toggle" @click="showConfirm=!showConfirm">{{ showConfirm?'🙈':'👁️' }}</button>
              </div>
              <span class="form-error" v-if="errors.confirm">{{ errors.confirm }}</span>
            </div>
            <!-- TERMS -->
            <label class="terms-wrap">
              <input type="checkbox" v-model="agreed"/>
              <span>I agree to the <a href="#" class="auth-link">Terms of Service</a> and <a href="#" class="auth-link">Privacy Policy</a></span>
            </label>
            <span class="form-error" v-if="errors.terms">{{ errors.terms }}</span>
            <button class="btn btn-primary btn-full" @click="register">Create Account →</button>
          </div>

          <p class="auth-switch">Already have an account? <RouterLink to="/login" class="auth-link">Log In</RouterLink></p>
        </div>
        <p class="auth-footer-note">For educational purposes only, and no copyright infringement is intended.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store/index.js'

const router = useRouter()
const form = reactive({ name:'', email:'', mobile:'', address:'', password:'', confirm:'' })
const errors = reactive({ name:'', email:'', mobile:'', address:'', password:'', confirm:'', terms:'' })
const showPass = ref(false); const showConfirm = ref(false); const agreed = ref(false)

const features = [
  'Free shipping on orders over ₱1,500',
  'Early access to new coir products',
  'Member-only discounts & promos',
  'Order tracking & transaction history',
]

const strength = computed(() => {
  const p = form.password; if (!p) return { pct:0, color:'#ccc', label:'' }
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return [
    { pct:10, color:'#e74c3c', label:'Too weak' },
    { pct:25, color:'#e74c3c', label:'Weak' },
    { pct:50, color:'#e67e22', label:'Fair' },
    { pct:75, color:'#f1c40f', label:'Good' },
    { pct:100, color:'#27ae60', label:'Strong' },
  ][Math.min(s, 4)]
})

function validate() {
  let ok = true; Object.keys(errors).forEach(k => errors[k]='')
  if (!form.name.trim())   { errors.name    = 'Full name is required.'; ok = false }
  if (!form.email)         { errors.email   = 'Email is required.'; ok = false }
  else if (!/\S+@\S+\.\S+/.test(form.email)) { errors.email = 'Enter a valid email address.'; ok = false }
  if (!form.mobile)        { errors.mobile  = 'Mobile number is required.'; ok = false }
  if (!form.address.trim()){ errors.address = 'Address is required.'; ok = false }
  if (!form.password)      { errors.password = 'Password is required.'; ok = false }
  else if (form.password.length < 8) { errors.password = 'Password must be at least 8 characters.'; ok = false }
  if (!form.confirm)       { errors.confirm = 'Please confirm your password.'; ok = false }
  else if (form.password !== form.confirm) { errors.confirm = 'Passwords do not match.'; ok = false }
  if (!agreed.value)       { errors.terms   = 'You must agree to the terms.'; ok = false }
  return ok
}
function register() {
  if (!validate()) return
  store.register({ name:form.name, email:form.email, mobile:form.mobile, address:form.address, joinDate:new Date().toLocaleDateString('en-US',{year:'numeric',month:'long'}) })
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
.auth-right { padding:48px; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; background:var(--ivory); overflow-y:auto; padding-top:48px }
.auth-form-wrap { width:100%; max-width:400px }
.auth-form-title { font-family:'Cormorant Garamond',serif; font-size:2.2rem; font-weight:700; color:var(--green-deep); margin-bottom:6px }
.auth-form-sub { font-size:0.9rem; color:var(--text-light); margin-bottom:32px }
.auth-form { display:flex; flex-direction:column; gap:4px }
.req { color:#c0392b; font-size:0.85em }
.pass-wrap { position:relative }
.pass-wrap input { padding-right:44px; width:100% }
.pass-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:1rem }
.pass-strength { margin-top:7px }
.pass-bar { height:4px; background:var(--border); border-radius:2px; overflow:hidden; margin-bottom:4px }
.pass-fill { height:100%; border-radius:2px; transition:all 0.3s }
.terms-wrap { display:flex; align-items:flex-start; gap:9px; font-size:0.84rem; color:var(--text-mid); cursor:pointer; line-height:1.5; margin-top:8px }
.terms-wrap input { accent-color:var(--green-deep); margin-top:2px; flex-shrink:0 }
.auth-switch { text-align:center; font-size:0.87rem; color:var(--text-mid); margin-top:24px }
.auth-link { color:var(--green-deep); font-weight:600; text-decoration:none }
.auth-link:hover { text-decoration:underline }
.auth-footer-note { font-size:0.72rem; color:var(--text-light); font-style:italic; text-align:center; margin-top:28px; max-width:360px }
@media(max-width:800px) { .auth-split { grid-template-columns:1fr } .auth-left { display:none } .auth-right { padding:32px 24px } }
</style>
