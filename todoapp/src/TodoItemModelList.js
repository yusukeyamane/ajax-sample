import EventEmitter from '../EventEmitter.js';

export class TodoListModel extends EventEmitter {
  constructor(items = []) {
    super()
    this.items = items;
  }

  get totalCount() {
    return this.items.length;
  }

  getTodoItems() {
    return this.items();
  }

  onChange(listener) {
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  updateTodo({id, completed }) {
    const todoItem = this.items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }
}
