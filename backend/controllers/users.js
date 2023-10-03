const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  OK_STATUS,
  OK_CREATED,
} = require('../utils/http_codes');
const { SECRET_KEY } = require('../utils/config');

const NotFound = require('../utils/errors/NotFound');
const BadRequest = require('../utils/errors/BadRequest');
const Conflict = require('../utils/errors/Conflict');
const Unauthorized = require('../utils/errors/Unauthorized');

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail()
    .then((user) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          next(new Unauthorized('Неправильный email или пароль'));
        } else {
          const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });

          // отправим токен, браузер сохранит его в куках
          res.cookie('jwt', token, {
            maxAge: 3600000,
            httpOnly: true,
          }).send({ token });
        }
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new Unauthorized('Неправильный email или пароль'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.signup = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => res.status(OK_CREATED).send({
          name, about, avatar, email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict('Email уже зарегестриован'));
          } else if (err instanceof mongoose.Error.ValidationError) {
            next(new BadRequest('Переданы некорректные данные'));
          } else {
            next(err);
          }
        });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK_STATUS).send(users))
    .catch((err) => next(err));
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id }).orFail().then((users) => res.send(users)).catch((err) => {
    next(err);
  });
};

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId }).orFail()
    .then((users) => res.send(users)).catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Пользователь не найден'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next, data) => {
  User.findOneAndUpdate({ _id: req.user._id }, data, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Пользователь не найден'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  return updateUser(req, res, next, { name, about });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return updateUser(req, res, next, { avatar });
};
