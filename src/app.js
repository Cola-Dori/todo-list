import { $, closeModal, eventDelegate } from './utils/utils';
import '../styles/main.scss';
import TodoColumns from './Views/TodoColumns';
import './Views/Modal';
import store from './store';

const todoColumns = new TodoColumns($('.todo-columns'));

eventDelegate({
  target: $('.modal'),
  eventName: 'click',
  selector: '.modal .cancel-button',
  handler: closeModal,
});

todoColumns.init(store.getAllColumns());
