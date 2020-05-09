const jwt = require('jsonwebtoken');
const Config = require('config');

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, Config.get('SECRET_KEY'));
    if (!verifiedToken) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.userId = verifiedToken.userId;
    return next();
  } catch (error) {
    req.isAuth = false;
    next();
  }
};
