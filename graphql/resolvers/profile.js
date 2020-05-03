const Profile = require('../../models/profile');
const Profiler = require('../../models/profiler');

const { profileResult } = require('../helpers/shared');

module.exports = {
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
    if (!req.isAuth) {
      throw new Error('Unauthorized access');
    }
    const {
      fullName,
      address,
      mobile,
      motherName,
      dateOfBirth,
    } = args.profileInput;

    const profile = new Profile({
      fullName,
      dateOfBirth,
      address,
      mobile,
      motherName,
      profiler: req.userId,
    });

    try {
      let createdProfile;
      const result = await profile.save();

      createdProfile = profileResult(result);

      const profiler = await Profiler.findById(req.userId);

      if (!profiler) {
        throw new Error(`profiler not found`);
      }
      profiler.createdProfiles.push(profile);
      await profiler.save();

      return createdProfile;
    } catch (err) {
      throw err;
    }
  },
};
