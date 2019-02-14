import { element, render } from "./view/html-util.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoItemModelList.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  constructor() {
    this.todoListView = new TodoListModel();
    this.todoListModel = new TodoListModel([]);
  }

  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  };

  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  };

  handleDelete( {id }) {
    this.todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    this.TodoListModel.onChange(() => {
      const todoItems = this.TodoListModel.getTodoItems();
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },

        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.TodoListModel.totalCount}`;
    });
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.TodoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = "";
    });
  }
}
