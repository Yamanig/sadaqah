const jwt = require('jsonwebtoken');
const Config = require('config');

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    next();
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    next();
  }
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, Config.get('SECRET_KEY'));
    if (!verifiedToken) {
      req.isAuth = false;
      next();
    }

    req.isAuth = true;
    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    req.isAuth = false;
    next();
  }
};
