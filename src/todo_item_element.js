import { observable, computed, autorun } from 'mobx';
import cobx from 'cobx';
import TodoItem from './todo_item';

class TestElement extends cobx.Element {

}
customElements.define('test-element', TestElement);

class TodoItemElement extends cobx.Element {
  @observable item = null;
  @observable is_editing = false;
  @observable edited_body = '';

  startEditing() {
    this.is_editing = true;
    //this.edited_body = '';
    console.log("Starting editing.");
  }

  stopEditing() {
    this.is_editing = false;
  }

  removeItem() {
    this.emitEvent('remove', this.item);
  }

  templateHTML() {
    return `
      <div @class="{completed: this.item.completed}">
        <input type="checkbox" class="toggle" @sync="this.item.completed" style="margin-right: 5px;"/>
        <label @text="this.item.body" @click="this.startEditing()"></label>
        <button class="remove" @click="this.removeItem()"></button>
      </div>
    `
  }

  templateCSS() {
    return `
      :host {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
        display: block;
      }

      :host(:hover) .remove {
        display: inherit;
      }
      .toggle {
        opacity: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        width: 40px;
        height: 100%;
      }

      .toggle + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
      }

      .toggle:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')
      }

      label {
        padding: 15px 15px 15px 60px;
        line-height: 1.2;
        display: block;
        transition: color 0.4s;
      }

      .completed label {
        color: #d9d9d9;
        text-decoration: line-through;
      }

      .remove {
        display: none;
        position: absolute;
        top: 0px;
        right: 10px;
        bottom: 0px;
        width: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        background: none;
        border: none;
      }
      .remove:after {
        content: '×';
      }
    `
  }
}
customElements.define('todo-item', TodoItemElement);

export default TodoItemElement;
