document.getElementById("addButton").addEventListener("click", function () {
  //bagib el value bta3t el input
  const myTask = document.getElementById("taskInput").value;
  const taskList = document.createElement("li");
  taskList.textContent = myTask;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";

  deleteBtn.addEventListener("click", function (event) {
    taskList.remove();
  });

  taskList.addEventListener("click", function () {
    if (taskList.style.textDecoration === "line-through") {
      taskList.style.textDecoration = "none";
      taskList.style.color = "black";
    } else {
      taskList.style.textDecoration = "line-through";
      taskList.style.color = "gray";
    }
  });

  taskList.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(taskList);

  document.getElementById("taskInput").value = "";
});
