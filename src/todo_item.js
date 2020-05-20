import { observable, computed, autorun } from 'mobx';

class TodoItem {
  @observable body = "";
  @observable completed = false;
  @computed get fullName() {
    return this.firstName + " " + this.lastName;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

export default TodoItem;
