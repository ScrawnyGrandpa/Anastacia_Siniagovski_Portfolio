import Task from "./classTask.js"

export default class ToDoManager {
    tasks;

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("StoredList")) || [];
    };

    getTask(id) {
        return this.tasks.find((task) => task.id == id)
    };

    getTaskIndex(id) {
        return this.tasks.findIndex((task) => task.id == id);
    };

    addTask(name) {
        let task = this.tasks.find((task) => task.name == name)

        if (!task) {
            let finalD = String(new Date().getTime()).slice(7);
            task = new Task(name, finalD);
            this.tasks.push(task);
            this.refreshTasks(this.tasks);
            this.updateLocalStorage();
        }
    };

    removeTask(id) {
        let index = this.getTaskIndex(id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            this.refreshTasks(this.tasks);
            this.updateLocalStorage();
        } else {
            console.log("Task does not exist");
        }
    };

    updateTask(id, newName) {
        let task = this.getTask(id);
        if (task) {
            task.name = newName;
            this.refreshTasks(this.tasks);
            this.updateLocalStorage();
        } else {
            console.log("Task does not exist");
        }
    };

    editThis(id) {
        let newName = prompt("Enter new name for the task:");
        if (newName) {
            this.updateTask(id, newName);
        }
    }

    refreshTasks() {
        tableBody.innerHTML = "";
        this.tasks.forEach((task, index) => {
            this.addTaskToScreen(task, index);
        });
    }

    addTaskToScreen(task, index) {
        // Determine the class for completed tasks
        let completeClass = task.complete ? 'completed' : '';

        // Create the element
        let row = /* html */`
            <tr class="todo-item" id="row${index}">
                <td class="todo-item-checkbox checkBox">
                    <input type="checkbox" onchange="taskManager.toggleIsComplete('${task.id}')" ${task.complete ? "checked" : ""}>
                </td>
                <td class="todo-item-complete is-complete ${completeClass}">${task.complete}</td>
                <td class="todo-item-name ${task.complete ? 'completed-name' : ''}">${task.name}</td>
                <td class="todo-item-created created">${task.creationDate}</td>
                <td class="todo-item-action"><button class="todo-item-edit" onclick="taskManager.editThis('${task.id}')">Edit</button>
                <button class="todo-item-delete" onclick="taskManager.removeTask('${task.id}')">Delete</button></td>
                <td class="todo-item-id id">${task.id}</td>
            </tr>
            `;
        // Append the child
        tableBody.innerHTML += row;
    }

    toggleIsComplete(id) {
        let task = this.getTask(id);
        if (task) {
            task.complete = !task.complete;
            this.refreshTasks(this.tasks);
            this.updateLocalStorage();
        }
    }

    updateLocalStorage() {
        localStorage.setItem("StoredList", JSON.stringify(this.tasks));
    }
}