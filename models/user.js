const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: ({ value }) => `${value} - некорректный email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator(v) {
        return /(^\S*)$/i.test(v);
      },
      message: 'пробелы в пароле не допускаются',
    },
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject();
          }

          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

function preHashPassword(next) {
  if (!this.isModified('password')) return next();
  return bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

userSchema.pre('save', preHashPassword);

module.exports = mongoose.model('user', userSchema);
