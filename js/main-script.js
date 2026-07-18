const form = document.querySelector(".task-form");
const taskInput = document.getElementById("input-task")

const tasks = [];

form.addEventListener("submit",  (event) => {
    event.preventDefault()

    const done = false;
    const taskName = taskInput.value.trim();
    
    if(taskName === ""){
        console.log("vazio")
        return
    }
    const task = {
        taskName,
        done,
    };
    tasks.push(task)
    taskInput.value = "";
    renderTasks();
});

function renderTasks(){
    const listContainer = document.getElementById("tasks-container")
    listContainer.innerHTML = "";

    tasks.forEach((task) => {
        const taskLi = document.createElement("li");
        taskLi.innerHTML = `
        ${task.taskName}
        `;
        listContainer.appendChild(taskLi)
    })
}
