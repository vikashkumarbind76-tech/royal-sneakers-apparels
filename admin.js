const STORAGE_KEYS = {
  PRODUCTS: "rsa_products_v1",
  ORDERS: "rsa_orders_v1",
  ADMIN_SESSION: "rsa_admin_session_v1"
};

// EmailJS credentials are provided by email.js which is loaded before admin.js
const EMAILJS_SERVICE_ID = window.EMAILJS_CONFIG?.serviceId || "service_xcusct8";
const EMAILJS_TEMPLATE_ID = window.EMAILJS_CONFIG?.templateId || "template_4mxdytl";
const EMAILJS_PUBLIC_KEY = window.EMAILJS_CONFIG?.publicKey || "SjmZ3hPkSaJLmUx2b";
const DEFAULT_MODEL_PATH = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb";

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function money(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function uid(prefix = "id") {
  return prefix + "_" + Math.random().toString(16).slice(2) + "_" + Date.now().toString(16);
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', '&quot;')
    .replaceAll("'", "&#39;");
}

function isAuthed() {
  const s = load(STORAGE_KEYS.ADMIN_SESSION, null);
  return s && s.authed && s.username === "admin";
}

function setAuthed(v) {
  if (v) {
    save(STORAGE_KEYS.ADMIN_SESSION, { authed: true, username: "admin", at: Date.now() });
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }
}

function getProducts() { return load(STORAGE_KEYS.PRODUCTS, []); }
function setProducts(products) { save(STORAGE_KEYS.PRODUCTS, products); }
function getOrders() { return load(STORAGE_KEYS.ORDERS, []); }
function setOrders(orders) { save(STORAGE_KEYS.ORDERS, orders); }

function getUsers() {
  const orders = getOrders();
  const map = {};
  orders.forEach(order => {
    const email = String(order.customerEmail || "").trim().toLowerCase();
    if (!email) return;
    if (!map[email]) {
      map[email] = {
        name: order.customerName || "Customer",
        email,
        orders: 0,
        lastOrder: order.createdAt || "",
        lastOrderId: order.id || ""
      };
    }
    map[email].orders += 1;
    if (order.createdAt && order.createdAt > map[email].lastOrder) {
      map[email].lastOrder = order.createdAt;
      map[email].lastOrderId = order.id || "";
    }
  });
  return Object.values(map);
}

function show(view) {
  document.getElementById("loginView").style.display = view === "login" ? "grid" : "none";
  document.getElementById("appView").style.display = view === "app" ? "block" : "none";
}

function setActive(section) {
  ["navDashboard", "navProducts", "navOrders", "navUsers"].forEach(id => {
    document.getElementById(id).classList.remove("active");
  });
  document.getElementById("nav" + section.charAt(0).toUpperCase() + section.slice(1)).classList.add("active");

  ["secDashboard", "secProducts", "secOrders", "secUsers"].forEach(id => {
    document.getElementById(id).style.display = id === "sec" + section.charAt(0).toUpperCase() + section.slice(1) ? "block" : "none";
  });

  renderAll();
}

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function openModal(mode, product) {
  document.getElementById("modal").classList.add("show");
  document.getElementById("modalBackdrop").classList.add("show");
  document.getElementById("modalBackdrop").style.display = "block";
  const productForm = document.getElementById("productForm");
  productForm.reset();
  productForm.dataset.mode = mode;

  if (mode === "add") {
    document.getElementById("modalTitle").textContent = "Add Product";
    document.getElementById("pid").value = "";
  } else {
    document.getElementById("modalTitle").textContent = "Edit Product";
    document.getElementById("pid").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;
    document.getElementById("image").value = product.image;
    document.getElementById("modelUrl").value = product.model3D_url || product.modelUrl || "";
    document.getElementById("desc").value = product.desc || "";
  }
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
  document.getElementById("modalBackdrop").classList.remove("show");
  document.getElementById("modalBackdrop").style.display = "none";
}

function openEmailModal(user) {
  const orders = getOrders();
  const order = orders.find(o => o.id === user.lastOrderId);

  const subject = encodeURIComponent(`Order update for ${user.name}`);
  let bodyText = `Hi ${user.name},\n\nWe are updating you about your order #${user.lastOrderId}.\n\n`;

  if (order) {
    bodyText += `Order Details:\n`;
    if (order.items && order.items.length) {
      order.items.forEach(item => {
        bodyText += `• ${item.qty}x ${item.name} (${money(item.price * item.qty)})\n`;
      });
    }
    bodyText += `\nTotal: ${money(order.total)}\n`;
    bodyText += `Shipping Address: ${order.customerAddress}\n\n`;
  }

  bodyText += `Thank you for shopping with Royal Sneakers & Apparels.`;

  const body = encodeURIComponent(bodyText);
  window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;
}

function closeEmailModal() {
  document.getElementById("emailModal").classList.remove("show");
  document.getElementById("emailModal").style.display = "none";
}

function renderStats() {
  const products = getProducts();
  const orders = getOrders();
  const users = getUsers();
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  document.getElementById("statProducts").textContent = products.length;
  document.getElementById("statOrders").textContent = orders.length;
  document.getElementById("statRevenue").textContent = money(revenue);
  document.getElementById("statUsers").textContent = users.length;
  document.getElementById("sessionPill").textContent = isAuthed() ? "admin" : "guest";
}

function renderProductsTable() {
  const products = getProducts();
  const tbody = document.getElementById("productsTbody");
  const tbody2 = document.getElementById("productsTbody2");
  const rows = products.map(product => `
    <tr>
      <td><div class="thumb"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"/></div></td>
      <td>${escapeHtml(product.name)}</td>
      <td>${money(product.price)}</td>
      <td class="muted">${escapeHtml(product.category)}</td>
      <td>
        <div class="tableActions">
          <button class="tiny blue" data-edit="${escapeHtml(product.id)}"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="tiny red" data-del="${escapeHtml(product.id)}"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
      </td>
    </tr>
  `).join("");

  tbody.innerHTML = rows;
  tbody2.innerHTML = rows;

  tbody.querySelectorAll("[data-edit]").forEach(btn => btn.addEventListener("click", () => editProduct(btn.getAttribute("data-edit"))));
  tbody.querySelectorAll("[data-del]").forEach(btn => btn.addEventListener("click", () => deleteProduct(btn.getAttribute("data-del"))));
  tbody2.querySelectorAll("[data-edit]").forEach(btn => btn.addEventListener("click", () => editProduct(btn.getAttribute("data-edit"))));
  tbody2.querySelectorAll("[data-del]").forEach(btn => btn.addEventListener("click", () => deleteProduct(btn.getAttribute("data-del"))));
}

function renderOrdersTable() {
  const orders = getOrders();
  const tbody = document.getElementById("ordersTbody");
  const tbody2 = document.getElementById("ordersTbody2");

  if (orders.length === 0) {
    const emptyRow = `<tr><td colspan="5" class="muted">No orders yet. Place a checkout on the storefront to create simulated orders.</td></tr>`;
    tbody.innerHTML = emptyRow;
    tbody2.innerHTML = emptyRow;
    return;
  }

  const rows = orders.map(order => {
    const name = escapeHtml(order.customerName || "Customer");
    const email = escapeHtml(order.customerEmail || "n/a");
    const phone = escapeHtml(order.customerPhone || "n/a");
    const address = escapeHtml(order.customerAddress || "No address provided");
    return `
      <tr>
        <td><strong>${escapeHtml(order.id)}</strong><div class="muted" style="font-size:12px;margin-top:4px">${escapeHtml(new Date(order.createdAt || Date.now()).toLocaleString())}</div></td>
        <td>
          <div style="font-weight:700">${name}</div>
          <div class="muted" style="font-size:12px">
            <i class="fa-solid fa-envelope"></i> ${email}<br/>
            <i class="fa-solid fa-phone"></i> ${phone}<br/>
            <i class="fa-solid fa-location-dot"></i> ${address}
          </div>
        </td>
        <td><strong>${money(Number(order.total) || 0)}</strong></td>
        <td class="muted">${escapeHtml(order.status || "Pending")}</td>
        <td>
          <div class="tableActions">
            <button class="tiny blue" data-toggle="${escapeHtml(order.id)}"><i class="fa-solid fa-circle-check"></i> Toggle</button>
            <button class="tiny blue" data-email="${escapeHtml(order.customerEmail || "")}" data-name="${name}" data-order="${escapeHtml(order.id)}"><i class="fa-solid fa-envelope"></i> Email</button>
            <button class="tiny red" data-odel="${escapeHtml(order.id)}"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  tbody.innerHTML = rows;
  tbody2.innerHTML = rows;

  [tbody, tbody2].forEach(table => {
    table.querySelectorAll("[data-toggle]").forEach(btn => btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-toggle");
      const orders = getOrders();
      const idx = orders.findIndex(order => order.id === id);
      if (idx < 0) return;
      orders[idx].status = orders[idx].status === "Pending" ? "Completed" : "Pending";
      setOrders(orders);
      renderAll();
    }));

    table.querySelectorAll("[data-odel]").forEach(btn => btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-odel");
      if (!confirm("Delete this order?")) return;
      setOrders(getOrders().filter(order => order.id !== id));
      renderAll();
    }));

    table.querySelectorAll("[data-email]").forEach(btn => btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email");
      const name = btn.getAttribute("data-name");
      const orderId = btn.getAttribute("data-order");
      if (!email || !validateEmail(email)) {
        alert("No valid customer email available for this order.");
        return;
      }
      openEmailModal({ name, email, lastOrderId: orderId });
    }));
  });
}

function renderUsersTable() {
  const users = getUsers();
  const tbody = document.getElementById("usersTbody");

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="muted">No users available. Orders must include customer email.</td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(user => `
    <tr>
      <td>${escapeHtml(user.name)}</td>
      <td>${escapeHtml(user.email)}</td>
      <td>${user.orders}</td>
      <td>${escapeHtml(new Date(user.lastOrder).toLocaleString())}</td>
      <td>
        <button class="tiny blue" data-user="${escapeHtml(user.email)}" data-name="${escapeHtml(user.name)}" data-order="${escapeHtml(user.lastOrderId)}"><i class="fa-solid fa-envelope"></i> Email</button>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll("[data-user]").forEach(btn => btn.addEventListener("click", () => {
    const email = btn.getAttribute("data-user");
    const name = btn.getAttribute("data-name");
    const orderId = btn.getAttribute("data-order");
    openEmailModal({ name, email, lastOrderId: orderId });
  }));
}

function renderAll() {
  renderStats();
  renderProductsTable();
  renderOrdersTable();
  renderUsersTable();
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  setProducts(getProducts().filter(product => product.id !== id));
  renderAll();
}

function editProduct(id) {
  const product = getProducts().find(item => item.id === id);
  if (!product) return;
  openModal("edit", product);
}

async function sendEmail(data) {
  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    template_params: {
      user_name: data.to_name,
      user_email: data.to_email,
      subject: data.subject,
      message: data.message,
      order_id: data.order_id || ""
    }
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`EmailJS Error: ${response.status} ${errorText}`);
    }

    alert("Email sent successfully.");
    closeEmailModal();
  } catch (err) {
    console.error("Email error:", err);
    alert("Failed to send email. Check console for details.");
  }
}

