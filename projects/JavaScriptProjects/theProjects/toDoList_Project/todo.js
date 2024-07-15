import ToDoManager from "./classToDoManager.js";

window.tableBody = document.getElementById("todoListBody");
let addBtn = document.getElementById("addBtn");
let reset = document.getElementById('resetBtn');
window.taskManager = new ToDoManager();
let storedList = localStorage.getItem("StoredList");
let userList = [];

function loadList() {
    if (storedList != null) {
        userList = JSON.parse(storedList);
        userList.forEach((task, index) => taskManager.addTaskToScreen(task, index));
    }
};
loadList();

addBtn.addEventListener("click", () => {
    let userInput = document.getElementById("userInput");
    if (userInput.value) {
        taskManager.addTask(userInput.value);
        userInput.value = "";
    }
});

reset.addEventListener('click', () => {
    localStorage.removeItem("StoredList");
    storedList = null;
    userList = [];
    tableBody.innerHTML = "";
    taskManager.tasks = [];
});
