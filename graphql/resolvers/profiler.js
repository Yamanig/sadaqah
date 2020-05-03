const bcrypt = require('bcryptjs');
// models
const Profiler = require('../../models/profiler');

const { profilesCreator, dateToString } = require('../helpers/shared');

module.exports = {
  profilers: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized access');
    }
    try {
      const profiles = await Profiler.find();
      return profiles.map((profiler) => {
        return {
          ...profiler._doc,
          createdAt: dateToString(profiler.createdAt),
          updatedAt: dateToString(profiler.updatedAt),
          createdProfiles: profilesCreator.bind(
            this,
            profiler._doc.createdProfiles
          ),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createProfiler: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorized access');
    }
    const { fullName, email, mobile, role } = args.profilerInput;
    try {
      const exists = await Profiler.findOne({
        $or: [{ email: email }, { mobile: mobile }],
      });

      if (exists) {
        throw new Error(`email or mobile already exists`);
      }
      const hashedPassword = await bcrypt.hash(args.profilerInput.password, 12);

      const profiler = new Profiler({
        fullName,
        email,
        mobile,
        role,
        password: hashedPassword,
      });
      const result = await profiler.save();

      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
};
