const addTask = document.getElementById("add-task");
const emptyTaskLight = document.getElementById("empty-task-light");
const emptyTaskDark = document.getElementById("empty-task-dark");
const taskInformation = document.getElementById("task-information");
const tag = document.getElementById("tag");
const imgTagLight = document.getElementById("img-tag-light");
const imgTagDark = document.getElementById("img-tag-dark");
const downMiddleUp = document.getElementById("down-middle-up");
const finalAdd = document.getElementById("final-add");
const taskAdded = document.getElementById("task-added");
const down = document.getElementById("down");
const middle = document.getElementById("middle");
const up = document.getElementById("up");
const navar = document.getElementById("navar");
const mobileBar = document.getElementById("mobile-bar");
const tagName = document.getElementById("tag-name");
const taskName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const taskName2 = document.getElementById("task-name-2");
const taskDescription2 = document.getElementById("task-description-2");
const taskList = document.getElementById("task-list");
const selectedTag = document.getElementById("selected-tag");
const notAdded = document.getElementById("not-added");
const mobileMenuCloseButton = document.getElementById("close-button");
const mobileMenu = document.getElementById("mobile-menu");
const hamburgerButton = document.getElementById("hamburger-button");
const light = document.getElementsByClassName("light-mode");
const dark = document.getElementsByClassName("dark-mode");
const taskDoneList = document.getElementById("task-done-list");
const taskDoneListBanner = document.getElementById("task-done-list-banner");
const tasksBanner = document.getElementById("tasks-banner");

let selectedTagValue = null;
let selectedTagPriority = 0;
let editingIndex = null;
let taskId = 0;

const tasksArray = [];
const doneTasksArray = [];

mobileMenuCloseButton.addEventListener("click", () => {
  mobileMenu.style.display = "none";
});

hamburgerButton.addEventListener("click", () => {
  mobileMenu.style.display = "block";
});

const darkMode = () => {
  document.documentElement.classList.add("dark");
  updateDark();
};

dark[0].addEventListener("click", darkMode);
dark[1].addEventListener("click", darkMode);

const lightMode = () => {
  document.documentElement.classList.remove("dark");
  updateDark();
};

light[0].addEventListener("click", lightMode);
light[1].addEventListener("click", lightMode);

function resetForm() {
  taskInformation.style.display = "none";
  taskName.value = "";
  taskDescription.value = "";
  tagName.innerText = "";
  tagName.style.backgroundColor = "";
  tagName.style.color = "";
  selectedTag.style.display = "none";
  selectedTagValue = null;
  selectedTagPriority = 0;
  downMiddleUp.style.display = "none";
  imgTagLight.src = "./assets/img/tag-right.svg";
  imgTagDark.src = "./assets/img/tag-right-dark.svg";
  editingIndex = null;
  finalAdd.innerText = "اضافه کردن تسک";
}

function selectTag(value, bgColor, textColor, grade) {
  const isDark = document.documentElement.classList.contains("dark");

  if (value === "پایین") {
    bgColor = isDark ? "#233332" : "#c3fff1";
    textColor = isDark ? "#02e1a2" : "#11a483";
  } else if (value === "متوسط") {
    bgColor = isDark ? "#302f2d" : "#ffefd6";
    textColor = "#ffaf37";
  } else if (value === "بالا") {
    bgColor = isDark ? "#3d2327" : "#ffe2db";
    textColor = "#ff5f37";
  }

  if (selectedTagValue === value) {
    selectedTag.style.display = "none";
    selectedTagValue = null;
    selectedTagPriority = 0;
    return;
  }

  navar.style.backgroundColor = textColor;
  tagName.innerText = value;
  tagName.style.backgroundColor = bgColor;
  tagName.style.color = textColor;

  selectedTag.innerText = value;
  selectedTag.style.backgroundColor = bgColor;
  selectedTag.style.color = textColor;
  selectedTag.className = "rounded-md w-fit pt-1 pb-1 pl-2 pr-2 mt-2";
  selectedTag.style.display = "inline-block";

  selectedTagValue = value;
  selectedTagPriority = grade;
}

