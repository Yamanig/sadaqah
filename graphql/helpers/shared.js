const User = require('../../models/user');
const Profile = require('../../models/profile');
const Profiler = require('../../models/profile');

const profileResult = async (profile) => {
  return {
    ...profile._doc,
    dateOfBirth: dateToString(profile.dateOfBirth),
    createdAt: dateToString(profile.createdAt),
    updatedAt: dateToString(profile.updatedAt),
    profiler: profileCreator.bind(this, profile._doc.profiler),
  };
};

const subscribtionResult = (subscribtion) => {
  return {
    ...subscribtion._doc,
    profile: singleProfile.bind(this, subscribtion._doc.profile),
    subscriber: user.bind(this, subscribtion._doc.subscriber),
    createdAt: dateToString(subscribtion._doc.createdAt),
    updatedAt: dateToString(subscribtion._doc.updatedAt),
  };
};

const profilesCreator = async (profileIds) => {
  try {
    const profiles = await Profile.find({ _id: { $in: profileIds } });
    return profiles.map((profile) => {
      return profileResult(profile);
    });
  } catch (err) {
    throw err;
  }
};

const profileCreator = async (profilerById) => {
  try {
    const profiler = await Profiler.findById(profilerById);
    return {
      ...profiler._doc,
      createdProfiles: profilesCreator.bind(
        this,
        profiler._doc.createdProfiles
      ),
    };
  } catch (err) {
    throw err;
  }
};
// User
const user = async (userById) => {
  try {
    const foundUser = await User.findById(userById);

    return {
      ...foundUser._doc,
    };
  } catch (err) {
    throw err;
  }
};

// profile
const singleProfile = async (profileById) => {
  try {
    const profile = await Profile.findById(profileById);
    return profileResult(profile);
  } catch (err) {
    throw err;
  }
};

const dateToString = (date) => new Date(date).toISOString();

// exports.user = user;
// exports.singleProfile = singleProfile;
// exports.profileCreator = profileCreator;
exports.profilesCreator = profilesCreator;
exports.profileResult = profileResult;
exports.subscribtionResult = subscribtionResult;
// exports.dateToString = dateToString
