const router = require('express').Router();
const usersRouter = require('./users.js');
const articlesRouter = require('./articles.js');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { validateCreateUser, validateLogin } = require('../middlewares/validations');
const errorMessages = require('../configs/error-messages');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundError.general));
});

module.exports = router;
