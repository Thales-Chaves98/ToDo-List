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

    console.log(tasks)
});

function renderTask(){

}