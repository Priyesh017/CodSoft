// Select elements
const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const editPopup = document.getElementById("editPopup");
const editedTaskInput = document.getElementById("editedTask");
const saveEditedTaskButton = document.getElementById("saveEditedTask");
const cancelEditButton = document.getElementById("cancelEdit");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value;
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox">
                <span class="task">${taskText}</span>
            </div>
            <div>
                <button class="delete-btn">Delete</button>
                <button class="edit-btn">Edit</button>
            </div>
        `;
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";

        // Add event listeners for delete and edit buttons
        const deleteButton = li.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(li);
            updateLocalStorage();
        });

        const editButton = li.querySelector(".edit-btn");
        editButton.addEventListener("click", function () {
            editedTaskInput.value = li.querySelector(".task").textContent;
            editPopup.style.display = "flex";
            editedTaskInput.focus();

            // Save edited task on button click
            saveEditedTaskButton.onclick = function () {
                li.querySelector(".task").textContent = editedTaskInput.value;
                editPopup.style.display = "none";
                updateLocalStorage();
            };

            // Cancel edit on button click
            cancelEditButton.onclick = function () {
                editPopup.style.display = "none";
            };
        });

        updateLocalStorage();
    }
}

// Function to update local storage with task list
function updateLocalStorage() {
    const tasks = [];
    const taskElements = taskList.querySelectorAll("li");
    taskElements.forEach((element) => {
        tasks.push(element.querySelector(".task").textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" class="checkbox">
                <span class="task">${element}</span>
            </div>
            <div>
                <button class="delete-btn">Delete</button>
                <button class="edit-btn">Edit</button>
            </div>
        `;

        const deleteButton = li.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(li);
            updateLocalStorage();
        });

        const editButton = li.querySelector(".edit-btn");
        editButton.addEventListener("click", function () {
            editedTaskInput.value = li.querySelector(".task").textContent;
            editPopup.style.display = "flex";
            editedTaskInput.focus();

            // Save edited task on button click
            saveEditedTaskButton.onclick = function () {
                li.querySelector(".task").textContent = editedTaskInput.value;
                editPopup.style.display = "none";
                // Update local storage
                updateLocalStorage();
            };

            // Cancel edit on button click
            cancelEditButton.onclick = function () {
                editPopup.style.display = "none";
            };
        });

        taskList.appendChild(li);
    });
}

// Add task when the "Add" button is clicked
addTaskButton.addEventListener("click", addTask);

// Add task when Enter key is pressed in the input field
taskInput.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
        addTask();
    }
});

// Load tasks from local storage on page load
window.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage();
});
