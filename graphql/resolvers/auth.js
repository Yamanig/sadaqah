const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Config = require('config');

const { profiles } = require('../helpers/shared');
const User = require('../../models/user');

module.exports = {
  userById: async (args) => {
    try {
      const user = await User.findById(args.userById);

      return {
        ...user._doc,
        createdProfiles: profiles.bind(this, user.createdProfiles),
      };
    } catch (err) {
      throw err;
    }
  },

  signUp: async (args) => {
    const { fullName, email, mobile, country } = args.userInput;
    try {
      const exists = await User.findOne({
        $or: [{ email: email }, { mobile: mobile }],
      });

      if (exists) {
        throw new Error(`email or mobile already exists`);
      }

      // console.log(userFirebse);
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        fullName,
        email,
        mobile,
        country,
        password: hashedPassword,
      });
      const result = await user.save();

      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  signIn: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      Config.get('SECRET_KEY'),
      { expiresIn: '1h' }
    );

    return { userId: user.id, token: token, expiration: 1 };
  },
};
