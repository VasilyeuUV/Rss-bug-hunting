const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value.trim();
  if (!text) {
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    render();
  }
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id)
  if (index !== -1) {
    tasks.splice(index, 1);
    render();
  }
}

function clearCompleted() {
  tasks = [];
  render();
}

function getVisibleTasks() {
  return tasks;
}

function getActiveTasks() {
  return tasks.filter(task => !task.done);
}

function updateCounter() {
  const activeTasks = getActiveTasks();
  counter.textContent = "Активных задач: " + activeTasks.length;
}

function render() {
  list.replaceChildren();

  const visible = getVisibleTasks();
  visible.forEach(task => createToDoItem(task))

  updateCounter();
}

function createToDoItem(task) {
  const li = document.createElement("li");
  li.className = "task";
  if (task.done) {
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.className = "task__text";
  span.textContent = task.text;
  span.addEventListener("click", () => toggleTask(task.id));

  const del = document.createElement("button");
  del.className = "task__del";
  del.textContent = "✕";
  del.addEventListener("click", () => deleteTask(task.id));

  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);
}


filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

function init() {
  addBtn.addEventListener('click', addTask);
  clearBtn.addEventListener("click", clearCompleted);

  render();
}

init();