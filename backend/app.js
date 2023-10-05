const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();
const { URL_MONGO, PORT } = require('./utils/config');
const { requestLogger } = require('./middlewares/logger');
const router = require('./routes');

const app = express();

mongoose.connect(URL_MONGO, {
  useNewUrlParser: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов

const ALLOWED_CORS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://spacex.nomoredomainsrocks.ru',
  'https://api.spacex.nomoredomainsrocks.ru',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(router);

app.listen(PORT);
