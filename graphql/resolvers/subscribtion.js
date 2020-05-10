const Subscribtion = require('../../models/subscribtion');
const Profile = require('../../models/profile');
const { subscribtionResult, profileResult } = require('../helpers/shared');

module.exports = {
  subscriptions: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthorized access');
    // }
    try {
      const subscribtions = await Subscribtion.find();
      return subscribtions.map((subscribtion) => {
        return subscribtionResult(subscribtion);
      });
    } catch (error) {
      throw error;
    }
  },
  subscribe: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized access');
    }
    try {
      const profile = await Profile.findOne({ _id: args.profileId });

      const subscribtionObj = new Subscribtion({
        profile: profile,
        subscriber: req.userId,
      });

      const subscribtion = await subscribtionObj.save();

      return subscribtionResult(subscribtion);
    } catch (error) {
      throw error;
    }
  },
  unsubscribe: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthorized access');
    // }
    try {
      const subscribtion = await Subscribtion.findById(
        args.subscribtionId
      ).populate('profile');

      const deletedProfile = profileResult(subscribtion.profile);

      await Subscribtion.deleteOne({ _id: args.subscribtionId });

      return deletedProfile;
    } catch (error) {
      throw error;
    }
  },
};
