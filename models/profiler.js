const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profilerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    createdProfiles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profiler', profilerSchema);
