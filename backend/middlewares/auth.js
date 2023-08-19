const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('')) {
    return next(new AuthorizationError('Необходима авторизация !'));
  }
  // const token = authorization.split('Bearer  ')[1];
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // res.send(token);
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация 2'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};

module.exports = auth;
