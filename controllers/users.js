const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configs');
const { errorHandler } = require('../middlewares/error-handler');
const CastError = require('../errors/cast-err');
const ConflictingReqError = require('../errors/conflicting-req-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/conflicting-req-err');
const errorMessages = require('../configs/error-messages');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictingReqError(errorMessages.conflictingReqError.user));
      }
    });

  User.create({
    name, email, password,
  })
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => errorHandler(res, err, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new CastError(errorMessages.castError.user));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! создадим токен
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(errorMessages.unauthorizedError.user));
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(() => {
      next(new NotFoundError(errorMessages.notFoundError.user));
    })
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => errorHandler(res, err, next));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
