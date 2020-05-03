const authResolver = require('./auth');
const profileResolver = require('./profile');
const profilerResolover = require('./profiler');
const subscribtionResolver = require('./subscribtion');

const rootResolver = {
  ...authResolver,
  ...profileResolver,
  ...profilerResolover,
  ...subscribtionResolver,
};

module.exports = rootResolver;
