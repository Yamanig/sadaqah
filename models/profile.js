const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    neighbor1_name: String,
    neighbor2_name: String,
    neighbor3_name: String,
    neighbor1_mobile: String,
    neighbor2_mobile: String,
    neighbor3_mobile: String,
    business_name: String,
    business_mobile: String,
    dugsi: [{ macalinName: String, contact: String }],
    school: [{ schoolName: String, contanct: String }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
