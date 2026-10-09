const products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "Galaxy S24", price: 899, category: "phone" },
  { id: 3, name: "Pixel 8", price: 699, category: "phone" },
  { id: 4, name: "MacBook Air", price: 1199, category: "laptop" },
  { id: 5, name: "ThinkPad X1", price: 1399, category: "laptop" },
  { id: 6, name: "AirPods Pro", price: 249, category: "audio" },
  { id: 7, name: "Sony WH-1000", price: 349, category: "audio" },
  { id: 8, name: "JBL Flip", price: 129, category: "audio" },
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");

function getFiltered() {
  let result = products;
  // const search = searchInput.value;
  // const category = categorySelect.value;
  // const sort = sortSelect.value;

  // if (search) {
  //   result = result.filter((p) => p.name === search);
  // }

  result = getProductsByCategory(categorySelect.value)


  // if (category !== "all") {
  //   result = products.filter((p) => p.category !== category);
  // }

  // if (sort === "asc") {
  //   result.sort((a, b) => b.price - a.price);
  // } else if (sort === "desc") {
  //   result.sort((a, b) => a.price - b.price);
  // }

  return result;
}


function getProductsByCategory(category) {
  const result = products.filter((p) => p.category === category)
  return result.length > 0
    ? result
    : products;
}



function renderProductItem(product) {
  const card = document.createElement("div");
  card.className = "card";
  card.insertAdjacentHTML("beforeend", `
    <h3>${product.name}</h3>
    <p class="cat">${product.category}</p>
    <p class="price">${product.price}</p>
  `);

  grid.appendChild(card);
}

function render() {
  grid.replaceChildren();

  const items = getFiltered();
  items.forEach(renderProductItem);
  countEl.textContent = products.length;
}

function init() {
  categorySelect.addEventListener("change", render);

  render();
}

init();









/*



const products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "Galaxy S24", price: 899, category: "phone" },
  { id: 3, name: "Pixel 8", price: 699, category: "phone" },
  { id: 4, name: "MacBook Air", price: 1199, category: "laptop" },
  { id: 5, name: "ThinkPad X1", price: 1399, category: "laptop" },
  { id: 6, name: "AirPods Pro", price: 249, category: "audio" },
  { id: 7, name: "Sony WH-1000", price: 349, category: "audio" },
  { id: 8, name: "JBL Flip", price: 129, category: "audio" },
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");

function getFiltered() {
  let result = products;
  const search = searchInput.value;
  const category = categorySelect.value;
  const sort = sortSelect.value;

  if (search) {
    result = result.filter((p) => p.name === search);
  }

  if (category !== "all") {
    result = products.filter((p) => p.category !== category);
  }

  if (sort === "asc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === "desc") {
    result.sort((a, b) => a.price - b.price);
  }

  return result;
}

function render() {
  const items = getFiltered();
  items.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${p.name}</h3><p class="cat">${p.category}</p><p class="price">$${p.price}</p>`;
    grid.appendChild(card);
  });
  countEl.textContent = products.length;
}

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
});
*/