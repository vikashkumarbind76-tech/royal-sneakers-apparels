const STORAGE_KEYS = {
  PRODUCTS: "rsa_products_v1",
  CART: "rsa_cart_v1",
  ORDERS: "rsa_orders_v1",
  ADMIN_SESSION: "rsa_admin_session_v1"
};

const REMOTE_MODEL_FALLBACK_URL = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?auto=format&fit=crop&w=1200&q=80"
];

const catalogProducts = [
  {
    id: "nike_air_force_1_triple_white",
    name: "Nike Air Force 1 Low \"Triple White\"",
    price: 110,
    category: "Sneakers",
    brand: "Nike",
    image: "https://images.openai.com/static-rsc-4/e02PpCK3Qtfp8wy7BZTB1I-qz-EeCGsdSFAx9eNb14ToNoySMah90vDZrt_tJFD0scdFxc9_JGMou9TutWULZj1o-GA_WPqs9nvIscRtqOikzdfUMH774ezfE7I3ZKBfPXympdoZzL090Ovhudd8YrP8kA1RjDim3uI-QAz5J0zf0AxJE5IDYKVv7nGoOi2H?purpose=fullsize",
    model3D: "models/nike-air-force-1-triple-white.glb",
    desc: "Classic all-white sneaker with premium leather upper and Air cushioning. Everyday essential.",
    trending: true
  },
  {
    id: "nike_air_force_1_mint_green",
    name: "Nike Air Force 1 \"Mint Green\"",
    price: 120,
    category: "Sneakers",
    brand: "Nike",
    image: "https://images.openai.com/static-rsc-4/swviS6XALbmy6PM7Di4T5kBYEKYW8d2xkuexfnohQmf9TCI-KSTAa9_JZeNldtauVjy0Qsmr3dbgc78HalM4K4bYckUrYvMt2yGrnx-E7GPq4WAUECYDz-6sfamhqFa69TCxJth6ypVDUlBtjQJQx_bFmg0AP_NVmL44OSBUCVw?purpose=inline",
    model3D: "models/nike-air-force-1-mint-green.glb",
    desc: "Fresh mint colorway with breathable perforations and durable sole.",
    trending: true
  },
  {
    id: "air_jordan_1_mid_black_red",
    name: "Air Jordan 1 Mid \"Black Red\"",
    price: 135,
    category: "Sneakers",
    brand: "Jordan",
    image: "https://images.openai.com/static-rsc-4/KhjXYzqkXhMgOhMXABaUJmnMSuwnqG9nttYhUgPLyWky5wV0mCw36Jgu3hutxkXVQ7vRwsN9h2QOQKG4m9xl_IwdSRV5cVKQ_niTS8-TqC_qfPKgPpldGVFG08Wd86G3tt5muSXhH0wkc-lhYVHenHqA_RT8UclWbBUx4vXjt80?purpose=inline",
    model3D: "models/air-jordan-1-mid-black-red.glb",
    desc: "Iconic Jordan silhouette with bold red overlays and premium leather.",
    trending: true
  },
  {
    id: "air_jordan_1_low_brown_white",
    name: "Air Jordan 1 Low \"Brown White\"",
    price: 120,
    category: "Sneakers",
    brand: "Jordan",
    image: "https://images.openai.com/static-rsc-4/RZaqEa5Rr60ikUNWGjUacRjbL7XkWSORHKh9KJ_BP5JLCalcO06k-VBTfrwGs3Tv4Ud61IEikC0ILOtlmsACENgTxaQu_0hN17I_BOcF6fsTnd_KOuX6BgOxOIi4FzVWzi11zcjg0GIY3-SNwE0itbbC7_gA_Zt20Ox-s9Amud0?purpose=inline",
    model3D: "models/air-jordan-1-low-brown-white.glb",
    desc: "Clean neutral tones designed for modern streetwear outfits.",
    trending: false
  },
  {
    id: "air_jordan_4_military_blue",
    name: "Air Jordan 4 \"Military Blue\"",
    price: 210,
    category: "Sneakers",
    brand: "Jordan",
    image: "https://images.openai.com/static-rsc-4/gJbBX2sdu0_OqY5SPrpVLti2xL49449MeubzVnOGRH2TPD8skjgOPA-bdSi4UV5_k57YQLluf8QpQln4AeWxyqfdW978G5STlM0rWv63_nSQhsJjNoRlo9WSkuOYc4yD2dClK3nUSUn0-HG9q4Cglzoi8olO9DD4GgbAb_kxUkk?purpose=inline",
    model3D: "models/air-jordan-4-military-blue.glb",
    desc: "Premium retro sneaker with mesh panels and visible Air cushioning.",
    trending: true
  },
  {
    id: "air_jordan_4_black_red",
    name: "Air Jordan 4 \"Black Red\"",
    price: 200,
    category: "Sneakers",
    brand: "Jordan",
    image: "https://images.openai.com/static-rsc-4/vElUdqWRKLNHiJejOG312avOW-OLsWUwxHwJPlgwBeXV21rtRTjWgpUxUY71KOaWvmfl4ag0rqWLVeLd2ktAb1Zva1LLDwvXFGEjontUG0ySey0Ha5icljd4SqCuniHdq4Of4QxKmHd6wW2uWi-dAPsZSYe9QtBw2TcPZqAa700?purpose=inline",
    model3D: "models/air-jordan-4-black-red.glb",
    desc: "Bold street-style sneaker with durable structure and comfort.",
    trending: true
  },
  {
    id: "nike_dunk_low_yellow_red",
    name: "Nike Dunk Low \"Yellow Red\"",
    price: 120,
    category: "Sneakers",
    brand: "Nike",
    image: "https://images.openai.com/static-rsc-4/i9Wu8dXUgAnbAl-BHLI2R9sNuHygnmFjrg_n1_eEgayHEDHN-mWuzXuFq2nQ0zUSFXkuXOhj6YWyaXCOrtWK6y8nHTeKCr2qV2qw_jZkxCgD8K47SNTxsJvE7S5NK9K-yX6PaN7ABvctLi0mVQdSxwZkLR4fmWEtHdeSSnmOgGg?purpose=inline",
    model3D: "models/nike-dunk-low-yellow-red.glb",
    desc: "Vibrant color-block sneaker for casual and skate style.",
    trending: true
  },
  {
    id: "nike_dunk_low_pastel_multi",
    name: "Nike Dunk Low \"Pastel Multi\"",
    price: 130,
    category: "Sneakers",
    brand: "Nike",
    image: "https://images.openai.com/static-rsc-4/spHUKvKl7VW9pmzAginx-6gy1o2CL_JCq97mtMxfUpSOmlmbqv1K4Yo8ljraGZ0QWjzSstoh4vazqu2DqDZvw4W3dTzBKbBvsrKZzG1-SnJJTAexBZZ491M6poYQxY-5nBe6_HBAcDKIWCUoCy-S4vBCndbZeNpCYYjND62dqFU?purpose=inline",
    model3D: "models/nike-dunk-low-pastel-multi.glb",
    desc: "Multi-color pastel sneaker trending in fashion culture.",
    trending: true
  },
  {
    id: "new_balance_550_pink_white",
    name: "New Balance 550 \"Pink White\"",
    price: 120,
    category: "Sneakers",
    brand: "New Balance",
    image: "https://images.openai.com/static-rsc-4/105HDVF-SamCpoJlX1V2ZKV6f7jFolz6Xy_HTKk2o3yxBU1naE6fzqEHnfcJNstMtTapq5hsNMq9GAaJQKIQKF2P3lomuCB7fpIDxUAdu6Fysf881Zb4LAVFBx2-Ch7dVrpxYOtyjQTxbDidcv0XPYMn0ch3jy4U9qV5t_UrkP8?purpose=inline",
    model3D: "models/new-balance-550-pink-white.glb",
    desc: "Retro-inspired sneaker with soft tones and everyday comfort.",
    trending: false
  },
  {
    id: "new_balance_550_beige",
    name: "New Balance 550 \"Beige\"",
    price: 115,
    category: "Sneakers",
    brand: "New Balance",
    image: "https://images.openai.com/static-rsc-4/cQaQN7XJx03vwnb-2XrSTzNioxEAPTEYZZTh3yjjEJ6kBa9-Hh0uv1ORd4kqkFv6YtsOWZB1QmVCFMm55HDSi0oe4OGSii8YLf0Y4r05SUq_Zp429v64hLN8L9_KNm6TitMTTxz06IaTwMlhn92yLuYmT4i7dFq7phI-ccuR2yY?purpose=inline",
    model3D: "models/new-balance-550-beige.glb",
    desc: "Minimal lifestyle sneaker with premium finish.",
    trending: false
  },
  {
    id: "air_jordan_11_low_diffused_blue",
    name: "Air Jordan 11 Low \"Diffused Blue\"",
    price: 180,
    category: "Sneakers",
    brand: "Jordan",
    image: "https://images.openai.com/static-rsc-4/RFjJ9KYpYX5cOxPl4UiMXfKiTwMKushmBbJLyuoTmMcT1942NvT22rFkw0DQTUnnHCigp-NdRF5lIU-6W6k7qGkzaahg89Y9QREi7-3sPGHSlDr0z3EX4meDm7svBZWlOkK4fSl5VyGyPRErGthW_cnt9H5WTe3F-s14sZMMb_M?purpose=inline",
    model3D: "models/air-jordan-11-low-diffused-blue.glb",
    desc: "Sleek low-top sneaker with patent leather shine.",
    trending: false
  },
  {
    id: "air_jordan_12_black_grey",
    name: "Air Jordan 12 \"Black Grey\"",
    price: 190,
    category: "Sneakers",
    brand: "Jordan",
    image: "https://images.openai.com/static-rsc-4/X5VIOkT3rs2H76zbQNrJN3SI9VVJ9meqTVudXx4G88t8X9g4wbLubM9PxszLTsG4j-B72KR_un0O-8kQMDCYr-QSUZV1csq4e1FO84wBPMg9Qq9CKpHOt8tHe4dsrsbQiABm-xE4-5bm2afTBHXLdO1mmd-3nse-8-DBQN4hVYo?purpose=inline",
    model3D: "models/air-jordan-12-black-grey.glb",
    desc: "Performance sneaker with strong grip and comfort.",
    trending: false
  },
  {
    id: "air_jordan_13_white_blue",
    name: "Air Jordan 13 \"White Blue\"",
    price: 200,
    category: "Sneakers",
    brand: "Jordan",
    image: "https://images.openai.com/static-rsc-4/Tl7wJ599Rpn77upBlqmc8umkf-QsES25_wAmHsmfN1Tv8gXqqObY64V-k42rGYWFN4kpjrgz5M-qeuF4mt9Q1TUPKpfedM1CVCw8831mpwMlcb7cHNvTS0Oq1kyigWpDOPYJVkhkaU_LKpGmaoJb_28g0tdyrzZ_FYvOzNZk12k?purpose=inline",
    model3D: "models/air-jordan-13-white-blue.glb",
    desc: "Basketball sneaker with responsive cushioning and iconic design.",
    trending: false
  },
  {
    id: "kids_sneakers_pink_mini_kicks",
    name: "Kids Sneakers \"Pink Mini Kicks\"",
    price: 70,
    category: "Kids",
    brand: "Royal Kids",
    image: "https://images.openai.com/static-rsc-4/OJH8fvzBa-zmSljIjGqsx96tCCU9nFYtaEK6ty5TZTaRR7jQxeHLl-59dRkvvMSCpOKZsTQWu6Q33eajIQDatMLe9kLI1iUPiKrePOv5BbuPCeYyh2vXx7HLSbjObFTukPXLMooSUsxGeeY0SKQp3Edenk0sJIO8O033dIxmpMO2D-AxTG0YE8IZiOQ52ktS?purpose=fullsize",
    model3D: "models/kids-pink-mini-kicks.glb",
    desc: "Lightweight and comfortable sneakers for kids.",
    trending: false
  },
  {
    id: "royal_oversized_logo_hoodie",
    name: "Royal Oversized Logo Hoodie",
    price: 88,
    category: "Apparel",
    brand: "Royal",
    image: "https://images.openai.com/static-rsc-4/mHwr3hkjS-_XuFIBpxpHFyZXeYAOfXZLUCjza_oQA75j0ekiE8bbKzATuPR9NXkOzeiNBGdgZtY7J6vpRDhzgLJZzg2SfXlI_4w7ZOVFHdJKYoBrxoVg1aHkjnQg4mOyTc-UBaLyQY423VRqXtbM3av166ri4PQfuDW_6TCoo08?purpose=inline",
    model3D: "models/royal-oversized-logo-hoodie.glb",
    desc: "Heavyweight fleece hoodie with a relaxed streetwear fit.",
    trending: true
  },
  {
    id: "royal_city_graphic_tee",
    name: "Royal City Graphic Tee",
    price: 38,
    category: "Apparel",
    brand: "Royal",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    model3D: "models/royal-city-graphic-tee.glb",
    desc: "Soft cotton tee made for everyday layering.",
    trending: false
  }
];

