const express = require('express');
const logger = require('morgan');
const db = require('./databases/mongodb');

const { info } = require('./utils/debug');
const routes = require('./routes');
const config = require('./config');

const HOST = config.db.host;
const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const DB_NAME = config.db.name;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;

db.connect(MONGO_URI);

const app = express();

app.use(logger('dev', { stream: { write: (msg) => info(msg) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello world from project MORO');
});

routes(app);

app.listen(config.srv.port, () => {
  info(`server runing in http://localhost:${config.srv.port}`);
});
