const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

const cartManager = (function () {
  let cartProducts = [];
  let discount = 0;
  let onUpdate = null;

  const notify = () => onUpdate?.();
  const getProduct = (id) => cartProducts.find(p => p.id === id);

  function changeQty(id, amount) {
    const cardProduct = getProduct(id);
    if (!cardProduct
      || (amount < 0 && cardProduct.qty < 2))
      return false;
    cardProduct.qty += amount;
    notify();
    return true;
  }

  return {
    init(renderCallback) {
      onUpdate = renderCallback;
    },

    getProducts: () => [...cartProducts],
    getTotalQuantity: () => cartProducts.reduce((sum, p) => sum + p.qty, 0),
    getTotalPrice(product) {
      if (product)
        return product.price * product.qty;
      return cartProducts.reduce((sum, p) => sum + p.price * p.qty, 0) * (1 - discount);
    },

    addToCart(product) {
      if (!changeQty(product.id, 1)) {
        cartProducts.push({ ...product, qty: 1 });
        notify();
      }
    },

    increaseQty: (id) => changeQty(id, 1),
    decreaseQty: (id) => changeQty(id, -1),

    removeItem(id) {
      cartProducts = cartProducts.filter((i) => i.id !== id);
      notify();
    },

    applyPromo(code) {
      discount = code === "SALE10"
        ? 0.1
        : 0;
      notify();
    },

    clearCart() {
      cartProducts = [];
      notify();
    }
  };
})();

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

    const title = document.createElement("h3");
    title.textContent = p.name;

    const price = document.createElement("p");
    price.textContent = `${p.price} ₽`;

    const btn = document.createElement("button");
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => cartManager.addToCart(p));

    card.append(title, price, btn);
    productsEl.appendChild(card);
  });
}

function renderCartProductItem(product) {
  const nameSpan = document.createElement("span");
  nameSpan.textContent = product.name;

  const li = document.createElement("li");
  li.className = "cart-item";
  li.append(nameSpan);
  li.insertAdjacentHTML("beforeend", `
    <button class="qty-btn" data-act="dec">−</button>
    <span class="qty">${product.qty}</span>
    <button class="qty-btn" data-act="inc">+</button>
    <span class="line">${cartManager.getTotalPrice(product)} ₽</span>
    <button class="remove">✕</button>
  `);
  li.addEventListener("click", (e) => {
    const target = e.target;
    const act = target.dataset.act;

    if (act === "inc") cartManager.increaseQty(product.id);
    if (act === "dec") cartManager.decreaseQty(product.id);
    if (target.classList.contains("remove")) cartManager.removeItem(product.id);
  });

  cartItemsEl.appendChild(li);
}

function renderCart() {
  cartItemsEl.replaceChildren();

  const cartProducts = cartManager.getProducts();
  cartProducts.forEach(renderCartProductItem);

  badgeEl.textContent = cartManager.getTotalQuantity();
  totalEl.textContent = cartManager.getTotalPrice();
  emptyMsg.hidden = cartProducts.length > 0;
}

function init() {
  promoBtn.addEventListener("click", () => cartManager.applyPromo(promoInput.value.trim()));
  clearBtn.addEventListener("click", () => cartManager.clearCart());

  cartManager.init(renderCart);

  renderProducts();
  renderCart();
}

init();