const state = {
  products: [],
  cart: [],
  query: "",
  category: "",
  maxPrice: 250
};

const productGrid = document.getElementById("productGrid");
const trendingGrid = document.getElementById("trendingGrid");
const allProductGrid = document.getElementById("allProductGrid");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("backdrop");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const searchInput = document.getElementById("searchInput");
const searchInputMobile = document.getElementById("searchInputMobile");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const productModal = document.getElementById("productModal");
const productModalBackdrop = document.getElementById("productModalBackdrop");
const productModalBody = document.getElementById("productModalBody");
const closeProductModalBtn = document.getElementById("closeProductModalBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutModalBackdrop = document.getElementById("checkoutModalBackdrop");
const checkoutForm = document.getElementById("checkoutForm");
const closeCheckoutModalBtn = document.getElementById("closeCheckoutModalBtn");

document.getElementById("year").textContent = new Date().getFullYear();

function load(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){
    return fallback;
  }
}

function save(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function money(n){
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n) || 0);
}

function productIndexSeed(product){
  const source = String(product.id || product.name || "");
  return Array.from(source).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

// Removed isSharedDemoModel and modelPathForProduct to avoid forced/static models

function normalizeProduct3D(product){
  const fallbackImage = FALLBACK_IMAGES[productIndexSeed(product) % FALLBACK_IMAGES.length];
  const imageUrl = product.image_url || product.image || fallbackImage;
  const rawPrice = typeof product.price === "string" ? product.price.replace(/[^0-9.]/g, "") : product.price;
  const price = Number(rawPrice) || 0;
  
  // Use product's model3D or fallback to the requested remote URL
  const model3D = product.model3D || product.model3D_url || product.modelUrl || REMOTE_MODEL_FALLBACK_URL;
  
  const normalized = {
    ...product,
    price,
    price_label: money(price),
    image: imageUrl,
    image_url: imageUrl,
    model3D: model3D,
    model3D_url: model3D,
    modelUrl: model3D
  };
  return normalized;
}

function mergeCatalogProducts(existingProducts){
  const byId = new Map((Array.isArray(existingProducts) ? existingProducts : []).map(product => [product.id, normalizeProduct3D(product)]));
  catalogProducts.forEach(product => {
    const normalizedProduct = normalizeProduct3D(product);
    if(!byId.has(product.id)){
      byId.set(product.id, normalizedProduct);
      return;
    }
    const existing = byId.get(product.id);
    byId.set(product.id, normalizeProduct3D({
      ...existing,
      ...normalizedProduct,
      image: normalizedProduct.image,
      image_url: normalizedProduct.image_url,
      model3D: normalizedProduct.model3D,
      model3D_url: normalizedProduct.model3D,
      modelUrl: normalizedProduct.model3D,
      brand: normalizedProduct.brand,
      trending: typeof existing.trending === "boolean" ? existing.trending : normalizedProduct.trending
    }));
  });
  return Array.from(byId.values()).map(normalizeProduct3D);
}

function ensureSeed(){
  const products = mergeCatalogProducts(load(STORAGE_KEYS.PRODUCTS, []));
  save(STORAGE_KEYS.PRODUCTS, products);
  if(!Array.isArray(load(STORAGE_KEYS.CART, null))) save(STORAGE_KEYS.CART, []);
  if(!Array.isArray(load(STORAGE_KEYS.ORDERS, null))) save(STORAGE_KEYS.ORDERS, []);
}

function refreshState(){
  state.products = load(STORAGE_KEYS.PRODUCTS, []).map(normalizeProduct3D);
  save(STORAGE_KEYS.PRODUCTS, state.products);
  state.cart = load(STORAGE_KEYS.CART, []);
}

function setCart(nextCart){
  state.cart = nextCart;
  save(STORAGE_KEYS.CART, nextCart);
  renderCartBadge();
}

function cartQtyTotal(){
  return state.cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
}

function cartTotalPrice(){
  const productsById = Object.fromEntries(state.products.map(product => [product.id, product]));
  return state.cart.reduce((sum, item) => {
    const product = productsById[item.productId];
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function renderCartBadge(){
  cartCount.textContent = String(cartQtyTotal());
}

function addToCart(productId, qty = 1){
  const product = state.products.find(item => item.id === productId);
  if(!product) return;
  const nextCart = [...state.cart];
  const index = nextCart.findIndex(item => item.productId === productId);
  if(index >= 0){
    nextCart[index] = { ...nextCart[index], qty: nextCart[index].qty + qty };
  }else{
    nextCart.push({ productId, qty });
  }
  setCart(nextCart);
  renderCart();
  openCart();
}

function setItemQty(productId, qty){
  const nextQty = Math.max(0, Number(qty) || 0);
  const nextCart = state.cart
    .map(item => item.productId === productId ? { ...item, qty: nextQty } : item)
    .filter(item => item.qty > 0);
  setCart(nextCart);
  renderCart();
}

function updateQty(productId, delta){
  const item = state.cart.find(cartItem => cartItem.productId === productId);
  if(!item) return;
  setItemQty(productId, item.qty + delta);
}

function openCart(){
  cartDrawer.classList.add("show");
  backdrop.classList.add("show");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart(){
  cartDrawer.classList.remove("show");
  backdrop.classList.remove("show");
  backdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}



function openProductModal(productId){
  const product = state.products.find(item => item.id === productId);
  if(!product) return;
  const normalizedProduct = normalizeProduct3D(product);
  productModalBody.innerHTML = `
    <div class="modalProductMedia">
      <img class="viewerImage" src="${escapeAttr(normalizedProduct.image_url)}" alt="${escapeAttr(normalizedProduct.name)}" />
    </div>
    <div class="modalProductInfo">
      <span class="tag">${escapeHtml(normalizedProduct.brand || normalizedProduct.category)}</span>
      <h2>${escapeHtml(normalizedProduct.name)}</h2>
      <p>${escapeHtml(normalizedProduct.desc)}</p>
      <div class="modalPrice">${money(normalizedProduct.price)}</div>
      <div class="modalActions">
        <label class="qtyField">
          <span>Qty</span>
          <input id="modalQty" type="number" value="1" min="1" max="20" />
        </label>
        <button class="btn primary" id="modalAddBtn">
          <i class="fa-solid fa-cart-plus"></i>
          Add to Cart
        </button>
        <button class="btn buyNow" id="modalBuyNowBtn">
          <i class="fa-solid fa-bolt"></i>
          Buy Now
        </button>
      </div>
    </div>
  `;
  document.getElementById("modalAddBtn").addEventListener("click", () => {
    addToCart(normalizedProduct.id, Number(document.getElementById("modalQty").value) || 1);
    closeProductModal();
  });
  document.getElementById("modalBuyNowBtn").addEventListener("click", () => {
    addToCart(normalizedProduct.id, Number(document.getElementById("modalQty").value) || 1);
    closeProductModal();
    closeCart();
    openCheckoutModal();
  });
  productModal.classList.add("show");
  productModalBackdrop.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeProductModal(){
  productModal.classList.remove("show");
  productModalBackdrop.classList.remove("show");
  document.body.style.overflow = "";
}

function openCheckoutModal(){
  if(state.cart.length === 0){
    alert("Your cart is empty.");
    return;
  }
  checkoutModal.classList.add("show");
  checkoutModalBackdrop.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal(){
  checkoutModal.classList.remove("show");
  checkoutModalBackdrop.classList.remove("show");
  document.body.style.overflow = "";
}

function getFilteredProducts(){
  const query = state.query.trim().toLowerCase();
  const category = state.category.trim().toLowerCase();
  return state.products.filter(product => {
    const searchable = `${product.name} ${product.category} ${product.brand || ""} ${product.desc || ""}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = !category || String(product.category).toLowerCase() === category || String(product.brand || "").toLowerCase() === category;
    const matchesPrice = Number(product.price) <= state.maxPrice;
    return matchesQuery && matchesCategory && matchesPrice;
  });
}

function productCardHTML(product){
  const normalizedProduct = normalizeProduct3D(product);
  return `
    <article class="productCard product-card">
      <div class="productMedia">
        ${normalizedProduct.trending ? '<span class="trendTag">Trending</span>' : ""}
        <span class="tag">${escapeHtml(normalizedProduct.brand || normalizedProduct.category)}</span>
        <img class="cardProductImage product-img" src="${escapeAttr(normalizedProduct.image_url)}" alt="${escapeAttr(normalizedProduct.name)}" loading="lazy" />
      </div>
      <div class="productBody">
        <h3 class="productName">${escapeHtml(normalizedProduct.name)}</h3>
        <p class="subtext">${escapeHtml(normalizedProduct.desc || "Premium pick from Royal Sneakers & Apparels.")}</p>
        <div class="productPriceRow">
          <div class="price">${money(normalizedProduct.price)}</div>
          <div class="cardActions">
            <button class="ghostBtn" data-detail="${escapeAttr(normalizedProduct.id)}">Details</button>
            <button class="addBtn" data-add="${escapeAttr(normalizedProduct.id)}">
              <i class="fa-solid fa-plus"></i>
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function bindProductButtons(scope = document){
  scope.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => addToCart(button.getAttribute("data-add")));
  });
  scope.querySelectorAll("[data-detail]").forEach(button => {
    button.addEventListener("click", () => openProductModal(button.getAttribute("data-detail")));
  });
}

// toggle3D feature removed

function renderProducts(){
  refreshState();
  const filtered = getFilteredProducts();
  const featured = state.products.filter(product => product.trending).slice(0, 4);
  const trending = filtered.filter(product => product.trending).slice(0, 8);

  productGrid.innerHTML = featured.map(productCardHTML).join("");
  trendingGrid.innerHTML = trending.length
    ? trending.map(productCardHTML).join("")
    : `<div class="emptyResult">No trending products match your filters.</div>`;
  allProductGrid.innerHTML = filtered.length
    ? filtered.map(productCardHTML).join("")
    : `<div class="emptyResult">No products found. Try a different search or filter.</div>`;

  bindProductButtons(productGrid);
  bindProductButtons(trendingGrid);
  bindProductButtons(allProductGrid);
}

function renderCart(){
  refreshState();
  const productsById = Object.fromEntries(state.products.map(product => [product.id, product]));
  const items = state.cart.map(item => {
    const product = productsById[item.productId];
    return product ? { ...item, product, line: product.price * item.qty } : null;
  }).filter(Boolean);

  if(items.length === 0){
    cartItems.innerHTML = `<div class="empty"><strong>Your cart is empty.</strong><br/>Add a fresh pair to get started.</div>`;
  }else{
    cartItems.innerHTML = items.map(item => `
      <div class="cartItem">
        <div class="thumb"><img src="${escapeAttr(item.product.image)}" alt="${escapeAttr(item.product.name)}" /></div>
        <div>
          <h4>${escapeHtml(item.product.name)}</h4>
          <div class="meta">
            <span>${escapeHtml(item.product.brand || item.product.category)}</span>
            <strong>${money(item.line)}</strong>
          </div>
          <div class="qtyRow">
            <div class="qtyControls" aria-label="Quantity controls">
              <button aria-label="Decrease quantity" data-dec="${escapeAttr(item.productId)}">-</button>
              <input aria-label="Quantity" data-qty="${escapeAttr(item.productId)}" type="number" value="${item.qty}" min="1" max="20" />
              <button aria-label="Increase quantity" data-inc="${escapeAttr(item.productId)}">+</button>
            </div>
            <button class="removeBtn" data-rem="${escapeAttr(item.productId)}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");

    cartItems.querySelectorAll("[data-dec]").forEach(button => button.addEventListener("click", () => updateQty(button.getAttribute("data-dec"), -1)));
    cartItems.querySelectorAll("[data-inc]").forEach(button => button.addEventListener("click", () => updateQty(button.getAttribute("data-inc"), 1)));
    cartItems.querySelectorAll("[data-rem]").forEach(button => button.addEventListener("click", () => setItemQty(button.getAttribute("data-rem"), 0)));
    cartItems.querySelectorAll("[data-qty]").forEach(input => input.addEventListener("change", () => setItemQty(input.getAttribute("data-qty"), input.value)));
  }

  cartTotal.textContent = money(cartTotalPrice());
  renderCartBadge();
}

function setQuery(query){
  state.query = query || "";
  if(searchInput.value !== state.query) searchInput.value = state.query;
  if(searchInputMobile.value !== state.query) searchInputMobile.value = state.query;
  renderProducts();
}

function setCategory(category){
  state.category = category || "";
  if(categoryFilter.value !== state.category) categoryFilter.value = state.category;
  renderProducts();
}

function createOrder(customer){
  refreshState();
  const productsById = Object.fromEntries(state.products.map(product => [product.id, product]));
  const items = state.cart.map(item => {
    const product = productsById[item.productId];
    return {
      productId: item.productId,
      name: product ? product.name : "Unknown product",
      price: product ? product.price : 0,
      qty: item.qty
    };
  });
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const order = {
    id: "RSA-" + String(Date.now()).slice(-8),
    createdAt: new Date().toISOString(),
    status: "Pending",
    deliveryEstimate: "3-6 business days",
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    customerAddress: customer.address,
    items,
    total
  };
  const orders = load(STORAGE_KEYS.ORDERS, []);
  orders.unshift(order);
  save(STORAGE_KEYS.ORDERS, orders);
  
  // Sync to Supabase if configured
  if (typeof syncOrderToCloud === 'function') {
    syncOrderToCloud(order);
  }
  
  return order;
}

async function sendOrderConfirmation(order){
  await window.sendEmailJS({
    user_name: order.customerName,
    user_email: order.customerEmail,
    order_id: order.id,
    message: `Thanks for your order, ${order.customerName}!\n\nOrder: ${order.id}\n\nItems:\n${order.items.map(i => `• ${i.qty}x ${i.name} - ${money(i.price * i.qty)}`).join('\n')}\n\nTotal: ${money(order.total)}\nDelivery estimate: ${order.deliveryEstimate}`
  });
}

function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(str){
  return escapeHtml(str);
}

ensureSeed();
refreshState();

openCartBtn.addEventListener("click", () => {
  renderCart();
  openCart();
});
closeCartBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", () => {
  closeCart();
  openCheckoutModal();
});
closeProductModalBtn.addEventListener("click", closeProductModal);
productModalBackdrop.addEventListener("click", closeProductModal);
closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
checkoutModalBackdrop.addEventListener("click", closeCheckoutModal);

window.addEventListener("keydown", event => {
  if(event.key === "Escape"){
    closeCart();
    closeProductModal();
    closeCheckoutModal();
  }
});

searchInput.addEventListener("input", event => setQuery(event.target.value));
searchInputMobile.addEventListener("input", event => setQuery(event.target.value));
categoryFilter.addEventListener("change", event => setCategory(event.target.value));
priceFilter.addEventListener("input", event => {
  state.maxPrice = Number(event.target.value);
  priceValue.textContent = money(state.maxPrice);
  renderProducts();
});
resetFiltersBtn.addEventListener("click", () => {
  state.query = "";
  state.category = "";
  state.maxPrice = 250;
  searchInput.value = "";
  searchInputMobile.value = "";
  categoryFilter.value = "";
  priceFilter.value = "250";
  priceValue.textContent = "$250.00";
  renderProducts();
});

document.querySelectorAll(".catCard").forEach(card => {
  const category = card.getAttribute("data-cat");
  const handler = () => {
    setCategory(category);
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  };
  card.addEventListener("click", handler);
  card.addEventListener("keydown", event => {
    if(event.key === "Enter" || event.key === " "){
      event.preventDefault();
      handler();
    }
  });
});

document.getElementById("clearCategoryLink").addEventListener("click", event => {
  event.preventDefault();
  setCategory("");
});
document.getElementById("shopNewBtn").addEventListener("click", () => {
  document.getElementById("trending").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("aboutBtn").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("scrollTopLink").addEventListener("click", event => {
  event.preventDefault();
  document.getElementById("featured").scrollIntoView({ behavior: "smooth", block: "start" });
});
menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});
checkoutForm.addEventListener("submit", async event => {
  event.preventDefault();
  const customer = {
    name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("checkoutEmail").value.trim(),
    phone: document.getElementById("checkoutPhone").value.trim(),
    address: document.getElementById("checkoutAddress").value.trim()
  };
  if(!customer.name || !customer.email || !customer.phone || !customer.address){
    alert("Please complete all checkout fields.");
    return;
  }
  const order = createOrder(customer);
  try {
    await sendOrderConfirmation(order);
    setCart([]);
    renderCart();
    checkoutForm.reset();
    closeCheckoutModal();
    alert(`Order ${order.id} placed successfully!\nDelivery estimate: ${order.deliveryEstimate}\nConfirmation email sent to ${customer.email}`);
  } catch (error) {
    console.error("Email failed:", error);
    setCart([]);
    renderCart();
    checkoutForm.reset();
    closeCheckoutModal();
    alert(`Order ${order.id} placed successfully!\nDelivery estimate: ${order.deliveryEstimate}\n\nNote: Could not send confirmation email. Order details are saved in Admin panel.`);
  }
});
document.getElementById("supportEmail").addEventListener("click", event => {
  event.preventDefault();
  window.location.href = "mailto:vikashkumarbind76@gmail.com";
});

renderProducts();
renderCart();



