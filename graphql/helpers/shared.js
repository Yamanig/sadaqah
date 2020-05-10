const User = require('../../models/user');
const Profile = require('../../models/profile');

const singleProfile = async (profileId) => {
  try {
    const profile = await Profile.findById(profileId);

    return {
      ...profile._doc,
      creator: user.bind(this, profile.creator),
    };
  } catch (err) {
    throw err;
  }
};
const profiles = async (profileIds) => {
  try {
    const profilesRes = await Profile.find({ _id: { $in: profileIds } });
    return profilesRes.map((profile) => {
      // return profileResult(profile);
      return {
        ...profile._doc,
        createdAt: dateToString(profile.createdAt),
        updatedAt: dateToString(profile.updatedAt),
        creator: user.bind(this, profile.creator),
      };
    });
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
      createdProfiles: profiles.bind(this, foundUser.createdProfiles),
    };
  } catch (err) {
    throw err;
  }
};

const subscribtionResult = (subscribtion) => {
  return {
    ...subscribtion._doc,
    createdAt: dateToString(subscribtion.createdAt),
    updatedAt: dateToString(subscribtion.updatedAt),
    profile: singleProfile.bind(this, subscribtion._doc.profile),
    subscriber: user.bind(this, subscribtion._doc.subscriber),
  };
};

const profileResult = (profile) => {
  return {
    ...profile._doc,
    createdAt: dateToString(profile.createdAt),
    updatedAt: dateToString(profile.updatedAt),
    creator: user.bind(this, profile.creator),
  };
};
const dateToString = (date) => new Date(date).toISOString();

// exports.dateToString = dateToString;
// exports.profiles = profiles;
// exports.user = user;
// exports.singleProfile = singleProfile;
exports.subscribtionResult = subscribtionResult;
exports.profileResult = profileResult;
