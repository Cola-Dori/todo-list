import { v4 as uuidv4 } from 'uuid';

export class TodoItem {
  constructor(columnId, title, desc, author = 'web') {
    this.id = uuidv4();
    this.columnId = columnId;
    this.title = title;
    this.desc = desc;
    this.author = author;
    this.createdAt = Date.now();
  }

  render() {

  }
}
