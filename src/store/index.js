import { reactive } from 'vue'

export const store = reactive({
  user: null,
  isLoggedIn: false,

  login(userData) { this.user = userData; this.isLoggedIn = true },
  logout()        { this.user = null;     this.isLoggedIn = false },
  register(userData) { this.user = { ...userData, id: Date.now() }; this.isLoggedIn = true },

  products: [
    { id:1,  name:'Coir Planting Pot',       cat:'Gardening',    tag:'new',        emoji:'🪴', price:149,  oldPrice:null, badge:'new',  desc:'Biodegradable coir seedling pots. Improves root growth and decomposes naturally in soil. Set of 10.',    img:'https://cdn.shopify.com/s/files/1/0707/9434/6746/files/coir_pots_2.png?v=1754557892' },
    { id:2,  name:'Coir Fiber Rope',          cat:'Construction', tag:'trending',   emoji:'🪢', price:320,  oldPrice:399,  badge:'hot',  desc:'Heavy-duty twisted coir rope for scaffolding, marine, and traditional construction. 10m roll.',           img:'https://thumbs.dreamstime.com/b/rope-fiber-coir-coconut-shell-old-wooden-table-rope-fiber-coir-coconut-shell-old-wooden-table-116335443.jpg' },
    { id:3,  name:'Woven Coir Door Mat',      cat:'Home & Décor', tag:'bestseller', emoji:'🚪', price:450,  oldPrice:580,  badge:'hot',  desc:'Natural woven coir mat. Highly durable, weather-resistant. Adds rustic charm to any entryway.',           img:'https://m.media-amazon.com/images/I/71Vi5fO9sbL._AC_UF894,1000_QL80_.jpg' },
    { id:4,  name:'Erosion Control Blanket',  cat:'Erosion',      tag:'new',        emoji:'🌊', price:890,  oldPrice:null, badge:'new',  desc:'Coir geotextile blanket for slope stabilization, riverbank protection, and land rehabilitation.',          img:'https://bonterraerosion.com/wp-content/uploads/2022/12/Erosion-control-blankets.jpg' },
    { id:5,  name:'Coco Peat Block 5kg',      cat:'Agriculture',  tag:'bestseller', emoji:'🟫', price:220,  oldPrice:null, badge:null,   desc:'Compressed coir pith. Expands to rich growing medium. Ideal for hydroponics and soil amendment.',           img:'https://www.overseasexim.com/images/products/coco-peat.jpg' },
    { id:6,  name:'Coir Wall Panel',          cat:'Home & Décor', tag:'new',        emoji:'🪵', price:780,  oldPrice:950,  badge:'sale', desc:'Eco-decorative woven coir fiber panels. Natural texture for interiors and feature walls. Per sqm.',          img:'https://sc04.alicdn.com/kf/H6df58fc53985400391b0c16792ecb31ft.jpg' },
    { id:7,  name:'Coir Landscape Fabric',    cat:'Erosion',      tag:'trending',   emoji:'🏞️', price:650,  oldPrice:null, badge:null,   desc:'Heavy-duty coir weed barrier. Suppresses weeds while allowing water and nutrients to pass through.',         img:'https://s.alicdn.com/@sc04/kf/H44c18a1938b94d9b8caf7d8e05a7eeabC/Coir-Geo-Textile-for-Erosion-Control-Gardening-and-Soil-Conditioning-Natural-Woven-Coconut-Fiber-Mat-Coco-Mats.jpg' },
    { id:8,  name:'Woven Coir Basket Set',    cat:'Home & Décor', tag:'trending', emoji:'🧺', price:520,  oldPrice:640,  badge:'hot',  desc:'Handwoven coir storage baskets. Set of 3 nesting sizes. Perfect for home organization and décor.',           img:'https://m.media-amazon.com/images/I/814wJhZwxWL.AC_UF894,1000_QL80.jpg' },
    { id:9,  name:'Coir Seedling Tray',       cat:'Gardening',    tag:'new',        emoji:'🌿', price:195,  oldPrice:null, badge:'new',  desc:'Biodegradable 72-cell coir seedling tray. Promotes healthy root development for transplanting.',              img:'https://growrichindia.in/images/seedling_tray2.jpg' },
    { id:10, name:'Coir Animal Bedding',      cat:'Agriculture',  tag:'trending',   emoji:'🐾', price:340,  oldPrice:null, badge:null,   desc:'Soft, absorbent, odor-resistant coir fiber bedding for livestock and small animals. 10L bag.',               img:'https://www.cocopeatpro.com/img/customer-segments/animal-bedding.jpg' },
    { id:11, name:'Coir Geogrid Roll',        cat:'Construction', tag:'new',        emoji:'🛣️', price:1200, oldPrice:null, badge:'new',  desc:'High-strength coir geogrid for road base reinforcement and retaining wall applications. 2m × 10m roll.',    img:'https://www.merzconstruction.co.nz/wp-content/uploads/2019/05/coir_geocell.jpg' },
    { id:12, name:'Handcrafted Coir Coaster', cat:'Home & Décor', tag:'bestseller', emoji:'🎨', price:120,  oldPrice:null, badge:null,   desc:'Artisan hand-woven coir coasters. Set of 6. Natural, heat-resistant, and uniquely Philippine-crafted.',      img:'https://s.alicdn.com/@sc04/kf/H129595bf6f2c4eb1b41e06d4d7c532818/Handmade-Coconut-Brown-Tea-Mat-Coffee-Table-Home-Office-Round-Coconut-Fiber-Coir-Coasters-for-Drinks.jpg' },
  ],

  cartItems: [],

  get cartCount()    { return this.cartItems.reduce((s,i) => s + i.qty, 0) },
  get cartSubtotal() { return this.cartItems.reduce((s,i) => s + i.price * i.qty, 0) },

  addToCart(product) {
    const ex = this.cartItems.find(i => i.id === product.id)
    if (ex) ex.qty++
    else this.cartItems.push({ id:product.id, name:product.name, price:product.price, qty:1, emoji:product.emoji })
  },
  removeFromCart(id) {
    const idx = this.cartItems.findIndex(i => i.id === id)
    if (idx !== -1) this.cartItems.splice(idx, 1)
  },
  updateQty(id, delta) {
    const item = this.cartItems.find(i => i.id === id)
    if (item) { item.qty += delta; if (item.qty <= 0) this.removeFromCart(id) }
  },
  clearCart() { this.cartItems = [] },

  transactions: [
    { id:'NC-20240301', date:'March 1, 2025',     items:['Coir Door Mat x1','Coco Peat Block x2'],          total:890,  status:'Delivered',  method:'GCash',          mode:'Delivery' },
    { id:'NC-20240215', date:'February 15, 2025', items:['Coir Fiber Rope x1'],                              total:320,  status:'Delivered',  method:'Cash on Delivery',mode:'Delivery' },
    { id:'NC-20240120', date:'January 20, 2025',  items:['Coir Basket Set x1','Coaster Set x2'],             total:760,  status:'Delivered',  method:'Maya',           mode:'Pickup' },
    { id:'NC-20241210', date:'December 10, 2024', items:['Erosion Blanket x1'],                              total:890,  status:'Cancelled',  method:'GCash',          mode:'Delivery' },
    { id:'NC-20241105', date:'November 5, 2024',  items:['Coir Wall Panel x2','Landscape Fabric x1'],        total:2210, status:'Delivered',  method:'Bank Transfer',  mode:'Pickup' },
  ],
})
