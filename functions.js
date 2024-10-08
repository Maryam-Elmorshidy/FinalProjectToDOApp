import {
  activeElementDesktop,
  activeElementMobile,
  allElementDesktop,
  allElementMobile,
  completedElementDesktop,
  completedElementMobile,
  container,
  iconTheme,
  inputElement,
  listTasks,
  numItems,
  titleHeaderElement,
} from "./elements";

// Functions of theme mode
export const themeFunc = () => {
  container.classList.toggle("dark-background");
  inputElement.classList.toggle("dark-background");
  document.body.classList.toggle("darktheme");
  titleHeaderElement.classList.toggle("dark-background");

  if (container.classList.contains("dark-background")) {
    iconTheme.src = "../images/icon-sun.svg";
    localStorage.setItem("theme", "dark");
  } else {
    iconTheme.src = "../images/icon-moon.svg";
    localStorage.setItem("theme", "light");
  }
};

export const applyTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    container.classList.add("dark-background");
    inputElement.classList.add("dark-background");
    document.body.classList.add("darktheme");
    titleHeaderElement.classList.add("dark-background");
    iconTheme.src = "../images/icon-sun.svg";
  } else {
    container.classList.remove("dark-background");
    inputElement.classList.remove("dark-background");
    document.body.classList.remove("darktheme");
    titleHeaderElement.classList.remove("dark-background");
    iconTheme.src = "../images/icon-moon.svg";
  }
};

// drag and drop function
export const funcDragAndDrop = () => {
  const taskList = document.querySelector(".list");
  let draggedTask = null;

  taskList.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("card__list--item")) {
      draggedTask = e.target;
    }
  });

  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  taskList.addEventListener("drop", (e) => {
    e.preventDefault();
    if (draggedTask) {
      const dropTarget = e.target.closest(".card__list--item");
      if (dropTarget && dropTarget !== draggedTask) {
        taskList.insertBefore(draggedTask, dropTarget);
      } else {
        taskList.appendChild(draggedTask);
      }
    }
    orderTasksToStorage();
    addTasksToStorage("AllTasks", arrayOfTasks);
  });
};

// function to order Tasks To Storage after Darg&drog
const orderTasksToStorage = () => {
  let orderedArrayOfTasks = [];
  const orderTasks = document.querySelectorAll(".card__list--item");
  orderTasks.forEach((task) => {
    const taskId = parseInt(task.getAttribute("data-id"), 10);
    const addedTask = arrayOfTasks.find((item) => item.id === taskId);
    if (addedTask) {
      orderedArrayOfTasks.push(addedTask);
    }
  });
  if (
    arrayOfTasks.length === orderedArrayOfTasks.length ||
    allElementDesktop.classList.contains("active__title") ||
    allElementMobile.classList.contains("active__title")
  ) {
    arrayOfTasks = orderedArrayOfTasks;
  }
};

// save in local storage
const addTasksToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// functions do add tasks
export const addTasks = () => {
  let valueTask = inputElement.value;
  if (!valueTask) {
    alert("please enter your todo ");
  } else {
    addTaskToArray(valueTask);
    inputElement.value = "";
  }
  numItemsLeft();
};

