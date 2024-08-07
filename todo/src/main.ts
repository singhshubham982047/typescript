import "./style.css";

interface TODO {
  name: string;
  isCompleted: boolean;
  readonly id: string;
}

let todos: Array<TODO> = [];

const tasksContainer = document.getElementById("tasks") as HTMLDivElement;
const myform = document.getElementById("myform") as HTMLFormElement;
const input = document.getElementById("task") as HTMLInputElement;

myform.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: TODO = {
    name: input.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };
  todos.push(todo);
  console.log(todos);
  input.value = "";
  rendertodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    para.className = checkBox.checked ? "textCut" : "";
    todos.find((todo) =>
      todo.id === id ? (todo.isCompleted = checkBox.checked) : false
    );
  };

  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = title;
  para.className = isCompleted ? "textCut" : "";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = () => {
    if (checkBox.checked) {
      todos = todos.filter((todo) => todo.id !== id);
      rendertodo(todos);
    }
  };

  todo.append(checkBox, para, deleteBtn);
  tasksContainer.append(todo);
};

const rendertodo = (todos: TODO[]) => {
  tasksContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.name, item.isCompleted, item.id);
  });
};
