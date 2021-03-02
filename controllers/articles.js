const Article = require('../models/article');
const { errorHandler } = require('../middlewares/error-handler');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const errorMessages = require('../configs/error-messages');

const getArticles = (req, res, next) => {
  const { _id } = req.user;
  Article.find({ owner: _id })
    .then((articles) => {
      if (!articles.length) {
        res.status(200).send([]);
      }
      res.send(articles);
    })
    .catch((err) => errorHandler(res, err, next));;
};

const postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const { _id } = req.user;

  Article.create({
    keyword, title, text, date, source, link, image, owner: _id,
  })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => errorHandler(res, err, next));
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const { _id } = req.user;

  Article.findById(articleId).select('+owner')
    .orFail(() => {
      next(new NotFoundError(errorMessages.notFoundError.article));
    })
    .then((article) => {
      if (!article.owner.equals(_id)) {
        next(new ForbiddenError(errorMessages.forbiddenError.article));
      }
      return Article.deleteOne(article)
        .then(() => {
          res.send(article);
        })
        .catch((err) => errorHandler(res, err, next));
    })
    .catch((err) => errorHandler(res, err, next));
};

module.exports = {
  getArticles,
  postArticle,
  deleteArticle,
};
