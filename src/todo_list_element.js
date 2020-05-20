import { observable, computed, autorun } from 'mobx';
import cobx from 'cobx';
import TodoItemElement from './todo_item_element';
import TodoItem from './todo_item';

let newItem = new TodoItem();
newItem.body = "Clean up room";

class TodoListElement extends cobx.Element {
  @observable todos = [newItem];
  @observable newItemText = "";
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

  handleRemoveItem(item) {
    console.log("Removing item from list.");
    this.todos.remove(item);
  }

  templateHTML() {
    return `
      <header>
        <h1>cobx todos</h1>
      </header>

      <section class="main">
        <input class="new-todo" @sync="this.newItemText" @sync-event="keyup" @on-return="this.addItem()" placeholder="What do you need to get done?"/>

        <template @each="this.todos" @as="item">
          <todo-item :item="context.item" @on-remove="this.handleRemoveItem"></todo-item>
        </template>

        <footer>
          <span @text="this.itemsCount"></span>
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
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
      }
      input.new-todo {
        padding: 16px 16px 16px 16px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
        width: 100%;
        font-size: 24px;
        box-sizing: border-box;
        font-family: inherit;
        font-weight: inherit;
      }

      footer {
        color: #777;
        padding: 10px 15px;
      }
    `
  }
}
customElements.define('todo-list', TodoListElement);

export default TodoListElement;
