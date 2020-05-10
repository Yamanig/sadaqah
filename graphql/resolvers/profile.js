const Profile = require('../../models/profile');
const User = require('../../models/user');

const { profileResult } = require('../helpers/shared');

module.exports = {
  profileById: async (args) => {
    try {
      const profile = await Profile.findById(args.profileById);

      return profileResult(profile);
    } catch (err) {
      throw err;
    }
  },
  profiles: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized access');
    }
    try {
      const profiles = await Profile.find();
      return profiles.map((profile) => {
        return profileResult(profile);
      });
    } catch (err) {
      throw err;
    }
  },
  createProfile: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthorized access');
    // }
    const { fullName, address, mobile, motherName, age } = args.profileInput;

    const profile = new Profile({
      fullName,
      age,
      address,
      mobile,
      motherName,
      creator: '5eb71ee113f5bd4978687e96', //req.userId,
    });

    try {
      let createdProfile;
      const result = await profile.save();

      return profileResult(result);

      const userCreator = await User.findById('5eb71ee113f5bd4978687e96'); //req.userId

      if (!userCreator) {
        throw new Error(`user not found`);
      }
      userCreator.createdProfiles.push(profile);
      await userCreator.save();

      return createdProfile;
    } catch (err) {
      throw err;
    }
  },
};
