require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { rateLimit } = require('express-rate-limit');
const { URL_MONGO, PORT } = require('./utils/config');
const router = require('./routes');
const cors = require('./middlewares/cors');
const NotFound = require('./utils/errors/NotFound');
const { ERROR_INTERNAL_SERVER } = require('./utils/http_codes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

router.use(requestLogger);

const app = express();

mongoose.connect(URL_MONGO, {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err; // 500 by default
  res.status(statusCode).send({ message });

  next();
});

app.listen(PORT);
