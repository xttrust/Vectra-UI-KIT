const PRODUCTS = [
  { id:1, name:'Wireless Headphones', category:'Electronics', price:79.99, rating:4.5, desc:'Premium sound quality with ANC.' },
  { id:2, name:'Slim Laptop Stand', category:'Electronics', price:34.99, rating:4.8, desc:'Ergonomic aluminum stand.' },
  { id:3, name:'Cotton Tee', category:'Clothing', price:24.99, rating:4.2, desc:'100% organic cotton, breathable.' },
  { id:4, name:'Hoodie Classic', category:'Clothing', price:54.99, rating:4.6, desc:'Comfortable everyday hoodie.' },
  { id:5, name:'JavaScript Mastery', category:'Books', price:29.99, rating:4.9, desc:'Complete modern JS guide.' },
  { id:6, name:'Design Systems', category:'Books', price:39.99, rating:4.7, desc:'Build scalable design systems.' },
  { id:7, name:'Leather Wallet', category:'Accessories', price:44.99, rating:4.3, desc:'Slim RFID-blocking wallet.' },
  { id:8, name:'Mechanical Watch', category:'Accessories', price:149.99, rating:4.8, desc:'Minimalist Swiss-style watch.' },
];

const CART_KEY = 'vectra-shop-cart';
let activeCategory = 'All';
let cart = loadCart();

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function productAccent(productId) {
  return `hsl(${productId * 47}deg 60% 30%)`;
}

function ratingMarkup(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let count = 0;
  let stars = '';
  for (let i = 0; i < full; i += 1) {
    stars += '<i class="fa-solid fa-star"></i>';
    count += 1;
  }
  if (half) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    count += 1;
  }
  while (count < 5) {
    stars += '<i class="fa-regular fa-star"></i>';
    count += 1;
  }
  return stars;
}

function getFilteredProducts() {
  return activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(product => product.category === activeCategory);
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const products = getFilteredProducts();
  document.getElementById('resultsText').textContent = `${products.length} product${products.length === 1 ? '' : 's'}`;
  grid.innerHTML = products.map(product => `
    <div class="col-md-6 col-xl-4" data-aos="fade-up">
      <article class="v-card p-0 overflow-hidden h-100">
        <div style="height:190px;background:${productAccent(product.id)};"></div>
        <div class="p-4 d-flex flex-column h-100">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="v-badge v-badge-soft">${product.category}</span>
            <span class="v-small v-text-muted">${product.rating.toFixed(1)}</span>
          </div>
          <h2 class="h5 mb-2">${product.name}</h2>
          <p class="v-text-muted mb-3">${product.desc}</p>
          <div class="fw-bold fs-4 mb-2">${formatMoney(product.price)}</div>
          <div class="v-rating mb-4">${ratingMarkup(product.rating)}</div>
          <button class="v-btn v-btn-primary mt-auto" data-add-to-cart="${product.id}"><i class="fa-solid fa-plus"></i> Add to Cart</button>
        </div>
      </article>
    </div>
  `).join('');

  document.querySelectorAll('[data-add-to-cart]').forEach(button => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.addToCart)));
  });

  if (typeof AOS !== 'undefined') {
    AOS.refreshHard();
  }
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart();
  renderCart();
}

function updateQuantity(productId, delta) {
  const next = (cart[productId] || 0) + delta;
  if (next <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = next;
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  saveCart();
  renderCart();
}

function renderCart() {
  const entries = Object.entries(cart);
  const itemsEl = document.getElementById('cartItems');
  const badgeEl = document.getElementById('cartCountBadge');
  const metaEl = document.getElementById('cartItemsMeta');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalCount = entries.reduce((sum, [, qty]) => sum + qty, 0);
  const subtotal = entries.reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find(item => item.id === Number(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);

  badgeEl.textContent = totalCount;
  metaEl.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
  subtotalEl.textContent = formatMoney(subtotal);

  if (!entries.length) {
    itemsEl.innerHTML = '<div class="v-card text-center"><i class="fa-solid fa-bag-shopping mb-3 v-inl-1nt1xil-229"></i><h3 class="h5">Your cart is empty</h3><p class="v-small v-text-muted mb-0">Add a few products to see them here.</p></div>';
    return;
  }

  itemsEl.innerHTML = entries.map(([id, qty]) => {
    const product = PRODUCTS.find(item => item.id === Number(id));
    if (!product) return '';
    return `
      <div class="v-card p-3">
        <div class="d-flex gap-3 align-items-start">
          <div style="width:68px;height:68px;border-radius:16px;background:${productAccent(product.id)};flex-shrink:0;"></div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between gap-2 mb-1">
              <div>
                <div class="fw-semibold">${product.name}</div>
                <div class="v-small v-text-muted">${product.category}</div>
              </div>
              <button class="v-btn v-btn-ghost v-btn-sm" data-remove="${product.id}"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div class="d-flex align-items-center gap-2">
                <button class="v-btn v-btn-ghost v-btn-sm" data-qty="${product.id}" data-delta="-1">-</button>
                <span class="fw-semibold">${qty}</span>
                <button class="v-btn v-btn-ghost v-btn-sm" data-qty="${product.id}" data-delta="1">+</button>
              </div>
              <div class="fw-semibold">${formatMoney(product.price * qty)}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('[data-qty]').forEach(button => {
    button.addEventListener('click', () => updateQuantity(Number(button.dataset.qty), Number(button.dataset.delta)));
  });
  document.querySelectorAll('[data-remove]').forEach(button => {
    button.addEventListener('click', () => removeFromCart(Number(button.dataset.remove)));
  });
}

function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll('[data-category]').forEach(button => {
    const active = button.dataset.category === category;
    button.classList.toggle('v-btn-primary', active);
    button.classList.toggle('v-btn-soft', !active);
  });
  renderProducts();
}

document.querySelectorAll('[data-category]').forEach(button => {
  button.addEventListener('click', () => setCategory(button.dataset.category));
});

document.getElementById('clearCartBtn').addEventListener('click', () => {
  cart = {};
  saveCart();
  renderCart();
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  if (!totalCount) {
    window.alert('Your cart is empty. Add a product before checking out.');
    return;
  }
  window.alert(`Checkout ready for ${totalCount} item${totalCount === 1 ? '' : 's'}!`);
});

renderProducts();
renderCart();
