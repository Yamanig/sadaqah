const User = require('../../models/user');
const Profile = require('../../models/profile');

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

const profiles = async (profileIds) => {
  try {
    const profilesRes = await Profile.find({ _id: { $in: profileIds } });
    return profilesRes.map((profile) => {
      // return profileResult(profile);
      return {
        ...profile._doc,
        createdAt: dateToString(profile.createdAt),
        updatedAt: dateToString(profile.updatedAt),
        creator: user.bind(this, profile.profiler),
      };
    });
  } catch (err) {
    throw err;
  }
};

const dateToString = (date) => new Date(date).toISOString();

exports.dateToString = dateToString;
exports.profiles = profiles;
exports.user = user;
