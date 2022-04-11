import { LowSync, LocalStorage } from 'lowdb';
import { v4 as uuidv4 } from 'uuid';

const columns = new LowSync(new LocalStorage('columns'));
columns.read();

const initDb = columns => {
  if (columns.data) return;

  const column1Key = uuidv4();
  const column2Key = uuidv4();
  const column3Key = uuidv4();

  const column1 = new LowSync(new LocalStorage(column1Key));
  const column2 = new LowSync(new LocalStorage(column2Key));
  const column3 = new LowSync(new LocalStorage(column3Key));

  columns.data = [column1Key, column2Key, column3Key];

  column1.data = {
    id: column1Key,
    title: '해야할 일',
    cards: [
      {
        id: uuidv4(),
        columnId: column1Key,
        title: 'HTML',
        desc: 'HTML',
        author: 'web',
        createdAt: Date.now(),
      },
    ],
  };

  column2.data = {
    id: column2Key,
    title: '하고있는 일',
    cards: [
      {
        id: uuidv4(),
        columnId: column2Key,
        title: 'CSS',
        desc: 'CSS',
        author: 'web',
        createdAt: Date.now(),
      },
    ],
  };

  column3.data = {
    id: column3Key,
    title: '완료한 일',
    cards: [{ id: uuidv4(), columnId: column3Key, title: 'JS', desc: 'JS', author: 'web', createdAt: Date.now() }],
  };

  columns.write();
  column1.write();
  column2.write();
  column3.write();
};
initDb(columns);

const getData = key => {
  const db = new LowSync(new LocalStorage(key));
  db.read();
  return db.data;
};
const getColumns = () => {
  const columnsData = columns.data.reduce((result, columnKey) => {
    result.push(getData(columnKey));
    return result;
  }, []);

  return columnsData;
};

export default {
  columns,
  getData,
  getColumns,
};

// 여기에 데이터 get, post, delete, patch, move 메서드 추가해서 export 하면 될 듯 합니다.
