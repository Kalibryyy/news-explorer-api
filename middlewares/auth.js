const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs');
const UnauthorizedError = require('../errors/unauthorized-err');
const errorMessages = require('../configs/error-messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(errorMessages.unauthorizedError.general));
  } else {
  // извлечём токен
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError(errorMessages.unauthorizedError.token));
    }

    req.user = payload;
  }

  next();
};
