const authResolver = require('./auth');
const profileResolver = require('./profile');
const subscribtionResolver = require('./subscribtion');

const rootResolver = {
  ...authResolver,
  ...profileResolver,
  ...subscribtionResolver,
};

module.exports = rootResolver;
