// Status codes
module.exports.statusCode = {
  CREATED: 201,
  SUCCESS: 200,
  NO_CONTENT: 204,
  INVALID_DATA: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  DEFAULT_ERROR: 500,
  USER_NOT_UNIQUE_ERROR: 11000,
};

// Messages
module.exports.MOVIE_DELETED = 'Фильм удалён';

// Error names
module.exports.errorName = {
  VALIDATION_ERROR: 'ValidationError',
  NOT_FOUND_ERROR: 'NotFoundError',
  CAST_ERROR: 'CastError',
  AUTH_ERROR: 'AuthError',
};

// Error messages
module.exports.errorMessage = {
  user: {
    NOT_FOUND: 'Запрашиваемый пользователь не найден',
    REGISTERED_USER: 'Пользователь уже зарегистрирован',
    INVALID_DATA: 'Переданы некорректные данные пользователя',
  },
  movie: {
    FOREIGN: 'Нельзя удалить фильм другого пользователя',
    NOT_FOUND: 'Запрашиваемый фильм не найден',
    INVALID_DATA: 'Переданы некорректные данные при создании фильма',
  },
  auth: {
    AUTH_SUCCESS: 'Успешная авторизация',
    BAD_AUTH: 'Неправильные почта или пароль',
    MISSING_TOKEN: 'Передан некорректный токен',
  },
  other: {
    ROUTE_NOT_FOUND: 'Запрашиваемый путь не найден',
    DEFAULT: 'На сервере произошла ошибка',
  },
};

module.exports.DEV_SECRET = 'secret-key';

// Patterns for validation
module.exports.OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;
module.exports.LINK_PATTERN = /https?:\/\/(www\.)?[\w-@:%.\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\w-.~:/[?%#@!\]$&'()*+,;=]*)/;
