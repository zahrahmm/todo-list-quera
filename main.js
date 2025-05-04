const addTask = document.getElementById("add-task");
const emptyTask = document.getElementById("empty-task");
const taskInformation = document.getElementById("task-information");
const tag = document.getElementById("tag");
const imgTag = document.getElementById("img-tag");
const downMiddleUp = document.getElementById("down-middle-up");
const finalAdd = document.getElementById("final-add");

addTask.addEventListener("click", () => {
  emptyTask.style.display = "none";
  taskInformation.style.display = "flex";
  tag.addEventListener("click", () => {
    downMiddleUp.style.display = "flex";
    imgTag.src = "./assets/img/tag-open.svg";
  });
  finalAdd.addEventListener("click", () => {});

  console.log(addTask);
  console.log(emptyTask);
});
