const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10000,
  },
  date: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10000,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'в поле link должен быть валидный url-адрес',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'в поле image должен быть валидный url-адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

articleSchema.methods.toJSON = function removeOwner() {
  const article = this.toObject();
  delete article.owner;
  return article;
};

module.exports = mongoose.model('article', articleSchema);
