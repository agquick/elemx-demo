import { observable, computed, autorun } from 'mobx';
import { ReactiveElement } from 'elemx';
import TodoItem from './todo_item';

import 'weightless/button'
import 'weightless/icon'
import 'weightless/checkbox'

class TestElement extends ReactiveElement {
  @observable text = null;

  templateHTML() {
    return `
      <span @text="this.text"></span>
    `
  }

}
customElements.define('test-element', TestElement);

class TodoItemElement extends ReactiveElement {
  @observable item = null;
  @observable isEditing = false;
  @observable editedBody = '';

  startEditing() {
    this.isEditing = true;
    this.editedBody = this.item.body;
    console.log("Starting editing.");
  }

  stopEditing() {
    this.isEditing = false;
    this.item.body = this.editedBody;
  }

  removeItem() {
    this.emitEvent('remove', this.item);
  }

  templateHTML() {
    return `
      <div class="wrapper" @class="{completed: this.item.completed}">
        <wl-checkbox class="toggle" @sync="this.item.completed" style="--checkbox-size=20px;"></wl-checkbox>
        <template @if="!this.isEditing">
          <label @text="this.item.body" @click="this.startEditing()"></label>
        </template>
        <template @if="this.isEditing">
          <wl-textfield class="edited-body" @sync="this.editedBody" @on-focusout="this.stopEditing()" @on-return="this.stopEditing()"></wl-textfield>
        </template>
        <wl-button class="remove" fab @click="this.removeItem()">
          <wl-icon>delete</wl-icon>
        </wl-button>
      </div>
      <slot></slot>
    `
  }

  templateCSS() {
    return `
      :host {
        font-size: 24px;
        border-bottom: 1px solid #ededed;
        display: block;
      }

      :host(:hover) .remove {
        visibility: visible;
      }

      .wrapper {
        display: flex;
        padding: 10px 15px;
        align-items: center;
      }

      .toggle {
        margin-right: 20px;
      }

      label {
        line-height: 1.2;
        display: block;
        transition: color 0.4s;
        flex: 1;
      }

      .edited-body {
        flex: 1;
      }

      .edited-body input {
        font-family: inherit;
        font-weight: inherit;
      }

      .completed label {
        color: #d9d9d9;
        text-decoration: line-through;
      }

      .remove {
        visibility: hidden;
      }
    `
  }
}
customElements.define('todo-item', TodoItemElement);

export default TodoItemElement;
