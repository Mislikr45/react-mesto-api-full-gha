const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// 400
const BadRequestError = require('../errors/BadRequestError');
// 404
const NotFoundError = require('../errors/NotFoundError');
// 500
const DefaultErore = require('../errors/DefaultErore');
// 409
const EmailErrors = require('../errors/EmailErrors');
// 401
const AuthorizationError = require('../errors/AuthorizationError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // res.cookie('jwt', token);
      // res.send({ user, token });
      res.send({ jwt: token });
    })
    .catch(() => next(new AuthorizationError(
      'Ошибка авторизации',
    )));
};

module.exports.getMe = (req, res, next) => {
  const id = req.user._id;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(
          'Пользователь по указанному _id не найден',
        ));
      } else {
        res.send(user);
      }
    }).catch(() => next(new DefaultErore(
      'Ошибка по умолчанию',
    )));
};

module.exports.getUsers = (req, res, next) => {
  // res.send(req.body);
  User.find({}).then((users) => res.send({ data: users }))
    .catch(() => next(new DefaultErore(
      'Ошибка по умолчанию',
    )));
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((usernew) => res.status(201).send({
      _id: usernew._id,
      email: usernew.email,
      name: usernew.name,
      about: usernew.about,
      avatar: usernew.avatar,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new EmailErrors('Пользователь с таким электронным адресом уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при регистрации пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(
          'Пользователь по указанному _id не найден',
        ));
      } else {
        res.send({ data: user });
      }
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  ).then((user) => {
    if (user) return res.send(user);
    throw new NotFoundError('Пользователь с таким id не найден');
  })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { avatar },
    { new: true, runValidators: true },
  ).then((user) => {
    if (user) return res.send(user);
    throw new NotFoundError('Пользователь с таким id не найден');
  })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};
