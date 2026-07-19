const form = document.querySelector(".task-form");
const taskInput = document.getElementById("input-task");

let tasks = [];
let nextId = 1;

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
    taskInput.value = "";
    nextId++;
    renderTasks();
    
});

function renderTasks(){
    const listContainer = document.getElementById("tasks-container");
    listContainer.textContent = "";

    tasks.forEach((task) => {
        const taskLi = document.createElement("li");
        taskLi.classList.add("task-item")
        taskLi.innerHTML = `
            <input type="checkbox" data-id="${task.id}" ${task.done ? "checked" : ""}>
            <span class="task-name">${task.taskName}</span>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        `;
        listContainer.appendChild(taskLi);

        const checkbox = taskLi.querySelector("input");
        checkbox.addEventListener("change", () => {
            task.done = !task.done;
            renderTasks();
            console.log(task.id + " " + task.done);
        });
    });
}
