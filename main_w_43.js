// store all Elements in variables

let enteredTxt = document.querySelector(".input");
let submitBtn = document.querySelector(".add");
let tasksContainer = document.querySelector(".tasks");
let mainList = [];


function restoreTasks() {
  let mainList = JSON.parse(localStorage.getItem("tasks"));
  if (mainList !== null) {
    for (let i = 0; i < mainList.length; i++) {
      //creating the task and add it to tasksContainer in DOM
      let task = document.createElement("div");
      task.title = mainList[i].title;
      task.textContent = `${mainList[i].title}`;
      task.id = `${mainList[i].id}`;
      task.className = "task";
      let deleteBtn = document.createElement("span");
      deleteBtn.textContent = "Delete";
      task.appendChild(deleteBtn);
      tasksContainer.appendChild(task);
      // if user clicked delete btn
      deleteBtn.addEventListener("click", function () {
        // remove the task from the mainList array
        let mainList = JSON.parse(localStorage.getItem("tasks"));
        let taskIndex = mainList.findIndex((obj) => obj.id === task.id);
        mainList.splice(taskIndex, 1);
        // update the localStorage with the updated mainList array
        localStorage.setItem("tasks", JSON.stringify(mainList));
        // remove the task from the DOM
        task.remove();
        if (mainList.length === 0) {
          window.localStorage.clear();
        }
      });
    }
  }
}


// check if the local storage already has elements
// if it has put them in tasksContainer
// else do not do anything
if (localStorage.getItem("tasks")) {
  restoreTasks();
}

// to create an object (task)
function addObj(id, title) {
  let myObj = {
    id: id,
    title: `${title}`,
  };
  return myObj;
}

// to store object (task) in local storage 
function addToLocalStorage(taskId, taskTitle) {
  // check if localStorage already has items
  if (localStorage.getItem("tasks")) {
    mainList = JSON.parse(localStorage.getItem("tasks"));
  }
  // add the new task to the mainList array
  mainList.push(addObj(taskId, taskTitle));
  // save the updated mainList array in localStorage
  localStorage.setItem("tasks", JSON.stringify(mainList));
}

// main function to create the task 
function createTask() {
  let task = document.createElement("div");
  task.title = enteredTxt.value;
  task.textContent = `${enteredTxt.value}`;
  task.id = `${Math.trunc(Math.random() * 12 ** 8)}`;
  task.className = "task";
  let deleteBtn = document.createElement("span");
  deleteBtn.textContent = "Delete";
  task.appendChild(deleteBtn);
  tasksContainer.appendChild(task);
  addToLocalStorage(task.id, task.title);
  // if delete btn clicked
  // add an event listener to the delete button
  if (deleteBtn.onclick) {
    deleteItem;
  }
  let deleteItem = deleteBtn.addEventListener("click", function () {
    // remove the task from the mainList array
    let mainList = JSON.parse(localStorage.getItem("tasks"));
    let taskIndex = mainList.findIndex((obj) => obj.id === task.id);
    mainList.splice(taskIndex, 1);
    // update the localStorage with the updated mainList array
    localStorage.setItem("tasks", JSON.stringify(mainList));
    // remove the task from the DOM
    task.remove();
    if (mainList.length === 0) {
      window.localStorage.clear();
    }
  });
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
  }
});
