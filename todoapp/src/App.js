import { element } from "./view/html-util.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoItemModelList";

export class App {
    constructor() {
      this.TodoListModel = new TodoListModel();
    }
    mount() {
      const formElement = document.querySelector("#js-form");
      const inputElement = document.querySelector("#js-form-input");
      const containerElement = document.querySelector("#js-todo-list");
      const todoItemCountElement = document.querySelector("#js-todo-count");
      // 2. TodolistModelの状態が更新されたら表示を更新する
      this.todoListModel.onChange(() => {
        const todoListElement = element`<ul />`;
        // それぞれのTodoItem要素をtodoListElement以下へ追加する
        const todoItems = this.todoListModel.getTodoItems();
        todoItems.forEach(item => {
          const todoItemElement = element`<li>${item.title}</li>`;
          todoListElement.appendChile(todoItemElement);
        });
        render(todoListElement, containerElement);
        todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.totalCount}`;
      });
      formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        this.todoListModel.addTodo(new TodoItemModel({
          title: inputElement.value,
          completed: false
        }));
        inputElement.value = "";
      });
    }
}