function createTaskElement(task, index) {
  const { name, desc, tagText, tagColor, tagFontColor, navarColor, isDone } =
    task;

  const isDark = document.documentElement.classList.contains("dark");

  const taskElement = document.createElement("li");
  taskElement.className =
    "relative bg-white p-4 w-11/12 mr-4 mt-5 rounded-xl border shadow-[0_4px_58.5px_0_rgba(0,0,0,0.06)] dark:bg-dark-background-div";

  taskElement.innerHTML = `
    <div class="absolute top-2 right-0 h-[88%] sm:h-[80%] w-1 rounded-tl-lg rounded-bl-lg" style="background-color: ${navarColor};"></div>
    <img src="${
      isDone ? "./assets/img/tabler_trash-x.svg" : "./assets/img/3noghte.svg"
    }" class="absolute top-4 left-3 cursor-pointer" id="action" data-type="menu-icon"/>
    <div class="flex items-start gap-3 flex-nowrap">
      <input id="isDone" type="checkbox" class="mt-2 flex-shrink-0" ${
        isDone ? "checked" : ""
      }/>
      <div class="min-w-0 flex-1 overflow-hidden">
        <div class="flex flex-wrap items-center gap-2">
         <h2 class="text-base font-semibold whitespace-nowrap ${
           isDone ? "line-through" : ""
         } ${isDark ? "text-white" : "text-black"}">${name}</h2>
          ${
            !isDone
              ? `<div class="rounded-md px-2 py-1 text-sm whitespace-nowrap" style="background-color: ${tagColor}; color: ${tagFontColor};">${tagText}</div>`
              : ""
          }
        </div>
        <p class="break-words text-light-gray-text mt-1">${desc}</p>
      </div>
      <div class="flex-shrink-0 ml-auto mt-4">
        <div class="hidden border rounded-lg shadow-[0_12px_24px_0_rgba(20,20,25,0.06)] p-1 gap-2" id="trash-edit">
          <img src="./assets/img/tabler_trash-x.svg" class="cursor-pointer delete-task"  data-type="trash"/>
          <div class="w-[1px] bg-[#ebedef]"></div>
          ${
            !isDone
              ? `<img src="./assets/img/tabler_edit.svg" class="cursor-pointer edit-task" data-type="edit"/>`
              : ""
          }
        </div>
      </div>
    </div>
  `;

  const actionBtn = taskElement.querySelector("#action");
  const trashEdit = taskElement.querySelector("#trash-edit");

  actionBtn.addEventListener("click", () => {
    trashEdit.style.display =
      trashEdit.style.display === "flex" ? "none" : "flex";
  });

  if (!isDone) {
    taskElement.querySelector(".edit-task").addEventListener("click", () => {
      editTask(index);
    });
    taskElement.querySelector("#isDone").addEventListener("change", () => {
      doneTask(task.id);
    });
    taskElement.querySelector(".delete-task").addEventListener("click", () => {
      removeTask(task.id);
    });
  } else {
    taskElement.querySelector(".delete-task").addEventListener("click", () => {
      removeDoneTask(task.id);
    });
  }

  return taskElement;
}

function handleAddTask() {
  const id = taskId;
  const name = taskName.value.trim();
  const desc = taskDescription.value.trim();
  const tagText = tagName.innerText;
  const tagColor = tagName.style.backgroundColor;
  const tagFontColor = tagName.style.color;
  const navarColor = navar.style.backgroundColor;

  if (!name || !desc || !tagText) {
    alert("لطفاً تمام فیلدها را پر کنید.");
    return;
  }

  const task = {
    id,
    name,
    desc,
    tagText,
    tagColor,
    tagFontColor,
    navarColor,
    priority: selectedTagPriority,
    isDone: false,
  };

  if (editingIndex !== null) {
    tasksArray[editingIndex] = task;
    editingIndex = null;
  } else {
    tasksArray.push(task);
    taskId++;
  }

  tasksArray.sort((a, b) => b.priority - a.priority);

  renderTasks();
  resetForm();
}

function editTask(index) {
  const task = tasksArray[index];
  editingIndex = index;

  taskInformation.style.display = "flex";
  emptyTaskLight.style.display = "none";
  emptyTaskDark.style.display = "none";
  taskAdded.style.display = "none";
  notAdded.style.display = "none";
  finalAdd.innerText = "ویرایش تسک";

  taskName.value = task.name;
  taskDescription.value = task.desc;

  tagName.innerText = task.tagText;
  tagName.style.backgroundColor = task.tagColor;
  tagName.style.color = task.tagFontColor;
  navar.style.backgroundColor = task.navarColor;

  selectedTagValue = task.tagText;
  selectedTagPriority = task.priority;

  selectedTag.innerText = task.tagText;
  selectedTag.style.backgroundColor = task.tagColor;
  selectedTag.style.color = task.tagFontColor;
  selectedTag.style.display = "inline-block";

  const allTasks = taskList.querySelectorAll("li");
  if (allTasks[index]) {
    taskList.removeChild(allTasks[index]);
  }
}

