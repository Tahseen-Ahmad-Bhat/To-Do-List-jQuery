$(document).ready(function () {
  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
      addTaskToList(task.text, task.completed);
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    $("#task-list li").each(function () {
      const text = $(this).find("span").text();
      const completed = $(this).hasClass("completed");
      tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function for adding task to list
  function addTaskToList(text, completed = false) {
    const taskHtml = `
    <li ${completed ? 'class="completed"' : ""}> 
      <span>${text}</span>
      <div>
        <button class="toggle-complete">✔️</button>
        <button class="delete">❌</button>
      </div>
    </li>
    `;

    $("#task-list").append(taskHtml);
  }

  // Add task
  $("#add-task").on("click", function () {
    const newTask = $("#new-task").val().trim();
    if (newTask) {
      addTaskToList(newTask);
      saveTasks();
      $("#new-task").val("");
    }
  });

  // Toggle task completion
  $("#task-list").on("click", ".toggle-complete", function () {
    $(this).closest("li").toggleClass("completed");
    saveTasks();
  });

  // Delete task
  $("#task-list").on("click", ".delete", function () {
    $(this).closest("li").remove();
    saveTasks();
  });

  // Call loadTasks
  loadTasks();
});
