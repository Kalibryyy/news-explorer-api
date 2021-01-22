const router = require('express').Router();

const { getArticles, postArticle, deleteArticle } = require('../controllers/articles');
const { validatePostArticle, validateDeleteArticle } = require('../middlewares/validations');

// возвращает все сохранённые пользователем статьи
router.get('/', getArticles);
// создаёт статью с переданными в теле keyword, title, text, date, source, link и image
router.post('/', validatePostArticle, postArticle);
// удаляет сохранённую статью  по _id
router.delete('/:articleId', validateDeleteArticle, deleteArticle);

module.exports = router;
