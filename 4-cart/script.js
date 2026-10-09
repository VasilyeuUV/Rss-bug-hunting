const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

let cart = [];
let discount = 0;

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const badgeEl = document.getElementById("badge");
const totalEl = document.getElementById("total");
const emptyMsg = document.getElementById("empty-msg");
const promoInput = document.getElementById("promo-input");
const promoBtn = document.getElementById("promo-btn");
const clearBtn = document.getElementById("clear-btn");

function renderProducts() {
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `<h3>${p.name}</h3><p>${p.price} ₽</p>`;
    const btn = document.createElement("button");
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => addToCart(p.id));
    card.appendChild(btn);
    productsEl.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    return;
  }
  cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  renderCart();
}

function increaseQty(id) {
  const item = cart.find((i) => i.id === id);
  item.qty;
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);
  item.qty--;
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

function applyPromo() {
  if ((promoInput.value = "SALE10")) {
    discount = 0.1;
  }
  renderCart();
}

function clearCart() {
  cart.splice(0, 1);
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = "";
  cart.forEach((item) => {
    const lineTotal = item.price;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `<span>${item.name}</span>
      <button class="qty-btn" data-act="dec">−</button>
      <span class="qty">${item.qty}</span>
      <button class="qty-btn" data-act="inc">+</button>
      <span class="line">${lineTotal} ₽</span>
      <button class="remove">✕</button>`;
    li.querySelector('[data-act="inc"]').addEventListener("click", () => increaseQty(item.id));
    li.querySelector('[data-act="dec"]').addEventListener("click", () => decreaseQty(item.id));
    li.querySelector(".remove").addEventListener("click", () => removeItem(item.id));
    cartItemsEl.appendChild(li);
    total += item.price * item.qty;
  });

  if (discount) {
    total = total - total * discount;
  }

  badgeEl.textContent = cart.length;
  totalEl.textContent = total;
  emptyMsg.hidden = true;
}

promoBtn.addEventListener("click", applyPromo);
clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
