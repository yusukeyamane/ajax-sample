import { element, render } from "./view/html-util.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoItemModelList.js";

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
    this.TodoListModel.onChange(() => {
      const todoListElement = element`<ul />`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.TodoListModel.getTodoItems();
      todoItems.forEach(item => {
        // 削除ボタン(x)をそれぞれ追加する
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked>
            <s>${item.title}</s>
            <button class="delete">x</button>
          </input></li>`
          : element`<li><input type="checkbox" class="checkbox">
            ${item.title}
            <button class="delete">x</button>
          </input></li>`;
      // チェックボックスのトグル処理は変更なし
      const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
      inputCheckboxElement.addEventListener("change", () => {
        this.TodoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });
        // 削除ボタン(x)をクリック時にTodoListModelからアイテムを削除する
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          this.TodoListModel.deleteTodo({
            id: item.id
          });
        });
        todoListElement.appendChild(todoItemElement);
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
