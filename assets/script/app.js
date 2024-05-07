let input = document.querySelector(".add-todo__input");
let listContainer = document.querySelector(".list-container");
let form = document.querySelector("form");
let completedString;
let data = JSON.parse(localStorage.getItem("data")) || [];
let count = JSON.parse(localStorage.getItem("count")) || 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  count += 1;
  const newTodo = {
    id: count,
    text: input.value,
    isCompleted: false,
  };
  if (input.value !== "") {
    data.push(newTodo);
    input.value = "";
    getData(data);
  }
  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("count", count);
});

function getData(data) {
  listContainer.innerHTML = "";
  data.map((item) => {
    if (item.isCompleted) {
      completedString = "checked";
    } else {
      completedString = "";
    }
    listContainer.innerHTML += `
      <li>
        <input 
        ${completedString}
            type="checkbox"
            id="todo-check"
            onclick="completedTodo(this,${item?.id})"
        />
        <span contenteditable="false" class="">${item?.text}</span>
        <div class="todo-action">
          <button onclick="editTodo(this,${item?.id})" class="btn btn-edit active">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button onclick="checkTodo(this,${item?.id})" class="btn btn-check">
          <i class="fa-solid fa-circle-check"></i>
          </button>
          <button onclick="deleteTodo(${item?.id})" class="btn btn-delete" >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
    </li>
      `;
  });
}
getData(data);

function editTodo(todoItem, id) {
  let parentElement = todoItem.parentElement.parentElement;
  let editInput = parentElement.querySelector("span");
  let siblingCheck = parentElement.querySelector(".btn-check");

  siblingCheck.classList.add("active");
  todoItem.classList.remove("active");
  editInput.classList.add("edit");

  editInput.attributes.contenteditable.textContent = "true";
}

function checkTodo(todoItem, id) {
  let parentElement = todoItem.parentElement.parentElement;
  let editInput = parentElement.querySelector("span");
  let siblingCheck = parentElement.querySelector(".btn-edit");

  siblingCheck.classList.add("active");
  todoItem.classList.remove("active");
  editInput.classList.remove("edit");

  editInput.attributes.contenteditable.textContent = "false";
  let findEditTodo = data.find((item) => item.id == id);
  findEditTodo.text = editInput.textContent;

  localStorage.setItem("data", JSON.stringify(data));
}

function deleteTodo(id) {
  let x = data.findIndex((item) => item?.id == id);
  data.splice(x, 1);
  localStorage.setItem("data", JSON.stringify(data));
  getData(data);
}

function completedTodo(checkbox, id) {
  let findEditTodo = data.find((item) => item.id == id);
  if (checkbox.checked) {
    findEditTodo.isCompleted = true;
  } else {
    findEditTodo.isCompleted = false;
  }
  localStorage.setItem("data", JSON.stringify(data));
}
