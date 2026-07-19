const form = document.querySelector(".task-form");
const taskInput = document.getElementById("input-task");

let tasks = [];
let nextId = 1;

let editingTaskId = null;

form.addEventListener("submit",  (event) => {
    event.preventDefault();

    const done = false;
    const taskName = taskInput.value.trim();
    
    if(taskName === ""){
        return;
    }
    const task = {
        id: nextId,
        taskName,
        done,
    };
    tasks.push(task);
    nextId++;
    saveTasks();
    taskInput.value = "";
    renderTasks();
    
});

function renderTasks(){
    const listContainer = document.getElementById("tasks-container");
    listContainer.textContent = "";

    tasks.forEach((task) => {
        const taskLi = document.createElement("li");
        taskLi.classList.add("task-item");
        let taskContent;

        if(task.id === editingTaskId){
            taskContent = `
            <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
            <input class="edit-input" value="${task.taskName}">
            <button class="save-btn">Salvar</button>
            <button class="delete-btn">Excluir</button>
        `;
        } else {
            taskContent = `
            <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
            <span class="task-name">${task.taskName}</span>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        `;
        };

        taskLi.innerHTML = taskContent
        listContainer.appendChild(taskLi);

        const editInput = taskLi.querySelector(".edit-input");
        const checkbox = taskLi.querySelector('input[type="checkbox"]');
        if(checkbox){
            checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });
        };

        const deleteBtn = taskLi.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        const editBtn = taskLi.querySelector(".edit-btn");
        if(editBtn){
            editBtn.addEventListener("click", () => {
            editTask(task.id);
        });
        };

        const saveBtn = taskLi.querySelector(".save-btn");
        if(saveBtn){
            saveBtn.addEventListener("click", () => {
                saveEditTask(task.id, editInput);
            });
        };
    });
}

function toggleTask(taskId){
    const t = tasks.find((item) => {
        return item.id === taskId;
    });
    if(!t){
        return;
    };
    t.done = !t.done;
    saveTasks();
    renderTasks();
}

function deleteTask(taskId){
    tasks = tasks.filter((t) => {
        return t.id !== taskId;
    });

    if(editingTaskId === taskId){
        editingTaskId = null;
    }
    saveTasks();
    renderTasks();
}

function editTask(taskId){
    editingTaskId = taskId;
    renderTasks();
}

function saveEditTask(taskId, editInput){
    const t = tasks.find((item) => {
        return item.id === taskId;
    });

    if(!t){
        return;
    }

    const newTaskName = editInput.value.trim();
    if(newTaskName ===""){
        return;
    }
    t.taskName = newTaskName;
    editingTaskId = null;

    saveTasks();
    renderTasks();
}

function updateNextId(){
    if(tasks.length === 0){
        nextId = 1;
        return;
    }

    const maxId = Math.max(...tasks.map((t) => {
        return t.id;
    }));

    nextId = maxId + 1;
}

function saveTasks(){
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}

function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        updateNextId();
    }
}

loadTasks();
renderTasks();