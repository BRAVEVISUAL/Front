document.querySelectorAll(".toggle-details").forEach((button) => {
  button.addEventListener("click", function () {
    const info = this.nextElementSibling;
    info.style.display = info.style.display === "none" ? "block" : "none";
  });
});

const host = "http://3.223.9.81:8081";

const todosContainer = document.querySelector(".todos-container");

function getTodos() {
  axios
    .get(`${host}/todo`)
    .then((response) => {
      console.log(response.data);
      renderTodos(response.data.todos);
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
}

function renderTodos(todos) {
  todosContainer.innerHTML = ""; // todosContainer 초기화
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.textContent = todo.item;
    todosContainer.appendChild(todoDiv);

    //삭제 버튼 생성 및 이벤트 처리
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "x";

    deleteBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
    });
    //todoDiv에 삭제버튼 추가
    todoDiv.appendChild(deleteBtn);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  getTodos();
});

const todoInput = document.querySelector(".todo-input");

todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const title = todoInput.value.trim();
  const currentTime = new Date(); // 현재 시간을 가져옵니다.
  let todoData = {
    id: 0,
    item: title,
    timestamp: currentTime, // 할 일 데이터에 현재 시간을 추가합니다.
  };
  if (title === "") return;

  axios
    .post(`${host}/todo`, todoData)
    .then((response) => {
      todoInput.value = " ";
      getTodos();
    })
    .catch((error) => {
      console.error("Error adding todo:", error);
    });
}

function deleteTodo(todoId) {
  axios
    .delete(`${host}/todo/${todoId}`)
    .then(function (response) {
      console.log("Todo deleted:", response.data);
      getTodos();
    })

    .catch(function (error) {
      console.error("Error deleting todo:", error);
    });
}
