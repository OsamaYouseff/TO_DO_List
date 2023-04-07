// store all Elements in variables

let enteredTxt = document.querySelector(".input");
let submitBtn = document.querySelector(".add");
let tasksContainer = document.querySelector(".tasks");
let tasksList = [];

// check if the local storage already has elements
// if it has put them in tasksContainer
// else do not do anything
if (localStorage.getItem("tasks")) {
  restoreTasks();
}

function restoreTasks() {
  let tasksList = JSON.parse(localStorage.getItem("tasks"));
  if (tasksList !== null) {
    for (let i = 0; i < tasksList.length; i++) {
      //creating the task and add it to tasksContainer in DOM
      let task = document.createElement("div");
      task.title = tasksList[i].title;
      task.textContent = `${tasksList[i].title}`;
      task.id = `${tasksList[i].id}`;
      task.className = "task";
      let deleteBtn = document.createElement("span");
      deleteBtn.textContent = "X";
      //check if the task is completed or not
      // if true add class done to make it checked
      if (tasksList[i].status === "incomplete") {
        task.classList.add("done");
      }
      task.appendChild(deleteBtn);
      tasksContainer.appendChild(task);
      // if user clicked delete btn
      deleteBtn.addEventListener("click", function () {
        // remove the task from the tasksList array
        let tasksList = JSON.parse(localStorage.getItem("tasks"));
        let taskIndex = tasksList.findIndex((obj) => obj.id === task.id);
        tasksList.splice(taskIndex, 1);
        // update the localStorage with the updated tasksList array
        localStorage.setItem("tasks", JSON.stringify(tasksList));
        // remove the task from the DOM
        task.remove();
        if (tasksList.length === 0) {
          window.localStorage.clear();
        }
      });
    }
  }
  createDeleteAllBtn();
}

// to create an object (task)
function addObj(id, title) {
  let myObj = {
    id: id,
    title: `${title}`,
    status: "incomplete",
  };
  return myObj;
}

// to store object (task) in local storage
function addToLocalStorage(taskId, taskTitle) {
  // check if localStorage already has items
  if (localStorage.getItem("tasks")) {
    tasksList = JSON.parse(localStorage.getItem("tasks"));
  }
  // add the new task to the tasksList array
  tasksList.push(addObj(taskId, taskTitle));
  // save the updated tasksList array in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasksList));
}

// main function to create the task
function createTask() {
  let task = document.createElement("div");
  task.title = enteredTxt.value;
  task.textContent = `${enteredTxt.value}`;
  task.id = `${Math.trunc(Math.random() * 12 ** 8)}`;
  task.className = "task";
  let deleteBtn = document.createElement("span");
  deleteBtn.textContent = "X";
  task.appendChild(deleteBtn);
  tasksContainer.appendChild(task);
  addToLocalStorage(task.id, task.title);
  // if delete btn clicked
  // add an event listener to the delete button
  if (deleteBtn.onclick) {
    deleteItem;
  }
  let deleteItem = deleteBtn.addEventListener("click", function () {
    // remove the task from the tasksList array
    let tasksList = JSON.parse(localStorage.getItem("tasks"));
    let taskIndex = tasksList.findIndex((obj) => obj.id === task.id);
    tasksList.splice(taskIndex, 1);
    // update the localStorage with the updated tasksList array
    localStorage.setItem("tasks", JSON.stringify(tasksList));
    // remove the task from the DOM
    task.remove();
    if (tasksList.length === 0) {
      window.localStorage.clear();
    }
  });
  createDeleteAllBtn();
}

let myFqn = (submitBtn.onclick = function () {
  if (enteredTxt.value.length > 0) {
    createTask();
    enteredTxt.value = "";
  } else {
    window.alert("Please Add Task Name");
  }
});

// link addTask Btn with Enter btn in keyboard
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    myFqn();
  }
});

let allTasks = document.querySelectorAll(".tasks .task");

// if you make the code below active you must make refresh to the page before make the function done

// for (let i = 0; i < allTasks.length; i++) {
//   allTasks[i].addEventListener("click", function () {
//     this.classList.toggle("done");
//   });
// }

// this th solution fo this this problem

tasksContainer.addEventListener("click", function (event) {
  // check if the clicked element is a task
  if (event.target.classList.contains("task")) {
    // toggle the "done" class on the clicked task
    event.target.classList.toggle("done");

    changeStatus();
  }
});

function changeStatus() {
  let tasksList = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasksList.length; i++) {
    console.log(tasksList[i].status);
    if (tasksList[i].status === "incomplete") {
      tasksList[i].status = "complete";
    } else {
      tasksList[i].status = "incomplete";
    }
  }
  // update the localStorage with the updated tasksList array
  localStorage.setItem("tasks", JSON.stringify(tasksList));
}
