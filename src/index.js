import { observable, computed, autorun } from 'mobx';
import cobx from 'cobx';

class TodoItem {
	@observable body = "";
  @observable completed = false;
  @computed get fullName() {
  	return this.firstName + " " + this.lastName;
  }
}

class TodoListElement extends cobx.Element {
	@observable todos = [];
  @observable newItemText = "";
  @computed get itemsCount() {
  	let remaining = this.todos.filter((t) => {
    	return !t.completed
    }).length;
    return `${remaining} items left`
  }
  
	constructor() {
  	super();
    let item = new TodoItem();
    item.body = "Clean up room";
    this.todos.push(item);
  }
  
  addItem() {
  	let item = new TodoItem();
    item.body = this.newItemText;
    this.todos.push(item);
    this.newItemText = "";
  }

  templateHTML() {
    return `
      <h2>My Todo List</h2>
      <with-elements @each="this.todos" @as="item">
        <todo-item :item="this.item"></todo-item>
      </with-elements>

      <p>
        <label>Add new item:</label>
        <input @sync="this.newItemText" @sync-event="keyup" @on-return="this.addItem()"/>
        <button @on-click="this.addItem()">Add</button>
      </p>
      <p>
        <span @text="this.itemsCount"></span>
      </p>
    `
  }
}
customElements.define('todo-list', TodoListElement);

class TodoItemElement extends cobx.Element {
	@observable item = null;

	constructor() {
  	super();
    this.testAttr = 5;
    // evaluate item with context
  }

  templateHTML() {
    return `
      <div>
        <input type="checkbox" @sync="this.item.completed" style="margin-right: 5px;"/>
        <span @text="this.item.body"></span>
      </div>
    `
  }
}
customElements.define('todo-item', TodoItemElement);

window.cobx = cobx;
