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
  totalTasksContainer.innerHTML = `To Dos : <span id = "status-num">${totalTasksNumber}</span> `;

  //// changing completed tasks
  let compTasksNumber = Array.from(document.querySelectorAll(".done")).length;
  completedTasksContainer.innerHTML = ` Completed: <span id = "status-num">${compTasksNumber}</span>`;

  //// changing remind tasks
  let remindNumber = allTasks.length - compTasksNumber;
  remindTasksContainer.innerHTML = `<span id = "status-num">${remindNumber}</span> more to go! `;
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

//// -----------------------------------------------  time functions --------------------------------------------------------

function checkLess10(num) {
  return num < 10 ? "0" + num : num;
}

function from24hTo12h(time) {
  time = time.split(":");
  let hours = checkLess10(+time[0]);
  if (hours < 12) {
    time = hours + ":" + time[1] + " AM";
  } else if (hours === 12) {
    time = hours + ":" + time[1] + " PM";
  } else if (hours === 24) {
    hours -= 12;
    hours = checkLess10(hours);
    time = hours + ":" + time[1] + " AM";
  } else {
    hours -= 12;
    hours = checkLess10(hours);
    time = hours + ":" + time[1] + " PM";
  }
  return time;
}

function getDateNow() {
  let date = new Date();
  let finalTime = `${date}`.split(" ").slice(0, 5);
  let time = finalTime.at(-1).split(":");
  time = time.slice(0, 2).join(":");
  time = from24hTo12h(time);
  finalTime[4] = time;
  return finalTime.join(" ");
}

//// -----------------------------------------------  time functions --------------------------------------------------------

//// -----------------------------------------------  adding functions --------------------------------------------------------

function addTaskToFinalArr() {
  let myObjTask = {};
  myObjTask.id = `${createRandomId()}`;
  myObjTask.title = `${input.value}`;
  myObjTask.status = "incomplete";
  myObjTask.time = getDateNow();
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
  addTaskToDOM();
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
function addTaskToDOM() {
  for (let i = 0; i < finalTasks.length; i++) {
    let myTask = document.createElement("div");
    let taskInfo = document.createElement("div");
    taskInfo.classList = "task-info";

    let num = document.createElement("span");
    num.classList = "num";
    num.textContent = `(${i + 1}) : `;

    let title = document.createElement("span");
    title.classList = "title";
    title.innerHTML = finalTasks[i].title;

    let time = document.createElement("div");
    time.classList = "time";
    time.textContent = finalTasks[i].time;

    let btnContainer = document.createElement("div");
    btnContainer.classList = "btns";

    let deleteBtn = document.createElement("span");
    let editBtn = document.createElement("button");

    myTask.className = "task";
    myTask.id = finalTasks[i].id;
    if (finalTasks[i].status === "complete") {
      myTask.classList.add("done");
    }
    myTask.classList.add("animation-effect");

    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.id = "edit";

    deleteBtn.textContent = "Remove";
    deleteBtn.className = "delete";
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    /// appending to DOM
    taskInfo.append(num);
    taskInfo.append(title);
    taskInfo.append(time);
    myTask.append(taskInfo);

    myTask.append(btnContainer);

    outputSec.prepend(myTask);

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
  addTaskToDOM();
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

//// --------------------------------------------------------  Edit functions -----------------------------------------------------

///// DOM elements
let popUpWindow = document.getElementById("edit-window");
let editNameInput = document.getElementById("change-name");
let changeBtn = document.getElementById("change");
let cancelBtn = document.getElementById("cancel");
let editBtn = document.getElementById("edit");

/////------------------------------------------

function hideEditWindow() {
  popUpWindow.classList.remove("show");
  popUpWindow.classList.add("hide");
}

function showEditWindow() {
  popUpWindow.classList.remove("hide");
  popUpWindow.classList.add("show");
}

function getNewName() {
  return editNameInput.value;
}
function clearEditInput() {
  editNameInput.value = "";
}
/////------------------------------------------

/////// Editing task name Technique
document.addEventListener("click", function (e) {
  if (event.target.id === "edit") {
    editNameInput.focus();

    let currentId = event.target.parentElement.parentElement.id;

    showEditWindow();

    document.addEventListener("click", function (e) {
      if (event.target.id === "change") {
        for (task of finalTasks) {
          if (task.id === currentId) {
            let newName = getNewName();
            if (newName == "") {
              return 0;
            } else {
              task.title = newName;
              clearEditInput();
              updateTaskName();
            }
            currentId = "";
          }
        }

        hideEditWindow();
      }
    });
  } else if (event.target.id === "cancel") {
    hideEditWindow();
  }
  return 0;
});

//// --------------------------------------------------------  Edit functions -----------------------------------------------------

//// --------------------------------------------------------  main functions -----------------------------------------------------

//// run app conditions

//// import tasks from localStorage if there are any tasks
if (window.localStorage.getItem("tasks")) {
  finalTasks = JSON.parse(localStorage.getItem("tasks"));
  clearOutput();
  addTaskToDOM();
  AddDeleteAllBtn();
  initializeTasks();
  dynamicChangingNumbers();
}

///// action of adding task to DOM after user click [add task]
function confirmAddingTask() {
  //// clear outputSec before updating elements
  addTaskToFinalArr();
  clearOutput();
  addTaskToDOM();
  AddDeleteAllBtn();
  addFinalArrToLocalStorage();
  clearInput();
  dynamicChangingNumbers();
}

function updateTaskName() {
  clearOutput();
  addTaskToDOM();
  AddDeleteAllBtn();
  addFinalArrToLocalStorage();
}

//// implement delete function or delete all function
document.addEventListener("click", function (e) {
  if (event.target.className === "delete") {
    let deletedTaskId = e.target.parentElement.parentElement.id;
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
      //// ignore mark done if user doesn't click the  task
      if (event.target.classList[0] !== "task") {
        return 0;
      }
      this.classList.toggle("done");
      updateStatusInFinalTasks(this.id);
      addFinalArrToLocalStorage();
      dynamicChangingNumbers();
    });
  });
}

///// check if the input is empty or not
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
