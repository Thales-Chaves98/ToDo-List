const form = document.querySelector(".task-form");
const inputTxt = document.getElementById("input-task")

let taskTxt;

form.addEventListener("submit",  (event) => {
    event.preventDefault()
    taskTxt = inputTxt.value;
    console.log(taskTxt)
});