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

const SORT = Object.freeze({
  DEFAULT: "default",
  ASC: "asc",
  DESC: "desc"
});

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");

function setDefaultFilters() {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = SORT.DEFAULT;
}

function getFiltered() {
  const filters = [
    (list) => getProductsByName(list, searchInput.value),
    (list) => getProductsByCategory(list, categorySelect.value),
    (list) => sortProducts(list, sortSelect.value)
  ];

  return filters.reduce((result, filter) => filter(result), products);
}

function getProductsByName(selectedProducts, name) {
  const search = name
    .trim()
    .toLowerCase();
  return search
    ? selectedProducts.filter(p => p.name.toLowerCase().includes(search))
    : selectedProducts;
}

function getProductsByCategory(selectedProducts, category) {
  return !category
    || category === "all"
    ? selectedProducts
    : selectedProducts.filter((p) => p.category === category)
}

function sortProducts(selectedProducts, sort) {
  if (!sort
    || sort === SORT.DEFAULT)
    return selectedProducts;

  const sorted = [...selectedProducts];

  switch (sort) {
    case SORT.ASC:
      return sorted.sort((a, b) => a.price - b.price);
    case SORT.DESC:
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return selectedProducts;
  }
}

function clearFilters() {
  setDefaultFilters();
  render();
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
  countEl.textContent = items.length;
}

function init() {
  setDefaultFilters();

  searchInput.addEventListener("input", render);
  categorySelect.addEventListener("change", render);
  sortSelect.addEventListener("change", render);
  resetBtn.addEventListener("click", clearFilters);
  render();
}

init();