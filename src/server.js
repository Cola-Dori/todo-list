import jsonServer from 'json-server';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// db logic

server.get('/mock', (req, res) => {
  res.send(db.get('mock').value());
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
