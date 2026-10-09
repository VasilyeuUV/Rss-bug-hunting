const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

const cartManager = (function () {
  let cartProducts = [];
  let discount = 0;

  function getProduct(id) {
    return cartProducts.find(p => p.id === id)
  }

  function getProductTotalSum(product) {
    return product
      ? product.price * product.qty
      : 0;
  }

  function increase(id) {
    const cardProduct = getProduct(id);
    if (!cardProduct)
      return false;

    ++cardProduct.qty;
    return true;
  }

  function decrease(id) {
    const cardProduct = getProduct(id);
    if (cardProduct
      && cardProduct.qty > 1)
      --cardProduct.qty;
  }

  return {
    getProducts() {
      return [...cartProducts];
    },

    addToCart(product) {
      if (!increase(product.id)) {
        cartProducts.push({ ...product, qty: 1 });
      }
    },

    increaseQty(id) {
      return increase(id);
    },

    decreaseQty(id) {
      return decrease(id);
    },

    removeItem(id) {
      cartProducts = cartProducts.filter((i) => i.id !== id);
    },

    applyPromo(code) {
      if (code === "SALE10") {
        discount = 0.1;
        return true;
      }
      return false;
    },

    clearCart() {
      cartProducts = [];
    },

    getTotalPrice(product) {
      if (product) {
        return getProductTotalSum(product)
      }

      return cartProducts?.length > 0
        ? cartProducts.reduce((sum, p) => sum + getProductTotalSum(p), 0) * (1 - discount)
        : 0;
    },

    getTotalQuantity() {
      return cartProducts.reduce((sum, p) => sum + p.qty, 0);
    }
  }
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
    card.innerHTML = `<h3>${p.name}</h3><p>${p.price} ₽</p>`;
    const btn = document.createElement("button");
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => {
      cartManager.addToCart(p);
      renderCart();
    });
    card.appendChild(btn);
    productsEl.appendChild(card);
  });
}

function renderCartProductItem(product) {
  const lineTotal = cartManager.getTotalPrice(product);
  const li = document.createElement("li");
  li.className = "cart-item";
  li.innerHTML = `<span>${product.name}</span>
      <button class="qty-btn" data-act="dec">−</button>
      <span class="qty">${product.qty}</span>
      <button class="qty-btn" data-act="inc">+</button>
      <span class="line">${lineTotal} ₽</span>
      <button class="remove">✕</button>`;
  li.querySelector('[data-act="inc"]')
    .addEventListener("click", () => {
      cartManager.increaseQty(product.id);
      renderCart();
    });
  li.querySelector('[data-act="dec"]')
    .addEventListener("click", () => {
      cartManager.decreaseQty(product.id);
      renderCart();
    });
  li.querySelector(".remove")
    .addEventListener("click", () => {
      cartManager.removeItem(product.id);
      renderCart();
    });
  cartItemsEl.appendChild(li);
}

function renderCart() {
  cartItemsEl.replaceChildren();

  const cartProducts = cartManager.getProducts();
  cartProducts.forEach(product => renderCartProductItem(product));

  badgeEl.textContent = cartManager.getTotalQuantity();
  totalEl.textContent = cartManager.getTotalPrice();
  emptyMsg.hidden = cartProducts.length > 0;
}

function init() {
  promoBtn.addEventListener("click", () => {
    cartManager.applyPromo(promoInput.value.trim());
    renderCart();
  });
  clearBtn.addEventListener("click", () => {
    cartManager.clearCart();
    renderCart();
  });

  renderProducts();
  renderCart();
}

init();