const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/errors/Unauthorized');
const { SECRET_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  let payload;
  const token = authorization.replace(bearer, '');

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
