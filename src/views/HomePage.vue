<template>
  <div class="page-wrap">
    <AppNavbar />
    <main class="page-main">

      <!-- HERO -->
      <section class="home-hero">
        <div class="hero-bg-mesh"></div>
        <div class="container hero-inner">
          <div class="hero-content fade-up">
            <p class="hero-eyebrow">Philippine Coconut Coir Industry</p>
            <h1 class="hero-title">Nature's Fiber,<br/><em>Crafted for Life</em></h1>
            <p class="hero-sub">Eco-friendly products made from coconut coir — the natural fiber from Philippine coconut husks. Serving construction, gardening, home décor, and beyond.</p>
            <div class="hero-cta">
              <RouterLink to="/storefront" class="btn btn-primary btn-lg">Shop Now →</RouterLink>
              <RouterLink to="/products"   class="btn btn-secondary btn-lg">View All Products</RouterLink>
            </div>
            <div class="hero-badges">
              <span class="hero-badge">🌿 100% Organic</span>
              <span class="hero-badge">♻️ Biodegradable</span>
              <span class="hero-badge">🇵🇭 Philippine-Made</span>
            </div>
          </div>

          <!-- COCONUT IMAGE VISUAL -->
          <div class="hero-visual fade-up-2">
            <div class="hero-img-scene">
              <div class="img-glow"></div>
              <img src="../assets/coconut-hero.png" alt="Coconut Coir" class="coco-img" />
              <div class="floating-tag tag-a">Biodegradable ✓</div>
              <div class="floating-tag tag-b">Eco-Certified ✓</div>
              <div class="floating-tag tag-c">Philippine-Made ✓</div>
            </div>
          </div>
        </div>
      </section>

      <!-- WHAT IS COIR -->
      <section class="coir-intro">
        <div class="container">
          <div class="coir-intro-inner">
            <div class="coir-intro-text fade-up">
              <span class="section-tag">About Our Material</span>
              <h2 class="section-title">What is Coconut Coir?</h2>
              <p>Coconut coir is the natural fiber found between the hard internal shell and the outer coat of the coconut. In the Philippines, this once-discarded material is being transformed into a <strong>thriving eco-industry</strong> — with applications spanning construction, gardening, home décor, erosion control, and much more.</p>
              <p style="margin-top:12px">As a soon-to-be successful industry, Niyog &amp; Coir is at the forefront — bridging local artisanship with modern sustainable design.</p>
              <RouterLink to="/storefront" class="btn btn-primary" style="margin-top:24px;display:inline-flex">Explore Products →</RouterLink>
            </div>
            <div class="coir-facts-grid fade-up-2">
              <div class="coir-fact" v-for="f in facts" :key="f.title">
                <div class="fact-icon-wrap">{{ f.icon }}</div>
                <div><h4>{{ f.title }}</h4><p>{{ f.desc }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- USE CASES -->
      <section class="use-cases-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Versatile Applications</span>
            <h2 class="section-title">Where Coir Makes a Difference</h2>
            <p class="section-sub">From farm to architecture — coconut coir serves every industry sustainably.</p>
          </div>
          <div class="use-cases-grid">
            <div class="use-card" v-for="u in useCases" :key="u.title">
              <div class="uc-icon">{{ u.icon }}</div>
              <h3>{{ u.title }}</h3>
              <p>{{ u.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- WHY US -->
      <section class="why-section">
        <div class="container">
          <div class="why-inner">
            <div class="why-text">
              <span class="section-tag" style="color:var(--gold-light)">Why Niyog &amp; Coir</span>
              <h2 class="section-title" style="color:var(--white)">Rooted in Nature,<br/><em style="color:var(--gold-light)">Built for Tomorrow</em></h2>
              <p style="color:rgba(255,255,255,0.65);line-height:1.8">We source directly from Philippine coconut farmers, ensuring fair trade and the freshest natural fiber in every product.</p>
              <RouterLink to="/register" class="btn btn-gold" style="margin-top:24px;display:inline-flex">Join Our Community</RouterLink>
            </div>
            <div class="why-cards">
              <div class="why-card" v-for="w in whyUs" :key="w.title">
                <div class="why-icon">{{ w.icon }}</div>
                <h4>{{ w.title }}</h4>
                <p>{{ w.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-banner">
        <div class="container cta-inner">
          <div>
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:var(--green-deep)">Ready to go green?</h2>
            <p style="color:var(--text-mid);margin-top:8px">Browse all 30+ coconut coir products we carry.</p>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <RouterLink to="/storefront" class="btn btn-primary btn-lg">Visit Storefront</RouterLink>
            <RouterLink to="/register"   class="btn btn-secondary btn-lg">Create Account</RouterLink>
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

const facts = [
  { icon:'🌱', title:'Naturally Renewable',  desc:'Sourced from coconut husks — a byproduct that would otherwise be discarded.' },
  { icon:'♻️', title:'100% Biodegradable',   desc:'Returns safely to earth. No microplastics, no toxic residue — just pure fiber.' },
  { icon:'💪', title:'Remarkably Durable',   desc:'Resistant to saltwater, rot, and wear. Outlasts synthetic alternatives outdoors.' },
  { icon:'🇵🇭', title:'Locally Sourced',     desc:'Supporting Filipino farmers and artisans in every product we create and sell.' },
]
const useCases = [
  { icon:'🏗️', title:'Construction',     desc:'Coir ropes, boards, and insulation panels for eco-building and scaffolding.' },
  { icon:'🌱', title:'Gardening',         desc:'Coir pots, grow bags, and peat blocks for seedlings and container gardening.' },
  { icon:'🌊', title:'Erosion Control',   desc:'Geotextile blankets that stabilize slopes and protect riverbanks.' },
  { icon:'🏠', title:'Home & Décor',      desc:'Door mats, wall panels, and woven baskets for natural home aesthetics.' },
  { icon:'🌾', title:'Agriculture',       desc:'Coco peat improves soil structure and water retention for better harvests.' },
  { icon:'🛣️', title:'Road Engineering', desc:'Coir geogrid reinforces soft soils in road construction projects.' },
]
const whyUs = [
  { icon:'🚚', title:'Free Shipping',  desc:'Free nationwide delivery on orders over ₱1,500.' },
  { icon:'🌿', title:'Fully Organic',  desc:'Zero synthetic additives in every product.' },
  { icon:'🔒', title:'Secure Payment', desc:'GCash, Maya, Bank Transfer, Cash on Delivery.' },
  { icon:'🕐', title:'24/7 Support',   desc:'Always here to help with your orders.' },
]
</script>

<style scoped>
.home-hero { position:relative; overflow:hidden; padding:100px 0 80px; min-height:90vh; display:flex; align-items:center }
.hero-bg-mesh { position:absolute; inset:0; z-index:0; background:radial-gradient(ellipse 60% 70% at 80% 50%,rgba(74,128,96,0.12) 0%,transparent 60%),radial-gradient(ellipse 40% 50% at 10% 80%,rgba(184,146,42,0.08) 0%,transparent 60%) }
.hero-inner { display:grid; grid-template-columns:1fr 460px; gap:60px; align-items:center; position:relative; z-index:1 }
.hero-eyebrow { font-size:0.76rem; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:var(--green-light); margin-bottom:14px; display:flex; align-items:center; gap:10px }
.hero-eyebrow::before { content:''; display:inline-block; width:28px; height:2px; background:var(--green-light) }
.hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.8rem,5vw,4.4rem); font-weight:700; color:var(--green-deep); line-height:1.05; margin-bottom:20px }
.hero-title em { color:var(--gold); font-style:italic }
.hero-sub { font-size:1rem; color:var(--text-mid); line-height:1.78; max-width:500px; margin-bottom:32px }
.hero-cta { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:32px }
.hero-badges { display:flex; gap:10px; flex-wrap:wrap }
.hero-badge { background:var(--white); color:var(--green-deep); font-size:0.78rem; font-weight:600; padding:6px 14px; border-radius:var(--radius-pill); border:1.5px solid var(--border); box-shadow:var(--shadow-xs) }

/* COCONUT IMAGE SCENE */
.hero-visual { display:flex; justify-content:center; align-items:center }
.hero-img-scene { position:relative; width:460px; height:460px; display:flex; align-items:center; justify-content:center; flex-shrink:0 }
.img-glow {
  position:absolute; inset:-20px; border-radius:50%;
  background:radial-gradient(ellipse at 50% 60%, rgba(77,128,96,0.22) 0%, rgba(184,146,42,0.07) 50%, transparent 70%);
  animation:glowPulse 4s ease-in-out infinite;
}
.coco-img {
  position:relative; z-index:2;
  width:100%; height:100%; object-fit:contain;
  animation:cocoFloat 5s ease-in-out infinite;
  filter:drop-shadow(0 28px 52px rgba(27,61,43,0.4)) drop-shadow(0 8px 16px rgba(27,61,43,0.2));
}
.floating-tag { position:absolute; background:var(--white); color:var(--green-deep); font-size:0.75rem; font-weight:600; padding:7px 15px; border-radius:var(--radius-pill); box-shadow:var(--shadow-md); white-space:nowrap; border:1px solid var(--border); z-index:5 }
.tag-a { top:52px;   left:0px;   animation:float 3.5s ease-in-out infinite }
.tag-b { top:44%;   right:-8px; animation:float 3.5s 1.2s ease-in-out infinite }
.tag-c { bottom:52px; left:16px; animation:float 3.5s 2.3s ease-in-out infinite }

@keyframes cocoFloat {
  0%,100% { transform:translateY(0px) rotate(-1deg); }
  50%      { transform:translateY(-16px) rotate(1deg); }
}
@keyframes glowPulse {
  0%,100% { opacity:0.7; transform:scale(1); }
  50%      { opacity:1;   transform:scale(1.06); }
}

/* COIR INTRO */
.coir-intro { padding:100px 0; background:var(--white) }
.coir-intro-inner { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center }
.coir-intro-text p { font-size:0.97rem; color:var(--text-mid); line-height:1.8 }
.coir-facts-grid { display:flex; flex-direction:column; gap:16px }
.coir-fact { display:flex; align-items:flex-start; gap:14px; padding:18px 20px; border-radius:var(--radius-md); background:var(--ivory); border:1px solid var(--border); transition:var(--transition) }
.coir-fact:hover { border-color:var(--green-light); box-shadow:var(--shadow-xs) }
.fact-icon-wrap { font-size:1.5rem; flex-shrink:0 }
.coir-fact h4 { font-size:0.9rem; font-weight:600; color:var(--green-deep); margin-bottom:4px }
.coir-fact p { font-size:0.82rem; color:var(--text-light); line-height:1.6 }

/* USE CASES */
.use-cases-section { padding:100px 0; background:var(--ivory) }
.use-cases-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px }
.use-card { background:var(--white); border-radius:var(--radius-md); padding:32px 26px; border:1px solid var(--border); transition:var(--transition); text-align:center }
.use-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-sm); border-color:rgba(27,61,43,0.2) }
.uc-icon { font-size:2.4rem; margin-bottom:14px }
.use-card h3 { font-family:'Cormorant Garamond',serif; font-size:1.1rem; font-weight:700; color:var(--green-deep); margin-bottom:8px }
.use-card p { font-size:0.83rem; color:var(--text-light); line-height:1.65 }

