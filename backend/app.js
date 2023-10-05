require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { URL_MONGO, PORT } = require('./utils/config');
const router = require('./routes');
const cors = require('./middlewares/cors');

const app = express();

mongoose.connect(URL_MONGO, {
  useNewUrlParser: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use(router);

app.listen(PORT);
