import { observable, computed, autorun } from 'mobx';
import { ReactiveElement } from 'elemx';
import TodoItemElement from './todo_item_element';
import TodoItem from './todo_item';

import 'weightless/textfield'
import 'weightless/button'

let newItem = new TodoItem();
newItem.body = "Clean up room";

class TodoListElement extends ReactiveElement {
  @observable todos = [newItem];
  @observable newItemText = "";
  @observable filter = 'all';

  @computed get filteredItems() {
    return this.todos.filter((item)=>{
      if (this.filter == 'active') {
        return !item.completed;
      } else if (this.filter == 'completed') {
        return item.completed;
      } else {
        return true;
      }
    });
  }

  @computed get itemsCount() {
    let remaining = this.todos.filter((t) => {
      return !t.completed
    }).length;
    return `${remaining} items left`
  }
  
  constructor() {
    super();
  }

  onMount() {
    return;
    setTimeout(()=>{
      console.log("Adding item");
      let item = new TodoItem();
      item.body = "Clean up room";
      this.todos.push(item);
    }, 1000)

  }
  
  addItem() {
    let item = new TodoItem();
    item.body = this.newItemText;
    this.todos.push(item);
    this.newItemText = "";
  }

  removeCompletedItems() {
    this.todos = this.todos.filter((item)=>{
      return !item.completed;
    });
  }

  handleRemoveItem(item) {
    console.log("Removing item from list.");
    this.todos.remove(item);
  }

  templateHTML() {
    return `
      <header>
        <h1>ElemX Todos</h1>
      </header>

      <section class="main">
        <wl-textfield class="new-todo" @sync="this.newItemText" @sync-event="keyup" @on-return="this.addItem()" label="What do you need to get done?">
          <wl-icon slot="before">assignment</wl-icon>
        </wl-textfield>

        <template @each="this.filteredItems" @as="item">
          <todo-item :item="context.item" @on-remove="this.handleRemoveItem"></todo-item>
        </template>

        <footer>
          <div class="count">
            <span @text="this.itemsCount"></span>
          </div>
          <div class="filters">
            <wl-button flat inverted :outlined="this.filter=='all'" @click="this.filter='all'">All</wl-button>
            <wl-button flat inverted :outlined="this.filter=='active'" @click="this.filter='active'">Active</wl-button>
            <wl-button flat inverted :outlined="this.filter=='completed'" @click="this.filter='completed'">Completed</wl-button>
          </div>
          <div class="clear">
            <wl-button inverted @click="this.removeCompletedItems()">Clear completed</wl-button>
          </div>
        </footer>
      </section>
    `
  }

  templateCSS() {
    return `
      .main {
        background: #fff;
        margin: 70px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
            
      }
      h1 {
        width: 100%;
        font-size: 80px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
      }
      .new-todo {
        padding: 16px 16px 16px 16px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
        width: 100%;
        box-sizing: border-box;
        font-family: inherit;
        font-weight: 300 !important;
      }
      .new-todo input {
        font-weight: 300;
        font-size: 24px;
      }

      footer {
        color: #777;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      footer wl-button {
        font-size: 10px;
        padding: 10px;
      }

    `
  }
}
customElements.define('todo-list', TodoListElement);

export default TodoListElement;
