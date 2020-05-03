const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donatioSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donatioSchema);
