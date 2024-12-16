// Elements
const taskInput = document.getElementById("new-task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.id));
});

// Functions
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveAndRenderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRenderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRenderTasks();
}

function editTask(index) {
  const newTaskText = prompt("Edit task:", tasks[index].text);
  if (newTaskText) {
    tasks[index].text = newTaskText.trim();
    saveAndRenderTasks();
  }
}

function saveAndRenderTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = tasks
    .filter((task) => {
      if (filter === "all") return true;
      return filter === "active" ? !task.completed : task.completed;
    })
    .map(
      (task, index) => `
      <li class="task ${task.completed ? "completed" : ""}">
        <span>${task.text}</span>
        <div>
          <button onclick="toggleComplete(${index})">✔️</button>
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      </li>
    `
    )
    .join("");
}

function setFilter(newFilter) {
  filter = newFilter;
  filterButtons.forEach((button) => button.classList.remove("active"));
  document.getElementById(newFilter).classList.add("active");
  renderTasks();
}

// Initial render
setFilter("all");
renderTasks();
