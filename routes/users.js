const router = require('express').Router();
const { getCurrentUser } = require('../controllers/users');

// возвращает информацию о пользователе (email и name)
router.get('/me', getCurrentUser);

module.exports = router;