let arrayOfTasks = [];
if (localStorage.getItem("AllTasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("AllTasks"));
}

const addTaskToArray = (yourTask) => {
  let taskArray = {
    id: new Date().getTime(),
    title: yourTask,
    completed: false,
  };
  arrayOfTasks.push(taskArray);

  showElementsInToDo(arrayOfTasks);
  addTasksToStorage("AllTasks", arrayOfTasks);
};

const showElementsInToDo = (arrayOfTasks) => {
  listTasks.innerHTML = "";

  let taskList = "";

  arrayOfTasks.forEach((task) => {
    const stylecompletedtask = task.completed ? "active__item" : "";
    const stylecompletedimg = task.completed ? "active__img" : "";

    taskList += `<div class="card__list--item " data-id="${task.id}" draggable="true">
               <div class="card__list--item--task ${stylecompletedtask}">
                 <div class="card__list--item--img">
                  <img
                    class="card__list--img ${stylecompletedimg}"
                    src="./images/icon-check.svg"
                  />
                 </div>
                 ${task.title}
               </div>
               <img src="./images/icon-cross.svg" class="card__list--img--X" />
             </div>`;
  });

  listTasks.innerHTML = taskList;
  funcDragAndDrop();
  allElementDesktop.classList.add("active__title");
  activeElementDesktop.classList.remove("active__title");
  completedElementDesktop.classList.remove("active__title");
};

// get from local storage
const getDataFromStorage = (key) => {
  let Data = localStorage.getItem(key);
  if (Data) {
    let tasks = JSON.parse(Data);

    showElementsInToDo(tasks);
  }
};

getDataFromStorage("AllTasks");

// Desktop
// function All element to show All tasks
export const showAllFuncDesktop = () => {
  showElementsInToDo(arrayOfTasks);

  allElementDesktop.classList.add("active__title");
  activeElementDesktop.classList.remove("active__title");
  completedElementDesktop.classList.remove("active__title");
};

// function Active element to show uncompleted tasks
export const showActiveFuncDesktop = () => {
  let activeTasks = [];
  arrayOfTasks.forEach((task) => {
    if (!task.completed) {
      activeTasks.push(task);
    }
    showElementsInToDo(activeTasks);
  });
  //   getDataFromStorage("activeTasks");
  allElementDesktop.classList.remove("active__title");
  activeElementDesktop.classList.add("active__title");
  completedElementDesktop.classList.remove("active__title");
};

// function completed element to show completed tasks
export const showCompleteFuncDesktop = () => {
  let completedTasks = [];
  arrayOfTasks.forEach((task) => {
    if (task.completed) {
      completedTasks.push(task);
    }
    showElementsInToDo(completedTasks);
  });
  allElementDesktop.classList.remove("active__title");
  activeElementDesktop.classList.remove("active__title");
  completedElementDesktop.classList.add("active__title");
};

// Mobile
// function All element to show All tasks
export const showAllFuncMobile = () => {
  showElementsInToDo(arrayOfTasks);

  allElementMobile.classList.add("active__title");
  activeElementMobile.classList.remove("active__title");
  completedElementMobile.classList.remove("active__title");
};

// function Active element to show uncompleted tasks
export const showActiveFuncMobile = () => {
  let activeTasks = [];
  arrayOfTasks.forEach((task) => {
    if (!task.completed) {
      activeTasks.push(task);
    }
    showElementsInToDo(activeTasks);
  });
  allElementMobile.classList.remove("active__title");
  activeElementMobile.classList.add("active__title");
  completedElementMobile.classList.remove("active__title");
};

// function completed element to show completed tasks
export const showCompleteFuncMobile = () => {
  let completedTasks = [];
  arrayOfTasks.forEach((task) => {
    if (task.completed) {
      completedTasks.push(task);
    }
    showElementsInToDo(completedTasks);
  });
  allElementMobile.classList.remove("active__title");
  activeElementMobile.classList.remove("active__title");
  completedElementMobile.classList.add("active__title");
};

// function delete task
export const deleteTaskFunc = (e) => {
  if (e.target.classList.contains("card__list--img--X")) {
    const taskDel = e.target.parentElement;
    taskDel.remove();

    const idTask = taskDel.getAttribute("data-id");
    removeDataStorage(idTask);
  }
};

const removeDataStorage = (idTask) => {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != idTask);

  addTasksToStorage("AllTasks", arrayOfTasks);
};

// function check completed task
export const checkCompletedFunc = (e) => {
  if (e.target.classList.contains("card__list--img")) {
    e.target.classList.toggle("active__img");
    e.target.parentElement.parentElement.classList.toggle("active__item");

    let completedTask = e.target.parentElement.parentElement.parentElement;
    let idCompletedTask = completedTask.getAttribute("data-id");
    completedDataInStorage(idCompletedTask);
  }
  numItemsLeft();
};

const completedDataInStorage = (idTask) => {
  let numTask = JSON.parse(idTask);
  let task = arrayOfTasks.find((task) => task.id === numTask);
  if (task) {
    task.completed = !task.completed;
    addTasksToStorage("AllTasks", arrayOfTasks);
  }
};

// function clear completed Tasks
export const clearCompletedFunc = () => {
  const allTasks = document.querySelectorAll(".card__list--item--task");

  allTasks.forEach((task) => {
    if (task.classList.contains("active__item")) {
      let completedTask = task.parentElement;
      completedTask.remove();

      const idTask = completedTask.getAttribute("data-id");
      removeDataStorage(idTask);
    }
  });
};

// return numbers of tasks left
export const numItemsLeft = () => {
  let numItemCounter = 0;
  arrayOfTasks.forEach((task) => {
    if (!task.completed) {
      numItemCounter += 1;
    }
  });
  numItems.innerHTML = numItemCounter;
  if (!arrayOfTasks) {
    numItems.innerHTML = 0;
  }
};