/* WHY */
.why-section { padding:100px 0; background:var(--green-deep) }
.why-inner { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center }
.why-cards { display:grid; grid-template-columns:1fr 1fr; gap:16px }
.why-card { background:rgba(255,255,255,0.06); border-radius:var(--radius-md); padding:22px; border:1px solid rgba(255,255,255,0.08) }
.why-icon { font-size:1.6rem; margin-bottom:10px }
.why-card h4 { font-size:0.9rem; font-weight:600; color:var(--white); margin-bottom:6px }
.why-card p { font-size:0.8rem; color:rgba(255,255,255,0.58); line-height:1.6 }

/* CTA */
.cta-banner { padding:72px 0; background:var(--ivory-dark); border-top:1px solid var(--border) }
.cta-inner { display:flex; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap }

@media(max-width:960px) {
  .hero-inner { grid-template-columns:1fr; text-align:center }
  .hero-sub { margin:0 auto 32px }
  .hero-cta,.hero-badges { justify-content:center }
  .hero-visual { display:none }
  .coir-intro-inner { grid-template-columns:1fr }
  .use-cases-grid { grid-template-columns:1fr 1fr }
  .why-inner { grid-template-columns:1fr }
  .cta-inner { flex-direction:column; text-align:center }
}
@media(max-width:600px) {
  .use-cases-grid { grid-template-columns:1fr }
  .why-cards { grid-template-columns:1fr }
}
</style>
