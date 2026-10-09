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

const filters = [
  (list) => getProductsByName(list, searchInput.value),
  (list) => getProductsByCategory(list, categorySelect.value),
  (list) => sortProducts(list, sortSelect.value)
];

const getFiltered = () => filters.reduce((result, filter) => filter(result), products);

const getProductsByName = (list, name) => {
  const search = name.trim().toLowerCase();
  return search
    ? list.filter(p => p.name.toLowerCase().includes(search))
    : list;
};

const getProductsByCategory = (list, cat) =>
  (!cat || cat === "all")
    ? list
    : list.filter(p => p.category === cat);

function sortProducts(list, sort) {
  if (!sort
    || sort === SORT.DEFAULT)
    return list;

  return [...list].sort((a, b) => sort === SORT.ASC
    ? a.price - b.price
    : b.price - a.price);
}

function setDefaultFilters() {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = SORT.DEFAULT;
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "card";  
  card.insertAdjacentHTML("beforeend", `<h3 class="title"></h3><p class="cat"></p><p class="price"></p>`);
  
  card.querySelector(".title").textContent = product.name;
  card.querySelector(".cat").textContent = product.category;
  card.querySelector(".price").textContent = `$${product.price}`;
  
  return card;
}

function render() {
  grid.replaceChildren();
  const items = getFiltered();

  const fragment = document.createDocumentFragment();
  items.forEach(p => fragment.appendChild(createProductCard(p)));
  grid.appendChild(fragment);

  countEl.textContent = items.length;
}

function init() {
  setDefaultFilters();

  [searchInput, categorySelect, sortSelect].forEach(el => 
    el.addEventListener(el.id === "search" ? "input" : "change", render)
  );

  resetBtn.addEventListener("click", () => {
    setDefaultFilters();
    render();
  });

  render();
}

init();