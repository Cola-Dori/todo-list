import { v4 as uuidv4 } from 'uuid';
import TodoCard from './TodoCard';
import { createElement, $, addClass } from '../utils/utils';

export default class TodoColumn {
  constructor({ cards: cardsData, id, idx, title }) {
    this.id = id;
    this.idx = idx;
    this.title = title;
    this.todoCards = [];
    this.$todoColumn = createTodoColumn(id, title, cardsData);
    this.$todoList = $('.todo-list', this.$todoColumn);
    this.init(cardsData);
    this.listen();
  }

  listen() {
    this.$todoColumn.addEventListener('@clickAddButton', () => {
      if (this.hasActiveCard()) return;
      this.handleClickAddButton();
    });
  }

  addEventHandlers() {}

  init(cardsData) {
    cardsData.forEach(cardData => {
      const todoCard = new TodoCard(cardData);
      this.todoCards.push(todoCard);
    });

    this.render();
  }
  // TODO: 타이틀 업데이트

  // TODO: 배지 업데이트

  hasActiveCard() {
    const $activeCard = $('.active-item', this.$todoList);
    return !!$activeCard;
  }

  render() {
    const $$todoCard = this.todoCards.map(card => card.$todoCard);
    this.$todoList.append(...$$todoCard);
  }

  /* event handler */
  handleClickAddButton() {
    const { $todoCard } = new TodoCard({
      id: uuidv4(),
      columnId: this.id,
      columnIdx: this.idx,
    });
    addClass('active-item', $todoCard);
    replaceParagraphWithTextarea($todoCard);
    this.$todoList.prepend($todoCard);
    // '카드 수정'의 경우, textarea의 높이를 scrollHeight로 조절 추가.
  }
}

const createTodoColumn = (id, title, cardsData) => {
  const $todoColumn = createElement('div', 'todo-column', {
    'data-id': id,
  });

  $todoColumn.innerHTML = `
    <header class="todo-column-header">
      <div class="todo-column-textarea">
        <h1 class="todo-column-title">${title}</h1>
        <div class="todo-item-count badge-gray4">${cardsData.length}</div>
      </div>
      <div class="todo-column-buttons">
        <button type="button" class="add-button">
          <i class="ic-plus"></i>
        </button>
        <button type="button" class="delete-button">
          <i class="ic-close"></i>
        </button>
      </div>
    </header>
    <div class="todo-column-body">
      <ol class="todo-list">   
      </ol>
    </div>
  `;

  return $todoColumn;
};

// p -> textarea로 바꾸기 / textarea -> p로 바꾸기
// todoCard의 static method로 넣는게 좋을까요?
const replaceParagraphWithTextarea = $todoCard => {
  const $titleParagraph = $('.todo-item-title p', $todoCard);
  const $descParagraph = $('.todo-item-desc p', $todoCard);

  const $titleTextarea = createElement('textarea', undefined, {
    placeholder: '제목을 입력하세요',
    rows: 1,
  });
  const $descTextarea = createElement('textarea', undefined, {
    placeholder: '내용을 입력하세요',
    rows: 1,
  });

  const title = $titleParagraph.innerHTML;
  const desc = $descParagraph.innerHTML;

  $titleTextarea.value = title.replace(/<br\s*\/?>/g, '\n');
  $descTextarea.value = desc.replace(/<br\s*\/?>/g, '\n');

  $titleParagraph.replaceWith($titleTextarea);
  $descParagraph.replaceWith($descTextarea);
};

// todoCard 인스턴스 초기화 과정에서 $todoCard 엘리먼트 생성할 때 title, desc는 개행문자 <br>로 치환해서 넣는거로 수정해서,
// 만약 카드 수정 -> db 컬럼 업데이트 -> 업데이트된 db 컬럼을 기반으로 엘리먼트 다시 생성하여 리렌더하는 경우는 필요없는 함수
const replaceTextareaWithParagraph = $todoCard => {
  const $titleTextarea = $('.todo-item-title textarea', $todoCard);
  const $descTextarea = $('.todo-item-desc textarea', $todoCard);

  const $titleParagraph = createElement('p');
  const $descParagraph = createElement('p');

  const title = $titleTextarea.value;
  const desc = $descTextarea.value;

  $titleParagraph.innerHTML = title.replace(/\n/g, '</br />');
  $descParagraph.innerHTML = desc.replace(/\n/g, '</br />');

  $titleTextarea.replaceWith($titleParagraph);
  $descTextarea.replaceWith($descParagraph);
};
