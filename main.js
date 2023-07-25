///// ----------------------------------------------  Global variables  ------------------------------------------------
let input = document.querySelector(".input");
let addBtn = document.querySelector(".add");
let outputSec = document.querySelector(".tasks");
let inputTasks = [];
let finalTasks = [];
///// ----------------------------------------------  Global variables  ----------------------------------------------------

//// -------------------------------------------------------- Updating status numbers dynamically  -----------------------------------------------------

let totalTasksContainer = document.getElementById("total-tasks");
let completedTasksContainer = document.getElementById("completed-tasks");
let remindTasksContainer = document.getElementById("remind-tasks");

function dynamicChangingNumbers() {
  let allTasks = Array.from(document.querySelectorAll(".task"));

  //// changing all tasks number
  let totalTasksNumber = allTasks.length;
  totalTasksContainer.textContent = `To Dos : ${totalTasksNumber} `;

  //// changing completed tasks
  let compTasksNumber = Array.from(document.querySelectorAll(".done")).length;
  completedTasksContainer.textContent = ` Completed: ${compTasksNumber}`;

  //// changing remind tasks
  let remindNumber = allTasks.length - compTasksNumber;
  remindTasksContainer.textContent = `${remindNumber} more to go! `;
}

dynamicChangingNumbers();

//// -------------------------------------------------------- Updating status numbers dynamically  -----------------------------------------------------

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
  dynamicChangingNumbers();
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
  dynamicChangingNumbers();
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
  dynamicChangingNumbers();
}

///// clear To-Do app
function removeAllTask() {
  finalTasks.length = 0;
  clearOutput();
  addFinalArrToLocalStorage();
  window.localStorage.clear();
  dynamicChangingNumbers();
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
  dynamicChangingNumbers();
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
  dynamicChangingNumbers();
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
  dynamicChangingNumbers();
}

//// implement delete function or delete all function
document.addEventListener("click", function (e) {
  if (event.target.className === "delete") {
    let deletedTaskId = e.target.parentElement.id;
    removeTaskFromDOM(deletedTaskId);
    dynamicChangingNumbers();
  } else if (e.target.className === "delete-all") {
    if (confirm("Are you sure that you want to delete all tasks ?  ")) {
      removeAllTask();
      dynamicChangingNumbers();
    }
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
      dynamicChangingNumbers();
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
    dynamicChangingNumbers();
  }
});

//// --------------------------------------------------------  main functions -----------------------------------------------------