function init() {
  const loginForm = document.getElementById("loginForm");
  const modalClose = document.getElementById("modalClose");
  const emailModalClose = document.getElementById("emailModalClose");
  const btnAddProduct = document.getElementById("btnAddProduct");
  const btnAddProduct2 = document.getElementById("btnAddProduct2");
  const btnGoStore = document.getElementById("btnGoStore");
  const btnClearOrders = document.getElementById("btnClearOrders");

  document.getElementById("navDashboard").addEventListener("click", () => setActive("dashboard"));
  document.getElementById("navProducts").addEventListener("click", () => setActive("products"));
  document.getElementById("navOrders").addEventListener("click", () => setActive("orders"));
  document.getElementById("navUsers").addEventListener("click", () => setActive("users"));
  document.getElementById("navLogout").addEventListener("click", () => {
    setAuthed(false);
    show("login");
  });

  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const u = document.getElementById("u").value.trim();
    const p = document.getElementById("p").value;
    if (u === "admin" && p === "Vikash09") {
      setAuthed(true);
      show("app");
      setActive("dashboard");
    } else {
      alert("Invalid credentials.");
    }
  });

  document.getElementById("forgotBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Please contact the system administrator to reset your password.");
  });

  modalClose.addEventListener("click", closeModal);
  document.getElementById("modalBackdrop").addEventListener("click", closeModal);
  btnAddProduct.addEventListener("click", () => openModal("add"));
  btnAddProduct2.addEventListener("click", () => openModal("add"));
  btnGoStore.addEventListener("click", () => {
    if (history.length > 1) history.back(); else window.location.href = "index.html";
  });
  btnClearOrders.addEventListener("click", () => {
    if (!confirm("Clear ALL orders?")) return;
    setOrders([]);
    renderAll();
  });

  const productForm = document.getElementById("productForm");
  productForm.addEventListener("submit", event => {
    event.preventDefault();
    const mode = productForm.dataset.mode || "add";
    const id = document.getElementById("pid").value.trim();
    const name = document.getElementById("name").value.trim();
    const price = Number(document.getElementById("price").value);
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value.trim();
    const modelUrl = document.getElementById("modelUrl").value.trim() || DEFAULT_MODEL_PATH;
    const model3D_url = modelUrl;
    const desc = document.getElementById("desc").value.trim();

    if (!name || !image || !category || !Number.isFinite(price) || price <= 0) {
      alert("Please provide valid Name, Price, Category, and Image URL.");
      return;
    }

    const products = getProducts();
    if (mode === "add") {
      products.unshift({ id: uid("p"), name, price, category, image, image_url: image, model3D: modelUrl, modelUrl, model3D_url, desc });
    } else {
      const idx = products.findIndex(product => product.id === id);
      if (idx < 0) { alert("Product not found."); return; }
      products[idx] = { ...products[idx], name, price, category, image, image_url: image, model3D: modelUrl, modelUrl, model3D_url, desc };
    }
    setProducts(products);
    
    // Sync to Supabase if configured
    if (typeof syncProductToCloud === 'function') {
      const savedProduct = mode === "add" ? products[0] : products.find(p => p.id === id);
      syncProductToCloud(savedProduct);
    }
    
    closeModal();
    renderAll();
  });

  emailModalClose.addEventListener("click", closeEmailModal);
  document.getElementById("emailForm").addEventListener("submit", event => {
    event.preventDefault();
    sendEmail({
      to_name: document.getElementById("emailToName").value,
      to_email: document.getElementById("emailToAddress").value,
      subject: document.getElementById("emailSubject").value.trim(),
      message: document.getElementById("emailMessage").value.trim(),
      order_id: document.getElementById("emailToAddress").dataset.orderId || ""
    });
  });

  if (!isAuthed()) {
    show("login");
  } else {
    show("app");
    setActive("dashboard");
  }
}

document.addEventListener("DOMContentLoaded", init);
