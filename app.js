const express = require('express');
const process = require('process');
const helmet = require('helmet');
require('dotenv').config();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');
const errorHandler = require('./errors/error_handler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const routes = require('./routes/index');

const app = express();

app.use(helmet());
app.use(requestLogger);

app.use(cookieParser());
app.use(express.json());
app.use(cors);
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
