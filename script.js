import {
  activeElementDesktop,
  activeElementMobile,
  allElementDesktop,
  allElementMobile,
  cardListElement,
  clearCompletedElement,
  completedElementDesktop,
  completedElementMobile,
  iconTheme,
  inputElement,
} from "./elements.js";
import {
  addTasks,
  applyTheme,
  checkCompletedFunc,
  clearCompletedFunc,
  deleteTaskFunc,
  numItemsLeft,
  showActiveFuncDesktop,
  showActiveFuncMobile,
  showAllFuncDesktop,
  showAllFuncMobile,
  showCompleteFuncDesktop,
  showCompleteFuncMobile,
  themeFunc,
} from "./functions.js";

document.addEventListener("DOMContentLoaded", () => {
  //  Theme mode
  iconTheme.addEventListener("click", (e) => {
    e.preventDefault();
    themeFunc();
  });
  applyTheme();

  //   Add task
  inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTasks();
    }
  });

  //   Delete task
  cardListElement.addEventListener("click", deleteTaskFunc);

  //   check completed task
  cardListElement.addEventListener("click", (e) => {
    checkCompletedFunc(e);
  });

  // clear completed tasks
  clearCompletedElement.addEventListener("click", clearCompletedFunc);

  // Desktop
  // click on Active element to show Alltasks
  if (allElementDesktop) {
    allElementDesktop.addEventListener("click", showAllFuncDesktop);
  }
  // click on Active element to show uncompleted tasks
  if (activeElementDesktop) {
    activeElementDesktop.addEventListener("click", showActiveFuncDesktop);
  }
  // click on Active element to show completed tasks
  if (completedElementDesktop) {
    completedElementDesktop.addEventListener("click", showCompleteFuncDesktop);
  }

  // Mobile
  // click on Active element to show Alltasks
  if (allElementMobile) {
    allElementMobile.addEventListener("click", showAllFuncMobile);
  }

  // click on Active element to show uncompleted tasks
  if (activeElementMobile) {
    activeElementMobile.addEventListener("click", showActiveFuncMobile);
  }

  // click on Active element to show completed tasks
  if (completedElementMobile) {
    completedElementMobile.addEventListener("click", showCompleteFuncMobile);
  }

  // show numbers of items left
  numItemsLeft();
});

// [x] HTML & CSS & Responsive
// [x] theme mode
// [x] add tasks
// [x] make tasks ==> completed
// [x] delete one task (x)
// [x] delete completed tasks
// [x] filtering tasks ( All - completed - Active )
// [x] save data in localstorage
// [x] drag & drop
// [x] calculate number of tasks
// [x] problem of dimentions of page (new problem)
// [x] save theme
// [x] Remaining problems
// [x] testing (me and other)
