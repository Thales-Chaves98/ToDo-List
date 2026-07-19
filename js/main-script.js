const form = document.querySelector(".task-form");
const taskInput = document.getElementById("input-task");
const taskList = document.getElementById("tasks-container");

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

taskList.addEventListener("click", (event) => {
    const id = Number(event.target.dataset.id);

    if(event.target.classList.contains("delete-btn")){
        deleteTask(id);
        return;
    }
    if(event.target.classList.contains("edit-btn")){
        editTask(id);
        return;
    }
    if(event.target.classList.contains("save-btn")){
        const taskLi = event.target.closest(".task-item");
        const editInput = taskLi.querySelector(".edit-input");
        saveEditTask(id, editInput);
        return;
    }

});

taskList.addEventListener("change", (event) =>{
    const id = Number(event.target.dataset.id);

    if(event.target.matches("input[type='checkbox']")){
        toggleTask(id);
    };    
});

function renderTasks(){
    taskList.textContent = "";

    tasks.forEach((task) => {
        const taskLi = document.createElement("li");
        taskLi.classList.add("task-item");
        let taskContent;

        if(task.id === editingTaskId){
            taskContent = `
            <div class="task-info">
                <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
                <input class="edit-input" value="${task.taskName}" data-id="${task.id}">
            </div>
            <div class="task-controls">
                <button class="save-btn" data-id="${task.id}">
                <span class="material-symbols-outlined">save_as</span>
                <span class="btn-text">SALVAR</span>
                </button>

                <button class="delete-btn" data-id="${task.id}">
                <span class="material-symbols-outlined">delete_forever</span>
                <span class="btn-text">EXCLUIR</span>
                </button>
            </div>
        `;
        } else {
            taskContent = `
            <div class="task-info">
                <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
                <span class="task-name ${task.done ? 'completed' : ''}">${task.taskName}</span>
            </div>
            <div class="task-controls">
                <button class="edit-btn" data-id="${task.id}">
                <span class="material-symbols-outlined">edit</span>
                <span class="btn-text">EDITAR</span>
                </button>

                <button class="delete-btn" data-id="${task.id}">
                <span class="material-symbols-outlined">delete_forever</span>
                <span class="btn-text">EXCLUIR</span>
                </button>
            </div>
        `;
        };

        taskLi.innerHTML = taskContent
        taskList.appendChild(taskLi);
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
    refresh();
}

function deleteTask(taskId){
    tasks = tasks.filter((t) => {
        return t.id !== taskId;
    });

    if(editingTaskId === taskId){
        editingTaskId = null;
    }
    refresh();
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

function refresh(){
    saveTasks();
    renderTasks();
}

loadTasks();
renderTasks();