function removeTask(id) {
  const index = tasksArray.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasksArray.splice(index, 1);
    renderTasks();
  }
}

function removeDoneTask(id) {
  const index = doneTasksArray.findIndex((task) => task.id === id);
  if (index !== -1) {
    doneTasksArray.splice(index, 1);
    renderTasks();
  }
}

function doneTask(id) {
  const index = tasksArray.findIndex((task) => task.id === id);
  if (index !== -1) {
    const task = tasksArray.splice(index, 1)[0];
    task.isDone = true;
    doneTasksArray.push(task);
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  taskDoneList.innerHTML = "";

  if (tasksArray.length) {
    tasksBanner.innerHTML = `${tasksArray.length} تسک را باید انجام دهید.`;
    tasksArray.forEach((task, index) => {
      taskList.appendChild(createTaskElement(task, index));
    });
  } else {
    tasksBanner.innerHTML = "تسکی برای امروز نداری!";
  }

  if (doneTasksArray.length) {
    taskDoneListBanner.style.display = "flex";
    taskDoneListBanner.querySelector(
      "h3"
    ).innerHTML = `${doneTasksArray.length} تسک انجام شده است.`;
    doneTasksArray.forEach((task, index) => {
      taskDoneList.appendChild(createTaskElement(task, index));
    });
  } else {
    taskDoneListBanner.style.display = "none";
  }
  updateDark();
}

addTask.addEventListener("click", () => {
  emptyTaskLight.style.display = "none";
  emptyTaskDark.style.display = "none";
  taskInformation.style.display = "flex";
});

tag.addEventListener("click", () => {
  const isHidden =
    downMiddleUp.style.display === "none" || downMiddleUp.style.display === "";
  downMiddleUp.style.display = isHidden ? "flex" : "none";
  imgTagLight.src = isHidden
    ? "./assets/img/tag-open.svg"
    : "./assets/img/tag-right.svg";
  imgTagDark.src = isHidden
    ? "./assets/img/tag-open-dark.svg"
    : "./assets/img/tag-right-dark.svg";
});

down.addEventListener("click", () =>
  selectTag("پایین", "#c3fff1", "#11a483", 1)
);
middle.addEventListener("click", () =>
  selectTag("متوسط", "#ffefd6", "#ffaf37", 2)
);
up.addEventListener("click", () => selectTag("بالا", "#ffe2db", "#ff5f37", 3));

finalAdd.addEventListener("click", handleAddTask);
notAdded.addEventListener("click", () => {
  taskInformation.style.display = "none";
  resetForm();
});

function updateDark() {
  const isDark = document.documentElement.classList.contains("dark");

  if (isDark) {
    dark[0].getElementsByTagName("img")[0].src = "./assets/img/white-moon.svg";
    dark[1].getElementsByTagName("img")[0].src = "./assets/img/white-moon.svg";
    mobileBar.getElementsByTagName("img")[0].src="./assets/img/menu-dark.svg";
  } else {
    dark[0].getElementsByTagName("img")[0].src = "./assets/img/dark-switch.svg";
    dark[1].getElementsByTagName("img")[0].src = "./assets/img/dark-switch.svg";
    mobileBar
    .getElementsByTagName("img")[0].src="./assets/img/menu.svg";
  }

  document.querySelectorAll('[data-type="trash"]').forEach((img) => {
    img.src = isDark
      ? "./assets/img/Vector.svg"
      : "./assets/img/tabler_trash-x.svg";
  });

  document.querySelectorAll('[data-type="edit"]').forEach((img) => {
    img.src = isDark
      ? "./assets/img/Group.svg"
      : "./assets/img/tabler_edit.svg";
  });

  document.querySelectorAll('[data-type="menu-icon"]').forEach((img) => {
    const isDone = img.src.includes("trash-x.svg");
    img.src = isDone
      ? "./assets/img/tabler_trash-x.svg"
      : isDark
      ? "./assets/img/3noghte-dark.svg"
      : "./assets/img/3noghte.svg";
  });
}
