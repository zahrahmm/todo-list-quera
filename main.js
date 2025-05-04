const addTask = document.getElementById("add-task");
const emptyTask = document.getElementById("empty-task");
const taskInformation = document.getElementById("task-information");
const tag = document.getElementById("tag");
const imgTag = document.getElementById("img-tag");
const downMiddleUp = document.getElementById("down-middle-up");
const finalAdd = document.getElementById("final-add");
const taskAdded = document.getElementById("task-added");
const down = document.getElementById("down");
const middle = document.getElementById("middle");
const up = document.getElementById("up");
const navar = document.getElementById("navar");
const tagName = document.getElementById("tag-name");
const taskName = document.getElementById("task-name");
const taskDescription = document.getElementById("task-description");
const taskName2 = document.getElementById("task-name-2");
const taskDescription2 = document.getElementById("task-description-2");
const taskList = document.getElementById("task-list");
const selectedTag = document.getElementById("selected-tag");
const notAdded = document.getElementById("not-added");

let selectedTagValue = null;
let selectedTagPriority = 0;

function resetForm() {
  taskInformation.style.display = "none";
  taskName.value = "";
  taskDescription.value = "";
  tagName.innerText = "";
  tagName.style.backgroundColor = "";
  tagName.style.color = "";
  selectedTag.style.display = "none";
  selectedTagValue = null;
  downMiddleUp.style.display = "none";
  imgTag.src = "./assets/img/tag-right.svg";
}

function createTaskElement(
  name,
  desc,
  tagText,
  tagColor,
  tagFontColor,
  navarColor
) {
  const taskElement = document.createElement("li");
  taskElement.className =
    "relative bg-white p-4 w-11/12 mr-4 mt-5 rounded-xl border shadow-[0_4px_58.5px_0_rgba(0,0,0,0.06)]";

  taskElement.innerHTML = `
    <div class="absolute top-2 right-0 h-[88%] sm:h-[80%] w-1 rounded-tl-lg rounded-bl-lg" style="background-color: ${navarColor};"></div>
    <img src="./assets/img/3noghte.svg" alt="3 points" class="absolute top-4 left-3 cursor-pointer" id="points"/>
    <div class="flex items-start gap-3 flex-nowrap">
      <input type="checkbox" class="mt-2 flex-shrink-0" />
      <div class="min-w-0 flex-1 overflow-hidden">
        <div class="flex flex-wrap items-center gap-2">
          <h2 class="text-base font-semibold whitespace-nowrap">${name}</h2>
          <div class="rounded-md px-2 py-1 text-sm whitespace-nowrap" style="background-color: ${tagColor}; color: ${tagFontColor};">${tagText}</div>
        </div>
        <p class="break-words text-light-gray-text mt-1">${desc}</p>
      </div>
      <div class="flex-shrink-0 ml-auto mt-4">
        <div class="hidden border rounded-lg shadow-[0_12px_24px_0_rgba(20,20,25,0.06)] p-1 gap-2" id="trash-edit">
          <img src="./assets/img/tabler_trash-x.svg" alt="trash" class="cursor-pointer delete-task"/>
          <div class="w-[1px] bg-[#ebedef]"></div>
          <img src="./assets/img/tabler_edit.svg" alt="edit" />
        </div>
      </div>
    </div>
  `;

  const points = taskElement.querySelector("#points");
  const trashEdit = taskElement.querySelector("#trash-edit");

  points.addEventListener("click", () => {
    const isHidden =
      trashEdit.style.display === "none" || trashEdit.style.display === "";
    trashEdit.style.display = isHidden ? "flex" : "none";
  });

  return taskElement;
}

function selectTag(value, bgColor, textColor, grade) {
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

const tasksArray = [];

function handleAddTask() {
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

  const newTask = {
    name,
    desc,
    tagText,
    tagColor,
    tagFontColor,
    navarColor,
    priority: selectedTagPriority,
  };

  tasksArray.push(newTask);

  tasksArray.sort((a, b) => b.priority - a.priority);

  renderTasks();

  resetForm();
}
function renderTasks() {
  taskList.innerHTML = "";

  tasksArray.forEach((task) => {
    const li = createTaskElement(
      task.name,
      task.desc,
      task.tagText,
      task.tagColor,
      task.tagFontColor,
      task.navarColor
    );
    taskList.appendChild(li);
  });
}

addTask.addEventListener("click", () => {
  emptyTask.style.display = "none";
  taskInformation.style.display = "flex";
});

tag.addEventListener("click", () => {
  const isHidden =
    downMiddleUp.style.display === "none" || downMiddleUp.style.display === "";
  downMiddleUp.style.display = isHidden ? "flex" : "none";
  imgTag.src = isHidden
    ? "./assets/img/tag-open.svg"
    : "./assets/img/tag-right.svg";
});

down.addEventListener("click", () => {
  selectTag("پایین", "#c3fff1", "#11a483", 1);
});
middle.addEventListener("click", () => {
  selectTag("متوسط", "#ffefd6", "#ffaf37", 2);
});
up.addEventListener("click", () => {
  selectTag("بالا", "#ffe2db", "#ff5f37", 3);
});

finalAdd.addEventListener("click", handleAddTask);

notAdded.addEventListener("click", () => {
  taskInformation.style.display = "none";
});
