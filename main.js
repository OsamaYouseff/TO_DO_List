///// ----------------------------------------------  Global variables  ------------------------------------------------
let input = document.querySelector(".input");
let addBtn = document.querySelector(".add");
let outputSec = document.querySelector(".tasks");
let inputTasks = [];
let finalTasks = [];
///// ----------------------------------------------  Global variables  ----------------------------------------------------

///// ----------------------------------------------  secondary functions  -------------------------------------------------
function createRandomId() {
  let random = Math.floor(Math.random() * 10);
  let res = [];
  for (let i = 0; i < 8; i++) {
    res.push(random);
    random = Math.floor(Math.random() * 10);
  }
  return +res.join("");
}

function clearInput() {
  input.value = "";
}

function clearOutput() {
  outputSec.innerHTML = "";
}
///// ----------------------------------------------  secondary functions  ----------------------------------------------------

//// main functions

//// -----------------------------------------------  adding functions --------------------------------------------------------

function addTaskToFinalArr() {
  let myObjTask = {};
  myObjTask.id = `${createRandomId()}`;
  myObjTask.title = `${input.value}`;
  myObjTask.status = "incomplete";
  finalTasks.push(myObjTask);
}

function addFinalArrToLocalStorage() {
  if (window.localStorage.getItem("tasks")) {
    window.localStorage.clear();
    window.localStorage.setItem("tasks", JSON.stringify(finalTasks));
  } else {
    window.localStorage.setItem("tasks", JSON.stringify(finalTasks));
  }
}

function initializeTasks() {
  clearOutput();
  addToOutputSec();
  AddDeleteAllBtn();
  // Add event listeners to tasks for marking them as done or undone
  let tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    task.addEventListener("click", function () {
      this.classList.toggle("done");
      updateStatusInFinalTasks(this.id);
      addFinalArrToLocalStorage();
    });
  });
}

///// create task and it's children and add them to DOM tree
function addToOutputSec() {
  for (let i = 0; i < finalTasks.length; i++) {
    let myTask = document.createElement("div");
    let myTxt = document.createElement("p");
    myTxt.innerHTML = finalTasks[i].title;
    let deleteBtn = document.createElement("span");
    myTask.className = "task";
    myTask.id = finalTasks[i].id;
    if (finalTasks[i].status === "complete") {
      myTask.classList.add("done");
    }
    myTask.classList.add("animation-effect");
    deleteBtn.textContent = "remove";
    deleteBtn.className = "delete";
    /// appending to DOM
    myTask.append(myTxt);
    myTask.append(deleteBtn);
    outputSec.appendChild(myTask);
    //// update mark done for each element
    myTask.addEventListener("click", function () {
      this.classList.toggle("done");
      updateStatusInFinalTasks(this.id);
      addFinalArrToLocalStorage();
    });
  }
}

//// create DeleteAllBtn and add it to BOM tree
function AddDeleteAllBtn() {
  let deleteAllBtn = document.createElement("div");
  deleteAllBtn.innerHTML = "Delete all";
  deleteAllBtn.className = "delete-all";
  outputSec.appendChild(deleteAllBtn);
}

//// -----------------------------------------------  adding functions --------------------------------------------------------

//// -----------------------------------------------  removing functions ------------------------------------------------------
///// filter removed task from FinalTasks array
function removeTaskFromFinalTasks(deletedTaskId) {
  for (let i = 0; i < finalTasks.length; i++) {
    if (finalTasks[i].id === deletedTaskId) {
      finalTasks[i] = "";
    }
  }
  finalTasks = finalTasks.filter((e) => e !== "");
}

///// action of removing task from DOM after user click remove or [x]
function removeTaskFromDOM(elementId) {
  removeTaskFromFinalTasks(elementId);
  clearOutput();
  if (finalTasks.length > 0) {
    AddDeleteAllBtn();
  }
  addToOutputSec();
  addFinalArrToLocalStorage();
  if (finalTasks.length === 0) {
    window.localStorage.clear();
  }
  clearInput();
}

///// clear To-Do app
function removeAllTask() {
  finalTasks.length = 0;
  clearOutput();
  addFinalArrToLocalStorage();
  window.localStorage.clear();
}

//// -----------------------------------------------  removing functions --------------------------------------------------------

//// update status in FinalTasks Array
function updateStatusInFinalTasks(taskId) {
  for (let i = 0; i < finalTasks.length; i++) {
    if (finalTasks[i].id === taskId) {
      if (finalTasks[i].status === "complete") {
        finalTasks[i].status = "incomplete";
      } else {
        finalTasks[i].status = "complete";
      }
      break;
    }
  }
}

//// --------------------------------------------------------  main functions -----------------------------------------------------

//// run app conditions

//// import tasks from localStorage if there are any tasks
if (window.localStorage.getItem("tasks")) {
  finalTasks = JSON.parse(localStorage.getItem("tasks"));
  clearOutput();
  addToOutputSec();
  AddDeleteAllBtn();
  initializeTasks();
}

///// action of adding task to DOM after user click [add task]
function confirmAddingTask() {
  //// clear outputSec before updating elements
  addTaskToFinalArr();
  clearOutput();
  addToOutputSec();
  AddDeleteAllBtn();
  addFinalArrToLocalStorage();
  clearInput();
}

//// implement delete function or delete all function
document.addEventListener("click", function (e) {
  if (event.target.className === "delete") {
    let deletedTaskId = e.target.parentElement.id;
    removeTaskFromDOM(deletedTaskId);
  } else if (e.target.className === "delete-all") {
    removeAllTask();

  }
});

//// mark task done or undo after user click on it
if (finalTasks.length > 0) {
  let tasks = document.querySelectorAll(".task");
  tasks.forEach(function (task) {
    task.addEventListener("click", function () {
      this.classList.toggle("done");
      updateStatusInFinalTasks(this.id);
      addFinalArrToLocalStorage();
    });
  });
}

///// check if the input is not empty
let myFqn = (addBtn.onclick = function () {
  if (input.value.length === 0 || input.value === " ") {
    alert("please enter a task");
  } else {
    confirmAddingTask();
  }
});

// link addTask Btn with Enter btn in keyboard
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    myFqn();
  }
});

//// --------------------------------------------------------  dynamic number -----------------------------------------------------

let totalTasks = document.querySelector(".completed-tasks");
let completedTasks = document.querySelector(".completed-tasks");
let remindTasks = document.querySelector(".remind-tasks");
let task = document.querySelector(".task");
// let totalTasksNum = outputSec.children.length - 1  ;
// let completedTasksNum = task.classList.contains("done");
// let remindTasksNum = !task.classList.contains("done");

// console.log(totalTasksNum, completedTasksNum, remindTasksNum);

function changeStatus(
  totalTasksNum = 0,
  completedTasksNum = 0,
  remindTasksNum = 0
) {
  totalTasks.innerHTML = `To Dos: ${totalTasksNum}`;
  completedTasks.innerHTML = `completed: ${completedTasksNum}`;
  remindTasks.innerHTML = `${remindTasksNum} more to go!`;
}
