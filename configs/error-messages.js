module.exports = {
  conflictingReqError: {
    user: 'пользователь с таким email уже существует',
  },
  castError: {
    general: 'в запросе переданы значения неправильного типа',
    user: 'поля email и password должны быть заполнены',
  },
  unauthorizedError: {
    user: 'неправильные почта или пароль',
    general: 'необходима авторизация',
    token: 'с токеном что-то не так',
  },
  notFoundError: {
    general: 'запрашиваемый ресурс не найден',
    user: 'пользователь не найден',
    article: 'нет статьи с таким id',
  },
  forbiddenError: {
    article: 'статьи других пользователей удалять нельзя',
  },
  disconnectedError: 'нет соединения с базой данных',
};
