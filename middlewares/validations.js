const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(10000).required()
      .regex(/(^\S*)$/)
      .message('пробелы в пароле не допускаются'),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().trim().email(),
    password: Joi.string().min(8).max(10000).required(),
  }),
});

const validatePostArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(2).max(1000).required(),
    title: Joi.string().min(2).max(1000).required(),
    text: Joi.string().min(2).max(10000).required(),
    date: Joi.string().min(4).max(100).required(),
    source: Joi.string().min(2).max(10000).required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('в поле link должен быть валидный url-адрес');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('в поле image должен быть валидный url-адрес');
    }),
  }),
});

const validateDeleteArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validatePostArticle,
  validateDeleteArticle,
};
