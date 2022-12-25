const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { errorMessage } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./middlewares/cors');
const { DEV_MONGODB_PATH } = require('./utils/config');
const { limiter } = require('./middlewares/rateLimit');

require('dotenv').config();

const { PORT = 3000, NODE_ENV, MONGODB_PATH } = process.env;

const app = express();
app.use(limiter);
app.use(helmet());
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? MONGODB_PATH : DEV_MONGODB_PATH);

app.use(requestLogger);
app.use(routes);

app.use((req, res, next) => next(new NotFoundError(errorMessage.other.ROUTE_NOT_FOUND)));
app.use(errorLogger);
app.use(errors()); // handling Joi errors

app.use(errorHandler);

app.listen(PORT);
console.log(`Сервер успешно запущен, порт ${PORT}.`);
