import { v4 as uuidv4 } from 'uuid'

export class TodoList {
  constructor(id = uuidv4(), title, cards = []) {
    this.columnId = id;
    this.title = title;
    this.cards = cards;
  }
}