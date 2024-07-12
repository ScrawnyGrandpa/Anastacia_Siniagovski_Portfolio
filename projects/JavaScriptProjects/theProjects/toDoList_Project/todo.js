class Task {
    id;
    name;
    creationDate;
    complete;

    getSimpleDate() {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();
        return `${day}-${month}-${year}`;
    };

    constructor(name, id) {
        this.id = id;
        this.name = name;
        this.creationDate = this.getSimpleDate();
        this.complete = false;
    };
}


class ToDoManager {
    tasks;

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("StoredList")) || [];
    };

    getTask(name) {
        return this.tasks.find((task) => task.name == name)
    };

    getTaskIndex(name) {
        return this.tasks.findIndex((task) => task.name == name);
    };

    addTask(name) {
        let task = this.getTask(name);

        if (!task) {
            let finalD = String(new Date().getTime()).slice(7);
            task = new Task(name, finalD);
            this.tasks.push(task);
            refreshTasks(this.tasks);
            this.updateLocalStorage();
        }
    };

    removeTask(name) {
        let index = this.getTaskIndex(name);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            refreshTasks(this.tasks);
            this.updateLocalStorage();
        } else {
            console.log("Task does not exist");
        }
    };

    updateTask(name, newName) {
        let task = this.getTask(name);
        if (task) {
            task.name = newName;
            refreshTasks(this.tasks);
            this.updateLocalStorage();
        } else {
            console.log("Task does not exist");
        }
    };

    // Toggle Complete is currently handles by a function outside the class Manager. By a function called complete(name, isChecked)
    /*  toggleIsComplete(index) {
        this.tasks[index].complete = !this.tasks[index].complete;
        refreshTasks(this.tasks);
        } */

    // Update the local storage. I realized I needed to add this into the manager class because when I added it outside, the entire code broke. So I realized it must be saved in the core. 
    // And then of course every action we do must be saved anew.
    updateLocalStorage() {
        localStorage.setItem("StoredList", JSON.stringify(this.tasks));
    }
}

let tableBody = document.getElementById("todoListBody");
let addBtn = document.getElementById("addBtn");
let reset = document.getElementById('resetBtn');
let taskManager = new ToDoManager();
let storedList = localStorage.getItem("StoredList");
let userList = [];

function loadList() {
    if (storedList != null) {
        userList = JSON.parse(storedList);
        userList.forEach((task, index) => addTaskToScreen(task, index));
    }
};
loadList();

function refreshTasks(tasks) {
    tableBody.innerHTML = "";
    tasks.forEach((task, index) => {
        addTaskToScreen(task, index);
    });
}

function addTaskToScreen(task, index) {
    // Determine the class for completed tasks
    let completeClass = task.complete ? 'completed' : '';

    // Create the element
    let row = `
            <tr class="todo-item" id="row${index}">
                <td class="todo-item-checkbox">
                    <input type="checkbox" onchange="complete('${task.name}', this.checked)" ${task.complete ? 'checked' : ''}>
                </td>
                <td class="todo-item-complete ${completeClass}">${task.complete}</td>
                <td class="todo-item-name">${task.name}</td>
                <td class="todo-item-created">${task.creationDate}</td>
                <td class="todo-item-action"><button class="todo-item-edit" onclick="editThis('${task.name}')">Edit</button></td>
                <td class="todo-item-action"><button class="todo-item-delete" onclick="removeThis('${task.name}')">Delete</button></td>
                <td class="todo-item-id">${task.id}</td>
            </tr>
            `;
    // Append the child
    tableBody.innerHTML += row;
}

addBtn.addEventListener("click", () => {
    let userInput = document.getElementById("userInput");
    if (userInput.value) {
        taskManager.addTask(userInput.value);
        localStorage.setItem("StoredList", JSON.stringify(taskManager.tasks));
        userInput.value = "";
    }
});

function removeThis(name) {
    taskManager.removeTask(name);
    localStorage.setItem("StoredList", JSON.stringify(taskManager.tasks));
}

function editThis(name) {
    let newName = prompt("Enter new name for the task:");
    if (newName) {
        taskManager.updateTask(name, newName);
        localStorage.setItem("StoredList", JSON.stringify(taskManager.tasks));
    }
}

function complete(name, isChecked) {
    let index = taskManager.getTaskIndex(name);
    if (index !== -1) {
        taskManager.tasks[index].complete = isChecked;
        localStorage.setItem("StoredList", JSON.stringify(taskManager.tasks));
        refreshTasks(taskManager.tasks);
    }
}

reset.addEventListener('click', () => {
    localStorage.removeItem("StoredList");
    storedList = null;
    userList = [];
    tableBody.innerHTML = "";
    taskManager.tasks = [];
});

