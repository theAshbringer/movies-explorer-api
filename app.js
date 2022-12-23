const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const { MSG_ROUTE_NOT_FOUND } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const errorHandler = require('./middlewares/errorHandler');
const { corsOptions } = require('./middlewares/cors');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(routes);

app.use(errors()); // handling Joi errors

app.use((req, res, next) => next(new NotFoundError(MSG_ROUTE_NOT_FOUND)));

app.use(errorHandler);

app.listen(PORT);
