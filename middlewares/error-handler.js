const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const CastError = require('../errors/cast-err');
const DisconnectedError = require('../errors/disconnected-err');
const errorMessages = require('../configs/error-messages');

module.exports.errorHandler = (res, err, next) => {
  if (err.name === 'ValidationError') {
    next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
  } else if (err.name === 'DocumentNotFoundError') {
    next(new NotFoundError(errorMessages.notFoundError.general));
  } else if (err.name === 'CastError') {
    next(new CastError(errorMessages.castError.general));
  } else if (err.name === 'DisconnectedError') {
    next(new DisconnectedError(errorMessages.disconnectedError));
  } else {
    next(err);
  }
};
